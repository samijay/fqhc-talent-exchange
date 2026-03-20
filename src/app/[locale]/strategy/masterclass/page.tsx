// FQHC Executive Masterclass — Mini deep-dive modules for the 2026 crisis moment
"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import {
  GraduationCap,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Target,
  CheckCircle2,
  BookOpen,
  ExternalLink,
  Filter,
  Users,
  Zap,
  Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MASTERCLASSES,
  MASTERCLASSES_LAST_UPDATED,
  MASTERCLASS_CATEGORIES,
  getMasterclassCounts,
  getCategoryMeta,
  getAudienceMeta,
  getDifficultyMeta,
  type MasterclassCategory,
  type MasterclassModule,
} from "@/lib/fqhc-masterclasses";
import { useContentReads, type ContentRead } from "@/hooks/useContentReads";
import { ReadStatusBadge } from "@/components/content/ReadStatusBadge";
import { ShareButton } from "@/components/share/ShareButton";
import { FavoriteButton } from "@/components/dashboard/FavoriteButton";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  Masterclass Card                                                   */
/* ------------------------------------------------------------------ */

function MasterclassCard({
  mc,
  locale,
  isEs,
  isExpanded,
  onToggle,
  read,
}: {
  mc: MasterclassModule;
  locale: string;
  isEs: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  read: ContentRead | undefined;
}) {
  const catMeta = getCategoryMeta(mc.category);
  const audMeta = getAudienceMeta(mc.audience);
  const diffMeta = getDifficultyMeta(mc.difficulty);

  return (
    <div className="relative rounded-2xl border border-stone-200 bg-white transition-shadow hover:shadow-md overflow-hidden">
      <div className="absolute right-12 top-6 z-10 flex items-center gap-1">
        <FavoriteButton contentType="masterclass" contentId={mc.id} size="sm" />
      </div>
      {/* Header — always visible */}
      <button
        onClick={onToggle}
        className="w-full text-left p-6 pb-4"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              {catMeta && (
                <Badge
                  variant="secondary"
                  className={`text-xs border ${catMeta.color}`}
                >
                  {isEs ? catMeta.es : catMeta.en}
                </Badge>
              )}
              {diffMeta && (
                <Badge
                  variant="outline"
                  className={`text-xs border ${diffMeta.color}`}
                >
                  {isEs ? diffMeta.es : diffMeta.en}
                </Badge>
              )}
              {audMeta && (
                <span className="inline-flex items-center gap-1 text-xs text-stone-400">
                  <Users className="size-3" />
                  {isEs ? audMeta.es : audMeta.en}
                </span>
              )}
            </div>

            {/* Title + subtitle */}
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <ReadStatusBadge read={read} />
              {t(mc.title, locale)}
            </h3>
            <p className="mt-1 text-sm text-stone-500">
              {t(mc.subtitle, locale)}
            </p>
          </div>
          <span className="flex-shrink-0 mt-1 text-stone-400">
            {isExpanded ? (
              <ChevronUp className="size-5" />
            ) : (
              <ChevronDown className="size-5" />
            )}
          </span>
        </div>

        {/* Urgency stat — always visible */}
        <div className="mt-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 border border-red-100 px-3 py-1 text-xs font-medium text-red-700">
            <AlertTriangle className="size-3" />
            {t(mc.urgencyStat, locale)}
          </span>
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-stone-100 px-6 pb-6 pt-4 space-y-5">
          {/* Why Now */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="size-4 text-amber-600" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-amber-700">
                {isEs ? "¿Por Qué Ahora?" : "Why Now?"}
              </h4>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed">
              {t(mc.whyNow, locale)}
            </p>
          </div>

          {/* Learning Objectives */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="size-4 text-teal-600" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-teal-700">
                {isEs ? "Objetivos de Aprendizaje" : "Learning Objectives"}
              </h4>
            </div>
            <ol className="space-y-1.5">
              {mc.learningObjectives.map((obj, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-stone-600"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-[10px] font-bold text-teal-700">
                    {i + 1}
                  </span>
                  {t(obj, locale)}
                </li>
              ))}
            </ol>
          </div>

          {/* Key Takeaways */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="size-4 text-green-600" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-green-700">
                {isEs ? "Conclusiones Clave" : "Key Takeaways"}
              </h4>
            </div>
            <ul className="space-y-1.5">
              {mc.keyTakeaways.map((tk, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-stone-600"
                >
                  <CheckCircle2 className="size-4 shrink-0 mt-0.5 text-green-500" />
                  {t(tk, locale)}
                </li>
              ))}
            </ul>
          </div>

          {/* Source Materials + Site Links + Share */}
          <div className="border-t border-stone-100 pt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="size-4 text-stone-500" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-stone-600">
                  {isEs ? "Materiales de Referencia" : "Source Materials"}
                </h4>
              </div>
              <ShareButton
                url={`https://www.fqhctalent.com/strategy/masterclass#${mc.id}`}
                title={mc.title.en}
                description={mc.subtitle.en}
                size="sm"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {mc.sourceMaterials.map((src) => (
                <a
                  key={src.url}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg bg-stone-50 border border-stone-200 px-2.5 py-1.5 text-xs text-stone-600 hover:bg-stone-100 hover:text-stone-800 transition-colors"
                >
                  <ExternalLink className="size-3" />
                  {src.label}
                </a>
              ))}
              {mc.siteLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href as "/strategy/guides"}
                  className="inline-flex items-center gap-1 rounded-lg bg-teal-50 border border-teal-200 px-2.5 py-1.5 text-xs text-teal-700 hover:bg-teal-100 transition-colors"
                >
                  <ArrowRight className="size-3" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  Masterclass Page                                                    */
/* ================================================================== */

export default function MasterclassPage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<MasterclassCategory | "all">("all");
  const { reads, markAsReading } = useContentReads("masterclass");

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        markAsReading(id);
      }
      return next;
    });
  };

  const filtered =
    activeCategory === "all"
      ? MASTERCLASSES
      : MASTERCLASSES.filter((m) => m.category === activeCategory);

  const counts = getMasterclassCounts();

  return (
    <div className="bg-stone-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="size-5 text-teal-400" />
            <span className="text-sm font-medium uppercase tracking-wider text-teal-400">
              {isEs ? "Estrategia" : "Strategy"}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {isEs ? "Masterclass Ejecutivo FQHC" : "FQHC Executive Masterclass"}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-300">
            {isEs
              ? "Mini módulos de estrategia profunda para el momento de crisis de 2026 — recortes de financiamiento, aplicación migratoria, erosión de fuerza laboral, y adopción de IA, todo a la vez."
              : "Mini deep-dive strategy modules for the 2026 crisis moment — funding cliffs, immigration enforcement, workforce erosion, and AI adoption, all at once."}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-stone-400">
            <span>
              {counts.total} {isEs ? "módulos" : "modules"}
            </span>
            <span className="text-stone-600">·</span>
            <span>
              {MASTERCLASS_CATEGORIES.length} {isEs ? "categorías" : "categories"}
            </span>
            <span className="text-stone-600">·</span>
            <span>{isEs ? "200+ fuentes investigadas" : "200+ sources researched"}</span>
            <span className="text-stone-600">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="size-3" />
              {isEs ? "Actualizado:" : "Updated:"} {MASTERCLASSES_LAST_UPDATED}
            </span>
          </div>
        </div>
      </section>

      {/* Why These Masterclasses, Why Now */}
      <section className="border-b border-stone-200 bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-10">
            <h2 className="text-xl font-bold text-stone-900 sm:text-2xl">
              {isEs
                ? "¿Por Qué Estos Masterclasses, Por Qué Ahora?"
                : "Why These Masterclasses, Why Now?"}
            </h2>
            <p className="mt-3 text-sm text-stone-500 leading-relaxed">
              {isEs
                ? "2026 es el año en que convergen múltiples crisis sin precedentes para los centros de salud comunitarios. H.R. 1 amenaza $4.6B en financiamiento de Medicaid. ICE está publicando fotos de arrestos en hospitales. El 50% de los centros de salud tuvieron márgenes negativos en 2023. Y la IA está automatizando el 70% de la documentación clínica. Estos 15 módulos abordan las decisiones más urgentes que los ejecutivos de FQHC deben tomar — respaldados por más de 200 fuentes primarias de HRSA, NACHC, KFF y publicaciones académicas."
                : "2026 is the year where multiple unprecedented crises converge for community health centers. H.R. 1 threatens $4.6B in Medicaid funding. ICE is posting photos of hospital arrests. 50% of health centers had negative margins in 2023. And AI is automating 70% of clinical documentation. These 15 modules address the most urgent decisions FQHC executives must make — backed by 200+ primary sources from HRSA, NACHC, KFF, and academic publications."}
            </p>
          </div>

          {/* Crisis convergence cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 text-center">
              <div className="text-2xl font-extrabold text-red-800">$4.6B</div>
              <div className="text-xs font-medium text-red-700 mt-1">
                {isEs ? "Financiamiento de Medicaid en riesgo" : "Medicaid funding at risk"}
              </div>
              <div className="text-xs text-stone-500 mt-0.5">H.R. 1</div>
            </div>
            <div className="rounded-xl border border-purple-200 bg-purple-50/50 p-4 text-center">
              <div className="text-2xl font-extrabold text-purple-800">84%</div>
              <div className="text-xs font-medium text-purple-700 mt-1">
                {isEs ? "Reportan caídas en visitas" : "Report patient visit declines"}
              </div>
              <div className="text-xs text-stone-500 mt-0.5">
                {isEs ? "Efecto de aplicación migratoria" : "Immigration enforcement effect"}
              </div>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 text-center">
              <div className="text-2xl font-extrabold text-amber-800">50%</div>
              <div className="text-xs font-medium text-amber-700 mt-1">
                {isEs ? "Márgenes negativos" : "Negative margins"}
              </div>
              <div className="text-xs text-stone-500 mt-0.5">
                {isEs ? "CHCs en 2023" : "CHCs in 2023"}
              </div>
            </div>
            <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-4 text-center">
              <div className="text-2xl font-extrabold text-teal-800">70%</div>
              <div className="text-xs font-medium text-teal-700 mt-1">
                {isEs ? "Documentación automatizable" : "Documentation automatable"}
              </div>
              <div className="text-xs text-stone-500 mt-0.5">
                {isEs ? "IA clínica ambiental" : "Ambient clinical AI"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Masterclass Cards */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex items-center gap-2 mb-6">
            <Filter className="size-4 text-stone-400" />
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveCategory("all")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  activeCategory === "all"
                    ? "bg-stone-800 text-white"
                    : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                }`}
              >
                {isEs ? "Todos" : "All"} ({counts.total})
              </button>
              {MASTERCLASS_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    activeCategory === cat.id
                      ? "bg-stone-800 text-white"
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                  }`}
                >
                  {isEs ? cat.es : cat.en} ({counts[cat.id] ?? 0})
                </button>
              ))}
            </div>
          </div>

          {/* Masterclass cards */}
          <div className="space-y-4">
            {filtered.map((mc) => (
              <MasterclassCard
                key={mc.id}
                mc={mc}
                locale={locale}
                isEs={isEs}
                isExpanded={expandedIds.has(mc.id)}
                onToggle={() => toggle(mc.id)}
                read={reads.get(mc.id)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-stone-500">
              {isEs
                ? "No hay módulos en esta categoría."
                : "No modules in this category."}
            </div>
          )}

          {/* Cross-navigation */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/strategy/guides">
                {isEs ? "Guías Ejecutivas" : "Executive Guides"}{" "}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/funding-impact">
                {isEs ? "Impacto Financiero" : "Funding Impact"}{" "}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/strategy/okrs">
                {isEs ? "Plantillas OKR" : "OKR Templates"}{" "}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <NewsletterSignup
          variant="card"
          defaultAudience="intel-brief"
          heading={{
            en: "Weekly Executive Briefing",
            es: "Informe Ejecutivo Semanal",
          }}
          subheading={{
            en: "Masterclass updates, policy analysis, and funding alerts — delivered every Tuesday.",
            es: "Actualizaciones de masterclass, análisis de políticas y alertas de financiamiento — cada martes.",
          }}
        />
      </section>
    </div>
  );
}
