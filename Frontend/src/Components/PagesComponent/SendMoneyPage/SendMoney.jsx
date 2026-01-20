import "./SendMoney.css";

import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { useTransaction } from "../../../context/transaction";


export default function SendMoney() {
    const navigate = useNavigate();
    const [receiver, setReceiver] = useState("");
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const{startTransaction} = useTransaction();
   const handleSendMoney = async () => {
            if (!receiver || !amount) {
                alert("Please enter receiver and amount");
                return;
            }

            if (amount <= 0) {
                alert("Enter a valid amount");
                return;
            }
            //checking for the UPI pin created or not if not redirect to create pin
            try{

               const upi_pin = await fetch("http://localhost:3000/api/upipavl", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                    });
                const data= await upi_pin.json();
                                
               if(data.hasPin == true){
                 startTransaction({ receiver, amount, note ,transactionMode:"SEND"});
                 navigate('/confirmpayment');
               }else{
                navigate('/setupipin')
               }
            }catch(err){
                alert(err.message);
            }
            
            //storing the values in the context
            
           
            // navigate('/confirmpayment');
            };
    

    return (
        <>

            <div className="sendmoney-wrapper sendmoney-layout">
            <div>
                <h2>Send Money</h2>

                <div className="sendmoney-card">

                    <label>Mobile Number / UPI ID</label>
                    <input
                        type="text"
                        placeholder="Enter mobile number or UPI ID"
                        value={receiver}
                        onChange={(e) => setReceiver(e.target.value)}
                    />

                    <label>Amount</label>
                    <input
                        type="number"
                        placeholder="₹ Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />

                    <label>Note (optional)</label>
                    <input
                        type="text"
                        placeholder="Add a note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />

                    <button className="sendmoney-btn" onClick={handleSendMoney}>
                        Pay ₹{amount || 0}
                    </button>

                </div>
            </div>

          
        <div className="sendmoney-insights">

            {/* Cashback Card */}
            <div className="insight-card highlight">
                <div className="badge">NEW</div>
                <h3>Instant Cashback</h3>
                <p>Send ₹500 or more and get cashback directly to your wallet.</p>
                <button>Pay Now →</button>
            </div>

            {/* Security Card */}
            <div className="insight-card">
                <h3>100% Secure Payments</h3>
                <p>
                    All transactions are protected with bank-grade encryption and
                    UPI security standards.
                </p>
                <ul>
                    <li>✔ PIN protected</li>
                    <li>✔ Encrypted transfers</li>
                    <li>✔ No data stored</li>
                </ul>
            </div>

            {/* Limits / Tips Card */}
            <div className="insight-card muted">
                <h3>Did you know?</h3>
                <p>
                    You can send up to <strong>₹1,00,000</strong> per day using UPI.
                </p>
                <p className="tip">
                    Tip: Add a note to track your transactions easily.
                </p>
            </div>

        </div>




</div>

        </>
    );

}