// FQHC Talent — Intelligence Dashboard (Homepage Server Component)
// Pre-computes all data server-side, passes serialized props to client component.
// This keeps ~830KB of raw data (californiaFQHCs + fqhcJobListings) out of the browser bundle.

import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/seo-config";
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
/* ------------------------------------------------------------------ */
/*  SEO Metadata — homepage-specific (overrides layout defaults)       */
/* ------------------------------------------------------------------ */
export const metadata: Metadata = {
  title: "FQHC Talent | California's Strategic Intelligence Platform for Community Health Centers",
  description:
    "Real-time intelligence for FQHC executives: 220+ California FQHCs tracked, 1,700+ job listings, AI adoption monitoring, resilience scores, salary benchmarks across 9 regions, policy tracking, and free career tools. Updated weekly from primary sources.",
  keywords: [
    "FQHC intelligence platform",
    "California FQHC data",
    "community health center strategy",
    "FQHC executive dashboard",
    "Medicaid funding tracker",
    "FQHC workforce data",
    "FQHC salary benchmarks California",
    "FQHC resilience scorecard",
    "FQHC AI adoption tracker",
    "FQHC layoff tracker California",
    "CalAIM ECM FQHC",
    "FQHC OKR templates",
    "community health worker jobs California",
    "FQHC career tools free",
    "H.R. 1 Medicaid cuts FQHC impact",
    "FQHC directory California",
    "FQHC compliance HRSA OSV",
    "FQHC case studies",
    "FQHC policy tracker 2026",
    "FQHC scope of practice California",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "FQHC Talent — Strategic Intelligence for California's 220+ Community Health Centers",
    description:
      "Executive dashboards, workforce data, AI adoption tracking, resilience scores, salary intelligence, and free career tools. Built for the leaders navigating the biggest crisis in community health history.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "FQHC Talent — Strategic intelligence and free career tools for 220+ California FQHCs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FQHC Talent — California's FQHC Intelligence Platform",
    description:
      "220+ FQHCs tracked. 1,700+ jobs. AI adoption monitoring. Salary benchmarks. Policy tracking. Free career tools. All from primary sources.",
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "x-default": SITE_URL,
      en: SITE_URL,
      es: `${SITE_URL}/es`,
    },
  },
};

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

  /* ---- JSON-LD: WebPage + FAQPage for homepage rich results ---- */
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "FQHC Talent — California's FQHC Strategic Intelligence Platform",
    description:
      "Real-time intelligence for FQHC executives: 220+ California FQHCs tracked, 1,700+ job listings, AI adoption monitoring, resilience scores, salary benchmarks, and free career tools.",
    url: SITE_URL,
    isPartOf: { "@type": "WebSite", name: "FQHC Talent", url: SITE_URL },
    about: [
      { "@type": "Thing", name: "Federally Qualified Health Centers" },
      { "@type": "Thing", name: "Community Health Center Workforce" },
      { "@type": "Thing", name: "Medicaid Policy" },
      { "@type": "Thing", name: "Healthcare AI Adoption" },
      { "@type": "Thing", name: "California Healthcare" },
    ],
    mainEntity: {
      "@type": "DataCatalog",
      name: "FQHC Talent Intelligence Data",
      description:
        "Strategic intelligence covering 220+ California FQHCs including resilience scores, salary benchmarks, AI adoption tracking, workforce data, and policy monitoring.",
      dataset: [
        {
          "@type": "Dataset",
          name: "California FQHC Directory",
          description: "220+ FQHCs with programs, EHR systems, Glassdoor ratings, resilience scores, and locations",
          url: `${SITE_URL}/directory`,
        },
        {
          "@type": "Dataset",
          name: "FQHC Job Listings",
          description: `${jobStats.total}+ open positions across 30+ roles at ${jobStats.orgs} California FQHCs`,
          url: `${SITE_URL}/jobs`,
        },
        {
          "@type": "Dataset",
          name: "FQHC Salary Intelligence",
          description: "P25/P50/P75 salary benchmarks for 30 FQHC roles across 9 California regions",
          url: `${SITE_URL}/salary-data`,
        },
        {
          "@type": "Dataset",
          name: "FQHC Resilience Scorecard",
          description: "220 FQHCs scored across 5 dimensions: program diversity, workforce stability, data maturity, quality, financial positioning",
          url: `${SITE_URL}/strategy/resilience`,
        },
      ],
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "[data-speakable]"],
    },
    inLanguage: ["en", "es"],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an FQHC?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A Federally Qualified Health Center (FQHC) is a community-based healthcare provider that receives federal funding under Section 330 of the Public Health Service Act. FQHCs provide primary care to underserved populations regardless of ability to pay. California has 220+ FQHCs serving millions of patients.",
        },
      },
      {
        "@type": "Question",
        name: "How many FQHCs are in California?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "California has over 220 Federally Qualified Health Centers across 9 regions: Los Angeles, San Diego, Bay Area, Sacramento, Central Valley, Inland Empire, Central Coast, North State, and North Coast. FQHC Talent tracks all of them with resilience scores, programs, EHR systems, and workforce data.",
        },
      },
      {
        "@type": "Question",
        name: "What is the FQHC funding crisis in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Community Health Center Fund (CHCF) authorization expires in December 2026, putting $4.6 billion in annual federal funding at risk. Combined with H.R. 1 Medicaid cuts and California's elimination of PPS for undocumented patients (July 2026), FQHCs face the most severe financial crisis in the program's history. 84% of FQHC revenue is government-funded.",
        },
      },
      {
        "@type": "Question",
        name: "What FQHC career tools are available for free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "FQHC Talent offers free career tools including: a resume builder with 8 FQHC-specific templates, a 5-domain career assessment with 90-day onboarding plans, career roadmaps with CA salary data, 20 certification guides, interview prep for 6+ roles, salary benchmarks for 30 roles across 9 regions, and a FQHC comparison tool. No login required.",
        },
      },
      {
        "@type": "Question",
        name: "How is AI being adopted at FQHCs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "FQHC Talent tracks 19 AI implementations across California FQHCs. Ambient documentation (AI scribes) is the leading category with 6 vendors including Abridge, Sunoh.ai, and Nabla. Key results: Abridge reduced provider burnout from 52% to 39%, Sun River Health documents 7,000 visits/month with AI, and athenahealth offers free ambient AI to all clients.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HomepageDashboard data={homepageData} />
    </>
  );
}
