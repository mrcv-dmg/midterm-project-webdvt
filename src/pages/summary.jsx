import {useMemo} from "react";

import Navbar from "@/components/ui/navbar";
import SummaryCards from "@/components/ui/summarycards";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {Button} from "@/components/ui/button";

import {useTransactions} from "@/hooks/useTransactions";
import {useTheme} from "@/hooks/useTheme";

function formatPHP(amount) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
}

export default function Summary() {
  const { transactions } = useTransactions();
  const { theme, setTheme } = useTheme();

  const categoryBreakdown = useMemo(() => {
    const totals = transactions
      .filter(
        (transaction) =>
          transaction.type === "expense"
      )
      .reduce((result, transaction) => {
        result[transaction.category] =
          (result[transaction.category] || 0) +
          transaction.amount;

        return result;
      }, {});

    return Object.entries(totals).sort(
      (a, b) => b[1] - a[1]
    );
  }, [transactions]);

  return (
    <main className="container mx-auto max-w-6xl space-y-6 p-6">
      <Navbar />

      <h1 className="font-heading text-2xl font-semibold">
        Summary
      </h1>

      <SummaryCards />

      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            Choose the theme for the entire application.
          </p>

          <div className="flex gap-2">
            <Button
              type="button"
              variant={
                theme === "light"
                  ? "default"
                  : "outline"
              }
              onClick={() => setTheme("light")}
            >
              Light
            </Button>

            <Button
              type="button"
              variant={
                theme === "dark"
                  ? "default"
                  : "outline"
              }
              onClick={() => setTheme("dark")}
            >
              Dark
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>
            Spending by category
          </CardTitle>
        </CardHeader>

        <CardContent>
          {categoryBreakdown.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No expenses logged yet.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {categoryBreakdown.map(
                ([category, total]) => (
                  <li
                    key={category}
                    className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                  >
                    <span className="font-medium">
                      {category}
                    </span>

                    <span className="font-medium text-destructive">
                      {formatPHP(total)}
                    </span>
                  </li>
                )
              )}
            </ul>
          )}
        </CardContent>
      </Card>
    </main>
  );
}