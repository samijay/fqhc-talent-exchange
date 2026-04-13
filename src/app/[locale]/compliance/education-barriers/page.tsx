"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Scale,
  Shield,
  AlertTriangle,
  BookOpen,
  ExternalLink,
  GraduationCap,
  CheckCircle2,
  Clock,
  FileText,
  Users,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getEducationBarriers,
  getEducationBarrierChallengeSteps,
  LABOR_RIGHTS_LAST_UPDATED,
} from "@/lib/labor-rights-data";
import { t } from "@/lib/i18n-helpers";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function EducationBarriersPage() {
  const locale = useLocale() as string;

  const allBarriers = getEducationBarriers();
  const challengeSteps = getEducationBarrierChallengeSteps();

  // State
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [expandedBarrierId, setExpandedBarrierId] = useState<string | null>(null);

  // Computed
  const filteredBarriers = useMemo(() => {
    if (!selectedRole) return allBarriers;
    return allBarriers.filter((b) => b.role === selectedRole);
  }, [selectedRole, allBarriers]);

  const roles = Array.from(
    new Set(allBarriers.map((b) => b.role))
  ).sort();

  // Toggle expand
  const toggleExpand = (id: string) => {
    setExpandedBarrierId(expandedBarrierId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* ===== BREADCRUMB ===== */}
      <div className="border-b border-stone-200 bg-white/50">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-stone-600">
            <Link href="/" className="hover:text-teal-700">
              FQHC Talent
            </Link>
            <span>/</span>
            <Link href="/compliance" className="hover:text-teal-700">
              {locale === "es" ? "Cumplimiento" : "Compliance"}
            </Link>
            <span>/</span>
            <span className="font-medium text-stone-900">
              {locale === "es"
                ? "Barreras Educativas"
                : "Education Barriers"}
            </span>
          </nav>
        </div>
      </div>

      {/* ===== HERO ===== */}
      <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-stone-900 py-16 sm:py-24 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-6">
            <GraduationCap className="h-10 w-10 flex-shrink-0 text-amber-400" />
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            {locale === "es"
              ? "Impugna Requisitos Educativos Innecesarios"
              : "Challenge Unnecessary Education Requirements"}
          </h1>

          <p className="text-lg text-teal-100 mb-8 max-w-2xl leading-relaxed">
            {locale === "es"
              ? "Muchas publicaciones de empleo en FQHCs exigen títulos y certificaciones que la ley de California no requiere. Aquí está la data — y cómo defender tus derechos."
              : "Many FQHC job postings require degrees and certifications beyond what California law mandates. Here's the data — and how to exercise your rights."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-bold text-amber-400">10</div>
              <div className="text-sm text-teal-100">
                {locale === "es" ? "Roles Analizados" : "Roles Analyzed"}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-bold text-amber-400">0</div>
              <div className="text-sm text-teal-100">
                {locale === "es"
                  ? "Roles que requieren legalmente licenciatura"
                  : "Roles legally requiring bachelor's"}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-bold text-amber-400">4</div>
              <div className="text-sm text-teal-100">
                {locale === "es"
                  ? "Pasos para Impugnar"
                  : "Steps to Challenge"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* EEOC Framework Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-stone-900 mb-2 flex items-center gap-2">
            <Scale className="h-8 w-8 text-teal-700" />
            {locale === "es"
              ? "Marco de la EEOC: Impacto Disparador"
              : "EEOC Framework: Adverse Impact"}
          </h2>
          <p className="text-stone-600 mb-8">
            {locale === "es"
              ? "La Comisión de Igualdad de Oportunidades en el Empleo (EEOC) protege a los trabajadores de requisitos educativos que crean impacto disparador — eliminando desproporcionadamente a mujeres, latinos, y trabajadores de color."
              : "The Equal Employment Opportunity Commission (EEOC) protects workers from education requirements that create adverse impact — disproportionately screening out women, Latinos, and workers of color."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Adverse Impact */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border border-red-200 p-6">
              <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                {locale === "es" ? "Impacto Disparador" : "Adverse Impact"}
              </h3>
              <p className="text-sm text-red-800 mb-3">
                {locale === "es"
                  ? "Si un requisito educativo elimina el 20% más de mujeres, latinos, o personas de color que de hombres o blancos, es probable que sea discriminatorio."
                  : "If an education requirement screens out 20%+ more women, Latinos, or people of color than men or white candidates, it's likely discriminatory."}
              </p>
              <div className="text-xs font-mono bg-red-100 rounded p-2 text-red-900">
                {locale === "es"
                  ? "Regla de 4/5: Si grupo protegido seleccionado a ≤80% de tasa de grupo mayoritario = impacto adverso"
                  : "4/5 Rule: If protected group selected at ≤80% of majority group rate = adverse impact"}
              </div>
            </div>

            {/* Business Necessity */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border border-amber-200 p-6">
              <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                {locale === "es" ? "Necesidad Empresarial" : "Business Necessity"}
              </h3>
              <p className="text-sm text-amber-800 mb-3">
                {locale === "es"
                  ? "Un empleador PUEDE requerir un título solo si demuestra que es absolutamente necesario para hacer el trabajo. La mayoría de los requisitos de educación en FQHCs no cumplen este estándar."
                  : "An employer CAN require a degree only if they prove it's strictly necessary to do the job. Most FQHC education requirements fail this test."}
              </p>
              <div className="text-xs font-mono bg-amber-100 rounded p-2 text-amber-900">
                {locale === "es"
                  ? "Carga legal: Empleador debe probar que alternativa menos discriminatoria NO existe"
                  : "Legal burden: Employer must prove no less discriminatory alternative exists"}
              </div>
            </div>
          </div>

          <div className="bg-teal-50 rounded-lg border border-teal-200 p-6">
            <h3 className="font-bold text-teal-900 mb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {locale === "es" ? "Marco de Validación" : "Validation Framework"}
            </h3>
            <p className="text-sm text-teal-800 mb-4">
              {locale === "es"
                ? "Según pautas de la EEOC, un requisito educativo debe ser:"
                : "Per EEOC guidance, an education requirement must be:"}
            </p>
            <ul className="space-y-2 text-sm text-teal-800">
              <li className="flex gap-3">
                <span className="text-teal-600 font-bold">1.</span>
                <span>
                  {locale === "es"
                    ? "Relacionado con el trabajo (job-related)"
                    : "Job-related (measure what matters for actual job performance)"}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-600 font-bold">2.</span>
                <span>
                  {locale === "es"
                    ? "Consistente con necesidad empresarial (not just preferred)"
                    : "Consistent with business necessity (not just preferred or nice-to-have)"}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-600 font-bold">3.</span>
                <span>
                  {locale === "es"
                    ? "Sin alternativa menos discriminatoria disponible"
                    : "No less discriminatory alternative available"}
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Role-by-Role Analysis */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-stone-900 mb-8 flex items-center gap-2">
            <Users className="h-8 w-8 text-teal-700" />
            {locale === "es"
              ? "Análisis por Rol"
              : "Role-by-Role Analysis"}
          </h2>

          {/* Role Filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedRole(null)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedRole === null
                  ? "bg-teal-700 text-white"
                  : "bg-stone-200 text-stone-700 hover:bg-stone-300"
              }`}
            >
              {locale === "es" ? "Todos" : "All"}
            </button>
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedRole === role
                    ? "bg-teal-700 text-white"
                    : "bg-stone-200 text-stone-700 hover:bg-stone-300"
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Barrier Cards */}
          <div className="space-y-6">
            {filteredBarriers.map((barrier) => (
              <div
                key={barrier.id}
                className="border border-stone-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <button
                  onClick={() => toggleExpand(barrier.id)}
                  className="w-full px-6 py-5 flex items-start justify-between hover:bg-stone-50 transition-colors"
                >
                  <div className="text-left flex-1">
                    <h3 className="text-lg font-bold text-stone-900 mb-3">
                      {barrier.role}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start gap-3">
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">
                            {locale === "es"
                              ? "Lo que Empleadores Piden"
                              : "What Employers Ask"}
                          </p>
                          <p className="text-sm bg-red-50 border border-red-200 text-red-800 rounded p-3">
                            {t(barrier.commonRequirement, locale)}
                          </p>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">
                            {locale === "es"
                              ? "Lo que la Ley Requiere"
                              : "What the Law Requires"}
                          </p>
                          <p className="text-sm bg-green-50 border border-green-200 text-green-800 rounded p-3">
                            {t(barrier.legalRequirement, locale)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    {expandedBarrierId === barrier.id ? (
                      <ChevronUp className="h-6 w-6 text-teal-700" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-stone-500" />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                {expandedBarrierId === barrier.id && (
                  <div className="border-t border-stone-200 px-6 py-5 bg-stone-50">
                    {/* Statute */}
                    <div className="mb-6 pb-6 border-b border-stone-200">
                      <p className="text-xs font-semibold text-stone-600 uppercase tracking-wide mb-2">
                        {locale === "es" ? "Estatuto" : "Legal Statute"}
                      </p>
                      <p className="text-sm font-mono bg-white rounded p-3 border border-stone-200 text-stone-800">
                        {barrier.statute}
                      </p>
                    </div>

                    {/* Gap Analysis */}
                    <div className="mb-6 pb-6 border-b border-stone-200">
                      <h4 className="font-bold text-stone-900 mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        {locale === "es" ? "Análisis de Brecha" : "Gap Analysis"}
                      </h4>
                      <p className="text-sm text-stone-700 bg-white rounded p-3 border border-amber-200">
                        {t(barrier.gapAnalysis, locale)}
                      </p>
                    </div>

                    {/* EEOC Framework */}
                    <div className="mb-6 pb-6 border-b border-stone-200">
                      <h4 className="font-bold text-stone-900 mb-3 flex items-center gap-2">
                        <Scale className="h-4 w-4 text-teal-600" />
                        {locale === "es" ? "Marco de EEOC" : "EEOC Framework"}
                      </h4>
                      <p className="text-sm text-stone-700 bg-white rounded p-3 border border-teal-200">
                        {t(barrier.eeocFramework, locale)}
                      </p>
                    </div>

                    {/* Outcome Data */}
                    <div className="mb-6 pb-6 border-b border-stone-200">
                      <h4 className="font-bold text-stone-900 mb-3 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-emerald-600" />
                        {locale === "es" ? "Datos de Resultados" : "Outcome Data"}
                      </h4>
                      <p className="text-sm text-stone-700 bg-white rounded p-3 border border-emerald-200">
                        {t(barrier.outcomeData, locale)}
                      </p>
                    </div>

                    {/* How to Challenge */}
                    <div className="mb-4">
                      <h4 className="font-bold text-stone-900 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal-600" />
                        {locale === "es"
                          ? "Cómo Impugnar Este Requisito"
                          : "How to Challenge This Requirement"}
                      </h4>
                      <p className="text-sm text-stone-700 bg-white rounded p-3 border border-teal-200">
                        {t(barrier.howToChallenge, locale)}
                      </p>
                    </div>

                    {/* Primary Source */}
                    <div>
                      <a
                        href={barrier.primarySourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-teal-700 hover:text-teal-900 font-medium"
                      >
                        <FileText className="h-4 w-4" />
                        {locale === "es"
                          ? "Ver Fuente Legal"
                          : "View Legal Source"}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 4-Step Challenge Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-stone-900 mb-2 flex items-center gap-2">
            <Clock className="h-8 w-8 text-teal-700" />
            {locale === "es"
              ? "Proceso de 4 Pasos para Impugnar"
              : "4-Step Challenge Process"}
          </h2>
          <p className="text-stone-600 mb-8">
            {locale === "es"
              ? "Un enfoque probado para cuestionar requisitos educativos ilegales o discriminatorios."
              : "A proven approach to challenge unlawful or discriminatory education requirements."}
          </p>

          <div className="space-y-6">
            {challengeSteps.map((step) => (
              <div key={step.step} className="relative">
                <div className="flex gap-6">
                  {/* Step Number */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-teal-700 text-white font-bold">
                      {step.step}
                    </div>
                    {step.step < 4 && (
                      <div className="w-1 bg-teal-200 h-12 my-2" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-6">
                    <h3 className="text-lg font-bold text-stone-900 mb-2">
                      {t(step.title, locale)}
                    </h3>
                    <p className="text-sm text-stone-700 mb-4">
                      {t(step.description, locale)}
                    </p>

                    {/* Agency Contacts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {step.agencyContacts.map((contact, idx) => (
                        <a
                          key={idx}
                          href={contact.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-3 bg-stone-50 border border-stone-200 rounded hover:bg-teal-50 hover:border-teal-200 transition-colors"
                        >
                          <p className="text-sm font-semibold text-stone-900 mb-1 line-clamp-2">
                            {contact.name}
                          </p>
                          <p className="text-xs text-stone-600 font-mono">
                            {contact.phone}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Resources Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-stone-900 mb-8 flex items-center gap-2">
            <Shield className="h-8 w-8 text-teal-700" />
            {locale === "es" ? "Recursos de Apoyo" : "Support Resources"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* EEOC */}
            <a
              href="https://www.eeoc.gov/file-charge-discrimination"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-white border border-stone-200 rounded-lg hover:shadow-lg hover:border-teal-300 transition-all"
            >
              <h3 className="font-bold text-stone-900 mb-2 flex items-center gap-2">
                <Scale className="h-5 w-5 text-teal-700" />
                EEOC Charge Filing
              </h3>
              <p className="text-sm text-stone-600 mb-3">
                {locale === "es"
                  ? "Presenta un cargo de discriminación en línea o en persona. Gratis y confidencial."
                  : "File a discrimination charge online or in-person. Free and confidential."}
              </p>
              <div className="flex items-center gap-2 text-teal-700 font-medium text-sm">
                {locale === "es" ? "Ir a EEOC" : "Go to EEOC"}
                <ArrowRight className="h-4 w-4" />
              </div>
            </a>

            {/* DLSE */}
            <a
              href="https://www.dir.ca.gov/dlse/howtofilewageclaim.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-white border border-stone-200 rounded-lg hover:shadow-lg hover:border-teal-300 transition-all"
            >
              <h3 className="font-bold text-stone-900 mb-2 flex items-center gap-2">
                <FileText className="h-5 w-5 text-teal-700" />
                DLSE Wage Claim
              </h3>
              <p className="text-sm text-stone-600 mb-3">
                {locale === "es"
                  ? "Presenta un reclamo por robo de salarios si se requiere capacitación no remunerada o internados."
                  : "File a wage claim for unpaid training or internship requirements."}
              </p>
              <div className="flex items-center gap-2 text-teal-700 font-medium text-sm">
                {locale === "es" ? "Presentar Reclamo" : "File Claim"}
                <ArrowRight className="h-4 w-4" />
              </div>
            </a>

            {/* Legal Aid at Work */}
            <a
              href="https://www.legalaidatwork.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-white border border-stone-200 rounded-lg hover:shadow-lg hover:border-teal-300 transition-all"
            >
              <h3 className="font-bold text-stone-900 mb-2 flex items-center gap-2">
                <Users className="h-5 w-5 text-teal-700" />
                Legal Aid at Work
              </h3>
              <p className="text-sm text-stone-600 mb-3">
                {locale === "es"
                  ? "Asesoría legal gratuita para trabajadores de Bay Area. Especialistas en derechos laborales."
                  : "Free legal advice for Bay Area workers. Labor rights specialists."}
              </p>
              <div className="flex items-center gap-2 text-teal-700 font-medium text-sm">
                {locale === "es" ? "Más Información" : "Learn More"}
                <ArrowRight className="h-4 w-4" />
              </div>
            </a>

            {/* DFEH */}
            <a
              href="https://dfeh.ca.gov/file-a-complaint/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-white border border-stone-200 rounded-lg hover:shadow-lg hover:border-teal-300 transition-all"
            >
              <h3 className="font-bold text-stone-900 mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5 text-teal-700" />
                CA Civil Rights Dept
              </h3>
              <p className="text-sm text-stone-600 mb-3">
                {locale === "es"
                  ? "Presenta quejas de discriminación bajo leyes estatales de CA. Protector de derechos civiles."
                  : "File discrimination complaints under CA state law. State civil rights agency."}
              </p>
              <div className="flex items-center gap-2 text-teal-700 font-medium text-sm">
                {locale === "es" ? "Presentar Queja" : "File Complaint"}
                <ArrowRight className="h-4 w-4" />
              </div>
            </a>
          </div>
        </section>

        {/* Cross-link to Scope of Practice */}
        <section className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg border border-teal-200 p-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-3">
            {locale === "es"
              ? "¿Cómo se relaciona esto con el alcance de práctica?"
              : "How Does This Relate to Scope of Practice?"}
          </h2>
          <p className="text-stone-700 mb-4">
            {locale === "es"
              ? "Los requisitos educativos a menudo van más allá de lo que California permite legalmente. Nuestra página de Alcance de Práctica muestra exactamente qué habilidades se requieren en la ley para cada rol en las FQHCs."
              : "Education requirements often go beyond what California law legally allows. Our Scope of Practice page shows exactly what skills are legally required for each FQHC role."}
          </p>
          <Link href="/strategy/scope-of-practice">
            <Button className="bg-teal-700 hover:bg-teal-800 text-white">
              {locale === "es"
                ? "Ver Alcance de Práctica"
                : "View Scope of Practice"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </section>

        {/* Last Updated */}
        <div className="text-center py-8 mt-12 border-t border-stone-200">
          <p className="text-xs text-stone-600">
            {locale === "es"
              ? `Última actualización: ${LABOR_RIGHTS_LAST_UPDATED}`
              : `Last updated: ${LABOR_RIGHTS_LAST_UPDATED}`}
          </p>
        </div>
      </div>
    </div>
  );
}
