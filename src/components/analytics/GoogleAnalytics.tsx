"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * GoogleAnalytics — consent-first, DNT-respecting.
 *
 * GA scripts only load when:
 * 1. The user has NOT enabled Do Not Track (DNT) in their browser
 * 2. The user has not explicitly opted out (localStorage "ga-opt-out")
 *
 * This matches our privacy policy's claims about DNT detection.
 */
export default function GoogleAnalytics() {
  const [canLoad, setCanLoad] = useState(false);

  useEffect(() => {
    // Respect Do Not Track browser setting
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nav = navigator as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    const dnt =
      navigator.doNotTrack === "1" ||
      win.doNotTrack === "1" ||
      nav.msDoNotTrack === "1";

    // Respect explicit opt-out stored in localStorage
    const optedOut = localStorage.getItem("ga-opt-out") === "true";

    if (!dnt && !optedOut) {
      setCanLoad(true);
    }
  }, []);

  if (!GA_MEASUREMENT_ID || !canLoad) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            anonymize_ip: true,
            linker: {
              domains: ['fqhctalent.com', 'www.fqhctalent.com', 'healthcaretalent.org', 'www.healthcaretalent.org']
            }
          });
        `}
      </Script>
    </>
  );
}
