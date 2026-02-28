// fqhc-case-studies.ts
// Real FQHC case studies structured around Rumelt's "Good Strategy, Bad Strategy" framework
// Every case study has: Diagnose → Guiding Policy → Coherent Actions → Measured Outcomes
// Every claim backed by primary source URL
// Last updated: 2026-02-27

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type StrategyCategory =
  | "revenue-diversification"
  | "federal-dependency-reduction"
  | "ai-implementation"
  | "workforce-retention"
  | "operational-efficiency"
  | "patient-access";

export interface CaseStudyOutcome {
  metric: string;
  value: string;
  context: { en: string; es: string };
}

export interface FQHCCaseStudy {
  id: string;
  fqhcName: string;
  fqhcSlug: string | null; // link to /directory/[slug] if in our 220
  location: string;
  challenge: { en: string; es: string }; // Rumelt: Diagnose the problem
  guidingPolicy: { en: string; es: string }; // Rumelt: Guiding policy
  actions: { en: string; es: string }[]; // Rumelt: Coherent actions
  outcomes: CaseStudyOutcome[];
  strategyCategory: StrategyCategory;
  primarySourceUrl: string;
  primarySourceOrg: string;
  additionalSources: { label: string; url: string }[];
  tags: string[];
  datePublished: string;
}

/* ------------------------------------------------------------------ */
/*  Category metadata                                                  */
/* ------------------------------------------------------------------ */

export const STRATEGY_CATEGORIES: {
  id: StrategyCategory;
  en: string;
  es: string;
}[] = [
  {
    id: "revenue-diversification",
    en: "Revenue Diversification",
    es: "Diversificacion de Ingresos",
  },
  {
    id: "federal-dependency-reduction",
    en: "Federal Dependency Reduction",
    es: "Reduccion de Dependencia Federal",
  },
  {
    id: "ai-implementation",
    en: "AI Implementation",
    es: "Implementacion de IA",
  },
  {
    id: "workforce-retention",
    en: "Workforce Retention",
    es: "Retencion de Fuerza Laboral",
  },
  {
    id: "operational-efficiency",
    en: "Operational Efficiency",
    es: "Eficiencia Operativa",
  },
  {
    id: "patient-access",
    en: "Patient Access",
    es: "Acceso del Paciente",
  },
];

/* ------------------------------------------------------------------ */
/*  Case Studies                                                       */
/* ------------------------------------------------------------------ */

export const CASE_STUDIES: FQHCCaseStudy[] = [
  {
    id: "pureview-federal-dependency",
    fqhcName: "PureView Health Center",
    fqhcSlug: null, // Montana — not in our CA directory
    location: "Great Falls, Montana",
    challenge: {
      en: "PureView Health Center faced a $1 million deficit, negative press about layoffs, and had gone 5 years without successfully recruiting a medical doctor. The board issued a 12-month ultimatum to turn around the organization's finances or face closure. Federal grants accounted for 62.5% of total revenue — making the organization critically vulnerable to any funding cuts.",
      es: "PureView Health Center enfrentaba un deficit de $1 millon, prensa negativa sobre despidos, y habia pasado 5 anos sin reclutar exitosamente un medico. La junta emitio un ultimatum de 12 meses. Las subvenciones federales representaban el 62.5% de los ingresos totales — haciendo a la organizacion criticamente vulnerable a cualquier recorte de financiamiento.",
    },
    guidingPolicy: {
      en: "Restructure the entire business model to eliminate dependency on federal grants as the primary revenue source. The guiding principle: 'No margin, no mission. If we don't have the doors open, we can't serve anyone.' Instead of cutting services, diversify revenue streams to make the mission financially sustainable.",
      es: "Reestructurar todo el modelo de negocio para eliminar la dependencia de subvenciones federales como fuente principal de ingresos. El principio rector: 'Sin margen, no hay mision. Si no tenemos las puertas abiertas, no podemos servir a nadie.' En lugar de recortar servicios, diversificar fuentes de ingresos.",
    },
    actions: [
      {
        en: "Renegotiated managed care contracts with a focus on value-based payment arrangements that rewarded quality outcomes over volume",
        es: "Renegocio contratos de planes de salud con enfoque en arreglos de pago basados en valor que recompensaban resultados de calidad sobre volumen",
      },
      {
        en: "Expanded 340B drug pricing program — established entity-owned pharmacy to maximize drug discount savings instead of using contract pharmacy arrangements",
        es: "Expandio programa de precios de medicamentos 340B — establecio farmacia propia para maximizar ahorros en descuentos de medicamentos",
      },
      {
        en: "Added new service lines (behavioral health, dental, substance use disorder treatment) to increase encounter volume and diversify payer mix",
        es: "Agrego nuevas lineas de servicio (salud conductual, dental, tratamiento de trastornos por uso de sustancias) para aumentar volumen de encuentros y diversificar mezcla de pagadores",
      },
      {
        en: "Stacked competitive grants from HRSA (Quality Improvement Awards, New Access Points), SAMHSA (CCBHC), and state workforce development programs",
        es: "Acumulo subvenciones competitivas de HRSA (Premios de Mejora de Calidad, Nuevos Puntos de Acceso), SAMHSA (CCBHC), y programas estatales de desarrollo de fuerza laboral",
      },
      {
        en: "Restructured leadership team with a dedicated Chief Revenue Officer focused on payer contract optimization and revenue cycle management",
        es: "Reestructuro equipo de liderazgo con un Director de Ingresos dedicado enfocado en optimizacion de contratos de pagadores y gestion del ciclo de ingresos",
      },
    ],
    outcomes: [
      {
        metric: "Federal Revenue Dependency",
        value: "62.5% → 17%",
        context: {
          en: "Federal grants dropped from primary revenue source to supplemental funding",
          es: "Las subvenciones federales pasaron de fuente principal a financiamiento suplementario",
        },
      },
      {
        metric: "Service Volume",
        value: "Expanded",
        context: {
          en: "Increased uninsured patient volume while adding new service lines — grew the mission, not just the margin",
          es: "Aumento el volumen de pacientes sin seguro mientras agregaba nuevas lineas de servicio",
        },
      },
      {
        metric: "Financial Reserves",
        value: "Built",
        context: {
          en: "Moved from $1M deficit to positive reserves, eliminating closure risk",
          es: "Paso de deficit de $1M a reservas positivas, eliminando riesgo de cierre",
        },
      },
    ],
    strategyCategory: "federal-dependency-reduction",
    primarySourceUrl:
      "https://www.fqhc.org/blog/2026/2/4/fqhc-funding-uncertainty-isnt-the-real-problem-the-business-model-is",
    primarySourceOrg: "FQHC Associates",
    additionalSources: [
      {
        label: "5 Strategies to Enhance FQHC Performance",
        url: "https://copehealthsolutions.com/cblog/5-strategies-to-enhance-fqhc-performance-and-financial-sustainability/",
      },
    ],
    tags: [
      "turnaround",
      "revenue-diversification",
      "340b",
      "managed-care",
      "federal-dependency",
    ],
    datePublished: "2026-02-04",
  },

  {
    id: "mcr-health-subscription-model",
    fqhcName: "MCR Health",
    fqhcSlug: null, // Florida — not in our CA directory
    location: "Bradenton, Florida",
    challenge: {
      en: "Like many FQHCs, MCR Health faced the fundamental challenge of financial sustainability in a landscape of shrinking federal funding, rising operational costs, and increasing uncompensated care. The traditional FQHC business model — dependent on PPS encounter revenue and federal grants — was insufficient to weather the coming funding cliffs.",
      es: "Como muchos FQHCs, MCR Health enfrentaba el desafio fundamental de sostenibilidad financiera en un panorama de financiamiento federal decreciente, costos operativos crecientes y atencion no compensada en aumento.",
    },
    guidingPolicy: {
      en: "Pioneer a subscription-based primary care model that generates predictable recurring revenue independent of encounter volume or federal funding. Test the model through NACHC's Innovation Incubator to validate feasibility before scaling.",
      es: "Crear un modelo de atencion primaria basado en suscripcion que genere ingresos recurrentes predecibles independientes del volumen de encuentros o financiamiento federal.",
    },
    actions: [
      {
        en: "Applied for and was selected as one of only 8 health centers nationwide for NACHC's 2026 Innovation Incubator: Financial Diversification and Sustainability",
        es: "Solicito y fue seleccionado como uno de solo 8 centros de salud a nivel nacional para el Incubador de Innovacion 2026 de NACHC",
      },
      {
        en: "Designing a subscription-based primary care offering for patients who may not qualify for Medi-Cal/Medicaid but cannot afford commercial insurance",
        es: "Disenando una oferta de atencion primaria basada en suscripcion para pacientes que no califican para Medicaid pero no pueden pagar seguro comercial",
      },
      {
        en: "Building a predictable revenue stream that reduces dependency on per-encounter PPS rates",
        es: "Construyendo un flujo de ingresos predecible que reduce la dependencia de tarifas PPS por encuentro",
      },
    ],
    outcomes: [
      {
        metric: "NACHC Selection",
        value: "1 of 8 nationwide",
        context: {
          en: "Selected for NACHC's inaugural Financial Diversification Innovation Incubator — model is being tested and validated nationally",
          es: "Seleccionado para el Incubador de Innovacion de Diversificacion Financiera inaugural de NACHC",
        },
      },
      {
        metric: "Model Status",
        value: "In development",
        context: {
          en: "Subscription-based primary care model being designed and tested through the 2026 Incubator program",
          es: "Modelo de atencion primaria basado en suscripcion siendo disenado y probado a traves del programa Incubador 2026",
        },
      },
    ],
    strategyCategory: "revenue-diversification",
    primarySourceUrl:
      "https://www.pulseofmanatee.com/p/mcr-health-selected-for-national",
    primarySourceOrg: "Pulse of Manatee",
    additionalSources: [
      {
        label: "NACHC Innovation Incubator",
        url: "https://www.nachc.org/",
      },
    ],
    tags: [
      "subscription-model",
      "innovation",
      "nachc",
      "revenue-diversification",
    ],
    datePublished: "2026-01-15",
  },

  {
    id: "highland-health-340b",
    fqhcName: "Highland Health",
    fqhcSlug: null, // Not in CA directory
    location: "United States",
    challenge: {
      en: "Highland Health's pharmacy program was underperforming — generating modest revenue from the 340B drug pricing program despite serving a large patient population eligible for discounted medications. Contract pharmacy arrangements left significant 340B savings on the table. With PPS rates under pressure and federal grants uncertain, the pharmacy program needed to become a major revenue engine.",
      es: "El programa de farmacia de Highland Health tenia un rendimiento inferior — generando ingresos modestos del programa 340B a pesar de servir a una gran poblacion de pacientes. Los arreglos de farmacia por contrato dejaban ahorros significativos del 340B sin capturar.",
    },
    guidingPolicy: {
      en: "Transform the 340B pharmacy program from a cost center into the organization's primary revenue diversification engine by transitioning from contract pharmacy to entity-owned pharmacy operations, maximizing drug discount capture rates.",
      es: "Transformar el programa de farmacia 340B de un centro de costos al principal motor de diversificacion de ingresos transitando de farmacia por contrato a farmacia propia.",
    },
    actions: [
      {
        en: "Transitioned from contract pharmacy arrangements to entity-owned pharmacy operations for greater control over 340B savings",
        es: "Transiciono de arreglos de farmacia por contrato a operaciones de farmacia propia para mayor control sobre ahorros 340B",
      },
      {
        en: "Expanded pharmacy capacity and hours to increase prescription fill volume",
        es: "Expandio capacidad y horarios de farmacia para aumentar volumen de prescripciones surtidas",
      },
      {
        en: "Implemented systematic 340B eligibility screening to ensure all qualifying patients and prescriptions were captured in the program",
        es: "Implemento evaluacion sistematica de elegibilidad 340B para asegurar que todos los pacientes y prescripciones calificados fueran capturados",
      },
      {
        en: "Trained clinical staff to route prescriptions through the entity-owned pharmacy rather than external pharmacies",
        es: "Capacito al personal clinico para dirigir prescripciones a traves de la farmacia propia en lugar de farmacias externas",
      },
    ],
    outcomes: [
      {
        metric: "Revenue Increase",
        value: "270%",
        context: {
          en: "Total pharmacy revenue grew 270% after transitioning to entity-owned pharmacy operations",
          es: "Los ingresos totales de farmacia crecieron 270% despues de la transicion a farmacia propia",
        },
      },
      {
        metric: "Prescription Volume",
        value: "+170%",
        context: {
          en: "Prescriptions filled increased 170% with expanded capacity and hours",
          es: "Las prescripciones surtidas aumentaron 170% con capacidad y horarios expandidos",
        },
      },
      {
        metric: "Monthly Capacity",
        value: "+560%",
        context: {
          en: "Monthly pharmacy dispensing capacity grew 560% from baseline",
          es: "La capacidad mensual de dispensacion de farmacia crecio 560% desde la linea base",
        },
      },
    ],
    strategyCategory: "revenue-diversification",
    primarySourceUrl:
      "https://www.fqhc340b.com/service/entity-owned-pharmacy-services",
    primarySourceOrg: "FQHC340B",
    additionalSources: [
      {
        label: "340B Hit $81 Billion in 2024",
        url: "https://www.drugchannels.net/2025/12/340b-hit-81-billion-in-2024-23-why-cms.html",
      },
      {
        label: "Hidden Revenue Opportunities for FQHCs",
        url: "https://www.jillsteeley.com/blog/the-hidden-revenue-opportunities-most-fqhcs-are-missing",
      },
    ],
    tags: ["340b", "pharmacy", "entity-owned", "revenue-growth"],
    datePublished: "2025-12-01",
  },

  {
    id: "urban-health-plan-ai-scheduling",
    fqhcName: "Urban Health Plan",
    fqhcSlug: null, // New York — not in CA directory
    location: "Bronx, New York",
    challenge: {
      en: "Urban Health Plan, a large FQHC serving the South Bronx, struggled with high patient no-show rates that reduced encounter revenue, wasted provider time, and limited access for patients who needed appointments. Traditional reminder calls and manual scheduling were insufficient to predict and prevent no-shows at scale.",
      es: "Urban Health Plan, un gran FQHC sirviendo al Sur del Bronx, luchaba con altas tasas de inasistencia de pacientes que reducian ingresos por encuentro, desperdiciaban tiempo de proveedores, y limitaban acceso para pacientes que necesitaban citas.",
    },
    guidingPolicy: {
      en: "Deploy AI-powered predictive scheduling through the NACHC-eClinicalWorks partnership to forecast which patients are likely to miss appointments, enabling proactive outreach and smart overbooking to maintain full provider schedules.",
      es: "Desplegar programacion predictiva impulsada por IA a traves de la asociacion NACHC-eClinicalWorks para pronosticar que pacientes probablemente falten a citas, permitiendo alcance proactivo y sobreprogramacion inteligente.",
    },
    actions: [
      {
        en: "Adopted healow AI no-show prediction tool through NACHC Select program, reducing individual acquisition cost",
        es: "Adopto herramienta de prediccion de inasistencia healow AI a traves del programa NACHC Select, reduciendo costos de adquisicion",
      },
      {
        en: "Integrated AI predictions into scheduling workflows — staff received alerts for high-risk no-show patients",
        es: "Integro predicciones de IA en flujos de programacion — el personal recibia alertas para pacientes con alto riesgo de inasistencia",
      },
      {
        en: "Implemented proactive outreach (calls, texts, transportation assistance) targeted at predicted no-show patients",
        es: "Implemento alcance proactivo (llamadas, textos, asistencia de transporte) dirigido a pacientes con prediccion de inasistencia",
      },
    ],
    outcomes: [
      {
        metric: "Monthly Visit Volume",
        value: "Record high",
        context: {
          en: "Achieved record-high monthly visit volumes after AI scheduling deployment",
          es: "Logro volumenes record de visitas mensuales despues del despliegue de programacion con IA",
        },
      },
      {
        metric: "No-Show Rate",
        value: "Significantly reduced",
        context: {
          en: "Meaningful reduction in patient no-shows through predictive targeting",
          es: "Reduccion significativa en inasistencias de pacientes a traves de focalizacion predictiva",
        },
      },
    ],
    strategyCategory: "ai-implementation",
    primarySourceUrl:
      "https://www.nachc.org/nachc-and-eclinicalworks-partner-to-advance-health-it-and-ai-innovations-at-community-health-centers/",
    primarySourceOrg: "NACHC",
    additionalSources: [
      {
        label: "CHAI-NACHC AI Partnership",
        url: "https://www.nachc.org/chai-and-nachc-join-forces-to-prioritize-community-health-centers-in-ai-adoption/",
      },
    ],
    tags: ["ai", "scheduling", "no-show-reduction", "eclinicalworks", "nachc"],
    datePublished: "2025-11-01",
  },

  {
    id: "sun-river-health-ai-documentation",
    fqhcName: "Sun River Health",
    fqhcSlug: null, // New York — not in CA directory
    location: "Peekskill, New York",
    challenge: {
      en: "Sun River Health providers spent hours after clinic completing patient documentation — a common FQHC problem that contributes to burnout, reduces provider satisfaction, and limits the number of patients who can be seen daily. Documentation after-hours ('pajama time') was eating into provider quality of life and retention.",
      es: "Los proveedores de Sun River Health pasaban horas despues de la clinica completando documentacion de pacientes — un problema comun de FQHC que contribuye al agotamiento, reduce la satisfaccion del proveedor, y limita la cantidad de pacientes atendidos diariamente.",
    },
    guidingPolicy: {
      en: "Deploy AI ambient documentation (Sunoh.ai) through the NACHC-eClinicalWorks partnership to automate clinical note generation during patient encounters, eliminating after-hours documentation burden.",
      es: "Desplegar documentacion ambiental con IA (Sunoh.ai) a traves de la asociacion NACHC-eClinicalWorks para automatizar la generacion de notas clinicas durante encuentros con pacientes.",
    },
    actions: [
      {
        en: "Rolled out Sunoh.ai ambient documentation tool that listens to provider-patient conversations and generates structured clinical notes in real-time",
        es: "Implemento herramienta de documentacion ambiental Sunoh.ai que escucha conversaciones proveedor-paciente y genera notas clinicas estructuradas en tiempo real",
      },
      {
        en: "Trained providers on the review-and-sign workflow — AI generates the note, provider reviews and approves rather than writing from scratch",
        es: "Capacito a proveedores en el flujo de revisar-y-firmar — la IA genera la nota, el proveedor revisa y aprueba en lugar de escribir desde cero",
      },
      {
        en: "Tracked documentation completion times to measure provider time savings",
        es: "Rastreo tiempos de completar documentacion para medir ahorros de tiempo del proveedor",
      },
    ],
    outcomes: [
      {
        metric: "Documentation Speed",
        value: "26 patients in 30 min",
        context: {
          en: "Providers completed notes on 26 patients within 30 minutes of finishing their last appointment — virtually eliminating after-hours documentation",
          es: "Los proveedores completaron notas de 26 pacientes en 30 minutos despues de terminar su ultima cita — eliminando virtualmente la documentacion fuera de horario",
        },
      },
      {
        metric: "Provider Burnout",
        value: "Reduced",
        context: {
          en: "Elimination of 'pajama time' documentation contributed to improved provider satisfaction and retention",
          es: "La eliminacion de documentacion 'en pijama' contribuyo a mejor satisfaccion y retencion de proveedores",
        },
      },
    ],
    strategyCategory: "ai-implementation",
    primarySourceUrl:
      "https://www.nachc.org/nachc-and-eclinicalworks-partner-to-advance-health-it-and-ai-innovations-at-community-health-centers/",
    primarySourceOrg: "NACHC",
    additionalSources: [
      {
        label: "AI Will Redefine FQHC Access in 2026",
        url: "https://www.emergingglobal.com/blog/how-ai-will-redefine-fqhc-access-scheduling-and-patient-experience-in-2026",
      },
    ],
    tags: [
      "ai",
      "documentation",
      "ambient-scribing",
      "burnout-reduction",
      "sunoh",
    ],
    datePublished: "2025-11-01",
  },

  {
    id: "united-health-centers-ipa",
    fqhcName: "United Health Centers of the San Joaquin Valley",
    fqhcSlug: "united-health-centers", // In our CA directory
    location: "Parlier, California",
    challenge: {
      en: "United Health Centers, one of California's largest FQHCs serving the San Joaquin Valley's predominantly Latino farmworker population, faced the 'financial tsunami' of converging federal Medicaid cuts and state Medi-Cal reductions. With over 51% of the Valley population on Medi-Cal, traditional PPS encounter revenue was insufficient to sustain operations — especially as work requirements and per-capita caps threaten to reduce the insured patient base.",
      es: "United Health Centers, uno de los FQHCs mas grandes de California sirviendo a la poblacion predominantemente latina de trabajadores agricolas del Valle de San Joaquin, enfrentaba el 'tsunami financiero' de recortes convergentes de Medicaid federal y Medi-Cal estatal.",
    },
    guidingPolicy: {
      en: "Diversify beyond the FQHC model by launching a for-profit Independent Practice Association (IPA) to capture managed care capitation revenue — moving from encounter-based PPS payments to population-based risk contracts.",
      es: "Diversificar mas alla del modelo FQHC lanzando una Asociacion de Practica Independiente (IPA) con fines de lucro para capturar ingresos de capitacion de planes de salud.",
    },
    actions: [
      {
        en: "Established United Physicians Network, a for-profit IPA subsidiary — unusual for an FQHC but legally permissible through subsidiary structure",
        es: "Establecio United Physicians Network, una subsidiaria IPA con fines de lucro — inusual para un FQHC pero legalmente permitido a traves de estructura de subsidiaria",
      },
      {
        en: "Positioned the IPA to negotiate managed care capitation contracts directly with MCOs, capturing per-member-per-month revenue independent of encounter volume",
        es: "Posiciono la IPA para negociar contratos de capitacion directamente con MCOs, capturando ingresos por miembro por mes independientes del volumen de encuentros",
      },
      {
        en: "Leveraged existing provider network and patient relationships to attract managed care plan assignments",
        es: "Aprovecho la red de proveedores existente y las relaciones con pacientes para atraer asignaciones de planes de salud",
      },
    ],
    outcomes: [
      {
        metric: "Revenue Model",
        value: "New capitation stream",
        context: {
          en: "Created a new managed care capitation revenue stream through the IPA subsidiary, reducing PPS encounter dependency",
          es: "Creo un nuevo flujo de ingresos de capitacion a traves de la subsidiaria IPA, reduciendo la dependencia de encuentros PPS",
        },
      },
      {
        metric: "Model Innovation",
        value: "First of its kind",
        context: {
          en: "One of the first FQHCs to launch a for-profit IPA — a potential model for large FQHCs seeking revenue diversification beyond traditional PPS",
          es: "Uno de los primeros FQHCs en lanzar una IPA con fines de lucro — un modelo potencial para FQHCs grandes que buscan diversificacion de ingresos",
        },
      },
    ],
    strategyCategory: "revenue-diversification",
    primarySourceUrl: "https://www.unitedhealthcenters.org/",
    primarySourceOrg: "United Health Centers",
    additionalSources: [
      {
        label: "SJV Financial Tsunami (KVPR)",
        url: "https://www.kvpr.org/health/2026-02-10/valley-hospitals-clinics-brace-for-financial-tsunami-threatening-health-care-access",
      },
    ],
    tags: ["ipa", "capitation", "managed-care", "revenue-diversification", "central-valley"],
    datePublished: "2026-02-20",
  },
];

/* ------------------------------------------------------------------ */
/*  Helper functions                                                    */
/* ------------------------------------------------------------------ */

/** Get all case studies, optionally filtered by category */
export function getCaseStudies(category?: StrategyCategory): FQHCCaseStudy[] {
  if (category) {
    return CASE_STUDIES.filter((cs) => cs.strategyCategory === category);
  }
  return CASE_STUDIES;
}

/** Get case studies for a specific FQHC by slug */
export function getCaseStudiesForFQHC(slug: string): FQHCCaseStudy[] {
  return CASE_STUDIES.filter((cs) => cs.fqhcSlug === slug);
}

/** Get unique strategy categories with counts */
export function getCaseStudyCounts(): Record<StrategyCategory, number> & {
  total: number;
} {
  const counts = { total: CASE_STUDIES.length } as Record<
    StrategyCategory,
    number
  > & { total: number };
  for (const cat of STRATEGY_CATEGORIES) {
    counts[cat.id] = CASE_STUDIES.filter(
      (cs) => cs.strategyCategory === cat.id
    ).length;
  }
  return counts;
}
