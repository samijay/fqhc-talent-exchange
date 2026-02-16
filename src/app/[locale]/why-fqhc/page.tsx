"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Heart,
  Rocket,
  Users,
  DollarSign,
  Stethoscope,
  ArrowRight,
  GraduationCap,
  Shield,
  Clock,
  TrendingUp,
  CheckCircle2,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SALARY_BENCHMARKS } from "@/lib/job-posting-templates";

/* ------------------------------------------------------------------ */
/*  Bilingual helper                                                   */
/* ------------------------------------------------------------------ */
function t(obj: { en: string; es: string }, locale: string): string {
  return locale === "es" ? obj.es : obj.en;
}

/* ------------------------------------------------------------------ */
/*  Career ladder data                                                 */
/* ------------------------------------------------------------------ */
const CAREER_LADDERS = [
  {
    entry: { en: "Community Health Worker", es: "Promotor/a de Salud" },
    entrySalary: "$38K–$55K",
    mid: { en: "Lead CHW / Care Coordinator", es: "CHW Líder / Coordinador/a de Atención" },
    midSalary: "$45K–$65K",
    midYears: { en: "1–2 years", es: "1–2 años" },
    senior: { en: "Program Manager", es: "Gerente de Programa" },
    seniorSalary: "$65K–$95K",
    seniorYears: { en: "3–4 years", es: "3–4 años" },
  },
  {
    entry: { en: "Medical Assistant", es: "Asistente Médico/a" },
    entrySalary: "$36K–$50K",
    mid: { en: "LVN / RN", es: "LVN / RN" },
    midSalary: "$52K–$125K",
    midYears: { en: "2–3 years + license", es: "2–3 años + licencia" },
    senior: { en: "Charge Nurse / Clinical Supervisor", es: "Enfermera Jefe / Supervisor Clínico" },
    seniorSalary: "$95K–$145K",
    seniorYears: { en: "4–6 years", es: "4–6 años" },
  },
  {
    entry: { en: "Patient Services Rep", es: "Rep. de Servicios al Paciente" },
    entrySalary: "$36K–$48K",
    mid: { en: "Revenue Cycle Specialist", es: "Especialista de Ciclo de Ingresos" },
    midSalary: "$50K–$72K",
    midYears: { en: "1–2 years", es: "1–2 años" },
    senior: { en: "Revenue Cycle Manager / Director", es: "Gerente / Director/a de Ciclo de Ingresos" },
    seniorSalary: "$80K–$135K",
    seniorYears: { en: "3–5 years", es: "3–5 años" },
  },
];

/* ------------------------------------------------------------------ */
/*  Comparison table data                                              */
/* ------------------------------------------------------------------ */
const COMPARISON_ROWS = [
  {
    dimension: { en: "Time to Leadership", es: "Tiempo al Liderazgo" },
    fqhc: { en: "2–4 years", es: "2–4 años" },
    hospital: { en: "5–10 years", es: "5–10 años" },
    private: { en: "Varies widely", es: "Varía mucho" },
  },
  {
    dimension: { en: "Patient Panel", es: "Panel de Pacientes" },
    fqhc: { en: "150–300 patients you know by name", es: "150–300 pacientes que conoces por nombre" },
    hospital: { en: "Rotating patients, low continuity", es: "Pacientes rotatorios, baja continuidad" },
    private: { en: "Higher volume, insurance-driven", es: "Mayor volumen, impulsado por seguro" },
  },
  {
    dimension: { en: "Scope of Practice", es: "Alcance de Práctica" },
    fqhc: { en: "Broad — top-of-scope work", es: "Amplio — trabajo al máximo del alcance" },
    hospital: { en: "Narrow — specialized tasks", es: "Estrecho — tareas especializadas" },
    private: { en: "Moderate — physician-dependent", es: "Moderado — dependiente del médico" },
  },
  {
    dimension: { en: "Loan Repayment", es: "Pago de Préstamos" },
    fqhc: { en: "NHSC: $50K–$75K tax-free", es: "NHSC: $50K–$75K libre de impuestos" },
    hospital: { en: "Rare — employer discretion", es: "Raro — a discreción del empleador" },
    private: { en: "None", es: "Ninguno" },
  },
  {
    dimension: { en: "Mission Impact", es: "Impacto en la Misión" },
    fqhc: { en: "Direct — you're the safety net", es: "Directo — tú eres la red de seguridad" },
    hospital: { en: "Indirect — one of thousands", es: "Indirecto — uno de miles" },
    private: { en: "Limited — profit-driven", es: "Limitado — impulsado por ganancias" },
  },
  {
    dimension: { en: "Minimum Wage (CA)", es: "Salario Mínimo (CA)" },
    fqhc: { en: "$25/hr (SB 525)", es: "$25/hr (SB 525)" },
    hospital: { en: "$25/hr (SB 525)", es: "$25/hr (SB 525)" },
    private: { en: "$16.50/hr state min", es: "$16.50/hr mínimo estatal" },
  },
];

/* ------------------------------------------------------------------ */
/*  Key benefits                                                       */
/* ------------------------------------------------------------------ */
const KEY_BENEFITS = [
  {
    icon: Shield,
    title: { en: "NHSC Loan Repayment", es: "Pago de Préstamos NHSC" },
    detail: { en: "$50,000–$75,000 tax-free for 2–3 year commitment", es: "$50,000–$75,000 libre de impuestos por compromiso de 2–3 años" },
  },
  {
    icon: Heart,
    title: { en: "Comprehensive Benefits", es: "Beneficios Integrales" },
    detail: { en: "Health, dental, vision, 403(b) match, generous PTO", es: "Salud, dental, visión, contribución 403(b), PTO generoso" },
  },
  {
    icon: GraduationCap,
    title: { en: "Continuing Education", es: "Educación Continua" },
    detail: { en: "Annual stipends for certifications, conferences, and training", es: "Estipendios anuales para certificaciones, conferencias y capacitación" },
  },
  {
    icon: DollarSign,
    title: { en: "SB 525 Minimum $25/hr", es: "SB 525 Mínimo $25/hr" },
    detail: { en: "California healthcare worker minimum wage floor", es: "Salario mínimo para trabajadores de salud en California" },
  },
  {
    icon: Clock,
    title: { en: "Work-Life Balance", es: "Equilibrio Vida-Trabajo" },
    detail: { en: "Many FQHCs offer 4-day work weeks and flexible scheduling", es: "Muchos FQHCs ofrecen semanas de 4 días y horarios flexibles" },
  },
  {
    icon: DollarSign,
    title: { en: "Bilingual Pay Differential", es: "Diferencial de Pago Bilingüe" },
    detail: { en: "$1–3/hr additional for bilingual staff at most FQHCs", es: "$1–3/hr adicional para personal bilingüe en la mayoría de FQHCs" },
  },
];

/* ------------------------------------------------------------------ */
/*  Compute salary highlights from actual data                        */
/* ------------------------------------------------------------------ */
const highlightRoles = ["chw", "care_coordinator", "nurse_rn", "behavioral_health", "program_manager"];
const salaryHighlights = SALARY_BENCHMARKS.filter((b) => highlightRoles.includes(b.roleId));

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */
export default function WhyFQHCPage() {
  const locale = useLocale();

  return (
    <main className="min-h-screen bg-white">
      {/* ============================================================ */}
      {/*  Hero                                                         */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-900 via-teal-800 to-teal-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 25% 50%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-teal-100 backdrop-blur-sm">
              <Heart className="size-4" />
              {t({ en: "Career Guide", es: "Guía de Carrera" }, locale)}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {t({
                en: "Why Work at an FQHC?",
                es: "¿Por Qué Trabajar en un FQHC?",
              }, locale)}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-teal-100 sm:text-xl">
              {t({
                en: "Smaller teams. Bigger impact. Faster growth. Here's why mission-driven healthcare professionals choose Federally Qualified Health Centers over large hospital systems and private practice.",
                es: "Equipos más pequeños. Mayor impacto. Crecimiento más rápido. Descubre por qué los profesionales de salud comprometidos con su misión eligen los Centros de Salud Comunitarios sobre grandes sistemas hospitalarios y práctica privada.",
              }, locale)}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 1: Lead Sooner                                       */}
      {/* ============================================================ */}
      <section className="border-b border-stone-100 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
              <Rocket className="size-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
                {t({ en: "Lead Sooner", es: "Lidera Más Pronto" }, locale)}
              </h2>
              <p className="mt-3 max-w-3xl text-lg leading-relaxed text-stone-600">
                {t({
                  en: "FQHCs typically have 50–500 staff — not 5,000. That means you can reach a supervisor or manager role in 2–3 years instead of 5–10 at a large hospital system. The career ladders are shorter and the opportunities to take on leadership are everywhere.",
                  es: "Los FQHCs típicamente tienen 50–500 empleados — no 5,000. Eso significa que puedes alcanzar un puesto de supervisor o gerente en 2–3 años en lugar de 5–10 en un gran sistema hospitalario. Las escaleras profesionales son más cortas y las oportunidades de liderazgo están en todas partes.",
                }, locale)}
              </p>
            </div>
          </div>

          {/* Career Ladder Visualization */}
          <div className="mt-10">
            <h3 className="mb-6 text-lg font-semibold text-stone-800">
              {t({ en: "Real FQHC Career Pathways", es: "Trayectorias Profesionales Reales en FQHCs" }, locale)}
            </h3>
            <div className="space-y-4">
              {CAREER_LADDERS.map((ladder, i) => (
                <div key={i} className="rounded-xl border border-stone-200 bg-stone-50 p-4 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    {/* Entry */}
                    <div className="flex-1 rounded-lg bg-white p-3 shadow-sm">
                      <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
                        {t({ en: "Entry", es: "Entrada" }, locale)}
                      </p>
                      <p className="mt-1 font-semibold text-stone-900">{t(ladder.entry, locale)}</p>
                      <p className="text-sm font-medium text-teal-700">{ladder.entrySalary}</p>
                    </div>

                    {/* Arrow + time */}
                    <div className="flex items-center gap-1 sm:flex-col">
                      <ArrowRight className="size-5 text-teal-600 sm:rotate-0" />
                      <span className="text-xs text-stone-500">{t(ladder.midYears, locale)}</span>
                    </div>

                    {/* Mid */}
                    <div className="flex-1 rounded-lg bg-white p-3 shadow-sm">
                      <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
                        {t({ en: "Mid-Career", es: "Media Carrera" }, locale)}
                      </p>
                      <p className="mt-1 font-semibold text-stone-900">{t(ladder.mid, locale)}</p>
                      <p className="text-sm font-medium text-teal-700">{ladder.midSalary}</p>
                    </div>

                    {/* Arrow + time */}
                    <div className="flex items-center gap-1 sm:flex-col">
                      <ArrowRight className="size-5 text-teal-600 sm:rotate-0" />
                      <span className="text-xs text-stone-500">{t(ladder.seniorYears, locale)}</span>
                    </div>

                    {/* Senior */}
                    <div className="flex-1 rounded-lg bg-white p-3 shadow-sm ring-2 ring-teal-200">
                      <p className="text-xs font-medium uppercase tracking-wide text-teal-600">
                        {t({ en: "Leadership", es: "Liderazgo" }, locale)}
                      </p>
                      <p className="mt-1 font-semibold text-stone-900">{t(ladder.senior, locale)}</p>
                      <p className="text-sm font-bold text-teal-700">{ladder.seniorSalary}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 2: Higher Impact Per Person                          */}
      {/* ============================================================ */}
      <section className="border-b border-stone-100 bg-stone-50 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Users className="size-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
                {t({ en: "Higher Impact Per Person", es: "Mayor Impacto Por Persona" }, locale)}
              </h2>
              <p className="mt-3 max-w-3xl text-lg leading-relaxed text-stone-600">
                {t({
                  en: "At an FQHC, your patient panel is 150–300 people. You know their names, their families, their stories. You're not a cog in a machine — you're the safety net.",
                  es: "En un FQHC, tu panel de pacientes es de 150–300 personas. Conoces sus nombres, sus familias, sus historias. No eres un engranaje en una máquina — tú eres la red de seguridad.",
                }, locale)}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                stat: "150–300",
                label: { en: "Patients in your panel", es: "Pacientes en tu panel" },
                detail: { en: "You build real relationships with the people you serve. Continuity of care improves outcomes — and job satisfaction.", es: "Construyes relaciones reales con las personas que atiendes. La continuidad de atención mejora resultados — y la satisfacción laboral." },
              },
              {
                stat: "90+",
                label: { en: "FQHCs in California", es: "FQHCs en California" },
                detail: { en: "Serving millions of patients in underserved communities. Population health management is the future — FQHCs are already doing it.", es: "Atendiendo a millones de pacientes en comunidades desatendidas. La gestión de salud poblacional es el futuro — los FQHCs ya lo están haciendo." },
              },
              {
                stat: "70%+",
                label: { en: "Of patients are Medi-Cal", es: "De pacientes son Medi-Cal" },
                detail: { en: "You're serving people who have nowhere else to go. That's meaningful work that changes lives — including yours.", es: "Atiendes a personas que no tienen otro lugar a dónde ir. Es un trabajo significativo que cambia vidas — incluyendo la tuya." },
              },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-stone-200 bg-white p-6 text-center">
                <p className="text-3xl font-extrabold text-teal-700">{item.stat}</p>
                <p className="mt-1 text-sm font-semibold text-stone-700">{t(item.label, locale)}</p>
                <p className="mt-3 text-sm leading-relaxed text-stone-500">{t(item.detail, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 3: Financial Upside                                  */}
      {/* ============================================================ */}
      <section className="border-b border-stone-100 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
              <DollarSign className="size-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
                {t({ en: "The Financial Upside", es: "La Ventaja Financiera" }, locale)}
              </h2>
              <p className="mt-3 max-w-3xl text-lg leading-relaxed text-stone-600">
                {t({
                  en: "FQHC compensation is more competitive than most people think — especially when you factor in loan repayment, benefits, and California's SB 525 healthcare worker minimum wage.",
                  es: "La compensación en FQHCs es más competitiva de lo que la mayoría piensa — especialmente cuando consideras el pago de préstamos, beneficios, y el salario mínimo de trabajadores de salud de California (SB 525).",
                }, locale)}
              </p>
            </div>
          </div>

          {/* Benefits grid */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {KEY_BENEFITS.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white p-4">
                <benefit.icon className="mt-0.5 size-5 shrink-0 text-teal-600" />
                <div>
                  <p className="font-semibold text-stone-900">{t(benefit.title, locale)}</p>
                  <p className="mt-1 text-sm text-stone-500">{t(benefit.detail, locale)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Salary benchmarks from real data */}
          <div className="mt-10">
            <h3 className="mb-4 text-lg font-semibold text-stone-800">
              {t({ en: "California FQHC Salary Ranges", es: "Rangos Salariales FQHC en California" }, locale)}
            </h3>
            <div className="overflow-hidden rounded-xl border border-stone-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-stone-50">
                    <th className="px-4 py-3 text-left font-semibold text-stone-700">
                      {t({ en: "Role", es: "Puesto" }, locale)}
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-stone-700">P25</th>
                    <th className="hidden px-4 py-3 text-right font-semibold text-teal-700 sm:table-cell">
                      {t({ en: "Median", es: "Mediana" }, locale)}
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-stone-700">P75</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryHighlights.map((role) => (
                    <tr key={role.roleId} className="border-t border-stone-100">
                      <td className="px-4 py-3 font-medium text-stone-900">
                        {locale === "es" ? role.esLabel : role.label}
                      </td>
                      <td className="px-4 py-3 text-right text-stone-500">
                        ${(role.p25 / 1000).toFixed(0)}K
                      </td>
                      <td className="hidden px-4 py-3 text-right font-semibold text-teal-700 sm:table-cell">
                        ${(role.p50 / 1000).toFixed(0)}K
                      </td>
                      <td className="px-4 py-3 text-right text-stone-500">
                        ${(role.p75 / 1000).toFixed(0)}K
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-stone-400">
              {t({
                en: "Source: FQHC Talent Exchange analysis of 156+ California FQHC job listings, 2025–2026.",
                es: "Fuente: Análisis de FQHC Talent Exchange de 156+ ofertas laborales FQHC en California, 2025–2026.",
              }, locale)}
            </p>
          </div>

          {/* Total comp example */}
          <div className="mt-8 rounded-xl border-2 border-teal-200 bg-teal-50 p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-teal-800">
              <Star className="size-5" />
              {t({ en: "Example: CHW Total Compensation", es: "Ejemplo: Compensación Total de CHW" }, locale)}
            </h3>
            <div className="mt-4 space-y-2">
              {[
                { label: { en: "Base Salary", es: "Salario Base" }, value: "$45,000" },
                { label: { en: "NHSC Loan Repayment (annualized)", es: "Pago de Préstamos NHSC (anualizado)" }, value: "+$25,000" },
                { label: { en: "Health/Dental/Vision Benefits", es: "Beneficios de Salud/Dental/Visión" }, value: "+$12,000" },
                { label: { en: "403(b) Employer Match", es: "Contribución del Empleador 403(b)" }, value: "+$2,700" },
                { label: { en: "Bilingual Differential", es: "Diferencial Bilingüe" }, value: "+$3,000" },
                { label: { en: "CE/Training Stipend", es: "Estipendio de CE/Capacitación" }, value: "+$1,500" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-teal-700">{t(item.label, locale)}</span>
                  <span className="text-sm font-semibold text-teal-800">{item.value}</span>
                </div>
              ))}
              <div className="mt-2 border-t-2 border-teal-300 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-teal-900">
                    {t({ en: "Effective Total Compensation", es: "Compensación Total Efectiva" }, locale)}
                  </span>
                  <span className="text-xl font-extrabold text-teal-900">$89,200</span>
                </div>
              </div>
            </div>
            <p className="mt-3 text-xs text-teal-600">
              {t({
                en: "* NHSC loan repayment is tax-free, making its effective value even higher. Not all staff are eligible — clinical and behavioral health roles in designated HPSAs qualify.",
                es: "* El pago de préstamos NHSC es libre de impuestos, lo que hace su valor efectivo aún mayor. No todo el personal es elegible — roles clínicos y de salud conductual en HPSAs designados califican.",
              }, locale)}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 4: Day-to-Day Autonomy                               */}
      {/* ============================================================ */}
      <section className="border-b border-stone-100 bg-stone-50 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
              <Stethoscope className="size-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
                {t({ en: "Day-to-Day Autonomy", es: "Autonomía Día a Día" }, locale)}
              </h2>
              <p className="mt-3 max-w-3xl text-lg leading-relaxed text-stone-600">
                {t({
                  en: "At an FQHC, you practice at the top of your scope. Cross-functional teams mean you're involved in the full patient experience — not just one narrow slice.",
                  es: "En un FQHC, practicas al máximo de tu alcance. Los equipos multifuncionales significan que estás involucrado en toda la experiencia del paciente — no solo en una parte estrecha.",
                }, locale)}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {[
              {
                icon: TrendingUp,
                title: { en: "Broader Scope of Practice", es: "Alcance de Práctica Más Amplio" },
                items: [
                  { en: "MAs perform patient education, not just vitals", es: "Los MAs realizan educación al paciente, no solo signos vitales" },
                  { en: "CHWs do home visits, outreach, and care coordination", es: "Los CHWs hacen visitas domiciliarias, alcance y coordinación de atención" },
                  { en: "RNs manage chronic disease panels independently", es: "Los RNs manejan paneles de enfermedades crónicas de forma independiente" },
                  { en: "NPs/PAs run their own patient panels", es: "Los NPs/PAs manejan sus propios paneles de pacientes" },
                ],
              },
              {
                icon: Users,
                title: { en: "Cross-Functional Teams", es: "Equipos Multifuncionales" },
                items: [
                  { en: "Integrated behavioral health embedded in primary care", es: "Salud conductual integrada en atención primaria" },
                  { en: "Warm handoffs between medical, dental, and BH", es: "Transferencias directas entre médico, dental y salud conductual" },
                  { en: "Community Supports linking clinical and social services", es: "Apoyos Comunitarios vinculando servicios clínicos y sociales" },
                  { en: "Team huddles where every voice matters", es: "Reuniones de equipo donde cada voz importa" },
                ],
              },
            ].map((card, i) => (
              <div key={i} className="rounded-xl border border-stone-200 bg-white p-6">
                <div className="flex items-center gap-2">
                  <card.icon className="size-5 text-teal-600" />
                  <h3 className="text-lg font-semibold text-stone-900">{t(card.title, locale)}</h3>
                </div>
                <ul className="mt-4 space-y-2">
                  {card.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-stone-600">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-500" />
                      {t(item, locale)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 5: Comparison Table                                  */}
      {/* ============================================================ */}
      <section className="border-b border-stone-100 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-stone-900 sm:text-3xl">
            {t({
              en: "FQHC vs. Hospital vs. Private Practice",
              es: "FQHC vs. Hospital vs. Práctica Privada",
            }, locale)}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-stone-600">
            {t({
              en: "See how FQHCs stack up against the alternatives across the dimensions that matter most to your career.",
              es: "Compara cómo los FQHCs se comparan con las alternativas en las dimensiones que más importan para tu carrera.",
            }, locale)}
          </p>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b-2 border-stone-200">
                  <th className="px-4 py-3 text-left font-semibold text-stone-700">
                    {t({ en: "Dimension", es: "Dimensión" }, locale)}
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-teal-700">
                    FQHC
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-stone-500">
                    {t({ en: "Large Hospital", es: "Hospital Grande" }, locale)}
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-stone-500">
                    {t({ en: "Private Practice", es: "Práctica Privada" }, locale)}
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={i} className="border-b border-stone-100">
                    <td className="px-4 py-3 font-medium text-stone-900">
                      {t(row.dimension, locale)}
                    </td>
                    <td className="px-4 py-3 font-medium text-teal-700">
                      {t(row.fqhc, locale)}
                    </td>
                    <td className="px-4 py-3 text-stone-500">
                      {t(row.hospital, locale)}
                    </td>
                    <td className="px-4 py-3 text-stone-500">
                      {t(row.private, locale)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA Section                                                  */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-b from-teal-50 to-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            {t({
              en: "Ready to Make the Move?",
              es: "¿Listo/a Para Dar el Paso?",
            }, locale)}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-stone-600">
            {t({
              en: "Build a free FQHC-optimized resume in 10 minutes. Our templates are designed for community health center hiring managers.",
              es: "Crea un CV optimizado para FQHCs gratis en 10 minutos. Nuestras plantillas están diseñadas para gerentes de contratación de centros de salud comunitarios.",
            }, locale)}
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="bg-teal-700 text-white hover:bg-teal-800"
              asChild
            >
              <Link href="/resume-builder">
                {t({ en: "Build Your Free Resume", es: "Crea Tu CV Gratis" }, locale)}
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-stone-300 text-stone-700 hover:bg-stone-50"
              asChild
            >
              <Link href="/jobs">
                {t({ en: "Browse FQHC Jobs", es: "Buscar Empleos FQHC" }, locale)}
              </Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-stone-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-teal-600" />
              {t({ en: "100% free for candidates", es: "100% gratis para candidatos" }, locale)}
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-teal-600" />
              {t({ en: "English & Spanish", es: "Inglés y Español" }, locale)}
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-teal-600" />
              {t({ en: "FQHC-specific templates", es: "Plantillas específicas para FQHCs" }, locale)}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
