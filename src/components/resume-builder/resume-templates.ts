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
  {
    roleId: "dental_assistant",
    roleLabel: "Dental Assistant",
    esRoleLabel: "Asistente Dental",
    objectiveTemplate:
      "Skilled Dental Assistant with experience supporting high-volume dental care at Federally Qualified Health Centers. Proficient in chair-side assisting, dental radiography, infection control, and supporting Denti-Cal patient populations.",
    esObjectiveTemplate:
      "Asistente Dental habilidoso/a con experiencia apoyando la atención dental de alto volumen en Centros de Salud Comunitarios Federalmente Calificados. Competente en asistencia chairside, radiografía dental, control de infecciones y apoyo a poblaciones de pacientes Denti-Cal.",
    bullets: [
      {
        id: "da-1",
        text: "Provided chair-side dental assistance for high-volume FQHC dental clinic, supporting 15–20 patient appointments daily including restorations, extractions, and preventive care",
        esText: "Proporcionó asistencia dental chairside para clínica dental de FQHC de alto volumen, apoyando 15–20 citas de pacientes diariamente incluyendo restauraciones, extracciones y atención preventiva",
        keywords: ["chair-side assisting", "FQHC dental", "high-volume", "restorations", "extractions"],
      },
      {
        id: "da-2",
        text: "Performed dental radiography (periapical, bitewing, panoramic) using California Radiation Safety Certificate; maintained zero exposure incidents through strict ALARA protocol adherence",
        esText: "Realizó radiografía dental (periapical, aleta de mordida, panorámica) usando Certificado de Seguridad de Radiación de California; mantuvo cero incidentes de exposición mediante adherencia estricta al protocolo ALARA",
        keywords: ["dental radiography", "radiation safety", "ALARA", "periapical", "bitewing", "panoramic"],
      },
      {
        id: "da-3",
        text: "Maintained strict infection control protocols including instrument sterilization, barrier techniques, and OSHA-compliant operatory disinfection procedures for CDC-standard dental infection control",
        esText: "Mantuvo estrictos protocolos de control de infecciones incluyendo esterilización de instrumentos, técnicas de barrera y procedimientos de desinfección de operatorio conformes con OSHA",
        keywords: ["infection control", "sterilization", "OSHA", "barrier techniques", "CDC dental guidelines"],
      },
      {
        id: "da-4",
        text: "Assisted with impressions, temporary restorations, and patient preparation; performed coronal polishing and sealant placement under California RDA expanded duty authorization",
        esText: "Asistió con impresiones, restauraciones temporales y preparación del paciente; realizó pulido coronal y colocación de selladores bajo autorización de deberes expandidos RDA de California",
        keywords: ["RDA expanded duties", "impressions", "sealants", "coronal polishing", "temporary restorations"],
      },
      {
        id: "da-5",
        text: "Maintained California RDA license in good standing; completed required continuing education in infection control, radiation safety, and expanded duty protocols",
        esText: "Mantuvo la licencia RDA de California en buen estado; completó educación continua requerida en control de infecciones, seguridad de radiación y protocolos de deberes expandidos",
        keywords: ["California RDA", "continuing education", "license maintenance"],
      },
      {
        id: "da-6",
        text: "Supported FQHC dental patient communication for Denti-Cal patients, providing trauma-informed and culturally responsive care for patients with dental anxiety and history of dental avoidance",
        esText: "Apoyó la comunicación con pacientes dentales de FQHC para pacientes de Denti-Cal, brindando atención informada por trauma y culturalmente receptiva para pacientes con ansiedad dental",
        keywords: ["Denti-Cal", "trauma-informed care", "dental anxiety", "patient communication", "FQHC"],
      },
      {
        id: "da-7",
        text: "Assisted with specialty dental procedures including oral surgery, pediatric dentistry, and orthodontic procedures; demonstrated clinical versatility across multiple dental disciplines",
        esText: "Asistió con procedimientos dentales de especialidad incluyendo cirugía oral, odontología pediátrica y procedimientos ortodónticos; demostró versatilidad clínica en múltiples disciplinas dentales",
        keywords: ["oral surgery", "pediatric dentistry", "orthodontics", "specialty dental"],
      },
    ],
  },
  {
    roleId: "dental_hygienist",
    roleLabel: "Dental Hygienist",
    esRoleLabel: "Higienista Dental",
    objectiveTemplate:
      "Registered Dental Hygienist with FQHC and community health center experience delivering preventive oral health care to Denti-Cal patients. Skilled in periodontal assessment, scaling and root planing, and oral health education for underserved California communities.",
    esObjectiveTemplate:
      "Higienista Dental Registrado/a con experiencia en FQHC y centros de salud comunitarios brindando atención preventiva de salud oral a pacientes de Denti-Cal. Habilidoso/a en evaluación periodontal, escalonamiento y alisado radicular, y educación en salud oral para comunidades desatendidas de California.",
    bullets: [
      {
        id: "dh-1",
        text: "Performed comprehensive periodontal assessments and scaling/root planing (SRP) for high-volume FQHC dental clinic serving 12–16 patients daily; maintained 98% Denti-Cal documentation accuracy",
        esText: "Realizó evaluaciones periodontales completas y escalonamiento/alisado radicular (SRP) para clínica dental FQHC de alto volumen atendiendo 12–16 pacientes diariamente; mantuvo 98% de precisión en documentación Denti-Cal",
        keywords: ["scaling root planing", "periodontal assessment", "FQHC dental", "Denti-Cal documentation"],
      },
      {
        id: "dh-2",
        text: "Conducted full-mouth periodontal charting including pocket depth, furcation involvement, and mobility assessment; flagged at-risk patients for periodontal specialist referral and chronic disease co-management",
        esText: "Realizó registro periodontal completo incluyendo profundidad de bolsa, involucración de furcación y evaluación de movilidad; identificó pacientes en riesgo para derivación a especialista periodontal",
        keywords: ["periodontal charting", "pocket depth", "furcation", "specialist referral", "chronic disease"],
      },
      {
        id: "dh-3",
        text: "Provided oral health education and hygiene instruction for predominantly Medi-Cal/Denti-Cal patients with limited dental literacy; adapted teaching to patient language, literacy level, and cultural context",
        esText: "Proporcionó educación en salud oral e instrucción de higiene para pacientes principalmente de Medi-Cal/Denti-Cal con conocimientos dentales limitados; adaptó la enseñanza al idioma, nivel de alfabetización y contexto cultural del paciente",
        keywords: ["oral health education", "Denti-Cal", "health literacy", "cultural competency", "hygiene instruction"],
      },
      {
        id: "dh-4",
        text: "Performed sealant placement and pediatric dental hygiene services; screened children for early childhood caries, fluoride varnish application, and CHDP documentation",
        esText: "Realizó colocación de selladores y servicios de higiene dental pediátrica; examinó niños en busca de caries de la primera infancia, aplicación de barniz de flúor y documentación CHDP",
        keywords: ["sealants", "pediatric hygiene", "fluoride varnish", "CHDP", "early childhood caries"],
      },
      {
        id: "dh-5",
        text: "Provided prenatal oral health counseling and tobacco cessation services; linked expectant mothers with periodontal disease to medical team for gestational diabetes and preterm birth risk management",
        esText: "Proporcionó consejería de salud oral prenatal y servicios de cesación del tabaco; vinculó a madres embarazadas con enfermedad periodontal con el equipo médico para el manejo del riesgo de diabetes gestacional y parto prematuro",
        keywords: ["prenatal oral health", "tobacco cessation", "periodontal disease", "gestational diabetes", "preterm birth"],
      },
    ],
  },
  {
    roleId: "pharmacist",
    roleLabel: "Pharmacist (PharmD)",
    esRoleLabel: "Farmacéutico/a (PharmD)",
    objectiveTemplate:
      "Licensed PharmD with experience in FQHC and safety-net pharmacy practice, including 340B program administration and Medi-Cal patient counseling. Committed to medication access equity and evidence-based pharmaceutical care for underserved California communities.",
    esObjectiveTemplate:
      "PharmD con licencia con experiencia en práctica farmacéutica de FQHC y red de seguridad, incluyendo administración del programa 340B y asesoramiento a pacientes de Medi-Cal. Comprometido/a con la equidad de acceso a medicamentos y la atención farmacéutica basada en evidencia.",
    bullets: [
      {
        id: "ph-1",
        text: "Managed 340B program dispensing and compliance for FQHC pharmacy, ensuring accurate split billing, contract pharmacy documentation, and annual audit preparation; maintained zero 340B compliance findings",
        esText: "Gestionó la dispensación y el cumplimiento del programa 340B para la farmacia FQHC, asegurando facturación dividida precisa, documentación de farmacia contratista y preparación de auditoría anual; mantuvo cero hallazgos de cumplimiento 340B",
        keywords: ["340B program", "split billing", "contract pharmacy", "compliance", "FQHC pharmacy"],
      },
      {
        id: "ph-2",
        text: "Delivered Medication Therapy Management (MTM) services for complex Medi-Cal patients; conducted comprehensive medication reviews for polymedicated patients with DM, HTN, CHF, and co-occurring mental health conditions",
        esText: "Brindó servicios de Gestión de Terapia Medicamentosa (MTM) para pacientes complejos de Medi-Cal; realizó revisiones integrales de medicamentos para pacientes polimedicados con DM, HTN, ICC y condiciones de salud mental co-ocurrentes",
        keywords: ["Medication Therapy Management", "MTM", "Medi-Cal", "diabetes", "hypertension", "polypharmacy"],
      },
      {
        id: "ph-3",
        text: "Operated under Collaborative Drug Therapy Management (CDTM) agreement with FQHC medical director; independently adjusted medications for anticoagulation, diabetes management, and hypertension in panel of 120+ patients",
        esText: "Operó bajo acuerdo de Manejo Colaborativo de Terapia Farmacológica (CDTM) con el director médico del FQHC; ajustó independientemente medicamentos para anticoagulación, manejo de diabetes e hipertensión en un panel de 120+ pacientes",
        keywords: ["CDTM", "collaborative practice", "anticoagulation", "diabetes management", "hypertension"],
      },
      {
        id: "ph-4",
        text: "Administered immunizations including influenza, COVID-19, Tdap, hepatitis B, and pneumococcal vaccines; counseled patients on immunization schedules and documented in CAIR2 registry",
        esText: "Administró inmunizaciones incluyendo influenza, COVID-19, Tdap, hepatitis B y vacunas neumocócicas; asesoró a pacientes sobre calendarios de vacunación y documentó en el registro CAIR2",
        keywords: ["immunizations", "vaccines", "CAIR2", "influenza", "COVID-19", "hepatitis B"],
      },
      {
        id: "ph-5",
        text: "Provided bilingual medication counseling in Spanish and English for Medi-Cal patients with limited health literacy; improved medication adherence by 23% for chronic disease patients through structured counseling protocols",
        esText: "Proporcionó asesoramiento de medicamentos bilingüe en español e inglés para pacientes de Medi-Cal con alfabetización en salud limitada; mejoró la adherencia a la medicación en un 23% para pacientes con enfermedades crónicas",
        keywords: ["bilingual counseling", "medication adherence", "health literacy", "Medi-Cal", "chronic disease"],
      },
    ],
  },
  {
    roleId: "pharmacy_technician",
    roleLabel: "Pharmacy Technician",
    esRoleLabel: "Técnico/a de Farmacia",
    objectiveTemplate:
      "Certified Pharmacy Technician (CPhT) with experience in high-volume FQHC pharmacy dispensing and 340B program administration. Detail-oriented professional committed to medication accuracy and access for Medi-Cal and underserved patient populations.",
    esObjectiveTemplate:
      "Técnico/a de Farmacia Certificado/a (CPhT) con experiencia en dispensación de farmacia FQHC de alto volumen y administración del programa 340B. Profesional orientado/a al detalle comprometido/a con la precisión de medicamentos y el acceso para pacientes de Medi-Cal y desatendidos.",
    bullets: [
      {
        id: "pt-1",
        text: "Processed 150+ prescriptions daily at FQHC pharmacy with 99.9% dispensing accuracy; maintained California Pharmacy Technician registration in good standing throughout employment",
        esText: "Procesó 150+ recetas diarias en farmacia FQHC con 99.9% de precisión en dispensación; mantuvo el registro de Técnico de Farmacia de California en buen estado durante todo el empleo",
        keywords: ["prescription processing", "dispensing accuracy", "California Pharmacy Technician", "FQHC pharmacy"],
      },
      {
        id: "pt-2",
        text: "Maintained 340B program compliance through accurate inventory tracking, split billing documentation, and contract pharmacy reporting; supported zero-deficiency 340B audit outcome",
        esText: "Mantuvo el cumplimiento del programa 340B mediante seguimiento preciso del inventario, documentación de facturación dividida e informes de farmacias contratistas; apoyó el resultado de auditoría 340B sin deficiencias",
        keywords: ["340B compliance", "inventory tracking", "split billing", "contract pharmacy", "audit"],
      },
      {
        id: "pt-3",
        text: "Managed insurance verification and prior authorization processing for Medi-Cal and commercial plans; reduced prior auth processing time by 30% through standardized workflow and proactive follow-up",
        esText: "Gestionó la verificación de seguros y el procesamiento de autorización previa para Medi-Cal y planes comerciales; redujo el tiempo de procesamiento de autorización previa en un 30% mediante flujo de trabajo estandarizado",
        keywords: ["insurance verification", "prior authorization", "Medi-Cal", "workflow standardization"],
      },
      {
        id: "pt-4",
        text: "Managed pharmacy drug inventory including ordering, receiving, rotating stock, and controlled substance tracking; maintained optimal par levels to prevent stockouts for high-use Medi-Cal formulary medications",
        esText: "Gestionó el inventario de medicamentos de la farmacia incluyendo pedidos, recepción, rotación de existencias y seguimiento de sustancias controladas; mantuvo niveles óptimos para prevenir desabastecimientos",
        keywords: ["drug inventory", "ordering", "controlled substances", "par levels", "Medi-Cal formulary"],
      },
      {
        id: "pt-5",
        text: "Maintained PTCB CPhT certification through ongoing continuing education; completed NACHC 340B training and remained current on Medi-Cal pharmacy benefit updates and formulary changes",
        esText: "Mantuvo la certificación PTCB CPhT mediante educación continua permanente; completó la capacitación 340B de NACHC y se mantuvo al día en las actualizaciones de beneficios de farmacia de Medi-Cal y cambios en el formulario",
        keywords: ["PTCB CPhT", "continuing education", "NACHC 340B training", "Medi-Cal pharmacy"],
      },
    ],
  },
  {
    roleId: "health_enrollment_navigator",
    roleLabel: "Health Enrollment Navigator",
    esRoleLabel: "Navegador/a de Inscripción de Salud",
    objectiveTemplate:
      "Certified Health Enrollment Navigator with expertise in Medi-Cal and Covered California eligibility determination for safety-net patient populations. Committed to health access equity through accurate enrollment, renewal support, and navigation of complex coverage programs including programs for undocumented patients.",
    esObjectiveTemplate:
      "Navegador/a de Inscripción de Salud Certificado/a con experiencia en determinación de elegibilidad de Medi-Cal y Covered California para poblaciones de pacientes de red de seguridad. Comprometido/a con la equidad de acceso a la salud a través de inscripción precisa, soporte de renovación y navegación de programas de cobertura complejos.",
    bullets: [
      {
        id: "en-1",
        text: "Completed Medi-Cal eligibility determinations and enrollment applications for 75+ patients monthly; maintained 97% first-time approval rate through accurate income documentation and eligibility verification",
        esText: "Completó determinaciones de elegibilidad de Medi-Cal y solicitudes de inscripción para 75+ pacientes mensualmente; mantuvo una tasa de aprobación de primera vez del 97% mediante documentación precisa de ingresos y verificación de elegibilidad",
        keywords: ["Medi-Cal enrollment", "eligibility determination", "income documentation", "approval rate"],
      },
      {
        id: "en-2",
        text: "Enrolled patients in Covered California Qualified Health Plans during Open Enrollment and Special Enrollment Periods; assisted patients with plan comparison, premium tax credit calculation, and APTC application",
        esText: "Inscribió pacientes en Planes de Salud Calificados de Covered California durante los Períodos de Inscripción Abierta y Especial; asistió a los pacientes con la comparación de planes, el cálculo del crédito fiscal de prima y la solicitud de APTC",
        keywords: ["Covered California", "Special Enrollment Period", "premium tax credit", "APTC", "QHP enrollment"],
      },
      {
        id: "en-3",
        text: "Navigated complex coverage programs for undocumented patients including ILOS (Immigrants Limited Outpatient Services), PACE (Primary Access for Care and Education), and Medi-Cal for All (AB 4) enrollment",
        esText: "Navegó programas de cobertura complejos para pacientes indocumentados incluyendo ILOS (Servicios Ambulatorios Limitados para Inmigrantes), PACE y la inscripción en Medi-Cal para Todos (AB 4)",
        keywords: ["undocumented patients", "ILOS", "PACE", "Medi-Cal for All", "AB 4", "immigrant health access"],
      },
      {
        id: "en-4",
        text: "Enrolled high-need Medi-Cal members in CalAIM Community Supports programs including housing navigation, medically tailored meals, and sobering centers; coordinated with care team to identify ECM-eligible patients",
        esText: "Inscribió miembros de Medi-Cal de alta necesidad en programas de CalAIM Community Supports incluyendo navegación de vivienda, comidas médicamente adaptadas y centros de sobriedad; coordinó con el equipo de atención para identificar pacientes elegibles para ECM",
        keywords: ["CalAIM Community Supports", "housing navigation", "ECM eligibility", "medically tailored meals"],
      },
      {
        id: "en-5",
        text: "Administered FQHC sliding fee scale program — screened patient income, determined discount tier, obtained required certifications, and updated records per HRSA sliding fee requirements",
        esText: "Administró el programa de escala de tarifas deslizantes de FQHC — examinó los ingresos de los pacientes, determinó el nivel de descuento, obtuvo las certificaciones requeridas y actualizó los registros según los requisitos de HRSA",
        keywords: ["sliding fee scale", "FQHC discount", "HRSA requirements", "income screening", "discount tier"],
      },
      {
        id: "en-6",
        text: "Managed Medi-Cal annual renewal caseload of 200+ patients; implemented proactive outreach system that reduced coverage gaps from lapses by 34% during the post-PHE unwinding period",
        esText: "Gestionó la carga de casos de renovación anual de Medi-Cal de 200+ pacientes; implementó un sistema de alcance proactivo que redujo las brechas de cobertura por vencimientos en un 34% durante el período de desenrollamiento post-PHE",
        keywords: ["Medi-Cal renewal", "PHE unwinding", "coverage gaps", "proactive outreach", "caseload management"],
      },
    ],
  },
  {
    roleId: "lvn",
    roleLabel: "Licensed Vocational Nurse (LVN)",
    esRoleLabel: "Enfermero/a Vocacional Licenciado/a (LVN)",
    objectiveTemplate:
      "Licensed Vocational Nurse with experience in high-volume FQHC clinical settings, delivering efficient nursing care to Medi-Cal and underserved populations. Skilled in patient rooming, medication administration, and chronic disease support under RN and physician supervision.",
    esObjectiveTemplate:
      "Enfermero/a Vocacional Licenciado/a con experiencia en entornos clínicos FQHC de alto volumen, brindando atención de enfermería eficiente a poblaciones de Medi-Cal y desatendidas. Habilidoso/a en ingreso de pacientes, administración de medicamentos y soporte de enfermedades crónicas bajo supervisión de RN y médico.",
    bullets: [
      {
        id: "lvn-1",
        text: "Roomed 20–25 patients daily in high-volume FQHC primary care clinic; obtained vital signs, chief complaint, medication reconciliation, and allergy review per clinical protocol; maintained <5 minute rooming time average",
        esText: "Ingresó 20–25 pacientes diariamente en clínica de atención primaria FQHC de alto volumen; obtuvo signos vitales, queja principal, reconciliación de medicamentos y revisión de alergias por protocolo clínico; mantuvo un tiempo promedio de ingreso de <5 minutos",
        keywords: ["patient rooming", "vital signs", "medication reconciliation", "FQHC primary care", "high-volume"],
      },
      {
        id: "lvn-2",
        text: "Administered medications including injections (IM, SubQ, intradermal), vaccines, and TB skin tests; managed and documented controlled substance administration per DEA and California Board of Pharmacy requirements",
        esText: "Administró medicamentos incluyendo inyecciones (IM, SubQ, intradérmicas), vacunas y pruebas cutáneas de TB; gestionó y documentó la administración de sustancias controladas según los requisitos de DEA y la Junta de Farmacia de California",
        keywords: ["medication administration", "injections", "vaccines", "TB testing", "controlled substances"],
      },
      {
        id: "lvn-3",
        text: "Performed phlebotomy and specimen collection including blood draws, throat cultures, and rapid diagnostic testing (influenza, strep, COVID-19, pregnancy); processed specimens per clinic protocol",
        esText: "Realizó flebotomía y recolección de muestras incluyendo extracciones de sangre, cultivos de garganta y pruebas diagnósticas rápidas (influenza, estreptococo, COVID-19, embarazo); procesó muestras por protocolo de la clínica",
        keywords: ["phlebotomy", "specimen collection", "rapid testing", "blood draws", "diagnostic testing"],
      },
      {
        id: "lvn-4",
        text: "Administered IV therapy and infusions under RN and physician supervision; maintained IV access, monitored infusion rates, and documented patient response per standing orders",
        esText: "Administró terapia IV e infusiones bajo supervisión de RN y médico; mantuvo acceso IV, monitoreó las tasas de infusión y documentó la respuesta del paciente por órdenes permanentes",
        keywords: ["IV therapy", "infusion", "IV access", "standing orders", "RN supervision"],
      },
      {
        id: "lvn-5",
        text: "Provided chronic disease patient education for DM, HTN, asthma, and COPD; delivered culturally appropriate, teach-back-validated instruction in English and Spanish; tracked education completion in EHR",
        esText: "Proporcionó educación al paciente sobre enfermedades crónicas para DM, HTN, asma y EPOC; brindó instrucción culturalmente apropiada validada con técnica de repetición en inglés y español; rastreó la finalización de la educación en el EHR",
        keywords: ["patient education", "diabetes", "hypertension", "teach-back", "chronic disease management"],
      },
      {
        id: "lvn-6",
        text: "Supported care coordination at FQHC by completing HEDIS care gap outreach, scheduling follow-up appointments, and coordinating specialist referrals for complex Medi-Cal patients",
        esText: "Apoyó la coordinación de atención en el FQHC completando el alcance de brechas de atención HEDIS, programando citas de seguimiento y coordinando referencias a especialistas para pacientes complejos de Medi-Cal",
        keywords: ["care coordination", "HEDIS", "care gaps", "specialist referrals", "Medi-Cal", "FQHC"],
      },
    ],
  },
  {
    roleId: "psychiatric_np",
    roleLabel: "Psychiatric NP (PMHNP)",
    esRoleLabel: "NP Psiquiátrico/a (PMHNP)",
    objectiveTemplate:
      "Psychiatric-Mental Health Nurse Practitioner (PMHNP) with experience providing psychiatric medication management and integrated behavioral health services at Federally Qualified Health Centers. Committed to evidence-based psychiatric care for Medi-Cal populations including serious mental illness, co-occurring SUD, and trauma-impacted communities.",
    esObjectiveTemplate:
      "Enfermero/a Practicante de Salud Mental Psiquiátrica (PMHNP) con experiencia brindando manejo de medicamentos psiquiátricos y servicios integrados de salud conductual en Centros de Salud Comunitarios Federalmente Calificados. Comprometido/a con la atención psiquiátrica basada en evidencia para poblaciones de Medi-Cal.",
    bullets: [
      {
        id: "pnp-1",
        text: "Managed psychiatric medication caseload of 120+ Medi-Cal patients with serious mental illness (schizophrenia, bipolar disorder, treatment-resistant MDD); provided medication management visits aligned with FQHC PPS billing requirements",
        esText: "Gestionó la carga de casos de medicación psiquiátrica de 120+ pacientes de Medi-Cal con enfermedad mental grave (esquizofrenia, trastorno bipolar, TDM resistente al tratamiento); proporcionó visitas de manejo de medicamentos alineadas con los requisitos de facturación PPS de FQHC",
        keywords: ["psychiatric medication management", "serious mental illness", "Medi-Cal", "FQHC PPS billing", "schizophrenia", "bipolar"],
      },
      {
        id: "pnp-2",
        text: "Conducted psychiatric crisis assessments and safety planning for FQHC patients with acute suicidality, psychosis, and co-occurring SUD; coordinated warm handoffs to crisis stabilization units and MAT programs",
        esText: "Realizó evaluaciones de crisis psiquiátricas y planificación de seguridad para pacientes de FQHC con suicidalidad aguda, psicosis y TUS co-ocurrente; coordinó transferencias cálidas a unidades de estabilización de crisis y programas MAT",
        keywords: ["crisis assessment", "safety planning", "suicidality", "psychosis", "SUD", "MAT", "warm handoff"],
      },
      {
        id: "pnp-3",
        text: "Provided psychiatric consultation in Collaborative Care Model (CoCM) for FQHC primary care caseload of 250+ patients; conducted weekly registry reviews, responded to caseload-level alerts, and delivered recommendations to BH care managers",
        esText: "Proporcionó consulta psiquiátrica en el Modelo de Atención Colaborativa (CoCM) para la carga de casos de atención primaria de FQHC de 250+ pacientes; realizó revisiones de registro semanales, respondió a alertas a nivel de carga de casos y brindó recomendaciones a los gerentes de atención de BH",
        keywords: ["Collaborative Care Model", "CoCM", "psychiatric consultation", "registry review", "population-based psychiatry"],
      },
      {
        id: "pnp-4",
        text: "Delivered tele-psychiatry services to rural and underserved FQHC satellite sites, extending psychiatric access to patients 60+ miles from nearest in-person psychiatric provider; conducted 20+ tele-psych visits weekly",
        esText: "Brindó servicios de tele-psiquiatría a sitios satelitales rurales y desatendidos de FQHC, extendiendo el acceso psiquiátrico a pacientes a 60+ millas del proveedor psiquiátrico presencial más cercano; realizó 20+ visitas de tele-psiquiatría semanalmente",
        keywords: ["tele-psychiatry", "rural mental health", "FQHC satellite", "psychiatric access", "telehealth"],
      },
      {
        id: "pnp-5",
        text: "Applied trauma-informed psychiatric practice for FQHC patients with complex trauma histories including adverse childhood experiences, immigration trauma, and sexual violence; integrated cultural formulation into diagnosis and treatment planning",
        esText: "Aplicó práctica psiquiátrica informada por trauma para pacientes de FQHC con historias de trauma complejo incluyendo experiencias adversas en la infancia, trauma de inmigración y violencia sexual; integró la formulación cultural en el diagnóstico y la planificación del tratamiento",
        keywords: ["trauma-informed psychiatry", "ACEs", "immigration trauma", "cultural formulation", "complex trauma"],
      },
    ],
  },
  {
    roleId: "program_manager",
    roleLabel: "Program Manager",
    esRoleLabel: "Gerente de Programa",
    objectiveTemplate:
      "Healthcare Program Manager with experience leading CalAIM, HRSA, and community health programs at Federally Qualified Health Centers. Results-driven professional skilled in cross-functional team leadership, grant compliance, and data-driven program optimization for safety-net populations.",
    esObjectiveTemplate:
      "Gerente de Programa de Salud con experiencia liderando programas CalAIM, HRSA y de salud comunitaria en Centros de Salud Comunitarios Federalmente Calificados. Profesional orientado/a a resultados con habilidades en liderazgo de equipos interfuncionales, cumplimiento de subvenciones y optimización de programas basada en datos.",
    bullets: [
      {
        id: "pgm-1",
        text: "Managed CalAIM ECM program for FQHC, scaling from 0 to 350 enrolled members in 18 months; supervised team of 8 care managers and CHWs, achieving 87% care plan completion rate and exceeding DHCS performance benchmarks",
        esText: "Gestionó el programa CalAIM ECM para FQHC, escalando de 0 a 350 miembros inscritos en 18 meses; supervisó un equipo de 8 gerentes de atención y CHWs, logrando una tasa de finalización de planes de atención del 87% y superando los puntos de referencia de desempeño de DHCS",
        keywords: ["CalAIM ECM", "program scaling", "care managers", "DHCS benchmarks", "performance management"],
      },
      {
        id: "pgm-2",
        text: "Managed HRSA Section 330 grant compliance for 5-site FQHC including scope of project amendments, annual UDS reporting, and HRSA site visit preparation; maintained zero compliance findings across 3 consecutive HRSA operational site visits",
        esText: "Gestionó el cumplimiento de la subvención HRSA Sección 330 para FQHC de 5 sitios incluyendo enmiendas al alcance del proyecto, informes UDS anuales y preparación para visitas del sitio de HRSA; mantuvo cero hallazgos de cumplimiento en 3 visitas operativas consecutivas de HRSA",
        keywords: ["HRSA Section 330", "grant compliance", "UDS reporting", "scope of project", "site visit preparation"],
      },
      {
        id: "pgm-3",
        text: "Led behavioral health integration program expansion — recruited and onboarded 4 LCSW/LMFT staff, implemented Collaborative Care Model registry, and increased same-day BH access from 12% to 68% of primary care visits",
        esText: "Lideró la expansión del programa de integración de salud conductual — reclutó e incorporó 4 empleados LCSW/LMFT, implementó el registro del Modelo de Atención Colaborativa y aumentó el acceso BH el mismo día del 12% al 68% de las visitas de atención primaria",
        keywords: ["behavioral health integration", "Collaborative Care Model", "LCSW recruitment", "same-day BH access"],
      },
      {
        id: "pgm-4",
        text: "Implemented quality improvement initiatives targeting HEDIS measures including DM care (HbA1c testing, eye referrals), depression screening (PHQ-9), and childhood immunizations; improved composite quality score from 62nd to 84th percentile in 2 years",
        esText: "Implementó iniciativas de mejora de calidad dirigidas a medidas HEDIS incluyendo atención DM (prueba HbA1c, referencias de ojos), detección de depresión (PHQ-9) e inmunizaciones infantiles; mejoró la puntuación de calidad compuesta del percentil 62 al 84 en 2 años",
        keywords: ["quality improvement", "HEDIS", "HbA1c", "depression screening", "childhood immunizations", "PHQ-9"],
      },
      {
        id: "pgm-5",
        text: "Led multi-site program team of 18 staff across 3 FQHC locations; implemented weekly team huddles, monthly performance dashboard reviews, and quarterly training programs that reduced staff turnover from 42% to 18% annually",
        esText: "Lideró un equipo de programa de múltiples sitios de 18 empleados en 3 ubicaciones de FQHC; implementó reuniones de equipo semanales, revisiones mensuales del panel de desempeño y programas de capacitación trimestrales que redujeron la rotación de personal del 42% al 18% anualmente",
        keywords: ["multi-site program", "team leadership", "performance dashboard", "staff retention", "turnover reduction"],
      },
      {
        id: "pgm-6",
        text: "Managed $2.4M program budget and funder reporting for 3 concurrent grants (HRSA, county health, foundation); delivered all progress reports on time with zero audit findings and maintained 98% allowable expenditure rate",
        esText: "Gestionó el presupuesto del programa de $2.4M e informes a financiadores para 3 subvenciones concurrentes (HRSA, salud del condado, fundación); entregó todos los informes de progreso a tiempo con cero hallazgos de auditoría y mantuvo una tasa de gasto permitido del 98%",
        keywords: ["program budget", "grant management", "funder reporting", "HRSA grant", "audit compliance"],
      },
    ],
  },
  {
    roleId: "compliance_officer",
    roleLabel: "Compliance Officer",
    esRoleLabel: "Oficial de Cumplimiento",
    objectiveTemplate:
      "Healthcare Compliance Officer with expertise in FQHC regulatory requirements, HIPAA privacy/security, and HRSA grant compliance. Skilled in billing audits, breach response, and building organizational compliance culture while maintaining mission-driven focus on vulnerable populations.",
    esObjectiveTemplate:
      "Oficial de Cumplimiento de Salud con experiencia en requisitos regulatorios de FQHC, privacidad/seguridad HIPAA y cumplimiento de subvenciones HRSA. Habilidades en auditorías de facturación, respuesta de violación y construcción de cultura de cumplimiento organizacional.",
    bullets: [
      {
        id: "co-1",
        text: "Led HRSA Operational Site Visit (OSV) preparation and remediation for 5-site FQHC; managed Conditions of Award and Areas for Improvement, achieving zero findings on next OSV and maintaining federal funding integrity",
        esText: "Lideró la preparación y remediación de la Visita al Sitio Operativo (OSV) de HRSA para FQHC de 5 sitios; gestionó Condiciones de Premio y Áreas de Mejora, logrando cero hallazgos en la próxima OSV y manteniendo la integridad de la financiación federal",
        keywords: ["HRSA OSV", "Conditions of Award", "FQHC compliance", "federal funding", "remediation"],
      },
      {
        id: "co-2",
        text: "Developed and implemented comprehensive compliance program from scratch including code of conduct, policies on billing, HIPAA, conflict-of-interest, and scope-of-practice; established Compliance Committee and mandatory staff training (95% completion rate)",
        esText: "Desarrolló e implementó un programa de cumplimiento integral desde cero incluyendo código de conducta, políticas de facturación, HIPAA, conflicto de intereses y alcance de práctica; estableció Comité de Cumplimiento y capacitación obligatoria del personal (95% de tasa de finalización)",
        keywords: ["compliance program", "code of conduct", "HIPAA policy", "scope-of-practice", "staff training"],
      },
      {
        id: "co-3",
        text: "Conducted comprehensive PPS billing audits across 40+ providers; identified and resolved billing pattern issues including upcoding and documentation gaps; recovered $185K in overpayments while implementing provider retraining to prevent future violations",
        esText: "Realizó auditorías integrales de facturación PPS en más de 40 proveedores; identificó y resolvió problemas de patrones de facturación incluyendo codificación excesiva y brechas de documentación; recuperó $185K en pagos excesivos mientras implementaba reentrenamiento del proveedor",
        keywords: ["PPS billing audit", "billing compliance", "provider education", "audit recovery", "documentation"],
      },
      {
        id: "co-4",
        text: "Managed HIPAA breach response protocol including incident investigation, patient notification, OCR reporting, and security risk assessment; handled 3 breaches with appropriate notifications and zero OCR penalties",
        esText: "Gestionó el protocolo de respuesta de violación HIPAA incluyendo investigación de incidentes, notificación de pacientes, informes de OCR y evaluación de riesgos de seguridad; manejó 3 violaciones con notificaciones apropiadas y cero penalizaciones de OCR",
        keywords: ["HIPAA breach response", "patient notification", "OCR reporting", "security assessment", "incident investigation"],
      },
      {
        id: "co-5",
        text: "Established 340B drug pricing program compliance and reconciliation process; tracked 200+ Business Associate Agreements with 98% current status; implemented quarterly 340B audits preventing split-billing errors and maintaining contract pharmacy compliance",
        esText: "Estableció el cumplimiento del programa de precios de drogas 340B y el proceso de reconciliación; rastreó 200+ Acuerdos de Asociados de Negocio con 98% de estado vigente; implementó auditorías trimestrales de 340B previniendo errores de facturación dividida",
        keywords: ["340B program", "Business Associate Agreements", "contract pharmacy", "program reconciliation", "HIPAA compliance"],
      },
      {
        id: "co-6",
        text: "Advocated for compliance priorities with C-suite leadership navigating tension between revenue pressure and risk reduction; proposed mitigation strategies that protected organization from audit liability while supporting operational goals (e.g., provider coaching vs. sanctions)",
        esText: "Abogó por prioridades de cumplimiento con liderazgo de C-suite navegando la tensión entre presión de ingresos y reducción de riesgos; propuso estrategias de mitigación que protegieron la organización de la responsabilidad de auditoría mientras apoyaban objetivos operacionales",
        keywords: ["leadership advocacy", "risk management", "provider management", "audit prevention", "compliance strategy"],
      },
      {
        id: "co-7",
        text: "Designed and launched compliance training program tailored to role-specific needs (clinical, billing, administrative); increased knowledge retention from 45% to 82% through monthly case studies and scenario-based learning; tracked compliance incidents with trending dashboard",
        esText: "Diseñó y lanzó un programa de capacitación de cumplimiento adaptado a necesidades específicas de roles; aumentó la retención de conocimiento del 45% al 82% a través de estudios de caso mensuales y aprendizaje basado en escenarios; rastreó incidentes de cumplimiento con panel de tendencias",
        keywords: ["compliance training", "knowledge retention", "role-specific training", "staff development", "incident tracking"],
      },
      {
        id: "co-8",
        text: "Managed board-level compliance reporting and regulatory liaison; compiled quarterly compliance dashboards for Board Compliance Committee; coordinated responses to HRSA, CMS, and state health department inquiries; maintained documentation of all compliance activities for audit trail",
        esText: "Gestionó reportes de cumplimiento a nivel de junta e intermediación regulatoria; compiló paneles de cumplimiento trimestrales para el Comité de Cumplimiento de la Junta; coordinó respuestas a investigaciones de HRSA, CMS y departamento de salud estatal",
        keywords: ["board reporting", "regulatory liaison", "HRSA correspondence", "compliance dashboard", "documentation"],
      },
    ],
  },
  {
    roleId: "compliance_analyst",
    roleLabel: "Compliance Analyst",
    esRoleLabel: "Analista de Cumplimiento",
    objectiveTemplate:
      "Detail-oriented Compliance Analyst with expertise in healthcare billing audits, HIPAA compliance, and FQHC regulatory requirements. Experienced in chart review, PPS billing verification, 340B program reconciliation, and supporting comprehensive compliance program operations.",
    esObjectiveTemplate:
      "Analista de Cumplimiento orientado/a a detalles con experiencia en auditorías de facturación médica, cumplimiento HIPAA y requisitos regulatorios de FQHC. Experimentado/a en revisión de gráficos, verificación de facturación PPS y reconciliación del programa 340B.",
    bullets: [
      {
        id: "ca-1",
        text: "Conducted PPS billing audits on 100+ provider encounters per month; reviewed charts for qualifying visit documentation, provider credentials, and billing accuracy; identified patterns and reported findings to Compliance Officer with recommendations for provider retraining",
        esText: "Realizó auditorías de facturación PPS en más de 100 encuentros de proveedores por mes; revisó gráficos de documentación de visita calificada, credenciales del proveedor y precisión de facturación; identificó patrones e informó hallazgos al Oficial de Cumplimiento",
        keywords: ["PPS billing audit", "chart review", "provider credentials", "encounter documentation", "audit findings"],
      },
      {
        id: "ca-2",
        text: "Managed inventory and tracking of 185 Business Associate Agreements; created and maintained compliance database with signature dates, expiration dates, and renewal status; coordinated with IT, Finance, and external vendors to obtain missing or expired BAAs; achieved 98% current status",
        esText: "Gestionó el inventario y seguimiento de 185 Acuerdos de Asociados de Negocio; creó y mantuvo una base de datos de cumplimiento con fechas de firma, vencimiento y estado de renovación; coordinó con TI, Finanzas y proveedores externos para obtener BAAs faltantes o caducados",
        keywords: ["Business Associate Agreements", "HIPAA compliance", "vendor management", "compliance tracking", "BAA database"],
      },
      {
        id: "ca-3",
        text: "Performed 340B drug pricing program reconciliation of 250+ pharmacy claims monthly; matched prescriptions to EHR eligibility data; identified discrepancies and investigated root causes (patient status changes, pharmacy system errors, duplicate enrollment); maintained zero overpayment errors",
        esText: "Realizó reconciliación del programa de precios de drogas 340B de 250+ reclamos de farmacia mensualmente; cotejó recetas con datos de elegibilidad del EHR; identificó discrepancias e investigó causas raíz; mantuvo cero errores de pago excesivo",
        keywords: ["340B program", "billing reconciliation", "pharmacy claims", "eligibility verification", "data accuracy"],
      },
      {
        id: "ca-4",
        text: "Coordinated HIPAA training for 200+ staff members across multiple locations; developed role-specific training modules (clinical, administrative, billing); tracked completion rates and conducted annual refresher training; supported breach incident investigations and incident documentation",
        esText: "Coordinó la capacitación HIPAA para más de 200 miembros del personal en múltiples ubicaciones; desarrolló módulos de capacitación específicos de roles; rastreó tasas de finalización y realizó capacitación de actualización anual; apoyó investigaciones de incidentes de violación",
        keywords: ["HIPAA training", "staff training", "compliance education", "breach support", "annual training"],
      },
      {
        id: "ca-5",
        text: "Performed credentialing file management and verification for 50+ providers including license verification, DEA registration, malpractice history, and peer references; ensured files remained current per accreditation standards; supported external credentialing audits and recredentialing cycles",
        esText: "Realizó la gestión y verificación de archivos de credenciales para más de 50 proveedores incluyendo verificación de licencia, registro DEA, historial de negligencia y referencias de colegas; aseguró que los archivos permanecieran actuales según normas de acreditación",
        keywords: ["credentialing", "provider verification", "license verification", "DEA registration", "accreditation compliance"],
      },
      {
        id: "ca-6",
        text: "Maintained compliance tracking dashboard with metrics on billing audit results, training completion rates, incident trends, and vendor compliance status; presented quarterly reports to Compliance Committee highlighting risks and improvement trends",
        esText: "Mantuvo un panel de seguimiento de cumplimiento con métricas en resultados de auditoría de facturación, tasas de finalización de capacitación e incidentes; presentó reportes trimestrales al Comité de Cumplimiento destacando riesgos y tendencias de mejora",
        keywords: ["compliance dashboard", "metrics tracking", "reporting", "data analysis", "trend analysis"],
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
