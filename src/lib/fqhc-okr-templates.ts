// fqhc-okr-templates.ts
// OKR templates for FQHC crisis change management
// Designed to break down silos between departments and connect strategy to measurable outcomes
// Each OKR links to related case studies and intel items when applicable
// Last updated: 2026-02-27

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type OKRDomain =
  | "revenue-resilience"
  | "workforce-retention"
  | "patient-access"
  | "operational-efficiency"
  | "cross-department";

export interface KeyResult {
  kr: { en: string; es: string };
  metric: string;
  target: string;
  departmentsInvolved: string[];
}

export interface OKRTemplate {
  id: string;
  domain: OKRDomain;
  objective: { en: string; es: string };
  keyResults: KeyResult[];
  context: { en: string; es: string }; // Why this OKR matters right now
  relatedCaseStudyId?: string; // Links to fqhc-case-studies.ts
  relatedIntelIds?: string[]; // Links to fqhc-news-intel.ts
  timeframe: "quarterly" | "annual";
  difficulty: "starter" | "intermediate" | "advanced";
  tags: string[];
}

/* ------------------------------------------------------------------ */
/*  Domain metadata                                                    */
/* ------------------------------------------------------------------ */

export const OKR_DOMAINS: {
  id: OKRDomain;
  en: string;
  es: string;
  description: { en: string; es: string };
}[] = [
  {
    id: "revenue-resilience",
    en: "Revenue Resilience",
    es: "Resiliencia de Ingresos",
    description: {
      en: "Diversify revenue streams and reduce dependency on any single funding source",
      es: "Diversificar fuentes de ingresos y reducir dependencia de cualquier fuente unica de financiamiento",
    },
  },
  {
    id: "workforce-retention",
    en: "Workforce Retention",
    es: "Retencion de Fuerza Laboral",
    description: {
      en: "Reduce turnover, prevent burnout, and build sustainable staffing models",
      es: "Reducir rotacion, prevenir agotamiento, y construir modelos de dotacion sostenibles",
    },
  },
  {
    id: "patient-access",
    en: "Patient Access",
    es: "Acceso del Paciente",
    description: {
      en: "Maintain and expand access for vulnerable populations including undocumented communities",
      es: "Mantener y expandir acceso para poblaciones vulnerables incluyendo comunidades indocumentadas",
    },
  },
  {
    id: "operational-efficiency",
    en: "Operational Efficiency",
    es: "Eficiencia Operativa",
    description: {
      en: "Leverage technology and process improvement to do more with less",
      es: "Aprovechar tecnologia y mejora de procesos para hacer mas con menos",
    },
  },
  {
    id: "cross-department",
    en: "Cross-Department Alignment",
    es: "Alineacion Interdepartamental",
    description: {
      en: "Break down silos between clinical, finance, operations, and community outreach",
      es: "Romper silos entre clinica, finanzas, operaciones y alcance comunitario",
    },
  },
];

export const DIFFICULTY_LABELS: Record<
  "starter" | "intermediate" | "advanced",
  { en: string; es: string; color: string }
> = {
  starter: {
    en: "Starter",
    es: "Inicial",
    color: "bg-green-100 text-green-800",
  },
  intermediate: {
    en: "Intermediate",
    es: "Intermedio",
    color: "bg-amber-100 text-amber-800",
  },
  advanced: {
    en: "Advanced",
    es: "Avanzado",
    color: "bg-red-100 text-red-800",
  },
};

/* ------------------------------------------------------------------ */
/*  OKR Templates                                                      */
/* ------------------------------------------------------------------ */

export const OKR_TEMPLATES: OKRTemplate[] = [
  /* ── STARTER ── */
  {
    id: "starter-chw-billing",
    domain: "revenue-resilience",
    objective: {
      en: "Cross-train 100% of CHWs on new Medi-Cal billing codes within 90 days",
      es: "Capacitar al 100% de los CHWs en nuevos codigos de facturacion de Medi-Cal en 90 dias",
    },
    keyResults: [
      {
        kr: {
          en: "All CHWs complete billing code training module",
          es: "Todos los CHWs completan modulo de capacitacion en codigos de facturacion",
        },
        metric: "CHWs trained",
        target: "100%",
        departmentsInvolved: ["Clinical", "Finance/Billing", "HR/Training"],
      },
      {
        kr: {
          en: "First CHW encounters billed under new codes within 30 days",
          es: "Primeros encuentros CHW facturados bajo nuevos codigos en 30 dias",
        },
        metric: "Days to first billing",
        target: "≤30 days",
        departmentsInvolved: ["Clinical", "Finance/Billing"],
      },
      {
        kr: {
          en: "CHW encounter billing generates $X in new revenue per month",
          es: "Facturacion de encuentros CHW genera $X en nuevos ingresos por mes",
        },
        metric: "Monthly CHW billing revenue",
        target: "Track and report",
        departmentsInvolved: ["Finance/Billing", "Executive"],
      },
    ],
    context: {
      en: "New CHW Medi-Cal billing codes went active January 2026. This is the most significant change for CHW workforce sustainability in a decade — but only FQHCs that train and bill will benefit. Requires clinical, billing, and training departments to coordinate.",
      es: "Los nuevos codigos de facturacion CHW de Medi-Cal se activaron en enero 2026. Este es el cambio mas significativo para la sostenibilidad de la fuerza laboral CHW en una decada — pero solo los FQHCs que capaciten y facturen se beneficiaran.",
    },
    relatedIntelIds: ["chw-medi-cal-billing"],
    timeframe: "quarterly",
    difficulty: "starter",
    tags: ["chw", "billing", "cross-training", "revenue"],
  },
  {
    id: "starter-copay-messaging",
    domain: "patient-access",
    objective: {
      en: "Launch 'No Copay' patient acquisition campaign within 60 days",
      es: "Lanzar campana de adquisicion de pacientes 'Sin Copago' en 60 dias",
    },
    keyResults: [
      {
        kr: {
          en: "Update all patient-facing materials (signage, website, brochures) with 'No Copay' messaging",
          es: "Actualizar todos los materiales para pacientes con mensaje 'Sin Copago'",
        },
        metric: "Materials updated",
        target: "100%",
        departmentsInvolved: ["Marketing/Communications", "Front Desk"],
      },
      {
        kr: {
          en: "Brief 100% of front desk and outreach staff on FQHC copay exemption talking points",
          es: "Informar al 100% del personal de recepcion y alcance sobre puntos de discusion de exencion de copago FQHC",
        },
        metric: "Staff briefed",
        target: "100%",
        departmentsInvolved: ["Front Desk", "Outreach", "HR/Training"],
      },
      {
        kr: {
          en: "Increase new patient registrations by 10% from patients redirected from copay-charging providers",
          es: "Aumentar registros de nuevos pacientes en 10% de pacientes redirigidos de proveedores que cobran copago",
        },
        metric: "New patient registrations",
        target: "+10%",
        departmentsInvolved: ["Outreach", "Front Desk", "Clinical"],
      },
    ],
    context: {
      en: "H.R. 1 allows states to impose $35 Medicaid copays — but FQHCs are statutorily exempt. This is a significant competitive advantage that most FQHCs are not yet marketing to patients. Patients using hospital EDs or urgent cares will start facing copays.",
      es: "H.R. 1 permite a los estados imponer copagos de $35 de Medicaid — pero los FQHCs estan exentos por ley. Esta es una ventaja competitiva significativa que la mayoria de los FQHCs aun no estan comercializando.",
    },
    relatedCaseStudyId: undefined,
    relatedIntelIds: ["fqhc-copay-exemption", "strategy-copay-exemption-advantage"],
    timeframe: "quarterly",
    difficulty: "starter",
    tags: ["copay", "patient-acquisition", "messaging", "competitive-advantage"],
  },
  {
    id: "starter-documentation-audit",
    domain: "operational-efficiency",
    objective: {
      en: "Eliminate after-hours documentation burden for 80% of providers within one quarter",
      es: "Eliminar carga de documentacion fuera de horario para 80% de los proveedores en un trimestre",
    },
    keyResults: [
      {
        kr: {
          en: "Pilot ambient AI documentation tool with 3 providers in highest-volume department",
          es: "Probar herramienta de documentacion ambiental con IA con 3 proveedores en departamento de mayor volumen",
        },
        metric: "Providers piloting",
        target: "3",
        departmentsInvolved: ["Clinical", "IT", "Executive"],
      },
      {
        kr: {
          en: "Measure average documentation completion time pre and post AI deployment",
          es: "Medir tiempo promedio de completar documentacion antes y despues del despliegue de IA",
        },
        metric: "Documentation time reduction",
        target: "≥40%",
        departmentsInvolved: ["Clinical", "IT", "Quality"],
      },
      {
        kr: {
          en: "Achieve provider satisfaction score of ≥4/5 for documentation workflow",
          es: "Lograr puntuacion de satisfaccion del proveedor ≥4/5 para flujo de documentacion",
        },
        metric: "Provider satisfaction",
        target: "≥4.0/5.0",
        departmentsInvolved: ["Clinical", "HR"],
      },
    ],
    context: {
      en: "Provider burnout is the #1 workforce challenge at FQHCs. Documentation 'pajama time' — completing notes after hours — is a primary driver. AI ambient documentation tools like Sunoh.ai can eliminate this burden. Sun River Health achieved 26 patients documented in 30 minutes.",
      es: "El agotamiento de proveedores es el desafio #1 de fuerza laboral en FQHCs. La documentacion 'en pijama' es un factor principal. Herramientas de IA como Sunoh.ai pueden eliminar esta carga.",
    },
    relatedCaseStudyId: "sun-river-health-ai-documentation",
    timeframe: "quarterly",
    difficulty: "starter",
    tags: ["ai", "documentation", "burnout", "provider-satisfaction"],
  },
  {
    id: "starter-undocumented-reassurance",
    domain: "patient-access",
    objective: {
      en: "Achieve zero untreated walk-aways for undocumented patients through proactive reassurance",
      es: "Lograr cero abandonos sin tratar para pacientes indocumentados a traves de garantias proactivas",
    },
    keyResults: [
      {
        kr: {
          en: "Post multilingual signage in lobbies and exam rooms stating the FQHC does not collect or share immigration status",
          es: "Colocar senalizacion multilingue en vestibulos y salas de examen declarando que el FQHC no recopila ni comparte estatus migratorio",
        },
        metric: "Locations with signage",
        target: "100%",
        departmentsInvolved: ["Operations", "Marketing", "Front Desk"],
      },
      {
        kr: {
          en: "Train 100% of front desk staff on verbal reassurance scripts for undocumented patients",
          es: "Capacitar al 100% del personal de recepcion en guiones de garantias verbales para pacientes indocumentados",
        },
        metric: "Staff trained",
        target: "100%",
        departmentsInvolved: ["Front Desk", "HR/Training", "Outreach"],
      },
      {
        kr: {
          en: "Partner with at least 2 immigrant-serving community organizations for trusted referrals",
          es: "Asociarse con al menos 2 organizaciones comunitarias de servicios a inmigrantes para referencias de confianza",
        },
        metric: "Community partnerships",
        target: "≥2",
        departmentsInvolved: ["Outreach", "Executive"],
      },
    ],
    context: {
      en: "Fear of immigration enforcement is driving undocumented patients away from healthcare — even from FQHCs. With the Medi-Cal enrollment freeze affecting new undocumented adults and ICE attempting to access Medicaid data, proactive reassurance is essential to maintaining patient volume and community trust.",
      es: "El miedo a la aplicacion migratoria esta alejando a pacientes indocumentados de la atencion medica. Con el congelamiento de inscripcion de Medi-Cal y el ICE intentando acceder datos de Medicaid, las garantias proactivas son esenciales.",
    },
    relatedIntelIds: ["medi-cal-enrollment-freeze", "strategy-undocumented-doors-open"],
    timeframe: "quarterly",
    difficulty: "starter",
    tags: ["undocumented", "patient-access", "trust", "signage", "community-partnerships"],
  },

  /* ── INTERMEDIATE ── */
  {
    id: "intermediate-340b-optimization",
    domain: "revenue-resilience",
    objective: {
      en: "Increase 340B pharmacy savings by 100% within 6 months through entity-owned pharmacy transition",
      es: "Aumentar ahorros de farmacia 340B en 100% en 6 meses a traves de transicion a farmacia propia",
    },
    keyResults: [
      {
        kr: {
          en: "Complete feasibility analysis for entity-owned pharmacy vs. current contract pharmacy arrangement",
          es: "Completar analisis de factibilidad para farmacia propia vs. arreglo actual de farmacia por contrato",
        },
        metric: "Analysis completed",
        target: "Month 1",
        departmentsInvolved: ["Finance", "Pharmacy", "Executive", "Legal"],
      },
      {
        kr: {
          en: "Implement systematic 340B eligibility screening for 100% of qualifying patients",
          es: "Implementar evaluacion sistematica de elegibilidad 340B para 100% de pacientes calificados",
        },
        metric: "Patients screened",
        target: "100%",
        departmentsInvolved: ["Clinical", "Pharmacy", "IT"],
      },
      {
        kr: {
          en: "Increase monthly 340B savings by 100% from baseline",
          es: "Aumentar ahorros mensuales 340B en 100% desde la linea base",
        },
        metric: "Monthly 340B savings",
        target: "+100%",
        departmentsInvolved: ["Pharmacy", "Finance"],
      },
    ],
    context: {
      en: "The 340B drug pricing program hit $81.4B in discounted purchases in 2024. Highland Health achieved 270% revenue increase via entity-owned pharmacy. For FQHCs facing PPS rate cuts, 340B optimization is the single largest revenue diversification lever — but requires cross-department coordination between pharmacy, clinical, finance, and IT.",
      es: "El programa 340B alcanzo $81.4 mil millones en compras con descuento en 2024. Highland Health logro 270% de aumento de ingresos via farmacia propia. Para FQHCs enfrentando recortes de tarifas PPS, la optimizacion 340B es la palanca de diversificacion de ingresos mas grande.",
    },
    relatedCaseStudyId: "highland-health-340b",
    timeframe: "quarterly",
    difficulty: "intermediate",
    tags: ["340b", "pharmacy", "revenue-diversification", "entity-owned"],
  },
  {
    id: "intermediate-ai-rcm",
    domain: "operational-efficiency",
    objective: {
      en: "Deploy AI-powered revenue cycle management to achieve 95%+ clean claim rate",
      es: "Desplegar gestion del ciclo de ingresos con IA para lograr tasa de reclamaciones limpias del 95%+",
    },
    keyResults: [
      {
        kr: {
          en: "Select and contract with AI RCM vendor (evaluate RapidClaims, Waystar, Experian Health)",
          es: "Seleccionar y contratar con proveedor de RCM con IA",
        },
        metric: "Vendor selected",
        target: "Month 1",
        departmentsInvolved: ["Finance/Billing", "IT", "Executive"],
      },
      {
        kr: {
          en: "Achieve clean claim rate of ≥95% (from current baseline)",
          es: "Lograr tasa de reclamaciones limpias ≥95%",
        },
        metric: "Clean claim rate",
        target: "≥95%",
        departmentsInvolved: ["Finance/Billing"],
      },
      {
        kr: {
          en: "Reduce denial rate by ≥25% from baseline",
          es: "Reducir tasa de denegacion en ≥25% desde la linea base",
        },
        metric: "Denial rate reduction",
        target: "≥25%",
        departmentsInvolved: ["Finance/Billing", "Clinical"],
      },
      {
        kr: {
          en: "Recover ≥$100K in previously lost revenue through AI-identified under-coding",
          es: "Recuperar ≥$100K en ingresos previamente perdidos a traves de bajo-codificacion identificada por IA",
        },
        metric: "Revenue recovered",
        target: "≥$100K",
        departmentsInvolved: ["Finance/Billing", "Clinical"],
      },
    ],
    context: {
      en: "80% of health systems are exploring AI in RCM but only 15% have fully integrated. Provider organizations lose ~$210K annually from under-billing. FQHCs with complex PPS/sliding fee billing are especially vulnerable. RapidClaims achieves 98% clean claim rates and 40% denial reduction for FQHCs specifically.",
      es: "80% de sistemas de salud estan explorando IA en RCM pero solo 15% la han integrado completamente. FQHCs con facturacion PPS/tarifa variable compleja son especialmente vulnerables.",
    },
    timeframe: "quarterly",
    difficulty: "intermediate",
    tags: ["ai", "rcm", "claims", "denials", "revenue-recovery"],
  },
  {
    id: "intermediate-co-visit-billing",
    domain: "cross-department",
    objective: {
      en: "Implement systematic co-visit billing across all eligible departments within 90 days",
      es: "Implementar facturacion sistematica de co-visitas en todos los departamentos elegibles en 90 dias",
    },
    keyResults: [
      {
        kr: {
          en: "Map all eligible co-visit pairings across departments (BH + primary, dental + primary, CHW + clinical)",
          es: "Mapear todos los emparejamientos elegibles de co-visitas entre departamentos",
        },
        metric: "Pairings mapped",
        target: "Complete map",
        departmentsInvolved: ["Clinical", "BH", "Dental", "Finance/Billing"],
      },
      {
        kr: {
          en: "Train scheduling staff to proactively schedule co-visits for dual-eligible patients",
          es: "Capacitar al personal de programacion para programar proactivamente co-visitas para pacientes con doble elegibilidad",
        },
        metric: "Schedulers trained",
        target: "100%",
        departmentsInvolved: ["Scheduling", "Clinical", "HR/Training"],
      },
      {
        kr: {
          en: "Increase co-visit encounters by ≥50% from baseline, generating additional PPS encounter revenue",
          es: "Aumentar encuentros de co-visita en ≥50% desde la linea base",
        },
        metric: "Co-visit encounter increase",
        target: "≥50%",
        departmentsInvolved: ["Clinical", "BH", "Dental", "Finance/Billing", "Scheduling"],
      },
    ],
    context: {
      en: "Co-visit billing is one of the most underutilized revenue opportunities at FQHCs. When a patient sees a primary care provider AND a behavioral health provider on the same day, both encounters can be billed under PPS. Most FQHCs are leaving significant revenue on the table because scheduling, clinical, and billing departments are not coordinated.",
      es: "La facturacion de co-visitas es una de las oportunidades de ingresos mas subutilizadas en FQHCs. Cuando un paciente ve a un proveedor de atencion primaria Y un proveedor de salud conductual el mismo dia, ambos encuentros pueden facturarse bajo PPS.",
    },
    timeframe: "quarterly",
    difficulty: "intermediate",
    tags: ["co-visit", "billing", "cross-department", "pps", "revenue"],
  },
  {
    id: "intermediate-mco-renegotiation",
    domain: "revenue-resilience",
    objective: {
      en: "Renegotiate top 3 managed care contracts to include CalAIM Community Supports revenue streams",
      es: "Renegociar los 3 principales contratos de planes de salud para incluir flujos de ingresos de Apoyos Comunitarios CalAIM",
    },
    keyResults: [
      {
        kr: {
          en: "Complete contract analysis of current MCO agreements to identify renegotiation opportunities",
          es: "Completar analisis de contratos MCO actuales para identificar oportunidades de renegociacion",
        },
        metric: "Contracts analyzed",
        target: "Top 3",
        departmentsInvolved: ["Finance", "Executive", "Legal"],
      },
      {
        kr: {
          en: "Submit renegotiation proposals to at least 2 MCOs including Community Supports and ECM billing",
          es: "Enviar propuestas de renegociacion a al menos 2 MCOs incluyendo facturacion de Apoyos Comunitarios y ECM",
        },
        metric: "Proposals submitted",
        target: "≥2",
        departmentsInvolved: ["Finance", "Executive"],
      },
      {
        kr: {
          en: "Secure ≥1 new Community Supports revenue stream generating $X/month",
          es: "Asegurar ≥1 nuevo flujo de ingresos de Apoyos Comunitarios generando $X/mes",
        },
        metric: "New revenue streams",
        target: "≥1",
        departmentsInvolved: ["Finance", "Clinical", "Executive"],
      },
    ],
    context: {
      en: "CalAIM Community Supports (housing navigation, sobering centers, recuperative care) represent new revenue streams for FQHCs beyond traditional PPS encounters. With the CalAIM waiver expiring December 2026, FQHCs should lock in MCO contracts that include these billing categories before the waiver renewal creates uncertainty.",
      es: "Los Apoyos Comunitarios CalAIM representan nuevos flujos de ingresos para FQHCs mas alla de los encuentros PPS tradicionales. Con la exencion CalAIM expirando en diciembre 2026, los FQHCs deben asegurar contratos.",
    },
    relatedIntelIds: ["calaim-waiver-expiry", "strategy-revenue-diversification"],
    timeframe: "quarterly",
    difficulty: "intermediate",
    tags: ["mco", "calaim", "community-supports", "contract-negotiation"],
  },

  /* ── ADVANCED ── */
  {
    id: "advanced-federal-dependency",
    domain: "revenue-resilience",
    objective: {
      en: "Reduce federal revenue dependency below 40% within 12 months through systematic diversification",
      es: "Reducir dependencia de ingresos federales por debajo del 40% en 12 meses a traves de diversificacion sistematica",
    },
    keyResults: [
      {
        kr: {
          en: "Establish entity-owned pharmacy generating ≥$500K/year in 340B savings",
          es: "Establecer farmacia propia generando ≥$500K/ano en ahorros 340B",
        },
        metric: "Annual 340B savings",
        target: "≥$500K",
        departmentsInvolved: ["Pharmacy", "Finance", "Executive", "Legal"],
      },
      {
        kr: {
          en: "Launch ≥2 new service lines (e.g., MAT, dental expansion, school-based health) generating independent revenue",
          es: "Lanzar ≥2 nuevas lineas de servicio generando ingresos independientes",
        },
        metric: "New service lines",
        target: "≥2",
        departmentsInvolved: ["Clinical", "Operations", "Finance", "HR"],
      },
      {
        kr: {
          en: "Reduce federal grant percentage of total revenue from current level to <40%",
          es: "Reducir porcentaje de subvenciones federales de ingresos totales a <40%",
        },
        metric: "Federal revenue %",
        target: "<40%",
        departmentsInvolved: ["Finance", "Executive"],
      },
      {
        kr: {
          en: "Hire or designate Chief Revenue Officer responsible for payer contract optimization",
          es: "Contratar o designar Director de Ingresos responsable de optimizacion de contratos con pagadores",
        },
        metric: "CRO position",
        target: "Filled",
        departmentsInvolved: ["Executive", "HR"],
      },
    ],
    context: {
      en: "PureView Health Center reduced federal dependency from 62.5% to 17% and built financial reserves after facing a 12-month closure ultimatum. The principle: 'No margin, no mission.' FQHCs averaging >50% federal revenue are critically exposed to the current funding cliffs — H.R. 1 cuts, CHCF expiration, and work requirements will compound.",
      es: "PureView Health Center redujo la dependencia federal de 62.5% a 17% despues de enfrentar un ultimatum de cierre. El principio: 'Sin margen, no hay mision.'",
    },
    relatedCaseStudyId: "pureview-federal-dependency",
    timeframe: "annual",
    difficulty: "advanced",
    tags: ["federal-dependency", "diversification", "340b", "service-lines"],
  },
  {
    id: "advanced-ipa-launch",
    domain: "revenue-resilience",
    objective: {
      en: "Evaluate and launch managed care IPA to capture capitation revenue beyond PPS encounters",
      es: "Evaluar y lanzar IPA de planes de salud para capturar ingresos de capitacion mas alla de encuentros PPS",
    },
    keyResults: [
      {
        kr: {
          en: "Complete market analysis of managed care capitation opportunity in service area",
          es: "Completar analisis de mercado de oportunidad de capitacion en area de servicio",
        },
        metric: "Analysis completed",
        target: "Month 3",
        departmentsInvolved: ["Executive", "Finance", "Legal"],
      },
      {
        kr: {
          en: "Develop IPA subsidiary structure with legal review for FQHC compliance",
          es: "Desarrollar estructura de subsidiaria IPA con revision legal para cumplimiento FQHC",
        },
        metric: "Legal structure approved",
        target: "Month 6",
        departmentsInvolved: ["Executive", "Legal", "Finance"],
      },
      {
        kr: {
          en: "Secure ≥1 MCO contract with per-member-per-month capitation terms",
          es: "Asegurar ≥1 contrato MCO con terminos de capitacion por miembro por mes",
        },
        metric: "MCO contracts",
        target: "≥1",
        departmentsInvolved: ["Executive", "Finance"],
      },
    ],
    context: {
      en: "United Health Centers SJV launched United Physicians Network, a for-profit IPA subsidiary. This FQHC-to-IPA expansion captures managed care capitation revenue independent of encounter volume — critical as PPS rates face cuts for undocumented patient services. This model is best suited for large FQHCs with >50 providers.",
      es: "United Health Centers SJV lanzo una IPA con fines de lucro. Esta expansion de FQHC a IPA captura ingresos de capitacion independientes del volumen de encuentros.",
    },
    relatedCaseStudyId: "united-health-centers-ipa",
    timeframe: "annual",
    difficulty: "advanced",
    tags: ["ipa", "capitation", "managed-care", "subsidiary"],
  },
  {
    id: "advanced-ai-full-stack",
    domain: "operational-efficiency",
    objective: {
      en: "Deploy full-stack AI across documentation, scheduling, and RCM — saving 2,000+ staff hours per quarter",
      es: "Desplegar IA de pila completa en documentacion, programacion y RCM — ahorrando 2,000+ horas de personal por trimestre",
    },
    keyResults: [
      {
        kr: {
          en: "Deploy ambient AI documentation across 100% of clinical providers",
          es: "Desplegar documentacion ambiental con IA en 100% de proveedores clinicos",
        },
        metric: "Providers on AI documentation",
        target: "100%",
        departmentsInvolved: ["Clinical", "IT"],
      },
      {
        kr: {
          en: "Implement AI-powered no-show prediction, reducing no-show rate by ≥30%",
          es: "Implementar prediccion de inasistencia con IA, reduciendo tasa de inasistencia en ≥30%",
        },
        metric: "No-show rate reduction",
        target: "≥30%",
        departmentsInvolved: ["Scheduling", "IT", "Outreach"],
      },
      {
        kr: {
          en: "Achieve AI-powered clean claim rate of ≥98% across all payers",
          es: "Lograr tasa de reclamaciones limpias con IA de ≥98% en todos los pagadores",
        },
        metric: "Clean claim rate",
        target: "≥98%",
        departmentsInvolved: ["Finance/Billing", "IT"],
      },
      {
        kr: {
          en: "Document total staff hours saved and reinvested into patient-facing activities",
          es: "Documentar total de horas de personal ahorradas y reinvertidas en actividades con pacientes",
        },
        metric: "Hours saved per quarter",
        target: "≥2,000",
        departmentsInvolved: ["All departments"],
      },
    ],
    context: {
      en: "The FQHC AI opportunity is massive but fragmented. Most CHCs are piloting in one area. A full-stack approach — documentation + scheduling + RCM — creates compound benefits: less burnout → better retention → more providers → more encounters → more revenue. Urban Health Plan, Sun River Health, and RapidClaims show what's possible in each silo; the advanced play is integrating all three.",
      es: "La oportunidad de IA para FQHCs es masiva pero fragmentada. Un enfoque de pila completa — documentacion + programacion + RCM — crea beneficios compuestos: menos agotamiento → mejor retencion → mas proveedores → mas encuentros → mas ingresos.",
    },
    timeframe: "annual",
    difficulty: "advanced",
    tags: ["ai", "full-stack", "documentation", "scheduling", "rcm"],
  },
  {
    id: "advanced-crisis-alignment",
    domain: "cross-department",
    objective: {
      en: "Establish cross-departmental crisis response OKR cadence — monthly reviews, weekly huddles, real-time dashboards",
      es: "Establecer cadencia de OKR de respuesta a crisis interdepartamental — revisiones mensuales, reuniones semanales, dashboards en tiempo real",
    },
    keyResults: [
      {
        kr: {
          en: "Every department head commits to 1 shared cross-department OKR per quarter",
          es: "Cada jefe de departamento se compromete a 1 OKR compartido interdepartamental por trimestre",
        },
        metric: "Shared OKRs",
        target: "1 per department",
        departmentsInvolved: ["All departments"],
      },
      {
        kr: {
          en: "Establish weekly 15-minute cross-department huddle with standard agenda (wins, blockers, asks)",
          es: "Establecer reunion semanal de 15 minutos interdepartamental con agenda estandar",
        },
        metric: "Weekly huddle attendance",
        target: "≥80%",
        departmentsInvolved: ["All departments"],
      },
      {
        kr: {
          en: "Create shared dashboard tracking all crisis-response OKRs visible to every department",
          es: "Crear dashboard compartido rastreando todos los OKRs de respuesta a crisis visible para todos los departamentos",
        },
        metric: "Dashboard live",
        target: "Month 1",
        departmentsInvolved: ["IT", "Executive"],
      },
      {
        kr: {
          en: "Reduce inter-department escalation time from days to hours for funding/patient access issues",
          es: "Reducir tiempo de escalacion interdepartamental de dias a horas para problemas de financiamiento/acceso de pacientes",
        },
        metric: "Escalation time",
        target: "≤4 hours",
        departmentsInvolved: ["All departments"],
      },
    ],
    context: {
      en: "FQHC Associates identifies 'isolated problem-solving' as one of three recurring business model problems: leadership teams solving identical challenges independently across departments. The current crisis — simultaneous funding cuts, workforce shortages, and patient access threats — demands cross-functional coordination. OKRs create the accountability structure to break silos.",
      es: "FQHC Associates identifica 'resolucion de problemas aislada' como uno de tres problemas recurrentes del modelo de negocio: equipos de liderazgo resolviendo desafios identicos independientemente. La crisis actual demanda coordinacion interfuncional.",
    },
    timeframe: "quarterly",
    difficulty: "advanced",
    tags: ["silos", "cross-department", "huddles", "dashboards", "accountability"],
  },
];

/* ------------------------------------------------------------------ */
/*  Helper functions                                                    */
/* ------------------------------------------------------------------ */

/** Get templates, optionally filtered */
export function getOKRTemplates(opts?: {
  domain?: OKRDomain;
  difficulty?: "starter" | "intermediate" | "advanced";
}): OKRTemplate[] {
  let templates = [...OKR_TEMPLATES];

  if (opts?.domain) {
    templates = templates.filter((t) => t.domain === opts.domain);
  }
  if (opts?.difficulty) {
    templates = templates.filter((t) => t.difficulty === opts.difficulty);
  }

  return templates;
}

/** Get count by domain */
export function getOKRCounts(): Record<OKRDomain, number> & { total: number } {
  const counts = { total: OKR_TEMPLATES.length } as Record<OKRDomain, number> & {
    total: number;
  };
  for (const domain of OKR_DOMAINS) {
    counts[domain.id] = OKR_TEMPLATES.filter(
      (t) => t.domain === domain.id
    ).length;
  }
  return counts;
}

/** Get templates linked to a specific case study */
export function getOKRsForCaseStudy(caseStudyId: string): OKRTemplate[] {
  return OKR_TEMPLATES.filter((t) => t.relatedCaseStudyId === caseStudyId);
}
