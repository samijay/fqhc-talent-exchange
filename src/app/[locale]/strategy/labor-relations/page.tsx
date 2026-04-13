// FQHC Labor Relations Monitor — strategic intelligence page
"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Breadcrumb, PageHero } from "@/components/ui/design-system";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  FileText,
  Handshake,
  History,
  Lightbulb,
  Scale,
  ScrollText,
  Search,
  Shield,
  Users,
  Vote,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  LABOR_LAST_UPDATED,
  CASE_TYPE_META,
  CASE_STATUS_META,
  POSTURE_META,
  LABOR_CASES,
  LANDSCAPE_THEMES,
  PATHS_FORWARD,
  LABOR_BIBLIOGRAPHY,
  LABOR_HISTORY_TIMELINE,
  getLaborCases,
  getUpcomingMilestones,
  getLaborRelatedIntel,
  getLaborRelatedAdvocacy,
  getRegionalDensity,
  getLaborStats,
  getPostureIndex,
  type LaborCase,
  type LaborCaseType,
  type LaborCaseStatus,
  type LaborRelationsPosture,
  type LandscapeTheme,
  type PathForward,
} from "@/lib/fqhc-labor-relations";
import { t } from "@/lib/i18n-helpers";

const CASE_ICONS: Record<string, React.ElementType> = {
  "nlrb-complaint": Scale,
  "ballot-measure": Vote,
  "contract-negotiation": FileText,
  strike: AlertTriangle,
  arbitration: Scale,
  "organizing-drive": Users,
  legislation: ScrollText,
};

function daysUntil(dateStr: string): number {
  return Math.ceil(
    (new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function PostureBadge({ posture, locale }: { posture: LaborRelationsPosture; locale: string }) {
  const meta = POSTURE_META[posture];
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${meta.bgColor} ${meta.color}`}>
      {t(meta.label, locale)}
    </span>
  );
}

function PostureSpectrum({ cases, locale }: { cases: LaborCase[]; locale: string }) {
  const isEs = locale === "es";
  const postures: LaborRelationsPosture[] = ["adversarial", "contested", "neutral", "cooperative", "partnership"];
  const colors = ["bg-red-500", "bg-amber-500", "bg-stone-400", "bg-teal-500", "bg-green-500"];

  return (
    <div className="rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-6">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-stone-500">
        {isEs ? "Espectro de Postura" : "Posture Spectrum"}
      </h3>
      {/* Gradient bar */}
      <div className="relative mb-6">
        <div className="flex h-3 overflow-hidden rounded-full">
          <div className="flex-1 bg-red-400" />
          <div className="flex-1 bg-amber-400" />
          <div className="flex-1 bg-stone-300" />
          <div className="flex-1 bg-teal-400" />
          <div className="flex-1 bg-green-400" />
        </div>
        <div className="mt-1 flex justify-between text-[10px] sm:text-xs text-stone-500">
          {postures.map((p) => (
            <span key={p} className="max-w-[60px] text-center sm:max-w-none">{t(POSTURE_META[p].label, locale)}</span>
          ))}
        </div>
        {/* Case markers */}
        <div className="relative mt-3">
          {cases.map((c) => {
            const idx = getPostureIndex(c.posture);
            const left = (idx / (postures.length - 1)) * 100;
            return (
              <div
                key={c.id}
                className="absolute -translate-x-1/2"
                style={{ left: `${left}%` }}
                title={t(c.title, locale)}
              >
                <div className={`size-3 rounded-full border-2 border-white shadow-sm ${colors[idx]}`} />
              </div>
            );
          })}
        </div>
      </div>
      {/* Counts by posture */}
      <div className="flex gap-3">
        {postures.map((p, i) => {
          const count = cases.filter((c) => c.posture === p).length;
          return count > 0 ? (
            <div key={p} className={`flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs ${POSTURE_META[p].bgColor} ${POSTURE_META[p].color}`}>
              <div className={`size-2 rounded-full ${colors[i]}`} />
              {count} {t(POSTURE_META[p].label, locale).toLowerCase()}
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}

function CaseCard({ c, locale }: { c: LaborCase; locale: string }) {
  const [expanded, setExpanded] = useState(false);
  const isEs = locale === "es";
  const statusMeta = CASE_STATUS_META[c.status];
  const typeMeta = CASE_TYPE_META[c.caseType];
  const Icon = CASE_ICONS[c.caseType] || FileText;
  const milestoneDays = c.nextMilestone ? daysUntil(c.nextMilestone.date) : null;
  const isUrgent = milestoneDays !== null && milestoneDays >= 0 && milestoneDays <= 14;

  return (
    <div className={`rounded-xl border-2 bg-white p-5 transition-all ${
      isUrgent ? "border-amber-300 shadow-amber-100 shadow-md"
        : c.impactLevel === "critical" ? "border-red-200"
        : "border-stone-200"
    }`}>
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg ${
          c.impactLevel === "critical" ? "bg-red-100 text-red-700"
            : c.impactLevel === "high" ? "bg-amber-100 text-amber-700"
            : "bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-400"
        }`}>
          <Icon className="size-5" />
        </div>
        <div className="flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className={`text-xs ${statusMeta.color}`}>
              {t(statusMeta.label, locale)}
            </Badge>
            <PostureBadge posture={c.posture} locale={locale} />
            <span className="text-xs text-stone-400">{t(typeMeta.label, locale)}</span>
            <span className="text-xs text-stone-400">{c.region}</span>
          </div>
          <h3 className="text-base font-bold leading-snug text-stone-900 dark:text-stone-100">{t(c.title, locale)}</h3>
        </div>
      </div>

      {/* Milestone countdown */}
      {milestoneDays !== null && milestoneDays >= 0 && (
        <div className={`mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
          milestoneDays <= 14 ? "bg-amber-50 dark:bg-amber-950 text-amber-800" : "bg-stone-50 text-stone-600"
        }`}>
          <Calendar className="size-4 shrink-0" />
          <span className="font-semibold">
            {milestoneDays === 0 ? (isEs ? "Hoy" : "Today") : `${milestoneDays} ${isEs ? "días" : "days"}`}
          </span>
          <span className="text-xs opacity-75">— {t(c.nextMilestone!.description, locale)}</span>
        </div>
      )}

      {/* Parties */}
      <div className="mt-3 flex flex-wrap gap-1">
        {c.parties.unions.map((u) => (
          <Badge key={u} variant="secondary" className="border-purple-200 bg-purple-50 text-xs text-purple-700">{u}</Badge>
        ))}
        {c.parties.employers.map((e) => (
          <Badge key={e} variant="secondary" className="border-teal-200 bg-teal-50 text-xs text-teal-700">{e}</Badge>
        ))}
        {c.parties.agencies.map((a) => (
          <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>
        ))}
      </div>

      {/* Expand */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 flex items-center gap-1 text-sm font-medium text-teal-700 dark:text-teal-400 hover:text-teal-900 dark:hover:text-teal-300"
      >
        {expanded ? (isEs ? "Menos" : "Less") : (isEs ? "Más detalles" : "More details")}
        {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
      </button>

      {expanded && (
        <div className="mt-3 space-y-4 border-t border-stone-100 pt-3">
          <p className="text-sm text-stone-600 dark:text-stone-400">{t(c.summary, locale)}</p>

          {/* Mini-timeline */}
          {c.timeline.length > 0 && (
            <div className="relative ml-3 border-l-2 border-stone-200 pl-5">
              {[...c.timeline].reverse().map((evt, i) => (
                <div key={i} className="relative mb-3 last:mb-0">
                  <div className="absolute -left-[25px] top-1.5 size-2.5 rounded-full border-2 border-white bg-stone-400" />
                  <p className="text-xs font-semibold text-stone-400">
                    {new Date(evt.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                  <p className="text-sm text-stone-600 dark:text-stone-400">{t(evt.description, locale)}</p>
                </div>
              ))}
            </div>
          )}

          {/* Sources */}
          <div className="space-y-1">
            <a href={c.sourceUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-teal-600 hover:underline">
              <ExternalLink className="size-3" /> {c.sourceOrg}
            </a>
            {c.additionalSources.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-teal-600 hover:underline">
                <ExternalLink className="size-3" /> {s.title}
              </a>
            ))}
          </div>

          {/* Affected FQHCs */}
          {c.affectedFqhcSlugs.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {c.affectedFqhcSlugs.map((slug) => (
                <Link key={slug} href={`/directory/${slug}` as "/directory"}
                  className="rounded bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-700 hover:bg-teal-100">
                  {slug.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ThemeCard({ theme, locale }: { theme: LandscapeTheme; locale: string }) {
  const [expanded, setExpanded] = useState(false);
  const isEs = locale === "es";

  return (
    <div className="rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-5">
      <div className="mb-2 flex items-center gap-2">
        <PostureBadge posture={theme.posture} locale={locale} />
        <Badge variant="outline" className={`text-xs ${
          theme.impactLevel === "critical" ? "border-red-300 text-red-700"
            : theme.impactLevel === "high" ? "border-amber-300 text-amber-700"
            : "border-stone-300 text-stone-600"
        }`}>
          {theme.impactLevel}
        </Badge>
      </div>
      <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">{t(theme.title, locale)}</h3>
      <p className={`mt-2 text-sm text-stone-600 ${expanded ? "" : "line-clamp-3"}`}>
        {t(theme.analysis, locale)}
      </p>
      <button onClick={() => setExpanded(!expanded)}
        className="mt-2 text-sm font-medium text-teal-700 dark:text-teal-400 hover:text-teal-900 dark:hover:text-teal-300">
        {expanded ? (isEs ? "Menos" : "Less") : (isEs ? "Leer más" : "Read more")}
      </button>
      {expanded && (
        <div className="mt-3 space-y-3 border-t border-stone-100 pt-3">
          <ul className="space-y-1">
            {theme.keyDataPoints.map((dp, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-stone-600 dark:text-stone-400">
                <ArrowRight className="mt-0.5 size-3 shrink-0 text-teal-500" />
                {t(dp, locale)}
              </li>
            ))}
          </ul>
          <div className="space-y-1">
            {theme.sources.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-teal-600 hover:underline">
                <ExternalLink className="size-3" /> {s.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PathCard({ path, locale }: { path: PathForward; locale: string }) {
  const [expanded, setExpanded] = useState(false);
  const isEs = locale === "es";

  const difficultyColor = {
    low: "bg-green-100 text-green-700",
    medium: "bg-amber-100 text-amber-700",
    high: "bg-red-100 text-red-700",
  };
  const timeframeLabels: Record<string, { en: string; es: string }> = {
    immediate: { en: "Start now", es: "Comenzar ahora" },
    "6-months": { en: "6 months", es: "6 meses" },
    "1-year": { en: "1 year", es: "1 año" },
    "multi-year": { en: "Multi-year", es: "Varios años" },
  };

  return (
    <div className="rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-5">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${difficultyColor[path.difficulty]}`}>
          {path.difficulty === "low" ? (isEs ? "Fácil" : "Easy") : path.difficulty === "medium" ? (isEs ? "Moderado" : "Moderate") : (isEs ? "Difícil" : "Hard")}
        </span>
        <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-600">
          {t(timeframeLabels[path.timeframe], locale)}
        </span>
      </div>
      <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">{t(path.title, locale)}</h3>
      <p className="mt-2 text-sm text-stone-600 line-clamp-2">{t(path.description, locale)}</p>

      <button onClick={() => setExpanded(!expanded)}
        className="mt-2 flex items-center gap-1 text-sm font-medium text-teal-700 dark:text-teal-400 hover:text-teal-900 dark:hover:text-teal-300">
        {expanded ? (isEs ? "Menos" : "Less") : (isEs ? "Ver estrategia" : "See strategy")}
        {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
      </button>

      {expanded && (
        <div className="mt-3 space-y-4 border-t border-stone-100 pt-3">
          <p className="text-sm text-stone-600 dark:text-stone-400">{t(path.description, locale)}</p>
          {/* Two-column: Labor-friendly vs. Operational */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-green-200 bg-green-50 p-3">
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-green-700">
                {isEs ? "Por qué los sindicatos lo apoyan" : "Why Unions Support This"}
              </p>
              <p className="text-sm text-green-800">{t(path.laborFriendly, locale)}</p>
            </div>
            <div className="rounded-lg border border-teal-200 bg-teal-50 p-3">
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-teal-700">
                {isEs ? "El caso operativo" : "The Operational Case"}
              </p>
              <p className="text-sm text-teal-800">{t(path.operationalCase, locale)}</p>
            </div>
          </div>
          {/* Examples */}
          {path.examples.length > 0 && (
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-stone-500">
                {isEs ? "Ejemplos" : "Examples"}
              </p>
              <ul className="space-y-1">
                {path.examples.map((ex, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-stone-600 dark:text-stone-400">
                    <CheckCircle2 className="mt-0.5 size-3 shrink-0 text-teal-500" />
                    {t(ex, locale)}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Implementation steps */}
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-stone-500">
              {isEs ? "Pasos de implementación" : "Implementation Steps"}
            </p>
            <ol className="list-inside list-decimal space-y-1 text-sm text-stone-600 dark:text-stone-400">
              {path.implementationSteps.map((step, i) => (
                <li key={i}>{t(step, locale)}</li>
              ))}
            </ol>
          </div>
          {/* Sources */}
          {path.sources.length > 0 && (
            <div className="space-y-1">
              {path.sources.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-teal-600 hover:underline">
                  <ExternalLink className="size-3" /> {s.title}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

type Tab = "overview" | "cases" | "news" | "paths" | "dates" | "history" | "reading";

export default function LaborRelationsPage() {
  const locale = useLocale();
  const isEs = locale === "es";

  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [caseTypeFilter, setCaseTypeFilter] = useState<LaborCaseType | "all">("all");
  const [postureFilter, setPostureFilter] = useState<LaborRelationsPosture | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const stats = useMemo(() => getLaborStats(), []);
  const upcomingMilestones = useMemo(() => getUpcomingMilestones(90), []);
  const regionalDensity = useMemo(() => getRegionalDensity(), []);
  const laborIntel = useMemo(() => getLaborRelatedIntel(), []);
  const laborAdvocacy = useMemo(() => getLaborRelatedAdvocacy(), []);

  const filteredCases = useMemo(() => {
    let cases = getLaborCases(
      caseTypeFilter !== "all" || postureFilter !== "all"
        ? {
            ...(caseTypeFilter !== "all" ? { caseType: caseTypeFilter } : {}),
            ...(postureFilter !== "all" ? { posture: postureFilter } : {}),
          }
        : undefined,
    );
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      cases = cases.filter(
        (c) =>
          t(c.title, locale).toLowerCase().includes(q) ||
          t(c.summary, locale).toLowerCase().includes(q) ||
          c.parties.unions.some((u) => u.toLowerCase().includes(q)) ||
          c.parties.employers.some((e) => e.toLowerCase().includes(q)) ||
          c.tags.some((tag) => tag.toLowerCase().includes(q)),
      );
    }
    return cases;
  }, [caseTypeFilter, postureFilter, searchQuery, locale]);

  const tabs: { id: Tab; label: { en: string; es: string }; icon: React.ElementType }[] = [
    { id: "overview", label: { en: "Landscape", es: "Panorama" }, icon: Shield },
    { id: "cases", label: { en: "Active Cases", es: "Casos Activos" }, icon: Scale },
    { id: "news", label: { en: "News Feed", es: "Noticias" }, icon: FileText },
    { id: "paths", label: { en: "Paths Forward", es: "Caminos a Seguir" }, icon: Lightbulb },
    { id: "dates", label: { en: "Dates", es: "Fechas" }, icon: Calendar },
    { id: "history", label: { en: "History", es: "Historia" }, icon: History },
    { id: "reading", label: { en: "Reading", es: "Lecturas" }, icon: BookOpen },
  ];

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 px-4 pb-10 pt-6 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Breadcrumb
            items={[
              { label: isEs ? "Inicio" : "Home", href: "/" },
              { label: isEs ? "Estrategia" : "Strategy", href: "/strategy/guides" },
              { label: isEs ? "Relaciones Laborales" : "Labor Relations" },
            ]}
          />
          <div className="mt-4 flex items-center gap-3">
            <Handshake className="size-8 text-amber-400" />
            <h1 className="text-2xl font-extrabold sm:text-3xl">
              {isEs ? "Monitor de Relaciones Laborales FQHC" : "FQHC Labor Relations Monitor"}
            </h1>
          </div>
          <p className="mt-2 max-w-2xl text-sm text-stone-300">
            {isEs
              ? "Inteligencia estratégica sobre casos laborales activos, dinámicas sindicales y estrategias que son tanto favorables al trabajador como operativamente posibles."
              : "Strategic intelligence on active labor cases, union dynamics, and strategies that are both labor-friendly and operationally feasible."}
          </p>

          {/* Stats bar */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: isEs ? "FQHCs Sindicalizados" : "Unionized FQHCs", value: `${stats.unionizedCount} / ${stats.totalFqhcs}` },
              { label: isEs ? "Casos Activos" : "Active Cases", value: String(stats.activeCases) },
              { label: isEs ? "Próximas Fechas" : "Upcoming Deadlines", value: String(stats.upcomingDeadlines) },
              { label: isEs ? "Asociaciones" : "Partnerships", value: String(stats.partnershipCount) },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg bg-white/10 px-4 py-3 text-center backdrop-blur-sm">
                <p className="text-xl font-bold text-amber-400">{stat.value}</p>
                <p className="text-xs text-stone-300">{stat.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-stone-400">
            {isEs ? "Última actualización:" : "Last updated:"} {LABOR_LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-0 z-20 border-b border-stone-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 sm:px-6 lg:px-8">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "border-teal-600 text-teal-700"
                    : "border-transparent text-stone-500 hover:border-stone-300 hover:text-stone-700"
                }`}
              >
                <TabIcon className="size-4" />
                {t(tab.label, locale)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ── Tab: Landscape Overview ── */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <PostureSpectrum cases={LABOR_CASES} locale={locale} />

            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              {isEs ? "Temas del Panorama" : "Landscape Themes"}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {LANDSCAPE_THEMES.map((theme) => (
                <ThemeCard key={theme.id} theme={theme} locale={locale} />
              ))}
            </div>

            {/* Regional Density Table */}
            <div className="rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-5">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-stone-500">
                {isEs ? "Densidad Sindical por Región" : "Union Density by Region"}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-stone-200 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                      <th className="py-2 pr-4">{isEs ? "Región" : "Region"}</th>
                      <th className="py-2 pr-4 text-right">{isEs ? "Total" : "Total"}</th>
                      <th className="py-2 pr-4 text-right">{isEs ? "Sindicalizados" : "Unionized"}</th>
                      <th className="py-2 pr-4 text-right">{isEs ? "Densidad" : "Density"}</th>
                      <th className="py-2">{isEs ? "Sindicatos" : "Unions"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regionalDensity.map((r) => (
                      <tr key={r.region} className="border-b border-stone-100">
                        <td className="py-2 pr-4 font-medium text-stone-900 dark:text-stone-100">{r.region}</td>
                        <td className="py-2 pr-4 text-right text-stone-600">{r.totalFqhcs}</td>
                        <td className="py-2 pr-4 text-right text-stone-600">{r.unionizedFqhcs}</td>
                        <td className="py-2 pr-4 text-right">
                          <span className={`font-semibold ${r.density > 10 ? "text-purple-700" : r.density > 0 ? "text-amber-700" : "text-stone-400"}`}>
                            {r.density}%
                          </span>
                        </td>
                        <td className="py-2">
                          <div className="flex flex-wrap gap-1">
                            {r.primaryUnions.slice(0, 3).map((u) => (
                              <span key={u} className="rounded bg-purple-50 px-1.5 py-0.5 text-xs text-purple-600">{u}</span>
                            ))}
                            {r.primaryUnions.length > 3 && (
                              <span className="rounded bg-stone-100 px-1.5 py-0.5 text-xs text-stone-500">+{r.primaryUnions.length - 3}</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Tab: Active Cases ── */}
        {activeTab === "cases" && (
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder={isEs ? "Buscar casos..." : "Search cases..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-lg border border-stone-200 py-2 pl-9 pr-4 text-sm focus:border-teal-500 focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-1">
                {(["all", ...Object.keys(CASE_TYPE_META)] as (LaborCaseType | "all")[]).map((ct) => (
                  <button
                    key={ct}
                    onClick={() => setCaseTypeFilter(ct)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      caseTypeFilter === ct
                        ? "bg-teal-700 text-white"
                        : "bg-stone-100 dark:bg-stone-800 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {ct === "all" ? (isEs ? "Todos" : "All") : t(CASE_TYPE_META[ct].label, locale)}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-1">
                {(["all", ...Object.keys(POSTURE_META)] as (LaborRelationsPosture | "all")[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPostureFilter(p)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      postureFilter === p
                        ? "bg-stone-800 text-white"
                        : "bg-stone-100 dark:bg-stone-800 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {p === "all" ? (isEs ? "Toda postura" : "Any posture") : t(POSTURE_META[p].label, locale)}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-sm text-stone-500">
              {filteredCases.length} {isEs ? "casos" : "cases"}
            </p>

            <div className="grid gap-4">
              {filteredCases.map((c) => (
                <CaseCard key={c.id} c={c} locale={locale} />
              ))}
            </div>
          </div>
        )}

        {/* ── Tab: News Feed ── */}
        {activeTab === "news" && (
          <div className="space-y-4">
            <p className="text-sm text-stone-500">
              {laborIntel.length + laborAdvocacy.length} {isEs ? "elementos relacionados con trabajo" : "labor-related items"} {isEs ? "de inteligencia y defensa" : "from intelligence & advocacy feeds"}
            </p>
            <div className="grid gap-3">
              {laborIntel.map((item) => (
                <div key={item.id} className="rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-4">
                  <div className="mb-1 flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      item.impactLevel === "critical" ? "bg-red-100 text-red-700"
                        : item.impactLevel === "high" ? "bg-amber-100 text-amber-700"
                        : "bg-stone-100 dark:bg-stone-800 text-stone-600"
                    }`}>
                      {item.impactLevel}
                    </span>
                    <span className="text-xs text-stone-400">{item.date}</span>
                    <span className="text-xs text-stone-400">{item.category}</span>
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">{t(item.headline, locale)}</h4>
                  <p className="mt-1 line-clamp-2 text-sm text-stone-600 dark:text-stone-400">{t(item.summary, locale)}</p>
                  <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs text-teal-600 hover:underline">
                    <ExternalLink className="size-3" /> {item.sourceOrg}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Tab: Paths Forward ── */}
        {activeTab === "paths" && (
          <div className="space-y-4">
            <div className="rounded-lg border border-teal-200 bg-teal-50 p-4">
              <p className="text-sm text-teal-800">
                {isEs
                  ? "Cada estrategia está diseñada para ser tanto favorable al trabajador como operativamente viable. La columna verde muestra por qué los sindicatos la apoyan; la columna teal muestra el caso de negocio para los líderes de FQHCs."
                  : "Every strategy below is designed to be both labor-friendly and operationally feasible. The green column shows why unions support it; the teal column shows the business case for FQHC leaders."}
              </p>
            </div>
            <div className="grid gap-4">
              {PATHS_FORWARD.map((path) => (
                <PathCard key={path.id} path={path} locale={locale} />
              ))}
            </div>
          </div>
        )}

        {/* ── Tab: Key Dates ── */}
        {activeTab === "dates" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              {isEs ? "Próximos Hitos (90 días)" : "Upcoming Milestones (90 days)"}
            </h2>
            {upcomingMilestones.length === 0 ? (
              <p className="text-sm text-stone-500">{isEs ? "Sin hitos próximos" : "No upcoming milestones"}</p>
            ) : (
              <div className="relative ml-4 border-l-2 border-stone-200 pl-6">
                {upcomingMilestones.map((c) => {
                  const days = daysUntil(c.nextMilestone!.date);
                  const isUrgent = days <= 14;
                  const Icon = CASE_ICONS[c.caseType] || Clock;
                  return (
                    <div key={c.id} className="relative mb-6 last:mb-0">
                      <div className={`absolute -left-[29px] top-1 size-4 rounded-full border-2 border-white ${isUrgent ? "bg-amber-500" : "bg-teal-500"}`} />
                      <div className={`rounded-lg border p-4 ${isUrgent ? "border-amber-300 bg-amber-50" : "border-stone-200 bg-white"}`}>
                        <div className="flex items-center gap-2">
                          <Icon className="size-4 text-stone-500" />
                          <span className={`text-sm font-bold ${isUrgent ? "text-amber-800" : "text-stone-900"}`}>
                            {new Date(c.nextMilestone!.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                          </span>
                          <span className={`text-xs font-semibold ${isUrgent ? "text-amber-600" : "text-stone-400"}`}>
                            ({days} {isEs ? "días" : "days"})
                          </span>
                        </div>
                        <p className="mt-1 text-sm font-medium text-stone-800 dark:text-stone-200">{t(c.title, locale)}</p>
                        <p className="text-sm text-stone-600 dark:text-stone-400">{t(c.nextMilestone!.description, locale)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* All case dates reference */}
            <div className="mt-8 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-5">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-stone-500">
                {isEs ? "Referencia Completa de Fechas" : "Complete Date Reference"}
              </h3>
              <div className="space-y-2">
                {LABOR_CASES.filter((c) => c.nextMilestone).sort((a, b) => a.nextMilestone!.date.localeCompare(b.nextMilestone!.date)).map((c) => {
                  const days = daysUntil(c.nextMilestone!.date);
                  const isPast = days < 0;
                  return (
                    <div key={c.id} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${isPast ? "bg-stone-50 text-stone-400" : "text-stone-700"}`}>
                      <span className="w-24 shrink-0 text-xs font-semibold">{c.nextMilestone!.date}</span>
                      <span className="flex-1">{t(c.title, locale)}</span>
                      <span className={`text-xs ${days <= 14 && days >= 0 ? "font-bold text-amber-600" : ""}`}>
                        {isPast ? (isEs ? "Pasado" : "Past") : `${days}d`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── Tab: History ── */}
        {activeTab === "history" && (
          <div className="space-y-4">
            <p className="text-sm text-stone-500">
              {isEs
                ? "Hitos clave en la historia de las relaciones laborales de los centros de salud comunitarios de California."
                : "Key milestones in the history of California community health center labor relations."}
            </p>
            <div className="relative ml-4 border-l-2 border-purple-200 pl-6">
              {LABOR_HISTORY_TIMELINE.map((evt) => (
                <div key={evt.year + evt.significance} className="relative mb-6 last:mb-0">
                  <div className="absolute -left-[29px] top-1 flex size-5 items-center justify-center rounded-full border-2 border-white bg-purple-500 text-[8px] font-bold text-white">
                    {String(evt.year).slice(-2)}
                  </div>
                  <div className="rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-4">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="rounded bg-purple-100 px-2 py-0.5 text-xs font-bold text-purple-700">{evt.year}</span>
                      <span className="text-xs text-stone-400">{evt.significance}</span>
                    </div>
                    <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">{t(evt.title, locale)}</h4>
                    <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{t(evt.description, locale)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Tab: Reading List ── */}
        {activeTab === "reading" && (
          <div className="space-y-4">
            <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
              <p className="text-sm text-purple-800">
                {isEs
                  ? "Lecturas esenciales sobre relaciones laborales en centros de salud comunitarios. La intersección de organización laboral y FQHCs está sub-estudiada — esta bibliografía curada llena el vacío."
                  : "Essential readings on community health center labor relations. The intersection of labor organizing and FQHCs is under-studied — this curated bibliography fills the gap."}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {LABOR_BIBLIOGRAPHY.map((entry) => {
                const typeColors: Record<string, string> = {
                  book: "bg-amber-100 text-amber-700",
                  paper: "bg-blue-100 text-blue-700",
                  report: "bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-400",
                  article: "bg-green-100 text-green-700",
                  archive: "bg-purple-100 text-purple-700",
                };
                return (
                  <a
                    key={entry.id}
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-4 transition-colors hover:border-teal-300 dark:hover:border-teal-600"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${typeColors[entry.type] || "bg-stone-100 dark:bg-stone-800 text-stone-600"}`}>
                        {entry.type}
                      </span>
                      <span className="text-xs text-stone-400">{entry.year}</span>
                    </div>
                    <h4 className="text-sm font-bold text-stone-900 group-hover:text-teal-700">{entry.title}</h4>
                    <p className="mt-0.5 text-xs font-medium text-stone-500">{entry.author}</p>
                    <p className="mt-2 line-clamp-3 text-sm text-stone-600 dark:text-stone-400">{t(entry.description, locale)}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {entry.topics.map((topic) => (
                        <span key={topic} className="rounded bg-stone-100 px-1.5 py-0.5 text-[10px] text-stone-500">{topic}</span>
                      ))}
                    </div>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs text-teal-600">
                      <ExternalLink className="size-3" /> {isEs ? "Leer" : "Read"}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Cross-references footer */}
        <div className="mt-12 grid gap-4 border-t border-stone-200 pt-8 sm:grid-cols-3">
          <Link href="/unions" className="group rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-4 transition-colors hover:border-teal-300 dark:hover:border-teal-600">
            <Users className="size-5 text-purple-600" />
            <p className="mt-2 text-sm font-bold text-stone-900 group-hover:text-teal-700">
              {isEs ? "Directorio de Sindicatos" : "Union Directory"}
            </p>
            <p className="text-xs text-stone-500">{isEs ? "Perfiles, historia, recursos" : "Profiles, history, resources"}</p>
          </Link>
          <Link href="/strategy/advocacy" className="group rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-4 transition-colors hover:border-teal-300 dark:hover:border-teal-600">
            <Shield className="size-5 text-teal-600" />
            <p className="mt-2 text-sm font-bold text-stone-900 group-hover:text-teal-700">
              {isEs ? "Observatorio de Defensa" : "Advocacy Watch"}
            </p>
            <p className="text-xs text-stone-500">{isEs ? "Legislación, coaliciones, acciones legales" : "Legislation, coalitions, legal actions"}</p>
          </Link>
          <Link href="/directory" className="group rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-4 transition-colors hover:border-teal-300 dark:hover:border-teal-600">
            <FileText className="size-5 text-amber-600" />
            <p className="mt-2 text-sm font-bold text-stone-900 group-hover:text-teal-700">
              {isEs ? "Directorio FQHC" : "FQHC Directory"}
            </p>
            <p className="text-xs text-stone-500">{isEs ? "214 perfiles con datos sindicales" : "214 profiles with union data"}</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
