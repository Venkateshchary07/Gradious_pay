import React from "react";
import "./IconRow.css";
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
  FaCar,
  FaBus,
  FaHeartbeat,
  FaUniversity,
  FaCreditCard,
  FaShoppingBag,
  FaPlane,
  FaTrain,
  FaGift,
  FaWallet
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
function IconRow({active }) {
  const navigate = useNavigate();
  const items = [
  { icon: FaMobileAlt, label: "Prepaid",path:"/MobileRecharge" },
  { icon: FaTv, label: "DTH",path:"/DTHrecharge" },
  { icon: FaSubway, label: "Metro",path:"/Metrorecharge" },
  { icon: FaPhone, label: "Broadband",path:"/BroadbandRecharge" },
  { icon: FaBook, label: "Education" ,path:"/Education"},
  { icon: FaHome, label: "Landline" ,path:'/LandlineRecharge'},
  { icon: FaShieldAlt, label: "Pay Loan",path:'/PayLoan' },
  { icon: FaBolt, label: "Electricity",path:'/ElectricityBill' },
  { icon: FaGasPump, label: "Gas",path:'/GasBill' },
  { icon: FaTint, label: "Water",path:'/WaterBill' },   
  { icon: FaUniversity, label: "Rent",path:'/HouseRent' },
  { icon: FaCar, label: "Fastag" ,path:'/Fastag'},
  { icon: FaBus, label: "Bus Pass",path:'/BusPass' },
  { icon: FaHeartbeat, label: "Insurance" ,path:'/Insurance'}
];
  return (
    <div className="icons-row">
      {items.map((item, index) => (
        <div
          key={index}
          className={`icon-item ${active === item.label ? "active" : ""}`}
        >
          <item.icon size={28} 
           onClick={() => navigate(item.path)}/>
          <p onClick={() => navigate(item.path)}>{item.label}</p>
        </div>
      ))}
    </div>
  );
}

export default IconRow;
