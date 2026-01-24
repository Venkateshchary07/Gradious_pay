import './RegisterPage.css';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const mobileRef = useRef(null);

  const [step, setStep] = useState("REGISTER");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleRegister = async () => {
    const name = nameRef.current.value.trim();
    const emailVal = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const mobile = mobileRef.current.value;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!name) return alert("Name is required");
    if (mobile.length !== 10) return alert("Enter valid 10-digit mobile number");
    if (!emailRegex.test(emailVal)) return alert("Enter valid email");
    if (password.length < 6) return alert("Password must be at least 6 characters");
    if (password !== confirmPassword) return alert("Passwords do not match");

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: emailVal, password, mobile })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("OTP sent to your email");
      setEmail(emailVal);
      setStep("OTP");

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return alert("Enter OTP");

    try {
      const response = await fetch("http://localhost:3000/otp/verify-register-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Registration successful. Please login.");
      navigate("/loginpage");

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="Register-Page">
      <div className="Register-Container">

        <div className="Gradious-logo">
          <img
            className="Gradious-logo"
            src="./public/Gradious-logo-pngf.png"
            alt="Gradious-logo"
          />
        </div>

        {step === "REGISTER" && (
          <>
            <h2>Create Account</h2>

            <input className="Register-input" placeholder="Full Name" ref={nameRef} />
            <input className="Register-input" placeholder="Email" ref={emailRef} />
            <input className="Register-input" placeholder="Mobile Number" ref={mobileRef} />
            <input className="Register-input" type="password" placeholder="Password" ref={passwordRef} />
            <input className="Register-input" type="password" placeholder="Confirm Password" ref={confirmPasswordRef} />

            <button className="Register-button" onClick={handleRegister}>
              Register
            </button>

            <p className="login-link">
              Already have an account?
              <span onClick={() => navigate("/loginpage")}> Login</span>
            </p>
          </>
        )}

        {step === "OTP" && (
          <>
            <h2>Verify OTP</h2>

            <input
              className="Register-input"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button className="Register-button" onClick={handleVerifyOtp}>
              Verify OTP
            </button>
          </>
        )}

      </div>
    </div>
  );
}
