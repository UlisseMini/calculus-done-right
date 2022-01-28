import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Script from "next/script";
import { GOOGLE_CLIENT_ID, GA_TRACKING_ID, pageview } from "lib/google";
import { CredentialResponse } from "google-one-tap";
import * as api from "lib/api";

// Extend window to have dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeComplete", pageview);
    return () => {
      router.events.off("routeChangeComplete", pageview);
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://a.nerdsniper.net/a.js`}
        data-domain={`calculus-done-right.com`}
      />

      {/* Global site tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        onLoad={() => {
          window.dataLayer = window.dataLayer || [];
          function gtag(...args: any[]) {
            window.dataLayer.push(args);
          }
          gtag("js", new Date());

          gtag("config", GA_TRACKING_ID, {
            page_path: window.location.pathname,
          });
        }}
      />
      {/* Google Identity (aka: sign in with google) */}
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => {
          function handleCredentialResponse(response: CredentialResponse) {
            console.log("Encoded JWT ID token: " + response.credential);
            const token = response.credential;
            api
              .googleSignin(apiUrl, token)
              .then((j) => {
                console.log(`signin success: ${j}`);
                localStorage.setItem("token", token);
              })
              .catch((e) => console.error(e));
          }

          const google = window.google;
          window.onload = function () {
            google.accounts.id.initialize({
              client_id: GOOGLE_CLIENT_ID,
              callback: handleCredentialResponse,
            });
            // google.accounts.id.renderButton(
            //   document.getElementById("buttonDiv"),
            //   {theme: "outline", size: "large"}
            // )
            // FIXME: Reprompt if token expired
            // TODO: Use storage event to sync auth between tabs
            if (!localStorage.getItem("token")) {
              // Disabled until I add features that use it.
              // google.accounts.id.prompt() // display the One Tap dialog
            }
          };
        }}
      />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
