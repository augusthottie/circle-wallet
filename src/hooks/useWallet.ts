import WalletContext, { WalletContextType } from "@/context/WalletContext";
import { useContext } from "react";

export const useWallet = (): WalletContextType => useContext(WalletContext);