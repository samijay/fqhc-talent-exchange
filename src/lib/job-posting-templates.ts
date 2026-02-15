/* ------------------------------------------------------------------ */
/*  Job Posting Builder — Templates, Benchmarks & Screening Criteria  */
/* ------------------------------------------------------------------ */

export interface PostingTemplate {
  roleId: string;
  label: string;
  esLabel: string;
  category: string;
  esCategory: string;
  summaryTemplate: string;
  esSummaryTemplate: string;
  responsibilities: string[];
  esResponsibilities: string[];
  qualifications: string[];
  esQualifications: string[];
  preferredSkills: string[];
  esPreferredSkills: string[];
  screeningQuestions: string[];
  esScreeningQuestions: string[];
}

export interface SalaryBenchmark {
  roleId: string;
  label: string;
  esLabel: string;
  p25: number;
  p50: number;
  p75: number;
}

export interface BenefitTemplate {
  id: string;
  text: string;
  esText: string;
}

/* ------------------------------------------------------------------ */
/*  Salary Benchmarks by Role (California FQHC market, 2025–2026)     */
/* ------------------------------------------------------------------ */

export const SALARY_BENCHMARKS: SalaryBenchmark[] = [
  { roleId: "chw", label: "Community Health Worker", esLabel: "Promotor/a de Salud", p25: 38000, p50: 45000, p75: 55000 },
  { roleId: "care_coordinator", label: "Care Coordinator", esLabel: "Coordinador/a de Atención", p25: 45000, p50: 55000, p75: 65000 },
  { roleId: "medical_assistant", label: "Medical Assistant", esLabel: "Asistente Médico/a", p25: 36000, p50: 42000, p75: 50000 },
  { roleId: "case_manager", label: "Case Manager", esLabel: "Administrador/a de Casos", p25: 50000, p50: 60000, p75: 72000 },
  { roleId: "behavioral_health", label: "Behavioral Health Specialist", esLabel: "Especialista en Salud Conductual", p25: 55000, p50: 68000, p75: 85000 },
  { roleId: "patient_navigator", label: "Patient Navigator", esLabel: "Navegador/a de Pacientes", p25: 40000, p50: 48000, p75: 58000 },
  { roleId: "health_educator", label: "Health Educator", esLabel: "Educador/a de Salud", p25: 42000, p50: 52000, p75: 62000 },
  { roleId: "enrollment_specialist", label: "Enrollment / Registration Specialist", esLabel: "Especialista de Inscripción / Registro", p25: 35000, p50: 42000, p75: 50000 },
  { roleId: "nurse_rn", label: "Registered Nurse (RN)", esLabel: "Enfermera Registrada (RN)", p25: 85000, p50: 105000, p75: 125000 },
  { roleId: "nurse_lvn", label: "Licensed Vocational Nurse (LVN)", esLabel: "Enfermera Vocacional (LVN)", p25: 52000, p50: 60000, p75: 70000 },
  { roleId: "social_worker", label: "Social Worker (LCSW/ASW)", esLabel: "Trabajador/a Social (LCSW/ASW)", p25: 58000, p50: 72000, p75: 88000 },
  { roleId: "dental_hygienist", label: "Dental Hygienist", esLabel: "Higienista Dental", p25: 75000, p50: 90000, p75: 110000 },
];

/* ------------------------------------------------------------------ */
/*  Standard FQHC Benefits                                             */
/* ------------------------------------------------------------------ */

export const STANDARD_BENEFITS: BenefitTemplate[] = [
  { id: "health", text: "Comprehensive health, dental, and vision insurance", esText: "Seguro médico, dental y de visión integral" },
  { id: "pto", text: "Generous PTO (vacation, sick, personal days)", esText: "PTO generoso (vacaciones, días de enfermedad, días personales)" },
  { id: "retirement", text: "403(b) or 401(k) retirement plan with employer match", esText: "Plan de jubilación 403(b) o 401(k) con contribución del empleador" },
  { id: "loan", text: "NHSC Loan Repayment Program eligibility", esText: "Elegibilidad para el Programa de Pago de Préstamos NHSC" },
  { id: "cme", text: "Continuing education & professional development stipend", esText: "Estipendio de educación continua y desarrollo profesional" },
  { id: "life", text: "Life insurance and disability coverage", esText: "Seguro de vida y cobertura por discapacidad" },
  { id: "eap", text: "Employee Assistance Program (EAP)", esText: "Programa de Asistencia al Empleado (EAP)" },
  { id: "schedule", text: "Flexible scheduling / 4-day work week option", esText: "Horario flexible / opción de semana laboral de 4 días" },
  { id: "mileage", text: "Mileage reimbursement for field-based work", esText: "Reembolso de millaje por trabajo en campo" },
  { id: "bilingual", text: "Bilingual pay differential", esText: "Diferencial de pago bilingüe" },
];

/* ------------------------------------------------------------------ */
/*  FQHC-Specific Screening Questions                                  */
/* ------------------------------------------------------------------ */

export const SCREENING_CATEGORIES = {
  coVisits: {
    label: "Co-Visits & Field Work",
    esLabel: "Co-visitas y Trabajo en Campo",
    questions: [
      { text: "Describe your experience conducting co-visits with providers in the field.", esText: "Describa su experiencia realizando co-visitas con proveedores en campo." },
      { text: "How many field-based patient visits do you conduct per week on average?", esText: "¿Cuántas visitas de campo a pacientes realiza por semana en promedio?" },
      { text: "What strategies do you use to engage hard-to-reach patients during home visits?", esText: "¿Qué estrategias usa para involucrar a pacientes difíciles de alcanzar durante visitas domiciliarias?" },
    ],
  },
  careManagement: {
    label: "Care Management Experience",
    esLabel: "Experiencia en Gestión de Atención",
    questions: [
      { text: "Describe your experience managing a caseload of ECM/CCM patients.", esText: "Describa su experiencia manejando una carga de pacientes ECM/CCM." },
      { text: "How do you prioritize patients in your caseload and track engagement?", esText: "¿Cómo prioriza los pacientes en su carga de trabajo y rastrea el compromiso?" },
      { text: "What tools or workflows do you use for care plan development?", esText: "¿Qué herramientas o flujos de trabajo utiliza para el desarrollo de planes de atención?" },
    ],
  },
  revenueRecovery: {
    label: "Revenue Recovery & Billing Acumen",
    esLabel: "Recuperación de Ingresos y Conocimiento de Facturación",
    questions: [
      { text: "Describe your experience with PPS or Medi-Cal billing in a community health setting.", esText: "Describa su experiencia con facturación PPS o Medi-Cal en un entorno de salud comunitaria." },
      { text: "How do you ensure accurate coding and documentation to maximize reimbursement?", esText: "¿Cómo asegura la codificación y documentación precisa para maximizar el reembolso?" },
      { text: "What role have you played in revenue cycle improvement at a clinic?", esText: "¿Qué papel ha desempeñado en la mejora del ciclo de ingresos en una clínica?" },
    ],
  },
  clinicOperations: {
    label: "Healthcare Community Clinic Business Acumen",
    esLabel: "Conocimiento de Negocio de Clínica de Salud Comunitaria",
    questions: [
      { text: "Describe your understanding of FQHC funding models (330 grants, Medi-Cal, sliding scale).", esText: "Describa su comprensión de los modelos de financiamiento FQHC (subvenciones 330, Medi-Cal, escala deslizante)." },
      { text: "What experience do you have with UDS reporting or quality improvement initiatives?", esText: "¿Qué experiencia tiene con reportes UDS o iniciativas de mejora de calidad?" },
      { text: "How have you contributed to patient access, no-show reduction, or panel management?", esText: "¿Cómo ha contribuido al acceso de pacientes, reducción de inasistencias o gestión de panel?" },
    ],
  },
  registration: {
    label: "Elite Registration / PSS Staff",
    esLabel: "Personal de Registro / PSS de Alto Nivel",
    questions: [
      { text: "Describe your experience with patient registration, insurance verification, and eligibility screening.", esText: "Describa su experiencia con registro de pacientes, verificación de seguro y evaluación de elegibilidad." },
      { text: "How do you handle Medi-Cal enrollment and benefits navigation for patients?", esText: "¿Cómo maneja la inscripción en Medi-Cal y navegación de beneficios para pacientes?" },
      { text: "What is your experience with sliding fee scale determination and financial counseling?", esText: "¿Cuál es su experiencia con determinación de escala deslizante y asesoría financiera?" },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Role Templates (Pre-written job posting content)                   */
/* ------------------------------------------------------------------ */

export const JOB_POSTING_TEMPLATES: PostingTemplate[] = [
  {
    roleId: "chw",
    label: "Community Health Worker / Promotor(a)",
    esLabel: "Promotor/a de Salud Comunitaria",
    category: "Outreach & Engagement",
    esCategory: "Alcance y Compromiso",
    summaryTemplate:
      "We are seeking a passionate Community Health Worker to join our team and provide culturally responsive outreach, health education, and care coordination to underserved communities. This role is critical to our mission of improving health equity through Enhanced Care Management (ECM) and community-based programs.",
    esSummaryTemplate:
      "Buscamos un/a Promotor/a de Salud Comunitaria apasionado/a para unirse a nuestro equipo y proporcionar alcance culturalmente receptivo, educación en salud y coordinación de atención a comunidades desatendidas. Este puesto es fundamental para nuestra misión de mejorar la equidad en salud a través del Manejo de Atención Mejorada (ECM) y programas comunitarios.",
    responsibilities: [
      "Conduct community outreach and engagement for ECM/CCM program members",
      "Perform SDOH screenings and connect patients to community resources (housing, food, transportation)",
      "Maintain and manage a caseload of patients with complex needs",
      "Conduct home visits and field-based outreach to high-risk populations",
      "Provide culturally and linguistically appropriate health education",
      "Document patient interactions in EHR system (e.g., OCHIN Epic, NextGen)",
      "Collaborate with multidisciplinary care team to coordinate whole-person care",
      "Assist patients with Medi-Cal enrollment and benefits navigation",
    ],
    esResponsibilities: [
      "Realizar alcance comunitario y compromiso para miembros de programas ECM/CCM",
      "Realizar evaluaciones de SDOH y conectar pacientes con recursos comunitarios (vivienda, alimentación, transporte)",
      "Mantener y gestionar una carga de pacientes con necesidades complejas",
      "Realizar visitas domiciliarias y alcance en campo a poblaciones de alto riesgo",
      "Proporcionar educación en salud culturalmente y lingüísticamente apropiada",
      "Documentar interacciones con pacientes en sistema EHR (ej. OCHIN Epic, NextGen)",
      "Colaborar con equipo de atención multidisciplinario para coordinar atención integral",
      "Asistir a pacientes con inscripción en Medi-Cal y navegación de beneficios",
    ],
    qualifications: [
      "High school diploma or GED required; associate's degree preferred",
      "1+ years of community health or outreach experience",
      "CHW certification (California) or ability to obtain within 6 months",
      "Bilingual English/Spanish strongly preferred",
      "Experience with SDOH screenings and social service referrals",
      "Valid driver's license and reliable transportation for field work",
      "BLS/CPR certification",
    ],
    esQualifications: [
      "Diploma de secundaria o GED requerido; título de asociado preferido",
      "1+ años de experiencia en salud comunitaria o alcance",
      "Certificación CHW (California) o capacidad de obtener dentro de 6 meses",
      "Bilingüe inglés/español fuertemente preferido",
      "Experiencia con evaluaciones SDOH y referidos a servicios sociales",
      "Licencia de conducir válida y transporte confiable para trabajo en campo",
      "Certificación BLS/CPR",
    ],
    preferredSkills: [
      "Experience with ECM/CCM or CalAIM programs",
      "Proficiency in OCHIN Epic or equivalent EHR system",
      "Motivational interviewing training",
      "Trauma-informed care experience",
      "Knowledge of local community resources and social services",
    ],
    esPreferredSkills: [
      "Experiencia con programas ECM/CCM o CalAIM",
      "Dominio de OCHIN Epic o sistema EHR equivalente",
      "Entrenamiento en entrevista motivacional",
      "Experiencia en atención informada por trauma",
      "Conocimiento de recursos comunitarios locales y servicios sociales",
    ],
    screeningQuestions: [
      "How many years of community health / outreach experience do you have?",
      "Describe your experience conducting home visits or co-visits with providers.",
      "Which EHR systems have you used? (OCHIN Epic, NextGen, etc.)",
      "Are you bilingual? If so, which languages?",
      "Do you have or are you willing to obtain a CHW certification?",
    ],
    esScreeningQuestions: [
      "¿Cuántos años de experiencia en salud comunitaria / alcance tiene?",
      "Describa su experiencia realizando visitas domiciliarias o co-visitas con proveedores.",
      "¿Qué sistemas EHR ha utilizado? (OCHIN Epic, NextGen, etc.)",
      "¿Es bilingüe? Si es así, ¿qué idiomas?",
      "¿Tiene o está dispuesto/a a obtener una certificación CHW?",
    ],
  },
  {
    roleId: "care_coordinator",
    label: "Care Coordinator",
    esLabel: "Coordinador/a de Atención",
    category: "Care Management",
    esCategory: "Gestión de Atención",
    summaryTemplate:
      "We are looking for an experienced Care Coordinator to manage patient care plans, track clinical quality measures, and coordinate across medical, behavioral health, and social service providers. This role is essential to our ECM/CCM program delivery and CalAIM compliance.",
    esSummaryTemplate:
      "Buscamos un/a Coordinador/a de Atención experimentado/a para gestionar planes de atención de pacientes, rastrear medidas de calidad clínica y coordinar entre proveedores médicos, de salud conductual y de servicios sociales. Este puesto es esencial para la entrega de nuestros programas ECM/CCM y cumplimiento con CalAIM.",
    responsibilities: [
      "Coordinate care for ECM/CCM patients including follow-up and engagement tracking",
      "Develop and maintain individualized care plans with providers and specialists",
      "Track and report on clinical quality measures (HEDIS, UDS)",
      "Manage care transitions and hospital discharge follow-up",
      "Facilitate referrals to Community Supports services",
      "Conduct motivational interviewing and patient engagement strategies",
      "Utilize EHR system for documentation and population health reporting",
    ],
    esResponsibilities: [
      "Coordinar atención para pacientes ECM/CCM incluyendo seguimiento y rastreo de compromiso",
      "Desarrollar y mantener planes de atención individualizados con proveedores y especialistas",
      "Rastrear y reportar sobre medidas de calidad clínica (HEDIS, UDS)",
      "Gestionar transiciones de atención y seguimiento post-alta hospitalaria",
      "Facilitar referidos a servicios de Apoyos Comunitarios",
      "Realizar entrevista motivacional y estrategias de compromiso del paciente",
      "Utilizar sistema EHR para documentación y reportes de salud poblacional",
    ],
    qualifications: [
      "Bachelor's degree in health-related field or equivalent experience",
      "2+ years of care coordination or case management experience",
      "Experience with Medi-Cal populations and CalAIM programs",
      "Proficiency in EHR documentation and reporting",
      "Strong organizational and communication skills",
      "BLS/CPR certification",
    ],
    esQualifications: [
      "Licenciatura en campo relacionado con salud o experiencia equivalente",
      "2+ años de experiencia en coordinación de atención o gestión de casos",
      "Experiencia con poblaciones de Medi-Cal y programas CalAIM",
      "Dominio en documentación y reportes de EHR",
      "Fuertes habilidades organizativas y de comunicación",
      "Certificación BLS/CPR",
    ],
    preferredSkills: [
      "ECM/CCM program management experience",
      "Motivational interviewing certification",
      "Bilingual English/Spanish",
      "Experience with OCHIN Epic or NextGen",
      "Knowledge of HEDIS and UDS quality measures",
    ],
    esPreferredSkills: [
      "Experiencia en gestión de programas ECM/CCM",
      "Certificación en entrevista motivacional",
      "Bilingüe inglés/español",
      "Experiencia con OCHIN Epic o NextGen",
      "Conocimiento de medidas de calidad HEDIS y UDS",
    ],
    screeningQuestions: [
      "How many years of care coordination experience do you have?",
      "Describe your experience with ECM/CCM or CalAIM programs.",
      "What care management or population health tools have you used?",
      "How do you track and improve engagement rates for your caseload?",
    ],
    esScreeningQuestions: [
      "¿Cuántos años de experiencia en coordinación de atención tiene?",
      "Describa su experiencia con programas ECM/CCM o CalAIM.",
      "¿Qué herramientas de gestión de atención o salud poblacional ha utilizado?",
      "¿Cómo rastrea y mejora las tasas de compromiso para su carga de pacientes?",
    ],
  },
  {
    roleId: "medical_assistant",
    label: "Medical Assistant",
    esLabel: "Asistente Médico/a",
    category: "Clinical Support",
    esCategory: "Apoyo Clínico",
    summaryTemplate:
      "We are hiring a Certified Medical Assistant to support clinical operations in our high-volume community health center. You will perform patient intake, clinical procedures, and EHR documentation while contributing to quality improvement and patient satisfaction goals.",
    esSummaryTemplate:
      "Estamos contratando un/a Asistente Médico/a Certificado/a para apoyar las operaciones clínicas en nuestro centro de salud comunitario de alto volumen. Realizará admisión de pacientes, procedimientos clínicos y documentación EHR mientras contribuye a objetivos de mejora de calidad y satisfacción del paciente.",
    responsibilities: [
      "Perform patient intake including vitals, medication reconciliation, and pre-visit planning",
      "Administer vaccinations, injections, and point-of-care testing per provider orders",
      "Manage provider schedules and maintain efficient patient flow",
      "Document clinical encounters and process referrals in EHR system",
      "Provide bilingual patient communication and translation services",
      "Assist with quality improvement initiatives (HEDIS, patient satisfaction)",
      "Maintain clinical supplies and ensure exam room readiness",
    ],
    esResponsibilities: [
      "Realizar admisión de pacientes incluyendo signos vitales, reconciliación de medicamentos y planificación pre-visita",
      "Administrar vacunas, inyecciones y pruebas de punto de atención según órdenes del proveedor",
      "Gestionar horarios de proveedores y mantener flujo eficiente de pacientes",
      "Documentar encuentros clínicos y procesar referidos en sistema EHR",
      "Proporcionar comunicación bilingüe con pacientes y servicios de traducción",
      "Asistir con iniciativas de mejora de calidad (HEDIS, satisfacción del paciente)",
      "Mantener suministros clínicos y asegurar preparación de salas de examen",
    ],
    qualifications: [
      "Certified Medical Assistant (CMA) or Registered Medical Assistant (RMA)",
      "1+ years of clinical experience in outpatient or community health setting",
      "Proficiency in EHR systems (OCHIN Epic, NextGen, or similar)",
      "BLS/CPR certification",
      "Bilingual English/Spanish preferred",
      "Phlebotomy certification a plus",
    ],
    esQualifications: [
      "Asistente Médico/a Certificado/a (CMA) o Registrado/a (RMA)",
      "1+ años de experiencia clínica en entorno ambulatorio o de salud comunitaria",
      "Dominio de sistemas EHR (OCHIN Epic, NextGen, o similar)",
      "Certificación BLS/CPR",
      "Bilingüe inglés/español preferido",
      "Certificación en flebotomía es un plus",
    ],
    preferredSkills: [
      "Experience in FQHC or community health center setting",
      "Knowledge of Medi-Cal billing and coding basics",
      "Vaccine administration experience (VFC program)",
      "Strong patient flow management skills",
    ],
    esPreferredSkills: [
      "Experiencia en entorno FQHC o centro de salud comunitario",
      "Conocimiento de fundamentos de facturación y codificación Medi-Cal",
      "Experiencia en administración de vacunas (programa VFC)",
      "Fuertes habilidades de gestión de flujo de pacientes",
    ],
    screeningQuestions: [
      "Are you a Certified Medical Assistant (CMA) or Registered Medical Assistant (RMA)?",
      "How many years of clinical MA experience do you have?",
      "Which EHR systems have you worked with?",
      "Are you comfortable with phlebotomy and point-of-care testing?",
    ],
    esScreeningQuestions: [
      "¿Es usted un/a Asistente Médico/a Certificado/a (CMA) o Registrado/a (RMA)?",
      "¿Cuántos años de experiencia clínica como MA tiene?",
      "¿Con qué sistemas EHR ha trabajado?",
      "¿Se siente cómodo/a con flebotomía y pruebas de punto de atención?",
    ],
  },
  {
    roleId: "case_manager",
    label: "Case Manager",
    esLabel: "Administrador/a de Casos",
    category: "Behavioral Health & Social Services",
    esCategory: "Salud Conductual y Servicios Sociales",
    summaryTemplate:
      "We are seeking an experienced Case Manager to coordinate complex care for patients with co-occurring behavioral health, substance use, and chronic medical conditions. This role supports our CalAIM program compliance and integrated care delivery model.",
    esSummaryTemplate:
      "Buscamos un/a Administrador/a de Casos experimentado/a para coordinar atención compleja para pacientes con condiciones concurrentes de salud conductual, uso de sustancias y condiciones médicas crónicas. Este puesto apoya el cumplimiento de nuestro programa CalAIM y modelo de entrega de atención integrada.",
    responsibilities: [
      "Manage complex caseload of patients with co-occurring conditions",
      "Conduct comprehensive biopsychosocial assessments",
      "Develop individualized treatment plans and track outcomes",
      "Coordinate across medical, behavioral health, and social service providers",
      "Support ECM enrollment, engagement, and CalAIM reporting requirements",
      "Advocate for patient access to housing, legal aid, and benefits",
      "Maintain compliance with Medi-Cal billing and HIPAA standards",
    ],
    esResponsibilities: [
      "Gestionar carga compleja de pacientes con condiciones concurrentes",
      "Realizar evaluaciones biopsicosociales integrales",
      "Desarrollar planes de tratamiento individualizados y rastrear resultados",
      "Coordinar entre proveedores médicos, de salud conductual y de servicios sociales",
      "Apoyar inscripción en ECM, compromiso y requisitos de reportes CalAIM",
      "Abogar por acceso de pacientes a vivienda, asistencia legal y beneficios",
      "Mantener cumplimiento con facturación Medi-Cal y estándares HIPAA",
    ],
    qualifications: [
      "Bachelor's degree in social work, psychology, or related field",
      "3+ years of case management experience in healthcare setting",
      "Experience with CalAIM, ECM, or similar care management programs",
      "Strong knowledge of community resources and referral networks",
      "Proficiency in EHR documentation and billing",
    ],
    esQualifications: [
      "Licenciatura en trabajo social, psicología o campo relacionado",
      "3+ años de experiencia en gestión de casos en entorno de salud",
      "Experiencia con CalAIM, ECM o programas similares de gestión de atención",
      "Fuerte conocimiento de recursos comunitarios y redes de referidos",
      "Dominio en documentación y facturación de EHR",
    ],
    preferredSkills: [
      "LCSW, ASW, or CCM certification",
      "Bilingual English/Spanish",
      "Motivational interviewing and trauma-informed care training",
      "Experience with housing navigation and social determinants of health",
    ],
    esPreferredSkills: [
      "Certificación LCSW, ASW o CCM",
      "Bilingüe inglés/español",
      "Entrenamiento en entrevista motivacional y atención informada por trauma",
      "Experiencia con navegación de vivienda y determinantes sociales de salud",
    ],
    screeningQuestions: [
      "How many years of case management experience do you have in a healthcare setting?",
      "Describe your experience with CalAIM or ECM programs.",
      "What is your approach to managing patients with co-occurring behavioral health and medical conditions?",
      "How do you track patient outcomes and engagement?",
    ],
    esScreeningQuestions: [
      "¿Cuántos años de experiencia en gestión de casos tiene en un entorno de salud?",
      "Describa su experiencia con programas CalAIM o ECM.",
      "¿Cuál es su enfoque para manejar pacientes con condiciones concurrentes de salud conductual y médicas?",
      "¿Cómo rastrea los resultados y compromiso de los pacientes?",
    ],
  },
  {
    roleId: "enrollment_specialist",
    label: "Enrollment / Registration Specialist (PSS)",
    esLabel: "Especialista de Inscripción / Registro (PSS)",
    category: "Patient Services & Administration",
    esCategory: "Servicios al Paciente y Administración",
    summaryTemplate:
      "We are seeking an elite Registration / Patient Services Specialist to be the first point of contact for patients at our FQHC. This role is critical to revenue recovery, patient access, and ensuring every patient receives the benefits they are entitled to. You will handle Medi-Cal enrollment, insurance verification, sliding fee scale determination, and financial counseling.",
    esSummaryTemplate:
      "Buscamos un/a Especialista de Registro / Servicios al Paciente de alto nivel para ser el primer punto de contacto para pacientes en nuestro FQHC. Este puesto es fundamental para la recuperación de ingresos, acceso de pacientes y asegurar que cada paciente reciba los beneficios a los que tiene derecho. Manejará inscripción en Medi-Cal, verificación de seguro, determinación de escala deslizante y asesoría financiera.",
    responsibilities: [
      "Register new patients and verify insurance eligibility in real-time",
      "Screen patients for Medi-Cal, Covered California, and other assistance programs",
      "Determine sliding fee scale eligibility and collect appropriate copays",
      "Process Medi-Cal enrollment and re-enrollment applications",
      "Verify and update patient demographics and insurance at each visit",
      "Provide financial counseling to uninsured or underinsured patients",
      "Manage referral authorizations and pre-certification processes",
      "Support revenue cycle by ensuring accurate front-end data capture",
    ],
    esResponsibilities: [
      "Registrar nuevos pacientes y verificar elegibilidad de seguro en tiempo real",
      "Evaluar pacientes para Medi-Cal, Covered California y otros programas de asistencia",
      "Determinar elegibilidad de escala deslizante y cobrar copagos apropiados",
      "Procesar solicitudes de inscripción y re-inscripción en Medi-Cal",
      "Verificar y actualizar datos demográficos y seguro del paciente en cada visita",
      "Proporcionar asesoría financiera a pacientes sin seguro o con seguro insuficiente",
      "Gestionar autorizaciones de referidos y procesos de pre-certificación",
      "Apoyar ciclo de ingresos asegurando captura precisa de datos en front-end",
    ],
    qualifications: [
      "2+ years of patient registration or front desk experience in healthcare",
      "Strong knowledge of Medi-Cal, Medicare, and commercial insurance verification",
      "Experience with sliding fee scale determination",
      "Proficiency in EHR/practice management systems",
      "Bilingual English/Spanish strongly preferred",
      "Excellent customer service and communication skills",
    ],
    esQualifications: [
      "2+ años de experiencia en registro de pacientes o recepción en salud",
      "Fuerte conocimiento de verificación de Medi-Cal, Medicare y seguros comerciales",
      "Experiencia con determinación de escala deslizante",
      "Dominio de sistemas EHR/gestión de práctica",
      "Bilingüe inglés/español fuertemente preferido",
      "Excelentes habilidades de servicio al cliente y comunicación",
    ],
    preferredSkills: [
      "Experience in FQHC or community health center setting",
      "Knowledge of 330 grant requirements and UDS reporting",
      "Certified Application Counselor (CAC) credential",
      "Revenue cycle or billing department experience",
      "Familiarity with Covered California enrollment processes",
    ],
    esPreferredSkills: [
      "Experiencia en entorno FQHC o centro de salud comunitario",
      "Conocimiento de requisitos de subvención 330 y reportes UDS",
      "Credencial de Consejero de Aplicación Certificado (CAC)",
      "Experiencia en departamento de ciclo de ingresos o facturación",
      "Familiaridad con procesos de inscripción de Covered California",
    ],
    screeningQuestions: [
      "How many years of patient registration experience do you have?",
      "Describe your experience with Medi-Cal enrollment and insurance verification.",
      "What is your experience with sliding fee scale determination?",
      "How do you handle patients who are uninsured or have coverage gaps?",
      "What practice management or EHR systems have you used for registration?",
    ],
    esScreeningQuestions: [
      "¿Cuántos años de experiencia en registro de pacientes tiene?",
      "Describa su experiencia con inscripción en Medi-Cal y verificación de seguro.",
      "¿Cuál es su experiencia con determinación de escala deslizante?",
      "¿Cómo maneja a pacientes sin seguro o con brechas de cobertura?",
      "¿Qué sistemas de gestión de práctica o EHR ha utilizado para registro?",
    ],
  },
  {
    roleId: "behavioral_health",
    label: "Behavioral Health Specialist",
    esLabel: "Especialista en Salud Conductual",
    category: "Behavioral Health",
    esCategory: "Salud Conductual",
    summaryTemplate:
      "We are seeking a licensed Behavioral Health Specialist to provide integrated behavioral health services within our primary care setting. This role focuses on trauma-informed care, crisis intervention, and supporting whole-person health for underserved populations including individuals with serious mental illness and substance use disorders.",
    esSummaryTemplate:
      "Buscamos un/a Especialista en Salud Conductual con licencia para proporcionar servicios integrados de salud conductual dentro de nuestro entorno de atención primaria. Este puesto se enfoca en atención informada por trauma, intervención en crisis y apoyo a la salud integral de poblaciones desatendidas incluyendo individuos con enfermedad mental grave y trastornos por uso de sustancias.",
    responsibilities: [
      "Provide individual and group therapy for depression, anxiety, PTSD, and substance use disorders",
      "Deliver integrated behavioral health services using warm handoff model",
      "Conduct crisis assessments and develop safety plans for high-risk patients",
      "Participate in BH-ASO program delivery and compliance reporting",
      "Provide culturally responsive, trauma-informed care to diverse populations",
      "Collaborate with primary care providers on integrated care plans",
      "Maintain clinical documentation meeting Medi-Cal billing and HIPAA standards",
    ],
    esResponsibilities: [
      "Proporcionar terapia individual y grupal para depresión, ansiedad, TEPT y trastornos por uso de sustancias",
      "Entregar servicios integrados de salud conductual usando modelo de transferencia cálida",
      "Realizar evaluaciones de crisis y desarrollar planes de seguridad para pacientes de alto riesgo",
      "Participar en entrega de programa BH-ASO y reportes de cumplimiento",
      "Proporcionar atención culturalmente receptiva e informada por trauma a poblaciones diversas",
      "Colaborar con proveedores de atención primaria en planes de atención integrada",
      "Mantener documentación clínica que cumple con estándares de facturación Medi-Cal y HIPAA",
    ],
    qualifications: [
      "LCSW, LMFT, LPCC, or PsyD with active California license",
      "2+ years of behavioral health experience in outpatient or community health setting",
      "Experience with integrated primary care / behavioral health models",
      "Crisis assessment and safety planning skills",
      "Knowledge of Medi-Cal billing for behavioral health services",
    ],
    esQualifications: [
      "LCSW, LMFT, LPCC o PsyD con licencia activa de California",
      "2+ años de experiencia en salud conductual en entorno ambulatorio o de salud comunitaria",
      "Experiencia con modelos integrados de atención primaria / salud conductual",
      "Habilidades de evaluación de crisis y planificación de seguridad",
      "Conocimiento de facturación Medi-Cal para servicios de salud conductual",
    ],
    preferredSkills: [
      "Bilingual English/Spanish",
      "Experience with BH-ASO programs",
      "Trauma-informed care and motivational interviewing certifications",
      "Experience with SMI and SUD populations",
      "Knowledge of CalAIM behavioral health initiatives",
    ],
    esPreferredSkills: [
      "Bilingüe inglés/español",
      "Experiencia con programas BH-ASO",
      "Certificaciones en atención informada por trauma y entrevista motivacional",
      "Experiencia con poblaciones SMI y SUD",
      "Conocimiento de iniciativas de salud conductual CalAIM",
    ],
    screeningQuestions: [
      "What is your current California license type and status?",
      "Describe your experience providing integrated behavioral health in a primary care setting.",
      "How do you approach crisis assessment and safety planning?",
      "What is your experience with Medi-Cal billing for BH services?",
    ],
    esScreeningQuestions: [
      "¿Cuál es su tipo de licencia de California actual y su estado?",
      "Describa su experiencia proporcionando salud conductual integrada en un entorno de atención primaria.",
      "¿Cómo aborda la evaluación de crisis y planificación de seguridad?",
      "¿Cuál es su experiencia con facturación Medi-Cal para servicios de salud conductual?",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Helper: Get salary benchmark for a role                            */
/* ------------------------------------------------------------------ */

export function getSalaryBenchmark(roleId: string): SalaryBenchmark | undefined {
  return SALARY_BENCHMARKS.find((b) => b.roleId === roleId);
}

export function formatSalary(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getSalaryCompetitiveness(
  offered: number,
  benchmark: SalaryBenchmark,
): { level: "below" | "competitive" | "strong" | "premium"; percentile: string; esPercentile: string } {
  if (offered < benchmark.p25) {
    return { level: "below", percentile: "Below 25th percentile", esPercentile: "Por debajo del percentil 25" };
  }
  if (offered < benchmark.p50) {
    return { level: "competitive", percentile: "25th–50th percentile", esPercentile: "Percentil 25–50" };
  }
  if (offered < benchmark.p75) {
    return { level: "strong", percentile: "50th–75th percentile", esPercentile: "Percentil 50–75" };
  }
  return { level: "premium", percentile: "Above 75th percentile", esPercentile: "Por encima del percentil 75" };
}
