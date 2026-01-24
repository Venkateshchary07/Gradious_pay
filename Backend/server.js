const express  = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
const transporter = require('./configuration/nodemailConn.js');
const bcrypt = require("bcrypt");
const db = require('./configuration/dataBaseConnect.js');
const verification = require('./Otp_verification/verification.js')

const sendmoneyRouter = require("./send_receive/sendMoney.js")



const app = express();
app.use(cors());
app.use(express.json()) 

console.log("server is restarted")
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password required"
        });
    }

    try {
       

        const [rows,fields] = await db.query(
            "SELECT id, email, password FROM users WHERE email = ?",
            [email]
        );

       
        if (rows.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = rows[0];
      
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
        );

        return res.json({
            message: "Login successful",
            token,
            userId:user.id   
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server error"
        });
    }
});

    

 app.post("/register", async (req, res) => {
  const { name, email, mobile, password } = req.body;

  if (!name || !email || !mobile || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    // check existing user
    const [existingUser] = await conn.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
  const userId = existingUser[0].id;

  const [statusRow] = await conn.query(
    "SELECT status FROM users WHERE id = ?",
    [userId]
  );

  if (statusRow[0].status === 'PENDING') {
    await conn.rollback();
    return res.status(409).json({
      message: "Account pending verification. Please verify OTP."
    });
  }

  await conn.rollback();
  return res.status(409).json({ message: "User already exists" });
}


    const hashedPassword = await bcrypt.hash(password, 10);

    // create user as PENDING
    const [userResult] = await conn.query(
      "INSERT INTO users (name, email, mobile, password, status) VALUES (?, ?, ?, ?, 'PENDING')",
      [name, email, mobile, hashedPassword]
    );

    const userId = userResult.insertId;

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await conn.query(
      `INSERT INTO otp_verifications (user_id, otp_hash, purpose, expires_at)
       VALUES (?, ?, 'REGISTER', ?)`,
      [userId, hashedOtp, expiresAt]
    );

    await conn.commit();

    // send email
    await transporter.sendMail({
      to: email,
      subject: "Gradious Pay - Verify Your Account",
      html: `<h2>Your OTP is ${otp}</h2><p>Valid for 5 minutes</p>`
    });

    res.status(201).json({
      message: "OTP sent for verification",
      email
    });

  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({ message: "Server error" });
  } finally {
    conn.release();
  }
});



 app.use("/api", sendmoneyRouter);
 app.use("/otp", verification);
 

 app.listen(process.env.PORT, ()=>{

    console.log("The Port Is Running on 3000");

 });