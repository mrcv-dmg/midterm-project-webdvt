import {Link, useNavigate, useParams} from "react-router-dom";
import Navbar from "@/components/ui/navbar";
import {Button, buttonVariants} from "@/components/ui/button";
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
  const {id} = useParams();
  const navigate = useNavigate();
  const {getTransaction, deleteTransaction} = useTransactions();
  const transaction = getTransaction(id);

  function handleDelete() {
    deleteTransaction(id);
    navigate("/");
  }

  return (
    <main className="container mx-auto max-w-6xl space-y-6 p-6">
      <Navbar />

      {!transaction ? (
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
      ) : (
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
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              Delete transaction
            </Button>
          </CardFooter>
        </Card>
      )}
    </main>
  );
}