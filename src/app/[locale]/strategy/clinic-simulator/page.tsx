// FQHC Clinic Operations Simulator — staffing, scheduling & revenue modeling
"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import { ClinicSimulator } from "@/components/viz/ClinicSimulator";
import {
  Stethoscope,
  ArrowRight,
  CheckCircle2,
  Users,
  DollarSign,
  Activity,
  Building2,
  BookOpen,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DISEASE_PROTOCOLS,
  PATIENT_TIERS,
  SCALE_FACTORS,
  CLINIC_MODEL_LAST_UPDATED,
} from "@/lib/clinic-operations-model";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ClinicSimulatorPage() {
  const locale = useLocale();
  const isEs = locale === "es";

  return (
    <main className="min-h-screen bg-stone-50">
      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-teal-900 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-2 text-teal-400">
            <Stethoscope className="size-5" />
            <span className="text-sm font-bold uppercase tracking-widest">
              {isEs ? "Estrategia" : "Strategy"}
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-5xl">
            {isEs
              ? "Simulador de Operaciones Clínicas"
              : "Clinic Operations Simulator"}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-300">
            {isEs
              ? "Modele dotación de personal, horarios, co-visitas e ingresos para su FQHC en California. Valores predeterminados basados en un FQHC real de California. Compare tres modelos de tamaño. Calcule el ROI del Proveedor del Día."
              : "Model staffing, scheduling, co-visits, and revenue for your California FQHC. Default values reflect a real mid-size California FQHC. Compare three size models. Calculate Provider-of-the-Day ROI."}
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              {
                value: "$225",
                label: isEs ? "Tarifa PPS promedio" : "Avg PPS Rate",
                icon: DollarSign,
              },
              {
                value: "250–1K",
                label: isEs ? "Modelos de personal" : "Staff Models",
                icon: Users,
              },
              {
                value: "15+",
                label: isEs ? "Palancas de ingresos" : "Revenue Levers",
                icon: Activity,
              },
              {
                value: "POTD",
                label: isEs ? "Calculadora incluida" : "Calculator Included",
                icon: Building2,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-white/10 p-4 backdrop-blur"
              >
                <stat.icon className="mb-2 size-5 text-teal-400" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-stone-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CO-VISIT BILLING MODELS                                      */}
      {/* ============================================================ */}
      <section className="bg-white px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            {isEs
              ? "Dos Modelos de Co-Visita en FQHC"
              : "Two FQHC Co-Visit Billing Models"}
          </h2>
          <p className="mt-2 max-w-3xl text-stone-600">
            {isEs
              ? "Los FQHCs usan dos modelos distintos para maximizar ingresos con enfermeras. Ambos son legítimos bajo CMS, pero tienen implicaciones operativas diferentes."
              : "FQHCs use two distinct models to maximize revenue with nursing staff. Both are legitimate under CMS, but have different operational implications."}
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {/* Model A */}
            <div className="rounded-xl border-2 border-teal-200 bg-teal-50/30 p-6">
              <Badge className="mb-3 bg-teal-100 text-teal-700">
                {isEs ? "MODELO A" : "MODEL A"}
              </Badge>
              <h3 className="text-lg font-bold text-stone-900">
                {isEs
                  ? "Dos Encuentros el Mismo Día"
                  : "Two-Encounter Same-Day"}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {isEs
                  ? "Dos proveedores facturables ven al mismo paciente el mismo día. Cada uno documenta un servicio médicamente necesario y distinto. Resultado: 2 pagos PPS separados."
                  : "Two billable providers see the same patient on the same day. Each documents a separate, medically necessary service. Result: 2 separate PPS payments."}
              </p>
              <div className="mt-4 space-y-2">
                {[
                  isEs ? "MD/NP ve al paciente para visita primaria" : "MD/NP sees patient for primary care visit",
                  isEs ? "LCSW/Psicólogo ve al paciente para salud conductual" : "LCSW/Psychologist sees patient for behavioral health",
                  isEs ? "Dos notas separadas, dos reclamos, dos pagos PPS" : "Two separate notes, two claims, two PPS payments",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-stone-700">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-600" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg bg-teal-100 p-3">
                <p className="text-sm font-bold text-teal-800">
                  {isEs ? "Ejemplo de Ingresos" : "Revenue Example"}
                </p>
                <p className="mt-1 text-xs text-teal-700">
                  {isEs
                    ? "1 visita → 2 encuentros PPS × $225 = $450 de ingresos"
                    : "1 visit → 2 PPS encounters × $225 = $450 revenue"}
                </p>
              </div>
            </div>

            {/* Model B */}
            <div className="rounded-xl border-2 border-amber-200 bg-amber-50/30 p-6">
              <Badge className="mb-3 bg-amber-100 text-amber-700">
                {isEs ? "MODELO B" : "MODEL B"}
              </Badge>
              <h3 className="text-lg font-bold text-stone-900">
                {isEs
                  ? "Visita RN con Co-Firma del Proveedor"
                  : "RN Visit with Provider Co-Signature"}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {isEs
                  ? "RN realiza la visita completa del paciente (evaluación, educación, plan de atención). MD/NP revisa la nota, agrega evaluación clínica y co-firma, convirtiendo el encuentro en facturable."
                  : "RN conducts the full patient visit (assessment, education, care planning). MD/NP reviews the note, adds clinical assessment, and co-signs — making the encounter billable."}
              </p>
              <div className="mt-4 space-y-2">
                {[
                  isEs ? "RN realiza visita de 30 min (manejo de enfermedades crónicas, educación)" : "RN conducts 30-min visit (chronic disease mgmt, education)",
                  isEs ? "MD/NP revisa nota, agrega evaluación clínica (~5 min)" : "MD/NP reviews note, adds clinical assessment (~5 min)",
                  isEs ? "Un encuentro PPS facturable — RN hace el trabajo, MD lo hace facturable" : "One billable PPS encounter — RN does the work, MD makes it billable",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-stone-700">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-amber-600" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg bg-amber-100 p-3">
                <p className="text-sm font-bold text-amber-800">
                  {isEs ? "Modelo Proveedor del Día" : "Provider-of-the-Day Model"}
                </p>
                <p className="mt-1 text-xs text-amber-700">
                  {isEs
                    ? "1 MD co-firma para 4 RNs × 12 pacientes = 48 encuentros/día × $225 = $10,800/día"
                    : "1 MD co-signs for 4 RNs × 12 patients = 48 encounters/day × $225 = $10,800/day"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  THE SIMULATOR                                                */}
      {/* ============================================================ */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <ClinicSimulator />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PROVIDER-OF-THE-DAY DEEP DIVE                               */}
      {/* ============================================================ */}
      <section className="bg-white px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            {isEs
              ? "Proveedor del Día: Análisis Profundo"
              : "Provider-of-the-Day: Deep Dive"}
          </h2>
          <p className="mt-2 max-w-3xl text-stone-600">
            {isEs
              ? "¿Puede dedicar un MD/NP exclusivamente a co-firmar visitas de RN en lugar de ver sus propios pacientes?"
              : "Can you dedicate one MD/NP exclusively to co-signing RN visits instead of seeing their own patients?"}
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {/* When it works */}
            <div className="rounded-xl border border-teal-200 bg-teal-50/30 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-teal-700">
                <CheckCircle2 className="size-5" />
                {isEs ? "Cuándo Funciona" : "When It Works"}
              </h3>
              <div className="space-y-3">
                {[
                  {
                    en: "Stable chronic disease patients (diabetes, HTN, COPD) — predictable, protocol-driven visits ideal for RN-led care",
                    es: "Pacientes crónicos estables (diabetes, HTN, EPOC) — visitas predecibles e ideales para atención dirigida por RN",
                  },
                  {
                    en: "Experienced RNs with strong clinical judgment — can manage standing orders independently, know when to escalate",
                    es: "RNs experimentadas con buen juicio clínico — pueden manejar órdenes permanentes, saben cuándo escalar",
                  },
                  {
                    en: "Good EHR templates — standardized documentation reduces co-sign review time to 3-5 minutes per chart",
                    es: "Buenas plantillas EHR — documentación estandarizada reduce tiempo de revisión a 3-5 minutos por nota",
                  },
                  {
                    en: "Sufficient RN staffing — need 3-4+ RNs per POTD provider to generate enough volume",
                    es: "Suficiente dotación de RN — necesita 3-4+ RNs por proveedor POTD para generar suficiente volumen",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-stone-700">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-600" />
                    {t(item, locale)}
                  </div>
                ))}
              </div>
            </div>

            {/* When it fails */}
            <div className="rounded-xl border border-red-200 bg-red-50/30 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-red-700">
                <AlertTriangle className="size-5" />
                {isEs ? "Cuándo Falla" : "When It Fails"}
              </h3>
              <div className="space-y-3">
                {[
                  {
                    en: "High-acuity patient population — complex cases need direct provider evaluation, not just co-signature",
                    es: "Población de alta agudeza — casos complejos necesitan evaluación directa del proveedor, no solo co-firma",
                  },
                  {
                    en: "Poor documentation quality — if RN notes lack clinical detail, co-sign provider spends 15+ min per chart reviewing",
                    es: "Baja calidad de documentación — si las notas RN carecen de detalle, proveedor pasa 15+ min revisando cada nota",
                  },
                  {
                    en: "Small FQHC with few providers — dedicating 1 of 8 providers (12.5% capacity) is a bigger sacrifice than 1 of 30 (3.3%)",
                    es: "FQHC pequeño con pocos proveedores — dedicar 1 de 8 (12.5% capacidad) es mayor sacrificio que 1 de 30 (3.3%)",
                  },
                  {
                    en: "Regulatory uncertainty — some payers may audit co-signed encounters more aggressively; documentation must be bulletproof",
                    es: "Incertidumbre regulatoria — algunos pagadores pueden auditar encuentros co-firmados más agresivamente",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-stone-700">
                    <AlertTriangle className="mt-0.5 size-4 shrink-0 text-red-500" />
                    {t(item, locale)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Implementation Steps */}
          <div className="mt-8">
            <h3 className="mb-4 text-lg font-bold text-stone-900">
              {isEs
                ? "4 Pasos para Implementar"
                : "4 Steps to Implement"}
            </h3>
            <div className="grid gap-4 sm:grid-cols-4">
              {[
                {
                  step: "1",
                  title: { en: "Audit RN Readiness", es: "Auditar Preparación RN" },
                  desc: { en: "Identify RNs with chronic disease management experience. Verify standing order competency. Train on documentation templates.", es: "Identificar RNs con experiencia en manejo de enfermedades crónicas. Verificar competencia en órdenes permanentes." },
                },
                {
                  step: "2",
                  title: { en: "Build EHR Templates", es: "Crear Plantillas EHR" },
                  desc: { en: "Create standardized visit templates for each disease protocol. Include all required documentation elements for billing compliance.", es: "Crear plantillas estandarizadas para cada protocolo. Incluir todos los elementos de documentación requeridos." },
                },
                {
                  step: "3",
                  title: { en: "Pilot with 1 Provider", es: "Piloto con 1 Proveedor" },
                  desc: { en: "Start with 1 POTD provider and 2-3 RNs. Track encounters, review time, revenue, and quality metrics for 4 weeks.", es: "Comenzar con 1 proveedor POTD y 2-3 RNs. Rastrear encuentros, tiempo de revisión, ingresos y calidad por 4 semanas." },
                },
                {
                  step: "4",
                  title: { en: "Scale & Rotate", es: "Escalar y Rotar" },
                  desc: { en: "If metrics support it, scale to 4 RNs per POTD. Rotate POTD duty weekly to prevent burnout and maintain clinical skills.", es: "Si las métricas lo respaldan, escalar a 4 RNs por POTD. Rotar turno POTD semanalmente para evitar burnout." },
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-xl border border-stone-200 bg-stone-50 p-4"
                >
                  <span className="flex size-8 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white">
                    {item.step}
                  </span>
                  <h4 className="mt-3 text-sm font-bold text-stone-900">
                    {t(item.title, locale)}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-stone-600">
                    {t(item.desc, locale)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  DISEASE MANAGEMENT PROTOCOLS                                 */}
      {/* ============================================================ */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            {isEs
              ? "Protocolos de Manejo de Enfermedades"
              : "Disease Management Protocols"}
          </h2>
          <p className="mt-2 max-w-3xl text-stone-600">
            {isEs
              ? "Diseño intencional de manejo de atención: quién ve a quién, con qué frecuencia, y cómo genera ingresos."
              : "Intentional care management design: who sees whom, how often, and how it generates revenue."}
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {DISEASE_PROTOCOLS.map((protocol) => (
              <div
                key={protocol.id}
                className="rounded-xl border border-stone-200 bg-white p-6"
              >
                <h3 className="text-lg font-bold text-stone-900">
                  {t(protocol.name, locale)}
                </h3>
                <p className="mt-1 text-xs text-stone-500">
                  {t(protocol.prevalence, locale)}
                </p>

                {/* Visit Frequency */}
                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    {isEs ? "Frecuencia de Visitas" : "Visit Frequency"}
                  </p>
                  <p className="mt-1 text-sm text-stone-700">
                    {t(protocol.visitFrequency, locale)}
                  </p>
                </div>

                {/* Care Team */}
                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    {isEs ? "Equipo de Atención" : "Care Team"}
                  </p>
                  <div className="mt-2 space-y-1.5">
                    {protocol.careTeam.map((member) => (
                      <div
                        key={member.role}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Badge
                          variant="outline"
                          className="mt-0.5 shrink-0 text-[10px]"
                        >
                          {member.role}
                        </Badge>
                        <span className="text-stone-600">
                          {t(member.responsibility, locale)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Co-Visit Opportunity */}
                <div className="mt-4 rounded-lg bg-teal-50 p-3">
                  <p className="text-xs font-bold text-teal-700">
                    {isEs ? "Oportunidad de Co-Visita" : "Co-Visit Opportunity"}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-teal-600">
                    {t(protocol.coVisitOpportunity, locale)}
                  </p>
                </div>

                {/* Metrics */}
                <div className="mt-3">
                  <p className="text-xs font-bold text-stone-500">
                    {isEs ? "Métricas clave" : "Key Metrics"}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {protocol.metrics.map((metric, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-[10px]"
                      >
                        {t(metric, locale)}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PATIENT TIERING                                              */}
      {/* ============================================================ */}
      <section className="bg-white px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            {isEs
              ? "Marco de Clasificación de Pacientes"
              : "Patient Tiering Framework"}
          </h2>
          <p className="mt-2 max-w-3xl text-stone-600">
            {isEs
              ? "No todos los pacientes necesitan el mismo nivel de atención. Asignar los recursos correctos al nivel correcto maximiza el impacto y los ingresos."
              : "Not all patients need the same level of care. Assigning the right resources to the right tier maximizes both impact and revenue."}
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {PATIENT_TIERS.map((tier, i) => (
              <div
                key={tier.id}
                className={`rounded-xl border-2 p-6 ${
                  i === 0
                    ? "border-red-200 bg-red-50/30"
                    : i === 1
                      ? "border-amber-200 bg-amber-50/30"
                      : "border-green-200 bg-green-50/30"
                }`}
              >
                <h3 className="text-lg font-bold text-stone-900">
                  {t(tier.name, locale)}
                </h3>
                <Badge
                  variant="outline"
                  className="mt-1 text-[10px]"
                >
                  {t(tier.percentOfPanel, locale)}
                </Badge>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  {t(tier.description, locale)}
                </p>
                <div className="mt-4 space-y-2 text-sm">
                  <div>
                    <span className="text-xs font-bold text-stone-500">
                      {isEs ? "Rol primario" : "Primary Role"}:
                    </span>
                    <span className="ml-1 text-stone-700">
                      {tier.primaryRole}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-500">
                      {isEs ? "Frecuencia" : "Frequency"}:
                    </span>
                    <span className="ml-1 text-stone-700">
                      {t(tier.visitFrequency, locale)}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-500">
                      {isEs ? "Modelo de ingresos" : "Revenue Model"}:
                    </span>
                    <span className="ml-1 text-stone-700">
                      {t(tier.revenueModel, locale)}
                    </span>
                  </div>
                </div>
                <div className="mt-3 rounded-lg bg-white p-2 text-xs text-stone-500">
                  <strong>{isEs ? "Ejemplo" : "Example"}:</strong>{" "}
                  {t(tier.examples, locale)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  ECONOMIES OF SCALE                                           */}
      {/* ============================================================ */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            {isEs
              ? "Economías de Escala: 250 vs 1,000 Empleados"
              : "Economies of Scale: 250 vs 1,000 Staff"}
          </h2>
          <p className="mt-2 max-w-3xl text-stone-600">
            {isEs
              ? "El tamaño importa en las operaciones de FQHC. Los centros grandes tienen ventajas de costos, pero los pequeños tienen fortalezas propias."
              : "Size matters in FQHC operations. Large centers have cost advantages, but small ones have unique strengths."}
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b-2 border-stone-200">
                  <th className="py-3 text-left font-bold text-stone-900">
                    {isEs ? "Categoría" : "Category"}
                  </th>
                  <th className="py-3 text-left font-bold text-teal-700">
                    {isEs ? "FQHC Pequeño (~250)" : "Small FQHC (~250)"}
                  </th>
                  <th className="py-3 text-left font-bold text-amber-700">
                    {isEs ? "FQHC Grande (~1,000)" : "Large FQHC (~1,000)"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {SCALE_FACTORS.map((factor, i) => (
                  <tr
                    key={i}
                    className="border-b border-stone-100"
                  >
                    <td className="py-3 font-medium text-stone-700">
                      {t(factor.category, locale)}
                    </td>
                    <td
                      className={`py-3 ${factor.advantage === "small" ? "font-bold text-teal-700" : "text-stone-600"}`}
                    >
                      {t(factor.smallFQHC, locale)}
                      {factor.advantage === "small" && " ✓"}
                    </td>
                    <td
                      className={`py-3 ${factor.advantage === "large" ? "font-bold text-amber-700" : "text-stone-600"}`}
                    >
                      {t(factor.largeFQHC, locale)}
                      {factor.advantage === "large" && " ✓"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CROSS-NAV + CTA                                              */}
      {/* ============================================================ */}
      <section className="bg-white px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-2xl font-bold text-stone-900">
            {isEs ? "Recursos Relacionados" : "Related Resources"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/strategy/economics",
                title: { en: "Healthcare Economics", es: "Economía de la Salud" },
                desc: { en: "PPS, 340B, FMAP & more — 3 levels", es: "PPS, 340B, FMAP y más — 3 niveles" },
              },
              {
                href: "/strategy/scope-of-practice",
                title: { en: "Top-of-Scope", es: "Alcance Máximo" },
                desc: { en: "CA scope-of-practice by role", es: "Alcance de práctica por rol en CA" },
              },
              {
                href: "/guides",
                title: { en: "Workplace Guides", es: "Guías de Trabajo" },
                desc: { en: "RN co-visits, ECM, BH integration", es: "Co-visitas RN, ECM, integración BH" },
              },
              {
                href: "/salary-data",
                title: { en: "Salary Intelligence", es: "Inteligencia Salarial" },
                desc: { en: "30 roles × 9 regions", es: "30 roles × 9 regiones" },
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-start gap-3 rounded-xl border border-stone-200 p-4 transition-colors hover:border-teal-300 hover:bg-teal-50"
              >
                <BookOpen className="mt-0.5 size-5 shrink-0 text-teal-600" />
                <div>
                  <p className="text-sm font-bold text-stone-900 group-hover:text-teal-700">
                    {t(link.title, locale)}
                  </p>
                  <p className="mt-0.5 text-xs text-stone-500">
                    {t(link.desc, locale)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Newsletter */}
          <div className="mt-10">
            <NewsletterSignup variant="card" defaultAudience="intel-brief" />
          </div>

          {/* Source + Last Updated */}
          <div className="mt-6 flex items-center justify-between text-xs text-stone-400">
            <p>
              {isEs ? "Fuentes" : "Sources"}: CMS FQHC PPS · CA DHCS · NACHC ·
              HRSA BPHC
            </p>
            <p>
              {isEs ? "Última actualización" : "Last updated"}:{" "}
              {CLINIC_MODEL_LAST_UPDATED}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
