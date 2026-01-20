import { useState } from "react";
import IconRow from "../IconRow";
import RewardComponent from "../mobile_Recharge/RewardComponent";
import "./MetroRecharge.css";
     
function MetroRecharge() {
  const [type, setType] = useState("metro");

  return (
    <>

      <div className="recharge-container">
        <IconRow active="Metro" />

        <div className="Reward-recharge">

          {/* SAME UI as DTH, only fields changed */}
          <div className="dth-card">
            <h2>Recharge Metro Card</h2>

            <input type="text" placeholder="Metro Card Number" />

            <select className="select_input">
              <option>Select Metro Operator</option>
              <option>Hyderabad Metro</option>
              <option>Delhi Metro</option>
              <option>Mumbai Metro</option>
              <option>Bengaluru Metro</option>
              <option>Kolkata Metro</option>
            </select>

            <div className="amount-row">
              <input type="text" placeholder="Amount" />
            </div>

            <button className="recharge-btn">Proceed to Recharge</button>
          </div>

          <RewardComponent h2={"Pay Here&"} h1={"Get paperless ticket | get rewarded"} img_url={"./public/icons_3_adds/Gift sticker.png"} />
        </div>
      </div>
    </>
  );
}

export default MetroRecharge;
