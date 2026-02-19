"use client";

import { useState } from "react";
import {
  Heart,
  Stethoscope,
  Brain,
  DollarSign,
  Activity,
  ChevronDown,
  ArrowRight,
  Award,
  MapPin,
  TrendingUp,
  BookOpen,
  ClipboardCheck,
  FileText,
  Briefcase,
} from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  CAREER_PATHWAYS,
  REGIONAL_MULTIPLIERS,
  adjustSalary,
  type CareerPathway,
  type CareerLevel,
} from "@/lib/career-pathways";

const PATHWAY_ICONS: Record<string, React.ReactNode> = {
  Heart: <Heart className="size-5" />,
  Stethoscope: <Stethoscope className="size-5" />,
  Brain: <Brain className="size-5" />,
  DollarSign: <DollarSign className="size-5" />,
  Activity: <Activity className="size-5" />,
};

const PATHWAY_COLORS: Record<string, { bg: string; border: string; text: string; light: string; bar: string }> = {
  teal: { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-700", light: "bg-teal-100", bar: "bg-teal-500" },
  blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", light: "bg-blue-100", bar: "bg-blue-500" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", light: "bg-purple-100", bar: "bg-purple-500" },
  amber: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", light: "bg-amber-100", bar: "bg-amber-500" },
  rose: { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-700", light: "bg-rose-100", bar: "bg-rose-500" },
};

function formatSalary(amount: number): string {
  return `$${Math.round(amount / 1000)}K`;
}

export default function CareerRoadmapPage() {
  const locale = useLocale();
  const isEs = locale === "es";

  const [selectedPathway, setSelectedPathway] = useState<string>("community-health");
  const [selectedRegion, setSelectedRegion] = useState<number>(4); // Sacramento = baseline
  const [expandedLevel, setExpandedLevel] = useState<number | null>(null);

  const pathway = CAREER_PATHWAYS.find((p) => p.id === selectedPathway)!;
  const region = REGIONAL_MULTIPLIERS[selectedRegion];
  const colors = PATHWAY_COLORS[pathway.color];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-700/50 px-4 py-1.5 text-sm font-medium">
            <TrendingUp className="size-4" />
            {isEs ? "Carreras en FQHCs de California" : "California FQHC Careers"}
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {isEs
              ? "Tu camino profesional en salud comunitaria"
              : "Your Career Path in Community Health"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-teal-100">
            {isEs
              ? "Explora 5 trayectorias profesionales en FQHCs de California — con salarios, certificaciones y habilidades en cada nivel."
              : "Explore 5 career tracks in California FQHCs — with salaries, certifications, and skills at every level."}
          </p>
        </div>
      </section>

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
                }}
                className={`rounded-xl border-2 p-4 text-left transition-all ${
                  isActive
                    ? `${c.border} ${c.bg} ring-2 ring-offset-1 ${c.text.replace("text", "ring")}`
                    : "border-stone-200 bg-white hover:border-stone-300"
                }`}
              >
                <div className={`mb-2 ${isActive ? c.text : "text-stone-400"}`}>
                  {PATHWAY_ICONS[p.icon]}
                </div>
                <div className={`text-sm font-semibold ${isActive ? c.text : "text-stone-700"}`}>
                  {isEs ? p.esName : p.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Pathway description */}
        <div className="mt-8 rounded-xl border border-stone-200 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-stone-900">
                {isEs ? pathway.esName : pathway.name}
              </h2>
              <p className="mt-1 text-stone-600">
                {isEs ? pathway.esDescription : pathway.description}
              </p>
            </div>

            {/* Regional salary selector */}
            <div className="shrink-0">
              <label className="mb-1 block text-xs font-medium text-stone-500">
                <MapPin className="mb-0.5 mr-1 inline size-3" />
                {isEs ? "Región" : "Region"}
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(Number(e.target.value))}
                className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-sm text-stone-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
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
          <div className="mt-3 rounded-lg bg-stone-50 px-4 py-2 text-xs text-stone-500">
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
        <div className="mt-10 rounded-xl border border-stone-200 bg-white p-6">
          <h3 className="text-lg font-bold text-stone-900">
            {isEs ? "Resumen salarial de la trayectoria" : "Pathway Salary Overview"}
          </h3>
          <p className="mt-1 text-sm text-stone-500">
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
                  <div className="w-40 shrink-0 text-sm font-medium text-stone-700 sm:w-56">
                    {isEs ? level.esTitle : level.title}
                  </div>
                  <div className="relative h-6 flex-1 rounded-full bg-stone-100">
                    <div
                      className={`absolute top-0 h-6 rounded-full ${colors.bar} opacity-80`}
                      style={{
                        left: `${barStart}%`,
                        width: `${barWidth - barStart}%`,
                      }}
                    />
                  </div>
                  <div className="w-28 shrink-0 text-right text-sm font-semibold text-stone-700">
                    {formatSalary(adjP25)}–{formatSalary(adjP75)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Link
            href="/career-insights"
            className="flex items-center justify-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-6 py-4 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-100"
          >
            <ClipboardCheck className="size-4" />
            {isEs ? "Tomar evaluación profesional" : "Take Career Assessment"}
          </Link>
          <Link
            href="/resume-builder"
            className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-6 py-4 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50"
          >
            <FileText className="size-4" />
            {isEs ? "Crear currículum" : "Build Resume"}
          </Link>
          <Link
            href="/jobs"
            className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-6 py-4 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50"
          >
            <Briefcase className="size-4" />
            {isEs ? "Ver empleos" : "Browse Jobs"}
          </Link>
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
          isExpanded ? `${colors.border} ${colors.bg}` : "border-stone-200 bg-white hover:border-stone-300"
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
                <h3 className="text-base font-bold text-stone-900">
                  {isEs ? level.esTitle : level.title}
                </h3>
                <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-500">
                  {isEs ? level.esYearsExperience : level.yearsExperience}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-3 text-sm">
                <span className={`font-semibold ${colors.text}`}>
                  {formatSalary(adjP25)}–{formatSalary(adjP75)}
                </span>
                <span className="text-stone-400">
                  {isEs ? "mediana" : "median"}: {formatSalary(adjP50)}
                </span>
              </div>
            </div>
          </div>
          <ChevronDown
            className={`size-5 shrink-0 text-stone-400 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Expanded details */}
        {isExpanded && (
          <div className="mt-4 grid gap-4 border-t border-stone-200/60 pt-4 sm:grid-cols-3">
            {/* Certifications */}
            <div>
              <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-stone-500">
                <Award className="size-3.5" />
                {isEs ? "Certificaciones" : "Certifications"}
              </div>
              <ul className="space-y-1">
                {(isEs ? level.esCertifications : level.certifications).map((cert) => (
                  <li key={cert} className="text-sm text-stone-700">
                    {cert}
                  </li>
                ))}
              </ul>
            </div>

            {/* Key skills */}
            <div>
              <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-stone-500">
                <BookOpen className="size-3.5" />
                {isEs ? "Habilidades clave" : "Key Skills"}
              </div>
              <ul className="space-y-1">
                {(isEs ? level.esKeySkills : level.keySkills).map((skill) => (
                  <li key={skill} className="text-sm text-stone-700">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div>
              <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-stone-500">
                <Briefcase className="size-3.5" />
                {isEs ? "Programas" : "Programs to Know"}
              </div>
              <ul className="space-y-1">
                {level.programs.map((prog) => (
                  <li key={prog} className="text-sm text-stone-700">
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
