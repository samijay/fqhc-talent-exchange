// fqhc-resilience.ts
// Resilience scorecard for California FQHCs
// Scores each FQHC on 5 dimensions using data from our existing assets
// Last updated: 2026-02-28

import { californiaFQHCs, type CaliforniaFQHC } from "./california-fqhcs";
import { californiaFQHCLayoffs } from "./california-fqhc-layoffs";

export const RESILIENCE_LAST_UPDATED = "2026-02-28";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ResilienceDimension =
  | "program-diversity"
  | "workforce-stability"
  | "data-maturity"
  | "quality-indicators"
  | "financial-positioning";

export interface DimensionScore {
  dimension: ResilienceDimension;
  score: number; // 0-100
  label: { en: string; es: string };
  factors: string[]; // what contributed to this score
}

export interface ResilienceScore {
  slug: string;
  name: string;
  region: string;
  overall: number; // 0-100 composite
  grade: "A" | "B" | "C" | "D" | "F";
  riskLevel: "low" | "moderate" | "high" | "critical";
  dimensions: DimensionScore[];
  dataCompleteness: number; // 0-100: how much data we have
}

/* ------------------------------------------------------------------ */
/*  Dimension metadata                                                 */
/* ------------------------------------------------------------------ */

export const DIMENSION_META: {
  id: ResilienceDimension;
  en: string;
  es: string;
  description: { en: string; es: string };
  weight: number; // 0-1, must sum to 1.0
  color: string;
}[] = [
  {
    id: "program-diversity",
    en: "Program Diversity",
    es: "Diversidad de Programas",
    description: {
      en: "Range of clinical, behavioral health, and community programs offered. More diverse programs = more revenue streams and resilience to single-program cuts.",
      es: "Rango de programas clínicos, de salud conductual y comunitarios. Más programas diversos = más flujos de ingresos y resiliencia.",
    },
    weight: 0.25,
    color: "bg-teal-500",
  },
  {
    id: "workforce-stability",
    en: "Workforce Stability",
    es: "Estabilidad Laboral",
    description: {
      en: "Union status, recent layoff history, labor disputes, and workforce size relative to sites. Stable workforces retain institutional knowledge.",
      es: "Estado sindical, historial de despidos, disputas laborales y tamaño de fuerza laboral. Fuerzas laborales estables retienen conocimiento institucional.",
    },
    weight: 0.2,
    color: "bg-blue-500",
  },
  {
    id: "data-maturity",
    en: "Data Maturity",
    es: "Madurez de Datos",
    description: {
      en: "EHR system, data completeness in our directory, and digital infrastructure signals. FQHCs with modern EHR systems are better positioned for value-based care.",
      es: "Sistema EHR, completitud de datos y señales de infraestructura digital. FQHCs con sistemas EHR modernos están mejor posicionados.",
    },
    weight: 0.15,
    color: "bg-purple-500",
  },
  {
    id: "quality-indicators",
    en: "Quality Indicators",
    es: "Indicadores de Calidad",
    description: {
      en: "Glassdoor rating, known violations, quality scores. Higher quality organizations attract and retain better talent.",
      es: "Calificación Glassdoor, violaciones conocidas, puntuaciones de calidad. Organizaciones de mayor calidad atraen y retienen mejor talento.",
    },
    weight: 0.2,
    color: "bg-amber-500",
  },
  {
    id: "financial-positioning",
    en: "Financial Positioning",
    es: "Posicionamiento Financiero",
    description: {
      en: "Funding vulnerability level, coverage at-risk percentage, scale (patients/sites), and NHSC approval. Larger, diversified FQHCs weather cuts better.",
      es: "Nivel de vulnerabilidad de financiamiento, porcentaje de cobertura en riesgo, escala y aprobación NHSC. FQHCs más grandes y diversificados resisten mejor.",
    },
    weight: 0.2,
    color: "bg-red-500",
  },
];

/* ------------------------------------------------------------------ */
/*  Scoring functions                                                  */
/* ------------------------------------------------------------------ */

function parseNumber(s: string): number {
  // "300,000+" → 300000, "1,500+" → 1500, "95+" → 95
  return parseInt(s.replace(/[^0-9]/g, ""), 10) || 0;
}

const layoffSlugs = new Set(
  californiaFQHCLayoffs
    .filter((l) => l.slug)
    .map((l) => l.slug),
);

function scoreProgramDiversity(fqhc: CaliforniaFQHC): DimensionScore {
  const factors: string[] = [];
  let score = 30; // base

  // Programs count
  const progCount = fqhc.programs.length;
  if (progCount >= 4) {
    score += 30;
    factors.push(`${progCount} active programs (excellent diversity)`);
  } else if (progCount >= 2) {
    score += 20;
    factors.push(`${progCount} active programs (moderate diversity)`);
  } else if (progCount >= 1) {
    score += 10;
    factors.push(`${progCount} active program(s)`);
  } else {
    factors.push("No program data available");
  }

  // ECM/CCM (high-revenue CalAIM programs)
  if (fqhc.programs.includes("ECM")) {
    score += 15;
    factors.push("ECM provider (CalAIM revenue)");
  }
  if (fqhc.programs.includes("CCM")) {
    score += 10;
    factors.push("CCM provider");
  }
  if (fqhc.programs.includes("BH Integration")) {
    score += 10;
    factors.push("Behavioral health integration");
  }

  // Sites as proxy for reach
  if (fqhc.siteCount >= 10) {
    score += 5;
    factors.push(`${fqhc.siteCount} sites (wide geographic reach)`);
  }

  return {
    dimension: "program-diversity",
    score: Math.min(100, score),
    label: { en: "Program Diversity", es: "Diversidad de Programas" },
    factors,
  };
}

function scoreWorkforceStability(fqhc: CaliforniaFQHC): DimensionScore {
  const factors: string[] = [];
  let score = 60; // base — no news is decent news

  // Recent layoffs (major penalty)
  if (layoffSlugs.has(fqhc.slug)) {
    score -= 30;
    factors.push("Recent layoffs tracked in our database");
  } else {
    factors.push("No recent layoffs tracked");
  }

  // Union status (structured labor relations = stability signal)
  if (fqhc.unionInfo?.unionized) {
    score += 10;
    factors.push(`Unionized (${fqhc.unionInfo.unions.join(", ")})`);
  }

  // Labor history (disputes = instability)
  if (fqhc.laborHistory && fqhc.laborHistory.length > 0) {
    const ongoing = fqhc.laborHistory.filter((l) => l.status === "ongoing").length;
    if (ongoing > 0) {
      score -= 15;
      factors.push(`${ongoing} ongoing labor dispute(s)`);
    } else {
      score -= 5;
      factors.push(`${fqhc.laborHistory.length} historical labor event(s) (resolved)`);
    }
  }

  // Staff count as stability signal
  const staffNum = parseNumber(fqhc.staffCount);
  if (staffNum >= 500) {
    score += 10;
    factors.push(`Large workforce (${fqhc.staffCount})`);
  } else if (staffNum >= 100) {
    score += 5;
    factors.push(`Mid-size workforce (${fqhc.staffCount})`);
  } else if (staffNum > 0) {
    factors.push(`Small workforce (${fqhc.staffCount})`);
  }

  // Violations (compliance issues = instability)
  if (fqhc.violations && fqhc.violations.length > 0) {
    const pending = fqhc.violations.filter((v) => v.status !== "resolved").length;
    if (pending > 0) {
      score -= 10;
      factors.push(`${pending} unresolved violation(s)`);
    }
  }

  return {
    dimension: "workforce-stability",
    score: Math.max(0, Math.min(100, score)),
    label: { en: "Workforce Stability", es: "Estabilidad Laboral" },
    factors,
  };
}

function scoreDataMaturity(fqhc: CaliforniaFQHC): DimensionScore {
  const factors: string[] = [];
  let score = 20; // base

  // EHR system
  const modernEHRs = ["OCHIN Epic", "eClinicalWorks", "NextGen", "athenahealth"];
  if (modernEHRs.includes(fqhc.ehrSystem)) {
    score += 30;
    factors.push(`Modern EHR: ${fqhc.ehrSystem}`);
  } else if (fqhc.ehrSystem && fqhc.ehrSystem !== "Other") {
    score += 15;
    factors.push(`EHR: ${fqhc.ehrSystem}`);
  } else {
    factors.push("EHR system unknown or unlisted");
  }

  // Data completeness from our directory
  if (fqhc.dataSource === "curated") {
    score += 25;
    factors.push("Fully curated profile in our directory");
  } else {
    score += 5;
    factors.push("HRSA-imported profile (needs enrichment)");
  }

  // Has careers URL (digital presence)
  if (fqhc.careersUrl) {
    score += 10;
    factors.push("Online careers page available");
  }

  // Has mission statement (organizational maturity)
  if (fqhc.missionStatement) {
    score += 5;
    factors.push("Mission statement documented");
  }

  // Quality data availability
  if (fqhc.qualityScore?.overall) {
    score += 10;
    factors.push("Quality score data available");
  }

  return {
    dimension: "data-maturity",
    score: Math.min(100, score),
    label: { en: "Data Maturity", es: "Madurez de Datos" },
    factors,
  };
}

function scoreQualityIndicators(fqhc: CaliforniaFQHC): DimensionScore {
  const factors: string[] = [];
  let score = 40; // base (no data = middle-of-road)

  // Glassdoor rating
  if (fqhc.glassdoorRating !== null) {
    if (fqhc.glassdoorRating >= 4.0) {
      score += 30;
      factors.push(`Glassdoor rating: ${fqhc.glassdoorRating}/5 (excellent)`);
    } else if (fqhc.glassdoorRating >= 3.5) {
      score += 20;
      factors.push(`Glassdoor rating: ${fqhc.glassdoorRating}/5 (good)`);
    } else if (fqhc.glassdoorRating >= 3.0) {
      score += 10;
      factors.push(`Glassdoor rating: ${fqhc.glassdoorRating}/5 (average)`);
    } else {
      score -= 10;
      factors.push(`Glassdoor rating: ${fqhc.glassdoorRating}/5 (below average)`);
    }
  } else {
    factors.push("No Glassdoor data available");
  }

  // Quality score
  if (fqhc.qualityScore?.overall) {
    if (fqhc.qualityScore.overall >= 80) {
      score += 20;
      factors.push(`Quality score: ${fqhc.qualityScore.overall}/100 (high)`);
    } else if (fqhc.qualityScore.overall >= 60) {
      score += 10;
      factors.push(`Quality score: ${fqhc.qualityScore.overall}/100 (moderate)`);
    } else {
      factors.push(`Quality score: ${fqhc.qualityScore.overall}/100 (needs improvement)`);
    }
  }

  // Violations (negative)
  if (fqhc.violations && fqhc.violations.length > 0) {
    score -= fqhc.violations.length * 8;
    factors.push(`${fqhc.violations.length} known violation(s)`);
  }

  // NHSC approval (quality signal)
  if (fqhc.nhscApproved) {
    score += 10;
    factors.push("NHSC-approved site (attracts talent via loan repayment)");
  }

  return {
    dimension: "quality-indicators",
    score: Math.max(0, Math.min(100, score)),
    label: { en: "Quality Indicators", es: "Indicadores de Calidad" },
    factors,
  };
}

function scoreFinancialPositioning(fqhc: CaliforniaFQHC): DimensionScore {
  const factors: string[] = [];
  let score = 40; // base

  // Funding impact level
  if (fqhc.fundingImpactLevel === "low") {
    score += 25;
    factors.push("Low funding vulnerability");
  } else if (fqhc.fundingImpactLevel === "moderate") {
    score += 10;
    factors.push("Moderate funding vulnerability");
  } else if (fqhc.fundingImpactLevel === "high") {
    score -= 15;
    factors.push("High funding vulnerability");
  }

  // Coverage vulnerability
  if (fqhc.coverageVulnerabilityPercent !== null) {
    if (fqhc.coverageVulnerabilityPercent <= 10) {
      score += 15;
      factors.push(`Low coverage risk (${fqhc.coverageVulnerabilityPercent}% at risk)`);
    } else if (fqhc.coverageVulnerabilityPercent <= 25) {
      score += 5;
      factors.push(`Moderate coverage risk (${fqhc.coverageVulnerabilityPercent}% at risk)`);
    } else {
      score -= 10;
      factors.push(`High coverage risk (${fqhc.coverageVulnerabilityPercent}% at risk)`);
    }
  }

  // Scale (larger = more resilient, generally)
  const patients = parseNumber(fqhc.patientCount);
  if (patients >= 100000) {
    score += 15;
    factors.push(`Large scale (${fqhc.patientCount} patients)`);
  } else if (patients >= 30000) {
    score += 10;
    factors.push(`Mid-size scale (${fqhc.patientCount} patients)`);
  } else if (patients > 0) {
    score += 5;
    factors.push(`Small scale (${fqhc.patientCount} patients)`);
  }

  // NHSC (federal support = funding diversification)
  if (fqhc.nhscApproved) {
    score += 5;
    factors.push("NHSC-approved (federal workforce funding)");
  }

  // ECM (CalAIM revenue diversification)
  if (fqhc.ecmProvider) {
    score += 5;
    factors.push("ECM provider (CalAIM revenue stream)");
  }

  return {
    dimension: "financial-positioning",
    score: Math.max(0, Math.min(100, score)),
    label: { en: "Financial Positioning", es: "Posicionamiento Financiero" },
    factors,
  };
}

/* ------------------------------------------------------------------ */
/*  Composite scoring                                                  */
/* ------------------------------------------------------------------ */

function gradeFromScore(score: number): "A" | "B" | "C" | "D" | "F" {
  if (score >= 80) return "A";
  if (score >= 65) return "B";
  if (score >= 50) return "C";
  if (score >= 35) return "D";
  return "F";
}

function riskFromScore(score: number): "low" | "moderate" | "high" | "critical" {
  if (score >= 70) return "low";
  if (score >= 50) return "moderate";
  if (score >= 35) return "high";
  return "critical";
}

function calculateDataCompleteness(fqhc: CaliforniaFQHC): number {
  let fields = 0;
  const total = 10;

  if (fqhc.patientCount && fqhc.patientCount !== "Unknown") fields++;
  if (fqhc.staffCount && fqhc.staffCount !== "Unknown") fields++;
  if (fqhc.programs.length > 0) fields++;
  if (fqhc.ehrSystem && fqhc.ehrSystem !== "Other") fields++;
  if (fqhc.glassdoorRating !== null) fields++;
  if (fqhc.fundingImpactLevel !== null) fields++;
  if (fqhc.careersUrl) fields++;
  if (fqhc.missionStatement) fields++;
  if (fqhc.qualityScore?.overall) fields++;
  if (fqhc.unionInfo !== null) fields++;

  return Math.round((fields / total) * 100);
}

export function calculateResilienceScore(fqhc: CaliforniaFQHC): ResilienceScore {
  const dimensions = [
    scoreProgramDiversity(fqhc),
    scoreWorkforceStability(fqhc),
    scoreDataMaturity(fqhc),
    scoreQualityIndicators(fqhc),
    scoreFinancialPositioning(fqhc),
  ];

  // Weighted composite
  const overall = Math.round(
    dimensions.reduce((sum, dim, i) => {
      return sum + dim.score * DIMENSION_META[i].weight;
    }, 0),
  );

  return {
    slug: fqhc.slug,
    name: fqhc.name,
    region: fqhc.region,
    overall,
    grade: gradeFromScore(overall),
    riskLevel: riskFromScore(overall),
    dimensions,
    dataCompleteness: calculateDataCompleteness(fqhc),
  };
}

/* ------------------------------------------------------------------ */
/*  Bulk scoring + helpers                                             */
/* ------------------------------------------------------------------ */

let _cachedScores: ResilienceScore[] | null = null;

export function getAllResilienceScores(): ResilienceScore[] {
  if (!_cachedScores) {
    _cachedScores = californiaFQHCs.map(calculateResilienceScore);
  }
  return _cachedScores;
}

export function getResilienceBySlug(slug: string): ResilienceScore | undefined {
  return getAllResilienceScores().find((s) => s.slug === slug);
}

export function getResilienceByRegion(region: string): ResilienceScore[] {
  return getAllResilienceScores().filter((s) => s.region === region);
}

/** Find FQHCs similar to a given one (same region, similar size/programs) */
export function getSimilarFQHCs(
  slug: string,
  limit: number = 3
): { slug: string; name: string; region: string; grade: string; score: number; sharedPrograms: number }[] {
  const target = californiaFQHCs.find((f) => f.slug === slug);
  if (!target) return [];

  const targetScore = calculateResilienceScore(target);
  const targetPrograms = new Set(target.programs);
  const targetPatients = parseInt(target.patientCount.replace(/[^0-9]/g, "")) || 0;

  return californiaFQHCs
    .filter((f) => f.slug !== slug)
    .map((f) => {
      const score = calculateResilienceScore(f);
      const sharedPrograms = f.programs.filter((p) => targetPrograms.has(p)).length;
      const patients = parseInt(f.patientCount.replace(/[^0-9]/g, "")) || 0;

      // Similarity scoring (higher = more similar)
      let similarity = 0;
      if (f.region === target.region) similarity += 40; // same region = strong signal
      similarity += sharedPrograms * 5; // shared programs
      if (f.ehrSystem === target.ehrSystem && f.ehrSystem !== "Unknown") similarity += 10;
      // Size similarity (within 50% range)
      if (targetPatients > 0 && patients > 0) {
        const ratio = Math.min(patients, targetPatients) / Math.max(patients, targetPatients);
        similarity += Math.round(ratio * 20);
      }
      // Score proximity
      similarity += Math.max(0, 10 - Math.abs(targetScore.overall - score.overall) / 5);

      return {
        slug: f.slug,
        name: f.name,
        region: f.region,
        grade: score.grade,
        score: score.overall,
        sharedPrograms,
        _similarity: similarity,
      };
    })
    .sort((a, b) => b._similarity - a._similarity)
    .slice(0, limit)
    .map(({ _similarity, ...rest }) => rest);
}

export function getResilienceStats() {
  const scores = getAllResilienceScores();
  const overalls = scores.map((s) => s.overall);

  const gradeDistribution = {
    A: scores.filter((s) => s.grade === "A").length,
    B: scores.filter((s) => s.grade === "B").length,
    C: scores.filter((s) => s.grade === "C").length,
    D: scores.filter((s) => s.grade === "D").length,
    F: scores.filter((s) => s.grade === "F").length,
  };

  const riskDistribution = {
    low: scores.filter((s) => s.riskLevel === "low").length,
    moderate: scores.filter((s) => s.riskLevel === "moderate").length,
    high: scores.filter((s) => s.riskLevel === "high").length,
    critical: scores.filter((s) => s.riskLevel === "critical").length,
  };

  return {
    total: scores.length,
    averageScore: Math.round(overalls.reduce((a, b) => a + b, 0) / overalls.length),
    highest: Math.max(...overalls),
    lowest: Math.min(...overalls),
    gradeDistribution,
    riskDistribution,
  };
}
