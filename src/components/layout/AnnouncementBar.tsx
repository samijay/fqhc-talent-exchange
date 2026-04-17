"use client";

import { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const DISMISS_KEY = "announcement-dismissed-v16";

const BANNER_ITEMS = [
  {
    text: {
      en: "LA County DHS faces $662M federal funding decline — 700K residents at risk of losing Medi-Cal by 2027",
      es: "El Condado de LA enfrenta $662M menos en fondos federales de salud — 700K residentes en riesgo de perder Medi-Cal",
    },
    linkText: { en: "Full Analysis →", es: "Análisis Completo →" },
    href: "/" as const,
  },
  {
    text: {
      en: "SEIU-UHW ballot initiative signature verification deadline TODAY — 90% clinic spending mandate could reshape all CA FQHCs",
      es: "Verificación de firmas de iniciativa de SEIU-UHW HOY — mandato del 90% podría reformar todos los FQHCs de CA",
    },
    linkText: { en: "Advocacy Tracker →", es: "Rastreador de Defensa →" },
    href: "/" as const,
  },
];

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") return true; // SSR: hide to avoid flash
    try {
      return !!localStorage.getItem(DISMISS_KEY);
    } catch {
      return false; // localStorage unavailable — show the banner
    }
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const locale = useLocale();
  const isEs = locale === "es";

  // Rotate between items every 6 seconds
  useEffect(() => {
    if (dismissed) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % BANNER_ITEMS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // silent fail
    }
  };

  if (dismissed) return null;

  const item = BANNER_ITEMS[activeIndex];

  return (
    <div className="relative bg-gradient-to-r from-teal-700 to-teal-600 text-white">
      <div className="flex items-center justify-center gap-2 py-2 pl-4 pr-10 text-center text-xs sm:pl-8 sm:text-sm">
        <Sparkles className="size-3.5 shrink-0 sm:size-4" />
        <span className="line-clamp-1 transition-opacity duration-300">
          {isEs ? item.text.es : item.text.en}
        </span>
        <Link
          href={item.href}
          className="shrink-0 font-semibold underline underline-offset-2 hover:no-underline"
        >
          {isEs ? item.linkText.es : item.linkText.en}
        </Link>
        {/* Dots indicator */}
        <span className="ml-1 hidden items-center gap-1 sm:flex">
          {BANNER_ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
              className={`size-1.5 rounded-full transition-colors ${i === activeIndex ? "bg-white" : "bg-white/30"}`}
              aria-label={`Banner item ${i + 1}`}
            />
          ))}
        </span>
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
