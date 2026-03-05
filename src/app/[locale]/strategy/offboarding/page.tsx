// FQHC Workforce Transition Resources — Free Tools for Displaced Workers
"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  LifeBuoy,
  Map,
  MapPin,
  Shield,
  TrendingDown,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { californiaFQHCLayoffs, LAYOFFS_LAST_UPDATED } from "@/lib/california-fqhc-layoffs";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const totalWorkersAffected = californiaFQHCLayoffs.reduce(
  (sum, l) => sum + l.employeesAffected,
  0,
);
const totalOrgs = californiaFQHCLayoffs.length;
const fqhcLayoffs = californiaFQHCLayoffs.filter((l) => l.isFQHC);

interface FreeResource {
  title: { en: string; es: string };
  description: { en: string; es: string };
  href: string;
  icon: typeof LifeBuoy;
  color: string;
  bgColor: string;
}

const FREE_RESOURCES: FreeResource[] = [
  {
    title: { en: "Resume Builder", es: "Constructor de Currículum" },
    description: {
      en: "FQHC-specific resume builder with 8 role templates. Highlight the skills, certifications, and program experience that FQHC hiring managers look for.",
      es: "Constructor de CV específico para FQHCs con 8 plantillas por rol. Destaque las habilidades, certificaciones y experiencia que buscan los gerentes de contratación.",
    },
    href: "/resume-builder",
    icon: FileText,
    color: "text-teal-700",
    bgColor: "bg-teal-50",
  },
  {
    title: { en: "Career Assessment", es: "Evaluación de Carrera" },
    description: {
      en: "5-domain behavioral assessment with personalized insights, strengths analysis, and a 90-day transition plan tailored to your role and experience.",
      es: "Evaluación conductual de 5 dominios con perspectivas personalizadas, análisis de fortalezas y plan de transición de 90 días adaptado a su rol.",
    },
    href: "/career-insights",
    icon: CheckCircle2,
    color: "text-blue-700",
    bgColor: "bg-blue-50",
  },
  {
    title: { en: "Career Roadmap", es: "Hoja de Ruta Profesional" },
    description: {
      en: "5 career tracks with CA salary benchmarks (P25/P50/P75) across 9 regions. See where you are and where you can go — with the certifications to get there.",
      es: "5 trayectorias profesionales con benchmarks salariales de CA (P25/P50/P75) en 9 regiones. Vea dónde está y a dónde puede ir.",
    },
    href: "/career-roadmap",
    icon: Map,
    color: "text-purple-700",
    bgColor: "bg-purple-50",
  },
  {
    title: { en: "Certification Catalog", es: "Catálogo de Certificaciones" },
    description: {
      en: "20 CA-specific certifications with cost, duration, salary impact, and where to get trained. Find the credential that opens your next door.",
      es: "20 certificaciones específicas de CA con costo, duración, impacto salarial y dónde capacitarse. Encuentre la credencial que abre su próxima puerta.",
    },
    href: "/certifications",
    icon: GraduationCap,
    color: "text-amber-700",
    bgColor: "bg-amber-50",
  },
  {
    title: { en: "Job Listings", es: "Ofertas de Empleo" },
    description: {
      en: "Browse aggregated job openings from California FQHCs. Filter by role, region, department, and salary — with direct links to each FQHC's career page.",
      es: "Explore ofertas de empleo agregadas de FQHCs de California. Filtre por rol, región, departamento y salario — con enlaces directos a cada página de carreras.",
    },
    href: "/jobs",
    icon: Briefcase,
    color: "text-green-700",
    bgColor: "bg-green-50",
  },
  {
    title: { en: "Career Resources", es: "Recursos Profesionales" },
    description: {
      en: "18 free and low-cost programs: NHSC loan repayment, free training, professional development, union education, and state workforce programs.",
      es: "18 programas gratuitos y de bajo costo: reembolso de préstamos NHSC, capacitación gratuita, desarrollo profesional, educación sindical y programas estatales.",
    },
    href: "/resources",
    icon: BookOpen,
    color: "text-rose-700",
    bgColor: "bg-rose-50",
  },
  {
    title: { en: "FQHC Directory", es: "Directorio de FQHCs" },
    description: {
      en: "220 California FQHCs profiled with programs, EHR systems, salary ranges, Glassdoor ratings, and resilience scores. Research your next employer.",
      es: "220 FQHCs de California con programas, sistemas EHR, rangos salariales, calificaciones Glassdoor y puntajes de resiliencia.",
    },
    href: "/directory",
    icon: Building2,
    color: "text-indigo-700",
    bgColor: "bg-indigo-50",
  },
  {
    title: { en: "Salary Intelligence", es: "Inteligencia Salarial" },
    description: {
      en: "30 roles × 9 CA regions with P25/P50/P75 salary benchmarks. Know your market value before you negotiate.",
      es: "30 roles × 9 regiones de CA con benchmarks salariales P25/P50/P75. Conozca su valor de mercado antes de negociar.",
    },
    href: "/salary-data",
    icon: MapPin,
    color: "text-sky-700",
    bgColor: "bg-sky-50",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function TransitionResourcesPage() {
  const locale = useLocale();
  const isEs = locale === "es";

  return (
    <main className="min-h-screen bg-stone-50">
      {/* ============================================================ */}
      {/*  Hero                                                        */}
      {/* ============================================================ */}
      <section className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 size-72 rounded-full bg-teal-500 blur-3xl" />
          <div className="absolute bottom-10 left-10 size-56 rounded-full bg-amber-500 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Badge className="bg-teal-900/50 text-teal-300 border-teal-700 mb-4">
            <LifeBuoy className="mr-1.5 size-3.5" />
            {isEs ? "Todos los Recursos Gratuitos" : "All Resources Free"}
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {isEs
              ? "Recursos de Transición para Trabajadores de Salud"
              : "Transition Resources for Health Workers"}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-300 leading-relaxed">
            {isEs
              ? "Si ha sido afectado por reducciones de fuerza laboral, estas herramientas gratuitas lo ayudan a prepararse para su próximo rol en un FQHC — a su propio ritmo."
              : "If you\u2019ve been affected by workforce reductions, these free tools help you prepare for your next FQHC role — at your own pace."}
          </p>
          <p className="mt-4 text-sm text-stone-400">
            {isEs ? "Seguimiento actualizado:" : "Tracking updated:"}{" "}
            {LAYOFFS_LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Crisis Stats Bar                                            */}
      {/* ============================================================ */}
      <section className="bg-red-700 text-white py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-center">
            <div>
              <p className="text-2xl font-bold">{totalWorkersAffected.toLocaleString()}+</p>
              <p className="text-sm text-red-200">
                {isEs ? "Trabajadores Afectados" : "Workers Affected"}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold">{totalOrgs}</p>
              <p className="text-sm text-red-200">
                {isEs ? "Organizaciones" : "Organizations"}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold">{fqhcLayoffs.length}</p>
              <p className="text-sm text-red-200">
                {isEs ? "FQHCs con Reducciones" : "FQHCs With Reductions"}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold">220</p>
              <p className="text-sm text-red-200">
                {isEs ? "FQHCs en Nuestro Directorio" : "FQHCs In Our Directory"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  The Problem                                                 */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            {isEs
              ? "El Problema: Trabajadores de Salud Desplazados Sin Apoyo"
              : "The Problem: Displaced Health Workers Without Support"}
          </h2>
          <p className="mt-3 text-stone-600 max-w-2xl mx-auto">
            {isEs
              ? "Cuando los FQHCs reducen personal, trabajadores experimentados desaparecen de la red de seguridad. Sin intervención, el 40% nunca regresa al trabajo en salud comunitaria."
              : "When FQHCs downsize, experienced workers vanish from the safety net. Without intervention, 40% never return to community health work."}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <TrendingDown className="mx-auto size-8 text-red-600 mb-3" />
            <p className="text-3xl font-bold text-red-700">{totalWorkersAffected.toLocaleString()}+</p>
            <p className="text-sm font-medium text-red-800 mt-1">
              {isEs
                ? "Trabajadores de salud comunitaria desplazados en CA desde 2025"
                : "Community health workers displaced in CA since 2025"}
            </p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
            <AlertTriangle className="mx-auto size-8 text-amber-600 mb-3" />
            <p className="text-3xl font-bold text-amber-700">H.R. 1</p>
            <p className="text-sm font-medium text-amber-800 mt-1">
              {isEs
                ? "Los mayores recortes a Medicaid en la historia amenazan a cada FQHC"
                : "Largest Medicaid cuts in history threaten every FQHC"}
            </p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-6 text-center">
            <Clock className="mx-auto size-8 text-stone-500 mb-3" />
            <p className="text-3xl font-bold text-stone-700">6–12</p>
            <p className="text-sm font-medium text-stone-600 mt-1">
              {isEs
                ? "Meses promedio para que un CHW desplazado encuentre un nuevo rol en FQHC"
                : "Average months for a displaced CHW to find a new FQHC role"}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Free Tools & Resources                                      */}
      {/* ============================================================ */}
      <section className="bg-white border-y border-stone-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge className="bg-green-100 text-green-800 border-green-300 mb-3">
              {isEs ? "100% Gratuito" : "100% Free"}
            </Badge>
            <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
              {isEs
                ? "Herramientas de Carrera Gratuitas para Trabajadores Desplazados"
                : "Free Career Tools for Displaced Workers"}
            </h2>
            <p className="mt-3 text-stone-600 max-w-2xl mx-auto">
              {isEs
                ? "Todo lo que necesita para prepararse para su próximo rol en un FQHC — sin costo, sin cuenta requerida, sin ataduras."
                : "Everything you need to prepare for your next FQHC role — no cost, no account required, no strings attached."}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FREE_RESOURCES.map((resource) => {
              const Icon = resource.icon;
              return (
                <Link
                  key={resource.href}
                  href={resource.href as "/resume-builder" | "/career-insights" | "/career-roadmap" | "/certifications" | "/jobs" | "/resources" | "/directory" | "/salary-data"}
                  className="group rounded-2xl border border-stone-200 bg-white p-5 hover:border-teal-300 hover:shadow-md transition-all"
                >
                  <div className={`inline-flex rounded-xl p-2.5 ${resource.bgColor} mb-3`}>
                    <Icon className={`size-5 ${resource.color}`} />
                  </div>
                  <h3 className="text-base font-bold text-stone-900 mb-2 group-hover:text-teal-700 transition-colors">
                    {t(resource.title, locale)}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {t(resource.description, locale)}
                  </p>
                  <span className="mt-3 inline-flex items-center text-sm font-medium text-teal-700 group-hover:text-teal-900">
                    {isEs ? "Explorar" : "Explore"}
                    <ArrowRight className="ml-1 size-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Recent Layoffs Preview                                      */}
      {/* ============================================================ */}
      <section className="bg-stone-100 border-y border-stone-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
                {isEs
                  ? "Reducciones Recientes en California"
                  : "Recent California Reductions"}
              </h2>
              <p className="text-sm text-stone-500 mt-1">
                {isEs
                  ? `${totalOrgs} organizaciones rastreadas`
                  : `${totalOrgs} organizations tracked`}
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/layoffs">
                {isEs ? "Ver seguimiento completo" : "View full tracker"}
                <ArrowRight className="ml-1.5 size-3.5" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {californiaFQHCLayoffs.slice(0, 6).map((layoff) => (
              <div
                key={layoff.id}
                className="rounded-xl border border-stone-200 bg-white p-4"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-bold text-stone-900 line-clamp-1">
                    {layoff.organization}
                  </h3>
                  <Badge
                    className={`shrink-0 text-xs ${
                      layoff.isFQHC
                        ? "bg-red-100 text-red-700 border-red-200"
                        : "bg-stone-100 text-stone-600 border-stone-200"
                    }`}
                  >
                    {layoff.isFQHC ? "FQHC" : isEs ? "Sistema de Salud" : "Health System"}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-500">
                  <span className="flex items-center gap-1">
                    <Users className="size-3" />
                    {layoff.employeesAffected.toLocaleString()} {isEs ? "afectados" : "affected"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building2 className="size-3" />
                    {layoff.city}, {layoff.county}
                  </span>
                </div>
                <p className="text-xs text-stone-400 mt-2 line-clamp-2">
                  {layoff.reason.slice(0, 120)}…
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Why These Tools Help                                        */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            {isEs
              ? "Por Qué Estos Recursos Marcan la Diferencia"
              : "Why These Resources Make a Difference"}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Shield,
              title: { en: "Built for FQHCs", es: "Diseñado para FQHCs" },
              desc: {
                en: "Every tool is designed specifically for community health center professionals — covering the roles, programs, EHR systems, and certifications that matter in this sector.",
                es: "Cada herramienta está diseñada específicamente para profesionales de centros de salud comunitarios — cubriendo los roles, programas, sistemas EHR y certificaciones del sector.",
              },
            },
            {
              icon: Briefcase,
              title: { en: "Always Free for Workers", es: "Siempre Gratis para Trabajadores" },
              desc: {
                en: "No fees, no accounts, no paywalls. These tools exist to help community health professionals navigate career transitions with dignity.",
                es: "Sin tarifas, sin cuentas, sin muros de pago. Estas herramientas existen para ayudar a los profesionales de salud comunitaria a navegar transiciones con dignidad.",
              },
            },
            {
              icon: LifeBuoy,
              title: { en: "Data You Can Trust", es: "Datos en los que Puede Confiar" },
              desc: {
                en: "220 FQHCs profiled with real salary data, program details, EHR systems, and Glassdoor ratings — so you can research employers before applying.",
                es: "220 FQHCs perfilados con datos salariales reales, detalles de programas, sistemas EHR y calificaciones Glassdoor — para investigar empleadores antes de aplicar.",
              },
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={t(item.title, locale)} className="rounded-2xl border border-stone-200 bg-white p-6">
                <Icon className="size-6 text-teal-700 mb-3" />
                <h3 className="text-base font-bold text-stone-900 mb-2">
                  {t(item.title, locale)}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {t(item.desc, locale)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Related Resources                                           */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold sm:text-3xl">
              {isEs ? "Explore Más" : "Explore More"}
            </h2>
            <p className="mt-3 text-stone-300 max-w-xl mx-auto">
              {isEs
                ? "Inteligencia y herramientas estratégicas adicionales."
                : "Additional intelligence and strategic tools."}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-stone-400">
            <Link href="/layoffs" className="hover:text-white transition-colors">
              {isEs ? "Seguimiento de Despidos" : "Layoff Tracker"} →
            </Link>
            <Link href="/funding-impact" className="hover:text-white transition-colors">
              {isEs ? "Impacto de H.R. 1" : "H.R. 1 Impact"} →
            </Link>
            <Link href="/strategy/guides" className="hover:text-white transition-colors">
              {isEs ? "Guías Ejecutivas" : "Executive Guides"} →
            </Link>
            <Link href="/directory" className="hover:text-white transition-colors">
              {isEs ? "Directorio de FQHCs" : "FQHC Directory"} →
            </Link>
            <Link href="/strategy/workforce-resilience" className="hover:text-white transition-colors">
              {isEs ? "Resiliencia de Fuerza Laboral" : "Workforce Resilience"} →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
