import "./Confirm.css";

import { useNavigate } from "react-router-dom";
import { useTransaction } from "../../../context/transaction";

import { useEffect } from "react";
export default function ConfirmPayment() {
  const navigate = useNavigate();
  const { transaction } = useTransaction();

  

useEffect(() => {
  if (!transaction) {
    navigate("/sendmoney");
  }
}, [transaction, navigate]);

if (!transaction) return null;


  return (
    <>

      <div className="confirm-page">
        <div className="confirm-container">

          <div className="confirm-card">
            <h2>Confirm Payment</h2>

            <div className="field-group">
              <label>To</label>
              <input value={transaction.receiver} readOnly />
            </div>

            <div className="field-group">
              <label>Amount</label>
              <input value={transaction.amount} readOnly />
            </div>

            <div className="field-group">
              <label>Note</label>
              <input value={transaction.note} readOnly />
            </div>

            <div className="confirm-actions">
              <button className="cancel-btn" onClick={() => navigate("/sendmoney")}>
                Cancel
              </button>
              <button className="proceed-btn" onClick={() => navigate("/enterupipin")}>
                Proceed to Pay ₹{transaction.amount}
              </button>
            </div>
          </div>

        </div>
      </div>

    </>
  );
}
