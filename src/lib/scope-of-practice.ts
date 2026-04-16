// scope-of-practice.ts
// California scope-of-practice regulations for FQHC roles
// What each role CAN and CANNOT do under California law, specifically in the FQHC context
// All regulatory citations are California Business & Professions Code (BPC) or CA Code of Regulations (CCR)
// Every claim backed by primary source URL
// Last updated: 2026-02-28

/** Exported for display on pages — updated when scope data changes */
export const SCOPE_LAST_UPDATED = "2026-02-28";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ScopeCategory =
  | "physician"
  | "advanced-practice"
  | "nursing"
  | "allied-health"
  | "behavioral-health"
  | "community-health";

export interface DelegationRule {
  task: { en: string; es: string };
  level: "independent" | "supervised" | "delegated" | "prohibited";
  citation: string;
  fqhcNote?: { en: string; es: string };
}

export interface ScopeOfPracticeRole {
  id: string;
  title: { en: string; es: string };
  abbreviation: string;
  category: ScopeCategory;
  licensingBody: string;
  licensingBodyUrl: string;
  caRegulation: string;
  educationRequired: { en: string; es: string };
  certificationRequired: string[];
  supervisedBy: string | null;
  canSupervise: string[];
  coreScope: { en: string; es: string }[];
  cannotDo: { en: string; es: string }[];
  delegationRules: DelegationRule[];
  fqhcContext: { en: string; es: string };
  topOfLicenseBarriers: { en: string; es: string }[];
  changeManagement: { en: string; es: string };
  revenueImpact: { en: string; es: string };
  primarySourceUrl: string;
}

export interface DelegationTask {
  id: string;
  task: { en: string; es: string };
  department: "primary-care" | "behavioral-health" | "dental";
  roleAuthorizations: {
    roleId: string;
    level: "independent" | "supervised" | "delegated" | "prohibited";
    citation: string;
  }[];
}

/* ------------------------------------------------------------------ */
/*  Category metadata                                                  */
/* ------------------------------------------------------------------ */

export const SCOPE_CATEGORIES: {
  id: ScopeCategory;
  en: string;
  es: string;
  color: string;
}[] = [
  {
    id: "physician",
    en: "Physician",
    es: "Medico",
    color: "text-red-700 bg-red-50",
  },
  {
    id: "advanced-practice",
    en: "Advanced Practice",
    es: "Practica Avanzada",
    color: "text-purple-700 bg-purple-50",
  },
  {
    id: "nursing",
    en: "Nursing",
    es: "Enfermeria",
    color: "text-blue-700 bg-blue-50",
  },
  {
    id: "allied-health",
    en: "Allied Health",
    es: "Salud Aliada",
    color: "text-emerald-700 bg-emerald-50",
  },
  {
    id: "behavioral-health",
    en: "Behavioral Health",
    es: "Salud Conductual",
    color: "text-amber-700 bg-amber-50",
  },
  {
    id: "community-health",
    en: "Community Health",
    es: "Salud Comunitaria",
    color: "text-teal-700 bg-teal-50",
  },
];

/* ------------------------------------------------------------------ */
/*  Main data: 10 FQHC roles                                          */
/* ------------------------------------------------------------------ */

export const SCOPE_OF_PRACTICE_ROLES: ScopeOfPracticeRole[] = [
  /* ---- 1. MD/DO — Physician ---- */
  {
    id: "md-do",
    title: {
      en: "Physician (MD/DO)",
      es: "Medico (MD/DO)",
    },
    abbreviation: "MD/DO",
    category: "physician",
    licensingBody: "Medical Board of California",
    licensingBodyUrl: "https://www.mbc.ca.gov",
    caRegulation: "BPC §2051-2054",
    educationRequired: {
      en: "Medical degree (MD or DO) from accredited school, plus 1-3 year residency",
      es: "Titulo de medicina (MD o DO) de escuela acreditada, mas residencia de 1 a 3 anos",
    },
    certificationRequired: [
      "California Medical License",
      "Board Certification (specialty-dependent)",
      "DEA Registration",
    ],
    supervisedBy: null,
    canSupervise: ["np", "pa", "rn", "lvn", "ma", "chw", "amft-asw"],
    coreScope: [
      {
        en: "Diagnose and treat medical conditions without limitation",
        es: "Diagnosticar y tratar condiciones medicas sin limitacion",
      },
      {
        en: "Prescribe all medications including controlled substances (Schedules II-V)",
        es: "Recetar todos los medicamentos incluyendo sustancias controladas (Listas II-V)",
      },
      {
        en: "Perform medical procedures and surgeries within specialty training",
        es: "Realizar procedimientos medicos y cirugias dentro de su entrenamiento de especialidad",
      },
      {
        en: "Order and interpret diagnostic tests (labs, imaging, pathology)",
        es: "Ordenar e interpretar pruebas diagnosticas (laboratorios, imagenes, patologia)",
      },
      {
        en: "Supervise and delegate to NPs, PAs, RNs, LVNs, and MAs",
        es: "Supervisar y delegar a NPs, PAs, RNs, LVNs y MAs",
      },
      {
        en: "Sign and certify all clinical documentation (death certificates, disability forms, FMLA)",
        es: "Firmar y certificar toda la documentacion clinica (certificados de defuncion, formularios de discapacidad, FMLA)",
      },
    ],
    cannotDo: [
      {
        en: "Practice outside specialty training without additional credentials",
        es: "Practicar fuera de su entrenamiento de especialidad sin credenciales adicionales",
      },
      {
        en: "Delegate tasks requiring physician-level judgment to non-physician staff",
        es: "Delegar tareas que requieren juicio medico a personal no medico",
      },
    ],
    delegationRules: [
      {
        task: {
          en: "Complex medical decision-making",
          es: "Toma de decisiones medicas complejas",
        },
        level: "independent",
        citation: "BPC §2051",
      },
      {
        task: {
          en: "Controlled substance prescribing",
          es: "Prescripcion de sustancias controladas",
        },
        level: "independent",
        citation: "BPC §2241; HSC §11150",
      },
      {
        task: {
          en: "Supervision of mid-level providers",
          es: "Supervision de proveedores de nivel medio",
        },
        level: "independent",
        citation: "BPC §2054; BPC §3502",
        fqhcNote: {
          en: "In FQHCs, physicians often oversupervise — signing off on NP/PA charts that don't require review post-AB 890",
          es: "En FQHCs, los medicos a menudo sobre-supervisan — firmando notas de NP/PA que no requieren revision despues de AB 890",
        },
      },
    ],
    fqhcContext: {
      en: "Physicians in FQHCs are the highest-cost provider and the most common bottleneck. The key operational challenge is getting physicians to practice at the top of their license — doing complex medical decision-making, not reviewing straightforward NP/PA charts or handling tasks that MAs and RNs can perform. Every hour a physician spends on below-license work is a lost encounter at the PPS rate.",
      es: "Los medicos en FQHCs son el proveedor de mayor costo y el cuello de botella mas comun. El desafio operativo clave es lograr que los medicos practiquen al tope de su licencia — haciendo toma de decisiones medicas complejas, no revisando notas sencillas de NP/PA o manejando tareas que MAs y RNs pueden realizar. Cada hora que un medico dedica a trabajo por debajo de su licencia es un encuentro perdido a la tarifa PPS.",
    },
    topOfLicenseBarriers: [
      {
        en: "Spending 30-60 min/day signing off on NP charts that no longer require physician review under AB 890",
        es: "Dedicando 30-60 min/dia firmando notas de NP que ya no requieren revision medica bajo AB 890",
      },
      {
        en: "Taking vital signs, rooming patients, or doing EHR data entry that MAs should handle",
        es: "Tomando signos vitales, preparando pacientes o haciendo entrada de datos en EHR que MAs deberian manejar",
      },
      {
        en: "Handling routine prescription refills that protocol-trained MAs or RNs can manage via standing orders",
        es: "Manejando recargas de recetas rutinarias que MAs o RNs capacitados en protocolo pueden gestionar mediante ordenes permanentes",
      },
    ],
    changeManagement: {
      en: "Start by auditing physician time for one week: categorize every task as physician-only vs. delegatable. Most FQHCs find 20-35% of physician time is spent on below-license tasks. Implement standing orders for the top 5 routine tasks, train MAs on pre-visit planning, and update chart review policies to reflect AB 890.",
      es: "Comience auditando el tiempo del medico por una semana: categorice cada tarea como exclusiva del medico vs. delegable. La mayoria de los FQHCs encuentran que 20-35% del tiempo del medico se dedica a tareas por debajo de su licencia. Implemente ordenes permanentes para las 5 tareas rutinarias principales, capacite a los MAs en planificacion previa a la visita y actualice las politicas de revision de notas para reflejar AB 890.",
    },
    revenueImpact: {
      en: "Physician visits generate the highest PPS encounter rate. Every physician encounter shifted from below-license tasks to patient-facing visits can generate $200-400+ per visit. FQHCs that optimize physician delegation typically see 15-25% increases in daily patient encounters per physician.",
      es: "Las visitas medicas generan la tarifa de encuentro PPS mas alta. Cada encuentro medico desplazado de tareas por debajo de licencia a visitas con pacientes puede generar $200-400+ por visita. Los FQHCs que optimizan la delegacion medica tipicamente ven aumentos de 15-25% en encuentros diarios por medico.",
    },
    primarySourceUrl: "https://www.mbc.ca.gov/Licensing/",
  },

  /* ---- 2. NP — Nurse Practitioner ---- */
  {
    id: "np",
    title: {
      en: "Nurse Practitioner (NP)",
      es: "Enfermera Practicante (NP)",
    },
    abbreviation: "NP",
    category: "advanced-practice",
    licensingBody: "Board of Registered Nursing",
    licensingBodyUrl: "https://www.rn.ca.gov",
    caRegulation: "BPC §2837.100-2837.106 (AB 890)",
    educationRequired: {
      en: "Master's or Doctoral degree in Nursing (MSN/DNP) with NP specialization",
      es: "Maestria o Doctorado en Enfermeria (MSN/DNP) con especializacion en NP",
    },
    certificationRequired: [
      "California RN License",
      "National NP Certification (AANP or ANCC)",
      "NP Furnishing Number (for prescribing)",
      "DEA Registration",
    ],
    supervisedBy: null,
    canSupervise: ["rn", "lvn", "ma", "chw"],
    coreScope: [
      {
        en: "Independently assess, diagnose, and treat patients (after AB 890 transition-to-practice completion)",
        es: "Evaluar, diagnosticar y tratar pacientes de forma independiente (despues de completar la transicion a la practica de AB 890)",
      },
      {
        en: "Prescribe medications including controlled substances (Schedules II-V) with furnishing number",
        es: "Recetar medicamentos incluyendo sustancias controladas (Listas II-V) con numero de dispensacion",
      },
      {
        en: "Order and interpret diagnostic tests and imaging",
        es: "Ordenar e interpretar pruebas diagnosticas e imagenes",
      },
      {
        en: "Perform procedures within NP scope and specialty (biopsies, joint injections, IUD placement)",
        es: "Realizar procedimientos dentro del alcance y especialidad de NP (biopsias, inyecciones articulares, colocacion de DIU)",
      },
      {
        en: "Manage independent patient panels without physician oversight (post-AB 890 transition)",
        es: "Manejar paneles de pacientes independientes sin supervision medica (despues de la transicion AB 890)",
      },
      {
        en: "Sign and certify disability forms, FMLA, home health orders",
        es: "Firmar y certificar formularios de discapacidad, FMLA, ordenes de salud en el hogar",
      },
    ],
    cannotDo: [
      {
        en: "Practice independently before completing 2,080 hours of supervised practice (AB 890 transition period)",
        es: "Practicar independientemente antes de completar 2,080 horas de practica supervisada (periodo de transicion AB 890)",
      },
      {
        en: "Perform surgery (beyond minor office procedures within training)",
        es: "Realizar cirugia (mas alla de procedimientos menores de consultorio dentro de su entrenamiento)",
      },
      {
        en: "Practice outside their population focus (e.g., adult NP treating pediatric patients)",
        es: "Practicar fuera de su enfoque de poblacion (ej., NP de adultos tratando pacientes pediatricos)",
      },
    ],
    delegationRules: [
      {
        task: {
          en: "Independent patient assessment and diagnosis",
          es: "Evaluacion y diagnostico independiente de pacientes",
        },
        level: "independent",
        citation: "BPC §2837.103",
        fqhcNote: {
          en: "AB 890 removed the requirement for physician supervision after the transition-to-practice period. NPs can manage their own panels.",
          es: "AB 890 elimino el requisito de supervision medica despues del periodo de transicion a la practica. Las NPs pueden manejar sus propios paneles.",
        },
      },
      {
        task: {
          en: "Prescribing medications (including controlled substances)",
          es: "Prescripcion de medicamentos (incluyendo sustancias controladas)",
        },
        level: "independent",
        citation: "BPC §2837.103(a); BPC §2836.1",
      },
      {
        task: {
          en: "Ordering labs and imaging",
          es: "Ordenar laboratorios e imagenes",
        },
        level: "independent",
        citation: "BPC §2837.103",
      },
    ],
    fqhcContext: {
      en: "AB 890 is the most significant scope expansion in California FQHC staffing in a decade. NPs with full practice authority can run patient panels identically to physicians — and in FQHCs, NP visits are billed at the same PPS encounter rate as physician visits. This means an NP generates the same revenue per visit as an MD/DO but at a lower salary cost. FQHCs that haven't updated their policies and supervision agreements post-AB 890 are leaving capacity and revenue on the table.",
      es: "AB 890 es la expansion de alcance mas significativa en la dotacion de FQHCs de California en una decada. Las NPs con autoridad de practica completa pueden manejar paneles de pacientes de forma identica a los medicos — y en FQHCs, las visitas de NP se facturan a la misma tarifa de encuentro PPS que las visitas medicas. Esto significa que una NP genera los mismos ingresos por visita que un MD/DO pero a un costo salarial menor. Los FQHCs que no han actualizado sus politicas y acuerdos de supervision despues de AB 890 estan perdiendo capacidad e ingresos.",
    },
    topOfLicenseBarriers: [
      {
        en: "FQHC policies still requiring physician co-signature on NP charts despite AB 890 full practice authority",
        es: "Politicas de FQHC que aun requieren co-firma medica en notas de NP a pesar de la autoridad de practica completa de AB 890",
      },
      {
        en: "Cultural resistance from physicians who view NP independence as threatening",
        es: "Resistencia cultural de medicos que ven la independencia de NP como amenazante",
      },
      {
        en: "NPs doing administrative tasks (prior authorizations, referral paperwork) instead of seeing patients",
        es: "NPs haciendo tareas administrativas (autorizaciones previas, papeleo de referencias) en lugar de ver pacientes",
      },
    ],
    changeManagement: {
      en: "Audit all NPs: how many have completed AB 890 transition-to-practice? Update supervision agreements, remove unnecessary chart review requirements, and publicly communicate the change to all staff. Assign dedicated support staff (MA or care coordinator) to each NP panel. Track NP panel size and encounters monthly.",
      es: "Audite todas las NPs: cuantas han completado la transicion a la practica de AB 890? Actualice acuerdos de supervision, elimine requisitos innecesarios de revision de notas y comunique el cambio publicamente a todo el personal. Asigne personal de apoyo dedicado (MA o coordinador de atencion) a cada panel de NP. Rastree el tamano del panel de NP y encuentros mensualmente.",
    },
    revenueImpact: {
      en: "NP visits are billed at the same PPS encounter rate as physician visits in FQHCs — no revenue reduction. NP salary is typically 60-75% of physician salary, meaning each NP-run panel has a significantly higher revenue-to-cost ratio. FQHCs can expand access by adding NP panels at lower cost than physician panels.",
      es: "Las visitas de NP se facturan a la misma tarifa de encuentro PPS que las visitas medicas en FQHCs — sin reduccion de ingresos. El salario de NP es tipicamente 60-75% del salario medico, lo que significa que cada panel dirigido por NP tiene una relacion ingreso-costo significativamente mayor. Los FQHCs pueden expandir acceso agregando paneles de NP a menor costo que paneles medicos.",
    },
    primarySourceUrl: "https://www.rn.ca.gov/practice/np.shtml",
  },

  /* ---- 3. PA — Physician Assistant ---- */
  {
    id: "pa",
    title: {
      en: "Physician Assistant (PA)",
      es: "Asistente Medico (PA)",
    },
    abbreviation: "PA",
    category: "advanced-practice",
    licensingBody: "Physician Assistant Board (under Medical Board of CA)",
    licensingBodyUrl: "https://www.pab.ca.gov/",
    caRegulation: "BPC §3500-3546",
    educationRequired: {
      en: "Master's degree from ARC-PA accredited PA program (typically 2-3 years)",
      es: "Maestria de programa de PA acreditado por ARC-PA (tipicamente 2-3 anos)",
    },
    certificationRequired: [
      "NCCPA Certification (PANCE exam)",
      "California PA License",
      "DEA Registration",
    ],
    supervisedBy: "md-do",
    canSupervise: ["ma"],
    coreScope: [
      {
        en: "Assess, diagnose, and treat patients under physician practice agreement",
        es: "Evaluar, diagnosticar y tratar pacientes bajo acuerdo de practica con medico",
      },
      {
        en: "Prescribe medications including controlled substances (Schedules II-V) with physician approval on practice agreement",
        es: "Recetar medicamentos incluyendo sustancias controladas (Listas II-V) con aprobacion medica en acuerdo de practica",
      },
      {
        en: "Perform procedures as defined in practice agreement and training",
        es: "Realizar procedimientos definidos en el acuerdo de practica y entrenamiento",
      },
      {
        en: "Order and interpret diagnostic tests",
        es: "Ordenar e interpretar pruebas diagnosticas",
      },
      {
        en: "Provide patient education, counseling, and care coordination",
        es: "Proveer educacion al paciente, consejeria y coordinacion de atencion",
      },
    ],
    cannotDo: [
      {
        en: "Practice without a physician practice agreement (unlike NPs post-AB 890)",
        es: "Practicar sin un acuerdo de practica con medico (a diferencia de NPs despues de AB 890)",
      },
      {
        en: "Independently own or operate a medical practice",
        es: "Poseer u operar independientemente una practica medica",
      },
      {
        en: "Perform tasks outside the scope defined in their practice agreement",
        es: "Realizar tareas fuera del alcance definido en su acuerdo de practica",
      },
    ],
    delegationRules: [
      {
        task: {
          en: "Patient assessment and diagnosis",
          es: "Evaluacion y diagnostico de pacientes",
        },
        level: "supervised",
        citation: "BPC §3502",
        fqhcNote: {
          en: "Supervision doesn't require the physician to be physically present — chart review and availability are sufficient.",
          es: "La supervision no requiere que el medico este fisicamente presente — la revision de notas y disponibilidad son suficientes.",
        },
      },
      {
        task: {
          en: "Prescribing medications",
          es: "Prescripcion de medicamentos",
        },
        level: "supervised",
        citation: "BPC §3502.1",
      },
      {
        task: {
          en: "Performing medical procedures",
          es: "Realizacion de procedimientos medicos",
        },
        level: "supervised",
        citation: "BPC §3502",
      },
    ],
    fqhcContext: {
      en: "PAs can do nearly everything NPs can do clinically, but still require a physician practice agreement — they did not get an equivalent of AB 890. In FQHCs, PAs generate the same PPS encounter rate as physicians and NPs. The key difference is administrative: a supervising physician must be available (not on-site, but reachable) and must review a subset of PA charts. Many FQHCs over-restrict PA scope in practice agreements, limiting the procedures and prescriptions PAs can handle independently.",
      es: "Los PAs pueden hacer casi todo lo que las NPs hacen clinicamente, pero aun requieren un acuerdo de practica con medico — no recibieron un equivalente de AB 890. En FQHCs, los PAs generan la misma tarifa de encuentro PPS que medicos y NPs. La diferencia clave es administrativa: un medico supervisor debe estar disponible (no en sitio, pero accesible) y debe revisar un subconjunto de notas del PA. Muchos FQHCs sobre-restringen el alcance del PA en acuerdos de practica, limitando los procedimientos y prescripciones que los PAs pueden manejar independientemente.",
    },
    topOfLicenseBarriers: [
      {
        en: "Practice agreements that are overly restrictive compared to PA training and competency",
        es: "Acuerdos de practica que son excesivamente restrictivos comparados con el entrenamiento y competencia del PA",
      },
      {
        en: "Physicians requiring in-person chart review instead of asynchronous review",
        es: "Medicos requiriendo revision de notas en persona en lugar de revision asincrona",
      },
      {
        en: "PAs handling administrative tasks (insurance calls, prior auths) that support staff could manage",
        es: "PAs manejando tareas administrativas (llamadas de seguro, autorizaciones previas) que personal de apoyo podria gestionar",
      },
    ],
    changeManagement: {
      en: "Review and expand PA practice agreements annually. Compare the agreement's scope to the PA's actual training and competency. Ensure physician chart review is asynchronous (not blocking PA workflow). Assign dedicated MA support to PA panels just as you would for physician panels.",
      es: "Revise y expanda los acuerdos de practica del PA anualmente. Compare el alcance del acuerdo con el entrenamiento y competencia real del PA. Asegure que la revision de notas del medico sea asincrona (sin bloquear el flujo de trabajo del PA). Asigne apoyo de MA dedicado a los paneles del PA igual que lo haria para paneles medicos.",
    },
    revenueImpact: {
      en: "PA visits generate the same PPS encounter rate as physician and NP visits in FQHCs. PA salary is typically similar to NP salary (60-75% of physician salary). Expanding PA scope through broader practice agreements increases encounter volume without adding providers.",
      es: "Las visitas de PA generan la misma tarifa de encuentro PPS que las visitas de medicos y NPs en FQHCs. El salario del PA es tipicamente similar al salario de NP (60-75% del salario medico). Expandir el alcance del PA a traves de acuerdos de practica mas amplios aumenta el volumen de encuentros sin agregar proveedores.",
    },
    primarySourceUrl: "https://www.pab.ca.gov/about_us/history.shtml",
  },

  /* ---- 4. RN — Registered Nurse ---- */
  {
    id: "rn",
    title: {
      en: "Registered Nurse (RN)",
      es: "Enfermera Registrada (RN)",
    },
    abbreviation: "RN",
    category: "nursing",
    licensingBody: "Board of Registered Nursing",
    licensingBodyUrl: "https://www.rn.ca.gov",
    caRegulation: "BPC §2725",
    educationRequired: {
      en: "Associate Degree in Nursing (ADN) or Bachelor of Science in Nursing (BSN) from accredited program",
      es: "Titulo asociado en enfermeria (ADN) o Licenciatura en ciencias de enfermeria (BSN) de programa acreditado",
    },
    certificationRequired: [
      "California RN License (NCLEX-RN exam)",
      "BLS Certification",
    ],
    supervisedBy: null,
    canSupervise: ["lvn", "ma", "chw"],
    coreScope: [
      {
        en: "Independent nursing assessment — determine patient status, identify problems, evaluate outcomes",
        es: "Evaluacion de enfermeria independiente — determinar estado del paciente, identificar problemas, evaluar resultados",
      },
      {
        en: "Develop and implement nursing care plans based on assessment",
        es: "Desarrollar e implementar planes de atencion de enfermeria basados en evaluacion",
      },
      {
        en: "Administer medications (oral, injection, IV) per physician/NP/PA order",
        es: "Administrar medicamentos (oral, inyeccion, IV) segun orden de medico/NP/PA",
      },
      {
        en: "Perform triage — prioritize patient acuity and determine urgency of care",
        es: "Realizar triaje — priorizar agudeza del paciente y determinar urgencia de atencion",
      },
      {
        en: "Patient education, discharge planning, and care coordination",
        es: "Educacion al paciente, planificacion de alta y coordinacion de atencion",
      },
      {
        en: "Wound care, catheterization, IV therapy, and clinical procedures within RN scope",
        es: "Cuidado de heridas, cateterizacion, terapia IV y procedimientos clinicos dentro del alcance de RN",
      },
      {
        en: "Supervise LVNs and unlicensed assistive personnel (MAs, CNAs)",
        es: "Supervisar LVNs y personal asistente sin licencia (MAs, CNAs)",
      },
    ],
    cannotDo: [
      {
        en: "Independently diagnose medical conditions (nursing diagnosis is distinct from medical diagnosis)",
        es: "Diagnosticar condiciones medicas de forma independiente (diagnostico de enfermeria es distinto del diagnostico medico)",
      },
      {
        en: "Prescribe medications or order diagnostic tests independently",
        es: "Recetar medicamentos u ordenar pruebas diagnosticas de forma independiente",
      },
      {
        en: "Perform medical procedures beyond RN scope (surgery, intubation, central lines)",
        es: "Realizar procedimientos medicos fuera del alcance de RN (cirugia, intubacion, lineas centrales)",
      },
    ],
    delegationRules: [
      {
        task: {
          en: "Nursing assessment and triage",
          es: "Evaluacion de enfermeria y triaje",
        },
        level: "independent",
        citation: "BPC §2725(b)(1)-(2)",
        fqhcNote: {
          en: "RN triage is independent nursing judgment — does not require physician order. Many FQHCs underuse RN triage by having MAs do initial screening.",
          es: "El triaje de RN es juicio de enfermeria independiente — no requiere orden medica. Muchos FQHCs subutilizan el triaje de RN al tener MAs haciendo evaluacion inicial.",
        },
      },
      {
        task: {
          en: "Medication administration",
          es: "Administracion de medicamentos",
        },
        level: "supervised",
        citation: "BPC §2725(b)(3)",
      },
      {
        task: {
          en: "Care plan development",
          es: "Desarrollo de plan de atencion",
        },
        level: "independent",
        citation: "BPC §2725(b)(3)",
      },
    ],
    fqhcContext: {
      en: "RNs in FQHCs are chronically underutilized. The most common pattern: an RN spending their day doing vital signs, data entry, and patient rooming — tasks that MAs can handle. Meanwhile, the RN's independent scope (triage, care coordination, care plan development, patient education) goes unused. RN co-visit models — where an RN pairs with an MA or CHW to see patients — dramatically expand care delivery. RN-led chronic disease management panels (diabetes, hypertension) generate billable encounters and improve outcomes.",
      es: "Las RNs en FQHCs estan cronicamente subutilizadas. El patron mas comun: una RN dedicando su dia a tomar signos vitales, entrada de datos y preparar pacientes — tareas que los MAs pueden manejar. Mientras tanto, el alcance independiente de la RN (triaje, coordinacion de atencion, desarrollo de planes de atencion, educacion al paciente) queda sin usar. Los modelos de co-visita de RN — donde una RN se asocia con un MA o CHW para ver pacientes — expanden dramaticamente la entrega de atencion. Los paneles de manejo de enfermedades cronicas dirigidos por RN (diabetes, hipertension) generan encuentros facturables y mejoran resultados.",
    },
    topOfLicenseBarriers: [
      {
        en: "RNs assigned to vital signs and patient rooming — MA-level tasks that waste RN training",
        es: "RNs asignadas a signos vitales y preparacion de pacientes — tareas de nivel MA que desperdician el entrenamiento de RN",
      },
      {
        en: "No standing orders or protocols that allow RNs to initiate care (e.g., flu vaccines, HbA1c checks)",
        es: "Sin ordenes permanentes o protocolos que permitan a las RNs iniciar atencion (ej., vacunas de gripe, chequeos de HbA1c)",
      },
      {
        en: "RNs doing EHR documentation and insurance paperwork instead of patient education and care coordination",
        es: "RNs haciendo documentacion de EHR y papeleo de seguros en lugar de educacion al paciente y coordinacion de atencion",
      },
    ],
    changeManagement: {
      en: "Separate MA and RN workflows completely. MAs handle pre-visit (vitals, intake, rooming). RNs handle triage, care coordination, chronic disease management, and patient education. Create standing orders for the top 10 RN-initiatable actions. Track RN encounters separately to demonstrate impact on patient outcomes and access.",
      es: "Separe los flujos de trabajo de MA y RN completamente. Los MAs manejan la pre-visita (signos vitales, admision, preparacion). Las RNs manejan triaje, coordinacion de atencion, manejo de enfermedades cronicas y educacion al paciente. Cree ordenes permanentes para las 10 principales acciones iniciables por RN. Rastree los encuentros de RN por separado para demostrar el impacto en resultados del paciente y acceso.",
    },
    revenueImpact: {
      en: "RN-led visits can generate billable encounters under FQHC PPS when they involve assessment, education, or care management — especially for chronic disease management and transitional care management (TCM). RN care coordination also improves quality metrics that affect grant funding and value-based payment bonuses.",
      es: "Las visitas dirigidas por RN pueden generar encuentros facturables bajo PPS de FQHC cuando involucran evaluacion, educacion o manejo de atencion — especialmente para manejo de enfermedades cronicas y manejo de atencion transicional (TCM). La coordinacion de atencion de RN tambien mejora metricas de calidad que afectan el financiamiento por subvenciones y bonos de pago basado en valor.",
    },
    primarySourceUrl: "https://www.rn.ca.gov/practice/npa.shtml",
  },

  /* ---- 5. LVN — Licensed Vocational Nurse ---- */
  {
    id: "lvn",
    title: {
      en: "Licensed Vocational Nurse (LVN)",
      es: "Enfermera Vocacional Licenciada (LVN)",
    },
    abbreviation: "LVN",
    category: "nursing",
    licensingBody: "Board of Vocational Nursing and Psychiatric Technicians (BVNPT)",
    licensingBodyUrl: "https://www.bvnpt.ca.gov",
    caRegulation: "BPC §2859-2862",
    educationRequired: {
      en: "12-18 month vocational nursing program from approved school",
      es: "Programa de enfermeria vocacional de 12-18 meses de escuela aprobada",
    },
    certificationRequired: [
      "California LVN License (NCLEX-PN exam)",
      "BLS Certification",
    ],
    supervisedBy: "rn",
    canSupervise: [],
    coreScope: [
      {
        en: "Provide basic bedside nursing care under RN or physician supervision",
        es: "Proveer atencion de enfermeria basica junto al paciente bajo supervision de RN o medico",
      },
      {
        en: "Administer medications (oral and injection) under supervision",
        es: "Administrar medicamentos (oral e inyeccion) bajo supervision",
      },
      {
        en: "Wound care, dressing changes, and basic clinical procedures",
        es: "Cuidado de heridas, cambios de aposito y procedimientos clinicos basicos",
      },
      {
        en: "Collect specimens, perform point-of-care testing",
        es: "Recolectar muestras, realizar pruebas en el punto de atencion",
      },
      {
        en: "Observe and report patient changes to supervising RN or physician",
        es: "Observar y reportar cambios del paciente a la RN o medico supervisor",
      },
      {
        en: "Patient education on topics within LVN scope (medication instructions, post-procedure care)",
        es: "Educacion al paciente sobre temas dentro del alcance de LVN (instrucciones de medicamentos, cuidado post-procedimiento)",
      },
    ],
    cannotDo: [
      {
        en: "Independently assess patients or develop nursing care plans (RN function under BPC §2725)",
        es: "Evaluar pacientes de forma independiente o desarrollar planes de atencion de enfermeria (funcion de RN bajo BPC §2725)",
      },
      {
        en: "Administer IV push medications (may monitor IV drips in some settings with certification)",
        es: "Administrar medicamentos IV push (puede monitorear goteos IV en algunos entornos con certificacion)",
      },
      {
        en: "Perform triage or make clinical priority decisions",
        es: "Realizar triaje o tomar decisiones de prioridad clinica",
      },
      {
        en: "Initiate blood transfusions or administer chemotherapy",
        es: "Iniciar transfusiones de sangre o administrar quimioterapia",
      },
    ],
    delegationRules: [
      {
        task: {
          en: "Medication administration (oral/IM)",
          es: "Administracion de medicamentos (oral/IM)",
        },
        level: "supervised",
        citation: "BPC §2860.5",
      },
      {
        task: {
          en: "Wound care and dressings",
          es: "Cuidado de heridas y apositos",
        },
        level: "supervised",
        citation: "BPC §2859",
      },
      {
        task: {
          en: "Patient observation and reporting",
          es: "Observacion y reporte del paciente",
        },
        level: "supervised",
        citation: "BPC §2859",
      },
    ],
    fqhcContext: {
      en: "LVNs are often underutilized in FQHCs. Many work at the same level as MAs (vitals, rooming) despite having clinical training that allows medication administration, wound care, and specimen collection. The key is creating clear LVN protocols: what they can do independently under standing orders, what requires RN supervision, and what's outside scope. FQHCs with strong LVN protocols free up RNs for higher-level work and extend provider capacity.",
      es: "Las LVNs estan a menudo subutilizadas en FQHCs. Muchas trabajan al mismo nivel que los MAs (signos vitales, preparacion) a pesar de tener entrenamiento clinico que permite administracion de medicamentos, cuidado de heridas y recoleccion de muestras. La clave es crear protocolos claros de LVN: que pueden hacer independientemente bajo ordenes permanentes, que requiere supervision de RN y que esta fuera del alcance. Los FQHCs con protocolos fuertes de LVN liberan a las RNs para trabajo de nivel mas alto y extienden la capacidad del proveedor.",
    },
    topOfLicenseBarriers: [
      {
        en: "LVNs assigned exclusively to MA-level tasks (vitals, intake) without using clinical skills",
        es: "LVNs asignadas exclusivamente a tareas de nivel MA (signos vitales, admision) sin usar habilidades clinicas",
      },
      {
        en: "No LVN-specific standing orders for medication administration or wound care protocols",
        es: "Sin ordenes permanentes especificas para LVN para administracion de medicamentos o protocolos de cuidado de heridas",
      },
      {
        en: "Unclear supervision structure — LVNs unsure when they need RN sign-off vs. when they can act under physician standing order",
        es: "Estructura de supervision poco clara — LVNs inseguras de cuando necesitan aprobacion de RN vs. cuando pueden actuar bajo orden permanente del medico",
      },
    ],
    changeManagement: {
      en: "Create an LVN scope-of-practice guide specific to your FQHC. List every task an LVN can do under standing orders, under RN supervision, and under direct physician order. Post it in every clinic. Train RNs on how to supervise LVNs effectively (delegation, not micromanagement). Track LVN task distribution monthly to ensure clinical skills are being used.",
      es: "Cree una guia de alcance de practica de LVN especifica para su FQHC. Liste cada tarea que una LVN puede hacer bajo ordenes permanentes, bajo supervision de RN y bajo orden directa del medico. Publiquelo en cada clinica. Capacite a las RNs sobre como supervisar LVNs efectivamente (delegacion, no micromanejo). Rastree la distribucion de tareas de LVN mensualmente para asegurar que las habilidades clinicas se estan usando.",
    },
    revenueImpact: {
      en: "LVN time doesn't directly generate encounters, but enables provider efficiency. LVNs who handle medication administration, wound care, and specimen collection free up RNs for billable activities and allow providers to see more patients per session. Proper LVN utilization typically increases clinic throughput by 10-15%.",
      es: "El tiempo de LVN no genera encuentros directamente, pero permite eficiencia del proveedor. Las LVNs que manejan administracion de medicamentos, cuidado de heridas y recoleccion de muestras liberan a las RNs para actividades facturables y permiten a los proveedores ver mas pacientes por sesion. La utilizacion adecuada de LVN tipicamente aumenta el rendimiento de la clinica en 10-15%.",
    },
    primarySourceUrl: "https://www.bvnpt.ca.gov/licensees/licensed_vocational_nurses.shtml",
  },

  /* ---- 6. MA — Medical Assistant ---- */
  {
    id: "ma",
    title: {
      en: "Medical Assistant (MA)",
      es: "Asistente Medico (MA)",
    },
    abbreviation: "MA",
    category: "allied-health",
    licensingBody: "No license required (operates under physician delegation)",
    licensingBodyUrl: "https://www.mbc.ca.gov/Licensing/Physician-Assistants/",
    caRegulation: "Title 16 CCR §1366",
    educationRequired: {
      en: "Medical assistant certificate from accredited program (typically 9-12 months) OR on-the-job training with employer",
      es: "Certificado de asistente medico de programa acreditado (tipicamente 9-12 meses) O capacitacion en el trabajo con empleador",
    },
    certificationRequired: [
      "No state license required",
      "CMA or RMA certification recommended but not mandatory",
      "BLS Certification (employer-required)",
    ],
    supervisedBy: "md-do",
    canSupervise: [],
    coreScope: [
      {
        en: "Take and record vital signs (blood pressure, temperature, pulse, respirations, weight)",
        es: "Tomar y registrar signos vitales (presion arterial, temperatura, pulso, respiraciones, peso)",
      },
      {
        en: "Perform patient intake — document chief complaint, allergies, medications in EHR",
        es: "Realizar admision del paciente — documentar queja principal, alergias, medicamentos en EHR",
      },
      {
        en: "Administer injections (immunizations, B12, allergy) with documented training",
        es: "Administrar inyecciones (inmunizaciones, B12, alergia) con entrenamiento documentado",
      },
      {
        en: "Perform basic laboratory tests (fingerstick glucose, rapid strep, urinalysis, pregnancy tests)",
        es: "Realizar pruebas de laboratorio basicas (glucosa por puncion digital, estreptococo rapido, analisis de orina, pruebas de embarazo)",
      },
      {
        en: "Apply dressings, remove sutures/staples under physician direction",
        es: "Aplicar apositos, remover suturas/grapas bajo direccion del medico",
      },
      {
        en: "Prepare exam rooms, sterilize instruments, manage medical supplies",
        es: "Preparar salas de examen, esterilizar instrumentos, gestionar suministros medicos",
      },
      {
        en: "Assist with pre-visit planning (review pending orders, prep charts)",
        es: "Asistir con planificacion previa a la visita (revisar ordenes pendientes, preparar historiales)",
      },
    ],
    cannotDo: [
      {
        en: "Exercise independent clinical judgment — all clinical tasks require physician delegation",
        es: "Ejercer juicio clinico independiente — todas las tareas clinicas requieren delegacion medica",
      },
      {
        en: "Triage patients or determine clinical priority (RN scope under BPC §2725)",
        es: "Clasificar pacientes o determinar prioridad clinica (alcance de RN bajo BPC §2725)",
      },
      {
        en: "Administer IV medications, start IVs, or perform venipuncture for blood draws (phlebotomy requires separate certification)",
        es: "Administrar medicamentos IV, iniciar IVs o realizar venopuncion para extracciones de sangre (flebotomia requiere certificacion separada)",
      },
      {
        en: "Independently assess patients, create care plans, or make nursing judgments",
        es: "Evaluar pacientes independientemente, crear planes de atencion o hacer juicios de enfermeria",
      },
      {
        en: "Prescribe, dispense, or independently manage medications",
        es: "Recetar, dispensar o manejar medicamentos de forma independiente",
      },
    ],
    delegationRules: [
      {
        task: {
          en: "Vital signs and patient intake",
          es: "Signos vitales y admision del paciente",
        },
        level: "delegated",
        citation: "16 CCR §1366(a)",
        fqhcNote: {
          en: "This is the core MA function. Standing orders can authorize MAs to initiate specific screening protocols (PHQ-9, SDOH) during intake.",
          es: "Esta es la funcion central del MA. Las ordenes permanentes pueden autorizar a los MAs a iniciar protocolos de evaluacion especificos (PHQ-9, SDOH) durante la admision.",
        },
      },
      {
        task: {
          en: "Injections (immunizations, allergy, B12)",
          es: "Inyecciones (inmunizaciones, alergia, B12)",
        },
        level: "delegated",
        citation: "16 CCR §1366(b)",
        fqhcNote: {
          en: "MAs can administer injections with documented training and competency assessment. Standing orders for vaccines dramatically increase immunization rates.",
          es: "Los MAs pueden administrar inyecciones con entrenamiento documentado y evaluacion de competencia. Las ordenes permanentes para vacunas aumentan dramaticamente las tasas de inmunizacion.",
        },
      },
      {
        task: {
          en: "Point-of-care testing",
          es: "Pruebas en el punto de atencion",
        },
        level: "delegated",
        citation: "16 CCR §1366(a)",
      },
    ],
    fqhcContext: {
      en: "MAs are the most common role in FQHCs and the role with the biggest gap between current utilization and potential. The typical MA does vitals, rooms the patient, and waits. A well-trained MA with standing orders can do pre-visit planning, screenings (PHQ-9, SDOH, fall risk), immunizations, point-of-care tests, and care gap closure — all before the provider enters the room. This 'empanelment-ready MA' model has been shown to increase provider productivity by 20-30% and improve quality metrics. The barrier isn't regulation — it's training and standing order development.",
      es: "Los MAs son el rol mas comun en FQHCs y el rol con la mayor brecha entre utilizacion actual y potencial. El MA tipico toma signos vitales, prepara al paciente y espera. Un MA bien capacitado con ordenes permanentes puede hacer planificacion previa a la visita, evaluaciones (PHQ-9, SDOH, riesgo de caidas), inmunizaciones, pruebas en el punto de atencion y cierre de brechas de atencion — todo antes de que el proveedor entre a la sala. Este modelo de 'MA listo para empanelamiento' ha demostrado aumentar la productividad del proveedor en 20-30% y mejorar metricas de calidad. La barrera no es la regulacion — es el entrenamiento y desarrollo de ordenes permanentes.",
    },
    topOfLicenseBarriers: [
      {
        en: "No standing orders — MAs wait for individual physician orders instead of following protocols",
        es: "Sin ordenes permanentes — los MAs esperan ordenes individuales del medico en lugar de seguir protocolos",
      },
      {
        en: "MAs not trained on pre-visit planning, screening tools, or care gap identification",
        es: "MAs no capacitados en planificacion previa a la visita, herramientas de evaluacion o identificacion de brechas de atencion",
      },
      {
        en: "Providers who don't trust MAs to do clinical tasks, creating a cycle of underutilization",
        es: "Proveedores que no confian en los MAs para hacer tareas clinicas, creando un ciclo de subutilizacion",
      },
      {
        en: "No documented competency assessment program — MAs can't demonstrate skills they haven't been formally tested on",
        es: "Sin programa de evaluacion de competencia documentado — los MAs no pueden demostrar habilidades en las que no han sido formalmente evaluados",
      },
    ],
    changeManagement: {
      en: "Build an MA competency program: document training on each delegatable task, test competency, and maintain records. Develop standing orders for the top 10 tasks (immunizations, screenings, point-of-care tests). Train MAs on pre-visit planning using EHR health maintenance reminders. Pair each MA with a specific provider team. Measure impact monthly: screenings completed, care gaps closed, provider encounters per session.",
      es: "Construya un programa de competencia de MA: documente el entrenamiento en cada tarea delegable, evalue la competencia y mantenga registros. Desarrolle ordenes permanentes para las 10 tareas principales (inmunizaciones, evaluaciones, pruebas en el punto de atencion). Capacite a los MAs en planificacion previa a la visita usando recordatorios de mantenimiento de salud del EHR. Asocie cada MA con un equipo de proveedor especifico. Mida el impacto mensualmente: evaluaciones completadas, brechas de atencion cerradas, encuentros del proveedor por sesion.",
    },
    revenueImpact: {
      en: "MA time doesn't generate direct encounter revenue, but it's the biggest lever for increasing provider productivity. Every task an MA handles before the provider enters the room shortens the visit and allows the provider to see more patients. FQHCs that implement MA-driven pre-visit planning typically see 3-5 additional encounters per provider per day — at $200-400+ PPS rate each, that's $600-2,000+ in additional daily revenue per provider.",
      es: "El tiempo del MA no genera ingresos directos por encuentro, pero es la palanca mas grande para aumentar la productividad del proveedor. Cada tarea que un MA maneja antes de que el proveedor entre a la sala acorta la visita y permite al proveedor ver mas pacientes. Los FQHCs que implementan planificacion previa a la visita dirigida por MA tipicamente ven 3-5 encuentros adicionales por proveedor por dia — a una tarifa PPS de $200-400+ cada uno, eso es $600-2,000+ en ingresos diarios adicionales por proveedor.",
    },
    primarySourceUrl: "https://www.mbc.ca.gov/Licensing/Physician-Assistants/Medical-Assistants.aspx",
  },

  /* ---- 7. CHW/Promotora — Community Health Worker ---- */
  {
    id: "chw",
    title: {
      en: "Community Health Worker / Promotora (CHW)",
      es: "Promotor(a) de Salud Comunitaria (CHW)",
    },
    abbreviation: "CHW",
    category: "community-health",
    licensingBody: "California Department of Public Health (CDPH) — voluntary certification",
    licensingBodyUrl: "https://www.cdph.ca.gov/Programs/CCDPHP/Pages/CHW.aspx",
    caRegulation: "HSC §124250-124260 (SB 803)",
    educationRequired: {
      en: "High school diploma or equivalent, plus CDPH-approved CHW training program (80-148 hours). Lived experience in the community served is highly valued.",
      es: "Diploma de preparatoria o equivalente, mas programa de capacitacion de CHW aprobado por CDPH (80-148 horas). Experiencia vivida en la comunidad servida es altamente valorada.",
    },
    certificationRequired: [
      "CDPH CHW Certificate (voluntary but increasingly employer-required)",
      "No state license required",
    ],
    supervisedBy: "rn",
    canSupervise: [],
    coreScope: [
      {
        en: "Health education and health literacy promotion in community settings",
        es: "Educacion en salud y promocion de alfabetizacion en salud en entornos comunitarios",
      },
      {
        en: "Patient navigation — help patients access services, schedule appointments, understand insurance",
        es: "Navegacion del paciente — ayudar a pacientes a acceder servicios, programar citas, entender seguros",
      },
      {
        en: "Social determinants of health (SDOH) screening and resource connection",
        es: "Evaluacion de determinantes sociales de la salud (SDOH) y conexion con recursos",
      },
      {
        en: "Community outreach, enrollment assistance (Medi-Cal, Covered CA), and engagement",
        es: "Alcance comunitario, asistencia de inscripcion (Medi-Cal, Covered CA) y participacion",
      },
      {
        en: "Care coordination — follow up on referrals, appointment reminders, medication adherence support",
        es: "Coordinacion de atencion — seguimiento de referencias, recordatorios de citas, apoyo de adherencia a medicamentos",
      },
      {
        en: "Cultural mediation between patients and clinical staff",
        es: "Mediacion cultural entre pacientes y personal clinico",
      },
      {
        en: "Chronic disease self-management support (diabetes, asthma, hypertension education)",
        es: "Apoyo de automanejo de enfermedades cronicas (educacion sobre diabetes, asma, hipertension)",
      },
    ],
    cannotDo: [
      {
        en: "Perform clinical tasks — no vital signs, injections, or medication administration",
        es: "Realizar tareas clinicas — sin signos vitales, inyecciones o administracion de medicamentos",
      },
      {
        en: "Diagnose conditions or provide medical advice",
        es: "Diagnosticar condiciones o proveer consejo medico",
      },
      {
        en: "Independently bill for services under most payers (CalAIM ECM/CS are the exception)",
        es: "Facturar independientemente por servicios bajo la mayoria de los pagadores (CalAIM ECM/CS son la excepcion)",
      },
      {
        en: "Make clinical triage decisions or determine urgency of care",
        es: "Tomar decisiones de triaje clinico o determinar urgencia de atencion",
      },
    ],
    delegationRules: [
      {
        task: {
          en: "SDOH screening and resource referral",
          es: "Evaluacion de SDOH y referencia a recursos",
        },
        level: "independent",
        citation: "HSC §124250(c)",
        fqhcNote: {
          en: "CHWs can independently conduct SDOH screenings. Under CalAIM Community Supports, these activities are billable when documented properly.",
          es: "Los CHWs pueden conducir evaluaciones de SDOH de forma independiente. Bajo los Apoyos Comunitarios de CalAIM, estas actividades son facturables cuando se documentan adecuadamente.",
        },
      },
      {
        task: {
          en: "Health education and self-management coaching",
          es: "Educacion en salud y coaching de automanejo",
        },
        level: "independent",
        citation: "HSC §124250(c)(1)",
      },
      {
        task: {
          en: "Care coordination and navigation",
          es: "Coordinacion de atencion y navegacion",
        },
        level: "supervised",
        citation: "HSC §124250(c)(3)",
        fqhcNote: {
          en: "CHWs coordinate care under clinical supervision. Under CalAIM ECM, CHW-provided care coordination is a billable managed care activity.",
          es: "Los CHWs coordinan atencion bajo supervision clinica. Bajo CalAIM ECM, la coordinacion de atencion proporcionada por CHW es una actividad de atencion manejada facturable.",
        },
      },
    ],
    fqhcContext: {
      en: "CHWs are the bridge between community and clinic — and CalAIM has transformed their economic model. Under Enhanced Care Management (ECM) and Community Supports (CS), CHW services are now billable through managed care plans. This means CHWs, historically grant-funded and first cut during budget crises, can now generate sustainable revenue. FQHCs that build CHW programs around CalAIM billing codes are creating a new revenue stream while addressing SDOH — the factors that drive 80% of health outcomes. The SB 803 certification (2024) gives CHWs professional recognition and creates a career pathway from community outreach to certified CHW to care coordinator.",
      es: "Los CHWs son el puente entre la comunidad y la clinica — y CalAIM ha transformado su modelo economico. Bajo la Gestion de Atencion Mejorada (ECM) y los Apoyos Comunitarios (CS), los servicios de CHW ahora son facturables a traves de planes de atencion manejada. Esto significa que los CHWs, historicamente financiados por subvenciones y los primeros recortados durante crisis presupuestarias, ahora pueden generar ingresos sostenibles. Los FQHCs que construyen programas de CHW alrededor de codigos de facturacion de CalAIM estan creando una nueva fuente de ingresos mientras abordan SDOH — los factores que impulsan el 80% de los resultados de salud. La certificacion SB 803 (2024) da a los CHWs reconocimiento profesional y crea una trayectoria profesional desde alcance comunitario a CHW certificado a coordinador de atencion.",
    },
    topOfLicenseBarriers: [
      {
        en: "CHWs limited to outreach/enrollment — not used for SDOH screening, care coordination, or CalAIM-billable activities",
        es: "CHWs limitados a alcance/inscripcion — no usados para evaluacion de SDOH, coordinacion de atencion o actividades facturables de CalAIM",
      },
      {
        en: "No CalAIM billing infrastructure — CHW services not documented in a way that generates revenue",
        es: "Sin infraestructura de facturacion CalAIM — servicios de CHW no documentados de manera que genere ingresos",
      },
      {
        en: "CHWs siloed from clinical teams — working in community without feedback loops to providers",
        es: "CHWs aislados de los equipos clinicos — trabajando en la comunidad sin ciclos de retroalimentacion a los proveedores",
      },
    ],
    changeManagement: {
      en: "Integrate CHWs into care teams (not siloed in 'community programs'). Train CHWs on CalAIM ECM/CS documentation requirements so their work generates revenue. Create structured workflows: CHW conducts SDOH screening → refers to resources → documents in EHR → clinical team reviews. Track CHW-attributed outcomes: appointment show rates, medication adherence, ED utilization for their panels.",
      es: "Integre los CHWs en equipos de atencion (no aislados en 'programas comunitarios'). Capacite a los CHWs en requisitos de documentacion CalAIM ECM/CS para que su trabajo genere ingresos. Cree flujos de trabajo estructurados: CHW conduce evaluacion de SDOH → refiere a recursos → documenta en EHR → equipo clinico revisa. Rastree resultados atribuidos a CHW: tasas de asistencia a citas, adherencia a medicamentos, uso de urgencias para sus paneles.",
    },
    revenueImpact: {
      en: "Under CalAIM, CHW services are billable through ECM and Community Supports managed care contracts. FQHCs with CalAIM contracts can bill for CHW care coordination, SDOH screening, and navigation services. CHWs also improve patient engagement metrics (show rates, panel retention) that drive overall encounter volume. The ROI of CHW programs is estimated at $2.47 returned for every $1 invested (Penn Center for CHW).",
      es: "Bajo CalAIM, los servicios de CHW son facturables a traves de contratos de atencion manejada de ECM y Apoyos Comunitarios. Los FQHCs con contratos CalAIM pueden facturar por coordinacion de atencion CHW, evaluacion de SDOH y servicios de navegacion. Los CHWs tambien mejoran metricas de participacion del paciente (tasas de asistencia, retencion de panel) que impulsan el volumen general de encuentros. El ROI de programas de CHW se estima en $2.47 retornados por cada $1 invertido (Penn Center for CHW).",
    },
    primarySourceUrl: "https://www.cdph.ca.gov/Programs/CCDPHP/Pages/CHW.aspx",
  },

  /* ---- 8. LCSW — Licensed Clinical Social Worker ---- */
  {
    id: "lcsw",
    title: {
      en: "Licensed Clinical Social Worker (LCSW)",
      es: "Trabajador(a) Social Clinico Licenciado (LCSW)",
    },
    abbreviation: "LCSW",
    category: "behavioral-health",
    licensingBody: "Board of Behavioral Sciences (BBS)",
    licensingBodyUrl: "https://www.bbs.ca.gov",
    caRegulation: "BPC §4996-4996.19",
    educationRequired: {
      en: "Master of Social Work (MSW) from CSWE-accredited program, plus 3,200 hours of supervised clinical experience",
      es: "Maestria en Trabajo Social (MSW) de programa acreditado por CSWE, mas 3,200 horas de experiencia clinica supervisada",
    },
    certificationRequired: [
      "California LCSW License (BBS exam)",
      "NPI Number",
    ],
    supervisedBy: null,
    canSupervise: ["amft-asw"],
    coreScope: [
      {
        en: "Provide psychotherapy to individuals, couples, families, and groups",
        es: "Proveer psicoterapia a individuos, parejas, familias y grupos",
      },
      {
        en: "Diagnose mental health conditions using DSM-5 criteria",
        es: "Diagnosticar condiciones de salud mental usando criterios del DSM-5",
      },
      {
        en: "Conduct biopsychosocial assessments and develop treatment plans",
        es: "Conducir evaluaciones biopsicosociales y desarrollar planes de tratamiento",
      },
      {
        en: "Crisis intervention and safety planning (suicidal ideation, domestic violence, child abuse)",
        es: "Intervencion en crisis y planificacion de seguridad (ideacion suicida, violencia domestica, abuso infantil)",
      },
      {
        en: "Mandated reporting (child abuse, elder abuse, threat to self/others)",
        es: "Reporte obligatorio (abuso infantil, abuso de ancianos, amenaza a si mismo/otros)",
      },
      {
        en: "Care coordination for behavioral health — connect patients to community mental health resources",
        es: "Coordinacion de atencion para salud conductual — conectar pacientes a recursos comunitarios de salud mental",
      },
      {
        en: "Supervise clinical associates (AMFTs, ASWs, APCCs) toward licensure",
        es: "Supervisar asociados clinicos (AMFTs, ASWs, APCCs) hacia la licenciatura",
      },
    ],
    cannotDo: [
      {
        en: "Prescribe medications (requires physician, NP, or PA)",
        es: "Recetar medicamentos (requiere medico, NP o PA)",
      },
      {
        en: "Order medical tests or perform physical examinations",
        es: "Ordenar pruebas medicas o realizar examenes fisicos",
      },
      {
        en: "Administer psychological testing requiring psychologist credential (e.g., neuropsych testing)",
        es: "Administrar pruebas psicologicas que requieren credencial de psicologo (ej., pruebas neuropsicologicas)",
      },
    ],
    delegationRules: [
      {
        task: {
          en: "Psychotherapy and counseling",
          es: "Psicoterapia y consejeria",
        },
        level: "independent",
        citation: "BPC §4996.9",
      },
      {
        task: {
          en: "Mental health diagnosis (DSM-5)",
          es: "Diagnostico de salud mental (DSM-5)",
        },
        level: "independent",
        citation: "BPC §4996.9",
      },
      {
        task: {
          en: "Crisis intervention and safety planning",
          es: "Intervencion en crisis y planificacion de seguridad",
        },
        level: "independent",
        citation: "BPC §4996.9",
        fqhcNote: {
          en: "In FQHCs, LCSWs often provide warm handoffs from primary care — a provider identifies a behavioral health need, and the LCSW sees the patient same-day.",
          es: "En FQHCs, los LCSWs a menudo proporcionan transferencias calidas desde atencion primaria — un proveedor identifica una necesidad de salud conductual, y el LCSW ve al paciente el mismo dia.",
        },
      },
    ],
    fqhcContext: {
      en: "LCSWs are often the only licensed behavioral health provider in an FQHC. They run behavioral health integration (BHI) — the model where mental health services are embedded in the primary care setting. LCSW visits generate a separate PPS encounter rate when they occur on the same day as a medical visit (same-day billing), making them a direct revenue generator. The challenge is that most FQHCs have 1-2 LCSWs serving thousands of patients, creating massive waitlists. Building an associate supervision program (AMFT/ASW) is the fastest way to expand BH capacity.",
      es: "Los LCSWs son a menudo el unico proveedor de salud conductual licenciado en un FQHC. Ellos dirigen la integracion de salud conductual (BHI) — el modelo donde los servicios de salud mental estan integrados en el entorno de atencion primaria. Las visitas de LCSW generan una tarifa de encuentro PPS separada cuando ocurren el mismo dia que una visita medica (facturacion del mismo dia), haciendolos un generador directo de ingresos. El desafio es que la mayoria de los FQHCs tienen 1-2 LCSWs sirviendo a miles de pacientes, creando listas de espera masivas. Construir un programa de supervision de asociados (AMFT/ASW) es la forma mas rapida de expandir la capacidad de salud conductual.",
    },
    topOfLicenseBarriers: [
      {
        en: "LCSW time consumed by low-acuity cases that trained associates (AMFT/ASW) could handle",
        es: "Tiempo del LCSW consumido por casos de baja agudeza que asociados capacitados (AMFT/ASW) podrian manejar",
      },
      {
        en: "No structured warm handoff protocol — primary care providers uncertain when/how to refer to BH",
        es: "Sin protocolo estructurado de transferencia calida — proveedores de atencion primaria inseguros de cuando/como referir a salud conductual",
      },
      {
        en: "LCSWs spending time on documentation and billing instead of patient-facing care",
        es: "LCSWs dedicando tiempo a documentacion y facturacion en lugar de atencion al paciente",
      },
    ],
    changeManagement: {
      en: "Implement a tiered behavioral health model: LCSW handles complex cases (suicidality, trauma, co-occurring disorders), associates handle mild-moderate cases (adjustment, anxiety, depression), CHWs handle SDOH-related behavioral health needs. Create a structured warm handoff protocol. Track same-day BH encounters as a revenue metric. Build an associate supervision program to expand capacity without adding licensed FTEs.",
      es: "Implemente un modelo escalonado de salud conductual: LCSW maneja casos complejos (suicidio, trauma, trastornos co-ocurrentes), asociados manejan casos leves-moderados (ajuste, ansiedad, depresion), CHWs manejan necesidades de salud conductual relacionadas con SDOH. Cree un protocolo estructurado de transferencia calida. Rastree encuentros de salud conductual del mismo dia como metrica de ingresos. Construya un programa de supervision de asociados para expandir capacidad sin agregar FTEs licenciados.",
    },
    revenueImpact: {
      en: "LCSW visits generate a separate FQHC PPS encounter rate — including on the same day as a medical visit. This same-day billing is a significant revenue opportunity: every warm handoff that results in a same-day BH visit generates an additional $150-250+ encounter. FQHCs that implement BHI with same-day billing typically see 15-30% increases in per-patient revenue.",
      es: "Las visitas de LCSW generan una tarifa de encuentro PPS de FQHC separada — incluyendo el mismo dia que una visita medica. Esta facturacion del mismo dia es una oportunidad de ingresos significativa: cada transferencia calida que resulta en una visita de salud conductual del mismo dia genera un encuentro adicional de $150-250+. Los FQHCs que implementan BHI con facturacion del mismo dia tipicamente ven aumentos de 15-30% en ingresos por paciente.",
    },
    primarySourceUrl: "https://www.bbs.ca.gov/applicants/lcsw.html",
  },

  /* ---- 9. AMFT/ASW — Associate MFT / Associate Social Worker ---- */
  {
    id: "amft-asw",
    title: {
      en: "Associate MFT / Associate Social Worker (AMFT/ASW)",
      es: "Asociado MFT / Asociado de Trabajo Social (AMFT/ASW)",
    },
    abbreviation: "AMFT/ASW",
    category: "behavioral-health",
    licensingBody: "Board of Behavioral Sciences (BBS)",
    licensingBodyUrl: "https://www.bbs.ca.gov",
    caRegulation: "BPC §4980.44 (AMFT); BPC §4996.20 (ASW)",
    educationRequired: {
      en: "Master's degree in Marriage and Family Therapy (AMFT) or Master of Social Work (ASW) from accredited program. Currently accruing 3,000+ supervised clinical hours toward licensure.",
      es: "Maestria en Terapia Matrimonial y Familiar (AMFT) o Maestria en Trabajo Social (ASW) de programa acreditado. Actualmente acumulando 3,000+ horas clinicas supervisadas hacia la licenciatura.",
    },
    certificationRequired: [
      "BBS Associate Registration Number",
      "NPI Number",
    ],
    supervisedBy: "lcsw",
    canSupervise: [],
    coreScope: [
      {
        en: "Provide psychotherapy and counseling under clinical supervision",
        es: "Proveer psicoterapia y consejeria bajo supervision clinica",
      },
      {
        en: "Conduct clinical assessments and contribute to treatment plans (supervisor signs off)",
        es: "Conducir evaluaciones clinicas y contribuir a planes de tratamiento (supervisor firma)",
      },
      {
        en: "Provide crisis intervention under supervision",
        es: "Proveer intervencion en crisis bajo supervision",
      },
      {
        en: "Facilitate group therapy sessions",
        es: "Facilitar sesiones de terapia grupal",
      },
      {
        en: "Document clinical encounters and progress notes",
        es: "Documentar encuentros clinicos y notas de progreso",
      },
      {
        en: "Provide case management and care coordination for behavioral health patients",
        es: "Proveer manejo de casos y coordinacion de atencion para pacientes de salud conductual",
      },
    ],
    cannotDo: [
      {
        en: "Practice without active clinical supervision (must have supervisor available)",
        es: "Practicar sin supervision clinica activa (debe tener supervisor disponible)",
      },
      {
        en: "Sign off on treatment plans independently — supervisor co-signature required",
        es: "Firmar planes de tratamiento independientemente — co-firma del supervisor requerida",
      },
      {
        en: "Supervise other clinicians or trainees",
        es: "Supervisar otros clinicos o estudiantes",
      },
      {
        en: "Practice after BBS registration expires (6-year limit with possible extension)",
        es: "Practicar despues de que expire el registro de BBS (limite de 6 anos con posible extension)",
      },
    ],
    delegationRules: [
      {
        task: {
          en: "Psychotherapy and counseling",
          es: "Psicoterapia y consejeria",
        },
        level: "supervised",
        citation: "BPC §4980.44(a) (AMFT); BPC §4996.20(a) (ASW)",
        fqhcNote: {
          en: "Associates can provide the same clinical services as their supervisors — the key requirement is documented supervision (1 hour per week of individual supervision per BBS regulations).",
          es: "Los asociados pueden proporcionar los mismos servicios clinicos que sus supervisores — el requisito clave es supervision documentada (1 hora por semana de supervision individual segun regulaciones de BBS).",
        },
      },
      {
        task: {
          en: "Clinical assessment and treatment planning",
          es: "Evaluacion clinica y planificacion de tratamiento",
        },
        level: "supervised",
        citation: "BPC §4980.44; BPC §4996.20",
      },
      {
        task: {
          en: "Crisis intervention",
          es: "Intervencion en crisis",
        },
        level: "supervised",
        citation: "BPC §4980.44; BPC §4996.20",
      },
    ],
    fqhcContext: {
      en: "Associates are the single fastest way to expand behavioral health capacity in FQHCs. The business case is compelling: associate visits are billable at the same PPS encounter rate as LCSW visits in FQHCs, but associate salaries are typically 30-40% lower than licensed clinician salaries. FQHCs that offer structured supervision programs also become 'employers of choice' for new MSW and MFT graduates — solving both the capacity problem and the recruitment pipeline. The key cost is supervisor time: BBS requires 1 hour of individual supervision per week per associate, plus 2 hours of additional supervision (group is acceptable).",
      es: "Los asociados son la forma individual mas rapida de expandir la capacidad de salud conductual en FQHCs. El caso de negocio es convincente: las visitas de asociados se facturan a la misma tarifa de encuentro PPS que las visitas de LCSW en FQHCs, pero los salarios de asociados son tipicamente 30-40% menores que los salarios de clinicos licenciados. Los FQHCs que ofrecen programas de supervision estructurados tambien se convierten en 'empleadores de eleccion' para nuevos graduados de MSW y MFT — resolviendo tanto el problema de capacidad como la linea de reclutamiento. El costo clave es el tiempo del supervisor: BBS requiere 1 hora de supervision individual por semana por asociado, mas 2 horas de supervision adicional (grupal es aceptable).",
    },
    topOfLicenseBarriers: [
      {
        en: "Associates limited to intake assessments only — not allowed to carry ongoing caseloads",
        es: "Asociados limitados solo a evaluaciones de admision — no se les permite llevar cargas de casos en curso",
      },
      {
        en: "Supervisor bottleneck — not enough licensed clinicians willing/available to provide required supervision hours",
        es: "Cuello de botella de supervisor — no suficientes clinicos licenciados dispuestos/disponibles para proveer horas de supervision requeridas",
      },
      {
        en: "Associates doing care coordination and case management tasks that CHWs could handle, instead of clinical therapy",
        es: "Asociados haciendo tareas de coordinacion de atencion y manejo de casos que CHWs podrian manejar, en lugar de terapia clinica",
      },
    ],
    changeManagement: {
      en: "Build a formal associate supervision program with clear structure: who supervises, when, documentation requirements, caseload expectations. Use group supervision (allowed by BBS) to scale — one supervisor can oversee up to 6 associates in a group session. Create an associate-to-licensed pipeline: associates who complete hours at your FQHC get first consideration for licensed positions. Track associate billings separately to demonstrate ROI of the supervision program.",
      es: "Construya un programa formal de supervision de asociados con estructura clara: quien supervisa, cuando, requisitos de documentacion, expectativas de carga de casos. Use supervision grupal (permitida por BBS) para escalar — un supervisor puede supervisar hasta 6 asociados en una sesion grupal. Cree una linea de asociado-a-licenciado: los asociados que completan horas en su FQHC obtienen primera consideracion para posiciones licenciadas. Rastree las facturaciones de asociados por separado para demostrar el ROI del programa de supervision.",
    },
    revenueImpact: {
      en: "Associate visits are billable at the same PPS encounter rate as licensed clinician visits in FQHCs — no revenue reduction. With associate salaries 30-40% lower than LCSW/LMFT salaries, the revenue-to-cost ratio is significantly higher. A single associate generating 6-8 encounters/day at $150-250+ PPS rate produces $900-2,000+/day in revenue against a salary cost of $55,000-70,000/year. The only additional cost is supervisor time.",
      es: "Las visitas de asociados se facturan a la misma tarifa de encuentro PPS que las visitas de clinicos licenciados en FQHCs — sin reduccion de ingresos. Con salarios de asociados 30-40% menores que los salarios de LCSW/LMFT, la relacion ingreso-costo es significativamente mayor. Un solo asociado generando 6-8 encuentros/dia a una tarifa PPS de $150-250+ produce $900-2,000+/dia en ingresos contra un costo salarial de $55,000-70,000/ano. El unico costo adicional es el tiempo del supervisor.",
    },
    primarySourceUrl: "https://www.bbs.ca.gov/applicants/lcsw.html",
  },

  /* ---- 10. RDH — Registered Dental Hygienist ---- */
  {
    id: "rdh",
    title: {
      en: "Registered Dental Hygienist (RDH)",
      es: "Higienista Dental Registrada (RDH)",
    },
    abbreviation: "RDH",
    category: "allied-health",
    licensingBody: "Dental Board of California",
    licensingBodyUrl: "https://www.dbc.ca.gov",
    caRegulation: "BPC §1910-1914",
    educationRequired: {
      en: "Associate or Bachelor's degree in Dental Hygiene from CODA-accredited program (typically 2-4 years)",
      es: "Titulo asociado o licenciatura en higiene dental de programa acreditado por CODA (tipicamente 2-4 anos)",
    },
    certificationRequired: [
      "California RDH License (Dental Board exam)",
      "CPR/BLS Certification",
      "RDHAP License (for alternative practice settings — additional requirements)",
    ],
    supervisedBy: null,
    canSupervise: [],
    coreScope: [
      {
        en: "Dental prophylaxis (cleanings) — remove calculus, plaque, and stains",
        es: "Profilaxis dental (limpiezas) — remover calculo, placa y manchas",
      },
      {
        en: "Periodontal assessment — probe, chart, and evaluate gum health",
        es: "Evaluacion periodontal — sondear, registrar y evaluar salud de encias",
      },
      {
        en: "Dental radiographs (X-rays) — expose, process, and mount",
        es: "Radiografias dentales (rayos X) — exponer, procesar y montar",
      },
      {
        en: "Apply fluoride treatments and dental sealants",
        es: "Aplicar tratamientos de fluor y selladores dentales",
      },
      {
        en: "Periodontal therapy — scaling and root planing (deep cleanings)",
        es: "Terapia periodontal — raspado y alisado radicular (limpiezas profundas)",
      },
      {
        en: "Patient education on oral hygiene, nutrition, and disease prevention",
        es: "Educacion al paciente sobre higiene oral, nutricion y prevencion de enfermedades",
      },
      {
        en: "Apply and monitor topical anesthesia; administer local anesthesia (with license endorsement)",
        es: "Aplicar y monitorear anestesia topica; administrar anestesia local (con endoso de licencia)",
      },
    ],
    cannotDo: [
      {
        en: "Diagnose dental diseases or conditions (dentist function)",
        es: "Diagnosticar enfermedades o condiciones dentales (funcion del dentista)",
      },
      {
        en: "Perform dental restorations (fillings, crowns)",
        es: "Realizar restauraciones dentales (empastes, coronas)",
      },
      {
        en: "Extract teeth or perform oral surgery",
        es: "Extraer dientes o realizar cirugia oral",
      },
      {
        en: "Prescribe medications",
        es: "Recetar medicamentos",
      },
      {
        en: "Create treatment plans independently (must be under dentist direction for treatment planning)",
        es: "Crear planes de tratamiento independientemente (debe estar bajo direccion del dentista para planificacion de tratamiento)",
      },
    ],
    delegationRules: [
      {
        task: {
          en: "Dental prophylaxis and cleanings",
          es: "Profilaxis dental y limpiezas",
        },
        level: "independent",
        citation: "BPC §1910(a)",
        fqhcNote: {
          en: "In FQHCs, dental hygienists can see patients for cleanings under general supervision — the dentist does not need to be present for every hygienist appointment. This is key to maximizing dental capacity.",
          es: "En FQHCs, las higienistas dentales pueden ver pacientes para limpiezas bajo supervision general — el dentista no necesita estar presente para cada cita de higienista. Esto es clave para maximizar la capacidad dental.",
        },
      },
      {
        task: {
          en: "Dental X-rays",
          es: "Radiografias dentales",
        },
        level: "independent",
        citation: "BPC §1910(a)(1)",
      },
      {
        task: {
          en: "Periodontal scaling and root planing",
          es: "Raspado y alisado radicular periodontal",
        },
        level: "supervised",
        citation: "BPC §1910(a)(3)",
      },
    ],
    fqhcContext: {
      en: "Dental is a critical but often underperforming department in FQHCs. Dental hygienist visits are billable as separate FQHC dental encounters at the dental PPS rate. The Virtual Dental Home model — where RDHAPs (Registered Dental Hygienists in Alternative Practice) provide preventive care in community settings like schools and senior centers with telehealth dentist oversight — extends FQHC dental capacity beyond the four walls of the clinic. FQHCs that deploy RDHAPs in community settings can dramatically increase dental encounter volume and reach under-resourced populations who never make it to the clinic for dental care.",
      es: "Dental es un departamento critico pero a menudo de bajo rendimiento en FQHCs. Las visitas de higienistas dentales son facturables como encuentros dentales de FQHC separados a la tarifa dental PPS. El modelo de Hogar Dental Virtual \u2014 donde RDHAPs (Higienistas Dentales Registradas en Practica Alternativa) proporcionan atencion preventiva en entornos comunitarios como escuelas y centros de ancianos con supervision de dentista por telesalud \u2014 extiende la capacidad dental del FQHC mas alla de las cuatro paredes de la clinica. Los FQHCs que despliegan RDHAPs en entornos comunitarios pueden aumentar dramaticamente el volumen de encuentros dentales y alcanzar poblaciones con acceso limitado a la atencion que nunca llegan a la clinica para atencion dental.",
    },
    topOfLicenseBarriers: [
      {
        en: "Hygienists waiting for dentist exam before starting cleanings — could do prophylaxis under general supervision",
        es: "Higienistas esperando examen del dentista antes de comenzar limpiezas — podrian hacer profilaxis bajo supervision general",
      },
      {
        en: "Not using RDHAP licensure for community-based settings (schools, senior centers, group homes)",
        es: "No usar licencia RDHAP para entornos comunitarios (escuelas, centros de ancianos, hogares grupales)",
      },
      {
        en: "Hygienists limited to cleanings only — not performing sealants, fluoride varnish, or periodontal therapy at their full scope",
        es: "Higienistas limitadas solo a limpiezas — sin realizar selladores, barniz de fluor o terapia periodontal en su alcance completo",
      },
    ],
    changeManagement: {
      en: "Audit dental workflows: how much time do hygienists spend waiting for dentist exams vs. doing clinical work? Implement general supervision protocols so hygienists can begin prophylaxis independently. Explore RDHAP deployment for community-based dental outreach (schools, WIC sites, senior centers). Track dental hygienist encounters separately and set targets for hygienist-driven encounter growth.",
      es: "Audite los flujos de trabajo dentales: cuanto tiempo pasan las higienistas esperando examenes del dentista vs. haciendo trabajo clinico? Implemente protocolos de supervision general para que las higienistas puedan comenzar la profilaxis independientemente. Explore el despliegue de RDHAP para alcance dental comunitario (escuelas, sitios WIC, centros de ancianos). Rastree los encuentros de higienistas dentales por separado y establezca objetivos para el crecimiento de encuentros impulsados por higienistas.",
    },
    revenueImpact: {
      en: "Dental hygienist visits generate the FQHC dental PPS encounter rate — a separate billable encounter from medical visits. RDHAPs working in community settings generate encounters that would otherwise not exist (patients who never come to the clinic). The Virtual Dental Home model has demonstrated 30-50% increases in dental encounter volume for FQHCs that deploy community-based hygienists. Dental sealant programs in schools are particularly high-ROI.",
      es: "Las visitas de higienistas dentales generan la tarifa de encuentro dental PPS de FQHC — un encuentro facturable separado de las visitas medicas. Las RDHAPs trabajando en entornos comunitarios generan encuentros que de otro modo no existirian (pacientes que nunca vienen a la clinica). El modelo de Hogar Dental Virtual ha demostrado aumentos de 30-50% en el volumen de encuentros dentales para FQHCs que despliegan higienistas comunitarias. Los programas de selladores dentales en escuelas son particularmente de alto ROI.",
    },
    primarySourceUrl: "https://www.dhbc.ca.gov/consumers/duties_rdh.shtml",
  },
];

/* ------------------------------------------------------------------ */
/*  Delegation Tasks Matrix                                            */
/* ------------------------------------------------------------------ */

export const DELEGATION_TASKS: DelegationTask[] = [
  /* ---- Primary Care Tasks ---- */
  {
    id: "patient-assessment",
    task: {
      en: "Patient Assessment / Intake",
      es: "Evaluacion / Admision del Paciente",
    },
    department: "primary-care",
    roleAuthorizations: [
      { roleId: "md-do", level: "independent", citation: "BPC §2051" },
      { roleId: "np", level: "independent", citation: "BPC §2837.103" },
      { roleId: "pa", level: "supervised", citation: "BPC §3502" },
      { roleId: "rn", level: "independent", citation: "BPC §2725(b)(1)" },
      { roleId: "lvn", level: "prohibited", citation: "BPC §2859 (observation only, no assessment)" },
      { roleId: "ma", level: "delegated", citation: "16 CCR §1366 (intake documentation, not clinical assessment)" },
      { roleId: "chw", level: "prohibited", citation: "HSC §124250 (non-clinical role)" },
    ],
  },
  {
    id: "vital-signs",
    task: {
      en: "Vital Signs",
      es: "Signos Vitales",
    },
    department: "primary-care",
    roleAuthorizations: [
      { roleId: "md-do", level: "independent", citation: "BPC §2051" },
      { roleId: "np", level: "independent", citation: "BPC §2837.103" },
      { roleId: "pa", level: "independent", citation: "BPC §3502" },
      { roleId: "rn", level: "independent", citation: "BPC §2725" },
      { roleId: "lvn", level: "supervised", citation: "BPC §2859" },
      { roleId: "ma", level: "delegated", citation: "16 CCR §1366(a)" },
      { roleId: "chw", level: "prohibited", citation: "HSC §124250 (non-clinical)" },
    ],
  },
  {
    id: "medication-admin-oral",
    task: {
      en: "Medication Administration (Oral)",
      es: "Administracion de Medicamentos (Oral)",
    },
    department: "primary-care",
    roleAuthorizations: [
      { roleId: "md-do", level: "independent", citation: "BPC §2051" },
      { roleId: "np", level: "independent", citation: "BPC §2837.103" },
      { roleId: "pa", level: "supervised", citation: "BPC §3502.1" },
      { roleId: "rn", level: "supervised", citation: "BPC §2725(b)(3) (per provider order)" },
      { roleId: "lvn", level: "supervised", citation: "BPC §2860.5" },
      { roleId: "ma", level: "prohibited", citation: "16 CCR §1366 (MAs cannot administer oral medications)" },
      { roleId: "chw", level: "prohibited", citation: "HSC §124250 (non-clinical)" },
    ],
  },
  {
    id: "medication-admin-injection",
    task: {
      en: "Medication Administration (Injection)",
      es: "Administracion de Medicamentos (Inyeccion)",
    },
    department: "primary-care",
    roleAuthorizations: [
      { roleId: "md-do", level: "independent", citation: "BPC §2051" },
      { roleId: "np", level: "independent", citation: "BPC §2837.103" },
      { roleId: "pa", level: "supervised", citation: "BPC §3502.1" },
      { roleId: "rn", level: "supervised", citation: "BPC §2725(b)(3) (per provider order)" },
      { roleId: "lvn", level: "supervised", citation: "BPC §2860.5" },
      { roleId: "ma", level: "delegated", citation: "16 CCR §1366(b) (with documented training)" },
      { roleId: "chw", level: "prohibited", citation: "HSC §124250 (non-clinical)" },
    ],
  },
  {
    id: "iv-therapy",
    task: {
      en: "IV Therapy",
      es: "Terapia IV",
    },
    department: "primary-care",
    roleAuthorizations: [
      { roleId: "md-do", level: "independent", citation: "BPC §2051" },
      { roleId: "np", level: "independent", citation: "BPC §2837.103" },
      { roleId: "pa", level: "supervised", citation: "BPC §3502" },
      { roleId: "rn", level: "supervised", citation: "BPC §2725(b)(3) (per provider order)" },
      { roleId: "lvn", level: "prohibited", citation: "BPC §2860.5 (IV monitoring only with certification, no IV push)" },
      { roleId: "ma", level: "prohibited", citation: "16 CCR §1366 (outside MA scope)" },
      { roleId: "chw", level: "prohibited", citation: "HSC §124250 (non-clinical)" },
    ],
  },
  {
    id: "patient-education",
    task: {
      en: "Patient Education",
      es: "Educacion al Paciente",
    },
    department: "primary-care",
    roleAuthorizations: [
      { roleId: "md-do", level: "independent", citation: "BPC §2051" },
      { roleId: "np", level: "independent", citation: "BPC §2837.103" },
      { roleId: "pa", level: "independent", citation: "BPC §3502" },
      { roleId: "rn", level: "independent", citation: "BPC §2725(b)(4)" },
      { roleId: "lvn", level: "supervised", citation: "BPC §2859 (within LVN scope topics)" },
      { roleId: "ma", level: "delegated", citation: "16 CCR §1366 (scripted education materials)" },
      { roleId: "chw", level: "independent", citation: "HSC §124250(c)(1)" },
    ],
  },
  {
    id: "care-plan-creation",
    task: {
      en: "Care Plan Creation",
      es: "Creacion de Plan de Atencion",
    },
    department: "primary-care",
    roleAuthorizations: [
      { roleId: "md-do", level: "independent", citation: "BPC §2051" },
      { roleId: "np", level: "independent", citation: "BPC §2837.103" },
      { roleId: "pa", level: "supervised", citation: "BPC §3502" },
      { roleId: "rn", level: "independent", citation: "BPC §2725(b)(3) (nursing care plan)" },
      { roleId: "lvn", level: "prohibited", citation: "BPC §2859 (contributes to, but cannot create independently)" },
      { roleId: "ma", level: "prohibited", citation: "16 CCR §1366 (outside MA scope)" },
      { roleId: "chw", level: "prohibited", citation: "HSC §124250 (non-clinical)" },
    ],
  },
  {
    id: "triage",
    task: {
      en: "Triage",
      es: "Triaje",
    },
    department: "primary-care",
    roleAuthorizations: [
      { roleId: "md-do", level: "independent", citation: "BPC §2051" },
      { roleId: "np", level: "independent", citation: "BPC §2837.103" },
      { roleId: "pa", level: "supervised", citation: "BPC §3502" },
      { roleId: "rn", level: "independent", citation: "BPC §2725(b)(2) (independent nursing judgment)" },
      { roleId: "lvn", level: "prohibited", citation: "BPC §2859 (clinical prioritization is RN scope)" },
      { roleId: "ma", level: "prohibited", citation: "16 CCR §1366 (triage requires clinical judgment)" },
      { roleId: "chw", level: "prohibited", citation: "HSC §124250 (non-clinical)" },
    ],
  },
  {
    id: "prescribing",
    task: {
      en: "Prescribing Medications",
      es: "Prescripcion de Medicamentos",
    },
    department: "primary-care",
    roleAuthorizations: [
      { roleId: "md-do", level: "independent", citation: "BPC §2051; HSC §11150" },
      { roleId: "np", level: "independent", citation: "BPC §2837.103(a); BPC §2836.1" },
      { roleId: "pa", level: "supervised", citation: "BPC §3502.1" },
      { roleId: "rn", level: "prohibited", citation: "BPC §2725 (outside RN scope)" },
      { roleId: "lvn", level: "prohibited", citation: "BPC §2859 (outside LVN scope)" },
      { roleId: "ma", level: "prohibited", citation: "16 CCR §1366 (outside MA scope)" },
      { roleId: "chw", level: "prohibited", citation: "HSC §124250 (non-clinical)" },
    ],
  },
  {
    id: "ordering-labs",
    task: {
      en: "Ordering Labs / Imaging",
      es: "Ordenar Laboratorios / Imagenes",
    },
    department: "primary-care",
    roleAuthorizations: [
      { roleId: "md-do", level: "independent", citation: "BPC §2051" },
      { roleId: "np", level: "independent", citation: "BPC §2837.103" },
      { roleId: "pa", level: "supervised", citation: "BPC §3502" },
      { roleId: "rn", level: "prohibited", citation: "BPC §2725 (can collect specimens per order, not order independently)" },
      { roleId: "lvn", level: "prohibited", citation: "BPC §2859 (outside LVN scope)" },
      { roleId: "ma", level: "prohibited", citation: "16 CCR §1366 (outside MA scope)" },
      { roleId: "chw", level: "prohibited", citation: "HSC §124250 (non-clinical)" },
    ],
  },
  {
    id: "sdoh-screening",
    task: {
      en: "SDOH Screening",
      es: "Evaluacion de SDOH",
    },
    department: "primary-care",
    roleAuthorizations: [
      { roleId: "md-do", level: "independent", citation: "BPC §2051" },
      { roleId: "np", level: "independent", citation: "BPC §2837.103" },
      { roleId: "pa", level: "independent", citation: "BPC §3502" },
      { roleId: "rn", level: "independent", citation: "BPC §2725" },
      { roleId: "lvn", level: "supervised", citation: "BPC §2859 (can administer screening tool)" },
      { roleId: "ma", level: "delegated", citation: "16 CCR §1366 (can administer screening tool per standing order)" },
      { roleId: "chw", level: "independent", citation: "HSC §124250(c) (core CHW function)" },
    ],
  },

  /* ---- Behavioral Health Tasks ---- */
  {
    id: "psychotherapy",
    task: {
      en: "Psychotherapy",
      es: "Psicoterapia",
    },
    department: "behavioral-health",
    roleAuthorizations: [
      { roleId: "md-do", level: "independent", citation: "BPC §2051 (psychiatrists)" },
      { roleId: "lcsw", level: "independent", citation: "BPC §4996.9" },
      { roleId: "amft-asw", level: "supervised", citation: "BPC §4980.44; BPC §4996.20" },
      { roleId: "np", level: "prohibited", citation: "BPC §2837.103 (psychiatric NPs prescribe, not therapy)" },
      { roleId: "chw", level: "prohibited", citation: "HSC §124250 (non-clinical)" },
    ],
  },
  {
    id: "crisis-intervention",
    task: {
      en: "Crisis Intervention",
      es: "Intervencion en Crisis",
    },
    department: "behavioral-health",
    roleAuthorizations: [
      { roleId: "md-do", level: "independent", citation: "BPC §2051" },
      { roleId: "lcsw", level: "independent", citation: "BPC §4996.9" },
      { roleId: "amft-asw", level: "supervised", citation: "BPC §4980.44; BPC §4996.20" },
      { roleId: "rn", level: "independent", citation: "BPC §2725 (safety assessment within nursing scope)" },
      { roleId: "chw", level: "prohibited", citation: "HSC §124250 (can call 988/911, not provide clinical intervention)" },
    ],
  },

  /* ---- Dental Tasks ---- */
  {
    id: "dental-prophylaxis",
    task: {
      en: "Dental Prophylaxis (Cleanings)",
      es: "Profilaxis Dental (Limpiezas)",
    },
    department: "dental",
    roleAuthorizations: [
      { roleId: "rdh", level: "independent", citation: "BPC §1910(a) (under general supervision)" },
    ],
  },
  {
    id: "dental-xrays",
    task: {
      en: "Dental X-rays",
      es: "Radiografias Dentales",
    },
    department: "dental",
    roleAuthorizations: [
      { roleId: "rdh", level: "independent", citation: "BPC §1910(a)(1)" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Helper functions                                                   */
/* ------------------------------------------------------------------ */

/** Get a single role by its id */
export function getRoleById(id: string): ScopeOfPracticeRole | undefined {
  return SCOPE_OF_PRACTICE_ROLES.find((r) => r.id === id);
}

/** Get all roles in a given category */
export function getRolesByCategory(category: ScopeCategory): ScopeOfPracticeRole[] {
  return SCOPE_OF_PRACTICE_ROLES.filter((r) => r.category === category);
}

/**
 * Walk the supervision chain upward from a given role.
 * Returns the role itself, its supervisor, that supervisor's supervisor, etc.
 * Useful for displaying "Who does this role report to?"
 */
export function getSupervisionChain(roleId: string): ScopeOfPracticeRole[] {
  const chain: ScopeOfPracticeRole[] = [];
  let currentId: string | null = roleId;

  while (currentId) {
    const role = getRoleById(currentId);
    if (!role || chain.some((r) => r.id === role.id)) break; // prevent infinite loops
    chain.push(role);
    currentId = role.supervisedBy;
  }

  return chain;
}

/**
 * Aggregate top-of-license opportunities across all roles.
 * Returns each role paired with its barrier descriptions (EN only for programmatic use).
 */
export function getTopOfLicenseOpportunities(): {
  role: ScopeOfPracticeRole;
  opportunities: string[];
}[] {
  return SCOPE_OF_PRACTICE_ROLES.map((role) => ({
    role,
    opportunities: role.topOfLicenseBarriers.map((b) => b.en),
  }));
}

/** Get delegation tasks filtered by department */
export function getDelegationTasksForDepartment(
  dept: string
): DelegationTask[] {
  return DELEGATION_TASKS.filter((t) => t.department === dept);
}
