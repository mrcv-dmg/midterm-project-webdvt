import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

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

function formatShortDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const selectClassName =
  "h-9 rounded-xl border border-input bg-background px-3 text-sm";

export default function TransactionList() {
  const { transactions } = useTransactions();

  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] =
    useState("all");

  const categories = useMemo(() => {
    return [
      ...new Set(
        transactions
          .map((transaction) => transaction.category)
          .filter(Boolean)
      ),
    ].sort();
  }, [transactions]);

  /*
   * PERFORMANCE OPTIMIZATION:
   *
   * Filtering and sorting only run again when the
   * transactions or filters actually change.
   */

  const filteredTransactions = useMemo(() => {
  return transactions
    .filter((transaction) => {
      const matchesType =
        typeFilter === "all" ||
        transaction.type === typeFilter;

      const matchesCategory =
        categoryFilter === "all" ||
        transaction.category === categoryFilter;

      return matchesType && matchesCategory;
    })
    .sort((a, b) => {
      const dateDifference =
        new Date(b.date).getTime() -
        new Date(a.date).getTime();

      if (dateDifference !== 0) {
        return dateDifference;
      }

      return (b.createdAt ?? 0) - (a.createdAt ?? 0);
    });
}, [transactions, typeFilter, categoryFilter]);

  return (
    <Card>
      <CardHeader className="space-y-4">
        <CardTitle>Transactions</CardTitle>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="typeFilter"
              className="text-xs text-muted-foreground"
            >
              Type
            </label>

            <select
              id="typeFilter"
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(event.target.value)
              }
              className={selectClassName}
            >
              <option value="all">All types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="categoryFilter"
              className="text-xs text-muted-foreground"
            >
              Category
            </label>

            <select
              id="categoryFilter"
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(event.target.value)
              }
              className={selectClassName}
            >
              <option value="all">All categories</option>

              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {transactions.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No transactions yet. Add your first one to get
            started.
          </p>
        ) : filteredTransactions.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No transactions match the selected filters.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {filteredTransactions.map((transaction) => (
              <li key={transaction.id}>
                <Link
                  to={`/transaction/${transaction.id}`}
                  className="-mx-2 flex items-center justify-between rounded-2xl px-2 py-3 transition-colors hover:bg-muted"
                >
                  <div>
                    <p className="font-medium">
                      {transaction.description}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {transaction.category} ·{" "}
                      {formatShortDate(transaction.date)}
                    </p>
                  </div>

                  <p
                    className={
                      transaction.type === "expense"
                        ? "font-medium text-destructive"
                        : "font-medium text-foreground"
                    }
                  >
                    {transaction.type === "expense"
                      ? "-"
                      : "+"}

                    {formatPHP(transaction.amount)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}