import './BottomAd.css';
function BottomAd(){
        return(
        <>
        <div className="Ad-conatiner-btm">
            <div className='for-text'>
                <div className='Gradious-icon'><img src="./public/Gradious-logo-pngf.png"></img><h3>GradiousPay</h3></div>
                <h1>
                    Pay anyone directly from your bank account
                </h1>
                <p>Pay anyone, everywhere. Make contactless & secure payments in-stores or online using Gradious UPI or Directly from your Bank Account. Plus, send & receive money from anyone.</p>

            </div>
            <div className='for-img'>
                    <img src="./public/icons_3_adds/btm ad img1.png"></img>
            </div>

        </div>
        <div className='two-cards'>
            <div className="PromoCard-container">
           
            <div className="card-text-section">
                <h4>Credit cards</h4>
                <h2 className="promo-headline-small">Unlock Your Potential</h2>
                <h1 className="promo-headline-large">Access Your Future.</h1>
                
                <p className="promo-description">
                    Pre-approved offers, fast application, and exclusive rates to help you get the credit you deserve today.
                </p>

                <button className="promo-cta-button">
                    Apply Now &rarr;
                </button>
                <img src='./public/icons_3_adds/credit_card3.png'></img>
            </div>
         </div>
         <div className="PromoCard-container Insurance-Bg-color">
            
            <div className="card-text-section">
                
                <h2 className="promo-headline-small insurance-text-color">Insurance & Protection</h2>
                
                <h1 className="promo-headline-large">Secure Your Future, <span className="insurance-text-color">Your Family.</span></h1>
                
                <p className="promo-description">
                    Comprehensive plans, easy claims, and trusted coverage for life of peace. Protect what matters most.
                </p>

                <button className="promo-cta-button">
                    Get It Now &rarr;
                </button>
            </div>
            
            <div className="card-illustration-bottom">
                <img 
                    src="./public/icons_3_adds/family_insurance_img1.png" 
                    alt="Family and Protection Shield" 
                />
            </div>
       
            
        </div>
    </div>
         <div className="BusinessAd-container Investment-Bg">
            
            <div className='ad-text-content-large'>
                <h3 className='Gradious-logo-text'><img src="./public/Gradious-logo-pngf.png" alt="Logo"></img>Gradious Pay</h3>
                
                <h1>
                    Grow Your Wealth, <span className='investment-text-color'>Your Way.</span>
                </h1>
                
                <p>
                    Diversify your portfolio with mutual funds, digital gold, and smart savings plans built for your goals. Start investing with ease.
                </p>

                <button className='business-ad-btn'>
                    Start Investing Now &rarr;
                </button>
            </div>
            
            <div className='ad-img-content-large'>
                <img src="./public/icons_3_adds/Investment.png" alt="Investment Illustration"></img> 
            </div>
        </div>
        </>
        );
}

export default BottomAd;