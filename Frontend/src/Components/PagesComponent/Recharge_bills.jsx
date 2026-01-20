import { useState } from "react";

import RewardComponent from "./mobile_Recharge/RewardComponent";
import IconRow from "./IconRow";
import MobileRecharge from "./mobile_Recharge/Mobile_Recharge";
import './Recharge_bills.css';
function Recharge_bills() {
  const [type, setType] = useState("prepaid");


  return (
   <>
 
    <div className="recharge-container">
            <IconRow active="Prepaid" />
        <div className="Reward-recharge">
          <MobileRecharge/>     
          <RewardComponent h2={'Recharge &'} h1={'get reward'} img_url={'./public/icons_3_adds/Recharge_reward.png'}/>
      </div>
    </div>
    
  </>
  );
}

export default Recharge_bills;
