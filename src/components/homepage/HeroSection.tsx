"use client";

import { Activity, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import type { MarketOverview, FundingCliff } from "@/lib/market-intelligence";

interface HeroSectionProps {
  overview: MarketOverview;
  nextCliff: FundingCliff | null;
  latestNewsDate: string;
}

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

export function HeroSection({
  overview,
  nextCliff,
  latestNewsDate,
}: HeroSectionProps) {
  const locale = useLocale();
  const isEs = locale === "es";

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <Activity className="size-5 text-teal-400" />
            <span className="text-sm font-medium uppercase tracking-wider text-teal-400">
              {isEs
                ? "Inteligencia Ejecutiva FQHC"
                : "FQHC Executive Intelligence"}
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {isEs
              ? "Dashboard de Inteligencia FQHC"
              : "FQHC Intelligence Dashboard"}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-stone-300 sm:text-lg">
            {isEs
              ? "Legislacion, financiamiento, fuerza laboral, IA, y analisis estrategico — actualizado diariamente."
              : "Legislation, funding, workforce, AI, and strategic analysis — updated daily."}
          </p>

          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-stone-500">
            <Clock className="size-3" />
            <span>
              {isEs ? "Ultima actualizacion:" : "Last updated:"}{" "}
              {latestNewsDate}
            </span>
          </div>
        </div>

        {/* Stat strip — all tiles are clickable */}
        <div className="mt-8 mx-auto max-w-3xl grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Link href="/directory" className="rounded-lg bg-white/10 backdrop-blur p-3 text-center hover:bg-white/20 transition-colors cursor-pointer">
            <div className="text-xs text-stone-500 uppercase tracking-wide">
              {isEs ? "FQHCs Rastreados" : "FQHCs Tracked"}
            </div>
            <div className="text-2xl font-bold text-white">
              {overview.totalFQHCs}
            </div>
          </Link>
          <Link href="/jobs" className="rounded-lg bg-white/10 backdrop-blur p-3 text-center hover:bg-white/20 transition-colors cursor-pointer">
            <div className="text-xs text-stone-500 uppercase tracking-wide">
              {isEs ? "Empleos Activos" : "Active Jobs"}
            </div>
            <div className="text-2xl font-bold text-white">
              {overview.totalJobs}+
            </div>
          </Link>
          <Link href="/layoffs" className="rounded-lg bg-white/10 backdrop-blur p-3 text-center hover:bg-white/20 transition-colors cursor-pointer">
            <div className="text-xs text-red-400 uppercase tracking-wide">
              {isEs ? "Trabajadores Desplazados" : "Workers Displaced"}
            </div>
            <div className="text-2xl font-bold text-red-400">
              {overview.totalLayoffWorkers.toLocaleString()}+
            </div>
          </Link>
          <Link href="/funding-impact" className="rounded-lg bg-white/10 backdrop-blur p-3 text-center hover:bg-white/20 transition-colors cursor-pointer">
            <div className="text-xs text-amber-400 uppercase tracking-wide">
              {isEs ? "Proximo Riesgo Fiscal" : "Next Funding Cliff"}
            </div>
            <div className="text-2xl font-bold text-amber-400">
              {nextCliff ? `${nextCliff.daysUntil}d` : "—"}
            </div>
            {nextCliff && (
              <div className="text-xs text-stone-500 mt-0.5 truncate">
                {t(nextCliff.title, locale)}
              </div>
            )}
          </Link>
        </div>
      </div>
    </section>
  );
}
