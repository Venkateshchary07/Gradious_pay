const express = require('express');
const router = express.Router();
const db = require('../configuration/dataBaseConnect.js');
const transporter = require('../configuration/nodemailConn.js');
const bcrypt = require("bcrypt");
require('dotenv').config();

// send otp to  logged user mail

router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    const [rows] = await conn.query(
      "SELECT id, email FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      await conn.rollback();
      return res.status(404).json({
        message: "Email not registered",
        success: false
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await conn.query(
      `INSERT INTO otp_verifications (user_id, otp_hash, purpose, expires_at)
       VALUES (?, ?, 'FORGOT_PASSWORD', ?)`,
      [rows[0].id, hashedOtp, expiresAt]
    );

    await conn.commit();

    // send email AFTER commit
    
    await transporter.sendMail({
                    to: rows[0].email,
                    subject: "Gradious Pay OTP Verification",
                    html: `<h2>Your OTP is ${otp}</h2><p>Valid for 5 minutes</p>`
    });

    res.status(200).json({
             message: "OTP sent successfully"
    });

  } catch (err) {
        await conn.rollback();
        console.error("SEND OTP ERROR:", err);
        res.status(500).json({ message: err.message });
      }
 finally {
            conn.release();
  }
});


router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP required" });
  }

  try {
   
    const [users] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = users[0].id;


    const [otps] = await db.query(
      `SELECT id, otp_hash, expires_at 
       FROM otp_verifications 
       WHERE user_id = ? AND purpose = 'FORGOT_PASSWORD'
       ORDER BY created_at DESC 
       LIMIT 1`,
      [userId]
    );

    if (otps.length === 0) {
      return res.status(400).json({ message: "OTP not found" });
    }

    const otpRow = otps[0];

    
    if (new Date() > otpRow.expires_at) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const matched = await bcrypt.compare(otp, otpRow.otp_hash);

    if (!matched) {
      return res.status(400).json({
        match: false,
        message: "Invalid OTP"
      });
    }

    // 5️⃣ Delete OTP after success
    await db.query(
      "DELETE FROM otp_verifications WHERE id = ?",
      [otpRow.id]
    );

    res.status(200).json({
      match: true,
      message: "OTP verified successfully"
    });

  } catch (err) {
    console.error("VERIFY OTP ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({
      message: "Email and new password are required"
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters"
    });
  }

  try {
   
    const [users] = await db.query(
      "SELECT password FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const oldHashedPassword = users[0].password;

    
    const isSamePassword = await bcrypt.compare(
      newPassword,
      oldHashedPassword
    );

    if (isSamePassword) {
      return res.status(400).json({
        message: "New password cannot be the same as old password"
      });
    }

   
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    
    await db.query(
      "UPDATE users SET password = ? WHERE email = ?",
      [hashedNewPassword, email]
    );

    res.status(200).json({
      message: "Password reset successfully"
    });

  } catch (err) {
    console.error("RESET PASSWORD ERROR:", err);
    res.status(500).json({
      message: "Server error"
    });
  }
});

router.post("/verify-register-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP required" });
  }

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    const [users] = await conn.query(
      "SELECT id FROM users WHERE email = ? AND status = 'PENDING'",
      [email]
    );

    if (users.length === 0) {
      await conn.rollback();
      return res.status(404).json({ message: "User not found or already verified" });
    }

    const userId = users[0].id;

    const [otps] = await conn.query(
      `SELECT id, otp_hash, expires_at
       FROM otp_verifications
       WHERE user_id = ? AND purpose = 'REGISTER'
       ORDER BY created_at DESC LIMIT 1`,
      [userId]
    );

    if (otps.length === 0) {
      await conn.rollback();
      return res.status(400).json({ message: "OTP not found" });
    }

    const otpRow = otps[0];

    if (new Date() > otpRow.expires_at) {
      await conn.rollback();
      return res.status(400).json({ message: "OTP expired" });
    }

    const matched = await bcrypt.compare(otp, otpRow.otp_hash);
    if (!matched) {
      await conn.rollback();
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // activate user
    await conn.query(
      "UPDATE users SET status = 'ACTIVE' WHERE id = ?",
      [userId]
    );

    // create wallet
    await conn.query(
      "INSERT INTO wallets (user_id, balance) VALUES (?, 0)",
      [userId]
    );

    // create UPI
   // fetch user's mobile number
        const [userRows] = await conn.query(
          "SELECT mobile FROM users WHERE id = ?",
          [userId]
        );

          if (userRows.length === 0) {
            await conn.rollback();
            return res.status(400).json({ message: "User mobile not found" });
          }

      const mobile = userRows[0].mobile;

// create UPI using mobile number
      const upiId = `${mobile}@gradious`;

      await conn.query(
        "INSERT INTO upi_account (user_id, upi_id) VALUES (?, ?)",
        [userId, upiId]
      );


    // delete OTP
    await conn.query(
      "DELETE FROM otp_verifications WHERE id = ?",
      [otpRow.id]
    );

    await conn.commit();

    res.status(200).json({ message: "Account verified successfully" });

  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({ message: "Server error" });
  } finally {
    conn.release();
  }
});



module.exports = router;