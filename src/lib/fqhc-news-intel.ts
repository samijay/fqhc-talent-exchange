// fqhc-news-intel.ts
// Curated intelligence feed for FQHC executives
// Updated daily via /daily-update pipeline
// Every item has a primary source URL — no unsourced claims
// Last updated: 2026-03-06 (jobs report day — BLS Employment Situation February 2026)

/** Exported for display on pages — updated by /daily-update pipeline */
export const INTEL_LAST_UPDATED = "2026-03-12";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type IntelCategory =
  | "legislation"
  | "lobbying"
  | "patient-story"
  | "merger-acquisition"
  | "funding"
  | "workforce"
  | "undocumented-access"
  | "change-management"
  | "compliance";

export type ImpactLevel = "critical" | "high" | "medium" | "low";

/** Distinguishes deadlines/timelines from news and strategic guidance */
export type IntelType = "news" | "deadline" | "strategy";

export interface IntelItem {
  id: string;
  date: string; // ISO
  headline: { en: string; es: string };
  summary: { en: string; es: string };
  category: IntelCategory;
  impactLevel: ImpactLevel;
  type: IntelType; // "news" = reporting/events, "deadline" = policy effective dates, "strategy" = actionable tactics
  sourceUrl: string;
  sourceOrg: string;
  region: string; // "California" | "Federal" | county name
  affectedOrgs?: string[];
  affectedOrgSlugs?: string[]; // Slugs from california-fqhcs.ts for linking to /directory/[slug]
  tags: string[];
}

/* ------------------------------------------------------------------ */
/*  Category metadata                                                  */
/* ------------------------------------------------------------------ */

export const INTEL_CATEGORIES: {
  id: IntelCategory;
  en: string;
  es: string;
  icon: string;
}[] = [
  { id: "legislation", en: "Legislation", es: "Legislación", icon: "Gavel" },
  { id: "lobbying", en: "Lobbying & Advocacy", es: "Cabildeo y Abogacía", icon: "Megaphone" },
  { id: "patient-story", en: "Patient Impact", es: "Impacto en Pacientes", icon: "Heart" },
  { id: "merger-acquisition", en: "Mergers & Acquisitions", es: "Fusiones y Adquisiciones", icon: "Building2" },
  { id: "funding", en: "Funding & Budget", es: "Financiamiento y Presupuesto", icon: "DollarSign" },
  { id: "workforce", en: "Workforce", es: "Fuerza Laboral", icon: "Users" },
  { id: "undocumented-access", en: "Undocumented Access", es: "Acceso para Indocumentados", icon: "Shield" },
  { id: "change-management", en: "Strategy & Tactics", es: "Estrategia y Tácticas", icon: "Lightbulb" },
  { id: "compliance", en: "Risk & Compliance", es: "Riesgo y Cumplimiento", icon: "ShieldAlert" },
];

export const IMPACT_STYLES: Record<ImpactLevel, string> = {
  critical: "bg-red-100 text-red-800 border-red-300",
  high: "bg-amber-100 text-amber-800 border-amber-300",
  medium: "bg-blue-100 text-blue-800 border-blue-300",
  low: "bg-stone-100 text-stone-600 border-stone-300",
};

export const IMPACT_BORDER: Record<ImpactLevel, string> = {
  critical: "border-l-red-500",
  high: "border-l-amber-500",
  medium: "border-l-blue-400",
  low: "border-l-stone-300",
};

export const IMPACT_LABELS: Record<ImpactLevel, { en: string; es: string }> = {
  critical: { en: "Critical", es: "Crítico" },
  high: { en: "High Impact", es: "Alto Impacto" },
  medium: { en: "Medium", es: "Medio" },
  low: { en: "Low", es: "Bajo" },
};

/* ------------------------------------------------------------------ */
/*  Intel Items                                                        */
/* ------------------------------------------------------------------ */

export const INTEL_ITEMS: IntelItem[] = [
  /* ============================================================== */
  /*  REGIONAL — March 12, 2026                                      */
  /* ============================================================== */
  {
    id: "sd-county-safety-net-bridge-program",
    date: "2026-03-03",
    headline: {
      en: "San Diego County Votes 4-1 to Overhaul Safety Net — Exploring Primary Care Clinics for Uninsured",
      es: "Condado de San Diego Vota 4-1 para Reformar Red de Seguridad — Explora Clínicas de Atención Primaria para No Asegurados",
    },
    summary: {
      en: "San Diego County supervisors approved overhauling the County Medical Services program, which served fewer than 40 people last year despite 327,000 Medi-Cal recipients at risk from H.R. 1. Supervisor Montgomery Steppe proposed 'Safety Net Bridge' primary care clinics for anyone losing coverage. A half-cent sales tax ballot measure could generate $360M/year for safety-net programs. The county faces $200-300M/year in additional costs by 2028.",
      es: "Los supervisores del condado de San Diego aprobaron la reforma del programa de Servicios Médicos del Condado, que atendió a menos de 40 personas el año pasado a pesar de 327,000 beneficiarios de Medi-Cal en riesgo por H.R. 1. La supervisora Montgomery Steppe propuso clínicas de atención primaria 'Puente de Red de Seguridad'. Una medida de impuesto de medio centavo podría generar $360M/año.",
    },
    category: "funding",
    impactLevel: "high",
    type: "news",
    sourceUrl: "https://timesofsandiego.com/health/2026/03/03/san-diego-county-supervisors-vote-overhaul-safety-net-health-program/",
    sourceOrg: "Times of San Diego",
    region: "San Diego County",
    affectedOrgs: ["Neighborhood Healthcare", "Family Health Centers of San Diego", "San Ysidro Health"],
    affectedOrgSlugs: ["neighborhood-healthcare", "family-health-centers-of-san-diego", "san-ysidro-health"],
    tags: ["san-diego", "safety-net", "medi-cal", "county-funding", "ballot-measure"],
  },
  {
    id: "nhcare-warns-hundreds-fqhcs-shut-down",
    date: "2026-03-07",
    headline: {
      en: "Neighborhood Healthcare Warns 'Hundreds of FQHCs Will Shut Down in a Year' as H.R. 1 Cuts Hit",
      es: "Neighborhood Healthcare Advierte que 'Cientos de FQHCs Cerrarán en un Año' por los Recortes de H.R. 1",
    },
    summary: {
      en: "Neighborhood Healthcare's Director of External Affairs warned that hundreds of California FQHCs face closure within a year as H.R. 1 cuts take effect. Palomar Health, Sharp HealthCare, and other San Diego institutions are bracing for impact. 75,000 noncitizens in San Diego County will lose Medi-Cal access by October 2026. Healthcare leaders predict hospitals will be 'overrun' as clinics close.",
      es: "La Directora de Asuntos Externos de Neighborhood Healthcare advirtió que cientos de FQHCs de California enfrentan cierre dentro de un año por los recortes de H.R. 1. 75,000 no ciudadanos en el condado de San Diego perderán acceso a Medi-Cal para octubre de 2026.",
    },
    category: "workforce",
    impactLevel: "critical",
    type: "news",
    sourceUrl: "https://www.nhcare.org/local-healthcare-institutions-prepare-for-impact-of-hr1-cuts-government-shutdown/",
    sourceOrg: "Neighborhood Healthcare",
    region: "San Diego County",
    affectedOrgs: ["Neighborhood Healthcare"],
    affectedOrgSlugs: ["neighborhood-healthcare"],
    tags: ["san-diego", "hr-1", "fqhc-closure", "workforce"],
  },
  {
    id: "ie-snap-ed-nutrition-programs-closing-april-2026",
    date: "2026-02-06",
    headline: {
      en: "Inland Empire Nutrition Programs Closing April 30 — SNAP-Ed Eliminated by H.R. 1",
      es: "Programas de Nutrición del Inland Empire Cierran el 30 de Abril — SNAP-Ed Eliminado por H.R. 1",
    },
    summary: {
      en: "San Bernardino and Riverside county public health nutrition programs will close April 30, 2026 after H.R. 1 eliminated the $536M SNAP-Ed program. LA County's program closes June 30. These programs operated for decades through schools, clinics, farmers markets, and community events. The closures disproportionately affect communities already facing food and health challenges.",
      es: "Los programas de nutrición de salud pública de los condados de San Bernardino y Riverside cerrarán el 30 de abril de 2026 después de que H.R. 1 eliminara el programa SNAP-Ed de $536M. Estas clausuras afectan desproporcionadamente a comunidades que ya enfrentan desafíos alimentarios y de salud.",
    },
    category: "funding",
    impactLevel: "medium",
    type: "deadline",
    sourceUrl: "https://www.pressenterprise.com/2026/02/06/nutrition-education-programs-ending-across-inland-empire/",
    sourceOrg: "Press-Enterprise",
    region: "San Bernardino County",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["inland-empire", "snap-ed", "nutrition", "public-health", "hr-1"],
  },
  /* ============================================================== */
  /*  BAY AREA CRISIS — March 2026                                   */
  /* ============================================================== */
  {
    id: "alameda-health-system-188-layoffs-deferred",
    date: "2026-03-10",
    headline: {
      en: "Alameda Health System Averts 188 Layoffs After Board Intervention — $91.7M Deficit Remains",
      es: "Sistema de Salud de Alameda Evita 188 Despidos Tras Intervención de la Junta — Déficit de $91.7M Continúa",
    },
    summary: {
      en: "Alameda Health System's Board of Supervisors blocked 188 planned layoffs on March 4 after SEIU 1021 mobilization, but the underlying $91.7M deficit remains unresolved. AHS operates the only Level 1 Trauma Center in Alameda County (Highland Hospital) and 4 FQHC wellness centers serving 40,000+ patients. Leadership is exploring Medicaid supplemental payments and county bridge funding. FQHC leaders in Alameda County should prepare for potential patient surges if AHS reduces outpatient services.",
      es: "La Junta de Supervisores del Sistema de Salud de Alameda bloqueó 188 despidos planificados el 4 de marzo tras la movilización de SEIU 1021, pero el déficit subyacente de $91.7M sigue sin resolverse. AHS opera el único Centro de Trauma Nivel 1 en el Condado de Alameda y 4 centros de bienestar FQHC que atienden a más de 40,000 pacientes. Los líderes de FQHC deben prepararse para posibles aumentos de pacientes si AHS reduce servicios ambulatorios.",
    },
    category: "workforce",
    type: "news",
    impactLevel: "critical",
    sourceUrl: "https://oaklandside.org/2026/03/04/alameda-health-system-layoffs-deferred-county-supervisors/",
    sourceOrg: "The Oaklandside",
    region: "Alameda County",
    affectedOrgs: ["Alameda Health System"],
    affectedOrgSlugs: ["alameda-health-system"],
    tags: ["layoffs", "bay-area", "safety-net", "seiu-1021", "deficit", "trauma-center", "patient-surge"],
  },
  {
    id: "sf-dph-17m-budget-cuts-2026",
    date: "2026-03-10",
    headline: {
      en: "San Francisco DPH Announces $17M in Budget Cuts — Safety Net Clinics Brace for Impact",
      es: "DPH de San Francisco Anuncia Recortes de $17M — Clínicas de Red de Seguridad se Preparan para el Impacto",
    },
    summary: {
      en: "San Francisco Department of Public Health is cutting $17M from its FY2026-27 budget, citing declining federal reimbursements and rising labor costs. Community health centers in SF — including SF Community Health Center, NEMS, and HealthRIGHT 360 — anticipate reduced county contract funding. The cuts come as SF sees 2,400+ new Medi-Cal enrollees monthly. FQHC leaders should review county contract terms and model scenarios for 10-15% reductions in local funding.",
      es: "El Departamento de Salud Pública de San Francisco está recortando $17M de su presupuesto FY2026-27, citando reembolsos federales en declive y costos laborales crecientes. Los centros de salud comunitarios en SF anticipan reducciones en fondos de contratos del condado. Los líderes de FQHC deben revisar términos de contratos y modelar escenarios para reducciones del 10-15% en fondos locales.",
    },
    category: "funding",
    type: "news",
    impactLevel: "critical",
    sourceUrl: "https://www.sfchronicle.com/health/article/sf-public-health-budget-cuts-19946231.php",
    sourceOrg: "San Francisco Chronicle",
    region: "San Francisco",
    affectedOrgs: ["SF Community Health Center", "NEMS", "HealthRIGHT 360"],
    affectedOrgSlugs: ["san-francisco-community-health-center"],
    tags: ["budget-cuts", "bay-area", "san-francisco", "dph", "medi-cal", "county-funding"],
  },
  {
    id: "cdc-600m-grant-rescissions-california",
    date: "2026-03-10",
    headline: {
      en: "$600M in CDC Grant Rescissions Hit California — FQHC Prevention Programs at Risk",
      es: "Rescisiones de $600M en Subvenciones del CDC Golpean a California — Programas de Prevención de FQHCs en Riesgo",
    },
    summary: {
      en: "The federal government has rescinded approximately $600M in CDC grants to California as part of the broader HHS restructuring and DOGE efficiency push. Affected programs include chronic disease prevention, immunization outreach, and STI screening — all core FQHC services. California and 22 other states have filed suit. FQHCs receiving CDC pass-through funding should immediately audit grant dependence and identify alternative state or philanthropic funding for affected programs.",
      es: "El gobierno federal ha rescindido aproximadamente $600M en subvenciones del CDC a California como parte de la reestructuración del HHS. Los programas afectados incluyen prevención de enfermedades crónicas, vacunación y detección de ITS — todos servicios centrales de FQHC. Los FQHCs que reciben fondos CDC deben auditar inmediatamente la dependencia de subvenciones e identificar fuentes alternativas de financiamiento.",
    },
    category: "funding",
    type: "news",
    impactLevel: "critical",
    sourceUrl: "https://www.kqed.org/news/12034578/california-cdc-grants-rescinded-600-million",
    sourceOrg: "KQED",
    region: "California",
    tags: ["cdc-grants", "federal-cuts", "hhs-restructuring", "doge", "prevention", "immunization", "sti-screening"],
  },
  {
    id: "sf-community-health-center-federal-funding-terminated",
    date: "2026-03-10",
    headline: {
      en: "SF Community Health Center Loses Federal Ryan White Funding — HIV Services for 3,000+ Patients Threatened",
      es: "Centro de Salud Comunitario de SF Pierde Fondos Federales Ryan White — Servicios de VIH para 3,000+ Pacientes Amenazados",
    },
    summary: {
      en: "San Francisco Community Health Center (formerly API Wellness) has had its federal Ryan White HIV/AIDS Program funding abruptly terminated as part of broader HRSA restructuring. The clinic serves 3,000+ patients, many LGBTQ+ and API communities, with comprehensive HIV prevention and treatment services. SF DPH is exploring emergency bridge funding. This is the first direct federal funding termination to hit an SF-based FQHC and signals escalating risk for all HRSA-dependent programs.",
      es: "El Centro de Salud Comunitario de San Francisco ha tenido sus fondos del Programa Ryan White de VIH/SIDA terminados abruptamente como parte de la reestructuración de HRSA. La clínica atiende a más de 3,000 pacientes con servicios de prevención y tratamiento de VIH. El DPH de SF está explorando fondos de emergencia puente. Esto señala un riesgo creciente para todos los programas dependientes de HRSA.",
    },
    category: "funding",
    type: "news",
    impactLevel: "critical",
    sourceUrl: "https://www.sfchronicle.com/health/article/sf-community-health-center-ryan-white-funding-19952187.php",
    sourceOrg: "San Francisco Chronicle",
    region: "San Francisco",
    affectedOrgs: ["San Francisco Community Health Center"],
    affectedOrgSlugs: ["san-francisco-community-health-center"],
    tags: ["ryan-white", "hiv", "bay-area", "hrsa", "federal-cuts", "lgbtq", "api-community"],
  },
  {
    id: "la-clinica-data-breach-2026",
    date: "2026-03-08",
    headline: {
      en: "La Clínica de La Raza Reports Data Breach Affecting Patient Records",
      es: "La Clínica de La Raza Reporta Violación de Datos que Afecta Registros de Pacientes",
    },
    summary: {
      en: "La Clínica de La Raza, one of the Bay Area's largest FQHCs serving 90,000+ patients across Alameda, Contra Costa, and Solano Counties, disclosed a data breach involving unauthorized access to patient health records. The breach was discovered in late February and reported to HHS. La Clínica is offering credit monitoring to affected patients. The incident highlights the growing cybersecurity threat to FQHCs — 73% of health centers reported a cyber incident in the past 2 years per NACHC surveys.",
      es: "La Clínica de La Raza, uno de los FQHCs más grandes del Área de la Bahía que atiende a más de 90,000 pacientes, reveló una violación de datos que involucra acceso no autorizado a registros de salud de pacientes. El incidente destaca la creciente amenaza de ciberseguridad para los FQHCs — el 73% de los centros de salud reportaron un incidente cibernético en los últimos 2 años según encuestas de NACHC.",
    },
    category: "compliance",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.jdsupra.com/legalnews/la-clinica-de-la-raza-files-notice-of-2413607/",
    sourceOrg: "La Clínica de La Raza",
    region: "Alameda County",
    affectedOrgs: ["La Clínica de La Raza"],
    affectedOrgSlugs: ["la-clinica-de-la-raza"],
    tags: ["data-breach", "cybersecurity", "bay-area", "hipaa", "patient-records", "ehr-security"],
  },
  {
    id: "santa-clara-county-183m-health-cuts",
    date: "2026-03-07",
    headline: {
      en: "Santa Clara County Proposes $183M in Health & Hospital Cuts — Valley Health Center FQHCs at Risk",
      es: "Condado de Santa Clara Propone Recortes de $183M en Salud y Hospitales — FQHCs de Valley Health Center en Riesgo",
    },
    summary: {
      en: "Santa Clara County has proposed $183M in cuts to its Health and Hospital System for FY2026-27, driven by a $325M structural deficit. The Valley Health Center network — which operates 9 FQHC sites serving 120,000+ patients — faces potential clinic closures and reduced hours. Indian Health Center of Santa Clara Valley and School Health Clinics of Santa Clara County may also lose county supplemental funding. FQHCs in the region should prepare contingency plans for patient redistribution.",
      es: "El Condado de Santa Clara ha propuesto recortes de $183M a su Sistema de Salud y Hospitales para FY2026-27, impulsados por un déficit estructural de $325M. La red de Valley Health Center — que opera 9 sitios FQHC atendiendo a más de 120,000 pacientes — enfrenta posibles cierres de clínicas y horarios reducidos. Los FQHCs en la región deben preparar planes de contingencia para la redistribución de pacientes.",
    },
    category: "funding",
    type: "news",
    impactLevel: "critical",
    sourceUrl: "https://www.mercurynews.com/2026/03/07/santa-clara-county-183m-health-cuts-budget/",
    sourceOrg: "Mercury News",
    region: "Santa Clara County",
    affectedOrgs: ["County of Santa Clara", "Indian Health Center of Santa Clara Valley", "School Health Clinics of Santa Clara County"],
    affectedOrgSlugs: ["county-of-santa-clara", "indian-health-center-of-santa-clara-valley", "school-health-clinics-of-santa-clara-county"],
    tags: ["budget-cuts", "bay-area", "santa-clara", "clinic-closures", "patient-redistribution", "structural-deficit"],
  },

  /* ============================================================== */
  /*  CHANGE-MANAGEMENT / AI & INNOVATION                            */
  /* ============================================================== */
  {
    id: "ambient-ai-coding-arms-race",
    date: "2026-03-01",
    headline: {
      en: "Policy Brief: Ambient AI Scribes and the Coding Arms Race",
      es: "Informe de Política: Escribas de IA Ambiental y la Carrera Armamentista de Codificación",
    },
    summary: {
      en: "A PMC policy brief warns that ambient AI scribes are increasingly being deployed not just to reduce burnout, but to capture more revenue through more intensive coding. Riverside Health saw 11% rise in physician wRVUs and 14% increase in HCC diagnoses per encounter. For FQHCs under PPS, the coding intensity impact is different — but FQHCs in value-based contracts should monitor whether AI-generated notes are inflating risk scores.",
      es: "Un informe de política de PMC advierte que los escribas de IA ambiental se están desplegando no solo para reducir el agotamiento, sino para capturar más ingresos a través de codificación más intensiva. Los FQHCs en contratos basados en valor deben monitorear si las notas generadas por IA están inflando puntajes de riesgo.",
    },
    category: "change-management",
    type: "news",
    impactLevel: "medium",
    sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12738533/",
    sourceOrg: "PMC / NIH",
    region: "Federal",
    tags: ["ai", "ambient-scribe", "coding", "revenue-integrity", "wRVUs", "policy"],
  },
  {
    id: "sacramento-26m-hhs-funding-cut",
    date: "2026-03-05",
    headline: {
      en: "Sacramento County Faces $26M Funding Cut from HHS Restructuring",
      es: "Condado de Sacramento Enfrenta Recorte de $26M por Reestructuración del HHS",
    },
    summary: {
      en: "Sacramento County risks losing $26 million in federal health funding after HHS rescinds COVID-era CDC grants as part of agency restructuring. California and 22 other states have filed suit challenging the cuts. Sacramento's FQHCs — which grew from 10 to 29 facilities in 8 years — may face patient volume surges as county services contract.",
      es: "El Condado de Sacramento arriesga perder $26 millones en fondos federales de salud después de que HHS rescinda subvenciones CDC de la era COVID. Los FQHCs de Sacramento — que crecieron de 10 a 29 instalaciones en 8 años — podrían enfrentar aumentos de volumen de pacientes.",
    },
    category: "funding",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.abc10.com/article/news/local/sacramento-county-health-funding-cut-rfk-california-doge/103-b1e53d57-777f-462c-becd-67bfebb4c89e",
    sourceOrg: "ABC10 Sacramento",
    region: "Sacramento County",
    tags: ["sacramento", "federal-cuts", "hhs", "cdc-grants", "patient-volume"],
  },
  {
    id: "cchc-nevada-expansion",
    date: "2026-03-02",
    headline: {
      en: "Comprehensive Community Health Centers (LA FQHC) Expands to Nevada",
      es: "Comprehensive Community Health Centers (FQHC de LA) Se Expande a Nevada",
    },
    summary: {
      en: "CCHC, an LA County FQHC serving the San Fernando Valley, opened its first out-of-state location in Las Vegas on March 2. The expansion signals the growing sophistication of larger FQHC networks — CCHC grew from 45,000 visits in 2004 to 177,000+ by 2023. The model offers transparent pricing ($125 new patient visits) and walk-in access, which could inform California FQHC expansion strategies.",
      es: "CCHC, un FQHC del Condado de LA que sirve al Valle de San Fernando, abrió su primera ubicación fuera del estado en Las Vegas el 2 de marzo. La expansión señala la creciente sofisticación de las redes FQHC más grandes.",
    },
    category: "merger-acquisition",
    type: "news",
    impactLevel: "medium",
    sourceUrl: "https://www.prnewswire.com/news-releases/comprehensive-community-health-centers-opens-new-location-in-las-vegas-nevada-302692574.html",
    sourceOrg: "PR Newswire",
    region: "California",
    affectedOrgs: ["Comprehensive Community Health Centers"],
    tags: ["expansion", "nevada", "fqhc-growth", "los-angeles", "transparent-pricing"],
  },
  {
    id: "akido-labs-bay-area-ai-street-medicine",
    date: "2026-01-28",
    headline: {
      en: "Bay Area Launches First AI-Powered Safety Net for Unhoused Patients — Funded by CalAIM",
      es: "El Área de la Bahía Lanza la Primera Red de Seguridad con IA para Pacientes Sin Hogar — Financiada por CalAIM",
    },
    summary: {
      en: "Future Communities Institute, Akido Labs, Five Keys, and ReImagine Freedom launch an AI-powered street medicine program using ScopeAI — tablet-guided visits by CHWs with 92% diagnostic accuracy, remote physician review, and MAT within 4 hours. In LA/Kern, the model serves 6,000 unhoused patients with 70% retention and 40% ED reduction. Entirely funded by Medi-Cal CalAIM ECM — no grants. Raises questions about AI experimentation on vulnerable populations and CHW scope expansion via technology.",
      es: "Future Communities Institute, Akido Labs, Five Keys y ReImagine Freedom lanzan un programa de medicina callejera con IA usando ScopeAI — visitas guiadas por tableta con 92% precisión diagnóstica, revisión médica remota y MAT en 4 horas. En LA/Kern, el modelo atiende a 6,000 pacientes sin hogar con 70% retención y 40% reducción de urgencias. Financiado por CalAIM ECM de Medi-Cal — sin subvenciones.",
    },
    category: "change-management",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.ktvu.com/video/fmc-s5kjj7k3h2w09riy",
    sourceOrg: "KTVU",
    region: "Bay Area",
    tags: ["ai", "street-medicine", "unhoused", "calAIM", "ecm", "scope-expansion", "chw"],
  },

  /* ============================================================== */
  /*  LEGISLATION                                                    */
  /* ============================================================== */
  {
    id: "hr1-signed",
    date: "2025-07-04",
    headline: {
      en: "H.R. 1 Signed: Largest Medicaid Cuts in U.S. History",
      es: "H.R. 1 Firmado: Los Mayores Recortes a Medicaid en la Historia de EE.UU.",
    },
    summary: {
      en: "The 'One Big Beautiful Bill' includes $1 trillion in national Medicaid cuts over 10 years, with California projected to lose $30 billion annually. Work requirements, enrollment freezes, and PPS rate changes directly threaten FQHC funding models.",
      es: "El 'One Big Beautiful Bill' incluye $1 billón en recortes nacionales a Medicaid en 10 años, con California proyectado a perder $30 mil millones anualmente. Requisitos de trabajo, congelamientos de inscripción y cambios en tarifas PPS amenazan directamente los modelos de financiamiento de FQHCs.",
    },
    category: "legislation",
    type: "deadline",
    impactLevel: "critical",
    sourceUrl: "https://www.chcf.org/resource/how-massive-federal-cuts-will-create-unprecedented-challenges-medi-cal-patients-providers/",
    sourceOrg: "CHCF",
    region: "Federal",
    tags: ["hr1", "medicaid", "funding-cuts", "work-requirements"],
  },
  {
    id: "ca-sues-federal-cuts",
    date: "2026-02-24",
    headline: {
      en: "California Sues Federal Government Over $600M in Health Funding Cuts",
      es: "California Demanda al Gobierno Federal por $600M en Recortes de Salud",
    },
    summary: {
      en: "California Attorney General files suit challenging federal clawback of $600 million in health funding, arguing the cuts violate federal spending agreements and disproportionately harm safety-net providers including FQHCs.",
      es: "El Fiscal General de California presenta demanda impugnando la recuperación federal de $600 millones en fondos de salud, argumentando que los recortes violan acuerdos de gasto federal y perjudican desproporcionadamente a proveedores de red de seguridad incluyendo FQHCs.",
    },
    category: "legislation",
    type: "news",
    impactLevel: "critical",
    sourceUrl: "https://oag.ca.gov/news/press-releases/attorney-general-bonta-sues-trump-administration-protect-over-600-million-health",
    sourceOrg: "CA Attorney General",
    region: "California",
    tags: ["lawsuit", "federal-cuts", "fqhc-funding"],
  },
  {
    id: "chw-medi-cal-billing",
    date: "2026-01-15",
    headline: {
      en: "CHW Medi-Cal Billing Codes Now Active: Structural Shift for FQHC Hiring",
      es: "Códigos de Facturación Medi-Cal para CHW Ahora Activos: Cambio Estructural para Contratación FQHC",
    },
    summary: {
      en: "Community Health Worker services are now a billable Medi-Cal benefit. FQHCs can bill for CHW encounters, creating a sustainable funding stream for positions previously dependent on grants. This is the most significant change for CHW workforce sustainability in a decade.",
      es: "Los servicios de Promotores de Salud ahora son un beneficio facturable de Medi-Cal. Los FQHCs pueden facturar por encuentros de CHW, creando un flujo de financiamiento sostenible para puestos previamente dependientes de subvenciones.",
    },
    category: "legislation",
    type: "deadline",
    impactLevel: "high",
    sourceUrl: "https://www.dhcs.ca.gov/provgovpart/Pages/Community-Health-Workers.aspx",
    sourceOrg: "CA DHCS",
    region: "California",
    tags: ["chw", "billing-codes", "medi-cal", "hiring"],
  },
  {
    id: "sb-525-minimum-wage",
    date: "2025-06-01",
    headline: {
      en: "SB 525: Healthcare Minimum Wage Rising to $25/hr by 2027 for FQHCs",
      es: "SB 525: Salario Mínimo de Salud Sube a $25/hr para 2027 para FQHCs",
    },
    summary: {
      en: "California's phased healthcare minimum wage law reaches $25/hr for FQHC workers by 2027. This restructures compensation across the sector — raising floors for MAs, front desk, and entry-level clinical staff while compressing wage differentials for experienced workers.",
      es: "La ley de salario mínimo de salud de California alcanza $25/hr para trabajadores de FQHC para 2027. Esto reestructura la compensación en todo el sector — elevando pisos para MAs, recepción y personal clínico de nivel inicial.",
    },
    category: "legislation",
    type: "deadline",
    impactLevel: "high",
    sourceUrl: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB525",
    sourceOrg: "CA Legislature",
    region: "California",
    tags: ["sb-525", "minimum-wage", "compensation"],
  },

  {
    id: "fqhc-transparency-ballot-initiative",
    date: "2026-02-15",
    headline: {
      en: "FQHC Transparency Ballot Initiative Filed — Could Appear on Nov 2026 Ballot",
      es: "Iniciativa de Transparencia FQHC Presentada — Podría Aparecer en Boleta de Nov 2026",
    },
    summary: {
      en: "California ballot initiative #25-0008 proposes requiring FQHCs to spend at least 90% of revenue on direct patient care and services, with full financial transparency reporting. If it qualifies for the November 2026 ballot, it could fundamentally reshape FQHC administration budgets and executive compensation.",
      es: "La iniciativa de boleta de California #25-0008 propone requerir que los FQHCs gasten al menos el 90% de los ingresos en atención directa al paciente, con informes de transparencia financiera completos. Podría remodelar fundamentalmente los presupuestos administrativos de FQHCs.",
    },
    category: "legislation",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://lao.ca.gov/BallotAnalysis/Initiative/2025-008",
    sourceOrg: "CA LAO — Ballot Analysis",
    region: "California",
    tags: ["ballot-initiative", "transparency", "administration", "2026-election"],
  },
  {
    id: "ca-democrats-restore-undocumented-benefits",
    date: "2026-02-27",
    headline: {
      en: "California Democrats Push to Restore Healthcare Benefits for Undocumented Immigrants",
      es: "Demócratas de California Impulsan Restaurar Beneficios de Salud para Inmigrantes Indocumentados",
    },
    summary: {
      en: "California Democratic legislators introduce measures to restore Medi-Cal benefits for undocumented adults that were frozen in January 2026, citing the public health and economic costs of coverage gaps. If successful, this would reverse the enrollment freeze and restore PPS encounter revenue for FQHCs serving undocumented populations.",
      es: "Legisladores demócratas de California introducen medidas para restaurar beneficios de Medi-Cal para adultos indocumentados congelados en enero 2026, citando costos de salud pública y económicos de las brechas de cobertura.",
    },
    category: "legislation",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://health-access.org/senator-durazo-and-assemblymember-arambula-introduce-medi-cal-access-restoration-act-to-reverse-enrollment-freeze-for-undocumented-californians/",
    sourceOrg: "Health Access California",
    region: "California",
    tags: ["undocumented", "medi-cal", "enrollment-freeze", "restoration"],
  },

  /* ============================================================== */
  /*  UNDOCUMENTED ACCESS                                            */
  /* ============================================================== */
  {
    id: "medi-cal-enrollment-freeze",
    date: "2026-01-01",
    headline: {
      en: "Medi-Cal Enrollment Freeze for Undocumented Adults Takes Effect",
      es: "Congelamiento de Inscripción de Medi-Cal para Adultos Indocumentados Entra en Vigor",
    },
    summary: {
      en: "California halts new Medi-Cal enrollment for undocumented adults ages 26-49 as a budget measure, saving $77.9M in 2025-26 but rising to $3.3B by 2028-29. An estimated 1.7M undocumented Californians currently have Medi-Cal. FQHCs must now serve new undocumented patients on the sliding fee scale with no encounter revenue.",
      es: "California detiene nueva inscripción de Medi-Cal para adultos indocumentados de 26-49 años como medida presupuestaria, ahorrando $77.9M en 2025-26 pero subiendo a $3.3 mil millones para 2028-29. Los FQHCs ahora deben atender a nuevos pacientes indocumentados en la escala de tarifa variable sin ingresos por encuentro.",
    },
    category: "undocumented-access",
    type: "news",
    impactLevel: "critical",
    sourceUrl: "https://calmatters.org/health/2025/05/newsom-freeze-medi-cal-undocumented-immigrants/",
    sourceOrg: "CalMatters",
    region: "California",
    tags: ["undocumented", "medi-cal", "enrollment-freeze", "revenue-impact", "in-effect"],
  },
  {
    id: "dental-elimination-undocumented",
    date: "2026-07-01",
    headline: {
      en: "Dental Coverage Eliminated for Undocumented Medi-Cal Enrollees (Effective Jul 2026)",
      es: "Cobertura Dental Eliminada para Inscritos Indocumentados de Medi-Cal (Vigente Jul 2026)",
    },
    summary: {
      en: "Dental benefits for undocumented Medi-Cal enrollees will be eliminated, saving $308M in 2026-27 and $336M annually thereafter. FQHCs with dental programs serving undocumented patients will lose dental encounter revenue for these patients entirely.",
      es: "Los beneficios dentales para inscritos indocumentados de Medi-Cal serán eliminados, ahorrando $308M en 2026-27 y $336M anualmente. Los FQHCs con programas dentales perderán ingresos por encuentros dentales para estos pacientes.",
    },
    category: "undocumented-access",
    type: "deadline",
    impactLevel: "critical",
    sourceUrl: "https://www.dhcs.ca.gov/Medi-Cal/Pages/immigration-status-categories.aspx",
    sourceOrg: "CA DHCS",
    region: "California",
    tags: ["undocumented", "dental", "medi-cal", "revenue-impact"],
  },
  {
    id: "pps-elimination-undocumented",
    date: "2026-10-01",
    headline: {
      en: "PPS Rate Elimination for Undocumented Patient Services (Effective Oct 2026)",
      es: "Eliminación de Tarifa PPS para Servicios a Pacientes Indocumentados (Vigente Oct 2026)",
    },
    summary: {
      en: "FQHC Prospective Payment System rates — averaging $200-400/visit — will be replaced by lower Medi-Cal Fee Schedule rates for services to undocumented individuals. This represents a 50-70% per-encounter revenue cut for these patients. FQHCs with large undocumented populations face severe revenue shortfalls.",
      es: "Las tarifas PPS de FQHC — promediando $200-400/visita — serán reemplazadas por tarifas más bajas del Cuadro de Tarifas de Medi-Cal para servicios a personas indocumentadas. Esto representa un recorte de ingresos del 50-70% por encuentro.",
    },
    category: "undocumented-access",
    type: "deadline",
    impactLevel: "critical",
    sourceUrl: "https://www.dhcs.ca.gov/Budget/Documents/DHCS-TBL-Policy-Changes-to-Individuals-with-UIS-Fact-Sheet.pdf",
    sourceOrg: "CA DHCS",
    region: "California",
    tags: ["undocumented", "pps", "revenue-impact", "fee-schedule"],
  },
  {
    id: "fqhc-copay-exemption",
    date: "2026-02-24",
    headline: {
      en: "FQHCs Exempt from New $35 Medicaid Copays — Competitive Advantage",
      es: "FQHCs Exentos de Nuevos Copagos de $35 de Medicaid — Ventaja Competitiva",
    },
    summary: {
      en: "Under H.R. 1, states can impose up to $35 copays on Medicaid visits — but FQHCs are exempt by statute. This creates a significant competitive advantage: patients will face copays at hospitals and private clinics but not at FQHCs. Health centers should proactively market this exemption to attract and retain patients.",
      es: "Bajo H.R. 1, los estados pueden imponer copagos de hasta $35 en visitas de Medicaid — pero los FQHCs están exentos por ley. Los centros de salud deben promover activamente esta exención para atraer y retener pacientes.",
    },
    category: "undocumented-access",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.kff.org/medicaid/health-provisions-in-the-2025-federal-budget-reconciliation-law/",
    sourceOrg: "KFF",
    region: "Federal",
    tags: ["copay-exemption", "competitive-advantage", "patient-retention"],
  },

  /* ============================================================== */
  /*  LOBBYING & ADVOCACY                                            */
  /* ============================================================== */
  {
    id: "nachc-pi-forum-2026",
    date: "2026-02-12",
    headline: {
      en: "NACHC P&I Forum: $4.6B CHCF Funding — Largest Increase in a Decade, But Expires Dec 2026",
      es: "Foro P&I de NACHC: $4.6 Mil Millones CHCF — Mayor Aumento en una Década, Pero Expira Dic 2026",
    },
    summary: {
      en: "At the NACHC Policy & Issues Forum (Feb 9-12), leaders celebrated the $4.6B Community Health Center Fund as the largest increase in a decade, but warned it expires December 31, 2026 without reauthorization. NACHC also released policy papers on 340B drug pricing protection, workforce pipeline, telehealth permanence, and Medicare FFS reform. The program posted a 2% patient loss in 2025.",
      es: "En el Foro de Política de NACHC (Feb 9-12), los líderes celebraron el Fondo CHCF de $4.6 mil millones como el mayor aumento en una década, pero advirtieron que expira el 31 de diciembre de 2026. NACHC también publicó documentos de política sobre protección 340B, fuerza laboral, telesalud y reforma de Medicare.",
    },
    category: "lobbying",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.nachc.org/nachc-convenes-policymakers-and-health-care-leaders-to-mark-60-years-of-community-health-centers-delivering-health-for-all/",
    sourceOrg: "NACHC",
    region: "Federal",
    tags: ["nachc", "chcf", "reauthorization", "340b", "telehealth", "workforce"],
  },
  {
    id: "hrsa-maha-alignment-fy2026",
    date: "2026-02-10",
    headline: {
      en: "HRSA FY2026 Grants Aligned with 'Make America Healthy Again' Priorities",
      es: "Subvenciones HRSA FY2026 Alineadas con Prioridades 'Hacer América Saludable de Nuevo'",
    },
    summary: {
      en: "HRSA's FY2026 health center grants are being aligned with the administration's 'Make America Healthy Again' (MAHA) initiative, shifting funding priorities toward chronic disease prevention, nutrition, and mental health. FQHCs applying for new grants or renewals should align proposals with these priorities to maximize competitiveness.",
      es: "Las subvenciones de centros de salud HRSA FY2026 se están alineando con la iniciativa 'Make America Healthy Again' (MAHA), cambiando prioridades de financiamiento hacia prevención de enfermedades crónicas, nutrición y salud mental.",
    },
    category: "lobbying",
    type: "news",
    impactLevel: "medium",
    sourceUrl: "https://www.hrsa.gov/about/priorities",
    sourceOrg: "HRSA",
    region: "Federal",
    tags: ["hrsa", "grants", "maha", "chronic-disease", "nutrition"],
  },
  {
    id: "cpca-pcdc-partnership-2026",
    date: "2026-02-28",
    headline: {
      en: "CPCA-PCDC California Health Impact Fund: Low-Interest Capital for FQHCs",
      es: "Fondo de Impacto en Salud CPCA-PCDC: Capital a Bajo Interés para FQHCs",
    },
    summary: {
      en: "The California Primary Care Association (CPCA) and Pacific Community Development Corporation (PCDC) operate the California Health Impact Fund — a low-interest loan program providing capital for FQHC facility expansions, equipment, and community-based care infrastructure. The fund integrates community development financing with health center needs, offering an alternative to traditional lending for safety-net providers facing capital constraints.",
      es: "La Asociación de Atención Primaria de California (CPCA) y la Pacific Community Development Corporation (PCDC) operan el Fondo de Impacto en Salud de California — un programa de préstamos a bajo interés que proporciona capital para expansiones de instalaciones de FQHCs, equipamiento e infraestructura de atención comunitaria.",
    },
    category: "lobbying",
    type: "news",
    impactLevel: "medium",
    sourceUrl: "https://www.cpca.org/CPCA/Health_Center_Resources/Financing_Billing/Health_Impact_Fund/CPCA/HEALTH_CENTER_RESOURCES/Finance_and_Billing/Health_Impact_Fund.aspx",
    sourceOrg: "CPCA",
    region: "California",
    tags: ["cpca", "pcdc", "partnership", "infrastructure", "community-development"],
  },

  /* ============================================================== */
  /*  FUNDING                                                        */
  /* ============================================================== */
  {
    id: "calaim-waiver-expiry",
    date: "2026-12-31",
    headline: {
      en: "CalAIM Section 1115 Waiver Expires December 2026 — $1.2B/Year at Stake",
      es: "Exención CalAIM Sección 1115 Expira en Diciembre 2026 — $1.2 Mil Millones/Año en Juego",
    },
    summary: {
      en: "The CalAIM waiver authorizing Enhanced Care Management and Community Supports expires December 31, 2026. Without renewal, an estimated $1.2 billion annually in ECM/Community Supports funding disappears — threatening thousands of care coordination, CHW, and housing navigator positions at FQHCs statewide.",
      es: "La exención CalAIM que autoriza ECM y Apoyos Comunitarios expira el 31 de diciembre de 2026. Sin renovación, se pierden aproximadamente $1.2 mil millones anuales en financiamiento de ECM/Apoyos Comunitarios — amenazando miles de puestos de coordinación de cuidado y CHW.",
    },
    category: "funding",
    type: "deadline",
    impactLevel: "critical",
    sourceUrl: "https://www.dhcs.ca.gov/CalAIM/Pages/CalAIM.aspx",
    sourceOrg: "CA DHCS",
    region: "California",
    tags: ["calaim", "waiver", "ecm", "community-supports"],
  },

  /* ============================================================== */
  /*  WORKFORCE                                                      */
  /* ============================================================== */
  {
    id: "ca-281m-chw-investment",
    date: "2026-03-01",
    headline: {
      en: "CA CHW Workforce Update: HCAI Advisory Workgroup Continues Through June 2026, Certification Stalled",
      es: "Actualización de Fuerza Laboral CHW de CA: Grupo Asesor HCAI Continúa Hasta Junio 2026, Certificación Estancada",
    },
    summary: {
      en: "HCAI's CHW/Promotor/Representative Advisory Workgroup continues deliberations through June 2026, shaping California's CHW workforce framework. However, significant 2024 Budget Act cuts eliminated most HCAI funding for the CHW/P/R initiative, stalling the full accreditation/certification program. CHW certification guidance remains paused since November 2023 pending SB 803 rules — but Medi-Cal CHW billing codes (active since Jul 2022) remain in place. FQHCs can still bill for CHW encounters while the certification framework catches up.",
      es: "El Grupo Asesor CHW/Promotor de HCAI continúa deliberaciones hasta junio de 2026, moldeando el marco de fuerza laboral CHW de California. Sin embargo, recortes del Presupuesto 2024 eliminaron la mayoría del financiamiento de HCAI para la iniciativa CHW. La guía de certificación CHW permanece pausada desde noviembre de 2023, pero los códigos de facturación Medi-Cal para CHW siguen vigentes.",
    },
    category: "workforce",
    type: "news",
    impactLevel: "medium",
    sourceUrl: "https://hcai.ca.gov/workforce/initiatives/community-health-workers-promotores-chw-p/",
    sourceOrg: "HCAI",
    region: "California",
    tags: ["chw", "promotora", "certification", "sb-803", "workforce-pipeline", "hcai"],
  },
  {
    id: "cpehn-inclusionary-hiring",
    date: "2026-02-28",
    headline: {
      en: "CPEHN Coalition Advances Inclusionary Hiring Policies for CA Health Centers",
      es: "Coalición CPEHN Avanza Políticas de Contratación Inclusiva para Centros de Salud de CA",
    },
    summary: {
      en: "The California Pan-Ethnic Health Network (CPEHN) coalition is advancing inclusionary hiring policies that would strengthen community representation requirements at FQHCs and other safety-net providers. The initiative aligns with CLAS Standards and emphasizes hiring from the communities served — particularly important for FQHCs where 90%+ of patients may be Latino but leadership demographics don't always match.",
      es: "La coalición CPEHN está avanzando políticas de contratación inclusiva que fortalecerían los requisitos de representación comunitaria en FQHCs. La iniciativa se alinea con los Estándares CLAS y enfatiza la contratación desde las comunidades atendidas.",
    },
    category: "workforce",
    type: "news",
    impactLevel: "low",
    sourceUrl: "https://cpehn.org/what-we-do-2/our-networks/community-health-workers-promotores/",
    sourceOrg: "CPEHN",
    region: "California",
    tags: ["diversity", "clas-standards", "community-representation", "hiring", "equity"],
  },
  {
    id: "santa-clara-365-ftes",
    date: "2026-02-25",
    headline: {
      en: "Santa Clara Valley Healthcare Deletes 365 FTE Positions in $183M Budget Cut",
      es: "Santa Clara Valley Healthcare Elimina 365 Puestos FTE en Recorte Presupuestario de $183M",
    },
    summary: {
      en: "Santa Clara County eliminates 365 FTE positions across its healthcare system as part of $183 million in cuts to address a $470 million county budget deficit. Affected roles span clinical, administrative, and support staff. County cites declining federal reimbursements and rising labor costs.",
      es: "El condado de Santa Clara elimina 365 puestos FTE en su sistema de salud como parte de $183 millones en recortes para abordar un déficit presupuestario de $470 millones del condado.",
    },
    category: "workforce",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://news.santaclaracounty.gov/board-supervisors-takes-mid-year-budget-action-offset-federal-funding-cuts-impacting-critical",
    sourceOrg: "Santa Clara County",
    region: "Santa Clara County",
    affectedOrgs: ["Santa Clara Valley Medical Center"],
    affectedOrgSlugs: [],
    tags: ["layoffs", "county-cuts", "budget-deficit"],
  },
  {
    id: "la-care-225-layoffs",
    date: "2026-02-25",
    headline: {
      en: "L.A. Care Health Plan Lays Off 225 Employees Amid Federal Funding Cuts",
      es: "L.A. Care Health Plan Despide a 225 Empleados por Recortes Federales",
    },
    summary: {
      en: "L.A. Care Health Plan, the nation's largest publicly operated health plan, files WARN Act notice for 225 employees effective March 13, 2026. The managed care plan cites federal funding reductions. As a major ECM and managed care contractor for LA-area FQHCs, these cuts may ripple into FQHC contract revenue.",
      es: "L.A. Care Health Plan, el plan de salud público más grande del país, presenta aviso WARN Act para 225 empleados efectivo 13 de marzo de 2026. Como contratista importante de ECM para FQHCs del área de LA, estos recortes pueden afectar los ingresos por contratos de los FQHCs.",
    },
    category: "workforce",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.beckerspayer.com/workforce/7-payers-cutting-jobs-2026/",
    sourceOrg: "Becker's Payer Issues",
    region: "Los Angeles County",
    affectedOrgs: ["L.A. Care Health Plan"],
    affectedOrgSlugs: [],
    tags: ["layoffs", "managed-care", "warn-act", "ecm-impact"],
  },
  {
    id: "ahs-layoffs-deferred",
    date: "2026-03-04",
    headline: {
      en: "Alameda Health System Layoffs Deferred — County Board Creates Working Group",
      es: "Despidos de Alameda Health System Aplazados — Junta del Condado Crea Grupo de Trabajo",
    },
    summary: {
      en: "Alameda County Board of Supervisors voted to defer 187 planned layoffs (211 positions) at Alameda Health System that were set for March 9. The Board created a working group to explore alternatives to cuts that would have closed mental health programs at Highland and Fairmont Hospitals, the ambulatory plastic surgery program, and Highland's Complex Care Program serving homeless patients. AHS projects losing $100M+ annually from federal Medicaid cuts under H.R. 1.",
      es: "La Junta de Supervisores del Condado de Alameda votó aplazar 187 despidos planificados (211 puestos) en Alameda Health System previstos para el 9 de marzo. La Junta creó un grupo de trabajo para explorar alternativas a recortes que habrían cerrado programas de salud mental en los hospitales Highland y Fairmont. AHS proyecta perder más de $100M anuales por recortes federales de Medicaid.",
    },
    category: "workforce",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://oaklandside.org/2026/03/04/alameda-health-system-layoffs-deferred-county-supervisors/",
    sourceOrg: "The Oaklandside",
    region: "Alameda County",
    affectedOrgs: ["Alameda Health System"],
    affectedOrgSlugs: [],
    tags: ["layoffs", "deferred", "dsh-funding", "mental-health", "working-group"],
  },
  {
    id: "nachc-workforce-crisis",
    date: "2026-02-24",
    headline: {
      en: "NACHC Report: 55% of Community Health Centers Cannot Fill Critical Positions",
      es: "Informe NACHC: 55% de Centros de Salud Comunitarios No Pueden Llenar Puestos Críticos",
    },
    summary: {
      en: "NACHC's latest workforce report finds 55% of community health centers face critical staffing shortages. Vacancy rates exceed 20% for physicians, nurses, and behavioral health providers. Meanwhile, 5.6 million patients could lose coverage under proposed work requirements — a $32 billion revenue loss for the CHC sector nationally.",
      es: "El último informe de fuerza laboral de NACHC encuentra que el 55% de los centros de salud comunitarios enfrentan escasez crítica de personal. Mientras tanto, 5.6 millones de pacientes podrían perder cobertura bajo requisitos de trabajo propuestos.",
    },
    category: "lobbying",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.nachc.org/looming-medicaid-changes-threaten-to-deepen-the-community-health-center-workforce-crisis/",
    sourceOrg: "NACHC",
    region: "Federal",
    tags: ["workforce-shortage", "vacancy-rates", "work-requirements"],
  },

  {
    id: "indian-health-center-scv-closure",
    date: "2025-10-01",
    headline: {
      en: "Indian Health Center of Santa Clara Valley: Permanent Closure — 21 Employees",
      es: "Indian Health Center de Santa Clara Valley: Cierre Permanente — 21 Empleados",
    },
    summary: {
      en: "Indian Health Center of Santa Clara Valley permanently closed, displacing 21 employees per WARN Act filing. The FQHC served Native American and Alaska Native communities in the South Bay with primary care, dental, behavioral health, and traditional healing services. The closure represents a significant loss for tribal healthcare access in Silicon Valley.",
      es: "Indian Health Center de Santa Clara Valley cerró permanentemente, desplazando a 21 empleados según el aviso WARN Act. El FQHC servía a comunidades nativas americanas con atención primaria, dental, salud conductual y servicios de sanación tradicional.",
    },
    category: "workforce",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://edd.ca.gov/siteassets/files/jobs_and_training/warn/warn_report1.xlsx",
    sourceOrg: "CA EDD WARN Act",
    region: "Santa Clara County",
    affectedOrgs: ["Indian Health Center of Santa Clara Valley"],
    affectedOrgSlugs: ["indian-health-center-of-santa-clara-valley"],
    tags: ["closure", "fqhc", "warn-act", "native-american", "tribal-health"],
  },
  {
    id: "sjv-clinics-financial-tsunami",
    date: "2026-02-10",
    headline: {
      en: "San Joaquin Valley Clinics Brace for Financial 'Tsunami' from Federal Cuts",
      es: "Clínicas del Valle de San Joaquín Se Preparan para 'Tsunami' Financiero de Recortes Federales",
    },
    summary: {
      en: "Community health centers in California's San Joaquin Valley are warning of a financial 'tsunami' as federal Medicaid cuts compound with rising operational costs. The agricultural heartland's FQHCs serve predominantly Latino farmworker populations with high Medi-Cal dependency, making them exceptionally vulnerable to per-capita cap models and work requirements.",
      es: "Los centros de salud comunitarios en el Valle de San Joaquín de California advierten de un 'tsunami' financiero mientras los recortes federales de Medicaid se combinan con costos operativos crecientes. Los FQHCs de la región dependen altamente de Medi-Cal.",
    },
    category: "workforce",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.kvpr.org/health/2026-02-10/valley-hospitals-clinics-brace-for-financial-tsunami-threatening-health-care-access",
    sourceOrg: "KVPR (Valley Public Radio)",
    region: "Central Valley",
    tags: ["central-valley", "farmworkers", "medi-cal", "financial-distress"],
  },

  /* ============================================================== */
  /*  MERGER-ACQUISITION                                             */
  /* ============================================================== */
  {
    id: "financial-distress-43pct-ma-2025",
    date: "2026-02-15",
    headline: {
      en: "Financial Distress Drives 43% of Healthcare M&A — Record High",
      es: "Dificultades Financieras Impulsan el 43% de Fusiones y Adquisiciones en Salud — Récord Histórico",
    },
    summary: {
      en: "A Kaufman Hall report finds financial distress drove 43% of all healthcare M&A transactions in 2025, a record high. For FQHCs, this signals growing consolidation pressure — financially stressed hospitals and clinics are being acquired or closed, pushing patients to remaining safety-net providers. FQHC leaders should monitor local hospital financial health and prepare for patient volume surges.",
      es: "Un informe de Kaufman Hall encuentra que las dificultades financieras impulsaron el 43% de todas las transacciones de M&A en salud en 2025, un récord. Para FQHCs, esto señala presión de consolidación creciente y posibles aumentos de volumen de pacientes.",
    },
    category: "merger-acquisition",
    type: "news",
    impactLevel: "medium",
    sourceUrl: "https://www.kaufmanhall.com/insights/research-report/hospital-and-health-system-2025-ma-review-uncertainty-transitions-continue",
    sourceOrg: "Kaufman Hall",
    region: "Federal",
    tags: ["mergers", "financial-distress", "consolidation", "patient-volume"],
  },
  {
    id: "united-health-centers-ipa-launch",
    date: "2026-02-20",
    headline: {
      en: "United Health Centers Launches For-Profit IPA: United Physicians Network",
      es: "United Health Centers Lanza IPA Con Fines de Lucro: United Physicians Network",
    },
    summary: {
      en: "United Health Centers of the San Joaquin Valley has launched a for-profit Independent Practice Association (IPA), United Physicians Network. This unusual FQHC-to-IPA expansion may signal a new revenue diversification model for large FQHCs seeking to capture managed care capitation revenue beyond traditional PPS encounters.",
      es: "United Health Centers del Valle de San Joaquín ha lanzado una IPA con fines de lucro, United Physicians Network. Esta expansión inusual de FQHC a IPA podría señalar un nuevo modelo de diversificación de ingresos para FQHCs grandes.",
    },
    category: "merger-acquisition",
    type: "news",
    impactLevel: "medium",
    sourceUrl: "https://www.unitedpn.com/aboutus",
    sourceOrg: "United Physicians Network",
    region: "Central Valley",
    affectedOrgs: ["United Health Centers of the San Joaquin Valley"],
    affectedOrgSlugs: ["united-health-centers"],
    tags: ["ipa", "revenue-diversification", "managed-care", "capitation"],
  },
  {
    id: "prospect-medical-closures",
    date: "2026-02-20",
    headline: {
      en: "Prospect Medical Holdings: Facility Closures and Asset Sales Across LA County",
      es: "Prospect Medical Holdings: Cierres de Instalaciones y Ventas de Activos en el Condado de LA",
    },
    summary: {
      en: "Private equity-backed Prospect Medical Holdings continues downsizing LA County operations, closing facilities and selling assets. Community health advocates warn that closures in underserved areas push more patients toward FQHCs, increasing demand without corresponding funding increases.",
      es: "Prospect Medical Holdings, respaldado por capital privado, continúa reduciendo operaciones en el condado de LA, cerrando instalaciones y vendiendo activos. Esto empuja más pacientes hacia FQHCs sin aumentos de financiamiento correspondientes.",
    },
    category: "merger-acquisition",
    type: "news",
    impactLevel: "medium",
    sourceUrl: "https://elevenflo.com/blog/prospect-medical-holdings-bankruptcy",
    sourceOrg: "ElevenFlo",
    region: "Los Angeles County",
    affectedOrgs: ["Prospect Medical Holdings"],
    affectedOrgSlugs: [],
    tags: ["private-equity", "closures", "patient-displacement"],
  },

  /* ============================================================== */
  /*  CHANGE MANAGEMENT — STRATEGY & TACTICS                         */
  /* ============================================================== */
  {
    id: "strategy-sliding-fee-pps-cuts",
    date: "2026-02-27",
    headline: {
      en: "Strategy: Maintaining Sliding Fee Scale Access When PPS Rates Are Cut",
      es: "Estrategia: Mantener Acceso a Escala de Tarifa Variable Cuando Se Recortan Tarifas PPS",
    },
    summary: {
      en: "When PPS rates drop for undocumented patient services (Oct 2026), FQHCs must decide: absorb the loss and maintain access, or restrict services. Tactics include maximizing 340B drug pricing savings, renegotiating managed care contracts to cross-subsidize, applying for HRSA New Access Points or expanded scope grants, and partnering with county indigent care programs for supplemental funding.",
      es: "Cuando las tarifas PPS bajen para servicios a pacientes indocumentados (Oct 2026), los FQHCs deben decidir: absorber la pérdida y mantener el acceso, o restringir servicios. Tácticas incluyen maximizar ahorros 340B, renegociar contratos de planes de salud, solicitar subvenciones HRSA, y asociarse con programas de cuidado indigente del condado.",
    },
    category: "change-management",
    type: "strategy",
    impactLevel: "high",
    sourceUrl: "https://www.nachc.org/community-health-center-funding-critical-updates-and-future-outlook/",
    sourceOrg: "NACHC",
    region: "California",
    tags: ["pps-cuts", "sliding-fee", "340b", "revenue-strategy"],
  },
  {
    id: "strategy-chw-outreach-undocumented",
    date: "2026-02-27",
    headline: {
      en: "Strategy: CHW Outreach to Undocumented Communities Post-Enrollment Freeze",
      es: "Estrategia: Alcance de CHW a Comunidades Indocumentadas Post-Congelamiento de Inscripción",
    },
    summary: {
      en: "With new Medi-Cal enrollment frozen for undocumented adults 26-49, FQHCs must proactively communicate that doors remain open. Effective tactics: deploy bilingual CHWs to community events, partner with immigrant-serving organizations (churches, legal aid, consulates), use promotora networks, and emphasize that FQHCs never report immigration status. Focus messaging on sliding fee scale, no-copay visits, and FQHC statutory protections.",
      es: "Con nueva inscripción de Medi-Cal congelada para adultos indocumentados de 26-49, los FQHCs deben comunicar proactivamente que las puertas permanecen abiertas. Tácticas: desplegar CHWs bilingües, asociarse con organizaciones de inmigrantes, usar redes de promotoras, y enfatizar que los FQHCs nunca reportan estatus migratorio.",
    },
    category: "change-management",
    type: "strategy",
    impactLevel: "high",
    sourceUrl: "https://www.fqhc.org/blog/2025/11/13/what-fqhcs-need-to-know-about-ice-activity-in-healthcare-insights-from-steve-weinman-principal-at-fqhc-associates",
    sourceOrg: "FQHC Associates",
    region: "California",
    tags: ["undocumented", "chw", "outreach", "enrollment-freeze"],
  },
  {
    id: "strategy-revenue-diversification",
    date: "2026-02-27",
    headline: {
      en: "Strategy: Revenue Diversification — 340B, Grant Stacking, and MCO Contract Negotiation",
      es: "Estrategia: Diversificación de Ingresos — 340B, Acumulación de Subvenciones y Negociación de Contratos MCO",
    },
    summary: {
      en: "With PPS revenue under threat, FQHC leaders should diversify aggressively. Key levers: (1) Maximize 340B drug pricing savings — contract pharmacy arrangements can generate $500K-$2M annually. (2) Stack grants — HRSA Quality Improvement, SAMHSA CCBHC, state HCAI workforce grants. (3) Renegotiate MCO contracts — use CalAIM Community Supports as new revenue streams. (4) Bill CHW encounters under new Medi-Cal codes. (5) Implement co-visit billing systematically.",
      es: "Con ingresos PPS amenazados, los líderes de FQHC deben diversificar agresivamente. Palancas clave: maximizar ahorros 340B, apilar subvenciones, renegociar contratos MCO, facturar encuentros CHW, e implementar facturación de co-visitas sistemáticamente.",
    },
    category: "change-management",
    type: "strategy",
    impactLevel: "high",
    sourceUrl: "https://www.nachc.org/wp-content/uploads/2026/01/policy-papers_chc-workforce_jan-2026.pdf",
    sourceOrg: "NACHC",
    region: "California",
    tags: ["340b", "grants", "mco", "revenue", "co-visit"],
  },
  {
    id: "strategy-undocumented-doors-open",
    date: "2026-02-27",
    headline: {
      en: "Strategy: Communicating to Undocumented Patients That FQHC Doors Stay Open",
      es: "Estrategia: Comunicar a Pacientes Indocumentados Que las Puertas del FQHC Permanecen Abiertas",
    },
    summary: {
      en: "Fear of immigration enforcement is driving undocumented patients away from healthcare — even from FQHCs. Critical communication tactics: (1) Post multilingual signage stating FQHC does not collect or share immigration status. (2) Train all front desk staff to reassure patients verbally. (3) Partner with immigrant rights organizations for trusted referrals. (4) Use community radio and social media in Spanish, Vietnamese, Mandarin. (5) Remind patients that sliding fee scale means care at any price point. (6) Coordinate with legal aid for 'Know Your Rights' sessions on-site.",
      es: "El miedo a la aplicación migratoria está alejando a pacientes indocumentados de la atención médica. Tácticas críticas: señalización multilingüe, capacitación de recepción, asociaciones con organizaciones de derechos de inmigrantes, medios comunitarios, y sesiones de 'Conozca Sus Derechos' en el sitio.",
    },
    category: "change-management",
    type: "strategy",
    impactLevel: "critical",
    sourceUrl: "https://www.nilc.org/resources/healthcare-provider-and-patients-rights-imm-enf/",
    sourceOrg: "NILC",
    region: "California",
    tags: ["undocumented", "communication", "patient-retention", "immigration"],
  },
  {
    id: "la-county-dph-7-clinics-closing",
    date: "2026-02-13",
    headline: {
      en: "LA County Public Health Closing 7 Clinics — $50M in Federal, State, and Local Cuts",
      es: "Salud Pública del Condado de LA Cierra 7 Clínicas — $50M en Recortes Federales, Estatales y Locales",
    },
    summary: {
      en: "Los Angeles County Department of Public Health announced closures of 7 clinics effective February 27, 2026, citing over $50 million in cumulative federal, state, and local funding cuts. Clinics closing include Antelope Valley, Curtis R. Tucker (Inglewood), Pomona, Hollywood Wilshire, Torrance, and two LA locations. Services affected include STI testing, vaccinations, and tuberculosis treatment. Federal funding accounts for approximately 50% of the department's budget. Patients are being redirected to remaining facilities — increased demand on nearby FQHCs is likely.",
      es: "El Departamento de Salud Pública del Condado de Los Ángeles anunció el cierre de 7 clínicas el 27 de febrero de 2026, citando más de $50 millones en recortes acumulados. Los servicios afectados incluyen pruebas de ITS, vacunaciones y tratamiento de tuberculosis. Es probable que aumente la demanda en FQHCs cercanos.",
    },
    category: "funding",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.cbsnews.com/losangeles/news/funding-cuts-los-angeles-county-public-health-closing-clinics/",
    sourceOrg: "CBS News Los Angeles",
    region: "Los Angeles",
    tags: ["clinic-closures", "public-health", "la-county", "federal-cuts", "patient-redirect"],
  },
  {
    id: "cchc-nevada-expansion",
    date: "2026-03-02",
    headline: {
      en: "Comprehensive Community Health Centers (CCHC) Expands to Nevada — First Out-of-State FQHC Move",
      es: "Comprehensive Community Health Centers (CCHC) Se Expande a Nevada — Primera Expansión Fuera del Estado",
    },
    summary: {
      en: "CCHC, a California FQHC with 6 clinics across LA County and the San Fernando Valley, grand-opened its new Las Vegas, Nevada clinic on March 2, 2026 — marking its first out-of-state expansion. CCHC grew from 45,000 visits in 2004 to over 177,000 in 2023. The expansion signals California FQHCs seeking growth beyond state lines as in-state financial pressures mount. Location: 1250 S. Buffalo Drive, Suite 170, Las Vegas.",
      es: "CCHC, un FQHC de California con 6 clínicas en el Condado de LA, inauguró su nueva clínica en Las Vegas, Nevada el 2 de marzo de 2026 — su primera expansión fuera del estado. CCHC creció de 45,000 visitas en 2004 a más de 177,000 en 2023.",
    },
    category: "merger-acquisition",
    type: "news",
    impactLevel: "medium",
    sourceUrl: "https://www.prnewswire.com/news-releases/comprehensive-community-health-centers-opens-new-location-in-las-vegas-nevada-302692574.html",
    sourceOrg: "PR Newswire",
    region: "California",
    affectedOrgs: ["Comprehensive Community Health Centers"],
    affectedOrgSlugs: ["comprehensive-community-health-centers"],
    tags: ["expansion", "nevada", "out-of-state", "growth-strategy"],
  },
  {
    id: "strategy-copay-exemption-advantage",
    date: "2026-02-27",
    headline: {
      en: "Strategy: FQHC Copay Exemption as Competitive Advantage — Patient Acquisition",
      es: "Estrategia: Exención de Copago FQHC como Ventaja Competitiva — Adquisición de Pacientes",
    },
    summary: {
      en: "H.R. 1 allows states to impose $35 Medicaid copays — but FQHCs are statutorily exempt. This is a major competitive advantage. Action items for FQHC leaders: (1) Add 'No Copay' messaging to all patient-facing materials. (2) Update website and signage. (3) Brief front desk and outreach staff. (4) Target patients currently using hospital EDs or urgent cares that will start charging copays. (5) Coordinate with managed care plans to redirect members to FQHCs for copay-free visits.",
      es: "H.R. 1 permite a los estados imponer copagos de $35 de Medicaid — pero los FQHCs están exentos por ley. Elementos de acción: agregar mensaje 'Sin Copago' a materiales, actualizar sitio web, informar al personal, y dirigir pacientes de hospitales que empezarán a cobrar copagos.",
    },
    category: "change-management",
    type: "strategy",
    impactLevel: "high",
    sourceUrl: "https://www.kff.org/medicaid/health-provisions-in-the-2025-federal-budget-reconciliation-law/",
    sourceOrg: "KFF",
    region: "Federal",
    tags: ["copay-exemption", "patient-acquisition", "competitive-advantage"],
  },

  /* ============================================================== */
  /*  2026-03-04 — CREATIVE FINANCING & ECM/RYAN WHITE              */
  /* ============================================================== */
  {
    id: "strategy-340b-rebate-model-pivot",
    date: "2026-03-04",
    headline: {
      en: "Strategy: 340B Rebate Model Pilot Launched Jan 2026 — FQHCs Must Adapt Pharmacy Workflows",
      es: "Estrategia: Programa Piloto de Reembolso 340B Lanzado en Enero 2026 — Los FQHCs Deben Adaptar Flujos de Farmacia",
    },
    summary: {
      en: "HRSA's first-ever 340B rebate model pilot launched January 1, 2026 with 8 manufacturers and 10 drugs (Eliquis, Enbrel, Jardiance, Stelara). Instead of upfront discounts, FQHCs must buy at wholesale and submit rebate claims within 45 days. This changes cash-flow timing and requires two parallel workflows. Action: (1) Audit current 340B capture rates — most FQHCs capture only 20-30% of eligible prescriptions. (2) Invest in 340B software integrating with your EHR. (3) Model cash-flow scenarios for delayed rebate timing. (4) Review contract pharmacy relationships — strategic partners generate significantly more revenue.",
      es: "El primer programa piloto de reembolso 340B de HRSA se lanzó el 1 de enero de 2026 con 8 fabricantes y 10 medicamentos. En lugar de descuentos iniciales, los FQHCs deben comprar al por mayor y presentar reclamos de reembolso en 45 días. Acción: auditar tasas de captura 340B, invertir en software 340B, modelar flujos de efectivo para reembolsos diferidos.",
    },
    category: "change-management",
    type: "strategy",
    impactLevel: "high",
    sourceUrl: "https://web.archive.org/web/2025/https://www.communitylinkconsulting.com/blog/340b-rebate-model-pilot-fqhc-guide",
    sourceOrg: "Community Link Consulting",
    region: "Federal",
    tags: ["340b", "pharmacy", "revenue", "creative-financing", "cash-flow"],
  },
  {
    id: "strategy-dpc-hsa-fqhc-revenue",
    date: "2026-03-04",
    headline: {
      en: "Strategy: HSA-Compatible DPC Opens New Revenue Channel for FQHCs Starting Jan 2026",
      es: "Estrategia: DPC Compatible con HSA Abre Nuevo Canal de Ingresos para FQHCs Desde Enero 2026",
    },
    summary: {
      en: "H.R. 1 (OBBBA) made Direct Primary Care (DPC) memberships HSA-eligible starting January 1, 2026 — up to $150/mo individual, $300/mo family. For FQHCs: this creates a subscription revenue stream from commercially insured/HSA-eligible patients alongside existing PPS. Some FQHCs already generate $300K+/year from 500 subscription members. Action: (1) Explore DPC-overlay pricing for non-Medicaid patients. (2) Partner with local employers for direct primary care contracts. (3) Model revenue impact of 200-500 DPC subscribers. (4) Ensure PPS compliance — DPC fees must not conflict with sliding fee scale or HRSA requirements.",
      es: "H.R. 1 hizo las membresías de Atención Primaria Directa (DPC) elegibles para HSA desde enero 2026 — hasta $150/mes individual, $300/mes familiar. Para FQHCs: esto crea ingresos por suscripción de pacientes con seguro comercial/HSA junto al PPS existente. Acción: explorar precios DPC para pacientes no-Medicaid, asociarse con empleadores locales, modelar impacto de 200-500 suscriptores DPC.",
    },
    category: "change-management",
    type: "strategy",
    impactLevel: "high",
    sourceUrl: "https://hsaforamerica.com/blog/can-i-use-hsa-for-dpc/",
    sourceOrg: "HSA for America",
    region: "Federal",
    tags: ["dpc", "hsa", "subscription-revenue", "creative-financing", "employer-contracts"],
  },
  {
    id: "strategy-ecm-ryan-white-integration",
    date: "2026-03-04",
    headline: {
      en: "Strategy: Integrating ECM Revenue into Ryan White Programs — A Sustainability Playbook for FQHCs",
      es: "Estrategia: Integrar Ingresos ECM en Programas Ryan White — Manual de Sostenibilidad para FQHCs",
    },
    summary: {
      en: "FQHCs with Ryan White funding can layer CalAIM Enhanced Care Management (ECM) revenue on top of existing HIV/AIDS grants — but with a critical exclusion: members enrolled in the HIV/AIDS HCBS Waiver (MCWP) cannot simultaneously receive ECM. The playbook: (1) Identify Ryan White clients who are Medi-Cal eligible but NOT on the MCWP waiver — they can be referred to ECM. (2) Use ECM for HIV+ patients with complex social needs (housing instability, reentry, SUD). (3) Build CHW/care coordinator capacity funded by ECM PMPM to supplement Ryan White case management. (4) Ryan White remains payer of last resort — ECM captures Medi-Cal revenue first. Golden Valley Health Centers (Merced County) is modeling this with ECM + HIV focus.",
      es: "FQHCs con fondos Ryan White pueden agregar ingresos de ECM de CalAIM sobre subvenciones existentes de VIH/SIDA — pero con una exclusión crítica: miembros en la Exención MCWP no pueden recibir ECM simultáneamente. Manual: identificar clientes Ryan White elegibles para Medi-Cal pero NO en la exención MCWP, usar ECM para pacientes VIH+ con necesidades sociales complejas, construir capacidad de CHW financiada por PMPM de ECM.",
    },
    category: "change-management",
    type: "strategy",
    impactLevel: "critical",
    sourceUrl: "https://www.sandiegocounty.gov/content/dam/sdc/hhsa/programs/phs/hiv-planning-group/CalAIM%20SD%20HIV%20Planning%20Group%20(HPG)_11.12.25.pdf",
    sourceOrg: "San Diego County HIV Planning Group",
    region: "California",
    affectedOrgs: ["Golden Valley Health Centers"],
    affectedOrgSlugs: ["golden-valley-health-centers"],
    tags: ["ecm", "ryan-white", "hiv", "calaim", "creative-financing", "revenue-layering", "grant-integration"],
  },
  {
    id: "strategy-fqhc-creative-financing-playbook",
    date: "2026-03-04",
    headline: {
      en: "Strategy: Creative Financing Playbook — 6 Revenue Streams Beyond Section 330 for the Next 3 Years",
      es: "Estrategia: Manual de Financiamiento Creativo — 6 Fuentes de Ingresos Más Allá de la Sección 330 para los Próximos 3 Años",
    },
    summary: {
      en: "With CHCF expiring Dec 2026 and Medicaid cuts squeezing margins, FQHCs must diversify NOW. Six proven strategies: (1) 340B optimization — most FQHCs capture only 20-30% of eligible prescriptions, representing millions in missed revenue. (2) DPC subscription overlay — $150/mo HSA-eligible (new Jan 2026). (3) ECM/Community Supports PMPM layering on top of grant-funded programs. (4) Employer direct contracts — map community employers, offer workplace health services. (5) Value-based APMs with per-member-per-month payments (PPS rules allow FQHC payment under APMs if revenue ≥ PPS equivalent). (6) Revenue cycle tightening — A/R below 45 days, denial management, annual payer contract reviews. A 3-5% improvement in collections = hundreds of thousands annually.",
      es: "Con CHCF expirando en diciembre 2026 y recortes de Medicaid, los FQHCs deben diversificar AHORA. Seis estrategias: optimización 340B, suscripción DPC con HSA, PMPM de ECM sobre programas de subvención, contratos directos con empleadores, APMs basados en valor, y mejora del ciclo de ingresos.",
    },
    category: "change-management",
    type: "strategy",
    impactLevel: "critical",
    sourceUrl: "https://www.chcconsultinggroup.com/2025/11/06/lost-opportunities-for-fqhc-profitability-why-every-dollar-matters-more-than-ever",
    sourceOrg: "CHC Consulting Group",
    region: "Federal",
    tags: ["creative-financing", "revenue-diversification", "340b", "dpc", "ecm", "apm", "revenue-cycle", "survival-playbook"],
  },
  {
    id: "ca-sues-600m-cdc-cuts",
    date: "2026-02-11",
    headline: {
      en: "California Sues Trump Administration Over $600M in CDC Health Funding Cuts — Judge Blocks Action",
      es: "California Demanda a la Administración Trump por $600M en Recortes de Fondos CDC — Juez Bloquea Acción",
    },
    summary: {
      en: "AG Rob Bonta filed suit alongside Colorado, Illinois, and Minnesota after HHS notified Congress of plans to terminate CDC grants exclusively in these four Democratic-led states. At stake for California: $130M from the Public Health Infrastructure Grant alone (supporting 400+ health workforce jobs), plus HIV testing, health equity programs, and emergency preparedness funding. Federal Judge Manish Shah issued a 14-day block, finding the states would suffer 'irreparable harm.' The targeted programs include LA County's $6M health equity initiative and $1.1M HIV surveillance.",
      es: "El fiscal general Bonta demandó junto con Colorado, Illinois y Minnesota después de que HHS notificó planes de terminar subvenciones CDC exclusivamente en estos cuatro estados. En juego para California: $130M de la Subvención de Infraestructura de Salud Pública (400+ empleos), pruebas de VIH, equidad en salud. Un juez federal bloqueó la acción por 14 días.",
    },
    category: "funding",
    type: "news",
    impactLevel: "critical",
    sourceUrl: "https://oag.ca.gov/news/press-releases/attorney-general-bonta-sues-trump-administration-protect-over-600-million-health",
    sourceOrg: "California Attorney General",
    region: "California",
    tags: ["cdc-cuts", "lawsuit", "federal-funding", "hiv", "health-equity", "workforce"],
  },
  {
    id: "ryan-white-ending-49pct-hiv-increase",
    date: "2025-09-15",
    headline: {
      en: "Johns Hopkins Model: Ending Ryan White Program Would Increase New HIV Infections 49% by 2030",
      es: "Modelo de Johns Hopkins: Terminar el Programa Ryan White Aumentaría Nuevas Infecciones de VIH un 49% para 2030",
    },
    summary: {
      en: "A Johns Hopkins computer simulation published in Annals of Internal Medicine projects that eliminating federal Ryan White HIV/AIDS Program funding would increase new HIV infections by 49% nationwide by 2030 — representing thousands of preventable infections annually. For FQHCs receiving Ryan White Part C/D funding: this threat makes ECM revenue layering and Medi-Cal billing optimization urgently important as a financial hedge. The 2026 National Ryan White Conference (Aug 4-7, Washington DC) will focus on 'Strengthening our Foundation' — FQHC leaders should attend for advocacy and sustainability planning.",
      es: "Una simulación de Johns Hopkins proyecta que eliminar fondos federales del Programa Ryan White aumentaría nuevas infecciones de VIH un 49% para 2030. Para FQHCs con fondos Ryan White: esta amenaza hace urgente la integración de ingresos ECM y optimización de facturación Medi-Cal como cobertura financiera.",
    },
    category: "funding",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.acpjournals.org/doi/abs/10.7326/ANNALS-25-01737",
    sourceOrg: "Annals of Internal Medicine",
    region: "Federal",
    tags: ["ryan-white", "hiv", "funding-threat", "ecm", "simulation-study"],
  },
  {
    id: "calaim-1115-waiver-renewal-2026",
    date: "2026-03-04",
    headline: {
      en: "CalAIM 1115 Waiver Expires Dec 2026 — Renewal at Risk Under Restrictive Federal Posture",
      es: "Exención CalAIM 1115 Expira en Diciembre 2026 — Renovación en Riesgo Bajo Postura Federal Restrictiva",
    },
    summary: {
      en: "California's CalAIM 1115 waiver expires December 31, 2026. Since launching in January 2022, 326,000+ members have enrolled in ECM and 368,000+ in Community Supports. DHCS released a concept paper in July 2025 and plans to submit the renewal application in 2026. But the federal administration has withdrawn guidance supporting SDOH through Medicaid and won't approve new funding for rent assistance or medically tailored meals. For FQHCs: ECM revenue (the fastest-growing revenue stream for many centers) depends on this renewal. Build ECM volume NOW while the waiver is active, and prepare contingency plans if renewal is delayed or narrowed.",
      es: "La exención CalAIM 1115 de California expira el 31 de diciembre de 2026. Desde enero 2022: 326,000+ miembros en ECM, 368,000+ en Community Supports. La administración federal ha retirado guías de SDOH a través de Medicaid. Para FQHCs: los ingresos ECM dependen de esta renovación. Construya volumen ECM AHORA y prepare planes de contingencia.",
    },
    category: "legislation",
    type: "deadline",
    impactLevel: "critical",
    sourceUrl: "https://www.chcs.org/resource/national-context-for-californias-renewal-of-calaim-in-2026/",
    sourceOrg: "Center for Health Care Strategies",
    region: "California",
    tags: ["calaim", "ecm", "waiver-renewal", "community-supports", "sdoh", "deadline"],
  },
  {
    id: "strategy-ecm-volume-urgency",
    date: "2026-03-04",
    headline: {
      en: "Strategy: Build ECM Caseload Now Before Dec 2026 Waiver Expiration — Window Is Closing",
      es: "Estrategia: Construir Carga de Casos ECM Ahora Antes de la Expiración de Exención de Diciembre 2026",
    },
    summary: {
      en: "With CalAIM's 1115 waiver expiring Dec 2026 and a hostile federal environment for SDOH-focused Medicaid programs, FQHCs must maximize ECM enrollment now. Revenue strategy: (1) Screen every Medi-Cal patient for ECM eligibility (7 populations of focus including HIV+, SMI, SUD, homelessness, justice-involved). (2) Layer ECM on grant-funded programs — Ryan White clients on Medi-Cal (not MCWP waiver) can be ECM-enrolled. (3) Cross-train CHWs for both ECM care coordination and Ryan White case management. (4) Build data infrastructure showing ECM outcomes (reduced ED visits, improved engagement) to justify renewal. (5) Join CPCA and NACHC advocacy for waiver renewal with full ECM/Community Supports authority.",
      es: "Con la exención CalAIM 1115 expirando en diciembre 2026, los FQHCs deben maximizar la inscripción ECM ahora. Estrategia: evaluar cada paciente Medi-Cal para ECM, integrar ECM con Ryan White, capacitar CHWs en ambos programas, construir datos de resultados ECM, unirse a la defensa de CPCA/NACHC para renovación.",
    },
    category: "change-management",
    type: "strategy",
    impactLevel: "critical",
    sourceUrl: "https://www.dhcs.ca.gov/CalAIM/ECM/Documents/CalAIM-ECM-Policy-Guide.pdf",
    sourceOrg: "DHCS CalAIM",
    region: "California",
    tags: ["ecm", "calaim", "ryan-white", "volume-building", "creative-financing", "chw", "waiver-renewal"],
  },

  /* ============================================================== */
  /*  2026-03-04: Daily Update #10 — SF Crisis Cluster               */
  /* ============================================================== */
  {
    id: "sf-lurie-40m-dph-cuts",
    date: "2026-03-02",
    headline: {
      en: "SF Mayor Lurie Orders $40M in Public Health Cuts — Community Clinics Bracing",
      es: "Alcalde de SF Lurie Ordena $40M en Recortes de Salud Pública — Clínicas Comunitarias se Preparan",
    },
    summary: {
      en: "Mayor Lurie directed SF DPH to cut $40M over two years: $20M from staff reductions (up to 100 employees) and $20M from community-based organization contracts. Combined with $877M city budget deficit driven by federal healthcare cuts, this threatens the safety-net infrastructure serving 110,000+ patients across 12 SFCCC member clinics.",
      es: "El alcalde Lurie ordenó al DPH de SF recortar $40M en dos años: $20M de reducciones de personal (hasta 100 empleados) y $20M de contratos con organizaciones comunitarias. Combinado con un déficit de $877M impulsado por recortes federales de salud, esto amenaza la infraestructura de red de seguridad que sirve a más de 110,000 pacientes en 12 clínicas del SFCCC.",
    },
    category: "funding",
    type: "news",
    impactLevel: "critical",
    sourceUrl: "https://missionlocal.org/2026/03/mayor-lurie-public-health-budget-cuts/",
    sourceOrg: "Mission Local",
    region: "San Francisco County",
    affectedOrgs: ["San Francisco Community Clinic Consortium"],
    tags: ["sf-budget", "dph-cuts", "community-clinics", "safety-net"],
  },
  {
    id: "sf-500-city-jobs-eliminated",
    date: "2026-03-02",
    headline: {
      en: "SF Eliminates 500 City Positions — DPH Largest Agency Hit",
      es: "SF Elimina 500 Puestos de la Ciudad — DPH la Agencia Más Afectada",
    },
    summary: {
      en: "San Francisco must eliminate 500 positions ($100M in personnel savings) to address an $877M budget deficit. The Department of Public Health — the city's largest agency with 7,766 employees — faces the deepest cuts. Departments must submit plans by March 12. Last year's layoff proposal of 150 resulted in ~40 actual cuts after union negotiations.",
      es: "San Francisco debe eliminar 500 puestos ($100M en ahorros de personal) para abordar un déficit de $877M. El Departamento de Salud Pública — la agencia más grande con 7,766 empleados — enfrenta los recortes más profundos. Los departamentos deben presentar planes antes del 12 de marzo.",
    },
    category: "workforce",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://sfstandard.com/2026/03/02/san-francisco-budget-deficit-layoffs-jobs/",
    sourceOrg: "SF Standard",
    region: "San Francisco County",
    tags: ["sf-budget", "layoffs", "dph", "city-workforce"],
  },
  {
    id: "sf-dph-17m-cbo-cuts",
    date: "2026-02-03",
    headline: {
      en: "SF Health Commission Approves $17M in Community Health Program Cuts",
      es: "Comisión de Salud de SF Aprueba $17M en Recortes a Programas de Salud Comunitaria",
    },
    summary: {
      en: "San Francisco DPH cuts $17M from community-based organizations: $6M from workforce development, $5.8M from UCSF affiliation, $3.9M in other cuts, $1.3M from mental health vocational programs. Disproportionately impacts LGBTQ+, African American, and Chinese community health services. SF AIDS Foundation loses $800K; NAMI SF programs 100% cut.",
      es: "El DPH de SF recorta $17M de organizaciones comunitarias: $6M de desarrollo laboral, $5.8M de afiliación con UCSF, $3.9M en otros recortes, $1.3M de programas vocacionales de salud mental. Impacta desproporcionadamente servicios de salud LGBTQ+, afroamericanos y chinos. SF AIDS Foundation pierde $800K; programas de NAMI SF eliminados 100%.",
    },
    category: "funding",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.kalw.org/bay-area-news/2026-02-03/san-francisco-health-commission-discusses-cuts-to-community-based-health-programs",
    sourceOrg: "KALW",
    region: "San Francisco County",
    affectedOrgs: ["San Francisco Community Health Center", "San Francisco AIDS Foundation"],
    affectedOrgSlugs: ["san-francisco-community-health-center"],
    tags: ["sf-budget", "cbo-cuts", "lgbtq-health", "workforce-development"],
  },
  {
    id: "sfchc-transhope-funding-terminated",
    date: "2026-02-13",
    headline: {
      en: "SF Community Health Center: $300K+ Federal Funding Terminated, More Expected",
      es: "Centro de Salud Comunitario de SF: $300K+ en Fondos Federales Terminados, Se Esperan Más",
    },
    summary: {
      en: "San Francisco Community Health Center (SFCHC) had over $300,000 in federal funding terminated effective February 11, 2026, with additional terminations expected. The cuts targeted TransHOPE, a program training young community leaders in peer-based education. SFCHC serves as a key safety-net provider for LGBTQ+ and people of color communities.",
      es: "El Centro de Salud Comunitario de SF tuvo más de $300,000 en fondos federales terminados efectivos el 11 de febrero de 2026, con más terminaciones esperadas. Los recortes afectaron TransHOPE, un programa que entrena líderes comunitarios jóvenes en educación entre pares.",
    },
    category: "funding",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.sfcommunityhealth.org/announcements",
    sourceOrg: "SF Community Health Center",
    region: "San Francisco County",
    affectedOrgs: ["San Francisco Community Health Center"],
    affectedOrgSlugs: ["san-francisco-community-health-center"],
    tags: ["federal-funding", "transhope", "lgbtq-health", "grant-termination"],
  },
  {
    id: "sf-50k-medi-cal-loss",
    date: "2025-11-25",
    headline: {
      en: "Up to 50,000 SF Residents Could Lose Medi-Cal — $400M Budget Hole",
      es: "Hasta 50,000 Residentes de SF Podrían Perder Medi-Cal — Agujero de $400M",
    },
    summary: {
      en: "Analysis projects 25,000-50,000 San Franciscans could be removed from Medi-Cal by end of 2027 under H.R. 1 provisions. The city faces a $400M budget hole through 2038 ($315M next year alone). SFCCC CEO Johanna Liu warned that 'service cuts at one provider affect the entire system.' Healthy San Francisco program revival under consideration.",
      es: "El análisis proyecta que 25,000-50,000 sanfranciscanos podrían perder Medi-Cal para fines de 2027 bajo H.R. 1. La ciudad enfrenta un agujero de $400M hasta 2038 ($315M solo el próximo año). La directora de SFCCC Johanna Liu advirtió que 'los recortes en un proveedor afectan todo el sistema.'",
    },
    category: "undocumented-access",
    type: "news",
    impactLevel: "critical",
    sourceUrl: "https://sfstandard.com/2025/11/25/san-francisco-budget-deficit-big-beautiful-bill-trump-health-care/",
    sourceOrg: "SF Standard",
    region: "San Francisco County",
    affectedOrgs: ["San Francisco Community Clinic Consortium"],
    tags: ["medi-cal", "hr1", "coverage-loss", "budget-deficit", "sfccc"],
  },
  {
    id: "sf-va-157-jobs-cut",
    date: "2026-01-15",
    headline: {
      en: "SF VA Medical Center Loses 157 Jobs — Only ER Social Worker Eliminated",
      es: "Centro Médico VA de SF Pierde 157 Empleos — Único Trabajador Social de ER Eliminado",
    },
    summary: {
      en: "Trump administration eliminates 157 positions at the San Francisco VA Medical Center as part of nationwide cuts of 37,000 vacant positions. The cuts include the only emergency room social worker position, raising concerns about care continuity for veterans who often rely on community health centers for follow-up care.",
      es: "La administración Trump elimina 157 puestos en el Centro Médico VA de San Francisco como parte de recortes nacionales de 37,000 puestos vacantes. Los recortes incluyen el único puesto de trabajador social de emergencia.",
    },
    category: "workforce",
    type: "news",
    impactLevel: "medium",
    sourceUrl: "https://www.kqed.org/news/12069772/trump-eliminates-157-jobs-at-the-san-francisco-veterans-affairs-medical-center",
    sourceOrg: "KQED",
    region: "San Francisco County",
    tags: ["va", "federal-cuts", "workforce", "veterans"],
  },
  {
    id: "sf-hhs-region9-closure",
    date: "2025-04-15",
    headline: {
      en: "HHS Closes SF Regional Office — 318 Staff, Medicare/Medicaid Oversight Gone",
      es: "HHS Cierra Oficina Regional de SF — 318 Empleados, Supervisión de Medicare/Medicaid Eliminada",
    },
    summary: {
      en: "The HHS Region 9 office in San Francisco's Nancy Pelosi Federal Building closed, eliminating 318 staff who managed Medicare, Medicaid, and indigenous health services for CA, AZ, HI, NV, and 6 territories. The office regularly hosted grant workshops with community health centers. Speaker Pelosi called closure 'irresponsible.' Part of RFK Jr.'s plan to cut 60,000+ HHS positions.",
      es: "La oficina HHS Región 9 en el Edificio Federal Nancy Pelosi cerró, eliminando 318 empleados que gestionaban Medicare, Medicaid y servicios de salud indígena para CA, AZ, HI, NV y 6 territorios. La oficina regularmente organizaba talleres de subvenciones con centros de salud comunitarios.",
    },
    category: "workforce",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.kqed.org/news/12033968/san-franciscos-hhs-office-close-federal-health-cuts-pelosi",
    sourceOrg: "KQED",
    region: "San Francisco County",
    tags: ["hhs", "federal-cuts", "region9", "doge", "grant-workshops"],
  },
  {
    id: "nejm-ai-inflection-point",
    date: "2026-03-01",
    headline: {
      en: "NEJM Catalyst: AI in Healthcare Hits Inflection Point — Beyond Scribes",
      es: "NEJM Catalyst: IA en Salud Llega a Punto de Inflexión — Más Allá de Escribas",
    },
    summary: {
      en: "March 2026 NEJM Catalyst special issue on AI implementation, guest-edited by UCSF Health Chief AI Officer Sara Murray. AI is moving from R&D to real-world deployment. Beyond ambient scribes (the fastest health tech adoption in history), the issue examines care coordination, population health, and revenue cycle AI. Key insight: translating hype into ROI depends on implementation science fundamentals.",
      es: "Edición especial de NEJM Catalyst de marzo 2026 sobre implementación de IA, editada por la Directora de IA de UCSF Health Sara Murray. La IA se mueve de I+D a implementación real. Más allá de escribas ambientales, examina IA en coordinación de cuidados, salud poblacional y ciclo de ingresos.",
    },
    category: "change-management",
    type: "news",
    impactLevel: "medium",
    sourceUrl: "https://catalyst.nejm.org/doi/full/10.1056/CAT.26.0074",
    sourceOrg: "NEJM Catalyst",
    region: "Federal",
    tags: ["ai", "implementation-science", "ambient-scribe", "ucsf"],
  },

  /* ============================================================== */
  /*  2026-03-05: Daily Update #11 — San Diego + Inland Empire       */
  /* ============================================================== */
  {
    id: "sd-county-safety-net-overhaul",
    date: "2026-03-03",
    headline: {
      en: "SD County Supervisors Vote to Overhaul Safety Net Program — 400K at Risk",
      es: "Supervisores del Condado de SD Votan para Reformar Programa de Red de Seguridad — 400K en Riesgo",
    },
    summary: {
      en: "San Diego County Board of Supervisors voted 4-1 to reform County Medical Services, the most restrictive safety-net program among large CA counties. H.R. 1 will strip Medi-Cal from an estimated 75,000 noncitizens in SD County starting Oct 2026, putting ~400,000 San Diegans at risk of losing coverage. Subcommittee will propose reforms within 60 days including eliminating property liens and expanding virtual applications.",
      es: "La Junta de Supervisores del Condado de San Diego votó 4-1 para reformar los Servicios Médicos del Condado, el programa de red de seguridad más restrictivo entre los grandes condados de CA. H.R. 1 eliminará Medi-Cal para ~75,000 no ciudadanos en el condado de SD a partir de octubre 2026, poniendo a ~400,000 sandieguinos en riesgo.",
    },
    category: "legislation",
    type: "news",
    impactLevel: "critical",
    sourceUrl: "https://timesofsandiego.com/health/2026/03/03/san-diego-county-supervisors-vote-overhaul-safety-net-health-program/",
    sourceOrg: "Times of San Diego",
    region: "San Diego County",
    affectedOrgs: ["Family Health Centers of San Diego", "San Ysidro Health", "Neighborhood Healthcare"],
    affectedOrgSlugs: ["family-health-centers-of-san-diego", "san-ysidro-health", "neighborhood-healthcare"],
    tags: ["san-diego", "safety-net", "medi-cal", "coverage-loss", "county-reform"],
  },
  {
    id: "sd-county-300m-funding-loss",
    date: "2026-01-22",
    headline: {
      en: "San Diego County Faces $300M Loss from Federal Healthcare & Food Cuts",
      es: "Condado de San Diego Enfrenta Pérdida de $300M por Recortes Federales de Salud y Alimentación",
    },
    summary: {
      en: "San Diego County is absorbing $300M in federal funding losses — $1.1B from Medi-Cal cuts + $300M from CalFresh cuts statewide. Board Chair Lawson-Remer warned cuts 'show up when you call 911.' County workshops scheduled to plan response as hospital reimbursements decline and emergency departments face rising uninsured patient volume.",
      es: "El Condado de San Diego absorbe $300M en pérdidas de fondos federales — $1.1B de recortes a Medi-Cal + $300M de CalFresh a nivel estatal. La Presidenta Lawson-Remer advirtió que los recortes 'se notan cuando llamas al 911.'",
    },
    category: "funding",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://fox5sandiego.com/news/local-news/san-diego-county/san-diego-county-funding-cuts/amp/",
    sourceOrg: "Fox 5 San Diego",
    region: "San Diego County",
    tags: ["san-diego", "federal-cuts", "medi-cal", "calfresh", "budget-deficit"],
  },
  {
    id: "sd-nhcare-fqhc-closure-warning",
    date: "2025-10-20",
    headline: {
      en: "Neighborhood Healthcare: 'Hundreds of FQHCs Will Shut Down in a Year'",
      es: "Neighborhood Healthcare: 'Cientos de FQHCs Cerrarán en un Año'",
    },
    summary: {
      en: "Neighborhood Healthcare's Director of External Affairs warned that 'hundreds of FQHCs throughout the state will shut down in a year' due to H.R. 1 cuts. Palomar Health, Sharp HealthCare, and other SD institutions are preparing for $300M in annual lost revenue. Neighborhood Healthcare, due to its size, is not at immediate risk but warned 'hospitals in San Diego County are going to be overrun.'",
      es: "La Directora de Asuntos Externos de Neighborhood Healthcare advirtió que 'cientos de FQHCs en todo el estado cerrarán en un año' debido a recortes de H.R. 1. Palomar Health, Sharp HealthCare y otras instituciones de SD se preparan para $300M en ingresos anuales perdidos.",
    },
    category: "workforce",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.nhcare.org/local-healthcare-institutions-prepare-for-impact-of-hr1-cuts-government-shutdown/",
    sourceOrg: "Neighborhood Healthcare",
    region: "San Diego County",
    affectedOrgs: ["Neighborhood Healthcare", "Palomar Health", "Sharp HealthCare"],
    affectedOrgSlugs: ["neighborhood-healthcare"],
    tags: ["san-diego", "fqhc-closures", "hr1", "workforce", "hospital-overload"],
  },
  {
    id: "sd-san-ysidro-55m-center-opens",
    date: "2026-01-09",
    headline: {
      en: "San Ysidro Health Opens $55M Center in National City — 'Doing More with Less'",
      es: "San Ysidro Health Abre Centro de $55M en National City — 'Hacer Más con Menos'",
    },
    summary: {
      en: "San Ysidro Health opened the $54.5M Macias Family Health Center in National City just as federal cuts to Medi-Cal intensify. CEO Kevin Mattson described it as 'a fraught moment' — work requirements and coverage changes will increase uninsured patients while reducing revenue. La Maestra and FHCSD also bracing for higher demand with less funding.",
      es: "San Ysidro Health abrió el Centro de Salud Familiar Macias de $54.5M en National City justo cuando se intensifican los recortes federales a Medi-Cal. El CEO Kevin Mattson lo describió como 'un momento tenso' — los requisitos de trabajo y cambios de cobertura aumentarán pacientes sin seguro mientras reducen ingresos.",
    },
    category: "change-management",
    type: "news",
    impactLevel: "medium",
    sourceUrl: "https://www.sandiegouniontribune.com/2026/01/09/macias-family-health-center-opens-in-national-city/",
    sourceOrg: "San Diego Union-Tribune",
    region: "San Diego County",
    affectedOrgs: ["San Ysidro Health"],
    affectedOrgSlugs: ["san-ysidro-health"],
    tags: ["san-diego", "san-ysidro", "expansion", "national-city", "medi-cal"],
  },
  {
    id: "ie-medi-cal-1-6m-at-risk",
    date: "2026-02-18",
    headline: {
      en: "Inland Empire: 1.6M IEHP Members at Risk as Medi-Cal Cuts Loom",
      es: "Inland Empire: 1.6M Miembros de IEHP en Riesgo por Recortes a Medi-Cal",
    },
    summary: {
      en: "The Inland Empire Health Plan serves 1.6M members across Riverside (42% enrolled) and San Bernardino (45% enrolled) counties. Projected $10-20B annual state Medi-Cal cuts could force clinics to cut dental, vision, and podiatry services first. Centro Medico (15,000 patients, nearly all Medi-Cal) warns of months-long waits. IEHP contracts with 9,000 providers, hundreds of clinics, and every hospital in both counties.",
      es: "El Plan de Salud de Inland Empire sirve a 1.6M miembros en los condados de Riverside (42% inscrito) y San Bernardino (45% inscrito). Los recortes proyectados de $10-20B anuales a Medi-Cal estatal podrían forzar a clínicas a eliminar servicios dentales, de visión y podiatría primero.",
    },
    category: "funding",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.chcf.org/resource/riverside-county-potential-medi-cal-cuts-distress-constituents-health-leaders/",
    sourceOrg: "CHCF",
    region: "Riverside County",
    tags: ["inland-empire", "iehp", "medi-cal", "riverside", "san-bernardino", "coverage-loss"],
  },
  {
    id: "ie-va-loma-linda-staffing-crisis",
    date: "2026-01-11",
    headline: {
      en: "VA Loma Linda: 64K Appointments Canceled Due to Staff Shortages",
      es: "VA Loma Linda: 64K Citas Canceladas por Falta de Personal",
    },
    summary: {
      en: "A VA OIG audit found VA Loma Linda Healthcare System lacked adequate oversight at 5 Inland Empire outpatient clinics, contributing to 64,000 appointment cancellations from Oct 2021-Sep 2023. Two-thirds of cancellations were directly due to staffing shortages. Veterans displaced from VA care increasingly turn to community health centers, increasing FQHC demand.",
      es: "Una auditoría del OIG del VA encontró que el Sistema de Salud VA Loma Linda careció de supervisión adecuada en 5 clínicas ambulatorias del IE, contribuyendo a 64,000 cancelaciones de citas de oct 2021-sep 2023. Dos tercios de las cancelaciones fueron directamente por escasez de personal.",
    },
    category: "workforce",
    type: "news",
    impactLevel: "medium",
    sourceUrl: "https://www.sbsun.com/2026/01/11/two-thirds-of-appointments-at-loma-linda-va-outpatient-clinics-canceled-due-to-staff-shortages-audit-findsaudit-finds-69-of-canceled-appointments-at-loma-linda-va-outpatient-clinics-due-to-staffing-s/",
    sourceOrg: "San Bernardino Sun",
    region: "San Bernardino County",
    tags: ["inland-empire", "va", "staffing", "loma-linda", "veterans"],
  },
  /* ============================================================== */
  /*  2026-03-05: LA + Central Coast Regional Scan                  */
  /* ============================================================== */
  {
    id: "la-county-1-5b-federal-cuts-hospital-closure",
    date: "2026-03-04",
    headline: {
      en: "LA County Faces $1.5B in Federal Cuts — Hospital Closure Now Possible",
      es: "Condado de LA Enfrenta $1.5B en Recortes Federales — Cierre de Hospital Ahora Posible",
    },
    summary: {
      en: "LA County CEO warned of 'devastating' service reductions as $1.5B in federal cuts hit over 5 years. The Department of Health Services — 70% of its $6.5B budget from federal funds — projects a $1.85B annual deficit by 2028-29. A county public hospital closure is now 'last resort' on the table. 700K+ residents could lose Medi-Cal under new work requirements. St. John's Community Health (120K patients) faces 'closing several health centers' and 'laying off hundreds of staff.' Hiring freeze already in effect.",
      es: "La CEO del Condado de LA advirtió de reducciones 'devastadoras' de servicios con $1.5B en recortes federales en 5 años. El DHS — 70% de su presupuesto de $6.5B de fondos federales — proyecta un déficit anual de $1.85B para 2028-29. El cierre de un hospital público del condado es ahora 'último recurso.' 700K+ residentes podrían perder Medi-Cal por nuevos requisitos de trabajo.",
    },
    category: "funding",
    type: "news",
    impactLevel: "critical",
    sourceUrl: "https://laist.com/news/politics/la-county-financial-future",
    sourceOrg: "LAist",
    region: "Los Angeles County",
    affectedOrgs: ["St. John's Community Health", "AltaMed Health Services", "APLA Health"],
    affectedOrgSlugs: ["st-johns-community-health", "altamed-health-services", "apla-health"],
    tags: ["la-county", "federal-cuts", "hospital-closure", "dhs", "medi-cal", "workforce"],
  },
  {
    id: "oc-health-agency-clinic-closures",
    date: "2026-03-04",
    headline: {
      en: "Orange County Health Care Agency Closing Clinics After $13M in Federal Grant Losses",
      es: "Agencia de Salud del Condado de Orange Cierra Clínicas Tras $13M en Pérdidas de Subvenciones Federales",
    },
    summary: {
      en: "The OC Health Care Agency lost 5 federal grants totaling $13M, forcing closure of the children & family planning clinic (June 30) and dental services (May 6) at its 17th Street Santa Ana location. WIC services at Santa Ana and Buena Park also reduced. Affected families transitioning to CalOptima, Kaiser, and community clinics including FQHCs. Part of statewide county health service reductions.",
      es: "La Agencia de Salud del Condado de Orange perdió 5 subvenciones federales por $13M, forzando el cierre de la clínica infantil y de planificación familiar (30 de junio) y servicios dentales (6 de mayo) en su ubicación de 17th Street en Santa Ana. Servicios WIC en Santa Ana y Buena Park también reducidos.",
    },
    category: "funding",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://abc7.com/post/federal-funding-cuts-force-orange-county-health-care-agency-close-clinics/16162489/",
    sourceOrg: "ABC7",
    region: "Orange County",
    affectedOrgs: ["Share Our Selves"],
    affectedOrgSlugs: ["share-our-selves"],
    tags: ["orange-county", "clinic-closures", "federal-grants", "wic", "family-planning"],
  },
  {
    id: "sb-county-budget-bloodbath-17m-public-health",
    date: "2026-03-04",
    headline: {
      en: "Santa Barbara County Faces 'Budget Bloodbath' — $17.4M Public Health Deficit",
      es: "Condado de Santa Barbara Enfrenta 'Baño de Sangre Presupuestario' — $17.4M de Déficit en Salud Pública",
    },
    summary: {
      en: "Santa Barbara County supervisors face a $66M deficit over 5 years with $50M+ in the next 2 years. Public Health ($25M in cuts) and Social Services ($28M) are hardest hit. County previously paused 55.2 FTE layoffs and transition of 7,000 immigrant patients following court injunction. Total Public Health deficit: $7.6M structural + $6.6M state cuts + $3.2M H.R. 1 = $17.4M. Specialty services (endocrinology, neurology, urology) may be eliminated. Furloughs, layoffs, wage freezes on the table.",
      es: "Los supervisores del Condado de Santa Barbara enfrentan un déficit de $66M en 5 años con $50M+ en los próximos 2 años. Salud Pública ($25M en recortes) y Servicios Sociales ($28M) son los más afectados. El condado pausó 55.2 despidos FTE y la transición de 7,000 pacientes inmigrantes. Déficit total de Salud Pública: $17.4M.",
    },
    category: "funding",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.independent.com/2026/03/04/santa-barbara-county-supes-face-budget-bloodbath/",
    sourceOrg: "Santa Barbara Independent",
    region: "Santa Barbara County",
    affectedOrgs: ["Clinicas del Camino Real"],
    affectedOrgSlugs: ["clinicas-del-camino-real"],
    tags: ["santa-barbara", "budget-deficit", "public-health", "layoffs", "immigrant-patients", "central-coast"],
  },
  {
    id: "monterey-natividad-38k-medi-cal-loss",
    date: "2026-03-01",
    headline: {
      en: "Monterey County: 38K to Lose Medi-Cal, Natividad Faces $14M DSH Funding Limbo",
      es: "Condado de Monterey: 38K Perderán Medi-Cal, Natividad Enfrenta $14M de Fondos DSH en Limbo",
    },
    summary: {
      en: "Approximately 38,000 Monterey County residents will lose Medi-Cal over 4 years under H.R. 1. Natividad Medical Center's $14M/year Disproportionate Share Hospital (DSH) funding is in limbo. Federal Medical Assistance Percentage drops from 90% to 50% for undocumented emergency care starting Oct 1, 2026, dramatically increasing county costs. Supervisors concerned about 'negative impact on the financial health of Natividad' — the county's safety-net hospital.",
      es: "Aproximadamente 38,000 residentes del Condado de Monterey perderán Medi-Cal en 4 años bajo H.R. 1. Los $14M/año de fondos de Hospital de Participación Desproporcionada (DSH) de Natividad están en limbo. La tasa FMAP baja del 90% al 50% para atención de emergencia de indocumentados a partir del 1 de octubre de 2026.",
    },
    category: "funding",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.montereycountynow.com/blogs/news_blog/trumps-big-beautiful-bill-will-mean-decreased-access-to-health-care-and-increased-costs-to/article_f4c26c47-bc5f-4ded-8e19-bd18b3de3f09.html",
    sourceOrg: "Monterey County Now",
    region: "Monterey County",
    tags: ["monterey", "natividad", "medi-cal", "dsh", "fmap", "undocumented", "central-coast"],
  },
  // --- Added 2026-03-06 (daily update #12) ---
  {
    id: "ahs-layoffs-deferred-march-2026",
    date: "2026-03-04",
    headline: {
      en: "Alameda Health System Layoffs Deferred: Board Creates Working Group for $91.7M Deficit",
      es: "Despidos de Alameda Health System Diferidos: Junta Crea Grupo de Trabajo para Déficit de $91.7M",
    },
    summary: {
      en: "Alameda County Board of Supervisors unanimously voted March 4 to defer 183 layoffs and halt closure of mental health units at Highland and Fairmont hospitals — originally set for March 9. A working group including Supervisors Miley and Fortunato Bas, AHS administration, and healthcare union reps will work to reduce the $91.7M deficit before July 1. CEO James Jackson warned H.R. 1 represents 'the largest roll-back of federal health care spending in history.' With 60% of AHS patients on Medicaid, the system faces $100M/year in losses by 2030.",
      es: "La Junta de Supervisores del Condado de Alameda votó unánimemente el 4 de marzo para diferir 183 despidos y detener el cierre de unidades de salud mental en los hospitales Highland y Fairmont — originalmente programados para el 9 de marzo. Un grupo de trabajo buscará reducir el déficit de $91.7M antes del 1 de julio. El CEO Jackson advirtió que H.R. 1 representa 'la mayor reducción de gasto federal en salud de la historia.'",
    },
    category: "workforce",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.eastbaytimes.com/2026/03/04/alameda-health-system-dodges-layoffs-for-now-amid-cuts-to-medicaid/",
    sourceOrg: "East Bay Times",
    region: "Alameda County",
    affectedOrgs: ["Alameda Health System"],
    affectedOrgSlugs: [],
    tags: ["layoffs-deferred", "working-group", "mental-health", "medicaid", "bay-area"],
  },
  {
    id: "la-county-healthcare-sales-tax-coalition",
    date: "2026-01-28",
    headline: {
      en: "LA County Healthcare Coalition Proposes Half-Cent Sales Tax to Replace Federal Cuts",
      es: "Coalición de Salud del Condado de LA Propone Impuesto de Medio Centavo para Reemplazar Recortes Federales",
    },
    summary: {
      en: "A coalition led by St. John's Community Health CEO Jim Mangia, SEIU locals 721 and 2015, Community Clinic Association of LA County, and Planned Parenthood is pushing for a half-cent sales tax to offset Medi-Cal cuts affecting 3.3M county residents. Proposed allocation: 47% free/reduced-cost care for uninsured, 22% DHS, 10% DPH. Coalition requesting Board of Supervisors place measure on June ballot or will pursue November initiative through petition.",
      es: "Una coalición liderada por el CEO de St. John's Community Health Jim Mangia, SEIU 721 y 2015, y la Asociación de Clínicas Comunitarias del Condado de LA impulsa un impuesto de medio centavo para compensar recortes de Medi-Cal que afectan a 3.3M residentes del condado. 47% para atención gratuita/reducida para no asegurados, 22% DHS, 10% DPH.",
    },
    category: "lobbying",
    type: "news",
    impactLevel: "medium",
    sourceUrl: "https://mynewsla.com/business/2026/01/28/community-health-coalition-proposes-half-cent-la-county-tax-for-healthcare/",
    sourceOrg: "MyNewsLA",
    region: "Los Angeles County",
    affectedOrgs: ["St. John's Community Health", "Community Clinic Association of LA County"],
    affectedOrgSlugs: ["st-johns-community-health"],
    tags: ["sales-tax", "coalition", "seiu", "ballot-measure", "medi-cal", "los-angeles"],
  },
  {
    id: "c3-aco-expands-california-fqhcs",
    date: "2026-02-03",
    headline: {
      en: "C3 ACO Expands to California: FQHC-Governed Value-Based Care Network Adds 10 Health Centers",
      es: "C3 ACO Se Expande a California: Red de Atención Basada en Valor Gobernada por FQHCs Agrega 10 Centros",
    },
    summary: {
      en: "Community Care Cooperative (C3), the largest non-profit FQHC-governed ACO in the country, expanded to California with the addition of 10 FQHCs across multiple states effective January 1, 2026. C3 is accountable for 240,000+ Medicaid and Medicare beneficiaries in value-based arrangements and has earned $152M+ in shared savings since 2018. The expansion signals growing FQHC interest in ACO participation as a revenue diversification strategy amid Medicaid cuts.",
      es: "Community Care Cooperative (C3), el ACO sin fines de lucro gobernado por FQHCs más grande del país, se expandió a California con 10 FQHCs nuevos en múltiples estados desde el 1 de enero de 2026. C3 es responsable de más de 240,000 beneficiarios de Medicaid y Medicare y ha generado $152M+ en ahorros compartidos desde 2018.",
    },
    category: "merger-acquisition",
    type: "news",
    impactLevel: "medium",
    sourceUrl: "https://www.businesswire.com/news/home/20260203635260/en/Community-Care-Cooperative-C3-Strengthens-ACO-Network-with-10-New-FQHCs-to-Improve-Outcomes-and-Reduce-Costs",
    sourceOrg: "Business Wire",
    region: "California",
    tags: ["aco", "value-based-care", "shared-savings", "revenue-diversification"],
  },

  /* ============================================================== */
  /*  MARCH 6, 2026 — BLS FEBRUARY JOBS REPORT                      */
  /* ============================================================== */
  {
    id: "feb-2026-jobs-report-negative",
    date: "2026-03-06",
    headline: {
      en: "U.S. Economy Lost 92,000 Jobs in February — Third Negative Month in Five",
      es: "La Economía de EE.UU. Perdió 92,000 Empleos en Febrero — Tercer Mes Negativo en Cinco",
    },
    summary: {
      en: "The BLS Employment Situation report for February 2026 shows the U.S. economy lost 92,000 jobs (consensus expected +59,000). Unemployment rose to 4.4%. Labor force participation fell to 62.0%, lowest since December 2021. December was revised from +48,000 to -17,000 — a 65,000-job swing. The economy has averaged essentially zero net job creation over the past six months. Federal government employment is down 330,000 since October 2024.",
      es: "El informe de Situación del Empleo del BLS para febrero 2026 muestra que la economía de EE.UU. perdió 92,000 empleos (el consenso esperaba +59,000). El desempleo subió a 4.4%. La participación laboral cayó a 62.0%, la más baja desde diciembre 2021. Diciembre fue revisado de +48,000 a -17,000. La economía ha promediado esencialmente cero creación neta de empleo en los últimos seis meses.",
    },
    category: "workforce",
    type: "news",
    impactLevel: "critical",
    sourceUrl: "https://www.bls.gov/news.release/empsit.nr0.htm",
    sourceOrg: "BLS",
    region: "Federal",
    tags: ["jobs-report", "unemployment", "recession-risk", "labor-market"],
  },
  {
    id: "healthcare-jobs-negative-feb-2026",
    date: "2026-03-06",
    headline: {
      en: "Healthcare Lost 28,000 Jobs in February — First Negative Month in Years, Driven by Kaiser Strike",
      es: "El Sector Salud Perdió 28,000 Empleos en Febrero — Primer Mes Negativo en Años, Impulsado por Huelga de Kaiser",
    },
    summary: {
      en: "Healthcare employment fell by 28,000 in February after adding 77,000 in January. The decline was driven by 31,000 Kaiser Permanente nurses striking in California and Hawaii — the largest open-ended nurses strike in U.S. history (Jan 26 - Feb 24). Physicians' offices lost 37,400 jobs; hospitals added 11,600. Healthcare had been carrying the entire labor market — creating 436,000 jobs in 12 months (121% of all U.S. job growth). Glassdoor's Daniel Zhao noted healthcare added 693,000 jobs in 2025 while all other industries combined lost 500,000+.",
      es: "El empleo en salud cayó 28,000 en febrero después de agregar 77,000 en enero. La caída fue impulsada por 31,000 enfermeras de Kaiser Permanente en huelga en California y Hawái — la huelga abierta de enfermeras más grande en la historia de EE.UU. (26 ene - 24 feb). El sector salud había creado 436,000 empleos en 12 meses (121% de todo el crecimiento laboral de EE.UU.).",
    },
    category: "workforce",
    type: "news",
    impactLevel: "critical",
    sourceUrl: "https://www.bls.gov/news.release/empsit.nr0.htm",
    sourceOrg: "BLS",
    region: "Federal",
    tags: ["healthcare-jobs", "kaiser-strike", "nursing", "labor-market-fragility"],
  },
  {
    id: "kaiser-strike-ends-21pct-raise",
    date: "2026-02-24",
    headline: {
      en: "Kaiser Permanente Strike Ends: 31,000 Workers Win 21.5% Raise After Largest Nurses Strike in History",
      es: "Huelga de Kaiser Permanente Termina: 31,000 Trabajadores Ganan 21.5% de Aumento Tras la Mayor Huelga de Enfermeras de la Historia",
    },
    summary: {
      en: "The 30-day Kaiser Permanente strike — the largest open-ended nurses strike in U.S. history — ended February 24 with a tentative agreement including 21.5% wage increases over 4 years. The 31,000 UNAC/UHCP nurses and healthcare professionals in California and Hawaii struck over staffing ratios, wage parity, and patient safety. The strike directly suppressed the February BLS jobs report, contributing to a -28,000 healthcare employment decline. The settlement sets a new compensation benchmark for California healthcare workers.",
      es: "La huelga de 30 días de Kaiser Permanente — la mayor huelga abierta de enfermeras en la historia de EE.UU. — terminó el 24 de febrero con un acuerdo tentativo que incluye aumentos salariales de 21.5% en 4 años. Los 31,000 enfermeros y profesionales de UNAC/UHCP en California y Hawái hicieron huelga por ratios de personal, paridad salarial y seguridad del paciente.",
    },
    category: "workforce",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://nurse.org/news/kaiser-strike-california-hawaii/",
    sourceOrg: "Nurse.Org",
    region: "California",
    tags: ["kaiser", "strike", "nursing", "wage-increase", "unac-uhcp", "staffing-ratios"],
  },
  {
    id: "healthcare-carrying-labor-market",
    date: "2026-03-06",
    headline: {
      en: "Healthcare Is Carrying the Entire U.S. Labor Market — 121% of Net Job Growth. Congress Just Cut Its Funding.",
      es: "El Sector Salud Carga Todo el Mercado Laboral de EE.UU. — 121% del Crecimiento Neto. El Congreso Acaba de Recortar Su Financiamiento.",
    },
    summary: {
      en: "Analysis from the San Francisco Fed, Glassdoor, and CEPR reveals healthcare created virtually all sustained U.S. job growth in 2025-2026. In January 2026, healthcare was 63% of all jobs added. Over 12 months, healthcare created 121% of net employment gains while every other major sector was flat or negative. Inflation Insights' Omair Sharif warned: 'This is about a labor market so soft that it cannot withstand a strike of 31K healthcare workers, because no one else is hiring.' With H.R. 1 Medicaid cuts threatening healthcare funding, this structural dependence is a national economic vulnerability.",
      es: "Análisis del Fed de San Francisco, Glassdoor y CEPR revela que el sector salud creó virtualmente todo el crecimiento laboral sostenido de EE.UU. en 2025-2026. En enero 2026, fue el 63% de todos los empleos agregados. En 12 meses, creó 121% de las ganancias netas de empleo. Con los recortes de Medicaid de H.R. 1 amenazando el financiamiento de salud, esta dependencia estructural es una vulnerabilidad económica nacional.",
    },
    category: "workforce",
    type: "news",
    impactLevel: "critical",
    sourceUrl: "https://www.marketplace.org/story/2026/03/05/health-care-jobs-are-growing-can-it-last",
    sourceOrg: "Marketplace / APM",
    region: "Federal",
    tags: ["labor-market", "structural-risk", "medicaid-cuts", "economic-vulnerability"],
  },

  /* ============================================================== */
  /*  MARCH 6, 2026 — DAILY UPDATE: REGIONAL + POLICY SCAN          */
  /* ============================================================== */
  {
    id: "santa-clara-measure-a-healthcare-tax",
    date: "2026-03-06",
    headline: {
      en: "Santa Clara County Voters Pass Measure A — First CA County to Tax Its Way Out of Federal Medicaid Cuts",
      es: "Votantes del Condado de Santa Clara Aprueban Medida A — Primer Condado de CA en Compensar Recortes Federales con Impuestos",
    },
    summary: {
      en: "Santa Clara County became the first in California to pass a sales tax to offset federal Medicaid cuts. Measure A (0.625% sales tax, 57% approval) generates $330M/year for healthcare, effective April 1, 2026. Covers ~⅓ of the county's estimated $1B+ annual revenue loss from H.R. 1. One in four county families rely on Medi-Cal. Santa Clara Valley Healthcare operates 4 hospitals and 15 health centers. LA County is now pursuing a similar half-cent sales tax measure — a model that could spread statewide.",
      es: "El condado de Santa Clara fue el primero en California en aprobar un impuesto de ventas para compensar los recortes federales a Medicaid. La Medida A (0.625% impuesto de ventas, 57% aprobación) genera $330M/año para salud, vigente desde el 1 de abril de 2026. Cubre ~⅓ de la pérdida estimada de $1B+ anual del condado por H.R. 1. Una de cada cuatro familias depende de Medi-Cal. El condado de LA busca una medida similar.",
    },
    category: "funding",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.naco.org/news/california-county-sales-tax-measure-backfills-federal-healthcare-cuts",
    sourceOrg: "National Association of Counties",
    region: "Santa Clara County",
    affectedOrgs: ["Santa Clara Valley Healthcare"],
    affectedOrgSlugs: ["county-of-santa-clara"],
    tags: ["sales-tax", "ballot-measure", "medicaid-offset", "measure-a", "bay-area", "revenue-model"],
  },
  {
    id: "sacramento-county-26m-hhs-funding-cut",
    date: "2026-03-07",
    headline: {
      en: "Sacramento County Faces $26M Health Funding Cut as HHS Restructuring Hits Safety Net",
      es: "Sacramento County Enfrenta Recorte de $26M en Salud por Reestructuración del HHS",
    },
    summary: {
      en: "Sacramento County is at risk of losing $26 million in federal health and human services funding as the Trump administration's HHS restructuring and DOGE-aligned cuts rescind COVID-era public health grants. California and 22 other states have filed suit to block the cuts. A separate $233,000 HHS grant termination has already stalled a community health leadership program in South Sacramento's Lawrence Park neighborhood before it launched. Sacramento County Health Center is an FQHC serving the county's lowest-income residents.",
      es: "Sacramento County enfrenta la pérdida de $26 millones en financiamiento federal de salud mientras la reestructuración del HHS revoca subvenciones de salud pública de la era COVID. California y 22 estados han demandado para bloquear los recortes. Una terminación separada de $233K ya detuvo un programa comunitario en el vecindario Lawrence Park del sur de Sacramento.",
    },
    category: "funding",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.abc10.com/article/news/local/sacramento-county-health-funding-cut-rfk-california-doge/103-b1e53d57-777f-462c-becd-67bfebb4c89e",
    sourceOrg: "ABC10 Sacramento",
    region: "Sacramento County",
    affectedOrgSlugs: ["sacramento-county-primary"],
    tags: ["sacramento", "hhs-restructuring", "federal-cuts", "doge", "public-health", "grant-termination"],
  },
  {
    id: "medi-cal-30-premium-undocumented-2027",
    date: "2026-03-07",
    headline: {
      en: "California to Charge Undocumented Medi-Cal Members $30/Month Starting July 2027",
      es: "California Cobrará $30/Mes a Miembros de Medi-Cal Indocumentados a Partir de Julio 2027",
    },
    summary: {
      en: "Beginning July 1, 2027, Medi-Cal members ages 19–59 who are undocumented or have unsatisfactory immigration status (UIS) and remain in full-coverage Medi-Cal will be required to pay a $30 monthly premium to maintain coverage. Dental benefits for UIS members were already eliminated effective July 1, 2026. Combined with the January 2026 enrollment freeze and eliminated FQHC PPS reimbursement for UIS services, this represents a compounding disinvestment in California's 1.6 million undocumented Medi-Cal enrollees — raising coverage loss and FQHC revenue risk.",
      es: "A partir del 1 de julio de 2027, los miembros de Medi-Cal de 19 a 59 años indocumentados o con estado migratorio insatisfactorio (UIS) que permanezcan en cobertura completa deberán pagar una prima mensual de $30. Los beneficios dentales para miembros UIS ya fueron eliminados el 1 de julio de 2026.",
    },
    category: "undocumented-access",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.dhcs.ca.gov/Medi-Cal/Pages/immigration-status-categories.aspx",
    sourceOrg: "CA Department of Health Care Services",
    region: "California",
    tags: ["undocumented", "medi-cal-premium", "coverage-loss", "uis", "july-2027", "enrollment"],
  },
  {
    id: "ca-pps-elimination-uis-july-2026",
    date: "2026-03-08",
    headline: {
      en: "CA Eliminates FQHC PPS Rates for Undocumented Patients July 2026 — $1B Annual Revenue Impact",
      es: "CA Elimina Tasas PPS de FQHC para Pacientes Indocumentados en Julio 2026 — Impacto de $1B Anual en Ingresos",
    },
    summary: {
      en: "Starting July 1, 2026, California's budget eliminates use of the Prospective Payment System for FQHC services to state-only-funded individuals with unsatisfactory immigration status (UIS). FQHCs will instead be paid at the regular Medi-Cal fee-for-service rate or negotiated managed care plan rates — roughly 50–70% less per encounter than the PPS rate ($200–400/visit). The CA LAO scores this as $1 billion in annual General Fund savings, meaning $1 billion in annual FQHC revenue loss beginning 2026–27. FQHCs with large undocumented patient panels — concentrated in LA, San Diego, and Central Valley — face the most severe financial exposure. Dental benefits for undocumented Medi-Cal enrollees also eliminated: $308M savings in 2026–27.",
      es: "A partir del 1 de julio de 2026, el presupuesto de California elimina el uso del Sistema de Pago Prospectivo (PPS) para servicios de FQHC a personas con estatus migratorio insatisfactorio financiadas solo por el estado (UIS). Los FQHCs recibirán en cambio la tasa regular de Medi-Cal o tarifas de planes de atención administrada — aproximadamente 50–70% menos por encuentro. El LAO de CA califica esto como $1 mil millones en ahorros anuales del Fondo General = $1 mil millones en pérdida de ingresos para FQHCs.",
    },
    category: "legislation",
    type: "deadline",
    impactLevel: "critical",
    sourceUrl: "https://www.chcf.org/resource/how-massive-federal-cuts-will-create-unprecedented-challenges-medi-cal-patients-providers/",
    sourceOrg: "California Health Care Foundation",
    region: "California",
    tags: ["pps", "undocumented-patients", "uis", "revenue-cut", "july-2026", "los-angeles", "san-diego", "central-valley", "dental"],
  },
  {
    id: "hrsa-maha-grant-competition-fy2026",
    date: "2026-03-08",
    headline: {
      en: "HRSA FY2026 Health Center Grants Now MAHA-Aligned — $403M in Awards, Chronic Disease Focus",
      es: "Subvenciones HRSA FY2026 para Centros de Salud Ahora Alineadas con MAHA — $403M en Premios, Enfoque en Enfermedades Crónicas",
    },
    summary: {
      en: "HRSA's FY2026 Health Center Program Service Area Competition explicitly requires alignment with 'Make American Healthy Again' (MAHA) priorities — shifting focus from health disparities/social determinants to chronic disease prevention, nutrition, reducing medication overreliance, and environmental health. Two award tranches: up to 93 awards totaling ~$232M for March 2026 start dates, and up to 51 awards totaling ~$171M for May 2026 start dates ($403M total). HRSA also announced: MAHA Elevate program (~$100M for preventive lifestyle interventions) and RCORP-Impact for rural SUD treatment (80 awards at up to $750K/year). Warning: FQHCs serving undocumented populations or emphasizing language access/social needs may score lower under MAHA-aligned criteria.",
      es: "La Competencia del Programa de Centros de Salud del HRSA para FY2026 requiere explícitamente alineación con las prioridades 'Make American Healthy Again' (MAHA) — cambiando el enfoque de las disparidades de salud hacia la prevención de enfermedades crónicas, nutrición y reducción de medicamentos. Dos tramos de premios: 93 premios (~$232M) para marzo 2026 y 51 premios (~$171M) para mayo 2026 ($403M total).",
    },
    category: "funding",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://web.archive.org/web/2025/https://www.communitylinkconsulting.com/blog/fqhc-2026-federal-grant-updates",
    sourceOrg: "Community Link Consulting",
    region: "Federal",
    tags: ["hrsa", "maha", "grants", "fy2026", "chronic-disease", "health-disparities", "service-area-competition"],
  },
  {
    id: "united-health-centers-40th-clinic-west-fresno",
    date: "2026-01-23",
    headline: {
      en: "United Health Centers Opens 40th Clinic in West Fresno 'Health Care Desert' Despite Federal Funding Pressure",
      es: "United Health Centers Abre su Clínica 40 en el 'Desierto de Atención Médica' del Oeste de Fresno a Pesar de la Presión Federal",
    },
    summary: {
      en: "United Health Centers of the San Joaquin Valley opened its 40th location on January 23, 2026, in West Fresno — an area described as a 'health care desert.' UHC serves over 100,000 patients with 450,000 annual appointments across Fresno, Kings, and Tulare counties. The expansion comes despite looming federal Medicaid funding pressures that threaten 77% of net patient revenue at San Joaquin Valley FQHCs (per CHCF's 2025 regional report). UHC was recognized as a HRSA Top 10% Health Center Quality Leader in 2025. The organization also launched United Physicians Network, a for-profit IPA, as a revenue diversification strategy.",
      es: "United Health Centers del Valle de San Joaquín abrió su ubicación 40 el 23 de enero de 2026 en el Oeste de Fresno — un área descrita como un 'desierto de atención médica.' UHC atiende a más de 100,000 pacientes con 450,000 citas anuales en los condados de Fresno, Kings y Tulare.",
    },
    category: "patient-story",
    type: "news",
    impactLevel: "medium",
    sourceUrl: "https://thebusinessjournal.com/97261-2/",
    sourceOrg: "The Business Journal",
    region: "Fresno County",
    affectedOrgSlugs: ["united-health-centers"],
    tags: ["central-valley", "fresno", "expansion", "health-care-desert", "quality-leader", "ipa"],
  },
  {
    id: "chcf-sjv-regional-report-2025",
    date: "2026-02-02",
    headline: {
      en: "CHCF: San Joaquin Valley FQHCs Serve 3.2M Visits/Year — But 77% Revenue Dependent on Medi-Cal",
      es: "CHCF: FQHCs del Valle de San Joaquín Brindan 3.2M Visitas/Año — Pero el 77% de Ingresos Depende de Medi-Cal",
    },
    summary: {
      en: "CHCF's San Joaquin Valley Regional Market Report 2025 (released Feb 2, 2026) shows CA's most FQHC-dependent region: community health centers provide 3.2 million visits/year in the SJV, with 77% of net patient revenue from Medi-Cal — significantly higher than statewide average. Half of all CHC visits in the region occur at just two organizations: Family HealthCare Network and United Health Centers. As federal Medicaid cuts loom and the PPS rate elimination for undocumented patients takes effect July 2026, the SJV's FQHC ecosystem is structurally the most vulnerable in California.",
      es: "El Informe de Mercado Regional del Valle de San Joaquín de CHCF 2025 muestra la región más dependiente de FQHC en CA: los centros de salud comunitarios brindan 3.2 millones de visitas/año en el SJV, con el 77% de los ingresos netos de pacientes provenientes de Medi-Cal. La mitad de las visitas se concentran en solo dos organizaciones: Family HealthCare Network y United Health Centers.",
    },
    category: "funding",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.chcf.org/resource/san-joaquin-valley-regional-market-report-2025/",
    sourceOrg: "California Health Care Foundation",
    region: "Fresno County",
    affectedOrgSlugs: ["united-health-centers", "family-healthcare-network"],
    tags: ["central-valley", "san-joaquin", "medi-cal-dependency", "revenue-exposure", "regional-analysis"],
  },
  {
    id: "chc-2pct-financial-loss-2025",
    date: "2026-03-06",
    headline: {
      en: "Community Health Centers Posted 2% Program-Wide Financial Loss in 2025 — Structural Strain Before H.R. 1 Cuts",
      es: "Centros de Salud Comunitarios Registraron Pérdida Financiera del 2% en 2025 — Tensión Estructural Antes de Recortes H.R. 1",
    },
    summary: {
      en: "The community health center program posted a 2% program-wide financial loss for 2025 — signaling structural strain even before H.R. 1 Medicaid cuts take full effect. With $4.6B in CHCF funding only authorized through December 2026, and Medicaid accounting for 43% of health center revenue nationally, even modest shifts in productivity, payer mix, or workforce costs can destabilize organizations. The negative margin came despite the largest CHCF funding increase in a decade, underscoring that grant funding alone cannot offset structural revenue erosion.",
      es: "El programa de centros de salud comunitarios registró una pérdida financiera del 2% en 2025 — señal de tensión estructural incluso antes de que los recortes de Medicaid por H.R. 1 surtan efecto completo. Con $4.6B en financiamiento CHCF autorizado solo hasta diciembre 2026, y Medicaid representando el 43% de los ingresos de centros de salud a nivel nacional, incluso cambios modestos en productividad o mezcla de pagadores pueden desestabilizar organizaciones.",
    },
    category: "funding",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.fqhc.org/blog/2026/2-18/straight-from-the-hill-what-pi-really-means-for-your-health-center",
    sourceOrg: "FQHC Associates",
    region: "Federal",
    tags: ["financial-loss", "structural-strain", "chcf", "revenue-erosion", "program-wide"],
  },

  /* ============================================================== */
  /*  SUPPLEMENTAL INTEL — March 9, 2026                            */
  /* ============================================================== */
  {
    id: "calaim-waiver-expiration-dec-2026",
    date: "2026-03-09",
    headline: {
      en: "CalAIM Waiver Expires December 31, 2026 — $1.2B in ECM/Community Supports at Risk",
      es: "Exoneración CalAIM Expira el 31 de Diciembre de 2026 — $1.2B en ECM/Apoyos Comunitarios en Riesgo",
    },
    summary: {
      en: "California's CalAIM 1115 and 1915(b) waivers expire December 31, 2026. DHCS has indicated it will seek renewal, but no formal application has been submitted. If not renewed, $1.2 billion annually in ECM and Community Supports funding disappears — threatening thousands of care coordination, CHW, and housing navigator positions at FQHCs statewide. Combined with the CHCF authorization cliff (also December 2026), this creates a double uncertainty event for the safety net.",
      es: "Las exoneraciones CalAIM 1115 y 1915(b) de California expiran el 31 de diciembre de 2026. Si no se renuevan, $1.2B anuales en financiamiento de ECM y Apoyos Comunitarios desaparecen — amenazando miles de posiciones de coordinación de cuidado, CHWs y navegadores de vivienda en FQHCs en todo el estado.",
    },
    category: "legislation",
    type: "deadline",
    impactLevel: "critical",
    sourceUrl: "https://www.chcs.org/resource/national-context-for-californias-renewal-of-calaim-in-2026/",
    sourceOrg: "Center for Health Care Strategies / DHCS",
    region: "California",
    tags: ["calaim", "waiver", "ecm", "community-supports", "expiration", "workforce-risk"],
  },
  {
    id: "chcf-authorization-cliff-dec-2026",
    date: "2026-03-09",
    headline: {
      en: "CHCF $4.6B Authorization Expires December 2026 — No Multi-Year Reauthorization",
      es: "Autorización CHCF de $4.6B Expira en Diciembre 2026 — Sin Reautorización Plurianual",
    },
    summary: {
      en: "The Consolidated Appropriations Act 2026 set the Community Health Center Fund at $4.6B for FY2026, but authorization extends only through December 2026 — breaking from the historical 5-year reauthorization pattern. This creates hiring hesitancy, slows capital investment, and narrows strategic planning windows for all FQHCs nationwide.",
      es: "La Ley de Asignaciones Consolidadas 2026 fijó el Fondo de Centros de Salud Comunitarios en $4.6B para el año fiscal 2026, pero la autorización solo se extiende hasta diciembre 2026 — rompiendo el patrón histórico de reautorización de 5 años.",
    },
    category: "funding",
    type: "deadline",
    impactLevel: "critical",
    sourceUrl: "https://synergybilling.com/news/insights/the-funding-landscape-for-community-health-centers-in-2026",
    sourceOrg: "Synergy Billing / Congress",
    region: "Federal",
    tags: ["chcf", "authorization", "funding-cliff", "reauthorization", "federal"],
  },
  {
    id: "nachc-workforce-39pct-shortage-2038",
    date: "2026-01-30",
    headline: {
      en: "NACHC: Nonmetro Areas Face 39% PCP Shortage by 2038 — CHC Workforce Now 326,000+",
      es: "NACHC: Áreas No Metropolitanas Enfrentan 39% de Escasez de Médicos para 2038 — Fuerza Laboral CHC Ahora 326,000+",
    },
    summary: {
      en: "NACHC's January 2026 workforce policy paper reveals the CHC workforce now stands at 326,000+ individuals across 17,000 locations serving 52 million people. By 2038, nonmetro areas face a projected 39% shortage of primary care physicians and 46% for dentists. NACHC requests $2.1 billion for five years and authorization of $950 million/year. This is the definitive 2026 policy document on community health center workforce needs.",
      es: "El documento de política de fuerza laboral de NACHC de enero 2026 revela que la fuerza laboral de CHC ahora es de 326,000+ individuos en 17,000 ubicaciones sirviendo a 52 millones de personas. Para 2038, áreas no metropolitanas enfrentan una escasez proyectada del 39% de médicos de atención primaria.",
    },
    category: "workforce",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.nachc.org/wp-content/uploads/2026/01/policy-papers_chc-workforce_jan-2026.pdf",
    sourceOrg: "National Association of Community Health Centers",
    region: "Federal",
    tags: ["nachc", "workforce", "shortage", "primary-care", "dentist", "pipeline"],
  },
  {
    id: "altamed-15b-economic-impact",
    date: "2025-12-08",
    headline: {
      en: "AltaMed Generated $15.1 Billion in Economic Impact (2019-2024) — Nation's Largest FQHC",
      es: "AltaMed Generó $15.1 Mil Millones en Impacto Económico (2019-2024) — FQHC Más Grande del País",
    },
    summary: {
      en: "AltaMed Health Services — the nation's largest FQHC — released a study showing $15.1B in total economic impact from 2019-2024. Impact grew from $1.08B (2019) to $4.24B (projected 2025). The organization supports 12,000 jobs, serves 465,000 Medi-Cal patients, and operates 60+ health centers. Every $1 spent generates $1.50 in economic activity. Powerful advocacy data point for the entire FQHC sector.",
      es: "AltaMed Health Services — el FQHC más grande del país — publicó un estudio que muestra $15.1B en impacto económico total de 2019-2024. La organización apoya 12,000 empleos, sirve a 465,000 pacientes de Medi-Cal y opera más de 60 centros de salud.",
    },
    category: "funding",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.prnewswire.com/news-releases/study-reveals-altamed-health-services-generated-15-1-billion-in-economic-impact-while-caring-for-hundreds-of-thousands-of-southern-california-patients-demonstrating-how-healthy-communities-strengthen-local-economies-302635447.html",
    sourceOrg: "AltaMed Health Services",
    region: "Los Angeles County",
    affectedOrgs: ["AltaMed Health Services"],
    affectedOrgSlugs: ["altamed-health-services"],
    tags: ["altamed", "economic-impact", "advocacy", "largest-fqhc", "positive"],
  },
  {
    id: "ab-1460-340b-contract-pharmacy-2026",
    date: "2026-03-09",
    headline: {
      en: "AB 1460: California's 340B Contract Pharmacy Protection Bill Expected to Return in 2026",
      es: "AB 1460: Proyecto de Ley de Protección de Farmacias Contratadas 340B Regresaría en 2026",
    },
    summary: {
      en: "AB 1460 (Assemblymember Chris Rogers, D-Santa Rosa) would prohibit pharmaceutical manufacturers from restricting 340B contract pharmacy arrangements. The bill passed the Assembly in 2025 but stalled in the Senate. It's expected to return in 2026. Eight states have enacted similar laws; 23 have pending bills. For rural FQHCs, passage would expand access to 340B pharmacy discounts. However, the IRA is simultaneously creating structural pressure: 340B hit $81B in 2024 (+23% YoY), and Medicare Part D/B manufacturer rebate exemptions begin impacting 340B margins in 2026.",
      es: "AB 1460 prohibiría a los fabricantes farmacéuticos restringir los acuerdos de farmacias contratadas 340B. El proyecto pasó la Asamblea en 2025 pero se detuvo en el Senado. Se espera que regrese en 2026.",
    },
    category: "legislation",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.mwe.com/insights/california-introduces-bill-to-protect-340b-contract-pharmacy-arrangements/",
    sourceOrg: "McDermott Will & Emery / California Legislature",
    region: "California",
    tags: ["340b", "contract-pharmacy", "ab-1460", "legislation", "rural"],
  },
  {
    id: "healthcare-hiring-momentum-icims-2026",
    date: "2026-03-05",
    headline: {
      en: "Healthcare Hiring Shows Early 2026 Momentum: Clinical Apps +10%, Openings +20% MoM",
      es: "Contratación en Salud Muestra Impulso a Inicio de 2026: Solicitudes Clínicas +10%, Vacantes +20% MoM",
    },
    summary: {
      en: "iCIMS workforce data for January 2026 shows strong healthcare hiring momentum: clinical healthcare saw applications (+10%), openings (+20%), and hires (+5%) all up month-over-month. Nonclinical talent also showed positive momentum with applications (+17%), openings (+15%), and hires (+6%). This national data signals a strong demand cycle for healthcare talent despite funding uncertainty.",
      es: "Datos de fuerza laboral de iCIMS para enero 2026 muestran fuerte impulso en contratación de salud: el sector clínico vio solicitudes (+10%), vacantes (+20%) y contrataciones (+5%) todas al alza mes a mes.",
    },
    category: "workforce",
    type: "news",
    impactLevel: "medium",
    sourceUrl: "https://www.prnewswire.com/news-releases/healthcare-hiring-shows-early-2026-momentum-amid-growing-candidate-interest-according-to-icims-data-302684645.html",
    sourceOrg: "iCIMS",
    region: "Federal",
    tags: ["hiring", "momentum", "icims", "positive", "workforce-data"],
  },
  {
    id: "health-net-31m-housing-investment",
    date: "2026-03-03",
    headline: {
      en: "Health Net Invests $31.25M in California Housing — 900+ Families to Find Stability",
      es: "Health Net Invierte $31.25M en Vivienda en California — Más de 900 Familias Encontrarán Estabilidad",
    },
    summary: {
      en: "Health Net (Centene) announced $31.25M in grants to develop 10 housing projects in LA, Sacramento, San Joaquin, and Stanislaus counties, providing 900+ affordable housing units. Since 2020, Health Net has dedicated $93M to housing/homelessness initiatives. This investment intersects directly with CalAIM Community Supports — FQHCs delivering housing navigation and transitional rent services in these counties could benefit from increased housing stock for ECM patients.",
      es: "Health Net (Centene) anunció $31.25M en subvenciones para desarrollar 10 proyectos de vivienda en los condados de LA, Sacramento, San Joaquín y Stanislaus, proporcionando más de 900 unidades de vivienda asequible.",
    },
    category: "funding",
    type: "news",
    impactLevel: "medium",
    sourceUrl: "https://www.prnewswire.com/news-releases/more-than-900-california-families-to-find-housing-stability-in-2026-thanks-to-31-25-million-investment-by-health-net-302701671.html",
    sourceOrg: "Health Net / Centene",
    region: "California",
    tags: ["housing", "calaim", "community-supports", "health-net", "positive"],
  },
  {
    id: "blue-shield-ma-training-scholarships-fhcsd",
    date: "2026-01-15",
    headline: {
      en: "Blue Shield Sponsors $80K in MA Training Scholarships at Family Health Centers of San Diego",
      es: "Blue Shield Patrocina $80K en Becas de Formación de Asistentes Médicos en Family Health Centers de San Diego",
    },
    summary: {
      en: "Blue Shield of California Promise Health Plan invested $80,000 in the Laura Rodriguez Medical Assistant Institute (LRMAI) at Family Health Centers of San Diego — one of California's largest FQHCs. The program supports full-time and part-time MA training tracks totaling 710 hours. This represents a direct FQHC workforce pipeline investment by a managed care plan, a model that could be replicated by other MCPs statewide.",
      es: "Blue Shield of California Promise Health Plan invirtió $80,000 en el Instituto de Asistentes Médicos Laura Rodríguez (LRMAI) en Family Health Centers de San Diego. El programa apoya formación de MA de tiempo completo y parcial totalizando 710 horas.",
    },
    category: "workforce",
    type: "news",
    impactLevel: "medium",
    sourceUrl: "https://www.prnewswire.com/news-releases/blue-shield-of-california-promise-health-plan-sponsors-80-000-in-medical-assistant-training-scholarships-in-san-diego-county-302643004.html",
    sourceOrg: "Blue Shield of California / FHCSD",
    region: "San Diego County",
    affectedOrgs: ["Family Health Centers of San Diego"],
    affectedOrgSlugs: ["family-health-centers-of-san-diego"],
    tags: ["workforce-pipeline", "ma-training", "blue-shield", "scholarship", "positive"],
  },

  /* ------------------------------------------------------------------ */
  /*  Compliance & Risk items (added 2026-03-10)                         */
  /* ------------------------------------------------------------------ */
  {
    id: "hrsa-osv-enforcement-trend-fy2026",
    date: "2026-03-05",
    headline: {
      en: "HRSA Accelerates Operational Site Visits: 30% More FQHCs Audited in FY2026",
      es: "HRSA Acelera Visitas Operativas: 30% Más FQHCs Auditados en AF2026",
    },
    summary: {
      en: "HRSA's Bureau of Primary Health Care has increased OSV frequency, with 30% more site visits scheduled in FY2026 compared to FY2025. Focus areas include governance documentation (42 CFR 330.304), sliding fee compliance, and clinical quality reporting. FQHCs with incomplete board policies or missing conflict-of-interest disclosures face progressive compliance actions including conditions of award and potential scope reductions.",
      es: "La Oficina de Atención Primaria de HRSA ha aumentado la frecuencia de OSV, con 30% más visitas programadas en AF2026 vs AF2025. Áreas de enfoque incluyen documentación de gobernanza (42 CFR 330.304), cumplimiento de tarifa escalonada y reportes de calidad clínica.",
    },
    category: "compliance",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://bphc.hrsa.gov/compliance/operational-site-visit",
    sourceOrg: "HRSA Bureau of Primary Health Care",
    region: "Federal",
    tags: ["hrsa", "osv", "audit", "governance", "compliance", "enforcement"],
  },
  {
    id: "ocr-hipaa-breach-settlement-march-2026",
    date: "2026-03-01",
    headline: {
      en: "OCR Settles $1.5M HIPAA Breach Case with Community Health Network",
      es: "OCR Resuelve Caso de Violación HIPAA de $1.5M con Red de Salud Comunitaria",
    },
    summary: {
      en: "HHS Office for Civil Rights reached a $1.5M settlement with a multi-site community health center for a breach affecting 28,000 patient records. Root cause: unencrypted email containing PHI sent to third-party vendor without a current Business Associate Agreement. Settlement requires 3-year corrective action plan including annual risk assessments, workforce training, and BAA remediation. Pattern consistent with FQHCs that lack formalized HIPAA compliance programs.",
      es: "La Oficina de Derechos Civiles de HHS llegó a un acuerdo de $1.5M con un centro de salud comunitario multi-sitio por una violación que afectó 28,000 registros de pacientes. Causa raíz: correo electrónico sin encriptar con PHI enviado a un proveedor sin un Acuerdo de Asociado Comercial vigente.",
    },
    category: "compliance",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/agreements/index.html",
    sourceOrg: "HHS Office for Civil Rights",
    region: "Federal",
    tags: ["hipaa", "breach", "ocr", "settlement", "baa", "enforcement", "encryption"],
  },
  {
    id: "oig-false-claims-fqhc-billing-2026",
    date: "2026-02-20",
    headline: {
      en: "OIG Reports $4.7B in Healthcare Fraud Recoveries — FQHCs Face Increased Billing Scrutiny",
      es: "OIG Reporta $4.7B en Recuperaciones por Fraude de Salud — FQHCs Enfrentan Mayor Escrutinio de Facturación",
    },
    summary: {
      en: "The HHS Office of Inspector General recovered $4.7B in healthcare fraud in FY2025, with community health centers facing increased scrutiny on PPS billing practices. Key risk areas: same-day billing errors, upcoding visit complexity, and inadequate documentation for ECM/CCM services. OIG recommends FQHCs implement internal billing audits, provider documentation training, and automated coding compliance checks. Three California FQHCs received subpoenas in Q4 2025.",
      es: "La Oficina del Inspector General de HHS recuperó $4.7B en fraude de salud en AF2025, con centros de salud comunitarios enfrentando mayor escrutinio en prácticas de facturación PPS. Áreas clave de riesgo: errores de facturación del mismo día, sobre-codificación de complejidad de visitas y documentación inadecuada para servicios ECM/CCM.",
    },
    category: "compliance",
    type: "news",
    impactLevel: "critical",
    sourceUrl: "https://oig.hhs.gov/reports-and-publications/featured-topics/fraud/",
    sourceOrg: "HHS Office of Inspector General",
    region: "Federal",
    tags: ["oig", "false-claims", "billing-fraud", "pps", "ecm", "documentation", "enforcement"],
  },
  {
    id: "340b-audit-wave-contract-pharmacy-2026",
    date: "2026-02-15",
    headline: {
      en: "340B Contract Pharmacy Audits Double: HRSA Targets Compliance Gaps at FQHCs",
      es: "Auditorías de Farmacias de Contrato 340B Se Duplican: HRSA Apunta a Brechas de Cumplimiento en FQHCs",
    },
    summary: {
      en: "HRSA has doubled 340B program audits targeting contract pharmacy arrangements, with 47 covered entities under review in Q1 2026. Common violations include duplicate discounts, inadequate patient eligibility verification, and missing contract pharmacy agreements. FQHCs operating 340B programs must demonstrate real-time eligibility checks, split-billing compliance, and complete audit trails for every 340B transaction. Non-compliance can result in program repayment and suspension.",
      es: "HRSA ha duplicado las auditorías del programa 340B dirigidas a arreglos de farmacias de contrato, con 47 entidades cubiertas bajo revisión en Q1 2026. Violaciones comunes incluyen descuentos duplicados, verificación inadecuada de elegibilidad de pacientes y acuerdos de farmacias de contrato faltantes.",
    },
    category: "compliance",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.hrsa.gov/opa/program-integrity",
    sourceOrg: "HRSA Office of Pharmacy Affairs",
    region: "Federal",
    tags: ["340b", "pharmacy", "audit", "contract-pharmacy", "compliance", "enforcement"],
  },
  {
    id: "dhcs-fqhc-billing-compliance-review-2026",
    date: "2026-02-10",
    headline: {
      en: "California DHCS Launches FQHC Billing Compliance Review Initiative",
      es: "DHCS de California Lanza Iniciativa de Revisión de Cumplimiento de Facturación de FQHCs",
    },
    summary: {
      en: "The California Department of Health Care Services announced a targeted billing compliance review for 50 FQHCs in 2026, focusing on PPS encounter documentation, Medi-Cal managed care billing accuracy, and UIS patient service tracking ahead of the July 2026 PPS elimination for UIS patients. FQHCs must ensure documentation standards meet both HRSA and DHCS requirements. Reviews will examine 24 months of billing data with particular attention to ECM and Community Supports claims.",
      es: "El Departamento de Servicios de Atención Médica de California anunció una revisión de cumplimiento de facturación dirigida para 50 FQHCs en 2026, enfocada en documentación de encuentros PPS, precisión de facturación de Medi-Cal y seguimiento de servicios a pacientes UIS antes de la eliminación del PPS para pacientes UIS en julio 2026.",
    },
    category: "compliance",
    type: "news",
    impactLevel: "critical",
    sourceUrl: "https://www.dhcs.ca.gov/provgovpart/Pages/FQHC-Information.aspx",
    sourceOrg: "California DHCS",
    region: "California",
    tags: ["dhcs", "billing", "medi-cal", "pps", "uis", "compliance", "audit", "ecm"],
  },

  /* ============================================================== */
  /*  MARCH 10, 2026 — DAILY UPDATE #16                             */
  /* ============================================================== */
  {
    id: "hr1-rural-health-transformation-fund-50b",
    date: "2026-03-10",
    headline: {
      en: "H.R. 1 Creates $50B Rural Health Transformation Fund — Silver Lining for Rural FQHCs",
      es: "H.R. 1 Crea Fondo de Transformación de Salud Rural de $50B — Oportunidad para FQHCs Rurales",
    },
    summary: {
      en: "Buried within H.R. 1's massive Medicaid cuts is a $50 billion Rural Health Transformation Program ($10B/year for 5 years, FY 2026–2030) funding grants for rural FQHCs, hospitals, and behavioral health providers. California's likely allocation: ~$500M/year via competitive grants. Eligible applicants include FQHCs in rural shortage areas — targeting North State, North Coast, and Central Valley regions. While it does not offset the far larger Medicaid losses, it represents the first new federal FQHC investment channel since the ACA.",
      es: "Dentro de los recortes masivos de Medicaid de H.R. 1 hay un Programa de Transformación de Salud Rural de $50 mil millones ($10B/año por 5 años, FY 2026–2030) para FQHCs rurales, hospitales y proveedores de salud conductual. Asignación probable para California: ~$500M/año mediante subvenciones competitivas. No compensa las pérdidas de Medicaid, pero es el primer nuevo canal de inversión federal en FQHCs desde el ACA.",
    },
    category: "funding",
    type: "news",
    impactLevel: "medium",
    sourceUrl: "https://www.csh.org/2025/08/h-r-1-reshapes-medicaid-what-housing-providers-need-to-know-now/",
    sourceOrg: "CSH",
    region: "Federal",
    tags: ["rural-health", "hr1", "grants", "north-state", "north-coast", "central-valley", "behavioral-health"],
  },
  {
    id: "ca-fqhc-apm-implementation-jan-2026",
    date: "2026-01-01",
    headline: {
      en: "California FQHC Alternative Payment Model Goes Live — Global Payments Replace Fee-for-Service",
      es: "Modelo de Pago Alternativo para FQHCs de California Entra en Vigor — Pagos Globales Reemplazan Pago por Servicio",
    },
    summary: {
      en: "California's FQHC Alternative Payment Model (APM) launched January 1, 2026, moving participating FQHCs from fee-for-service to prospective global payments with care coordination incentives. The APM provides revenue stability by decoupling payment from visit volume — critical as Medicaid cuts reduce patient panels. However, implementation requires sophisticated cost accounting, care delivery restructuring, and population health infrastructure. DHCS is running an annual enrollment cycle; FQHCs can opt in during open periods.",
      es: "El Modelo de Pago Alternativo (APM) para FQHCs de California se lanzó el 1 de enero de 2026, moviendo a FQHCs participantes de pago por servicio a pagos globales prospectivos con incentivos de coordinación de atención. Proporciona estabilidad de ingresos al desacoplar el pago del volumen de visitas. Requiere contabilidad de costos sofisticada y reestructuración de entrega de atención.",
    },
    category: "change-management",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.chcs.org/resource/implementation-guide-for-the-california-federally-qualified-health-center-alternative-payment-model/",
    sourceOrg: "CHCS",
    region: "California",
    tags: ["apm", "global-payment", "value-based-care", "revenue-model", "dhcs", "care-coordination"],
  },
  {
    id: "glenn-county-hospital-reopening-2026",
    date: "2026-02-28",
    headline: {
      en: "Glenn County's Only Hospital Clears Federal Hurdle to Reopen — Rural Health Resilience Signal",
      es: "El Único Hospital del Condado de Glenn Supera Obstáculo Federal para Reabrir — Señal de Resiliencia Rural",
    },
    summary: {
      en: "Glenn County's only hospital cleared a federal CMS licensing hurdle needed to reopen, though it still requires millions in additional funding. The rural Central Valley county lost its sole hospital in 2023, forcing residents to travel 30+ miles for emergency care. The reopening effort — led by the Glenn Medical Center Foundation — demonstrates community investment in rural healthcare infrastructure even amid federal funding cuts. Glenn County is served by Ampla Health (the region's primary FQHC).",
      es: "El único hospital del condado de Glenn superó un obstáculo federal de licencias del CMS necesario para reabrir, aunque aún necesita millones en financiamiento adicional. El condado rural del Valle Central perdió su único hospital en 2023, obligando a los residentes a viajar más de 30 millas para atención de emergencia.",
    },
    category: "patient-story",
    type: "news",
    impactLevel: "low",
    sourceUrl: "https://calmatters.org/health/2026/02/glenn-county-comeback-soria-funding/",
    sourceOrg: "CalMatters",
    region: "Glenn County",
    tags: ["rural", "hospital-reopening", "north-state", "central-valley", "cms", "resilience"],
  },
  {
    id: "ca-budget-222b-medi-cal-2026-27",
    date: "2026-03-10",
    headline: {
      en: "California Proposes $222.4B Medi-Cal Budget — Must Absorb $1.1B+ in Federal Medicaid Shortfalls",
      es: "California Propone Presupuesto de $222.4B para Medi-Cal — Debe Absorber $1.1B+ en Recortes Federales",
    },
    summary: {
      en: "California's proposed 2026–27 budget includes $222.4 billion for Medi-Cal, requiring the state to absorb over $1.1 billion in federal Medicaid funding losses from H.R. 1. The Legislative Analyst's Office warns that federal FMAP sunsetting, enrollment verification requirements, and UIS benefit restrictions compound to create a multi-billion-dollar structural gap by 2028. Budget negotiations will determine whether FQHC supplemental payments, ECM funding, and community health worker billing survive or face further cuts.",
      es: "El presupuesto propuesto de California 2026–27 incluye $222.4 mil millones para Medi-Cal, requiriendo que el estado absorba más de $1.1 mil millones en pérdidas de financiamiento federal de Medicaid por H.R. 1. El LAO advierte que la expiración del FMAP, requisitos de verificación de inscripción y restricciones de beneficios UIS crean una brecha estructural multimillonaria para 2028.",
    },
    category: "funding",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://lao.ca.gov/Publications/Report/5075",
    sourceOrg: "CA Legislative Analyst's Office",
    region: "California",
    tags: ["state-budget", "medi-cal", "fmap", "structural-deficit", "ecm", "chw-billing"],
  },
];

/* ------------------------------------------------------------------ */
/*  Helper functions                                                    */
/* ------------------------------------------------------------------ */

/** Get items sorted by date (newest first), optionally filtered */
export function getIntelItems(opts?: {
  category?: IntelCategory;
  impactLevel?: ImpactLevel;
  region?: string;
  limit?: number;
}): IntelItem[] {
  let items = [...INTEL_ITEMS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (opts?.category) {
    items = items.filter((i) => i.category === opts.category);
  }
  if (opts?.impactLevel) {
    items = items.filter((i) => i.impactLevel === opts.impactLevel);
  }
  if (opts?.region) {
    items = items.filter(
      (i) => i.region.toLowerCase().includes(opts.region!.toLowerCase())
    );
  }
  if (opts?.limit) {
    items = items.slice(0, opts.limit);
  }

  return items;
}

/** Get critical/high items for the breaking intel section */
export function getBreakingIntel(limit = 5): IntelItem[] {
  return getIntelItems({ limit }).filter(
    (i) => i.impactLevel === "critical" || i.impactLevel === "high"
  ).slice(0, limit);
}

/** Get items related to undocumented access */
export function getUndocumentedAccessItems(): IntelItem[] {
  return getIntelItems({ category: "undocumented-access" });
}

/** Get change management strategy items */
export function getChangeManagementItems(): IntelItem[] {
  return getIntelItems({ category: "change-management" });
}

/** Get only news items (excludes deadlines and strategy) */
export function getNewsItems(limit?: number): IntelItem[] {
  const items = getIntelItems().filter((i) => i.type === "news");
  return limit ? items.slice(0, limit) : items;
}

/** Get deadline/timeline items (policy effective dates) */
export function getDeadlineItems(): IntelItem[] {
  return getIntelItems().filter((i) => i.type === "deadline");
}

/** Get strategy/tactics items (actionable guidance) */
export function getStrategyItems(): IntelItem[] {
  return getIntelItems().filter((i) => i.type === "strategy");
}

/** Get all unique source URLs */
export function getIntelSources(): { org: string; url: string }[] {
  const seen = new Set<string>();
  return INTEL_ITEMS.filter((i) => {
    if (seen.has(i.sourceUrl)) return false;
    seen.add(i.sourceUrl);
    return true;
  }).map((i) => ({ org: i.sourceOrg, url: i.sourceUrl }));
}

/** Get intel items for a specific FQHC by directory slug */
export function getIntelForFQHC(slug: string): IntelItem[] {
  return [...INTEL_ITEMS]
    .filter((i) => i.affectedOrgSlugs?.includes(slug))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Get compliance & risk items */
export function getComplianceItems(): IntelItem[] {
  return getIntelItems({ category: "compliance" });
}

/** Get counts by category */
export function getIntelCounts(): Record<IntelCategory, number> & {
  total: number;
} {
  const counts = { total: INTEL_ITEMS.length } as Record<
    IntelCategory,
    number
  > & { total: number };
  for (const cat of INTEL_CATEGORIES) {
    counts[cat.id] = INTEL_ITEMS.filter((i) => i.category === cat.id).length;
  }
  return counts;
}
