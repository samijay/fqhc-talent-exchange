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
