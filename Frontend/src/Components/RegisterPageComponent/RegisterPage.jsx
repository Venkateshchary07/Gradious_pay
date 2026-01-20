import './RegisterPage.css';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const navigate = useNavigate();

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const mobileRef = useRef(null);
    

    const handleRegister = async () => {
        const name = nameRef.current.value.trim();
        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        const mobile = mobileRef.current.value;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!name) {
            alert("Name is required");
            return;
        }
        if(mobile.length <10){
            alert("Required 10 Digits mobile number")
        }

        if (!emailRegex.test(email)) {
            alert("Please enter a valid email");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        

        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    mobile
                })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Registration failed");
                return;
            }

            alert("Registration successful Please login.");
            navigate("/loginpage");

        } catch (error) {
            console.error(error);
            alert("Server error   Please try again.");
        }
    };

    return (
        <>
           

            <div className="Register-Page">
                <div className="Register-Container">
                    <div className="Gradious-logo">
                        <img
                            className="Gradious-logo"
                            src="./public/Gradious-logo-pngf.png"
                            alt="Gradious-logo"
                        />
                    </div>

                    <h2>Create Account</h2>

                    <input
                        className="Register-input"
                        type="text"
                        placeholder="Full Name"
                        ref={nameRef}
                    />

                    <input
                        className="Register-input"
                        type="text"
                        placeholder="Email"
                        ref={emailRef}
                    />
                    <input
                        className="Register-input"
                        type="text"
                        placeholder="Mobile Number"
                        ref={mobileRef}
                    />

                    <input
                        className="Register-input"
                        type="password"
                        placeholder="Password"
                        ref={passwordRef}
                    />

                    <input
                        className="Register-input"
                        type="password"
                        placeholder="Confirm Password"
                        ref={confirmPasswordRef}
                    />

                    <button className="Register-button" onClick={handleRegister}>
                        Register
                    </button>

                    <p className="login-link">
                        Already have an account?
                        <span onClick={() => navigate("/loginpage")}> Login</span>
                    </p>
                </div>
            </div>

           
        </>
    );
}
