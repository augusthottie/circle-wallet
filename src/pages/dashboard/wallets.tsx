import { Layout } from "@/components/dashboard/layout";
import { WalletsComponent } from "@/components/dashboard/wallet";
import { Dropdown } from "@/components/dropdown";
import { useWallet } from "@/hooks/useWallet";
import Link from "next/link";
import { toast } from "react-toastify";
import invariant from "ts-invariant";

export default function WalletsPage() {
  return (
    <Layout title="Wallets">
      <Wallets />
    </Layout>
  );
}

function Wallets() {
  const { wallet } = useWallet();

  return (
    <>
      {/* Create Wallet */}
      <Link href={"/dashboard/create-wallet"}>
        <button className="mt-3 bg-gray-800 text-white px-3 py-2 rounded-lg font-bold transition duration-300 hover:bg-gray-700">
          Create Wallet
        </button>
      </Link>
      {/* Show Active wallet, and then wallets to change over */}
      {wallet && (
        <>
          <h1 className="text-2xl font-semibold">Active Wallet</h1>
          {/* Info about wallet, name, description, address */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">Name: {wallet.name}</h2>
            <div className="text-sm text-gray-500">
              Description: {wallet.refId}
            </div>
            <div
              className="text-sm text-gray-500 hover:underline cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(wallet.address);
                toast.success("Copied to clipboard");
              }}
            >
              Address: {wallet.address}
            </div>
          </div>
        </>
      )}
      <WalletsComponent />
    </>
  );
}
