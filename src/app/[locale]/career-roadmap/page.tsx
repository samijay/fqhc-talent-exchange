"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Heart,
  Stethoscope,
  Brain,
  DollarSign,
  Activity,
  CheckCircle,
  Smile,
  ChevronDown,
  ArrowRight,
  Award,
  MapPin,
  BookOpen,
  ClipboardCheck,
  FileText,
  Briefcase,
  Share2,
  Check,
} from "lucide-react";
import { useLocale } from "next-intl";
import { formatSalary } from "@/lib/i18n-helpers";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Breadcrumb, PageHero } from "@/components/ui/design-system";
import { CareerFunnelStep } from "@/components/ui/CareerFunnelStep";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import {
  CAREER_PATHWAYS,
  REGIONAL_MULTIPLIERS,
  adjustSalary,
  type CareerLevel,
} from "@/lib/career-pathways";

const PATHWAY_ICONS: Record<string, React.ReactNode> = {
  Heart: <Heart className="size-5" />,
  Stethoscope: <Stethoscope className="size-5" />,
  Brain: <Brain className="size-5" />,
  DollarSign: <DollarSign className="size-5" />,
  Activity: <Activity className="size-5" />,
  Briefcase: <Briefcase className="size-5" />,
  CheckCircle: <CheckCircle className="size-5" />,
  Smile: <Smile className="size-5" />,
};

const PATHWAY_COLORS: Record<string, { bg: string; border: string; text: string; light: string; bar: string }> = {
  teal: { bg: "bg-teal-50 dark:bg-teal-950", border: "border-teal-200", text: "text-teal-700 dark:text-teal-400", light: "bg-teal-100 dark:bg-teal-900", bar: "bg-teal-500" },
  blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", light: "bg-blue-100", bar: "bg-blue-500" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", light: "bg-purple-100", bar: "bg-purple-500" },
  amber: { bg: "bg-amber-50 dark:bg-amber-950", border: "border-amber-200", text: "text-amber-700", light: "bg-amber-100", bar: "bg-amber-500" },
  rose: { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-700", light: "bg-rose-100", bar: "bg-rose-500" },
  indigo: { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-700", light: "bg-indigo-100", bar: "bg-indigo-500" },
  cyan: { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-700", light: "bg-cyan-100", bar: "bg-cyan-500" },
};

// formatSalary imported from @/lib/i18n-helpers

export default function CareerRoadmapPage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const searchParams = useSearchParams();

  const [selectedPathway, setSelectedPathway] = useState<string>("community-health");
  const [selectedRegion, setSelectedRegion] = useState<number>(4); // Sacramento = baseline
  const [expandedLevel, setExpandedLevel] = useState<number | null>(null);
  const [shareState, setShareState] = useState<"idle" | "copied">("idle");

  // Init from URL params (e.g. /career-roadmap?track=nursing&region=0)
  useEffect(() => {
    const trackParam = searchParams.get("track");
    const regionParam = searchParams.get("region");
    if (trackParam && CAREER_PATHWAYS.find((p) => p.id === trackParam)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedPathway(trackParam);
    }
    if (regionParam !== null) {
      const idx = Number(regionParam);
      if (!isNaN(idx) && idx >= 0 && idx < REGIONAL_MULTIPLIERS.length) {
         
        setSelectedRegion(idx);
      }
    }
  }, [searchParams]);

  // Sync URL when selections change
  const syncUrl = useCallback((track: string, region: number) => {
    const localePath = locale === "es" ? "/es" : "";
    window.history.replaceState({}, "", `${localePath}/career-roadmap?track=${track}&region=${region}`);
  }, [locale]);

  const handleShare = useCallback(async () => {
    const base = typeof window !== "undefined" ? window.location.origin : "";
    const localePath = locale === "es" ? "/es" : "";
    const url = `${base}${localePath}/career-roadmap?track=${selectedPathway}&region=${selectedRegion}`;
    const title = isEs ? "Trayectoria Profesional FQHC" : "FQHC Career Roadmap";

    if (navigator.share) {
      try { await navigator.share({ title, url }); return; } catch { /* fall through */ }
    }
    try {
      await navigator.clipboard.writeText(url);
      setShareState("copied");
      setTimeout(() => setShareState("idle"), 2000);
    } catch {
      window.prompt(isEs ? "Copia este enlace:" : "Copy this link:", url);
    }
  }, [locale, selectedPathway, selectedRegion, isEs]);

  const pathway = CAREER_PATHWAYS.find((p) => p.id === selectedPathway)!;
  const region = REGIONAL_MULTIPLIERS[selectedRegion];
  const colors = PATHWAY_COLORS[pathway.color];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <Breadcrumb items={[
        { label: isEs ? "Inicio" : "Home", href: "/" },
        { label: isEs ? "Herramientas" : "Tools", href: "/career-roadmap" },
        { label: isEs ? "Mapa de Carrera" : "Career Roadmap" },
      ]} />
      <PageHero
        variant="dark"
        title={{
          en: "Your Career Path in Community Health",
          es: "Tu camino profesional en salud comunitaria",
        }}
        subtitle={{
          en: "Explore 8 career tracks in California FQHCs — with salaries, certifications, and skills at every level.",
          es: "Explora 8 trayectorias profesionales en FQHCs de California — con salarios, certificaciones y habilidades en cada nivel.",
        }}
        meta={isEs ? "Carreras en FQHCs de California" : "California FQHC Careers"}
      >
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 rounded-full border border-stone-600 bg-stone-800/50 px-4 py-2 text-sm font-medium text-stone-300 transition-all hover:bg-stone-700/60"
        >
          {shareState === "copied" ? (
            <><Check className="size-4" />{isEs ? "¡Enlace copiado!" : "Link copied!"}</>
          ) : (
            <><Share2 className="size-4" />{isEs ? "Compartir esta vista" : "Share this view"}</>
          )}
        </button>
      </PageHero>

      {/* Career Funnel */}
      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:px-8">
        <CareerFunnelStep currentStep={2} locale={locale} />
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Pathway selector */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {CAREER_PATHWAYS.map((p) => {
            const c = PATHWAY_COLORS[p.color];
            const isActive = p.id === selectedPathway;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPathway(p.id);
                  setExpandedLevel(null);
                  syncUrl(p.id, selectedRegion);
                }}
                className={`rounded-xl border-2 p-4 text-left transition-all ${
                  isActive
                    ? `${c.border} ${c.bg} ring-2 ring-offset-1 ${c.text.replace("text", "ring")}`
                    : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:border-stone-300 dark:border-stone-600"
                }`}
              >
                <div className={`mb-2 ${isActive ? c.text : "text-stone-500 dark:text-stone-400"}`}>
                  {PATHWAY_ICONS[p.icon]}
                </div>
                <div className={`text-sm font-semibold ${isActive ? c.text : "text-stone-700 dark:text-stone-300"}`}>
                  {isEs ? p.esName : p.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Pathway description */}
        <div className="mt-8 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                {isEs ? pathway.esName : pathway.name}
              </h2>
              <p className="mt-1 text-stone-600 dark:text-stone-400">
                {isEs ? pathway.esDescription : pathway.description}
              </p>
            </div>

            {/* Regional salary selector */}
            <div className="shrink-0">
              <label className="mb-1 block text-xs font-medium text-stone-500 dark:text-stone-400">
                <MapPin className="mb-0.5 mr-1 inline size-3" />
                {isEs ? "Región" : "Region"}
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => {
                  const idx = Number(e.target.value);
                  setSelectedRegion(idx);
                  syncUrl(selectedPathway, idx);
                }}
                className="rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-1.5 text-sm text-stone-700 dark:text-stone-300 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                {REGIONAL_MULTIPLIERS.map((r, i) => (
                  <option key={r.region} value={i}>
                    {isEs ? r.esRegion : r.region} ({r.multiplier > 1 ? "+" : ""}{Math.round((r.multiplier - 1) * 100)}%)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Regional context */}
          <div className="mt-3 rounded-lg bg-stone-50 dark:bg-stone-950 px-4 py-2 text-xs text-stone-500 dark:text-stone-400">
            <MapPin className="mr-1 inline size-3" />
            {isEs ? region.esDescription : region.description}
          </div>
        </div>

        {/* Career ladder */}
        <div className="mt-8 space-y-0">
          {pathway.levels.map((level, index) => (
            <CareerLevelCard
              key={level.roleId}
              level={level}
              index={index}
              total={pathway.levels.length}
              colors={colors}
              multiplier={region.multiplier}
              isEs={isEs}
              isExpanded={expandedLevel === index}
              onToggle={() => setExpandedLevel(expandedLevel === index ? null : index)}
            />
          ))}
        </div>

        {/* Salary range overview */}
        <div className="mt-10 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-6">
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            {isEs ? "Resumen salarial de la trayectoria" : "Pathway Salary Overview"}
          </h3>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            {isEs
              ? `Rangos ajustados para ${region.esRegion}`
              : `Ranges adjusted for ${region.region}`}
          </p>
          <div className="mt-4 space-y-3">
            {pathway.levels.map((level) => {
              const adjP25 = adjustSalary(level.salaryP25, region.multiplier);
              const adjP75 = adjustSalary(level.salaryP75, region.multiplier);
              const maxSalary = adjustSalary(
                pathway.levels[pathway.levels.length - 1].salaryP75,
                region.multiplier
              );
              const barWidth = Math.round((adjP75 / maxSalary) * 100);
              const barStart = Math.round((adjP25 / maxSalary) * 100);

              return (
                <div key={level.roleId} className="flex items-center gap-3">
                  <div className="w-40 shrink-0 text-sm font-medium text-stone-700 dark:text-stone-300 sm:w-56">
                    {isEs ? level.esTitle : level.title}
                  </div>
                  <div className="relative h-6 flex-1 rounded-full bg-stone-100 dark:bg-stone-800">
                    <div
                      className={`absolute top-0 h-6 rounded-full ${colors.bar} opacity-80`}
                      style={{
                        left: `${barStart}%`,
                        width: `${barWidth - barStart}%`,
                      }}
                    />
                  </div>
                  <div className="w-28 shrink-0 text-right text-sm font-semibold text-stone-700 dark:text-stone-300">
                    {formatSalary(adjP25)}–{formatSalary(adjP75)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Take the next step */}
        <div className="mt-10">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
            {isEs ? "Toma el siguiente paso" : "Take the next step"}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/resume-builder"
              className="flex items-center justify-center gap-2 rounded-xl border border-teal-200 bg-teal-50 dark:bg-teal-950 px-6 py-4 text-sm font-semibold text-teal-700 dark:text-teal-400 transition-colors hover:bg-teal-100 dark:hover:bg-teal-900"
            >
              <FileText className="size-4" />
              {isEs ? "Crear currículum" : "Build Resume"}
            </Link>
            <Link
              href="/career-insights"
              className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-6 py-4 text-sm font-semibold text-stone-700 dark:text-stone-300 transition-colors hover:bg-stone-50 dark:hover:bg-stone-800"
            >
              <ClipboardCheck className="size-4" />
              {isEs ? "Evaluación profesional" : "Career Assessment"}
            </Link>
            <Link
              href="/interview-prep"
              className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-6 py-4 text-sm font-semibold text-stone-700 dark:text-stone-300 transition-colors hover:bg-stone-50 dark:hover:bg-stone-800"
            >
              <Award className="size-4" />
              {isEs ? "Preparación entrevista" : "Interview Prep"}
            </Link>
            <Link
              href="/jobs"
              className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-6 py-4 text-sm font-semibold text-stone-700 dark:text-stone-300 transition-colors hover:bg-stone-50 dark:hover:bg-stone-800"
            >
              <Briefcase className="size-4" />
              {isEs ? "Ver empleos" : "Browse Jobs"}
            </Link>
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-12 border-t border-stone-200 dark:border-stone-700 pt-8">
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4">
            {isEs ? "Explora Mas" : "Explore More"}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/salary-data" className="rounded-lg border border-stone-200 dark:border-stone-700 p-4 hover:border-teal-200 hover:bg-teal-50/30 transition-colors">
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{isEs ? "Inteligencia Salarial" : "Salary Intelligence"}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{isEs ? "30 roles x 9 regiones de CA" : "30 roles x 9 CA regions"}</p>
            </Link>
            <Link href="/certifications" className="rounded-lg border border-stone-200 dark:border-stone-700 p-4 hover:border-teal-200 hover:bg-teal-50/30 transition-colors">
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{isEs ? "Certificaciones" : "Certifications"}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{isEs ? "15 certificaciones especificas de CA" : "15 CA-specific certifications"}</p>
            </Link>
            <Link href="/interview-prep" className="rounded-lg border border-stone-200 dark:border-stone-700 p-4 hover:border-teal-200 hover:bg-teal-50/30 transition-colors">
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{isEs ? "Preparacion Entrevista" : "Interview Prep"}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{isEs ? "Preguntas STAR y guias por rol" : "STAR questions and role-specific guides"}</p>
            </Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 mb-8">
          <NewsletterSignup
            variant="card"
            defaultAudience="the-pulse"
          />
        </div>
      </div>
    </div>
  );
}

function CareerLevelCard({
  level,
  index,
  total,
  colors,
  multiplier,
  isEs,
  isExpanded,
  onToggle,
}: {
  level: CareerLevel;
  index: number;
  total: number;
  colors: { bg: string; border: string; text: string; light: string; bar: string };
  multiplier: number;
  isEs: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const adjP25 = adjustSalary(level.salaryP25, multiplier);
  const adjP50 = adjustSalary(level.salaryP50, multiplier);
  const adjP75 = adjustSalary(level.salaryP75, multiplier);

  return (
    <div className="relative">
      {/* Connector line */}
      {index < total - 1 && (
        <div className="absolute left-8 top-full z-10 flex h-6 flex-col items-center">
          <div className={`h-full w-0.5 ${colors.bar} opacity-40`} />
          <ArrowRight className={`size-3 rotate-90 ${colors.text} opacity-60`} />
        </div>
      )}

      <button
        onClick={onToggle}
        className={`w-full rounded-xl border-2 p-5 text-left transition-all ${
          isExpanded ? `${colors.border} ${colors.bg}` : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:border-stone-300 dark:border-stone-600"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Level badge */}
            <div className={`flex size-10 shrink-0 items-center justify-center rounded-full ${colors.light} ${colors.text} text-sm font-bold`}>
              {index + 1}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  {isEs ? level.esTitle : level.title}
                </h3>
                <span className="rounded-full bg-stone-100 dark:bg-stone-800 px-2 py-0.5 text-xs font-medium text-stone-500 dark:text-stone-400">
                  {isEs ? level.esYearsExperience : level.yearsExperience}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-3 text-sm">
                <span className={`font-semibold ${colors.text}`}>
                  {formatSalary(adjP25)}–{formatSalary(adjP75)}
                </span>
                <span className="text-stone-500 dark:text-stone-400">
                  {isEs ? "mediana" : "median"}: {formatSalary(adjP50)}
                </span>
              </div>
            </div>
          </div>
          <ChevronDown
            className={`size-5 shrink-0 text-stone-500 dark:text-stone-400 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Expanded details */}
        {isExpanded && (
          <div className="mt-4 grid gap-4 border-t border-stone-200 dark:border-stone-700/60 pt-4 sm:grid-cols-3">
            {/* Certifications */}
            <div>
              <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                <Award className="size-3.5" />
                {isEs ? "Certificaciones" : "Certifications"}
              </div>
              <ul className="space-y-1">
                {(isEs ? level.esCertifications : level.certifications).map((cert) => (
                  <li key={cert} className="text-sm text-stone-700 dark:text-stone-300">
                    {cert}
                  </li>
                ))}
              </ul>
              <Link
                href={`/certifications?role=${level.roleId}`}
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-teal-700 dark:text-teal-400 hover:text-teal-800"
              >
                {isEs ? "Ver detalles →" : "View details →"}
              </Link>
            </div>

            {/* Key skills */}
            <div>
              <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                <BookOpen className="size-3.5" />
                {isEs ? "Habilidades clave" : "Key Skills"}
              </div>
              <ul className="space-y-1">
                {(isEs ? level.esKeySkills : level.keySkills).map((skill) => (
                  <li key={skill} className="text-sm text-stone-700 dark:text-stone-300">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div>
              <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                <Briefcase className="size-3.5" />
                {isEs ? "Programas" : "Programs to Know"}
              </div>
              <ul className="space-y-1">
                {level.programs.map((prog) => (
                  <li key={prog} className="text-sm text-stone-700 dark:text-stone-300">
                    {prog}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </button>

      {/* Spacer for connector */}
      {index < total - 1 && <div className="h-6" />}
    </div>
  );
}
