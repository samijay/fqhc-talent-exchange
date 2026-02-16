"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Building2,
  Briefcase,
  Shield,
  Lightbulb,
  ArrowRight,
  Globe,
  Monitor,
  Heart,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import {
  getMarketOverview,
  getRegionalSnapshots,
  getRoleDemand,
  getFundingCliffs,
  getSalaryIntelligence,
  generateStrategicInsights,
  getEHRDistribution,
  getProgramAdoption,
  type RegionalSnapshot,
  type RoleDemand,
  type FundingCliff,
  type SalaryIntelligence,
  type StrategicInsight,
} from "@/lib/market-intelligence";

/* ------------------------------------------------------------------ */
/*  Bilingual helper                                                   */
/* ------------------------------------------------------------------ */
function t(obj: { en: string; es: string }, locale: string): string {
  return locale === "es" ? obj.es : obj.en;
}

function formatSalary(amount: number): string {
  if (amount >= 1000) {
    return `$${Math.round(amount / 1000)}K`;
  }
  return `$${amount.toLocaleString()}`;
}

function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === "es" ? "es-US" : "en-US", {
    month: "short",
    year: "numeric",
  });
}

/* ------------------------------------------------------------------ */
/*  Compute data at module level (runs once at build time)             */
/* ------------------------------------------------------------------ */
const overview = getMarketOverview();
const regionalSnapshots = getRegionalSnapshots();
const roleDemand = getRoleDemand();
const fundingCliffs = getFundingCliffs();
const salaryIntel = getSalaryIntelligence();
const strategicInsights = generateStrategicInsights();
const ehrDistribution = getEHRDistribution();
const programAdoption = getProgramAdoption();

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function StatCard({
  icon: Icon,
  label,
  value,
  sublabel,
  color = "teal",
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sublabel?: string;
  color?: "teal" | "amber" | "red" | "stone";
}) {
  const colorMap = {
    teal: "bg-teal-50 text-teal-700 border-teal-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    red: "bg-red-50 text-red-700 border-red-200",
    stone: "bg-stone-50 text-stone-700 border-stone-200",
  };
  const iconColorMap = {
    teal: "text-teal-600",
    amber: "text-amber-600",
    red: "text-red-600",
    stone: "text-stone-600",
  };

  return (
    <div className={`rounded-xl border p-4 ${colorMap[color]}`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className={`h-4 w-4 ${iconColorMap[color]}`} />
        <span className="text-xs font-medium uppercase tracking-wide opacity-70">{label}</span>
      </div>
      <div className="text-2xl font-bold">{value}</div>
      {sublabel && <div className="text-xs opacity-60 mt-0.5">{sublabel}</div>}
    </div>
  );
}

function BarViz({
  value,
  max,
  color = "teal",
  label,
}: {
  value: number;
  max: number;
  color?: string;
  label?: string;
}) {
  const pct = Math.min(Math.round((value / max) * 100), 100);
  const colorClasses: Record<string, string> = {
    teal: "bg-teal-600",
    amber: "bg-amber-500",
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
  };
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-4 rounded-full bg-stone-100 overflow-hidden">
        <div
          className={`h-full rounded-full ${colorClasses[color] || "bg-teal-600"} transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {label && <span className="text-xs text-stone-500 w-12 text-right">{label}</span>}
    </div>
  );
}

function HealthBadge({ signal }: { signal: "strong" | "caution" | "warning" }) {
  const config = {
    strong: { bg: "bg-green-100 text-green-700 border-green-200", label: "Strong" },
    caution: { bg: "bg-amber-100 text-amber-700 border-amber-200", label: "Caution" },
    warning: { bg: "bg-red-100 text-red-700 border-red-200", label: "Warning" },
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${config[signal].bg}`}>
      {signal === "warning" && <AlertTriangle className="h-3 w-3" />}
      {config[signal].label}
    </span>
  );
}

function DemandBadge({ signal }: { signal: "hot" | "steady" | "cooling" }) {
  const config = {
    hot: { bg: "bg-green-100 text-green-700", icon: TrendingUp, label: "Hot" },
    steady: { bg: "bg-blue-100 text-blue-700", icon: BarChart3, label: "Steady" },
    cooling: { bg: "bg-red-100 text-red-700", icon: TrendingDown, label: "Cooling" },
  };
  const { bg, icon: BadgeIcon, label } = config[signal];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${bg}`}>
      <BadgeIcon className="h-3 w-3" />
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function InsightsPage() {
  const locale = useLocale();
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);
  const [showAllRoles, setShowAllRoles] = useState(false);
  const [showAllSalary, setShowAllSalary] = useState(false);

  const upcomingCliffs = fundingCliffs.filter((c) => !c.isPast).slice(0, 4);
  const displayedRoles = showAllRoles ? roleDemand : roleDemand.slice(0, 10);
  const displayedSalary = showAllSalary
    ? salaryIntel.filter((s) => s.listingCount > 0)
    : salaryIntel.filter((s) => s.listingCount > 0).slice(0, 10);

  const maxJobCount = Math.max(...roleDemand.map((r) => r.jobCount), 1);
  const maxSalary = Math.max(...salaryIntel.map((s) => s.p75), 1);

  return (
    <main className="min-h-screen bg-stone-50">
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-amber-400" />
            <span className="text-sm font-medium text-teal-200 uppercase tracking-wide">
              {locale === "es" ? "Inteligencia de Mercado" : "Market Intelligence"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {locale === "es"
              ? "Perspectivas del Mercado Laboral FQHC en California"
              : "California FQHC Labor Market Insights"}
          </h1>
          <p className="text-lg text-teal-100 max-w-3xl">
            {locale === "es"
              ? "Análisis de datos en tiempo real de 90 centros de salud, 156 puestos de trabajo, y seguimiento de despidos — inteligencia estratégica que ningún otro sitio de empleo puede ofrecer."
              : "Real-time data analysis from 90 health centers, 156 job listings, and layoff tracking — strategic intelligence no other job site can offer."}
          </p>

          {/* Overview stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            <div className="rounded-lg bg-white/10 backdrop-blur-sm p-3 text-center">
              <div className="text-2xl font-bold">{overview.totalFQHCs}</div>
              <div className="text-xs text-teal-200">{locale === "es" ? "FQHCs" : "FQHCs Tracked"}</div>
            </div>
            <div className="rounded-lg bg-white/10 backdrop-blur-sm p-3 text-center">
              <div className="text-2xl font-bold">{overview.totalJobs}</div>
              <div className="text-xs text-teal-200">{locale === "es" ? "Trabajos Activos" : "Active Jobs"}</div>
            </div>
            <div className="rounded-lg bg-white/10 backdrop-blur-sm p-3 text-center">
              <div className="text-2xl font-bold">{overview.totalLayoffWorkers.toLocaleString()}</div>
              <div className="text-xs text-teal-200">{locale === "es" ? "Trabajadores Afectados" : "Workers Displaced"}</div>
            </div>
            <div className="rounded-lg bg-white/10 backdrop-blur-sm p-3 text-center">
              <div className="text-2xl font-bold">{overview.bilingualJobPercent}%</div>
              <div className="text-xs text-teal-200">{locale === "es" ? "Requieren Bilingüe" : "Prefer Bilingual"}</div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
        {/* ── Section 1: Funding Cliff Countdown ──────── */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Clock className="h-5 w-5 text-red-600" />
            <h2 className="text-xl font-bold text-stone-900">
              {locale === "es" ? "Cuenta Regresiva de Fondos" : "Funding Cliff Countdown"}
            </h2>
          </div>
          <p className="text-sm text-stone-600 mb-4 max-w-2xl">
            {locale === "es"
              ? "Fechas clave de políticas que impactarán el financiamiento de FQHCs y la fuerza laboral de salud comunitaria."
              : "Key policy dates that will impact FQHC funding and the community health workforce."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {upcomingCliffs.map((cliff) => (
              <div
                key={cliff.id}
                className={`rounded-xl border-2 p-4 ${
                  cliff.daysUntil <= 90
                    ? "border-red-300 bg-red-50"
                    : cliff.daysUntil <= 180
                      ? "border-amber-300 bg-amber-50"
                      : "border-stone-200 bg-white"
                }`}
              >
                <div className="text-xs font-medium text-stone-500 mb-1">
                  {formatDate(cliff.date, locale)}
                </div>
                <div
                  className={`text-2xl font-bold mb-1 ${
                    cliff.daysUntil <= 90 ? "text-red-700" : cliff.daysUntil <= 180 ? "text-amber-700" : "text-stone-700"
                  }`}
                >
                  {cliff.daysUntil > 0
                    ? `${cliff.daysUntil} ${locale === "es" ? "días" : "days"}`
                    : locale === "es"
                      ? "En efecto"
                      : "In Effect"}
                </div>
                <h3 className="text-sm font-semibold text-stone-800 mb-2 line-clamp-2">
                  {t(cliff.title, locale)}
                </h3>
                {cliff.dollarAmount && (
                  <div className="text-xs text-stone-500">
                    <DollarSign className="inline h-3 w-3 mr-0.5" />
                    {cliff.dollarAmount}
                  </div>
                )}
                {cliff.peopleAffected && (
                  <div className="text-xs text-stone-500 mt-0.5">
                    <Users className="inline h-3 w-3 mr-0.5" />
                    {cliff.peopleAffected}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-3 text-right">
            <Link
              href="/funding-impact"
              className="text-sm text-teal-700 hover:text-teal-800 font-medium inline-flex items-center gap-1"
            >
              {locale === "es" ? "Ver línea de tiempo completa" : "View full policy timeline"}
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </section>

        {/* ── Section 2: Strategic Insights ───────────── */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <h2 className="text-xl font-bold text-stone-900">
              {locale === "es" ? "Perspectivas Estratégicas" : "Strategic Insights"}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {strategicInsights.map((insight) => {
              const categoryConfig: Record<string, { icon: React.ElementType; color: string }> = {
                "demand-shift": { icon: TrendingUp, color: "border-l-blue-500" },
                "salary-trend": { icon: DollarSign, color: "border-l-green-500" },
                "funding-risk": { icon: AlertTriangle, color: "border-l-red-500" },
                opportunity: { icon: Lightbulb, color: "border-l-amber-500" },
              };
              const { icon: InsightIcon, color } = categoryConfig[insight.category] || categoryConfig.opportunity;

              return (
                <div key={insight.id} className={`rounded-xl bg-white border border-stone-200 border-l-4 ${color} p-5`}>
                  <div className="flex items-start gap-3">
                    <InsightIcon className="h-5 w-5 text-stone-500 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-stone-900 mb-2">
                        {t(insight.title, locale)}
                      </h3>
                      <p className="text-sm text-stone-600 mb-3">
                        {t(insight.narrative, locale)}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {insight.dataPoints.map((dp, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-600"
                          >
                            {dp}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-teal-700 font-medium bg-teal-50 rounded-lg p-2.5">
                        💡 {t(insight.actionable, locale)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Section 3: Regional Market Snapshot ─────── */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="h-5 w-5 text-teal-600" />
            <h2 className="text-xl font-bold text-stone-900">
              {locale === "es" ? "Panorama Regional" : "Regional Market Snapshot"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {regionalSnapshots
              .filter((r) => r.totalJobs > 0 || r.fqhcCount > 0)
              .sort((a, b) => b.totalJobs - a.totalJobs)
              .map((region) => {
                const isExpanded = expandedRegion === region.region;
                return (
                  <div
                    key={region.region}
                    className="rounded-xl bg-white border border-stone-200 overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedRegion(isExpanded ? null : region.region)}
                      className="w-full p-4 text-left hover:bg-stone-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-stone-900">{region.region}</h3>
                        <div className="flex items-center gap-2">
                          <HealthBadge signal={region.healthSignal} />
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-stone-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-stone-400" />
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-lg font-bold text-teal-700">{region.fqhcCount}</div>
                          <div className="text-[10px] text-stone-500">FQHCs</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-teal-700">{region.totalJobs}</div>
                          <div className="text-[10px] text-stone-500">{locale === "es" ? "Trabajos" : "Jobs"}</div>
                        </div>
                        <div>
                          <div className={`text-lg font-bold ${region.recentLayoffs > 100 ? "text-red-600" : "text-stone-600"}`}>
                            {region.recentLayoffs > 0 ? region.recentLayoffs.toLocaleString() : "—"}
                          </div>
                          <div className="text-[10px] text-stone-500">{locale === "es" ? "Despidos" : "Layoffs"}</div>
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="border-t border-stone-100 p-4 bg-stone-50 space-y-3">
                        <div>
                          <div className="text-xs font-medium text-stone-500 mb-1">
                            {locale === "es" ? "Salario Promedio" : "Avg Salary Range"}
                          </div>
                          <div className="text-sm font-semibold text-stone-700">
                            {formatSalary(region.avgSalaryMin)} – {formatSalary(region.avgSalaryMax)}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-stone-500 mb-1">
                            {locale === "es" ? "Vulnerabilidad de Fondos" : "Funding Vulnerability"}
                          </div>
                          <div className="flex gap-1.5">
                            <span className="text-xs bg-red-100 text-red-700 rounded-full px-2 py-0.5">
                              {region.highVulnerabilityCount} High
                            </span>
                            <span className="text-xs bg-amber-100 text-amber-700 rounded-full px-2 py-0.5">
                              {region.moderateVulnerabilityCount} Mod
                            </span>
                            <span className="text-xs bg-green-100 text-green-700 rounded-full px-2 py-0.5">
                              {region.lowVulnerabilityCount} Low
                            </span>
                          </div>
                        </div>
                        {region.topRoles.length > 0 && (
                          <div>
                            <div className="text-xs font-medium text-stone-500 mb-1">
                              {locale === "es" ? "Roles Más Solicitados" : "Top Hiring Roles"}
                            </div>
                            <div className="space-y-1">
                              {region.topRoles.slice(0, 3).map((r) => (
                                <div key={r.role} className="flex items-center justify-between text-xs">
                                  <span className="text-stone-700">{r.role}</span>
                                  <span className="text-stone-500">{r.count} {locale === "es" ? "puestos" : "jobs"}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </section>

        {/* ── Section 4: Role Demand Heatmap ─────────── */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Briefcase className="h-5 w-5 text-teal-600" />
            <h2 className="text-xl font-bold text-stone-900">
              {locale === "es" ? "Demanda por Rol" : "Role Demand Heatmap"}
            </h2>
          </div>

          <div className="rounded-xl bg-white border border-stone-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50">
                    <th className="text-left p-3 font-medium text-stone-600">
                      {locale === "es" ? "Rol" : "Role"}
                    </th>
                    <th className="text-center p-3 font-medium text-stone-600 w-20">
                      {locale === "es" ? "Puestos" : "Jobs"}
                    </th>
                    <th className="text-left p-3 font-medium text-stone-600 hidden sm:table-cell w-48">
                      {locale === "es" ? "Demanda" : "Demand"}
                    </th>
                    <th className="text-center p-3 font-medium text-stone-600 w-24">
                      {locale === "es" ? "Salario Prom." : "Avg Salary"}
                    </th>
                    <th className="text-center p-3 font-medium text-stone-600 w-20 hidden sm:table-cell">
                      {locale === "es" ? "Bilingüe" : "Bilingual"}
                    </th>
                    <th className="text-center p-3 font-medium text-stone-600 w-20">
                      {locale === "es" ? "Señal" : "Signal"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayedRoles.map((role, idx) => (
                    <tr
                      key={role.roleType}
                      className={`border-b border-stone-100 ${idx % 2 === 0 ? "bg-white" : "bg-stone-50/50"}`}
                    >
                      <td className="p-3 font-medium text-stone-800">{role.roleType}</td>
                      <td className="p-3 text-center font-semibold text-teal-700">{role.jobCount}</td>
                      <td className="p-3 hidden sm:table-cell">
                        <BarViz value={role.jobCount} max={maxJobCount} color="teal" />
                      </td>
                      <td className="p-3 text-center text-stone-600">
                        {formatSalary(role.avgSalaryMin)}–{formatSalary(role.avgSalaryMax)}
                      </td>
                      <td className="p-3 text-center text-stone-600 hidden sm:table-cell">
                        {role.bilingualPercent}%
                      </td>
                      <td className="p-3 text-center">
                        <DemandBadge signal={role.demandSignal} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {roleDemand.length > 10 && (
              <div className="p-3 text-center border-t border-stone-100">
                <button
                  onClick={() => setShowAllRoles(!showAllRoles)}
                  className="text-sm text-teal-700 hover:text-teal-800 font-medium inline-flex items-center gap-1"
                >
                  {showAllRoles
                    ? locale === "es" ? "Mostrar menos" : "Show less"
                    : locale === "es" ? `Mostrar todos (${roleDemand.length})` : `Show all ${roleDemand.length} roles`}
                  {showAllRoles ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── Section 5: Salary Intelligence ─────────── */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <DollarSign className="h-5 w-5 text-green-600" />
            <h2 className="text-xl font-bold text-stone-900">
              {locale === "es" ? "Inteligencia Salarial" : "Salary Intelligence"}
            </h2>
          </div>
          <p className="text-sm text-stone-600 mb-4 max-w-2xl">
            {locale === "es"
              ? "Benchmarks salariales (P25/P50/P75) vs. salarios reales de publicaciones activas. Las barras muestran el rango relativo."
              : "Salary benchmarks (P25/P50/P75) vs. actual salaries from active job postings. Bars show the relative range."}
          </p>

          <div className="space-y-2">
            {displayedSalary.map((role) => (
              <div key={role.roleId} className="rounded-lg bg-white border border-stone-200 p-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <div className="flex-1">
                    <span className="font-medium text-stone-800 text-sm">
                      {locale === "es" ? role.esLabel : role.label}
                    </span>
                    <span className="text-xs text-stone-400 ml-2">
                      ({role.listingCount} {locale === "es" ? "puestos" : "listings"})
                    </span>
                  </div>
                  <div className="text-xs text-stone-500 sm:text-right">
                    {locale === "es" ? "Benchmark" : "Benchmark"}: {formatSalary(role.p25)} / {formatSalary(role.p50)} / {formatSalary(role.p75)}
                  </div>
                </div>

                {/* Salary range visualization */}
                <div className="relative h-6 rounded-full bg-stone-100 overflow-hidden">
                  {/* P25-P75 benchmark range */}
                  <div
                    className="absolute h-full bg-teal-200 rounded-full"
                    style={{
                      left: `${(role.p25 / maxSalary) * 100}%`,
                      width: `${((role.p75 - role.p25) / maxSalary) * 100}%`,
                    }}
                  />
                  {/* P50 marker */}
                  <div
                    className="absolute h-full w-0.5 bg-teal-600"
                    style={{ left: `${(role.p50 / maxSalary) * 100}%` }}
                  />
                  {/* Actual listing range if available */}
                  {role.actualListingAvgMin !== null && role.actualListingAvgMax !== null && (
                    <div
                      className="absolute h-3 top-1.5 bg-amber-500 rounded-full opacity-80"
                      style={{
                        left: `${(role.actualListingAvgMin / maxSalary) * 100}%`,
                        width: `${((role.actualListingAvgMax - role.actualListingAvgMin) / maxSalary) * 100}%`,
                      }}
                    />
                  )}
                </div>

                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-3 text-[10px] text-stone-400">
                    <span className="inline-flex items-center gap-1">
                      <span className="inline-block w-2.5 h-2.5 rounded-sm bg-teal-200" /> {locale === "es" ? "Benchmark" : "Benchmark"}
                    </span>
                    {role.actualListingAvgMin !== null && (
                      <span className="inline-flex items-center gap-1">
                        <span className="inline-block w-2.5 h-2.5 rounded-sm bg-amber-500" /> {locale === "es" ? "Publicaciones reales" : "Actual Listings"}
                      </span>
                    )}
                  </div>
                  {role.actualListingAvgMin !== null && role.actualListingAvgMax !== null && (
                    <span className="text-xs text-amber-700 font-medium">
                      {formatSalary(role.actualListingAvgMin)}–{formatSalary(role.actualListingAvgMax)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {salaryIntel.filter((s) => s.listingCount > 0).length > 10 && (
            <div className="mt-3 text-center">
              <button
                onClick={() => setShowAllSalary(!showAllSalary)}
                className="text-sm text-teal-700 hover:text-teal-800 font-medium inline-flex items-center gap-1"
              >
                {showAllSalary
                  ? locale === "es" ? "Mostrar menos" : "Show less"
                  : locale === "es" ? "Mostrar todos los roles" : "Show all roles"}
                {showAllSalary ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
            </div>
          )}
        </section>

        {/* ── Section 6: EHR & Program Adoption ──────── */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* EHR Distribution */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Monitor className="h-5 w-5 text-teal-600" />
                <h2 className="text-lg font-bold text-stone-900">
                  {locale === "es" ? "Sistemas EHR" : "EHR Systems"}
                </h2>
              </div>
              <div className="rounded-xl bg-white border border-stone-200 p-4 space-y-3">
                {ehrDistribution.map((ehr) => (
                  <div key={ehr.system}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium text-stone-700">{ehr.system}</span>
                      <span className="text-stone-500">
                        {ehr.fqhcCount} FQHCs ({ehr.percentage}%)
                      </span>
                    </div>
                    <BarViz
                      value={ehr.fqhcCount}
                      max={overview.totalFQHCs}
                      color="teal"
                      label={`${ehr.jobCount} jobs`}
                    />
                  </div>
                ))}
                <p className="text-xs text-stone-400 mt-2">
                  {locale === "es"
                    ? "Consejo: Los candidatos con experiencia en OCHIN Epic tienen la mayor demanda."
                    : "Tip: Candidates with OCHIN Epic experience have the highest demand."}
                </p>
              </div>
            </div>

            {/* Program Adoption */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-5 w-5 text-teal-600" />
                <h2 className="text-lg font-bold text-stone-900">
                  {locale === "es" ? "Adopción de Programas" : "Program Adoption"}
                </h2>
              </div>
              <div className="rounded-xl bg-white border border-stone-200 p-4 space-y-3">
                {programAdoption.map((prog) => (
                  <div key={prog.program}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium text-stone-700">{prog.program}</span>
                      <span className="text-stone-500">
                        {prog.fqhcCount} FQHCs ({prog.percentage}%)
                      </span>
                    </div>
                    <BarViz
                      value={prog.fqhcCount}
                      max={overview.totalFQHCs}
                      color="amber"
                      label={`${prog.jobCount} jobs`}
                    />
                  </div>
                ))}
                <p className="text-xs text-stone-400 mt-2">
                  {locale === "es"
                    ? "CalAIM ECM es el programa de más rápido crecimiento — pero su financiamiento expira en diciembre de 2026."
                    : "CalAIM ECM is the fastest-growing program — but its funding expires December 2026."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Bottom CTAs ────────────────────────────── */}
        <section className="rounded-2xl bg-gradient-to-br from-teal-800 to-teal-900 text-white p-8 sm:p-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-3">
              {locale === "es"
                ? "Usa estos datos para tu ventaja"
                : "Use This Data to Your Advantage"}
            </h2>
            <p className="text-teal-100 mb-6">
              {locale === "es"
                ? "Ya sea que busques trabajo o contrates talento, estas perspectivas te dan una ventaja que nadie más tiene."
                : "Whether you're job-seeking or hiring, these insights give you an edge no one else has."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/resume-builder"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-900 hover:bg-amber-400 transition-colors"
              >
                {locale === "es" ? "Construir Mi Currículum" : "Build My Resume"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                {locale === "es" ? "Explorar Trabajos" : "Browse Jobs"}
                <Briefcase className="h-4 w-4" />
              </Link>
              <Link
                href="/hire"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                {locale === "es" ? "Contratar Talento" : "Hire Talent"}
                <Users className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Data Source Disclaimer ──────────────────── */}
        <div className="text-center text-xs text-stone-400 pb-4">
          <p>
            {locale === "es"
              ? "Datos compilados de publicaciones públicas, archivos WARN Act, anuncios de organizaciones y registros del programa Medi-Cal. Actualizado febrero 2026."
              : "Data compiled from public job postings, WARN Act filings, organizational announcements, and Medi-Cal program records. Updated February 2026."}
          </p>
          <p className="mt-1">
            {locale === "es"
              ? "Las perspectivas estratégicas son generadas analíticamente y no constituyen asesoramiento financiero o de empleo."
              : "Strategic insights are analytically generated and do not constitute financial or employment advice."}
          </p>
        </div>
      </div>
    </main>
  );
}
