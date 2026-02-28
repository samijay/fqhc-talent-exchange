"use client";

import { useState, useMemo } from "react";
import {
  BookOpen,
  Stethoscope,
  Receipt,
  ShieldCheck,
  ExternalLink,
  Filter,
  ChevronDown,
  ChevronUp,
  Clock,
  ArrowRight,
  Award,
  FileText,
  TrendingUp,
} from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FQHC_GUIDES,
  GUIDE_CATEGORIES,
  GUIDE_ROLE_OPTIONS,
  DIFFICULTY_LABELS,
  DIFFICULTY_STYLES,
  getAllGuideSources,
  type FQHCGuide,
  type GuideCategory,
  type DifficultyLevel,
} from "@/lib/fqhc-guides";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

const CATEGORY_ICONS: Record<GuideCategory, typeof Stethoscope> = {
  "clinical-workflows": Stethoscope,
  "revenue-billing": Receipt,
  "programs-compliance": ShieldCheck,
};

/* ------------------------------------------------------------------ */
/*  Guide Card                                                         */
/* ------------------------------------------------------------------ */

function GuideCard({
  guide,
  locale,
}: {
  guide: FQHCGuide;
  locale: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const isEs = locale === "es";

  return (
    <div className="rounded-xl border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Collapsed header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 flex items-start gap-4"
      >
        <div className="flex-1 min-w-0">
          {/* Title row */}
          <h3 className="text-lg font-semibold text-stone-800 leading-snug">
            {t(guide.title, locale)}
          </h3>

          {/* Badges row */}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className={`text-xs font-medium ${DIFFICULTY_STYLES[guide.difficulty]}`}
            >
              {t(DIFFICULTY_LABELS[guide.difficulty], locale)}
            </Badge>
            <span className="flex items-center gap-1 text-xs text-stone-500">
              <Clock className="h-3 w-3" />
              {guide.readTime}
            </span>
            <Badge variant="outline" className="text-xs text-stone-500">
              {guide.primarySourceOrg}
            </Badge>
          </div>

          {/* Summary */}
          <p className="mt-2 text-sm text-stone-600 leading-relaxed">
            {t(guide.summary, locale)}
          </p>

          {/* Role tags */}
          <div className="mt-2 flex flex-wrap gap-1">
            {guide.targetRoles.slice(0, 4).map((role) => {
              const roleLabel = GUIDE_ROLE_OPTIONS.find(
                (r) => r.id === role
              );
              return (
                <span
                  key={role}
                  className="text-[11px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full"
                >
                  {roleLabel
                    ? isEs
                      ? roleLabel.es
                      : roleLabel.en
                    : role}
                </span>
              );
            })}
            {guide.targetRoles.length > 4 && (
              <span className="text-[11px] text-stone-400 px-1">
                +{guide.targetRoles.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Expand/collapse icon */}
        <div className="flex-shrink-0 mt-1 text-stone-400">
          {expanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-stone-100">
          {guide.sections.map((section, i) => (
            <div key={i} className="mt-4">
              <h4 className="font-semibold text-stone-800 text-sm">
                {t(section.heading, locale)}
              </h4>
              <ul className="mt-2 space-y-1.5">
                {section.keyPoints.map((point, j) => (
                  <li
                    key={j}
                    className="text-sm text-stone-600 leading-relaxed flex gap-2"
                  >
                    <span className="text-teal-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span>{t(point, locale)}</span>
                  </li>
                ))}
              </ul>
              {section.detail && (
                <p className="mt-2 text-xs text-stone-500 italic leading-relaxed pl-4">
                  {t(section.detail, locale)}
                </p>
              )}
            </div>
          ))}

          {/* Sources */}
          <div className="mt-5 pt-4 border-t border-stone-100">
            <div className="flex flex-wrap gap-2">
              <a
                href={guide.primarySourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-teal-50 px-3 py-2 text-sm font-medium text-teal-700 hover:bg-teal-100 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                {isEs ? "Ver Fuente Primaria" : "View Primary Source"} (
                {guide.primarySourceOrg})
              </a>
              {guide.additionalSources.map((src, i) => (
                <a
                  key={i}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-stone-200 px-2.5 py-1.5 text-xs text-stone-600 hover:bg-stone-50 transition-colors"
                >
                  <ExternalLink className="h-3 w-3" />
                  {src.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Cross-links — internal tools                                       */
/* ------------------------------------------------------------------ */

const CROSS_LINKS = [
  {
    href: "/resources" as const,
    icon: Award,
    en: "Career Resources",
    es: "Recursos Profesionales",
    descEn: "18 free & low-cost programs for FQHC workers",
    descEs: "18 programas gratuitos y de bajo costo",
  },
  {
    href: "/certifications" as const,
    icon: FileText,
    en: "Certifications",
    es: "Certificaciones",
    descEn: "15 CA-specific certifications with salary impact",
    descEs: "15 certificaciones específicas de CA con impacto salarial",
  },
  {
    href: "/career-roadmap" as const,
    icon: TrendingUp,
    en: "Career Roadmap",
    es: "Ruta Profesional",
    descEn: "5 career tracks with CA salary data",
    descEs: "5 trayectorias con datos salariales de CA",
  },
];

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function GuidesPage() {
  const locale = useLocale();
  const isEs = locale === "es";

  const [categoryFilter, setCategoryFilter] = useState<
    GuideCategory | "all"
  >("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState<
    DifficultyLevel | "all"
  >("all");

  /* ---- Filtered guides ---- */
  const filtered = useMemo(() => {
    return FQHC_GUIDES.filter((g) => {
      if (categoryFilter !== "all" && g.category !== categoryFilter)
        return false;
      if (roleFilter !== "all" && !g.targetRoles.includes(roleFilter))
        return false;
      if (difficultyFilter !== "all" && g.difficulty !== difficultyFilter)
        return false;
      return true;
    });
  }, [categoryFilter, roleFilter, difficultyFilter]);

  /* ---- Group by category ---- */
  const grouped = useMemo(() => {
    const map = new Map<GuideCategory, FQHCGuide[]>();
    for (const g of filtered) {
      const arr = map.get(g.category) || [];
      arr.push(g);
      map.set(g.category, arr);
    }
    return map;
  }, [filtered]);

  const allSources = useMemo(() => getAllGuideSources(), []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* ───────────────── Hero ───────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-800 via-teal-900 to-teal-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-700/30 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
            <BookOpen className="h-7 w-7 text-amber-400" />
          </div>
          <Badge
            variant="outline"
            className="mb-4 border-white/30 text-white/90 text-sm"
          >
            {FQHC_GUIDES.length}{" "}
            {isEs ? "guías operativas" : "operational guides"}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {isEs ? "Guías del Trabajo" : "Workplace Guides"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-teal-100 leading-relaxed">
            {isEs
              ? "Conocimiento práctico para trabajadores de FQHC — flujos de trabajo clínico, mecánica de facturación, y cómo funciona la economía de la salud. Cada guía tiene fuentes primarias."
              : "Practical knowledge for FQHC workers — clinical workflows, billing mechanics, and how healthcare economics work. Every guide cites primary sources."}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* ───────────────── Filter Bar ───────────────── */}
        <div className="mb-8 rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <Filter className="h-4 w-4 text-stone-400" />

            {/* Category */}
            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(
                  e.target.value as GuideCategory | "all"
                )
              }
              className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 focus:border-teal-500 focus:outline-none"
            >
              <option value="all">
                {isEs ? "Todas las categorías" : "All Categories"}
              </option>
              {GUIDE_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {isEs ? cat.es : cat.en}
                </option>
              ))}
            </select>

            {/* Role */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 focus:border-teal-500 focus:outline-none"
            >
              {GUIDE_ROLE_OPTIONS.map((role) => (
                <option key={role.id} value={role.id}>
                  {isEs ? role.es : role.en}
                </option>
              ))}
            </select>

            {/* Difficulty */}
            <select
              value={difficultyFilter}
              onChange={(e) =>
                setDifficultyFilter(
                  e.target.value as DifficultyLevel | "all"
                )
              }
              className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 focus:border-teal-500 focus:outline-none"
            >
              <option value="all">
                {isEs ? "Todos los niveles" : "All Levels"}
              </option>
              {(
                Object.keys(DIFFICULTY_LABELS) as DifficultyLevel[]
              ).map((level) => (
                <option key={level} value={level}>
                  {t(DIFFICULTY_LABELS[level], locale)}
                </option>
              ))}
            </select>

            {/* Count */}
            <span className="ml-auto text-sm text-stone-500">
              {filtered.length}{" "}
              {isEs
                ? filtered.length === 1
                  ? "guía"
                  : "guías"
                : filtered.length === 1
                  ? "guide"
                  : "guides"}
            </span>
          </div>
        </div>

        {/* ───────────────── Guide Cards by Category ───────────────── */}
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-stone-500">
            <BookOpen className="h-10 w-10 mx-auto mb-3 text-stone-300" />
            <p className="text-lg font-medium">
              {isEs
                ? "No se encontraron guías con esos filtros"
                : "No guides match those filters"}
            </p>
            <p className="text-sm mt-1">
              {isEs
                ? "Intenta cambiar tus filtros"
                : "Try adjusting your filters"}
            </p>
          </div>
        ) : (
          GUIDE_CATEGORIES.filter((cat) => grouped.has(cat.id)).map(
            (cat) => {
              const CatIcon = CATEGORY_ICONS[cat.id];
              const guides = grouped.get(cat.id)!;
              return (
                <section key={cat.id} className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50">
                      <CatIcon className="h-5 w-5 text-teal-700" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-stone-800">
                        {isEs ? cat.es : cat.en}
                      </h2>
                      <p className="text-sm text-stone-500">
                        {t(cat.description, locale)}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {guides.map((guide) => (
                      <GuideCard
                        key={guide.id}
                        guide={guide}
                        locale={locale}
                      />
                    ))}
                  </div>
                </section>
              );
            }
          )
        )}

        {/* ───────────────── Cross-links ───────────────── */}
        <section className="mt-12 mb-10">
          <h2 className="text-xl font-bold text-stone-800 mb-4">
            {isEs ? "Más Herramientas de Carrera" : "More Career Tools"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {CROSS_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group rounded-xl border border-stone-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-teal-200 transition-all"
                >
                  <Icon className="h-6 w-6 text-teal-600 mb-2" />
                  <h3 className="font-semibold text-stone-800 group-hover:text-teal-700 transition-colors">
                    {isEs ? link.es : link.en}
                  </h3>
                  <p className="text-sm text-stone-500 mt-1">
                    {isEs ? link.descEs : link.descEn}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ───────────────── Sources Index ───────────────── */}
        <section className="mt-8 rounded-xl border border-stone-200 bg-stone-50 p-6">
          <h2 className="text-lg font-bold text-stone-800 mb-3">
            {isEs ? "Índice de Fuentes" : "Sources Index"}
          </h2>
          <p className="text-sm text-stone-500 mb-4">
            {isEs
              ? "Cada guía cita fuentes primarias. Aquí están todas las fuentes referenciadas."
              : "Every guide cites primary sources. Here are all referenced sources."}
          </p>
          <ul className="space-y-1.5">
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
        </section>

        {/* ───────────────── CTA ───────────────── */}
        <section className="mt-10 mb-8 text-center">
          <div className="rounded-2xl bg-gradient-to-r from-teal-800 to-teal-900 p-8 text-white">
            <h2 className="text-2xl font-bold">
              {isEs
                ? "¿Listo/a para dar el siguiente paso?"
                : "Ready to take the next step?"}
            </h2>
            <p className="mt-2 text-teal-100 max-w-lg mx-auto">
              {isEs
                ? "Únete a la red de talento de FQHC y recibe oportunidades de empleo en salud comunitaria."
                : "Join the FQHC talent network and receive community health job opportunities."}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link href="/join">
                <Button
                  size="lg"
                  className="bg-white text-teal-800 hover:bg-teal-50 font-semibold"
                >
                  {isEs ? "Unirse a la Red" : "Join the Network"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/jobs">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 font-semibold"
                >
                  {isEs ? "Ver Empleos" : "Browse Jobs"}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
