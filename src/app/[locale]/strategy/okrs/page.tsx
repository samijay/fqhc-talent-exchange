// OKR Templates — Crisis change management for FQHCs
"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Crosshair,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Filter,
  Users,
  Clock,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  OKR_TEMPLATES,
  OKR_DOMAINS,
  DIFFICULTY_LABELS,
  getOKRCounts,
  type OKRDomain,
  type OKRTemplate,
} from "@/lib/fqhc-okr-templates";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  OKR Card                                                           */
/* ------------------------------------------------------------------ */

function OKRCard({
  okr,
  locale,
  isEs,
  isExpanded,
  onToggle,
}: {
  okr: OKRTemplate;
  locale: string;
  isEs: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const domainMeta = OKR_DOMAINS.find((d) => d.id === okr.domain);
  const diffMeta = DIFFICULTY_LABELS[okr.difficulty];

  return (
    <div className="rounded-2xl border border-stone-200 bg-white transition-shadow hover:shadow-md overflow-hidden">
      <button onClick={onToggle} className="w-full text-left p-6 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {domainMeta && (
                <Badge
                  variant="secondary"
                  className="bg-teal-50 text-teal-700 text-xs"
                >
                  {isEs ? domainMeta.es : domainMeta.en}
                </Badge>
              )}
              <Badge
                variant="secondary"
                className={`text-xs ${diffMeta.color}`}
              >
                {isEs ? diffMeta.es : diffMeta.en}
              </Badge>
              <span className="text-xs text-stone-400 flex items-center gap-1">
                <Clock className="size-3" />
                {okr.timeframe === "quarterly"
                  ? isEs
                    ? "Trimestral"
                    : "Quarterly"
                  : isEs
                    ? "Anual"
                    : "Annual"}
              </span>
            </div>
            <h3 className="text-lg font-bold text-stone-900 leading-snug">
              <span className="text-teal-700 mr-1.5">O:</span>
              {t(okr.objective, locale)}
            </h3>
            {!isExpanded && (
              <p className="mt-1 text-sm text-stone-500 line-clamp-2">
                {t(okr.context, locale)}
              </p>
            )}
          </div>
          <div className="flex-shrink-0 mt-1 text-stone-400">
            {isExpanded ? (
              <ChevronUp className="size-5" />
            ) : (
              <ChevronDown className="size-5" />
            )}
          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-2 flex items-center gap-3 text-xs text-stone-400">
          <span>
            {okr.keyResults.length} {isEs ? "KRs" : "Key Results"}
          </span>
          <span className="text-stone-300">·</span>
          <span>
            {[
              ...new Set(
                okr.keyResults.flatMap((kr) => kr.departmentsInvolved)
              ),
            ].length}{" "}
            {isEs ? "departamentos" : "departments"}
          </span>
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-stone-100 px-6 pb-6 pt-4 space-y-4">
          {/* Context */}
          <p className="text-sm text-stone-600 leading-relaxed">
            {t(okr.context, locale)}
          </p>

          {/* Key Results */}
          <div className="space-y-3">
            {okr.keyResults.map((kr, i) => (
              <div
                key={i}
                className="rounded-xl border border-stone-100 bg-stone-50 p-4"
              >
                <div className="flex items-start gap-2">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-stone-800">
                      <span className="text-teal-700 mr-1">KR{i + 1}:</span>
                      {t(kr.kr, locale)}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-xs bg-white border border-stone-200 text-stone-600 px-2 py-0.5 rounded-full">
                        {isEs ? "Metrica" : "Metric"}: {kr.metric}
                      </span>
                      <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full font-medium">
                        {isEs ? "Meta" : "Target"}: {kr.target}
                      </span>
                    </div>
                    {/* Departments */}
                    <div className="mt-2 flex items-center gap-1.5">
                      <Users className="size-3 text-stone-400" />
                      <div className="flex flex-wrap gap-1">
                        {kr.departmentsInvolved.map((dept) => (
                          <span
                            key={dept}
                            className="text-[10px] bg-stone-200 text-stone-600 px-1.5 py-0.5 rounded"
                          >
                            {dept}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Related links */}
          <div className="flex items-center gap-3 border-t border-stone-100 pt-3">
            {okr.relatedCaseStudyId && (
              <Link
                href="/strategy/guides"
                className="text-xs bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full hover:bg-teal-100 transition-colors"
              >
                {isEs ? "Ver Caso Relacionado" : "Related Case Study"} →
              </Link>
            )}
            {okr.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {okr.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  OKR Templates Page                                                 */
/* ================================================================== */

export default function OKRTemplatesPage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [activeDomain, setActiveDomain] = useState<OKRDomain | "all">("all");
  const [activeDifficulty, setActiveDifficulty] = useState<
    "all" | "starter" | "intermediate" | "advanced"
  >("all");

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = OKR_TEMPLATES.filter(
    (okr) =>
      (activeDomain === "all" || okr.domain === activeDomain) &&
      (activeDifficulty === "all" || okr.difficulty === activeDifficulty)
  );

  const counts = getOKRCounts();

  return (
    <div className="bg-stone-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Crosshair className="size-5 text-purple-400" />
            <span className="text-sm font-medium uppercase tracking-wider text-purple-400">
              {isEs ? "Gestion del Cambio" : "Change Management"}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {isEs ? "Plantillas OKR" : "OKR Templates"}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-300">
            {isEs
              ? "Objetivos y Resultados Clave disenados para romper silos entre departamentos y conectar estrategia con resultados medibles."
              : "Objectives & Key Results designed to break down silos between departments and connect strategy to measurable outcomes."}
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm text-stone-400">
            <span>
              {counts.total} {isEs ? "plantillas" : "templates"}
            </span>
            <span className="text-stone-600">·</span>
            <span>
              {Object.keys(counts).length - 1} {isEs ? "dominios" : "domains"}
            </span>
            <span className="text-stone-600">·</span>
            <span>
              3 {isEs ? "niveles de dificultad" : "difficulty levels"}
            </span>
          </div>
        </div>
      </section>

      {/* Filters + OKRs */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Domain filter */}
          <div className="flex items-center gap-2 mb-4">
            <Filter className="size-4 text-stone-400" />
            <span className="text-xs font-medium text-stone-500 uppercase">
              {isEs ? "Dominio" : "Domain"}:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveDomain("all")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  activeDomain === "all"
                    ? "bg-stone-800 text-white"
                    : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                }`}
              >
                {isEs ? "Todos" : "All"} ({counts.total})
              </button>
              {OKR_DOMAINS.map((dom) => (
                <button
                  key={dom.id}
                  onClick={() => setActiveDomain(dom.id)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    activeDomain === dom.id
                      ? "bg-stone-800 text-white"
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                  }`}
                >
                  {isEs ? dom.es : dom.en}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty filter */}
          <div className="flex items-center gap-2 mb-6">
            <Target className="size-4 text-stone-400" />
            <span className="text-xs font-medium text-stone-500 uppercase">
              {isEs ? "Dificultad" : "Difficulty"}:
            </span>
            <div className="flex gap-1.5">
              {(
                ["all", "starter", "intermediate", "advanced"] as const
              ).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setActiveDifficulty(diff)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    activeDifficulty === diff
                      ? "bg-stone-800 text-white"
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                  }`}
                >
                  {diff === "all"
                    ? isEs
                      ? "Todos"
                      : "All"
                    : isEs
                      ? DIFFICULTY_LABELS[diff].es
                      : DIFFICULTY_LABELS[diff].en}
                </button>
              ))}
            </div>
          </div>

          {/* OKR cards */}
          <div className="space-y-4">
            {filtered.map((okr) => (
              <OKRCard
                key={okr.id}
                okr={okr}
                locale={locale}
                isEs={isEs}
                isExpanded={expandedIds.has(okr.id)}
                onToggle={() => toggle(okr.id)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-stone-500">
              {isEs
                ? "No hay plantillas que coincidan con los filtros."
                : "No templates match your filters."}
            </div>
          )}

          {/* Related links */}
          <div className="mt-10 flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/strategy/guides">
                {isEs ? "Guias Ejecutivas" : "Executive Guides"}{" "}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/strategy/case-studies">
                {isEs ? "Estudios de Caso" : "Case Studies"}{" "}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
