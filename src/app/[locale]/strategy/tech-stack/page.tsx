// FQHC Technology Stack — vendor comparison across 12 software categories
"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Stethoscope, DollarSign, Users, Clock, CalendarClock, KanbanSquare,
  MessageSquare, Cloud, Shield, Calculator, ClipboardCheck, Heart,
  Search, Filter, ChevronDown, ChevronUp, ExternalLink,
  CheckCircle2, AlertTriangle, Building2, ArrowRight, Star,
  Layers, BadgeCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  TECH_CATEGORIES, TECH_VENDORS, TECH_STACK_PROFILES,
  TECH_STACK_LAST_UPDATED,
  getTechStackStats,
  getVendorsByCategory,
  type TechCategory, type TechVendor, type TechCategoryMeta, type TechStackProfile,
} from "@/lib/fqhc-tech-stack";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

const ICON_MAP: Record<string, React.ElementType> = {
  Stethoscope, DollarSign, Users, Clock, CalendarClock, KanbanSquare,
  MessageSquare, Cloud, Shield, Calculator, ClipboardCheck, Heart,
};

const FIT_STYLES: Record<string, string> = {
  high: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  moderate: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  low: "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400",
};

const FIT_LABELS: Record<string, { en: string; es: string }> = {
  high: { en: "High FQHC Fit", es: "Alta Compatibilidad FQHC" },
  moderate: { en: "Moderate Fit", es: "Compatibilidad Moderada" },
  low: { en: "Low Fit", es: "Baja Compatibilidad" },
};

const CRITICALITY_STYLES: Record<string, string> = {
  "mission-critical": "bg-red-100 text-red-800",
  important: "bg-amber-100 text-amber-800",
  operational: "bg-blue-100 text-blue-800",
};

const CRITICALITY_LABELS: Record<string, { en: string; es: string }> = {
  "mission-critical": { en: "Mission-Critical", es: "Mision Critica" },
  important: { en: "Important", es: "Importante" },
  operational: { en: "Operational", es: "Operacional" },
};

/* ------------------------------------------------------------------ */
/*  VendorCard                                                         */
/* ------------------------------------------------------------------ */

function VendorCard({ vendor, locale }: { vendor: TechVendor; locale: string }) {
  const [expanded, setExpanded] = useState(false);
  const isEs = locale === "es";

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-stone-700 dark:bg-stone-800">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-semibold text-stone-900 dark:text-stone-100">
              {vendor.name}
            </h4>
            {vendor.nachcPartner && (
              <Badge variant="outline" className="text-xs border-teal-300 text-teal-700 dark:text-teal-400">
                <BadgeCheck className="mr-1 h-3 w-3" />
                NACHC
              </Badge>
            )}
          </div>
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
            {t(vendor.tagline, locale)}
          </p>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${FIT_STYLES[vendor.fqhcFit]}`}>
          {t(FIT_LABELS[vendor.fqhcFit], locale)}
        </span>
      </div>

      {/* Pricing */}
      {(vendor.pricingRange || vendor.pricingNote) && (
        <div className="mt-3 rounded bg-stone-50 px-3 py-2 dark:bg-stone-900/50">
          {vendor.pricingRange && (
            <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              ${vendor.pricingRange.min}–${vendor.pricingRange.max}
              <span className="ml-1 text-xs font-normal text-stone-500">
                {vendor.pricingRange.unit}
              </span>
            </p>
          )}
          {vendor.pricingNote && (
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              {t(vendor.pricingNote, locale)}
            </p>
          )}
        </div>
      )}

      {/* FQHC Discount callout */}
      {vendor.fqhcDiscount && (
        <div className="mt-2 flex items-start gap-1.5 rounded bg-teal-50 px-3 py-2 dark:bg-teal-900/20">
          <Star className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-600" />
          <p className="text-xs text-teal-800 dark:text-teal-300">
            {t(vendor.fqhcDiscount, locale)}
          </p>
        </div>
      )}

      {/* Key Features (always visible) */}
      <ul className="mt-3 space-y-1">
        {vendor.keyFeatures.slice(0, 3).map((f, i) => (
          <li key={i} className="flex items-start gap-1.5 text-xs text-stone-600 dark:text-stone-400">
            <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-teal-500" />
            {t(f, locale)}
          </li>
        ))}
      </ul>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 flex items-center gap-1 text-xs font-medium text-teal-700 hover:text-teal-800 dark:text-teal-400"
      >
        {expanded
          ? (isEs ? "Menos detalles" : "Less detail")
          : (isEs ? "Mas detalles" : "More detail")}
        {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="mt-3 space-y-3 border-t border-stone-100 pt-3 dark:border-stone-700">
          {/* Description */}
          <p className="text-xs text-stone-600 dark:text-stone-400">
            {t(vendor.description, locale)}
          </p>

          {/* FQHC Fit Reason */}
          <div>
            <p className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              {isEs ? "Por que para FQHCs" : "Why for FQHCs"}
            </p>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              {t(vendor.fqhcFitReason, locale)}
            </p>
          </div>

          {/* All features */}
          {vendor.keyFeatures.length > 3 && (
            <ul className="space-y-1">
              {vendor.keyFeatures.slice(3).map((f, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-stone-600 dark:text-stone-400">
                  <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-teal-500" />
                  {t(f, locale)}
                </li>
              ))}
            </ul>
          )}

          {/* Limitations */}
          {vendor.limitations.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                {isEs ? "Limitaciones" : "Limitations"}
              </p>
              <ul className="space-y-1">
                {vendor.limitations.map((l, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-stone-500">
                    <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-amber-500" />
                    {t(l, locale)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* EHR Integrations */}
          {vendor.ehrIntegrations.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                EHR Integrations
              </p>
              <div className="flex flex-wrap gap-1.5">
                {vendor.ehrIntegrations.map((e) => (
                  <span key={e.ehr} className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs ${
                    e.level === "native" ? "bg-teal-100 text-teal-800" :
                    e.level === "api" ? "bg-blue-100 text-blue-800" :
                    e.level === "partial" ? "bg-amber-100 text-amber-800" :
                    "bg-stone-100 text-stone-500"
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${
                      e.level === "native" ? "bg-teal-500" :
                      e.level === "api" ? "bg-blue-500" :
                      e.level === "partial" ? "bg-amber-500" :
                      "bg-stone-400"
                    }`} />
                    {e.ehr}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* FQHC Customers */}
          {vendor.fqhcCustomers.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                {isEs ? "Clientes FQHC" : "FQHC Customers"}
              </p>
              <p className="text-xs text-stone-500">{vendor.fqhcCustomers.join(", ")}</p>
            </div>
          )}

          {/* HIPAA + Source */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {vendor.hipaaCompliant && (
                <Badge variant="outline" className="text-xs border-green-300 text-green-700">
                  HIPAA
                </Badge>
              )}
            </div>
            <a
              href={vendor.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-teal-600 hover:text-teal-700"
            >
              {isEs ? "Fuente" : "Source"} <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CategorySection                                                    */
/* ------------------------------------------------------------------ */

function CategorySection({
  category,
  vendors,
  locale,
}: {
  category: TechCategoryMeta;
  vendors: TechVendor[];
  locale: string;
}) {
  const Icon = ICON_MAP[category.icon] || Layers;
  const isEs = locale === "es";

  return (
    <section id={category.id} className="scroll-mt-24">
      {/* Category Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              {t(category.name, locale)}
            </h3>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${CRITICALITY_STYLES[category.criticalityLevel]}`}>
              {t(CRITICALITY_LABELS[category.criticalityLevel], locale)}
            </span>
          </div>
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
            {t(category.description, locale)}
          </p>
          <p className="mt-1 text-xs text-stone-500">
            {isEs ? "Presupuesto tipico" : "Typical budget"}: {t(category.budgetRange, locale)}
          </p>
        </div>
      </div>

      {/* Key Considerations */}
      <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900/50 dark:bg-amber-950/20">
        <p className="text-xs font-semibold text-amber-800 dark:text-amber-300 mb-2">
          {isEs ? "Consideraciones clave para FQHCs" : "Key Considerations for FQHCs"}
        </p>
        <ul className="space-y-1">
          {category.keyConsiderations.map((c, i) => (
            <li key={i} className="flex items-start gap-1.5 text-xs text-amber-700 dark:text-amber-400">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
              {t(c, locale)}
            </li>
          ))}
        </ul>
      </div>

      {/* Vendor Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {vendors.map((v) => (
          <VendorCard key={v.id} vendor={v} locale={locale} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  StackProfileCard                                                   */
/* ------------------------------------------------------------------ */

function StackProfileCard({ profile, locale }: { profile: TechStackProfile; locale: string }) {
  const [expanded, setExpanded] = useState(false);
  const sizeLabels = {
    small: { en: "Small", es: "Pequeno" },
    medium: { en: "Medium", es: "Mediano" },
    large: { en: "Large", es: "Grande" },
  };

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-800">
      <div className="flex items-center justify-between">
        <div>
          <Badge className="mb-2 bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400">
            {t(sizeLabels[profile.orgSize], locale)}
          </Badge>
          <h4 className="font-semibold text-stone-900 dark:text-stone-100">
            {t(profile.name, locale)}
          </h4>
          <p className="text-sm text-stone-500">{t(profile.annualBudget, locale)}</p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-teal-700 hover:text-teal-800 dark:text-teal-400"
        >
          {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>
      <p className="mt-2 text-xs text-stone-600 dark:text-stone-400">
        {t(profile.description, locale)}
      </p>
      {expanded && (
        <div className="mt-3 space-y-1.5 border-t border-stone-100 pt-3 dark:border-stone-700">
          {profile.stack.map((item, i) => {
            const vendor = TECH_VENDORS.find((v) => v.id === item.vendorId);
            const cat = TECH_CATEGORIES.find((c) => c.id === item.category);
            if (!vendor || !cat) return null;
            return (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="w-32 shrink-0 font-medium text-stone-500 truncate">
                  {t(cat.name, locale)}
                </span>
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  {vendor.name}
                </span>
                {item.note && (
                  <span className="text-stone-400 truncate">— {item.note}</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function TechStackPage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const stats = getTechStackStats();

  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<TechCategory | "all">("all");
  const [fitFilter, setFitFilter] = useState<string>("all");

  // Filter vendors
  const filteredCategories = useMemo(() => {
    return TECH_CATEGORIES.filter((cat) => {
      if (activeCat !== "all" && cat.id !== activeCat) return false;
      return true;
    }).map((cat) => {
      let vendors = getVendorsByCategory(cat.id);
      if (fitFilter !== "all") {
        vendors = vendors.filter((v) => v.fqhcFit === fitFilter);
      }
      if (search) {
        const q = search.toLowerCase();
        vendors = vendors.filter(
          (v) =>
            v.name.toLowerCase().includes(q) ||
            v.tagline.en.toLowerCase().includes(q) ||
            v.tagline.es.toLowerCase().includes(q) ||
            v.tags.some((tag) => tag.includes(q)),
        );
      }
      return { category: cat, vendors };
    }).filter((c) => c.vendors.length > 0);
  }, [activeCat, fitFilter, search]);

  const scrollToCategory = (id: string) => {
    setActiveCat(id as TechCategory);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 px-4 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-wider text-teal-400 mb-2">
            {isEs ? "Inteligencia Tecnologica" : "Technology Intelligence"}
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {isEs ? "Stack Tecnologico de FQHCs" : "FQHC Technology Stack"}
          </h1>
          <p className="mt-3 max-w-2xl text-stone-300">
            {isEs
              ? "Guia completa de proveedores de software para centros de salud comunitarios — precios, compatibilidad, descuentos y evaluaciones de compatibilidad FQHC."
              : "The complete guide to software vendors for community health centers — pricing, compatibility, FQHC discounts, and fit assessments across every category."}
          </p>
          <p className="mt-2 text-xs text-stone-400">
            {isEs ? "Actualizado" : "Updated"}: {TECH_STACK_LAST_UPDATED}
          </p>

          {/* Stat bar */}
          <div className="mt-6 flex flex-wrap gap-4">
            {[
              { label: isEs ? "Proveedores" : "Vendors", value: stats.totalVendors },
              { label: isEs ? "Categorias" : "Categories", value: stats.totalCategories },
              { label: isEs ? "Alta Compat." : "High Fit", value: stats.highFitCount },
              { label: isEs ? "Socios NACHC" : "NACHC Partners", value: stats.nachcPartnerCount },
              { label: isEs ? "Descuentos FQHC" : "FQHC Discounts", value: stats.discountCount },
            ].map((s) => (
              <div key={s.label} className="rounded-lg bg-white/10 px-4 py-2 backdrop-blur">
                <p className="text-xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-stone-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Navigator + Filters */}
      <section className="sticky top-0 z-30 border-b border-stone-200 bg-white/95 backdrop-blur px-4 py-3 dark:border-stone-700 dark:bg-stone-900/95">
        <div className="mx-auto max-w-6xl">
          {/* Search + Fit Filter */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={isEs ? "Buscar proveedores..." : "Search vendors..."}
                className="w-full rounded-lg border border-stone-200 bg-white py-2 pl-9 pr-3 text-sm dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <Filter className="h-4 w-4 text-stone-400" />
              {["all", "high", "moderate", "low"].map((fit) => (
                <button
                  key={fit}
                  onClick={() => setFitFilter(fit)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                    fitFilter === fit
                      ? "bg-teal-700 text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400"
                  }`}
                >
                  {fit === "all" ? (isEs ? "Todos" : "All") : t(FIT_LABELS[fit], locale)}
                </button>
              ))}
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveCat("all")}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                activeCat === "all"
                  ? "bg-teal-700 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400"
              }`}
            >
              {isEs ? "Todas las categorias" : "All Categories"}
            </button>
            {TECH_CATEGORIES.map((cat) => {
              const Icon = ICON_MAP[cat.icon] || Layers;
              const count = getVendorsByCategory(cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition ${
                    activeCat === cat.id
                      ? "bg-teal-700 text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400"
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  {t(cat.name, locale)}
                  <span className="opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* EHR Integration Legend */}
        <div className="mb-8 flex flex-wrap items-center gap-4 rounded-lg border border-stone-200 bg-white p-3 text-xs dark:border-stone-700 dark:bg-stone-800">
          <span className="font-semibold text-stone-700 dark:text-stone-300">
            EHR Integration:
          </span>
          {[
            { level: "native", color: "bg-teal-500", label: "Native" },
            { level: "api", color: "bg-blue-500", label: "API" },
            { level: "partial", color: "bg-amber-500", label: "Partial" },
            { level: "none", color: "bg-stone-400", label: "None" },
          ].map((l) => (
            <span key={l.level} className="flex items-center gap-1 text-stone-600 dark:text-stone-400">
              <span className={`h-2 w-2 rounded-full ${l.color}`} />
              {l.label}
            </span>
          ))}
        </div>

        {/* Category Sections */}
        <div className="space-y-12">
          {filteredCategories.map(({ category, vendors }) => (
            <CategorySection
              key={category.id}
              category={category}
              vendors={vendors}
              locale={locale}
            />
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg text-stone-500">
              {isEs ? "No se encontraron proveedores" : "No vendors found"}
            </p>
            <button
              onClick={() => { setSearch(""); setFitFilter("all"); setActiveCat("all"); }}
              className="mt-2 text-sm text-teal-600 hover:text-teal-700"
            >
              {isEs ? "Limpiar filtros" : "Clear filters"}
            </button>
          </div>
        )}

        {/* Sample Stack Profiles */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
            {isEs ? "Perfiles de Stack por Tamano" : "Stack Profiles by Size"}
          </h2>
          <p className="text-sm text-stone-500 mb-6">
            {isEs
              ? "Stacks tecnologicos recomendados para FQHCs pequenos, medianos y grandes."
              : "Recommended technology stacks for small, medium, and large FQHCs."}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TECH_STACK_PROFILES.map((p) => (
              <StackProfileCard key={p.id} profile={p} locale={locale} />
            ))}
          </div>
        </section>

        {/* Cross-links */}
        <section className="mt-16 grid gap-4 sm:grid-cols-3">
          <Link
            href="/ai-tracker"
            className="flex items-center gap-3 rounded-lg border border-stone-200 bg-white p-4 transition hover:shadow-md dark:border-stone-700 dark:bg-stone-800"
          >
            <Stethoscope className="h-8 w-8 text-teal-600" />
            <div>
              <p className="font-semibold text-stone-900 dark:text-stone-100">
                {isEs ? "Monitor de IA" : "AI Tracker"}
              </p>
              <p className="text-xs text-stone-500">
                {isEs ? "Adopcion de IA en FQHCs" : "AI adoption monitoring"}
              </p>
            </div>
            <ArrowRight className="ml-auto h-4 w-4 text-stone-400" />
          </Link>
          <Link
            href="/strategy/resilience"
            className="flex items-center gap-3 rounded-lg border border-stone-200 bg-white p-4 transition hover:shadow-md dark:border-stone-700 dark:bg-stone-800"
          >
            <Shield className="h-8 w-8 text-teal-600" />
            <div>
              <p className="font-semibold text-stone-900 dark:text-stone-100">
                {isEs ? "Scorecard de Resiliencia" : "Resilience Scorecard"}
              </p>
              <p className="text-xs text-stone-500">
                {isEs ? "220 FQHCs evaluados" : "220 FQHCs scored"}
              </p>
            </div>
            <ArrowRight className="ml-auto h-4 w-4 text-stone-400" />
          </Link>
          <Link
            href="/strategy/guides"
            className="flex items-center gap-3 rounded-lg border border-stone-200 bg-white p-4 transition hover:shadow-md dark:border-stone-700 dark:bg-stone-800"
          >
            <Building2 className="h-8 w-8 text-teal-600" />
            <div>
              <p className="font-semibold text-stone-900 dark:text-stone-100">
                {isEs ? "Guias Ejecutivas" : "Executive Guides"}
              </p>
              <p className="text-xs text-stone-500">
                {isEs ? "Casos de estudio reales" : "Real case studies"}
              </p>
            </div>
            <ArrowRight className="ml-auto h-4 w-4 text-stone-400" />
          </Link>
        </section>

        {/* Newsletter */}
        <div className="mt-12">
          <NewsletterSignup variant="card" defaultAudience="intel-brief" />
        </div>
      </main>
    </div>
  );
}
