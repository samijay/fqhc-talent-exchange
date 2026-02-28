// fqhc-okr-templates.ts
// OKR templates for FQHC crisis change management
// Designed to break down silos between departments and connect strategy to measurable outcomes
// Each OKR links to related case studies and intel items when applicable
// Last updated: 2026-02-28

/** Exported for display on pages — updated when new OKR templates are added */
export const OKR_TEMPLATES_LAST_UPDATED = "2026-02-28"; // 24 templates

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

  /* ================================================================== */
  /*  NEW TACTICAL OKR TEMPLATES (12)                                    */
  /*  Added 2026-02-28 — Specific, measurable, immediately usable       */
  /* ================================================================== */

  /* ── 1. 340B PHARMACY LAUNCH/OPTIMIZATION ── */
  {
    id: "tactical-340b-pharmacy-launch",
    domain: "revenue-resilience",
    objective: {
      en: "Launch entity-owned 340B pharmacy generating $40K+/month in net savings within 6 months",
      es: "Lanzar farmacia propia 340B generando $40K+/mes en ahorros netos en 6 meses",
    },
    keyResults: [
      {
        kr: {
          en: "Obtain Board of Pharmacy license and register 340B pharmacy with HRSA OPA",
          es: "Obtener licencia de la Junta de Farmacia y registrar farmacia 340B con HRSA OPA",
        },
        metric: "Licenses and registrations",
        target: "Complete by Month 2",
        departmentsInvolved: ["Executive", "Legal", "Pharmacy"],
      },
      {
        kr: {
          en: "Achieve 85% 340B capture rate on eligible prescriptions (industry average is 50-60%)",
          es: "Lograr tasa de captura 340B del 85% en recetas elegibles (promedio de la industria es 50-60%)",
        },
        metric: "340B capture rate",
        target: "≥85%",
        departmentsInvolved: ["Pharmacy", "Clinical", "IT"],
      },
      {
        kr: {
          en: "Train 100% of prescribers on 340B-eligible patient identification workflows in EHR",
          es: "Capacitar al 100% de prescriptores en flujos de identificacion de pacientes elegibles 340B en EHR",
        },
        metric: "Prescribers trained",
        target: "100%",
        departmentsInvolved: ["Clinical", "Pharmacy", "IT", "HR/Training"],
      },
      {
        kr: {
          en: "Generate ≥$40K/month net 340B savings after pharmacy operational costs",
          es: "Generar ≥$40K/mes en ahorros netos 340B despues de costos operativos de farmacia",
        },
        metric: "Monthly net 340B savings",
        target: "≥$40K",
        departmentsInvolved: ["Pharmacy", "Finance"],
      },
    ],
    context: {
      en: "Contract pharmacies typically keep 50-70% of 340B savings through dispensing fees. An entity-owned pharmacy captures 100% of the spread between 340B ceiling price and reimbursement. Highland Health achieved 270% revenue increase through this transition. Key compliance requirement: maintain a 340B database audit trail showing patient eligibility for every dispensed prescription.",
      es: "Las farmacias por contrato tipicamente retienen 50-70% de ahorros 340B. Una farmacia propia captura el 100% del margen. Highland Health logro 270% de aumento de ingresos con esta transicion. Requisito clave: mantener registro de auditoria de elegibilidad de pacientes.",
    },
    relatedCaseStudyId: "highland-health-340b",
    relatedIntelIds: ["strategy-revenue-diversification"],
    timeframe: "quarterly",
    difficulty: "advanced",
    tags: ["340b", "pharmacy", "entity-owned", "capture-rate", "revenue"],
  },

  /* ── 2. ECM PROGRAM SCALING ── */
  {
    id: "tactical-ecm-scaling",
    domain: "patient-access",
    objective: {
      en: "Scale Enhanced Care Management enrollment to 200+ members across 3 populations of focus by end of quarter",
      es: "Escalar inscripcion de Gestion de Cuidado Mejorado a 200+ miembros en 3 poblaciones de enfoque para fin del trimestre",
    },
    keyResults: [
      {
        kr: {
          en: "Identify and stratify 500+ eligible patients from Medi-Cal managed care plan data by risk tier",
          es: "Identificar y estratificar 500+ pacientes elegibles de datos de planes de salud Medi-Cal por nivel de riesgo",
        },
        metric: "Patients stratified",
        target: "≥500",
        departmentsInvolved: ["Clinical", "IT", "Care Coordination"],
      },
      {
        kr: {
          en: "Enroll 200 ECM members across high utilizers, SMI, and homeless populations of focus",
          es: "Inscribir 200 miembros ECM en poblaciones de alta utilizacion, SMI y personas sin hogar",
        },
        metric: "ECM members enrolled",
        target: "200",
        departmentsInvolved: ["Care Coordination", "Outreach", "BH"],
      },
      {
        kr: {
          en: "Achieve ≥70% 90-day retention rate (member still engaged after 90 days of enrollment)",
          es: "Lograr tasa de retencion de 90 dias ≥70% (miembro aun comprometido despues de 90 dias de inscripcion)",
        },
        metric: "90-day ECM retention rate",
        target: "≥70%",
        departmentsInvolved: ["Care Coordination", "Clinical", "BH"],
      },
      {
        kr: {
          en: "Bill ≥$150K in ECM PMPM revenue from managed care plans this quarter",
          es: "Facturar ≥$150K en ingresos PMPM de ECM de planes de salud este trimestre",
        },
        metric: "Quarterly ECM revenue",
        target: "≥$150K",
        departmentsInvolved: ["Finance/Billing", "Care Coordination", "Executive"],
      },
    ],
    context: {
      en: "CalAIM Enhanced Care Management pays $300-500 PMPM for high-acuity populations. Most FQHCs are leaving money on the table by under-enrolling — the typical FQHC enrolls less than 20% of eligible patients. Key barriers: MCO data sharing delays, insufficient care coordinator staffing, and lack of systematic patient outreach. The CalAIM waiver expires December 2026, making this a time-sensitive revenue and care opportunity.",
      es: "La Gestion de Cuidado Mejorado de CalAIM paga $300-500 PMPM para poblaciones de alta agudeza. La mayoria de los FQHCs estan dejando dinero en la mesa al sub-inscribir. La exencion CalAIM expira en diciembre 2026, haciendo esto una oportunidad urgente.",
    },
    relatedIntelIds: ["calaim-waiver-expiry"],
    timeframe: "quarterly",
    difficulty: "intermediate",
    tags: ["ecm", "calaim", "care-coordination", "pmpm", "enrollment"],
  },

  /* ── 3. AI DOCUMENTATION IMPLEMENTATION ── */
  {
    id: "tactical-ai-documentation",
    domain: "operational-efficiency",
    objective: {
      en: "Roll out ambient AI documentation to all providers, reducing after-hours charting to zero",
      es: "Implementar documentacion ambiental con IA para todos los proveedores, reduciendo documentacion fuera de horario a cero",
    },
    keyResults: [
      {
        kr: {
          en: "Complete vendor evaluation and select ambient AI tool (Sunoh.ai, Nabla, DAX Copilot, or Abridge) within 30 days",
          es: "Completar evaluacion de proveedores y seleccionar herramienta de IA ambiental dentro de 30 dias",
        },
        metric: "Vendor selected",
        target: "Month 1",
        departmentsInvolved: ["IT", "Clinical", "Executive", "Compliance"],
      },
      {
        kr: {
          en: "Reduce average note completion time from 12 minutes to ≤3 minutes per encounter across pilot cohort",
          es: "Reducir tiempo promedio de completar notas de 12 minutos a ≤3 minutos por encuentro en cohorte piloto",
        },
        metric: "Note completion time",
        target: "≤3 min/encounter",
        departmentsInvolved: ["Clinical", "IT", "Quality"],
      },
      {
        kr: {
          en: "Achieve 95% note accuracy rate (no clinically significant errors requiring manual correction)",
          es: "Lograr tasa de precision de notas del 95% (sin errores clinicamente significativos que requieran correccion manual)",
        },
        metric: "Note accuracy rate",
        target: "≥95%",
        departmentsInvolved: ["Clinical", "Quality", "Compliance"],
      },
      {
        kr: {
          en: "Increase provider satisfaction score from baseline to ≥4.5/5 on documentation workflow survey",
          es: "Aumentar puntuacion de satisfaccion del proveedor desde linea base a ≥4.5/5 en encuesta de flujo de documentacion",
        },
        metric: "Provider satisfaction score",
        target: "≥4.5/5.0",
        departmentsInvolved: ["Clinical", "HR", "IT"],
      },
    ],
    context: {
      en: "Sun River Health documented 26 patients in 30 minutes using Sunoh.ai. athenahealth now offers free ambient AI to all customers. Neighborhood Healthcare is piloting Nabla. The average FQHC provider spends 2+ hours daily on after-hours documentation — this is the #1 driver of burnout and turnover. HIPAA BAA and EHR integration are the key compliance gates. Expect 3-6 week onboarding per provider cohort.",
      es: "Sun River Health documento 26 pacientes en 30 minutos con Sunoh.ai. athenahealth ahora ofrece IA ambiental gratis. El proveedor FQHC promedio pasa 2+ horas diarias en documentacion fuera de horario — el principal impulsor de agotamiento y rotacion.",
    },
    relatedCaseStudyId: "sun-river-health-ai-documentation",
    relatedIntelIds: ["ambient-documentation-trend"],
    timeframe: "quarterly",
    difficulty: "intermediate",
    tags: ["ai", "ambient", "documentation", "burnout", "note-completion"],
  },

  /* ── 4. MEDI-CAL UNDOCUMENTED COVERAGE ENROLLMENT ── */
  {
    id: "tactical-undocumented-enrollment",
    domain: "patient-access",
    objective: {
      en: "Enroll 500+ undocumented adults in full-scope Medi-Cal within 90 days through targeted outreach",
      es: "Inscribir 500+ adultos indocumentados en Medi-Cal de alcance completo en 90 dias a traves de alcance dirigido",
    },
    keyResults: [
      {
        kr: {
          en: "Train 100% of eligibility workers and front desk staff on undocumented Medi-Cal enrollment criteria and reassurance scripts",
          es: "Capacitar al 100% de trabajadores de elegibilidad y personal de recepcion en criterios de inscripcion y guiones de garantias",
        },
        metric: "Staff trained",
        target: "100%",
        departmentsInvolved: ["Eligibility", "Front Desk", "HR/Training"],
      },
      {
        kr: {
          en: "Conduct 10+ community enrollment events at churches, consulates, and immigrant-serving CBOs",
          es: "Realizar 10+ eventos de inscripcion comunitaria en iglesias, consulados y organizaciones que sirven a inmigrantes",
        },
        metric: "Community enrollment events",
        target: "≥10",
        departmentsInvolved: ["Outreach", "Eligibility", "Marketing"],
      },
      {
        kr: {
          en: "Submit 500+ Medi-Cal applications for undocumented adults (ages 26-49) with ≥80% approval rate",
          es: "Enviar 500+ solicitudes de Medi-Cal para adultos indocumentados (edades 26-49) con tasa de aprobacion ≥80%",
        },
        metric: "Applications submitted / approved",
        target: "500 submitted, ≥80% approved",
        departmentsInvolved: ["Eligibility", "Outreach"],
      },
      {
        kr: {
          en: "Convert ≥60% of newly enrolled undocumented Medi-Cal patients to established FQHC patients with a PCP assigned",
          es: "Convertir ≥60% de pacientes recien inscritos en pacientes establecidos del FQHC con PCP asignado",
        },
        metric: "Conversion to established patients",
        target: "≥60%",
        departmentsInvolved: ["Outreach", "Clinical", "Scheduling"],
      },
    ],
    context: {
      en: "California expanded full-scope Medi-Cal to all undocumented adults effective January 2024, but enrollment has lagged projections by 40%. An estimated 700,000 undocumented Californians remain unenrolled. Fear of immigration enforcement, combined with the Medi-Cal enrollment freeze for new applicants proposed in H.R. 1, creates urgency. Each enrolled patient generates PPS encounters plus enables 340B and ECM billing. This is both a mission imperative and a revenue opportunity.",
      es: "California expandio Medi-Cal de alcance completo a todos los adultos indocumentados desde enero 2024, pero la inscripcion esta 40% debajo de las proyecciones. Aproximadamente 700,000 californianos indocumentados permanecen sin inscripcion. El miedo a la aplicacion migratoria crea urgencia.",
    },
    relatedIntelIds: [
      "medi-cal-enrollment-freeze",
      "ca-democrats-restore-undocumented-benefits",
      "strategy-undocumented-doors-open",
    ],
    timeframe: "quarterly",
    difficulty: "intermediate",
    tags: ["undocumented", "medi-cal", "enrollment", "outreach", "patient-volume"],
  },

  /* ── 5. TELEHEALTH EXPANSION ── */
  {
    id: "tactical-telehealth-expansion",
    domain: "patient-access",
    objective: {
      en: "Grow telehealth to 20% of total encounters while maintaining 90%+ patient satisfaction",
      es: "Crecer telesalud al 20% del total de encuentros manteniendo satisfaccion del paciente ≥90%",
    },
    keyResults: [
      {
        kr: {
          en: "Increase telehealth encounters from current baseline to 20% of total monthly visits",
          es: "Aumentar encuentros de telesalud desde la linea base actual al 20% del total de visitas mensuales",
        },
        metric: "Telehealth % of encounters",
        target: "20%",
        departmentsInvolved: ["Clinical", "IT", "Scheduling"],
      },
      {
        kr: {
          en: "Equip 100% of eligible providers with telehealth-capable rooms and train on video visit workflows",
          es: "Equipar al 100% de proveedores elegibles con salas de telesalud y capacitar en flujos de visitas por video",
        },
        metric: "Providers telehealth-ready",
        target: "100%",
        departmentsInvolved: ["IT", "Clinical", "HR/Training"],
      },
      {
        kr: {
          en: "Reduce no-show rate for telehealth appointments to ≤10% (vs. 18-25% average for in-person)",
          es: "Reducir tasa de inasistencia para citas de telesalud a ≤10% (vs. 18-25% promedio presencial)",
        },
        metric: "Telehealth no-show rate",
        target: "≤10%",
        departmentsInvolved: ["Scheduling", "Outreach", "IT"],
      },
      {
        kr: {
          en: "Achieve ≥90% patient satisfaction score for telehealth visits via post-visit survey",
          es: "Lograr puntuacion de satisfaccion del paciente ≥90% para visitas de telesalud via encuesta post-visita",
        },
        metric: "Telehealth patient satisfaction",
        target: "≥90%",
        departmentsInvolved: ["Clinical", "Quality", "IT"],
      },
    ],
    context: {
      en: "Post-COVID telehealth at FQHCs dropped from 40% to under 10% of encounters, but Medi-Cal permanently extended telehealth reimbursement parity through AB 32. Telehealth reduces no-shows by 40-50%, expands access for rural and transportation-challenged patients, and can be billed as PPS encounters. Key barrier: digital literacy among older and Spanish-speaking patients requires CHW-assisted onboarding.",
      es: "La telesalud post-COVID en FQHCs cayo de 40% a menos del 10% de encuentros, pero Medi-Cal extendio permanentemente la paridad de reembolso de telesalud. La telesalud reduce inasistencias 40-50% y puede facturarse como encuentros PPS.",
    },
    timeframe: "quarterly",
    difficulty: "starter",
    tags: ["telehealth", "virtual-care", "no-show", "access", "pps"],
  },

  /* ── 6. SB 525 WAGE COMPLIANCE ── */
  {
    id: "tactical-sb525-compliance",
    domain: "workforce-retention",
    objective: {
      en: "Achieve full SB 525 compliance ($25/hr healthcare minimum) with zero budget overrun by 2027 deadline",
      es: "Lograr cumplimiento total de SB 525 ($25/hr minimo de salud) sin exceder presupuesto para fecha limite 2027",
    },
    keyResults: [
      {
        kr: {
          en: "Complete wage gap analysis for all positions below $25/hr — identify total annual cost impact",
          es: "Completar analisis de brecha salarial para todos los puestos por debajo de $25/hr — identificar impacto anual total",
        },
        metric: "Wage gap analysis",
        target: "Complete within 30 days",
        departmentsInvolved: ["HR", "Finance", "Executive"],
      },
      {
        kr: {
          en: "Develop phased salary adjustment plan that achieves $25/hr for all healthcare workers by June 2027",
          es: "Desarrollar plan de ajuste salarial por fases que logre $25/hr para todos los trabajadores de salud para junio 2027",
        },
        metric: "Phased plan approved",
        target: "Board approved",
        departmentsInvolved: ["HR", "Finance", "Executive", "Legal"],
      },
      {
        kr: {
          en: "Identify ≥$200K in offsetting revenue or savings to fund wage increases without layoffs",
          es: "Identificar ≥$200K en ingresos compensatorios o ahorros para financiar aumentos salariales sin despidos",
        },
        metric: "Offsetting revenue identified",
        target: "≥$200K",
        departmentsInvolved: ["Finance", "Executive", "Operations"],
      },
      {
        kr: {
          en: "Address wage compression: adjust supervisor and experienced staff pay to maintain ≥15% differential above minimum",
          es: "Abordar compresion salarial: ajustar pago de supervisores y personal experimentado para mantener diferencial ≥15% sobre el minimo",
        },
        metric: "Wage compression ratio",
        target: "≥15% supervisor differential",
        departmentsInvolved: ["HR", "Finance", "Clinical Leadership"],
      },
    ],
    context: {
      en: "SB 525 requires all California healthcare facilities to pay $25/hr minimum by 2027 for FQHCs (other facilities hit $25/hr earlier). This affects front desk staff, MAs, outreach workers, and entry-level positions. The hidden cost is wage compression — when the floor rises, experienced staff and supervisors expect proportional increases. FQHCs must plan now: the total cost is typically 2-3x the direct minimum wage increase when compression is factored in.",
      es: "SB 525 requiere que todas las instalaciones de salud de California paguen minimo $25/hr para 2027 para FQHCs. El costo oculto es la compresion salarial — cuando el piso sube, el personal experimentado espera aumentos proporcionales. El costo total tipicamente es 2-3x el aumento directo.",
    },
    relatedIntelIds: ["sb-525-minimum-wage"],
    timeframe: "annual",
    difficulty: "intermediate",
    tags: ["sb-525", "minimum-wage", "compliance", "wage-compression", "workforce"],
  },

  /* ── 7. GRANT DIVERSIFICATION ── */
  {
    id: "tactical-grant-diversification",
    domain: "revenue-resilience",
    objective: {
      en: "Secure 3+ non-Section 330 grants totaling ≥$500K to reduce federal funding dependency below 35%",
      es: "Asegurar 3+ subvenciones fuera de la Seccion 330 totalizando ≥$500K para reducir dependencia de financiamiento federal por debajo del 35%",
    },
    keyResults: [
      {
        kr: {
          en: "Submit applications to 8+ grant opportunities across state, foundation, and private sources",
          es: "Enviar solicitudes a 8+ oportunidades de subvencion a traves de fuentes estatales, fundaciones y privadas",
        },
        metric: "Grant applications submitted",
        target: "≥8",
        departmentsInvolved: ["Grants/Development", "Finance", "Executive"],
      },
      {
        kr: {
          en: "Secure ≥3 new grants totaling ≥$500K/year (target: CHCF, Blue Shield Foundation, state workforce grants)",
          es: "Asegurar ≥3 nuevas subvenciones totalizando ≥$500K/ano (objetivo: CHCF, Blue Shield Foundation, subvenciones estatales de fuerza laboral)",
        },
        metric: "New grants secured",
        target: "≥3 grants, ≥$500K total",
        departmentsInvolved: ["Grants/Development", "Finance", "Executive"],
      },
      {
        kr: {
          en: "Reduce Section 330 grant as percentage of total revenue from current level by ≥10 percentage points",
          es: "Reducir subvencion Seccion 330 como porcentaje de ingresos totales desde nivel actual en ≥10 puntos porcentuales",
        },
        metric: "Section 330 % of revenue",
        target: "Decrease ≥10 points",
        departmentsInvolved: ["Finance", "Executive"],
      },
    ],
    context: {
      en: "The average FQHC derives 18% of revenue from Section 330, but many smaller FQHCs depend on 40-60%. With CHCF expiration looming (December 2026) and HRSA aligning grants to MAHA priorities, diversification is existential. California-specific opportunities: DHCS workforce development grants, CHCF innovation grants, Blue Shield of California Foundation health equity grants, and county behavioral health funding through MHSA. A dedicated grants officer ROI is typically 5-10x their salary.",
      es: "El FQHC promedio deriva 18% de ingresos de la Seccion 330, pero muchos FQHCs pequenos dependen del 40-60%. Con la expiracion de CHCF inminente y HRSA alineando subvenciones a prioridades MAHA, la diversificacion es existencial.",
    },
    relatedCaseStudyId: "pureview-federal-dependency",
    relatedIntelIds: ["hrsa-maha-alignment-fy2026", "strategy-revenue-diversification"],
    timeframe: "annual",
    difficulty: "intermediate",
    tags: ["grants", "section-330", "diversification", "chcf", "foundation"],
  },

  /* ── 8. DENTAL INTEGRATION ── */
  {
    id: "tactical-dental-integration",
    domain: "cross-department",
    objective: {
      en: "Launch integrated dental services generating 500+ encounters/month within 6 months of opening",
      es: "Lanzar servicios dentales integrados generando 500+ encuentros/mes dentro de 6 meses de apertura",
    },
    keyResults: [
      {
        kr: {
          en: "Complete dental clinic buildout (2+ operatories) and recruit lead dentist + 2 dental hygienists",
          es: "Completar construccion de clinica dental (2+ consultorios) y reclutar dentista principal + 2 higienistas dentales",
        },
        metric: "Dental operatories and staff",
        target: "2 operatories, 3 staff hired",
        departmentsInvolved: ["Operations", "HR", "Facilities", "Executive"],
      },
      {
        kr: {
          en: "Achieve 500+ dental encounters/month by month 6 (PPS billable per encounter)",
          es: "Lograr 500+ encuentros dentales/mes para el mes 6 (facturable por encuentro PPS)",
        },
        metric: "Monthly dental encounters",
        target: "≥500",
        departmentsInvolved: ["Dental", "Scheduling", "Finance/Billing"],
      },
      {
        kr: {
          en: "Implement same-day dental referral workflow — medical provider can refer to dental same visit, dental seen within 2 weeks",
          es: "Implementar flujo de referencia dental del mismo dia — proveedor medico puede referir en la misma visita, dental visto en 2 semanas",
        },
        metric: "Dental referral-to-visit time",
        target: "≤14 days",
        departmentsInvolved: ["Clinical", "Dental", "Scheduling", "IT"],
      },
      {
        kr: {
          en: "Apply for HRSA scope of service change to add dental (required for PPS dental encounters)",
          es: "Solicitar cambio de alcance de servicio de HRSA para agregar dental (requerido para encuentros dentales PPS)",
        },
        metric: "HRSA scope change approved",
        target: "Approved",
        departmentsInvolved: ["Executive", "Grants/Development", "Legal"],
      },
    ],
    context: {
      en: "Dental is the #1 unmet healthcare need for FQHC patients — 45% of FQHCs nationally lack dental services. Each dental encounter generates a separate PPS payment ($100-200+), making dental one of the highest-margin FQHC service lines. H.R. 1 proposed eliminating dental benefits for undocumented Medi-Cal patients, but for now the benefit remains. Key requirement: HRSA Form 5A scope change must be approved before billing dental PPS encounters.",
      es: "Dental es la necesidad de salud #1 no satisfecha para pacientes FQHC — 45% de FQHCs carecen de servicios dentales. Cada encuentro dental genera un pago PPS separado ($100-200+). Requisito clave: cambio de alcance HRSA Form 5A debe aprobarse antes de facturar.",
    },
    relatedIntelIds: ["dental-elimination-undocumented"],
    timeframe: "annual",
    difficulty: "advanced",
    tags: ["dental", "service-line", "pps", "hrsa-scope", "integration"],
  },

  /* ── 9. BEHAVIORAL HEALTH INTEGRATION ── */
  {
    id: "tactical-bh-integration",
    domain: "cross-department",
    objective: {
      en: "Achieve fully integrated behavioral health with same-day warm handoffs and 300+ BH encounters/month",
      es: "Lograr salud conductual totalmente integrada con transferencias calidas del mismo dia y 300+ encuentros BH/mes",
    },
    keyResults: [
      {
        kr: {
          en: "Co-locate BH provider in ≥80% of primary care clinic sessions for immediate warm handoffs",
          es: "Co-ubicar proveedor de BH en ≥80% de sesiones de clinica de atencion primaria para transferencias calidas inmediatas",
        },
        metric: "Clinic sessions with co-located BH",
        target: "≥80%",
        departmentsInvolved: ["BH", "Clinical", "Operations", "Scheduling"],
      },
      {
        kr: {
          en: "Screen 90% of adult primary care patients with PHQ-2 annually, with automatic referral for PHQ-9 ≥10",
          es: "Evaluar 90% de pacientes adultos de atencion primaria con PHQ-2 anualmente, con referencia automatica para PHQ-9 ≥10",
        },
        metric: "PHQ-2 screening rate",
        target: "≥90%",
        departmentsInvolved: ["Clinical", "BH", "Quality", "IT"],
      },
      {
        kr: {
          en: "Achieve 300+ BH encounters/month (each a separate PPS billable visit when same-day with primary care)",
          es: "Lograr 300+ encuentros BH/mes (cada uno una visita PPS facturable separada cuando es el mismo dia con atencion primaria)",
        },
        metric: "Monthly BH encounters",
        target: "≥300",
        departmentsInvolved: ["BH", "Finance/Billing", "Scheduling"],
      },
      {
        kr: {
          en: "Reduce time from PCP behavioral health referral to first BH appointment from 21 days to ≤3 days",
          es: "Reducir tiempo desde referencia de BH del PCP a primera cita BH de 21 dias a ≤3 dias",
        },
        metric: "BH referral-to-visit time",
        target: "≤3 days",
        departmentsInvolved: ["BH", "Clinical", "Scheduling"],
      },
    ],
    context: {
      en: "Integrated behavioral health (IBH) generates the highest ROI of any FQHC service expansion: every same-day BH encounter is a separate PPS payment, depression screening is a UDS quality metric, and BH integration reduces ED utilization by 20-30%. The SAMHSA-HRSA CCBHC model is expanding — FQHCs with integrated BH are better positioned for Certified Community Behavioral Health Clinic designation, which offers prospective payment rates 2-3x higher than standard Medi-Cal BH rates.",
      es: "La salud conductual integrada genera el ROI mas alto de cualquier expansion de servicio FQHC: cada encuentro BH del mismo dia es un pago PPS separado, la evaluacion de depresion es metrica de calidad UDS, y la integracion BH reduce utilizacion de ED 20-30%.",
    },
    timeframe: "quarterly",
    difficulty: "intermediate",
    tags: ["behavioral-health", "integration", "warm-handoff", "phq", "co-visit", "pps"],
  },

  /* ── 10. QUALITY IMPROVEMENT (UDS) ── */
  {
    id: "tactical-uds-quality",
    domain: "operational-efficiency",
    objective: {
      en: "Improve 4 core UDS clinical quality metrics to top-quartile national performance within 12 months",
      es: "Mejorar 4 metricas clinicas centrales UDS a desempeno del cuartil superior nacional en 12 meses",
    },
    keyResults: [
      {
        kr: {
          en: "Increase diabetes HbA1c control (≤9%) rate from current baseline to ≥75% (national top quartile)",
          es: "Aumentar tasa de control de HbA1c de diabetes (≤9%) desde la linea base actual a ≥75% (cuartil superior nacional)",
        },
        metric: "HbA1c ≤9% rate",
        target: "≥75%",
        departmentsInvolved: ["Clinical", "Quality", "Care Coordination"],
      },
      {
        kr: {
          en: "Increase cervical cancer screening rate to ≥65% of eligible female patients (21-65)",
          es: "Aumentar tasa de deteccion de cancer cervical a ≥65% de pacientes femeninas elegibles (21-65)",
        },
        metric: "Cervical cancer screening rate",
        target: "≥65%",
        departmentsInvolved: ["Clinical", "Quality", "Outreach"],
      },
      {
        kr: {
          en: "Achieve hypertension controlled (BP <140/90) rate of ≥68% across all hypertensive patients",
          es: "Lograr tasa de hipertension controlada (PA <140/90) del ≥68% en todos los pacientes hipertensos",
        },
        metric: "Hypertension control rate",
        target: "≥68%",
        departmentsInvolved: ["Clinical", "Quality", "Care Coordination"],
      },
      {
        kr: {
          en: "Implement weekly UDS quality huddles with live dashboards — every clinical team reviews their panel gaps",
          es: "Implementar reuniones semanales de calidad UDS con dashboards en vivo — cada equipo clinico revisa brechas de su panel",
        },
        metric: "Weekly quality huddles held",
        target: "100% of weeks",
        departmentsInvolved: ["Quality", "Clinical", "IT", "Executive"],
      },
    ],
    context: {
      en: "UDS quality metrics directly impact HRSA Quality Improvement Awards (QIA) — worth up to $100K/year for top performers. They also influence HRSA grant renewals (especially under MAHA-aligned priorities emphasizing outcomes over access). The 4 metrics targeted are: diabetes HbA1c control, cervical cancer screening, hypertension control, and depression screening/follow-up. Panel management and care gaps workflows in the EHR are the key lever — most FQHCs have the data but lack systematic outreach to patients overdue for screenings.",
      es: "Las metricas de calidad UDS impactan directamente los Premios de Mejora de Calidad de HRSA — hasta $100K/ano para mejores desempenadores. Tambien influyen en renovaciones de subvenciones HRSA. Las 4 metricas objetivo son: control de HbA1c, deteccion de cancer cervical, control de hipertension, y deteccion/seguimiento de depresion.",
    },
    relatedIntelIds: ["hrsa-maha-alignment-fy2026"],
    timeframe: "annual",
    difficulty: "intermediate",
    tags: ["uds", "quality", "hba1c", "hypertension", "screening", "qia"],
  },

  /* ── 11. REVENUE CYCLE OPTIMIZATION ── */
  {
    id: "tactical-revenue-cycle",
    domain: "revenue-resilience",
    objective: {
      en: "Reduce claim denial rate to ≤5% and days in A/R to ≤35, recovering ≥$250K in lost revenue",
      es: "Reducir tasa de denegacion de reclamaciones a ≤5% y dias en C/C a ≤35, recuperando ≥$250K en ingresos perdidos",
    },
    keyResults: [
      {
        kr: {
          en: "Reduce initial claim denial rate from current baseline (industry avg 10-15%) to ≤5%",
          es: "Reducir tasa de denegacion de reclamaciones inicial desde linea base actual (promedio industria 10-15%) a ≤5%",
        },
        metric: "Claim denial rate",
        target: "≤5%",
        departmentsInvolved: ["Finance/Billing", "Clinical", "IT"],
      },
      {
        kr: {
          en: "Reduce days in accounts receivable from current baseline to ≤35 days across all payers",
          es: "Reducir dias en cuentas por cobrar desde linea base actual a ≤35 dias en todos los pagadores",
        },
        metric: "Days in A/R",
        target: "≤35 days",
        departmentsInvolved: ["Finance/Billing"],
      },
      {
        kr: {
          en: "Implement front-end eligibility verification for 100% of patients at check-in (real-time Medi-Cal/insurance check)",
          es: "Implementar verificacion de elegibilidad en recepcion para 100% de pacientes al registrarse (verificacion en tiempo real de Medi-Cal/seguro)",
        },
        metric: "Front-end eligibility verification rate",
        target: "100%",
        departmentsInvolved: ["Front Desk", "Finance/Billing", "IT"],
      },
      {
        kr: {
          en: "Work denied claims within 7 days of denial — achieve 60%+ overturn rate on appealed denials",
          es: "Trabajar reclamaciones denegadas dentro de 7 dias de denegacion — lograr tasa de reversion del 60%+ en denegaciones apeladas",
        },
        metric: "Denial appeal turnaround / overturn rate",
        target: "≤7 days / ≥60% overturn",
        departmentsInvolved: ["Finance/Billing", "Clinical"],
      },
    ],
    context: {
      en: "The average FQHC loses $150K-400K annually from preventable claim denials and slow A/R. Top denial reasons at FQHCs: eligibility/registration errors (35%), missing authorizations (20%), coding errors (15%), and timely filing (10%). Front-end eligibility verification eliminates the #1 denial cause. RapidClaims and similar AI tools can pre-scrub claims before submission, catching errors that humans miss. Every 10-day reduction in A/R frees up significant working capital.",
      es: "El FQHC promedio pierde $150K-400K anuales por denegaciones prevenibles y C/C lentas. Razones principales de denegacion: errores de elegibilidad (35%), autorizaciones faltantes (20%), errores de codificacion (15%). La verificacion de elegibilidad en recepcion elimina la causa #1.",
    },
    relatedIntelIds: ["strategy-revenue-diversification"],
    timeframe: "quarterly",
    difficulty: "starter",
    tags: ["revenue-cycle", "denials", "ar-days", "eligibility", "claims"],
  },

  /* ── 12. COMMUNITY HEALTH WORKER PROGRAM LAUNCH ── */
  {
    id: "tactical-chw-program-launch",
    domain: "workforce-retention",
    objective: {
      en: "Build a CHW team of 8+ workers generating ≥$30K/month in billable encounters within 6 months",
      es: "Construir un equipo CHW de 8+ trabajadores generando ≥$30K/mes en encuentros facturables en 6 meses",
    },
    keyResults: [
      {
        kr: {
          en: "Recruit and hire 8 CHWs — prioritize bilingual candidates from the communities served",
          es: "Reclutar y contratar 8 CHWs — priorizar candidatos bilingues de las comunidades atendidas",
        },
        metric: "CHWs hired",
        target: "8",
        departmentsInvolved: ["HR", "Outreach", "Clinical", "Executive"],
      },
      {
        kr: {
          en: "Ensure 100% of CHWs complete DHCS-approved CHW certification training (80+ hours) before billing",
          es: "Asegurar que el 100% de los CHWs completen capacitacion de certificacion CHW aprobada por DHCS (80+ horas) antes de facturar",
        },
        metric: "CHWs certified",
        target: "100%",
        departmentsInvolved: ["HR/Training", "Outreach", "Compliance"],
      },
      {
        kr: {
          en: "Bill ≥400 CHW encounters/month using new Medi-Cal CHW billing codes (effective Jan 2026)",
          es: "Facturar ≥400 encuentros CHW/mes usando nuevos codigos de facturacion CHW de Medi-Cal (efectivos enero 2026)",
        },
        metric: "Monthly CHW billed encounters",
        target: "≥400",
        departmentsInvolved: ["Outreach", "Finance/Billing", "Clinical"],
      },
      {
        kr: {
          en: "Assign each CHW a panel of 50-75 patients with documented outreach activities and outcomes tracking",
          es: "Asignar a cada CHW un panel de 50-75 pacientes con actividades de alcance documentadas y seguimiento de resultados",
        },
        metric: "CHW panel size",
        target: "50-75 patients per CHW",
        departmentsInvolved: ["Clinical", "Outreach", "Care Coordination", "IT"],
      },
    ],
    context: {
      en: "California activated Medi-Cal billing codes for CHW services in January 2026 — the first time CHW encounters are directly reimbursable. This transforms CHWs from a cost center to a revenue-generating workforce. At $50-80 per encounter, a team of 8 CHWs billing 400 encounters/month generates $20K-32K/month in new revenue while expanding access to hard-to-reach populations. Key requirements: CHWs must hold DHCS-approved certification, encounters must be documented in the EHR, and a supervising provider must sign off on care plans.",
      es: "California activo codigos de facturacion de Medi-Cal para servicios CHW en enero 2026 — la primera vez que encuentros CHW son directamente reembolsables. Esto transforma CHWs de un centro de costo a fuerza laboral generadora de ingresos. Requisitos clave: certificacion aprobada por DHCS y documentacion en EHR.",
    },
    relatedIntelIds: ["chw-medi-cal-billing"],
    timeframe: "quarterly",
    difficulty: "starter",
    tags: ["chw", "community-health-worker", "billing-codes", "medi-cal", "workforce"],
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
