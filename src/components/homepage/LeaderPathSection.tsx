"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AlertTriangle, Newspaper, ShieldCheck, ArrowRight } from "lucide-react";
import type { FundingCliff } from "@/lib/market-intelligence";
import { IntelBriefPDF, type IntelBriefItem } from "@/components/intel/IntelBriefPDF";
import { t } from "@/lib/i18n-helpers";

interface LeaderPathSectionProps {
  nextCliff: FundingCliff | null;
  topIntelHeadline: { en: string; es: string };
  topIntelSource: string;
  totalFQHCs: number;
  intelBriefItems: IntelBriefItem[];
  advocacyItems?: {
    id: string;
    headline: { en: string; es: string };
    status: string;
    followUpDate: string | null;
    region: string;
  }[];
  advocacyCounts?: { total: number; active: number; pendingVote: number; upcoming: number };
}


export function LeaderPathSection({
  nextCliff,
  topIntelHeadline,
  topIntelSource,
  totalFQHCs,
  intelBriefItems,
  advocacyItems,
  advocacyCounts,
}: LeaderPathSectionProps) {
  const locale = useLocale();
  const isEs = locale === "es";
  const daysUntil = (d: string) => Math.max(0, Math.ceil((new Date(d).getTime() - Date.now()) / 86400000));

  return (
    <>
    <section id="for-leaders" className="scroll-mt-16 bg-stone-50 px-4 py-16 sm:py-20 dark:bg-stone-900">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-wrap items-center gap-3 sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 rounded-full bg-teal-600" />
            <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
              {isEs ? "Para Lideres de FQHCs" : "For FQHC Leaders"}
            </h2>
          </div>
          <IntelBriefPDF items={intelBriefItems} />
        </div>

        <div className="grid gap-4 sm:grid-cols-3 sm:gap-6 stagger-children">
          {/* Card 1: Next Funding Cliff */}
          <Link
            href="/funding-impact"
            className="group rounded-xl border-2 border-amber-200 bg-white p-6 transition-all duration-200 hover:border-amber-400 hover:shadow-lg hover:-translate-y-0.5 dark:bg-stone-800 dark:border-amber-700 dark:hover:border-amber-500"
          >
            <AlertTriangle className="mb-3 size-6 text-amber-500" />
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
              {isEs ? "Proximo Riesgo Fiscal" : "Next Funding Cliff"}
            </p>
            {nextCliff ? (
              <>
                <p className="mt-2 text-3xl font-extrabold text-stone-900 dark:text-stone-100">
                  {nextCliff.daysUntil}{" "}
                  <span className="text-lg font-semibold text-stone-500">
                    {isEs ? "dias" : "days"}
                  </span>
                </p>
                <p className="mt-1 text-sm leading-snug text-stone-600">
                  {t(nextCliff.title, locale)}
                </p>
              </>
            ) : (
              <p className="mt-2 text-sm text-stone-500">
                {isEs ? "Sin riesgos inminentes" : "No imminent cliffs"}
              </p>
            )}
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-amber-600 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {isEs ? "Ver todos" : "View all"} <ArrowRight className="size-3" />
            </span>
          </Link>

          {/* Card 2: Latest Intel */}
          <Link
            href="/strategy/guides"
            className="group rounded-xl border-2 border-teal-200 bg-white p-6 transition-all duration-200 hover:border-teal-400 hover:shadow-lg hover:-translate-y-0.5 dark:bg-stone-800 dark:border-teal-700 dark:hover:border-teal-500"
          >
            <Newspaper className="mb-3 size-6 text-teal-600" />
            <p className="text-xs font-bold uppercase tracking-wider text-teal-600">
              {isEs ? "Ultima Inteligencia" : "Latest Intel"}
            </p>
            <p className="mt-2 text-sm font-semibold leading-snug text-stone-900 dark:text-stone-100">
              {t(topIntelHeadline, locale)}
            </p>
            <p className="mt-2 text-xs text-stone-500">{topIntelSource}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-teal-600 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {isEs ? "Leer mas" : "Read more"} <ArrowRight className="size-3" />
            </span>
          </Link>

          {/* Card 3: Resilience Scorecard */}
          <Link
            href="/strategy/resilience"
            className="group rounded-xl border-2 border-stone-200 bg-white p-6 transition-all duration-200 hover:border-teal-400 hover:shadow-lg hover:-translate-y-0.5 dark:bg-stone-800 dark:border-stone-700 dark:hover:border-teal-500"
          >
            <ShieldCheck className="mb-3 size-6 text-teal-600" />
            <p className="text-xs font-bold uppercase tracking-wider text-teal-600">
              {isEs ? "Puntaje de Resiliencia" : "Resilience Scorecard"}
            </p>
            <p className="mt-2 text-3xl font-extrabold text-stone-900 dark:text-stone-100">
              {totalFQHCs}
            </p>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
              {isEs
                ? "FQHCs evaluados en 5 dimensiones"
                : "FQHCs scored across 5 dimensions"}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-teal-600 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {isEs ? "Ver calificaciones" : "See grades"} <ArrowRight className="size-3" />
            </span>
          </Link>
        </div>

        {/* Quick links row */}
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {[
            { href: "/strategy/guides" as const, en: "Executive Guides", es: "Guias Ejecutivas" },
            { href: "/strategy/okrs" as const, en: "OKR Templates", es: "Plantillas OKR" },
            { href: "/strategy/clinic-simulator" as const, en: "Clinic Simulator", es: "Simulador de Clinica" },
            { href: "/ai-tracker" as const, en: "AI Tracker", es: "Rastreador de IA" },
            { href: "/compliance" as const, en: "Compliance Hub", es: "Centro de Cumplimiento" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-1 text-sm font-medium text-teal-700 underline underline-offset-2 decoration-teal-300 transition-colors hover:text-teal-900 hover:decoration-teal-600 dark:text-teal-400 dark:decoration-teal-600 dark:hover:text-teal-300"
            >
              {t(link, locale)} <ArrowRight className="size-3" />
            </Link>
          ))}
        </div>
      </div>
    </section>

      {/* Advocacy Watch — grouped with the leader section */}
      {advocacyItems && advocacyItems.length > 0 && advocacyCounts && (
        <section className="border-b border-amber-200 bg-amber-50 px-6 py-8 dark:border-amber-800 dark:bg-amber-950/30">
          <div className="mx-auto max-w-5xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-base font-bold text-stone-900 dark:text-stone-100">
                <span className="size-2 animate-pulse rounded-full bg-teal-500" />
                {isEs ? "Seguimiento de Abogacía" : "Advocacy Watch"}
              </h3>
              <Link href={"/strategy/advocacy" as "/strategy/guides"} className="text-sm font-medium text-teal-700 hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-300">
                {isEs ? "Ver todo" : "View all"} ({advocacyCounts.total}) &rarr;
              </Link>
            </div>
            <div className="mb-3 flex gap-3 text-sm">
              <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800">{advocacyCounts.active} {isEs ? "activas" : "active"}</span>
              {advocacyCounts.pendingVote > 0 && <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">{advocacyCounts.pendingVote} {isEs ? "votos pendientes" : "pending votes"}</span>}
              <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">{advocacyCounts.upcoming} {isEs ? "seguimientos próximos" : "upcoming follow-ups"}</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {advocacyItems.map((item) => {
                const days = item.followUpDate ? daysUntil(item.followUpDate) : null;
                return (
                  <Link
                    key={item.id}
                    href={"/strategy/advocacy" as "/strategy/guides"}
                    className="flex items-center gap-3 rounded-lg border border-amber-200 bg-white p-3 transition-colors hover:border-teal-300 dark:border-amber-800 dark:bg-stone-800 dark:hover:border-teal-600"
                  >
                    {days !== null && (
                      <div className={`shrink-0 text-center ${days <= 14 ? "text-red-600" : "text-amber-600"}`}>
                        <p className="text-xl font-bold">{days}</p>
                        <p className="text-xs">{isEs ? "días" : "days"}</p>
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-stone-800 dark:text-stone-200">
                        {isEs ? item.headline.es : item.headline.en}
                      </p>
                      <p className="text-xs text-stone-400">{item.region}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
