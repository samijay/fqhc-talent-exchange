import { NextResponse } from "next/server";
import { previewIntelBrief, previewPulse } from "@/lib/newsletter-send";
import type { IntelBriefContent, PulseContent } from "@/lib/newsletter-templates";

/**
 * GET /api/newsletter/preview?track=intel-brief
 *
 * Returns a rendered preview of the newsletter with sample content.
 * Only available in development or when NEWSLETTER_SECRET is provided.
 */

const SAMPLE_INTEL: IntelBriefContent = {
  issueNumber: 1,
  date: new Date().toISOString().slice(0, 10),
  executiveSummary:
    "H.R. 1 reconciliation bill advances with $880B Medicaid restructuring. California FQHCs face 15-22% revenue impact. CHCF authorization expires Dec 31 with no reauthorization bill introduced.",
  policyUpdates: [
    {
      headline: "H.R. 1 Medicaid Restructuring Advances",
      summary:
        "The House reconciliation bill proposes converting Medicaid to a per-capita cap model, eliminating enhanced FMAP for expansion populations, and imposing work requirements of 80 hours/month starting 2027.",
      sourceUrl: "https://www.kff.org/medicaid/",
      sourceOrg: "KFF",
      impactLevel: "critical",
    },
    {
      headline: "CHCF Authorization Expires December 2026",
      summary:
        "Community Health Center Fund ($4.6B annually) expires Dec 31, 2026. No reauthorization bill introduced yet. Cliff would cut FQHC funding by 70%.",
      sourceUrl: "https://nachc.org/policy-advocacy/",
      sourceOrg: "NACHC",
      impactLevel: "high",
    },
  ],
  fundingAlerts: [
    {
      headline: "340B Drug Pricing Program Under Review",
      summary:
        "HRSA to publish new 340B compliance requirements by Q3 2026. Contract pharmacy arrangements may face restrictions.",
      sourceUrl: "https://www.hrsa.gov/opa",
      sourceOrg: "HRSA",
    },
  ],
  workforceUpdates: [
    {
      headline: "LA County Closing 7 Community Clinics",
      summary:
        "Budget cuts force closure of 7 DPH clinics in South LA, displacing 200+ healthcare workers. Surrounding FQHCs expected to absorb patient volume.",
      sourceUrl: "https://www.latimes.com",
      sourceOrg: "Los Angeles Times",
    },
  ],
  aiUpdates: [
    {
      headline: "athenahealth Launches Free Ambient AI for FQHCs",
      summary:
        "Free ambient documentation tool for all athenahealth FQHC clients. Early reports show 30% reduction in after-hours charting.",
      sourceUrl: "https://www.athenahealth.com",
    },
  ],
  keyDates: [
    { date: "Jul 1, 2026", event: "Dental coverage eliminated for undocumented adults" },
    { date: "Oct 1, 2026", event: "Immigrant eligibility restrictions take effect" },
    { date: "Dec 31, 2026", event: "CHCF authorization expires" },
  ],
  featuredContent: {
    title: "Working at the Top of Scope",
    description:
      "Interactive delegation matrix for 10 CA FQHC roles — see exactly what each role can do under California law.",
    url: "https://www.fqhctalent.com/strategy/scope-of-practice",
  },
};

const SAMPLE_PULSE: PulseContent = {
  issueNumber: 1,
  date: new Date().toISOString().slice(0, 10),
  summary:
    "577 open positions across 4 major FQHCs this week. AltaMed leads with 234 openings. Care coordination and behavioral health roles are in highest demand across all regions.",
  jobHighlights: {
    totalJobs: 577,
    newThisWeek: 23,
    topFQHCs: [
      { name: "AltaMed Health Services", count: 234, url: "https://www.fqhctalent.com/directory/altamed-health-services" },
      { name: "La Clinica de La Raza", count: 172, url: "https://www.fqhctalent.com/directory/la-clinica-de-la-raza" },
      { name: "Family Health Centers of San Diego", count: 149, url: "https://www.fqhctalent.com/directory/family-health-centers-of-san-diego" },
    ],
  },
  marketTrends: [
    {
      headline: "Care Coordination Roles Growing 15% YoY",
      summary:
        "ECM and community health worker positions are the fastest-growing category across California FQHCs, driven by CalAIM implementation.",
    },
    {
      headline: "SB 525 Raises FQHC Minimum Wage to $25/hr by 2027",
      summary:
        "Healthcare minimum wage law impacts entry-level roles. FQHCs with existing pay above $25/hr are less affected.",
    },
  ],
  toolSpotlight: {
    name: "Career Assessment",
    description:
      "Free 15-question behavioral assessment designed for FQHC roles. Get your readiness score, personalized 90-day plan, and career pathway recommendations.",
    url: "https://www.fqhctalent.com/career-insights",
  },
  careerTips: [
    {
      title: "Highlight EHR Experience on Your Resume",
      body: "90% of California FQHCs use either OCHIN Epic or eClinicalWorks. If you have experience with either system, put it in your resume summary — not buried in skills.",
    },
  ],
  featuredPost: {
    title: "How to Write an FQHC Resume That Gets Interviews",
    excerpt:
      "Community health centers look for different things than hospitals. Here's how to tailor your resume for FQHC hiring managers.",
    url: "https://www.fqhctalent.com/blog/how-to-write-fqhc-resume",
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const track = searchParams.get("track") || "intel-brief";

  // Allow in development or with secret
  const isDev = process.env.NODE_ENV === "development";
  const secret = process.env.NEWSLETTER_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!isDev && (!secret || authHeader !== `Bearer ${secret}`)) {
    return NextResponse.json(
      { error: "Preview only available in development or with valid auth." },
      { status: 403 },
    );
  }

  const html =
    track === "the-pulse"
      ? previewPulse(SAMPLE_PULSE)
      : previewIntelBrief(SAMPLE_INTEL);

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
