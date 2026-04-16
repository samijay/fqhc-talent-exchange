// Intelligence Hub — standalone filterable intel feed, advocacy watch, funding cliffs, regional links
// Server component: pre-computes all data at build time

import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/seo-config";
import {
  getIntelItems,
  getIntelCounts,
  INTEL_CATEGORIES,
  INTEL_LAST_UPDATED,
  type IntelCategory,
} from "@/lib/fqhc-news-intel";
import { getFundingCliffs, getMarketOverview } from "@/lib/market-intelligence";
import {
  getUpcomingFollowUps,
  getAdvocacyCounts,
  ADVOCACY_LAST_UPDATED,
} from "@/lib/fqhc-advocacy-tracker";
import { REGION_SLUGS } from "@/lib/regional-intelligence";
import { IntelligenceHub } from "@/components/intelligence/IntelligenceHub";

/* ------------------------------------------------------------------ */
/*  SEO Metadata                                                       */
/* ------------------------------------------------------------------ */

const overview = getMarketOverview();
const totalIntel = getIntelItems().length;

export const metadata: Metadata = {
  title: "Intelligence Dashboard — Real-Time FQHC Policy, Funding & Workforce Tracking",
  description: `${totalIntel}+ intelligence items tracking California's ${overview.totalFQHCs}+ FQHCs: legislation, funding cliffs, workforce data, advocacy actions, AI adoption, and regional analysis. Updated from primary sources.`,
  keywords: [
    "FQHC intelligence",
    "FQHC policy tracker",
    "Medicaid funding tracker",
    "FQHC advocacy",
    "FQHC workforce data",
    "California FQHC news",
    "H.R. 1 FQHC impact",
    "FQHC funding cliffs",
    "FQHC layoff tracker",
  ],
  openGraph: {
    title: `FQHC Intelligence Dashboard — ${totalIntel}+ Items Tracked`,
    description: `Real-time intelligence for California FQHC executives: policy, funding, workforce, advocacy, AI adoption. Updated from primary sources.`,
    url: `${SITE_URL}/intelligence`,
    siteName: SITE_NAME,
  },
  alternates: {
    canonical: `${SITE_URL}/intelligence`,
    languages: {
      en: `${SITE_URL}/intelligence`,
      es: `${SITE_URL}/es/intelligence`,
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Server Component                                                    */
/* ------------------------------------------------------------------ */

export default function IntelligencePage() {
  const allIntel = getIntelItems();
  const counts = getIntelCounts();
  const fundingCliffs = getFundingCliffs();
  const advocacyItems = getUpcomingFollowUps().slice(0, 8);
  const advocacyCounts = getAdvocacyCounts();

  // Serialize for client — IntelItem is plain objects already
  const serializedCliffs = fundingCliffs.map((c) => ({
    title: c.title,
    date: c.date,
    dollarAmount: c.dollarAmount,
    peopleAffected: c.peopleAffected,
    isPast: c.isPast,
    daysUntil: c.daysUntil,
  }));

  const serializedAdvocacy = advocacyItems.map((a) => ({
    id: a.id,
    headline: a.headline,
    summary: a.summary,
    status: a.status,
    followUpDate: a.followUpDate,
    region: a.region,
    category: a.category,
    sourceUrl: a.sourceUrl,
    impactLevel: a.impactLevel,
  }));

  return (
    <IntelligenceHub
      intelItems={allIntel}
      counts={counts as Record<IntelCategory, number> & { total: number }}
      categories={INTEL_CATEGORIES}
      fundingCliffs={serializedCliffs}
      advocacyItems={serializedAdvocacy}
      advocacyCounts={advocacyCounts}
      regionSlugs={REGION_SLUGS}
      lastUpdated={INTEL_LAST_UPDATED}
      advocacyLastUpdated={ADVOCACY_LAST_UPDATED}
    />
  );
}
