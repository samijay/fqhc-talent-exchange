// FQHC Executive Masterclass — Mini deep-dive modules for the 2026 crisis moment
"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { t } from "@/lib/i18n-helpers";
import { Link } from "@/i18n/navigation";
import { Breadcrumb, PageHero } from "@/components/ui/design-system";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import {
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
  Clock,
  Download,
  Loader2,
} from "lucide-react";
import { TableOfContents } from "@/components/layout/TableOfContents";
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
import { ReadingLevelBadge } from "@/components/ui/ReadingLevelBadge";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

// t() imported from @/lib/i18n-helpers

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
  downloadingId,
  onDownload,
}: {
  mc: MasterclassModule;
  locale: string;
  isEs: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  read: ContentRead | undefined;
  downloadingId: string | null;
  onDownload: (mc: MasterclassModule) => void;
}) {
  const catMeta = getCategoryMeta(mc.category);
  const audMeta = getAudienceMeta(mc.audience);
  const diffMeta = getDifficultyMeta(mc.difficulty);

  return (
    <div className="relative rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 transition-shadow hover:shadow-md overflow-hidden">
      <div className="absolute right-12 top-6 z-10 flex items-center gap-1">
        <FavoriteButton contentType="masterclass" contentId={mc.id} size="sm" />
      </div>
      {/* Header — always visible */}
      <button
        onClick={onToggle}
        className="w-full text-left p-6 pb-4"
        aria-expanded={isExpanded}
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
                <span className="inline-flex items-center gap-1 text-xs text-stone-500">
                  <Users className="size-3" />
                  {isEs ? audMeta.es : audMeta.en}
                </span>
              )}
              <ReadingLevelBadge level={mc.difficulty} size="sm" />
              {mc.estimatedMinutes && (
                <span className="inline-flex items-center gap-1 text-xs text-stone-400">
                  <Clock className="size-3" />
                  {mc.estimatedMinutes} min
                </span>
              )}
            </div>

            {/* Title + subtitle */}
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <ReadStatusBadge read={read} />
              {mc.recommendedOrder && (
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">
                  {mc.recommendedOrder}
                </span>
              )}
              {t(mc.title, locale)}
            </h3>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              {t(mc.subtitle, locale)}
            </p>
          </div>
          <span className="flex-shrink-0 mt-1 text-stone-500">
            {isExpanded ? (
              <ChevronUp className="size-5" />
            ) : (
              <ChevronDown className="size-5" />
            )}
          </span>
        </div>

        {/* Urgency stat — always visible */}
        <div className="mt-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 dark:bg-red-950 border border-red-100 dark:border-red-800 px-3 py-1 text-xs font-medium text-red-700 dark:text-red-400">
            <AlertTriangle className="size-3" />
            {t(mc.urgencyStat, locale)}
          </span>
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-stone-100 dark:border-stone-700 px-6 pb-6 pt-4 space-y-5">
          {/* Why Now */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="size-4 text-amber-600" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-amber-700">
                {isEs ? "¿Por Qué Ahora?" : "Why Now?"}
              </h4>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
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
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">
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
          <div className="border-t border-stone-100 dark:border-stone-700 pt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="size-4 text-stone-500" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-stone-600">
                  {isEs ? "Materiales de Referencia" : "Source Materials"}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDownload(mc)}
                  disabled={downloadingId === mc.id}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-800 px-3 py-1.5 text-xs font-medium text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 disabled:opacity-50"
                >
                  {downloadingId === mc.id ? <Loader2 className="size-3.5 animate-spin" /> : <Download className="size-3.5" />}
                  {isEs ? "Descargar PDF" : "Download PDF"}
                </button>
                <ShareButton
                  url={`https://www.fqhctalent.com/strategy/masterclass#${mc.id}`}
                  title={mc.title.en}
                  description={mc.subtitle.en}
                  size="sm"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {mc.sourceMaterials.map((src) => (
                <a
                  key={src.url}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-600 px-2.5 py-1.5 text-xs text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
                >
                  <ExternalLink className="size-3" />
                  {src.label}
                </a>
              ))}
              {mc.siteLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href as "/strategy/guides"}
                  className="inline-flex items-center gap-1 rounded-lg bg-teal-50 dark:bg-teal-900 border border-teal-200 dark:border-teal-700 px-2.5 py-1.5 text-xs text-teal-700 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-800 transition-colors"
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
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownloadModule = async (mc: MasterclassModule) => {
    setDownloadingId(mc.id);
    try {
      const catMeta = getCategoryMeta(mc.category);
      const categoryLabel = catMeta ? (isEs ? catMeta.es : catMeta.en) : mc.category;

      const html = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #1c1917; max-width: 700px; margin: 0 auto;">
          <!-- Header bar -->
          <div style="background: #0F766E; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div>
                <h1 style="color: #fff; font-size: 22px; font-weight: 800; margin: 0; line-height: 1.3;">
                  ${t(mc.title, locale)}
                </h1>
                <p style="color: #ccfbf1; font-size: 13px; margin: 6px 0 0;">
                  ${t(mc.subtitle, locale)}
                </p>
              </div>
              <span style="background: #fff; color: #0F766E; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; white-space: nowrap;">
                ${categoryLabel}
              </span>
            </div>
          </div>

          <div style="padding: 28px 32px;">
            <!-- Urgency stat -->
            <div style="background: #FEF3C7; border: 1px solid #FDE68A; border-radius: 8px; padding: 12px 16px; margin-bottom: 24px;">
              <span style="color: #92400E; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">
                ${isEs ? "Dato Urgente" : "Urgency Stat"}
              </span>
              <p style="color: #78350F; font-size: 14px; font-weight: 600; margin: 4px 0 0;">
                ${t(mc.urgencyStat, locale)}
              </p>
            </div>

            <!-- Why Now -->
            <div style="margin-bottom: 24px;">
              <h2 style="color: #0F766E; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 8px;">
                ${isEs ? "¿Por Qué Ahora?" : "Why Now?"}
              </h2>
              <p style="color: #44403c; font-size: 14px; line-height: 1.7; margin: 0;">
                ${t(mc.whyNow, locale)}
              </p>
            </div>

            <!-- Learning Objectives -->
            <div style="margin-bottom: 24px;">
              <h2 style="color: #0F766E; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 10px;">
                ${isEs ? "Objetivos de Aprendizaje" : "Learning Objectives"}
              </h2>
              <ol style="margin: 0; padding-left: 20px;">
                ${mc.learningObjectives
                  .map(
                    (obj, i) =>
                      `<li style="color: #44403c; font-size: 14px; line-height: 1.6; margin-bottom: 6px;">
                        <strong style="color: #0F766E;">${i + 1}.</strong> ${t(obj, locale)}
                      </li>`
                  )
                  .join("")}
              </ol>
            </div>

            <!-- Key Takeaways -->
            <div style="margin-bottom: 24px;">
              <h2 style="color: #0F766E; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 10px;">
                ${isEs ? "Conclusiones Clave" : "Key Takeaways"}
              </h2>
              <ul style="margin: 0; padding-left: 0; list-style: none;">
                ${mc.keyTakeaways
                  .map(
                    (tk) =>
                      `<li style="color: #44403c; font-size: 14px; line-height: 1.6; margin-bottom: 6px; padding-left: 16px; position: relative;">
                        <span style="position: absolute; left: 0; color: #0F766E; font-weight: bold;">&#10003;</span>
                        ${t(tk, locale)}
                      </li>`
                  )
                  .join("")}
              </ul>
            </div>

            <!-- Source Materials -->
            <div style="margin-bottom: 24px;">
              <h2 style="color: #0F766E; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 10px;">
                ${isEs ? "Materiales de Referencia" : "Source Materials"}
              </h2>
              <ul style="margin: 0; padding-left: 0; list-style: none;">
                ${mc.sourceMaterials
                  .map(
                    (src) =>
                      `<li style="margin-bottom: 4px;">
                        <a href="${src.url}" style="color: #0F766E; font-size: 13px; text-decoration: underline;">
                          ${src.label}
                        </a>
                      </li>`
                  )
                  .join("")}
              </ul>
            </div>

            <!-- Footer -->
            <div style="border-top: 1px solid #e7e5e4; padding-top: 16px; margin-top: 8px;">
              <p style="color: #a8a29e; font-size: 11px; margin: 0; text-align: center;">
                ${isEs ? "Generado desde" : "Generated from"} fqhctalent.com/strategy/masterclass
              </p>
            </div>
          </div>
        </div>
      `;

      const container = document.createElement("div");
      container.innerHTML = html;
      container.style.position = "absolute";
      container.style.left = "-9999px";
      document.body.appendChild(container);

      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf()
        .set({
          margin: [10, 10, 10, 10],
          filename: `FQHC_Masterclass_${mc.id}.pdf`,
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "mm", format: "letter", orientation: "portrait" },
        })
        .from(container)
        .save();

      document.body.removeChild(container);
    } catch (err) {
      console.error("PDF download failed:", err);
    } finally {
      setDownloadingId(null);
    }
  };

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

  const tocItems = [
    { id: "interactive-course", label: isEs ? "Curso Interactivo" : "Interactive Course" },
    { id: "why-now", label: isEs ? "¿Por Qué Ahora?" : "Why Now?" },
    { id: "modules", label: isEs ? "Módulos" : "Modules" },
    { id: "newsletter", label: isEs ? "Boletín" : "Newsletter" },
  ];

  return (
    <div className="bg-stone-50 dark:bg-stone-950">
      <Breadcrumb items={[
        { label: "Home", href: "/" },
        { label: "Strategy", href: "/strategy/masterclass" },
        { label: "Masterclass" },
      ]} />
      {/* Hero */}
      <PageHero
        variant="dark"
        title={{ en: "FQHC Executive Masterclass", es: "Masterclass Ejecutivo FQHC" }}
        subtitle={{
          en: "Mini deep-dive strategy modules for the 2026 crisis moment — funding cliffs, immigration enforcement, workforce erosion, and AI adoption, all at once.",
          es: "Mini módulos de estrategia profunda para el momento de crisis de 2026 — recortes de financiamiento, aplicación migratoria, erosión de fuerza laboral, y adopción de IA, todo a la vez.",
        }}
        meta={`${counts.total} ${isEs ? "módulos" : "modules"} · ${MASTERCLASS_CATEGORIES.length} ${isEs ? "categorías" : "categories"} · ${isEs ? "200+ fuentes investigadas" : "200+ sources researched"} · ${isEs ? "Actualizado:" : "Updated:"} ${MASTERCLASSES_LAST_UPDATED}`}
      />

      {/* TOC */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="absolute right-4 top-10 sm:right-6 lg:right-8">
          <TableOfContents items={tocItems} title={isEs ? "En esta página" : "On this page"} />
        </div>
      </div>

      {/* Interactive Course CTA */}
      <section id="interactive-course" className="border-b border-teal-200 dark:border-teal-800 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950 dark:to-emerald-950 py-6 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
                <Zap className="size-5 text-teal-700" />
              </div>
              <div>
                <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  {isEs ? "¡Nuevo! Curso Interactivo" : "New! Interactive Course"}
                </h2>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  {isEs
                    ? "30 módulos con ejercicios, cuestionarios y seguimiento de progreso — aprenda haciendo."
                    : "30 modules with exercises, quizzes, and progress tracking — learn by doing."}
                </p>
              </div>
            </div>
            <Button asChild className="bg-teal-700 hover:bg-teal-800 text-white">
              <Link href="/strategy/masterclass/course">
                {isEs ? "Iniciar Curso" : "Start Course"}{" "}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why These Masterclasses, Why Now */}
      <section id="why-now" className="border-b border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 py-10 sm:py-14 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-10">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 sm:text-2xl">
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
            <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/50 p-4 text-center">
              <div className="text-2xl font-extrabold text-red-800">$4.6B</div>
              <div className="text-xs font-medium text-red-700 mt-1">
                {isEs ? "Financiamiento de Medicaid en riesgo" : "Medicaid funding at risk"}
              </div>
              <div className="text-xs text-stone-500 mt-0.5">H.R. 1</div>
            </div>
            <div className="rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/50 p-4 text-center">
              <div className="text-2xl font-extrabold text-purple-800">84%</div>
              <div className="text-xs font-medium text-purple-700 mt-1">
                {isEs ? "Reportan caídas en visitas" : "Report patient visit declines"}
              </div>
              <div className="text-xs text-stone-500 mt-0.5">
                {isEs ? "Efecto de aplicación migratoria" : "Immigration enforcement effect"}
              </div>
            </div>
            <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/50 p-4 text-center">
              <div className="text-2xl font-extrabold text-amber-800">50%</div>
              <div className="text-xs font-medium text-amber-700 mt-1">
                {isEs ? "Márgenes negativos" : "Negative margins"}
              </div>
              <div className="text-xs text-stone-500 mt-0.5">
                {isEs ? "CHCs en 2023" : "CHCs in 2023"}
              </div>
            </div>
            <div className="rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-950/50 p-4 text-center">
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
      <section id="modules" className="py-10 sm:py-14 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex items-center gap-2 mb-6">
            <Filter className="size-4 text-stone-500" />
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveCategory("all")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  activeCategory === "all"
                    ? "bg-stone-800 text-white"
                    : "bg-stone-100 text-stone-500 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
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
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
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
                downloadingId={downloadingId}
                onDownload={handleDownloadModule}
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
            <Button asChild className="bg-teal-700 hover:bg-teal-800 text-white">
              <Link href="/strategy/masterclass/course">
                {isEs ? "Iniciar Curso Interactivo" : "Start Interactive Course"}{" "}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
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
      <section id="newsletter" className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8 scroll-mt-20">
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
