// Locum Tenens Data — FQHC-rate provider coverage market data & calculator
// Sources: CompHealth, Merritt Hawkins, NACHC Compensation Survey, AMN Healthcare,
//          Staff Care Annual Survey of Temporary Physician Staffing Trends,
//          CA DHCS FQHC rate data, BLS Occupational Employment & Wages
// Last updated: 2026-03-05

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface LocumProviderType {
  id: string;
  role: "md" | "np" | "pa" | "dentist";
  label: { en: string; es: string };
  agencyHourlyRate: { low: number; high: number };
  fqhcHourlyRate: { low: number; high: number };
  typicalMarkupPercent: number;
  caLicense: { en: string; es: string };
  fqhcAnnualSalaryEquiv: number; // For context — what a full-time FQHC provider earns
}

export interface CoverageScenario {
  id: string;
  name: { en: string; es: string };
  description: { en: string; es: string };
  providerTypeId: string;
  durationDays: number;
  hoursPerDay: number;
  agencyCost: number;
  directCost: number;
  savings: number;
  savingsPercent: number;
}

export interface LocumBenefit {
  id: string;
  iconName: string;
  title: { en: string; es: string };
  description: { en: string; es: string };
  audience: "provider" | "fqhc";
}

export interface LocumFAQ {
  question: { en: string; es: string };
  answer: { en: string; es: string };
}

/* ------------------------------------------------------------------ */
/*  Provider Types — CA-specific rates                                 */
/* ------------------------------------------------------------------ */

export const PROVIDER_TYPES: LocumProviderType[] = [
  {
    id: "md",
    role: "md",
    label: { en: "Physician (MD/DO)", es: "Médico (MD/DO)" },
    agencyHourlyRate: { low: 200, high: 350 },
    fqhcHourlyRate: { low: 130, high: 200 },
    typicalMarkupPercent: 45,
    caLicense: {
      en: "CA Medical Board License (BPC §2000 et seq.)",
      es: "Licencia de la Junta Médica de CA (BPC §2000 et seq.)",
    },
    fqhcAnnualSalaryEquiv: 270_000,
  },
  {
    id: "np",
    role: "np",
    label: { en: "Nurse Practitioner (NP)", es: "Enfermera Practicante (NP)" },
    agencyHourlyRate: { low: 125, high: 175 },
    fqhcHourlyRate: { low: 75, high: 100 },
    typicalMarkupPercent: 50,
    caLicense: {
      en: "CA BRN NP License + National Certification (BPC §2835.7)",
      es: "Licencia NP de CA BRN + Certificación Nacional (BPC §2835.7)",
    },
    fqhcAnnualSalaryEquiv: 145_000,
  },
  {
    id: "pa",
    role: "pa",
    label: { en: "Physician Assistant (PA)", es: "Asistente Médico (PA)" },
    agencyHourlyRate: { low: 115, high: 160 },
    fqhcHourlyRate: { low: 70, high: 95 },
    typicalMarkupPercent: 45,
    caLicense: {
      en: "CA Physician Assistant Board License (BPC §3500 et seq.)",
      es: "Licencia de la Junta de PA de CA (BPC §3500 et seq.)",
    },
    fqhcAnnualSalaryEquiv: 140_000,
  },
  {
    id: "dentist",
    role: "dentist",
    label: { en: "Dentist (DDS/DMD)", es: "Dentista (DDS/DMD)" },
    agencyHourlyRate: { low: 150, high: 250 },
    fqhcHourlyRate: { low: 100, high: 150 },
    typicalMarkupPercent: 40,
    caLicense: {
      en: "CA Dental Board License (BPC §1600 et seq.)",
      es: "Licencia de la Junta Dental de CA (BPC §1600 et seq.)",
    },
    fqhcAnnualSalaryEquiv: 185_000,
  },
];

/* ------------------------------------------------------------------ */
/*  Coverage Scenarios — real-world examples                           */
/* ------------------------------------------------------------------ */

export const COVERAGE_SCENARIOS: CoverageScenario[] = [
  {
    id: "vacation-np",
    name: { en: "2-Week Vacation Coverage", es: "Cobertura de Vacaciones de 2 Semanas" },
    description: {
      en: "Your only NP goes on a 2-week vacation. Without coverage, you lose 10 days of billable encounters — roughly $40,000 in PPS revenue at 18 encounters/day.",
      es: "Su único NP se va de vacaciones 2 semanas. Sin cobertura, pierde 10 días de encuentros facturables — aproximadamente $40,000 en ingresos PPS a 18 encuentros/día.",
    },
    providerTypeId: "np",
    durationDays: 10,
    hoursPerDay: 8,
    agencyCost: 12_000,
    directCost: 6_800,
    savings: 5_200,
    savingsPercent: 43,
  },
  {
    id: "recruitment-md",
    name: { en: "1-Month Recruitment Gap", es: "Brecha de Reclutamiento de 1 Mes" },
    description: {
      en: "A physician leaves and recruitment takes 3-6 months. Cover the first month while you search. Average FQHC physician recruitment takes 201 days (AAPPR).",
      es: "Un médico se va y el reclutamiento toma 3-6 meses. Cubra el primer mes mientras busca. El reclutamiento promedio de médicos FQHC toma 201 días (AAPPR).",
    },
    providerTypeId: "md",
    durationDays: 22,
    hoursPerDay: 8,
    agencyCost: 48_400,
    directCost: 28_600,
    savings: 19_800,
    savingsPercent: 41,
  },
  {
    id: "weekend-pa",
    name: { en: "Weekend & Extended Hours", es: "Fines de Semana y Horario Extendido" },
    description: {
      en: "Expand to Saturday clinics with a PA for 3 months. Capture patients who can't come during weekdays — reducing ED utilization and generating additional PPS revenue.",
      es: "Amplíe a clínicas de sábado con un PA durante 3 meses. Atienda pacientes que no pueden venir entre semana — reduciendo uso de urgencias y generando ingresos PPS adicionales.",
    },
    providerTypeId: "pa",
    durationDays: 12,
    hoursPerDay: 6,
    agencyCost: 10_080,
    directCost: 5_760,
    savings: 4_320,
    savingsPercent: 43,
  },
  {
    id: "maternity-np",
    name: { en: "3-Month Maternity Leave", es: "Licencia de Maternidad de 3 Meses" },
    description: {
      en: "An NP takes 12 weeks of maternity leave. Without locum coverage, the remaining providers are overloaded and patient access drops. Agency costs for 3 months can exceed $50,000.",
      es: "Una NP toma 12 semanas de licencia de maternidad. Sin cobertura locum, los proveedores restantes están sobrecargados y el acceso a pacientes disminuye.",
    },
    providerTypeId: "np",
    durationDays: 60,
    hoursPerDay: 8,
    agencyCost: 72_000,
    directCost: 42_000,
    savings: 30_000,
    savingsPercent: 42,
  },
];

/* ------------------------------------------------------------------ */
/*  Benefits                                                           */
/* ------------------------------------------------------------------ */

export const PROVIDER_BENEFITS: LocumBenefit[] = [
  {
    id: "mission",
    iconName: "Heart",
    title: { en: "Mission-Driven Work", es: "Trabajo con Propósito" },
    description: {
      en: "Serve underserved communities in California's safety-net clinics. Make a direct impact on health equity.",
      es: "Sirva a comunidades desatendidas en clínicas de red de seguridad de California. Tenga un impacto directo en la equidad en salud.",
    },
    audience: "provider",
  },
  {
    id: "flexibility",
    iconName: "Calendar",
    title: { en: "Flexible Schedule", es: "Horario Flexible" },
    description: {
      en: "Choose your own days, locations, and duration. Work 1 day/week or full-time temporary — it's up to you.",
      es: "Elija sus propios días, ubicaciones y duración. Trabaje 1 día/semana o temporal a tiempo completo — usted decide.",
    },
    audience: "provider",
  },
  {
    id: "no-middleman",
    iconName: "CircleDollarSign",
    title: { en: "No Agency Middleman", es: "Sin Intermediario de Agencia" },
    description: {
      en: "Keep more of what you earn. No 30-60% agency markup means higher effective pay for the same work.",
      es: "Conserve más de lo que gana. Sin markup de agencia del 30-60% significa mayor pago efectivo por el mismo trabajo.",
    },
    audience: "provider",
  },
  {
    id: "experience",
    iconName: "GraduationCap",
    title: { en: "FQHC Experience", es: "Experiencia en FQHC" },
    description: {
      en: "Build expertise in community health, PPS billing, and Medi-Cal populations. Valuable for career growth.",
      es: "Desarrolle experiencia en salud comunitaria, facturación PPS y poblaciones Medi-Cal. Valioso para el crecimiento profesional.",
    },
    audience: "provider",
  },
  {
    id: "community",
    iconName: "Users",
    title: { en: "Community Impact", es: "Impacto Comunitario" },
    description: {
      en: "Your patients are your neighbors. Serve the communities that need you most — bilingual skills especially valued.",
      es: "Sus pacientes son sus vecinos. Sirva a las comunidades que más lo necesitan — habilidades bilingües especialmente valoradas.",
    },
    audience: "provider",
  },
  {
    id: "transition",
    iconName: "ArrowRightLeft",
    title: { en: "Path to Permanent", es: "Camino a Permanente" },
    description: {
      en: "Many locum assignments convert to permanent roles. Try before you commit — with NHSC loan repayment eligibility.",
      es: "Muchas asignaciones locum se convierten en roles permanentes. Pruebe antes de comprometerse — con elegibilidad de pago de préstamos NHSC.",
    },
    audience: "provider",
  },
];

export const FQHC_BENEFITS: LocumBenefit[] = [
  {
    id: "savings",
    iconName: "PiggyBank",
    title: { en: "40-60% Cost Savings", es: "40-60% de Ahorro en Costos" },
    description: {
      en: "Pay mission-driven rates, not agency premiums. Save $5,000-$30,000+ per coverage period compared to traditional locum agencies.",
      es: "Pague tarifas de misión, no primas de agencia. Ahorre $5,000-$30,000+ por período de cobertura comparado con agencias locum tradicionales.",
    },
    audience: "fqhc",
  },
  {
    id: "cultural-fit",
    iconName: "HeartHandshake",
    title: { en: "Pre-Screened for Cultural Fit", es: "Preseleccionados por Afinidad Cultural" },
    description: {
      en: "Providers who understand FQHC operations, Medi-Cal populations, and community health. Not generic agency placements.",
      es: "Proveedores que entienden operaciones FQHC, poblaciones Medi-Cal y salud comunitaria. No colocaciones genéricas de agencia.",
    },
    audience: "fqhc",
  },
  {
    id: "ehr",
    iconName: "Monitor",
    title: { en: "EHR-Familiar Providers", es: "Proveedores Familiarizados con EHR" },
    description: {
      en: "Match providers who know your EHR system — Epic, eClinicalWorks, NextGen, or Athena. Less onboarding, faster productivity.",
      es: "Combine proveedores que conocen su sistema EHR — Epic, eClinicalWorks, NextGen o Athena. Menos incorporación, mayor productividad.",
    },
    audience: "fqhc",
  },
  {
    id: "continuity",
    iconName: "RefreshCw",
    title: { en: "Continuity of Care", es: "Continuidad de Atención" },
    description: {
      en: "Don't close panels or turn away patients. Keep revenue flowing and access open during staff transitions.",
      es: "No cierre paneles ni rechace pacientes. Mantenga los ingresos fluyendo y el acceso abierto durante transiciones de personal.",
    },
    audience: "fqhc",
  },
  {
    id: "no-contract",
    iconName: "FileCheck",
    title: { en: "No Long-Term Contracts", es: "Sin Contratos a Largo Plazo" },
    description: {
      en: "Book coverage for 1 day or 6 months. No minimum commitments, no cancellation fees, no lock-in.",
      es: "Reserve cobertura por 1 día o 6 meses. Sin compromisos mínimos, sin tarifas de cancelación, sin contratos de permanencia.",
    },
    audience: "fqhc",
  },
  {
    id: "local",
    iconName: "MapPin",
    title: { en: "Local California Providers", es: "Proveedores Locales de California" },
    description: {
      en: "No fly-in costs or travel stipends. Match with providers already in your region who know your community.",
      es: "Sin costos de viaje ni estipendios. Combine con proveedores ya en su región que conocen su comunidad.",
    },
    audience: "fqhc",
  },
];

/* ------------------------------------------------------------------ */
/*  Market Statistics                                                  */
/* ------------------------------------------------------------------ */

export const MARKET_STATS = {
  agencyMarkupRange: { low: 30, high: 60 },
  avgPhysicianRecruitmentDays: 201, // AAPPR 2024 Benchmarking Report
  fqhcVacancyRateProviders: 23, // NACHC 2024 Workforce Survey
  caFqhcCount: 220,
  annualLocumSpendPerFqhc: 150_000, // Estimated avg for CA FQHCs using agencies
  physicianShortageCA2030: 4_100, // AAMC projected physician shortfall for CA
  ppsRateAvg: 225, // Avg Medi-Cal PPS rate
  encountersPerProviderPerDay: 18,
  sources: [
    { label: "AAPPR Benchmarking Report", url: "https://aappr.org/resources/benchmarking/" },
    { label: "NACHC Workforce Survey", url: "https://www.nachc.org/resource/community-health-center-chartbook/" },
    { label: "Staff Care Temporary Staffing Trends", url: "https://www.amnhealthcare.com/staffcare/" },
    { label: "CompHealth Locum Tenens Data", url: "https://comphealth.com/resources/" },
    { label: "AAMC Physician Workforce Projections", url: "https://www.aamc.org/data-reports/workforce" },
  ],
};

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

export const LOCUM_FAQ: LocumFAQ[] = [
  {
    question: {
      en: "How are FQHC-rate locums different from agency locums?",
      es: "¿En qué se diferencian los locums a tarifa FQHC de los de agencia?",
    },
    answer: {
      en: "Traditional locum agencies charge FQHCs $200-350/hour for a physician and take a 30-60% markup. Our network connects you directly with mission-driven providers willing to work at FQHC-competitive rates ($130-200/hour for MDs), cutting out the middleman and saving your organization 40-60% on temporary coverage costs.",
      es: "Las agencias locum tradicionales cobran a los FQHC $200-350/hora por un médico y toman un markup del 30-60%. Nuestra red lo conecta directamente con proveedores comprometidos con la misión dispuestos a trabajar a tarifas competitivas FQHC ($130-200/hora para MDs), eliminando el intermediario y ahorrando a su organización 40-60% en costos de cobertura temporal.",
    },
  },
  {
    question: {
      en: "What about malpractice insurance and credentialing?",
      es: "¿Qué hay del seguro de mala praxis y credencialización?",
    },
    answer: {
      en: "Providers in our network maintain their own malpractice insurance (occurrence-based recommended). We verify active CA licensure and board certification. Your organization handles credentialing through your standard privileging process — we provide all documentation needed to expedite this.",
      es: "Los proveedores en nuestra red mantienen su propio seguro de mala praxis (se recomienda basado en ocurrencia). Verificamos licencia activa de CA y certificación de la junta. Su organización maneja la credencialización a través de su proceso estándar de privilegios — proporcionamos toda la documentación necesaria para agilizar esto.",
    },
  },
  {
    question: {
      en: "Can locum providers bill under PPS?",
      es: "¿Pueden los proveedores locum facturar bajo PPS?",
    },
    answer: {
      en: "Yes. Locum MDs, NPs, PAs, and dentists credentialed at your FQHC can generate PPS encounters. Under the FQHC PPS system, the encounter is billed by the facility, not the individual provider. This means locum coverage directly generates revenue — typically $225+ per encounter.",
      es: "Sí. Los MDs, NPs, PAs y dentistas locum credencializados en su FQHC pueden generar encuentros PPS. Bajo el sistema PPS de FQHC, el encuentro es facturado por la instalación, no el proveedor individual. Esto significa que la cobertura locum genera ingresos directamente — típicamente $225+ por encuentro.",
    },
  },
  {
    question: {
      en: "How quickly can I get a provider?",
      es: "¿Qué tan rápido puedo obtener un proveedor?",
    },
    answer: {
      en: "For planned absences (vacations, known departures), we recommend 4-6 weeks lead time for credentialing. For urgent coverage needs, we can match you with pre-credentialed providers at partner FQHCs or providers with expedited credentialing capability within 1-2 weeks.",
      es: "Para ausencias planificadas (vacaciones, salidas conocidas), recomendamos 4-6 semanas de anticipación para credencialización. Para necesidades urgentes, podemos conectarlo con proveedores pre-credencializados en FQHCs asociados o proveedores con capacidad de credencialización acelerada en 1-2 semanas.",
    },
  },
  {
    question: {
      en: "Is this an employment agency? Do I need to register?",
      es: "¿Es esto una agencia de empleo? ¿Necesito registrarme?",
    },
    answer: {
      en: "We operate as a free matching platform, not an employment agency. Providers are independent contractors who contract directly with your FQHC. We don't charge placement fees, take a cut of provider pay, or act as the employer. There's no cost for FQHCs or providers to use the platform.",
      es: "Operamos como una plataforma de coincidencia gratuita, no como una agencia de empleo. Los proveedores son contratistas independientes que contratan directamente con su FQHC. No cobramos tarifas de colocación, no tomamos una parte del pago del proveedor, ni actuamos como empleador. No hay costo para FQHCs o proveedores por usar la plataforma.",
    },
  },
  {
    question: {
      en: "What EHR systems do your providers know?",
      es: "¿Qué sistemas EHR conocen sus proveedores?",
    },
    answer: {
      en: "We match based on EHR experience. Most FQHC-experienced providers are familiar with Epic (OCHIN), eClinicalWorks, NextGen, or Athena. We tag each provider's EHR proficiency so you get someone who can start with minimal training.",
      es: "Combinamos basándonos en experiencia EHR. La mayoría de proveedores con experiencia FQHC están familiarizados con Epic (OCHIN), eClinicalWorks, NextGen o Athena. Etiquetamos la competencia EHR de cada proveedor para que obtenga alguien que pueda comenzar con entrenamiento mínimo.",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Calculator                                                         */
/* ------------------------------------------------------------------ */

export function calculateCoverageCost(
  providerTypeId: string,
  durationDays: number,
  hoursPerDay: number
): {
  agencyCost: { low: number; high: number };
  directCost: { low: number; high: number };
  savings: { low: number; high: number };
  savingsPercent: { low: number; high: number };
  revenueGenerated: number;
} {
  const provider = PROVIDER_TYPES.find((p) => p.id === providerTypeId) ?? PROVIDER_TYPES[0];
  const totalHours = durationDays * hoursPerDay;

  const agencyLow = totalHours * provider.agencyHourlyRate.low;
  const agencyHigh = totalHours * provider.agencyHourlyRate.high;
  const directLow = totalHours * provider.fqhcHourlyRate.low;
  const directHigh = totalHours * provider.fqhcHourlyRate.high;

  // Revenue generated: encounters per day × PPS rate × days
  const encountersPerDay = Math.round(hoursPerDay * 2.25); // ~2.25 encounters per hour
  const revenueGenerated = encountersPerDay * MARKET_STATS.ppsRateAvg * durationDays;

  return {
    agencyCost: { low: agencyLow, high: agencyHigh },
    directCost: { low: directLow, high: directHigh },
    savings: { low: agencyLow - directHigh, high: agencyHigh - directLow },
    savingsPercent: {
      low: Math.round(((agencyLow - directHigh) / agencyLow) * 100),
      high: Math.round(((agencyHigh - directLow) / agencyHigh) * 100),
    },
    revenueGenerated,
  };
}

/* ------------------------------------------------------------------ */
/*  Regions                                                            */
/* ------------------------------------------------------------------ */

export const CA_REGIONS = [
  { id: "la", label: { en: "Los Angeles", es: "Los Ángeles" } },
  { id: "san-diego", label: { en: "San Diego", es: "San Diego" } },
  { id: "bay-area", label: { en: "SF Bay Area", es: "Área de la Bahía de SF" } },
  { id: "sacramento", label: { en: "Sacramento", es: "Sacramento" } },
  { id: "central-valley", label: { en: "Central Valley", es: "Valle Central" } },
  { id: "inland-empire", label: { en: "Inland Empire", es: "Inland Empire" } },
  { id: "central-coast", label: { en: "Central Coast", es: "Costa Central" } },
  { id: "north-state", label: { en: "North State", es: "Norte del Estado" } },
  { id: "north-coast", label: { en: "North Coast", es: "Costa Norte" } },
];

export const EHR_SYSTEMS = [
  "Epic (OCHIN)",
  "eClinicalWorks",
  "NextGen",
  "Athena",
  "Greenway",
  "Other",
];

export const LOCUM_LAST_UPDATED = "2026-03-05";
