import "./WalletTopUp.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTransaction } from "../../../context/transaction";

export default function WalletTopUp() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { startTransaction } = useTransaction();

const handleTopUp = () => {
  const topupAmount = Number(amount);

  if (!topupAmount || topupAmount <= 0) {
    alert("Enter a valid amount");
    return;
  }

  startTransaction({
    transactionMode: "TOPUP",
    amount: topupAmount
  });

  navigate("/enterupipin");
};


  return (
    <div className="topup-wrapper">
      <div className="topup-card">

        <h2>Add Money to Wallet</h2>
        <p className="subtitle">
          Demo wallet top-up (no bank required)
        </p>

        <input
          type="number"
          placeholder="Enter amount (₹)"
          value={amount}
          className="Enter-amount"
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="quick-amounts">
          {[100, 500, 1000, 2000].map(val => (
            <button
              key={val}
              disabled={loading}
              onClick={() => setAmount(val)}
            >
              ₹{val}
            </button>
          ))}
        </div>

        <button
          className="topup-btn"
          onClick={handleTopUp}
          disabled={loading}
        >
          {loading ? "Processing..." : "Add Money"}
        </button>

        <div className="info-box">
          <p>✔ System credited wallet</p>
          <p>✔ Transaction recorded</p>
          <p>✔ Balance updated instantly</p>
        </div>

      </div>
    </div>
  );
}
