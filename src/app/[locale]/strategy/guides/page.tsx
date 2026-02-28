// Executive Guides — Real FQHC case studies with Rumelt strategic framework
"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  BookOpen,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Target,
  Lightbulb,
  CheckCircle2,
  BarChart3,
  ExternalLink,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CASE_STUDIES,
  STRATEGY_CATEGORIES,
  getCaseStudyCounts,
  type StrategyCategory,
  type FQHCCaseStudy,
} from "@/lib/fqhc-case-studies";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  Case Study Card                                                    */
/* ------------------------------------------------------------------ */

function CaseStudyCard({
  cs,
  locale,
  isEs,
  isExpanded,
  onToggle,
}: {
  cs: FQHCCaseStudy;
  locale: string;
  isEs: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const catMeta = STRATEGY_CATEGORIES.find((c) => c.id === cs.strategyCategory);

  return (
    <div className="rounded-2xl border border-stone-200 bg-white transition-shadow hover:shadow-md overflow-hidden">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full text-left p-6 pb-4"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {catMeta && (
                <Badge variant="secondary" className="bg-teal-50 text-teal-700 text-xs">
                  {isEs ? catMeta.es : catMeta.en}
                </Badge>
              )}
              <span className="text-xs text-stone-400">{cs.location}</span>
            </div>
            <h3 className="text-lg font-bold text-stone-900">{cs.fqhcName}</h3>
            <p className="mt-1 text-sm text-stone-500 line-clamp-2">
              {t(cs.challenge, locale)}
            </p>
          </div>
          <div className="flex-shrink-0 mt-1 text-stone-400">
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
              className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-700"
            >
              <BarChart3 className="size-3 text-teal-600" />
              {o.value}
            </span>
          ))}
        </div>
      </button>

      {/* Expanded — Rumelt framework */}
      {isExpanded && (
        <div className="border-t border-stone-100 px-6 pb-6 pt-4 space-y-5">
          {/* Diagnose the Problem */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="size-4 text-red-600" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-red-700">
                {isEs ? "Diagnosticar el Problema" : "Diagnose the Problem"}
              </h4>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed">
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
            <p className="text-sm text-stone-600 leading-relaxed">
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
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[10px] font-bold text-amber-700">
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
                  className="rounded-lg border border-green-100 bg-green-50 p-3"
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
          <div className="flex items-center justify-between border-t border-stone-100 pt-3">
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

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered =
    activeCategory === "all"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((cs) => cs.strategyCategory === activeCategory);

  const counts = getCaseStudyCounts();

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
            {isEs ? "Guias Ejecutivas" : "Executive Guides"}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-300">
            {isEs
              ? "Estudios de caso reales de FQHCs, estructurados con el marco de 'Buena Estrategia' de Rumelt: Diagnosticar → Politica Guia → Acciones Coherentes."
              : "Real FQHC case studies, structured with Rumelt's 'Good Strategy' framework: Diagnose → Guiding Policy → Coherent Actions."}
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm text-stone-400">
            <span>
              {counts.total} {isEs ? "estudios de caso" : "case studies"}
            </span>
            <span className="text-stone-600">·</span>
            <span>
              {Object.keys(counts).length - 1} {isEs ? "categorias" : "categories"}
            </span>
            <span className="text-stone-600">·</span>
            <span>{isEs ? "Fuentes primarias verificadas" : "Verified primary sources"}</span>
          </div>
        </div>
      </section>

      {/* Filters + Case Studies */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex items-center gap-2 mb-6">
            <Filter className="size-4 text-stone-400" />
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveCategory("all")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  activeCategory === "all"
                    ? "bg-stone-800 text-white"
                    : "bg-stone-100 text-stone-500 hover:bg-stone-200"
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
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200"
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
    </div>
  );
}
