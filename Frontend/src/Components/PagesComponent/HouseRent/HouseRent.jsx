import { useState } from "react";
import IconRow from "../IconRow";
import RewardComponent from "../mobile_Recharge/RewardComponent";
import "./HouseRent.css";


function HouseRent() {
  const [rentType, setRentType] = useState("");

  return (
    <>

      <div className="recharge-container">
        <IconRow active="Rent" />

        <div className="Reward-recharge">


          <div className="dth-card">
            <h2>Pay House Rent</h2>

            <input 
              type="text" 
              placeholder="Tenant/Registered Mobile Number" 
            />

            <input 
              type="text" 
              placeholder="Landlord Name" 
            />

            <input 
              type="text" 
              placeholder="Landlord UPI ID" 
            />

            <div className="amount-row">
              <input type="text" placeholder="Rent Amount" />
            </div>

            <button className="recharge-btn">Proceed to Pay</button>
          </div>


          <RewardComponent
            h2={"Pay House Rent &"}
            h1={"Get Instant Receipt"}
            img_url={"./public/icons_3_adds/HouseRent sticker.png"}
          />

        </div>
      </div>
    </>
  );
}

export default HouseRent;
