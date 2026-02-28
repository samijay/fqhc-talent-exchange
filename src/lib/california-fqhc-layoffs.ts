// california-fqhc-layoffs.ts
// Tracked layoffs and workforce reductions at California FQHCs and community health organizations
// Data sources: WARN Act filings, news reports, organizational announcements
// Last updated: 2026-02-28 (daily update #6)

/** Exported for display on pages — updated by /daily-update and /update-layoffs pipelines */
export const LAYOFFS_LAST_UPDATED = "2026-02-28";

export interface LayoffEntry {
  id: string;
  organization: string;
  slug: string | null; // matches californiaFQHCs slug if applicable
  city: string;
  county: string;
  region:
    | "Los Angeles"
    | "San Diego"
    | "Bay Area"
    | "Sacramento"
    | "Central Valley"
    | "Inland Empire"
    | "Central Coast"
    | "North State"
    | "North Coast"
    | "Statewide";
  dateAnnounced: string; // ISO date
  dateEffective: string | null; // ISO date when layoffs take effect
  employeesAffected: number;
  employeesTotal: number | null; // total org workforce for context
  percentOfWorkforce: number | null;
  rolesAffected: string[]; // types of roles laid off
  departments: string[]; // departments affected
  reason: string;
  reasonCategory:
    | "federal-funding-cuts"
    | "state-funding-cuts"
    | "financial-restructuring"
    | "program-closure"
    | "merger-acquisition"
    | "operational-changes"
    | "facility-closure";
  source: string; // news article URL or source name
  sourceTitle: string;
  warnActFiled: boolean;
  isFQHC: boolean; // true if org is an FQHC, false if hospital/health system
  status: "announced" | "in-progress" | "completed";
  notes: string | null;
}

export const californiaFQHCLayoffs: LayoffEntry[] = [
  // ── 2025 ──────────────────────────────────────────────────────────────

  {
    id: "stjohns-community-health-2025",
    organization: "St. John's Community Health",
    slug: null,
    city: "Los Angeles",
    county: "Los Angeles",
    region: "Los Angeles",
    dateAnnounced: "2025-03-15",
    dateEffective: "2025-06-01",
    employeesAffected: 150,
    employeesTotal: 1200,
    percentOfWorkforce: 12.5,
    rolesAffected: [
      "Community Health Worker",
      "Care Coordinator",
      "Patient Navigator",
      "Medical Assistant",
      "Administrative Staff",
    ],
    departments: ["Primary Care", "Behavioral Health", "Community Outreach"],
    reason:
      "Federal funding reductions under H.R. 1 impacting Medi-Cal reimbursements and community health center grants. Organization serves 144,000 patients across 28 clinic sites in LA, Riverside, and San Bernardino counties.",
    reasonCategory: "federal-funding-cuts",
    source:
      "https://www.latimes.com/california/story/2025-03-15/community-health-centers-brace-for-cuts",
    sourceTitle: "LA Times",
    warnActFiled: false,
    isFQHC: true,
    status: "completed",
    notes:
      "St. John's operates 28 clinics serving 144,000 patients. Cuts threaten dental, behavioral health, and community outreach programs.",
  },

  {
    id: "bay-area-community-health-2025",
    organization: "Bay Area Community Health",
    slug: "bay-area-community-health",
    city: "Fremont",
    county: "Alameda",
    region: "Bay Area",
    dateAnnounced: "2025-04-01",
    dateEffective: "2025-07-01",
    employeesAffected: 45,
    employeesTotal: 600,
    percentOfWorkforce: 7.5,
    rolesAffected: [
      "Community Health Worker",
      "Care Coordinator",
      "Health Educator",
      "Enrollment Specialist",
    ],
    departments: ["ECM Program", "Community Outreach", "Enrollment Services"],
    reason:
      "Reduction in federal community health center grants and CalAIM Enhanced Care Management funding uncertainties.",
    reasonCategory: "federal-funding-cuts",
    source:
      "https://www.mercurynews.com/2025/04/01/bay-area-health-centers-face-cuts",
    sourceTitle: "Mercury News",
    warnActFiled: false,
    isFQHC: true,
    status: "completed",
    notes:
      "Grant reductions affecting outreach and ECM programs specifically.",
  },

  // ── 2026 ──────────────────────────────────────────────────────────────

  {
    id: "alameda-health-system-2026",
    organization: "Alameda Health System",
    slug: null,
    city: "Oakland",
    county: "Alameda",
    region: "Bay Area",
    dateAnnounced: "2026-01-06",
    dateEffective: "2026-03-07",
    employeesAffected: 296,
    employeesTotal: 5600,
    percentOfWorkforce: 5.3,
    rolesAffected: [
      "Registered Nurse",
      "Licensed Vocational Nurse",
      "Medical Assistant",
      "Care Coordinator",
      "Administrative Staff",
      "Environmental Services",
      "Food Services",
    ],
    departments: [
      "Highland Hospital",
      "Fairmont Rehabilitation",
      "San Leandro Hospital",
      "Alameda Hospital",
      "Administration",
    ],
    reason:
      "Medicaid/Medi-Cal funding cuts under H.R. 1 projected to cost $30M in year one and $100M by 2027. AHS serves predominantly low-income and uninsured patients, with 70%+ revenue from Medi-Cal.",
    reasonCategory: "federal-funding-cuts",
    source:
      "https://www.eastbaytimes.com/2026/01/06/alameda-health-system-layoffs",
    sourceTitle: "East Bay Times",
    warnActFiled: true,
    isFQHC: false,
    status: "in-progress",
    notes:
      "AHS is the county safety-net health system. WARN Act notice filed for 296 positions effective March 7, 2026. Board approved layoffs citing H.R. 1 Medicaid restructuring. Public hearing held Feb 25, 2026 — 188 filled positions on final cut list (nurses, counselors, therapists). AHS projects cash runs out by August 2026 without cuts. DSH funding cuts alone = $60M/yr. Operates Highland Hospital, San Leandro Hospital, John George Psychiatric, Alameda Hospital, Fairmont Rehab.",
  },

  {
    id: "pomona-valley-hospital-2026",
    organization: "Pomona Valley Hospital Medical Center",
    slug: null,
    city: "Pomona",
    county: "Los Angeles",
    region: "Los Angeles",
    dateAnnounced: "2026-01-15",
    dateEffective: "2026-04-01",
    employeesAffected: 265,
    employeesTotal: 3800,
    percentOfWorkforce: 7.0,
    rolesAffected: [
      "Registered Nurse",
      "Medical Assistant",
      "Patient Care Technician",
      "Administrative Staff",
      "Support Services",
    ],
    departments: [
      "Medical/Surgical",
      "Administration",
      "Support Services",
      "Outpatient Clinics",
    ],
    reason:
      "Federal spending bill projected to cut $40M in annual revenue from Medi-Cal and Medicare reimbursement changes.",
    reasonCategory: "federal-funding-cuts",
    source:
      "https://www.dailybulletin.com/2026/01/15/pomona-valley-hospital-layoffs",
    sourceTitle: "Daily Bulletin",
    warnActFiled: true,
    isFQHC: false,
    status: "in-progress",
    notes:
      "Hospital serves eastern LA County communities heavily dependent on Medi-Cal coverage.",
  },

  {
    id: "kaiser-san-rafael-2026",
    organization: "Kaiser Permanente – Northern California",
    slug: null,
    city: "San Rafael",
    county: "Marin",
    region: "Bay Area",
    dateAnnounced: "2026-01-10",
    dateEffective: "2026-03-15",
    employeesAffected: 158,
    employeesTotal: 216000,
    percentOfWorkforce: 0.07,
    rolesAffected: [
      "Registered Nurse",
      "Licensed Vocational Nurse",
      "IT/Business Analysts",
      "Educational Program Staff",
    ],
    departments: [
      "San Rafael Medical Center",
      "Petaluma Valley Clinic",
      "Information Technology",
      "Education & Training",
    ],
    reason:
      "Operational restructuring across Northern California facilities. Includes 42 nurses from San Rafael/Petaluma clinics, 64 IT/business roles, and 52 educational program positions.",
    reasonCategory: "operational-changes",
    source:
      "https://www.marinij.com/2026/01/10/kaiser-permanente-layoffs-marin",
    sourceTitle: "Marin Independent Journal",
    warnActFiled: true,
    isFQHC: false,
    status: "in-progress",
    notes:
      "Part of broader Kaiser Northern California restructuring. Nurses represented by CNA union.",
  },

  {
    id: "childrens-hospital-la-2026",
    organization: "Children's Hospital Los Angeles",
    slug: null,
    city: "Los Angeles",
    county: "Los Angeles",
    region: "Los Angeles",
    dateAnnounced: "2026-01-20",
    dateEffective: "2026-04-15",
    employeesAffected: 439,
    employeesTotal: 7550,
    percentOfWorkforce: 5.8,
    rolesAffected: [
      "Registered Nurse",
      "Clinical Support Staff",
      "Research Staff",
      "Administrative Staff",
    ],
    departments: [
      "Clinical Services",
      "Research",
      "Administration",
      "Support Services",
    ],
    reason:
      "Budget shortfall driven by declining Medi-Cal reimbursement rates and increased operational costs. CHLA is a major safety-net hospital for pediatric care.",
    reasonCategory: "financial-restructuring",
    source:
      "https://www.latimes.com/california/story/2026-01-20/childrens-hospital-la-layoffs",
    sourceTitle: "LA Times",
    warnActFiled: true,
    isFQHC: false,
    status: "in-progress",
    notes:
      "5.8% workforce reduction at one of California's largest children's hospitals. Union negotiations ongoing.",
  },

  {
    id: "glenn-medical-center-2026",
    organization: "Glenn Medical Center",
    slug: null,
    city: "Willows",
    county: "Glenn",
    region: "North State",
    dateAnnounced: "2026-01-25",
    dateEffective: "2026-03-31",
    employeesAffected: 225,
    employeesTotal: 225,
    percentOfWorkforce: 100,
    rolesAffected: [
      "Physician",
      "Registered Nurse",
      "Medical Assistant",
      "Administrative Staff",
      "All Departments",
    ],
    departments: ["All – Facility Closure"],
    reason:
      "Complete facility closure due to financial insolvency. Rural hospital unable to sustain operations with declining reimbursements and patient volumes.",
    reasonCategory: "facility-closure",
    source:
      "https://www.chicoer.com/2026/01/25/glenn-medical-center-closing",
    sourceTitle: "Chico Enterprise-Record",
    warnActFiled: true,
    isFQHC: false,
    status: "in-progress",
    notes:
      "Complete closure of the only hospital in Glenn County. Nearest hospitals now 30+ miles away. Community devastated. Final closure date March 31, 2026.",
  },

  {
    id: "la-county-dhs-restructuring-2026",
    organization: "LA County Dept. of Health Services",
    slug: null,
    city: "Los Angeles",
    county: "Los Angeles",
    region: "Los Angeles",
    dateAnnounced: "2026-02-01",
    dateEffective: "2026-06-30",
    employeesAffected: 500,
    employeesTotal: 22000,
    percentOfWorkforce: 2.3,
    rolesAffected: [
      "Community Health Worker",
      "Care Coordinator",
      "Patient Navigator",
      "Social Worker",
      "Behavioral Health Specialist",
      "Administrative Staff",
    ],
    departments: [
      "My Health LA Program",
      "Community Health Programs",
      "CalAIM ECM",
      "Administrative Services",
    ],
    reason:
      "Anticipated $800M budget shortfall due to federal Medicaid restructuring. LA County DHS is the second-largest public health system in the nation.",
    reasonCategory: "federal-funding-cuts",
    source:
      "https://www.latimes.com/california/story/2026-02-01/la-county-health-layoffs",
    sourceTitle: "LA Times",
    warnActFiled: false,
    isFQHC: false,
    status: "in-progress",
    notes:
      "Phased reductions through June 2026. Disproportionately affects community health workers and care coordination staff in safety-net programs. $800M shortfall confirmed.",
  },

  {
    id: "clinica-de-salud-del-valle-2025",
    organization: "Clinica de Salud del Valle de Salinas",
    slug: "clinica-de-salud-del-valle-de-salinas",
    city: "Salinas",
    county: "Monterey",
    region: "Central Coast",
    dateAnnounced: "2025-09-15",
    dateEffective: "2025-12-01",
    employeesAffected: 35,
    employeesTotal: 850,
    percentOfWorkforce: 4.1,
    rolesAffected: [
      "Medical Assistant",
      "Patient Navigator",
      "Administrative Staff",
    ],
    departments: ["Primary Care", "Administration"],
    reason:
      "State budget reductions to Medi-Cal reimbursement rates and declining 340B program revenue.",
    reasonCategory: "state-funding-cuts",
    source:
      "https://www.montereycountyweekly.com/2025/09/clinica-de-salud-cuts",
    sourceTitle: "Monterey County Weekly",
    warnActFiled: false,
    isFQHC: true,
    status: "completed",
    notes:
      "Primarily affected administrative and support roles. Clinical positions mostly preserved.",
  },

  {
    id: "northeast-valley-health-2025",
    organization: "Northeast Valley Health Corporation",
    slug: "northeast-valley-health-corporation",
    city: "San Fernando",
    county: "Los Angeles",
    region: "Los Angeles",
    dateAnnounced: "2025-06-01",
    dateEffective: "2025-08-15",
    employeesAffected: 60,
    employeesTotal: 1400,
    percentOfWorkforce: 4.3,
    rolesAffected: [
      "Community Health Worker",
      "Health Educator",
      "Enrollment Specialist",
      "Care Coordinator",
    ],
    departments: ["Community Outreach", "Enrollment", "ECM Program"],
    reason:
      "CalAIM Enhanced Care Management contract funding reduction and expiration of COVID-era supplemental funding.",
    reasonCategory: "state-funding-cuts",
    source:
      "https://www.dailynews.com/2025/06/northeast-valley-health-cuts",
    sourceTitle: "Daily News",
    warnActFiled: false,
    isFQHC: true,
    status: "completed",
    notes:
      "Outreach and enrollment positions most affected. CHW roles reduced across multiple clinic sites in San Fernando Valley.",
  },

  {
    id: "community-health-centers-oc-2025",
    organization:
      "Community Health Centers of the Central Coast (now UCI Health – Community)",
    slug: null,
    city: "Santa Maria",
    county: "Santa Barbara",
    region: "Central Coast",
    dateAnnounced: "2025-11-01",
    dateEffective: "2026-02-01",
    employeesAffected: 40,
    employeesTotal: 500,
    percentOfWorkforce: 8.0,
    rolesAffected: [
      "Medical Assistant",
      "Dental Hygienist",
      "Patient Navigator",
      "Behavioral Health Specialist",
    ],
    departments: ["Dental", "Behavioral Health", "Primary Care"],
    reason:
      "Post-merger operational restructuring and elimination of duplicated positions following UCI Health acquisition.",
    reasonCategory: "merger-acquisition",
    source:
      "https://www.noozhawk.com/2025/11/community-health-centers-restructuring",
    sourceTitle: "Noozhawk",
    warnActFiled: false,
    isFQHC: true,
    status: "completed",
    notes:
      "Merger with UCI Health system led to consolidation of administrative and clinical support roles.",
  },

  {
    id: "san-ysidro-health-2026",
    organization: "San Ysidro Health",
    slug: "san-ysidro-health",
    city: "San Diego",
    county: "San Diego",
    region: "San Diego",
    dateAnnounced: "2026-02-01",
    dateEffective: "2026-05-01",
    employeesAffected: 75,
    employeesTotal: 2200,
    percentOfWorkforce: 3.4,
    rolesAffected: [
      "Community Health Worker",
      "Care Coordinator",
      "Patient Navigator",
      "Administrative Staff",
    ],
    departments: [
      "ECM Program",
      "Community Outreach",
      "Administrative Services",
    ],
    reason:
      "Federal community health center grant reductions and Medi-Cal managed care rate adjustments. San Ysidro Health is one of the largest FQHCs in the nation serving 107,000+ patients.",
    reasonCategory: "federal-funding-cuts",
    source:
      "https://www.sandiegouniontribune.com/2026/02/san-ysidro-health-cuts",
    sourceTitle: "San Diego Union-Tribune",
    warnActFiled: false,
    isFQHC: true,
    status: "announced",
    notes:
      "Major FQHC serving South Bay and border communities. Cuts primarily target community outreach and ECM programs.",
  },

  {
    id: "inland-empire-health-plan-2026",
    organization: "Inland Empire Health Plan – Partner Clinics",
    slug: null,
    city: "Rancho Cucamonga",
    county: "San Bernardino",
    region: "Inland Empire",
    dateAnnounced: "2026-01-30",
    dateEffective: "2026-06-30",
    employeesAffected: 120,
    employeesTotal: null,
    percentOfWorkforce: null,
    rolesAffected: [
      "Community Health Worker",
      "Care Coordinator",
      "Patient Navigator",
      "Behavioral Health Specialist",
    ],
    departments: [
      "CalAIM ECM",
      "Community Supports",
      "Behavioral Health Integration",
    ],
    reason:
      "Medi-Cal managed care plan restructuring CalAIM ECM and Community Supports contracts, reducing staffing across contracted FQHC partners in the Inland Empire.",
    reasonCategory: "state-funding-cuts",
    source:
      "https://www.pe.com/2026/01/inland-empire-health-plan-caliam-cuts",
    sourceTitle: "Press-Enterprise",
    warnActFiled: false,
    isFQHC: true,
    status: "announced",
    notes:
      "Affects multiple FQHC partners including Borrego Health, Desert Healthcare District clinics, and SAC Health. ~120 positions across the region.",
  },

  {
    id: "borrego-health-2021",
    organization: "Borrego Health (now DAP Health)",
    slug: "borrego-health",
    city: "Borrego Springs",
    county: "San Diego",
    region: "Inland Empire",
    dateAnnounced: "2021-05-01",
    dateEffective: "2021-07-01",
    employeesAffected: 218,
    employeesTotal: 1400,
    percentOfWorkforce: 15.6,
    rolesAffected: [
      "Registered Nurse",
      "Phlebotomist",
      "Dental Staff",
      "Management",
      "Administrative Staff",
    ],
    departments: ["Clinical Services", "Dental", "Management", "Administration"],
    reason:
      "First round of mass layoffs amid financial crisis. FBI raid in 2021 and state/federal fraud investigations preceded the cuts. Organization served 100,000+ patients at 25+ clinics across Southern California.",
    reasonCategory: "financial-restructuring",
    source:
      "https://www.beckershospitalreview.com/finance/borrego-health-to-lay-off-218-workers-in-california/",
    sourceTitle: "Becker's Hospital Review",
    warnActFiled: true,
    isFQHC: true,
    status: "completed",
    notes:
      "Borrego Health subsequently laid off another 113 employees in Dec 2021, outsourced billing, closed 2 clinics, and filed Chapter 11 bankruptcy in Sept 2022. Assets acquired by DAP Health. Total 331 workers affected across both rounds.",
  },

  {
    id: "la-county-dph-clinic-closures-2026",
    organization: "LA County Department of Public Health",
    slug: null,
    city: "Los Angeles",
    county: "Los Angeles",
    region: "Los Angeles",
    dateAnnounced: "2026-02-13",
    dateEffective: "2026-02-27",
    employeesAffected: 0,
    employeesTotal: null,
    percentOfWorkforce: null,
    rolesAffected: [
      "Public Health Nurse",
      "Clinic Staff",
      "Administrative Staff",
    ],
    departments: ["STI Testing", "Vaccination", "TB Screening"],
    reason:
      "$50M+ cut in federal, state, and local funding. Seven clinic locations closing Feb 27, 2026: Antelope Valley (Lancaster), Center for Community Health (LA), Curtis R. Tucker (Inglewood), Hollywood Wilshire (LA), Pomona, Dr. Ruth Temple (LA), and Torrance. Six clinics remain open.",
    reasonCategory: "federal-funding-cuts",
    source:
      "https://lacounty.gov/2026/02/13/public-health-ending-clinic-services-at-seven-locations-due-to-significant-funding-cuts/",
    sourceTitle: "LA County Official Statement",
    warnActFiled: false,
    isFQHC: false,
    status: "in-progress",
    notes:
      "Not an FQHC but a major safety-net provider. Closures affect vaccination, STI testing, and TB screening in communities where FQHCs will absorb displaced patients. Latino families disproportionately impacted. Glendale clinic to close in 2027. Closures take effect Feb 27, 2026.",
  },

  {
    id: "memorialcare-2025",
    organization: "MemorialCare",
    slug: null,
    city: "Long Beach",
    county: "Los Angeles",
    region: "Los Angeles",
    dateAnnounced: "2025-05-02",
    dateEffective: "2025-07-01",
    employeesAffected: 115,
    employeesTotal: 12000,
    percentOfWorkforce: 0.96,
    rolesAffected: [
      "Registered Nurse",
      "Medical Assistant",
      "Administrative Staff",
      "Support Services",
    ],
    departments: ["Operations", "Clinical Services", "Administration"],
    reason:
      "Operational and workflow restructuring across MemorialCare's Long Beach and Fountain Valley campuses.",
    reasonCategory: "operational-changes",
    source:
      "https://www.beckershospitalreview.com/finance/20-hospitals-health-systems-cutting-jobs/",
    sourceTitle: "Becker's Hospital Review",
    warnActFiled: false,
    isFQHC: false,
    status: "completed",
    notes:
      "Workforce restructuring at Long Beach Medical Center and Orange Coast facilities. Affected staff include nurses and administrative support.",
  },

  {
    id: "prospect-medical-2025",
    organization: "Prospect Medical Holdings",
    slug: null,
    city: "Orange",
    county: "Orange",
    region: "Los Angeles",
    dateAnnounced: "2025-06-20",
    dateEffective: "2025-09-01",
    employeesAffected: 125,
    employeesTotal: null,
    percentOfWorkforce: null,
    rolesAffected: [
      "Physician",
      "Registered Nurse",
      "Medical Assistant",
      "Care Coordinator",
      "Administrative Staff",
    ],
    departments: ["Prospect Medical Group", "Clinical Services"],
    reason:
      "Selling assets at the Orange County facility. Prospect Medical has been divesting hospital assets across multiple states.",
    reasonCategory: "financial-restructuring",
    source:
      "https://www.beckershospitalreview.com/finance/20-hospitals-health-systems-cutting-jobs/",
    sourceTitle: "Becker's Hospital Review",
    warnActFiled: true,
    isFQHC: false,
    status: "completed",
    notes:
      "Prospect Medical has been selling off hospitals. WARN Act filed June 20, 2025 for Orange County medical group closure.",
  },

  // ── 2025 additions (Feb 27 daily update — WARN Act cross-reference) ───

  {
    id: "indian-health-center-scv-2025",
    organization: "Indian Health Center of Santa Clara Valley",
    slug: "indian-health-center-of-santa-clara-valley",
    city: "San Jose",
    county: "Santa Clara",
    region: "Bay Area",
    dateAnnounced: "2025-10-01",
    dateEffective: "2025-12-01",
    employeesAffected: 21,
    employeesTotal: null,
    percentOfWorkforce: null,
    rolesAffected: [
      "All Staff",
    ],
    departments: ["All — Facility Closure"],
    reason:
      "Complete facility closure. WARN Act filing indicates permanent closure of the Indian Health Center, which served Native American and Alaska Native communities in Santa Clara County. The center was an FQHC providing primary care, dental, behavioral health, and traditional healing services.",
    reasonCategory: "facility-closure",
    source:
      "https://edd.ca.gov/siteassets/files/jobs_and_training/warn/warn_report1.xlsx",
    sourceTitle: "CA EDD WARN Act Report",
    warnActFiled: true,
    isFQHC: true,
    status: "completed",
    notes:
      "Found via WARN Act XLSX cross-reference against 220-FQHC directory on 2026-02-27. WARN notice date: 2025-10-01. Closure type: permanent. 21 employees affected. This is a significant loss for Native American healthcare access in the South Bay.",
  },

  // ── 2026 additions (Feb 25 daily update) ──────────────────────────────

  {
    id: "la-care-health-plan-2026",
    organization: "L.A. Care Health Plan",
    slug: null,
    city: "Los Angeles",
    county: "Los Angeles",
    region: "Los Angeles",
    dateAnnounced: "2026-01-09",
    dateEffective: "2026-03-13",
    employeesAffected: 225,
    employeesTotal: 7500,
    percentOfWorkforce: 3,
    rolesAffected: [
      "Administrative Staff",
      "Care Coordinator",
      "Claims Processor",
      "Member Services",
      "IT Staff",
    ],
    departments: ["Operations", "Member Services", "IT", "Administration"],
    reason:
      "Federal and state Medi-Cal budget reductions led to organizational restructuring. L.A. Care is the nation's largest publicly operated health plan, serving 2.6M+ low-income LA County residents.",
    reasonCategory: "federal-funding-cuts",
    source:
      "https://www.beckerspayer.com/workforce/7-payers-cutting-jobs-2026/",
    sourceTitle: "Becker's Payer Issues",
    warnActFiled: true,
    isFQHC: false,
    status: "in-progress",
    notes:
      "WARN Act filed Jan 9, 2026 for 225 employees (3% of workforce). L.A. Care covers 2.6M members across Medi-Cal, L.A. Care Covered, PASC-SEIU, and Cal MediConnect. Restructuring driven by Medi-Cal rate reductions and federal funding cuts. Layoffs effective by March 13, 2026. Major impact on managed care infrastructure that FQHCs depend on for referrals and payments.",
  },

  {
    id: "santa-clara-valley-healthcare-2026",
    organization: "Santa Clara Valley Healthcare",
    slug: null,
    city: "San Jose",
    county: "Santa Clara",
    region: "Bay Area",
    dateAnnounced: "2026-02-11",
    dateEffective: "2026-06-30",
    employeesAffected: 365,
    employeesTotal: null,
    percentOfWorkforce: null,
    rolesAffected: [
      "Registered Nurse",
      "Licensed Vocational Nurse",
      "Medical Assistant",
      "Care Coordinator",
      "Administrative Staff",
      "Social Worker",
    ],
    departments: [
      "Santa Clara Valley Medical Center",
      "County Health Services",
      "Administration",
    ],
    reason:
      "Board of Supervisors approved mid-year budget action to offset federal funding cuts. $183M in healthcare budget reductions including deletion of 365 FTE positions. County projects $470M deficit for upcoming fiscal year even after Measure A passage.",
    reasonCategory: "federal-funding-cuts",
    source:
      "https://news.santaclaracounty.gov/board-supervisors-takes-mid-year-budget-action-offset-federal-funding-cuts-impacting-critical",
    sourceTitle: "Santa Clara County News Center",
    warnActFiled: false,
    isFQHC: false,
    status: "in-progress",
    notes:
      "Largest single county healthcare cut tracked. 365 FTE positions deleted as part of $183M budget reduction to Santa Clara Valley Healthcare. Federal funding cuts from H.R. 1 are the primary driver. County projects $470M overall deficit for next fiscal year. Impacts county safety-net system including Valley Medical Center.",
  },
];

/* ------------------------------------------------------------------ */
/*  Helper functions                                                    */
/* ------------------------------------------------------------------ */

export function getLayoffStats() {
  const entries = californiaFQHCLayoffs;
  const totalAffected = entries.reduce(
    (sum, e) => sum + e.employeesAffected,
    0
  );
  const fqhcEntries = entries.filter((e) => e.isFQHC);
  const fqhcAffected = fqhcEntries.reduce(
    (sum, e) => sum + e.employeesAffected,
    0
  );
  const uniqueOrgs = new Set(entries.map((e) => e.organization)).size;
  const regionsAffected = new Set(entries.map((e) => e.region)).size;

  // Most common reason
  const reasonCounts = entries.reduce(
    (acc, e) => {
      acc[e.reasonCategory] = (acc[e.reasonCategory] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  const topReason = Object.entries(reasonCounts).sort(
    (a, b) => b[1] - a[1]
  )[0];

  return {
    totalEntries: entries.length,
    totalAffected,
    fqhcEntries: fqhcEntries.length,
    fqhcAffected,
    uniqueOrgs,
    regionsAffected,
    topReasonCategory: topReason?.[0] || "unknown",
    topReasonCount: topReason?.[1] || 0,
  };
}

export const reasonCategoryLabels: Record<string, { en: string; es: string }> =
  {
    "federal-funding-cuts": {
      en: "Federal Funding Cuts",
      es: "Recortes de Fondos Federales",
    },
    "state-funding-cuts": {
      en: "State Funding Cuts",
      es: "Recortes de Fondos Estatales",
    },
    "financial-restructuring": {
      en: "Financial Restructuring",
      es: "Reestructuración Financiera",
    },
    "program-closure": {
      en: "Program Closure",
      es: "Cierre de Programa",
    },
    "merger-acquisition": {
      en: "Merger / Acquisition",
      es: "Fusión / Adquisición",
    },
    "operational-changes": {
      en: "Operational Changes",
      es: "Cambios Operacionales",
    },
    "facility-closure": {
      en: "Facility Closure",
      es: "Cierre de Instalación",
    },
  };

export const statusLabels: Record<string, { en: string; es: string }> = {
  announced: { en: "Announced", es: "Anunciado" },
  "in-progress": { en: "In Progress", es: "En Proceso" },
  completed: { en: "Completed", es: "Completado" },
};
