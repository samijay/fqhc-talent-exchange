// Clinic Operations Model — financial simulation engine for CA FQHC staffing & revenue
// Sources: CMS FQHC PPS rules, CA DHCS PPS rates, NACHC billing guides, HRSA BPHC
// Medi-Cal billing rules: WIC §14132.100, DHCS FQHC APM Guide, Noridian MAC
// Last updated: 2026-03-06

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
  dentalSameDayRate: number; // 0-30 (percent of visits with same-day dental — 2 PPS under both Medicare & Medi-Cal)
  bhSameDayRate: number; // 0-30 (percent of visits with BH warm handoff — 2 PPS under Medicare ONLY, 1 PPS under Medi-Cal)
  ecmEnrollmentRate: number; // 0-20 (percent of panel in ECM)
  apmEnrolled: boolean; // FQHC Alternative Payment Model (unlocks same-day BH billing under Medi-Cal)
  mediCalPercent: number; // 0-100 (percent of payer mix that is Medi-Cal vs Medicare)
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
  dentalEncountersPerYear: number;
  bhEncountersPerYear: number;
  bhBillableEncountersPerYear: number; // Adjusted for payer mix (Medicare = 2 PPS, Medi-Cal = 1 PPS unless APM)
  ecmEncountersPerYear: number;

  // Revenue
  basePPSRevenue: number;
  dentalRevenue: number;
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
      dentalSameDayRate: 12,
      bhSameDayRate: 10,
      ecmEnrollmentRate: 6,
      apmEnrolled: false,
      mediCalPercent: 70,
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
      dentalSameDayRate: 8,
      bhSameDayRate: 8,
      ecmEnrollmentRate: 5,
      apmEnrolled: false,
      mediCalPercent: 75,
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
      dentalSameDayRate: 15,
      bhSameDayRate: 12,
      ecmEnrollmentRate: 8,
      apmEnrolled: false,
      mediCalPercent: 65,
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
      en: "⚠️ RN visits are NOT independently billable under FQHC PPS. The revenue opportunity is team-based care: RN manages the visit under standing orders, freeing MD/NP to see more patients. CCM billing (99490) for monthly care coordination is the direct revenue pathway for chronic disease management.",
      es: "⚠️ Las visitas de RN NO son facturables independientemente bajo PPS de FQHC. La oportunidad es atención basada en equipo: RN maneja la visita bajo órdenes permanentes, liberando al MD/NP para ver más pacientes. La facturación CCM (99490) es la vía directa de ingresos.",
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
      en: "⚠️ RN visits are NOT independently billable under FQHC PPS. Revenue strategy: RN manages stable HTN patients via standing orders, freeing MD/NP capacity. CCM billing (99490, $62/mo) for monthly care coordination. BHI add-on codes (G0568-G0570) if behavioral health comorbidity.",
      es: "⚠️ Las visitas de RN NO son facturables independientemente bajo PPS de FQHC. Estrategia: RN maneja pacientes HTN estables bajo órdenes permanentes, liberando capacidad MD/NP. Facturación CCM (99490, $62/mes) para coordinación mensual.",
    },
    ccmEligible: true,
    metrics: [
      { en: "BP <140/90 (HEDIS CBP)", es: "PA <140/90 (HEDIS CBP)" },
      { en: "Medication adherence rate", es: "Tasa de adherencia a medicamentos" },
      { en: "Annual lipid panel", es: "Panel lipídico anual" },
    ],
    sourceUrl: "https://www.nachc.org/topic/finance/",
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
      en: "⚠️ PAYER-SPECIFIC: Under Medicare, same-day Medical + BH = 2 PPS encounters. Under Medi-Cal, same-day Medical + BH = only 1 PPS (WIC §14132.100). FQHCs enrolled in the APM (July 2024) bypass this restriction via PMPM capitation. Without APM, schedule BH on a separate day for 2 billable encounters.",
      es: "⚠️ POR PAGADOR: Bajo Medicare, Médico + BH mismo día = 2 PPS. Bajo Medi-Cal, Médico + BH mismo día = solo 1 PPS (WIC §14132.100). FQHCs en el APM (julio 2024) evitan esta restricción. Sin APM, programe BH en día separado para 2 encuentros facturables.",
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
      en: "⚠️ RN visits are NOT independently billable under FQHC PPS. Revenue strategy: RN manages stable COPD patients (spirometry, inhaler technique, action plans) under standing orders, freeing MD/NP. CCM billing (99490/99487) for complex patients. RPM codes (99457) if remote monitoring implemented.",
      es: "⚠️ Las visitas de RN NO son facturables bajo PPS de FQHC. Estrategia: RN maneja pacientes EPOC estables (espirometría, inhaladores, planes de acción) bajo órdenes permanentes. Facturación CCM (99490/99487) para pacientes complejos. RPM (99457) si se implementa monitoreo remoto.",
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
    visitFrequency: { en: "Monthly to quarterly; team-based care", es: "Mensual a trimestral; atención basada en equipo" },
    revenueModel: { en: "PPS encounters (MD/NP sees patient) + CCM 99490 ($62/month) + same-day dental if applicable", es: "Encuentros PPS (MD/NP ve paciente) + CCM 99490 ($62/mes) + dental mismo día si aplica" },
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

  // Count billable providers (MD, NP, PA, LCSW, Dentists can bill independently under PPS)
  const medicalProviders = staffing.physicians + staffing.nps + staffing.pas;
  const billableProviders = medicalProviders + staffing.bhProviders + staffing.dentalProviders;

  // Working days per year
  const workingDaysPerYear =
    schedule.daysPerWeek * SCHEDULE_CONSTANTS.workingWeeksPerYear;

  // Encounter volume (medical providers only for base encounters)
  const encountersPerDayGross =
    medicalProviders * schedule.encountersPerProviderPerDay;
  const encountersPerDayNet =
    encountersPerDayGross * (1 - schedule.noShowRate / 100);
  const encountersPerMonth = encountersPerDayNet * (workingDaysPerYear / 12);
  const encountersPerYear = encountersPerDayNet * workingDaysPerYear;

  // Same-day dental encounters (2 PPS under BOTH Medicare & Medi-Cal)
  const dentalEncountersPerYear =
    encountersPerYear * (revenue.dentalSameDayRate / 100);

  // BH same-day encounters — payer-aware calculation
  // Medicare: same-day Medical + BH = 2 PPS encounters
  // Medi-Cal: same-day Medical + BH = 1 PPS only (WIC §14132.100)
  // FQHC APM: bypasses Medi-Cal restriction via PMPM capitation
  const bhEncountersPerYear =
    encountersPerYear * (revenue.bhSameDayRate / 100);
  const mediCalShare = revenue.mediCalPercent / 100;
  const medicareShare = 1 - mediCalShare;
  // Under Medi-Cal without APM, same-day BH doesn't generate a SECOND PPS
  const bhBillableAsSecondPPS = revenue.apmEnrolled
    ? bhEncountersPerYear // APM: all BH encounters generate additional value
    : bhEncountersPerYear * medicareShare; // Only Medicare portion generates 2nd PPS

  // ECM encounters (monthly face-to-face for enrolled patients)
  const ecmPatients = annualPatients * (revenue.ecmEnrollmentRate / 100);
  const ecmEncountersPerYear = ecmPatients * 12; // monthly visits

  // Revenue calculations
  const adjustedPPS = revenue.ppsRate * revenue.regionalMultiplier;
  const basePPSRevenue = encountersPerYear * adjustedPPS;
  const dentalRevenue = dentalEncountersPerYear * adjustedPPS;
  const bhRevenue = bhBillableAsSecondPPS * adjustedPPS;
  const ecmRevenue = ecmPatients * ECM_PMPM.default * 12;

  // CCM revenue (chronic care management billing for eligible patients)
  const chronicPercent =
    (disease.diabeticPercent + disease.htnPercent + disease.copdPercent) / 100;
  const ccmEligiblePatients = annualPatients * chronicPercent * 0.3; // ~30% capture rate
  const ccmRevenue = ccmEligiblePatients * CCM_RATES.ccm99490 * 12;

  const totalAnnualRevenue =
    basePPSRevenue + dentalRevenue + bhRevenue + ecmRevenue + ccmRevenue;

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
    encountersPerYear + dentalEncountersPerYear + bhBillableAsSecondPPS;
  const netMargin = totalAnnualRevenue - totalAnnualCost;
  const netMarginPercent =
    totalAnnualRevenue > 0 ? (netMargin / totalAnnualRevenue) * 100 : 0;
  const costPerEncounter =
    totalEncountersAll > 0 ? totalAnnualCost / totalEncountersAll : 0;
  const revenuePerProvider =
    medicalProviders > 0 ? totalAnnualRevenue / medicalProviders : 0;

  // Provider-of-the-Day analysis
  const potd = calculatePOTDAnalysis(
    staffing,
    schedule,
    adjustedPPS,
    workingDaysPerYear
  );

  return {
    billableProvidersCount: medicalProviders,
    totalEncountersPerDay: encountersPerDayNet,
    totalEncountersPerMonth: encountersPerMonth,
    totalEncountersPerYear: encountersPerYear,
    dentalEncountersPerYear,
    bhEncountersPerYear,
    bhBillableEncountersPerYear: bhBillableAsSecondPPS,
    ecmEncountersPerYear,

    basePPSRevenue,
    dentalRevenue,
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

/* ------------------------------------------------------------------ */
/*  Optimization Engine — revenue pathway recommendations              */
/* ------------------------------------------------------------------ */

export interface OptimizationPathway {
  id: string;
  category: "operational" | "model-design" | "program-expansion";
  title: { en: string; es: string };
  description: { en: string; es: string };
  revenueImpact: number; // Annual $ impact
  implementation: "quick-win" | "medium" | "strategic";
  requirements: { en: string; es: string };
}

export function generateOptimizations(
  inputs: SimulatorInputs,
  results: SimulatorOutput
): OptimizationPathway[] {
  const { staffing, schedule, revenue } = inputs;
  const preset = SIZE_PRESETS.find((p) => p.id === inputs.sizePreset);
  const annualPatients = preset?.annualPatients ?? 30_000;
  const adjustedPPS = revenue.ppsRate * revenue.regionalMultiplier;
  const pathways: OptimizationPathway[] = [];

  // 1. OPERATIONAL: Reduce no-show rate
  if (schedule.noShowRate > 10) {
    const currentEncounters = results.totalEncountersPerYear;
    const improvedRate = Math.max(schedule.noShowRate - 5, 8);
    const medProviders = staffing.physicians + staffing.nps + staffing.pas;
    const improvedEncounters =
      medProviders *
      schedule.encountersPerProviderPerDay *
      (1 - improvedRate / 100) *
      schedule.daysPerWeek *
      SCHEDULE_CONSTANTS.workingWeeksPerYear;
    const gain = (improvedEncounters - currentEncounters) * adjustedPPS;
    pathways.push({
      id: "reduce-no-shows",
      category: "operational",
      title: {
        en: `Reduce No-Show Rate: ${schedule.noShowRate}% → ${improvedRate}%`,
        es: `Reducir Inasistencia: ${schedule.noShowRate}% → ${improvedRate}%`,
      },
      description: {
        en: "Implement automated appointment reminders (SMS + voice), same-day open access scheduling, and transportation assistance. Each 1% reduction = more billable encounters.",
        es: "Implementar recordatorios automáticos (SMS + voz), acceso abierto el mismo día y asistencia de transporte.",
      },
      revenueImpact: Math.round(gain),
      implementation: "quick-win",
      requirements: {
        en: "EHR-integrated reminder system, patient engagement coordinator",
        es: "Sistema de recordatorios integrado al EHR, coordinador de participación del paciente",
      },
    });
  }

  // 2. OPERATIONAL: Increase encounters per provider
  if (schedule.encountersPerProviderPerDay < 22) {
    const increase = Math.min(schedule.encountersPerProviderPerDay + 2, 24);
    const medProviders = staffing.physicians + staffing.nps + staffing.pas;
    const additionalPerDay =
      (increase - schedule.encountersPerProviderPerDay) *
      medProviders *
      (1 - schedule.noShowRate / 100);
    const workDays =
      schedule.daysPerWeek * SCHEDULE_CONSTANTS.workingWeeksPerYear;
    const gain = additionalPerDay * workDays * adjustedPPS;
    pathways.push({
      id: "increase-encounters",
      category: "operational",
      title: {
        en: `Increase Encounters/Provider: ${schedule.encountersPerProviderPerDay} → ${increase}/day`,
        es: `Aumentar Encuentros/Proveedor: ${schedule.encountersPerProviderPerDay} → ${increase}/día`,
      },
      description: {
        en: "Optimize MA workflow (rooming, pre-visit planning, care gap closure). Use team-based care so RNs handle chronic disease management, MAs do intake and documentation prep.",
        es: "Optimizar flujo MA (preparación pre-visita, cierre de brechas de atención). Usar atención basada en equipo donde RNs manejan enfermedades crónicas.",
      },
      revenueImpact: Math.round(gain),
      implementation: "medium",
      requirements: {
        en: "MA training, EHR template optimization, standing orders for RNs",
        es: "Capacitación MA, optimización de plantillas EHR, órdenes permanentes para RNs",
      },
    });
  }

  // 3. OPERATIONAL: Extended hours
  if (schedule.hoursPerDay < 10) {
    const extraHours = 2;
    const extraEncountersPerProvider = Math.round(
      (schedule.encountersPerProviderPerDay / schedule.hoursPerDay) * extraHours
    );
    const medProviders = staffing.physicians + staffing.nps + staffing.pas;
    const workDays =
      schedule.daysPerWeek * SCHEDULE_CONSTANTS.workingWeeksPerYear;
    const gain =
      extraEncountersPerProvider *
      medProviders *
      (1 - schedule.noShowRate / 100) *
      workDays *
      adjustedPPS;
    pathways.push({
      id: "extended-hours",
      category: "operational",
      title: {
        en: `Extended Hours: ${schedule.hoursPerDay}h → ${schedule.hoursPerDay + extraHours}h/day`,
        es: `Horario Extendido: ${schedule.hoursPerDay}h → ${schedule.hoursPerDay + extraHours}h/día`,
      },
      description: {
        en: "Add evening or early morning hours. Stagger provider schedules. Captures working patients who can't come during standard hours. Reduces ED utilization.",
        es: "Agregar horario vespertino o matutino temprano. Escalonar horarios de proveedores. Captura pacientes que trabajan durante horario estándar.",
      },
      revenueImpact: Math.round(gain),
      implementation: "medium",
      requirements: {
        en: "Staff willing to work extended hours (differential pay), sufficient patient demand",
        es: "Personal dispuesto a horario extendido (pago diferencial), suficiente demanda de pacientes",
      },
    });
  }

  // 4. MODEL DESIGN: Same-day dental
  if (revenue.dentalSameDayRate < 15 && staffing.dentalProviders > 0) {
    const currentDental = results.dentalEncountersPerYear;
    const targetRate = Math.min(revenue.dentalSameDayRate + 8, 20);
    const newDental =
      results.totalEncountersPerYear * (targetRate / 100);
    const gain = (newDental - currentDental) * adjustedPPS;
    pathways.push({
      id: "dental-same-day",
      category: "model-design",
      title: {
        en: `Same-Day Dental: ${revenue.dentalSameDayRate}% → ${targetRate}% of visits`,
        es: `Dental Mismo Día: ${revenue.dentalSameDayRate}% → ${targetRate}% de visitas`,
      },
      description: {
        en: "Same-day Medical + Dental = 2 PPS encounters under BOTH Medicare AND Medi-Cal. This is the highest-value same-day billing opportunity. Screen all medical patients for dental needs.",
        es: "Médico + Dental mismo día = 2 encuentros PPS bajo Medicare Y Medi-Cal. Esta es la oportunidad de mayor valor. Evalúe necesidades dentales en todos los pacientes médicos.",
      },
      revenueImpact: Math.round(gain),
      implementation: "medium",
      requirements: {
        en: "Dental operatory co-located with medical, scheduling integration, dental screening protocol at medical visits",
        es: "Consultorio dental co-ubicado con médico, integración de programación, protocolo de evaluación dental",
      },
    });
  }

  // 5. MODEL DESIGN: FQHC APM enrollment
  if (!revenue.apmEnrolled && revenue.mediCalPercent > 50 && revenue.bhSameDayRate > 0) {
    const mediCalBH =
      results.bhEncountersPerYear * (revenue.mediCalPercent / 100);
    const gain = mediCalBH * adjustedPPS; // These become billable
    pathways.push({
      id: "apm-enrollment",
      category: "model-design",
      title: {
        en: "Enroll in FQHC Alternative Payment Model (APM)",
        es: "Inscribirse en Modelo de Pago Alternativo (APM)",
      },
      description: {
        en: "The FQHC APM (launched July 2024) uses PMPM capitation that bypasses the Medi-Cal same-day BH billing restriction. Your Medi-Cal BH encounters are currently lost revenue. APM unlocks them.",
        es: "El APM de FQHC (lanzado julio 2024) usa capitación PMPM que evita la restricción de facturación BH mismo día de Medi-Cal. Sus encuentros BH de Medi-Cal son ingresos perdidos actualmente.",
      },
      revenueImpact: Math.round(gain),
      implementation: "strategic",
      requirements: {
        en: "DHCS APM application, data infrastructure for PMPM reporting, BH capacity for same-day warm handoffs",
        es: "Solicitud APM de DHCS, infraestructura de datos para reportes PMPM, capacidad BH para referencias mismo día",
      },
    });
  }

  // 6. MODEL DESIGN: BH integration
  if (revenue.bhSameDayRate < 15 && staffing.bhProviders > 0) {
    const targetRate = Math.min(revenue.bhSameDayRate + 8, 20);
    const additionalBH =
      results.totalEncountersPerYear * ((targetRate - revenue.bhSameDayRate) / 100);
    // Revenue depends on APM status and payer mix
    const billablePortion = revenue.apmEnrolled
      ? additionalBH
      : additionalBH * (1 - revenue.mediCalPercent / 100);
    const gain = billablePortion * adjustedPPS;
    pathways.push({
      id: "bh-integration",
      category: "model-design",
      title: {
        en: `BH Warm Handoff: ${revenue.bhSameDayRate}% → ${targetRate}% of visits`,
        es: `Referencia BH Inmediata: ${revenue.bhSameDayRate}% → ${targetRate}% de visitas`,
      },
      description: {
        en: revenue.apmEnrolled
          ? "With APM enrolled, every same-day BH warm handoff generates revenue. Universal PHQ-9 screening + embedded BH in primary care workflow."
          : "⚠️ Without APM, only Medicare BH encounters generate a 2nd PPS. Still clinically valuable for Medi-Cal patients. Consider APM enrollment to unlock full revenue.",
        es: revenue.apmEnrolled
          ? "Con APM, cada referencia BH inmediata genera ingresos. Cribado PHQ-9 universal + BH integrado en flujo de atención primaria."
          : "⚠️ Sin APM, solo encuentros BH de Medicare generan 2° PPS. Aún valioso clínicamente para Medi-Cal. Considere APM para desbloquear ingresos completos.",
      },
      revenueImpact: Math.round(gain),
      implementation: "medium",
      requirements: {
        en: "BH providers co-located, universal screening protocol, warm handoff workflow in EHR",
        es: "Proveedores BH co-ubicados, protocolo de cribado universal, flujo de referencia inmediata en EHR",
      },
    });
  }

  // 7. PROGRAM EXPANSION: ECM enrollment
  if (revenue.ecmEnrollmentRate < 10) {
    const targetRate = Math.min(revenue.ecmEnrollmentRate + 4, 12);
    const additionalPatients =
      annualPatients * ((targetRate - revenue.ecmEnrollmentRate) / 100);
    const gain = additionalPatients * ECM_PMPM.default * 12;
    pathways.push({
      id: "ecm-expansion",
      category: "program-expansion",
      title: {
        en: `ECM Enrollment: ${revenue.ecmEnrollmentRate}% → ${targetRate}% of panel`,
        es: `Inscripción ECM: ${revenue.ecmEnrollmentRate}% → ${targetRate}% del panel`,
      },
      description: {
        en: "Enhanced Care Management PMPM ($275/mo average) is pure revenue above PPS encounters. Identify high-utilizer patients, housing-insecure, SUD, SMI. CHWs + Care Coordinators drive enrollment.",
        es: "ECM PMPM ($275/mes promedio) es ingreso puro adicional a encuentros PPS. Identificar pacientes de alto uso, inestabilidad de vivienda, TUS, TMG.",
      },
      revenueImpact: Math.round(gain),
      implementation: "medium",
      requirements: {
        en: "CalAIM ECM contract with managed care plan, CHW/Care Coordinator staff, care management platform",
        es: "Contrato ECM CalAIM con plan de atención administrada, personal CHW/Coordinador, plataforma de manejo de atención",
      },
    });
  }

  // 8. PROGRAM EXPANSION: CCM capture rate
  const chronicPercent =
    (inputs.disease.diabeticPercent + inputs.disease.htnPercent + inputs.disease.copdPercent) / 100;
  const currentCCMPatients = annualPatients * chronicPercent * 0.3;
  const targetCCMCapture = 0.5; // 50% capture rate
  const targetCCMPatients = annualPatients * chronicPercent * targetCCMCapture;
  if (targetCCMPatients > currentCCMPatients) {
    const gain =
      (targetCCMPatients - currentCCMPatients) * CCM_RATES.ccm99490 * 12;
    pathways.push({
      id: "ccm-capture",
      category: "program-expansion",
      title: {
        en: "CCM Capture Rate: 30% → 50% of chronic patients",
        es: "Tasa de Captura CCM: 30% → 50% de pacientes crónicos",
      },
      description: {
        en: "Chronic Care Management (99490, $62/mo per patient) for 20+ min/month of non-face-to-face care coordination. RNs and CHWs document phone calls, med reconciliation, care transitions.",
        es: "Manejo de Atención Crónica (99490, $62/mes por paciente) por 20+ min/mes de coordinación no presencial. RNs y CHWs documentan llamadas, reconciliación de medicamentos.",
      },
      revenueImpact: Math.round(gain),
      implementation: "quick-win",
      requirements: {
        en: "CCM tracking in EHR, staff training on documentation requirements, consent workflow",
        es: "Seguimiento CCM en EHR, capacitación en requisitos de documentación, flujo de consentimiento",
      },
    });
  }

  // Sort by revenue impact (highest first)
  pathways.sort((a, b) => b.revenueImpact - a.revenueImpact);
  return pathways;
}

export const CLINIC_MODEL_LAST_UPDATED = "2026-03-06";
