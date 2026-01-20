import { useState } from "react";
import IconRow from "../IconRow";
import RewardComponent from "../mobile_Recharge/RewardComponent";
import "./WaterBill.css";

function WaterBill() {
  const [provider, setProvider] = useState("");

  return (
    <>
      

      <div className="recharge-container">
        <IconRow active="Water" />

        <div className="Reward-recharge">

          {/* SAME CARD DESIGN AS ALL OTHER COMPONENTS */}
          <div className="dth-card">
            <h2>Pay Water Bill</h2>

            <select className="select_input">
              <option>Select Water Provider</option>
              <option>Hyderabad Metro Water Supply</option>
              <option>Bangalore Water Supply (BWSSB)</option>
              <option>Delhi Jal Board</option>
              <option>Chennai Metro Water</option>
              <option>Mumbai Water Department</option>
              <option>Pune Water Supply</option>
            </select>

            <input 
              type="text" 
              placeholder="Consumer Number / Connection ID" 
            />

            <div className="amount-row">
              <input type="text" placeholder="Amount" />
            </div>

            <button className="recharge-btn">Proceed to Pay</button>
          </div>

          {/* REWARD AD COMPONENT */}
          <RewardComponent
            h2={"Pay Your Water Bill &"}
            h1={"Get Instant Receipt"}
            img_url={"./public/icons_3_adds/water tap.png"}
          />

        </div>
      </div>
    </>
  );
}

export default WaterBill;
