// regional-intelligence.ts
// Helper functions for regional intelligence dashboards
// Aggregates FQHC, layoff, job, and intel data by California region
// Last updated: 2026-02-28

import { californiaFQHCs, type CaliforniaFQHC } from "./california-fqhcs";
import { calculateResilienceScore, type ResilienceScore } from "./fqhc-resilience";
import { californiaFQHCLayoffs } from "./california-fqhc-layoffs";
import { fqhcJobListings } from "./fqhc-job-listings";
import { INTEL_ITEMS, type IntelItem } from "./fqhc-news-intel";

/* ------------------------------------------------------------------ */
/*  Slug mapping                                                       */
/* ------------------------------------------------------------------ */

export const REGION_SLUGS: Record<string, string> = {
  "Los Angeles": "los-angeles",
  "San Diego": "san-diego",
  "Bay Area": "bay-area",
  Sacramento: "sacramento",
  "Central Valley": "central-valley",
  "Inland Empire": "inland-empire",
  "Central Coast": "central-coast",
  "North State": "north-state",
  "North Coast": "north-coast",
};

/** Reverse lookup: slug → region name */
const SLUG_TO_REGION: Record<string, string> = Object.fromEntries(
  Object.entries(REGION_SLUGS).map(([name, slug]) => [slug, name]),
);

export function getRegionBySlug(slug: string): string | null {
  return SLUG_TO_REGION[slug] ?? null;
}

export function getRegionSlug(region: string): string {
  return REGION_SLUGS[region] ?? region.toLowerCase().replace(/\s+/g, "-");
}

export function getAllRegionSlugs(): string[] {
  return Object.values(REGION_SLUGS);
}

/* ------------------------------------------------------------------ */
/*  Regional stats aggregation                                         */
/* ------------------------------------------------------------------ */

export interface RegionalStats {
  fqhcCount: number;
  totalStaff: number;
  totalPatients: number;
  totalSites: number;
  avgResilienceScore: number;
  gradeDistribution: Record<string, number>;
  topPrograms: { name: string; count: number }[];
  ehrSystems: { name: string; count: number }[];
  avgGlassdoor: number | null;
  ratedCount: number;
  layoffCount: number;
  workersAffected: number;
  jobCount: number;
}

/** Parse counts like "1,200" or "12000" to numbers */
function parseCount(s: string): number {
  const n = parseInt(s.replace(/,/g, ""), 10);
  return isNaN(n) ? 0 : n;
}

export function getRegionalFQHCs(region: string): CaliforniaFQHC[] {
  return californiaFQHCs.filter((f) => f.region === region);
}

export function getRegionalResilienceScores(region: string): ResilienceScore[] {
  return getRegionalFQHCs(region).map(calculateResilienceScore);
}

export function getRegionalStats(region: string): RegionalStats {
  const fqhcs = getRegionalFQHCs(region);
  const scores = fqhcs.map(calculateResilienceScore);

  // Staff & patients
  const totalStaff = fqhcs.reduce((sum, f) => sum + parseCount(f.staffCount), 0);
  const totalPatients = fqhcs.reduce((sum, f) => sum + parseCount(f.patientCount), 0);
  const totalSites = fqhcs.reduce((sum, f) => sum + f.siteCount, 0);

  // Resilience
  const avgResilienceScore =
    scores.length > 0
      ? Math.round(scores.reduce((sum, s) => sum + s.overall, 0) / scores.length)
      : 0;

  const gradeDistribution: Record<string, number> = { A: 0, B: 0, C: 0, D: 0, F: 0 };
  for (const s of scores) {
    gradeDistribution[s.grade] = (gradeDistribution[s.grade] || 0) + 1;
  }

  // Programs
  const programCounts: Record<string, number> = {};
  for (const f of fqhcs) {
    for (const p of f.programs) {
      programCounts[p] = (programCounts[p] || 0) + 1;
    }
  }
  const topPrograms = Object.entries(programCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // EHR
  const ehrCounts: Record<string, number> = {};
  for (const f of fqhcs) {
    if (f.ehrSystem) {
      ehrCounts[f.ehrSystem] = (ehrCounts[f.ehrSystem] || 0) + 1;
    }
  }
  const ehrSystems = Object.entries(ehrCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // Glassdoor
  const rated = fqhcs.filter((f) => f.glassdoorRating !== null);
  const avgGlassdoor =
    rated.length > 0
      ? Math.round(
          (rated.reduce((sum, f) => sum + (f.glassdoorRating ?? 0), 0) / rated.length) * 10,
        ) / 10
      : null;

  // Layoffs in this region
  const regionLayoffs = californiaFQHCLayoffs.filter((l) => l.region === region);
  const layoffCount = regionLayoffs.length;
  const workersAffected = regionLayoffs.reduce((sum, l) => sum + l.employeesAffected, 0);

  // Jobs — join through fqhcSlug to find FQHCs in this region
  const regionSlugs = new Set(fqhcs.map((f) => f.slug));
  const jobCount = fqhcJobListings.filter((j) => regionSlugs.has(j.fqhcSlug)).length;

  return {
    fqhcCount: fqhcs.length,
    totalStaff,
    totalPatients,
    totalSites,
    avgResilienceScore,
    gradeDistribution,
    topPrograms,
    ehrSystems,
    avgGlassdoor,
    ratedCount: rated.length,
    layoffCount,
    workersAffected,
    jobCount,
  };
}

/* ------------------------------------------------------------------ */
/*  Regional intel                                                     */
/* ------------------------------------------------------------------ */

/** County-to-region mapping for matching intel items */
const COUNTY_TO_REGION: Record<string, string> = {
  "los angeles": "Los Angeles",
  "san diego": "San Diego",
  imperial: "San Diego",
  "san francisco": "Bay Area",
  alameda: "Bay Area",
  "contra costa": "Bay Area",
  "santa clara": "Bay Area",
  "san mateo": "Bay Area",
  marin: "Bay Area",
  solano: "Bay Area",
  napa: "Bay Area",
  sonoma: "Bay Area",
  sacramento: "Sacramento",
  yolo: "Sacramento",
  placer: "Sacramento",
  "el dorado": "Sacramento",
  fresno: "Central Valley",
  kern: "Central Valley",
  tulare: "Central Valley",
  stanislaus: "Central Valley",
  "san joaquin": "Central Valley",
  merced: "Central Valley",
  madera: "Central Valley",
  kings: "Central Valley",
  riverside: "Inland Empire",
  "san bernardino": "Inland Empire",
  "santa barbara": "Central Coast",
  "san luis obispo": "Central Coast",
  ventura: "Central Coast",
  monterey: "Central Coast",
  "santa cruz": "Central Coast",
  shasta: "North State",
  butte: "North State",
  tehama: "North State",
  siskiyou: "North State",
  humboldt: "North Coast",
  "del norte": "North Coast",
  mendocino: "North Coast",
  lake: "North Coast",
};

export function getRegionalIntel(region: string): IntelItem[] {
  const regionFqhcSlugs = new Set(getRegionalFQHCs(region).map((f) => f.slug));
  const regionLower = region.toLowerCase();

  return [...INTEL_ITEMS]
    .filter((item) => {
      // Direct region match
      if (item.region.toLowerCase() === regionLower) return true;

      // County match (e.g., "Los Angeles County" → "Los Angeles" region)
      const countyMatch = item.region.toLowerCase().replace(" county", "");
      if (COUNTY_TO_REGION[countyMatch]?.toLowerCase() === regionLower) return true;

      // Affected org match — if any affected FQHC is in this region
      if (item.affectedOrgSlugs?.some((slug) => regionFqhcSlugs.has(slug))) return true;

      // Check headline/summary for region name mentions
      const headline = `${item.headline.en} ${item.headline.es}`.toLowerCase();
      const summary = `${item.summary.en} ${item.summary.es}`.toLowerCase();
      if (headline.includes(regionLower) || summary.includes(regionLower)) return true;

      return false;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
