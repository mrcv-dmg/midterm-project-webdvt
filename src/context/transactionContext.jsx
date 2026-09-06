import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "budget-tracker:transactions";

const seedTransactions = [
  { id: "1", description: "Freelance payment", category: "Income", date: "2026-08-18", amount: 8500, type: "income" },
  { id: "2", description: "Jollibee - lunch", category: "Food", date: "2026-08-18", amount: 215, type: "expense" },
  { id: "3", description: "Grab ride", category: "Transport", date: "2026-08-17", amount: 180, type: "expense" },
  { id: "4", description: "Electric bill", category: "Utilities", date: "2026-08-15", amount: 1450, type: "expense" },
  { id: "5", description: "Allowance", category: "Income", date: "2026-08-10", amount: 5000, type: "income" },
];

function loadInitialTransactions() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to read transactions from localStorage:", error);
  }
  return seedTransactions;
}

const TransactionContext = createContext(null);

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState(loadInitialTransactions);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (error) {
      console.error("Failed to save transactions to localStorage:", error);
    }
  }, [transactions]);

  function addTransaction(transaction) {
    const newTransaction = { id: crypto.randomUUID(), ...transaction };
    setTransactions((prev) => [newTransaction, ...prev]);
    return newTransaction;
  }

  function deleteTransaction(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  function getTransaction(id) {
    return transactions.find((t) => t.id === id);
  }

  const value = { transactions, addTransaction, deleteTransaction, getTransaction };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactions must be used within a TransactionProvider");
  }
  return context;
}