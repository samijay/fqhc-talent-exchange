"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  MapPin,
  Briefcase,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileDown,
  FileText,
  BookOpen,
} from "lucide-react";
import { SALARY_BENCHMARKS } from "@/lib/job-posting-templates";
import { REGIONAL_MULTIPLIERS, adjustSalary } from "@/lib/career-pathways";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function fmt(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

type ExperienceBracket = "0-2" | "3-5" | "6-10" | "10+";

/**
 * Apply an experience-based adjustment to the base percentile values.
 * Entry-level (0-2 years): base × 0.92 (slightly below P25-P50 midpoint)
 * Mid (3-5 years): base × 1.0 (market average)
 * Senior (6-10 years): base × 1.08 (above average)
 * Expert (10+ years): base × 1.15 (top-of-range)
 */
function experienceMultiplier(bracket: ExperienceBracket): number {
  switch (bracket) {
    case "0-2":
      return 0.92;
    case "3-5":
      return 1.0;
    case "6-10":
      return 1.08;
    case "10+":
      return 1.15;
  }
}

type PercentileResult = {
  percentile: number;
  label: string;
  esLabel: string;
  color: string;
  bgColor: string;
  recommendation: string;
  esRecommendation: string;
};

function computePercentile(
  salary: number,
  p25: number,
  p50: number,
  p75: number
): PercentileResult {
  // Linear interpolation across the range
  if (salary <= p25) {
    const pct = Math.max(0, Math.round((salary / p25) * 25));
    return {
      percentile: pct,
      label: "Below Market",
      esLabel: "Por debajo del mercado",
      color: "text-red-700",
      bgColor: "bg-red-50 border-red-200",
      recommendation:
        "Your salary is below the 25th percentile for this role and region. You have strong grounds to negotiate higher compensation. Prepare market data and highlight your experience.",
      esRecommendation:
        "Su salario esta por debajo del percentil 25 para este puesto y region. Tiene bases solidas para negociar una compensacion mas alta.",
    };
  }
  if (salary <= p50) {
    const pct = 25 + Math.round(((salary - p25) / (p50 - p25)) * 25);
    return {
      percentile: pct,
      label: "Below Average",
      esLabel: "Por debajo del promedio",
      color: "text-amber-700",
      bgColor: "bg-amber-50 border-amber-200",
      recommendation:
        "Your salary is between the 25th and 50th percentile. Consider negotiating for a raise by presenting your certifications, bilingual skills, or program experience (ECM, 340B, etc.).",
      esRecommendation:
        "Su salario esta entre el percentil 25 y 50. Considere negociar un aumento presentando sus certificaciones, habilidades bilingues o experiencia en programas.",
    };
  }
  if (salary <= p75) {
    const pct = 50 + Math.round(((salary - p50) / (p75 - p50)) * 25);
    return {
      percentile: pct,
      label: "Competitive",
      esLabel: "Competitivo",
      color: "text-teal-700",
      bgColor: "bg-teal-50 border-teal-200",
      recommendation:
        "Strong offer. Your compensation is above the market median. Focus negotiations on benefits: NHSC loan repayment eligibility, PTO, professional development, and flexible scheduling.",
      esRecommendation:
        "Oferta fuerte. Su compensacion esta por encima de la mediana del mercado. Enfoque la negociacion en beneficios: pago de prestamos NHSC, vacaciones y desarrollo profesional.",
    };
  }
  const pct = Math.min(99, 75 + Math.round(((salary - p75) / (p75 * 0.3)) * 24));
  return {
    percentile: pct,
    label: "Above Market",
    esLabel: "Por encima del mercado",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50 border-emerald-200",
    recommendation:
      "Excellent offer. Your salary is above the 75th percentile. This is a premium package — make sure the role, mission, and culture are the right fit for you.",
    esRecommendation:
      "Excelente oferta. Su salario esta por encima del percentil 75. Asegurese de que el puesto, la mision y la cultura sean adecuados para usted.",
  };
}

/* ------------------------------------------------------------------ */
/*  Departments for grouping the role selector                         */
/* ------------------------------------------------------------------ */

const ROLE_DEPARTMENTS: Record<string, string> = {
  chw: "Care Coordination",
  care_coordinator: "Care Coordination",
  case_manager: "Care Coordination",
  patient_navigator: "Care Coordination",
  health_educator: "Care Coordination",
  referral_coordinator: "Care Coordination",
  medical_assistant: "Clinical",
  nurse_rn: "Clinical",
  nurse_lvn: "Clinical",
  nurse_practitioner: "Clinical",
  physician: "Clinical",
  physician_assistant: "Clinical",
  phlebotomist: "Clinical",
  behavioral_health: "Behavioral Health",
  social_worker: "Behavioral Health",
  lmft: "Behavioral Health",
  psychologist: "Behavioral Health",
  psychiatrist: "Behavioral Health",
  psychiatric_np: "Behavioral Health",
  dentist: "Dental",
  dental_hygienist: "Dental",
  dental_assistant: "Dental",
  pharmacist: "Pharmacy",
  pharmacy_tech: "Pharmacy",
  patient_services: "Admin & Revenue",
  call_center: "Admin & Revenue",
  enrollment_specialist: "Admin & Revenue",
  revenue_cycle: "Admin & Revenue",
  billing_specialist: "Admin & Revenue",
  medical_coder: "Admin & Revenue",
  hr_manager: "Back Office",
  accountant: "Back Office",
  payroll_specialist: "Back Office",
  finance_manager: "Back Office",
  program_manager: "Leadership",
  medical_director: "Leadership",
  director: "Leadership",
  ceo: "Leadership",
  cfo: "Leadership",
  cmo: "Leadership",
  coo: "Leadership",
  chro: "Leadership",
  dental_director: "Leadership",
  behavioral_health_director: "Leadership",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function SalaryCalculatorPage() {
  const locale = useLocale();
  const isEs = locale === "es";

  const [roleId, setRoleId] = useState("");
  const [regionIdx, setRegionIdx] = useState<number | "">("");
  const [salary, setSalary] = useState<number | "">("");
  const [experience, setExperience] = useState<ExperienceBracket | "">("");

  // Group roles by department for the selector
  const groupedRoles = useMemo(() => {
    const groups: Record<string, typeof SALARY_BENCHMARKS> = {};
    SALARY_BENCHMARKS.forEach((r) => {
      const dept = ROLE_DEPARTMENTS[r.roleId] || "Other";
      if (!groups[dept]) groups[dept] = [];
      groups[dept].push(r);
    });
    return groups;
  }, []);

  // Calculate results
  const result = useMemo(() => {
    if (!roleId || regionIdx === "" || !salary || !experience) return null;

    const benchmark = SALARY_BENCHMARKS.find((b) => b.roleId === roleId);
    const region = REGIONAL_MULTIPLIERS[regionIdx as number];
    if (!benchmark || !region) return null;

    const expMult = experienceMultiplier(experience);
    const regMult = region.multiplier;

    // Adjusted P25/P50/P75 for region + experience
    const adjP25 = adjustSalary(benchmark.p25 * expMult, regMult);
    const adjP50 = adjustSalary(benchmark.p50 * expMult, regMult);
    const adjP75 = adjustSalary(benchmark.p75 * expMult, regMult);

    const percentileResult = computePercentile(
      salary as number,
      adjP25,
      adjP50,
      adjP75
    );

    return {
      benchmark,
      region,
      adjP25,
      adjP50,
      adjP75,
      ...percentileResult,
    };
  }, [roleId, regionIdx, salary, experience]);

  const isComplete = roleId && regionIdx !== "" && salary && experience;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-800 via-teal-900 to-stone-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {isEs
              ? "Calculadora Salarial FQHC"
              : "FQHC Salary Calculator"}
          </h1>
          <p className="text-lg text-teal-100 max-w-2xl mb-8">
            {isEs
              ? "Descubra si su oferta salarial es competitiva. Compare su compensacion con datos de mercado de mas de 1,000 puestos en centros de salud de California."
              : "Find out if your salary offer is competitive. Compare your compensation against market data from 1,000+ California FQHC positions across 46 roles and 9 regions."}
          </p>
          <div className="flex gap-6 md:gap-12">
            <div>
              <div className="text-2xl md:text-3xl font-bold">{SALARY_BENCHMARKS.length}</div>
              <div className="text-sm text-teal-100">{isEs ? "Roles" : "Roles"}</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">{REGIONAL_MULTIPLIERS.length}</div>
              <div className="text-sm text-teal-100">{isEs ? "Regiones" : "Regions"}</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">1,000+</div>
              <div className="text-sm text-teal-100">{isEs ? "Empleos analizados" : "Jobs analyzed"}</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Input Form — left 2 cols */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-stone-900">
              {isEs ? "Sus datos" : "Your details"}
            </h2>

            {/* Role */}
            <div>
              <label
                htmlFor="role"
                className="flex items-center gap-2 text-sm font-semibold text-stone-700 mb-2"
              >
                <Briefcase className="size-4 text-teal-700" />
                {isEs ? "Puesto" : "Role"}
              </label>
              <select
                id="role"
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
              >
                <option value="">{isEs ? "Seleccione un puesto..." : "Select a role..."}</option>
                {Object.entries(groupedRoles).map(([dept, roles]) => (
                  <optgroup key={dept} label={dept}>
                    {roles.map((r) => (
                      <option key={r.roleId} value={r.roleId}>
                        {isEs ? r.esLabel : r.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Region */}
            <div>
              <label
                htmlFor="region"
                className="flex items-center gap-2 text-sm font-semibold text-stone-700 mb-2"
              >
                <MapPin className="size-4 text-teal-700" />
                {isEs ? "Region de California" : "California Region"}
              </label>
              <select
                id="region"
                value={regionIdx}
                onChange={(e) =>
                  setRegionIdx(e.target.value === "" ? "" : Number(e.target.value))
                }
                className="w-full px-4 py-3 border border-stone-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
              >
                <option value="">{isEs ? "Seleccione una region..." : "Select a region..."}</option>
                {REGIONAL_MULTIPLIERS.map((r, i) => (
                  <option key={r.region} value={i}>
                    {isEs ? r.esRegion : r.region}
                  </option>
                ))}
              </select>
            </div>

            {/* Salary */}
            <div>
              <label
                htmlFor="salary"
                className="flex items-center gap-2 text-sm font-semibold text-stone-700 mb-2"
              >
                <DollarSign className="size-4 text-teal-700" />
                {isEs ? "Salario anual (oferta o actual)" : "Annual salary (offered or current)"}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 font-medium">$</span>
                <input
                  id="salary"
                  type="number"
                  min={0}
                  step={1000}
                  value={salary}
                  onChange={(e) =>
                    setSalary(e.target.value === "" ? "" : Number(e.target.value))
                  }
                  placeholder={isEs ? "Ej: 65000" : "e.g. 65000"}
                  className="w-full pl-8 pr-4 py-3 border border-stone-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Experience */}
            <div>
              <label
                htmlFor="experience"
                className="flex items-center gap-2 text-sm font-semibold text-stone-700 mb-2"
              >
                <Clock className="size-4 text-teal-700" />
                {isEs ? "Anos de experiencia" : "Years of experience"}
              </label>
              <select
                id="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value as ExperienceBracket | "")}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
              >
                <option value="">{isEs ? "Seleccione..." : "Select..."}</option>
                <option value="0-2">{isEs ? "0-2 anos (principiante)" : "0-2 years (entry-level)"}</option>
                <option value="3-5">{isEs ? "3-5 anos (nivel medio)" : "3-5 years (mid-level)"}</option>
                <option value="6-10">{isEs ? "6-10 anos (senior)" : "6-10 years (senior)"}</option>
                <option value="10+">{isEs ? "10+ anos (experto)" : "10+ years (expert)"}</option>
              </select>
            </div>

            {/* Regional multiplier note */}
            {regionIdx !== "" && (
              <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
                <p className="text-sm text-stone-600">
                  <span className="font-semibold">{isEs ? "Ajuste regional:" : "Regional adjustment:"}</span>{" "}
                  {REGIONAL_MULTIPLIERS[regionIdx as number].multiplier > 1
                    ? `+${Math.round((REGIONAL_MULTIPLIERS[regionIdx as number].multiplier - 1) * 100)}%`
                    : `${Math.round((REGIONAL_MULTIPLIERS[regionIdx as number].multiplier - 1) * 100)}%`}
                  {" — "}
                  {isEs
                    ? REGIONAL_MULTIPLIERS[regionIdx as number].esDescription
                    : REGIONAL_MULTIPLIERS[regionIdx as number].description}
                </p>
              </div>
            )}
          </div>

          {/* Results — right 3 cols */}
          <div className="lg:col-span-3">
            {!isComplete && (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center text-stone-400">
                  <DollarSign className="size-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium">
                    {isEs
                      ? "Complete los campos para ver sus resultados"
                      : "Fill in all fields to see your results"}
                  </p>
                </div>
              </div>
            )}

            {isComplete && result && (
              <div className="space-y-8">
                {/* Percentile Badge */}
                <div className={`rounded-xl border-2 p-8 ${result.bgColor}`}>
                  <div className="flex items-center gap-3 mb-4">
                    {result.percentile >= 50 ? (
                      <TrendingUp className={`size-8 ${result.color}`} />
                    ) : (
                      <TrendingDown className={`size-8 ${result.color}`} />
                    )}
                    <div>
                      <h3 className={`text-3xl font-bold ${result.color}`}>
                        {isEs ? result.esLabel : result.label}
                      </h3>
                      <p className="text-sm text-stone-600">
                        {isEs
                          ? `Su salario esta en el percentil ~${result.percentile} para ${isEs ? result.benchmark.esLabel : result.benchmark.label} en ${isEs ? result.region.esRegion : result.region.region}`
                          : `Your salary is at approximately the ${result.percentile}th percentile for ${result.benchmark.label} in ${result.region.region}`}
                      </p>
                    </div>
                  </div>

                  <p className="text-base text-stone-700 leading-relaxed">
                    {isEs ? result.esRecommendation : result.recommendation}
                  </p>
                </div>

                {/* Visual Comparison Bar */}
                <div className="bg-stone-50 rounded-xl border border-stone-200 p-8">
                  <h3 className="text-lg font-bold text-stone-900 mb-6">
                    {isEs ? "Su salario vs. el mercado" : "Your salary vs. market"}
                  </h3>

                  {/* Range bar */}
                  <div className="relative mb-8">
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                      <span>P25: {fmt(result.adjP25)}</span>
                      <span>P50: {fmt(result.adjP50)}</span>
                      <span>P75: {fmt(result.adjP75)}</span>
                    </div>
                    <div className="relative h-8 bg-stone-200 rounded-full overflow-hidden">
                      {/* P25-P50 segment */}
                      <div
                        className="absolute inset-y-0 left-0 bg-amber-300 rounded-l-full"
                        style={{ width: "50%" }}
                      />
                      {/* P50-P75 segment */}
                      <div
                        className="absolute inset-y-0 bg-teal-400"
                        style={{ left: "50%", width: "25%" }}
                      />
                      {/* Above P75 */}
                      <div
                        className="absolute inset-y-0 bg-emerald-400 rounded-r-full"
                        style={{ left: "75%", width: "25%" }}
                      />

                      {/* User salary marker */}
                      {(() => {
                        const rangeMin = result.adjP25 * 0.7;
                        const rangeMax = result.adjP75 * 1.3;
                        const pct = Math.max(
                          2,
                          Math.min(
                            98,
                            ((Number(salary) - rangeMin) / (rangeMax - rangeMin)) * 100
                          )
                        );
                        return (
                          <div
                            className="absolute top-0 bottom-0 w-1 bg-stone-900 z-10"
                            style={{ left: `${pct}%` }}
                          >
                            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-stone-900 text-white text-xs px-2 py-1 rounded font-semibold">
                              {fmt(Number(salary))}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                    <div className="flex items-center justify-between text-xs text-stone-400 mt-2">
                      <span>{isEs ? "Por debajo del mercado" : "Below market"}</span>
                      <span>{isEs ? "Promedio" : "Average"}</span>
                      <span>{isEs ? "Por encima" : "Above market"}</span>
                    </div>
                  </div>

                  {/* P25/P50/P75 breakdown */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "P25", value: result.adjP25, desc: isEs ? "Percentil 25" : "25th Percentile" },
                      { label: "P50", value: result.adjP50, desc: isEs ? "Mediana" : "Median" },
                      { label: "P75", value: result.adjP75, desc: isEs ? "Percentil 75" : "75th Percentile" },
                    ].map((item) => (
                      <div key={item.label} className="text-center p-4 bg-white rounded-lg border border-stone-200">
                        <div className="text-xs font-semibold text-stone-500 mb-1">{item.desc}</div>
                        <div className="text-xl font-bold text-stone-900">{fmt(item.value)}</div>
                        <div className="text-xs text-stone-400 mt-1">
                          {Number(salary) >= item.value ? (
                            <span className="text-teal-600">
                              +{fmt(Number(salary) - item.value)} {isEs ? "arriba" : "above"}
                            </span>
                          ) : (
                            <span className="text-red-600">
                              {fmt(Number(salary) - item.value)} {isEs ? "abajo" : "below"}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Negotiation Tips */}
                <div className="bg-white rounded-xl border border-stone-200 p-8">
                  <h3 className="text-lg font-bold text-stone-900 mb-4">
                    {result.percentile < 50
                      ? (isEs ? "Como negociar mas" : "How to negotiate higher")
                      : (isEs ? "Optimice su paquete total" : "Optimize your total package")}
                  </h3>
                  <ul className="space-y-3">
                    {result.percentile < 50 ? (
                      <>
                        <NegotiationTip
                          icon={<CheckCircle2 className="size-5 text-teal-600" />}
                          text={isEs ? "Presente datos de mercado de esta calculadora al empleador" : "Present market data from this calculator to the employer"}
                        />
                        <NegotiationTip
                          icon={<CheckCircle2 className="size-5 text-teal-600" />}
                          text={isEs ? "Destaque habilidades bilingues (aumento de 5-15%)" : "Highlight bilingual skills (5-15% premium in CA FQHCs)"}
                        />
                        <NegotiationTip
                          icon={<CheckCircle2 className="size-5 text-teal-600" />}
                          text={isEs ? "Mencione certificaciones relevantes (CHW, PCMH, CPC)" : "Mention relevant certifications (CHW, PCMH, CPC)"}
                        />
                        <NegotiationTip
                          icon={<AlertTriangle className="size-5 text-amber-500" />}
                          text={isEs ? "El salario minimo FQHC en CA es $21/hr ($43,680/ano) bajo SB 525" : "CA FQHC minimum wage is $21/hr ($43,680/yr) under SB 525"}
                        />
                      </>
                    ) : (
                      <>
                        <NegotiationTip
                          icon={<CheckCircle2 className="size-5 text-teal-600" />}
                          text={isEs ? "Pregunte sobre elegibilidad para pago de prestamos NHSC" : "Ask about NHSC loan repayment eligibility (up to $50K)"}
                        />
                        <NegotiationTip
                          icon={<CheckCircle2 className="size-5 text-teal-600" />}
                          text={isEs ? "Negocie mas PTO, horario flexible o trabajo remoto" : "Negotiate more PTO, flexible scheduling, or remote work"}
                        />
                        <NegotiationTip
                          icon={<CheckCircle2 className="size-5 text-teal-600" />}
                          text={isEs ? "Pregunte sobre programas de desarrollo profesional" : "Ask about professional development and tuition reimbursement"}
                        />
                        <NegotiationTip
                          icon={<CheckCircle2 className="size-5 text-teal-600" />}
                          text={isEs ? "Considere la mision, cultura y oportunidades de crecimiento" : "Consider mission fit, culture, and growth opportunities"}
                        />
                      </>
                    )}
                  </ul>
                </div>

                {/* Related Resources */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <Link
                    href="/salary-report"
                    className="flex items-center gap-3 p-4 rounded-lg border border-stone-200 hover:border-teal-300 hover:bg-teal-50 transition-colors group"
                  >
                    <FileDown className="size-5 text-teal-700" />
                    <div>
                      <div className="text-sm font-semibold text-stone-900 group-hover:text-teal-700">
                        {isEs ? "Informe Salarial PDF" : "Salary Report PDF"}
                      </div>
                      <div className="text-xs text-stone-500">
                        {isEs ? "Descargar gratis" : "Free download"}
                      </div>
                    </div>
                    <ArrowRight className="size-4 text-stone-400 ml-auto" />
                  </Link>
                  <Link
                    href="/salary-data"
                    className="flex items-center gap-3 p-4 rounded-lg border border-stone-200 hover:border-teal-300 hover:bg-teal-50 transition-colors group"
                  >
                    <FileText className="size-5 text-teal-700" />
                    <div>
                      <div className="text-sm font-semibold text-stone-900 group-hover:text-teal-700">
                        {isEs ? "Datos Salariales" : "Full Salary Data"}
                      </div>
                      <div className="text-xs text-stone-500">
                        {isEs ? "46 roles x 9 regiones" : "46 roles x 9 regions"}
                      </div>
                    </div>
                    <ArrowRight className="size-4 text-stone-400 ml-auto" />
                  </Link>
                  <Link
                    href="/resume-builder"
                    className="flex items-center gap-3 p-4 rounded-lg border border-stone-200 hover:border-teal-300 hover:bg-teal-50 transition-colors group"
                  >
                    <BookOpen className="size-5 text-teal-700" />
                    <div>
                      <div className="text-sm font-semibold text-stone-900 group-hover:text-teal-700">
                        {isEs ? "Constructor de CV" : "Resume Builder"}
                      </div>
                      <div className="text-xs text-stone-500">
                        {isEs ? "Gratis para FQHC" : "Free for FQHC roles"}
                      </div>
                    </div>
                    <ArrowRight className="size-4 text-stone-400 ml-auto" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Methodology Note */}
        <div className="mt-16 border-t border-stone-200 pt-8">
          <h3 className="text-lg font-semibold text-stone-900 mb-3">
            {isEs ? "Metodologia" : "Methodology"}
          </h3>
          <p className="text-sm text-stone-600 leading-relaxed max-w-3xl">
            {isEs
              ? "Los datos salariales provienen del Informe Salarial NACHC 2024-2025, la Guia UHC Solutions 2025, datos BLS OEWS de mayo 2024 y 1,273 puestos de trabajo de FQHC de California. Los ajustes regionales reflejan diferencias en el costo de vida. Los ajustes por experiencia se basan en progresion tipica de salarios en la industria. Todos los valores P25 cumplen con el salario minimo de FQHC de California bajo SB 525."
              : "Salary data is sourced from the NACHC 2024-2025 Salary Report, UHC Solutions 2025 Guide, BLS OEWS May 2024 data, and 1,273 scraped California FQHC job listings. Regional adjustments reflect cost-of-living differences across California. Experience adjustments are based on typical industry salary progression. All P25 values comply with the California FQHC minimum wage under SB 525."}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function NegotiationTip({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex-shrink-0">{icon}</span>
      <span className="text-sm text-stone-700">{text}</span>
    </li>
  );
}
