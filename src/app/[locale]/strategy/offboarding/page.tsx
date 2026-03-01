// FQHC Workforce Transition Toolkit — Turn Layoffs Into Soft Landings
"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  AlertTriangle,
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  HeartHandshake,
  LifeBuoy,
  Shield,
  Sparkles,
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

interface ServiceTier {
  id: string;
  name: { en: string; es: string };
  subtitle: { en: string; es: string };
  price: { en: string; es: string };
  description: { en: string; es: string };
  features: { en: string; es: string }[];
  icon: typeof LifeBuoy;
  color: string;
  bgColor: string;
  borderColor: string;
  highlight: boolean;
}

const SERVICE_TIERS: ServiceTier[] = [
  {
    id: "self-serve",
    name: { en: "Self-Serve Tools", es: "Herramientas Autoservicio" },
    subtitle: { en: "Free for displaced workers", es: "Gratis para trabajadores desplazados" },
    price: { en: "Free", es: "Gratis" },
    description: {
      en: "Give your displaced staff immediate access to career transition tools — at no cost to your FQHC.",
      es: "Dé a su personal desplazado acceso inmediato a herramientas de transición profesional — sin costo para su FQHC.",
    },
    features: [
      { en: "FQHC-specific resume builder (8 role templates)", es: "Constructor de CV específico para FQHCs (8 plantillas por rol)" },
      { en: "5-domain career assessment with role matching", es: "Evaluación de carrera de 5 dominios con coincidencia de roles" },
      { en: "Career roadmap with CA salary benchmarks", es: "Hoja de ruta profesional con benchmarks salariales de CA" },
      { en: "15 CA certification guides with cost & ROI data", es: "15 guías de certificación de CA con datos de costo y ROI" },
      { en: "18 free career resources (NHSC, training programs)", es: "18 recursos profesionales gratuitos (NHSC, programas de capacitación)" },
      { en: "Access to 220-FQHC directory with job listings", es: "Acceso al directorio de 220 FQHCs con ofertas de empleo" },
    ],
    icon: LifeBuoy,
    color: "text-teal-700",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    highlight: false,
  },
  {
    id: "managed",
    name: { en: "Managed Transition", es: "Transición Gestionada" },
    subtitle: { en: "We handle the process", es: "Nosotros manejamos el proceso" },
    price: { en: "$500–$1,500 per event", es: "$500–$1,500 por evento" },
    description: {
      en: "Notify us of upcoming reductions and we intake, assess, and prepare your displaced workers for their next role — within 2 weeks.",
      es: "Notifíquenos sobre reducciones próximas y nosotros recibimos, evaluamos y preparamos a sus trabajadores desplazados para su próximo rol — en 2 semanas.",
    },
    features: [
      { en: "Priority intake within 48 hours of notification", es: "Recepción prioritaria dentro de 48 horas de la notificación" },
      { en: "Individual career assessment for each worker", es: "Evaluación profesional individual para cada trabajador" },
      { en: "Resume rewrite targeting FQHC hiring patterns", es: "Reescritura de CV enfocada en patrones de contratación FQHC" },
      { en: "Certification pathway guidance (CHW, CMA, etc.)", es: "Orientación de rutas de certificación (CHW, CMA, etc.)" },
      { en: "Warm introductions to hiring FQHCs in their region", es: "Presentaciones con FQHCs contratantes en su región" },
      { en: "30-day progress report for your HR team", es: "Informe de progreso de 30 días para su equipo de RH" },
    ],
    icon: HeartHandshake,
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-300",
    highlight: true,
  },
  {
    id: "placement",
    name: { en: "Placement Partnership", es: "Asociación de Colocación" },
    subtitle: { en: "Full-cycle staffing support", es: "Soporte de dotación de personal de ciclo completo" },
    price: { en: "$2,000–$5,000 per placement", es: "$2,000–$5,000 por colocación" },
    description: {
      en: "Dedicated sourcing, vetting, and placement for your organization — whether you're reducing or rebuilding your workforce.",
      es: "Búsqueda dedicada, verificación y colocación para su organización — ya sea que esté reduciendo o reconstruyendo su fuerza laboral.",
    },
    features: [
      { en: "Dedicated recruiter with FQHC expertise", es: "Reclutador dedicado con experiencia en FQHCs" },
      { en: "Cultural fit matching using our 5-domain assessment", es: "Coincidencia de ajuste cultural usando nuestra evaluación de 5 dominios" },
      { en: "Pre-screened candidates from our talent pool", es: "Candidatos preseleccionados de nuestra bolsa de talento" },
      { en: "90-day replacement guarantee", es: "Garantía de reemplazo de 90 días" },
      { en: "Quarterly workforce intelligence briefings", es: "Informes trimestrales de inteligencia de fuerza laboral" },
      { en: "Priority access to The Drop (exclusive talent releases)", es: "Acceso prioritario a The Drop (lanzamientos exclusivos de talento)" },
    ],
    icon: Sparkles,
    color: "text-purple-700",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    highlight: false,
  },
];

interface ProcessStep {
  step: number;
  title: { en: string; es: string };
  description: { en: string; es: string };
  timeline: { en: string; es: string };
  icon: typeof Clock;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: { en: "You notify us", es: "Usted nos notifica" },
    description: {
      en: "Share the scope — roles affected, timeline, and any special circumstances. We sign an NDA if needed.",
      es: "Comparta el alcance — roles afectados, cronograma y circunstancias especiales. Firmamos un NDA si es necesario.",
    },
    timeline: { en: "Day 1", es: "Día 1" },
    icon: Building2,
  },
  {
    step: 2,
    title: { en: "We intake your staff", es: "Recibimos a su personal" },
    description: {
      en: "Each displaced worker completes our career assessment and resume builder — remotely, on their schedule.",
      es: "Cada trabajador desplazado completa nuestra evaluación profesional y constructor de CV — de forma remota, a su ritmo.",
    },
    timeline: { en: "Days 2–5", es: "Días 2–5" },
    icon: Users,
  },
  {
    step: 3,
    title: { en: "We match & prepare", es: "Emparejamos y preparamos" },
    description: {
      en: "Assessment results drive role matching across 220 CA FQHCs. We rewrite resumes for target positions and prep candidates.",
      es: "Los resultados de la evaluación impulsan la coincidencia de roles en 220 FQHCs de CA. Reescribimos CVs para posiciones objetivo.",
    },
    timeline: { en: "Days 5–10", es: "Días 5–10" },
    icon: FileText,
  },
  {
    step: 4,
    title: { en: "Workers land new roles", es: "Trabajadores obtienen nuevos roles" },
    description: {
      en: "Warm introductions to hiring FQHCs. You get a progress report showing outcomes. Workers stay in the safety net.",
      es: "Presentaciones con FQHCs contratantes. Usted recibe un informe de progreso. Los trabajadores permanecen en la red de seguridad.",
    },
    timeline: { en: "Days 10–30", es: "Días 10–30" },
    icon: CheckCircle2,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function OffboardingPage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const [expandedTier, setExpandedTier] = useState<string | null>("managed");

  return (
    <main className="min-h-screen bg-stone-50">
      {/* ============================================================ */}
      {/*  Hero — Dark employer-facing theme                           */}
      {/* ============================================================ */}
      <section className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 size-72 rounded-full bg-amber-500 blur-3xl" />
          <div className="absolute bottom-10 left-10 size-56 rounded-full bg-red-500 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Badge className="bg-amber-900/50 text-amber-300 border-amber-700 mb-4">
            <Shield className="mr-1.5 size-3.5" />
            {isEs ? "Para Líderes de FQHCs" : "For FQHC Leaders"}
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {isEs
              ? "Convierta los Despidos en Transiciones"
              : "Turn Layoffs Into Transitions"}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-300 leading-relaxed">
            {isEs
              ? "Cuando tenga que reducir personal, no deje a sus trabajadores solos. Nuestro kit de herramientas ayuda a los FQHCs a manejar las reducciones de fuerza laboral con dignidad — y mantener a los profesionales en la red de seguridad."
              : "When you have to reduce staff, don\u2019t leave your workers stranded. Our toolkit helps FQHCs manage workforce reductions with dignity — and keeps professionals in the safety net."}
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
                {isEs ? "FQHCs en Nuestra Red" : "FQHCs In Our Network"}
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
      {/*  Service Tiers                                               */}
      {/* ============================================================ */}
      <section className="bg-white border-y border-stone-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
              {isEs ? "Tres Niveles de Apoyo" : "Three Tiers of Support"}
            </h2>
            <p className="mt-3 text-stone-600 max-w-2xl mx-auto">
              {isEs
                ? "Desde herramientas gratuitas de autoservicio hasta colocación dedicada — elija el nivel que se ajuste a su situación."
                : "From free self-serve tools to dedicated placement — choose the level that fits your situation."}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {SERVICE_TIERS.map((tier) => {
              const Icon = tier.icon;
              const isExpanded = expandedTier === tier.id;

              return (
                <div
                  key={tier.id}
                  className={`rounded-2xl border-2 p-6 transition-all ${
                    tier.highlight
                      ? "border-amber-400 ring-2 ring-amber-200 shadow-lg"
                      : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  {tier.highlight && (
                    <Badge className="bg-amber-100 text-amber-800 border-amber-300 mb-3">
                      {isEs ? "Más Popular" : "Most Popular"}
                    </Badge>
                  )}

                  <div className="flex items-center gap-3 mb-3">
                    <div className={`rounded-xl p-2.5 ${tier.bgColor} ${tier.borderColor} border`}>
                      <Icon className={`size-6 ${tier.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-stone-900">
                        {t(tier.name, locale)}
                      </h3>
                      <p className="text-xs text-stone-500">
                        {t(tier.subtitle, locale)}
                      </p>
                    </div>
                  </div>

                  <p className="text-2xl font-extrabold text-stone-900 mb-2">
                    {t(tier.price, locale)}
                  </p>

                  <p className="text-sm text-stone-600 mb-4 leading-relaxed">
                    {t(tier.description, locale)}
                  </p>

                  <button
                    onClick={() =>
                      setExpandedTier(isExpanded ? null : tier.id)
                    }
                    className="text-sm font-medium text-teal-700 hover:text-teal-900 mb-3"
                  >
                    {isExpanded
                      ? isEs ? "Ocultar detalles" : "Hide details"
                      : isEs ? "Ver todo incluido →" : "See what\u2019s included →"}
                  </button>

                  {isExpanded && (
                    <ul className="space-y-2 border-t border-stone-100 pt-3">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex gap-2 text-sm text-stone-700">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-600" />
                          {t(feature, locale)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  How It Works                                                */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            {isEs ? "Cómo Funciona" : "How It Works"}
          </h2>
          <p className="mt-3 text-stone-600 max-w-xl mx-auto">
            {isEs
              ? "Un proceso sencillo para que su equipo de RH pueda enfocarse en lo que importa."
              : "A straightforward process so your HR team can focus on what matters."}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative">
                {step.step < 4 && (
                  <div className="absolute top-8 left-full hidden lg:block w-full">
                    <ArrowRight className="size-5 text-stone-300 mx-auto" />
                  </div>
                )}
                <div className="rounded-2xl border border-stone-200 bg-white p-5 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white">
                      {step.step}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {t(step.timeline, locale)}
                    </Badge>
                  </div>
                  <Icon className="size-5 text-teal-600 mb-2" />
                  <h3 className="text-base font-bold text-stone-900 mb-1">
                    {t(step.title, locale)}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {t(step.description, locale)}
                  </p>
                </div>
              </div>
            );
          })}
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
      {/*  Why FQHCs Choose Us                                         */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            {isEs
              ? "Por Qué los FQHCs Trabajan Con Nosotros"
              : "Why FQHCs Work With Us"}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Briefcase,
              title: { en: "FQHC-Only Focus", es: "Enfoque Exclusivo en FQHCs" },
              desc: {
                en: "We only work with community health centers. Every tool, template, and assessment is built for the FQHC workforce.",
                es: "Solo trabajamos con centros de salud comunitarios. Cada herramienta y evaluación está diseñada para la fuerza laboral FQHC.",
              },
            },
            {
              icon: DollarSign,
              title: { en: "Candidates Never Pay", es: "Los Candidatos Nunca Pagan" },
              desc: {
                en: "All career tools are free for workers. Employer-paid model keeps the mission aligned — no one profits from desperation.",
                es: "Todas las herramientas son gratuitas para trabajadores. El modelo pagado por empleadores mantiene la misión alineada.",
              },
            },
            {
              icon: Shield,
              title: { en: "Data-Driven Matching", es: "Coincidencia Basada en Datos" },
              desc: {
                en: "220 FQHCs profiled with programs, EHR systems, salary ranges, and culture data — not just job titles.",
                es: "220 FQHCs perfilados con programas, sistemas EHR, rangos salariales y datos culturales — no solo títulos de trabajo.",
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
      {/*  CTA                                                         */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {isEs
              ? "Su Personal Merece un Aterrizaje Suave"
              : "Your Staff Deserve a Soft Landing"}
          </h2>
          <p className="mt-3 text-stone-300 max-w-xl mx-auto">
            {isEs
              ? "Ya sea que enfrente recortes inminentes o quiera estar preparado — empezamos con una conversación confidencial."
              : "Whether you\u2019re facing imminent cuts or want to be prepared — we start with a confidential conversation."}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-amber-500 text-stone-900 hover:bg-amber-400 font-bold">
              <Link href="/fast-track">
                <HeartHandshake className="mr-2 size-4" />
                {isEs ? "Iniciar Transición" : "Start a Transition"}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-stone-500 text-white hover:bg-stone-700"
            >
              <Link href="/layoffs">
                <TrendingDown className="mr-2 size-4" />
                {isEs ? "Ver Seguimiento de Despidos" : "View Layoff Tracker"}
              </Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-stone-400">
            <Link href="/funding-impact" className="hover:text-white transition-colors">
              {isEs ? "Impacto de H.R. 1" : "H.R. 1 Impact"} →
            </Link>
            <Link href="/strategy/guides" className="hover:text-white transition-colors">
              {isEs ? "Guías Ejecutivas" : "Executive Guides"} →
            </Link>
            <Link href="/directory" className="hover:text-white transition-colors">
              {isEs ? "Directorio de FQHCs" : "FQHC Directory"} →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
