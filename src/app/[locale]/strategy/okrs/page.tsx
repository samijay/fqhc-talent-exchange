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
  Download,
  Star,
  FileSpreadsheet,
  FileText,
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
import {
  downloadOKRsAsExcel,
  downloadSingleOKRAsExcel,
} from "@/lib/okr-excel-export";
import {
  downloadOKRsAsDocx,
  downloadSingleOKRAsDocx,
} from "@/lib/okr-docx-export";

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
  const [downloading, setDownloading] = useState(false);

  const [downloadingDocx, setDownloadingDocx] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloading(true);
    try {
      await downloadSingleOKRAsExcel(okr, locale);
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadDocx = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloadingDocx(true);
    try {
      await downloadSingleOKRAsDocx(okr, locale);
    } finally {
      setDownloadingDocx(false);
    }
  };

  return (
    <div
      className={`rounded-2xl border bg-white transition-shadow hover:shadow-md overflow-hidden ${
        okr.featured
          ? "border-teal-300 ring-2 ring-teal-100"
          : "border-stone-200"
      }`}
    >
      <button onClick={onToggle} className="w-full text-left p-6 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {okr.featured && (
                <span className="flex items-center gap-1 text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                  <Star className="size-3 fill-teal-600" />
                  {isEs ? "Plantilla Insignia" : "Flagship Template"}
                </span>
              )}
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

          {/* Footer: links + individual download */}
          <div className="flex flex-wrap items-center gap-3 border-t border-stone-100 pt-3">
            {okr.relatedCaseStudyId && (
              <Link
                href="/strategy/guides"
                className="text-xs bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full hover:bg-teal-100 transition-colors"
              >
                {isEs ? "Ver Caso Relacionado" : "Related Case Study"} →
              </Link>
            )}

            {/* Per-card downloads */}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full hover:bg-emerald-100 transition-colors disabled:opacity-50"
            >
              <FileSpreadsheet className="size-3" />
              {downloading ? "…" : "Excel"}
            </button>
            <button
              onClick={handleDownloadDocx}
              disabled={downloadingDocx}
              className="flex items-center gap-1.5 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full hover:bg-blue-100 transition-colors disabled:opacity-50"
            >
              <FileText className="size-3" />
              {downloadingDocx ? "…" : "Word"}
            </button>

            {okr.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 ml-auto">
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
  const [downloading, setDownloading] = useState(false);

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

  const [downloadingDocx, setDownloadingDocx] = useState(false);

  const handleDownloadAll = async () => {
    setDownloading(true);
    try {
      await downloadOKRsAsExcel(filtered, locale);
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadAllDocx = async () => {
    setDownloadingDocx(true);
    try {
      await downloadOKRsAsDocx(filtered, locale);
    } finally {
      setDownloadingDocx(false);
    }
  };

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
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-stone-400">
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
            <span className="text-stone-600">·</span>
            <button
              onClick={handleDownloadAll}
              disabled={downloading}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
            >
              <FileSpreadsheet className="size-3.5" />
              {downloading
                ? isEs ? "Generando…" : "Generating…"
                : isEs ? "Descargar todo (Excel)" : "Download All (Excel)"}
            </button>
            <button
              onClick={handleDownloadAllDocx}
              disabled={downloadingDocx}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
            >
              <FileText className="size-3.5" />
              {downloadingDocx
                ? isEs ? "Generando…" : "Generating…"
                : isEs ? "Descargar todo (Word)" : "Download All (Word)"}
            </button>
          </div>
        </div>
      </section>

      {/* Filters + OKRs */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Company-wide callout */}
          <div className="mb-6 rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
            <Star className="size-5 text-teal-600 shrink-0" />
            <p className="text-sm text-teal-800 flex-1">
              <span className="font-semibold">
                {isEs
                  ? "¿Nuevo en OKRs? Empieza con la Plantilla Insignia de Toda la Empresa."
                  : "New to OKRs? Start with the Company-Wide Flagship Template."}
              </span>{" "}
              {isEs
                ? "12 resultados clave: roles clínicos, EHR, diseño de horarios, optimización de alcance profesional, y gobernanza ejecutiva — diseñado para planificación a nivel de junta directiva."
                : "12 key results spanning clinical roles, EHR optimization, schedule design, top-of-scope utilization, and executive governance — designed for board-level planning."}
            </p>
            <button
              onClick={() => {
                toggle("company-wide-2026-plan");
                document
                  .getElementById("okr-company-wide")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="shrink-0 text-xs font-semibold text-teal-700 bg-white border border-teal-300 px-3 py-1.5 rounded-full hover:bg-teal-100 transition-colors"
            >
              {isEs ? "Ver plantilla ↓" : "View template ↓"}
            </button>
          </div>

          {/* OKR Learning callout */}
          <div className="mb-6 rounded-xl border border-purple-200 bg-purple-50 px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
            <Target className="size-5 text-purple-600 shrink-0" />
            <p className="text-sm text-purple-800 flex-1">
              <span className="font-semibold">
                {isEs
                  ? "¿Quieres aprender a escribir OKRs?"
                  : "Want to learn how to write OKRs?"}
              </span>{" "}
              {isEs
                ? "Toma nuestro curso interactivo gratuito de 45 minutos o lanza un sprint de equipo con tu equipo ejecutivo."
                : "Take our free 45-minute interactive course or launch a team sprint with your executive team."}
            </p>
            <div className="flex gap-2 shrink-0">
              <Link href="/strategy/okr-course">
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white text-xs">
                  {isEs ? "Curso Individual" : "Individual Course"}
                  <ArrowRight className="size-3.5 ml-1" />
                </Button>
              </Link>
              <Link href="/strategy/okr-team-sprint">
                <Button size="sm" variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-100 text-xs">
                  {isEs ? "Sprint de Equipo" : "Team Sprint"}
                  <Users className="size-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </div>

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
          <div className="flex flex-wrap items-center gap-2 mb-4">
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

            {/* Download filtered button */}
            {filtered.length < OKR_TEMPLATES.length && (
              <button
                onClick={handleDownloadAll}
                disabled={downloading}
                className="ml-auto flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
              >
                <FileSpreadsheet className="size-3.5" />
                {isEs
                  ? `Descargar filtrados (${filtered.length})`
                  : `Download filtered (${filtered.length})`}
              </button>
            )}
          </div>

          {/* OKR cards */}
          <div className="space-y-4">
            {filtered.map((okr) => (
              <div
                key={okr.id}
                id={okr.id === "company-wide-2026-plan" ? "okr-company-wide" : undefined}
              >
                <OKRCard
                  okr={okr}
                  locale={locale}
                  isEs={isEs}
                  isExpanded={expandedIds.has(okr.id)}
                  onToggle={() => toggle(okr.id)}
                />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-stone-500">
              {isEs
                ? "No hay plantillas que coincidan con los filtros."
                : "No templates match your filters."}
            </div>
          )}

          {/* Related links + download CTA */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
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
            <button
              onClick={handleDownloadAll}
              disabled={downloading}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <FileSpreadsheet className="size-4" />
              {downloading
                ? isEs ? "Generando…" : "Generating…"
                : isEs ? "Excel" : "Excel Tracker"}
            </button>
            <button
              onClick={handleDownloadAllDocx}
              disabled={downloadingDocx}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <FileText className="size-4" />
              {downloadingDocx
                ? isEs ? "Generando…" : "Generating…"
                : isEs ? "Word" : "Word Document"}
            </button>
          </div>
        </div>
      </section>

      {/* ==================== COURSE & SPRINT CTA ==================== */}
      <section className="py-8 border-t border-stone-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-stone-900 text-center mb-6">
            {isEs
              ? "Lleva tus OKRs al siguiente nivel"
              : "Take your OKRs to the next level"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/strategy/okr-course">
              <div className="rounded-2xl border border-teal-200 bg-teal-50/50 p-6 hover:shadow-md transition-shadow cursor-pointer h-full">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="size-5 text-teal-600" />
                  <Badge className="bg-teal-100 text-teal-800 text-xs">
                    {isEs ? "Gratis • 45 min" : "Free • 45 min"}
                  </Badge>
                </div>
                <h3 className="font-bold text-stone-800 mb-1">
                  {isEs ? "Curso Individual de OKR" : "Individual OKR Course"}
                </h3>
                <p className="text-sm text-stone-500">
                  {isEs
                    ? "Aprende la metodología OKR con ejercicios interactivos y un capstone con retroalimentación de IA."
                    : "Learn OKR methodology through interactive exercises and an AI-powered capstone."}
                </p>
              </div>
            </Link>
            <Link href="/strategy/okr-team-sprint">
              <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-6 hover:shadow-md transition-shadow cursor-pointer h-full">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="size-5 text-blue-600" />
                  <Badge className="bg-blue-100 text-blue-800 text-xs">
                    {isEs ? "Gratis • Equipos" : "Free • Teams"}
                  </Badge>
                </div>
                <h3 className="font-bold text-stone-800 mb-1">
                  {isEs ? "Sprint de OKR en Equipo" : "Team OKR Sprint"}
                </h3>
                <p className="text-sm text-stone-500">
                  {isEs
                    ? "Tu equipo ejecutivo construye sus OKRs reales juntos en 4 sesiones guiadas con evaluación de IA."
                    : "Your executive team builds their real OKRs together in 4 guided sessions with AI assessment."}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
