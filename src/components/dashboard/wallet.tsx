import { useWallet } from "@/hooks/useWallet";
import { useMemo } from "react";

export function WalletsComponent() {
  const { wallets, wallet, changeWallet } = useWallet();

  const mapableWallets = useMemo(() => {
    // filter wallet from wallets
    return wallets.filter((w) => w.address !== wallet?.address);
  }, [wallets, wallet]);

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold">Wallets</h1>
      <div className="max-w-3xl">
        {mapableWallets.map((wallet) => (
          <div
            className="flex items-center justify-between p-2 border-b border-gray-200"
            key={wallet.address}
          >
            <h2 className="text-lg font-semibold">{wallet.name}</h2>
            <div className="text-sm text-gray-500">{wallet.refId}</div>
            <div className="text-sm text-gray-500">{wallet.address}</div>
            <button
              onClick={() => changeWallet(wallet.id)}
              className="text-lg font-semibold"
            >
              Change Wallet
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
