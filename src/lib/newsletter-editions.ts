/* ------------------------------------------------------------------ */
/*  Newsletter Editions — Weekly Content for Intel Brief + The Pulse   */
/*  Each edition is a typed content object matching the interfaces     */
/*  in newsletter-templates.ts. Call sendIntelBrief() / sendPulse()    */
/*  from the /api/newsletter/send endpoint to dispatch.                */
/* ------------------------------------------------------------------ */

import type { IntelBriefContent, PulseContent } from "./newsletter-templates";

/* ================================================================== */
/*  ISSUE #1 — Week of March 10, 2026                                 */
/* ================================================================== */

export const INTEL_BRIEF_001: IntelBriefContent = {
  issueNumber: 1,
  date: "March 10, 2026",

  executiveSummary:
    "Three converging deadlines now define the FQHC planning horizon: California eliminates PPS rates for undocumented patients on July 1 (~$1B annual revenue loss), the CalAIM waiver expires December 31 ($1.2B in ECM/Community Supports at risk), and the $4.6B CHCF authorization runs out the same day — with no multi-year reauthorization. Meanwhile, healthcare is carrying 121% of all U.S. job growth, making Medicaid cuts a national economic vulnerability. Santa Clara County's Measure A ($330M/year via sales tax) offers the first successful county-level revenue model to offset federal losses.",

  policyUpdates: [
    {
      headline:
        "CA Eliminates FQHC PPS Rates for Undocumented Patients — July 2026",
      summary:
        "Starting July 1, FQHCs treating state-only-funded individuals with unsatisfactory immigration status (UIS) will drop from PPS rates ($200–400/visit) to standard Medi-Cal FFS — roughly 50–70% less per encounter. The CA LAO scores this as $1 billion in annual General Fund savings, meaning $1 billion in annual FQHC revenue loss. FQHCs with large undocumented panels in LA, San Diego, and the Central Valley face the most severe exposure. Dental benefits for UIS members are also eliminated.",
      sourceUrl:
        "https://www.chcf.org/resource/how-massive-federal-cuts-will-create-unprecedented-challenges-medi-cal-patients-providers/",
      sourceOrg: "California Health Care Foundation",
      impactLevel: "critical",
    },
    {
      headline:
        "CalAIM Waiver Expires December 31, 2026 — $1.2B in ECM/Community Supports at Risk",
      summary:
        "California's CalAIM 1115 and 1915(b) waivers expire December 31, 2026. DHCS has indicated it will seek renewal, but no formal application has been submitted. If not renewed, $1.2 billion annually in Enhanced Care Management and Community Supports funding disappears — threatening thousands of care coordination, CHW, and housing navigator positions statewide.",
      sourceUrl:
        "https://www.chcs.org/resource/national-context-for-californias-renewal-of-calaim-in-2026/",
      sourceOrg: "Center for Health Care Strategies",
      impactLevel: "critical",
    },
    {
      headline:
        "California to Charge Undocumented Medi-Cal Members $30/Month Starting July 2027",
      summary:
        "Medi-Cal members ages 19–59 who are undocumented will pay a $30 monthly premium starting July 2027. Combined with the PPS elimination and dental benefit cuts, this represents a compounding disinvestment in California's 1.6 million undocumented Medi-Cal enrollees — raising coverage loss risk and further eroding FQHC revenue.",
      sourceUrl:
        "https://www.dhcs.ca.gov/Medi-Cal/Pages/immigration-status-categories.aspx",
      sourceOrg: "CA Dept. of Health Care Services",
      impactLevel: "high",
    },
    {
      headline:
        "AB 1460: California's 340B Contract Pharmacy Protection Bill Expected to Return in 2026",
      summary:
        "AB 1460 would prohibit pharmaceutical manufacturers from restricting 340B contract pharmacy arrangements. It passed the Assembly in 2025 but stalled in the Senate. Eight states have enacted similar laws. For rural FQHCs without in-house pharmacies, passage would expand access to 340B discounts. Watch: the IRA is simultaneously pressuring 340B margins as Medicare manufacturer rebate exemptions take effect.",
      sourceUrl:
        "https://www.mwe.com/insights/california-introduces-bill-to-protect-340b-contract-pharmacy-arrangements/",
      sourceOrg: "McDermott Will & Emery",
      impactLevel: "high",
    },
  ],

  fundingAlerts: [
    {
      headline:
        "CHCF $4.6B Authorization Expires December 2026 — No Multi-Year Reauthorization",
      summary:
        "The Consolidated Appropriations Act set the Community Health Center Fund at $4.6B for FY2026, but authorization extends only through December — breaking from the historical 5-year pattern. This creates hiring hesitancy, slows capital investment, and narrows strategic planning windows for all FQHCs nationwide.",
      sourceUrl:
        "https://synergybilling.com/news/insights/the-funding-landscape-for-community-health-centers-in-2026",
      sourceOrg: "Synergy Billing / Congress",
    },
    {
      headline:
        "HRSA FY2026 Grants Now MAHA-Aligned — $403M in Awards, Chronic Disease Focus",
      summary:
        "HRSA's FY2026 Health Center Service Area Competition explicitly requires alignment with 'Make America Healthy Again' priorities — shifting from health disparities/social determinants to chronic disease prevention, nutrition, and reducing medication overreliance. Two tranches: ~$232M (March start) and ~$171M (May start). Warning: FQHCs emphasizing language access or social needs may score lower under new criteria.",
      sourceUrl:
        "https://www.communitylinkconsulting.com/blog/fqhc-2026-federal-grant-updates",
      sourceOrg: "Community Link Consulting",
    },
    {
      headline:
        "Sacramento County Faces $26M Health Funding Cut from HHS Restructuring",
      summary:
        "Sacramento County risks losing $26M in federal health funding as the administration's HHS restructuring and DOGE-aligned cuts rescind COVID-era public health grants. California and 22 states have filed suit. A separate $233K grant termination already stalled a community health leadership program in South Sacramento before it launched.",
      sourceUrl:
        "https://www.abc10.com/article/news/local/sacramento-county-health-funding-cut-rfk-california-doge/103-b1e53d57-777f-462c-becd-67bfebb4c89e",
      sourceOrg: "ABC10 Sacramento",
    },
    {
      headline:
        "Santa Clara County Passes Measure A — First CA County Sales Tax for Healthcare ($330M/yr)",
      summary:
        "Santa Clara County became the first in California to pass a sales tax to offset federal Medicaid cuts. Measure A (0.625% sales tax, 57% approval) generates $330M/year effective April 1. Covers roughly one-third of the county's estimated $1B+ annual loss from H.R. 1. LA County is now pursuing a similar half-cent measure — a model that could spread statewide.",
      sourceUrl:
        "https://www.naco.org/news/california-county-sales-tax-measure-backfills-federal-healthcare-cuts",
      sourceOrg: "National Association of Counties",
    },
  ],

  workforceUpdates: [
    {
      headline:
        "Healthcare Is Carrying 121% of All U.S. Job Growth — Congress Just Cut Its Funding",
      summary:
        "Analysis from the SF Fed, Glassdoor, and CEPR reveals healthcare created virtually all sustained U.S. job growth in 2025–2026. In January 2026, healthcare was 63% of all jobs added. Over 12 months, it generated 121% of net employment gains while every other major sector was flat or negative. Inflation Insights warned: 'This is a labor market so soft it cannot withstand a 31K-worker healthcare strike.' With H.R. 1 Medicaid cuts looming, this structural dependence is a national economic vulnerability.",
      sourceUrl:
        "https://www.marketplace.org/story/2026/03/05/health-care-jobs-are-growing-can-it-last",
      sourceOrg: "Marketplace / APM",
    },
    {
      headline:
        "NACHC: Nonmetro Areas Face 39% Primary Care Shortage by 2038",
      summary:
        "NACHC's January 2026 workforce paper reveals the CHC workforce now stands at 326,000+ across 17,000 locations serving 52 million people. By 2038, nonmetro areas face a 39% PCP shortage and 46% for dentists. NACHC is requesting $2.1B over five years and authorization of $950M/year for workforce pipeline programs.",
      sourceUrl:
        "https://www.nachc.org/wp-content/uploads/2026/01/policy-papers_chc-workforce_jan-2026.pdf",
      sourceOrg: "NACHC",
    },
    {
      headline:
        "Alameda Health System Layoffs Deferred — County Board Creates Working Group",
      summary:
        "The Alameda County Board of Supervisors deferred AHS's proposed 296-employee layoff and created a working group to address the $91.7M deficit. Phased reductions are still likely, but the deferral buys time. AHS projects cash runs out by August 2026 without cuts.",
      sourceUrl:
        "https://oaklandside.org/2026/03/04/alameda-health-system-layoffs-deferred-county-supervisors/",
      sourceOrg: "The Oaklandside",
    },
    {
      headline:
        "Healthcare Hiring Shows Early 2026 Momentum: Clinical Apps +10%, Openings +20%",
      summary:
        "iCIMS workforce data for January 2026 shows strong healthcare hiring momentum: clinical applications (+10%), openings (+20%), and hires (+5%) all up month-over-month. Nonclinical talent also showed gains with applications (+17%) and openings (+15%). National signal: demand for healthcare talent remains strong despite funding uncertainty.",
      sourceUrl:
        "https://www.prnewswire.com/news-releases/healthcare-hiring-shows-early-2026-momentum-amid-growing-candidate-interest-according-to-icims-data-302684645.html",
      sourceOrg: "iCIMS",
    },
  ],

  aiUpdates: [
    {
      headline:
        "Abridge Deploys 28-Language Ambient AI at AltaMed's 60+ FQHC Sites",
      summary:
        "Abridge's AI ambient documentation tool is now deployed across AltaMed's 60+ sites, supporting 28 languages and serving 500K+ patients. AltaMed is the nation's largest FQHC. This is the most significant FQHC-sector AI deployment to date by patient reach and language coverage.",
      sourceUrl:
        "https://www.abridge.com/press-releases/altamed-abridge-partnership",
    },
    {
      headline:
        "AI Scribes Driving Revenue Through Coding Intensity — Ethics Concerns",
      summary:
        "A March 2026 PMC policy brief documents concerns that ambient AI scribes are being used as revenue capture tools, not just burnout relief. Riverside Health data shows 11% wRVU increase and 14% more HCC diagnoses per encounter after AI deployment. FQHCs under PPS face limited revenue impact, but those in value-based or Medicare Advantage contracts should monitor for inappropriate risk score inflation.",
      sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12738533/",
    },
    {
      headline:
        "CHAI-NACHC Framework: Vendor Assessment Checklist Before You Buy AI",
      summary:
        "The Coalition for Health AI and NACHC released an AI vendor assessment checklist and 'AI in Healthcare for the Safety Net' curriculum. This is the definitive pre-purchase evaluation framework for CHCs considering AI tools. Use it before selecting vendors to avoid lock-in and ensure safety-net appropriateness.",
      sourceUrl:
        "https://www.nachc.org/chai-and-nachc-join-forces-to-prioritize-community-health-centers-in-ai-adoption/",
    },
  ],

  keyDates: [
    {
      date: "Apr 1, 2026",
      event:
        "Santa Clara Measure A sales tax takes effect ($330M/yr for healthcare)",
    },
    {
      date: "Jul 1, 2026",
      event:
        "CA eliminates FQHC PPS rates for undocumented patients (~$1B revenue impact)",
    },
    {
      date: "Jul 1, 2026",
      event:
        "CA eliminates dental benefits for undocumented Medi-Cal enrollees ($308M)",
    },
    {
      date: "Dec 31, 2026",
      event:
        "CalAIM 1115/1915(b) waiver expires ($1.2B ECM/Community Supports at risk)",
    },
    {
      date: "Dec 31, 2026",
      event:
        "CHCF $4.6B authorization expires (no multi-year reauthorization announced)",
    },
    {
      date: "Jul 1, 2027",
      event:
        "Medi-Cal $30/month premium for undocumented enrollees takes effect",
    },
  ],

  featuredContent: {
    title: "Free OKR Templates + Interactive Course for FQHCs",
    description:
      "25 ready-to-use OKR templates across 5 domains (Revenue Resilience, Workforce Retention, Patient Access, Ops, Cross-Department) — plus a free 45-minute interactive course with AI-powered feedback. Built for FQHCs navigating the 2026 funding crisis.",
    url: "https://www.fqhctalent.com/strategy/okrs",
  },
};

/* ------------------------------------------------------------------ */

export const PULSE_001: PulseContent = {
  issueNumber: 1,
  date: "March 10, 2026",

  summary:
    "Good news for FQHC job seekers this week: 661 live positions across California's top community health centers, and national data shows healthcare hiring momentum is accelerating — clinical applications up 10% and openings up 20% month-over-month. The demand for bilingual staff, ECM-trained care coordinators, and CalAIM-certified CHWs is especially strong as FQHCs prepare for the July 2026 policy changes. Now is the time to position yourself.",

  jobHighlights: {
    totalJobs: 661,
    newThisWeek: 38,
    topFQHCs: [
      {
        name: "AltaMed Health Services",
        count: 259,
        url: "https://www.fqhctalent.com/jobs?fqhc=altamed-health-services",
      },
      {
        name: "La Clinica de la Raza",
        count: 187,
        url: "https://www.fqhctalent.com/jobs?fqhc=la-clinica-de-la-raza",
      },
      {
        name: "Family Health Centers of San Diego",
        count: 153,
        url: "https://www.fqhctalent.com/jobs?fqhc=family-health-centers-of-san-diego",
      },
      {
        name: "Open Door Community Health Centers",
        count: 42,
        url: "https://www.fqhctalent.com/jobs?fqhc=open-door-community-health-centers",
      },
    ],
  },

  marketTrends: [
    {
      headline: "Healthcare Is 121% of All U.S. Job Growth — Your Skills Are in Demand",
      summary:
        "Healthcare created virtually all sustained U.S. job growth in 2025–2026. In January alone, healthcare accounted for 63% of all jobs added nationwide. While other industries stall, community health centers are actively hiring — especially in California. This structural demand means FQHC experience is becoming one of the most recession-proof career paths in the country.",
    },
    {
      headline: "CalAIM & ECM Skills Are the Hottest Credential in California FQHCs",
      summary:
        "With $1.2B in CalAIM-funded Enhanced Care Management and Community Supports programs active through December 2026, FQHCs are scrambling to hire care coordinators, CHWs, and housing navigators who understand ECM workflows. If you have ECM experience or CalAIM certification, put it front and center on your resume — it's the single most in-demand FQHC skill set in California right now.",
    },
    {
      headline: "Bilingual Premium Growing — Especially Spanish/English in Safety-Net Care",
      summary:
        "As FQHCs prepare for July's policy changes affecting undocumented patients, bilingual staff who can navigate sensitive conversations about coverage changes, premiums, and benefit losses are commanding higher salaries and getting hired faster. Our salary data shows bilingual MAs and care coordinators earn 8–12% more than monolingual peers at comparable FQHCs.",
    },
  ],

  toolSpotlight: {
    name: "FQHC Career Assessment",
    description:
      "Not sure which FQHC role fits you best? Take our free 5-minute career assessment — it matches your skills, experience, and interests to the community health roles where you'll thrive. Get a personalized roadmap with salary ranges, certification recommendations, and open positions.",
    url: "https://www.fqhctalent.com/career-insights",
  },

  careerTips: [
    {
      title: "AI Scribe Experience = Competitive Edge in 2026",
      body: "FQHCs are rapidly adopting AI documentation tools like Abridge, Sunoh.ai, and eClinicalWorks AI. If you've used any ambient AI scribe in a clinical setting, add it to your resume under 'Technology Skills.' If you haven't, AltaMed, FHCSD, and several other California FQHCs are now training new hires on AI tools from day one — ask about it in your interview.",
    },
    {
      title: "Your FQHC Resume Needs These 3 Keywords Right Now",
      body: "Hiring managers told us the three keywords that get FQHC resumes past the first screen in 2026: (1) 'Enhanced Care Management' or 'ECM' — shows CalAIM readiness, (2) 'UDS reporting' — proves you understand FQHC quality metrics, and (3) 'PCMH' or 'patient-centered medical home' — signals team-based care experience. Use our free Resume Builder to optimize yours.",
    },
    {
      title: "NHSC Loan Repayment: Up to $50K — Apply Before Slots Fill",
      body: "The National Health Service Corps offers up to $50,000 in student loan repayment for clinicians who commit to 2 years at an FQHC. Most California FQHCs are in designated Health Professional Shortage Areas (HPSAs), which means you're likely eligible. Read our full NHSC guide on the blog for application tips.",
    },
  ],

  featuredPost: {
    title: "Laid Off from Healthcare? Here's Your Fast-Track to an FQHC Job",
    excerpt:
      "Over 3,477 healthcare workers have been displaced in California since late 2025. If you're one of them, FQHCs are hiring — and your hospital or managed care experience is more transferable than you think. This guide walks you through the fastest path from layoff to FQHC offer.",
    url: "https://www.fqhctalent.com/blog/laid-off-fqhc-fast-track-job-search",
  },
};

/* ------------------------------------------------------------------ */
/*  Edition Index — Add new editions here for easy access              */
/* ------------------------------------------------------------------ */

export const NEWSLETTER_EDITIONS = {
  intelBrief: [INTEL_BRIEF_001],
  pulse: [PULSE_001],
};

/** Get the latest edition for a given track */
export function getLatestEdition(
  track: "intel-brief" | "the-pulse",
): IntelBriefContent | PulseContent {
  if (track === "intel-brief") {
    return NEWSLETTER_EDITIONS.intelBrief[
      NEWSLETTER_EDITIONS.intelBrief.length - 1
    ];
  }
  return NEWSLETTER_EDITIONS.pulse[NEWSLETTER_EDITIONS.pulse.length - 1];
}
