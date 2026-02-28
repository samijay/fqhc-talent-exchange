// AI Tracker — Monitor AI adoption across the FQHC sector
"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Cpu,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Filter,
  BarChart3,
  Calendar,
  Building2,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AI_ADOPTION_ITEMS,
  AI_CATEGORIES,
  AI_TRACKER_LAST_UPDATED,
  ADOPTION_STAGES,
  getAICounts,
  getAdoptionStageCounts,
  type AICategory,
  type AdoptionStage,
  type AIAdoptionItem,
} from "@/lib/fqhc-ai-tracker";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  AI Item Card                                                       */
/* ------------------------------------------------------------------ */

function AIItemCard({
  item,
  locale,
  isEs,
  isExpanded,
  onToggle,
}: {
  item: AIAdoptionItem;
  locale: string;
  isEs: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const catMeta = AI_CATEGORIES.find((c) => c.id === item.category);
  const stageMeta = ADOPTION_STAGES.find((s) => s.id === item.adoptionStage);

  return (
    <div className="rounded-2xl border border-stone-200 bg-white transition-shadow hover:shadow-md overflow-hidden">
      <button onClick={onToggle} className="w-full text-left p-6 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {catMeta && (
                <Badge
                  variant="secondary"
                  className="bg-stone-100 text-stone-600 text-xs"
                >
                  {isEs ? catMeta.es : catMeta.en}
                </Badge>
              )}
              {stageMeta && (
                <Badge
                  variant="secondary"
                  className={`text-xs ${stageMeta.color}`}
                >
                  {isEs ? stageMeta.es : stageMeta.en}
                </Badge>
              )}
              <span className="text-xs text-stone-400 flex items-center gap-1">
                <Calendar className="size-3" />
                {formatDate(item.date, locale)}
              </span>
            </div>
            <h3 className="text-lg font-bold text-stone-900 leading-snug">
              {t(item.title, locale)}
            </h3>
            {!isExpanded && (
              <p className="mt-1 text-sm text-stone-500 line-clamp-2">
                {t(item.description, locale)}
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

        {/* Quick metrics — always visible */}
        {item.metrics.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {item.metrics.map((m) => (
              <span
                key={m.label}
                className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-800"
              >
                <BarChart3 className="size-3" />
                {m.value}
              </span>
            ))}
          </div>
        )}
      </button>

      {isExpanded && (
        <div className="border-t border-stone-100 px-6 pb-6 pt-4 space-y-4">
          <p className="text-sm text-stone-600 leading-relaxed">
            {t(item.description, locale)}
          </p>

          {/* Vendor / Partnership */}
          <div className="flex flex-wrap gap-3 text-xs text-stone-500">
            {item.vendor && (
              <span className="flex items-center gap-1">
                <Building2 className="size-3" />
                <span className="font-medium">{isEs ? "Proveedor" : "Vendor"}:</span>{" "}
                {item.vendor}
              </span>
            )}
            {item.partnership && (
              <span className="flex items-center gap-1">
                <Zap className="size-3" />
                <span className="font-medium">{isEs ? "Alianza" : "Partnership"}:</span>{" "}
                {item.partnership}
              </span>
            )}
          </div>

          {/* Metrics detail */}
          {item.metrics.length > 0 && (
            <div className="grid gap-2 sm:grid-cols-2">
              {item.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg border border-stone-100 bg-stone-50 p-3"
                >
                  <div className="text-lg font-bold text-teal-800">
                    {m.value}
                  </div>
                  <div className="text-xs text-stone-500">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Source */}
          <div className="flex items-center justify-end border-t border-stone-100 pt-3">
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
      )}
    </div>
  );
}

/* ================================================================== */
/*  AI Tracker Page                                                    */
/* ================================================================== */

export default function AITrackerPage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<AICategory | "all">("all");
  const [activeStage, setActiveStage] = useState<AdoptionStage | "all">("all");

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = AI_ADOPTION_ITEMS.filter(
    (item) =>
      (activeCategory === "all" || item.category === activeCategory) &&
      (activeStage === "all" || item.adoptionStage === activeStage)
  );

  const counts = getAICounts();
  const stageCounts = getAdoptionStageCounts();

  return (
    <div className="bg-stone-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="size-5 text-teal-400" />
            <span className="text-sm font-medium uppercase tracking-wider text-teal-400">
              {isEs ? "Inteligencia" : "Intelligence"}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {isEs
              ? "Rastreador de IA en FQHCs"
              : "FQHC AI Implementation Tracker"}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-300">
            {isEs
              ? "Monitoreando la adopcion de inteligencia artificial en centros de salud comunitarios a nivel nacional."
              : "Monitoring artificial intelligence adoption at community health centers nationwide."}
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-stone-400">
            <Calendar className="size-3" />
            <span>{isEs ? "Última actualización:" : "Last updated:"} {AI_TRACKER_LAST_UPDATED}</span>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
              <div className="text-2xl font-bold text-teal-400">
                {counts.total}
              </div>
              <div className="text-xs text-stone-400">
                {isEs ? "Implementaciones" : "Deployments"}
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
              <div className="text-2xl font-bold text-amber-400">
                {Object.keys(counts).length - 1}
              </div>
              <div className="text-xs text-stone-400">
                {isEs ? "Categorias" : "Categories"}
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
              <div className="text-2xl font-bold text-green-400">
                {stageCounts["widely-adopted"] || 0}
              </div>
              <div className="text-xs text-stone-400">
                {isEs ? "Ampliamente Adoptados" : "Widely Adopted"}
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">
                {stageCounts.pilot || 0}
              </div>
              <div className="text-xs text-stone-400">
                {isEs ? "En Piloto" : "In Pilot"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Items */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex items-center gap-2 mb-4">
            <Filter className="size-4 text-stone-400" />
            <span className="text-xs font-medium text-stone-500 uppercase">
              {isEs ? "Categoria" : "Category"}:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveCategory("all")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  activeCategory === "all"
                    ? "bg-stone-800 text-white"
                    : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                }`}
              >
                {isEs ? "Todas" : "All"} ({counts.total})
              </button>
              {AI_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    activeCategory === cat.id
                      ? "bg-stone-800 text-white"
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                  }`}
                >
                  {isEs ? cat.es : cat.en}
                </button>
              ))}
            </div>
          </div>

          {/* Stage filter */}
          <div className="flex items-center gap-2 mb-6">
            <Zap className="size-4 text-stone-400" />
            <span className="text-xs font-medium text-stone-500 uppercase">
              {isEs ? "Etapa" : "Stage"}:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveStage("all")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  activeStage === "all"
                    ? "bg-stone-800 text-white"
                    : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                }`}
              >
                {isEs ? "Todas" : "All"}
              </button>
              {ADOPTION_STAGES.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    activeStage === stage.id
                      ? "bg-stone-800 text-white"
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                  }`}
                >
                  {isEs ? stage.es : stage.en}
                </button>
              ))}
            </div>
          </div>

          {/* AI item cards */}
          <div className="space-y-4">
            {filtered.map((item) => (
              <AIItemCard
                key={item.id}
                item={item}
                locale={locale}
                isEs={isEs}
                isExpanded={expandedIds.has(item.id)}
                onToggle={() => toggle(item.id)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-stone-500">
              {isEs
                ? "No hay implementaciones que coincidan con los filtros."
                : "No deployments match your filters."}
            </div>
          )}

          {/* Related links */}
          <div className="mt-10 flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/strategy/guides">
                {isEs ? "Guias Ejecutivas" : "Executive Guides"}{" "}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/insights">
                {isEs ? "Dashboard de Inteligencia" : "Intelligence Dashboard"}{" "}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
