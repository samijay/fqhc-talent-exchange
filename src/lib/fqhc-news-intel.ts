// fqhc-news-intel.ts
// Curated intelligence feed for FQHC executives
// Updated daily via /daily-update pipeline
// Every item has a primary source URL — no unsourced claims
// Last updated: 2026-02-28 (daily update #6)

/** Exported for display on pages — updated by /daily-update pipeline */
export const INTEL_LAST_UPDATED = "2026-02-28";

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
  | "change-management";

export type ImpactLevel = "critical" | "high" | "medium" | "low";

export interface IntelItem {
  id: string;
  date: string; // ISO
  headline: { en: string; es: string };
  summary: { en: string; es: string };
  category: IntelCategory;
  impactLevel: ImpactLevel;
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
    impactLevel: "critical",
    sourceUrl: "https://www.chcf.org/publication/federal-budget-medi-cal/",
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
    impactLevel: "critical",
    sourceUrl: "https://oag.ca.gov/news",
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
    impactLevel: "high",
    sourceUrl: "https://www.dhcs.ca.gov/services/medi-cal/Pages/Benefits-702.aspx",
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
    impactLevel: "high",
    sourceUrl: "https://oag.ca.gov/initiatives",
    sourceOrg: "CA Attorney General — Initiatives",
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
    impactLevel: "critical",
    sourceUrl: "https://calmatters.org/health/2025/05/newsom-freeze-medi-cal-undocumented-immigrants/",
    sourceOrg: "CalMatters",
    region: "California",
    tags: ["undocumented", "medi-cal", "enrollment-freeze", "revenue-impact"],
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
    impactLevel: "critical",
    sourceUrl: "https://www.dhcs.ca.gov/services/medi-cal/Pages/FQHCrates.aspx",
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
    impactLevel: "high",
    sourceUrl: "https://www.nachc.org/conferences/policy-issues-forum/",
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
    impactLevel: "medium",
    sourceUrl: "https://bphc.hrsa.gov/funding/funding-opportunities",
    sourceOrg: "HRSA",
    region: "Federal",
    tags: ["hrsa", "grants", "maha", "chronic-disease", "nutrition"],
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
    impactLevel: "high",
    sourceUrl: "https://edd.ca.gov/jobs_and_training/layoff_services_warn.htm",
    sourceOrg: "CA EDD WARN Act",
    region: "Los Angeles County",
    affectedOrgs: ["L.A. Care Health Plan"],
    affectedOrgSlugs: [],
    tags: ["layoffs", "managed-care", "warn-act", "ecm-impact"],
  },
  {
    id: "ahs-188-positions",
    date: "2026-02-25",
    headline: {
      en: "Alameda Health System: 188 Filled Positions on Final Layoff List",
      es: "Alameda Health System: 188 Puestos Ocupados en Lista Final de Despidos",
    },
    summary: {
      en: "Alameda Health System's Board finalizes layoff list at 188 filled positions out of 296 total. Cash-out timeline extended to August 2026. The system receives $60M/year in DSH funding now at risk from federal Medicaid cuts. Public hearing drew community opposition.",
      es: "La Junta de Alameda Health System finaliza la lista de despidos en 188 puestos ocupados de 296 totales. Línea de tiempo de liquidación extendida a agosto 2026.",
    },
    category: "workforce",
    impactLevel: "high",
    sourceUrl: "https://www.alamedahealthsystem.org/board-of-trustees/",
    sourceOrg: "Alameda Health System",
    region: "Alameda County",
    affectedOrgs: ["Alameda Health System"],
    affectedOrgSlugs: [],
    tags: ["layoffs", "dsh-funding", "public-hearing"],
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
    impactLevel: "high",
    sourceUrl: "https://www.nachc.org/policy-advocacy/policy-priorities/health-center-workforce/",
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
    impactLevel: "medium",
    sourceUrl: "https://www.unitedhealthcenters.org/",
    sourceOrg: "United Health Centers",
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
    impactLevel: "medium",
    sourceUrl: "https://www.modernhealthcare.com/mergers-acquisitions",
    sourceOrg: "Modern Healthcare",
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
    impactLevel: "high",
    sourceUrl: "https://bphc.hrsa.gov/funding/funding-opportunities",
    sourceOrg: "HRSA",
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
    impactLevel: "high",
    sourceUrl: "https://www.nachc.org/policy-advocacy/policy-priorities/health-center-workforce/",
    sourceOrg: "NACHC",
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
    impactLevel: "critical",
    sourceUrl: "https://www.nachc.org/policy-advocacy/policy-priorities/health-center-workforce/",
    sourceOrg: "NACHC",
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
    impactLevel: "high",
    sourceUrl: "https://www.cbsnews.com/losangeles/news/funding-cuts-los-angeles-county-public-health-closing-clinics/",
    sourceOrg: "CBS News Los Angeles",
    region: "Los Angeles",
    tags: ["clinic-closures", "public-health", "la-county", "federal-cuts", "patient-redirect"],
  },
  {
    id: "cchc-nevada-expansion",
    date: "2026-02-19",
    headline: {
      en: "Comprehensive Community Health Centers (CCHC) Expands to Nevada — First Out-of-State FQHC Move",
      es: "Comprehensive Community Health Centers (CCHC) Se Expande a Nevada — Primera Expansión Fuera del Estado",
    },
    summary: {
      en: "CCHC, a California FQHC with 6 clinics across LA County and the San Fernando Valley, opened a new clinic in Las Vegas, Nevada — marking its first out-of-state expansion. CCHC grew from 45,000 visits in 2004 to over 177,000 in 2023. The expansion signals California FQHCs seeking growth beyond state lines as in-state financial pressures mount. Location: 1250 S. Buffalo Drive, Suite 170, Las Vegas.",
      es: "CCHC, un FQHC de California con 6 clínicas en el Condado de LA, abrió una nueva clínica en Las Vegas, Nevada — su primera expansión fuera del estado. CCHC creció de 45,000 visitas en 2004 a más de 177,000 en 2023.",
    },
    category: "merger-acquisition",
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
    impactLevel: "high",
    sourceUrl: "https://www.kff.org/medicaid/health-provisions-in-the-2025-federal-budget-reconciliation-law/",
    sourceOrg: "KFF",
    region: "Federal",
    tags: ["copay-exemption", "patient-acquisition", "competitive-advantage"],
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
