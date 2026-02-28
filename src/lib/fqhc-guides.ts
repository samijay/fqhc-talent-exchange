// fqhc-guides.ts
// Operational how-to guides for FQHC workers
// Every guide has primary source URLs — no unsourced claims
// Last updated: 2026-02-25

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type GuideCategory =
  | "clinical-workflows"
  | "revenue-billing"
  | "programs-compliance";

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface GuideSection {
  heading: { en: string; es: string };
  keyPoints: { en: string; es: string }[];
  detail?: { en: string; es: string };
}

export interface FQHCGuide {
  id: string;
  title: { en: string; es: string };
  summary: { en: string; es: string };
  category: GuideCategory;
  difficulty: DifficultyLevel;
  readTime: string;
  sections: GuideSection[];
  primarySourceUrl: string;
  primarySourceOrg: string;
  additionalSources: { label: string; url: string }[];
  targetRoles: string[];
  tags: string[];
  lastUpdated: string;
}

/* ------------------------------------------------------------------ */
/*  Categories                                                         */
/* ------------------------------------------------------------------ */

export const GUIDE_CATEGORIES: {
  id: GuideCategory;
  en: string;
  es: string;
  icon: string;
  description: { en: string; es: string };
}[] = [
  {
    id: "clinical-workflows",
    en: "Clinical Workflows",
    es: "Flujos de Trabajo Clínico",
    icon: "Stethoscope",
    description: {
      en: "How clinical programs and care delivery actually work day-to-day",
      es: "Cómo funcionan los programas clínicos y la atención diariamente",
    },
  },
  {
    id: "revenue-billing",
    en: "Revenue & Billing",
    es: "Ingresos y Facturación",
    icon: "Receipt",
    description: {
      en: "How your health center gets paid and why it matters for your role",
      es: "Cómo tu centro de salud recibe pagos y por qué importa para tu rol",
    },
  },
  {
    id: "programs-compliance",
    en: "Programs & Compliance",
    es: "Programas y Cumplimiento",
    icon: "ShieldCheck",
    description: {
      en: "Understanding the programs that fund your position and keep your center compliant",
      es: "Entender los programas que financian tu puesto y mantienen a tu centro en cumplimiento",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Difficulty labels & styles                                         */
/* ------------------------------------------------------------------ */

export const DIFFICULTY_LABELS: Record<
  DifficultyLevel,
  { en: string; es: string }
> = {
  beginner: { en: "Beginner", es: "Principiante" },
  intermediate: { en: "Intermediate", es: "Intermedio" },
  advanced: { en: "Advanced", es: "Avanzado" },
};

export const DIFFICULTY_STYLES: Record<DifficultyLevel, string> = {
  beginner: "bg-green-100 text-green-700 border-green-200",
  intermediate: "bg-amber-100 text-amber-700 border-amber-200",
  advanced: "bg-red-100 text-red-700 border-red-200",
};

/* ------------------------------------------------------------------ */
/*  Role options (for filter dropdown)                                 */
/* ------------------------------------------------------------------ */

export const GUIDE_ROLE_OPTIONS: {
  id: string;
  en: string;
  es: string;
}[] = [
  { id: "all", en: "All Roles", es: "Todos los Roles" },
  {
    id: "chw",
    en: "Community Health Worker",
    es: "Promotor(a) de Salud",
  },
  {
    id: "care-coordinator",
    en: "Care Coordinator",
    es: "Coordinador(a) de Cuidado",
  },
  {
    id: "medical-assistant",
    en: "Medical Assistant",
    es: "Asistente Médico",
  },
  { id: "rn", en: "Registered Nurse", es: "Enfermero(a) Registrado(a)" },
  {
    id: "behavioral-health",
    en: "BH Specialist",
    es: "Especialista en Salud Conductual",
  },
  { id: "case-manager", en: "Case Manager", es: "Gerente de Casos" },
  {
    id: "patient-services",
    en: "Patient Services",
    es: "Servicios al Paciente",
  },
  { id: "revenue-cycle", en: "Revenue Cycle", es: "Ciclo de Ingresos" },
  {
    id: "social-worker",
    en: "Social Worker",
    es: "Trabajador(a) Social",
  },
];

/* ------------------------------------------------------------------ */
/*  Guides                                                             */
/* ------------------------------------------------------------------ */

export const FQHC_GUIDES: FQHCGuide[] = [
  /* ============================================================== */
  /*  CLINICAL WORKFLOWS                                             */
  /* ============================================================== */
  {
    id: "ecm-how-it-works",
    title: {
      en: "How ECM Works at an FQHC",
      es: "Cómo Funciona ECM en un FQHC",
    },
    summary: {
      en: "Enhanced Care Management is a permanent Medi-Cal benefit under CalAIM — not a grant. Learn the daily workflow, documentation requirements, and how ECM funding actually works.",
      es: "La Gestión de Cuidado Mejorado es un beneficio permanente de Medi-Cal bajo CalAIM — no una subvención. Aprende el flujo de trabajo diario, requisitos de documentación y cómo funciona el financiamiento de ECM.",
    },
    category: "clinical-workflows",
    difficulty: "beginner",
    readTime: "10 min",
    sections: [
      {
        heading: {
          en: "What ECM Actually Is (and Isn't)",
          es: "Qué Es Realmente ECM (y Qué No Es)",
        },
        keyPoints: [
          {
            en: "ECM is a permanent Medi-Cal benefit under CalAIM, launched January 2022 — it replaced the old Whole Person Care pilots and Health Homes Program",
            es: "ECM es un beneficio permanente de Medi-Cal bajo CalAIM, lanzado en enero de 2022 — reemplazó los antiguos pilotos de Whole Person Care y el programa Health Homes",
          },
          {
            en: "Managed care plans contract with FQHCs and other providers to deliver ECM services to their highest-need members",
            es: "Los planes de salud administrados contratan a FQHCs y otros proveedores para entregar servicios ECM a sus miembros de mayor necesidad",
          },
          {
            en: "ECM is NOT a temporary pilot or grant — it is a statewide Medi-Cal benefit authorized under the CalAIM Section 1115 waiver",
            es: "ECM NO es un piloto temporal ni una subvención — es un beneficio estatal de Medi-Cal autorizado bajo la exención CalAIM Sección 1115",
          },
          {
            en: "Your FQHC bills the managed care plan, not Medi-Cal directly — the plan assigns members to your health center",
            es: "Tu FQHC factura al plan de salud administrado, no directamente a Medi-Cal — el plan asigna miembros a tu centro de salud",
          },
        ],
      },
      {
        heading: {
          en: "The 7 Populations of Focus",
          es: "Las 7 Poblaciones de Enfoque",
        },
        keyPoints: [
          {
            en: "1. Individuals and families experiencing homelessness",
            es: "1. Individuos y familias en situación de calle",
          },
          {
            en: "2. High utilizers of emergency departments and hospitals",
            es: "2. Usuarios frecuentes de emergencias y hospitales",
          },
          {
            en: "3. Individuals with serious mental illness (SMI) or serious emotional disturbance (SED)",
            es: "3. Individuos con enfermedad mental grave (SMI) o trastorno emocional serio (SED)",
          },
          {
            en: "4. Individuals with substance use disorder (SUD)",
            es: "4. Individuos con trastorno por uso de sustancias (SUD)",
          },
          {
            en: "5. Children and youth with complex needs (including foster care)",
            es: "5. Niños y jóvenes con necesidades complejas (incluyendo cuidado de crianza)",
          },
          {
            en: "6. Individuals at risk for institutionalization (nursing facility level of care)",
            es: "6. Individuos en riesgo de institucionalización (nivel de cuidado de hogar de ancianos)",
          },
          {
            en: "7. Individuals transitioning from incarceration (new population added 2025)",
            es: "7. Individuos en transición desde encarcelamiento (nueva población agregada 2025)",
          },
        ],
        detail: {
          en: "Each population has specific eligibility criteria defined by DHCS. Your managed care plan determines which members qualify and assigns them to your FQHC. Some members may qualify under multiple populations.",
          es: "Cada población tiene criterios de elegibilidad específicos definidos por DHCS. Tu plan de salud administrado determina qué miembros califican y los asigna a tu FQHC. Algunos miembros pueden calificar bajo múltiples poblaciones.",
        },
      },
      {
        heading: {
          en: "Your Daily ECM Workflow",
          es: "Tu Flujo de Trabajo Diario de ECM",
        },
        keyPoints: [
          {
            en: "Receive member assignments from managed care plan → initial outreach within 15 calendar days (3 attempts required)",
            es: "Recibir asignaciones de miembros del plan de salud → contacto inicial dentro de 15 días calendario (3 intentos requeridos)",
          },
          {
            en: "Complete a Comprehensive Assessment covering physical health, behavioral health, social needs, housing, and strengths",
            es: "Completar una Evaluación Integral que cubra salud física, salud conductual, necesidades sociales, vivienda y fortalezas",
          },
          {
            en: "Develop an Individualized Care Plan (ICP) with SMART goals — member must participate in creating the plan",
            es: "Desarrollar un Plan de Cuidado Individualizado (ICP) con metas SMART — el miembro debe participar en la creación del plan",
          },
          {
            en: "Ongoing care coordination: minimum one meaningful contact per month (face-to-face, phone, or field-based)",
            es: "Coordinación de cuidado continua: mínimo un contacto significativo por mes (presencial, telefónico o en campo)",
          },
          {
            en: "Quarterly care plan reviews — update goals, document progress, adjust services as needed",
            es: "Revisiones trimestrales del plan de cuidado — actualizar metas, documentar progreso, ajustar servicios según sea necesario",
          },
          {
            en: "Transition/graduation: when member meets goals and is stable, document transition plan and transfer back to standard care",
            es: "Transición/graduación: cuando el miembro cumple metas y está estable, documentar plan de transición y transferir de vuelta a cuidado estándar",
          },
        ],
      },
      {
        heading: {
          en: "Documentation That Gets Audited",
          es: "Documentación Que Se Audita",
        },
        keyPoints: [
          {
            en: "Date, time, and mode (in-person, phone, text) of every member contact — managed care plans audit contact frequency",
            es: "Fecha, hora y modo (presencial, teléfono, texto) de cada contacto con el miembro — los planes de salud auditan la frecuencia de contacto",
          },
          {
            en: "SMART goals in the care plan: Specific, Measurable, Achievable, Relevant, Time-bound (not vague goals like 'improve health')",
            es: "Metas SMART en el plan de cuidado: Específicas, Medibles, Alcanzables, Relevantes, con Tiempo definido (no metas vagas como 'mejorar la salud')",
          },
          {
            en: "Evidence of care coordination: referral letters, warm handoff notes, follow-up on specialist appointments",
            es: "Evidencia de coordinación de cuidado: cartas de referencia, notas de transferencias directas, seguimiento de citas con especialistas",
          },
          {
            en: "Member signatures on care plans when possible (shows engagement and consent)",
            es: "Firmas del miembro en planes de cuidado cuando sea posible (muestra participación y consentimiento)",
          },
          {
            en: "Common audit failures: vague goals, no follow-up on referrals, gaps in monthly contact frequency, copy-pasted notes",
            es: "Fallas comunes en auditorías: metas vagas, sin seguimiento de referencias, brechas en frecuencia de contacto mensual, notas copiadas y pegadas",
          },
        ],
      },
      {
        heading: {
          en: "Quality Metrics That Matter",
          es: "Métricas de Calidad Que Importan",
        },
        keyPoints: [
          {
            en: "Engagement rate: % of assigned members who complete the Comprehensive Assessment (target: 80%+)",
            es: "Tasa de participación: % de miembros asignados que completan la Evaluación Integral (meta: 80%+)",
          },
          {
            en: "Care plan completion: % of engaged members with an active Individualized Care Plan",
            es: "Completación de plan de cuidado: % de miembros participantes con un Plan de Cuidado Individualizado activo",
          },
          {
            en: "ED utilization reduction: FQHCs are measured on whether ECM members reduce emergency department visits",
            es: "Reducción de uso de emergencias: los FQHCs se miden según si los miembros de ECM reducen visitas a emergencias",
          },
          {
            en: "Primary care adherence: are ECM members attending regular primary care visits?",
            es: "Adherencia a atención primaria: ¿están los miembros de ECM asistiendo a visitas regulares de atención primaria?",
          },
          {
            en: "Your documentation directly affects these metrics — incomplete notes mean lost credit for work you actually did",
            es: "Tu documentación afecta directamente estas métricas — notas incompletas significan crédito perdido por trabajo que realmente hiciste",
          },
        ],
      },
      {
        heading: {
          en: "How ECM Gets Funded",
          es: "Cómo Se Financia ECM",
        },
        keyPoints: [
          {
            en: "Managed care plans pay FQHCs a Per-Member-Per-Month (PMPM) rate for each ECM member on your panel",
            es: "Los planes de salud pagan a los FQHCs una tarifa Por-Miembro-Por-Mes (PMPM) por cada miembro ECM en tu panel",
          },
          {
            en: "Typical PMPM rates range from $150-$400+ depending on population of focus and plan contract",
            es: "Las tarifas PMPM típicas van de $150-$400+ dependiendo de la población de enfoque y el contrato del plan",
          },
          {
            en: "Panel size × engagement rate × PMPM = your program's ECM revenue (this is why engagement matters financially)",
            es: "Tamaño de panel × tasa de participación × PMPM = ingresos ECM de tu programa (por eso la participación importa financieramente)",
          },
          {
            en: "ECM positions are revenue-funded (managed care contracts), not grant-funded — more stable than many grants, but tied to performance",
            es: "Los puestos ECM son financiados por ingresos (contratos de planes de salud), no por subvenciones — más estables que muchas subvenciones, pero ligados al rendimiento",
          },
        ],
      },
    ],
    primarySourceUrl:
      "https://www.dhcs.ca.gov/CalAIM/ECM/Pages/Home.aspx",
    primarySourceOrg: "CA DHCS",
    additionalSources: [
      {
        label: "DHCS ECM Policy Guide",
        url: "https://www.dhcs.ca.gov/CalAIM/Documents/CalAIM-ECM-a11y.pdf",
      },
      {
        label: "CHCF CalAIM Overview",
        url: "https://www.chcf.org/collection/calaim/",
      },
      {
        label: "CMS CalAIM 1115 Waiver",
        url: "https://www.medicaid.gov/medicaid/section-1115-demonstrations/demonstration-and-waiver-list/82966",
      },
    ],
    targetRoles: [
      "chw",
      "care-coordinator",
      "case-manager",
      "behavioral-health",
    ],
    tags: ["ecm", "calaim", "care-management", "medi-cal"],
    lastUpdated: "2026-02-25",
  },

  {
    id: "rn-co-visit",
    title: {
      en: "RN Co-Visit: How Team-Based Care Billing Works",
      es: "Co-Visita de RN: Cómo Funciona la Facturación de Cuidado en Equipo",
    },
    summary: {
      en: "When a patient sees two billable providers on the same day, your FQHC can bill two separate PPS encounters. Learn who can bill, what to document, and what NOT to do.",
      es: "Cuando un paciente ve a dos proveedores facturables el mismo día, tu FQHC puede facturar dos encuentros PPS separados. Aprende quién puede facturar, qué documentar y qué NO hacer.",
    },
    category: "clinical-workflows",
    difficulty: "intermediate",
    readTime: "7 min",
    sections: [
      {
        heading: {
          en: "What a Co-Visit Is",
          es: "Qué Es una Co-Visita",
        },
        keyPoints: [
          {
            en: "A same-day visit where a patient sees both a medical provider (MD/DO/NP/PA) AND another billable provider (RN, LCSW, psychologist) during a single trip to the clinic",
            es: "Una visita el mismo día donde un paciente ve tanto a un proveedor médico (MD/DO/NP/PA) COMO a otro proveedor facturable (RN, LCSW, psicólogo) durante una sola visita a la clínica",
          },
          {
            en: "Each provider must deliver a distinct, medically necessary service — this is NOT one provider assisting the other",
            es: "Cada proveedor debe entregar un servicio distinto y médicamente necesario — esto NO es un proveedor asistiendo al otro",
          },
          {
            en: "Both providers must have separate face-to-face clinical time with the patient",
            es: "Ambos proveedores deben tener tiempo clínico cara a cara separado con el paciente",
          },
          {
            en: "The key word is 'distinct' — the RN visit must address a different clinical need than the MD visit",
            es: "La palabra clave es 'distinto' — la visita del RN debe abordar una necesidad clínica diferente a la visita del MD",
          },
        ],
      },
      {
        heading: {
          en: "Why Co-Visits Matter for Revenue",
          es: "Por Qué las Co-Visitas Importan para los Ingresos",
        },
        keyPoints: [
          {
            en: "Under FQHC PPS, each qualifying face-to-face encounter with a billable provider generates a separate PPS payment",
            es: "Bajo el PPS de FQHC, cada encuentro cara a cara calificado con un proveedor facturable genera un pago PPS separado",
          },
          {
            en: "A patient who sees an MD AND an RN (for a distinct service) on the same day = two PPS encounters billed",
            es: "Un paciente que ve a un MD Y a un RN (por un servicio distinto) el mismo día = dos encuentros PPS facturados",
          },
          {
            en: "Typical CA FQHC PPS rate: ~$230-$260 per encounter (Medicare), ~$150-$350 per encounter (Medi-Cal, varies by FQHC)",
            es: "Tarifa PPS típica de FQHC en CA: ~$230-$260 por encuentro (Medicare), ~$150-$350 por encuentro (Medi-Cal, varía por FQHC)",
          },
          {
            en: "This can effectively double the revenue from a single patient visit — one of the most impactful revenue strategies for FQHCs",
            es: "Esto puede efectivamente duplicar los ingresos de una sola visita del paciente — una de las estrategias de ingresos más impactantes para FQHCs",
          },
        ],
      },
      {
        heading: {
          en: "Who Can Bill a Co-Visit",
          es: "Quién Puede Facturar una Co-Visita",
        },
        keyPoints: [
          {
            en: "Billable FQHC providers under Medicare/Medi-Cal: physicians (MD/DO), nurse practitioners (NP), physician assistants (PA), certified nurse midwives (CNM)",
            es: "Proveedores facturables de FQHC bajo Medicare/Medi-Cal: médicos (MD/DO), enfermeros practicantes (NP), asistentes médicos (PA), enfermeras parteras certificadas (CNM)",
          },
          {
            en: "Also billable: clinical psychologists, licensed clinical social workers (LCSW), and visiting registered nurses (for specific services like TCM/CCM)",
            es: "También facturables: psicólogos clínicos, trabajadores sociales clínicos con licencia (LCSW), y enfermeros registrados visitantes (para servicios específicos como TCM/CCM)",
          },
          {
            en: "Medical Assistants (MAs) CANNOT independently bill — MA vitals and prep are already included in the provider's encounter",
            es: "Los Asistentes Médicos (MAs) NO PUEDEN facturar independientemente — los signos vitales y preparación del MA ya están incluidos en el encuentro del proveedor",
          },
          {
            en: "The RN must provide a distinct service — not just vitals, medication refills, or assisting the MD during their exam",
            es: "El RN debe proveer un servicio distinto — no solo signos vitales, resurtidos de medicamentos, o asistir al MD durante su examen",
          },
        ],
      },
      {
        heading: {
          en: "Documentation Requirements",
          es: "Requisitos de Documentación",
        },
        keyPoints: [
          {
            en: "Each provider must write a SEPARATE progress note — you cannot combine both encounters in one note",
            es: "Cada proveedor debe escribir una nota de progreso SEPARADA — no se pueden combinar ambos encuentros en una nota",
          },
          {
            en: "Each note must document: chief complaint or reason for the service, assessment, plan, and medical necessity",
            es: "Cada nota debe documentar: queja principal o razón del servicio, evaluación, plan, y necesidad médica",
          },
          {
            en: "The RN note cannot simply say 'assisted with MD visit' — it must describe the distinct clinical service provided",
            es: "La nota del RN no puede simplemente decir 'asistí con la visita del MD' — debe describir el servicio clínico distinto proporcionado",
          },
          {
            en: "Common billable RN co-visit services: chronic disease management education, medication reconciliation counseling, care coordination for complex patients, transitional care management",
            es: "Servicios comunes de co-visita de RN facturables: educación en manejo de enfermedades crónicas, consejería de reconciliación de medicamentos, coordinación de cuidado para pacientes complejos, manejo de cuidado transicional",
          },
        ],
      },
      {
        heading: {
          en: "Common Co-Visit Scenarios",
          es: "Escenarios Comunes de Co-Visita",
        },
        keyPoints: [
          {
            en: "Scenario A: Diabetes patient sees MD for A1C review, then RN for insulin injection training and foot care education → 2 encounters",
            es: "Escenario A: Paciente diabético ve al MD para revisión de A1C, luego al RN para entrenamiento de inyección de insulina y educación de cuidado de pies → 2 encuentros",
          },
          {
            en: "Scenario B: Patient with depression sees MD for medication management, then LCSW for brief therapy session → 2 encounters",
            es: "Escenario B: Paciente con depresión ve al MD para manejo de medicamentos, luego al LCSW para sesión breve de terapia → 2 encuentros",
          },
          {
            en: "Scenario C: Post-hospital discharge patient sees NP for follow-up, then RN for transitional care management visit → 2 encounters",
            es: "Escenario C: Paciente post-hospitalización ve al NP para seguimiento, luego al RN para visita de manejo de cuidado transicional → 2 encuentros",
          },
          {
            en: "Each of these generates two PPS payments because two billable providers delivered two distinct, documented services",
            es: "Cada uno de estos genera dos pagos PPS porque dos proveedores facturables entregaron dos servicios distintos y documentados",
          },
        ],
      },
      {
        heading: {
          en: "What NOT to Do",
          es: "Qué NO Hacer",
        },
        keyPoints: [
          {
            en: "MA taking vitals before the MD visit does NOT qualify as a co-visit — it's part of the MD encounter",
            es: "MA tomando signos vitales antes de la visita del MD NO califica como co-visita — es parte del encuentro del MD",
          },
          {
            en: "RN calling in a prescription or doing phone triage does NOT qualify — no face-to-face encounter",
            es: "RN llamando para una receta o haciendo triaje telefónico NO califica — sin encuentro cara a cara",
          },
          {
            en: "Two providers in the room at the same time for the same service does NOT qualify — must be distinct services",
            es: "Dos proveedores en la sala al mismo tiempo para el mismo servicio NO califica — deben ser servicios distintos",
          },
          {
            en: "Billing both encounters without proper separate documentation is fraud — compliance matters, and auditors look for this",
            es: "Facturar ambos encuentros sin documentación separada apropiada es fraude — el cumplimiento importa, y los auditores buscan esto",
          },
        ],
      },
    ],
    primarySourceUrl:
      "https://www.cms.gov/medicare/payment/prospective-payment-systems/federally-qualified-health-center",
    primarySourceOrg: "CMS",
    additionalSources: [
      {
        label: "NACHC Billing & Finance Guide",
        url: "https://www.nachc.org/resource/fqhc-billing-and-finance/",
      },
      {
        label: "CA DHCS FQHC PPS Rates",
        url: "https://www.dhcs.ca.gov/services/medi-cal/Pages/FQHCrates.aspx",
      },
    ],
    targetRoles: ["rn", "medical-assistant", "care-coordinator"],
    tags: ["co-visit", "pps", "billing", "team-based-care", "revenue"],
    lastUpdated: "2026-02-25",
  },

  {
    id: "same-day-bh-integration",
    title: {
      en: "Same-Day Behavioral Health Integration",
      es: "Integración de Salud Conductual el Mismo Día",
    },
    summary: {
      en: "When a patient sees a medical provider AND a behavioral health provider on the same day, your FQHC can bill two encounters. This is one of the most under-utilized revenue opportunities in community health.",
      es: "Cuando un paciente ve a un proveedor médico Y a un proveedor de salud conductual el mismo día, tu FQHC puede facturar dos encuentros. Esta es una de las oportunidades de ingresos más subutilizadas en salud comunitaria.",
    },
    category: "clinical-workflows",
    difficulty: "intermediate",
    readTime: "8 min",
    sections: [
      {
        heading: {
          en: "How BH Integration Works at an FQHC",
          es: "Cómo Funciona la Integración de Salud Conductual en un FQHC",
        },
        keyPoints: [
          {
            en: "Warm handoff model: primary care provider identifies BH need during visit, introduces patient to on-site BH provider the same day",
            es: "Modelo de transferencia directa: el proveedor de atención primaria identifica necesidad de salud conductual durante la visita, presenta al paciente al proveedor de salud conductual en el sitio el mismo día",
          },
          {
            en: "Co-located model: BH provider sees patients on a regular schedule in the same building, with shared scheduling and EHR",
            es: "Modelo co-localizado: el proveedor de salud conductual ve pacientes en un horario regular en el mismo edificio, con programación y EHR compartidos",
          },
          {
            en: "Fully integrated model: BH is part of every care team, attends huddles, shares treatment plans, embedded in primary care workflow",
            es: "Modelo completamente integrado: salud conductual es parte de cada equipo de cuidado, asiste a reuniones, comparte planes de tratamiento, integrado en el flujo de trabajo de atención primaria",
          },
          {
            en: "Most CA FQHCs operate somewhere between co-located and fully integrated — the warm handoff is the highest-impact intervention",
            es: "La mayoría de los FQHCs de CA operan entre co-localizado y completamente integrado — la transferencia directa es la intervención de mayor impacto",
          },
        ],
      },
      {
        heading: {
          en: "Billing Same-Day BH + Primary Care",
          es: "Facturación de Salud Conductual + Atención Primaria el Mismo Día",
        },
        keyPoints: [
          {
            en: "CMS allows FQHCs to bill two encounters on the same day if a patient sees a medical provider AND a qualifying BH provider",
            es: "CMS permite que los FQHCs facturen dos encuentros el mismo día si un paciente ve a un proveedor médico Y a un proveedor de salud conductual calificado",
          },
          {
            en: "Qualifying BH providers: clinical psychologists and licensed clinical social workers (LCSWs) — these generate a separate PPS encounter",
            es: "Proveedores de salud conductual calificados: psicólogos clínicos y trabajadores sociales clínicos con licencia (LCSWs) — estos generan un encuentro PPS separado",
          },
          {
            en: "The BH visit must be a distinct service with its own documentation — not a continuation of the medical visit",
            es: "La visita de salud conductual debe ser un servicio distinto con su propia documentación — no una continuación de la visita médica",
          },
          {
            en: "This is one of the most under-utilized revenue opportunities in FQHCs — many centers do informal warm handoffs without billing the BH encounter",
            es: "Esta es una de las oportunidades de ingresos más subutilizadas en FQHCs — muchos centros hacen transferencias directas informales sin facturar el encuentro de salud conductual",
          },
        ],
      },
      {
        heading: {
          en: "Documentation Standards",
          es: "Estándares de Documentación",
        },
        keyPoints: [
          {
            en: "Separate progress note for the BH encounter: presenting problem, mental status assessment, intervention provided, plan for follow-up",
            es: "Nota de progreso separada para el encuentro de salud conductual: problema presentado, evaluación del estado mental, intervención proporcionada, plan de seguimiento",
          },
          {
            en: "PHQ-9 (depression) and GAD-7 (anxiety) screening scores should be documented — these support medical necessity",
            es: "Los puntajes de detección PHQ-9 (depresión) y GAD-7 (ansiedad) deben documentarse — estos apoyan la necesidad médica",
          },
          {
            en: "Time-based documentation when applicable — note the start and end time of the BH encounter",
            es: "Documentación basada en tiempo cuando sea aplicable — anotar la hora de inicio y fin del encuentro de salud conductual",
          },
          {
            en: "The BH note must stand alone — an auditor should be able to understand the clinical encounter from the BH note alone",
            es: "La nota de salud conductual debe ser independiente — un auditor debe poder entender el encuentro clínico solo con la nota de salud conductual",
          },
        ],
      },
      {
        heading: {
          en: "Common Warm Handoff Workflow",
          es: "Flujo de Trabajo Común de Transferencia Directa",
        },
        keyPoints: [
          {
            en: "Step 1: MD screens patient with PHQ-9 during the primary care visit",
            es: "Paso 1: MD evalúa al paciente con PHQ-9 durante la visita de atención primaria",
          },
          {
            en: "Step 2: Score ≥ 10 (moderate depression) — MD introduces the concept of BH support to the patient",
            es: "Paso 2: Puntaje ≥ 10 (depresión moderada) — MD introduce el concepto de apoyo de salud conductual al paciente",
          },
          {
            en: "Step 3: MD walks patient to BH provider (or BH comes to the exam room) — this is the 'warm handoff'",
            es: "Paso 3: MD acompaña al paciente al proveedor de salud conductual (o el proveedor viene a la sala de examen) — esta es la 'transferencia directa'",
          },
          {
            en: "Step 4: BH provider conducts a brief intervention (15-30 minutes) — assessment, initial coping strategies, safety planning if needed",
            es: "Paso 4: El proveedor de salud conductual realiza una intervención breve (15-30 minutos) — evaluación, estrategias iniciales de afrontamiento, plan de seguridad si es necesario",
          },
          {
            en: "Step 5: BH provider documents the separate encounter note and schedules follow-up BH appointment",
            es: "Paso 5: El proveedor de salud conductual documenta la nota de encuentro separada y programa una cita de seguimiento",
          },
        ],
      },
      {
        heading: {
          en: "Your Role in BH Integration",
          es: "Tu Rol en la Integración de Salud Conductual",
        },
        keyPoints: [
          {
            en: "Medical Assistants: administer PHQ-9/GAD-7 screening tools at intake — this is the trigger for warm handoffs",
            es: "Asistentes Médicos: administrar herramientas de detección PHQ-9/GAD-7 en la admisión — esto es el detonante para transferencias directas",
          },
          {
            en: "RNs: coordinate warm handoffs, ensure BH provider availability, track follow-up appointments",
            es: "RNs: coordinar transferencias directas, asegurar disponibilidad del proveedor de salud conductual, rastrear citas de seguimiento",
          },
          {
            en: "Care Coordinators: track BH follow-up and no-shows, ensure patients return for scheduled BH visits",
            es: "Coordinadores de Cuidado: rastrear seguimiento de salud conductual y ausencias, asegurar que los pacientes regresen para visitas programadas",
          },
          {
            en: "BH providers: deliver interventions, document separately, and communicate back to the primary care team",
            es: "Proveedores de salud conductual: entregar intervenciones, documentar por separado, y comunicar de vuelta al equipo de atención primaria",
          },
          {
            en: "Everyone: huddle communication is critical — the morning huddle should identify patients likely to need same-day BH",
            es: "Todos: la comunicación en reunión de equipo es crítica — la reunión matutina debe identificar pacientes que probablemente necesiten salud conductual el mismo día",
          },
        ],
      },
    ],
    primarySourceUrl:
      "https://www.cms.gov/medicare/payment/prospective-payment-systems/federally-qualified-health-center",
    primarySourceOrg: "CMS",
    additionalSources: [
      {
        label: "SAMHSA BH Integration",
        url: "https://www.samhsa.gov/about-us/who-we-are/offices-centers/offices/behavioral-health-equity",
      },
      {
        label: "CHCF BH in FQHCs",
        url: "https://www.chcf.org/publication/behavioral-health-integration-safety-net/",
      },
      {
        label: "NACHC BH Toolkit",
        url: "https://www.nachc.org/focus-areas/clinical-affairs/behavioral-health/",
      },
    ],
    targetRoles: [
      "behavioral-health",
      "rn",
      "care-coordinator",
      "social-worker",
    ],
    tags: [
      "behavioral-health",
      "warm-handoff",
      "co-visit",
      "billing",
      "phq-9",
    ],
    lastUpdated: "2026-02-25",
  },

  /* ============================================================== */
  /*  REVENUE & BILLING                                              */
  /* ============================================================== */
  {
    id: "fqhc-revenue-101",
    title: {
      en: "FQHC Revenue 101: How Your Health Center Gets Paid",
      es: "Ingresos FQHC 101: Cómo Tu Centro de Salud Recibe Pagos",
    },
    summary: {
      en: "Every FQHC runs on two revenue engines: patient encounter payments (PPS) and federal grants. Understanding how the money flows helps you understand your job security and why visit volume matters.",
      es: "Todo FQHC funciona con dos motores de ingresos: pagos por encuentro con pacientes (PPS) y subvenciones federales. Entender cómo fluye el dinero te ayuda a entender tu estabilidad laboral y por qué el volumen de visitas importa.",
    },
    category: "revenue-billing",
    difficulty: "beginner",
    readTime: "12 min",
    sections: [
      {
        heading: {
          en: "The Two Revenue Engines",
          es: "Los Dos Motores de Ingresos",
        },
        keyPoints: [
          {
            en: "Engine 1: Patient encounter revenue — PPS (Prospective Payment System) payments from Medicare, Medi-Cal, and insurers for each qualifying visit",
            es: "Motor 1: Ingresos por encuentro con pacientes — pagos PPS (Sistema de Pago Prospectivo) de Medicare, Medi-Cal y aseguradoras por cada visita calificada",
          },
          {
            en: "Engine 2: Section 330 federal grants from HRSA — base funding that supports the safety-net mission, covering uninsured patients and enabling services",
            es: "Motor 2: Subvenciones federales Sección 330 de HRSA — financiamiento base que apoya la misión de red de seguridad, cubriendo pacientes sin seguro y servicios habilitadores",
          },
          {
            en: "Most FQHCs get 60-80% of their revenue from patient encounters and 10-20% from the 330 grant — the rest comes from other grants and contracts",
            es: "La mayoría de los FQHCs obtienen 60-80% de sus ingresos de encuentros con pacientes y 10-20% de la subvención 330 — el resto viene de otras subvenciones y contratos",
          },
          {
            en: "This dual structure is what makes FQHCs unique — you serve everyone regardless of ability to pay, but you still need encounter revenue to stay open",
            es: "Esta estructura dual es lo que hace únicos a los FQHCs — atiendes a todos sin importar su capacidad de pago, pero aún necesitas ingresos por encuentros para mantenerte abierto",
          },
        ],
      },
      {
        heading: {
          en: "How PPS (Prospective Payment System) Works",
          es: "Cómo Funciona el PPS (Sistema de Pago Prospectivo)",
        },
        keyPoints: [
          {
            en: "PPS is a fixed per-visit rate set by CMS (Medicare) and DHCS (Medi-Cal) — unlike hospitals that bill per-service, FQHCs get one flat payment per qualifying encounter",
            es: "PPS es una tarifa fija por visita establecida por CMS (Medicare) y DHCS (Medi-Cal) — a diferencia de los hospitales que facturan por servicio, los FQHCs reciben un pago fijo por encuentro calificado",
          },
          {
            en: "Typical CA rates: Medicare ~$230-$260 per encounter, Medi-Cal varies by FQHC (each has its own historical PPS rate, typically $150-$350)",
            es: "Tarifas típicas de CA: Medicare ~$230-$260 por encuentro, Medi-Cal varía por FQHC (cada uno tiene su propia tarifa PPS histórica, típicamente $150-$350)",
          },
          {
            en: "The PPS rate covers everything in the visit: provider time, labs drawn on-site, medications dispensed on-site — it's all one payment",
            es: "La tarifa PPS cubre todo en la visita: tiempo del proveedor, laboratorios tomados en sitio, medicamentos dispensados en sitio — es todo un solo pago",
          },
          {
            en: "Each FQHC's Medi-Cal PPS rate is calculated from historical costs — bigger, older FQHCs often have higher rates than newer ones",
            es: "La tarifa PPS de Medi-Cal de cada FQHC se calcula a partir de costos históricos — FQHCs más grandes y antiguos a menudo tienen tarifas más altas que los más nuevos",
          },
        ],
      },
      {
        heading: {
          en: "What Counts as a Billable Visit",
          es: "Qué Cuenta como una Visita Facturable",
        },
        keyPoints: [
          {
            en: "A face-to-face encounter with a billable provider: MD, DO, NP, PA, CNM, clinical psychologist, LCSW, or visiting RN (for specific services)",
            es: "Un encuentro cara a cara con un proveedor facturable: MD, DO, NP, PA, CNM, psicólogo clínico, LCSW, o RN visitante (para servicios específicos)",
          },
          {
            en: "Phone calls, patient portal messages, and MA-only visits do NOT generate PPS revenue",
            es: "Llamadas telefónicas, mensajes del portal del paciente, y visitas solo de MA NO generan ingresos PPS",
          },
          {
            en: "Group education sessions generally do NOT qualify as individual PPS encounters",
            es: "Las sesiones de educación grupal generalmente NO califican como encuentros PPS individuales",
          },
          {
            en: "This is why no-shows directly impact revenue — an empty appointment slot generates zero PPS income",
            es: "Es por eso que las ausencias impactan directamente los ingresos — una cita vacía genera cero ingresos PPS",
          },
          {
            en: "Patient engagement, outreach, and reducing no-shows are revenue activities — not just 'nice to have'",
            es: "La participación del paciente, el alcance comunitario, y reducir ausencias son actividades de ingresos — no solo algo 'deseable'",
          },
        ],
      },
      {
        heading: {
          en: "The Section 330 Grant",
          es: "La Subvención Sección 330",
        },
        keyPoints: [
          {
            en: "Federal grant from HRSA that funds the 'safety net' mission — covers uninsured patients, community outreach, and enabling services (translation, transportation)",
            es: "Subvención federal de HRSA que financia la misión de 'red de seguridad' — cubre pacientes sin seguro, alcance comunitario, y servicios habilitadores (traducción, transporte)",
          },
          {
            en: "Grant cycle: 3-year project periods with annual budget justification (called Non-Competing Continuation or NCC applications)",
            es: "Ciclo de subvención: períodos de proyecto de 3 años con justificación presupuestaria anual (llamados solicitudes de Continuación No Competitiva o NCC)",
          },
          {
            en: "Grant amount is based on patients served, scope of services, and community needs — tracked through UDS (Uniform Data System) annual reporting",
            es: "El monto de la subvención se basa en pacientes atendidos, alcance de servicios, y necesidades comunitarias — rastreado a través de reportes anuales UDS (Sistema Uniforme de Datos)",
          },
          {
            en: "If your position is 'grant-funded,' this means your salary comes directly from the 330 grant budget line item",
            es: "Si tu puesto es 'financiado por subvención,' esto significa que tu salario viene directamente de la línea presupuestaria de la subvención 330",
          },
        ],
      },
      {
        heading: {
          en: "Payer Mix and Why It Matters",
          es: "Mezcla de Pagadores y Por Qué Importa",
        },
        keyPoints: [
          {
            en: "Typical CA FQHC payer mix: 60-70% Medi-Cal, 10-15% Medicare, 10-20% uninsured/sliding fee scale, 5-10% commercial insurance",
            es: "Mezcla de pagadores típica de FQHC en CA: 60-70% Medi-Cal, 10-15% Medicare, 10-20% sin seguro/escala de tarifa variable, 5-10% seguro comercial",
          },
          {
            en: "Medi-Cal pays the PPS rate (varies by FQHC); Medicare pays its own PPS rate (~$230-260); commercial plans negotiate rates separately",
            es: "Medi-Cal paga la tarifa PPS (varía por FQHC); Medicare paga su propia tarifa PPS (~$230-260); los planes comerciales negocian tarifas por separado",
          },
          {
            en: "Uninsured patients on the sliding fee scale generate zero encounter revenue — their care is covered by the 330 grant",
            es: "Los pacientes sin seguro en la escala de tarifa variable generan cero ingresos por encuentro — su cuidado es cubierto por la subvención 330",
          },
          {
            en: "Losing Medi-Cal members (from redeterminations, work requirements, or federal cuts) directly threatens FQHC revenue — this is why enrollment assistance is a revenue activity",
            es: "Perder miembros de Medi-Cal (por redeterminaciones, requisitos de trabajo, o recortes federales) amenaza directamente los ingresos del FQHC — por eso la asistencia de inscripción es una actividad de ingresos",
          },
        ],
      },
      {
        heading: {
          en: "Where Your Role Fits in Revenue",
          es: "Dónde Encaja Tu Rol en los Ingresos",
        },
        keyPoints: [
          {
            en: "Front desk: insurance verification at every visit prevents claim denials; collecting co-pays; updating demographics avoids returned mail and lost patients",
            es: "Recepción: verificación de seguro en cada visita previene denegaciones de reclamos; cobrar copagos; actualizar datos demográficos evita correo devuelto y pacientes perdidos",
          },
          {
            en: "Medical Assistants: accurate vitals documentation supports medical necessity; efficient rooming keeps provider on schedule = more encounters/day",
            es: "Asistentes Médicos: documentación precisa de signos vitales apoya la necesidad médica; preparación eficiente de la sala mantiene al proveedor en horario = más encuentros/día",
          },
          {
            en: "CHWs and Care Coordinators: patient engagement drives visit volume; every outreach call that results in a completed appointment = revenue",
            es: "CHWs y Coordinadores de Cuidado: la participación del paciente impulsa el volumen de visitas; cada llamada de alcance que resulta en una cita completada = ingresos",
          },
          {
            en: "RNs: co-visits generate additional PPS encounters (see our RN Co-Visit guide); transitional care management visits generate revenue",
            es: "RNs: las co-visitas generan encuentros PPS adicionales (ver nuestra guía de Co-Visita de RN); las visitas de manejo de cuidado transicional generan ingresos",
          },
          {
            en: "Everyone: accurate, timely documentation = clean claims = revenue; late or incomplete documentation = denied claims = lost revenue",
            es: "Todos: documentación precisa y oportuna = reclamos limpios = ingresos; documentación tardía o incompleta = reclamos denegados = ingresos perdidos",
          },
        ],
      },
    ],
    primarySourceUrl:
      "https://www.cms.gov/medicare/payment/prospective-payment-systems/federally-qualified-health-center",
    primarySourceOrg: "CMS",
    additionalSources: [
      {
        label: "HRSA Health Center Program",
        url: "https://bphc.hrsa.gov/about-health-centers/what-is-a-health-center",
      },
      {
        label: "NACHC Billing Primer",
        url: "https://www.nachc.org/resource/fqhc-billing-and-finance/",
      },
      {
        label: "CA DHCS FQHC PPS Rates",
        url: "https://www.dhcs.ca.gov/services/medi-cal/Pages/FQHCrates.aspx",
      },
      {
        label: "HRSA Section 330 Grant Info",
        url: "https://bphc.hrsa.gov/funding/funding-opportunities",
      },
    ],
    targetRoles: [
      "chw",
      "care-coordinator",
      "medical-assistant",
      "rn",
      "revenue-cycle",
      "patient-services",
    ],
    tags: ["pps", "revenue", "billing", "section-330", "payer-mix"],
    lastUpdated: "2026-02-25",
  },

  {
    id: "bilingual-revenue-impact",
    title: {
      en: "Why Bilingual Skills = Revenue",
      es: "Por Qué las Habilidades Bilingües = Ingresos",
    },
    summary: {
      en: "Your language skills aren't just a 'nice to have' — they directly drive revenue by reducing interpreter costs, improving encounter completion rates, and reducing no-shows. Here's the financial case.",
      es: "Tus habilidades lingüísticas no son solo algo 'deseable' — impulsan directamente los ingresos al reducir costos de intérpretes, mejorar tasas de completación de encuentros, y reducir ausencias. Aquí está el caso financiero.",
    },
    category: "revenue-billing",
    difficulty: "beginner",
    readTime: "6 min",
    sections: [
      {
        heading: {
          en: "The Revenue Connection",
          es: "La Conexión con los Ingresos",
        },
        keyPoints: [
          {
            en: "Over 40% of CA FQHC patients prefer care in Spanish — many others speak Vietnamese, Mandarin, Tagalog, Korean, or other languages",
            es: "Más del 40% de los pacientes de FQHC en CA prefieren atención en español — muchos otros hablan vietnamita, mandarín, tagalo, coreano u otros idiomas",
          },
          {
            en: "Professional interpreter services cost $1-3 per minute, or roughly $25-$75 per encounter — your bilingual skills eliminate this cost entirely",
            es: "Los servicios de intérprete profesional cuestan $1-3 por minuto, o aproximadamente $25-$75 por encuentro — tus habilidades bilingües eliminan este costo por completo",
          },
          {
            en: "More importantly: bilingual staff improve encounter completion rates — patients are more likely to show up, stay for the full visit, and follow treatment plans",
            es: "Más importante: el personal bilingüe mejora las tasas de completación de encuentros — los pacientes tienen más probabilidad de asistir, quedarse para la visita completa, y seguir planes de tratamiento",
          },
          {
            en: "Every completed encounter generates PPS revenue — every no-show is $0; your language skills directly affect the bottom line",
            es: "Cada encuentro completado genera ingresos PPS — cada ausencia es $0; tus habilidades lingüísticas afectan directamente el balance final",
          },
        ],
      },
      {
        heading: {
          en: "Encounter Completion and No-Shows",
          es: "Completación de Encuentros y Ausencias",
        },
        keyPoints: [
          {
            en: "Research shows language-concordant care (provider speaks patient's language) reduces no-show rates by 10-15%",
            es: "La investigación muestra que el cuidado concordante con el idioma (proveedor habla el idioma del paciente) reduce las tasas de ausencia en 10-15%",
          },
          {
            en: "For a panel of 500 patients with monthly visits: a 10% improvement = 50 additional completed encounters per month",
            es: "Para un panel de 500 pacientes con visitas mensuales: una mejora del 10% = 50 encuentros adicionales completados por mes",
          },
          {
            en: "At an average PPS rate of $200-$300/encounter: that's $10,000-$15,000/month in additional revenue — just from language concordance",
            es: "A una tarifa PPS promedio de $200-$300/encuentro: eso son $10,000-$15,000/mes en ingresos adicionales — solo por concordancia de idioma",
          },
          {
            en: "This is why FQHCs pay bilingual differentials — it's not a perk, it's an investment with measurable return",
            es: "Es por eso que los FQHCs pagan diferenciales bilingües — no es un beneficio, es una inversión con retorno medible",
          },
        ],
      },
      {
        heading: {
          en: "Bilingual Pay Differentials in California",
          es: "Diferenciales de Pago Bilingüe en California",
        },
        keyPoints: [
          {
            en: "Most CA FQHCs offer $1-$4/hour bilingual pay differential for staff who pass language certification",
            es: "La mayoría de los FQHCs de CA ofrecen $1-$4/hora de diferencial de pago bilingüe para personal que pasa la certificación de idioma",
          },
          {
            en: "Annual impact: $2,000-$8,000+ per year on top of base salary",
            es: "Impacto anual: $2,000-$8,000+ por año además del salario base",
          },
          {
            en: "Some FQHCs offer flat annual bonuses instead of hourly differentials — check your employer's policy",
            es: "Algunos FQHCs ofrecen bonos anuales fijos en lugar de diferenciales por hora — verifica la política de tu empleador",
          },
          {
            en: "Certification through ALTA Language Services, Berlitz, or employer-administered assessments — ask your HR department",
            es: "Certificación a través de ALTA Language Services, Berlitz, o evaluaciones administradas por el empleador — pregunta a tu departamento de recursos humanos",
          },
        ],
      },
      {
        heading: {
          en: "Beyond Spanish: Other High-Value Languages",
          es: "Más Allá del Español: Otros Idiomas de Alto Valor",
        },
        keyPoints: [
          {
            en: "Vietnamese: high demand in Orange County, San Jose, and Sacramento FQHCs",
            es: "Vietnamita: alta demanda en FQHCs de Orange County, San José, y Sacramento",
          },
          {
            en: "Mandarin/Cantonese: critical in Bay Area and LA FQHCs — Asian Health Services, NEMS, and others actively recruit",
            es: "Mandarín/Cantonés: crítico en FQHCs del Área de la Bahía y LA — Asian Health Services, NEMS, y otros reclutan activamente",
          },
          {
            en: "Tagalog, Korean, Armenian, Farsi: regionally important in specific CA communities",
            es: "Tagalo, coreano, armenio, farsi: regionalmente importantes en comunidades específicas de CA",
          },
          {
            en: "Any language concordance improves health outcomes and patient retention — and some managed care plans offer supplemental payments for culturally concordant care",
            es: "Cualquier concordancia de idioma mejora los resultados de salud y la retención de pacientes — y algunos planes de salud administrados ofrecen pagos suplementarios por cuidado culturalmente concordante",
          },
        ],
      },
    ],
    primarySourceUrl:
      "https://www.cms.gov/About-CMS/Agency-Information/OMH/Downloads/CLAS-Toolkit-12-7-16.pdf",
    primarySourceOrg: "CMS",
    additionalSources: [
      {
        label: "HHS Language Access Requirements",
        url: "https://www.hhs.gov/civil-rights/for-individuals/special-topics/limited-english-proficiency/index.html",
      },
      {
        label: "CA SB 223 Language Access",
        url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB223",
      },
      {
        label: "NACHC Workforce Data",
        url: "https://www.nachc.org/research-and-data/",
      },
    ],
    targetRoles: [
      "chw",
      "care-coordinator",
      "medical-assistant",
      "patient-services",
      "rn",
    ],
    tags: ["bilingual", "language", "revenue", "interpreter", "spanish"],
    lastUpdated: "2026-02-25",
  },

  {
    id: "role-in-revenue-cycle",
    title: {
      en: "Understanding Your Role in the Revenue Cycle",
      es: "Entendiendo Tu Rol en el Ciclo de Ingresos",
    },
    summary: {
      en: "From patient scheduling to claim payment, every role at an FQHC touches the revenue cycle. Here's how the 8-step process works and where your daily work fits in.",
      es: "Desde la programación del paciente hasta el pago del reclamo, cada rol en un FQHC toca el ciclo de ingresos. Así es como funciona el proceso de 8 pasos y dónde encaja tu trabajo diario.",
    },
    category: "revenue-billing",
    difficulty: "intermediate",
    readTime: "9 min",
    sections: [
      {
        heading: {
          en: "The Revenue Cycle in 8 Steps",
          es: "El Ciclo de Ingresos en 8 Pasos",
        },
        keyPoints: [
          {
            en: "Step 1: Scheduling — patient books appointment (phone, portal, walk-in). Proper scheduling maximizes provider time and reduces gaps.",
            es: "Paso 1: Programación — el paciente agenda cita (teléfono, portal, sin cita). La programación adecuada maximiza el tiempo del proveedor y reduce brechas.",
          },
          {
            en: "Step 2: Registration & insurance verification — confirm coverage, collect co-pays, update demographics. Errors here cause claim denials downstream.",
            es: "Paso 2: Registro y verificación de seguro — confirmar cobertura, cobrar copagos, actualizar datos demográficos. Errores aquí causan denegaciones de reclamos más adelante.",
          },
          {
            en: "Step 3: Patient encounter — face-to-face visit with a billable provider. This is where PPS revenue is generated.",
            es: "Paso 3: Encuentro con paciente — visita cara a cara con proveedor facturable. Aquí es donde se generan los ingresos PPS.",
          },
          {
            en: "Step 4: Documentation — provider documents the encounter in the EHR. Timely, complete documentation = billable claim.",
            es: "Paso 4: Documentación — el proveedor documenta el encuentro en el EHR. Documentación oportuna y completa = reclamo facturable.",
          },
          {
            en: "Steps 5-8: Coding → Claim submission → Payment posting → Denial management. The billing team handles these, but everyone's earlier work determines success.",
            es: "Pasos 5-8: Codificación → Envío de reclamo → Registro de pago → Manejo de denegaciones. El equipo de facturación maneja estos, pero el trabajo previo de todos determina el éxito.",
          },
        ],
      },
      {
        heading: {
          en: "Front Desk / Patient Services",
          es: "Recepción / Servicios al Paciente",
        },
        keyPoints: [
          {
            en: "Verify insurance at EVERY visit — coverage can change month to month, especially for Medi-Cal members during redetermination periods",
            es: "Verificar seguro en CADA visita — la cobertura puede cambiar de mes a mes, especialmente para miembros de Medi-Cal durante períodos de redeterminación",
          },
          {
            en: "Collect co-pays at time of service (note: Medi-Cal has no copay for most FQHC services; Medicare copays apply)",
            es: "Cobrar copagos al momento del servicio (nota: Medi-Cal no tiene copago para la mayoría de servicios de FQHC; copagos de Medicare aplican)",
          },
          {
            en: "Update demographics every visit — a wrong address means returned mail, which means lost patients, which means lost revenue",
            es: "Actualizar datos demográficos en cada visita — una dirección incorrecta significa correo devuelto, lo que significa pacientes perdidos, lo que significa ingresos perdidos",
          },
          {
            en: "Enroll uninsured patients in the sliding fee scale — this documents your charity care for HRSA and captures patients who may qualify for Medi-Cal",
            es: "Inscribir pacientes sin seguro en la escala de tarifa variable — esto documenta tu cuidado de caridad para HRSA y captura pacientes que pueden calificar para Medi-Cal",
          },
        ],
      },
      {
        heading: {
          en: "Medical Assistants",
          es: "Asistentes Médicos",
        },
        keyPoints: [
          {
            en: "Accurate vitals documentation supports medical necessity — blood pressure, BMI, pain scores all contribute to the clinical picture",
            es: "La documentación precisa de signos vitales apoya la necesidad médica — presión arterial, IMC, puntajes de dolor contribuyen al cuadro clínico",
          },
          {
            en: "Medication reconciliation documented in the EHR is a quality measure AND supports billing accuracy",
            es: "La reconciliación de medicamentos documentada en el EHR es una medida de calidad Y apoya la precisión de facturación",
          },
          {
            en: "Point-of-care testing (glucose, pregnancy, rapid strep, A1C) must be documented — these are included in the PPS rate but support medical necessity",
            es: "Las pruebas en el punto de cuidado (glucosa, embarazo, estreptococo rápido, A1C) deben documentarse — están incluidas en la tarifa PPS pero apoyan la necesidad médica",
          },
          {
            en: "Efficient rooming keeps the provider on schedule = more encounters per day = more revenue. Your workflow directly affects throughput.",
            es: "La preparación eficiente de la sala mantiene al proveedor en horario = más encuentros por día = más ingresos. Tu flujo de trabajo afecta directamente el rendimiento.",
          },
        ],
      },
      {
        heading: {
          en: "Providers and Nurses",
          es: "Proveedores y Enfermeros/as",
        },
        keyPoints: [
          {
            en: "Complete, timely documentation is the foundation — close encounters the same day, not days later (late documentation raises audit flags)",
            es: "La documentación completa y oportuna es la base — cerrar encuentros el mismo día, no días después (documentación tardía levanta alertas de auditoría)",
          },
          {
            en: "For RNs: separate progress notes for co-visits are essential — see the RN Co-Visit guide for what makes a billable encounter",
            es: "Para RNs: notas de progreso separadas para co-visitas son esenciales — ver la guía de Co-Visita de RN para qué hace un encuentro facturable",
          },
          {
            en: "Document referrals clearly — the referral and follow-up documentation supports care coordination encounters and quality metrics",
            es: "Documentar referencias claramente — la documentación de referencia y seguimiento apoya encuentros de coordinación de cuidado y métricas de calidad",
          },
          {
            en: "Orders, follow-ups, and return visit timing documented clearly — this drives patient retention and future encounter volume",
            es: "Órdenes, seguimientos y tiempo de visita de retorno documentados claramente — esto impulsa la retención de pacientes y volumen de encuentros futuros",
          },
        ],
      },
      {
        heading: {
          en: "Care Coordinators and CHWs",
          es: "Coordinadores de Cuidado y CHWs",
        },
        keyPoints: [
          {
            en: "Engagement drives volume: every patient you bring back for a visit generates PPS revenue. Your outreach is a revenue activity.",
            es: "La participación impulsa el volumen: cada paciente que traes de vuelta para una visita genera ingresos PPS. Tu alcance es una actividad de ingresos.",
          },
          {
            en: "Outreach calls that result in scheduled and completed appointments are directly tied to revenue — track your conversion rates",
            es: "Las llamadas de alcance que resultan en citas programadas y completadas están directamente ligadas a ingresos — rastrear tus tasas de conversión",
          },
          {
            en: "ECM documentation generates PMPM revenue from managed care plans — your care plan notes are literally billing documentation",
            es: "La documentación ECM genera ingresos PMPM de planes de salud administrados — tus notas de plan de cuidado son literalmente documentación de facturación",
          },
          {
            en: "Referral tracking closes the loop: when a specialist sends notes back, the PCP can do a follow-up visit = another encounter",
            es: "El rastreo de referencias cierra el ciclo: cuando un especialista envía notas de vuelta, el PCP puede hacer una visita de seguimiento = otro encuentro",
          },
        ],
      },
      {
        heading: {
          en: "What Claim Denials Cost",
          es: "Lo Que Cuestan las Denegaciones de Reclamos",
        },
        keyPoints: [
          {
            en: "Average denial costs $25-$50 in staff time to investigate, correct, and resubmit — and many denials are never reworked",
            es: "Una denegación promedio cuesta $25-$50 en tiempo de personal para investigar, corregir y reenviar — y muchas denegaciones nunca se retrabajan",
          },
          {
            en: "Common FQHC denial reasons: duplicate claims, missing or wrong modifier, wrong payer ID, eligibility issues, late filing",
            es: "Razones comunes de denegación en FQHCs: reclamos duplicados, modificador faltante o incorrecto, ID de pagador incorrecta, problemas de elegibilidad, presentación tardía",
          },
          {
            en: "Example: 5% denial rate on 10,000 encounters/year at $200/encounter = $100,000 in lost revenue annually",
            es: "Ejemplo: tasa de denegación del 5% en 10,000 encuentros/año a $200/encuentro = $100,000 en ingresos perdidos anualmente",
          },
          {
            en: "Most denials trace back to registration errors, documentation gaps, or eligibility issues — things every role can help prevent",
            es: "La mayoría de las denegaciones se remontan a errores de registro, brechas en documentación, o problemas de elegibilidad — cosas que cada rol puede ayudar a prevenir",
          },
        ],
      },
    ],
    primarySourceUrl:
      "https://www.nachc.org/resource/fqhc-billing-and-finance/",
    primarySourceOrg: "NACHC",
    additionalSources: [
      {
        label: "CMS FQHC Billing Guide",
        url: "https://www.cms.gov/Outreach-and-Education/Medicare-Learning-Network-MLN/MLNProducts/Downloads/fqhcfactsheet.pdf",
      },
      {
        label: "HRSA UDS Manual",
        url: "https://bphc.hrsa.gov/data-reporting/uds-training-and-technical-assistance",
      },
    ],
    targetRoles: [
      "patient-services",
      "medical-assistant",
      "rn",
      "care-coordinator",
      "revenue-cycle",
    ],
    tags: ["revenue-cycle", "billing", "denials", "documentation", "claims"],
    lastUpdated: "2026-02-25",
  },

  /* ============================================================== */
  /*  PROGRAMS & COMPLIANCE                                          */
  /* ============================================================== */
  {
    id: "calaim-overview",
    title: {
      en: "CalAIM for FQHC Workers: What You Need to Know",
      es: "CalAIM para Trabajadores de FQHC: Lo Que Necesitas Saber",
    },
    summary: {
      en: "CalAIM is California's permanent transformation of Medi-Cal — not a temporary pilot. It created ECM, Community Supports, and population health management. Here's what it means for your role.",
      es: "CalAIM es la transformación permanente de Medi-Cal de California — no un piloto temporal. Creó ECM, Apoyos Comunitarios, y gestión de salud poblacional. Esto es lo que significa para tu rol.",
    },
    category: "programs-compliance",
    difficulty: "beginner",
    readTime: "10 min",
    sections: [
      {
        heading: {
          en: "What CalAIM Is",
          es: "Qué Es CalAIM",
        },
        keyPoints: [
          {
            en: "California Advancing and Innovating Medi-Cal (CalAIM) — a multi-year initiative launched January 2022 to transform the entire Medi-Cal delivery system",
            es: "California Advancing and Innovating Medi-Cal (CalAIM) — una iniciativa de varios años lanzada en enero de 2022 para transformar todo el sistema de entrega de Medi-Cal",
          },
          {
            en: "Approved by CMS as a Section 1115 waiver — this is not a grant or pilot, it's the new permanent structure of Medi-Cal",
            es: "Aprobado por CMS como una exención Sección 1115 — esto no es una subvención o piloto, es la nueva estructura permanente de Medi-Cal",
          },
          {
            en: "Three pillars: (1) Population Health Management, (2) ECM & Community Supports, (3) Behavioral Health reform (including CalBH bridge model)",
            es: "Tres pilares: (1) Gestión de Salud Poblacional, (2) ECM y Apoyos Comunitarios, (3) Reforma de Salud Conductual (incluyendo modelo puente CalBH)",
          },
          {
            en: "CalAIM replaced fragmented pilots (Whole Person Care, Health Homes, Drug Medi-Cal) with one statewide model — if your FQHC was doing these, you're now doing CalAIM",
            es: "CalAIM reemplazó pilotos fragmentados (Whole Person Care, Health Homes, Drug Medi-Cal) con un modelo estatal — si tu FQHC hacía estos, ahora estás haciendo CalAIM",
          },
        ],
      },
      {
        heading: {
          en: "ECM (Enhanced Care Management)",
          es: "ECM (Gestión de Cuidado Mejorado)",
        },
        keyPoints: [
          {
            en: "Intensive care coordination for the highest-need Medi-Cal members — 7 populations of focus (see our detailed ECM guide)",
            es: "Coordinación de cuidado intensiva para los miembros de Medi-Cal de mayor necesidad — 7 poblaciones de enfoque (ver nuestra guía detallada de ECM)",
          },
          {
            en: "FQHCs can contract with managed care plans to deliver ECM — this creates Lead Care Manager, care coordinator, and CHW positions",
            es: "Los FQHCs pueden contratar con planes de salud para entregar ECM — esto crea puestos de Gerente de Cuidado Principal, coordinador de cuidado, y CHW",
          },
          {
            en: "Funded through Per-Member-Per-Month (PMPM) payments from managed care plans — revenue-funded, not grant-dependent",
            es: "Financiado a través de pagos Por-Miembro-Por-Mes (PMPM) de planes de salud — financiado por ingresos, no dependiente de subvenciones",
          },
          {
            en: "ECM is one of the biggest job creators in CA community health right now — if you're in care coordination, this is your primary program",
            es: "ECM es uno de los mayores creadores de empleos en salud comunitaria de CA ahora mismo — si estás en coordinación de cuidado, este es tu programa principal",
          },
        ],
      },
      {
        heading: {
          en: "Community Supports (Formerly ILOS)",
          es: "Apoyos Comunitarios (Anteriormente ILOS)",
        },
        keyPoints: [
          {
            en: "14 pre-approved Community Supports that managed care plans can offer to Medi-Cal members through contracted providers like FQHCs",
            es: "14 Apoyos Comunitarios pre-aprobados que los planes de salud pueden ofrecer a miembros de Medi-Cal a través de proveedores contratados como FQHCs",
          },
          {
            en: "Examples: housing transition navigation, housing deposits/moving costs, medically supportive food, sobering centers, personal care services, respite services",
            es: "Ejemplos: navegación de transición de vivienda, depósitos de vivienda/costos de mudanza, alimentos de apoyo médico, centros de sobriedad, servicios de cuidado personal, servicios de respiro",
          },
          {
            en: "This creates new non-clinical roles at FQHCs: housing navigators, benefits specialists, food program coordinators",
            es: "Esto crea nuevos roles no clínicos en FQHCs: navegadores de vivienda, especialistas en beneficios, coordinadores de programas de alimentos",
          },
          {
            en: "FQHCs bill managed care plans for these services — it's a new revenue stream that didn't exist before CalAIM",
            es: "Los FQHCs facturan a los planes de salud por estos servicios — es una nueva fuente de ingresos que no existía antes de CalAIM",
          },
        ],
      },
      {
        heading: {
          en: "Population Health Management",
          es: "Gestión de Salud Poblacional",
        },
        keyPoints: [
          {
            en: "All managed care plans must implement Population Health Management (PHM) strategies — risk-stratifying their entire membership",
            es: "Todos los planes de salud deben implementar estrategias de Gestión de Salud Poblacional (PHM) — estratificando por riesgo a toda su membresía",
          },
          {
            en: "Plans identify which members need ECM or Community Supports based on claims data, utilization, and social determinants",
            es: "Los planes identifican qué miembros necesitan ECM o Apoyos Comunitarios basándose en datos de reclamos, utilización y determinantes sociales",
          },
          {
            en: "FQHCs receive member assignments based on this stratification — your panel and caseload are driven by plan data",
            es: "Los FQHCs reciben asignaciones de miembros basadas en esta estratificación — tu panel y carga de casos son impulsados por datos del plan",
          },
          {
            en: "Data sharing between plans and providers is increasing — expect more data-driven care management and quality reporting",
            es: "El intercambio de datos entre planes y proveedores está aumentando — espera más gestión de cuidado basada en datos y reportes de calidad",
          },
        ],
      },
      {
        heading: {
          en: "How CalAIM Affects Your Job",
          es: "Cómo CalAIM Afecta Tu Trabajo",
        },
        keyPoints: [
          {
            en: "Care coordination roles (CHW, care coordinator, case manager): you're likely delivering ECM or Community Supports — CalAIM created and funds your position",
            es: "Roles de coordinación de cuidado (CHW, coordinador de cuidado, gerente de casos): probablemente estás entregando ECM o Apoyos Comunitarios — CalAIM creó y financia tu puesto",
          },
          {
            en: "Clinical roles (RN, MD, NP): CalAIM metrics affect your quality reporting; PHM data drives care planning; BH integration is a CalAIM priority",
            es: "Roles clínicos (RN, MD, NP): las métricas de CalAIM afectan tus reportes de calidad; datos PHM impulsan la planificación de cuidado; la integración de salud conductual es prioridad de CalAIM",
          },
          {
            en: "Front desk / patient services: managed care plan assignment matters more than ever — eligibility verification is critical for ECM billing",
            es: "Recepción / servicios al paciente: la asignación del plan de salud importa más que nunca — la verificación de elegibilidad es crítica para la facturación ECM",
          },
          {
            en: "Important: CalAIM is funded through Medi-Cal — federal cuts to Medicaid (like H.R. 1) directly threaten CalAIM programs and the positions they fund",
            es: "Importante: CalAIM se financia a través de Medi-Cal — los recortes federales a Medicaid (como H.R. 1) amenazan directamente los programas CalAIM y los puestos que financian",
          },
        ],
      },
    ],
    primarySourceUrl:
      "https://www.dhcs.ca.gov/CalAIM/Pages/CalAIM.aspx",
    primarySourceOrg: "CA DHCS",
    additionalSources: [
      {
        label: "CHCF CalAIM Collection",
        url: "https://www.chcf.org/collection/calaim/",
      },
      {
        label: "CalAIM High-Level Summary",
        url: "https://www.dhcs.ca.gov/CalAIM/Documents/CalAIM-High-Level-Summary.pdf",
      },
      {
        label: "CPCA CalAIM Resources",
        url: "https://www.cpca.org/CPCA/HEALTH_CENTER_RESOURCES/CalAIM/",
      },
    ],
    targetRoles: [
      "chw",
      "care-coordinator",
      "case-manager",
      "behavioral-health",
      "rn",
    ],
    tags: ["calaim", "medi-cal", "ecm", "community-supports", "policy"],
    lastUpdated: "2026-02-25",
  },

  {
    id: "documentation-compliance",
    title: {
      en: "Documentation That Protects You and Your Patients",
      es: "Documentación Que Te Protege a Ti y a Tus Pacientes",
    },
    summary: {
      en: "FQHCs are audited by HRSA, CMS, managed care plans, and state agencies. Poor documentation doesn't just lose revenue — it can trigger payback demands and corrective action. Here's how to document right.",
      es: "Los FQHCs son auditados por HRSA, CMS, planes de salud, y agencias estatales. La mala documentación no solo pierde ingresos — puede provocar demandas de reembolso y acciones correctivas. Así es cómo documentar correctamente.",
    },
    category: "programs-compliance",
    difficulty: "intermediate",
    readTime: "8 min",
    sections: [
      {
        heading: {
          en: "Why Documentation Matters More at an FQHC",
          es: "Por Qué la Documentación Importa Más en un FQHC",
        },
        keyPoints: [
          {
            en: "FQHCs face audits from multiple agencies: HRSA (operational site visits every 3 years), managed care plans (ECM chart reviews), CMS (Medicare claims), and state agencies (Medi-Cal compliance)",
            es: "Los FQHCs enfrentan auditorías de múltiples agencias: HRSA (visitas operativas cada 3 años), planes de salud (revisiones de expedientes ECM), CMS (reclamos de Medicare), y agencias estatales (cumplimiento de Medi-Cal)",
          },
          {
            en: "Failed audits can trigger: payback demands (returning money already received), corrective action plans, increased monitoring, and in extreme cases, loss of FQHC status",
            es: "Auditorías fallidas pueden provocar: demandas de reembolso (devolver dinero ya recibido), planes de acción correctiva, monitoreo aumentado, y en casos extremos, pérdida del estatus FQHC",
          },
          {
            en: "Your documentation is the legal record of care delivered — it's the only evidence that work was done",
            es: "Tu documentación es el registro legal del cuidado entregado — es la única evidencia de que el trabajo se realizó",
          },
          {
            en: "Good documentation protects you personally, your patients, and your FQHC's funding",
            es: "La buena documentación te protege personalmente, a tus pacientes, y el financiamiento de tu FQHC",
          },
        ],
      },
      {
        heading: {
          en: "The Golden Rule: If You Didn't Document It, It Didn't Happen",
          es: "La Regla de Oro: Si No Lo Documentaste, No Sucedió",
        },
        keyPoints: [
          {
            en: "Every patient contact needs: date, time, who was present, what was done, why it was done, and what happens next",
            es: "Cada contacto con el paciente necesita: fecha, hora, quién estuvo presente, qué se hizo, por qué se hizo, y qué sigue",
          },
          {
            en: "This applies to ALL contact types: office visits, phone calls, home visits, care coordination activities, and field-based encounters",
            es: "Esto aplica a TODOS los tipos de contacto: visitas en oficina, llamadas telefónicas, visitas domiciliarias, actividades de coordinación de cuidado, y encuentros en campo",
          },
          {
            en: "Timeliness matters: document the same day whenever possible — notes entered days later look fabricated during audits",
            es: "La oportunidad importa: documenta el mismo día siempre que sea posible — notas ingresadas días después parecen fabricadas durante auditorías",
          },
          {
            en: "If an auditor can't tell what happened from your note alone, the encounter may be disallowed — even if you actually provided excellent care",
            es: "Si un auditor no puede determinar qué sucedió solo con tu nota, el encuentro puede ser rechazado — incluso si realmente proporcionaste excelente cuidado",
          },
        ],
      },
      {
        heading: {
          en: "Common Documentation Errors That Fail Audits",
          es: "Errores Comunes de Documentación Que Fallan en Auditorías",
        },
        keyPoints: [
          {
            en: "Copy-paste from previous notes: auditors specifically look for identical language across encounters — it suggests notes weren't written fresh",
            es: "Copiar y pegar de notas anteriores: los auditores específicamente buscan lenguaje idéntico entre encuentros — sugiere que las notas no se escribieron de nuevo",
          },
          {
            en: "Vague care plan goals: 'improve health' or 'feel better' will fail — use SMART goals like 'reduce A1C from 9.2 to 7.5 by June 2026'",
            es: "Metas vagas en planes de cuidado: 'mejorar la salud' o 'sentirse mejor' fallarán — usa metas SMART como 'reducir A1C de 9.2 a 7.5 para junio de 2026'",
          },
          {
            en: "Missing signatures or credentials after notes — each note must be signed/authenticated by the author with proper credentials",
            es: "Firmas faltantes o credenciales después de las notas — cada nota debe ser firmada/autenticada por el autor con las credenciales apropiadas",
          },
          {
            en: "Incomplete medication reconciliation, no evidence of informed consent, or HIPAA violations in notes (including information about other patients)",
            es: "Reconciliación de medicamentos incompleta, sin evidencia de consentimiento informado, o violaciones de HIPAA en notas (incluyendo información sobre otros pacientes)",
          },
        ],
      },
      {
        heading: {
          en: "ECM-Specific Documentation Standards",
          es: "Estándares de Documentación Específicos de ECM",
        },
        keyPoints: [
          {
            en: "Comprehensive needs assessment must be completed within 30 days of enrollment — covering physical, behavioral, social, and housing needs",
            es: "La evaluación integral de necesidades debe completarse dentro de 30 días de inscripción — cubriendo necesidades físicas, conductuales, sociales y de vivienda",
          },
          {
            en: "Individualized Care Plan with SMART goals — the member must participate in creating the plan (document their input and agreement)",
            es: "Plan de Cuidado Individualizado con metas SMART — el miembro debe participar en crear el plan (documentar su aporte y acuerdo)",
          },
          {
            en: "Monthly contact documented: date, mode (in-person/phone/field), duration, content of discussion, and any actions taken",
            es: "Contacto mensual documentado: fecha, modo (presencial/teléfono/campo), duración, contenido de la discusión, y cualquier acción tomada",
          },
          {
            en: "Quarterly care plan updates with progress toward goals — managed care plans audit these frequently and expect evidence of member progress or plan adjustment",
            es: "Actualizaciones trimestrales del plan de cuidado con progreso hacia metas — los planes de salud auditan estos frecuentemente y esperan evidencia de progreso del miembro o ajuste del plan",
          },
        ],
      },
      {
        heading: {
          en: "Protecting Yourself",
          es: "Protegerte a Ti Mismo/a",
        },
        keyPoints: [
          {
            en: "Document objectively: facts, observations, and clinical findings — not opinions, judgments, or assumptions about the patient",
            es: "Documenta objetivamente: hechos, observaciones, y hallazgos clínicos — no opiniones, juicios, o suposiciones sobre el paciente",
          },
          {
            en: "Use approved templates in your EHR — they're designed to capture required elements and keep you compliant",
            es: "Usa plantillas aprobadas en tu EHR — están diseñadas para capturar elementos requeridos y mantenerte en cumplimiento",
          },
          {
            en: "Never alter records after the fact — amendments are acceptable with clear dating ('Late entry' or 'Addendum to note dated...')",
            es: "Nunca alteres registros después del hecho — enmiendas son aceptables con fecha clara ('Entrada tardía' o 'Adenda a nota fechada...')",
          },
          {
            en: "Know your scope of practice and document within it — don't document clinical assessments you're not licensed to make",
            es: "Conoce tu alcance de práctica y documenta dentro de él — no documentes evaluaciones clínicas que no tienes licencia para hacer",
          },
          {
            en: "If you witness something concerning, document it factually and report through proper channels (supervisor, compliance officer)",
            es: "Si presencias algo preocupante, documéntalo factualmente y reporta a través de los canales apropiados (supervisor, oficial de cumplimiento)",
          },
        ],
      },
    ],
    primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual",
    primarySourceOrg: "HRSA",
    additionalSources: [
      {
        label: "OIG Compliance Guidance",
        url: "https://oig.hhs.gov/compliance/compliance-guidance/",
      },
      {
        label: "NACHC Documentation Standards",
        url: "https://www.nachc.org/resource/fqhc-billing-and-finance/",
      },
    ],
    targetRoles: [
      "chw",
      "care-coordinator",
      "rn",
      "medical-assistant",
      "behavioral-health",
      "case-manager",
    ],
    tags: [
      "documentation",
      "compliance",
      "audit",
      "ecm",
      "ehr",
      "hipaa",
    ],
    lastUpdated: "2026-02-25",
  },

  {
    id: "grant-cycles-job-security",
    title: {
      en: "Grant Cycles & Job Security: What FQHC Workers Should Know",
      es: "Ciclos de Subvenciones y Estabilidad Laboral: Lo Que Deben Saber los Trabajadores de FQHC",
    },
    summary: {
      en: "Your position is funded by something — a federal grant, encounter revenue, or a managed care contract. Understanding which one matters for your job stability and career planning.",
      es: "Tu puesto es financiado por algo — una subvención federal, ingresos por encuentros, o un contrato de plan de salud. Entender cuál es importante para tu estabilidad laboral y planificación de carrera.",
    },
    category: "programs-compliance",
    difficulty: "beginner",
    readTime: "7 min",
    sections: [
      {
        heading: {
          en: "How FQHC Funding Works",
          es: "Cómo Funciona el Financiamiento de los FQHC",
        },
        keyPoints: [
          {
            en: "Three main funding buckets: (1) Section 330 federal grant (base funding for safety-net services), (2) Patient encounter revenue (PPS payments), (3) Other grants and contracts (state, county, foundation, managed care)",
            es: "Tres fuentes principales de financiamiento: (1) Subvención federal Sección 330 (financiamiento base para servicios de red de seguridad), (2) Ingresos por encuentros con pacientes (pagos PPS), (3) Otras subvenciones y contratos (estatal, condado, fundación, planes de salud)",
          },
          {
            en: "Your position might be funded by any combination of these — and knowing which one tells you a lot about your job stability",
            es: "Tu puesto puede ser financiado por cualquier combinación de estos — y saber cuál te dice mucho sobre tu estabilidad laboral",
          },
          {
            en: "Ask your supervisor or HR: 'What fund source is my position tied to?' This is a reasonable and smart question to ask.",
            es: "Pregunta a tu supervisor o recursos humanos: '¿A qué fuente de financiamiento está ligado mi puesto?' Esta es una pregunta razonable e inteligente.",
          },
        ],
      },
      {
        heading: {
          en: "The Section 330 Grant Cycle",
          es: "El Ciclo de la Subvención Sección 330",
        },
        keyPoints: [
          {
            en: "3-year project periods: HRSA awards the grant for 3 years, with annual Non-Competing Continuation (NCC) applications to keep it active each year",
            es: "Períodos de proyecto de 3 años: HRSA otorga la subvención por 3 años, con solicitudes anuales de Continuación No Competitiva (NCC) para mantenerla activa cada año",
          },
          {
            en: "Service Area Competition (SAC): every 3 years, HRSA re-competes the grant — existing FQHCs must reapply and demonstrate continued need and performance",
            es: "Competencia de Área de Servicio (SAC): cada 3 años, HRSA vuelve a competir la subvención — los FQHCs existentes deben volver a aplicar y demostrar necesidad y desempeño continuos",
          },
          {
            en: "Grant amount is based on UDS data: patients served, quality metrics (clinical outcomes, patient satisfaction), financial performance",
            es: "El monto de la subvención se basa en datos UDS: pacientes atendidos, métricas de calidad (resultados clínicos, satisfacción del paciente), desempeño financiero",
          },
          {
            en: "If an FQHC loses its 330 grant, it can lose its FQHC designation entirely — which means losing PPS rates and other benefits",
            es: "Si un FQHC pierde su subvención 330, puede perder su designación FQHC por completo — lo que significa perder tarifas PPS y otros beneficios",
          },
        ],
      },
      {
        heading: {
          en: "Grant-Funded vs. Revenue-Funded Positions",
          es: "Puestos Financiados por Subvención vs. por Ingresos",
        },
        keyPoints: [
          {
            en: "Grant-funded: your salary comes from a specific grant budget line item. Your position exists as long as the grant exists and is renewed.",
            es: "Financiado por subvención: tu salario viene de una línea presupuestaria específica de la subvención. Tu puesto existe mientras la subvención exista y se renueve.",
          },
          {
            en: "Revenue-funded: your salary comes from encounter revenue or general operations. Your position exists as long as the FQHC has sufficient revenue to sustain it.",
            es: "Financiado por ingresos: tu salario viene de ingresos por encuentros u operaciones generales. Tu puesto existe mientras el FQHC tenga ingresos suficientes para sostenerlo.",
          },
          {
            en: "ECM positions are typically revenue-funded (managed care contracts) — this is actually more stable than many grants because it's tied to ongoing Medi-Cal enrollment, not a fixed grant period",
            es: "Los puestos ECM típicamente son financiados por ingresos (contratos de planes de salud) — esto es realmente más estable que muchas subvenciones porque está ligado a inscripción continua de Medi-Cal, no a un período fijo de subvención",
          },
          {
            en: "Some positions are 'blended' — partially grant-funded and partially revenue-funded, making them more resilient to any single funding change",
            es: "Algunos puestos son 'mixtos' — parcialmente financiados por subvención y parcialmente por ingresos, haciéndolos más resistentes a cualquier cambio individual de financiamiento",
          },
        ],
      },
      {
        heading: {
          en: "Signs Your Position May Be at Risk",
          es: "Señales de Que Tu Puesto Puede Estar en Riesgo",
        },
        keyPoints: [
          {
            en: "Declining patient volume (fewer encounters = less revenue) — especially if leadership is talking about it in meetings",
            es: "Volumen de pacientes decreciente (menos encuentros = menos ingresos) — especialmente si el liderazgo está hablando de ello en reuniones",
          },
          {
            en: "Grant approaching end of project period without clear renewal news from leadership",
            es: "Subvención acercándose al fin del período de proyecto sin noticias claras de renovación del liderazgo",
          },
          {
            en: "FQHC losing managed care contracts or failing to win new ones — this reduces ECM and Community Supports revenue",
            es: "FQHC perdiendo contratos de planes de salud o fallando en ganar nuevos — esto reduce ingresos de ECM y Apoyos Comunitarios",
          },
          {
            en: "Budget freezes, hiring freezes, or leadership discussing 'restructuring' or 'right-sizing' — these are early warning signs",
            es: "Congelamientos presupuestarios, congelamientos de contratación, o liderazgo discutiendo 'reestructuración' o 'ajuste de tamaño' — estas son señales de alerta temprana",
          },
        ],
      },
      {
        heading: {
          en: "How to Increase Your Job Security",
          es: "Cómo Aumentar Tu Estabilidad Laboral",
        },
        keyPoints: [
          {
            en: "Get certified: CHW certification, medical interpreter certification, phlebotomy — certified staff are harder to replace and easier to justify in grant budgets",
            es: "Obtén certificación: certificación CHW, certificación de intérprete médico, flebotomía — el personal certificado es más difícil de reemplazar y más fácil de justificar en presupuestos de subvención",
          },
          {
            en: "Cross-train across programs: if you can do ECM AND front desk AND care coordination, you're three times harder to cut",
            es: "Entrénate en múltiples áreas: si puedes hacer ECM Y recepción Y coordinación de cuidado, eres tres veces más difícil de recortar",
          },
          {
            en: "Document well: you directly protect the revenue when your notes are clean, complete, and audit-ready",
            es: "Documenta bien: proteges directamente los ingresos cuando tus notas están limpias, completas, y listas para auditoría",
          },
          {
            en: "Build patient engagement: workers who demonstrably contribute to visit volume, no-show reduction, and quality metrics are the last to be cut",
            es: "Construye participación del paciente: los trabajadores que demostrablemente contribuyen al volumen de visitas, reducción de ausencias, y métricas de calidad son los últimos en ser recortados",
          },
          {
            en: "Know your FQHC's UDS data and quality metrics — if you can speak to outcomes, you can advocate for your position",
            es: "Conoce los datos UDS y métricas de calidad de tu FQHC — si puedes hablar de resultados, puedes abogar por tu puesto",
          },
        ],
      },
    ],
    primarySourceUrl:
      "https://bphc.hrsa.gov/funding/funding-opportunities",
    primarySourceOrg: "HRSA",
    additionalSources: [
      {
        label: "HRSA Section 330 Grant Program",
        url: "https://bphc.hrsa.gov/funding/funding-opportunities/health-center-program",
      },
      {
        label: "NACHC Section 330 Funding Info",
        url: "https://www.nachc.org/issues-advocacy/government-relations/appropriations/",
      },
      {
        label: "CA HCAI Workforce Programs",
        url: "https://hcai.ca.gov/workforce/",
      },
    ],
    targetRoles: [
      "chw",
      "care-coordinator",
      "medical-assistant",
      "rn",
      "behavioral-health",
    ],
    tags: [
      "grant",
      "section-330",
      "job-security",
      "funding",
      "hrsa",
      "career",
    ],
    lastUpdated: "2026-02-25",
  },
];

/* ------------------------------------------------------------------ */
/*  Helper functions                                                    */
/* ------------------------------------------------------------------ */

/** All unique source URLs for the Sources Index section */
export function getAllGuideSources(): { org: string; url: string }[] {
  const sources: { org: string; url: string }[] = [];
  for (const guide of FQHC_GUIDES) {
    sources.push({ org: guide.primarySourceOrg, url: guide.primarySourceUrl });
    for (const s of guide.additionalSources) {
      sources.push({ org: s.label, url: s.url });
    }
  }
  const seen = new Set<string>();
  return sources.filter((s) => {
    if (seen.has(s.url)) return false;
    seen.add(s.url);
    return true;
  });
}

/** Count guides by category */
export function getGuideCounts(): Record<GuideCategory, number> & {
  total: number;
} {
  const counts = {
    total: FQHC_GUIDES.length,
  } as Record<GuideCategory, number> & { total: number };
  for (const cat of GUIDE_CATEGORIES) {
    counts[cat.id] = FQHC_GUIDES.filter((g) => g.category === cat.id).length;
  }
  return counts;
}

/** Get guides for a specific role */
export function getGuidesForRole(roleId: string): FQHCGuide[] {
  return FQHC_GUIDES.filter((g) => g.targetRoles.includes(roleId));
}
