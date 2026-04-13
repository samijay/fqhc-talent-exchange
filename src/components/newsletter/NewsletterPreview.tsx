// NewsletterPreview — Sample issue preview cards for Intel Brief + The Pulse
// Shows what subscribers will actually receive so they can "see before they buy"
"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import {
  Eye,
  X,
  TrendingUp,
  Briefcase,
  Users,
  Calendar,
  FileText,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */


/* ------------------------------------------------------------------ */
/*  Static preview data (from Issue #2)                                */
/* ------------------------------------------------------------------ */

const INTEL_PREVIEW = {
  issueLabel: "Intel Brief #2 · March 20, 2026",
  topStories: [
    {
      badge: "CRITICAL" as const,
      headline: "STAT News: FQHCs' Greatest Threat Isn't Funding Cuts — It's Structural Insolvency",
      source: "STAT News",
    },
    {
      badge: "HIGH" as const,
      headline: "SB 1422: Bill to Reverse Medi-Cal Enrollment Freeze for Undocumented Adults",
      source: "CalMatters",
    },
    {
      badge: "HIGH" as const,
      headline: "LA County: $1B/Year Health Tax on June 2 Ballot",
      source: "KFF Health News",
    },
  ],
  keyDate: "Jun 2, 2026 — LA County health sales tax on primary ballot (~$1B/year)",
  sections: ["Policy & Legislative", "Funding & Financial", "Workforce & Layoffs", "AI & Technology", "Key Dates"],
};

const PULSE_PREVIEW = {
  issueLabel: "The Pulse #2 · March 20, 2026",
  jobStats: { total: "1,674", newThisWeek: "+22" },
  topFQHCs: [
    { name: "AltaMed Health Services", count: 270 },
    { name: "La Clinica de la Raza", count: 187 },
    { name: "Family Health Centers of San Diego", count: 145 },
  ],
  tipTitle: "Revenue-Generating Roles Are the Most Secure in 2026",
  toolSpotlight: "FQHC Resume Builder — Now with Provider Templates",
};

/* ------------------------------------------------------------------ */
/*  Badge component for impact levels                                  */
/* ------------------------------------------------------------------ */

function ImpactBadge({ level }: { level: "CRITICAL" | "HIGH" | "MEDIUM" }) {
  const styles = {
    CRITICAL: "bg-red-100 text-red-700 border-red-200",
    HIGH: "bg-amber-50 text-amber-700 border-amber-200",
    MEDIUM: "bg-stone-100 text-stone-500 border-stone-200",
  };
  return (
    <span className={`inline-block text-[10px] font-bold tracking-wide px-1.5 py-0.5 rounded border ${styles[level]}`}>
      {level}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Intel Brief Mini Preview                                           */
/* ------------------------------------------------------------------ */

function IntelBriefPreview({ locale }: { locale: string }) {
  const isEs = locale === "es";
  return (
    <div className="space-y-3">
      {/* Issue badge */}
      <div className="flex items-center gap-2">
        <span className="inline-block bg-stone-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide">
          {INTEL_PREVIEW.issueLabel}
        </span>
      </div>

      {/* Executive Summary teaser */}
      <div className="bg-teal-50 border-l-3 border-teal-600 rounded-r-lg px-3 py-2.5">
        <p className="text-[10px] font-bold text-teal-700 uppercase tracking-wider mb-1">
          {isEs ? "Resumen Ejecutivo" : "Executive Summary"}
        </p>
        <p className="text-xs text-stone-700 leading-relaxed line-clamp-2">
          The structural case against FQHC survival just got louder. STAT News argues the real threat isn&apos;t H.R. 1 — it&apos;s that FQHCs have been structurally insolvent since 2024...
        </p>
      </div>

      {/* Top stories */}
      <div className="space-y-2">
        <p className="text-[10px] font-bold text-teal-700 uppercase tracking-wider flex items-center gap-1">
          <FileText className="size-3" />
          {isEs ? "Política y Legislación" : "Policy & Legislative"}
        </p>
        {INTEL_PREVIEW.topStories.map((story, i) => (
          <div key={i} className="flex items-start gap-2">
            <ImpactBadge level={story.badge} />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-stone-800 leading-tight line-clamp-1">
                {story.headline}
              </p>
              <p className="text-[10px] text-teal-600 mt-0.5">Source: {story.source} →</p>
            </div>
          </div>
        ))}
      </div>

      {/* Key date sample */}
      <div className="flex items-center gap-2">
        <span className="inline-block bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-semibold px-1.5 py-0.5 rounded">
          <Calendar className="size-2.5 inline mr-0.5" />
          Jun 2
        </span>
        <span className="text-[10px] text-stone-500 line-clamp-1">
          LA County health sales tax on primary ballot
        </span>
      </div>

      {/* Section list */}
      <div className="flex flex-wrap gap-1">
        {INTEL_PREVIEW.sections.map((section) => (
          <span key={section} className="text-[9px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded">
            {section}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  The Pulse Mini Preview                                             */
/* ------------------------------------------------------------------ */

function PulsePreview({ locale }: { locale: string }) {
  const isEs = locale === "es";
  return (
    <div className="space-y-3">
      {/* Issue badge */}
      <div className="flex items-center gap-2">
        <span className="inline-block bg-teal-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide">
          {PULSE_PREVIEW.issueLabel}
        </span>
      </div>

      {/* Job stats */}
      <div className="bg-stone-100 rounded-lg p-3">
        <div className="flex items-center justify-around text-center">
          <div>
            <p className="text-xl font-extrabold text-teal-700">{PULSE_PREVIEW.jobStats.total}</p>
            <p className="text-[10px] text-stone-500">{isEs ? "Empleos" : "Total Jobs"}</p>
          </div>
          <div className="h-8 w-px bg-stone-200" />
          <div>
            <p className="text-xl font-extrabold text-green-600">{PULSE_PREVIEW.jobStats.newThisWeek}</p>
            <p className="text-[10px] text-stone-500">{isEs ? "Nuevos" : "New This Week"}</p>
          </div>
        </div>
      </div>

      {/* Top hiring */}
      <div>
        <p className="text-[10px] font-bold text-teal-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
          <TrendingUp className="size-3" />
          {isEs ? "Más Contrataciones" : "Top Hiring FQHCs"}
        </p>
        {PULSE_PREVIEW.topFQHCs.map((fqhc) => (
          <div key={fqhc.name} className="flex items-center justify-between py-1">
            <span className="text-xs text-teal-700 font-medium">{fqhc.name}</span>
            <span className="text-[10px] text-stone-500">{fqhc.count} open</span>
          </div>
        ))}
      </div>

      {/* Tool spotlight teaser */}
      <div className="bg-teal-50 border border-teal-200 rounded-lg px-3 py-2">
        <p className="text-[10px] font-bold text-teal-700 uppercase tracking-wider mb-0.5">
          {isEs ? "Herramienta Gratuita" : "Free Tool Spotlight"}
        </p>
        <p className="text-xs text-stone-700 leading-tight">{PULSE_PREVIEW.toolSpotlight}</p>
      </div>

      {/* Career tip teaser */}
      <div className="flex items-start gap-2">
        <span className="text-[10px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded">💡</span>
        <p className="text-xs text-stone-600 line-clamp-1">{PULSE_PREVIEW.tipTitle}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function NewsletterPreview() {
  const locale = useLocale();
  const isEs = locale === "es";
  const [expanded, setExpanded] = useState<"intel" | "pulse" | null>(null);

  return (
    <div className="mt-8">
      <div className="text-center mb-4">
        <p className="text-sm font-bold text-stone-900 flex items-center justify-center gap-1.5">
          <Eye className="size-4 text-teal-600" />
          {isEs ? "Vista previa de un número real" : "See what you'll actually get"}
        </p>
        <p className="text-xs text-stone-500 mt-0.5">
          {isEs
            ? "Haz clic para previsualizar un número reciente"
            : "Click to preview a recent issue"}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {/* Intel Brief Preview Card */}
        <button
          type="button"
          onClick={() => setExpanded(expanded === "intel" ? null : "intel")}
          className={`text-left rounded-xl border bg-white transition-all hover:shadow-md ${
            expanded === "intel"
              ? "border-stone-400 shadow-md"
              : "border-stone-200 hover:border-stone-300"
          }`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-stone-900">
                  <Briefcase className="size-3.5 text-white" />
                </div>
                <span className="text-sm font-bold text-stone-900">Intel Brief</span>
              </div>
              <span className="text-[10px] text-stone-500">
                {expanded === "intel" ? (
                  <X className="size-3.5" />
                ) : (
                  <>{isEs ? "Previsualizar →" : "Preview →"}</>
                )}
              </span>
            </div>

            {expanded === "intel" ? (
              <IntelBriefPreview locale={locale} />
            ) : (
              <p className="text-xs text-stone-500 leading-relaxed">
                {isEs
                  ? "Análisis semanal de políticas, financiamiento y tecnología para líderes de FQHCs. Insignias de impacto CRÍTICO/ALTO/MEDIO en cada historia."
                  : "Weekly policy, funding, and tech analysis for FQHC leaders. CRITICAL/HIGH/MEDIUM impact badges on every story."}
              </p>
            )}
          </div>
        </button>

        {/* Pulse Preview Card */}
        <button
          type="button"
          onClick={() => setExpanded(expanded === "pulse" ? null : "pulse")}
          className={`text-left rounded-xl border bg-white transition-all hover:shadow-md ${
            expanded === "pulse"
              ? "border-teal-400 shadow-md"
              : "border-stone-200 hover:border-stone-300"
          }`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-teal-700">
                  <Users className="size-3.5 text-white" />
                </div>
                <span className="text-sm font-bold text-stone-900">The Pulse</span>
              </div>
              <span className="text-[10px] text-stone-500">
                {expanded === "pulse" ? (
                  <X className="size-3.5" />
                ) : (
                  <>{isEs ? "Previsualizar →" : "Preview →"}</>
                )}
              </span>
            </div>

            {expanded === "pulse" ? (
              <PulsePreview locale={locale} />
            ) : (
              <p className="text-xs text-stone-500 leading-relaxed">
                {isEs
                  ? "Estadísticas de empleo, tendencias salariales, herramientas gratuitas y consejos profesionales — cada semana para buscadores de empleo en FQHCs."
                  : "Job stats, salary trends, free tools, and career tips — every week for FQHC job seekers."}
              </p>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
