import { useState } from 'react';
import IconRow from '../IconRow';
import RewardComponent from '../mobile_Recharge/RewardComponent';
import './Education.css';

function Education() {
  const [educationType, setEducationType] = useState("");

  return (
    <>

      <div className="recharge-container">
        <IconRow active="Education" />

        <div className="Reward-recharge">

          {/* SAME CARD DESIGN AS DTH / METRO / BROADBAND */}
          <div className="dth-card">
            <h2>Pay Education Fees</h2>

            <input type="text" placeholder="Student ID / Admission No" />

            <select className="select_input">
              <option>Select Institute</option>
              <option>School</option>
              <option>College</option>
              <option>University</option>
              <option>Coaching Institute</option>
            </select>

            <select className="select_input">
              <option>Fee Type</option>
              <option>Tuition Fee</option>
              <option>Exam Fee</option>
              <option>Hostel Fee</option>
              <option>Library Fee</option>
            </select>

            <div className="amount-row">
              <input type="text" placeholder="Amount" />
            </div>

            <button className="recharge-btn">Proceed to Pay</button>
          </div>

          {/* REWARD COMPONENT */}
          <RewardComponent h2={'Pay Here&'} h1={'Get Online Recipt'}img_url={"./public/icons_3_adds/education sticker.png"} />

        </div>
      </div>
    </>
  );
}

export default Education;
