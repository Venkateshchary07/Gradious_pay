import './LoginPage.css';

import { useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useProfileData } from '../../context/ProfileContext';

export default function LoginPage() {
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const[userId,setUserId] = useState(0);
    const{profileState,changeProfile}= useProfileData();
    const handleLogin = async () => {
        const in_email = emailRef.current.value;
        const in_password = passwordRef.current.value;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(in_email)) {
            alert("Please enter a valid email");
            return;
        }

        if (!in_password.trim()) {
            alert("Password is required");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: in_email,
                    password: in_password
                })
            });

            const data = await response.json();
             setUserId(data.userId);
             console.log("This user is logged in "+ data.userId);
            if (!response.ok) {
                alert(data.message || "Login failed");
                return;
            }

            
            localStorage.setItem("token", data.token);
            const profileResponse = await fetch("http://localhost:3000/api/profiledata",{
                method:"GET",
                headers:{
                    Authorization: `Bearer ${data.token}`,
                    "Content-type":"application/json"
                }
            });
            if (!profileResponse.ok) {
                            alert("Failed to load profile");
                            return;
                            }

                const profileData = await profileResponse.json();

                changeProfile(profileData);
                localStorage.setItem("profile",JSON.stringify(profileData));

                navigate("/Homepage");

        } catch (error) {
            console.error(error);
            alert("Server error. Please try again.");
        }
    };

    return (
        <>
          

            <div className="Login-Page">
                <div className="Login-Container">
                    <div className="Gradious-logo">
                        <img
                            className="Gradious-logo"
                            src="./public/Gradious-logo-pngf.png"
                            alt="Gradious-logo"
                        />
                    </div>

                    <h2>Welcome Back</h2>

                    <input
                        className="Login-input"
                        type="text"
                        placeholder="Email"
                        ref={emailRef}
                    />

                    <input
                        className="Login-input"
                        type="password"
                        placeholder="Password"
                        ref={passwordRef}
                    />

                    <button className="Login-button" onClick={handleLogin}>
                        Login
                    </button>

                    <p className="register-link">
    Don’t have an account?
    <span onClick={() => navigate("/register")}> Register</span>
</p>
                    
    <p className='forgot-password' onClick={() => navigate("/forgotpassword")}>Forgot password?</p>

                </div>
            </div>

           
        </>
    );
}
