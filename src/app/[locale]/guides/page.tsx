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
import { t } from "@/lib/i18n-helpers";
import { Link } from "@/i18n/navigation";
import { Breadcrumb, PageHero } from "@/components/ui/design-system";
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
import { useContentReads, type ContentRead } from "@/hooks/useContentReads";
import { ReadStatusBadge } from "@/components/content/ReadStatusBadge";
import { ShareButton } from "@/components/share/ShareButton";
import { FavoriteButton } from "@/components/dashboard/FavoriteButton";
import { ReadingLevelBadge } from "@/components/ui/ReadingLevelBadge";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

// t() imported from @/lib/i18n-helpers

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
  read,
  onExpand,
}: {
  guide: FQHCGuide;
  locale: string;
  read: ContentRead | undefined;
  onExpand: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const isEs = locale === "es";

  return (
    <div className="relative rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 shadow-sm transition-shadow hover:shadow-md">
      <div className="absolute right-12 top-5 z-10 flex items-center gap-1">
        <FavoriteButton contentType="guide" contentId={guide.id} size="sm" />
      </div>
      {/* Collapsed header — always visible */}
      <button
        onClick={() => {
          if (!expanded) onExpand(guide.id);
          setExpanded(!expanded);
        }}
        className="w-full text-left p-5 flex items-start gap-4"
        aria-expanded={expanded}
      >
        <div className="flex-1 min-w-0">
          {/* Title row */}
          <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-200 leading-snug flex items-center gap-2">
            <ReadStatusBadge read={read} />
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
            <span className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400">
              <Clock className="h-3 w-3" />
              {guide.readTime}
            </span>
            <Badge variant="outline" className="text-xs text-stone-500 dark:text-stone-400">
              {guide.primarySourceOrg}
            </Badge>
            <ReadingLevelBadge level={guide.difficulty === "beginner" ? "foundational" : guide.difficulty === "intermediate" ? "intermediate" : "advanced"} size="sm" />
          </div>

          {/* Summary */}
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
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
                  className="text-xs bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-400 px-2 py-0.5 rounded-full"
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
              <span className="text-xs text-stone-500 dark:text-stone-400 px-1">
                +{guide.targetRoles.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Expand/collapse icon */}
        <span className="flex-shrink-0 mt-1 text-stone-500 dark:text-stone-400">
          {expanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </span>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-stone-100 dark:border-stone-800">
          {guide.sections.map((section, i) => (
            <div key={i} className="mt-4">
              <h4 className="font-semibold text-stone-800 dark:text-stone-200 text-sm">
                {t(section.heading, locale)}
              </h4>
              <ul className="mt-2 space-y-1.5">
                {section.keyPoints.map((point, j) => (
                  <li
                    key={j}
                    className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed flex gap-2"
                  >
                    <span className="text-teal-600 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span>{t(point, locale)}</span>
                  </li>
                ))}
              </ul>
              {section.detail && (
                <p className="mt-2 text-xs text-stone-500 dark:text-stone-400 italic leading-relaxed pl-4">
                  {t(section.detail, locale)}
                </p>
              )}
            </div>
          ))}

          {/* Sources + Share */}
          <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex flex-wrap gap-2">
                <a
                  href={guide.primarySourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-teal-50 dark:bg-teal-950 px-3 py-2 text-sm font-medium text-teal-700 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900 transition-colors"
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
                    className="inline-flex items-center gap-1 rounded-lg border border-stone-200 dark:border-stone-700 px-2.5 py-1.5 text-xs text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {src.label}
                  </a>
                ))}
              </div>
              <ShareButton
                url={`https://www.fqhctalent.com/guides#${guide.id}`}
                title={guide.title.en}
                description={guide.summary.en}
                size="sm"
              />
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

/* ------------------------------------------------------------------ */
/*  FAQ schema data (static, English-only for search engines)         */
/* ------------------------------------------------------------------ */

const FAQ_SCHEMA_ITEMS = FQHC_GUIDES.slice(0, 8).map((guide) => ({
  question: `What is the "${guide.title.en}" guide?`,
  answer: guide.summary.en,
}));

export default function GuidesPage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const { reads, markAsReading } = useContentReads("guide");

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
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-white dark:from-stone-950 dark:to-stone-900">
      <Breadcrumb items={[
        { label: isEs ? "Inicio" : "Home", href: "/" },
        { label: isEs ? "Academia" : "Academy", href: "/academy" },
        { label: isEs ? "Gu\u00edas del Lugar de Trabajo" : "Workplace Guides" },
      ]} />
      <PageHero
        variant="dark"
        title={{ en: "Workplace Guides", es: "Guías del Trabajo" }}
        subtitle={{
          en: "Practical knowledge for FQHC workers — clinical workflows, billing mechanics, and how healthcare economics work. Every guide cites primary sources.",
          es: "Conocimiento práctico para trabajadores de FQHC — flujos de trabajo clínico, mecánica de facturación, y cómo funciona la economía de la salud. Cada guía tiene fuentes primarias.",
        }}
        meta={`${FQHC_GUIDES.length} ${isEs ? "guías operativas" : "operational guides"}`}
      />

      {/* ── Legal Disclaimer ── */}
      <div className="bg-amber-50 dark:bg-amber-950 border-b border-amber-200">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <p className="text-xs text-amber-800 text-center leading-relaxed">
            ⚠️{" "}
            {isEs
              ? "Solo con fines informativos. Estas guias son resumenes generados por IA de fuentes publicas y no constituyen asesoramiento medico, legal, financiero o profesional. Verifique siempre la informacion con fuentes primarias y profesionales calificados antes de actuar."
              : "For informational purposes only. These guides are AI-generated summaries of public sources and do not constitute medical, legal, financial, or professional advice. Always verify information with primary sources and qualified professionals before acting."}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* ───────────────── Filter Bar ───────────────── */}
        <div className="mb-8 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <Filter className="h-4 w-4 text-stone-500 dark:text-stone-400" />

            {/* Category */}
            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(
                  e.target.value as GuideCategory | "all"
                )
              }
              className="rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-2 text-sm text-stone-700 dark:text-stone-300 focus:border-teal-500 focus:outline-none"
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
              className="rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-2 text-sm text-stone-700 dark:text-stone-300 focus:border-teal-500 focus:outline-none"
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
              className="rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-2 text-sm text-stone-700 dark:text-stone-300 focus:border-teal-500 focus:outline-none"
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
            <span className="ml-auto text-sm text-stone-500 dark:text-stone-400">
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
          <div className="text-center py-12 text-stone-500 dark:text-stone-400">
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
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 dark:bg-teal-950">
                      <CatIcon className="h-5 w-5 text-teal-700 dark:text-teal-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-stone-800 dark:text-stone-200">
                        {isEs ? cat.es : cat.en}
                      </h2>
                      <p className="text-sm text-stone-500 dark:text-stone-400">
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
                        read={reads.get(guide.id)}
                        onExpand={(id) => markAsReading(id)}
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
          <h2 className="text-xl font-bold text-stone-800 dark:text-stone-200 mb-4">
            {isEs ? "Más Herramientas de Carrera" : "More Career Tools"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {CROSS_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-5 shadow-sm hover:shadow-md hover:border-teal-200 transition-all"
                >
                  <Icon className="h-6 w-6 text-teal-600 mb-2" />
                  <h3 className="font-semibold text-stone-800 dark:text-stone-200 group-hover:text-teal-700 dark:text-teal-400 transition-colors">
                    {isEs ? link.es : link.en}
                  </h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                    {isEs ? link.descEs : link.descEn}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ───────────────── Sources Index ───────────────── */}
        <section className="mt-8 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 p-6">
          <h2 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">
            {isEs ? "Índice de Fuentes" : "Sources Index"}
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">
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
                  className="text-teal-700 dark:text-teal-400 hover:text-teal-900 hover:underline inline-flex items-center gap-1"
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
                  className="bg-white dark:bg-stone-900 text-teal-800 hover:bg-teal-50 dark:hover:bg-teal-950 font-semibold"
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

      {/* FAQ structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_SCHEMA_ITEMS.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </main>
  );
}
