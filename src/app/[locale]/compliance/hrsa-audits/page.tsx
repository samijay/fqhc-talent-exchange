"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Download,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Users,
  FileText,
  ExternalLink,
} from "lucide-react";
import {
  OSV_CHECKLIST,
  OSV_AREA_META,
  COMPLIANCE_CASE_STUDIES,
  getOSVChecklistByArea,
  getComplianceStats,
  type OSVRequirementArea,
} from "@/lib/fqhc-compliance";
import { downloadOSVChecklistAsExcel } from "@/lib/compliance-excel-export";

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

const AREA_ICONS: Record<OSVRequirementArea, typeof Users> = {
  governance: Users,
  clinical: ShieldCheck,
  financial: FileText,
  operational: Clock,
};

const AREA_COLORS: Record<OSVRequirementArea, string> = {
  governance: "border-teal-200 bg-teal-50",
  clinical: "border-blue-200 bg-blue-50",
  financial: "border-amber-200 bg-amber-50",
  operational: "border-purple-200 bg-purple-50",
};

export default function HRSAAuditsPage() {
  const locale = useLocale();
  const stats = getComplianceStats();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [activeArea, setActiveArea] = useState<OSVRequirementArea | null>(null);

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredItems = activeArea ? getOSVChecklistByArea(activeArea) : OSV_CHECKLIST;
  const osvCaseStudies = COMPLIANCE_CASE_STUDIES.filter((cs) => cs.domain === "hrsa-audits");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 text-white py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/compliance" className="text-teal-300 text-sm hover:underline mb-4 inline-block">
            &larr; {locale === "es" ? "Cumplimiento" : "Compliance"}
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {locale === "es"
              ? "Preparación para Visita Operativa de HRSA"
              : "HRSA Operational Site Visit Preparation"}
          </h1>
          <p className="text-teal-200 text-lg max-w-3xl mb-6">
            {locale === "es"
              ? `${stats.osvRequirements} requisitos del programa. ~${stats.totalEstimatedOSVHours} horas estimadas de preparación. Cada 3 años, HRSA audita todo.`
              : `${stats.osvRequirements} program requirements. ~${stats.totalEstimatedOSVHours} estimated preparation hours. Every 3 years, HRSA audits everything.`}
          </p>
          <button
            onClick={() => downloadOSVChecklistAsExcel(locale)}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold px-5 py-2.5 rounded-lg transition-colors"
          >
            <Download className="w-5 h-5" />
            {locale === "es" ? "Descargar Lista de Verificación OSV (Excel)" : "Download OSV Checklist (Excel)"}
          </button>
        </div>
      </section>

      {/* Area filter pills */}
      <section className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 mb-2">
          <button
            onClick={() => setActiveArea(null)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeArea === null ? "bg-teal-700 text-white border-teal-700" : "bg-white text-stone-700 border-stone-300 hover:border-teal-300"
            }`}
          >
            {locale === "es" ? "Todos" : "All"} ({OSV_CHECKLIST.length})
          </button>
          {OSV_AREA_META.map((area) => {
            const count = getOSVChecklistByArea(area.id).length;
            return (
              <button
                key={area.id}
                onClick={() => setActiveArea(area.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  activeArea === area.id ? "bg-teal-700 text-white border-teal-700" : "bg-white text-stone-700 border-stone-300 hover:border-teal-300"
                }`}
              >
                {t({ en: area.en, es: area.es }, locale)} ({count})
              </button>
            );
          })}
        </div>
      </section>

      {/* Requirement Cards */}
      <section className="max-w-5xl mx-auto px-4 pb-8">
        <div className="space-y-3">
          {filteredItems.map((item, idx) => {
            const expanded = expandedIds.has(item.id);
            const AreaIcon = AREA_ICONS[item.area];
            const areaColor = AREA_COLORS[item.area];
            return (
              <div key={item.id} className={`border rounded-xl overflow-hidden ${areaColor}`}>
                {/* Header — always visible */}
                <button
                  onClick={() => toggle(item.id)}
                  aria-expanded={expanded}
                  aria-controls={`osv-content-${item.id}`}
                  className="w-full text-left p-4 flex items-start gap-3"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <AreaIcon className="w-5 h-5 text-stone-500" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-mono text-stone-500">#{idx + 1}</span>
                      <h3 className="font-bold text-stone-900">{t(item.requirement, locale)}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="bg-white/60 px-2 py-0.5 rounded text-stone-600 font-mono">{item.cfr}</span>
                      <span className="bg-white/60 px-2 py-0.5 rounded text-stone-600">{item.responsibleRole}</span>
                      <span className="bg-white/60 px-2 py-0.5 rounded text-stone-600">~{item.estimatedHours}h</span>
                    </div>
                  </div>
                  {expanded ? <ChevronUp className="w-5 h-5 text-stone-400 flex-shrink-0" aria-hidden="true" /> : <ChevronDown className="w-5 h-5 text-stone-400 flex-shrink-0" aria-hidden="true" />}
                </button>

                {/* Expanded content */}
                {expanded && (
                  <div id={`osv-content-${item.id}`} className="px-4 pb-4 pt-0 space-y-4" role="region" aria-label={t(item.requirement, locale)}>
                    <div className="bg-white/70 rounded-lg p-4">
                      <p className="text-sm text-stone-700">{t(item.description, locale)}</p>
                    </div>

                    {/* Evidence needed */}
                    <div>
                      <h4 className="text-sm font-bold text-stone-800 mb-2 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        {locale === "es" ? "Evidencia que HRSA Busca" : "Evidence HRSA Looks For"}
                      </h4>
                      <ul className="space-y-1.5">
                        {item.evidence.map((ev, i) => (
                          <li key={i} className="text-sm text-stone-700 flex items-start gap-2">
                            <span className="text-green-600 mt-0.5">&#10003;</span>
                            {t(ev, locale)}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Common failures */}
                    <div>
                      <h4 className="text-sm font-bold text-stone-800 mb-2 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        {locale === "es" ? "Fallas Comunes" : "Common Failures"}
                      </h4>
                      <ul className="space-y-1.5">
                        {item.commonFailures.map((f, i) => (
                          <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                            <span className="text-red-500 mt-0.5">&#10007;</span>
                            {t(f, locale)}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Source */}
                    <a
                      href={item.primarySourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-teal-700 hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      HRSA Compliance Manual
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Case Studies */}
      {osvCaseStudies.length > 0 && (
        <section className="bg-stone-50 py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">
              {locale === "es" ? "Estudios de Caso de OSV" : "OSV Case Studies"}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {osvCaseStudies.map((cs) => (
                <div key={cs.id} className="bg-white border border-stone-200 rounded-xl p-5">
                  <div className="text-xs text-stone-500 mb-1">{cs.fqhcType} &bull; {cs.location} &bull; {cs.date}</div>
                  <h3 className="font-bold text-stone-900 mb-2">{t(cs.title, locale)}</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold text-red-700">{locale === "es" ? "Desafío: " : "Challenge: "}</span>
                      <span className="text-stone-700">{t(cs.challenge, locale)}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-amber-700">{locale === "es" ? "Causa Raíz: " : "Root Cause: "}</span>
                      <span className="text-stone-700">{t(cs.rootCause, locale)}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-teal-700">{locale === "es" ? "Resolución: " : "Resolution: "}</span>
                      <span className="text-stone-700">{t(cs.resolution, locale)}</span>
                    </div>
                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 mt-2">
                      <span className="font-semibold text-teal-800">{locale === "es" ? "Lección: " : "Lesson: "}</span>
                      <span className="text-teal-700">{t(cs.lesson, locale)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Download CTA */}
      <section className="max-w-5xl mx-auto px-4 py-10 text-center">
        <button
          onClick={() => downloadOSVChecklistAsExcel(locale)}
          className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
        >
          <Download className="w-5 h-5" />
          {locale === "es" ? "Descargar Lista de Verificación OSV Completa (Excel)" : "Download Full OSV Checklist (Excel)"}
        </button>
        <p className="text-sm text-stone-500 mt-2">
          {locale === "es"
            ? "Incluye las 19 requisitos con columnas de rastreo de estado y evidencia"
            : "Includes all 19 requirements with status tracking and evidence columns"}
        </p>
      </section>
    </div>
  );
}
