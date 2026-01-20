import "./TransactionHistory.css";

import { useState, useEffect } from "react";

export default function TransactionHistory() {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [walletBalance, setWalletBalance] = useState(0);


    useEffect(() => {
            fetch("http://localhost:3000/api/transactions/history", {
                headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then(data => {
                setTransactions(data.transactions);
                setWalletBalance(data.balance);
                setLoading(false);
                })
                .catch(err => {
                console.error("Failed to fetch transactions", err);
                setLoading(false);
                });
            }, []);

    return (
        <>

            <div className="transaction-wrapper">
                <div className="transaction-header">
                    <h2>Transaction History</h2>
                    <span className="wallet-balance">
  Wallet Balance: ₹{walletBalance}
</span>
                </div>

                <div className="transaction-card">

                    {loading && <p>Loading transactions...</p>}

                    {!loading && transactions.length === 0 && (
                        <p>No transactions found</p>
                    )}

                    {!loading && transactions.map(txn => (
                        <div className="transaction-row" key={txn.id}>

                            {/* Left */}
                            <div className="txn-left">
                                <p className="txn-title">
                                    {txn.transaction_type === "DEBIT"
                                        ? `Sent to ${txn.receiver_name}`
                                        : `Received from ${txn.sender_name}`}
                                </p>
                                <span className="txn-date">
                                    {new Date(txn.created_at).toLocaleString()}
                                </span>
                            </div>

                            {/* Middle */}
                            <div className={`txn-badge ${txn.transaction_type.toLowerCase()}`}>
                                {txn.transaction_type}
                            </div>

                            {/* Right */}
                            <div className="txn-right">
                                <p className={`txn-amount ${txn.transaction_type === "DEBIT" ? "debit" : "credit"}`}>
                                    {txn.transaction_type === "DEBIT" ? "-" : "+"}₹{txn.amount}
                                </p>
                                <span className={`txn-status ${txn.status.toLowerCase()}`}>
                                    {txn.status}
                                </span>
                            </div>

                        </div>
                    ))}

                </div>
            </div>

        </>
    );
}
