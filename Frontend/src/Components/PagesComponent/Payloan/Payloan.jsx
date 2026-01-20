import { useState } from "react";
import IconRow from "../IconRow";
import RewardComponent from "../mobile_Recharge/RewardComponent";
import "./PayLoan.css";

function PayLoan() {
  const [loanType, setLoanType] = useState("");

  return (
    <>

      <div className="recharge-container">
        <IconRow active="Pay Loan" />

        <div className="Reward-recharge">

          {/* SAME CARD DESIGN AS OTHER COMPONENTS */}
          <div className="dth-card">
            <h2>Pay Loan EMI</h2>

            <input type="text" placeholder="Loan Account Number" />

            <select className="select_input">
              <option>Select Loan Type</option>
              <option>Personal Loan</option>
              <option>Home Loan</option>
              <option>Car Loan</option>
              <option>Education Loan</option>
              <option>Business Loan</option>
            </select>

            <select className="select_input">
              <option>Select Bank</option>
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
              <option>SBI</option>
              <option>Axis Bank</option>
              <option>Kotak Bank</option>
            </select>

            <div className="amount-row">
              <input type="text" placeholder="EMI Amount" />
            </div>

            <button className="recharge-btn">Proceed to Pay</button>
          </div>

          {/* REWARD COMPONENT */}
          <RewardComponent
            h2={"Quick EMI Payment &"}
            h1={"Get Instant Confirmation"}
            img_url={"./public/icons_3_adds/Payloan sticker.png"}
          />

        </div>
      </div>
    </>
  );
}

export default PayLoan;
