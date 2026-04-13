// Workforce Resilience & Retention Hub — The unified retention intelligence page
"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/ui/design-system";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  ExternalLink,
  Calculator,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Heart,
  Monitor,
  GraduationCap,
  BarChart3,
  Clock,
  Info,
  BookOpen,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  WORKFORCE_RESILIENCE_LAST_UPDATED,
  PILLAR_META,
  RETENTION_STRATEGIES,
  TURNOVER_COST_ROLES,
  RETENTION_BENCHMARKS,
  HERO_STATS,
  getStrategiesByPillar,
  getDifficultyMeta,
  getStrategyCounts,
  getRelatedContent,
  type RetentionPillar,
  type RetentionStrategy,
} from "@/lib/workforce-resilience-hub";
import { t } from "@/lib/i18n-helpers";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const pillarIcon = (icon: string) => {
  switch (icon) {
    case "TrendingUp": return TrendingUp;
    case "DollarSign": return DollarSign;
    case "Heart": return Heart;
    case "Users": return Users;
    case "Monitor": return Monitor;
    case "GraduationCap": return GraduationCap;
    default: return Target;
  }
};

const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });

/* ------------------------------------------------------------------ */
/*  Turnover Cost Calculator                                           */
/* ------------------------------------------------------------------ */

function TurnoverCostCalculator({ locale, isEs }: { locale: string; isEs: boolean }) {
  const [orgSize, setOrgSize] = useState(85);
  const [turnoverRate, setTurnoverRate] = useState(32);
  const [targetRate, setTargetRate] = useState(15);

  // Simple role distribution based on org size
  const roleDistribution = useMemo(() => {
    const f = orgSize / 85; // scale factor from baseline
    return {
      chw: Math.round(8 * f),
      ma: Math.round(15 * f),
      rn: Math.round(10 * f),
      provider: Math.round(8 * f),
      "bh-therapist": Math.round(6 * f),
      psychiatrist: Math.round(1 * f),
      billing: Math.round(8 * f),
      "care-coord": Math.round(6 * f),
      "rcm-analyst": Math.round(3 * f),
      cmo: Math.round(1 * f),
    };
  }, [orgSize]);

  const result = useMemo(() => {
    const roleBreakdown = TURNOVER_COST_ROLES.map((role) => {
      const count = roleDistribution[role.id as keyof typeof roleDistribution] || 0;
      const departures = Math.round(count * (turnoverRate / 100));
      const cost = departures * role.replacementCost;
      return { role, count, departures, cost };
    }).filter((r) => r.count > 0);

    const annualCost = roleBreakdown.reduce((sum, r) => sum + r.cost, 0);

    const savingsBreakdown = TURNOVER_COST_ROLES.map((role) => {
      const count = roleDistribution[role.id as keyof typeof roleDistribution] || 0;
      const currentDepartures = Math.round(count * (turnoverRate / 100));
      const targetDepartures = Math.round(count * (targetRate / 100));
      return (currentDepartures - targetDepartures) * role.replacementCost;
    });
    const annualSavings = savingsBreakdown.reduce((sum, s) => sum + s, 0);

    return { roleBreakdown, annualCost, annualSavings };
  }, [roleDistribution, turnoverRate, targetRate]);

  return (
    <div className="rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 px-6 py-5 text-white">
        <div className="flex items-center gap-2 mb-1">
          <Calculator className="size-5 text-teal-400" />
          <h3 className="text-lg font-bold">
            {isEs ? "Calculadora de Costo de Rotación" : "Turnover Cost Calculator"}
          </h3>
        </div>
        <p className="text-sm text-stone-500">
          {isEs
            ? "Modelo su costo anual de rotación y ahorros potenciales con mejoras en retención"
            : "Model your annual turnover cost and potential savings from retention improvements"}
        </p>
      </div>

      <div className="p-6">
        {/* Sliders */}
        <div className="space-y-6 mb-8">
          {/* Org Size */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-stone-700">
                {isEs ? "Tamaño de la organización" : "Organization Size"}
              </label>
              <span className="text-sm font-bold text-stone-800 dark:text-stone-200">{orgSize} {isEs ? "empleados" : "staff"}</span>
            </div>
            <input
              type="range"
              min={20}
              max={500}
              step={5}
              value={orgSize}
              onChange={(e) => setOrgSize(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-stone-200 to-teal-200 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-stone-800 [&::-webkit-slider-thumb]:shadow-md"
            />
            <div className="flex justify-between text-xs text-stone-500 dark:text-stone-400 mt-1">
              <span>20</span>
              <span>{isEs ? "FQHC mediano" : "Mid-size FQHC"}</span>
              <span>500</span>
            </div>
          </div>

          {/* Current Turnover Rate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-stone-700">
                {isEs ? "Tasa de rotación actual" : "Current Turnover Rate"}
              </label>
              <span className={`text-sm font-bold ${turnoverRate > 25 ? "text-red-600" : turnoverRate > 15 ? "text-amber-600" : "text-teal-600"}`}>
                {turnoverRate}%
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={50}
              step={1}
              value={turnoverRate}
              onChange={(e) => setTurnoverRate(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-teal-200 via-amber-200 to-red-300 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-stone-800 [&::-webkit-slider-thumb]:shadow-md"
            />
            <div className="flex justify-between text-xs text-stone-500 dark:text-stone-400 mt-1">
              <span>5% ({isEs ? "excelente" : "excellent"})</span>
              <span>{isEs ? "Promedio FQHC: 32%" : "FQHC avg: 32%"}</span>
              <span>50%</span>
            </div>
          </div>

          {/* Target Turnover Rate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-stone-700">
                {isEs ? "Tasa objetivo" : "Target Turnover Rate"}
              </label>
              <span className="text-sm font-bold text-teal-600">{targetRate}%</span>
            </div>
            <input
              type="range"
              min={5}
              max={turnoverRate}
              step={1}
              value={Math.min(targetRate, turnoverRate)}
              onChange={(e) => setTargetRate(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-teal-300 to-teal-100 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-stone-800 [&::-webkit-slider-thumb]:shadow-md"
            />
            <div className="flex justify-between text-xs text-stone-500 dark:text-stone-400 mt-1">
              <span>5%</span>
              <span>{isEs ? "Mejores: 12-15%" : "Top performers: 12-15%"}</span>
              <span>{turnoverRate}%</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingDown className="size-5 text-red-600" />
              <span className="text-sm font-medium text-stone-700">
                {isEs ? "Costo Anual de Rotación" : "Annual Turnover Cost"}
              </span>
            </div>
            <span className="text-2xl font-bold text-red-700">
              ${fmt(result.annualCost)}
            </span>
          </div>

          {/* Top-3 cost drivers */}
          <div className="space-y-1.5">
            {result.roleBreakdown
              .sort((a, b) => b.cost - a.cost)
              .slice(0, 4)
              .map((item) => (
                <div key={item.role.id} className="flex items-center justify-between text-sm">
                  <span className="text-stone-600">
                    {t(item.role.role, locale)} ({item.departures} {isEs ? "salidas" : "departures"})
                  </span>
                  <span className="font-medium text-red-700">
                    ${fmt(item.cost)}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Savings */}
        <div className="rounded-xl border border-teal-200 bg-teal-50 p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-5 text-teal-600" />
              <span className="text-sm font-medium text-stone-700">
                {isEs ? "Ahorros Anuales Potenciales" : "Potential Annual Savings"}
              </span>
            </div>
            <span className="text-2xl font-bold text-teal-700">
              ${fmt(result.annualSavings)}
            </span>
          </div>
          <p className="text-xs text-teal-600">
            {isEs
              ? `Reduciendo la rotación de ${turnoverRate}% a ${targetRate}%`
              : `By reducing turnover from ${turnoverRate}% to ${targetRate}%`}
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 flex items-start gap-2 text-xs text-stone-500">
          <Info className="size-3.5 mt-0.5 flex-shrink-0" />
          <p>
            {isEs
              ? "Basado en la fórmula SHRM de costo de reemplazo (0.5-2.0x del salario según el nivel del rol). Los salarios usan promedios de California 2024."
              : "Based on SHRM replacement cost formula (0.5-2.0x salary by role level). Salaries use 2024 California averages."}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Strategy Card                                                      */
/* ------------------------------------------------------------------ */

function StrategyCard({
  strategy,
  locale,
  isEs,
  isExpanded,
  onToggle,
}: {
  strategy: RetentionStrategy;
  locale: string;
  isEs: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const diffMeta = getDifficultyMeta(strategy.difficulty);

  return (
    <div className="rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 transition-shadow hover:shadow-md overflow-hidden">
      {/* Header — always visible */}
      <button onClick={onToggle} className="w-full text-left p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              {diffMeta && (
                <Badge variant="outline" className={`text-xs border ${diffMeta.color}`}>
                  {isEs ? diffMeta.es : diffMeta.en}
                </Badge>
              )}
              <span className="inline-flex items-center gap-1 text-xs text-stone-500">
                <Clock className="size-3" />
                {strategy.timeToImpact}
              </span>
            </div>
            <h4 className="text-base font-bold text-stone-900 dark:text-stone-100">
              {t(strategy.title, locale)}
            </h4>
          </div>
          <div className="flex-shrink-0 mt-1 text-stone-500">
            {isExpanded ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
          </div>
        </div>

        {/* Evidence stat — always visible */}
        <div className="mt-2">
          <span className="inline-flex items-start gap-1.5 rounded-lg bg-amber-50 border border-amber-100 px-3 py-1.5 text-xs font-medium text-amber-800">
            <BarChart3 className="size-3 mt-0.5 flex-shrink-0" />
            <span>{t(strategy.evidenceStat, locale)}</span>
          </span>
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-stone-100 px-5 pb-5 pt-4 space-y-4">
          {/* Description */}
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            {t(strategy.description, locale)}
          </p>

          {/* Primary Source */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="size-4 text-stone-500" />
              <h5 className="text-xs font-bold uppercase tracking-wider text-stone-600">
                {isEs ? "Fuente Primaria" : "Primary Source"}
              </h5>
            </div>
            <a
              href={strategy.primarySource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700 transition-colors hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              <ExternalLink className="size-3" />
              {strategy.primarySource.label}
            </a>
          </div>

          {/* Cross-links */}
          {strategy.crossLinks.length > 0 && (
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                {isEs ? "Recursos Relacionados" : "Related Resources"}
              </h5>
              <div className="flex flex-wrap gap-2">
                {strategy.crossLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href as "/jobs"}
                    className="inline-flex items-center gap-1 rounded-md bg-teal-50 dark:bg-teal-950 border border-teal-100 px-3 py-1.5 text-xs font-medium text-teal-700 transition-colors hover:bg-teal-100"
                  >
                    <ArrowRight className="size-3" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function WorkforceResiliencePage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const [expandedPillar, setExpandedPillar] = useState<RetentionPillar | null>("career-ladders");
  const [expandedStrategy, setExpandedStrategy] = useState<string | null>(null);
  const strategyCounts = getStrategyCounts();
  const relatedContent = getRelatedContent();

  return (
    <div className="bg-white">
      <PageHero
        variant="dark"
        title={{
          en: "Workforce Resilience & Retention Hub",
          es: "Centro de Resiliencia y Retención de la Fuerza Laboral",
        }}
        subtitle={{
          en: "Turnover is destroying FQHC budgets. This hub unifies 22 evidence-based retention strategies, a turnover cost calculator, and retention benchmarks — all in one place.",
          es: "El costo de la rotación está destruyendo los presupuestos de los FQHC. Esta guía unifica 22 estrategias basadas en evidencia, un calculador de costos de rotación y benchmarks de retención — todo en un solo lugar.",
        }}
        stats={HERO_STATS.map((stat) => ({
          value: stat.value,
          label: t(stat.label, locale),
        }))}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* ── Turnover Cost Calculator ────────────────────────── */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
              {isEs ? "¿Cuánto le cuesta la rotación?" : "What Is Turnover Costing You?"}
            </h2>
            <p className="mt-2 text-sm text-stone-500 max-w-2xl mx-auto">
              {isEs
                ? "Ajuste los controles para modelar el costo de rotación de su organización. La fórmula SHRM estima que reemplazar un empleado cuesta entre 50% y 200% de su salario anual."
                : "Adjust the sliders to model your organization's turnover cost. The SHRM formula estimates replacing an employee costs 50%-200% of their annual salary."}
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <TurnoverCostCalculator locale={locale} isEs={isEs} />
          </div>
        </section>

        {/* ── 6 Retention Pillars ─────────────────────────────── */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
              {isEs ? "6 Pilares de Retención" : "6 Retention Pillars"}
            </h2>
            <p className="mt-2 text-sm text-stone-500 max-w-2xl mx-auto">
              {isEs
                ? "22 estrategias basadas en evidencia organizadas en 6 pilares. Cada una tiene una fuente primaria, nivel de dificultad y tiempo estimado de impacto."
                : "22 evidence-based strategies organized into 6 pillars. Each includes a primary source, difficulty level, and estimated time to impact."}
            </p>
          </div>

          {/* Pillar Accordion */}
          <div className="space-y-4">
            {PILLAR_META.map((pillar) => {
              const Icon = pillarIcon(pillar.icon);
              const isOpen = expandedPillar === pillar.id;
              const strategies = getStrategiesByPillar(pillar.id);

              return (
                <div key={pillar.id} className="rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 overflow-hidden">
                  {/* Pillar Header */}
                  <button
                    onClick={() => setExpandedPillar(isOpen ? null : pillar.id)}
                    className="w-full text-left px-6 py-5 flex items-center gap-4"
                  >
                    <div className={`flex size-12 items-center justify-center rounded-xl ${pillar.color}`}>
                      <Icon className="size-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                          {isEs ? pillar.es : pillar.en}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {strategyCounts[pillar.id]} {isEs ? "estrategias" : "strategies"}
                        </Badge>
                      </div>
                      <p className="mt-0.5 text-sm text-stone-500">
                        {t(pillar.description, locale)}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-stone-500">
                      {isOpen ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
                    </div>
                  </button>

                  {/* Strategies */}
                  {isOpen && (
                    <div className="border-t border-stone-100 bg-stone-50/50 px-6 py-5">
                      <div className="space-y-3">
                        {strategies.map((strategy) => (
                          <StrategyCard
                            key={strategy.id}
                            strategy={strategy}
                            locale={locale}
                            isEs={isEs}
                            isExpanded={expandedStrategy === strategy.id}
                            onToggle={() =>
                              setExpandedStrategy(
                                expandedStrategy === strategy.id ? null : strategy.id
                              )
                            }
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Retention Benchmarks Table ──────────────────────── */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
              {isEs ? "Benchmarks de Retención" : "Retention Benchmarks"}
            </h2>
            <p className="mt-2 text-sm text-stone-500 max-w-2xl mx-auto">
              {isEs
                ? "¿Cómo se compara su FQHC con los promedios de la industria y los mejores desempeños?"
                : "How does your FQHC compare to industry averages and top performers?"}
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-stone-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-900 text-white">
                  <th className="px-4 py-3 text-left font-semibold">
                    {isEs ? "Métrica" : "Metric"}
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">
                    {isEs ? "Promedio FQHC" : "FQHC Average"}
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">
                    {isEs ? "Mejores" : "Top Performers"}
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">
                    {isEs ? "Hospitales" : "Hospitals"}
                  </th>
                  <th className="hidden px-4 py-3 text-center font-semibold sm:table-cell">
                    {isEs ? "Fuente" : "Source"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {RETENTION_BENCHMARKS.map((benchmark, idx) => (
                  <tr
                    key={benchmark.id}
                    className={`border-t border-stone-100 ${idx % 2 === 0 ? "bg-white" : "bg-stone-50"}`}
                  >
                    <td className="px-4 py-3 font-medium text-stone-900 dark:text-stone-100">
                      {t(benchmark.metric, locale)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        benchmark.direction === "lower-is-better"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {benchmark.fqhcAverage}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-block rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-bold text-teal-700">
                        {benchmark.topPerformers}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-block rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-bold text-stone-600">
                        {benchmark.hospitalComparison}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 text-center sm:table-cell">
                      <a
                        href={benchmark.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-teal-600 hover:text-teal-700"
                      >
                        <ExternalLink className="size-3" />
                        {benchmark.source.label.length > 35
                          ? benchmark.source.label.slice(0, 35) + "..."
                          : benchmark.source.label}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Related Content Grid ────────────────────────────── */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
              {isEs ? "Explorar Contenido Relacionado" : "Explore Related Content"}
            </h2>
            <p className="mt-2 text-sm text-stone-500 max-w-2xl mx-auto">
              {isEs
                ? "Todo nuestro contenido de retención en un solo lugar — herramientas, estrategia, datos y aprendizaje."
                : "All our retention-touching content in one place — tools, strategy, data, and learning."}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedContent.map((item) => (
              <Link
                key={item.href}
                href={item.href as "/jobs"}
                className="group rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-5 transition-all hover:border-teal-300 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-700 group-hover:bg-teal-100">
                    <ArrowRight className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="outline" className="mb-1 text-xs">
                      {item.type}
                    </Badge>
                    <h4 className="font-semibold text-stone-900 group-hover:text-teal-700">
                      {t(item.title, locale)}
                    </h4>
                    <p className="mt-1 text-xs text-stone-500">
                      {t(item.description, locale)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Cross-Nav ──────────────────────────────────────── */}
        <section className="mb-16 rounded-2xl border border-stone-200 bg-gradient-to-r from-stone-50 to-teal-50 p-8">
          <h2 className="text-xl font-bold text-stone-900 mb-4">
            {isEs ? "Próximos Pasos" : "Next Steps"}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                href: "/strategy/resilience",
                label: isEs ? "Evaluar su Resiliencia" : "Assess Your Resilience",
                desc: isEs ? "Tarjeta de puntaje de 220 FQHCs" : "220 FQHC scorecard",
              },
              {
                href: "/strategy/case-studies",
                label: isEs ? "Leer Estudios de Caso" : "Read Case Studies",
                desc: isEs ? "Transformaciones reales de FQHC" : "Real FQHC transformations",
              },
              {
                href: "/strategy/okrs",
                label: isEs ? "Plantillas OKR de Retención" : "Retention OKR Templates",
                desc: isEs ? "Plantillas de cambio" : "Change management templates",
              },
              {
                href: "/career-roadmap",
                label: isEs ? "Mapa de Carrera" : "Career Roadmap",
                desc: isEs ? "Comparta con su equipo" : "Share with your team",
              },
              {
                href: "/salary-data",
                label: isEs ? "Benchmarks Salariales" : "Salary Benchmarks",
                desc: isEs ? "30 roles × 9 regiones" : "30 roles × 9 regions",
              },
              {
                href: "/strategy/masterclass",
                label: isEs ? "Masterclass Ejecutiva" : "Executive Masterclass",
                desc: isEs ? "Módulos sobre retención" : "Retention deep-dive modules",
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href as "/jobs"}
                className="flex items-center gap-3 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-4 py-3 transition-all hover:border-teal-300 hover:shadow-sm"
              >
                <ArrowRight className="size-4 text-teal-600 flex-shrink-0" />
                <div>
                  <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">{link.label}</span>
                  <span className="block text-xs text-stone-500">{link.desc}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Newsletter + Sources ──────────────────────────── */}
        <section className="mb-12">
          <div className="max-w-xl mx-auto">
            <NewsletterSignup
              variant="card"
              defaultAudience="intel-brief"
              showAudienceToggle={true}
            />
          </div>
        </section>

        {/* ── Last Updated + Disclaimer ──────────────────────── */}
        <div className="border-t border-stone-200 pt-6 text-center">
          <p className="text-xs text-stone-500">
            {isEs ? "Última actualización" : "Last updated"}: {WORKFORCE_RESILIENCE_LAST_UPDATED} ·{" "}
            {RETENTION_STRATEGIES.length} {isEs ? "estrategias" : "strategies"} ·{" "}
            {RETENTION_BENCHMARKS.length} {isEs ? "benchmarks" : "benchmarks"} ·{" "}
            {TURNOVER_COST_ROLES.length} {isEs ? "roles en el modelo de costos" : "roles in cost model"}
          </p>
          <p className="mt-2 text-xs text-stone-500 max-w-2xl mx-auto">
            {isEs
              ? "Todas las estadísticas provienen de fuentes primarias (NACHC, HRSA, SHRM, BLS, NSI, AHRQ). Los modelos de costos son estimaciones basadas en promedios de la industria. Los resultados reales varían por organización."
              : "All statistics sourced from primary sources (NACHC, HRSA, SHRM, BLS, NSI, AHRQ). Cost models are estimates based on industry averages. Actual results vary by organization."}
          </p>
        </div>
      </div>
    </div>
  );
}
