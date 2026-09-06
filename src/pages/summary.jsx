import Navbar from "@/components/ui/navbar";
import SummaryCards from "@/components/ui/summarycards";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {useTransactions} from "@/context/transactionContext";

function formatPHP(amount) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
}

export default function Summary() {
  const { transactions } = useTransactions();

  const expensesByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((totals, t) => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
      return totals;
    }, {});

  const categoryBreakdown = Object.entries(expensesByCategory).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <main className="container mx-auto max-w-6xl space-y-6 p-6">
      <Navbar />
      <h1 className="font-heading text-2xl font-semibold">Summary</h1>

      <SummaryCards />

      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Spending by category</CardTitle>
        </CardHeader>
        <CardContent>
          {categoryBreakdown.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No expenses logged yet.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {categoryBreakdown.map(([category, total]) => (
                <li
                  key={category}
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                >
                  <span className="font-medium">{category}</span>
                  <span className="font-medium text-destructive">
                    {formatPHP(total)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </main>
  );
}