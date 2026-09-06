import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {useTransactions} from "@/hooks/useTransactions";

function formatPHP(amount) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
}

export default function SummaryCards() {
  const { transactions } = useTransactions();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-xs font-sans font-medium uppercase tracking-wide text-muted-foreground">
            Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-heading text-2xl font-semibold">{formatPHP(balance)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xs font-sans font-medium uppercase tracking-wide text-muted-foreground">
            Income
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-heading text-2xl font-semibold">
            +{formatPHP(income)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xs font-sans font-medium uppercase tracking-wide text-muted-foreground">
            Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-heading text-2xl font-semibold text-destructive">
            -{formatPHP(expenses)}
          </p>
        </CardContent>
      </Card>
    </section>
  );
}