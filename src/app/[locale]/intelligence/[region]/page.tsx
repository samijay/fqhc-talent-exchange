import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
import {
  Building2,
  Users,
  Heart,
  Activity,
  Briefcase,
  AlertTriangle,
  MapPin,
  Star,
  ArrowRight,
  BarChart3,
  Monitor,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getRegionBySlug,
  getAllRegionSlugs,
  getRegionalStats,
  getRegionalFQHCs,
  getRegionalResilienceScores,
  getRegionalIntel,
  REGION_SLUGS,
} from "@/lib/regional-intelligence";
import { IMPACT_LABELS, IMPACT_STYLES } from "@/lib/fqhc-news-intel";
import { t } from "@/lib/i18n-helpers";

/* ------------------------------------------------------------------ */
/*  Static Params                                                      */
/* ------------------------------------------------------------------ */

export async function generateStaticParams() {
  return getAllRegionSlugs().map((region) => ({ region }));
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string; locale: string }>;
}): Promise<Metadata> {
  const { region: slug } = await params;
  const regionName = getRegionBySlug(slug);
  if (!regionName) return { title: "Not Found" };

  const stats = getRegionalStats(regionName);

  return {
    title: `${regionName} FQHC Intelligence | ${stats.fqhcCount} Health Centers | FQHC Talent`,
    description: `Regional intelligence dashboard for ${regionName} California. ${stats.fqhcCount} FQHCs, ${stats.totalStaff.toLocaleString()} staff, ${stats.totalPatients.toLocaleString()} patients served. Resilience scores, layoff tracking, job openings, and EHR landscape.`,
    alternates: {
      canonical: `https://www.fqhctalent.com/intelligence/${slug}`,
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

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

function gradeBgBar(grade: string): string {
  switch (grade) {
    case "A": return "bg-green-500";
    case "B": return "bg-teal-500";
    case "C": return "bg-amber-500";
    case "D": return "bg-orange-500";
    case "F": return "bg-red-500";
    default: return "bg-stone-400";
  }
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}K`;
  return n.toLocaleString();
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default async function RegionalIntelligencePage({
  params,
}: {
  params: Promise<{ locale: string; region: string }>;
}) {
  const { locale, region: slug } = await params;
  setRequestLocale(locale);

  const regionName = getRegionBySlug(slug);
  if (!regionName) notFound();


  const stats = getRegionalStats(regionName);
  const fqhcs = getRegionalFQHCs(regionName);
  const scores = getRegionalResilienceScores(regionName);
  const intel = getRegionalIntel(regionName);

  // Sort FQHCs by resilience score descending
  const scoredFqhcs = fqhcs
    .map((fqhc) => {
      const score = scores.find((s) => s.slug === fqhc.slug);
      return { fqhc, score };
    })
    .sort((a, b) => (b.score?.overall ?? 0) - (a.score?.overall ?? 0));

  // Other regions for navigation
  const otherRegions = Object.entries(REGION_SLUGS)
    .filter(([name]) => name !== regionName)
    .map(([name, s]) => ({ name, slug: s }));

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-2 flex items-center gap-2 text-stone-500">
            <Link href="/" className="hover:text-white transition-colors text-sm">
              {t({ en: "Intelligence", es: "Inteligencia" }, locale)}
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-sm text-stone-300">{regionName}</span>
          </div>

          <h1 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {t({
              en: `${regionName} FQHC Intelligence`,
              es: `Inteligencia FQHC de ${regionName}`,
            }, locale)}
          </h1>

          <p className="mb-8 max-w-2xl text-lg text-stone-300">
            {t({
              en: `Regional dashboard covering ${stats.fqhcCount} Federally Qualified Health Centers across ${stats.totalSites} sites in the ${regionName} region.`,
              es: `Panel regional que cubre ${stats.fqhcCount} Centros de Salud Federalmente Calificados en ${stats.totalSites} sitios en la region de ${regionName}.`,
            }, locale)}
          </p>

          {/* Stats bar */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {[
              {
                icon: Building2,
                value: stats.fqhcCount.toString(),
                label: t({ en: "FQHCs", es: "FQHCs" }, locale),
              },
              {
                icon: Users,
                value: formatNumber(stats.totalStaff),
                label: t({ en: "Staff", es: "Personal" }, locale),
              },
              {
                icon: Heart,
                value: formatNumber(stats.totalPatients),
                label: t({ en: "Patients", es: "Pacientes" }, locale),
              },
              {
                icon: Activity,
                value: `${stats.avgResilienceScore}/100`,
                label: t({ en: "Avg Resilience", es: "Resiliencia Prom." }, locale),
              },
              {
                icon: Briefcase,
                value: stats.jobCount.toString(),
                label: t({ en: "Job Openings", es: "Vacantes" }, locale),
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-stone-700 bg-stone-800/50 p-4"
              >
                <stat.icon className="mb-1 size-4 text-teal-400" />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-stone-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* ── Overview Cards ──────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-stone-900 dark:text-stone-100">
            {t({ en: "Regional Overview", es: "Resumen Regional" }, locale)}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* FQHCs & Sites */}
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-900">
              <div className="mb-3 flex items-center gap-2 text-stone-500">
                <Building2 className="size-4" />
                <span className="text-sm font-medium">
                  {t({ en: "Health Centers", es: "Centros de Salud" }, locale)}
                </span>
              </div>
              <p className="text-3xl font-bold text-stone-900 dark:text-stone-100">{stats.fqhcCount}</p>
              <p className="text-sm text-stone-500">
                {t({
                  en: `across ${stats.totalSites} sites`,
                  es: `en ${stats.totalSites} sitios`,
                }, locale)}
              </p>
            </div>

            {/* Workforce */}
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-900">
              <div className="mb-3 flex items-center gap-2 text-stone-500">
                <Users className="size-4" />
                <span className="text-sm font-medium">
                  {t({ en: "Workforce", es: "Fuerza Laboral" }, locale)}
                </span>
              </div>
              <p className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                {stats.totalStaff.toLocaleString()}
              </p>
              <p className="text-sm text-stone-500">
                {t({
                  en: `avg ${stats.fqhcCount > 0 ? Math.round(stats.totalStaff / stats.fqhcCount) : 0} per FQHC`,
                  es: `prom. ${stats.fqhcCount > 0 ? Math.round(stats.totalStaff / stats.fqhcCount) : 0} por FQHC`,
                }, locale)}
              </p>
            </div>

            {/* Layoff Impact */}
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-900">
              <div className="mb-3 flex items-center gap-2 text-stone-500">
                <AlertTriangle className="size-4" />
                <span className="text-sm font-medium">
                  {t({ en: "Layoff Impact", es: "Impacto de Despidos" }, locale)}
                </span>
              </div>
              <p className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                {stats.workersAffected > 0
                  ? stats.workersAffected.toLocaleString()
                  : t({ en: "None", es: "Ninguno" }, locale)}
              </p>
              <p className="text-sm text-stone-500">
                {stats.layoffCount > 0
                  ? t({
                      en: `${stats.layoffCount} event${stats.layoffCount > 1 ? "s" : ""} tracked`,
                      es: `${stats.layoffCount} evento${stats.layoffCount > 1 ? "s" : ""} rastreado${stats.layoffCount > 1 ? "s" : ""}`,
                    }, locale)
                  : t({ en: "No layoffs tracked", es: "Sin despidos rastreados" }, locale)}
              </p>
            </div>

            {/* Glassdoor */}
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-900">
              <div className="mb-3 flex items-center gap-2 text-stone-500">
                <Star className="size-4" />
                <span className="text-sm font-medium">
                  {t({ en: "Avg Glassdoor", es: "Glassdoor Prom." }, locale)}
                </span>
              </div>
              <p className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                {stats.avgGlassdoor !== null
                  ? `${stats.avgGlassdoor}/5`
                  : t({ en: "N/A", es: "N/D" }, locale)}
              </p>
              <p className="text-sm text-stone-500">
                {t({
                  en: `${stats.ratedCount} of ${stats.fqhcCount} rated`,
                  es: `${stats.ratedCount} de ${stats.fqhcCount} calificados`,
                }, locale)}
              </p>
            </div>
          </div>
        </section>

        {/* ── Resilience Distribution ─────────────────────────────── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-stone-900 dark:text-stone-100">
            {t({ en: "Resilience Distribution", es: "Distribucion de Resiliencia" }, locale)}
          </h2>
          <p className="mb-6 text-sm text-stone-500">
            {t({
              en: `Average resilience score: ${stats.avgResilienceScore}/100. Distribution of grades across ${stats.fqhcCount} FQHCs.`,
              es: `Puntuacion promedio de resiliencia: ${stats.avgResilienceScore}/100. Distribucion de calificaciones en ${stats.fqhcCount} FQHCs.`,
            }, locale)}
          </p>

          {/* Grade distribution bar */}
          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-900">
            <div className="mb-4 flex gap-1 overflow-hidden rounded-lg">
              {(["A", "B", "C", "D", "F"] as const).map((grade) => {
                const count = stats.gradeDistribution[grade] || 0;
                const pct = stats.fqhcCount > 0 ? (count / stats.fqhcCount) * 100 : 0;
                if (pct === 0) return null;
                return (
                  <div
                    key={grade}
                    className={`${gradeBgBar(grade)} flex h-10 items-center justify-center text-xs font-bold text-white transition-all`}
                    style={{ width: `${pct}%`, minWidth: count > 0 ? "28px" : 0 }}
                    title={`${grade}: ${count}`}
                  >
                    {pct >= 5 ? `${grade}: ${count}` : grade}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4">
              {(["A", "B", "C", "D", "F"] as const).map((grade) => {
                const count = stats.gradeDistribution[grade] || 0;
                return (
                  <div key={grade} className="flex items-center gap-2">
                    <span
                      className={`inline-flex size-6 items-center justify-center rounded text-xs font-bold ${gradeColor(grade)}`}
                    >
                      {grade}
                    </span>
                    <span className="text-sm text-stone-600">
                      {count} {t({ en: "FQHCs", es: "FQHCs" }, locale)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FQHC Table ──────────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-stone-900 dark:text-stone-100">
            {t({
              en: `All ${stats.fqhcCount} FQHCs in ${regionName}`,
              es: `Los ${stats.fqhcCount} FQHCs en ${regionName}`,
            }, locale)}
          </h2>
          <p className="mb-6 text-sm text-stone-500">
            {t({
              en: "Sorted by resilience score (highest first).",
              es: "Ordenados por puntuacion de resiliencia (mayor primero).",
            }, locale)}
          </p>

          <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm dark:border-stone-700 dark:bg-stone-900">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-left dark:border-stone-700 dark:bg-stone-800">
                  <th className="px-4 py-3 font-semibold text-stone-700 dark:text-stone-300">
                    {t({ en: "Organization", es: "Organizacion" }, locale)}
                  </th>
                  <th className="hidden px-4 py-3 font-semibold text-stone-700 dark:text-stone-300 sm:table-cell">
                    {t({ en: "City", es: "Ciudad" }, locale)}
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-stone-700 dark:text-stone-300">
                    {t({ en: "Staff", es: "Personal" }, locale)}
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-stone-700 dark:text-stone-300">
                    {t({ en: "Grade", es: "Grado" }, locale)}
                  </th>
                  <th className="hidden px-4 py-3 text-center font-semibold text-stone-700 dark:text-stone-300 md:table-cell">
                    {t({ en: "Glassdoor", es: "Glassdoor" }, locale)}
                  </th>
                  <th className="hidden px-4 py-3 text-right font-semibold text-stone-700 dark:text-stone-300 lg:table-cell">
                    {t({ en: "Programs", es: "Programas" }, locale)}
                  </th>
                </tr>
              </thead>
              <tbody>
                {scoredFqhcs.map(({ fqhc, score }, i) => (
                  <tr
                    key={fqhc.slug}
                    className={`border-b border-stone-100 transition-colors hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-800 ${
                      i % 2 === 0 ? "bg-white dark:bg-stone-900" : "bg-stone-50/30 dark:bg-stone-800/30"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/directory/${fqhc.slug}`}
                        className="font-medium text-teal-700 hover:text-teal-900 hover:underline"
                      >
                        {fqhc.name}
                      </Link>
                    </td>
                    <td className="hidden px-4 py-3 text-stone-600 sm:table-cell">
                      <div className="flex items-center gap-1">
                        <MapPin className="size-3 text-stone-500" />
                        {fqhc.city}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-stone-700">
                      {parseInt(fqhc.staffCount.replace(/,/g, ""), 10).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {score && (
                        <span
                          className={`inline-flex size-7 items-center justify-center rounded text-xs font-bold ${gradeColor(score.grade)}`}
                        >
                          <span className="sr-only">Resilience grade: </span>{score.grade}
                        </span>
                      )}
                    </td>
                    <td className="hidden px-4 py-3 text-center md:table-cell">
                      {fqhc.glassdoorRating !== null ? (
                        <span className="flex items-center justify-center gap-1 text-stone-700">
                          <Star className="size-3 fill-amber-400 text-amber-400" aria-hidden="true" />
                          <span className="sr-only">{fqhc.glassdoorRating} out of 5 stars</span>
                          <span aria-hidden="true">{fqhc.glassdoorRating}</span>
                        </span>
                      ) : (
                        <span className="text-stone-500">--</span>
                      )}
                    </td>
                    <td className="hidden px-4 py-3 text-right text-stone-600 lg:table-cell">
                      {fqhc.programs.length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Top Programs & EHR Landscape (side by side) ─────────── */}
        <div className="mb-12 grid gap-8 lg:grid-cols-2">
          {/* Top Programs */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-stone-900 dark:text-stone-100">
              {t({ en: "Top Programs", es: "Programas Principales" }, locale)}
            </h2>
            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-900">
              {stats.topPrograms.length === 0 ? (
                <p className="text-sm text-stone-500">
                  {t({ en: "No program data available.", es: "Sin datos de programas disponibles." }, locale)}
                </p>
              ) : (
                <div className="space-y-3">
                  {stats.topPrograms.map((prog) => {
                    const pct = stats.fqhcCount > 0 ? (prog.count / stats.fqhcCount) * 100 : 0;
                    return (
                      <div key={prog.name}>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span className="font-medium text-stone-700">{prog.name}</span>
                          <span className="text-stone-500">
                            {prog.count} ({Math.round(pct)}%)
                          </span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-stone-100">
                          <div
                            className="h-full rounded-full bg-teal-500 transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* EHR Landscape */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-stone-900 dark:text-stone-100">
              {t({ en: "EHR Landscape", es: "Panorama de EHR" }, locale)}
            </h2>
            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-900">
              {stats.ehrSystems.length === 0 ? (
                <p className="text-sm text-stone-500">
                  {t({ en: "No EHR data available.", es: "Sin datos de EHR disponibles." }, locale)}
                </p>
              ) : (
                <div className="space-y-3">
                  {stats.ehrSystems.map((ehr) => {
                    const pct = stats.fqhcCount > 0 ? (ehr.count / stats.fqhcCount) * 100 : 0;
                    return (
                      <div key={ehr.name}>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span className="font-medium text-stone-700">
                            <Monitor className="mr-1 inline size-3 text-stone-500" />
                            {ehr.name}
                          </span>
                          <span className="text-stone-500">
                            {ehr.count} ({Math.round(pct)}%)
                          </span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-stone-100">
                          <div
                            className="h-full rounded-full bg-amber-500 transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* ── Regional Intel Feed ─────────────────────────────────── */}
        {intel.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-stone-900 dark:text-stone-100">
              {t({
                en: `${regionName} Intelligence Feed`,
                es: `Feed de Inteligencia de ${regionName}`,
              }, locale)}
            </h2>
            <p className="mb-6 text-sm text-stone-500">
              {t({
                en: `${intel.length} intelligence item${intel.length > 1 ? "s" : ""} relevant to this region.`,
                es: `${intel.length} elemento${intel.length > 1 ? "s" : ""} de inteligencia relevante${intel.length > 1 ? "s" : ""} para esta region.`,
              }, locale)}
            </p>

            <div className="space-y-3">
              {intel.slice(0, 8).map((item) => (
                <a
                  key={item.id}
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-stone-200 bg-white p-4 shadow-sm transition-colors hover:border-teal-300 hover:bg-teal-50/30"
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${IMPACT_STYLES[item.impactLevel]}`}
                    >
                      {t(IMPACT_LABELS[item.impactLevel], locale)}
                    </Badge>
                    <span className="text-xs text-stone-500">
                      {new Date(item.date).toLocaleDateString(locale === "es" ? "es-US" : "en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-xs text-stone-500">
                      {item.sourceOrg}
                    </span>
                  </div>
                  <h3 className="mb-1 font-semibold text-stone-900">
                    {t(item.headline, locale)}
                  </h3>
                  <p className="text-sm text-stone-600 line-clamp-2">
                    {t(item.summary, locale)}
                  </p>
                </a>
              ))}
            </div>

            {intel.length > 8 && (
              <div className="mt-4 text-center">
                <Link href="/">
                  <Button variant="outline" className="text-teal-700 border-teal-300 hover:bg-teal-50">
                    {t({
                      en: `View all ${intel.length} items`,
                      es: `Ver los ${intel.length} elementos`,
                    }, locale)}
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
              </div>
            )}
          </section>
        )}

        {/* ── Links Section ───────────────────────────────────────── */}
        <section className="mb-12">
          <div className="rounded-xl border border-stone-200 bg-gradient-to-r from-teal-50 to-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-stone-900 dark:text-stone-100">
              {t({ en: "Explore More", es: "Explorar Mas" }, locale)}
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/compare">
                <Button variant="outline" className="border-teal-300 text-teal-700 hover:bg-teal-50">
                  <BarChart3 className="mr-2 size-4" />
                  {t({ en: "Compare FQHCs", es: "Comparar FQHCs" }, locale)}
                </Button>
              </Link>
              <Link href="/directory">
                <Button variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-50">
                  <Building2 className="mr-2 size-4" />
                  {t({ en: "Full Directory", es: "Directorio Completo" }, locale)}
                </Button>
              </Link>
              <Link href="/layoffs">
                <Button variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-50">
                  <AlertTriangle className="mr-2 size-4" />
                  {t({ en: "Layoff Tracker", es: "Rastreador de Despidos" }, locale)}
                </Button>
              </Link>
              <Link href="/jobs">
                <Button variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-50">
                  <Briefcase className="mr-2 size-4" />
                  {t({
                    en: `${stats.jobCount} Jobs in ${regionName}`,
                    es: `${stats.jobCount} Empleos en ${regionName}`,
                  }, locale)}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Other Regions Navigation ─────────────────────────────── */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-stone-900">
            {t({ en: "Other Regions", es: "Otras Regiones" }, locale)}
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherRegions.map((r) => (
              <Link key={r.slug} href={`/intelligence/${r.slug}`}>
                <Badge
                  variant="outline"
                  className="cursor-pointer border-stone-300 px-3 py-1.5 text-sm text-stone-600 transition-colors hover:border-teal-400 hover:bg-teal-50 hover:text-teal-700"
                >
                  {r.name}
                  <ChevronRight className="ml-1 size-3" />
                </Badge>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
