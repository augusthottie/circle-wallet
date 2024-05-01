import { Layout } from "@/components/dashboard/layout";
import { useWallet } from "@/hooks/useWallet";
import { createWallet } from "@/api/circle";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CIRCLE_APP_ID } from "@/constants/circle";
import { useRouter } from "next/router";

import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";

let CircleClient: W3SSdk;

export default function CreateWalletPage() {
  return (
    <Layout title="Create Wallet">
      <CreateWallet />
    </Layout>
  );
}

function CreateWallet() {
  const router = useRouter();
  const { userToken, encryptionKey, changeWallet, updateWallets, wallets } =
    useWallet();

  const [walletName, setWalletName] = useState<string>("");
  const [walletDescription, setWalletDescription] = useState<string>("");

  useEffect(() => {
    CircleClient = new W3SSdk();
  }, []);

  async function executeChallenge({ challengeId }: { challengeId: string }) {
    const unchangedWallets = [...wallets];
    CircleClient.setAppSettings({
      appId: CIRCLE_APP_ID,
    });

    CircleClient.setAuthentication({
      encryptionKey,
      userToken,
    });

    CircleClient.execute(challengeId, async (error) => {
      if (error) {
        toast.error(error?.message);
        return;
      }

      await updateWallets();
      // find the new wallet
      const newWallet = wallets.find((w) => !unchangedWallets.includes(w));
      if (newWallet) {
        changeWallet(newWallet.id);
      }

      // wait 2 second
      setTimeout(() => {
        toast.success("Wallet created successfully");
        router.push("/dashboard/wallets");
      }, 2000);
    });
  }

  async function handleSubmit(type: "SCA" | "EOA") {
    await createWallet({
      userToken,
      name: walletName,
      description: walletDescription,
      type,
    })
      .then((data) => {
        return new Promise((resolve) => {
          executeChallenge({ challengeId: data.data.challengeId });
          resolve(null);
        });
      })
      .then(async () => {
        await updateWallets();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="flex flex-col gap-4 w-full"
    >
      <label className="flex flex-col gap-1">
        Wallet Name
        <div>
          <input
            type="text"
            value={walletName}
            onChange={(e) => setWalletName(e.target.value)}
            className="px-3 py-2 rounded-lg"
          />
        </div>
      </label>
      <label className="flex flex-col gap-1">
        Wallet Description
        <div>
          <input
            type="text"
            value={walletDescription}
            className="px-3 py-2 rounded-lg"
            onChange={(e) => setWalletDescription(e.target.value)}
          />
        </div>
      </label>
      <div className="flex flex-col gap-4">
        <div>
          <button
            onClick={() => handleSubmit("SCA")}
            className="bg-gray-800 text-white px-3 py-2 rounded-lg font-bold transition duration-300 hover:bg-gray-700"
          >
            Create SCA Wallet
          </button>
        </div>
        <div>
          <button
            onClick={() => handleSubmit("EOA")}
            className="bg-gray-800 text-white px-3 py-2 rounded-lg font-bold transition duration-300 hover:bg-gray-700"
          >
            Create EOA Wallet
          </button>
        </div>
      </div>
    </form>
  );
}
