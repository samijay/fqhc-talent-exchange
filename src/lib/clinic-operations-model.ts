// Clinic Operations Model — financial simulation engine for CA FQHC staffing & revenue
// Sources: CMS FQHC PPS rules, CA DHCS PPS rates, NACHC billing guides, HRSA BPHC
// Last updated: 2026-03-03

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface StaffingInput {
  physicians: number; // MD/DO
  nps: number; // Nurse Practitioners
  pas: number; // Physician Assistants
  rns: number; // Registered Nurses
  mas: number; // Medical Assistants
  chws: number; // Community Health Workers
  bhProviders: number; // LCSW / Psychologist
  dentalProviders: number; // Dentists
}

export interface ScheduleInput {
  hoursPerDay: number; // 8-12
  daysPerWeek: number; // 4-6
  encountersPerProviderPerDay: number; // 8-24
  noShowRate: number; // 0-30 (percent)
}

export interface RevenueInput {
  ppsRate: number; // $150-$400
  coVisitRate: number; // 0-40 (percent of visits that generate co-visit)
  bhSameDayRate: number; // 0-30 (percent of visits with BH warm handoff)
  ecmEnrollmentRate: number; // 0-20 (percent of panel in ECM)
  regionalMultiplier: number; // 0.88-1.15
}

export interface DiseaseInput {
  diabeticPercent: number; // 0-40
  htnPercent: number; // 0-50
  depressionPercent: number; // 0-30 (screening positive)
  copdPercent: number; // 0-15
}

export interface SimulatorInputs {
  staffing: StaffingInput;
  schedule: ScheduleInput;
  revenue: RevenueInput;
  disease: DiseaseInput;
  sizePreset: "mid-size" | "small" | "large" | "custom";
}

export interface SimulatorOutput {
  // Volume
  billableProvidersCount: number;
  totalEncountersPerDay: number;
  totalEncountersPerMonth: number;
  totalEncountersPerYear: number;
  coVisitEncountersPerYear: number;
  bhEncountersPerYear: number;
  ecmEncountersPerYear: number;

  // Revenue
  basePPSRevenue: number;
  coVisitRevenue: number;
  bhRevenue: number;
  ecmRevenue: number;
  ccmRevenue: number;
  totalAnnualRevenue: number;
  revenuePerEncounter: number;

  // Cost
  annualPayroll: number;
  payrollBreakdown: { role: string; count: number; totalCost: number }[];
  annualOverhead: number;
  totalAnnualCost: number;

  // Efficiency
  netMargin: number;
  netMarginPercent: number;
  costPerEncounter: number;
  revenuePerProvider: number;

  // Provider-of-the-Day Analysis
  potd: POTDAnalysis;
}

export interface POTDAnalysis {
  scenarioA: {
    label: { en: string; es: string };
    encountersPerDay: number;
    revenuePerDay: number;
    revenuePerYear: number;
  };
  scenarioB: {
    label: { en: string; es: string };
    rnsSupported: number;
    encountersPerDay: number;
    revenuePerDay: number;
    revenuePerYear: number;
  };
  providerDailyCost: number;
  breakevenEncounters: number;
  netDifference: number;
  recommendation: { en: string; es: string };
}

export interface FQHCSizePreset {
  id: "mid-size" | "small" | "large";
  label: { en: string; es: string };
  description: { en: string; es: string };
  staffing: StaffingInput;
  schedule: ScheduleInput;
  revenue: RevenueInput;
  disease: DiseaseInput;
  annualPatients: number;
  overheadPercent: number;
}

export interface DiseaseProtocol {
  id: string;
  name: { en: string; es: string };
  prevalence: { en: string; es: string };
  visitFrequency: { en: string; es: string };
  careTeam: { role: string; responsibility: { en: string; es: string } }[];
  coVisitOpportunity: { en: string; es: string };
  ccmEligible: boolean;
  metrics: { en: string; es: string }[];
  sourceUrl: string;
}

/* ------------------------------------------------------------------ */
/*  Constants — sourced from existing data files                       */
/* ------------------------------------------------------------------ */

// Staff costs (P50 from SALARY_BENCHMARKS in job-posting-templates.ts)
// Benefits overhead based on typical CA FQHC benefit packages
export const STAFF_COSTS: Record<
  keyof StaffingInput,
  { salary: number; benefitsRate: number; label: { en: string; es: string } }
> = {
  physicians: {
    salary: 270_000,
    benefitsRate: 0.3,
    label: { en: "Physicians (MD/DO)", es: "Médicos (MD/DO)" },
  },
  nps: {
    salary: 145_000,
    benefitsRate: 0.28,
    label: { en: "Nurse Practitioners", es: "Enfermeras Practicantes" },
  },
  pas: {
    salary: 140_000,
    benefitsRate: 0.28,
    label: { en: "Physician Assistants", es: "Asistentes Médicos (PA)" },
  },
  rns: {
    salary: 105_000,
    benefitsRate: 0.28,
    label: { en: "Registered Nurses", es: "Enfermeras Registradas" },
  },
  mas: {
    salary: 42_000,
    benefitsRate: 0.25,
    label: { en: "Medical Assistants", es: "Asistentes Médicos" },
  },
  chws: {
    salary: 45_000,
    benefitsRate: 0.25,
    label: { en: "Community Health Workers", es: "Promotores de Salud" },
  },
  bhProviders: {
    salary: 72_000,
    benefitsRate: 0.28,
    label: { en: "BH Providers (LCSW)", es: "Proveedores de Salud Conductual" },
  },
  dentalProviders: {
    salary: 185_000,
    benefitsRate: 0.3,
    label: { en: "Dentists", es: "Dentistas" },
  },
};

// PPS rates (from CA DHCS FQHC rate data, NACHC billing guides)
export const PPS_DEFAULTS = {
  min: 150,
  max: 400,
  defaultMediCal: 225,
  defaultMedicare: 245,
  step: 5,
};

// CCM billing codes (from CMS 2024-2025 fee schedule)
export const CCM_RATES = {
  ccm99490: 62, // Standard CCM (20 min/month)
  ccm99487: 93, // Complex CCM (60 min/month)
  bhi99484: 51, // Behavioral Health Integration
  rpm99457: 50, // Remote Patient Monitoring
};

// ECM rates (from DHCS CalAIM ECM Policy Guide)
export const ECM_PMPM = {
  low: 150, // Low-acuity population
  medium: 275, // Medium-acuity
  high: 400, // High-acuity (homeless, SUD, SMI)
  default: 275,
};

// Working days and scheduling constants
export const SCHEDULE_CONSTANTS = {
  weeksPerYear: 52,
  holidaysPerYear: 10,
  avgPTODaysPerYear: 15,
  workingWeeksPerYear: 48, // 52 - holidays - avg PTO
};

/* ------------------------------------------------------------------ */
/*  Size Presets                                                       */
/* ------------------------------------------------------------------ */

export const SIZE_PRESETS: FQHCSizePreset[] = [
  {
    id: "mid-size",
    label: { en: "Mid-Size FQHC (~240 staff)", es: "FQHC Mediano (~240 empleados)" },
    description: {
      en: "Multi-site community health center. ~25,000 patients. Comprehensive services including dental, behavioral health, pharmacy, HIV services. Based on real California FQHC staffing data.",
      es: "Centro de salud comunitario multisitio. ~25,000 pacientes. Servicios integrales incluyendo dental, salud conductual, farmacia, servicios VIH. Basado en datos reales de un FQHC de California.",
    },
    staffing: {
      physicians: 10,
      nps: 11,
      pas: 0,
      rns: 10,
      mas: 34,
      chws: 12,
      bhProviders: 6,
      dentalProviders: 5,
    },
    schedule: {
      hoursPerDay: 8,
      daysPerWeek: 5,
      encountersPerProviderPerDay: 18,
      noShowRate: 15,
    },
    revenue: {
      ppsRate: 225,
      coVisitRate: 12,
      bhSameDayRate: 10,
      ecmEnrollmentRate: 6,
      regionalMultiplier: 1.05,
    },
    disease: {
      diabeticPercent: 20,
      htnPercent: 32,
      depressionPercent: 16,
      copdPercent: 9,
    },
    annualPatients: 25_000,
    overheadPercent: 32,
  },
  {
    id: "small",
    label: { en: "Small FQHC (~250 staff)", es: "FQHC Pequeño (~250 empleados)" },
    description: {
      en: "Single-site or 2-3 sites. ~15,000 patients. Typical rural or suburban CA FQHC.",
      es: "Un sitio o 2-3 sitios. ~15,000 pacientes. FQHC típico rural o suburbano en CA.",
    },
    staffing: {
      physicians: 8,
      nps: 6,
      pas: 4,
      rns: 15,
      mas: 25,
      chws: 10,
      bhProviders: 5,
      dentalProviders: 3,
    },
    schedule: {
      hoursPerDay: 8,
      daysPerWeek: 5,
      encountersPerProviderPerDay: 18,
      noShowRate: 15,
    },
    revenue: {
      ppsRate: 225,
      coVisitRate: 10,
      bhSameDayRate: 8,
      ecmEnrollmentRate: 5,
      regionalMultiplier: 1.0,
    },
    disease: {
      diabeticPercent: 18,
      htnPercent: 30,
      depressionPercent: 15,
      copdPercent: 8,
    },
    annualPatients: 15_000,
    overheadPercent: 35,
  },
  {
    id: "large",
    label: { en: "Large FQHC (~1,000 staff)", es: "FQHC Grande (~1,000 empleados)" },
    description: {
      en: "Multi-site network (8-15 sites). ~60,000 patients. Urban CA FQHC with economies of scale.",
      es: "Red multisitio (8-15 sitios). ~60,000 pacientes. FQHC urbano en CA con economías de escala.",
    },
    staffing: {
      physicians: 30,
      nps: 25,
      pas: 15,
      rns: 60,
      mas: 100,
      chws: 40,
      bhProviders: 20,
      dentalProviders: 12,
    },
    schedule: {
      hoursPerDay: 10,
      daysPerWeek: 5,
      encountersPerProviderPerDay: 20,
      noShowRate: 12,
    },
    revenue: {
      ppsRate: 240,
      coVisitRate: 15,
      bhSameDayRate: 12,
      ecmEnrollmentRate: 8,
      regionalMultiplier: 1.08,
    },
    disease: {
      diabeticPercent: 22,
      htnPercent: 35,
      depressionPercent: 18,
      copdPercent: 10,
    },
    annualPatients: 60_000,
    overheadPercent: 28,
  },
];

/* ------------------------------------------------------------------ */
/*  Disease Management Protocols                                       */
/* ------------------------------------------------------------------ */

export const DISEASE_PROTOCOLS: DiseaseProtocol[] = [
  {
    id: "diabetes",
    name: { en: "Diabetes Management", es: "Manejo de Diabetes" },
    prevalence: {
      en: "15-25% of FQHC patients; higher in Central Valley and Latino populations",
      es: "15-25% de pacientes FQHC; mayor en Valle Central y poblaciones latinas",
    },
    visitFrequency: {
      en: "Every 3 months (HbA1c tracking); monthly for uncontrolled (HbA1c >9%)",
      es: "Cada 3 meses (seguimiento HbA1c); mensual para descontrolados (HbA1c >9%)",
    },
    careTeam: [
      { role: "CHW", responsibility: { en: "Self-management education, food access, appointment reminders", es: "Educación de autogestión, acceso a alimentos, recordatorios de citas" } },
      { role: "RN", responsibility: { en: "HbA1c monitoring, insulin titration (standing orders), foot exams, care plan updates", es: "Monitoreo HbA1c, titulación de insulina (órdenes permanentes), exámenes de pies" } },
      { role: "MA", responsibility: { en: "Point-of-care HbA1c, vitals, medication reconciliation, care gap identification", es: "HbA1c en punto de atención, signos vitales, reconciliación de medicamentos" } },
      { role: "MD/NP", responsibility: { en: "Complex insulin management, complication assessment, referrals (ophthalmology, podiatry)", es: "Manejo complejo de insulina, evaluación de complicaciones, referencias" } },
    ],
    coVisitOpportunity: {
      en: "RN diabetes education visit + MD co-sign = 1 billable PPS encounter. RN conducts 30-min visit covering HbA1c results, medication adherence, self-management goals. MD reviews note, adds assessment, co-signs.",
      es: "Visita de educación diabética por RN + co-firma MD = 1 encuentro PPS facturable. RN realiza visita de 30 min cubriendo resultados HbA1c, adherencia a medicamentos, metas de autogestión.",
    },
    ccmEligible: true,
    metrics: [
      { en: "HbA1c <9% (HEDIS HBD)", es: "HbA1c <9% (HEDIS HBD)" },
      { en: "Annual retinal exam completion", es: "Examen retinal anual completado" },
      { en: "Nephropathy screening (annual)", es: "Cribado de nefropatía (anual)" },
      { en: "Blood pressure <140/90 (comorbid HTN)", es: "Presión arterial <140/90 (HTN comórbida)" },
    ],
    sourceUrl: "https://www.cms.gov/medicare/payment/prospective-payment-systems/federally-qualified-health-center",
  },
  {
    id: "hypertension",
    name: { en: "Hypertension Management", es: "Manejo de Hipertensión" },
    prevalence: {
      en: "25-40% of FQHC patients; often comorbid with diabetes and obesity",
      es: "25-40% de pacientes FQHC; frecuentemente comórbido con diabetes y obesidad",
    },
    visitFrequency: {
      en: "Monthly until controlled (<140/90); every 3-6 months once stable",
      es: "Mensual hasta control (<140/90); cada 3-6 meses una vez estable",
    },
    careTeam: [
      { role: "MA", responsibility: { en: "Accurate BP measurement (seated 5 min, arm at heart level), medication reconciliation", es: "Medición precisa de PA (sentado 5 min, brazo a nivel del corazón), reconciliación de medicamentos" } },
      { role: "RN", responsibility: { en: "Medication titration per standing orders, lifestyle counseling, home BP monitoring setup", es: "Titulación de medicamentos por órdenes permanentes, consejería de estilo de vida" } },
      { role: "CHW", responsibility: { en: "DASH diet education, exercise plans, medication adherence support, social determinants screening", es: "Educación dieta DASH, planes de ejercicio, apoyo adherencia a medicamentos" } },
      { role: "MD/NP", responsibility: { en: "Complex multi-drug management, secondary hypertension workup, end-organ damage assessment", es: "Manejo complejo multi-medicamento, evaluación de hipertensión secundaria" } },
    ],
    coVisitOpportunity: {
      en: "RN BP management visit + MD co-sign. High-volume opportunity: most FQHC patients with HTN can be managed by RN with standing orders. MD reviews weekly batch of RN BP encounters.",
      es: "Visita de manejo de PA por RN + co-firma MD. Oportunidad de alto volumen: la mayoría de pacientes con HTN pueden ser manejados por RN con órdenes permanentes.",
    },
    ccmEligible: true,
    metrics: [
      { en: "BP <140/90 (HEDIS CBP)", es: "PA <140/90 (HEDIS CBP)" },
      { en: "Medication adherence rate", es: "Tasa de adherencia a medicamentos" },
      { en: "Annual lipid panel", es: "Panel lipídico anual" },
    ],
    sourceUrl: "https://www.nachc.org/resource/fqhc-billing-and-finance/",
  },
  {
    id: "depression",
    name: { en: "Depression Screening & Management", es: "Cribado y Manejo de Depresión" },
    prevalence: {
      en: "10-25% screen positive (PHQ-9 ≥10); higher in displaced workers and chronic disease patients",
      es: "10-25% dan positivo (PHQ-9 ≥10); mayor en trabajadores desplazados y pacientes crónicos",
    },
    visitFrequency: {
      en: "PHQ-9 screening at every visit (universal); BH follow-up every 2-4 weeks for active treatment",
      es: "Cribado PHQ-9 en cada visita (universal); seguimiento BH cada 2-4 semanas en tratamiento activo",
    },
    careTeam: [
      { role: "MA", responsibility: { en: "Administer PHQ-9 and GAD-7 during rooming; flag scores ≥10 for warm handoff", es: "Administrar PHQ-9 y GAD-7 durante preparación; señalar puntajes ≥10 para referencia inmediata" } },
      { role: "RN", responsibility: { en: "Coordinate warm handoff when BH provider available; medication monitoring for SSRI titration", es: "Coordinar referencia inmediata cuando proveedor BH disponible; monitoreo de medicamentos SSRI" } },
      { role: "BH Provider", responsibility: { en: "Same-day brief intervention (15-30 min); CBT techniques; safety assessment; treatment planning", es: "Intervención breve el mismo día (15-30 min); técnicas TCC; evaluación de seguridad" } },
      { role: "MD/NP", responsibility: { en: "SSRI/SNRI prescribing, complex psychiatric evaluation, medication management, suicide risk assessment", es: "Prescripción SSRI/SNRI, evaluación psiquiátrica compleja, manejo de medicamentos" } },
    ],
    coVisitOpportunity: {
      en: "BH same-day warm handoff = separate PPS encounter. This is Model A co-visit: primary care encounter + BH encounter on same day. Two separate notes, two PPS payments. Highest-value co-visit opportunity.",
      es: "Referencia inmediata BH el mismo día = encuentro PPS separado. Modelo A de co-visita: encuentro de atención primaria + encuentro BH el mismo día. Dos notas separadas, dos pagos PPS.",
    },
    ccmEligible: true,
    metrics: [
      { en: "PHQ-9 follow-up within 4 weeks of positive screen", es: "Seguimiento PHQ-9 dentro de 4 semanas de cribado positivo" },
      { en: "Depression remission (PHQ-9 <5) at 6 months", es: "Remisión de depresión (PHQ-9 <5) a 6 meses" },
      { en: "Screening rate ≥90% of adult visits", es: "Tasa de cribado ≥90% de visitas adultas" },
    ],
    sourceUrl: "https://www.samhsa.gov/integrated-health-solutions",
  },
  {
    id: "copd",
    name: { en: "COPD Management", es: "Manejo de EPOC" },
    prevalence: {
      en: "5-12% of FQHC patients; higher in rural areas and older populations",
      es: "5-12% de pacientes FQHC; mayor en áreas rurales y poblaciones mayores",
    },
    visitFrequency: {
      en: "Every 3-6 months for stable; monthly during exacerbation recovery",
      es: "Cada 3-6 meses estable; mensual durante recuperación de exacerbación",
    },
    careTeam: [
      { role: "RN", responsibility: { en: "Spirometry, inhaler technique training, action plan education, oxygen assessment", es: "Espirometría, entrenamiento de técnica de inhalador, educación de plan de acción" } },
      { role: "CHW", responsibility: { en: "Tobacco cessation support, environmental trigger assessment, home safety evaluation", es: "Apoyo para dejar de fumar, evaluación de desencadenantes ambientales" } },
      { role: "MA", responsibility: { en: "Pulse oximetry, medication reconciliation, immunization status check", es: "Oximetría de pulso, reconciliación de medicamentos, verificación de inmunizaciones" } },
      { role: "MD/NP", responsibility: { en: "GOLD staging, pharmacotherapy adjustment, pulmonary rehab referral, comorbidity management", es: "Estadificación GOLD, ajuste de farmacoterapia, referencia a rehabilitación pulmonar" } },
    ],
    coVisitOpportunity: {
      en: "RN pulmonary education visit + MD co-sign. Spirometry, inhaler retraining, and action plan review are ideal RN-led encounters with MD co-signature for billing.",
      es: "Visita educación pulmonar por RN + co-firma MD. Espirometría, reentrenamiento de inhalador y revisión de plan de acción son encuentros ideales liderados por RN.",
    },
    ccmEligible: true,
    metrics: [
      { en: "Spirometry completion (annual)", es: "Espirometría completada (anual)" },
      { en: "Influenza and pneumococcal vaccination rates", es: "Tasas de vacunación influenza y neumococo" },
      { en: "Emergency department visit reduction", es: "Reducción de visitas a urgencias" },
    ],
    sourceUrl: "https://www.cms.gov/medicare/payment/prospective-payment-systems/federally-qualified-health-center",
  },
];

/* ------------------------------------------------------------------ */
/*  Patient Tiering Framework                                          */
/* ------------------------------------------------------------------ */

export interface PatientTier {
  id: string;
  name: { en: string; es: string };
  description: { en: string; es: string };
  percentOfPanel: { en: string; es: string };
  primaryRole: string;
  visitFrequency: { en: string; es: string };
  revenueModel: { en: string; es: string };
  examples: { en: string; es: string };
}

export const PATIENT_TIERS: PatientTier[] = [
  {
    id: "high-touch-ecm",
    name: { en: "High-Touch ECM", es: "ECM de Alto Contacto" },
    description: {
      en: "Complex patients with multiple chronic conditions, housing instability, SUD, or SMI. Requires intensive care coordination and frequent contact.",
      es: "Pacientes complejos con múltiples condiciones crónicas, inestabilidad de vivienda, TUS o TMG. Requiere coordinación intensiva.",
    },
    percentOfPanel: { en: "3-5% of panel", es: "3-5% del panel" },
    primaryRole: "Care Coordinator + CHW",
    visitFrequency: { en: "Weekly to biweekly contact; monthly in-person", es: "Contacto semanal a quincenal; mensual presencial" },
    revenueModel: { en: "ECM PMPM ($275-$400/month) + PPS encounters + CCM billing", es: "ECM PMPM ($275-$400/mes) + encuentros PPS + facturación CCM" },
    examples: { en: "Homeless diabetic with depression; SUD patient post-hospitalization; frail elderly with 5+ medications", es: "Diabético sin hogar con depresión; paciente TUS post-hospitalización; anciano frágil con 5+ medicamentos" },
  },
  {
    id: "standard-care-mgmt",
    name: { en: "Standard Care Management", es: "Manejo de Atención Estándar" },
    description: {
      en: "Patients with 1-2 chronic conditions requiring regular monitoring and medication management. Stable but need consistent follow-up.",
      es: "Pacientes con 1-2 condiciones crónicas que requieren monitoreo regular y manejo de medicamentos. Estables pero necesitan seguimiento.",
    },
    percentOfPanel: { en: "15-25% of panel", es: "15-25% del panel" },
    primaryRole: "RN (with MD co-sign)",
    visitFrequency: { en: "Monthly to quarterly; co-visit opportunities", es: "Mensual a trimestral; oportunidades de co-visita" },
    revenueModel: { en: "PPS encounters (RN co-visit model) + CCM 99490 ($62/month)", es: "Encuentros PPS (modelo co-visita RN) + CCM 99490 ($62/mes)" },
    examples: { en: "Controlled diabetic (HbA1c 7-9%); hypertension on 2 medications; depression on SSRI", es: "Diabético controlado (HbA1c 7-9%); hipertensión con 2 medicamentos; depresión con SSRI" },
  },
  {
    id: "self-management",
    name: { en: "Supported Self-Management", es: "Autogestión con Apoyo" },
    description: {
      en: "Well-controlled chronic conditions or healthy patients. Minimal clinical intervention needed; focus on prevention and wellness.",
      es: "Condiciones crónicas bien controladas o pacientes sanos. Intervención clínica mínima; enfoque en prevención y bienestar.",
    },
    percentOfPanel: { en: "70-80% of panel", es: "70-80% del panel" },
    primaryRole: "MA + CHW (annual wellness with MD/NP)",
    visitFrequency: { en: "Annual wellness; PRN for acute needs", es: "Bienestar anual; PRN para necesidades agudas" },
    revenueModel: { en: "PPS encounter (annual wellness) + preventive screening revenue", es: "Encuentro PPS (bienestar anual) + ingresos por cribado preventivo" },
    examples: { en: "Controlled HbA1c <7%; well-managed BP; annual physical; immunizations up to date", es: "HbA1c controlada <7%; PA bien manejada; examen físico anual; inmunizaciones al día" },
  },
];

/* ------------------------------------------------------------------ */
/*  Economies of Scale Factors                                         */
/* ------------------------------------------------------------------ */

export interface ScaleFactor {
  category: { en: string; es: string };
  smallFQHC: { en: string; es: string };
  largeFQHC: { en: string; es: string };
  advantage: "small" | "large" | "neutral";
}

export const SCALE_FACTORS: ScaleFactor[] = [
  {
    category: { en: "Overhead as % of Revenue", es: "Gastos generales como % de ingresos" },
    smallFQHC: { en: "32-38%", es: "32-38%" },
    largeFQHC: { en: "25-30%", es: "25-30%" },
    advantage: "large",
  },
  {
    category: { en: "Purchasing Power (Supplies, EHR)", es: "Poder de compra (suministros, EHR)" },
    smallFQHC: { en: "Limited negotiating leverage", es: "Poder de negociación limitado" },
    largeFQHC: { en: "Volume discounts, preferred pricing", es: "Descuentos por volumen, precios preferenciales" },
    advantage: "large",
  },
  {
    category: { en: "Managed Care Contracting", es: "Contratación de atención administrada" },
    smallFQHC: { en: "Accept standard rates", es: "Aceptan tarifas estándar" },
    largeFQHC: { en: "Negotiate favorable rates, IPA/MSO formation", es: "Negocian tarifas favorables, formación IPA/MSO" },
    advantage: "large",
  },
  {
    category: { en: "Service Line Viability", es: "Viabilidad de líneas de servicio" },
    smallFQHC: { en: "Limited to primary care + BH; dental if grant-funded", es: "Limitado a atención primaria + BH; dental si financiado por subvención" },
    largeFQHC: { en: "Dental, pharmacy, optometry, SUD, specialty care", es: "Dental, farmacia, optometría, TUS, atención especializada" },
    advantage: "large",
  },
  {
    category: { en: "Staff Recruitment", es: "Reclutamiento de personal" },
    smallFQHC: { en: "NHSC loan repayment is primary draw", es: "Pago de préstamos NHSC es atractivo principal" },
    largeFQHC: { en: "NHSC + career ladders + training programs + brand recognition", es: "NHSC + escaleras profesionales + programas de capacitación + reconocimiento de marca" },
    advantage: "large",
  },
  {
    category: { en: "Mission Focus & Community Trust", es: "Enfoque en misión y confianza comunitaria" },
    smallFQHC: { en: "Deep community relationships, board proximity, nimble response", es: "Relaciones profundas con la comunidad, proximidad a la junta, respuesta ágil" },
    largeFQHC: { en: "More bureaucratic, but wider reach", es: "Más burocrático, pero mayor alcance" },
    advantage: "small",
  },
  {
    category: { en: "Provider-of-the-Day Model", es: "Modelo de Proveedor del Día" },
    smallFQHC: { en: "Hard to dedicate — losing 1 of 8 providers is 12.5% capacity", es: "Difícil dedicar — perder 1 de 8 proveedores es 12.5% de capacidad" },
    largeFQHC: { en: "Easier — 1 of 30 providers is only 3.3%; can rotate weekly", es: "Más fácil — 1 de 30 proveedores es solo 3.3%; puede rotar semanalmente" },
    advantage: "large",
  },
];

/* ------------------------------------------------------------------ */
/*  Calculation Engine                                                 */
/* ------------------------------------------------------------------ */

export function calculateSimulation(inputs: SimulatorInputs): SimulatorOutput {
  const { staffing, schedule, revenue, disease } = inputs;
  const preset = SIZE_PRESETS.find((p) => p.id === inputs.sizePreset);
  const overheadPercent = preset?.overheadPercent ?? 32;
  const annualPatients = preset?.annualPatients ?? 30_000;

  // Count billable providers (MD, NP, PA can bill independently under PPS)
  const billableProviders = staffing.physicians + staffing.nps + staffing.pas;

  // Working days per year
  const workingDaysPerYear =
    schedule.daysPerWeek * SCHEDULE_CONSTANTS.workingWeeksPerYear;

  // Encounter volume
  const encountersPerDayGross =
    billableProviders * schedule.encountersPerProviderPerDay;
  const encountersPerDayNet =
    encountersPerDayGross * (1 - schedule.noShowRate / 100);
  const encountersPerMonth = encountersPerDayNet * (workingDaysPerYear / 12);
  const encountersPerYear = encountersPerDayNet * workingDaysPerYear;

  // Co-visit encounters (RN visits made billable via MD co-sign)
  const coVisitEncountersPerYear =
    encountersPerYear * (revenue.coVisitRate / 100);

  // BH same-day encounters (separate PPS encounter per visit)
  const bhEncountersPerYear =
    encountersPerYear * (revenue.bhSameDayRate / 100);

  // ECM encounters (monthly face-to-face for enrolled patients)
  const ecmPatients = annualPatients * (revenue.ecmEnrollmentRate / 100);
  const ecmEncountersPerYear = ecmPatients * 12; // monthly visits

  // Revenue calculations
  const adjustedPPS = revenue.ppsRate * revenue.regionalMultiplier;
  const basePPSRevenue = encountersPerYear * adjustedPPS;
  const coVisitRevenue = coVisitEncountersPerYear * adjustedPPS;
  const bhRevenue = bhEncountersPerYear * adjustedPPS;
  const ecmRevenue = ecmPatients * ECM_PMPM.default * 12;

  // CCM revenue (chronic care management billing for eligible patients)
  const chronicPercent =
    (disease.diabeticPercent + disease.htnPercent + disease.copdPercent) / 100;
  const ccmEligiblePatients = annualPatients * chronicPercent * 0.3; // ~30% capture rate
  const ccmRevenue = ccmEligiblePatients * CCM_RATES.ccm99490 * 12;

  const totalAnnualRevenue =
    basePPSRevenue + coVisitRevenue + bhRevenue + ecmRevenue + ccmRevenue;

  // Cost calculations
  const payrollBreakdown = (
    Object.keys(staffing) as (keyof StaffingInput)[]
  ).map((role) => {
    const count = staffing[role];
    const cost = STAFF_COSTS[role];
    const totalCost = count * cost.salary * (1 + cost.benefitsRate);
    return { role: cost.label.en, count, totalCost };
  });

  const annualPayroll = payrollBreakdown.reduce(
    (sum, item) => sum + item.totalCost,
    0
  );
  const annualOverhead = annualPayroll * (overheadPercent / 100);
  const totalAnnualCost = annualPayroll + annualOverhead;

  // Efficiency metrics
  const totalEncountersAll =
    encountersPerYear + coVisitEncountersPerYear + bhEncountersPerYear;
  const netMargin = totalAnnualRevenue - totalAnnualCost;
  const netMarginPercent =
    totalAnnualRevenue > 0 ? (netMargin / totalAnnualRevenue) * 100 : 0;
  const costPerEncounter =
    totalEncountersAll > 0 ? totalAnnualCost / totalEncountersAll : 0;
  const revenuePerProvider =
    billableProviders > 0 ? totalAnnualRevenue / billableProviders : 0;

  // Provider-of-the-Day analysis
  const potd = calculatePOTDAnalysis(
    staffing,
    schedule,
    adjustedPPS,
    workingDaysPerYear
  );

  return {
    billableProvidersCount: billableProviders,
    totalEncountersPerDay: encountersPerDayNet,
    totalEncountersPerMonth: encountersPerMonth,
    totalEncountersPerYear: encountersPerYear,
    coVisitEncountersPerYear,
    bhEncountersPerYear,
    ecmEncountersPerYear,

    basePPSRevenue,
    coVisitRevenue,
    bhRevenue,
    ecmRevenue,
    ccmRevenue,
    totalAnnualRevenue,
    revenuePerEncounter:
      totalEncountersAll > 0 ? totalAnnualRevenue / totalEncountersAll : 0,

    annualPayroll,
    payrollBreakdown,
    annualOverhead,
    totalAnnualCost,

    netMargin,
    netMarginPercent,
    costPerEncounter,
    revenuePerProvider,

    potd,
  };
}

/* ------------------------------------------------------------------ */
/*  Provider-of-the-Day Analysis                                       */
/* ------------------------------------------------------------------ */

function calculatePOTDAnalysis(
  staffing: StaffingInput,
  schedule: ScheduleInput,
  ppsRate: number,
  workingDaysPerYear: number
): POTDAnalysis {
  // Scenario A: Provider sees own patients
  const encountersA = schedule.encountersPerProviderPerDay;
  const revenuePerDayA = encountersA * ppsRate;
  const revenuePerYearA = revenuePerDayA * workingDaysPerYear;

  // Scenario B: Provider as co-sign resource for RNs
  // Each RN can see 10-15 patients/day; MD reviews and co-signs each (~5 min review)
  // With 4 RNs, that is 40-60 encounters per day
  const rnsSupported = Math.min(staffing.rns, 4); // 1 POTD supports up to 4 RNs
  const rnEncountersPerDay = 12; // conservative: 12 patients per RN per day
  const encountersB = rnsSupported * rnEncountersPerDay;
  const revenuePerDayB = encountersB * ppsRate;
  const revenuePerYearB = revenuePerDayB * workingDaysPerYear;

  // Provider cost (use MD salary as the baseline)
  const providerAnnualCost =
    STAFF_COSTS.physicians.salary * (1 + STAFF_COSTS.physicians.benefitsRate);
  const providerDailyCost = providerAnnualCost / workingDaysPerYear;

  // Breakeven: how many encounters must the POTD co-sign to cover their cost
  const breakevenEncounters = Math.ceil(providerDailyCost / ppsRate);

  const netDifference = revenuePerYearB - revenuePerYearA;

  // Recommendation
  const isViable = encountersB > breakevenEncounters * 2; // Healthy margin
  const recommendation = isViable
    ? {
        en: `The Provider-of-the-Day model generates ${Math.round(netDifference).toLocaleString()} more annual revenue than the traditional model. With ${rnsSupported} RNs generating ${encountersB} co-signed encounters/day, this model is financially viable. The breakeven is only ${breakevenEncounters} encounters/day.`,
        es: `El modelo de Proveedor del Día genera $${Math.round(netDifference).toLocaleString()} más de ingresos anuales que el modelo tradicional. Con ${rnsSupported} RNs generando ${encountersB} encuentros co-firmados/día, este modelo es financieramente viable.`,
      }
    : {
        en: `With only ${rnsSupported} RNs, the Provider-of-the-Day model may not generate sufficient volume. Consider adding more RNs before implementing this model. Breakeven requires ${breakevenEncounters} encounters/day.`,
        es: `Con solo ${rnsSupported} RNs, el modelo de Proveedor del Día puede no generar suficiente volumen. Considere agregar más RNs antes de implementar este modelo.`,
      };

  return {
    scenarioA: {
      label: {
        en: "Traditional: Provider Sees Own Patients",
        es: "Tradicional: Proveedor Ve Sus Propios Pacientes",
      },
      encountersPerDay: encountersA,
      revenuePerDay: revenuePerDayA,
      revenuePerYear: revenuePerYearA,
    },
    scenarioB: {
      label: {
        en: "POTD: Provider Co-Signs for RN Team",
        es: "PDD: Proveedor Co-Firma para Equipo de RN",
      },
      rnsSupported,
      encountersPerDay: encountersB,
      revenuePerDay: revenuePerDayB,
      revenuePerYear: revenuePerYearB,
    },
    providerDailyCost,
    breakevenEncounters,
    netDifference,
    recommendation,
  };
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

export function getPresetBySize(size: "mid-size" | "small" | "large"): FQHCSizePreset {
  return SIZE_PRESETS.find((p) => p.id === size) ?? SIZE_PRESETS[0];
}

export function formatCurrency(amount: number): string {
  if (Math.abs(amount) >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (Math.abs(amount) >= 1_000) {
    return `$${Math.round(amount).toLocaleString()}`;
  }
  return `$${amount.toFixed(0)}`;
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export const CLINIC_MODEL_LAST_UPDATED = "2026-03-03";
