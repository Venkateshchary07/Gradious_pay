
# 💳 Gradious Pay – Full Stack Payment Application

Gradious Pay is a full-stack digital payment application developed as a learning-focused project to understand how real-world payment platforms work.

The project covers frontend UI development, backend API design, database integration, OTP-based authentication, and basic wallet transaction logic. The main goal of this project is to learn **end-to-end full-stack development** using industry-relevant tools and practices.

---

## ✨ Key Features

- User registration with **email OTP verification**
- Secure authentication flow
- Wallet balance management
- Send and receive money between users
- Transaction history tracking
- Mobile recharge and service modules (UI level)
- Modular backend architecture
- Global state management using React Context API

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- CSS (component-based styling)

### Backend
- Node.js
- Express.js
- Nodemailer (for email OTP verification)

### Database
- MySQL

---

## 📂 Project Structure

```

Gradious_pay/
├── Frontend/                # React frontend application
├── Backend/                 # Node.js & Express backend
│   ├── configuration/       # Database & email configuration
│   ├── Otp_verification/    # OTP generation & verification logic
│   ├── send_receive/        # Send & receive money logic
│   └── server.js            # Backend entry point
├── schema.sql               # Database schema
├── .env.example             # Environment variables template
└── README.md

````

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Venkateshchary07/Gradious_pay.git
````

---

### 2️⃣ Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file using `.env.example` and add your database and email credentials.

Start the backend server:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

The frontend will start using Vite.

---

## 🔐 Security Practices

* Sensitive credentials are managed using environment variables
* `.env` file is excluded using `.gitignore`
* Backend configuration and business logic are separated
* No secrets are committed to the repository

---

## 🎯 Learning Outcomes

Through this project, I learned:

* Full-stack application flow (Frontend → Backend → Database)
* OTP-based authentication using email
* Wallet and transaction flow design
* React Context API for global state management
* Modular backend architecture
* Git and GitHub best practices
* Structuring projects for real-world scenarios

---

## 👨‍💻 Author

**Venkatesh Chary**
Computer Science Engineering Student
Aspiring Full Stack Developer

---

## 📌 Note

This project is developed for learning and demonstration purposes.
Some features are intentionally simplified to focus on understanding core concepts.

````

