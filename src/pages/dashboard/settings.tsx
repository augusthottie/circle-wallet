import { BalanceComponent } from "@/components/dashboard/balance";
import { Layout } from "@/components/dashboard/layout";
import { CIRCLE_APP_ID } from "@/constants/circle";
import { useWallet } from "@/hooks/useWallet";
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useLocalStorage } from "usehooks-ts";

export default function Settings() {
  return (
    <Layout title="Settings">
      <SettingsComponent />
    </Layout>
  );
}

let CircleClient: W3SSdk;

function SettingsComponent() {
  const { signout, asyncRestorePin, asyncUpdatePin, userToken, encryptionKey } =
    useWallet();
  const [, setContacts] = useLocalStorage("contacts", []);

  useEffect(() => {
    CircleClient = new W3SSdk();
  }, []);

  async function onRestorePin() {
    let challengeId = await asyncRestorePin();
    CircleClient.setAppSettings({
      appId: CIRCLE_APP_ID,
    });

    CircleClient.setAuthentication({
      encryptionKey,
      userToken,
    });

    CircleClient.execute(challengeId, (error) => {
      if (error) {
        toast.error(error?.message);
        return;
      }

      toast.success("Pin restored successfully");
    });
  }

  async function onUpdatePin() {
    let challengeId = await asyncUpdatePin();
    CircleClient.setAppSettings({
      appId: CIRCLE_APP_ID,
    });

    CircleClient.setAuthentication({
      encryptionKey,
      userToken,
    });

    CircleClient.execute(challengeId, (error) => {
      if (error) {
        toast.error(error?.message);
        return;
      }

      toast.success("Pin updated successfully");
    });
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div>
          <button
            onClick={() => {
              setContacts([]);
              signout();
            }}
            className="bg-red-500 text-white px-3 py-2 rounded-lg font-bold transition duration-300 hover:bg-red-400"
          >
            Sign Out
          </button>
        </div>
        <div>
          <button
            onClick={onRestorePin}
            className="bg-blue-500 text-white px-3 py-2 rounded-lg font-bold transition duration-300 hover:bg-blue-400"
          >
            Restore Pin
          </button>
        </div>
        <div>
          <button
            onClick={onUpdatePin}
            className="bg-blue-500 text-white px-3 py-2 rounded-lg font-bold transition duration-300 hover:bg-blue-400"
          >
            Update Pin
          </button>
        </div>
      </div>
    </div>
  );
}
