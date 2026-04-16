// okr-ai-critique.ts
// AI touchpoint types and prompt templates for OKR critique
// Used by /api/okr-critique and /api/okr-team-readiness routes
// Includes rule-based fallback when API is unavailable

import type { OKRDomain } from "./fqhc-okr-templates";

/* ------------------------------------------------------------------ */
/*  Request / Response Types                                           */
/* ------------------------------------------------------------------ */

export interface OKRCritiqueRequest {
  objective: string;
  keyResults: string[];
  domain: OKRDomain;
  role?: string; // e.g. "executive_director", "cfo", "clinical_director"
  locale?: "en" | "es";
}

export interface CritiqueScore {
  category: string;
  score: number; // 0-100
  feedback: string;
}

export interface OKRCritiqueResponse {
  overallScore: number; // 0-100
  scores: {
    measurability: CritiqueScore;
    ambition: CritiqueScore;
    fqhcRelevance: CritiqueScore;
    clarity: CritiqueScore;
  };
  suggestions: string[];
  rewriteSuggestion?: {
    objective: string;
    keyResults: string[];
  };
}

export interface TeamReadinessRequest {
  sprintId: string;
  objectives: {
    id: string;
    owner: string;
    domain: OKRDomain;
    text: string;
    keyResults: { text: string; metric?: string; target?: string }[];
  }[];
}

export interface TeamReadinessResponse {
  alignmentScore: number; // 0-100
  coverageScore: number; // 0-100 — how well domains are covered
  qualityScore: number; // 0-100
  gaps: string[];
  conflicts: string[];
  recommendations: string[];
  domainCoverage: Record<OKRDomain, boolean>;
}

/* ------------------------------------------------------------------ */
/*  System prompts for Claude API                                      */
/* ------------------------------------------------------------------ */

export const OKR_CRITIQUE_SYSTEM_PROMPT = `You are an OKR coach specialized in Federally Qualified Health Centers (FQHCs).
You evaluate OKRs based on John Doerr's framework from "Measure What Matters" and Christina Wodtke's "Radical Focus."

Score each dimension 0-100:
- Measurability: Does each Key Result have a specific number, baseline, and target?
- Ambition: Is this a stretch goal (0.6-0.7 target) or sandbagging?
- FQHC Relevance: Does this connect to real FQHC challenges (UDS measures, 340B, HRSA compliance, patient access, workforce retention)?
- Clarity: Could any FQHC team member understand this without explanation?

Provide 2-3 specific, actionable suggestions for improvement.
If the OKR is fixable, provide a rewritten version.

IMPORTANT: Be encouraging but honest. Many FQHC leaders are new to OKRs.
Respond in JSON format matching the OKRCritiqueResponse interface.`;

export const TEAM_READINESS_SYSTEM_PROMPT = `You are an OKR alignment coach for FQHC executive teams.
Evaluate a team's full OKR set for:
1. Strategic alignment — do objectives work together toward a unified vision?
2. Domain coverage — are all critical FQHC areas addressed (revenue, workforce, patients, operations)?
3. Quality — do individual OKRs meet the measurability and ambition standards?
4. Conflicts — do any objectives contradict or compete for the same resources?
5. Gaps — what critical areas are missing?

Provide specific, actionable recommendations the team can implement immediately.
Respond in JSON format matching the TeamReadinessResponse interface.`;

/* ------------------------------------------------------------------ */
/*  Rule-based fallback critique                                       */
/* ------------------------------------------------------------------ */

/** Fallback scoring when Claude API is unavailable */
export function generateFallbackCritique(
  request: OKRCritiqueRequest
): OKRCritiqueResponse {
  const { objective, keyResults } = request;

  // Measurability: check for numbers in key results
  const hasNumbers = keyResults.map((kr) => /\d/.test(kr));
  const hasBaseline = keyResults.map((kr) =>
    /from\s+\d|baseline|current/i.test(kr)
  );
  const hasTarget = keyResults.map((kr) => /to\s+\d|target|by\s+Q\d/i.test(kr));

  const measurabilityScore = Math.round(
    (hasNumbers.filter(Boolean).length / Math.max(keyResults.length, 1)) * 60 +
      (hasBaseline.filter(Boolean).length / Math.max(keyResults.length, 1)) *
        20 +
      (hasTarget.filter(Boolean).length / Math.max(keyResults.length, 1)) * 20
  );

  // Ambition: check objective language strength
  const strongVerbs = [
    "transform",
    "eliminate",
    "revolutionize",
    "build",
    "create",
    "achieve",
    "establish",
    "become",
  ];
  const weakVerbs = ["improve", "increase", "reduce", "work on", "try"];
  const objLower = objective.toLowerCase();
  const hasStrongVerb = strongVerbs.some((v) => objLower.includes(v));
  const hasWeakVerb = weakVerbs.some((v) => objLower.startsWith(v));
  const hasNumberInObjective = /\d/.test(objective);
  let ambitionScore = 50;
  if (hasStrongVerb) ambitionScore += 25;
  if (hasWeakVerb) ambitionScore -= 15;
  if (hasNumberInObjective) ambitionScore -= 10; // numbers belong in KRs
  ambitionScore = Math.max(0, Math.min(100, ambitionScore));

  // FQHC Relevance: check for healthcare keywords
  const fqhcKeywords = [
    "patient",
    "provider",
    "uds",
    "chqr",
    "hrsa",
    "340b",
    "sliding fee",
    "telehealth",
    "fqhc",
    "community health",
    "clinical",
    "behavioral health",
    "dental",
    "pharmacy",
    "medicaid",
    "uninsured",
    "under-resourced",
  ];
  const allText = [objective, ...keyResults].join(" ").toLowerCase();
  const fqhcMatches = fqhcKeywords.filter((kw) => allText.includes(kw));
  const fqhcRelevanceScore = Math.min(
    100,
    Math.round((fqhcMatches.length / 3) * 100)
  );

  // Clarity
  const avgLength =
    [objective, ...keyResults].reduce((s, t) => s + t.length, 0) /
    (1 + keyResults.length);
  const clarityScore =
    avgLength > 20 && avgLength < 150
      ? 70
      : avgLength <= 20
        ? 40
        : 50;

  const overallScore = Math.round(
    (measurabilityScore + ambitionScore + fqhcRelevanceScore + clarityScore) / 4
  );

  // Generate suggestions
  const suggestions: string[] = [];
  if (measurabilityScore < 60) {
    suggestions.push(
      "Add specific numbers to your Key Results. Use the format: '[Metric] from [baseline] to [target] by [date].'"
    );
  }
  if (ambitionScore < 50) {
    suggestions.push(
      "Use a stronger action verb in your Objective. Instead of 'improve' or 'increase,' try 'transform,' 'eliminate,' or 'build.'"
    );
  }
  if (hasNumberInObjective) {
    suggestions.push(
      "Move the number from your Objective into a Key Result. Objectives should be qualitative and inspirational."
    );
  }
  if (fqhcRelevanceScore < 50) {
    suggestions.push(
      "Connect your OKR to specific FQHC metrics (UDS measures, CHQR benchmarks, 340B data) to make it more actionable."
    );
  }
  if (keyResults.length < 2) {
    suggestions.push(
      "Add 2-3 Key Results to fully measure progress toward your Objective. Mix leading and lagging indicators."
    );
  }
  if (suggestions.length === 0) {
    suggestions.push(
      "Strong OKR! Consider reviewing with your team to ensure alignment with organizational priorities."
    );
  }

  return {
    overallScore,
    scores: {
      measurability: {
        category: "Measurability",
        score: measurabilityScore,
        feedback:
          measurabilityScore >= 70
            ? "Key Results have clear metrics and targets."
            : "Key Results need more specific numbers, baselines, and targets.",
      },
      ambition: {
        category: "Ambition",
        score: ambitionScore,
        feedback:
          ambitionScore >= 70
            ? "The Objective is appropriately ambitious."
            : "The Objective could be more aspirational — aim for a stretch goal.",
      },
      fqhcRelevance: {
        category: "FQHC Relevance",
        score: fqhcRelevanceScore,
        feedback:
          fqhcRelevanceScore >= 70
            ? "Well-connected to FQHC operational context."
            : "Consider connecting to specific FQHC data sources (UDS, CHQR, EHR).",
      },
      clarity: {
        category: "Clarity",
        score: clarityScore,
        feedback:
          clarityScore >= 70
            ? "Clear and understandable by any team member."
            : "Simplify the language so any staff member can understand the goal.",
      },
    },
    suggestions,
  };
}

/* ------------------------------------------------------------------ */
/*  Fallback team readiness                                            */
/* ------------------------------------------------------------------ */

export function generateFallbackReadiness(
  request: TeamReadinessRequest
): TeamReadinessResponse {
  const { objectives } = request;

  // Domain coverage
  const coveredDomains = new Set(objectives.map((o) => o.domain));
  const allDomains: OKRDomain[] = [
    "revenue-resilience",
    "workforce-retention",
    "patient-access",
    "operational-efficiency",
    "cross-department",
  ];
  const domainCoverage = Object.fromEntries(
    allDomains.map((d) => [d, coveredDomains.has(d)])
  ) as Record<OKRDomain, boolean>;
  const coverageScore = Math.round(
    (coveredDomains.size / allDomains.length) * 100
  );

  // Quality — check if KRs have numbers
  let totalKRs = 0;
  let measurableKRs = 0;
  for (const obj of objectives) {
    for (const kr of obj.keyResults) {
      totalKRs++;
      if (/\d/.test(kr.text)) measurableKRs++;
    }
  }
  const qualityScore =
    totalKRs > 0 ? Math.round((measurableKRs / totalKRs) * 100) : 0;

  // Alignment — simple heuristic based on objective count
  const alignmentScore = Math.min(
    100,
    objectives.length >= 3 && objectives.length <= 7
      ? 75
      : objectives.length < 3
        ? 50
        : 60
  );

  // Gaps
  const gaps: string[] = [];
  const missingDomains = allDomains.filter((d) => !coveredDomains.has(d));
  for (const domain of missingDomains) {
    gaps.push(`No objectives cover the "${domain}" domain.`);
  }
  if (totalKRs < objectives.length * 2) {
    gaps.push(
      "Some objectives have fewer than 2 Key Results — add more to fully measure progress."
    );
  }

  // Recommendations
  const recommendations: string[] = [];
  if (missingDomains.length > 0) {
    recommendations.push(
      `Consider adding objectives for: ${missingDomains.join(", ")}.`
    );
  }
  if (qualityScore < 70) {
    recommendations.push(
      "Review Key Results for measurability — each should have a baseline, target, and deadline."
    );
  }
  if (objectives.length > 7) {
    recommendations.push(
      "You have too many objectives. Focus on 3-5 per quarter for maximum impact."
    );
  }
  recommendations.push(
    "Schedule a team review session to discuss dependencies between objectives."
  );

  return {
    alignmentScore,
    coverageScore,
    qualityScore,
    gaps,
    conflicts: [],
    recommendations,
    domainCoverage,
  };
}
