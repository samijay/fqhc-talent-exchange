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

  // Suppress unused-var warnings — props kept for future use
  void totalFQHCs; void totalJobs; void totalIntel;

  return (
    <section className="border-y border-stone-200 bg-stone-100 px-4 py-8 dark:border-stone-700 dark:bg-stone-900">
      <div className="mx-auto max-w-5xl">
        {/* Differentiating statement */}
        <p className="mb-5 text-center text-sm font-medium text-stone-600 dark:text-stone-400">
          {isEs
            ? "Datos agregados de fuentes primarias — no análisis de terceros, no contenido patrocinado."
            : "Data aggregated from primary sources — no third-party analysis, no sponsored content."}
        </p>

        {/* Source badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { name: "HRSA", label: isEs ? "Datos de Centros de Salud" : "Health Center Data" },
            { name: "BLS", label: isEs ? "Benchmarks Salariales" : "Salary Benchmarks" },
            { name: "CA EDD", label: isEs ? "Avisos WARN Act" : "WARN Act Notices" },
            { name: "DHCS", label: isEs ? "Datos de Medi-Cal" : "Medi-Cal Data" },
            { name: "NACHC", label: isEs ? "Investigación Sectorial" : "Sector Research" },
            { name: "KFF", label: isEs ? "Análisis de Políticas" : "Policy Analysis" },
          ].map((source) => (
            <div
              key={source.name}
              className="flex flex-col items-center rounded-lg border border-stone-200 bg-white px-4 py-2 dark:border-stone-700 dark:bg-stone-800"
            >
              <span className="text-sm font-bold text-stone-800 dark:text-stone-100">{source.name}</span>
              <span className="text-xs text-stone-500 dark:text-stone-400">{source.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
