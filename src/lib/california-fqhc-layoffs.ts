// california-fqhc-layoffs.ts
// Tracked layoffs and workforce reductions at California FQHCs and community health organizations
// Data sources: WARN Act filings, news reports, organizational announcements
// Last updated: 2026-02-15

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
    status: "in-progress",
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
    status: "in-progress",
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
      "AHS is the county safety-net health system. WARN Act notice filed for 296 positions effective March 7, 2026. Board approved layoffs citing H.R. 1 Medicaid restructuring.",
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
    status: "completed",
    notes:
      "Complete closure of the only hospital in Glenn County. Nearest hospitals now 30+ miles away. Community devastated.",
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
    status: "announced",
    notes:
      "Phased reductions expected through 2026. Disproportionately affects community health workers and care coordination staff in safety-net programs.",
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
