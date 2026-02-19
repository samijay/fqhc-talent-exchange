// Certification catalog for California FQHC careers
// All data is California-specific: issuing bodies, training programs, salary impacts

export type CertImpactType = "required" | "salary_boost" | "resume_boost";

export type CostTier = "free" | "under_500" | "under_1000" | "over_1000";

export interface Certification {
  id: string;
  name: string;
  esName: string;
  abbreviation: string;
  issuer: string;
  esIssuer: string;
  costRange: string;
  esCostRange: string;
  costTier: CostTier;
  duration: string;
  esDuration: string;
  renewalPeriod: string;
  esRenewalPeriod: string;
  salaryImpact: string;
  esSalaryImpact: string;
  impactType: CertImpactType;
  requiredFor: string[]; // role IDs
  helpfulFor: string[]; // role IDs
  description: string;
  esDescription: string;
  californiaNote: string;
  esCaliforniaNote: string;
  whereToGet: string[];
  esWhereToGet: string[];
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: "ca-chw-cert",
    name: "California CHW Certificate",
    esName: "Certificado de CHW de California",
    abbreviation: "CHW Cert",
    issuer: "California Department of Public Health (CDPH)",
    esIssuer: "Departamento de Salud Pública de California (CDPH)",
    costRange: "$500–$2,000",
    esCostRange: "$500–$2,000",
    costTier: "under_1000",
    duration: "80–148 hours of training",
    esDuration: "80–148 horas de capacitación",
    renewalPeriod: "Every 2 years (20 CEUs)",
    esRenewalPeriod: "Cada 2 años (20 CEUs)",
    salaryImpact: "+$3,000–$5,000/year",
    esSalaryImpact: "+$3,000–$5,000/año",
    impactType: "salary_boost",
    requiredFor: ["chw"],
    helpfulFor: ["care-coordinator"],
    description:
      "California's standardized CHW certification through CDPH-approved training programs. Validates community health competencies including health education, advocacy, and cultural mediation.",
    esDescription:
      "Certificación estandarizada de CHW de California a través de programas aprobados por CDPH. Valida competencias en salud comunitaria incluyendo educación en salud, defensa y mediación cultural.",
    californiaNote:
      "California-specific certification. AB 2350 (2022) created the CHW certification framework through CDPH. Required by many FQHCs for CHW roles.",
    esCaliforniaNote:
      "Certificación específica de California. AB 2350 (2022) creó el marco de certificación de CHW a través de CDPH. Requerido por muchos FQHCs para roles de CHW.",
    whereToGet: [
      "City College of San Francisco — CHW Certificate Program",
      "Cal State LA — Community Health Worker Program",
      "Fresno City College — CHW Training",
      "San Diego Community College — CHW Certificate",
      "UCLA Extension — Community Health Worker Program",
    ],
    esWhereToGet: [
      "City College de San Francisco — Programa de Certificado CHW",
      "Cal State LA — Programa de Promotor(a) de Salud",
      "Fresno City College — Capacitación CHW",
      "San Diego Community College — Certificado CHW",
      "UCLA Extension — Programa de Promotor(a) de Salud",
    ],
  },
  {
    id: "ccm",
    name: "Certified Case Manager",
    esName: "Gerente de Casos Certificado",
    abbreviation: "CCM",
    issuer: "Commission for Case Manager Certification (CCMC)",
    esIssuer: "Comisión para la Certificación de Gerentes de Casos (CCMC)",
    costRange: "$400 exam fee",
    esCostRange: "$400 tarifa de examen",
    costTier: "under_500",
    duration: "6–12 months preparation",
    esDuration: "6–12 meses de preparación",
    renewalPeriod: "Every 5 years (80 CEUs)",
    esRenewalPeriod: "Cada 5 años (80 CEUs)",
    salaryImpact: "+$5,000–$8,000/year",
    esSalaryImpact: "+$5,000–$8,000/año",
    impactType: "salary_boost",
    requiredFor: ["case-manager"],
    helpfulFor: ["care-coordinator", "program-manager"],
    description:
      "National certification for case managers. Demonstrates expertise in care coordination, patient assessment, and resource management.",
    esDescription:
      "Certificación nacional para gerentes de casos. Demuestra experiencia en coordinación de cuidado, evaluación del paciente y gestión de recursos.",
    californiaNote:
      "Highly valued in California FQHCs, especially for CalAIM ECM/CCM roles. Many FQHCs list CCM as preferred or required for case management positions.",
    esCaliforniaNote:
      "Muy valorado en FQHCs de California, especialmente para roles de CalAIM ECM/CCM. Muchos FQHCs listan CCM como preferido o requerido.",
    whereToGet: [
      "CCMC — ccmcertification.org (online exam)",
      "USC School of Social Work — Case Management CE courses",
      "Study guides available through CCMC website",
    ],
    esWhereToGet: [
      "CCMC — ccmcertification.org (examen en línea)",
      "Escuela de Trabajo Social de USC — Cursos de CE en gestión de casos",
      "Guías de estudio disponibles en el sitio web de CCMC",
    ],
  },
  {
    id: "cpc",
    name: "Certified Professional Coder",
    esName: "Codificador Profesional Certificado",
    abbreviation: "CPC",
    issuer: "American Academy of Professional Coders (AAPC)",
    esIssuer: "Academia Americana de Codificadores Profesionales (AAPC)",
    costRange: "$400 exam fee",
    esCostRange: "$400 tarifa de examen",
    costTier: "under_500",
    duration: "4–6 months preparation",
    esDuration: "4–6 meses de preparación",
    renewalPeriod: "Every 2 years (36 CEUs)",
    esRenewalPeriod: "Cada 2 años (36 CEUs)",
    salaryImpact: "+$5,000–$10,000/year",
    esSalaryImpact: "+$5,000–$10,000/año",
    impactType: "salary_boost",
    requiredFor: ["revenue-cycle"],
    helpfulFor: ["revenue-manager", "patient-services"],
    description:
      "Industry-standard certification for medical coding. Covers CPT, ICD-10-CM, and HCPCS coding systems used in FQHC billing.",
    esDescription:
      "Certificación estándar de la industria para codificación médica. Cubre sistemas de codificación CPT, ICD-10-CM y HCPCS usados en facturación de FQHCs.",
    californiaNote:
      "Essential for FQHC revenue cycle roles in California. FQHC-specific PPS reimbursement makes accurate coding critical — directly impacts revenue.",
    esCaliforniaNote:
      "Esencial para roles de ciclo de ingresos en FQHCs de California. El reembolso PPS específico de FQHC hace que la codificación precisa sea crítica.",
    whereToGet: [
      "AAPC — aapc.com (online and in-person exam centers across CA)",
      "Los Angeles Valley College — Medical Coding Program",
      "Sacramento City College — Health Information Technology",
      "San Diego Mesa College — Medical Coding Certificate",
    ],
    esWhereToGet: [
      "AAPC — aapc.com (centros de examen en línea y presenciales en CA)",
      "Los Angeles Valley College — Programa de Codificación Médica",
      "Sacramento City College — Tecnología de Información de Salud",
      "San Diego Mesa College — Certificado de Codificación Médica",
    ],
  },
  {
    id: "bls",
    name: "Basic Life Support / CPR",
    esName: "Soporte Vital Básico / RCP",
    abbreviation: "BLS/CPR",
    issuer: "American Heart Association (AHA)",
    esIssuer: "Asociación Americana del Corazón (AHA)",
    costRange: "$75–$100",
    esCostRange: "$75–$100",
    costTier: "under_500",
    duration: "1 day (4–5 hours)",
    esDuration: "1 día (4–5 horas)",
    renewalPeriod: "Every 2 years",
    esRenewalPeriod: "Cada 2 años",
    salaryImpact: "Required — baseline credential",
    esSalaryImpact: "Requerido — credencial base",
    impactType: "required",
    requiredFor: ["medical-assistant", "rn", "behavioral-health", "bh-technician"],
    helpfulFor: ["chw", "care-coordinator", "case-manager"],
    description:
      "Foundational emergency response certification. Required for all clinical FQHC roles and recommended for most patient-facing positions.",
    esDescription:
      "Certificación fundamental de respuesta a emergencias. Requerido para todos los roles clínicos de FQHC y recomendado para la mayoría de posiciones con pacientes.",
    californiaNote:
      "All California FQHCs require BLS for clinical staff. Most offer employer-paid renewal. Hands-on skills testing required (not online-only).",
    esCaliforniaNote:
      "Todos los FQHCs de California requieren BLS para personal clínico. La mayoría ofrece renovación pagada por el empleador.",
    whereToGet: [
      "AHA Training Centers — many locations across California",
      "Local Red Cross chapters",
      "Community colleges — often included in MA/nursing programs",
      "Many FQHCs host on-site renewal classes",
    ],
    esWhereToGet: [
      "Centros de Capacitación AHA — muchas ubicaciones en California",
      "Capítulos locales de la Cruz Roja",
      "Colegios comunitarios — a menudo incluido en programas de MA/enfermería",
      "Muchos FQHCs ofrecen clases de renovación en el sitio",
    ],
  },
  {
    id: "cma",
    name: "Certified Medical Assistant",
    esName: "Asistente Médico Certificado",
    abbreviation: "CMA (AAMA)",
    issuer: "American Association of Medical Assistants (AAMA)",
    esIssuer: "Asociación Americana de Asistentes Médicos (AAMA)",
    costRange: "$250 exam fee",
    esCostRange: "$250 tarifa de examen",
    costTier: "under_500",
    duration: "After completing CAAHEP-accredited MA program",
    esDuration: "Después de completar programa de MA acreditado por CAAHEP",
    renewalPeriod: "Every 5 years (60 CEUs or re-exam)",
    esRenewalPeriod: "Cada 5 años (60 CEUs o re-examen)",
    salaryImpact: "+$2,000–$4,000/year",
    esSalaryImpact: "+$2,000–$4,000/año",
    impactType: "salary_boost",
    requiredFor: ["medical-assistant"],
    helpfulFor: ["lead-ma"],
    description:
      "National certification for medical assistants. Covers clinical procedures, administrative tasks, and general medical knowledge.",
    esDescription:
      "Certificación nacional para asistentes médicos. Cubre procedimientos clínicos, tareas administrativas y conocimiento médico general.",
    californiaNote:
      "California does not require MA certification by law, but CMA significantly improves hiring chances at FQHCs. Most CA FQHCs prefer CMA or RMA certified MAs.",
    esCaliforniaNote:
      "California no requiere certificación de MA por ley, pero CMA mejora significativamente las posibilidades de contratación en FQHCs.",
    whereToGet: [
      "AAMA — aama-ntl.org (exam at Prometric centers across CA)",
      "Most California community colleges with MA programs are CAAHEP-accredited",
      "Concorde Career College (CA locations)",
      "Unitek College (multiple CA campuses)",
    ],
    esWhereToGet: [
      "AAMA — aama-ntl.org (examen en centros Prometric en CA)",
      "La mayoría de colegios comunitarios de CA con programas de MA están acreditados por CAAHEP",
      "Concorde Career College (ubicaciones en CA)",
      "Unitek College (múltiples campus en CA)",
    ],
  },
  {
    id: "lcsw",
    name: "Licensed Clinical Social Worker",
    esName: "Trabajador Social Clínico con Licencia",
    abbreviation: "LCSW",
    issuer: "California Board of Behavioral Sciences (BBS)",
    esIssuer: "Junta de Ciencias Conductuales de California (BBS)",
    costRange: "$500+ (exam fees + supervision costs)",
    esCostRange: "$500+ (tarifas de examen + costos de supervisión)",
    costTier: "over_1000",
    duration: "2–3 years post-MSW (3,200 supervised hours)",
    esDuration: "2–3 años post-MSW (3,200 horas supervisadas)",
    renewalPeriod: "Every 2 years (36 CEUs)",
    esRenewalPeriod: "Cada 2 años (36 CEUs)",
    salaryImpact: "+$15,000–$25,000/year",
    esSalaryImpact: "+$15,000–$25,000/año",
    impactType: "salary_boost",
    requiredFor: ["licensed-therapist"],
    helpfulFor: ["behavioral-health", "bh-director"],
    description:
      "California state license for clinical social workers. Enables independent practice, clinical supervision, and the highest BH salary tier in FQHCs.",
    esDescription:
      "Licencia estatal de California para trabajadores sociales clínicos. Permite práctica independiente, supervisión clínica y el nivel salarial más alto de BH en FQHCs.",
    californiaNote:
      "Licensed through CA BBS. Requires MSW from CSWE-accredited program + 3,200 supervised clinical hours. LCSW holders are eligible for NHSC loan repayment ($50K–$75K).",
    esCaliforniaNote:
      "Licenciado a través de CA BBS. Requiere MSW de programa acreditado por CSWE + 3,200 horas clínicas supervisadas. Elegible para pago de préstamos NHSC ($50K–$75K).",
    whereToGet: [
      "CA BBS — bbs.ca.gov (state licensing board)",
      "USC School of Social Work (MSW program)",
      "San Diego State University (MSW program)",
      "Cal State LA, Long Beach, Fresno (MSW programs)",
    ],
    esWhereToGet: [
      "CA BBS — bbs.ca.gov (junta de licencias estatal)",
      "Escuela de Trabajo Social de USC (programa MSW)",
      "San Diego State University (programa MSW)",
      "Cal State LA, Long Beach, Fresno (programas MSW)",
    ],
  },
  {
    id: "lmft",
    name: "Licensed Marriage & Family Therapist",
    esName: "Terapeuta de Matrimonio y Familia con Licencia",
    abbreviation: "LMFT",
    issuer: "California Board of Behavioral Sciences (BBS)",
    esIssuer: "Junta de Ciencias Conductuales de California (BBS)",
    costRange: "$500+ (exam fees + supervision costs)",
    esCostRange: "$500+ (tarifas de examen + costos de supervisión)",
    costTier: "over_1000",
    duration: "2–3 years post-Master's (3,000 supervised hours)",
    esDuration: "2–3 años post-Maestría (3,000 horas supervisadas)",
    renewalPeriod: "Every 2 years (36 CEUs)",
    esRenewalPeriod: "Cada 2 años (36 CEUs)",
    salaryImpact: "+$15,000–$25,000/year",
    esSalaryImpact: "+$15,000–$25,000/año",
    impactType: "salary_boost",
    requiredFor: ["licensed-therapist"],
    helpfulFor: ["behavioral-health", "bh-director"],
    description:
      "California state license for marriage and family therapists. Qualifies for independent practice and clinical supervision in FQHC behavioral health programs.",
    esDescription:
      "Licencia estatal de California para terapeutas de matrimonio y familia. Califica para práctica independiente y supervisión clínica en programas de salud conductual de FQHCs.",
    californiaNote:
      "Licensed through CA BBS. Requires Master's in Counseling/MFT + 3,000 supervised hours. LMFT holders are also NHSC-eligible for loan repayment.",
    esCaliforniaNote:
      "Licenciado a través de CA BBS. Requiere Maestría en Consejería/MFT + 3,000 horas supervisadas. LMFT también es elegible para NHSC.",
    whereToGet: [
      "CA BBS — bbs.ca.gov",
      "Pepperdine University (MFT program)",
      "Cal State Northridge, Fullerton (Counseling programs)",
      "University of San Francisco (Counseling Psychology)",
    ],
    esWhereToGet: [
      "CA BBS — bbs.ca.gov",
      "Universidad de Pepperdine (programa MFT)",
      "Cal State Northridge, Fullerton (programas de Consejería)",
      "Universidad de San Francisco (Psicología de Consejería)",
    ],
  },
  {
    id: "ochin-epic",
    name: "OCHIN Epic Certification",
    esName: "Certificación OCHIN Epic",
    abbreviation: "OCHIN Epic",
    issuer: "OCHIN / Epic Systems",
    esIssuer: "OCHIN / Epic Systems",
    costRange: "Employer-paid (typically $0 for employees)",
    esCostRange: "Pagado por el empleador (típicamente $0 para empleados)",
    costTier: "free",
    duration: "2–4 weeks of training",
    esDuration: "2–4 semanas de capacitación",
    renewalPeriod: "Ongoing (updated with system changes)",
    esRenewalPeriod: "Continuo (actualizado con cambios del sistema)",
    salaryImpact: "+$3,000–$5,000/year",
    esSalaryImpact: "+$3,000–$5,000/año",
    impactType: "salary_boost",
    requiredFor: [],
    helpfulFor: [
      "chw", "care-coordinator", "medical-assistant", "case-manager",
      "behavioral-health", "rn", "patient-services", "revenue-cycle",
    ],
    description:
      "Proficiency in the OCHIN Epic EHR system, the most common EHR platform used by California FQHCs. Highly transferable across FQHC employers.",
    esDescription:
      "Competencia en el sistema EHR OCHIN Epic, la plataforma EHR más común usada por FQHCs de California. Altamente transferible entre empleadores FQHC.",
    californiaNote:
      "60%+ of California FQHCs use OCHIN Epic. Listing 'OCHIN Epic proficiency' on your resume immediately makes you more competitive. Usually trained on the job.",
    esCaliforniaNote:
      "Más del 60% de FQHCs de California usan OCHIN Epic. Listar competencia en OCHIN Epic en tu currículum te hace inmediatamente más competitivo.",
    whereToGet: [
      "Through your FQHC employer (most common)",
      "OCHIN training resources — ochin.org",
      "Epic UserWeb certification tracks (employer-sponsored)",
    ],
    esWhereToGet: [
      "A través de tu empleador FQHC (más común)",
      "Recursos de capacitación OCHIN — ochin.org",
      "Tracks de certificación Epic UserWeb (patrocinado por el empleador)",
    ],
  },
  {
    id: "bilingual-cert",
    name: "Bilingual Certification",
    esName: "Certificación Bilingüe",
    abbreviation: "Bilingual",
    issuer: "Employer / ALTA Language Services / Berlitz",
    esIssuer: "Empleador / ALTA Language Services / Berlitz",
    costRange: "Free–$200",
    esCostRange: "Gratis–$200",
    costTier: "free",
    duration: "1 test (1–2 hours)",
    esDuration: "1 examen (1–2 horas)",
    renewalPeriod: "Typically once (no renewal)",
    esRenewalPeriod: "Típicamente una vez (sin renovación)",
    salaryImpact: "+$2,000–$4,000/year differential",
    esSalaryImpact: "+$2,000–$4,000/año diferencial",
    impactType: "salary_boost",
    requiredFor: [],
    helpfulFor: [
      "chw", "care-coordinator", "medical-assistant", "case-manager",
      "behavioral-health", "rn", "patient-services", "revenue-cycle",
    ],
    description:
      "Formal verification of bilingual proficiency (usually Spanish-English). Many FQHCs offer a bilingual pay differential for certified bilingual staff.",
    esDescription:
      "Verificación formal de competencia bilingüe (usualmente español-inglés). Muchos FQHCs ofrecen un diferencial salarial bilingüe para personal certificado.",
    californiaNote:
      "Critical in California where 40%+ of FQHC patients are Spanish-speaking. Many FQHCs offer $1–$2/hour or flat annual differentials. Tested through ALTA or employer assessments.",
    esCaliforniaNote:
      "Crítico en California donde más del 40% de pacientes de FQHC hablan español. Muchos FQHCs ofrecen $1–$2/hora o diferenciales anuales fijos.",
    whereToGet: [
      "Your FQHC employer's HR department (many test in-house)",
      "ALTA Language Services — altalang.com",
      "Language Testing International (LTI)",
    ],
    esWhereToGet: [
      "El departamento de RH de tu FQHC (muchos evalúan internamente)",
      "ALTA Language Services — altalang.com",
      "Language Testing International (LTI)",
    ],
  },
  {
    id: "motivational-interviewing",
    name: "Motivational Interviewing",
    esName: "Entrevista Motivacional",
    abbreviation: "MI",
    issuer: "Motivational Interviewing Network of Trainers (MINT)",
    esIssuer: "Red de Entrenadores en Entrevista Motivacional (MINT)",
    costRange: "$300–$500",
    esCostRange: "$300–$500",
    costTier: "under_500",
    duration: "2–3 day workshop",
    esDuration: "Taller de 2–3 días",
    renewalPeriod: "No formal renewal (CEUs available)",
    esRenewalPeriod: "Sin renovación formal (CEUs disponibles)",
    salaryImpact: "Resume differentiator",
    esSalaryImpact: "Diferenciador en currículum",
    impactType: "resume_boost",
    requiredFor: [],
    helpfulFor: ["chw", "care-coordinator", "behavioral-health", "case-manager"],
    description:
      "Evidence-based communication technique for behavior change. Widely used in FQHC settings for patient engagement and chronic disease management.",
    esDescription:
      "Técnica de comunicación basada en evidencia para el cambio de comportamiento. Ampliamente usada en FQHCs para compromiso del paciente y manejo de enfermedades crónicas.",
    californiaNote:
      "Increasingly required for CalAIM ECM roles. Several CA FQHCs include MI training in onboarding. Strong differentiator for CHW and Care Coordinator roles.",
    esCaliforniaNote:
      "Cada vez más requerido para roles de CalAIM ECM. Varios FQHCs de CA incluyen capacitación MI en la incorporación.",
    whereToGet: [
      "MINT — motivationalinterviewing.org (find CA trainers)",
      "UC San Diego Extension — MI workshops",
      "Many CA FQHCs offer in-house MI training",
    ],
    esWhereToGet: [
      "MINT — motivationalinterviewing.org (encontrar entrenadores en CA)",
      "UC San Diego Extension — talleres de MI",
      "Muchos FQHCs de CA ofrecen capacitación MI interna",
    ],
  },
  {
    id: "trauma-informed-care",
    name: "Trauma-Informed Care",
    esName: "Cuidado Informado por Trauma",
    abbreviation: "TIC",
    issuer: "Various (SAMHSA framework)",
    esIssuer: "Varios (marco SAMHSA)",
    costRange: "$100–$300",
    esCostRange: "$100–$300",
    costTier: "under_500",
    duration: "1–2 day training",
    esDuration: "Capacitación de 1–2 días",
    renewalPeriod: "No formal renewal",
    esRenewalPeriod: "Sin renovación formal",
    salaryImpact: "Resume differentiator",
    esSalaryImpact: "Diferenciador en currículum",
    impactType: "resume_boost",
    requiredFor: [],
    helpfulFor: [
      "chw", "care-coordinator", "behavioral-health", "case-manager",
      "medical-assistant", "rn", "bh-technician",
    ],
    description:
      "SAMHSA-based framework for understanding and responding to trauma. Critical for FQHC settings where patients often have complex trauma histories.",
    esDescription:
      "Marco basado en SAMHSA para entender y responder al trauma. Crítico para FQHCs donde los pacientes a menudo tienen historias de trauma complejas.",
    californiaNote:
      "California's ACEs Aware initiative promotes TIC across healthcare. Many FQHCs require TIC training for all staff. Free resources from ACEs Aware (acesaware.org).",
    esCaliforniaNote:
      "La iniciativa ACEs Aware de California promueve TIC en toda la atención médica. Recursos gratuitos en acesaware.org.",
    whereToGet: [
      "ACEs Aware — acesaware.org (free California-specific training)",
      "SAMHSA — samhsa.gov (free online courses)",
      "Many CA FQHCs include in onboarding",
    ],
    esWhereToGet: [
      "ACEs Aware — acesaware.org (capacitación gratuita específica de CA)",
      "SAMHSA — samhsa.gov (cursos en línea gratuitos)",
      "Muchos FQHCs de CA incluyen en la incorporación",
    ],
  },
  {
    id: "calaim-ecm",
    name: "CalAIM ECM Training",
    esName: "Capacitación CalAIM ECM",
    abbreviation: "CalAIM ECM",
    issuer: "California Department of Health Care Services (DHCS)",
    esIssuer: "Departamento de Servicios de Atención Médica de California (DHCS)",
    costRange: "Free",
    esCostRange: "Gratis",
    costTier: "free",
    duration: "Self-paced online modules",
    esDuration: "Módulos en línea a su propio ritmo",
    renewalPeriod: "Updated as CalAIM evolves",
    esRenewalPeriod: "Actualizado según evoluciona CalAIM",
    salaryImpact: "Required for ECM roles",
    esSalaryImpact: "Requerido para roles de ECM",
    impactType: "required",
    requiredFor: ["care-coordinator", "chw"],
    helpfulFor: ["case-manager", "behavioral-health"],
    description:
      "Training on California's Enhanced Care Management program under CalAIM. Covers ECM populations of focus, service requirements, and documentation.",
    esDescription:
      "Capacitación en el programa de Gestión de Cuidado Mejorado de California bajo CalAIM. Cubre poblaciones de enfoque, requisitos de servicio y documentación.",
    californiaNote:
      "CalAIM is California-specific (launched 2022). ECM is a major funding stream for FQHCs. Understanding ECM populations of focus and documentation requirements is essential.",
    esCaliforniaNote:
      "CalAIM es específico de California (lanzado 2022). ECM es una fuente importante de financiamiento para FQHCs.",
    whereToGet: [
      "DHCS CalAIM Training Hub — dhcs.ca.gov/CalAIM",
      "Managed care plan trainings (varies by county)",
      "FQHC employer onboarding (most common)",
    ],
    esWhereToGet: [
      "Centro de Capacitación CalAIM de DHCS — dhcs.ca.gov/CalAIM",
      "Capacitaciones de planes de atención administrada (varía por condado)",
      "Incorporación del empleador FQHC (más común)",
    ],
  },
  {
    id: "nhsc",
    name: "NHSC Loan Repayment Program",
    esName: "Programa de Pago de Préstamos NHSC",
    abbreviation: "NHSC LRP",
    issuer: "Health Resources & Services Administration (HRSA)",
    esIssuer: "Administración de Recursos y Servicios de Salud (HRSA)",
    costRange: "N/A — this is a benefit, not a cost",
    esCostRange: "N/A — esto es un beneficio, no un costo",
    costTier: "free",
    duration: "2-year minimum service commitment",
    esDuration: "Compromiso de servicio mínimo de 2 años",
    renewalPeriod: "Can extend for additional years",
    esRenewalPeriod: "Se puede extender por años adicionales",
    salaryImpact: "$50,000–$75,000 loan forgiveness",
    esSalaryImpact: "$50,000–$75,000 en perdón de préstamos",
    impactType: "salary_boost",
    requiredFor: [],
    helpfulFor: ["rn", "licensed-therapist", "behavioral-health"],
    description:
      "Federal loan repayment for healthcare providers working in HPSAs (Health Professional Shortage Areas). Most FQHCs are NHSC-approved sites.",
    esDescription:
      "Pago de préstamos federal para proveedores de salud que trabajan en áreas de escasez de profesionales de salud. La mayoría de FQHCs son sitios aprobados por NHSC.",
    californiaNote:
      "California has more NHSC-approved FQHC sites than any other state. Eligible providers: physicians, NPs, PAs, dentists, licensed therapists (LCSW/LMFT), RNs in certain programs.",
    esCaliforniaNote:
      "California tiene más sitios FQHC aprobados por NHSC que cualquier otro estado. Proveedores elegibles: médicos, NPs, PAs, dentistas, terapeutas con licencia, RNs.",
    whereToGet: [
      "NHSC — nhsc.hrsa.gov (annual application cycle, typically Sept–Nov)",
      "Your FQHC employer's HR can confirm NHSC site eligibility",
      "CalHealthCares — state supplement to NHSC (additional CA-specific loan repayment)",
    ],
    esWhereToGet: [
      "NHSC — nhsc.hrsa.gov (ciclo de solicitud anual, típicamente sept–nov)",
      "El departamento de RH de tu FQHC puede confirmar elegibilidad del sitio",
      "CalHealthCares — suplemento estatal al NHSC (pago de préstamos adicional específico de CA)",
    ],
  },
  {
    id: "pmp",
    name: "Project Management Professional",
    esName: "Profesional en Gestión de Proyectos",
    abbreviation: "PMP",
    issuer: "Project Management Institute (PMI)",
    esIssuer: "Instituto de Gestión de Proyectos (PMI)",
    costRange: "$555 exam fee",
    esCostRange: "$555 tarifa de examen",
    costTier: "under_1000",
    duration: "6–12 months preparation",
    esDuration: "6–12 meses de preparación",
    renewalPeriod: "Every 3 years (60 PDUs)",
    esRenewalPeriod: "Cada 3 años (60 PDUs)",
    salaryImpact: "+$8,000–$12,000/year",
    esSalaryImpact: "+$8,000–$12,000/año",
    impactType: "salary_boost",
    requiredFor: [],
    helpfulFor: ["program-manager", "director-community", "director-clinical-ops"],
    description:
      "Globally recognized project management credential. Valuable for FQHC program managers overseeing grants, clinical programs, and operational initiatives.",
    esDescription:
      "Credencial de gestión de proyectos reconocida globalmente. Valiosa para gerentes de programas de FQHC que supervisan subvenciones y programas clínicos.",
    californiaNote:
      "Especially valuable for managing HRSA grant deliverables and CalAIM program implementations. Strong differentiator for mid-career FQHC roles.",
    esCaliforniaNote:
      "Especialmente valioso para gestionar entregables de subvenciones HRSA e implementaciones de programas CalAIM.",
    whereToGet: [
      "PMI — pmi.org (online exam via Pearson VUE)",
      "UC Berkeley Extension — PMP prep courses",
      "UCLA Extension — Project Management Certificate",
      "Stanford Continuing Studies — PM courses",
    ],
    esWhereToGet: [
      "PMI — pmi.org (examen en línea vía Pearson VUE)",
      "UC Berkeley Extension — cursos de preparación PMP",
      "UCLA Extension — Certificado de Gestión de Proyectos",
      "Stanford Continuing Studies — cursos de PM",
    ],
  },
  {
    id: "acls",
    name: "Advanced Cardiovascular Life Support",
    esName: "Soporte Vital Cardiovascular Avanzado",
    abbreviation: "ACLS",
    issuer: "American Heart Association (AHA)",
    esIssuer: "Asociación Americana del Corazón (AHA)",
    costRange: "$200",
    esCostRange: "$200",
    costTier: "under_500",
    duration: "1–2 days",
    esDuration: "1–2 días",
    renewalPeriod: "Every 2 years",
    esRenewalPeriod: "Cada 2 años",
    salaryImpact: "Required for RN roles",
    esSalaryImpact: "Requerido para roles de RN",
    impactType: "required",
    requiredFor: ["rn", "charge-nurse"],
    helpfulFor: ["nurse-manager"],
    description:
      "Advanced emergency cardiac care certification. Required for most RN positions in FQHCs, especially those handling urgent/emergent situations.",
    esDescription:
      "Certificación avanzada de cuidado cardíaco de emergencia. Requerido para la mayoría de posiciones de RN en FQHCs.",
    californiaNote:
      "Required by most California FQHCs for RN roles. Employer-paid renewal is standard. In-person skills testing required.",
    esCaliforniaNote:
      "Requerido por la mayoría de FQHCs de California para roles de RN. Renovación pagada por el empleador es estándar.",
    whereToGet: [
      "AHA Training Centers across California",
      "Most hospital and FQHC systems offer on-site",
      "Community colleges with nursing programs",
    ],
    esWhereToGet: [
      "Centros de Capacitación AHA en toda California",
      "La mayoría de hospitales y FQHCs ofrecen en el sitio",
      "Colegios comunitarios con programas de enfermería",
    ],
  },
];

// Helper: get certifications for a specific role
export function getCertificationsForRole(roleId: string): {
  required: Certification[];
  recommended: Certification[];
} {
  const required = CERTIFICATIONS.filter((c) => c.requiredFor.includes(roleId));
  const recommended = CERTIFICATIONS.filter(
    (c) => c.helpfulFor.includes(roleId) && !c.requiredFor.includes(roleId)
  );
  return { required, recommended };
}

// Helper: filter by cost tier
export function filterByCost(certs: Certification[], tier: CostTier): Certification[] {
  return certs.filter((c) => c.costTier === tier);
}
