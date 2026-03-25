"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Briefcase, BarChart3, Wrench, ArrowRight } from "lucide-react";

interface JobSeekerPathSectionProps {
  totalJobs: number;
  totalOrgs: number;
}

export function JobSeekerPathSection({ totalJobs, totalOrgs }: JobSeekerPathSectionProps) {
  const locale = useLocale();
  const isEs = locale === "es";

  return (
    <section id="for-job-seekers" className="scroll-mt-16 bg-white px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-amber-500" />
          <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            {isEs ? "Para Buscadores de Empleo" : "For Job Seekers"}
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 sm:gap-6 stagger-children">
          {/* Card 1: Open Positions */}
          <Link
            href="/jobs"
            className="group rounded-xl border-2 border-emerald-200 bg-stone-50 p-6 transition-all duration-200 hover:border-emerald-400 hover:shadow-lg hover:-translate-y-0.5"
          >
            <Briefcase className="mb-3 size-6 text-emerald-600" />
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              {isEs ? "Posiciones Abiertas" : "Open Positions"}
            </p>
            <p className="mt-2 text-3xl font-extrabold text-stone-900">
              {totalJobs.toLocaleString()}+
            </p>
            <p className="mt-1 text-sm text-stone-600">
              {isEs
                ? `En ${totalOrgs}+ FQHCs en 9 regiones de CA`
                : `Across ${totalOrgs}+ FQHCs in 9 CA regions`}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {isEs ? "Buscar empleos" : "Browse jobs"} <ArrowRight className="size-3" />
            </span>
          </Link>

          {/* Card 2: Salary Intelligence */}
          <Link
            href="/salary-data"
            className="group rounded-xl border-2 border-teal-200 bg-stone-50 p-6 transition-all duration-200 hover:border-teal-400 hover:shadow-lg hover:-translate-y-0.5"
          >
            <BarChart3 className="mb-3 size-6 text-teal-600" />
            <p className="text-xs font-bold uppercase tracking-wider text-teal-600">
              {isEs ? "Inteligencia Salarial" : "Salary Intelligence"}
            </p>
            <p className="mt-2 text-lg font-extrabold text-stone-900">
              30 {isEs ? "roles" : "Roles"} x 9 {isEs ? "Regiones" : "Regions"}
            </p>
            <p className="mt-1 text-sm text-stone-600">
              {isEs
                ? "Benchmarks P25/P50/P75 de listados reales"
                : "P25/P50/P75 benchmarks from real postings"}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-teal-600 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {isEs ? "Ver datos" : "See data"} <ArrowRight className="size-3" />
            </span>
          </Link>

          {/* Card 3: Free Career Tools */}
          <Link
            href="/resume-builder"
            className="group rounded-xl border-2 border-amber-200 bg-stone-50 p-6 transition-all duration-200 hover:border-amber-400 hover:shadow-lg hover:-translate-y-0.5"
          >
            <Wrench className="mb-3 size-6 text-amber-600" />
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
              {isEs ? "Herramientas Gratuitas" : "Free Career Tools"}
            </p>
            <p className="mt-2 text-sm font-semibold leading-snug text-stone-900">
              {isEs
                ? "Constructor de CV, Evaluacion de Carrera, Prep de Entrevistas"
                : "Resume Builder, Career Assessment, Interview Prep"}
            </p>
            <p className="mt-2 text-sm text-stone-600">
              {isEs ? "Sin registro requerido" : "No login required"}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-amber-600 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {isEs ? "Comenzar" : "Start building"} <ArrowRight className="size-3" />
            </span>
          </Link>
        </div>

        {/* Quick links row */}
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {[
            { href: "/career-roadmap" as const, en: "Career Roadmap", es: "Ruta de Carrera" },
            { href: "/certifications" as const, en: "Certifications", es: "Certificaciones" },
            { href: "/compare" as const, en: "Compare FQHCs", es: "Comparar FQHCs" },
            { href: "/pathway" as const, en: "Learning Pathway", es: "Ruta de Aprendizaje" },
            { href: "/interview-prep" as const, en: "Interview Prep", es: "Prep de Entrevista" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-1 text-sm font-medium text-amber-700 underline underline-offset-2 decoration-amber-300 transition-colors hover:text-amber-900 hover:decoration-amber-600"
            >
              {isEs ? link.es : link.en} <ArrowRight className="size-3" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
