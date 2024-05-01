import { Layout } from "@/components/dashboard/layout";
import { WalletsComponent } from "@/components/dashboard/wallet";
import { Dropdown } from "@/components/dropdown";
import { useContact } from "@/hooks/useContact";
import { useWallet } from "@/hooks/useWallet";
import { isValidEthereumAddress } from "@/utils/eth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import invariant from "ts-invariant";

export default function AddContactsPage() {
  return (
    <Layout title="Add Contact">
      <AddContacts />
    </Layout>
  );
}

function AddContacts() {
  const { contacts, addContact } = useContact();
  const [name, setName] = useState("");
  const router = useRouter();
  const {
    to,
  }: {
    to?: string;
  } = router.query;
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    if (to) {
      setAddress(to);
    }
  }, [to]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Add Contact</h1>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <button
            className="bg-gray-800 text-white px-3 py-2 rounded-lg font-bold transition duration-300 hover:bg-gray-700"
            onClick={() => {
              if (contacts.find((contact) => contact.address === address)) {
                toast.error("Contact already exists");
                return;
              }

              if (!isValidEthereumAddress(address)) {
                toast.error("Invalid address");
                return;
              }

              addContact({ name, address });
              toast.success("Contact added");
              router.push("/dashboard/contacts");
            }}
          >
            Add Contact
          </button>
        </div>
      </div>
    </>
  );
}
