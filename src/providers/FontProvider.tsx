import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const FontProvider = ({ children }: { children: React.ReactNode }) => {
  return <div className={inter.className}>{children}</div>;
};
