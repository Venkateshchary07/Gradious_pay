import "./TransactionSucess.css";

import { CheckCircle,XCircle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTransaction } from "../../../context/transaction";
export default function TransactionSuccess() {
  const navigate = useNavigate();
  const { transaction } = useTransaction();

  
  useEffect(() => {
    if (!transaction) {
      navigate("/sendmoney", { replace: true });
    }
  }, [transaction, navigate]);


  if (!transaction) {
    return null;
  }

  const txn = {
    amount: transaction.amount,
    receiver: transaction.receiver,
    txnId: `TXN24567891${transaction.transaction_id}`,
    date: transaction.transaction_created_at,
    status: transaction.transaction_status,
    message: transaction.message
  };

  return (
        <>

            <div className="txn-success-wrapper">
                <div className="txn-success-card">{txn.status == 'SUCCESS'?<CheckCircle className="txn-success-icon" size={60} />:
                     <XCircle className="txn-failed-icon" size={60}/>}
                    

                    <h2>Transaction Completed</h2>
                    <p className="txn-success-subtext">
                       {txn.message}
                    </p>

                    <div className="txn-success-details">
                        <div className="detail-row">
                            <span>Amount</span>
                            <strong>₹{txn.amount}</strong>
                        </div>

                        <div className="detail-row">
                            <span>Sent To</span>
                            <strong>{txn.receiver}</strong>
                        </div>

                        <div className="detail-row">
                            <span>Transaction ID</span>
                            <strong>{txn.txnId}</strong>
                        </div>

                        <div className="detail-row">
                            <span>Date & Time</span>
                            <strong>{txn.date}</strong>
                        </div>

                        <div className="detail-row">
                            <span>Status</span>
                            <strong className={txn.status =="SUCCESS"?"success-text":"fail-text"}>
                                {txn.status}
                            </strong>
                        </div>
                    </div>

                    <div className="txn-success-actions">
                        <button
                            className="primary-btn"
                            onClick={() => navigate("/transactionhistory")}
                        >
                            View History
                        </button>

                        <button
                            className="secondary-btn"
                            onClick={() => navigate("/sendmoney")}
                        >
                            Send Again
                        </button>
                    </div>

                </div>
            </div>

        </>
    );
}
