import "./HomePage.css";
import BottomAd from "./BottomAd";
import { Gift, Share2,Plane,Home} from 'lucide-react';



import {useNavigate } from "react-router-dom";
function HomePage(){
    const navigate =useNavigate();
    function AdComponent(props){
        return(
            <div className="Ad-container">
                <div className="Ad-text-content">
                    <h2>{props.h1}</h2>
                    <p>{props.h2}</p>
                    <button style={{ backgroundColor: props.btnColor, color: props.textColor }} className="Download-btn">{props.btn}</button>
                </div>
                <span>
                    <img className="Ad-Container-Img" src={props.url} alt="Mobile Screen"></img>
                </span>
            </div>
        )
    }
    return(
      <>
       {/* <HeaderBar/> */}
        <main>
        <div className="Recharge-bill-ad">
            <div className="recharge-containerH">
                <h3 className="section-title">Recharges & Bill Payments</h3>

                <div className="recharge-grid">

                    <div className="recharge-item" onClick={()=>navigate("/MobileRecharge") }>
                        <img src="./public/Reacharge_bills_icons/Recharge_icon1.png" alt="Mobile Recharge" />
                        <p >Mobile Recharge</p>
                    </div>

                    <div className="recharge-item" onClick={()=>navigate("/DTHrecharge")}>
                        <img src="./public/Reacharge_bills_icons/DTH_icon.png" alt="DTH Recharge" />
                        <p>DTH Recharge</p>
                    </div>

                    <div className="recharge-item" onClick={()=>navigate("/Fastag")}>
                        <img src="./public/Reacharge_bills_icons/fasttag_icons.png" alt="FastTag" />
                        <p>FastTag</p>
                    </div>

                    <div className="recharge-item" onClick={()=>navigate("/ElectricityBill")}>
                        <img src="./public/Reacharge_bills_icons/Electric_icon.png" alt="Electricity" />
                        <p>Electricity Bill</p>
                    </div>

                    <div className="recharge-item" onClick={()=>navigate("/PayLoan")}>
                        <img src="./public/Reacharge_bills_icons/Loan_emi_icons.png" alt="Loan EMI" />
                        <p>Loan EMI</p>
                    </div>

                    <div className="recharge-item" onClick={() => navigate("/services")}
>
                        <img src="./public/Reacharge_bills_icons/Viewall_icon.png" alt="All" />
                        <p>View All</p>
                    </div>

                </div>
            </div>
            <div className="top-right-ad new-math-card">
                <h2>We do the math,<br/> you do the spending</h2>
                <p>Check total balance for all linked bank accounts</p>

                <button className="use-gradious-btn">
                    Use Gradious Pay Now →
                </button>
</div>

        </div>
        <div className="Recharge-ad-cards">
            <div className="Promo-recharge">
                    <div className="icon-ad">
                             <div><Plane></Plane></div>
                           <p> Book your next flight</p>
                    </div>
                    <div className="icon-ad">
                            <Home></Home>
                          <p>  Pay Utility Bills</p>
                    </div>

                 
                 
            </div>
            <div className="Promo-recharge Promo-recharge2">
                        <div className="gift-icon">
                          <img src="./public/icons_3_adds/mobile_cashback.png" alt="" />
                        </div>
                             Do Mobile Recharge and Win Cashback!
                    <button className ="Promo-recharge2-button" onClick={()=>navigate("/MobileRecharge")}>Recharge now</button>

            </div>
        </div>
        <div className="Add-components">
            <AdComponent h1='Exclusive Offers Await'
             h2='Discover Personalised Deals'
             url='./public/icons_3_adds/gift_icon.png'
             btn='Explore Now'
             btnColor=""     /* green */
             textColor="coral"/>
            <AdComponent h1='Share & Earn Rewards'
              h2='invite friends,get cashback!'
              url='./public/icons_3_adds/transfer2.png'
              btn='Refer Now'
              btnColor="#1ABC9C"
              textColor="white"/>
            <AdComponent h1='Secure Your Account' 
             h2='Enable two-factor verification' 
             url='./public/icons_3_adds/Secure_icon2.png'
             btn='Setup EFA'
             btnColor="#5562b1ff" 
             textColor="white"/>
        </div>
        <div>
            <BottomAd></BottomAd>
        </div>
        </main>
       </>
  
    
    );
}
export default HomePage;
