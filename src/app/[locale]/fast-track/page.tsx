"use client";

import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import {
  CheckCircle2,
  ArrowRight,
  FileText,
  Search,
  ClipboardCheck,
  Map,
  Award,
  BookOpen,
  FolderOpen,
  Compass,
} from "lucide-react";
import { PageHero } from "@/components/ui/design-system";

/* ------------------------------------------------------------------ */
/*  i18n content                                                       */
/* ------------------------------------------------------------------ */

const content = {
  en: {
    heroTitle: "Get Job-Ready for Your Next FQHC Role",
    heroSubtitle:
      "Free resume builder, career assessment, and aggregated job postings — all designed for community health professionals in California.",
    badge1: "100% free tools",
    badge2: "No sign-up required",
    badge3: "220+ FQHCs",
    whyTitle: "Everything You Need — Free",
    why1Title: "Build Your Resume",
    why1Desc:
      "FQHC-optimized resume builder with templates for 8+ roles. Download as PDF in minutes.",
    why2Title: "Assess Your Strengths",
    why2Desc:
      "5-domain career assessment with role-specific insights, salary benchmarks, and a 90-day plan.",
    why3Title: "Find Your Next Role",
    why3Desc:
      "Browse 177+ job listings across 220 California FQHCs. Filter by role, region, and salary.",
    moreResourcesTitle: "More Free Resources",
    moreResourcesSubtitle:
      "Everything you need to plan your next career move — salary data, certifications, training programs, and operational guides.",
    res1Title: "Career Roadmap",
    res1Desc:
      "5 career tracks with 4 advancement levels each. CA salary data (P25/P50/P75) and regional adjustments for 9 regions.",
    res2Title: "Certifications",
    res2Desc:
      "15 California-specific certifications with cost, duration, salary impact, and where to get certified.",
    res3Title: "Career Resources",
    res3Desc:
      "18 free and low-cost programs: loan repayment, free training, professional development, and state workforce programs.",
    res4Title: "Workplace Guides",
    res4Desc:
      "9 operational how-to guides for clinical workflows, revenue and billing, and programs and compliance.",
    bottomText: "Ready to find your next role?",
    bottomLink: "Browse all open positions",
  },
  es: {
    heroTitle: "Prep\u00e1rate para Tu Pr\u00f3ximo Rol en un FQHC",
    heroSubtitle:
      "Creador de CV gratis, evaluaci\u00f3n de carrera y b\u00fasqueda de empleo — todo dise\u00f1ado para profesionales de salud comunitaria en California.",
    badge1: "Herramientas 100% gratis",
    badge2: "Sin registro necesario",
    badge3: "220+ FQHCs",
    whyTitle: "Todo Lo Que Necesitas — Gratis",
    why1Title: "Crea Tu CV",
    why1Desc:
      "Creador de CV optimizado para FQHCs con plantillas para 8+ roles. Descarga en PDF en minutos.",
    why2Title: "Eval\u00faa Tus Fortalezas",
    why2Desc:
      "Evaluaci\u00f3n de carrera en 5 dominios con perspectivas por rol, referencias salariales y plan de 90 d\u00edas.",
    why3Title: "Encuentra Tu Pr\u00f3ximo Rol",
    why3Desc:
      "Explora 177+ empleos en 220 FQHCs de California. Filtra por rol, regi\u00f3n y salario.",
    moreResourcesTitle: "M\u00e1s Recursos Gratis",
    moreResourcesSubtitle:
      "Todo lo que necesitas para planificar tu pr\u00f3ximo paso profesional — datos salariales, certificaciones, programas de capacitaci\u00f3n y gu\u00edas operativas.",
    res1Title: "Hoja de Ruta Profesional",
    res1Desc:
      "5 trayectorias profesionales con 4 niveles de avance cada una. Datos salariales de CA (P25/P50/P75) y ajustes regionales para 9 regiones.",
    res2Title: "Certificaciones",
    res2Desc:
      "15 certificaciones espec\u00edficas de California con costo, duraci\u00f3n, impacto salarial y d\u00f3nde certificarse.",
    res3Title: "Recursos Profesionales",
    res3Desc:
      "18 programas gratis y de bajo costo: pago de pr\u00e9stamos, capacitaci\u00f3n gratuita, desarrollo profesional y programas estatales.",
    res4Title: "Gu\u00edas de Trabajo",
    res4Desc:
      "9 gu\u00edas operativas para flujos cl\u00ednicos, facturaci\u00f3n e ingresos, y programas y cumplimiento.",
    bottomText: "\u00bfListo/a para encontrar tu pr\u00f3ximo rol?",
    bottomLink: "Explora todas las posiciones abiertas",
  },
};

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function FastTrackPage() {
  const locale = useLocale();
  const t = locale === "es" ? content.es : content.en;

  return (
    <div className="bg-stone-50 dark:bg-stone-950">
      <PageHero
        title={{ en: content.en.heroTitle, es: content.es.heroTitle }}
        subtitle={{ en: content.en.heroSubtitle, es: content.es.heroSubtitle }}
      >
        <div className="flex flex-wrap items-center gap-3">
          {[t.badge1, t.badge2, t.badge3].map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur"
            >
              <CheckCircle2 className="size-4 text-amber-400" />
              {badge}
            </span>
          ))}
        </div>
      </PageHero>

      {/* ---------- Guided Pathway CTA ---------- */}
      <section className="py-8 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/pathway"
            className="group flex items-center justify-between rounded-xl border-2 border-teal-300 bg-teal-50 dark:bg-teal-950 dark:border-teal-700 p-6 transition-all hover:border-teal-500 hover:shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white">
                <Compass className="size-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  {locale === "es" ? "No sabes por dónde empezar?" : "Not sure where to start?"}
                </h2>
                <p className="mt-0.5 text-sm text-stone-600 dark:text-stone-400">
                  {locale === "es"
                    ? "Toma la ruta guiada — selecciona tu rol y nivel, y te mostramos exactamente qué aprender."
                    : "Take the guided path — pick your role and level, and we\u2019ll show you exactly what to learn."}
                </p>
              </div>
            </div>
            <ArrowRight className="size-5 text-teal-600 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ---------- Everything You Need — Free ---------- */}
      <section className="py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-stone-900 dark:text-stone-100">
            {t.whyTitle}
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { title: t.why1Title, desc: t.why1Desc, icon: FileText, href: "/resume-builder" },
              { title: t.why2Title, desc: t.why2Desc, icon: ClipboardCheck, href: "/career-insights" },
              { title: t.why3Title, desc: t.why3Desc, icon: Search, href: "/jobs" },
            ].map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-6 text-center shadow-sm hover:border-teal-300 hover:shadow-md transition-all"
              >
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900 group-hover:bg-teal-200 transition-colors">
                  <card.icon className="size-6 text-teal-700 dark:text-teal-400" />
                </div>
                <h3 className="font-bold text-stone-900 dark:text-stone-100">{card.title}</h3>
                <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">{card.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-teal-700 dark:text-teal-400">
                  {locale === "es" ? "Comenzar" : "Get started"} <ArrowRight className="size-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- More Free Resources ---------- */}
      <section className="pb-12 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
              {t.moreResourcesTitle}
            </h2>
            <p className="mt-2 text-stone-600 dark:text-stone-400">
              {t.moreResourcesSubtitle}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { title: t.res1Title, desc: t.res1Desc, icon: Map, href: "/career-roadmap" },
              { title: t.res2Title, desc: t.res2Desc, icon: Award, href: "/certifications" },
              { title: t.res3Title, desc: t.res3Desc, icon: FolderOpen, href: "/resources" },
              { title: t.res4Title, desc: t.res4Desc, icon: BookOpen, href: "/guides" },
            ].map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group flex items-start gap-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-5 shadow-sm hover:border-teal-300 hover:shadow-md transition-all"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-900 group-hover:bg-teal-200 transition-colors">
                  <card.icon className="size-5 text-teal-700 dark:text-teal-400" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 dark:text-stone-100">{card.title}</h3>
                  <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{card.desc}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-teal-700 dark:text-teal-400">
                    {locale === "es" ? "Explorar" : "Explore"} <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Bottom cross-link ---------- */}
      <section className="pb-16 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-xl border border-teal-200 bg-teal-50 dark:bg-teal-950 p-8">
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              {t.bottomText}
            </h3>
            <Link
              href="/jobs"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-teal-700 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-800 transition-colors"
            >
              {t.bottomLink} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
