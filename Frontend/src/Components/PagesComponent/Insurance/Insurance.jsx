import { useState } from "react";
import IconRow from "../IconRow";
import RewardComponent from "../mobile_Recharge/RewardComponent";
import "./Insurance.css";

function Insurance() {
  const [insuranceType, setInsuranceType] = useState("");

  return (
    <>

      <div className="recharge-container">
        <IconRow active="Insurance" />

        <div className="Reward-recharge">

          {/* MATCHED CARD DESIGN */}
          <div className="dth-card">
            <h2>Pay Insurance Premium</h2>

            <select className="select_input">
              <option>Select Insurance Category</option>
              <option>Life Insurance</option>
              <option>Health Insurance</option>
              <option>Vehicle Insur ance</option>
              <option>Travel Insurance</option>
              <option>Home Insurance</option>
            </select>

            <select className="select_input">
              <option>Select Insurance Provider</option>
              <option>LIC</option>
              <option>ICICI Lombard</option>
              <option>HDFC Life</option>
              <option>SBI Life</option>
              <option>Bajaj Allianz</option>
              <option>Tata AIG</option>
            </select>

            <input 
              type="text" 
              placeholder="Policy Number" 
            />

            <div className="amount-row">
              <input type="text" placeholder="Premium Amount" />
            </div>

            <button className="recharge-btn">Proceed to Pay</button>
          </div>

          {/* REWARD COMPONENT */}
          <RewardComponent
            h2={"Pay Insurance Online &"}
            h1={"Get Instant Receipt"}
            img_url={"./public/icons_3_adds/insurance_reward.png"}
          />

        </div>
      </div>
    </>
  );
}

export default Insurance;
