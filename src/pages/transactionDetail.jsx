import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Navbar from "@/components/ui/navbar";
import TransactionForm from "@/components/ui/transactionForm.jsx";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTransactions } from "@/hooks/useTransactions";

function formatPHP(amount) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
}

function formatFullDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function TransactionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const transaction = getTransaction(id);
  const [isEditing, setIsEditing] = useState(false);

  function handleDelete() {
    deleteTransaction(id);
    navigate("/");
  }

  function handleUpdate(values) {
    updateTransaction(id, values);
    setIsEditing(false);
  }

  let content;

  if (!transaction) {
    content = (
      <Card className="mx-auto max-w-xl">
        <CardContent className="space-y-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            This transaction doesn't exist, or it may have already been deleted.
          </p>
          <Link to="/" className={buttonVariants({ variant: "outline", size: "sm" })}>
            Back to dashboard
          </Link>
        </CardContent>
      </Card>
    );
  } else if (isEditing) {
    content = (
      <Card className="mx-auto max-w-xl">
        <CardContent className="pt-6">
          <TransactionForm
            initialValues={{
              description: transaction.description,
              amount: String(transaction.amount),
              category: transaction.category,
              type: transaction.type,
              date: transaction.date,
            }}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
            legend="Edit transaction"
            submitLabel="Save changes"
          />
        </CardContent>
      </Card>
    );
  } else {
    content = (
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle className="font-heading text-xl">
            {transaction.description}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Amount</span>
            <span
              className={
                transaction.type === "expense"
                  ? "font-heading text-xl font-semibold text-destructive"
                  : "font-heading text-xl font-semibold"
              }
            >
              {transaction.type === "expense" ? "-" : "+"}
              {formatPHP(transaction.amount)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Category</span>
            <span className="text-sm font-medium">{transaction.category}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Date</span>
            <span className="text-sm font-medium">
              {formatFullDate(transaction.date)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Type</span>
            <span className="text-sm font-medium capitalize">
              {transaction.type}
            </span>
          </div>
        </CardContent>
        <CardFooter className="justify-between gap-3">
          <Link to="/" className={buttonVariants({ variant: "outline", size: "sm" })}>
            Back
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }

  return (
    <main className="container mx-auto max-w-6xl space-y-6 p-6">
      <Navbar />
      {content}
    </main>
  );
}