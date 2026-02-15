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
  "Mandarin",
  "Cantonese",
  "Vietnamese",
  "Tagalog",
  "Korean",
  "Other",
] as const;
