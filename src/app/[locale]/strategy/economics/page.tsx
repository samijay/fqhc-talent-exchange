"use client";

import { useState } from "react";
import {
  DollarSign,
  Pill,
  Building2,
  Target,
  Shield,
  Users,
  HeartPulse,
  FileText,
  Scale,
  ShieldCheck,
  ChevronDown,
  GraduationCap,
  Briefcase,
  Lightbulb,
  ExternalLink,
} from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  economicsConcepts,
  domainMeta,
  levelMeta,
  ECONOMICS_LAST_UPDATED,
  type EconomicsDomain,
  type EconomicsLevel,
} from "@/lib/healthcare-economics";

/* ------------------------------------------------------------------ */
/*  Icon map                                                           */
/* ------------------------------------------------------------------ */

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  DollarSign,
  Pill,
  Building2,
  Target,
  Shield,
  Users,
  HeartPulse,
  FileText,
  Scale,
  ShieldCheck,
};

/* ------------------------------------------------------------------ */
/*  Helper                                                             */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  Concept Card                                                       */
/* ------------------------------------------------------------------ */

function ConceptCard({
  concept,
  activeLevel,
  locale,
}: {
  concept: (typeof economicsConcepts)[0];
  activeLevel: EconomicsLevel;
  locale: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const isEs = locale === "es";
  const Icon = iconMap[concept.icon] || DollarSign;
  const domain = domainMeta[concept.domain];

  const levelColors: Record<EconomicsLevel, string> = {
    beginner: "border-teal-200 bg-teal-50/50",
    practitioner: "border-amber-200 bg-amber-50/50",
    executive: "border-rose-200 bg-rose-50/50",
  };

  return (
    <div className={`rounded-xl border-2 ${levelColors[activeLevel]} overflow-hidden transition-all`}>
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-start gap-3 p-5 text-left"
      >
        <div className="mt-0.5 rounded-lg bg-white p-2 shadow-sm">
          <Icon className="size-5 text-stone-700" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-semibold text-stone-900">
              {t(concept.title, locale)}
            </h3>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full bg-${domain.color}-100 text-${domain.color}-700`}>
              {t(domain.label, locale)}
            </span>
          </div>
          {concept.keyMetric && (
            <div className="mt-1 flex items-center gap-1.5">
              <span className="text-xs text-stone-500">{concept.keyMetric.label}:</span>
              <span className="text-xs font-semibold text-stone-900">{concept.keyMetric.value}</span>
            </div>
          )}
        </div>
        <ChevronDown
          className={`size-5 shrink-0 text-stone-400 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-stone-200/60 px-5 pb-5">
          {/* Level content */}
          <div className="mt-4">
            <p className="text-sm leading-relaxed text-stone-700 whitespace-pre-line">
              {t(concept.levels[activeLevel], locale)}
            </p>
          </div>

          {/* FQHC Context */}
          <div className="mt-4 rounded-lg bg-white/80 border border-stone-200/60 p-3">
            <p className="text-xs font-semibold text-teal-700 mb-1">
              {isEs ? "Contexto FQHC" : "FQHC Context"}
            </p>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t(concept.fqhcContext, locale)}
            </p>
          </div>

          {/* Source */}
          <div className="mt-3 flex items-center gap-1">
            <ExternalLink className="size-3 text-stone-400" />
            <a
              href={concept.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-teal-700 hover:underline"
            >
              {concept.sourceOrg}
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

export default function HealthcareEconomicsPage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const [activeLevel, setActiveLevel] = useState<EconomicsLevel>("beginner");
  const [activeDomain, setActiveDomain] = useState<EconomicsDomain | "all">("all");

  const filteredConcepts =
    activeDomain === "all"
      ? economicsConcepts
      : economicsConcepts.filter((c) => c.domain === activeDomain);

  const domains = Object.entries(domainMeta) as [EconomicsDomain, (typeof domainMeta)[EconomicsDomain]][];

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              {isEs ? "Guía Estratégica" : "Strategy Guide"}
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {isEs
                ? "Economía de Salud para FQHCs"
                : "Healthcare Economics for FQHCs"}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-300">
              {isEs
                ? "Cada concepto explicado a 3 niveles — de nuevo empleado a ejecutivo. Comparta con su equipo."
                : "Every concept explained at 3 levels — from new hire to executive. Share with your team."}
            </p>
            <p className="mt-2 text-xs text-stone-500">
              {isEs ? "Actualizado" : "Updated"}: {ECONOMICS_LAST_UPDATED}
            </p>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 rounded-xl bg-white/5 p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-400">{economicsConcepts.length}</p>
              <p className="text-xs text-stone-400">{isEs ? "Conceptos" : "Concepts"}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-400">3</p>
              <p className="text-xs text-stone-400">{isEs ? "Niveles" : "Levels"}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-400">{domains.length}</p>
              <p className="text-xs text-stone-400">{isEs ? "Dominios" : "Domains"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Level Toggle */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-stone-500 mb-3">
            {isEs ? "Seleccione nivel de detalle:" : "Select detail level:"}
          </h2>
          <div className="flex flex-wrap gap-3">
            {(Object.entries(levelMeta) as [EconomicsLevel, (typeof levelMeta)[EconomicsLevel]][]).map(
              ([level, meta]) => {
                const active = activeLevel === level;
                const icons: Record<EconomicsLevel, React.ComponentType<{ className?: string }>> = {
                  beginner: Lightbulb,
                  practitioner: Briefcase,
                  executive: GraduationCap,
                };
                const LevelIcon = icons[level];
                return (
                  <button
                    key={level}
                    onClick={() => setActiveLevel(level)}
                    className={`flex items-center gap-2 rounded-lg border-2 px-4 py-3 text-left transition-all ${
                      active
                        ? level === "beginner"
                          ? "border-teal-500 bg-teal-50 ring-1 ring-teal-500/20"
                          : level === "practitioner"
                          ? "border-amber-500 bg-amber-50 ring-1 ring-amber-500/20"
                          : "border-rose-500 bg-rose-50 ring-1 ring-rose-500/20"
                        : "border-stone-200 bg-white hover:border-stone-300"
                    }`}
                  >
                    <LevelIcon className={`size-5 ${active ? "text-stone-900" : "text-stone-400"}`} />
                    <div>
                      <p className={`text-sm font-semibold ${active ? "text-stone-900" : "text-stone-600"}`}>
                        {t(meta.label, locale)}
                      </p>
                      <p className="text-xs text-stone-500">{t(meta.subtitle, locale)}</p>
                    </div>
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Domain filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveDomain("all")}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              activeDomain === "all"
                ? "bg-stone-900 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            {isEs ? "Todos" : "All"}
          </button>
          {domains.map(([domain, meta]) => (
            <button
              key={domain}
              onClick={() => setActiveDomain(domain)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeDomain === domain
                  ? "bg-stone-900 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {t(meta.label, locale)}
            </button>
          ))}
        </div>

        {/* Concepts grid */}
        <div className="space-y-4">
          {filteredConcepts.map((concept) => (
            <ConceptCard
              key={concept.id}
              concept={concept}
              activeLevel={activeLevel}
              locale={locale}
            />
          ))}
        </div>

        {/* How to use section */}
        <div className="mt-16 rounded-xl bg-stone-900 p-8 text-white">
          <h2 className="text-xl font-bold">
            {isEs ? "Cómo compartir con su equipo" : "How to share with your team"}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-white/5 p-4">
              <Lightbulb className="size-5 text-teal-400 mb-2" />
              <h3 className="text-sm font-semibold text-teal-300">
                {isEs ? "Nuevos Empleados" : "New Hires"}
              </h3>
              <p className="mt-1 text-xs text-stone-400 leading-relaxed">
                {isEs
                  ? "Use el nivel Fundamentos durante la incorporación. Combine con FOGLAMP para contextualizar las cifras financieras del FQHC."
                  : "Use the Foundation level during onboarding. Combine with FOGLAMP to contextualize the FQHC's financial figures."}
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-4">
              <Briefcase className="size-5 text-amber-400 mb-2" />
              <h3 className="text-sm font-semibold text-amber-300">
                {isEs ? "Personal Operacional" : "Operational Staff"}
              </h3>
              <p className="mt-1 text-xs text-stone-400 leading-relaxed">
                {isEs
                  ? "Use el nivel Operacional para capacitación trimestral. El personal que entiende la economía documenta mejor y captura más ingresos."
                  : "Use the Operational level for quarterly training. Staff who understand the economics document better and capture more revenue."}
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-4">
              <GraduationCap className="size-5 text-rose-400 mb-2" />
              <h3 className="text-sm font-semibold text-rose-300">
                {isEs ? "Junta Directiva / Ejecutivos" : "Board / Executives"}
              </h3>
              <p className="mt-1 text-xs text-stone-400 leading-relaxed">
                {isEs
                  ? "Use el nivel Estratégico para presentaciones de junta y planificación anual. Los escenarios y modelado financiero apoyan decisiones de inversión."
                  : "Use the Strategic level for board presentations and annual planning. The scenarios and financial modeling support investment decisions."}
              </p>
            </div>
          </div>
        </div>

        {/* Related content */}
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link
            href="/strategy/guides"
            className="rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-800 transition-colors"
          >
            {isEs ? "Ver Guías Ejecutivas →" : "View Executive Guides →"}
          </Link>
          <Link
            href="/strategy/frameworks"
            className="rounded-lg border border-stone-300 px-5 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
          >
            {isEs ? "Marcos de Ejecución →" : "Execution Frameworks →"}
          </Link>
          <Link
            href="/strategy/okrs"
            className="rounded-lg border border-stone-300 px-5 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
          >
            {isEs ? "Plantillas OKR →" : "OKR Templates →"}
          </Link>
        </div>
      </section>
    </main>
  );
}
