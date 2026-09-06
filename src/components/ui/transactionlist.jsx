import {Link} from "react-router-dom";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {useTransactions} from "@/hooks/useTransactions";

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
  });
}

export default function TransactionList() {
  const { transactions } = useTransactions();

  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {sorted.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No transactions yet. Add your first one to get started.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {sorted.map((t) => (
              <li key={t.id}>
                <Link
                  to={`/transactionDetail/${t.id}`}
                  className="-mx-2 flex items-center justify-between rounded-2xl px-2 py-3 transition-colors hover:bg-muted"
                >
                  <div>
                    <p className="font-medium">{t.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.category} · {formatShortDate(t.date)}
                    </p>
                  </div>
                  <p
                    className={
                      t.type === "expense"
                        ? "font-medium text-destructive"
                        : "font-medium text-foreground"
                    }
                  >
                    {t.type === "expense" ? "-" : "+"}
                    {formatPHP(t.amount)}
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