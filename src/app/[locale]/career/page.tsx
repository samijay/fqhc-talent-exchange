// Career Hub — Unified entry point for all career tools
"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import {
  Compass,
  ArrowRight,
  Map,
  Award,
  FileText,
  MessageSquare,
  Route,
  Briefcase,
  ChevronRight,
  Sparkles,
  Clock,
  Users,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/ui/design-system";
import { t } from "@/lib/i18n-helpers";

/* ------------------------------------------------------------------ */
/*  Career Journey Steps                                               */
/* ------------------------------------------------------------------ */

interface CareerStep {
  step: number;
  icon: React.ComponentType<{ className?: string }>;
  title: { en: string; es: string };
  description: { en: string; es: string };
  href: string;
  color: string;
  time: string;
  cta: { en: string; es: string };
}

const CAREER_JOURNEY: CareerStep[] = [
  {
    step: 1,
    icon: Compass,
    title: { en: "Career Assessment", es: "Evaluación de Carrera" },
    description: {
      en: "Discover your ideal FQHC role. Answer 15 quick questions to get a personalized skill profile across 5 domains, matched to 13 career tracks.",
      es: "Descubre tu rol FQHC ideal. Responde 15 preguntas rápidas para obtener un perfil de habilidades personalizado en 5 dominios, emparejado con 13 carreras.",
    },
    href: "/career-insights",
    color: "teal",
    time: "5 min",
    cta: { en: "Take Assessment", es: "Tomar Evaluación" },
  },
  {
    step: 2,
    icon: Map,
    title: { en: "Career Roadmap", es: "Ruta Profesional" },
    description: {
      en: "See where your career can go. Explore 5 progression pathways from entry-level to director, with salary ranges adjusted by California region.",
      es: "Ve a dónde puede llegar tu carrera. Explora 5 rutas de progresión desde nivel inicial hasta director, con rangos salariales ajustados por región de California.",
    },
    href: "/career-roadmap",
    color: "blue",
    time: "10 min",
    cta: { en: "Explore Paths", es: "Explorar Rutas" },
  },
  {
    step: 3,
    icon: Award,
    title: { en: "Certifications Guide", es: "Guía de Certificaciones" },
    description: {
      en: "Find the certifications that matter. Browse 50+ healthcare certs with costs, timelines, salary impact, and ROI data — filtered by your role.",
      es: "Encuentra las certificaciones que importan. Explora 50+ certificaciones de salud con costos, plazos, impacto salarial y datos de ROI — filtradas por tu rol.",
    },
    href: "/certifications",
    color: "amber",
    time: "10 min",
    cta: { en: "Browse Certs", es: "Ver Certificaciones" },
  },
  {
    step: 4,
    icon: MessageSquare,
    title: { en: "Interview Prep", es: "Preparación para Entrevistas" },
    description: {
      en: "Practice with 200+ FQHC-specific questions. Get STAR framework response guides for every question, organized by role and category.",
      es: "Practica con 200+ preguntas específicas de FQHC. Obtén guías de respuesta con el marco STAR para cada pregunta, organizadas por rol y categoría.",
    },
    href: "/interview-prep",
    color: "violet",
    time: "15-30 min",
    cta: { en: "Start Practice", es: "Comenzar Práctica" },
  },
  {
    step: 5,
    icon: FileText,
    title: { en: "Resume Builder", es: "Constructor de CV" },
    description: {
      en: "Build an ATS-optimized FQHC resume. Choose from 8 role-specific templates with pre-written bullet points and auto-formatting to PDF.",
      es: "Crea un CV optimizado para ATS y FQHCs. Elige entre 8 plantillas específicas por rol con viñetas preescritas y formato automático a PDF.",
    },
    href: "/resume-builder",
    color: "green",
    time: "20 min",
    cta: { en: "Build Resume", es: "Crear CV" },
  },
  {
    step: 6,
    icon: Route,
    title: { en: "Learning Pathway", es: "Ruta de Aprendizaje" },
    description: {
      en: "Your personalized 25-step learning journey. Based on your role and experience level, with progress tracking across courses and resources.",
      es: "Tu viaje de aprendizaje personalizado de 25 pasos. Basado en tu rol y nivel de experiencia, con seguimiento de progreso a través de cursos y recursos.",
    },
    href: "/pathway",
    color: "rose",
    time: "Ongoing",
    cta: { en: "Start Pathway", es: "Iniciar Ruta" },
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const COLOR_MAP: Record<string, { bg: string; text: string; border: string; light: string }> = {
  teal: { bg: "bg-teal-100 dark:bg-teal-900/30", text: "text-teal-700 dark:text-teal-400", border: "border-teal-200 dark:border-teal-800", light: "bg-teal-50 dark:bg-teal-950/20" },
  blue: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800", light: "bg-blue-50 dark:bg-blue-950/20" },
  amber: { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-400", border: "border-amber-200 dark:border-amber-800", light: "bg-amber-50 dark:bg-amber-950/20" },
  violet: { bg: "bg-violet-100 dark:bg-violet-900/30", text: "text-violet-700 dark:text-violet-400", border: "border-violet-200 dark:border-violet-800", light: "bg-violet-50 dark:bg-violet-950/20" },
  green: { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-700 dark:text-green-400", border: "border-green-200 dark:border-green-800", light: "bg-green-50 dark:bg-green-950/20" },
  rose: { bg: "bg-rose-100 dark:bg-rose-900/30", text: "text-rose-700 dark:text-rose-400", border: "border-rose-200 dark:border-rose-800", light: "bg-rose-50 dark:bg-rose-950/20" },
};

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function CareerHubPage() {
  const locale = useLocale();
  const isEs = locale === "es";

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white dark:from-stone-950 dark:to-stone-900">
      <PageHero
        variant="dark"
        title={{
          en: "Your FQHC Career Starts Here",
          es: "Tu Carrera FQHC Comienza Aquí",
        }}
        subtitle={{
          en: "6 free tools that take you from \"what role fits me?\" to \"I got the offer.\" Follow the path or jump straight to what you need.",
          es: "6 herramientas gratuitas que te llevan de \"¿qué rol es para mí?\" a \"tengo la oferta\". Sigue el camino o salta directo a lo que necesitas.",
        }}
        meta={isEs ? "Centro de Carrera" : "Career Hub"}
        stats={[
          { value: "13", label: isEs ? "Carreras" : "Career Tracks" },
          { value: "200+", label: isEs ? "Preguntas" : "Interview Qs" },
          { value: "50+", label: isEs ? "Certificaciones" : "Certifications" },
          { value: isEs ? "Gratis" : "Free", label: isEs ? "Para Siempre" : "Forever" },
        ]}
      />

      {/* ---- Recommended Flow ---- */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="text-center mb-10">
          <Badge className="mb-3 bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
            <Sparkles className="h-3 w-3 mr-1" />
            {isEs ? "Camino Recomendado" : "Recommended Path"}
          </Badge>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 sm:text-3xl">
            {isEs ? "Tu Viaje en 6 Pasos" : "Your 6-Step Journey"}
          </h2>
          <p className="mt-2 text-stone-500 dark:text-stone-500 max-w-xl mx-auto">
            {isEs
              ? "Cada herramienta funciona de forma independiente, pero siguen un flujo natural."
              : "Each tool works standalone, but they follow a natural flow."}
          </p>
        </div>

        {/* Journey cards */}
        <div className="space-y-4">
          {CAREER_JOURNEY.map((step, i) => {
            const colors = COLOR_MAP[step.color] || COLOR_MAP.teal;
            const Icon = step.icon;

            return (
              <div key={step.step} className="group">
                <Link href={step.href as "/career-insights"}>
                  <Card className={`border transition-all hover:shadow-lg ${colors.border} hover:border-teal-300 dark:hover:border-teal-700`}>
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 sm:p-6">
                        {/* Step number + icon */}
                        <div className="flex items-center gap-3 shrink-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${colors.bg} ${colors.text}`}>
                            {step.step}
                          </div>
                          <div className={`rounded-lg p-2 ${colors.bg}`}>
                            <Icon className={`size-5 ${colors.text}`} />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-stone-900 dark:text-stone-100">
                              {t(step.title, locale)}
                            </h3>
                            <span className="text-xs text-stone-500 flex items-center gap-1">
                              <Clock className="size-3" />
                              {step.time}
                            </span>
                          </div>
                          <p className="text-sm text-stone-500 dark:text-stone-500 line-clamp-2">
                            {t(step.description, locale)}
                          </p>
                        </div>

                        {/* CTA */}
                        <div className="shrink-0 self-center">
                          <Button
                            variant="outline"
                            size="sm"
                            className={`${colors.border} ${colors.text} group-hover:bg-teal-700 group-hover:text-white group-hover:border-teal-700 transition-all`}
                          >
                            {t(step.cta, locale)}
                            <ArrowRight className="size-3.5 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                {/* Connector line between steps */}
                {i < CAREER_JOURNEY.length - 1 && (
                  <div className="flex justify-start ml-[29px] py-1">
                    <div className="w-0.5 h-4 bg-stone-200 dark:bg-stone-700" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ---- Quick Access Grid ---- */}
      <section className="bg-stone-100/50 dark:bg-stone-900/50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              {isEs ? "Acceso Rápido" : "Quick Access"}
            </h2>
            <p className="mt-2 text-sm text-stone-500 dark:text-stone-500">
              {isEs
                ? "¿Sabes lo que necesitas? Salta directo."
                : "Know what you need? Jump straight in."}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAREER_JOURNEY.map((step) => {
              const colors = COLOR_MAP[step.color] || COLOR_MAP.teal;
              const Icon = step.icon;

              return (
                <Link key={step.step} href={step.href as "/career-insights"}>
                  <div className={`group flex items-center gap-3 rounded-xl border bg-white p-4 transition-all hover:shadow-md dark:bg-stone-800/50 ${colors.border} hover:border-teal-300 dark:hover:border-teal-700`}>
                    <div className={`rounded-lg p-2 ${colors.bg}`}>
                      <Icon className={`size-5 ${colors.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-stone-900 dark:text-stone-100 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                        {t(step.title, locale)}
                      </h3>
                      <span className="text-xs text-stone-500">{step.time}</span>
                    </div>
                    <ChevronRight className="size-4 text-stone-500 group-hover:text-teal-600 transition-colors" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- Why These Tools ---- */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 sm:text-3xl">
            {isEs ? "¿Por Qué Estas Herramientas?" : "Why These Tools?"}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: CheckCircle2,
              title: isEs ? "Diseñadas para FQHCs" : "Built for FQHCs",
              desc: isEs
                ? "No herramientas genéricas. Cada pregunta, plantilla y ruta de carrera refleja la realidad de los centros de salud comunitarios."
                : "Not generic tools. Every question, template, and career path reflects the reality of community health centers.",
            },
            {
              icon: Users,
              title: isEs ? "13 Carreras" : "13 Career Tracks",
              desc: isEs
                ? "Desde CHW hasta gerente de finanzas. Cubrimos roles clínicos, administrativos y de liderazgo."
                : "From CHW to finance manager. We cover clinical, administrative, and leadership roles.",
            },
            {
              icon: TrendingUp,
              title: isEs ? "Datos Reales" : "Real Data",
              desc: isEs
                ? "Salarios de 220+ FQHCs en California, ajustados por región. Certificaciones con ROI real."
                : "Salary data from 220+ California FQHCs, adjusted by region. Certifications with real ROI.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-700 dark:bg-stone-800/50"
            >
              <item.icon className="size-6 shrink-0 text-teal-600 dark:text-teal-400" />
              <div>
                <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-500 mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Newsletter + Cross-Links ---- */}
      <section className="bg-gradient-to-br from-teal-800 to-teal-900 px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <Briefcase className="mx-auto size-8 text-teal-300 mb-4" />
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {isEs
              ? "Recibe Empleos y Recursos Gratis"
              : "Get Free Jobs & Career Resources"}
          </h2>
          <p className="mt-3 text-teal-200">
            {isEs
              ? "Alertas de empleo semanales, tendencias del mercado laboral y herramientas de carrera directamente en tu inbox."
              : "Weekly job alerts, labor market trends, and career tools straight to your inbox."}
          </p>
          <div className="mt-6 max-w-md mx-auto">
            <NewsletterSignup
              variant="inline"
              defaultAudience="the-pulse"
              showAudienceToggle={false}
            />
          </div>
        </div>
      </section>

      {/* ---- Bottom Cross-Links ---- */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            {isEs ? "Explora Más" : "Explore More"}
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { href: "/academy" as const, label: isEs ? "Academia FQHC" : "FQHC Academy" },
            { href: "/jobs" as const, label: isEs ? "Buscar Empleos" : "Browse Jobs" },
            { href: "/directory" as const, label: isEs ? "Directorio FQHC" : "FQHC Directory" },
            { href: "/salary-data" as const, label: isEs ? "Datos Salariales" : "Salary Data" },
            { href: "/strategy/okr-course" as const, label: isEs ? "Curso OKR" : "OKR Course" },
          ].map((link) => (
            <Link key={link.href} href={link.href}>
              <Button variant="outline" className="border-stone-300 dark:border-stone-600">
                {link.label}
                <ArrowRight className="size-3.5 ml-1.5" />
              </Button>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
