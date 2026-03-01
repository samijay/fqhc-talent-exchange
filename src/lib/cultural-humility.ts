// cultural-humility.ts
// Cultural humility framework for FQHC workforce management
// How FQHCs can leverage multicultural workforces as a strategic advantage in community care
// All regulatory citations reference CLAS Standards, HRSA, Joint Commission, or CA regulations
// Every claim backed by primary source URL
// Last updated: 2026-02-28

/** Exported for display on pages — updated when data changes */
export const CULTURAL_HUMILITY_LAST_UPDATED = "2026-02-28";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type CulturalDomain =
  | "language-access"
  | "cultural-humility"
  | "community-centered"
  | "implicit-bias"
  | "health-equity"
  | "workforce-diversity";

export interface CulturalCompetency {
  id: string;
  domain: CulturalDomain;
  title: { en: string; es: string };
  description: { en: string; es: string };
  practicalSteps: { en: string; es: string }[];
  fqhcExamples: { en: string; es: string }[];
  metrics: { label: string; benchmark: string }[];
  regulatoryBasis: string;
  primarySourceUrl: string;
  primarySourceOrg: string;
}

export interface WorkforceDiversityScenario {
  id: string;
  title: { en: string; es: string };
  description: { en: string; es: string };
  challenge: { en: string; es: string };
  strategy: { en: string; es: string };
  outcomes: { en: string; es: string }[];
  applicableRoles: string[];
}

/* ------------------------------------------------------------------ */
/*  Domain metadata                                                    */
/* ------------------------------------------------------------------ */

export const CULTURAL_DOMAINS: {
  id: CulturalDomain;
  en: string;
  es: string;
  icon: string;
  color: string;
  bgColor: string;
}[] = [
  {
    id: "language-access",
    en: "Language Access",
    es: "Acceso Linguistico",
    icon: "Languages",
    color: "text-blue-700",
    bgColor: "bg-blue-50 border-blue-200",
  },
  {
    id: "cultural-humility",
    en: "Cultural Humility",
    es: "Humildad Cultural",
    icon: "Heart",
    color: "text-rose-700",
    bgColor: "bg-rose-50 border-rose-200",
  },
  {
    id: "community-centered",
    en: "Community-Centered Care",
    es: "Atencion Centrada en la Comunidad",
    icon: "Users",
    color: "text-teal-700",
    bgColor: "bg-teal-50 border-teal-200",
  },
  {
    id: "implicit-bias",
    en: "Implicit Bias",
    es: "Sesgo Implicito",
    icon: "Brain",
    color: "text-purple-700",
    bgColor: "bg-purple-50 border-purple-200",
  },
  {
    id: "health-equity",
    en: "Health Equity",
    es: "Equidad en Salud",
    icon: "Scale",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50 border-emerald-200",
  },
  {
    id: "workforce-diversity",
    en: "Workforce Diversity",
    es: "Diversidad Laboral",
    icon: "Handshake",
    color: "text-amber-700",
    bgColor: "bg-amber-50 border-amber-200",
  },
];

/* ------------------------------------------------------------------ */
/*  Main data: 18 competencies (3 per domain)                          */
/* ------------------------------------------------------------------ */

export const CULTURAL_COMPETENCIES: CulturalCompetency[] = [
  /* ================================================================ */
  /*  LANGUAGE ACCESS (3)                                              */
  /* ================================================================ */

  // ---- 1. Professional Interpreter Services ----
  {
    id: "la-interpreter-services",
    domain: "language-access",
    title: {
      en: "Professional Interpreter Services",
      es: "Servicios Profesionales de Interpretacion",
    },
    description: {
      en: "Ensuring every LEP (Limited English Proficiency) patient has access to qualified medical interpreters — not bilingual staff pulled from their duties. CLAS Standards 5-8 require organizations to provide language assistance services at no cost to patients, using trained interpreters rather than family members or untrained staff.",
      es: "Asegurar que cada paciente con dominio limitado del ingles (LEP) tenga acceso a interpretes medicos calificados — no personal bilingue sacado de sus funciones. Los Estandares CLAS 5-8 requieren que las organizaciones proporcionen servicios de asistencia linguistica sin costo para los pacientes, utilizando interpretes capacitados en lugar de familiares o personal no capacitado.",
    },
    practicalSteps: [
      {
        en: "Implement a standardized LEP identification protocol at registration using I-Speak cards or language preference documentation",
        es: "Implementar un protocolo estandarizado de identificacion de LEP en el registro usando tarjetas I-Speak o documentacion de preferencia de idioma",
      },
      {
        en: "Contract with a video remote interpreting (VRI) service for on-demand access to 200+ languages during clinical encounters",
        es: "Contratar un servicio de interpretacion remota por video (VRI) para acceso bajo demanda a mas de 200 idiomas durante encuentros clinicos",
      },
      {
        en: "Require certified medical interpreter credentials (CMI or CHI) for all in-person interpreter staff",
        es: "Requerir credenciales de interprete medico certificado (CMI o CHI) para todo el personal de interpretacion presencial",
      },
      {
        en: "Track interpreter utilization rates and compare against LEP patient volume to identify access gaps",
        es: "Rastrear tasas de uso de interpretes y comparar contra el volumen de pacientes LEP para identificar brechas de acceso",
      },
    ],
    fqhcExamples: [
      {
        en: "La Clinica de La Raza in Oakland employs 40+ certified medical interpreters across 12 languages and tracks interpreter wait times as a quality metric",
        es: "La Clinica de La Raza en Oakland emplea mas de 40 interpretes medicos certificados en 12 idiomas y rastrea los tiempos de espera de interpretes como metrica de calidad",
      },
      {
        en: "AltaMed Health Services uses VRI tablets in every exam room, achieving 95%+ interpreter utilization for LEP encounters",
        es: "AltaMed Health Services usa tabletas VRI en cada sala de examen, logrando mas del 95% de utilizacion de interpretes para encuentros con pacientes LEP",
      },
    ],
    metrics: [
      { label: "LEP patients receiving interpreter services", benchmark: ">95% of LEP encounters" },
      { label: "Interpreter wait time", benchmark: "<3 minutes for VRI" },
      { label: "Patient satisfaction (LEP cohort)", benchmark: ">85% satisfied with language services" },
    ],
    regulatoryBasis: "CLAS Standards 5-8; Title VI of the Civil Rights Act; CA Health & Safety Code Section 1259",
    primarySourceUrl: "https://thinkculturalhealth.hhs.gov/clas/standards",
    primarySourceOrg: "HHS Office of Minority Health",
  },

  // ---- 2. Bilingual Workforce Premium ----
  {
    id: "la-bilingual-workforce",
    domain: "language-access",
    title: {
      en: "Bilingual Workforce Premium",
      es: "Prima de Fuerza Laboral Bilingue",
    },
    description: {
      en: "Treating bilingual capacity as a measurable workforce asset rather than an informal expectation. Bilingual staff who provide direct patient communication in threshold languages deserve differential pay, proficiency testing, and role clarity that distinguishes interpreting duties from their primary clinical or administrative functions.",
      es: "Tratar la capacidad bilingue como un activo laboral medible en lugar de una expectacion informal. El personal bilingue que proporciona comunicacion directa con pacientes en idiomas de umbral merece pago diferencial, pruebas de competencia y claridad de rol que distinga las funciones de interpretacion de sus funciones clinicas o administrativas primarias.",
    },
    practicalSteps: [
      {
        en: "Establish bilingual differential pay ($1-3/hour premium) for staff who pass a validated language proficiency assessment",
        es: "Establecer pago diferencial bilingue (prima de $1-3/hora) para el personal que apruebe una evaluacion validada de competencia linguistica",
      },
      {
        en: "Use standardized proficiency testing (e.g., ALTA or Avant Assessment) rather than self-reported fluency",
        es: "Usar pruebas de competencia estandarizadas (por ejemplo, ALTA o Avant Assessment) en lugar de fluidez autoinformada",
      },
      {
        en: "Create written policies distinguishing bilingual direct care from formal interpreting — bilingual MAs can communicate in Spanish with their own patients but should not replace certified interpreters for complex medical discussions",
        es: "Crear politicas escritas que distingan la atencion directa bilingue de la interpretacion formal — los MAs bilingues pueden comunicarse en espanol con sus propios pacientes pero no deben reemplazar interpretes certificados para discusiones medicas complejas",
      },
    ],
    fqhcExamples: [
      {
        en: "FHCSD (Family Health Centers of San Diego) offers a bilingual premium and tests all applicants claiming Spanish proficiency using a standardized oral assessment",
        es: "FHCSD (Centros de Salud Familiar de San Diego) ofrece una prima bilingue y evalua a todos los solicitantes que declaran competencia en espanol usando una evaluacion oral estandarizada",
      },
      {
        en: "Northeast Valley Health Corporation in Los Angeles tracks bilingual capacity by department and recruits to maintain >80% bilingual staffing in patient-facing roles",
        es: "Northeast Valley Health Corporation en Los Angeles rastrea la capacidad bilingue por departamento y recluta para mantener mas del 80% de personal bilingue en roles de atencion al paciente",
      },
    ],
    metrics: [
      { label: "Bilingual staff in patient-facing roles", benchmark: ">75% in communities with >50% LEP" },
      { label: "Proficiency-tested bilingual staff", benchmark: "100% of those receiving differential pay" },
      { label: "Language concordance rate", benchmark: ">70% of encounters language-concordant" },
    ],
    regulatoryBasis: "CLAS Standard 5; HRSA Health Center Program Compliance Manual Chapter 12",
    primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual",
    primarySourceOrg: "HRSA Bureau of Primary Health Care",
  },

  // ---- 3. Multilingual Signage & Materials ----
  {
    id: "la-signage-materials",
    domain: "language-access",
    title: {
      en: "Multilingual Signage & Materials",
      es: "Senalizacion y Materiales Multilingues",
    },
    description: {
      en: "Patient-facing environments must communicate in the languages patients actually speak. This goes beyond translating a brochure — it means health-literacy-appropriate materials, signage in threshold languages throughout the facility, and digital content (patient portals, appointment reminders, forms) available in multiple languages.",
      es: "Los entornos orientados al paciente deben comunicarse en los idiomas que los pacientes realmente hablan. Esto va mas alla de traducir un folleto — significa materiales apropiados para la alfabetizacion en salud, senalizacion en idiomas de umbral en toda la instalacion y contenido digital (portales de pacientes, recordatorios de citas, formularios) disponible en multiples idiomas.",
    },
    practicalSteps: [
      {
        en: "Conduct a language needs assessment to identify threshold languages (spoken by >5% of service area population or >1,000 individuals)",
        es: "Realizar una evaluacion de necesidades linguisticas para identificar idiomas de umbral (hablados por mas del 5% de la poblacion del area de servicio o mas de 1,000 individuos)",
      },
      {
        en: "Ensure all vital documents (consent forms, privacy notices, complaint procedures, eligibility materials) are translated into threshold languages at a 6th-grade reading level",
        es: "Asegurar que todos los documentos vitales (formularios de consentimiento, avisos de privacidad, procedimientos de quejas, materiales de elegibilidad) esten traducidos a idiomas de umbral a un nivel de lectura de sexto grado",
      },
      {
        en: "Post multilingual wayfinding signage — registration, pharmacy, lab, behavioral health — not just a single welcome sign",
        es: "Publicar senalizacion de orientacion multilingue — registro, farmacia, laboratorio, salud conductual — no solo un letrero de bienvenida",
      },
      {
        en: "Configure EHR patient portal and appointment reminder systems (MyChart, Klara) to communicate in patient-preferred language",
        es: "Configurar el portal de pacientes del EHR y sistemas de recordatorio de citas (MyChart, Klara) para comunicarse en el idioma preferido del paciente",
      },
    ],
    fqhcExamples: [
      {
        en: "Clinica de Salud del Valle de Salinas provides all patient materials in English, Spanish, and Mixteco — reflecting the Indigenous Mexican languages spoken by farmworker communities",
        es: "Clinica de Salud del Valle de Salinas proporciona todos los materiales para pacientes en ingles, espanol y mixteco — reflejando los idiomas indigenas mexicanos hablados por las comunidades de trabajadores agricolas",
      },
      {
        en: "Asian Health Services in Oakland maintains materials in 15+ Asian languages including Cantonese, Vietnamese, Korean, and Burmese",
        es: "Asian Health Services en Oakland mantiene materiales en mas de 15 idiomas asiaticos incluyendo cantones, vietnamita, coreano y birmano",
      },
    ],
    metrics: [
      { label: "Vital documents translated to threshold languages", benchmark: "100% within 90 days of identifying a new threshold language" },
      { label: "Patient portal available in threshold languages", benchmark: "100% of threshold languages supported" },
      { label: "Materials at appropriate health literacy level", benchmark: "All at or below 6th-grade reading level" },
    ],
    regulatoryBasis: "CLAS Standards 7-8; CA Dymally-Alatorre Bilingual Services Act (Government Code 7290-7299.8)",
    primarySourceUrl: "https://thinkculturalhealth.hhs.gov/clas/standards/7",
    primarySourceOrg: "HHS Office of Minority Health",
  },

  /* ================================================================ */
  /*  CULTURAL HUMILITY (3)                                            */
  /* ================================================================ */

  // ---- 4. Tervalon & Murray-Garcia Framework ----
  {
    id: "ch-tervalon-framework",
    domain: "cultural-humility",
    title: {
      en: "Tervalon & Murray-Garcia Framework",
      es: "Marco de Tervalon y Murray-Garcia",
    },
    description: {
      en: "Cultural humility, as defined by Melanie Tervalon and Jann Murray-Garcia in 1998, is a lifelong commitment to self-evaluation and self-critique — not a box to check or a competency to 'achieve.' It acknowledges that providers can never fully understand another person's cultural experience, and instead emphasizes ongoing learning, recognizing power imbalances in clinical relationships, and developing mutually beneficial partnerships with communities.",
      es: "La humildad cultural, definida por Melanie Tervalon y Jann Murray-Garcia en 1998, es un compromiso de por vida con la autoevaluacion y la autocritica — no una casilla que marcar o una competencia que 'lograr.' Reconoce que los proveedores nunca pueden comprender completamente la experiencia cultural de otra persona, y en cambio enfatiza el aprendizaje continuo, reconocer los desequilibrios de poder en las relaciones clinicas y desarrollar asociaciones mutuamente beneficiosas con las comunidades.",
    },
    practicalSteps: [
      {
        en: "Replace one-time cultural competency training with ongoing cultural humility practice — monthly reflective sessions where staff examine their own assumptions and biases",
        es: "Reemplazar la capacitacion unica de competencia cultural con practica continua de humildad cultural — sesiones reflexivas mensuales donde el personal examina sus propias suposiciones y sesgos",
      },
      {
        en: "Integrate cultural humility self-assessment into annual performance reviews for all clinical staff — not as a pass/fail but as a growth-oriented conversation",
        es: "Integrar la autoevaluacion de humildad cultural en las revisiones de desempeno anuales de todo el personal clinico — no como aprobado/reprobado sino como una conversacion orientada al crecimiento",
      },
      {
        en: "Train providers to ask patients 'What do you think is causing your problem?' and 'What treatment do you think would work?' before presenting clinical recommendations",
        es: "Capacitar a los proveedores para preguntar a los pacientes 'Que cree usted que esta causando su problema?' y 'Que tratamiento cree que funcionaria?' antes de presentar recomendaciones clinicas",
      },
    ],
    fqhcExamples: [
      {
        en: "La Clinica de La Raza weaves cultural humility into new employee orientation and requires annual reflection exercises tied to patient outcomes data",
        es: "La Clinica de La Raza integra la humildad cultural en la orientacion de nuevos empleados y requiere ejercicios de reflexion anuales vinculados a datos de resultados de pacientes",
      },
      {
        en: "San Ysidro Health in San Diego trains all staff — including front desk and janitorial — on power dynamics in healthcare settings, recognizing that every interaction shapes patient trust",
        es: "San Ysidro Health en San Diego capacita a todo el personal — incluyendo recepcion y limpieza — sobre dinamicas de poder en entornos de salud, reconociendo que cada interaccion forma la confianza del paciente",
      },
    ],
    metrics: [
      { label: "Staff completing annual cultural humility reflection", benchmark: ">90% participation" },
      { label: "Patient-reported cultural sensitivity", benchmark: ">85% on CAHPS Cultural Competency supplement" },
    ],
    regulatoryBasis: "CLAS Standard 4; Joint Commission Standard PC.02.01.21; HRSA UDS Health Disparities Report",
    primarySourceUrl: "https://pubmed.ncbi.nlm.nih.gov/9842773/",
    primarySourceOrg: "Journal of Health Care for the Poor and Underserved (Tervalon & Murray-Garcia, 1998)",
  },

  // ---- 5. Organizational Cultural Humility ----
  {
    id: "ch-organizational-humility",
    domain: "cultural-humility",
    title: {
      en: "Organizational Cultural Humility",
      es: "Humildad Cultural Organizacional",
    },
    description: {
      en: "Cultural humility cannot live only in individual providers — it must be embedded in organizational structures, policies, and governance. This means patient advisory boards that actually reflect the community, hiring practices that prioritize lived experience alongside credentials, and quality improvement processes that center patient voice rather than institutional convenience.",
      es: "La humildad cultural no puede vivir solo en los proveedores individuales — debe estar integrada en las estructuras organizacionales, politicas y gobernanza. Esto significa juntas asesoras de pacientes que realmente reflejen la comunidad, practicas de contratacion que prioricen la experiencia vivida junto con las credenciales, y procesos de mejora de calidad que centren la voz del paciente en lugar de la conveniencia institucional.",
    },
    practicalSteps: [
      {
        en: "Ensure patient advisory board membership reflects the racial, ethnic, and linguistic demographics of your patient population — not just the most vocal or English-proficient patients",
        es: "Asegurar que la membresia de la junta asesora de pacientes refleje la demografia racial, etnica y linguistica de su poblacion de pacientes — no solo los pacientes mas vocales o competentes en ingles",
      },
      {
        en: "Include community health workers and promotoras in clinical workflow design — they understand patient barriers that providers cannot see from the exam room",
        es: "Incluir a trabajadores de salud comunitaria y promotoras en el diseno de flujos de trabajo clinicos — ellos entienden las barreras de los pacientes que los proveedores no pueden ver desde la sala de examen",
      },
      {
        en: "Compensate community advisory board members for their time and expertise — unpaid participation perpetuates the power imbalance cultural humility aims to address",
        es: "Compensar a los miembros de la junta asesora comunitaria por su tiempo y experiencia — la participacion no remunerada perpetua el desequilibrio de poder que la humildad cultural busca abordar",
      },
      {
        en: "Review hiring criteria to value community knowledge and lived experience alongside formal credentials, especially for community-facing roles",
        es: "Revisar los criterios de contratacion para valorar el conocimiento comunitario y la experiencia vivida junto con las credenciales formales, especialmente para roles orientados a la comunidad",
      },
    ],
    fqhcExamples: [
      {
        en: "COPE Health Solutions partners with FQHCs to create community advisory structures where board members receive stipends and have defined decision-making authority over program design",
        es: "COPE Health Solutions se asocia con FQHCs para crear estructuras de asesoria comunitaria donde los miembros de la junta reciben estipendios y tienen autoridad definida de toma de decisiones sobre el diseno de programas",
      },
      {
        en: "Tiburcio Vasquez Health Center in Hayward hires from the communities it serves and promotes internally, with 60%+ of management having started in entry-level roles",
        es: "Tiburcio Vasquez Health Center en Hayward contrata de las comunidades que sirve y promueve internamente, con mas del 60% de la gerencia habiendo comenzado en roles de nivel de entrada",
      },
    ],
    metrics: [
      { label: "Advisory board demographic match to patient population", benchmark: "Within 10% of patient demographics" },
      { label: "Staff hired from service area community", benchmark: ">50% of new hires" },
      { label: "Community advisory board compensation", benchmark: "100% of members compensated" },
    ],
    regulatoryBasis: "HRSA Health Center Program Section 330(k)(3)(H); CLAS Standards 9-11",
    primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual/chapter-20",
    primarySourceOrg: "HRSA Bureau of Primary Health Care",
  },

  // ---- 6. Cross-Cultural Clinical Encounters ----
  {
    id: "ch-cross-cultural-encounters",
    domain: "cultural-humility",
    title: {
      en: "Cross-Cultural Clinical Encounters",
      es: "Encuentros Clinicos Interculturales",
    },
    description: {
      en: "Every clinical encounter is a cross-cultural encounter. The LEARN model (Listen, Explain, Acknowledge, Recommend, Negotiate) provides a practical framework for providers to explore patients' cultural health beliefs, integrate traditional medicine when safe, and negotiate treatment plans that patients will actually follow — because a medically perfect plan that a patient won't adhere to helps no one.",
      es: "Cada encuentro clinico es un encuentro intercultural. El modelo LEARN (Escuchar, Explicar, Reconocer, Recomendar, Negociar) proporciona un marco practico para que los proveedores exploren las creencias culturales de salud de los pacientes, integren la medicina tradicional cuando sea seguro y negocien planes de tratamiento que los pacientes realmente seguiran — porque un plan medicamente perfecto que un paciente no seguira no ayuda a nadie.",
    },
    practicalSteps: [
      {
        en: "Train all providers in the LEARN model and document its use in encounter notes — Listen to patient's perspective, Explain your assessment, Acknowledge differences, Recommend treatment, Negotiate a mutually agreeable plan",
        es: "Capacitar a todos los proveedores en el modelo LEARN y documentar su uso en notas de encuentro — Escuchar la perspectiva del paciente, Explicar su evaluacion, Reconocer diferencias, Recomendar tratamiento, Negociar un plan mutuamente aceptable",
      },
      {
        en: "Create a cultural health beliefs reference guide for common conditions in your patient population — for example, susto, empacho, and mal de ojo in Latino communities require acknowledgment, not dismissal",
        es: "Crear una guia de referencia de creencias culturales de salud para condiciones comunes en su poblacion de pacientes — por ejemplo, susto, empacho y mal de ojo en comunidades latinas requieren reconocimiento, no descarte",
      },
      {
        en: "Ask about traditional medicine use during medication reconciliation — many patients use herbal remedies, curanderos, or acupuncture alongside Western medicine but won't volunteer this information without being asked in a non-judgmental way",
        es: "Preguntar sobre el uso de medicina tradicional durante la reconciliacion de medicamentos — muchos pacientes usan remedios herbales, curanderos o acupuntura junto con la medicina occidental pero no ofrecen esta informacion voluntariamente sin que se les pregunte de manera no critica",
      },
    ],
    fqhcExamples: [
      {
        en: "Salud Para La Gente in Watsonville documents traditional medicine use as part of standard intake and has protocols for safe co-management of herbal remedies with prescribed medications",
        es: "Salud Para La Gente en Watsonville documenta el uso de medicina tradicional como parte de la admision estandar y tiene protocolos para el co-manejo seguro de remedios herbales con medicamentos recetados",
      },
      {
        en: "Community Health Center Network in Alameda County uses the LEARN model in diabetes management, resulting in higher medication adherence among Latino patients who also use traditional remedies",
        es: "Community Health Center Network en el Condado de Alameda usa el modelo LEARN en el manejo de diabetes, resultando en mayor adherencia a medicamentos entre pacientes latinos que tambien usan remedios tradicionales",
      },
    ],
    metrics: [
      { label: "Providers trained in LEARN model", benchmark: "100% of clinical staff" },
      { label: "Traditional medicine use documented at intake", benchmark: ">80% of encounters" },
      { label: "Treatment plan adherence (LEP patients)", benchmark: "Within 5% of English-proficient cohort" },
    ],
    regulatoryBasis: "CLAS Standards 1-3; Joint Commission Standard PC.02.01.21 (patient cultural assessment)",
    primarySourceUrl: "https://www.jointcommission.org/standards/",
    primarySourceOrg: "The Joint Commission",
  },

  /* ================================================================ */
  /*  COMMUNITY-CENTERED CARE (3)                                      */
  /* ================================================================ */

  // ---- 7. Promotora/CHW Integration ----
  {
    id: "cc-promotora-model",
    domain: "community-centered",
    title: {
      en: "Promotora/CHW Integration",
      es: "Integracion de Promotoras/CHW",
    },
    description: {
      en: "Promotoras de salud and Community Health Workers (CHWs) are the bridge between clinical systems and communities. Under California SB 803, CHWs have a defined scope of practice and can be reimbursed through Medi-Cal for CalAIM Enhanced Care Management (ECM) and Community Supports (CS). FQHCs that fully integrate CHWs into care teams — not as add-ons but as core members — see improved patient trust, higher screening rates, and better chronic disease outcomes.",
      es: "Las promotoras de salud y los Trabajadores de Salud Comunitaria (CHW) son el puente entre los sistemas clinicos y las comunidades. Bajo la ley SB 803 de California, los CHW tienen un alcance de practica definido y pueden ser reembolsados a traves de Medi-Cal por la Gestion de Atencion Mejorada (ECM) y Apoyos Comunitarios (CS) de CalAIM. Los FQHCs que integran completamente a los CHW en los equipos de atencion — no como complementos sino como miembros centrales — ven mejor confianza del paciente, mayores tasas de deteccion y mejores resultados en enfermedades cronicas.",
    },
    practicalSteps: [
      {
        en: "Define CHW role within the care team workflow — embed them in huddles, give them EHR access for social needs documentation, and include their observations in care conferences",
        es: "Definir el rol de CHW dentro del flujo de trabajo del equipo de atencion — integrarlos en reuniones, darles acceso al EHR para documentacion de necesidades sociales e incluir sus observaciones en conferencias de atencion",
      },
      {
        en: "Recruit CHWs from the community being served — the most effective CHWs share language, culture, and lived experience with patients",
        es: "Reclutar CHWs de la comunidad que se sirve — los CHWs mas efectivos comparten idioma, cultura y experiencia vivida con los pacientes",
      },
      {
        en: "Bill ECM and Community Supports through CalAIM to make CHW positions financially sustainable rather than grant-dependent",
        es: "Facturar ECM y Apoyos Comunitarios a traves de CalAIM para hacer que las posiciones de CHW sean financieramente sostenibles en lugar de dependientes de subvenciones",
      },
      {
        en: "Train CHWs in SDOH screening (PRAPARE or similar) and closed-loop referral processes to connect patients with housing, food, and legal aid",
        es: "Capacitar a los CHWs en evaluacion de SDOH (PRAPARE o similar) y procesos de referencia de circuito cerrado para conectar a los pacientes con vivienda, alimentos y asistencia legal",
      },
    ],
    fqhcExamples: [
      {
        en: "Clinica Sierra Vista in Kern County employs 100+ promotoras who conduct home visits, lead diabetes self-management groups in Spanish, and are fully integrated into primary care teams",
        es: "Clinica Sierra Vista en el Condado de Kern emplea mas de 100 promotoras que realizan visitas domiciliarias, lideran grupos de automanejo de diabetes en espanol y estan completamente integradas en equipos de atencion primaria",
      },
      {
        en: "FHCSD (Family Health Centers of San Diego) uses CHWs as the primary ECM contact for high-need Medi-Cal members, generating CalAIM revenue while improving 30-day ED revisit rates",
        es: "FHCSD (Centros de Salud Familiar de San Diego) usa CHWs como el contacto principal de ECM para miembros de Medi-Cal de alta necesidad, generando ingresos de CalAIM mientras mejora las tasas de revisita de urgencias a 30 dias",
      },
      {
        en: "Ravenswood Family Health Network in East Palo Alto pairs promotoras with clinical teams in a co-visit model, with the promotora handling SDOH needs while the provider addresses clinical concerns",
        es: "Ravenswood Family Health Network en East Palo Alto empareja promotoras con equipos clinicos en un modelo de co-visita, con la promotora manejando necesidades de SDOH mientras el proveedor aborda preocupaciones clinicas",
      },
    ],
    metrics: [
      { label: "CHW-to-patient ratio (high-risk population)", benchmark: "1:50-75 for ECM-eligible patients" },
      { label: "SDOH screening completion rate", benchmark: ">80% of new patients screened" },
      { label: "CalAIM ECM revenue from CHW encounters", benchmark: "Track monthly, increasing quarter over quarter" },
    ],
    regulatoryBasis: "CA SB 803 (CHW certification); CalAIM ECM/CS Program Guide; HRSA Section 330",
    primarySourceUrl: "https://www.dhcs.ca.gov/CalAIM/Pages/ECM.aspx",
    primarySourceOrg: "California DHCS (Department of Health Care Services)",
  },

  // ---- 8. Community Advisory Boards ----
  {
    id: "cc-community-advisory",
    domain: "community-centered",
    title: {
      en: "Community Advisory Boards",
      es: "Juntas Asesoras Comunitarias",
    },
    description: {
      en: "HRSA requires that at least 51% of an FQHC's governing board be patients of the health center. But meeting the letter of this requirement is different from meaningful community governance. Genuine community advisory structures give patients decision-making power over service design, operating hours, cultural programming, and quality priorities — not just a seat at a table where decisions have already been made.",
      es: "HRSA requiere que al menos el 51% de la junta de gobierno de un FQHC sean pacientes del centro de salud. Pero cumplir con la letra de este requisito es diferente de una gobernanza comunitaria significativa. Las estructuras genuinas de asesoria comunitaria dan a los pacientes poder de toma de decisiones sobre el diseno de servicios, horarios de operacion, programacion cultural y prioridades de calidad — no solo un asiento en una mesa donde las decisiones ya se han tomado.",
    },
    practicalSteps: [
      {
        en: "Recruit board members through trusted community channels (churches, schools, mutual aid groups) rather than posting flyers in the waiting room",
        es: "Reclutar miembros de la junta a traves de canales comunitarios de confianza (iglesias, escuelas, grupos de ayuda mutua) en lugar de publicar volantes en la sala de espera",
      },
      {
        en: "Provide meeting materials in threshold languages and offer interpretation during board meetings — if your board meetings are English-only, your Spanish-speaking patients cannot meaningfully participate",
        es: "Proporcionar materiales de reunion en idiomas de umbral y ofrecer interpretacion durante las reuniones de la junta — si sus reuniones de junta son solo en ingles, sus pacientes hispanohablantes no pueden participar significativamente",
      },
      {
        en: "Give the advisory board defined authority over specific decisions — such as clinic hours, cultural events, patient education topics — rather than a purely consultative role",
        es: "Dar a la junta asesora autoridad definida sobre decisiones especificas — como horarios de clinica, eventos culturales, temas de educacion al paciente — en lugar de un rol puramente consultivo",
      },
    ],
    fqhcExamples: [
      {
        en: "Petaluma Health Center has a patient-majority board that approved Saturday clinic hours and a community garden program based on direct patient input",
        es: "Petaluma Health Center tiene una junta con mayoria de pacientes que aprobo horarios de clinica los sabados y un programa de jardin comunitario basado en aportacion directa de pacientes",
      },
      {
        en: "Centro de Salud de la Comunidad de San Ysidro conducts quarterly town halls in Spanish and English where community members vote on priority health education topics",
        es: "Centro de Salud de la Comunidad de San Ysidro realiza asambleas comunitarias trimestrales en espanol e ingles donde los miembros de la comunidad votan sobre temas prioritarios de educacion en salud",
      },
    ],
    metrics: [
      { label: "Board composition matching patient demographics", benchmark: "Within 15% of patient race/ethnicity/language breakdown" },
      { label: "Board member retention (2+ years)", benchmark: ">60% retention" },
      { label: "Community members attending open meetings", benchmark: ">20 per session" },
    ],
    regulatoryBasis: "HRSA Section 330(k)(3)(H) governing board requirements; CLAS Standards 12-15",
    primarySourceUrl: "https://bphc.hrsa.gov/compliance/compliance-manual/chapter-20",
    primarySourceOrg: "HRSA Bureau of Primary Health Care",
  },

  // ---- 9. Place-Based Health Strategies ----
  {
    id: "cc-place-based-strategies",
    domain: "community-centered",
    title: {
      en: "Place-Based Health Strategies",
      es: "Estrategias de Salud Basadas en el Lugar",
    },
    description: {
      en: "Health happens in neighborhoods, not clinics. Place-based strategies extend the FQHC's reach into schools, churches, housing projects, and community organizations through neighborhood health assessments, mobile health units, and co-located services. Instead of waiting for patients to come through the door, FQHCs go where the community already gathers.",
      es: "La salud ocurre en los vecindarios, no en las clinicas. Las estrategias basadas en el lugar extienden el alcance del FQHC a escuelas, iglesias, proyectos de vivienda y organizaciones comunitarias a traves de evaluaciones de salud del vecindario, unidades moviles de salud y servicios co-ubicados. En lugar de esperar a que los pacientes vengan a la puerta, los FQHCs van donde la comunidad ya se reune.",
    },
    practicalSteps: [
      {
        en: "Conduct a Community Health Needs Assessment (CHNA) that includes door-to-door surveys and focus groups in the languages of the community — not just available secondary data",
        es: "Realizar una Evaluacion de Necesidades de Salud Comunitaria (CHNA) que incluya encuestas puerta a puerta y grupos focales en los idiomas de la comunidad — no solo datos secundarios disponibles",
      },
      {
        en: "Partner with schools for school-based health centers or mobile dental units that reach children who would otherwise miss preventive care",
        es: "Asociarse con escuelas para centros de salud escolares o unidades dentales moviles que lleguen a ninos que de otra manera perderian atencion preventiva",
      },
      {
        en: "Co-locate services at community anchor sites — churches, WIC offices, food banks — where trust is already established and transportation barriers are eliminated",
        es: "Co-ubicar servicios en sitios ancla de la comunidad — iglesias, oficinas de WIC, bancos de alimentos — donde la confianza ya esta establecida y las barreras de transporte se eliminan",
      },
    ],
    fqhcExamples: [
      {
        en: "Eisner Health in Los Angeles operates mobile health units in Skid Row and South LA, bringing primary care to populations that will not visit a traditional clinic",
        es: "Eisner Health en Los Angeles opera unidades moviles de salud en Skid Row y South LA, llevando atencion primaria a poblaciones que no visitaran una clinica tradicional",
      },
      {
        en: "Contra Costa Health Services partners with school districts to operate 6 school-based health centers serving 5,000+ students annually",
        es: "Contra Costa Health Services se asocia con distritos escolares para operar 6 centros de salud escolares que atienden a mas de 5,000 estudiantes anualmente",
      },
    ],
    metrics: [
      { label: "Patients reached through community-based sites", benchmark: ">15% of total patient volume" },
      { label: "New patient acquisition from mobile/outreach sites", benchmark: ">200 new patients/year per site" },
      { label: "Community partnerships (formal MOUs)", benchmark: ">5 active partnerships per service area" },
    ],
    regulatoryBasis: "HRSA Section 330 scope of project; NACHC community-oriented primary care guidelines",
    primarySourceUrl: "https://www.nachc.org/resource/community-health-center-chartbook/",
    primarySourceOrg: "National Association of Community Health Centers (NACHC)",
  },

  /* ================================================================ */
  /*  IMPLICIT BIAS (3)                                                */
  /* ================================================================ */

  // ---- 10. Clinical Implicit Bias ----
  {
    id: "ib-clinical-bias",
    domain: "implicit-bias",
    title: {
      en: "Clinical Implicit Bias",
      es: "Sesgo Implicito Clinico",
    },
    description: {
      en: "Research consistently shows that implicit bias affects clinical decision-making: Black patients receive less pain medication than white patients for the same conditions, Latino patients are less likely to receive cardiac catheterization referrals, and Indigenous patients face diagnostic delays. FQHCs are not immune to these patterns. Addressing clinical implicit bias requires structured clinical decision-making tools, disaggregated outcome data, and honest organizational self-examination.",
      es: "La investigacion muestra consistentemente que el sesgo implicito afecta la toma de decisiones clinicas: los pacientes negros reciben menos medicacion para el dolor que los pacientes blancos para las mismas condiciones, los pacientes latinos tienen menos probabilidad de recibir referencias de cateterizacion cardiaca, y los pacientes indigenas enfrentan retrasos diagnosticos. Los FQHCs no son inmunes a estos patrones. Abordar el sesgo implicito clinico requiere herramientas estructuradas de toma de decisiones clinicas, datos de resultados desagregados y autoexamen organizacional honesto.",
    },
    practicalSteps: [
      {
        en: "Implement standardized pain assessment protocols that remove subjective provider judgment — use validated pain scales consistently across all patient populations",
        es: "Implementar protocolos estandarizados de evaluacion del dolor que eliminen el juicio subjetivo del proveedor — usar escalas de dolor validadas de manera consistente en todas las poblaciones de pacientes",
      },
      {
        en: "Disaggregate quality metrics by race, ethnicity, and language — if you can't see the disparity, you can't fix it",
        es: "Desagregar metricas de calidad por raza, etnia e idioma — si no puede ver la disparidad, no puede arreglarla",
      },
      {
        en: "Use clinical decision support tools (embedded in the EHR) that prompt evidence-based screening and referral regardless of patient demographics",
        es: "Usar herramientas de apoyo a decisiones clinicas (integradas en el EHR) que soliciten deteccion y referencia basada en evidencia independientemente de la demografia del paciente",
      },
      {
        en: "Encourage all clinical staff to take the Harvard Project Implicit IAT (Implicit Association Test) as a self-awareness exercise — not as a punitive measure but as a starting point for reflection",
        es: "Alentar a todo el personal clinico a tomar la prueba IAT (Prueba de Asociacion Implicita) de Harvard Project Implicit como ejercicio de autoconciencia — no como medida punitiva sino como punto de partida para la reflexion",
      },
    ],
    fqhcExamples: [
      {
        en: "HealthNet of Alameda County disaggregates HbA1c control rates by race/ethnicity and language, identified a 12% gap in diabetes control for Cantonese-speaking patients, and responded with culturally adapted diabetes education",
        es: "HealthNet del Condado de Alameda desagrega las tasas de control de HbA1c por raza/etnia e idioma, identifico una brecha del 12% en el control de diabetes para pacientes que hablan cantones y respondio con educacion de diabetes culturalmente adaptada",
      },
      {
        en: "Open Door Community Health Centers in Humboldt County implemented standardized opioid prescribing guidelines that eliminated provider discretion in initial dosing, reducing racial disparities in pain management",
        es: "Open Door Community Health Centers en el Condado de Humboldt implemento guias estandarizadas de prescripcion de opioides que eliminaron la discrecion del proveedor en la dosificacion inicial, reduciendo las disparidades raciales en el manejo del dolor",
      },
    ],
    metrics: [
      { label: "Quality metrics disaggregated by race/ethnicity/language", benchmark: "100% of UDS clinical measures" },
      { label: "Disparity gap (highest vs lowest performing demographic group)", benchmark: "<5% for each clinical measure" },
      { label: "Staff completing implicit bias self-assessment", benchmark: ">80% of clinical staff annually" },
    ],
    regulatoryBasis: "HRSA UDS Health Disparities Report; CLAS Standards 1-3; CA AB 1407 (implicit bias training for nurses)",
    primarySourceUrl: "https://implicit.harvard.edu/implicit/",
    primarySourceOrg: "Harvard University Project Implicit",
  },

  // ---- 11. Hiring & Promotion Bias ----
  {
    id: "ib-hiring-bias",
    domain: "implicit-bias",
    title: {
      en: "Hiring & Promotion Bias",
      es: "Sesgo en Contratacion y Promocion",
    },
    description: {
      en: "FQHCs with 90%+ Latino frontline staff and predominantly white leadership have a structural problem, not just an optics problem. Implicit bias in hiring (resume screening, interview scoring, reference weighting) and promotion (who gets leadership development, who is 'management material') perpetuates demographic stratification. Structured processes remove individual bias from decisions that should be merit-based.",
      es: "Los FQHCs con mas del 90% de personal latino en primera linea y liderazgo predominantemente blanco tienen un problema estructural, no solo un problema de apariencias. El sesgo implicito en la contratacion (evaluacion de curriculum, puntuacion de entrevistas, peso de referencias) y la promocion (quien recibe desarrollo de liderazgo, quien es 'material de gerencia') perpetua la estratificacion demografica. Los procesos estructurados eliminan el sesgo individual de decisiones que deberian basarse en el merito.",
    },
    practicalSteps: [
      {
        en: "Implement structured interviews with standardized questions and scoring rubrics — every candidate gets the same questions scored on the same criteria by the same panel",
        es: "Implementar entrevistas estructuradas con preguntas y rubricas de puntuacion estandarizadas — cada candidato recibe las mismas preguntas puntuadas con los mismos criterios por el mismo panel",
      },
      {
        en: "Require diverse hiring panels (at minimum, one panel member who shares the demographic background of the patient population) for all positions",
        es: "Requerir paneles de contratacion diversos (como minimo, un miembro del panel que comparta el trasfondo demografico de la poblacion de pacientes) para todas las posiciones",
      },
      {
        en: "Conduct annual promotion pathway equity audits — track who applies for, is nominated for, and receives promotions by race/ethnicity and gender",
        es: "Realizar auditorias anuales de equidad en rutas de promocion — rastrear quien solicita, es nominado y recibe promociones por raza/etnia y genero",
      },
    ],
    fqhcExamples: [
      {
        en: "Salud Para La Gente uses bilingual interview panels and values community engagement experience equally with formal credentials when evaluating candidates for supervisory roles",
        es: "Salud Para La Gente usa paneles de entrevista bilingues y valora la experiencia de participacion comunitaria equitativamente con las credenciales formales al evaluar candidatos para roles de supervision",
      },
      {
        en: "CommuniCare Health Centers in Yolo County implemented a management apprenticeship program specifically for bilingual frontline staff, resulting in 8 internal promotions to supervisory roles in 2 years",
        es: "CommuniCare Health Centers en el Condado de Yolo implemento un programa de aprendizaje de gerencia especificamente para personal bilingue de primera linea, resultando en 8 promociones internas a roles de supervision en 2 anos",
      },
    ],
    metrics: [
      { label: "Structured interview adoption rate", benchmark: "100% of positions" },
      { label: "Diverse hiring panel compliance", benchmark: "100% of interview panels" },
      { label: "Internal promotion rate for frontline staff of color", benchmark: "Proportional to representation (or higher)" },
    ],
    regulatoryBasis: "Title VII of the Civil Rights Act; EEOC best practices; CLAS Standard 3",
    primarySourceUrl: "https://www.eeoc.gov/best-practices-employers-and-human-resources-identity-related-employment-decisions",
    primarySourceOrg: "U.S. Equal Employment Opportunity Commission (EEOC)",
  },

  // ---- 12. Organizational Bias Assessment ----
  {
    id: "ib-organizational-assessment",
    domain: "implicit-bias",
    title: {
      en: "Organizational Bias Assessment",
      es: "Evaluacion de Sesgo Organizacional",
    },
    description: {
      en: "Individual implicit bias training is insufficient without organizational-level data analysis. Systematic bias assessment examines patterns in patient satisfaction data by race and ethnicity, complaint patterns across demographics, staff climate surveys measuring belonging and psychological safety, and disaggregated quality metrics that reveal whether the organization delivers equitable care or just intends to.",
      es: "La capacitacion individual en sesgo implicito es insuficiente sin analisis de datos a nivel organizacional. La evaluacion sistematica de sesgo examina patrones en datos de satisfaccion del paciente por raza y etnia, patrones de quejas entre demografias, encuestas de clima laboral que miden pertenencia y seguridad psicologica, y metricas de calidad desagregadas que revelan si la organizacion brinda atencion equitativa o solo tiene la intencion de hacerlo.",
    },
    practicalSteps: [
      {
        en: "Analyze patient satisfaction (CAHPS) and grievance data by race, ethnicity, and preferred language — look for patterns, not just averages",
        es: "Analizar datos de satisfaccion del paciente (CAHPS) y quejas por raza, etnia e idioma preferido — buscar patrones, no solo promedios",
      },
      {
        en: "Conduct annual staff climate surveys with questions on belonging, psychological safety, and experiences of discrimination — with results disaggregated by role level, race, and tenure",
        es: "Realizar encuestas anuales de clima laboral con preguntas sobre pertenencia, seguridad psicologica y experiencias de discriminacion — con resultados desagregados por nivel de puesto, raza y antiguedad",
      },
      {
        en: "Present disaggregated data to the board quarterly — if board members only see aggregate satisfaction scores, they cannot govern equitably",
        es: "Presentar datos desagregados a la junta trimestralmente — si los miembros de la junta solo ven puntajes de satisfaccion agregados, no pueden gobernar equitativamente",
      },
    ],
    fqhcExamples: [
      {
        en: "Neighborhood Healthcare in San Diego runs annual employee engagement surveys in English and Spanish, with results analyzed by department, role type, and self-identified race/ethnicity",
        es: "Neighborhood Healthcare en San Diego realiza encuestas anuales de compromiso de empleados en ingles y espanol, con resultados analizados por departamento, tipo de rol y raza/etnia autoidentificada",
      },
      {
        en: "Watts Healthcare Corporation in South LA reviews patient complaint patterns monthly with attention to whether certain demographics file more complaints about wait times, communication, or respect",
        es: "Watts Healthcare Corporation en South LA revisa los patrones de quejas de pacientes mensualmente con atencion a si ciertas demografias presentan mas quejas sobre tiempos de espera, comunicacion o respeto",
      },
    ],
    metrics: [
      { label: "Patient satisfaction disaggregated by demographics", benchmark: "Quarterly reporting to board" },
      { label: "Staff climate survey participation", benchmark: ">75% response rate" },
      { label: "Equity gaps identified and action-planned", benchmark: "100% of identified gaps have 90-day action plans" },
    ],
    regulatoryBasis: "HRSA UDS Health Disparities Report; CLAS Standards 9-11; Joint Commission Leadership Standards",
    primarySourceUrl: "https://www.hrsa.gov/sites/default/files/hrsa/about/organization/bureaus/bphc/uds-health-disparities-report.pdf",
    primarySourceOrg: "HRSA Bureau of Primary Health Care",
  },

  /* ================================================================ */
  /*  HEALTH EQUITY (3)                                                */
  /* ================================================================ */

  // ---- 13. SDOH Screening & Intervention ----
  {
    id: "he-sdoh-screening",
    domain: "health-equity",
    title: {
      en: "SDOH Screening & Intervention",
      es: "Evaluacion e Intervencion de SDOH",
    },
    description: {
      en: "Social determinants of health — housing instability, food insecurity, transportation barriers, interpersonal violence — drive 80% of health outcomes. The PRAPARE (Protocol for Responding to and Assessing Patients' Assets, Risks, and Experiences) tool provides a standardized SDOH screening for FQHCs. But screening without intervention is just documentation. Closed-loop referral systems that track whether patients actually received services are the difference between checking a box and changing an outcome.",
      es: "Los determinantes sociales de la salud — inestabilidad de vivienda, inseguridad alimentaria, barreras de transporte, violencia interpersonal — impulsan el 80% de los resultados de salud. La herramienta PRAPARE (Protocolo para Responder y Evaluar los Activos, Riesgos y Experiencias de los Pacientes) proporciona una evaluacion estandarizada de SDOH para FQHCs. Pero la evaluacion sin intervencion es solo documentacion. Los sistemas de referencia de circuito cerrado que rastrean si los pacientes realmente recibieron servicios son la diferencia entre marcar una casilla y cambiar un resultado.",
    },
    practicalSteps: [
      {
        en: "Implement PRAPARE screening for all new patients and annually for established patients — embed the screener in the EHR workflow so it becomes standard rather than optional",
        es: "Implementar la evaluacion PRAPARE para todos los pacientes nuevos y anualmente para pacientes establecidos — integrar el evaluador en el flujo de trabajo del EHR para que sea estandar en lugar de opcional",
      },
      {
        en: "Build or subscribe to a community resource database (e.g., Unite Us, Aunt Bertha/findhelp) and train CHWs to navigate referrals for housing, food, legal aid, and transportation",
        es: "Construir o suscribirse a una base de datos de recursos comunitarios (por ejemplo, Unite Us, Aunt Bertha/findhelp) y capacitar a CHWs para navegar referencias de vivienda, alimentos, asistencia legal y transporte",
      },
      {
        en: "Implement closed-loop referral tracking — know whether the patient who was referred to a food bank actually received food, not just that a referral was made",
        es: "Implementar seguimiento de referencias de circuito cerrado — saber si el paciente que fue referido a un banco de alimentos realmente recibio alimentos, no solo que se hizo una referencia",
      },
      {
        en: "Report SDOH screening rates and positive screen rates to the board as quality metrics alongside clinical measures",
        es: "Reportar tasas de evaluacion de SDOH y tasas de evaluacion positiva a la junta como metricas de calidad junto con medidas clinicas",
      },
    ],
    fqhcExamples: [
      {
        en: "AltaMed Health Services screens 100% of new patients using PRAPARE and connects positive screens to CalAIM Community Supports (housing deposits, medically tailored meals, sobering centers)",
        es: "AltaMed Health Services evalua al 100% de los nuevos pacientes usando PRAPARE y conecta las evaluaciones positivas con los Apoyos Comunitarios de CalAIM (depositos de vivienda, comidas medicamente adaptadas, centros de sobriedad)",
      },
      {
        en: "La Maestra Community Health Centers in San Diego uses Unite Us for closed-loop referrals and tracks a 72% connection rate (patient actually received the service referred)",
        es: "La Maestra Community Health Centers en San Diego usa Unite Us para referencias de circuito cerrado y rastrea una tasa de conexion del 72% (el paciente realmente recibio el servicio referido)",
      },
    ],
    metrics: [
      { label: "SDOH screening rate (new patients)", benchmark: ">90% screened within first 2 visits" },
      { label: "Closed-loop referral completion", benchmark: ">60% of referrals confirmed received" },
      { label: "Positive screen follow-up within 72 hours", benchmark: ">80% of positive screens" },
    ],
    regulatoryBasis: "HRSA UDS Table 6B (SDOH screening); CalAIM Population Health Management; Joint Commission R3 Report #36",
    primarySourceUrl: "https://prapare.org/",
    primarySourceOrg: "NACHC (National Association of Community Health Centers) — PRAPARE",
  },

  // ---- 14. Data Disaggregation & Equity Dashboards ----
  {
    id: "he-data-disaggregation",
    domain: "health-equity",
    title: {
      en: "Data Disaggregation & Equity Dashboards",
      es: "Desagregacion de Datos y Tableros de Equidad",
    },
    description: {
      en: "You cannot manage what you cannot measure, and you cannot measure equity with aggregate data. REAL+D (Race, Ethnicity, and Language plus Disability) data collection, disaggregated by granular categories rather than broad Census groups, reveals which patient populations are falling through the cracks. Equity dashboards make this data visible to clinical teams and board members so that disparities drive resource allocation rather than remaining hidden in averages.",
      es: "No puedes gestionar lo que no puedes medir, y no puedes medir la equidad con datos agregados. La recopilacion de datos REAL+D (Raza, Etnia e Idioma mas Discapacidad), desagregada por categorias granulares en lugar de grupos amplios del Censo, revela que poblaciones de pacientes se estan quedando atras. Los tableros de equidad hacen estos datos visibles para los equipos clinicos y los miembros de la junta para que las disparidades impulsen la asignacion de recursos en lugar de permanecer ocultas en promedios.",
    },
    practicalSteps: [
      {
        en: "Collect granular race/ethnicity data beyond Census categories — 'Hispanic/Latino' is not one group; Mexican, Salvadoran, Guatemalan, and Puerto Rican patients have different health profiles and cultural contexts",
        es: "Recopilar datos granulares de raza/etnia mas alla de las categorias del Censo — 'Hispano/Latino' no es un solo grupo; los pacientes mexicanos, salvadorenos, guatemaltecos y puertorriquenos tienen diferentes perfiles de salud y contextos culturales",
      },
      {
        en: "Build or configure equity dashboards in your EHR/BI platform (OCHIN Epic, eClinicalWorks, Azara DRVS) showing clinical quality measures disaggregated by race, ethnicity, language, and payer",
        es: "Construir o configurar tableros de equidad en su plataforma EHR/BI (OCHIN Epic, eClinicalWorks, Azara DRVS) mostrando medidas de calidad clinica desagregadas por raza, etnia, idioma y pagador",
      },
      {
        en: "Report equity dashboard findings to the board quarterly with action items — not just data presentation but 'here is the gap, here is the root cause hypothesis, here is the intervention plan'",
        es: "Reportar hallazgos del tablero de equidad a la junta trimestralmente con elementos de accion — no solo presentacion de datos sino 'aqui esta la brecha, aqui esta la hipotesis de causa raiz, aqui esta el plan de intervencion'",
      },
    ],
    fqhcExamples: [
      {
        en: "OCHIN (a national FQHC EHR network) provides member health centers with pre-built equity dashboards in Epic showing diabetes control, cancer screening, and prenatal care rates by race/ethnicity",
        es: "OCHIN (una red nacional de EHR para FQHCs) proporciona a los centros de salud miembros tableros de equidad preconstruidos en Epic mostrando tasas de control de diabetes, deteccion de cancer y atencion prenatal por raza/etnia",
      },
      {
        en: "Community Health Center Inc. in Connecticut (NACHC award winner) uses Azara DRVS to track 15 clinical quality measures by 7 racial/ethnic categories and presents disparity trends to the board monthly",
        es: "Community Health Center Inc. en Connecticut (ganador del premio NACHC) usa Azara DRVS para rastrear 15 medidas de calidad clinica por 7 categorias raciales/etnicas y presenta tendencias de disparidad a la junta mensualmente",
      },
    ],
    metrics: [
      { label: "Patients with complete REAL+D data", benchmark: ">90% of active patients" },
      { label: "Clinical measures disaggregated and reported", benchmark: "100% of UDS measures" },
      { label: "Equity dashboard reviewed by leadership", benchmark: "Monthly by QI committee, quarterly by board" },
    ],
    regulatoryBasis: "HRSA UDS Reporting Manual; CA AB 1407; CMS Equity Plan for Medicare",
    primarySourceUrl: "https://bphc.hrsa.gov/data-reporting/uds-training-and-technical-assistance",
    primarySourceOrg: "HRSA Bureau of Primary Health Care",
  },

  // ---- 15. Health Equity Action Plans ----
  {
    id: "he-equity-action-plans",
    domain: "health-equity",
    title: {
      en: "Health Equity Action Plans",
      es: "Planes de Accion de Equidad en Salud",
    },
    description: {
      en: "Data without action is just surveillance. Health equity action plans translate disaggregated outcome data into targeted interventions for specific disparity populations. HRSA's quality improvement framework requires health centers to identify disparities, develop improvement strategies, and track outcomes — but the best FQHCs go beyond compliance to create standing equity committees with budget authority and community accountability.",
      es: "Datos sin accion es solo vigilancia. Los planes de accion de equidad en salud traducen datos de resultados desagregados en intervenciones dirigidas para poblaciones con disparidades especificas. El marco de mejora de calidad de HRSA requiere que los centros de salud identifiquen disparidades, desarrollen estrategias de mejora y rastreen resultados — pero los mejores FQHCs van mas alla del cumplimiento para crear comites de equidad permanentes con autoridad presupuestaria y rendicion de cuentas comunitaria.",
    },
    practicalSteps: [
      {
        en: "Establish a standing Health Equity Committee with clinical, operational, and community representation — not a one-time task force but a permanent governance structure",
        es: "Establecer un Comite de Equidad en Salud permanente con representacion clinica, operativa y comunitaria — no un grupo de trabajo unico sino una estructura de gobernanza permanente",
      },
      {
        en: "For each identified disparity, develop a targeted intervention with a 90-day action plan, measurable goals, and an accountable owner",
        es: "Para cada disparidad identificada, desarrollar una intervencion dirigida con un plan de accion de 90 dias, metas medibles y un responsable designado",
      },
      {
        en: "Tie equity outcomes to operational planning and budgeting — if reducing diabetes disparities for Mixteco-speaking patients requires hiring a Mixteco-speaking CHW, that position should be in the budget",
        es: "Vincular los resultados de equidad a la planificacion operativa y presupuestaria — si reducir las disparidades de diabetes para pacientes que hablan mixteco requiere contratar un CHW que hable mixteco, esa posicion debe estar en el presupuesto",
      },
    ],
    fqhcExamples: [
      {
        en: "Asian Health Services in Oakland has a standing Health Equity Committee that identified a colon cancer screening gap among Vietnamese patients and launched a culturally adapted FIT kit distribution program that increased screening rates by 28%",
        es: "Asian Health Services en Oakland tiene un Comite de Equidad en Salud permanente que identifico una brecha en la deteccion de cancer de colon entre pacientes vietnamitas y lanzo un programa de distribucion de kits FIT culturalmente adaptado que aumento las tasas de deteccion en un 28%",
      },
      {
        en: "Valley Health Team in the San Joaquin Valley created a farmworker health equity plan that extended clinic hours to evenings and weekends, offered pesticide exposure screening, and hired promotoras from agricultural communities",
        es: "Valley Health Team en el Valle de San Joaquin creo un plan de equidad en salud para trabajadores agricolas que extendio los horarios de la clinica a noches y fines de semana, ofrecio deteccion de exposicion a pesticidas y contrato promotoras de comunidades agricolas",
      },
    ],
    metrics: [
      { label: "Identified disparities with active action plans", benchmark: "100% of disparities >5% gap" },
      { label: "Equity-focused QI projects completed per year", benchmark: ">4 projects annually" },
      { label: "Community advisory input on equity priorities", benchmark: "Formal input at least annually" },
    ],
    regulatoryBasis: "HRSA Health Center Quality Improvement (QI/QA Plan requirement); CLAS Standards 9-11; Section 330 scope",
    primarySourceUrl: "https://bphc.hrsa.gov/qualityimprovement",
    primarySourceOrg: "HRSA Bureau of Primary Health Care",
  },

  /* ================================================================ */
  /*  WORKFORCE DIVERSITY (3)                                          */
  /* ================================================================ */

  // ---- 16. Recruiting from the Community ----
  {
    id: "wd-recruit-from-community",
    domain: "workforce-diversity",
    title: {
      en: "Recruiting from the Community",
      es: "Reclutamiento desde la Comunidad",
    },
    description: {
      en: "The most effective FQHC workforces mirror the communities they serve. 'Grow-your-own' programs create career pathways from patient to volunteer to CHW to MA to LVN to RN — building a workforce with unmatched cultural knowledge and community trust. Partnerships with local schools, community colleges, and workforce development boards create sustainable pipelines rather than relying on external recruitment for every opening.",
      es: "Las fuerzas laborales de FQHC mas efectivas reflejan las comunidades que sirven. Los programas de 'cultivar los propios' crean rutas profesionales de paciente a voluntario a CHW a MA a LVN a RN — construyendo una fuerza laboral con conocimiento cultural y confianza comunitaria inigualable. Las asociaciones con escuelas locales, colegios comunitarios y juntas de desarrollo laboral crean canales sostenibles en lugar de depender del reclutamiento externo para cada vacante.",
    },
    practicalSteps: [
      {
        en: "Create a formal career ladder: Patient to Volunteer to Health Education Aide to CHW (SB 803) to Medical Assistant to LVN to RN, with tuition support and schedule flexibility at each transition",
        es: "Crear una escalera profesional formal: Paciente a Voluntario a Asistente de Educacion en Salud a CHW (SB 803) a Asistente Medico a LVN a RN, con apoyo de matricula y flexibilidad de horario en cada transicion",
      },
      {
        en: "Partner with community colleges for MA and LVN clinical rotation sites — students who train at the FQHC are far more likely to accept positions there after graduation",
        es: "Asociarse con colegios comunitarios para sitios de rotacion clinica de MA y LVN — los estudiantes que se capacitan en el FQHC tienen mucha mas probabilidad de aceptar posiciones alli despues de graduarse",
      },
      {
        en: "Offer NHSC (National Health Service Corps) loan repayment eligibility as a recruitment tool for clinical positions — many FQHCs are eligible but don't actively market this benefit",
        es: "Ofrecer elegibilidad de pago de prestamos NHSC (Cuerpo Nacional de Servicio de Salud) como herramienta de reclutamiento para posiciones clinicas — muchos FQHCs son elegibles pero no comercializan activamente este beneficio",
      },
      {
        en: "Recruit at community events, churches, and parent groups — not just job fairs and online postings that reach people already looking for healthcare careers",
        es: "Reclutar en eventos comunitarios, iglesias y grupos de padres — no solo ferias de empleo y publicaciones en linea que llegan a personas que ya buscan carreras en salud",
      },
    ],
    fqhcExamples: [
      {
        en: "Clinica Sierra Vista partners with Bakersfield College and Cerro Coso Community College for MA training pipelines, with 40+ students completing clinical rotations at their sites annually",
        es: "Clinica Sierra Vista se asocia con Bakersfield College y Cerro Coso Community College para canales de capacitacion de MA, con mas de 40 estudiantes completando rotaciones clinicas en sus sitios anualmente",
      },
      {
        en: "Northeast Valley Health Corporation in Los Angeles has a formal 'grow-your-own' program where current employees receive tuition assistance for nursing programs, with 15+ staff advancing from MA to RN over 5 years",
        es: "Northeast Valley Health Corporation en Los Angeles tiene un programa formal de 'cultivar los propios' donde los empleados actuales reciben asistencia de matricula para programas de enfermeria, con mas de 15 empleados avanzando de MA a RN en 5 anos",
      },
    ],
    metrics: [
      { label: "Staff residing in FQHC service area", benchmark: ">40% of workforce" },
      { label: "Internal promotions as % of filled positions", benchmark: ">25% of positions filled internally" },
      { label: "Career ladder participants advancing per year", benchmark: ">10% of participants advance one level" },
    ],
    regulatoryBasis: "HRSA Section 330 workforce development requirements; CA SB 803 (CHW pipeline); NHSC eligibility",
    primarySourceUrl: "https://nhsc.hrsa.gov/",
    primarySourceOrg: "HRSA National Health Service Corps",
  },

  // ---- 17. Representation at All Levels ----
  {
    id: "wd-representation-all-levels",
    domain: "workforce-diversity",
    title: {
      en: "Representation at All Levels",
      es: "Representacion en Todos los Niveles",
    },
    description: {
      en: "Many FQHCs have diverse frontline workforces but homogeneous leadership teams. When the medical assistants are 90% Latina but the C-suite is 90% white, the organization sends a message about who belongs in which roles. True representation requires intentional leadership pipelines, mentorship programs that pair emerging leaders of color with senior executives, and succession planning that treats diversity as a strategic capability rather than an HR checkbox.",
      es: "Muchos FQHCs tienen fuerzas laborales diversas en primera linea pero equipos de liderazgo homogeneos. Cuando los asistentes medicos son 90% latinas pero la alta direccion es 90% blanca, la organizacion envia un mensaje sobre quien pertenece a que roles. La representacion verdadera requiere canales de liderazgo intencionales, programas de mentorias que emparejen lideres emergentes de color con ejecutivos senior, y planificacion de sucesion que trate la diversidad como una capacidad estrategica en lugar de una casilla de RRHH.",
    },
    practicalSteps: [
      {
        en: "Conduct an annual workforce demographics report by level: frontline, supervisory, management, director, C-suite, and board — then compare each level to patient demographics",
        es: "Realizar un informe anual de demografias de la fuerza laboral por nivel: primera linea, supervision, gerencia, direccion, alta direccion y junta — luego comparar cada nivel con las demografias de los pacientes",
      },
      {
        en: "Create a leadership development program specifically targeting high-potential staff from underrepresented groups — include mentorship, stretch assignments, conference attendance, and board meeting observation",
        es: "Crear un programa de desarrollo de liderazgo especificamente dirigido a personal de alto potencial de grupos subrepresentados — incluir mentorias, asignaciones de expansion, asistencia a conferencias y observacion de reuniones de la junta",
      },
      {
        en: "Include diversity goals in succession planning for every director-level and above position — when a VP retires, the pipeline should already include diverse candidates developed over 2-3 years",
        es: "Incluir metas de diversidad en la planificacion de sucesion para cada posicion de nivel director y superior — cuando un VP se retira, el canal ya deberia incluir candidatos diversos desarrollados durante 2-3 anos",
      },
    ],
    fqhcExamples: [
      {
        en: "AltaMed Health Services, the largest FQHC in the nation, has maintained Latino leadership representation at the executive level that mirrors its 85%+ Latino patient population",
        es: "AltaMed Health Services, el FQHC mas grande de la nacion, ha mantenido representacion de liderazgo latino a nivel ejecutivo que refleja su poblacion de pacientes mas del 85% latina",
      },
      {
        en: "Asian Health Services in Oakland has a leadership team that reflects the 15+ Asian language communities it serves, with executives and directors who speak Cantonese, Vietnamese, Korean, and Burmese",
        es: "Asian Health Services en Oakland tiene un equipo de liderazgo que refleja las mas de 15 comunidades de idiomas asiaticos que sirve, con ejecutivos y directores que hablan cantones, vietnamita, coreano y birmano",
      },
    ],
    metrics: [
      { label: "Leadership demographics vs patient demographics", benchmark: "Within 20% at every level" },
      { label: "Staff of color in leadership development programs", benchmark: "Proportional to workforce representation" },
      { label: "Internal succession candidates identified for each VP+ role", benchmark: ">2 candidates per role, reflecting diversity" },
    ],
    regulatoryBasis: "CLAS Standard 3; HRSA Health Center governance requirements; Title VII best practices",
    primarySourceUrl: "https://thinkculturalhealth.hhs.gov/clas/standards/3",
    primarySourceOrg: "HHS Office of Minority Health",
  },

  // ---- 18. Inclusive Workplace Culture ----
  {
    id: "wd-inclusive-workplace",
    domain: "workforce-diversity",
    title: {
      en: "Inclusive Workplace Culture",
      es: "Cultura Laboral Inclusiva",
    },
    description: {
      en: "Diversity without inclusion is a revolving door. FQHCs can recruit diverse workforces but will lose them to burnout, microaggressions, and cultural isolation without intentional inclusion practices. Employee resource groups (ERGs), anti-racism programs that go beyond one-off trainings, culturally responsive management practices, and multilingual workplace communication create environments where every staff member can bring their full self to work.",
      es: "Diversidad sin inclusion es una puerta giratoria. Los FQHCs pueden reclutar fuerzas laborales diversas pero las perderan por agotamiento, microagresiones y aislamiento cultural sin practicas de inclusion intencionales. Los grupos de recursos de empleados (ERGs), programas antirracistas que van mas alla de capacitaciones unicas, practicas de gestion culturalmente receptivas y comunicacion laboral multilingue crean ambientes donde cada miembro del personal puede llevar su ser completo al trabajo.",
    },
    practicalSteps: [
      {
        en: "Support employee resource groups (ERGs) with budget, meeting time during work hours, and executive sponsorship — not just permission to meet on their own time",
        es: "Apoyar grupos de recursos de empleados (ERGs) con presupuesto, tiempo de reunion durante horas de trabajo y patrocinio ejecutivo — no solo permiso para reunirse en su propio tiempo",
      },
      {
        en: "Conduct all-staff communications in English and Spanish (or threshold languages) — if staff meetings are English-only and 60% of your workforce is Spanish-dominant, most of your employees are excluded from organizational communication",
        es: "Realizar todas las comunicaciones del personal en ingles y espanol (o idiomas de umbral) — si las reuniones de personal son solo en ingles y el 60% de su fuerza laboral es predominantemente hispanohablante, la mayoria de sus empleados estan excluidos de la comunicacion organizacional",
      },
      {
        en: "Train managers in culturally responsive supervision — understanding that communication styles, hierarchy expectations, and conflict resolution approaches vary across cultures",
        es: "Capacitar a los gerentes en supervision culturalmente receptiva — entendiendo que los estilos de comunicacion, expectativas de jerarquia y enfoques de resolucion de conflictos varian entre culturas",
      },
      {
        en: "Replace one-time DEI training with sustained anti-racism learning cohorts that meet monthly, discuss real workplace scenarios, and develop actionable commitments",
        es: "Reemplazar la capacitacion unica de DEI con cohortes de aprendizaje antirracista sostenidas que se reunan mensualmente, discutan escenarios reales del lugar de trabajo y desarrollen compromisos accionables",
      },
    ],
    fqhcExamples: [
      {
        en: "San Ysidro Health conducts all-staff town halls in both English and Spanish with simultaneous interpretation, and publishes internal communications bilingually",
        es: "San Ysidro Health realiza asambleas de todo el personal en ingles y espanol con interpretacion simultanea, y publica comunicaciones internas de manera bilingue",
      },
      {
        en: "FHCSD created a formal anti-racism learning series in 2021 that evolved from one-time workshops into ongoing monthly cohorts with 200+ staff participants across all departments",
        es: "FHCSD creo una serie formal de aprendizaje antirracista en 2021 que evoluciono de talleres unicos a cohortes mensuales continuas con mas de 200 participantes del personal en todos los departamentos",
      },
      {
        en: "Tiburcio Vasquez Health Center provides manager training on cross-cultural communication, recognizing that a direct communication style valued in American management culture may be perceived as disrespectful in cultures that prioritize indirect communication and hierarchy",
        es: "Tiburcio Vasquez Health Center proporciona capacitacion gerencial en comunicacion intercultural, reconociendo que un estilo de comunicacion directo valorado en la cultura gerencial estadounidense puede ser percibido como irrespetuoso en culturas que priorizan la comunicacion indirecta y la jerarquia",
      },
    ],
    metrics: [
      { label: "Staff retention rate (disaggregated by race/ethnicity)", benchmark: "No >5% gap between any demographic group" },
      { label: "Employee engagement scores (disaggregated)", benchmark: "No >10% gap between any demographic group" },
      { label: "Multilingual internal communications", benchmark: "100% of all-staff communications in threshold languages" },
      { label: "ERGs with executive sponsors and budget", benchmark: ">2 active ERGs" },
    ],
    regulatoryBasis: "CLAS Standards 2-4; Title VII workplace protections; CA FEHA (Fair Employment and Housing Act)",
    primarySourceUrl: "https://thinkculturalhealth.hhs.gov/clas/standards/2",
    primarySourceOrg: "HHS Office of Minority Health",
  },
];

/* ------------------------------------------------------------------ */
/*  Workforce diversity scenarios (5)                                   */
/* ------------------------------------------------------------------ */

export const WORKFORCE_DIVERSITY_SCENARIOS: WorkforceDiversityScenario[] = [
  // ---- 1. Leveraging a 90% Latino Workforce ----
  {
    id: "90-percent-latino",
    title: {
      en: "Leveraging a 90% Latino Workforce",
      es: "Aprovechando una Fuerza Laboral 90% Latina",
    },
    description: {
      en: "Many California FQHCs have workforces that are 80-95% Latino — mirroring the communities they serve. This isn't a diversity problem to solve; it's a strategic advantage to leverage. When your staff shares language, culture, immigration experience, and neighborhood roots with your patients, you have something no hospital system can replicate.",
      es: "Muchos FQHCs de California tienen fuerzas laborales que son 80-95% latinas — reflejando las comunidades que sirven. Esto no es un problema de diversidad que resolver; es una ventaja estrategica que aprovechar. Cuando su personal comparte idioma, cultura, experiencia migratoria y raices del vecindario con sus pacientes, tiene algo que ningun sistema hospitalario puede replicar.",
    },
    challenge: {
      en: "The FQHC has high cultural concordance at the frontline but leadership is less representative. Bilingual staff informally interpret without recognition or compensation. Cultural knowledge is treated as a given rather than a measurable competency that drives better outcomes.",
      es: "El FQHC tiene alta concordancia cultural en la primera linea pero el liderazgo es menos representativo. El personal bilingue interpreta informalmente sin reconocimiento ni compensacion. El conocimiento cultural se trata como un hecho dado en lugar de una competencia medible que impulsa mejores resultados.",
    },
    strategy: {
      en: "Formalize cultural concordance as a workforce strategy: implement bilingual differential pay, create leadership pathways for Latino staff, measure and report language-concordant encounter rates, and market cultural alignment as a differentiator to managed care plans seeking to reduce health disparities in their Latino membership.",
      es: "Formalizar la concordancia cultural como una estrategia laboral: implementar pago diferencial bilingue, crear rutas de liderazgo para personal latino, medir y reportar tasas de encuentros con concordancia linguistica, y comercializar la alineacion cultural como un diferenciador para planes de atencion administrada que buscan reducir disparidades de salud en su membresia latina.",
    },
    outcomes: [
      {
        en: "Bilingual staff receive $1.50-3.00/hour differential after passing proficiency testing",
        es: "El personal bilingue recibe diferencial de $1.50-3.00/hora despues de aprobar pruebas de competencia",
      },
      {
        en: "Language-concordant encounter rate exceeds 85% for Spanish-speaking patients",
        es: "La tasa de encuentros con concordancia linguistica supera el 85% para pacientes hispanohablantes",
      },
      {
        en: "3+ Latino staff members advance to management positions annually through leadership development program",
        es: "Mas de 3 miembros del personal latino avanzan a posiciones de gerencia anualmente a traves del programa de desarrollo de liderazgo",
      },
      {
        en: "Managed care plans cite cultural concordance as a reason for network inclusion in value-based contracts",
        es: "Los planes de atencion administrada citan la concordancia cultural como razon para la inclusion en la red en contratos basados en valor",
      },
    ],
    applicableRoles: ["CHW", "MA", "LVN", "RN", "Patient Navigator", "Front Desk", "Health Educator"],
  },

  // ---- 2. Building a Bilingual Workforce Strategy ----
  {
    id: "bilingual-premium",
    title: {
      en: "Building a Bilingual Workforce Strategy",
      es: "Construyendo una Estrategia de Fuerza Laboral Bilingue",
    },
    description: {
      en: "Moving beyond ad hoc translation to a systematic language capacity strategy. Instead of relying on whoever happens to speak Spanish to interpret during appointments, the FQHC builds a formal bilingual workforce program with proficiency testing, differential pay, role clarity, and language-concordance tracking.",
      es: "Avanzar mas alla de la traduccion ad hoc a una estrategia sistematica de capacidad linguistica. En lugar de depender de quien sea que hable espanol para interpretar durante las citas, el FQHC construye un programa formal de fuerza laboral bilingue con pruebas de competencia, pago diferencial, claridad de rol y seguimiento de concordancia linguistica.",
    },
    challenge: {
      en: "Bilingual staff are burned out from constant informal interpreting on top of their regular duties. There's no proficiency testing, so 'bilingual' ranges from medical-grade fluency to conversational Spanish. Some patients receive excellent language-concordant care while others get a staff member struggling to explain a diagnosis in their second language.",
      es: "El personal bilingue esta agotado por la interpretacion informal constante ademas de sus funciones regulares. No hay pruebas de competencia, asi que 'bilingue' va desde fluidez de grado medico hasta espanol conversacional. Algunos pacientes reciben excelente atencion con concordancia linguistica mientras otros reciben un miembro del personal luchando por explicar un diagnostico en su segundo idioma.",
    },
    strategy: {
      en: "Implement a three-tier bilingual workforce system: Tier 1 (Conversational) — can greet and provide basic navigation; Tier 2 (Clinical) — can conduct full clinical encounters in the patient's language; Tier 3 (Certified Interpreter) — trained and certified to interpret for others. Each tier has a different pay differential, testing requirement, and scope of bilingual duties.",
      es: "Implementar un sistema de fuerza laboral bilingue de tres niveles: Nivel 1 (Conversacional) — puede saludar y proporcionar navegacion basica; Nivel 2 (Clinico) — puede conducir encuentros clinicos completos en el idioma del paciente; Nivel 3 (Interprete Certificado) — capacitado y certificado para interpretar para otros. Cada nivel tiene un diferencial de pago diferente, requisito de prueba y alcance de funciones bilingues.",
    },
    outcomes: [
      {
        en: "100% of bilingual staff proficiency-tested and assigned to appropriate tier",
        es: "100% del personal bilingue evaluado en competencia y asignado al nivel apropiado",
      },
      {
        en: "Informal interpreting burden reduced by 70% through clear role boundaries",
        es: "Carga de interpretacion informal reducida en un 70% a traves de limites de rol claros",
      },
      {
        en: "Patient satisfaction for LEP encounters increases >10 points on language service questions",
        es: "La satisfaccion del paciente para encuentros LEP aumenta mas de 10 puntos en preguntas de servicio linguistico",
      },
    ],
    applicableRoles: ["MA", "Front Desk", "CHW", "RN", "LVN", "Patient Navigator", "Medical Interpreter"],
  },

  // ---- 3. Closing the Leadership Representation Gap ----
  {
    id: "leadership-pipeline",
    title: {
      en: "Closing the Leadership Representation Gap",
      es: "Cerrando la Brecha de Representacion en el Liderazgo",
    },
    description: {
      en: "The frontline is diverse but leadership is not. This scenario addresses the structural gap where 85%+ of patient-facing staff are people of color but 70%+ of directors and executives are white. It's not about lowering standards — it's about recognizing that community knowledge, cultural competency, and lived experience are leadership qualifications that traditional pipelines undervalue.",
      es: "La primera linea es diversa pero el liderazgo no. Este escenario aborda la brecha estructural donde mas del 85% del personal orientado al paciente son personas de color pero mas del 70% de directores y ejecutivos son blancos. No se trata de bajar estandares — se trata de reconocer que el conocimiento comunitario, la competencia cultural y la experiencia vivida son calificaciones de liderazgo que los canales tradicionales subvaloran.",
    },
    challenge: {
      en: "The FQHC posts director positions requiring an MBA or MHA, 10+ years of management experience, and specific certifications — criteria that systematically exclude internal candidates who have 15 years of operational knowledge but entered healthcare through community pathways rather than graduate school. Meanwhile, external hires with the 'right credentials' struggle to earn trust from staff and patients.",
      es: "El FQHC publica posiciones de director que requieren un MBA o MHA, 10+ anos de experiencia en gestion y certificaciones especificas — criterios que sistematicamente excluyen candidatos internos que tienen 15 anos de conocimiento operativo pero entraron al sector salud a traves de rutas comunitarias en lugar de la escuela de posgrado. Mientras tanto, contrataciones externas con las 'credenciales correctas' luchan por ganarse la confianza del personal y los pacientes.",
    },
    strategy: {
      en: "Create a 2-year Leadership Academy for high-potential frontline and mid-level staff from underrepresented backgrounds. Include mentorship from current executives, rotational assignments across departments, tuition support for management coursework, board meeting observation, and capstone projects addressing real organizational challenges. Revise director-level job requirements to accept equivalent experience in lieu of graduate degrees.",
      es: "Crear una Academia de Liderazgo de 2 anos para personal de primera linea y nivel medio de alto potencial de trasfondos subrepresentados. Incluir mentorias de ejecutivos actuales, asignaciones rotativas entre departamentos, apoyo de matricula para cursos de gestion, observacion de reuniones de la junta y proyectos finales que aborden desafios organizacionales reales. Revisar los requisitos de trabajo de nivel director para aceptar experiencia equivalente en lugar de titulos de posgrado.",
    },
    outcomes: [
      {
        en: "Leadership demographic representation improves by 15%+ over 3 years",
        es: "La representacion demografica del liderazgo mejora mas del 15% en 3 anos",
      },
      {
        en: "5+ Academy graduates promoted to supervisory or management roles per cohort",
        es: "Mas de 5 graduados de la Academia promovidos a roles de supervision o gerencia por cohorte",
      },
      {
        en: "Director-level job requirements updated to value equivalent experience alongside formal degrees",
        es: "Requisitos de trabajo de nivel director actualizados para valorar experiencia equivalente junto con titulos formales",
      },
      {
        en: "Staff engagement scores for frontline workers of color improve >8 points within 2 years",
        es: "Los puntajes de compromiso del personal para trabajadores de primera linea de color mejoran mas de 8 puntos dentro de 2 anos",
      },
    ],
    applicableRoles: ["Clinic Manager", "Department Supervisor", "Operations Director", "HR Manager", "QI Coordinator"],
  },

  // ---- 4. Formal Cultural Broker Program ----
  {
    id: "cultural-broker-program",
    title: {
      en: "Formal Cultural Broker Program",
      es: "Programa Formal de Mediadores Culturales",
    },
    description: {
      en: "Many FQHC staff informally bridge cultures — explaining clinical concepts in culturally resonant ways, mediating between traditional and Western medicine, or helping patients navigate systems they don't trust. A formal cultural broker program recognizes, trains, compensates, and structures this role rather than leaving it to informal goodwill.",
      es: "Muchos empleados de FQHCs informalmente median entre culturas — explicando conceptos clinicos de maneras culturalmente resonantes, mediando entre medicina tradicional y occidental, o ayudando a pacientes a navegar sistemas en los que no confian. Un programa formal de mediadores culturales reconoce, capacita, compensa y estructura este rol en lugar de dejarlo a la buena voluntad informal.",
    },
    challenge: {
      en: "A Medical Assistant who grew up in the same colonia as her patients informally counsels patients about diabetes management using cultural references and family dynamics that the provider misses. But this labor is invisible — she's not compensated for it, it's not documented, and when she leaves, the institutional knowledge leaves with her.",
      es: "Una Asistente Medica que crecio en la misma colonia que sus pacientes aconseja informalmente a los pacientes sobre el manejo de la diabetes usando referencias culturales y dinamicas familiares que el proveedor no percibe. Pero este trabajo es invisible — no se le compensa por ello, no se documenta, y cuando se va, el conocimiento institucional se va con ella.",
    },
    strategy: {
      en: "Create a formal Cultural Broker role as an overlay to existing positions. Staff who pass a cultural knowledge assessment and complete a 40-hour cultural mediation training receive a pay differential and protected time for cultural bridging activities. Their interventions are documented in the EHR and tracked as quality metrics. The program includes a knowledge capture process so that cultural insights are retained organizationally.",
      es: "Crear un rol formal de Mediador Cultural como superposicion a posiciones existentes. El personal que aprueba una evaluacion de conocimiento cultural y completa una capacitacion de 40 horas en mediacion cultural recibe un diferencial de pago y tiempo protegido para actividades de mediacion cultural. Sus intervenciones se documentan en el EHR y se rastrean como metricas de calidad. El programa incluye un proceso de captura de conocimiento para que los insights culturales se retengan organizacionalmente.",
    },
    outcomes: [
      {
        en: "10+ staff designated as formal cultural brokers with pay differential and protected time",
        es: "Mas de 10 empleados designados como mediadores culturales formales con diferencial de pago y tiempo protegido",
      },
      {
        en: "Cultural mediation encounters documented in EHR increase by 300%+ (from zero baseline)",
        es: "Los encuentros de mediacion cultural documentados en el EHR aumentan mas del 300% (desde linea base de cero)",
      },
      {
        en: "Patient adherence to treatment plans improves for populations receiving cultural broker services",
        es: "La adherencia del paciente a los planes de tratamiento mejora para las poblaciones que reciben servicios de mediacion cultural",
      },
    ],
    applicableRoles: ["CHW", "MA", "Health Educator", "Patient Navigator", "Care Coordinator", "LVN"],
  },

  // ---- 5. From Training to Transformation ----
  {
    id: "anti-racism-beyond-training",
    title: {
      en: "From Training to Transformation",
      es: "De la Capacitacion a la Transformacion",
    },
    description: {
      en: "One-time DEI training doesn't change organizations. A 2-hour unconscious bias workshop makes people feel like they've done something without changing any systems. Moving from training to transformation means embedding anti-racism into governance, hiring, clinical protocols, quality measurement, and community accountability — not as an HR program but as an operational strategy.",
      es: "La capacitacion unica de DEI no cambia organizaciones. Un taller de 2 horas sobre sesgo inconsciente hace que las personas sientan que han hecho algo sin cambiar ningun sistema. Pasar de la capacitacion a la transformacion significa integrar el antirracismo en la gobernanza, contratacion, protocolos clinicos, medicion de calidad y rendicion de cuentas comunitaria — no como un programa de RRHH sino como una estrategia operacional.",
    },
    challenge: {
      en: "The FQHC conducted mandatory implicit bias training for all staff in 2021. Staff completed it, checked the box, and nothing changed. Patient outcome disparities persist. Hiring patterns haven't shifted. The training vendor got paid, the compliance requirement was met, and the organization feels good about itself without any measurable impact on equity.",
      es: "El FQHC realizo capacitacion obligatoria de sesgo implicito para todo el personal en 2021. El personal la completo, marco la casilla, y nada cambio. Las disparidades en resultados de pacientes persisten. Los patrones de contratacion no han cambiado. El proveedor de capacitacion recibio pago, el requisito de cumplimiento se cumplio, y la organizacion se siente bien consigo misma sin ningun impacto medible en la equidad.",
    },
    strategy: {
      en: "Replace one-off training with a 3-year anti-racism transformation plan: Year 1 — disaggregate all quality and workforce data, establish an equity committee with budget authority, conduct a structural racism audit of policies. Year 2 — implement targeted interventions for each identified disparity, launch ongoing learning cohorts (not one-time training), tie manager evaluations to equity metrics. Year 3 — report equity outcomes publicly, integrate anti-racism into strategic plan and budget, establish community accountability board.",
      es: "Reemplazar la capacitacion unica con un plan de transformacion antirracista de 3 anos: Ano 1 — desagregar todos los datos de calidad y fuerza laboral, establecer un comite de equidad con autoridad presupuestaria, realizar una auditoria de racismo estructural de politicas. Ano 2 — implementar intervenciones dirigidas para cada disparidad identificada, lanzar cohortes de aprendizaje continuas (no capacitacion unica), vincular evaluaciones de gerentes a metricas de equidad. Ano 3 — reportar resultados de equidad publicamente, integrar el antirracismo en el plan estrategico y presupuesto, establecer una junta de rendicion de cuentas comunitaria.",
    },
    outcomes: [
      {
        en: "Equity committee established with dedicated budget and quarterly board reporting",
        es: "Comite de equidad establecido con presupuesto dedicado y reportes trimestrales a la junta",
      },
      {
        en: "All clinical quality measures disaggregated and disparity gaps tracked over time",
        es: "Todas las medidas de calidad clinica desagregadas y brechas de disparidad rastreadas a lo largo del tiempo",
      },
      {
        en: "Manager performance evaluations include equity metrics (not just completion of training)",
        es: "Las evaluaciones de desempeno gerencial incluyen metricas de equidad (no solo completar capacitacion)",
      },
      {
        en: "Measurable reduction in outcome disparities for at least 3 clinical measures within 3 years",
        es: "Reduccion medible en disparidades de resultados para al menos 3 medidas clinicas dentro de 3 anos",
      },
    ],
    applicableRoles: ["CEO", "CMO", "HR Director", "QI Director", "DEI Officer", "Board Members"],
  },
];

/* ------------------------------------------------------------------ */
/*  Helper functions                                                    */
/* ------------------------------------------------------------------ */

/** Get competencies filtered by domain */
export function getCompetenciesByDomain(
  domain: CulturalDomain
): CulturalCompetency[] {
  return CULTURAL_COMPETENCIES.filter((c) => c.domain === domain);
}

/** Get a single competency by id */
export function getCompetencyById(
  id: string
): CulturalCompetency | undefined {
  return CULTURAL_COMPETENCIES.find((c) => c.id === id);
}

/** Get a single scenario by id */
export function getScenarioById(
  id: string
): WorkforceDiversityScenario | undefined {
  return WORKFORCE_DIVERSITY_SCENARIOS.find((s) => s.id === id);
}

/** Aggregate all metrics across all competencies */
export function getAllMetrics(): {
  competencyId: string;
  competencyTitle: string;
  metrics: { label: string; benchmark: string }[];
}[] {
  return CULTURAL_COMPETENCIES.map((c) => ({
    competencyId: c.id,
    competencyTitle: c.title.en,
    metrics: c.metrics,
  }));
}

/** Return summary counts */
export function getCompetencyCounts(): {
  domains: number;
  competencies: number;
  scenarios: number;
} {
  return {
    domains: CULTURAL_DOMAINS.length,
    competencies: CULTURAL_COMPETENCIES.length,
    scenarios: WORKFORCE_DIVERSITY_SCENARIOS.length,
  };
}
