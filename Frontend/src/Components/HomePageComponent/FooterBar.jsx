import './FooterBar.css';
import { FaFacebook,FaTwitter, FaInstagram, FaLinkedin} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
export default function FooterBar(){
    const navigate = useNavigate();
    return(
        <footer className="Gradious-footer-container">
            <div className="footer-content-wrapper">
                <div className="footer-column links-section">
                    
                    <div className="link-group">
                        <h4 className="footer-heading">Payments & Services</h4>
                        <a href="#recharge"onClick={()=>navigate("/MobileRecharge")} className="footer-link">Mobile Recharge</a>
                        <a href="#bills"onClick={()=>navigate("/ElectricityBill")} className="footer-link">Electricity & Bills</a>
                        <a href="#fastag"onClick={()=>navigate("/Fastag")} className="footer-link">FASTag</a>
                        <a href="#emi"onClick={()=>navigate("/PayLoan")} className="footer-link">Loan EMI</a>
                        <a href="#payments"onClick={()=>navigate("/MobileRecharge")} className="footer-link">Wallet Payments</a>
                    </div>
                    
                    <div className="link-group">
                        <h4 className="footer-heading">Travel & Finance</h4>
                        <a href="#flights"onClick={()=>navigate("/flightticket")} className="footer-link">Flight Tickets</a>
                        <a href="#trains"onClick={()=>navigate("/trainticket")} className="footer-link">Train Tickets</a>
                        <a href="#insurance"onClick={()=>navigate("/Insurance")} className="footer-link">Insurance</a>
                        <a href="#credit"onClick={()=>navigate("/MobileRecharge")} className="footer-link">Credit Cards</a>
                        <a href="#invest"onClick={()=>navigate("/MobileRecharge")} className="footer-link">Investments</a>
                    </div>
                    
                    <div className="link-group">
                        <h4 className="footer-heading">Company</h4>
                        <a href="#about" className="footer-link">About Us</a>
                        <a href="#careers" className="footer-link">Careers</a>
                        <a href="#contact" className="footer-link">Contact Us</a>
                        <a href="#blog" className="footer-link">Blog</a>
                    </div>

                </div>

                <div className="footer-column contact-social-section">
                    
                    <div className="footer-branding">
                        <img src="./public/Gradious-logo-pngf.png" alt="Gradious Pay Logo" className="footer-logo" />
                        <h3 className="footer-brand-text">Gradious Pay</h3>
                    </div>

                    <p className="footer-contact">
                        Need Help? Contact us at: <br/> 
                        <a href="mailto:support@gradiouspay.com" className="footer-link">support@gradiouspay.com</a>
                    </p>

                    <div className="social-icons">
                       <FaFacebook onClick={() => navigate("https://www.facebook.com/") }/>
                        <FaTwitter onClick={() => navigate("https://www.facebook.com/") }/>
                       <FaInstagram onClick={() => navigate("https://www.instagram.com/gradioustech?igsh=emM0bXJyYTVlNXN1") }/>
                       <FaLinkedin onClick={() => navigate("https://www.linkedin.com/company/gradious/posts/?feedView=all") }/>
                    </div>
                </div>
            </div>

            <div className="footer-copyright-row">
                <p>&copy; {new Date().getFullYear()} Gradious Pay. All rights reserved.</p>
                <p className="footer-small-text">Made for Web Application.</p>
            </div>
        </footer>
    );
}