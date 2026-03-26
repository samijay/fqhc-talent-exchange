"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

interface TrustStripProps {
  totalFQHCs: number;
  totalJobs: number;
  totalIntel: number;
}

export function TrustStrip({ totalFQHCs, totalJobs, totalIntel }: TrustStripProps) {
  const locale = useLocale();
  const isEs = locale === "es";

  const stats = [
    {
      value: `${totalFQHCs}+`,
      label: isEs ? "FQHCs Rastreados" : "FQHCs Tracked",
      href: "/directory" as const,
    },
    {
      value: `${totalJobs.toLocaleString()}+`,
      label: isEs ? "Empleos Indexados" : "Jobs Indexed",
      href: "/jobs" as const,
    },
    {
      value: `${totalIntel}`,
      label: isEs ? "Items de Inteligencia" : "Intel Items",
      href: "/layoffs" as const,
    },
    {
      value: isEs ? "Semanal" : "Weekly",
      label: isEs ? "De Fuentes Primarias" : "From Primary Sources",
      href: "/blog" as const,
    },
  ];

  return (
    <section className="border-y border-stone-200 bg-stone-100 px-4 py-8">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8 sm:gap-12">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group text-center transition-colors"
          >
            <p className="text-lg font-extrabold text-stone-900 group-hover:text-teal-700 sm:text-xl">
              {stat.value}
            </p>
            <p className="text-xs font-medium uppercase tracking-wider text-stone-600 group-hover:text-teal-600">
              {stat.label}
            </p>
          </Link>
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
