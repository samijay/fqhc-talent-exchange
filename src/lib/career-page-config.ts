// Career page configuration for FQHC job scraping
// Tracks which FQHC career pages are scrapeable by the /scrape-jobs command
// Updated automatically when the command runs
// Last updated: 2026-02-28 (daily update #6)

/** Exported for display on pages — updated by /daily-update and /scrape-jobs pipelines */
export const CAREER_CONFIG_LAST_UPDATED = "2026-02-28";

export interface CareerPageConfig {
  fqhcSlug: string;
  scrapeable: boolean; // false = skip (behind JS-rendered ATS, login wall, etc.)
  atsType:
    | "direct" // Simple HTML career page (or HRMDirect)
    | "lever" // Lever ATS (JSON API available)
    | "paycom" // Paycom ATS (JS-only, not scrapeable)
    | "adp" // ADP Workforce Now (JS-only, not scrapeable)
    | "workday" // Workday (JSON API available!)
    | "icims" // iCIMS
    | "bamboohr" // BambooHR
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
    lastChecked: "2026-02-28",
    atsApiUrl:
      "https://altamed.wd1.myworkdayjobs.com/wday/cxs/altamed/Careers/jobs",
    notes:
      "Largest FQHC in CA. 234 jobs found 2026-02-28 (prev 234, stable). Workday JSON API works. POST with {appliedFacets:{},limit:20,offset:0,searchText:''}. Job details: GET /wday/cxs/altamed/Careers{externalPath}. Salary in jobDescription HTML.",
  },
  {
    fqhcSlug: "family-health-centers-of-san-diego",
    scrapeable: true,
    atsType: "workday",
    lastChecked: "2026-02-28",
    atsApiUrl:
      "https://fhcsd.wd1.myworkdayjobs.com/wday/cxs/fhcsd/MAIN/jobs",
    notes:
      "149 jobs found 2026-02-28 (prev 149, stable). Two Workday sites: MAIN and DOC (physicians). DOC endpoint: https://fhcsd.wd1.myworkdayjobs.com/wday/cxs/fhcsd/DOC/jobs",
  },
  {
    fqhcSlug: "asian-health-services",
    scrapeable: true,
    atsType: "lever",
    lastChecked: "2026-02-28",
    atsApiUrl: "https://api.lever.co/v0/postings/ahschc?mode=json",
    notes:
      "22 jobs found 2026-02-28 (prev 22, stable). Lever slug is 'ahschc'. Returns JSON array of job objects with text, categories, description, lists, hostedUrl.",
  },
  {
    fqhcSlug: "la-clinica-de-la-raza",
    scrapeable: true,
    atsType: "direct",
    lastChecked: "2026-02-28",
    atsApiUrl:
      "http://laclinica.hrmdirect.com/employment/job-openings.php?search=true&dept=-1&city=-1&state=-1",
    notes:
      "172 jobs found 2026-02-28 (prev 172, stable). Uses HRMDirect — server-rendered HTML, scrapeable via WebFetch. No JSON API but standard HTML parsing works.",
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
    lastChecked: "2026-02-17",
    notes:
      "Connection refused (HTTP 000) on 2026-02-17. Site may be down or blocking automated requests. Retry later.",
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
    atsType: "unknown",
    lastChecked: "2026-02-17",
    notes:
      "No ATS platform detected in HTML. May use embedded JS widget. Needs manual investigation.",
  },
];
