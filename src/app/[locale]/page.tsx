// FQHC Talent — Homepage (Server Component)
// Pre-computes minimal data for the focused landing page.

import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/seo-config";
import { fqhcJobListings } from "@/lib/fqhc-job-listings";
import { californiaFQHCs } from "@/lib/california-fqhcs";
import { getMarketOverview, getFundingCliffs } from "@/lib/market-intelligence";
import { getIntelItems } from "@/lib/fqhc-news-intel";
import { getUpcomingFollowUps, getAdvocacyCounts } from "@/lib/fqhc-advocacy-tracker";
import { SALARY_BENCHMARKS } from "@/lib/job-posting-templates";
import { HomepageDashboard } from "@/components/homepage/HomepageDashboard";
import type { HomepageData } from "@/components/homepage/HomepageDashboard";

/* ------------------------------------------------------------------ */
/*  Module-level counts (evaluated at build time for SEO metadata)     */
/* ------------------------------------------------------------------ */
const _totalFQHCs = californiaFQHCs.length;
const _totalJobs = fqhcJobListings.length;
const _totalSalaryRoles = SALARY_BENCHMARKS.length;
const _totalJobOrgs = new Set(fqhcJobListings.map((j) => j.fqhcSlug)).size;

/* ------------------------------------------------------------------ */
/*  SEO Metadata                                                       */
/* ------------------------------------------------------------------ */
export const metadata: Metadata = {
  title: "FQHC Talent | California's Strategic Intelligence Platform for Community Health Centers",
  description:
    `Real-time intelligence for FQHC executives: ${_totalFQHCs}+ California FQHCs tracked, ${_totalJobs.toLocaleString()}+ job listings, AI adoption monitoring, resilience scores, salary benchmarks across 9 regions, policy tracking, and free career tools. Updated weekly from primary sources.`,
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
    title: `FQHC Talent — Strategic Intelligence for California's ${_totalFQHCs}+ Community Health Centers`,
    description:
      "Executive dashboards, workforce data, AI adoption tracking, resilience scores, salary intelligence, and free career tools. Built for the leaders navigating the biggest crisis in community health history.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `FQHC Talent — Strategic intelligence and free career tools for ${_totalFQHCs}+ California FQHCs`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FQHC Talent — California's FQHC Intelligence Platform",
    description:
      `${_totalFQHCs}+ FQHCs tracked. ${_totalJobs.toLocaleString()}+ jobs. AI adoption monitoring. Salary benchmarks. Policy tracking. Free career tools. All from primary sources.`,
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

/* ------------------------------------------------------------------ */
/*  Server Component                                                    */
/* ------------------------------------------------------------------ */
export default function Home() {
  const overview = getMarketOverview();
  const fundingCliffs = getFundingCliffs();
  const allIntelItems = getIntelItems();

  const nextCliff = fundingCliffs.find((c) => !c.isPast) ?? null;

  // Get top intel headline (most recent critical/high item)
  const topIntel = allIntelItems
    .filter((i) => i.impactLevel === "critical" || i.impactLevel === "high")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  const homepageData: HomepageData = {
    totalFQHCs: overview.totalFQHCs,
    totalJobs: overview.totalJobs,
    totalOrgs: _totalJobOrgs,
    totalIntel: allIntelItems.length,
    totalSalaryRoles: _totalSalaryRoles,
    nextCliff,
    topIntelHeadline: topIntel
      ? topIntel.headline
      : { en: "FQHC intelligence updated weekly", es: "Inteligencia FQHC actualizada semanalmente" },
    topIntelSource: topIntel?.sourceOrg ?? "FQHC Talent",
    intelBriefItems: allIntelItems
      .filter((i) => i.type === "news")
      .map((i) => ({
        id: i.id,
        headline: i.headline,
        summary: i.summary,
        impactLevel: i.impactLevel,
        date: i.date,
        sourceUrl: i.sourceUrl,
        sourceOrg: i.sourceOrg,
      })),
    advocacyItems: getUpcomingFollowUps().slice(0, 5).map((a) => ({
      id: a.id,
      headline: a.headline,
      status: a.status,
      followUpDate: a.followUpDate,
      region: a.region,
    })),
    advocacyCounts: getAdvocacyCounts(),
  };

  /* ---- JSON-LD: WebPage + FAQPage for homepage rich results ---- */
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "FQHC Talent — California's FQHC Strategic Intelligence Platform",
    description:
      `Real-time intelligence for FQHC executives: ${_totalFQHCs}+ California FQHCs tracked, ${_totalJobs.toLocaleString()}+ job listings, AI adoption monitoring, resilience scores, salary benchmarks, and free career tools.`,
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
        `Strategic intelligence covering ${_totalFQHCs}+ California FQHCs including resilience scores, salary benchmarks, AI adoption tracking, workforce data, and policy monitoring.`,
      dataset: [
        {
          "@type": "Dataset",
          name: "California FQHC Directory",
          description: `${_totalFQHCs}+ FQHCs with programs, EHR systems, Glassdoor ratings, resilience scores, and locations`,
          url: `${SITE_URL}/directory`,
        },
        {
          "@type": "Dataset",
          name: "FQHC Job Listings",
          description: `${_totalJobs.toLocaleString()}+ open positions across ${_totalSalaryRoles}+ roles at ${_totalJobOrgs} California FQHCs`,
          url: `${SITE_URL}/jobs`,
        },
        {
          "@type": "Dataset",
          name: "FQHC Salary Intelligence",
          description: `P25/P50/P75 salary benchmarks for ${_totalSalaryRoles} FQHC roles across 9 California regions`,
          url: `${SITE_URL}/salary-data`,
        },
        {
          "@type": "Dataset",
          name: "FQHC Resilience Scorecard",
          description: `${_totalFQHCs} FQHCs scored across 5 dimensions: program diversity, workforce stability, data maturity, quality, financial positioning`,
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
          text: `A Federally Qualified Health Center (FQHC) is a community-based healthcare provider that receives federal funding under Section 330 of the Public Health Service Act. FQHCs provide primary care to under-resourced populations regardless of ability to pay. California has ${_totalFQHCs}+ FQHCs serving millions of patients.`,
        },
      },
      {
        "@type": "Question",
        name: "How many FQHCs are in California?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `California has over ${_totalFQHCs} Federally Qualified Health Centers across 9 regions: Los Angeles, San Diego, Bay Area, Sacramento, Central Valley, Inland Empire, Central Coast, North State, and North Coast. FQHC Talent tracks all of them with resilience scores, programs, EHR systems, and workforce data.`,
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
          text: `FQHC Talent offers free career tools including: a resume builder with 8 FQHC-specific templates, a 5-domain career assessment with 90-day onboarding plans, career roadmaps with CA salary data, 20 certification guides, interview prep for 6+ roles, salary benchmarks for ${_totalSalaryRoles} roles across 9 regions, and a FQHC comparison tool. No login required.`,
        },
      },
      {
        "@type": "Question",
        name: "How is AI being adopted at FQHCs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "FQHC Talent tracks AI implementations across California FQHCs. Ambient documentation (AI scribes) is the leading category with vendors including Abridge, Sunoh.ai, and Nabla. Key results: Abridge reduced provider burnout from 52% to 39%, Sun River Health documents 7,000 visits/month with AI, and athenahealth offers free ambient AI to all clients.",
        },
      },
      {
        "@type": "Question",
        name: "What is the average FQHC salary in California?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `FQHC Talent tracks salary benchmarks for ${_totalSalaryRoles} roles across 9 California regions at P25, P50 (median), and P75 levels. Examples: Medical Directors earn $250K–$350K, Nurse Practitioners $120K–$175K, Community Health Workers $43K–$55K, and Medical Assistants $43K–$52K. Regional multipliers apply — Bay Area and LA salaries run 5–15% above statewide medians. California's SB 525 sets a healthcare minimum wage reaching $25/hr for FQHCs by 2027.`,
        },
      },
      {
        "@type": "Question",
        name: "What is NHSC loan repayment for FQHC workers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The National Health Service Corps (NHSC) offers loan repayment of up to $50,000 for a 2-year commitment at an approved FQHC site, with extensions available. Eligible providers include physicians, NPs, PAs, dentists, mental health professionals, and substance use counselors. Most California FQHCs are NHSC-approved sites. NHSC is a major recruitment advantage for FQHCs competing with private-sector salaries.",
        },
      },
      {
        "@type": "Question",
        name: "What EHR systems do California FQHCs use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `The most common EHR systems at California FQHCs are OCHIN Epic (used by 50+ FQHCs through a shared community model), eClinicalWorks, NextGen Healthcare, and athenahealth. Larger FQHCs like AltaMed and Riverside University Health System use Epic directly. FQHC Talent tracks EHR systems across all ${_totalFQHCs} California FQHCs to help job seekers find organizations matching their experience.`,
        },
      },
      {
        "@type": "Question",
        name: "How are FQHCs funded?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "FQHCs receive funding from multiple sources: HRSA Section 330 grants (base operational funding), Medi-Cal/Medicaid Prospective Payment System (PPS) reimbursement, Medicare, private insurance, 340B drug pricing program savings, and state/local grants. About 84% of FQHC revenue comes from government sources, making them vulnerable to federal policy changes like H.R. 1 Medicaid cuts and the Community Health Center Fund expiration in December 2026.",
        },
      },
      {
        "@type": "Question",
        name: "What is the FQHC resilience score?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `FQHC Talent's Resilience Scorecard rates all ${_totalFQHCs} California FQHCs on a composite score (A through F) across 5 weighted dimensions: program diversity (25%), workforce stability (20%), data maturity (15%), quality indicators (20%), and financial positioning (20%). The score helps executives benchmark their organization against regional peers and identify operational vulnerabilities.`,
        },
      },
      {
        "@type": "Question",
        name: "What programs do California FQHCs offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Common FQHC programs in California include Enhanced Care Management (ECM) under CalAIM, Behavioral Health Integration (BHI), Chronic Care Management (CCM), 340B Drug Pricing, Health Care for the Homeless (HCH), Migrant Health, Ryan White HIV/AIDS, school-based health, and dental services. Many FQHCs also participate in PACE (Program of All-inclusive Care for the Elderly) and offer enabling services like translation and transportation.",
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
