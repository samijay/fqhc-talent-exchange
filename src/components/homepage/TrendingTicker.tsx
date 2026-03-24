"use client";

import { TrendingUp } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export function TrendingTicker() {
  const locale = useLocale();
  const isEs = locale === "es";

  return (
    <div className="border-b border-stone-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center gap-3 py-2.5">
        <span className="flex-shrink-0 inline-flex items-center gap-1 rounded bg-teal-700 text-white px-2 py-0.5 text-xs font-bold uppercase tracking-wider motion-safe:animate-pulse">
          <TrendingUp className="size-3" />
          {isEs ? "Tendencia" : "Trending"}
        </span>
        <Link
          href="/strategy/resilience"
          className="text-sm font-medium text-stone-700 hover:text-teal-700 transition-colors truncate"
        >
          {isEs
            ? "Scorecard de Resiliencia: 220 FQHCs evaluados en 5 dimensiones — vea su calificación →"
            : "Resilience Scorecard: 220 FQHCs scored across 5 dimensions — see your grade →"}
        </Link>
        <span className="hidden lg:inline-block h-4 w-px bg-stone-300 flex-shrink-0" />
        <span className="hidden lg:inline-flex items-center gap-1 flex-shrink-0">
          <span className="flex-shrink-0 inline-flex items-center gap-1 rounded bg-red-600 text-white px-2 py-0.5 text-xs font-bold uppercase tracking-wider">
            {isEs ? "Critico" : "Critical"}
          </span>
          <Link
            href="/blog/fqhc-copay-advantage-patient-surge"
            className="text-sm font-medium text-stone-700 hover:text-teal-700 transition-colors truncate"
          >
            {isEs
              ? "H.R. 1 copagos de $35 — FQHCs exentos →"
              : "H.R. 1 $35 copays — FQHCs exempt →"}
          </Link>
        </span>
        <span className="hidden xl:inline-block h-4 w-px bg-stone-300 flex-shrink-0" />
        <span className="hidden xl:inline-flex items-center gap-1 flex-shrink-0">
          <span className="flex-shrink-0 inline-flex items-center gap-1 rounded bg-amber-600 text-white px-2 py-0.5 text-xs font-bold uppercase tracking-wider">
            {isEs ? "Análisis" : "Analysis"}
          </span>
          <Link
            href="/strategy/masterclass"
            className="text-sm font-medium text-stone-700 hover:text-teal-700 transition-colors truncate"
          >
            {isEs
              ? "Masterclass: 18 módulos para la crisis 2026 — comience gratis →"
              : "Masterclass: 18 modules for the 2026 crisis — start free →"}
          </Link>
        </span>
      </div>
    </div>
  );
}
