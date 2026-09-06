import { memo, useMemo } from "react";

import {
  Card,
  CardContent,
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

function SummaryCards() {
  const { transactions } = useTransactions();

  const { income, expenses, balance } = useMemo(() => {
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        totalIncome += transaction.amount;
      }

      if (transaction.type === "expense") {
        totalExpenses += transaction.amount;
      }
    });

    return {
      income: totalIncome,
      expenses: totalExpenses,
      balance: totalIncome - totalExpenses,
    };
  }, [transactions]);

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="font-sans text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Balance
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="font-heading text-2xl font-semibold">
            {formatPHP(balance)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-sans text-xs font-medium uppercase tracking-wide text-muted-foreground">
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
          <CardTitle className="font-sans text-xs font-medium uppercase tracking-wide text-muted-foreground">
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

export default memo(SummaryCards);