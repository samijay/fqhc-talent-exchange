// fqhc-news-intel.ts
// Curated intelligence feed for FQHC executives
// Updated daily via /daily-update pipeline
// Every item has a primary source URL — no unsourced claims
// Last updated: 2026-03-06 (jobs report day — BLS Employment Situation February 2026)

/** Exported for display on pages — updated by /daily-update pipeline */
export const INTEL_LAST_UPDATED = "2026-03-06";

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
  /*  CHANGE-MANAGEMENT / AI & INNOVATION                            */
  /* ============================================================== */
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
    sourceUrl: "https://mcweb.apps.prd.cammis.medi-cal.ca.gov/news/31781_01",
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
    type: "deadline",
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
    sourceUrl: "https://www.dhcs.ca.gov/services/Pages/FQHC_APM.aspx",
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
    type: "news",
    impactLevel: "high",
    sourceUrl: "https://www.kqed.org/news/12074462/alameda-county-officials-look-to-stave-off-mass-hospital-layoffs-as-medicaid-cuts-loom",
    sourceOrg: "KQED",
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
    sourceUrl: "https://www.communitylinkconsulting.com/blog/340b-rebate-model-pilot-fqhc-guide",
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
    affectedOrgSlugs: ["santa-clara-valley-health"],
    tags: ["sales-tax", "ballot-measure", "medicaid-offset", "measure-a", "bay-area", "revenue-model"],
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
