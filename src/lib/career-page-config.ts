// Career page configuration for FQHC job scraping
// Tracks which FQHC career pages are scrapeable by the /scrape-jobs command
// Updated automatically when the command runs
// Last updated: 2026-03-07 (daily update #14, expanded with 20+ FQHCs)

/** Exported for display on pages — updated by /daily-update and /scrape-jobs pipelines */
export const CAREER_CONFIG_LAST_UPDATED = "2026-04-10";

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
    lastChecked: "2026-03-27",
    atsApiUrl:
      "https://altamed.wd1.myworkdayjobs.com/wday/cxs/altamed/Careers/jobs",
    notes:
      "Largest FQHC in CA. 255 jobs found 2026-04-10 (prev 254, +1 — stable). AltaMed generated $15.1B economic impact (2019-2024), supports 12,000 jobs, serves 465,000 Medi-Cal patients. Abridge AI scribe deployment confirmed. Workday JSON API works. POST with {appliedFacets:{},limit:20,offset:0,searchText:''}.",
  },
  {
    fqhcSlug: "family-health-centers-of-san-diego",
    scrapeable: true,
    atsType: "workday",
    lastChecked: "2026-03-27",
    atsApiUrl:
      "https://fhcsd.wd1.myworkdayjobs.com/wday/cxs/fhcsd/MAIN/jobs",
    notes:
      "121 jobs found 2026-04-10 (prev 124, -3 — continued decline, down from 157 peak). DOC (physician) portal currently shows 0 jobs. Blue Shield invested $80K in MA training scholarships at FHCSD Laura Rodriguez MA Institute. Two Workday sites: MAIN and DOC (physicians). DOC endpoint: https://fhcsd.wd1.myworkdayjobs.com/wday/cxs/fhcsd/DOC/jobs",
  },
  {
    fqhcSlug: "asian-health-services",
    scrapeable: true,
    atsType: "lever",
    lastChecked: "2026-03-28",
    atsApiUrl: "https://api.lever.co/v0/postings/ahschc?mode=json",
    notes:
      "20 jobs found 2026-04-10 (prev 21, -1 — slight decline). Lever slug is 'ahschc'.",
  },
  {
    fqhcSlug: "la-clinica-de-la-raza",
    scrapeable: true,
    atsType: "direct",
    lastChecked: "2026-03-28",
    atsApiUrl:
      "http://laclinica.hrmdirect.com/employment/job-openings.php?search=true&dept=-1&city=-1&state=-1",
    notes:
      "173 jobs found 2026-04-10 (prev 174, -1 — stable). Uses HRMDirect — server-rendered HTML, scrapeable via WebFetch. No JSON API but standard HTML parsing works.",
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
    scrapeable: true,
    atsType: "icims",
    lastChecked: "2026-03-15",
    atsApiUrl: "https://nonprovider-unitedhealthcenters.icims.com/jobs/search",
    notes:
      "iCIMS portal — JS-rendered but WebFetch can extract paginated data. Two portals: nonprovider (~54 jobs, 4 pages) and provider (~20 jobs, 2 pages). ~74 total openings found 2026-03-15. 72 listings in static data (uhc-001 to uhc-072). New batch added 2026-03-15: 32 jobs including ECM Lead Care Manager, QI Specialist, Data Analyst, CPHW, WIC RD, PA-C, FNP, 2 Physicians ($200-270K), LCSW, Optometrist, plus MAs across Sanger/Reedley/Parlier/Kerman/Dinuba. Locations: Fresno (multiple sites), Sanger, Reedley, Selma, Hanford, Delano, Lemoore, Parlier, Fowler, Huron, Kerman, Visalia, Dinuba, Corcoran. Major Central Valley FQHC (Fresno/Tulare/Kings/Madera counties, 22+ sites, 120K+ patients).",
  },

  // ── Additional Workday (JSON API available) ── ✅
  {
    fqhcSlug: "open-door-community-health-centers",
    scrapeable: true,
    atsType: "workday",
    lastChecked: "2026-04-07",
    atsApiUrl:
      "https://opendoorhealth.wd503.myworkdayjobs.com/wday/cxs/opendoorhealth/ODCHC/jobs",
    notes:
      "42 jobs found 2026-04-07 (prev 46, -4 — slight decline). Workday wd503 tenant confirmed. User-Agent header required. Limit max 20 per request. Categories: Clinical Operations (4), Dental (1), Finance (2), IT (1), Medical Clinical (15), Patient Services (2), Provider (20). Locations: Eureka (19), Crescent City (7), Fortuna (6), Arcata (5), McKinleyville (3), Willow Creek (3), Ferndale (2), ECHC (1). Rural North Coast FQHC (Humboldt, Del Norte, Trinity counties).",
  },
  {
    fqhcSlug: "valley-health-team",
    scrapeable: false,
    atsType: "unknown",
    lastChecked: "2026-03-15",
    atsApiUrl: null,
    notes:
      "NOT Workday — wd5 endpoint is Valley Health System (Winchester, VA), wrong org. Website valleyhealthteam.org redirects to vht.org. No careers page found at vht.org. ATS unknown. Central Valley FQHC (Fresno area). Needs manual investigation.",
  },

  // ── iCIMS (API available) ── ✅
  {
    fqhcSlug: "marin-community-clinics",
    scrapeable: true,
    atsType: "icims",
    lastChecked: "2026-03-15",
    atsApiUrl: "https://careers-marinclinic.icims.com/jobs/search",
    notes:
      "iCIMS portal — JS-rendered but WebFetch can extract paginated data. ~62 jobs found 2026-03-15 (4 pages, prev ~20 page 1 only). 44 listings in static data (marin-001 to marin-044). New batch added 2026-03-15: 21 jobs including Director BH Fellowship Training, RN, MA Supervisor, Revenue Cycle Liaison, Medical Scribe, 5 Physicians ($243-286K), 3 FNP/PAs ($135-170K), BH Clinical Supervisor LCSW, Dentists, Senior Financial Analyst. Locations: San Rafael, Novato, Larkspur, Greenbrae. Bay Area FQHC (Marin County, 6 sites, 32K+ patients, OCHIN Epic).",
  },

  // ── JobVite (API available) ── ✅
  {
    fqhcSlug: "petaluma-health-center",
    scrapeable: true,
    atsType: "jobvite",
    lastChecked: "2026-04-07",
    atsApiUrl: "https://jobs.jobvite.com/phc/jobs",
    notes:
      "JobVite portal at jobs.jobvite.com/phc/jobs — WebFetch can extract full job list. 30 jobs found 2026-04-07 (prev 24, +6 — hiring uptick). 27 listings in static data (phc-001 to phc-027). Departments: Billing, Dental, Dental Providers, Finance, Medical Assistants, Mental Health Providers, Nurse Practitioner, OB, Primary Care Providers, Urgent Care, Vision. New: Medical Director Rural Health, Urgent Care Physician, Staff Dentist, Internal Medicine Physician. Petaluma/Sonoma County FQHC. 3.9★ Glassdoor, 20 sites, 41K+ patients, OCHIN Epic.",
  },

  // ── SmartRecruiters (API available) ── ✅
  {
    fqhcSlug: "the-davis-street-community-center",
    scrapeable: false,
    atsType: "smartrecruiters",
    lastChecked: "2026-03-15",
    atsApiUrl:
      "https://careers.smartrecruiters.com/DavisStreetCommunityCenterInc",
    notes:
      "SmartRecruiters API confirmed — both 'DavisStreetCommunityCenterInc' and 'DavisStreetCommunityCenter' return totalFound: 0. No public postings available as of 2026-03-15. Small East Bay FQHC may not be actively hiring or uses different recruitment channels.",
  },

  // ── HRMDirect (server-rendered HTML, scrapeable) ── ✅
  {
    fqhcSlug: "community-health-centers-central-coast",
    scrapeable: true,
    atsType: "direct",
    lastChecked: "2026-03-15",
    atsApiUrl:
      "https://communityhealthcenters.hrmdirect.com/employment/job-openings.php?search=true&nohd=&dept=-1&city=-1&state=-1",
    notes:
      "48 jobs found 2026-03-15. Uses HRMDirect — same ATS as La Clinica. Server-rendered HTML, scrapeable via WebFetch. Central Coast FQHC (Santa Barbara + SLO counties, 15 sites, 75K+ patients, OCHIN Epic). Heavy provider hiring: 14 physicians, 3 NP/PAs, 2 dentists. Departments: Medical, Dental, Behavioral Health, IT, Billing, Optometry, Referrals, Administration, PACE.",
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
