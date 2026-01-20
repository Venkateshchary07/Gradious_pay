import { useState } from "react";
import IconRow from "../IconRow";
import RewardComponent from "../mobile_Recharge/RewardComponent";
import "./Fasttag.css";

function Fastag() {
  const [provider, setProvider] = useState("");

  return (
    <>


      <div className="recharge-container">
        <IconRow active="Fastag" />

        <div className="Reward-recharge">



          <div className="dth-card">
            <h2>Recharge FASTag</h2>

            <select className="select_input">
              <option>Select FASTag Provider</option>
              <option>HDFC FASTag</option>
              <option>ICICI FASTag</option>
              <option>SBI FASTag</option>
              <option>Paytm FASTag</option>
              <option>Bank of Baroda FASTag</option>
              <option>Axis Bank FASTag</option>
            </select>


            <input 
              type="text" 
              placeholder="Vehicle Number (e.g., TS09AB1234)" 
            />

            <input 
              type="text" 
              placeholder="FASTag Wallet ID (Optional)" 
            />

            <div className="amount-row">
              <input type="text" placeholder="Recharge Amount" />
            </div>

            <button className="recharge-btn">Proceed to Recharge</button>
          </div>

          
          {/* REWARD COMPONENT */}
          <RewardComponent
            h2={"Recharge FASTag &"}
            h1={"Get Instant Cashback"}
            img_url={"./public/icons_3_adds/fastag_reward.png"}
          />

        </div>
      </div>
    </>
  );
}

export default Fastag;
