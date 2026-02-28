"use client";

import { useLocale } from "next-intl";
import { useState, useMemo } from "react";
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
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Gavel,
  Megaphone,
  Heart,
  Activity,
  Eye,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getMarketOverview,
  getRegionalSnapshots,
  getRoleDemand,
  getFundingCliffs,
  getSalaryIntelligence,
  type RegionalSnapshot,
  type RoleDemand as RoleDemandType,
  type FundingCliff,
} from "@/lib/market-intelligence";
import {
  INTEL_ITEMS,
  INTEL_CATEGORIES,
  IMPACT_STYLES,
  IMPACT_BORDER,
  IMPACT_LABELS,
  getIntelItems,
  getBreakingIntel,
  getUndocumentedAccessItems,
  getChangeManagementItems,
  getIntelSources,
  type IntelItem,
  type IntelCategory,
} from "@/lib/fqhc-news-intel";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

function formatSalary(amount: number): string {
  return amount >= 1000 ? `$${Math.round(amount / 1000)}K` : `$${amount.toLocaleString()}`;
}

function formatDate(dateStr: string, locale: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(locale === "es" ? "es-US" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function daysUntil(dateStr: string): number {
  const now = new Date();
  const target = new Date(dateStr + "T00:00:00");
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

/* ------------------------------------------------------------------ */
/*  Data (computed once at build)                                      */
/* ------------------------------------------------------------------ */

const overview = getMarketOverview();
const regionalSnapshots = getRegionalSnapshots();
const roleDemand = getRoleDemand();
const fundingCliffs = getFundingCliffs();
const salaryIntel = getSalaryIntelligence();
const breakingIntel = getBreakingIntel(5);
const undocAccessItems = getUndocumentedAccessItems();
const changeMgmtItems = getChangeManagementItems();
const allSources = getIntelSources();

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function IntelCard({ item, locale }: { item: IntelItem; locale: string }) {
  const isEs = locale === "es";
  const catMeta = INTEL_CATEGORIES.find((c) => c.id === item.category);

  return (
    <div
      className={`rounded-lg border border-stone-200 bg-white p-4 border-l-4 ${IMPACT_BORDER[item.impactLevel]} transition-shadow hover:shadow-md`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <Badge
              variant="outline"
              className={`text-[10px] font-semibold ${IMPACT_STYLES[item.impactLevel]}`}
            >
              {t(IMPACT_LABELS[item.impactLevel], locale)}
            </Badge>
            <span className="text-[11px] text-stone-400">
              {formatDate(item.date, locale)}
            </span>
            {catMeta && (
              <span className="text-[11px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                {isEs ? catMeta.es : catMeta.en}
              </span>
            )}
            {item.region !== "Federal" && item.region !== "California" && (
              <span className="text-[11px] text-stone-400 flex items-center gap-0.5">
                <MapPin className="h-3 w-3" />
                {item.region}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-stone-800 text-sm leading-snug">
            {t(item.headline, locale)}
          </h3>
          <p className="mt-1.5 text-sm text-stone-600 leading-relaxed">
            {t(item.summary, locale)}
          </p>
          {item.affectedOrgs && item.affectedOrgs.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {item.affectedOrgs.map((org) => (
                <span
                  key={org}
                  className="text-[10px] bg-red-50 text-red-700 px-1.5 py-0.5 rounded"
                >
                  {org}
                </span>
              ))}
            </div>
          )}
        </div>
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 text-stone-400 hover:text-teal-600 transition-colors"
          title={item.sourceOrg}
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
      <div className="mt-2 text-[11px] text-stone-400">
        {isEs ? "Fuente" : "Source"}: {item.sourceOrg}
      </div>
    </div>
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
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function InsightsPage() {
  const locale = useLocale();
  const isEs = locale === "es";

  const [intelFilter, setIntelFilter] = useState<IntelCategory | "all">("all");
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);
  const [showAllRoles, setShowAllRoles] = useState(false);
  const [showMarketData, setShowMarketData] = useState(false);

  const upcomingCliffs = fundingCliffs.filter((c) => !c.isPast).slice(0, 4);
  const nextCliff = upcomingCliffs[0];

  /* Filtered intel items */
  const filteredIntel = useMemo(() => {
    if (intelFilter === "all") return getIntelItems();
    return getIntelItems({ category: intelFilter });
  }, [intelFilter]);

  const displayedRoles = showAllRoles ? roleDemand : roleDemand.slice(0, 8);
  const maxJobCount = Math.max(...roleDemand.map((r) => r.jobCount), 1);

  return (
    <main className="min-h-screen bg-stone-50">
      {/* ───────────────── HERO — Executive Dashboard ───────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="h-5 w-5 text-teal-400" />
            <span className="text-sm font-medium text-teal-400 uppercase tracking-wider">
              {isEs ? "Inteligencia Ejecutiva" : "Executive Intelligence"}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {isEs
              ? "Dashboard de Inteligencia FQHC"
              : "FQHC Intelligence Dashboard"}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-stone-300">
            {isEs
              ? "Legislación, financiamiento, fuerza laboral, y estrategia — lo que los líderes de FQHCs en California necesitan saber hoy."
              : "Legislation, funding, workforce, and strategy — what California FQHC leaders need to know today."}
          </p>

          {/* Stat strip */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg bg-white/10 backdrop-blur p-3">
              <div className="text-xs text-stone-400 uppercase tracking-wide">
                {isEs ? "FQHCs Rastreados" : "FQHCs Tracked"}
              </div>
              <div className="text-2xl font-bold text-white">{overview.totalFQHCs}</div>
            </div>
            <div className="rounded-lg bg-white/10 backdrop-blur p-3">
              <div className="text-xs text-stone-400 uppercase tracking-wide">
                {isEs ? "Empleos Activos" : "Active Jobs"}
              </div>
              <div className="text-2xl font-bold text-white">{overview.totalJobs}+</div>
            </div>
            <div className="rounded-lg bg-white/10 backdrop-blur p-3">
              <div className="text-xs text-red-400 uppercase tracking-wide">
                {isEs ? "Trabajadores Desplazados" : "Workers Displaced"}
              </div>
              <div className="text-2xl font-bold text-red-400">
                {overview.totalLayoffWorkers.toLocaleString()}+
              </div>
            </div>
            <div className="rounded-lg bg-white/10 backdrop-blur p-3">
              <div className="text-xs text-amber-400 uppercase tracking-wide">
                {isEs ? "Próximo Riesgo Fiscal" : "Next Funding Cliff"}
              </div>
              <div className="text-2xl font-bold text-amber-400">
                {nextCliff ? `${nextCliff.daysUntil}d` : "—"}
              </div>
              {nextCliff && (
                <div className="text-[10px] text-stone-400 mt-0.5 truncate">
                  {t(nextCliff.title, locale)}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* ───────────────── BREAKING INTEL ───────────────── */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <h2 className="text-xl font-bold text-stone-800">
                {isEs ? "Inteligencia Crítica" : "Breaking Intelligence"}
              </h2>
            </div>
            <Badge variant="outline" className="text-xs text-stone-500">
              {INTEL_ITEMS.length} {isEs ? "elementos" : "items"}
            </Badge>
          </div>

          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setIntelFilter("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                intelFilter === "all"
                  ? "bg-stone-800 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {isEs ? "Todo" : "All"} ({INTEL_ITEMS.length})
            </button>
            {INTEL_CATEGORIES.map((cat) => {
              const count = INTEL_ITEMS.filter(
                (i) => i.category === cat.id
              ).length;
              if (count === 0) return null;
              return (
                <button
                  key={cat.id}
                  onClick={() => setIntelFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    intelFilter === cat.id
                      ? "bg-stone-800 text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {isEs ? cat.es : cat.en} ({count})
                </button>
              );
            })}
          </div>

          {/* Intel feed */}
          <div className="space-y-3">
            {filteredIntel.map((item) => (
              <IntelCard key={item.id} item={item} locale={locale} />
            ))}
          </div>
        </section>

        {/* ───────────────── FUNDING CLIFF COUNTDOWN ───────────────── */}
        {upcomingCliffs.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-amber-600" />
              <h2 className="text-xl font-bold text-stone-800">
                {isEs ? "Cuenta Regresiva: Riesgos Fiscales" : "Funding Cliff Countdown"}
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {upcomingCliffs.map((cliff) => {
                const urgency =
                  cliff.daysUntil < 90
                    ? "border-red-400 bg-red-50"
                    : cliff.daysUntil < 180
                      ? "border-amber-400 bg-amber-50"
                      : "border-stone-200 bg-white";
                const countColor =
                  cliff.daysUntil < 90
                    ? "text-red-700"
                    : cliff.daysUntil < 180
                      ? "text-amber-700"
                      : "text-stone-700";

                return (
                  <div
                    key={cliff.id}
                    className={`rounded-xl border p-4 ${urgency}`}
                  >
                    <div className={`text-3xl font-bold ${countColor}`}>
                      {cliff.daysUntil}
                      <span className="text-sm font-medium ml-1">
                        {isEs ? "días" : "days"}
                      </span>
                    </div>
                    <h3 className="mt-1 font-semibold text-stone-800 text-sm leading-snug">
                      {t(cliff.title, locale)}
                    </h3>
                    {cliff.dollarAmount && (
                      <div className="mt-1 text-xs text-stone-500">
                        {cliff.dollarAmount}
                      </div>
                    )}
                    {cliff.peopleAffected && (
                      <div className="text-xs text-stone-500">
                        {cliff.peopleAffected}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-3 text-right">
              <Link
                href="/funding-impact"
                className="text-sm text-teal-700 hover:text-teal-900 font-medium inline-flex items-center gap-1"
              >
                {isEs ? "Ver Rastreador Completo" : "View Full Tracker"}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </section>
        )}

        {/* ───────────────── UNDOCUMENTED ACCESS WATCH ───────────────── */}
        <section className="mb-10">
          <div className="rounded-2xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-white p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-teal-700" />
              <h2 className="text-xl font-bold text-teal-900">
                {isEs
                  ? "Vigilancia: Acceso para Indocumentados"
                  : "Undocumented Access Watch"}
              </h2>
            </div>
            <p className="text-sm text-teal-800 mb-4">
              {isEs
                ? "Políticas que afectan el acceso a salud para comunidades indocumentadas y estrategias para mantener las puertas abiertas."
                : "Policies affecting healthcare access for undocumented communities and strategies to keep doors open."}
            </p>
            <div className="space-y-3">
              {undocAccessItems.map((item) => (
                <IntelCard key={item.id} item={item} locale={locale} />
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────── CHANGE MANAGEMENT PLAYBOOK ───────────────── */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-amber-600" />
            <h2 className="text-xl font-bold text-stone-800">
              {isEs ? "Manual de Estrategia" : "Change Management Playbook"}
            </h2>
          </div>
          <p className="text-sm text-stone-500 mb-4">
            {isEs
              ? "Tácticas ejecutables para líderes de FQHCs navegando recortes de financiamiento, cambios de política, y presión sobre la fuerza laboral."
              : "Actionable tactics for FQHC leaders navigating funding cuts, policy changes, and workforce pressure."}
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {changeMgmtItems.map((item) => (
              <IntelCard key={item.id} item={item} locale={locale} />
            ))}
          </div>
        </section>

        {/* ───────────────── REGIONAL MARKET SNAPSHOT ───────────────── */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-teal-600" />
            <h2 className="text-xl font-bold text-stone-800">
              {isEs ? "Panorama Regional" : "Regional Market Snapshot"}
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {regionalSnapshots
              .sort((a, b) => b.totalJobs - a.totalJobs)
              .map((region) => {
                const isExpanded = expandedRegion === region.region;
                return (
                  <div
                    key={region.region}
                    className="rounded-xl border border-stone-200 bg-white shadow-sm"
                  >
                    <button
                      onClick={() =>
                        setExpandedRegion(isExpanded ? null : region.region)
                      }
                      className="w-full p-4 text-left"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-stone-800 text-sm">
                          {region.region}
                        </h3>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-stone-400" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-stone-400" />
                        )}
                      </div>
                      <div className="mt-2 flex gap-4 text-xs">
                        <span className="text-teal-700">
                          <Building2 className="h-3 w-3 inline mr-0.5" />
                          {region.fqhcCount} FQHCs
                        </span>
                        <span className="text-blue-700">
                          <Briefcase className="h-3 w-3 inline mr-0.5" />
                          {region.totalJobs} {isEs ? "empleos" : "jobs"}
                        </span>
                        {region.recentLayoffs > 0 && (
                          <span className="text-red-600">
                            <Users className="h-3 w-3 inline mr-0.5" />
                            {region.recentLayoffs} {isEs ? "desplazados" : "displaced"}
                          </span>
                        )}
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-stone-100 pt-3">
                        <div className="text-xs text-stone-600 space-y-1">
                          <div>
                            {isEs ? "Salario promedio" : "Avg salary"}:{" "}
                            {formatSalary(region.avgSalaryMin)}–
                            {formatSalary(region.avgSalaryMax)}
                          </div>
                          <div>
                            {isEs ? "Riesgo alto" : "High vulnerability"}:{" "}
                            {region.highVulnerabilityCount} FQHCs
                          </div>
                          {region.topRoles.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {region.topRoles.slice(0, 3).map((r) => (
                                <span
                                  key={r.role}
                                  className="bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded text-[10px]"
                                >
                                  {r.role}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </section>

        {/* ───────────────── ROLE DEMAND + SALARY (Collapsible) ───────────────── */}
        <section className="mb-10">
          <button
            onClick={() => setShowMarketData(!showMarketData)}
            className="flex items-center gap-2 mb-4 group"
          >
            <BarChart3 className="h-5 w-5 text-teal-600" />
            <h2 className="text-xl font-bold text-stone-800">
              {isEs ? "Datos del Mercado Laboral" : "Workforce Market Data"}
            </h2>
            {showMarketData ? (
              <ChevronUp className="h-4 w-4 text-stone-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-stone-400" />
            )}
            {!showMarketData && (
              <span className="text-xs text-stone-400 ml-2">
                {isEs ? "Clic para expandir" : "Click to expand"}
              </span>
            )}
          </button>

          {showMarketData && (
            <div className="space-y-6">
              {/* Role demand table */}
              <div className="rounded-xl border border-stone-200 bg-white overflow-hidden">
                <div className="p-4 border-b border-stone-100">
                  <h3 className="font-semibold text-stone-800">
                    {isEs ? "Demanda por Rol" : "Role Demand"}
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-stone-100 text-xs text-stone-500 uppercase">
                        <th className="text-left p-3">{isEs ? "Rol" : "Role"}</th>
                        <th className="text-right p-3">{isEs ? "Empleos" : "Jobs"}</th>
                        <th className="text-left p-3 hidden sm:table-cell">
                          {isEs ? "Distribución" : "Distribution"}
                        </th>
                        <th className="text-right p-3 hidden md:table-cell">
                          {isEs ? "Salario" : "Salary"}
                        </th>
                        <th className="text-center p-3">
                          {isEs ? "Señal" : "Signal"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedRoles.map((role) => (
                        <tr
                          key={role.roleType}
                          className="border-b border-stone-50 hover:bg-stone-50"
                        >
                          <td className="p-3 font-medium text-stone-700">
                            {role.roleType}
                          </td>
                          <td className="p-3 text-right text-stone-600">
                            {role.jobCount}
                          </td>
                          <td className="p-3 hidden sm:table-cell">
                            <div className="h-3 w-24 rounded-full bg-stone-100 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-teal-600"
                                style={{
                                  width: `${Math.round((role.jobCount / maxJobCount) * 100)}%`,
                                }}
                              />
                            </div>
                          </td>
                          <td className="p-3 text-right text-stone-500 hidden md:table-cell">
                            {formatSalary(role.avgSalaryMin)}–
                            {formatSalary(role.avgSalaryMax)}
                          </td>
                          <td className="p-3 text-center">
                            <DemandBadge signal={role.demandSignal} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {roleDemand.length > 8 && (
                  <div className="p-3 text-center border-t border-stone-100">
                    <button
                      onClick={() => setShowAllRoles(!showAllRoles)}
                      className="text-sm text-teal-700 hover:text-teal-900 font-medium"
                    >
                      {showAllRoles
                        ? isEs
                          ? "Mostrar menos"
                          : "Show less"
                        : isEs
                          ? `Mostrar ${roleDemand.length} roles`
                          : `Show all ${roleDemand.length} roles`}
                    </button>
                  </div>
                )}
              </div>

              {/* Key salary stats */}
              <div className="rounded-xl border border-stone-200 bg-white p-4">
                <h3 className="font-semibold text-stone-800 mb-3">
                  {isEs ? "Resumen Salarial" : "Salary Summary"}
                </h3>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="text-center p-3 bg-stone-50 rounded-lg">
                    <div className="text-xs text-stone-500 uppercase">
                      {isEs ? "Promedio general" : "Overall average"}
                    </div>
                    <div className="text-xl font-bold text-stone-800">
                      {formatSalary(overview.avgSalaryAllRoles)}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-stone-50 rounded-lg">
                    <div className="text-xs text-stone-500 uppercase">
                      {isEs ? "% bilingüe requerido" : "% bilingual required"}
                    </div>
                    <div className="text-xl font-bold text-teal-700">
                      {overview.bilingualJobPercent}%
                    </div>
                  </div>
                  <div className="text-center p-3 bg-stone-50 rounded-lg">
                    <div className="text-xs text-stone-500 uppercase">
                      {isEs ? "Rol más demandado" : "Top hiring role"}
                    </div>
                    <div className="text-xl font-bold text-stone-800">
                      {overview.topHiringRole}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ───────────────── SOURCES INDEX ───────────────── */}
        <section className="mb-10 rounded-xl border border-stone-200 bg-stone-50 p-6">
          <h2 className="text-lg font-bold text-stone-800 mb-3">
            {isEs ? "Índice de Fuentes" : "Sources Index"}
          </h2>
          <p className="text-sm text-stone-500 mb-4">
            {isEs
              ? "Toda la inteligencia proviene de fuentes primarias verificables."
              : "All intelligence is sourced from verifiable primary sources."}
          </p>
          <ul className="grid gap-1 sm:grid-cols-2">
            {allSources.map((src, i) => (
              <li key={i} className="text-sm">
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 hover:text-teal-900 hover:underline inline-flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3 flex-shrink-0" />
                  <span className="font-medium">{src.org}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* ───────────────── CTA ───────────────── */}
        <section className="mb-8 text-center">
          <div className="rounded-2xl bg-gradient-to-r from-stone-800 to-stone-900 p-8 text-white">
            <h2 className="text-2xl font-bold">
              {isEs
                ? "Inteligencia que impulsa decisiones"
                : "Intelligence that drives decisions"}
            </h2>
            <p className="mt-2 text-stone-300 max-w-lg mx-auto">
              {isEs
                ? "Desde inteligencia de mercado hasta herramientas de contratación — todo lo que los líderes de FQHC necesitan."
                : "From market intelligence to hiring tools — everything FQHC leaders need."}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link href="/hire">
                <Button
                  size="lg"
                  className="bg-amber-500 text-stone-900 hover:bg-amber-400 font-semibold"
                >
                  {isEs ? "Contratar Talento" : "Hire Talent"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/layoffs">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 font-semibold"
                >
                  {isEs ? "Rastreador de Despidos" : "Layoff Tracker"}
                </Button>
              </Link>
              <Link href="/jobs">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 font-semibold"
                >
                  {isEs ? "Ver Empleos" : "Browse Jobs"}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Data disclaimer */}
        <div className="text-center text-xs text-stone-400 mb-6">
          {isEs
            ? "Datos agregados de HRSA, BLS, CA EDD WARN Act, DHCS, y publicaciones de empleo de FQHCs. Actualizado febrero 2026."
            : "Data aggregated from HRSA, BLS, CA EDD WARN Act, DHCS, and FQHC job postings. Updated February 2026."}
        </div>
      </div>
    </main>
  );
}
