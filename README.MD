# 💳 Gradious Pay – Full Stack Payment Application

Gradious Pay is a full-stack digital payment application developed as a learning-focused project to understand how real-world payment platforms work.  
The project covers frontend UI, backend APIs, database design, authentication using OTP, and secure money transfer logic.

This project was built step-by-step with a strong focus on understanding concepts, clean architecture, and industry practices.

---

## ✨ Key Features

- User registration with email OTP verification
- Secure login system
- Wallet balance management
- Send and receive money between users
- Transaction history tracking
- Mobile recharge and service modules (UI level)
- Modular backend structure
- Centralized state management using React Context API

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- CSS

### Backend
- Node.js
- Express.js
- Nodemailer

### Database
- MySQL

---

## 📂 Project Structure

```
Gradious-Pay/
├── Frontend/               # React frontend application
├── Backend/                # Node.js & Express backend
│   ├── configuration/
│   ├── Otp_verification/
│   ├── send_receive/
│   └── server.js
├── schema.sql              # Database schema
├── .env.example            # Environment variables template
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/gradious-pay.git
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file using `.env.example` and add your database and email credentials.

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

The frontend will start using Vite.

---

## 🔐 Security Practices

- Environment variables used for sensitive data
- `.env` file excluded using `.gitignore`
- Backend logic separated from configuration
- No secrets committed to the repository

---

## 🎯 Learning Outcomes

- Understanding full-stack application flow
- Implementing OTP-based authentication
- Designing wallet and transaction logic
- Using React Context API for state management
- Structuring backend using modular architecture
- Applying Git and GitHub best practices

---

## 👨‍💻 Author

Venkatesh Chary  
Computer Science Engineering Student  
Aspiring Full Stack Developer

---

## 📌 Note

This project is developed for learning and demonstration purposes.  
Some features are intentionally simplified to focus on core concepts.
