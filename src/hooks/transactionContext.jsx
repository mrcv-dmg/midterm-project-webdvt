import {createContext, useEffect, useState} from "react";

const STORAGE_KEY = "budget-tracker:transactions";

function loadInitialTransactions() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to read transactions from localStorage:", error);
  }
  return [];
}

export const TransactionContext = createContext(null);

export function TransactionProvider({children}) {
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
    setTransactions([]);
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