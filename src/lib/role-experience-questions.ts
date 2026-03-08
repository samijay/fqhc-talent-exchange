/* ------------------------------------------------------------------ */
/*  Role-Specific Experience Questions                                  */
/*  Maps concrete work experience → resume bullet recommendations       */
/* ------------------------------------------------------------------ */

export interface ExperienceOption {
  id: string;
  text: string;
  esText: string;
  /** Bullet IDs from resume-templates.ts to auto-recommend */
  recommendsBullets: string[];
}

export interface RoleExperienceQuestion {
  id: string;
  roleId: string;
  question: string;
  esQuestion: string;
  helpText?: string;
  esHelpText?: string;
  answerType: "single" | "multi";
  options: ExperienceOption[];
}

/* ------------------------------------------------------------------ */
/*  CHW — Community Health Worker                                       */
/* ------------------------------------------------------------------ */

const CHW_QUESTIONS: RoleExperienceQuestion[] = [
  {
    id: "chw_outreach",
    roleId: "chw",
    question: "What types of patient outreach have you done?",
    esQuestion: "¿Qué tipos de alcance a pacientes ha realizado?",
    helpText: "Select all that apply to your experience.",
    esHelpText: "Seleccione todos los que apliquen a su experiencia.",
    answerType: "multi",
    options: [
      {
        id: "chw_outreach_home",
        text: "Home visits / field-based outreach",
        esText: "Visitas domiciliarias / alcance en campo",
        recommendsBullets: ["chw-8"],
      },
      {
        id: "chw_outreach_community",
        text: "Community events / health fairs",
        esText: "Eventos comunitarios / ferias de salud",
        recommendsBullets: ["chw-1"],
      },
      {
        id: "chw_outreach_phone",
        text: "Phone or text outreach campaigns",
        esText: "Campañas de alcance por teléfono o texto",
        recommendsBullets: ["chw-4"],
      },
      {
        id: "chw_outreach_sdoh",
        text: "SDOH screenings and resource connections",
        esText: "Evaluaciones SDOH y conexiones a recursos",
        recommendsBullets: ["chw-2"],
      },
    ],
  },
  {
    id: "chw_caseload",
    roleId: "chw",
    question: "How large was your typical caseload?",
    esQuestion: "¿Cuál era el tamaño típico de su carga de pacientes?",
    answerType: "single",
    options: [
      {
        id: "chw_caseload_small",
        text: "Under 20 patients",
        esText: "Menos de 20 pacientes",
        recommendsBullets: [],
      },
      {
        id: "chw_caseload_medium",
        text: "20–50 patients",
        esText: "20–50 pacientes",
        recommendsBullets: ["chw-3"],
      },
      {
        id: "chw_caseload_large",
        text: "50–100 patients",
        esText: "50–100 pacientes",
        recommendsBullets: ["chw-3"],
      },
      {
        id: "chw_caseload_xlarge",
        text: "100+ patients",
        esText: "100+ pacientes",
        recommendsBullets: ["chw-3"],
      },
    ],
  },
  {
    id: "chw_programs",
    roleId: "chw",
    question: "Which programs have you worked in?",
    esQuestion: "¿En qué programas ha trabajado?",
    helpText: "Select all programs you have experience with.",
    esHelpText: "Seleccione todos los programas con los que tiene experiencia.",
    answerType: "multi",
    options: [
      {
        id: "chw_prog_ecm",
        text: "ECM (Enhanced Care Management)",
        esText: "ECM (Manejo de Atención Mejorada)",
        recommendsBullets: ["chw-1"],
      },
      {
        id: "chw_prog_ccm",
        text: "CCM (Complex Care Management)",
        esText: "CCM (Gestión de Atención Compleja)",
        recommendsBullets: ["chw-1"],
      },
      {
        id: "chw_prog_community",
        text: "Community Supports / CalAIM",
        esText: "Apoyos Comunitarios / CalAIM",
        recommendsBullets: ["chw-2"],
      },
      {
        id: "chw_prog_medicaid",
        text: "Medi-Cal enrollment assistance",
        esText: "Asistencia con inscripción en Medi-Cal",
        recommendsBullets: ["chw-6"],
      },
      {
        id: "chw_prog_none",
        text: "None yet — I'm new to these programs",
        esText: "Ninguno aún — soy nuevo/a en estos programas",
        recommendsBullets: [],
      },
    ],
  },
  {
    id: "chw_activities",
    roleId: "chw",
    question: "What patient support activities have you performed?",
    esQuestion: "¿Qué actividades de apoyo al paciente ha realizado?",
    answerType: "multi",
    options: [
      {
        id: "chw_act_health_ed",
        text: "Health education (individual or group)",
        esText: "Educación en salud (individual o grupal)",
        recommendsBullets: ["chw-5"],
      },
      {
        id: "chw_act_resources",
        text: "Connecting patients to housing, food, or transportation",
        esText: "Conectar pacientes con vivienda, alimentación o transporte",
        recommendsBullets: ["chw-2"],
      },
      {
        id: "chw_act_team",
        text: "Working with multidisciplinary care teams",
        esText: "Trabajo con equipos de atención multidisciplinarios",
        recommendsBullets: ["chw-7"],
      },
      {
        id: "chw_act_ehr",
        text: "EHR documentation of patient interactions",
        esText: "Documentación de interacciones con pacientes en EHR",
        recommendsBullets: ["chw-4"],
      },
      {
        id: "chw_act_benefits",
        text: "Benefits navigation and appointment scheduling",
        esText: "Navegación de beneficios y programación de citas",
        recommendsBullets: ["chw-6"],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Care Coordinator                                                    */
/* ------------------------------------------------------------------ */

const CARE_COORDINATOR_QUESTIONS: RoleExperienceQuestion[] = [
  {
    id: "cc_care_plans",
    roleId: "care_coordinator",
    question: "What care coordination activities have you performed?",
    esQuestion: "¿Qué actividades de coordinación de atención ha realizado?",
    answerType: "multi",
    options: [
      {
        id: "cc_plans_develop",
        text: "Developing individualized care plans with providers",
        esText: "Desarrollo de planes de atención individualizados con proveedores",
        recommendsBullets: ["cc-2"],
      },
      {
        id: "cc_plans_followup",
        text: "Patient follow-up and engagement tracking",
        esText: "Seguimiento de pacientes y rastreo de compromiso",
        recommendsBullets: ["cc-1"],
      },
      {
        id: "cc_plans_transitions",
        text: "Managing care transitions / hospital discharge follow-up",
        esText: "Gestión de transiciones de atención / seguimiento post-alta",
        recommendsBullets: ["cc-4"],
      },
      {
        id: "cc_plans_referrals",
        text: "Facilitating referrals to Community Supports services",
        esText: "Facilitar referencias a servicios de Apoyos Comunitarios",
        recommendsBullets: ["cc-5"],
      },
    ],
  },
  {
    id: "cc_quality",
    roleId: "care_coordinator",
    question: "Have you worked with quality measures or reporting?",
    esQuestion: "¿Ha trabajado con medidas de calidad o reportes?",
    answerType: "multi",
    options: [
      {
        id: "cc_qual_hedis",
        text: "HEDIS measures tracking and reporting",
        esText: "Rastreo y reporte de medidas HEDIS",
        recommendsBullets: ["cc-3"],
      },
      {
        id: "cc_qual_uds",
        text: "UDS (Uniform Data System) reporting",
        esText: "Reportes UDS (Sistema de Datos Uniformes)",
        recommendsBullets: ["cc-3"],
      },
      {
        id: "cc_qual_ehr",
        text: "EHR documentation and population health reporting",
        esText: "Documentación EHR y reportes de salud poblacional",
        recommendsBullets: ["cc-6"],
      },
      {
        id: "cc_qual_none",
        text: "Not yet — but I'm willing to learn",
        esText: "Aún no — pero estoy dispuesto/a a aprender",
        recommendsBullets: [],
      },
    ],
  },
  {
    id: "cc_programs",
    roleId: "care_coordinator",
    question: "Which programs have you coordinated?",
    esQuestion: "¿Qué programas ha coordinado?",
    answerType: "multi",
    options: [
      {
        id: "cc_prog_ecm",
        text: "ECM (Enhanced Care Management)",
        esText: "ECM (Manejo de Atención Mejorada)",
        recommendsBullets: ["cc-1"],
      },
      {
        id: "cc_prog_ccm",
        text: "CCM (Complex Care Management)",
        esText: "CCM (Gestión de Atención Compleja)",
        recommendsBullets: ["cc-1"],
      },
      {
        id: "cc_prog_community_supports",
        text: "Community Supports / CalAIM",
        esText: "Apoyos Comunitarios / CalAIM",
        recommendsBullets: ["cc-5"],
      },
      {
        id: "cc_prog_none",
        text: "None yet",
        esText: "Ninguno aún",
        recommendsBullets: [],
      },
    ],
  },
  {
    id: "cc_engagement",
    roleId: "care_coordinator",
    question: "What patient engagement methods have you used?",
    esQuestion: "¿Qué métodos de compromiso del paciente ha utilizado?",
    answerType: "multi",
    options: [
      {
        id: "cc_engage_mi",
        text: "Motivational interviewing",
        esText: "Entrevista motivacional",
        recommendsBullets: ["cc-7"],
      },
      {
        id: "cc_engage_outreach",
        text: "Phone/text outreach for engagement",
        esText: "Alcance por teléfono/texto para compromiso",
        recommendsBullets: ["cc-1"],
      },
      {
        id: "cc_engage_care_team",
        text: "Care team huddles and case conferences",
        esText: "Reuniones de equipo y conferencias de casos",
        recommendsBullets: ["cc-2"],
      },
      {
        id: "cc_engage_ehr",
        text: "Using EHR tools for scheduling and tracking",
        esText: "Uso de herramientas EHR para programación y rastreo",
        recommendsBullets: ["cc-6"],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Medical Assistant                                                   */
/* ------------------------------------------------------------------ */

const MEDICAL_ASSISTANT_QUESTIONS: RoleExperienceQuestion[] = [
  {
    id: "ma_clinical",
    roleId: "medical_assistant",
    question: "What clinical tasks have you performed?",
    esQuestion: "¿Qué tareas clínicas ha realizado?",
    answerType: "multi",
    options: [
      {
        id: "ma_clinical_intake",
        text: "Patient intake, vitals, and medication reconciliation",
        esText: "Admisión de pacientes, signos vitales y reconciliación de medicamentos",
        recommendsBullets: ["ma-1"],
      },
      {
        id: "ma_clinical_vaccines",
        text: "Vaccinations, injections, and point-of-care testing",
        esText: "Vacunas, inyecciones y pruebas de punto de atención",
        recommendsBullets: ["ma-2"],
      },
      {
        id: "ma_clinical_scheduling",
        text: "Managing provider schedules and patient flow",
        esText: "Gestión de horarios de proveedores y flujo de pacientes",
        recommendsBullets: ["ma-3"],
      },
      {
        id: "ma_clinical_quality",
        text: "Quality improvement (HEDIS, patient satisfaction)",
        esText: "Mejora de calidad (HEDIS, satisfacción del paciente)",
        recommendsBullets: ["ma-6"],
      },
    ],
  },
  {
    id: "ma_documentation",
    roleId: "medical_assistant",
    question: "What documentation experience do you have?",
    esQuestion: "¿Qué experiencia en documentación tiene?",
    answerType: "multi",
    options: [
      {
        id: "ma_doc_ehr",
        text: "EHR documentation of clinical encounters",
        esText: "Documentación de encuentros clínicos en EHR",
        recommendsBullets: ["ma-4"],
      },
      {
        id: "ma_doc_referrals",
        text: "Processing referrals and authorizations",
        esText: "Procesamiento de referidos y autorizaciones",
        recommendsBullets: ["ma-4"],
      },
      {
        id: "ma_doc_bilingual",
        text: "Bilingual patient communication / translation",
        esText: "Comunicación bilingüe con pacientes / traducción",
        recommendsBullets: ["ma-5"],
      },
      {
        id: "ma_doc_none",
        text: "Limited documentation experience so far",
        esText: "Experiencia limitada en documentación hasta ahora",
        recommendsBullets: [],
      },
    ],
  },
  {
    id: "ma_volume",
    roleId: "medical_assistant",
    question: "What was your typical daily patient volume?",
    esQuestion: "¿Cuál era su volumen típico diario de pacientes?",
    answerType: "single",
    options: [
      {
        id: "ma_vol_low",
        text: "Under 15 patients per day",
        esText: "Menos de 15 pacientes por día",
        recommendsBullets: [],
      },
      {
        id: "ma_vol_medium",
        text: "15–25 patients per day",
        esText: "15–25 pacientes por día",
        recommendsBullets: ["ma-3"],
      },
      {
        id: "ma_vol_high",
        text: "25–40 patients per day",
        esText: "25–40 pacientes por día",
        recommendsBullets: ["ma-3"],
      },
      {
        id: "ma_vol_very_high",
        text: "40+ patients per day",
        esText: "40+ pacientes por día",
        recommendsBullets: ["ma-3"],
      },
    ],
  },
  {
    id: "ma_setting",
    roleId: "medical_assistant",
    question: "What healthcare settings have you worked in?",
    esQuestion: "¿En qué entornos de salud ha trabajado?",
    helpText: "FQHC experience is highly valued by employers.",
    esHelpText: "La experiencia en FQHC es muy valorada por los empleadores.",
    answerType: "multi",
    options: [
      {
        id: "ma_setting_fqhc",
        text: "FQHC / Community health center",
        esText: "FQHC / Centro de salud comunitario",
        recommendsBullets: ["ma-1", "ma-6"],
      },
      {
        id: "ma_setting_hospital",
        text: "Hospital or urgent care",
        esText: "Hospital o atención urgente",
        recommendsBullets: ["ma-2"],
      },
      {
        id: "ma_setting_private",
        text: "Private practice / specialty clinic",
        esText: "Práctica privada / clínica especializada",
        recommendsBullets: ["ma-4"],
      },
      {
        id: "ma_setting_new",
        text: "New graduate — clinical rotations only",
        esText: "Recién graduado/a — solo rotaciones clínicas",
        recommendsBullets: [],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Case Manager                                                        */
/* ------------------------------------------------------------------ */

const CASE_MANAGER_QUESTIONS: RoleExperienceQuestion[] = [
  {
    id: "cm_caseload",
    roleId: "case_manager",
    question: "What types of patients have you managed?",
    esQuestion: "¿Qué tipos de pacientes ha gestionado?",
    answerType: "multi",
    options: [
      {
        id: "cm_case_cooccurring",
        text: "Co-occurring behavioral health and medical conditions",
        esText: "Condiciones concurrentes de salud conductual y médicas",
        recommendsBullets: ["cm-1"],
      },
      {
        id: "cm_case_substance",
        text: "Substance use disorders",
        esText: "Trastornos por uso de sustancias",
        recommendsBullets: ["cm-1"],
      },
      {
        id: "cm_case_housing",
        text: "Homeless / housing-insecure individuals",
        esText: "Personas sin hogar / con inseguridad de vivienda",
        recommendsBullets: ["cm-5"],
      },
      {
        id: "cm_case_chronic",
        text: "Chronic disease / high-utilizer patients",
        esText: "Enfermedades crónicas / pacientes de alto uso",
        recommendsBullets: ["cm-1"],
      },
    ],
  },
  {
    id: "cm_assessments",
    roleId: "case_manager",
    question: "What assessments and planning have you done?",
    esQuestion: "¿Qué evaluaciones y planificación ha realizado?",
    answerType: "multi",
    options: [
      {
        id: "cm_assess_bps",
        text: "Biopsychosocial assessments",
        esText: "Evaluaciones biopsicosociales",
        recommendsBullets: ["cm-2"],
      },
      {
        id: "cm_assess_treatment",
        text: "Individualized treatment plan development",
        esText: "Desarrollo de planes de tratamiento individualizados",
        recommendsBullets: ["cm-2"],
      },
      {
        id: "cm_assess_coordinate",
        text: "Cross-provider care coordination",
        esText: "Coordinación de atención entre proveedores",
        recommendsBullets: ["cm-3"],
      },
      {
        id: "cm_assess_advocacy",
        text: "Patient advocacy for housing, legal aid, benefits",
        esText: "Abogacía por vivienda, asistencia legal, beneficios",
        recommendsBullets: ["cm-5"],
      },
    ],
  },
  {
    id: "cm_programs",
    roleId: "case_manager",
    question: "Which programs have you worked with?",
    esQuestion: "¿Con qué programas ha trabajado?",
    answerType: "multi",
    options: [
      {
        id: "cm_prog_ecm",
        text: "ECM (Enhanced Care Management) / CalAIM",
        esText: "ECM (Manejo de Atención Mejorada) / CalAIM",
        recommendsBullets: ["cm-4"],
      },
      {
        id: "cm_prog_ccm",
        text: "CCM / Complex Care Management",
        esText: "CCM / Gestión de Atención Compleja",
        recommendsBullets: ["cm-4"],
      },
      {
        id: "cm_prog_billing",
        text: "Medi-Cal billing and HIPAA compliance",
        esText: "Facturación Medi-Cal y cumplimiento HIPAA",
        recommendsBullets: ["cm-6"],
      },
      {
        id: "cm_prog_none",
        text: "None yet",
        esText: "Ninguno aún",
        recommendsBullets: [],
      },
    ],
  },
  {
    id: "cm_documentation",
    roleId: "case_manager",
    question: "How do you handle documentation and compliance?",
    esQuestion: "¿Cómo maneja la documentación y el cumplimiento?",
    answerType: "multi",
    options: [
      {
        id: "cm_doc_ehr",
        text: "Case management documentation in EHR",
        esText: "Documentación de gestión de casos en EHR",
        recommendsBullets: ["cm-6"],
      },
      {
        id: "cm_doc_ecm_reporting",
        text: "ECM enrollment and CalAIM reporting",
        esText: "Inscripción ECM y reportes CalAIM",
        recommendsBullets: ["cm-4"],
      },
      {
        id: "cm_doc_medicaid",
        text: "Medi-Cal billing documentation",
        esText: "Documentación de facturación Medi-Cal",
        recommendsBullets: ["cm-6"],
      },
      {
        id: "cm_doc_limited",
        text: "Some documentation — still building skills",
        esText: "Algo de documentación — aún desarrollando habilidades",
        recommendsBullets: [],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Behavioral Health Specialist                                        */
/* ------------------------------------------------------------------ */

const BEHAVIORAL_HEALTH_QUESTIONS: RoleExperienceQuestion[] = [
  {
    id: "bh_modalities",
    roleId: "behavioral_health",
    question: "What therapy modalities have you provided?",
    esQuestion: "¿Qué modalidades de terapia ha proporcionado?",
    answerType: "multi",
    options: [
      {
        id: "bh_mod_individual",
        text: "Individual and group therapy (depression, anxiety, PTSD, SUD)",
        esText: "Terapia individual y grupal (depresión, ansiedad, TEPT, SUD)",
        recommendsBullets: ["bh-1"],
      },
      {
        id: "bh_mod_integrated",
        text: "Integrated BH in primary care (warm handoff model)",
        esText: "Salud conductual integrada en atención primaria (modelo de transferencia cálida)",
        recommendsBullets: ["bh-2"],
      },
      {
        id: "bh_mod_crisis",
        text: "Crisis assessments and safety planning",
        esText: "Evaluaciones de crisis y planificación de seguridad",
        recommendsBullets: ["bh-3"],
      },
      {
        id: "bh_mod_trauma",
        text: "Trauma-informed care for diverse populations",
        esText: "Atención informada por trauma para poblaciones diversas",
        recommendsBullets: ["bh-6"],
      },
    ],
  },
  {
    id: "bh_programs",
    roleId: "behavioral_health",
    question: "Which behavioral health programs have you worked in?",
    esQuestion: "¿En qué programas de salud conductual ha trabajado?",
    answerType: "multi",
    options: [
      {
        id: "bh_prog_bhaso",
        text: "BH-ASO (Behavioral Health Administrative Services Organization)",
        esText: "BH-ASO (Organización de Servicios Administrativos de Salud Conductual)",
        recommendsBullets: ["bh-4"],
      },
      {
        id: "bh_prog_integration",
        text: "Behavioral health integration in primary care",
        esText: "Integración de salud conductual en atención primaria",
        recommendsBullets: ["bh-2"],
      },
      {
        id: "bh_prog_smi_sud",
        text: "SMI / SUD treatment programs",
        esText: "Programas de tratamiento SMI / SUD",
        recommendsBullets: ["bh-6"],
      },
      {
        id: "bh_prog_none",
        text: "None yet",
        esText: "Ninguno aún",
        recommendsBullets: [],
      },
    ],
  },
  {
    id: "bh_documentation",
    roleId: "behavioral_health",
    question: "What documentation and billing experience do you have?",
    esQuestion: "¿Qué experiencia en documentación y facturación tiene?",
    answerType: "multi",
    options: [
      {
        id: "bh_doc_medicaid",
        text: "Medi-Cal billing for behavioral health services",
        esText: "Facturación Medi-Cal para servicios de salud conductual",
        recommendsBullets: ["bh-5"],
      },
      {
        id: "bh_doc_compliance",
        text: "HIPAA compliance and clinical documentation",
        esText: "Cumplimiento HIPAA y documentación clínica",
        recommendsBullets: ["bh-5"],
      },
      {
        id: "bh_doc_bhaso_reporting",
        text: "BH-ASO compliance reporting",
        esText: "Reportes de cumplimiento BH-ASO",
        recommendsBullets: ["bh-4"],
      },
      {
        id: "bh_doc_limited",
        text: "Still developing billing/documentation skills",
        esText: "Aún desarrollando habilidades de facturación/documentación",
        recommendsBullets: [],
      },
    ],
  },
  {
    id: "bh_populations",
    roleId: "behavioral_health",
    question: "What populations have you worked with?",
    esQuestion: "¿Con qué poblaciones ha trabajado?",
    answerType: "multi",
    options: [
      {
        id: "bh_pop_smi",
        text: "Serious mental illness (SMI)",
        esText: "Enfermedad mental grave (SMI)",
        recommendsBullets: ["bh-6"],
      },
      {
        id: "bh_pop_sud",
        text: "Substance use disorders (SUD)",
        esText: "Trastornos por uso de sustancias (SUD)",
        recommendsBullets: ["bh-1"],
      },
      {
        id: "bh_pop_homeless",
        text: "Unhoused / housing-insecure individuals",
        esText: "Personas sin hogar / con inseguridad de vivienda",
        recommendsBullets: ["bh-6"],
      },
      {
        id: "bh_pop_general",
        text: "General outpatient (depression, anxiety)",
        esText: "Ambulatorio general (depresión, ansiedad)",
        recommendsBullets: ["bh-1"],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Registered Nurse (RN)                                               */
/* ------------------------------------------------------------------ */

const REGISTERED_NURSE_QUESTIONS: RoleExperienceQuestion[] = [
  {
    id: "rn_clinical",
    roleId: "registered_nurse",
    question: "What clinical nursing activities have you performed?",
    esQuestion: "¿Qué actividades clínicas de enfermería ha realizado?",
    answerType: "multi",
    options: [
      {
        id: "rn_clinical_assess",
        text: "Comprehensive nursing assessments and triage",
        esText: "Evaluaciones de enfermería integrales y triaje",
        recommendsBullets: ["rn-1"],
      },
      {
        id: "rn_clinical_meds",
        text: "Medication administration, immunizations, and treatments",
        esText: "Administración de medicamentos, inmunizaciones y tratamientos",
        recommendsBullets: ["rn-3"],
      },
      {
        id: "rn_clinical_chronic",
        text: "Chronic disease panel management (diabetes, HTN, asthma)",
        esText: "Gestión de paneles de enfermedades crónicas (diabetes, HTA, asma)",
        recommendsBullets: ["rn-2"],
      },
      {
        id: "rn_clinical_education",
        text: "Patient and family education on disease management",
        esText: "Educación al paciente y familia sobre manejo de enfermedades",
        recommendsBullets: ["rn-7"],
      },
    ],
  },
  {
    id: "rn_coordination",
    roleId: "registered_nurse",
    question: "What care coordination have you been involved in?",
    esQuestion: "¿En qué coordinación de atención ha participado?",
    answerType: "multi",
    options: [
      {
        id: "rn_coord_transitions",
        text: "Care transitions and hospital discharge follow-up",
        esText: "Transiciones de atención y seguimiento post-alta hospitalaria",
        recommendsBullets: ["rn-4"],
      },
      {
        id: "rn_coord_team",
        text: "Multidisciplinary huddles and case conferences",
        esText: "Reuniones multidisciplinarias y conferencias de casos",
        recommendsBullets: ["rn-5"],
      },
      {
        id: "rn_coord_ehr",
        text: "EHR documentation and Medi-Cal compliance",
        esText: "Documentación EHR y cumplimiento Medi-Cal",
        recommendsBullets: ["rn-6"],
      },
      {
        id: "rn_coord_plans",
        text: "Developing individualized care plans",
        esText: "Desarrollo de planes de atención individualizados",
        recommendsBullets: ["rn-1"],
      },
    ],
  },
  {
    id: "rn_setting",
    roleId: "registered_nurse",
    question: "What settings have you worked in as an RN?",
    esQuestion: "¿En qué entornos ha trabajado como enfermero/a?",
    helpText: "FQHC and outpatient experience is highly valued.",
    esHelpText: "La experiencia en FQHC y ambulatoria es muy valorada.",
    answerType: "multi",
    options: [
      {
        id: "rn_set_fqhc",
        text: "FQHC / Community health center",
        esText: "FQHC / Centro de salud comunitario",
        recommendsBullets: ["rn-1", "rn-6"],
      },
      {
        id: "rn_set_hospital",
        text: "Hospital (inpatient / ED)",
        esText: "Hospital (hospitalización / urgencias)",
        recommendsBullets: ["rn-4"],
      },
      {
        id: "rn_set_outpatient",
        text: "Outpatient / ambulatory clinic",
        esText: "Clínica ambulatoria",
        recommendsBullets: ["rn-2", "rn-3"],
      },
      {
        id: "rn_set_home_health",
        text: "Home health / public health nursing",
        esText: "Enfermería domiciliaria / salud pública",
        recommendsBullets: ["rn-7"],
      },
    ],
  },
  {
    id: "rn_panel",
    roleId: "registered_nurse",
    question: "How large was your typical patient panel or caseload?",
    esQuestion: "¿Cuál era el tamaño típico de su panel o carga de pacientes?",
    answerType: "single",
    options: [
      {
        id: "rn_panel_small",
        text: "Under 15 patients per day",
        esText: "Menos de 15 pacientes por día",
        recommendsBullets: [],
      },
      {
        id: "rn_panel_medium",
        text: "15–25 patients per day",
        esText: "15–25 pacientes por día",
        recommendsBullets: ["rn-1"],
      },
      {
        id: "rn_panel_large",
        text: "25+ patients per day",
        esText: "25+ pacientes por día",
        recommendsBullets: ["rn-1"],
      },
      {
        id: "rn_panel_chronic",
        text: "Panel-based chronic disease management (100+ patients)",
        esText: "Gestión de panel de enfermedades crónicas (100+ pacientes)",
        recommendsBullets: ["rn-2"],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Patient Services Representative                                     */
/* ------------------------------------------------------------------ */

const PATIENT_SERVICES_QUESTIONS: RoleExperienceQuestion[] = [
  {
    id: "ps_registration",
    roleId: "patient_services",
    question: "What front desk / registration tasks have you done?",
    esQuestion: "¿Qué tareas de recepción / registro ha realizado?",
    answerType: "multi",
    options: [
      {
        id: "ps_reg_checkin",
        text: "Patient check-in, registration, and demographic verification",
        esText: "Registro de pacientes, inscripción y verificación demográfica",
        recommendsBullets: ["ps-1"],
      },
      {
        id: "ps_reg_insurance",
        text: "Insurance eligibility verification (Medi-Cal, Medicare)",
        esText: "Verificación de elegibilidad de seguro (Medi-Cal, Medicare)",
        recommendsBullets: ["ps-2"],
      },
      {
        id: "ps_reg_scheduling",
        text: "Scheduling and coordinating patient appointments",
        esText: "Programación y coordinación de citas de pacientes",
        recommendsBullets: ["ps-3"],
      },
      {
        id: "ps_reg_referrals",
        text: "Processing referrals and authorizations",
        esText: "Procesamiento de referencias y autorizaciones",
        recommendsBullets: ["ps-5"],
      },
    ],
  },
  {
    id: "ps_enrollment",
    roleId: "patient_services",
    question: "What enrollment and financial activities have you handled?",
    esQuestion: "¿Qué actividades de inscripción y financieras ha manejado?",
    answerType: "multi",
    options: [
      {
        id: "ps_enroll_medicaid",
        text: "Medi-Cal enrollment and benefit renewals",
        esText: "Inscripción en Medi-Cal y renovaciones de beneficios",
        recommendsBullets: ["ps-6"],
      },
      {
        id: "ps_enroll_sliding",
        text: "Sliding fee scale determination and co-payment collection",
        esText: "Determinación de escala deslizante y cobro de copagos",
        recommendsBullets: ["ps-7"],
      },
      {
        id: "ps_enroll_bilingual",
        text: "Bilingual patient customer service",
        esText: "Servicio al cliente bilingüe para pacientes",
        recommendsBullets: ["ps-4"],
      },
      {
        id: "ps_enroll_none",
        text: "No enrollment experience yet",
        esText: "Sin experiencia en inscripción aún",
        recommendsBullets: [],
      },
    ],
  },
  {
    id: "ps_volume",
    roleId: "patient_services",
    question: "What was your typical daily patient volume?",
    esQuestion: "¿Cuál era su volumen típico diario de pacientes?",
    answerType: "single",
    options: [
      {
        id: "ps_vol_low",
        text: "Under 30 patients per day",
        esText: "Menos de 30 pacientes por día",
        recommendsBullets: [],
      },
      {
        id: "ps_vol_medium",
        text: "30–60 patients per day",
        esText: "30–60 pacientes por día",
        recommendsBullets: ["ps-1"],
      },
      {
        id: "ps_vol_high",
        text: "60–100 patients per day",
        esText: "60–100 pacientes por día",
        recommendsBullets: ["ps-1", "ps-3"],
      },
      {
        id: "ps_vol_very_high",
        text: "100+ patients per day",
        esText: "100+ pacientes por día",
        recommendsBullets: ["ps-1", "ps-3"],
      },
    ],
  },
  {
    id: "ps_setting",
    roleId: "patient_services",
    question: "What healthcare settings have you worked in?",
    esQuestion: "¿En qué entornos de salud ha trabajado?",
    answerType: "multi",
    options: [
      {
        id: "ps_set_fqhc",
        text: "FQHC / Community health center",
        esText: "FQHC / Centro de salud comunitario",
        recommendsBullets: ["ps-1", "ps-2"],
      },
      {
        id: "ps_set_hospital",
        text: "Hospital registration / admitting",
        esText: "Registro / admisión hospitalaria",
        recommendsBullets: ["ps-5"],
      },
      {
        id: "ps_set_private",
        text: "Private practice / specialty office",
        esText: "Práctica privada / consultorio especializado",
        recommendsBullets: ["ps-3"],
      },
      {
        id: "ps_set_new",
        text: "New to healthcare — coming from another field",
        esText: "Nuevo/a en salud — vengo de otro campo",
        recommendsBullets: [],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Revenue Cycle / Billing Specialist                                  */
/* ------------------------------------------------------------------ */

const REVENUE_CYCLE_QUESTIONS: RoleExperienceQuestion[] = [
  {
    id: "rc_claims",
    roleId: "revenue_cycle",
    question: "What billing and claims activities have you performed?",
    esQuestion: "¿Qué actividades de facturación y reclamos ha realizado?",
    answerType: "multi",
    options: [
      {
        id: "rc_claims_submit",
        text: "Claims submission for Medi-Cal, Medicare, and commercial payers",
        esText: "Envío de reclamos para Medi-Cal, Medicare y aseguradoras comerciales",
        recommendsBullets: ["rc-1"],
      },
      {
        id: "rc_claims_denials",
        text: "Denial follow-up and appeals",
        esText: "Seguimiento de denegaciones y apelaciones",
        recommendsBullets: ["rc-2"],
      },
      {
        id: "rc_claims_eligibility",
        text: "Patient eligibility and benefits verification",
        esText: "Verificación de elegibilidad y beneficios de pacientes",
        recommendsBullets: ["rc-3"],
      },
      {
        id: "rc_claims_coding",
        text: "ICD-10 / CPT coding for outpatient encounters",
        esText: "Codificación ICD-10 / CPT para encuentros ambulatorios",
        recommendsBullets: ["rc-4"],
      },
    ],
  },
  {
    id: "rc_reporting",
    roleId: "revenue_cycle",
    question: "What revenue cycle analytics or reporting have you done?",
    esQuestion: "¿Qué análisis o reportes de ciclo de ingresos ha realizado?",
    answerType: "multi",
    options: [
      {
        id: "rc_report_ar",
        text: "A/R aging reports and collection rate tracking",
        esText: "Reportes de antigüedad de cuentas por cobrar y rastreo de tasas de cobro",
        recommendsBullets: ["rc-5"],
      },
      {
        id: "rc_report_payer",
        text: "Payer mix analysis and dashboards",
        esText: "Análisis de mezcla de pagadores y tableros",
        recommendsBullets: ["rc-5"],
      },
      {
        id: "rc_report_collab",
        text: "Working with clinical staff on coding/documentation issues",
        esText: "Trabajo con personal clínico en problemas de codificación/documentación",
        recommendsBullets: ["rc-6"],
      },
      {
        id: "rc_report_limited",
        text: "Limited reporting experience so far",
        esText: "Experiencia limitada en reportes hasta ahora",
        recommendsBullets: [],
      },
    ],
  },
  {
    id: "rc_pps",
    roleId: "revenue_cycle",
    question: "Are you familiar with FQHC-specific billing?",
    esQuestion: "¿Está familiarizado/a con la facturación específica de FQHC?",
    helpText: "FQHC PPS billing is a specialized skill highly valued by employers.",
    esHelpText: "La facturación PPS de FQHC es una habilidad especializada muy valorada por los empleadores.",
    answerType: "single",
    options: [
      {
        id: "rc_pps_expert",
        text: "Yes — experienced with FQHC PPS and Medi-Cal billing",
        esText: "Sí — con experiencia en PPS de FQHC y facturación Medi-Cal",
        recommendsBullets: ["rc-4", "rc-1"],
      },
      {
        id: "rc_pps_some",
        text: "Some experience — learning FQHC-specific rules",
        esText: "Algo de experiencia — aprendiendo reglas específicas de FQHC",
        recommendsBullets: ["rc-4"],
      },
      {
        id: "rc_pps_other",
        text: "Billing experience in other settings (hospital, private)",
        esText: "Experiencia en facturación en otros entornos (hospital, privado)",
        recommendsBullets: ["rc-1"],
      },
      {
        id: "rc_pps_new",
        text: "New to healthcare billing",
        esText: "Nuevo/a en facturación de salud",
        recommendsBullets: [],
      },
    ],
  },
  {
    id: "rc_volume",
    roleId: "revenue_cycle",
    question: "What was your typical monthly claims volume?",
    esQuestion: "¿Cuál era su volumen típico mensual de reclamos?",
    answerType: "single",
    options: [
      {
        id: "rc_vol_low",
        text: "Under 200 claims per month",
        esText: "Menos de 200 reclamos por mes",
        recommendsBullets: [],
      },
      {
        id: "rc_vol_medium",
        text: "200–500 claims per month",
        esText: "200–500 reclamos por mes",
        recommendsBullets: ["rc-1"],
      },
      {
        id: "rc_vol_high",
        text: "500–1,000 claims per month",
        esText: "500–1,000 reclamos por mes",
        recommendsBullets: ["rc-1", "rc-5"],
      },
      {
        id: "rc_vol_very_high",
        text: "1,000+ claims per month",
        esText: "1,000+ reclamos por mes",
        recommendsBullets: ["rc-1", "rc-5"],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  HR Manager                                                          */
/* ------------------------------------------------------------------ */

const HR_MANAGER_QUESTIONS: RoleExperienceQuestion[] = [
  {
    id: "hr_hris",
    roleId: "hr_manager",
    question: "Which HRIS / HR management systems have you used?",
    esQuestion: "¿Qué sistemas HRIS / de gestión de RH ha utilizado?",
    helpText: "Select all that apply to your experience.",
    esHelpText: "Seleccione todos los que apliquen a su experiencia.",
    answerType: "multi",
    options: [
      {
        id: "hr_hris_adp",
        text: "ADP Workforce Now / ADP TotalSource",
        esText: "ADP Workforce Now / ADP TotalSource",
        recommendsBullets: [],
      },
      {
        id: "hr_hris_bamboo",
        text: "BambooHR",
        esText: "BambooHR",
        recommendsBullets: [],
      },
      {
        id: "hr_hris_paycom",
        text: "Paycom or Paylocity",
        esText: "Paycom o Paylocity",
        recommendsBullets: [],
      },
      {
        id: "hr_hris_workday",
        text: "Workday or UKG",
        esText: "Workday o UKG",
        recommendsBullets: [],
      },
    ],
  },
  {
    id: "hr_recruiting",
    roleId: "hr_manager",
    question: "What recruiting methods have you used to hire healthcare staff?",
    esQuestion: "¿Qué métodos de reclutamiento ha utilizado para contratar personal de salud?",
    answerType: "multi",
    options: [
      {
        id: "hr_recruit_boards",
        text: "Healthcare-specific job boards (Health eCareers, Indeed Healthcare)",
        esText: "Portales de empleo específicos de salud (Health eCareers, Indeed Healthcare)",
        recommendsBullets: [],
      },
      {
        id: "hr_recruit_community",
        text: "Community-based recruiting (college programs, CHW networks)",
        esText: "Reclutamiento comunitario (programas universitarios, redes de CHW)",
        recommendsBullets: [],
      },
      {
        id: "hr_recruit_agency",
        text: "Staffing agencies or locum tenens firms",
        esText: "Agencias de personal o firmas de locum tenens",
        recommendsBullets: [],
      },
      {
        id: "hr_recruit_referral",
        text: "Employee referral programs",
        esText: "Programas de referencia de empleados",
        recommendsBullets: [],
      },
    ],
  },
  {
    id: "hr_union",
    roleId: "hr_manager",
    question: "What is your experience with union labor relations?",
    esQuestion: "¿Cuál es su experiencia con relaciones laborales sindicales?",
    answerType: "single",
    options: [
      {
        id: "hr_union_none",
        text: "No union experience",
        esText: "Sin experiencia sindical",
        recommendsBullets: [],
      },
      {
        id: "hr_union_basic",
        text: "Worked in a unionized environment but not in labor relations",
        esText: "Trabajó en un entorno sindicalizado pero no en relaciones laborales",
        recommendsBullets: [],
      },
      {
        id: "hr_union_grievance",
        text: "Handled grievances and contract administration",
        esText: "Manejó quejas y administración de contratos",
        recommendsBullets: [],
      },
      {
        id: "hr_union_bargaining",
        text: "Participated in collective bargaining negotiations",
        esText: "Participó en negociaciones de convenios colectivos",
        recommendsBullets: [],
      },
    ],
  },
  {
    id: "hr_compliance",
    roleId: "hr_manager",
    question: "Which California employment law areas are you experienced with?",
    esQuestion: "¿En qué áreas de ley laboral de California tiene experiencia?",
    answerType: "multi",
    options: [
      {
        id: "hr_comp_wage",
        text: "Wage and hour compliance (SB 525, overtime, meal/rest breaks)",
        esText: "Cumplimiento de salarios y horas (SB 525, horas extras, descansos)",
        recommendsBullets: [],
      },
      {
        id: "hr_comp_leave",
        text: "Leave management (CFRA, FMLA, PDL, sick leave)",
        esText: "Gestión de licencias (CFRA, FMLA, PDL, licencia por enfermedad)",
        recommendsBullets: [],
      },
      {
        id: "hr_comp_feha",
        text: "Anti-discrimination and harassment (FEHA, Title VII)",
        esText: "Anti-discriminación y acoso (FEHA, Título VII)",
        recommendsBullets: [],
      },
      {
        id: "hr_comp_credential",
        text: "Healthcare credentialing and license verification",
        esText: "Acreditación de salud y verificación de licencias",
        recommendsBullets: [],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Accountant                                                          */
/* ------------------------------------------------------------------ */

const ACCOUNTANT_QUESTIONS: RoleExperienceQuestion[] = [
  {
    id: "acct_software",
    roleId: "accountant",
    question: "Which accounting software have you used?",
    esQuestion: "¿Qué software contable ha utilizado?",
    helpText: "Select all that apply to your experience.",
    esHelpText: "Seleccione todos los que apliquen a su experiencia.",
    answerType: "multi",
    options: [
      {
        id: "acct_sw_qb",
        text: "QuickBooks (Desktop or Online)",
        esText: "QuickBooks (Escritorio o En Línea)",
        recommendsBullets: [],
      },
      {
        id: "acct_sw_sage",
        text: "Sage Intacct or Sage 300",
        esText: "Sage Intacct o Sage 300",
        recommendsBullets: [],
      },
      {
        id: "acct_sw_mip",
        text: "MIP Fund Accounting (Abila)",
        esText: "MIP Fund Accounting (Abila)",
        recommendsBullets: [],
      },
      {
        id: "acct_sw_netsuite",
        text: "Oracle NetSuite or Microsoft Dynamics",
        esText: "Oracle NetSuite o Microsoft Dynamics",
        recommendsBullets: [],
      },
    ],
  },
  {
    id: "acct_grants",
    roleId: "accountant",
    question: "What is your experience with grant accounting?",
    esQuestion: "¿Cuál es su experiencia con contabilidad de subvenciones?",
    answerType: "single",
    options: [
      {
        id: "acct_grants_none",
        text: "No grant accounting experience",
        esText: "Sin experiencia en contabilidad de subvenciones",
        recommendsBullets: [],
      },
      {
        id: "acct_grants_basic",
        text: "Basic grant expense tracking and reporting",
        esText: "Seguimiento básico de gastos de subvenciones e informes",
        recommendsBullets: [],
      },
      {
        id: "acct_grants_alloc",
        text: "Cost allocation across multiple federal and state grants",
        esText: "Asignación de costos entre múltiples subvenciones federales y estatales",
        recommendsBullets: [],
      },
      {
        id: "acct_grants_audit",
        text: "Single audit preparation and HRSA grant compliance",
        esText: "Preparación de auditoría única y cumplimiento de subvenciones HRSA",
        recommendsBullets: [],
      },
    ],
  },
  {
    id: "acct_audit",
    roleId: "accountant",
    question: "What audit experience do you have?",
    esQuestion: "¿Qué experiencia en auditorías tiene?",
    answerType: "multi",
    options: [
      {
        id: "acct_audit_internal",
        text: "Internal controls and procedures documentation",
        esText: "Documentación de controles y procedimientos internos",
        recommendsBullets: [],
      },
      {
        id: "acct_audit_external",
        text: "External financial audit coordination",
        esText: "Coordinación de auditoría financiera externa",
        recommendsBullets: [],
      },
      {
        id: "acct_audit_single",
        text: "Federal single audit (Uniform Guidance / 2 CFR 200)",
        esText: "Auditoría única federal (Guía Uniforme / 2 CFR 200)",
        recommendsBullets: [],
      },
      {
        id: "acct_audit_hrsa",
        text: "HRSA site visit financial review",
        esText: "Revisión financiera de visita de HRSA",
        recommendsBullets: [],
      },
    ],
  },
  {
    id: "acct_fqhc",
    roleId: "accountant",
    question: "Which FQHC-specific financial areas are you familiar with?",
    esQuestion: "¿Con qué áreas financieras específicas de FQHC está familiarizado?",
    answerType: "multi",
    options: [
      {
        id: "acct_fqhc_pps",
        text: "PPS (Prospective Payment System) reconciliation",
        esText: "Conciliación del PPS (Sistema de Pago Prospectivo)",
        recommendsBullets: [],
      },
      {
        id: "acct_fqhc_340b",
        text: "340B Drug Pricing Program accounting",
        esText: "Contabilidad del Programa de Precios de Medicamentos 340B",
        recommendsBullets: [],
      },
      {
        id: "acct_fqhc_sfs",
        text: "Sliding fee scale administration and reporting",
        esText: "Administración e informes de escala de tarifas deslizantes",
        recommendsBullets: [],
      },
      {
        id: "acct_fqhc_uds",
        text: "UDS financial reporting",
        esText: "Informes financieros UDS",
        recommendsBullets: [],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Payroll Specialist                                                  */
/* ------------------------------------------------------------------ */

const PAYROLL_SPECIALIST_QUESTIONS: RoleExperienceQuestion[] = [
  {
    id: "pay_systems",
    roleId: "payroll_specialist",
    question: "Which payroll systems have you used?",
    esQuestion: "¿Qué sistemas de nómina ha utilizado?",
    helpText: "Select all that apply to your experience.",
    esHelpText: "Seleccione todos los que apliquen a su experiencia.",
    answerType: "multi",
    options: [
      {
        id: "pay_sys_adp",
        text: "ADP Workforce Now / ADP Run",
        esText: "ADP Workforce Now / ADP Run",
        recommendsBullets: [],
      },
      {
        id: "pay_sys_paychex",
        text: "Paychex Flex",
        esText: "Paychex Flex",
        recommendsBullets: [],
      },
      {
        id: "pay_sys_paycom",
        text: "Paycom or Paylocity",
        esText: "Paycom o Paylocity",
        recommendsBullets: [],
      },
      {
        id: "pay_sys_ukg",
        text: "UKG / Kronos or Workday",
        esText: "UKG / Kronos o Workday",
        recommendsBullets: [],
      },
    ],
  },
  {
    id: "pay_scope",
    roleId: "payroll_specialist",
    question: "What is the largest payroll you've managed?",
    esQuestion: "¿Cuál es la nómina más grande que ha gestionado?",
    answerType: "single",
    options: [
      {
        id: "pay_scope_small",
        text: "Under 50 employees",
        esText: "Menos de 50 empleados",
        recommendsBullets: [],
      },
      {
        id: "pay_scope_medium",
        text: "50–200 employees",
        esText: "50–200 empleados",
        recommendsBullets: [],
      },
      {
        id: "pay_scope_large",
        text: "200–500 employees (multi-site)",
        esText: "200–500 empleados (multi-sitio)",
        recommendsBullets: [],
      },
      {
        id: "pay_scope_xlarge",
        text: "500+ employees",
        esText: "500+ empleados",
        recommendsBullets: [],
      },
    ],
  },
  {
    id: "pay_ca_compliance",
    roleId: "payroll_specialist",
    question: "Which California payroll compliance areas have you handled?",
    esQuestion: "¿Qué áreas de cumplimiento de nómina de California ha manejado?",
    answerType: "multi",
    options: [
      {
        id: "pay_ca_ot",
        text: "California overtime (daily and weekly calculations)",
        esText: "Horas extras de California (cálculos diarios y semanales)",
        recommendsBullets: [],
      },
      {
        id: "pay_ca_meal",
        text: "Meal and rest break premium pay tracking",
        esText: "Seguimiento de pago premium por descansos de comida y descanso",
        recommendsBullets: [],
      },
      {
        id: "pay_ca_sb525",
        text: "SB 525 healthcare minimum wage implementation",
        esText: "Implementación de salario mínimo de salud SB 525",
        recommendsBullets: [],
      },
      {
        id: "pay_ca_union",
        text: "Union CBA wage scales and shift differentials",
        esText: "Escalas salariales de convenios colectivos y diferenciales de turno",
        recommendsBullets: [],
      },
    ],
  },
  {
    id: "pay_special",
    roleId: "payroll_specialist",
    question: "What specialized payroll tasks have you performed?",
    esQuestion: "¿Qué tareas especializadas de nómina ha realizado?",
    answerType: "multi",
    options: [
      {
        id: "pay_spec_garnish",
        text: "Garnishment processing and child support orders",
        esText: "Procesamiento de embargos y órdenes de manutención",
        recommendsBullets: [],
      },
      {
        id: "pay_spec_retro",
        text: "Retroactive pay calculations and corrections",
        esText: "Cálculos retroactivos de pago y correcciones",
        recommendsBullets: [],
      },
      {
        id: "pay_spec_migration",
        text: "Payroll system migration or implementation",
        esText: "Migración o implementación de sistema de nómina",
        recommendsBullets: [],
      },
      {
        id: "pay_spec_tax",
        text: "Multi-jurisdiction tax filing and reconciliation",
        esText: "Declaración fiscal y conciliación multi-jurisdicción",
        recommendsBullets: [],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Finance Manager                                                     */
/* ------------------------------------------------------------------ */

const FINANCE_MANAGER_QUESTIONS: RoleExperienceQuestion[] = [
  {
    id: "fm_budget",
    roleId: "finance_manager",
    question: "What is the largest budget you've managed?",
    esQuestion: "¿Cuál es el presupuesto más grande que ha gestionado?",
    answerType: "single",
    options: [
      {
        id: "fm_budget_small",
        text: "Under $2M",
        esText: "Menos de $2M",
        recommendsBullets: [],
      },
      {
        id: "fm_budget_medium",
        text: "$2M–$10M",
        esText: "$2M–$10M",
        recommendsBullets: [],
      },
      {
        id: "fm_budget_large",
        text: "$10M–$50M",
        esText: "$10M–$50M",
        recommendsBullets: [],
      },
      {
        id: "fm_budget_xlarge",
        text: "$50M+",
        esText: "$50M+",
        recommendsBullets: [],
      },
    ],
  },
  {
    id: "fm_revenue",
    roleId: "finance_manager",
    question: "Which FQHC revenue sources have you managed?",
    esQuestion: "¿Qué fuentes de ingresos de FQHC ha gestionado?",
    helpText: "Select all that apply to your experience.",
    esHelpText: "Seleccione todos los que apliquen a su experiencia.",
    answerType: "multi",
    options: [
      {
        id: "fm_rev_medicaid",
        text: "Medi-Cal / Medicaid reimbursement (PPS)",
        esText: "Reembolso de Medi-Cal / Medicaid (PPS)",
        recommendsBullets: [],
      },
      {
        id: "fm_rev_340b",
        text: "340B Drug Pricing Program revenue",
        esText: "Ingresos del Programa de Precios de Medicamentos 340B",
        recommendsBullets: [],
      },
      {
        id: "fm_rev_grants",
        text: "HRSA grants and federal funding",
        esText: "Subvenciones HRSA y financiamiento federal",
        recommendsBullets: [],
      },
      {
        id: "fm_rev_vbc",
        text: "Value-based care contracts or CalAIM Community Supports",
        esText: "Contratos de atención basada en valor o Apoyos Comunitarios CalAIM",
        recommendsBullets: [],
      },
    ],
  },
  {
    id: "fm_board",
    roleId: "finance_manager",
    question: "What board-level financial reporting have you done?",
    esQuestion: "¿Qué informes financieros a nivel de junta ha realizado?",
    answerType: "multi",
    options: [
      {
        id: "fm_board_monthly",
        text: "Monthly financial statements and dashboards",
        esText: "Estados financieros mensuales y tableros",
        recommendsBullets: [],
      },
      {
        id: "fm_board_annual",
        text: "Annual budget presentation and approval",
        esText: "Presentación y aprobación del presupuesto anual",
        recommendsBullets: [],
      },
      {
        id: "fm_board_audit",
        text: "Audit results presentation to board/finance committee",
        esText: "Presentación de resultados de auditoría a junta/comité de finanzas",
        recommendsBullets: [],
      },
      {
        id: "fm_board_strategic",
        text: "Strategic financial planning and scenario modeling",
        esText: "Planificación financiera estratégica y modelado de escenarios",
        recommendsBullets: [],
      },
    ],
  },
  {
    id: "fm_cashflow",
    roleId: "finance_manager",
    question: "What cash flow management experience do you have?",
    esQuestion: "¿Qué experiencia en gestión de flujo de efectivo tiene?",
    answerType: "multi",
    options: [
      {
        id: "fm_cf_forecast",
        text: "Cash flow forecasting (weekly or monthly)",
        esText: "Pronóstico de flujo de efectivo (semanal o mensual)",
        recommendsBullets: [],
      },
      {
        id: "fm_cf_loc",
        text: "Line of credit management and banking relationships",
        esText: "Gestión de línea de crédito y relaciones bancarias",
        recommendsBullets: [],
      },
      {
        id: "fm_cf_vendor",
        text: "Vendor payment prioritization during cash constraints",
        esText: "Priorización de pagos a proveedores durante restricciones de efectivo",
        recommendsBullets: [],
      },
      {
        id: "fm_cf_payer",
        text: "Payer contract negotiation for better payment terms",
        esText: "Negociación de contratos con pagadores por mejores términos de pago",
        recommendsBullets: [],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  DENTAL ASSISTANT                                                    */
/* ------------------------------------------------------------------ */

const DENTAL_ASSISTANT_QUESTIONS: RoleExperienceQuestion[] = [
  {
    id: "da_duties",
    roleId: "dental_assistant",
    question: "What dental assisting duties have you performed?",
    esQuestion: "¿Qué funciones de asistencia dental ha realizado?",
    helpText: "Select all that apply.",
    esHelpText: "Seleccione todos los que apliquen.",
    answerType: "multi",
    options: [
      { id: "da_duties_chairside", text: "Chair-side assisting and instrument passing", esText: "Asistencia chairside y pase de instrumentos", recommendsBullets: ["da-1"] },
      { id: "da_duties_xray", text: "Dental radiographs (x-rays)", esText: "Radiografías dentales", recommendsBullets: ["da-2"] },
      { id: "da_duties_sterilization", text: "Instrument sterilization and infection control", esText: "Esterilización de instrumentos y control de infecciones", recommendsBullets: ["da-3"] },
      { id: "da_duties_impression", text: "Impressions, models, and patient prep", esText: "Impresiones, modelos y preparación del paciente", recommendsBullets: ["da-4"] },
    ],
  },
  {
    id: "da_credentials",
    roleId: "dental_assistant",
    question: "Which credentials do you hold?",
    esQuestion: "¿Qué credenciales posee?",
    answerType: "multi",
    options: [
      { id: "da_cred_rda", text: "California RDA (Registered Dental Assistant)", esText: "RDA de California (Asistente Dental Registrado)", recommendsBullets: ["da-5"] },
      { id: "da_cred_rad", text: "California Radiation Safety Certificate", esText: "Certificado de Seguridad de Radiación de California", recommendsBullets: ["da-2"] },
      { id: "da_cred_cda", text: "DANB CDA (Certified Dental Assistant)", esText: "DANB CDA (Asistente Dental Certificado)", recommendsBullets: ["da-5"] },
    ],
  },
  {
    id: "da_setting",
    roleId: "dental_assistant",
    question: "What dental settings have you worked in?",
    esQuestion: "¿En qué entornos dentales ha trabajado?",
    answerType: "single",
    options: [
      { id: "da_set_fqhc", text: "FQHC or community health center dental clinic", esText: "Clínica dental de FQHC o centro de salud comunitario", recommendsBullets: ["da-6"] },
      { id: "da_set_private", text: "Private dental practice", esText: "Consulta dental privada", recommendsBullets: ["da-1"] },
      { id: "da_set_specialty", text: "Specialty dental (oral surgery, ortho, pediatric)", esText: "Dental de especialidad (cirugía oral, ortodoncia, pediátrica)", recommendsBullets: ["da-7"] },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  DENTAL HYGIENIST                                                    */
/* ------------------------------------------------------------------ */

const DENTAL_HYGIENIST_QUESTIONS: RoleExperienceQuestion[] = [
  {
    id: "dh_clinical",
    roleId: "dental_hygienist",
    question: "Which clinical hygiene services have you provided?",
    esQuestion: "¿Qué servicios clínicos de higiene ha proporcionado?",
    helpText: "Select all that apply.",
    esHelpText: "Seleccione todos los que apliquen.",
    answerType: "multi",
    options: [
      { id: "dh_clin_scaling", text: "Full-mouth scaling and root planing (SRP)", esText: "Escalonamiento y alisado radicular de boca completa (SRP)", recommendsBullets: ["dh-1"] },
      { id: "dh_clin_perio", text: "Periodontal assessment and charting", esText: "Evaluación periodontal y registro", recommendsBullets: ["dh-2"] },
      { id: "dh_clin_sealants", text: "Sealant placement", esText: "Colocación de selladores", recommendsBullets: ["dh-4"] },
      { id: "dh_clin_la", text: "Local anesthesia administration", esText: "Administración de anestesia local", recommendsBullets: ["dh-1"] },
      { id: "dh_clin_tobacco", text: "Tobacco cessation counseling", esText: "Consejería para dejar de fumar", recommendsBullets: ["dh-5"] },
    ],
  },
  {
    id: "dh_population",
    roleId: "dental_hygienist",
    question: "Which patient populations have you primarily served?",
    esQuestion: "¿A qué poblaciones de pacientes ha servido principalmente?",
    answerType: "multi",
    options: [
      { id: "dh_pop_medi_cal", text: "Medi-Cal / Denti-Cal patients", esText: "Pacientes de Medi-Cal / Denti-Cal", recommendsBullets: ["dh-3"] },
      { id: "dh_pop_peds", text: "Pediatric patients", esText: "Pacientes pediátricos", recommendsBullets: ["dh-4"] },
      { id: "dh_pop_prenatal", text: "Prenatal / expectant mothers", esText: "Pacientes prenatales / madres embarazadas", recommendsBullets: ["dh-5"] },
      { id: "dh_pop_uninsured", text: "Uninsured / underinsured", esText: "Sin seguro / con seguro insuficiente", recommendsBullets: ["dh-3"] },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  PHARMACIST                                                          */
/* ------------------------------------------------------------------ */

const PHARMACIST_QUESTIONS: RoleExperienceQuestion[] = [
  {
    id: "pharm_duties",
    roleId: "pharmacist",
    question: "What pharmacy services have you provided?",
    esQuestion: "¿Qué servicios de farmacia ha proporcionado?",
    helpText: "Select all that apply.",
    esHelpText: "Seleccione todos los que apliquen.",
    answerType: "multi",
    options: [
      { id: "pharm_duty_340b", text: "340B program dispensing and compliance", esText: "Dispensación y cumplimiento del programa 340B", recommendsBullets: ["ph-1"] },
      { id: "pharm_duty_mtm", text: "Medication Therapy Management (MTM)", esText: "Gestión de Terapia Medicamentosa (MTM)", recommendsBullets: ["ph-2"] },
      { id: "pharm_duty_cdtm", text: "Collaborative drug therapy management (CDTM)", esText: "Manejo colaborativo de terapia farmacológica (CDTM)", recommendsBullets: ["ph-3"] },
      { id: "pharm_duty_imm", text: "Immunization administration", esText: "Administración de inmunizaciones", recommendsBullets: ["ph-4"] },
    ],
  },
  {
    id: "pharm_setting",
    roleId: "pharmacist",
    question: "What type of pharmacy setting have you worked in?",
    esQuestion: "¿En qué tipo de entorno de farmacia ha trabajado?",
    answerType: "single",
    options: [
      { id: "pharm_set_fqhc", text: "FQHC or community health center pharmacy", esText: "Farmacia de FQHC o centro de salud comunitario", recommendsBullets: ["ph-1", "ph-5"] },
      { id: "pharm_set_hospital", text: "Hospital or health system pharmacy", esText: "Farmacia de hospital o sistema de salud", recommendsBullets: ["ph-3"] },
      { id: "pharm_set_retail", text: "Retail or chain pharmacy", esText: "Farmacia minorista o de cadena", recommendsBullets: ["ph-4"] },
      { id: "pharm_set_ambulatory", text: "Ambulatory care clinic pharmacy", esText: "Farmacia de clínica de atención ambulatoria", recommendsBullets: ["ph-2"] },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  PHARMACY TECHNICIAN                                                 */
/* ------------------------------------------------------------------ */

const PHARMACY_TECH_QUESTIONS: RoleExperienceQuestion[] = [
  {
    id: "pt_duties",
    roleId: "pharmacy_technician",
    question: "What pharmacy technician duties have you performed?",
    esQuestion: "¿Qué funciones de técnico de farmacia ha realizado?",
    helpText: "Select all that apply.",
    esHelpText: "Seleccione todos los que apliquen.",
    answerType: "multi",
    options: [
      { id: "pt_duty_dispense", text: "Prescription processing and dispensing", esText: "Procesamiento y dispensación de recetas", recommendsBullets: ["pt-1"] },
      { id: "pt_duty_340b", text: "340B inventory tracking and split billing", esText: "Seguimiento de inventario 340B y facturación dividida", recommendsBullets: ["pt-2"] },
      { id: "pt_duty_insurance", text: "Insurance verification and prior authorization", esText: "Verificación de seguros y autorización previa", recommendsBullets: ["pt-3"] },
      { id: "pt_duty_inventory", text: "Drug inventory management and ordering", esText: "Gestión de inventario de medicamentos y pedidos", recommendsBullets: ["pt-4"] },
    ],
  },
  {
    id: "pt_credentials",
    roleId: "pharmacy_technician",
    question: "What credentials do you hold?",
    esQuestion: "¿Qué credenciales posee?",
    answerType: "multi",
    options: [
      { id: "pt_cred_ca_reg", text: "California Pharmacy Technician registration", esText: "Registro de Técnico de Farmacia de California", recommendsBullets: ["pt-1"] },
      { id: "pt_cred_ptcb", text: "PTCB CPhT certification", esText: "Certificación PTCB CPhT", recommendsBullets: ["pt-5"] },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  HEALTH ENROLLMENT NAVIGATOR                                         */
/* ------------------------------------------------------------------ */

const ENROLLMENT_NAVIGATOR_QUESTIONS: RoleExperienceQuestion[] = [
  {
    id: "en_programs",
    roleId: "health_enrollment_navigator",
    question: "Which enrollment programs have you worked with?",
    esQuestion: "¿Con qué programas de inscripción ha trabajado?",
    helpText: "Select all that apply.",
    esHelpText: "Seleccione todos los que apliquen.",
    answerType: "multi",
    options: [
      { id: "en_prog_medi_cal", text: "Medi-Cal eligibility and enrollment", esText: "Elegibilidad e inscripción en Medi-Cal", recommendsBullets: ["en-1"] },
      { id: "en_prog_covered_ca", text: "Covered California enrollment", esText: "Inscripción en Covered California", recommendsBullets: ["en-2"] },
      { id: "en_prog_undoc", text: "Programs for undocumented patients (ILOS, PACE, Medi-Cal for All)", esText: "Programas para pacientes indocumentados (ILOS, PACE, Medi-Cal para Todos)", recommendsBullets: ["en-3"] },
      { id: "en_prog_calaim", text: "CalAIM Community Supports enrollment", esText: "Inscripción en CalAIM Community Supports", recommendsBullets: ["en-4"] },
      { id: "en_prog_sfp", text: "Sliding fee scale / FQHC discount program", esText: "Escala de tarifas deslizantes / programa de descuento FQHC", recommendsBullets: ["en-5"] },
    ],
  },
  {
    id: "en_caseload",
    roleId: "health_enrollment_navigator",
    question: "How many enrollment cases did you handle monthly?",
    esQuestion: "¿Cuántos casos de inscripción manejó mensualmente?",
    answerType: "single",
    options: [
      { id: "en_cl_low", text: "Under 25 cases/month", esText: "Menos de 25 casos/mes", recommendsBullets: [] },
      { id: "en_cl_med", text: "25–75 cases/month", esText: "25–75 casos/mes", recommendsBullets: ["en-1"] },
      { id: "en_cl_high", text: "75+ cases/month", esText: "75+ casos/mes", recommendsBullets: ["en-1", "en-6"] },
    ],
  },
  {
    id: "en_credentials",
    roleId: "health_enrollment_navigator",
    question: "Which enrollment certifications do you hold?",
    esQuestion: "¿Qué certificaciones de inscripción posee?",
    answerType: "multi",
    options: [
      { id: "en_cred_cac", text: "CMS Certified Application Counselor (CAC)", esText: "Consejero de Solicitud Certificado (CAC) de CMS", recommendsBullets: ["en-2"] },
      { id: "en_cred_cec", text: "Covered California Certified Enrollment Counselor (CEC)", esText: "Consejero de Inscripción Certificado (CEC) de Covered California", recommendsBullets: ["en-2"] },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  LVN — Licensed Vocational Nurse                                     */
/* ------------------------------------------------------------------ */

const LVN_QUESTIONS: RoleExperienceQuestion[] = [
  {
    id: "lvn_duties",
    roleId: "lvn",
    question: "What nursing duties have you regularly performed?",
    esQuestion: "¿Qué funciones de enfermería ha realizado regularmente?",
    helpText: "Select all that apply.",
    esHelpText: "Seleccione todos los que apliquen.",
    answerType: "multi",
    options: [
      { id: "lvn_duty_rooming", text: "Patient rooming, vital signs, and clinical intake", esText: "Ingreso de pacientes, signos vitales e ingesta clínica", recommendsBullets: ["lvn-1"] },
      { id: "lvn_duty_meds", text: "Medication administration and injections", esText: "Administración de medicamentos e inyecciones", recommendsBullets: ["lvn-2"] },
      { id: "lvn_duty_phlebotomy", text: "Phlebotomy and specimen collection", esText: "Flebotomía y recolección de muestras", recommendsBullets: ["lvn-3"] },
      { id: "lvn_duty_iv", text: "IV therapy and infusion", esText: "Terapia IV e infusión", recommendsBullets: ["lvn-4"] },
      { id: "lvn_duty_education", text: "Patient education and chronic disease support", esText: "Educación del paciente y soporte de enfermedades crónicas", recommendsBullets: ["lvn-5"] },
    ],
  },
  {
    id: "lvn_setting",
    roleId: "lvn",
    question: "What clinical settings have you worked in?",
    esQuestion: "¿En qué entornos clínicos ha trabajado?",
    answerType: "single",
    options: [
      { id: "lvn_set_fqhc", text: "FQHC or community health center", esText: "FQHC o centro de salud comunitario", recommendsBullets: ["lvn-6"] },
      { id: "lvn_set_clinic", text: "Outpatient clinic or medical office", esText: "Clínica ambulatoria u oficina médica", recommendsBullets: ["lvn-1"] },
      { id: "lvn_set_hospital", text: "Hospital or skilled nursing facility", esText: "Hospital o instalación de enfermería especializada", recommendsBullets: ["lvn-4"] },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  PSYCHIATRIC NP / PMHNP                                             */
/* ------------------------------------------------------------------ */

const PSYCHIATRIC_NP_QUESTIONS: RoleExperienceQuestion[] = [
  {
    id: "pnp_services",
    roleId: "psychiatric_np",
    question: "What psychiatric services have you provided?",
    esQuestion: "¿Qué servicios psiquiátricos ha proporcionado?",
    helpText: "Select all that apply.",
    esHelpText: "Seleccione todos los que apliquen.",
    answerType: "multi",
    options: [
      { id: "pnp_svc_medmgmt", text: "Psychiatric medication management", esText: "Manejo de medicamentos psiquiátricos", recommendsBullets: ["pnp-1"] },
      { id: "pnp_svc_crisis", text: "Crisis assessment and safety planning", esText: "Evaluación de crisis y planificación de seguridad", recommendsBullets: ["pnp-2"] },
      { id: "pnp_svc_cocm", text: "Collaborative Care Model (CoCM) consultation", esText: "Consulta del Modelo de Atención Colaborativa (CoCM)", recommendsBullets: ["pnp-3"] },
      { id: "pnp_svc_tele", text: "Tele-psychiatry", esText: "Tele-psiquiatría", recommendsBullets: ["pnp-4"] },
    ],
  },
  {
    id: "pnp_population",
    roleId: "psychiatric_np",
    question: "Which populations have you primarily served?",
    esQuestion: "¿A qué poblaciones ha servido principalmente?",
    answerType: "multi",
    options: [
      { id: "pnp_pop_smi", text: "Serious mental illness (schizophrenia, bipolar, MDD)", esText: "Enfermedad mental grave (esquizofrenia, trastorno bipolar, TDM)", recommendsBullets: ["pnp-1"] },
      { id: "pnp_pop_trauma", text: "Trauma / PTSD / complex trauma", esText: "Trauma / TEPT / trauma complejo", recommendsBullets: ["pnp-5"] },
      { id: "pnp_pop_sud", text: "Co-occurring SUD (MAT, MOUD)", esText: "TUS co-ocurrente (MAT, MOUD)", recommendsBullets: ["pnp-2"] },
      { id: "pnp_pop_medi_cal", text: "Medi-Cal / safety-net population", esText: "Medi-Cal / población de red de seguridad", recommendsBullets: ["pnp-3"] },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  PROGRAM MANAGER                                                     */
/* ------------------------------------------------------------------ */

const PROGRAM_MANAGER_QUESTIONS: RoleExperienceQuestion[] = [
  {
    id: "pm_programs",
    roleId: "program_manager",
    question: "Which programs have you managed?",
    esQuestion: "¿Qué programas ha gestionado?",
    helpText: "Select all that apply.",
    esHelpText: "Seleccione todos los que apliquen.",
    answerType: "multi",
    options: [
      { id: "pm_prog_ecm", text: "CalAIM ECM or Community Supports", esText: "CalAIM ECM o Community Supports", recommendsBullets: ["pgm-1"] },
      { id: "pm_prog_hrsa", text: "HRSA grant-funded health center program", esText: "Programa de centro de salud financiado por subvención HRSA", recommendsBullets: ["pgm-2"] },
      { id: "pm_prog_bh", text: "Behavioral health integration program", esText: "Programa de integración de salud conductual", recommendsBullets: ["pgm-3"] },
      { id: "pm_prog_qi", text: "Quality improvement or data program", esText: "Programa de mejora de calidad o datos", recommendsBullets: ["pgm-4"] },
    ],
  },
  {
    id: "pm_scope",
    roleId: "program_manager",
    question: "What was the scale of programs you managed?",
    esQuestion: "¿Cuál fue la escala de los programas que gestionó?",
    answerType: "single",
    options: [
      { id: "pm_scope_small", text: "Single-site or small team (under 5 staff)", esText: "Un solo sitio o equipo pequeño (menos de 5 empleados)", recommendsBullets: ["pgm-4"] },
      { id: "pm_scope_mid", text: "Multi-site program (5–15 staff)", esText: "Programa de múltiples sitios (5–15 empleados)", recommendsBullets: ["pgm-1", "pgm-5"] },
      { id: "pm_scope_large", text: "Large program or division (15+ staff or $1M+ budget)", esText: "Programa o división grande (15+ empleados o presupuesto de $1M+)", recommendsBullets: ["pgm-2", "pgm-5"] },
    ],
  },
  {
    id: "pm_reporting",
    roleId: "program_manager",
    question: "What reporting/compliance work have you done?",
    esQuestion: "¿Qué trabajo de informes/cumplimiento ha realizado?",
    answerType: "multi",
    options: [
      { id: "pm_rep_uds", text: "HRSA Uniform Data System (UDS) reporting", esText: "Informes del Sistema de Datos Uniformes (UDS) de HRSA", recommendsBullets: ["pgm-2"] },
      { id: "pm_rep_funder", text: "Funder / grant progress reporting", esText: "Informes de progreso de financiadores / subvenciones", recommendsBullets: ["pgm-6"] },
      { id: "pm_rep_qi", text: "Quality measure tracking (HEDIS, UDS)", esText: "Seguimiento de medidas de calidad (HEDIS, UDS)", recommendsBullets: ["pgm-4"] },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  All Questions Combined + Helpers                                    */
/* ------------------------------------------------------------------ */

export const ROLE_EXPERIENCE_QUESTIONS: RoleExperienceQuestion[] = [
  ...CHW_QUESTIONS,
  ...CARE_COORDINATOR_QUESTIONS,
  ...MEDICAL_ASSISTANT_QUESTIONS,
  ...CASE_MANAGER_QUESTIONS,
  ...BEHAVIORAL_HEALTH_QUESTIONS,
  ...REGISTERED_NURSE_QUESTIONS,
  ...PATIENT_SERVICES_QUESTIONS,
  ...REVENUE_CYCLE_QUESTIONS,
  ...HR_MANAGER_QUESTIONS,
  ...ACCOUNTANT_QUESTIONS,
  ...PAYROLL_SPECIALIST_QUESTIONS,
  ...FINANCE_MANAGER_QUESTIONS,
  ...DENTAL_ASSISTANT_QUESTIONS,
  ...DENTAL_HYGIENIST_QUESTIONS,
  ...PHARMACIST_QUESTIONS,
  ...PHARMACY_TECH_QUESTIONS,
  ...ENROLLMENT_NAVIGATOR_QUESTIONS,
  ...LVN_QUESTIONS,
  ...PSYCHIATRIC_NP_QUESTIONS,
  ...PROGRAM_MANAGER_QUESTIONS,
];

/** Get experience questions for a specific role */
export function getExperienceQuestionsForRole(
  roleId: string,
): RoleExperienceQuestion[] {
  return ROLE_EXPERIENCE_QUESTIONS.filter((q) => q.roleId === roleId);
}

/**
 * Given the user's answers to experience questions, compute the set of
 * recommended resume bullet IDs.
 *
 * @param answers — Record where keys are question IDs and values are
 *   either a single option ID (for "single" type) or an array of option
 *   IDs (for "multi" type).
 * @param roleId — The role to look up questions for.
 * @returns Array of unique bullet IDs (from resume-templates.ts).
 */
export function getRecommendedBullets(
  answers: Record<string, string | string[]>,
  roleId: string,
): string[] {
  const questions = getExperienceQuestionsForRole(roleId);
  const bulletSet = new Set<string>();

  for (const question of questions) {
    const answer = answers[question.id];
    if (!answer) continue;

    // Normalize to array
    const selectedIds = Array.isArray(answer) ? answer : [answer];

    for (const optionId of selectedIds) {
      const option = question.options.find((o) => o.id === optionId);
      if (option) {
        for (const bulletId of option.recommendsBullets) {
          bulletSet.add(bulletId);
        }
      }
    }
  }

  return Array.from(bulletSet);
}
