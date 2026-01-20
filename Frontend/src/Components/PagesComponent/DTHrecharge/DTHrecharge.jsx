import { useState } from "react";
import IconRow from "../IconRow";
import RewardComponent from "../mobile_Recharge/RewardComponent";
import './DTHrecharge.css';
function DTHrecharge(){
  const [type, setType] = useState("prepaid");

  return (
   <>
  
    <div className="recharge-container">
           <IconRow active="DTH" />
        <div className="Reward-recharge">
          <div className="dth-card">
                  <h2>Recharge DTH Connection</h2>
                  <div className="radio-row">
                    <label>
                      <input type="radio" name="dthType" defaultChecked /> Prepaid
                    </label>
                    <label>
                      <input type="radio" name="dthType" /> Postpaid
                    </label>
                  </div>

                  <input type="text" placeholder="Subscriber ID" />
                    <select className='select_input'>
                          <option>Select Operator</option>
                          <option>Airtel Digital TV</option>
                          <option>TATA play</option>
                          <option>Dish TV</option>
                          <option>SunDirect</option>
                    </select>

                  <div className="amount-row">
                    <input type="text" placeholder="Amount" />
                    <a href="#" className="browse-plans">Browse Plans</a>
                  </div>

                  <button className="recharge-btn">Proceed to Recharge</button>
                </div>
                     
                <RewardComponent h2={'Recharge &'} h1={'get reward'} img_url={"./public/icons_3_adds/DTH tv ad sticker.png"}/>
      </div>
    </div>
  </>
  );
}

export default DTHrecharge;
