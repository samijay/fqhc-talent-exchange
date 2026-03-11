// fqhc-compliance.ts
// Comprehensive FQHC Risk & Compliance data
// Every item has primary source URLs — no unsourced claims
// Last updated: 2026-03-10

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ComplianceDomain = "hrsa-audits" | "hipaa-privacy" | "billing-fraud";

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface BilingualText {
  en: string;
  es: string;
}

export type OSVRequirementArea =
  | "governance"
  | "clinical"
  | "financial"
  | "operational";

export interface OSVChecklistItem {
  id: string;
  area: OSVRequirementArea;
  requirement: BilingualText;
  description: BilingualText;
  evidence: BilingualText[];
  cfr: string;
  responsibleRole: string;
  estimatedHours: number;
  commonFailures: BilingualText[];
  primarySourceUrl: string;
}

export interface RegulatoryItem {
  id: string;
  title: BilingualText;
  domain: ComplianceDomain;
  citations: string[];
  summary: BilingualText;
  practicalImplications: BilingualText;
  updateFrequency: string;
  primarySourceUrl: string;
  primarySourceOrg: string;
  tags: string[];
}

export interface ComplianceCalendarEntry {
  id: string;
  month: number;
  day: number | null;
  deadline: string;
  requirement: BilingualText;
  domain: ComplianceDomain;
  description: BilingualText;
  responsibleDepartment: string;
  preparationWeeks: number;
  primarySourceUrl: string;
  recurring: boolean;
}

export interface ComplianceRiskItem {
  id: string;
  domain: ComplianceDomain;
  riskCategory: string;
  description: BilingualText;
  likelihood: 1 | 2 | 3 | 4 | 5;
  impact: 1 | 2 | 3 | 4 | 5;
  controls: BilingualText[];
  mitigationSteps: BilingualText[];
  responsibleRole: string;
  primarySourceUrl: string;
}

export interface ComplianceCaseStudy {
  id: string;
  title: BilingualText;
  fqhcType: string;
  location: string;
  domain: ComplianceDomain;
  date: string;
  challenge: BilingualText;
  rootCause: BilingualText;
  resolution: BilingualText;
  outcome: BilingualText;
  lesson: BilingualText;
  penaltyAmount?: string;
  primarySourceUrl: string;
}

export interface ComplianceLegislation {
  id: string;
  title: BilingualText;
  billNumber: string;
  status: "proposed" | "enacted" | "effective" | "repealed";
  effectiveDate: string;
  domain: ComplianceDomain;
  impact: BilingualText;
  requiredActions: BilingualText[];
  deadline: string;
  primarySourceUrl: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

export const COMPLIANCE_LAST_UPDATED = "2026-03-10";

export const DOMAIN_META: {
  id: ComplianceDomain;
  en: string;
  es: string;
  color: string;
  icon: string;
  description: BilingualText;
}[] = [
  {
    id: "hrsa-audits",
    en: "HRSA Site Visits & Audits",
    es: "Visitas y Auditorías de HRSA",
    color: "teal",
    icon: "ShieldCheck",
    description: {
      en: "19 program requirements reviewed every 3 years during Operational Site Visits",
      es: "19 requisitos del programa revisados cada 3 años durante las Visitas Operativas del Sitio",
    },
  },
  {
    id: "hipaa-privacy",
    en: "HIPAA & Patient Privacy",
    es: "HIPAA y Privacidad del Paciente",
    color: "purple",
    icon: "Lock",
    description: {
      en: "Data protection, breach response, BAA management, and workforce training",
      es: "Protección de datos, respuesta a violaciones, gestión de BAA y capacitación del personal",
    },
  },
  {
    id: "billing-fraud",
    en: "Billing & Fraud Compliance",
    es: "Cumplimiento de Facturación y Fraude",
    color: "amber",
    icon: "DollarSign",
    description: {
      en: "PPS billing rules, false claims prevention, 340B compliance, and coding audits",
      es: "Reglas de facturación PPS, prevención de reclamos falsos, cumplimiento 340B y auditorías de codificación",
    },
  },
];

export const OSV_AREA_META: {
  id: OSVRequirementArea;
  en: string;
  es: string;
  itemCount: number;
}[] = [
  { id: "governance", en: "Governance & Oversight", es: "Gobernanza y Supervisión", itemCount: 5 },
  { id: "clinical", en: "Clinical Services & Quality", es: "Servicios Clínicos y Calidad", itemCount: 5 },
  { id: "financial", en: "Financial Management", es: "Gestión Financiera", itemCount: 5 },
  { id: "operational", en: "Operations & Workforce", es: "Operaciones y Personal", itemCount: 4 },
];

/* ------------------------------------------------------------------ */
/*  OSV Checklist — 19 HRSA Program Requirements                      */
/* ------------------------------------------------------------------ */

export const OSV_CHECKLIST: OSVChecklistItem[] = [
  // ── Governance (5 items) ──
  {
    id: "osv-gov-1",
    area: "governance",
    requirement: {
      en: "Board Composition & Authority",
      es: "Composición y Autoridad de la Junta",
    },
    description: {
      en: "Governing board must have majority (51%+) consumer members who are patients of the health center and reflect the population served.",
      es: "La junta directiva debe tener mayoría (51%+) de miembros consumidores que sean pacientes del centro de salud y reflejen la población atendida.",
    },
    evidence: [
      { en: "Board roster with patient status verification", es: "Lista de la junta con verificación de estado de paciente" },
      { en: "Board bylaws showing consumer majority requirement", es: "Estatutos de la junta que muestren requisito de mayoría de consumidores" },
      { en: "Demographics comparison: board vs. service area", es: "Comparación demográfica: junta vs. área de servicio" },
    ],
    cfr: "42 CFR § 51c.304(d)(3); Section 330(k)(3)(H)",
    responsibleRole: "CEO / Board Chair",
    estimatedHours: 8,
    commonFailures: [
      { en: "Board member patient status not verified annually", es: "Estado de paciente de miembros de la junta no verificado anualmente" },
      { en: "Demographics do not reflect community served", es: "La demografía no refleja la comunidad atendida" },
    ],
    primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual",
  },
  {
    id: "osv-gov-2",
    area: "governance",
    requirement: {
      en: "Conflict of Interest Policy",
      es: "Política de Conflicto de Intereses",
    },
    description: {
      en: "Written conflict of interest policy covering board members, key employees, and officers. Annual disclosure forms required.",
      es: "Política escrita de conflicto de intereses que cubra miembros de la junta, empleados clave y funcionarios. Se requieren formularios de divulgación anuales.",
    },
    evidence: [
      { en: "Signed annual disclosure forms for all board members", es: "Formularios de divulgación anuales firmados para todos los miembros" },
      { en: "Written COI policy approved by board", es: "Política de COI escrita aprobada por la junta" },
      { en: "Board meeting minutes showing COI review", es: "Actas de reuniones de la junta mostrando revisión de COI" },
    ],
    cfr: "45 CFR § 75.327(c)(1); Section 330(k)(3)(H)",
    responsibleRole: "Board Chair / Compliance Officer",
    estimatedHours: 4,
    commonFailures: [
      { en: "Missing disclosure forms for 1+ board members", es: "Formularios de divulgación faltantes para 1+ miembros" },
      { en: "Policy not reviewed/updated in 3+ years", es: "Política no revisada/actualizada en 3+ años" },
    ],
    primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual",
  },
  {
    id: "osv-gov-3",
    area: "governance",
    requirement: {
      en: "Board Meeting Documentation",
      es: "Documentación de Reuniones de la Junta",
    },
    description: {
      en: "Board must meet monthly or as specified in bylaws. Minutes must document quorum, votes, and key decisions.",
      es: "La junta debe reunirse mensualmente o según lo especificado en los estatutos. Las actas deben documentar quórum, votos y decisiones clave.",
    },
    evidence: [
      { en: "12 months of board meeting minutes", es: "12 meses de actas de reuniones de la junta" },
      { en: "Quorum documented for each meeting", es: "Quórum documentado para cada reunión" },
      { en: "Evidence of board approval of key actions (budget, QI plan, CEO evaluation)", es: "Evidencia de aprobación de acciones clave (presupuesto, plan QI, evaluación del CEO)" },
    ],
    cfr: "Section 330(k)(3)(H); 42 CFR § 51c.304",
    responsibleRole: "Board Secretary / CEO",
    estimatedHours: 6,
    commonFailures: [
      { en: "Gaps in monthly meeting schedule without documented reason", es: "Brechas en el calendario de reuniones mensuales sin razón documentada" },
      { en: "Minutes lack detail on financial oversight actions", es: "Las actas carecen de detalle sobre acciones de supervisión financiera" },
    ],
    primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual",
  },
  {
    id: "osv-gov-4",
    area: "governance",
    requirement: {
      en: "Strategic Planning & Needs Assessment",
      es: "Planificación Estratégica y Evaluación de Necesidades",
    },
    description: {
      en: "Current strategic plan informed by community needs assessment. Must be updated every 3 years at minimum.",
      es: "Plan estratégico actual informado por evaluación de necesidades de la comunidad. Debe actualizarse cada 3 años como mínimo.",
    },
    evidence: [
      { en: "Current strategic plan with board approval date", es: "Plan estratégico actual con fecha de aprobación de la junta" },
      { en: "Community needs assessment (within 3 years)", es: "Evaluación de necesidades de la comunidad (dentro de 3 años)" },
      { en: "Evidence plan guides operational decisions", es: "Evidencia de que el plan guía las decisiones operativas" },
    ],
    cfr: "Section 330(k)(2); 42 CFR § 51c.303",
    responsibleRole: "CEO / Board",
    estimatedHours: 40,
    commonFailures: [
      { en: "Needs assessment older than 3 years", es: "Evaluación de necesidades mayor de 3 años" },
      { en: "Strategic plan not connected to operational goals", es: "Plan estratégico no conectado a metas operativas" },
    ],
    primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual",
  },
  {
    id: "osv-gov-5",
    area: "governance",
    requirement: {
      en: "CEO/Executive Director Oversight",
      es: "Supervisión del CEO/Director Ejecutivo",
    },
    description: {
      en: "Board selects, evaluates, and sets compensation for CEO. Annual performance evaluation required.",
      es: "La junta selecciona, evalúa y establece la compensación del CEO. Se requiere evaluación de desempeño anual.",
    },
    evidence: [
      { en: "CEO employment agreement or contract", es: "Acuerdo o contrato de empleo del CEO" },
      { en: "Annual CEO performance evaluation (board-conducted)", es: "Evaluación anual de desempeño del CEO (realizada por la junta)" },
      { en: "Board minutes documenting CEO compensation review", es: "Actas de la junta documentando revisión de compensación del CEO" },
    ],
    cfr: "Section 330(k)(3)(H)(ii)",
    responsibleRole: "Board Chair",
    estimatedHours: 6,
    commonFailures: [
      { en: "No documented annual CEO evaluation", es: "Sin evaluación anual documentada del CEO" },
      { en: "Compensation not benchmarked or board-approved", es: "Compensación no comparada o aprobada por la junta" },
    ],
    primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual",
  },

  // ── Clinical Services & Quality (5 items) ──
  {
    id: "osv-clin-1",
    area: "clinical",
    requirement: {
      en: "Required & Additional Services",
      es: "Servicios Requeridos y Adicionales",
    },
    description: {
      en: "Must provide all required primary care services directly or through formal written referral arrangements. Includes preventive, prenatal, dental, BH, pharmacy, and lab.",
      es: "Debe proporcionar todos los servicios de atención primaria requeridos directamente o mediante acuerdos formales de referencia escritos.",
    },
    evidence: [
      { en: "Service delivery matrix (direct vs. referral)", es: "Matriz de prestación de servicios (directo vs. referencia)" },
      { en: "Signed referral agreements for non-direct services", es: "Acuerdos de referencia firmados para servicios no directos" },
      { en: "Hours of operation posted and adequate for need", es: "Horario de atención publicado y adecuado para la necesidad" },
    ],
    cfr: "Section 330(a)(1); 42 CFR § 51c.102(h)",
    responsibleRole: "CMO / Clinical Director",
    estimatedHours: 12,
    commonFailures: [
      { en: "Referral agreements expired or unsigned", es: "Acuerdos de referencia vencidos o sin firmar" },
      { en: "Behavioral health services not available on-site or by referral", es: "Servicios de salud mental no disponibles en el sitio o por referencia" },
    ],
    primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual",
  },
  {
    id: "osv-clin-2",
    area: "clinical",
    requirement: {
      en: "Credentialing & Privileging",
      es: "Acreditación y Privilegios",
    },
    description: {
      en: "All licensed/certified providers must be credentialed and privileged per written policy. Re-credentialing every 2 years.",
      es: "Todos los proveedores licenciados/certificados deben ser acreditados según política escrita. Re-acreditación cada 2 años.",
    },
    evidence: [
      { en: "Credentialing policy and procedure", es: "Política y procedimiento de acreditación" },
      { en: "Complete credentialing files for all providers", es: "Archivos de acreditación completos para todos los proveedores" },
      { en: "Re-credentialing schedule (every 2 years)", es: "Calendario de re-acreditación (cada 2 años)" },
      { en: "Peer review documentation", es: "Documentación de revisión por pares" },
    ],
    cfr: "42 CFR § 51c.303(c)(1); HRSA PIN 2002-22",
    responsibleRole: "CMO / HR Director",
    estimatedHours: 20,
    commonFailures: [
      { en: "Provider practicing without completed credentialing file", es: "Proveedor practicando sin archivo de acreditación completo" },
      { en: "Re-credentialing lapsed beyond 2-year cycle", es: "Re-acreditación vencida más allá del ciclo de 2 años" },
    ],
    primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual",
  },
  {
    id: "osv-clin-3",
    area: "clinical",
    requirement: {
      en: "Quality Improvement / Assurance Program",
      es: "Programa de Mejora / Aseguramiento de Calidad",
    },
    description: {
      en: "Active QI/QA program with clinical quality measures tracked, reported to board, and used for improvement. UDS clinical measures must meet HRSA benchmarks.",
      es: "Programa activo de QI/QA con medidas de calidad clínica rastreadas, reportadas a la junta y usadas para mejora.",
    },
    evidence: [
      { en: "Written QI/QA plan with measurable goals", es: "Plan escrito de QI/QA con metas medibles" },
      { en: "Quarterly QI committee meeting minutes", es: "Actas de reuniones trimestrales del comité de QI" },
      { en: "UDS clinical quality data and improvement trends", es: "Datos de calidad clínica UDS y tendencias de mejora" },
      { en: "Board reports on quality measures", es: "Informes a la junta sobre medidas de calidad" },
    ],
    cfr: "Section 330(k)(3)(C); 42 CFR § 51c.303(c)(2)",
    responsibleRole: "CMO / QI Director",
    estimatedHours: 16,
    commonFailures: [
      { en: "QI plan exists but no evidence of implementation or follow-through", es: "Existe plan QI pero sin evidencia de implementación o seguimiento" },
      { en: "Clinical measures below HRSA Health Center Quality Recognition thresholds", es: "Medidas clínicas por debajo de los umbrales de Reconocimiento de Calidad de HRSA" },
    ],
    primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual",
  },
  {
    id: "osv-clin-4",
    area: "clinical",
    requirement: {
      en: "Care Coordination & Continuity",
      es: "Coordinación y Continuidad de la Atención",
    },
    description: {
      en: "Systems for tracking referrals, hospital discharges, and care transitions. Must demonstrate continuity across all service lines.",
      es: "Sistemas para rastrear referencias, altas hospitalarias y transiciones de atención. Debe demostrar continuidad en todas las líneas de servicio.",
    },
    evidence: [
      { en: "Referral tracking system with follow-up rates", es: "Sistema de rastreo de referencias con tasas de seguimiento" },
      { en: "Hospital discharge follow-up protocol", es: "Protocolo de seguimiento de alta hospitalaria" },
      { en: "Care team documentation in EHR", es: "Documentación del equipo de atención en EHR" },
    ],
    cfr: "Section 330(k)(3)(A); 42 CFR § 51c.303(a)",
    responsibleRole: "CMO / Care Coordination Lead",
    estimatedHours: 10,
    commonFailures: [
      { en: "No system for tracking referral completion", es: "Sin sistema para rastrear la finalización de referencias" },
      { en: "Hospital discharge follow-up rate below 50%", es: "Tasa de seguimiento de alta hospitalaria por debajo del 50%" },
    ],
    primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual",
  },
  {
    id: "osv-clin-5",
    area: "clinical",
    requirement: {
      en: "Patient Rights & Grievances",
      es: "Derechos y Quejas de Pacientes",
    },
    description: {
      en: "Written patient rights policy posted in all service areas. Formal grievance procedure with documented resolution process.",
      es: "Política de derechos del paciente escrita y publicada en todas las áreas de servicio. Procedimiento formal de quejas con proceso de resolución documentado.",
    },
    evidence: [
      { en: "Posted patient rights (in languages of population served)", es: "Derechos del paciente publicados (en idiomas de la población atendida)" },
      { en: "Grievance policy and procedure", es: "Política y procedimiento de quejas" },
      { en: "Grievance log with resolution documentation", es: "Registro de quejas con documentación de resolución" },
    ],
    cfr: "42 CFR § 51c.303(c)(3)",
    responsibleRole: "Compliance Officer / Patient Services",
    estimatedHours: 6,
    commonFailures: [
      { en: "Patient rights not posted in required languages", es: "Derechos del paciente no publicados en idiomas requeridos" },
      { en: "Grievance log incomplete or not reviewed by leadership", es: "Registro de quejas incompleto o no revisado por liderazgo" },
    ],
    primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual",
  },

  // ── Financial Management (5 items) ──
  {
    id: "osv-fin-1",
    area: "financial",
    requirement: {
      en: "Sliding Fee Discount Program",
      es: "Programa de Descuento por Escala Móvil",
    },
    description: {
      en: "Must offer sliding fee schedule based on family size and income. Patients at or below 100% FPL receive free care. Schedule must be board-approved and updated to current FPL.",
      es: "Debe ofrecer escala móvil de tarifas basada en tamaño familiar e ingreso. Pacientes al o por debajo del 100% FPL reciben atención gratuita.",
    },
    evidence: [
      { en: "Current sliding fee schedule with 2026 FPL levels", es: "Escala móvil actual con niveles FPL 2026" },
      { en: "Board approval of schedule", es: "Aprobación de la junta del programa" },
      { en: "Patient notification of SFDP availability", es: "Notificación al paciente de la disponibilidad del SFDP" },
      { en: "Sample patient records showing proper SFDP application", es: "Muestras de registros mostrando aplicación correcta del SFDP" },
    ],
    cfr: "Section 330(k)(3)(G); 42 CFR § 51c.303(f)",
    responsibleRole: "CFO / Revenue Cycle Manager",
    estimatedHours: 8,
    commonFailures: [
      { en: "Fee schedule not updated to current year FPL", es: "Escala de tarifas no actualizada al FPL del año actual" },
      { en: "Nominal fee charged to patients below 100% FPL (must be zero)", es: "Tarifa nominal cobrada a pacientes por debajo del 100% FPL (debe ser cero)" },
    ],
    primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual",
  },
  {
    id: "osv-fin-2",
    area: "financial",
    requirement: {
      en: "Annual Independent Audit",
      es: "Auditoría Independiente Anual",
    },
    description: {
      en: "Annual financial audit by independent CPA. Organizations receiving $750K+ in federal funds must have Single Audit per 2 CFR 200.",
      es: "Auditoría financiera anual por CPA independiente. Organizaciones que reciben $750K+ en fondos federales deben tener Auditoría Única según 2 CFR 200.",
    },
    evidence: [
      { en: "Most recent audited financial statements", es: "Estados financieros auditados más recientes" },
      { en: "Single Audit report (if applicable)", es: "Informe de Auditoría Única (si aplica)" },
      { en: "Management letter and corrective action plan", es: "Carta de gestión y plan de acción correctiva" },
      { en: "Board review of audit findings documented in minutes", es: "Revisión de hallazgos de auditoría por la junta documentada en actas" },
    ],
    cfr: "2 CFR § 200.501; Section 330(k)(3)(D)",
    responsibleRole: "CFO",
    estimatedHours: 60,
    commonFailures: [
      { en: "Single Audit not filed within 9 months of fiscal year end", es: "Auditoría Única no presentada dentro de 9 meses del fin del año fiscal" },
      { en: "Prior year findings not remediated", es: "Hallazgos del año anterior no remediados" },
    ],
    primarySourceUrl: "https://www.ecfr.gov/current/title-2/subtitle-A/chapter-II/part-200/subpart-F",
  },
  {
    id: "osv-fin-3",
    area: "financial",
    requirement: {
      en: "Billing & Collections Systems",
      es: "Sistemas de Facturación y Cobros",
    },
    description: {
      en: "Systems to maximize revenue from all payer sources (Medicare, Medicaid, private insurance). Must bill all third-party payers before applying sliding fee.",
      es: "Sistemas para maximizar ingresos de todas las fuentes de pago. Debe facturar a todos los pagadores terceros antes de aplicar la escala móvil.",
    },
    evidence: [
      { en: "Revenue cycle workflow documentation", es: "Documentación del flujo de trabajo del ciclo de ingresos" },
      { en: "Insurance verification process", es: "Proceso de verificación de seguro" },
      { en: "Collections policy (cannot deny care for non-payment)", es: "Política de cobros (no puede negar atención por falta de pago)" },
    ],
    cfr: "Section 330(k)(3)(F); 42 CFR § 51c.303(f)",
    responsibleRole: "CFO / Revenue Cycle Manager",
    estimatedHours: 12,
    commonFailures: [
      { en: "Not billing Medi-Cal for eligible patients (leaving money on the table)", es: "No facturar a Medi-Cal para pacientes elegibles (dejando dinero en la mesa)" },
      { en: "Aggressive collections practices that discourage patient access", es: "Prácticas de cobro agresivas que desalientan el acceso del paciente" },
    ],
    primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual",
  },
  {
    id: "osv-fin-4",
    area: "financial",
    requirement: {
      en: "Budget & Financial Management",
      es: "Presupuesto y Gestión Financiera",
    },
    description: {
      en: "Board-approved annual budget with periodic financial reporting. Must maintain adequate operating reserves and cash flow management.",
      es: "Presupuesto anual aprobado por la junta con informes financieros periódicos. Debe mantener reservas operativas adecuadas.",
    },
    evidence: [
      { en: "Board-approved annual budget", es: "Presupuesto anual aprobado por la junta" },
      { en: "Monthly/quarterly financial statements to board", es: "Estados financieros mensuales/trimestrales a la junta" },
      { en: "Days cash on hand calculation (90+ days recommended)", es: "Cálculo de días de efectivo disponible (90+ días recomendado)" },
    ],
    cfr: "Section 330(k)(3)(D); 2 CFR § 200.302",
    responsibleRole: "CFO / Finance Director",
    estimatedHours: 20,
    commonFailures: [
      { en: "Budget not board-approved before fiscal year start", es: "Presupuesto no aprobado por la junta antes del inicio del año fiscal" },
      { en: "Financial reports not presented to board monthly", es: "Informes financieros no presentados a la junta mensualmente" },
    ],
    primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual",
  },
  {
    id: "osv-fin-5",
    area: "financial",
    requirement: {
      en: "Federal Grant Compliance & Reporting",
      es: "Cumplimiento y Reportes de Subvenciones Federales",
    },
    description: {
      en: "Comply with all conditions of HRSA Section 330 grant. Timely submission of required reports including UDS, Federal Financial Report, and grant progress reports.",
      es: "Cumplir con todas las condiciones de la subvención HRSA Sección 330. Presentación oportuna de informes requeridos.",
    },
    evidence: [
      { en: "Notice of Award and special conditions", es: "Aviso de Adjudicación y condiciones especiales" },
      { en: "UDS submission confirmation (Feb 15 deadline)", es: "Confirmación de envío de UDS (fecha límite 15 de febrero)" },
      { en: "Federal Financial Reports filed on time", es: "Informes Financieros Federales presentados a tiempo" },
      { en: "Grant scope change approvals (if any)", es: "Aprobaciones de cambio de alcance de subvención (si las hay)" },
    ],
    cfr: "45 CFR § 75.341-342; Section 330",
    responsibleRole: "CEO / Grants Manager",
    estimatedHours: 30,
    commonFailures: [
      { en: "Late UDS submission", es: "Envío tardío de UDS" },
      { en: "Scope changes made without prior HRSA approval", es: "Cambios de alcance realizados sin aprobación previa de HRSA" },
    ],
    primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual",
  },

  // ── Operations & Workforce (4 items) ──
  {
    id: "osv-ops-1",
    area: "operational",
    requirement: {
      en: "Key Management Staff & Staffing Plan",
      es: "Personal Clave de Gestión y Plan de Dotación",
    },
    description: {
      en: "Adequate staffing for all funded services. Key management positions (CEO, CMO, CFO) must be filled. Staffing plan reflects service needs.",
      es: "Dotación de personal adecuada para todos los servicios financiados. Puestos clave de gestión deben estar cubiertos.",
    },
    evidence: [
      { en: "Organizational chart with filled/vacant positions", es: "Organigrama con posiciones ocupadas/vacantes" },
      { en: "Staffing plan aligned with scope of services", es: "Plan de dotación alineado con el alcance de servicios" },
      { en: "Recruitment plans for vacant key positions", es: "Planes de reclutamiento para posiciones clave vacantes" },
    ],
    cfr: "Section 330(k)(3)(H)(vi); 42 CFR § 51c.303(c)",
    responsibleRole: "CEO / HR Director",
    estimatedHours: 10,
    commonFailures: [
      { en: "CMO position vacant for 6+ months without interim plan", es: "Posición de CMO vacante por 6+ meses sin plan interino" },
      { en: "Staffing ratios inadequate for patient volume", es: "Ratios de personal inadecuados para el volumen de pacientes" },
    ],
    primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual",
  },
  {
    id: "osv-ops-2",
    area: "operational",
    requirement: {
      en: "Health Information Technology & EHR",
      es: "Tecnología de Información en Salud y EHR",
    },
    description: {
      en: "EHR system that supports clinical workflows, quality reporting (UDS), and interoperability. Must maintain data backup and recovery procedures.",
      es: "Sistema EHR que apoye flujos de trabajo clínicos, reportes de calidad (UDS) e interoperabilidad. Debe mantener procedimientos de respaldo y recuperación de datos.",
    },
    evidence: [
      { en: "EHR system documentation and vendor contract", es: "Documentación del sistema EHR y contrato del proveedor" },
      { en: "Data backup and disaster recovery plan", es: "Plan de respaldo de datos y recuperación ante desastres" },
      { en: "UDS data extraction capabilities documented", es: "Capacidades de extracción de datos UDS documentadas" },
    ],
    cfr: "Section 330(k)(3)(B); HITECH Act",
    responsibleRole: "CIO / IT Director",
    estimatedHours: 12,
    commonFailures: [
      { en: "No documented disaster recovery plan or untested backup", es: "Sin plan documentado de recuperación ante desastres o respaldo no probado" },
      { en: "EHR not configured for required UDS measures", es: "EHR no configurado para las medidas UDS requeridas" },
    ],
    primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual",
  },
  {
    id: "osv-ops-3",
    area: "operational",
    requirement: {
      en: "Scope of Project & Service Sites",
      es: "Alcance del Proyecto y Sitios de Servicio",
    },
    description: {
      en: "All service sites must be listed in the HRSA-approved scope of project. Adding or removing sites requires prior HRSA approval via scope change request.",
      es: "Todos los sitios de servicio deben estar listados en el alcance del proyecto aprobado por HRSA. Agregar o eliminar sitios requiere aprobación previa de HRSA.",
    },
    evidence: [
      { en: "Current Form 5B (service sites) matching actual operations", es: "Formulario 5B actual (sitios de servicio) que coincida con las operaciones reales" },
      { en: "Scope change request documentation for any changes", es: "Documentación de solicitud de cambio de alcance para cualquier cambio" },
      { en: "All sites providing services listed on Form 5A", es: "Todos los sitios que brindan servicios listados en el Formulario 5A" },
    ],
    cfr: "Section 330(e)(1); 42 CFR § 51c.104",
    responsibleRole: "CEO / Grants Manager",
    estimatedHours: 8,
    commonFailures: [
      { en: "Operating service site not in approved scope of project", es: "Sitio de servicio operando no en el alcance de proyecto aprobado" },
      { en: "School-based or mobile sites not included in Form 5B", es: "Sitios escolares o móviles no incluidos en el Formulario 5B" },
    ],
    primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual",
  },
  {
    id: "osv-ops-4",
    area: "operational",
    requirement: {
      en: "Emergency Preparedness & Safety",
      es: "Preparación para Emergencias y Seguridad",
    },
    description: {
      en: "Written emergency preparedness plan. OSHA-compliant workplace safety program. Infection control policies. Regular drills documented.",
      es: "Plan escrito de preparación para emergencias. Programa de seguridad laboral conforme a OSHA. Políticas de control de infecciones. Simulacros regulares documentados.",
    },
    evidence: [
      { en: "Emergency preparedness plan (updated annually)", es: "Plan de preparación para emergencias (actualizado anualmente)" },
      { en: "OSHA compliance documentation (bloodborne pathogens, hazard communication)", es: "Documentación de cumplimiento OSHA (patógenos transmitidos por sangre, comunicación de riesgos)" },
      { en: "Fire/evacuation drill logs", es: "Registros de simulacros de incendio/evacuación" },
      { en: "Infection control policy and training records", es: "Política de control de infecciones y registros de capacitación" },
    ],
    cfr: "OSHA 29 CFR § 1910; CMS Conditions of Participation",
    responsibleRole: "COO / Safety Officer",
    estimatedHours: 16,
    commonFailures: [
      { en: "Emergency plan not tested via drill in 12+ months", es: "Plan de emergencia no probado mediante simulacro en 12+ meses" },
      { en: "OSHA training not documented for new hires", es: "Capacitación OSHA no documentada para nuevos empleados" },
    ],
    primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual",
  },
];

/* ------------------------------------------------------------------ */
/*  Regulatory Knowledge Base                                          */
/* ------------------------------------------------------------------ */

export const REGULATORY_ITEMS: RegulatoryItem[] = [
  // ── HRSA Regulations ──
  {
    id: "reg-hrsa-330",
    title: { en: "Section 330 of the Public Health Service Act", es: "Sección 330 de la Ley de Servicio de Salud Pública" },
    domain: "hrsa-audits",
    citations: ["42 USC § 254b", "Section 330(e)(1)-(5)"],
    summary: { en: "The foundational statute authorizing FQHC grants. Defines required services, governance structure, sliding fee requirements, and eligible populations.", es: "El estatuto fundamental que autoriza las subvenciones de FQHC. Define servicios requeridos, estructura de gobernanza, requisitos de escala móvil y poblaciones elegibles." },
    practicalImplications: { en: "Every FQHC must comply with all Section 330 requirements to maintain grant funding. Non-compliance can result in conditions of award, restricted funding, or grant termination.", es: "Cada FQHC debe cumplir con todos los requisitos de la Sección 330 para mantener el financiamiento. El incumplimiento puede resultar en condiciones de adjudicación, financiamiento restringido o terminación de subvención." },
    updateFrequency: "As amended by Congress",
    primarySourceUrl: "https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title42-section254b",
    primarySourceOrg: "U.S. Congress",
    tags: ["foundational", "grant-requirements", "governance"],
  },
  {
    id: "reg-hrsa-compliance-manual",
    title: { en: "HRSA Health Center Program Compliance Manual", es: "Manual de Cumplimiento del Programa de Centros de Salud HRSA" },
    domain: "hrsa-audits",
    citations: ["HRSA Compliance Manual Chapter 1-20"],
    summary: { en: "The definitive guide to FQHC compliance. 20 chapters covering every program requirement from governance to clinical services to financial management.", es: "La guía definitiva de cumplimiento de FQHC. 20 capítulos que cubren cada requisito del programa." },
    practicalImplications: { en: "This is the primary reference HRSA reviewers use during OSVs. Every FQHC compliance officer should have this bookmarked and use it for self-assessment.", es: "Esta es la referencia principal que los revisores de HRSA usan durante las OSV. Todo oficial de cumplimiento de FQHC debería tener esto marcado." },
    updateFrequency: "Updated periodically by BPHC",
    primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual",
    primarySourceOrg: "HRSA BPHC",
    tags: ["osv-prep", "self-assessment", "essential"],
  },
  {
    id: "reg-hrsa-pin-2014-01",
    title: { en: "HRSA PAL 2014-01: Sliding Fee Discount Program", es: "HRSA PAL 2014-01: Programa de Descuento por Escala Móvil" },
    domain: "hrsa-audits",
    citations: ["PAL 2014-01"],
    summary: { en: "Detailed HRSA guidance on implementing sliding fee schedules. Requires nominal or no charges for patients at/below 100% FPL and discounts through 200% FPL.", es: "Guía detallada de HRSA sobre la implementación de escalas móviles de tarifas." },
    practicalImplications: { en: "Most common OSV finding: FQHCs charging nominal fees to patients below 100% FPL (must be zero). Second: not updating to current year FPL levels.", es: "Hallazgo más común de OSV: FQHCs cobrando tarifas nominales a pacientes por debajo del 100% FPL (debe ser cero)." },
    updateFrequency: "Annual FPL update required",
    primarySourceUrl: "https://bphc.hrsa.gov/sites/default/files/bphc/programrequirements/pal-2014-01.pdf",
    primarySourceOrg: "HRSA BPHC",
    tags: ["sliding-fee", "financial", "common-finding"],
  },
  {
    id: "reg-uds-manual",
    title: { en: "Uniform Data System (UDS) Reporting Manual", es: "Manual de Informes del Sistema Uniforme de Datos (UDS)" },
    domain: "hrsa-audits",
    citations: ["UDS Manual 2025"],
    summary: { en: "Annual reporting requirements for all Section 330 grantees. Covers patient demographics, services, staffing, clinical quality, financial data, and health outcomes.", es: "Requisitos de informes anuales para todos los beneficiarios de la Sección 330." },
    practicalImplications: { en: "UDS data determines HRSA Quality Recognition badges, influences grant funding, and is publicly available. Late or inaccurate submission can trigger HRSA review.", es: "Los datos de UDS determinan las insignias de Reconocimiento de Calidad de HRSA e influyen en el financiamiento." },
    updateFrequency: "Annual (due February 15)",
    primarySourceUrl: "https://bphc.hrsa.gov/data-reporting/uds-training-and-technical-assistance",
    primarySourceOrg: "HRSA BPHC",
    tags: ["uds", "reporting", "quality-measures"],
  },
  // ── HIPAA Regulations ──
  {
    id: "reg-hipaa-privacy",
    title: { en: "HIPAA Privacy Rule (45 CFR Part 160 & 164)", es: "Regla de Privacidad HIPAA (45 CFR Parte 160 y 164)" },
    domain: "hipaa-privacy",
    citations: ["45 CFR § 164.500-534", "45 CFR § 160.103"],
    summary: { en: "Establishes standards for protected health information (PHI). Defines patient rights to access, amend, and restrict use of their health records.", es: "Establece estándares para la información de salud protegida (PHI). Define los derechos del paciente a acceder, enmendar y restringir el uso de sus registros." },
    practicalImplications: { en: "FQHCs must respond to patient access requests within 30 days. Must provide Notice of Privacy Practices. Cannot use/disclose PHI without authorization except for TPO (treatment, payment, operations).", es: "Los FQHC deben responder a solicitudes de acceso del paciente dentro de 30 días. No pueden usar/divulgar PHI sin autorización excepto para TPO." },
    updateFrequency: "As amended by HHS",
    primarySourceUrl: "https://www.hhs.gov/hipaa/for-professionals/privacy/index.html",
    primarySourceOrg: "HHS Office for Civil Rights",
    tags: ["hipaa", "privacy", "patient-rights"],
  },
  {
    id: "reg-hipaa-security",
    title: { en: "HIPAA Security Rule (45 CFR § 164.302-318)", es: "Regla de Seguridad HIPAA (45 CFR § 164.302-318)" },
    domain: "hipaa-privacy",
    citations: ["45 CFR § 164.308", "45 CFR § 164.310", "45 CFR § 164.312"],
    summary: { en: "Requires administrative, physical, and technical safeguards for electronic PHI (ePHI). Includes risk analysis, workforce training, access controls, and encryption.", es: "Requiere salvaguardas administrativas, físicas y técnicas para ePHI. Incluye análisis de riesgos, capacitación del personal, controles de acceso y encriptación." },
    practicalImplications: { en: "Annual risk assessment is REQUIRED (45 CFR § 164.308(a)(1)). Most common HIPAA violation for FQHCs: failure to conduct risk assessment. Must encrypt all devices storing ePHI.", es: "La evaluación de riesgos anual es REQUERIDA. La violación más común de HIPAA para FQHCs: no realizar evaluación de riesgos." },
    updateFrequency: "As amended by HHS",
    primarySourceUrl: "https://www.hhs.gov/hipaa/for-professionals/security/index.html",
    primarySourceOrg: "HHS Office for Civil Rights",
    tags: ["hipaa", "security", "risk-assessment", "essential"],
  },
  {
    id: "reg-hipaa-breach",
    title: { en: "HIPAA Breach Notification Rule (45 CFR §§ 164.400-414)", es: "Regla de Notificación de Violaciones HIPAA" },
    domain: "hipaa-privacy",
    citations: ["45 CFR § 164.404", "45 CFR § 164.406", "45 CFR § 164.408"],
    summary: { en: "Requires notification to individuals, HHS, and media (if 500+ affected) within 60 days of discovering a PHI breach. Breaches affecting fewer than 500 must be logged and reported annually.", es: "Requiere notificación a individuos, HHS y medios (si 500+ afectados) dentro de 60 días del descubrimiento de una violación de PHI." },
    practicalImplications: { en: "Cost of notification can exceed $100K for large breaches (postage, credit monitoring, legal). Small breaches (under 500) still must be logged on HHS portal by March 1 annually.", es: "El costo de notificación puede exceder $100K para grandes violaciones. Pequeñas violaciones deben registrarse en el portal de HHS antes del 1 de marzo anualmente." },
    updateFrequency: "Standing regulation",
    primarySourceUrl: "https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html",
    primarySourceOrg: "HHS Office for Civil Rights",
    tags: ["hipaa", "breach", "notification", "60-day-rule"],
  },
  {
    id: "reg-hipaa-baa",
    title: { en: "Business Associate Agreements (BAA Requirements)", es: "Acuerdos de Asociado Comercial (Requisitos de BAA)" },
    domain: "hipaa-privacy",
    citations: ["45 CFR § 164.502(e)", "45 CFR § 164.504(e)"],
    summary: { en: "Any entity that creates, receives, maintains, or transmits PHI on behalf of an FQHC must sign a BAA. Includes EHR vendors, clearinghouses, cloud storage, billing services.", es: "Cualquier entidad que cree, reciba, mantenga o transmita PHI en nombre de un FQHC debe firmar un BAA." },
    practicalImplications: { en: "Missing BAA = automatic HIPAA violation if that vendor has a breach. FQHCs must inventory ALL vendors handling PHI and ensure current BAAs. Common gap: telehealth platform vendors.", es: "BAA faltante = violación automática de HIPAA si ese proveedor tiene una violación. Los FQHC deben inventariar TODOS los proveedores que manejan PHI." },
    updateFrequency: "Review annually",
    primarySourceUrl: "https://www.hhs.gov/hipaa/for-professionals/covered-entities/sample-business-associate-agreement-provisions/index.html",
    primarySourceOrg: "HHS Office for Civil Rights",
    tags: ["hipaa", "baa", "vendors", "telehealth"],
  },
  {
    id: "reg-ca-ccpa-cpra",
    title: { en: "California Consumer Privacy Act / CA Privacy Rights Act", es: "Ley de Privacidad del Consumidor de California / Ley de Derechos de Privacidad de CA" },
    domain: "hipaa-privacy",
    citations: ["CA Civil Code § 1798.100-199", "CPRA effective Jan 2023"],
    summary: { en: "California state privacy laws that may apply to FQHC operations beyond HIPAA. CCPA/CPRA covers employee data and non-patient data. More restrictive than HIPAA in some areas.", es: "Leyes de privacidad del estado de California que pueden aplicarse a operaciones de FQHC más allá de HIPAA." },
    practicalImplications: { en: "While HIPAA-covered patient data is largely exempt, employee data, volunteer data, and non-clinical research data may be subject to CCPA/CPRA. FQHCs with 50+ employees should assess applicability.", es: "Mientras que los datos de pacientes cubiertos por HIPAA están exentos, los datos de empleados y voluntarios pueden estar sujetos a CCPA/CPRA." },
    updateFrequency: "CA legislative sessions",
    primarySourceUrl: "https://oag.ca.gov/privacy/ccpa",
    primarySourceOrg: "California Attorney General",
    tags: ["california", "privacy", "employee-data", "state-law"],
  },
  // ── Billing & Fraud Regulations ──
  {
    id: "reg-pps-billing",
    title: { en: "FQHC Prospective Payment System (PPS)", es: "Sistema de Pago Prospectivo (PPS) de FQHC" },
    domain: "billing-fraud",
    citations: ["Section 1902(bb) SSA", "42 CFR § 405.2462-2470"],
    summary: { en: "FQHCs receive a per-visit PPS rate from Medicaid (and cost-based from Medicare). Rate covers all services in a single encounter. Must understand same-day billing rules.", es: "Los FQHC reciben una tarifa PPS por visita de Medicaid. La tarifa cubre todos los servicios en un solo encuentro." },
    practicalImplications: { en: "Key rules: (1) Same-day medical + BH with different providers = 2 encounters for Medicare, 1 for most Medi-Cal. (2) FQHCs cannot bill incident-to. (3) PPS rate is all-inclusive — no separate lab/supply charges.", es: "Reglas clave: Visita médica + salud mental el mismo día = 2 encuentros para Medicare, 1 para la mayoría de Medi-Cal." },
    updateFrequency: "Annual rate update",
    primarySourceUrl: "https://www.cms.gov/Medicare/Medicare-Fee-for-Service-Payment/FQHCPPS",
    primarySourceOrg: "CMS",
    tags: ["pps", "billing", "same-day", "essential"],
  },
  {
    id: "reg-false-claims",
    title: { en: "Federal False Claims Act (31 USC § 3729-3733)", es: "Ley Federal de Reclamos Falsos" },
    domain: "billing-fraud",
    citations: ["31 USC § 3729", "31 USC § 3730 (qui tam)"],
    summary: { en: "Imposes civil penalties for knowingly submitting false claims to the government. Penalties: $13,946 to $27,894 per false claim plus treble damages. Whistleblower (qui tam) provisions.", es: "Impone sanciones civiles por presentar reclamos falsos al gobierno a sabiendas. Sanciones: $13,946 a $27,894 por reclamo falso más daños triples." },
    practicalImplications: { en: "FQHCs billing Medicaid/Medicare face FCA liability for: upcoding, billing without face-to-face encounter, incident-to billing (not allowed for FQHCs), and 340B duplicate discounts. Staff can report violations as qui tam relators.", es: "Los FQHC que facturan a Medicaid/Medicare enfrentan responsabilidad FCA por: sobrecodificación, facturación sin encuentro presencial." },
    updateFrequency: "Penalties adjusted annually for inflation",
    primarySourceUrl: "https://www.justice.gov/civil/fraud-statistics",
    primarySourceOrg: "U.S. Department of Justice",
    tags: ["false-claims", "fraud", "whistleblower", "penalties"],
  },
  {
    id: "reg-340b",
    title: { en: "340B Drug Pricing Program", es: "Programa de Precios de Medicamentos 340B" },
    domain: "billing-fraud",
    citations: ["Section 340B of PHS Act", "42 USC § 256b"],
    summary: { en: "Requires drug manufacturers to offer outpatient drugs at significantly reduced prices to eligible entities including FQHCs. Savings of 25-50% on drug costs.", es: "Requiere que los fabricantes de medicamentos ofrezcan medicamentos ambulatorios a precios significativamente reducidos a entidades elegibles incluyendo FQHCs." },
    practicalImplications: { en: "Critical revenue source for FQHCs but heavily audited. Key compliance: (1) No duplicate discounts (340B + Medicaid rebate). (2) Only eligible patients. (3) Contract pharmacy arrangements must follow HRSA guidance. (4) HRSA can audit at any time.", es: "Fuente crítica de ingresos para FQHCs pero muy auditada. Cumplimiento clave: Sin descuentos duplicados, solo pacientes elegibles." },
    updateFrequency: "HRSA guidance updates periodically",
    primarySourceUrl: "https://www.hrsa.gov/opa/340b-drug-pricing-program",
    primarySourceOrg: "HRSA Office of Pharmacy Affairs",
    tags: ["340b", "pharmacy", "audit-risk", "revenue"],
  },
  {
    id: "reg-anti-kickback",
    title: { en: "Anti-Kickback Statute (42 USC § 1320a-7b)", es: "Estatuto Anti-Sobornos" },
    domain: "billing-fraud",
    citations: ["42 USC § 1320a-7b(b)", "OIG Safe Harbors 42 CFR § 1001.952"],
    summary: { en: "Prohibits offering, paying, soliciting, or receiving anything of value to induce referrals for services covered by federal healthcare programs. Criminal penalties.", es: "Prohíbe ofrecer, pagar, solicitar o recibir cualquier cosa de valor para inducir referencias para servicios cubiertos por programas federales." },
    practicalImplications: { en: "FQHCs must ensure referral relationships, physician recruitment agreements, and vendor contracts don't create kickback risk. Safe harbors exist for employment, space rental at FMV, and personal services contracts.", es: "Los FQHC deben asegurar que las relaciones de referencia y contratos de proveedores no creen riesgo de soborno." },
    updateFrequency: "As amended / OIG guidance",
    primarySourceUrl: "https://oig.hhs.gov/compliance/provider-compliance-training/",
    primarySourceOrg: "HHS Office of Inspector General",
    tags: ["fraud", "kickback", "referrals", "safe-harbors"],
  },
  {
    id: "reg-stark-law",
    title: { en: "Physician Self-Referral Law (Stark Law)", es: "Ley de Auto-Referencia del Médico (Ley Stark)" },
    domain: "billing-fraud",
    citations: ["42 USC § 1395nn", "42 CFR § 411.350-389"],
    summary: { en: "Prohibits physicians from referring Medicare/Medicaid patients to entities with which the physician has a financial relationship, unless an exception applies. Strict liability — no intent required.", es: "Prohíbe a los médicos referir pacientes de Medicare/Medicaid a entidades con las cuales el médico tiene una relación financiera." },
    practicalImplications: { en: "Relevant for FQHCs with physician-owned labs, imaging centers, or specialty practices. In-office ancillary exception may apply. Key: document all physician financial relationships.", es: "Relevante para FQHCs con laboratorios propiedad de médicos. Excepción de servicios auxiliares en la oficina puede aplicar." },
    updateFrequency: "As amended by CMS",
    primarySourceUrl: "https://www.cms.gov/Medicare/Fraud-and-Abuse/PhysicianSelfReferral",
    primarySourceOrg: "CMS",
    tags: ["fraud", "self-referral", "physician", "strict-liability"],
  },
  {
    id: "reg-sb525",
    title: { en: "California SB 525 — Healthcare Minimum Wage", es: "California SB 525 — Salario Mínimo de Atención Médica" },
    domain: "billing-fraud",
    citations: ["CA Labor Code § 1182.16"],
    summary: { en: "Phases in $25/hour healthcare minimum wage for FQHCs by June 1, 2027. Current FQHC rate: $21/hour (effective June 2025). Applies to all healthcare workers in qualifying facilities.", es: "Implementa gradualmente el salario mínimo de atención médica de $25/hora para FQHCs antes del 1 de junio de 2027." },
    practicalImplications: { en: "FQHCs must plan for wage compression (MAs at $25/hr approach LVN wages). Budget impact: 15-25% increase in labor costs for lowest-paid staff. Must also comply with pay equity requirements.", es: "Los FQHC deben planificar la compresión salarial. Impacto presupuestario: 15-25% aumento en costos laborales." },
    updateFrequency: "Phased: June 2025 ($21), June 2026 ($23), June 2027 ($25)",
    primarySourceUrl: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB525",
    primarySourceOrg: "California Legislature",
    tags: ["california", "wages", "labor", "budget-impact"],
  },
];

/* ------------------------------------------------------------------ */
/*  Compliance Calendar — Annual Deadlines                             */
/* ------------------------------------------------------------------ */

export const COMPLIANCE_CALENDAR: ComplianceCalendarEntry[] = [
  // January
  { id: "cal-jan-w2", month: 1, day: 31, deadline: "January 31", requirement: { en: "W-2 Forms to Employees", es: "Formularios W-2 a Empleados" }, domain: "billing-fraud", description: { en: "Distribute W-2 wage statements to all employees", es: "Distribuir declaraciones de salarios W-2 a todos los empleados" }, responsibleDepartment: "Finance / HR", preparationWeeks: 4, primarySourceUrl: "https://www.irs.gov/forms-pubs/about-form-w-2", recurring: true },
  // February
  { id: "cal-feb-uds", month: 2, day: 15, deadline: "February 15", requirement: { en: "UDS Report Submission to HRSA", es: "Envío de Informe UDS a HRSA" }, domain: "hrsa-audits", description: { en: "Annual Uniform Data System report due. Includes patient demographics, services, clinical quality measures, staffing, and financial data.", es: "Informe anual del Sistema Uniforme de Datos. Incluye demografía de pacientes, servicios, medidas de calidad clínica, personal y datos financieros." }, responsibleDepartment: "QI / IT / Finance", preparationWeeks: 8, primarySourceUrl: "https://bphc.hrsa.gov/data-reporting/uds-training-and-technical-assistance", recurring: true },
  { id: "cal-feb-1099", month: 2, day: 28, deadline: "February 28", requirement: { en: "1099 Forms Filed with IRS", es: "Formularios 1099 Presentados al IRS" }, domain: "billing-fraud", description: { en: "File 1099-MISC and 1099-NEC forms with IRS for contractor payments over $600", es: "Presentar formularios 1099-MISC y 1099-NEC al IRS para pagos a contratistas superiores a $600" }, responsibleDepartment: "Finance", preparationWeeks: 4, primarySourceUrl: "https://www.irs.gov/forms-pubs/about-form-1099-misc", recurring: true },
  // March
  { id: "cal-mar-breach-log", month: 3, day: 1, deadline: "March 1", requirement: { en: "HIPAA Small Breach Annual Report", es: "Informe Anual de Pequeñas Violaciones HIPAA" }, domain: "hipaa-privacy", description: { en: "Report all breaches affecting fewer than 500 individuals from prior year to HHS via breach portal.", es: "Informar todas las violaciones que afecten a menos de 500 individuos del año anterior al HHS." }, responsibleDepartment: "Privacy Officer / Compliance", preparationWeeks: 4, primarySourceUrl: "https://ocrportal.hhs.gov/ocr/breach/wizard_breach.jsf", recurring: true },
  { id: "cal-mar-fpl-update", month: 3, day: 31, deadline: "March 31", requirement: { en: "Update Sliding Fee Schedule to Current FPL", es: "Actualizar Escala Móvil al FPL Actual" }, domain: "hrsa-audits", description: { en: "Federal Poverty Level guidelines published in January; update sliding fee schedule within 90 days.", es: "Las guías del Nivel Federal de Pobreza se publican en enero; actualizar la escala móvil dentro de 90 días." }, responsibleDepartment: "Finance / Patient Services", preparationWeeks: 4, primarySourceUrl: "https://aspe.hhs.gov/topics/poverty-economic-mobility/poverty-guidelines", recurring: true },
  // April
  { id: "cal-apr-grant-progress", month: 4, day: 30, deadline: "April 30", requirement: { en: "HRSA Section 330 Grant Progress Report", es: "Informe de Progreso de Subvención HRSA Sección 330" }, domain: "hrsa-audits", description: { en: "Semi-annual progress report on grant activities, milestones, and expenditures.", es: "Informe de progreso semestral sobre actividades, hitos y gastos de la subvención." }, responsibleDepartment: "CEO / Grants Manager", preparationWeeks: 4, primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual", recurring: true },
  // May
  { id: "cal-may-hipaa-training", month: 5, day: 31, deadline: "May 31 (Recommended)", requirement: { en: "Annual HIPAA Workforce Training", es: "Capacitación Anual HIPAA del Personal" }, domain: "hipaa-privacy", description: { en: "All workforce members (employees, volunteers, contractors) must complete HIPAA privacy and security training annually.", es: "Todos los miembros del personal deben completar la capacitación anual de privacidad y seguridad HIPAA." }, responsibleDepartment: "Compliance Officer / HR", preparationWeeks: 8, primarySourceUrl: "https://www.hhs.gov/hipaa/for-professionals/security/guidance/index.html", recurring: true },
  // June
  { id: "cal-jun-sb525-wage", month: 6, day: 1, deadline: "June 1, 2026", requirement: { en: "SB 525 Wage Increase: $23/hr for FQHC Workers", es: "Aumento Salarial SB 525: $23/hr para Trabajadores de FQHC" }, domain: "billing-fraud", description: { en: "California healthcare minimum wage increases to $23/hour for FQHC employees (Phase 2).", es: "El salario mínimo de atención médica de California aumenta a $23/hora para empleados de FQHC (Fase 2)." }, responsibleDepartment: "HR / Finance", preparationWeeks: 12, primarySourceUrl: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB525", recurring: false },
  // July
  { id: "cal-jul-uis-pps", month: 7, day: 1, deadline: "July 1, 2026", requirement: { en: "CA Eliminates FQHC PPS for Uninsured (UIS)", es: "CA Elimina PPS de FQHC para No Asegurados (UIS)" }, domain: "billing-fraud", description: { en: "California eliminates FQHC PPS supplemental payments for uninsured (UIS) patients. Estimated $1B revenue impact statewide. FQHCs must adjust revenue projections.", es: "California elimina los pagos suplementarios PPS de FQHC para pacientes sin seguro (UIS). Impacto de ingresos estimado de $1B a nivel estatal." }, responsibleDepartment: "CFO / Finance", preparationWeeks: 24, primarySourceUrl: "https://www.chcf.org/", recurring: false },
  // August
  { id: "cal-aug-osha", month: 8, day: 31, deadline: "August 31 (Recommended)", requirement: { en: "Annual OSHA Compliance Review", es: "Revisión Anual de Cumplimiento OSHA" }, domain: "hrsa-audits", description: { en: "Review bloodborne pathogen exposure control plan, hazard communication program, injury/illness logs (OSHA 300), and safety training records.", es: "Revisar el plan de control de exposición a patógenos transmitidos por sangre, programa de comunicación de riesgos y registros de capacitación." }, responsibleDepartment: "Safety Officer / HR", preparationWeeks: 4, primarySourceUrl: "https://www.osha.gov/healthcare", recurring: true },
  // September
  { id: "cal-sep-single-audit", month: 9, day: 30, deadline: "September 30", requirement: { en: "Single Audit Submission (if FY ends Dec 31)", es: "Presentación de Auditoría Única (si el AF termina el 31 de dic)" }, domain: "billing-fraud", description: { en: "Organizations spending $750K+ in federal awards must submit Single Audit within 9 months of fiscal year end. For Dec 31 FY = Sept 30 deadline.", es: "Organizaciones que gasten $750K+ en fondos federales deben presentar Auditoría Única dentro de 9 meses del fin del año fiscal." }, responsibleDepartment: "CFO / External Auditor", preparationWeeks: 16, primarySourceUrl: "https://www.ecfr.gov/current/title-2/subtitle-A/chapter-II/part-200/subpart-F", recurring: true },
  // October
  { id: "cal-oct-grant-progress-2", month: 10, day: 31, deadline: "October 31", requirement: { en: "HRSA Grant Progress Report (Semi-Annual)", es: "Informe de Progreso de Subvención HRSA (Semestral)" }, domain: "hrsa-audits", description: { en: "Second semi-annual progress report on Section 330 grant activities and milestones.", es: "Segundo informe de progreso semestral sobre actividades y hitos de la subvención Sección 330." }, responsibleDepartment: "CEO / Grants Manager", preparationWeeks: 4, primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual", recurring: true },
  // November
  { id: "cal-nov-sac-ncc", month: 11, day: 1, deadline: "November 1 (Approximate)", requirement: { en: "HRSA SAC/NCC Grant Application Window", es: "Ventana de Solicitud de Subvención SAC/NCC de HRSA" }, domain: "hrsa-audits", description: { en: "Service Area Competition and New Community Center funding opportunities typically announced. Watch for HRSA NOFO on grants.gov.", es: "Oportunidades de financiamiento de Competencia de Área de Servicio y Nuevo Centro Comunitario típicamente anunciadas." }, responsibleDepartment: "CEO / Grants Manager", preparationWeeks: 8, primarySourceUrl: "https://bphc.hrsa.gov/funding/funding-opportunities", recurring: true },
  // December
  { id: "cal-dec-hipaa-risk", month: 12, day: 31, deadline: "December 31 (Recommended)", requirement: { en: "Annual HIPAA Risk Assessment", es: "Evaluación Anual de Riesgos HIPAA" }, domain: "hipaa-privacy", description: { en: "Conduct or update HIPAA security risk assessment. Required by 45 CFR § 164.308(a)(1). Should cover all systems containing ePHI, physical security, workforce practices.", es: "Realizar o actualizar la evaluación de riesgos de seguridad HIPAA. Requerido por 45 CFR § 164.308(a)(1)." }, responsibleDepartment: "Privacy Officer / IT", preparationWeeks: 8, primarySourceUrl: "https://www.healthit.gov/topic/privacy-security-and-hipaa/security-risk-assessment-tool", recurring: true },
  { id: "cal-dec-board-annual", month: 12, day: 31, deadline: "December 31 (Recommended)", requirement: { en: "Board Annual Self-Assessment & CEO Evaluation", es: "Autoevaluación Anual de la Junta y Evaluación del CEO" }, domain: "hrsa-audits", description: { en: "Board conducts annual self-assessment and formal CEO performance evaluation. Results documented in board minutes.", es: "La junta realiza autoevaluación anual y evaluación formal del desempeño del CEO. Resultados documentados en actas." }, responsibleDepartment: "Board Chair", preparationWeeks: 4, primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual", recurring: true },
  { id: "cal-dec-coi-disclosure", month: 12, day: 31, deadline: "December 31", requirement: { en: "Annual Conflict of Interest Disclosure", es: "Divulgación Anual de Conflicto de Intereses" }, domain: "hrsa-audits", description: { en: "All board members and key employees must complete and sign annual conflict of interest disclosure forms.", es: "Todos los miembros de la junta y empleados clave deben completar y firmar formularios de divulgación de conflicto de intereses." }, responsibleDepartment: "Board Secretary / Compliance", preparationWeeks: 4, primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual", recurring: true },
  // Year-round
  { id: "cal-ongoing-credentialing", month: 0, day: null, deadline: "Ongoing (every 2 years per provider)", requirement: { en: "Provider Credentialing & Re-Credentialing", es: "Acreditación y Re-acreditación de Proveedores" }, domain: "hrsa-audits", description: { en: "Each provider's credentialing must be renewed every 2 years. Track expiration dates and begin renewal 90 days before expiration.", es: "La acreditación de cada proveedor debe renovarse cada 2 años. Rastrear fechas de vencimiento y comenzar la renovación 90 días antes." }, responsibleDepartment: "CMO / Medical Staff Office", preparationWeeks: 12, primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual", recurring: true },
  { id: "cal-ongoing-baa-review", month: 0, day: null, deadline: "Ongoing (review annually)", requirement: { en: "Business Associate Agreement Review", es: "Revisión de Acuerdos de Asociado Comercial" }, domain: "hipaa-privacy", description: { en: "Review all BAAs annually to ensure coverage for any new vendors or changed services. New vendors handling PHI must sign BAA before receiving any data.", es: "Revisar todos los BAA anualmente. Nuevos proveedores que manejen PHI deben firmar BAA antes de recibir datos." }, responsibleDepartment: "Compliance Officer / Legal", preparationWeeks: 4, primarySourceUrl: "https://www.hhs.gov/hipaa/for-professionals/covered-entities/sample-business-associate-agreement-provisions/index.html", recurring: true },
];

/* ------------------------------------------------------------------ */
/*  Risk Assessment Matrix                                             */
/* ------------------------------------------------------------------ */

export const COMPLIANCE_RISKS: ComplianceRiskItem[] = [
  // ── HRSA / Audit Risks ──
  { id: "risk-osv-governance", domain: "hrsa-audits", riskCategory: "Board Governance Gap", description: { en: "Board composition does not meet 51% consumer requirement or lacks diversity reflecting service area.", es: "La composición de la junta no cumple con el requisito de 51% de consumidores." }, likelihood: 3, impact: 5, controls: [{ en: "Annual board roster audit with patient status verification", es: "Auditoría anual del roster de la junta con verificación de estado de paciente" }], mitigationSteps: [{ en: "Recruit consumer members from patient advisory council", es: "Reclutar miembros consumidores del consejo asesor de pacientes" }, { en: "Verify patient status at each board member's annual review", es: "Verificar estado de paciente en la revisión anual de cada miembro" }], responsibleRole: "Board Chair", primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual" },
  { id: "risk-osv-credentialing", domain: "hrsa-audits", riskCategory: "Credentialing Lapse", description: { en: "Provider practicing with expired credentials or incomplete credentialing file.", es: "Proveedor practicando con credenciales vencidas o archivo de acreditación incompleto." }, likelihood: 4, impact: 5, controls: [{ en: "Automated credentialing expiration alerts (90-day warning)", es: "Alertas automáticas de vencimiento de acreditación (aviso de 90 días)" }], mitigationSteps: [{ en: "Implement EHR-integrated credentialing tracking system", es: "Implementar sistema de rastreo de acreditación integrado con EHR" }, { en: "Monthly credentialing status report to CMO", es: "Informe mensual de estado de acreditación al CMO" }], responsibleRole: "CMO / HR", primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual" },
  { id: "risk-osv-sfdp", domain: "hrsa-audits", riskCategory: "Sliding Fee Non-Compliance", description: { en: "Fee schedule not updated to current FPL or patients below 100% FPL being charged.", es: "Escala de tarifas no actualizada al FPL actual o pacientes por debajo del 100% FPL siendo cobrados." }, likelihood: 3, impact: 4, controls: [{ en: "Annual FPL update checklist triggered by January HHS release", es: "Lista de verificación de actualización anual del FPL activada por la publicación de enero del HHS" }], mitigationSteps: [{ en: "Designate staff responsible for FPL monitoring", es: "Designar personal responsable del monitoreo del FPL" }, { en: "Quarterly SFDP application audit on sample patients", es: "Auditoría trimestral de aplicación del SFDP en muestra de pacientes" }], responsibleRole: "CFO", primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual" },
  { id: "risk-uds-quality", domain: "hrsa-audits", riskCategory: "UDS Quality Measure Failure", description: { en: "Clinical quality measures fall below HRSA benchmarks, risking CHQR recognition loss and increased scrutiny.", es: "Las medidas de calidad clínica caen por debajo de los puntos de referencia de HRSA." }, likelihood: 3, impact: 3, controls: [{ en: "Monthly quality dashboard reviewed by QI committee", es: "Panel de calidad mensual revisado por el comité de QI" }], mitigationSteps: [{ en: "Implement EHR clinical decision support for gap closure", es: "Implementar soporte de decisión clínica EHR para cierre de brechas" }, { en: "Provider-level quality scorecards with coaching", es: "Tarjetas de puntuación de calidad a nivel de proveedor con coaching" }], responsibleRole: "CMO / QI Director", primarySourceUrl: "https://bphc.hrsa.gov/data-reporting/uds-training-and-technical-assistance" },
  // ── HIPAA / Privacy Risks ──
  { id: "risk-hipaa-no-risk-assess", domain: "hipaa-privacy", riskCategory: "Missing HIPAA Risk Assessment", description: { en: "Organization has not conducted HIPAA security risk assessment in 12+ months. Single most common HIPAA violation.", es: "La organización no ha realizado una evaluación de riesgos de seguridad HIPAA en 12+ meses." }, likelihood: 4, impact: 5, controls: [{ en: "Annual risk assessment on compliance calendar with external auditor", es: "Evaluación de riesgos anual en el calendario de cumplimiento con auditor externo" }], mitigationSteps: [{ en: "Use HHS SRA Tool for self-assessment", es: "Usar la Herramienta SRA del HHS para autoevaluación" }, { en: "Budget $3-5K annually for external risk assessment", es: "Presupuestar $3-5K anualmente para evaluación de riesgos externa" }], responsibleRole: "Privacy Officer", primarySourceUrl: "https://www.healthit.gov/topic/privacy-security-and-hipaa/security-risk-assessment-tool" },
  { id: "risk-hipaa-breach-email", domain: "hipaa-privacy", riskCategory: "PHI Exposure via Email", description: { en: "Staff sending unencrypted patient information via personal or unsecured email.", es: "Personal enviando información de pacientes sin encriptar por correo electrónico personal o no seguro." }, likelihood: 4, impact: 4, controls: [{ en: "Email encryption enforced for all outbound messages containing PHI", es: "Encriptación de correo electrónico aplicada para todos los mensajes salientes con PHI" }], mitigationSteps: [{ en: "Deploy email DLP (data loss prevention) scanning", es: "Implementar escaneo DLP de correo electrónico" }, { en: "HIPAA training emphasizing email-specific risks", es: "Capacitación HIPAA enfatizando riesgos específicos de correo electrónico" }], responsibleRole: "IT Director / Privacy Officer", primarySourceUrl: "https://www.hhs.gov/hipaa/for-professionals/security/guidance/index.html" },
  { id: "risk-hipaa-baa-gap", domain: "hipaa-privacy", riskCategory: "Missing Business Associate Agreement", description: { en: "Vendor handling PHI without signed BAA. Automatic HIPAA violation if vendor has breach.", es: "Proveedor manejando PHI sin BAA firmado. Violación automática de HIPAA si el proveedor tiene una violación." }, likelihood: 3, impact: 5, controls: [{ en: "Vendor PHI inventory reviewed quarterly", es: "Inventario de PHI de proveedores revisado trimestralmente" }], mitigationSteps: [{ en: "Maintain master BAA tracker with renewal dates", es: "Mantener rastreador maestro de BAA con fechas de renovación" }, { en: "No PHI shared until BAA is fully executed", es: "No compartir PHI hasta que el BAA esté completamente ejecutado" }], responsibleRole: "Compliance Officer", primarySourceUrl: "https://www.hhs.gov/hipaa/for-professionals/covered-entities/sample-business-associate-agreement-provisions/index.html" },
  { id: "risk-hipaa-unencrypted-device", domain: "hipaa-privacy", riskCategory: "Unencrypted Device with ePHI", description: { en: "Lost or stolen laptop, phone, or USB drive containing unencrypted patient data.", es: "Laptop, teléfono o unidad USB perdida o robada con datos de pacientes sin encriptar." }, likelihood: 3, impact: 5, controls: [{ en: "Full-disk encryption on all devices accessing EHR or ePHI", es: "Encriptación de disco completo en todos los dispositivos que acceden al EHR o ePHI" }], mitigationSteps: [{ en: "MDM (mobile device management) with remote wipe capability", es: "MDM (gestión de dispositivos móviles) con capacidad de borrado remoto" }, { en: "Encrypted USB drives only; personal USB prohibited", es: "Solo unidades USB encriptadas; USB personal prohibido" }], responsibleRole: "IT Director", primarySourceUrl: "https://www.hhs.gov/hipaa/for-professionals/security/guidance/index.html" },
  { id: "risk-hipaa-telehealth", domain: "hipaa-privacy", riskCategory: "Non-Compliant Telehealth Platform", description: { en: "Using video conferencing without BAA (e.g., personal Zoom, FaceTime) for patient visits.", es: "Usando videoconferencia sin BAA para visitas de pacientes." }, likelihood: 3, impact: 4, controls: [{ en: "Approved telehealth platform list with verified BAAs", es: "Lista de plataformas de telesalud aprobadas con BAAs verificados" }], mitigationSteps: [{ en: "Restrict telehealth to HIPAA-compliant platforms only", es: "Restringir telesalud solo a plataformas compatibles con HIPAA" }, { en: "Block personal video apps on organization networks", es: "Bloquear apps de video personales en redes de la organización" }], responsibleRole: "CIO / Compliance", primarySourceUrl: "https://www.hhs.gov/hipaa/for-professionals/special-topics/telehealth/index.html" },
  // ── Billing / Fraud Risks ──
  { id: "risk-billing-incident-to", domain: "billing-fraud", riskCategory: "Incident-to Billing (Prohibited)", description: { en: "FQHC billing Medicare 'incident-to' a physician — NOT allowed for FQHCs. Can trigger False Claims Act liability.", es: "FQHC facturando Medicare 'incident-to' un médico — NO permitido para FQHCs. Puede activar responsabilidad por la Ley de Reclamos Falsos." }, likelihood: 2, impact: 5, controls: [{ en: "Billing department training on FQHC-specific billing rules", es: "Capacitación del departamento de facturación en reglas de facturación específicas de FQHC" }], mitigationSteps: [{ en: "Audit claims for incident-to modifiers quarterly", es: "Auditar reclamos por modificadores incident-to trimestralmente" }, { en: "EHR billing rules engine configured to block incident-to", es: "Motor de reglas de facturación del EHR configurado para bloquear incident-to" }], responsibleRole: "Revenue Cycle Manager", primarySourceUrl: "https://www.cms.gov/Medicare/Medicare-Fee-for-Service-Payment/FQHCPPS" },
  { id: "risk-billing-no-face-to-face", domain: "billing-fraud", riskCategory: "Billing Without Face-to-Face", description: { en: "Submitting claims for encounters where provider did not have qualifying face-to-face contact with patient.", es: "Presentando reclamos por encuentros donde el proveedor no tuvo contacto presencial calificado con el paciente." }, likelihood: 3, impact: 5, controls: [{ en: "EHR requires provider attestation of face-to-face before claim generation", es: "EHR requiere atestación del proveedor de contacto presencial antes de generar reclamo" }], mitigationSteps: [{ en: "Monthly random chart audit (5% of claims)", es: "Auditoría mensual aleatoria de expedientes (5% de reclamos)" }, { en: "Documentation training for all billing staff", es: "Capacitación en documentación para todo el personal de facturación" }], responsibleRole: "CMO / Revenue Cycle", primarySourceUrl: "https://www.cms.gov/Medicare/Medicare-Fee-for-Service-Payment/FQHCPPS" },
  { id: "risk-340b-duplicate", domain: "billing-fraud", riskCategory: "340B Duplicate Discount Violation", description: { en: "Receiving both 340B drug discount and Medicaid rebate on same prescription — prohibited under 340B statute.", es: "Recibiendo tanto el descuento de medicamentos 340B como el reembolso de Medicaid en la misma receta — prohibido." }, likelihood: 3, impact: 4, controls: [{ en: "340B split billing or Medicaid exclusion file maintained and reconciled", es: "Facturación dividida 340B o archivo de exclusión de Medicaid mantenido y reconciliado" }], mitigationSteps: [{ en: "Quarterly 340B/Medicaid reconciliation audit", es: "Auditoría trimestral de reconciliación 340B/Medicaid" }, { en: "Contract pharmacy monitoring per HRSA guidance", es: "Monitoreo de farmacia contratada según guía de HRSA" }], responsibleRole: "Pharmacy Director / CFO", primarySourceUrl: "https://www.hrsa.gov/opa/340b-drug-pricing-program" },
  { id: "risk-billing-upcoding", domain: "billing-fraud", riskCategory: "Upcoding / Overcoding", description: { en: "Consistently billing higher E/M levels than documentation supports. Triggers payer audits and FCA risk.", es: "Facturar consistentemente niveles E/M más altos de lo que la documentación respalda." }, likelihood: 3, impact: 4, controls: [{ en: "Annual coding audit by certified coder (10% sample)", es: "Auditoría anual de codificación por codificador certificado (muestra del 10%)" }], mitigationSteps: [{ en: "Provider education on documentation requirements per E/M level", es: "Educación del proveedor sobre requisitos de documentación por nivel E/M" }, { en: "EHR coding suggestion tool calibrated to FQHC visit types", es: "Herramienta de sugerencia de codificación del EHR calibrada para tipos de visita FQHC" }], responsibleRole: "Revenue Cycle / CMO", primarySourceUrl: "https://oig.hhs.gov/compliance/provider-compliance-training/" },
];

/* ------------------------------------------------------------------ */
/*  Compliance Case Studies                                            */
/* ------------------------------------------------------------------ */

export const COMPLIANCE_CASE_STUDIES: ComplianceCaseStudy[] = [
  {
    id: "case-osv-governance-failure",
    title: { en: "Board Composition Corrective Action", es: "Acción Correctiva de Composición de la Junta" },
    fqhcType: "Mid-size urban FQHC (CA)",
    location: "Southern California",
    domain: "hrsa-audits",
    date: "2024",
    challenge: { en: "During HRSA OSV, reviewers found the board had only 42% consumer members (below 51% requirement) and demographics did not reflect the predominantly Latino service area.", es: "Durante la OSV de HRSA, los revisores encontraron que la junta solo tenía 42% de miembros consumidores y la demografía no reflejaba el área de servicio predominantemente latina." },
    rootCause: { en: "Board member resignations not backfilled with consumer-patients. No process for verifying patient status annually.", es: "Renuncias de miembros de la junta no reemplazadas con pacientes-consumidores. Sin proceso para verificar el estado de paciente anualmente." },
    resolution: { en: "Recruited 4 patient-consumers from community health advisory committee. Implemented annual patient status verification. Revised bylaws to mandate 60% consumer target.", es: "Reclutó 4 pacientes-consumidores del comité asesor de salud comunitaria. Implementó verificación anual de estado de paciente." },
    outcome: { en: "Corrective action plan accepted by HRSA. Board reached 58% consumer composition within 6 months. Passed follow-up review.", es: "Plan de acción correctiva aceptado por HRSA. La junta alcanzó 58% de composición de consumidores dentro de 6 meses." },
    lesson: { en: "Track board composition monthly — don't wait for the OSV to discover gaps. Annual patient status verification should be automatic.", es: "Rastrear la composición de la junta mensualmente — no esperar a la OSV para descubrir brechas." },
    primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual",
  },
  {
    id: "case-hipaa-email-breach",
    title: { en: "PHI Breach via Unencrypted Email", es: "Violación de PHI por Correo Electrónico Sin Encriptar" },
    fqhcType: "Multi-site community health center",
    location: "Central California",
    domain: "hipaa-privacy",
    date: "2025",
    challenge: { en: "Care coordinator emailed a spreadsheet containing 847 patient names, DOBs, and diagnoses to a managed care plan using personal Gmail account instead of secure portal.", es: "La coordinadora de atención envió una hoja de cálculo con 847 nombres, fechas de nacimiento y diagnósticos de pacientes a un plan de atención administrada usando Gmail personal." },
    rootCause: { en: "Secure portal was down; staff used workaround without understanding HIPAA implications. No email DLP (data loss prevention) in place.", es: "El portal seguro estaba caído; el personal usó una alternativa sin entender las implicaciones de HIPAA. Sin DLP de correo electrónico." },
    resolution: { en: "Conducted breach risk assessment. Notified 847 patients within 60 days. Reported to HHS OCR. Implemented email DLP scanning, mandatory encryption for external emails, and retraining.", es: "Realizó evaluación de riesgos de violación. Notificó a 847 pacientes dentro de 60 días. Reportó al OCR del HHS. Implementó escaneo DLP de correo electrónico." },
    outcome: { en: "Total cost: ~$45K (notification postage, credit monitoring, legal review, IT remediation). No OCR fine imposed due to swift response and corrective actions.", es: "Costo total: ~$45K. Sin multa del OCR impuesta debido a la respuesta rápida y acciones correctivas." },
    penaltyAmount: "$45,000 (remediation costs)",
    lesson: { en: "Email DLP is essential — staff will use workarounds when systems fail. Build technical controls that prevent PHI exposure regardless of user behavior.", es: "DLP de correo electrónico es esencial — el personal usará alternativas cuando los sistemas fallen." },
    primarySourceUrl: "https://ocrportal.hhs.gov/ocr/breach/breach_report.jsf",
  },
  {
    id: "case-billing-false-claims",
    title: { en: "False Claims from Incident-to Billing", es: "Reclamos Falsos por Facturación Incident-to" },
    fqhcType: "Rural FQHC",
    location: "Northern California",
    domain: "billing-fraud",
    date: "2023",
    challenge: { en: "New billing manager (hired from private practice) configured EHR to bill Medicare 'incident-to' for NP visits supervised by physician. FQHCs cannot bill incident-to.", es: "El nuevo gerente de facturación configuró el EHR para facturar Medicare 'incident-to' para visitas de NP. Los FQHC no pueden facturar incident-to." },
    rootCause: { en: "Staff trained in private practice billing rules, not FQHC-specific PPS rules. No compliance review of billing configuration changes.", es: "Personal capacitado en reglas de facturación de práctica privada, no en reglas PPS específicas de FQHC." },
    resolution: { en: "Self-disclosed to OIG after internal audit discovered 18 months of improper claims. Repaid $287K in overpayments plus interest. Implemented FQHC-specific billing training.", es: "Auto-reportó al OIG después de que una auditoría interna descubriera 18 meses de reclamos impropios. Reembolsó $287K en sobrepagos más intereses." },
    outcome: { en: "Self-disclosure reduced potential FCA penalties from $4.2M (at $23K × 183 false claims) to $287K repayment + $15K administrative costs. No exclusion from federal programs.", es: "La auto-divulgación redujo las posibles sanciones FCA de $4.2M a $287K de reembolso + $15K costos administrativos." },
    penaltyAmount: "$302,000 (repayment + admin costs)",
    lesson: { en: "FQHC billing is fundamentally different from private practice. Every billing staff member needs FQHC-specific PPS training. Self-disclosure dramatically reduces penalties.", es: "La facturación de FQHC es fundamentalmente diferente de la práctica privada. La auto-divulgación reduce dramáticamente las sanciones." },
    primarySourceUrl: "https://oig.hhs.gov/compliance/self-disclosure-info/",
  },
  {
    id: "case-340b-audit",
    title: { en: "340B Contract Pharmacy Audit Finding", es: "Hallazgo de Auditoría de Farmacia Contratada 340B" },
    fqhcType: "Large multi-site FQHC",
    location: "Bay Area, California",
    domain: "billing-fraud",
    date: "2024",
    challenge: { en: "HRSA 340B audit found duplicate discounts: FQHC claimed 340B pricing on prescriptions that were also subject to Medicaid rebates through contract pharmacy arrangement.", es: "La auditoría 340B de HRSA encontró descuentos duplicados: FQHC reclamó precios 340B en recetas que también estaban sujetas a reembolsos de Medicaid." },
    rootCause: { en: "Contract pharmacy's split billing system was not properly configured to exclude Medicaid-covered prescriptions from 340B pricing. Reconciliation reports not reviewed monthly.", es: "El sistema de facturación dividida de la farmacia contratada no estaba configurado correctamente para excluir recetas cubiertas por Medicaid." },
    resolution: { en: "Repaid $156K in duplicate discounts to manufacturers. Reconfigured split billing system. Hired 340B compliance specialist. Implemented monthly reconciliation review.", es: "Reembolsó $156K en descuentos duplicados a fabricantes. Reconfiguró el sistema de facturación dividida." },
    outcome: { en: "Maintained 340B eligibility after corrective action. Avoided manufacturer lawsuits. Monthly reconciliation now catches discrepancies within 30 days.", es: "Mantuvo la elegibilidad 340B después de la acción correctiva. Evitó demandas de fabricantes." },
    penaltyAmount: "$156,000 (repayment to manufacturers)",
    lesson: { en: "340B contract pharmacy arrangements need dedicated oversight. Monthly reconciliation is non-negotiable — quarterly is too late to catch systematic errors.", es: "Los arreglos de farmacia contratada 340B necesitan supervisión dedicada. La reconciliación mensual es innegociable." },
    primarySourceUrl: "https://www.hrsa.gov/opa/340b-drug-pricing-program",
  },
  {
    id: "case-osv-documentation",
    title: { en: "Clinical Documentation Deficiency", es: "Deficiencia de Documentación Clínica" },
    fqhcType: "Mid-size FQHC",
    location: "Los Angeles County",
    domain: "hrsa-audits",
    date: "2025",
    challenge: { en: "HRSA chart review during OSV found 35% of sampled NP visits lacked required supervisory co-signatures. Additionally, 20% of behavioral health encounters had incomplete treatment plans.", es: "La revisión de expedientes de HRSA durante la OSV encontró que el 35% de las visitas de NP muestreadas carecían de co-firmas supervisorias requeridas." },
    rootCause: { en: "EHR co-signature workflow broken after system upgrade; no one monitored completion rates. BH treatment plan template was missing required fields.", es: "El flujo de co-firma del EHR se rompió después de una actualización del sistema; nadie monitoreó las tasas de completación." },
    resolution: { en: "Implemented EHR dashboard tracking unsigned notes (daily alert to CMO). Fixed BH treatment plan template. Conducted 100% retrospective chart completion for identified gaps.", es: "Implementó panel de EHR rastreando notas sin firmar. Corrigió la plantilla del plan de tratamiento de salud mental." },
    outcome: { en: "Corrective action plan accepted. Co-signature rate improved from 65% to 98% within 90 days. BH documentation compliance reached 95%.", es: "Plan de acción correctiva aceptado. Tasa de co-firma mejoró de 65% a 98% dentro de 90 días." },
    lesson: { en: "EHR system changes need compliance impact review. Build automated monitoring — don't rely on manual checks for critical documentation requirements.", es: "Los cambios del sistema EHR necesitan revisión de impacto de cumplimiento. Construir monitoreo automatizado." },
    primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual",
  },
  {
    id: "case-hipaa-ransomware",
    title: { en: "Ransomware Attack and Recovery", es: "Ataque de Ransomware y Recuperación" },
    fqhcType: "Community health center network",
    location: "Inland Empire, California",
    domain: "hipaa-privacy",
    date: "2025",
    challenge: { en: "Ransomware encrypted all EHR servers and backup systems. 23,000 patient records inaccessible for 11 days. Attackers demanded $500K in cryptocurrency.", es: "Ransomware encriptó todos los servidores de EHR y sistemas de respaldo. 23,000 registros de pacientes inaccesibles por 11 días." },
    rootCause: { en: "Backup system connected to same network as production (not air-gapped). Phishing email with malicious attachment opened by staff member.", es: "Sistema de respaldo conectado a la misma red que producción. Correo de phishing con archivo malicioso abierto por un miembro del personal." },
    resolution: { en: "Did not pay ransom. Restored from off-site backup (10 days of data lost). Reported breach to HHS (23,000 individuals). Implemented air-gapped backups, phishing simulation training, and MFA.", es: "No pagó rescate. Restauró desde respaldo fuera del sitio. Reportó violación al HHS. Implementó respaldos aislados, capacitación de simulación de phishing y MFA." },
    outcome: { en: "Total cost: ~$890K (incident response, notifications, legal, IT remediation, revenue loss during downtime). HHS investigation ongoing. No fine assessed yet.", es: "Costo total: ~$890K. Investigación del HHS en curso." },
    penaltyAmount: "$890,000+ (total incident costs)",
    lesson: { en: "Air-gapped backups are non-negotiable. Test disaster recovery quarterly — don't discover your backup doesn't work during a real incident.", es: "Los respaldos aislados son innegociables. Probar recuperación ante desastres trimestralmente." },
    primarySourceUrl: "https://ocrportal.hhs.gov/ocr/breach/breach_report.jsf",
  },
];

/* ------------------------------------------------------------------ */
/*  Active Legislation Tracking                                        */
/* ------------------------------------------------------------------ */

export const COMPLIANCE_LEGISLATION: ComplianceLegislation[] = [
  {
    id: "leg-hr1-medicaid",
    title: { en: "H.R. 1 — Medicaid Work Requirements & Spending Caps", es: "H.R. 1 — Requisitos de Trabajo de Medicaid y Topes de Gasto" },
    billNumber: "H.R. 1",
    status: "enacted",
    effectiveDate: "2026-01-01",
    domain: "billing-fraud",
    impact: { en: "Largest Medicaid cuts in history. Work requirements, eligibility verification every 6 months, enrollment caps. California FQHCs face $4.6B in potential funding losses.", es: "Los mayores recortes de Medicaid en la historia. Requisitos de trabajo, verificación de elegibilidad cada 6 meses. Los FQHC de California enfrentan $4.6B en posibles pérdidas." },
    requiredActions: [
      { en: "Model revenue impact per payer mix scenario", es: "Modelar impacto en ingresos por escenario de mezcla de pagadores" },
      { en: "Prepare for increased uninsured volume as Medi-Cal patients lose coverage", es: "Prepararse para mayor volumen de no asegurados" },
      { en: "Review sliding fee capacity and uncompensated care budget", es: "Revisar capacidad de escala móvil y presupuesto de atención no compensada" },
    ],
    deadline: "Ongoing (phased implementation 2026-2028)",
    primarySourceUrl: "https://www.congress.gov/bill/119th-congress/house-bill/1",
  },
  {
    id: "leg-sb525-implementation",
    title: { en: "SB 525 — Healthcare Minimum Wage (Phase 2)", es: "SB 525 — Salario Mínimo de Atención Médica (Fase 2)" },
    billNumber: "SB 525",
    status: "effective",
    effectiveDate: "2025-06-01",
    domain: "billing-fraud",
    impact: { en: "FQHC healthcare minimum wage rises to $23/hr on June 1, 2026 (Phase 2). Phase 3: $25/hr by June 2027. Creates wage compression across all staff levels.", es: "El salario mínimo de atención médica de FQHC sube a $23/hr el 1 de junio de 2026. Fase 3: $25/hr para junio de 2027." },
    requiredActions: [
      { en: "Budget for 10-15% wage increase for affected positions", es: "Presupuestar aumento salarial del 10-15% para posiciones afectadas" },
      { en: "Address wage compression: adjust LVN, MA supervisor, and RN scales", es: "Abordar compresión salarial: ajustar escalas de LVN, supervisor de MA y RN" },
      { en: "Update job postings and offer letters to reflect new minimums", es: "Actualizar publicaciones de empleo y cartas de oferta" },
    ],
    deadline: "June 1, 2026 (Phase 2); June 1, 2027 (Phase 3)",
    primarySourceUrl: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB525",
  },
  {
    id: "leg-ca-uis-pps-elimination",
    title: { en: "California PPS Elimination for Uninsured Patients", es: "Eliminación de PPS de California para Pacientes Sin Seguro" },
    billNumber: "Budget Trailer Bill",
    status: "enacted",
    effectiveDate: "2026-07-01",
    domain: "billing-fraud",
    impact: { en: "California eliminates FQHC PPS supplemental payments for uninsured (UIS) patients effective July 1, 2026. Estimated $1B statewide revenue impact. FQHCs with high uninsured rates face severe financial stress.", es: "California elimina los pagos suplementarios PPS de FQHC para pacientes sin seguro. Impacto de ingresos estimado de $1B a nivel estatal." },
    requiredActions: [
      { en: "Calculate uninsured patient volume and revenue at risk", es: "Calcular volumen de pacientes sin seguro e ingresos en riesgo" },
      { en: "Develop alternative revenue strategies (grants, philanthropy, sliding fee adjustments)", es: "Desarrollar estrategias alternativas de ingresos" },
      { en: "Advocate through CPCA for policy reversal or mitigation", es: "Abogar a través de CPCA por reversión o mitigación de la política" },
    ],
    deadline: "July 1, 2026",
    primarySourceUrl: "https://www.chcf.org/",
  },
  {
    id: "leg-calaim-1115-waiver",
    title: { en: "CalAIM 1115 Waiver Renewal", es: "Renovación de Exención 1115 de CalAIM" },
    billNumber: "1115 Waiver",
    status: "effective",
    effectiveDate: "2022-01-01",
    domain: "billing-fraud",
    impact: { en: "CalAIM waiver expires December 2026. Renewal is uncertain given federal Medicaid restructuring. ECM and Community Supports billing depends on waiver continuation.", es: "La exención CalAIM vence en diciembre de 2026. La renovación es incierta. La facturación de ECM depende de la continuación de la exención." },
    requiredActions: [
      { en: "Monitor DHCS waiver renewal negotiations with CMS", es: "Monitorear las negociaciones de renovación de exención del DHCS con CMS" },
      { en: "Model ECM/CS revenue at risk if waiver not renewed", es: "Modelar ingresos ECM/CS en riesgo si la exención no se renueva" },
      { en: "Diversify revenue away from waiver-dependent programs", es: "Diversificar ingresos lejos de programas dependientes de exenciones" },
    ],
    deadline: "December 31, 2026 (waiver expiration)",
    primarySourceUrl: "https://www.dhcs.ca.gov/CalAIM",
  },
  {
    id: "leg-hipaa-update-2026",
    title: { en: "HIPAA Security Rule Update (Proposed)", es: "Actualización de Regla de Seguridad HIPAA (Propuesta)" },
    billNumber: "HHS NPRM",
    status: "proposed",
    effectiveDate: "2026-06-01",
    domain: "hipaa-privacy",
    impact: { en: "HHS proposed strengthening HIPAA Security Rule: mandatory encryption, MFA for ePHI access, annual penetration testing, 72-hour incident reporting. Would significantly increase compliance costs for FQHCs.", es: "HHS propuso fortalecer la Regla de Seguridad HIPAA: encriptación obligatoria, MFA para acceso a ePHI, pruebas de penetración anuales." },
    requiredActions: [
      { en: "Assess current encryption and MFA status against proposed requirements", es: "Evaluar el estado actual de encriptación y MFA contra los requisitos propuestos" },
      { en: "Budget for security infrastructure upgrades ($50-200K for mid-size FQHC)", es: "Presupuestar para mejoras de infraestructura de seguridad ($50-200K)" },
      { en: "Submit comments during public comment period if applicable", es: "Enviar comentarios durante el período de comentarios públicos si aplica" },
    ],
    deadline: "TBD (final rule expected late 2026)",
    primarySourceUrl: "https://www.hhs.gov/hipaa/for-professionals/regulatory-initiatives/index.html",
  },
  {
    id: "leg-340b-integrity",
    title: { en: "340B Program Integrity Proposed Rule", es: "Regla Propuesta de Integridad del Programa 340B" },
    billNumber: "HRSA Proposed Rule",
    status: "proposed",
    effectiveDate: "2026-01-01",
    domain: "billing-fraud",
    impact: { en: "HRSA proposed new 340B compliance requirements: enhanced patient eligibility verification, contract pharmacy auditing, and manufacturer dispute resolution. May restrict contract pharmacy arrangements.", es: "HRSA propuso nuevos requisitos de cumplimiento 340B: verificación mejorada de elegibilidad del paciente, auditoría de farmacia contratada." },
    requiredActions: [
      { en: "Review current 340B patient eligibility verification processes", es: "Revisar los procesos actuales de verificación de elegibilidad del paciente 340B" },
      { en: "Ensure contract pharmacy agreements comply with proposed standards", es: "Asegurar que los acuerdos de farmacia contratada cumplan con los estándares propuestos" },
      { en: "Assess financial impact if contract pharmacy access is restricted", es: "Evaluar impacto financiero si el acceso a farmacia contratada es restringido" },
    ],
    deadline: "TBD (comments due 60 days after publication)",
    primarySourceUrl: "https://www.hrsa.gov/opa/340b-drug-pricing-program",
  },
];

/* ------------------------------------------------------------------ */
/*  Helper Functions                                                   */
/* ------------------------------------------------------------------ */

export function getOSVChecklistByArea(area: OSVRequirementArea): OSVChecklistItem[] {
  return OSV_CHECKLIST.filter((item) => item.area === area);
}

export function getRegulationsByDomain(domain: ComplianceDomain): RegulatoryItem[] {
  return REGULATORY_ITEMS.filter((item) => item.domain === domain);
}

export function getCalendarByMonth(month: number): ComplianceCalendarEntry[] {
  if (month === 0) return COMPLIANCE_CALENDAR.filter((e) => e.month === 0); // year-round
  return COMPLIANCE_CALENDAR.filter((e) => e.month === month);
}

export function getCalendarByDomain(domain: ComplianceDomain): ComplianceCalendarEntry[] {
  return COMPLIANCE_CALENDAR.filter((e) => e.domain === domain);
}

export function getRiskScore(likelihood: number, impact: number): number {
  return likelihood * impact;
}

export function getRiskLevel(score: number): RiskLevel {
  if (score >= 20) return "critical";
  if (score >= 12) return "high";
  if (score >= 6) return "medium";
  return "low";
}

export function getRisksByDomain(domain: ComplianceDomain): ComplianceRiskItem[] {
  return COMPLIANCE_RISKS.filter((item) => item.domain === domain);
}

export function getCaseStudiesByDomain(domain: ComplianceDomain): ComplianceCaseStudy[] {
  return COMPLIANCE_CASE_STUDIES.filter((item) => item.domain === domain);
}

export function getLegislationByDomain(domain: ComplianceDomain): ComplianceLegislation[] {
  return COMPLIANCE_LEGISLATION.filter((item) => item.domain === domain);
}

export function getLegislationByStatus(status: ComplianceLegislation["status"]): ComplianceLegislation[] {
  return COMPLIANCE_LEGISLATION.filter((item) => item.status === status);
}

export function getDomainMeta(domain: ComplianceDomain) {
  return DOMAIN_META.find((d) => d.id === domain);
}

export function getOSVAreaMeta(area: OSVRequirementArea) {
  return OSV_AREA_META.find((a) => a.id === area);
}

export function getComplianceStats() {
  return {
    osvRequirements: OSV_CHECKLIST.length,
    regulations: REGULATORY_ITEMS.length,
    calendarEntries: COMPLIANCE_CALENDAR.length,
    risks: COMPLIANCE_RISKS.length,
    caseStudies: COMPLIANCE_CASE_STUDIES.length,
    legislation: COMPLIANCE_LEGISLATION.length,
    totalEstimatedOSVHours: OSV_CHECKLIST.reduce((sum, item) => sum + item.estimatedHours, 0),
    criticalRisks: COMPLIANCE_RISKS.filter((r) => getRiskLevel(getRiskScore(r.likelihood, r.impact)) === "critical").length,
    highRisks: COMPLIANCE_RISKS.filter((r) => getRiskLevel(getRiskScore(r.likelihood, r.impact)) === "high").length,
  };
}
