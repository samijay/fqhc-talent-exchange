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
        "https://web.archive.org/web/2025/https://www.communitylinkconsulting.com/blog/fqhc-2026-federal-grant-updates",
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

/* ================================================================== */
/*  ISSUE #2 — Week of March 20, 2026                                 */
/* ================================================================== */

export const INTEL_BRIEF_002: IntelBriefContent = {
  issueNumber: 2,
  date: "March 20, 2026",

  executiveSummary:
    "The structural case against FQHC survival just got louder. STAT News published a landmark analysis arguing the real threat isn't H.R. 1 — it's that FQHCs have been structurally insolvent since 2024, with net margins swinging from +5.3% to -2.1% in two years. Meanwhile, LA County placed a $1B/year health sales tax on the June 2 ballot (the first county measure in the nation designed to offset Medicaid cuts), CHCF detailed how rural North State FQHCs could lose 30% of revenue, and San Francisco's largest LGBTQ+ health center lost its Ryan White HIV funding overnight. The pattern is clear: federal, state, and county funding are all contracting simultaneously. FQHCs that haven't stress-tested their finances against this triple compression are running out of time.",

  policyUpdates: [
    {
      headline: "STAT News: FQHCs' Greatest Threat Isn't Funding Cuts — It's Structural Insolvency",
      summary:
        "A major STAT News analysis argues FQHCs face an existential crisis beyond any single funding cut. Net margins collapsed from +5.3% (2020-22) to -2.1% in 2024 — a 7.4-point swing. The community health center program posted its first-ever net loss in 2025. Federal grants stayed flat 2019-2023 while costs rose 25%+. One restructured FQHC found core medical services operating at a '$5/visit loss.' The author calls for rigorous financial discipline as 'foundational to mission delivery' — not a nice-to-have.",
      sourceUrl: "https://www.statnews.com/2026/03/17/federally-qualified-health-centers-fqhcs-crisis/",
      sourceOrg: "STAT News",
      impactLevel: "critical",
    },
    {
      headline: "SB 1422: Bill to Reverse Medi-Cal Enrollment Freeze for Undocumented Adults",
      summary:
        "Sen. Durazo (D-LA) introduced SB 1422 to restore full Medi-Cal eligibility regardless of immigration status — reversing the January 2026 enrollment freeze. Nearly 1.7M undocumented immigrants are currently enrolled. The freeze eliminated PPS payments for UIS patients, forcing FQHCs to absorb care costs. Whether this bill gains traction will signal California's commitment to the coverage model it pioneered.",
      sourceUrl: "https://calmatters.org/health/2026/03/durazo-reverse-medical-undocumented-immigrants/",
      sourceOrg: "CalMatters",
      impactLevel: "high",
    },
    {
      headline: "H.R. 7391: Bipartisan Bill Would Exempt FQHCs from 340B Rebate Model — 35 Cosponsors",
      summary:
        "The Community Health Center Drug Pricing Protection Act would exempt FQHCs from HRSA's 340B Rebate Model Pilot, mandating upfront ceiling-price purchasing instead of post-purchase reconciliation. 35 bipartisan cosponsors. HRSA's RFI on 340B rebates has comments due April 20. For FQHCs without in-house pharmacies, passage would protect access to 340B discounts that cross-subsidize care.",
      sourceUrl: "https://auchincloss.house.gov/media/press-releases/reps-auchincloss-and-bergman-defend-fqhcs-from-financial-constraints-amidst-340b-reform",
      sourceOrg: "U.S. House of Representatives",
      impactLevel: "high",
    },
  ],

  fundingAlerts: [
    {
      headline: "LA County: $1B/Year Health Tax on June 2 Ballot — First County-Level Medicaid Offset",
      summary:
        "The LA County Board of Supervisors placed a half-cent sales tax on the June 2 primary ballot, projected to generate ~$1B/year for safety-net care. St. John's Community Health ($240M revenue, 28 clinics) could lose a third of its budget without it. Proposed allocation: 47% free/reduced care, 22% DHS, 10% DPH. Following Santa Clara's Measure A ($330M/year effective April 1), a Southern California model is emerging. If this passes, expect San Diego ($360M ballot measure) and others to follow.",
      sourceUrl: "https://kffhealthnews.org/news/article/federal-cuts-state-tax-increases-budget-shortfalls-health-clinics-los-angeles-california/",
      sourceOrg: "KFF Health News",
    },
    {
      headline: "CHCF: H.R. 1 Would 'Devastate' Rural Northern California Health Systems",
      summary:
        "A new CHCF report details the threat to rural North State FQHCs. At Shasta CHC, 82% of visits are Medi-Cal (60% of revenue). Hill Country CHC's CEO: 'If I lose 30% of my revenue, I will have to make a 30% reduction in staff.' Overdose deaths in Shasta/Lassen run 70% above statewide rates. CHCF hosting in-person event in Redding on April 2 — FQHCs in the North State should attend.",
      sourceUrl: "https://www.chcf.org/resource/federal-medicaid-cuts-would-devastate-health-care-systems-californias-vast-rural-north/",
      sourceOrg: "California Health Care Foundation",
    },
    {
      headline: "SF Community Health Center Loses Ryan White HIV Funding — 3,000+ Patients at Risk",
      summary:
        "San Francisco Community Health Center had its federal Ryan White funding abruptly terminated as part of HRSA restructuring. The clinic serves 3,000+ patients — many LGBTQ+ and API communities — with HIV prevention and treatment. SF DPH is exploring emergency bridge funding. This is the first direct federal funding termination to hit an SF FQHC and signals escalating risk for all HRSA-dependent programs.",
      sourceUrl: "https://www.sfchronicle.com/health/article/sf-community-health-center-ryan-white-funding-19952187.php",
      sourceOrg: "San Francisco Chronicle",
    },
    {
      headline: "RAND: State Medicaid Budgets Will Decline $665B Over Next Decade Under H.R. 1",
      summary:
        "RAND Health analysis finds state Medicaid budgets face a total $665B reduction over the next decade. With FQHCs deriving ~43% of revenue from Medicaid, this signals sustained revenue compression — not a one-time cut. CBO estimates 11.8M will directly lose coverage, plus 3.1M through marketplace plans.",
      sourceUrl: "https://stateline.org/2026/03/04/state-medicaid-budgets-will-decline-by-665-billion-under-new-federal-law-report-finds/",
      sourceOrg: "Stateline / RAND Health",
    },
  ],

  workforceUpdates: [
    {
      headline: "Neighborhood Healthcare CEO: 'Hundreds of FQHCs Will Shut Down in a Year'",
      summary:
        "Neighborhood Healthcare's Director of External Affairs warned that hundreds of California FQHCs face closure within a year as H.R. 1 cuts take effect. 75,000 noncitizens in San Diego County alone will lose Medi-Cal access by October 2026. SD County supervisors voted 4-1 to explore 'Safety Net Bridge' clinics and a $360M/year sales tax ballot measure. Healthcare leaders predict hospitals will be 'overrun' as clinics close.",
      sourceUrl: "https://www.nhcare.org/local-healthcare-institutions-prepare-for-impact-of-hr1-cuts-government-shutdown/",
      sourceOrg: "Neighborhood Healthcare",
    },
    {
      headline: "Kaiser Mental Health Strike: AI Replacement Fears Drive March 18 Walkout",
      summary:
        "100+ mental health workers at Kaiser Santa Rosa (NUHW) struck March 18 over AI replacement concerns. Kaiser's HR VP called it a 'false narrative,' but the union alleges outsourcing. This follows the 31,000-worker nursing strike that ended with a 21.5% raise. Displaced Kaiser mental health professionals are potential FQHC recruits — especially in the North Bay where BH staffing gaps are critical.",
      sourceUrl: "https://www.pressdemocrat.com/2026/03/05/kaiser-permanente-mental-health-workers-in-santa-rosa-set-to-strike-this-month/",
      sourceOrg: "Press Democrat",
    },
    {
      headline: "Santa Barbara: $5M Wyatt Gift Funds Largest FQHC Expansion on the Central Coast",
      summary:
        "Santa Barbara Neighborhood Clinics received a $5M gift from the Wyatt family — the largest in the FQHC's history. The new Wyatt Family Health Center (opening December 2026) will expand capacity from 20,000 to 28,000 patients (+41%). SBNC serves 1 in 10 South SB County residents; 92% are low-income. In a sea of cuts, this is a rare expansion story — and a model for philanthropic revenue diversification.",
      sourceUrl: "https://www.independent.com/2026/03/11/guardian-angels-drop-5-million-donation-on-new-santa-barbara-neighborhood-clinic/",
      sourceOrg: "Santa Barbara Independent",
    },
  ],

  aiUpdates: [
    {
      headline: "AHRQ Funds $2M Study on Safe AI Scribe Implementation in Primary Care",
      summary:
        "The Agency for Healthcare Research and Quality awarded $2M to Brigham and Women's Hospital to develop a guide for safe integration of ambient AI scribes into primary care. This federal validation signals ambient AI is moving from hype to evidence-based implementation — use this as justification when pitching AI adoption to your board.",
      sourceUrl: "https://digital.ahrq.gov/ahrq-funded-projects/search/download?page=&_format=csv",
    },
    {
      headline: "Peterson Institute: Ambient AI Scribes Are Fastest-Adopted Health Tech in History",
      summary:
        "A Peterson Health Technology Institute report confirms ambient AI scribes are becoming the fastest-adopted technology in healthcare history. Neighborhood Healthcare (CA FQHC, 500K+ visits) successfully piloted Nabla AI scribes. But rural FQHCs face connectivity and cost barriers — North Country Healthcare (AZ) found implementation harder than expected.",
      sourceUrl: "https://www.beckershospitalreview.com/healthcare-information-technology/ai/from-pilot-to-priority-the-rise-of-ambient-ai-scribes-in-healthcare/",
    },
  ],

  keyDates: [
    {
      date: "Apr 2, 2026",
      event: "CHCF Rural North event in Redding — Medicaid cut impact on rural FQHCs",
    },
    {
      date: "Apr 20, 2026",
      event: "HRSA RFI comments due on 340B Rebate Model (H.R. 7391 would exempt FQHCs)",
    },
    {
      date: "Jun 2, 2026",
      event: "LA County half-cent health sales tax on primary ballot (~$1B/year)",
    },
    {
      date: "Jul 1, 2026",
      event: "CA eliminates FQHC PPS rates for undocumented patients (~$1B revenue impact)",
    },
    {
      date: "Dec 31, 2026",
      event: "CalAIM waiver expires ($1.2B ECM/Community Supports at risk)",
    },
    {
      date: "Dec 31, 2026",
      event: "CHCF $4.6B authorization expires (no multi-year renewal announced)",
    },
  ],

  featuredContent: {
    title: "Your FQHC's Strategic Intelligence Report",
    description:
      "We built a free 10-section strategic report for every one of California's 215 FQHCs — resilience assessment, funding vulnerability, workforce intel, related intelligence, and action items. Find yours and see how your organization scores.",
    url: "https://www.fqhctalent.com/strategy/resilience",
  },
};

export const PULSE_002: PulseContent = {
  issueNumber: 2,
  date: "March 20, 2026",

  summary:
    "1,674 FQHC jobs across California this week — AltaMed is on a hiring surge with 270 open positions (+22 since last week). Meanwhile, the FQHC sector is dealing with the STAT News 'structural insolvency' bombshell, but here's what that means for you: FQHCs need efficiency more than ever, which means bilingual staff, ECM-trained coordinators, and anyone who can help do more with less is in high demand. Now is the time to position yourself as the solution, not part of the problem they're cutting.",

  jobHighlights: {
    totalJobs: 1674,
    newThisWeek: 22,
    topFQHCs: [
      {
        name: "AltaMed Health Services",
        count: 270,
        url: "https://www.fqhctalent.com/jobs?fqhc=altamed-health-services",
      },
      {
        name: "La Clinica de la Raza",
        count: 187,
        url: "https://www.fqhctalent.com/jobs?fqhc=la-clinica-de-la-raza",
      },
      {
        name: "Family Health Centers of San Diego",
        count: 145,
        url: "https://www.fqhctalent.com/jobs?fqhc=family-health-centers-of-san-diego",
      },
      {
        name: "Community Health Centers of Central Coast",
        count: 48,
        url: "https://www.fqhctalent.com/jobs?fqhc=community-health-centers-of-the-central-coast",
      },
    ],
  },

  marketTrends: [
    {
      headline: "STAT News Says FQHCs Are 'Structurally Insolvent' — What It Means for Your Job Search",
      summary:
        "A major STAT News analysis this week argued FQHCs face structural insolvency beyond just funding cuts. For job seekers, this actually creates opportunity: FQHCs desperately need people who can help them become more efficient — revenue cycle specialists, data analysts, grant writers, and anyone with ECM/CalAIM experience. Positions that generate or protect revenue are the most secure.",
    },
    {
      headline: "LA County's $1B Health Tax Could Create Thousands of FQHC Jobs",
      summary:
        "LA County placed a half-cent sales tax on the June 2 ballot that would generate $1B/year for safety-net care. If it passes, expect a surge in FQHC hiring across Southern California — especially care coordinators, community health workers, and clinical staff. St. John's Community Health alone has 28 clinics that could expand. Keep an eye on this vote.",
    },
    {
      headline: "AI Scribe Skills Are Becoming a Resume Differentiator",
      summary:
        "Two major developments this week: AHRQ funded a $2M study on safe AI scribe implementation, and the Peterson Institute confirmed ambient AI is the fastest-adopted health tech in history. FQHCs are actively deploying these tools (AltaMed has Abridge across 60+ sites). If you have any AI documentation experience, make sure it's on your resume.",
    },
  ],

  toolSpotlight: {
    name: "FQHC Resume Builder — Now with Provider Templates",
    description:
      "Our free resume builder now includes templates for 12 FQHC roles — including new provider templates for Physicians, NPs, PAs, and Dentists. Each template includes FQHC-specific bullet points that hiring managers actually screen for: ECM experience, UDS reporting, PCMH, PPS billing, and CalAIM readiness.",
    url: "https://www.fqhctalent.com/resume-builder",
  },

  careerTips: [
    {
      title: "Revenue-Generating Roles Are the Most Secure in 2026",
      body: "With FQHCs operating at negative margins for the first time ever, positions that directly generate or protect revenue are the safest bets: revenue cycle specialists, billing coders, grant writers, ECM coordinators (billable), and 340B pharmacy staff. If your role touches revenue, highlight that in every interview.",
    },
    {
      title: "The Kaiser Strike Created an Opening for BH Professionals",
      body: "100+ mental health workers struck at Kaiser Santa Rosa this month, and the 31,000-nurse strike ended with a 21.5% raise. Kaiser's labor costs are rising, which may push some BH professionals toward FQHCs. If you're a licensed therapist, LCSW, or psychologist considering a switch, FQHC behavioral health integration programs offer competitive pay with a mission-driven environment.",
    },
  ],

  featuredPost: {
    title: "Compare FQHCs Side by Side Before You Apply",
    excerpt:
      "Not sure which FQHC is right for you? Our free comparison tool lets you evaluate up to 3 FQHCs side-by-side across 10 dimensions: Glassdoor ratings, programs, resilience scores, salary ranges, union status, and more. Make an informed decision about where to build your career.",
    url: "https://www.fqhctalent.com/compare",
  },
};

/* ================================================================== */
/*  ISSUE #3 — Week of March 25, 2026                                 */
/* ================================================================== */

export const INTEL_BRIEF_003: IntelBriefContent = {
  issueNumber: 3,
  date: "March 25, 2026",

  executiveSummary:
    "Healthcare lost 28K jobs in February — the first negative month in three years. CBO scores H.R. 1 at $30B/year in Medicaid cuts; California bears the largest exposure. One bright spot: the 4th Circuit vacated HRSA's 340B pilot, a rare legal win for FQHCs. But 77% of CA counties report mental health shortages, dental cuts hit July 1, and NACHC warns 1 in 4 FQHCs may need emergency stabilization by Q4.",

  /* ---------- THE HARD TRUTH (red dots) ---------- */
  badNews: [
    {
      headline: "CBO Scores H.R. 1 at $30B/Year in Medicaid Cuts — CA Bears Largest Exposure",
      summary:
        "Updated CBO score: $880B in federal Medicaid reductions over 10 years. California's 15.4M enrollees face the biggest single-state hit. DHCS estimates 2.7M could lose coverage.",
      sourceUrl: "https://www.cbo.gov/publication/60935",
      sourceOrg: "Congressional Budget Office",
      impactLevel: "critical",
    },
    {
      headline: "Healthcare Lost 28K Jobs in February — First Negative Month in 3 Years",
      summary:
        "Hospitals (-17K) and nursing facilities (-8K) led losses. Ambulatory care held flat. Medicaid uncertainty is chilling hiring before formal cuts hit.",
      sourceUrl: "https://www.bls.gov/news.release/empsit.nr0.htm",
      sourceOrg: "Bureau of Labor Statistics",
      impactLevel: "critical",
    },
    {
      headline: "Medi-Cal Dental Cuts for Undocumented Patients — July 1, $308M Impact",
      summary:
        "Dental benefits for undocumented enrollees end July 1. Unlike medical visits (which drop to FFS), dental gets zero reimbursement. Model your dental program impact now.",
      sourceUrl: "https://www.dhcs.ca.gov/services/medi-cal/Pages/Dental.aspx",
      sourceOrg: "CA Dept. of Health Care Services",
      impactLevel: "critical",
    },
    {
      headline: "NACHC: 1 in 4 FQHCs May Need Emergency Stabilization by Q4",
      summary:
        "Flat Section 330 grants + rising costs + Medicaid cuts = 'triple compression.' NACHC requesting $2.1B in emergency stabilization over 2 years.",
      sourceUrl: "https://www.nachc.org/policy-advocacy/health-center-funding/",
      sourceOrg: "NACHC",
      impactLevel: "high",
    },
    {
      headline: "77% of CA Counties Report Mental Health Provider Shortages",
      summary:
        "Rural counties hit hardest — Siskiyou, Modoc, Lassen have fewer than 5 MH providers per 100K. BH visits are billable and increasingly valued by managed care.",
      sourceUrl: "https://www.chcf.org/publication/california-mental-health-provider-shortage/",
      sourceOrg: "California Health Care Foundation",
      impactLevel: "high",
    },
    {
      headline: "Kaiser Nursing Contract Settles at 21.5% Raise — Wage Pressure Hits FQHCs",
      summary:
        "The new Kaiser benchmark is resetting salary expectations across CA. FQHCs competing for RNs/NPs face upward pressure, especially in Bay Area and Sacramento.",
      sourceUrl: "https://www.beckershospitalreview.com/hr/kaiser-permanente-strike-31000-nurses-ratify-contract.html",
      sourceOrg: "Becker's Hospital Review",
    },
  ],

  /* ---------- THE BRIGHT SPOTS (green dots) ---------- */
  goodNews: [
    {
      headline: "4th Circuit Vacates HRSA's 340B Pilot — FQHCs Win on Drug Pricing",
      summary:
        "Court ruled HRSA exceeded its authority. Upfront ceiling-price purchasing stays. Watch H.R. 7391 (35 cosponsors) to make the exemption permanent.",
      sourceUrl: "https://www.340bhealth.org/newsroom/press-releases/court-vacates-340b-rebate-pilot/",
      sourceOrg: "340B Health",
      impactLevel: "high",
    },
    {
      headline: "CA Counties Are Creating Their Own Health Taxes — $1.3B+ and Growing",
      summary:
        "Santa Clara's Measure A ($330M/yr) goes live April 1. A second county has a $1B/yr measure on the June 2 ballot at 58% support. San Diego and Alameda are exploring similar models. A new county-level revenue strategy is emerging statewide.",
      sourceUrl: "https://kffhealthnews.org/news/article/federal-cuts-state-tax-increases-budget-shortfalls-health-clinics-los-angeles-california/",
      sourceOrg: "KFF Health News",
    },
    {
      headline: "Santa Clara Measure A Revenue Starts April 1 — $330M/Year Now Flowing",
      summary:
        "First actual revenue from a county-level Medicaid offset. San Diego and Alameda are watching closely to replicate the model.",
      sourceUrl: "https://www.naco.org/news/california-county-sales-tax-measure-backfills-federal-healthcare-cuts",
      sourceOrg: "National Association of Counties",
    },
    {
      headline: "NextGen Ambient AI Cuts 1.5–2 Hours/Day of Documentation at FQHCs",
      summary:
        "Two community health centers report near-instant drops in after-hours charting after deploying NextGen Ambient Assist natively inside the EHR. Over 90% accuracy on SOAP notes.",
      sourceUrl: "https://www.healthcareittoday.com/2026/02/10/how-nextgen-healthcares-ambient-ai-helped-two-clinics-break-the-cycle-of-pajama-time/",
      sourceOrg: "Healthcare IT Today",
    },
    {
      headline: "CMS Prior Auth Transparency Rules Take Effect — MA Plans Must Explain Denials",
      summary:
        "Under CMS-0057-F, MA plans, Medicaid MCOs, and CHIP must now give specific denial reasons and publicly report prior auth metrics. New leverage for FQHCs fighting opaque denials.",
      sourceUrl: "https://www.cms.gov/cms-interoperability-and-prior-authorization-final-rule-cms-0057-f",
      sourceOrg: "CMS",
    },
  ],

  /* ---------- SUCCESS STORY ---------- */
  successStory: {
    org: "Santa Barbara Neighborhood Clinics",
    title: "$5M Gift Funds Largest FQHC Expansion on the Central Coast",
    summary:
      "The Wyatt family donation — the largest in SBNC's history — will fund a new health center opening December 2026. SBNC serves 1 in 10 South Santa Barbara County residents; 92% are low-income. In a sea of cuts, this is a rare expansion story and a model for philanthropic revenue diversification.",
    result: "Capacity grows from 20,000 to 28,000 patients (+41%)",
    sourceUrl: "https://www.independent.com/2026/03/11/guardian-angels-drop-5-million-donation-on-new-santa-barbara-neighborhood-clinic/",
  },

  /* ---------- TOOLKIT ---------- */
  toolkit: {
    title: "CHAI-NACHC AI Vendor Assessment Checklist",
    description:
      "The definitive pre-purchase evaluation framework for FQHCs considering AI tools. Built by the Coalition for Health AI and NACHC — covers safety-net appropriateness, bias testing, interoperability, and lock-in risk.",
    url: "https://www.nachc.org/chai-and-nachc-join-forces-to-prioritize-community-health-centers-in-ai-adoption/",
  },

  /* ---------- Legacy fields (required by interface, empty for new layout) ---------- */
  policyUpdates: [],
  fundingAlerts: [],
  workforceUpdates: [],
  aiUpdates: [],

  keyDates: [
    {
      date: "Apr 1, 2026",
      event: "Santa Clara Measure A revenue begins ($330M/yr for healthcare)",
    },
    {
      date: "Apr 2, 2026",
      event: "CHCF Rural North event in Redding — Medicaid cut impact on rural FQHCs",
    },
    {
      date: "Apr 20, 2026",
      event: "HRSA 340B Rebate Model RFI comments due (pilot vacated, but watch for legislative alternatives)",
    },
    {
      date: "Jan 1, 2027",
      event: "CMS prior auth API requirements deadline for MA/Medicaid plans (CMS-0057-F)",
    },
    {
      date: "Jun 2, 2026",
      event: "CA county $1B/yr health sales tax on primary ballot (second county to vote)",
    },
    {
      date: "Jul 1, 2026",
      event: "CA eliminates FQHC PPS rates + dental benefits for undocumented patients",
    },
    {
      date: "Dec 31, 2026",
      event: "CalAIM waiver + CHCF $4.6B authorization both expire",
    },
  ],

  featuredContent: {
    title: "FQHC Academy — Free 30-Day Email Course",
    description:
      "15 bite-size lessons on PPS billing, CalAIM, 340B, and more. Bilingual quizzes. Track progress on your dashboard.",
    url: "https://www.fqhctalent.com/academy",
  },

  movementTrivia: {
    fact: "In 1965, a group of Black women in Mound Bayou, Mississippi formed the first community health center board — insisting that patients, not doctors, should govern the clinics that served them. That principle of community governance is still the law for every FQHC today.",
    source: "National Association of Community Health Centers",
  },

  watchingNextWeek: [
    {
      item: "DHCS CalAIM waiver renewal application",
      why: "No submission yet — each week increases risk for the $1.2B program.",
    },
    {
      item: "Senate markup of H.R. 1",
      why: "Amendments could change the Medicaid cut trajectory.",
    },
    {
      item: "CA county health tax ballot polling",
      why: "58% support is fragile. Opposition spending is accelerating.",
    },
  ],
};

/* ------------------------------------------------------------------ */

export const PULSE_003: PulseContent = {
  issueNumber: 3,
  date: "March 25, 2026",

  summary:
    "Healthcare lost 28K jobs in February — first negative month in three years. But FQHCs held flat. The safety net needs bilingual staff, BH professionals (77% of CA counties have shortages), and ECM-trained coordinators more than ever. 1,674 open positions this week.",

  jobHighlights: {
    totalJobs: 1674,
    newThisWeek: 31,
    topFQHCs: [
      {
        name: "AltaMed Health Services",
        count: 275,
        url: "https://www.fqhctalent.com/jobs?fqhc=altamed-health-services",
      },
      {
        name: "La Clinica de la Raza",
        count: 192,
        url: "https://www.fqhctalent.com/jobs?fqhc=la-clinica-de-la-raza",
      },
      {
        name: "Family Health Centers of San Diego",
        count: 148,
        url: "https://www.fqhctalent.com/jobs?fqhc=family-health-centers-of-san-diego",
      },
      {
        name: "Santa Barbara Neighborhood Clinics",
        count: 22,
        url: "https://www.fqhctalent.com/jobs?fqhc=santa-barbara-neighborhood-clinics",
      },
    ],
  },

  marketTrends: [
    {
      headline: "Healthcare Lost 28K Jobs — But FQHCs Held Flat",
      summary:
        "Hospitals (-17K) and nursing facilities (-8K) cut. Ambulatory care held. FQHCs that kept hiring through uncertainty have stronger financials — target them.",
    },
    {
      headline: "77% of CA Counties Have BH Shortages — Jobs Are Everywhere",
      summary:
        "Licensed therapists, LCSWs, psychiatric NPs: FQHCs offer competitive pay plus NHSC loan repayment. Rural counties have fewer than 5 MH providers per 100K.",
    },
    {
      headline: "CA County Health Taxes Could Trigger Statewide Hiring Surges",
      summary:
        "Multiple California counties are putting health sales taxes on the ballot to offset Medicaid cuts. If they pass, expect FQHC hiring waves across the state. Update your resume now.",
    },
  ],

  toolSpotlight: {
    name: "FQHC Academy — Free Email Course",
    description:
      "15 bite-size lessons on PPS billing, CalAIM, 340B, and clinical ops. Bilingual quizzes. Show FQHC knowledge before your interview.",
    url: "https://www.fqhctalent.com/academy",
  },

  careerTips: [
    {
      title: "Use the Kaiser Benchmark in Salary Negotiations",
      body: "Kaiser's new 21.5% nursing raise is resetting expectations. FQHCs can't match base salary, but total comp (NHSC loan repayment + schedule flexibility + lower patient ratios) often wins. Know your numbers.",
    },
    {
      title: "NextGen AI Is Live — Put It on Your Resume",
      body: "NextGen just deployed ambient AI natively across its FQHC EHR. If you've used it, add 'NextGen ambient AI documentation' to your skills. If not, ask about it in interviews.",
    },
    {
      title: "Revenue-Adjacent Roles Are the Safest Bet",
      body: "With 1 in 4 FQHCs facing stabilization risk, roles that generate or protect revenue are most secure: billing coders, grant writers, ECM coordinators, 340B pharmacy staff.",
    },
  ],

  featuredPost: {
    title: "10 FQHC Interview Questions They Will Ask",
    excerpt:
      "Mission alignment, cultural humility, underserved community experience. Free prep tool with STAR framework examples and role-specific coaching.",
    url: "https://www.fqhctalent.com/interview-prep",
  },

  successStory: {
    org: "Santa Barbara Neighborhood Clinics",
    headline: "$5M Gift Opens 8,000 New Patient Slots on the Central Coast",
    summary:
      "The Wyatt family donation — the largest in SBNC's history — funds a new health center opening December 2026. SBNC serves 1 in 10 South Santa Barbara County residents, and 92% of patients are low-income. They're hiring now to staff the expansion: 22 open positions this week.",
    sourceUrl: "https://www.independent.com/2026/03/11/guardian-angels-drop-5-million-donation-on-new-santa-barbara-neighborhood-clinic/",
  },

  movementTrivia: {
    fact: "La Clinica de la Raza was founded in 1971 by Chicana activists in Oakland's Fruitvale district who were tired of watching their neighbors get turned away from hospitals. Today it's one of the largest FQHCs in California — 192 open positions this week alone.",
    source: "La Clinica de la Raza archives",
  },

  watchingNextWeek: [
    {
      item: "March BLS jobs report (April 4)",
      why: "Will the 28K loss continue or bounce back?",
    },
    {
      item: "CA county health tax ballot polling",
      why: "If it passes June 2, expect a statewide FQHC hiring wave.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Edition Index — Add new editions here for easy access              */
/* ------------------------------------------------------------------ */

export const NEWSLETTER_EDITIONS = {
  intelBrief: [INTEL_BRIEF_001, INTEL_BRIEF_002, INTEL_BRIEF_003],
  pulse: [PULSE_001, PULSE_002, PULSE_003],
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
