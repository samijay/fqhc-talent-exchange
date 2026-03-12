// fqhc-guides.ts
// Operational how-to guides for FQHC workers
// Every guide has primary source URLs — no unsourced claims
// Last updated: 2026-03-04

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
    id: "care_coordinator",
    en: "Care Coordinator",
    es: "Coordinador(a) de Cuidado",
  },
  {
    id: "medical_assistant",
    en: "Medical Assistant",
    es: "Asistente Médico",
  },
  { id: "registered_nurse", en: "Registered Nurse", es: "Enfermero(a) Registrado(a)" },
  {
    id: "behavioral_health",
    en: "BH Specialist",
    es: "Especialista en Salud Conductual",
  },
  { id: "case_manager", en: "Case Manager", es: "Gerente de Casos" },
  {
    id: "patient_services",
    en: "Patient Services",
    es: "Servicios al Paciente",
  },
  { id: "revenue_cycle", en: "Revenue Cycle", es: "Ciclo de Ingresos" },
  {
    id: "social-worker",
    en: "Social Worker",
    es: "Trabajador(a) Social",
  },
  {
    id: "program-manager",
    en: "Program Manager",
    es: "Gerente de Programa",
  },
  {
    id: "director-clinical-ops",
    en: "Director of Clinical Ops",
    es: "Director(a) de Operaciones Clínicas",
  },
  {
    id: "compliance-officer",
    en: "Compliance Officer",
    es: "Oficial de Cumplimiento",
  },
  {
    id: "revenue-manager",
    en: "Revenue Manager",
    es: "Gerente de Ingresos",
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
      "care_coordinator",
      "case_manager",
      "behavioral_health",
    ],
    tags: ["ecm", "calaim", "care-management", "medi-cal"],
    lastUpdated: "2026-02-25",
  },

  {
    id: "rn-co-visit",
    title: {
      en: "Same-Day Billing & Team-Based Care: What Medi-Cal Actually Allows",
      es: "Facturación del Mismo Día y Cuidado en Equipo: Lo Que Medi-Cal Realmente Permite",
    },
    summary: {
      en: "Medi-Cal and Medicare have DIFFERENT same-day billing rules for FQHCs. This guide covers what actually generates two PPS encounters under each payer, how team-based care with RNs works (and what's NOT billable), and the FQHC APM pathway that changes everything.",
      es: "Medi-Cal y Medicare tienen reglas DIFERENTES de facturación del mismo día para FQHCs. Esta guía cubre qué realmente genera dos encuentros PPS bajo cada pagador, cómo funciona el cuidado en equipo con RNs (y qué NO es facturable), y la vía APM de FQHC que lo cambia todo.",
    },
    category: "revenue-billing",
    difficulty: "intermediate",
    readTime: "10 min",
    sections: [
      {
        heading: {
          en: "⚠️ The Critical Medi-Cal vs Medicare Difference",
          es: "⚠️ La Diferencia Crítica entre Medi-Cal y Medicare",
        },
        keyPoints: [
          {
            en: "MOST IMPORTANT RULE: Under Medi-Cal, encounters with multiple providers on the same day at the same location count as ONE visit — with only two exceptions. This is California law (WIC §14132.100).",
            es: "REGLA MÁS IMPORTANTE: Bajo Medi-Cal, los encuentros con múltiples proveedores el mismo día en la misma ubicación cuentan como UNA visita — con solo dos excepciones. Esta es ley de California (WIC §14132.100).",
          },
          {
            en: "Under Medicare, a medical visit + behavioral health visit on the same day = 2 PPS payments (G0467 + G0470). Under Medi-Cal, the same combination = ONLY 1 PPS payment. This is the single biggest revenue gap for CA FQHCs.",
            es: "Bajo Medicare, una visita médica + visita de salud conductual el mismo día = 2 pagos PPS (G0467 + G0470). Bajo Medi-Cal, la misma combinación = SOLO 1 pago PPS. Esta es la mayor brecha de ingresos para FQHCs de CA.",
          },
          {
            en: "Since the vast majority of CA FQHC patients are Medi-Cal (not Medicare), the Medi-Cal rules are the ones that matter most for your revenue model. Do NOT plan revenue around Medicare same-day billing rules for your Medi-Cal population.",
            es: "Dado que la gran mayoría de pacientes de FQHCs en CA son Medi-Cal (no Medicare), las reglas de Medi-Cal son las que más importan para tu modelo de ingresos. NO planifiques ingresos basándote en las reglas de Medicare para tu población Medi-Cal.",
          },
          {
            en: "SB 316 (which would have allowed same-day medical + BH billing under Medi-Cal) did NOT pass the CA legislature. CPCA continues to advocate for this change.",
            es: "SB 316 (que habría permitido facturación médica + salud conductual el mismo día bajo Medi-Cal) NO pasó en la legislatura de CA. CPCA continúa abogando por este cambio.",
          },
        ],
      },
      {
        heading: {
          en: "What Actually Generates 2 PPS Encounters Under Medi-Cal",
          es: "Qué Realmente Genera 2 Encuentros PPS Bajo Medi-Cal",
        },
        keyPoints: [
          {
            en: "Exception 1 — MEDICAL + DENTAL on the same day: Patient sees MD for primary care, then sees Dentist for oral health = 2 PPS payments. This is the ONLY planned same-day combination that reliably generates 2 encounters under Medi-Cal.",
            es: "Excepción 1 — MÉDICA + DENTAL el mismo día: Paciente ve al MD para atención primaria, luego ve al Dentista para salud oral = 2 pagos PPS. Esta es la ÚNICA combinación planificada del mismo día que confiablemente genera 2 encuentros bajo Medi-Cal.",
          },
          {
            en: "Exception 2 — SUBSEQUENT ILLNESS OR INJURY: Patient sees MD in the morning, then returns the same day for a new medical problem (e.g., falls, allergic reaction) = 2 PPS payments. This is unplanned by definition — you cannot schedule these.",
            es: "Excepción 2 — ENFERMEDAD O LESIÓN SUBSECUENTE: Paciente ve al MD en la mañana, luego regresa el mismo día por un nuevo problema médico (ej. caída, reacción alérgica) = 2 pagos PPS. Esto es no planificado por definición.",
          },
          {
            en: "Under Medicare ONLY: Medical + BH (LCSW/psychologist) on the same day = 2 PPS payments. Use modifier 59 on the second claim. This works for your Medicare patients but NOT your Medi-Cal patients.",
            es: "Bajo Medicare SOLAMENTE: Médica + salud conductual (LCSW/psicólogo) el mismo día = 2 pagos PPS. Use modificador 59 en el segundo reclamo. Esto funciona para sus pacientes Medicare pero NO para sus pacientes Medi-Cal.",
          },
          {
            en: "CHCF estimates 50,000+ same-day BH visits at CA FQHCs go UNBILLED annually because of the Medi-Cal restriction — representing $23M-$232M in lost revenue statewide.",
            es: "CHCF estima que más de 50,000 visitas de salud conductual del mismo día en FQHCs de CA NO SE FACTURAN anualmente debido a la restricción de Medi-Cal — representando $23M-$232M en ingresos perdidos a nivel estatal.",
          },
        ],
      },
      {
        heading: {
          en: "The FQHC APM: How to Unlock Same-Day BH Billing",
          es: "El APM de FQHC: Cómo Desbloquear la Facturación de Salud Conductual del Mismo Día",
        },
        keyPoints: [
          {
            en: "The FQHC Alternative Payment Methodology (APM), launched July 2024, moves participating FQHCs from per-visit PPS to per-member-per-month (PMPM) capitation. Under APM, the same-day billing restriction is effectively RELAXED because payment is no longer visit-based.",
            es: "La Metodología de Pago Alternativa (APM) de FQHC, lanzada en julio 2024, mueve a los FQHCs participantes de PPS por visita a capitación por miembro por mes (PMPM). Bajo APM, la restricción de facturación del mismo día se RELAJA efectivamente porque el pago ya no es basado en visitas.",
          },
          {
            en: "APM explicitly lists 'same-day visits such as behavioral health and physical health visits' as enabled services. DHCS guarantees PMPM payments will not result in less revenue than PPS would have generated (reconciliation).",
            es: "APM lista explícitamente 'visitas del mismo día como visitas de salud conductual y salud física' como servicios habilitados. DHCS garantiza que los pagos PMPM no resultarán en menos ingresos de lo que PPS habría generado (reconciliación).",
          },
          {
            en: "APM is VOLUNTARY and requires DHCS application/approval. Not all FQHCs participate. Talk to your CFO/COO about whether your FQHC has applied for or joined the APM program.",
            es: "APM es VOLUNTARIO y requiere solicitud/aprobación de DHCS. No todos los FQHCs participan. Habla con tu CFO/COO sobre si tu FQHC ha solicitado o se ha unido al programa APM.",
          },
          {
            en: "Also new for 2026: CMS BHI add-on codes (G0568, G0569, G0570) create a billing pathway for behavioral health integration paid at PFS rates OUTSIDE of PPS — available to all FQHCs regardless of APM status.",
            es: "También nuevo para 2026: los códigos complementarios BHI de CMS (G0568, G0569, G0570) crean una vía de facturación para integración de salud conductual pagada a tarifas PFS FUERA del PPS — disponible para todos los FQHCs sin importar el estado APM.",
          },
        ],
      },
      {
        heading: {
          en: "PPS-Billable Provider Types in California FQHCs",
          es: "Tipos de Proveedores Facturables bajo PPS en FQHCs de California",
        },
        keyPoints: [
          {
            en: "Billable under BOTH Medicare and Medi-Cal PPS: Physicians (MD/DO), Nurse Practitioners (NP), Physician Assistants (PA), Certified Nurse-Midwives (CNM), Clinical Psychologists, LCSWs, LMFTs (since AB 1591 in 2018), Dentists (DDS/DMD), Podiatrists, Optometrists",
            es: "Facturables bajo AMBOS Medicare y Medi-Cal PPS: Médicos (MD/DO), Enfermeros Practicantes (NP), Asistentes Médicos (PA), Enfermeras Parteras Certificadas (CNM), Psicólogos Clínicos, LCSWs, LMFTs (desde AB 1591 en 2018), Dentistas (DDS/DMD), Podólogos, Optometristas",
          },
          {
            en: "NOT billable under FQHC PPS: Registered Nurses (RNs), Licensed Vocational Nurses (LVNs), Medical Assistants (MAs), Community Health Workers (CHWs), Health Educators, Dietitians, Clinical Pharmacists. DHCS explicitly states: 'RN visits are not reimbursable in FQHCs.'",
            es: "NO facturables bajo PPS de FQHC: Enfermeros Registrados (RNs), Enfermeros Vocacionales (LVNs), Asistentes Médicos (MAs), Trabajadores de Salud Comunitaria (CHWs), Educadores de Salud, Dietistas, Farmacéuticos Clínicos. DHCS declara explícitamente: 'Las visitas de RN no son reembolsables en FQHCs.'",
          },
          {
            en: "Exception: Visiting Nurses may bill PPS for homebound patients only. This is narrow and does not apply to in-clinic RN visits.",
            es: "Excepción: Las Enfermeras Visitantes pueden facturar PPS solo para pacientes confinados en casa. Esto es limitado y no aplica a visitas de RN en la clínica.",
          },
          {
            en: "New for 2024+: Mental Health Counselors (MHCs) added to Medicare PPS-billable list. CA Medi-Cal status for MHCs is still being determined.",
            es: "Nuevo para 2024+: Consejeros de Salud Mental (MHCs) agregados a la lista facturable de PPS de Medicare. El estado de Medi-Cal de CA para MHCs aún se está determinando.",
          },
        ],
      },
      {
        heading: {
          en: "Team-Based Care: RN-Led Visits with Provider Assessment",
          es: "Cuidado en Equipo: Visitas Lideradas por RN con Evaluación del Proveedor",
        },
        keyPoints: [
          {
            en: "The team-based care model: RN conducts the bulk of the patient visit (history, vitals, disease education, care coordination, medication review). Then a PPS-billable provider (MD/NP/PA) performs a face-to-face clinical assessment and documents their encounter. This generates 1 PPS encounter.",
            es: "El modelo de cuidado en equipo: RN realiza la mayor parte de la visita del paciente (historia, signos vitales, educación sobre enfermedades, coordinación de cuidados, revisión de medicamentos). Luego un proveedor facturable PPS (MD/NP/PA) realiza una evaluación clínica cara a cara y documenta su encuentro. Esto genera 1 encuentro PPS.",
          },
          {
            en: "CRITICAL COMPLIANCE RULE: The PPS-billable provider MUST have a direct face-to-face encounter with the patient. Co-signing an RN's note WITHOUT seeing the patient does NOT make the encounter billable. FQHCs CANNOT use 'incident-to' billing like private practices.",
            es: "REGLA CRÍTICA DE CUMPLIMIENTO: El proveedor facturable PPS DEBE tener un encuentro cara a cara directo con el paciente. Co-firmar la nota de un RN SIN ver al paciente NO hace el encuentro facturable. Los FQHCs NO PUEDEN usar facturación 'incidental a' como las prácticas privadas.",
          },
          {
            en: "High-throughput model: 1 MD/NP rotates between exam rooms, conducting brief (5-10 min) assessments after RNs complete the comprehensive visit work. This allows 1 provider to support 3-5 RNs and generate 30-50+ billable encounters per day (vs 16-20 if seeing all patients independently).",
            es: "Modelo de alto rendimiento: 1 MD/NP rota entre salas de examen, realizando evaluaciones breves (5-10 min) después de que los RNs completen el trabajo integral de la visita. Esto permite que 1 proveedor apoye 3-5 RNs y genere 30-50+ encuentros facturables por día (vs 16-20 si ve a todos los pacientes independientemente).",
          },
          {
            en: "Best for chronic disease management: diabetes follow-ups, hypertension management, COPD education, medication reconciliation — where the RN handles education and care planning while the provider handles clinical assessment and prescribing.",
            es: "Ideal para manejo de enfermedades crónicas: seguimiento de diabetes, manejo de hipertensión, educación sobre EPOC, reconciliación de medicamentos — donde el RN maneja la educación y planificación mientras el proveedor maneja la evaluación clínica y prescripción.",
          },
          {
            en: "Breakeven math: At $225 PPS rate and ~$1,400/day provider cost, only 6-7 encounters per day are needed to cover the provider's cost. Everything beyond that is margin. A team of 4 RNs generating 12 patients each = 48 encounters × $225 = $10,800/day.",
            es: "Matemática de punto de equilibrio: A $225 tarifa PPS y ~$1,400/día costo del proveedor, solo se necesitan 6-7 encuentros por día para cubrir el costo. Todo más allá es margen. Un equipo de 4 RNs generando 12 pacientes cada uno = 48 encuentros × $225 = $10,800/día.",
          },
        ],
      },
      {
        heading: {
          en: "Same-Day Scenarios: What's Billable and What's Not",
          es: "Escenarios del Mismo Día: Qué Es Facturable y Qué No",
        },
        keyPoints: [
          {
            en: "✅ BILLABLE (Medi-Cal): Patient sees MD for diabetes management, then Dentist for periodontal treatment → 2 PPS encounters. Medical + Dental is the only planned same-day combination that works under Medi-Cal.",
            es: "✅ FACTURABLE (Medi-Cal): Paciente ve al MD para manejo de diabetes, luego al Dentista para tratamiento periodontal → 2 encuentros PPS. Médica + Dental es la única combinación planificada del mismo día que funciona bajo Medi-Cal.",
          },
          {
            en: "✅ BILLABLE (Medicare only): Patient sees NP for annual wellness, then LCSW for depression therapy → 2 PPS encounters. But under Medi-Cal this is ONLY 1 PPS encounter.",
            es: "✅ FACTURABLE (Solo Medicare): Paciente ve al NP para bienestar anual, luego al LCSW para terapia de depresión → 2 encuentros PPS. Pero bajo Medi-Cal esto es SOLO 1 encuentro PPS.",
          },
          {
            en: "✅ BILLABLE (Both): RN leads a diabetes education visit, MD/NP performs face-to-face clinical assessment → 1 PPS encounter (team-based model). This is billable under both payers because the MD/NP sees the patient.",
            es: "✅ FACTURABLE (Ambos): RN lidera una visita de educación sobre diabetes, MD/NP realiza evaluación clínica cara a cara → 1 encuentro PPS (modelo en equipo). Facturable bajo ambos pagadores porque el MD/NP ve al paciente.",
          },
          {
            en: "❌ NOT BILLABLE: RN sees patient, MD co-signs the note without seeing the patient → NOT a billable encounter. This is a compliance risk. The MD must have face-to-face time with the patient.",
            es: "❌ NO FACTURABLE: RN ve al paciente, MD co-firma la nota sin ver al paciente → NO es un encuentro facturable. Esto es un riesgo de cumplimiento. El MD debe tener tiempo cara a cara con el paciente.",
          },
          {
            en: "❌ NOT BILLABLE: MA takes vitals and gives injection, no provider face-to-face → Not a billable visit. MA services are included in the provider's encounter.",
            es: "❌ NO FACTURABLE: MA toma signos vitales y pone inyección, sin cara a cara con proveedor → No es una visita facturable. Los servicios de MA están incluidos en el encuentro del proveedor.",
          },
        ],
      },
      {
        heading: {
          en: "Documentation Requirements for Compliance",
          es: "Requisitos de Documentación para Cumplimiento",
        },
        keyPoints: [
          {
            en: "For same-day dual encounters: Each provider must write a SEPARATE progress note with chief complaint, assessment, plan, and medical necessity. An auditor must be able to understand each encounter independently.",
            es: "Para encuentros duales del mismo día: Cada proveedor debe escribir una nota de progreso SEPARADA con queja principal, evaluación, plan y necesidad médica. Un auditor debe poder entender cada encuentro independientemente.",
          },
          {
            en: "For team-based (RN + provider): The provider's note must document THEIR face-to-face assessment — not just 'reviewed RN's note and agree.' Include what they observed, their clinical assessment, and the plan.",
            es: "Para cuidado en equipo (RN + proveedor): La nota del proveedor debe documentar SU evaluación cara a cara — no solo 'revisé la nota del RN y estoy de acuerdo.' Incluir lo que observaron, su evaluación clínica y el plan.",
          },
          {
            en: "Time documentation: Note start and end times for each encounter. This is especially important for BH encounters and care coordination services.",
            es: "Documentación de tiempo: Anotar hora de inicio y fin de cada encuentro. Esto es especialmente importante para encuentros de salud conductual y servicios de coordinación de cuidado.",
          },
          {
            en: "Billing fraud red flags: Two identical encounter notes from different providers, encounter notes that reference each other as the same visit, and provider co-signatures without documented face-to-face contact.",
            es: "Señales de fraude: Dos notas de encuentro idénticas de diferentes proveedores, notas que hacen referencia entre sí como la misma visita, y co-firmas de proveedores sin contacto cara a cara documentado.",
          },
        ],
      },
    ],
    primarySourceUrl:
      "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=14132.100.&lawCode=WIC",
    primarySourceOrg: "California Legislature (WIC §14132.100)",
    additionalSources: [
      {
        label: "CHCF: Same-Day Billing for Medical & Mental Health at FQHCs",
        url: "https://www.chcf.org/resource/same-day-billing-medical-mental-health-services-fqhcs/",
      },
      {
        label: "DHCS FQHC/RHC Outpatient Services Manual (March 2024)",
        url: "https://mcweb.apps.prd.cammis.medi-cal.ca.gov/file/manual?fn=rural.pdf",
      },
      {
        label: "DHCS FQHC APM Program Guide",
        url: "https://www.dhcs.ca.gov/services/Documents/DirectedPymts/FQHC-APM-Program-Guide.pdf",
      },
      {
        label: "CMS FQHC PPS Billing Guide (Noridian)",
        url: "https://med.noridianmedicare.com/web/jea/provider-types/fqhc/fqhc-billing-guide",
      },
      {
        label: "NACHC FQHC Payment Guide (2025)",
        url: "https://www.nachc.org/wp-content/uploads/2025/05/FQHC-Payment-Guide.pdf",
      },
    ],
    targetRoles: ["registered_nurse", "medical_assistant", "care_coordinator"],
    tags: ["same-day-billing", "medi-cal", "pps", "billing", "team-based-care", "revenue", "apm", "compliance"],
    lastUpdated: "2026-03-06",
  },

  {
    id: "same-day-bh-integration",
    title: {
      en: "Same-Day Behavioral Health Integration: Medicare vs. Medi-Cal Rules",
      es: "Integración de Salud Conductual el Mismo Día: Reglas Medicare vs. Medi-Cal",
    },
    summary: {
      en: "Same-day medical + BH generates 2 PPS encounters under MEDICARE — but only 1 under MEDI-CAL. Learn the Medi-Cal limitation, the FQHC APM workaround, and why integrated BH still matters for quality even when billing is constrained.",
      es: "Médica + salud conductual el mismo día genera 2 encuentros PPS bajo MEDICARE — pero solo 1 bajo MEDI-CAL. Aprende la limitación de Medi-Cal, la alternativa APM de FQHC, y por qué la salud conductual integrada importa para la calidad aún con restricciones de facturación.",
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
            en: "⚠️ PAYER MATTERS: Under MEDICARE, a medical visit + BH visit on the same day = 2 PPS encounters (G0467 + G0470, modifier 59). Under MEDI-CAL, the same combination = ONLY 1 PPS payment. CA law (WIC §14132.100) restricts same-day multi-provider visits to 1 encounter.",
            es: "⚠️ EL PAGADOR IMPORTA: Bajo MEDICARE, una visita médica + visita BH el mismo día = 2 encuentros PPS (G0467 + G0470, modificador 59). Bajo MEDI-CAL, la misma combinación = SOLO 1 pago PPS. La ley de CA (WIC §14132.100) restringe visitas del mismo día con múltiples proveedores a 1 encuentro.",
          },
          {
            en: "For your Medicare patients: Qualifying BH providers who generate a separate encounter include clinical psychologists, LCSWs, LMFTs, and (new for 2024) mental health counselors. The BH visit must be a distinct service with its own documentation.",
            es: "Para sus pacientes Medicare: Los proveedores BH calificados que generan un encuentro separado incluyen psicólogos clínicos, LCSWs, LMFTs y (nuevo para 2024) consejeros de salud mental. La visita BH debe ser un servicio distinto con su propia documentación.",
          },
          {
            en: "For your Medi-Cal patients: Same-day BH is NOT separately billable under standard PPS. BUT if your FQHC participates in the FQHC APM (Alternative Payment Methodology, launched July 2024), the per-member-per-month model effectively relaxes this restriction.",
            es: "Para sus pacientes Medi-Cal: La salud conductual del mismo día NO es facturable por separado bajo PPS estándar. PERO si su FQHC participa en el APM de FQHC (lanzado julio 2024), el modelo por miembro por mes relaja efectivamente esta restricción.",
          },
          {
            en: "Even when you can't bill separately, integrated BH still improves quality metrics (HEDIS, UDS), reduces no-shows, and drives better outcomes — which matter for managed care contracts, HRSA quality badges, and value-based payment arrangements.",
            es: "Incluso cuando no puede facturar por separado, la salud conductual integrada mejora las métricas de calidad (HEDIS, UDS), reduce inasistencias y genera mejores resultados — lo cual importa para contratos de atención administrada, insignias de calidad HRSA y arreglos de pago basados en valor.",
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
        url: "https://www.nachc.org/focus-areas/policy-matters/behavioral-health/",
      },
    ],
    targetRoles: [
      "behavioral_health",
      "registered_nurse",
      "care_coordinator",
      "social-worker",
    ],
    tags: [
      "behavioral_health",
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
        url: "https://www.nachc.org/topic/finance/",
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
      "care_coordinator",
      "medical_assistant",
      "registered_nurse",
      "revenue_cycle",
      "patient_services",
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
      "https://www.cms.gov/files/document/implementing-national-clas-lessons-field.pdf",
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
        url: "https://www.nachc.org/research-and-data/research-fact-sheets-and-infographics/",
      },
    ],
    targetRoles: [
      "chw",
      "care_coordinator",
      "medical_assistant",
      "patient_services",
      "registered_nurse",
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
      "https://www.nachc.org/topic/finance/",
    primarySourceOrg: "NACHC",
    additionalSources: [
      {
        label: "CMS FQHC Billing Guide",
        url: "https://www.cms.gov/files/document/mln006397-federally-qualified-health-center.pdf",
      },
      {
        label: "HRSA UDS Manual",
        url: "https://bphc.hrsa.gov/data-reporting/uds-training-and-technical-assistance",
      },
    ],
    targetRoles: [
      "patient_services",
      "medical_assistant",
      "registered_nurse",
      "care_coordinator",
      "revenue_cycle",
    ],
    tags: ["revenue_cycle", "billing", "denials", "documentation", "claims"],
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
      "care_coordinator",
      "case_manager",
      "behavioral_health",
      "registered_nurse",
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
        url: "https://www.nachc.org/topic/finance/",
      },
    ],
    targetRoles: [
      "chw",
      "care_coordinator",
      "registered_nurse",
      "medical_assistant",
      "behavioral_health",
      "case_manager",
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
        url: "https://www.nachc.org/policy-advocacy/policy-priorities/health-center-funding/",
      },
      {
        label: "CA HCAI Workforce Programs",
        url: "https://hcai.ca.gov/workforce/",
      },
    ],
    targetRoles: [
      "chw",
      "care_coordinator",
      "medical_assistant",
      "registered_nurse",
      "behavioral_health",
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

  /* ============================================================== */
  /*  NEW GUIDES (2026-03-04)                                        */
  /* ============================================================== */
  {
    id: "hrsa-osv-preparation",
    title: {
      en: "HRSA Operational Site Visit (OSV) Preparation",
      es: "Preparación para la Visita Operacional de Sitio (OSV) de HRSA",
    },
    summary: {
      en: "How FQHCs prepare for and succeed in HRSA compliance reviews. Covers the 19 program requirements, common findings, documentation preparation, and governance readiness.",
      es: "Cómo los FQHCs se preparan y tienen éxito en las revisiones de cumplimiento de HRSA. Cubre los 19 requisitos del programa, hallazgos comunes, preparación de documentación y preparación de gobernanza.",
    },
    category: "programs-compliance",
    difficulty: "advanced",
    readTime: "18 min",
    sections: [
      {
        heading: {
          en: "Understanding the OSV Process",
          es: "Entendiendo el Proceso de OSV",
        },
        keyPoints: [
          {
            en: "HRSA conducts Operational Site Visits every 3 years during the project period of your Section 330 grant",
            es: "HRSA realiza Visitas Operacionales de Sitio cada 3 años durante el período de proyecto de su subvención Sección 330",
          },
          {
            en: "The Site Visit Protocol (SVP) has been revised as of November 2025 — ensure you're reviewing the latest version",
            es: "El Protocolo de Visita de Sitio fue revisado en noviembre de 2025 — asegúrese de revisar la versión más reciente",
          },
          {
            en: "OSVs evaluate compliance across 19 program requirements derived from Section 330 of the PHS Act",
            es: "Las OSV evalúan cumplimiento en 19 requisitos de programa derivados de la Sección 330 de la Ley PHS",
          },
          {
            en: "Site visits include document review, staff interviews, board member interviews, and patient care area walkthroughs",
            es: "Las visitas incluyen revisión de documentos, entrevistas al personal, entrevistas a miembros de la junta y recorridos por áreas de atención",
          },
        ],
      },
      {
        heading: {
          en: "The 19 Program Requirements",
          es: "Los 19 Requisitos del Programa",
        },
        keyPoints: [
          {
            en: "Requirements fall into 6 domains: Need, Services, Management & Finance, Governance, Other Federal Requirements, and Conditions of Award",
            es: "Los requisitos caen en 6 dominios: Necesidad, Servicios, Gestión y Finanzas, Gobernanza, Otros Requisitos Federales y Condiciones de la Subvención",
          },
          {
            en: "Most common deficiencies: sliding fee discount program (Chapter 9), quality improvement/assurance (Chapter 10), and board composition (Chapter 19)",
            es: "Deficiencias más comunes: programa de descuento de escala móvil, mejora/aseguramiento de calidad, y composición de la junta",
          },
          {
            en: "Every requirement maps to specific chapters in the HRSA Compliance Manual — use it as your primary study guide",
            es: "Cada requisito se mapea a capítulos específicos en el Manual de Cumplimiento de HRSA",
          },
          {
            en: "Conditions of Award are specific to your grant — review your most recent Notice of Award for center-specific requirements",
            es: "Las Condiciones de la Subvención son específicas de su centro — revise su Aviso de Subvención más reciente",
          },
        ],
      },
      {
        heading: {
          en: "Documentation Preparation Checklist",
          es: "Lista de Verificación de Preparación de Documentación",
        },
        keyPoints: [
          {
            en: "Compile board meeting minutes for the last 3 years — reviewers will check attendance, quorum, and evidence of required annual approvals",
            es: "Compile actas de reuniones de la junta de los últimos 3 años — los revisores verificarán asistencia, quórum y evidencia de aprobaciones anuales requeridas",
          },
          {
            en: "Update your sliding fee discount schedule and verify it matches actual practice at all sites",
            es: "Actualice su programa de descuento de escala móvil y verifique que coincida con la práctica real en todos los sitios",
          },
          {
            en: "Prepare your Quality Improvement/Quality Assurance plan with documented evidence of implementation and annual review",
            es: "Prepare su plan de QI/QA con evidencia documentada de implementación y revisión anual",
          },
          {
            en: "Ensure credentialing and privileging files are complete for all licensed/certified providers — this is a frequent finding",
            es: "Asegúrese de que los archivos de credencialización y privilegios estén completos para todos los proveedores",
          },
        ],
      },
      {
        heading: {
          en: "Governance & Board Readiness",
          es: "Gobernanza y Preparación de la Junta",
        },
        keyPoints: [
          {
            en: "Board must be 51%+ patient members — verify current composition and have documentation ready",
            es: "La junta debe tener 51%+ de miembros pacientes — verifique la composición actual y tenga documentación lista",
          },
          {
            en: "Board must provide ongoing oversight of health center operations including annual approval of key policies",
            es: "La junta debe proporcionar supervisión continua incluyendo aprobación anual de políticas clave",
          },
          {
            en: "Prepare board members for potential interviews — they should be able to articulate the center's mission, strategic plan, and their governance role",
            es: "Prepare a los miembros de la junta para posibles entrevistas — deben poder articular la misión, plan estratégico y su rol de gobernanza",
          },
          {
            en: "Conflict of interest policies must be current and signed by all board members annually",
            es: "Las políticas de conflicto de interés deben estar vigentes y firmadas por todos los miembros anualmente",
          },
        ],
      },
      {
        heading: {
          en: "After the Visit: Responding to Findings",
          es: "Después de la Visita: Respondiendo a Hallazgos",
        },
        keyPoints: [
          {
            en: "HRSA issues findings as Conditions which require corrective action within a specified timeframe",
            es: "HRSA emite hallazgos como Condiciones que requieren acción correctiva dentro de un plazo especificado",
          },
          {
            en: "Progressive Action process begins if Conditions are not resolved — can ultimately lead to designation withdrawal",
            es: "El proceso de Acción Progresiva comienza si las Condiciones no se resuelven — puede llevar a la retirada de la designación",
          },
          {
            en: "Create a corrective action committee immediately with responsible owners, timelines, and board oversight",
            es: "Cree un comité de acción correctiva inmediatamente con responsables, plazos y supervisión de la junta",
          },
          {
            en: "Use findings as a quality improvement opportunity — many FQHCs that address findings systematically end up with stronger programs",
            es: "Use los hallazgos como oportunidad de mejora — muchos FQHCs que abordan hallazgos sistemáticamente terminan con programas más fuertes",
          },
        ],
      },
    ],
    primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual",
    primarySourceOrg: "HRSA Bureau of Primary Health Care",
    additionalSources: [
      {
        label: "HRSA Site Visit Protocol (SVP)",
        url: "https://bphc.hrsa.gov/compliance/site-visits/site-visit-protocol",
      },
      {
        label: "HRSA Compliance Manual Chapter 19: Board Authority",
        url: "https://bphc.hrsa.gov/compliance/compliance-manual/chapter19",
      },
      {
        label: "NACHC Governance Guide for Health Center Boards",
        url: "https://cdn.ymaws.com/www.ohiochc.org/resource/resmgr/docs/Gov_Guide_for_CHC_Boards_NAC.pdf",
      },
    ],
    targetRoles: ["program-manager", "director-clinical-ops", "compliance-officer"],
    tags: ["hrsa", "osv", "compliance", "site-visit", "governance"],
    lastUpdated: "2026-03-04",
  },
  {
    id: "ryan-white-program",
    title: {
      en: "Ryan White HIV/AIDS Program for FQHCs",
      es: "Programa Ryan White VIH/SIDA para FQHCs",
    },
    summary: {
      en: "How FQHCs can access and manage Ryan White funding — covering Parts A through D, ADAP coordination, service requirements, data reporting (RSR), and quality management.",
      es: "Cómo los FQHCs pueden acceder y gestionar fondos Ryan White — cubriendo Partes A a D, coordinación ADAP, requisitos de servicio, reportes de datos (RSR) y gestión de calidad.",
    },
    category: "programs-compliance",
    difficulty: "intermediate",
    readTime: "15 min",
    sections: [
      {
        heading: {
          en: "Understanding Ryan White Parts A–D",
          es: "Entendiendo las Partes A–D de Ryan White",
        },
        keyPoints: [
          {
            en: "Part A: Emergency relief for Eligible Metropolitan Areas (EMAs) and Transitional Grant Areas (TGAs) — formula-based and competitive grants",
            es: "Parte A: Ayuda de emergencia para Áreas Metropolitanas Elegibles (EMAs) y Áreas de Subvenciones de Transición (TGAs) — subvenciones basadas en fórmula y competitivas",
          },
          {
            en: "Part B: Grants to states/territories for core medical and support services, including the AIDS Drug Assistance Program (ADAP)",
            es: "Parte B: Subvenciones a estados/territorios para servicios médicos esenciales y de apoyo, incluyendo el Programa de Asistencia de Medicamentos para SIDA (ADAP)",
          },
          {
            en: "Part C: Early Intervention Services (EIS) grants directly to FQHCs and other providers — the most accessible part for health centers",
            es: "Parte C: Subvenciones de Servicios de Intervención Temprana (EIS) directamente a FQHCs y otros proveedores — la parte más accesible para centros de salud",
          },
          {
            en: "Part D: Women, infants, children, and youth services — family-centered care models",
            es: "Parte D: Servicios para mujeres, infantes, niños y jóvenes — modelos de atención centrados en la familia",
          },
        ],
      },
      {
        heading: {
          en: "FQHC Eligibility and Service Requirements",
          es: "Elegibilidad de FQHCs y Requisitos de Servicio",
        },
        keyPoints: [
          {
            en: "FQHCs are eligible for Part C (EIS) grants and can be Part A/B subrecipients through local planning councils",
            es: "Los FQHCs son elegibles para subvenciones Parte C (EIS) y pueden ser subreceptores de Parte A/B a través de consejos de planificación locales",
          },
          {
            en: "Ryan White is 'payer of last resort' — services must be billed to all available insurance first, including Medi-Cal and Medicare",
            es: "Ryan White es 'pagador de último recurso' — los servicios deben facturarse primero a todos los seguros disponibles, incluyendo Medi-Cal y Medicare",
          },
          {
            en: "Core medical services must constitute at least 75% of Part A/B funding; support services can be up to 25%",
            es: "Los servicios médicos esenciales deben constituir al menos 75% de los fondos de Parte A/B; los servicios de apoyo pueden ser hasta 25%",
          },
          {
            en: "Required services include outpatient care, oral health, mental health, substance use treatment, medical case management, and health insurance assistance",
            es: "Los servicios requeridos incluyen atención ambulatoria, salud oral, salud mental, tratamiento de uso de sustancias, gestión de casos médicos y asistencia con seguro de salud",
          },
        ],
      },
      {
        heading: {
          en: "Data Reporting: The Ryan White Services Report (RSR)",
          es: "Reportes de Datos: El Reporte de Servicios Ryan White (RSR)",
        },
        keyPoints: [
          {
            en: "All Ryan White recipients must submit the annual RSR through HRSA's Electronic Handbooks (EHBs)",
            es: "Todos los receptores de Ryan White deben enviar el RSR anual a través de los Manuales Electrónicos de HRSA (EHBs)",
          },
          {
            en: "RSR captures client-level data including demographics, services received, clinical outcomes (viral load, CD4 count), and insurance status",
            es: "El RSR captura datos a nivel de cliente incluyendo demografía, servicios recibidos, resultados clínicos (carga viral, conteo CD4) y estado de seguro",
          },
          {
            en: "FQHCs must track Ryan White clients separately in their EHR — ensure your Epic/eClinicalWorks system can generate RSR-compatible reports",
            es: "Los FQHCs deben rastrear clientes de Ryan White por separado en su EHR — asegúrese de que su sistema Epic/eClinicalWorks pueda generar reportes compatibles con RSR",
          },
          {
            en: "Key performance measures: viral suppression rate (target: 80%+), retention in care (2+ visits in 12 months), and housing stability",
            es: "Medidas clave de rendimiento: tasa de supresión viral (objetivo: 80%+), retención en cuidado (2+ visitas en 12 meses) y estabilidad de vivienda",
          },
        ],
      },
      {
        heading: {
          en: "ADAP Coordination in California",
          es: "Coordinación de ADAP en California",
        },
        keyPoints: [
          {
            en: "California's ADAP provides medications and insurance assistance for low-income people living with HIV (income up to 500% FPL)",
            es: "El ADAP de California proporciona medicamentos y asistencia con seguros para personas de bajos ingresos que viven con VIH (ingresos hasta 500% FPL)",
          },
          {
            en: "FQHCs should help eligible patients enroll in ADAP to cover antiretroviral medications and reduce 340B drug costs",
            es: "Los FQHCs deben ayudar a pacientes elegibles a inscribirse en ADAP para cubrir medicamentos antirretrovirales y reducir costos de medicamentos 340B",
          },
          {
            en: "ADAP enrollment reduces the FQHC's uncompensated care burden — it pays for medications that would otherwise come from the 340B program margin",
            es: "La inscripción en ADAP reduce la carga de atención no compensada del FQHC — paga por medicamentos que de otro modo vendrían del margen del programa 340B",
          },
          {
            en: "Coordinate with your local Office of AIDS (OA) and county HIV planning bodies for referrals and service coordination",
            es: "Coordine con su Oficina de SIDA local (OA) y cuerpos de planificación de VIH del condado para referencias y coordinación de servicios",
          },
        ],
      },
    ],
    primarySourceUrl: "https://ryanwhite.hrsa.gov/about/parts-and-initiatives",
    primarySourceOrg: "HRSA HIV/AIDS Bureau",
    additionalSources: [
      {
        label: "Ryan White Legislation",
        url: "https://ryanwhite.hrsa.gov/about/legislation",
      },
      {
        label: "HRSA Ryan White Data Reports (RSR)",
        url: "https://ryanwhite.hrsa.gov/data/reports",
      },
      {
        label: "NASTAD ADAP Overview",
        url: "https://nastad.org/adap",
      },
    ],
    targetRoles: ["program-manager", "care_coordinator", "director-clinical-ops"],
    tags: ["ryan-white", "hiv", "aids", "grants", "adap", "compliance"],
    lastUpdated: "2026-03-04",
  },
  {
    id: "grant-lifecycle-management",
    title: {
      en: "Grant Lifecycle Management for FQHCs",
      es: "Gestión del Ciclo de Vida de Subvenciones para FQHCs",
    },
    summary: {
      en: "End-to-end guide for managing FQHC grants — from identifying opportunities through compliance reporting. Covers HRSA Section 330, state grants, and private foundations.",
      es: "Guía completa para gestionar subvenciones de FQHCs — desde identificar oportunidades hasta reportes de cumplimiento. Cubre HRSA Sección 330, subvenciones estatales y fundaciones privadas.",
    },
    category: "revenue-billing",
    difficulty: "intermediate",
    readTime: "14 min",
    sections: [
      {
        heading: {
          en: "HRSA Section 330 — Your Core Grant",
          es: "HRSA Sección 330 — Su Subvención Principal",
        },
        keyPoints: [
          {
            en: "Section 330 grants are the foundational funding for all FQHCs — they define your status as a federally qualified health center",
            es: "Las subvenciones Sección 330 son el financiamiento fundamental para todos los FQHCs — definen su estatus como centro de salud federalmente calificado",
          },
          {
            en: "Grant cycles typically run 3 years with annual Budget Period Renewal (BPR) applications required each year",
            es: "Los ciclos de subvención típicamente duran 3 años con solicitudes anuales de Renovación del Período de Presupuesto (BPR) requeridas cada año",
          },
          {
            en: "Key funding streams: Health Center Program (H80), Service Area Competition (SAC), New Access Points (NAP), and Expanded Services supplements",
            es: "Flujos clave de financiamiento: Programa de Centros de Salud (H80), Competencia de Área de Servicio (SAC), Nuevos Puntos de Acceso (NAP) y suplementos de Servicios Expandidos",
          },
          {
            en: "Losing Section 330 designation means losing FQHC status, PPS reimbursement, 340B eligibility, FTCA malpractice coverage, and NHSC site eligibility",
            es: "Perder la designación Sección 330 significa perder el estatus de FQHC, reembolso PPS, elegibilidad 340B, cobertura de mala praxis FTCA y elegibilidad de sitio NHSC",
          },
        ],
      },
      {
        heading: {
          en: "Identifying and Pursuing Opportunities",
          es: "Identificando y Buscando Oportunidades",
        },
        keyPoints: [
          {
            en: "Monitor Grants.gov and HRSA's funding page monthly — key deadlines include Service Area Competition (typically spring) and supplement opportunities",
            es: "Monitoree Grants.gov y la página de financiamiento de HRSA mensualmente — fechas clave incluyen la Competencia de Área de Servicio (típicamente primavera) y oportunidades de suplementos",
          },
          {
            en: "State-level grants: California offers DHCS and HCAI grants for specific programs like perinatal care, behavioral health integration, and workforce development",
            es: "Subvenciones estatales: California ofrece subvenciones de DHCS y HCAI para programas específicos como atención perinatal, integración de salud conductual y desarrollo de fuerza laboral",
          },
          {
            en: "Private foundations: Robert Wood Johnson Foundation, The California Endowment, Blue Shield of California Foundation, and local community foundations fund FQHC programs",
            es: "Fundaciones privadas: Robert Wood Johnson Foundation, The California Endowment, Blue Shield of California Foundation y fundaciones comunitarias locales financian programas de FQHCs",
          },
          {
            en: "Build a grants calendar with submission deadlines, reporting due dates, and budget period start/end dates for all active grants",
            es: "Construya un calendario de subvenciones con fechas de envío, fechas de reportes y fechas de inicio/fin del período de presupuesto para todas las subvenciones activas",
          },
        ],
      },
      {
        heading: {
          en: "Budget Development and Justification",
          es: "Desarrollo y Justificación del Presupuesto",
        },
        keyPoints: [
          {
            en: "HRSA uses SF-424 forms — budget must align with scope of project and demonstrate reasonable, allocable, and allowable costs",
            es: "HRSA usa formularios SF-424 — el presupuesto debe alinearse con el alcance del proyecto y demostrar costos razonables, asignables y permitidos",
          },
          {
            en: "Direct costs: personnel (salaries + fringe), supplies, contractual, travel, equipment. Indirect costs: negotiate a rate with your cognizant agency",
            es: "Costos directos: personal (salarios + beneficios), suministros, contractuales, viajes, equipo. Costos indirectos: negocie una tasa con su agencia cognoscente",
          },
          {
            en: "Budget justification narrative is as important as the numbers — explain why each line item supports the project goals",
            es: "La narrativa de justificación del presupuesto es tan importante como los números — explique por qué cada partida apoya los objetivos del proyecto",
          },
          {
            en: "Common budget mistakes: underestimating fringe benefits, forgetting audit costs, not budgeting for EHR upgrades tied to reporting requirements",
            es: "Errores comunes de presupuesto: subestimar beneficios complementarios, olvidar costos de auditoría, no presupuestar actualizaciones de EHR relacionadas con requisitos de reportes",
          },
        ],
      },
      {
        heading: {
          en: "Compliance and Reporting",
          es: "Cumplimiento y Reportes",
        },
        keyPoints: [
          {
            en: "Uniform Data System (UDS) reporting is required annually by February 15 — this is the single most important operational report for FQHCs",
            es: "El reporte del Sistema de Datos Uniforme (UDS) se requiere anualmente antes del 15 de febrero — este es el reporte operacional más importante para los FQHCs",
          },
          {
            en: "Federal Financial Report (FFR/SF-425) is due annually and must reconcile grant expenditures with your general ledger",
            es: "El Reporte Financiero Federal (FFR/SF-425) se debe anualmente y debe reconciliar los gastos de la subvención con su libro mayor",
          },
          {
            en: "Single Audit (2 CFR 200) is required when your organization spends $750,000+ in federal funds in a fiscal year",
            es: "La Auditoría Única (2 CFR 200) se requiere cuando su organización gasta $750,000+ en fondos federales en un año fiscal",
          },
          {
            en: "Maintain a compliance calendar: UDS (Feb 15), FFR (varies by grant), BPR (varies), Single Audit (within 9 months of fiscal year end)",
            es: "Mantenga un calendario de cumplimiento: UDS (15 feb), FFR (varía por subvención), BPR (varía), Auditoría Única (dentro de 9 meses del fin del año fiscal)",
          },
        ],
      },
      {
        heading: {
          en: "Grant Renewal and Sustainability Planning",
          es: "Renovación de Subvenciones y Planificación de Sostenibilidad",
        },
        keyPoints: [
          {
            en: "Start BPR applications 90 days before the budget period ends — early preparation prevents rushed submissions and audit findings",
            es: "Comience las solicitudes de BPR 90 días antes de que termine el período de presupuesto — la preparación temprana previene envíos apresurados y hallazgos de auditoría",
          },
          {
            en: "Track grant-funded positions separately in your HR system — if a grant ends, you need a plan for those staff (absorption, reassignment, or reduction)",
            es: "Rastree las posiciones financiadas por subvenciones por separado en su sistema de RH — si una subvención termina, necesita un plan para ese personal (absorción, reasignación o reducción)",
          },
          {
            en: "Diversify: the most resilient FQHCs have 4-6 active grant streams beyond Section 330 so no single grant loss is existential",
            es: "Diversifique: los FQHCs más resilientes tienen 4-6 flujos de subvenciones activos más allá de Sección 330 para que ninguna pérdida de subvención sea existencial",
          },
          {
            en: "Build sustainability into every grant application — funders want to know how the program will continue after their funding ends",
            es: "Integre sostenibilidad en cada solicitud de subvención — los financiadores quieren saber cómo continuará el programa después de que termine su financiamiento",
          },
        ],
      },
    ],
    primarySourceUrl: "https://bphc.hrsa.gov/funding/funding-opportunities",
    primarySourceOrg: "HRSA Bureau of Primary Health Care",
    additionalSources: [
      {
        label: "Grants.gov — Federal Grant Search",
        url: "https://www.grants.gov/",
      },
      {
        label: "HRSA Budget Period Renewal Application Guide",
        url: "https://bphc.hrsa.gov/funding/budget-period-renewal",
      },
      {
        label: "NACHC Grant Support Resources",
        url: "https://www.nachc.org/focus-areas/policy-matters/",
      },
    ],
    targetRoles: ["program-manager", "director-clinical-ops", "revenue-manager"],
    tags: ["grants", "hrsa", "section-330", "budget", "compliance", "reporting"],
    lastUpdated: "2026-03-04",
  },
  {
    id: "remote-care-operations",
    title: {
      en: "Remote Care Operations for FQHCs",
      es: "Operaciones de Atención Remota para FQHCs",
    },
    summary: {
      en: "Setting up telehealth and remote administrative operations at an FQHC. Covers technology requirements, Medi-Cal billing codes, staffing models, HIPAA compliance, and patient engagement strategies.",
      es: "Configurar operaciones de telesalud y administración remota en un FQHC. Cubre requisitos de tecnología, códigos de facturación Medi-Cal, modelos de personal, cumplimiento HIPAA y estrategias de participación del paciente.",
    },
    category: "clinical-workflows",
    difficulty: "intermediate",
    readTime: "16 min",
    sections: [
      {
        heading: {
          en: "Technology Requirements and Setup",
          es: "Requisitos de Tecnología y Configuración",
        },
        keyPoints: [
          {
            en: "FQHCs need HIPAA-compliant video platforms — Doxy.me, Zoom for Healthcare, and EHR-integrated telehealth (Epic MyChart, eClinicalWorks) are common choices",
            es: "Los FQHCs necesitan plataformas de video compatibles con HIPAA — Doxy.me, Zoom for Healthcare y telesalud integrada con EHR (Epic MyChart, eClinicalWorks) son opciones comunes",
          },
          {
            en: "Audio-only visits (telephone) are reimbursable for established patients under Medi-Cal — but require documentation of why video wasn't used",
            es: "Las visitas solo de audio (teléfono) son reembolsables para pacientes establecidos bajo Medi-Cal — pero requieren documentación de por qué no se usó video",
          },
          {
            en: "Ensure patient-side technology support: lend tablets, provide WiFi hotspots for underserved patients, and train staff to troubleshoot common issues",
            es: "Asegure soporte tecnológico del lado del paciente: preste tabletas, proporcione puntos WiFi para pacientes desatendidos y capacite al personal para resolver problemas comunes",
          },
          {
            en: "Bandwidth requirements: minimum 1.5 Mbps up/down for reliable video; test all provider locations including home offices",
            es: "Requisitos de ancho de banda: mínimo 1.5 Mbps de subida/bajada para video confiable; pruebe todas las ubicaciones de proveedores incluyendo oficinas en casa",
          },
        ],
      },
      {
        heading: {
          en: "Medi-Cal Telehealth Billing for FQHCs",
          es: "Facturación de Telesalud Medi-Cal para FQHCs",
        },
        keyPoints: [
          {
            en: "FQHCs are reimbursed at PPS rates for telehealth visits — the same rate as in-person encounters when properly documented",
            es: "Los FQHCs son reembolsados a tasas PPS por visitas de telesalud — la misma tasa que encuentros en persona cuando están debidamente documentados",
          },
          {
            en: "Place of Service code 02 (Telehealth) or 10 (Telehealth in Patient's Home) with modifier 95 for synchronous video visits",
            es: "Código de Lugar de Servicio 02 (Telesalud) o 10 (Telesalud en el Hogar del Paciente) con modificador 95 para visitas de video sincrónicas",
          },
          {
            en: "Informed consent must be obtained and documented before the first telehealth visit — verbal consent is acceptable",
            es: "El consentimiento informado debe obtenerse y documentarse antes de la primera visita de telesalud — el consentimiento verbal es aceptable",
          },
          {
            en: "Store-and-forward (asynchronous) telehealth: FQHCs/RHCs can uniquely establish NEW patients via store-and-forward in California — a competitive advantage over other providers",
            es: "Telesalud de almacenar y reenviar (asincrónica): los FQHCs/RHCs pueden establecer NUEVOS pacientes únicamente vía almacenar y reenviar en California — una ventaja competitiva sobre otros proveedores",
          },
        ],
      },
      {
        heading: {
          en: "Staffing Models for Remote Operations",
          es: "Modelos de Personal para Operaciones Remotas",
        },
        keyPoints: [
          {
            en: "Designate telehealth facilitators — typically MAs or front desk staff who manage the virtual waiting room, troubleshoot tech, and prep patients",
            es: "Designe facilitadores de telesalud — típicamente MAs o personal de recepción que gestionan la sala de espera virtual, resuelven problemas técnicos y preparan pacientes",
          },
          {
            en: "Hybrid scheduling: allocate specific clinic days for telehealth vs. in-person to maintain provider focus and optimize room utilization",
            es: "Programación híbrida: asigne días específicos de clínica para telesalud vs. presencial para mantener el enfoque del proveedor y optimizar la utilización de salas",
          },
          {
            en: "Remote administrative staff: billing, coding, referral coordinators, and case managers can work effectively from home with proper HIPAA safeguards",
            es: "Personal administrativo remoto: facturación, codificación, coordinadores de referencias y gerentes de casos pueden trabajar efectivamente desde casa con salvaguardas HIPAA adecuadas",
          },
          {
            en: "Provider considerations: ensure CA licensure (required even for telehealth), establish clear documentation standards for virtual visits",
            es: "Consideraciones del proveedor: asegure la licencia de CA (requerida incluso para telesalud), establezca estándares claros de documentación para visitas virtuales",
          },
        ],
      },
      {
        heading: {
          en: "HIPAA Compliance for Remote Work",
          es: "Cumplimiento HIPAA para Trabajo Remoto",
        },
        keyPoints: [
          {
            en: "Remote workforce BAAs: if staff use home internet, document the HIPAA safeguards in place (VPN, encrypted devices, private workspace)",
            es: "BAAs para fuerza laboral remota: si el personal usa internet doméstico, documente las salvaguardas HIPAA implementadas (VPN, dispositivos encriptados, espacio de trabajo privado)",
          },
          {
            en: "All telehealth platforms must have a Business Associate Agreement (BAA) with your FQHC — verify before purchasing",
            es: "Todas las plataformas de telesalud deben tener un Acuerdo de Asociado Comercial (BAA) con su FQHC — verifique antes de comprar",
          },
          {
            en: "Prohibit telehealth visits from public spaces — both providers and patients should be in private, quiet environments",
            es: "Prohíba visitas de telesalud desde espacios públicos — tanto proveedores como pacientes deben estar en ambientes privados y tranquilos",
          },
          {
            en: "Device management: require encrypted laptops, remote wipe capability, and automatic screen locks for all remote devices",
            es: "Gestión de dispositivos: requiera laptops encriptadas, capacidad de borrado remoto y bloqueos automáticos de pantalla para todos los dispositivos remotos",
          },
        ],
      },
      {
        heading: {
          en: "Patient Engagement and Digital Equity",
          es: "Participación del Paciente y Equidad Digital",
        },
        keyPoints: [
          {
            en: "The digital divide is real: 30%+ of FQHC patients lack reliable internet access or digital devices — plan for audio-only alternatives",
            es: "La brecha digital es real: 30%+ de los pacientes de FQHCs carecen de acceso confiable a internet o dispositivos digitales — planifique alternativas solo de audio",
          },
          {
            en: "Offer bilingual telehealth support: interpreter services must be available for virtual visits just as they are for in-person encounters",
            es: "Ofrezca soporte de telesalud bilingüe: los servicios de interpretación deben estar disponibles para visitas virtuales tal como lo están para encuentros presenciales",
          },
          {
            en: "Train patients on telehealth at in-person visits — 'teach-back' on a practice video call reduces no-shows by up to 40%",
            es: "Capacite a los pacientes en telesalud durante visitas presenciales — 'teach-back' en una videollamada de práctica reduce inasistencias hasta en 40%",
          },
          {
            en: "Track telehealth utilization by demographics: if certain patient populations aren't using telehealth, investigate barriers and adjust outreach",
            es: "Rastree la utilización de telesalud por demografía: si ciertas poblaciones de pacientes no usan telesalud, investigue barreras y ajuste el alcance",
          },
        ],
      },
    ],
    primarySourceUrl: "https://caltrc.org/",
    primarySourceOrg: "California Telehealth Resource Center (CTRC)",
    additionalSources: [
      {
        label: "DHCS Medi-Cal Telehealth FAQ",
        url: "https://www.dhcs.ca.gov/provgovpart/Pages/TelehealthFAQ.aspx",
      },
      {
        label: "NCTRC FQHC Telehealth Fact Sheet (Fall 2025)",
        url: "https://telehealthresourcecenter.org/resources/fact-sheets/telehealth-policies-federally-qualified-health-centers-fqhc-fact-sheet-fall-2025/",
      },
      {
        label: "CMS Telehealth Toolkit for FQHCs",
        url: "https://www.cms.gov/files/document/telehealth-toolkit-providers.pdf",
      },
    ],
    targetRoles: ["program-manager", "registered_nurse", "medical_assistant", "director-clinical-ops"],
    tags: ["telehealth", "remote-work", "billing", "hipaa", "medi-cal", "technology"],
    lastUpdated: "2026-03-04",
  },

  /* ============================================================== */
  /*  PROGRAMS & COMPLIANCE - WORKER RIGHTS                         */
  /* ============================================================== */
  {
    id: "california-labor-law-rights",
    title: {
      en: "Your Rights Under California Labor Law",
      es: "Tus Derechos Bajo la Ley Laboral de California",
    },
    summary: {
      en: "California labor law gives you protections beyond federal law. Learn what 'at-will employment' really means, what activities are protected, wage & hour basics, and how to file a complaint if something feels wrong.",
      es: "La ley laboral de California te da protecciones más allá de la ley federal. Aprende qué significa realmente 'empleo a voluntad', qué actividades están protegidas, lo básico de salarios y horarios, y cómo presentar una queja si algo se siente mal.",
    },
    category: "programs-compliance",
    difficulty: "beginner",
    readTime: "12 min",
    sections: [
      {
        heading: {
          en: "At-Will Employment Exceptions in California",
          es: "Excepciones de Empleo a Voluntad en California",
        },
        keyPoints: [
          {
            en: "California is an 'at-will' state — your employer can fire you for any reason, any time, without cause. BUT there are major exceptions.",
            es: "California es un estado 'a voluntad' — tu empleador puede despedirte por cualquier razón, cualquier momento. PERO hay excepciones importantes.",
          },
          {
            en: "Public policy exception: You CANNOT be fired for activities protected by law (jury duty, military service, voting, filing labor complaints, exercising labor rights)",
            es: "Excepción de política pública: NO PUEDES ser despedido por actividades protegidas por ley (deber de jurado, servicio militar, voto, presentación de quejas laborales)",
          },
          {
            en: "Implied contract exception: If your FQHC has a handbook or gave oral promises about job security, those can create enforceable contracts",
            es: "Excepción de contrato implícito: Si tu FQHC tiene un manual o hizo promesas verbales sobre seguridad laboral, esas pueden crear contratos exigibles",
          },
          {
            en: "Covenant of good faith exception: Employers cannot fire you in bad faith or solely to avoid paying earned benefits (like vacation or bonuses)",
            es: "Excepción de buena fe: Los empleadores no pueden despedirte de mala fe o solo para evitar pagar beneficios ganados",
          },
        ],
      },
      {
        heading: {
          en: "Protected Concerted Activities",
          es: "Actividades Concertadas Protegidas",
        },
        keyPoints: [
          {
            en: "You have a RIGHT to discuss wages, hours, and working conditions with coworkers — this is protected by the National Labor Relations Act (NLRA)",
            es: "Tienes DERECHO a discutir salarios, horarios y condiciones de trabajo con compañeros — esto está protegido por la NLRA",
          },
          {
            en: "Protected activity includes: informal conversations about pay, union organizing, filing safety complaints, or asking about benefits — even without a union",
            es: "La actividad protegida incluye: conversaciones informales sobre pago, organización sindical, presentación de quejas de seguridad — incluso sin un sindicato",
          },
          {
            en: "Retaliation is illegal: Your employer cannot discipline, fire, or demote you for protected activities. No exceptions.",
            es: "La represalia es ilegal: Tu empleador no puede disciplinarte, despedirte o degradarte por actividades protegidas. Sin excepciones.",
          },
          {
            en: "If you are retaliated against within 30 days of protected activity, the NLRB assumes retaliation occurred — burden shifts to employer to prove otherwise",
            es: "Si eres represaliado dentro de 30 días de actividad protegida, el NLRB asume represalia — la carga se traslada al empleador para probar lo contrario",
          },
        ],
      },
      {
        heading: {
          en: "Wage & Hour Basics",
          es: "Lo Básico de Salarios y Horarios",
        },
        keyPoints: [
          {
            en: "Minimum wage in California is at least $16.50/hour (as of 2024). Some cities (SF, LA, Oakland) have higher minimum wages.",
            es: "El salario mínimo en California es al menos $16.50/hora (a partir de 2024). Algunas ciudades tienen salarios mínimos más altos.",
          },
          {
            en: "Overtime (OT): 1.5x pay for hours over 8/day or 40/week; 2x pay for hours over 12/day. Healthcare workers have specific OT rules.",
            es: "Horas extraordinarias (OT): 1.5x pago por horas más de 8/día o 40/semana; 2x pago por horas más de 12/día.",
          },
          {
            en: "All hours worked = paid hours. Charting, staff meetings, break time that's not truly free = work. Off-the-clock work is wage theft.",
            es: "Todas las horas trabajadas = horas pagadas. Documentación, reuniones de personal, tiempo de descanso que no es realmente libre = trabajo. Trabajo fuera de horario es robo de salarios.",
          },
          {
            en: "Pay stubs must show: gross pay, deductions (federal tax, FICA, etc.), net pay. Ask your employer to explain any deductions you don't understand.",
            es: "Los recibos de pago deben mostrar: pago bruto, deducciones, pago neto. Pide a tu empleador que explique cualquier deducción que no entiendas.",
          },
        ],
      },
      {
        heading: {
          en: "Anti-Retaliation Protections",
          es: "Protecciones Contra Represalia",
        },
        keyPoints: [
          {
            en: "You cannot be fired, demoted, or suspended for: reporting labor violations, filing a workers comp claim, refusing illegal work, taking jury duty, or requesting reasonable accommodations",
            es: "No puedes ser despedido, degradado o suspendido por: reportar violaciones laborales, presentar reclamo de compensación de trabajadores, rehusar trabajo ilegal",
          },
          {
            en: "Retaliation includes: creating a hostile work environment (sudden negative evaluations, schedule changes, harassment) as punishment for protected activity",
            es: "La represalia incluye: crear un ambiente de trabajo hostil (evaluaciones negativas repentinas, cambios de horario, acoso) como castigo por actividad protegida",
          },
          {
            en: "If you suspect retaliation: document dates, actions, witnesses. Keep copies of communications. Report to your FQHC's HR and the California Division of Labor Standards Enforcement (DLSE).",
            es: "Si sospechas represalia: documenta fechas, acciones, testigos. Guarda copias de comunicaciones. Reporta a RR.HH. y al DLSE.",
          },
        ],
      },
      {
        heading: {
          en: "How to File a Complaint with DLSE",
          es: "Cómo Presentar una Queja con DLSE",
        },
        keyPoints: [
          {
            en: "DLSE (dir.ca.gov/dlse) investigates wage theft, unpaid overtime, retaliation, and other labor violations. It's free.",
            es: "DLSE investiga robo de salarios, horas extraordinarias no pagadas, represalia y otras violaciones laborales. Es gratis.",
          },
          {
            en: "You can file a wage claim online or by mail. You do NOT need a lawyer. You do NOT need to be a citizen.",
            es: "Puedes presentar una reclamación de salarios en línea o por correo. NO necesitas abogado. NO necesitas ser ciudadano.",
          },
          {
            en: "Timeline: You must file within 1-4 years depending on violation type. Bring: pay stubs, time records, emails, any evidence of unpaid wages.",
            es: "Plazo: Debes presentar dentro de 1-4 años dependiendo del tipo de violación. Trae: recibos de pago, registros de tiempo, evidencia de salarios no pagados.",
          },
          {
            en: "DLSE can order your employer to pay back wages + penalties. If you win, your employer pays attorney's fees and court costs.",
            es: "DLSE puede ordenar a tu empleador pagar salarios atrasados + multas. Si ganas, tu empleador paga honorarios de abogado y costos judiciales.",
          },
        ],
      },
    ],
    primarySourceUrl: "https://dir.ca.gov/dlse/",
    primarySourceOrg: "California Division of Labor Standards Enforcement (DLSE)",
    additionalSources: [
      {
        label: "DLSE: Worker Rights (English/Spanish)",
        url: "https://www.dir.ca.gov/DLSE/Know_Your_Rights.html",
      },
      {
        label: "NLRB: Employee Rights Under NLRA",
        url: "https://www.nlrb.gov/news-publications/publications/employee-rights-notice-posting",
      },
      {
        label: "California Labor Code Chapter 2: General Protections",
        url: "https://leginfo.legislature.ca.gov/faces/codes_displayexpandedbranch.xhtml?lawCode=LAB&division=2",
      },
      {
        label: "State Bar of California: Free/Low-Cost Legal Help",
        url: "https://www.lawhelpca.org/",
      },
    ],
    targetRoles: ["all"],
    tags: ["worker-rights", "labor-law", "wage-theft", "retaliation", "compliance", "california-labor-code"],
    lastUpdated: "2026-03-11",
  },
  {
    id: "grievance-process-filing",
    title: {
      en: "The Grievance Process: When and How to File",
      es: "El Proceso de Queja: Cuándo y Cómo Presentar",
    },
    summary: {
      en: "Not sure if your issue is grievable? Learn when to file a grievance, what the union vs non-union pathways look like, documentation requirements, timelines, and when to escalate.",
      es: "¿No estás seguro si tu problema es una queja? Aprende cuándo presentar una queja, qué parecen las rutas sindicales vs no sindicales, requisitos de documentación y plazos.",
    },
    category: "programs-compliance",
    difficulty: "intermediate",
    readTime: "15 min",
    sections: [
      {
        heading: {
          en: "What Issues Are Grievable?",
          es: "¿Qué Problemas Son Quejables?",
        },
        keyPoints: [
          {
            en: "Grievable issues (typically) include: wrongful discipline, wage/hour violations, breach of contract, unsafe working conditions, discrimination, retaliation, or denial of benefits",
            es: "Los problemas quejables (típicamente) incluyen: disciplina injusta, violaciones de salarios/horarios, incumplimiento de contrato, condiciones de trabajo inseguras, discriminación, represalia",
          },
          {
            en: "Non-grievable issues: decisions within management discretion (hiring choices, schedule preferences not in contract, at-will terminations without protected-activity angle) usually cannot be grieved",
            es: "Problemas no quejables: decisiones dentro de discreción gerencial (opciones de contratación, preferencias de horario no en contrato) generalmente no pueden ser quejadas",
          },
          {
            en: "When in doubt, file it anyway. Your union rep (if applicable) or HR can advise whether it's grievable. You have nothing to lose by asking.",
            es: "Si tienes dudas, presenta de todas formas. Tu representante sindical (si aplica) o RR.HH. puede asesorarte. No tienes nada que perder preguntando.",
          },
        ],
      },
      {
        heading: {
          en: "Union Pathways: Steps 1-3",
          es: "Rutas Sindicales: Pasos 1-3",
        },
        keyPoints: [
          {
            en: "Step 1 (Informal): Talk to your manager within 5-10 days of issue. Try to resolve it verbally. If unresolved, move to Step 2.",
            es: "Paso 1 (Informal): Habla con tu gerente dentro de 5-10 días del problema. Intenta resolverlo verbalmente. Si no se resuelve, ve al Paso 2.",
          },
          {
            en: "Step 2 (Formal): File written grievance with union rep. Include: date of incident, what happened, policy violated, what you want (reinstatement, back pay, etc.). Usually 10-15 day response window.",
            es: "Paso 2 (Formal): Presenta queja escrita con representante sindical. Incluye: fecha del incidente, qué pasó, política violada, qué quieres. Generalmente ventana de respuesta de 10-15 días.",
          },
          {
            en: "Step 3 (Arbitration): If unresolved after Step 2, go to arbitration — independent arbitrator hears both sides and issues binding decision. Usually 30-60 days.",
            es: "Paso 3 (Arbitración): Si no se resuelve después del Paso 2, ve a arbitración — un árbitro independiente escucha ambos lados e emite decisión vinculante.",
          },
        ],
      },
      {
        heading: {
          en: "Non-Union Pathways: HR & Legal Options",
          es: "Rutas No Sindicales: Opciones de RR.HH. y Legales",
        },
        keyPoints: [
          {
            en: "If your FQHC doesn't have a union: Report to HR first (in writing, by email). Document your complaint. Keep a copy for your records.",
            es: "Si tu FQHC no tiene sindicato: Reporta a RR.HH. primero (por escrito, por correo electrónico). Documenta tu queja. Guarda una copia.",
          },
          {
            en: "HR may offer internal investigation, mediation, or grievance process depending on FQHC policy. Ask for timeline and next steps.",
            es: "RR.HH. puede ofrecer investigación interna, mediación o proceso de quejas según la política FQHC. Pregunta por plazo y próximos pasos.",
          },
          {
            en: "If internal process fails: You can file with DFEH (discrimination), DLSE (wage/hour), Cal/OSHA (safety), or NLRB (retaliation). These are free government agencies.",
            es: "Si el proceso interno falla: Puedes presentar ante DFEH (discriminación), DLSE (salarios), Cal/OSHA (seguridad) o NLRB (represalia). Estas son agencias gubernamentales gratuitas.",
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
            en: "Date: Exact date of incident (or date you first became aware of issue)",
            es: "Fecha: Fecha exacta del incidente (o fecha en que primero te enteraste del problema)",
          },
          {
            en: "What happened: Clear, factual description. Avoid emotions; stick to what you observed/experienced. Include witnesses.",
            es: "Qué pasó: Descripción clara, fáctica. Evita emociones; apégate a lo que observaste. Incluye testigos.",
          },
          {
            en: "Policy violated: Cite specific FQHC handbook policy, contract clause, or labor law. Example: 'Violated Handbook Section 4.3 on Wage Payment'",
            es: "Política violada: Cita la política específica del manual FQHC, cláusula de contrato o ley laboral.",
          },
          {
            en: "Relief requested: Be specific. Don't just say 'fix it.' Say 'reinstatement to previous role' or 'back pay for 40 unpaid overtime hours' or 'written apology in personnel file'",
            es: "Remedio solicitado: Sé específico. No solo digas 'arréglalo.' Di 'reintegración al rol anterior' o 'pago atrasado por 40 horas extraordinarias no pagadas'",
          },
          {
            en: "Evidence: Pay stubs, emails, text messages, schedules, photos of unsafe conditions, witness statements — anything that backs up your claim",
            es: "Evidencia: Recibos de pago, correos electrónicos, mensajes de texto, horarios, fotos de condiciones inseguras, declaraciones de testigos",
          },
        ],
      },
      {
        heading: {
          en: "Timeline Expectations & Escalation",
          es: "Expectativas de Plazos y Escalación",
        },
        keyPoints: [
          {
            en: "Union grievances: Usually resolve within 60-90 days if arbitration goes to hearing. May take longer if employer appeals.",
            es: "Quejas sindicales: Generalmente se resuelven dentro de 60-90 días si la arbitración va a audiencia.",
          },
          {
            en: "Non-union: HR may take 30-60 days to investigate. Government agencies (DLSE, DFEH) may take 6-12 months.",
            es: "No sindical: RR.HH. puede tardar 30-60 días en investigar. Las agencias gubernamentales pueden tardar 6-12 meses.",
          },
          {
            en: "Don't give up: Long timelines don't mean you won't win. Agencies regularly award back pay, penalties, and attorney's fees.",
            es: "No te rindas: Los plazos largos no significan que no ganarás. Las agencias regularmente otorgan salarios atrasados, multas y honorarios de abogado.",
          },
          {
            en: "Escalation: If HR doesn't respond within stated timeframe, escalate to your FQHC's CEO or board. If that fails, file with government agency.",
            es: "Escalación: Si RR.HH. no responde dentro del plazo establecido, escalala a tu CEO o junta FQHC. Si eso falla, presenta ante agencia gubernamental.",
          },
        ],
      },
    ],
    primarySourceUrl: "https://www.nlrb.gov/",
    primarySourceOrg: "National Labor Relations Board (NLRB)",
    additionalSources: [
      {
        label: "NLRB: Grievance & Arbitration Process",
        url: "https://www.nlrb.gov/news-publications/publications/brochures",
      },
      {
        label: "DLSE: Wage Claim Filing Process",
        url: "https://www.dir.ca.gov/dlse/howtofilewageclaim.htm",
      },
      {
        label: "California DFEH: Discrimination Complaints",
        url: "https://www.dfeh.ca.gov/complaints/",
      },
      {
        label: "Cal/OSHA: Safety Complaint Filing",
        url: "https://www.dir.ca.gov/dosh/complaint.htm",
      },
    ],
    targetRoles: ["all"],
    tags: ["grievance-process", "union", "dispute-resolution", "labor-law", "compliance", "workers-rights"],
    lastUpdated: "2026-03-11",
  },
  {
    id: "wage-theft-prevention-reporting",
    title: {
      en: "Wage Theft Prevention & Reporting in Healthcare",
      es: "Prevención y Reportaje de Robo de Salarios en Salud",
    },
    summary: {
      en: "Wage theft in healthcare is common but preventable. Learn what wage theft looks like in FQHCs, how to identify violations, documentation strategies, and how to report and recover.",
      es: "El robo de salarios en salud es común pero prevenible. Aprende qué se ve como robo de salarios en FQHCs, cómo identificar violaciones, estrategias de documentación y cómo reportar y recuperarse.",
    },
    category: "programs-compliance",
    difficulty: "beginner",
    readTime: "10 min",
    sections: [
      {
        heading: {
          en: "Common Wage Theft Patterns at FQHCs",
          es: "Patrones Comunes de Robo de Salarios en FQHCs",
        },
        keyPoints: [
          {
            en: "Off-the-clock work: Charting, EMR work, staff meetings, cleaning, or prep done before/after shift without pay. This is wage theft.",
            es: "Trabajo fuera de horario: Documentación, trabajo EMR, reuniones de personal, limpieza o preparación realizada antes/después de turno sin pago. Esto es robo de salarios.",
          },
          {
            en: "Misclassification: Calling you 'salary-exempt' when you should be hourly. Salaried staff who work 50+ hours/week must still be paid for OT if not truly exempt.",
            es: "Clasificación errónea: Llamándote 'exento de salario' cuando deberías ser por hora. El personal asalariado que trabaja 50+ horas/semana aún debe ser pagado por OT.",
          },
          {
            en: "Unpaid breaks: California law: 10-minute breaks paid, 30-minute+ meal periods unpaid. But if you can't fully disconnect (phone on, pager), it's a paid break.",
            es: "Descansos no pagados: Ley de California: descansos de 10 minutos pagados, períodos de comida de 30+ minutos no pagados. Pero si no puedes desconectarte completamente, es descanso pagado.",
          },
          {
            en: "Unpaid overtime: Working over 8 hours/day or 40 hours/week without 1.5x or 2x pay. Your FQHC cannot waive OT — it's illegal.",
            es: "Horas extraordinarias no pagadas: Trabajar más de 8 horas/día o 40 horas/semana sin pago 1.5x o 2x. Tu FQHC no puede renunciar a OT — es ilegal.",
          },
          {
            en: "Deduction from final paycheck: Money taken for uniforms, shortages, or damages. Generally illegal unless it brings you above minimum wage.",
            es: "Deducción del cheque de pago final: Dinero tomado por uniformes, faltantes o daños. Generalmente ilegal a menos que te traiga por encima del salario mínimo.",
          },
          {
            en: "Not paying earned bonuses: Promised holiday bonuses, attendance bonuses, or referral bonuses not paid. If promised, must be paid.",
            es: "No pagar bonificaciones ganadas: Bonificaciones de vacaciones prometidas, bonificaciones de asistencia o bonificaciones de referencia no pagadas.",
          },
        ],
      },
      {
        heading: {
          en: "How to Identify Violations",
          es: "Cómo Identificar Violaciones",
        },
        keyPoints: [
          {
            en: "Review your pay stubs: Gross pay should cover ALL hours worked. If you worked 42 hours but only paid for 40, that's a red flag.",
            es: "Revisa tus recibos de pago: El pago bruto debe cubrir TODAS las horas trabajadas. Si trabajaste 42 horas pero solo pagaste 40, eso es una bandera roja.",
          },
          {
            en: "Track your time: Write down when you arrive, leave, and any breaks/unpaid time. Use your phone's notes app if no time clock exists.",
            es: "Haz seguimiento de tu tiempo: Anota cuándo llegas, te vas y cualquier descanso. Usa la aplicación de notas de tu teléfono si no existe reloj de tiempo.",
          },
          {
            en: "Compare to coworkers: Are you working off-the-clock while others aren't? Are raises going to some people but not others without clear reason?",
            es: "Compara con compañeros: ¿Estás trabajando fuera de horario mientras otros no? ¿Los aumentos van a algunas personas pero no a otras sin razón clara?",
          },
          {
            en: "Calculate expected pay: (Hours × Hourly Rate) + (OT Hours × Rate × 1.5 or 2) = what you SHOULD be paid. Compare to actual paycheck.",
            es: "Calcula el pago esperado: (Horas × Tasa Horaria) + (Horas OT × Tasa × 1.5 o 2) = lo que DEBERÍAS ser pagado. Compara con tu cheque real.",
          },
        ],
      },
      {
        heading: {
          en: "Documentation Strategies",
          es: "Estrategias de Documentación",
        },
        keyPoints: [
          {
            en: "TIME TRACKING: Start immediately. Use your phone's notes, a spreadsheet, or a notebook. Write: date, clock-in time, clock-out time, total hours, any unpaid work.",
            es: "SEGUIMIENTO DE TIEMPO: Comienza inmediatamente. Usa las notas de tu teléfono, una hoja de cálculo o un cuaderno.",
          },
          {
            en: "KEEP PAYSTUBS: Save every pay stub for 4 years. Don't throw them away. They're proof of what you were paid.",
            es: "GUARDA RECIBOS DE PAGO: Guarda cada recibo de pago durante 4 años. No los tires. Son prueba de lo que te pagaron.",
          },
          {
            en: "EMAIL RECORDS: Screenshot or save emails about work requests, schedules, or instructions to work off-the-clock. Forward important emails to your personal email.",
            es: "REGISTROS DE CORREO ELECTRÓNICO: Captura pantalla o guarda correos electrónicos sobre solicitudes de trabajo, horarios o instrucciones para trabajar fuera de horario.",
          },
          {
            en: "TEXT/CHAT RECORDS: Save any texts or Slack messages where manager asks you to 'just finish charting' or work after hours.",
            es: "REGISTROS DE TEXTO/CHAT: Guarda cualquier texto o mensaje de Slack donde el gerente te pide 'termina solo la documentación' o trabaja después de horario.",
          },
          {
            en: "WITNESS NAMES: If coworkers also worked off-the-clock, write down their names and what you saw. They may be witnesses.",
            es: "NOMBRES DE TESTIGOS: Si compañeros de trabajo también trabajaron fuera de horario, anota sus nombres y lo que viste.",
          },
        ],
      },
      {
        heading: {
          en: "Reporting to DLSE & Recovery Options",
          es: "Reportar a DLSE y Opciones de Recuperación",
        },
        keyPoints: [
          {
            en: "File a wage claim with DLSE (dir.ca.gov/dlse) within 1-4 years of the violation. It's free. You don't need a lawyer.",
            es: "Presenta una reclamación de salarios con DLSE (dir.ca.gov/dlse) dentro de 1-4 años de la violación. Es gratis. No necesitas abogado.",
          },
          {
            en: "Include in your claim: dates of violations, hours unpaid, wage stubs, time tracking records, any written evidence (emails, texts).",
            es: "Incluye en tu reclamación: fechas de violaciones, horas no pagadas, recibos de salarios, registros de seguimiento de tiempo, cualquier evidencia escrita.",
          },
          {
            en: "DLSE investigates and can order your FQHC to pay: (1) Back wages + interest, (2) Penalties (up to $50/violation), (3) Your attorney's fees and court costs if you win.",
            es: "DLSE investiga y puede ordenar a tu FQHC pagar: (1) Salarios atrasados + interés, (2) Multas (hasta $50/violación), (3) Tus honorarios de abogado y costos judiciales si ganas.",
          },
          {
            en: "You can also file a class action with a lawyer. Many wage theft lawsuits settle for $thousands or $millions if many workers are affected.",
            es: "También puedes presentar una demanda colectiva con un abogado. Muchas demandas de robo de salarios se resuelven por $miles o $millones si muchos trabajadores se ven afectados.",
          },
        ],
      },
    ],
    primarySourceUrl: "https://www.dir.ca.gov/dlse/howtofilewageclaim.htm",
    primarySourceOrg: "California Division of Labor Standards Enforcement (DLSE)",
    additionalSources: [
      {
        label: "DLSE: Wage Theft Prevention Guide",
        url: "https://www.dir.ca.gov/dlse/Examples_of_Wage_Theft.html",
      },
      {
        label: "California Labor Code Section 200-224 (Wage Payment)",
        url: "https://leginfo.legislature.ca.gov/faces/codes_displayexpandedbranch.xhtml?lawCode=LAB&division=2&title=&part=&chapter=2&article=",
      },
      {
        label: "Legal Aid Organizations (Class Action Resources)",
        url: "https://www.lawhelpca.org/",
      },
      {
        label: "DLSE: Worker Misclassification Prevention",
        url: "https://www.dir.ca.gov/fraud_prevention/Misclassification.htm",
      },
    ],
    targetRoles: ["all"],
    tags: ["wage-theft", "wage-claim", "unpaid-overtime", "off-the-clock", "dlse", "compliance", "worker-rights"],
    lastUpdated: "2026-03-11",
  },
  {
    id: "salary-negotiation-prep",
    title: {
      en: "Salary Negotiation Preparation Checklist",
      es: "Lista de Verificación de Preparación para Negociación Salarial",
    },
    summary: {
      en: "Most healthcare workers don't negotiate salary out of fear or lack of knowledge. This guide walks you through research, talking points, scripts, and follow-up — for both initial offers and annual raises.",
      es: "La mayoría de los trabajadores de salud no negocian salario por miedo o falta de conocimiento. Esta guía te lleva a través de investigación, puntos de conversación, scripts y seguimiento.",
    },
    category: "programs-compliance",
    difficulty: "beginner",
    readTime: "8 min",
    sections: [
      {
        heading: {
          en: "Research Your Market Rate",
          es: "Investiga Tu Tasa de Mercado",
        },
        keyPoints: [
          {
            en: "Use free tools: BLS.gov (Bureau of Labor Statistics), PayScale, Glassdoor salary data for your FQHC specifically, and indeed.com job postings.",
            es: "Usa herramientas gratuitas: BLS.gov, PayScale, datos salariales de Glassdoor para tu FQHC específicamente e indeed.com.",
          },
          {
            en: "Look for YOUR role, YOUR region, YOUR experience level: Medical Assistant at Bay Area FQHC ≠ Medical Assistant at rural Central Valley FQHC. Salaries differ by 20-30%.",
            es: "Busca TU rol, TU región, TU nivel de experiencia: Asistente Médico en Área de la Bahía ≠ Asistente Médico en Área Rural. Los salarios difieren en 20-30%.",
          },
          {
            en: "P25 (25th percentile) = below average. P50 (median) = market rate. P75 (75th percentile) = above average. Aim for P50 or higher based on your experience.",
            es: "P25 = por debajo del promedio. P50 (mediana) = tasa de mercado. P75 = por encima del promedio. Apunta a P50 o superior según tu experiencia.",
          },
          {
            en: "Adjust for FQHC-specific factors: NHSC eligibility (add $25-50K value), mission premium (add 10-15% vs hospital), bilingual bonus (add $2-5/hr), SB 525 positioning (you're ahead of the wave).",
            es: "Ajusta por factores FQHC: Elegibilidad NHSC (suma $25-50K valor), prima de misión (suma 10-15% vs hospital), bonificación bilingüe (suma $2-5/hr).",
          },
        ],
      },
      {
        heading: {
          en: "Know Your Total Compensation",
          es: "Conoce Tu Compensación Total",
        },
        keyPoints: [
          {
            en: "Base salary is just the start. Calculate total comp: (Base salary) + (Health insurance value) + (Retirement/401k match) + (PTO value) + (Bonuses/differentials) + (NHSC eligibility) + (FTCA peace-of-mind value)",
            es: "El salario base es solo el comienzo. Calcula compensación total: (Salario base) + (Valor de seguro de salud) + (Jubilación/401k match) + (Valor de PTO) + (Bonificaciones/diferenciales) + (Elegibilidad NHSC)",
          },
          {
            en: "Health insurance: A family PPO plan costs employers $15K-25K/year. That's part of YOUR comp.",
            es: "Seguro de salud: Un plan PPO familiar cuesta a los empleadores $15K-25K/año. Eso es parte de TU compensación.",
          },
          {
            en: "Bilingual differential: If you speak Spanish fluently, you add value. $2-5/hour is standard. Ask for it explicitly.",
            es: "Diferencial bilingüe: Si hablas español con fluidez, añades valor. $2-5/hora es estándar. Pídelo explícitamente.",
          },
          {
            en: "NHSC eligibility: If eligible, repayment starts at $25K. Over your career, could be $100K+. Factor this into your negotiation.",
            es: "Elegibilidad NHSC: Si es elegible, el repago comienza en $25K. Durante su carrera, podría ser $100K+. Factor en su negociación.",
          },
        ],
      },
      {
        heading: {
          en: "Prepare Your Talking Points",
          es: "Prepara Tus Puntos de Conversación",
        },
        keyPoints: [
          {
            en: "Point 1: Market data — 'Based on BLS data, the median MA salary in the Bay Area is $42K. I have 5 years of FQHC experience. I'm asking for $45K.'",
            es: "Punto 1: Datos de mercado — 'Según datos de BLS, el salario mediano de MA en el Área de la Bahía es $42K. Tengo 5 años de experiencia en FQHC. Estoy pidiendo $45K.'",
          },
          {
            en: "Point 2: Your specific value — 'I'm bilingual (Spanish/English), which increases patient access and reduces interpreter costs. I should earn the differential.'",
            es: "Punto 2: Tu valor específico — 'Soy bilingüe (español/inglés), lo que aumenta el acceso de pacientes. Debería ganar el diferencial.'",
          },
          {
            en: "Point 3: Retention — 'I love working at [FQHC name] and want to build my career here. A competitive salary helps me stay. Replacing a good employee costs 50-200% of annual salary.'",
            es: "Punto 3: Retención — 'Me encanta trabajar en [nombre FQHC] y quiero construir mi carrera aquí. Un salario competitivo me ayuda a quedarme.'",
          },
          {
            en: "Point 4: Contribution — 'I've completed [certification/training], led [project], mentored [staff], and consistently receive positive feedback. I'm ready for the next level.'",
            es: "Punto 4: Contribución — 'He completado [certificación/capacitación], lideré [proyecto], mentoré [personal] y siempre recibo retroalimentación positiva.'",
          },
        ],
      },
      {
        heading: {
          en: "Practice Scripts (Use These Words)",
          es: "Scripts de Práctica (Usa Estas Palabras)",
        },
        keyPoints: [
          {
            en: "OPENING: 'I'm excited to discuss compensation. I've done research on market rates for my role and region, and I'd like to walk through my numbers.'",
            es: "APERTURA: 'Estoy emocionado de discutir compensación. He investigado tasas de mercado para mi rol y región, y me gustaría revisar mis números.'",
          },
          {
            en: "PRESENTING YOUR NUMBER: 'Based on BLS data, my experience level, and my bilingual skills, I'm asking for $48K [not 'I'd like' — be direct]. How does that land?'",
            es: "PRESENTANDO TU NÚMERO: 'Basado en datos de BLS, mi nivel de experiencia y mis habilidades bilingües, estoy pidiendo $48K. ¿Qué te parece?'",
          },
          {
            en: "IF THEY SAY NO: 'I understand budget constraints. What would it take to get to $48K? Can we revisit in 6 months? What if I lead [X project]?'",
            es: "SI DICEN QUE NO: 'Entiendo restricciones presupuestarias. ¿Qué se necesitaría para llegar a $48K? ¿Podemos revisitar en 6 meses?'",
          },
          {
            en: "IF THEY COUNTER LOW: 'I appreciate the offer of $44K. That's below market for my region. Can we meet in the middle at $46K?'",
            es: "SI CONTRAOFRECEN BAJO: 'Aprecio la oferta de $44K. Eso está por debajo del mercado para mi región. ¿Podemos llegar a un acuerdo en $46K?'",
          },
          {
            en: "CLOSING: 'I'm grateful for this opportunity. Let's put this in writing — can you send me an offer letter with the agreed salary, start date, and benefits?'",
            es: "CIERRE: 'Estoy agradecido por esta oportunidad. Pongamos esto por escrito — ¿puedes enviarme una carta de oferta?'",
          },
        ],
      },
      {
        heading: {
          en: "Follow-Up in Writing",
          es: "Seguimiento por Escrito",
        },
        keyPoints: [
          {
            en: "After negotiation conversation: Send an email to your manager that says: 'Thank you for discussing compensation with me. As we agreed, my new salary is $48K effective [date]. I look forward to the updated offer letter.'",
            es: "Después de la conversación de negociación: Envía un correo electrónico a tu gerente que diga: 'Gracias por discutir compensación conmigo. Como acordamos, mi nuevo salario es $48K efectivo [fecha].'",
          },
          {
            en: "GET IT IN WRITING: Written confirmation (email or formal offer letter) is crucial. Verbal promises don't hold up in disputes.",
            es: "CONSÍGUELO POR ESCRITO: La confirmación escrita (correo electrónico u oferta formal) es crucial. Las promesas verbales no se mantienen en disputas.",
          },
          {
            en: "Store copies: Keep email confirmation of negotiated salary. If you're underpaid later, this is proof of what was promised.",
            es: "Guarda copias: Mantén confirmación por correo electrónico del salario negociado. Si te pagan menos después, esto es prueba de lo que fue prometido.",
          },
        ],
      },
    ],
    primarySourceUrl: "https://www.bls.gov/oes/",
    primarySourceOrg: "Bureau of Labor Statistics (BLS)",
    additionalSources: [
      {
        label: "BLS: Occupational Employment & Wage Data",
        url: "https://www.bls.gov/oes/",
      },
      {
        label: "Glassdoor Salary Reviews (FQHC-specific)",
        url: "https://www.glassdoor.com/",
      },
      {
        label: "NACHC: Salary Benchmarking Survey (PDF)",
        url: "https://www.nachc.org/",
      },
      {
        label: "FQHC Talent Exchange: Salary Intelligence Dashboard",
        url: "https://www.fqhctalent.com/salary-data",
      },
    ],
    targetRoles: ["all"],
    tags: ["salary-negotiation", "compensation", "market-research", "bls-data", "career-growth", "wage-equity"],
    lastUpdated: "2026-03-11",
  },
  {
    id: "understanding-union-contract",
    title: {
      en: "Understanding Your Union Contract",
      es: "Entendiendo Tu Contrato Sindical",
    },
    summary: {
      en: "Your union contract is your legal protection. Learn how to read the key sections, understand grievance procedures, wage scales, seniority rules, and management rights — so you know what your employer can and cannot do.",
      es: "Tu contrato sindical es tu protección legal. Aprende cómo leer las secciones clave, entender procedimientos de quejas, escalas salariales, reglas de antigüedad — para que sepas qué puede y no puede hacer tu empleador.",
    },
    category: "programs-compliance",
    difficulty: "intermediate",
    readTime: "15 min",
    sections: [
      {
        heading: {
          en: "Why Your Union Contract Matters",
          es: "Por Qué Tu Contrato Sindical Importa",
        },
        keyPoints: [
          {
            en: "Your union contract is a LEGAL AGREEMENT between your union and your employer. It overrides at-will employment — you can't be fired without just cause.",
            es: "Tu contrato sindical es un ACUERDO LEGAL entre tu sindicato y tu empleador. Anula el empleo a voluntad — no puedes ser despedido sin causa justificada.",
          },
          {
            en: "Union contracts cover: wages, benefits, hours, working conditions, discipline procedures, grievance rights, and seniority rules. Everything in writing.",
            es: "Los contratos sindicales cubren: salarios, beneficios, horas, condiciones de trabajo, procedimientos disciplinarios, derechos de quejas y reglas de antigüedad.",
          },
          {
            en: "Your employer is legally bound to follow every word. If they violate the contract, you have a grievance right — managed by your union.",
            es: "Tu empleador está legalmente obligado a seguir cada palabra. Si violan el contrato, tienes derecho a queja — manejado por tu sindicato.",
          },
        ],
      },
      {
        heading: {
          en: "Key Contract Sections to Know",
          es: "Secciones Clave del Contrato a Conocer",
        },
        keyPoints: [
          {
            en: "PREAMBLE/RECOGNITION: States that the union represents you and your employer recognizes the union. This is the foundation.",
            es: "PREÁMBULO/RECONOCIMIENTO: Establece que el sindicato te representa y tu empleador reconoce el sindicato.",
          },
          {
            en: "WAGE SCALES: Lists your job title and salary bands. Example: 'Medical Assistant Step 1: $45K, Step 2: $47K, Step 3: $50K' based on years of service.",
            es: "ESCALAS DE SALARIO: Enumera tu título de trabajo y bandas salariales. Ejemplo: 'Asistente Médico Paso 1: $45K, Paso 2: $47K, Paso 3: $50K' según años de servicio.",
          },
          {
            en: "GRIEVANCE PROCEDURE: Step-by-step process for filing complaints. Usually: Informal Discussion → Formal Grievance → Arbitration. Know your timelines (5-10 days per step).",
            es: "PROCEDIMIENTO DE QUEJAS: Proceso paso a paso para presentar quejas. Generalmente: Discusión Informal → Queja Formal → Arbitración. Conoce tus plazos.",
          },
          {
            en: "SENIORITY & RECALL: Seniority = years of employment. Contract usually says: 'In case of layoffs, most junior employees are cut first. In case of rehire, most senior are called back first.'",
            es: "ANTIGÜEDAD Y RETIRO: Antigüedad = años de empleo. Contrato generalmente dice: 'En caso de despidos, los empleados más junior se cortan primero. En caso de recontratación, los más antiguos se llaman primero.'",
          },
          {
            en: "DISCIPLINE & DISCHARGE: Your employer cannot fire you without just cause. Must follow progressive discipline: verbal warning → written warning → suspension → termination (with union review at each step).",
            es: "DISCIPLINA Y DESPIDO: Tu empleador no puede despedirte sin causa justificada. Debe seguir disciplina progresiva: advertencia verbal → advertencia escrita → suspensión → terminación.",
          },
          {
            en: "MANAGEMENT RIGHTS CLAUSE: What the employer CAN do without union approval (usually: hire, assign work, set schedules within contract limits). Anything outside = grievable.",
            es: "CLÁUSULA DE DERECHOS GERENCIALES: Lo que el empleador PUEDE hacer sin aprobación sindical. Todo lo demás = quejable.",
          },
        ],
      },
      {
        heading: {
          en: "Grievance Procedures: Step-by-Step",
          es: "Procedimientos de Quejas: Paso a Paso",
        },
        keyPoints: [
          {
            en: "STEP 1 (Days 1-5): Informal discussion with your manager. Tell them: 'I believe this violates the contract. [Cite contract section]. Can we resolve this?' Keep notes.",
            es: "PASO 1 (Días 1-5): Discusión informal con tu gerente. Dile: 'Creo que esto viola el contrato. ¿Podemos resolver esto?' Mantén notas.",
          },
          {
            en: "STEP 2 (Days 5-15): If unresolved, file formal grievance with your union steward. Must be IN WRITING. State: date of violation, contract section cited, relief requested.",
            es: "PASO 2 (Días 5-15): Si no se resuelve, presenta queja formal con tu representante sindical. Debe ser POR ESCRITO. Indica: fecha, sección de contrato, remedio solicitado.",
          },
          {
            en: "STEP 3 (Days 15-30): Management responds. Union steward discusses with manager/HR. Many grievances resolve here.",
            es: "PASO 3 (Días 15-30): La gerencia responde. El representante sindical discute con gerente/RR.HH.",
          },
          {
            en: "STEP 4 (Days 30-90): If still unresolved, ARBITRATION. Independent arbitrator (neutral third party) hears evidence from both sides and issues binding decision.",
            es: "PASO 4 (Días 30-90): Si aún sin resolver, ARBITRACIÓN. Árbitro independiente (tercero neutral) escucha evidencia y emite decisión vinculante.",
          },
        ],
      },
      {
        heading: {
          en: "Wage Scales & Differentials",
          es: "Escalas de Salarios y Diferenciales",
        },
        keyPoints: [
          {
            en: "Steps/Progression: Most healthcare contracts have 3-5 'steps' based on years of service. Step 1 = new hire. Step 3-5 = experienced. You move up automatically (usually yearly).",
            es: "Pasos/Progresión: La mayoría de contratos de salud tienen 3-5 'pasos' basados en años de servicio. Paso 1 = nuevo empleado. Paso 3-5 = experimentado. Te mueves hacia arriba automáticamente.",
          },
          {
            en: "Bilingual/Spanish differential: If you speak Spanish fluently, contract may add $2-5/hour. Make sure you claim this — employers often forget.",
            es: "Diferencial bilingüe/español: Si hablas español con fluidez, el contrato puede añadir $2-5/hora. Asegúrate de reclamar esto — los empleadores a menudo olvidan.",
          },
          {
            en: "Shift differentials: Night shift, weekend, holiday pay often adds 10-15% to base. Check if your contract includes this.",
            es: "Diferenciales de turno: El turno nocturno, fin de semana, pago de feriados a menudo suma 10-15% a la base.",
          },
          {
            en: "Overtime (OT): Anything over 8 hours/day or 40 hours/week = 1.5x pay (or 2x pay over 12 hours/day). This is in the contract AND California law.",
            es: "Horas extraordinarias (OT): Cualquier cosa más de 8 horas/día o 40 horas/semana = pago 1.5x. Esto está en el contrato Y en la ley de California.",
          },
        ],
      },
      {
        heading: {
          en: "Seniority & Layoff/Recall Rights",
          es: "Antigüedad y Derechos de Despido/Retiro",
        },
        keyPoints: [
          {
            en: "SENIORITY = years of continuous employment at the FQHC. Your seniority determines: layoff order, promotion eligibility, shift choice, and recall rights.",
            es: "ANTIGÜEDAD = años de empleo continuo en el FQHC. Tu antigüedad determina: orden de despido, elegibilidad de promoción, elección de turno y derechos de retiro.",
          },
          {
            en: "LAST IN, FIRST OUT (LIFO): In layoffs, the most recently hired are let go first. If you have 10 years, you're usually protected unless your whole department closes.",
            es: "ÚLTIMO ENTRADA, PRIMER SALIDA (LIFO): En despidos, los contratados recientemente se van primero. Si tienes 10 años, generalmente estás protegido.",
          },
          {
            en: "RECALL RIGHTS: If you're laid off, you stay on a recall list (usually 1-2 years). If your FQHC rehires, most senior workers are called back first.",
            es: "DERECHOS DE RETIRO: Si te despiden, permaneces en una lista de retiro (generalmente 1-2 años). Si tu FQHC recontrata, los trabajadores más antiguos se llaman primero.",
          },
          {
            en: "Example: If your FQHC lays off 20 people due to budget cuts, seniority order determines who goes. If you're a 3-year MA and there's a 1-year MA, the 1-year person is let go first.",
            es: "Ejemplo: Si tu FQHC despide a 20 personas debido a recortes presupuestarios, el orden de antigüedad determina quién se va.",
          },
        ],
      },
      {
        heading: {
          en: "Management Rights Clause: What They Can & Can't Do",
          es: "Cláusula de Derechos Gerenciales: Qué Pueden y No Pueden Hacer",
        },
        keyPoints: [
          {
            en: "Management can (usually): hire/fire for just cause, assign work, set schedules (within contract), create new policies (if not contradicting contract).",
            es: "La gerencia puede (generalmente): contratar/despedir por causa justificada, asignar trabajo, establecer horarios (dentro del contrato), crear nuevas políticas.",
          },
          {
            en: "Management cannot: change wages, benefits, or working conditions without union negotiation. Cannot subcontract your job to 1099 contractors. Cannot permanently change your shift without seniority order.",
            es: "La gerencia no puede: cambiar salarios, beneficios o condiciones de trabajo sin negociación sindical. No puede subcontratar tu trabajo. No puede cambiar permanentemente tu turno sin orden de antigüedad.",
          },
          {
            en: "If management tries something new and you think it violates the contract: FILE A GRIEVANCE. Don't just accept it. Your union has your back.",
            es: "Si la gerencia intenta algo nuevo y crees que viola el contrato: PRESENTA UNA QUEJA. No lo aceptes. Tu sindicato te respalda.",
          },
        ],
      },
    ],
    primarySourceUrl: "https://www.nlrb.gov/",
    primarySourceOrg: "National Labor Relations Board (NLRB)",
    additionalSources: [
      {
        label: "NLRB: Union Contract Basics",
        url: "https://www.nlrb.gov/news-publications/publications/brochures",
      },
      {
        label: "SEIU: How to Read Your Union Contract",
        url: "https://www.seiu.org/",
      },
      {
        label: "NUHW: Contract FAQ",
        url: "https://nuhw.org/",
      },
      {
        label: "California Department of Industrial Relations: Labor Rights",
        url: "https://dir.ca.gov/dlse/",
      },
    ],
    targetRoles: ["all"],
    tags: ["union-contract", "labor-rights", "grievance-procedure", "seniority", "wage-scales", "collective-bargaining", "unionized-fqhc"],
    lastUpdated: "2026-03-11",
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
