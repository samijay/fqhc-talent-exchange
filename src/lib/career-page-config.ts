// Career page configuration for FQHC job scraping
// Tracks which FQHC career pages are scrapeable by the /scrape-jobs command
// Updated automatically when the command runs
// Last updated: 2026-03-07 (daily update #14, expanded with 20+ FQHCs)

/** Exported for display on pages — updated by /daily-update and /scrape-jobs pipelines */
export const CAREER_CONFIG_LAST_UPDATED = "2026-03-13";

export interface CareerPageConfig {
  fqhcSlug: string;
  scrapeable: boolean; // false = skip (behind JS-rendered ATS, login wall, etc.)
  atsType:
    | "direct" // Simple HTML career page (or HRMDirect)
    | "lever" // Lever ATS (JSON API available)
    | "paycom" // Paycom ATS (JS-only, not scrapeable)
    | "adp" // ADP Workforce Now (JS-only, not scrapeable)
    | "workday" // Workday (JSON API available!)
    | "icims" // iCIMS (API available via careers-*.icims.com)
    | "bamboohr" // BambooHR
    | "jobvite" // JobVite (jobs.jobvite.com API available)
    | "smartrecruiters" // SmartRecruiters (careers.smartrecruiters.com API available)
    | "neogov" // NEOGOV (government jobs portal, not API-accessible)
    | "paylocity" // Paylocity (recruiting.paylocity.com, not API-accessible)
    | "atsondemand" // AtsOnDemand (proprietary, not API-accessible)
    | "governmentjobs" // GovernmentJobs.com / NEOGOV cloud, not API-accessible
    | "unknown" // Not yet determined
    | null;
  lastChecked: string | null; // ISO date (YYYY-MM-DD)
  // For Workday: POST endpoint URL for job list API
  // For Lever: company slug for https://api.lever.co/v0/postings/{slug}
  // For HRMDirect: full URL to job listings page
  atsApiUrl?: string | null;
  notes: string | null; // Why it's not scrapeable, or useful context
}

// Start with the FQHCs that have the most job listings (most likely to be actively hiring)
// This list grows over time as the /scrape-jobs command checks more career pages
export const CAREER_PAGE_CONFIGS: CareerPageConfig[] = [
  // ── Scrapeable via JSON API ── ✅
  {
    fqhcSlug: "altamed-health-services",
    scrapeable: true,
    atsType: "workday",
    lastChecked: "2026-03-12",
    atsApiUrl:
      "https://altamed.wd1.myworkdayjobs.com/wday/cxs/altamed/Careers/jobs",
    notes:
      "Largest FQHC in CA. 251 jobs found 2026-03-13 (prev 253, -2). AltaMed generated $15.1B economic impact (2019-2024), supports 12,000 jobs, serves 465,000 Medi-Cal patients. Abridge AI scribe deployment confirmed. Workday JSON API works. POST with {appliedFacets:{},limit:20,offset:0,searchText:''}.",
  },
  {
    fqhcSlug: "family-health-centers-of-san-diego",
    scrapeable: true,
    atsType: "workday",
    lastChecked: "2026-03-12",
    atsApiUrl:
      "https://fhcsd.wd1.myworkdayjobs.com/wday/cxs/fhcsd/MAIN/jobs",
    notes:
      "160 jobs found 2026-03-13 (prev 162, -2). DOC (physician) portal currently shows 0 jobs. Blue Shield invested $80K in MA training scholarships at FHCSD Laura Rodriguez MA Institute. Two Workday sites: MAIN and DOC (physicians). DOC endpoint: https://fhcsd.wd1.myworkdayjobs.com/wday/cxs/fhcsd/DOC/jobs",
  },
  {
    fqhcSlug: "asian-health-services",
    scrapeable: true,
    atsType: "lever",
    lastChecked: "2026-03-12",
    atsApiUrl: "https://api.lever.co/v0/postings/ahschc?mode=json",
    notes:
      "21 jobs found 2026-03-13 (prev 21, =). Lever slug is 'ahschc'.",
  },
  {
    fqhcSlug: "la-clinica-de-la-raza",
    scrapeable: true,
    atsType: "direct",
    lastChecked: "2026-03-12",
    atsApiUrl:
      "http://laclinica.hrmdirect.com/employment/job-openings.php?search=true&dept=-1&city=-1&state=-1",
    notes:
      "189 jobs found 2026-03-13 (prev 188, +1). Uses HRMDirect — server-rendered HTML, scrapeable via WebFetch. No JSON API but standard HTML parsing works.",
  },

  // ── ADP Workforce Now (JS-only, not scrapeable) ── ❌
  {
    fqhcSlug: "northeast-valley-health-corporation",
    scrapeable: false,
    atsType: "adp",
    lastChecked: "2026-02-17",
    notes:
      "ADP Workforce Now. JS-rendered, no public API. ADP URL: https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=2a4a9296-...",
  },
  {
    fqhcSlug: "clinica-sierra-vista",
    scrapeable: false,
    atsType: "adp",
    lastChecked: "2026-02-17",
    notes:
      "ADP Workforce Now. JS-rendered, no public API. Major Central Valley FQHC.",
  },
  {
    fqhcSlug: "st-johns-community-health",
    scrapeable: false,
    atsType: "adp",
    lastChecked: "2026-02-17",
    notes:
      "ADP Workforce Now (client=wellchild). JS-rendered, no public API.",
  },

  // ── Paycom (JS-only, not scrapeable) ── ❌
  {
    fqhcSlug: "apla-health",
    scrapeable: false,
    atsType: "paycom",
    lastChecked: "2026-02-17",
    notes:
      "Paycom ATS. JS-rendered, no public API. careersUrl: https://aplahealth.org/about/careers-and-internships-with-apla-health/",
  },

  // ── Unresolved / Blocked — need manual investigation ── ⏳
  {
    fqhcSlug: "san-ysidro-health",
    scrapeable: false,
    atsType: "unknown",
    lastChecked: "2026-03-07",
    atsApiUrl: "https://syhealth.org/join-our-team",
    notes:
      "Custom career portal at syhealth.org/join-our-team. Posts jobs on Indeed, Glassdoor, ZipRecruiter. No structured API detected. HTTP 000 on direct requests — likely requires browser.",
  },
  {
    fqhcSlug: "wellspace-health",
    scrapeable: false,
    atsType: "unknown",
    lastChecked: "2026-02-17",
    notes: "HTTP 403 — Cloudflare or WAF blocking curl/WebFetch requests.",
  },
  {
    fqhcSlug: "lifelong-medical-care",
    scrapeable: false,
    atsType: "unknown",
    lastChecked: "2026-02-17",
    notes: "HTTP 403 — site blocking automated requests.",
  },
  {
    fqhcSlug: "venice-family-clinic",
    scrapeable: false,
    atsType: "unknown",
    lastChecked: "2026-02-17",
    notes: "HTTP 403 — site blocking automated requests.",
  },
  {
    fqhcSlug: "borrego-health",
    scrapeable: false,
    atsType: "unknown",
    lastChecked: "2026-02-17",
    notes:
      "Cloudflare challenge page. Now operates as DAP Health. careersUrl: https://daphealth.org/careers/",
  },
  {
    fqhcSlug: "family-healthcare-network",
    scrapeable: false,
    atsType: "unknown",
    lastChecked: "2026-02-17",
    notes:
      "No ATS platform detected in HTML. May use embedded JS widget. Needs manual investigation.",
  },
  {
    fqhcSlug: "united-health-centers",
    scrapeable: false,
    atsType: "icims",
    lastChecked: "2026-03-07",
    atsApiUrl: "https://nonprovider-unitedhealthcenters.icims.com/jobs/search",
    notes:
      "iCIMS portal confirmed but JS-rendered only — curl returns HTML page, no JSON API. Cannot scrape programmatically. Two portals: nonprovider and provider. Manual review required. Major Central Valley FQHC (Fresno/Tulare/Kings/Madera counties).",
  },

  // ── Additional Workday (JSON API available) ── ✅
  {
    fqhcSlug: "open-door-community-health-centers",
    scrapeable: true,
    atsType: "workday",
    lastChecked: "2026-03-07",
    atsApiUrl:
      "https://opendoorhealth.wd503.myworkdayjobs.com/wday/cxs/opendoorhealth/ODCHC/jobs",
    notes:
      "46 jobs found 2026-03-12 (prev 42, +4). Workday wd503 tenant confirmed. Rural North Coast FQHC (Humboldt, Del Norte, Trinity counties).",
  },
  {
    fqhcSlug: "valley-health-team",
    scrapeable: false,
    atsType: "workday",
    lastChecked: "2026-03-07",
    atsApiUrl: null,
    notes:
      "Workday endpoint valleyhealthlink.wd5 returns Valley Health System (Winchester, VA) — completely different organization. Wrong tenant. Valley Health Team (CA) actual ATS unknown. Needs manual investigation via valleyhealthteam.org/careers.",
  },

  // ── iCIMS (API available) ── ✅
  {
    fqhcSlug: "marin-community-clinics",
    scrapeable: false,
    atsType: "icims",
    lastChecked: "2026-03-07",
    atsApiUrl: "https://careers-marinclinic.icims.com/jobs/search",
    notes:
      "iCIMS portal confirmed but JS-rendered only — returns HTML page, no JSON API. Cannot scrape programmatically. Manual review required at careers-marinclinic.icims.com.",
  },

  // ── JobVite (API available) ── ✅
  {
    fqhcSlug: "petaluma-health-center",
    scrapeable: false,
    atsType: "jobvite",
    lastChecked: "2026-03-07",
    atsApiUrl: "https://jobs.jobvite.com/phc/",
    notes:
      "JobVite portal confirmed at jobs.jobvite.com/phc/ but JS-rendered (AngularJS SPA). No public JSON endpoint at jobs.json — returns JS application shell. Cannot scrape programmatically. Petaluma/Sonoma County FQHC. 3.9★ Glassdoor.",
  },

  // ── SmartRecruiters (API available) ── ✅
  {
    fqhcSlug: "the-davis-street-community-center",
    scrapeable: false,
    atsType: "smartrecruiters",
    lastChecked: "2026-03-07",
    atsApiUrl:
      "https://careers.smartrecruiters.com/DavisStreetCommunityCenterInc",
    notes:
      "SmartRecruiters API tested — returns totalFound: 0. Company may not have public postings listed or company ID is incorrect. Try 'DavisStreetCommunityCenter' (without 'Inc') or check if postings require auth. Manual review at careers.smartrecruiters.com/DavisStreetCommunityCenterInc.",
  },

  // ── JazzHR (WebFetch-scrapeable, JS-rendered for API) ── ✅
  {
    fqhcSlug: "mission-neighborhood-health-center",
    scrapeable: true,
    atsType: "unknown",
    lastChecked: "2026-03-09",
    atsApiUrl: "https://missionareahealthassociates.applytojob.com/apply",
    notes:
      "JazzHR (applytojob.com). JS-rendered SPA — no direct JSON API accessible. WebFetch can read the rendered job list. 8 jobs found 2026-03-07. Added mnhc-004 to mnhc-012 (Controller, Accounting Manager, BH Clinician x2, Dental Mgr, Patient Navigator HIV, Pharmacy Tech, Security Guard, Optometry Tech). Use WebFetch on atsApiUrl.",
  },

  // ── Paylocity (not directly API-accessible) ── ❌
  {
    fqhcSlug: "salud-para-la-gente",
    scrapeable: false,
    atsType: "paylocity",
    lastChecked: "2026-03-07",
    atsApiUrl: "https://recruiting.paylocity.com/recruiting/jobs/List/2891",
    notes:
      "Paylocity ATS. Portal at recruiting.paylocity.com. Not standard JSON API. Santa Cruz County FQHC serving farmworkers. ~250 staff.",
  },

  // ── AtsOnDemand (proprietary, not scrapeable) ── ❌
  {
    fqhcSlug: "neighborhood-healthcare",
    scrapeable: false,
    atsType: "atsondemand",
    lastChecked: "2026-03-07",
    atsApiUrl: "https://nhcare.atsondemand.com",
    notes:
      "AtsOnDemand proprietary system. Not API-accessible. Neighborhood Healthcare (nhcare.org) — San Diego County FQHC, 25+ locations.",
  },

  // ── Paycom (not scrapeable) ── ❌
  {
    fqhcSlug: "community-medical-centers",
    scrapeable: false,
    atsType: "paycom",
    lastChecked: "2026-03-07",
    notes:
      "Paycom ESS at cmcenters.org/careers. JS-rendered, no public API. Central Valley (Stockton area). Also known as CMC Stockton. OCHIN Epic EHR.",
  },

  // ── NEOGOV / GovernmentJobs (not scrapeable) ── ❌
  {
    fqhcSlug: "solano-county-health-social-services-department",
    scrapeable: false,
    atsType: "neogov",
    lastChecked: "2026-03-07",
    atsApiUrl: "https://www.governmentjobs.com/careers/solanocounty",
    notes:
      "NEOGOV/GovernmentJobs.com. County government jobs portal — not API-accessible for scraping. Solano County government FQHC (Avatar/SmartCare EHR).",
  },
  {
    fqhcSlug: "riverside-university-health-system-chc",
    scrapeable: false,
    atsType: "governmentjobs",
    lastChecked: "2026-03-07",
    atsApiUrl: "https://ruhealth.org/ruhs-careers",
    notes:
      "Multiple portals: GovernmentJobs.com, LinkedIn. County government system. RUHS serves 95K+ patients across Riverside County. Epic $53M contract.",
  },
  {
    fqhcSlug: "county-of-ventura",
    scrapeable: false,
    atsType: "governmentjobs",
    lastChecked: "2026-03-07",
    atsApiUrl: "https://www.governmentjobs.com/careers/ventura",
    notes:
      "Ventura County Health Care Agency uses GovernmentJobs.com portal. County government, not scrapeable via API. 106K+ patients, Cerner EHR.",
  },
  {
    fqhcSlug: "county-of-santa-cruz",
    scrapeable: false,
    atsType: "governmentjobs",
    lastChecked: "2026-03-07",
    atsApiUrl: "https://santacruzhealth.org/HealthCenters/AboutUs/Careers.aspx",
    notes:
      "Santa Cruz County Health Services Agency. GovernmentJobs.com portal. OCHIN Epic EHR. $11-17M funding gap; 74 FTE cuts underway.",
  },

  // ── Unknown / Custom / Email-based ── ❌
  {
    fqhcSlug: "truecare",
    scrapeable: false,
    atsType: "unknown",
    lastChecked: "2026-03-09",
    atsApiUrl: "https://truecare.org/careers",
    notes:
      "HTTP 403 on WebFetch. Not on Lever or public Workday tenant. Recruiting email: Recruiting.Mailbox@truecare.org. San Diego County FQHC. 3.1★ Glassdoor, 956 staff, 27 sites.",
  },
  {
    fqhcSlug: "ole-health",
    scrapeable: false,
    atsType: "unknown",
    lastChecked: "2026-03-09",
    atsApiUrl: "https://communicareole.org/careers",
    notes:
      "Redirects olehealth.org → communicareole.org (merged with CommuniCare). Career page is JS-rendered, no ATS detected. Not on Lever (slug 'communicareole' returns 404). Napa Valley FQHC (~70K+ patients).",
  },
  {
    fqhcSlug: "elica-health-centers",
    scrapeable: false,
    atsType: "unknown",
    lastChecked: "2026-03-09",
    atsApiUrl: "https://elicahealth.org/careers",
    notes:
      "SSL certificate expired as of 2026-03-09. Site unreachable. Not on Lever. Sacramento area FQHC. 2.9★ Glassdoor, 600+ staff, 63K patients.",
  },
  {
    fqhcSlug: "dap-health",
    scrapeable: false,
    atsType: "unknown",
    lastChecked: "2026-03-09",
    atsApiUrl: "https://daphealth.org/careers",
    notes:
      "HTTP 403 on WebFetch. Not on Lever. ATS not identified (was Borrego Health). Desert/Palm Springs area FQHC. 3.3★ Glassdoor. Posts to Indeed, Glassdoor, LinkedIn.",
  },
  {
    fqhcSlug: "west-county-health-centers",
    scrapeable: false,
    atsType: "direct",
    lastChecked: "2026-03-07",
    atsApiUrl: "https://wchealth.org/news/employment",
    notes:
      "Email-based applications (hr@wchealth.org). No formal ATS. Listings posted on employment page as text. Sonoma County FQHC. 11,097 patients, athenahealth EHR.",
  },
  {
    fqhcSlug: "brighter-beginnings",
    scrapeable: false,
    atsType: "unknown",
    lastChecked: "2026-03-07",
    atsApiUrl: "https://brighter-beginnings.org/get-involved/careers",
    notes:
      "ATS not identified. Oakland/East Bay FQHC focused on early childhood. 3.8★ Glassdoor, 4,700 patients.",
  },
  {
    fqhcSlug: "clinicas-del-camino-real",
    scrapeable: false,
    atsType: "unknown",
    lastChecked: "2026-03-07",
    atsApiUrl: "https://careers.clinicas.org",
    notes:
      "Custom career portal at careers.clinicas.org. Also accepts fax/mail applications. Ventura County FQHC serving farmworkers.",
  },
  {
    fqhcSlug: "operation-samahan",
    scrapeable: false,
    atsType: "unknown",
    lastChecked: "2026-03-07",
    atsApiUrl: "https://operationsamahan.org/careers",
    notes:
      "ATS not identified. Posts to Indeed, Glassdoor. Filipino-American serving FQHC in San Diego. 1.9★ Glassdoor, eClinicalWorks EHR.",
  },
];
