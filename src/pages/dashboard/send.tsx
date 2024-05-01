import { Layout } from "@/components/dashboard/layout";
import { useWallet } from "@/hooks/useWallet";
import { useEffect, useState } from "react";
import { Dropdown } from "@/components/dropdown";
import invariant from "ts-invariant";
import { toast } from "react-toastify";
import { CIRCLE_APP_ID } from "@/constants/circle";
import { useRouter } from "next/router";
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";
import { useContact } from "@/hooks/useContact";
import { Drop, User } from "@phosphor-icons/react";
import { isValidEthereumAddress } from "@/utils/eth";
import Link from "next/link";

export default function SendPage() {
  return (
    <Layout title="Send Transaction">
      <Send />
    </Layout>
  );
}

let CircleClient: W3SSdk;

function Send() {
  const { balances, sendTransaction, encryptionKey, userToken } = useWallet();
  const { contacts, addContact } = useContact();
  const [to, setTo] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [tokenId, setTokenId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    CircleClient = new W3SSdk();
  }, []);

  if (!balances || !balances.tokenBalances) return null;

  async function handleSubmit() {
    // find balance amount of tokenid and check if amount is less than balance
    if (!isValidEthereumAddress(to)) {
      toast.error("Invalid address");
      return;
    }

    // @ts-expect-error
    let balance = balances.tokenBalances.find((b) => b.token.id === tokenId);
    invariant(balance, "Token ID not found");

    if (Number(amount) > Number(balance.amount)) {
      toast.error("Amount exceeds balance");
      return;
    }

    sendTransaction(amount, to, tokenId)
      .then((txId) => {
        return new Promise((resolve, reject) => {
          CircleClient.setAppSettings({
            appId: CIRCLE_APP_ID,
          });

          CircleClient.setAuthentication({
            encryptionKey,
            userToken,
          });

          CircleClient.execute(txId, (error) => {
            if (error) {
              reject(error);
              return;
            }

            resolve(txId);
          });
        });
      })
      .then(() => {
        toast.success("Transaction sent successfully");
        router.push("/dashboard");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Send Transaction</h2>
          <div className="text-sm text-gray-500">
            Send tokens to another address
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="to">To</label>
          <div className="flex flex-row gap-2 items-center">
            <input
              id="to"
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="px-3 py-2 rounded-lg"
            />
            <div className="hidden lg:block">
              {contacts.length > 0 && (
                <Dropdown
                  activeItem={"Contacts"}
                  title="Contacts"
                  items={contacts.map((c) => c.name)}
                  onItemChange={(item) => {
                    let contact = contacts.find((c) => c.name === item);
                    invariant(contact, "Contact not found");

                    setTo(contact.address);
                  }}
                />
              )}
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center">
            {isValidEthereumAddress(to) &&
            !contacts.find((c) => c.address === to) ? (
              <Link href={"/dashboard/add-contact?to=" + to}>
                <button className="text-sm text-gray-500 hover:underline cursor-pointer">
                  Add to contacts
                </button>
              </Link>
            ) : null}
            <div className="lg:hidden block">
              {contacts.length > 0 && (
                <Dropdown
                  activeItem={"Contacts"}
                  title="Contacts"
                  items={contacts.map((c) => c.name)}
                  onItemChange={(item) => {
                    let contact = contacts.find((c) => c.name === item);
                    invariant(contact, "Contact not found");

                    setTo(contact.address);
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="amount">Amount</label>
          <div>
            <input
              id="amount"
              type="text"
              // only accept numbers
              pattern="[0-9]*"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="px-3 py-2 rounded-lg"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="tokenId">Token ID</label>
          <div className="max-w-52 w-full">
            <Dropdown
              // @ts-expect-error
              activeItem={
                balances.tokenBalances.find((b) => b.token.id === tokenId)
                  ?.token.name
              }
              // @ts-expect-error
              items={balances.tokenBalances.map((b) => b.token.name)}
              onItemChange={(item) => {
                // @ts-expect-error
                let id = balances.tokenBalances.find(
                  (b) => b.token.name === item
                )?.token.id;

                invariant(id, "Token ID not found");

                setTokenId(id);
              }}
            />
          </div>
        </div>
        <div>
          <button
            onClick={handleSubmit}
            disabled={!to || !amount || !tokenId}
            className="bg-gray-800 text-white px-3 py-2 rounded-lg font-bold transition duration-300 hover:bg-gray-700 disabled:bg-opacity-50 disabled:bg-gray-800 disabled:hover:bg-opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
