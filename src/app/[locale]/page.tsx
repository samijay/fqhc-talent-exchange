// FQHC Talent — Intelligence Dashboard (Homepage Server Component)
// Pre-computes all data server-side, passes serialized props to client component.
// This keeps ~830KB of raw data (californiaFQHCs + fqhcJobListings) out of the browser bundle.

import { californiaFQHCs } from "@/lib/california-fqhcs";
import { fqhcJobListings } from "@/lib/fqhc-job-listings";
import {
  getMarketOverview,
  getRegionalSnapshots,
  getRoleDemand,
  getFundingCliffs,
} from "@/lib/market-intelligence";
import { getLayoffStats } from "@/lib/california-fqhc-layoffs";
import {
  getIntelItems,
  getDeadlineItems,
  getStrategyItems,
  getIntelSources,
  INTEL_CATEGORIES,
  INTEL_LAST_UPDATED,
} from "@/lib/fqhc-news-intel";
import { calculateResilienceScore } from "@/lib/fqhc-resilience";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { COMPLIANCE_CALENDAR, DOMAIN_META, getComplianceStats } from "@/lib/fqhc-compliance";
import { HomepageDashboard } from "@/components/homepage/HomepageDashboard";
import type { HomepageData, FeaturedFQHCData, ComplianceDeadlineData, ComplianceStatsData, DomainMetaData } from "@/components/homepage/HomepageDashboard";

/* ------------------------------------------------------------------ */
/*  Helper: simplified region for news filtering (server-side)         */
/* ------------------------------------------------------------------ */
const REGION_MAP: Record<string, string> = {
  "Los Angeles": "LA",
  "Los Angeles County": "LA",
  "San Diego County": "SD",
  "San Francisco County": "Bay Area",
  "Alameda County": "Bay Area",
  "Contra Costa County": "Bay Area",
  "Santa Clara County": "Bay Area",
  "San Mateo County": "Bay Area",
  "Marin County": "Bay Area",
  "Solano County": "Bay Area",
  "Napa County": "Bay Area",
  "Sonoma County": "Bay Area",
  "Sacramento County": "Sacramento",
  "Yolo County": "Sacramento",
  "Placer County": "Sacramento",
  "El Dorado County": "Sacramento",
  "Fresno County": "Central Valley",
  "Kern County": "Central Valley",
  "Tulare County": "Central Valley",
  "San Joaquin County": "Central Valley",
  "Stanislaus County": "Central Valley",
  "Merced County": "Central Valley",
  "Central Valley": "Central Valley",
  "Riverside County": "Inland Empire",
  "San Bernardino County": "Inland Empire",
  "Santa Barbara County": "Central Coast",
  "San Luis Obispo County": "Central Coast",
  "Ventura County": "Central Coast",
  "Monterey County": "Central Coast",
  "Orange County": "LA",
  Federal: "Federal",
  California: "Statewide",
};

function getSimplifiedRegion(rawRegion: string): string {
  return REGION_MAP[rawRegion] ?? rawRegion;
}

/* ------------------------------------------------------------------ */
/*  Server Component — pre-computes all data                           */
/* ------------------------------------------------------------------ */
export default function Home() {
  /* Core aggregation (these import californiaFQHCs + fqhcJobListings internally) */
  const overview = getMarketOverview();
  const regionalSnapshots = getRegionalSnapshots();
  const roleDemand = getRoleDemand();
  const fundingCliffs = getFundingCliffs();
  const layoffStatsRaw = getLayoffStats();

  /* Job listing stats */
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const jobStats = {
    total: fqhcJobListings.length,
    recent: fqhcJobListings.filter((j) => new Date(j.postedDate) >= sevenDaysAgo).length,
    orgs: new Set(fqhcJobListings.map((j) => j.fqhcSlug)).size,
  };

  /* Funding cliffs */
  const upcomingCliffs = fundingCliffs.filter((c) => !c.isPast).slice(0, 4);
  const nextCliff = upcomingCliffs[0] ?? null;

  /* Layoff stats (serialize only what we need) */
  const layoffStats = {
    totalAffected: layoffStatsRaw.totalAffected,
    uniqueOrgs: layoffStatsRaw.uniqueOrgs,
    regionsAffected: layoffStatsRaw.regionsAffected,
  };

  /* Intel feeds */
  const allIntelItems = getIntelItems();
  const deadlineItems = getDeadlineItems();
  const strategyItems = getStrategyItems();
  const allSources = getIntelSources();

  /* Three-way split: Breaking News / Strategic Intelligence / Articles */
  const newsFeed = allIntelItems
    .filter((i) => i.type === "news" && i.category !== "change-management")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const intelFeed = allIntelItems
    .filter((i) => i.category === "change-management" || i.type === "strategy")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const articlesFeed = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime(),
  );

  /* Derive the latest actual news date */
  const latestNewsDate = newsFeed.length > 0 ? newsFeed[0].date : INTEL_LAST_UPDATED;

  /* Simplified regions present in the news feed */
  const newsRegionsOrdered = [
    "Federal",
    "Statewide",
    "LA",
    "Bay Area",
    "SD",
    "Central Valley",
    "Sacramento",
    "Inland Empire",
    "Central Coast",
    "North State",
    "North Coast",
  ].filter((r) => newsFeed.some((item) => getSimplifiedRegion(item.region) === r));

  /* News filter categories — only categories that have type:"news" items */
  const newsFilterCategories = [
    { id: "all" as string, en: "All", es: "Todo" },
    ...INTEL_CATEGORIES.filter((cat) =>
      newsFeed.some((i) => i.category === cat.id),
    ).map((cat) => ({ id: cat.id as string, en: cat.en, es: cat.es })),
  ];

  /* Intel filter categories — only categories that have type:"strategy" items */
  const intelFilterCategories = [
    { id: "all" as string, en: "All", es: "Todo" },
    ...INTEL_CATEGORIES.filter((cat) =>
      intelFeed.some((i) => i.category === cat.id),
    ).map((cat) => ({ id: cat.id as string, en: cat.en, es: cat.es })),
  ];

  const maxJobCount = Math.max(...roleDemand.map((r) => r.jobCount), 1);

  /* Featured FQHCs — pre-compute resilience scores */
  const featuredFQHCs: FeaturedFQHCData[] = californiaFQHCs
    .filter((f) => f.glassdoorRating || parseInt(f.staffCount) > 500)
    .slice(0, 6)
    .map((fqhc) => {
      const resilience = calculateResilienceScore(fqhc);
      return {
        slug: fqhc.slug,
        name: fqhc.name,
        city: fqhc.city,
        siteCount: fqhc.siteCount,
        staffCount: fqhc.staffCount,
        glassdoorRating: fqhc.glassdoorRating ?? null,
        resilienceGrade: resilience.grade,
        resilienceOverall: resilience.overall,
      };
    });

  /* Compliance alerts — pre-compute upcoming deadlines */
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const complianceDeadlines: ComplianceDeadlineData[] = COMPLIANCE_CALENDAR
    .filter((e) => e.month >= currentMonth && e.month <= currentMonth + 2)
    .sort((a, b) => a.month - b.month || (a.day ?? 0) - (b.day ?? 0))
    .slice(0, 4)
    .map((d) => ({
      id: d.id,
      month: d.month,
      day: d.day,
      deadline: d.deadline,
      requirement: d.requirement,
      domain: d.domain,
      description: d.description,
      responsibleDepartment: d.responsibleDepartment,
      preparationWeeks: d.preparationWeeks,
    }));

  const complianceStatsRaw = getComplianceStats();
  const complianceStats: ComplianceStatsData = {
    osvRequirements: complianceStatsRaw.osvRequirements,
    criticalRisks: complianceStatsRaw.criticalRisks,
    highRisks: complianceStatsRaw.highRisks,
    calendarEntries: complianceStatsRaw.calendarEntries,
  };

  const domainMeta: DomainMetaData[] = DOMAIN_META.map((dm) => ({
    id: dm.id,
    en: dm.en,
    es: dm.es,
  }));

  /* Assemble all data for the client component */
  const homepageData: HomepageData = {
    overview,
    jobStats,
    upcomingCliffs,
    nextCliff,
    layoffStats,
    newsFeed,
    intelFeed,
    deadlineItems,
    strategyItems,
    allSources,
    regionalSnapshots,
    roleDemand,
    maxJobCount,
    latestNewsDate,
    articlesFeed,
    featuredFQHCs,
    complianceDeadlines,
    complianceStats,
    domainMeta,
    newsRegionsOrdered,
    newsFilterCategories,
    intelFilterCategories,
  };

  return <HomepageDashboard data={homepageData} />;
}
