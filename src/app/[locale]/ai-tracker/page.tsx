// AI Tracker — Monitor AI adoption across the FQHC sector
// Redesigned: date-sorted feed + trending sidebar + resources section
"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { t } from "@/lib/i18n-helpers";
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
  TrendingUp,
  Clock,
  Sparkles,
  BookOpen,
  AlertTriangle,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AI_CATEGORIES,
  AI_TRACKER_LAST_UPDATED,
  ADOPTION_STAGES,
  FQHC_AI_VENDORS,
  VENDOR_CATEGORY_LABELS,
  getAIItems,
  getAICounts,
  getAdoptionStageCounts,
  getFeaturedAIItems,
  type AICategory,
  type AdoptionStage,
  type AIAdoptionItem,
  type AIVendor,
  type VendorCategory,
} from "@/lib/fqhc-ai-tracker";
import {
  getIntelItems,
  IMPACT_STYLES,
  IMPACT_LABELS,
} from "@/lib/fqhc-news-intel";
import { getFundingCliffs } from "@/lib/market-intelligence";
import { MASTERCLASSES } from "@/lib/fqhc-masterclasses";
import { FQHC_GUIDES } from "@/lib/fqhc-guides";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import { PageHero } from "@/components/ui/design-system";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

// t() imported from @/lib/i18n-helpers

function formatShortDate(dateStr: string, locale: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(locale === "es" ? "es-US" : "en-US", {
    month: "short",
    day: "numeric",
  });
}

/** Group items by month-year */
function groupByMonth(items: AIAdoptionItem[]): Map<string, AIAdoptionItem[]> {
  const groups = new Map<string, AIAdoptionItem[]>();
  for (const item of items) {
    const d = new Date(item.date + "T00:00:00");
    const key = `${d.getFullYear()}-${String(d.getMonth()).padStart(2, "0")}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(item);
  }
  return groups;
}

function monthLabel(key: string, locale: string): string {
  const [year, month] = key.split("-").map(Number);
  const d = new Date(year, month, 1);
  return d.toLocaleDateString(locale === "es" ? "es-US" : "en-US", {
    month: "long",
    year: "numeric",
  });
}

/* ------------------------------------------------------------------ */
/*  Vendor Comparison Components                                        */
/* ------------------------------------------------------------------ */

function EHRDot({ level }: { level: "native" | "api" | "partial" | "none" }) {
  if (level === "native")
    return (
      <span
        className="inline-block size-2.5 rounded-full bg-teal-500 shrink-0"
        title="Native integration"
      />
    );
  if (level === "api")
    return (
      <span
        className="inline-block size-2.5 rounded-full bg-amber-400 shrink-0"
        title="API integration"
      />
    );
  if (level === "partial")
    return (
      <span
        className="inline-block size-2.5 rounded-full bg-stone-300 shrink-0"
        title="Partial integration"
      />
    );
  return (
    <span
      className="inline-block size-2.5 rounded-full border border-stone-300 bg-white shrink-0"
      title="No integration"
    />
  );
}

function VendorCard({
  vendor,
  isEs,
}: {
  vendor: AIVendor;
  isEs: boolean;
}) {
  const fitColors = {
    high: "bg-teal-100 text-teal-800",
    moderate: "bg-amber-100 text-amber-800",
    low: "bg-red-100 text-red-800",
  };
  const fitLabels = {
    high: { en: "High Fit", es: "Alta" },
    moderate: { en: "Mod. Fit", es: "Moderada" },
    low: { en: "Low Fit", es: "Baja" },
  };
  const pricingLabels: Record<string, { en: string; es: string }> = {
    subscription: { en: "Subscription", es: "Suscripción" },
    "per-encounter": { en: "Per Encounter", es: "Por Encuentro" },
    bundled: { en: "Bundled", es: "Incluido" },
    "grant-funded": { en: "Grant Funded", es: "Subvención" },
    unknown: { en: "Varies", es: "Variable" },
  };

  const majorEHRs = ["eClinicalWorks", "OCHIN Epic", "athenahealth", "NextGen"];
  const ehrMap = Object.fromEntries(
    vendor.ehrIntegrations.map((e) => [e.ehr, e.level])
  );
  const ehrShort: Record<string, string> = {
    eClinicalWorks: "eCW",
    "OCHIN Epic": "OCHIN Epic",
    athenahealth: "Athena",
    NextGen: "NextGen",
  };

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4 flex flex-col gap-3 hover:shadow-sm transition-shadow dark:border-stone-700 dark:bg-stone-900">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-sm font-bold text-stone-900 leading-snug dark:text-stone-100">
            {vendor.name}
          </h3>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${fitColors[vendor.fqhcFit]}`}
          >
            {isEs ? fitLabels[vendor.fqhcFit].es : fitLabels[vendor.fqhcFit].en}
          </span>
        </div>
        <p className="text-xs text-stone-500 leading-snug">
          {isEs ? vendor.tagline.es : vendor.tagline.en}
        </p>
      </div>

      {/* EHR compatibility */}
      <div>
        <p className="text-xs font-semibold text-stone-500 uppercase mb-1.5">
          {isEs ? "Compatibilidad EHR" : "EHR Compatibility"}
        </p>
        <div className="grid grid-cols-2 gap-y-1 gap-x-2">
          {majorEHRs.map((ehr) => {
            const level = (ehrMap[ehr] as "native" | "api" | "partial" | "none") ?? "none";
            return (
              <div key={ehr} className="flex items-center gap-1.5">
                <EHRDot level={level} />
                <span className="text-xs text-stone-600">{ehrShort[ehr]}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-1.5 flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="inline-block size-2 rounded-full bg-teal-500" />
            <span className="text-xs text-stone-500">{isEs ? "Nativo" : "Native"}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block size-2 rounded-full bg-amber-400" />
            <span className="text-xs text-stone-500">API</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block size-2 rounded-full border border-stone-300 bg-white" />
            <span className="text-xs text-stone-500">{isEs ? "Ninguno" : "None"}</span>
          </div>
        </div>
      </div>

      {/* Key features */}
      <div>
        <p className="text-xs font-semibold text-stone-500 uppercase mb-1">
          {isEs ? "Características Clave" : "Key Features"}
        </p>
        <ul className="space-y-0.5">
          {vendor.keyFeatures.slice(0, 2).map((f, i) => (
            <li
              key={i}
              className="text-xs text-stone-600 leading-snug flex gap-1"
            >
              <span className="text-teal-500 shrink-0">•</span>
              <span>{isEs ? f.es : f.en}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* FQHC customers (if any) */}
      {vendor.fqhcCustomers.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-stone-500 uppercase mb-1">
            {isEs ? "Clientes FQHC" : "FQHC Customers"}
          </p>
          <p className="text-xs text-stone-600 leading-snug">
            {vendor.fqhcCustomers.slice(0, 2).join(" · ")}
            {vendor.fqhcCustomers.length > 2 && (
              <span className="text-stone-500">
                {" "}+{vendor.fqhcCustomers.length - 2} {isEs ? "más" : "more"}
              </span>
            )}
          </p>
        </div>
      )}

      {/* Footer: pricing + badges */}
      <div className="mt-auto pt-2 border-t border-stone-100 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 font-medium">
            {isEs
              ? pricingLabels[vendor.pricingModel]?.es
              : pricingLabels[vendor.pricingModel]?.en}
          </span>
          {vendor.nachcEndorsed && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 font-medium border border-teal-200">
              NACHC ✓
            </span>
          )}
          {vendor.chaiCertified && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-medium border border-blue-200">
              CHAI ✓
            </span>
          )}
        </div>
        <a
          href={vendor.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-teal-600 hover:text-teal-800 hover:underline transition-colors"
        >
          {isEs ? "Fuente →" : "Source →"}
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  AI Item Card (feed style)                                          */
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
    <div
      id={item.id}
      className="scroll-mt-20 rounded-xl border border-stone-200 bg-white transition-shadow hover:shadow-md overflow-hidden dark:border-stone-700 dark:bg-stone-900"
    >
      <button onClick={onToggle} className="w-full text-left p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {stageMeta && (
                <Badge
                  variant="secondary"
                  className={`text-xs ${stageMeta.color}`}
                >
                  {isEs ? stageMeta.es : stageMeta.en}
                </Badge>
              )}
              {catMeta && (
                <span className="text-xs bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded-full">
                  {isEs ? catMeta.es : catMeta.en}
                </span>
              )}
              <span className="text-xs text-stone-500 flex items-center gap-1">
                <Calendar className="size-3" />
                {formatShortDate(item.date, locale)}
              </span>
              {item.featured && (
                <Star className="size-3 text-amber-500 fill-amber-500" />
              )}
            </div>
            <h3 className="font-semibold text-stone-900 leading-snug dark:text-stone-100">
              {t(item.title, locale)}
            </h3>
            {!isExpanded && (
              <p className="mt-1 text-sm text-stone-500 line-clamp-2">
                {t(item.description, locale)}
              </p>
            )}
          </div>
          <div className="flex-shrink-0 mt-1 text-stone-500">
            {isExpanded ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </div>
        </div>

        {/* Quick metrics — always visible */}
        {item.metrics.length > 0 && !isExpanded && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {item.metrics.slice(0, 3).map((m) => (
              <span
                key={m.label}
                className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-800"
              >
                <BarChart3 className="size-2.5" />
                {m.value}
              </span>
            ))}
          </div>
        )}
      </button>

      {isExpanded && (
        <div className="border-t border-stone-100 px-5 pb-5 pt-4 space-y-4">
          <p className="text-sm text-stone-600 leading-relaxed dark:text-stone-400">
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
                  className="rounded-lg border border-stone-100 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800"
                >
                  <div className="text-base font-bold text-teal-800">
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
                  className="text-xs bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded"
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
  const [vendorCategory, setVendorCategory] = useState<VendorCategory | "all">("all");

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Get all items sorted by date, optionally filtered
  const allSorted = getAIItems(
    activeCategory !== "all" || activeStage !== "all"
      ? {
          category: activeCategory !== "all" ? activeCategory : undefined,
          stage: activeStage !== "all" ? activeStage : undefined,
        }
      : undefined
  );

  // Month groups
  const monthGroups = groupByMonth(allSorted);

  // Sidebar data
  const featuredItems = getFeaturedAIItems();
  const fundingCliffs = getFundingCliffs().filter((c) => !c.isPast).slice(0, 5);
  const recentIntelItems = getIntelItems({ limit: 5 });

  // Stats
  const counts = getAICounts();
  const stageCounts = getAdoptionStageCounts();

  // Top 3 most recent items for trending ticker
  const trendingItems = getAIItems().slice(0, 3);

  // Vendor comparison data
  const filteredVendors =
    vendorCategory === "all"
      ? FQHC_AI_VENDORS
      : FQHC_AI_VENDORS.filter((v) => v.category === vendorCategory);

  // Related resources
  const aiMasterclass = MASTERCLASSES.find(
    (m) => m.tags.includes("ai") || m.id.includes("ai") || m.title.en.toLowerCase().includes("ai")
  );
  const docGuide = FQHC_GUIDES.find((g) => g.id.includes("documentation") || g.id.includes("compliance"));
  const revenueGuide = FQHC_GUIDES.find((g) => g.id.includes("revenue") && !g.id.includes("bilingual"));

  return (
    <div className="bg-stone-50 dark:bg-stone-950">
      <PageHero
        title={{ en: "FQHC AI Implementation Tracker", es: "Rastreador de IA en FQHCs" }}
        subtitle={{
          en: "Monitoring artificial intelligence adoption at community health centers nationwide.",
          es: "Monitoreando la adopcion de inteligencia artificial en centros de salud comunitarios a nivel nacional.",
        }}
        meta={`${isEs ? "Última actualización:" : "Last updated:"} ${AI_TRACKER_LAST_UPDATED}`}
        stats={[
          { value: String(counts.total), label: isEs ? "Implementaciones" : "Deployments" },
          { value: String(Object.keys(counts).length - 1), label: isEs ? "Categorias" : "Categories" },
          { value: String(stageCounts["widely-adopted"] || 0), label: isEs ? "Ampliamente Adoptados" : "Widely Adopted" },
          { value: String(stageCounts.pilot || 0), label: isEs ? "En Piloto" : "In Pilot" },
        ]}
      />

      {/* Trending Ticker */}
      <div className="bg-stone-800 border-b border-stone-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3 overflow-x-auto">
            <Badge className="bg-amber-500 text-white text-xs font-bold shrink-0 hover:bg-amber-600">
              <TrendingUp className="size-3 mr-1" />
              {isEs ? "TENDENCIA" : "TRENDING"}
            </Badge>
            {trendingItems.map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-xs text-stone-300 hover:text-white whitespace-nowrap transition-colors shrink-0"
              >
                {i > 0 && <span className="text-stone-600 mr-3">•</span>}
                {t(item.title, locale).slice(0, 60)}
                {t(item.title, locale).length > 60 ? "…" : ""}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Video Banner */}
      <section className="bg-gradient-to-r from-teal-900 to-stone-900 py-8 sm:py-10 border-b border-stone-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-5 items-center">
            {/* News story card — real KTVU thumbnail, links to video */}
            <a
              href="https://www.ktvu.com/video/fmc-s5kjj7k3h2w09riy"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:col-span-3 block aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 group relative"
              style={{
                backgroundImage: "url('https://static-media.fox.com/fmcv3/prod/fts/of8kiyfzo588oguh/i0r47c2txwrqtwst.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark overlay — lightens on hover to show thumbnail better */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/35 transition-colors" />

              {/* KTVU branding bar */}
              <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/70 to-transparent">
                <span className="text-xs font-bold tracking-widest text-white uppercase">KTVU Fox 2</span>
                <span className="rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white uppercase">
                  {isEs ? "Noticias" : "News Segment"}
                </span>
              </div>

              {/* Play button — centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-white/20 border-2 border-white/60 group-hover:bg-white/35 group-hover:scale-110 transition-all duration-200 shadow-xl">
                  <svg viewBox="0 0 24 24" className="size-8 fill-white ml-1 drop-shadow" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Bottom caption bar — title + Emma Mayerson credit */}
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-sm font-semibold text-white leading-snug">
                  {isEs
                    ? "IA Expande Atención para Personas Sin Hogar"
                    : "AI Expanding Care for the Unhoused"}
                </p>
                <p className="mt-0.5 text-xs text-stone-300">
                  {isEs
                    ? "Con Emma Mayerson (Future Communities Institute) · KTVU Fox 2 · Ene 2026"
                    : "Feat. Emma Mayerson (Future Communities Institute) · KTVU Fox 2 · Jan 2026"}
                </p>
              </div>
            </a>
            {/* Description */}
            <div className="lg:col-span-2 text-white">
              <Badge className="bg-red-600/80 text-white text-xs font-bold mb-3 hover:bg-red-600">
                📺 {isEs ? "VIDEO DESTACADO" : "FEATURED VIDEO"}
              </Badge>
              <h3 className="text-lg font-bold leading-snug sm:text-xl">
                {isEs
                  ? "IA Expande Atención para Personas Sin Hogar en el Área de la Bahía"
                  : "AI Expanding Care for the Unhoused in the Bay Area"}
              </h3>
              {/* Emma Mayerson credit */}
              <div className="mt-2 flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-full bg-teal-700 text-xs font-bold text-white shrink-0">EM</span>
                <span className="text-xs text-teal-300">
                  {isEs
                    ? "Emma Mayerson · Co-Fundadora, Future Communities Institute"
                    : "Emma Mayerson · Co-Founder, Future Communities Institute"}
                </span>
              </div>
              <p className="mt-2.5 text-sm text-stone-300 leading-relaxed">
                {isEs
                  ? "ScopeAI de Akido Labs guía a trabajadores comunitarios de salud en visitas integrales — 92% precisión diagnóstica, tratamiento MAT en 4 horas, 40% reducción de visitas a urgencias. Financiado completamente por CalAIM ECM."
                  : "Akido Labs' ScopeAI guides CHWs through comprehensive street medicine visits — 92% diagnostic accuracy, MAT within 4 hours, 40% ED reduction. Funded entirely by Medi-Cal CalAIM ECM."}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-block rounded-full bg-teal-800/50 border border-teal-600/30 px-2.5 py-0.5 text-xs text-teal-300">KTVU Fox 2</span>
                <span className="inline-block rounded-full bg-teal-800/50 border border-teal-600/30 px-2.5 py-0.5 text-xs text-teal-300">CalAIM ECM</span>
                <span className="inline-block rounded-full bg-teal-800/50 border border-teal-600/30 px-2.5 py-0.5 text-xs text-teal-300">Street Medicine</span>
                <span className="inline-block rounded-full bg-teal-800/50 border border-teal-600/30 px-2.5 py-0.5 text-xs text-teal-300">Jan 2026</span>
              </div>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <a
                  href="https://www.ktvu.com/video/fmc-s5kjj7k3h2w09riy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 hover:bg-red-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors"
                >
                  ▶ {isEs ? "Ver video en KTVU" : "Watch on KTVU"}
                </a>
                <a
                  href="#akido-labs-scopeai-bay-area-street-medicine"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors"
                >
                  {isEs ? "Ver análisis completo" : "Read full analysis"} <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Main Content */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex items-center gap-2 mb-3">
            <Filter className="size-4 text-stone-500" />
            <span className="text-xs font-medium text-stone-500 uppercase">
              {isEs ? "Categoria" : "Category"}:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveCategory("all")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  activeCategory === "all"
                    ? "bg-stone-800 text-white"
                    : "bg-stone-100 text-stone-500 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
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
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
                  }`}
                >
                  {isEs ? cat.es : cat.en}
                </button>
              ))}
            </div>
          </div>

          {/* Stage filter */}
          <div className="flex items-center gap-2 mb-8">
            <Zap className="size-4 text-stone-500" />
            <span className="text-xs font-medium text-stone-500 uppercase">
              {isEs ? "Etapa" : "Stage"}:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveStage("all")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  activeStage === "all"
                    ? "bg-stone-800 text-white"
                    : "bg-stone-100 text-stone-500 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
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
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
                  }`}
                >
                  {isEs ? stage.es : stage.en}
                </button>
              ))}
            </div>
          </div>

          {/* 2/3 + 1/3 Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ============ LEFT: AI News Feed (2/3) ============ */}
            <div className="lg:col-span-2 space-y-6">
              {allSorted.length === 0 && (
                <div className="text-center py-12 text-stone-500">
                  {isEs
                    ? "No hay implementaciones que coincidan con los filtros."
                    : "No deployments match your filters."}
                </div>
              )}

              {Array.from(monthGroups.entries()).map(([key, items]) => (
                <div key={key}>
                  {/* Month header */}
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="size-4 text-teal-600" />
                    <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wide">
                      {monthLabel(key, locale)}
                    </h2>
                    <div className="flex-1 border-t border-stone-200" />
                    <span className="text-xs text-stone-500">
                      {items.length} {items.length === 1 ? (isEs ? "item" : "item") : (isEs ? "items" : "items")}
                    </span>
                  </div>

                  {/* Items for this month */}
                  <div className="space-y-3">
                    {items.map((item) => (
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
                </div>
              ))}
            </div>

            {/* ============ RIGHT: Sidebar (1/3) ============ */}
            <div className="space-y-6 lg:sticky lg:top-20 lg:self-start">
              {/* Featured / Curated */}
              <div className="rounded-xl border border-teal-200 bg-teal-50/50 overflow-hidden">
                <div className="bg-teal-700 px-4 py-2.5 flex items-center gap-2">
                  <Sparkles className="size-4 text-teal-200" />
                  <h3 className="text-sm font-bold text-white">
                    {isEs ? "Destacados" : "Featured"}
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  {featuredItems.map((item) => {
                    const stageMeta = ADOPTION_STAGES.find(
                      (s) => s.id === item.adoptionStage
                    );
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block group"
                      >
                        <div className="flex items-start gap-2">
                          <Star className="size-3 text-amber-500 fill-amber-500 mt-0.5 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-stone-800 leading-snug group-hover:text-teal-700 transition-colors line-clamp-2">
                              {t(item.title, locale)}
                            </h4>
                            <div className="flex items-center gap-1.5 mt-1">
                              {stageMeta && (
                                <span className={`text-xs px-1 py-0.5 rounded ${stageMeta.color}`}>
                                  {isEs ? stageMeta.es : stageMeta.en}
                                </span>
                              )}
                              {item.metrics[0] && (
                                <span className="text-xs text-stone-500">
                                  {item.metrics[0].value}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Policy Deadlines */}
              {fundingCliffs.length > 0 && (
                <div className="rounded-xl border border-amber-200 bg-amber-50/50 overflow-hidden">
                  <div className="bg-amber-600 px-4 py-2.5 flex items-center gap-2">
                    <AlertTriangle className="size-4 text-amber-200" />
                    <h3 className="text-sm font-bold text-white">
                      {isEs ? "Fechas Clave" : "Policy Deadlines"}
                    </h3>
                  </div>
                  <div className="p-4 space-y-3">
                    {fundingCliffs.map((cliff) => (
                      <div key={cliff.id} className="flex items-start gap-2">
                        <div className="shrink-0 mt-0.5">
                          <Clock className="size-3 text-amber-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-stone-800 leading-snug line-clamp-2">
                            {t(cliff.title, locale)}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className={`text-xs font-bold ${cliff.daysUntil <= 90 ? "text-red-600" : cliff.daysUntil <= 180 ? "text-amber-600" : "text-stone-500"}`}>
                              {cliff.daysUntil} {isEs ? "días" : "days"}
                            </span>
                            {cliff.dollarAmount && (
                              <span className="text-xs text-stone-500">
                                {cliff.dollarAmount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <Link
                      href="/funding-impact"
                      className="block text-xs font-medium text-amber-700 hover:text-amber-900 hover:underline transition-colors mt-1"
                    >
                      {isEs ? "Ver todas las fechas →" : "View all deadlines →"}
                    </Link>
                  </div>
                </div>
              )}

              {/* Latest Intelligence */}
              <div className="rounded-xl border border-blue-200 bg-blue-50/50 overflow-hidden">
                <div className="bg-blue-700 px-4 py-2.5 flex items-center gap-2">
                  <Zap className="size-4 text-blue-200" />
                  <h3 className="text-sm font-bold text-white">
                    {isEs ? "Inteligencia Reciente" : "Latest Intel"}
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  {recentIntelItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-2">
                      <Badge
                        variant="outline"
                        className={`text-[8px] shrink-0 mt-0.5 px-1 py-0 ${IMPACT_STYLES[item.impactLevel]}`}
                      >
                        {t(IMPACT_LABELS[item.impactLevel], locale)}
                      </Badge>
                      <h4 className="text-xs text-stone-700 leading-snug line-clamp-2">
                        {t(item.headline, locale)}
                      </h4>
                    </div>
                  ))}
                  <Link
                    href="/"
                    className="block text-xs font-medium text-blue-700 hover:text-blue-900 hover:underline transition-colors mt-1"
                  >
                    {isEs ? "Ver dashboard completo →" : "View full dashboard →"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Vendor Comparison Section ============ */}
      <section className="border-t border-stone-200 bg-stone-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Cpu className="size-5 text-teal-600" />
                <h2 className="text-xl font-bold text-stone-900">
                  {isEs ? "Comparación de Proveedores de IA" : "AI Vendor Comparison"}
                </h2>
              </div>
              <p className="text-sm text-stone-500">
                {isEs
                  ? "8 herramientas evaluadas para idoneidad con FQHCs — compatibilidad de EHR, precios y resultados documentados."
                  : "8 tools evaluated for FQHC fit — EHR compatibility, pricing, and documented community health results."}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <div className="flex items-center gap-3 text-xs text-stone-500">
                <div className="flex items-center gap-1">
                  <span className="inline-block size-2.5 rounded-full bg-teal-500" />
                  <span>{isEs ? "Nativo" : "Native"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="inline-block size-2.5 rounded-full bg-amber-400" />
                  <span>API</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="inline-block size-2.5 rounded-full border border-stone-300 bg-white" />
                  <span>{isEs ? "Ninguno" : "None"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-1.5 mb-8 mt-4">
            <button
              onClick={() => setVendorCategory("all")}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                vendorCategory === "all"
                  ? "bg-stone-800 text-white"
                  : "bg-white text-stone-500 hover:bg-stone-100 border border-stone-200"
              }`}
            >
              {isEs ? "Todos" : "All"} ({FQHC_AI_VENDORS.length})
            </button>
            {(Object.entries(VENDOR_CATEGORY_LABELS) as [VendorCategory, typeof VENDOR_CATEGORY_LABELS[VendorCategory]][]).map(
              ([key, label]) => {
                const count = FQHC_AI_VENDORS.filter(
                  (v) => v.category === key
                ).length;
                return (
                  <button
                    key={key}
                    onClick={() => setVendorCategory(key)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      vendorCategory === key
                        ? "bg-stone-800 text-white"
                        : "bg-white text-stone-500 hover:bg-stone-100 border border-stone-200"
                    }`}
                  >
                    {label.icon} {isEs ? label.es : label.en} ({count})
                  </button>
                );
              }
            )}
          </div>

          {/* Vendor grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredVendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isEs={isEs}
              />
            ))}
          </div>

          {filteredVendors.length === 0 && (
            <div className="text-center py-12 text-stone-500 text-sm">
              {isEs
                ? "No hay proveedores que coincidan con este filtro."
                : "No vendors match this filter."}
            </div>
          )}
        </div>
      </section>

      {/* ============ Related Resources Section ============ */}
      <section className="border-t border-stone-200 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="size-5 text-teal-600" />
            <h2 className="text-xl font-bold text-stone-900">
              {isEs ? "Recursos Relacionados" : "Related Resources"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* AI Masterclass */}
            {aiMasterclass && (
              <Link
                href="/strategy/masterclass"
                className="group rounded-xl border border-stone-200 bg-gradient-to-br from-teal-50 to-white p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="size-4 text-teal-600" />
                  <Badge variant="secondary" className="text-xs bg-teal-100 text-teal-700">
                    {isEs ? "Masterclass" : "Masterclass"}
                  </Badge>
                </div>
                <h3 className="font-semibold text-stone-900 group-hover:text-teal-700 transition-colors leading-snug">
                  {t(aiMasterclass.title, locale)}
                </h3>
                <p className="mt-1 text-xs text-stone-500 line-clamp-2">
                  {t(aiMasterclass.subtitle, locale)}
                </p>
                <p className="mt-2 text-xs font-bold text-amber-600">
                  {t(aiMasterclass.urgencyStat, locale)}
                </p>
              </Link>
            )}

            {/* Documentation Compliance Guide */}
            {docGuide && (
              <Link
                href="/guides"
                className="group rounded-xl border border-stone-200 bg-gradient-to-br from-blue-50 to-white p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="size-4 text-blue-600" />
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                    {isEs ? "Guía" : "Guide"}
                  </Badge>
                </div>
                <h3 className="font-semibold text-stone-900 group-hover:text-blue-700 transition-colors leading-snug">
                  {t(docGuide.title, locale)}
                </h3>
                <p className="mt-1 text-xs text-stone-500 line-clamp-2">
                  {t(docGuide.summary, locale)}
                </p>
              </Link>
            )}

            {/* Revenue Cycle Guide */}
            {revenueGuide && (
              <Link
                href="/guides"
                className="group rounded-xl border border-stone-200 bg-gradient-to-br from-amber-50 to-white p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="size-4 text-amber-600" />
                  <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700">
                    {isEs ? "Guía" : "Guide"}
                  </Badge>
                </div>
                <h3 className="font-semibold text-stone-900 group-hover:text-amber-700 transition-colors leading-snug">
                  {t(revenueGuide.title, locale)}
                </h3>
                <p className="mt-1 text-xs text-stone-500 line-clamp-2">
                  {t(revenueGuide.summary, locale)}
                </p>
              </Link>
            )}
          </div>

          {/* Quick links row */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/strategy/guides">
                {isEs ? "Guias Ejecutivas" : "Executive Guides"}{" "}
                <ArrowRight className="size-3" />
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                {isEs ? "Dashboard" : "Intelligence Dashboard"}{" "}
                <ArrowRight className="size-3" />
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/strategy/masterclass">
                {isEs ? "Masterclass" : "Masterclass"}{" "}
                <ArrowRight className="size-3" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Related Strategy */}
      <section className="border-t border-stone-200 py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-bold text-stone-900 mb-4">
            {isEs ? "Estrategia Relacionada" : "Related Strategy"}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/strategy/tech-stack" className="rounded-lg border border-stone-200 p-4 hover:border-teal-200 hover:bg-teal-50/30 transition-colors">
              <p className="text-sm font-semibold text-stone-900">{isEs ? "Guia de Tech Stack" : "Tech Stack Guide"}</p>
              <p className="text-xs text-stone-500 mt-1">{isEs ? "28 proveedores en 12 categorias FQHC" : "28 vendors across 12 FQHC categories"}</p>
            </Link>
            <Link href="/strategy/case-studies" className="rounded-lg border border-stone-200 p-4 hover:border-teal-200 hover:bg-teal-50/30 transition-colors">
              <p className="text-sm font-semibold text-stone-900">{isEs ? "Casos de Estudio" : "Case Studies"}</p>
              <p className="text-xs text-stone-500 mt-1">{isEs ? "Estrategias reales de FQHCs exitosas" : "Real strategies from successful FQHCs"}</p>
            </Link>
            <Link href="/strategy/masterclass" className="rounded-lg border border-stone-200 p-4 hover:border-teal-200 hover:bg-teal-50/30 transition-colors">
              <p className="text-sm font-semibold text-stone-900">{isEs ? "Masterclass" : "Masterclass"}</p>
              <p className="text-xs text-stone-500 mt-1">{isEs ? "15 modulos de estrategia para la crisis 2026" : "15 strategy modules for the 2026 crisis"}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-stone-200 py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <NewsletterSignup
            variant="card"
            defaultAudience="intel-brief"
          />
        </div>
      </section>
    </div>
  );
}
