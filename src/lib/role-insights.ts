/* ------------------------------------------------------------------ */
/*  Role-Specific Career Insights                                      */
/*  Replaces generic messages when we know the user's FQHC role        */
/* ------------------------------------------------------------------ */

import type { DomainId } from "./career-assessment-engine";

export const ROLE_INSIGHTS: Record<string, {
  strengthMessages: Record<DomainId, string>;
  esStrengthMessages: Record<DomainId, string>;
  growthMessages: Record<DomainId, string>;
  esGrowthMessages: Record<DomainId, string>;
  nextSteps: Record<DomainId, string>;
  esNextSteps: Record<DomainId, string>;
  employerWants: {
    topQualifications: string[];
    esTopQualifications: string[];
    topSkills: string[];
    esTopSkills: string[];
    certifications: string[];
    esCertifications: string[];
  };
}> = {

  /* ================================================================ */
  /*  CHW — Community Health Worker / Promotor(a)                      */
  /* ================================================================ */
  chw: {
    strengthMessages: {
      mission: "Your deep connection to community mission is exactly what makes CHWs the backbone of FQHC outreach. The most effective Promotores share your drive to serve — and FQHCs with mission-driven CHWs see 30% better patient retention.",
      people: "Your natural ability to build trust with patients from diverse backgrounds is the single most valuable skill a CHW can have. Hiring managers consistently rank cultural connection above technical skills when selecting outreach staff.",
      execution: "Your ability to juggle home visits, referrals, and documentation under tight timelines shows real field-readiness. CHWs who can manage high caseloads without dropping follow-ups are the ones who get promoted to lead roles.",
      growth: "Your eagerness to expand beyond basic outreach into specialized programs like ECM and CalAIM positions you for rapid career growth. CHWs who pursue additional training earn $5-8K more within two years at most California FQHCs.",
    },
    esStrengthMessages: {
      mission: "Tu profunda conexión con la misión comunitaria es exactamente lo que hace a los CHWs la columna vertebral del alcance en FQHCs. Los Promotores más efectivos comparten tu impulso por servir — y los FQHCs con CHWs motivados por la misión ven 30% mejor retención de pacientes.",
      people: "Tu habilidad natural para generar confianza con pacientes de diversos orígenes es la habilidad más valiosa que un CHW puede tener. Los gerentes de contratación consistentemente clasifican la conexión cultural por encima de las habilidades técnicas al seleccionar personal de alcance.",
      execution: "Tu capacidad para manejar visitas domiciliarias, referencias y documentación bajo plazos ajustados demuestra verdadera preparación en campo. Los CHWs que pueden manejar altas cargas de casos sin perder seguimientos son los que ascienden a roles de liderazgo.",
      growth: "Tu entusiasmo por expandirte más allá del alcance básico hacia programas especializados como ECM y CalAIM te posiciona para un rápido crecimiento profesional. Los CHWs que buscan capacitación adicional ganan $5-8K más dentro de dos años en la mayoría de los FQHCs de California.",
    },
    growthMessages: {
      mission: "Reconnecting with your 'why' can transform how you show up for patients. Shadow a senior Promotor at your FQHC or attend a community health worker conference — hearing patient impact stories reignites the spark that brought you to this work.",
      people: "Building your motivational interviewing skills will transform your patient engagement. Consider the MI training offered through many FQHCs — it's often free for staff and is the single highest-impact skill upgrade for CHWs.",
      execution: "Creating a structured daily workflow for managing your caseload will reduce stress and prevent missed follow-ups. Many top CHWs use a simple morning triage system — 10 minutes reviewing who needs contact today saves hours of catch-up later.",
      growth: "Investing time in learning one new program area — ECM enrollment, SDOH screening tools, or CalAIM Community Supports — each quarter will steadily expand your value and open doors to lead CHW or care coordinator positions.",
    },
    esGrowthMessages: {
      mission: "Reconectarte con tu 'por qué' puede transformar cómo te presentas ante los pacientes. Acompaña a un Promotor senior en tu FQHC o asiste a una conferencia de promotores de salud — escuchar historias de impacto en pacientes reaviva la chispa que te trajo a este trabajo.",
      people: "Desarrollar tus habilidades de entrevista motivacional transformará tu participación con pacientes. Considera la capacitación en EM que ofrecen muchos FQHCs — a menudo es gratuita para el personal y es la mejora de habilidad de mayor impacto para los CHWs.",
      execution: "Crear un flujo de trabajo diario estructurado para manejar tu carga de casos reducirá el estrés y evitará seguimientos perdidos. Muchos CHWs destacados usan un sistema simple de triaje matutino — 10 minutos revisando quién necesita contacto hoy ahorra horas de ponerse al día después.",
      growth: "Invertir tiempo en aprender una nueva área de programa — inscripción ECM, herramientas de detección SDOH, o Apoyos Comunitarios CalAIM — cada trimestre expandirá constantemente tu valor y abrirá puertas a posiciones de CHW líder o coordinador de atención.",
    },
    nextSteps: {
      mission: "Pursue your California CHW Certification — it can boost your salary by $3-5K and is increasingly required by Medi-Cal managed care plans",
      people: "Complete a free Motivational Interviewing training through your FQHC or the CA Department of Public Health — this is the #1 skill CHW hiring managers look for",
      execution: "Learn to use your FQHC's EHR for care gap tracking and population health reports — CHWs who master EHR workflows get promoted to lead roles 40% faster",
      growth: "Get trained in CalAIM Community Supports and ECM enrollment — these programs are expanding rapidly and CHWs with this expertise earn $4-6K more annually",
    },
    esNextSteps: {
      mission: "Obtén tu Certificación de CHW de California — puede aumentar tu salario en $3-5K y es cada vez más requerida por los planes de atención administrada de Medi-Cal",
      people: "Completa una capacitación gratuita de Entrevista Motivacional a través de tu FQHC o el Departamento de Salud Pública de CA — esta es la habilidad #1 que buscan los gerentes de contratación de CHW",
      execution: "Aprende a usar el EHR de tu FQHC para rastreo de brechas de atención e informes de salud poblacional — los CHWs que dominan los flujos de trabajo del EHR ascienden a roles de liderazgo 40% más rápido",
      growth: "Capacítate en Apoyos Comunitarios CalAIM e inscripción ECM — estos programas se están expandiendo rápidamente y los CHWs con esta experiencia ganan $4-6K más anualmente",
    },
    employerWants: {
      topQualifications: [
        "1+ years community outreach or health education experience",
        "Bilingual English/Spanish (strongly preferred)",
        "Lived experience in the communities served by the FQHC",
        "Experience with SDOH screening and resource navigation",
      ],
      esTopQualifications: [
        "1+ años de experiencia en alcance comunitario o educación en salud",
        "Bilingüe inglés/español (fuertemente preferido)",
        "Experiencia vivida en las comunidades atendidas por el FQHC",
        "Experiencia con detección SDOH y navegación de recursos",
      ],
      topSkills: [
        "Motivational interviewing",
        "SDOH screening and resource referral",
        "Community outreach and engagement",
        "Health education and literacy",
        "EHR documentation (OCHIN Epic preferred)",
      ],
      esTopSkills: [
        "Entrevista motivacional",
        "Detección SDOH y referencia de recursos",
        "Alcance y participación comunitaria",
        "Educación y alfabetización en salud",
        "Documentación EHR (OCHIN Epic preferido)",
      ],
      certifications: [
        "CHW Certification (CA)",
        "BLS/CPR",
        "Motivational Interviewing certification",
      ],
      esCertifications: [
        "Certificación CHW (CA)",
        "BLS/CPR",
        "Certificación en Entrevista Motivacional",
      ],
    },
  },

  /* ================================================================ */
  /*  Care Coordinator                                                  */
  /* ================================================================ */
  care_coordinator: {
    strengthMessages: {
      mission: "Your commitment to ensuring patients don't fall through the cracks is the hallmark of an exceptional care coordinator. FQHCs with mission-driven coordinators see measurably better ECM/CCM outcomes and higher HEDIS scores.",
      people: "Your ability to coordinate across providers, patients, and community agencies is what makes complex care actually work. The best care coordinators are relationship architects — and your interpersonal skills set you apart in a role where collaboration is everything.",
      execution: "Your ability to manage care plans across dozens of patients while meeting strict Medi-Cal documentation timelines is a defining trait of top FQHC care coordinators. This operational precision directly drives program reimbursement.",
      growth: "Your drive to deepen your clinical knowledge and expand into new care models like CalAIM positions you for advancement into supervisory and program management roles. Care coordinators who continuously upskill are the first considered for team lead positions.",
    },
    esStrengthMessages: {
      mission: "Tu compromiso de asegurar que los pacientes no se pierdan en el sistema es la marca de un coordinador de atención excepcional. Los FQHCs con coordinadores motivados por la misión ven resultados ECM/CCM mediblemente mejores y puntuaciones HEDIS más altas.",
      people: "Tu capacidad para coordinar entre proveedores, pacientes y agencias comunitarias es lo que hace que la atención compleja realmente funcione. Los mejores coordinadores de atención son arquitectos de relaciones — y tus habilidades interpersonales te distinguen en un rol donde la colaboración es todo.",
      execution: "Tu capacidad para gestionar planes de atención de docenas de pacientes mientras cumples con plazos estrictos de documentación de Medi-Cal es un rasgo definitorio de los mejores coordinadores de atención en FQHCs. Esta precisión operativa impulsa directamente el reembolso del programa.",
      growth: "Tu impulso por profundizar tu conocimiento clínico y expandirte a nuevos modelos de atención como CalAIM te posiciona para avanzar a roles de supervisión y gestión de programas. Los coordinadores de atención que continuamente mejoran sus habilidades son los primeros considerados para posiciones de líder de equipo.",
    },
    growthMessages: {
      mission: "Strengthening your connection to patient outcomes — not just task completion — will elevate your effectiveness. Request access to your FQHC's quality metrics dashboard so you can see how your coordination work translates into real health improvements.",
      people: "Developing your skills in leading care team huddles and facilitating warm handoffs between providers will make you indispensable. Practice running a 5-minute morning huddle with your care team — this one skill separates coordinators from care coordination leaders.",
      execution: "Master your FQHC's EHR care plan templates — power users who can build and track care plans efficiently advance 40% faster. Spend 30 minutes with an EHR super-user to learn shortcuts that save hours each week.",
      growth: "Pursuing formal training in population health management or case management methodology will accelerate your path to supervisory roles. Many California FQHCs offer tuition reimbursement for care coordination certifications.",
    },
    esGrowthMessages: {
      mission: "Fortalecer tu conexión con los resultados de los pacientes — no solo el cumplimiento de tareas — elevará tu efectividad. Solicita acceso al panel de métricas de calidad de tu FQHC para que puedas ver cómo tu trabajo de coordinación se traduce en mejoras reales de salud.",
      people: "Desarrollar tus habilidades para liderar reuniones de equipo de atención y facilitar transferencias cálidas entre proveedores te hará indispensable. Practica dirigir una reunión matutina de 5 minutos con tu equipo de atención — esta sola habilidad separa a los coordinadores de los líderes de coordinación de atención.",
      execution: "Domina las plantillas de planes de atención del EHR de tu FQHC — los usuarios avanzados que pueden crear y rastrear planes de atención eficientemente avanzan 40% más rápido. Pasa 30 minutos con un súper-usuario del EHR para aprender atajos que ahorran horas cada semana.",
      growth: "Buscar capacitación formal en gestión de salud poblacional o metodología de gestión de casos acelerará tu camino a roles de supervisión. Muchos FQHCs de California ofrecen reembolso de matrícula para certificaciones de coordinación de atención.",
    },
    nextSteps: {
      mission: "Ask your supervisor for access to HEDIS and UDS quality metrics — understanding how your work impacts population health measures will deepen your mission connection",
      people: "Take a warm handoff training through your health plan or FQHC — care coordinators who master cross-provider communication see better patient follow-through rates",
      execution: "Master your FQHC's EHR care plan templates — power users advance 40% faster and reduce documentation time by up to 50%",
      growth: "Pursue CCM or AIHCP Case Management certification — it can increase your salary by $4-7K and qualifies you for lead coordinator roles",
    },
    esNextSteps: {
      mission: "Pide a tu supervisor acceso a las métricas de calidad HEDIS y UDS — entender cómo tu trabajo impacta las medidas de salud poblacional profundizará tu conexión con la misión",
      people: "Toma una capacitación de transferencia cálida a través de tu plan de salud o FQHC — los coordinadores de atención que dominan la comunicación entre proveedores ven mejores tasas de seguimiento de pacientes",
      execution: "Domina las plantillas de planes de atención del EHR de tu FQHC — los usuarios avanzados avanzan 40% más rápido y reducen el tiempo de documentación hasta en un 50%",
      growth: "Obtén la certificación CCM o de Gestión de Casos AIHCP — puede aumentar tu salario en $4-7K y te califica para roles de coordinador líder",
    },
    employerWants: {
      topQualifications: [
        "2+ years care coordination or case management experience",
        "Experience with ECM/CCM program enrollment and management",
        "Knowledge of Medi-Cal managed care and CalAIM initiatives",
        "Familiarity with SDOH assessments and community resource navigation",
        "Bilingual English/Spanish preferred",
      ],
      esTopQualifications: [
        "2+ años de experiencia en coordinación de atención o gestión de casos",
        "Experiencia con inscripción y gestión de programas ECM/CCM",
        "Conocimiento de Medi-Cal de atención administrada e iniciativas CalAIM",
        "Familiaridad con evaluaciones SDOH y navegación de recursos comunitarios",
        "Bilingüe inglés/español preferido",
      ],
      topSkills: [
        "Care plan development and monitoring",
        "EHR navigation (OCHIN Epic preferred)",
        "Cross-functional team coordination",
        "Medi-Cal authorization and referral tracking",
        "Patient engagement and follow-up",
      ],
      esTopSkills: [
        "Desarrollo y monitoreo de planes de atención",
        "Navegación EHR (OCHIN Epic preferido)",
        "Coordinación de equipos multifuncionales",
        "Autorización de Medi-Cal y rastreo de referencias",
        "Participación del paciente y seguimiento",
      ],
      certifications: [
        "Certified Case Manager (CCM)",
        "BLS/CPR",
      ],
      esCertifications: [
        "Gerente de Casos Certificado (CCM)",
        "BLS/CPR",
      ],
    },
  },

  /* ================================================================ */
  /*  Medical Assistant                                                 */
  /* ================================================================ */
  medical_assistant: {
    strengthMessages: {
      mission: "Your dedication to serving patients at the front lines of community health is the engine that keeps FQHCs running. Medical assistants who connect their daily work to the health center's mission have the highest retention rates — and patients notice the difference.",
      people: "Your ability to put anxious patients at ease during vitals and intake is a skill that can't be taught from a textbook. FQHCs depend on MAs who can bridge the gap between clinical providers and the communities they serve — your warmth and cultural awareness do exactly that.",
      execution: "Your efficiency in rooming patients, managing provider schedules, and handling point-of-care testing keeps the entire clinic flowing. The best FQHC medical assistants process 20-25 patients per day without sacrificing quality — your execution skills are what make that possible.",
      growth: "Your ambition to grow beyond basic MA duties positions you for advancement into lead MA, back-office supervisor, or clinical pathway roles. MAs who continuously expand their scope are the most valuable team members at any FQHC.",
    },
    esStrengthMessages: {
      mission: "Tu dedicación a servir a los pacientes en las líneas del frente de la salud comunitaria es el motor que mantiene funcionando a los FQHCs. Los asistentes médicos que conectan su trabajo diario con la misión del centro de salud tienen las tasas de retención más altas — y los pacientes notan la diferencia.",
      people: "Tu capacidad para tranquilizar a pacientes ansiosos durante la toma de signos vitales y el ingreso es una habilidad que no se puede enseñar en un libro de texto. Los FQHCs dependen de MAs que puedan cerrar la brecha entre los proveedores clínicos y las comunidades que sirven — tu calidez y conciencia cultural hacen exactamente eso.",
      execution: "Tu eficiencia preparando pacientes, gestionando horarios de proveedores y manejando pruebas de punto de atención mantiene a toda la clínica funcionando. Los mejores asistentes médicos de FQHC procesan 20-25 pacientes por día sin sacrificar calidad — tus habilidades de ejecución son lo que lo hacen posible.",
      growth: "Tu ambición de crecer más allá de las funciones básicas de MA te posiciona para avanzar a roles de MA líder, supervisor de back-office o carrera clínica. Los MAs que continuamente expanden su alcance son los miembros de equipo más valiosos en cualquier FQHC.",
    },
    growthMessages: {
      mission: "Connecting your daily tasks — vitals, injections, EHR documentation — to patient outcomes will reignite your sense of purpose. Ask your provider about the patients whose health improved because your accurate vitals caught something early.",
      people: "Strengthening your patient communication skills, especially explaining procedures in plain language to patients with limited health literacy, will set you apart. Practice the teach-back method: after explaining something, ask the patient to repeat it in their own words.",
      execution: "Developing a pre-visit planning routine will transform your workflow. Reviewing tomorrow's schedule the afternoon before — checking labs, immunization gaps, and screening needs — means fewer surprises and smoother patient flow.",
      growth: "Expanding into phlebotomy, EKG, or medication administration will increase your scope and earning potential. Many California FQHCs cover the cost of these additional certifications for existing MAs.",
    },
    esGrowthMessages: {
      mission: "Conectar tus tareas diarias — signos vitales, inyecciones, documentación EHR — con los resultados del paciente reavivará tu sentido de propósito. Pregunta a tu proveedor sobre los pacientes cuya salud mejoró porque tus signos vitales precisos detectaron algo temprano.",
      people: "Fortalecer tus habilidades de comunicación con pacientes, especialmente explicando procedimientos en lenguaje sencillo a pacientes con alfabetización limitada en salud, te distinguirá. Practica el método de enseñanza-retorno: después de explicar algo, pide al paciente que lo repita con sus propias palabras.",
      execution: "Desarrollar una rutina de planificación previa a la visita transformará tu flujo de trabajo. Revisar el horario de mañana la tarde anterior — verificando laboratorios, brechas de inmunización y necesidades de detección — significa menos sorpresas y un flujo de pacientes más fluido.",
      growth: "Expandirte a flebotomía, EKG o administración de medicamentos aumentará tu alcance y potencial de ingresos. Muchos FQHCs de California cubren el costo de estas certificaciones adicionales para MAs existentes.",
    },
    nextSteps: {
      mission: "Volunteer for your FQHC's patient engagement or quality improvement committee — MAs who participate in QI initiatives are prioritized for lead roles",
      people: "Complete a health literacy or plain-language communication training — patients at FQHCs often have limited English or medical vocabulary, and this skill dramatically improves satisfaction scores",
      execution: "Learn pre-visit planning in your EHR system — MAs who can identify care gaps before the patient arrives are the most valued team members",
      growth: "Get your phlebotomy certification if you don't have it — it expands your scope, adds $1-3K to your salary, and is required for most lead MA positions at California FQHCs",
    },
    esNextSteps: {
      mission: "Ofrécete como voluntario/a para el comité de participación del paciente o mejora de calidad de tu FQHC — los MAs que participan en iniciativas QI son priorizados para roles de liderazgo",
      people: "Completa una capacitación en alfabetización en salud o comunicación en lenguaje sencillo — los pacientes en FQHCs a menudo tienen inglés limitado o vocabulario médico, y esta habilidad mejora dramáticamente las puntuaciones de satisfacción",
      execution: "Aprende planificación previa a la visita en tu sistema EHR — los MAs que pueden identificar brechas de atención antes de que llegue el paciente son los miembros de equipo más valorados",
      growth: "Obtén tu certificación de flebotomía si no la tienes — expande tu alcance, agrega $1-3K a tu salario, y es requerida para la mayoría de posiciones de MA líder en FQHCs de California",
    },
    employerWants: {
      topQualifications: [
        "Completion of accredited MA program or 1+ years clinical experience",
        "Experience in an FQHC or community health setting",
        "Bilingual English/Spanish (strongly preferred)",
        "Competency in vitals, injections, phlebotomy, and EKG",
      ],
      esTopQualifications: [
        "Finalización de programa de MA acreditado o 1+ años de experiencia clínica",
        "Experiencia en un FQHC o entorno de salud comunitaria",
        "Bilingüe inglés/español (fuertemente preferido)",
        "Competencia en signos vitales, inyecciones, flebotomía y EKG",
      ],
      topSkills: [
        "EHR documentation (OCHIN Epic preferred)",
        "Patient rooming and vital signs",
        "Vaccine administration and cold chain management",
        "Pre-visit planning and care gap identification",
        "Phlebotomy and point-of-care testing",
      ],
      esTopSkills: [
        "Documentación EHR (OCHIN Epic preferido)",
        "Preparación de pacientes y signos vitales",
        "Administración de vacunas y gestión de cadena de frío",
        "Planificación previa a la visita e identificación de brechas de atención",
        "Flebotomía y pruebas de punto de atención",
      ],
      certifications: [
        "Certified Medical Assistant (CMA or RMA)",
        "BLS/CPR",
        "California Phlebotomy Technician (CPT1)",
      ],
      esCertifications: [
        "Asistente Médico Certificado (CMA o RMA)",
        "BLS/CPR",
        "Técnico de Flebotomía de California (CPT1)",
      ],
    },
  },

  /* ================================================================ */
  /*  Case Manager                                                      */
  /* ================================================================ */
  case_manager: {
    strengthMessages: {
      mission: "Your unwavering advocacy for patients navigating complex systems is the heart of effective case management. Case managers who stay anchored to mission through the paperwork, the denials, and the bureaucracy are the ones who actually change lives at FQHCs.",
      people: "Your skill in building therapeutic rapport with high-acuity patients — many of whom have deep distrust of healthcare systems — is what makes complex care possible. The best FQHC case managers combine clinical knowledge with the relational instincts you demonstrate.",
      execution: "Your ability to manage high-acuity caseloads while maintaining compliance with Medi-Cal TCM and ECM documentation requirements demonstrates the operational discipline that FQHCs desperately need. This precision is what keeps programs funded.",
      growth: "Your commitment to staying current on Medi-Cal policy changes and expanding your clinical knowledge base sets you up for advancement into program management. Case managers who proactively learn new regulations and care models are promoted significantly faster.",
    },
    esStrengthMessages: {
      mission: "Tu defensa inquebrantable de los pacientes que navegan sistemas complejos es el corazón de la gestión de casos efectiva. Los gestores de casos que se mantienen anclados a la misión a través del papeleo, las negaciones y la burocracia son los que realmente cambian vidas en los FQHCs.",
      people: "Tu habilidad para construir relación terapéutica con pacientes de alta agudeza — muchos de los cuales tienen profunda desconfianza del sistema de salud — es lo que hace posible la atención compleja. Los mejores gestores de casos de FQHC combinan conocimiento clínico con los instintos relacionales que demuestras.",
      execution: "Tu capacidad para gestionar cargas de casos de alta agudeza mientras mantienes cumplimiento con los requisitos de documentación TCM y ECM de Medi-Cal demuestra la disciplina operativa que los FQHCs necesitan desesperadamente. Esta precisión es lo que mantiene los programas financiados.",
      growth: "Tu compromiso de mantenerte actualizado/a sobre cambios en las políticas de Medi-Cal y expandir tu base de conocimiento clínico te prepara para avanzar a la gestión de programas. Los gestores de casos que proactivamente aprenden nuevas regulaciones y modelos de atención son promovidos significativamente más rápido.",
    },
    growthMessages: {
      mission: "Reconnecting with individual patient success stories can prevent the compassion fatigue that affects many case managers. Ask your supervisor about shadowing a community outreach visit — seeing patients thrive in their own environment reminds you why this work matters.",
      people: "Deepening your trauma-informed care skills will transform your work with high-acuity populations. Many FQHC patients have experienced adverse childhood experiences, housing instability, and system mistrust — specialized TIC training helps you meet them where they are.",
      execution: "Developing templates and workflows for common case management scenarios — new ECM enrollments, care transitions, authorization requests — will free up mental energy for the complex cases that truly need your judgment.",
      growth: "Building expertise in a specialty population — such as individuals experiencing homelessness, justice-involved patients, or those with serious mental illness — will make you invaluable. FQHCs are increasingly creating specialized case management teams for CalAIM populations.",
    },
    esGrowthMessages: {
      mission: "Reconectarte con historias individuales de éxito de pacientes puede prevenir la fatiga por compasión que afecta a muchos gestores de casos. Pide a tu supervisor acompañar una visita de alcance comunitario — ver a los pacientes prosperar en su propio entorno te recuerda por qué importa este trabajo.",
      people: "Profundizar tus habilidades de atención informada por trauma transformará tu trabajo con poblaciones de alta agudeza. Muchos pacientes de FQHC han experimentado experiencias adversas en la infancia, inestabilidad de vivienda y desconfianza del sistema — la capacitación especializada en TIC te ayuda a encontrarlos donde están.",
      execution: "Desarrollar plantillas y flujos de trabajo para escenarios comunes de gestión de casos — nuevas inscripciones ECM, transiciones de atención, solicitudes de autorización — liberará energía mental para los casos complejos que verdaderamente necesitan tu juicio.",
      growth: "Construir experiencia en una población especializada — como personas que experimentan falta de vivienda, pacientes involucrados en el sistema de justicia, o aquellos con enfermedad mental seria — te hará invaluable. Los FQHCs están creando cada vez más equipos especializados de gestión de casos para poblaciones CalAIM.",
    },
    nextSteps: {
      mission: "Join a CalAIM learning collaborative or your county's ECM/CCM workgroup — connecting with other case managers fighting the same fights strengthens your sense of purpose",
      people: "Complete trauma-informed care (TIC) training through your FQHC or a California-approved provider — this is the most requested skill for case managers working with ECM populations",
      execution: "Build a personal template library for ECM care plans, progress notes, and authorization requests — case managers with standardized workflows handle 25% more cases without quality drops",
      growth: "Pursue your Certified Case Manager (CCM) credential — it can increase your salary by $5-8K and is the most recognized qualification for advancement to program management",
    },
    esNextSteps: {
      mission: "Únete a un colaborativo de aprendizaje CalAIM o al grupo de trabajo ECM/CCM de tu condado — conectarte con otros gestores de casos luchando las mismas batallas fortalece tu sentido de propósito",
      people: "Completa capacitación en atención informada por trauma (TIC) a través de tu FQHC o un proveedor aprobado por California — esta es la habilidad más solicitada para gestores de casos que trabajan con poblaciones ECM",
      execution: "Construye una biblioteca personal de plantillas para planes de atención ECM, notas de progreso y solicitudes de autorización — los gestores de casos con flujos de trabajo estandarizados manejan 25% más casos sin caída en calidad",
      growth: "Obtén tu credencial de Gerente de Casos Certificado (CCM) — puede aumentar tu salario en $5-8K y es la calificación más reconocida para avanzar a la gestión de programas",
    },
    employerWants: {
      topQualifications: [
        "2+ years case management experience in a healthcare or social services setting",
        "Experience with Medi-Cal TCM or ECM/CCM programs",
        "Knowledge of CalAIM Community Supports and Enhanced Care Management",
        "Familiarity with housing, behavioral health, and social service referral networks",
        "Bilingual English/Spanish preferred",
      ],
      esTopQualifications: [
        "2+ años de experiencia en gestión de casos en un entorno de salud o servicios sociales",
        "Experiencia con programas TCM o ECM/CCM de Medi-Cal",
        "Conocimiento de Apoyos Comunitarios CalAIM y Gestión de Atención Mejorada",
        "Familiaridad con redes de referencia de vivienda, salud conductual y servicios sociales",
        "Bilingüe inglés/español preferido",
      ],
      topSkills: [
        "ECM/CCM care plan development",
        "Medi-Cal authorization and documentation",
        "Crisis intervention and de-escalation",
        "Community resource navigation",
        "EHR documentation (OCHIN Epic preferred)",
      ],
      esTopSkills: [
        "Desarrollo de planes de atención ECM/CCM",
        "Autorización y documentación de Medi-Cal",
        "Intervención en crisis y desescalación",
        "Navegación de recursos comunitarios",
        "Documentación EHR (OCHIN Epic preferido)",
      ],
      certifications: [
        "Certified Case Manager (CCM)",
        "BLS/CPR",
      ],
      esCertifications: [
        "Gerente de Casos Certificado (CCM)",
        "BLS/CPR",
      ],
    },
  },

  /* ================================================================ */
  /*  Behavioral Health                                                 */
  /* ================================================================ */
  behavioral_health: {
    strengthMessages: {
      mission: "Your dedication to integrated behavioral health in a primary care setting addresses one of the most critical gaps in community health. FQHC patients with access to embedded BH services have dramatically better outcomes — and your commitment to this model is what makes integration work.",
      people: "Your therapeutic skills and ability to build trust with patients who are often in crisis is the foundation of effective FQHC behavioral health. The best BH clinicians combine clinical expertise with the cultural humility and relational warmth you demonstrate.",
      execution: "Your ability to manage a high-volume caseload of brief interventions while maintaining quality clinical documentation is exactly what integrated behavioral health demands. BH clinicians who can flex between 15-minute warm handoffs and 50-minute therapy sessions are the most effective in FQHC settings.",
      growth: "Your willingness to expand your clinical expertise — whether into substance use treatment, telehealth modalities, or specialized populations — positions you for rapid advancement. BH professionals who continuously broaden their scope are in extremely high demand across California FQHCs.",
    },
    esStrengthMessages: {
      mission: "Tu dedicación a la salud conductual integrada en un entorno de atención primaria aborda una de las brechas más críticas en la salud comunitaria. Los pacientes de FQHC con acceso a servicios de BH integrados tienen resultados dramáticamente mejores — y tu compromiso con este modelo es lo que hace funcionar la integración.",
      people: "Tus habilidades terapéuticas y capacidad para generar confianza con pacientes que a menudo están en crisis es la base de la salud conductual efectiva en FQHC. Los mejores clínicos de BH combinan experiencia clínica con la humildad cultural y calidez relacional que demuestras.",
      execution: "Tu capacidad para gestionar una carga de casos de alto volumen de intervenciones breves mientras mantienes documentación clínica de calidad es exactamente lo que exige la salud conductual integrada. Los clínicos de BH que pueden alternar entre transferencias cálidas de 15 minutos y sesiones de terapia de 50 minutos son los más efectivos en entornos FQHC.",
      growth: "Tu disposición para expandir tu experiencia clínica — ya sea en tratamiento de uso de sustancias, modalidades de telesalud o poblaciones especializadas — te posiciona para un avance rápido. Los profesionales de BH que continuamente amplían su alcance tienen una demanda extremadamente alta en los FQHCs de California.",
    },
    growthMessages: {
      mission: "Protecting your own mental health is essential to sustaining your mission-driven work. Develop a consistent clinical supervision and peer consultation schedule — BH clinicians who invest in their own wellbeing provide measurably better patient care over the long term.",
      people: "Expanding your cultural competency in working with California's diverse Medi-Cal populations — including immigrant communities, LGBTQ+ patients, and individuals experiencing homelessness — will make you a more effective clinician. Seek out specialized cultural competency CEUs.",
      execution: "Developing efficient clinical documentation habits will prevent the after-hours charting that leads to burnout. Master your EHR's behavioral health templates and smart phrases — clinicians who document during sessions rather than after save 5-8 hours per week.",
      growth: "Getting trained in telehealth delivery models will expand your reach and career options. Remote BH services are expanding rapidly at FQHCs, and clinicians who are comfortable with virtual therapy platforms are increasingly preferred for supervisory roles.",
    },
    esGrowthMessages: {
      mission: "Proteger tu propia salud mental es esencial para sostener tu trabajo impulsado por la misión. Desarrolla un horario consistente de supervisión clínica y consulta entre pares — los clínicos de BH que invierten en su propio bienestar brindan atención mediblemente mejor a los pacientes a largo plazo.",
      people: "Expandir tu competencia cultural trabajando con las diversas poblaciones de Medi-Cal de California — incluyendo comunidades inmigrantes, pacientes LGBTQ+ e individuos que experimentan falta de vivienda — te hará un clínico más efectivo. Busca CEUs especializadas en competencia cultural.",
      execution: "Desarrollar hábitos eficientes de documentación clínica prevendrá la documentación después de horas que lleva al agotamiento. Domina las plantillas de salud conductual y frases inteligentes de tu EHR — los clínicos que documentan durante las sesiones en lugar de después ahorran 5-8 horas por semana.",
      growth: "Capacitarte en modelos de entrega de telesalud expandirá tu alcance y opciones de carrera. Los servicios remotos de BH se están expandiendo rápidamente en los FQHCs, y los clínicos que se sienten cómodos con plataformas de terapia virtual son cada vez más preferidos para roles de supervisión.",
    },
    nextSteps: {
      mission: "Establish a monthly peer consultation group with other FQHC BH clinicians — shared support prevents burnout and strengthens your commitment to integrated care",
      people: "Get trained in telehealth delivery models — remote BH services are expanding rapidly at FQHCs, and clinicians with virtual care skills earn $3-5K more annually",
      execution: "Master your EHR's BH-specific templates and smart phrases — efficient documentation during sessions rather than after eliminates 5-8 hours of weekly charting",
      growth: "Pursue LCSW or LPCC licensure if you haven't already — licensed BH clinicians at FQHCs earn $15-25K more than unlicensed associates and qualify for NHSC loan repayment",
    },
    esNextSteps: {
      mission: "Establece un grupo de consulta mensual entre pares con otros clínicos de BH de FQHC — el apoyo compartido previene el agotamiento y fortalece tu compromiso con la atención integrada",
      people: "Capacítate en modelos de entrega de telesalud — los servicios remotos de BH se están expandiendo rápidamente en los FQHCs, y los clínicos con habilidades de atención virtual ganan $3-5K más anualmente",
      execution: "Domina las plantillas específicas de BH y frases inteligentes de tu EHR — la documentación eficiente durante las sesiones en lugar de después elimina 5-8 horas de documentación semanal",
      growth: "Obtén la licencia LCSW o LPCC si aún no la tienes — los clínicos de BH licenciados en FQHCs ganan $15-25K más que los asociados no licenciados y califican para el reembolso de préstamos NHSC",
    },
    employerWants: {
      topQualifications: [
        "Master's degree in social work, counseling, or psychology",
        "Active CA registration or licensure (ASW, AMFT, APCC, LCSW, LMFT, LPCC)",
        "Experience with integrated behavioral health in primary care",
        "Experience with Medi-Cal populations and SDOH-related mental health challenges",
        "Bilingual English/Spanish (strongly preferred)",
      ],
      esTopQualifications: [
        "Maestría en trabajo social, consejería o psicología",
        "Registro o licencia activa de CA (ASW, AMFT, APCC, LCSW, LMFT, LPCC)",
        "Experiencia con salud conductual integrada en atención primaria",
        "Experiencia con poblaciones de Medi-Cal y desafíos de salud mental relacionados con SDOH",
        "Bilingüe inglés/español (fuertemente preferido)",
      ],
      topSkills: [
        "Brief interventions and warm handoff protocols",
        "Substance use screening and SBIRT",
        "Trauma-informed care",
        "PHQ-9 and GAD-7 administration and clinical follow-up",
        "Crisis intervention and safety planning",
      ],
      esTopSkills: [
        "Intervenciones breves y protocolos de transferencia cálida",
        "Detección de uso de sustancias y SBIRT",
        "Atención informada por trauma",
        "Administración de PHQ-9 y GAD-7 y seguimiento clínico",
        "Intervención en crisis y planificación de seguridad",
      ],
      certifications: [
        "LCSW, LMFT, or LPCC (or associate-level registration)",
        "SBIRT certification",
        "Telehealth competency training",
      ],
      esCertifications: [
        "LCSW, LMFT, o LPCC (o registro de nivel asociado)",
        "Certificación SBIRT",
        "Capacitación en competencia de telesalud",
      ],
    },
  },

  /* ================================================================ */
  /*  Registered Nurse (RN)                                             */
  /* ================================================================ */
  registered_nurse: {
    strengthMessages: {
      mission: "Your commitment to community health nursing — where resources are lean and patients are complex — reflects a level of mission alignment that FQHC leaders deeply value. RNs who choose community health over higher-paying hospital roles bring irreplaceable passion to their work.",
      people: "Your ability to communicate complex health information to patients with varying health literacy levels is what makes FQHC nursing uniquely impactful. The best community health RNs combine clinical authority with the warmth and cultural sensitivity you demonstrate.",
      execution: "Your ability to triage and act decisively under pressure is a defining trait of top FQHC nurses. Managing walk-in acuity, chronic disease panels, and immunization clinics simultaneously requires the kind of clinical composure you bring to the role.",
      growth: "Your drive to expand your clinical scope — whether through population health management, chronic care leadership, or advanced practice preparation — positions you at the forefront of FQHC nursing. RNs who invest in growth are first in line for charge nurse, clinical lead, and NP pathway opportunities.",
    },
    esStrengthMessages: {
      mission: "Tu compromiso con la enfermería de salud comunitaria — donde los recursos son limitados y los pacientes son complejos — refleja un nivel de alineación con la misión que los líderes de FQHC valoran profundamente. Los RNs que eligen la salud comunitaria sobre roles hospitalarios mejor pagados aportan una pasión irreemplazable a su trabajo.",
      people: "Tu capacidad para comunicar información de salud compleja a pacientes con niveles variados de alfabetización en salud es lo que hace que la enfermería en FQHC sea únicamente impactante. Los mejores RNs de salud comunitaria combinan autoridad clínica con la calidez y sensibilidad cultural que demuestras.",
      execution: "Tu capacidad para hacer triaje y actuar decisivamente bajo presión es un rasgo definitorio de los mejores enfermeros de FQHC. Manejar agudeza sin cita, paneles de enfermedades crónicas y clínicas de inmunización simultáneamente requiere el tipo de compostura clínica que tú aportas al rol.",
      growth: "Tu impulso por expandir tu alcance clínico — ya sea a través de gestión de salud poblacional, liderazgo de atención crónica o preparación para práctica avanzada — te posiciona a la vanguardia de la enfermería de FQHC. Los RNs que invierten en crecimiento son los primeros en línea para oportunidades de enfermero a cargo, líder clínico y camino a NP.",
    },
    growthMessages: {
      mission: "Reconnecting with the unique impact of community health nursing can sustain you through the challenging days. Attend your FQHC's patient advisory board meeting or UDS reporting session — seeing population-level health improvements that your nursing care contributed to is deeply motivating.",
      people: "Building your skills in chronic disease self-management education will multiply your patient impact. The most effective FQHC nurses teach patients to manage their own conditions — consider Stanford's Chronic Disease Self-Management Program training.",
      execution: "Developing your population health management skills — identifying care gaps across your patient panel, running overdue screenings reports, and coordinating outreach — will elevate you from bedside nurse to clinical leader at your FQHC.",
      growth: "If you're considering the NP pathway, start building your application now. Many California FQHCs offer tuition assistance for RN-to-NP programs, and NHSC loan repayment can cover up to $50K — making FQHC experience the most financially smart path to advanced practice.",
    },
    esGrowthMessages: {
      mission: "Reconectarte con el impacto único de la enfermería de salud comunitaria puede sostenerte en los días difíciles. Asiste a la reunión del consejo asesor de pacientes de tu FQHC o a la sesión de informes UDS — ver mejoras de salud a nivel poblacional a las que tu atención de enfermería contribuyó es profundamente motivador.",
      people: "Desarrollar tus habilidades en educación de autogestión de enfermedades crónicas multiplicará tu impacto en pacientes. Los enfermeros de FQHC más efectivos enseñan a los pacientes a manejar sus propias condiciones — considera la capacitación del Programa de Autogestión de Enfermedades Crónicas de Stanford.",
      execution: "Desarrollar tus habilidades de gestión de salud poblacional — identificar brechas de atención en tu panel de pacientes, ejecutar informes de detección vencidos y coordinar alcance — te elevará de enfermero de cabecera a líder clínico en tu FQHC.",
      growth: "Si estás considerando el camino a NP, comienza a construir tu solicitud ahora. Muchos FQHCs de California ofrecen asistencia de matrícula para programas de RN-a-NP, y el reembolso de préstamos NHSC puede cubrir hasta $50K — haciendo de la experiencia en FQHC el camino más inteligente financieramente hacia la práctica avanzada.",
    },
    nextSteps: {
      mission: "Apply for the National Health Service Corps (NHSC) — RNs at FQHCs can receive up to $50K in loan repayment while serving communities that need them most",
      people: "Complete Stanford's Chronic Disease Self-Management Program facilitator training — this evidence-based skill is increasingly required for RNs in FQHC chronic care teams",
      execution: "Learn to run population health reports in your EHR — RNs who can identify care gaps across patient panels and coordinate outreach are fast-tracked to charge nurse and clinical lead roles",
      growth: "Explore RN-to-NP bridge programs at California universities — FQHCs are the #1 employer of NPs in the state, and many offer tuition reimbursement for staff pursuing advanced degrees",
    },
    esNextSteps: {
      mission: "Solicita al Cuerpo Nacional de Servicio de Salud (NHSC) — los RNs en FQHCs pueden recibir hasta $50K en reembolso de préstamos mientras sirven a las comunidades que más los necesitan",
      people: "Completa la capacitación de facilitador del Programa de Autogestión de Enfermedades Crónicas de Stanford — esta habilidad basada en evidencia es cada vez más requerida para RNs en equipos de atención crónica de FQHC",
      execution: "Aprende a ejecutar informes de salud poblacional en tu EHR — los RNs que pueden identificar brechas de atención en paneles de pacientes y coordinar alcance son acelerados a roles de enfermero a cargo y líder clínico",
      growth: "Explora programas puente de RN-a-NP en universidades de California — los FQHCs son el empleador #1 de NPs en el estado, y muchos ofrecen reembolso de matrícula para personal que busca títulos avanzados",
    },
    employerWants: {
      topQualifications: [
        "Active California RN license (BSN preferred)",
        "2+ years clinical nursing experience (FQHC or community health preferred)",
        "Experience with chronic disease management (diabetes, hypertension, asthma)",
        "Familiarity with Medi-Cal populations and SDOH-related health challenges",
        "Bilingual English/Spanish preferred",
      ],
      esTopQualifications: [
        "Licencia de RN de California activa (BSN preferido)",
        "2+ años de experiencia en enfermería clínica (FQHC o salud comunitaria preferido)",
        "Experiencia con gestión de enfermedades crónicas (diabetes, hipertensión, asma)",
        "Familiaridad con poblaciones de Medi-Cal y desafíos de salud relacionados con SDOH",
        "Bilingüe inglés/español preferido",
      ],
      topSkills: [
        "Triage and clinical assessment",
        "Chronic disease management and patient education",
        "EHR proficiency (OCHIN Epic preferred)",
        "Immunization and injection administration",
        "Care team coordination and delegation",
      ],
      esTopSkills: [
        "Triaje y evaluación clínica",
        "Gestión de enfermedades crónicas y educación al paciente",
        "Dominio de EHR (OCHIN Epic preferido)",
        "Administración de inmunizaciones e inyecciones",
        "Coordinación de equipo de atención y delegación",
      ],
      certifications: [
        "California RN License (BSN preferred)",
        "BLS/CPR (ACLS preferred)",
        "Chronic Care Management certification",
      ],
      esCertifications: [
        "Licencia de RN de California (BSN preferido)",
        "BLS/CPR (ACLS preferido)",
        "Certificación en Gestión de Atención Crónica",
      ],
    },
  },

  /* ================================================================ */
  /*  Patient Services / Front Desk                                     */
  /* ================================================================ */
  patient_services: {
    strengthMessages: {
      mission: "You are the first face patients see at the FQHC — and for many Medi-Cal patients who have been dismissed or mistreated elsewhere, your welcoming presence is their first sign that this health center is different. Patient services staff who carry the mission set the tone for the entire visit.",
      people: "Your ability to manage upset patients, navigate language barriers, and maintain warmth during high-volume check-in periods is an extraordinary skill. The best FQHC front desk staff are simultaneously problem-solvers, translators, and de-escalation experts — and your people skills make that possible.",
      execution: "Your ability to manage scheduling, insurance verification, check-ins, and phone calls simultaneously while maintaining accuracy is the operational backbone of your FQHC. Patient services staff who can handle 40+ daily check-ins with minimal errors keep the entire clinic running smoothly.",
      growth: "Your desire to grow beyond front-desk operations into patient access management, eligibility programs, or revenue cycle positions you for significant career advancement. Patient services staff who continuously learn new systems and workflows are the first promoted when supervisory roles open.",
    },
    esStrengthMessages: {
      mission: "Tú eres la primera cara que los pacientes ven en el FQHC — y para muchos pacientes de Medi-Cal que han sido rechazados o maltratados en otros lugares, tu presencia acogedora es la primera señal de que este centro de salud es diferente. El personal de servicios al paciente que lleva la misión establece el tono para toda la visita.",
      people: "Tu capacidad para manejar pacientes molestos, navegar barreras de idioma y mantener la calidez durante períodos de registro de alto volumen es una habilidad extraordinaria. El mejor personal de recepción de FQHC es simultáneamente solucionador de problemas, traductor y experto en desescalación — y tus habilidades con las personas hacen eso posible.",
      execution: "Tu capacidad para gestionar programación, verificación de seguros, registros y llamadas telefónicas simultáneamente mientras mantienes precisión es la columna vertebral operativa de tu FQHC. El personal de servicios al paciente que puede manejar 40+ registros diarios con errores mínimos mantiene a toda la clínica funcionando sin problemas.",
      growth: "Tu deseo de crecer más allá de las operaciones de recepción hacia la gestión de acceso al paciente, programas de elegibilidad o ciclo de ingresos te posiciona para un avance profesional significativo. El personal de servicios al paciente que continuamente aprende nuevos sistemas y flujos de trabajo son los primeros promovidos cuando se abren roles de supervisión.",
    },
    growthMessages: {
      mission: "Remember that you're not just checking patients in — you're often the difference between a patient coming back or giving up on their health. Ask your clinic manager to share patient satisfaction survey results with you so you can see how your front-desk presence impacts the patient experience.",
      people: "Building your skills in de-escalation and trauma-informed customer service will make challenging patient interactions feel less draining. Many FQHCs offer training in verbal de-escalation techniques — this one skill reduces front-desk stress by 40%.",
      execution: "Developing a personal system for managing high-volume check-ins will reduce stress and improve patient flow. Many top front desk leads use time-blocking techniques — dedicating specific periods to phone calls, check-ins, and administrative tasks rather than trying to do everything at once.",
      growth: "Learning your FQHC's eligibility and enrollment systems — Medi-Cal enrollment, sliding fee scale, and presumptive eligibility — will expand your value and open pathways to patient access coordinator or eligibility specialist roles.",
    },
    esGrowthMessages: {
      mission: "Recuerda que no solo estás registrando pacientes — a menudo eres la diferencia entre que un paciente regrese o abandone su salud. Pide a tu gerente de clínica compartir los resultados de las encuestas de satisfacción del paciente contigo para que puedas ver cómo tu presencia en la recepción impacta la experiencia del paciente.",
      people: "Desarrollar tus habilidades en desescalación y servicio al cliente informado por trauma hará que las interacciones difíciles con pacientes se sientan menos agotadoras. Muchos FQHCs ofrecen capacitación en técnicas de desescalación verbal — esta sola habilidad reduce el estrés en la recepción en un 40%.",
      execution: "Desarrollar un sistema personal para gestionar registros de alto volumen reducirá el estrés y mejorará el flujo de pacientes. Muchos líderes de recepción destacados usan técnicas de bloques de tiempo — dedicando períodos específicos a llamadas telefónicas, registros y tareas administrativas en lugar de tratar de hacer todo a la vez.",
      growth: "Aprender los sistemas de elegibilidad e inscripción de tu FQHC — inscripción en Medi-Cal, escala de tarifas deslizantes y elegibilidad presuntiva — expandirá tu valor y abrirá caminos a roles de coordinador de acceso al paciente o especialista en elegibilidad.",
    },
    nextSteps: {
      mission: "Ask to attend one patient advisory committee meeting — hearing directly from patients about what the front desk means to them will deepen your connection to the health center's mission",
      people: "Complete a verbal de-escalation training — this is the #1 skill that reduces front-desk burnout and is increasingly required for patient services supervisory roles at FQHCs",
      execution: "Master your FQHC's scheduling and eligibility verification workflows — front desk staff who can verify Medi-Cal eligibility and schedule across multiple provider types advance to lead roles faster",
      growth: "Learn Medi-Cal eligibility rules and sliding fee scale administration — patient services staff with enrollment expertise earn $3-5K more and qualify for patient access coordinator positions",
    },
    esNextSteps: {
      mission: "Pide asistir a una reunión del comité asesor de pacientes — escuchar directamente de los pacientes sobre lo que significa la recepción para ellos profundizará tu conexión con la misión del centro de salud",
      people: "Completa una capacitación en desescalación verbal — esta es la habilidad #1 que reduce el agotamiento en la recepción y es cada vez más requerida para roles de supervisión de servicios al paciente en FQHCs",
      execution: "Domina los flujos de trabajo de programación y verificación de elegibilidad de tu FQHC — el personal de recepción que puede verificar elegibilidad de Medi-Cal y programar entre múltiples tipos de proveedores avanza a roles de liderazgo más rápido",
      growth: "Aprende las reglas de elegibilidad de Medi-Cal y la administración de escala de tarifas deslizantes — el personal de servicios al paciente con experiencia en inscripción gana $3-5K más y califica para posiciones de coordinador de acceso al paciente",
    },
    employerWants: {
      topQualifications: [
        "1+ years front desk or patient registration experience (healthcare preferred)",
        "Experience with Medi-Cal eligibility verification and insurance workflows",
        "Bilingual English/Spanish (often required, not just preferred)",
        "Familiarity with EHR scheduling systems",
        "High school diploma or equivalent (some positions require AA/AS)",
      ],
      esTopQualifications: [
        "1+ años de experiencia en recepción o registro de pacientes (salud preferido)",
        "Experiencia con verificación de elegibilidad de Medi-Cal y flujos de trabajo de seguros",
        "Bilingüe inglés/español (a menudo requerido, no solo preferido)",
        "Familiaridad con sistemas de programación EHR",
        "Diploma de preparatoria o equivalente (algunas posiciones requieren AA/AS)",
      ],
      topSkills: [
        "Multi-line phone management and scheduling",
        "Medi-Cal eligibility verification",
        "Patient registration and EHR data entry",
        "De-escalation and customer service",
        "Sliding fee scale administration",
      ],
      esTopSkills: [
        "Gestión de teléfono multilínea y programación",
        "Verificación de elegibilidad de Medi-Cal",
        "Registro de pacientes e ingreso de datos EHR",
        "Desescalación y servicio al cliente",
        "Administración de escala de tarifas deslizantes",
      ],
      certifications: [
        "CHAA (Certified Healthcare Access Associate) — preferred",
        "BLS/CPR",
      ],
      esCertifications: [
        "CHAA (Asociado Certificado de Acceso a Salud) — preferido",
        "BLS/CPR",
      ],
    },
  },

  /* ================================================================ */
  /*  Revenue Cycle / Billing                                           */
  /* ================================================================ */
  revenue_cycle: {
    strengthMessages: {
      mission: "Your work in revenue cycle directly funds the mission of your FQHC — every claim you process correctly, every denial you appeal, and every sliding fee you administer ensures the health center can keep its doors open for the patients who need it most. Revenue cycle professionals who understand this connection are invaluable.",
      people: "Your ability to communicate complex billing and eligibility information to patients and providers in plain language bridges a critical gap at FQHCs. The best revenue cycle staff translate confusing Medi-Cal rules into clear next steps — your patient-facing communication skills make the financial side of healthcare feel human.",
      execution: "Your precision in claims processing, denial management, and Medi-Cal billing compliance is what keeps your FQHC financially viable. Revenue cycle staff who maintain clean claim rates above 95% and manage denials aggressively are the unsung heroes of community health.",
      growth: "Your willingness to expand your billing expertise positions you for rapid advancement. Revenue cycle professionals who continuously learn new payer rules, coding updates, and CalAIM billing changes are in extremely high demand — and the career path from biller to revenue cycle director is well-defined at most FQHCs.",
    },
    esStrengthMessages: {
      mission: "Tu trabajo en ciclo de ingresos financia directamente la misión de tu FQHC — cada reclamo que procesas correctamente, cada denegación que apelas, y cada tarifa deslizante que administras asegura que el centro de salud pueda mantener sus puertas abiertas para los pacientes que más lo necesitan. Los profesionales de ciclo de ingresos que entienden esta conexión son invaluables.",
      people: "Tu capacidad para comunicar información compleja de facturación y elegibilidad a pacientes y proveedores en lenguaje sencillo cierra una brecha crítica en los FQHCs. El mejor personal de ciclo de ingresos traduce reglas confusas de Medi-Cal en pasos claros a seguir — tus habilidades de comunicación con pacientes hacen que el lado financiero de la salud se sienta humano.",
      execution: "Tu precisión en el procesamiento de reclamos, gestión de denegaciones y cumplimiento de facturación de Medi-Cal es lo que mantiene financieramente viable a tu FQHC. El personal de ciclo de ingresos que mantiene tasas de reclamos limpios por encima del 95% y gestiona las denegaciones agresivamente son los héroes anónimos de la salud comunitaria.",
      growth: "Tu disposición para expandir tu experiencia en facturación te posiciona para un avance rápido. Los profesionales de ciclo de ingresos que continuamente aprenden nuevas reglas de pagadores, actualizaciones de codificación y cambios de facturación CalAIM tienen una demanda extremadamente alta — y el camino profesional de facturador a director de ciclo de ingresos está bien definido en la mayoría de los FQHCs.",
    },
    growthMessages: {
      mission: "Connecting your billing work to patient outcomes can transform how you view your role. When you successfully appeal a denial or enroll a patient in a sliding fee program, you're removing a barrier to care. Ask your FQHC's leadership to share how revenue cycle performance ties to expanded services and patient access.",
      people: "Strengthening your ability to explain billing statements and Medi-Cal coverage to patients in plain, empathetic language will set you apart. Many patients at FQHCs avoid care because of billing confusion — your clarity can literally keep them engaged in treatment.",
      execution: "Building a systematic denial management workflow — categorizing denials by type, tracking appeal timelines, and identifying patterns — will significantly improve your recovery rates. Top revenue cycle staff at FQHCs recover 30-40% of initially denied claims through disciplined follow-up.",
      growth: "Consider CPC or CCS-P certification — it can increase your salary by $5-8K at most FQHCs and is the most recognized credential for advancement to billing supervisor or revenue cycle manager positions.",
    },
    esGrowthMessages: {
      mission: "Conectar tu trabajo de facturación con los resultados de los pacientes puede transformar cómo ves tu rol. Cuando apelas exitosamente una denegación o inscribes a un paciente en un programa de tarifa deslizante, estás eliminando una barrera para la atención. Pide al liderazgo de tu FQHC compartir cómo el desempeño del ciclo de ingresos se relaciona con servicios expandidos y acceso al paciente.",
      people: "Fortalecer tu capacidad para explicar estados de cuenta y cobertura de Medi-Cal a los pacientes en lenguaje sencillo y empático te distinguirá. Muchos pacientes en FQHCs evitan la atención por confusión con la facturación — tu claridad puede literalmente mantenerlos comprometidos con su tratamiento.",
      execution: "Construir un flujo de trabajo sistemático de gestión de denegaciones — categorizando denegaciones por tipo, rastreando plazos de apelación e identificando patrones — mejorará significativamente tus tasas de recuperación. El mejor personal de ciclo de ingresos en FQHCs recupera 30-40% de reclamos inicialmente denegados a través de seguimiento disciplinado.",
      growth: "Considera la certificación CPC o CCS-P — puede aumentar tu salario en $5-8K en la mayoría de los FQHCs y es la credencial más reconocida para avanzar a posiciones de supervisor de facturación o gerente de ciclo de ingresos.",
    },
    nextSteps: {
      mission: "Ask to attend your FQHC's board meeting when financial reports are presented — understanding how your billing work funds patient services programs will strengthen your connection to the mission",
      people: "Develop a plain-language financial FAQ for front desk staff and patients — revenue cycle professionals who improve patient financial communication are recognized for leadership potential",
      execution: "Build a denial management tracker sorted by payer and denial reason — systematic denial follow-up recovers 30-40% of lost revenue and is the fastest way to demonstrate your value to leadership",
      growth: "Pursue CPC or CCS-P certification — it can increase your salary by $5-8K and is required for most revenue cycle manager positions at California FQHCs",
    },
    esNextSteps: {
      mission: "Pide asistir a la reunión de la junta de tu FQHC cuando se presenten informes financieros — entender cómo tu trabajo de facturación financia programas de servicios al paciente fortalecerá tu conexión con la misión",
      people: "Desarrolla un FAQ financiero en lenguaje sencillo para el personal de recepción y pacientes — los profesionales de ciclo de ingresos que mejoran la comunicación financiera con pacientes son reconocidos por su potencial de liderazgo",
      execution: "Construye un rastreador de gestión de denegaciones organizado por pagador y razón de denegación — el seguimiento sistemático de denegaciones recupera 30-40% de ingresos perdidos y es la forma más rápida de demostrar tu valor al liderazgo",
      growth: "Obtén la certificación CPC o CCS-P — puede aumentar tu salario en $5-8K y es requerida para la mayoría de posiciones de gerente de ciclo de ingresos en FQHCs de California",
    },
    employerWants: {
      topQualifications: [
        "2+ years medical billing or revenue cycle experience",
        "Experience with Medi-Cal (Fee-for-Service and Managed Care) billing",
        "Knowledge of FQHC PPS (Prospective Payment System) and wrap payments",
        "Familiarity with sliding fee scale administration and 340B program",
        "Experience with denial management and accounts receivable follow-up",
      ],
      esTopQualifications: [
        "2+ años de experiencia en facturación médica o ciclo de ingresos",
        "Experiencia con facturación de Medi-Cal (Pago por Servicio y Atención Administrada)",
        "Conocimiento del PPS (Sistema de Pago Prospectivo) de FQHC y pagos complementarios",
        "Familiaridad con administración de escala de tarifas deslizantes y programa 340B",
        "Experiencia con gestión de denegaciones y seguimiento de cuentas por cobrar",
      ],
      topSkills: [
        "Medi-Cal billing and claims processing",
        "ICD-10 and CPT coding",
        "Denial management and appeals",
        "EHR billing modules (OCHIN Epic preferred)",
        "FQHC PPS and sliding fee scale administration",
      ],
      esTopSkills: [
        "Facturación de Medi-Cal y procesamiento de reclamos",
        "Codificación ICD-10 y CPT",
        "Gestión de denegaciones y apelaciones",
        "Módulos de facturación EHR (OCHIN Epic preferido)",
        "PPS de FQHC y administración de escala de tarifas deslizantes",
      ],
      certifications: [
        "CPC (Certified Professional Coder)",
        "CCS-P (Certified Coding Specialist — Physician-based)",
        "CRCR (Certified Revenue Cycle Representative)",
      ],
      esCertifications: [
        "CPC (Codificador Profesional Certificado)",
        "CCS-P (Especialista en Codificación Certificado — Basado en Médico)",
        "CRCR (Representante Certificado de Ciclo de Ingresos)",
      ],
    },
  },
};
