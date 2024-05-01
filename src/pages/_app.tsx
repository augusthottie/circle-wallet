import { FontProvider } from "@/providers/FontProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>It&apos;s just a wallet!</title>
        <meta name="description" content="It's just a wallet!" />
      </Head>
      <GoogleOAuthProvider clientId="701015667868-v0hnacmbhhn135k71bpct5ejque3u1af.apps.googleusercontent.com">
        <FontProvider>
          <ToastProvider>
            <Component {...pageProps} />
          </ToastProvider>
        </FontProvider>
      </GoogleOAuthProvider>
    </>
  );
}
