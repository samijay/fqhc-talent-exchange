"use client";

import { useState } from "react";
import {
  RefreshCw,
  Compass,
  Users,
  Cog,
  BarChart3,
  ClipboardCheck,
  ChevronDown,
  ExternalLink,
  ArrowUpCircle,
  UserCheck,
  ArrowRightLeft,
  Grid3x3,
  LayoutGrid,
  RotateCcw,
  Star,
  Lightbulb,
  Gauge,
  RefreshCcw,
  Zap,
  Search,
  Cpu,
  Share2,
} from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  executionFrameworks,
  categoryMeta,
  shareableLevelMeta,
  FRAMEWORKS_LAST_UPDATED,
  type FrameworkCategory,
} from "@/lib/execution-frameworks";

/* ------------------------------------------------------------------ */
/*  Icon map                                                           */
/* ------------------------------------------------------------------ */

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  RefreshCw,
  Compass,
  Users,
  Cog,
  BarChart3,
  ClipboardCheck,
  ArrowUpCircle,
  UserCheck,
  ArrowRightLeft,
  Grid3x3,
  LayoutGrid,
  RotateCcw,
  Star,
  Lightbulb,
  Gauge,
  RefreshCcw,
  Zap,
  Search,
  Cpu,
};

/* ------------------------------------------------------------------ */
/*  Helper                                                             */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  Framework Card                                                     */
/* ------------------------------------------------------------------ */

function FrameworkCard({
  framework,
  locale,
}: {
  framework: (typeof executionFrameworks)[0];
  locale: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const isEs = locale === "es";
  const Icon = iconMap[framework.icon] || Compass;
  const catMeta = categoryMeta[framework.category];
  const audienceMeta = shareableLevelMeta[framework.shareableLevel];

  return (
    <div className="rounded-xl border border-stone-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-start gap-3 p-5 text-left"
      >
        <div className="mt-0.5 rounded-lg bg-stone-100 p-2.5">
          <Icon className="size-5 text-stone-700" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-semibold text-stone-900">
              {t(framework.name, locale)}
            </h3>
          </div>
          <p className="mt-0.5 text-xs text-stone-500">{framework.author}</p>
          <p className="mt-1.5 text-sm text-stone-600 leading-relaxed">
            {t(framework.tagline, locale)}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
              {t(catMeta.label, locale)}
            </span>
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                framework.shareableLevel === "all-staff"
                  ? "bg-teal-100 text-teal-700"
                  : framework.shareableLevel === "managers"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              <Share2 className="inline size-2.5 mr-0.5 -mt-0.5" />
              {t(audienceMeta.label, locale)}
            </span>
          </div>
        </div>
        <ChevronDown
          className={`size-5 shrink-0 text-stone-400 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-stone-100 px-5 pb-5">
          {/* Description */}
          <p className="mt-4 text-sm text-stone-600 leading-relaxed">
            {t(framework.description, locale)}
          </p>

          {/* Steps */}
          <div className="mt-4 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              {isEs ? "Pasos" : "Steps"}
            </p>
            {framework.steps.map((step, i) => (
              <div key={i} className="rounded-lg bg-stone-50 p-3">
                <div className="flex items-start gap-2">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-stone-200 text-[10px] font-bold text-stone-600">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-stone-900">
                      {t(step.name, locale)}
                    </p>
                    <p className="mt-0.5 text-xs text-stone-600 leading-relaxed">
                      {t(step.description, locale)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FQHC Application */}
          <div className="mt-4 rounded-lg bg-teal-50 border border-teal-200/60 p-3">
            <p className="text-xs font-semibold text-teal-700 mb-1">
              {isEs ? "Aplicación en FQHCs" : "FQHC Application"}
            </p>
            <p className="text-xs text-stone-700 leading-relaxed">
              {t(framework.fqhcApplication, locale)}
            </p>
          </div>

          {/* When to Use */}
          <div className="mt-3 rounded-lg bg-amber-50 border border-amber-200/60 p-3">
            <p className="text-xs font-semibold text-amber-700 mb-1">
              {isEs ? "Cuándo usar" : "When to use"}
            </p>
            <p className="text-xs text-stone-700 leading-relaxed">
              {t(framework.whenToUse, locale)}
            </p>
          </div>

          {/* Source */}
          <div className="mt-3 flex items-center gap-1">
            <ExternalLink className="size-3 text-stone-400" />
            <a
              href={framework.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-teal-700 hover:underline"
            >
              {framework.sourceOrg}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function ExecutionFrameworksPage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const [activeCategory, setActiveCategory] = useState<FrameworkCategory | "all">("all");
  const [activeAudience, setActiveAudience] = useState<"all" | "all-staff" | "managers" | "executives">("all");

  let filtered = activeCategory === "all"
    ? executionFrameworks
    : executionFrameworks.filter((f) => f.category === activeCategory);

  if (activeAudience !== "all") {
    if (activeAudience === "all-staff") {
      filtered = filtered.filter((f) => f.shareableLevel === "all-staff");
    } else if (activeAudience === "managers") {
      filtered = filtered.filter((f) => f.shareableLevel !== "executives");
    }
    // executives = show all
  }

  const categories = Object.entries(categoryMeta) as [FrameworkCategory, (typeof categoryMeta)[FrameworkCategory]][];

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              {isEs ? "Herramientas Ejecutivas" : "Executive Tools"}
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {isEs
                ? "Marcos de Ejecución para FQHCs"
                : "Execution Frameworks for FQHCs"}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-300">
              {isEs
                ? "Gestión del cambio, toma de decisiones y excelencia operacional — adaptados para centros de salud comunitarios. Comparta con su equipo."
                : "Change management, decision-making, and operational excellence — adapted for community health centers. Share with your team."}
            </p>
            <p className="mt-2 text-xs text-stone-500">
              {isEs ? "Actualizado" : "Updated"}: {FRAMEWORKS_LAST_UPDATED}
            </p>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 rounded-xl bg-white/5 p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-400">{executionFrameworks.length}</p>
              <p className="text-xs text-stone-400">{isEs ? "Marcos" : "Frameworks"}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-400">{categories.length}</p>
              <p className="text-xs text-stone-400">{isEs ? "Categorías" : "Categories"}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-400">
                {executionFrameworks.filter((f) => f.shareableLevel === "all-staff").length}
              </p>
              <p className="text-xs text-stone-400">{isEs ? "Para Todo el Personal" : "All-Staff Shareable"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Audience filter */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-stone-500 mb-2">
            {isEs ? "Filtrar por audiencia:" : "Filter by audience:"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all" as const, label: isEs ? "Todos" : "All" },
              { key: "all-staff" as const, label: isEs ? "Todo el Personal" : "All Staff" },
              { key: "managers" as const, label: isEs ? "Gerentes +" : "Managers +" },
              { key: "executives" as const, label: isEs ? "Ejecutivos" : "Executives" },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => setActiveAudience(opt.key)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeAudience === opt.key
                    ? "bg-stone-900 text-white"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-teal-700 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            {isEs ? "Todas las categorías" : "All categories"}
          </button>
          {categories.map(([cat, meta]) => {
            const CatIcon = iconMap[meta.icon] || Compass;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-teal-700 text-white"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                <CatIcon className="size-3" />
                {t(meta.label, locale)}
              </button>
            );
          })}
        </div>

        {/* Framework cards */}
        <div className="grid gap-4 lg:grid-cols-2">
          {filtered.map((framework) => (
            <FrameworkCard
              key={framework.id}
              framework={framework}
              locale={locale}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-stone-400 text-sm">
              {isEs ? "No hay marcos que coincidan con estos filtros." : "No frameworks match these filters."}
            </p>
          </div>
        )}

        {/* How to use */}
        <div className="mt-16 rounded-xl bg-stone-900 p-8 text-white">
          <h2 className="text-xl font-bold">
            {isEs ? "Cómo usar estos marcos" : "How to use these frameworks"}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-teal-300">1. {isEs ? "Diagnosticar" : "Diagnose"}</p>
              <p className="mt-1 text-xs text-stone-400">
                {isEs
                  ? "Use Cynefin para entender qué tipo de problema enfrenta"
                  : "Use Cynefin to understand what type of problem you're facing"}
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-amber-300">2. {isEs ? "Evaluar" : "Assess"}</p>
              <p className="mt-1 text-xs text-stone-400">
                {isEs
                  ? "Use la Evaluación de Preparación antes de lanzar"
                  : "Use the Readiness Assessment before launching"}
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-rose-300">3. {isEs ? "Ejecutar" : "Execute"}</p>
              <p className="mt-1 text-xs text-stone-400">
                {isEs
                  ? "Elija Kotter (org-wide) o ADKAR (individual) para gestionar el cambio"
                  : "Choose Kotter (org-wide) or ADKAR (individual) to manage the change"}
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-blue-300">4. {isEs ? "Mejorar" : "Improve"}</p>
              <p className="mt-1 text-xs text-stone-400">
                {isEs
                  ? "Use DMAIC o PDSA para mejora continua basada en datos"
                  : "Use DMAIC or PDSA for data-driven continuous improvement"}
              </p>
            </div>
          </div>
        </div>

        {/* Related content */}
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link
            href="/strategy/economics"
            className="rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-800 transition-colors"
          >
            {isEs ? "Economía de Salud →" : "Healthcare Economics →"}
          </Link>
          <Link
            href="/strategy/okrs"
            className="rounded-lg border border-stone-300 px-5 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
          >
            {isEs ? "Plantillas OKR →" : "OKR Templates →"}
          </Link>
          <Link
            href="/strategy/guides"
            className="rounded-lg border border-stone-300 px-5 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
          >
            {isEs ? "Guías Ejecutivas →" : "Executive Guides →"}
          </Link>
        </div>
      </section>
    </main>
  );
}
