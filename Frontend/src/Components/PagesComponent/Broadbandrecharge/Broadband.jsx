import { useState } from "react";
import IconRow from "../IconRow";
import RewardComponent from "../mobile_Recharge/RewardComponent";
import "./Broadband.css";

function BroadbandRecharge() {
  const [connectionType, setConnectionType] = useState("prepaid");

  return (
    <>
     

      <div className="recharge-container">
        <IconRow active="Broadband" />

        <div className="Reward-recharge">

          {/* Same UI card as DTH / Metro */}
          <div className="dth-card">
            <h2>Recharge Broadband</h2>

            <input type="text" placeholder="Broadband Account Number" />

            <select className="select_input">
              <option>Select Operator</option>
              <option>ACT Fibernet</option>
              <option>Airtel Xstream Fiber</option>
              <option>Jio Fiber</option>
              <option>BSNL Broadband</option>
              <option>Hathway</option>
            </select>

            <div className="amount-row">
              <input type="text" placeholder="Amount" />
            </div>

            <button className="recharge-btn">Proceed to Recharge</button>
          </div>

          {/* Reward Advertisement */}
          <RewardComponent h2={'Recharge &'} h1={'get reward'} img_url={"./public/icons_3_adds/broadband_reward.png"} />
        </div>
      </div>
    
    </>
  );
}

export default BroadbandRecharge;
