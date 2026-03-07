export interface BulletTemplate {
  id: string;
  text: string;
  esText: string;
  keywords: string[];
}

export interface RoleTemplate {
  roleId: string;
  roleLabel: string;
  esRoleLabel: string;
  objectiveTemplate: string;
  esObjectiveTemplate: string;
  bullets: BulletTemplate[];
}

export const ROLE_TEMPLATES: RoleTemplate[] = [
  {
    roleId: "chw",
    roleLabel: "Community Health Worker",
    esRoleLabel: "Promotor/a de Salud Comunitaria",
    objectiveTemplate:
      "Dedicated Community Health Worker with experience serving underserved populations at Federally Qualified Health Centers. Skilled in community outreach, SDOH screenings, and patient navigation for Medi-Cal members.",
    esObjectiveTemplate:
      "Promotor/a de Salud Comunitaria dedicado/a con experiencia sirviendo a poblaciones desatendidas en Centros de Salud Comunitarios Federalmente Calificados. Habilidades en alcance comunitario, evaluaciones SDOH y navegación de pacientes para miembros de Medi-Cal.",
    bullets: [
      {
        id: "chw-1",
        text: "Conducted community outreach and engagement for ECM/CCM program members, building trust with hard-to-reach populations",
        esText: "Realizó alcance comunitario y compromiso para miembros de programas ECM/CCM, construyendo confianza con poblaciones difíciles de alcanzar",
        keywords: ["ECM", "CCM", "community outreach", "CalAIM"],
      },
      {
        id: "chw-2",
        text: "Performed Social Determinants of Health (SDOH) screenings and connected patients to community resources including housing, food, and transportation",
        esText: "Realizó evaluaciones de Determinantes Sociales de la Salud (SDOH) y conectó a pacientes con recursos comunitarios incluyendo vivienda, alimentación y transporte",
        keywords: ["SDOH", "social determinants", "community resources"],
      },
      {
        id: "chw-3",
        text: "Maintained caseload of patients with complex needs including chronic conditions, behavioral health, and housing instability",
        esText: "Mantuvo carga de pacientes con necesidades complejas incluyendo condiciones crónicas, salud conductual e inestabilidad de vivienda",
        keywords: ["caseload management", "chronic conditions", "patient engagement"],
      },
      {
        id: "chw-4",
        text: "Documented patient interactions and care coordination activities in electronic health record (EHR) system",
        esText: "Documentó interacciones con pacientes y actividades de coordinación de atención en sistema de registro electrónico de salud (EHR)",
        keywords: ["EHR", "documentation", "care coordination"],
      },
      {
        id: "chw-5",
        text: "Provided culturally and linguistically appropriate health education to diverse patient populations",
        esText: "Proporcionó educación en salud culturalmente y lingüísticamente apropiada a diversas poblaciones de pacientes",
        keywords: ["cultural competency", "health education", "bilingual"],
      },
      {
        id: "chw-6",
        text: "Assisted patients with Medi-Cal enrollment, benefits navigation, and appointment scheduling",
        esText: "Asistió a pacientes con inscripción en Medi-Cal, navegación de beneficios y programación de citas",
        keywords: ["Medi-Cal", "benefits navigation", "enrollment"],
      },
      {
        id: "chw-7",
        text: "Collaborated with multidisciplinary care team including providers, nurses, and behavioral health specialists to coordinate whole-person care",
        esText: "Colaboró con equipo de atención multidisciplinario incluyendo proveedores, enfermeras y especialistas en salud conductual para coordinar atención integral",
        keywords: ["multidisciplinary", "care team", "whole-person care"],
      },
      {
        id: "chw-8",
        text: "Conducted home visits and field-based outreach to engage high-risk, hard-to-reach populations",
        esText: "Realizó visitas domiciliarias y alcance en campo para involucrar a poblaciones de alto riesgo difíciles de alcanzar",
        keywords: ["home visits", "field-based", "high-risk", "outreach"],
      },
    ],
  },
  {
    roleId: "care_coordinator",
    roleLabel: "Care Coordinator",
    esRoleLabel: "Coordinador/a de Atención",
    objectiveTemplate:
      "Experienced Care Coordinator specializing in Enhanced Care Management (ECM) and chronic disease management for Medi-Cal populations at Federally Qualified Health Centers.",
    esObjectiveTemplate:
      "Coordinador/a de Atención experimentado/a especializado/a en Manejo de Atención Mejorada (ECM) y gestión de enfermedades crónicas para poblaciones de Medi-Cal en Centros de Salud Comunitarios Federalmente Calificados.",
    bullets: [
      {
        id: "cc-1",
        text: "Coordinated care for ECM/CCM patients, ensuring timely follow-up, care plan adherence, and engagement tracking",
        esText: "Coordinó atención para pacientes ECM/CCM, asegurando seguimiento oportuno, adherencia a planes de atención y rastreo de compromiso",
        keywords: ["ECM", "CCM", "care coordination", "CalAIM"],
      },
      {
        id: "cc-2",
        text: "Developed and maintained individualized care plans in collaboration with primary care providers and specialists",
        esText: "Desarrolló y mantuvo planes de atención individualizados en colaboración con proveedores de atención primaria y especialistas",
        keywords: ["care plans", "individualized", "primary care"],
      },
      {
        id: "cc-3",
        text: "Tracked and reported on clinical quality measures including HEDIS and UDS metrics",
        esText: "Rastreó y reportó sobre medidas de calidad clínica incluyendo métricas HEDIS y UDS",
        keywords: ["HEDIS", "UDS", "quality measures", "reporting"],
      },
      {
        id: "cc-4",
        text: "Managed care transitions and hospital discharge follow-up to prevent readmissions",
        esText: "Gestionó transiciones de atención y seguimiento post-alta hospitalaria para prevenir readmisiones",
        keywords: ["care transitions", "discharge follow-up", "readmission prevention"],
      },
      {
        id: "cc-5",
        text: "Facilitated referrals to Community Supports services including housing navigation, medically tailored meals, and recuperative care",
        esText: "Facilitó referidos a servicios de Apoyos Comunitarios incluyendo navegación de vivienda, comidas médicamente adaptadas y atención recuperativa",
        keywords: ["Community Supports", "CalAIM", "housing navigation"],
      },
      {
        id: "cc-6",
        text: "Utilized EHR system for documentation, scheduling, and population health reporting",
        esText: "Utilizó sistema EHR para documentación, programación y reportes de salud poblacional",
        keywords: ["EHR", "population health", "documentation"],
      },
      {
        id: "cc-7",
        text: "Conducted motivational interviewing and patient engagement strategies to improve health outcomes",
        esText: "Realizó entrevista motivacional y estrategias de compromiso del paciente para mejorar resultados de salud",
        keywords: ["motivational interviewing", "patient engagement", "outcomes"],
      },
    ],
  },
  {
    roleId: "medical_assistant",
    roleLabel: "Medical Assistant",
    esRoleLabel: "Asistente Médico/a",
    objectiveTemplate:
      "Certified Medical Assistant with FQHC experience supporting clinical operations, patient intake, and EHR documentation in high-volume community health settings.",
    esObjectiveTemplate:
      "Asistente Médico/a Certificado/a con experiencia en FQHC apoyando operaciones clínicas, admisión de pacientes y documentación EHR en entornos de salud comunitaria de alto volumen.",
    bullets: [
      {
        id: "ma-1",
        text: "Performed patient intake including vitals, medication reconciliation, and pre-visit planning",
        esText: "Realizó admisión de pacientes incluyendo signos vitales, reconciliación de medicamentos y planificación pre-visita",
        keywords: ["patient intake", "vitals", "medication reconciliation"],
      },
      {
        id: "ma-2",
        text: "Administered vaccinations, injections, and point-of-care testing per provider orders",
        esText: "Administró vacunas, inyecciones y pruebas de punto de atención según órdenes del proveedor",
        keywords: ["vaccinations", "injections", "point-of-care testing"],
      },
      {
        id: "ma-3",
        text: "Managed provider schedules and maintained efficient patient flow in multi-provider clinic",
        esText: "Gestionó horarios de proveedores y mantuvo flujo eficiente de pacientes en clínica multi-proveedor",
        keywords: ["scheduling", "patient flow", "clinic operations"],
      },
      {
        id: "ma-4",
        text: "Documented clinical encounters and assisted with referral processing in EHR system",
        esText: "Documentó encuentros clínicos y asistió con procesamiento de referidos en sistema EHR",
        keywords: ["EHR", "clinical documentation", "referrals"],
      },
      {
        id: "ma-5",
        text: "Provided bilingual patient communication and translation services for Spanish-speaking patients",
        esText: "Proporcionó comunicación bilingüe con pacientes y servicios de traducción para pacientes hispanohablantes",
        keywords: ["bilingual", "Spanish", "patient communication"],
      },
      {
        id: "ma-6",
        text: "Assisted with quality improvement initiatives including HEDIS measures and patient satisfaction surveys",
        esText: "Asistió con iniciativas de mejora de calidad incluyendo medidas HEDIS y encuestas de satisfacción del paciente",
        keywords: ["quality improvement", "HEDIS", "patient satisfaction"],
      },
    ],
  },
  {
    roleId: "case_manager",
    roleLabel: "Case Manager",
    esRoleLabel: "Administrador/a de Casos",
    objectiveTemplate:
      "Experienced Case Manager specializing in CalAIM programs, behavioral health integration, and complex care management for underserved populations at Federally Qualified Health Centers.",
    esObjectiveTemplate:
      "Administrador/a de Casos experimentado/a especializado/a en programas CalAIM, integración de salud conductual y gestión de atención compleja para poblaciones desatendidas en Centros de Salud Comunitarios Federalmente Calificados.",
    bullets: [
      {
        id: "cm-1",
        text: "Managed complex caseload of patients with co-occurring behavioral health, substance use, and chronic medical conditions",
        esText: "Gestionó carga compleja de pacientes con condiciones concurrentes de salud conductual, uso de sustancias y condiciones médicas crónicas",
        keywords: ["complex care", "behavioral health", "substance use"],
      },
      {
        id: "cm-2",
        text: "Conducted comprehensive biopsychosocial assessments and developed individualized treatment plans",
        esText: "Realizó evaluaciones biopsicosociales integrales y desarrolló planes de tratamiento individualizados",
        keywords: ["biopsychosocial assessment", "treatment plans"],
      },
      {
        id: "cm-3",
        text: "Facilitated care coordination across medical, behavioral health, and social service providers",
        esText: "Facilitó coordinación de atención entre proveedores médicos, de salud conductual y de servicios sociales",
        keywords: ["care coordination", "behavioral health integration"],
      },
      {
        id: "cm-4",
        text: "Supported Enhanced Care Management (ECM) enrollment, engagement, and reporting requirements under CalAIM",
        esText: "Apoyó inscripción en Manejo de Atención Mejorada (ECM), compromiso y requisitos de reportes bajo CalAIM",
        keywords: ["ECM", "CalAIM", "enrollment", "reporting"],
      },
      {
        id: "cm-5",
        text: "Advocated for patient access to community resources including housing, legal aid, and benefits enrollment",
        esText: "Abogó por acceso de pacientes a recursos comunitarios incluyendo vivienda, asistencia legal e inscripción en beneficios",
        keywords: ["patient advocacy", "community resources", "housing"],
      },
      {
        id: "cm-6",
        text: "Documented all case management activities and maintained compliance with Medi-Cal billing and HIPAA standards",
        esText: "Documentó todas las actividades de gestión de casos y mantuvo cumplimiento con facturación Medi-Cal y estándares HIPAA",
        keywords: ["Medi-Cal", "billing", "HIPAA", "compliance"],
      },
    ],
  },
  {
    roleId: "behavioral_health",
    roleLabel: "Behavioral Health Specialist",
    esRoleLabel: "Especialista en Salud Conductual",
    objectiveTemplate:
      "Licensed behavioral health professional with experience providing integrated care in FQHC settings, specializing in trauma-informed care and crisis intervention for underserved populations.",
    esObjectiveTemplate:
      "Profesional de salud conductual con licencia y experiencia proporcionando atención integrada en entornos FQHC, especializado/a en atención informada por trauma e intervención en crisis para poblaciones desatendidas.",
    bullets: [
      {
        id: "bh-1",
        text: "Provided individual and group therapy for patients with depression, anxiety, PTSD, and substance use disorders",
        esText: "Proporcionó terapia individual y grupal para pacientes con depresión, ansiedad, TEPT y trastornos por uso de sustancias",
        keywords: ["therapy", "behavioral health", "substance use"],
      },
      {
        id: "bh-2",
        text: "Delivered integrated behavioral health services in primary care setting using warm handoff model",
        esText: "Entregó servicios integrados de salud conductual en entorno de atención primaria usando modelo de transferencia cálida",
        keywords: ["integrated care", "BH integration", "warm handoff"],
      },
      {
        id: "bh-3",
        text: "Conducted crisis assessments and safety planning for high-risk patients",
        esText: "Realizó evaluaciones de crisis y planificación de seguridad para pacientes de alto riesgo",
        keywords: ["crisis assessment", "safety planning", "high-risk"],
      },
      {
        id: "bh-4",
        text: "Participated in BH-ASO program delivery and compliance reporting",
        esText: "Participó en la entrega del programa BH-ASO y reportes de cumplimiento",
        keywords: ["BH-ASO", "compliance", "behavioral health"],
      },
      {
        id: "bh-5",
        text: "Maintained clinical documentation meeting Medi-Cal billing requirements and HIPAA standards",
        esText: "Mantuvo documentación clínica cumpliendo con requisitos de facturación Medi-Cal y estándares HIPAA",
        keywords: ["Medi-Cal", "billing", "HIPAA", "documentation"],
      },
      {
        id: "bh-6",
        text: "Provided culturally responsive, trauma-informed care to diverse populations including SMI, SUD, and homeless individuals",
        esText: "Proporcionó atención culturalmente receptiva e informada por trauma a diversas poblaciones incluyendo individuos con SMI, SUD y personas sin hogar",
        keywords: ["trauma-informed", "SMI", "SUD", "cultural competency"],
      },
    ],
  },
  {
    roleId: "registered_nurse",
    roleLabel: "Registered Nurse (RN)",
    esRoleLabel: "Enfermera/o Registrada/o (RN)",
    objectiveTemplate:
      "Registered Nurse with experience providing patient-centered care in Federally Qualified Health Centers. Skilled in clinical assessment, chronic disease management, and care coordination for underserved populations.",
    esObjectiveTemplate:
      "Enfermera/o Registrada/o con experiencia proporcionando atención centrada en el paciente en Centros de Salud Comunitarios Federalmente Calificados. Habilidades en evaluación clínica, manejo de enfermedades crónicas y coordinación de atención para poblaciones desatendidas.",
    bullets: [
      {
        id: "rn-1",
        text: "Performed comprehensive nursing assessments, triage, and developed individualized care plans for diverse patient populations",
        esText: "Realizó evaluaciones de enfermería integrales, triaje y desarrolló planes de atención individualizados para diversas poblaciones de pacientes",
        keywords: ["nursing assessment", "triage", "care plans"],
      },
      {
        id: "rn-2",
        text: "Managed chronic disease panels including diabetes, hypertension, and asthma through patient education and medication management",
        esText: "Gestionó paneles de enfermedades crónicas incluyendo diabetes, hipertensión y asma mediante educación al paciente y manejo de medicamentos",
        keywords: ["chronic disease", "diabetes", "hypertension", "medication management"],
      },
      {
        id: "rn-3",
        text: "Administered medications, immunizations, and treatments following established clinical protocols and standing orders",
        esText: "Administró medicamentos, inmunizaciones y tratamientos siguiendo protocolos clínicos establecidos y órdenes permanentes",
        keywords: ["medications", "immunizations", "clinical protocols"],
      },
      {
        id: "rn-4",
        text: "Coordinated care transitions and follow-up for patients discharged from emergency departments and hospitals",
        esText: "Coordinó transiciones de atención y seguimiento para pacientes dados de alta de departamentos de emergencia y hospitales",
        keywords: ["care transitions", "discharge", "follow-up"],
      },
      {
        id: "rn-5",
        text: "Collaborated with providers, care coordinators, and behavioral health team in multidisciplinary huddles and case conferences",
        esText: "Colaboró con proveedores, coordinadores de atención y equipo de salud conductual en reuniones multidisciplinarias y conferencias de casos",
        keywords: ["multidisciplinary", "care team", "case conferences"],
      },
      {
        id: "rn-6",
        text: "Documented patient encounters accurately in EHR system, ensuring compliance with Medi-Cal billing and HIPAA requirements",
        esText: "Documentó encuentros con pacientes de manera precisa en sistema EHR, asegurando cumplimiento con facturación Medi-Cal y requisitos HIPAA",
        keywords: ["EHR", "documentation", "Medi-Cal", "HIPAA"],
      },
      {
        id: "rn-7",
        text: "Provided patient and family education on disease management, preventive care, and community resources",
        esText: "Proporcionó educación al paciente y familia sobre manejo de enfermedades, atención preventiva y recursos comunitarios",
        keywords: ["patient education", "preventive care", "health literacy"],
      },
    ],
  },
  {
    roleId: "patient_services",
    roleLabel: "Patient Services Representative",
    esRoleLabel: "Representante de Servicios al Paciente",
    objectiveTemplate:
      "Patient Services Representative with experience in healthcare front office operations at Federally Qualified Health Centers. Skilled in patient scheduling, insurance verification, and registration for Medi-Cal and uninsured populations.",
    esObjectiveTemplate:
      "Representante de Servicios al Paciente con experiencia en operaciones de recepción en Centros de Salud Comunitarios Federalmente Calificados. Habilidades en programación de citas, verificación de seguro y registro para poblaciones de Medi-Cal y sin seguro.",
    bullets: [
      {
        id: "ps-1",
        text: "Managed patient check-in, registration, and demographic verification for high-volume community health center",
        esText: "Gestionó registro de pacientes, inscripción y verificación demográfica para centro de salud comunitario de alto volumen",
        keywords: ["patient registration", "check-in", "front desk"],
      },
      {
        id: "ps-2",
        text: "Verified insurance eligibility including Medi-Cal, Medicare, and sliding fee scale for uninsured patients",
        esText: "Verificó elegibilidad de seguro incluyendo Medi-Cal, Medicare y escala de tarifas deslizantes para pacientes sin seguro",
        keywords: ["insurance verification", "Medi-Cal", "sliding fee scale"],
      },
      {
        id: "ps-3",
        text: "Scheduled and coordinated patient appointments across multiple providers and departments using EHR scheduling system",
        esText: "Programó y coordinó citas de pacientes con múltiples proveedores y departamentos usando sistema de programación EHR",
        keywords: ["scheduling", "EHR", "appointment coordination"],
      },
      {
        id: "ps-4",
        text: "Provided bilingual (English/Spanish) customer service to diverse patient populations, resolving concerns and ensuring positive patient experience",
        esText: "Proporcionó servicio al cliente bilingüe (inglés/español) a diversas poblaciones de pacientes, resolviendo inquietudes y asegurando experiencia positiva",
        keywords: ["bilingual", "customer service", "patient experience"],
      },
      {
        id: "ps-5",
        text: "Processed referrals, authorizations, and medical records requests in compliance with HIPAA regulations",
        esText: "Procesó referencias, autorizaciones y solicitudes de registros médicos en cumplimiento con regulaciones HIPAA",
        keywords: ["referrals", "authorizations", "HIPAA", "medical records"],
      },
      {
        id: "ps-6",
        text: "Assisted patients with Medi-Cal enrollment applications, benefit renewals, and eligibility questions",
        esText: "Asistió a pacientes con solicitudes de inscripción en Medi-Cal, renovaciones de beneficios y preguntas de elegibilidad",
        keywords: ["Medi-Cal enrollment", "benefits", "eligibility"],
      },
      {
        id: "ps-7",
        text: "Collected co-payments, processed sliding fee applications, and maintained accurate financial records",
        esText: "Cobró copagos, procesó solicitudes de tarifa deslizante y mantuvo registros financieros precisos",
        keywords: ["co-payments", "sliding fee", "financial records"],
      },
    ],
  },
  {
    roleId: "revenue_cycle",
    roleLabel: "Revenue Cycle / Billing Specialist",
    esRoleLabel: "Especialista en Ciclo de Ingresos / Facturación",
    objectiveTemplate:
      "Revenue Cycle Specialist with experience in healthcare billing and claims processing for Federally Qualified Health Centers. Skilled in Medi-Cal billing, denial management, and compliance with FQHC PPS reimbursement requirements.",
    esObjectiveTemplate:
      "Especialista en Ciclo de Ingresos con experiencia en facturación y procesamiento de reclamos en Centros de Salud Comunitarios Federalmente Calificados. Habilidades en facturación Medi-Cal, gestión de denegaciones y cumplimiento con requisitos de reembolso PPS de FQHC.",
    bullets: [
      {
        id: "rc-1",
        text: "Processed and submitted medical claims for Medi-Cal, Medicare, and commercial insurance payers, maintaining high clean claim rate",
        esText: "Procesó y envió reclamos médicos para Medi-Cal, Medicare y aseguradoras comerciales, manteniendo alta tasa de reclamos limpios",
        keywords: ["claims processing", "Medi-Cal", "Medicare", "billing"],
      },
      {
        id: "rc-2",
        text: "Managed denial follow-up and appeals process, recovering revenue through timely resubmissions and corrective actions",
        esText: "Gestionó seguimiento de denegaciones y proceso de apelaciones, recuperando ingresos mediante reenvíos oportunos y acciones correctivas",
        keywords: ["denial management", "appeals", "revenue recovery"],
      },
      {
        id: "rc-3",
        text: "Verified patient eligibility and benefits, ensuring accurate insurance information for proper claim submission",
        esText: "Verificó elegibilidad y beneficios de pacientes, asegurando información de seguro precisa para envío correcto de reclamos",
        keywords: ["eligibility verification", "benefits", "insurance"],
      },
      {
        id: "rc-4",
        text: "Applied ICD-10 and CPT coding for outpatient encounters in compliance with FQHC Prospective Payment System (PPS) requirements",
        esText: "Aplicó codificación ICD-10 y CPT para encuentros ambulatorios en cumplimiento con requisitos del Sistema de Pago Prospectivo (PPS) de FQHC",
        keywords: ["ICD-10", "CPT", "coding", "PPS", "FQHC"],
      },
      {
        id: "rc-5",
        text: "Generated and analyzed revenue cycle reports including A/R aging, collection rates, and payer mix dashboards",
        esText: "Generó y analizó reportes de ciclo de ingresos incluyendo antigüedad de cuentas por cobrar, tasas de cobro y tableros de mezcla de pagadores",
        keywords: ["revenue cycle", "A/R", "reporting", "analytics"],
      },
      {
        id: "rc-6",
        text: "Collaborated with clinical staff to resolve coding discrepancies and improve documentation for accurate reimbursement",
        esText: "Colaboró con personal clínico para resolver discrepancias de codificación y mejorar documentación para reembolso preciso",
        keywords: ["coding", "documentation", "reimbursement", "collaboration"],
      },
    ],
  },

  /* ─── PROVIDER ROLE TEMPLATES ────────────────────────────────── */

  {
    roleId: "physician",
    roleLabel: "Physician (MD/DO) — Primary Care",
    esRoleLabel: "Médico (MD/DO) — Atención Primaria",
    objectiveTemplate:
      "Board-certified primary care physician with experience in FQHC and safety-net medicine. Skilled in panel management, chronic disease care for Medi-Cal populations, FQHC PPS billing, and team-based care including NP/PA supervision. Committed to health equity and culturally responsive medicine for underserved communities.",
    esObjectiveTemplate:
      "Médico de atención primaria certificado por el consejo con experiencia en FQHC y medicina de red de seguridad. Habilidades en gestión de panel, atención de enfermedades crónicas para poblaciones Medi-Cal, facturación PPS de FQHC y atención basada en equipo incluyendo supervisión de NP/PA.",
    bullets: [
      {
        id: "md-1",
        text: "Managed panel of 1,400+ patients with high Medi-Cal burden, achieving 72% diabetes controlled rate (HbA1c <8) and 89% hypertension control, exceeding UDS benchmarks",
        esText: "Gestionó panel de más de 1,400 pacientes con alta carga Medi-Cal, logrando tasa de diabetes controlada del 72% (HbA1c <8) y control de hipertensión del 89%, superando los puntos de referencia UDS",
        keywords: ["panel management", "Medi-Cal", "HEDIS", "UDS", "diabetes", "hypertension"],
      },
      {
        id: "md-2",
        text: "Supervised 2 Nurse Practitioners and delegated preventive protocols to 4 Medical Assistants, enabling 3,800 additional patient encounters annually through team-based care model",
        esText: "Supervisó 2 Enfermeras Practicantes y delegó protocolos preventivos a 4 Asistentes Médicos, habilitando 3,800 encuentros adicionales de pacientes anuales a través del modelo de atención basado en equipo",
        keywords: ["NP supervision", "team-based care", "delegation", "standing orders"],
      },
      {
        id: "md-3",
        text: "Delivered same-day access for 85% of urgent care requests through open-access scheduling model, reducing ED utilization by 18% for attributed Medi-Cal members",
        esText: "Brindó acceso el mismo día para el 85% de las solicitudes de atención urgente a través del modelo de programación de acceso abierto, reduciendo la utilización de urgencias en un 18%",
        keywords: ["same-day access", "open access scheduling", "ED diversion", "Medi-Cal"],
      },
      {
        id: "md-4",
        text: "Documented clinical encounters in OCHIN Epic with full FQHC PPS compliance; achieved zero audit findings across 3-year HRSA Operational Site Visit review period",
        esText: "Documentó encuentros clínicos en OCHIN Epic con pleno cumplimiento PPS de FQHC; logró cero hallazgos de auditoría durante el período de revisión de 3 años de la Visita al Sitio Operacional de HRSA",
        keywords: ["OCHIN Epic", "PPS billing", "HRSA", "documentation compliance", "EHR"],
      },
      {
        id: "md-5",
        text: "Integrated CalAIM ECM referrals into primary care workflow, identifying and enrolling 120+ high-utilizer Medi-Cal patients into Enhanced Care Management, reducing hospital readmissions by 24%",
        esText: "Integró referencias ECM de CalAIM en el flujo de trabajo de atención primaria, identificando e inscribiendo más de 120 pacientes Medi-Cal de alta utilización en la Gestión de Atención Mejorada",
        keywords: ["CalAIM", "ECM", "Enhanced Care Management", "hospital readmissions", "Medi-Cal"],
      },
      {
        id: "md-6",
        text: "Led quality improvement initiative closing 1,200 HEDIS measure gaps through pre-visit planning, standing order protocols, and MA-administered preventive care bundle",
        esText: "Lideró iniciativa de mejora de calidad cerrando 1,200 brechas de medidas HEDIS a través de planificación previsita, protocolos de órdenes permanentes y paquete de atención preventiva administrado por MA",
        keywords: ["HEDIS", "quality improvement", "pre-visit planning", "preventive care", "standing orders"],
      },
    ],
  },
  {
    roleId: "nurse_practitioner",
    roleLabel: "Nurse Practitioner (NP / FNP / PMHNP)",
    esRoleLabel: "Enfermero(a) Practicante (NP / FNP / PMHNP)",
    objectiveTemplate:
      "Family Nurse Practitioner with experience in FQHC primary care, panel management, and chronic disease management for underserved Medi-Cal populations. Skilled in full-scope NP practice under California law, collaborative practice, FQHC PPS billing, and team-based care. NHSC loan repayment eligible.",
    esObjectiveTemplate:
      "Enfermera Practicante de Familia con experiencia en atención primaria de FQHC, gestión de panel y manejo de enfermedades crónicas para poblaciones Medi-Cal desatendidas. Habilidades en práctica NP de alcance completo bajo la ley de California, práctica colaborativa y facturación PPS de FQHC.",
    bullets: [
      {
        id: "np-1",
        text: "Managed independent panel of 950 patients (65% Medi-Cal) achieving 68% HbA1c controlled rate and closing 840 HEDIS gaps annually through proactive outreach and pre-visit planning",
        esText: "Gestionó panel independiente de 950 pacientes (65% Medi-Cal) logrando tasa de HbA1c controlada del 68% y cerrando 840 brechas HEDIS anuales a través de alcance proactivo y planificación previsita",
        keywords: ["panel management", "Medi-Cal", "HEDIS", "HbA1c", "pre-visit planning"],
      },
      {
        id: "np-2",
        text: "Conducted RN co-visits for preventive care, delegating AWV screenings, immunizations, and point-of-care testing to MA team under standing orders, increasing preventive completion rate by 31%",
        esText: "Realizó co-visitas de enfermería para atención preventiva, delegando exámenes AWV, inmunizaciones y pruebas en el punto de atención al equipo de MA bajo órdenes permanentes, aumentando la tasa de completación preventiva en un 31%",
        keywords: ["RN co-visit", "preventive care", "standing orders", "immunizations", "AWV"],
      },
      {
        id: "np-3",
        text: "Collaborated with supervising physician team under California collaborative practice agreement, maintaining zero scope violations and 100% timely chart co-signature compliance",
        esText: "Colaboró con el equipo médico supervisor bajo el acuerdo de práctica colaborativa de California, manteniendo cero violaciones de alcance y cumplimiento del 100% en la co-firma oportuna de gráficos",
        keywords: ["collaborative practice", "California NP scope", "chart co-signature", "compliance"],
      },
      {
        id: "np-4",
        text: "Delivered full-spectrum primary care including acute visits, chronic disease management, women's health, and pediatric well-child visits in OCHIN Epic EHR with FQHC PPS documentation standards",
        esText: "Brindó atención primaria de espectro completo incluyendo visitas agudas, manejo de enfermedades crónicas, salud de la mujer y visitas de niño sano pediátricas en OCHIN Epic EHR",
        keywords: ["OCHIN Epic", "primary care", "PPS documentation", "women's health", "pediatrics"],
      },
      {
        id: "np-5",
        text: "Identified and referred 85 high-utilizer patients to CalAIM ECM services, coordinating with care team on housing instability, food insecurity, and behavioral health needs",
        esText: "Identificó y derivó 85 pacientes de alta utilización a servicios ECM de CalAIM, coordinando con el equipo de atención sobre inestabilidad de vivienda, inseguridad alimentaria y necesidades de salud conductual",
        keywords: ["CalAIM", "ECM", "social determinants", "care coordination", "high utilizers"],
      },
      {
        id: "np-6",
        text: "Achieved top-quartile patient satisfaction scores (4.7/5.0 Press Ganey) through trauma-informed care approach, extended visit times for complex patients, and bilingual care delivery",
        esText: "Logró puntuaciones de satisfacción del paciente en el cuartil superior (4.7/5.0 Press Ganey) a través del enfoque de atención informada en trauma, tiempos de visita extendidos para pacientes complejos y atención bilingüe",
        keywords: ["patient satisfaction", "trauma-informed care", "bilingual", "Press Ganey"],
      },
    ],
  },
  {
    roleId: "physician_assistant",
    roleLabel: "Physician Assistant (PA-C)",
    esRoleLabel: "Asistente del Médico (PA-C)",
    objectiveTemplate:
      "Certified Physician Assistant with FQHC and safety-net medicine experience. Skilled in chronic disease management, same-day access care, Medi-Cal population health, and collaborative practice with supervising physician teams. California PA license, DEA registration, and NHSC loan repayment eligible.",
    esObjectiveTemplate:
      "Asistente del Médico Certificado con experiencia en FQHC y medicina de red de seguridad. Habilidades en manejo de enfermedades crónicas, atención de acceso el mismo día, salud de la población Medi-Cal y práctica colaborativa con equipos médicos supervisores.",
    bullets: [
      {
        id: "pa-1",
        text: "Managed panel of 1,100 patients in FQHC primary care setting, meeting or exceeding HEDIS targets for diabetes (HbA1c control 70%), hypertension (88%), and cancer screening completion (cervical 92%, colorectal 78%)",
        esText: "Gestionó panel de 1,100 pacientes en entorno de atención primaria de FQHC, cumpliendo o superando los objetivos HEDIS para diabetes (control HbA1c 70%), hipertensión (88%) y completación de detección de cáncer",
        keywords: ["panel management", "HEDIS", "diabetes", "hypertension", "cancer screening"],
      },
      {
        id: "pa-2",
        text: "Maintained formal Supervision Agreement with collaborating physician; participated in weekly chart review and monthly case conferences, with zero scope violations across 3-year tenure",
        esText: "Mantuvo Acuerdo de Supervisión formal con médico colaborador; participó en revisión semanal de gráficos y conferencias de casos mensuales, con cero violaciones de alcance durante 3 años",
        keywords: ["supervision agreement", "chart review", "scope of practice", "collaborative practice"],
      },
      {
        id: "pa-3",
        text: "Served as same-day access provider handling 8-12 acute and urgent care visits daily, reducing ED referrals by 22% for attributed Medi-Cal patients through triage-to-treatment same day model",
        esText: "Sirvió como proveedor de acceso el mismo día manejando 8-12 visitas agudas y de atención urgente diariamente, reduciendo las derivaciones a urgencias en un 22% para los pacientes Medi-Cal atribuidos",
        keywords: ["same-day access", "urgent care", "ED referral reduction", "Medi-Cal", "triage"],
      },
      {
        id: "pa-4",
        text: "Documented all encounters in eClinicalWorks EHR per FQHC PPS standards; achieved 98.5% claim acceptance rate through accurate E&M coding and encounter completeness",
        esText: "Documentó todos los encuentros en EHR de eClinicalWorks según los estándares PPS de FQHC; logró tasa de aceptación de reclamos del 98.5% a través de codificación E&M precisa y completitud del encuentro",
        keywords: ["eClinicalWorks", "PPS billing", "E&M coding", "documentation", "claim acceptance"],
      },
      {
        id: "pa-5",
        text: "Collaborated with integrated behavioral health team to co-manage 180+ patients with co-occurring depression/anxiety and chronic disease, improving medication adherence rates by 28%",
        esText: "Colaboró con el equipo integrado de salud conductual para co-gestionar más de 180 pacientes con depresión/ansiedad concurrente y enfermedad crónica, mejorando las tasas de adherencia a la medicación en un 28%",
        keywords: ["behavioral health integration", "co-management", "medication adherence", "depression", "chronic disease"],
      },
      {
        id: "pa-6",
        text: "Enrolled in NHSC Loan Repayment Program at qualifying FQHC site; fulfilled 2-year service obligation while maintaining >90% patient satisfaction and top-decile productivity metrics",
        esText: "Se inscribió en el Programa de Pago de Préstamos NHSC en sitio de FQHC calificado; cumplió la obligación de servicio de 2 años mientras mantenía >90% de satisfacción del paciente y métricas de productividad en el decil superior",
        keywords: ["NHSC loan repayment", "FQHC site", "patient satisfaction", "productivity"],
      },
    ],
  },
  {
    roleId: "dentist",
    roleLabel: "Dentist (DMD/DDS) — FQHC / Safety-Net",
    esRoleLabel: "Dentista (DMD/DDS) — FQHC / Red de Seguridad",
    objectiveTemplate:
      "FQHC dentist with experience in safety-net oral health care for underserved populations. Skilled in Denti-Cal (Medi-Cal dental) billing, full-scope restorative and preventive dentistry, oral-systemic integration with primary care teams, and trauma-informed care for patients with dental avoidance. California dental license, DEA registration, NHSC eligible.",
    esObjectiveTemplate:
      "Dentista de FQHC con experiencia en atención de salud oral de red de seguridad para poblaciones desatendidas. Habilidades en facturación Denti-Cal (dental Medi-Cal), odontología restaurativa y preventiva de alcance completo, integración oral-sistémica con equipos de atención primaria y atención informada en trauma.",
    bullets: [
      {
        id: "dds-1",
        text: "Provided full-scope restorative and preventive dental care to 18–22 patients daily (85% Denti-Cal) including extractions, composite restorations, RPD/complete dentures, and pediatric dentistry",
        esText: "Brindó atención dental restaurativa y preventiva de alcance completo a 18–22 pacientes diarios (85% Denti-Cal) incluyendo extracciones, restauraciones compuestas, dentaduras parciales/completas y odontología pediátrica",
        keywords: ["Denti-Cal", "restorative", "preventive", "extractions", "pediatric dentistry", "dentures"],
      },
      {
        id: "dds-2",
        text: "Reduced Denti-Cal prior authorization denial rate from 21% to 7% by standardizing documentation for prosthetics, extractions, and oral surgery referrals; recovered $180K in previously denied claims",
        esText: "Redujo la tasa de denegación de autorización previa de Denti-Cal del 21% al 7% estandarizando la documentación para prótesis, extracciones y derivaciones de cirugía oral; recuperó $180K en reclamos previamente denegados",
        keywords: ["Denti-Cal", "prior authorization", "denial reduction", "documentation", "revenue recovery"],
      },
      {
        id: "dds-3",
        text: "Supervised 3 Dental Assistants including 2 EDDA-certified DAs, enabling expanded duties (impressions, temp restorations, sealants) that increased clinic throughput by 35% without additional chair time",
        esText: "Supervisó 3 Asistentes Dentales incluyendo 2 DAs certificados EDDA, habilitando deberes expandidos (impresiones, restauraciones temporales, selladores) que aumentaron el rendimiento de la clínica en un 35%",
        keywords: ["EDDA", "dental assistant supervision", "expanded duties", "throughput", "sealants"],
      },
      {
        id: "dds-4",
        text: "Integrated oral health screening into medical workflow — administered blood pressure checks at dental chair, flagged uncontrolled DM patients for same-day medical consult, and co-managed 45 periodontal/diabetic patients with primary care team",
        esText: "Integró el cribado de salud oral en el flujo de trabajo médico — administró controles de presión arterial en el sillón dental, identificó pacientes con DM no controlada para consulta médica el mismo día y co-gestionó 45 pacientes con periodontitis/diabetes con el equipo de atención primaria",
        keywords: ["oral-systemic integration", "diabetes", "periodontal", "blood pressure", "co-management"],
      },
      {
        id: "dds-5",
        text: "Applied trauma-informed care and motivational interviewing techniques for patients with dental avoidance; reduced no-show rate by 19% and increased treatment plan acceptance among 5+ year dental care avoiders",
        esText: "Aplicó técnicas de atención informada en trauma y entrevistas motivacionales para pacientes con evasión dental; redujo la tasa de inasistencia en un 19% y aumentó la aceptación del plan de tratamiento entre los que evitaron la atención dental por más de 5 años",
        keywords: ["trauma-informed care", "motivational interviewing", "dental avoidance", "no-show reduction", "treatment acceptance"],
      },
      {
        id: "dds-6",
        text: "Enrolled in NHSC Loan Repayment Program at qualifying FQHC site; maintained California dental license in good standing with 0 disciplinary actions and top-quartile patient satisfaction throughout service commitment",
        esText: "Se inscribió en el Programa de Pago de Préstamos NHSC en sitio de FQHC calificado; mantuvo la licencia dental de California en buen estado con 0 acciones disciplinarias y satisfacción del paciente en el cuartil superior durante el compromiso de servicio",
        keywords: ["NHSC loan repayment", "California dental license", "patient satisfaction", "FQHC site"],
      },
    ],
  },
];

export const COMMON_CERTIFICATIONS = [
  "CHW Certification (CA)",
  "Certified Medical Assistant (CMA)",
  "BLS/CPR",
  "HIPAA Compliance",
  "Motivational Interviewing",
  "Mental Health First Aid",
  "Trauma-Informed Care",
  "ECM/CCM Training",
  "Phlebotomy",
  "Case Management Certification (CCM)",
  "LCSW",
  "LMFT",
  "ASW/AMFT",
  "LVN",
  "RN",
] as const;

export const LANGUAGE_OPTIONS = [
  "English",
  "Spanish",
  "Tagalog",
  "Cantonese",
  "Mandarin",
  "Vietnamese",
  "Korean",
  "Armenian",
  "Farsi",
  "Arabic",
  "Hmong",
  "Russian",
  "Khmer",
  "Japanese",
  "Hindi",
  "Punjabi",
  "Other",
] as const;

export const PROFICIENCY_LEVELS = [
  { value: "native", label: "Native", esLabel: "Nativo" },
  { value: "professional", label: "Professional", esLabel: "Profesional" },
  { value: "conversational", label: "Conversational", esLabel: "Conversacional" },
  { value: "basic", label: "Basic", esLabel: "Básico" },
] as const;

export type ProficiencyLevel = "native" | "professional" | "conversational" | "basic";

export interface LanguageProficiency {
  language: string;
  proficiency: ProficiencyLevel;
}
