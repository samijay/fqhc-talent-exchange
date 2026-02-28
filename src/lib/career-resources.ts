// career-resources.ts
// Free and best-value career development resources for FQHC workers in California
// Every resource has a primary source URL — no unsourced claims
// Last updated: 2026-02-25

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ResourceCategory =
  | "loan-repayment"
  | "free-training"
  | "professional-development"
  | "union-education"
  | "state-workforce";

export type CostTier = "free" | "low" | "varies";

export interface CareerResource {
  id: string;
  name: { en: string; es: string };
  description: { en: string; es: string };
  category: ResourceCategory;
  cost: CostTier;
  costDetail: { en: string; es: string };
  url: string; // Primary source URL — clickable
  sourceOrg: string;
  eligibility: { en: string; es: string };
  deadline?: string; // ISO date
  deadlineNote?: { en: string; es: string };
  awardAmount?: string;
  tags: string[]; // Role IDs: chw, care-coordinator, rn, behavioral-health, etc.
  isFeatured: boolean;
}

/* ------------------------------------------------------------------ */
/*  Categories                                                         */
/* ------------------------------------------------------------------ */

export const RESOURCE_CATEGORIES: {
  id: ResourceCategory;
  en: string;
  es: string;
  icon: string;
}[] = [
  {
    id: "loan-repayment",
    en: "Loan Repayment Programs",
    es: "Programas de Reembolso de Préstamos",
    icon: "DollarSign",
  },
  {
    id: "free-training",
    en: "Free Training Programs",
    es: "Programas de Capacitación Gratuita",
    icon: "GraduationCap",
  },
  {
    id: "professional-development",
    en: "Professional Development",
    es: "Desarrollo Profesional",
    icon: "BookOpen",
  },
  {
    id: "union-education",
    en: "Union Education Funds",
    es: "Fondos Educativos Sindicales",
    icon: "Users",
  },
  {
    id: "state-workforce",
    en: "State Workforce Programs",
    es: "Programas Estatales de Fuerza Laboral",
    icon: "Building2",
  },
];

/* ------------------------------------------------------------------ */
/*  Resources                                                          */
/* ------------------------------------------------------------------ */

export const CAREER_RESOURCES: CareerResource[] = [
  // ── Loan Repayment Programs ──────────────────────────────────────────

  {
    id: "nhsc-lrp",
    name: {
      en: "NHSC Loan Repayment Program",
      es: "Programa de Reembolso de Préstamos NHSC",
    },
    description: {
      en: "The National Health Service Corps pays up to $80,000 toward your student loans in exchange for a 2-year full-time commitment at an NHSC-approved site. Most FQHCs in California qualify. Covers clinicians, behavioral health providers, and dental professionals working in Health Professional Shortage Areas (HPSAs).",
      es: "El Cuerpo Nacional de Servicio de Salud paga hasta $80,000 de tus préstamos estudiantiles a cambio de un compromiso de 2 años a tiempo completo en un sitio aprobado por NHSC. La mayoría de los FQHCs en California califican. Cubre clínicos, proveedores de salud conductual y profesionales dentales en Áreas de Escasez de Profesionales de Salud (HPSAs).",
    },
    category: "loan-repayment",
    cost: "free",
    costDetail: { en: "Free to apply", es: "Solicitud gratuita" },
    url: "https://nhsc.hrsa.gov/loan-repayment",
    sourceOrg: "HRSA",
    eligibility: {
      en: "Licensed primary care providers (MD, DO, NP, PA, CNM), behavioral health providers (LCSW, psychologists, LPCs, LMFTs), and dental providers at NHSC-approved sites with qualifying student loan debt.",
      es: "Proveedores de atención primaria licenciados (MD, DO, NP, PA, CNM), proveedores de salud conductual (LCSW, psicólogos, LPCs, LMFTs) y proveedores dentales en sitios aprobados por NHSC con deuda estudiantil calificada.",
    },
    deadline: "2026-03-31",
    deadlineNote: {
      en: "2026 application closes March 31, 2026 at 7:30 PM ET",
      es: "La solicitud 2026 cierra el 31 de marzo de 2026 a las 7:30 PM ET",
    },
    awardAmount: "Up to $80,000",
    tags: ["rn", "behavioral-health", "medical-assistant", "social-worker"],
    isFeatured: true,
  },

  {
    id: "ca-slrp",
    name: {
      en: "California State Loan Repayment Program (SLRP)",
      es: "Programa Estatal de Reembolso de Préstamos de California (SLRP)",
    },
    description: {
      en: "California's own loan repayment program provides up to $50,000 for health professionals who commit to serving in Health Professional Shortage Areas (HPSAs) or at FQHCs for 2 or 4 years. Administered by the Department of Health Care Access and Information (HCAI).",
      es: "El programa de reembolso de préstamos propio de California proporciona hasta $50,000 para profesionales de salud que se comprometan a servir en Áreas de Escasez de Profesionales de Salud (HPSAs) o en FQHCs por 2 o 4 años. Administrado por el Departamento de Acceso e Información de Atención Médica (HCAI).",
    },
    category: "loan-repayment",
    cost: "free",
    costDetail: { en: "Free to apply", es: "Solicitud gratuita" },
    url: "https://hcai.ca.gov/workforce/financial-assistance/loan-repayment/slrp/",
    sourceOrg: "CA HCAI",
    eligibility: {
      en: "Physicians, dentists, dental hygienists, PAs, NPs, CNMs, pharmacists, and mental/behavioral health providers working at California HPSA sites or FQHCs.",
      es: "Médicos, dentistas, higienistas dentales, PAs, NPs, CNMs, farmacéuticos y proveedores de salud mental/conductual trabajando en sitios HPSA de California o FQHCs.",
    },
    awardAmount: "Up to $50,000",
    tags: ["rn", "behavioral-health", "medical-assistant"],
    isFeatured: false,
  },

  {
    id: "mbh-slrp",
    name: {
      en: "Medi-Cal Behavioral Health Student Loan Repayment (MBH-SLRP)",
      es: "Reembolso de Préstamos Estudiantiles de Salud Conductual de Medi-Cal (MBH-SLRP)",
    },
    description: {
      en: "One of the most generous programs available — up to $120,000 for non-licensed workers (CHWs, peer specialists, SUD counselors, wellness coaches) and up to $240,000 for licensed prescribing practitioners. Requires 2-4 year service commitment in a Medi-Cal behavioral health setting.",
      es: "Uno de los programas más generosos disponibles — hasta $120,000 para trabajadores no licenciados (CHWs, especialistas pares, consejeros de SUD, coaches de bienestar) y hasta $240,000 para profesionales licenciados con prescripción. Requiere compromiso de servicio de 2-4 años en un entorno de salud conductual de Medi-Cal.",
    },
    category: "loan-repayment",
    cost: "free",
    costDetail: { en: "Free to apply", es: "Solicitud gratuita" },
    url: "https://hcai.ca.gov/workforce/initiatives/behavioral-health-bh-connect/mbhslrp/",
    sourceOrg: "CA HCAI",
    eligibility: {
      en: "CHWs, peer support specialists, SUD counselors, wellness coaches ($120K), licensed non-prescribing practitioners ($180K), and licensed prescribing practitioners ($240K) serving Medi-Cal beneficiaries.",
      es: "CHWs, especialistas de apoyo entre pares, consejeros de SUD, coaches de bienestar ($120K), profesionales licenciados no prescriptores ($180K) y profesionales licenciados prescriptores ($240K) sirviendo a beneficiarios de Medi-Cal.",
    },
    awardAmount: "Up to $120,000 (CHW) / $240,000 (licensed)",
    tags: ["chw", "behavioral-health", "care-coordinator", "social-worker"],
    isFeatured: true,
  },

  {
    id: "calhealthcares",
    name: {
      en: "CalHealthCares Physician Loan Repayment",
      es: "Reembolso de Préstamos para Médicos CalHealthCares",
    },
    description: {
      en: "Up to $300,000 in loan repayment for physicians who commit to 5 years of service to Medi-Cal beneficiaries. One of the largest loan repayment programs in the country, specifically designed for doctors serving California's safety-net patients.",
      es: "Hasta $300,000 en reembolso de préstamos para médicos que se comprometan a 5 años de servicio a beneficiarios de Medi-Cal. Uno de los programas de reembolso de préstamos más grandes del país, diseñado específicamente para médicos que sirven a pacientes de la red de seguridad de California.",
    },
    category: "loan-repayment",
    cost: "free",
    costDetail: { en: "Free to apply", es: "Solicitud gratuita" },
    url: "https://www.phcdocs.org/programs/calhealthcares",
    sourceOrg: "Physicians for Healthy California",
    eligibility: {
      en: "Licensed physicians (MD/DO) who commit to treating Medi-Cal patients for 5 years at qualifying sites in California.",
      es: "Médicos licenciados (MD/DO) que se comprometan a tratar pacientes de Medi-Cal por 5 años en sitios calificados en California.",
    },
    awardAmount: "Up to $300,000",
    tags: [],
    isFeatured: false,
  },

  // ── Free Training Programs ───────────────────────────────────────────

  {
    id: "calbright-chw",
    name: {
      en: "Calbright College CHW Certificate",
      es: "Certificado CHW de Calbright College",
    },
    description: {
      en: "Completely free, 10-12 month online Community Health Worker certificate program. Includes 2 internships and hands-on skills development. Partnership with SEIU-UHW and AlliedUP Co-op. Average starting salary for graduates: $57,000. California's only tuition-free online CHW program.",
      es: "Programa de certificado de Promotor(a) de Salud Comunitaria completamente gratis, de 10-12 meses en línea. Incluye 2 pasantías y desarrollo de habilidades prácticas. Asociación con SEIU-UHW y AlliedUP Co-op. Salario inicial promedio para graduados: $57,000. El único programa CHW en línea sin matrícula de California.",
    },
    category: "free-training",
    cost: "free",
    costDetail: {
      en: "100% free for California residents",
      es: "100% gratis para residentes de California",
    },
    url: "https://www.calbright.edu/community-health-worker-seiu",
    sourceOrg: "Calbright College",
    eligibility: {
      en: "California residents. No prior healthcare experience required. Self-paced online format. Must complete 2 internships.",
      es: "Residentes de California. No se requiere experiencia previa en salud. Formato en línea a tu propio ritmo. Debe completar 2 pasantías.",
    },
    awardAmount: "Free tuition + internships",
    tags: ["chw", "care-coordinator"],
    isFeatured: true,
  },

  {
    id: "phi-chw-training",
    name: {
      en: "Public Health Institute CHW Training",
      es: "Capacitación CHW del Instituto de Salud Pública",
    },
    description: {
      en: "Free 3-session introductory training series for Community Health Workers covering care navigation, holistic care, and advance care planning. Available online and in-person across 4 California regions. Includes up to $2,750 in incentives plus personal coaching.",
      es: "Serie de capacitación introductoria gratuita de 3 sesiones para Promotores de Salud Comunitaria que cubre navegación de cuidado, cuidado holístico y planificación anticipada de cuidado. Disponible en línea y presencial en 4 regiones de California. Incluye hasta $2,750 en incentivos más coaching personal.",
    },
    category: "free-training",
    cost: "free",
    costDetail: {
      en: "Free + up to $2,750 in incentives",
      es: "Gratis + hasta $2,750 en incentivos",
    },
    url: "https://www.phi.org/press/free-california-based-introductory-training-series-community-health-workers-care-navigation-more/",
    sourceOrg: "Public Health Institute",
    eligibility: {
      en: "Community Health Workers and care navigators in Bay Area, LA, San Mateo/Santa Clara, or Central California. Online option also available.",
      es: "Promotores de Salud Comunitaria y navegadores de cuidado en Bay Area, LA, San Mateo/Santa Clara o California Central. Opción en línea también disponible.",
    },
    awardAmount: "Free + $2,750 incentives",
    tags: ["chw", "care-coordinator"],
    isFeatured: false,
  },

  {
    id: "partners-in-care-chw",
    name: {
      en: "Partners in Care Foundation CHW Training",
      es: "Capacitación CHW de Partners in Care Foundation",
    },
    description: {
      en: "Free workforce development training program for Community Health Workers in the Los Angeles area. Offers both in-person training and an online CHW training option. Focused on practical skills for community-based health work.",
      es: "Programa de capacitación gratuito para el desarrollo de la fuerza laboral de Promotores de Salud Comunitaria en el área de Los Ángeles. Ofrece capacitación presencial y una opción de capacitación CHW en línea. Enfocado en habilidades prácticas para trabajo de salud comunitaria.",
    },
    category: "free-training",
    cost: "free",
    costDetail: {
      en: "Free workforce development training",
      es: "Capacitación gratuita de desarrollo laboral",
    },
    url: "https://www.picf.org/partners-in-action/lavc-chw-training/",
    sourceOrg: "Partners in Care Foundation",
    eligibility: {
      en: "Anyone interested in becoming a CHW. In-person training in the LA area. Online option also available.",
      es: "Cualquier persona interesada en convertirse en CHW. Capacitación presencial en el área de LA. Opción en línea también disponible.",
    },
    tags: ["chw"],
    isFeatured: false,
  },

  {
    id: "mt-sac-lvn",
    name: {
      en: "Mt. SAC Tuition-Free LVN Program",
      es: "Programa LVN sin Matrícula de Mt. SAC",
    },
    description: {
      en: "California's only tuition-free Vocational Nursing (LVN) program. Up to 13 months (1,530 hours of theory and clinical instruction). Prepares you for the California state licensing exam. Offered through the School of Continuing Education at Mt. San Antonio College.",
      es: "El único programa de Enfermería Vocacional (LVN) sin matrícula de California. Hasta 13 meses (1,530 horas de teoría e instrucción clínica). Te prepara para el examen de licencia estatal de California. Ofrecido a través de la Escuela de Educación Continua en Mt. San Antonio College.",
    },
    category: "free-training",
    cost: "free",
    costDetail: {
      en: "Tuition-free (CA's only free LVN program)",
      es: "Sin matrícula (el único programa LVN gratis de CA)",
    },
    url: "https://www.mtsac.edu/newsroom/news/posts/2025-10-15-free-lvn-program.html",
    sourceOrg: "Mt. San Antonio College",
    eligibility: {
      en: "Open enrollment through School of Continuing Education. Must complete prerequisites. Program is 13 months full-time.",
      es: "Inscripción abierta a través de la Escuela de Educación Continua. Debe completar prerequisitos. El programa es de 13 meses a tiempo completo.",
    },
    awardAmount: "Free tuition (13-month program)",
    tags: ["rn"],
    isFeatured: true,
  },

  {
    id: "aces-aware",
    name: {
      en: "ACEs Aware Training",
      es: "Capacitación ACEs Aware",
    },
    description: {
      en: "Free California-specific training on screening for Adverse Childhood Experiences (ACEs) and providing trauma-informed care. Funded by the state of California. Completion qualifies Medi-Cal providers for ACE screening reimbursement ($29 per screening).",
      es: "Capacitación gratuita específica de California sobre detección de Experiencias Adversas en la Infancia (ACEs) y atención informada por trauma. Financiada por el estado de California. La finalización califica a los proveedores de Medi-Cal para reembolso de detección de ACE ($29 por detección).",
    },
    category: "free-training",
    cost: "free",
    costDetail: {
      en: "Free (state-funded)",
      es: "Gratis (financiado por el estado)",
    },
    url: "https://www.acesaware.org",
    sourceOrg: "ACEs Aware / CA DHCS",
    eligibility: {
      en: "All healthcare providers and staff. Particularly valuable for CHWs, care coordinators, behavioral health staff, and nurses working with trauma-affected populations.",
      es: "Todos los proveedores y personal de salud. Particularmente valioso para CHWs, coordinadores de cuidado, personal de salud conductual y enfermeras trabajando con poblaciones afectadas por trauma.",
    },
    tags: [
      "chw",
      "care-coordinator",
      "behavioral-health",
      "rn",
      "medical-assistant",
    ],
    isFeatured: false,
  },

  // ── Professional Development ─────────────────────────────────────────

  {
    id: "nachc-training",
    name: {
      en: "NACHC Training & Technical Assistance",
      es: "Capacitación y Asistencia Técnica de NACHC",
    },
    description: {
      en: "National Association of Community Health Centers offers leadership exchanges, supervision e-learning, coding webinar series, and billing/collections communities of practice. The 2026 Leadership Exchange runs April–September. Calm in Crisis de-escalation training available March 2026.",
      es: "La Asociación Nacional de Centros de Salud Comunitarios ofrece intercambios de liderazgo, e-learning de supervisión, series de webinarios de codificación y comunidades de práctica de facturación/cobros. El Intercambio de Liderazgo 2026 se realiza de abril a septiembre. Capacitación de desescalada Calm in Crisis disponible en marzo 2026.",
    },
    category: "professional-development",
    cost: "varies",
    costDetail: {
      en: "Free webinars; some programs have fees",
      es: "Webinarios gratuitos; algunos programas tienen tarifas",
    },
    url: "https://www.nachc.org/training-events/training-for-health-center-professionals/",
    sourceOrg: "NACHC",
    eligibility: {
      en: "Health center professionals at all levels. Some programs are role-specific (clinical executives, billing staff, supervisors).",
      es: "Profesionales de centros de salud en todos los niveles. Algunos programas son específicos de rol (ejecutivos clínicos, personal de facturación, supervisores).",
    },
    tags: [
      "chw",
      "care-coordinator",
      "rn",
      "revenue-cycle",
      "patient-services",
    ],
    isFeatured: false,
  },

  {
    id: "cpca-workforce",
    name: {
      en: "CPCA Strategic Workforce Planning Program",
      es: "Programa de Planificación Estratégica de Fuerza Laboral de CPCA",
    },
    description: {
      en: "The California Primary Care Association now offers its Strategic Workforce Planning Program at NO COST — previously required a fee. Multi-month program with bite-sized sessions covering workforce planning, retention strategies, and leadership development. Also offers MedicalAssist+ (MA+), a 6-month virtual training and retention program for Medical Assistants.",
      es: "La Asociación de Atención Primaria de California ahora ofrece su Programa de Planificación Estratégica de Fuerza Laboral SIN COSTO — anteriormente requería una tarifa. Programa de varios meses con sesiones breves que cubren planificación de fuerza laboral, estrategias de retención y desarrollo de liderazgo. También ofrece MedicalAssist+ (MA+), un programa virtual de capacitación y retención de 6 meses para Asistentes Médicos.",
    },
    category: "professional-development",
    cost: "free",
    costDetail: {
      en: "Now offered at no cost (previously paid)",
      es: "Ahora ofrecido sin costo (anteriormente pagado)",
    },
    url: "https://www.cpca.org/CPCA/HEALTH_CENTER_RESOURCES/Workforce/",
    sourceOrg: "CPCA",
    eligibility: {
      en: "California FQHC and community health center staff and leadership. MA+ program specifically for Medical Assistants.",
      es: "Personal y liderazgo de FQHCs y centros de salud comunitarios de California. Programa MA+ específicamente para Asistentes Médicos.",
    },
    tags: ["medical-assistant", "care-coordinator", "chw"],
    isFeatured: true,
  },

  {
    id: "caphtc",
    name: {
      en: "California Public Health Training Center",
      es: "Centro de Capacitación de Salud Pública de California",
    },
    description: {
      en: "HRSA-funded training center providing free technical assistance and workforce development resources for public health professionals in California. Part of the Western Region consortium covering CA, Arizona, Nevada, Hawaii, and Pacific Islands.",
      es: "Centro de capacitación financiado por HRSA que proporciona asistencia técnica gratuita y recursos de desarrollo de fuerza laboral para profesionales de salud pública en California. Parte del consorcio de la Región Occidental que cubre CA, Arizona, Nevada, Hawai e Islas del Pacífico.",
    },
    category: "professional-development",
    cost: "free",
    costDetail: {
      en: "Free (HRSA-funded)",
      es: "Gratis (financiado por HRSA)",
    },
    url: "https://cal-ahec.org/california-public-health-training-center/",
    sourceOrg: "CA AHEC / HRSA",
    eligibility: {
      en: "Public health professionals and community health workers in California. Free technical assistance available for workforce development.",
      es: "Profesionales de salud pública y promotores de salud comunitaria en California. Asistencia técnica gratuita disponible para desarrollo de fuerza laboral.",
    },
    tags: ["chw", "care-coordinator", "rn"],
    isFeatured: false,
  },

  {
    id: "samhsa-courses",
    name: {
      en: "SAMHSA Free Online Courses",
      es: "Cursos Gratuitos en Línea de SAMHSA",
    },
    description: {
      en: "The Substance Abuse and Mental Health Services Administration offers free online training in behavioral health, substance use disorder treatment, trauma-informed care, and crisis intervention. Self-paced courses available to all healthcare workers.",
      es: "La Administración de Servicios de Salud Mental y Abuso de Sustancias ofrece capacitación gratuita en línea en salud conductual, tratamiento de trastornos por uso de sustancias, cuidado informado por trauma e intervención en crisis. Cursos a tu propio ritmo disponibles para todos los trabajadores de salud.",
    },
    category: "professional-development",
    cost: "free",
    costDetail: {
      en: "Free (federally funded)",
      es: "Gratis (financiado federalmente)",
    },
    url: "https://www.samhsa.gov/find-help",
    sourceOrg: "SAMHSA",
    eligibility: {
      en: "Open to all healthcare workers. Particularly relevant for behavioral health staff, CHWs, care coordinators, and anyone working with SUD populations.",
      es: "Abierto a todos los trabajadores de salud. Particularmente relevante para personal de salud conductual, CHWs, coordinadores de cuidado y cualquiera que trabaje con poblaciones de SUD.",
    },
    tags: ["behavioral-health", "chw", "care-coordinator", "social-worker"],
    isFeatured: false,
  },

  // ── Union Education Funds ────────────────────────────────────────────

  {
    id: "seiu-education-fund",
    name: {
      en: "SEIU Healthcare Education Fund",
      es: "Fondo Educativo de Salud de SEIU",
    },
    description: {
      en: "If you're an SEIU member, your union's education fund covers up to $5,250 in tuition reimbursement for general education, prerequisites, certificates, and degrees. Plus up to $10,000 in wage replacement for income lost during training. Fully funded career pathway programs, career counseling, and skill development — all at no cost to eligible members.",
      es: "Si eres miembro de SEIU, el fondo educativo de tu sindicato cubre hasta $5,250 en reembolso de matrícula para educación general, prerequisitos, certificados y títulos. Más hasta $10,000 en reemplazo salarial por ingresos perdidos durante la capacitación. Programas de carrera completamente financiados, asesoría profesional y desarrollo de habilidades — todo sin costo para miembros elegibles.",
    },
    category: "union-education",
    cost: "free",
    costDetail: {
      en: "Free for eligible SEIU members",
      es: "Gratis para miembros elegibles de SEIU",
    },
    url: "https://healthcareerfund.org/",
    sourceOrg: "SEIU Healthcare Education Fund",
    eligibility: {
      en: "SEIU union members (including SEIU-UHW, Local 1199, Local 49). Funded by employer contributions. Must be employed at a participating employer.",
      es: "Miembros del sindicato SEIU (incluyendo SEIU-UHW, Local 1199, Local 49). Financiado por contribuciones del empleador. Debe estar empleado en un empleador participante.",
    },
    awardAmount: "$5,250 tuition + $10,000 wage replacement",
    tags: [
      "chw",
      "care-coordinator",
      "medical-assistant",
      "rn",
      "patient-services",
    ],
    isFeatured: true,
  },

  {
    id: "nuhw-professional-dev",
    name: {
      en: "NUHW Professional Development Fund",
      es: "Fondo de Desarrollo Profesional de NUHW",
    },
    description: {
      en: "National Union of Healthcare Workers provides $2,000 every three years for professional supplies, books, training materials, and continuing education. Additional in-person and online trainings in healthcare reform, communication strategies, and union steward development.",
      es: "El Sindicato Nacional de Trabajadores de Salud proporciona $2,000 cada tres años para suministros profesionales, libros, materiales de capacitación y educación continua. Capacitaciones adicionales presenciales y en línea en reforma de salud, estrategias de comunicación y desarrollo de delegados sindicales.",
    },
    category: "union-education",
    cost: "free",
    costDetail: {
      en: "Free for NUHW members",
      es: "Gratis para miembros de NUHW",
    },
    url: "https://home.nuhw.org/members/education-and-training/continuing-education/",
    sourceOrg: "NUHW",
    eligibility: {
      en: "NUHW union members. $2,000 issued every three years. Specific benefits may vary by local and employer agreement.",
      es: "Miembros del sindicato NUHW. $2,000 emitidos cada tres años. Los beneficios específicos pueden variar según el local y el acuerdo del empleador.",
    },
    awardAmount: "$2,000 every 3 years",
    tags: ["behavioral-health", "rn", "care-coordinator"],
    isFeatured: false,
  },

  // ── State Workforce Programs ─────────────────────────────────────────

  {
    id: "etp",
    name: {
      en: "Employment Training Panel (ETP)",
      es: "Panel de Capacitación para el Empleo (ETP)",
    },
    description: {
      en: "California's Employment Training Panel funds employer-customized training for workers in key industries including nursing and allied healthcare. Pay-for-performance contracts — training is free to the employee. FQHCs, community health centers, and rural hospitals are eligible employers.",
      es: "El Panel de Capacitación para el Empleo de California financia capacitación personalizada por el empleador para trabajadores en industrias clave incluyendo enfermería y salud aliada. Contratos de pago por rendimiento — la capacitación es gratuita para el empleado. Los FQHCs, centros de salud comunitarios y hospitales rurales son empleadores elegibles.",
    },
    category: "state-workforce",
    cost: "free",
    costDetail: {
      en: "Free for employees (employer-funded contracts)",
      es: "Gratis para empleados (contratos financiados por el empleador)",
    },
    url: "https://etp.ca.gov/",
    sourceOrg: "CA Employment Training Panel",
    eligibility: {
      en: "Employees at eligible California employers including FQHCs, community health centers, and healthcare organizations. Your employer must apply for an ETP contract.",
      es: "Empleados en empleadores elegibles de California incluyendo FQHCs, centros de salud comunitarios y organizaciones de salud. Tu empleador debe solicitar un contrato ETP.",
    },
    tags: ["rn", "medical-assistant", "care-coordinator", "chw"],
    isFeatured: false,
  },

  {
    id: "calworks",
    name: {
      en: "CalWORKs Welfare-to-Work Program",
      es: "Programa de Bienestar al Trabajo CalWORKs",
    },
    description: {
      en: "CalWORKs covers the cost of approved education and training programs that lead to specific jobs, including healthcare careers. Services include work study, job placement, childcare assistance, skills training, and curriculum development. Contact your local county welfare department to enroll.",
      es: "CalWORKs cubre el costo de programas de educación y capacitación aprobados que conducen a trabajos específicos, incluyendo carreras en salud. Los servicios incluyen estudio-trabajo, colocación laboral, asistencia de cuidado infantil, capacitación de habilidades y desarrollo curricular. Contacta a tu departamento de bienestar del condado local para inscribirte.",
    },
    category: "state-workforce",
    cost: "free",
    costDetail: {
      en: "Free (covers approved training costs)",
      es: "Gratis (cubre costos de capacitación aprobada)",
    },
    url: "https://ehsd.org/benefits/calworks-welfare-to-work-program/",
    sourceOrg: "CA CalWORKs",
    eligibility: {
      en: "CalWORKs recipients seeking career advancement. Must be enrolled in CalWORKs and approved for education/training by your county case worker.",
      es: "Beneficiarios de CalWORKs buscando avance profesional. Debe estar inscrito en CalWORKs y aprobado para educación/capacitación por su trabajador de caso del condado.",
    },
    tags: ["chw", "medical-assistant", "patient-services"],
    isFeatured: false,
  },

  {
    id: "calaim-ecm-training",
    name: {
      en: "CalAIM Enhanced Care Management Training",
      es: "Capacitación de Gestión de Cuidado Mejorado CalAIM",
    },
    description: {
      en: "Free training resources for CalAIM Enhanced Care Management (ECM) Lead Care Managers and care coordination staff. Provided through managed care plans and regional alliances (Central California Alliance, HPSM, Health Net, Molina). Covers ECM workflows, documentation requirements, and care team coordination.",
      es: "Recursos de capacitación gratuitos para Gerentes de Cuidado Principal de Gestión de Cuidado Mejorado (ECM) CalAIM y personal de coordinación de cuidado. Proporcionados a través de planes de cuidado administrado y alianzas regionales (Central California Alliance, HPSM, Health Net, Molina). Cubre flujos de trabajo de ECM, requisitos de documentación y coordinación de equipos de cuidado.",
    },
    category: "state-workforce",
    cost: "free",
    costDetail: {
      en: "Free (through managed care plans)",
      es: "Gratis (a través de planes de cuidado administrado)",
    },
    url: "https://www.dhcs.ca.gov/CalAIM/ECM/Pages/Home.aspx",
    sourceOrg: "CA DHCS",
    eligibility: {
      en: "ECM Lead Care Managers, care coordinators, and staff at FQHCs and community health centers participating in CalAIM ECM programs.",
      es: "Gerentes de Cuidado Principal de ECM, coordinadores de cuidado y personal en FQHCs y centros de salud comunitarios participando en programas ECM de CalAIM.",
    },
    tags: ["care-coordinator", "chw", "case-manager"],
    isFeatured: false,
  },
];

/* ------------------------------------------------------------------ */
/*  Helper functions                                                    */
/* ------------------------------------------------------------------ */

/** Resources with deadlines within the next 90 days */
export function getUpcomingDeadlines(): CareerResource[] {
  const now = new Date();
  const ninetyDays = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
  return CAREER_RESOURCES.filter((r) => {
    if (!r.deadline) return false;
    const d = new Date(r.deadline);
    return d >= now && d <= ninetyDays;
  });
}

/** All unique source URLs for the Sources Index section */
export function getAllSources(): { org: string; url: string }[] {
  return CAREER_RESOURCES.map((r) => ({ org: r.sourceOrg, url: r.url }));
}

/** Count resources by cost tier */
export function getResourceCounts(): {
  total: number;
  free: number;
  low: number;
  varies: number;
} {
  return {
    total: CAREER_RESOURCES.length,
    free: CAREER_RESOURCES.filter((r) => r.cost === "free").length,
    low: CAREER_RESOURCES.filter((r) => r.cost === "low").length,
    varies: CAREER_RESOURCES.filter((r) => r.cost === "varies").length,
  };
}
