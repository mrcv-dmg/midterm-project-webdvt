import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

import { ThemeProvider } from "@/hooks/useTheme";
import { TransactionsProvider } from "@/hooks/useTransactions";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <TransactionsProvider>
          <App />
        </TransactionsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);