// Executive Guides — Real FQHC case studies with Rumelt strategic framework
"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { t } from "@/lib/i18n-helpers";
import { Link } from "@/i18n/navigation";
import { Breadcrumb, PageHero, RelatedContent } from "@/components/ui/design-system";
import { STRATEGY_RELATED } from "@/lib/strategy-related-content";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  ChevronUp,
  Target,
  Lightbulb,
  CheckCircle2,
  BarChart3,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CASE_STUDIES,
  CASE_STUDIES_LAST_UPDATED,
  STRATEGY_CATEGORIES,
  DIFFICULTY_META,
  getCaseStudyCounts,
  type StrategyCategory,
  type FQHCCaseStudy,
} from "@/lib/fqhc-case-studies";
import { useContentReads, type ContentRead } from "@/hooks/useContentReads";
import { ReadStatusBadge } from "@/components/content/ReadStatusBadge";
import { FavoriteButton } from "@/components/dashboard/FavoriteButton";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

// t() imported from @/lib/i18n-helpers

/* ------------------------------------------------------------------ */
/*  Case Study Card                                                    */
/* ------------------------------------------------------------------ */

function CaseStudyCard({
  cs,
  locale,
  isEs,
  isExpanded,
  onToggle,
  read,
}: {
  cs: FQHCCaseStudy;
  locale: string;
  isEs: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  read: ContentRead | undefined;
}) {
  const catMeta = STRATEGY_CATEGORIES.find((c) => c.id === cs.strategyCategory);
  const diffMeta = DIFFICULTY_META.find((d) => d.id === cs.difficulty);

  return (
    <div className="relative rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 transition-shadow hover:shadow-md overflow-hidden">
      <div className="absolute right-12 top-6 z-10 flex items-center gap-1">
        <FavoriteButton contentType="case-study" contentId={cs.id} size="sm" />
      </div>
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full text-left p-6 pb-4"
        aria-expanded={isExpanded}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              {catMeta && (
                <Badge variant="secondary" className="bg-teal-50 text-teal-700 text-xs">
                  {isEs ? catMeta.es : catMeta.en}
                </Badge>
              )}
              {diffMeta && (
                <Badge
                  variant="outline"
                  className={`text-xs border ${diffMeta.color}`}
                >
                  {isEs ? diffMeta.es : diffMeta.en}
                </Badge>
              )}
              <span className="text-xs text-stone-500">{cs.location}</span>
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <ReadStatusBadge read={read} />
              {cs.fqhcName}
            </h3>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-stone-500">
              <Calendar className="size-3" />
              <span>{cs.timeframe}</span>
            </div>
            <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
              {t(cs.headline, locale)}
            </p>
          </div>
          <div className="flex-shrink-0 mt-1 text-stone-500">
            {isExpanded ? (
              <ChevronUp className="size-5" />
            ) : (
              <ChevronDown className="size-5" />
            )}
          </div>
        </div>

        {/* Outcome badges — always visible */}
        <div className="mt-3 flex flex-wrap gap-2">
          {cs.outcomes.slice(0, 3).map((o) => (
            <span
              key={o.metric}
              className="inline-flex items-center gap-1 rounded-full bg-stone-100 dark:bg-stone-800 px-2.5 py-1 text-xs font-medium text-stone-700 dark:text-stone-300"
            >
              <BarChart3 className="size-3 text-teal-600" />
              {o.value}
            </span>
          ))}
        </div>
      </button>

      {/* Expanded — Rumelt framework */}
      {isExpanded && (
        <div className="border-t border-stone-100 dark:border-stone-700 px-6 pb-6 pt-4 space-y-5">
          {/* Diagnose the Problem */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="size-4 text-red-600" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-red-700">
                {isEs ? "Diagnosticar el Problema" : "Diagnose the Problem"}
              </h4>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {t(cs.challenge, locale)}
            </p>
          </div>

          {/* Guiding Policy */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="size-4 text-teal-600" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-teal-700">
                {isEs ? "Politica Guia" : "Guiding Policy"}
              </h4>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {t(cs.guidingPolicy, locale)}
            </p>
          </div>

          {/* Coherent Actions */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="size-4 text-amber-600" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-amber-700">
                {isEs ? "Acciones Coherentes" : "Coherent Actions"}
              </h4>
            </div>
            <ul className="space-y-1.5">
              {cs.actions.map((action, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-stone-600"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                    {i + 1}
                  </span>
                  {t(action, locale)}
                </li>
              ))}
            </ul>
          </div>

          {/* Outcomes */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="size-4 text-green-600" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-green-700">
                {isEs ? "Resultados Medidos" : "Measured Outcomes"}
              </h4>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {cs.outcomes.map((o) => (
                <div
                  key={o.metric}
                  className="rounded-lg border border-green-100 dark:border-green-800 bg-green-50 dark:bg-green-950 p-3"
                >
                  <div className="text-lg font-bold text-green-800">
                    {o.value}
                  </div>
                  <div className="text-xs font-medium text-green-700">
                    {o.metric}
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    {t(o.context, locale)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sources */}
          <div className="flex items-center justify-between border-t border-stone-100 dark:border-stone-700 pt-3">
            <div className="flex items-center gap-2">
              {cs.fqhcSlug && (
                <Link
                  href={`/directory/${cs.fqhcSlug}` as "/directory"}
                  className="text-xs bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full hover:bg-teal-100 transition-colors"
                >
                  {isEs ? "Ver Perfil" : "View Profile"}
                </Link>
              )}
            </div>
            <div className="flex items-center gap-3">
              {cs.additionalSources.map((src) => (
                <a
                  key={src.url}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-stone-500 hover:text-stone-600 hover:underline transition-colors"
                >
                  {src.label}
                </a>
              ))}
              <a
                href={cs.primarySourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-teal-700 hover:text-teal-900 hover:underline transition-colors"
              >
                {cs.primarySourceOrg} →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  Executive Guides Page                                              */
/* ================================================================== */

export default function ExecutiveGuidesPage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<StrategyCategory | "all">("all");
  const { reads, markAsReading } = useContentReads("case-study");

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      const expanding = !next.has(id);
      if (expanding) { next.add(id); markAsReading(id); }
      else next.delete(id);
      return next;
    });
  };

  const filtered =
    activeCategory === "all"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((cs) => cs.strategyCategory === activeCategory);

  const counts = getCaseStudyCounts();

  return (
    <div className="bg-stone-50 dark:bg-stone-950">
      <Breadcrumb items={[
        { label: "Home", href: "/" },
        { label: "Strategy", href: "/strategy/guides" },
        { label: "Executive Guides" },
      ]} />
      {/* Hero */}
      <PageHero
        variant="dark"
        title={{ en: "Executive Guides", es: "Guias Ejecutivas" }}
        subtitle={{
          en: "Real FQHC case studies, structured with Rumelt's 'Good Strategy' framework: Diagnose \u2192 Guiding Policy \u2192 Coherent Actions.",
          es: "Estudios de caso reales de FQHCs, estructurados con el marco de 'Buena Estrategia' de Rumelt: Diagnosticar \u2192 Politica Guia \u2192 Acciones Coherentes.",
        }}
        meta={`${counts.total} ${isEs ? "estudios de caso" : "case studies"} · ${Object.keys(counts).length - 1} ${isEs ? "categorías" : "categories"} · ${isEs ? "Fuentes primarias verificadas" : "Verified primary sources"} · ${isEs ? "Actualizado:" : "Updated:"} ${CASE_STUDIES_LAST_UPDATED}`}
      />

      {/* ── Rumelt Framework Explainer ── */}
      <section className="border-b border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-10">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 sm:text-2xl">
              {isEs ? "El Marco Estratégico" : "The Strategic Framework"}
            </h2>
            <p className="mt-3 text-sm text-stone-500 leading-relaxed">
              {isEs
                ? "Cada estudio de caso está estructurado con el marco de Richard Rumelt de 'Buena Estrategia, Mala Estrategia' — el mismo enfoque utilizado por líderes militares, CEOs de Fortune 500, y ahora líderes de FQHCs navegando la mayor crisis de financiamiento en la historia de los centros de salud comunitarios."
                : "Every case study is structured with Richard Rumelt's 'Good Strategy, Bad Strategy' framework — the same approach used by military leaders, Fortune 500 CEOs, and now FQHC leaders navigating the largest funding crisis in community health center history."}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {/* Step 1: Diagnose */}
            <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/50 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Target className="size-5 text-red-600" />
                <h3 className="font-bold text-red-800 text-sm uppercase tracking-wider">
                  {isEs ? "1. Diagnosticar" : "1. Diagnose"}
                </h3>
              </div>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {isEs
                  ? "Identificar el problema real — no los síntomas. Rumelt dice que la mayoría de las 'estrategias' fracasan porque nunca diagnostican correctamente. Cada estudio de caso comienza con el diagnóstico específico."
                  : "Identify the real problem — not the symptoms. Rumelt says most 'strategies' fail because they never diagnose correctly. Each case study starts with the specific structural diagnosis."}
              </p>
            </div>

            {/* Step 2: Guiding Policy */}
            <div className="rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-950/50 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="size-5 text-teal-600" />
                <h3 className="font-bold text-teal-800 text-sm uppercase tracking-wider">
                  {isEs ? "2. Política Guía" : "2. Guiding Policy"}
                </h3>
              </div>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {isEs
                  ? "El enfoque general — no una lista de deseos ni objetivos vagos. Una política guía es una decisión sobre qué hacer y qué no hacer. Canaliza la energía hacia una dirección clara."
                  : "The overall approach — not a wish list or vague goals. A guiding policy is a decision about what to do and what not to do. It channels energy toward a clear direction."}
              </p>
            </div>

            {/* Step 3: Coherent Actions */}
            <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/50 p-5">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="size-5 text-amber-600" />
                <h3 className="font-bold text-amber-800 text-sm uppercase tracking-wider">
                  {isEs ? "3. Acciones Coherentes" : "3. Coherent Actions"}
                </h3>
              </div>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {isEs
                  ? "Pasos específicos que se refuerzan mutuamente. 'Coherentes' significa que trabajan juntos — no son iniciativas aisladas. Los resultados medidos validan el enfoque."
                  : "Specific steps that reinforce each other. 'Coherent' means they work together — not isolated initiatives. Measured outcomes validate the approach."}
              </p>
            </div>
          </div>

          <div className="mt-8 mx-auto max-w-3xl">
            <div className="rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-4">
              <p className="text-xs text-stone-500 leading-relaxed text-center">
                <span className="font-semibold text-stone-700 dark:text-stone-300">
                  {isEs ? "¿Por qué Rumelt?" : "Why Rumelt?"}
                </span>{" "}
                {isEs
                  ? "Porque 'mala estrategia' no es simplemente la ausencia de buena estrategia — es una enfermedad activa. Lenguaje esponjoso, metas sin acciones, incapacidad de enfrentar el problema real. Los FQHCs no pueden permitirse mala estrategia cuando H.R. 1 amenaza $4.6B en financiamiento."
                  : "Because 'bad strategy' isn't merely the absence of good strategy — it's an active disease. Fluffy language, goals without actions, failure to face the real problem. FQHCs can't afford bad strategy when H.R. 1 threatens $4.6B in funding."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Case Studies */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex items-center gap-2 mb-6">
            <Filter className="size-4 text-stone-500" />
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveCategory("all")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  activeCategory === "all"
                    ? "bg-stone-800 text-white"
                    : "bg-stone-100 text-stone-500 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
                }`}
              >
                {isEs ? "Todos" : "All"} ({counts.total})
              </button>
              {STRATEGY_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    activeCategory === cat.id
                      ? "bg-stone-800 text-white"
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
                  }`}
                >
                  {isEs ? cat.es : cat.en}
                </button>
              ))}
            </div>
          </div>

          {/* Case study cards */}
          <div className="space-y-4">
            {filtered.map((cs) => (
              <CaseStudyCard
                key={cs.id}
                cs={cs}
                locale={locale}
                isEs={isEs}
                isExpanded={expandedIds.has(cs.id)}
                onToggle={() => toggle(cs.id)}
                read={reads.get(cs.id)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-stone-500">
              {isEs
                ? "No hay estudios de caso en esta categoria."
                : "No case studies in this category."}
            </div>
          )}

          {/* Back to strategy */}
          <div className="mt-10 flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/strategy/okrs">
                {isEs ? "Plantillas OKR" : "OKR Templates"}{" "}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/funding-impact">
                {isEs ? "Impacto Financiero" : "Funding Impact"}{" "}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Related Content */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RelatedContent items={STRATEGY_RELATED["guides"]} />
      </section>

      {/* Newsletter Signup */}
      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <NewsletterSignup
          variant="card"
          defaultAudience="intel-brief"
          heading={{
            en: "Weekly Executive Briefing",
            es: "Informe Ejecutivo Semanal",
          }}
          subheading={{
            en: "Policy analysis, funding alerts, and case study highlights \u2014 delivered every Tuesday.",
            es: "An\u00e1lisis de pol\u00edticas, alertas de financiamiento y estudios de caso \u2014 cada martes.",
          }}
        />
      </section>
    </div>
  );
}
