// fqhc-advocacy-tracker.ts
// Tracks positive movements, legislation, coalition actions, ballot initiatives,
// and legal actions fighting Medicaid/Medi-Cal cuts and protecting FQHC funding.
// Each item includes follow-up dates and outcome tracking.
// Updated via /daily-update pipeline.

export const ADVOCACY_LAST_UPDATED = "2026-04-16";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type AdvocacyCategory =
  | "legislation"
  | "ballot-initiative"
  | "coalition"
  | "legal-action"
  | "public-statement"
  | "local-funding"
  | "federal-action";

export type AdvocacyStatus =
  | "proposed"
  | "active"
  | "passed"
  | "failed"
  | "pending-vote"
  | "in-court"
  | "signed-into-law";

export interface AdvocacyAction {
  id: string;
  date: string; // ISO — when the action was initiated or announced
  headline: { en: string; es: string };
  summary: { en: string; es: string };
  category: AdvocacyCategory;
  status: AdvocacyStatus;
  region: string; // "California" | "Federal" | county name
  organizations: string[]; // who's leading the effort
  followUpDate: string | null; // ISO — when to check for outcome
  followUpNote: { en: string; es: string } | null; // what to check
  outcomeDate: string | null; // ISO — when result was determined
  outcome: { en: string; es: string } | null; // what happened
  sourceUrl: string;
  sourceOrg: string;
  impactLevel: "critical" | "high" | "medium" | "low";
  affectedOrgSlugs?: string[]; // links to directory profiles
  tools?: { label: { en: string; es: string }; url: string }[]; // action links
  tags: string[];
}

export const ADVOCACY_CATEGORIES: {
  id: AdvocacyCategory;
  label: { en: string; es: string };
  icon: string;
}[] = [
  { id: "legislation", label: { en: "Legislation", es: "Legislaci\u00f3n" }, icon: "ScrollText" },
  { id: "ballot-initiative", label: { en: "Ballot Initiative", es: "Iniciativa Electoral" }, icon: "Vote" },
  { id: "coalition", label: { en: "Coalition Action", es: "Acci\u00f3n de Coalici\u00f3n" }, icon: "Users" },
  { id: "legal-action", label: { en: "Legal Action", es: "Acci\u00f3n Legal" }, icon: "Scale" },
  { id: "public-statement", label: { en: "Public Statement", es: "Declaraci\u00f3n P\u00fablica" }, icon: "Megaphone" },
  { id: "local-funding", label: { en: "Local Funding", es: "Financiamiento Local" }, icon: "Landmark" },
  { id: "federal-action", label: { en: "Federal Action", es: "Acci\u00f3n Federal" }, icon: "Building2" },
];

export const STATUS_META: Record<
  AdvocacyStatus,
  { label: { en: string; es: string }; color: string }
> = {
  proposed: { label: { en: "Proposed", es: "Propuesto" }, color: "bg-stone-100 text-stone-700 border-stone-300" },
  active: { label: { en: "Active", es: "Activo" }, color: "bg-teal-50 text-teal-700 border-teal-300" },
  passed: { label: { en: "Passed", es: "Aprobado" }, color: "bg-green-50 text-green-700 border-green-300" },
  failed: { label: { en: "Failed", es: "Fallido" }, color: "bg-red-50 text-red-700 border-red-300" },
  "pending-vote": { label: { en: "Pending Vote", es: "Voto Pendiente" }, color: "bg-amber-50 text-amber-700 border-amber-300" },
  "in-court": { label: { en: "In Court", es: "En Corte" }, color: "bg-purple-50 text-purple-700 border-purple-300" },
  "signed-into-law": { label: { en: "Signed Into Law", es: "Firmado como Ley" }, color: "bg-green-100 text-green-800 border-green-400" },
};

/* ------------------------------------------------------------------ */
/*  Advocacy Actions                                                   */
/* ------------------------------------------------------------------ */

export const ADVOCACY_ACTIONS: AdvocacyAction[] = [
  // ── APRIL 15, 2026 — DAILY UPDATE #32 ──────────────────────────────

  {
    id: "abbvie-340b-lawsuit-april-2026",
    date: "2026-04-08",
    headline: {
      en: "AbbVie Files Landmark 340B Lawsuit — 'Most Consequential Manufacturer Challenge to Date'",
      es: "AbbVie Presenta Demanda 340B Histórica — 'El Desafío de Fabricante Más Consecuente Hasta la Fecha'",
    },
    summary: {
      en: "AbbVie filed a 72-page federal complaint on April 8, 2026 challenging core 340B program mechanics — analysts describe it as the most consequential manufacturer suit to date. The case threatens the upstream discount structure that FQHC pharmacy revenue depends on. If AbbVie prevails, the ripple effects across California FQHC 340B savings could be severe, especially for centers that subsidize uncompensated care with pharmacy margin. NACHC, AHA, and CPCA are expected to file amicus briefs.",
      es: "AbbVie presentó una demanda federal de 72 páginas el 8 de abril de 2026 cuestionando los mecanismos centrales del programa 340B. El caso amenaza la estructura de descuentos ascendentes de la que depende el ingreso farmacéutico de los FQHCs. Si AbbVie prevalece, los efectos sobre los ahorros 340B en FQHCs de California podrían ser severos.",
    },
    category: "legal-action",
    status: "in-court",
    region: "Federal",
    organizations: ["AbbVie", "HRSA (defendant)", "NACHC (expected amicus)", "AHA (expected amicus)"],
    followUpDate: "2026-06-01",
    followUpNote: { en: "Initial motions and amicus brief deadlines", es: "Plazos de mociones iniciales y escritos amicus" },
    outcomeDate: null,
    outcome: null,
    sourceUrl: "https://www.onhealthcare.tech/p/abbvie-just-filed-the-most-important",
    sourceOrg: "On Healthcare",
    impactLevel: "critical",
    tags: ["340b", "abbvie", "federal-lawsuit", "manufacturer-challenge", "pharmacy-revenue", "nachc"],
  },
  {
    id: "ca-ag-opposes-fqhc-340b-injunction-april-2026",
    date: "2026-04-10",
    headline: {
      en: "California AG Opposes FQHC 340B Preliminary Injunction — State vs. Safety Net Tension",
      es: "Fiscal General de California Se Opone a Mandato Judicial Preliminar 340B de FQHCs — Tensión Estado vs. Red de Seguridad",
    },
    summary: {
      en: "California's Attorney General asked the court to reject California community health centers' request to halt a Medi-Cal drug payment change affecting 340B economics. The filing is notable because it places a historically FQHC-aligned administration in direct legal opposition to the sector during the H.R. 1 funding crisis. CPCA and CCALAC are expected to respond with public statements. The case will test how much budget pressure can crack state-sector solidarity.",
      es: "El Fiscal General de California pidió al tribunal rechazar la solicitud de los centros de salud comunitaria de California de detener un cambio de pago de medicamentos de Medi-Cal que afecta la economía 340B. La presentación es notable porque coloca a una administración históricamente aliada con FQHCs en oposición legal directa al sector.",
    },
    category: "legal-action",
    status: "in-court",
    region: "California",
    organizations: ["California Attorney General", "CA FQHCs (plaintiffs)", "CPCA", "CCALAC"],
    followUpDate: "2026-05-15",
    followUpNote: { en: "Preliminary injunction ruling expected", es: "Se espera el fallo sobre el mandato judicial preliminar" },
    outcomeDate: null,
    outcome: null,
    sourceUrl: "https://340breport.com/california-asks-judge-to-reject-340b-health-centers-request-to-stop-medicaid-drug-payment-change/",
    sourceOrg: "340B Report",
    impactLevel: "high",
    tags: ["340b", "california-ag", "medi-cal", "preliminary-injunction", "state-vs-fqhc"],
  },

  // ── CRITICAL ───────────────────────────────────────────────────────

  {
    id: "save-our-dental-care-coalition",
    date: "2026-01-06",
    headline: {
      en: "70+ Organizations Form 'Save Our Dental Care' Coalition Against $1B Medi-Cal Dental Cut",
      es: "M\u00e1s de 70 Organizaciones Forman Coalici\u00f3n 'Salvemos Nuestro Cuidado Dental' Contra Recorte de $1B",
    },
    summary: {
      en: "Governor Newsom proposed cutting $1 billion from Medi-Cal Dental effective July 1, 2026, reducing reimbursement by 40-80%. The California Dental Association convened a coalition of 70+ groups including children's advocacy organizations, labor unions, and disability rights groups to fight the cut before the May Revise. CDA survey: 49% of Medi-Cal dentists would leave the program.",
      es: "El Gobernador Newsom propuso recortar $1 mil millones de Dental de Medi-Cal. La Asociaci\u00f3n Dental de California convoc\u00f3 una coalici\u00f3n de m\u00e1s de 70 grupos para combatir el recorte antes de la Revisi\u00f3n de Mayo. Encuesta: el 49% de dentistas abandonar\u00edan el programa.",
    },
    category: "coalition",
    status: "active",
    region: "California",
    organizations: ["California Dental Association", "Arc of California", "Children Now", "SEIU"],
    followUpDate: "2026-05-15",
    followUpNote: { en: "Check May Revise for dental cut status", es: "Verificar Revisi\u00f3n de Mayo para estado del recorte dental" },
    outcomeDate: null,
    outcome: null,
    sourceUrl: "https://www.cda.org/newsroom/advocacy/cda-convened-coalition-of-70-plus-groups-fights-to-stop-1b-cuts-to-medi-cal-dental/",
    sourceOrg: "California Dental Association",
    impactLevel: "critical",
    tools: [
      { label: { en: "Save Our Dental Care website", es: "Sitio web Salvemos Nuestro Cuidado Dental" }, url: "https://www.saveourdentalcare.org/" },
      { label: { en: "Contact your legislator", es: "Contacta a tu legislador" }, url: "https://www.legislature.ca.gov/your-legislator" },
    ],
    tags: ["dental", "medi-cal", "coalition", "may-revise", "budget"],
  },
  {
    id: "santa-clara-measure-a-sales-tax",
    date: "2024-11-05",
    headline: {
      en: "Santa Clara County Measure A Passes \u2014 $330M/Year Local Health Tax Takes Effect April 1",
      es: "Medida A del Condado de Santa Clara Aprobada \u2014 Impuesto Local de Salud de $330M/A\u00f1o Vigente desde Abril 1",
    },
    summary: {
      en: "Santa Clara County voters approved Measure A with 57% support \u2014 a half-cent sales tax generating $330M/year for healthcare, mental health, and housing. This is the first California county to offset federal Medicaid cuts via local taxation. The tax took effect April 1, 2026. It funds county health services, mental health programs, and housing \u2014 directly supporting the safety net that FQHCs operate within.",
      es: "Los votantes del Condado de Santa Clara aprobaron la Medida A con 57% de apoyo \u2014 un impuesto de venta de medio centavo que genera $330M/a\u00f1o para salud, salud mental y vivienda. Primer condado de California en compensar recortes federales de Medicaid mediante impuestos locales.",
    },
    category: "ballot-initiative",
    status: "passed",
    region: "Santa Clara County",
    organizations: ["Santa Clara County Board of Supervisors"],
    followUpDate: "2026-10-01",
    followUpNote: { en: "Check first 6-month revenue report and allocation", es: "Verificar primer informe de ingresos y asignaci\u00f3n de 6 meses" },
    outcomeDate: "2026-04-01",
    outcome: { en: "Tax took effect April 1, 2026. First revenue collection underway.", es: "Impuesto vigente desde el 1 de abril de 2026. Primera recaudaci\u00f3n en curso." },
    sourceUrl: "https://www.naco.org/blog/santa-clara-county-voters-approve-measure-healthcare-funding",
    sourceOrg: "NACo",
    impactLevel: "critical",
    tags: ["local-tax", "santa-clara", "measure-a", "safety-net", "template"],
  },
  {
    id: "la-county-health-tax-ballot-june",
    date: "2026-03-01",
    headline: {
      en: "Measure ER (Essential Services Restoration Act): LA County Half-Cent Health Tax on June 2 Ballot \u2014 $1B/Year for Safety Net",
      es: "Medida ER (Ley de Restauración de Servicios Esenciales): Impuesto de Salud de Medio Centavo del Condado de LA en Boleta del 2 de Junio \u2014 $1B/A\u00f1o para Red de Seguridad",
    },
    summary: {
      en: "Los Angeles County's 'Measure ER' (Essential Services Restoration Act) is a half-cent sales tax on the June 2, 2026 ballot that would generate approximately $1 billion per year for healthcare, mental health, and homeless services. St. John's Community Health CEO leads the 'Restore Healthcare for Angelenos' coalition. Early polling (March 10-15) shows 47% opposed vs 45% support among LA city voters \u2014 the measure is currently trailing. If passed, it becomes the largest local health tax in the country.",
      es: "La 'Medida ER' del Condado de Los \u00c1ngeles es un impuesto de venta de medio centavo en la boleta del 2 de junio de 2026. Encuestas tempranas muestran 47% en contra vs 45% a favor. Generar\u00eda aproximadamente $1 mil millones por a\u00f1o para salud.",
    },
    category: "ballot-initiative",
    status: "pending-vote",
    region: "Los Angeles County",
    organizations: ["Restore Healthcare for Angelenos", "St. John's Community Health"],
    followUpDate: "2026-06-02",
    followUpNote: { en: "Election day \u2014 check results", es: "D\u00eda de elecci\u00f3n \u2014 verificar resultados" },
    outcomeDate: null,
    outcome: null,
    sourceUrl: "https://www.latimes.com/california/story/2026-03-01/la-county-health-tax-ballot-measure",
    sourceOrg: "Los Angeles Times",
    impactLevel: "critical",
    affectedOrgSlugs: ["st-johns-community-health"],
    tags: ["local-tax", "los-angeles", "ballot", "safety-net", "template"],
  },

  // ── HIGH ────────────────────────────────────────────────────────────

  {
    id: "sb-1422-durazo-uis-restoration",
    date: "2026-02-20",
    headline: {
      en: "SB 1422 (Durazo): Restore Medi-Cal for Undocumented Immigrants \u2014 State-Funded",
      es: "SB 1422 (Durazo): Restaurar Medi-Cal para Inmigrantes Indocumentados \u2014 Financiado por el Estado",
    },
    summary: {
      en: "Senator Maria Elena Durazo introduced SB 1422 to restore full Medi-Cal coverage for undocumented immigrants using state funds after federal UIS PPS elimination takes effect July 1. The bill would maintain FQHC per-visit reimbursement for UIS patients at state expense, preventing the estimated $1B statewide revenue loss.",
      es: "La Senadora Mar\u00eda Elena Durazo introdujo SB 1422 para restaurar la cobertura completa de Medi-Cal para inmigrantes indocumentados usando fondos estatales despu\u00e9s de la eliminaci\u00f3n federal de PPS UIS el 1 de julio.",
    },
    category: "legislation",
    status: "active",
    region: "California",
    organizations: ["Senator Maria Elena Durazo", "California Legislature"],
    followUpDate: "2026-06-30",
    followUpNote: { en: "Must pass before July 1 UIS PPS elimination", es: "Debe aprobarse antes de la eliminaci\u00f3n PPS UIS del 1 de julio" },
    outcomeDate: null,
    outcome: null,
    sourceUrl: "https://calmatters.org/health/2026/03/durazo-reverse-medical-undocumented-immigrants/",
    sourceOrg: "CalMatters",
    impactLevel: "high",
    tags: ["uis", "undocumented", "medi-cal", "state-funding", "sb-1422"],
  },
  {
    id: "ab-2161-block-work-requirements",
    date: "2026-02-15",
    headline: {
      en: "AB 2161: California Bill to Block State Implementation of Medicaid Work Requirements",
      es: "AB 2161: Proyecto de Ley de California para Bloquear Implementaci\u00f3n Estatal de Requisitos Laborales de Medicaid",
    },
    summary: {
      en: "Assembly Bill 2161 would prohibit California from implementing federal Medicaid work requirements, arguing they violate the state's commitment to universal healthcare access. The bill faces opposition from fiscal hawks concerned about federal funding penalties but has strong support from healthcare worker unions and FQHC advocacy groups.",
      es: "El Proyecto de Ley de la Asamblea 2161 prohibir\u00eda a California implementar requisitos laborales federales de Medicaid, argumentando que violan el compromiso del estado con el acceso universal a la atenci\u00f3n m\u00e9dica.",
    },
    category: "legislation",
    status: "active",
    region: "California",
    organizations: ["California State Assembly"],
    followUpDate: "2026-09-01",
    followUpNote: { en: "Track committee progress and floor votes", es: "Seguir progreso en comit\u00e9 y votos en pleno" },
    outcomeDate: null,
    outcome: null,
    sourceUrl: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB2161",
    sourceOrg: "California Legislature",
    impactLevel: "high",
    tags: ["work-requirements", "medicaid", "ab-2161", "state-legislation"],
  },
  {
    id: "340b-protection-act-hr-7391",
    date: "2026-03-01",
    headline: {
      en: "H.R. 7391: 340B FQHC Protection Act \u2014 35 Congressional Cosponsors",
      es: "H.R. 7391: Ley de Protecci\u00f3n FQHC 340B \u2014 35 Copatrocinadores del Congreso",
    },
    summary: {
      en: "The 340B FQHC Protection Act (H.R. 7391) would codify 340B drug pricing protections specifically for FQHCs, preventing administrative changes to the program through executive action. The bill has 35 bipartisan cosponsors and was introduced in response to the HRSA 340B rebate model pilot that threatened to shift FQHCs from upfront discounts to delayed rebates.",
      es: "La Ley de Protecci\u00f3n FQHC 340B (H.R. 7391) codificar\u00eda las protecciones de precios de medicamentos 340B espec\u00edficamente para FQHCs. El proyecto tiene 35 copatrocinadores bipartidistas.",
    },
    category: "federal-action",
    status: "active",
    region: "Federal",
    organizations: ["U.S. Congress", "NACHC"],
    followUpDate: "2026-07-01",
    followUpNote: { en: "Track committee hearings and markup", es: "Seguir audiencias y marcado en comit\u00e9" },
    outcomeDate: null,
    outcome: null,
    sourceUrl: "https://www.congress.gov/bill/119th-congress/house-bill/7391",
    sourceOrg: "U.S. Congress",
    impactLevel: "high",
    tags: ["340b", "federal", "legislation", "fqhc-protection"],
  },
  {
    id: "ninth-circuit-340b-fca-ruling",
    date: "2026-03-17",
    headline: {
      en: "Ninth Circuit Rules FQHCs Can Sue Drug Makers for 340B Overcharges Under False Claims Act",
      es: "Noveno Circuito Dictamina que FQHCs Pueden Demandar a Fabricantes por Sobreprecios 340B Bajo Ley de Reclamaciones Falsas",
    },
    summary: {
      en: "The Ninth Circuit unanimously ruled in Adventist Health System v. AbbVie that qui tam False Claims Act suits can proceed against pharmaceutical manufacturers overcharging 340B covered entities above statutory ceiling prices. This creates a new private enforcement mechanism \u2014 previously only HRSA could enforce ceiling price compliance. FQHCs can now pursue treble damages.",
      es: "El Noveno Circuito dictamin\u00f3 un\u00e1nimemente que las demandas qui tam bajo la Ley de Reclamaciones Falsas pueden proceder contra fabricantes farmac\u00e9uticos que sobrecargan a entidades cubiertas por 340B. Los FQHCs ahora pueden buscar da\u00f1os triples.",
    },
    category: "legal-action",
    status: "passed",
    region: "Federal",
    organizations: ["Adventist Health System", "Ninth Circuit Court of Appeals"],
    followUpDate: "2026-09-01",
    followUpNote: { en: "Watch for manufacturer appeals or settlements", es: "Observar apelaciones o acuerdos de fabricantes" },
    outcomeDate: "2026-03-17",
    outcome: { en: "Ruling issued March 17 \u2014 FCA suits may proceed for 340B overcharges", es: "Fallo emitido el 17 de marzo \u2014 demandas FCA pueden proceder por sobreprecios 340B" },
    sourceUrl: "https://fcablog.sidley.com/2026/03/19/ninth-circuit-opens-door-to-fca-liability-for-alleged-340b-overcharges/",
    sourceOrg: "Sidley Austin LLP",
    impactLevel: "high",
    tags: ["340b", "legal", "ninth-circuit", "fca", "pharmaceutical"],
  },
  {
    id: "san-diego-safety-net-ballot-measure",
    date: "2026-03-03",
    headline: {
      en: "San Diego County Exploring $360M Safety-Net Health Tax Ballot Measure",
      es: "Condado de San Diego Explorando Medida Electoral de Impuesto de Salud de $360M para Red de Seguridad",
    },
    summary: {
      en: "After San Diego County supervisors voted 4-1 to overhaul the county safety net system on March 3, county officials are exploring a $360M/year sales tax ballot measure modeled on Santa Clara's Measure A. If placed on the ballot and passed, it would fund community health centers, behavioral health, and homeless services in a county where 327K residents depend on Medi-Cal.",
      es: "Despu\u00e9s de que los supervisores del Condado de San Diego votaron 4-1 para reformar el sistema de red de seguridad, los funcionarios est\u00e1n explorando una medida electoral de impuesto de $360M/a\u00f1o. Si se aprueba, financiar\u00eda centros de salud comunitarios y servicios de salud conductual.",
    },
    category: "ballot-initiative",
    status: "proposed",
    region: "San Diego County",
    organizations: ["San Diego County Board of Supervisors"],
    followUpDate: "2026-08-01",
    followUpNote: { en: "Check if measure qualifies for ballot", es: "Verificar si la medida califica para la boleta" },
    outcomeDate: null,
    outcome: null,
    sourceUrl: "https://timesofsandiego.com/health/2026/03/03/san-diego-county-supervisors-vote-overhaul-safety-net-health-program/",
    sourceOrg: "Times of San Diego",
    impactLevel: "high",
    affectedOrgSlugs: ["family-health-centers-of-san-diego", "neighborhood-healthcare"],
    tags: ["local-tax", "san-diego", "ballot", "safety-net"],
  },
  {
    id: "nachc-pi-forum-7b-advocacy",
    date: "2026-02-24",
    headline: {
      en: "NACHC P&I Forum: $7B Federal Advocacy Push for Community Health Center Funding",
      es: "Foro P&I de NACHC: Campa\u00f1a Federal de $7B para Financiamiento de Centros de Salud Comunitarios",
    },
    summary: {
      en: "NACHC's 2026 Policy & Issues Forum brought over 2,000 CHC leaders to Washington to advocate for $7 billion in mandatory CHCF funding, reauthorization before December 2026 expiry, and protection of 340B drug pricing. This is the largest coordinated federal advocacy effort in CHC history, timed to counter H.R. 1 Medicaid cuts.",
      es: "El Foro de Pol\u00edtica y Asuntos de NACHC 2026 trajo a m\u00e1s de 2,000 l\u00edderes de CHC a Washington para abogar por $7 mil millones en financiamiento obligatorio de CHCF y protecci\u00f3n de precios 340B.",
    },
    category: "federal-action",
    status: "active",
    region: "Federal",
    organizations: ["NACHC"],
    followUpDate: "2026-12-01",
    followUpNote: { en: "Track CHCF reauthorization progress before December expiry", es: "Seguir progreso de reautorizaci\u00f3n de CHCF antes del vencimiento de diciembre" },
    outcomeDate: null,
    outcome: null,
    sourceUrl: "https://www.nachc.org/category/press-releases/",
    sourceOrg: "NACHC",
    impactLevel: "high",
    tags: ["nachc", "chcf", "reauthorization", "federal-funding", "advocacy"],
  },
  {
    id: "health-net-get-informed-stay-covered",
    date: "2026-04-01",
    headline: {
      en: "Health Net Commits $1M to Prepare 4.7M Members for Work Requirements",
      es: "Health Net Compromete $1M para Preparar 4.7M Miembros para Requisitos Laborales",
    },
    summary: {
      en: "Health Net (Centene subsidiary) launched 'Get Informed, Stay Covered' \u2014 the first managed care plan to begin formal member education for the January 2027 work requirements. $1M multilingual campaign. DHCS outreach window: June 30 \u2013 August 31, 2026. FQHCs may want to coordinate with Health Net on patient education materials and referral workflows.",
      es: "Health Net (subsidiaria de Centene) lanz\u00f3 'Inf\u00f3rmate, Mant\u00e9n tu Cobertura' \u2014 el primer plan de salud en iniciar educaci\u00f3n formal a miembros sobre requisitos laborales de enero 2027. Campa\u00f1a multiling\u00fce de $1M.",
    },
    category: "public-statement",
    status: "active",
    region: "California",
    organizations: ["Health Net", "Centene"],
    followUpDate: "2026-06-30",
    followUpNote: { en: "DHCS outreach window opens \u2014 check Health Net campaign progress", es: "Ventana de divulgaci\u00f3n DHCS abre \u2014 verificar progreso de campa\u00f1a Health Net" },
    outcomeDate: null,
    outcome: null,
    sourceUrl: "https://news.healthnet.com/medi-cal-enrollees-prepare-for-new-community-engagement-requirements-health-net-launches-get-informed-stay-covered-to-educate-members/",
    sourceOrg: "Health Net",
    impactLevel: "high",
    tags: ["work-requirements", "outreach", "health-net", "managed-care"],
  },

  // ── MEDIUM ──────────────────────────────────────────────────────────

  {
    id: "ahs-91m-working-group-layoffs-deferred",
    date: "2026-03-04",
    headline: {
      en: "Alameda Health System Creates $91.7M Working Group \u2014 183 Layoffs Deferred",
      es: "Sistema de Salud de Alameda Crea Grupo de Trabajo de $91.7M \u2014 183 Despidos Diferidos",
    },
    summary: {
      en: "After announcing 296 layoffs in January, the AHS Board of Trustees voted to defer 183 of them and create a working group to address the $91.7M budget deficit. The working group is exploring revenue diversification, operational efficiency, and potential county funding. This is a model for other safety-net systems facing similar crises.",
      es: "Despu\u00e9s de anunciar 296 despidos en enero, la Junta de S\u00edndicos de AHS vot\u00f3 diferir 183 y crear un grupo de trabajo para abordar el d\u00e9ficit presupuestario de $91.7M.",
    },
    category: "local-funding",
    status: "active",
    region: "Alameda County",
    organizations: ["Alameda Health System", "Alameda County Board of Supervisors"],
    followUpDate: "2026-07-01",
    followUpNote: { en: "Check working group progress and whether layoffs proceed", es: "Verificar progreso del grupo de trabajo y si los despidos proceden" },
    outcomeDate: null,
    outcome: null,
    sourceUrl: "https://www.oaklandside.org/2026/03/04/alameda-health-system-board-defers-layoffs-creates-working-group/",
    sourceOrg: "The Oaklandside",
    impactLevel: "medium",
    affectedOrgSlugs: ["asian-health-services"],
    tags: ["alameda", "layoffs", "working-group", "safety-net"],
  },
  {
    id: "cpca-pcdc-partnership-healthcare-access",
    date: "2026-02-28",
    headline: {
      en: "CPCA-PCDC Partnership for Expanded Healthcare Access in Underserved Communities",
      es: "Asociaci\u00f3n CPCA-PCDC para Acceso Expandido a Salud en Comunidades Desatendidas",
    },
    summary: {
      en: "The California Primary Care Association partnered with the Pacific Community Development Corporation to expand healthcare access in underserved rural and urban communities. The partnership focuses on workforce development, telehealth expansion, and community health worker deployment across CalAIM programs.",
      es: "La Asociaci\u00f3n de Atenci\u00f3n Primaria de California se asoci\u00f3 con PCDC para expandir el acceso a la salud en comunidades rurales y urbanas desatendidas. La asociaci\u00f3n se enfoca en desarrollo de fuerza laboral y telesalud.",
    },
    category: "coalition",
    status: "active",
    region: "California",
    organizations: ["CPCA", "PCDC"],
    followUpDate: "2026-09-01",
    followUpNote: { en: "Check partnership progress and outcomes", es: "Verificar progreso y resultados de la asociaci\u00f3n" },
    outcomeDate: null,
    outcome: null,
    sourceUrl: "https://www.cpca.org/",
    sourceOrg: "CPCA",
    impactLevel: "medium",
    tags: ["cpca", "partnership", "workforce", "telehealth", "calaim"],
  },
  {
    id: "sbnc-5m-donation-capacity-expansion",
    date: "2026-03-12",
    headline: {
      en: "SB Neighborhood Clinics Receives $5M Wyatt Family Donation \u2014 Largest in History",
      es: "Cl\u00ednicas Vecinales de SB Reciben Donaci\u00f3n de $5M de Familia Wyatt \u2014 La M\u00e1s Grande de su Historia",
    },
    summary: {
      en: "Santa Barbara Neighborhood Clinics received a $5 million donation from the Wyatt family \u2014 the largest in the organization's history. The gift will expand capacity by 41%, enabling SBNC to serve up to 28,000 patients annually. A counter-narrative to the crisis: private philanthropy stepping in as government funding contracts.",
      es: "Las Cl\u00ednicas Vecinales de Santa B\u00e1rbara recibieron una donaci\u00f3n de $5 millones de la familia Wyatt. El regalo expandir\u00e1 la capacidad en un 41%, permitiendo atender hasta 28,000 pacientes anualmente.",
    },
    category: "local-funding",
    status: "passed",
    region: "Santa Barbara County",
    organizations: ["Santa Barbara Neighborhood Clinics", "Wyatt Family"],
    followUpDate: null,
    followUpNote: null,
    outcomeDate: "2026-03-12",
    outcome: { en: "$5M donation received. Capacity expansion to 28K patients underway.", es: "Donaci\u00f3n de $5M recibida. Expansi\u00f3n de capacidad a 28K pacientes en curso." },
    sourceUrl: "https://www.noozhawk.com/santa-barbara-neighborhood-clinics-receive-5m-donation/",
    sourceOrg: "Noozhawk",
    impactLevel: "medium",
    tags: ["philanthropy", "santa-barbara", "capacity-expansion", "counter-narrative"],
  },
  {
    id: "hrsa-340b-rfi-comment-period",
    date: "2026-02-17",
    headline: {
      en: "HRSA 340B Rebate Model RFI \u2014 Comment Deadline April 20 for FQHC Stakeholders",
      es: "RFI del Modelo de Reembolso 340B de HRSA \u2014 Fecha L\u00edmite de Comentarios 20 de Abril para Partes Interesadas de FQHCs",
    },
    summary: {
      en: "HRSA is gathering stakeholder input on whether 340B drug pricing should shift from upfront discounts to delayed rebates. The 60-day RFI comment window closes April 20. A second Information Collection Request (ICR) on the burden of the rebate model is due April 27. Meanwhile, the 1st Circuit upheld a district court halt of the rebate pilot program (Jan 7, 2026) and HRSA has paused the pilot. NACHC's ASAP 340B Alliance is coordinating data-driven responses from member FQHCs.",
      es: "HRSA recopila comentarios sobre si los precios 340B deber\u00edan cambiar de descuentos anticipados a reembolsos diferidos. RFI cierra el 20 de abril, segunda ICR el 27 de abril. El 1er Circuito bloque\u00f3 el programa piloto; HRSA lo paus\u00f3.",
    },
    category: "federal-action",
    status: "active",
    region: "Federal",
    organizations: ["HRSA", "NACHC", "CPCA"],
    followUpDate: "2026-04-20",
    followUpNote: { en: "Comment deadline \u2014 verify comments were filed", es: "Fecha l\u00edmite de comentarios \u2014 verificar que se presentaron" },
    outcomeDate: null,
    outcome: null,
    sourceUrl: "https://www.federalregister.gov/documents/2026/02/26/2026-03838/request-for-information-340b-rebate-model-pilot-program-extension",
    sourceOrg: "Federal Register",
    impactLevel: "high",
    tools: [
      { label: { en: "Submit comment via Federal Register", es: "Enviar comentario v\u00eda Registro Federal" }, url: "https://www.federalregister.gov/documents/2026/02/26/2026-03838/request-for-information-340b-rebate-model-pilot-program-extension" },
      { label: { en: "NACHC advocacy resources", es: "Recursos de abogac\u00eda de NACHC" }, url: "https://www.nachc.org/policy-advocacy/" },
    ],
    tags: ["340b", "rfi", "comment-period", "deadline", "cash-flow"],
  },
  {
    id: "cms-maha-elevate-fqhc-eligible",
    date: "2026-04-06",
    headline: {
      en: "CMS Opens $100M MAHA ELEVATE Model \u2014 FQHCs Eligible for Lifestyle Medicine Grants",
      es: "CMS Abre Modelo MAHA ELEVATE de $100M \u2014 FQHCs Elegibles para Subvenciones de Medicina de Estilo de Vida",
    },
    summary: {
      en: "CMS Innovation Center is funding up to 30 cooperative agreements (~$3.3M each over 3 years) for whole-person lifestyle medicine in Original Medicare. FQHCs are explicitly eligible. Awards launch October 2026. This represents a potential new revenue stream for FQHCs treating Medicare patients with chronic conditions.",
      es: "El Centro de Innovaci\u00f3n de CMS financia hasta 30 acuerdos cooperativos (~$3.3M cada uno) para medicina de estilo de vida en Medicare Original. FQHCs son expl\u00edcitamente elegibles.",
    },
    category: "federal-action",
    status: "active",
    region: "Federal",
    organizations: ["CMS Innovation Center"],
    followUpDate: "2026-10-01",
    followUpNote: { en: "Check award announcements", es: "Verificar anuncios de premios" },
    outcomeDate: null,
    outcome: null,
    sourceUrl: "https://www.cms.gov/priorities/innovation/innovation-models/maha-elevate",
    sourceOrg: "CMS Innovation Center",
    impactLevel: "medium",
    tools: [
      { label: { en: "CMS MAHA ELEVATE details", es: "Detalles de CMS MAHA ELEVATE" }, url: "https://www.cms.gov/priorities/innovation/innovation-models/maha-elevate" },
    ],
    tags: ["cms", "maha", "grant", "lifestyle-medicine", "revenue-stream"],
  },

  // ── APRIL 8, 2026 — DAILY UPDATE #30 ──────────────────────────────

  {
    id: "seiu-uhw-90-percent-ballot-signatures-submitted",
    date: "2026-04-03",
    headline: {
      en: "SEIU-UHW Submits Signatures for 90% Mission Spend + $450K Exec Pay Cap Ballot Measures",
      es: "SEIU-UHW Presenta Firmas para Medidas Electorales de 90% Gasto en Misión + Tope de $450K a Salarios Ejecutivos",
    },
    summary: {
      en: "SEIU-UHW submitted signatures for two California ballot initiatives: #25-0008 (requiring FQHCs to spend 90% of revenue on patient care) and #25-0009 (capping healthcare executive pay at $450K). CMA, CPCA, and CCALAC oppose both, calling them 'dangerous' and warning of clinic closures. The 'Protect Patients' coalition has formed in opposition. LAO warns of 'potential clinic closures' as possible outcome. If qualified and passed, these would fundamentally restructure FQHC finances statewide during the H.R. 1 funding crisis.",
      es: "SEIU-UHW presentó firmas para dos iniciativas: gasto del 90% en atención al paciente y tope de $450K a salarios ejecutivos. CMA, CPCA y CCALAC se oponen, advirtiendo sobre cierres de clínicas.",
    },
    category: "ballot-initiative",
    status: "active",
    region: "California",
    organizations: ["SEIU-UHW", "CMA (opposing)", "CPCA (opposing)", "CCALAC (opposing)", "Protect Patients coalition (opposing)"],
    followUpDate: "2026-06-25",
    followUpNote: { en: "Signature verification deadline — check if measures qualify for November ballot", es: "Fecha límite de verificación de firmas — verificar si las medidas califican para la boleta de noviembre" },
    outcomeDate: null,
    outcome: null,
    sourceUrl: "https://news.ballotpedia.org/2026/04/03/seiu-uhw-submits-signatures-for-california-ballot-initiatives-capping-executive-pay-and-requiring-clinics-to-spend-90-on-patient-care/",
    sourceOrg: "Ballotpedia",
    impactLevel: "critical",
    tools: [
      { label: { en: "Ballotpedia initiative page", es: "Página de iniciativa en Ballotpedia" }, url: "https://ballotpedia.org/California_Require_Transparency_in_Health_Clinic_Funding_and_Regulate_Use_of_Profits_Initiative_(2026)" },
      { label: { en: "Protect Patients CA", es: "Protect Patients CA" }, url: "https://protectpatientsca.com/faq/" },
    ],
    tags: ["seiu-uhw", "ballot-initiative", "90-percent", "exec-pay-cap", "protect-patients", "june-25-deadline"],
  },
  {
    id: "ca-billionaire-tax-act-100b-ballot",
    date: "2026-04-01",
    headline: {
      en: "California Billionaire Tax Act: $100B Healthcare Funding Ballot Measure Gains Momentum",
      es: "Ley de Impuesto a Multimillonarios de California: Medida Electoral de $100B para Salud Cobra Impulso",
    },
    summary: {
      en: "SEIU-UHW is leading a ballot drive for a one-time 5% wealth tax on California's ~200 billionaires (~$2T combined wealth), projected to generate $100B over 5 years. 90% would fund healthcare programs, directly offsetting H.R. 1 Medicaid cuts. As of April 2026, the measure is dividing progressive Democrats \u2014 Governor Newsom opposes it, and CalMatters reports three unnamed union leaders and five Legislative Progressive Caucus members are privately critical. Key criticism: the tax disproportionately benefits SEIU-UHW members rather than the general fund. SEIU-UHW president Dave Regan says he is 'confident' enough signatures will be collected before end of April.",
      es: "SEIU-UHW lidera una campaña electoral para un impuesto del 5% sobre la riqueza de los ~200 multimillonarios de California, proyectado para generar $100B en 5 años. A partir de abril 2026, la medida está dividiendo a los demócratas progresistas \u2014 el Gobernador Newsom se opone.",
    },
    category: "ballot-initiative",
    status: "active",
    region: "California",
    organizations: ["SEIU-UHW", "Bernie Sanders (endorsement)"],
    followUpDate: "2026-08-01",
    followUpNote: { en: "Check if sufficient signatures collected for November ballot", es: "Verificar si se recolectaron suficientes firmas para la boleta de noviembre" },
    outcomeDate: null,
    outcome: null,
    sourceUrl: "https://www.commondreams.org/news/ca-billionaire-tax",
    sourceOrg: "Common Dreams / SEIU-UHW",
    impactLevel: "high",
    tools: [
      { label: { en: "SEIU-UHW Billionaire Tax page", es: "Página de Impuesto a Multimillonarios de SEIU-UHW" }, url: "https://www.seiu-uhw.org/ca-billionaire-tax-act/" },
    ],
    tags: ["billionaire-tax", "seiu-uhw", "ballot-initiative", "$100B", "november-2026", "medicaid-offset"],
  },
  {
    id: "innercare-nlrb-forced-recognition-hearing",
    date: "2026-03-17",
    headline: {
      en: "NLRB Seeks Forced Union Recognition at Innercare — ALJ Hearing Underway in San Diego",
      es: "NLRB Busca Reconocimiento Sindical Forzado en Innercare — Audiencia del Juez Administrativo en San Diego",
    },
    summary: {
      en: "NLRB filed a formal complaint against Innercare (Clinicas de Salud del Pueblo) in Imperial County for 30+ unfair labor practices during SEIU-UHW's organizing campaign, including firing 11 workers. Despite a 214-132 vote against the union in July 2024, the NLRB is seeking a bargaining order — forced recognition without a new election — due to the severity of management interference. Administrative law judge hearing began March 17, 2026 in San Diego. This is the most serious NLRB enforcement action against a California FQHC in recent memory.",
      es: "El NLRB presentó una queja formal contra Innercare por 30+ prácticas laborales injustas, incluyendo el despido de 11 trabajadores. El NLRB busca reconocimiento sindical forzado. La audiencia comenzó el 17 de marzo en San Diego.",
    },
    category: "legal-action",
    status: "in-court",
    region: "California",
    organizations: ["NLRB", "SEIU-UHW", "Innercare (Clinicas de Salud del Pueblo)"],
    affectedOrgSlugs: ["clinicas-de-salud-del-pueblo"],
    followUpDate: "2026-06-01",
    followUpNote: { en: "Check for ALJ ruling on forced recognition", es: "Verificar decisión del juez sobre reconocimiento forzado" },
    outcomeDate: null,
    outcome: null,
    sourceUrl: "https://www.thedesertreview.com/business/nlrb-complaint-against-innercare-sets-stage-for-2026-hearing-as-organization-denies-allegations/article_c29d43e5-c7fe-4095-8749-f7f4839010f8.html",
    sourceOrg: "Desert Review / NLRB",
    impactLevel: "high",
    tools: [
      { label: { en: "SEIU-UHW Innercare ULP page", es: "Página de ULPs de SEIU-UHW sobre Innercare" }, url: "https://www.seiu-uhw.org/innercareulp/" },
    ],
    tags: ["nlrb", "seiu-uhw", "innercare", "forced-recognition", "unfair-labor-practices", "imperial-county"],
  },
  {
    id: "seiu-community-clinics-lmcc-partnership",
    date: "2026-01-01",
    headline: {
      en: "SEIU-Community Clinics Labor Management Partnership: 3,000+ Workers Trained via High-Road Model",
      es: "Asociación Laboral-Gerencial SEIU-Clínicas Comunitarias: 3,000+ Trabajadores Capacitados vía Modelo de Alto Camino",
    },
    summary: {
      en: "The SEIU-Community Clinics Partnership is a statewide labor-management cooperation committee (LMCC) between FQHC employers and SEIU locals, funded through the California Workforce Development Board. It trains 3,000+ incumbent workers and new entrants for nursing, MA, dental assistant, CHW, and behavioral health roles. Won $13.3M in High-Road Training Partnership funding and $1,000 retention bonuses for 70,000 clinic workers through AB 204/SB 121 in 2023. This represents the productive side of the union-FQHC relationship.",
      es: "La Asociación SEIU-Clínicas Comunitarias es un comité de cooperación laboral-gerencial que capacita a 3,000+ trabajadores en roles de enfermería, MA, asistente dental, CHW y salud conductual. Representa el lado productivo de la relación sindicato-FQHC.",
    },
    category: "coalition",
    status: "active",
    region: "California",
    organizations: ["SEIU Locals 521/721/1021/UHW", "California Workforce Development Board"],
    followUpDate: null,
    followUpNote: null,
    outcomeDate: null,
    outcome: null,
    sourceUrl: "https://seiuclinicspartnership.org/",
    sourceOrg: "SEIU Community Clinics Partnership",
    impactLevel: "medium",
    tools: [
      { label: { en: "SEIU Clinics Partnership website", es: "Sitio web de la Asociación SEIU Clínicas" }, url: "https://seiuclinicspartnership.org/" },
      { label: { en: "CWDB High-Road program", es: "Programa de Alto Camino CWDB" }, url: "https://cwdb.ca.gov/wp-content/uploads/sites/43/2024/11/Shirley-Ware.SEIU-Community-Clinics_ACCESSIBLE.pdf" },
    ],
    tags: ["seiu", "lmcc", "workforce-training", "high-road", "partnership", "retention-bonuses"],
  },

  // ── Daily Update #26 (2026-04-09) ──────────────────────────────

  {
    id: "nachc-in-district-advocacy-april-2026",
    date: "2026-04-09",
    headline: {
      en: "NACHC Launches April 14-25 In-District Advocacy Push — FQHCs Meet Congressional Delegations",
      es: "NACHC Lanza Campaña de Incidencia en Distritos del 14 al 25 de Abril — FQHCs Se Reúnen con Delegaciones del Congreso",
    },
    summary: {
      en: "NACHC is coordinating a nationwide in-district advocacy push from April 14-25 where FQHC leaders meet with their congressional representatives during the recess period. Focus: preserving CHCF funding ahead of the December 2026 expiration, opposing H.R. 1 Medicaid cuts, and protecting 340B. NACHC providing talking points, data sheets, and constituent story templates. California FQHCs have 52 House districts to cover.",
      es: "NACHC coordina una campaña nacional de incidencia en distritos del 14 al 25 de abril donde líderes de FQHCs se reúnen con sus representantes del Congreso. Enfoque: preservar CHCF, oponerse a recortes de Medicaid, proteger 340B.",
    },
    category: "coalition",
    status: "active",
    region: "National",
    organizations: ["NACHC"],
    followUpDate: "2026-04-25",
    followUpNote: { en: "Advocacy period ends April 25 — track congressional responses", es: "Período de incidencia termina el 25 de abril — rastrear respuestas del Congreso" },
    outcomeDate: null,
    outcome: null,
    sourceUrl: "https://www.nachc.org/ask-your-representatives-to-support-robust-health-center-funding-in-2026/",
    sourceOrg: "NACHC",
    impactLevel: "high",
    tools: [
      { label: { en: "NACHC Advocacy Toolkit", es: "Kit de Herramientas de Incidencia NACHC" }, url: "https://www.nachc.org/advocacy/" },
    ],
    tags: ["nachc", "in-district", "advocacy", "chcf", "340b", "congressional"],
  },
  {
    id: "cha-counter-initiative-union-dues-ballot",
    date: "2026-04-07",
    headline: {
      en: "California Hospital Association Files Counter-Initiative Requiring Union Member Approval for Ballot Spending",
      es: "Asociación de Hospitales de California Presenta Contra-Iniciativa Requiriendo Aprobación de Miembros del Sindicato para Gastos en Boletas Electorales",
    },
    summary: {
      en: "The California Hospital Association filed a counter-ballot initiative that would require unions to obtain member approval before spending on ballot measures. This directly targets SEIU-UHW's 90% mission-spend initiative and creates a multi-front ballot war in November 2026. FQHCs are caught between their healthcare system allies (CHA) and their labor partners (SEIU). This escalation could divide FQHC advocacy energy during the Medicaid crisis.",
      es: "La Asociación de Hospitales de California presentó una contra-iniciativa que requeriría que los sindicatos obtengan aprobación de los miembros antes de gastar en medidas electorales. Directamente dirigida contra la iniciativa de SEIU-UHW.",
    },
    category: "ballot-initiative",
    status: "active",
    region: "California",
    organizations: ["California Hospital Association"],
    followUpDate: "2026-06-25",
    followUpNote: { en: "Signature gathering through June 2026", es: "Recolección de firmas hasta junio 2026" },
    outcomeDate: null,
    outcome: null,
    sourceUrl: "https://calhospital.org/exec-brief-cha-ballot-initiative/",
    sourceOrg: "California Hospital Association",
    impactLevel: "high",
    tools: [],
    tags: ["cha", "counter-initiative", "seiu-uhw", "ballot", "union-dues", "november-2026"],
  },
  {
    id: "ccalac-fhcsd-protect-access-counter-initiative",
    date: "2026-04-03",
    headline: {
      en: "CCALAC & FHCSD Lead 'Protect Access to Healthcare' Counter-Initiative — Signatures Submitted for November Ballot",
      es: "CCALAC y FHCSD Lideran Contra-Iniciativa 'Proteger Acceso a la Salud' — Firmas Presentadas para Boleta de Noviembre",
    },
    summary: {
      en: "The Community Clinic Association of LA County (CCALAC) and Family Health Centers of San Diego (FHCSD) are leading a coalition-backed counter-initiative 'Protect Access to Healthcare' that submitted voter signatures to qualify for the November 2026 ballot. This is a THIRD ballot measure in the SEIU-vs-FQHC industry fight — distinct from both SEIU-UHW's 90% mission-spend initiative and CHA's union-dues counter-initiative. If all three qualify, voters face competing measures that could create chaos for FQHC governance.",
      es: "CCALAC y FHCSD lideran contra-iniciativa 'Proteger Acceso a la Salud' que presentó firmas de votantes para la boleta de noviembre 2026. Es la TERCERA medida electoral en la lucha SEIU-vs-industria FQHC.",
    },
    category: "ballot-initiative",
    status: "active",
    region: "California",
    organizations: ["CCALAC", "Family Health Centers of San Diego", "Coalition to Protect Access to Healthcare"],
    followUpDate: "2026-06-25",
    followUpNote: { en: "Signature verification deadline", es: "Fecha límite de verificación de firmas" },
    outcomeDate: null,
    outcome: null,
    sourceUrl: "https://ccalac.org/protect-access-to-healthcare-coalition-submits-voter-signatures-to-qualify-initiative-for-the-november-ballot/",
    sourceOrg: "CCALAC",
    impactLevel: "high",
    tools: [
      { label: { en: "FHCSD Campaign Page", es: "Página de Campaña FHCSD" }, url: "https://www.fhcsd.org/protect-access-to-care-initiative/" },
      { label: { en: "Protect Patients CA", es: "Proteger Pacientes CA" }, url: "https://protectpatientsca.com/" },
    ],
    tags: ["ccalac", "fhcsd", "counter-initiative", "seiu-uhw", "ballot", "protect-access", "november-2026"],
  },
  {
    id: "first-circuit-340b-rebate-pilot-blocked",
    date: "2026-02-10",
    headline: {
      en: "Federal Courts Block 340B Rebate Pilot \u2014 1st Circuit Upholds Halt, HRSA Pauses Program",
      es: "Tribunales Federales Bloquean Piloto de Reembolso 340B \u2014 1er Circuito Confirma Suspensión, HRSA Pausa Programa",
    },
    summary: {
      en: "The 1st Circuit Court denied the government's stay request (Jan 7, 2026), upholding a Maine district court ruling that vacated the 340B rebate model pilot program. The court found hospitals were 'likely to succeed on the merits' due to HRSA's failure to provide a reasonable explanation for the pricing change. HRSA has officially paused the pilot and is using an RFI (deadline April 20) and ICR (deadline April 27) to gather input on next steps. This is a significant victory for safety-net providers including FQHCs that depend on 340B upfront discounts for cash flow.",
      es: "El 1er Circuito negó la suspensión del gobierno, confirmando el fallo que anuló el programa piloto de reembolso 340B. HRSA pausó oficialmente el piloto. Victoria significativa para proveedores de red de seguridad.",
    },
    category: "legal-action",
    status: "passed",
    region: "Federal",
    organizations: ["AHA", "Maine Hospital Association", "1st Circuit Court", "HRSA"],
    followUpDate: "2026-04-20",
    followUpNote: { en: "340B RFI comment deadline \u2014 next steps from HRSA", es: "Fecha límite de comentarios del RFI 340B \u2014 próximos pasos de HRSA" },
    outcomeDate: "2026-02-10",
    outcome: { en: "340B rebate pilot vacated by federal court; HRSA paused program", es: "Piloto de reembolso 340B anulado por tribunal federal; HRSA pausó programa" },
    sourceUrl: "https://www.aha.org/news/headline/2026-01-08-1st-circuit-denies-stay-upholds-district-courts-halt-340b-rebate-program",
    sourceOrg: "AHA",
    impactLevel: "high",
    tags: ["340b", "court-ruling", "rebate-pilot", "1st-circuit", "aha", "safety-net"],
  },
  {
    id: "eo-14398-far-guidance-dei-deadline",
    date: "2026-03-26",
    headline: {
      en: "EO 14398 FAR Guidance Deadline May 25 \u2014 FQHCs Must Review HR Policies for DEI Compliance",
      es: "Fecha L\u00edmite de Gu\u00eda FAR de OE 14398 el 25 de Mayo \u2014 FQHCs Deben Revisar Pol\u00edticas de RRHH para Cumplimiento DEI",
    },
    summary: {
      en: "Executive Order 14398 (signed March 26) prohibits 'racially discriminatory DEI activities' by federal contractors and grantees. The FAR Council must issue implementation guidance by May 25. FQHCs receiving HRSA Section 330 grants face a direct tension: CLAS Standards require culturally concordant workforce recruitment, while EO 14398 restricts race/ethnicity-based hiring and training. Agency compliance reports are due July 24. FQHCs should review HR policies, training programs, and recruitment strategies before May 25.",
      es: "La Orden Ejecutiva 14398 proh\u00edbe actividades DEI por contratistas federales. El Consejo FAR debe emitir gu\u00eda de implementaci\u00f3n antes del 25 de mayo. FQHCs enfrentan tensi\u00f3n entre Est\u00e1ndares CLAS y restricciones DEI.",
    },
    category: "federal-action",
    status: "active",
    region: "Federal",
    organizations: ["FAR Council", "HRSA", "HHS"],
    followUpDate: "2026-05-25",
    followUpNote: { en: "FAR implementation guidance due \u2014 review for FQHC impact", es: "Gu\u00eda de implementaci\u00f3n FAR vence \u2014 revisar impacto en FQHCs" },
    outcomeDate: null,
    outcome: null,
    sourceUrl: "https://www.theemployerreport.com/2026/04/why-the-new-dei-executive-order-matters-for-federal-contractors-and-signals-broader-risk-for-all-us-employers/",
    sourceOrg: "The Employer Report / Sullivan & Cromwell",
    impactLevel: "high",
    tags: ["dei", "executive-order", "far-council", "clas-standards", "compliance", "may-2026"],
  },
  {
    id: "cms-work-requirements-ifr-june-1",
    date: "2026-04-14",
    headline: {
      en: "CMS Must Publish Work Requirements Interim Final Rule by June 1 \u2014 Exemption Scope Will Determine FQHC Patient Impact",
      es: "CMS Debe Publicar Regla Final Provisional de Requisitos de Trabajo antes del 1 de Junio \u2014 Alcance de Exenciones Determinar\u00e1 Impacto en Pacientes de FQHCs",
    },
    summary: {
      en: "CMS is required by H.R. 1 to issue an Interim Final Rule by June 1, 2026 defining work requirement implementation: exemption criteria, reporting mechanisms, compliance verification, and enforcement. The 80-hour/month requirement scope depends on this rule \u2014 narrow exemptions mean millions lose coverage, broad exemptions limit damage. States must conduct member outreach June 30\u2013August 31. $200M in 'Government Efficiency Grants' funds state systems, but no direct funding flows to FQHCs despite bearing the patient-facing burden.",
      es: "CMS debe emitir una Regla Final Provisional antes del 1 de junio definiendo requisitos de trabajo. Exenciones estrechas significan millones sin cobertura. $200M para estados, nada directo para FQHCs.",
    },
    category: "federal-action",
    status: "active",
    region: "Federal",
    organizations: ["CMS", "HHS"],
    followUpDate: "2026-06-01",
    followUpNote: { en: "IFR publication deadline \u2014 review exemption criteria immediately", es: "Fecha l\u00edmite de publicaci\u00f3n de IFR \u2014 revisar criterios de exenci\u00f3n inmediatamente" },
    outcomeDate: null,
    outcome: null,
    sourceUrl: "https://www.chcs.org/resource/a-summary-of-national-medicaid-work-requirements/",
    sourceOrg: "CHCS / CMS",
    impactLevel: "critical",
    tags: ["cms", "work-requirements", "ifr", "exemptions", "june-2026", "disenrollment"],
  },
  {
    id: "washington-sb5981-pharma-lawsuit-340b-state-precedent",
    date: "2026-04-15",
    headline: {
      en: "PhRMA Sues Washington State Over 340B Contract Pharmacy Law — National Precedent for CA AB 1460 Hinges on Outcome",
      es: "PhRMA Demanda a Washington por Ley de Farmacia Contratada 340B — El Resultado Establecerá Precedente Nacional para CA AB 1460",
    },
    summary: {
      en: "PhRMA filed suit April 15 against Washington State's SB 5981, which requires drug manufacturers to reimburse 340B covered entities for contract pharmacy purchases. If courts enjoin the law before its June 10 effective date, it will chill similar CA legislative action (AB 1460); if SB 5981 survives, AB 1460 has a significantly clearer path. This is the most consequential 340B state-law precedent for California FQHCs in 2026 — CA FQHCs should monitor the court timeline closely and engage CPCA/CCALAC for updates.",
      es: "PhRMA presentó demanda el 15 de abril contra la ley SB 5981 de Washington, que requiere que los fabricantes de medicamentos reembolsen a las entidades cubiertas por 340B en compras de farmacias contratadas. El resultado establecerá un precedente nacional crítico para el AB 1460 de California.",
    },
    category: "legal-action",
    status: "in-court",
    region: "Federal",
    organizations: ["PhRMA", "Washington State AG", "CPCA", "340B Health"],
    followUpDate: "2026-06-10",
    followUpNote: {
      en: "June 10 = WA SB 5981 effective date. Court must rule on preliminary injunction before then. If no injunction, law takes effect and CA AB 1460 path clears.",
      es: "El 10 de junio es la fecha de vigencia de SB 5981 de WA. El tribunal debe fallar sobre la medida cautelar antes de esa fecha. Sin medida cautelar, la ley entra en vigor y aclara el camino para CA AB 1460.",
    },
    outcomeDate: null,
    outcome: null,
    sourceUrl: "https://www.spokesman.com/stories/2026/apr/15/big-health-industry-group-sues-wa-over-new-drug-pr/",
    sourceOrg: "Spokesman-Review / PhRMA",
    impactLevel: "high",
    affectedOrgSlugs: [],
    tools: [
      {
        label: { en: "Track CA AB 1460", es: "Seguir CA AB 1460" },
        url: "https://legiscan.com/CA/bill/AB1460/2025",
      },
    ],
    tags: ["340b", "pharma", "lawsuit", "washington-state", "sb5981", "ab1460", "contract-pharmacy", "state-precedent"],
  },
  {
    id: "nachc-in-district-advocacy-week-april-2026",
    date: "2026-04-14",
    headline: {
      en: "NACHC Activates National In-District Advocacy Week April 14–25 — Most Critical Lobbying Window Before Senate Reconciliation Vote",
      es: "NACHC Activa Semana Nacional de Cabildeo Local del 14 al 25 de Abril — La Ventana de Cabildeo Más Crítica Antes del Voto de Reconciliación del Senado",
    },
    summary: {
      en: "NACHC identified the congressional recess April 14–25 as the critical advocacy window before the Senate reconciliation vote on Medicaid cuts. FQHCs are hosting members of Congress in their clinics to make the case against work requirements, per-capita caps, and FMAP reductions. CPCA is coordinating California health centers for in-district visits. The window closes April 25.",
      es: "NACHC identificó el receso del Congreso del 14 al 25 de abril como la ventana crítica de cabildeo antes del voto del Senado sobre los recortes a Medicaid. Los FQHCs reciben a congresistas en sus clínicas para argumentar contra los requisitos de trabajo y los recortes de FMAP.",
    },
    category: "coalition",
    status: "active",
    region: "Federal",
    organizations: ["NACHC", "CPCA", "CCALAC"],
    followUpDate: "2026-04-25",
    followUpNote: {
      en: "Window closes April 25. After recess, Senate reconciliation markup begins — track NACHC for next action alert.",
      es: "La ventana cierra el 25 de abril. Después del receso, comienza el marcado de reconciliación del Senado — seguir NACHC para la próxima alerta de acción.",
    },
    outcomeDate: null,
    outcome: null,
    sourceUrl: "https://www.nachc.org/take-action-for-medicaid-reach-out-to-congress-today/",
    sourceOrg: "NACHC",
    impactLevel: "high",
    affectedOrgSlugs: [],
    tools: [
      {
        label: { en: "Take Action — NACHC", es: "Tomar Acción — NACHC" },
        url: "https://www.nachc.org/take-action-for-medicaid-reach-out-to-congress-today/",
      },
      {
        label: { en: "CPCA Advocacy Center", es: "Centro de Cabildeo de CPCA" },
        url: "https://www.cpca.org/advocacy",
      },
    ],
    tags: ["nachc", "advocacy", "congress", "medicaid", "reconciliation", "in-district", "cpca", "senate"],
  },
];

/* ------------------------------------------------------------------ */
/*  Helper functions                                                    */
/* ------------------------------------------------------------------ */

/** Get all actions, sorted by date (newest first) */
export function getAdvocacyActions(filters?: {
  category?: AdvocacyCategory;
  status?: AdvocacyStatus;
  region?: string;
  impactLevel?: string;
}): AdvocacyAction[] {
  let items = [...ADVOCACY_ACTIONS];

  if (filters?.category) items = items.filter((i) => i.category === filters.category);
  if (filters?.status) items = items.filter((i) => i.status === filters.status);
  if (filters?.region) items = items.filter((i) => i.region === filters.region);
  if (filters?.impactLevel) items = items.filter((i) => i.impactLevel === filters.impactLevel);

  return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Get actions with upcoming follow-up dates (within next 90 days) */
export function getUpcomingFollowUps(): AdvocacyAction[] {
  const now = new Date();
  const in90Days = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);

  return ADVOCACY_ACTIONS.filter((a) => {
    if (!a.followUpDate) return false;
    const followUp = new Date(a.followUpDate);
    return followUp >= now && followUp <= in90Days;
  }).sort(
    (a, b) =>
      new Date(a.followUpDate!).getTime() - new Date(b.followUpDate!).getTime(),
  );
}

/** Get actions for a specific FQHC by slug */
export function getAdvocacyForFQHC(slug: string): AdvocacyAction[] {
  return ADVOCACY_ACTIONS.filter((a) => a.affectedOrgSlugs?.includes(slug)).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/** Get counts by status */
export function getAdvocacyCounts(): {
  total: number;
  active: number;
  passed: number;
  pendingVote: number;
  upcoming: number;
} {
  return {
    total: ADVOCACY_ACTIONS.length,
    active: ADVOCACY_ACTIONS.filter((a) => a.status === "active").length,
    passed: ADVOCACY_ACTIONS.filter((a) => a.status === "passed" || a.status === "signed-into-law").length,
    pendingVote: ADVOCACY_ACTIONS.filter((a) => a.status === "pending-vote").length,
    upcoming: getUpcomingFollowUps().length,
  };
}

/** Get unique regions */
export function getAdvocacyRegions(): string[] {
  return [...new Set(ADVOCACY_ACTIONS.map((a) => a.region))].sort();
}
