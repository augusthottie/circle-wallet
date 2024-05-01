import { Layout } from "@/components/dashboard/layout";
import { useWallet } from "@/hooks/useWallet";
import { TransactionsComponent } from "@/components/dashboard/transactions";

export default function TransactionsPage() {
  return (
    <Layout title="Transactions">
      <Transactions />
    </Layout>
  );
}

function Transactions() {
  return (
    <>
      <TransactionsComponent />
    </>
  );
}
