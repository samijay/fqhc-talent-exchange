// market-intelligence.ts
// Aggregation functions that compute unique insights from existing data files
// Used by the /insights dashboard page

import { californiaFQHCs, fqhcSalaryRanges, type CaliforniaFQHC } from "./california-fqhcs";
import { fqhcJobListings, type FQHCJobListing } from "./fqhc-job-listings";
import { californiaFQHCLayoffs, getLayoffStats, type LayoffEntry } from "./california-fqhc-layoffs";
import { SALARY_BENCHMARKS, type SalaryBenchmark } from "./job-posting-templates";
import { policyTimeline, implementationTimeline } from "./funding-impact-data";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface RegionalSnapshot {
  region: string;
  fqhcCount: number;
  totalJobs: number;
  avgSalaryMin: number;
  avgSalaryMax: number;
  recentLayoffs: number; // employees affected in this region
  layoffOrgs: number;
  highVulnerabilityCount: number;
  moderateVulnerabilityCount: number;
  lowVulnerabilityCount: number;
  topRoles: { role: string; count: number }[];
  healthSignal: "strong" | "caution" | "warning";
}

export interface RoleDemand {
  roleType: string;
  jobCount: number;
  avgSalaryMin: number;
  avgSalaryMax: number;
  bilingualPercent: number;
  topRegions: { region: string; count: number }[];
  layoffsInRole: number;
  demandSignal: "hot" | "steady" | "cooling";
}

export interface FundingCliff {
  id: string;
  date: string;
  title: { en: string; es: string };
  daysUntil: number;
  dollarAmount: string | null;
  peopleAffected: string | null;
  category: "federal" | "state" | "local";
  isPast: boolean;
}

export interface SalaryIntelligence {
  roleId: string;
  label: string;
  esLabel: string;
  p25: number;
  p50: number;
  p75: number;
  actualListingAvgMin: number | null;
  actualListingAvgMax: number | null;
  listingCount: number;
  marketPosition: "below-benchmark" | "at-benchmark" | "above-benchmark" | "no-data";
}

export interface MarketOverview {
  totalFQHCs: number;
  totalJobs: number;
  totalLayoffOrgs: number;
  totalLayoffWorkers: number;
  totalRegions: number;
  totalRoleTypes: number;
  avgSalaryAllRoles: number;
  bilingualJobPercent: number;
  highVulnerabilityFQHCs: number;
  topHiringFQHC: { name: string; slug: string; jobCount: number } | null;
  topHiringRole: string;
  topHiringRegion: string;
}

/* ------------------------------------------------------------------ */
/*  Core Aggregation Functions                                         */
/* ------------------------------------------------------------------ */

export function getMarketOverview(): MarketOverview {
  const totalFQHCs = californiaFQHCs.length;
  const totalJobs = fqhcJobListings.length;
  const layoffStats = getLayoffStats();

  // Count unique role types
  const roleTypes = new Set(fqhcJobListings.map((j) => j.roleType));

  // Unique regions from listings
  const regionsInListings = new Set(fqhcJobListings.map((j) => j.location));

  // Average salary across all listings
  const avgSalaryAll =
    fqhcJobListings.reduce((sum, j) => sum + (j.salaryMin + j.salaryMax) / 2, 0) /
    (totalJobs || 1);

  // Bilingual percentage
  const bilingualJobs = fqhcJobListings.filter((j) => j.bilingual).length;
  const bilingualPercent = Math.round((bilingualJobs / (totalJobs || 1)) * 100);

  // High vulnerability FQHCs
  const highVuln = californiaFQHCs.filter((f) => f.fundingImpactLevel === "high").length;

  // Top hiring FQHC (most listings)
  const fqhcJobCounts = new Map<string, number>();
  for (const job of fqhcJobListings) {
    fqhcJobCounts.set(job.fqhcSlug, (fqhcJobCounts.get(job.fqhcSlug) || 0) + 1);
  }
  let topFqhcSlug = "";
  let topFqhcCount = 0;
  for (const [slug, count] of fqhcJobCounts) {
    if (count > topFqhcCount) {
      topFqhcSlug = slug;
      topFqhcCount = count;
    }
  }
  const topFqhc = californiaFQHCs.find((f) => f.slug === topFqhcSlug);

  // Top hiring role
  const roleCounts = new Map<string, number>();
  for (const job of fqhcJobListings) {
    roleCounts.set(job.roleType, (roleCounts.get(job.roleType) || 0) + 1);
  }
  let topRole = "";
  let topRoleCount = 0;
  for (const [role, count] of roleCounts) {
    if (count > topRoleCount) {
      topRole = role;
      topRoleCount = count;
    }
  }

  // Top hiring region
  const regionJobCounts = new Map<string, number>();
  for (const job of fqhcJobListings) {
    // Map job location to FQHC region
    const fqhc = californiaFQHCs.find((f) => f.slug === job.fqhcSlug);
    if (fqhc) {
      regionJobCounts.set(fqhc.region, (regionJobCounts.get(fqhc.region) || 0) + 1);
    }
  }
  let topRegion = "";
  let topRegionCount = 0;
  for (const [region, count] of regionJobCounts) {
    if (count > topRegionCount) {
      topRegion = region;
      topRegionCount = count;
    }
  }

  return {
    totalFQHCs,
    totalJobs,
    totalLayoffOrgs: layoffStats.uniqueOrgs,
    totalLayoffWorkers: layoffStats.totalAffected,
    totalRegions: regionsInListings.size,
    totalRoleTypes: roleTypes.size,
    avgSalaryAllRoles: Math.round(avgSalaryAll),
    bilingualJobPercent: bilingualPercent,
    highVulnerabilityFQHCs: highVuln,
    topHiringFQHC: topFqhc
      ? { name: topFqhc.name, slug: topFqhc.slug, jobCount: topFqhcCount }
      : null,
    topHiringRole: topRole,
    topHiringRegion: topRegion,
  };
}

/* ------------------------------------------------------------------ */
/*  Regional Snapshots                                                 */
/* ------------------------------------------------------------------ */

export function getRegionalSnapshots(): RegionalSnapshot[] {
  const regions = [
    "Los Angeles",
    "San Diego",
    "Bay Area",
    "Sacramento",
    "Central Valley",
    "Inland Empire",
    "Central Coast",
    "North State",
    "North Coast",
  ] as const;

  return regions.map((region) => {
    const fqhcsInRegion = californiaFQHCs.filter((f) => f.region === region);
    const fqhcSlugs = new Set(fqhcsInRegion.map((f) => f.slug));
    const jobsInRegion = fqhcJobListings.filter((j) => fqhcSlugs.has(j.fqhcSlug));
    const layoffsInRegion = californiaFQHCLayoffs.filter((l) => l.region === region);

    // Average salary
    const avgMin =
      jobsInRegion.length > 0
        ? Math.round(jobsInRegion.reduce((s, j) => s + j.salaryMin, 0) / jobsInRegion.length)
        : 0;
    const avgMax =
      jobsInRegion.length > 0
        ? Math.round(jobsInRegion.reduce((s, j) => s + j.salaryMax, 0) / jobsInRegion.length)
        : 0;

    // Layoff totals
    const layoffWorkers = layoffsInRegion.reduce((s, l) => s + l.employeesAffected, 0);

    // Vulnerability breakdown
    const highVuln = fqhcsInRegion.filter((f) => f.fundingImpactLevel === "high").length;
    const modVuln = fqhcsInRegion.filter((f) => f.fundingImpactLevel === "moderate").length;
    const lowVuln = fqhcsInRegion.filter((f) => f.fundingImpactLevel === "low").length;

    // Top roles in region
    const roleMap = new Map<string, number>();
    for (const job of jobsInRegion) {
      roleMap.set(job.roleType, (roleMap.get(job.roleType) || 0) + 1);
    }
    const topRoles = Array.from(roleMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([role, count]) => ({ role, count }));

    // Health signal: based on jobs vs layoffs and vulnerability
    let healthSignal: "strong" | "caution" | "warning" = "strong";
    if (layoffWorkers > 200 || highVuln > fqhcsInRegion.length * 0.5) {
      healthSignal = "warning";
    } else if (layoffWorkers > 50 || highVuln > fqhcsInRegion.length * 0.3) {
      healthSignal = "caution";
    }

    return {
      region,
      fqhcCount: fqhcsInRegion.length,
      totalJobs: jobsInRegion.length,
      avgSalaryMin: avgMin,
      avgSalaryMax: avgMax,
      recentLayoffs: layoffWorkers,
      layoffOrgs: layoffsInRegion.length,
      highVulnerabilityCount: highVuln,
      moderateVulnerabilityCount: modVuln,
      lowVulnerabilityCount: lowVuln,
      topRoles,
      healthSignal,
    };
  });
}

/* ------------------------------------------------------------------ */
/*  Role Demand Analysis                                               */
/* ------------------------------------------------------------------ */

export function getRoleDemand(): RoleDemand[] {
  // Group jobs by roleType
  const roleMap = new Map<string, FQHCJobListing[]>();
  for (const job of fqhcJobListings) {
    const existing = roleMap.get(job.roleType) || [];
    existing.push(job);
    roleMap.set(job.roleType, existing);
  }

  // Count layoffs per role
  const layoffRoleCounts = new Map<string, number>();
  for (const layoff of californiaFQHCLayoffs) {
    for (const role of layoff.rolesAffected) {
      layoffRoleCounts.set(role, (layoffRoleCounts.get(role) || 0) + layoff.employeesAffected);
    }
  }

  return Array.from(roleMap.entries())
    .map(([roleType, jobs]) => {
      const avgMin = Math.round(jobs.reduce((s, j) => s + j.salaryMin, 0) / jobs.length);
      const avgMax = Math.round(jobs.reduce((s, j) => s + j.salaryMax, 0) / jobs.length);
      const bilingualCount = jobs.filter((j) => j.bilingual).length;
      const bilingualPercent = Math.round((bilingualCount / jobs.length) * 100);

      // Top regions for this role
      const regionMap = new Map<string, number>();
      for (const job of jobs) {
        const fqhc = californiaFQHCs.find((f) => f.slug === job.fqhcSlug);
        if (fqhc) {
          regionMap.set(fqhc.region, (regionMap.get(fqhc.region) || 0) + 1);
        }
      }
      const topRegions = Array.from(regionMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([region, count]) => ({ region, count }));

      // Layoffs in this role type
      const layoffsInRole = layoffRoleCounts.get(roleType) || 0;

      // Demand signal
      let demandSignal: "hot" | "steady" | "cooling" = "steady";
      if (jobs.length >= 10 && layoffsInRole < jobs.length * 0.5) {
        demandSignal = "hot";
      } else if (layoffsInRole > jobs.length) {
        demandSignal = "cooling";
      }

      return {
        roleType,
        jobCount: jobs.length,
        avgSalaryMin: avgMin,
        avgSalaryMax: avgMax,
        bilingualPercent,
        topRegions,
        layoffsInRole,
        demandSignal,
      };
    })
    .sort((a, b) => b.jobCount - a.jobCount);
}

/* ------------------------------------------------------------------ */
/*  Funding Cliff Countdown                                            */
/* ------------------------------------------------------------------ */

export function getFundingCliffs(): FundingCliff[] {
  const now = new Date();
  const today = now.toISOString().split("T")[0];

  return policyTimeline
    .map((p) => {
      const policyDate = new Date(p.date);
      const diffMs = policyDate.getTime() - now.getTime();
      const daysUntil = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      return {
        id: p.id,
        date: p.date,
        title: p.title,
        daysUntil,
        dollarAmount: p.dollarAmount,
        peopleAffected: p.peopleAffected,
        category: p.category,
        isPast: p.date < today,
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}

/* ------------------------------------------------------------------ */
/*  Salary Intelligence                                                */
/* ------------------------------------------------------------------ */

export function getSalaryIntelligence(): SalaryIntelligence[] {
  return SALARY_BENCHMARKS.map((benchmark) => {
    // Find matching job listings
    const matchingJobs = fqhcJobListings.filter((j) => {
      const normalizedRole = j.roleType.toLowerCase().replace(/[^a-z]/g, "");
      const normalizedBenchmark = benchmark.label.toLowerCase().replace(/[^a-z]/g, "");
      return normalizedRole === normalizedBenchmark || normalizedRole.includes(normalizedBenchmark) || normalizedBenchmark.includes(normalizedRole);
    });

    const actualAvgMin =
      matchingJobs.length > 0
        ? Math.round(matchingJobs.reduce((s, j) => s + j.salaryMin, 0) / matchingJobs.length)
        : null;
    const actualAvgMax =
      matchingJobs.length > 0
        ? Math.round(matchingJobs.reduce((s, j) => s + j.salaryMax, 0) / matchingJobs.length)
        : null;

    // Market position: compare actual mid to benchmark p50
    let marketPosition: SalaryIntelligence["marketPosition"] = "no-data";
    if (actualAvgMin !== null && actualAvgMax !== null) {
      const actualMid = (actualAvgMin + actualAvgMax) / 2;
      if (actualMid < benchmark.p25) {
        marketPosition = "below-benchmark";
      } else if (actualMid > benchmark.p75) {
        marketPosition = "above-benchmark";
      } else {
        marketPosition = "at-benchmark";
      }
    }

    return {
      roleId: benchmark.roleId,
      label: benchmark.label,
      esLabel: benchmark.esLabel,
      p25: benchmark.p25,
      p50: benchmark.p50,
      p75: benchmark.p75,
      actualListingAvgMin: actualAvgMin,
      actualListingAvgMax: actualAvgMax,
      listingCount: matchingJobs.length,
      marketPosition,
    };
  });
}

/* ------------------------------------------------------------------ */
/*  Strategic Foresight Narratives                                     */
/* ------------------------------------------------------------------ */

export interface StrategicInsight {
  id: string;
  category: "demand-shift" | "salary-trend" | "funding-risk" | "opportunity";
  title: { en: string; es: string };
  narrative: { en: string; es: string };
  dataPoints: string[];
  actionable: { en: string; es: string };
}

export function generateStrategicInsights(): StrategicInsight[] {
  const overview = getMarketOverview();
  const roleDemand = getRoleDemand();
  const regionalData = getRegionalSnapshots();
  const layoffStats = getLayoffStats();

  const insights: StrategicInsight[] = [];

  // Insight 1: Role demand shift
  const hotRoles = roleDemand.filter((r) => r.demandSignal === "hot");
  const coolingRoles = roleDemand.filter((r) => r.demandSignal === "cooling");

  if (hotRoles.length > 0) {
    insights.push({
      id: "demand-shift-1",
      category: "demand-shift",
      title: {
        en: "Hiring is concentrated in clinical and behavioral health roles",
        es: "La contratación se concentra en roles clínicos y de salud conductual",
      },
      narrative: {
        en: `The top hiring roles are ${hotRoles.slice(0, 3).map((r) => r.roleType).join(", ")} with ${hotRoles.slice(0, 3).reduce((s, r) => s + r.jobCount, 0)} combined openings. Meanwhile, ${coolingRoles.length > 0 ? coolingRoles.map((r) => r.roleType).join(", ") + " roles are seeing more layoffs than new openings" : "all tracked roles maintain positive demand"}.`,
        es: `Los roles con más contratación son ${hotRoles.slice(0, 3).map((r) => r.roleType).join(", ")} con ${hotRoles.slice(0, 3).reduce((s, r) => s + r.jobCount, 0)} vacantes combinadas. Mientras tanto, ${coolingRoles.length > 0 ? coolingRoles.map((r) => r.roleType).join(", ") + " están viendo más despidos que nuevas vacantes" : "todos los roles rastreados mantienen demanda positiva"}.`,
      },
      dataPoints: hotRoles.slice(0, 3).map((r) => `${r.roleType}: ${r.jobCount} openings`),
      actionable: {
        en: "Candidates in cooling roles should consider cross-training into high-demand areas. CHWs with behavioral health experience have the strongest positioning.",
        es: "Los candidatos en roles en declive deberían considerar capacitarse en áreas de alta demanda. Los CHWs con experiencia en salud conductual tienen la mejor posición.",
      },
    });
  }

  // Insight 2: Bilingual premium
  const bilingualRoles = roleDemand.filter((r) => r.bilingualPercent > 50);
  if (bilingualRoles.length > 0) {
    insights.push({
      id: "bilingual-premium",
      category: "opportunity",
      title: {
        en: `${overview.bilingualJobPercent}% of FQHC jobs prefer bilingual candidates`,
        es: `${overview.bilingualJobPercent}% de trabajos en FQHCs prefieren candidatos bilingües`,
      },
      narrative: {
        en: `Bilingual Spanish/English proficiency is required or preferred in ${overview.bilingualJobPercent}% of all tracked FQHC positions. For care coordination roles specifically, this jumps to ${bilingualRoles[0]?.bilingualPercent || 70}%+. Bilingual candidates typically earn $2,000-$5,000 more annually.`,
        es: `La competencia bilingüe español/inglés es requerida o preferida en el ${overview.bilingualJobPercent}% de todas las posiciones de FQHC rastreadas. Para roles de coordinación de atención específicamente, esto sube a ${bilingualRoles[0]?.bilingualPercent || 70}%+. Los candidatos bilingües típicamente ganan $2,000-$5,000 más anualmente.`,
      },
      dataPoints: bilingualRoles.slice(0, 3).map((r) => `${r.roleType}: ${r.bilingualPercent}% bilingual`),
      actionable: {
        en: "If you're bilingual, highlight this prominently on your resume — it's your single biggest competitive advantage in California FQHCs.",
        es: "Si eres bilingüe, destaca esto prominentemente en tu currículum — es tu mayor ventaja competitiva en los FQHCs de California.",
      },
    });
  }

  // Insight 3: Funding vulnerability concentration
  const warningRegions = regionalData.filter((r) => r.healthSignal === "warning");
  if (warningRegions.length > 0) {
    insights.push({
      id: "funding-risk-1",
      category: "funding-risk",
      title: {
        en: `${warningRegions.length} regions face elevated workforce risk`,
        es: `${warningRegions.length} regiones enfrentan riesgo elevado de fuerza laboral`,
      },
      narrative: {
        en: `${warningRegions.map((r) => r.region).join(" and ")} ${warningRegions.length > 1 ? "have" : "has"} the highest concentration of funding-vulnerable FQHCs and recent layoffs. ${warningRegions[0]?.region} alone has seen ${warningRegions[0]?.recentLayoffs} workers affected across ${warningRegions[0]?.layoffOrgs} organizations.`,
        es: `${warningRegions.map((r) => r.region).join(" y ")} ${warningRegions.length > 1 ? "tienen" : "tiene"} la mayor concentración de FQHCs vulnerables y despidos recientes. Solo ${warningRegions[0]?.region} ha visto ${warningRegions[0]?.recentLayoffs} trabajadores afectados en ${warningRegions[0]?.layoffOrgs} organizaciones.`,
      },
      dataPoints: warningRegions.map((r) => `${r.region}: ${r.recentLayoffs} layoffs, ${r.highVulnerabilityCount} high-vulnerability FQHCs`),
      actionable: {
        en: "Workers in these regions should update their resumes now and consider expanding their geographic search. FQHCs in less-affected regions are actively hiring.",
        es: "Los trabajadores en estas regiones deben actualizar sus currículums ahora y considerar expandir su búsqueda geográfica. Los FQHCs en regiones menos afectadas están contratando activamente.",
      },
    });
  }

  // Insight 4: Displaced worker opportunity
  if (layoffStats.totalAffected > 100) {
    insights.push({
      id: "displaced-opportunity",
      category: "opportunity",
      title: {
        en: `${layoffStats.totalAffected.toLocaleString()} displaced healthcare workers — a talent goldmine for hiring FQHCs`,
        es: `${layoffStats.totalAffected.toLocaleString()} trabajadores de salud desplazados — una mina de talento para FQHCs que contratan`,
      },
      narrative: {
        en: `${layoffStats.totalAffected.toLocaleString()} workers across ${layoffStats.uniqueOrgs} organizations have been laid off or are facing layoffs. These are experienced professionals who already understand FQHC culture, EHR systems, and Medi-Cal programs. The top reason for layoffs is federal funding cuts (${layoffStats.topReasonCount} of ${layoffStats.totalEntries} events).`,
        es: `${layoffStats.totalAffected.toLocaleString()} trabajadores en ${layoffStats.uniqueOrgs} organizaciones han sido despedidos o enfrentan despidos. Son profesionales experimentados que ya entienden la cultura FQHC, sistemas EHR y programas de Medi-Cal. La razón principal de los despidos es recortes de fondos federales (${layoffStats.topReasonCount} de ${layoffStats.totalEntries} eventos).`,
      },
      dataPoints: [
        `${layoffStats.totalAffected} workers affected`,
        `${layoffStats.uniqueOrgs} organizations`,
        `${layoffStats.regionsAffected} regions`,
      ],
      actionable: {
        en: "For employers: These pre-trained workers can be productive in days, not months. Contact us for fast-tracked introductions. For workers: Use our free career tools and job board to find your next role.",
        es: "Para empleadores: Estos trabajadores pre-entrenados pueden ser productivos en días, no meses. Contáctenos para introducciones aceleradas. Para trabajadores: Usa nuestras herramientas de carrera gratuitas y bolsa de empleo para encontrar tu próximo rol.",
      },
    });
  }

  return insights;
}

/* ------------------------------------------------------------------ */
/*  EHR Ecosystem Analysis                                             */
/* ------------------------------------------------------------------ */

export interface EHRDistribution {
  system: string;
  fqhcCount: number;
  percentage: number;
  jobCount: number;
}

export function getEHRDistribution(): EHRDistribution[] {
  const ehrMap = new Map<string, number>();
  for (const fqhc of californiaFQHCs) {
    ehrMap.set(fqhc.ehrSystem, (ehrMap.get(fqhc.ehrSystem) || 0) + 1);
  }

  const ehrJobMap = new Map<string, number>();
  for (const job of fqhcJobListings) {
    ehrJobMap.set(job.ehrSystem, (ehrJobMap.get(job.ehrSystem) || 0) + 1);
  }

  return Array.from(ehrMap.entries())
    .map(([system, count]) => ({
      system,
      fqhcCount: count,
      percentage: Math.round((count / californiaFQHCs.length) * 100),
      jobCount: ehrJobMap.get(system) || 0,
    }))
    .sort((a, b) => b.fqhcCount - a.fqhcCount);
}

/* ------------------------------------------------------------------ */
/*  Program Adoption Analysis                                          */
/* ------------------------------------------------------------------ */

export interface ProgramAdoption {
  program: string;
  fqhcCount: number;
  percentage: number;
  jobCount: number;
}

export function getProgramAdoption(): ProgramAdoption[] {
  const programs = ["ECM", "CCM", "Community Supports", "BH Integration", "TCM", "BH-ASO"] as const;

  return programs.map((program) => {
    const fqhcCount = californiaFQHCs.filter((f) => f.programs.includes(program)).length;
    const jobCount = fqhcJobListings.filter((j) => j.programs.includes(program)).length;

    return {
      program,
      fqhcCount,
      percentage: Math.round((fqhcCount / californiaFQHCs.length) * 100),
      jobCount,
    };
  }).sort((a, b) => b.fqhcCount - a.fqhcCount);
}
