import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { GoogleLogin } from "@react-oauth/google";
import invariant from "ts-invariant";
import { toast } from "react-toastify";
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";
import { createUserPinWithWallets, refreshSession } from "@/api/circle";
import { CIRCLE_APP_ID } from "@/constants/circle";
import { sha256 } from "@noble/hashes/sha256";
import { bytesToHex } from "@noble/hashes/utils";
import { v4 } from "uuid";
import { GoogleAuthJWTResponse } from "@/types/auth";

let CircleClient: W3SSdk;

export default function Home() {
  const [userId, setUserId] = useLocalStorage("userId", "");
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      router.push("/dashboard");
    }
  }, [userId, router]);

  useEffect(() => {
    CircleClient = new W3SSdk();
  }, []);

  async function executeChallenge(credential: string) {
    let { encryptionKey, userToken, challengeId } =
      await createUserPinWithWallets({
        userId: credential,
      }).then((data) => data.data);

    CircleClient.setAppSettings({
      appId: CIRCLE_APP_ID,
    });

    CircleClient.setAuthentication({
      encryptionKey,
      userToken,
    });

    await new Promise((resolve, reject) => {
      CircleClient.execute(challengeId, async (error) => {
        if (error) {
          toast.error(error?.message);
          reject(error);
        }

        resolve(null);
      });
    });

    toast.success("Wallet created successfully");
    setUserId(credential);
    router.push("/dashboard/create-wallet");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold text-center">
        It&apos;s just a{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-900 to-blue-700">
          Wallet
        </span>
      </h1>
      <p className="mt-3 text-2xl text-balance text-center">
        A crypto wallet{" "}
        <span
          className="
        bg-clip-text text-transparent bg-gradient-to-r from-green-900 to-blue-700
        "
        >
          without the hassle of Web3.
        </span>
      </p>
      <div className="flex flex-row gap-3 mt-3">
        <GoogleLogin
          onSuccess={async (user) => {
            invariant(user.credential, "User credential is missing");
            let decoded = jwtDecode<GoogleAuthJWTResponse>(user.credential);

            let uuid = v4({
              random: sha256(decoded.email + decoded.name),
            });

            // lets try to refresh session, if we can user has already signed in
            try {
              await refreshSession({
                userId: uuid,
              });

              setUserId(uuid);
              toast.success("User signed in successfully");
              router.push("/dashboard");
            } catch (error) {
              // if we get an error, user has not signed in
              executeChallenge(uuid);
            }
          }}
          onError={() => {
            toast.error("Failed to login");
          }}
          theme="filled_black"
        />
      </div>
    </div>
  );
}
