import { useState } from "react";
import IconRow from "../IconRow";
import RewardComponent from "../mobile_Recharge/RewardComponent";
import "./Landline.css";

function Landline() {
  const [landlineType, setLandlineType] = useState("");

  return (
    <>

      <div className="recharge-container">
        <IconRow active="Landline" />

        <div className="Reward-recharge">

          <div className="dth-card">
            <h2>Pay Landline Bill</h2>

            <input type="text" placeholder="Landline Number (with STD Code)" />

            <select className="select_input">
              <option>Select Operator</option>
              <option>BSNL Landline</option>
              <option>Airtel Landline</option>
              <option>MTNL</option>
              <option>Tata Tele Business</option>
            </select>

            <div className="amount-row">
              <input type="text" placeholder="Amount" />
            </div>

            <button className="recharge-btn">Proceed to Pay</button>
          </div>

          {/* REWARD COMPONENT */}
          <RewardComponent 
            h2={"Pay Landline Anytime"}
            h1={"Get Instant Confirmation"}
            img_url={"./public/icons_3_adds/landline sticker.png"} 
          />

        </div>
      </div>
    </>
  );
}

export default Landline;
