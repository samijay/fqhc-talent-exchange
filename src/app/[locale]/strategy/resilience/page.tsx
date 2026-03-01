// FQHC Resilience Scorecard — Diagnostic tool for FQHC executives
"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  ArrowUpDown,
  BarChart3,
  Building2,
  ChevronDown,
  ExternalLink,
  Search,
  Shield,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  RESILIENCE_LAST_UPDATED,
  DIMENSION_META,
  getAllResilienceScores,
  getResilienceStats,
  type ResilienceScore,
  type ResilienceDimension,
} from "@/lib/fqhc-resilience";
import { regions } from "@/lib/california-fqhcs";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

function gradeColor(grade: string): string {
  switch (grade) {
    case "A": return "bg-green-100 text-green-800 border-green-200";
    case "B": return "bg-teal-100 text-teal-800 border-teal-200";
    case "C": return "bg-amber-100 text-amber-800 border-amber-200";
    case "D": return "bg-orange-100 text-orange-800 border-orange-200";
    case "F": return "bg-red-100 text-red-800 border-red-200";
    default: return "bg-stone-100 text-stone-800 border-stone-200";
  }
}

function riskColor(risk: string): string {
  switch (risk) {
    case "low": return "text-green-700";
    case "moderate": return "text-amber-700";
    case "high": return "text-orange-700";
    case "critical": return "text-red-700";
    default: return "text-stone-700";
  }
}

function riskLabel(risk: string, isEs: boolean): string {
  const labels: Record<string, { en: string; es: string }> = {
    low: { en: "Low Risk", es: "Riesgo Bajo" },
    moderate: { en: "Moderate Risk", es: "Riesgo Moderado" },
    high: { en: "High Risk", es: "Riesgo Alto" },
    critical: { en: "Critical Risk", es: "Riesgo Crítico" },
  };
  return isEs ? labels[risk]?.es || risk : labels[risk]?.en || risk;
}

/* ------------------------------------------------------------------ */
/*  Score Bar Component                                                */
/* ------------------------------------------------------------------ */

function ScoreBar({ score, color }: { score: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 flex-1 rounded-full bg-stone-100 overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs font-medium text-stone-500 w-8 text-right">{score}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FQHC Detail Card                                                   */
/* ------------------------------------------------------------------ */

function FQHCDetailCard({
  score,
  locale,
  isExpanded,
  onToggle,
}: {
  score: ResilienceScore;
  locale: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const isEs = locale === "es";

  return (
    <div className="rounded-xl border border-stone-200 bg-white transition-all hover:shadow-sm">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        {/* Grade Badge */}
        <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg border text-lg font-extrabold ${gradeColor(score.grade)}`}>
          {score.grade}
        </div>

        {/* Name + Region */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-stone-900 truncate">
            {score.name}
          </h3>
          <p className="text-xs text-stone-500">{score.region}</p>
        </div>

        {/* Overall Score */}
        <div className="hidden sm:flex flex-col items-end shrink-0">
          <span className="text-lg font-bold text-stone-900">{score.overall}</span>
          <span className={`text-xs font-medium ${riskColor(score.riskLevel)}`}>
            {riskLabel(score.riskLevel, isEs)}
          </span>
        </div>

        {/* Dimension mini-bars (hidden on mobile) */}
        <div className="hidden md:flex gap-0.5 shrink-0">
          {score.dimensions.map((dim) => {
            const meta = DIMENSION_META.find((m) => m.id === dim.dimension);
            return (
              <div
                key={dim.dimension}
                className="w-1.5 rounded-full bg-stone-100 overflow-hidden"
                style={{ height: "32px" }}
                title={`${t(dim.label, locale)}: ${dim.score}`}
              >
                <div
                  className={`w-full rounded-full ${meta?.color || "bg-stone-400"}`}
                  style={{ height: `${dim.score}%`, marginTop: `${100 - dim.score}%` }}
                />
              </div>
            );
          })}
        </div>

        <ChevronDown
          className={`size-4 shrink-0 text-stone-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>

      {isExpanded && (
        <div className="border-t border-stone-100 px-4 pb-4 pt-3 space-y-4">
          {/* Mobile overall score */}
          <div className="flex items-center justify-between sm:hidden">
            <span className="text-sm font-medium text-stone-600">
              {isEs ? "Puntuación General" : "Overall Score"}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-stone-900">{score.overall}/100</span>
              <span className={`text-xs font-medium ${riskColor(score.riskLevel)}`}>
                {riskLabel(score.riskLevel, isEs)}
              </span>
            </div>
          </div>

          {/* Dimension Breakdown */}
          <div className="space-y-3">
            {score.dimensions.map((dim) => {
              const meta = DIMENSION_META.find((m) => m.id === dim.dimension);
              return (
                <div key={dim.dimension}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-stone-700">
                      {t(dim.label, locale)}
                    </span>
                    <span className="text-xs font-bold text-stone-900">{dim.score}/100</span>
                  </div>
                  <ScoreBar score={dim.score} color={meta?.color || "bg-stone-400"} />
                  <ul className="mt-1 space-y-0.5">
                    {dim.factors.map((f, i) => (
                      <li key={i} className="text-xs text-stone-400 pl-1">
                        • {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Data completeness */}
          <div className="flex items-center justify-between text-xs text-stone-400 border-t border-stone-100 pt-3">
            <span>
              {isEs ? "Completitud de datos:" : "Data completeness:"} {score.dataCompleteness}%
            </span>
            <Link
              href={`/directory/${score.slug}`}
              className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-900 font-medium"
            >
              {isEs ? "Ver perfil" : "View profile"}
              <ExternalLink className="size-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

type SortField = "overall" | "name" | "region" | ResilienceDimension;

export default function ResiliencePage() {
  const locale = useLocale();
  const isEs = locale === "es";

  const allScores = useMemo(() => getAllResilienceScores(), []);
  const stats = useMemo(() => getResilienceStats(), []);

  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [gradeFilter, setGradeFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("overall");
  const [sortAsc, setSortAsc] = useState(false);
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [showCount, setShowCount] = useState(25);

  // Filter & sort
  const filtered = useMemo(() => {
    let results = allScores;

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.region.toLowerCase().includes(q),
      );
    }

    if (regionFilter !== "all") {
      results = results.filter((s) => s.region === regionFilter);
    }

    if (gradeFilter !== "all") {
      results = results.filter((s) => s.grade === gradeFilter);
    }

    // Sort
    results = [...results].sort((a, b) => {
      let aVal: number | string;
      let bVal: number | string;

      if (sortField === "overall") {
        aVal = a.overall;
        bVal = b.overall;
      } else if (sortField === "name") {
        aVal = a.name;
        bVal = b.name;
      } else if (sortField === "region") {
        aVal = a.region;
        bVal = b.region;
      } else {
        // dimension sort
        aVal = a.dimensions.find((d) => d.dimension === sortField)?.score || 0;
        bVal = b.dimensions.find((d) => d.dimension === sortField)?.score || 0;
      }

      if (typeof aVal === "string") {
        return sortAsc
          ? aVal.localeCompare(bVal as string)
          : (bVal as string).localeCompare(aVal);
      }
      return sortAsc ? aVal - (bVal as number) : (bVal as number) - aVal;
    });

    return results;
  }, [allScores, search, regionFilter, gradeFilter, sortField, sortAsc]);

  const displayed = filtered.slice(0, showCount);

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  }

  return (
    <main className="min-h-screen bg-stone-50">
      {/* ============================================================ */}
      {/*  Hero                                                        */}
      {/* ============================================================ */}
      <section className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 size-72 rounded-full bg-teal-500 blur-3xl" />
          <div className="absolute bottom-10 left-10 size-56 rounded-full bg-amber-500 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Badge className="bg-teal-900/50 text-teal-300 border-teal-700 mb-4">
            <BarChart3 className="mr-1.5 size-3.5" />
            {isEs ? "Inteligencia Estratégica" : "Strategic Intelligence"}
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {isEs
              ? "Tarjeta de Resiliencia de FQHCs"
              : "FQHC Resilience Scorecard"}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-300 leading-relaxed">
            {isEs
              ? "Cada FQHC de California evaluado en 5 dimensiones de resiliencia. Vea cómo se compara su organización — y dónde concentrar los esfuerzos de fortalecimiento."
              : "Every California FQHC scored across 5 resilience dimensions. See how your organization compares — and where to focus strengthening efforts."}
          </p>
          <p className="mt-4 text-sm text-stone-400">
            {isEs ? "Datos actualizados:" : "Data updated:"}{" "}
            {RESILIENCE_LAST_UPDATED} ·{" "}
            {isEs ? `${stats.total} FQHCs evaluados` : `${stats.total} FQHCs scored`}
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Stats Bar                                                   */}
      {/* ============================================================ */}
      <section className="bg-teal-700 text-white py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5 text-center">
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-teal-200">
                {isEs ? "FQHCs Evaluados" : "FQHCs Scored"}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.averageScore}</p>
              <p className="text-sm text-teal-200">
                {isEs ? "Puntaje Promedio" : "Average Score"}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-300">{stats.gradeDistribution.A + stats.gradeDistribution.B}</p>
              <p className="text-sm text-teal-200">
                {isEs ? "Grado A o B" : "Grade A or B"}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-300">{stats.riskDistribution.high + stats.riskDistribution.critical}</p>
              <p className="text-sm text-teal-200">
                {isEs ? "Riesgo Alto/Crítico" : "High/Critical Risk"}
              </p>
            </div>
            <div className="hidden sm:block">
              <p className="text-2xl font-bold">5</p>
              <p className="text-sm text-teal-200">
                {isEs ? "Dimensiones" : "Dimensions"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Methodology                                                 */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-stone-900 sm:text-2xl">
            {isEs ? "Cinco Dimensiones de Resiliencia" : "Five Resilience Dimensions"}
          </h2>
          <p className="mt-2 text-sm text-stone-600 max-w-xl mx-auto">
            {isEs
              ? "Cada FQHC es evaluado usando datos de HRSA, Glassdoor, WARN Act, y nuestro directorio de 220 organizaciones."
              : "Each FQHC is scored using data from HRSA, Glassdoor, WARN Act, and our directory of 220 organizations."}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {DIMENSION_META.map((dim) => (
            <button
              key={dim.id}
              onClick={() => handleSort(dim.id)}
              className="rounded-xl border border-stone-200 bg-white p-4 text-left hover:border-teal-300 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`size-3 rounded-full ${dim.color}`} />
                <span className="text-xs text-stone-400 font-medium">
                  {Math.round(dim.weight * 100)}%
                </span>
              </div>
              <h3 className="text-sm font-bold text-stone-900">
                {isEs ? dim.es : dim.en}
              </h3>
              <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                {t(dim.description, locale)}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Grade Distribution                                          */}
      {/* ============================================================ */}
      <section className="bg-white border-y border-stone-200">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4">
            {isEs ? "Distribución de Grados" : "Grade Distribution"}
          </h3>
          <div className="flex gap-2 h-8">
            {(["A", "B", "C", "D", "F"] as const).map((grade) => {
              const count = stats.gradeDistribution[grade];
              const pct = (count / stats.total) * 100;
              return (
                <button
                  key={grade}
                  onClick={() => setGradeFilter(gradeFilter === grade ? "all" : grade)}
                  className={`rounded transition-all flex items-center justify-center text-xs font-bold ${gradeColor(grade)} ${
                    gradeFilter === grade ? "ring-2 ring-teal-500" : ""
                  }`}
                  style={{ width: `${Math.max(pct, 5)}%` }}
                  title={`Grade ${grade}: ${count} FQHCs (${Math.round(pct)}%)`}
                >
                  {count > 0 && `${grade} (${count})`}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Search + Filter + Results                                   */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isEs ? "Buscar FQHC por nombre o región..." : "Search FQHC by name or region..."}
              className="w-full rounded-lg border border-stone-200 bg-white pl-10 pr-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-700 focus:border-teal-500 focus:outline-none"
          >
            <option value="all">{isEs ? "Todas las regiones" : "All regions"}</option>
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <button
            onClick={() => handleSort("overall")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-700 hover:bg-stone-50"
          >
            <ArrowUpDown className="size-3.5" />
            {isEs ? "Ordenar" : "Sort"}
          </button>
        </div>

        {/* Results count */}
        <p className="text-sm text-stone-500 mb-4">
          {isEs
            ? `Mostrando ${displayed.length} de ${filtered.length} FQHCs`
            : `Showing ${displayed.length} of ${filtered.length} FQHCs`}
          {gradeFilter !== "all" && (
            <button
              onClick={() => setGradeFilter("all")}
              className="ml-2 text-teal-700 hover:text-teal-900"
            >
              {isEs ? "(limpiar filtro)" : "(clear filter)"}
            </button>
          )}
        </p>

        {/* FQHC List */}
        <div className="space-y-2">
          {displayed.map((score) => (
            <FQHCDetailCard
              key={score.slug}
              score={score}
              locale={locale}
              isExpanded={expandedSlug === score.slug}
              onToggle={() =>
                setExpandedSlug(expandedSlug === score.slug ? null : score.slug)
              }
            />
          ))}
        </div>

        {/* Load More */}
        {showCount < filtered.length && (
          <div className="text-center mt-6">
            <Button
              variant="outline"
              onClick={() => setShowCount((c) => c + 25)}
            >
              {isEs
                ? `Mostrar más (${filtered.length - showCount} restantes)`
                : `Show more (${filtered.length - showCount} remaining)`}
            </Button>
          </div>
        )}
      </section>

      {/* ============================================================ */}
      {/*  CTA                                                         */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {isEs
              ? "¿Puntuación Baja? Tenemos las Herramientas para Mejorarla."
              : "Low Score? We Have the Tools to Improve It."}
          </h2>
          <p className="mt-3 text-stone-300 max-w-xl mx-auto">
            {isEs
              ? "Nuestras guías ejecutivas, plantillas OKR y estudios de caso muestran cómo FQHCs reales han fortalecido su resiliencia."
              : "Our executive guides, OKR templates, and case studies show how real FQHCs have strengthened their resilience."}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-500 text-white">
              <Link href="/strategy/guides">
                <TrendingUp className="mr-2 size-4" />
                {isEs ? "Guías Ejecutivas" : "Executive Guides"}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-stone-500 text-white hover:bg-stone-700"
            >
              <Link href="/strategy/okrs">
                <ArrowRight className="mr-2 size-4" />
                {isEs ? "Plantillas OKR" : "OKR Templates"}
              </Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-stone-400">
            <Link href="/strategy/offboarding" className="hover:text-white transition-colors">
              {isEs ? "Kit de Transición" : "Transition Toolkit"} →
            </Link>
            <Link href="/funding-impact" className="hover:text-white transition-colors">
              {isEs ? "Impacto de H.R. 1" : "H.R. 1 Impact"} →
            </Link>
            <Link href="/insights" className="hover:text-white transition-colors">
              {isEs ? "Panel de Inteligencia" : "Intelligence Dashboard"} →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
