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
import { ThemeProvider } from "@/context/themeContext";
import About from "./pages/about";

function App(){
  return(
    <ThemeProvider>
      <TransactionProvider>
        <BrowserRouter>
          <Routes>
            <Route path = "/" element={<Dashboard />} />
            <Route path = "/addTransaction" element={<AddTransaction />} />
            <Route path="/transactionDetail/:id" element={<TransactionDetail />} />
            <Route path = "/summary" element={<Summary />} />
            <Route path = "/about" element={<About />} />

            </Routes>
        </BrowserRouter>
      </TransactionProvider>
    </ThemeProvider>
  );
}

export default App; 