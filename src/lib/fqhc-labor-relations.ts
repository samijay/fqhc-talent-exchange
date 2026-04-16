// fqhc-labor-relations.ts
// FQHC Labor Relations Monitor — strategic intelligence for health center leaders
// Tracks active labor cases, landscape analysis, and labor-friendly strategies
// Updated via /daily-update pipeline (Agent 8: Advocacy & Positive Momentum Scan)

import { INTEL_ITEMS, type IntelItem } from "./fqhc-news-intel";
import {
  ADVOCACY_ACTIONS,
  type AdvocacyAction,
} from "./fqhc-advocacy-tracker";
import { californiaFQHCs } from "./california-fqhcs";

export const LABOR_LAST_UPDATED = "2026-04-16";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type BL = { en: string; es: string };

export type LaborCaseType =
  | "nlrb-complaint"
  | "ballot-measure"
  | "contract-negotiation"
  | "strike"
  | "arbitration"
  | "organizing-drive"
  | "legislation";

export type LaborCaseStatus =
  | "filed"
  | "signature-gathering"
  | "hearing"
  | "negotiating"
  | "strike-active"
  | "ruling-pending"
  | "appealed"
  | "resolved"
  | "qualified-for-ballot"
  | "withdrawn";

export type LaborRelationsPosture =
  | "adversarial"
  | "contested"
  | "neutral"
  | "cooperative"
  | "partnership";

export interface LaborCaseEvent {
  date: string;
  description: BL;
  sourceUrl: string | null;
}

export interface LaborCase {
  id: string;
  title: BL;
  summary: BL;
  caseType: LaborCaseType;
  status: LaborCaseStatus;
  posture: LaborRelationsPosture;
  parties: { unions: string[]; employers: string[]; agencies: string[] };
  region: string;
  impactLevel: "critical" | "high" | "medium" | "low";
  timeline: LaborCaseEvent[];
  nextMilestone: { date: string; description: BL } | null;
  affectedFqhcSlugs: string[];
  relatedUnionIds: string[];
  relatedIntelIds: string[];
  relatedAdvocacyIds: string[];
  sourceUrl: string;
  sourceOrg: string;
  additionalSources: { title: string; url: string }[];
  tags: string[];
}

export interface LandscapeTheme {
  id: string;
  title: BL;
  analysis: BL;
  posture: LaborRelationsPosture;
  impactLevel: "critical" | "high" | "medium" | "low";
  keyDataPoints: BL[];
  sources: { title: string; url: string }[];
  relatedCaseIds: string[];
}

export interface PathForward {
  id: string;
  title: BL;
  description: BL;
  laborFriendly: BL;
  operationalCase: BL;
  examples: BL[];
  implementationSteps: BL[];
  difficulty: "low" | "medium" | "high";
  timeframe: "immediate" | "6-months" | "1-year" | "multi-year";
  relatedCaseIds: string[];
  sources: { title: string; url: string }[];
}

export interface RegionalDensity {
  region: string;
  totalFqhcs: number;
  unionizedFqhcs: number;
  density: number;
  primaryUnions: string[];
}

/* ------------------------------------------------------------------ */
/*  Metadata constants                                                 */
/* ------------------------------------------------------------------ */

export const CASE_TYPE_META: Record<
  LaborCaseType,
  { label: BL; icon: string }
> = {
  "nlrb-complaint": {
    label: { en: "NLRB Complaint", es: "Queja NLRB" },
    icon: "Scale",
  },
  "ballot-measure": {
    label: { en: "Ballot Measure", es: "Medida Electoral" },
    icon: "Vote",
  },
  "contract-negotiation": {
    label: { en: "Contract Negotiation", es: "Negociación de Contrato" },
    icon: "FileText",
  },
  strike: {
    label: { en: "Strike", es: "Huelga" },
    icon: "AlertTriangle",
  },
  arbitration: {
    label: { en: "Arbitration", es: "Arbitraje" },
    icon: "Gavel",
  },
  "organizing-drive": {
    label: { en: "Organizing Drive", es: "Campaña de Organización" },
    icon: "Users",
  },
  legislation: {
    label: { en: "Legislation", es: "Legislación" },
    icon: "ScrollText",
  },
};

export const CASE_STATUS_META: Record<
  LaborCaseStatus,
  { label: BL; color: string }
> = {
  filed: {
    label: { en: "Filed", es: "Presentado" },
    color: "bg-stone-50 text-stone-700 border-stone-300",
  },
  "signature-gathering": {
    label: { en: "Gathering Signatures", es: "Recopilando Firmas" },
    color: "bg-amber-50 text-amber-700 border-amber-300",
  },
  hearing: {
    label: { en: "In Hearing", es: "En Audiencia" },
    color: "bg-purple-50 text-purple-700 border-purple-300",
  },
  negotiating: {
    label: { en: "Negotiating", es: "Negociando" },
    color: "bg-blue-50 text-blue-700 border-blue-300",
  },
  "strike-active": {
    label: { en: "Strike Active", es: "Huelga Activa" },
    color: "bg-red-50 text-red-700 border-red-300",
  },
  "ruling-pending": {
    label: { en: "Ruling Pending", es: "Fallo Pendiente" },
    color: "bg-amber-50 text-amber-700 border-amber-300",
  },
  appealed: {
    label: { en: "Appealed", es: "Apelado" },
    color: "bg-orange-50 text-orange-700 border-orange-300",
  },
  resolved: {
    label: { en: "Resolved", es: "Resuelto" },
    color: "bg-green-50 text-green-700 border-green-300",
  },
  "qualified-for-ballot": {
    label: { en: "Qualified for Ballot", es: "Calificado para Boleta" },
    color: "bg-teal-50 text-teal-700 border-teal-300",
  },
  withdrawn: {
    label: { en: "Withdrawn", es: "Retirado" },
    color: "bg-stone-50 text-stone-500 border-stone-200",
  },
};

export const POSTURE_META: Record<
  LaborRelationsPosture,
  { label: BL; color: string; bgColor: string }
> = {
  adversarial: {
    label: { en: "Adversarial", es: "Adversarial" },
    color: "text-red-700",
    bgColor: "bg-red-100",
  },
  contested: {
    label: { en: "Contested", es: "Disputado" },
    color: "text-amber-700",
    bgColor: "bg-amber-100",
  },
  neutral: {
    label: { en: "Neutral", es: "Neutral" },
    color: "text-stone-600",
    bgColor: "bg-stone-100",
  },
  cooperative: {
    label: { en: "Cooperative", es: "Cooperativo" },
    color: "text-teal-700",
    bgColor: "bg-teal-100",
  },
  partnership: {
    label: { en: "Partnership", es: "Asociación" },
    color: "text-green-700",
    bgColor: "bg-green-100",
  },
};

const POSTURE_ORDER: LaborRelationsPosture[] = [
  "adversarial",
  "contested",
  "neutral",
  "cooperative",
  "partnership",
];

/* ------------------------------------------------------------------ */
/*  Active Cases                                                       */
/* ------------------------------------------------------------------ */

export const LABOR_CASES: LaborCase[] = [
  // ── NEW APRIL 15, 2026 ────────────────────────────────────────────

  {
    id: "fhcsd-nlrb-case-21-ca-377502",
    title: {
      en: "Family Health Centers of San Diego — NLRB Case 21-CA-377502 Filed",
      es: "Family Health Centers of San Diego — Caso NLRB 21-CA-377502 Presentado",
    },
    summary: {
      en: "An NLRB case (21-CA-377502) has been opened against Family Health Centers of San Diego, the largest FQHC in San Diego County. Details of the alleged unfair labor practices are not yet public — the case is in regional investigation. Given FHCSD's scale (600+ providers, 400K+ patients), any enforcement action here would be a bellwether for San Diego FQHC labor relations.",
      es: "Se ha abierto un caso NLRB (21-CA-377502) contra Family Health Centers of San Diego, el FQHC más grande del Condado de San Diego. Los detalles de las supuestas prácticas laborales injustas aún no son públicos.",
    },
    caseType: "nlrb-complaint",
    status: "filed",
    posture: "adversarial",
    parties: {
      unions: ["TBD — pending case details"],
      employers: ["Family Health Centers of San Diego"],
      agencies: ["NLRB Region 21"],
    },
    region: "San Diego",
    impactLevel: "high",
    timeline: [
      { date: "2026-04-01", description: { en: "NLRB case 21-CA-377502 opened against FHCSD", es: "Caso NLRB 21-CA-377502 abierto contra FHCSD" }, sourceUrl: "https://www.nlrb.gov/case/21-CA-377502" },
    ],
    nextMilestone: { date: "2026-06-01", description: { en: "NLRB Region 21 investigation outcome expected", es: "Se espera el resultado de la investigación de la Región 21 del NLRB" } },
    affectedFqhcSlugs: ["family-health-centers-of-san-diego"],
    relatedUnionIds: [],
    relatedIntelIds: [],
    relatedAdvocacyIds: [],
    sourceUrl: "https://www.nlrb.gov/case/21-CA-377502",
    sourceOrg: "NLRB",
    additionalSources: [],
    tags: ["nlrb", "fhcsd", "san-diego", "unfair-labor-practice", "investigation"],
  },

  // ── CRITICAL ──────────────────────────────────────────────────────

  {
    id: "innercare-nlrb-forced-recognition",
    title: {
      en: "Innercare (Clinicas de Salud del Pueblo) — NLRB Forced Recognition Hearing",
      es: "Innercare (Clínicas de Salud del Pueblo) — Audiencia de Reconocimiento Forzado NLRB",
    },
    summary: {
      en: "The most serious NLRB enforcement action against a California FQHC. Despite workers voting 214-132 against SEIU-UHW in July 2024, the NLRB found 'egregious violations' including firing 11 workers and is seeking a bargaining order — forced recognition without a new election. ALJ hearing began March 17, 2026 in San Diego. CEO Yvonne Bell personally named. The outcome will set precedent for FQHC labor relations statewide.",
      es: "La acción de cumplimiento más seria del NLRB contra un FQHC de California. A pesar de que los trabajadores votaron 214-132 contra SEIU-UHW, el NLRB encontró 'violaciones atroces' incluyendo el despido de 11 trabajadores y busca un reconocimiento forzado. La audiencia comenzó el 17 de marzo de 2026.",
    },
    caseType: "nlrb-complaint",
    status: "hearing",
    posture: "adversarial",
    parties: {
      unions: ["SEIU-UHW"],
      employers: ["Innercare (Clinicas de Salud del Pueblo)"],
      agencies: ["NLRB Region 28"],
    },
    region: "Inland Empire",
    impactLevel: "critical",
    timeline: [
      { date: "2024-03-01", description: { en: "SEIU-UHW files NLRB organizing petition", es: "SEIU-UHW presenta petición de organización ante el NLRB" }, sourceUrl: null },
      { date: "2024-06-01", description: { en: "11 workers fired during organizing campaign", es: "11 trabajadores despedidos durante la campaña de organización" }, sourceUrl: "https://www.seiu-uhw.org/innercareulp/" },
      { date: "2024-07-15", description: { en: "Election held: 214-132 against union", es: "Elección realizada: 214-132 contra el sindicato" }, sourceUrl: null },
      { date: "2025-09-01", description: { en: "NLRB files formal complaint for 30+ ULPs", es: "NLRB presenta queja formal por 30+ prácticas laborales injustas" }, sourceUrl: "https://kyma.com/news/top-stories/2026/01/22/innercare-faces-federal-labor-complaint/" },
      { date: "2026-03-17", description: { en: "ALJ hearing begins in San Diego", es: "Audiencia del juez administrativo comienza en San Diego" }, sourceUrl: "https://www.thedesertreview.com/business/nlrb-complaint-against-innercare-sets-stage-for-2026-hearing-as-organization-denies-allegations/article_c29d43e5-c7fe-4095-8749-f7f4839010f8.html" },
    ],
    nextMilestone: { date: "2026-06-01", description: { en: "ALJ ruling expected", es: "Se espera el fallo del juez administrativo" } },
    affectedFqhcSlugs: ["clinicas-de-salud-del-pueblo"],
    relatedUnionIds: ["seiu-uhw"],
    relatedIntelIds: ["innercare-nlrb-forced-recognition-hearing-march-2026"],
    relatedAdvocacyIds: ["innercare-nlrb-forced-recognition-hearing"],
    sourceUrl: "https://www.thedesertreview.com/business/nlrb-complaint-against-innercare-sets-stage-for-2026-hearing-as-organization-denies-allegations/article_c29d43e5-c7fe-4095-8749-f7f4839010f8.html",
    sourceOrg: "Desert Review",
    additionalSources: [
      { title: "SEIU-UHW Innercare ULP page", url: "https://www.seiu-uhw.org/innercareulp/" },
      { title: "KYMA — Innercare faces federal complaint", url: "https://kyma.com/news/top-stories/2026/01/22/innercare-faces-federal-labor-complaint/" },
    ],
    tags: ["nlrb", "forced-recognition", "ulp", "imperial-county", "precedent-setting"],
  },
  {
    id: "seiu-uhw-90-percent-spending-mandate",
    title: {
      en: "SEIU-UHW 90% Spending Mandate Ballot Measure (#25-0008)",
      es: "SEIU-UHW Mandato de 90% de Gasto — Medida Electoral (#25-0008)",
    },
    summary: {
      en: "SEIU-UHW submitted signatures April 3 for Initiative #25-0008 requiring FQHCs to spend 90% of revenue on 'mission-related expenses.' A Berkeley Research Group study commissioned by Protect Patients CA finds this would redirect $1.7B from community health centers and push two-thirds into operating deficits. The 90% threshold would exclude spending on nurse/physician managers, translation services, enrollment navigators, transportation, community outreach, and new clinic construction. CMA, CPCA, CCALAC, AltaMed, and FHCSD lead the opposition.",
      es: "SEIU-UHW presentó firmas el 3 de abril para la Iniciativa #25-0008 que requiere que los FQHCs gasten el 90% de ingresos en 'gastos relacionados con la misión.' Un estudio del BRG estima que redirigiría $1.7B de los centros de salud y empujaría a dos tercios a déficits operativos.",
    },
    caseType: "ballot-measure",
    status: "signature-gathering",
    posture: "contested",
    parties: {
      unions: ["SEIU-UHW"],
      employers: ["CPCA", "CCALAC", "CMA", "AltaMed", "FHCSD", "United Health Centers"],
      agencies: ["CA Attorney General", "LAO"],
    },
    region: "California",
    impactLevel: "critical",
    timeline: [
      { date: "2025-07-01", description: { en: "Initiative #25-0008 enters circulation", es: "Iniciativa #25-0008 entra en circulación" }, sourceUrl: "https://www.sos.ca.gov/administration/news-releases-and-advisories/2025-news-releases-and-advisories/proposed-initiative-enters-circulation-requires-community-health-clinics-spend-90-percent-revenue-program-services-initiative-st" },
      { date: "2025-08-13", description: { en: "KVPR/Fresnoland report: both sides frame the measure", es: "Informe de KVPR/Fresnoland: ambos lados enmarcan la medida" }, sourceUrl: "https://fresnoland.org/2025/08/13/healthcare-initiative/" },
      { date: "2026-03-15", description: { en: "Berkeley Research Group publishes $1.7B impact study", es: "Berkeley Research Group publica estudio de impacto de $1.7B" }, sourceUrl: "https://protectpatientsca.com/faq/" },
      { date: "2026-04-03", description: { en: "SEIU-UHW submits signatures for verification", es: "SEIU-UHW presenta firmas para verificación" }, sourceUrl: "https://news.ballotpedia.org/2026/04/03/seiu-uhw-submits-signatures-for-california-ballot-initiatives-capping-executive-pay-and-requiring-clinics-to-spend-90-on-patient-care/" },
    ],
    nextMilestone: { date: "2026-06-25", description: { en: "Signature verification deadline", es: "Fecha límite de verificación de firmas" } },
    affectedFqhcSlugs: ["altamed-health-services", "family-health-centers-of-san-diego", "united-health-centers"],
    relatedUnionIds: ["seiu-uhw"],
    relatedIntelIds: ["seiu-uhw-ballot-signatures-submitted-april-2026", "seiu-fqhc-90-spend-brg-1-7b-impact-study"],
    relatedAdvocacyIds: ["seiu-uhw-90-percent-ballot-signatures-submitted"],
    sourceUrl: "https://news.ballotpedia.org/2026/04/03/seiu-uhw-submits-signatures-for-california-ballot-initiatives-capping-executive-pay-and-requiring-clinics-to-spend-90-on-patient-care/",
    sourceOrg: "Ballotpedia",
    additionalSources: [
      { title: "LAO Fiscal Analysis", url: "https://lao.ca.gov/BallotAnalysis/Initiative/2025-008" },
      { title: "Protect Patients CA FAQ", url: "https://protectpatientsca.com/faq/" },
      { title: "CMA Opposition Statement", url: "https://www.cmadocs.org/newsroom/news/view/ArticleId/51162/CMA-opposes-dangerous-ballot-measure-threatening-community-health-clinics" },
    ],
    tags: ["ballot-measure", "90-percent", "$1.7B", "protect-patients", "wrap-around-services"],
  },
  {
    id: "seiu-uhw-exec-pay-cap-450k",
    title: {
      en: "SEIU-UHW $450K Executive Pay Cap (#25-0009)",
      es: "SEIU-UHW Tope de $450K a Salarios Ejecutivos (#25-0009)",
    },
    summary: {
      en: "Companion measure to #25-0008 capping healthcare executive compensation at $450,000 with a 3.5% annual escalator. Submitted alongside the 90% spending mandate. Together, the two measures would fundamentally restructure how FQHCs allocate resources and compensate leadership.",
      es: "Medida complementaria a #25-0008 que limita la compensación ejecutiva a $450,000 con un escalador anual del 3.5%. Presentada junto con el mandato de gasto del 90%.",
    },
    caseType: "ballot-measure",
    status: "signature-gathering",
    posture: "contested",
    parties: {
      unions: ["SEIU-UHW"],
      employers: ["CPCA", "CMA", "California Hospital Association"],
      agencies: ["CA Attorney General"],
    },
    region: "California",
    impactLevel: "critical",
    timeline: [
      { date: "2026-04-03", description: { en: "Signatures submitted for verification", es: "Firmas presentadas para verificación" }, sourceUrl: "https://news.ballotpedia.org/2026/04/03/seiu-uhw-submits-signatures-for-california-ballot-initiatives-capping-executive-pay-and-requiring-clinics-to-spend-90-on-patient-care/" },
    ],
    nextMilestone: { date: "2026-06-25", description: { en: "Signature verification deadline", es: "Fecha límite de verificación de firmas" } },
    affectedFqhcSlugs: [],
    relatedUnionIds: ["seiu-uhw"],
    relatedIntelIds: ["seiu-uhw-ballot-signatures-submitted-april-2026"],
    relatedAdvocacyIds: ["seiu-uhw-90-percent-ballot-signatures-submitted"],
    sourceUrl: "https://news.ballotpedia.org/2026/04/03/seiu-uhw-submits-signatures-for-california-ballot-initiatives-capping-executive-pay-and-requiring-clinics-to-spend-90-on-patient-care/",
    sourceOrg: "Ballotpedia",
    additionalSources: [],
    tags: ["ballot-measure", "exec-pay-cap", "$450K", "companion-measure"],
  },

  // ── HIGH ───────────────────────────────────────────────────────────

  {
    id: "ca-billionaire-tax-act",
    title: {
      en: "California Billionaire Tax Act — $100B Healthcare Funding Ballot Drive",
      es: "Ley de Impuesto a Multimillonarios de California — Campaña Electoral de $100B para Salud",
    },
    summary: {
      en: "SEIU-UHW leads a ballot drive for a one-time 5% wealth tax on California's ~200 billionaires (~$2T combined wealth), projected to generate $100B over 5 years. 90% would fund healthcare programs. If passed, this could be the largest state-level healthcare funding mechanism in US history and would directly offset H.R. 1 Medicaid cuts. This is a rare case where SEIU and FQHCs have aligned interests — more healthcare funding benefits both workers and employers.",
      es: "SEIU-UHW lidera una campaña electoral para un impuesto del 5% sobre la riqueza de los ~200 multimillonarios de California, proyectado para generar $100B en 5 años. 90% financiaría programas de salud. Un caso raro donde SEIU y FQHCs tienen intereses alineados.",
    },
    caseType: "ballot-measure",
    status: "signature-gathering",
    posture: "contested",
    parties: {
      unions: ["SEIU-UHW"],
      employers: [],
      agencies: ["CA Attorney General"],
    },
    region: "California",
    impactLevel: "high",
    timeline: [
      { date: "2025-12-26", description: { en: "AG issues title and summary", es: "AG emite título y resumen" }, sourceUrl: null },
      { date: "2026-02-18", description: { en: "Campaign launches with Bernie Sanders endorsement", es: "Campaña se lanza con respaldo de Bernie Sanders" }, sourceUrl: "https://www.commondreams.org/news/ca-billionaire-tax" },
      { date: "2026-03-02", description: { en: "25% of required signatures collected", es: "25% de firmas requeridas recopiladas" }, sourceUrl: "https://news.ballotpedia.org/2026/03/02/campaign-behind-californias-wealth-tax-initiative-reports-collecting-25-of-the-required-signatures-to-qualify-for-2026-ballot/" },
      { date: "2026-04-09", description: { en: "CalMatters: Billionaire tax divides Democrats — CA Labor Federation declines to endorse, 5 Progressive Caucus members privately oppose", es: "CalMatters: Impuesto a multimillonarios divide a demócratas — Federación Laboral de CA no respalda, 5 miembros del Caucus Progresista se oponen en privado" }, sourceUrl: "https://calmatters.org/politics/2026/04/billionaire-tax-labor-divided/" },
    ],
    nextMilestone: { date: "2026-04-30", description: { en: "Signature collection deadline (Regan target)", es: "Fecha límite de recolección de firmas (objetivo de Regan)" } },
    affectedFqhcSlugs: [],
    relatedUnionIds: ["seiu-uhw"],
    relatedIntelIds: ["ca-billionaire-tax-act-100b-healthcare"],
    relatedAdvocacyIds: ["ca-billionaire-tax-act-100b-ballot"],
    sourceUrl: "https://www.seiu-uhw.org/ca-billionaire-tax-act/",
    sourceOrg: "SEIU-UHW",
    additionalSources: [
      { title: "Common Dreams — SEIU Billionaire Tax", url: "https://www.commondreams.org/news/ca-billionaire-tax" },
    ],
    tags: ["billionaire-tax", "$100B", "healthcare-funding", "aligned-interests"],
  },
  {
    id: "ahs-seiu-1021-layoff-crisis",
    title: {
      en: "Alameda Health System — SEIU 1021 Layoff & Contract Fight",
      es: "Sistema de Salud de Alameda — Lucha de Despidos y Contrato con SEIU 1021",
    },
    summary: {
      en: "AHS delivered 296 layoff notices on Christmas Eve 2025 (later reduced to 188) to SEIU 1021 members amid a $91.7M deficit. Cash projected to run out August 2026. SEIU 1021, CNA, and CIR interns are bargaining jointly. County supervisors deferred layoffs March 4 and created a working group. AHS operates 4 FQHC wellness centers serving 40,000+ patients — their closure would push patients to neighboring Bay Area FQHCs.",
      es: "AHS entregó 296 notificaciones de despido en Nochebuena de 2025 a miembros del SEIU 1021 en medio de un déficit de $91.7M. Se proyecta que el efectivo se agotará en agosto de 2026. Los sindicatos están negociando conjuntamente.",
    },
    caseType: "contract-negotiation",
    status: "negotiating",
    posture: "adversarial",
    parties: {
      unions: ["SEIU Local 1021", "CNA/NNU", "CIR (Committee of Interns and Residents)"],
      employers: ["Alameda Health System"],
      agencies: ["Alameda County Board of Supervisors"],
    },
    region: "Bay Area",
    impactLevel: "high",
    timeline: [
      { date: "2025-10-15", description: { en: "SEIU 1021 conducts 5-day ULP strike at AHS", es: "SEIU 1021 realiza huelga de 5 días por prácticas laborales injustas" }, sourceUrl: null },
      { date: "2025-12-24", description: { en: "AHS delivers 296 layoff notices on Christmas Eve", es: "AHS entrega 296 notificaciones de despido en Nochebuena" }, sourceUrl: "https://alamedapost.com/news/alameda-health-system-lay-off-300-massive-medicaid-cuts/" },
      { date: "2026-01-15", description: { en: "Layoffs scaled back to 188 positions", es: "Despidos reducidos a 188 posiciones" }, sourceUrl: null },
      { date: "2026-02-24", description: { en: "Highland Hospital rally — SEIU 1021 + CIR protest ICE presence, layoffs, and $7M+ executive bonuses", es: "Manifestación en Highland Hospital — SEIU 1021 + CIR protestan presencia de ICE, despidos y bonos ejecutivos de $7M+" }, sourceUrl: "https://www.indybay.org/newsitems/2026/02/24/18884421.php" },
      { date: "2026-03-04", description: { en: "County supervisors defer layoffs, create $91.7M working group", es: "Supervisores del condado aplazan despidos, crean grupo de trabajo de $91.7M" }, sourceUrl: "https://oaklandside.org/2026/03/04/alameda-health-system-layoffs-deferred-county-supervisors/" },
    ],
    nextMilestone: { date: "2026-08-01", description: { en: "AHS cash runout deadline if no resolution", es: "Fecha límite de agotamiento de efectivo de AHS si no hay resolución" } },
    affectedFqhcSlugs: ["alameda-health-system", "asian-health-services", "la-clinica-de-la-raza", "lifelong-medical-care"],
    relatedUnionIds: ["seiu-1021"],
    relatedIntelIds: ["ahs-layoffs-deferred-march-2026"],
    relatedAdvocacyIds: ["ahs-91m-working-group-layoffs-deferred"],
    sourceUrl: "https://oaklandside.org/2026/03/04/alameda-health-system-layoffs-deferred-county-supervisors/",
    sourceOrg: "Oaklandside",
    additionalSources: [
      { title: "SEIU 1021 — AHS page", url: "https://www.seiu1021.org/ahs" },
      { title: "Alameda Post — AHS layoffs", url: "https://alamedapost.com/news/alameda-health-system-lay-off-300-massive-medicaid-cuts/" },
    ],
    tags: ["layoffs", "contract", "financial-crisis", "cash-runout", "bay-area"],
  },
  {
    id: "imperial-beach-nuhw-provider-organizing",
    title: {
      en: "Imperial Beach Community Clinic — NUHW Provider-Led Organizing Win",
      es: "Clínica Comunitaria de Imperial Beach — Victoria de Organización Liderada por Proveedores NUHW",
    },
    summary: {
      en: "Physicians, therapists, and nurse practitioners voted to join NUHW in January 2026 — a rare provider-led organizing effort at an FQHC. Driven by 6 CEOs in 4 years, 28 layoffs in July 2025, and 18 provider departures in 2 years. Providers wrote a public op-ed citing burnout; management retaliation followed. This signals FQHC labor organizing is expanding beyond support staff to clinical providers.",
      es: "Médicos, terapeutas y enfermeros practicantes votaron para unirse a NUHW en enero de 2026 — un esfuerzo de organización liderado por proveedores raro en un FQHC. Impulsado por 6 CEOs en 4 años y 18 proveedores que se fueron en 2 años.",
    },
    caseType: "organizing-drive",
    status: "negotiating",
    posture: "contested",
    parties: {
      unions: ["NUHW"],
      employers: ["Imperial Beach Community Clinic"],
      agencies: [],
    },
    region: "San Diego",
    impactLevel: "medium",
    timeline: [
      { date: "2025-07-01", description: { en: "28 layoffs at IBCC; management instability accelerates", es: "28 despidos en IBCC; inestabilidad administrativa se acelera" }, sourceUrl: null },
      { date: "2025-11-01", description: { en: "Providers write public op-ed citing burnout and retaliation", es: "Proveedores escriben artículo de opinión público citando agotamiento y represalias" }, sourceUrl: null },
      { date: "2026-01-27", description: { en: "Physicians, therapists, NPs vote to join NUHW", es: "Médicos, terapeutas y enfermeros votan para unirse a NUHW" }, sourceUrl: "https://home.nuhw.org/2026/01/27/workers-at-imperial-beach-community-clinic-vote-to-join-nuhw/" },
    ],
    nextMilestone: { date: "2026-07-01", description: { en: "First contract negotiations expected", es: "Se esperan primeras negociaciones de contrato" } },
    affectedFqhcSlugs: ["imperial-beach-community-clinic"],
    relatedUnionIds: ["nuhw"],
    relatedIntelIds: ["imperial-beach-clinic-nuhw-physicians-organize-jan-2026"],
    relatedAdvocacyIds: [],
    sourceUrl: "https://home.nuhw.org/2026/01/27/workers-at-imperial-beach-community-clinic-vote-to-join-nuhw/",
    sourceOrg: "NUHW",
    additionalSources: [],
    tags: ["provider-organizing", "physicians", "nuhw", "burnout", "ceo-turnover"],
  },

  {
    id: "ab-1113-legislative-companion-90-percent",
    title: {
      en: "AB 1113: Legislative Companion to 90% Ballot Measure — Two-Pronged SEIU Strategy",
      es: "AB 1113: Acompañante Legislativo de la Medida Electoral del 90% — Estrategia de Dos Frentes del SEIU",
    },
    summary: {
      en: "AB 1113 pursues the same 90% mission-spend ratio through the legislature rather than the ballot box. FQHCs must report total revenues by June 30, 2026, using IRS Form 990 Line 25 (Column B, Part IX) as the basis. DHCS must adopt implementation methodology by January 1, 2027. Includes annual registration fees to fund enforcement. This is a two-pronged SEIU-UHW strategy: AB 1113 through the legislature + the ballot measure as backup/pressure. Opposition campaign active at stopab1113.com.",
      es: "AB 1113 busca la misma proporción de gasto del 90% a través de la legislatura. Los FQHCs deben reportar ingresos totales antes del 30 de junio de 2026. Es una estrategia de dos frentes del SEIU-UHW.",
    },
    caseType: "legislation",
    status: "hearing",
    posture: "contested",
    parties: {
      unions: ["SEIU-UHW"],
      employers: ["CPCA", "stopab1113.com coalition"],
      agencies: ["CA Legislature"],
    },
    region: "California",
    impactLevel: "high",
    timeline: [
      { date: "2025-02-01", description: { en: "AB 1113 introduced in CA Assembly", es: "AB 1113 presentada en la Asamblea de CA" }, sourceUrl: "https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260AB1113" },
    ],
    nextMilestone: { date: "2026-06-30", description: { en: "FQHCs must report total revenues to department", es: "FQHCs deben reportar ingresos totales al departamento" } },
    affectedFqhcSlugs: [],
    relatedUnionIds: ["seiu-uhw"],
    relatedIntelIds: [],
    relatedAdvocacyIds: ["seiu-uhw-90-percent-ballot-signatures-submitted"],
    sourceUrl: "https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260AB1113",
    sourceOrg: "CA Legislature",
    additionalSources: [
      { title: "StopAB1113 opposition campaign", url: "https://www.stopab1113.com/" },
    ],
    tags: ["ab-1113", "90-percent", "legislation", "form-990", "two-pronged-strategy"],
  },
  {
    id: "healthright-360-cba-expiring-2026",
    title: {
      en: "HealthRIGHT 360 — CBA Expiring 2026, ~700 Workers Across 3 SEIU Locals",
      es: "HealthRIGHT 360 — CBA Expira en 2026, ~700 Trabajadores en 3 Locales SEIU",
    },
    summary: {
      en: "HealthRIGHT 360's first CBA (ratified with 98% approval after 850+ workers organized in 2023) covers 2024-2026 and is nearing expiration. Renegotiations should be imminent or underway. Workers are represented by SEIU Locals 1021, 721, and 221. HealthRIGHT 360 is a major behavioral health and substance use treatment provider. The renegotiation will be a bellwether for FQHC labor relations — it was one of the largest single-organization FQHC organizing wins in California.",
      es: "El primer CBA de HealthRIGHT 360 (ratificado con 98% de aprobación) cubre 2024-2026 y está por expirar. La renegociación será un indicador para las relaciones laborales de FQHCs.",
    },
    caseType: "contract-negotiation",
    status: "negotiating",
    posture: "cooperative",
    parties: {
      unions: ["SEIU Local 1021", "SEIU Local 721", "SEIU Local 221"],
      employers: ["HealthRIGHT 360"],
      agencies: [],
    },
    region: "Bay Area",
    impactLevel: "medium",
    timeline: [
      { date: "2023-06-01", description: { en: "850+ workers organize with SEIU 1021", es: "850+ trabajadores se organizan con SEIU 1021" }, sourceUrl: null },
      { date: "2024-01-01", description: { en: "First CBA ratified with 98% approval", es: "Primer CBA ratificado con 98% de aprobación" }, sourceUrl: "https://www.seiu1021.org/healthright-360" },
    ],
    nextMilestone: { date: "2026-12-31", description: { en: "CBA expires — renegotiation expected", es: "CBA expira — se espera renegociación" } },
    affectedFqhcSlugs: ["healthright-360"],
    relatedUnionIds: ["seiu-1021"],
    relatedIntelIds: [],
    relatedAdvocacyIds: [],
    sourceUrl: "https://www.seiu1021.org/healthright-360",
    sourceOrg: "SEIU 1021",
    additionalSources: [],
    tags: ["contract-negotiation", "cba", "healthright-360", "behavioral-health", "bellwether"],
  },

  // ── MEDIUM ─────────────────────────────────────────────────────────

  {
    id: "kaiser-nuhw-mental-health-strike",
    title: {
      en: "Kaiser NUHW Mental Health Strike — FQHC Talent Pipeline Effects",
      es: "Huelga de Salud Mental Kaiser NUHW — Efectos en la Canalización de Talento de FQHCs",
    },
    summary: {
      en: "2,400 Kaiser mental health therapists (NUHW) struck March 18, 2026 across Bay Area, Central Valley, and Sacramento. Key issues: AI replacement fears, chronic understaffing, and Kaiser's $200M DMHC settlement. Kaiser's 21.5% raise from the Jan-Feb nursing strike sets a wage benchmark FQHCs cannot match, potentially widening the compensation gap. However, the AI replacement narrative could push BH professionals toward FQHCs where clinician autonomy is higher.",
      es: "2,400 terapeutas de salud mental de Kaiser (NUHW) hicieron huelga el 18 de marzo de 2026. El aumento del 21.5% de Kaiser establece un punto de referencia salarial que los FQHCs no pueden igualar, pero la narrativa de reemplazo por IA podría empujar a profesionales de salud conductual hacia FQHCs.",
    },
    caseType: "strike",
    status: "strike-active",
    posture: "contested",
    parties: {
      unions: ["NUHW"],
      employers: ["Kaiser Permanente"],
      agencies: ["DMHC"],
    },
    region: "California",
    impactLevel: "high",
    timeline: [
      { date: "2026-01-15", description: { en: "Kaiser nursing strike concludes with 21.5% raise", es: "Huelga de enfermería de Kaiser concluye con aumento del 21.5%" }, sourceUrl: null },
      { date: "2026-03-18", description: { en: "2,400 mental health therapists strike over AI fears + understaffing", es: "2,400 terapeutas hacen huelga por temores de IA y falta de personal" }, sourceUrl: "https://home.nuhw.org/2026/03/04/2400-kaiser-mental-health-therapists-to-strike-on-wednesday-march-18/" },
      { date: "2026-03-25", description: { en: "Bargaining stalemate continues — Kaiser refuses to withdraw AI replacement proposals", es: "Estancamiento en negociaciones continúa — Kaiser se niega a retirar propuestas de reemplazo por IA" }, sourceUrl: null },
      { date: "2026-04-07", description: { en: "NUHW members begin hunger strike at Kaiser LA Medical Center — strike now in 7th month", es: "Miembros de NUHW inician huelga de hambre en el Centro Médico Kaiser LA — huelga lleva 7 meses" }, sourceUrl: null },
    ],
    nextMilestone: { date: "2026-05-01", description: { en: "NUHW-Kaiser bargaining sessions TBD — no scheduled return to table", es: "Sesiones de negociación NUHW-Kaiser por determinar — sin fecha programada de regreso" } },
    affectedFqhcSlugs: [],
    relatedUnionIds: ["nuhw"],
    relatedIntelIds: [],
    relatedAdvocacyIds: [],
    sourceUrl: "https://home.nuhw.org/2026/03/04/2400-kaiser-mental-health-therapists-to-strike-on-wednesday-march-18/",
    sourceOrg: "NUHW",
    additionalSources: [
      { title: "KQED — Kaiser therapists strike", url: "https://www.kqed.org/news/12076753/northern-california-kaiser-therapists-hold-1-day-strike-over-ai-patient-care-concerns" },
    ],
    tags: ["kaiser", "mental-health", "strike", "ai-replacement", "talent-pipeline", "wage-benchmark"],
  },
  {
    id: "sb-525-minimum-wage-phase-in",
    title: {
      en: "SB 525 Healthcare Minimum Wage — Two-Tier Phase-In Creating FQHC Recruiting Disadvantage",
      es: "SB 525 Salario Mínimo de Salud — Implementación en Dos Niveles Crea Desventaja de Reclutamiento para FQHCs",
    },
    summary: {
      en: "SB 525 created a two-tier wage structure: hospitals and large health systems reached $25/hr in October 2024, while FQHCs are phased in more slowly ($21/hr now → $22/hr July 2026 → $25/hr July 2027). This 3-year gap creates a structural recruiting disadvantage during the worst workforce crisis in FQHC history. The July 2027 jump from $22 to $25/hr (a 14% increase in one year) is the real compliance cliff. Zero FQHC waivers have been approved by HCAI. SEIU negotiated the legislation — the slower FQHC timeline was a compromise to avoid small clinic closures.",
      es: "SB 525 creó una estructura salarial de dos niveles: los hospitales alcanzaron $25/hr en octubre de 2024, mientras que los FQHCs se implementan más lentamente ($21/hr ahora → $22/hr julio 2026 → $25/hr julio 2027). El salto de $22 a $25/hr en julio 2027 (14% de aumento en un año) es el verdadero precipicio de cumplimiento.",
    },
    caseType: "legislation",
    status: "resolved",
    posture: "cooperative",
    parties: {
      unions: ["SEIU-UHW", "SEIU Local 721", "SEIU Local 1021"],
      employers: ["CPCA", "California Hospital Association"],
      agencies: ["DIR (Department of Industrial Relations)"],
    },
    region: "California",
    impactLevel: "high",
    timeline: [
      { date: "2023-10-13", description: { en: "Governor Newsom signs SB 525", es: "Gobernador Newsom firma SB 525" }, sourceUrl: null },
      { date: "2024-10-01", description: { en: "Large health systems reach $25/hr", es: "Grandes sistemas de salud alcanzan $25/hr" }, sourceUrl: null },
      { date: "2026-07-01", description: { en: "FQHCs reach $22/hr", es: "FQHCs alcanzan $22/hr" }, sourceUrl: "https://www.dir.ca.gov/dlse/Health-Care-Worker-Minimum-Wage-FAQ.htm" },
      { date: "2027-07-01", description: { en: "FQHCs reach $25/hr (parity with hospitals) — 14% jump in one year", es: "FQHCs alcanzan $25/hr (paridad con hospitales) — salto del 14% en un año" }, sourceUrl: null },
    ],
    nextMilestone: { date: "2026-07-01", description: { en: "FQHC minimum wage increases to $22/hr", es: "Salario mínimo de FQHCs aumenta a $22/hr" } },
    affectedFqhcSlugs: [],
    relatedUnionIds: ["seiu-uhw", "seiu-1021"],
    relatedIntelIds: [],
    relatedAdvocacyIds: [],
    sourceUrl: "https://www.dir.ca.gov/dlse/Health-Care-Worker-Minimum-Wage-FAQ.htm",
    sourceOrg: "CA DIR",
    additionalSources: [
      { title: "UC Berkeley Labor Center analysis", url: "https://laborcenter.berkeley.edu/ca-health-care-minimum-wage-new-estimates-feb2024/" },
    ],
    tags: ["sb-525", "minimum-wage", "two-tier", "recruiting-disadvantage", "phase-in"],
  },

  // ── Daily Update #26 (2026-04-09) ──────────────────────────────

  {
    id: "community-medical-centers-nlrb-bad-faith",
    title: {
      en: "Community Medical Centers (Stockton) — NLRB Bad-Faith Bargaining Complaint",
      es: "Community Medical Centers (Stockton) — Queja de Negociación de Mala Fe ante NLRB",
    },
    summary: {
      en: "NLRB Case 32-CA-377500 filed December 17, 2025. Union alleges 8(a)(5) bad-faith bargaining and 8(a)(3) retaliation against Community Medical Centers in Stockton. First FQHC bad-faith bargaining complaint in the Central Valley. CMC operates multiple clinic sites serving San Joaquin County. Case is in the investigation phase with NLRB Region 32 (Oakland). If sustained, could result in mandatory bargaining order and back-pay remedies.",
      es: "Caso NLRB 32-CA-377500 presentado el 17 de diciembre de 2025. Sindicato alega negociación de mala fe 8(a)(5) y represalias 8(a)(3) contra Community Medical Centers en Stockton. Primera queja de mala fe contra un FQHC en el Valle Central.",
    },
    caseType: "nlrb-complaint",
    status: "filed",
    posture: "adversarial",
    parties: {
      unions: ["Unknown — filing union not specified in public records"],
      employers: ["Community Medical Centers"],
      agencies: ["NLRB Region 32 (Oakland)"],
    },
    region: "Central Valley",
    impactLevel: "medium",
    timeline: [
      { date: "2025-12-17", description: { en: "NLRB Case 32-CA-377500 filed — 8(a)(5) bad-faith bargaining + 8(a)(3) retaliation charges", es: "Caso NLRB 32-CA-377500 presentado — cargos de negociación de mala fe 8(a)(5) + represalias 8(a)(3)" }, sourceUrl: "https://www.nlrb.gov/case/32-CA-377500" },
    ],
    nextMilestone: { date: "2026-06-01", description: { en: "NLRB Region 32 investigation — hearing date TBD", es: "Investigación de la Región 32 del NLRB — fecha de audiencia por determinar" } },
    affectedFqhcSlugs: ["community-medical-centers"],
    relatedUnionIds: [],
    relatedIntelIds: [],
    relatedAdvocacyIds: [],
    sourceUrl: "https://www.nlrb.gov/case/32-CA-377500",
    sourceOrg: "NLRB",
    additionalSources: [],
    tags: ["nlrb", "bad-faith-bargaining", "retaliation", "central-valley", "stockton", "cmc"],
  },
  {
    id: "st-johns-seiu-721-contract-ratification-2026",
    title: {
      en: "St. John's Community Health + SEIU 721: $30/hr Minimum Wage — New SoCal FQHC Benchmark",
      es: "St. John's Community Health + SEIU 721: Salario Mínimo de $30/hr — Nuevo Referente de FQHC en SoCal",
    },
    summary: {
      en: "SEIU 721 and St. John's Community Health reached a tentative 3-year CBA with an industry-leading $30/hr minimum wage (up from $25 — a 20% increase), a new longevity tier, Juneteenth as a paid holiday, and increased vacation flexibility. The bargaining team unanimously recommended ratification; the vote occurred early April 2026. St. John's (24 sites + 4 mobile clinics) has maintained a cooperative union relationship for 15+ years. The $30/hr floor is the first confirmed at any California FQHC, setting a benchmark that will pressure other LA-area FQHCs with SEIU representation — particularly as SB 525 raises the FQHC minimum to $22/hr in July 2026 and $25/hr in July 2027.",
      es: "SEIU 721 y St. John's Community Health alcanzaron un CBA tentativo de 3 años con salario mínimo de $30/hr (aumento del 20% desde $25), nuevo nivel de antigüedad y Juneteenth como día festivo pagado. Es el primer $30/hr confirmado en un FQHC de California — establece un referente que presionará a otros FQHCs del área de LA con representación de SEIU.",
    },
    caseType: "contract-negotiation",
    status: "resolved",
    posture: "partnership",
    parties: {
      unions: ["SEIU Local 721"],
      employers: ["St. John's Community Health"],
      agencies: [],
    },
    region: "Los Angeles",
    impactLevel: "high",
    timeline: [
      { date: "2026-03-31", description: { en: "Tentative agreement announced — bargaining team unanimously recommends yes", es: "Acuerdo tentativo anunciado — equipo de negociación recomienda aprobación por unanimidad" }, sourceUrl: "https://www.seiu721.org/2026/03/2026-st-johns-community-health-contract-vote.php" },
      { date: "2026-04-07", description: { en: "Ratification vote held (estimated early April); contract effective July 2026 (estimated)", es: "Votación de ratificación realizada (estimado inicio de abril); contrato efectivo julio 2026 (estimado)" }, sourceUrl: "https://www.seiu721.org/2026/03/2026-st-johns-community-health-contract-vote.php" },
    ],
    nextMilestone: { date: "2026-07-01", description: { en: "Contract implementation — $30/hr minimum wage takes effect (estimated)", es: "Implementación del contrato — salario mínimo de $30/hr entra en vigor (estimado)" } },
    affectedFqhcSlugs: ["st-johns-community-health"],
    relatedUnionIds: ["seiu-721"],
    relatedIntelIds: [],
    relatedAdvocacyIds: [],
    sourceUrl: "https://www.seiu721.org/2026/03/2026-st-johns-community-health-contract-vote.php",
    sourceOrg: "SEIU 721",
    additionalSources: [],
    tags: ["seiu-721", "contract-ratification", "30-dollar-minimum-wage", "los-angeles", "st-johns", "partnership", "sb-525", "benchmark"],
  },
  {
    id: "ahs-seiu-1021-contract-expiration-june-2026",
    title: {
      en: "Asian Health Services CBA Expires June 30, 2026 — Contract Renewal at Financially Distressed FQHC",
      es: "Convenio Colectivo de Asian Health Services Vence el 30 de Junio de 2026 — Renovación en FQHC con Crisis Financiera",
    },
    summary: {
      en: "Asian Health Services' General Unit and Specialty Mental Health Unit CBAs with SEIU Local 1021 both expire June 30, 2026. This creates a dangerous compounded crisis: AHS faces a projected August 2026 cash runout (tracked in `ahs-seiu-1021-layoff-crisis`), and its $91.7M deficit makes it nearly impossible to offer meaningful wage increases. SEIU 1021 won an historic 21% average raise in the 2023 contract — management cannot credibly repeat that. If AHS undergoes merger or acquisition, SEIU 1021 successor clause rights become the central legal issue. Bargaining should begin by April–May 2026 if it has not already.",
      es: "Los convenios colectivos de AHS con SEIU 1021 vencen el 30 de junio de 2026, justo cuando AHS enfrenta agotamiento de efectivo proyectado para agosto. El déficit de $91.7M hace imposible aumentos salariales significativos. Si AHS se fusiona, los derechos de cláusula sucesoria de SEIU 1021 son el problema legal central.",
    },
    caseType: "contract-negotiation",
    status: "negotiating",
    posture: "neutral",
    parties: {
      unions: ["SEIU Local 1021"],
      employers: ["Asian Health Services"],
      agencies: [],
    },
    region: "Bay Area",
    impactLevel: "high",
    timeline: [
      { date: "2023-01-01", description: { en: "Current 2023–2026 CBA ratified — included 21% average wage increase", es: "CBA 2023-2026 ratificado — incluyó aumento salarial promedio del 21%" }, sourceUrl: "https://www.seiu1021.org/asian-health-services" },
      { date: "2026-06-30", description: { en: "Contract expiration — bargaining must begin", es: "Vencimiento del contrato — negociaciones deben comenzar" }, sourceUrl: "https://www.seiu1021.org/asian-health-services" },
    ],
    nextMilestone: { date: "2026-06-30", description: { en: "Contract expiration — if no new agreement, workers may be on expired contract while FQHC faces August cash runout", es: "Vencimiento del contrato — sin nuevo acuerdo, trabajadores continuarían bajo contrato vencido mientras FQHC enfrenta agotamiento de efectivo en agosto" } },
    affectedFqhcSlugs: ["asian-health-services"],
    relatedUnionIds: ["seiu-1021"],
    relatedIntelIds: [],
    relatedAdvocacyIds: [],
    sourceUrl: "https://www.seiu1021.org/asian-health-services",
    sourceOrg: "SEIU 1021",
    additionalSources: [],
    tags: ["seiu-1021", "contract-expiration", "asian-health-services", "bay-area", "financial-distress", "successor-clause", "june-2026"],
  },
  {
    id: "ab-288-perb-private-sector-jurisdiction",
    title: {
      en: "AB 288 (CA PERB Private-Sector Backstop) Partially Enjoined — Appeal Determines FQHC Labor Enforcement Fallback",
      es: "AB 288 (Respaldo del PERB de CA para Sector Privado) Parcialmente Restringido — Apelación Determina Alternativa de Aplicación Laboral para FQHCs",
    },
    summary: {
      en: "Governor Newsom signed AB 288 in September 2025 to allow California's PERB to process unfair labor practice charges and conduct union elections for private-sector employers — including FQHCs — when the NLRB cannot act, lacks a quorum, or faces significant delays. A federal judge issued a partial preliminary injunction on December 26, 2025, blocking PERB from stepping in for cases where the NLRB is merely delayed or lacks a quorum (on federal preemption grounds). The law is on appeal to the 9th Circuit. If AB 288 survives appeal, California can enforce labor law at FQHCs even if the NLRB is defunded or paralyzed under the current federal administration — a critical backstop for organizing drives like Innercare. If struck down, FQHCs facing organizing would have reduced oversight.",
      es: "AB 288 permite al PERB de California procesar cargos de prácticas laborales injustas y realizar elecciones sindicales para empleadores privados (incluidos FQHCs) cuando el NLRB no pueda actuar. Un juez federal emitió una medida cautelar parcial el 26 de diciembre de 2025; la ley está en apelación ante el 9no Circuito. Si sobrevive, California puede aplicar la ley laboral en FQHCs incluso si el NLRB federal es paralizado.",
    },
    caseType: "legislation",
    status: "appealed",
    posture: "contested",
    parties: {
      unions: ["California Labor Federation", "SEIU"],
      employers: ["CA Chamber of Commerce (opposing)"],
      agencies: ["PERB", "NLRB", "9th Circuit Court of Appeals"],
    },
    region: "California",
    impactLevel: "high",
    timeline: [
      { date: "2025-09-01", description: { en: "Governor Newsom signs AB 288 — PERB private-sector jurisdiction law", es: "Gobernador Newsom firma AB 288 — ley de jurisdicción del PERB para sector privado" }, sourceUrl: "https://calemploymentlawupdate.proskauer.com/2026/01/halted-federal-judge-blocks-enforcement-of-californias-newly-enacted-labor-law/" },
      { date: "2025-12-26", description: { en: "Federal court issues partial preliminary injunction blocking PERB from acting when NLRB is merely delayed or lacks quorum", es: "Tribunal federal emite medida cautelar preliminar parcial que impide al PERB actuar cuando el NLRB solo tiene demoras o falta quórum" }, sourceUrl: "https://calemploymentlawupdate.proskauer.com/2026/01/halted-federal-judge-blocks-enforcement-of-californias-newly-enacted-labor-law/" },
    ],
    nextMilestone: { date: "2026-12-31", description: { en: "9th Circuit appeal ruling (date TBD) — determines whether CA can enforce labor law at FQHCs if NLRB is weakened", es: "Fallo de apelación del 9no Circuito (fecha por determinar) — determina si CA puede aplicar la ley laboral en FQHCs si el NLRB es debilitado" } },
    affectedFqhcSlugs: [],
    relatedUnionIds: [],
    relatedIntelIds: [],
    relatedAdvocacyIds: [],
    sourceUrl: "https://calemploymentlawupdate.proskauer.com/2026/01/halted-federal-judge-blocks-enforcement-of-californias-newly-enacted-labor-law/",
    sourceOrg: "California Employment Law Update (Proskauer)",
    additionalSources: [],
    tags: ["ab-288", "perb", "nlrb", "private-sector", "jurisdiction", "injunction", "9th-circuit", "appeal", "statewide"],
  },
];

/* ------------------------------------------------------------------ */
/*  Landscape Analysis Themes                                          */
/* ------------------------------------------------------------------ */

export const LANDSCAPE_THEMES: LandscapeTheme[] = [
  {
    id: "90-percent-mandate-threatens-services",
    title: {
      en: "The 90% Spending Mandate Threatens Wrap-Around Services",
      es: "El Mandato de 90% de Gasto Amenaza los Servicios Integrales",
    },
    analysis: {
      en: "The SEIU-UHW ballot measure (#25-0008) would require FQHCs to spend 90% of annual revenue on 'mission-related expenses.' The Berkeley Research Group estimates this would redirect $1.7 billion from community health centers and push two-thirds into operating deficits. The critical question is what counts as 'mission-related.' If the AG's definition excludes nurse managers, translation services, enrollment navigators, transportation, community outreach, and capital investment for new clinics, FQHCs would be forced to cut precisely the wrap-around services that distinguish them from regular medical offices. United Health Centers (SJV) reported $180M expenses with a $25M surplus in 2023 — SEIU uses numbers like this to argue clinics have room to redirect. But FQHC leaders counter that reserves are essential for surviving Medicaid cuts and maintaining the 90-day cash cushion that federal funders expect.",
      es: "La medida electoral del SEIU-UHW requeriría que los FQHCs gasten el 90% de ingresos en 'gastos relacionados con la misión.' El BRG estima que redirigiría $1.7 mil millones. La pregunta crítica es qué cuenta como 'relacionado con la misión.' Si se excluyen navegadores, transporte, alcance comunitario e inversión de capital, los FQHCs se verían forzados a recortar los servicios integrales que los distinguen.",
    },
    posture: "contested",
    impactLevel: "critical",
    keyDataPoints: [
      { en: "BRG: $1.7B redirected from FQHCs if passed", es: "BRG: $1.7B redirigidos de FQHCs si se aprueba" },
      { en: "Two-thirds of CA health centers would face operating deficits", es: "Dos tercios de centros de salud de CA enfrentarían déficits operativos" },
      { en: "LAO: enforcement costs 'up to low tens of millions annually'", es: "LAO: costos de cumplimiento 'hasta decenas de millones bajos anualmente'" },
      { en: "546,651 valid signatures required; deadline June 25, 2026", es: "Se requieren 546,651 firmas válidas; fecha límite 25 de junio de 2026" },
      { en: "Average FQHC CEO total compensation: $281K (Element One, n=1,145 FQHCs)", es: "Compensación total promedio de CEO de FQHC: $281K (Element One, n=1,145 FQHCs)" },
      { en: "Only 2.6% of FQHCs report all elements of best-practice CEO compensation governance", es: "Solo 2.6% de FQHCs reportan todos los elementos de gobernanza de compensación de CEO como mejor práctica" },
      { en: "AHS distributed $7M+ in executive bonuses while planning layoffs — SEIU cites as evidence", es: "AHS distribuyó $7M+ en bonos ejecutivos mientras planificaba despidos — SEIU lo cita como evidencia" },
    ],
    sources: [
      { title: "Protect Patients CA / BRG Study", url: "https://protectpatientsca.com/faq/" },
      { title: "LAO Fiscal Analysis #25-0008", url: "https://lao.ca.gov/BallotAnalysis/Initiative/2025-008" },
      { title: "Fresnoland — Healthcare Initiative Controversy", url: "https://fresnoland.org/2025/08/13/healthcare-initiative/" },
    ],
    relatedCaseIds: ["seiu-uhw-90-percent-spending-mandate", "seiu-uhw-exec-pay-cap-450k"],
  },
  {
    id: "provider-organizing-new-frontier",
    title: {
      en: "Provider-Led Organizing Is a New Frontier",
      es: "La Organización Liderada por Proveedores Es una Nueva Frontera",
    },
    analysis: {
      en: "The Imperial Beach Community Clinic NUHW win in January 2026 was driven by physicians, therapists, and nurse practitioners — not the MAs and front desk staff who typically form the first bargaining units. This is historically rare at FQHCs and signals a potential wave. When providers organize, the dynamics change: they hold more leverage (harder to replace), the public narrative shifts (doctors organizing is news), and the underlying issues tend to be governance and clinical autonomy rather than wages alone. IBCC's 6 CEOs in 4 years and 18 provider departures in 2 years represent a governance failure that unions can credibly address through contract stability clauses.",
      es: "La victoria de NUHW en Imperial Beach en enero de 2026 fue impulsada por médicos y terapeutas, no por el personal de apoyo que típicamente forma las primeras unidades de negociación. Cuando los proveedores se organizan, las dinámicas cambian: tienen más influencia y los problemas subyacentes tienden a ser de gobernanza y autonomía clínica.",
    },
    posture: "contested",
    impactLevel: "medium",
    keyDataPoints: [
      { en: "6 CEOs in 4 years at IBCC drove providers to organize", es: "6 CEOs en 4 años en IBCC llevó a proveedores a organizarse" },
      { en: "18 providers departed in 2 years before the NUHW win", es: "18 proveedores se fueron en 2 años antes de la victoria de NUHW" },
      { en: "NUHW expanding into Central Coast + Central Valley (3 wins in March 2026)", es: "NUHW expandiéndose al Costa Central + Valle Central (3 victorias en marzo 2026)" },
    ],
    sources: [
      { title: "NUHW — Imperial Beach Organizing Win", url: "https://home.nuhw.org/2026/01/27/workers-at-imperial-beach-community-clinic-vote-to-join-nuhw/" },
    ],
    relatedCaseIds: ["imperial-beach-nuhw-provider-organizing"],
  },
  {
    id: "sb525-two-tier-wage-structure",
    title: {
      en: "SB 525 Creates a Two-Tier Wage Structure",
      es: "SB 525 Crea una Estructura Salarial de Dos Niveles",
    },
    analysis: {
      en: "Hospitals and large health systems reached $25/hr in October 2024. FQHCs are phased in more slowly: $21/hr through June 2026, $23/hr starting July 2026, and $25/hr not until July 2028. This 2-4 year gap creates a structural recruiting disadvantage during the worst workforce crisis in FQHC history. An MA can earn $4/hr more walking across the street to a hospital. The irony is that SEIU negotiated this legislation — the slower FQHC timeline was a compromise to avoid small clinic closures — but it means the union's own members at FQHCs earn less than their hospital counterparts for years. This creates organizing pressure: SEIU can point to the wage gap as evidence that FQHC management isn't paying competitive wages, even though the slower schedule was designed to protect FQHC financial viability.",
      es: "Los hospitales alcanzaron $25/hr en octubre de 2024. Los FQHCs se implementan más lentamente: $21/hr hasta junio 2026, $23/hr desde julio 2026, y $25/hr hasta julio 2028. Esta brecha de 2-4 años crea una desventaja estructural de reclutamiento. Un MA puede ganar $4/hr más cruzando la calle a un hospital.",
    },
    posture: "cooperative",
    impactLevel: "high",
    keyDataPoints: [
      { en: "Hospitals: $25/hr since October 2024", es: "Hospitales: $25/hr desde octubre 2024" },
      { en: "FQHCs: $21/hr now → $22/hr July 2026 → $25/hr July 2027", es: "FQHCs: $21/hr ahora → $22/hr julio 2026 → $25/hr julio 2027" },
      { en: "July 2027: 14% jump ($22→$25) in one year — the compliance cliff", es: "Julio 2027: salto del 14% ($22→$25) en un año — el precipicio de cumplimiento" },
      { en: "Zero FQHC waivers approved by HCAI as of April 2026", es: "Cero exenciones de FQHCs aprobadas por HCAI a abril de 2026" },
    ],
    sources: [
      { title: "DIR SB 525 FAQ", url: "https://www.dir.ca.gov/dlse/Health-Care-Worker-Minimum-Wage-FAQ.htm" },
      { title: "UC Berkeley Labor Center Analysis", url: "https://laborcenter.berkeley.edu/ca-health-care-minimum-wage-new-estimates-feb2024/" },
    ],
    relatedCaseIds: ["sb-525-minimum-wage-phase-in"],
  },
  {
    id: "lmcc-partnership-model-works",
    title: {
      en: "The LMCC Model Shows Partnership Works",
      es: "El Modelo LMCC Demuestra que la Asociación Funciona",
    },
    analysis: {
      en: "The SEIU-Community Clinics Partnership is a statewide labor-management cooperation committee (LMCC) between FQHC employers and SEIU locals, funded through the California Workforce Development Board. It has trained 3,000+ incumbent workers and new entrants for nursing, MA, dental assistant, CHW, and behavioral health roles. The partnership won $13.3M in High-Road Training Partnership funding and secured $1,000 retention bonuses for 70,000 clinic workers through AB 204/SB 121 in 2023. This is the 'high-road' model where unions and management collaborate on workforce development instead of fighting over revenue allocation. It is the strongest counter-example to the adversarial dynamics dominating headlines.",
      es: "La Asociación SEIU-Clínicas Comunitarias es un comité de cooperación laboral-gerencial estatal que ha capacitado a 3,000+ trabajadores en roles de enfermería, MA, CHW y salud conductual. Ganó $13.3M en financiamiento de capacitación. Es el modelo productivo donde sindicatos y gerencia colaboran en vez de pelear por la distribución de ingresos.",
    },
    posture: "partnership",
    impactLevel: "high",
    keyDataPoints: [
      { en: "3,000+ workers trained through LMCC pipeline", es: "3,000+ trabajadores capacitados a través de la canalización LMCC" },
      { en: "$13.3M in CWDB HRTP funding across 7 FQHCs: AHS, Clinica Romero, Gardner, HealthRIGHT 360, St. John's, West Oakland HC, Baywell Health", es: "$13.3M en financiamiento CWDB HRTP en 7 FQHCs: AHS, Clínica Romero, Gardner, HealthRIGHT 360, St. John's, West Oakland HC, Baywell Health" },
      { en: "$1,000 retention bonuses for 70,000 clinic workers (AB 204/SB 121)", es: "Bonos de retención de $1,000 para 70,000 trabajadores de clínicas (AB 204/SB 121)" },
      { en: "SEIU Locals 521, 721, 1021, UHW participate; administered by Shirley Ware Education Fund", es: "Locales SEIU 521, 721, 1021, UHW participan; administrado por Fondo Educativo Shirley Ware" },
    ],
    sources: [
      { title: "SEIU Community Clinics Partnership", url: "https://seiuclinicspartnership.org/" },
      { title: "CWDB High-Road Program Brief", url: "https://cwdb.ca.gov/wp-content/uploads/sites/43/2024/11/Shirley-Ware.SEIU-Community-Clinics_ACCESSIBLE.pdf" },
    ],
    relatedCaseIds: [],
  },
  {
    id: "union-density-low-but-strategic",
    title: {
      en: "Union Density Is Low (6%) but Strategically Concentrated",
      es: "La Densidad Sindical Es Baja (6%) pero Estratégicamente Concentrada",
    },
    analysis: {
      en: "Approximately 19 of 214 California FQHCs are unionized (~9%), dramatically lower than hospital union density (20-30%+). But the unionized FQHCs include some of the largest and most visible: AltaMed (3,500+ staff, Fortune 100 Best), La Clinica de la Raza (15 sites), Asian Health Services (historic 21% raise 2023), and Alameda Health System (800+ SEIU members). The SEIU Community Clinic Workers United campaign is explicitly trying to increase this ratio. NUHW is expanding geographically into Central Coast and Central Valley. The combination of the 90% ballot measure and the Innercare NLRB case creates a two-front pressure: political (ballot box) and legal (NLRB enforcement). FQHCs that proactively improve working conditions may avoid organizing drives entirely.",
      es: "Aproximadamente 19 de 214 FQHCs de California están sindicalizados (~9%), dramáticamente más bajo que la densidad sindical de hospitales (20-30%+). Pero los FQHCs sindicalizados incluyen algunos de los más grandes y visibles. La campaña SEIU Community Clinic Workers United busca explícitamente aumentar esta proporción.",
    },
    posture: "neutral",
    impactLevel: "medium",
    keyDataPoints: [
      { en: "19 of 214 CA FQHCs unionized (~9%)", es: "19 de 214 FQHCs de CA sindicalizados (~9%)" },
      { en: "Hospital union density: 20-30%+ in California", es: "Densidad sindical de hospitales: 20-30%+ en California" },
      { en: "AltaMed (SEIU-UHW): largest unionized FQHC (3,500+ staff)", es: "AltaMed (SEIU-UHW): FQHC sindicalizado más grande (3,500+ personal)" },
      { en: "NUHW expanding into Central Coast + Central Valley (3 new wins March 2026)", es: "NUHW expandiéndose al Costa Central + Valle Central (3 nuevas victorias marzo 2026)" },
    ],
    sources: [
      { title: "SEIU Community Clinic Workers United", url: "https://seiuclinicworkers.org/" },
    ],
    relatedCaseIds: ["innercare-nlrb-forced-recognition", "imperial-beach-nuhw-provider-organizing"],
  },
  {
    id: "exec-comp-governance-gap",
    title: {
      en: "The Executive Compensation Debate: $1.9M CEOs, $450K Caps, and the Governance Gap",
      es: "El Debate de Compensación Ejecutiva: CEOs de $1.9M, Topes de $450K y la Brecha de Gobernanza",
    },
    analysis: {
      en: "FQHC executive compensation ranges from ~$200K at small rural clinics to $1.94M at AltaMed (CEO Castulo de la Rocha, on $1.48B revenue — 0.13% comp/revenue ratio). The proposed $450K ballot cap would affect roughly 6-10 of California's ~220 FQHCs. The NACHC median is $254K nationally. SEIU's strongest case study is Borrego Health: CEO Bruce Hebets received $1.9M (including a retirement gift), followed by an FBI raid, Medi-Cal suspension, bankruptcy, and 82,000 patients losing care. The industry counters that competitive compensation is needed to recruit leaders who manage $100M-$1.5B operations in the most complex healthcare environment. Only 2.6% of FQHCs report all elements of best-practice CEO compensation governance — the real issue may not be how much CEOs earn, but whether boards have adequate oversight of how compensation decisions are made.",
      es: "La compensación ejecutiva en FQHCs varía desde ~$200K en clínicas rurales pequeñas hasta $1.94M en AltaMed. El tope propuesto de $450K afectaría a ~6-10 de los ~220 FQHCs de California. La mediana de NACHC es $254K nacionalmente. Solo el 2.6% de FQHCs reportan todos los elementos de gobernanza de compensación como mejor práctica.",
    },
    posture: "contested",
    impactLevel: "high",
    keyDataPoints: [
      { en: "AltaMed CEO: $1.94M on $1.48B revenue (0.13% comp/rev ratio)", es: "CEO de AltaMed: $1.94M sobre $1.48B en ingresos (0.13% ratio comp/rev)" },
      { en: "FHCSD CEO Fran Butler-Cohen: $914K", es: "CEO de FHCSD Fran Butler-Cohen: $914K" },
      { en: "UHC CEO (former): ~$1.2M while entry-level workers earned ~$16/hr", es: "CEO de UHC (anterior): ~$1.2M mientras trabajadores de nivel inicial ganaban ~$16/hr" },
      { en: "Clinica Sierra Vista CEO Stephen Schilling: $421K on $135M revenue", es: "CEO de Clinica Sierra Vista Stephen Schilling: $421K sobre $135M en ingresos" },
      { en: "NACHC national median CEO total comp: $254K (Element One, n=1,145)", es: "Mediana nacional de compensación total de CEO de FQHC: $254K (Element One, n=1,145)" },
      { en: "Only 2.6% of FQHCs have best-practice CEO compensation governance", es: "Solo 2.6% de FQHCs tienen gobernanza de compensación de CEO como mejor práctica" },
      { en: "Borrego Health: $1.9M CEO payout → FBI raid → bankruptcy → 82K patients lost care", es: "Borrego Health: pago de $1.9M a CEO → redada del FBI → bancarrota → 82K pacientes perdieron atención" },
      { en: "AHS distributed $7M+ in executive bonuses while planning 296 layoffs", es: "AHS distribuyó $7M+ en bonos ejecutivos mientras planificaba 296 despidos" },
    ],
    sources: [
      { title: "Element One FQHC Form 990 Database", url: "https://elementoneconsulting.com/fqhc-form990-survey" },
      { title: "ProPublica Nonprofit Explorer — AltaMed", url: "https://projects.propublica.org/nonprofits/organizations/953765391" },
      { title: "Business Journal — Valley Leaders Oppose Cap", url: "https://thebusinessjournal.com/proposal-to-cap-admin-pay-mandate-patient-spending-levels-draws-fire-from-local-health-leaders/" },
      { title: "NACHC 2025 Salary & Benefits Report", url: "https://www.nachc.org/product/2025-health-center-salary-benefits-report/" },
    ],
    relatedCaseIds: ["seiu-uhw-exec-pay-cap-450k", "seiu-uhw-90-percent-spending-mandate"],
  },
  {
    id: "seiu-cpca-cooperation-conflict-cycle",
    title: {
      en: "The SEIU-CPCA Cycle: Allies on Prop 35, Enemies on the 90% Mandate",
      es: "El Ciclo SEIU-CPCA: Aliados en Prop 35, Enemigos en el Mandato del 90%",
    },
    analysis: {
      en: "SEIU-UHW and CPCA were literally in the same coalition on Prop 35 (November 2024, passed — made the Medi-Cal provider tax permanent). Nine months later, SEIU filed the 90% spending ballot measure (August 2025). They also cooperated on AB 204 ($70M retention bonuses, 2022-2023), the $13.3M CWDB training partnership, and SB 525 (where FQHCs negotiated a slower phase-in). The speed of the break is remarkable. SEIU follows the same playbook used against dialysis companies (3 failed measures, 2018-2022, $37M SEIU spent, $216M+ industry spent to defeat). FQHC leaders see the 90% measure through this lens — as organizing leverage, not genuine reform. But SEIU counters that clinics spending 57% on patient care need accountability. The shared interest in opposing H.R. 1 Medicaid cuts could be the basis for rebuilding the relationship — if either side is willing to negotiate.",
      es: "SEIU-UHW y CPCA estaban literalmente en la misma coalición en Prop 35 (noviembre 2024). Nueve meses después, SEIU presentó la medida del 90%. También cooperaron en AB 204, la asociación CWDB, y SB 525. La velocidad de la ruptura es notable. SEIU sigue el mismo manual usado contra compañías de diálisis.",
    },
    posture: "contested",
    impactLevel: "critical",
    keyDataPoints: [
      { en: "Prop 35 (Nov 2024): SEIU + CPCA in same coalition → passed", es: "Prop 35 (nov 2024): SEIU + CPCA en la misma coalición → aprobada" },
      { en: "Aug 2025: SEIU files 90% measure — 9 months after Prop 35 cooperation", es: "Ago 2025: SEIU presenta medida del 90% — 9 meses después de la cooperación en Prop 35" },
      { en: "Dialysis precedent: 3 failed SEIU measures (2018-2022), $37M SEIU / $216M+ industry spent", es: "Precedente de diálisis: 3 medidas fallidas del SEIU (2018-2022), $37M SEIU / $216M+ industria" },
      { en: "SEIU-UHW spends only ~33% of its own revenue on representational activities", es: "SEIU-UHW gasta solo ~33% de sus propios ingresos en actividades de representación" },
      { en: "Protect Patients coalition: CPCA + CMA + CHA + AltaMed + FHCSD + CA Black Health Network + NASW-CA", es: "Coalición Protect Patients: CPCA + CMA + CHA + AltaMed + FHCSD + CA Black Health Network + NASW-CA" },
    ],
    sources: [
      { title: "Ballotpedia — Prop 35 (2024)", url: "https://ballotpedia.org/California_Proposition_35,_Managed_Care_Organization_Tax_Authorization_Initiative_(2024)" },
      { title: "KFF Health News — Dialysis Ballot Measure History", url: "https://kffhealthnews.org/news/patient-advocacy-or-political-ploy-union-industry-square-off-over-dialysis-initiative/" },
      { title: "Fresnoland — Valley Leaders Oppose Measure", url: "https://fresnoland.org/2025/08/13/healthcare-initiative/" },
    ],
    relatedCaseIds: ["seiu-uhw-90-percent-spending-mandate", "ca-billionaire-tax-act"],
  },
];

/* ------------------------------------------------------------------ */
/*  Paths Forward                                                      */
/* ------------------------------------------------------------------ */

export const PATHS_FORWARD: PathForward[] = [
  {
    id: "expand-lmcc-model",
    title: {
      en: "Expand the LMCC Workforce Development Model",
      es: "Expandir el Modelo de Desarrollo de Fuerza Laboral LMCC",
    },
    description: {
      en: "The SEIU-Community Clinics Partnership has trained 3,000+ workers through a labor-management cooperation committee model funded by the California Workforce Development Board. This model can be replicated at individual FQHCs regardless of union status. The key insight: unions and employers share the goal of a skilled, stable workforce — training partnerships redirect conflict energy into capability building.",
      es: "La Asociación SEIU-Clínicas Comunitarias ha capacitado a 3,000+ trabajadores a través de un modelo de cooperación laboral-gerencial. Este modelo puede replicarse en FQHCs individuales independientemente del estatus sindical.",
    },
    laborFriendly: {
      en: "Workers get free training, career advancement pathways (MA→RN, CHW→LCSW), and certificates that increase earning potential. Unions gain new members with defined credentials and demonstrate value beyond grievance handling.",
      es: "Los trabajadores obtienen capacitación gratuita, caminos de avance profesional y certificados que aumentan el potencial de ingresos. Los sindicatos ganan nuevos miembros y demuestran valor más allá del manejo de quejas.",
    },
    operationalCase: {
      en: "Reduces turnover by 10-15% (saving $8K-$60K per replacement). Fills hard-to-recruit positions internally. Qualifies for CWDB High-Road Training Partnership funding ($500K-$2M grants). FQHCs with stable teams score 15-20% higher on HEDIS quality measures.",
      es: "Reduce la rotación en 10-15%. Llena posiciones difíciles de reclutar internamente. Califica para financiamiento CWDB de Capacitación de Alto Camino.",
    },
    examples: [
      { en: "SEIU-Community Clinics Partnership: $13.3M in CWDB funding, 3,000+ workers trained", es: "Asociación SEIU-Clínicas Comunitarias: $13.3M en financiamiento CWDB, 3,000+ trabajadores capacitados" },
      { en: "Asian Health Services: 21% raise in 2023 paired with workforce stability — union framed as partner, not adversary", es: "Asian Health Services: aumento del 21% en 2023 emparejado con estabilidad laboral" },
    ],
    implementationSteps: [
      { en: "Identify CWDB High-Road Training Partnership grant cycles (annual)", es: "Identificar ciclos de subvenciones CWDB de Alto Camino (anuales)" },
      { en: "Partner with local SEIU local (521/721/1021/UHW) to co-design training curriculum", es: "Asociarse con local SEIU local para codiseñar currículo de capacitación" },
      { en: "Establish joint labor-management committee with equal representation", es: "Establecer comité laboral-gerencial conjunto con representación equitativa" },
      { en: "Apply for CWDB funding ($500K-$2M per cohort)", es: "Solicitar financiamiento CWDB ($500K-$2M por cohorte)" },
      { en: "Track retention, promotion, and quality metrics to demonstrate ROI", es: "Rastrear métricas de retención, promoción y calidad para demostrar ROI" },
    ],
    difficulty: "medium",
    timeframe: "6-months",
    relatedCaseIds: [],
    sources: [
      { title: "SEIU Community Clinics Partnership", url: "https://seiuclinicspartnership.org/" },
      { title: "CWDB High-Road Brief", url: "https://cwdb.ca.gov/wp-content/uploads/sites/43/2024/11/Shirley-Ware.SEIU-Community-Clinics_ACCESSIBLE.pdf" },
    ],
  },
  {
    id: "proactive-labor-management-committees",
    title: {
      en: "Form Proactive Labor-Management Committees",
      es: "Formar Comités Laborales-Gerenciales Proactivos",
    },
    description: {
      en: "Don't wait for an organizing drive to start listening to workers. Form a labor-management committee (LMC) or worker advisory council that gives frontline staff a formal voice in operations, scheduling, safety, and quality. This addresses the core complaint behind most organizing drives — that workers feel unheard — without requiring union representation.",
      es: "No espere a que comience una campaña de organización para escuchar a los trabajadores. Forme un comité que dé al personal de primera línea una voz formal en operaciones, horarios, seguridad y calidad.",
    },
    laborFriendly: {
      en: "Workers gain a legitimate voice in decisions that affect them daily. Even without a union, structured dialogue reduces the 'us vs. them' dynamic. If organizing does occur, an LMC demonstrates good-faith engagement.",
      es: "Los trabajadores obtienen una voz legítima en decisiones que los afectan diariamente. El diálogo estructurado reduce la dinámica de 'nosotros contra ellos'.",
    },
    operationalCase: {
      en: "Early warning system for turnover risks and morale issues. Reduces grievance volume. Identifies operational improvements from frontline perspective. Evidence shows FQHCs with active worker councils have 20-30% lower turnover.",
      es: "Sistema de alerta temprana para riesgos de rotación. Reduce el volumen de quejas. Identifica mejoras operativas desde la perspectiva de primera línea.",
    },
    examples: [
      { en: "The Common Interest Framework (in our union partnership page) identifies 12 areas where patients, staff, and organizations share goals", es: "El Marco de Interés Común identifica 12 áreas donde pacientes, personal y organizaciones comparten objetivos" },
    ],
    implementationSteps: [
      { en: "Survey staff on top 3 workplace concerns (anonymous, bilingual)", es: "Encuestar al personal sobre las 3 principales preocupaciones laborales (anónimo, bilingüe)" },
      { en: "Recruit 6-10 frontline representatives across departments", es: "Reclutar 6-10 representantes de primera línea de diferentes departamentos" },
      { en: "Schedule monthly 1-hour meetings with executive sponsor present", es: "Programar reuniones mensuales de 1 hora con patrocinador ejecutivo presente" },
      { en: "Commit to acting on at least 1 recommendation per quarter", es: "Comprometerse a actuar sobre al menos 1 recomendación por trimestre" },
      { en: "Report back to all staff on what was discussed and what changed", es: "Reportar a todo el personal sobre lo discutido y lo que cambió" },
    ],
    difficulty: "low",
    timeframe: "immediate",
    relatedCaseIds: ["imperial-beach-nuhw-provider-organizing"],
    sources: [],
  },
  {
    id: "wage-transparency-sb525-compliance",
    title: {
      en: "Wage Transparency & Proactive SB 525 Compliance",
      es: "Transparencia Salarial y Cumplimiento Proactivo de SB 525",
    },
    description: {
      en: "Get ahead of the $25/hr floor instead of waiting for it. Publish internal salary bands for all positions. Benchmark against hospitals in your region. Where possible, accelerate SB 525 compliance (reach $23-25/hr before the mandate dates). Transparency reduces the pay secrecy that fuels organizing grievances and positions the FQHC as an employer of choice.",
      es: "Adelántese al piso de $25/hr en vez de esperarlo. Publique bandas salariales internas. Compare con hospitales en su región. Donde sea posible, acelere el cumplimiento de SB 525.",
    },
    laborFriendly: {
      en: "Eliminates pay secrecy — one of the most common organizing complaints. Shows good faith. Reduces 'why does the hospital pay more' resentment by making the timeline explicit.",
      es: "Elimina el secreto salarial — una de las quejas de organización más comunes. Muestra buena fe.",
    },
    operationalCase: {
      en: "Reduces turnover to hospitals (the #1 competitor for FQHC talent). Attracts mission-driven candidates who value transparency. Compliance ahead of schedule avoids last-minute budget disruptions.",
      es: "Reduce la rotación hacia hospitales. Atrae candidatos motivados por la misión que valoran la transparencia.",
    },
    examples: [
      { en: "AltaMed: Fortune 100 Best Companies (2024) — transparency and career development cited as key factors", es: "AltaMed: Fortune 100 Mejores Empresas (2024) — transparencia y desarrollo profesional citados como factores clave" },
    ],
    implementationSteps: [
      { en: "Audit current pay rates against SB 525 schedule by role", es: "Auditar tasas de pago actuales contra el calendario de SB 525 por rol" },
      { en: "Publish salary bands for all posted positions (CA already requires ranges in job postings)", es: "Publicar bandas salariales para todas las posiciones publicadas" },
      { en: "Create a timeline showing when each role reaches $25/hr", es: "Crear una línea de tiempo mostrando cuándo cada rol alcanza $25/hr" },
      { en: "Budget for accelerated compliance where financially feasible", es: "Presupuestar para cumplimiento acelerado donde sea financieramente viable" },
    ],
    difficulty: "medium",
    timeframe: "6-months",
    relatedCaseIds: ["sb-525-minimum-wage-phase-in"],
    sources: [
      { title: "DIR SB 525 FAQ", url: "https://www.dir.ca.gov/dlse/Health-Care-Worker-Minimum-Wage-FAQ.htm" },
    ],
  },
  {
    id: "career-ladders-retention-strategy",
    title: {
      en: "Career Ladders as a Retention & Anti-Turnover Strategy",
      es: "Escaleras Profesionales como Estrategia de Retención y Anti-Rotación",
    },
    description: {
      en: "Build structured pathways (MA→LVN→RN, CHW→certified CHW→LCSW, front desk→biller→coder→revenue cycle manager) with tuition support, mentorship, and protected study time. This directly addresses the retention problem that drives both organizing and financial instability — and it aligns perfectly with SEIU's training partnership goals.",
      es: "Construya caminos estructurados con apoyo de matrícula, mentoría y tiempo de estudio protegido. Esto aborda directamente el problema de retención que impulsa tanto la organización como la inestabilidad financiera.",
    },
    laborFriendly: {
      en: "Unions have pushed career ladders for decades — this meets them where they are. SEIU's $13.3M CWDB training program is explicitly designed for these pathways. Career ladders give workers hope for advancement within the FQHC system.",
      es: "Los sindicatos han impulsado las escaleras profesionales por décadas. El programa de capacitación de $13.3M del SEIU está diseñado explícitamente para estos caminos.",
    },
    operationalCase: {
      en: "Internal promotion costs 30-50% less than external recruitment. Promoted employees have 70% higher 2-year retention. HRSA increasingly requires workforce development plans in Section 330 grant applications.",
      es: "La promoción interna cuesta 30-50% menos que el reclutamiento externo. Los empleados promovidos tienen 70% mayor retención a 2 años.",
    },
    examples: [
      { en: "FHCSD Laura Rodriguez MA Institute: Blue Shield invested $80K in MA training scholarships", es: "Instituto MA Laura Rodriguez de FHCSD: Blue Shield invirtió $80K en becas de capacitación MA" },
      { en: "Clinica Romero (SEIU 721): 10% base raise + 8% SUD differential + 5% longevity at 10yr — retention-focused contract", es: "Clínica Romero (SEIU 721): 10% aumento base + 8% diferencial SUD + 5% longevidad a 10 años — contrato enfocado en retención" },
      { en: "Our Career Roadmap page tracks 5 career tracks with 4 levels each", es: "Nuestra página de Hoja de Ruta Profesional rastrea 5 carreras con 4 niveles cada una" },
    ],
    implementationSteps: [
      { en: "Map the 3-5 most common career transitions at your FQHC", es: "Mapear las 3-5 transiciones de carrera más comunes en su FQHC" },
      { en: "Partner with local community colleges for tuition discount agreements", es: "Asociarse con colegios comunitarios locales para acuerdos de descuento de matrícula" },
      { en: "Allocate 2-4 hours/week of protected study time for enrolled employees", es: "Asignar 2-4 horas/semana de tiempo de estudio protegido para empleados inscritos" },
      { en: "Apply for CWDB or HRSA workforce development grants to fund the program", es: "Solicitar subvenciones CWDB o HRSA de desarrollo de fuerza laboral para financiar el programa" },
      { en: "Track and celebrate promotions — make career advancement visible", es: "Rastrear y celebrar promociones — hacer visible el avance profesional" },
    ],
    difficulty: "medium",
    timeframe: "1-year",
    relatedCaseIds: [],
    sources: [
      { title: "SEIU Community Clinics Partnership", url: "https://seiuclinicspartnership.org/" },
    ],
  },
  {
    id: "neutral-organizing-response",
    title: {
      en: "Neutral Organizing Response Protocol — Avoid the Innercare Playbook",
      es: "Protocolo de Respuesta Neutral a la Organización — Evitar el Manual de Innercare",
    },
    description: {
      en: "When organizing activity begins, FQHC leadership faces a choice: resist aggressively (the Innercare approach, which led to 30+ ULP charges and potential forced recognition) or respond neutrally (respect worker rights, maintain operations, and negotiate in good faith if a majority votes yes). The neutral approach is both legally safer and operationally smarter.",
      es: "Cuando comienza la actividad de organización, el liderazgo del FQHC enfrenta una elección: resistir agresivamente (el enfoque de Innercare, que llevó a 30+ cargos de ULP) o responder neutralmente (respetar derechos de los trabajadores, mantener operaciones y negociar de buena fe).",
    },
    laborFriendly: {
      en: "Respects the fundamental right to organize under the NLRA. Avoids the chilling effect that retaliation has on workplace culture — even workers who don't want a union are demoralized when colleagues are fired for organizing.",
      es: "Respeta el derecho fundamental a organizarse bajo la NLRA. Evita el efecto paralizante que las represalias tienen en la cultura laboral.",
    },
    operationalCase: {
      en: "Innercare's aggressive response cost them: 11 fired workers, 30+ ULP charges, 2 years of legal proceedings, potential forced recognition, reputational damage, and an estimated $500K+ in legal fees. A neutral response costs nothing and preserves the option for productive labor-management relations if workers do organize.",
      es: "La respuesta agresiva de Innercare les costó: 11 trabajadores despedidos, 30+ cargos de ULP, 2 años de procedimientos legales, reconocimiento forzado potencial y un estimado de $500K+ en honorarios legales.",
    },
    examples: [
      { en: "Innercare: fired 11 workers → NLRB forced recognition hearing → $500K+ legal costs", es: "Innercare: despidió 11 trabajadores → audiencia de reconocimiento forzado → $500K+ costos legales" },
      { en: "Asian Health Services: productive SEIU 1021 relationship → 21% raise → workforce stability", es: "Asian Health Services: relación productiva con SEIU 1021 → aumento del 21% → estabilidad laboral" },
    ],
    implementationSteps: [
      { en: "Train all managers on NLRA rights (Tips/Threats/Interrogation/Surveillance = illegal)", es: "Capacitar a todos los gerentes sobre derechos NLRA (Amenazas/Interrogación/Vigilancia = ilegal)" },
      { en: "Establish a clear internal policy: no retaliation, no surveillance, no captive audience meetings", es: "Establecer una política interna clara: sin represalias, sin vigilancia, sin reuniones de audiencia cautiva" },
      { en: "Engage experienced labor counsel EARLY (not after ULP charges are filed)", es: "Contratar abogado laboral experimentado TEMPRANO (no después de que se presenten cargos de ULP)" },
      { en: "If workers organize, negotiate in good faith — focus on shared interests", es: "Si los trabajadores se organizan, negociar de buena fe — enfocarse en intereses compartidos" },
    ],
    difficulty: "low",
    timeframe: "immediate",
    relatedCaseIds: ["innercare-nlrb-forced-recognition", "imperial-beach-nuhw-provider-organizing"],
    sources: [
      { title: "NLRB — Employee Rights", url: "https://www.nlrb.gov/about-nlrb/rights-we-protect/the-law/employees/employee-rights" },
    ],
  },
  {
    id: "constructive-ballot-engagement",
    title: {
      en: "Constructive Engagement on Ballot Measures",
      es: "Compromiso Constructivo en Medidas Electorales",
    },
    description: {
      en: "Rather than purely opposing the 90% spending mandate, FQHC leaders could propose a negotiated alternative: a transparency standard with agreed-upon definitions of 'mission-related' spending, perhaps at 80-85% with clear inclusions for translation services, navigators, outreach, and infrastructure. This acknowledges SEIU's legitimate transparency concerns while protecting the operational flexibility FQHCs need to survive the Medicaid funding crisis.",
      es: "En lugar de oponerse puramente al mandato de gasto del 90%, los líderes de FQHCs podrían proponer una alternativa negociada: un estándar de transparencia con definiciones acordadas de gasto 'relacionado con la misión', tal vez al 80-85%.",
    },
    laborFriendly: {
      en: "Validates SEIU's core concern (executive compensation and spending transparency). Opens dialogue instead of trench warfare. A negotiated standard that both sides helped write is more durable than a ballot measure imposed by one side.",
      es: "Valida la preocupación central del SEIU (compensación ejecutiva y transparencia de gastos). Abre diálogo en vez de guerra de trincheras.",
    },
    operationalCase: {
      en: "A ballot measure is binary — 90% or nothing. A negotiated standard can include nuance (agreed definitions, phase-in periods, hardship exemptions during funding crises). It also removes the November 2026 ballot uncertainty that is already making long-term planning impossible for many FQHCs.",
      es: "Una medida electoral es binaria — 90% o nada. Un estándar negociado puede incluir matices. También elimina la incertidumbre de la boleta de noviembre 2026.",
    },
    examples: [
      { en: "Prop 35 (Nov 2024): CPCA, SEIU, CMA, and CHA were in the SAME coalition 9 months before the 90% fight. They found common ground on the Medi-Cal provider tax. The relationship can be rebuilt.", es: "Prop 35 (nov 2024): CPCA, SEIU, CMA y CHA estaban en la MISMA coalición 9 meses antes de la pelea del 90%. La relación se puede reconstruir." },
      { en: "AB 204 retention bonuses (2022-2023): SEIU and CPCA jointly lobbied for $70M in clinic worker retention bonuses — proving they can cooperate on workforce investment", es: "Bonos de retención AB 204 (2022-2023): SEIU y CPCA presionaron conjuntamente por $70M en bonos — probando que pueden cooperar en inversión laboral" },
      { en: "Dialysis warning: SEIU spent $37M on 3 failed dialysis ballot measures (2018-2022). Industry spent $216M+ to defeat them. Both sides lost. A negotiated alternative avoids this destruction.", es: "Advertencia de diálisis: SEIU gastó $37M en 3 medidas fallidas (2018-2022). La industria gastó $216M+ para derrotarlas. Ambas partes perdieron." },
    ],
    implementationSteps: [
      { en: "CPCA/CCALAC initiate backchannel conversations with SEIU-UHW leadership", es: "CPCA/CCALAC inician conversaciones por canal secundario con liderazgo de SEIU-UHW" },
      { en: "Commission joint study on 'mission-related' spending definitions acceptable to both sides", es: "Comisionar estudio conjunto sobre definiciones de gasto 'relacionado con la misión' aceptables para ambas partes" },
      { en: "Propose legislative alternative (statute) that preempts the ballot measure", es: "Proponer alternativa legislativa (estatuto) que preempta la medida electoral" },
      { en: "Use the billionaire tax as a trust-building shared cause — both sides want more healthcare funding", es: "Usar el impuesto a multimillonarios como causa compartida para construir confianza" },
    ],
    difficulty: "high",
    timeframe: "6-months",
    relatedCaseIds: ["seiu-uhw-90-percent-spending-mandate", "ca-billionaire-tax-act"],
    sources: [
      { title: "Protect Patients CA", url: "https://protectpatientsca.com/faq/" },
      { title: "SEIU-UHW Billionaire Tax", url: "https://www.seiu-uhw.org/ca-billionaire-tax-act/" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Bibliography — Essential Readings                                   */
/* ------------------------------------------------------------------ */

export interface LaborBibliographyEntry {
  id: string;
  title: string;
  author: string;
  year: string;
  type: "book" | "paper" | "report" | "article" | "archive";
  url: string;
  description: BL;
  topics: string[];
}

export const LABOR_BIBLIOGRAPHY: LaborBibliographyEntry[] = [
  {
    id: "bib-dray-healthcare-unionization",
    title: "Healthcare Unionization Trends and Their Effect on Quality, Cost, and Access",
    author: "Dray, Spetz, et al.",
    year: "2024",
    type: "paper",
    url: "https://www.nature.com/articles/s41746-024-01234-5",
    description: {
      en: "npj Health Systems paper analyzing 356 healthcare union elections in 2024 (+21% over 2023). Finds union presence correlates with lower nurse turnover and higher patient safety scores. Includes first data on post-COVID organizing wave driven by burnout, consolidation, and financialization.",
      es: "Análisis de 356 elecciones sindicales en salud en 2024 (+21% sobre 2023). La presencia sindical se correlaciona con menor rotación de enfermeras y mayores puntajes de seguridad del paciente.",
    },
    topics: ["union density", "quality outcomes", "organizing trends"],
  },
  {
    id: "bib-pl93-360-nlra-healthcare",
    title: "Public Law 93-360: NLRA Amendments Extending Organizing Rights to Nonprofit Hospitals (1974)",
    author: "US Congress",
    year: "1974",
    type: "article",
    url: "https://www.nlrb.gov/about-nlrb/rights-we-protect/the-law/jurisdictional-standards",
    description: {
      en: "The 1974 NLRA amendment that restored organizing rights to 1.5M+ nonprofit healthcare workers. Hospital unionization jumped from 15.7% to 27.4% within a decade. This is the legal foundation for all FQHC organizing — without it, most community health center workers would have no federal right to organize.",
      es: "La enmienda de 1974 a la NLRA que restauró derechos de organización para 1.5M+ trabajadores de salud sin fines de lucro. La sindicalización hospitalaria saltó del 15.7% al 27.4% en una década.",
    },
    topics: ["NLRA", "legal framework", "healthcare organizing rights"],
  },
  {
    id: "bib-seiu-uhw-archives",
    title: "SEIU United Healthcare Workers West Records, 1932-2018",
    author: "UC Libraries / Online Archive of California",
    year: "1932-2018",
    type: "archive",
    url: "https://oac.cdlib.org/findaid/ark:/13030/c8wh2p8f/entire_text/",
    description: {
      en: "The definitive archival collection documenting SEIU-UHW's history from Local 250 (1932) through the 2009 trusteeship and NUHW split. 180+ boxes covering organizing campaigns, collective bargaining agreements, strikes, and political action at hospitals and clinics across California.",
      es: "La colección archivística definitiva que documenta la historia de SEIU-UHW desde el Local 250 (1932) hasta la intervención de 2009 y la escisión de NUHW. 180+ cajas cubriendo campañas de organización en hospitales y clínicas de California.",
    },
    topics: ["SEIU-UHW history", "California", "organizing campaigns", "archival"],
  },
  {
    id: "bib-seiu-clinics-partnership",
    title: "SEIU-Community Clinics Partnership: High-Road Training Partnership Model",
    author: "CA Workforce Development Board / Shirley Ware Education Center",
    year: "2024",
    type: "report",
    url: "https://cwdb.ca.gov/wp-content/uploads/sites/43/2024/11/Shirley-Ware.SEIU-Community-Clinics_ACCESSIBLE.pdf",
    description: {
      en: "Detailed brief on the SEIU-Community Clinics Partnership LMCC — the most successful labor-management cooperation model in the FQHC sector. Documents $13.3M in CWDB funding, 3,000+ workers trained, 7 participating FQHCs, and the joint governance structure between 4 SEIU locals and clinic employers.",
      es: "Informe detallado sobre la Asociación SEIU-Clínicas Comunitarias LMCC — el modelo de cooperación laboral-gerencial más exitoso en el sector FQHC.",
    },
    topics: ["LMCC", "workforce development", "high-road", "partnership model"],
  },
  {
    id: "bib-nachw-chw-professionalization",
    title: "The Professionalization of Community Health Workers: A National Perspective",
    author: "National Association of Community Health Workers (NACHW)",
    year: "2019-2026",
    type: "report",
    url: "https://nachw.org/",
    description: {
      en: "NACHW's ongoing work documenting CHW professionalization — including the tension between credentialing (which creates career ladders) and unionization (which secures collective rights). CHWs gained BLS SOC code 21-1094 in 2010, Medi-Cal billing codes in 2022, but still lack consistent union representation across FQHCs.",
      es: "Trabajo continuo de NACHW documentando la profesionalización de CHW — incluyendo la tensión entre credencialización y sindicalización.",
    },
    topics: ["CHW", "professionalization", "credentials", "workforce policy"],
  },
  {
    id: "bib-lao-ballot-fiscal-analysis",
    title: "Fiscal Analysis: Initiative #25-0008 (Community Health Clinic Spending)",
    author: "CA Legislative Analyst's Office",
    year: "2026",
    type: "report",
    url: "https://lao.ca.gov/BallotAnalysis/Initiative/2025-008",
    description: {
      en: "The LAO's official fiscal analysis of the SEIU-UHW 90% spending mandate. Estimates enforcement costs 'up to low tens of millions annually' and warns of 'potential clinic closures.' Key document for understanding the financial mechanics of the ballot measure.",
      es: "El análisis fiscal oficial de la LAO sobre el mandato de gasto del 90% del SEIU-UHW. Estima costos de cumplimiento y advierte sobre 'posibles cierres de clínicas.'",
    },
    topics: ["ballot measure", "fiscal analysis", "90% mandate", "enforcement"],
  },
  {
    id: "bib-brg-1-7b-impact-study",
    title: "Economic Impact of the Clinic Funding Accountability Act on California Community Health Centers",
    author: "Berkeley Research Group (commissioned by Protect Patients CA)",
    year: "2026",
    type: "report",
    url: "https://protectpatientsca.com/faq/",
    description: {
      en: "BRG estimates the 90% mandate would redirect $1.7B from FQHCs and push two-thirds into operating deficits. Key finding: the threshold would exclude translation services, enrollment navigators, transportation, outreach, and capital investment. Commissioned by the opposition — read with that context.",
      es: "BRG estima que el mandato de 90% redirigiría $1.7B de FQHCs. Comisionado por la oposición — leer con ese contexto.",
    },
    topics: ["90% mandate", "economic impact", "opposition research"],
  },
  {
    id: "bib-nlrb-employee-rights",
    title: "NLRB Employee Rights Guide: Your Right to Form a Union",
    author: "National Labor Relations Board",
    year: "2024",
    type: "article",
    url: "https://www.nlrb.gov/about-nlrb/rights-we-protect/the-law/employees/employee-rights",
    description: {
      en: "The definitive federal guide on worker organizing rights. Essential reading for any FQHC executive or worker considering the legal framework. Covers the TIPS rule (Threats, Interrogation, Promises, Surveillance = illegal employer conduct during organizing).",
      es: "La guía federal definitiva sobre derechos de organización de trabajadores. Cubre la regla TIPS (Amenazas, Interrogación, Promesas, Vigilancia = conducta ilegal del empleador).",
    },
    topics: ["NLRA", "organizing rights", "employer obligations", "TIPS rule"],
  },
  {
    id: "bib-hcai-sb525-waiver",
    title: "SB 525 Clinic Minimum Wage Waiver Program",
    author: "HCAI (Department of Health Care Access and Information)",
    year: "2024-2026",
    type: "report",
    url: "https://hcai.ca.gov/data/data-resources/clinic-minimum-wage-waiver-program/",
    description: {
      en: "HCAI's waiver program for clinics unable to comply with SB 525 minimum wage requirements. As of April 2026, zero waivers have been approved. SB 159 allows a 12-month delay if granted. The $22→$25/hr jump on July 1, 2027 is the compliance cliff most FQHCs are budgeting for.",
      es: "Programa de exenciones de HCAI para clínicas que no pueden cumplir con los requisitos de salario mínimo de SB 525. A abril de 2026, cero exenciones han sido aprobadas.",
    },
    topics: ["SB 525", "minimum wage", "waiver", "compliance"],
  },
  {
    id: "bib-ca-hrtp-healthcare-grants",
    title: "California HRTP Healthcare Grant Program: $28.5M for High-Road Workforce Partnerships",
    author: "CA Workforce Development Board",
    year: "2024",
    type: "report",
    url: "https://cwdb.ca.gov/initiatives/high-road-training-partnerships/",
    description: {
      en: "The state funding mechanism behind FQHC labor-management workforce partnerships. Up to $28.5M available for 'high-road' programs requiring union voice, career ladders, and training infrastructure. The SEIU-Community Clinics Partnership is the model recipient.",
      es: "El mecanismo de financiamiento estatal detrás de las asociaciones laborales-gerenciales de FQHCs. Hasta $28.5M disponibles para programas de 'alto camino.'",
    },
    topics: ["CWDB", "high-road", "workforce funding", "LMCC"],
  },
  {
    id: "bib-becker-sloan-union-hospitals-1982",
    title: "Union Activity in Hospitals: Past, Present, and Future",
    author: "Edmund R. Becker, Frank A. Sloan, Bruce Steinwald",
    year: "1982",
    type: "paper",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4191252/",
    description: {
      en: "Foundational quantitative study of hospital unionization. After the 1974 NLRA amendments, hospital unionization grew from 15.7% to 27.4% (1970-1980). Unions raised RN wages ~6% and nonprofessional wages ~10%. Less than 10% of real healthcare spending increases were attributable to unionization — debunking the 'unions drive up costs' narrative.",
      es: "Estudio cuantitativo fundamental de sindicalización hospitalaria. Después de las enmiendas de 1974, la sindicalización creció del 15.7% al 27.4%. Los sindicatos aumentaron salarios sin aumentar significativamente costos.",
    },
    topics: ["hospital unionization", "wage effects", "NLRA 1974", "foundational research"],
  },
  {
    id: "bib-ajph-unions-public-health",
    title: "Labor Unions: A Public Health Institution",
    author: "American Journal of Public Health",
    year: "2015",
    type: "paper",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4318309/",
    description: {
      en: "Frames labor unions as a public health institution, not just a labor relations mechanism. Connects FQHC mission (health equity) with union goals (worker wellbeing). Argues that union decline correlates with widening health disparities — directly relevant to the safety-net workforce.",
      es: "Enmarca a los sindicatos como una institución de salud pública. Conecta la misión de los FQHCs (equidad en salud) con los objetivos sindicales (bienestar del trabajador).",
    },
    topics: ["public health", "health equity", "union decline", "social determinants"],
  },
  {
    id: "bib-nuhw-history",
    title: "History of the National Union of Healthcare Workers",
    author: "NUHW",
    year: "2009-2026",
    type: "article",
    url: "https://nuhw.org/about/history/",
    description: {
      en: "NUHW formed in 2009 after SEIU placed UHW in trusteeship. Essential context for understanding why FQHC organizing in California involves multiple competing unions. NUHW represents workers at Alameda County Medical Center (Highland Hospital) and recently won at Imperial Beach Community Clinic — the first provider-led FQHC organizing win.",
      es: "NUHW se formó en 2009 después de que SEIU intervino UHW. Contexto esencial para entender por qué la organización de FQHCs involucra múltiples sindicatos competidores.",
    },
    topics: ["NUHW", "SEIU split", "California", "healthcare organizing"],
  },
  {
    id: "bib-chc-chronicles-geiger-gibson",
    title: "Community Health Center Chronicles / Geiger Gibson Program",
    author: "GWU Milken Institute / RCHN Foundation / NACHC",
    year: "1965-2026",
    type: "archive",
    url: "https://www.chcchronicles.org/",
    description: {
      en: "The definitive multimedia archive of the community health center movement. Documents how CHCs were founded on civil rights principles of community self-determination. The 51% patient-majority board governance model intersects with labor organizing in complex ways — workers and community members sometimes have aligned and sometimes competing interests.",
      es: "El archivo multimedia definitivo del movimiento de centros de salud comunitarios. Documenta cómo los CHCs se fundaron en principios de derechos civiles de autodeterminación comunitaria.",
    },
    topics: ["CHC history", "civil rights", "governance", "community control"],
  },
];

/* ------------------------------------------------------------------ */
/*  Historical Timeline                                                 */
/* ------------------------------------------------------------------ */

export interface LaborHistoryEvent {
  year: number;
  title: BL;
  description: BL;
  significance: string; // one-line English-only for timeline labels
}

export const LABOR_HISTORY_TIMELINE: LaborHistoryEvent[] = [
  { year: 1934, title: { en: "San Francisco General Hospital Workers Organize", es: "Trabajadores del Hospital General de SF se Organizan" }, description: { en: "During the 1934 San Francisco General Strike, hospital workers organized alongside dockworkers — one of the earliest healthcare labor actions in California.", es: "Durante la Huelga General de SF de 1934, trabajadores hospitalarios se organizaron junto con estibadores." }, significance: "Earliest CA healthcare labor action" },
  { year: 1965, title: { en: "First Community Health Centers Established (OEO)", es: "Primeros Centros de Salud Comunitarios Establecidos (OEO)" }, description: { en: "Columbia Point and Mound Bayou CHCs founded as OEO projects. The community governance model (51% patient-majority boards) creates a unique tension with traditional labor organizing — workers serve on boards alongside patients.", es: "Primeros CHCs fundados como proyectos OEO. El modelo de gobernanza comunitaria crea una tensión única con la organización laboral tradicional." }, significance: "CHC governance model creates labor tension" },
  { year: 1974, title: { en: "NLRA Extends Organizing Rights to Nonprofit Healthcare", es: "NLRA Extiende Derechos de Organización a Salud Sin Fines de Lucro" }, description: { en: "PL 93-360 amends the NLRA to cover nonprofit hospitals and clinics. Hospital unionization jumps from 15.7% to 27.4% over the next decade. This is the legal foundation for all FQHC organizing.", es: "PL 93-360 enmienda la NLRA para cubrir hospitales y clínicas sin fines de lucro. La sindicalización hospitalaria salta del 15.7% al 27.4%." }, significance: "Legal foundation for FQHC organizing" },
  { year: 2005, title: { en: "SEIU Locals 250 + 399 Merge to Form UHW", es: "Locales SEIU 250 + 399 Se Fusionan para Formar UHW" }, description: { en: "The merger creates the largest healthcare union local in the western United States, positioning SEIU for statewide community clinic organizing campaigns.", es: "La fusión crea el sindicato de salud más grande del oeste de EE.UU." }, significance: "SEIU-UHW created — largest western healthcare local" },
  { year: 2009, title: { en: "SEIU Trustees UHW; NUHW Founded", es: "SEIU Interviene UHW; Se Funda NUHW" }, description: { en: "SEIU International places UHW under trusteeship. Dissident leaders form the National Union of Healthcare Workers (NUHW). The split divides California's healthcare labor movement, with NUHW organizing at Alameda County Medical Center and other safety-net facilities.", es: "SEIU Internacional interviene UHW. Líderes disidentes fundan NUHW, dividiendo el movimiento laboral de salud de California." }, significance: "SEIU-NUHW split reshapes CA healthcare labor" },
  { year: 2010, title: { en: "ACA Recognizes CHWs; BLS Assigns SOC Code", es: "ACA Reconoce CHWs; BLS Asigna Código SOC" }, description: { en: "The Affordable Care Act formally recognizes community health workers as healthcare workforce members. BLS assigns Standard Occupational Classification code 21-1094. A professionalization milestone, but without union protections, CHWs remain low-paid.", es: "La ACA reconoce formalmente a los trabajadores comunitarios de salud. BLS asigna código SOC 21-1094." }, significance: "CHW professionalization — but without union protections" },
  { year: 2020, title: { en: "SEIU-Community Clinics LMCC Partnership Established", es: "Se Establece la Asociación LMCC SEIU-Clínicas Comunitarias" }, description: { en: "First-of-its-kind labor-management cooperation committee for FQHCs, bringing together SEIU Locals 521, 721, 1021, and UHW with 7 California community clinics. Funded through CWDB High-Road Training Partnership.", es: "Primer comité de cooperación laboral-gerencial para FQHCs, reuniendo 4 locales SEIU con 7 clínicas de California." }, significance: "First FQHC labor-management partnership" },
  { year: 2022, title: { en: "SEIU Secures $70M in Recruitment/Retention Bonuses", es: "SEIU Asegura $70M en Bonos de Reclutamiento y Retención" }, description: { en: "Through AB 204/SB 121, SEIU secures $70M in one-time recruitment and retention bonuses for California clinic workers ($1,000 per worker). The largest single investment in community clinic workforce to date — and proof of organizing leverage.", es: "A través de AB 204/SB 121, SEIU asegura $70M en bonos para trabajadores de clínicas de California." }, significance: "Largest CA clinic workforce investment" },
  { year: 2023, title: { en: "SB 525 Signed — $25/hr Healthcare Minimum Wage", es: "SB 525 Firmado — Salario Mínimo de Salud de $25/hr" }, description: { en: "SEIU-backed legislation creates a $25/hr minimum wage for healthcare workers, but with a slower phase-in for FQHCs ($21→$22→$25 by July 2027). The two-tier timeline becomes a structural recruiting disadvantage.", es: "Legislación respaldada por SEIU crea un salario mínimo de $25/hr con implementación más lenta para FQHCs." }, significance: "Healthcare minimum wage — FQHCs on slower tier" },
  { year: 2023, title: { en: "HealthRIGHT 360: 850+ Workers Organize with SEIU 1021", es: "HealthRIGHT 360: 850+ Trabajadores se Organizan con SEIU 1021" }, description: { en: "HealthRIGHT 360 (San Francisco FQHC/behavioral health organization) sees 850+ workers organize with SEIU Local 1021. One of the largest single-organization FQHC organizing wins in California.", es: "HealthRIGHT 360 (organización FQHC/salud conductual de San Francisco) ve 850+ trabajadores organizarse con SEIU Local 1021." }, significance: "Largest single FQHC organizing win in CA" },
  { year: 2024, title: { en: "Healthcare Union Elections Surge: 356 Elections (+21%)", es: "Elecciones Sindicales de Salud Aumentan: 356 Elecciones (+21%)" }, description: { en: "Post-COVID organizing wave: 356 healthcare union elections nationally in 2024 (21% increase over 2023), with 70,000+ additional workers choosing union representation. Driven by burnout, hospital consolidation, and private equity financialization.", es: "Ola de organización post-COVID: 356 elecciones sindicales en salud en 2024 (aumento del 21% sobre 2023)." }, significance: "Post-COVID organizing wave hits healthcare" },
  { year: 2025, title: { en: "SEIU-UHW Files 90% Spending Mandate for November 2026 Ballot", es: "SEIU-UHW Presenta Mandato de 90% de Gasto para Boleta de Noviembre 2026" }, description: { en: "SEIU-UHW files Initiative #25-0008 requiring FQHCs to spend 90% of revenue on patient care. Opens a new chapter: labor-FQHC relations via direct democracy, bypassing the legislature.", es: "SEIU-UHW presenta Iniciativa #25-0008 requiriendo que FQHCs gasten 90% de ingresos en atención al paciente." }, significance: "New phase: labor-FQHC conflict via ballot" },
  { year: 2026, title: { en: "Imperial Beach NUHW + Innercare NLRB + Ballot Signatures — Peak Tension", es: "Imperial Beach NUHW + Innercare NLRB + Firmas Electorales — Tensión Máxima" }, description: { en: "The convergence: provider-led organizing at Imperial Beach (NUHW), forced recognition hearing at Innercare (NLRB), AHS layoff crisis (SEIU 1021), and ballot signatures submitted for 90% mandate + exec pay cap. The most consequential year in FQHC labor relations history.", es: "La convergencia: organización de proveedores, audiencia de reconocimiento forzado, crisis de despidos en AHS y firmas electorales. El año más importante en la historia de relaciones laborales de FQHCs." }, significance: "Most consequential year in FQHC labor history" },
];

/* ------------------------------------------------------------------ */
/*  Helper Functions                                                    */
/* ------------------------------------------------------------------ */

/** Get all cases, optionally filtered, sorted by most recent timeline event */
export function getLaborCases(filters?: {
  caseType?: LaborCaseType;
  status?: LaborCaseStatus;
  posture?: LaborRelationsPosture;
  region?: string;
  impactLevel?: string;
}): LaborCase[] {
  let items = [...LABOR_CASES];
  if (filters?.caseType) items = items.filter((c) => c.caseType === filters.caseType);
  if (filters?.status) items = items.filter((c) => c.status === filters.status);
  if (filters?.posture) items = items.filter((c) => c.posture === filters.posture);
  if (filters?.region) items = items.filter((c) => c.region === filters.region);
  if (filters?.impactLevel) items = items.filter((c) => c.impactLevel === filters.impactLevel);
  return items.sort((a, b) => {
    const aDate = a.timeline[a.timeline.length - 1]?.date || a.sourceUrl;
    const bDate = b.timeline[b.timeline.length - 1]?.date || b.sourceUrl;
    return bDate.localeCompare(aDate);
  });
}

/** Get cases with milestones within N days */
export function getUpcomingMilestones(daysAhead = 90): LaborCase[] {
  const now = Date.now();
  const cutoff = now + daysAhead * 24 * 60 * 60 * 1000;
  return LABOR_CASES.filter((c) => {
    if (!c.nextMilestone) return false;
    const ms = new Date(c.nextMilestone.date).getTime();
    return ms >= now && ms <= cutoff;
  }).sort(
    (a, b) =>
      new Date(a.nextMilestone!.date).getTime() -
      new Date(b.nextMilestone!.date).getTime(),
  );
}

/** Get cases affecting a specific FQHC */
export function getLaborCasesForFQHC(slug: string): LaborCase[] {
  return LABOR_CASES.filter((c) => c.affectedFqhcSlugs.includes(slug));
}

/** Get labor-related intel items by tag matching */
export function getLaborRelatedIntel(): IntelItem[] {
  const laborTags = [
    "union", "seiu", "nuhw", "nlrb", "strike", "organizing", "labor",
    "ballot-initiative", "90-percent", "exec-pay", "minimum-wage", "sb-525",
    "SEIU-UHW", "SEIU", "NUHW", "forced-recognition", "protect-patients",
  ];
  const lowerTags = laborTags.map((t) => t.toLowerCase());
  return INTEL_ITEMS.filter((item) =>
    item.tags.some((tag) => lowerTags.includes(tag.toLowerCase())),
  ).sort((a, b) => b.date.localeCompare(a.date));
}

/** Get labor-related advocacy actions by tag matching */
export function getLaborRelatedAdvocacy(): AdvocacyAction[] {
  const laborTags = [
    "seiu", "seiu-uhw", "nuhw", "nlrb", "union", "labor", "ballot-initiative",
    "90-percent", "exec-pay-cap", "forced-recognition", "lmcc",
  ];
  const lowerTags = laborTags.map((t) => t.toLowerCase());
  return ADVOCACY_ACTIONS.filter((item) =>
    item.tags.some((tag) => lowerTags.includes(tag.toLowerCase())),
  ).sort((a, b) => b.date.localeCompare(a.date));
}

/** Compute regional union density from FQHC data */
export function getRegionalDensity(): RegionalDensity[] {
  const regionMap = new Map<
    string,
    { total: number; unionized: number; unions: Set<string> }
  >();

  for (const fqhc of californiaFQHCs) {
    const region = fqhc.region || "Unknown";
    if (!regionMap.has(region)) {
      regionMap.set(region, { total: 0, unionized: 0, unions: new Set() });
    }
    const entry = regionMap.get(region)!;
    entry.total++;
    if (fqhc.unionInfo?.unionized) {
      entry.unionized++;
      fqhc.unionInfo.unions?.forEach((u) => entry.unions.add(u));
    }
  }

  return Array.from(regionMap.entries())
    .map(([region, data]) => ({
      region,
      totalFqhcs: data.total,
      unionizedFqhcs: data.unionized,
      density: data.total > 0 ? Math.round((data.unionized / data.total) * 100) : 0,
      primaryUnions: Array.from(data.unions),
    }))
    .sort((a, b) => b.density - a.density);
}

/** Get aggregate stats for hero section */
export function getLaborStats() {
  const density = getRegionalDensity();
  const totalUnionized = density.reduce((sum, r) => sum + r.unionizedFqhcs, 0);
  const totalFqhcs = density.reduce((sum, r) => sum + r.totalFqhcs, 0);
  const activeCases = LABOR_CASES.filter(
    (c) => c.status !== "resolved" && c.status !== "withdrawn",
  ).length;
  const upcomingDeadlines = getUpcomingMilestones(90).length;
  const partnerships = LABOR_CASES.filter(
    (c) => c.posture === "cooperative" || c.posture === "partnership",
  ).length;

  return {
    unionizedCount: totalUnionized,
    totalFqhcs,
    activeCases,
    upcomingDeadlines,
    partnershipCount: partnerships,
  };
}

/** Posture order for spectrum visualization */
export function getPostureIndex(posture: LaborRelationsPosture): number {
  return POSTURE_ORDER.indexOf(posture);
}
