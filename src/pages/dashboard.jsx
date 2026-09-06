import Navbar from "@/components/ui/navbar";
import SummaryCards from "@/components/ui/summarycards";
import Header from "@/components/ui/header";
import TransactionList from "@/components/ui/transactionlist";

export default function Dashboard() {
  return (
    <main className="container mx-auto max-w-6xl space-y-6 p-6">
      <Navbar />
      <Header />
      <SummaryCards />
      <TransactionList />
    </main>
  );
}