import { useNavigate } from "react-router-dom";
import Navbar from "@/components/ui/navbar";
import TransactionForm from "@/components/ui/transactionForm.jsx";
import { useTransactions } from "@/hooks/useTransactions";

const initialForm = {
  description: "",
  amount: "",
  category: "",
  type: "expense",
  date: "",
};

export default function AddTransaction() {
  const navigate = useNavigate();

  const { addTransaction } = useTransactions();

  function handleSubmit(values) {
    addTransaction(values);
    navigate("/");
  }

  return (
    <main className="container mx-auto max-w-6xl space-y-6 p-6">
      <Navbar />

      <div className="mx-auto mt-10 max-w-xl rounded-[min(var(--radius-4xl),24px)] border border-border bg-card p-6 shadow-sm sm:p-8">
        <TransactionForm
          initialValues={initialForm}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/")}
          legend="New transaction"
          submitLabel="Save transaction"
        />
      </div>
    </main>
  );
}