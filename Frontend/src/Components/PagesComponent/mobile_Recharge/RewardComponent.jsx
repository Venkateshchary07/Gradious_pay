import React from "react";
import "./RewardComponent.css";

function RewardComponent({img_url,h2,h1}) {
  return (
    <div className="reward-banner">

      <div className="reward-image">
        <img
          src={img_url} 
          alt="Reward illustration"
        />
      </div>

      <div className="reward-content">
        <h2 className="reward-title">{h2}</h2>
        <h1 className="reward-amount">{h1}</h1>
        <p className="reward-subtext">Secure payments</p>
      </div>
    </div>
  );
}

export default RewardComponent;
