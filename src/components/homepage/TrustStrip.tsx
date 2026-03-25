"use client";

import { useLocale } from "next-intl";

interface TrustStripProps {
  totalFQHCs: number;
  totalJobs: number;
  totalIntel: number;
}

export function TrustStrip({ totalFQHCs, totalJobs, totalIntel }: TrustStripProps) {
  const locale = useLocale();
  const isEs = locale === "es";

  const stats = [
    { value: `${totalFQHCs}+`, label: isEs ? "FQHCs Rastreados" : "FQHCs Tracked" },
    { value: `${totalJobs.toLocaleString()}+`, label: isEs ? "Empleos Indexados" : "Jobs Indexed" },
    { value: `${totalIntel}`, label: isEs ? "Items de Inteligencia" : "Intel Items" },
    { value: isEs ? "Semanal" : "Weekly", label: isEs ? "De Fuentes Primarias" : "From Primary Sources" },
  ];

  return (
    <section className="border-y border-stone-200 bg-stone-100 px-4 py-8">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8 sm:gap-12">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-lg font-extrabold text-stone-900 sm:text-xl">{stat.value}</p>
            <p className="text-xs font-medium uppercase tracking-wider text-stone-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Source logos */}
      <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-1">
        {["HRSA", "BLS", "CA EDD", "DHCS", "NACHC", "KFF"].map((source) => (
          <span key={source} className="text-xs font-medium text-stone-400">
            {source}
          </span>
        ))}
      </div>
    </section>
  );
}
