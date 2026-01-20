import "./EnterPin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTransaction } from "../../../context/transaction";

export default function EnterPin() {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { transaction, startTransaction } = useTransaction();

  // ✅ PIN input handler
  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setPin(value);
    }
  };

  // ✅ MAIN PAY HANDLER
  const handlePay = async () => {
    if (!transaction) {
      navigate("/sendmoney");
      return;
    }

    if (pin.length !== 4) {
      alert("Please enter a 4-digit PIN");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ VERIFY PIN
      const pinResponse = await fetch(
        "http://localhost:3000/api/check-pin-db",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ pin }),
        }
      );

      if (!pinResponse.ok) {
        alert("PIN verification failed");
        setLoading(false);
        return;
      }

      const pinData = await pinResponse.json();

      if (!pinData.matched) {
        alert("Incorrect UPI PIN");
        setLoading(false);
        return;
      }

      // 2️⃣ DECIDE API BASED ON TRANSACTION TYPE
      let apiUrl = "";
      let payload = {};

      if (transaction.transactionMode === "SEND") {
        apiUrl = "http://localhost:3000/api/sendmoney";
        payload = {
          receiver: transaction.receiver,
          amount: transaction.amount,
          note: transaction.note,
        };
      } else if (transaction.transactionMode === "TOPUP") {
        apiUrl = "http://localhost:3000/api/wallet/topup";
        payload = {
          amount: transaction.amount,
        };
      } else {
        alert("Invalid transaction type");
        setLoading(false);
        return;
      }

      // 3️⃣ PERFORM TRANSACTION
      const payResponse = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!payResponse.ok) {
        const errorText = await payResponse.text();
        alert(errorText || "Transaction failed");
        setLoading(false);
        return;
      }

      const payData = await payResponse.json();

      // 4️⃣ STORE RESULT & NAVIGATE
      startTransaction({
        ...transaction,
        ...payData,
      });

      navigate("/transactionsuccess");
    } catch (error) {
      console.error(error);
      alert("Network / Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pin-page">
      <div className="pin-container">

        {/* LEFT CARD */}
        <div className="pin-card">
          <h2>Enter Security PIN</h2>
          <p className="pin-subtitle">
            Please enter your 4-digit UPI PIN:
          </p>

          <div className="pin-input-wrapper">
            <span className="lock-icon">🔒</span>
            <input
              type="password"
              value={pin}
              onChange={handlePinChange}
              maxLength="4"
              className="pin-input"
            />
          </div>

          <p className="demo-text">
            Demo project – No real UPI PIN used
          </p>

          {/* ✅ IMPORTANT: type="button" prevents form submit */}
          <button
            type="button"
            className="pay-btn"
            onClick={handlePay}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : transaction?.transactionMode === "TOPUP"
              ? `Add ₹${transaction.amount}`
              : `Pay ₹${transaction.amount}`}
          </button>
        </div>

        {/* RIGHT CARD */}
        <div className="secure-card">
          <div className="secure-top">
            <div className="secure-lock">🔒</div>
            <h3>100% Secure Payments</h3>
            <p>
              All transactions are protected with bank-grade encryption
              and UPI security standards.
            </p>
          </div>

          <ul className="secure-list">
            <li>✔ PIN protected</li>
            <li>✔ Encrypted transfers</li>
            <li>✔ No data stored</li>
          </ul>

          <div className="secure-bottom">
            <span>🛡</span>
            <p>Enjoy secure and seamless payments with Gradious Pay.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
