import {createContext, useContext, useEffect, useState} from "react";

const STORAGE_KEY = "budget-tracker:transactions";

const seedTransactions = [];

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
  function resetTransactions() {
    setTransactions(seedTransactions);
  }

  const value = {
    transactions,
    addTransaction,
    deleteTransaction,
    getTransaction,
    resetTransactions,
  };

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