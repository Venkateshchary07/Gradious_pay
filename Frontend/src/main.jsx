import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import TransactionProvider from './context/transaction.jsx';
import ProfileContextProvider from './context/ProfileContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
          <ProfileContextProvider>
    <TransactionProvider>
                          <App />
    </TransactionProvider>
          </ProfileContextProvider>
  
  </StrictMode>
);
