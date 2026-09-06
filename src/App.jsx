import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Dashboard from "@/pages/dashboard";
import AddTransaction from "@/pages/addTransaction";
import TransactionDetail from "@/pages/transactionDetail";
import Summary from "@/pages/summary";
import About from "@/pages/about";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Dashboard />}
      />
      <Route
        path="/addTransaction"
        element={<AddTransaction />}
      />
      <Route
        path="/transaction/:id"
        element={<TransactionDetail />}
      />
      <Route
        path="/summary"
        element={<Summary />}
      />
      <Route
        path="/about"
        element={<About />}
      />
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}