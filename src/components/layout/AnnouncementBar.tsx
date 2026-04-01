"use client";

import { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const DISMISS_KEY = "announcement-dismissed-v1";

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
            ? "Nuevo: Busqueda global (\u2318K), calculadora salarial, y 50+ mejoras publicadas hoy"
            : "New: Global search (\u2318K), salary calculator, and 50+ enhancements shipped today"}
        </span>
        <Link
          href="/whats-new"
          className="shrink-0 font-semibold underline underline-offset-2 hover:no-underline"
        >
          {isEs ? "Ver novedades \u2192" : "See what's new \u2192"}
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
