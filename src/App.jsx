import{
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Dashboard from "./pages/dashboard";
import AddTransaction from "./pages/addTransaction";
import TransactionDetail from "./pages/transactionDetail";
import Summary from "./pages/summary";
import {TransactionProvider} from "@/context/transactionContext";

function App(){
  return(
    <TransactionProvider>
    <BrowserRouter>
    <Routes>
      <Route path = "/" element={<Dashboard />} />
      <Route path = "/addTransaction" element={<AddTransaction />} />
      <Route path = "/transactionDetail" element={<TransactionDetail />} />
      <Route path = "/summary" element={<Summary />} />
      
    </Routes>
  </BrowserRouter>
  </TransactionProvider>
  );
}

export default App; 