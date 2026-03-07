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
  MapPin,
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
  { id: "care_coordinator", en: "Care Coordinator", es: "Coordinador(a) de Cuidado", icon: Users },
  { id: "medical_assistant", en: "Medical Assistant", es: "Asistente Médico", icon: Stethoscope },
  { id: "case_manager", en: "Case Manager", es: "Gerente de Casos", icon: ClipboardCheck },
  { id: "behavioral_health", en: "BH Specialist", es: "Especialista en Salud Conductual", icon: Brain },
  { id: "registered_nurse", en: "Registered Nurse", es: "Enfermero(a) Registrado(a)", icon: Activity },
  { id: "patient_services", en: "Patient Services", es: "Servicios al Paciente", icon: HeadphonesIcon },
  { id: "revenue_cycle", en: "Revenue Cycle", es: "Ciclo de Ingresos", icon: DollarSign },
  { id: "hr_manager", en: "HR Manager", es: "Gerente de Recursos Humanos", icon: Shield },
  { id: "accountant", en: "Accountant", es: "Contador(a)", icon: FileText },
  { id: "payroll_specialist", en: "Payroll Specialist", es: "Especialista en Nómina", icon: DollarSign },
  { id: "finance_manager", en: "Finance Manager", es: "Gerente de Finanzas", icon: TrendingUp },
];

export default function CareerInsightsPage() {
  const locale = useLocale();
  const isEs = locale === "es";

  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResults | null>(null);
  const [plan, setPlan] = useState<First90DaysPlanType | null>(null);
  const [showPlanPrompt, setShowPlanPrompt] = useState(false);
  const [starsType, setStarsType] = useState<"startup" | "turnaround" | "accelerated" | "realignment" | "sustaining">("sustaining");

  const handleComplete = (results: AssessmentResults) => {
    setAssessmentResults(results);
    setShowPlanPrompt(true); // Show the plan CTA, but don't auto-generate
  };

  const handleGeneratePlan = () => {
    if (!selectedRole || !assessmentResults) return;
    const generatedPlan = generateFirst90DaysPlan(selectedRole, starsType, assessmentResults);
    setPlan(generatedPlan);
    setShowPlanPrompt(false);
    // Scroll to plan
    setTimeout(() => {
      document.getElementById("plan-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleReset = () => {
    setSelectedRole(null);
    setAssessmentResults(null);
    setPlan(null);
    setShowPlanPrompt(false);
    setStarsType("sustaining");
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
          <p className="mx-auto mt-3 max-w-xl text-xs text-teal-300/70">
            {isEs
              ? "Solo con fines informativos. Esta herramienta proporciona orientación general de carrera basada en sus respuestas — no constituye asesoramiento profesional certificado."
              : "For informational purposes only. This tool provides general career guidance based on your responses — it does not constitute certified professional advice."}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Also available row */}
        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-stone-500">
          <span className="font-medium">{isEs ? "También disponible:" : "Also available:"}</span>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 hover:bg-teal-100"
          >
            <Briefcase className="size-3" />
            {isEs ? "Empleos FQHC" : "Browse FQHC Jobs"}
          </Link>
          <Link
            href="/resume-builder"
            className="inline-flex items-center gap-1 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 hover:bg-teal-100"
          >
            <FileText className="size-3" />
            {isEs ? "Crear currículum" : "Build Your Resume"}
          </Link>
          <Link
            href="/career-roadmap"
            className="inline-flex items-center gap-1 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 hover:bg-teal-100"
          >
            <TrendingUp className="size-3" />
            {isEs ? "Trayectoria profesional" : "Career Roadmap"}
          </Link>
        </div>

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

        {/* Step 3: Results + optional 90-Day Plan */}
        {assessmentResults && (
          <div className="space-y-8">
            {/* 90-Day Plan prompt — shown after assessment, before plan is generated */}
            {showPlanPrompt && !plan && (
              <div className="rounded-2xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-white p-6">
                <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">
                  <ClipboardCheck className="size-3.5" />
                  {isEs ? "Paso opcional" : "Optional next step"}
                </div>
                <h2 className="mb-2 mt-3 text-xl font-bold text-stone-900">
                  {isEs ? "¿Quieres un plan de 90 días personalizado?" : "Want a personalized 90-day plan?"}
                </h2>
                <p className="mb-5 text-sm text-stone-600">
                  {isEs
                    ? "Basado en tus resultados de evaluación, podemos generar un plan de 30/60/90 días con tareas, conversaciones clave y lista de verificación FOGLAMP para tu transición."
                    : "Based on your assessment results, we'll generate a 30/60/90-day plan with tasks, key conversations, and a FOGLAMP checklist tailored to your transition."}
                </p>
                {/* STARS type selector */}
                <div className="mb-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
                    {isEs ? "¿Cómo describes tu situación actual?" : "Which best describes your situation?"}
                  </p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {([
                      { id: "startup", en: "Starting something new", es: "Empezando algo nuevo", desc: "New role, new org or program launch" },
                      { id: "turnaround", en: "Fixing a crisis", es: "Arreglando una crisis", desc: "Performance problems, urgent turnaround" },
                      { id: "accelerated", en: "Scaling rapidly", es: "Crecimiento rápido", desc: "Fast growth, expansion, CalAIM ramp-up" },
                      { id: "realignment", en: "Shifting direction", es: "Cambiando dirección", desc: "Org needs strategic re-focus" },
                      { id: "sustaining", en: "Maintaining success", es: "Manteniendo el éxito", desc: "Stable org, continuing strong performance" },
                    ] as const).map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setStarsType(opt.id)}
                        className={`rounded-lg border-2 p-3 text-left text-sm transition-all ${
                          starsType === opt.id
                            ? "border-teal-500 bg-teal-50 text-teal-900"
                            : "border-stone-200 bg-white text-stone-700 hover:border-teal-200"
                        }`}
                      >
                        <div className="font-semibold">{isEs ? opt.es : opt.en}</div>
                        <div className="mt-0.5 text-xs text-stone-500">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleGeneratePlan}
                    className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-800"
                  >
                    <ClipboardCheck className="size-4" />
                    {isEs ? "Generar mi plan de 90 días" : "Generate My 90-Day Plan"}
                  </button>
                  <button
                    onClick={() => setShowPlanPrompt(false)}
                    className="inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-600 hover:bg-stone-50"
                  >
                    {isEs ? "No por ahora" : "Skip for now"}
                  </button>
                </div>
              </div>
            )}

            {/* 90-Day Plan — shown after user opts in */}
            {plan && (
              <div id="plan-section">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-stone-900">
                    {isEs ? "Tu plan de 90 días" : "Your 90-Day Plan"}
                  </h2>
                  <button
                    onClick={() => { setPlan(null); setShowPlanPrompt(true); }}
                    className="text-xs text-stone-400 underline hover:text-stone-600"
                  >
                    {isEs ? "Cambiar escenario" : "Change scenario"}
                  </button>
                </div>
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
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/resume-builder"
                className="flex items-center justify-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-4 py-4 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-100"
              >
                <FileText className="size-4" />
                {isEs ? "Crear currículum" : "Build Resume"}
              </Link>
              <Link
                href="/jobs"
                className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-4 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50"
              >
                <Briefcase className="size-4" />
                {isEs ? "Ver empleos" : "Browse Jobs"}
              </Link>
              {/* Show 90-day plan CTA if user skipped it */}
              {!plan && !showPlanPrompt && (
                <button
                  onClick={() => setShowPlanPrompt(true)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-teal-200 bg-white px-4 py-4 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-50"
                >
                  <MapPin className="size-4" />
                  {isEs ? "Plan de 90 días" : "90-Day Plan"}
                </button>
              )}
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-4 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50"
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
