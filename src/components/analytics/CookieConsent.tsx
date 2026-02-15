"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { X } from "lucide-react";

const COOKIE_CONSENT_KEY = "fqhc-cookie-consent";

export default function CookieConsent() {
  const locale = useLocale();
  const isEs = locale === "es";
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already responded to cookie consent
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay so it doesn't flash on initial load
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setShowBanner(false);
    // GA4 is already loaded — no action needed since it's in the layout
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setShowBanner(false);
    // Disable GA4 tracking
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      });
    }
    // Delete existing GA cookies
    document.cookie.split(";").forEach((c) => {
      const name = c.trim().split("=")[0];
      if (name.startsWith("_ga")) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      }
    });
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="mx-auto max-w-2xl rounded-2xl border border-stone-200 bg-white p-5 shadow-2xl sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-stone-900 sm:text-base">
              {isEs ? "Aviso de Cookies" : "Cookie Notice"}
            </h3>
            <p className="mt-1 text-xs text-stone-600 leading-relaxed sm:text-sm">
              {isEs
                ? "Utilizamos Google Analytics para entender cómo se usa nuestro sitio y poder mejorarlo. No recopilamos información personal a través de cookies. Puede optar por no participar en cualquier momento."
                : "We use Google Analytics to understand how our site is used so we can make it better. We don't collect personal information through cookies. You can opt out at any time."}
            </p>
            <p className="mt-1.5 text-xs text-stone-400">
              {isEs ? (
                <>
                  Lea nuestra{" "}
                  <a href="/es/privacy" className="underline hover:text-stone-600">
                    Política de Privacidad
                  </a>
                  .
                </>
              ) : (
                <>
                  Read our{" "}
                  <a href="/privacy" className="underline hover:text-stone-600">
                    Privacy Policy
                  </a>
                  .
                </>
              )}
            </p>
          </div>
          <button
            onClick={handleDecline}
            className="shrink-0 rounded-full p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition-colors"
            aria-label={isEs ? "Cerrar" : "Close"}
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={handleAccept}
            className="flex-1 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 transition-colors"
          >
            {isEs ? "Aceptar" : "Accept"}
          </button>
          <button
            onClick={handleDecline}
            className="flex-1 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
          >
            {isEs ? "Rechazar" : "Decline"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Extend window type for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
