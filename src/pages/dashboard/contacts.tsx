import { Layout } from "@/components/dashboard/layout";
import { WalletsComponent } from "@/components/dashboard/wallet";
import { Dropdown } from "@/components/dropdown";
import { useContact } from "@/hooks/useContact";
import { useWallet } from "@/hooks/useWallet";
import { hashNormalizer } from "@/utils/eth";
import Link from "next/link";
import { toast } from "react-toastify";
import invariant from "ts-invariant";

export default function ContactsPage() {
  return (
    <Layout title="Contacts">
      <Contacts />
    </Layout>
  );
}

function Contacts() {
  const { contacts, removeContact } = useContact();

  return (
    <>
      <Link href={"/dashboard/add-contact"}>
        <button className="mt-3 bg-gray-800 text-white px-3 py-2 rounded-lg font-bold transition duration-300 hover:bg-gray-700">
          Add Contact
        </button>
      </Link>
      {contacts && (
        <>
          <h1 className="text-2xl font-semibold">Contacts</h1>
          <div className="flex flex-col gap-2">
            {contacts.map((contact) => (
              <div key={contact.address} className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">{contact.name}</h2>
                <div className="text-sm text-gray-500">
                  {hashNormalizer(contact.address)}
                </div>
                <button
                  onClick={() => removeContact(contact.address)}
                  className="bg-red-500 text-white px-2 py-1 rounded-lg font-bold transition duration-300 hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
