import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMobileAlt,
  FaTv,
  FaSubway,
  FaPhone,
  FaBook,
  FaHome,
  FaShieldAlt,
  FaBolt,
  FaGasPump,
  FaTint,
  FaUniversity,
  FaCar,
  FaBus,
  FaHeartbeat,
} from "react-icons/fa";
import "./Viewall.css";
import HeaderBar from "../HeaderBar";
import FooterBar from "../FooterBar";

function ServicesPage() {
  const navigate = useNavigate();

  const services = [
    { icon: <FaMobileAlt color="#3b82f6" size={34} />, label: "Prepaid", path:"/MobileRecharge" },
    { icon: <FaTv color="#626b77ff" size={34} />, label: "DTH", path:"/DTHrecharge" },
    { icon: <FaSubway color="#2563eb" size={34} />, label: "Metro",path:"/Metrorecharge" },
    { icon: <FaPhone color="#111827" size={34} />, label: "Broadband", path:"/BroadbandRecharge" },
    { icon: <FaBook color="#9333ea" size={34} />, label: "Education", path:"/Education"},

    
    { icon: <FaHome color="#8b5cf6" size={34} />, label: "Landline", path: "/landline" },
    { icon: <FaShieldAlt color="#374151" size={34} />, label: "Pay Loan", path:'/PayLoan' },
    { icon: <FaBolt color="#f59e0b" size={34} />, label: "Electricity", path:'/ElectricityBill'},
    { icon: <FaGasPump color="#dc2626" size={34} />, label: "Gas", path:'/GasBill' },
    { icon: <FaTint color="#0ea5e9" size={34} />, label: "Water", path:'/WaterBill'},

    { icon: <FaUniversity color="#4f46e5" size={34} />, label: "Rent", path:'/HouseRent' },
    { icon: <FaCar color="#9333ea" size={34} />, label: "Fastag", path:'/Fastag' },
    { icon: <FaBus color="#1f2937" size={34} />, label: "Bus Pass", path:'/BusPass' },
    { icon: <FaHeartbeat color="#dc2626" size={34} />, label: "Insurance", path:'/Insurance' },
  ];

  return (
    <>
            <HeaderBar/>
            <div className="services-container">
            <h1 className="services-title">Services</h1>

            <div className="services-grid">
                {services.map((service, index) => (
                <div
                    key={index}
                    className="service-card"
                    onClick={() => navigate(service.path)}
                >
                    <div className="service-icon">{service.icon}</div>
                    <p>{service.label}</p>
                </div>
                ))}
            </div>
            </div>
            <FooterBar/>
</>
  );
}

export default ServicesPage;
