import { createContext, ReactNode, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import {
  GetBalancesResponse,
  Transaction,
  WalletResponse,
} from "@circle-fin/user-controlled-wallets/dist/types/clients/user-controlled-wallets";
import { useRouter } from "next/router";
import {
  createTransaction,
  getWallets,
  getWalletTokenBalance,
  listTransactions,
  refreshSession,
  restorePin,
  updateUserPin,
} from "@/api/circle";
import invariant from "ts-invariant";

export interface WalletContextType {
  userId: string;
  userToken: string;
  encryptionKey: string;
  wallets: WalletResponse[];
  wallet: WalletResponse | null;
  transactions: Transaction[];
  balances: GetBalancesResponse | null;
  changeWallet: (walletId: string) => void;
  updateWallets: () => Promise<void>;
  sendTransaction: (
    amount: string,
    destinationAddress: string,
    tokenId: string
  ) => Promise<string>;
  signout: () => void;
  asyncRestorePin: () => Promise<string>;
  asyncUpdatePin: () => Promise<string>;
  requestTokens: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({} as WalletContextType);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [userToken, setUserToken] = useLocalStorage("userToken", "");
  const [encryptionKey, setEncryptionKey] = useLocalStorage(
    "encryptionKey",
    ""
  );
  const [walletId, setWalletId] = useLocalStorage("walletId", "");
  const [wallets, setWallets] = useState<WalletResponse[]>([]);
  const [wallet, setWallet] = useState<WalletResponse | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balances, setBalances] = useState<GetBalancesResponse | null>(null);

  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!userId) {
      router.push("/");
      return;
    }

    async function refreshToken() {
      let session = await refreshSession({
        userId,
      });

      if (session) {
        setUserToken(session.data.userToken);
        setEncryptionKey(session.data.encryptionKey);
      }
    }

    refreshToken();

    interval = setInterval(refreshToken, 60 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, router.pathname]);

  useEffect(() => {
    if (!userId || !userToken) return;

    getWallets({ userToken }).then((data) => {
      setWallets(data.data.wallets);
      if (walletId) {
        const wallet = data.data.wallets.find((w) => w.id === walletId);
        if (wallet) {
          setWallet(wallet);
        }
      } else {
        if (data.data.wallets.length > 0) {
          setWallet(data.data.wallets[0]);
          setWalletId(data.data.wallets[0].id);
        }
      }

      if (
        data.data.wallets.length === 0 &&
        router.pathname !== "/dashboard/create-wallet"
      ) {
        router.push("/dashboard/create-wallet");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, router.pathname, userToken]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!wallet) return;

    listTransactions({ walletIds: [wallet.id], userToken, encryptionKey }).then(
      (data) => {
        setTransactions(data.data.transactions);
      }
    );

    interval = setInterval(() => {
      listTransactions({
        walletIds: [wallet.id],
        userToken,
        encryptionKey,
      }).then((data) => {
        setTransactions(data.data.transactions);
      });
      // Refresh every 5 seconds
    }, 5 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [wallet, encryptionKey, userToken, userId, router.pathname]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!wallet) return;

    getWalletTokenBalance({
      walletId: wallet.id,
      userToken,
      encryptionKey,
    }).then((data) => {
      setBalances(data.data.balance);
    });

    interval = setInterval(() => {
      getWalletTokenBalance({
        walletId: wallet.id,
        userToken,
        encryptionKey,
      }).then((data) => {
        setBalances(data.data.balance);
      });
      // Refresh every 5 seconds
    }, 5 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [wallet, encryptionKey, userToken, userId, router.pathname]);

  function changeWallet(walletId: string) {
    const newWallet = wallets.find((w) => w.id === walletId);
    invariant(newWallet, "Wallet not found");
    setWallet(newWallet);
    setWalletId(walletId);
  }

  async function updateWallets() {
    const data = await getWallets({ userToken });
    setWallets(data.data.wallets);
  }

  async function sendTransaction(
    amount: string,
    destinationAddress: string,
    tokenId: string
  ) {
    invariant(wallet, "Wallet not found");
    let transaction = await createTransaction({
      amount,
      destinationAddress,
      walletId: wallet.id,
      userToken,
      tokenId,
      fee: "MEDIUM",
      encryptionKey,
    });

    return transaction.data.challengeId;
  }

  function signout() {
    setUserId("");
    setUserToken("");
    setEncryptionKey("");
    setWalletId("");

    router.push("/");
  }

  async function asyncRestorePin() {
    return (await restorePin({ userId })).data.challengeId;
  }

  async function asyncUpdatePin() {
    return (await updateUserPin({ userId })).data.challengeId;
  }

  async function requestTokens() {
    const LINK = "https://faucet.circle.com/api/requestToken";

    await fetch(LINK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chain: "ETH",
        destinationAddress: wallet?.address,
        token: "USDC",
      }),
    });

    await fetch(LINK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chain: "ETH",
        destinationAddress: wallet?.address,
        token: "EURC",
      }),
    });
  }

  const value = {
    userId,
    userToken,
    encryptionKey,
    wallets,
    wallet,
    transactions,
    balances,
    changeWallet,
    updateWallets,
    sendTransaction,
    signout,
    asyncRestorePin,
    asyncUpdatePin,
    requestTokens,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export default WalletContext;
