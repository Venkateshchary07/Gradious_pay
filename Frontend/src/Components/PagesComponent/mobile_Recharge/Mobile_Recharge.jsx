import './Mobile_Recharge.css'
import { useState } from 'react';
function MobileRecharge(){
    const [type, setType] = useState("prepaid");
return(<div className="recharge-card">
                <h2>Recharge or Pay Mobile Bill</h2>

                <div className="radio-row">
                  <label>
                    <input
                      type="radio"
                      name="type"
                      value="prepaid"
                      checked={type === "prepaid"}
                      onChange={() => setType("prepaid")}
                    />
                    Prepaid
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="type"
                      value="postpaid"
                      checked={type === "postpaid"}
                      onChange={() => setType("postpaid")}
                    />
                    Postpaid
                  </label>
                </div>

                <input type="text" placeholder="Mobile Number" />
                <select className='select_input'>
                  <option>Select Operator</option>
                  <option>Jio</option>
                  <option>Bsnl</option>
                  <option>Airtel</option>
                  <option>Vodafone idea</option>

                </select>

                <div className="amount-row">
                  <input type="text" placeholder="Amount" />
                  <a href="#" className="browse-plans">Browse Plans</a>
                </div>

                <button className="recharge-btn">Proceed to Recharge</button>
              </div>);
}
export default MobileRecharge;