// FQHC Clinic Operations Simulator — staffing, scheduling & revenue modeling
// Medi-Cal aligned: WIC §14132.100, FQHC APM, payer-aware billing
"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import { ClinicSimulator } from "@/components/viz/ClinicSimulator";
import {
  Stethoscope,
  Users,
  DollarSign,
  Activity,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
              ? "Modele dotación de personal, horarios e ingresos para su FQHC. Alineado con reglas de facturación de Medi-Cal. Encuentre oportunidades de optimización con un clic."
              : "Model staffing, scheduling, and revenue for your California FQHC. Aligned with Medi-Cal billing rules. Find optimization opportunities with one click."}
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
                value: "8+",
                label: isEs
                  ? "Vías de optimización"
                  : "Optimization Pathways",
                icon: Activity,
              },
              {
                value: "APM",
                label: isEs
                  ? "Simulación de pagadores"
                  : "Payer-Aware Billing",
                icon: Building2,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-white/10 p-4 backdrop-blur"
              >
                <stat.icon className="mb-2 size-5 text-teal-400" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-stone-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  THE SIMULATOR (wizard-first for new visitors)                 */}
      {/* ============================================================ */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <ClinicSimulator />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  MEDI-CAL BILLING RULES QUICK REFERENCE                      */}
      {/* ============================================================ */}
      <section className="bg-white px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-xl font-bold text-stone-900 sm:text-2xl">
            {isEs
              ? "Reglas de Facturación: Lo Que Realmente es Facturable"
              : "Billing Rules: What's Actually Billable"}
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-stone-600">
            {isEs
              ? "La diferencia entre Medi-Cal y Medicare en facturación el mismo día es crítica. Muchos FQHCs pierden ingresos por no entender estas reglas."
              : "The difference between Medi-Cal and Medicare same-day billing is critical. Many FQHCs leave revenue on the table by misunderstanding these rules."}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {/* Same-day Dental */}
            <div className="rounded-xl border-2 border-green-200 bg-green-50/30 p-5">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="size-5 text-green-600" />
                <Badge className="bg-green-100 text-green-700 text-xs">
                  {isEs ? "2 PPS AMBOS PAGADORES" : "2 PPS BOTH PAYERS"}
                </Badge>
              </div>
              <h3 className="text-sm font-bold text-stone-900">
                {isEs ? "Médico + Dental Mismo Día" : "Medical + Dental Same-Day"}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-600">
                {isEs
                  ? "Paciente ve al médico Y al dentista el mismo día → 2 encuentros PPS separados bajo Medicare Y Medi-Cal. Máxima oportunidad de ingresos."
                  : "Patient sees medical provider AND dentist on the same day → 2 separate PPS encounters under Medicare AND Medi-Cal. Highest-value same-day opportunity."}
              </p>
            </div>

            {/* Same-day BH — Medicare */}
            <div className="rounded-xl border-2 border-amber-200 bg-amber-50/30 p-5">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="size-5 text-amber-600" />
                <Badge className="bg-amber-100 text-amber-700 text-xs">
                  {isEs ? "DEPENDE DEL PAGADOR" : "PAYER-DEPENDENT"}
                </Badge>
              </div>
              <h3 className="text-sm font-bold text-stone-900">
                {isEs ? "Médico + BH Mismo Día" : "Medical + BH Same-Day"}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-600">
                {isEs
                  ? "Medicare: 2 PPS ✓ — Medi-Cal: solo 1 PPS (WIC §14132.100) a menos que esté inscrito en el APM de FQHC (julio 2024). Sin APM, el 70%+ de su mezcla de pagadores NO genera un 2° PPS."
                  : "Medicare: 2 PPS ✓ — Medi-Cal: only 1 PPS (WIC §14132.100) unless enrolled in the FQHC APM (July 2024). Without APM, 70%+ of your payer mix does NOT generate a 2nd PPS."}
              </p>
            </div>

            {/* RN visits */}
            <div className="rounded-xl border-2 border-red-200 bg-red-50/30 p-5">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="size-5 text-red-600" />
                <Badge className="bg-red-100 text-red-700 text-xs">
                  {isEs ? "NO FACTURABLE" : "NOT BILLABLE"}
                </Badge>
              </div>
              <h3 className="text-sm font-bold text-stone-900">
                {isEs ? "Visitas de RN" : "RN Visits"}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-600">
                {isEs
                  ? "Las visitas de RN NO son facturables independientemente bajo PPS de FQHC (ni Medicare ni Medi-Cal). La co-firma de MD no las convierte en facturables. RNs generan valor como atención basada en equipo, liberando proveedores."
                  : "RN visits are NOT independently billable under FQHC PPS (neither Medicare nor Medi-Cal). MD co-signature alone does NOT make them billable. RNs generate value through team-based care, freeing up providers."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  DISEASE MANAGEMENT PROTOCOLS                                 */}
      {/* ============================================================ */}
      <section className="bg-white px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            {isEs
              ? "Protocolos de Manejo de Enfermedades"
              : "Disease Management Protocols"}
          </h2>
          <p className="mt-2 max-w-3xl text-stone-600">
            {isEs
              ? "Diseño intencional de atención basada en equipo: quién ve a quién, con qué frecuencia y cuáles son las vías de ingresos reales."
              : "Intentional team-based care design: who sees whom, how often, and what the actual revenue pathways are."}
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {DISEASE_PROTOCOLS.map((protocol) => (
              <div
                key={protocol.id}
                className="rounded-xl border border-stone-200 bg-stone-50 p-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-stone-900">
                    {t(protocol.name, locale)}
                  </h3>
                  {protocol.ccmEligible && (
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 text-xs"
                    >
                      CCM {isEs ? "elegible" : "eligible"}
                    </Badge>
                  )}
                </div>
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
                          className="mt-0.5 shrink-0 text-xs"
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

                {/* Revenue Pathway (replaces old "Co-Visit Opportunity") */}
                <div className="mt-4 rounded-lg bg-amber-50 p-3">
                  <p className="text-xs font-bold text-amber-700">
                    {isEs ? "Vía de Ingresos" : "Revenue Pathway"}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-amber-600">
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
                        className="text-xs"
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
      <section className="px-4 py-12">
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
                <Badge variant="outline" className="mt-1 text-xs">
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
      <section className="bg-white px-4 py-12">
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
                  <tr key={i} className="border-b border-stone-100">
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
      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-2xl font-bold text-stone-900">
            {isEs ? "Recursos Relacionados" : "Related Resources"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                href: "/strategy/schedule-planner",
                title: {
                  en: "Schedule Planner",
                  es: "Planificador de Horarios",
                },
                desc: {
                  en: "Build weekly schedules with MA ratios & revenue",
                  es: "Crea horarios semanales con ratios MA e ingresos",
                },
              },
              {
                href: "/strategy/economics",
                title: {
                  en: "Healthcare Economics",
                  es: "Economía de la Salud",
                },
                desc: {
                  en: "PPS, 340B, FMAP & more — 3 levels",
                  es: "PPS, 340B, FMAP y más — 3 niveles",
                },
              },
              {
                href: "/strategy/scope-of-practice",
                title: { en: "Top-of-Scope", es: "Alcance Máximo" },
                desc: {
                  en: "CA scope-of-practice by role",
                  es: "Alcance de práctica por rol en CA",
                },
              },
              {
                href: "/guides",
                title: { en: "Workplace Guides", es: "Guías de Trabajo" },
                desc: {
                  en: "Same-day billing, ECM, BH integration",
                  es: "Facturación mismo día, ECM, integración BH",
                },
              },
              {
                href: "/salary-data",
                title: {
                  en: "Salary Intelligence",
                  es: "Inteligencia Salarial",
                },
                desc: {
                  en: "30 roles × 9 regions",
                  es: "30 roles × 9 regiones",
                },
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-start gap-3 rounded-xl border border-stone-200 bg-white p-4 transition-colors hover:border-teal-300 hover:bg-teal-50"
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
          <div className="mt-6 flex items-center justify-between text-xs text-stone-500">
            <p>
              {isEs ? "Fuentes" : "Sources"}: CMS FQHC PPS · CA DHCS WIC
              §14132.100 · NACHC · HRSA BPHC · DHCS FQHC APM Guide
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
