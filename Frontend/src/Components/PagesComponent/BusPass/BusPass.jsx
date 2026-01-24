import { useState } from "react";
import IconRow from "../IconRow";
import RewardComponent from "../mobile_Recharge/RewardComponent";
import "./BusPass.css";

function BusPass() {
  const [busType, setBusType] = useState("");

  return (
    <>
    

      <div className="recharge-container">
        <IconRow active="Bus Pass" />

        <div className="Reward-recharge">

          <div className="dth-card">
            <h2>Recharge Bus Pass</h2>

            <select className="select_input">
              <option>Select Transport Service</option>
              <option>TSRTC</option>
              <option>APSRTC</option>
              <option>BMTC</option>
              <option>KSRTC</option>
              <option>Delhi DTC</option>
              <option>BEST Mumbai</option>
            </select>

            <input 
              type="text" 
              placeholder="Bus Pass Number" 
            />

            <input 
              type="text" 
              placeholder="Card Holder Name" 
            />

            <div className="amount-row">
              <input type="text" placeholder="Recharge Amount" />
            </div>

            <button className="recharge-btn">Proceed to Recharge</button>
          </div>

          {/* REWARD SECTION */}
          <RewardComponent
            h2={"Recharge Your Bus Pass &"}
            h1={"Get Travel Rewards"}
            img_url={"./public/icons_3_adds/bus_reward.png"}
          />

        </div>
      </div>
    </>
  );
}

export default BusPass;
