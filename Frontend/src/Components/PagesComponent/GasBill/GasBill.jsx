import { useState } from "react";
import IconRow from "../IconRow";
import RewardComponent from "../mobile_Recharge/RewardComponent";
import "./GasBill.css";

function GasBill() {
  const [provider, setProvider] = useState("");

  return (
    <>

      <div className="recharge-container">
        <IconRow active="Gas" />

        <div className="Reward-recharge">

          {/* SAME CARD DESIGN AS ALL OTHER COMPONENTS */}
          <div className="dth-card">
            <h2>Pay Gas Bill</h2>

            <select className="select_input">
              <option>Select Gas Provider</option>
              <option>HP Gas</option>
              <option>Bharat Gas</option>
              <option>Indane Gas</option>
              <option>Adani Gas</option>
              <option>Gujarat Gas</option>
              <option>Mahanagar Gas</option>
              <option>AG&P Pratham</option>
            </select>

            <input 
              type="text" 
              placeholder="Customer Number / LPG ID" 
            />

            <div className="amount-row">
              <input type="text" placeholder="Amount" />
            </div>

            <button className="recharge-btn">Proceed to Pay</button>
          </div>

          {/* REWARD COMPONENT */}
          <RewardComponent
            h2={"Pay Gas Bill &"}
            h1={"Get Quick Receipt"}
            img_url={"./public/icons_3_adds/cylinder sticker.png"}
          />

        </div>
      </div>
    </>
  );
}

export default GasBill;
