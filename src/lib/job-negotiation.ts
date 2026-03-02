// job-negotiation.ts
// Negotiation context engine — union vs non-union salary intelligence
// Used by the enhanced job board to show negotiation indicators and tips

import type { CaliforniaFQHC } from "./california-fqhcs";
import { fqhcSalaryRanges } from "./california-fqhcs";
import { SALARY_BENCHMARKS } from "./job-posting-templates";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type SalaryType = "fixed-scale" | "negotiable" | "unknown";
export type BenchmarkPosition = "below-market" | "at-market" | "above-market";

export interface NegotiationContext {
  isUnion: boolean;
  unionName: string | null;
  salaryType: SalaryType;
  benchmarkPosition: BenchmarkPosition;
  benchmarkP50: number | null;
  tips: { en: string; es: string }[];
}

/* ------------------------------------------------------------------ */
/*  Role normalization — map job titles to benchmark keys              */
/* ------------------------------------------------------------------ */

const ROLE_NORMALIZATION: Record<string, string> = {
  // Direct matches
  "Community Health Worker": "Community Health Worker",
  "Care Coordinator": "Care Coordinator",
  "Case Manager": "Case Manager",
  "Patient Navigator": "Patient Navigator",
  "Health Educator": "Health Educator",
  "Referral Coordinator": "Referral Coordinator",
  "Medical Assistant": "Medical Assistant",
  "Registered Nurse": "Registered Nurse",
  "Licensed Vocational Nurse": "Licensed Vocational Nurse",
  "Nurse Practitioner": "Nurse Practitioner",
  "Physician": "Physician",
  "Physician Assistant": "Physician Assistant",
  "Phlebotomist": "Phlebotomist",
  "Licensed Clinical Social Worker": "Licensed Clinical Social Worker",
  "Licensed Marriage & Family Therapist": "Licensed Marriage & Family Therapist",
  "Psychologist": "Psychologist",
  "Dentist": "Dentist",
  "Dental Hygienist": "Dental Hygienist",
  "Dental Assistant": "Dental Assistant",
  "Pharmacist": "Pharmacist",
  "Pharmacy Technician": "Pharmacy Technician",
  "Patient Services Representative": "Patient Services Representative",
  "Call Center Specialist": "Call Center Specialist",
  "Health Enrollment Navigator": "Health Enrollment Navigator",
  "Revenue Cycle Specialist": "Revenue Cycle Specialist",
  "Billing Specialist": "Billing Specialist",
  "Medical Coder": "Medical Coder",
  "Medical Director": "Medical Director",
  "Director": "Director",
  "Program Manager": "Program Manager",
  // Common variations
  "Behavioral Health Specialist": "Licensed Clinical Social Worker",
  "Social Worker": "Licensed Clinical Social Worker",
  "EHR Analyst": "Revenue Cycle Specialist",
  "Registered Dietitian": "Health Educator",
};

function normalizeRole(roleType: string): string | null {
  if (ROLE_NORMALIZATION[roleType]) return ROLE_NORMALIZATION[roleType];
  // Fuzzy match by partial string
  const lower = roleType.toLowerCase();
  for (const [key, value] of Object.entries(ROLE_NORMALIZATION)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      return value;
    }
  }
  return null;
}

/* ------------------------------------------------------------------ */
/*  Benchmark comparison                                               */
/* ------------------------------------------------------------------ */

export function getBenchmarkP50(roleType: string): number | null {
  const normalized = normalizeRole(roleType);
  if (!normalized) return null;
  const range = fqhcSalaryRanges[normalized as keyof typeof fqhcSalaryRanges];
  if (range) return range.avg;
  // Fallback to SALARY_BENCHMARKS
  const benchmark = SALARY_BENCHMARKS.find(
    (b) => b.label.toLowerCase() === normalized.toLowerCase()
  );
  return benchmark?.p50 ?? null;
}

export function getBenchmarkComparison(
  salaryMin: number,
  salaryMax: number,
  roleType: string
): BenchmarkPosition {
  const p50 = getBenchmarkP50(roleType);
  if (!p50) return "at-market";
  const midpoint = (salaryMin + salaryMax) / 2;
  const diff = (midpoint - p50) / p50;
  if (diff < -0.08) return "below-market";
  if (diff > 0.08) return "above-market";
  return "at-market";
}

/* ------------------------------------------------------------------ */
/*  Negotiation tips by union status                                   */
/* ------------------------------------------------------------------ */

const UNION_TIPS: { en: string; es: string }[] = [
  {
    en: "Salary set by collective bargaining agreement — focus on step placement based on your experience",
    es: "Salario establecido por convenio colectivo — enfócate en la ubicación de escalón según tu experiencia",
  },
  {
    en: "Ask about longevity steps, shift differentials, and bilingual pay premium",
    es: "Pregunta sobre escalones por antigüedad, diferenciales de turno y prima bilingüe",
  },
  {
    en: "Benefits (PTO, retirement, health) are standardized — compare across orgs",
    es: "Los beneficios (PTO, jubilación, salud) son estandarizados — compara entre organizaciones",
  },
  {
    en: "Union representation provides grievance protection and guaranteed annual raises",
    es: "La representación sindical proporciona protección de quejas y aumentos anuales garantizados",
  },
];

const NON_UNION_TIPS: { en: string; es: string }[] = [
  {
    en: "Base salary is negotiable — use P50 benchmark to anchor your ask",
    es: "El salario base es negociable — usa el benchmark P50 para anclar tu pedido",
  },
  {
    en: "Negotiate beyond base: NHSC loan repayment ($75K), CME funds, sign-on bonus, extra PTO",
    es: "Negocia más allá del salario base: NHSC ($75K), fondos CME, bono de firma, PTO extra",
  },
  {
    en: "Bilingual skills + ECM/CCM experience justify 10-15% above mid-range",
    es: "Habilidades bilingües + experiencia ECM/CCM justifican 10-15% sobre el rango medio",
  },
  {
    en: "Best timing: end of fiscal year or new grant awards = most flexibility",
    es: "Mejor momento: fin de año fiscal o nuevas subvenciones = mayor flexibilidad",
  },
];

/* ------------------------------------------------------------------ */
/*  Main function                                                      */
/* ------------------------------------------------------------------ */

export function getJobNegotiationContext(
  salaryMin: number,
  salaryMax: number,
  roleType: string,
  fqhc: CaliforniaFQHC | undefined
): NegotiationContext {
  const isUnion = fqhc?.unionInfo?.unionized === true;
  const unionName = isUnion && fqhc?.unionInfo?.unions?.length
    ? fqhc.unionInfo.unions[0]
    : null;

  return {
    isUnion,
    unionName,
    salaryType: isUnion ? "fixed-scale" : fqhc ? "negotiable" : "unknown",
    benchmarkPosition: getBenchmarkComparison(salaryMin, salaryMax, roleType),
    benchmarkP50: getBenchmarkP50(roleType),
    tips: isUnion ? UNION_TIPS : NON_UNION_TIPS,
  };
}

/* ------------------------------------------------------------------ */
/*  Formatting helpers                                                 */
/* ------------------------------------------------------------------ */

export function formatSalaryCompact(amount: number): string {
  if (amount >= 1000) return `$${Math.round(amount / 1000)}K`;
  return `$${amount.toLocaleString()}`;
}

export function getBenchmarkLabel(
  position: BenchmarkPosition,
  locale: string
): { label: string; color: string } {
  const isEs = locale === "es";
  switch (position) {
    case "below-market":
      return {
        label: isEs ? "Bajo mercado" : "Below Market",
        color: "text-amber-700 bg-amber-50",
      };
    case "above-market":
      return {
        label: isEs ? "Sobre mercado" : "Above Market",
        color: "text-green-700 bg-green-50",
      };
    default:
      return {
        label: isEs ? "En mercado" : "At Market",
        color: "text-teal-700 bg-teal-50",
      };
  }
}
