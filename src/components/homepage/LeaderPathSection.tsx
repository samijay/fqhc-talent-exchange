"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AlertTriangle, Newspaper, ShieldCheck, ArrowRight } from "lucide-react";
import type { FundingCliff } from "@/lib/market-intelligence";

interface LeaderPathSectionProps {
  nextCliff: FundingCliff | null;
  topIntelHeadline: { en: string; es: string };
  topIntelSource: string;
  totalFQHCs: number;
}

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

export function LeaderPathSection({
  nextCliff,
  topIntelHeadline,
  topIntelSource,
  totalFQHCs,
}: LeaderPathSectionProps) {
  const locale = useLocale();
  const isEs = locale === "es";

  return (
    <section id="for-leaders" className="scroll-mt-16 bg-stone-50 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-teal-600" />
          <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            {isEs ? "Para Lideres de FQHCs" : "For FQHC Leaders"}
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 sm:gap-6 stagger-children">
          {/* Card 1: Next Funding Cliff */}
          <Link
            href="/funding-impact"
            className="group rounded-xl border-2 border-amber-200 bg-white p-6 transition-all duration-200 hover:border-amber-400 hover:shadow-lg hover:-translate-y-0.5"
          >
            <AlertTriangle className="mb-3 size-6 text-amber-500" />
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
              {isEs ? "Proximo Riesgo Fiscal" : "Next Funding Cliff"}
            </p>
            {nextCliff ? (
              <>
                <p className="mt-2 text-3xl font-extrabold text-stone-900">
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
            className="group rounded-xl border-2 border-teal-200 bg-white p-6 transition-all duration-200 hover:border-teal-400 hover:shadow-lg hover:-translate-y-0.5"
          >
            <Newspaper className="mb-3 size-6 text-teal-600" />
            <p className="text-xs font-bold uppercase tracking-wider text-teal-600">
              {isEs ? "Ultima Inteligencia" : "Latest Intel"}
            </p>
            <p className="mt-2 text-sm font-semibold leading-snug text-stone-900">
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
            className="group rounded-xl border-2 border-stone-200 bg-white p-6 transition-all duration-200 hover:border-teal-400 hover:shadow-lg hover:-translate-y-0.5"
          >
            <ShieldCheck className="mb-3 size-6 text-teal-600" />
            <p className="text-xs font-bold uppercase tracking-wider text-teal-600">
              {isEs ? "Puntaje de Resiliencia" : "Resilience Scorecard"}
            </p>
            <p className="mt-2 text-3xl font-extrabold text-stone-900">
              {totalFQHCs}
            </p>
            <p className="mt-1 text-sm text-stone-600">
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
              className="inline-flex items-center gap-1 text-sm font-medium text-teal-700 underline underline-offset-2 decoration-teal-300 transition-colors hover:text-teal-900 hover:decoration-teal-600"
            >
              {t(link, locale)} <ArrowRight className="size-3" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
