import './HeaderBar.css'
import SelectMenu from './SelectMenu';
import { useNavigate } from 'react-router-dom';
import { useProfileData } from '../../context/ProfileContext';

export default function HeaderBar(props){
   const navigate = useNavigate();
   const{profileState}=useProfileData()
   console.log("user profile"+JSON.stringify(profileState));
    return(
       <header className="DashBoard-header">
              <div className="left-section">
                     <img className='Gradious-logo-icon' onClick={()=>navigate("https://gradious.com/")} src="./public/Gradious-logo-pngf.png" alt="Gradious-logo" />
                     <h1 onClick={()=>navigate("/homepage") } className="Gradious-text">Gradious Pay</h1>

                     <div className="nav-items"> 
                            <SelectMenu
                                label="Recharge & Bills"
                                options={[
                                {text:"Mobile Recharge",
                                 path:"/MobileRecharge"
                                },
                                {text:"Electricity Bill",
                                 path:"/ElectricityBill"
                                },
                                {text: "DTH Recharge",
                                 path:"/DTHrecharge"
                                },
                                {text:"Gas Cylinder",
                                 path:"/GasBill"
                                },
                                {text:"Loan EMI",
                                 path:"/PayLoan"
                                },
                                {text:"Water Bill",
                                 path:"/WaterBill"
                                }
                                ]}
                            />
                            <SelectMenu
                              label='Travel tickets'
                              options={[
                            {text:"Bus ticket", 
                              path:"/busticket"},
                            {text:"Train ticket", 
                             path:"/trainticket"},
                            {text:"Flight ticket", 
                             path:"/flightticket"}
                            ]}


                            />
                            <SelectMenu
                            label="Payments & Services"
                            options={[
                            {text:"Send Money to Anyone", 
                              path:"/sendmoney"},
                            {text:"Transaction History", 
                              path:"/transactionhistory"},
                            {text:"Loan Payment", 
                             path:"/trainticket"},
                            {text:"Wealth", 
                             path:"/flightticket"},
                            {text:"Wallet-Top-Up", 
                             path:"/wallettopup"}
                            ]}
                            />
                     </div>
              </div>
              <div className="right-section" onClick={()=>navigate('/profile')}>
                     <div className="user-profile-outer">
                     <div className="user-Profile"></div>
                     <p>Hi {profileState?.name.trim().split(" ")[0] || "User"}</p>
                     </div>
              </div>

        </header>
    );
}