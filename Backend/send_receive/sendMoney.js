const jwt = require("jsonwebtoken");
const express = require('express');
 const router = express.Router();
 const db = require('../configuration/dataBaseConnect.js');

const bcrypt = require("bcrypt");

//This middleware is used to check either user is logged in or not

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
  } catch (err) {
         return res.status(401).json({ message: "Invalid or expired token" });
  }
}


// Updating the wallet 
router.post("/wallet/topup", auth, async (req, res) => {
  const userId = req.user.userId;
  const amount = Number(req.body.amount);
  const SYSTEM_USER_ID = 5;

  if (!amount || amount <= 0) {
    return res.status(400).json({
      message: "Invalid amount. Must be greater than zero."
    });
  }

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    // Lock wallet
    const [wallet] = await conn.query(
      "SELECT balance FROM wallets WHERE user_id = ? FOR UPDATE",
      [userId]
    );

    if (wallet.length === 0) {
      throw new Error("Wallet not found");
    }

    // Update balance
    await conn.query(
      "UPDATE wallets SET balance = balance + ? WHERE user_id = ?",
      [amount, userId]
    );

    // Insert transaction (SYSTEM → USER)
    const[inserted]=await conn.query(
      `INSERT INTO transactions
       (sender_user_id, receiver_user_id, amount, note, status)
       VALUES (?, ?, ?, 'Wallet Top-up', 'SUCCESS')`,
      [SYSTEM_USER_ID, userId, amount]
    );

    await conn.commit();

    // Fetch updated balance
    const [updatedWallet] = await conn.query(
      "SELECT balance FROM wallets WHERE user_id = ?",[userId]
    );

    res.status(200).json({
      message:"Wallet-Top-Up Successful",
      status: true,
      transaction_id:inserted.insertId,
      transaction_type: "CREDIT",
      transaction_status: "SUCCESS",
      transaction_created_at: new Date()
    });

  } catch (err) {
    await conn.rollback();
    console.error("Wallet top-up error:", err.message);
    res.status(500).json({
      message: err.message || "Wallet top-up failed"
    });
  } finally {
    conn.release();
  }
});


 router.get("/profiledata", auth, async (req, res) => {
  try {
    const userId = req.user.userId;

    const [rows] = await db.query(
                            `SELECT 
                              u.name,
                              u.email,
                              u.Mobile,
                              u.created_at,
                              u.status,
                              ua.upi_id
                            FROM users u
                            INNER JOIN upi_account ua
                            ON u.id = ua.user_id
                            WHERE u.id = ?`,
                            [userId]
                          );

          if (rows.length === 0) {
              return res.status(404).json({ message: "Profile not found" });
                     }

            res.status(200).json(rows[0]);
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
          }
          });


//Check for pin match from DB
router.post("/check-pin-db", auth, async (req, res) => {
  const userId = req.user.userId;
  const { pin } = req.body;

  if (!pin || pin.length !== 4) {
    return res.status(400).json({ matched: false });
  }

  const [rows] = await db.query(
    "SELECT upi_pin FROM upi_account WHERE user_id = ?",
    [userId]
  );

  if (rows.length === 0 || !rows[0].upi_pin) {
    return res.status(400).json({ matched: false });
  }

  const matched = await bcrypt.compare(pin, rows[0].upi_pin);

  res.json({ matched });
});

// updating the pin in DB
router.post("/setupipin", auth, async (req, res) => {
  const userId = req.user.userId;
  const { upiPin } = req.body;
  try {
    const hashed_upi_pin = await bcrypt.hash(upiPin,10);
    const [result] = await db.query(
      "UPDATE upi_account SET upi_pin = ? WHERE user_id = ?",
      [hashed_upi_pin, userId]
    );

   if (result.affectedRows === 0) {
          return res.status(404).json({
            success: false,
            message: "UPI account not found for user"
          });
        }

        res.json({
          success: true,
          message: "UPI PIN updated successfully"
        });

          } catch (error) {
            console.error(error);
            res.status(500).json({ success: false });
          }
        });

//checking UPI pin is created or not
router.get('/upipavl', auth, async (req, res) => {
  const userId = req.user.userId;

  try {
    const [rows] = await db.query(
      'SELECT upi_pin FROM upi_account WHERE user_id = ?',
      [userId]
    );
    
    if (rows.length === 0 || rows[0].upi_pin == null) {
          return res.json({ hasPin: false });
        }

        res.json({ hasPin: true });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// transaction history api

router.get("/transactions/history", auth, async (req, res) => {
  const userId = req.user.userId;

  try {
    const [rows] = await db.query(
      `
      SELECT
          t.id,
          t.amount,
          t.status,
          t.created_at,
          su.name AS sender_name,
          ru.name AS receiver_name,
          CASE
            WHEN t.sender_user_id = ? THEN 'DEBIT'
            ELSE 'CREDIT'
          END AS transaction_type
      FROM transactions t
      JOIN users su ON t.sender_user_id = su.id
      JOIN users ru ON t.receiver_user_id = ru.id
      WHERE t.sender_user_id = ?
         OR t.receiver_user_id = ?
      ORDER BY t.created_at DESC;
      `,
      [userId, userId, userId]
    );

    const [walletRows] = await db.query(
      "SELECT balance FROM wallets WHERE user_id = ?",
      [userId]
    );

    res.json({
      transactions: rows,
      balance: walletRows[0]?.balance || 0
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



router.post("/sendmoney", auth, async (req, res) => {
  const senderId = req.user.userId;
  const { receiver, amount, note } = req.body;

  if (!receiver || !amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const conn = await db.getConnection();
  let receiverId = null;
  try {
    await conn.beginTransaction();

    const [upiRows] = await conn.query(
      "SELECT user_id FROM upi_account WHERE upi_id = ?",
      [receiver]
    );

    if (upiRows.length === 0) {
      throw new Error("Receiver UPI not found");
    }

    receiverId = upiRows[0].user_id;

    if (senderId === receiverId) {
      throw new Error("Cannot send money to yourself");
    }

    const [senderWallet] = await conn.query(
      "SELECT balance FROM wallets WHERE user_id = ? FOR UPDATE",
      [senderId]
    );

    if (senderWallet.length === 0) {
      throw new Error("Sender wallet not found");
    }

    if (senderWallet[0].balance < amount) {
      throw new Error("Insufficient balance");
    }

    const [receiverWallet] = await conn.query(
      "SELECT balance FROM wallets WHERE user_id = ? FOR UPDATE",
      [receiverId]
    );

    if (receiverWallet.length === 0) {
      throw new Error("Receiver wallet not found");
    }

    await conn.query(
      "UPDATE wallets SET balance = balance - ? WHERE user_id = ?",
      [amount, senderId]
    );

    await conn.query(
      "UPDATE wallets SET balance = balance + ? WHERE user_id = ?",
      [amount, receiverId]
    );

    const [inserted] = await conn.query(
      `INSERT INTO transactions
       (sender_user_id, receiver_user_id, amount, note, status)
       VALUES (?, ?, ?, ?, 'SUCCESS')`,
      [senderId, receiverId, amount, note]
    );

    await conn.commit();

    return res.json({
      message: "Your payment has been completed successfully",
      status: true,
      transaction_id: inserted.insertId,
      transaction_type: "DEBIT",
      transaction_status: "SUCCESS",
      transaction_created_at: new Date()
    });

 } catch (err) {
  await conn.rollback();

  let failedTxnId = null;
  
  if (receiverId) {
    const [failed] = await db.query(
      `INSERT INTO transactions
       (sender_user_id, receiver_user_id, amount, note, status)
       VALUES (?, ?, ?, ?, 'FAILED')`,
      [senderId, receiverId, amount || 0, note || null]
    );

    failedTxnId = failed.insertId;
  }

  return res.status(200).json({
    message: err.message,
    status: false,
    transaction_id: failedTxnId,
    transaction_type: "DEBIT",
    transaction_status: "FAILED",
    transaction_created_at: new Date()
  });
}
 finally {
    conn.release();
  }
});

module.exports = router;
