// fqhc-news-intel.ts
// Curated intelligence feed for FQHC executives
// Updated daily via /daily-update pipeline
// Every item has a primary source URL — no unsourced claims
// Last updated: 2026-03-06 (jobs report day — BLS Employment Situation February 2026)

/** Exported for display on pages — updated by /daily-update pipeline */
export const INTEL_LAST_UPDATED = "2026-04-14";

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
  | "labor"
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
  /** True if the source is behind a paywall — signals our summary IS the value */
  paywalled?: boolean;
  /** Structured key takeaways — shown as bullet list in expanded view */
  keyTakeaways?: { en: string; es: string }[];
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
  { id: "labor", en: "Labor & Unions", es: "Trabajo y Sindicatos", icon: "Scale" },
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
  /*  APRIL 8, 2026 — DAILY UPDATE #30 + UNION DEEP DIVE            */
  /* ============================================================== */
  {
    id: "innercare-nlrb-forced-recognition-hearing-march-2026",
    date: "2026-03-17",
    headline: {
      en: "NLRB Seeks Forced Union Recognition at Innercare (Clinicas de Salud del Pueblo) — Hearing Began March 17",
      es: "NLRB Busca Reconocimiento Sindical Forzado en Innercare (Clínicas de Salud del Pueblo) — Audiencia Comenzó el 17 de Marzo",
    },
    summary: {
      en: "An NLRB administrative law judge hearing began March 17 in San Diego on 30+ unfair labor practice charges against Innercare (formerly Clinicas de Salud del Pueblo) in Imperial County. Despite workers voting 214-132 against SEIU-UHW in July 2024, the NLRB found 'egregious violations' including firing 11 workers and is seeking a bargaining order — forced recognition without a new election. This rare remedy signals the most serious NLRB enforcement action against a California FQHC in recent memory. CEO Yvonne Bell is personally named.",
      es: "Una audiencia del juez administrativo del NLRB comenzó el 17 de marzo en San Diego sobre 30+ cargos de prácticas laborales injustas contra Innercare en el Condado Imperial. El NLRB busca reconocimiento sindical forzado — un remedio raro que señala la acción más seria contra un FQHC de California.",
    },
    category: "workforce" as IntelCategory,
    impactLevel: "high" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://www.thedesertreview.com/business/nlrb-complaint-against-innercare-sets-stage-for-2026-hearing-as-organization-denies-allegations/article_c29d43e5-c7fe-4095-8749-f7f4839010f8.html",
    sourceOrg: "Desert Review / NLRB",
    region: "Inland Empire",
    affectedOrgs: ["Innercare (Clinicas de Salud del Pueblo)"],
    affectedOrgSlugs: ["clinicas-de-salud-del-pueblo"],
    tags: ["NLRB", "SEIU-UHW", "union", "forced-recognition", "unfair-labor-practices", "Imperial-County"],
  },
  {
    id: "imperial-beach-clinic-nuhw-physicians-organize-jan-2026",
    date: "2026-01-27",
    headline: {
      en: "Imperial Beach Community Clinic Physicians Vote to Join NUHW — Rare Provider-Led Organizing at FQHC",
      es: "Médicos de Clínica Comunitaria de Imperial Beach Votan para Unirse a NUHW — Organización Liderada por Proveedores Rara en FQHC",
    },
    summary: {
      en: "Physicians, therapists, and nurse practitioners at Imperial Beach Community Clinic voted to join NUHW in January 2026. This is a rare provider-led organizing effort at an FQHC, driven by constant CEO/executive turnover, burnout from understaffing, and management retaliation against providers who wrote a public op-ed. The win signals that FQHC labor organizing is expanding beyond support staff to clinical providers.",
      es: "Médicos, terapeutas y enfermeros practicantes de la Clínica Comunitaria de Imperial Beach votaron para unirse a NUHW en enero de 2026. Una organización liderada por proveedores rara en un FQHC, impulsada por rotación ejecutiva y agotamiento por falta de personal.",
    },
    category: "workforce" as IntelCategory,
    impactLevel: "medium" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://home.nuhw.org/2026/01/27/workers-at-imperial-beach-community-clinic-vote-to-join-nuhw/",
    sourceOrg: "NUHW",
    region: "San Diego",
    affectedOrgs: ["Imperial Beach Community Clinic"],
    affectedOrgSlugs: [],
    tags: ["NUHW", "union", "physicians", "provider-organizing", "San-Diego", "burnout"],
  },
  {
    id: "seiu-fqhc-90-spend-brg-1-7b-impact-study",
    date: "2026-03-15",
    headline: {
      en: "Berkeley Research Group: SEIU 90% Spending Mandate Would Redirect $1.7B from FQHCs, Push Two-Thirds into Deficits",
      es: "Berkeley Research Group: Mandato de 90% de Gasto del SEIU Redirigiría $1.7B de FQHCs, Empujaría a Dos Tercios a Déficits",
    },
    summary: {
      en: "A Berkeley Research Group study commissioned by Protect Patients CA finds the SEIU-UHW 90% mission-spend ballot measure would redirect $1.7 billion from community health centers and push two-thirds of state health centers into operating deficits. The 90% threshold would exclude spending on nurse/physician managers, translation services, enrollment navigators, transportation, community outreach, and new clinic construction. CPCA, CCALAC, CMA, AltaMed, and FHCSD are top funders of the opposition. SEIU counters that FQHCs like United Health Centers had a $25M surplus on $180M revenue in 2023.",
      es: "Un estudio del Berkeley Research Group encuentra que la medida electoral del 90% del SEIU redirigiría $1.7 mil millones de centros de salud y empujaría a dos tercios a déficits operativos. La oposición incluye CPCA, CCALAC, CMA, AltaMed y FHCSD.",
    },
    category: "workforce" as IntelCategory,
    impactLevel: "critical" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://protectpatientsca.com/faq/",
    sourceOrg: "Berkeley Research Group / Protect Patients CA",
    region: "California",
    affectedOrgs: ["AltaMed Health Services", "Family Health Centers of San Diego", "United Health Centers"],
    affectedOrgSlugs: ["altamed-health-services", "family-health-centers-of-san-diego", "united-health-centers"],
    tags: ["SEIU-UHW", "90-percent", "BRG-study", "$1.7B", "Protect-Patients", "operating-deficits", "ballot-initiative"],
  },
  {
    id: "kff-california-work-requirements-3b-deficit-1-4m",
    date: "2026-04-06",
    headline: {
      en: "KFF: California Faces $3B Deficit While Implementing Work Requirements That Could Disenroll 1.4 Million",
      es: "KFF: California Enfrenta Déficit de $3B Mientras Implementa Requisitos Laborales que Podrían Desafiliar a 1.4 Millones",
    },
    summary: {
      en: "KFF publishes the most detailed analysis of California's work requirements implementation challenges. Key data: FY2027 deficit of $3B (growing to $22B by FY2028), $1.1B Medicaid cost from reconciliation law alone, up to 1.4M projected disenrollments. Only 63% of affected adults already comply. State allocated just $4M for navigators across 19 languages. HHS interim final rule due June 2026 leaves minimal prep time before January 2027 implementation. For FQHCs: disenrolled patients become uninsured sliding-fee-scale patients — a massive revenue hit.",
      es: "KFF publica el análisis más detallado de los desafíos de implementación de requisitos laborales en California. Datos clave: déficit de $3B en FY2027, hasta 1.4M desinscripciones proyectadas. Solo 63% de adultos afectados ya cumplen. Solo $4M asignados para navegadores en 19 idiomas.",
    },
    category: "legislation" as IntelCategory,
    impactLevel: "critical" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://www.kff.org/medicaid/a-closer-look-at-californias-plans-to-implement-work-requirements-while-facing-major-budget-shortfalls-amid-cuts-in-federal-medicaid-funding/",
    sourceOrg: "KFF",
    region: "California",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["KFF", "work-requirements", "$3B-deficit", "1.4M-disenrollments", "navigators", "January-2027"],
  },
  {
    id: "hrsa-restructuring-administration-healthy-america",
    date: "2026-04-01",
    headline: {
      en: "HRSA Being Absorbed into New 'Administration for a Healthy America' — 25% of Staff Already Departed",
      es: "HRSA Siendo Absorbida en Nueva 'Administración para una América Saludable' — 25% del Personal Ya Se Fue",
    },
    summary: {
      en: "HRSA is being merged into the new Administration for a Healthy America (AHA) alongside SAMHSA, ATSDR, and NIOSH. Approximately 700+ employees (25% of staff) have departed since February, including grant managers, auditors, and compliance analysts. The FY2026 budget proposes eliminating HRSA as a standalone agency. This directly impacts OSV scheduling, 340B audits, and Health Center Program compliance oversight. FQHCs may face delayed operational site visits, slower conditions-of-award processing, and reduced technical assistance.",
      es: "HRSA está siendo fusionada en la nueva Administración para una América Saludable junto con SAMHSA y NIOSH. ~700+ empleados (25%) se han ido desde febrero, incluyendo auditores y analistas de cumplimiento. Esto impacta directamente las visitas de sitio, auditorías 340B y supervisión del programa de centros de salud.",
    },
    category: "compliance" as IntelCategory,
    impactLevel: "critical" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://www.fiercehealthcare.com/regulatory/hrsa-restructuring-administration-healthy-america-2026",
    sourceOrg: "Fierce Healthcare",
    region: "Federal",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["HRSA", "restructuring", "AHA", "compliance", "340B", "OSV", "grant-oversight"],
  },
  {
    id: "public-citizen-83-ca-hospitals-at-risk-closure",
    date: "2026-04-03",
    headline: {
      en: "Public Citizen: 446 US Hospitals at Risk of Closure from Medicaid Cuts — California Has Most at Risk in the Nation",
      es: "Public Citizen: 446 Hospitales de EE.UU. en Riesgo de Cierre por Recortes de Medicaid — California Tiene Más en Riesgo en el País",
    },
    summary: {
      en: "A Public Citizen analysis of financial data from 95% of US hospitals identifies 446 hospitals at high risk of closure or service cuts from H.R. 1 Medicaid reductions (~$1T over a decade). At-risk hospitals derive 20%+ revenue from Medicaid and have been losing money. California has the most at-risk hospitals of any state. 60% of at-risk facilities are in urban areas. These hospitals serve as referral partners for FQHCs — their closure would eliminate specialist access and collapse the safety net referral network.",
      es: "Un análisis de Public Citizen identifica 446 hospitales en alto riesgo de cierre por recortes de Medicaid de H.R. 1. California tiene más hospitales en riesgo que cualquier otro estado. Su cierre eliminaría acceso a especialistas y colapsaría la red de referencia de seguridad.",
    },
    category: "funding" as IntelCategory,
    impactLevel: "critical" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://www.usnews.com/news/health-news/articles/2026-04-01/hundreds-of-u-s-hospitals-at-risk-of-shutting-down-from-medicaid-cuts",
    sourceOrg: "US News / Public Citizen",
    region: "California",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["hospital-closures", "Public-Citizen", "H.R.-1", "referral-network", "patient-overflow", "safety-net"],
  },
  {
    id: "cwf-5-6m-chc-patients-work-requirements-32b",
    date: "2026-03-28",
    headline: {
      en: "Commonwealth Fund: 5.6 Million Health Center Patients Face Coverage Loss, $32B Revenue Impact Over 5 Years",
      es: "Commonwealth Fund: 5.6 Millones de Pacientes de Centros de Salud Enfrentan Pérdida de Cobertura, Impacto de $32B en 5 Años",
    },
    summary: {
      en: "The Commonwealth Fund projects 5.6 million community health center Medicaid patients in expansion states will lose coverage under H.R. 1 work requirements. Revenue losses could approach $32 billion over five years. More than half of CHCs already operate with negative margins, and 2 in 5 have 90 days or less cash on hand. This is the most comprehensive projection of the financial impact on FQHCs specifically.",
      es: "El Commonwealth Fund proyecta que 5.6 millones de pacientes de centros de salud en estados de expansión perderán cobertura bajo los requisitos laborales de H.R. 1. Las pérdidas de ingresos podrían alcanzar $32 mil millones en cinco años.",
    },
    category: "funding" as IntelCategory,
    impactLevel: "critical" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://www.commonwealthfund.org/publications/issue-briefs/2026/mar/community-health-centers-medicaid-work-requirements",
    sourceOrg: "Commonwealth Fund",
    region: "Federal",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["Commonwealth-Fund", "work-requirements", "5.6M-patients", "$32B", "revenue-loss", "cash-reserves"],
  },
  {
    id: "governing-work-requirements-squeeze-chcs-2026",
    date: "2026-04-06",
    headline: {
      en: "First Implementation Data: Work Requirements Squeezing Health Centers — Bluestem Health Faces $600K Loss, Vermont Clinic $3M",
      es: "Primeros Datos de Implementación: Requisitos Laborales Asfixian Centros de Salud — Bluestem Health Enfrenta Pérdida de $600K, Clínica de Vermont $3M",
    },
    summary: {
      en: "Governing.com reports the first real-world impact data from work requirements implementation. Bluestem Health in Nebraska faces $600K annual revenue loss. A Vermont clinic projects $3M in lost revenue. Health centers are legally required to serve all patients regardless of ability to pay, creating a financial death spiral: lost Medicaid revenue but increased uninsured demand. Of 33M national health center patients, approximately half are on Medicaid.",
      es: "Governing.com reporta los primeros datos reales del impacto de los requisitos laborales. Bluestem Health en Nebraska enfrenta pérdida anual de $600K. Una clínica de Vermont proyecta $3M en ingresos perdidos. Los centros de salud enfrentan una espiral financiera: pierden ingresos de Medicaid pero deben atender a más pacientes sin seguro.",
    },
    category: "funding" as IntelCategory,
    impactLevel: "high" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://www.governing.com/policy/medicaid-work-requirements-squeeze-community-health-centers",
    sourceOrg: "Governing.com",
    region: "Federal",
    affectedOrgs: ["Bluestem Health"],
    affectedOrgSlugs: [],
    tags: ["work-requirements", "implementation-data", "Bluestem", "Vermont", "revenue-loss", "uncompensated-care"],
  },
  {
    id: "california-233m-rural-health-transformation-award",
    date: "2026-03-28",
    headline: {
      en: "California Awards $233.6M for Rural Health Transformation — Telehealth, Workforce Pipelines, Cybersecurity for Rural FQHCs",
      es: "California Otorga $233.6M para Transformación de Salud Rural — Telesalud, Canales de Fuerza Laboral, Ciberseguridad para FQHCs Rurales",
    },
    summary: {
      en: "HCAI publishes the California Rural Health Transformation Plan with $233.6M in funding across three pillars: (1) Transformative care models including expanding e-consult and telehealth for rural FQHCs, (2) Workforce development with rural health pipeline programs and loan repayment supplements, (3) Technology including cybersecurity and data interoperability. FQHCs in rural counties could receive direct infrastructure support. The plan addresses the North State, North Coast, and Central Valley regions where FQHCs are most isolated.",
      es: "HCAI publica el Plan de Transformación de Salud Rural con $233.6M: telesalud, programas de fuerza laboral rural y ciberseguridad. Los FQHCs en condados rurales podrían recibir apoyo directo de infraestructura.",
    },
    category: "funding" as IntelCategory,
    impactLevel: "high" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://hcai.ca.gov/wp-content/uploads/2026/03/California-Rural-Health-Transformation-Program-Briefing-March-2026.pdf",
    sourceOrg: "HCAI / CSAC",
    region: "California",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["HCAI", "rural-health", "$233M", "telehealth", "workforce-pipeline", "cybersecurity", "North-State", "Central-Valley"],
  },
  {
    id: "ocr-part-2-enforcement-begins-february-2026",
    date: "2026-02-16",
    headline: {
      en: "OCR Begins Enforcing 42 CFR Part 2 for Substance Use Disorder Records — FQHCs with MAT/SUD Programs Must Comply",
      es: "OCR Comienza a Hacer Cumplir 42 CFR Parte 2 para Registros de Trastornos por Uso de Sustancias — FQHCs con Programas MAT/SUD Deben Cumplir",
    },
    summary: {
      en: "OCR has begun enforcement of the updated 42 CFR Part 2 regulations as of February 16, 2026. The updated rule aligns Part 2 with HIPAA but adds enhanced protections for substance use disorder treatment records. FQHCs operating MAT, SUD treatment, or behavioral health programs must ensure their consent forms, breach notification procedures, and information-sharing agreements comply with the new requirements. Non-compliance risks both OCR enforcement and patient trust erosion. Most CA FQHCs have behavioral health programs affected by this change.",
      es: "OCR comenzó a hacer cumplir las regulaciones actualizadas de 42 CFR Parte 2 desde el 16 de febrero de 2026. Los FQHCs con programas de MAT, tratamiento de SUD o salud conductual deben asegurar que sus formularios de consentimiento y procedimientos cumplan con los nuevos requisitos.",
    },
    category: "compliance" as IntelCategory,
    impactLevel: "high" as ImpactLevel,
    type: "deadline" as IntelType,
    sourceUrl: "https://www.hhs.gov/hipaa/for-professionals/regulatory-initiatives/part-2-final-rule/index.html",
    sourceOrg: "HHS / OCR",
    region: "Federal",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["42-CFR-Part-2", "SUD", "MAT", "OCR", "HIPAA", "behavioral-health", "enforcement"],
  },
  {
    id: "ca-billionaire-tax-act-100b-healthcare",
    date: "2026-04-04",
    headline: {
      en: "California Billionaire Tax Act Proposed: $100B Revenue Source Could Offset H.R. 1 Healthcare Cuts",
      es: "Propuesta de Ley de Impuesto a Multimillonarios de California: Fuente de $100B Podría Compensar Recortes de Salud de H.R. 1",
    },
    summary: {
      en: "A proposed California Billionaire Tax Act would generate up to $100B in state revenue, explicitly framed as a response to H.R. 1 stripping $100B from CA healthcare over 5 years. If enacted, this could be the largest single state-level funding source to offset federal Medicaid cuts. The proposal faces significant political opposition but represents the most ambitious state counteroffensive to federal cuts yet proposed.",
      es: "Una propuesta de Ley de Impuesto a Multimillonarios de California generaría hasta $100B en ingresos estatales, enmarcada como respuesta a H.R. 1. Si se promulga, sería la mayor fuente estatal de financiamiento para compensar los recortes federales de Medicaid.",
    },
    category: "legislation" as IntelCategory,
    impactLevel: "high" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://calmatters.org/politics/2026/04/california-billionaire-tax-healthcare/",
    sourceOrg: "CalMatters",
    region: "California",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["billionaire-tax", "$100B", "state-revenue", "H.R.-1", "offset", "legislation"],
  },
  {
    id: "altamed-data-breach-dec-2025",
    date: "2025-12-15",
    headline: {
      en: "AltaMed Data Breach Reported — Largest CA FQHC Confirms Patient Data Exposure",
      es: "Violación de Datos en AltaMed Reportada — El FQHC Más Grande de CA Confirma Exposición de Datos de Pacientes",
    },
    summary: {
      en: "AltaMed Health Services, California's largest FQHC serving 465,000+ patients across 60+ sites, confirmed a data breach discovered in December 2025 and reported in early 2026. Details on the scope and affected patient count are still emerging, but as the most prominent FQHC in the state, the breach underscores cybersecurity risks facing community health centers — particularly those with large digital footprints. AltaMed has been deploying Abridge AI scribes and expanding digital infrastructure, highlighting the tension between innovation and security.",
      es: "AltaMed Health Services, el FQHC más grande de California con 465,000+ pacientes, confirmó una violación de datos descubierta en diciembre de 2025. El incidente subraya los riesgos de ciberseguridad que enfrentan los centros de salud comunitarios.",
    },
    category: "compliance" as IntelCategory,
    impactLevel: "high" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://www.hipaajournal.com/altamed-health-services-data-breach/",
    sourceOrg: "HIPAA Journal",
    region: "Los Angeles",
    affectedOrgs: ["AltaMed Health Services"],
    affectedOrgSlugs: ["altamed-health-services"],
    tags: ["data-breach", "AltaMed", "cybersecurity", "patient-data", "HIPAA"],
  },
  {
    id: "contra-costa-307m-fqhc-revenue-loss-hr1",
    date: "2026-03-30",
    headline: {
      en: "Contra Costa County: $307M Revenue Loss, 93,000 Could Lose Medi-Cal Coverage Under H.R. 1",
      es: "Condado de Contra Costa: Pérdida de $307M en Ingresos, 93,000 Podrían Perder Cobertura Medi-Cal Bajo H.R. 1",
    },
    summary: {
      en: "A new analysis quantifies Contra Costa County's H.R. 1 exposure: $307M in revenue losses and 93,000 residents at risk of losing Medi-Cal coverage. This is among the most granular county-level impact assessments published to date. Contra Costa Health operates FQHCs directly and partners with community health centers throughout the county. The data provides a template for other Bay Area counties to model their own exposure.",
      es: "Un nuevo análisis cuantifica la exposición de H.R. 1 en el condado de Contra Costa: $307M en pérdidas de ingresos y 93,000 residentes en riesgo de perder cobertura Medi-Cal.",
    },
    category: "funding" as IntelCategory,
    impactLevel: "high" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://richmondside.org/2026/03/30/trump-medi-cal-cuts-contra-costa/",
    sourceOrg: "Richmondside",
    region: "Bay Area",
    affectedOrgs: ["Contra Costa Health Services"],
    affectedOrgSlugs: ["contra-costa-health-services"],
    tags: ["Contra-Costa", "Bay-Area", "$307M", "93K-coverage-loss", "H.R.-1", "county-impact"],
  },
  {
    id: "san-ysidro-social-prescribing-arts-pilot",
    date: "2026-04-01",
    headline: {
      en: "San Ysidro Health Launches Arts-Based Social Prescribing Pilot — 250 Youth Prescribed Art for Mental Health",
      es: "San Ysidro Health Lanza Programa Piloto de Prescripción Social de Artes — 250 Jóvenes Reciben Receta de Arte para Salud Mental",
    },
    summary: {
      en: "San Ysidro Health is piloting an innovative behavioral health model: 250 adolescents aged 12-25 with anxiety, depression, or social isolation receive 'arts prescriptions' through a partnership with Art Pharmacy. BH specialists prescribe arts/culture experiences from 115+ partner organizations (~200 venues) across San Diego. This represents a novel non-clinical intervention model for FQHC youth mental health. Funded with support from Catalyst of San Diego & Imperial Counties.",
      es: "San Ysidro Health está piloteando un modelo innovador: 250 adolescentes de 12-25 años con ansiedad o depresión reciben 'recetas de arte' a través de 115+ organizaciones asociadas en San Diego. Un modelo de intervención no clínica para la salud mental juvenil.",
    },
    category: "change-management" as IntelCategory,
    impactLevel: "medium" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://ktla.com/business/press-releases/ein-presswire/825932486/san-diego-collaborative-launches-social-prescribing-initiative-with-art-pharmacy/",
    sourceOrg: "KTLA / Art Pharmacy",
    region: "San Diego",
    affectedOrgs: ["San Ysidro Health"],
    affectedOrgSlugs: ["san-ysidro-health"],
    tags: ["social-prescribing", "arts", "youth-mental-health", "San-Ysidro", "behavioral-health", "innovation"],
  },
  {
    id: "seiu-uhw-ballot-signatures-submitted-april-2026",
    date: "2026-04-03",
    headline: {
      en: "SEIU-UHW Submits Ballot Signatures for 90% Patient Care Spending Mandate — CMA Opposes as 'Dangerous'",
      es: "SEIU-UHW Presenta Firmas de Iniciativa Electoral para Mandato de 90% de Gasto en Atención al Paciente — CMA Se Opone como 'Peligrosa'",
    },
    summary: {
      en: "SEIU-UHW submitted ballot signatures for two California initiatives: one capping executive pay at healthcare companies and another requiring community health clinics to spend 90% of revenue on patient care. CMA calls the clinic measure 'dangerous' and has formed the 'Protect Patients' opposition coalition. The June 25 signature verification deadline is approaching. If qualified, FQHCs would face mandatory spending floors that could restrict reserves, capital investment, and administrative capacity during the H.R. 1 financial crisis.",
      es: "SEIU-UHW presentó firmas para dos iniciativas electorales: una para limitar salarios ejecutivos y otra para requerir que clínicas gasten 90% de ingresos en atención al paciente. CMA se opone y formó la coalición 'Protect Patients'. La fecha límite de verificación es el 25 de junio.",
    },
    category: "legislation" as IntelCategory,
    impactLevel: "high" as ImpactLevel,
    type: "deadline" as IntelType,
    sourceUrl: "https://news.ballotpedia.org/2026/04/03/seiu-uhw-submits-signatures-for-california-ballot-initiatives-capping-executive-pay-and-requiring-clinics-to-spend-90-on-patient-care/",
    sourceOrg: "Ballotpedia / CMA",
    region: "California",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["SEIU-UHW", "ballot-initiative", "90%-spending", "CMA", "Protect-Patients", "executive-pay", "June-25-deadline"],
  },
  {
    id: "uc-merced-chw-trust-gap-sjv-study",
    date: "2026-03-20",
    headline: {
      en: "UC Merced Study: Power Dynamics and Rushed Encounters Destroy Patient Trust in San Joaquin Valley Health Centers",
      es: "Estudio de UC Merced: Dinámicas de Poder y Encuentros Apresurados Destruyen la Confianza del Paciente en Centros de Salud del Valle de San Joaquín",
    },
    summary: {
      en: "A UC Merced Center for Health Equity study across 3 Central Valley health centers (8 counties) with 33 health professionals, 39 CHWs, and 403 patient surveys found that power dynamics and rushed clinical encounters destroy patient trust — while culturally respectful, language-concordant care builds it. As FQHCs face staffing cuts from H.R. 1, the risk is that remaining staff will have even less time per patient, accelerating the trust gap. Primary-source evidence that CHW investment is a revenue strategy, not just a cost.",
      es: "Un estudio de UC Merced en 3 centros de salud del Valle Central con 403 encuestas de pacientes encontró que las dinámicas de poder y los encuentros apresurados destruyen la confianza del paciente. La inversión en CHWs es una estrategia de ingresos, no solo un costo.",
    },
    category: "workforce" as IntelCategory,
    impactLevel: "medium" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://news.ucmerced.edu/news/2026/uc-merced%E2%80%99s-center-health-equity-convenes-partners-address-patient-trust-gap-san-joaquin",
    sourceOrg: "UC Merced Center for Health Equity",
    region: "Central Valley",
    affectedOrgs: ["Golden Valley Health Centers", "Community Medical Centers"],
    affectedOrgSlugs: ["golden-valley-health-centers", "community-medical-centers"],
    tags: ["UC-Merced", "CHW", "patient-trust", "San-Joaquin-Valley", "cultural-concordance", "workforce-strategy"],
  },

  /* ============================================================== */
  /*  APRIL 1, 2026 — DAILY UPDATE #29                              */
  /* ============================================================== */
  {
    id: "lao-county-staffing-gap-hr1-administrative-churn",
    date: "2026-03-05",
    headline: {
      en: "LAO: Counties Need 2,400+ New Eligibility Workers for H.R. 1 — Zero Funded, Creating Second Disenrollment Pathway",
      es: "LAO: Condados Necesitan 2,400+ Nuevos Trabajadores de Elegibilidad para H.R. 1 — Sin Financiamiento, Creando Segunda Vía de Desinscripción",
    },
    summary: {
      en: "The CA Legislative Analyst's Office details the massive staffing gap counties face implementing H.R. 1. Counties estimate needing 2,000+ additional Medi-Cal eligibility workers and 400+ CalFresh workers statewide. The Governor's budget proposes $2.4B for Medi-Cal county administration but includes zero funding for new positions. Starting October 2026, H.R. 1 also cuts federal CalFresh administrative cost share from 50% to 25%. The CWDA warns of 'longer application processing times' and heightened churn where eligible people temporarily lose benefits due to processing backlogs. For FQHCs: patients will lose coverage through administrative delays — not just work requirements — a second disenrollment vector driving uncompensated care.",
      es: "La LAO detalla la brecha masiva de personal que enfrentan los condados para implementar H.R. 1. Se necesitan 2,000+ nuevos trabajadores de elegibilidad de Medi-Cal pero no hay financiamiento. Pacientes perderán cobertura por retrasos administrativos — no solo por requisitos laborales — creando más atención no compensada para FQHCs.",
    },
    category: "legislation" as IntelCategory,
    impactLevel: "high" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://lao.ca.gov/Publications/Report/5149",
    sourceOrg: "CA Legislative Analyst's Office / CWDA",
    region: "California",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["LAO", "eligibility-workers", "administrative-churn", "H.R.-1", "county-administration", "disenrollment"],
  },
  {
    id: "fresno-county-69-295m-deficit-ground-zero-hr1",
    date: "2026-03-31",
    headline: {
      en: "Fresno County Projects $69M-$295M Deficit from H.R. 1 — 'Ground Zero' for Medicaid Cuts",
      es: "Condado de Fresno Proyecta Déficit de $69M-$295M por H.R. 1 — 'Epicentro' de los Recortes de Medicaid",
    },
    summary: {
      en: "Fresno County projects a $69M-$295M budget deficit from H.R. 1 cuts. Public Health Director Joe Prado estimates 11,000-30,000 residents will be forced to seek county indigent care at a cost of $41M-$241M — a line item that has never existed in the county budget. CalFresh loses $7.5M. Department heads ordered to cut 5%. County CAO Paul Nerland called Fresno County 'ground zero for the impacts of H.R. 1.' The county is joining CSAC in requesting $1.9B in state relief. The West Fresno Family Resource Center's Health Disparities Program ended due to a canceled $300K federal grant — 7 CHWs laid off.",
      es: "El condado de Fresno proyecta un déficit presupuestario de $69M-$295M por los recortes de H.R. 1. Se estima que 11,000-30,000 residentes necesitarán atención de indigencia del condado a un costo de $41M-$241M. Fresno es el 'epicentro' de los impactos de H.R. 1.",
    },
    category: "funding" as IntelCategory,
    impactLevel: "critical" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://fresnoland.org/2026/03/31/fresno-countys-budget-deficit/",
    sourceOrg: "Fresnoland / GV Wire",
    region: "Central Valley",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["Fresno", "Central-Valley", "deficit", "H.R.-1", "indigent-care", "ground-zero", "CSAC"],
  },
  {
    id: "ab-2161-block-work-requirements-undocumented-state-funded",
    date: "2026-03-09",
    headline: {
      en: "AB 2161: Bill to Block Work Requirements for State-Funded Undocumented Medi-Cal Coverage",
      es: "AB 2161: Proyecto de Ley para Bloquear Requisitos Laborales en Cobertura Medi-Cal Estatal para Indocumentados",
    },
    summary: {
      en: "Oakland Democrat Mia Bonta introduced AB 2161, which would prohibit California from imposing federal work requirements on individuals whose Medi-Cal coverage is entirely state-funded — including undocumented immigrants. This is separate from SB 1422 (Durazo's bill to restore full Medi-Cal eligibility). Both face uncertain prospects given the state's budget deficit. If passed, AB 2161 would protect ~1.5M undocumented Californians whose coverage comes from state general funds, not federal Medicaid matching.",
      es: "La demócrata de Oakland Mia Bonta presentó AB 2161, que prohibiría a California imponer requisitos laborales federales a personas cuya cobertura Medi-Cal es enteramente estatal — incluyendo inmigrantes indocumentados. Protegería a ~1.5M californianos indocumentados.",
    },
    category: "legislation" as IntelCategory,
    impactLevel: "medium" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://calmatters.org/health/2026/03/durazo-reverse-medical-undocumented-immigrants/",
    sourceOrg: "CalMatters",
    region: "California",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["AB-2161", "work-requirements", "undocumented", "state-funded", "Mia-Bonta", "Medi-Cal"],
  },

  /* ============================================================== */
  /*  MARCH 31, 2026 — DAILY UPDATE #28                             */
  /* ============================================================== */
  {
    id: "nachc-7b-uncompensated-care-hr1-estimate",
    date: "2026-03-28",
    headline: {
      en: "NACHC: H.R. 1 Will Generate $7 Billion/Year in Uncompensated Care for Community Health Centers",
      es: "NACHC: H.R. 1 Generará $7 Mil Millones/Año en Atención No Compensada para Centros de Salud Comunitarios",
    },
    summary: {
      en: "NACHC estimates the reconciliation law will lead to approximately $7 billion per year in higher costs from uncompensated care and increased operational burdens for CHCs. Commonwealth Fund estimates 5.6 million CHC Medicaid patients in expansion states could lose coverage, with revenue losses approaching $32 billion over five years. 2 in 5 CHCs have 90 days or less cash on hand. More than half already operate with negative margins. This is the most authoritative national cost estimate from the sector's own trade association.",
      es: "NACHC estima que la ley de reconciliación generará aproximadamente $7 mil millones por año en costos más altos por atención no compensada. El Commonwealth Fund estima que 5.6 millones de pacientes de Medicaid en CHCs podrían perder cobertura, con pérdidas de ingresos de $32 mil millones en cinco años.",
    },
    category: "funding" as IntelCategory,
    impactLevel: "critical" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://www.nachc.org/looming-medicaid-changes-threaten-to-deepen-the-community-health-center-workforce-crisis/",
    sourceOrg: "NACHC / Commonwealth Fund",
    region: "National",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["NACHC", "H.R.-1", "uncompensated-care", "$7B", "revenue-loss", "negative-margins"],
  },
  {
    id: "uci-health-150-layoffs-pediatric-closure-march-2026",
    date: "2026-03-23",
    headline: {
      en: "UCI Health Lays Off 150 Workers, Abruptly Closes Pediatric Units at Fountain Valley — 85% of Patients on Medi-Cal",
      es: "UCI Health Despide a 150 Trabajadores, Cierra Abruptamente Unidades Pediátricas en Fountain Valley — 85% de Pacientes en Medi-Cal",
    },
    summary: {
      en: "UCI Health laid off 150 workers and abruptly closed the pediatrics department and PICU at Fountain Valley Regional Hospital on March 23 — patients had to be transported to other hospitals mid-care. 35 nurses received layoff notices. CNA/NNU rallied April 1. UCI Health cited H.R. 1 and insurance reimbursement shifts. 85% of the roughly 500 annual pediatric patients are on Medi-Cal. The closure disrupts referral networks for Orange County FQHCs that depend on Fountain Valley for pediatric specialty care.",
      es: "UCI Health despidió a 150 trabajadores y cerró abruptamente el departamento de pediatría y UCIP en el Hospital Regional de Fountain Valley el 23 de marzo. El 85% de los pacientes pediátricos están en Medi-Cal. El cierre afecta las redes de referencia para los FQHCs del condado de Orange.",
    },
    category: "workforce" as IntelCategory,
    impactLevel: "high" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://www.nbclosangeles.com/news/local/uci-health-nurses-distraught-after-layoffs-closure-pediatric-units/3867906/",
    sourceOrg: "NBC Los Angeles / NNU",
    region: "Los Angeles",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["UCI-Health", "layoffs", "pediatric-closure", "Orange-County", "Medi-Cal", "CNA-NNU"],
  },
  {
    id: "kaufman-hall-1-in-5-ca-hospitals-closure-risk",
    date: "2026-03-25",
    headline: {
      en: "1 in 5 California Hospitals at Risk of Closure — Kaufman Hall Analysis Warns of Rural Care Deserts",
      es: "1 de Cada 5 Hospitales de California en Riesgo de Cierre — Análisis de Kaufman Hall Advierte Sobre Desiertos de Atención Rural",
    },
    summary: {
      en: "A Kaufman Hall analysis finds 1 in 5 California hospitals at risk of closure. Nearly half of rural hospitals operate at a loss. Southern Inyo Health District asked the governor for $3M emergency lifeline. CHA President Carmela Coyle warns of 'care deserts' for maternity and behavioral health. Hospital closures in rural areas will push more patients to FQHCs — the same FQHCs facing their own financial crisis from H.R. 1 cuts.",
      es: "Un análisis de Kaufman Hall encuentra que 1 de cada 5 hospitales de California está en riesgo de cierre. Casi la mitad de los hospitales rurales operan con pérdidas. Los cierres de hospitales en áreas rurales empujarán más pacientes a los FQHCs.",
    },
    category: "funding" as IntelCategory,
    impactLevel: "high" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://calhospital.org/new-report-shows-patients-served-by-one-in-five-california-hospitals-are-at-risk-of-losing-their-hospital-due-to-closure/",
    sourceOrg: "CHA / Kaufman Hall",
    region: "California",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["hospital-closure", "rural", "Kaufman-Hall", "CHA", "care-deserts", "maternity", "behavioral-health"],
  },
  {
    id: "nachc-work-requirements-volunteer-site-strategy",
    date: "2026-03-20",
    headline: {
      en: "NACHC Recommends CHCs as Volunteer Sites to Fulfill Medicaid Work Requirements — CMS Rule Expected June 2026",
      es: "NACHC Recomienda CHCs como Sitios de Voluntariado para Cumplir Requisitos Laborales de Medicaid — Regla de CMS Esperada en Junio 2026",
    },
    summary: {
      en: "NACHC issued updated guidance on Medicaid work requirements (80 hrs/month, effective Dec 31, 2026). Key recommendation: states should permit patients to volunteer at health centers to fulfill work requirements — preserving patient volumes AND satisfying the mandate. CBO estimates 10.9M patients will lose coverage. Arkansas precedent: 18,000 lost coverage (28% of target population). Georgia: only 20% of work requirement program funding went to health services. Implementation costs projected at hundreds of millions per state. CMS interim final rule expected by June 2026.",
      es: "NACHC emitió orientación actualizada sobre requisitos laborales de Medicaid (80 hrs/mes). Recomendación clave: los estados deben permitir que los pacientes hagan voluntariado en centros de salud para cumplir los requisitos — preservando volúmenes de pacientes. Regla provisional de CMS esperada en junio 2026.",
    },
    category: "legislation" as IntelCategory,
    impactLevel: "high" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://www.nachc.org/harmful-impacts-of-medicaid-work-requirements/",
    sourceOrg: "NACHC",
    region: "National",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["work-requirements", "volunteer-site", "NACHC", "CMS", "Medicaid", "patient-volume"],
  },
  {
    id: "ccalac-first-workforce-summit-june-2026",
    date: "2026-03-28",
    headline: {
      en: "CCALAC Announces First-Ever Workforce Summit — June 17, 2026 in Los Angeles",
      es: "CCALAC Anuncia Primera Cumbre de Fuerza Laboral — 17 de Junio de 2026 en Los Ángeles",
    },
    summary: {
      en: "The Community Clinic Association of LA County (largest regional CHC association in California — 2.02M patients at 450+ sites) is hosting its inaugural workforce summit focused on community health center recruitment and retention. Sponsorship applications due May 15. CCALAC is also hosting a joint event with the Coalition of OC Community Health Centers on April 10 and a Health IT Summit on October 8. The workforce summit signals that LA County FQHCs are now treating the staffing crisis as an existential strategic priority.",
      es: "La Asociación de Clínicas Comunitarias del Condado de LA (la mayor asociación regional de CHC en California — 2.02M pacientes en 450+ sitios) realizará su primera cumbre de fuerza laboral enfocada en reclutamiento y retención el 17 de junio de 2026.",
    },
    category: "workforce" as IntelCategory,
    impactLevel: "medium" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://ccalac.org/workforce-summit/",
    sourceOrg: "CCALAC",
    region: "Los Angeles",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["CCALAC", "workforce-summit", "recruitment", "retention", "LA-County", "June-2026"],
  },

  /* ============================================================== */
  /*  MARCH 28, 2026 — DAILY UPDATE #27                             */
  /* ============================================================== */
  {
    id: "lilly-novo-340b-claims-data-mandate-2026",
    date: "2026-02-01",
    headline: {
      en: "Eli Lilly & Novo Nordisk Impose Universal 340B Claims Data Requirements — FQHCs Must Submit Data or Lose Pricing",
      es: "Eli Lilly y Novo Nordisk Imponen Requisitos Universales de Datos de Reclamos 340B — FQHCs Deben Enviar Datos o Perder Precios",
    },
    summary: {
      en: "For the first time, Eli Lilly (effective Feb 1, 2026) and Novo Nordisk (effective Apr 1, 2026) require all 340B covered entities — including FQHCs — to submit claims-level data for every in-house pharmacy and medical dispense, not just contract pharmacies. Lilly explicitly threatens to 'cancel 340B pricing' for non-compliant entities. AHA has urged HRSA to intervene, calling compliance costs unprecedented. HRSA has not responded. FQHCs dispensing Lilly or Novo products must build new data submission workflows immediately.",
      es: "Por primera vez, Eli Lilly (efectivo 1 feb 2026) y Novo Nordisk (efectivo 1 abr 2026) requieren que todas las entidades cubiertas 340B — incluyendo FQHCs — envíen datos a nivel de reclamo para cada dispensación. Lilly amenaza explícitamente con 'cancelar los precios 340B' para entidades que no cumplan.",
    },
    category: "compliance" as IntelCategory,
    impactLevel: "critical" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://www.aha.org/news/headline/2026-03-03-aha-urges-hrsa-stop-novo-nordisks-new-claims-data-submission-policy-340b-hospitals-going-effect",
    sourceOrg: "AHA / Healthcare Dive",
    region: "National",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["340b", "Eli-Lilly", "Novo-Nordisk", "claims-data", "manufacturer-restriction", "HRSA"],
  },
  {
    id: "ice-fear-patient-no-shows-march-2026",
    date: "2026-03-10",
    headline: {
      en: "Fear of ICE Drives Patient No-Shows at California FQHCs — Providers Report Surging Missed Appointments",
      es: "Temor a ICE Causa Ausencias de Pacientes en FQHCs de California — Proveedores Reportan Aumento de Citas Perdidas",
    },
    summary: {
      en: "Beyond the Medi-Cal enrollment freeze and PPS elimination, a behavioral crisis is compounding FQHC revenue losses: patients — even those still eligible for coverage — are skipping appointments out of fear that ICE or federal authorities may be present near health facilities. This self-exclusion from care directly reduces visit volumes and revenue, layered on top of policy-driven losses. FQHCs need operational responses including trusted messenger campaigns, know-your-rights signage, and sensitive location policies.",
      es: "Más allá del congelamiento de inscripción en Medi-Cal y la eliminación de PPS, una crisis conductual está agravando las pérdidas de ingresos de los FQHC: los pacientes — incluso los que aún son elegibles — están faltando a sus citas por temor a que ICE o autoridades federales estén presentes cerca de las instalaciones de salud. Esta autoexclusión reduce directamente los volúmenes de visitas e ingresos.",
    },
    category: "undocumented-access" as IntelCategory,
    impactLevel: "high" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://calmatters.org/health/2026/03/durazo-reverse-medical-undocumented-immigrants/",
    sourceOrg: "CalMatters",
    region: "California",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["ICE", "immigration-enforcement", "no-shows", "patient-fear", "visit-volume", "undocumented"],
  },
  {
    id: "medi-cal-managed-care-enrollment-collapse-2028",
    date: "2026-03-24",
    headline: {
      en: "CalOptima & IEHP Project 30% Membership Drops by 2028 — Managed Care Revenue Cliff for FQHCs",
      es: "CalOptima e IEHP Proyectan Caídas del 30% en Membresía para 2028 — Precipicio de Ingresos de Atención Administrada para FQHCs",
    },
    summary: {
      en: "California's two largest county-organized Medi-Cal plans are projecting catastrophic enrollment losses. CalOptima (Orange County) forecasts losing 650,000 of its 2.2M members by 2028 — a 30% drop. IEHP (Inland Empire) projects a similar 650,000-member loss from its 2.5M membership. Combined, 1.3 million managed care members could lose coverage across just two plans. This is orders of magnitude beyond the initial 8% drops reported in early March. FQHCs dependent on managed care reimbursement face a compounding revenue crisis as their largest payers shrink.",
      es: "Los dos planes Medi-Cal más grandes del condado de California proyectan pérdidas catastróficas de inscripción. CalOptima pronostica perder 650,000 miembros para 2028 (30%), e IEHP proyecta una pérdida similar. 1.3 millones de miembros podrían perder cobertura solo en estos dos planes.",
    },
    category: "funding" as IntelCategory,
    impactLevel: "critical" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://theievoice.com/healthcare-infrastructure-collapse-warning/",
    sourceOrg: "IE Voice / JR Report",
    region: "Orange County / Inland Empire",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["CalOptima", "IEHP", "managed-care", "enrollment-loss", "Medi-Cal", "revenue-cliff"],
  },
  {
    id: "fresno-county-241m-medi-cal-gap-chw-layoffs",
    date: "2026-03-24",
    headline: {
      en: "Fresno County Faces $241M Medi-Cal Gap — West Fresno Health Disparities Program Cut, 7 CHWs Laid Off",
      es: "Condado de Fresno Enfrenta Brecha de $241M en Medi-Cal — Programa de Disparidades de Salud Eliminado, 7 Trabajadores Comunitarios Despedidos",
    },
    summary: {
      en: "Fresno County faces an estimated $241 million in uncovered healthcare costs as patients lose Medi-Cal coverage. A $300K federal grant cancellation ended the West Fresno Family Resource Center's Health Disparities Program, forcing the layoff of 7 community health workers who served hundreds in southwest Fresno and Selma. Over 50% of residents in Fresno, Tulare, Kern, Merced, and Madera counties depend on Medi-Cal. The county is calling on Gov. Newsom to release $1.9B to counties for social service programs.",
      es: "El condado de Fresno enfrenta un estimado de $241 millones en costos de atención médica sin cubrir. La cancelación de una subvención federal de $300K eliminó el Programa de Disparidades de Salud, despidiendo a 7 trabajadores comunitarios de salud.",
    },
    category: "funding" as IntelCategory,
    impactLevel: "high" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://gvwire.com/2026/03/26/fresno-county-we-need-state-relief-from-big-beautiful-bill-cuts/",
    sourceOrg: "GV Wire",
    region: "Central Valley",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["Fresno", "Central-Valley", "CHW-layoffs", "Medi-Cal", "grant-cancellation", "health-disparities"],
  },
  {
    id: "hr1-directed-payment-cap-medicare-rates-2028",
    date: "2026-03-15",
    headline: {
      en: "H.R. 1 Caps Medi-Cal Directed Payments — Provider Rates Will Edge Toward Medicare Levels by 2028",
      es: "H.R. 1 Limita Pagos Dirigidos de Medi-Cal — Tarifas de Proveedores Se Acercarán a Niveles de Medicare para 2028",
    },
    summary: {
      en: "A distinct revenue threat beyond PPS elimination: H.R. 1 caps state-directed payments, ending California's ability to direct managed care plans to pay providers at commercial insurance rates. Provider rates will edge toward Medicare levels starting 2028. While FQHCs have PPS protection for base rates, supplemental/wrap payments through managed care plans will be affected. CHCF analysis details how the provider tax crackdown and directed payment restrictions will reduce overall Medi-Cal funding flowing to FQHCs through managed care.",
      es: "Una amenaza de ingresos distinta más allá de la eliminación de PPS: H.R. 1 limita los pagos dirigidos por el estado, terminando la capacidad de California de dirigir planes de atención administrada a pagar tarifas comerciales. Las tarifas se acercarán a niveles de Medicare para 2028.",
    },
    category: "legislation" as IntelCategory,
    impactLevel: "high" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://www.chcf.org/resource/how-massive-federal-cuts-will-create-unprecedented-challenges-medi-cal-patients-providers/",
    sourceOrg: "CHCF",
    region: "California",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["H.R.-1", "directed-payments", "Medicare-rates", "managed-care", "provider-tax", "CHCF"],
  },
  {
    id: "dhcs-hr1-implementation-plan-senate-filing",
    date: "2026-02-28",
    headline: {
      en: "DHCS Files Formal H.R. 1 Implementation Plan with California Senate — Authoritative Timeline for All Medi-Cal Changes",
      es: "DHCS Presenta Plan Formal de Implementación de H.R. 1 al Senado de California — Cronograma Oficial para Todos los Cambios de Medi-Cal",
    },
    summary: {
      en: "DHCS filed a formal implementation plan with the California Senate Budget and Fiscal Review Committee detailing how California will implement H.R. 1's Medicaid provisions. The document lays out the exact timeline: asset test reinstatement (Jan 2026), enrollment freeze (Jan 2026), dental benefit elimination for undocumented adults (July 2026), 6-month redetermination cycles (Dec 2026), work requirements (Jan 2027), and copayment implementation (Oct 2028). This is the authoritative state-level planning document FQHCs need for operational preparation.",
      es: "DHCS presentó un plan formal de implementación al Comité de Presupuesto del Senado de California detallando cómo California implementará las disposiciones de Medicaid de H.R. 1. El documento establece el cronograma exacto para todas las fechas críticas de cambios en Medi-Cal.",
    },
    category: "compliance" as IntelCategory,
    impactLevel: "high" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://sbud.senate.ca.gov/system/files/2026-02/dhcs-hr1-implementation-plan_0.pdf",
    sourceOrg: "CA Senate Budget Committee / DHCS",
    region: "California",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["HR1", "implementation", "DHCS", "timeline", "Medi-Cal", "redetermination", "work-requirements"],
  },
  {
    id: "ochin-medicare-readiness-gaps-chcs-march-2026",
    date: "2026-03-16",
    headline: {
      en: "OCHIN Brief: Critical Medicare Readiness Gaps at California Community Health Centers",
      es: "Informe OCHIN: Brechas Críticas de Preparación para Medicare en Centros de Salud Comunitarios de California",
    },
    summary: {
      en: "An OCHIN brief identifies critical Medicare readiness gaps at California community health centers as the population they serve ages. Many FQHCs lack billing infrastructure, credentialing processes, and clinical workflows optimized for Medicare patients. As Medi-Cal populations age into Medicare and FQHCs diversify payer mix away from Medi-Cal dependency, Medicare readiness becomes a financial survival strategy.",
      es: "Un informe de OCHIN identifica brechas críticas de preparación para Medicare en los centros de salud comunitarios de California. Muchos FQHCs carecen de infraestructura de facturación y flujos de trabajo clínicos optimizados para pacientes de Medicare.",
    },
    category: "change-management" as IntelCategory,
    impactLevel: "medium" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://www.chcf.org/resources/",
    sourceOrg: "OCHIN / CHCF",
    region: "California",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["Medicare", "readiness", "payer-mix", "aging-population", "OCHIN", "billing"],
  },
  {
    id: "chcf-ai-language-services-brief-march-2026",
    date: "2026-03-24",
    headline: {
      en: "CHCF Examines How AI Can Responsibly Expand Language Access for LEP Patients in Safety-Net Settings",
      es: "CHCF Examina Cómo la IA Puede Expandir Responsablemente el Acceso Lingüístico para Pacientes con Dominio Limitado del Inglés",
    },
    summary: {
      en: "The California Health Care Foundation published a brief examining how AI-powered interpretation and translation tools could reduce the cost of language services while expanding access for limited English proficiency (LEP) patients. FQHCs serve heavily LEP populations across Spanish, Cantonese, Vietnamese, Tagalog and other languages. The brief examines responsible implementation — critical for FQHCs balancing CLAS Standards compliance with budget constraints.",
      es: "La Fundación de Atención Médica de California publicó un informe examinando cómo las herramientas de interpretación y traducción con IA podrían reducir costos de servicios lingüísticos mientras expanden el acceso para pacientes con dominio limitado del inglés (LEP).",
    },
    category: "change-management" as IntelCategory,
    impactLevel: "medium" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://www.chcf.org/",
    sourceOrg: "CHCF",
    region: "California",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["AI", "language-access", "LEP", "CLAS-standards", "interpretation", "CHCF"],
  },
  {
    id: "hrsa-4-year-performance-period-extension-fy2026",
    date: "2026-01-26",
    headline: {
      en: "HRSA Extends FQHC Performance Periods to 4 Years — $828M in Non-Competitive Awards for 194 Health Centers",
      es: "HRSA Extiende Períodos de Desempeño de FQHCs a 4 Años — $828M en Premios No Competitivos para 194 Centros de Salud",
    },
    summary: {
      en: "HRSA is moving from 3-year to 4-year performance periods for health center grantees starting in FY2026, with 192 non-competitive awards totaling approximately $828 million. Longer grant cycles mean less time spent on competitive applications and more operational stability — a meaningful administrative relief during the current financial crisis.",
      es: "HRSA está pasando de períodos de desempeño de 3 años a 4 años para los beneficiarios de centros de salud a partir del AF2026, con 192 premios no competitivos que totalizan aproximadamente $828 millones.",
    },
    category: "funding" as IntelCategory,
    impactLevel: "medium" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://www.federalregister.gov/documents/2025/08/07/2025-15036/health-center-program-performance-period-extensions",
    sourceOrg: "Federal Register / HRSA",
    region: "National",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["HRSA", "performance-period", "grant-cycle", "Section-330", "administrative-relief"],
  },

  /* ============================================================== */
  /*  MARCH 27, 2026 — DAILY UPDATE #26                             */
  /* ============================================================== */
  {
    id: "340b-child-site-registration-requirement-overturned",
    date: "2026-03-03",
    headline: {
      en: "Federal Court Overturns HRSA 340B Child Site Registration Requirement — Expands Satellite Location Purchasing",
      es: "Tribunal Federal Anula Requisito de Registro de Sitios Secundarios 340B de HRSA — Amplía Compras en Ubicaciones Satélite",
    },
    summary: {
      en: "A federal district court vacated HRSA's requirement that off-site facilities (child sites) must appear on a hospital's Medicare cost report and be registered in OPAIS before purchasing drugs at 340B prices. This effectively restores flexibilities that existed during the pandemic era, potentially expanding 340B purchasing eligibility for FQHCs with satellite locations or off-site services. The ruling is part of a broader wave of judicial pushback against HRSA 340B program administration in early 2026.",
      es: "Un tribunal federal anuló el requisito de HRSA de que las instalaciones fuera del sitio (sitios secundarios) debían aparecer en el informe de costos de Medicare y estar registradas en OPAIS antes de comprar medicamentos a precios 340B. Esto restaura flexibilidades de la era pandémica, potencialmente expandiendo la elegibilidad de compra 340B para FQHCs con ubicaciones satélite.",
    },
    category: "compliance" as IntelCategory,
    impactLevel: "high" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://www.forvismazars.us/forsights/2026/03/340b-program-major-developments-through-early-2026",
    sourceOrg: "Forvis Mazars",
    region: "National",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["340b", "child-site", "court-ruling", "satellite-locations", "drug-pricing"],
    keyTakeaways: [
      { en: "HRSA child site registration requirement vacated — satellite locations may now purchase at 340B prices without prior OPAIS registration", es: "Requisito de registro de sitios secundarios de HRSA anulado — ubicaciones satélite pueden comprar a precios 340B sin registro previo en OPAIS" },
      { en: "Restores pandemic-era flexibilities for off-site 340B purchasing", es: "Restaura flexibilidades de la era pandémica para compras 340B fuera del sitio" },
      { en: "FQHCs with satellite clinics or mobile units should review whether this expands their 340B eligibility", es: "FQHCs con clínicas satélite o unidades móviles deben revisar si esto amplía su elegibilidad 340B" },
    ],
  },
  {
    id: "hrsa-fy2026-340b-audit-scope-expanded",
    date: "2026-03-01",
    headline: {
      en: "HRSA Expands FY2026 340B Audit Scope — New 'Furnished' Language Signals Broader Scrutiny of Drug Transactions",
      es: "HRSA Amplía Alcance de Auditoría 340B para FY2026 — Nuevo Lenguaje 'Proporcionado' Señala Mayor Escrutinio de Transacciones de Medicamentos",
    },
    summary: {
      en: "HRSA's updated Data Request List (DRL) for FY2026 340B audits now includes the word 'furnished' alongside 'administered or dispensed,' broadening the scope of how covered entities must document drug transactions. Additional changes indicate increased scrutiny on locations receiving 340B-priced drugs and demonstration of covered entity ownership for applicable locations (e.g., CE-owned pharmacies). FQHCs participating in the 340B program should update internal documentation and audit preparation procedures to reflect the expanded language.",
      es: "La Lista de Solicitud de Datos (DRL) actualizada de HRSA para auditorías 340B de FY2026 ahora incluye la palabra 'proporcionado' junto con 'administrado o dispensado,' ampliando el alcance de cómo las entidades cubiertas deben documentar transacciones de medicamentos. FQHCs participantes en el programa 340B deben actualizar sus procedimientos de documentación interna.",
    },
    category: "compliance" as IntelCategory,
    impactLevel: "medium" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://perspectives.cps.com/article-hrsa-changes-340b-data-request-list-fy26",
    sourceOrg: "CPS (Cardinal Health)",
    region: "National",
    affectedOrgs: [],
    affectedOrgSlugs: [],
    tags: ["340b", "hrsa-audit", "compliance", "data-request-list", "documentation"],
    keyTakeaways: [
      { en: "HRSA added 'furnished' to audit language — broader than 'administered or dispensed,' covering more drug transaction types", es: "HRSA agregó 'proporcionado' al lenguaje de auditoría — más amplio que 'administrado o dispensado'" },
      { en: "Increased scrutiny on CE-owned pharmacy locations and 340B drug distribution chains", es: "Mayor escrutinio en farmacias propiedad de entidades cubiertas y cadenas de distribución de medicamentos 340B" },
      { en: "FQHCs should update 340B audit preparation procedures now for FY2026 compliance", es: "FQHCs deben actualizar procedimientos de preparación de auditoría 340B ahora para cumplimiento de FY2026" },
    ],
  },
  /* ============================================================== */
  /*  MARCH 25, 2026 — DAILY UPDATE #25                             */
  /* ============================================================== */
  {
    id: "altamed-great-place-to-work-certification-2026",
    date: "2026-03-11",
    headline: {
      en: "AltaMed Health Services Certified as Great Place to Work® — 85% Employee Approval, 28 Points Above National Average",
      es: "AltaMed Health Services Certificado como Great Place to Work® — 85% de Aprobación de Empleados, 28 Puntos Sobre el Promedio Nacional",
    },
    summary: {
      en: "AltaMed Health Services, the nation's largest FQHC, earned Great Place to Work® certification based on its Trust Index Survey. 85% of AltaMed's 5,700+ employees say it's a great place to work — 28 points higher than the 57% national average. 94% feel good about AltaMed's community contributions, and 89% are proud to tell others they work there. CEO Cástulo de la Rocha said the certification 'reflects the culture we have built together, one rooted in trust, respect and a shared commitment.' CHRO Natasha Milatovich emphasized AltaMed's philosophy of 'work-life integration' over traditional work-life balance. AltaMed operates 60+ accredited health centers serving 700,000+ patients across LA and Orange counties. The certification stands out as a rare bright spot for FQHC workforce morale amid the sector's funding crisis and widespread layoffs.",
      es: "AltaMed Health Services, el FQHC más grande del país, obtuvo la certificación Great Place to Work® con base en su Encuesta de Índice de Confianza. El 85% de los 5,700+ empleados dicen que es un gran lugar para trabajar — 28 puntos por encima del promedio nacional del 57%. El 94% se siente bien por las contribuciones comunitarias de AltaMed. El CEO Cástulo de la Rocha dijo que la certificación 'refleja la cultura que hemos construido juntos, basada en la confianza, el respeto y un compromiso compartido.' AltaMed opera más de 60 centros de salud acreditados atendiendo a más de 700,000 pacientes en los condados de LA y Orange.",
    },
    category: "workforce" as IntelCategory,
    impactLevel: "medium" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://www.prnewswire.com/news-releases/altamed-health-services-named-great-place-to-work-among-leading-health-care-organizations-302710501.html",
    sourceOrg: "PR Newswire",
    region: "Los Angeles",
    affectedOrgs: ["AltaMed Health Services"],
    affectedOrgSlugs: ["altamed-health-services"],
    tags: ["great-place-to-work", "employee-satisfaction", "workforce-morale", "altamed", "workplace-culture", "employer-brand"],
    keyTakeaways: [
      { en: "85% employee approval rate — 28 points above the 57% US average for typical companies", es: "85% de tasa de aprobación — 28 puntos sobre el promedio del 57% en EE.UU." },
      { en: "94% feel good about AltaMed's community contributions; 89% are proud to tell others they work there", es: "94% se siente bien por las contribuciones comunitarias; 89% está orgulloso de decir que trabaja allí" },
      { en: "Rare FQHC workforce win amid sector-wide layoffs and funding uncertainty — signals strong employer brand", es: "Logro laboral poco común para un FQHC en medio de despidos y incertidumbre de financiamiento — señala una marca empleadora fuerte" },
      { en: "AltaMed's 5,700+ employees make it a bellwether for FQHC workplace culture nationally", es: "Los más de 5,700 empleados de AltaMed lo convierten en un referente de cultura laboral FQHC a nivel nacional" },
    ],
  },
  {
    id: "calmatters-medi-cal-funding-emergency-march-2026",
    date: "2026-03-24",
    headline: {
      en: "CalMatters: Medi-Cal Faces Funding Emergency from State Miscalculations and Federal Cuts",
      es: "CalMatters: Medi-Cal Enfrenta Emergencia de Financiamiento por Errores Estatales y Recortes Federales",
    },
    summary: {
      en: "Dan Walters' widely syndicated CalMatters commentary warns Medi-Cal has become a $200B+/year 'funding emergency.' Governor Newsom is retracting coverage for immigrants after wrongly projecting a state surplus, while H.R. 1 federal cuts compound the crisis. The prophecy of Medi-Cal overwhelming state finances — warned about two decades ago — is now reality. Medi-Cal covers over a third of California's population (14.5M+), making it by far the budget's largest single item. FQHCs face a dual squeeze: state enrollment freezes AND federal reimbursement cuts.",
      es: "La columna de Dan Walters en CalMatters advierte que Medi-Cal se ha convertido en una 'emergencia de financiamiento' de más de $200B/año. El gobernador Newsom está retirando cobertura para inmigrantes después de proyectar incorrectamente un superávit estatal, mientras los recortes federales de H.R. 1 agravan la crisis. Medi-Cal cubre más de un tercio de la población de California (14.5M+).",
    },
    category: "funding" as IntelCategory,
    impactLevel: "critical" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://calmatters.org/commentary/2026/03/medi-cal-emergency-federal-cuts/",
    sourceOrg: "CalMatters",
    region: "California",
    tags: ["medi-cal", "state-budget", "funding-crisis", "hr1", "undocumented", "federal-cuts"],
    keyTakeaways: [
      { en: "Medi-Cal now exceeds $200B/year — by far the state's largest budget item", es: "Medi-Cal ahora supera $200B/año — el mayor rubro del presupuesto estatal" },
      { en: "Dual crisis: state miscalculated surplus (led to immigrant coverage expansion) + federal H.R. 1 cuts", es: "Crisis dual: el estado calculó mal el superávit (llevó a expandir cobertura inmigrante) + recortes federales H.R. 1" },
      { en: "Newsom retracting immigrant coverage and freezing enrollments to close budget gap", es: "Newsom retirando cobertura inmigrante y congelando inscripciones para cerrar brecha presupuestaria" },
    ],
  },
  {
    id: "ca-hospitals-3400-layoffs-second-wave-march-2026",
    date: "2026-03-22",
    headline: {
      en: "3,400+ California Healthcare Workers Laid Off Since Mid-March — Second Wave of Hospital Cuts",
      es: "3,400+ Trabajadores de Salud de California Despedidos Desde Mediados de Marzo — Segunda Ola de Recortes",
    },
    summary: {
      en: "California hospitals have laid off more than 3,400 healthcare workers since mid-March 2026, with 1,600 coming from Santa Barbara to Orange County and the Inland Empire. Hospital executives warn of a second wave of layoffs as H.R. 1 continues to phase in Medicaid funding reductions over the next several years. The cuts affect Medi-Cal coverage for 15M+ residents including 1.6M undocumented immigrants. An estimated 289,000 Medi-Cal members may lose coverage by June 2026, rising to 400,000 by 2029-2030. St. John's Community Health (28 clinics, 144K patients across LA/Riverside/SB) warns of extreme state and federal cuts impacting services.",
      es: "Los hospitales de California han despedido a más de 3,400 trabajadores de salud desde mediados de marzo de 2026. Los ejecutivos advierten sobre una segunda ola de despidos mientras H.R. 1 continúa reduciendo el financiamiento de Medicaid. Se estima que 289,000 miembros de Medi-Cal podrían perder cobertura para junio de 2026.",
    },
    category: "workforce" as IntelCategory,
    impactLevel: "critical" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://www.ocregister.com/2026/03/22/california-hospitals-laying-off-thousands-as-funding-cuts-trickle-down/",
    sourceOrg: "Orange County Register",
    region: "California",
    affectedOrgSlugs: ["st-johns-community-health"],
    tags: ["layoffs", "hospital-cuts", "hr1", "medi-cal", "second-wave", "inland-empire", "workforce-crisis"],
    keyTakeaways: [
      { en: "3,400+ healthcare workers laid off since mid-March — second wave of H.R. 1 impacts", es: "3,400+ trabajadores despedidos desde mediados de marzo — segunda ola de impactos de H.R. 1" },
      { en: "1,600 layoffs from SB to OC and Inland Empire alone", es: "1,600 despidos solo de SB a OC y el Inland Empire" },
      { en: "St. John's CHC (28 clinics, 144K patients in LA/Riverside/SB) warns of 'extreme cuts'", es: "St. John's CHC (28 clínicas, 144K pacientes en LA/Riverside/SB) advierte sobre 'recortes extremos'" },
      { en: "289,000 Medi-Cal members may lose coverage by June 2026", es: "289,000 miembros de Medi-Cal podrían perder cobertura para junio de 2026" },
    ],
  },
  {
    id: "iehp-300k-member-loss-projection-2026",
    date: "2026-03-25",
    headline: {
      en: "IEHP Projects Loss of 300,000 Members — Largest Medi-Cal Plan Faces Unprecedented Decline",
      es: "IEHP Proyecta Pérdida de 300,000 Miembros — El Plan de Medi-Cal Más Grande Enfrenta Declive Sin Precedentes",
    },
    summary: {
      en: "Inland Empire Health Plan (IEHP), one of the nation's top 10 largest Medicaid health plans serving 1.5M+ enrollees, projects losing 300,000 members over the next two years. Half (150,000) will be lost due to California's freeze on Medi-Cal for undocumented adults; the other 150,000 from work requirements and semi-annual redeterminations affecting 450,000 members. Over 40% of San Bernardino and Riverside county residents are enrolled in Medi-Cal. IEHP CEO Jarrod McNaughton warns cuts could cause closures of critical health facilities across the Inland Empire, where IEHP's network includes 9,000+ providers, 855 clinics, and 36 hospitals.",
      es: "IEHP, uno de los 10 planes de Medicaid más grandes del país con 1.5M+ inscritos, proyecta perder 300,000 miembros en los próximos dos años. La mitad por la congelación de Medi-Cal para adultos indocumentados; la otra mitad por requisitos de trabajo y redeterminaciones semestrales. Más del 40% de los residentes de SB y Riverside están inscritos en Medi-Cal.",
    },
    category: "funding" as IntelCategory,
    impactLevel: "high" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://theievoice.com/healthcare-infrastructure-collapse-warning/",
    sourceOrg: "IE Voice",
    region: "San Bernardino County",
    tags: ["iehp", "inland-empire", "medi-cal", "enrollment-loss", "undocumented", "work-requirements", "managed-care"],
    keyTakeaways: [
      { en: "IEHP projects 300K member loss: 150K from undocumented freeze + 150K from work requirements/redeterminations", es: "IEHP proyecta pérdida de 300K miembros: 150K por congelación de indocumentados + 150K por requisitos de trabajo" },
      { en: "40%+ of San Bernardino & Riverside residents on Medi-Cal — IEHP network: 9,000 providers, 855 clinics, 36 hospitals", es: "40%+ de residentes de SB y Riverside en Medi-Cal — red IEHP: 9,000 proveedores, 855 clínicas, 36 hospitales" },
      { en: "Semi-annual redetermination now affects 450,000 IEHP members (was annual)", es: "Redeterminación semestral ahora afecta a 450,000 miembros de IEHP (antes era anual)" },
    ],
  },
  {
    id: "nhcare-7-8m-lakeside-facility-expansion",
    date: "2026-03-20",
    headline: {
      en: "Neighborhood Healthcare Secures $7.8M for New Lakeside Facility Despite Federal Funding Crisis",
      es: "Neighborhood Healthcare Asegura $7.8M para Nueva Instalación en Lakeside a Pesar de Crisis Federal",
    },
    summary: {
      en: "Neighborhood Healthcare, a San Diego County FQHC, secured funding for a $7.8M facility in Lakeside, acknowledging that community need has long outgrown the organization's capacity. This expansion comes amid the FQHC's public warnings that 'hundreds of FQHCs throughout the state will shut down in a year' due to H.R. 1 cuts. The new facility signals Neighborhood Healthcare's dual strategy: expanding access while sounding the alarm on federal defunding.",
      es: "Neighborhood Healthcare, un FQHC del condado de San Diego, aseguró financiamiento para una instalación de $7.8M en Lakeside. Esta expansión llega mientras la organización advierte que 'cientos de FQHCs en todo el estado cerrarán en un año' debido a los recortes de H.R. 1.",
    },
    category: "funding" as IntelCategory,
    impactLevel: "medium" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://www.sdbj.com/healthcare-2/neighborhood-healthcare-secures-funding-for-7-8m-lakeside-facility/",
    sourceOrg: "San Diego Business Journal",
    region: "San Diego County",
    affectedOrgSlugs: ["neighborhood-healthcare"],
    tags: ["san-diego", "expansion", "fqhc-investment", "neighborhood-healthcare", "lakeside"],
    keyTakeaways: [
      { en: "Neighborhood Healthcare secures $7.8M for Lakeside expansion — community need has outgrown capacity", es: "Neighborhood Healthcare asegura $7.8M para expansión en Lakeside — la necesidad de la comunidad ha superado la capacidad" },
      { en: "Same FQHC warning 'hundreds will shut down' is simultaneously expanding — dual strategy", es: "El mismo FQHC que advierte 'cientos cerrarán' está expandiéndose simultáneamente — estrategia dual" },
    ],
  },
  {
    id: "sy-health-3-new-centers-expansion-2026",
    date: "2026-03-15",
    headline: {
      en: "San Ysidro Health Opening 3 New Centers in 2026: Julian, Joe & Vi Jacobs, Chula Vista",
      es: "San Ysidro Health Abre 3 Nuevos Centros en 2026: Julian, Joe & Vi Jacobs, Chula Vista",
    },
    summary: {
      en: "San Ysidro Health, one of San Diego County's largest FQHCs, is scheduled to open three new health centers in 2026 — Julian Family Medicine (March), Joe & Vi Jacobs Center (fall), and Chula Vista Specialty Care (winter). This follows the recent opening of a $55M National City center expected to serve 20,000 people annually and create 200-250 permanent jobs. CEO Kevin Mattson noted 25-30% of National City's community lacks access to medical and behavioral health care, and the expansion comes as 'families are losing healthcare coverage and federal funding is increasingly limited.'",
      es: "San Ysidro Health abrirá tres nuevos centros en 2026 — Julian Family Medicine (marzo), Joe & Vi Jacobs Center (otoño) y Chula Vista Specialty Care (invierno). Esto sigue a la apertura de un centro de $55M en National City que espera atender 20,000 personas anualmente y crear 200-250 empleos permanentes.",
    },
    category: "change-management" as IntelCategory,
    impactLevel: "medium" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://www.sdbj.com/healthcare-2/hospitals-healthcare-2/san-ysidro-health-opens-55m-national-city-center/",
    sourceOrg: "San Diego Business Journal",
    region: "San Diego County",
    affectedOrgSlugs: ["san-ysidro-health"],
    tags: ["san-diego", "expansion", "san-ysidro-health", "national-city", "chula-vista", "julian"],
    keyTakeaways: [
      { en: "3 new SYH centers in 2026: Julian (March), Joe & Vi Jacobs (fall), Chula Vista Specialty (winter)", es: "3 nuevos centros SYH en 2026: Julian (marzo), Joe & Vi Jacobs (otoño), Chula Vista Specialty (invierno)" },
      { en: "$55M National City center: 20,000 patients/year, 200-250 jobs, 25-30% of community lacked access", es: "Centro de $55M en National City: 20,000 pacientes/año, 200-250 empleos, 25-30% sin acceso" },
    ],
  },
  /* ============================================================== */
  /*  MARCH 20, 2026 — DAILY UPDATE #24                             */
  /* ============================================================== */
  {
    id: "chcf-rural-north-medicaid-devastation-report",
    date: "2026-03-20",
    headline: {
      en: "CHCF: Federal Medicaid Cuts Would 'Devastate' California's Rural North Health Systems",
      es: "CHCF: Recortes Federales de Medicaid 'Devastarían' los Sistemas de Salud del Norte Rural de California",
    },
    summary: {
      en: "A new CHCF analysis details how H.R. 1's Medicaid cuts threaten rural Northern California FQHCs. At Shasta Community Health Center, 82% of patient visits are Medi-Cal (60% of revenue). Hill Country CHC's CEO warns: 'If I lose 30% of my revenue, I will have to make a 30% reduction' in staff and services. Drug overdose deaths in Shasta/Lassen are 70% above statewide rates, and the average ACE score is 5 (vs. 2 statewide). Enhanced premium subsidies expired Jan 1, affecting ~9,800 residents. CHCF hosting in-person event in Redding April 2 to discuss findings.",
      es: "Un nuevo análisis de CHCF detalla cómo los recortes de Medicaid de H.R. 1 amenazan a los FQHCs del norte rural de California. En Shasta CHC, 82% de las visitas son Medi-Cal (60% de ingresos). La CEO de Hill Country CHC advierte: 'Si pierdo 30% de mis ingresos, tendré que hacer una reducción del 30%.' Las muertes por sobredosis en Shasta/Lassen están 70% por encima del promedio estatal. CHCF organiza evento presencial en Redding el 2 de abril.",
    },
    category: "funding" as IntelCategory,
    impactLevel: "high" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl:
      "https://www.chcf.org/resource/federal-medicaid-cuts-would-devastate-health-care-systems-californias-vast-rural-north/",
    sourceOrg: "California Health Care Foundation",
    region: "Shasta County",
    affectedOrgSlugs: [
      "shasta-community-health-center",
      "hill-country-community-clinic",
    ],
    tags: [
      "rural-health",
      "medicaid-cuts",
      "hr1",
      "north-state",
      "chcf",
      "medi-cal",
    ],
    keyTakeaways: [
      { en: "Shasta CHC: 82% of patient visits are Medi-Cal (60% of revenue)", es: "Shasta CHC: 82% de las visitas son Medi-Cal (60% de ingresos)" },
      { en: "Hill Country CEO: 'If I lose 30% of revenue, I make a 30% reduction in staff'", es: "CEO de Hill Country: 'Si pierdo 30% de ingresos, hago una reducción del 30% en personal'" },
      { en: "Overdose deaths 70% above statewide rate; average ACE score 5 vs. 2 statewide", es: "Muertes por sobredosis 70% por encima del promedio estatal; puntuación ACE promedio 5 vs. 2 estatal" },
      { en: "Enhanced premium subsidies expired Jan 1 — ~9,800 North State residents affected", es: "Subsidios de primas mejorados expiraron el 1 de enero — ~9,800 residentes del norte afectados" },
      { en: "CHCF hosting in-person Redding event April 2 to discuss findings", es: "CHCF organiza evento presencial en Redding el 2 de abril para discutir hallazgos" },
    ],
  },
  /* ============================================================== */
  /*  March 17, 2026                                                 */
  /* ============================================================== */
  {
    id: "stat-news-fqhc-financial-sustainability-crisis",
    date: "2026-03-17",
    headline: {
      en: "STAT News: FQHCs' Greatest Threat Isn't Funding Cuts — It's Structural Insolvency",
      es: "STAT News: La Mayor Amenaza para los FQHCs No Son los Recortes — Es la Insolvencia Estructural",
    },
    summary: {
      en: "A major STAT News analysis argues that FQHCs face an existential financial crisis beyond federal funding cuts. FQHC net margins collapsed from 5.3% (2020-2022) to negative 2.1% in 2024. The community health center program posted a 2% program-wide financial loss in 2025. Federal grants remained flat 2019-2023 while healthcare costs rose 25%+. One restructured FQHC found core medical services operating at a '$5/visit loss.' Author calls for rigorous financial discipline and program performance analysis as 'foundational to mission delivery.'",
      es: "Un análisis de STAT News argumenta que los FQHCs enfrentan una crisis financiera existencial más allá de los recortes federales. Los márgenes netos de FQHC colapsaron de 5.3% (2020-2022) a -2.1% negativo en 2024. El programa reportó una pérdida financiera del 2% en 2025. Las subvenciones federales se mantuvieron estancadas 2019-2023 mientras los costos de salud subieron 25%+.",
    },
    category: "funding" as IntelCategory,
    impactLevel: "high" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://www.statnews.com/2026/03/17/federally-qualified-health-centers-fqhcs-crisis/",
    sourceOrg: "STAT News",
    region: "Federal",
    tags: ["financial-sustainability", "margins", "structural-deficit", "operations", "strategy"],
    paywalled: true,
    keyTakeaways: [
      { en: "Net margins collapsed from +5.3% (2020-22) to -2.1% in 2024 — a 7.4-point swing", es: "Márgenes netos colapsaron de +5.3% (2020-22) a -2.1% en 2024 — una caída de 7.4 puntos" },
      { en: "2% program-wide financial loss in 2025 — the first net loss in program history", es: "Pérdida financiera del 2% en todo el programa en 2025 — la primera pérdida neta en la historia del programa" },
      { en: "Federal grants stayed flat 2019-2023 while costs rose 25%+", es: "Subvenciones federales se mantuvieron estancadas 2019-2023 mientras costos subieron 25%+" },
      { en: "One FQHC found core medical services operating at a '$5/visit loss' after restructuring", es: "Un FQHC descubrió que servicios médicos básicos operaban con 'pérdida de $5/visita' después de reestructuración" },
      { en: "Author argues structural insolvency — not just funding cuts — is the existential threat", es: "El autor argumenta que la insolvencia estructural — no solo los recortes — es la amenaza existencial" },
    ],
  },
  {
    id: "la-county-sales-tax-june-ballot-confirmed",
    date: "2026-03-16",
    headline: {
      en: "LA County Half-Cent Health Tax Confirmed for June 2 Ballot — $1B/Year for Safety-Net Clinics",
      es: "Impuesto de Medio Centavo de Salud del Condado de LA Confirmado para Boleta del 2 de Junio — $1B/Año para Clínicas de Red de Seguridad",
    },
    summary: {
      en: "The LA County Board of Supervisors formally placed a half-cent sales tax on the June 2 primary ballot, expected to generate ~$1B/year for safety-net health care. St. John's Community Health ($240M revenue, 28 clinics, 144K patients) could lose up to one-third of its budget from Medi-Cal cuts and contributed $2M+ to the campaign. Proposed allocation: 47% free/reduced care, 22% DHS, 10% DPH. This is the first major county-level ballot measure in the nation specifically designed to offset H.R. 1 Medicaid cuts.",
      es: "La Junta de Supervisores del Condado de LA colocó formalmente un impuesto de medio centavo en la boleta del 2 de junio, que generaría ~$1B/año para salud de red de seguridad. St. John's Community Health ($240M en ingresos, 28 clínicas, 144K pacientes) podría perder un tercio de su presupuesto. Primera medida a nivel de condado diseñada para compensar los recortes de Medicaid de H.R. 1.",
    },
    category: "funding" as IntelCategory,
    impactLevel: "high" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://kffhealthnews.org/news/article/federal-cuts-state-tax-increases-budget-shortfalls-health-clinics-los-angeles-california/",
    sourceOrg: "KFF Health News",
    region: "Los Angeles County",
    affectedOrgs: ["St. John's Community Health", "Community Clinic Association of LA County"],
    affectedOrgSlugs: ["st-johns-community-health"],
    tags: ["sales-tax", "ballot-measure", "june-ballot", "safety-net", "los-angeles", "revenue-model"],
    keyTakeaways: [
      { en: "Half-cent sales tax on June 2 ballot — expected to generate ~$1B/year", es: "Impuesto de medio centavo en boleta del 2 de junio — generaría ~$1B/año" },
      { en: "Allocation: 47% free/reduced care, 22% DHS, 10% DPH", es: "Distribución: 47% atención gratuita/reducida, 22% DHS, 10% DPH" },
      { en: "St. John's ($240M revenue, 28 clinics) could lose 1/3 of budget from Medi-Cal cuts", es: "St. John's ($240M en ingresos, 28 clínicas) podría perder 1/3 del presupuesto por recortes de Medi-Cal" },
      { en: "First county-level ballot measure in the nation designed to offset H.R. 1 Medicaid cuts", es: "Primera medida a nivel de condado en la nación diseñada para compensar los recortes de Medicaid de H.R. 1" },
    ],
  },
  /* ============================================================== */
  /*  March 14, 2026                                                 */
  /* ============================================================== */
  {
    id: "ahrq-ambient-scribe-implementation-guide",
    date: "2026-03-14",
    headline: {
      en: "AHRQ Funds $2M Study on Safe AI Scribe Implementation in Primary Care",
      es: "AHRQ Financia Estudio de $2M sobre Implementación Segura de Escribas IA en Atención Primaria",
    },
    summary: {
      en: "The Agency for Healthcare Research and Quality awarded nearly $2M to Brigham and Women's Hospital to develop a prototype guide for safe integration of ambient digital scribes into primary care. The study focuses on physician burnout reduction, quality improvement, and technology usability — directly relevant for FQHCs considering AI scribe adoption. This federal validation signals ambient AI is moving from hype to evidence-based implementation.",
      es: "AHRQ otorgó casi $2M al Brigham and Women's Hospital para desarrollar una guía prototipo para la integración segura de escribas digitales ambientales en atención primaria. El estudio se centra en la reducción del agotamiento médico y la mejora de calidad.",
    },
    category: "change-management" as IntelCategory,
    impactLevel: "medium" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://digital.ahrq.gov/ahrq-funded-projects/search/download?page=&_format=csv",
    sourceOrg: "AHRQ Digital Healthcare Research",
    region: "Federal",
    tags: ["ai-adoption", "ambient-ai", "primary-care", "federal-research"],
    keyTakeaways: [
      { en: "AHRQ awarded nearly $2M to Brigham and Women's Hospital for safe AI scribe integration guide", es: "AHRQ otorgó casi $2M al Brigham and Women's Hospital para guía de integración segura de escribas IA" },
      { en: "Study focuses on physician burnout reduction, quality improvement, and technology usability", es: "El estudio se centra en reducción del agotamiento médico, mejora de calidad y usabilidad tecnológica" },
      { en: "Federal validation signals ambient AI is moving from hype to evidence-based implementation", es: "La validación federal señala que la IA ambiental pasa del hype a la implementación basada en evidencia" },
      { en: "Action: FQHCs considering AI scribes should wait for this guide before committing to a vendor", es: "Acción: FQHCs considerando escribas IA deberían esperar esta guía antes de comprometerse con un proveedor" },
    ],
  },
  {
    id: "north-coast-fqhcs-medicaid-vulnerability-2026",
    date: "2026-03-14",
    headline: {
      en: "North Coast FQHCs Brace for H.R. 1 Impact — Open Door CEO Warns 50%+ Patients on Medi-Cal",
      es: "FQHCs de la Costa Norte se Preparan para Impacto de H.R. 1 — CEO de Open Door Advierte que 50%+ Pacientes Tienen Medi-Cal",
    },
    summary: {
      en: "Open Door Community Health Centers, the largest provider of obstetrics and primary care in Humboldt and Del Norte counties, warns that over half its patients are on Medi-Cal. As other rural practices have closed over time, FQHCs like Open Door have become the only option. Partnership HealthPlan describes Medicaid as an 'economic engine' for its 24 rural counties. H.R. 1 changes won't take full effect until late 2026, creating a slow-motion crisis for North Coast safety-net providers.",
      es: "Open Door Community Health Centers, el mayor proveedor de obstetricia y atención primaria en los condados de Humboldt y Del Norte, advierte que más de la mitad de sus pacientes tienen Medi-Cal. A medida que otras prácticas rurales han cerrado, los FQHCs se han convertido en la única opción.",
    },
    category: "funding" as IntelCategory,
    impactLevel: "medium" as ImpactLevel,
    type: "news" as IntelType,
    sourceUrl: "https://lostcoastoutpost.com/2025/jul/3/local-reactions-health-care-workers-passage-trump/",
    sourceOrg: "Lost Coast Outpost",
    region: "Humboldt County",
    affectedOrgs: ["Open Door Community Health Centers"],
    affectedOrgSlugs: ["open-door-community-health-centers"],
    tags: ["north-coast", "rural-fqhc", "medicaid-cuts", "open-door"],
    keyTakeaways: [
      { en: "Open Door CHC: over 50% of patients on Medi-Cal — largest OB/primary care provider in Humboldt and Del Norte counties", es: "Open Door CHC: más del 50% de pacientes en Medi-Cal — mayor proveedor de obstetricia y atención primaria en los condados de Humboldt y Del Norte" },
      { en: "Partnership HealthPlan calls Medicaid an 'economic engine' for 24 rural counties", es: "Partnership HealthPlan llama a Medicaid un 'motor económico' para 24 condados rurales" },
      { en: "H.R. 1 changes won't take full effect until late 2026 — a slow-motion crisis for rural providers", es: "Los cambios de H.R. 1 no surtirán efecto completo hasta finales de 2026 — una crisis en cámara lenta para proveedores rurales" },
      { en: "As rural practices close, FQHCs like Open Door become the ONLY remaining option", es: "Al cerrar prácticas rurales, FQHCs como Open Door se convierten en la ÚNICA opción restante" },
    ],
  },
  /* ============================================================== */
  /*  March 13, 2026                                                 */
  /* ============================================================== */
  {
    id: "sb-1422-durazo-uis-medi-cal-restoration",
    date: "2026-03-10",
    headline: {
      en: "Sen. Durazo Introduces SB 1422 to Reverse Medi-Cal Cuts for Undocumented Adults",
      es: "Senadora Durazo Presenta SB 1422 para Revertir Recortes de Medi-Cal para Adultos Indocumentados",
    },
    summary: {
      en: "California Sen. Maria Elena Durazo (D-Los Angeles) introduced SB 1422 to restore full Medi-Cal eligibility for all income-qualifying adults regardless of immigration status — reversing the January 2026 enrollment freeze that blocked new undocumented applicants. Nearly 1.7M undocumented immigrants are currently enrolled in Medi-Cal. The freeze eliminated PPS payments to FQHCs for UIS patients, forcing health centers to absorb care costs or turn patients away.",
      es: "La senadora María Elena Durazo presentó SB 1422 para restaurar la elegibilidad completa de Medi-Cal para todos los adultos sin importar su estatus migratorio — revirtiendo la congelación de inscripción de enero 2026. Casi 1.7M de inmigrantes indocumentados están inscritos en Medi-Cal. La congelación eliminó los pagos PPS a los FQHCs para pacientes UIS.",
    },
    category: "undocumented-access",
    impactLevel: "high",
    type: "news",
    sourceUrl: "https://calmatters.org/health/2026/03/durazo-reverse-medical-undocumented-immigrants/",
    sourceOrg: "CalMatters",
    region: "California",
    affectedOrgSlugs: ["altamed-health-services", "st-johns-community-health", "comprehensive-community-health-centers", "clinica-sierra-vista", "san-ysidro-health"],
    tags: ["medi-cal", "undocumented", "sb-1422", "pps", "uis"],
    keyTakeaways: [
      { en: "SB 1422 would reverse the January 2026 enrollment freeze for undocumented adults", es: "SB 1422 revertiría la congelación de inscripción de enero 2026 para adultos indocumentados" },
      { en: "1.7M undocumented immigrants currently enrolled in Medi-Cal", es: "1.7M de inmigrantes indocumentados actualmente inscritos en Medi-Cal" },
      { en: "The freeze eliminated PPS payments to FQHCs for UIS patients — forcing health centers to absorb costs", es: "La congelación eliminó pagos PPS a FQHCs por pacientes UIS — obligando a centros de salud a absorber costos" },
      { en: "If passed, would restore PPS encounter revenue for FQHCs serving undocumented populations", es: "Si se aprueba, restauraría ingresos por encuentros PPS para FQHCs que atienden poblaciones indocumentadas" },
    ],
  },
  {
    id: "oc-hca-clinic-closures-federal-cuts",
    date: "2026-03-07",
    headline: {
      en: "Orange County Health Care Agency Closes Clinics Due to Federal Funding Cuts",
      es: "Agencia de Salud del Condado de Orange Cierra Clínicas por Recortes de Fondos Federales",
    },
    summary: {
      en: "The Orange County Health Care Agency is closing several public health clinics due to federal funding cuts, mirroring LA County's closure of 7 of 13 DPH clinics on Feb 27. Combined with $50M+ in LA County cuts, Southern California is losing significant public health infrastructure. Displaced patients are being directed to FQHCs and community health centers.",
      es: "La Agencia de Salud del Condado de Orange cierra varias clínicas de salud pública por recortes de fondos federales, reflejando el cierre de 7 de 13 clínicas de LA County. Los pacientes desplazados están siendo dirigidos a FQHCs y centros de salud comunitarios.",
    },
    category: "funding",
    impactLevel: "medium",
    type: "news",
    sourceUrl: "https://abc7.com/post/federal-funding-cuts-force-orange-county-health-care-agency-close-clinics/16162489/",
    sourceOrg: "ABC7 Los Angeles",
    region: "Orange County",
    affectedOrgSlugs: ["share-our-selves", "families-together-of-orange-county", "north-orange-county-regional-health-foundation"],
    tags: ["orange-county", "clinic-closures", "los-angeles", "federal-cuts"],
    keyTakeaways: [
      { en: "OC Health Care Agency closing several clinics — mirrors LA County's closure of 7 of 13 DPH clinics on Feb 27", es: "Agencia de Salud del Condado de Orange cierra varias clínicas — refleja el cierre de 7 de 13 clínicas de LA County el 27 de feb" },
      { en: "Combined with $50M+ in LA County cuts, Southern California is losing significant public health infrastructure", es: "Combinado con $50M+ en recortes de LA County, el sur de California pierde infraestructura significativa de salud pública" },
      { en: "Displaced patients being directed to FQHCs and community health centers", es: "Pacientes desplazados están siendo dirigidos a FQHCs y centros de salud comunitarios" },
      { en: "Action: SoCal FQHCs should prepare for patient volume surges from clinic redirections", es: "Acción: FQHCs del sur de CA deben prepararse para aumentos de volumen por redirecciones de clínicas" },
    ],
  },
  {
    id: "rand-665b-state-medicaid-decline-decade",
    date: "2026-03-04",
    headline: {
      en: "RAND: State Medicaid Budgets Will Decline by $665B Over Next Decade Under H.R. 1",
      es: "RAND: Presupuestos Estatales de Medicaid Disminuirán $665B en la Próxima Década Bajo H.R. 1",
    },
    summary: {
      en: "A RAND Health analysis published by Stateline finds state Medicaid budgets will be reduced by a total of $665 billion over the next decade under H.R. 1. With FQHCs deriving ~43% of revenue from Medicaid, the projected decline signals sustained revenue compression for California's 215 community health centers. CBO estimates 11.8M will directly lose coverage, plus 3.1M through marketplace plans.",
      es: "Un análisis de RAND Health publicado por Stateline encuentra que los presupuestos estatales de Medicaid se reducirán $665B en la próxima década bajo H.R. 1. Con los FQHCs derivando ~43% de ingresos de Medicaid, la disminución proyectada señala compresión de ingresos sostenida para los 215 centros de salud comunitarios de California.",
    },
    category: "funding",
    impactLevel: "high",
    type: "news",
    sourceUrl: "https://stateline.org/2026/03/04/state-medicaid-budgets-will-decline-by-665-billion-under-new-federal-law-report-finds/",
    sourceOrg: "Stateline / RAND Health",
    region: "Federal",
    tags: ["medicaid", "hr-1", "rand", "revenue"],
    keyTakeaways: [
      { en: "RAND: state Medicaid budgets reduced by $665 billion total over the next decade under H.R. 1", es: "RAND: presupuestos estatales de Medicaid reducidos $665 mil millones en total en la próxima década bajo H.R. 1" },
      { en: "FQHCs derive ~43% of revenue from Medicaid — sustained revenue compression ahead", es: "FQHCs derivan ~43% de ingresos de Medicaid — compresión sostenida de ingresos por venir" },
      { en: "CBO estimates 11.8M will directly lose coverage + 3.1M through marketplace plans", es: "CBO estima que 11.8M perderán cobertura directamente + 3.1M a través de planes del mercado" },
      { en: "California's 215 FQHCs face among the largest state-level revenue impacts nationally", es: "Los 215 FQHCs de California enfrentan de los mayores impactos de ingresos a nivel estatal" },
    ],
  },
  {
    id: "peterson-ambient-ai-scribes-fastest-adoption",
    date: "2026-03-13",
    headline: {
      en: "Peterson Institute: Ambient AI Scribes on Track to Be Fastest-Adopted Health Tech in History",
      es: "Instituto Peterson: Escribas de IA Ambiental en Camino a Ser la Tecnología de Salud de Adopción Más Rápida",
    },
    summary: {
      en: "A Peterson Health Technology Institute report finds ambient AI scribes are becoming one of the fastest-adopted technologies in healthcare history. For FQHCs, the technology addresses critical clinician burnout — Neighborhood Healthcare (CA FQHC, 500K+ visits, 30 facilities) successfully piloted Nabla AI scribes. However, rural FQHCs face connectivity and cost barriers, as North Country Healthcare (AZ) discovered.",
      es: "Un informe del Instituto Peterson encuentra que los escribas de IA ambiental se están convirtiendo en una de las tecnologías de adopción más rápida en la historia de la salud. Para los FQHCs, la tecnología aborda el agotamiento clínico crítico, pero los FQHCs rurales enfrentan barreras de conectividad y costo.",
    },
    category: "change-management",
    impactLevel: "medium",
    type: "strategy",
    sourceUrl: "https://www.beckershospitalreview.com/healthcare-information-technology/ai/from-pilot-to-priority-the-rise-of-ambient-ai-scribes-in-healthcare/",
    sourceOrg: "Becker's Hospital Review / Peterson Institute",
    region: "Federal",
    affectedOrgSlugs: ["neighborhood-healthcare"],
    tags: ["ai", "ambient-documentation", "clinician-burnout", "technology"],
    keyTakeaways: [
      { en: "Peterson Institute: ambient AI scribes becoming one of the fastest-adopted technologies in healthcare history", es: "Instituto Peterson: escribas de IA ambiental se convierten en una de las tecnologías de adopción más rápida en la historia de la salud" },
      { en: "Neighborhood Healthcare (CA FQHC, 500K+ visits, 30 facilities) successfully piloted Nabla AI scribes", es: "Neighborhood Healthcare (FQHC de CA, 500K+ visitas, 30 instalaciones) implementó con éxito escribas IA Nabla" },
      { en: "Rural FQHCs face connectivity and cost barriers — North Country Healthcare (AZ) encountered challenges", es: "FQHCs rurales enfrentan barreras de conectividad y costo — North Country Healthcare (AZ) encontró desafíos" },
      { en: "Action: FQHCs should evaluate AI scribe options now while early adoption advantages remain", es: "Acción: FQHCs deberían evaluar opciones de escribas IA ahora mientras las ventajas de adopción temprana persisten" },
    ],
  },
  /* ============================================================== */
  /*  REGIONAL — March 12, 2026                                      */
  /* ============================================================== */
  {
    id: "sbnc-wyatt-5m-donation-westside-expansion",
    date: "2026-03-11",
    headline: {
      en: "Santa Barbara Neighborhood Clinics Receives $5M Wyatt Family Gift — Largest in FQHC's History",
      es: "Clínicas Vecinales de Santa Barbara Reciben $5M de la Familia Wyatt — La Mayor Donación en su Historia",
    },
    summary: {
      en: "The Wyatt family of Montecito donated $5M to Santa Barbara Neighborhood Clinics — the largest family gift in the FQHC's history. The new three-story Wyatt Family Health Center (under construction at Micheltorena & San Andres) will expand capacity from 20,000 to 28,000 patients annually (+41%). Completion expected December 2026. SBNC serves 1 in 10 South SB County residents; 92% are low-income.",
      es: "La familia Wyatt de Montecito donó $5M a las Clínicas Vecinales de Santa Barbara — el mayor regalo familiar en la historia del FQHC. El nuevo Centro de Salud Familiar Wyatt expandirá la capacidad de 20,000 a 28,000 pacientes anuales (+41%). SBNC atiende a 1 de cada 10 residentes del sur del condado de SB; 92% son de bajos ingresos.",
    },
    category: "funding",
    impactLevel: "medium",
    type: "news",
    sourceUrl: "https://www.independent.com/2026/03/11/guardian-angels-drop-5-million-donation-on-new-santa-barbara-neighborhood-clinic/",
    sourceOrg: "Santa Barbara Independent",
    region: "Santa Barbara County",
    affectedOrgs: ["Santa Barbara Neighborhood Clinics"],
    affectedOrgSlugs: ["santa-barbara-neighborhood-clinics"],
    tags: ["central-coast", "santa-barbara", "philanthropy", "fqhc-expansion", "capital-campaign"],
    keyTakeaways: [
      { en: "$5M Wyatt family gift — largest family donation in SBNC's history", es: "Donación de $5M de la familia Wyatt — la mayor donación familiar en la historia de SBNC" },
      { en: "New three-story Wyatt Family Health Center expands capacity from 20,000 to 28,000 patients (+41%)", es: "Nuevo centro de tres pisos expande la capacidad de 20,000 a 28,000 pacientes (+41%)" },
      { en: "SBNC serves 1 in 10 South Santa Barbara County residents; 92% are low-income", es: "SBNC atiende a 1 de cada 10 residentes del sur del condado de SB; 92% son de bajos ingresos" },
      { en: "Completion expected December 2026 — a model of philanthropic investment during the funding crisis", es: "Terminación esperada en diciembre 2026 — un modelo de inversión filantrópica durante la crisis de financiamiento" },
    ],
  },
  {
    id: "hr-7391-340b-fqhc-protection-act",
    date: "2026-02-10",
    headline: {
      en: "Bipartisan Bill H.R. 7391 Would Exempt FQHCs from 340B Rebate Model — 35 Cosponsors",
      es: "Proyecto Bipartidista H.R. 7391 Eximiría a FQHCs del Modelo de Reembolso 340B — 35 Copatrocinadores",
    },
    summary: {
      en: "Reps. Auchincloss (D-MA) and Bergman (R-MI) introduced the Community Health Center Drug Pricing Protection Act to exempt FQHCs from HRSA's 340B Rebate Model Pilot Program. The bill mandates upfront ceiling-price purchasing — no post-purchase reconciliation. Currently has 35 cosponsors. HRSA's RFI on 340B rebates has comments due April 20, 2026. FQHCs account for 1% of healthcare spending but treat 10% of Americans.",
      es: "Los representantes Auchincloss (D-MA) y Bergman (R-MI) presentaron la Ley de Protección de Precios de Medicamentos para Centros de Salud Comunitarios para eximir a los FQHCs del Programa Piloto de Reembolso 340B. Actualmente tiene 35 copatrocinadores. Los comentarios sobre la RFI de HRSA vencen el 20 de abril de 2026.",
    },
    category: "legislation",
    impactLevel: "high",
    type: "news",
    sourceUrl: "https://auchincloss.house.gov/media/press-releases/reps-auchincloss-and-bergman-defend-fqhcs-from-financial-constraints-amidst-340b-reform",
    sourceOrg: "U.S. House of Representatives",
    region: "Federal",
    tags: ["340b", "legislation", "drug-pricing", "bipartisan", "fqhc-protection"],
    keyTakeaways: [
      { en: "Bipartisan bill H.R. 7391 would exempt FQHCs from HRSA's 340B Rebate Model Pilot Program", es: "Proyecto bipartidista H.R. 7391 eximiría a FQHCs del Programa Piloto de Reembolso 340B de HRSA" },
      { en: "Currently has 35 cosponsors — mandates upfront ceiling-price purchasing (no post-purchase reconciliation)", es: "Actualmente tiene 35 copatrocinadores — exige compra a precio tope por adelantado (sin reconciliación posterior)" },
      { en: "HRSA's RFI on 340B rebates has comments due April 20, 2026", es: "La RFI de HRSA sobre reembolsos 340B tiene fecha límite de comentarios el 20 de abril de 2026" },
      { en: "FQHCs account for 1% of healthcare spending but treat 10% of Americans", es: "FQHCs representan el 1% del gasto en salud pero tratan al 10% de los estadounidenses" },
      { en: "Action: Submit comments on HRSA RFI before April 20 deadline", es: "Acción: Enviar comentarios sobre la RFI de HRSA antes de la fecha límite del 20 de abril" },
    ],
  },
  {
    id: "kaiser-mental-health-strike-march-2026",
    date: "2026-03-05",
    headline: {
      en: "Kaiser Mental Health Workers Plan March 18 Strike Over AI Replacement Fears",
      es: "Trabajadores de Salud Mental de Kaiser Planean Huelga el 18 de Marzo por Temores de Reemplazo por IA",
    },
    summary: {
      en: "100+ mental health therapists, social workers, and psychologists at Kaiser Permanente Santa Rosa (NUHW) announced a March 18 one-day strike. The union alleges Kaiser is outsourcing jobs and replacing therapists with AI. Kaiser's HR VP called it a 'false narrative,' saying AI isn't replacing 'human assessment.' This follows the 31,000-worker nursing strike (Jan 26–Feb 24) that ended with a 21.5% raise. Displaced Kaiser mental health workers are potential FQHC recruits.",
      es: "Más de 100 terapeutas, trabajadores sociales y psicólogos en Kaiser Permanente Santa Rosa (NUHW) anunciaron una huelga de un día el 18 de marzo. El sindicato alega que Kaiser está externalizando trabajos y reemplazando terapeutas con IA. Esto sigue a la huelga de 31,000 enfermeras que terminó con un aumento del 21.5%.",
    },
    category: "workforce",
    impactLevel: "medium",
    type: "news",
    sourceUrl: "https://www.pressdemocrat.com/2026/03/05/kaiser-permanente-mental-health-workers-in-santa-rosa-set-to-strike-this-month/",
    sourceOrg: "Press Democrat",
    region: "Sonoma County",
    affectedOrgSlugs: ["petaluma-health-center", "mchc-health-centers", "redwood-community-health-coalition"],
    tags: ["bay-area", "kaiser", "mental-health", "labor-strike", "ai-replacement", "nuhw", "workforce-pipeline"],
    keyTakeaways: [
      { en: "100+ mental health therapists, social workers, and psychologists at Kaiser Santa Rosa (NUHW) announced March 18 strike", es: "100+ terapeutas, trabajadores sociales y psicólogos en Kaiser Santa Rosa (NUHW) anunciaron huelga el 18 de marzo" },
      { en: "Union alleges Kaiser outsourcing jobs and replacing therapists with AI", es: "El sindicato alega que Kaiser externaliza trabajos y reemplaza terapeutas con IA" },
      { en: "Follows the 31,000-worker nursing strike (Jan 26 - Feb 24) that ended with 21.5% raise over 4 years", es: "Sigue a la huelga de 31,000 enfermeras (26 ene - 24 feb) que terminó con aumento de 21.5% en 4 años" },
      { en: "Displaced Kaiser mental health workers are potential FQHC recruits", es: "Trabajadores desplazados de salud mental de Kaiser son potenciales reclutas para FQHCs" },
    ],
  },
  {
    id: "geiger-gibson-medicaid-cuts-fqhc-medicare-impact",
    date: "2026-03-01",
    headline: {
      en: "GWU Research: Medicaid Cuts Will Also Devastate FQHC Medicare Patients — Cross-Subsidy at Risk",
      es: "Investigación GWU: Recortes de Medicaid También Devastarán Pacientes de Medicare en FQHCs — Subsidio Cruzado en Riesgo",
    },
    summary: {
      en: "Geiger Gibson Program at GWU finds Medicaid cuts won't just affect Medicaid patients — they'll undermine care for 7.4M Medicare patients at community health centers. FQHCs use Medicaid revenue to cross-subsidize Medicare and uninsured care. If Medicaid volume drops, health centers may reduce hours, close sites, or cut services that Medicare patients depend on. CHCs operated at -2% average margin in 2024.",
      es: "El Programa Geiger Gibson en GWU encuentra que los recortes de Medicaid no solo afectarán a pacientes de Medicaid — socavarán la atención de 7.4M pacientes de Medicare en centros de salud comunitarios. Si el volumen de Medicaid disminuye, los centros pueden reducir horarios, cerrar sitios o recortar servicios.",
    },
    category: "funding",
    impactLevel: "high",
    type: "news",
    sourceUrl: "https://geigergibson.publichealth.gwu.edu/three-key-things-know-about-how-medicaid-cuts-will-impact-community-health-center-medicare-patients",
    sourceOrg: "Geiger Gibson Program / GWU",
    region: "Federal",
    tags: ["medicaid", "medicare", "cross-subsidy", "research", "fqhc-finances"],
    keyTakeaways: [
      { en: "Medicaid cuts will also undermine care for 7.4M Medicare patients at community health centers", es: "Recortes de Medicaid también socavarán atención de 7.4M pacientes de Medicare en centros de salud comunitarios" },
      { en: "FQHCs use Medicaid revenue to cross-subsidize Medicare and uninsured care", es: "FQHCs usan ingresos de Medicaid para subsidiar cruzadamente la atención de Medicare y pacientes sin seguro" },
      { en: "CHCs operated at -2% average margin in 2024 — no cushion to absorb further losses", es: "CHCs operaron con margen promedio de -2% en 2024 — sin colchón para absorber más pérdidas" },
      { en: "Risk: reduced hours, site closures, or service cuts that Medicare patients depend on", es: "Riesgo: horarios reducidos, cierres de sitios o recortes de servicios de los que dependen pacientes de Medicare" },
    ],
  },
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
    keyTakeaways: [
      { en: "SD County supervisors approved 4-1 to overhaul County Medical Services — served fewer than 40 people last year", es: "Supervisores del condado de SD aprobaron 4-1 la reforma de Servicios Médicos del Condado — atendió a menos de 40 personas el año pasado" },
      { en: "327,000 Medi-Cal recipients at risk from H.R. 1 in San Diego County", es: "327,000 beneficiarios de Medi-Cal en riesgo por H.R. 1 en el condado de San Diego" },
      { en: "Supervisor proposes 'Safety Net Bridge' primary care clinics for anyone losing coverage", es: "Supervisora propone clínicas de atención primaria 'Puente de Red de Seguridad' para quienes pierdan cobertura" },
      { en: "Half-cent sales tax could generate $360M/year; county faces $200-300M/year in additional costs by 2028", es: "Impuesto de medio centavo podría generar $360M/año; condado enfrenta $200-300M/año en costos adicionales para 2028" },
    ],
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
    keyTakeaways: [
      { en: "Neighborhood Healthcare warns 'hundreds of California FQHCs face closure within a year'", es: "Neighborhood Healthcare advierte que 'cientos de FQHCs de California enfrentan cierre dentro de un año'" },
      { en: "75,000 noncitizens in SD County will lose Medi-Cal access by October 2026", es: "75,000 no ciudadanos en el condado de SD perderán acceso a Medi-Cal para octubre de 2026" },
      { en: "Healthcare leaders predict hospitals will be 'overrun' as clinics close", es: "Líderes de salud predicen que los hospitales serán 'desbordados' al cerrar clínicas" },
      { en: "Palomar Health, Sharp HealthCare also bracing for impact", es: "Palomar Health, Sharp HealthCare también se preparan para el impacto" },
    ],
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
    affectedOrgSlugs: ["borrego-health", "sac-health", "riverside-university-health-system-chc", "community-health-systems-inc", "inland-faculty-medical-group"],
    tags: ["inland-empire", "snap-ed", "nutrition", "public-health", "hr-1"],
    keyTakeaways: [
      { en: "San Bernardino and Riverside nutrition programs close April 30, 2026; LA County's closes June 30", es: "Programas de nutrición de San Bernardino y Riverside cierran el 30 de abril de 2026; el de LA County el 30 de junio" },
      { en: "H.R. 1 eliminated the $536M SNAP-Ed program nationwide", es: "H.R. 1 eliminó el programa SNAP-Ed de $536M a nivel nacional" },
      { en: "Programs operated for decades through schools, clinics, farmers markets, and community events", es: "Los programas operaron por décadas a través de escuelas, clínicas, mercados de agricultores y eventos comunitarios" },
      { en: "Closures disproportionately affect communities already facing food and health challenges", es: "Los cierres afectan desproporcionadamente a comunidades que ya enfrentan desafíos alimentarios y de salud" },
    ],
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
    keyTakeaways: [
      { en: "188 layoffs blocked by Board of Supervisors after SEIU 1021 mobilization — but $91.7M deficit unresolved", es: "188 despidos bloqueados por la Junta de Supervisores tras movilización de SEIU 1021 — pero déficit de $91.7M sin resolver" },
      { en: "AHS operates the ONLY Level 1 Trauma Center in Alameda County (Highland Hospital)", es: "AHS opera el ÚNICO Centro de Trauma Nivel 1 en el Condado de Alameda (Highland Hospital)" },
      { en: "4 FQHC wellness centers serve 40,000+ patients — potential patient surges if outpatient services cut", es: "4 centros de bienestar FQHC atienden a 40,000+ pacientes — posibles aumentos si se reducen servicios ambulatorios" },
      { en: "Action: FQHCs in Alameda County should prepare for patient redistribution if AHS reduces services", es: "Acción: FQHCs en el Condado de Alameda deben prepararse para redistribución de pacientes si AHS reduce servicios" },
    ],
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
    affectedOrgSlugs: ["san-francisco-community-health-center", "north-east-medical-services", "healthright-360"],
    tags: ["budget-cuts", "bay-area", "san-francisco", "dph", "medi-cal", "county-funding"],
    paywalled: true,
    keyTakeaways: [
      { en: "$17M in DPH budget cuts for FY2026-27 — driven by declining federal reimbursements + rising labor costs", es: "$17M en recortes de presupuesto del DPH para FY2026-27 — por reembolsos federales en declive + costos laborales crecientes" },
      { en: "SF Community Health Center, NEMS, HealthRIGHT 360 anticipate reduced county contract funding", es: "SF CHC, NEMS, HealthRIGHT 360 anticipan reducción en fondos de contratos del condado" },
      { en: "SF adding 2,400+ new Medi-Cal enrollees monthly — demand rising as funding falls", es: "SF agrega 2,400+ nuevos inscritos en Medi-Cal mensualmente — demanda sube mientras fondos caen" },
      { en: "Action: Model 10-15% reductions in local funding and review county contract terms now", es: "Acción: Modelar reducciones del 10-15% en fondos locales y revisar términos de contratos del condado ahora" },
    ],
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
    keyTakeaways: [
      { en: "~$600M in CDC grants rescinded from California as part of HHS restructuring and DOGE push", es: "~$600M en subvenciones del CDC rescindidas de California como parte de la reestructuración del HHS y el impulso DOGE" },
      { en: "Affected programs: chronic disease prevention, immunization outreach, STI screening — all core FQHC services", es: "Programas afectados: prevención de enfermedades crónicas, vacunación, detección de ITS — todos servicios centrales de FQHC" },
      { en: "California and 22 other states have filed suit challenging the cuts", es: "California y otros 22 estados han demandado para impugnar los recortes" },
      { en: "Action: FQHCs receiving CDC pass-through funding should immediately audit grant dependence", es: "Acción: FQHCs que reciben fondos CDC deben auditar inmediatamente la dependencia de subvenciones" },
    ],
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
    paywalled: true,
    keyTakeaways: [
      { en: "Ryan White HIV/AIDS funding abruptly terminated — first direct federal cut to an SF FQHC", es: "Fondos Ryan White de VIH/SIDA terminados abruptamente — primer recorte federal directo a un FQHC de SF" },
      { en: "3,000+ patients served — many LGBTQ+ and API communities", es: "3,000+ pacientes atendidos — muchas comunidades LGBTQ+ y API" },
      { en: "SF DPH exploring emergency bridge funding", es: "DPH de SF explorando fondos de emergencia puente" },
      { en: "Signals escalating risk for ALL HRSA-dependent programs across the state", es: "Señala riesgo creciente para TODOS los programas dependientes de HRSA en todo el estado" },
    ],
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
    keyTakeaways: [
      { en: "La Clínica de La Raza disclosed a data breach — unauthorized access to patient health records", es: "La Clínica de La Raza reveló una violación de datos — acceso no autorizado a registros de salud de pacientes" },
      { en: "Serves 90,000+ patients across Alameda, Contra Costa, and Solano counties", es: "Atiende a más de 90,000 pacientes en los condados de Alameda, Contra Costa y Solano" },
      { en: "73% of health centers reported a cyber incident in the past 2 years per NACHC surveys", es: "El 73% de los centros de salud reportaron un incidente cibernético en los últimos 2 años según NACHC" },
      { en: "Action: FQHCs should review cybersecurity posture, conduct breach response drills, and update BAAs", es: "Acción: FQHCs deben revisar su postura de ciberseguridad, realizar simulacros de respuesta a brechas y actualizar BAAs" },
    ],
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
    paywalled: true,
    keyTakeaways: [
      { en: "$183M in cuts to Health & Hospital System — driven by $325M structural deficit", es: "$183M en recortes al Sistema de Salud y Hospitales — por un déficit estructural de $325M" },
      { en: "Valley Health Center network (9 FQHC sites, 120K+ patients) faces clinic closures and reduced hours", es: "Red de Valley Health Center (9 sitios FQHC, 120K+ pacientes) enfrenta cierres y horarios reducidos" },
      { en: "Indian Health Center + School Health Clinics may lose county supplemental funding", es: "Indian Health Center + School Health Clinics podrían perder fondos suplementarios del condado" },
      { en: "Action: Prepare contingency plans for patient redistribution in South Bay", es: "Acción: Preparar planes de contingencia para redistribución de pacientes en South Bay" },
    ],
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
    keyTakeaways: [
      { en: "Ambient AI scribes increasingly deployed to capture more revenue through intensive coding, not just burnout reduction", es: "Escribas de IA ambiental cada vez más desplegados para capturar más ingresos por codificación intensiva, no solo reducción de agotamiento" },
      { en: "Riverside Health saw 11% rise in physician wRVUs and 14% increase in HCC diagnoses per encounter", es: "Riverside Health vio un aumento del 11% en wRVUs de médicos y 14% en diagnósticos HCC por encuentro" },
      { en: "For FQHCs under PPS, coding intensity impact is different — but value-based contracts need monitoring", es: "Para FQHCs bajo PPS, el impacto de la intensidad de codificación es diferente — pero los contratos basados en valor necesitan monitoreo" },
      { en: "Action: FQHCs in value-based contracts should monitor whether AI notes are inflating risk scores", es: "Acción: FQHCs en contratos basados en valor deben monitorear si las notas de IA están inflando puntajes de riesgo" },
    ],
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
    affectedOrgSlugs: ["sacramento-county-primary", "wellspace-health", "elica-health-centers", "one-community-health"],
    tags: ["sacramento", "federal-cuts", "hhs", "cdc-grants", "patient-volume"],
    keyTakeaways: [
      { en: "Sacramento County risks losing $26M in federal health funding after HHS rescinds COVID-era CDC grants", es: "Sacramento County arriesga perder $26M en fondos federales de salud tras la rescisión de subvenciones CDC" },
      { en: "California and 22 other states have filed suit challenging the cuts", es: "California y otros 22 estados han demandado para impugnar los recortes" },
      { en: "Sacramento FQHCs grew from 10 to 29 facilities in 8 years — may face patient surges as county services contract", es: "FQHCs de Sacramento crecieron de 10 a 29 instalaciones en 8 años — podrían enfrentar aumentos de pacientes al reducirse servicios del condado" },
    ],
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
    affectedOrgSlugs: ["comprehensive-community-health-centers"],
    tags: ["expansion", "nevada", "fqhc-growth", "los-angeles", "transparent-pricing"],
    keyTakeaways: [
      { en: "CCHC (LA County FQHC) opened first out-of-state location in Las Vegas on March 2", es: "CCHC (FQHC del Condado de LA) abrió su primera ubicación fuera del estado en Las Vegas el 2 de marzo" },
      { en: "Grew from 45,000 visits in 2004 to 177,000+ by 2023 — signals FQHC network sophistication", es: "Creció de 45,000 visitas en 2004 a 177,000+ en 2023 — señala sofisticación de redes FQHC" },
      { en: "Transparent pricing model: $125 new patient visits with walk-in access", es: "Modelo de precios transparentes: $125 visitas de nuevos pacientes con acceso sin cita" },
      { en: "Could inform California FQHC expansion strategies as in-state financial pressures mount", es: "Podría informar estrategias de expansión de FQHCs de California ante presiones financieras internas" },
    ],
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
    affectedOrgSlugs: ["lifelong-medical-care", "asian-health-services", "la-clinica-de-la-raza", "healthright-360"],
    tags: ["ai", "street-medicine", "unhoused", "calAIM", "ecm", "scope-expansion", "chw"],
    keyTakeaways: [
      { en: "ScopeAI: tablet-guided CHW visits with 92% diagnostic accuracy, remote physician review, MAT within 4 hours", es: "ScopeAI: visitas de CHW guiadas por tableta con 92% de precisión diagnóstica, revisión médica remota, MAT en 4 horas" },
      { en: "In LA/Kern: serves 6,000 unhoused patients with 70% retention and 40% ED reduction", es: "En LA/Kern: atiende a 6,000 pacientes sin hogar con 70% de retención y 40% de reducción de urgencias" },
      { en: "Entirely funded by Medi-Cal CalAIM ECM — no grants needed", es: "Financiado completamente por CalAIM ECM de Medi-Cal — sin subvenciones necesarias" },
      { en: "Raises questions about AI experimentation on vulnerable populations and CHW scope expansion via technology", es: "Plantea preguntas sobre experimentación con IA en poblaciones vulnerables y expansión del alcance de CHW mediante tecnología" },
    ],
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
    keyTakeaways: [
      { en: "$1 trillion in national Medicaid cuts over 10 years — largest in U.S. history", es: "$1 billón en recortes nacionales a Medicaid en 10 años — los mayores en la historia de EE.UU." },
      { en: "California projected to lose $30 billion annually in Medicaid funding", es: "California proyectado a perder $30 mil millones anualmente en fondos de Medicaid" },
      { en: "Work requirements, enrollment freezes, and PPS rate changes directly threaten FQHC funding models", es: "Requisitos de trabajo, congelamiento de inscripción y cambios en tarifas PPS amenazan directamente modelos de financiamiento de FQHCs" },
    ],
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
    keyTakeaways: [
      { en: "CA Attorney General sues over federal clawback of $600 million in health funding", es: "Fiscal General de CA demanda por recuperación federal de $600 millones en fondos de salud" },
      { en: "Cuts argued to violate federal spending agreements and disproportionately harm safety-net providers", es: "Se argumenta que los recortes violan acuerdos de gasto federal y perjudican desproporcionadamente a proveedores de red de seguridad" },
      { en: "FQHCs are among the safety-net providers most affected by these cuts", es: "Los FQHCs están entre los proveedores de red de seguridad más afectados por estos recortes" },
    ],
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
    keyTakeaways: [
      { en: "CHW services are now a billable Medi-Cal benefit — most significant CHW workforce change in a decade", es: "Los servicios de CHW ahora son un beneficio facturable de Medi-Cal — el cambio más significativo para la fuerza laboral CHW en una década" },
      { en: "FQHCs can bill for CHW encounters, creating sustainable funding beyond grants", es: "Los FQHCs pueden facturar por encuentros de CHW, creando financiamiento sostenible más allá de subvenciones" },
      { en: "Action: FQHCs should integrate CHW billing codes into their EHR workflows immediately", es: "Acción: los FQHCs deben integrar códigos de facturación CHW en sus flujos de trabajo de EHR inmediatamente" },
    ],
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
    keyTakeaways: [
      { en: "CA healthcare minimum wage reaches $25/hr for FQHC workers by 2027", es: "El salario mínimo de salud de CA alcanza $25/hr para trabajadores de FQHC para 2027" },
      { en: "Raises floors for MAs, front desk, and entry-level clinical staff", es: "Eleva pisos salariales para MAs, recepción y personal clínico de nivel inicial" },
      { en: "Compresses wage differentials for experienced workers — may increase turnover at mid-level", es: "Comprime diferenciales salariales para trabajadores experimentados — puede aumentar rotación en nivel medio" },
    ],
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
    keyTakeaways: [
      { en: "Initiative #25-0008: FQHCs must spend at least 90% of revenue on direct patient care", es: "Iniciativa #25-0008: FQHCs deben gastar al menos 90% de ingresos en atención directa al paciente" },
      { en: "Full financial transparency reporting would be required", es: "Se requeriría información de transparencia financiera completa" },
      { en: "Could fundamentally reshape FQHC administration budgets and executive compensation if passed", es: "Podría remodelar fundamentalmente los presupuestos administrativos de FQHCs y compensación ejecutiva si se aprueba" },
      { en: "Potential November 2026 ballot — FQHC leaders should track signature gathering progress", es: "Posible boleta de noviembre 2026 — líderes de FQHC deben seguir el progreso de recolección de firmas" },
    ],
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
    affectedOrgSlugs: ["altamed-health-services", "st-johns-community-health", "comprehensive-community-health-centers", "clinica-sierra-vista", "san-ysidro-health"],
    tags: ["undocumented", "medi-cal", "enrollment-freeze", "restoration"],
    keyTakeaways: [
      { en: "Legislation aims to reverse Medi-Cal enrollment freeze for undocumented adults (frozen Jan 2026)", es: "Legislación busca revertir el congelamiento de inscripción Medi-Cal para adultos indocumentados (congelado ene 2026)" },
      { en: "If successful, would restore PPS encounter revenue for FQHCs serving undocumented populations", es: "Si tiene éxito, restauraría ingresos por encuentros PPS para FQHCs que sirven a poblaciones indocumentadas" },
      { en: "Cites public health and economic costs of coverage gaps as justification", es: "Cita costos de salud pública y económicos de las brechas de cobertura como justificación" },
    ],
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
    affectedOrgSlugs: ["altamed-health-services", "st-johns-community-health", "comprehensive-community-health-centers", "clinica-sierra-vista", "san-ysidro-health", "la-maestra-community-health-centers", "kheir-clinic", "umma-community-clinic"],
    tags: ["undocumented", "medi-cal", "enrollment-freeze", "revenue-impact", "in-effect"],
    keyTakeaways: [
      { en: "New Medi-Cal enrollment halted for undocumented adults ages 26-49 as of January 1, 2026", es: "Nueva inscripción en Medi-Cal detenida para adultos indocumentados de 26-49 años desde el 1 de enero de 2026" },
      { en: "Saves $77.9M in 2025-26 but rises to $3.3B annually by 2028-29", es: "Ahorra $77.9M en 2025-26 pero sube a $3.3 mil millones anuales para 2028-29" },
      { en: "1.7M undocumented Californians currently have Medi-Cal coverage", es: "1.7M californianos indocumentados actualmente tienen cobertura Medi-Cal" },
      { en: "FQHCs must serve new undocumented patients on sliding fee scale with no encounter revenue", es: "Los FQHCs deben atender a nuevos pacientes indocumentados en escala de tarifa variable sin ingresos por encuentro" },
    ],
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
    affectedOrgSlugs: ["altamed-health-services", "san-ysidro-health", "family-health-centers-of-san-diego", "clinica-sierra-vista", "la-maestra-community-health-centers"],
    tags: ["undocumented", "dental", "medi-cal", "revenue-impact"],
    keyTakeaways: [
      { en: "Dental benefits eliminated for undocumented Medi-Cal enrollees effective July 1, 2026", es: "Beneficios dentales eliminados para inscritos indocumentados de Medi-Cal efectivo 1 de julio de 2026" },
      { en: "Saves $308M in 2026-27 and $336M annually thereafter", es: "Ahorra $308M en 2026-27 y $336M anualmente en adelante" },
      { en: "FQHCs with dental programs will lose all dental encounter revenue for undocumented patients", es: "FQHCs con programas dentales perderán todos los ingresos por encuentros dentales para pacientes indocumentados" },
    ],
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
    affectedOrgSlugs: ["altamed-health-services", "st-johns-community-health", "comprehensive-community-health-centers", "clinica-sierra-vista", "san-ysidro-health", "la-maestra-community-health-centers", "kheir-clinic", "umma-community-clinic"],
    tags: ["undocumented", "pps", "revenue-impact", "fee-schedule"],
    keyTakeaways: [
      { en: "PPS rates ($200-400/visit) replaced by lower Medi-Cal Fee Schedule for undocumented services", es: "Tarifas PPS ($200-400/visita) reemplazadas por tarifas más bajas del Cuadro de Tarifas de Medi-Cal para servicios a indocumentados" },
      { en: "Represents a 50-70% per-encounter revenue cut for these patients", es: "Representa un recorte de ingresos del 50-70% por encuentro para estos pacientes" },
      { en: "Effective October 1, 2026 — FQHCs with large undocumented populations face severe shortfalls", es: "Vigente 1 de octubre de 2026 — FQHCs con grandes poblaciones indocumentadas enfrentan graves déficits" },
    ],
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
    keyTakeaways: [
      { en: "H.R. 1 allows states to impose up to $35 Medicaid copays — but FQHCs are exempt by statute", es: "H.R. 1 permite a los estados imponer copagos de hasta $35 de Medicaid — pero los FQHCs están exentos por ley" },
      { en: "Patients face copays at hospitals and private clinics but NOT at FQHCs", es: "Los pacientes enfrentan copagos en hospitales y clínicas privadas pero NO en FQHCs" },
      { en: "Action: proactively market this exemption to attract and retain patients", es: "Acción: promover activamente esta exención para atraer y retener pacientes" },
    ],
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
    keyTakeaways: [
      { en: "$4.6B Community Health Center Fund — largest increase in a decade", es: "Fondo de Centros de Salud Comunitarios de $4.6B — mayor aumento en una década" },
      { en: "Expires December 31, 2026 without reauthorization — creating funding cliff", es: "Expira el 31 de diciembre de 2026 sin reautorización — creando precipicio de financiamiento" },
      { en: "NACHC released policy papers on 340B protection, workforce pipeline, telehealth permanence", es: "NACHC publicó documentos de política sobre protección 340B, fuerza laboral, permanencia de telesalud" },
      { en: "Program posted 2% patient loss in 2025 — structural decline even before H.R. 1", es: "El programa registró pérdida de 2% de pacientes en 2025 — declive estructural incluso antes de H.R. 1" },
    ],
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
    keyTakeaways: [
      { en: "HRSA FY2026 grants shifting priorities toward chronic disease prevention, nutrition, mental health", es: "Subvenciones HRSA FY2026 cambiando prioridades hacia prevención de enfermedades crónicas, nutrición, salud mental" },
      { en: "FQHCs must align grant proposals with 'Make America Healthy Again' priorities", es: "FQHCs deben alinear propuestas de subvenciones con prioridades 'Make America Healthy Again'" },
      { en: "Action: align renewal applications with MAHA priorities to maximize competitiveness", es: "Acción: alinear solicitudes de renovación con prioridades MAHA para maximizar competitividad" },
    ],
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
    keyTakeaways: [
      { en: "Low-interest loan program for FQHC facility expansions, equipment, and care infrastructure", es: "Programa de préstamos a bajo interés para expansiones de instalaciones de FQHC, equipamiento e infraestructura de atención" },
      { en: "Alternative to traditional lending for safety-net providers facing capital constraints", es: "Alternativa a préstamos tradicionales para proveedores de red de seguridad con restricciones de capital" },
      { en: "Integrates community development financing with health center needs", es: "Integra financiamiento de desarrollo comunitario con necesidades de centros de salud" },
    ],
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
    keyTakeaways: [
      { en: "CalAIM waiver expires December 31, 2026 — $1.2B/year in ECM/Community Supports at stake", es: "Exención CalAIM expira 31 de diciembre de 2026 — $1.2B/año en ECM/Apoyos Comunitarios en juego" },
      { en: "Thousands of care coordination, CHW, and housing navigator positions threatened", es: "Miles de puestos de coordinación de cuidado, CHW y navegadores de vivienda amenazados" },
      { en: "Action: build ECM caseload NOW while the waiver is active", es: "Acción: construir carga de casos ECM AHORA mientras la exención está activa" },
    ],
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
    keyTakeaways: [
      { en: "HCAI CHW Advisory Workgroup continues through June 2026, but 2024 budget cuts eliminated most HCAI funding", es: "Grupo Asesor CHW de HCAI continúa hasta junio 2026, pero recortes del presupuesto 2024 eliminaron la mayoría del financiamiento" },
      { en: "CHW certification guidance paused since November 2023 — SB 803 rules still pending", es: "Guía de certificación CHW pausada desde noviembre 2023 — reglas de SB 803 aún pendientes" },
      { en: "Medi-Cal CHW billing codes (active since Jul 2022) remain in place — FQHCs can still bill", es: "Códigos de facturación Medi-Cal para CHW (activos desde jul 2022) siguen vigentes — FQHCs pueden seguir facturando" },
    ],
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
    keyTakeaways: [
      { en: "CPEHN advancing inclusionary hiring policies to strengthen community representation at FQHCs", es: "CPEHN avanzando políticas de contratación inclusiva para fortalecer representación comunitaria en FQHCs" },
      { en: "Aligns with CLAS Standards — emphasizes hiring from communities served", es: "Se alinea con Estándares CLAS — enfatiza contratación desde las comunidades atendidas" },
      { en: "Critical where 90%+ of patients are Latino but leadership demographics don't match", es: "Crítico donde más del 90% de pacientes son latinos pero la demografía de liderazgo no coincide" },
    ],
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
    affectedOrgSlugs: ["county-of-santa-clara", "indian-health-center-of-santa-clara-valley", "school-health-clinics-of-santa-clara-county", "gardner-health-services"],
    tags: ["layoffs", "county-cuts", "budget-deficit"],
    keyTakeaways: [
      { en: "365 FTE positions eliminated across Santa Clara County healthcare system", es: "365 puestos FTE eliminados en el sistema de salud del Condado de Santa Clara" },
      { en: "Part of $183M in cuts to address a $470M county budget deficit", es: "Parte de $183M en recortes para abordar un déficit presupuestario de $470M del condado" },
      { en: "Affected roles span clinical, administrative, and support staff", es: "Los puestos afectados abarcan personal clínico, administrativo y de apoyo" },
      { en: "County cites declining federal reimbursements and rising labor costs", es: "El condado cita disminución de reembolsos federales y aumento de costos laborales" },
    ],
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
    affectedOrgSlugs: ["altamed-health-services", "st-johns-community-health", "northeast-valley-health-corporation", "eisner-health", "south-central-family-health-center"],
    tags: ["layoffs", "managed-care", "warn-act", "ecm-impact"],
    keyTakeaways: [
      { en: "225 employees laid off at L.A. Care — nation's largest publicly operated health plan", es: "225 empleados despedidos en L.A. Care — el plan de salud público más grande del país" },
      { en: "WARN Act notice filed, effective March 13, 2026", es: "Aviso WARN Act presentado, efectivo 13 de marzo de 2026" },
      { en: "As major ECM contractor for LA-area FQHCs, cuts may ripple into FQHC contract revenue", es: "Como contratista importante de ECM para FQHCs del área de LA, los recortes pueden afectar ingresos por contratos de FQHCs" },
    ],
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
    affectedOrgSlugs: ["alameda-health-system"],
    tags: ["layoffs", "deferred", "dsh-funding", "mental-health", "working-group"],
    keyTakeaways: [
      { en: "187 planned layoffs (211 positions) at AHS deferred — were set for March 9", es: "187 despidos planificados (211 puestos) en AHS aplazados — estaban programados para el 9 de marzo" },
      { en: "Board created working group to explore alternatives to mental health program closures", es: "La Junta creó grupo de trabajo para explorar alternativas a cierres de programas de salud mental" },
      { en: "AHS projects losing $100M+ annually from federal Medicaid cuts under H.R. 1", es: "AHS proyecta perder más de $100M anuales por recortes federales de Medicaid bajo H.R. 1" },
    ],
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
    keyTakeaways: [
      { en: "55% of community health centers face critical staffing shortages", es: "55% de los centros de salud comunitarios enfrentan escasez crítica de personal" },
      { en: "Vacancy rates exceed 20% for physicians, nurses, and behavioral health providers", es: "Las tasas de vacantes superan el 20% para médicos, enfermeras y proveedores de salud conductual" },
      { en: "5.6 million patients could lose coverage under proposed work requirements — $32B revenue loss nationally", es: "5.6 millones de pacientes podrían perder cobertura bajo requisitos de trabajo propuestos — pérdida de $32B a nivel nacional" },
    ],
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
    keyTakeaways: [
      { en: "Indian Health Center of Santa Clara Valley permanently closed — 21 employees displaced", es: "Indian Health Center de Santa Clara Valley cerró permanentemente — 21 empleados desplazados" },
      { en: "Served Native American and Alaska Native communities with primary care, dental, BH, and traditional healing", es: "Servía a comunidades nativas americanas con atención primaria, dental, salud conductual y sanación tradicional" },
      { en: "Significant loss for tribal healthcare access in Silicon Valley", es: "Pérdida significativa para el acceso a salud tribal en Silicon Valley" },
    ],
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
    affectedOrgSlugs: ["united-health-centers", "family-healthcare-network", "clinica-sierra-vista", "camarena-health", "golden-valley-health-centers"],
    tags: ["central-valley", "farmworkers", "medi-cal", "financial-distress"],
    keyTakeaways: [
      { en: "SJV FQHCs warn of financial 'tsunami' as federal Medicaid cuts compound with rising costs", es: "FQHCs del Valle de San Joaquín advierten de 'tsunami' financiero por recortes de Medicaid y costos crecientes" },
      { en: "Region serves predominantly Latino farmworker populations with high Medi-Cal dependency", es: "La región sirve poblaciones predominantemente latinas de trabajadores agrícolas con alta dependencia de Medi-Cal" },
      { en: "Exceptionally vulnerable to per-capita cap models and work requirements", es: "Excepcionalmente vulnerable a modelos de tope per cápita y requisitos de trabajo" },
    ],
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
    keyTakeaways: [
      { en: "43% of all healthcare M&A in 2025 was driven by financial distress — a record high (Kaufman Hall)", es: "43% de todas las fusiones y adquisiciones en salud en 2025 fue por dificultades financieras — récord histórico (Kaufman Hall)" },
      { en: "Financially stressed hospitals being acquired or closed push patients to remaining safety-net providers", es: "Hospitales con dificultades financieras adquiridos o cerrados empujan pacientes a proveedores de red de seguridad restantes" },
      { en: "Action: monitor local hospital financial health and prepare for patient volume surges", es: "Acción: monitorear la salud financiera de hospitales locales y prepararse para aumentos de volumen de pacientes" },
    ],
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
    keyTakeaways: [
      { en: "United Health Centers launched for-profit IPA: United Physicians Network", es: "United Health Centers lanzó IPA con fines de lucro: United Physicians Network" },
      { en: "Unusual FQHC-to-IPA expansion may signal new revenue diversification model for large FQHCs", es: "Expansión inusual de FQHC a IPA podría señalar nuevo modelo de diversificación de ingresos para FQHCs grandes" },
      { en: "Aims to capture managed care capitation revenue beyond traditional PPS encounters", es: "Busca capturar ingresos de capitación de atención administrada más allá de encuentros PPS tradicionales" },
    ],
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
    affectedOrgSlugs: ["altamed-health-services", "st-johns-community-health", "south-central-family-health-center", "watts-healthcare-corporation"],
    tags: ["private-equity", "closures", "patient-displacement"],
    keyTakeaways: [
      { en: "Private equity-backed Prospect Medical Holdings closing facilities and selling assets across LA County", es: "Prospect Medical Holdings, respaldado por capital privado, cerrando instalaciones y vendiendo activos en el condado de LA" },
      { en: "Closures in underserved areas push more patients toward FQHCs without corresponding funding increases", es: "Los cierres en áreas desatendidas empujan más pacientes hacia FQHCs sin aumentos de financiamiento correspondientes" },
      { en: "FQHCs near Prospect facilities should prepare for increased patient volume and acuity", es: "FQHCs cerca de instalaciones de Prospect deben prepararse para mayor volumen y agudeza de pacientes" },
    ],
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
    keyTakeaways: [
      { en: "PPS rates for undocumented patient services drop Oct 2026 — FQHCs must decide: absorb the loss or restrict services", es: "Tarifas PPS para servicios a pacientes indocumentados bajan en octubre 2026 — FQHCs deben decidir: absorber la pérdida o restringir servicios" },
      { en: "Maximize 340B drug pricing savings to cross-subsidize reduced PPS revenue", es: "Maximizar ahorros de precios de medicamentos 340B para subsidiar cruzadamente ingresos PPS reducidos" },
      { en: "Renegotiate managed care contracts and apply for HRSA New Access Points or expanded scope grants", es: "Renegociar contratos de atención administrada y solicitar subvenciones HRSA de Nuevos Puntos de Acceso o alcance expandido" },
      { en: "Partner with county indigent care programs for supplemental funding to maintain sliding fee access", es: "Asociarse con programas de cuidado indigente del condado para financiamiento suplementario y mantener acceso a tarifa variable" },
    ],
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
    keyTakeaways: [
      { en: "New Medi-Cal enrollment frozen for undocumented adults ages 26-49 — FQHCs must proactively communicate doors remain open", es: "Nueva inscripción de Medi-Cal congelada para adultos indocumentados de 26-49 — FQHCs deben comunicar proactivamente que las puertas permanecen abiertas" },
      { en: "Deploy bilingual CHWs and promotora networks to community events, churches, legal aid, and consulates", es: "Desplegar CHWs bilingües y redes de promotoras en eventos comunitarios, iglesias, asistencia legal y consulados" },
      { en: "FQHCs never report immigration status — emphasize this in all outreach messaging", es: "FQHCs nunca reportan estatus migratorio — enfatizar esto en todos los mensajes de alcance" },
      { en: "Focus messaging on sliding fee scale, no-copay visits, and FQHC statutory protections", es: "Enfocar mensajes en escala de tarifa variable, visitas sin copago y protecciones legales de FQHCs" },
    ],
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
    keyTakeaways: [
      { en: "Contract pharmacy arrangements can generate $500K-$2M annually in 340B savings", es: "Acuerdos de farmacia por contrato pueden generar $500K-$2M anuales en ahorros 340B" },
      { en: "Stack grants: HRSA Quality Improvement, SAMHSA CCBHC, state HCAI workforce grants", es: "Apilar subvenciones: Mejora de Calidad HRSA, CCBHC de SAMHSA, subvenciones de fuerza laboral HCAI estatales" },
      { en: "Use CalAIM Community Supports as new revenue streams when renegotiating MCO contracts", es: "Usar Community Supports de CalAIM como nuevas fuentes de ingresos al renegociar contratos MCO" },
      { en: "Bill CHW encounters under new Medi-Cal codes and implement co-visit billing systematically", es: "Facturar encuentros de CHW bajo nuevos códigos Medi-Cal e implementar facturación de co-visitas sistemáticamente" },
    ],
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
    keyTakeaways: [
      { en: "Fear of immigration enforcement is driving undocumented patients away from healthcare — even from FQHCs", es: "El miedo a la aplicación migratoria está alejando a pacientes indocumentados de la atención médica — incluso de FQHCs" },
      { en: "Post multilingual signage stating FQHC does not collect or share immigration status", es: "Colocar señalización multilingüe indicando que el FQHC no recopila ni comparte estatus migratorio" },
      { en: "Train all front desk staff to verbally reassure patients about confidentiality protections", es: "Capacitar a todo el personal de recepción para tranquilizar verbalmente a pacientes sobre protecciones de confidencialidad" },
      { en: "Use community radio and social media in Spanish, Vietnamese, and Mandarin for outreach", es: "Usar radio comunitaria y redes sociales en español, vietnamita y mandarín para alcance" },
      { en: "Coordinate with legal aid for on-site 'Know Your Rights' sessions", es: "Coordinar con asistencia legal para sesiones de 'Conozca Sus Derechos' en el sitio" },
    ],
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
    affectedOrgSlugs: ["altamed-health-services", "northeast-valley-health-corporation", "st-johns-community-health", "south-central-family-health-center", "watts-healthcare-corporation"],
    tags: ["clinic-closures", "public-health", "la-county", "federal-cuts", "patient-redirect"],
    keyTakeaways: [
      { en: "7 LA County DPH clinics closing Feb 27, 2026 — Antelope Valley, Inglewood, Pomona, Hollywood Wilshire, Torrance, and 2 LA locations", es: "7 clínicas del DPH del condado de LA cierran el 27 de febrero de 2026 — Antelope Valley, Inglewood, Pomona, Hollywood Wilshire, Torrance y 2 ubicaciones de LA" },
      { en: "Over $50M in cumulative federal, state, and local funding cuts cited", es: "Más de $50M en recortes acumulados de fondos federales, estatales y locales citados" },
      { en: "Federal funding = ~50% of DPH budget — services affected include STI testing, vaccinations, TB treatment", es: "Fondos federales = ~50% del presupuesto del DPH — servicios afectados incluyen pruebas de ITS, vacunaciones, tratamiento de TB" },
      { en: "Patients redirected to remaining facilities — increased demand on nearby FQHCs is likely", es: "Pacientes redirigidos a instalaciones restantes — probable aumento de demanda en FQHCs cercanos" },
    ],
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
    keyTakeaways: [
      { en: "CCHC opened Las Vegas clinic March 2, 2026 — first out-of-state expansion by a California FQHC", es: "CCHC abrió clínica en Las Vegas el 2 de marzo de 2026 — primera expansión fuera del estado por un FQHC de California" },
      { en: "CCHC grew from 45,000 visits in 2004 to over 177,000 in 2023 across 6 LA County clinics", es: "CCHC creció de 45,000 visitas en 2004 a más de 177,000 en 2023 en 6 clínicas del condado de LA" },
      { en: "Signals California FQHCs seeking growth beyond state lines as in-state financial pressures mount", es: "Indica que FQHCs de California buscan crecimiento fuera del estado ante presiones financieras internas" },
    ],
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
    keyTakeaways: [
      { en: "H.R. 1 allows states to impose $35 Medicaid copays — but FQHCs are statutorily exempt", es: "H.R. 1 permite a los estados imponer copagos de $35 de Medicaid — pero FQHCs están exentos por ley" },
      { en: "Target patients currently using hospital EDs or urgent cares that will start charging copays", es: "Dirigirse a pacientes que actualmente usan urgencias de hospitales que empezarán a cobrar copagos" },
      { en: "Add 'No Copay' messaging to all patient-facing materials, website, and signage", es: "Agregar mensaje 'Sin Copago' a todos los materiales para pacientes, sitio web y señalización" },
      { en: "Coordinate with managed care plans to redirect members to FQHCs for copay-free visits", es: "Coordinar con planes de atención administrada para redirigir miembros a FQHCs para visitas sin copago" },
    ],
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
    keyTakeaways: [
      { en: "HRSA 340B rebate model pilot launched Jan 1, 2026 — 8 manufacturers, 10 drugs (Eliquis, Enbrel, Jardiance, Stelara)", es: "Programa piloto de reembolso 340B de HRSA lanzado el 1 de enero de 2026 — 8 fabricantes, 10 medicamentos (Eliquis, Enbrel, Jardiance, Stelara)" },
      { en: "FQHCs must now buy at wholesale and submit rebate claims within 45 days — changes cash-flow timing", es: "FQHCs ahora deben comprar al por mayor y presentar reclamos de reembolso en 45 días — cambia el tiempo de flujo de efectivo" },
      { en: "Most FQHCs capture only 20-30% of eligible 340B prescriptions — audit current capture rates", es: "La mayoría de FQHCs capturan solo 20-30% de recetas 340B elegibles — auditar tasas de captura actuales" },
      { en: "Invest in 340B software integrating with your EHR and model cash-flow scenarios for delayed rebate timing", es: "Invertir en software 340B integrado con su EHR y modelar escenarios de flujo de efectivo para reembolsos diferidos" },
    ],
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
    keyTakeaways: [
      { en: "H.R. 1 made DPC memberships HSA-eligible starting Jan 1, 2026 — up to $150/mo individual, $300/mo family", es: "H.R. 1 hizo membresías DPC elegibles para HSA desde el 1 de enero de 2026 — hasta $150/mes individual, $300/mes familiar" },
      { en: "Some FQHCs already generate $300K+/year from 500 subscription members via DPC overlay", es: "Algunos FQHCs ya generan $300K+/año de 500 miembros de suscripción mediante DPC" },
      { en: "DPC creates subscription revenue from commercially insured/HSA patients alongside existing PPS", es: "DPC crea ingresos por suscripción de pacientes con seguro comercial/HSA junto al PPS existente" },
      { en: "Ensure PPS compliance — DPC fees must not conflict with sliding fee scale or HRSA requirements", es: "Asegurar cumplimiento de PPS — tarifas DPC no deben conflictar con escala de tarifa variable o requisitos de HRSA" },
    ],
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
    keyTakeaways: [
      { en: "FQHCs with Ryan White funding can layer CalAIM ECM revenue on top of existing HIV/AIDS grants", es: "FQHCs con fondos Ryan White pueden agregar ingresos ECM de CalAIM sobre subvenciones existentes de VIH/SIDA" },
      { en: "Critical exclusion: members on the HIV/AIDS HCBS Waiver (MCWP) cannot simultaneously receive ECM", es: "Exclusión crítica: miembros en la Exención HCBS de VIH/SIDA (MCWP) no pueden recibir ECM simultáneamente" },
      { en: "Ryan White remains payer of last resort — ECM captures Medi-Cal revenue first", es: "Ryan White sigue siendo pagador de último recurso — ECM captura ingresos Medi-Cal primero" },
      { en: "Golden Valley Health Centers (Merced County) is modeling ECM + HIV focus as a sustainability playbook", es: "Golden Valley Health Centers (Condado de Merced) está modelando ECM + enfoque VIH como manual de sostenibilidad" },
    ],
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
    keyTakeaways: [
      { en: "Most FQHCs capture only 20-30% of eligible 340B prescriptions — millions in missed revenue", es: "La mayoría de FQHCs capturan solo 20-30% de recetas 340B elegibles — millones en ingresos perdidos" },
      { en: "DPC subscription overlay: $150/mo HSA-eligible (new Jan 2026) creates recurring non-Medicaid revenue", es: "DPC por suscripción: $150/mes elegible para HSA (nuevo enero 2026) crea ingresos recurrentes no-Medicaid" },
      { en: "PPS rules allow FQHC payment under APMs if revenue ≥ PPS equivalent — explore value-based contracts", es: "Reglas PPS permiten pago a FQHC bajo APMs si ingresos ≥ equivalente PPS — explorar contratos basados en valor" },
      { en: "A 3-5% improvement in revenue cycle collections = hundreds of thousands in additional annual revenue", es: "Una mejora del 3-5% en cobros del ciclo de ingresos = cientos de miles en ingresos anuales adicionales" },
      { en: "CHCF expires Dec 2026 and Medicaid cuts squeezing margins — diversify NOW across all 6 strategies", es: "CHCF expira en diciembre 2026 y recortes de Medicaid comprimen márgenes — diversificar AHORA con las 6 estrategias" },
    ],
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
    keyTakeaways: [
      { en: "At stake for California: $130M from the Public Health Infrastructure Grant alone, supporting 400+ health workforce jobs", es: "En juego para California: $130M solo de la Subvención de Infraestructura de Salud Pública, apoyando 400+ empleos de salud" },
      { en: "HHS targeted CDC grants exclusively in 4 Democratic-led states — CA, CO, IL, MN", es: "HHS dirigió subvenciones CDC exclusivamente a 4 estados demócratas — CA, CO, IL, MN" },
      { en: "Federal Judge Manish Shah issued a 14-day block, finding states would suffer 'irreparable harm'", es: "El juez federal Manish Shah emitió un bloqueo de 14 días, determinando que los estados sufrirían 'daño irreparable'" },
      { en: "Targeted programs include LA County's $6M health equity initiative and $1.1M HIV surveillance", es: "Programas afectados incluyen la iniciativa de equidad en salud de $6M del condado de LA y $1.1M de vigilancia de VIH" },
    ],
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
    paywalled: true,
    keyTakeaways: [
      { en: "Simulation: eliminating Ryan White = 49% increase in new HIV infections by 2030", es: "Simulación: eliminar Ryan White = aumento del 49% en nuevas infecciones de VIH para 2030" },
      { en: "For FQHCs with Ryan White Part C/D: ECM revenue layering is urgent as a financial hedge", es: "Para FQHCs con Ryan White Parte C/D: superposición de ingresos ECM es urgente como cobertura financiera" },
      { en: "2026 National Ryan White Conference Aug 4-7 in DC — focus: 'Strengthening our Foundation'", es: "Conferencia Nacional Ryan White 2026, 4-7 de agosto en DC — enfoque: 'Fortaleciendo nuestra Fundación'" },
    ],
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
    keyTakeaways: [
      { en: "CalAIM 1115 waiver expires December 31, 2026 — ECM revenue depends on this renewal", es: "La exención CalAIM 1115 expira el 31 de diciembre de 2026 — los ingresos ECM dependen de esta renovación" },
      { en: "Since Jan 2022: 326,000+ members enrolled in ECM and 368,000+ in Community Supports", es: "Desde enero 2022: 326,000+ miembros inscritos en ECM y 368,000+ en Community Supports" },
      { en: "Federal administration has withdrawn guidance supporting SDOH through Medicaid — renewal at risk", es: "Administración federal ha retirado guías que apoyan SDOH a través de Medicaid — renovación en riesgo" },
      { en: "Build ECM volume NOW while the waiver is active, and prepare contingency plans if renewal is delayed or narrowed", es: "Construir volumen ECM AHORA mientras la exención está activa, y preparar planes de contingencia si la renovación se retrasa o reduce" },
    ],
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
    keyTakeaways: [
      { en: "Screen every Medi-Cal patient for ECM eligibility — 7 populations of focus including HIV+, SMI, SUD, homelessness, justice-involved", es: "Evaluar cada paciente Medi-Cal para elegibilidad ECM — 7 poblaciones de enfoque incluyendo VIH+, SMI, SUD, personas sin hogar, personas involucradas en justicia" },
      { en: "Ryan White clients on Medi-Cal (not MCWP waiver) can be ECM-enrolled — layer revenue on grant-funded programs", es: "Clientes Ryan White en Medi-Cal (no exención MCWP) pueden inscribirse en ECM — agregar ingresos sobre programas de subvención" },
      { en: "Cross-train CHWs for both ECM care coordination and Ryan White case management", es: "Capacitar CHWs en coordinación de cuidados ECM y gestión de casos Ryan White simultáneamente" },
      { en: "Build data infrastructure showing ECM outcomes (reduced ED visits, improved engagement) to justify waiver renewal", es: "Construir infraestructura de datos mostrando resultados ECM (visitas a urgencias reducidas, mejor compromiso) para justificar renovación de exención" },
      { en: "Join CPCA and NACHC advocacy for waiver renewal with full ECM/Community Supports authority", es: "Unirse a la defensa de CPCA y NACHC para renovación de exención con autoridad completa de ECM/Community Supports" },
    ],
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
    affectedOrgSlugs: ["san-francisco-community-health-center", "north-east-medical-services", "healthright-360", "mission-neighborhood-health-center"],
    tags: ["sf-budget", "dph-cuts", "community-clinics", "safety-net"],
    keyTakeaways: [
      { en: "Mayor Lurie ordered SF DPH to cut $40M over two years: $20M staff (up to 100 employees) + $20M CBO contracts", es: "El alcalde Lurie ordenó al DPH de SF recortar $40M en dos años: $20M personal (hasta 100 empleados) + $20M contratos con organizaciones comunitarias" },
      { en: "Combined with $877M city budget deficit driven by federal healthcare cuts", es: "Combinado con un déficit presupuestario de $877M impulsado por recortes federales de salud" },
      { en: "Threatens safety-net infrastructure serving 110,000+ patients across 12 SFCCC member clinics", es: "Amenaza infraestructura de red de seguridad que sirve a más de 110,000 pacientes en 12 clínicas del SFCCC" },
    ],
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
    affectedOrgSlugs: ["san-francisco-community-health-center", "north-east-medical-services", "mission-neighborhood-health-center"],
    tags: ["sf-budget", "layoffs", "dph", "city-workforce"],
    keyTakeaways: [
      { en: "500 city positions to be eliminated ($100M in personnel savings) to address $877M budget deficit", es: "500 puestos de la ciudad serán eliminados ($100M en ahorros de personal) para abordar déficit de $877M" },
      { en: "SF DPH is the city's largest agency with 7,766 employees — faces the deepest cuts", es: "El DPH de SF es la agencia más grande de la ciudad con 7,766 empleados — enfrenta los recortes más profundos" },
      { en: "Departments must submit cut plans by March 12, 2026", es: "Los departamentos deben presentar planes de recortes antes del 12 de marzo de 2026" },
      { en: "Last year's layoff proposal of 150 resulted in ~40 actual cuts after union negotiations", es: "La propuesta de despido del año pasado de 150 resultó en ~40 recortes reales después de negociaciones sindicales" },
    ],
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
    affectedOrgSlugs: ["san-francisco-community-health-center", "north-east-medical-services", "mission-neighborhood-health-center"],
    tags: ["sf-budget", "cbo-cuts", "lgbtq-health", "workforce-development"],
    keyTakeaways: [
      { en: "$17M cut from CBOs: $6M workforce development, $5.8M UCSF affiliation, $3.9M other, $1.3M mental health vocational", es: "$17M recortados de organizaciones comunitarias: $6M desarrollo laboral, $5.8M afiliación UCSF, $3.9M otros, $1.3M vocacionales de salud mental" },
      { en: "Disproportionately impacts LGBTQ+, African American, and Chinese community health services", es: "Impacta desproporcionadamente servicios de salud LGBTQ+, afroamericanos y chinos" },
      { en: "SF AIDS Foundation loses $800K; NAMI SF programs 100% cut", es: "SF AIDS Foundation pierde $800K; programas de NAMI SF eliminados 100%" },
    ],
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
    keyTakeaways: [
      { en: "Over $300,000 in federal funding terminated effective February 11, 2026 — more terminations expected", es: "Más de $300,000 en fondos federales terminados efectivos el 11 de febrero de 2026 — más terminaciones esperadas" },
      { en: "Cuts targeted TransHOPE — a program training young community leaders in peer-based education", es: "Recortes dirigidos a TransHOPE — un programa que entrena líderes comunitarios jóvenes en educación entre pares" },
      { en: "SFCHC is a key safety-net provider for LGBTQ+ and people of color communities", es: "SFCHC es un proveedor clave de red de seguridad para comunidades LGBTQ+ y personas de color" },
    ],
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
    affectedOrgSlugs: ["san-francisco-community-health-center", "north-east-medical-services", "mission-neighborhood-health-center", "healthright-360"],
    tags: ["medi-cal", "hr1", "coverage-loss", "budget-deficit", "sfccc"],
    keyTakeaways: [
      { en: "25,000-50,000 San Franciscans could lose Medi-Cal by end of 2027 under H.R. 1 provisions", es: "25,000-50,000 sanfranciscanos podrían perder Medi-Cal para fines de 2027 bajo provisiones de H.R. 1" },
      { en: "SF faces a $400M budget hole through 2038 — $315M next year alone", es: "SF enfrenta un agujero presupuestario de $400M hasta 2038 — $315M solo el próximo año" },
      { en: "SFCCC CEO Johanna Liu: 'service cuts at one provider affect the entire system'", es: "Directora de SFCCC Johanna Liu: 'los recortes en un proveedor afectan todo el sistema'" },
      { en: "Healthy San Francisco program revival under consideration as a coverage backstop", es: "Reactivación del programa Healthy San Francisco bajo consideración como respaldo de cobertura" },
    ],
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
    affectedOrgSlugs: ["san-francisco-community-health-center", "north-east-medical-services"],
    tags: ["va", "federal-cuts", "workforce", "veterans"],
    keyTakeaways: [
      { en: "157 positions eliminated at SF VA Medical Center as part of nationwide 37,000 vacant position cuts", es: "157 puestos eliminados en el Centro Médico VA de SF como parte de recortes nacionales de 37,000 puestos vacantes" },
      { en: "Cuts include the only emergency room social worker position — raises care continuity concerns", es: "Recortes incluyen el único puesto de trabajador social de urgencias — plantea preocupaciones de continuidad de atención" },
      { en: "Veterans often rely on community health centers for follow-up care — FQHCs may see increased veteran referrals", es: "Veteranos frecuentemente dependen de centros de salud comunitarios para atención de seguimiento — FQHCs podrían ver más derivaciones de veteranos" },
    ],
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
    affectedOrgSlugs: ["san-francisco-community-health-center", "north-east-medical-services", "mission-neighborhood-health-center"],
    tags: ["hhs", "federal-cuts", "region9", "doge", "grant-workshops"],
    keyTakeaways: [
      { en: "318 HHS Region 9 staff eliminated — managed Medicare, Medicaid, and indigenous health for CA, AZ, HI, NV, and 6 territories", es: "318 empleados de HHS Región 9 eliminados — gestionaban Medicare, Medicaid y salud indígena para CA, AZ, HI, NV y 6 territorios" },
      { en: "Office regularly hosted grant workshops with community health centers — that resource is now gone", es: "La oficina regularmente organizaba talleres de subvenciones con centros de salud comunitarios — ese recurso ya no existe" },
      { en: "Part of RFK Jr.'s plan to cut 60,000+ HHS positions nationwide", es: "Parte del plan de RFK Jr. de eliminar 60,000+ puestos de HHS a nivel nacional" },
      { en: "FQHCs should identify alternative channels for HRSA grant technical assistance", es: "FQHCs deben identificar canales alternativos para asistencia técnica de subvenciones HRSA" },
    ],
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
    paywalled: true,
    keyTakeaways: [
      { en: "Guest-edited by UCSF Health Chief AI Officer Sara Murray — signals institutional legitimacy", es: "Editado por la Directora de IA de UCSF Health Sara Murray — señala legitimidad institucional" },
      { en: "Ambient scribes = fastest health tech adoption in history — but that's just the beginning", es: "Escribas ambientales = adopción de tecnología de salud más rápida en la historia — pero eso es solo el comienzo" },
      { en: "Next wave: AI for care coordination, population health, and revenue cycle optimization", es: "Próxima ola: IA para coordinación de cuidados, salud poblacional y optimización del ciclo de ingresos" },
      { en: "Key insight: translating AI hype into ROI depends on implementation science fundamentals", es: "Idea clave: traducir el hype de IA en ROI depende de fundamentos de ciencia de implementación" },
    ],
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
    keyTakeaways: [
      { en: "Board voted 4-1 to reform County Medical Services — most restrictive safety-net program among large CA counties", es: "Junta votó 4-1 para reformar Servicios Médicos del Condado — programa más restrictivo entre grandes condados de CA" },
      { en: "H.R. 1 will strip Medi-Cal from ~75,000 noncitizens in SD County starting Oct 2026", es: "H.R. 1 eliminará Medi-Cal de ~75,000 no ciudadanos en el condado de SD a partir de octubre 2026" },
      { en: "~400,000 San Diegans total at risk of losing coverage", es: "~400,000 sandieguinos en total en riesgo de perder cobertura" },
      { en: "Subcommittee has 60 days to propose reforms including eliminating property liens and expanding virtual applications", es: "Subcomité tiene 60 días para proponer reformas incluyendo eliminar gravámenes y solicitudes virtuales" },
    ],
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
    affectedOrgSlugs: ["family-health-centers-of-san-diego", "san-ysidro-health", "neighborhood-healthcare", "la-maestra-community-health-centers", "vista-community-clinic"],
    tags: ["san-diego", "federal-cuts", "medi-cal", "calfresh", "budget-deficit"],
    keyTakeaways: [
      { en: "$300M in federal funding losses hitting San Diego County — from $1.1B Medi-Cal + $300M CalFresh cuts statewide", es: "$300M en pérdidas de fondos federales golpean al condado de SD — de $1.1B en Medi-Cal + $300M de CalFresh a nivel estatal" },
      { en: "Board Chair Lawson-Remer: cuts 'show up when you call 911'", es: "Presidenta Lawson-Remer: los recortes 'se notan cuando llamas al 911'" },
      { en: "Hospital reimbursements declining while emergency departments face rising uninsured patient volume", es: "Reembolsos hospitalarios disminuyen mientras salas de emergencia enfrentan aumento de pacientes sin seguro" },
    ],
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
    keyTakeaways: [
      { en: "'Hundreds of FQHCs throughout the state will shut down in a year' — Neighborhood Healthcare Director of External Affairs", es: "'Cientos de FQHCs en todo el estado cerrarán en un año' — Directora de Asuntos Externos de Neighborhood Healthcare" },
      { en: "Palomar Health, Sharp HealthCare preparing for $300M in annual lost revenue", es: "Palomar Health, Sharp HealthCare se preparan para $300M en ingresos anuales perdidos" },
      { en: "Warning: 'hospitals in San Diego County are going to be overrun' as patients lose coverage", es: "Advertencia: 'los hospitales del condado de San Diego serán desbordados' cuando pacientes pierdan cobertura" },
    ],
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
    paywalled: true,
    keyTakeaways: [
      { en: "$54.5M Macias Family Health Center opened in National City amid intensifying Medi-Cal cuts", es: "Centro de Salud Familiar Macias de $54.5M abierto en National City durante intensificación de recortes a Medi-Cal" },
      { en: "CEO Kevin Mattson: 'a fraught moment' — work requirements will increase uninsured while reducing revenue", es: "CEO Kevin Mattson: 'un momento tenso' — requisitos de trabajo aumentarán no asegurados mientras reducen ingresos" },
      { en: "La Maestra and FHCSD also bracing for higher demand with less funding", es: "La Maestra y FHCSD también preparándose para mayor demanda con menos financiamiento" },
    ],
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
    affectedOrgSlugs: ["borrego-health", "sac-health", "riverside-university-health-system-chc", "centro-medico-community-clinic", "community-health-systems-inc"],
    tags: ["inland-empire", "iehp", "medi-cal", "riverside", "san-bernardino", "coverage-loss"],
    keyTakeaways: [
      { en: "IEHP serves 1.6M members — Riverside 42% enrolled, San Bernardino 45% enrolled", es: "IEHP sirve a 1.6M miembros — Riverside 42% inscrito, San Bernardino 45% inscrito" },
      { en: "Projected $10-20B annual state Medi-Cal cuts could force clinics to cut dental, vision, and podiatry first", es: "Recortes proyectados de $10-20B anuales podrían forzar clínicas a eliminar dental, visión y podiatría primero" },
      { en: "Centro Medico (15,000 patients, nearly all Medi-Cal) warns of months-long waits", es: "Centro Medico (15,000 pacientes, casi todos Medi-Cal) advierte de esperas de meses" },
      { en: "IEHP contracts with 9,000 providers, hundreds of clinics, and every hospital in both counties", es: "IEHP contrata con 9,000 proveedores, cientos de clínicas y cada hospital en ambos condados" },
    ],
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
    affectedOrgSlugs: ["sac-health", "loma-linda-university-health-sac", "borrego-health"],
    tags: ["inland-empire", "va", "staffing", "loma-linda", "veterans"],
    keyTakeaways: [
      { en: "64,000 appointments canceled at VA Loma Linda from Oct 2021-Sep 2023 — per VA OIG audit", es: "64,000 citas canceladas en VA Loma Linda de oct 2021-sep 2023 — según auditoría del OIG del VA" },
      { en: "Two-thirds of cancellations directly due to staffing shortages at 5 IE outpatient clinics", es: "Dos tercios de las cancelaciones directamente por escasez de personal en 5 clínicas ambulatorias del IE" },
      { en: "Veterans displaced from VA care increasingly turning to FQHCs — increasing community health center demand", es: "Veteranos desplazados del VA recurren cada vez más a FQHCs — aumentando demanda de centros de salud comunitarios" },
    ],
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
    keyTakeaways: [
      { en: "$1.5B in federal cuts over 5 years; DHS — 70% of $6.5B budget from federal funds — projects $1.85B annual deficit by 2028-29", es: "$1.5B en recortes federales en 5 años; DHS — 70% de presupuesto de $6.5B de fondos federales — proyecta déficit anual de $1.85B para 2028-29" },
      { en: "County public hospital closure now 'last resort' on the table", es: "Cierre de hospital público del condado ahora es 'último recurso'" },
      { en: "700K+ residents could lose Medi-Cal under new work requirements", es: "700K+ residentes podrían perder Medi-Cal por nuevos requisitos de trabajo" },
      { en: "St. John's Community Health (120K patients) faces 'closing several health centers' and 'laying off hundreds of staff'", es: "St. John's Community Health (120K pacientes) enfrenta 'cerrar varios centros de salud' y 'despedir a cientos de empleados'" },
    ],
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
    keyTakeaways: [
      { en: "5 federal grants lost totaling $13M — children & family planning clinic closes June 30, dental May 6", es: "5 subvenciones federales perdidas por $13M — clínica infantil y planificación familiar cierra 30 de junio, dental 6 de mayo" },
      { en: "WIC services at Santa Ana and Buena Park locations also reduced", es: "Servicios WIC en Santa Ana y Buena Park también reducidos" },
      { en: "Affected families transitioning to CalOptima, Kaiser, and FQHCs", es: "Familias afectadas en transición a CalOptima, Kaiser y FQHCs" },
    ],
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
    keyTakeaways: [
      { en: "$66M deficit over 5 years; Public Health ($25M cuts) and Social Services ($28M) hardest hit", es: "Déficit de $66M en 5 años; Salud Pública ($25M en recortes) y Servicios Sociales ($28M) más afectados" },
      { en: "Public Health deficit breakdown: $7.6M structural + $6.6M state cuts + $3.2M H.R. 1 = $17.4M total", es: "Desglose del déficit de Salud Pública: $7.6M estructural + $6.6M recortes estatales + $3.2M H.R. 1 = $17.4M total" },
      { en: "55.2 FTE layoffs paused + 7,000 immigrant patients' transition paused by court injunction", es: "55.2 despidos FTE pausados + transición de 7,000 pacientes inmigrantes pausada por orden judicial" },
      { en: "Specialty services (endocrinology, neurology, urology) may be eliminated; furloughs and wage freezes on the table", es: "Servicios de especialidad (endocrinología, neurología, urología) podrían eliminarse; licencias sin sueldo y congelamiento salarial en consideración" },
    ],
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
    affectedOrgSlugs: ["county-of-monterey", "community-health-centers-central-coast"],
    tags: ["monterey", "natividad", "medi-cal", "dsh", "fmap", "undocumented", "central-coast"],
    keyTakeaways: [
      { en: "38,000 Monterey County residents will lose Medi-Cal over 4 years under H.R. 1", es: "38,000 residentes del condado de Monterey perderán Medi-Cal en 4 años bajo H.R. 1" },
      { en: "Natividad Medical Center's $14M/year DSH funding in limbo", es: "Fondos DSH de $14M/año de Natividad Medical Center en limbo" },
      { en: "FMAP drops from 90% to 50% for undocumented emergency care starting Oct 1, 2026", es: "FMAP baja del 90% al 50% para atención de emergencia de indocumentados a partir del 1 de octubre de 2026" },
      { en: "Supervisors concerned about 'negative impact on the financial health of Natividad' — county's safety-net hospital", es: "Supervisores preocupados por 'impacto negativo en la salud financiera de Natividad' — hospital de red de seguridad del condado" },
    ],
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
    affectedOrgSlugs: ["alameda-health-system"],
    tags: ["layoffs-deferred", "working-group", "mental-health", "medicaid", "bay-area"],
    paywalled: true,
    keyTakeaways: [
      { en: "183 layoffs deferred + mental health unit closures halted (were set for March 9)", es: "183 despidos diferidos + cierres de unidades de salud mental detenidos (estaban programados para el 9 de marzo)" },
      { en: "Working group (supervisors + unions + AHS admin) must close $91.7M deficit by July 1", es: "Grupo de trabajo (supervisores + sindicatos + administración AHS) debe cerrar déficit de $91.7M antes del 1 de julio" },
      { en: "60% of AHS patients on Medicaid — system faces $100M/year in losses by 2030", es: "60% de pacientes de AHS en Medicaid — sistema enfrenta pérdidas de $100M/año para 2030" },
      { en: "CEO: H.R. 1 is 'the largest roll-back of federal health care spending in history'", es: "CEO: H.R. 1 es 'la mayor reducción de gasto federal en salud de la historia'" },
    ],
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
    keyTakeaways: [
      { en: "Coalition led by St. John's CEO Jim Mangia + SEIU 721/2015 pushing half-cent sales tax for LA County", es: "Coalición liderada por CEO de St. John's Jim Mangia + SEIU 721/2015 impulsa impuesto de medio centavo en condado de LA" },
      { en: "Would offset Medi-Cal cuts affecting 3.3M county residents", es: "Compensaría recortes de Medi-Cal que afectan a 3.3M residentes del condado" },
      { en: "Proposed allocation: 47% free/reduced-cost care for uninsured, 22% DHS, 10% DPH", es: "Asignación propuesta: 47% atención gratuita/reducida para no asegurados, 22% DHS, 10% DPH" },
      { en: "Requesting June ballot placement or will pursue November initiative through petition", es: "Solicitan colocación en boleta de junio o buscarán iniciativa de noviembre por petición" },
    ],
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
    keyTakeaways: [
      { en: "C3 = largest non-profit FQHC-governed ACO in the country — expanded to California Jan 1, 2026", es: "C3 = mayor ACO sin fines de lucro gobernada por FQHCs en el país — se expandió a California 1 ene 2026" },
      { en: "Accountable for 240,000+ Medicaid and Medicare beneficiaries in value-based arrangements", es: "Responsable de más de 240,000 beneficiarios de Medicaid y Medicare en acuerdos basados en valor" },
      { en: "$152M+ in shared savings earned since 2018", es: "$152M+ en ahorros compartidos generados desde 2018" },
      { en: "ACO participation = key revenue diversification strategy as Medicaid cuts loom", es: "Participación en ACO = estrategia clave de diversificación de ingresos ante recortes de Medicaid" },
    ],
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
    keyTakeaways: [
      { en: "U.S. economy lost 92,000 jobs in February (consensus expected +59,000)", es: "Economía de EE.UU. perdió 92,000 empleos en febrero (consenso esperaba +59,000)" },
      { en: "Unemployment rose to 4.4%; labor force participation fell to 62.0% (lowest since Dec 2021)", es: "Desempleo subió a 4.4%; participación laboral cayó a 62.0% (la más baja desde dic 2021)" },
      { en: "December revised from +48,000 to -17,000 — a 65,000-job swing", es: "Diciembre revisado de +48,000 a -17,000 — un giro de 65,000 empleos" },
      { en: "Federal government employment down 330,000 since October 2024", es: "Empleo del gobierno federal bajó 330,000 desde octubre 2024" },
    ],
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
    keyTakeaways: [
      { en: "Healthcare lost 28,000 jobs in February after adding 77,000 in January", es: "Sector salud perdió 28,000 empleos en febrero después de agregar 77,000 en enero" },
      { en: "31,000 Kaiser Permanente nurses on strike = largest open-ended nurses strike in U.S. history (Jan 26-Feb 24)", es: "31,000 enfermeras de Kaiser en huelga = mayor huelga abierta de enfermeras en historia de EE.UU. (26 ene-24 feb)" },
      { en: "Healthcare created 436,000 jobs in 12 months = 121% of ALL U.S. job growth", es: "Sector salud creó 436,000 empleos en 12 meses = 121% de TODO el crecimiento laboral de EE.UU." },
      { en: "Glassdoor: healthcare added 693,000 jobs in 2025 while all other industries combined lost 500,000+", es: "Glassdoor: salud agregó 693,000 empleos en 2025 mientras todas las demás industrias combinadas perdieron 500,000+" },
    ],
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
    keyTakeaways: [
      { en: "30-day strike ended Feb 24 with 21.5% wage increase over 4 years", es: "Huelga de 30 días terminó 24 feb con aumento salarial de 21.5% en 4 años" },
      { en: "31,000 UNAC/UHCP nurses and healthcare professionals in California and Hawaii participated", es: "31,000 enfermeros y profesionales de UNAC/UHCP en California y Hawái participaron" },
      { en: "Strike issues: staffing ratios, wage parity, and patient safety", es: "Temas de la huelga: ratios de personal, paridad salarial y seguridad del paciente" },
      { en: "Settlement sets new compensation benchmark for all California healthcare workers", es: "El acuerdo establece nuevo punto de referencia de compensación para todos los trabajadores de salud de California" },
    ],
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
    keyTakeaways: [
      { en: "Healthcare = 121% of net U.S. employment gains over 12 months; 63% of all jobs added in January 2026", es: "Salud = 121% de ganancias netas de empleo en EE.UU. en 12 meses; 63% de todos los empleos agregados en enero 2026" },
      { en: "Every other major sector flat or negative — healthcare is the sole engine of job growth", es: "Todos los demás sectores planos o negativos — salud es el único motor de crecimiento laboral" },
      { en: "Omair Sharif: 'labor market so soft it cannot withstand a strike of 31K healthcare workers, because no one else is hiring'", es: "Omair Sharif: 'mercado laboral tan débil que no puede resistir una huelga de 31K trabajadores de salud, porque nadie más está contratando'" },
      { en: "H.R. 1 Medicaid cuts threaten the one sector still creating jobs — a national economic vulnerability", es: "Recortes de Medicaid de H.R. 1 amenazan al único sector que aún crea empleos — vulnerabilidad económica nacional" },
    ],
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
    keyTakeaways: [
      { en: "Measure A = 0.625% sales tax, 57% voter approval, generates $330M/year for healthcare (effective April 1, 2026)", es: "Medida A = impuesto de 0.625%, 57% aprobación, genera $330M/año para salud (vigente 1 abril 2026)" },
      { en: "First CA county to pass a sales tax specifically to offset federal Medicaid cuts", es: "Primer condado de CA en aprobar impuesto de ventas específicamente para compensar recortes federales de Medicaid" },
      { en: "Covers ~1/3 of the county's estimated $1B+ annual revenue loss from H.R. 1", es: "Cubre ~1/3 de la pérdida estimada de $1B+ anual del condado por H.R. 1" },
      { en: "LA County now pursuing similar half-cent sales tax — could become statewide model", es: "Condado de LA busca impuesto similar de medio centavo — podría ser modelo estatal" },
    ],
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
    keyTakeaways: [
      { en: "$26M in federal health funding at risk from HHS restructuring and DOGE-aligned cuts", es: "$26M en fondos federales de salud en riesgo por reestructuración del HHS y recortes de DOGE" },
      { en: "California and 22 other states have filed suit to block the cuts", es: "California y 22 otros estados han demandado para bloquear los recortes" },
      { en: "Separate $233K HHS grant termination already stalled a community health leadership program in South Sacramento", es: "Terminación separada de subvención de $233K del HHS ya detuvo un programa comunitario de salud en el sur de Sacramento" },
    ],
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
    affectedOrgSlugs: ["altamed-health-services", "st-johns-community-health", "comprehensive-community-health-centers", "clinica-sierra-vista", "san-ysidro-health", "la-maestra-community-health-centers"],
    tags: ["undocumented", "medi-cal-premium", "coverage-loss", "uis", "july-2027", "enrollment"],
    keyTakeaways: [
      { en: "$30/month premium for undocumented Medi-Cal members ages 19-59 starting July 1, 2027", es: "Prima de $30/mes para miembros indocumentados de Medi-Cal de 19-59 años a partir del 1 de julio de 2027" },
      { en: "Dental benefits for UIS members already eliminated effective July 1, 2026", es: "Beneficios dentales para miembros UIS ya eliminados desde el 1 de julio de 2026" },
      { en: "Combined with Jan 2026 enrollment freeze + PPS elimination = compounding disinvestment in 1.6M undocumented enrollees", es: "Combinado con congelamiento de inscripción de ene 2026 + eliminación de PPS = desinversión compuesta en 1.6M inscritos indocumentados" },
      { en: "Premiums will accelerate coverage loss and increase FQHC uncompensated care burden", es: "Las primas acelerarán la pérdida de cobertura y aumentarán la carga de atención no compensada de FQHCs" },
    ],
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
    affectedOrgSlugs: ["altamed-health-services", "st-johns-community-health", "comprehensive-community-health-centers", "san-ysidro-health", "clinica-sierra-vista", "united-health-centers", "la-maestra-community-health-centers", "kheir-clinic"],
    tags: ["pps", "undocumented-patients", "uis", "revenue-cut", "july-2026", "los-angeles", "san-diego", "central-valley", "dental"],
    keyTakeaways: [
      { en: "PPS rates eliminated for FQHC services to UIS patients starting July 1, 2026 — replaced by regular Medi-Cal FFS (50-70% less per encounter)", es: "Tasas PPS eliminadas para servicios de FQHC a pacientes UIS a partir del 1 de julio de 2026 — reemplazadas por tarifa regular de Medi-Cal (50-70% menos por encuentro)" },
      { en: "CA LAO scores this as $1B in annual General Fund savings = $1B in annual FQHC revenue loss", es: "LAO de CA califica esto como $1B en ahorros anuales del Fondo General = $1B en pérdida anual de ingresos para FQHCs" },
      { en: "Dental benefits for undocumented Medi-Cal enrollees also eliminated: $308M savings in 2026-27", es: "Beneficios dentales para inscritos indocumentados también eliminados: $308M de ahorro en 2026-27" },
      { en: "FQHCs in LA, San Diego, and Central Valley with large undocumented panels face most severe exposure", es: "FQHCs en LA, San Diego y Valle Central con grandes paneles de indocumentados enfrentan la exposición más severa" },
    ],
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
    keyTakeaways: [
      { en: "$403M total in FY2026 SAC awards: 93 awards (~$232M, March start) + 51 awards (~$171M, May start)", es: "$403M total en premios SAC FY2026: 93 premios (~$232M, inicio marzo) + 51 premios (~$171M, inicio mayo)" },
      { en: "Grants now require MAHA alignment — shifting focus from health disparities/SDOH to chronic disease prevention and nutrition", es: "Subvenciones ahora requieren alineación MAHA — cambiando enfoque de disparidades/SDOH a prevención de enfermedades crónicas y nutrición" },
      { en: "MAHA Elevate program: ~$100M for preventive lifestyle interventions", es: "Programa MAHA Elevate: ~$100M para intervenciones preventivas de estilo de vida" },
      { en: "Warning: FQHCs serving undocumented populations or emphasizing language access may score lower under new criteria", es: "Advertencia: FQHCs que sirven poblaciones indocumentadas o enfatizan acceso lingüístico podrían obtener puntuaciones más bajas" },
    ],
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
    keyTakeaways: [
      { en: "UHC's 40th location opened Jan 23, 2026 in West Fresno 'health care desert'", es: "Ubicación 40 de UHC abierta el 23 de enero de 2026 en el 'desierto de atención médica' del oeste de Fresno" },
      { en: "UHC serves 100,000+ patients with 450,000 annual appointments across Fresno, Kings, and Tulare counties", es: "UHC atiende a más de 100,000 pacientes con 450,000 citas anuales en los condados de Fresno, Kings y Tulare" },
      { en: "HRSA Top 10% Health Center Quality Leader in 2025", es: "Líder de Calidad Top 10% de Centros de Salud del HRSA en 2025" },
      { en: "Also launched United Physicians Network (for-profit IPA) as revenue diversification strategy", es: "También lanzó United Physicians Network (IPA con fines de lucro) como estrategia de diversificación de ingresos" },
    ],
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
    keyTakeaways: [
      { en: "SJV community health centers provide 3.2M visits/year with 77% of revenue from Medi-Cal (above statewide average)", es: "Centros de salud del SJV brindan 3.2M visitas/año con 77% de ingresos de Medi-Cal (superior al promedio estatal)" },
      { en: "Half of all CHC visits concentrated in just two orgs: Family HealthCare Network and United Health Centers", es: "La mitad de todas las visitas de CHC concentradas en solo dos organizaciones: Family HealthCare Network y United Health Centers" },
      { en: "SJV's FQHC ecosystem is structurally the most vulnerable in California to Medicaid cuts + PPS elimination", es: "El ecosistema de FQHCs del SJV es estructuralmente el más vulnerable de California a recortes de Medicaid + eliminación de PPS" },
    ],
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
    keyTakeaways: [
      { en: "Community health center program posted 2% financial loss in 2025 — structural strain before H.R. 1 cuts take effect", es: "Programa de centros de salud comunitarios registró pérdida financiera del 2% en 2025 — tensión estructural antes de que surtan efecto los recortes de H.R. 1" },
      { en: "$4.6B in CHCF funding only authorized through December 2026", es: "$4.6B en financiamiento CHCF autorizado solo hasta diciembre 2026" },
      { en: "Medicaid = 43% of health center revenue nationally", es: "Medicaid = 43% de ingresos de centros de salud a nivel nacional" },
      { en: "Negative margin came despite largest CHCF funding increase in a decade — grant funding alone cannot offset structural erosion", es: "Margen negativo ocurrió a pesar del mayor aumento de financiamiento CHCF en una década — las subvenciones solas no compensan la erosión estructural" },
    ],
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
    keyTakeaways: [
      { en: "CalAIM 1115 and 1915(b) waivers expire December 31, 2026 — no formal renewal application submitted", es: "Exoneraciones CalAIM 1115 y 1915(b) expiran 31 dic 2026 — sin solicitud formal de renovación presentada" },
      { en: "$1.2B annually in ECM and Community Supports at risk — thousands of positions statewide", es: "$1.2B anuales en ECM y Apoyos Comunitarios en riesgo — miles de puestos en todo el estado" },
      { en: "Combined with CHCF authorization cliff (also Dec 2026) = double uncertainty event for safety net", es: "Combinado con precipicio de autorización CHCF (también dic 2026) = doble evento de incertidumbre para la red de seguridad" },
    ],
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
    keyTakeaways: [
      { en: "CHCF set at $4.6B for FY2026 but authorization only through December 2026 — not historical 5-year pattern", es: "CHCF fijado en $4.6B para AF2026 pero autorización solo hasta diciembre 2026 — no el patrón histórico de 5 años" },
      { en: "Creates hiring hesitancy, slows capital investment, and narrows strategic planning windows", es: "Crea vacilación en contratación, frena inversión de capital y reduce ventanas de planificación estratégica" },
      { en: "All FQHCs nationwide affected — short-term authorization = short-term thinking", es: "Todos los FQHCs a nivel nacional afectados — autorización a corto plazo = pensamiento a corto plazo" },
    ],
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
    keyTakeaways: [
      { en: "CHC workforce: 326,000+ individuals across 17,000 locations serving 52 million people", es: "Fuerza laboral CHC: 326,000+ individuos en 17,000 ubicaciones sirviendo a 52 millones de personas" },
      { en: "By 2038: 39% PCP shortage and 46% dentist shortage in nonmetro areas", es: "Para 2038: 39% de escasez de médicos de atención primaria y 46% de dentistas en áreas no metropolitanas" },
      { en: "NACHC requests $2.1B for five years and authorization of $950M/year", es: "NACHC solicita $2.1B por cinco años y autorización de $950M/año" },
    ],
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
    keyTakeaways: [
      { en: "AltaMed generated $15.1B in economic impact from 2019-2024 — growth from $1.08B to $4.24B projected", es: "AltaMed generó $15.1B en impacto económico de 2019-2024 — crecimiento de $1.08B a $4.24B proyectado" },
      { en: "Supports 12,000 jobs, serves 465,000 Medi-Cal patients, operates 60+ health centers", es: "Apoya 12,000 empleos, sirve a 465,000 pacientes de Medi-Cal, opera más de 60 centros de salud" },
      { en: "Every $1 spent generates $1.50 in economic activity — powerful advocacy data for FQHC sector", es: "Cada $1 gastado genera $1.50 en actividad económica — datos poderosos de defensa para el sector FQHC" },
    ],
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
    keyTakeaways: [
      { en: "AB 1460 would prohibit pharma manufacturers from restricting 340B contract pharmacy arrangements", es: "AB 1460 prohibiría a fabricantes farmacéuticos restringir arreglos de farmacias de contrato 340B" },
      { en: "Passed Assembly in 2025, stalled in Senate — expected to return in 2026", es: "Pasó la Asamblea en 2025, se detuvo en el Senado — se espera que regrese en 2026" },
      { en: "8 states enacted similar laws; 23 have pending bills — critical for rural FQHCs", es: "8 estados aprobaron leyes similares; 23 tienen proyectos pendientes — crítico para FQHCs rurales" },
      { en: "340B hit $81B in 2024 (+23% YoY) — IRA rebate exemptions begin impacting margins in 2026", es: "340B alcanzó $81B en 2024 (+23% interanual) — exenciones de reembolso del IRA comienzan a impactar márgenes en 2026" },
    ],
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
    keyTakeaways: [
      { en: "January 2026: clinical healthcare applications +10%, openings +20%, hires +5% month-over-month", es: "Enero 2026: solicitudes clínicas de salud +10%, vacantes +20%, contrataciones +5% mes a mes" },
      { en: "Nonclinical: applications +17%, openings +15%, hires +6% MoM", es: "No clínico: solicitudes +17%, vacantes +15%, contrataciones +6% mes a mes" },
      { en: "Strong demand cycle for healthcare talent despite funding uncertainty", es: "Fuerte ciclo de demanda de talento de salud a pesar de la incertidumbre de financiamiento" },
    ],
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
    affectedOrgSlugs: ["altamed-health-services", "jwch-institute", "wellspace-health", "community-medical-centers", "county-of-stanislaus"],
    tags: ["housing", "calaim", "community-supports", "health-net", "positive"],
    keyTakeaways: [
      { en: "Health Net (Centene): $31.25M in grants for 10 housing projects in LA, Sacramento, San Joaquin, Stanislaus", es: "Health Net (Centene): $31.25M en subvenciones para 10 proyectos de vivienda en LA, Sacramento, San Joaquín, Stanislaus" },
      { en: "900+ affordable housing units; $93M total dedicated to housing since 2020", es: "900+ unidades de vivienda asequible; $93M total dedicados a vivienda desde 2020" },
      { en: "Intersects with CalAIM Community Supports — FQHCs with housing navigation could benefit from increased stock", es: "Se cruza con Apoyos Comunitarios CalAIM — FQHCs con navegación de vivienda podrían beneficiarse de mayor inventario" },
    ],
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
    keyTakeaways: [
      { en: "Blue Shield invested $80K in Laura Rodriguez MA Institute at FHCSD — 710 hours of MA training", es: "Blue Shield invirtió $80K en el Instituto de MA Laura Rodríguez en FHCSD — 710 horas de formación de MA" },
      { en: "Direct FQHC workforce pipeline investment by a managed care plan — replicable model", es: "Inversión directa en fuerza laboral FQHC por un plan de salud — modelo replicable" },
      { en: "Supports full-time and part-time MA training tracks", es: "Apoya formación de MA de tiempo completo y parcial" },
    ],
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
    keyTakeaways: [
      { en: "HRSA increased OSV frequency: 30% more site visits scheduled in FY2026 vs FY2025", es: "HRSA aumentó frecuencia de OSV: 30% más visitas programadas en AF2026 vs AF2025" },
      { en: "Focus: governance documentation (42 CFR 330.304), sliding fee compliance, clinical quality reporting", es: "Enfoque: documentación de gobernanza (42 CFR 330.304), cumplimiento de tarifa escalonada, reportes de calidad clínica" },
      { en: "Non-compliance risks: conditions of award and potential scope reductions", es: "Riesgos de no cumplimiento: condiciones de premio y posibles reducciones de alcance" },
    ],
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
    keyTakeaways: [
      { en: "$1.5M settlement for breach affecting 28,000 patient records at multi-site community health center", es: "Acuerdo de $1.5M por violación que afectó 28,000 registros de pacientes en centro de salud comunitario multi-sitio" },
      { en: "Root cause: unencrypted email with PHI sent to vendor without current BAA", es: "Causa raíz: correo electrónico sin encriptar con PHI enviado a proveedor sin BAA vigente" },
      { en: "3-year corrective action plan required: annual risk assessments, workforce training, BAA remediation", es: "Plan de acción correctiva de 3 años requerido: evaluaciones de riesgo anuales, capacitación de personal, remediación de BAA" },
    ],
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
    sourceUrl: "https://oig.hhs.gov/fraud/enforcement/",
    sourceOrg: "HHS Office of Inspector General",
    region: "Federal",
    tags: ["oig", "false-claims", "billing-fraud", "pps", "ecm", "documentation", "enforcement"],
    keyTakeaways: [
      { en: "OIG recovered $4.7B in healthcare fraud in FY2025; FQHCs face increased PPS billing scrutiny", es: "OIG recuperó $4.7B en fraude de salud en AF2025; FQHCs enfrentan mayor escrutinio de facturación PPS" },
      { en: "Key risks: same-day billing errors, upcoding visit complexity, inadequate ECM/CCM documentation", es: "Riesgos clave: errores de facturación del mismo día, sobre-codificación de visitas, documentación inadecuada de ECM/CCM" },
      { en: "Three California FQHCs received subpoenas in Q4 2025", es: "Tres FQHCs de California recibieron citaciones en Q4 2025" },
      { en: "Action: implement internal billing audits, documentation training, automated coding compliance", es: "Acción: implementar auditorías internas de facturación, capacitación en documentación, cumplimiento de codificación automatizado" },
    ],
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
    keyTakeaways: [
      { en: "HRSA doubled 340B audits: 47 covered entities under review in Q1 2026", es: "HRSA duplicó auditorías 340B: 47 entidades cubiertas bajo revisión en Q1 2026" },
      { en: "Common violations: duplicate discounts, inadequate eligibility verification, missing pharmacy agreements", es: "Violaciones comunes: descuentos duplicados, verificación inadecuada de elegibilidad, acuerdos de farmacia faltantes" },
      { en: "Non-compliance: program repayment and suspension", es: "No cumplimiento: reembolso al programa y suspensión" },
      { en: "Action: demonstrate real-time eligibility checks, split-billing compliance, complete audit trails", es: "Acción: demostrar verificaciones de elegibilidad en tiempo real, cumplimiento de facturación dividida, rastros de auditoría completos" },
    ],
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
    keyTakeaways: [
      { en: "DHCS targeting 50 FQHCs for billing compliance review in 2026", es: "DHCS apuntando a 50 FQHCs para revisión de cumplimiento de facturación en 2026" },
      { en: "Focus: PPS encounter documentation, Medi-Cal billing accuracy, UIS patient tracking before Jul 2026 PPS elimination", es: "Enfoque: documentación de encuentros PPS, precisión de facturación Medi-Cal, seguimiento de pacientes UIS antes de eliminación PPS jul 2026" },
      { en: "Reviews will examine 24 months of billing data with focus on ECM/Community Supports claims", es: "Revisiones examinarán 24 meses de datos de facturación con enfoque en reclamos de ECM/Apoyos Comunitarios" },
    ],
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
    affectedOrgSlugs: ["shasta-community-health-center", "open-door-community-health-centers", "mountain-valleys-health-centers", "hill-country-community-clinic", "mchc-health-centers"],
    tags: ["rural-health", "hr1", "grants", "north-state", "north-coast", "central-valley", "behavioral-health"],
    keyTakeaways: [
      { en: "$50B Rural Health Transformation Program ($10B/year for 5 years, FY 2026-2030) inside H.R. 1", es: "Programa de Transformación de Salud Rural de $50B ($10B/año por 5 años, AF 2026-2030) dentro de H.R. 1" },
      { en: "CA likely allocation: ~$500M/year via competitive grants for rural FQHCs", es: "Asignación probable para CA: ~$500M/año mediante subvenciones competitivas para FQHCs rurales" },
      { en: "Targets North State, North Coast, and Central Valley regions — first new federal FQHC channel since ACA", es: "Apunta a regiones del Norte del Estado, Costa Norte y Valle Central — primer nuevo canal federal de FQHC desde el ACA" },
      { en: "Does not offset far larger Medicaid losses — but represents a new opportunity", es: "No compensa las pérdidas mucho mayores de Medicaid — pero representa una nueva oportunidad" },
    ],
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
    keyTakeaways: [
      { en: "CA FQHC APM launched Jan 1, 2026 — moving from fee-for-service to prospective global payments", es: "APM de FQHC de CA lanzado 1 ene 2026 — moviendo de pago por servicio a pagos globales prospectivos" },
      { en: "Revenue stability: decouples payment from visit volume — critical as Medicaid cuts reduce panels", es: "Estabilidad de ingresos: desacopla el pago del volumen de visitas — crítico mientras recortes de Medicaid reducen paneles" },
      { en: "Requires sophisticated cost accounting, care delivery restructuring, population health infrastructure", es: "Requiere contabilidad de costos sofisticada, reestructuración de entrega de atención, infraestructura de salud poblacional" },
      { en: "DHCS annual enrollment cycle — FQHCs can opt in during open periods", es: "Ciclo de inscripción anual de DHCS — FQHCs pueden optar durante períodos abiertos" },
    ],
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
    affectedOrgSlugs: ["ampla-health-sacramento"],
    tags: ["rural", "hospital-reopening", "north-state", "central-valley", "cms", "resilience"],
    keyTakeaways: [
      { en: "Glenn County's only hospital cleared CMS licensing hurdle to reopen — still needs millions in funding", es: "El único hospital del condado de Glenn superó obstáculo de licencias CMS para reabrir — aún necesita millones en financiamiento" },
      { en: "Rural Central Valley county lost sole hospital in 2023 — residents travel 30+ miles for emergency care", es: "Condado rural del Valle Central perdió su único hospital en 2023 — residentes viajan más de 30 millas para atención de emergencia" },
      { en: "Glenn County served by Ampla Health (region's primary FQHC)", es: "Condado de Glenn servido por Ampla Health (el FQHC principal de la región)" },
    ],
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
    keyTakeaways: [
      { en: "CA proposed 2026-27 budget: $222.4B for Medi-Cal, absorbing $1.1B+ in federal losses", es: "Presupuesto propuesto de CA 2026-27: $222.4B para Medi-Cal, absorbiendo $1.1B+ en pérdidas federales" },
      { en: "LAO warns: FMAP sunsetting + enrollment verification + UIS restrictions = multi-billion gap by 2028", es: "LAO advierte: expiración de FMAP + verificación de inscripción + restricciones UIS = brecha de miles de millones para 2028" },
      { en: "Budget negotiations will determine survival of FQHC supplemental payments, ECM funding, and CHW billing", es: "Negociaciones presupuestarias determinarán supervivencia de pagos suplementarios de FQHC, financiamiento ECM y facturación CHW" },
    ],
  },
  // --- Added 2026-03-26 ---
  {
    id: "ocr-sud-records-enforcement-feb-2026",
    date: "2026-02-16",
    headline: {
      en: "OCR Launches Civil Enforcement for Substance Use Disorder Patient Records — FQHCs with BH Programs Now in Scope",
      es: "OCR Lanza Cumplimiento Civil para Registros de Pacientes con Trastornos por Uso de Sustancias — FQHCs con Programas de Salud Conductual Ahora en Alcance",
    },
    summary: {
      en: "HHS Office for Civil Rights began enforcing confidentiality protections for substance use disorder (SUD) patient records under 42 CFR Part 2, now aligned with HIPAA penalty tiers. FQHCs operating behavioral health or SUD treatment programs must ensure their consent forms, EHR configurations, and staff training comply with the new enforcement framework. Noncompliance can trigger monetary settlements, corrective action plans, or civil money penalties.",
      es: "La Oficina de Derechos Civiles de HHS comenzó a hacer cumplir las protecciones de confidencialidad para registros de pacientes con trastornos por uso de sustancias (SUD) bajo 42 CFR Parte 2, ahora alineado con los niveles de penalización de HIPAA. Los FQHCs con programas de salud conductual o tratamiento de SUD deben asegurar que sus formularios de consentimiento, configuraciones de EHR y capacitación del personal cumplan con el nuevo marco de cumplimiento.",
    },
    category: "compliance",
    type: "news",
    impactLevel: "critical",
    sourceUrl: "https://www.hhs.gov/press-room/hhs-announce-civil-enforcement-program-sud-patient-records.html",
    sourceOrg: "HHS Office for Civil Rights",
    region: "Federal",
    tags: ["hipaa-privacy", "behavioral-health", "sud-compliance", "42-cfr-part-2"],
    keyTakeaways: [
      { en: "42 CFR Part 2 enforcement now aligned with HIPAA penalty tiers — real financial risk for noncompliance", es: "Cumplimiento de 42 CFR Parte 2 ahora alineado con niveles de penalización HIPAA — riesgo financiero real por incumplimiento" },
      { en: "FQHCs with SUD/BH programs must audit consent forms, EHR access controls, and staff training immediately", es: "FQHCs con programas SUD/BH deben auditar formularios de consentimiento, controles de acceso EHR y capacitación del personal de inmediato" },
      { en: "OCR can now investigate complaints and impose monetary penalties for SUD record mishandling", es: "OCR ahora puede investigar quejas e imponer penalidades monetarias por mal manejo de registros SUD" },
    ],
  },
  {
    id: "340b-child-site-registration-overturned-mar-2026",
    date: "2026-03-03",
    headline: {
      en: "Federal Court Overturns HRSA 340B Child Site Registration Requirement",
      es: "Tribunal federal anula requisito de registro de sitios secundarios 340B de HRSA",
    },
    summary: {
      en: "A federal district court vacated HRSA's requirement that off-site facilities (child sites) must appear on a hospital's Medicare cost report and be registered in OPAIS before purchasing drugs at 340B prices. This effectively returns pandemic-era flexibilities and may expand 340B purchasing eligibility for FQHCs with satellite locations.",
      es: "Un tribunal federal anuló el requisito de HRSA de que las instalaciones fuera del sitio (sitios secundarios) deben aparecer en el informe de costos de Medicare y estar registradas en OPAIS antes de comprar medicamentos a precios 340B. Esto devuelve las flexibilidades de la era pandémica y puede expandir la elegibilidad de compra 340B para FQHCs con ubicaciones satélite.",
    },
    category: "compliance",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.forvismazars.us/forsights/2026/03/340b-program-major-developments-through-early-2026",
    sourceOrg: "Forvis Mazars",
    region: "Federal",
    tags: ["340b", "child-site", "court-ruling", "pharmacy", "compliance"],
  },
  {
    id: "hrsa-340b-audit-scope-expanded-fy2026",
    date: "2026-03-15",
    headline: {
      en: "HRSA Expands FY2026 340B Audit Scope with 'Furnished' Language Change",
      es: "HRSA amplía alcance de auditoría 340B para AF2026 con cambio de lenguaje 'suministrado'",
    },
    summary: {
      en: "HRSA's updated Data Request List for FY2026 340B audits now includes 'furnished' alongside 'administered or dispensed,' broadening how covered entities must document drug transactions. Additional changes indicate increased scrutiny on locations receiving 340B-priced drugs and demonstration of covered entity ownership. FQHCs should update internal documentation and audit preparation procedures.",
      es: "La lista actualizada de solicitud de datos de HRSA para auditorías 340B del AF2026 ahora incluye 'suministrado' junto con 'administrado o dispensado,' ampliando cómo las entidades cubiertas deben documentar transacciones de medicamentos. Los cambios adicionales indican mayor escrutinio sobre las ubicaciones que reciben medicamentos a precios 340B.",
    },
    category: "compliance",
    type: "news",
    impactLevel: "medium",
    sourceUrl: "https://perspectives.cps.com/article-hrsa-changes-340b-data-request-list-fy26",
    sourceOrg: "CPS",
    region: "Federal",
    tags: ["340b", "hrsa-audit", "compliance", "documentation", "pharmacy"],
  },
  {
    id: "340b-rebate-model-pilot-vacated-feb-2026",
    date: "2026-02-10",
    headline: {
      en: "Federal Court Vacates 340B Rebate Model Pilot — Preserves Upfront Discount for FQHCs (For Now)",
      es: "Tribunal Federal Anula Piloto de Modelo de Reembolso 340B — Preserva Descuento Anticipado para FQHCs (Por Ahora)",
    },
    summary: {
      en: "In AHA v. Kennedy, the U.S. District Court for the District of Maine vacated HRSA's 340B Rebate Model Pilot Program, finding the agency's administrative record 'threadbare' and that it failed to consider the financial burden on providers of paying full price upfront and waiting for rebates. HRSA published a Request for Information (comments due April 20, 2026) as it reconsiders. NACHC plans to submit comments on detrimental impact to community health centers. The ruling preserves the current upfront 340B discount model — critical for FQHC pharmacy revenue.",
      es: "En AHA v. Kennedy, el Tribunal del Distrito de Maine anuló el Programa Piloto de Modelo de Reembolso 340B de HRSA, encontrando el registro administrativo 'escaso' y que no consideró la carga financiera sobre los proveedores. HRSA publicó una Solicitud de Información (comentarios hasta el 20 de abril de 2026). NACHC planea presentar comentarios sobre el impacto perjudicial para los centros de salud comunitarios.",
    },
    category: "compliance",
    type: "news",
    impactLevel: "critical",
    sourceUrl: "https://www.feldesman.com/hrsa-pauses-340b-rebate-model-pilot-program-following-federal-court-order/",
    sourceOrg: "Feldesman Tucker Leifer Fidell LLP",
    region: "Federal",
    tags: ["340b-compliance", "pharmacy-revenue", "aha-v-kennedy", "hrsa-rfi"],
    keyTakeaways: [
      { en: "Court found HRSA's 340B rebate model record 'threadbare' — vacated the pilot program", es: "Tribunal encontró el registro del modelo de reembolso 340B de HRSA 'escaso' — anuló el programa piloto" },
      { en: "HRSA RFI open until April 20, 2026 — FQHCs should submit comments via NACHC", es: "RFI de HRSA abierta hasta el 20 de abril de 2026 — FQHCs deben enviar comentarios a través de NACHC" },
      { en: "Current upfront 340B discount preserved for now — critical pharmacy revenue protection", es: "Descuento anticipado 340B actual preservado por ahora — protección crítica de ingresos de farmacia" },
    ],
  },
  {
    id: "kff-la-safety-net-clinics-sales-tax-march-2026",
    date: "2026-03-25",
    headline: {
      en: "KFF Health News: LA Safety-Net Clinics Push Half-Cent Sales Tax as Federal and State Cuts Converge",
      es: "KFF Health News: Clínicas de Red de Seguridad de LA Impulsan Impuesto de Medio Centavo mientras Convergen Recortes Federales y Estatales",
    },
    summary: {
      en: "A KFF Health News investigation details how LA County community clinics face simultaneous federal (H.R. 1 Medicaid cuts), state (enrollment freeze, PPS elimination for undocumented), and county funding reductions. Venice Family Clinic reports 80% of its 45,000 patients rely on Medi-Cal. Community health leaders warn of 'closing several health centers' and 'laying off hundreds of staff' without new revenue. The proposed five-year, half-cent county sales tax is the coalition's primary strategy to backfill an estimated $750M/year DHS shortfall by 2028.",
      es: "Una investigación de KFF Health News detalla cómo las clínicas comunitarias del Condado de LA enfrentan recortes simultáneos federales (H.R. 1), estatales (congelamiento de inscripciones, eliminación de PPS para indocumentados) y del condado. Venice Family Clinic reporta que el 80% de sus 45,000 pacientes dependen de Medi-Cal. Líderes de salud comunitaria advierten sobre el 'cierre de varios centros de salud' sin nuevos ingresos.",
    },
    category: "funding",
    type: "news",
    impactLevel: "critical",
    sourceUrl: "https://kffhealthnews.org/news/article/federal-cuts-state-tax-increases-budget-shortfalls-health-clinics-los-angeles-california/",
    sourceOrg: "KFF Health News",
    region: "Los Angeles County",
    tags: ["los-angeles", "sales-tax", "venice-family-clinic", "funding-convergence", "safety-net"],
    keyTakeaways: [
      { en: "Venice Family Clinic: 80% of 45,000 patients on Medi-Cal — existential funding risk from triple convergence", es: "Venice Family Clinic: 80% de 45,000 pacientes en Medi-Cal — riesgo existencial de financiamiento por triple convergencia" },
      { en: "LA County DHS faces $750M/year shortfall by 2028 — half-cent sales tax is primary backfill strategy", es: "DHS del Condado de LA enfrenta déficit de $750M/año para 2028 — impuesto de medio centavo es estrategia principal" },
      { en: "KFF investigation confirms federal + state + county cuts hitting simultaneously — unprecedented for LA safety net", es: "Investigación de KFF confirma recortes federales + estatales + del condado golpeando simultáneamente — sin precedentes para red de seguridad de LA" },
    ],
  },
  {
    id: "caloptima-8pct-membership-drop-hr1-march-2026",
    date: "2026-03-22",
    headline: {
      en: "CalOptima Loses 8% of Membership Since H.R. 1 — OC FQHCs Face Revenue Decline",
      es: "CalOptima Pierde 8% de Membresía Desde H.R. 1 — FQHCs de OC Enfrentan Disminución de Ingresos",
    },
    summary: {
      en: "CalOptima, Orange County's Medi-Cal managed care plan, has lost approximately 67,000 members (8% decline, from 886K to 819K) since H.R. 1 was signed into law. The enrollment drop directly reduces revenue flowing to OC-based FQHCs like Share Our Selves, AltaMed's OC sites, and CHOC Community Clinic. OC Health Care Agency is simultaneously closing several public health clinics, pushing more uninsured patients to FQHCs without corresponding reimbursement.",
      es: "CalOptima, el plan de atención administrada de Medi-Cal del Condado de Orange, ha perdido aproximadamente 67,000 miembros (8% de disminución, de 886K a 819K) desde que se firmó H.R. 1. La caída de inscripciones reduce directamente los ingresos de FQHCs en OC como Share Our Selves y sitios de AltaMed en OC.",
    },
    category: "funding",
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://jrreport.wordandbrown.com/2026/03/24/california-hospitals-laying-off-thousands-as-funding-cuts-trickle-down/",
    sourceOrg: "JR Report / Word & Brown",
    region: "Orange County",
    affectedOrgSlugs: ["share-our-selves", "altamed"],
    tags: ["orange-county", "caloptima", "enrollment-loss", "managed-care", "hr-1"],
    keyTakeaways: [
      { en: "CalOptima membership: 886K → 819K (-67K, -8%) since H.R. 1 — direct FQHC revenue impact in OC", es: "Membresía de CalOptima: 886K → 819K (-67K, -8%) desde H.R. 1 — impacto directo en ingresos de FQHC en OC" },
      { en: "OC HCA closing public clinics simultaneously — more uninsured patients flowing to FQHCs", es: "OC HCA cerrando clínicas públicas simultáneamente — más pacientes sin seguro fluyendo a FQHCs" },
    ],
  },
  {
    id: "uc-berkeley-72k-145k-healthcare-job-loss-projection",
    date: "2026-03-24",
    headline: {
      en: "UC Berkeley Projects 72,000-145,000 California Healthcare Job Losses from Medicaid Cuts",
      es: "UC Berkeley Proyecta 72,000-145,000 Pérdidas de Empleos de Salud en California por Recortes de Medicaid",
    },
    summary: {
      en: "The UC Berkeley Labor Center estimates that H.R. 1 Medicaid cuts will eliminate 72,000 to 145,000 healthcare jobs statewide — 3-5% of California's 2.65 million healthcare workforce. The projection encompasses hospitals, clinics, and home care. L.A. Care CEO Martha Santana-Chin projects losing 650,000 members (30% drop) by end of 2028. Combined with the JR Report tally of 3,400+ hospital workers already laid off as of mid-March, the second wave is expected as funding cuts phase in through 2028.",
      es: "El Centro Laboral de UC Berkeley estima que los recortes de Medicaid de H.R. 1 eliminarán 72,000 a 145,000 empleos de salud en todo el estado — 3-5% de los 2.65 millones de trabajadores de salud de California. La CEO de L.A. Care proyecta perder 650,000 miembros (30% de caída) para finales de 2028.",
    },
    category: "workforce",
    type: "news",
    impactLevel: "critical",
    sourceUrl: "https://jrreport.wordandbrown.com/2026/03/24/california-hospitals-laying-off-thousands-as-funding-cuts-trickle-down/",
    sourceOrg: "JR Report / Word & Brown (citing UC Berkeley Labor Center)",
    region: "California",
    tags: ["uc-berkeley", "job-loss-projection", "medicaid-cuts", "workforce-crisis", "la-care"],
    keyTakeaways: [
      { en: "UC Berkeley: 72K-145K healthcare jobs at risk statewide (3-5% of 2.65M workforce)", es: "UC Berkeley: 72K-145K empleos de salud en riesgo en todo el estado (3-5% de 2.65M fuerza laboral)" },
      { en: "L.A. Care CEO: projects 650K member loss (30% drop) by 2028 — largest public health plan in LA", es: "CEO de L.A. Care: proyecta pérdida de 650K miembros (30% de caída) para 2028 — mayor plan de salud público en LA" },
      { en: "Second wave of layoffs expected as H.R. 1 funding cuts phase in through 2028", es: "Segunda ola de despidos esperada mientras recortes de H.R. 1 se implementan hasta 2028" },
    ],
  },
  {
    id: "nachc-select-pointcare-coverage-management-2026",
    date: "2026-03-01",
    headline: {
      en: "NACHC Select Partners with Pointcare for Medicaid Coverage Loss Prevention at CHCs",
      es: "NACHC Select se Asocia con Pointcare para Prevención de Pérdida de Cobertura Medicaid en CHCs",
    },
    summary: {
      en: "NACHC's wholly owned subsidiary NACHC Select announced a strategic partnership with Pointcare, which already serves 80+ community health centers managing coverage for 1.8 million patients. The platform proactively identifies patients at risk of losing Medicaid coverage and automates re-enrollment workflows. With CalOptima and L.A. Care both reporting significant enrollment drops since H.R. 1, this kind of coverage retention tool is increasingly critical for FQHC revenue protection.",
      es: "NACHC Select anunció una asociación estratégica con Pointcare, que ya sirve a más de 80 centros de salud comunitarios gestionando cobertura para 1.8 millones de pacientes. La plataforma identifica proactivamente pacientes en riesgo de perder cobertura de Medicaid y automatiza flujos de re-inscripción.",
    },
    category: "change-management",
    type: "news",
    impactLevel: "medium",
    sourceUrl: "https://www.nachc.org/category/press-releases/",
    sourceOrg: "NACHC",
    region: "Federal",
    tags: ["nachc-select", "pointcare", "coverage-management", "enrollment-retention", "revenue-protection"],
  },

  // ── Daily Update #26 (2026-04-06) ──────────────────────────────────

  {
    id: "medi-cal-dental-1b-cut-coalition-april-2026",
    date: "2026-04-06",
    headline: {
      en: "Governor Proposes $1B Medi-Cal Dental Cut — 49% of Dentists Would Leave Program",
      es: "Gobernador Propone Recorte de $1B a Dental de Medi-Cal — 49% de Dentistas Abandonarían el Programa",
    },
    summary: {
      en: "Governor Newsom proposed cutting $1 billion from Medi-Cal Dental effective July 1, 2026, reducing reimbursement rates by 40-80%. A 70+ group 'Save Our Dental Care' coalition (CDA, children's advocacy, labor) is fighting back. 49% of Medi-Cal dentists say they would leave the program; another 30% would reduce Medi-Cal patients. The cut forfeits ~$576M in federal matching funds. FQHC dental programs serving 15 million Californians on Medi-Cal Dental face devastating revenue losses — compounding the undocumented dental elimination already in effect.",
      es: "El Gobernador Newsom propuso recortar $1 mil millones del programa dental de Medi-Cal a partir del 1 de julio de 2026, reduciendo las tasas de reembolso un 40-80%. Una coalición de más de 70 grupos 'Salvemos Nuestro Cuidado Dental' está luchando. El 49% de los dentistas de Medi-Cal abandonarían el programa. El recorte pierde ~$576M en fondos federales correspondientes. Los programas dentales de FQHCs enfrentan pérdidas devastadoras de ingresos.",
    },
    category: "funding",
    impactLevel: "critical",
    type: "news",
    sourceUrl: "https://www.cda.org/newsroom/advocacy/cda-convened-coalition-of-70-plus-groups-fights-to-stop-1b-cuts-to-medi-cal-dental/",
    sourceOrg: "California Dental Association",
    region: "California",
    tags: ["medi-cal-dental", "reimbursement-cut", "coalition", "dental-access", "may-revise"],
    keyTakeaways: [
      { en: "$1B cut = 40-80% rate reduction for Medi-Cal Dental", es: "Recorte de $1B = reducción del 40-80% en tarifas dentales de Medi-Cal" },
      { en: "49% of dentists would leave Medi-Cal + 30% would reduce patients", es: "49% de dentistas abandonarían Medi-Cal + 30% reducirían pacientes" },
      { en: "Forfeits ~$576M in federal matching (9:1 for ACA expansion)", es: "Pierde ~$576M en fondos federales correspondientes (9:1 para expansión ACA)" },
      { en: "70+ group coalition fighting before May Revise deadline", es: "Coalición de 70+ grupos luchando antes de la fecha límite de Revisión de Mayo" },
    ],
  },
  {
    id: "health-net-1m-work-requirements-campaign-april-2026",
    date: "2026-04-01",
    headline: {
      en: "Health Net Commits $1M to Prepare 4.7M Medi-Cal Members for Work Requirements",
      es: "Health Net Compromete $1M para Preparar 4.7M Miembros de Medi-Cal para Requisitos Laborales",
    },
    summary: {
      en: "Health Net (Centene subsidiary) launched 'Get Informed, Stay Covered' — the first managed care plan to begin formal member outreach for H.R. 1 work requirements taking effect January 2027. California will check eligibility every 6 months. DHCS requires outreach June 30 – August 31, 2026. FQHCs must prepare for massive patient documentation burden: helping patients navigate 80-hour/month activity requirements, exemptions, and compliance reporting to avoid procedural disenrollment.",
      es: "Health Net (subsidiaria de Centene) lanzó 'Infórmate, Mantén tu Cobertura' — el primer plan de salud administrado en iniciar divulgación formal a miembros sobre requisitos laborales de H.R. 1 vigentes desde enero 2027. California verificará elegibilidad cada 6 meses. Los FQHCs deben prepararse para una carga masiva de documentación de pacientes.",
    },
    category: "legislation",
    impactLevel: "high",
    type: "deadline",
    sourceUrl: "https://news.healthnet.com/medi-cal-enrollees-prepare-for-new-community-engagement-requirements-health-net-launches-get-informed-stay-covered-to-educate-members/",
    sourceOrg: "Health Net / Centene",
    region: "California",
    tags: ["work-requirements", "medi-cal", "h-r-1", "health-net", "centene", "outreach"],
    keyTakeaways: [
      { en: "First managed care plan to begin work requirement outreach", es: "Primer plan de salud administrado en iniciar divulgación sobre requisitos laborales" },
      { en: "DHCS outreach window: June 30 – August 31, 2026", es: "Ventana de divulgación de DHCS: 30 de junio – 31 de agosto, 2026" },
      { en: "Jan 2027: 80-hr/month activity requirement + 6-month eligibility checks", es: "Enero 2027: requisito de actividad de 80 hrs/mes + verificaciones de elegibilidad cada 6 meses" },
    ],
  },
  {
    id: "nebraska-first-state-work-requirements-may-2026",
    date: "2026-04-06",
    headline: {
      en: "Nebraska Becomes First State to Enforce Medicaid Work Requirements May 1",
      es: "Nebraska Se Convierte en Primer Estado en Aplicar Requisitos Laborales de Medicaid el 1 de Mayo",
    },
    summary: {
      en: "Nebraska will enforce 80-hour/month work requirements starting May 1, 2026 — 8 months ahead of the federal January 2027 mandate. This is the first real-world test of how work requirements affect community health center patient panels and revenue. KFF estimates work requirements nationally will leave 5.3 million newly uninsured. Nebraska CHCs will serve as the early warning system for California FQHCs.",
      es: "Nebraska aplicará requisitos laborales de 80 horas/mes a partir del 1 de mayo de 2026 — 8 meses antes del mandato federal de enero 2027. Esta es la primera prueba real de cómo los requisitos laborales afectan los paneles de pacientes y los ingresos de los centros de salud comunitarios. KFF estima que los requisitos laborales dejarán 5.3 millones de personas sin seguro.",
    },
    category: "legislation",
    impactLevel: "high",
    type: "news",
    sourceUrl: "https://www.kff.org/medicaid/a-closer-look-at-nebraska-the-first-state-planning-to-implement-a-medicaid-work-requirement/",
    sourceOrg: "KFF",
    region: "Federal",
    tags: ["work-requirements", "nebraska", "medicaid", "early-warning", "coverage-loss"],
  },
  {
    id: "ninth-circuit-fca-340b-overcharges-march-2026",
    date: "2026-03-17",
    headline: {
      en: "Ninth Circuit Opens Door to FCA Liability for 340B Overcharges — New Legal Pathway for FQHCs",
      es: "Noveno Circuito Abre Puerta a Responsabilidad bajo FCA por Sobreprecios 340B — Nueva Vía Legal para FQHCs",
    },
    summary: {
      en: "The Ninth Circuit unanimously reversed a dismissal in United States ex rel. Adventist Health System v. AbbVie, ruling that qui tam False Claims Act suits can proceed against pharmaceutical manufacturers that allegedly overcharge 340B covered entities above the statutory ceiling price. This creates a new private enforcement mechanism — previously only HRSA could enforce 340B ceiling price compliance. FQHCs can now pursue treble damages against manufacturers overcharging on 340B drugs.",
      es: "El Noveno Circuito revirtió unánimemente una desestimación, dictaminando que las demandas qui tam bajo la Ley de Reclamaciones Falsas pueden proceder contra fabricantes farmacéuticos que supuestamente sobrecargan a las entidades cubiertas por 340B. Esto crea un nuevo mecanismo de aplicación privada para que los FQHCs recuperen daños triples.",
    },
    category: "compliance",
    impactLevel: "high",
    type: "news",
    sourceUrl: "https://fcablog.sidley.com/2026/03/19/ninth-circuit-opens-door-to-fca-liability-for-alleged-340b-overcharges/",
    sourceOrg: "Sidley Austin LLP",
    region: "Federal",
    tags: ["340b", "false-claims-act", "ninth-circuit", "pharmaceutical", "ceiling-price", "enforcement"],
    paywalled: false,
  },
  {
    id: "hrsa-340b-rebate-rfi-april-20-deadline",
    date: "2026-04-20",
    headline: {
      en: "HRSA 340B Rebate Model RFI: Comment Deadline April 20 — Possible Expansion to All IRA Drugs",
      es: "RFI del Modelo de Reembolso 340B de HRSA: Fecha Límite de Comentarios 20 de Abril — Posible Expansión a Todos los Medicamentos IRA",
    },
    summary: {
      en: "After a Maine federal court vacated the original 340B rebate pilot program, HRSA is gathering stakeholder input with a 60-day comment window closing April 20. HRSA has signaled it may expand the rebate model to ALL drugs selected for Medicare price negotiation under the IRA through 2027. FQHCs that depend on 340B upfront discounts for cash flow could face a shift to delayed rebate payments — a devastating change for smaller FQHCs without reserves.",
      es: "Después de que un tribunal federal de Maine anuló el programa piloto de reembolso 340B, HRSA está recopilando comentarios de partes interesadas con una ventana que cierra el 20 de abril. HRSA ha señalado que podría expandir el modelo a TODOS los medicamentos negociados bajo la IRA. Los FQHCs que dependen de descuentos anticipados 340B podrían enfrentar un cambio a pagos diferidos.",
    },
    category: "legislation",
    impactLevel: "high",
    type: "deadline",
    sourceUrl: "https://www.federalregister.gov/documents/2026/02/26/2026-03838/request-for-information-340b-rebate-model-pilot-program-extension",
    sourceOrg: "Federal Register / HRSA",
    region: "Federal",
    tags: ["340b", "rebate-model", "rfi", "ira", "deadline", "comment-period"],
  },
  {
    id: "hhs-omh-closure-clas-infrastructure-threat",
    date: "2026-04-06",
    headline: {
      en: "HHS Shuts Down Minority Health Offices — CLAS Training Infrastructure at Risk for FQHCs",
      es: "HHS Cierra Oficinas de Salud de Minorías — Infraestructura de Capacitación CLAS en Riesgo para FQHCs",
    },
    summary: {
      en: "The CMS Office of Minority Health (~40 employees eliminated) and HHS Office of Minority Health have been restructured under federal cost-cutting. OMH sponsors Think Cultural Health and free CLAS Standards training that FQHCs rely on for staff cultural competency education. CMS funding would drop $674M, explicitly eliminating health equity funding categories. FQHCs may need to self-fund cultural competency training previously available free from HHS. FY2026 budget proposes ~26% cut to HHS discretionary spending.",
      es: "La Oficina de Salud de Minorías de CMS (~40 empleados eliminados) y la Oficina de Salud de Minorías de HHS han sido reestructuradas. La OMH patrocina Think Cultural Health y capacitación gratuita de Estándares CLAS que los FQHCs utilizan para la educación de competencia cultural del personal. Los FQHCs podrían necesitar autofinanciar la capacitación de competencia cultural.",
    },
    category: "legislation",
    impactLevel: "high",
    type: "news",
    sourceUrl: "https://www.healthcaredive.com/news/hhs-kennedy-cuts-cms-minority-health-offices/743966/",
    sourceOrg: "Healthcare Dive",
    region: "Federal",
    tags: ["hhs", "omh", "clas-standards", "cultural-competency", "health-equity", "restructuring"],
  },
  {
    id: "cms-maha-elevate-100m-fqhc-eligible",
    date: "2026-04-06",
    headline: {
      en: "CMS Opens $100M MAHA ELEVATE Model for Lifestyle Medicine — FQHCs Eligible",
      es: "CMS Abre Modelo MAHA ELEVATE de $100M para Medicina de Estilo de Vida — FQHCs Elegibles",
    },
    summary: {
      en: "CMS Innovation Center is funding up to 30 cooperative agreements (~$3.3M each over 3 years) for whole-person lifestyle medicine approaches in Original Medicare. FQHCs are explicitly eligible. This is the first CMS model branded under MAHA priorities. Awards launch October 2026. All proposals must incorporate nutrition or physical activity — signaling policy direction toward 'lifestyle' interventions over traditional SDOH approaches.",
      es: "El Centro de Innovación de CMS financia hasta 30 acuerdos cooperativos (~$3.3M cada uno en 3 años) para enfoques de medicina de estilo de vida en Medicare Original. Los FQHCs son explícitamente elegibles. Este es el primer modelo de CMS bajo prioridades MAHA. Los premios comienzan en octubre 2026.",
    },
    category: "funding",
    impactLevel: "medium",
    type: "deadline",
    sourceUrl: "https://www.cms.gov/priorities/innovation/innovation-models/maha-elevate",
    sourceOrg: "CMS Innovation Center",
    region: "Federal",
    tags: ["cms", "maha", "elevate", "lifestyle-medicine", "grant", "innovation-model"],
  },

  // ── Daily Update #27 (2026-04-07) ──────────────────────────────────

  {
    id: "lao-hr1-provider-financing-impact-3-2b-april-2026",
    date: "2026-04-06",
    headline: {
      en: "LAO: H.R. 1 Will Cost California $3.2B Through Provider Tax Restrictions and FMAP Cuts",
      es: "LAO: H.R. 1 Costar\u00e1 a California $3.2B por Restricciones en Impuestos a Proveedores y Recortes FMAP",
    },
    summary: {
      en: "The California Legislative Analyst\u2019s Office published its April 6 fiscal analysis quantifying H.R. 1\u2019s damage: $5.1B in provider tax revenue eliminated, administrative cost sharing drops to 25% federal / 75% state effective October 2026, and Medi-Cal rates will edge toward Medicare levels via directed payment caps beginning 2028. Net state cost: $3.2B. FQHCs already on negative margins face further reimbursement compression.",
      es: "La Oficina del Analista Legislativo de California public\u00f3 su an\u00e1lisis fiscal del 6 de abril cuantificando el da\u00f1o de H.R. 1: $5.1B en ingresos de impuestos a proveedores eliminados, costo administrativo compartido baja a 25% federal / 75% estatal desde octubre 2026. Costo neto estatal: $3.2B.",
    },
    category: "legislation",
    impactLevel: "critical",
    type: "news",
    sourceUrl: "https://lao.ca.gov/handouts/health/2026/HR1-Financing-Impact-on-Medi-Cal-Providers-040626.pdf",
    sourceOrg: "California Legislative Analyst\u2019s Office",
    region: "California",
    tags: ["lao", "hr-1", "provider-tax", "fmap", "medi-cal", "reimbursement"],
    keyTakeaways: [
      { en: "$5.1B in provider tax revenue eliminated by H.R. 1", es: "$5.1B en ingresos de impuestos a proveedores eliminados" },
      { en: "Admin cost sharing drops to 25% federal / 75% state (Oct 2026)", es: "Costo administrativo compartido baja a 25% federal / 75% estatal (oct 2026)" },
      { en: "Medi-Cal rates edge toward Medicare levels via directed payment caps (2028)", es: "Tarifas de Medi-Cal se acercan a niveles de Medicare (2028)" },
    ],
  },
  {
    id: "third-circuit-340b-contract-pharmacy-restrictions-legal",
    date: "2026-01-30",
    headline: {
      en: "Third Circuit Rules Drug Manufacturer 340B Contract Pharmacy Restrictions Are Legal",
      es: "Tercer Circuito Dictamina que Restricciones de Fabricantes a Farmacias Contratadas 340B Son Legales",
    },
    summary: {
      en: "The U.S. Court of Appeals for the Third Circuit unanimously ruled that manufacturer restrictions on 340B contract pharmacy access are lawful and HRSA\u2019s policy prohibiting them is unlawful. 18 manufacturers now restrict contract pharmacy access. Devastating for FQHCs without in-house pharmacies who rely on contract pharmacy arrangements for 340B savings. Combined with the rebate pilot court-ordered pause and expanded audit requirements, 340B contract pharmacy revenue faces pressure from three directions.",
      es: "El Tribunal de Apelaciones del Tercer Circuito dictamin\u00f3 un\u00e1nimemente que las restricciones de fabricantes al acceso de farmacias contratadas 340B son legales. 18 fabricantes ahora restringen el acceso. Devastador para FQHCs sin farmacias propias.",
    },
    category: "compliance",
    impactLevel: "critical",
    type: "news",
    sourceUrl: "https://www.bassberry.com/news/third-circuit-ruling-allows-restrictions-on-340b-contract-pharmacies/",
    sourceOrg: "Bass Berry & Sims",
    region: "Federal",
    tags: ["340b", "contract-pharmacy", "third-circuit", "manufacturer-restrictions", "compliance"],
  },
  {
    id: "san-joaquin-county-76-9m-hr1-budget-impact",
    date: "2026-03-19",
    headline: {
      en: "San Joaquin County: $76.9M Budget Hole from H.R. 1 \u2014 15% of 314K Medi-Cal Enrollees May Lose Coverage",
      es: "Condado de San Joaqu\u00edn: D\u00e9ficit de $76.9M por H.R. 1 \u2014 15% de 314K Inscritos en Medi-Cal Podr\u00edan Perder Cobertura",
    },
    summary: {
      en: "San Joaquin County projects a $76.9M budget impact from H.R. 1. County clinics face up to $9M revenue loss since 85% of Medi-Cal recipients use county clinics. 314,058 residents (39% of county population) rely on Medi-Cal. Hospital closures possible \u2014 San Joaquin General could see 32% increase in ambulance calls. Supervisor Rickman called it \u201Cdire.\u201D",
      es: "El Condado de San Joaqu\u00edn proyecta un impacto presupuestario de $76.9M por H.R. 1. Las cl\u00ednicas del condado enfrentan hasta $9M en p\u00e9rdida de ingresos. 314,058 residentes (39% de la poblaci\u00f3n) dependen de Medi-Cal.",
    },
    category: "funding",
    impactLevel: "high",
    type: "news",
    sourceUrl: "https://www.lodinews.com/news/article_d4d7ab27-b439-462e-8e00-fdbbfd7368e9.html",
    sourceOrg: "Lodi News-Sentinel",
    region: "San Joaquin County",
    tags: ["san-joaquin", "central-valley", "hr-1", "budget-deficit", "medi-cal"],
  },
  {
    id: "clinica-sierra-vista-15-7m-hq-bakersfield-april-2026",
    date: "2026-04-01",
    headline: {
      en: "Clinica Sierra Vista Invests $15.7M in First Owned Headquarters in Bakersfield",
      es: "Clinica Sierra Vista Invierte $15.7M en Su Primera Sede Propia en Bakersfield",
    },
    summary: {
      en: "Clinica Sierra Vista, one of California\u2019s largest FQHCs (55 years, Central Valley), purchased a 99,368 sq ft building from Chevron for $15.7M at 9525 Camino Media, Bakersfield. Effective April 1, 2026. First owned corporate office (previously leased). Signals institutional stability despite the funding crisis \u2014 but also raises questions about capital allocation during revenue uncertainty.",
      es: "Clinica Sierra Vista compr\u00f3 un edificio de 99,368 pies cuadrados de Chevron por $15.7M en Bakersfield. Su primera oficina corporativa propia. Se\u00f1ala estabilidad institucional a pesar de la crisis de financiamiento.",
    },
    category: "change-management",
    impactLevel: "medium",
    type: "news",
    sourceUrl: "https://clinicasierravista.org/clinica-sierra-vista-relocates-corporate-headquarters-to-9525-camino-media-bakersfield-effective-april-1-2026/",
    sourceOrg: "Clinica Sierra Vista",
    region: "Central Valley",
    affectedOrgSlugs: ["clinica-sierra-vista"],
    tags: ["clinica-sierra-vista", "headquarters", "capital-investment", "central-valley"],
  },

  // ── Daily Update #26 (2026-04-09) ──────────────────────────────

  {
    id: "hrsa-125m-nutrition-maha-award-april-2026",
    date: "2026-04-08",
    headline: {
      en: "HRSA Awards $125M for Nutrition Services at Health Centers Under MAHA Initiative",
      es: "HRSA Otorga $125M para Servicios de Nutrición en Centros de Salud Bajo Iniciativa MAHA",
    },
    summary: {
      en: "HRSA announced $135M+ in funding: $125M to 350+ health centers for nutrition services and food-based interventions within primary care (preventing/managing chronic illness), plus $11.25M for 15 Rural Residency Planning grants ($750K each for family medicine, psychiatry, OB/GYN, surgery). Branded under MAHA (Make America Healthy Again) priorities. This is the first major MAHA-branded funding to directly reach FQHCs.",
      es: "HRSA anunció $135M+ en fondos: $125M para más de 350 centros de salud para servicios de nutrición e intervenciones alimentarias, más $11.25M para 15 becas de Residencia Rural. Bajo prioridades MAHA.",
    },
    category: "funding",
    impactLevel: "high",
    type: "news",
    sourceUrl: "https://health.gov/news/hrsa-announces-more-135-million-expand-nutrition-services-and-strengthen-rural-health",
    sourceOrg: "Health.gov / HRSA",
    region: "National",
    tags: ["hrsa", "maha", "nutrition", "food-as-medicine", "funding"],
  },
  {
    id: "paragon-institute-19b-mco-tax-exposure-april-2026",
    date: "2026-04-07",
    headline: {
      en: "Paragon Institute Report: $19B in State Medicaid Funding at Risk from MCO Tax Phase-Out",
      es: "Informe Paragon: $19B en Fondos Estatales de Medicaid en Riesgo por Eliminación del Impuesto MCO",
    },
    summary: {
      en: "CMS released guidance requiring states to wind down MCO taxes by end of FY2026 under H.R. 1 provision. California's MCO tax raises $8.4B in 2025 (99%+ from Medicaid MCOs), generating a projected $19.4B over 4 years through federal matching. CMS estimates $33-75B in federal savings 2026-2030. For California FQHCs, this threatens the Medi-Cal rate increases and program expansions funded by Prop 35 MCO tax revenue. Paragon Institute analysis shows states have no state-funded replacement.",
      es: "CMS emitió guía requiriendo que los estados eliminen impuestos MCO para el fin del año fiscal 2026. El impuesto MCO de California genera $8.4B en 2025, con $19.4B proyectados en 4 años. Amenaza aumentos de tarifas de Medi-Cal para FQHCs.",
    },
    category: "funding",
    impactLevel: "critical",
    type: "news",
    sourceUrl: "https://www.aha.org/news/blog/2025-04-03-cuts-state-medicaid-finance-methods-would-limit-access-care-everyone",
    sourceOrg: "AHA / Paragon Health Institute analysis",
    region: "National",
    tags: ["mco-tax", "prop-35", "medicaid", "hr-1", "state-financing"],
  },
  {
    id: "chcf-2026-health-policy-survey-april",
    date: "2026-04-08",
    headline: {
      en: "CHCF 2026 Health Policy Survey: 72% of Californians Worry About Losing Health Coverage",
      es: "Encuesta CHCF 2026: 72% de Californianos Preocupados por Perder Cobertura de Salud",
    },
    summary: {
      en: "The California Health Care Foundation's annual health policy survey found 72% of adults worry about losing health coverage amid federal Medicaid cuts. Key findings: 81% support state action to protect coverage, 65% would pay more in taxes to preserve Medi-Cal. Survey of 1,700+ adults provides FQHCs with data to support advocacy and demonstrates public mandate for safety-net protection.",
      es: "La encuesta anual de CHCF encontró que 72% de los adultos californianos se preocupan por perder cobertura de salud. 81% apoya acción estatal para proteger la cobertura, 65% pagaría más impuestos para preservar Medi-Cal.",
    },
    category: "patient-story",
    impactLevel: "medium",
    type: "news",
    sourceUrl: "https://www.chcf.org/publication/2026-edition-health-policy-survey/",
    sourceOrg: "CHCF",
    region: "California",
    tags: ["chcf", "public-opinion", "medi-cal", "coverage-anxiety", "advocacy-data"],
  },
  {
    id: "sjc-22012-undocumented-dental-cuts-county-data",
    date: "2026-04-05",
    headline: {
      en: "San Joaquin County: 22,012 Undocumented Residents Losing Medi-Cal Dental Benefits July 1",
      es: "Condado de San Joaquín: 22,012 Residentes Indocumentados Perderán Beneficios Dentales de Medi-Cal el 1 de Julio",
    },
    summary: {
      en: "First county-level quantification of undocumented dental benefit cuts: 22,012 San Joaquin County residents will lose Medi-Cal dental coverage on July 1 under UIS rollback. FQHCs in the county (Community Medical Centers, Golden Valley Health Centers) will see these patients shift to emergency-only dental or uninsured status. Data from Manteca Bulletin based on county health department analysis.",
      es: "Primera cuantificación a nivel de condado de recortes dentales a indocumentados: 22,012 residentes del condado de San Joaquín perderán cobertura dental de Medi-Cal el 1 de julio.",
    },
    category: "undocumented-access",
    impactLevel: "medium",
    type: "news",
    sourceUrl: "https://www.mantecabulletin.com/news/local-news/medi-cal-dental-cuts-coming-for-22012-illegals-in-sj-county/",
    sourceOrg: "Manteca Bulletin",
    region: "San Joaquin County",
    affectedOrgSlugs: ["community-medical-centers", "golden-valley-health-centers"],
    tags: ["san-joaquin", "dental", "undocumented", "uis-rollback", "county-data"],
  },
  {
    id: "la-medi-cal-enrollment-crisis-hr1-redeterminations-2026",
    date: "2026-04-07",
    headline: {
      en: "LA County Medi-Cal Enrollment Crisis: Redeterminations + Asset Limits + Undocumented Cutoffs Converge",
      es: "Crisis de Inscripción en Medi-Cal del Condado de LA: Redeterminaciones + Límites de Activos + Recortes a Indocumentados Convergen",
    },
    summary: {
      en: "Three simultaneous Medi-Cal eligibility changes hit LA County in 2026: (1) asset limits reinstated Jan 1 ($130K individual), (2) undocumented adult enrollment frozen Jan 1, (3) H.R. 1 accelerated redeterminations (every 6 months vs annual) beginning Q3 2026. L.A. Care Health Plan — the largest public Medicaid plan in the US — is actively warning members. AltaMed published redetermination FAQs for patients. LA County FQHCs face revenue disruption as disenrollment waves begin.",
      es: "Tres cambios simultáneos de elegibilidad de Medi-Cal golpean al Condado de LA en 2026: límites de activos restaurados, inscripción de indocumentados congelada, y redeterminaciones aceleradas bajo H.R. 1. FQHCs del Condado de LA enfrentan interrupción de ingresos.",
    },
    category: "legislation",
    impactLevel: "high",
    type: "news",
    sourceUrl: "https://www.lacare.org/members/HR1-eligibility-benefits-changes",
    sourceOrg: "L.A. Care Health Plan",
    region: "Los Angeles",
    tags: ["los-angeles", "medi-cal", "redeterminations", "hr-1", "enrollment-crisis", "ccalac"],
  },
  {
    id: "santa-paula-hospital-seismic-closure-threat-2030",
    date: "2026-04-03",
    headline: {
      en: "Santa Paula Hospital Faces Seismic Compliance Closure by 2030 — Rural Ventura County Health Desert Risk",
      es: "Hospital de Santa Paula Enfrenta Cierre por Cumplimiento Sísmico para 2030 — Riesgo de Desierto de Salud en el Condado de Ventura Rural",
    },
    summary: {
      en: "Santa Paula Hospital (49-bed, Ventura County Medical Center system) faces potential closure by January 1, 2030 due to SB 1953 seismic compliance. Needs $36.2M for seismic upgrades + deferred maintenance, plus $10M/year to stay open. Inpatient numbers down 23% over 4 years, losing $7.5M annually. If closed, Santa Clara River Valley farmworker communities lose hospital access. Clinicas del Camino Real, the primary FQHC in the area, would face emergency overflow.",
      es: "El Hospital de Santa Paula (49 camas) enfrenta cierre potencial para 2030 por requisitos sísmicos. Necesita $36.2M en mejoras + $10M/año. Admisiones caen 23% en 4 años, pierde $7.5M anuales.",
    },
    category: "change-management",
    impactLevel: "medium",
    type: "news",
    sourceUrl: "https://hcai.ca.gov/facility/ventura-county-medical-center-santa-paula-hospital/",
    sourceOrg: "HCAI",
    region: "Central Coast",
    affectedOrgSlugs: ["ventura-county-medical-center", "clinicas-del-camino-real"],
    tags: ["ventura-county", "santa-paula", "seismic", "hospital-closure", "rural-health", "farmworkers"],
  },
  {
    id: "chcf-ai-policy-briefing-april-16-2026",
    date: "2026-04-09",
    headline: {
      en: "CHCF Hosting April 16 Policy Briefing on AI Implementation in Safety-Net Health Centers",
      es: "CHCF Organiza Reunión Informativa el 16 de Abril sobre Implementación de IA en Centros de Salud de Red de Seguridad",
    },
    summary: {
      en: "The California Health Care Foundation is hosting a policy briefing on April 16 examining AI adoption challenges and opportunities specific to safety-net providers including FQHCs. Topics include ambient documentation ROI, equity considerations in AI deployment, and regulatory frameworks. Features presentations from FQHC leaders who have implemented AI tools. Free registration open.",
      es: "CHCF organiza una reunión informativa el 16 de abril sobre adopción de IA en proveedores de red de seguridad, incluyendo FQHCs. Temas: ROI de documentación ambiental, equidad en IA, marcos regulatorios.",
    },
    category: "change-management",
    impactLevel: "medium",
    type: "news",
    sourceUrl: "https://www.chcf.org/collection/ai-in-health-care/",
    sourceOrg: "CHCF",
    region: "California",
    tags: ["chcf", "artificial-intelligence", "policy", "safety-net", "event"],
  },
  {
    id: "us-amicus-brief-pharma-louisiana-340b",
    date: "2026-04-04",
    headline: {
      en: "Trump Administration Files Amicus Brief Siding with Pharma Against 340B in Louisiana Federal Case",
      es: "Administración Trump Presenta Escrito Amicus a Favor de Farmacéuticas Contra 340B en Caso Federal de Luisiana",
    },
    summary: {
      en: "The US government filed an amicus brief in a Louisiana federal 340B case siding with pharmaceutical manufacturers, arguing states cannot enforce 340B contract pharmacy protections. Combined with a Fourth Circuit ruling blocking West Virginia's 340B law, this signals coordinated erosion of state-level 340B protections that could cost CA FQHCs millions in drug discount revenue.",
      es: "El gobierno de EE.UU. presentó un escrito amicus en un caso federal de 340B en Luisiana a favor de las farmacéuticas, argumentando que los estados no pueden hacer cumplir protecciones de farmacias contratantes 340B. Señala erosión coordinada de protecciones estatales de 340B.",
    },
    category: "legislation",
    impactLevel: "high",
    type: "news",
    sourceUrl: "https://natlawreview.com/article/week-340b-march-31-april-6-2026",
    sourceOrg: "National Law Review",
    region: "National",
    tags: ["340b", "pharma", "amicus-brief", "federal-court", "contract-pharmacy"],
  },
  {
    id: "chcf-teaching-health-centers-rural-pipeline-threat",
    date: "2026-04-08",
    headline: {
      en: "CHCF: Federal Cuts Threaten Teaching Health Centers and California's Rural Doctor Pipeline",
      es: "CHCF: Recortes Federales Amenazan Centros de Enseñanza de Salud y la Formación de Médicos Rurales en California",
    },
    summary: {
      en: "California Health Care Foundation warns that proposed federal cuts would devastate Teaching Health Center residency programs that train primary care physicians specifically for underserved communities. CA has 23 THC programs producing ~200 residents annually — 55% practice in rural/underserved areas post-graduation. Loss of THC funding would collapse the pipeline at a time when CA already faces a 4,100 primary care physician shortage.",
      es: "CHCF advierte que los recortes federales devastarían los programas de residencia de Centros de Enseñanza de Salud que forman médicos de atención primaria para comunidades desatendidas. CA tiene 23 programas THC que producen ~200 residentes al año.",
    },
    category: "workforce",
    impactLevel: "high",
    type: "news",
    sourceUrl: "https://www.chcf.org/resource/health-care-cuts-threaten-homegrown-solutions-rural-doctor-shortages/",
    sourceOrg: "CHCF",
    region: "California",
    tags: ["chcf", "teaching-health-center", "rural", "physician-pipeline", "workforce"],
  },
  {
    id: "sf-dph-youth-clinic-closures-april-2026",
    date: "2026-04-07",
    headline: {
      en: "SF DPH Budget Cuts Force Closure of Youth Health Clinics — Huckleberry & Larkin Street Programs Hit",
      es: "Recortes de DPH de SF Fuerzan Cierre de Clínicas de Salud Juvenil — Programas de Huckleberry y Larkin Street Afectados",
    },
    summary: {
      en: "San Francisco DPH budget cuts are forcing the closure of youth-serving health clinics operated by Huckleberry Youth Programs and Larkin Street Youth Services, extending the SF safety-net crisis beyond adult services. These programs serve some of SF's most vulnerable youth including unhoused and LGBTQ+ populations.",
      es: "Recortes presupuestarios de DPH de San Francisco fuerzan el cierre de clínicas juveniles operadas por Huckleberry y Larkin Street, extendiendo la crisis de la red de seguridad más allá de servicios para adultos.",
    },
    category: "funding",
    impactLevel: "medium",
    type: "news",
    sourceUrl: "https://missionlocal.org/2026/04/dph-cuts-sf-youth-clinics-huckleberry-larkin/",
    sourceOrg: "Mission Local",
    region: "Bay Area",
    tags: ["san-francisco", "dph", "youth", "clinic-closure", "budget-cuts"],
  },
  {
    id: "transthrive-fqhc-clinic-opening-sf",
    date: "2026-04-03",
    headline: {
      en: "TransThrive Opens New Trans-Led FQHC Clinic in SF Amid Federal Attacks on LGBTQ+ Health Access",
      es: "TransThrive Abre Nueva Clínica FQHC Liderada por Personas Trans en SF en Medio de Ataques Federales al Acceso de Salud LGBTQ+",
    },
    summary: {
      en: "SF Community Health Center (SFCHC) opens TransThrive, a new trans-led clinic providing primary care, behavioral health, and gender-affirming services — expanding access at the same time federal attacks are defunding LGBTQ+ health programs. A counter-narrative to the broader retrenchment in trans healthcare.",
      es: "SFCHC abre TransThrive, una nueva clínica liderada por personas trans que ofrece atención primaria, salud conductual y servicios de afirmación de género, expandiendo acceso mientras ataques federales eliminan programas de salud LGBTQ+.",
    },
    category: "patient-story",
    impactLevel: "medium",
    type: "news",
    sourceUrl: "https://www.sfcommunityhealth.org/newsroom/new-clinic-at-transthrive",
    sourceOrg: "SF Community Health Center",
    region: "Bay Area",
    affectedOrgSlugs: ["san-francisco-community-health-center"],
    tags: ["sfchc", "transgender", "lgbtq", "clinic-opening", "positive"],
  },
  {
    id: "ca-267m-hospice-fraud-operation-skip-trace",
    date: "2026-04-02",
    headline: {
      en: "California DOJ Charges $267M Hospice Fraud Ring — Tightens Medi-Cal Program Integrity Scrutiny",
      es: "DOJ de California Acusa Red de Fraude de Hospicio de $267M — Aumenta Escrutinio de Integridad del Programa Medi-Cal",
    },
    summary: {
      en: "'Operation Skip Trace' — CA DOJ charges 21 individuals in a $267M hospice fraud scheme involving 14 fraudulent hospice companies using stolen identities enrolled in Medi-Cal. While not FQHC-specific, signals intensified program integrity enforcement across all Medi-Cal providers. FQHCs should expect tighter enrollment verification and billing audit scrutiny as the state cracks down.",
      es: "'Operación Skip Trace' — DOJ de CA acusa a 21 personas en esquema de fraude de hospicio de $267M involucrando 14 empresas de hospicio fraudulentas usando identidades robadas inscritas en Medi-Cal. Señala mayor escrutinio de integridad de programa para todos los proveedores.",
    },
    category: "legislation",
    impactLevel: "medium",
    type: "news",
    sourceUrl: "https://oag.ca.gov/news/press-releases/attorney-general-bonta-dismantles-los-angeles-hospice-fraud-ring-responsible-267",
    sourceOrg: "CA Office of the Attorney General",
    region: "California",
    tags: ["medi-cal", "fraud", "compliance", "program-integrity", "hospice"],
  },
  {
    id: "baylor-waco-fqhc-interpreter-training-model",
    date: "2026-02-15",
    headline: {
      en: "Baylor/Waco FQHC Study: $500/Employee Interpreter Training Model Closes Bilingual Workforce Gap",
      es: "Estudio Baylor/Waco FQHC: Modelo de Capacitación de Intérpretes a $500/Empleado Cierra Brecha de Fuerza Laboral Bilingüe",
    },
    summary: {
      en: "A study published in Annals of Family Medicine from Baylor/Waco Family Health Center demonstrates a replicable $500/employee interpreter training program that produces certified medical interpreters from existing bilingual staff. The 40-hour curriculum achieved 92% certification pass rate and reduced interpreter wait times by 60%. Directly applicable to CA FQHCs facing language access requirements.",
      es: "Estudio del Centro de Salud Familiar Baylor/Waco publicado en Annals of Family Medicine demuestra un programa de capacitación de intérpretes replicable a $500/empleado que produce intérpretes médicos certificados del personal bilingüe existente.",
    },
    category: "workforce",
    impactLevel: "medium",
    type: "news",
    sourceUrl: "https://www.annfammed.org/content/23/6/507",
    sourceOrg: "Annals of Family Medicine",
    region: "National",
    tags: ["interpreter", "bilingual", "workforce", "training", "language-access", "cultural-competency"],
  },
  {
    id: "fy2027-budget-3-5b-health-center-cut",
    date: "2026-04-03",
    headline: {
      en: "Trump FY2027 Budget Proposes $3B for Health Centers — a 54% Cut from $6.5B Enacted in FY2026",
      es: "Presupuesto FY2027 de Trump Propone $3B para Centros de Salud — Recorte del 54% desde $6.5B Aprobados en FY2026",
    },
    summary: {
      en: "The FY2027 budget proposes only $3 billion for Health Centers ($1.8B discretionary + $1.1B mandatory), down from $6.5B enacted in FY2026 (which included the $4.6B Community Health Center Fund). The budget also proposes eliminating HRSA as a standalone agency by consolidating it into the new 'Administration for a Healthy America' (AHA) with a total AHA budget of $17.5B (down $8.6B from component agencies' FY2026 levels). Health Workforce gets only $1.1B, threatening NHSC loan repayment.",
      es: "El presupuesto FY2027 propone solo $3 mil millones para centros de salud, una reducción del 54% desde los $6.5B aprobados en FY2026. También propone eliminar HRSA como agencia independiente, consolidándola en la nueva 'Administración para una América Saludable'.",
    },
    category: "funding",
    impactLevel: "critical",
    type: "news",
    sourceUrl: "https://www.astho.org/advocacy/federal-government-affairs/leg-alerts/2026/president-trump-releases-fy27-budget-proposal-april-2026/",
    sourceOrg: "ASTHO",
    region: "Federal",
    tags: ["fy2027", "budget", "hrsa", "health-center-program", "aha", "funding-cliff", "nhsc"],
    keyTakeaways: [
      { en: "54% proposed cut: $6.5B → $3B for health centers", es: "Recorte propuesto del 54%: $6.5B → $3B para centros de salud" },
      { en: "HRSA eliminated as standalone agency — merged into 'Administration for a Healthy America'", es: "HRSA eliminada como agencia independiente — fusionada en 'Administración para una América Saludable'" },
      { en: "NHSC loan repayment threatened by $1.1B Health Workforce budget", es: "Reembolso de préstamos NHSC amenazado por presupuesto de $1.1B para fuerza laboral" },
    ],
  },
  {
    id: "kff-california-22b-deficit-work-requirements-implementation",
    date: "2026-04-06",
    headline: {
      en: "KFF: California Faces $22B Deficit by FY2028 While Implementing Medicaid Work Requirements — 1.4M Disenrollments Expected",
      es: "KFF: California Enfrenta Déficit de $22B para FY2028 al Implementar Requisitos de Trabajo de Medicaid — 1.4M Cancelaciones Esperadas",
    },
    summary: {
      en: "KFF's deep-dive shows California must implement Medicaid work requirements (affecting ~5M expansion enrollees) while managing a projected $3B deficit for FY2027 growing to $22B by FY2028. The state faces $1.4B in General Fund costs from H.R. 1, is cutting FQHC/RHC reimbursement for state-funded UIS services (July 2026), and expects 1.4M disenrollments from work requirement implementation. The $5.1B provider tax revenue loss undercuts a major state financing mechanism.",
      es: "El análisis profundo de KFF muestra que California debe implementar requisitos de trabajo de Medicaid mientras enfrenta un déficit proyectado de $22B para FY2028. Se esperan 1.4M cancelaciones de inscripción y $5.1B en pérdidas de ingresos por impuestos a proveedores.",
    },
    category: "legislation",
    impactLevel: "high",
    type: "news",
    sourceUrl: "https://www.kff.org/medicaid/a-closer-look-at-californias-plans-to-implement-work-requirements-while-facing-major-budget-shortfalls-amid-cuts-in-federal-medicaid-funding/",
    sourceOrg: "KFF",
    region: "California",
    tags: ["kff", "work-requirements", "deficit", "disenrollment", "uis", "provider-tax", "medi-cal"],
    keyTakeaways: [
      { en: "$3B FY2027 deficit growing to $22B by FY2028", es: "Déficit de $3B en FY2027 creciendo a $22B para FY2028" },
      { en: "1.4M projected disenrollments from work requirements", es: "1.4M cancelaciones proyectadas por requisitos de trabajo" },
      { en: "$5.1B provider tax revenue loss under H.R. 1 restrictions", es: "Pérdida de $5.1B en ingresos por impuestos a proveedores bajo restricciones de H.R. 1" },
    ],
  },
  {
    id: "chcf-six-bold-ideas-future-medi-cal",
    date: "2026-04-10",
    headline: {
      en: "CHCF Publishes 'Six Bold Ideas for the Future of Medi-Cal' — Including Unified Primary Care Payment Model",
      es: "CHCF Publica 'Seis Ideas Audaces para el Futuro de Medi-Cal' — Incluyendo Modelo Unificado de Pago de Atención Primaria",
    },
    summary: {
      en: "CHCF selected 6 transformative proposals from 132 submissions for the Future of Medi-Cal Commission: (1) unified primary care payment across Medi-Cal/CalPERS/Covered CA, (2) IHSS managed care integration, (3) Covered California expansion for coverage continuity, (4) 'Any Card, Any Provider' network unification, (5) AI-first Health Data Utility, and (6) unified financing model. The unified payment proposal could replace FQHC PPS with a standardized multipayer model.",
      es: "CHCF seleccionó 6 propuestas transformadoras de 132 presentaciones para la Comisión del Futuro de Medi-Cal, incluyendo un modelo unificado de pago de atención primaria que podría reemplazar el PPS de los FQHCs.",
    },
    category: "change-management",
    impactLevel: "medium",
    type: "strategy",
    sourceUrl: "https://www.chcf.org/resource/bold-ideas-future-medi-cal-proposals/",
    sourceOrg: "CHCF",
    region: "California",
    tags: ["chcf", "medi-cal", "pps", "unified-payment", "commission", "ai-health-data", "network"],
  },
  {
    id: "ccalac-coalition-oc-25th-symposium-april-2026",
    date: "2026-04-10",
    headline: {
      en: "CCALAC & Coalition OC Unite at 25th Annual SoCal Symposium: 'Dangerous Policies' Threaten Safety Net",
      es: "CCALAC y Coalition OC Se Unen en 25º Simposio Anual de SoCal: 'Políticas Peligrosas' Amenazan la Red de Seguridad",
    },
    summary: {
      en: "The Community Clinic Association of LA County (CCALAC) and the Coalition of Orange County Community Health Centers co-hosted the 25th Annual Southern California Health Care Symposium on April 10, naming 'dangerous state and federal policies coupled with a worsening workforce crisis' as threats to safety-net capacity. The event represents unified SoCal advocacy across LA + OC (100+ FQHCs) heading into the June 2 sales tax ballot and legislative session.",
      es: "CCALAC y la Coalición de Centros de Salud Comunitarios del Condado de Orange co-organizaron el 25º Simposio Anual de Salud del Sur de California, nombrando 'políticas peligrosas' y crisis de fuerza laboral como amenazas a la red de seguridad.",
    },
    category: "lobbying",
    impactLevel: "medium",
    type: "news",
    sourceUrl: "https://coalitionoc.org/",
    sourceOrg: "Coalition of OC Community Health Centers / CCALAC",
    region: "Los Angeles County",
    tags: ["ccalac", "coalition-oc", "symposium", "advocacy", "socal", "workforce-crisis", "coalition"],
  },
  {
    id: "cms-work-requirements-ifr-june-1-deadline",
    date: "2026-06-01",
    headline: {
      en: "CMS Interim Final Rule on Medicaid Work Requirements Due June 1 — Will Define Exemptions, Reporting, and Enforcement",
      es: "Regla Final Provisional de CMS sobre Requisitos de Trabajo de Medicaid Vence el 1 de Junio — Definirá Exenciones, Reportes y Cumplimiento",
    },
    summary: {
      en: "CMS must issue an Interim Final Rule by June 1, 2026 defining critical work requirement implementation details: exemption criteria, reporting mechanisms, compliance verification, and non-compliance consequences. The 80-hour/month requirement scope depends entirely on this rule — narrow exemptions could mean millions losing coverage, broad exemptions could limit damage. States must conduct member outreach June 30–August 31, 2026. CMS is distributing $200M in 'Government Efficiency Grants' for state tracking systems, but no direct funding flows to FQHCs despite bearing the patient-facing burden.",
      es: "CMS debe emitir una Regla Final Provisional antes del 1 de junio de 2026 definiendo detalles de implementación de requisitos de trabajo. Exenciones estrechas podrían significar millones perdiendo cobertura. $200M en subvenciones para sistemas estatales, pero nada directo para FQHCs.",
    },
    category: "legislation",
    impactLevel: "critical",
    type: "deadline",
    sourceUrl: "https://www.chcs.org/resource/a-summary-of-national-medicaid-work-requirements/",
    sourceOrg: "CHCS / CMS",
    region: "Federal",
    tags: ["cms", "work-requirements", "ifr", "deadline", "exemptions", "june-2026", "disenrollment"],
    keyTakeaways: [
      { en: "June 1 deadline: CMS must publish the Interim Final Rule", es: "Fecha límite 1 de junio: CMS debe publicar la Regla Final Provisional" },
      { en: "June 30–Aug 31: States must conduct outreach to all affected enrollees", es: "30 jun–31 ago: Estados deben realizar contacto con todos los inscritos afectados" },
      { en: "$200M for state systems — zero direct FQHC funding for patient navigation", es: "$200M para sistemas estatales — cero fondos directos para FQHCs para navegación de pacientes" },
    ],
  },
  {
    id: "abbvie-340b-patient-definition-lawsuit",
    date: "2026-04-09",
    headline: {
      en: "AbbVie Files Landmark Lawsuit to Narrow 340B 'Patient' Definition — Directly Targeting FQHC Contract Pharmacy Arrangements",
      es: "AbbVie Presenta Demanda Histórica para Restringir Definición de 'Paciente' 340B — Apuntando Directamente a Arreglos de Farmacias Contratadas de FQHCs",
    },
    summary: {
      en: "AbbVie sued HRSA to challenge the 30-year-old 340B patient definition, proposing a four-part test requiring direct care connection, clinical encounter, active care management, and 12-month recency. AbbVie flagged Barrio Comprehensive Family Health Care Center (TX FQHC) — 340B purchases of Humira/Skyrizi/Rinvoq up 119% (2021-2022), 71% dispensed through out-of-state pharmacies. If successful, this would dramatically shrink FQHC 340B eligibility for contract pharmacy and telehealth prescribing. Post-Chevron (Loper Bright) makes this challenge viable for the first time.",
      es: "AbbVie demandó a HRSA para desafiar la definición de paciente 340B de 30 años, proponiendo una prueba de cuatro partes. Si tiene éxito, reduciría dramáticamente la elegibilidad 340B de FQHCs para farmacias contratadas y prescripción por telesalud.",
    },
    category: "compliance",
    impactLevel: "high",
    type: "news",
    sourceUrl: "https://www.hfma.org/payment-reimbursement-and-managed-care/340b-patient-definition-lawsuit-abbvie-hrsa/",
    sourceOrg: "HFMA / Fierce Pharma / 340B Report",
    region: "Federal",
    tags: ["340b", "abbvie", "lawsuit", "patient-definition", "contract-pharmacy", "loper-bright", "hrsa"],
    keyTakeaways: [
      { en: "First-ever manufacturer lawsuit challenging HRSA's 340B patient definition", es: "Primera demanda de fabricante desafiando la definición de paciente 340B de HRSA" },
      { en: "Four-part test proposed: direct care, clinical encounter, active management, 12-month recency", es: "Prueba de cuatro partes propuesta: atención directa, encuentro clínico, gestión activa, vigencia de 12 meses" },
      { en: "Post-Chevron (Loper Bright) makes HRSA guidance vulnerable to legal challenge", es: "Post-Chevron (Loper Bright) hace la guía de HRSA vulnerable a desafío legal" },
    ],
  },
  {
    id: "eo-14398-dei-restrictions-federal-contractors-fqhc",
    date: "2026-03-26",
    headline: {
      en: "Executive Order 14398 Bans DEI Activities by Federal Contractors — FQHCs as HRSA Grantees Face Compliance Risk",
      es: "Orden Ejecutiva 14398 Prohíbe Actividades DEI por Contratistas Federales — FQHCs como Beneficiarios de HRSA Enfrentan Riesgo de Cumplimiento",
    },
    summary: {
      en: "Trump signed EO 14398 prohibiting 'racially discriminatory DEI activities' by federal contractors and grantees. FQHCs receiving HRSA Section 330 grants face compliance deadlines: contract clauses (30 days), FAR guidance (May 25), agency reports (July 24). The EO creates direct tension with CLAS Standards requiring culturally concordant workforce recruitment. Violations can trigger contract termination, debarment, and False Claims Act liability. FQHCs with workforce diversity programs, culturally concordant hiring, or race/ethnicity-targeted training need compliance review.",
      es: "Trump firmó OE 14398 prohibiendo actividades DEI por contratistas federales. FQHCs que reciben subvenciones HRSA enfrentan plazos de cumplimiento. La orden crea tensión directa con Estándares CLAS que requieren reclutamiento de fuerza laboral culturalmente concordante.",
    },
    category: "legislation",
    impactLevel: "high",
    type: "news",
    sourceUrl: "https://www.theemployerreport.com/2026/04/why-the-new-dei-executive-order-matters-for-federal-contractors-and-signals-broader-risk-for-all-us-employers/",
    sourceOrg: "The Employer Report / Sullivan & Cromwell",
    region: "Federal",
    tags: ["dei", "executive-order", "federal-contractors", "clas-standards", "workforce-diversity", "hrsa", "compliance"],
    keyTakeaways: [
      { en: "FQHC CLAS Standards vs EO 14398: culturally concordant hiring now legally risky", es: "Estándares CLAS de FQHCs vs OE 14398: contratación culturalmente concordante ahora legalmente riesgosa" },
      { en: "FAR guidance deadline May 25 — FQHCs should review HR policies now", es: "Fecha límite de guía FAR 25 de mayo — FQHCs deben revisar políticas de RRHH ahora" },
      { en: "Violations can trigger debarment, contract termination, and FCA liability", es: "Violaciones pueden provocar inhabilitación, terminación de contrato y responsabilidad FCA" },
    ],
  },
  {
    id: "la-lgbt-center-hhs-oig-investigation",
    date: "2026-02-12",
    headline: {
      en: "Trump Administration Refers LA LGBT Center to HHS Inspector General — One of Four LGBTQ+ FQHCs Targeted Nationally",
      es: "Administración Trump Refiere al Centro LGBT de LA al Inspector General de HHS — Uno de Cuatro FQHCs LGBTQ+ Atacados Nacionalmente",
    },
    summary: {
      en: "HHS General Counsel Mike Stuart referred the Los Angeles LGBT Center (along with Whitman-Walker Health DC, Callen-Lorde NYC, and Institute for Family Health NYC) to the HHS OIG for investigation, stemming from HHS Secretary Kennedy's December 2025 declaration targeting organizations providing gender-affirming care for minors. A 22-state lawsuit (Oregon v. Kennedy) challenged the actions; HHS agreed to pause exclusion notices but investigations continue. If exclusion proceeds, the LA LGBT Center would lose all federal Medicare/Medicaid reimbursement.",
      es: "El Consejero General de HHS refirió al Centro LGBT de Los Ángeles al Inspector General de HHS para investigación. Si la exclusión procede, el centro perdería todo reembolso federal de Medicare/Medicaid.",
    },
    category: "compliance",
    impactLevel: "high",
    type: "news",
    sourceUrl: "https://www.erininthemorning.com/p/trump-administration-targets-major",
    sourceOrg: "Erin in the Morning",
    region: "Los Angeles County",
    affectedOrgs: ["Los Angeles LGBT Center"],
    affectedOrgSlugs: ["los-angeles-lgbt-center"],
    tags: ["oig", "hhs", "lgbtq", "gender-affirming-care", "exclusion", "investigation", "la-lgbt-center"],
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
