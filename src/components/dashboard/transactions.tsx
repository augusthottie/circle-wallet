import { useWallet } from "@/hooks/useWallet";
import { Transaction } from "@circle-fin/user-controlled-wallets/dist/types/clients/user-controlled-wallets";
import { IMAGE_KEY_MAP } from "@/constants/circle";
import { hashNormalizer } from "@/utils/eth";

export function TransactionsComponent() {
  const { transactions } = useWallet();

  if (transactions.length === 0)
    return (
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <div className="flex flex-col mt-4 max-w-3xl">
          <p>No transactions found.</p>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold">Transactions</h1>
      <div className="flex flex-col mt-4 max-w-3xl">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left">Transaction</th>
              <th>From</th>
              <th>To</th>
              <th>Time</th>
              <th>Type</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
              return (
                <TransactionComp
                  key={index}
                  transaction={transaction as Transaction}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const TransactionComp = ({ transaction }: { transaction: Transaction }) => {
  return (
    <tr className="border-b border-gray-200 w-full">
      <td>
        <a
          href={`https://sepolia.etherscan.io/tx/${transaction.txHash}`}
          target="_blank"
          className="flex items-center justify-start text-blue-500"
        >
          <span>{hashNormalizer(transaction.txHash)}</span>
        </a>
      </td>
      <td>
        <div className="flex items-center justify-center">
          <span>
            {transaction.transactionType === "OUTBOUND"
              ? hashNormalizer(transaction.destinationAddress)
              : hashNormalizer(transaction.sourceAddress)}
          </span>
        </div>
      </td>
      <td>
        <div className="flex items-center justify-center">
          <span>
            {transaction.transactionType === "OUTBOUND"
              ? hashNormalizer(transaction.sourceAddress)
              : hashNormalizer(transaction.destinationAddress)}
          </span>
        </div>
      </td>
      <td>
        <div className="flex items-center justify-center">
          <span className="flex flex-row gap-2">
            <span className="date">
              {new Date(transaction.createDate).toLocaleDateString(undefined, {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
            <span className="time">
              {new Date(transaction.createDate).toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </span>
        </div>
      </td>
      <td>
        <div className="flex items-center justify-center">
          <span>{transaction.transactionType}</span>
        </div>
      </td>
      <td>
        <div className="flex flex-row gap-2 items-center justify-end">
          <img // @ts-expect-error
            src={IMAGE_KEY_MAP[transaction.tokenId]}
            alt="image"
            className="h-6 w-6"
          />
          <span>
            {transaction.amounts && transaction.amounts[0]
              ? transaction.amounts[0]
              : "N/A"}
          </span>
        </div>
      </td>
    </tr>
  );
};
