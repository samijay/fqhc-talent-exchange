"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  Calendar,
  ChevronDown,
  ChevronUp,
  DollarSign,
  ExternalLink,
  Filter,
  MapPin,
  Search,
  TrendingDown,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  californiaFQHCLayoffs,
  getLayoffStats,
  reasonCategoryLabels,
  statusLabels,
  type LayoffEntry,
} from "@/lib/california-fqhc-layoffs";

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function formatDate(iso: string, locale: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(locale === "es" ? "es-US" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function statusColor(status: string) {
  if (status === "announced") return "bg-amber-100 text-amber-800 border-amber-200";
  if (status === "in-progress") return "bg-red-100 text-red-800 border-red-200";
  return "bg-stone-100 text-stone-600 border-stone-200";
}

function reasonColor(reason: string) {
  if (reason.includes("federal")) return "bg-red-50 text-red-700";
  if (reason.includes("state")) return "bg-orange-50 text-orange-700";
  if (reason.includes("closure")) return "bg-stone-100 text-stone-700";
  if (reason.includes("merger")) return "bg-blue-50 text-blue-700";
  return "bg-stone-50 text-stone-600";
}

/* ------------------------------------------------------------------ */
/*  Text content (bilingual)                                            */
/* ------------------------------------------------------------------ */

function useText() {
  const locale = useLocale();
  const isEs = locale === "es";

  return {
    isEs,
    // Hero
    title: isEs
      ? "Seguimiento de Despidos en Salud Comunitaria de California"
      : "California Community Health Layoff Tracker",
    subtitle: isEs
      ? "Seguimiento en tiempo real de reducciones de personal en FQHCs y organizaciones de salud comunitaria en California. Datos actualizados regularmente de avisos WARN Act, reportes de noticias y anuncios organizacionales."
      : "Real-time tracking of workforce reductions at FQHCs and community health organizations across California. Updated regularly from WARN Act filings, news reports, and organizational announcements.",
    lastUpdated: isEs ? "Última actualización" : "Last updated",

    // Stats
    workersAffected: isEs ? "Trabajadores Afectados" : "Workers Affected",
    organizationsTracked: isEs ? "Organizaciones" : "Organizations",
    fqhcSpecific: isEs ? "Específicos de FQHC" : "FQHC-Specific",
    regionsImpacted: isEs ? "Regiones Impactadas" : "Regions Impacted",
    topCause: isEs ? "Causa Principal" : "Top Cause",

    // Impact banner
    impactTitle: isEs
      ? "El Impacto de los Recortes de Medicaid bajo H.R. 1"
      : "The Impact of Medicaid Cuts Under H.R. 1",
    impactStat1: isEs ? "$30 mil millones/año" : "$30 billion/year",
    impactStat1Label: isEs
      ? "Recortes a Medi-Cal de California"
      : "Cut from California's Medi-Cal",
    impactStat2: isEs ? "3.4 millones" : "3.4 million",
    impactStat2Label: isEs
      ? "Californianos podrían perder cobertura"
      : "Californians could lose coverage",
    impactStat3: isEs ? "1,400+" : "1,400+",
    impactStat3Label: isEs
      ? "Centros de salud comunitarios en riesgo a nivel nacional"
      : "Community health centers at risk nationwide",

    // Filters
    searchPlaceholder: isEs
      ? "Buscar organización, ciudad o puesto..."
      : "Search organization, city, or role...",
    allRegions: isEs ? "Todas las Regiones" : "All Regions",
    allReasons: isEs ? "Todas las Causas" : "All Reasons",
    allStatuses: isEs ? "Todos los Estados" : "All Statuses",
    fqhcOnly: isEs ? "Solo FQHCs" : "FQHCs Only",
    allOrgs: isEs ? "Todas las Organizaciones" : "All Organizations",

    // Cards
    employeesAffected: isEs ? "empleados afectados" : "employees affected",
    ofWorkforce: isEs ? "de la fuerza laboral" : "of workforce",
    announced: isEs ? "Anunciado" : "Announced",
    effective: isEs ? "Efectivo" : "Effective",
    rolesAffected: isEs ? "Roles Afectados" : "Roles Affected",
    departments: isEs ? "Departamentos" : "Departments",
    reason: isEs ? "Razón" : "Reason",
    source: isEs ? "Fuente" : "Source",
    warnFiled: isEs ? "Aviso WARN presentado" : "WARN notice filed",
    viewDetails: isEs ? "Ver Detalles" : "View Details",
    hideDetails: isEs ? "Ocultar Detalles" : "Hide Details",

    // CTA
    affectedTitle: isEs ? "¿Te Afectó un Despido?" : "Affected by a Layoff?",
    affectedSubtitle: isEs
      ? "Nuestro programa Fast-Track conecta a trabajadores de salud comunitaria desplazados con nuevas oportunidades en FQHCs en 48 horas."
      : "Our Fast-Track program connects displaced community health workers with new FQHC opportunities within 48 hours.",
    fastTrackCTA: isEs
      ? "Inscribirse en Fast-Track"
      : "Enroll in Fast-Track",
    buildResumeCTA: isEs
      ? "Construir Currículum Gratis"
      : "Build Free Resume",

    // Timeline
    timelineTitle: isEs
      ? "Cronología de Despidos"
      : "Layoff Timeline",

    // Empty
    noResults: isEs
      ? "No se encontraron resultados con estos filtros."
      : "No results found matching your filters.",
    noResultsHint: isEs
      ? "Intenta ajustar tus filtros de búsqueda."
      : "Try adjusting your search or filter criteria.",

    // Footer context
    contextTitle: isEs
      ? "¿Por Qué Está Pasando Esto?"
      : "Why Is This Happening?",
    contextBody: isEs
      ? "El acto H.R. 1 (\"One Big Beautiful Bill\") aprobado a principios de 2025 reestructura el financiamiento de Medicaid a nivel federal. California, que depende de Medi-Cal para cubrir a más de 14 millones de residentes, enfrenta recortes proyectados de $30 mil millones anuales. Los FQHCs, que reciben un promedio del 60-80% de sus ingresos de Medi-Cal, son particularmente vulnerables. Los programas CalAIM como ECM (Enhanced Care Management) y Community Supports también enfrentan incertidumbre financiera."
      : "The H.R. 1 act (\"One Big Beautiful Bill\") passed in early 2025 restructures Medicaid funding at the federal level. California, which relies on Medi-Cal to cover over 14 million residents, faces projected cuts of $30 billion annually. FQHCs, which receive an average of 60-80% of their revenue from Medi-Cal, are particularly vulnerable. CalAIM programs like ECM (Enhanced Care Management) and Community Supports also face funding uncertainty.",
  };
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function LayoffsPage() {
  const t = useText();
  const stats = getLayoffStats();

  /* filters */
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [reasonFilter, setReasonFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [fqhcOnly, setFqhcOnly] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  /* filter logic */
  const filtered = useMemo(() => {
    let list = californiaFQHCLayoffs;

    if (regionFilter !== "all") {
      list = list.filter((e) => e.region === regionFilter);
    }
    if (reasonFilter !== "all") {
      list = list.filter((e) => e.reasonCategory === reasonFilter);
    }
    if (statusFilter !== "all") {
      list = list.filter((e) => e.status === statusFilter);
    }
    if (fqhcOnly) {
      list = list.filter((e) => e.isFQHC);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.organization.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q) ||
          e.county.toLowerCase().includes(q) ||
          e.rolesAffected.some((r) => r.toLowerCase().includes(q)) ||
          e.reason.toLowerCase().includes(q)
      );
    }

    // Sort by date descending (most recent first)
    return [...list].sort(
      (a, b) =>
        new Date(b.dateAnnounced).getTime() -
        new Date(a.dateAnnounced).getTime()
    );
  }, [search, regionFilter, reasonFilter, statusFilter, fqhcOnly]);

  const totalFilteredAffected = filtered.reduce(
    (sum, e) => sum + e.employeesAffected,
    0
  );

  /* unique regions for filter */
  const uniqueRegions = [
    ...new Set(californiaFQHCLayoffs.map((e) => e.region)),
  ].sort();
  const uniqueReasons = [
    ...new Set(californiaFQHCLayoffs.map((e) => e.reasonCategory)),
  ];

  const locale = t.isEs ? "es" : "en";

  // Derive "last updated" date from the most recent entry in the data
  const lastUpdatedDateStr = useMemo(() => {
    const dates = californiaFQHCLayoffs.map((e) => e.dateAnnounced);
    const latest = dates.sort().reverse()[0]; // most recent ISO date
    if (!latest) return "";
    const d = new Date(latest + "T00:00:00");
    return d.toLocaleDateString(t.isEs ? "es-US" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [t.isEs]);

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-red-800 via-red-900 to-stone-900 py-14 text-center text-white sm:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-4 flex items-center justify-center gap-2">
            <AlertTriangle className="size-6 text-amber-400" />
            <Badge className="border-red-400/30 bg-red-500/20 text-red-100 text-sm">
              {t.lastUpdated}: {lastUpdatedDateStr}
            </Badge>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {t.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-red-100/80 sm:text-lg">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* ─── Stats bar ─── */}
      <div className="mx-auto max-w-7xl px-4 -mt-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
          <StatCard
            icon={<Users className="size-5 text-red-600" />}
            value={stats.totalAffected.toLocaleString()}
            label={t.workersAffected}
          />
          <StatCard
            icon={<Building2 className="size-5 text-red-600" />}
            value={stats.uniqueOrgs.toString()}
            label={t.organizationsTracked}
          />
          <StatCard
            icon={<Zap className="size-5 text-amber-600" />}
            value={stats.fqhcEntries.toString()}
            label={t.fqhcSpecific}
          />
          <StatCard
            icon={<MapPin className="size-5 text-teal-600" />}
            value={stats.regionsAffected.toString()}
            label={t.regionsImpacted}
          />
          <StatCard
            icon={<TrendingDown className="size-5 text-red-600" />}
            value={
              reasonCategoryLabels[stats.topReasonCategory]?.[
                t.isEs ? "es" : "en"
              ] || stats.topReasonCategory
            }
            label={t.topCause}
            className="col-span-2 sm:col-span-1"
          />
        </div>
      </div>

      {/* ─── H.R. 1 Impact banner ─── */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-red-200 bg-gradient-to-r from-red-50 to-amber-50 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-red-900 sm:text-xl">
            <AlertTriangle className="mr-2 inline size-5 text-red-600" />
            {t.impactTitle}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-white/80 p-4 text-center shadow-sm">
              <p className="text-2xl font-extrabold text-red-700 sm:text-3xl">
                {t.impactStat1}
              </p>
              <p className="mt-1 text-sm text-stone-600">{t.impactStat1Label}</p>
            </div>
            <div className="rounded-xl bg-white/80 p-4 text-center shadow-sm">
              <p className="text-2xl font-extrabold text-red-700 sm:text-3xl">
                {t.impactStat2}
              </p>
              <p className="mt-1 text-sm text-stone-600">{t.impactStat2Label}</p>
            </div>
            <div className="rounded-xl bg-white/80 p-4 text-center shadow-sm">
              <p className="text-2xl font-extrabold text-red-700 sm:text-3xl">
                {t.impactStat3}
              </p>
              <p className="mt-1 text-sm text-stone-600">{t.impactStat3Label}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Filters ─── */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="size-4 text-stone-500" />
          <span className="text-sm font-medium text-stone-700">
            {filtered.length} {t.isEs ? "resultados" : "results"} &middot;{" "}
            {totalFilteredAffected.toLocaleString()} {t.employeesAffected}
          </span>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
            <Input
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 pl-10"
            />
          </div>

          {/* Region */}
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="h-11 w-full sm:w-44">
              <SelectValue placeholder={t.allRegions} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allRegions}</SelectItem>
              {uniqueRegions.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Reason */}
          <Select value={reasonFilter} onValueChange={setReasonFilter}>
            <SelectTrigger className="h-11 w-full sm:w-52">
              <SelectValue placeholder={t.allReasons} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allReasons}</SelectItem>
              {uniqueReasons.map((r) => (
                <SelectItem key={r} value={r}>
                  {reasonCategoryLabels[r]?.[locale] || r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-11 w-full sm:w-40">
              <SelectValue placeholder={t.allStatuses} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allStatuses}</SelectItem>
              <SelectItem value="announced">
                {statusLabels.announced[locale]}
              </SelectItem>
              <SelectItem value="in-progress">
                {statusLabels["in-progress"][locale]}
              </SelectItem>
              <SelectItem value="completed">
                {statusLabels.completed[locale]}
              </SelectItem>
            </SelectContent>
          </Select>

          {/* FQHC only toggle */}
          <Button
            variant={fqhcOnly ? "default" : "outline"}
            className={
              fqhcOnly
                ? "h-11 bg-teal-700 text-white hover:bg-teal-800"
                : "h-11"
            }
            onClick={() => setFqhcOnly(!fqhcOnly)}
          >
            {fqhcOnly ? t.fqhcOnly : t.allOrgs}
          </Button>
        </div>
      </div>

      {/* ─── Layoff cards ─── */}
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-6 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="mx-auto max-w-md py-16 text-center">
            <TrendingDown className="mx-auto mb-4 size-12 text-stone-300" />
            <h2 className="text-lg font-semibold text-stone-700">
              {t.noResults}
            </h2>
            <p className="mt-2 text-sm text-stone-500">{t.noResultsHint}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((entry) => (
              <LayoffCard
                key={entry.id}
                entry={entry}
                locale={locale}
                t={t}
                isExpanded={expandedId === entry.id}
                onToggle={() =>
                  setExpandedId(expandedId === entry.id ? null : entry.id)
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* ─── Context section ─── */}
      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-stone-900">{t.contextTitle}</h2>
          <p className="mt-4 text-sm leading-relaxed text-stone-600 sm:text-base">
            {t.contextBody}
          </p>
        </div>
      </div>

      {/* ─── CTA section ─── */}
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 p-8 text-center text-white sm:p-12">
          <Zap className="mx-auto mb-4 size-10 text-amber-400" />
          <h2 className="text-2xl font-bold sm:text-3xl">{t.affectedTitle}</h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-teal-100/80">
            {t.affectedSubtitle}
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="bg-amber-500 text-stone-900 hover:bg-amber-400 font-semibold"
              asChild
            >
              <Link href="/fast-track">
                {t.fastTrackCTA} <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              asChild
            >
              <Link href="/resume-builder">
                {t.buildResumeCTA} <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function StatCard({
  icon,
  value,
  label,
  className = "",
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center rounded-xl border border-stone-200 bg-white p-4 shadow-sm ${className}`}
    >
      {icon}
      <p className="mt-2 text-base font-extrabold text-stone-900 sm:text-2xl leading-tight break-words text-center">
        {value}
      </p>
      <p className="mt-0.5 text-xs text-stone-500 text-center">{label}</p>
    </div>
  );
}

function LayoffCard({
  entry,
  locale,
  t,
  isExpanded,
  onToggle,
}: {
  entry: LayoffEntry;
  locale: string;
  t: ReturnType<typeof useText>;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white shadow-sm transition-all hover:shadow-md overflow-hidden">
      {/* Main row */}
      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* Left: org info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge className={`${statusColor(entry.status)} text-xs border`}>
                {statusLabels[entry.status]?.[locale as "en" | "es"] ||
                  entry.status}
              </Badge>
              <Badge className={`${reasonColor(entry.reasonCategory)} text-xs`}>
                {reasonCategoryLabels[entry.reasonCategory]?.[
                  locale as "en" | "es"
                ] || entry.reasonCategory}
              </Badge>
              {entry.isFQHC && (
                <Badge className="bg-teal-50 text-teal-700 text-xs">FQHC</Badge>
              )}
              {entry.warnActFiled && (
                <Badge className="bg-blue-50 text-blue-700 text-xs">
                  {t.warnFiled}
                </Badge>
              )}
            </div>

            <h3 className="text-lg font-bold text-stone-900 truncate">
              {entry.organization}
            </h3>

            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone-500">
              <span className="flex items-center gap-1">
                <MapPin className="size-3.5" />
                {entry.city}, {entry.county} {t.isEs ? "Condado" : "County"}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="size-3.5" />
                {formatDate(entry.dateAnnounced, locale)}
              </span>
            </div>
          </div>

          {/* Right: impact numbers */}
          <div className="flex items-center gap-6 sm:text-right">
            <div>
              <p className="text-2xl font-extrabold text-red-700">
                {entry.employeesAffected.toLocaleString()}
              </p>
              <p className="text-xs text-stone-500">{t.employeesAffected}</p>
            </div>
            {entry.percentOfWorkforce && (
              <div>
                <p className="text-2xl font-extrabold text-red-700">
                  {entry.percentOfWorkforce}%
                </p>
                <p className="text-xs text-stone-500">{t.ofWorkforce}</p>
              </div>
            )}
          </div>
        </div>

        {/* Expand/collapse */}
        <button
          onClick={onToggle}
          className="mt-3 flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800 transition-colors"
        >
          {isExpanded ? (
            <>
              {t.hideDetails} <ChevronUp className="size-4" />
            </>
          ) : (
            <>
              {t.viewDetails} <ChevronDown className="size-4" />
            </>
          )}
        </button>
      </div>

      {/* Expanded details */}
      {isExpanded && (
        <div className="border-t border-stone-100 bg-stone-50/50 px-5 py-5 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Roles affected */}
            <div>
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">
                {t.rolesAffected}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {entry.rolesAffected.map((role) => (
                  <Badge
                    key={role}
                    className="bg-red-50 text-red-700 text-xs"
                  >
                    {role}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Departments */}
            <div>
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">
                {t.departments}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {entry.departments.map((dept) => (
                  <Badge
                    key={dept}
                    className="bg-stone-100 text-stone-700 text-xs"
                  >
                    {dept}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Reason */}
            <div className="sm:col-span-2">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">
                {t.reason}
              </p>
              <p className="text-sm text-stone-700 leading-relaxed">
                {entry.reason}
              </p>
            </div>

            {/* Notes */}
            {entry.notes && (
              <div className="sm:col-span-2">
                <p className="text-sm text-stone-600 italic">{entry.notes}</p>
              </div>
            )}

            {/* Dates & source */}
            <div className="sm:col-span-2 flex flex-wrap items-center gap-4 pt-2 border-t border-stone-200">
              <span className="text-xs text-stone-500">
                <strong>{t.announced}:</strong>{" "}
                {formatDate(entry.dateAnnounced, locale)}
              </span>
              {entry.dateEffective && (
                <span className="text-xs text-stone-500">
                  <strong>{t.effective}:</strong>{" "}
                  {formatDate(entry.dateEffective, locale)}
                </span>
              )}
              <a
                href={entry.source}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto flex items-center gap-1 text-xs font-medium text-teal-700 hover:underline"
              >
                {t.source}: {entry.sourceTitle}{" "}
                <ExternalLink className="size-3" />
              </a>
            </div>
          </div>

          {/* CTA for affected workers */}
          {entry.rolesAffected.some(
            (r) =>
              r.includes("Community Health Worker") ||
              r.includes("Care Coordinator") ||
              r.includes("Medical Assistant") ||
              r.includes("Patient Navigator")
          ) && (
            <div className="mt-4 rounded-xl bg-teal-50 border border-teal-200 p-4">
              <p className="text-sm text-teal-900">
                <Zap className="inline size-4 mr-1 text-amber-500" />
                <strong>
                  {t.isEs
                    ? "¿Fuiste afectado/a por este despido?"
                    : "Were you affected by this layoff?"}
                </strong>{" "}
                {t.isEs
                  ? "Inscríbete en nuestro programa Fast-Track para ser conectado con nuevas oportunidades en FQHCs en 48 horas."
                  : "Enroll in our Fast-Track program to get connected with new FQHC opportunities within 48 hours."}
              </p>
              <Button
                size="sm"
                className="mt-2 bg-teal-700 text-white hover:bg-teal-800"
                asChild
              >
                <Link href="/fast-track">
                  {t.fastTrackCTA} <ArrowRight className="ml-1 size-3" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
