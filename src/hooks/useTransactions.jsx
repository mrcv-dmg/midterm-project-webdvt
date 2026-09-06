import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const TransactionsContext = createContext(null);

const STORAGE_KEY = "budget-transactions";

function readStoredTransactions() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) return [];

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) return [];

    return parsed.map((transaction) => ({
      ...transaction,
      amount: Number(transaction.amount),
    }));
  } catch (error) {
    console.error("Could not load transactions:", error);
    return [];
  }
}

function useTransactionStorage() {
  const [transactions, setTransactions] = useState(
    readStoredTransactions
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(transactions)
      );
    } catch (error) {
      console.error(
        "Could not save transactions:",
        error
      );
    }
  }, [transactions]);

  const addTransaction = useCallback((values) => {
  const newTransaction = {
    ...values,
    id: crypto.randomUUID(),
    amount: Number(values.amount),
    createdAt: Date.now(),
  };

  setTransactions((previous) => [
    ...previous,
    newTransaction,
  ]);
}, []);

  const updateTransaction = useCallback(
    (id, values) => {
      setTransactions((previous) =>
        previous.map((transaction) =>
          String(transaction.id) === String(id)
            ? {
                ...transaction,
                ...values,
                id: transaction.id,
                amount: Number(values.amount),
              }
            : transaction
        )
      );
    },
    []
  );

  const deleteTransaction = useCallback((id) => {
    setTransactions((previous) =>
      previous.filter(
        (transaction) =>
          String(transaction.id) !== String(id)
      )
    );
  }, []);

  const resetTransactions = useCallback(() => {
    setTransactions([]);
  }, []);

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    resetTransactions,
  };
}

export function TransactionsProvider({ children }) {
  const {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    resetTransactions,
  } = useTransactionStorage();

  const getTransaction = useCallback(
    (id) => {
      return transactions.find(
        (transaction) =>
          String(transaction.id) === String(id)
      );
    },
    [transactions]
  );

  const value = useMemo(
    () => ({
      transactions,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      resetTransactions,
      getTransaction,
    }),
    [
      transactions,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      resetTransactions,
      getTransaction,
    ]
  );

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  if (context === null) {
    throw new Error(
      "useTransactions must be used inside TransactionsProvider"
    );
  }

  return context;
}