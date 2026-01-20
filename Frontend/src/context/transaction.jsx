import { useState,createContext,useContext } from "react";

const Transaction_data = createContext();



 export default function TransactionProvider({ children }) {
  const [transaction, setTransaction] = useState(null);

  const startTransaction = (data) => {
    
          setTransaction(data);
  };

  const clearTransaction = () => {

          setTransaction(null);
  };                       

  return (
    <Transaction_data.Provider
      value={{ transaction, startTransaction, clearTransaction }}
    >
      {children}
    </Transaction_data.Provider>
  );
}


export function useTransaction() {
  return useContext(Transaction_data);
}