import {Routes,Route} from 'react-router-dom';
import HomePage from './Components/HomePageComponent/HomePage';
import RegisterPage from './Components/RegisterPageComponent/RegisterPage';
import LoginPage from './Components/LoginPageComponent/LoginPage';
import Profile from './Components/PagesComponent/profile/Profile';
import Recharge_bills from './Components/PagesComponent/Recharge_bills';
import DTHrecharge from './Components/PagesComponent/DTHrecharge/DTHrecharge';
import MetroRecharge from './Components/PagesComponent/MetroRecharge/MetroRecharge';
import BroadbandRecharge from './Components/PagesComponent/Broadbandrecharge/Broadband';
import Education from './Components/PagesComponent/Education/Education';
import LandlineRecharge from './Components/PagesComponent/LandlineRecharge/Landline';
import PayLoan from './Components/PagesComponent/Payloan/Payloan';
import ElectricityBill from './Components/PagesComponent/ElectricityBill/ElectricityBill';
import GasBill from './Components/PagesComponent/GasBill/GasBill';
import WaterBill from './Components/PagesComponent/WaterBill/WaterBill';
import HouseRent from './Components/PagesComponent/HouseRent/HouseRent';
import Fastag from './Components/PagesComponent/Fasttag/Fasttag';
import BusPass from './Components/PagesComponent/BusPass/BusPass';
import Insurance from './Components/PagesComponent/Insurance/Insurance';
import Viewall from './Components/HomePageComponent/Services/Viewall';


// Travel ticket pages components
import BusBooking from './Components/PagesComponent/BusTicket/BusTicket';
import FlightBooking from './Components/PagesComponent/FlightTicket/FlightTicket';
import TrainTicket from './Components/PagesComponent/TrainTicket/TrainTicket';


// Send money page 
import SendMoney from './Components/PagesComponent/SendMoneyPage/SendMoney';
import TransactionHistory from './Components/PagesComponent/TransactionHistory/TransactionHistory';
import TransactionSuccess from './Components/PagesComponent/TransactionHistory/TransactionSucess';
import ConfirmPayment from './Components/PagesComponent/SendMoneyPage/Confirm';
import SetUpiPin from './Components/PagesComponent/SetUpiPin/SetUpiPin';
import EnterPin from './Components/PagesComponent/Enter_pin/Enter_pin';


// Payments and Services 
import WalletTopUp from './Components/PagesComponent/WalletTopUp/WalletTopUp';
import ForgotPassword from './Components/PagesComponent/ForgotPassword/ForgotPassword';

import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";



function PagesRoutes(){
    const[isLoggedIn,setIsloggedIn]= useState(true);
     function ProtectedRoute({children}){
         const token = localStorage.getItem("token");

         if (!token) {
        return <Navigate to="/loginpage" />;
    }
try{
        const decoded = jwtDecode(token);
         

        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
            localStorage.removeItem("token");
            return <Navigate to="/loginpage" />;
        }

    } catch (err) {
        localStorage.removeItem("token");
        return <Navigate to="/loginpage" />;
    }
    return children;
};
    return(
        <Routes>

            <Route path='/'
                   element={
                    <ProtectedRoute>
                        <HomePage/>
                    </ProtectedRoute>
                   }
                   ></Route>
                   <Route path="/register" element={
                          <RegisterPage />
                    } />
            <Route path='/loginpage'
                   element={
                        <LoginPage/>
                   }
                   ></Route>
            <Route path = '/Homepage'

                   element={
                        <ProtectedRoute>
                            <HomePage/>
                        </ProtectedRoute>
                        
            }/>

            {/* profile page route */}
            <Route path='/profile'
                   element={
                        <ProtectedRoute>
                              <Profile/>
                        </ProtectedRoute>
                   }
                   ></Route>
            <Route path='/MobileRecharge'
                   element={
                        <ProtectedRoute>
                              <Recharge_bills/>
                        </ProtectedRoute>
                   }
                   ></Route>

            <Route path='/DTHrecharge'
                   element={
                         <ProtectedRoute>
                               <DTHrecharge/>
                        </ProtectedRoute>
                   }
                   ></Route>
            <Route path='/Metrorecharge'
                   element={
                    <ProtectedRoute>
                        <MetroRecharge/>
                    </ProtectedRoute>
                   }
                   ></Route>
            <Route path='/BroadbandRecharge'
                   element={
                    <ProtectedRoute>
                        <BroadbandRecharge/>
                    </ProtectedRoute>
                   }
                   ></Route>
            <Route path='/Education'
                   element={
                     <ProtectedRoute>
                        <Education/>
                    </ProtectedRoute>
                   }
                   ></Route>
            <Route path='/LandlineRecharge'
                   element={
                     <ProtectedRoute>
                        <LandlineRecharge/>
                    </ProtectedRoute>
                   }
                   ></Route>
            <Route path='/ElectricityBill'
                   element={
                      <ProtectedRoute>
                        <ElectricityBill/>
                     </ProtectedRoute>
                   }
                   ></Route>
            <Route path='/PayLoan'
                   element={
                    <ProtectedRoute>
                        <PayLoan/>
                    </ProtectedRoute>
                   }
                   ></Route>
            <Route path='/GasBill'
                   element={
                    <ProtectedRoute>
                        <GasBill/>
                    </ProtectedRoute>
                   }
                   ></Route>
            <Route path='/WaterBill'
                   element={
                     <ProtectedRoute>
                        <WaterBill/>
                    </ProtectedRoute>
                   }
                   ></Route>
            <Route path='/HouseRent'
                   element={
                    <ProtectedRoute>
                        <HouseRent/>
                    </ProtectedRoute>
                   }
                   ></Route>
            <Route path='/Fastag'
                   element={
                    <ProtectedRoute>
                          <Fastag/>
                    </ProtectedRoute>
                   }
                   ></Route>
            <Route path='/HouseRent'
                   element={
                    <ProtectedRoute>
                        <HouseRent/>
                    </ProtectedRoute>
                   }
                   ></Route>
            <Route path='/BusPass'
                   element={
                    <ProtectedRoute>
                        <BusPass/>
                    </ProtectedRoute>
                   }
                   ></Route>
            <Route path='/Insurance'
                   element={
                    <ProtectedRoute>
                        <Insurance/>
                    </ProtectedRoute>
                   }
                   ></Route>
            <Route path='/services'
                   element={
                    <ProtectedRoute>
                        <Viewall/>
                    </ProtectedRoute>
                   }
                   ></Route>
                   
        {/*Routes for travel ticket pages*/}
            
                        <Route path="/busticket" element={
                            <ProtectedRoute>
                                    <BusBooking/>
                            </ProtectedRoute>

                        }>
                    
                        </Route>
                        <Route path="/trainticket" element={
                            <ProtectedRoute>
                                    <TrainTicket/>
                            </ProtectedRoute>

                        }>
                    
                        </Route>
                        <Route path="/flightticket" element={
                            <ProtectedRoute>
                                    <FlightBooking/>
                            </ProtectedRoute>

                        }>

                        </Route>
        {/* Routes for Payments and services */}
        <Route path='/sendmoney' element={
            <ProtectedRoute>
              <SendMoney/>
            </ProtectedRoute>
        }>
        </Route>
        <Route path='/transactionhistory' element={
                    <ProtectedRoute>
                    <TransactionHistory/>
                    </ProtectedRoute>
        }>
        </Route>
        <Route path='/confirmpayment' element={
                    <ProtectedRoute>
                         <ConfirmPayment/>
                    </ProtectedRoute>
        }>
        </Route>
        <Route path='/transactionsuccess' element={
                    <ProtectedRoute>
                          <TransactionSuccess/>
                    </ProtectedRoute>
        }>
        </Route>
        <Route path='/setupipin' element={
                    <ProtectedRoute>
                          <SetUpiPin/>
                    </ProtectedRoute>
        }>
        </Route>
        <Route path='/enterupipin' element={
                    <ProtectedRoute>
                          <EnterPin/>
                    </ProtectedRoute>
        }>
        </Route>
        <Route path='/wallettopup' element={
                    <ProtectedRoute>
                          <WalletTopUp/>
                    </ProtectedRoute>
        }>
        </Route>
        <Route path='/forgotpassword' element={
                    
                          <ForgotPassword/>
                  
        }>
        </Route>
             
        </Routes>
    );
}

export default PagesRoutes;