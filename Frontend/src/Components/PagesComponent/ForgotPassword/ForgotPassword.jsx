import "./ForgotPassword.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  // steps: EMAIL -> OTP -> RESET
  const [step, setStep] = useState("EMAIL");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  

  const handleSendOtp = async () => {
  if (!email) {
    alert("Please enter registered email");
    return;
  }

  setLoading(true);
  try {
    const res = await fetch("http://localhost:3000/otp/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("OTP sent to your email");
    setStep("OTP");

  } catch (err) {
    console.error(err);
    alert("Server error");
  } finally {
    setLoading(false);
  }
};

  

  
  const handleVerifyOtp = async () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/otp/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Invalid OTP");
        return;
      }

      alert("OTP verified");
      setStep("RESET");

    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= RESET PASSWORD ================= */
  const handleResetPassword = async () => {
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/otp/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Password reset failed");
        return;
      }

      alert("Password Updated Successfully");
      navigate("/loginpage");

    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
 

      <div className="forgot-wrapper">
        <div className="forgot-card">

          <h2>Forgot Password</h2>

          {/* email verification  */}

          {step === "EMAIL" && (
            <>
              <p className="subtitle">
                Enter your registered email to receive OTP
              </p>

              <input
                type="email"
                placeholder="Registered Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button onClick={handleSendOtp} disabled={loading}>
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </>
          )}


         {/* Otp verification*/}
          {step === "OTP" && (
            <>
              <p className="subtitle">
                Enter the OTP sent to your email
              </p>

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <p>enter otp within 5 min</p>

              <button onClick={handleVerifyOtp} disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          )}

         


          {step === "RESET" && (
            <>
              <p className="subtitle">
                Set a new password
              </p>

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button onClick={handleResetPassword} disabled={loading}>
                {loading ? "Updating..." : "Reset Password"}
              </button>
            </>
          )}

          <p className="back-login">
            Remembered password?
            <span onClick={() => navigate("/loginpage")}> Login</span>
          </p>

        </div>
      </div>

    </>
  );
}
