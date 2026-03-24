/* ------------------------------------------------------------------ */
/*  Legislative Alert Tracker                                           */
/*  Monitors active federal + California bills affecting FQHC funding  */
/*  Updated via /daily-update pipeline (Step 3.9 — legislative scan)   */
/* ------------------------------------------------------------------ */

export type LegislativeStatus =
  | "introduced"
  | "committee"
  | "floor_vote"
  | "passed_chamber"
  | "conference"
  | "enacted"
  | "vetoed"
  | "failed";

export type LegislativeImpact = "critical" | "high" | "moderate" | "watch";
export type LegislativeChamber = "federal" | "california" | "regulation";
export type LegislativeTrack = "funding" | "workforce" | "undocumented" | "medi-cal" | "340b" | "telehealth";

export interface LegislativeBill {
  id: string;
  billNumber: string;
  title: { en: string; es: string };
  summary: { en: string; es: string };
  impact: LegislativeImpact;
  chamber: LegislativeChamber;
  tracks: LegislativeTrack[];
  status: LegislativeStatus;
  statusDate: string;           // ISO date of last status change
  nextActionDate?: string;      // Upcoming vote/deadline date
  nextActionLabel?: { en: string; es: string };
  fqhcImpact: { en: string; es: string };  // Specific $ / % impact on FQHCs
  primarySource: string;
  sourceLabel: string;
  affectedPrograms: string[];   // e.g. ["Medi-Cal", "340B", "PPS"]
  region?: string;              // "California" | "Federal" | specific county
  lastUpdated: string;
}

/* --- Status Metadata ----------------------------------------------- */

export const STATUS_LABELS: Record<LegislativeStatus, { en: string; es: string; color: string }> = {
  introduced:      { en: "Introduced",        es: "Introducido",         color: "text-stone-500 bg-stone-800" },
  committee:       { en: "In Committee",       es: "En Comité",           color: "text-amber-400 bg-amber-950" },
  floor_vote:      { en: "Floor Vote Pending", es: "Voto Pendiente",      color: "text-orange-400 bg-orange-950" },
  passed_chamber:  { en: "Passed Chamber",     es: "Pasó Cámara",         color: "text-blue-400 bg-blue-950" },
  conference:      { en: "Conference",         es: "Conferencia",         color: "text-purple-400 bg-purple-950" },
  enacted:         { en: "Enacted",            es: "Promulgado",          color: "text-teal-400 bg-teal-950" },
  vetoed:          { en: "Vetoed",             es: "Vetado",              color: "text-red-400 bg-red-950" },
  failed:          { en: "Failed",             es: "Fallido",             color: "text-stone-500 bg-stone-900" },
};

export const IMPACT_STYLES: Record<LegislativeImpact, { badge: string; dot: string; label: string }> = {
  critical: { badge: "bg-red-900/60 text-red-300 border-red-700",    dot: "bg-red-500",   label: "CRITICAL" },
  high:     { badge: "bg-orange-900/60 text-orange-300 border-orange-700", dot: "bg-orange-500", label: "HIGH IMPACT" },
  moderate: { badge: "bg-amber-900/60 text-amber-300 border-amber-700",    dot: "bg-amber-500",  label: "MODERATE" },
  watch:    { badge: "bg-stone-800 text-stone-500 border-stone-600",  dot: "bg-stone-400", label: "WATCH" },
};

export const CHAMBER_LABELS: Record<LegislativeChamber, { en: string; es: string; flag: string }> = {
  federal:     { en: "Federal",    es: "Federal",    flag: "🇺🇸" },
  california:  { en: "California", es: "California", flag: "🐻" },
  regulation:  { en: "Regulation", es: "Regulación", flag: "📋" },
};

export const TRACK_LABELS: Record<LegislativeTrack, { en: string; es: string }> = {
  funding:        { en: "Funding",           es: "Financiamiento" },
  workforce:      { en: "Workforce",         es: "Fuerza Laboral" },
  undocumented:   { en: "Undocumented Care", es: "Atención No Documentada" },
  "medi-cal":     { en: "Medi-Cal",          es: "Medi-Cal" },
  "340b":         { en: "340B Drug Pricing", es: "340B Precios de Medicamentos" },
  telehealth:     { en: "Telehealth",        es: "Telesalud" },
};

/* --- Bill Data (Updated 2026-03-07) -------------------------------- */

export const LEGISLATIVE_BILLS: LegislativeBill[] = [
  /* ─── FEDERAL ─────────────────────────────────────────────────── */
  {
    id: "hr1-bbbb",
    billNumber: "H.R. 1",
    title: {
      en: "One Big Beautiful Bill (Medicaid Cuts)",
      es: "La Gran Ley Hermosa (Recortes de Medicaid)",
    },
    summary: {
      en: "Proposed $880B in Medicaid cuts over 10 years including work requirements, per capita caps, and FMAP reductions. The largest proposed Medicaid cut in U.S. history.",
      es: "Propone $880 mil millones en recortes de Medicaid en 10 años, incluyendo requisitos de trabajo, límites per cápita y reducciones de FMAP. El mayor recorte propuesto de Medicaid en la historia de EE.UU.",
    },
    impact: "critical",
    chamber: "federal",
    tracks: ["funding", "medi-cal", "workforce"],
    status: "committee",
    statusDate: "2026-02-15",
    nextActionDate: "2026-03-31",
    nextActionLabel: { en: "House Budget Committee markup", es: "Marcado del Comité de Presupuesto de la Cámara" },
    fqhcImpact: {
      en: "CA FQHCs face $4.6B in cumulative losses by 2028. 20+ CA FQHCs at risk of closure. Per capita cap eliminates ~$200M/yr in flexible PPS payments.",
      es: "Los FQHCs de CA enfrentan $4.6 mil millones en pérdidas acumuladas para 2028. Más de 20 FQHCs de CA en riesgo de cierre.",
    },
    primarySource: "https://www.chcf.org/publication/what-federal-proposals-mean-for-californias-medi-cal-program/",
    sourceLabel: "CHCF Analysis",
    affectedPrograms: ["Medi-Cal", "FMAP", "PPS", "ECM", "CalAIM"],
    region: "Federal",
    lastUpdated: "2026-03-07",
  },
  {
    id: "chcf-reauth-2026",
    billNumber: "CHCF Reauth",
    title: {
      en: "Community Health Center Fund Reauthorization",
      es: "Reautorización del Fondo de Centros de Salud Comunitaria",
    },
    summary: {
      en: "The $5.8B Community Health Center Fund expires December 2026. Without reauthorization, FQHCs lose ~30% of federal grants. NACHC is leading advocacy.",
      es: "El Fondo de $5.8 mil millones para Centros de Salud Comunitaria vence en diciembre de 2026. Sin reautorización, los FQHCs pierden ~30% de las subvenciones federales.",
    },
    impact: "critical",
    chamber: "federal",
    tracks: ["funding"],
    status: "committee",
    statusDate: "2026-01-10",
    nextActionDate: "2026-12-31",
    nextActionLabel: { en: "Fund expires — Congress must act", es: "El fondo vence — el Congreso debe actuar" },
    fqhcImpact: {
      en: "$4.6B at risk across 1,400+ FQHC organizations nationally. CA FQHCs receive ~$500M annually from this fund.",
      es: "$4.6 mil millones en riesgo para más de 1,400 organizaciones FQHC a nivel nacional. Los FQHCs de CA reciben ~$500 millones anuales de este fondo.",
    },
    primarySource: "https://www.nachc.org/research-and-data/research-fact-sheets-and-infographics/",
    sourceLabel: "NACHC — CHC Fund",
    affectedPrograms: ["HRSA Section 330", "Capital Development", "National Health Service Corps"],
    region: "Federal",
    lastUpdated: "2026-03-01",
  },
  {
    id: "nhsc-reauth",
    billNumber: "NHSC Reauth",
    title: {
      en: "National Health Service Corps Reauthorization",
      es: "Reautorización del Cuerpo Nacional de Servicio de Salud",
    },
    summary: {
      en: "NHSC loan repayment funding — used by thousands of FQHC clinicians — faces potential cuts under proposed federal budget reconciliation.",
      es: "El financiamiento de pago de préstamos del NHSC, utilizado por miles de clínicos de FQHC, enfrenta posibles recortes bajo la reconciliación presupuestaria federal propuesta.",
    },
    impact: "high",
    chamber: "federal",
    tracks: ["workforce", "funding"],
    status: "committee",
    statusDate: "2026-01-20",
    fqhcImpact: {
      en: "CA has 800+ active NHSC clinicians at FQHCs. Average loan repayment award: $50,000. Loss would severely impact FQHC recruitment.",
      es: "CA tiene más de 800 clínicos activos del NHSC en FQHCs. Premio promedio de pago de préstamos: $50,000.",
    },
    primarySource: "https://nhsc.hrsa.gov/",
    sourceLabel: "HRSA — NHSC",
    affectedPrograms: ["NHSC Loan Repayment", "NHSC Scholarship", "NURSE Corps"],
    region: "Federal",
    lastUpdated: "2026-02-15",
  },
  {
    id: "340b-integrity-act",
    billNumber: "340B Integrity Act",
    title: {
      en: "340B Integrity Act (Drug Manufacturer Restrictions)",
      es: "Ley de Integridad 340B (Restricciones de Fabricantes de Medicamentos)",
    },
    summary: {
      en: "Legislation would allow drug manufacturers to restrict 340B discounts for contract pharmacies. FQHCs derive significant revenue from 340B program savings.",
      es: "La legislación permitiría a los fabricantes de medicamentos restringir los descuentos 340B para farmacias contratadas. Los FQHCs obtienen ingresos significativos de los ahorros del programa 340B.",
    },
    impact: "high",
    chamber: "federal",
    tracks: ["funding", "340b"],
    status: "committee",
    statusDate: "2025-11-10",
    fqhcImpact: {
      en: "340B savings represent 10-15% of FQHC operating revenue on average. Restrictions could cost CA FQHCs $80-120M annually.",
      es: "Los ahorros del 340B representan el 10-15% de los ingresos operativos de los FQHC en promedio. Las restricciones podrían costar a los FQHCs de CA $80-120 millones anuales.",
    },
    primarySource: "https://www.hrsa.gov/opa/index.html",
    sourceLabel: "HRSA — 340B Program",
    affectedPrograms: ["340B Drug Pricing"],
    region: "Federal",
    lastUpdated: "2026-02-01",
  },

  /* ─── CALIFORNIA ───────────────────────────────────────────────── */
  {
    id: "ca-1115-waiver",
    billNumber: "CA 1115 Waiver",
    title: {
      en: "CalAIM 1115 Waiver Renewal (Dec 2026)",
      es: "Renovación del Waiver 1115 de CalAIM (Dic 2026)",
    },
    summary: {
      en: "California's $6.8B Medi-Cal 1115 waiver — the funding backbone of CalAIM, ECM, and Community Supports — must be renewed by December 2026 with DHCS.",
      es: "El waiver 1115 de Medi-Cal de $6.8 mil millones de California — la columna vertebral de CalAIM, ECM y Apoyos Comunitarios — debe renovarse para diciembre de 2026 con DHCS.",
    },
    impact: "critical",
    chamber: "california",
    tracks: ["funding", "medi-cal"],
    status: "committee",
    statusDate: "2026-01-15",
    nextActionDate: "2026-12-31",
    nextActionLabel: { en: "Waiver renewal deadline with CMS", es: "Plazo de renovación del waiver con CMS" },
    fqhcImpact: {
      en: "ECM pays FQHCs $185/month per enrolled patient. Non-renewal would eliminate this revenue stream for 30,000+ CA patients. Golden Valley and AltaMed have 500+ ECM enrollees each.",
      es: "ECM paga a los FQHCs $185/mes por paciente inscrito. La no renovación eliminaría este flujo de ingresos para más de 30,000 pacientes de CA.",
    },
    primarySource: "https://www.dhcs.ca.gov/provgovpart/Documents/CalAIM-1115-Waiver.pdf",
    sourceLabel: "DHCS — CalAIM Waiver",
    affectedPrograms: ["ECM", "CalAIM", "Community Supports", "ILOS"],
    region: "California",
    lastUpdated: "2026-03-05",
  },
  {
    id: "sb-525-implementation",
    billNumber: "SB 525",
    title: {
      en: "Healthcare Minimum Wage — $25/hr by 2027",
      es: "Salario Mínimo en Salud — $25/hr para 2027",
    },
    summary: {
      en: "SB 525 phases in $25/hour minimum wage for healthcare workers at most CA facilities. FQHCs phase-in timeline ends June 1, 2027. SEIU leading compliance push.",
      es: "SB 525 implementa gradualmente el salario mínimo de $25/hora para trabajadores de salud en la mayoría de instalaciones de CA. El cronograma de implementación para FQHCs termina el 1 de junio de 2027.",
    },
    impact: "high",
    chamber: "california",
    tracks: ["workforce"],
    status: "enacted",
    statusDate: "2023-10-13",
    nextActionDate: "2027-06-01",
    nextActionLabel: { en: "FQHC full $25/hr deadline", es: "Fecha límite completa de $25/hr para FQHCs" },
    fqhcImpact: {
      en: "Average FQHC labor cost increase: $1.2-2.8M annually. 220 CA FQHCs tracking compliance. CHWs and MAs most affected. Requires budget adjustment or volume increases.",
      es: "Aumento promedio de costos laborales de FQHC: $1.2-2.8 millones anuales. 220 FQHCs de CA siguiendo el cumplimiento.",
    },
    primarySource: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB525",
    sourceLabel: "CA Legislature — SB 525",
    affectedPrograms: ["All FQHC staff", "SEIU contracts", "Budget planning"],
    region: "California",
    lastUpdated: "2026-02-28",
  },
  {
    id: "ca-undocumented-restoration",
    billNumber: "CA Budget 2026-27",
    title: {
      en: "Undocumented Adult Medi-Cal Restoration",
      es: "Restauración de Medi-Cal para Adultos Indocumentados",
    },
    summary: {
      en: "CA Dems proposed restoring Medi-Cal coverage for undocumented adults (25-49) eliminated in Jan 2026 budget cuts. Currently in Assembly Health Committee.",
      es: "Los demócratas de CA propusieron restaurar la cobertura de Medi-Cal para adultos indocumentados (25-49 años) eliminada en los recortes presupuestarios de enero de 2026. Actualmente en el Comité de Salud de la Asamblea.",
    },
    impact: "high",
    chamber: "california",
    tracks: ["medi-cal", "undocumented"],
    status: "committee",
    statusDate: "2026-02-20",
    fqhcImpact: {
      en: "~350,000 CA patients affected. LA County FQHCs see 40-60% undocumented patient panels. Revenue loss from elimination: $180-240M statewide. Restoration would stabilize CHC finances.",
      es: "~350,000 pacientes de CA afectados. Los FQHCs del condado de LA tienen paneles de pacientes indocumentados del 40-60%.",
    },
    primarySource: "https://calmatters.org/health/2026/02/california-undocumented-immigrant-medicaid-cuts/",
    sourceLabel: "CalMatters",
    affectedPrograms: ["Medi-Cal", "Undocumented Access"],
    region: "California",
    lastUpdated: "2026-03-01",
  },
  {
    id: "fqhc-transparency-ballot",
    billNumber: "#25-0008",
    title: {
      en: "FQHC Transparency Ballot Initiative",
      es: "Iniciativa Electoral de Transparencia FQHC",
    },
    summary: {
      en: "Ballot initiative #25-0008 would require FQHCs to publish detailed financial disclosures including executive compensation, patient outcomes by payer type, and PPS rate utilization.",
      es: "La iniciativa electoral #25-0008 requeriría que los FQHCs publiquen divulgaciones financieras detalladas, incluyendo compensación ejecutiva, resultados de pacientes por tipo de pagador y utilización de tarifas PPS.",
    },
    impact: "moderate",
    chamber: "california",
    tracks: ["funding", "medi-cal"],
    status: "introduced",
    statusDate: "2025-12-15",
    nextActionDate: "2026-11-03",
    nextActionLabel: { en: "CA General Election", es: "Elección General de CA" },
    fqhcImpact: {
      en: "Compliance burden estimated $50-150K per FQHC for first-year reporting. CPCA and NACHC actively opposing.",
      es: "La carga de cumplimiento se estima en $50-150K por FQHC para el primer año de informes. CPCA y NACHC se oponen activamente.",
    },
    primarySource: "https://oag.ca.gov/initiatives/active",
    sourceLabel: "CA AG — Active Initiatives",
    affectedPrograms: ["Governance", "Financial reporting", "Compliance"],
    region: "California",
    lastUpdated: "2026-02-25",
  },
  {
    id: "telehealth-parity-act",
    billNumber: "AB 1478",
    title: {
      en: "Telehealth Parity for FQHC Look-Alikes",
      es: "Paridad de Telesalud para FQHCs Look-Alike",
    },
    summary: {
      en: "AB 1478 extends PPS telehealth reimbursement parity to FQHC Look-Alike clinics (currently excluded from enhanced telehealth rates), covering ~30 CA facilities.",
      es: "AB 1478 extiende la paridad de reembolso de telesalud PPS a clínicas FQHC Look-Alike (actualmente excluidas de las tarifas mejoradas de telesalud), cubriendo ~30 instalaciones de CA.",
    },
    impact: "moderate",
    chamber: "california",
    tracks: ["telehealth", "funding"],
    status: "committee",
    statusDate: "2026-01-28",
    fqhcImpact: {
      en: "30 CA Look-Alike facilities could gain $800K-2.4M annually in enhanced telehealth PPS rates if enacted.",
      es: "30 instalaciones Look-Alike de CA podrían ganar $800K-2.4 millones anuales en tarifas PPS de telesalud mejoradas si se promulga.",
    },
    primarySource: "https://leginfo.legislature.ca.gov/",
    sourceLabel: "CA Legislature",
    affectedPrograms: ["PPS", "Telehealth", "Look-Alike"],
    region: "California",
    lastUpdated: "2026-02-10",
  },

  /* ─── REGULATIONS ──────────────────────────────────────────────── */
  {
    id: "hrsa-uds-2026",
    billNumber: "HRSA UDS",
    title: {
      en: "HRSA UDS Reporting Changes (2026 Data Year)",
      es: "Cambios en Informes UDS de HRSA (Año de Datos 2026)",
    },
    summary: {
      en: "HRSA proposed adding AI tool usage tracking, ambient documentation metrics, and behavioral health integration indicators to UDS annual reporting requirements effective 2026 data year.",
      es: "HRSA propuso agregar seguimiento del uso de herramientas de IA, métricas de documentación ambiental e indicadores de integración de salud conductual a los requisitos de informes anuales UDS para el año de datos 2026.",
    },
    impact: "moderate",
    chamber: "regulation",
    tracks: ["funding", "workforce"],
    status: "committee",
    statusDate: "2026-02-01",
    nextActionDate: "2026-06-30",
    nextActionLabel: { en: "Public comment deadline", es: "Fecha límite de comentarios públicos" },
    fqhcImpact: {
      en: "Compliance burden: 40-80 hours additional reporting per FQHC. Positively positions FQHCs who have already adopted AI documentation tools.",
      es: "Carga de cumplimiento: 40-80 horas de informes adicionales por FQHC. Posiciona positivamente a los FQHCs que ya han adoptado herramientas de documentación de IA.",
    },
    primarySource: "https://bphc.hrsa.gov/data-reporting/uds-reporting",
    sourceLabel: "HRSA — UDS Reporting",
    affectedPrograms: ["HRSA Section 330", "UDS", "AI Documentation"],
    region: "Federal",
    lastUpdated: "2026-02-20",
  },
];

/* --- Helper Functions --------------------------------------------- */

export function getBillsByImpact(impact: LegislativeImpact): LegislativeBill[] {
  return LEGISLATIVE_BILLS.filter((b) => b.impact === impact);
}

export function getBillsByTrack(track: LegislativeTrack): LegislativeBill[] {
  return LEGISLATIVE_BILLS.filter((b) => b.tracks.includes(track));
}

export function getBillsByChamber(chamber: LegislativeChamber): LegislativeBill[] {
  return LEGISLATIVE_BILLS.filter((b) => b.chamber === chamber);
}

export function getCriticalBills(): LegislativeBill[] {
  return LEGISLATIVE_BILLS.filter((b) => b.impact === "critical" || b.impact === "high");
}

export function getUpcomingDeadlines(): LegislativeBill[] {
  return LEGISLATIVE_BILLS
    .filter((b) => b.nextActionDate)
    .sort((a, b) => (a.nextActionDate! > b.nextActionDate! ? 1 : -1));
}

export function getBillStats() {
  const total = LEGISLATIVE_BILLS.length;
  const critical = LEGISLATIVE_BILLS.filter((b) => b.impact === "critical").length;
  const high = LEGISLATIVE_BILLS.filter((b) => b.impact === "high").length;
  const withDeadline = LEGISLATIVE_BILLS.filter((b) => b.nextActionDate).length;
  const federal = LEGISLATIVE_BILLS.filter((b) => b.chamber === "federal").length;
  const california = LEGISLATIVE_BILLS.filter((b) => b.chamber === "california").length;
  return { total, critical, high, withDeadline, federal, california };
}

export const LEGISLATIVE_LAST_UPDATED = "2026-03-07";
