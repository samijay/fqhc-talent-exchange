"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Search,
  Filter,
  MapPin,
  AlertTriangle,
  TrendingUp,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { IntelCard } from "@/components/intel/IntelCard";
import { t, formatDate } from "@/lib/i18n-helpers";
import {
  IMPACT_STYLES,
  IMPACT_LABELS,
  type IntelItem,
  type IntelCategory,
  type ImpactLevel,
} from "@/lib/fqhc-news-intel";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FundingCliffSerialized {
  title: { en: string; es: string };
  date: string;
  dollarAmount: string | null;
  peopleAffected: string | null;
  isPast: boolean;
  daysUntil: number;
}

interface AdvocacySerialized {
  id: string;
  headline: { en: string; es: string };
  summary: { en: string; es: string };
  status: string;
  followUpDate: string | null;
  region: string;
  category: string;
  sourceUrl: string;
  impactLevel: string;
}

interface Props {
  intelItems: IntelItem[];
  counts: Record<IntelCategory, number> & { total: number };
  categories: { id: IntelCategory; en: string; es: string; icon: string }[];
  fundingCliffs: FundingCliffSerialized[];
  advocacyItems: AdvocacySerialized[];
  advocacyCounts: { total: number; active: number; pendingVote: number; upcoming: number };
  regionSlugs: Record<string, string>;
  lastUpdated: string;
  advocacyLastUpdated: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const ITEMS_PER_PAGE = 20;

function daysUntil(d: string): number {
  return Math.max(0, Math.ceil((new Date(d).getTime() - Date.now()) / 86400000));
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function IntelligenceHub({
  intelItems,
  counts,
  categories,
  fundingCliffs,
  advocacyItems,
  advocacyCounts,
  regionSlugs,
  lastUpdated,
  advocacyLastUpdated,
}: Props) {
  const locale = useLocale();
  const isEs = locale === "es";

  // Filters
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<IntelCategory | "all">("all");
  const [impactFilter, setImpactFilter] = useState<ImpactLevel | "all">("all");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filtered items
  const filtered = useMemo(() => {
    let items = [...intelItems];
    if (categoryFilter !== "all") {
      items = items.filter((i) => i.category === categoryFilter);
    }
    if (impactFilter !== "all") {
      items = items.filter((i) => i.impactLevel === impactFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (i) =>
          i.headline.en.toLowerCase().includes(q) ||
          i.headline.es.toLowerCase().includes(q) ||
          i.summary.en.toLowerCase().includes(q) ||
          i.summary.es.toLowerCase().includes(q) ||
          i.sourceOrg.toLowerCase().includes(q) ||
          i.tags.some((tag) => tag.includes(q))
      );
    }
    return items;
  }, [intelItems, categoryFilter, impactFilter, search]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const upcomingCliffs = fundingCliffs.filter((c) => !c.isPast);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-teal-400">
            {isEs ? "Panel de Inteligencia" : "Intelligence Dashboard"}
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {isEs
              ? "Inteligencia en Tiempo Real para FQHCs de California"
              : "Real-Time Intelligence for California FQHCs"}
          </h1>
          <p className="mt-3 max-w-2xl text-stone-300">
            {isEs
              ? `${counts.total} elementos de inteligencia rastreados desde fuentes primarias. Legislación, financiamiento, fuerza laboral, abogacía, adopción de IA y análisis regional.`
              : `${counts.total} intelligence items tracked from primary sources. Legislation, funding, workforce, advocacy, AI adoption, and regional analysis.`}
          </p>

          {/* Stats bar */}
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <span className="rounded-full bg-white/10 px-3 py-1">
              <span className="font-bold text-teal-300">{counts.total}</span>{" "}
              {isEs ? "items totales" : "total items"}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1">
              <span className="font-bold text-red-300">
                {intelItems.filter((i) => i.impactLevel === "critical").length}
              </span>{" "}
              {isEs ? "críticos" : "critical"}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1">
              <span className="font-bold text-amber-300">
                {advocacyCounts.active}
              </span>{" "}
              {isEs ? "acciones de abogacía activas" : "active advocacy actions"}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1">
              <span className="font-bold text-stone-300">
                {isEs ? "Actualizado" : "Updated"} {lastUpdated}
              </span>
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* ── Main Column: Intel Feed ── */}
          <div className="lg:col-span-2">
            {/* Search + Filters */}
            <div className="mb-6 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder={isEs ? "Buscar inteligencia..." : "Search intelligence..."}
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setVisibleCount(ITEMS_PER_PAGE); }}
                  className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-sm text-stone-800 placeholder:text-stone-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => { setCategoryFilter("all"); setVisibleCount(ITEMS_PER_PAGE); }}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    categoryFilter === "all"
                      ? "bg-teal-700 text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {isEs ? "Todos" : "All"} ({counts.total})
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setCategoryFilter(cat.id); setVisibleCount(ITEMS_PER_PAGE); }}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      categoryFilter === cat.id
                        ? "bg-teal-700 text-white"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {isEs ? cat.es : cat.en} ({counts[cat.id] || 0})
                  </button>
                ))}
              </div>

              {/* Impact filter */}
              <div className="flex items-center gap-2">
                <Filter className="size-3.5 text-stone-400" />
                <span className="text-xs text-stone-500">{isEs ? "Impacto:" : "Impact:"}</span>
                {(["all", "critical", "high", "medium", "low"] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => { setImpactFilter(level); setVisibleCount(ITEMS_PER_PAGE); }}
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                      impactFilter === level
                        ? "bg-teal-700 text-white"
                        : level === "all"
                          ? "bg-stone-100 text-stone-600 hover:bg-stone-200"
                          : IMPACT_STYLES[level] + " hover:opacity-80"
                    }`}
                  >
                    {level === "all"
                      ? (isEs ? "Todos" : "All")
                      : t(IMPACT_LABELS[level], locale)}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <p className="mb-4 text-sm text-stone-500">
              {isEs
                ? `Mostrando ${visible.length} de ${filtered.length} resultados`
                : `Showing ${visible.length} of ${filtered.length} results`}
            </p>

            {/* Intel cards */}
            <div className="space-y-3">
              {visible.map((item) => (
                <IntelCard
                  key={item.id}
                  item={item}
                  locale={locale}
                  isEs={isEs}
                  isExpanded={expandedId === item.id}
                  onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
                />
              ))}
            </div>

            {/* Load more */}
            {hasMore && (
              <button
                onClick={() => setVisibleCount((v) => v + ITEMS_PER_PAGE)}
                className="mt-6 w-full rounded-xl border border-stone-200 bg-white py-3 text-sm font-medium text-teal-700 hover:bg-stone-50 transition-colors"
              >
                {isEs
                  ? `Cargar más (${filtered.length - visibleCount} restantes)`
                  : `Load more (${filtered.length - visibleCount} remaining)`}
              </button>
            )}

            {filtered.length === 0 && (
              <div className="rounded-xl border border-stone-200 bg-white p-8 text-center">
                <p className="text-stone-500">
                  {isEs ? "No se encontraron resultados." : "No results found."}
                </p>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">
            {/* Funding Cliffs */}
            {upcomingCliffs.length > 0 && (
              <div className="rounded-xl border border-red-200 bg-white p-5">
                <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-red-800">
                  <AlertTriangle className="size-4" />
                  {isEs ? "Fechas Críticas" : "Funding Cliffs"}
                </h2>
                <div className="space-y-3">
                  {upcomingCliffs.slice(0, 5).map((cliff, i) => {
                    const days = daysUntil(cliff.date);
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`shrink-0 text-center ${days <= 90 ? "text-red-600" : "text-amber-600"}`}>
                          <p className="text-lg font-bold">{days}</p>
                          <p className="text-xs">{isEs ? "días" : "days"}</p>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-stone-800">
                            {t(cliff.title, locale)}
                          </p>
                          {cliff.dollarAmount && (
                            <p className="text-xs text-red-600 font-medium">{cliff.dollarAmount}</p>
                          )}
                          {cliff.peopleAffected && (
                            <p className="text-xs text-stone-500">{cliff.peopleAffected}</p>
                          )}
                          <p className="text-xs text-stone-400 mt-0.5">
                            {formatDate(cliff.date, locale)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Advocacy Watch */}
            {advocacyItems.length > 0 && (
              <div className="rounded-xl border border-amber-200 bg-white p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-800">
                    <TrendingUp className="size-4" />
                    {isEs ? "Seguimiento de Abogacía" : "Advocacy Watch"}
                  </h2>
                  <Link
                    href={"/strategy/advocacy" as "/strategy/guides"}
                    className="text-xs font-medium text-teal-700 hover:text-teal-900"
                  >
                    {isEs ? "Ver todo" : "View all"} ({advocacyCounts.total}) →
                  </Link>
                </div>
                <div className="flex gap-2 mb-3">
                  <span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-700">
                    {advocacyCounts.active} {isEs ? "activas" : "active"}
                  </span>
                  {advocacyCounts.pendingVote > 0 && (
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                      {advocacyCounts.pendingVote} {isEs ? "votos" : "votes"}
                    </span>
                  )}
                </div>
                <div className="space-y-2.5">
                  {advocacyItems.slice(0, 5).map((item) => {
                    const days = item.followUpDate ? daysUntil(item.followUpDate) : null;
                    return (
                      <Link
                        key={item.id}
                        href={"/strategy/advocacy" as "/strategy/guides"}
                        className="flex items-center gap-2.5 rounded-lg border border-stone-100 p-2.5 transition-colors hover:border-teal-200 hover:bg-teal-50/30"
                      >
                        {days !== null && (
                          <div className={`shrink-0 text-center ${days <= 14 ? "text-red-600" : "text-amber-600"}`}>
                            <p className="text-base font-bold">{days}</p>
                            <p className="text-[10px]">{isEs ? "días" : "days"}</p>
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-stone-800">
                            {t(item.headline, locale)}
                          </p>
                          <p className="text-xs text-stone-400">{item.region}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Regional Intelligence */}
            <div className="rounded-xl border border-stone-200 bg-white p-5">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-stone-700">
                <MapPin className="size-4" />
                {isEs ? "Inteligencia Regional" : "Regional Intelligence"}
              </h2>
              <div className="grid grid-cols-1 gap-1.5">
                {Object.entries(regionSlugs).map(([name, slug]) => (
                  <Link
                    key={slug}
                    href={`/intelligence/${slug}`}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-stone-700 hover:bg-teal-50 hover:text-teal-800 transition-colors"
                  >
                    <span>{name}</span>
                    <ChevronRight className="size-3.5 text-stone-400" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-xl border border-stone-200 bg-white p-5">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-stone-700">
                {isEs ? "Más Inteligencia" : "More Intelligence"}
              </h2>
              <div className="space-y-1.5">
                {[
                  { href: "/intelligence/legislation" as const, label: isEs ? "Seguimiento Legislativo" : "Legislative Tracker" },
                  { href: "/layoffs" as const, label: isEs ? "Rastreador de Despidos" : "Layoff Tracker" },
                  { href: "/salary-data" as const, label: isEs ? "Datos Salariales" : "Salary Intelligence" },
                  { href: "/ai-tracker" as const, label: isEs ? "Rastreador de IA" : "AI Tracker" },
                  { href: "/strategy/resilience" as const, label: isEs ? "Puntuación de Resiliencia" : "Resilience Scorecard" },
                  { href: "/blog" as const, label: isEs ? "Blog" : "Blog" },
                  { href: "/intel-brief" as const, label: "Intel Brief PDF" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-stone-700 hover:bg-teal-50 hover:text-teal-800 transition-colors"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="size-3 text-stone-400" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Updated timestamps */}
            <div className="text-center text-xs text-stone-400 space-y-1">
              <p>{isEs ? "Inteligencia actualizada" : "Intelligence updated"}: {lastUpdated}</p>
              <p>{isEs ? "Abogacía actualizada" : "Advocacy updated"}: {advocacyLastUpdated}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
