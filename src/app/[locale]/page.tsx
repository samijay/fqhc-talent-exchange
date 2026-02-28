// FQHC Talent Exchange v3 — Intelligence-Led Homepage
"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import {
  ArrowRight,
  Star,
  MapPin,
  Building2,
  Users,
  AlertTriangle,
  TrendingUp,
  Briefcase,
  FileText,
  Brain,
  BarChart3,
  Shield,
  Zap,
  Target,
  ExternalLink,
  Activity,
  Clock,
  Flame,
  Play,
  Lightbulb,
  BookOpen,
  GraduationCap,
  Map,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { californiaFQHCs } from "@/lib/california-fqhcs";
import {
  getMarketOverview,
  getFundingCliffs,
  getRoleDemand,
} from "@/lib/market-intelligence";
import { getLayoffStats } from "@/lib/california-fqhc-layoffs";
import {
  getBreakingIntel,
  IMPACT_STYLES,
  IMPACT_BORDER,
  IMPACT_LABELS,
  INTEL_CATEGORIES,
  type IntelItem,
} from "@/lib/fqhc-news-intel";

/* ---------- Module-level data (computed once) ---------- */
const overview = getMarketOverview();
const fundingCliffs = getFundingCliffs()
  .filter((c) => !c.isPast)
  .slice(0, 3);
const hotRoles = getRoleDemand().filter((r) => r.demandSignal === "hot");
const layoffStats = getLayoffStats();
const breakingIntel = getBreakingIntel(5);

/* ---------- Helpers ---------- */
const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

function formatDate(dateStr: string, locale: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(locale === "es" ? "es-US" : "en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function Home() {
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const isEs = locale === "es";

  return (
    <div className="bg-stone-50">
      {/* ==================== HERO — Intelligence-Led ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent" />
        <div className="absolute -bottom-40 -right-40 size-[28rem] rounded-full bg-amber-500/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Activity className="size-5 text-teal-400" />
              <span className="text-sm font-medium uppercase tracking-wider text-teal-400">
                {isEs ? "Plataforma de Inteligencia" : "Intelligence Platform"}
              </span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {isEs
                ? "Inteligencia FQHC de California"
                : "California's FQHC Intelligence Platform"}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-stone-300 sm:text-xl">
              {isEs
                ? "Datos de fuerza laboral, inteligencia legislativa, y herramientas de carrera que mantienen a los centros de salud comunitarios dotados de personal."
                : "The workforce data, legislative intelligence, and career tools that keep community health centers staffed."}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="w-full bg-amber-500 text-stone-900 shadow-lg hover:bg-amber-400 sm:w-auto"
                asChild
              >
                <Link href="/insights">
                  {isEs ? "Dashboard Ejecutivo" : "Executive Dashboard"}{" "}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto"
                asChild
              >
                <Link href="/jobs">
                  {isEs ? "Buscar Empleos FQHC" : "Find FQHC Jobs"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== STATS BAR ==================== */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-5xl grid-cols-2 divide-y divide-stone-200 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          {[
            {
              value: `${overview.totalFQHCs}`,
              label: isEs ? "FQHCs Rastreados" : "FQHCs Tracked",
              color: "text-teal-700",
            },
            {
              value: `${overview.totalJobs}+`,
              label: isEs ? "Ofertas Activas" : "Active Jobs",
              color: "text-teal-700",
            },
            {
              value: `${overview.totalLayoffWorkers.toLocaleString()}+`,
              label: isEs ? "Trabajadores Desplazados" : "Workers Displaced",
              color: "text-red-600",
            },
            {
              value: `${fundingCliffs.length}`,
              label: isEs ? "Riesgos Fiscales Próximos" : "Funding Cliffs Ahead",
              color: "text-amber-600",
            },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center py-6 sm:py-8">
              <span className={`text-2xl font-extrabold sm:text-3xl ${s.color}`}>
                {s.value}
              </span>
              <span className="mt-1 text-xs font-medium text-stone-500 sm:text-sm">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== BREAKING INTELLIGENCE ==================== */}
      <section className="bg-stone-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-5 text-red-600" />
              <h2 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
                {isEs ? "Inteligencia Crítica" : "Breaking Intelligence"}
              </h2>
            </div>
            <Link
              href="/insights"
              className="text-sm font-medium text-teal-700 hover:text-teal-900 inline-flex items-center gap-1"
            >
              {isEs ? "Ver Todo" : "View All"}{" "}
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {breakingIntel.map((item) => {
              const catMeta = INTEL_CATEGORIES.find(
                (c) => c.id === item.category
              );
              return (
                <div
                  key={item.id}
                  className={`rounded-xl border border-stone-200 bg-white p-5 border-l-4 ${IMPACT_BORDER[item.impactLevel]} transition-shadow hover:shadow-md`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <Badge
                          variant="outline"
                          className={`text-[10px] font-semibold ${IMPACT_STYLES[item.impactLevel]}`}
                        >
                          {t(IMPACT_LABELS[item.impactLevel], locale)}
                        </Badge>
                        <span className="text-[11px] text-stone-400">
                          {formatDate(item.date, locale)}
                        </span>
                        {catMeta && (
                          <span className="text-[11px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                            {isEs ? catMeta.es : catMeta.en}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-stone-800 leading-snug">
                        {t(item.headline, locale)}
                      </h3>
                      <p className="mt-1.5 text-sm text-stone-500 leading-relaxed line-clamp-2">
                        {t(item.summary, locale)}
                      </p>
                    </div>
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 text-stone-400 hover:text-teal-600 transition-colors mt-1"
                      title={item.sourceOrg}
                    >
                      <ExternalLink className="size-4" />
                    </a>
                  </div>
                  <div className="mt-2 text-[11px] text-stone-400">
                    {isEs ? "Fuente" : "Source"}: {item.sourceOrg}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/insights">
                {isEs
                  ? "Abrir Dashboard Ejecutivo"
                  : "Open Executive Dashboard"}{" "}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ==================== FUNDING CLIFF COUNTDOWN ==================== */}
      {fundingCliffs.length > 0 && (
        <section className="border-y border-amber-200 bg-gradient-to-r from-amber-50 via-white to-amber-50 py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="size-5 text-amber-600" />
              <h2 className="text-xl font-bold text-stone-900 sm:text-2xl">
                {isEs
                  ? "Cuenta Regresiva: Riesgos Fiscales"
                  : "Funding Cliff Countdown"}
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {fundingCliffs.map((cliff) => {
                const urgency =
                  cliff.daysUntil < 90
                    ? "border-red-300 bg-red-50"
                    : cliff.daysUntil < 180
                      ? "border-amber-300 bg-amber-50"
                      : "border-stone-200 bg-white";
                const countColor =
                  cliff.daysUntil < 90
                    ? "text-red-700"
                    : cliff.daysUntil < 180
                      ? "text-amber-700"
                      : "text-stone-700";

                return (
                  <div
                    key={cliff.id}
                    className={`rounded-xl border p-5 ${urgency}`}
                  >
                    <div className={`text-4xl font-bold ${countColor}`}>
                      {cliff.daysUntil}
                      <span className="text-base font-medium ml-1">
                        {isEs ? "días" : "days"}
                      </span>
                    </div>
                    <h3 className="mt-1 font-semibold text-stone-800 text-sm leading-snug">
                      {isEs ? cliff.title.es : cliff.title.en}
                    </h3>
                    {cliff.dollarAmount && (
                      <div className="mt-1 text-xs text-stone-500">
                        {cliff.dollarAmount}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 text-right">
              <Link
                href="/funding-impact"
                className="text-sm font-medium text-amber-700 hover:text-amber-900 inline-flex items-center gap-1"
              >
                {isEs
                  ? "Ver Rastreador Completo"
                  : "View Full Funding Tracker"}{" "}
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ==================== TWO-AUDIENCE SPLIT ==================== */}
      <section className="bg-stone-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* ---------- FOR FQHC LEADERS ---------- */}
            <div className="rounded-2xl bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950 p-8 text-white">
              <Badge className="mb-4 border-amber-400/30 bg-amber-500/20 text-amber-200 hover:bg-amber-500/30">
                {isEs ? "Para Líderes de FQHC" : "For FQHC Leaders"}
              </Badge>
              <h3 className="text-2xl font-bold tracking-tight">
                {isEs
                  ? "Inteligencia y Herramientas para Líderes"
                  : "Intelligence & Tools for Leaders"}
              </h3>
              <p className="mt-2 text-stone-400 text-sm">
                {isEs
                  ? "Datos de mercado, evaluaciones de equipo, y herramientas de contratación."
                  : "Market data, team assessments, and hiring tools."}
              </p>

              <div className="mt-6 space-y-3">
                {[
                  {
                    icon: BarChart3,
                    href: "/insights" as const,
                    label: isEs
                      ? "Dashboard Ejecutivo"
                      : "Executive Dashboard",
                    desc: isEs
                      ? "Legislación, financiamiento, fuerza laboral"
                      : "Legislation, funding, workforce",
                  },
                  {
                    icon: Flame,
                    href: "/layoffs" as const,
                    label: isEs
                      ? "Rastreador de Despidos"
                      : "Layoff Tracker",
                    desc: isEs
                      ? `${layoffStats.totalAffected.toLocaleString()}+ trabajadores rastreados`
                      : `${layoffStats.totalAffected.toLocaleString()}+ workers tracked`,
                  },
                  {
                    icon: Users,
                    href: "/team-readiness" as const,
                    label: isEs
                      ? "Evaluación de Equipo"
                      : "Team Readiness",
                    desc: isEs
                      ? "Evaluación de liderazgo en 5 dominios"
                      : "5-domain leadership assessment",
                  },
                  {
                    icon: Briefcase,
                    href: "/hire" as const,
                    label: isEs
                      ? "Publicar un Empleo"
                      : "Post a Job",
                    desc: isEs
                      ? "Acceso a candidatos pre-evaluados"
                      : "Access pre-vetted candidates",
                  },
                  {
                    icon: Target,
                    href: "/the-drop" as const,
                    label: "The Drop",
                    desc: isEs
                      ? "Programa exclusivo de emparejamiento"
                      : "Exclusive matching program",
                  },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group flex items-center gap-3 rounded-lg bg-white/5 px-4 py-3 transition-colors hover:bg-white/10"
                  >
                    <item.icon className="size-5 shrink-0 text-amber-400" />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-white">
                        {item.label}
                      </span>
                      <span className="block text-xs text-stone-400">
                        {item.desc}
                      </span>
                    </div>
                    <ArrowRight className="size-4 shrink-0 text-stone-500 transition-transform group-hover:translate-x-1 group-hover:text-white" />
                  </Link>
                ))}
              </div>
            </div>

            {/* ---------- FOR JOB SEEKERS ---------- */}
            <div className="rounded-2xl border-2 border-teal-200 bg-white p-8">
              <Badge className="mb-4 border-teal-300 bg-teal-50 text-teal-700">
                {isEs ? "Para Profesionales" : "For Job Seekers"}
              </Badge>
              <h3 className="text-2xl font-bold tracking-tight text-stone-900">
                {isEs
                  ? "Herramientas de Carrera Gratuitas"
                  : "Free Career Tools"}
              </h3>
              <p className="mt-2 text-stone-500 text-sm">
                {isEs
                  ? "Todo para tu próximo puesto en salud comunitaria."
                  : "Everything for your next community health role."}
              </p>

              <div className="mt-6 space-y-3">
                {[
                  {
                    icon: Briefcase,
                    href: "/jobs" as const,
                    label: isEs ? "Buscar Empleos" : "Browse Jobs",
                    desc: isEs
                      ? `${overview.totalJobs}+ empleos en 9 regiones`
                      : `${overview.totalJobs}+ jobs across 9 regions`,
                  },
                  {
                    icon: FileText,
                    href: "/resume-builder" as const,
                    label: isEs ? "Constructor de CV" : "Resume Builder",
                    desc: isEs
                      ? "8 plantillas de rol, bilingüe, gratis"
                      : "8 role templates, bilingual, free",
                  },
                  {
                    icon: Brain,
                    href: "/career-insights" as const,
                    label: isEs
                      ? "Evaluación Profesional"
                      : "Career Assessment",
                    desc: isEs
                      ? "5 dominios + plan de 90 días"
                      : "5 domains + 90-day plan",
                  },
                  {
                    icon: Map,
                    href: "/career-roadmap" as const,
                    label: isEs ? "Ruta Profesional" : "Career Roadmap",
                    desc: isEs
                      ? "5 trayectorias con datos salariales CA"
                      : "5 tracks with CA salary data",
                  },
                  {
                    icon: BookOpen,
                    href: "/resources" as const,
                    label: isEs
                      ? "Recursos de Carrera"
                      : "Career Resources",
                    desc: isEs
                      ? "Préstamos, capacitación, desarrollo"
                      : "Loan repayment, training, development",
                  },
                  {
                    icon: GraduationCap,
                    href: "/guides" as const,
                    label: isEs
                      ? "Guías del Trabajo"
                      : "Workplace Guides",
                    desc: isEs
                      ? "ECM, co-visitas, facturación, CalAIM"
                      : "ECM, co-visits, billing, CalAIM",
                  },
                  {
                    icon: Award,
                    href: "/certifications" as const,
                    label: isEs
                      ? "Certificaciones"
                      : "Certifications",
                    desc: isEs
                      ? "15 certificaciones CA con costos"
                      : "15 CA certs with costs & salary impact",
                  },
                  {
                    icon: Zap,
                    href: "/fast-track" as const,
                    label: isEs
                      ? "Intake Prioritario"
                      : "Priority Intake",
                    desc: isEs
                      ? "Para trabajadores desplazados"
                      : "For displaced workers",
                  },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group flex items-center gap-3 rounded-lg border border-stone-100 px-4 py-3 transition-all hover:border-teal-200 hover:bg-teal-50/50"
                  >
                    <item.icon className="size-5 shrink-0 text-teal-600" />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-stone-800">
                        {item.label}
                      </span>
                      <span className="block text-xs text-stone-500">
                        {item.desc}
                      </span>
                    </div>
                    <ArrowRight className="size-4 shrink-0 text-stone-300 transition-transform group-hover:translate-x-1 group-hover:text-teal-600" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== LIVE MARKET DATA ==================== */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {isEs
                ? "Datos de Mercado en Vivo"
                : "Live Market Data"}
            </h2>
            <p className="mt-2 text-teal-100/80">
              {isEs
                ? `${overview.totalFQHCs} FQHCs, ${overview.totalJobs}+ empleos, y datos salariales de 30 roles.`
                : `${overview.totalFQHCs} FQHCs, ${overview.totalJobs}+ jobs, and salary data across 30 roles.`}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Hottest Roles */}
            <div className="rounded-xl border border-teal-500/30 bg-white/10 p-5 backdrop-blur">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="size-4 text-amber-400" />
                <h3 className="text-sm font-semibold text-teal-100">
                  {isEs ? "Roles en Alta Demanda" : "Hot Demand Roles"}
                </h3>
              </div>
              <div className="space-y-2">
                {hotRoles.slice(0, 4).map((role) => (
                  <div
                    key={role.roleType}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-teal-100/80 truncate mr-2">
                      {role.roleType}
                    </span>
                    <Badge className="border-amber-400/30 bg-amber-500/20 text-amber-100 shrink-0">
                      {role.jobCount}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Hiring Region */}
            <div className="rounded-xl border border-teal-500/30 bg-white/10 p-5 backdrop-blur">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="size-4 text-amber-400" />
                <h3 className="text-sm font-semibold text-teal-100">
                  {isEs ? "Región Líder" : "Top Hiring Region"}
                </h3>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {overview.topHiringRegion}
              </div>
              <div className="text-sm text-teal-100/70">
                {isEs
                  ? `${overview.bilingualJobPercent}% requieren bilingüe`
                  : `${overview.bilingualJobPercent}% require bilingual`}
              </div>
            </div>

            {/* Layoff Counter */}
            <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-5 backdrop-blur">
              <div className="flex items-center gap-2 mb-3">
                <Flame className="size-4 text-red-400" />
                <h3 className="text-sm font-semibold text-red-200">
                  {isEs ? "Despidos Rastreados" : "Layoffs Tracked"}
                </h3>
              </div>
              <div className="text-2xl font-bold text-red-300 mb-1">
                {layoffStats.totalAffected.toLocaleString()}+
              </div>
              <div className="text-sm text-teal-100/70">
                {layoffStats.uniqueOrgs} {isEs ? "organizaciones" : "organizations"},{" "}
                {layoffStats.regionsAffected} {isEs ? "regiones" : "regions"}
              </div>
            </div>

            {/* Avg Salary */}
            <div className="rounded-xl border border-teal-500/30 bg-white/10 p-5 backdrop-blur">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="size-4 text-amber-400" />
                <h3 className="text-sm font-semibold text-teal-100">
                  {isEs ? "Salario Promedio" : "Avg Salary"}
                </h3>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                ${Math.round(overview.avgSalaryAllRoles / 1000)}K
              </div>
              <div className="text-sm text-teal-100/70">
                {isEs
                  ? `Datos de ${overview.totalJobs}+ listados`
                  : `Data from ${overview.totalJobs}+ listings`}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button
              size="lg"
              className="bg-amber-500 text-stone-900 shadow-lg hover:bg-amber-400"
              asChild
            >
              <Link href="/insights">
                {isEs ? "Ver Dashboard Completo" : "View Full Dashboard"}{" "}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ==================== FEATURED FQHCS ==================== */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
              {isEs
                ? "FQHCs Destacados de California"
                : "Featured California FQHCs"}
            </h2>
            <p className="mt-3 text-stone-500">
              {isEs
                ? `Directorio de ${overview.totalFQHCs} centros de salud comunitarios con valoraciones, empleos y programas.`
                : `Directory of ${overview.totalFQHCs} community health centers with ratings, jobs, and programs.`}
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {californiaFQHCs
              .filter(
                (f) => f.glassdoorRating || parseInt(f.staffCount) > 500
              )
              .slice(0, 6)
              .map((fqhc) => (
                <Link
                  key={fqhc.slug}
                  href={`/directory/${fqhc.slug}` as "/directory"}
                  className="group rounded-2xl border border-stone-200 bg-stone-50 p-6 transition-all hover:-translate-y-1 hover:border-teal-200 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-stone-900 group-hover:text-teal-700">
                        {fqhc.name}
                      </h3>
                      <p className="mt-1 flex items-center gap-1 text-sm text-stone-500">
                        <MapPin className="size-3.5" />
                        {fqhc.city}, CA
                      </p>
                    </div>
                    {fqhc.glassdoorRating && (
                      <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1">
                        <Star className="size-3.5 fill-amber-500 text-amber-500" />
                        <span className="text-sm font-semibold text-amber-700">
                          {fqhc.glassdoorRating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex items-center gap-4 text-xs text-stone-500">
                    <span className="flex items-center gap-1">
                      <Building2 className="size-3.5" />
                      {fqhc.siteCount} {isEs ? "sitios" : "sites"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="size-3.5" />
                      {fqhc.staffCount} {isEs ? "personal" : "staff"}
                    </span>
                  </div>

                  <p className="mt-3 text-xs font-medium text-teal-700 opacity-0 transition-opacity group-hover:opacity-100">
                    {isEs ? "Ver perfil" : "View profile"}{" "}
                    <ArrowRight className="inline size-3" />
                  </p>
                </Link>
              ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/directory">
                {isEs
                  ? `Ver los ${overview.totalFQHCs} FQHCs`
                  : `View All ${overview.totalFQHCs} FQHCs`}{" "}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ==================== LATEST ARTICLES ==================== */}
      <section className="bg-stone-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
              {isEs ? "Artículos Recientes" : "Latest Articles"}
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                slug: "healthcare-hiring-trends-2026",
                title: "Healthcare Hiring Trends 2026",
                esTitle: "Tendencias de Contratación 2026",
                category: "Data Report",
                esCategory: "Informe",
                color: "bg-teal-50 text-teal-700",
              },
              {
                slug: "medi-cal-funding-cuts-community-health-workers",
                title: "Medi-Cal Funding Cuts: What CHWs Need to Know",
                esTitle: "Recortes de Medi-Cal: Lo Que Necesitas Saber",
                category: "Funding",
                esCategory: "Financiamiento",
                color: "bg-red-50 text-red-700",
              },
              {
                slug: "laid-off-fqhc-fast-track-job-search",
                title: "Laid Off? Fast-Track Your Job Search",
                esTitle: "¿Despedido/a? Acelera Tu Búsqueda",
                category: "Fast-Track",
                esCategory: "Fast-Track",
                color: "bg-amber-50 text-amber-700",
              },
              {
                slug: "fqhc-salary-negotiation-guide",
                title: "How to Negotiate Your FQHC Salary",
                esTitle: "Cómo Negociar Tu Salario en un FQHC",
                category: "Salary",
                esCategory: "Salario",
                color: "bg-blue-50 text-blue-700",
              },
            ].map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}` as "/blog"}
                className="group rounded-xl border border-stone-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <Badge
                  variant="secondary"
                  className={`mb-3 ${post.color}`}
                >
                  {isEs ? post.esCategory : post.category}
                </Badge>
                <h3 className="font-semibold leading-snug text-stone-900 group-hover:text-teal-700">
                  {isEs ? post.esTitle : post.title}
                </h3>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-teal-700 opacity-0 transition-opacity group-hover:opacity-100">
                  {isEs ? "Leer" : "Read"}{" "}
                  <ArrowRight className="size-3" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/blog">
                {isEs ? "Ver Todos los Artículos" : "View All Articles"}{" "}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ==================== DUAL CTA ==================== */}
      <section className="bg-gradient-to-r from-stone-800 via-stone-900 to-stone-800 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {isEs
              ? "Fortaleciendo la Fuerza Laboral de California"
              : "Strengthening California's Safety-Net Workforce"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-400">
            {isEs
              ? "Conectando profesionales de salud comprometidos con FQHCs — más rápido, más inteligente, y con la compatibilidad cultural que importa."
              : "Connecting mission-driven health professionals with FQHCs — faster, smarter, and with the cultural fit that matters."}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="w-full bg-teal-600 text-white shadow-lg hover:bg-teal-500 sm:w-auto"
              asChild
            >
              <Link href="/join">
                {isEs ? "Unirse a la Red" : "Join the Network"}{" "}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="w-full bg-amber-500 text-stone-900 shadow-lg hover:bg-amber-400 sm:w-auto"
              asChild
            >
              <Link href="/hire">
                {isEs ? "Contratar Talento" : "Hire Talent"}{" "}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
