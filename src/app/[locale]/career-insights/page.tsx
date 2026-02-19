"use client";

import { useState } from "react";
import {
  Heart,
  Stethoscope,
  Brain,
  DollarSign,
  Activity,
  Users,
  Shield,
  HeadphonesIcon,
  ClipboardCheck,
  TrendingUp,
  Award,
  FileText,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import CareerInsights from "@/components/resume-builder/CareerInsights";
import First90DaysPlan from "@/components/career-insights/First90DaysPlan";
import { generateFirst90DaysPlan } from "@/lib/first-90-days";
import type { AssessmentResults } from "@/lib/career-assessment-engine";
import type { First90DaysPlan as First90DaysPlanType } from "@/lib/first-90-days";
import { getPathwayForRole } from "@/lib/career-pathways";
import { getCertificationsForRole } from "@/lib/certification-data";

const ROLES = [
  { id: "chw", en: "Community Health Worker", es: "Promotor(a) de Salud", icon: Heart },
  { id: "care-coordinator", en: "Care Coordinator", es: "Coordinador(a) de Cuidado", icon: Users },
  { id: "medical-assistant", en: "Medical Assistant", es: "Asistente Médico", icon: Stethoscope },
  { id: "case-manager", en: "Case Manager", es: "Gerente de Casos", icon: ClipboardCheck },
  { id: "behavioral-health", en: "BH Specialist", es: "Especialista en Salud Conductual", icon: Brain },
  { id: "rn", en: "Registered Nurse", es: "Enfermero(a) Registrado(a)", icon: Activity },
  { id: "patient-services", en: "Patient Services", es: "Servicios al Paciente", icon: HeadphonesIcon },
  { id: "revenue-cycle", en: "Revenue Cycle", es: "Ciclo de Ingresos", icon: DollarSign },
];

export default function CareerInsightsPage() {
  const locale = useLocale();
  const isEs = locale === "es";

  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResults | null>(null);
  const [plan, setPlan] = useState<First90DaysPlanType | null>(null);

  const handleComplete = (results: AssessmentResults) => {
    setAssessmentResults(results);

    // Generate 90-day plan with "sustaining" as default STARS type
    if (selectedRole) {
      const generatedPlan = generateFirst90DaysPlan(
        selectedRole,
        "sustaining",
        results
      );
      setPlan(generatedPlan);
    }
  };

  const handleReset = () => {
    setSelectedRole(null);
    setAssessmentResults(null);
    setPlan(null);
  };

  // Get career pathway for the selected role
  const pathway = selectedRole ? getPathwayForRole(selectedRole) : null;
  const certs = selectedRole ? getCertificationsForRole(selectedRole) : null;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-700/50 px-4 py-1.5 text-sm font-medium">
            <Shield className="size-4" />
            {isEs ? "Evaluación profesional para FQHCs" : "FQHC Career Assessment"}
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {isEs
              ? "Descubre tu fortaleza profesional"
              : "Discover Your Career Strengths"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-teal-100">
            {isEs
              ? "Toma una evaluación de 4 minutos en 5 dominios conductuales. Obtén ideas personalizadas, un plan de 90 días y recomendaciones de certificaciones."
              : "Take a 4-minute assessment across 5 behavioral domains. Get personalized insights, a 90-day plan, and certification recommendations."}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Step 1: Role selection */}
        {!selectedRole && (
          <div>
            <h2 className="mb-2 text-xl font-bold text-stone-900">
              {isEs ? "Paso 1: Selecciona tu rol" : "Step 1: Select Your Role"}
            </h2>
            <p className="mb-6 text-stone-600">
              {isEs
                ? "Elige el rol que mejor describe tu posición actual o deseada."
                : "Choose the role that best describes your current or desired position."}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {ROLES.map((role) => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className="rounded-xl border-2 border-stone-200 bg-white p-4 text-left transition-all hover:border-teal-300 hover:shadow-sm"
                  >
                    <Icon className="mb-2 size-5 text-teal-600" />
                    <div className="text-sm font-semibold text-stone-900">
                      {isEs ? role.es : role.en}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Assessment */}
        {selectedRole && !assessmentResults && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-stone-900">
                  {isEs ? "Paso 2: Evaluación" : "Step 2: Assessment"}
                </h2>
                <p className="text-sm text-stone-500">
                  {isEs ? "Rol seleccionado" : "Selected role"}:{" "}
                  <span className="font-medium text-teal-700">
                    {isEs
                      ? ROLES.find((r) => r.id === selectedRole)?.es
                      : ROLES.find((r) => r.id === selectedRole)?.en}
                  </span>
                </p>
              </div>
              <button
                onClick={handleReset}
                className="text-sm text-stone-500 underline hover:text-stone-700"
              >
                {isEs ? "Cambiar rol" : "Change role"}
              </button>
            </div>
            <CareerInsights
              roleId={selectedRole}
              onComplete={handleComplete}
              onSkip={() => setAssessmentResults(null)}
            />
          </div>
        )}

        {/* Step 3: Results + 90-Day Plan + Next Steps */}
        {assessmentResults && (
          <div className="space-y-8">
            {/* 90-Day Plan */}
            {plan && (
              <div>
                <h2 className="mb-4 text-xl font-bold text-stone-900">
                  {isEs ? "Tu plan de 90 días" : "Your 90-Day Plan"}
                </h2>
                <First90DaysPlan plan={plan} />
              </div>
            )}

            {/* Career Pathway */}
            {pathway && (
              <div className="rounded-xl border border-stone-200 bg-white p-6">
                <h2 className="mb-2 text-lg font-bold text-stone-900">
                  {isEs ? "Tu trayectoria profesional" : "Your Career Pathway"}
                </h2>
                <p className="mb-4 text-sm text-stone-600">
                  {isEs ? pathway.esDescription : pathway.description}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {pathway.levels.map((level, i) => (
                    <div key={level.roleId} className="flex items-center gap-2">
                      <div
                        className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                          level.roleId === selectedRole
                            ? "bg-teal-100 text-teal-800 ring-2 ring-teal-500"
                            : "bg-stone-100 text-stone-600"
                        }`}
                      >
                        {isEs ? level.esTitle : level.title}
                      </div>
                      {i < pathway.levels.length - 1 && (
                        <ArrowRight className="size-4 text-stone-300" />
                      )}
                    </div>
                  ))}
                </div>
                <Link
                  href="/career-roadmap"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800"
                >
                  {isEs ? "Ver trayectoria completa" : "View full career roadmap"}
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            )}

            {/* Certifications */}
            {certs && (certs.required.length > 0 || certs.recommended.length > 0) && (
              <div className="rounded-xl border border-stone-200 bg-white p-6">
                <h2 className="mb-2 text-lg font-bold text-stone-900">
                  {isEs ? "Certificaciones para tu rol" : "Certifications for Your Role"}
                </h2>
                {certs.required.length > 0 && (
                  <div className="mb-3">
                    <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-red-600">
                      {isEs ? "Requeridas" : "Required"}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {certs.required.map((c) => (
                        <span
                          key={c.id}
                          className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700"
                        >
                          <Award className="size-3" />
                          {c.abbreviation}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {certs.recommended.length > 0 && (
                  <div>
                    <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-green-600">
                      {isEs ? "Recomendadas" : "Recommended"}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {certs.recommended.map((c) => (
                        <span
                          key={c.id}
                          className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700"
                        >
                          <TrendingUp className="size-3" />
                          {c.abbreviation}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <Link
                  href={`/certifications?role=${selectedRole}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800"
                >
                  {isEs
                    ? "Ver catálogo completo de certificaciones"
                    : "View full certification catalog"}
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            )}

            {/* CTAs */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Link
                href="/resume-builder"
                className="flex items-center justify-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-6 py-4 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-100"
              >
                <FileText className="size-4" />
                {isEs ? "Crear currículum" : "Build Resume"}
              </Link>
              <Link
                href="/jobs"
                className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-6 py-4 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50"
              >
                <Briefcase className="size-4" />
                {isEs ? "Ver empleos" : "Browse Jobs"}
              </Link>
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-6 py-4 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50"
              >
                <ClipboardCheck className="size-4" />
                {isEs ? "Tomar de nuevo" : "Retake Assessment"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
