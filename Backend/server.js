const express  = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

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

  if (!name || !email || !password || !mobile) {
    return res.status(400).json({ message: "All fields required" });
  }

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    // checking for existing user
    const [existingUser] = await conn.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      await conn.rollback();
      return res.status(409).json({ message: "User already exists" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const status="Active";
    const [userResult] = await conn.query(
      "INSERT INTO users (name, email, mobile, password,status) VALUES (?, ?, ?, ?,?)",
      [name, email, mobile, hashedPassword,status]
    );

    const userId = userResult.insertId;

    //created row in wallet table
    await conn.query(
      "INSERT INTO wallets (user_id, balance) VALUES (?, 0)",
      [userId]
    );

    // auto generating upi id on every new registration req
    const upiId = `${mobile}@gradious`;

    await conn.query(
      "INSERT INTO upi_account (user_id, upi_id) VALUES (?, ?)",
      [userId, upiId]
    );

    await conn.commit();

    res.status(201).json({
      message: "User registered successfully",
      upiId
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