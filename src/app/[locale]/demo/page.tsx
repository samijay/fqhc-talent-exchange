"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Heart,
  Building2,
  Briefcase,
  FileText,
  Brain,
  Zap,
  BarChart3,
  Users,
  ArrowRight,
  Search,
  MapPin,
  Globe,
  Target,
  Handshake,
  Sprout,
  Compass,
  CheckCircle2,
  Clock,
  Star,
  Shield,
  DollarSign,
} from "lucide-react";
import { BookingCTA } from "@/components/booking/BookingCTA";
import {
  getMarketOverview,
  getRoleDemand,
  getFundingCliffs,
} from "@/lib/market-intelligence";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const overview = getMarketOverview();
const roles = getRoleDemand();
const cliffs = getFundingCliffs().filter((c) => !c.isPast).slice(0, 3);
const hotRoles = roles.filter((r) => r.demandSignal === "hot");

/* ------------------------------------------------------------------ */
/*  Bilingual strings                                                  */
/* ------------------------------------------------------------------ */
function t(obj: { en: string; es: string }, locale: string): string {
  return locale === "es" ? obj.es : obj.en;
}

/* ------------------------------------------------------------------ */
/*  Domain data for assessment mockup                                  */
/* ------------------------------------------------------------------ */
const DOMAINS = [
  { id: "mission", icon: Target, color: "bg-teal-500", label: { en: "Mission & Motivation", es: "Mision y Motivacion" }, pct: 85 },
  { id: "people", icon: Handshake, color: "bg-blue-500", label: { en: "People & Communication", es: "Personas y Comunicacion" }, pct: 72 },
  { id: "execution", icon: Zap, color: "bg-amber-500", label: { en: "Execution & Adaptability", es: "Ejecucion y Adaptabilidad" }, pct: 90 },
  { id: "growth", icon: Sprout, color: "bg-green-500", label: { en: "Growth Mindset", es: "Mentalidad de Crecimiento" }, pct: 68 },
  { id: "transition", icon: Compass, color: "bg-purple-500", label: { en: "Transition Readiness", es: "Preparacion para la Transicion" }, pct: 78 },
];

/* ------------------------------------------------------------------ */
/*  Section wrapper                                                    */
/* ------------------------------------------------------------------ */
function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-4 py-16 sm:px-6 md:py-20 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function DemoPage() {
  const locale = useLocale();

  return (
    <main className="min-h-screen bg-white">
      {/* ============================================================ */}
      {/*  1. Hero                                                      */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700 px-4 py-20 text-white sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-6 inline-flex items-center gap-3">
            <Heart className="size-10 fill-white text-white" />
            <span className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              FQHC <span className="text-teal-200">Talent</span>
            </span>
          </div>

          <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            {t({ en: "See the Platform in Action", es: "Ve la Plataforma en Accion" }, locale)}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-teal-100">
            {t({
              en: "The only talent platform built exclusively for California's community health centers. Everything below is live — not a mockup.",
              es: "La unica plataforma de talento construida exclusivamente para los centros de salud comunitarios de California. Todo a continuacion esta activo — no es una maqueta.",
            }, locale)}
          </p>

          {/* Stats bar */}
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { value: `${overview.totalFQHCs}`, label: t({ en: "FQHCs Tracked", es: "FQHCs Rastreados" }, locale) },
              { value: `${overview.totalJobs}+`, label: t({ en: "Job Listings", es: "Ofertas de Empleo" }, locale) },
              { value: `${overview.totalRegions}`, label: t({ en: "CA Regions", es: "Regiones de CA" }, locale) },
              { value: "EN/ES", label: t({ en: "Fully Bilingual", es: "Completamente Bilingue" }, locale) },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur">
                <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                <p className="mt-0.5 text-xs font-medium text-teal-200">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/resume-builder"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-teal-800 shadow-lg transition hover:bg-teal-50"
            >
              {t({ en: "Build Your Resume", es: "Construye Tu Curriculum" }, locale)}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/hire"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {t({ en: "Hire Pre-Assessed Talent", es: "Contrata Talento Pre-Evaluado" }, locale)}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. FQHC Directory                                            */}
      {/* ============================================================ */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">
              <Building2 className="size-3.5" />
              {t({ en: "FQHC Directory", es: "Directorio de FQHCs" }, locale)}
            </div>
            <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
              {t({ en: "Every California FQHC, one searchable directory", es: "Todos los FQHCs de California, un directorio con busqueda" }, locale)}
            </h2>
            <p className="mt-3 text-stone-600">
              {t({
                en: `${overview.totalFQHCs} FQHCs with programs, EHR systems, Glassdoor ratings, union info, salary ranges, and direct links to careers pages. Search by region, filter by program — find the right fit.`,
                es: `${overview.totalFQHCs} FQHCs con programas, sistemas EHR, calificaciones de Glassdoor, informacion sindical, rangos salariales y enlaces directos a paginas de carreras. Busca por region, filtra por programa.`,
              }, locale)}
            </p>
            <Link
              href="/directory"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800"
            >
              {t({ en: "Explore the Directory", es: "Explorar el Directorio" }, locale)}
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Mockup card */}
          <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-lg">
            <div className="mb-3 flex items-center gap-2 text-xs text-stone-400">
              <Search className="size-3.5" /> {t({ en: "Sample directory listing", es: "Ejemplo de listado del directorio" }, locale)}
            </div>
            <div className="space-y-3">
              {[
                { name: "Northeast Valley Health Corp", loc: "San Fernando, CA", staff: 850, ehr: "OCHIN Epic", programs: ["ECM", "CalAIM", "BH-ASO"] },
                { name: "Asian Health Services", loc: "Oakland, CA", staff: 400, ehr: "Epic", programs: ["ECM", "CCM", "340B"] },
              ].map((fqhc) => (
                <div key={fqhc.name} className="rounded-lg border border-stone-100 bg-stone-50 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-stone-900">{fqhc.name}</p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-stone-500">
                        <MapPin className="size-3" /> {fqhc.loc} &middot; {fqhc.staff} {t({ en: "staff", es: "personal" }, locale)}
                      </p>
                    </div>
                    <span className="rounded bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-700">{fqhc.ehr}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {fqhc.programs.map((p) => (
                      <span key={p} className="rounded-full bg-stone-200 px-2 py-0.5 text-[10px] font-medium text-stone-600">{p}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  3. Job Search                                                */}
      {/* ============================================================ */}
      <Section className="bg-stone-50">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Mockup card — left on desktop */}
          <div className="order-2 rounded-xl border border-stone-200 bg-white p-5 shadow-lg lg:order-1">
            <div className="mb-3 flex items-center gap-2 text-xs text-stone-400">
              <Briefcase className="size-3.5" /> {t({ en: "Sample job listings", es: "Ejemplo de ofertas de empleo" }, locale)}
            </div>
            <div className="space-y-3">
              {[
                { title: "Community Health Worker", fqhc: "Clinica Romero", salary: "$44K–$55K", loc: "Los Angeles", lang: "Spanish" },
                { title: "Care Coordinator (ECM)", fqhc: "Lifelong Medical", salary: "$52K–$68K", loc: "Bay Area", lang: "Bilingual" },
                { title: "Registered Nurse", fqhc: "Ravenswood Family", salary: "$95K–$125K", loc: "Bay Area", lang: null },
              ].map((job) => (
                <div key={job.title + job.fqhc} className="flex items-center justify-between rounded-lg border border-stone-100 bg-stone-50 p-3">
                  <div>
                    <p className="text-sm font-semibold text-stone-900">{job.title}</p>
                    <p className="text-xs text-stone-500">{job.fqhc} &middot; {job.loc}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {job.lang && (
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                        <Globe className="mr-0.5 inline size-2.5" />{job.lang}
                      </span>
                    )}
                    <span className="text-xs font-semibold text-teal-700">{job.salary}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">
              <Briefcase className="size-3.5" />
              {t({ en: "Job Search", es: "Busqueda de Empleo" }, locale)}
            </div>
            <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
              {t({ en: `${overview.totalJobs}+ FQHC jobs, all in one place`, es: `${overview.totalJobs}+ empleos en FQHCs, todo en un solo lugar` }, locale)}
            </h2>
            <p className="mt-3 text-stone-600">
              {t({
                en: `Filter by role, region, salary, and language. ${hotRoles.length} roles are in high demand right now. Every listing links directly to the FQHC's careers page.`,
                es: `Filtra por puesto, region, salario e idioma. ${hotRoles.length} puestos tienen alta demanda ahora mismo. Cada listado enlaza directamente a la pagina de carreras del FQHC.`,
              }, locale)}
            </p>
            <Link
              href="/jobs"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800"
            >
              {t({ en: "Browse All Jobs", es: "Ver Todos los Empleos" }, locale)}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  4. Resume Builder                                            */}
      {/* ============================================================ */}
      <Section>
        <div className="text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">
            <FileText className="size-3.5" />
            {t({ en: "Resume Builder", es: "Constructor de Curriculum" }, locale)}
          </div>
          <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            {t({ en: "FQHC-optimized resumes in minutes", es: "Curriculos optimizados para FQHCs en minutos" }, locale)}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-stone-600">
            {t({
              en: "8 role-specific templates with pre-written bullet points for community health. Built-in career assessment. Bilingual PDF export.",
              es: "8 plantillas especificas por rol con puntos clave pre-escritos para salud comunitaria. Evaluacion profesional integrada. Exportacion a PDF bilingue.",
            }, locale)}
          </p>
        </div>

        {/* 4-step flow */}
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { step: "1", icon: Users, label: { en: "Select Role", es: "Selecciona Rol" }, desc: { en: "Choose from 8 FQHC roles", es: "Elige entre 8 roles de FQHC" } },
            { step: "2", icon: CheckCircle2, label: { en: "Add Experience", es: "Agrega Experiencia" }, desc: { en: "Role-specific experience questions", es: "Preguntas de experiencia por rol" } },
            { step: "3", icon: Brain, label: { en: "Career Assessment", es: "Evaluacion Profesional" }, desc: { en: "15-question behavioral assessment", es: "Evaluacion conductual de 15 preguntas" } },
            { step: "4", icon: FileText, label: { en: "Download PDF", es: "Descarga PDF" }, desc: { en: "Bilingual, FQHC-optimized", es: "Bilingue, optimizado para FQHCs" } },
          ].map((item) => (
            <div key={item.step} className="rounded-xl border border-stone-200 bg-white p-5 text-center">
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white">
                {item.step}
              </span>
              <item.icon className="mx-auto mt-3 size-6 text-teal-600" />
              <p className="mt-2 text-sm font-semibold text-stone-900">{t(item.label, locale)}</p>
              <p className="mt-1 text-xs text-stone-500">{t(item.desc, locale)}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/resume-builder"
            className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800"
          >
            {t({ en: "Start Building", es: "Empezar a Construir" }, locale)}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  5. Career Assessment                                         */}
      {/* ============================================================ */}
      <Section className="bg-stone-50">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
              <Brain className="size-3.5" />
              {t({ en: "Career Assessment", es: "Evaluacion Profesional" }, locale)}
            </div>
            <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
              {t({ en: "We assess behavioral fit, not keywords", es: "Evaluamos compatibilidad conductual, no palabras clave" }, locale)}
            </h2>
            <p className="mt-3 text-stone-600">
              {t({
                en: "15 scenario-based questions across 5 behavioral domains — including Transition Readiness, which no other healthcare staffing platform measures. Role-specific insights, employer intelligence, and salary benchmarks included.",
                es: "15 preguntas basadas en escenarios en 5 dominios conductuales — incluyendo Preparacion para la Transicion, que ninguna otra plataforma de personal de salud mide. Incluye perspectivas por rol, inteligencia de empleadores y referencias salariales.",
              }, locale)}
            </p>
            <Link
              href="/resume-builder"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800"
            >
              {t({ en: "Take the Assessment", es: "Toma la Evaluacion" }, locale)}
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Mockup domain scores */}
          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-stone-700">
                {t({ en: "Sample Assessment Results", es: "Ejemplo de Resultados de Evaluacion" }, locale)}
              </p>
              <span className="rounded-full bg-teal-100 px-3 py-1 text-lg font-bold text-teal-700">79%</span>
            </div>
            <div className="space-y-3">
              {DOMAINS.map((d) => (
                <div key={d.id}>
                  <div className="mb-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <d.icon className="size-4 text-stone-500" />
                      <span className="text-xs font-medium text-stone-700">{t(d.label, locale)}</span>
                    </div>
                    <span className="text-xs font-semibold text-stone-600">{d.pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                    <div className={`h-full rounded-full ${d.color}`} style={{ width: `${d.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            {/* Transition callout */}
            <div className="mt-4 rounded-lg border border-purple-200 bg-purple-50 p-3">
              <div className="flex items-center gap-2">
                <Compass className="size-4 text-purple-600" />
                <span className="text-xs font-bold text-purple-700">
                  {t({ en: "Transition Readiness", es: "Preparacion para la Transicion" }, locale)}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-purple-600">
                {t({
                  en: "Measures ability to diagnose new situations, build manager alignment, and self-organize onboarding. The #1 predictor of first-year FQHC success.",
                  es: "Mide la capacidad de diagnosticar nuevas situaciones, construir alineamiento con el gerente y auto-organizar la incorporacion. El predictor #1 del exito en el primer ano en FQHCs.",
                }, locale)}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  6. Fast-Track Pipeline                                       */}
      {/* ============================================================ */}
      <Section>
        <div className="text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
            <Zap className="size-3.5" />
            {t({ en: "Displaced Worker Fast-Track", es: "Via Rapida para Trabajadores Desplazados" }, locale)}
          </div>
          <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            {t({ en: "From layoff to new role in 21 days", es: "De despido a nuevo puesto en 21 dias" }, locale)}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-stone-600">
            {t({
              en: `${overview.totalLayoffWorkers.toLocaleString()}+ FQHC workers have been displaced across California. We fast-track them through our pipeline — they're already trained in community health.`,
              es: `${overview.totalLayoffWorkers.toLocaleString()}+ trabajadores de FQHCs han sido desplazados en California. Los aceleramos a traves de nuestro proceso — ya estan capacitados en salud comunitaria.`,
            }, locale)}
          </p>
        </div>

        {/* Timeline */}
        <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-4 sm:flex-row">
          {[
            { step: "1", time: { en: "Day 0", es: "Dia 0" }, title: { en: "Intake", es: "Registro" }, desc: { en: "Fast-track form captures role, EHR, programs, language, and region.", es: "El formulario rapido captura rol, EHR, programas, idioma y region." } },
            { step: "2", time: { en: "Day 1", es: "Dia 1" }, title: { en: "Assessment + Resume", es: "Evaluacion + Curriculum" }, desc: { en: "Career assessment and FQHC-optimized resume generated automatically.", es: "Evaluacion profesional y curriculum optimizado para FQHCs generado automaticamente." } },
            { step: "3", time: { en: "Day 2–5", es: "Dia 2–5" }, title: { en: "First Intros", es: "Primeras Presentaciones" }, desc: { en: "Matched to hiring FQHCs in their region. Warm introductions.", es: "Emparejado con FQHCs contratando en su region. Presentaciones calidas." } },
            { step: "4", time: { en: "Day 5–21", es: "Dia 5–21" }, title: { en: "Placement", es: "Colocacion" }, desc: { en: "Interview support, salary guidance. Average 21-day placement.", es: "Apoyo en entrevistas, guia salarial. Colocacion promedio en 21 dias." } },
          ].map((item) => (
            <div key={item.step} className="flex-1 rounded-xl border border-stone-200 bg-white p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">
                  {item.step}
                </span>
                <span className="text-xs font-medium text-amber-600">{t(item.time, locale)}</span>
              </div>
              <h4 className="font-bold text-stone-900">{t(item.title, locale)}</h4>
              <p className="mt-1 text-sm text-stone-600">{t(item.desc, locale)}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/fast-track"
            className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600"
          >
            {t({ en: "Get Fast-Tracked", es: "Accede a la Via Rapida" }, locale)}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  7. Market Intelligence                                       */}
      {/* ============================================================ */}
      <Section className="bg-stone-50">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Mini dashboard mockup */}
          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-lg">
            <p className="mb-4 text-sm font-semibold text-stone-700">
              {t({ en: "Market Intelligence Dashboard", es: "Panel de Inteligencia de Mercado" }, locale)}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-red-50 p-3 text-center">
                <p className="text-2xl font-bold text-red-700">{cliffs.length}</p>
                <p className="text-[10px] font-medium text-red-600">
                  {t({ en: "Funding Cliffs", es: "Precipicios de Fondos" }, locale)}
                </p>
              </div>
              <div className="rounded-lg bg-teal-50 p-3 text-center">
                <p className="text-2xl font-bold text-teal-700">{hotRoles.length}</p>
                <p className="text-[10px] font-medium text-teal-600">
                  {t({ en: "Hot Demand Roles", es: "Roles de Alta Demanda" }, locale)}
                </p>
              </div>
              <div className="rounded-lg bg-amber-50 p-3 text-center">
                <p className="text-2xl font-bold text-amber-700">{overview.totalRegions}</p>
                <p className="text-[10px] font-medium text-amber-600">
                  {t({ en: "Regional Snapshots", es: "Panoramas Regionales" }, locale)}
                </p>
              </div>
              <div className="rounded-lg bg-blue-50 p-3 text-center">
                <p className="text-2xl font-bold text-blue-700">30</p>
                <p className="text-[10px] font-medium text-blue-600">
                  {t({ en: "Salary Benchmarks", es: "Referencias Salariales" }, locale)}
                </p>
              </div>
            </div>

            {/* Funding cliff preview */}
            {cliffs.length > 0 && (
              <div className="mt-4 space-y-2">
                {cliffs.slice(0, 2).map((cliff) => (
                  <div key={cliff.id} className="flex items-center justify-between rounded-lg bg-stone-50 p-2">
                    <p className="text-xs font-medium text-stone-700">{t(cliff.title, locale)}</p>
                    <span className="rounded bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700">
                      {cliff.daysUntil}d
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">
              <BarChart3 className="size-3.5" />
              {t({ en: "Market Intelligence", es: "Inteligencia de Mercado" }, locale)}
            </div>
            <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
              {t({ en: "Data no one else has", es: "Datos que nadie mas tiene" }, locale)}
            </h2>
            <p className="mt-3 text-stone-600">
              {t({
                en: `We track ${overview.totalFQHCs} FQHCs, ${overview.totalJobs}+ listings, layoff events, funding vulnerability scores, salary benchmarks across 30 roles, and policy impact timelines. Strategic foresight for both candidates and employers.`,
                es: `Rastreamos ${overview.totalFQHCs} FQHCs, ${overview.totalJobs}+ listados, eventos de despido, puntuaciones de vulnerabilidad financiera, referencias salariales de 30 roles y cronologias de impacto politico. Prevision estrategica para candidatos y empleadores.`,
              }, locale)}
            </p>
            <Link
              href="/insights"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800"
            >
              {t({ en: "Explore Market Intelligence", es: "Explorar Inteligencia de Mercado" }, locale)}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  8. For Employers                                             */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950 px-4 py-16 text-white sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-400">
                <Shield className="size-3.5" />
                {t({ en: "For Employers", es: "Para Empleadores" }, locale)}
              </div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                {t({ en: "Pre-assessed candidates delivered to you", es: "Candidatos pre-evaluados entregados a ti" }, locale)}
              </h2>
              <p className="mt-3 text-stone-300">
                {t({
                  en: "Talent Drop: Receive 3-5 pre-assessed, role-matched candidates per open position. Each comes with behavioral scores, salary expectations, language verification, and an FQHC-optimized resume.",
                  es: "Talent Drop: Recibe 3-5 candidatos pre-evaluados y emparejados por rol por cada posicion abierta. Cada uno viene con puntuaciones conductuales, expectativas salariales, verificacion de idioma y un curriculum optimizado para FQHCs.",
                }, locale)}
              </p>

              <div className="mt-6 space-y-2">
                {[
                  { en: "5-domain behavioral assessment (not generic personality tests)", es: "Evaluacion conductual de 5 dominios (no pruebas de personalidad genericas)" },
                  { en: "Role-specific insights: what this candidate excels at", es: "Perspectivas por rol: en que sobresale este candidato" },
                  { en: "Average 21-day placement, 5-day first intro", es: "Colocacion promedio en 21 dias, primera presentacion en 5 dias" },
                  { en: "Free for candidates — always", es: "Gratis para candidatos — siempre" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Star className="mt-0.5 size-4 shrink-0 text-amber-400" />
                    <p className="text-sm text-stone-300">{t(item, locale)}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/hire"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600"
              >
                {t({ en: "Learn More", es: "Saber Mas" }, locale)}
                <ArrowRight className="size-4" />
              </Link>
            </div>

            {/* Talent Drop visual */}
            <div className="rounded-xl border border-stone-700 bg-stone-800/50 p-6">
              <p className="mb-4 text-center text-sm font-semibold text-stone-400">
                {t({ en: "How Talent Drop Works", es: "Como Funciona Talent Drop" }, locale)}
              </p>
              <div className="space-y-4">
                {[
                  { icon: Building2, label: { en: "FQHC posts open role", es: "FQHC publica puesto" } },
                  { icon: Brain, label: { en: "We match from assessed pipeline", es: "Emparejamos del pipeline evaluado" } },
                  { icon: Users, label: { en: "3-5 candidates delivered with scores", es: "3-5 candidatos entregados con puntuaciones" } },
                  { icon: DollarSign, label: { en: "Pay only when you hire", es: "Paga solo cuando contratas" } },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-stone-700">
                      <step.icon className="size-5 text-amber-400" />
                    </div>
                    <div className="flex-1 border-b border-stone-700 pb-3">
                      <p className="text-sm font-medium text-stone-200">{t(step.label, locale)}</p>
                    </div>
                    {i < 3 && <ArrowRight className="size-4 text-stone-600" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  9. Final CTA                                                 */}
      {/* ============================================================ */}
      <Section>
        <div className="text-center">
          <Heart className="mx-auto size-10 fill-teal-700 text-teal-700" />
          <h2 className="mt-4 text-2xl font-bold text-stone-900 sm:text-3xl">
            {t({ en: "Ready to get started?", es: "Listo/a para comenzar?" }, locale)}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-stone-600">
            {t({
              en: "Whether you're a community health professional looking for your next role, or an FQHC looking for mission-driven talent — we're here to help.",
              es: "Ya sea que seas un profesional de salud comunitaria buscando tu proximo puesto, o un FQHC buscando talento comprometido con la mision — estamos aqui para ayudar.",
            }, locale)}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/resume-builder"
              className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800"
            >
              {t({ en: "Build Your Resume", es: "Construye Tu Curriculum" }, locale)}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/hire"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-stone-800 px-6 py-3 text-sm font-semibold text-stone-800 transition hover:bg-stone-50"
            >
              {t({ en: "Hire Pre-Assessed Talent", es: "Contrata Talento Pre-Evaluado" }, locale)}
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mx-auto mt-10 max-w-md">
            <BookingCTA variant="candidate" />
          </div>
        </div>
      </Section>
    </main>
  );
}
