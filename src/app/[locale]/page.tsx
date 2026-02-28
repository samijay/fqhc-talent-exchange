// FQHC Talent Exchange v4 — Rumelt Strategic Framework Homepage
"use client";

import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
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
  Shield,
  Zap,
  Target,
  Activity,
  Clock,
  BookOpen,
  GraduationCap,
  Map,
  Award,
  Cpu,
  Crosshair,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { californiaFQHCs } from "@/lib/california-fqhcs";
import {
  getMarketOverview,
  getFundingCliffs,
} from "@/lib/market-intelligence";
import { getLayoffStats } from "@/lib/california-fqhc-layoffs";
import { getIntelItems } from "@/lib/fqhc-news-intel";
import { IntelCard } from "@/components/intel/IntelCard";
import { getCaseStudyCounts } from "@/lib/fqhc-case-studies";
import { getAICounts } from "@/lib/fqhc-ai-tracker";
import { getOKRCounts } from "@/lib/fqhc-okr-templates";

/* ---------- Module-level data (computed once) ---------- */
const overview = getMarketOverview();
const fundingCliffs = getFundingCliffs()
  .filter((c) => !c.isPast)
  .slice(0, 3);
const layoffStats = getLayoffStats();
const allIntelItems = getIntelItems();
const caseStudyCounts = getCaseStudyCounts();
const aiCounts = getAICounts();
const okrCounts = getOKRCounts();

/* ---------- Helpers ---------- */
const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ---------- Top breaking intel (slim — full feed lives at /insights) ---------- */
const topIntel = allIntelItems
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

/* ================================================================== */
/*  Homepage                                                           */
/* ================================================================== */

export default function Home() {
  const locale = useLocale();
  const isEs = locale === "es";

  return (
    <div className="bg-stone-50">
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent" />
        <div className="absolute -bottom-40 -right-40 size-[28rem] rounded-full bg-amber-500/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Activity className="size-5 text-teal-400" />
              <span className="text-sm font-medium uppercase tracking-wider text-teal-400">
                {isEs
                  ? "Monitor de Entorno Estratégico"
                  : "Strategic Environment Monitor"}
              </span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {isEs
                ? "Monitor Estratégico FQHC de California"
                : "California's FQHC Strategic Monitor"}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-stone-300 sm:text-xl">
              {isEs
                ? "Inteligencia legislativa en tiempo real, casos de estudio con marcos estratégicos, y plantillas de ejecución para líderes de centros de salud comunitarios."
                : "Real-time legislative intelligence, case studies with strategic frameworks, and execution templates for community health center leaders."}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="w-full bg-amber-500 text-stone-900 shadow-lg hover:bg-amber-400 sm:w-auto"
                asChild
              >
                <Link href="/insights">
                  {isEs ? "Dashboard de Inteligencia" : "Intelligence Dashboard"}{" "}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto"
                asChild
              >
                <Link href="/directory">
                  {isEs
                    ? `Ver ${overview.totalFQHCs} FQHCs`
                    : `View ${overview.totalFQHCs} FQHCs`}
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
              label: isEs ? "Riesgos Fiscales" : "Funding Cliffs Ahead",
              color: "text-amber-600",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center py-6 sm:py-8"
            >
              <span
                className={`text-2xl font-extrabold sm:text-3xl ${s.color}`}
              >
                {s.value}
              </span>
              <span className="mt-1 text-xs font-medium text-stone-500 sm:text-sm">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================
          RUMELT STEP 1: THE CHALLENGE — Diagnose the Problem
          =================================================================== */}
      <section className="bg-gradient-to-b from-red-50/50 via-stone-50 to-stone-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="size-5 text-red-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-red-700">
              {isEs ? "Paso 1" : "Step 1"}
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl mb-2">
            {isEs ? "El Desafío" : "The Challenge"}
          </h2>
          <p className="text-stone-500 mb-8 max-w-3xl">
            {isEs
              ? "Diagnóstico del panorama: recortes de financiamiento, despidos, cambios legislativos y presiones que enfrentan los FQHCs de California."
              : "Diagnosing the landscape: funding cuts, layoffs, legislative shifts, and pressures facing California's FQHCs."}
          </p>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Top 3 breaking intel (full feed at /insights) */}
            <div className="lg:col-span-2">
              <div className="space-y-3">
                {topIntel.map((item) => (
                  <IntelCard
                    key={item.id}
                    item={item}
                    locale={locale}
                    isEs={isEs}
                    isExpanded={false}
                    onToggle={() => {}}
                    compact
                  />
                ))}
              </div>

              <div className="mt-6">
                <Button variant="outline" asChild>
                  <Link href="/insights">
                    {isEs
                      ? `Ver las ${allIntelItems.length} Alertas en el Dashboard`
                      : `View All ${allIntelItems.length} Items on Dashboard`}{" "}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Funding Cliff Countdown (1/3 width) */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="size-4 text-amber-600" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-700">
                  {isEs ? "Riesgos Fiscales" : "Funding Cliffs"}
                </h3>
              </div>

              <div className="space-y-3">
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
                      className={`rounded-xl border p-4 ${urgency}`}
                    >
                      <div className={`text-3xl font-bold ${countColor}`}>
                        {cliff.daysUntil}
                        <span className="text-sm font-medium ml-1">
                          {isEs ? "días" : "days"}
                        </span>
                      </div>
                      <h4 className="mt-1 font-semibold text-stone-800 text-sm leading-snug">
                        {isEs ? cliff.title.es : cliff.title.en}
                      </h4>
                      {cliff.dollarAmount && (
                        <div className="mt-1 text-xs text-stone-500">
                          {cliff.dollarAmount}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4">
                <Link
                  href="/funding-impact"
                  className="text-sm font-medium text-amber-700 hover:text-amber-900 inline-flex items-center gap-1"
                >
                  {isEs
                    ? "Rastreador Completo"
                    : "Full Funding Tracker"}{" "}
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>

              {/* Layoff snapshot */}
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
                <div className="text-2xl font-bold text-red-700">
                  {layoffStats.totalAffected.toLocaleString()}+
                </div>
                <div className="text-sm font-medium text-stone-700 mt-0.5">
                  {isEs ? "Trabajadores Desplazados" : "Workers Displaced"}
                </div>
                <div className="text-xs text-stone-500 mt-1">
                  {layoffStats.uniqueOrgs}{" "}
                  {isEs ? "organizaciones" : "organizations"},{" "}
                  {layoffStats.regionsAffected} {isEs ? "regiones" : "regions"}
                </div>
                <Link
                  href="/layoffs"
                  className="mt-2 text-xs font-medium text-red-700 hover:text-red-900 inline-flex items-center gap-1"
                >
                  {isEs ? "Rastreador de Despidos" : "Layoff Tracker"}{" "}
                  <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          RUMELT STEP 2: WHAT TO DO — Guiding Policy
          =================================================================== */}
      <section className="bg-white py-16 sm:py-20 border-y border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2">
            <Target className="size-5 text-teal-700" />
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">
              {isEs ? "Paso 2" : "Step 2"}
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl mb-2">
            {isEs ? "Qué Hacer al Respecto" : "What To Do About It"}
          </h2>
          <p className="text-stone-500 mb-10 max-w-3xl">
            {isEs
              ? "Política guía: marcos estratégicos, estudios de caso reales, y estrategias de ingresos comprobadas por FQHCs en todo el país."
              : "Guiding policy: strategic frameworks, real case studies, and proven revenue strategies from FQHCs across the country."}
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Executive Guides & Case Studies */}
            <Link
              href="/strategy/guides"
              className="group rounded-2xl border-2 border-stone-200 p-6 transition-all hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-xl bg-teal-100 p-3">
                  <BookOpen className="size-6 text-teal-700" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 group-hover:text-teal-700">
                    {isEs ? "Guías Ejecutivas" : "Executive Guides"}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {isEs
                      ? "Marcos estratégicos Rumelt"
                      : "Rumelt strategic frameworks"}
                  </p>
                </div>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed mb-4">
                {isEs
                  ? "Estudios de caso reales: cómo FQHCs redujeron dependencia federal, diversificaron ingresos, e implementaron IA."
                  : "Real case studies: how FQHCs reduced federal dependency, diversified revenue, and implemented AI."}
              </p>
              <div className="flex items-center gap-3 text-xs">
                <Badge variant="secondary" className="bg-teal-50 text-teal-700">
                  {caseStudyCounts.total}{" "}
                  {isEs ? "estudios" : "case studies"}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-stone-100 text-stone-600"
                >
                  {Object.keys(caseStudyCounts).length - 1}{" "}
                  {isEs ? "categorías" : "categories"}
                </Badge>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-700 opacity-0 transition-opacity group-hover:opacity-100">
                {isEs ? "Explorar" : "Explore"}{" "}
                <ArrowRight className="size-3.5" />
              </span>
            </Link>

            {/* Revenue Strategies */}
            <Link
              href="/funding-impact"
              className="group rounded-2xl border-2 border-stone-200 p-6 transition-all hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-xl bg-amber-100 p-3">
                  <TrendingUp className="size-6 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 group-hover:text-amber-700">
                    {isEs ? "Estrategias de Ingresos" : "Revenue Strategies"}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {isEs
                      ? "Diversificación y resiliencia"
                      : "Diversification & resilience"}
                  </p>
                </div>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed mb-4">
                {isEs
                  ? "40+ estrategias de ingresos: farmacia 340B, clínicas de pago directo, facturación de telehealth, y más."
                  : "40+ revenue strategies: 340B pharmacy, direct-pay clinics, telehealth billing, and more."}
              </p>
              <div className="flex items-center gap-3 text-xs">
                <Badge
                  variant="secondary"
                  className="bg-amber-50 text-amber-700"
                >
                  40+{" "}
                  {isEs ? "estrategias" : "strategies"}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-stone-100 text-stone-600"
                >
                  {isEs ? "H.R. 1 rastreador" : "H.R. 1 tracker"}
                </Badge>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-amber-700 opacity-0 transition-opacity group-hover:opacity-100">
                {isEs ? "Explorar" : "Explore"}{" "}
                <ArrowRight className="size-3.5" />
              </span>
            </Link>

            {/* Change Management */}
            <Link
              href="/strategy/okrs"
              className="group rounded-2xl border-2 border-stone-200 p-6 transition-all hover:-translate-y-1 hover:border-purple-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-xl bg-purple-100 p-3">
                  <Crosshair className="size-6 text-purple-700" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 group-hover:text-purple-700">
                    {isEs
                      ? "Gestión del Cambio"
                      : "Change Management"}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {isEs
                      ? "OKRs para romper silos"
                      : "OKRs to break down silos"}
                  </p>
                </div>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed mb-4">
                {isEs
                  ? "Plantillas OKR para resiliencia de ingresos, retención de personal, acceso a pacientes, y coordinación entre departamentos."
                  : "OKR templates for revenue resilience, workforce retention, patient access, and cross-department coordination."}
              </p>
              <div className="flex items-center gap-3 text-xs">
                <Badge
                  variant="secondary"
                  className="bg-purple-50 text-purple-700"
                >
                  {okrCounts.total} {isEs ? "plantillas" : "templates"}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-stone-100 text-stone-600"
                >
                  {Object.keys(okrCounts).length - 1}{" "}
                  {isEs ? "dominios" : "domains"}
                </Badge>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-purple-700 opacity-0 transition-opacity group-hover:opacity-100">
                {isEs ? "Explorar" : "Explore"}{" "}
                <ArrowRight className="size-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================================
          RUMELT STEP 3: HOW TO EXECUTE — Coherent Actions
          =================================================================== */}
      <section className="bg-stone-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="size-5 text-amber-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
              {isEs ? "Paso 3" : "Step 3"}
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl mb-2">
            {isEs ? "Cómo Ejecutar" : "How To Execute"}
          </h2>
          <p className="text-stone-500 mb-10 max-w-3xl">
            {isEs
              ? "Acciones coherentes: plantillas OKR para romper silos, rastreador de IA, guías operativas, y marcos de ejecución para su equipo."
              : "Coherent actions: OKR templates to break down silos, AI tracker, operational guides, and execution frameworks for your team."}
          </p>

          {/* ── Row 1: Primary execution tools ── */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            {/* OKR Templates — new primary card */}
            <Link
              href="/strategy/okrs"
              className="group rounded-2xl bg-gradient-to-br from-stone-800 to-stone-900 p-6 text-white transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-xl bg-white/10 p-3">
                  <Crosshair className="size-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold">
                    {isEs ? "Plantillas OKR" : "OKR Templates"}
                  </h3>
                  <p className="text-xs text-stone-400">
                    {isEs
                      ? "Gestión del cambio entre departamentos"
                      : "Cross-department change management"}
                  </p>
                </div>
              </div>
              <p className="text-sm text-stone-300 leading-relaxed mb-3">
                {isEs
                  ? "Objetivos y resultados clave diseñados para romper silos durante la crisis. Cada OKR involucra múltiples departamentos — clínico, finanzas, HR, y operaciones — porque los silos son el enemigo de la ejecución."
                  : "Objectives and key results designed to break down silos during crisis. Every OKR involves multiple departments — clinical, finance, HR, and operations — because silos are the enemy of execution."}
              </p>
              {/* Live OKR examples */}
              <div className="space-y-2 mb-4">
                <div className="rounded-lg bg-white/10 p-2.5">
                  <p className="text-xs font-medium text-amber-300">
                    {isEs ? "Ejemplo:" : "Example:"}
                  </p>
                  <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">
                    {isEs
                      ? "Capacitar al 100% de CHWs en nuevos códigos de facturación Medi-Cal en 90 días"
                      : "Cross-train 100% of CHWs on new Medi-Cal billing codes within 90 days"}
                  </p>
                  <div className="flex gap-1.5 mt-1.5">
                    {["Clinical", "Finance", "HR"].map((d) => (
                      <span key={d} className="text-[10px] bg-white/10 text-stone-400 px-1.5 py-0.5 rounded">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <Badge className="border-amber-400/30 bg-amber-500/20 text-amber-200">
                  {okrCounts.total} {isEs ? "plantillas" : "templates"}
                </Badge>
                <Badge className="border-teal-400/30 bg-teal-500/20 text-teal-200">
                  {Object.keys(okrCounts).length - 1}{" "}
                  {isEs ? "dominios" : "domains"}
                </Badge>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-amber-400 opacity-0 transition-opacity group-hover:opacity-100">
                {isEs ? "Ver Plantillas" : "View Templates"}{" "}
                <ArrowRight className="size-3.5" />
              </span>
            </Link>

            {/* AI Tracker */}
            <Link
              href="/ai-tracker"
              className="group rounded-2xl border-2 border-stone-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-xl bg-teal-100 p-3">
                  <Cpu className="size-6 text-teal-700" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 group-hover:text-teal-700">
                    {isEs ? "Rastreador de IA" : "AI Tracker"}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {isEs
                      ? "Adopción en el sector FQHC"
                      : "FQHC sector adoption"}
                  </p>
                </div>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed mb-4">
                {isEs
                  ? "Monitorea implementaciones de IA en FQHCs: documentación clínica ambiental, ciclo de ingresos, coordinación de atención. Incluyendo athenahealth, Epic, NextGen, y más."
                  : "Monitor AI deployments at FQHCs: ambient clinical documentation, revenue cycle, care coordination. Including athenahealth, Epic, NextGen, and more."}
              </p>
              <div className="flex items-center gap-3 text-xs">
                <Badge variant="secondary" className="bg-teal-50 text-teal-700">
                  {aiCounts.total}{" "}
                  {isEs ? "implementaciones" : "deployments"}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-stone-100 text-stone-600"
                >
                  {Object.keys(aiCounts).length - 1}{" "}
                  {isEs ? "categorías" : "categories"}
                </Badge>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-700 opacity-0 transition-opacity group-hover:opacity-100">
                {isEs ? "Explorar" : "Explore"}{" "}
                <ArrowRight className="size-3.5" />
              </span>
            </Link>

            {/* Workplace Guides */}
            <Link
              href="/guides"
              className="group rounded-2xl border-2 border-stone-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-xl bg-teal-100 p-3">
                  <GraduationCap className="size-6 text-teal-700" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 group-hover:text-teal-700">
                    {isEs ? "Guías Operativas" : "Operational Guides"}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {isEs
                      ? "Flujos de trabajo y facturación"
                      : "Workflows & billing"}
                  </p>
                </div>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed mb-4">
                {isEs
                  ? "9 guías paso a paso: ECM, co-visitas de enfermería, integración BH, ingresos 101, CalAIM, y más."
                  : "9 step-by-step guides: ECM workflows, RN co-visits, BH integration, revenue 101, CalAIM, and more."}
              </p>
              <div className="flex items-center gap-3 text-xs">
                <Badge variant="secondary" className="bg-teal-50 text-teal-700">
                  9 {isEs ? "guías" : "guides"}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-stone-100 text-stone-600"
                >
                  {isEs ? "Fuentes primarias" : "Primary sources"}
                </Badge>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-700 opacity-0 transition-opacity group-hover:opacity-100">
                {isEs ? "Explorar" : "Explore"}{" "}
                <ArrowRight className="size-3.5" />
              </span>
            </Link>
          </div>

          {/* ── Row 2: Execution frameworks + knowledge base ── */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Target className="size-5 text-amber-600" />
              <h3 className="font-bold text-stone-900">
                {isEs ? "Marcos de Ejecución y Base de Conocimiento" : "Execution Frameworks & Knowledge Base"}
              </h3>
            </div>
            <p className="text-sm text-stone-500 mb-6 max-w-2xl">
              {isEs
                ? "Marcos de gestión probados y conocimiento económico fundamental — herramientas que los ejecutivos pueden compartir con todo su equipo."
                : "Proven management frameworks and foundational economic knowledge — tools executives can share with their entire team."}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: isEs ? "Economía de Salud" : "Healthcare Economics",
                  desc: isEs
                    ? "PPS, 340B, FMAP, CalAIM, HCC — cada concepto explicado a 3 niveles: nuevo empleado → operacional → ejecutivo."
                    : "PPS, 340B, FMAP, CalAIM, HCC — every concept at 3 levels: new hire → operational → executive.",
                  href: "/strategy/economics" as const,
                  color: "border-rose-200 bg-rose-50",
                  textColor: "text-rose-800",
                },
                {
                  name: isEs ? "12 Marcos de Ejecución" : "12 Execution Frameworks",
                  desc: isEs
                    ? "Kotter, ADKAR, Cynefin, DMAIC, PDSA — gestión del cambio, toma de decisiones y excelencia operacional."
                    : "Kotter, ADKAR, Cynefin, DMAIC, PDSA — change management, decision-making, and operational excellence.",
                  href: "/strategy/frameworks" as const,
                  color: "border-amber-200 bg-amber-50",
                  textColor: "text-amber-800",
                },
                {
                  name: isEs ? "OKRs para Crisis" : "OKRs for Crisis",
                  desc: isEs
                    ? "12 plantillas de objetivos y resultados clave — ingresos, personal, acceso, operaciones, inter-departamental."
                    : "12 objective & key result templates — revenue, workforce, access, ops, cross-department.",
                  href: "/strategy/okrs" as const,
                  color: "border-teal-200 bg-teal-50",
                  textColor: "text-teal-800",
                },
                {
                  name: isEs ? "Rumelt — Buena Estrategia" : "Rumelt — Good Strategy",
                  desc: isEs
                    ? "Diagnosticar → Política Guía → Acciones Coherentes. El marco detrás de nuestros estudios de caso."
                    : "Diagnose → Guiding Policy → Coherent Actions. The framework behind our case studies.",
                  href: "/strategy/guides" as const,
                  color: "border-stone-200 bg-stone-50",
                  textColor: "text-stone-800",
                },
                {
                  name: isEs ? "STARS (Watkins)" : "STARS Situational Model",
                  desc: isEs
                    ? "Arranque, Reestructuración, Crecimiento, Realineación, Éxito. Identifica tu situación antes de actuar."
                    : "Startup, Turnaround, Growth, Realignment, Sustain. Identify your situation before acting.",
                  href: "/strategy/frameworks" as const,
                  color: "border-purple-200 bg-purple-50",
                  textColor: "text-purple-800",
                },
                {
                  name: isEs ? "Evaluación de Preparación" : "Readiness Assessments",
                  desc: isEs
                    ? "Evaluación de cambio organizacional + preparación tecnológica. Evalúe antes de lanzar."
                    : "Organizational change readiness + tech stack assessment. Evaluate before you launch.",
                  href: "/strategy/frameworks" as const,
                  color: "border-blue-200 bg-blue-50",
                  textColor: "text-blue-800",
                },
              ].map((fw) => (
                <Link
                  key={fw.name}
                  href={fw.href}
                  className={`group rounded-xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md ${fw.color}`}
                >
                  <h4 className={`text-sm font-bold ${fw.textColor}`}>
                    {fw.name}
                  </h4>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                    {fw.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* ── Row 3: Career tools compact grid ── */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Briefcase className="size-5 text-stone-600" />
                <h3 className="font-bold text-stone-900">
                  {isEs ? "Herramientas de Carrera" : "Career Tools"}
                </h3>
              </div>
              <span className="text-xs text-stone-400">
                {isEs ? "Gratuitas para candidatos" : "Free for candidates"}
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Briefcase,
                  href: "/jobs" as const,
                  label: isEs ? "Empleos" : "Browse Jobs",
                  meta: `${overview.totalJobs}+`,
                },
                {
                  icon: FileText,
                  href: "/resume-builder" as const,
                  label: isEs ? "Constructor de CV" : "Resume Builder",
                  meta: isEs ? "Gratis" : "Free",
                },
                {
                  icon: Brain,
                  href: "/career-insights" as const,
                  label: isEs ? "Evaluación" : "Career Assessment",
                  meta: isEs ? "5 dominios" : "5 domains",
                },
                {
                  icon: Map,
                  href: "/career-roadmap" as const,
                  label: isEs ? "Ruta Profesional" : "Career Roadmap",
                  meta: isEs ? "5 trayectorias" : "5 tracks",
                },
                {
                  icon: Award,
                  href: "/certifications" as const,
                  label: isEs ? "Certificaciones" : "Certifications",
                  meta: isEs ? "15 CA" : "15 CA certs",
                },
                {
                  icon: BookOpen,
                  href: "/resources" as const,
                  label: isEs ? "Recursos" : "Career Resources",
                  meta: isEs ? "18 programas" : "18 programs",
                },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-3 rounded-lg border border-stone-100 px-4 py-3 transition-all hover:border-teal-200 hover:bg-teal-50/50"
                >
                  <item.icon className="size-4 shrink-0 text-stone-400 group-hover:text-teal-600" />
                  <span className="text-sm font-medium text-stone-700 group-hover:text-teal-700 flex-1">
                    {item.label}
                  </span>
                  <span className="text-xs text-stone-400">{item.meta}</span>
                </Link>
              ))}
            </div>
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

      {/* ==================== BOTTOM CTA — NO EMAIL ==================== */}
      <section className="bg-gradient-to-r from-stone-800 via-stone-900 to-stone-800 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {isEs
              ? "Fortaleciendo la Fuerza Laboral de California"
              : "Strengthening California's Safety-Net Workforce"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-400">
            {isEs
              ? "Inteligencia estratégica y herramientas de ejecución para líderes de centros de salud comunitarios."
              : "Strategic intelligence and execution tools for community health center leaders."}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="w-full bg-teal-600 text-white shadow-lg hover:bg-teal-500 sm:w-auto"
              asChild
            >
              <Link href="/insights">
                {isEs ? "Dashboard de Inteligencia" : "Intelligence Dashboard"}{" "}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="w-full bg-amber-500 text-stone-900 shadow-lg hover:bg-amber-400 sm:w-auto"
              asChild
            >
              <Link href="/directory">
                {isEs
                  ? `Explorar ${overview.totalFQHCs} FQHCs`
                  : `Explore ${overview.totalFQHCs} FQHCs`}{" "}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
