import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useProfileData } from "../../../context/ProfileContext";
import { useEffect } from "react";
export default function Profile() {
      const navigate = useNavigate();
      const {profileState,changeProfile,clearProfileData}= useProfileData()
 
        const user = {
                    name:profileState.name,
                    mobile:profileState.Mobile,
                    email: profileState.email,
                    upiId: profileState.upi_id,
                    status: profileState.status,
                    registeredAt:profileState.created_at
        };
      
        
    const  handleLogOut =()=> {
              localStorage.removeItem("token");
                    clearProfileData(null);
                    navigate("/loginpage");    }
  return (
    <>

      <div className="profile-wrapper">

        <h2 className="profile-title">View Profile</h2>

        <div className="profile-card">

          {/* Tabs */}
          <div className="profile-tabs">
            <span className="active">Personal Info</span>
            <span>Address</span>
            <span>Change Password</span>
            <span>UPI Management</span>
            <span>Security</span>
          </div>

          <div className="profile-content">

            {/* LEFT CARD */}
            <div className="profile-left">
              <div className="profile-avatar"></div>

              <h3>{user.name}</h3>
              <p>Mobile: {user.mobile}</p>
              <p>Email: {user.email}</p>

              <div className="upi-box">
                {user.upiId}
              </div>

              <button className="edit-btn">Edit Profile</button>
            </div>

            {/* RIGHT CARD */}
            <div className="profile-right">

              <div className="info-row">
                <div>
                  <label>Full Name</label>
                  <p>{user.name}</p>
                </div>

                <div>
                  <label>Primary Mobile</label>
                  <p>{user.mobile}</p>
                </div>
              </div>

              <div className="info-row">
                <div>
                  <label>Email</label>
                  <p className="link">{user.email}</p>
                </div>

                <div>
                  <label>Status</label>
                  <span className="status active">{user.status}</span>
                </div>
              </div>

              <div className="info-row">
                <div>
                  <label>UPI ID</label>
                  <p>{user.upiId}</p>
                </div>

                <div>
                  <label>Registered On</label>
                  <p>{user.registeredAt}</p>
                </div>
              </div>

              <div className="info-row">
                <div>
                  <button className="add-btn" onClick={handleLogOut}>Log out</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

     
    </>
  );
}
