"use client";

import { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const DISMISS_KEY = "announcement-dismissed-v10";

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(true); // start hidden to avoid flash
  const locale = useLocale();
  const isEs = locale === "es";

  useEffect(() => {
    try {
      const wasDismissed = localStorage.getItem(DISMISS_KEY);
      if (!wasDismissed) {
        setDismissed(false);
      }
    } catch {
      // localStorage unavailable — show the banner
      setDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // silent fail
    }
  };

  if (dismissed) return null;

  return (
    <div className="relative bg-gradient-to-r from-teal-700 to-teal-600 text-white">
      <div className="flex items-center justify-center gap-2 py-2 pl-4 pr-10 text-center text-xs sm:pl-8 sm:text-sm">
        <Sparkles className="size-3.5 shrink-0 sm:size-4" />
        <span>
          {isEs
            ? "Marzo 2026: Salud agrega 76K empleos \u2014 pero \u00bfqu\u00e9 roles crecen y por cu\u00e1nto tiempo?"
            : "March 2026: Healthcare adds 76K jobs \u2014 which roles are growing, and for how long?"}
        </span>
        <Link
          href="/blog/march-2026-jobs-report-fqhc-hiring-slowdown"
          className="shrink-0 font-semibold underline underline-offset-2 hover:no-underline"
        >
          {isEs ? "Leer an\u00e1lisis \u2192" : "Read analysis \u2192"}
        </Link>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleDismiss();
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/60 transition-colors hover:bg-teal-800/40 hover:text-white"
        aria-label={isEs ? "Cerrar" : "Dismiss"}
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}
