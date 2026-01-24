import "./SetUpiPin.css";
import { useProfileData } from "../../../context/ProfileContext";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTransaction } from "../../../context/transaction";
import { useEffect } from "react";

export default  function SetUpiPin() {

    const [upiPin, setUpiPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
     const { profileState } = useProfileData();
    const navigate = useNavigate();

     useEffect(() => {
    if (!profileState) {
      alert("Session expired. Please login again.");
      navigate("/loginpage");
    }
  }, [profileState, navigate]);
    const handleSetPin = async () => {
        if (upiPin.length !== 4 || confirmPin.length !== 4) {
            alert("UPI PIN must be 4 digits");
            return;
        }

        if (upiPin !== confirmPin) {
            alert("UPI PINs do not match");
            return;
        }

        // API integration later
        const response = await fetch("http://localhost:3000/api/setupipin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ upiPin })
        });

       const data = await response.json();  
        
        if(response.ok && data.success){

                    navigate('/sendmoney');
                    alert("UPI PIN set successfully!");
                }else{
                    alert("Failed to setup upi pin")
                    navigate('/setupipin');

                }
            };

            return (
        <>

            <div className="upi-wrapper">
                <div className="upi-card">

                    <h2>Set UPI PIN</h2>
                    <p className="upi-subtext">
                        Create a 4-digit UPI PIN to secure your payments
                    </p>

                    <div className="upi-id-box">
                        <span>Your UPI ID</span>
                        <p className="upi-id">
                            {profileState?.upi_id || "UPI ID not available"}
                            </p>
                    </div>

                    <label>Enter UPI PIN</label>
                    <input
                        type="password"
                        maxLength="4"
                        placeholder="● ● ● ●"
                        value={upiPin}
                        onChange={(e) => setUpiPin(e.target.value)}
                    />

                    <label>Confirm UPI PIN</label>
                    <input
                        type="password"
                        maxLength="4"
                        placeholder="● ● ● ●"
                        value={confirmPin}
                        onChange={(e) => setConfirmPin(e.target.value)}
                    />

                    <button className="upi-btn" onClick={handleSetPin}>
                        Set UPI PIN
                    </button>

                    <p className="upi-info">
                        🔒 Your PIN is encrypted and never shared
                    </p>
                </div>

                {/* Right side info card */}
                <div className="upi-side-card">
                    <h3>Why UPI PIN?</h3>
                    <ul>
                        <li>✔ Secure every payment</li>
                        <li>✔ Required for Send Money</li>
                        <li>✔ Bank-grade encryption</li>
                        <li>✔ Works across Gradious Pay</li>
                    </ul>
                </div>
            </div>

        </>
    );
}
