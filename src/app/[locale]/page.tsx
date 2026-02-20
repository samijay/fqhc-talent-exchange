// FQHC Talent Exchange v2 — Homepage
"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import {
  Shield,
  Users,
  Zap,
  ArrowRight,
  Mail,
  Star,
  MapPin,
  Building2,
  BookOpen,
  Briefcase,
  BarChart3,
  Play,
  FileText,
  Brain,
  Target,
  AlertTriangle,
  TrendingUp,
  Flame,
  Newspaper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { californiaFQHCs } from "@/lib/california-fqhcs";
import {
  getMarketOverview,
  getFundingCliffs,
  getRoleDemand,
} from "@/lib/market-intelligence";
import { getLayoffStats } from "@/lib/california-fqhc-layoffs";

/* ---------- Module-level data (computed once) ---------- */
const overview = getMarketOverview();
const fundingCliffs = getFundingCliffs()
  .filter((c) => !c.isPast)
  .slice(0, 3);
const hotRoles = getRoleDemand().filter((r) => r.demandSignal === "hot");
const layoffStats = getLayoffStats();

export default function Home() {
  const t = useTranslations("home");
  const tRoles = useTranslations("roles");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const isEs = locale === "es";

  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [emailMessage, setEmailMessage] = useState("");

  /* ---------- Live Stats ---------- */
  const stats = [
    {
      value: `${overview.totalFQHCs}`,
      label: isEs ? "FQHCs Rastreados" : "FQHCs Tracked",
    },
    {
      value: `${overview.totalJobs}+`,
      label: isEs ? "Ofertas de Empleo" : "Job Listings",
    },
    {
      value: `${overview.totalLayoffWorkers.toLocaleString()}+`,
      label: isEs ? "Trabajadores Desplazados" : "Displaced Workers",
    },
  ];

  /* ---------- Role Badges ---------- */
  const roles = [
    tRoles("communityHealthWorker"),
    tRoles("careCoordinator"),
    tRoles("medicalAssistant"),
    tRoles("caseManager"),
    tRoles("behavioralHealthSpecialist"),
    tRoles("registeredNurse"),
    tRoles("nursePractitioner"),
    tRoles("licensedClinicalSocialWorker"),
    tRoles("dentalHygienist"),
    tRoles("healthEducator"),
    tRoles("patientServicesRep"),
    tRoles("medicalDirector"),
  ];

  /* ---------- Tool Cards ---------- */
  const toolCards = [
    {
      icon: FileText,
      href: "/resume-builder" as const,
      title: isEs ? "Constructor de CV" : "Resume Builder",
      body: isEs
        ? "Gratis, bilingüe, 8 plantillas por rol con evaluación profesional integrada."
        : "Free, bilingual, 8 role-specific templates with built-in career assessment.",
      cta: isEs ? "Crear CV Gratis" : "Build Free Resume",
      color: "teal" as const,
    },
    {
      icon: Brain,
      href: "/resume-builder" as const,
      title: isEs ? "Evaluación Profesional" : "Career Assessment",
      body: isEs
        ? "15 preguntas en 5 dominios incluyendo Preparación para la Transición. Descubre tus fortalezas."
        : "15-question behavioral assessment across 5 domains including Transition Readiness.",
      cta: isEs ? "Evaluar Fortalezas" : "Assess Your Strengths",
      color: "purple" as const,
    },
    {
      icon: Briefcase,
      href: "/jobs" as const,
      title: isEs ? "Buscar Empleos" : "Job Search",
      body: isEs
        ? `${overview.totalJobs}+ empleos FQHC en 9 regiones de California. Filtra por rol, salario e idioma.`
        : `${overview.totalJobs}+ FQHC jobs across 9 California regions. Filter by role, salary, and language.`,
      cta: isEs ? "Buscar Empleos" : "Browse Jobs",
      color: "teal" as const,
    },
    {
      icon: BarChart3,
      href: "/insights" as const,
      title: isEs ? "Inteligencia de Mercado" : "Market Insights",
      body: isEs
        ? "Riesgos de financiamiento, benchmarks salariales, snapshots regionales y demanda por rol."
        : "Funding cliffs, salary benchmarks, regional snapshots, and role demand data.",
      cta: isEs ? "Ver Dashboard" : "View Dashboard",
      color: "amber" as const,
    },
    {
      icon: Zap,
      href: "/fast-track" as const,
      title: isEs ? "Herramientas Gratis" : "Free Career Tools",
      body: isEs
        ? "CV, evaluación de carrera, ruta profesional y certificaciones — todo gratis para profesionales de salud."
        : "Resume builder, career assessment, roadmap, and certifications — all free for health professionals.",
      cta: isEs ? "Comenzar" : "Get Started",
      color: "amber" as const,
    },
    {
      icon: Target,
      href: "/why-fqhc" as const,
      title: isEs ? "¿Por Qué un FQHC?" : "Why Work at an FQHC?",
      body: isEs
        ? "Escalas de carrera, comparaciones salariales, pago de préstamos y compensación total."
        : "Career ladders, salary comparisons, loan repayment, and total compensation.",
      cta: isEs ? "Descubrir Beneficios" : "Discover Benefits",
      color: "teal" as const,
    },
  ];

  const colorMap = {
    teal: {
      iconBg: "bg-teal-50 text-teal-700 group-hover:bg-teal-700 group-hover:text-white",
      cta: "text-teal-700",
    },
    purple: {
      iconBg: "bg-purple-50 text-purple-700 group-hover:bg-purple-700 group-hover:text-white",
      cta: "text-purple-700",
    },
    amber: {
      iconBg: "bg-amber-50 text-amber-700 group-hover:bg-amber-700 group-hover:text-white",
      cta: "text-amber-700",
    },
  };

  return (
    <div className="bg-stone-50">
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 text-white">
        {/* decorative blobs */}
        <div className="absolute -left-32 -top-32 size-96 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 size-[28rem] rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 border-teal-400/30 bg-teal-500/20 text-teal-100 hover:bg-teal-500/30">
              {t("badge")}
            </Badge>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {t("heroTitle", { days: "21" })}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-teal-100/90 sm:text-xl">
              {isEs
                ? "Fortaleciendo la fuerza laboral de California conectando profesionales de salud comprometidos con FQHCs — más rápido, más inteligente, y con la compatibilidad cultural que importa."
                : "Strengthening California's safety-net workforce by connecting mission-driven health professionals with FQHCs — faster, smarter, and with the cultural fit that matters."}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="w-full bg-amber-500 text-stone-900 shadow-lg hover:bg-amber-400 sm:w-auto"
                asChild
              >
                <Link href="/resume-builder">
                  {tNav("buildResume")} <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto"
                asChild
              >
                <Link href="/hire">{tNav("hireTalent")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== STATS BAR (live data) ==================== */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-4xl grid-cols-1 divide-y divide-stone-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center py-8">
              <span className="text-3xl font-extrabold text-teal-700">
                {s.value}
              </span>
              <span className="mt-1 text-sm font-medium text-stone-500">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== DISPLACED WORKER BANNER ==================== */}
      <section className="border-b border-amber-200 bg-gradient-to-r from-amber-50 to-teal-50">
        <Link
          href="/fast-track"
          className="group mx-auto flex max-w-4xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
            <Zap className="size-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-stone-900 sm:text-base">
              {t("fastTrackTitle")}
            </p>
            <p className="text-xs text-stone-600 sm:text-sm">
              {t("fastTrackSubtitle")}
            </p>
          </div>
          <ArrowRight className="size-5 shrink-0 text-stone-400 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>

      {/* ==================== FREE TOOLS FOR JOB SEEKERS ==================== */}
      <section className="bg-stone-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              {isEs
                ? "Herramientas Gratuitas para Profesionales"
                : "Free Tools for Job Seekers"}
            </h2>
            <p className="mt-4 text-lg text-stone-500">
              {isEs
                ? "Todo lo que necesitas para encontrar tu próximo puesto en salud comunitaria — completamente gratis."
                : "Everything you need to find your next community health role — completely free."}
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {toolCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group rounded-2xl border border-stone-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  className={`mb-5 inline-flex size-12 items-center justify-center rounded-xl transition-colors ${colorMap[card.color].iconBg}`}
                >
                  <card.icon className="size-6" />
                </div>
                <h3 className="text-lg font-semibold text-stone-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">
                  {card.body}
                </p>
                <span
                  className={`mt-4 inline-flex items-center gap-1 text-sm font-medium ${colorMap[card.color].cta}`}
                >
                  {card.cta}{" "}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== MARKET INTELLIGENCE TEASER ==================== */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: Text + CTA */}
            <div>
              <Badge className="mb-4 border-teal-400/30 bg-teal-500/20 text-teal-100">
                {isEs ? "Datos en Vivo" : "Live Data"}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {isEs
                  ? "Inteligencia Que Nadie Más Tiene"
                  : "Intelligence No One Else Has"}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-teal-100/80">
                {isEs
                  ? `${overview.totalFQHCs} FQHCs rastreados, ${overview.totalJobs}+ empleos, alertas de riesgo de financiamiento, benchmarks salariales para 30 roles, y snapshots regionales — todo gratis.`
                  : `${overview.totalFQHCs} FQHCs tracked, ${overview.totalJobs}+ jobs, funding risk alerts, salary benchmarks for 30 roles, and regional snapshots — all free.`}
              </p>
              <div className="mt-8">
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

            {/* Right: Mini Dashboard Card */}
            <div className="rounded-2xl border border-teal-500/30 bg-white/10 p-6 backdrop-blur">
              {/* Funding Cliffs */}
              <div className="mb-6">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-teal-100">
                  <AlertTriangle className="size-4 text-amber-400" />
                  {isEs ? "Riesgos de Financiamiento" : "Funding Cliff Countdown"}
                </div>
                <div className="space-y-2">
                  {fundingCliffs.map((cliff) => (
                    <div
                      key={cliff.id}
                      className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2"
                    >
                      <span className="text-sm text-teal-100/80 line-clamp-1">
                        {isEs ? cliff.title.es : cliff.title.en}
                      </span>
                      <Badge
                        className={`shrink-0 text-xs font-bold ${
                          cliff.daysUntil < 90
                            ? "border-red-400/30 bg-red-500/20 text-red-200"
                            : cliff.daysUntil < 180
                              ? "border-amber-400/30 bg-amber-500/20 text-amber-200"
                              : "border-teal-400/30 bg-teal-500/20 text-teal-200"
                        }`}
                      >
                        {cliff.daysUntil}d
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hot Roles */}
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-teal-100">
                  <TrendingUp className="size-4 text-amber-400" />
                  {isEs ? "Roles en Alta Demanda" : "Hot Demand Roles"}
                </div>
                <div className="flex flex-wrap gap-2">
                  {hotRoles.slice(0, 5).map((role) => (
                    <Badge
                      key={role.roleType}
                      className="border-amber-400/30 bg-amber-500/20 text-amber-100"
                    >
                      {role.roleType} ({role.jobCount})
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== LAYOFF COUNTER ==================== */}
      <section className="border-y border-red-200 bg-gradient-to-r from-red-50 via-amber-50 to-red-50 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-red-100">
                <Flame className="size-7 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900 sm:text-xl">
                  {isEs
                    ? "Rastreador de Despidos en California"
                    : "California FQHC Layoff Tracker"}
                </h3>
                <p className="text-sm text-stone-500">
                  {isEs
                    ? "Rastreando desplazamiento laboral en tiempo real"
                    : "Tracking real-time workforce displacement"}
                </p>
              </div>
            </div>
            <div className="flex gap-8 sm:gap-12">
              <div className="text-center">
                <span className="text-3xl font-extrabold text-red-600 sm:text-4xl">
                  {layoffStats.totalAffected.toLocaleString()}+
                </span>
                <p className="mt-1 text-xs font-medium text-stone-500 sm:text-sm">
                  {isEs ? "Trabajadores Desplazados" : "Workers Displaced"}
                </p>
              </div>
              <div className="text-center">
                <span className="text-3xl font-extrabold text-amber-600 sm:text-4xl">
                  {layoffStats.uniqueOrgs}
                </span>
                <p className="mt-1 text-xs font-medium text-stone-500 sm:text-sm">
                  {isEs ? "Organizaciones" : "Organizations"}
                </p>
              </div>
              <div className="text-center">
                <span className="text-3xl font-extrabold text-stone-700 sm:text-4xl">
                  {layoffStats.regionsAffected}
                </span>
                <p className="mt-1 text-xs font-medium text-stone-500 sm:text-sm">
                  {isEs ? "Regiones" : "Regions"}
                </p>
              </div>
            </div>
            <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50" asChild>
              <Link href="/layoffs">
                {isEs ? "Ver Rastreador Completo" : "View Full Tracker"}{" "}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ==================== ROLES WE FILL ==================== */}
      <section className="bg-stone-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              {t("rolesTitle")}
            </h2>
            <p className="mt-4 text-lg text-stone-500">
              {t("rolesSubtitle")}
            </p>
          </div>

          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3">
            {roles.map((role) => (
              <Link key={role} href="/jobs">
                <Badge
                  variant="outline"
                  className="cursor-pointer border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-teal-400 hover:bg-teal-50 hover:text-teal-800"
                >
                  {role}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED FQHCS ==================== */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              {t("featuredTitle")}
            </h2>
            <p className="mt-4 text-lg text-stone-500">
              {t("featuredSubtitle")}
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                      {fqhc.siteCount} {t("featuredSites")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="size-3.5" />
                      {fqhc.staffCount} {t("featuredStaff")}
                    </span>
                  </div>

                  <p className="mt-3 text-xs font-medium text-teal-700 opacity-0 transition-opacity group-hover:opacity-100">
                    {t("viewProfile")}{" "}
                    <ArrowRight className="inline size-3" />
                  </p>
                </Link>
              ))}
          </div>

          <div className="mt-10 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/directory">
                {t("viewAllFqhcs")} <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ==================== FOR FQHC LEADERS ==================== */}
      <section className="bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 border-amber-400/30 bg-amber-500/20 text-amber-200 hover:bg-amber-500/30">
              {isEs ? "Para Líderes de FQHC" : "For FQHC Leaders"}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {isEs
                ? "Herramientas Gratuitas para Líderes de Salud Comunitaria"
                : "Free Tools for Community Health Leaders"}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-400">
              {isEs
                ? "Herramientas de contratación, evaluación de equipos e inteligencia de mercado — diseñadas para líderes de FQHCs."
                : "Hiring tools, team assessments, and market intelligence — built for FQHC leaders."}
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1: Interactive Demo */}
            <Link
              href="/demo"
              className="group rounded-2xl border border-teal-500/30 bg-stone-800/50 p-8 transition-all hover:-translate-y-1 hover:border-teal-400/60 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400">
                <Play className="size-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                {isEs
                  ? "Demo Interactivo del Producto"
                  : "Interactive Product Demo"}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-400">
                {isEs
                  ? "Recorre las 9 secciones de nuestra plataforma: inteligencia de mercado, evaluaciones, herramientas de contratación y más."
                  : "Walk through all 9 sections of our platform: market intelligence, assessments, hiring tools, and more."}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-400">
                {isEs ? "Ver Demo" : "Watch Demo"}{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            {/* Card 2: Team Readiness Assessment */}
            <Link
              href="/team-readiness"
              className="group rounded-2xl border border-indigo-500/30 bg-stone-800/50 p-8 transition-all hover:-translate-y-1 hover:border-indigo-400/60 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400">
                <BarChart3 className="size-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                {isEs
                  ? "Evaluación de Preparación del Equipo"
                  : "Team Readiness Assessment"}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-400">
                {isEs
                  ? "Evalúa tu liderazgo en 5 dominios. Obtén un diagnóstico STARS, acciones de gestión priorizadas y herramientas de Liberating Structures."
                  : "Assess your leadership across 5 domains. Get a STARS diagnosis, prioritized management actions, and Liberating Structures tools."}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-400">
                {isEs ? "Evaluar Mi Equipo" : "Assess My Team"}{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            {/* Card 3: Job Posting Builder */}
            <Link
              href="/job-posting-builder"
              className="group rounded-2xl border border-stone-700 bg-stone-800/50 p-8 transition-all hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                <Briefcase className="size-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                {isEs
                  ? "Creador de Publicaciones de Empleo"
                  : "Job Posting Builder"}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-400">
                {isEs
                  ? "Genera publicaciones profesionales con plantillas para CHW, coordinadores, asistentes médicos y más. Incluye benchmarks salariales."
                  : "Generate professional postings with templates for CHWs, care coordinators, MAs, and more. Includes salary benchmarks."}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-amber-400">
                {isEs ? "Crear Publicación Gratis" : "Create Free Posting"}{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            {/* Card 4: Hire Talent */}
            <Link
              href="/hire"
              className="group rounded-2xl border border-stone-700 bg-stone-800/50 p-8 transition-all hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-lg sm:col-span-2 lg:col-span-1"
            >
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                <Users className="size-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                {isEs
                  ? "Acceda a Candidatos Pre-evaluados"
                  : "Access Pre-Vetted Candidates"}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-400">
                {isEs
                  ? "Únase a nuestra lista de espera y obtenga acceso a candidatos de salud comunitaria examinados con experiencia en FQHC."
                  : "Join our employer waitlist and get access to vetted community health candidates with real FQHC experience."}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-amber-400">
                {isEs ? "Solicitar Acceso" : "Request Access"}{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            {/* Card 5: Screening Questions */}
            <div className="rounded-2xl border border-stone-700 bg-stone-800/50 p-8">
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400">
                <Shield className="size-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                {isEs
                  ? "Preguntas de Selección FQHC"
                  : "FQHC Screening Questions"}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-400">
                {isEs
                  ? "Preguntas prediseñadas para identificar experiencia en co-visitas, gestión de atención, recuperación de ingresos y operaciones clínicas."
                  : "Pre-built questions to screen for co-visit experience, care management, revenue recovery, and clinic operations expertise."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TRENDING ARTICLES ==================== */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-3 flex items-center justify-center gap-2">
              <Newspaper className="size-6 text-teal-700" />
              <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                {isEs ? "Artículos Destacados" : "Trending Articles"}
              </h2>
            </div>
            <p className="mt-2 text-lg text-stone-500">
              {isEs
                ? "Datos, tendencias y guías prácticas para profesionales de salud comunitaria."
                : "Data, trends, and practical guides for community health professionals."}
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-12">
            {/* Featured Article (large card) */}
            <Link
              href={"/blog/healthcare-hiring-trends-2026" as "/blog"}
              className="group col-span-full rounded-2xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-white p-8 transition-all hover:-translate-y-1 hover:shadow-lg lg:col-span-7"
            >
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">
                  <TrendingUp className="mr-1 size-3" />
                  {isEs ? "Nuevo" : "New"}
                </Badge>
                <Badge variant="secondary" className="bg-teal-50 text-teal-700">
                  {isEs ? "Informe de Datos" : "Data Report"}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold leading-tight text-stone-900 group-hover:text-teal-700 sm:text-3xl">
                {isEs
                  ? "Tendencias de Contratación en Salud 2026: Lo Que los Datos Revelan Sobre Carreras en FQHCs"
                  : "Healthcare Hiring Trends 2026: What the Jobs Data Tells Us About FQHC Careers"}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-stone-500 sm:text-lg">
                {isEs
                  ? "El sector de salud añade 50,000+ empleos mensuales mientras los FQHCs enfrentan recortes de fondos. Analizamos los datos de empleo, la demanda de roles, y qué significa para tu carrera."
                  : "Healthcare adds 50,000+ jobs monthly while FQHCs face funding cliffs. We break down the employment data, role demand, and what it means for your career."}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-teal-700">
                {isEs ? "Leer Informe Completo" : "Read Full Report"}{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            {/* Secondary articles (stacked right column) */}
            <div className="col-span-full flex flex-col gap-6 lg:col-span-5">
              {[
                {
                  slug: "medi-cal-funding-cuts-community-health-workers",
                  title: "Medi-Cal Funding Cuts: What Community Health Workers Need to Know",
                  esTitle: "Recortes de Medi-Cal: Lo Que Necesitas Saber",
                  category: "Funding",
                  esCategory: "Financiamiento",
                  highlight: true,
                },
                {
                  slug: "laid-off-fqhc-fast-track-job-search",
                  title: "Laid Off from an FQHC? Fast-Track Your Job Search",
                  esTitle: "¿Despedido/a de un FQHC? Acelera Tu Búsqueda",
                  category: "Fast-Track",
                  esCategory: "Fast-Track",
                  highlight: false,
                },
                {
                  slug: "fqhc-salary-negotiation-guide",
                  title: "How to Negotiate Your FQHC Salary",
                  esTitle: "Cómo Negociar Tu Salario en un FQHC",
                  category: "Salary",
                  esCategory: "Salario",
                  highlight: false,
                },
                {
                  slug: "fqhc-career-ladder-ma-rn-provider",
                  title: "The MA, RN & Provider Career Ladder at FQHCs",
                  esTitle: "La Escalera Profesional de MA, RN y Proveedores",
                  category: "Career Growth",
                  esCategory: "Crecimiento",
                  highlight: false,
                },
              ].map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}` as "/blog"}
                  className={`group flex items-start gap-4 rounded-xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-md ${
                    post.highlight
                      ? "border-red-200 bg-red-50/50"
                      : "border-stone-200 bg-stone-50"
                  }`}
                >
                  <Badge
                    variant="secondary"
                    className={`mt-0.5 shrink-0 ${
                      post.highlight
                        ? "bg-red-100 text-red-700"
                        : "bg-teal-50 text-teal-700"
                    }`}
                  >
                    {isEs ? post.esCategory : post.category}
                  </Badge>
                  <div className="flex-1">
                    <h3 className="font-semibold leading-snug text-stone-900 group-hover:text-teal-700">
                      {isEs ? post.esTitle : post.title}
                    </h3>
                  </div>
                  <ArrowRight className="mt-1 size-4 shrink-0 text-stone-400 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/blog">
                {isEs ? "Ver Todos los Artículos" : "View All Articles"}{" "}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ==================== EMAIL SIGNUP ==================== */}
      <section className="bg-stone-900 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <Mail className="mx-auto mb-4 size-10 text-amber-400" />
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t("newsletterTitle")}
            </h2>
            <p className="mt-4 text-base text-stone-400">
              {t("newsletterSubtitle")}
            </p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setEmailStatus("loading");
                try {
                  const res = await fetch("/api/early-access", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                  });
                  const result = await res.json();
                  if (!res.ok) {
                    setEmailStatus("error");
                    setEmailMessage(
                      result.error || "Something went wrong."
                    );
                  } else {
                    setEmailStatus("success");
                    setEmailMessage(result.message);
                    setEmail("");
                  }
                } catch {
                  setEmailStatus("error");
                  setEmailMessage("Network error. Please try again.");
                }
              }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <Input
                type="email"
                required
                placeholder={t("newsletterPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={emailStatus === "loading"}
                className="h-12 w-full border-stone-700 bg-stone-800 text-white placeholder:text-stone-500 focus-visible:border-teal-500 focus-visible:ring-teal-500/30 sm:w-72"
              />
              <Button
                type="submit"
                size="lg"
                disabled={emailStatus === "loading"}
                className="w-full bg-teal-700 text-white hover:bg-teal-500 sm:w-auto"
              >
                {emailStatus === "loading" ? (
                  isEs ? (
                    "Registrando..."
                  ) : (
                    "Signing up..."
                  )
                ) : (
                  <>
                    {t("newsletterButton")}{" "}
                    <ArrowRight className="size-4" />
                  </>
                )}
              </Button>
            </form>

            {emailStatus === "success" && (
              <p className="mt-4 text-sm font-medium text-teal-400">
                {emailMessage}
              </p>
            )}
            {emailStatus === "error" && (
              <p className="mt-4 text-sm font-medium text-red-400">
                {emailMessage}
              </p>
            )}
            {emailStatus === "idle" && (
              <p className="mt-4 text-xs text-stone-500">
                {t("newsletterDisclaimer")}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
