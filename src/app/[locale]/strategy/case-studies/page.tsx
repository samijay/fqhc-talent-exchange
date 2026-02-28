// Case Studies Index — Compact overview linking to full guides
"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CASE_STUDIES,
  STRATEGY_CATEGORIES,
  type FQHCCaseStudy,
} from "@/lib/fqhc-case-studies";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  Compact Case Study Card                                            */
/* ------------------------------------------------------------------ */

function CompactCard({
  cs,
  locale,
  isEs,
}: {
  cs: FQHCCaseStudy;
  locale: string;
  isEs: boolean;
}) {
  const catMeta = STRATEGY_CATEGORIES.find((c) => c.id === cs.strategyCategory);

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          {catMeta && (
            <Badge
              variant="secondary"
              className="bg-teal-50 text-teal-700 text-xs mb-2"
            >
              {isEs ? catMeta.es : catMeta.en}
            </Badge>
          )}
          <h3 className="text-lg font-bold text-stone-900">{cs.fqhcName}</h3>
          <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
            <MapPin className="size-3" />
            {cs.location}
          </p>
        </div>
      </div>

      <p className="text-sm text-stone-600 leading-relaxed line-clamp-3 mb-4">
        {t(cs.challenge, locale)}
      </p>

      {/* Headline outcomes */}
      <div className="flex flex-wrap gap-2 mb-4">
        {cs.outcomes.slice(0, 2).map((o) => (
          <span
            key={o.metric}
            className="inline-flex items-center gap-1 rounded-full bg-green-50 border border-green-200 px-2.5 py-1 text-xs font-medium text-green-800"
          >
            <BarChart3 className="size-3" />
            {o.value}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center justify-between">
        {cs.fqhcSlug ? (
          <Link
            href={`/directory/${cs.fqhcSlug}` as "/directory"}
            className="text-xs text-teal-700 hover:underline"
          >
            {isEs ? "Perfil FQHC" : "FQHC Profile"} →
          </Link>
        ) : (
          <span className="text-xs text-stone-400">
            {isEs ? "Fuera de California" : "Outside California"}
          </span>
        )}
        <a
          href={cs.primarySourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-teal-700 hover:text-teal-900 hover:underline transition-colors"
        >
          {cs.primarySourceOrg} →
        </a>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Case Studies Index Page                                            */
/* ================================================================== */

export default function CaseStudiesPage() {
  const locale = useLocale();
  const isEs = locale === "es";

  return (
    <div className="bg-stone-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="size-5 text-teal-400" />
            <span className="text-sm font-medium uppercase tracking-wider text-teal-400">
              {isEs ? "Estrategia" : "Strategy"}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {isEs ? "Estudios de Caso FQHC" : "FQHC Case Studies"}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-300">
            {isEs
              ? "Como FQHCs reales estan resolviendo desafios de financiamiento, fuerza laboral y operaciones — con resultados medibles."
              : "How real FQHCs are solving funding, workforce, and operational challenges — with measurable outcomes."}
          </p>
        </div>
      </section>

      {/* Cards grid */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CASE_STUDIES.map((cs) => (
              <CompactCard
                key={cs.id}
                cs={cs}
                locale={locale}
                isEs={isEs}
              />
            ))}
          </div>

          {/* CTA — view full guides for the framework */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-teal-700 to-teal-800 p-8 text-center text-white">
            <h2 className="text-xl font-bold sm:text-2xl">
              {isEs
                ? "Explora el Marco Estrategico Completo"
                : "Explore the Full Strategic Framework"}
            </h2>
            <p className="mt-2 text-teal-100 max-w-xl mx-auto">
              {isEs
                ? "Ve el diagnostico completo, politica guia, acciones, y resultados de cada caso en nuestras Guias Ejecutivas."
                : "See the full diagnosis, guiding policy, actions, and outcomes for each case in our Executive Guides."}
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="bg-white text-teal-800 hover:bg-stone-100"
                asChild
              >
                <Link href="/strategy/guides">
                  {isEs ? "Guias Ejecutivas" : "Executive Guides"}{" "}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="/strategy/okrs">
                  {isEs ? "Plantillas OKR" : "OKR Templates"}{" "}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
