import { useState } from "react";
import IconRow from "../IconRow";
import RewardComponent from "../mobile_Recharge/RewardComponent";
import "./ElectricityBill.css";

function ElectricityBill() {
  const [board, setBoard] = useState("");

  return (
    <>

      <div className="recharge-container">
        <IconRow active="Electricity" />

        <div className="Reward-recharge">

          {/* SAME CARD DESIGN AS ALL COMPONENTS */}
          <div className="dth-card">
            <h2>Pay Electricity Bill</h2>

            <select className="select_input">
              <option>Select Electricity Board</option>
              <option>TSNPDCL</option>
              <option>TSSPDCL</option>
              <option>APEPDCL</option>
              <option>APSPDCL</option>
              <option>Adani Electricity</option>
              <option>BESCOM</option>
              <option>CESCOM</option>
              <option>MESCOM</option>
            </select>

            <input type="text" placeholder="Consumer Number / Service No" />

            <input type="text" placeholder="Billing Unit / Sub Division (Optional)" />

            <div className="amount-row">
              <input type="text" placeholder="Amount" />
            </div>

            <button className="recharge-btn">Proceed to Pay</button>
          </div>

          {/* REWARD COMPONENT */}
          <RewardComponent
            h2={"Pay Electricity Bill &"}
            h1={"Get Instant Receipt"}
            img_url={"./public/icons_3_adds/electricity_reward.png"}
          />

        </div>
      </div>
    </>
  );
}

export default ElectricityBill;
