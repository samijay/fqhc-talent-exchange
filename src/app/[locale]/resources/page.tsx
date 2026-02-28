"use client";

import { useState, useMemo } from "react";
import {
  GraduationCap,
  DollarSign,
  BookOpen,
  Users,
  Building2,
  ExternalLink,
  Filter,
  Clock,
  AlertTriangle,
  ArrowRight,
  FileText,
  ClipboardCheck,
  TrendingUp,
  Award,
  Star,
} from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CAREER_RESOURCES,
  RESOURCE_CATEGORIES,
  getUpcomingDeadlines,
  getAllSources,
  type CareerResource,
  type ResourceCategory,
  type CostTier,
} from "@/lib/career-resources";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

const CATEGORY_ICONS: Record<ResourceCategory, typeof DollarSign> = {
  "loan-repayment": DollarSign,
  "free-training": GraduationCap,
  "professional-development": BookOpen,
  "union-education": Users,
  "state-workforce": Building2,
};

const COST_BADGE_STYLES: Record<CostTier, string> = {
  free: "bg-green-100 text-green-700 border-green-200",
  low: "bg-amber-100 text-amber-700 border-amber-200",
  varies: "bg-stone-100 text-stone-600 border-stone-200",
};

const COST_LABELS: Record<CostTier, { en: string; es: string }> = {
  free: { en: "Free", es: "Gratis" },
  low: { en: "Low Cost", es: "Bajo Costo" },
  varies: { en: "Varies", es: "Varía" },
};

function formatDeadline(dateStr: string, locale: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(locale === "es" ? "es-US" : "en-US", {
    month: "long",
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
/*  Internal Tools Section                                             */
/* ------------------------------------------------------------------ */

const YOUR_TOOLS = [
  {
    href: "/certifications" as const,
    icon: Award,
    title: {
      en: "Certifications Catalog",
      es: "Catálogo de Certificaciones",
    },
    desc: {
      en: "15 CA-specific certifications with cost, duration, and salary impact",
      es: "15 certificaciones específicas de CA con costo, duración e impacto salarial",
    },
  },
  {
    href: "/career-roadmap" as const,
    icon: TrendingUp,
    title: {
      en: "Career Roadmap",
      es: "Mapa de Carrera",
    },
    desc: {
      en: "5 career tracks, 4 levels each, with CA salary data",
      es: "5 carreras, 4 niveles cada una, con datos salariales de CA",
    },
  },
  {
    href: "/career-insights" as const,
    icon: ClipboardCheck,
    title: {
      en: "Career Assessment",
      es: "Evaluación de Carrera",
    },
    desc: {
      en: "Free 5-domain assessment with a personalized 90-day plan",
      es: "Evaluación gratuita de 5 dominios con un plan personalizado de 90 días",
    },
  },
  {
    href: "/resume-builder" as const,
    icon: FileText,
    title: {
      en: "Resume Builder",
      es: "Constructor de Currículum",
    },
    desc: {
      en: "Free FQHC resume builder with 8 role-specific templates",
      es: "Constructor de currículum FQHC gratuito con 8 plantillas por rol",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Resource Card                                                      */
/* ------------------------------------------------------------------ */

function ResourceCard({
  resource,
  locale,
}: {
  resource: CareerResource;
  locale: string;
}) {
  const isEs = locale === "es";
  const hasDeadline = resource.deadline && daysUntil(resource.deadline) > 0;

  return (
    <div
      className={`rounded-xl border bg-white p-5 shadow-sm transition-all hover:shadow-md ${
        resource.isFeatured
          ? "border-teal-200 ring-1 ring-teal-100"
          : "border-stone-200"
      }`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-stone-900">
              {t(resource.name, locale)}
            </h3>
            {resource.isFeatured && (
              <Star className="size-4 fill-amber-400 text-amber-400" />
            )}
          </div>
          <p className="mt-0.5 text-sm text-stone-500">{resource.sourceOrg}</p>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
            COST_BADGE_STYLES[resource.cost]
          }`}
        >
          {t(COST_LABELS[resource.cost], locale)}
        </span>
      </div>

      {/* Award amount */}
      {resource.awardAmount && (
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2">
          <DollarSign className="size-4 text-green-600" />
          <span className="text-sm font-semibold text-green-700">
            {resource.awardAmount}
          </span>
        </div>
      )}

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-stone-600">
        {t(resource.description, locale)}
      </p>

      {/* Eligibility */}
      <div className="mt-3">
        <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
          {isEs ? "Elegibilidad" : "Eligibility"}
        </p>
        <p className="mt-1 text-sm text-stone-500">
          {t(resource.eligibility, locale)}
        </p>
      </div>

      {/* Deadline alert */}
      {hasDeadline && resource.deadlineNote && (
        <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
          <Clock className="mt-0.5 size-4 shrink-0 text-amber-600" />
          <div>
            <span className="text-sm font-medium text-amber-700">
              {t(resource.deadlineNote, locale)}
            </span>
            <span className="ml-2 text-xs text-amber-600">
              ({daysUntil(resource.deadline!)} {isEs ? "días" : "days"})
            </span>
          </div>
        </div>
      )}

      {/* Visit button */}
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-100"
      >
        {isEs ? "Visitar Programa" : "Visit Program"}
        <ExternalLink className="size-3.5" />
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function ResourcesPage() {
  const locale = useLocale();
  const isEs = locale === "es";

  const [categoryFilter, setCategoryFilter] = useState<
    ResourceCategory | "all"
  >("all");
  const [costFilter, setCostFilter] = useState<CostTier | "all">("all");

  const upcomingDeadlines = useMemo(() => getUpcomingDeadlines(), []);
  const sources = useMemo(() => getAllSources(), []);

  const filtered = useMemo(() => {
    return CAREER_RESOURCES.filter((r) => {
      if (categoryFilter !== "all" && r.category !== categoryFilter)
        return false;
      if (costFilter !== "all" && r.cost !== costFilter) return false;
      return true;
    });
  }, [categoryFilter, costFilter]);

  // Group filtered results by category
  const grouped = useMemo(() => {
    const map = new Map<ResourceCategory, CareerResource[]>();
    for (const r of filtered) {
      const existing = map.get(r.category) || [];
      existing.push(r);
      map.set(r.category, existing);
    }
    // Preserve category order
    return RESOURCE_CATEGORIES.filter((cat) => map.has(cat.id)).map((cat) => ({
      ...cat,
      resources: map.get(cat.id)!,
    }));
  }, [filtered]);

  const freeCount = CAREER_RESOURCES.filter((r) => r.cost === "free").length;

  return (
    <div className="bg-stone-50">
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 text-white">
        <div className="absolute -left-32 -top-32 size-96 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 size-[28rem] rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <Badge className="mb-6 border-teal-400/30 bg-teal-500/20 text-teal-100 hover:bg-teal-500/30">
            <GraduationCap className="mr-1.5 size-3.5" />
            {isEs
              ? `${CAREER_RESOURCES.length} Programas · ${freeCount} Gratuitos`
              : `${CAREER_RESOURCES.length} Programs · ${freeCount} Free`}
          </Badge>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {isEs ? "Recursos Profesionales" : "Career Resources"}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-teal-100/90">
            {isEs
              ? "Programas gratuitos y de mejor valor para trabajadores de FQHCs en California — reembolso de préstamos, capacitación, fondos educativos sindicales y más. Cada recurso con enlace a la fuente primaria."
              : "Free and best-value programs for FQHC workers in California — loan repayment, training, union education funds, and more. Every resource linked to its primary source."}
          </p>
        </div>
      </section>

      {/* ==================== DEADLINE BANNER ==================== */}
      {upcomingDeadlines.length > 0 && (
        <section className="border-b border-amber-200 bg-amber-50 px-4 py-4 sm:px-6">
          <div className="mx-auto flex max-w-5xl items-start gap-3">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />
            <div>
              <p className="font-semibold text-amber-800">
                {isEs ? "Fechas Límite Próximas" : "Upcoming Deadlines"}
              </p>
              {upcomingDeadlines.map((r) => (
                <p key={r.id} className="mt-1 text-sm text-amber-700">
                  <span className="font-medium">{t(r.name, locale)}</span>
                  {" — "}
                  {r.deadlineNote ? t(r.deadlineNote, locale) : ""}
                  <span className="ml-1 text-amber-600">
                    ({daysUntil(r.deadline!)} {isEs ? "días" : "days"})
                  </span>
                  {" · "}
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-amber-900"
                  >
                    {isEs ? "Solicitar" : "Apply"}
                  </a>
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==================== FILTERS ==================== */}
      <section className="px-4 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-4 rounded-xl border border-stone-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-center gap-2 text-stone-500">
              <Filter className="size-4" />
              <span className="text-sm font-medium">
                {isEs ? "Filtrar" : "Filter"}
              </span>
            </div>

            <div className="flex flex-1 flex-wrap gap-3">
              <select
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(
                    e.target.value as ResourceCategory | "all"
                  )
                }
                className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-700 focus:border-teal-300 focus:ring-1 focus:ring-teal-300"
              >
                <option value="all">
                  {isEs ? "Todas las categorías" : "All Categories"}
                </option>
                {RESOURCE_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {isEs ? cat.es : cat.en}
                  </option>
                ))}
              </select>

              <select
                value={costFilter}
                onChange={(e) =>
                  setCostFilter(e.target.value as CostTier | "all")
                }
                className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-700 focus:border-teal-300 focus:ring-1 focus:ring-teal-300"
              >
                <option value="all">
                  {isEs ? "Todos los costos" : "All Costs"}
                </option>
                <option value="free">{isEs ? "Gratis" : "Free"}</option>
                <option value="low">
                  {isEs ? "Bajo Costo" : "Low Cost"}
                </option>
                <option value="varies">{isEs ? "Varía" : "Varies"}</option>
              </select>
            </div>

            <p className="text-sm text-stone-500">
              {filtered.length} {isEs ? "de" : "of"} {CAREER_RESOURCES.length}{" "}
              {isEs ? "resultados" : "results"}
            </p>
          </div>
        </div>
      </section>

      {/* ==================== RESOURCE CARDS ==================== */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          {grouped.map((group) => {
            const Icon = CATEGORY_ICONS[group.id];
            return (
              <div key={group.id}>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-stone-900">
                      {isEs ? group.es : group.en}
                    </h2>
                    <p className="text-sm text-stone-500">
                      {group.resources.length}{" "}
                      {isEs ? "programas" : "programs"}
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {group.resources.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      locale={locale}
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="rounded-xl border border-stone-200 bg-white p-10 text-center">
              <p className="text-stone-500">
                {isEs
                  ? "No se encontraron recursos con estos filtros."
                  : "No resources found with these filters."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ==================== YOUR EXISTING TOOLS ==================== */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
              {isEs
                ? "Tus Herramientas Gratuitas"
                : "Your Free Tools"}
            </h2>
            <p className="mt-3 text-stone-600">
              {isEs
                ? "Herramientas de carrera que ya tienes disponibles en FQHC Talent Exchange"
                : "Career tools already available to you at FQHC Talent Exchange"}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {YOUR_TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex items-start gap-4 rounded-xl border border-stone-200 bg-stone-50 p-6 transition-all hover:-translate-y-1 hover:shadow-md hover:bg-white"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700 transition-colors group-hover:bg-teal-100">
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900">
                      {t(tool.title, locale)}
                    </h3>
                    <p className="mt-1 text-sm text-stone-600">
                      {t(tool.desc, locale)}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-teal-700">
                      {isEs ? "Explorar" : "Explore"}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== SOURCES INDEX ==================== */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-xl border border-stone-200 bg-white p-6 sm:p-8">
            <h2 className="mb-4 text-lg font-bold text-stone-900">
              {isEs ? "Índice de Fuentes" : "Sources Index"}
            </h2>
            <p className="mb-4 text-sm text-stone-500">
              {isEs
                ? "Cada recurso enlaza directamente a su fuente primaria. Sin contenido de terceros, sin intermediarios."
                : "Every resource links directly to its primary source. No third-party content, no intermediaries."}
            </p>
            <ol className="list-decimal space-y-1.5 pl-5">
              {sources.map((s, i) => (
                <li key={i} className="text-sm text-stone-600">
                  <span className="font-medium text-stone-700">{s.org}</span>
                  {" — "}
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-teal-600 underline underline-offset-2 hover:text-teal-800"
                  >
                    {s.url}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="rounded-2xl bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 p-10 text-white shadow-lg sm:p-14">
            <h2 className="text-2xl font-bold sm:text-3xl">
              {isEs
                ? "¿Listo para dar el siguiente paso?"
                : "Ready to Take the Next Step?"}
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-teal-100/90">
              {isEs
                ? "Únete a la comunidad de profesionales de salud conectándose con FQHCs en toda California."
                : "Join the community of health professionals connecting with FQHCs across California."}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/join">
                <Button
                  size="lg"
                  className="bg-amber-500 font-semibold text-stone-900 shadow-md hover:bg-amber-400"
                >
                  {isEs ? "Únete Ahora" : "Join Now"}
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </Link>
              <Link href="/jobs">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  {isEs ? "Ver Empleos" : "Browse Jobs"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
