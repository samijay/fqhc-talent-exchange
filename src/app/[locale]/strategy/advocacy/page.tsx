// Advocacy Watch — Tracks positive movements fighting Medicaid/Medi-Cal cuts
"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/ui/design-system";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  Filter,
  LayoutList,
  Scale,
  ScrollText,
  Search,
  Users,
  Vote,
  Megaphone,
  Landmark,
  Building2,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  ADVOCACY_LAST_UPDATED,
  ADVOCACY_CATEGORIES,
  STATUS_META,
  getAdvocacyActions,
  getUpcomingFollowUps,
  getAdvocacyCounts,
  getAdvocacyRegions,
  type AdvocacyAction,
  type AdvocacyCategory,
  type AdvocacyStatus,
} from "@/lib/fqhc-advocacy-tracker";

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  legislation: ScrollText,
  "ballot-initiative": Vote,
  coalition: Users,
  "legal-action": Scale,
  "public-statement": Megaphone,
  "local-funding": Landmark,
  "federal-action": Building2,
};

const STATUS_ICONS: Record<string, React.ElementType> = {
  proposed: Clock,
  active: ArrowRight,
  passed: CheckCircle2,
  failed: XCircle,
  "pending-vote": AlertTriangle,
  "in-court": Scale,
  "signed-into-law": CheckCircle2,
};

function daysUntil(dateStr: string): number {
  return Math.ceil(
    (new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );
}

function ActionCard({
  action,
  locale,
}: {
  action: AdvocacyAction;
  locale: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const isEs = locale === "es";
  const statusMeta = STATUS_META[action.status];
  const CategoryIcon = CATEGORY_ICONS[action.category] || ScrollText;
  const StatusIcon = STATUS_ICONS[action.status] || Clock;
  const catMeta = ADVOCACY_CATEGORIES.find((c) => c.id === action.category);

  const followUpDays = action.followUpDate ? daysUntil(action.followUpDate) : null;
  const isUrgent = followUpDays !== null && followUpDays >= 0 && followUpDays <= 14;

  return (
    <div
      className={`rounded-xl border-2 bg-white p-5 transition-all ${
        isUrgent
          ? "border-amber-300 shadow-amber-100 shadow-md"
          : action.impactLevel === "critical"
            ? "border-red-200"
            : "border-stone-200"
      }`}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg ${
            action.impactLevel === "critical"
              ? "bg-red-100 text-red-700"
              : action.impactLevel === "high"
                ? "bg-amber-100 text-amber-700"
                : "bg-teal-100 text-teal-700"
          }`}
        >
          <CategoryIcon className="size-5" />
        </div>
        <div className="flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className={`text-xs ${statusMeta.color}`}
            >
              <StatusIcon className="mr-1 size-3" />
              {t(statusMeta.label, locale)}
            </Badge>
            {catMeta && (
              <span className="text-xs text-stone-400">
                {t(catMeta.label, locale)}
              </span>
            )}
            <span className="text-xs text-stone-400">{action.region}</span>
          </div>
          <a
            href={action.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-1 text-base font-bold leading-snug text-stone-900 hover:text-teal-700"
          >
            {t(action.headline, locale)}
            <ExternalLink className="mt-1 size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-60" />
          </a>
        </div>
      </div>

      {/* Follow-up countdown */}
      {followUpDays !== null && followUpDays >= 0 && (
        <div
          className={`mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
            followUpDays <= 14
              ? "bg-amber-50 text-amber-800"
              : "bg-stone-50 text-stone-600"
          }`}
        >
          <Calendar className="size-4 shrink-0" />
          <div className="flex-1">
            <span className="font-semibold">
              {new Date(action.followUpDate!).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
            <span className="ml-1 text-xs opacity-60">
              ({followUpDays === 0
                ? isEs ? "hoy" : "today"
                : `${followUpDays} ${isEs ? "días" : "days"}`})
            </span>
            {action.followUpNote && (
              <span className="ml-1 text-xs">
                {"\u2014"} {t(action.followUpNote, locale)}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Outcome badge */}
      {action.outcome && (
        <div className="mt-3 flex items-start gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
          <span>{t(action.outcome, locale)}</span>
        </div>
      )}

      {/* Expand/collapse */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-900"
      >
        {expanded
          ? isEs
            ? "Menos"
            : "Less"
          : isEs
            ? "M\u00e1s detalles"
            : "More details"}
        {expanded ? (
          <ChevronUp className="size-4" />
        ) : (
          <ChevronDown className="size-4" />
        )}
      </button>

      {expanded && (
        <div className="mt-3 space-y-3 border-t border-stone-100 pt-3">
          <p className="text-sm text-stone-600">{t(action.summary, locale)}</p>

          {/* Organizations */}
          <div className="flex flex-wrap gap-1">
            {action.organizations.map((org) => (
              <Badge key={org} variant="secondary" className="text-xs">
                {org}
              </Badge>
            ))}
          </div>

          {/* Tools / Action links */}
          {action.tools && action.tools.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                {isEs ? "Tomar acci\u00f3n" : "Take action"}
              </p>
              {action.tools.map((tool, i) => (
                <a
                  key={i}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-teal-700 hover:text-teal-900 hover:underline"
                >
                  <ExternalLink className="size-3" />
                  {t(tool.label, locale)}
                </a>
              ))}
            </div>
          )}

          {/* Source */}
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <span>{action.sourceOrg}</span>
            <span>\u2022</span>
            <a
              href={action.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:underline"
            >
              {isEs ? "Fuente" : "Source"}
              <ExternalLink className="ml-1 inline size-3" />
            </a>
          </div>

          {/* Affected FQHCs */}
          {action.affectedOrgSlugs && action.affectedOrgSlugs.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {action.affectedOrgSlugs.map((slug) => (
                <Link
                  key={slug}
                  href={`/directory/${slug}` as "/directory"}
                  className="rounded bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-700 hover:bg-teal-100"
                >
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

function TimelineView({ actions, locale }: { actions: AdvocacyAction[]; locale: string }) {
  const isEs = locale === "es";
  const sorted = [...actions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const statusColor: Record<string, string> = {
    proposed: "bg-stone-400",
    active: "bg-teal-500",
    passed: "bg-green-500",
    failed: "bg-red-500",
    "pending-vote": "bg-amber-500",
    "in-court": "bg-purple-500",
    "signed-into-law": "bg-green-600",
  };

  const statusBg: Record<string, string> = {
    proposed: "bg-stone-50 border-stone-200",
    active: "bg-teal-50 border-teal-200",
    passed: "bg-green-50 border-green-200",
    failed: "bg-red-50 border-red-200",
    "pending-vote": "bg-amber-50 border-amber-200",
    "in-court": "bg-purple-50 border-purple-200",
    "signed-into-law": "bg-green-50 border-green-300",
  };

  return (
    <div className="relative ml-6 border-l-2 border-stone-200 pl-8">
      {sorted.map((action, i) => {
        const followUpDays = action.followUpDate ? daysUntil(action.followUpDate) : null;
        const isUrgent = followUpDays !== null && followUpDays >= 0 && followUpDays <= 14;
        const statusMeta = STATUS_META[action.status];
        const dateStr = new Date(action.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

        return (
          <div key={action.id} className="relative mb-8 last:mb-0">
            {/* Timeline dot */}
            <div className={`absolute -left-[41px] top-1 size-4 rounded-full border-2 border-white ${statusColor[action.status] || "bg-stone-400"}`} />

            {/* Date label */}
            <p className="mb-1 text-xs font-semibold text-stone-400">{dateStr}</p>

            {/* Card */}
            <div className={`rounded-lg border-2 p-4 ${isUrgent ? "border-amber-300 shadow-sm" : statusBg[action.status] || "border-stone-200 bg-white"}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className={`text-xs ${statusMeta.color}`}>
                      {t(statusMeta.label, locale)}
                    </Badge>
                    <span className="text-xs text-stone-400">{action.region}</span>
                    {action.impactLevel === "critical" && (
                      <Badge variant="destructive" className="text-xs">
                        {isEs ? "Cr\u00edtico" : "Critical"}
                      </Badge>
                    )}
                  </div>
                  <a
                    href={action.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-1 text-sm font-bold leading-snug text-stone-900 hover:text-teal-700"
                  >
                    {t(action.headline, locale)}
                    <ExternalLink className="mt-0.5 size-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-60" />
                  </a>
                  <p className="mt-1 text-xs text-stone-500">
                    {action.organizations.join(" \u2022 ")}
                  </p>
                </div>

                {/* Follow-up countdown */}
                {followUpDays !== null && followUpDays >= 0 && (
                  <div className={`shrink-0 rounded-lg px-3 py-1 text-center ${followUpDays <= 14 ? "bg-amber-100 text-amber-800" : "bg-stone-100 text-stone-600"}`}>
                    <p className="text-lg font-bold">{followUpDays}</p>
                    <p className="text-xs">{isEs ? "d\u00edas" : "days"}</p>
                  </div>
                )}
              </div>

              {/* Outcome */}
              {action.outcome && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-green-700">
                  <CheckCircle2 className="size-3" />
                  {t(action.outcome, locale)}
                </div>
              )}

              {/* Source */}
              <div className="mt-2 flex items-center gap-2 text-xs text-stone-400">
                <a href={action.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                  {action.sourceOrg} <ExternalLink className="ml-0.5 inline size-3" />
                </a>
              </div>
            </div>

            {/* Future follow-up marker */}
            {action.followUpDate && followUpDays !== null && followUpDays > 0 && (
              <div className="relative mt-4">
                <div className={`absolute -left-[41px] top-1 size-3 rounded-full border-2 border-white ${followUpDays <= 14 ? "bg-amber-400" : "bg-stone-300"}`} />
                <div className={`rounded-md px-3 py-1.5 text-xs ${followUpDays <= 14 ? "bg-amber-50 text-amber-700 font-semibold" : "bg-stone-50 text-stone-500"}`}>
                  <Calendar className="mr-1 inline size-3" />
                  {new Date(action.followUpDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  {action.followUpNote && ` \u2014 ${t(action.followUpNote, locale)}`}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function AdvocacyWatchPage() {
  const locale = useLocale();
  const isEs = locale === "es";

  const [categoryFilter, setCategoryFilter] = useState<AdvocacyCategory | "all">("all");
  const [statusFilter, setStatusFilter] = useState<AdvocacyStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"cards" | "timeline">("cards");

  const counts = getAdvocacyCounts();
  const upcomingFollowUps = getUpcomingFollowUps();
  const regions = getAdvocacyRegions();

  const filteredActions = useMemo(() => {
    let items = getAdvocacyActions(
      categoryFilter !== "all" ? { category: categoryFilter } : undefined,
    );

    if (statusFilter !== "all") {
      items = items.filter((a) => a.status === statusFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (a) =>
          t(a.headline, locale).toLowerCase().includes(q) ||
          t(a.summary, locale).toLowerCase().includes(q) ||
          a.organizations.some((o) => o.toLowerCase().includes(q)) ||
          a.tags.some((tag) => tag.includes(q)),
      );
    }

    return items;
  }, [categoryFilter, statusFilter, searchQuery, locale]);

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="bg-gradient-to-b from-teal-900 to-teal-800 px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <Breadcrumb
            items={[
              { label: isEs ? "Inicio" : "Home", href: "/" },
              { label: isEs ? "Inteligencia" : "Intelligence", href: "/demo" },
              { label: isEs ? "Seguimiento de Abogac\u00eda" : "Advocacy Watch" },
            ]}
          />
          <h1 className="mt-6 text-4xl font-bold md:text-5xl">
            {isEs ? "Seguimiento de Abogac\u00eda" : "Advocacy Watch"}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-teal-100">
            {isEs
              ? "Seguimiento de legislaci\u00f3n, iniciativas electorales, acciones de coalici\u00f3n y fallos legales que protegen el financiamiento de FQHCs. Fechas de seguimiento, resultados y herramientas para tomar acci\u00f3n."
              : "Tracking legislation, ballot initiatives, coalition actions, and legal rulings protecting FQHC funding. Follow-up dates, outcomes, and tools to take action."}
          </p>

          {/* Stats bar */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-lg bg-white/10 px-4 py-3 text-center">
              <p className="text-2xl font-bold text-amber-400">{counts.total}</p>
              <p className="text-xs text-teal-200">{isEs ? "Acciones rastreadas" : "Actions tracked"}</p>
            </div>
            <div className="rounded-lg bg-white/10 px-4 py-3 text-center">
              <p className="text-2xl font-bold text-green-400">{counts.active}</p>
              <p className="text-xs text-teal-200">{isEs ? "Activas ahora" : "Active now"}</p>
            </div>
            <div className="rounded-lg bg-white/10 px-4 py-3 text-center">
              <p className="text-2xl font-bold text-amber-400">{counts.pendingVote}</p>
              <p className="text-xs text-teal-200">{isEs ? "Votos pendientes" : "Pending votes"}</p>
            </div>
            <div className="rounded-lg bg-white/10 px-4 py-3 text-center">
              <p className="text-2xl font-bold text-white">{counts.upcoming}</p>
              <p className="text-xs text-teal-200">{isEs ? "Seguimientos pr\u00f3ximos" : "Upcoming follow-ups"}</p>
            </div>
          </div>

          <p className="mt-4 text-xs text-teal-300">
            {isEs ? "Actualizado:" : "Updated:"} {ADVOCACY_LAST_UPDATED}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Upcoming follow-ups strip */}
        {upcomingFollowUps.length > 0 && (
          <div className="mb-8 rounded-xl border-2 border-amber-200 bg-amber-50 p-4">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-800">
              <Calendar className="size-4" />
              {isEs ? "Pr\u00f3ximas fechas de seguimiento" : "Upcoming follow-up dates"}
            </h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingFollowUps.slice(0, 6).map((action) => {
                const days = daysUntil(action.followUpDate!);
                return (
                  <a
                    key={action.id}
                    href={action.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg bg-white p-3 transition-colors hover:bg-amber-50"
                  >
                    <div className={`shrink-0 text-center ${days <= 14 ? "text-red-600" : "text-amber-600"}`}>
                      <p className="text-xl font-bold">{days}</p>
                      <p className="text-xs">{isEs ? "días" : "days"}</p>
                    </div>
                    <div className="min-w-0 flex-1">
                      {action.followUpNote && (
                        <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
                          {t(action.followUpNote, locale).split("—")[0].trim()}
                        </p>
                      )}
                      <p className="mt-0.5 truncate text-sm text-stone-700">
                        {t(action.headline, locale).slice(0, 55)}{t(action.headline, locale).length > 55 ? "..." : ""}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-stone-400">
                          {new Date(action.followUpDate!).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        {action.tools && action.tools.length > 0 && (
                          <>
                            <span className="text-stone-300">·</span>
                            {action.tools.slice(0, 2).map((tool, i) => (
                              <span
                                key={i}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  window.open(tool.url, "_blank", "noopener,noreferrer");
                                }}
                                className="cursor-pointer font-medium text-teal-600 hover:text-teal-800 hover:underline"
                              >
                                {t(tool.label, locale).length > 25
                                  ? t(tool.label, locale).slice(0, 25) + "..."
                                  : t(tool.label, locale)}
                              </span>
                            ))}
                          </>
                        )}
                        {(!action.tools || action.tools.length === 0) && (
                          <>
                            <span className="text-stone-300">·</span>
                            <span className="text-stone-400">
                              {action.sourceOrg} <ExternalLink className="ml-0.5 inline size-2.5" />
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder={isEs ? "Buscar acciones..." : "Search actions..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-stone-300 bg-white py-2 pl-10 pr-3 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setCategoryFilter("all")}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                categoryFilter === "all"
                  ? "bg-teal-700 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {isEs ? "Todas" : "All"} ({counts.total})
            </button>
            {ADVOCACY_CATEGORIES.map((cat) => {
              const count = getAdvocacyActions({ category: cat.id }).length;
              if (count === 0) return null;
              return (
                <button
                  key={cat.id}
                  onClick={() =>
                    setCategoryFilter(
                      categoryFilter === cat.id ? "all" : cat.id,
                    )
                  }
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    categoryFilter === cat.id
                      ? "bg-teal-700 text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {t(cat.label, locale)} ({count})
                </button>
              );
            })}
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as AdvocacyStatus | "all")
            }
            className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
          >
            <option value="all">{isEs ? "Todos los estados" : "All statuses"}</option>
            {Object.entries(STATUS_META).map(([key, meta]) => (
              <option key={key} value={key}>
                {t(meta.label, locale)}
              </option>
            ))}
          </select>
        </div>

        {/* Results count + view toggle */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-stone-500">
            {filteredActions.length} {isEs ? "acciones" : "actions"}
            {categoryFilter !== "all" || statusFilter !== "all" || searchQuery
              ? isEs
                ? " (filtradas)"
                : " (filtered)"
              : ""}
          </p>
          <div className="flex items-center gap-1 rounded-lg border border-stone-200 bg-white p-0.5">
            <button
              onClick={() => setViewMode("cards")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${viewMode === "cards" ? "bg-teal-700 text-white" : "text-stone-500 hover:bg-stone-100"}`}
            >
              <LayoutList className="mr-1 inline size-3.5" />
              {isEs ? "Tarjetas" : "Cards"}
            </button>
            <button
              onClick={() => setViewMode("timeline")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${viewMode === "timeline" ? "bg-teal-700 text-white" : "text-stone-500 hover:bg-stone-100"}`}
            >
              <Clock className="mr-1 inline size-3.5" />
              {isEs ? "L\u00ednea de Tiempo" : "Timeline"}
            </button>
          </div>
        </div>

        {/* Actions — Cards or Timeline view */}
        {viewMode === "cards" ? (
          <div className="space-y-4">
            {filteredActions.map((action) => (
              <ActionCard key={action.id} action={action} locale={locale} />
            ))}
          </div>
        ) : (
          <TimelineView actions={filteredActions} locale={locale} />
        )}

        {filteredActions.length === 0 && (
          <div className="rounded-xl border border-stone-200 bg-white p-8 text-center">
            <Filter className="mx-auto mb-3 size-8 text-stone-300" />
            <p className="text-stone-500">
              {isEs
                ? "No se encontraron acciones con estos filtros."
                : "No actions match your filters."}
            </p>
          </div>
        )}

        {/* Cross-links */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <Link
            href="/funding-impact"
            className="rounded-xl border border-stone-200 bg-white p-5 transition-colors hover:border-teal-300"
          >
            <h3 className="font-bold text-stone-900">
              {isEs ? "Impacto de Financiamiento" : "Funding Impact"}
            </h3>
            <p className="mt-1 text-sm text-stone-500">
              {isEs
                ? "L\u00ednea de tiempo de pol\u00edticas y estrategias de ingresos"
                : "Policy timeline and revenue strategies"}
            </p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-teal-700">
              {isEs ? "Ver" : "View"} <ArrowRight className="size-4" />
            </span>
          </Link>
          <Link
            href="/layoffs"
            className="rounded-xl border border-stone-200 bg-white p-5 transition-colors hover:border-teal-300"
          >
            <h3 className="font-bold text-stone-900">
              {isEs ? "Rastreador de Despidos" : "Layoff Tracker"}
            </h3>
            <p className="mt-1 text-sm text-stone-500">
              {isEs
                ? "Eventos de despido y trabajadores afectados"
                : "Layoff events and displaced workers"}
            </p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-teal-700">
              {isEs ? "Ver" : "View"} <ArrowRight className="size-4" />
            </span>
          </Link>
          <Link
            href="/strategy/guides"
            className="rounded-xl border border-stone-200 bg-white p-5 transition-colors hover:border-teal-300"
          >
            <h3 className="font-bold text-stone-900">
              {isEs ? "Gu\u00edas Ejecutivas" : "Executive Guides"}
            </h3>
            <p className="mt-1 text-sm text-stone-500">
              {isEs
                ? "Estudios de caso y marcos estrat\u00e9gicos"
                : "Case studies and strategic frameworks"}
            </p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-teal-700">
              {isEs ? "Ver" : "View"} <ArrowRight className="size-4" />
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
