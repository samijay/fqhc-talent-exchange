import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  AlertTriangle,
  Building2,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  FileText,
  Globe,
  MapPin,
  Scale,
  Shield,
  Star,
  TrendingDown,
  Users,
} from "lucide-react";
import { californiaFQHCs } from "@/lib/california-fqhcs";
import { fqhcJobListings } from "@/lib/fqhc-job-listings";
import { californiaFQHCLayoffs } from "@/lib/california-fqhc-layoffs";
import {
  calculateResilienceScore,
  DIMENSION_META,
} from "@/lib/fqhc-resilience";
import {
  getIntelForFQHC,
  IMPACT_STYLES,
  IMPACT_BORDER,
  IMPACT_LABELS,
} from "@/lib/fqhc-news-intel";
import { getCaseStudiesForFQHC } from "@/lib/fqhc-case-studies";
import { getRegionalStats, getRegionSlug } from "@/lib/regional-intelligence";
import { getFundingCliffs } from "@/lib/market-intelligence";
import { CALENDLY_URL } from "@/lib/booking-config";

/* ------------------------------------------------------------------ */
/*  Static Params                                                      */
/* ------------------------------------------------------------------ */

export async function generateStaticParams() {
  return californiaFQHCs.map((fqhc) => ({ slug: fqhc.slug }));
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fqhc = californiaFQHCs.find((f) => f.slug === slug);
  if (!fqhc) return { title: "Not Found" };

  const resilience = calculateResilienceScore(fqhc);

  return {
    title: `${fqhc.name} — Strategic Intelligence Report | FQHC Talent Exchange`,
    description: `Strategic intelligence report for ${fqhc.name} in ${fqhc.city}, CA. Resilience grade: ${resilience.grade}. ${fqhc.siteCount} sites, ${fqhc.staffCount} staff, ${fqhc.patientCount} patients. Risk level: ${resilience.riskLevel}.`,
    alternates: {
      canonical: `https://www.fqhctalent.com/report/${slug}`,
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const GRADE_COLORS: Record<string, string> = {
  A: "bg-emerald-100 text-emerald-800 border-emerald-300",
  B: "bg-teal-100 text-teal-800 border-teal-300",
  C: "bg-amber-100 text-amber-800 border-amber-300",
  D: "bg-orange-100 text-orange-800 border-orange-300",
  F: "bg-red-100 text-red-800 border-red-300",
};

const GRADE_BAR_COLORS: Record<string, string> = {
  A: "bg-emerald-500",
  B: "bg-teal-500",
  C: "bg-amber-500",
  D: "bg-orange-500",
  F: "bg-red-500",
};

const RISK_LABELS: Record<string, { en: string; es: string }> = {
  low: { en: "Low Risk", es: "Riesgo Bajo" },
  moderate: { en: "Moderate Risk", es: "Riesgo Moderado" },
  high: { en: "High Risk", es: "Riesgo Alto" },
  critical: { en: "Critical Risk", es: "Riesgo Critico" },
};

const RISK_COLORS: Record<string, string> = {
  low: "text-emerald-700",
  moderate: "text-amber-700",
  high: "text-orange-700",
  critical: "text-red-700",
};

const FUNDING_BADGE: Record<string, string> = {
  high: "bg-red-100 text-red-800",
  moderate: "bg-amber-100 text-amber-800",
  low: "bg-emerald-100 text-emerald-800",
};

function formatDate(dateStr: string, locale: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(locale === "es" ? "es-US" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatCount(s: string): string {
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default async function FQHCReportPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const fqhc = californiaFQHCs.find((f) => f.slug === slug);
  if (!fqhc) notFound();

  const t = (obj: { en: string; es: string }) =>
    locale === "es" ? obj.es : obj.en;
  const isEs = locale === "es";

  // Data aggregation
  const resilience = calculateResilienceScore(fqhc);
  const jobs = fqhcJobListings.filter((j) => j.fqhcSlug === slug);
  const layoffs = californiaFQHCLayoffs.filter((l) => l.slug === slug);
  const intelItems = getIntelForFQHC(slug).slice(0, 5);
  const caseStudies = getCaseStudiesForFQHC(slug);
  const regionalStats = getRegionalStats(fqhc.region);
  const fundingCliffs = getFundingCliffs()
    .filter((c) => !c.isPast)
    .slice(0, 3);
  const regionSlug = getRegionSlug(fqhc.region);

  // Deduplicated top roles from job listings
  const roleCounts: Record<string, number> = {};
  for (const j of jobs) {
    roleCounts[j.title] = (roleCounts[j.title] || 0) + 1;
  }
  const topRoles = Object.entries(roleCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const reportDate = new Date().toLocaleDateString(
    isEs ? "es-US" : "en-US",
    { month: "long", day: "numeric", year: "numeric" },
  );

  return (
    <div className="min-h-screen bg-stone-50">
      {/* ==================== 1. REPORT HEADER ==================== */}
      <section className="bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950 py-12 text-white sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Badge className="mb-4 border-amber-400/30 bg-amber-500/20 text-amber-200 text-xs font-semibold uppercase tracking-wider">
            <FileText className="mr-1.5 size-3" />
            {isEs ? "Informe de Inteligencia Estrategica" : "Strategic Intelligence Report"}
          </Badge>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {fqhc.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-stone-300">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4" />
              {fqhc.city}, CA
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Building2 className="size-4" />
              {fqhc.region}
            </span>
          </div>

          <p className="mt-4 text-sm text-stone-400">
            {isEs ? "Generado el" : "Generated"} {reportDate}
          </p>

          <div className="mt-6">
            <Link href={`/directory/${slug}`}>
              <Button
                variant="outline"
                className="border-stone-600 bg-transparent text-stone-200 hover:bg-stone-800 hover:text-white"
              >
                {isEs ? "Ver Perfil Completo" : "View Full Profile"}
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
        {/* ==================== 2. EXECUTIVE SUMMARY ==================== */}
        <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-stone-800 mb-5">
            {isEs ? "Resumen Ejecutivo" : "Executive Summary"}
          </h2>

          {/* 4-stat row */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {/* Resilience Grade */}
            <div className="rounded-lg border border-stone-100 bg-stone-50 p-4 text-center">
              <p className="text-xs font-medium text-stone-500 mb-2">
                {isEs ? "Resiliencia" : "Resilience"}
              </p>
              <span
                className={`inline-flex items-center justify-center rounded-lg border px-4 py-2 text-2xl font-extrabold ${GRADE_COLORS[resilience.grade]}`}
              >
                {resilience.grade}
              </span>
            </div>
            {/* Sites */}
            <div className="rounded-lg border border-stone-100 bg-stone-50 p-4 text-center">
              <p className="text-xs font-medium text-stone-500 mb-2">
                {isEs ? "Sitios" : "Sites"}
              </p>
              <p className="text-2xl font-extrabold text-stone-800">
                {fqhc.siteCount}
              </p>
            </div>
            {/* Staff */}
            <div className="rounded-lg border border-stone-100 bg-stone-50 p-4 text-center">
              <p className="text-xs font-medium text-stone-500 mb-2">
                {isEs ? "Personal" : "Staff"}
              </p>
              <p className="text-2xl font-extrabold text-stone-800">
                {formatCount(fqhc.staffCount)}
              </p>
            </div>
            {/* Patients */}
            <div className="rounded-lg border border-stone-100 bg-stone-50 p-4 text-center">
              <p className="text-xs font-medium text-stone-500 mb-2">
                {isEs ? "Pacientes" : "Patients"}
              </p>
              <p className="text-2xl font-extrabold text-stone-800">
                {formatCount(fqhc.patientCount)}
              </p>
            </div>
          </div>

          {/* Risk assessment one-liner */}
          <div className="mt-5 flex items-center gap-2">
            <Shield className={`size-5 ${RISK_COLORS[resilience.riskLevel]}`} />
            <p className={`text-sm font-semibold ${RISK_COLORS[resilience.riskLevel]}`}>
              {t(RISK_LABELS[resilience.riskLevel])}
            </p>
            <span className="text-sm text-stone-500">
              {" "}
              ({resilience.overall}/100)
            </span>
          </div>

          {/* Mission statement */}
          {fqhc.missionStatement && (
            <blockquote className="mt-4 border-l-4 border-teal-300 pl-4 text-sm italic text-stone-600 leading-relaxed">
              {fqhc.missionStatement}
            </blockquote>
          )}
        </section>

        {/* ==================== 3. RESILIENCE ASSESSMENT ==================== */}
        <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-stone-800 mb-5">
            {isEs ? "Evaluacion de Resiliencia" : "Resilience Assessment"}
          </h2>

          {/* Overall score + grade */}
          <div className="mb-6 flex items-center gap-4">
            <div
              className={`flex size-16 items-center justify-center rounded-xl border-2 text-3xl font-extrabold ${GRADE_COLORS[resilience.grade]}`}
            >
              {resilience.grade}
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-700">
                {isEs ? "Puntuacion General" : "Overall Score"}: {resilience.overall}/100
              </p>
              <p className="text-xs text-stone-500">
                {isEs ? "Completitud de datos" : "Data completeness"}: {resilience.dataCompleteness}%
              </p>
            </div>
          </div>

          {/* 5 dimension bars */}
          <div className="space-y-4">
            {resilience.dimensions.map((dim, i) => {
              const meta = DIMENSION_META[i];
              return (
                <div key={dim.dimension}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-stone-700">
                      {t(dim.label)}
                    </span>
                    <span className="text-sm font-semibold text-stone-600">
                      {dim.score}/100
                    </span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-stone-100">
                    <div
                      className={`h-3 rounded-full ${meta.color} transition-all`}
                      style={{ width: `${dim.score}%` }}
                    />
                  </div>
                  {dim.factors.length > 0 && (
                    <p className="mt-1 text-xs text-stone-400 line-clamp-1">
                      {dim.factors[0]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Regional comparison */}
          <div className="mt-6 rounded-lg border border-stone-100 bg-stone-50 p-4">
            <p className="text-sm text-stone-600">
              <span className="font-semibold">{isEs ? "Comparacion Regional:" : "Regional Comparison:"}</span>{" "}
              {fqhc.name}{" "}
              {isEs ? "obtiene" : "scores"}{" "}
              <span className="font-bold text-stone-800">{resilience.overall}</span>{" "}
              {isEs ? "vs el promedio regional de" : "vs the"}{" "}
              {fqhc.region}{" "}
              {isEs ? "" : "average of"}{" "}
              <span className="font-bold text-stone-800">{regionalStats.avgResilienceScore}</span>.
            </p>
          </div>

          <div className="mt-4">
            <Link href="/strategy/resilience">
              <Button variant="outline" size="sm" className="text-teal-700 border-teal-300 hover:bg-teal-50">
                {isEs ? "Ver Tablero de Resiliencia Completo" : "View Full Resilience Scorecard"}
                <ArrowRight className="ml-1.5 size-3.5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* ==================== 4. THREAT LANDSCAPE ==================== */}
        <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-stone-800 mb-5">
            {isEs ? "Panorama de Amenazas" : "Threat Landscape"}
          </h2>

          {/* Funding impact + vulnerability */}
          <div className="flex flex-wrap gap-3 mb-5">
            {fqhc.fundingImpactLevel && (
              <Badge className={`${FUNDING_BADGE[fqhc.fundingImpactLevel]} text-xs font-semibold`}>
                <TrendingDown className="mr-1 size-3" />
                {isEs ? "Impacto de Financiamiento:" : "Funding Impact:"}{" "}
                {fqhc.fundingImpactLevel === "high"
                  ? isEs ? "Alto" : "High"
                  : fqhc.fundingImpactLevel === "moderate"
                    ? isEs ? "Moderado" : "Moderate"
                    : isEs ? "Bajo" : "Low"}
              </Badge>
            )}
            {fqhc.coverageVulnerabilityPercent !== null && (
              <Badge variant="outline" className="text-xs font-semibold border-stone-300 text-stone-600">
                {isEs ? "Cobertura en Riesgo" : "Coverage at Risk"}: {fqhc.coverageVulnerabilityPercent}%
              </Badge>
            )}
          </div>

          {/* Top 3 upcoming funding cliffs */}
          {fundingCliffs.length > 0 && (
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-stone-700 mb-3">
                {isEs ? "Proximos Vencimientos de Financiamiento" : "Upcoming Funding Cliffs"}
              </h3>
              <div className="space-y-2">
                {fundingCliffs.map((cliff) => (
                  <div
                    key={cliff.id}
                    className="flex items-center justify-between rounded-lg border border-stone-100 bg-stone-50 px-4 py-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-stone-700 truncate">
                        {t(cliff.title)}
                      </p>
                      <p className="text-xs text-stone-500">{cliff.date}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {cliff.dollarAmount && (
                        <span className="text-xs font-semibold text-stone-600">
                          {cliff.dollarAmount}
                        </span>
                      )}
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-bold ${
                          cliff.daysUntil <= 90
                            ? "border-red-300 text-red-700"
                            : cliff.daysUntil <= 180
                              ? "border-amber-300 text-amber-700"
                              : "border-stone-300 text-stone-600"
                        }`}
                      >
                        {cliff.daysUntil}d
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Layoff history alert */}
          {layoffs.length > 0 && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-red-800">
                    {isEs ? "Historial de Despidos" : "Layoff History"}
                  </h3>
                  {layoffs.map((l) => (
                    <p key={l.id} className="mt-1 text-sm text-red-700">
                      {l.employeesAffected.toLocaleString()}{" "}
                      {isEs ? "trabajadores afectados" : "workers affected"} ({l.dateAnnounced})
                      {" — "}{l.reason}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-4">
            <Link href="/funding-impact">
              <Button variant="outline" size="sm" className="text-teal-700 border-teal-300 hover:bg-teal-50">
                {isEs ? "Ver Analisis de Impacto" : "View Funding Impact Analysis"}
                <ArrowRight className="ml-1.5 size-3.5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* ==================== 5. PROGRAMS & CAPABILITIES ==================== */}
        <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-stone-800 mb-5">
            {isEs ? "Programas y Capacidades" : "Programs & Capabilities"}
          </h2>

          {/* Program pills */}
          {fqhc.programs.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-5">
              {fqhc.programs.map((program) => (
                <Badge
                  key={program}
                  variant="outline"
                  className="bg-teal-50 text-teal-700 border-teal-200 text-xs"
                >
                  {program}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-stone-500 mb-5">
              {isEs ? "Datos de programas no disponibles" : "Program data not available"}
            </p>
          )}

          {/* Key indicators grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg border border-stone-100 bg-stone-50 p-3">
              <p className="text-[11px] font-medium text-stone-500 mb-1">
                {isEs ? "Proveedor ECM" : "ECM Provider"}
              </p>
              <div className="flex items-center gap-1.5">
                {fqhc.ecmProvider ? (
                  <CheckCircle2 className="size-4 text-emerald-600" />
                ) : (
                  <span className="text-sm text-stone-400">--</span>
                )}
                <span className="text-sm font-semibold text-stone-700">
                  {fqhc.ecmProvider
                    ? isEs ? "Si" : "Yes"
                    : isEs ? "No" : "No"}
                </span>
              </div>
            </div>
            <div className="rounded-lg border border-stone-100 bg-stone-50 p-3">
              <p className="text-[11px] font-medium text-stone-500 mb-1">
                {isEs ? "Aprobado NHSC" : "NHSC Approved"}
              </p>
              <div className="flex items-center gap-1.5">
                {fqhc.nhscApproved ? (
                  <CheckCircle2 className="size-4 text-emerald-600" />
                ) : (
                  <span className="text-sm text-stone-400">--</span>
                )}
                <span className="text-sm font-semibold text-stone-700">
                  {fqhc.nhscApproved
                    ? isEs ? "Si" : "Yes"
                    : isEs ? "No" : "No"}
                </span>
              </div>
            </div>
            <div className="rounded-lg border border-stone-100 bg-stone-50 p-3">
              <p className="text-[11px] font-medium text-stone-500 mb-1">
                {isEs ? "Sistema EHR" : "EHR System"}
              </p>
              <p className="text-sm font-semibold text-stone-700 truncate">
                {fqhc.ehrSystem || "--"}
              </p>
            </div>
            <div className="rounded-lg border border-stone-100 bg-stone-50 p-3">
              <p className="text-[11px] font-medium text-stone-500 mb-1">
                {isEs ? "Estado Sindical" : "Union Status"}
              </p>
              <p className="text-sm font-semibold text-stone-700">
                {fqhc.unionInfo === null
                  ? isEs ? "Desconocido" : "Unknown"
                  : fqhc.unionInfo.unionized
                    ? fqhc.unionInfo.unions.join(", ")
                    : isEs ? "No Sindicalizado" : "Non-Union"}
              </p>
            </div>
          </div>
        </section>

        {/* ==================== 6. WORKFORCE INTELLIGENCE ==================== */}
        <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-stone-800 mb-5">
            <Briefcase className="mr-2 inline size-5 text-teal-700" />
            {isEs ? "Inteligencia Laboral" : "Workforce Intelligence"}
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 mb-5">
            {/* Active openings */}
            <div className="rounded-lg border border-stone-100 bg-stone-50 p-4 text-center">
              <p className="text-xs font-medium text-stone-500 mb-1">
                {isEs ? "Vacantes Activas" : "Active Openings"}
              </p>
              <p className="text-2xl font-extrabold text-teal-700">{jobs.length}</p>
            </div>
            {/* Glassdoor */}
            <div className="rounded-lg border border-stone-100 bg-stone-50 p-4 text-center">
              <p className="text-xs font-medium text-stone-500 mb-1">
                Glassdoor
              </p>
              {fqhc.glassdoorRating !== null ? (
                <div className="flex items-center justify-center gap-1.5">
                  <Star className="size-4 text-amber-500 fill-amber-500" />
                  <span className="text-2xl font-extrabold text-stone-800">
                    {fqhc.glassdoorRating}
                  </span>
                  {fqhc.glassdoorReviewCount !== null && (
                    <span className="text-xs text-stone-400">
                      ({fqhc.glassdoorReviewCount})
                    </span>
                  )}
                </div>
              ) : (
                <p className="text-sm text-stone-400">--</p>
              )}
            </div>
            {/* Data Source */}
            <div className="col-span-2 sm:col-span-1 rounded-lg border border-stone-100 bg-stone-50 p-4 text-center">
              <p className="text-xs font-medium text-stone-500 mb-1">
                {isEs ? "Fuente de Datos" : "Profile Source"}
              </p>
              <Badge variant="outline" className={`text-xs ${fqhc.dataSource === "curated" ? "border-teal-300 text-teal-700" : "border-stone-300 text-stone-600"}`}>
                {fqhc.dataSource === "curated"
                  ? isEs ? "Curado" : "Curated"
                  : "HRSA Import"}
              </Badge>
            </div>
          </div>

          {/* Top roles being hired */}
          {topRoles.length > 0 && (
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-stone-700 mb-2">
                {isEs ? "Roles Mas Solicitados" : "Top Roles Being Hired"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {topRoles.map(([role, count]) => (
                  <Badge key={role} variant="outline" className="text-xs border-stone-200 text-stone-600">
                    {role} {count > 1 && `(${count})`}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            {fqhc.careersUrl && (
              <a
                href={fqhc.careersUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 hover:text-teal-900 hover:underline transition-colors"
              >
                <ExternalLink className="size-3.5" />
                {isEs ? "Pagina de Empleos" : "Careers Page"}
              </a>
            )}
            <Link
              href="/compare"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 hover:text-teal-900 hover:underline transition-colors"
            >
              <Scale className="size-3.5" />
              {isEs ? "Comparar con Pares" : "Compare with Peers"}
            </Link>
          </div>
        </section>

        {/* ==================== 7. RELATED INTELLIGENCE ==================== */}
        <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-stone-800 mb-5">
            {isEs ? "Inteligencia Relacionada" : "Related Intelligence"}
          </h2>

          {intelItems.length > 0 ? (
            <div className="space-y-3">
              {intelItems.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-lg border border-stone-200 border-l-4 ${IMPACT_BORDER[item.impactLevel]} p-4`}
                >
                  <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-semibold ${IMPACT_STYLES[item.impactLevel]}`}
                    >
                      {t(IMPACT_LABELS[item.impactLevel])}
                    </Badge>
                    <span className="text-[11px] text-stone-400">
                      {formatDate(item.date, locale)}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-stone-800 leading-snug">
                    {t(item.headline)}
                  </h3>
                  <p className="mt-1 text-sm text-stone-500 leading-relaxed line-clamp-2">
                    {t(item.summary)}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[11px] text-stone-400">{item.region}</span>
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-teal-700 hover:text-teal-900 hover:underline transition-colors"
                    >
                      {item.sourceOrg} →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-stone-100 bg-stone-50 p-6 text-center">
              <p className="text-sm text-stone-500">
                {isEs
                  ? "No hay elementos de inteligencia recientes para esta organizacion."
                  : "No recent intelligence items for this organization."}
              </p>
              <Link href="/insights" className="mt-2 inline-block text-sm text-teal-700 hover:underline">
                {isEs ? "Ver Tablero de Inteligencia" : "View Intelligence Dashboard"} →
              </Link>
            </div>
          )}
        </section>

        {/* ==================== 8. RELATED CASE STUDIES ==================== */}
        {caseStudies.length > 0 && (
          <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-stone-800 mb-5">
              {isEs ? "Estudios de Caso Relacionados" : "Related Case Studies"}
            </h2>

            <div className="space-y-3">
              {caseStudies.map((cs) => (
                <div
                  key={cs.id}
                  className="rounded-lg border border-stone-200 p-4 hover:shadow-sm transition-shadow"
                >
                  <h3 className="text-sm font-semibold text-stone-800">
                    {cs.fqhcName}
                  </h3>
                  <p className="mt-1 text-sm text-stone-600 leading-relaxed">
                    {t(cs.headline)}
                  </p>
                  {cs.outcomes.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {cs.outcomes.slice(0, 3).map((outcome, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-[10px] border-emerald-200 text-emerald-700 bg-emerald-50"
                        >
                          {outcome.metric}: {outcome.value}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className="mt-2">
                    <a
                      href={cs.primarySourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-teal-700 hover:text-teal-900 hover:underline"
                    >
                      {cs.primarySourceOrg} →
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <Link href="/strategy/guides">
                <Button variant="outline" size="sm" className="text-teal-700 border-teal-300 hover:bg-teal-50">
                  {isEs ? "Ver Todas las Guias Ejecutivas" : "View All Executive Guides"}
                  <ArrowRight className="ml-1.5 size-3.5" />
                </Button>
              </Link>
            </div>
          </section>
        )}

        {/* ==================== 9. REGIONAL CONTEXT ==================== */}
        <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-stone-800 mb-3">
            <Globe className="mr-2 inline size-5 text-teal-700" />
            {isEs ? "Contexto Regional" : "Regional Context"}
          </h2>

          <p className="text-sm text-stone-600 mb-5">
            {fqhc.name}{" "}
            {isEs
              ? `opera en la region de ${fqhc.region} de California.`
              : `operates in California's ${fqhc.region} region.`}
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg border border-stone-100 bg-stone-50 p-3 text-center">
              <p className="text-[11px] font-medium text-stone-500 mb-1">
                {isEs ? "FQHCs en Region" : "Regional FQHCs"}
              </p>
              <p className="text-xl font-extrabold text-stone-800">
                {regionalStats.fqhcCount}
              </p>
            </div>
            <div className="rounded-lg border border-stone-100 bg-stone-50 p-3 text-center">
              <p className="text-[11px] font-medium text-stone-500 mb-1">
                {isEs ? "Resiliencia Promedio" : "Avg Resilience"}
              </p>
              <p className="text-xl font-extrabold text-stone-800">
                {regionalStats.avgResilienceScore}
              </p>
            </div>
            <div className="rounded-lg border border-stone-100 bg-stone-50 p-3 text-center">
              <p className="text-[11px] font-medium text-stone-500 mb-1">
                {isEs ? "Personal Total" : "Total Staff"}
              </p>
              <p className="text-xl font-extrabold text-stone-800">
                {regionalStats.totalStaff.toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg border border-stone-100 bg-stone-50 p-3 text-center">
              <p className="text-[11px] font-medium text-stone-500 mb-1">
                {isEs ? "Vacantes Regionales" : "Regional Jobs"}
              </p>
              <p className="text-xl font-extrabold text-stone-800">
                {regionalStats.jobCount}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <Link href={`/intelligence/${regionSlug}`}>
              <Button variant="outline" size="sm" className="text-teal-700 border-teal-300 hover:bg-teal-50">
                {isEs
                  ? `Ver Inteligencia de ${fqhc.region}`
                  : `View ${fqhc.region} Intelligence`}
                <ArrowRight className="ml-1.5 size-3.5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* ==================== 10. ACTIONS & NEXT STEPS ==================== */}
        <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-stone-800 mb-5">
            {isEs ? "Acciones y Proximos Pasos" : "Actions & Next Steps"}
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/compare" className="group">
              <div className="rounded-lg border border-stone-200 p-4 transition-all hover:border-teal-300 hover:shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700 group-hover:bg-teal-100 transition-colors">
                    <Scale className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-800">
                      {isEs ? "Comparar con Pares" : "Compare with Peers"}
                    </p>
                    <p className="text-xs text-stone-500">
                      {isEs
                        ? "Benchmarking lado a lado"
                        : "Side-by-side benchmarking"}
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/strategy/offboarding" className="group">
              <div className="rounded-lg border border-stone-200 p-4 transition-all hover:border-teal-300 hover:shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-amber-50 text-amber-700 group-hover:bg-amber-100 transition-colors">
                    <Users className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-800">
                      {isEs ? "Kit de Transicion Laboral" : "Transition Toolkit"}
                    </p>
                    <p className="text-xs text-stone-500">
                      {isEs
                        ? "Herramientas de transicion de fuerza laboral"
                        : "Workforce transition tools"}
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/strategy/resilience" className="group">
              <div className="rounded-lg border border-stone-200 p-4 transition-all hover:border-teal-300 hover:shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100 transition-colors">
                    <Shield className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-800">
                      {isEs ? "Tablero de Resiliencia" : "Full Scorecard"}
                    </p>
                    <p className="text-xs text-stone-500">
                      {isEs
                        ? "220 FQHCs evaluados"
                        : "220 FQHCs scored across 5 dimensions"}
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/resources" className="group">
              <div className="rounded-lg border border-stone-200 p-4 transition-all hover:border-teal-300 hover:shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700 group-hover:bg-blue-100 transition-colors">
                    <Briefcase className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-800">
                      {isEs ? "Recursos de Carrera" : "Career Resources"}
                    </p>
                    <p className="text-xs text-stone-500">
                      {isEs
                        ? "18 programas gratuitos y de bajo costo"
                        : "18 free & low-cost programs"}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Schedule a Briefing — Calendly CTA */}
        <section className="rounded-xl border-2 border-teal-200 bg-gradient-to-r from-teal-50 to-white p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-teal-700 text-white">
              <FileText className="size-7" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg font-bold text-stone-900">
                {isEs
                  ? `Discuta Este Informe con Nuestro Equipo`
                  : `Discuss This Report with Our Team`}
              </h3>
              <p className="text-sm text-stone-600 mt-1">
                {isEs
                  ? `Reserve una consulta gratuita de 20 minutos. Revisaremos el perfil estratégico de ${fqhc.name} y discutiremos oportunidades de fuerza laboral.`
                  : `Book a free 20-minute consultation. We'll walk through ${fqhc.name}'s strategic profile and discuss workforce opportunities.`}
              </p>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-teal-800 transition-colors"
              >
                <ExternalLink className="mr-2 size-4" />
                {isEs ? "Reservar Consulta" : "Book a Briefing"}
              </a>
              <Link
                href="/strategy/offboarding#intake"
                className="inline-flex items-center justify-center rounded-lg border border-stone-300 px-5 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <Users className="mr-2 size-4" />
                {isEs ? "Solicitar Transición" : "Request Transition"}
              </Link>
            </div>
          </div>
        </section>

        {/* Footer note */}
        <div className="text-center py-4">
          <p className="text-xs text-stone-400">
            {isEs
              ? "Este informe es generado automaticamente a partir de nuestros datos de inteligencia. Para consultas, contacte a"
              : "This report is auto-generated from our intelligence data assets. For inquiries, contact"}{" "}
            <a
              href="mailto:hello@fqhctalent.com"
              className="text-teal-700 hover:underline"
            >
              hello@fqhctalent.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
