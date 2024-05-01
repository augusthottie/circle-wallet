import Link from "next/link";

export const Header = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center">
      <div className="bg-clip-text text-3xl lg:text-6xl pb-2 font-bold text-transparent bg-gradient-to-r from-green-900 to-blue-700">
        {title}
      </div>
      <div className="flex flex-row items-center flex-wrap lg:justify-start justify-center gap-4">
        {/* Navbar */}
        <Link href={"/dashboard"} className="text-lg font-semibold">
          Dashboard
        </Link>
        <Link href={"/dashboard/wallets"} className="text-lg font-semibold">
          Wallets
        </Link>
        <Link
          href={"/dashboard/transactions"}
          className="text-lg font-semibold"
        >
          Transactions
        </Link>
        <Link href={"/dashboard/contacts"} className="text-lg font-semibold">
          Contacts
        </Link>
        <Link href={"/dashboard/settings"} className="text-lg font-semibold">
          Settings
        </Link>
      </div>
    </div>
  );
};
