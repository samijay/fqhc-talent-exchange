// FQHC Talent — Intelligence Dashboard (Homepage)
"use client";

import { useState, useMemo } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import {
  ArrowRight,
  Star,
  MapPin,
  Building2,
  Users,
  AlertTriangle,
  Clock,
  Activity,
  Shield,
  FileText,
  Newspaper,
  BookOpen,
  Briefcase,
  Brain,
  Cpu,
  Calendar,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  BarChart3,
  TrendingUp,
  TrendingDown,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import { IntelCard } from "@/components/intel/IntelCard";
import { californiaFQHCs } from "@/lib/california-fqhcs";
import {
  getMarketOverview,
  getRegionalSnapshots,
  getRoleDemand,
  getFundingCliffs,
} from "@/lib/market-intelligence";
import { getLayoffStats } from "@/lib/california-fqhc-layoffs";
import {
  getIntelItems,
  getDeadlineItems,
  getStrategyItems,
  getIntelSources,
  INTEL_CATEGORIES,
  INTEL_LAST_UPDATED,
  IMPACT_STYLES,
  IMPACT_LABELS,
  type IntelItem,
} from "@/lib/fqhc-news-intel";
import { calculateResilienceScore } from "@/lib/fqhc-resilience";
import { BLOG_POSTS, type BlogPost } from "@/lib/blog-posts";

/* ---------- Module-level data (computed once) ---------- */
const overview = getMarketOverview();
const fundingCliffs = getFundingCliffs();
const upcomingCliffs = fundingCliffs.filter((c) => !c.isPast).slice(0, 4);
const nextCliff = upcomingCliffs[0];
const layoffStats = getLayoffStats();
const allIntelItems = getIntelItems();
const regionalSnapshots = getRegionalSnapshots();
const roleDemand = getRoleDemand();
const deadlineItems = getDeadlineItems();
const strategyItems = getStrategyItems();
const allSources = getIntelSources();

/* ---------- Helpers ---------- */
const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

function formatDate(dateStr: string, locale: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(locale === "es" ? "es-US" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatSalary(amount: number): string {
  return amount >= 1000
    ? `$${Math.round(amount / 1000)}K`
    : `$${amount.toLocaleString()}`;
}

/* ---------- Three-way split: Breaking News / Strategic Intelligence / Articles ---------- */

/* News categories = external events (things that happened) */
const NEWS_CATEGORIES = new Set([
  "legislation",
  "lobbying",
  "patient-story",
  "merger-acquisition",
  "funding",
  "workforce",
  "undocumented-access",
]);

/* Intelligence categories = strategic analysis & recommendations */
const INTEL_STRATEGY_CATEGORIES = new Set(["change-management"]);

/* Breaking News feed: external events, sorted newest first */
const newsFeed = [
  ...allIntelItems.filter((i) => NEWS_CATEGORIES.has(i.category)),
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

/* Strategic Intelligence feed: analysis & strategy items */
const intelFeed = [
  ...allIntelItems.filter((i) => INTEL_STRATEGY_CATEGORIES.has(i.category)),
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

/* Articles feed: blog posts */
const articlesFeed = [...BLOG_POSTS].sort(
  (a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime(),
);

/* News filter categories */
const NEWS_FILTER_CATEGORIES = [
  { id: "all" as const, en: "All", es: "Todo" },
  ...INTEL_CATEGORIES.filter(
    (cat) =>
      NEWS_CATEGORIES.has(cat.id) &&
      allIntelItems.some((i) => i.category === cat.id),
  ),
];

/* Intel filter categories */
const INTEL_FILTER_CATEGORIES = [
  { id: "all" as const, en: "All", es: "Todo" },
  ...INTEL_CATEGORIES.filter(
    (cat) =>
      INTEL_STRATEGY_CATEGORIES.has(cat.id) &&
      allIntelItems.some((i) => i.category === cat.id),
  ),
];

const maxJobCount = Math.max(...roleDemand.map((r) => r.jobCount), 1);

/* ================================================================== */
/*  Sub-components                                                      */
/* ================================================================== */

function BlogArticleCard({
  post,
  locale,
  isEs,
}: {
  post: BlogPost;
  locale: string;
  isEs: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block rounded-xl border border-stone-200 bg-white border-l-4 border-l-indigo-400 p-4 transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-1">
            <Badge
              variant="outline"
              className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 border-indigo-200"
            >
              <Newspaper className="size-3 mr-0.5" />
              {isEs ? "Artículo" : "Article"}
            </Badge>
            <span className="text-[11px] text-stone-400">
              {formatDate(post.isoDate, locale)}
            </span>
            <span className="text-[10px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded-full">
              {isEs ? post.esCategory : post.category}
            </span>
          </div>
          <h3 className="font-semibold text-stone-800 leading-snug">
            {isEs ? post.esTitle : post.title}
          </h3>
          <p className="mt-1 text-sm text-stone-500 leading-relaxed line-clamp-2">
            {isEs ? post.esDescription : post.description}
          </p>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-[11px] text-stone-400">
          {isEs ? post.esReadTime : post.readTime}
        </span>
        <span className="text-xs font-medium text-teal-700">
          {isEs ? "Leer más" : "Read more"} →
        </span>
      </div>
    </Link>
  );
}

function DemandBadge({ signal }: { signal: "hot" | "steady" | "cooling" }) {
  const config = {
    hot: {
      bg: "bg-green-100 text-green-700",
      icon: TrendingUp,
      label: "Hot",
    },
    steady: {
      bg: "bg-blue-100 text-blue-700",
      icon: BarChart3,
      label: "Steady",
    },
    cooling: {
      bg: "bg-red-100 text-red-700",
      icon: TrendingDown,
      label: "Cooling",
    },
  };
  const { bg, icon: BadgeIcon, label } = config[signal];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${bg}`}
    >
      <BadgeIcon className="h-3 w-3" />
      {label}
    </span>
  );
}

/* ================================================================== */
/*  Homepage                                                           */
/* ================================================================== */

export default function Home() {
  const locale = useLocale();
  const isEs = locale === "es";

  const [newsFilter, setNewsFilter] = useState<string>("all");
  const [newsRegion, setNewsRegion] = useState<string>("all");
  const [intelFilter, setIntelFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAllNews, setShowAllNews] = useState(false);
  const [showAllIntel, setShowAllIntel] = useState(false);

  /* Sidebar state */
  const [expandedCliff, setExpandedCliff] = useState<string | null>(null);
  const [expandedDeadline, setExpandedDeadline] = useState<string | null>(null);
  const [expandedStrategy, setExpandedStrategy] = useState<string | null>(null);

  /* Below-fold sections state */
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);
  const [showAllRoles, setShowAllRoles] = useState(false);
  const [showMarketData, setShowMarketData] = useState(false);

  /* Unique regions from news items for the regional filter */
  const newsRegions = useMemo(() => {
    const regions = new Set(newsFeed.map((item) => item.region));
    return Array.from(regions).sort();
  }, []);

  /* Filtered news (external events) — by category + region */
  const filteredNews = useMemo(() => {
    let items = newsFeed;
    if (newsFilter !== "all") {
      items = items.filter((item) => item.category === newsFilter);
    }
    if (newsRegion !== "all") {
      items = items.filter((item) => item.region === newsRegion);
    }
    return items;
  }, [newsFilter, newsRegion]);
  const displayedNews = showAllNews ? filteredNews : filteredNews.slice(0, 8);

  /* Filtered intel (strategic analysis) */
  const filteredIntel = useMemo(() => {
    if (intelFilter === "all") return intelFeed;
    return intelFeed.filter((item) => item.category === intelFilter);
  }, [intelFilter]);
  const displayedIntel = showAllIntel ? filteredIntel : filteredIntel.slice(0, 6);
  const displayedRoles = showAllRoles ? roleDemand : roleDemand.slice(0, 8);

  return (
    <div className="bg-stone-50">
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 flex items-center justify-center gap-2">
              <Activity className="size-5 text-teal-400" />
              <span className="text-sm font-medium uppercase tracking-wider text-teal-400">
                {isEs
                  ? "Inteligencia Ejecutiva FQHC"
                  : "FQHC Executive Intelligence"}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              {isEs
                ? "Dashboard de Inteligencia FQHC"
                : "FQHC Intelligence Dashboard"}
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-stone-300 sm:text-lg">
              {isEs
                ? "Legislación, financiamiento, fuerza laboral, IA, y análisis estratégico — actualizado diariamente."
                : "Legislation, funding, workforce, AI, and strategic analysis — updated daily."}
            </p>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-stone-400">
              <Clock className="size-3" />
              <span>
                {isEs ? "Última actualización:" : "Last updated:"}{" "}
                {INTEL_LAST_UPDATED}
              </span>
            </div>
          </div>

          {/* Stat strip */}
          <div className="mt-8 mx-auto max-w-3xl grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg bg-white/10 backdrop-blur p-3 text-center">
              <div className="text-xs text-stone-400 uppercase tracking-wide">
                {isEs ? "FQHCs Rastreados" : "FQHCs Tracked"}
              </div>
              <div className="text-2xl font-bold text-white">
                {overview.totalFQHCs}
              </div>
            </div>
            <div className="rounded-lg bg-white/10 backdrop-blur p-3 text-center">
              <div className="text-xs text-stone-400 uppercase tracking-wide">
                {isEs ? "Empleos Activos" : "Active Jobs"}
              </div>
              <div className="text-2xl font-bold text-white">
                {overview.totalJobs}+
              </div>
            </div>
            <div className="rounded-lg bg-white/10 backdrop-blur p-3 text-center">
              <div className="text-xs text-red-400 uppercase tracking-wide">
                {isEs ? "Trabajadores Desplazados" : "Workers Displaced"}
              </div>
              <div className="text-2xl font-bold text-red-400">
                {overview.totalLayoffWorkers.toLocaleString()}+
              </div>
            </div>
            <div className="rounded-lg bg-white/10 backdrop-blur p-3 text-center">
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

      {/* ==================== BREAKING NEWS + SIDEBAR ==================== */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-stone-900 sm:text-xl flex items-center gap-2">
              <AlertTriangle className="size-5 text-red-600" />
              {isEs ? "Noticias de Última Hora" : "Breaking News"}
            </h2>
            <span className="text-xs text-stone-400">
              {isEs ? "Actualizado" : "Updated"}: {INTEL_LAST_UPDATED}
            </span>
          </div>

          {/* Category filter pills + Regional dropdown */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {NEWS_FILTER_CATEGORIES.map((cat) => {
              const isActive = newsFilter === cat.id;
              const count =
                cat.id === "all"
                  ? newsFeed.length
                  : newsFeed.filter((i) => i.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setNewsFilter(cat.id);
                    setShowAllNews(false);
                  }}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? "bg-red-700 text-white"
                      : "bg-white border border-stone-200 text-stone-600 hover:border-red-300 hover:text-red-700"
                  }`}
                >
                  {isEs ? cat.es : cat.en}
                  <span
                    className={`ml-1.5 ${isActive ? "text-red-200" : "text-stone-400"}`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}

            {/* Regional filter dropdown */}
            <div className="ml-auto flex items-center gap-1.5">
              <MapPin className="size-3.5 text-stone-400" />
              <select
                value={newsRegion}
                onChange={(e) => {
                  setNewsRegion(e.target.value);
                  setShowAllNews(false);
                }}
                className="rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs text-stone-700 focus:border-teal-500 focus:outline-none"
              >
                <option value="all">
                  {isEs ? "Todas las Regiones" : "All Regions"}
                </option>
                {newsRegions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* News feed column (2/3) */}
            <div className="lg:col-span-2">
              <div className="space-y-3">
                {displayedNews.map((item) => (
                  <IntelCard
                    key={item.id}
                    item={item}
                    locale={locale}
                    isEs={isEs}
                    isExpanded={expandedId === item.id}
                    onToggle={() =>
                      setExpandedId(
                        expandedId === item.id ? null : item.id,
                      )
                    }
                  />
                ))}
              </div>

              {!showAllNews && filteredNews.length > 8 && (
                <div className="mt-6 text-center">
                  <Button variant="outline" onClick={() => setShowAllNews(true)}>
                    {isEs
                      ? `Ver las ${filteredNews.length} Noticias`
                      : `View All ${filteredNews.length} News`}{" "}
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar (1/3) */}
            <aside className="space-y-6">
              <div className="lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto space-y-6 lg:pr-1">
                {/* Policy Timeline — Funding Cliffs + Deadlines + Strategy */}
                <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="size-4 text-amber-600" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-amber-700">
                      {isEs ? "Cronograma de Políticas" : "Policy Timeline"}
                    </h3>
                    <Badge
                      variant="outline"
                      className="text-[10px] ml-auto text-amber-700 border-amber-300"
                    >
                      {upcomingCliffs.length + deadlineItems.length}
                    </Badge>
                  </div>

                  {/* Funding Cliffs — compact expandable rows */}
                  {upcomingCliffs.length > 0 && (
                    <div className="space-y-1.5 mb-3">
                      <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-1">
                        {isEs ? "Riesgos Fiscales" : "Funding Cliffs"}
                      </p>
                      {upcomingCliffs.map((cliff) => {
                        const isOpen = expandedCliff === cliff.id;
                        const countColor =
                          cliff.daysUntil < 90
                            ? "text-red-700"
                            : cliff.daysUntil < 180
                              ? "text-amber-700"
                              : "text-stone-700";
                        const urgencyBg =
                          cliff.daysUntil < 90
                            ? "border-red-200 bg-red-50/50"
                            : cliff.daysUntil < 180
                              ? "border-amber-200 bg-amber-50/50"
                              : "border-stone-200 bg-white";

                        return (
                          <div
                            key={cliff.id}
                            className={`rounded-lg border ${urgencyBg}`}
                          >
                            <button
                              onClick={() =>
                                setExpandedCliff(isOpen ? null : cliff.id)
                              }
                              className="w-full flex items-center gap-2 px-3 py-2 text-left"
                            >
                              <span
                                className={`text-sm font-bold tabular-nums ${countColor} w-10 shrink-0`}
                              >
                                {cliff.daysUntil}d
                              </span>
                              <h4 className="font-medium text-stone-800 text-xs leading-snug flex-1 line-clamp-1">
                                {t(cliff.title, locale)}
                              </h4>
                              <ChevronDown
                                className={`h-3 w-3 text-stone-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                              />
                            </button>
                            {isOpen && (
                              <div className="px-3 pb-2.5 pt-0.5 border-t border-stone-200/50">
                                <h4 className="font-semibold text-stone-800 text-xs leading-snug">
                                  {t(cliff.title, locale)}
                                </h4>
                                <div className="mt-1 flex flex-wrap gap-2 text-[10px]">
                                  {cliff.dollarAmount && (
                                    <span className="text-stone-600">
                                      {cliff.dollarAmount}
                                    </span>
                                  )}
                                  {cliff.peopleAffected && (
                                    <span className="text-red-600">
                                      {cliff.peopleAffected}
                                    </span>
                                  )}
                                  <span className="text-stone-400">
                                    {cliff.category}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Deadline items — compact expandable rows */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                      {isEs ? "Fechas de Políticas" : "Policy Dates"}
                    </p>
                    {deadlineItems.map((item) => {
                      const isPast =
                        new Date(item.date + "T00:00:00") < new Date();
                      const isOpen = expandedDeadline === item.id;
                      return (
                        <div
                          key={item.id}
                          className={`rounded-lg border ${
                            isPast
                              ? "border-stone-200 bg-white"
                              : "border-red-200 bg-red-50/50"
                          }`}
                        >
                          <button
                            onClick={() =>
                              setExpandedDeadline(isOpen ? null : item.id)
                            }
                            className="w-full flex items-center gap-2 px-3 py-2 text-left"
                          >
                            <Badge
                              variant="outline"
                              className={`text-[9px] font-semibold shrink-0 ${IMPACT_STYLES[item.impactLevel]}`}
                            >
                              {isPast
                                ? isEs
                                  ? "Vigente"
                                  : "Active"
                                : isEs
                                  ? "Próximo"
                                  : "Upcoming"}
                            </Badge>
                            <span className="text-[10px] text-stone-400 shrink-0">
                              {formatDate(item.date, locale)}
                            </span>
                            <ChevronDown
                              className={`h-3 w-3 text-stone-400 shrink-0 ml-auto transition-transform ${isOpen ? "rotate-180" : ""}`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-3 pb-2.5 pt-0.5 border-t border-stone-200/50">
                              <h4 className="font-semibold text-stone-800 text-xs leading-snug">
                                {t(item.headline, locale)}
                              </h4>
                              <p className="mt-1 text-[11px] text-stone-500 leading-relaxed">
                                {t(item.summary, locale)}
                              </p>
                              <a
                                href={item.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 text-[10px] text-teal-700 hover:underline inline-block"
                              >
                                {item.sourceOrg} →
                              </a>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <Link
                    href="/funding-impact"
                    className="mt-4 text-sm text-teal-700 hover:text-teal-900 font-medium inline-flex items-center gap-1"
                  >
                    {isEs ? "Rastreador Completo" : "Full Impact Tracker"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {/* Strategic Insights — Condensed & Expandable */}
                <div className="rounded-2xl border border-teal-200 bg-teal-50/50 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="size-4 text-teal-700" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-teal-700">
                      {isEs ? "Guías Estratégicas" : "Strategic Insights"}
                    </h3>
                    <Badge
                      variant="outline"
                      className="text-[10px] ml-auto text-teal-700 border-teal-300"
                    >
                      {strategyItems.length}
                    </Badge>
                  </div>
                  <div className="space-y-1.5">
                    {strategyItems.map((item) => {
                      const isOpen = expandedStrategy === item.id;
                      return (
                        <div
                          key={item.id}
                          className="rounded-lg border border-stone-200 bg-white"
                        >
                          <button
                            onClick={() =>
                              setExpandedStrategy(isOpen ? null : item.id)
                            }
                            className="w-full flex items-center gap-2 px-3 py-2 text-left"
                          >
                            <h4 className="font-medium text-stone-800 text-xs leading-snug flex-1 line-clamp-1">
                              {t(item.headline, locale)}
                            </h4>
                            <ChevronDown
                              className={`h-3 w-3 text-stone-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-3 pb-2.5 pt-0.5 border-t border-stone-200/50">
                              <p className="text-[11px] text-stone-500 leading-relaxed">
                                {t(item.summary, locale)}
                              </p>
                              <a
                                href={item.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 text-[10px] text-teal-700 hover:underline inline-block"
                              >
                                {item.sourceOrg} →
                              </a>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <Link
                    href="/strategy/guides"
                    className="mt-4 text-sm text-teal-700 hover:text-teal-900 font-medium inline-flex items-center gap-1"
                  >
                    {isEs ? "Guías Ejecutivas" : "Executive Guides"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {/* Layoff Snapshot */}
                <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="size-4 text-red-600" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-red-700">
                      {isEs ? "Despidos" : "Layoffs"}
                    </h3>
                  </div>
                  <div className="text-2xl font-bold text-red-700">
                    {layoffStats.totalAffected.toLocaleString()}+
                  </div>
                  <div className="text-sm font-medium text-stone-700 mt-0.5">
                    {isEs ? "Trabajadores Desplazados" : "Workers Displaced"}
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    {layoffStats.uniqueOrgs}{" "}
                    {isEs ? "organizaciones" : "organizations"},{" "}
                    {layoffStats.regionsAffected}{" "}
                    {isEs ? "regiones" : "regions"}
                  </div>
                  <Link
                    href="/layoffs"
                    className="mt-2 text-xs font-medium text-red-700 hover:text-red-900 inline-flex items-center gap-1"
                  >
                    {isEs ? "Rastreador de Despidos" : "Layoff Tracker"}{" "}
                    <ArrowRight className="size-3" />
                  </Link>
                </div>

                {/* Newsletter Signup */}
                <NewsletterSignup
                  variant="card"
                  defaultAudience="intel-brief"
                  heading={{
                    en: "Weekly Intel Brief",
                    es: "Resumen Semanal de Inteligencia",
                  }}
                  subheading={{
                    en: "Policy, funding, workforce — in your inbox.",
                    es: "Políticas, financiamiento, fuerza laboral — en tu correo.",
                  }}
                />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ==================== STRATEGIC INTELLIGENCE ==================== */}
      {intelFeed.length > 0 && (
        <section className="py-8 sm:py-12 border-t border-stone-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-stone-900 sm:text-xl flex items-center gap-2">
                <Lightbulb className="size-5 text-teal-700" />
                {isEs ? "Inteligencia Estratégica" : "Strategic Intelligence"}
              </h2>
              <Badge variant="outline" className="text-xs text-teal-700 border-teal-300">
                {intelFeed.length} {isEs ? "análisis" : "analyses"}
              </Badge>
            </div>
            <p className="text-sm text-stone-500 mb-6">
              {isEs
                ? "Tácticas, playbooks y recomendaciones estratégicas para líderes de FQHC."
                : "Tactics, playbooks, and strategic recommendations for FQHC leaders."}
            </p>
            <div className="space-y-3">
              {displayedIntel.map((item) => (
                <IntelCard
                  key={item.id}
                  item={item}
                  locale={locale}
                  isEs={isEs}
                  isExpanded={expandedId === item.id}
                  onToggle={() =>
                    setExpandedId(
                      expandedId === item.id ? null : item.id,
                    )
                  }
                />
              ))}
            </div>
            {!showAllIntel && filteredIntel.length > 6 && (
              <div className="mt-6 text-center">
                <Button variant="outline" onClick={() => setShowAllIntel(true)}>
                  {isEs
                    ? `Ver los ${filteredIntel.length} Análisis`
                    : `View All ${filteredIntel.length} Analyses`}{" "}
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ==================== ARTICLES ==================== */}
      {articlesFeed.length > 0 && (
        <section className="py-8 sm:py-12 border-t border-stone-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-stone-900 sm:text-xl flex items-center gap-2">
                <Newspaper className="size-5 text-indigo-600" />
                {isEs ? "Artículos" : "Articles"}
              </h2>
              <Link
                href="/blog"
                className="text-sm font-medium text-teal-700 hover:text-teal-800 flex items-center gap-1"
              >
                {isEs ? "Ver Todos" : "View All"}
                <ArrowRight className="size-3" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {articlesFeed.slice(0, 6).map((post) => (
                <BlogArticleCard
                  key={post.slug}
                  post={post}
                  locale={locale}
                  isEs={isEs}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==================== REGIONAL MARKET SNAPSHOT ==================== */}
      <section className="py-8 sm:py-12 border-t border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="size-5 text-teal-600" />
            <h2 className="text-xl font-bold text-stone-800 sm:text-2xl">
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
                            {region.recentLayoffs}{" "}
                            {isEs ? "desplazados" : "displaced"}
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
        </div>
      </section>

      {/* ==================== WORKFORCE MARKET DATA ==================== */}
      <section className="py-8 sm:py-12 border-t border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setShowMarketData(!showMarketData)}
            className="flex items-center gap-2 mb-6 group"
          >
            <BarChart3 className="size-5 text-teal-600" />
            <h2 className="text-xl font-bold text-stone-800 sm:text-2xl">
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
                        <th className="text-left p-3">
                          {isEs ? "Rol" : "Role"}
                        </th>
                        <th className="text-right p-3">
                          {isEs ? "Empleos" : "Jobs"}
                        </th>
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
        </div>
      </section>

      {/* ==================== FEATURED FQHCS ==================== */}
      <section className="bg-white py-12 sm:py-16 border-t border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
              {isEs
                ? "FQHCs Destacados de California"
                : "Featured California FQHCs"}
            </h2>
            <p className="mt-3 text-stone-500">
              {isEs
                ? `Directorio de ${overview.totalFQHCs} centros de salud comunitarios con valoraciones, empleos y programas.`
                : `Directory of ${overview.totalFQHCs} community health centers with ratings, jobs, and programs.`}
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {californiaFQHCs
              .filter(
                (f) => f.glassdoorRating || parseInt(f.staffCount) > 500,
              )
              .slice(0, 6)
              .map((fqhc) => {
                const resilience = calculateResilienceScore(fqhc);
                const gradeColor =
                  resilience.grade === "A"
                    ? "bg-emerald-100 text-emerald-800"
                    : resilience.grade === "B"
                      ? "bg-teal-100 text-teal-800"
                      : resilience.grade === "C"
                        ? "bg-amber-100 text-amber-800"
                        : resilience.grade === "D"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-red-100 text-red-800";

                return (
                  <Link
                    key={fqhc.slug}
                    href={`/directory/${fqhc.slug}` as "/directory"}
                    className="group rounded-2xl border border-stone-200 bg-stone-50 p-6 transition-all hover:-translate-y-1 hover:border-teal-200 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-stone-900 group-hover:text-teal-700">
                          {fqhc.name}
                        </h3>
                        <p className="mt-1 flex items-center gap-1 text-sm text-stone-500">
                          <MapPin className="size-3.5" />
                          {fqhc.city}, CA
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {fqhc.glassdoorRating && (
                          <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1">
                            <Star className="size-3.5 fill-amber-500 text-amber-500" />
                            <span className="text-sm font-semibold text-amber-700">
                              {fqhc.glassdoorRating.toFixed(1)}
                            </span>
                          </div>
                        )}
                        <div
                          className={`flex items-center gap-1 rounded-lg px-2 py-1 ${gradeColor}`}
                          title={
                            isEs
                              ? "Puntuación de Resiliencia"
                              : "Resilience Score"
                          }
                        >
                          <Shield className="size-3.5" />
                          <span className="text-sm font-semibold">
                            {resilience.grade}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-4 text-xs text-stone-500">
                      <span className="flex items-center gap-1">
                        <Building2 className="size-3.5" />
                        {fqhc.siteCount} {isEs ? "sitios" : "sites"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="size-3.5" />
                        {fqhc.staffCount} {isEs ? "personal" : "staff"}
                      </span>
                      <span className="flex items-center gap-1 text-teal-600">
                        <Activity className="size-3.5" />
                        {resilience.overall}/100
                      </span>
                    </div>

                    <p className="mt-3 text-xs font-medium text-teal-700 opacity-0 transition-opacity group-hover:opacity-100">
                      {isEs ? "Ver perfil" : "View profile"}{" "}
                      <ArrowRight className="inline size-3" />
                    </p>
                  </Link>
                );
              })}
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="outline" size="lg" asChild>
              <Link href="/directory">
                {isEs
                  ? `Ver los ${overview.totalFQHCs} FQHCs`
                  : `View All ${overview.totalFQHCs} FQHCs`}{" "}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/strategy/resilience">
                <Shield className="size-4" />
                {isEs
                  ? "Scorecard de Resiliencia"
                  : "Resilience Scorecard"}{" "}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ==================== SOURCES INDEX ==================== */}
      <section className="py-8 sm:py-12 border-t border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
            <h2 className="text-lg font-bold text-stone-800 mb-3">
              {isEs ? "Índice de Fuentes" : "Sources Index"}
            </h2>
            <p className="text-sm text-stone-500 mb-4">
              {isEs
                ? "Toda la inteligencia proviene de fuentes primarias verificables."
                : "All intelligence is sourced from verifiable primary sources."}
            </p>
            <ul className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
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
          </div>
        </div>
      </section>

      {/* ==================== INTELLIGENCE TO ACTION ==================== */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-stone-800 to-stone-900 p-8 text-white text-center">
            <h2 className="text-2xl font-bold">
              {isEs
                ? "De la inteligencia a la acción"
                : "From Intelligence to Action"}
            </h2>
            <p className="mt-2 text-stone-300 max-w-lg mx-auto">
              {isEs
                ? "Guías ejecutivas, plantillas OKR, y rastreador de IA para convertir esta inteligencia en estrategia."
                : "Executive guides, OKR templates, and AI tracker to turn this intelligence into strategy."}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link href="/strategy/guides">
                <Button
                  size="lg"
                  className="bg-amber-500 text-stone-900 hover:bg-amber-400 font-semibold"
                >
                  {isEs ? "Guías Ejecutivas" : "Executive Guides"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/strategy/okrs">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 font-semibold"
                >
                  {isEs ? "Plantillas OKR" : "OKR Templates"}
                </Button>
              </Link>
              <Link href="/ai-tracker">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 font-semibold"
                >
                  {isEs ? "Rastreador de IA" : "AI Tracker"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== DATA DISCLAIMER ==================== */}
      <section className="bg-stone-50 py-6">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-xs text-stone-400">
            {isEs
              ? "Datos agregados de HRSA, BLS, CA EDD WARN Act, DHCS, y publicaciones de empleo de FQHCs. Actualizado marzo 2026."
              : "Data aggregated from HRSA, BLS, CA EDD WARN Act, DHCS, and FQHC job postings. Updated March 2026."}
          </p>
        </div>
      </section>
    </div>
  );
}
