"use client";

import {
  ArrowRight,
  Target,
  GraduationCap,
  FileEdit,
  UserCheck,
  Calculator,
  GitCompare,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";

export function ToolkitSection() {
  const locale = useLocale();
  const isEs = locale === "es";

  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-800">
            {isEs ? "Tu Kit de Herramientas FQHC" : "Your FQHC Toolkit"}
          </h2>
          <p className="mt-2 text-stone-500 max-w-xl mx-auto">
            {isEs
              ? "Herramientas gratuitas para convertir la inteligencia en estrategia y accion."
              : "Free tools to turn intelligence into strategy and action."}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* OKR Templates */}
          <Link
            href="/strategy/okrs"
            className="group rounded-xl border border-stone-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-teal-300 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-teal-50 p-2.5 text-teal-600 group-hover:bg-teal-100 transition-colors">
                <Target className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-stone-800 group-hover:text-teal-700 transition-colors">
                  {isEs ? "Plantillas OKR" : "OKR Templates"}
                </h3>
                <p className="text-sm text-stone-500 mt-0.5">
                  {isEs
                    ? "OKRs listos para FQHC — alineados con estandares UDS y HRSA."
                    : "FQHC-ready OKRs aligned to UDS metrics & HRSA standards."}
                </p>
                <span className="inline-flex items-center text-xs font-medium text-teal-600 mt-2 group-hover:translate-x-0.5 transition-transform">
                  {isEs ? "Explorar" : "Try Free"} <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </div>
            </div>
          </Link>

          {/* Learning Pathway */}
          <Link
            href="/pathway"
            className="group rounded-xl border border-stone-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-teal-300 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-purple-50 p-2.5 text-purple-600 group-hover:bg-purple-100 transition-colors">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-stone-800 group-hover:text-teal-700 transition-colors">
                  {isEs ? "Ruta de Aprendizaje" : "Learning Pathway"}
                </h3>
                <p className="text-sm text-stone-500 mt-0.5">
                  {isEs
                    ? "Cursos y certificaciones paso a paso para carreras en FQHC."
                    : "Step-by-step courses & certifications for FQHC careers."}
                </p>
                <span className="inline-flex items-center text-xs font-medium text-teal-600 mt-2 group-hover:translate-x-0.5 transition-transform">
                  {isEs ? "Explorar" : "Try Free"} <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </div>
            </div>
          </Link>

          {/* Resume Builder */}
          <Link
            href="/resume-builder"
            className="group rounded-xl border border-stone-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-teal-300 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600 group-hover:bg-blue-100 transition-colors">
                <FileEdit className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-stone-800 group-hover:text-teal-700 transition-colors">
                  {isEs ? "Constructor de Curriculum" : "Resume Builder"}
                </h3>
                <p className="text-sm text-stone-500 mt-0.5">
                  {isEs
                    ? "Genera curriculums optimizados para roles en salud comunitaria."
                    : "Build resumes optimized for community health center roles."}
                </p>
                <span className="inline-flex items-center text-xs font-medium text-teal-600 mt-2 group-hover:translate-x-0.5 transition-transform">
                  {isEs ? "Explorar" : "Try Free"} <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </div>
            </div>
          </Link>

          {/* Career Assessment */}
          <Link
            href="/career-insights"
            className="group rounded-xl border border-stone-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-teal-300 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-amber-50 p-2.5 text-amber-600 group-hover:bg-amber-100 transition-colors">
                <UserCheck className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-stone-800 group-hover:text-teal-700 transition-colors">
                  {isEs ? "Evaluacion de Carrera" : "Career Assessment"}
                </h3>
                <p className="text-sm text-stone-500 mt-0.5">
                  {isEs
                    ? "Descubre tu rol ideal en FQHC basado en tus habilidades y metas."
                    : "Find your ideal FQHC role based on your skills and goals."}
                </p>
                <span className="inline-flex items-center text-xs font-medium text-teal-600 mt-2 group-hover:translate-x-0.5 transition-transform">
                  {isEs ? "Explorar" : "Try Free"} <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </div>
            </div>
          </Link>

          {/* Clinic Simulator */}
          <Link
            href="/strategy/clinic-simulator"
            className="group rounded-xl border border-stone-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-teal-300 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-emerald-50 p-2.5 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                <Calculator className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-stone-800 group-hover:text-teal-700 transition-colors">
                  {isEs ? "Simulador de Clinica" : "Clinic Simulator"}
                </h3>
                <p className="text-sm text-stone-500 mt-0.5">
                  {isEs
                    ? "Modela escenarios de personal, financiamiento e impacto en pacientes."
                    : "Model staffing, funding, and patient impact scenarios."}
                </p>
                <span className="inline-flex items-center text-xs font-medium text-teal-600 mt-2 group-hover:translate-x-0.5 transition-transform">
                  {isEs ? "Explorar" : "Try Free"} <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </div>
            </div>
          </Link>

          {/* Compare FQHCs */}
          <Link
            href="/compare"
            className="group rounded-xl border border-stone-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-teal-300 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-rose-50 p-2.5 text-rose-600 group-hover:bg-rose-100 transition-colors">
                <GitCompare className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-stone-800 group-hover:text-teal-700 transition-colors">
                  {isEs ? "Comparar FQHCs" : "Compare FQHCs"}
                </h3>
                <p className="text-sm text-stone-500 mt-0.5">
                  {isEs
                    ? "Compara salarios, beneficios y metricas entre centros de salud."
                    : "Compare salaries, benefits, and metrics across health centers."}
                </p>
                <span className="inline-flex items-center text-xs font-medium text-teal-600 mt-2 group-hover:translate-x-0.5 transition-transform">
                  {isEs ? "Explorar" : "Try Free"} <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Action bar */}
        <div className="mt-6 text-center">
          <Link href="/strategy/guides">
            <Button
              size="lg"
              className="bg-stone-800 text-white hover:bg-stone-700 font-semibold"
            >
              {isEs ? "Ver Todas las Guias Ejecutivas" : "View All Executive Guides"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
