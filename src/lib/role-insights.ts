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
      transition: "Your ability to assess a new community quickly — mapping contacts, identifying high-risk patients, and building your own outreach system from scratch — shows exceptional transition readiness. CHWs who can self-organize their first 90 days without hand-holding are the ones FQHCs fight to keep.",
    },
    esStrengthMessages: {
      mission: "Tu profunda conexión con la misión comunitaria es exactamente lo que hace a los CHWs la columna vertebral del alcance en FQHCs. Los Promotores más efectivos comparten tu impulso por servir — y los FQHCs con CHWs motivados por la misión ven 30% mejor retención de pacientes.",
      people: "Tu habilidad natural para generar confianza con pacientes de diversos orígenes es la habilidad más valiosa que un CHW puede tener. Los gerentes de contratación consistentemente clasifican la conexión cultural por encima de las habilidades técnicas al seleccionar personal de alcance.",
      execution: "Tu capacidad para manejar visitas domiciliarias, referencias y documentación bajo plazos ajustados demuestra verdadera preparación en campo. Los CHWs que pueden manejar altas cargas de casos sin perder seguimientos son los que ascienden a roles de liderazgo.",
      growth: "Tu entusiasmo por expandirte más allá del alcance básico hacia programas especializados como ECM y CalAIM te posiciona para un rápido crecimiento profesional. Los CHWs que buscan capacitación adicional ganan $5-8K más dentro de dos años en la mayoría de los FQHCs de California.",
      transition: "Tu capacidad para evaluar una nueva comunidad rápidamente — mapear contactos, identificar pacientes de alto riesgo, y construir tu propio sistema de alcance desde cero — demuestra una preparación excepcional para la transición. Los CHWs que pueden auto-organizarse en sus primeros 90 días sin necesitar que les lleven de la mano son los que los FQHCs luchan por retener.",
    },
    growthMessages: {
      mission: "Reconnecting with your 'why' can transform how you show up for patients. Shadow a senior Promotor at your FQHC or attend a community health worker conference — hearing patient impact stories reignites the spark that brought you to this work.",
      people: "Building your motivational interviewing skills will transform your patient engagement. Consider the MI training offered through many FQHCs — it's often free for staff and is the single highest-impact skill upgrade for CHWs.",
      execution: "Creating a structured daily workflow for managing your caseload will reduce stress and prevent missed follow-ups. Many top CHWs use a simple morning triage system — 10 minutes reviewing who needs contact today saves hours of catch-up later.",
      growth: "Investing time in learning one new program area — ECM enrollment, SDOH screening tools, or CalAIM Community Supports — each quarter will steadily expand your value and open doors to lead CHW or care coordinator positions.",
      transition: "When starting at a new FQHC or inheriting a new community panel, invest your first week in diagnosing the situation rather than jumping straight into outreach. Map community resources, identify who the previous CHW connected with, and schedule a conversation with your supervisor about what success looks like at 30, 60, and 90 days.",
    },
    esGrowthMessages: {
      mission: "Reconectarte con tu 'por qué' puede transformar cómo te presentas ante los pacientes. Acompaña a un Promotor senior en tu FQHC o asiste a una conferencia de promotores de salud — escuchar historias de impacto en pacientes reaviva la chispa que te trajo a este trabajo.",
      people: "Desarrollar tus habilidades de entrevista motivacional transformará tu participación con pacientes. Considera la capacitación en EM que ofrecen muchos FQHCs — a menudo es gratuita para el personal y es la mejora de habilidad de mayor impacto para los CHWs.",
      execution: "Crear un flujo de trabajo diario estructurado para manejar tu carga de casos reducirá el estrés y evitará seguimientos perdidos. Muchos CHWs destacados usan un sistema simple de triaje matutino — 10 minutos revisando quién necesita contacto hoy ahorra horas de ponerse al día después.",
      growth: "Invertir tiempo en aprender una nueva área de programa — inscripción ECM, herramientas de detección SDOH, o Apoyos Comunitarios CalAIM — cada trimestre expandirá constantemente tu valor y abrirá puertas a posiciones de CHW líder o coordinador de atención.",
      transition: "Cuando empieces en un nuevo FQHC o heredes un nuevo panel comunitario, invierte tu primera semana en diagnosticar la situación en lugar de lanzarte directamente al alcance. Mapea recursos comunitarios, identifica con quién se conectó el CHW anterior, y programa una conversación con tu supervisor sobre cómo se ve el éxito a los 30, 60 y 90 días.",
    },
    nextSteps: {
      mission: "Pursue your California CHW Certification — it can boost your salary by $3-5K and is increasingly required by Medi-Cal managed care plans",
      people: "Complete a free Motivational Interviewing training through your FQHC or the CA Department of Public Health — this is the #1 skill CHW hiring managers look for",
      execution: "Learn to use your FQHC's EHR for care gap tracking and population health reports — CHWs who master EHR workflows get promoted to lead roles 40% faster",
      growth: "Get trained in CalAIM Community Supports and ECM enrollment — these programs are expanding rapidly and CHWs with this expertise earn $4-6K more annually",
      transition: "Before your first day at a new FQHC, research the community it serves — demographics, languages spoken, key community organizations. Arrive with a list of questions for your supervisor about expectations, success metrics, and who the key internal allies are for your outreach work",
    },
    esNextSteps: {
      mission: "Obtén tu Certificación de CHW de California — puede aumentar tu salario en $3-5K y es cada vez más requerida por los planes de atención administrada de Medi-Cal",
      people: "Completa una capacitación gratuita de Entrevista Motivacional a través de tu FQHC o el Departamento de Salud Pública de CA — esta es la habilidad #1 que buscan los gerentes de contratación de CHW",
      execution: "Aprende a usar el EHR de tu FQHC para rastreo de brechas de atención e informes de salud poblacional — los CHWs que dominan los flujos de trabajo del EHR ascienden a roles de liderazgo 40% más rápido",
      growth: "Capacítate en Apoyos Comunitarios CalAIM e inscripción ECM — estos programas se están expandiendo rápidamente y los CHWs con esta experiencia ganan $4-6K más anualmente",
      transition: "Antes de tu primer día en un nuevo FQHC, investiga la comunidad que sirve — demografía, idiomas hablados, organizaciones comunitarias clave. Llega con una lista de preguntas para tu supervisor sobre expectativas, métricas de éxito, y quiénes son los aliados internos clave para tu trabajo de alcance",
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
      transition: "Your ability to triage an inherited patient panel, identify compliance risks, and build your own tracking systems without waiting for a perfect handoff shows the kind of transition readiness that FQHCs value most. Care coordinators who can self-organize through chaotic transitions protect both patients and program funding.",
    },
    esStrengthMessages: {
      mission: "Tu compromiso de asegurar que los pacientes no se pierdan en el sistema es la marca de un coordinador de atención excepcional. Los FQHCs con coordinadores motivados por la misión ven resultados ECM/CCM mediblemente mejores y puntuaciones HEDIS más altas.",
      people: "Tu capacidad para coordinar entre proveedores, pacientes y agencias comunitarias es lo que hace que la atención compleja realmente funcione. Los mejores coordinadores de atención son arquitectos de relaciones — y tus habilidades interpersonales te distinguen en un rol donde la colaboración es todo.",
      execution: "Tu capacidad para gestionar planes de atención de docenas de pacientes mientras cumples con plazos estrictos de documentación de Medi-Cal es un rasgo definitorio de los mejores coordinadores de atención en FQHCs. Esta precisión operativa impulsa directamente el reembolso del programa.",
      growth: "Tu impulso por profundizar tu conocimiento clínico y expandirte a nuevos modelos de atención como CalAIM te posiciona para avanzar a roles de supervisión y gestión de programas. Los coordinadores de atención que continuamente mejoran sus habilidades son los primeros considerados para posiciones de líder de equipo.",
      transition: "Tu capacidad para hacer triaje de un panel heredado de pacientes, identificar riesgos de cumplimiento, y construir tus propios sistemas de seguimiento sin esperar una transferencia perfecta demuestra la preparación para la transición que los FQHCs más valoran. Los coordinadores de atención que pueden auto-organizarse durante transiciones caóticas protegen tanto a los pacientes como la financiación del programa.",
    },
    growthMessages: {
      mission: "Strengthening your connection to patient outcomes — not just task completion — will elevate your effectiveness. Request access to your FQHC's quality metrics dashboard so you can see how your coordination work translates into real health improvements.",
      people: "Developing your skills in leading care team huddles and facilitating warm handoffs between providers will make you indispensable. Practice running a 5-minute morning huddle with your care team — this one skill separates coordinators from care coordination leaders.",
      execution: "Master your FQHC's EHR care plan templates — power users who can build and track care plans efficiently advance 40% faster. Spend 30 minutes with an EHR super-user to learn shortcuts that save hours each week.",
      growth: "Pursuing formal training in population health management or case management methodology will accelerate your path to supervisory roles. Many California FQHCs offer tuition reimbursement for care coordination certifications.",
      transition: "When inheriting a patient panel, resist the urge to call everyone immediately. Instead, spend your first 48 hours triaging by urgency (compliance deadlines, upcoming appointments, hospitalizations), then schedule a focused conversation with your supervisor to align on priorities and learn the team's reporting cadence.",
    },
    esGrowthMessages: {
      mission: "Fortalecer tu conexión con los resultados de los pacientes — no solo el cumplimiento de tareas — elevará tu efectividad. Solicita acceso al panel de métricas de calidad de tu FQHC para que puedas ver cómo tu trabajo de coordinación se traduce en mejoras reales de salud.",
      people: "Desarrollar tus habilidades para liderar reuniones de equipo de atención y facilitar transferencias cálidas entre proveedores te hará indispensable. Practica dirigir una reunión matutina de 5 minutos con tu equipo de atención — esta sola habilidad separa a los coordinadores de los líderes de coordinación de atención.",
      execution: "Domina las plantillas de planes de atención del EHR de tu FQHC — los usuarios avanzados que pueden crear y rastrear planes de atención eficientemente avanzan 40% más rápido. Pasa 30 minutos con un súper-usuario del EHR para aprender atajos que ahorran horas cada semana.",
      growth: "Buscar capacitación formal en gestión de salud poblacional o metodología de gestión de casos acelerará tu camino a roles de supervisión. Muchos FQHCs de California ofrecen reembolso de matrícula para certificaciones de coordinación de atención.",
      transition: "Cuando heredes un panel de pacientes, resiste la urgencia de llamar a todos inmediatamente. En cambio, dedica tus primeras 48 horas a hacer triaje por urgencia (plazos de cumplimiento, citas próximas, hospitalizaciones), luego programa una conversación enfocada con tu supervisor para alinear prioridades y aprender la cadencia de reportes del equipo.",
    },
    nextSteps: {
      mission: "Ask your supervisor for access to HEDIS and UDS quality metrics — understanding how your work impacts population health measures will deepen your mission connection",
      people: "Take a warm handoff training through your health plan or FQHC — care coordinators who master cross-provider communication see better patient follow-through rates",
      execution: "Master your FQHC's EHR care plan templates — power users advance 40% faster and reduce documentation time by up to 50%",
      growth: "Pursue CCM or AIHCP Case Management certification — it can increase your salary by $4-7K and qualifies you for lead coordinator roles",
      transition: "Create a '90-day onboarding checklist' for yourself at every new position: Week 1 — triage patient panel and meet care team. Month 1 — complete all required compliance documentation and establish supervisor check-ins. Month 3 — fully independent with all active care plans documented and up to date",
    },
    esNextSteps: {
      mission: "Pide a tu supervisor acceso a las métricas de calidad HEDIS y UDS — entender cómo tu trabajo impacta las medidas de salud poblacional profundizará tu conexión con la misión",
      people: "Toma una capacitación de transferencia cálida a través de tu plan de salud o FQHC — los coordinadores de atención que dominan la comunicación entre proveedores ven mejores tasas de seguimiento de pacientes",
      execution: "Domina las plantillas de planes de atención del EHR de tu FQHC — los usuarios avanzados avanzan 40% más rápido y reducen el tiempo de documentación hasta en un 50%",
      growth: "Obtén la certificación CCM o de Gestión de Casos AIHCP — puede aumentar tu salario en $4-7K y te califica para roles de coordinador líder",
      transition: "Crea una 'lista de verificación de incorporación de 90 días' para ti en cada nueva posición: Semana 1 — triaje del panel de pacientes y conocer al equipo de atención. Mes 1 — completar toda la documentación de cumplimiento requerida y establecer reuniones con supervisor. Mes 3 — completamente independiente con todos los planes de atención activos documentados y actualizados",
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
      transition: "Your ability to quickly learn each provider's preferences, adapt to a new EHR system, and proactively align with your care team demonstrates the transition readiness that clinic managers value most. MAs who invest in understanding their new environment — rather than just waiting for instructions — earn provider trust and autonomy faster.",
    },
    esStrengthMessages: {
      mission: "Tu dedicación a servir a los pacientes en las líneas del frente de la salud comunitaria es el motor que mantiene funcionando a los FQHCs. Los asistentes médicos que conectan su trabajo diario con la misión del centro de salud tienen las tasas de retención más altas — y los pacientes notan la diferencia.",
      people: "Tu capacidad para tranquilizar a pacientes ansiosos durante la toma de signos vitales y el ingreso es una habilidad que no se puede enseñar en un libro de texto. Los FQHCs dependen de MAs que puedan cerrar la brecha entre los proveedores clínicos y las comunidades que sirven — tu calidez y conciencia cultural hacen exactamente eso.",
      execution: "Tu eficiencia preparando pacientes, gestionando horarios de proveedores y manejando pruebas de punto de atención mantiene a toda la clínica funcionando. Los mejores asistentes médicos de FQHC procesan 20-25 pacientes por día sin sacrificar calidad — tus habilidades de ejecución son lo que lo hacen posible.",
      growth: "Tu ambición de crecer más allá de las funciones básicas de MA te posiciona para avanzar a roles de MA líder, supervisor de back-office o carrera clínica. Los MAs que continuamente expanden su alcance son los miembros de equipo más valiosos en cualquier FQHC.",
      transition: "Tu capacidad para aprender rápidamente las preferencias de cada proveedor, adaptarte a un nuevo sistema EHR, y alinearte proactivamente con tu equipo de atención demuestra la preparación para la transición que los gerentes de clínica más valoran. Los MAs que invierten en entender su nuevo entorno — en lugar de solo esperar instrucciones — ganan la confianza y autonomía de los proveedores más rápido.",
    },
    growthMessages: {
      mission: "Connecting your daily tasks — vitals, injections, EHR documentation — to patient outcomes will reignite your sense of purpose. Ask your provider about the patients whose health improved because your accurate vitals caught something early.",
      people: "Strengthening your patient communication skills, especially explaining procedures in plain language to patients with limited health literacy, will set you apart. Practice the teach-back method: after explaining something, ask the patient to repeat it in their own words.",
      execution: "Developing a pre-visit planning routine will transform your workflow. Reviewing tomorrow's schedule the afternoon before — checking labs, immunization gaps, and screening needs — means fewer surprises and smoother patient flow.",
      growth: "Expanding into phlebotomy, EKG, or medication administration will increase your scope and earning potential. Many California FQHCs cover the cost of these additional certifications for existing MAs.",
      transition: "When starting at a new clinic or transferring between sites, take initiative to learn each provider's workflow preferences in the first week. Create a cheat sheet for each provider you work with — their preferred vitals order, rooming preferences, and common procedures. This small investment saves weeks of friction.",
    },
    esGrowthMessages: {
      mission: "Conectar tus tareas diarias — signos vitales, inyecciones, documentación EHR — con los resultados del paciente reavivará tu sentido de propósito. Pregunta a tu proveedor sobre los pacientes cuya salud mejoró porque tus signos vitales precisos detectaron algo temprano.",
      people: "Fortalecer tus habilidades de comunicación con pacientes, especialmente explicando procedimientos en lenguaje sencillo a pacientes con alfabetización limitada en salud, te distinguirá. Practica el método de enseñanza-retorno: después de explicar algo, pide al paciente que lo repita con sus propias palabras.",
      execution: "Desarrollar una rutina de planificación previa a la visita transformará tu flujo de trabajo. Revisar el horario de mañana la tarde anterior — verificando laboratorios, brechas de inmunización y necesidades de detección — significa menos sorpresas y un flujo de pacientes más fluido.",
      growth: "Expandirte a flebotomía, EKG o administración de medicamentos aumentará tu alcance y potencial de ingresos. Muchos FQHCs de California cubren el costo de estas certificaciones adicionales para MAs existentes.",
      transition: "Cuando empieces en una nueva clínica o te transfieran entre sitios, toma la iniciativa de aprender las preferencias de flujo de trabajo de cada proveedor en la primera semana. Crea una hoja de referencia para cada proveedor con quien trabajas — su orden preferido de signos vitales, preferencias de preparación de pacientes, y procedimientos comunes. Esta pequeña inversión ahorra semanas de fricción.",
    },
    nextSteps: {
      mission: "Volunteer for your FQHC's patient engagement or quality improvement committee — MAs who participate in QI initiatives are prioritized for lead roles",
      people: "Complete a health literacy or plain-language communication training — patients at FQHCs often have limited English or medical vocabulary, and this skill dramatically improves satisfaction scores",
      execution: "Learn pre-visit planning in your EHR system — MAs who can identify care gaps before the patient arrives are the most valued team members",
      growth: "Get your phlebotomy certification if you don't have it — it expands your scope, adds $1-3K to your salary, and is required for most lead MA positions at California FQHCs",
      transition: "On your first day at a new clinic, schedule 10-minute conversations with each provider you'll support — ask about their top 3 preferences for patient rooming and what frustrates them most about MA workflow. This proactive alignment earns trust immediately",
    },
    esNextSteps: {
      mission: "Ofrécete como voluntario/a para el comité de participación del paciente o mejora de calidad de tu FQHC — los MAs que participan en iniciativas QI son priorizados para roles de liderazgo",
      people: "Completa una capacitación en alfabetización en salud o comunicación en lenguaje sencillo — los pacientes en FQHCs a menudo tienen inglés limitado o vocabulario médico, y esta habilidad mejora dramáticamente las puntuaciones de satisfacción",
      execution: "Aprende planificación previa a la visita en tu sistema EHR — los MAs que pueden identificar brechas de atención antes de que llegue el paciente son los miembros de equipo más valorados",
      growth: "Obtén tu certificación de flebotomía si no la tienes — expande tu alcance, agrega $1-3K a tu salario, y es requerida para la mayoría de posiciones de MA líder en FQHCs de California",
      transition: "En tu primer día en una nueva clínica, programa conversaciones de 10 minutos con cada proveedor que apoyarás — pregunta sobre sus 3 preferencias principales para preparar pacientes y qué les frustra más del flujo de trabajo de MA. Esta alineación proactiva gana confianza inmediatamente",
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
      transition: "Your ability to triage an inherited high-acuity caseload, identify urgent deadlines, and build your own tracking systems from day one shows the self-organization that distinguishes great case managers. Taking over complex cases with no handoff documentation requires exactly the kind of structured problem-solving you demonstrate.",
    },
    esStrengthMessages: {
      mission: "Tu defensa inquebrantable de los pacientes que navegan sistemas complejos es el corazón de la gestión de casos efectiva. Los gestores de casos que se mantienen anclados a la misión a través del papeleo, las negaciones y la burocracia son los que realmente cambian vidas en los FQHCs.",
      people: "Tu habilidad para construir relación terapéutica con pacientes de alta agudeza — muchos de los cuales tienen profunda desconfianza del sistema de salud — es lo que hace posible la atención compleja. Los mejores gestores de casos de FQHC combinan conocimiento clínico con los instintos relacionales que demuestras.",
      execution: "Tu capacidad para gestionar cargas de casos de alta agudeza mientras mantienes cumplimiento con los requisitos de documentación TCM y ECM de Medi-Cal demuestra la disciplina operativa que los FQHCs necesitan desesperadamente. Esta precisión es lo que mantiene los programas financiados.",
      growth: "Tu compromiso de mantenerte actualizado/a sobre cambios en las políticas de Medi-Cal y expandir tu base de conocimiento clínico te prepara para avanzar a la gestión de programas. Los gestores de casos que proactivamente aprenden nuevas regulaciones y modelos de atención son promovidos significativamente más rápido.",
      transition: "Tu capacidad para hacer triaje de un caseload heredado de alta agudeza, identificar plazos urgentes, y construir tus propios sistemas de seguimiento desde el primer día demuestra la auto-organización que distingue a los grandes gestores de casos. Tomar casos complejos sin documentación de transferencia requiere exactamente el tipo de resolución estructurada de problemas que demuestras.",
    },
    growthMessages: {
      mission: "Reconnecting with individual patient success stories can prevent the compassion fatigue that affects many case managers. Ask your supervisor about shadowing a community outreach visit — seeing patients thrive in their own environment reminds you why this work matters.",
      people: "Deepening your trauma-informed care skills will transform your work with high-acuity populations. Many FQHC patients have experienced adverse childhood experiences, housing instability, and system mistrust — specialized TIC training helps you meet them where they are.",
      execution: "Developing templates and workflows for common case management scenarios — new ECM enrollments, care transitions, authorization requests — will free up mental energy for the complex cases that truly need your judgment.",
      growth: "Building expertise in a specialty population — such as individuals experiencing homelessness, justice-involved patients, or those with serious mental illness — will make you invaluable. FQHCs are increasingly creating specialized case management teams for CalAIM populations.",
      transition: "When taking over a caseload with minimal documentation, prioritize by deadline urgency — court dates, housing placements, and authorization expirations can't wait. Build a simple tracking system (even a spreadsheet) in your first 48 hours, then use your first supervisor meeting to learn who the key community partners are and how the team handles crisis situations.",
    },
    esGrowthMessages: {
      mission: "Reconectarte con historias individuales de éxito de pacientes puede prevenir la fatiga por compasión que afecta a muchos gestores de casos. Pide a tu supervisor acompañar una visita de alcance comunitario — ver a los pacientes prosperar en su propio entorno te recuerda por qué importa este trabajo.",
      people: "Profundizar tus habilidades de atención informada por trauma transformará tu trabajo con poblaciones de alta agudeza. Muchos pacientes de FQHC han experimentado experiencias adversas en la infancia, inestabilidad de vivienda y desconfianza del sistema — la capacitación especializada en TIC te ayuda a encontrarlos donde están.",
      execution: "Desarrollar plantillas y flujos de trabajo para escenarios comunes de gestión de casos — nuevas inscripciones ECM, transiciones de atención, solicitudes de autorización — liberará energía mental para los casos complejos que verdaderamente necesitan tu juicio.",
      growth: "Construir experiencia en una población especializada — como personas que experimentan falta de vivienda, pacientes involucrados en el sistema de justicia, o aquellos con enfermedad mental seria — te hará invaluable. Los FQHCs están creando cada vez más equipos especializados de gestión de casos para poblaciones CalAIM.",
      transition: "Cuando tomes un caseload con documentación mínima, prioriza por urgencia de plazos — fechas de corte, colocaciones de vivienda y expiraciones de autorizaciones no pueden esperar. Construye un sistema simple de seguimiento (incluso una hoja de cálculo) en tus primeras 48 horas, luego usa tu primera reunión con tu supervisor para aprender quiénes son los socios comunitarios clave y cómo el equipo maneja situaciones de crisis.",
    },
    nextSteps: {
      mission: "Join a CalAIM learning collaborative or your county's ECM/CCM workgroup — connecting with other case managers fighting the same fights strengthens your sense of purpose",
      people: "Complete trauma-informed care (TIC) training through your FQHC or a California-approved provider — this is the most requested skill for case managers working with ECM populations",
      execution: "Build a personal template library for ECM care plans, progress notes, and authorization requests — case managers with standardized workflows handle 25% more cases without quality drops",
      growth: "Pursue your Certified Case Manager (CCM) credential — it can increase your salary by $5-8K and is the most recognized qualification for advancement to program management",
      transition: "Before starting any new case management position, prepare three things: a caseload triage template (urgency, last contact, next deadline), a list of questions for your supervisor about team workflows and crisis protocols, and a 30-day goal to map every community resource partner your FQHC works with",
    },
    esNextSteps: {
      mission: "Únete a un colaborativo de aprendizaje CalAIM o al grupo de trabajo ECM/CCM de tu condado — conectarte con otros gestores de casos luchando las mismas batallas fortalece tu sentido de propósito",
      people: "Completa capacitación en atención informada por trauma (TIC) a través de tu FQHC o un proveedor aprobado por California — esta es la habilidad más solicitada para gestores de casos que trabajan con poblaciones ECM",
      execution: "Construye una biblioteca personal de plantillas para planes de atención ECM, notas de progreso y solicitudes de autorización — los gestores de casos con flujos de trabajo estandarizados manejan 25% más casos sin caída en calidad",
      growth: "Obtén tu credencial de Gerente de Casos Certificado (CCM) — puede aumentar tu salario en $5-8K y es la calificación más reconocida para avanzar a la gestión de programas",
      transition: "Antes de comenzar cualquier nueva posición de gestión de casos, prepara tres cosas: una plantilla de triaje de caseload (urgencia, último contacto, próximo plazo), una lista de preguntas para tu supervisor sobre flujos de trabajo del equipo y protocolos de crisis, y una meta de 30 días para mapear cada socio de recursos comunitarios con el que trabaja tu FQHC",
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
      transition: "Your ability to diagnose the integration landscape — understanding where you fit on the care team, proactively educating providers on your role, and building referral pathways from scratch — shows the transition readiness that makes integrated BH actually work. BH clinicians who wait for perfect role clarity never achieve it; those who actively shape their role succeed faster.",
    },
    esStrengthMessages: {
      mission: "Tu dedicación a la salud conductual integrada en un entorno de atención primaria aborda una de las brechas más críticas en la salud comunitaria. Los pacientes de FQHC con acceso a servicios de BH integrados tienen resultados dramáticamente mejores — y tu compromiso con este modelo es lo que hace funcionar la integración.",
      people: "Tus habilidades terapéuticas y capacidad para generar confianza con pacientes que a menudo están en crisis es la base de la salud conductual efectiva en FQHC. Los mejores clínicos de BH combinan experiencia clínica con la humildad cultural y calidez relacional que demuestras.",
      execution: "Tu capacidad para gestionar una carga de casos de alto volumen de intervenciones breves mientras mantienes documentación clínica de calidad es exactamente lo que exige la salud conductual integrada. Los clínicos de BH que pueden alternar entre transferencias cálidas de 15 minutos y sesiones de terapia de 50 minutos son los más efectivos en entornos FQHC.",
      growth: "Tu disposición para expandir tu experiencia clínica — ya sea en tratamiento de uso de sustancias, modalidades de telesalud o poblaciones especializadas — te posiciona para un avance rápido. Los profesionales de BH que continuamente amplían su alcance tienen una demanda extremadamente alta en los FQHCs de California.",
      transition: "Tu capacidad para diagnosticar el panorama de integración — entender dónde encajas en el equipo de atención, educar proactivamente a los proveedores sobre tu rol, y construir vías de referido desde cero — demuestra la preparación para la transición que hace que la BH integrada realmente funcione. Los clínicos de BH que esperan claridad perfecta del rol nunca la logran; los que activamente moldean su rol tienen éxito más rápido.",
    },
    growthMessages: {
      mission: "Protecting your own mental health is essential to sustaining your mission-driven work. Develop a consistent clinical supervision and peer consultation schedule — BH clinicians who invest in their own wellbeing provide measurably better patient care over the long term.",
      people: "Expanding your cultural competency in working with California's diverse Medi-Cal populations — including immigrant communities, LGBTQ+ patients, and individuals experiencing homelessness — will make you a more effective clinician. Seek out specialized cultural competency CEUs.",
      execution: "Developing efficient clinical documentation habits will prevent the after-hours charting that leads to burnout. Master your EHR's behavioral health templates and smart phrases — clinicians who document during sessions rather than after save 5-8 hours per week.",
      growth: "Getting trained in telehealth delivery models will expand your reach and career options. Remote BH services are expanding rapidly at FQHCs, and clinicians who are comfortable with virtual therapy platforms are increasingly preferred for supervisory roles.",
      transition: "When joining a new integrated care team, spend your first two weeks observing the clinic flow before trying to change anything. Meet 1:1 with each provider to understand their perspective on BH needs, then create a simple one-page 'When to Refer to BH' guide. Establishing weekly check-ins with your BH supervisor — even if remote — is essential for maintaining clinical direction during the transition.",
    },
    esGrowthMessages: {
      mission: "Proteger tu propia salud mental es esencial para sostener tu trabajo impulsado por la misión. Desarrolla un horario consistente de supervisión clínica y consulta entre pares — los clínicos de BH que invierten en su propio bienestar brindan atención mediblemente mejor a los pacientes a largo plazo.",
      people: "Expandir tu competencia cultural trabajando con las diversas poblaciones de Medi-Cal de California — incluyendo comunidades inmigrantes, pacientes LGBTQ+ e individuos que experimentan falta de vivienda — te hará un clínico más efectivo. Busca CEUs especializadas en competencia cultural.",
      execution: "Desarrollar hábitos eficientes de documentación clínica prevendrá la documentación después de horas que lleva al agotamiento. Domina las plantillas de salud conductual y frases inteligentes de tu EHR — los clínicos que documentan durante las sesiones en lugar de después ahorran 5-8 horas por semana.",
      growth: "Capacitarte en modelos de entrega de telesalud expandirá tu alcance y opciones de carrera. Los servicios remotos de BH se están expandiendo rápidamente en los FQHCs, y los clínicos que se sienten cómodos con plataformas de terapia virtual son cada vez más preferidos para roles de supervisión.",
      transition: "Al unirte a un nuevo equipo de atención integrada, dedica tus primeras dos semanas a observar el flujo de la clínica antes de intentar cambiar algo. Reúnete 1:1 con cada proveedor para entender su perspectiva sobre las necesidades de BH, luego crea una guía simple de una página 'Cuándo Referir a BH'. Establecer check-ins semanales con tu supervisor de BH — incluso si es remoto — es esencial para mantener la dirección clínica durante la transición.",
    },
    nextSteps: {
      mission: "Establish a monthly peer consultation group with other FQHC BH clinicians — shared support prevents burnout and strengthens your commitment to integrated care",
      people: "Get trained in telehealth delivery models — remote BH services are expanding rapidly at FQHCs, and clinicians with virtual care skills earn $3-5K more annually",
      execution: "Master your EHR's BH-specific templates and smart phrases — efficient documentation during sessions rather than after eliminates 5-8 hours of weekly charting",
      growth: "Pursue LCSW or LPCC licensure if you haven't already — licensed BH clinicians at FQHCs earn $15-25K more than unlicensed associates and qualify for NHSC loan repayment",
      transition: "In your first month at a new FQHC, create a 'BH integration playbook' — a one-page guide for providers on when warm handoffs are appropriate, what BH can and can't address in a 15-minute consultation, and how to refer for ongoing therapy. This single document establishes your role faster than any orientation",
    },
    esNextSteps: {
      mission: "Establece un grupo de consulta mensual entre pares con otros clínicos de BH de FQHC — el apoyo compartido previene el agotamiento y fortalece tu compromiso con la atención integrada",
      people: "Capacítate en modelos de entrega de telesalud — los servicios remotos de BH se están expandiendo rápidamente en los FQHCs, y los clínicos con habilidades de atención virtual ganan $3-5K más anualmente",
      execution: "Domina las plantillas específicas de BH y frases inteligentes de tu EHR — la documentación eficiente durante las sesiones en lugar de después elimina 5-8 horas de documentación semanal",
      growth: "Obtén la licencia LCSW o LPCC si aún no la tienes — los clínicos de BH licenciados en FQHCs ganan $15-25K más que los asociados no licenciados y califican para el reembolso de préstamos NHSC",
      transition: "En tu primer mes en un nuevo FQHC, crea un 'manual de integración de BH' — una guía de una página para proveedores sobre cuándo son apropiadas las transferencias cálidas, qué puede y no puede abordar BH en una consulta de 15 minutos, y cómo referir para terapia continua. Este solo documento establece tu rol más rápido que cualquier orientación",
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
      transition: "Your ability to build your own 'site readiness' system — quickly mapping protocols, contacts, and supply locations at each new clinic — shows exceptional self-organization. Float nurses and RNs who transfer between FQHC sites and can be effective from day one are the most valued nursing professionals in community health.",
    },
    esStrengthMessages: {
      mission: "Tu compromiso con la enfermería de salud comunitaria — donde los recursos son limitados y los pacientes son complejos — refleja un nivel de alineación con la misión que los líderes de FQHC valoran profundamente. Los RNs que eligen la salud comunitaria sobre roles hospitalarios mejor pagados aportan una pasión irreemplazable a su trabajo.",
      people: "Tu capacidad para comunicar información de salud compleja a pacientes con niveles variados de alfabetización en salud es lo que hace que la enfermería en FQHC sea únicamente impactante. Los mejores RNs de salud comunitaria combinan autoridad clínica con la calidez y sensibilidad cultural que demuestras.",
      execution: "Tu capacidad para hacer triaje y actuar decisivamente bajo presión es un rasgo definitorio de los mejores enfermeros de FQHC. Manejar agudeza sin cita, paneles de enfermedades crónicas y clínicas de inmunización simultáneamente requiere el tipo de compostura clínica que tú aportas al rol.",
      growth: "Tu impulso por expandir tu alcance clínico — ya sea a través de gestión de salud poblacional, liderazgo de atención crónica o preparación para práctica avanzada — te posiciona a la vanguardia de la enfermería de FQHC. Los RNs que invierten en crecimiento son los primeros en línea para oportunidades de enfermero a cargo, líder clínico y camino a NP.",
      transition: "Tu capacidad para construir tu propio sistema de 'preparación por sitio' — mapear rápidamente protocolos, contactos y ubicaciones de suministros en cada nueva clínica — demuestra una auto-organización excepcional. Los enfermeros flotantes y RNs que se transfieren entre sitios de FQHC y pueden ser efectivos desde el primer día son los profesionales de enfermería más valorados en salud comunitaria.",
    },
    growthMessages: {
      mission: "Reconnecting with the unique impact of community health nursing can sustain you through the challenging days. Attend your FQHC's patient advisory board meeting or UDS reporting session — seeing population-level health improvements that your nursing care contributed to is deeply motivating.",
      people: "Building your skills in chronic disease self-management education will multiply your patient impact. The most effective FQHC nurses teach patients to manage their own conditions — consider Stanford's Chronic Disease Self-Management Program training.",
      execution: "Developing your population health management skills — identifying care gaps across your patient panel, running overdue screenings reports, and coordinating outreach — will elevate you from bedside nurse to clinical leader at your FQHC.",
      growth: "If you're considering the NP pathway, start building your application now. Many California FQHCs offer tuition assistance for RN-to-NP programs, and NHSC loan repayment can cover up to $50K — making FQHC experience the most financially smart path to advanced practice.",
      transition: "When floating between sites or starting at a new clinic, build a quick-reference card for each location: key contacts, supply room locations, site-specific protocols, and emergency procedures. Ask the MAs — they know the practical details better than anyone. And always schedule a conversation with your nursing supervisor to clarify which protocols take precedence when sites differ.",
    },
    esGrowthMessages: {
      mission: "Reconectarte con el impacto único de la enfermería de salud comunitaria puede sostenerte en los días difíciles. Asiste a la reunión del consejo asesor de pacientes de tu FQHC o a la sesión de informes UDS — ver mejoras de salud a nivel poblacional a las que tu atención de enfermería contribuyó es profundamente motivador.",
      people: "Desarrollar tus habilidades en educación de autogestión de enfermedades crónicas multiplicará tu impacto en pacientes. Los enfermeros de FQHC más efectivos enseñan a los pacientes a manejar sus propias condiciones — considera la capacitación del Programa de Autogestión de Enfermedades Crónicas de Stanford.",
      execution: "Desarrollar tus habilidades de gestión de salud poblacional — identificar brechas de atención en tu panel de pacientes, ejecutar informes de detección vencidos y coordinar alcance — te elevará de enfermero de cabecera a líder clínico en tu FQHC.",
      growth: "Si estás considerando el camino a NP, comienza a construir tu solicitud ahora. Muchos FQHCs de California ofrecen asistencia de matrícula para programas de RN-a-NP, y el reembolso de préstamos NHSC puede cubrir hasta $50K — haciendo de la experiencia en FQHC el camino más inteligente financieramente hacia la práctica avanzada.",
      transition: "Cuando rotes entre sitios o empieces en una nueva clínica, construye una tarjeta de referencia rápida para cada ubicación: contactos clave, ubicaciones de suministros, protocolos específicos del sitio y procedimientos de emergencia. Pregunta a los MAs — ellos conocen los detalles prácticos mejor que nadie. Y siempre programa una conversación con tu supervisor de enfermería para clarificar qué protocolos tienen prioridad cuando los sitios difieren.",
    },
    nextSteps: {
      mission: "Apply for the National Health Service Corps (NHSC) — RNs at FQHCs can receive up to $50K in loan repayment while serving communities that need them most",
      people: "Complete Stanford's Chronic Disease Self-Management Program facilitator training — this evidence-based skill is increasingly required for RNs in FQHC chronic care teams",
      execution: "Learn to run population health reports in your EHR — RNs who can identify care gaps across patient panels and coordinate outreach are fast-tracked to charge nurse and clinical lead roles",
      growth: "Explore RN-to-NP bridge programs at California universities — FQHCs are the #1 employer of NPs in the state, and many offer tuition reimbursement for staff pursuing advanced degrees",
      transition: "Build a portable 'site readiness kit' — a template you can fill in at each new clinic with key contacts, supply locations, protocol variations, and emergency procedures. RNs who arrive prepared to adapt earn trust from providers and staff immediately",
    },
    esNextSteps: {
      mission: "Solicita al Cuerpo Nacional de Servicio de Salud (NHSC) — los RNs en FQHCs pueden recibir hasta $50K en reembolso de préstamos mientras sirven a las comunidades que más los necesitan",
      people: "Completa la capacitación de facilitador del Programa de Autogestión de Enfermedades Crónicas de Stanford — esta habilidad basada en evidencia es cada vez más requerida para RNs en equipos de atención crónica de FQHC",
      execution: "Aprende a ejecutar informes de salud poblacional en tu EHR — los RNs que pueden identificar brechas de atención en paneles de pacientes y coordinar alcance son acelerados a roles de enfermero a cargo y líder clínico",
      growth: "Explora programas puente de RN-a-NP en universidades de California — los FQHCs son el empleador #1 de NPs en el estado, y muchos ofrecen reembolso de matrícula para personal que busca títulos avanzados",
      transition: "Construye un 'kit de preparación por sitio' portátil — una plantilla que puedes llenar en cada nueva clínica con contactos clave, ubicaciones de suministros, variaciones de protocolo y procedimientos de emergencia. Los RNs que llegan preparados para adaptarse ganan confianza de proveedores y personal inmediatamente",
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
      transition: "Your ability to triage immediate patient needs, request a buddy system for learning new workflows, and create your own reference materials during a chaotic system transition shows exactly the kind of self-organization that front desk supervisors look for. Patient services staff who can be effective during organizational change — not just stable operations — are the ones who advance.",
    },
    esStrengthMessages: {
      mission: "Tú eres la primera cara que los pacientes ven en el FQHC — y para muchos pacientes de Medi-Cal que han sido rechazados o maltratados en otros lugares, tu presencia acogedora es la primera señal de que este centro de salud es diferente. El personal de servicios al paciente que lleva la misión establece el tono para toda la visita.",
      people: "Tu capacidad para manejar pacientes molestos, navegar barreras de idioma y mantener la calidez durante períodos de registro de alto volumen es una habilidad extraordinaria. El mejor personal de recepción de FQHC es simultáneamente solucionador de problemas, traductor y experto en desescalación — y tus habilidades con las personas hacen eso posible.",
      execution: "Tu capacidad para gestionar programación, verificación de seguros, registros y llamadas telefónicas simultáneamente mientras mantienes precisión es la columna vertebral operativa de tu FQHC. El personal de servicios al paciente que puede manejar 40+ registros diarios con errores mínimos mantiene a toda la clínica funcionando sin problemas.",
      growth: "Tu deseo de crecer más allá de las operaciones de recepción hacia la gestión de acceso al paciente, programas de elegibilidad o ciclo de ingresos te posiciona para un avance profesional significativo. El personal de servicios al paciente que continuamente aprende nuevos sistemas y flujos de trabajo son los primeros promovidos cuando se abren roles de supervisión.",
      transition: "Tu capacidad para hacer triaje de necesidades inmediatas de pacientes, solicitar un sistema de compañero para aprender nuevos flujos de trabajo, y crear tus propios materiales de referencia durante una transición caótica de sistema demuestra exactamente el tipo de auto-organización que buscan los supervisores de recepción. El personal de servicios al paciente que puede ser efectivo durante el cambio organizacional — no solo en operaciones estables — son los que avanzan.",
    },
    growthMessages: {
      mission: "Remember that you're not just checking patients in — you're often the difference between a patient coming back or giving up on their health. Ask your clinic manager to share patient satisfaction survey results with you so you can see how your front-desk presence impacts the patient experience.",
      people: "Building your skills in de-escalation and trauma-informed customer service will make challenging patient interactions feel less draining. Many FQHCs offer training in verbal de-escalation techniques — this one skill reduces front-desk stress by 40%.",
      execution: "Developing a personal system for managing high-volume check-ins will reduce stress and improve patient flow. Many top front desk leads use time-blocking techniques — dedicating specific periods to phone calls, check-ins, and administrative tasks rather than trying to do everything at once.",
      growth: "Learning your FQHC's eligibility and enrollment systems — Medi-Cal enrollment, sliding fee scale, and presumptive eligibility — will expand your value and open pathways to patient access coordinator or eligibility specialist roles.",
      transition: "When starting at a new FQHC — especially during a system change — ask for a buddy from the experienced staff for your first week. Create your own cheat sheet of common workflows in the new system as you learn them. The most successful front desk staff don't wait for perfect training; they learn by doing and document as they go, then share what they learn with the team.",
    },
    esGrowthMessages: {
      mission: "Recuerda que no solo estás registrando pacientes — a menudo eres la diferencia entre que un paciente regrese o abandone su salud. Pide a tu gerente de clínica compartir los resultados de las encuestas de satisfacción del paciente contigo para que puedas ver cómo tu presencia en la recepción impacta la experiencia del paciente.",
      people: "Desarrollar tus habilidades en desescalación y servicio al cliente informado por trauma hará que las interacciones difíciles con pacientes se sientan menos agotadoras. Muchos FQHCs ofrecen capacitación en técnicas de desescalación verbal — esta sola habilidad reduce el estrés en la recepción en un 40%.",
      execution: "Desarrollar un sistema personal para gestionar registros de alto volumen reducirá el estrés y mejorará el flujo de pacientes. Muchos líderes de recepción destacados usan técnicas de bloques de tiempo — dedicando períodos específicos a llamadas telefónicas, registros y tareas administrativas en lugar de tratar de hacer todo a la vez.",
      growth: "Aprender los sistemas de elegibilidad e inscripción de tu FQHC — inscripción en Medi-Cal, escala de tarifas deslizantes y elegibilidad presuntiva — expandirá tu valor y abrirá caminos a roles de coordinador de acceso al paciente o especialista en elegibilidad.",
      transition: "Cuando empieces en un nuevo FQHC — especialmente durante un cambio de sistema — pide un compañero del personal experimentado para tu primera semana. Crea tu propia hoja de referencia de flujos de trabajo comunes en el nuevo sistema conforme los aprendas. El personal de recepción más exitoso no espera capacitación perfecta; aprenden haciendo y documentan sobre la marcha, luego comparten lo que aprenden con el equipo.",
    },
    nextSteps: {
      mission: "Ask to attend one patient advisory committee meeting — hearing directly from patients about what the front desk means to them will deepen your connection to the health center's mission",
      people: "Complete a verbal de-escalation training — this is the #1 skill that reduces front-desk burnout and is increasingly required for patient services supervisory roles at FQHCs",
      execution: "Master your FQHC's scheduling and eligibility verification workflows — front desk staff who can verify Medi-Cal eligibility and schedule across multiple provider types advance to lead roles faster",
      growth: "Learn Medi-Cal eligibility rules and sliding fee scale administration — patient services staff with enrollment expertise earn $3-5K more and qualify for patient access coordinator positions",
      transition: "In your first week at any new front desk position, create a 'common scenarios' cheat sheet — how to handle walk-ins, phone triage, eligibility questions, and system workarounds. Ask an experienced colleague to review it. This document becomes your survival guide and shows your supervisor you're self-organizing",
    },
    esNextSteps: {
      mission: "Pide asistir a una reunión del comité asesor de pacientes — escuchar directamente de los pacientes sobre lo que significa la recepción para ellos profundizará tu conexión con la misión del centro de salud",
      people: "Completa una capacitación en desescalación verbal — esta es la habilidad #1 que reduce el agotamiento en la recepción y es cada vez más requerida para roles de supervisión de servicios al paciente en FQHCs",
      execution: "Domina los flujos de trabajo de programación y verificación de elegibilidad de tu FQHC — el personal de recepción que puede verificar elegibilidad de Medi-Cal y programar entre múltiples tipos de proveedores avanza a roles de liderazgo más rápido",
      growth: "Aprende las reglas de elegibilidad de Medi-Cal y la administración de escala de tarifas deslizantes — el personal de servicios al paciente con experiencia en inscripción gana $3-5K más y califica para posiciones de coordinador de acceso al paciente",
      transition: "En tu primera semana en cualquier nueva posición de recepción, crea una hoja de referencia de 'escenarios comunes' — cómo manejar pacientes sin cita, triaje telefónico, preguntas de elegibilidad y soluciones alternativas del sistema. Pide a un colega experimentado que la revise. Este documento se convierte en tu guía de supervivencia y le muestra a tu supervisor que te auto-organizas",
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
      transition: "Your ability to diagnose root causes of revenue problems — pulling denial data, contacting payers directly, and building comparison documents of what changed — shows the analytical transition readiness that sets top revenue cycle professionals apart. Billing specialists who can walk into chaos, identify the systemic issue, and propose a structured fix are the ones who get promoted to leadership.",
    },
    esStrengthMessages: {
      mission: "Tu trabajo en ciclo de ingresos financia directamente la misión de tu FQHC — cada reclamo que procesas correctamente, cada denegación que apelas, y cada tarifa deslizante que administras asegura que el centro de salud pueda mantener sus puertas abiertas para los pacientes que más lo necesitan. Los profesionales de ciclo de ingresos que entienden esta conexión son invaluables.",
      people: "Tu capacidad para comunicar información compleja de facturación y elegibilidad a pacientes y proveedores en lenguaje sencillo cierra una brecha crítica en los FQHCs. El mejor personal de ciclo de ingresos traduce reglas confusas de Medi-Cal en pasos claros a seguir — tus habilidades de comunicación con pacientes hacen que el lado financiero de la salud se sienta humano.",
      execution: "Tu precisión en el procesamiento de reclamos, gestión de denegaciones y cumplimiento de facturación de Medi-Cal es lo que mantiene financieramente viable a tu FQHC. El personal de ciclo de ingresos que mantiene tasas de reclamos limpios por encima del 95% y gestiona las denegaciones agresivamente son los héroes anónimos de la salud comunitaria.",
      growth: "Tu disposición para expandir tu experiencia en facturación te posiciona para un avance rápido. Los profesionales de ciclo de ingresos que continuamente aprenden nuevas reglas de pagadores, actualizaciones de codificación y cambios de facturación CalAIM tienen una demanda extremadamente alta — y el camino profesional de facturador a director de ciclo de ingresos está bien definido en la mayoría de los FQHCs.",
      transition: "Tu capacidad para diagnosticar las causas raíz de problemas de ingresos — obtener datos de denegaciones, contactar pagadores directamente, y construir documentos comparativos de qué cambió — demuestra la preparación analítica para la transición que distingue a los mejores profesionales de ciclo de ingresos. Los especialistas en facturación que pueden entrar al caos, identificar el problema sistémico, y proponer una solución estructurada son los que ascienden al liderazgo.",
    },
    growthMessages: {
      mission: "Connecting your billing work to patient outcomes can transform how you view your role. When you successfully appeal a denial or enroll a patient in a sliding fee program, you're removing a barrier to care. Ask your FQHC's leadership to share how revenue cycle performance ties to expanded services and patient access.",
      people: "Strengthening your ability to explain billing statements and Medi-Cal coverage to patients in plain, empathetic language will set you apart. Many patients at FQHCs avoid care because of billing confusion — your clarity can literally keep them engaged in treatment.",
      execution: "Building a systematic denial management workflow — categorizing denials by type, tracking appeal timelines, and identifying patterns — will significantly improve your recovery rates. Top revenue cycle staff at FQHCs recover 30-40% of initially denied claims through disciplined follow-up.",
      growth: "Consider CPC or CCS-P certification — it can increase your salary by $5-8K at most FQHCs and is the most recognized credential for advancement to billing supervisor or revenue cycle manager positions.",
      transition: "When joining a new FQHC billing team, start by pulling denial reports and categorizing the top 5 denial reasons. Contact payers directly to get current authorization requirements. Then meet with your supervisor to align on priorities: should you focus on stopping new denials or recovering the backlog? This diagnostic approach shows leadership thinking from day one.",
    },
    esGrowthMessages: {
      mission: "Conectar tu trabajo de facturación con los resultados de los pacientes puede transformar cómo ves tu rol. Cuando apelas exitosamente una denegación o inscribes a un paciente en un programa de tarifa deslizante, estás eliminando una barrera para la atención. Pide al liderazgo de tu FQHC compartir cómo el desempeño del ciclo de ingresos se relaciona con servicios expandidos y acceso al paciente.",
      people: "Fortalecer tu capacidad para explicar estados de cuenta y cobertura de Medi-Cal a los pacientes en lenguaje sencillo y empático te distinguirá. Muchos pacientes en FQHCs evitan la atención por confusión con la facturación — tu claridad puede literalmente mantenerlos comprometidos con su tratamiento.",
      execution: "Construir un flujo de trabajo sistemático de gestión de denegaciones — categorizando denegaciones por tipo, rastreando plazos de apelación e identificando patrones — mejorará significativamente tus tasas de recuperación. El mejor personal de ciclo de ingresos en FQHCs recupera 30-40% de reclamos inicialmente denegados a través de seguimiento disciplinado.",
      growth: "Considera la certificación CPC o CCS-P — puede aumentar tu salario en $5-8K en la mayoría de los FQHCs y es la credencial más reconocida para avanzar a posiciones de supervisor de facturación o gerente de ciclo de ingresos.",
      transition: "Al unirte a un nuevo equipo de facturación de FQHC, comienza obteniendo reportes de denegaciones y categorizando las 5 principales razones de denegación. Contacta a los pagadores directamente para obtener los requisitos de autorización actuales. Luego reúnete con tu supervisor para alinear prioridades: ¿debes enfocarte en detener nuevas denegaciones o recuperar el atraso? Este enfoque de diagnóstico demuestra pensamiento de liderazgo desde el primer día.",
    },
    nextSteps: {
      mission: "Ask to attend your FQHC's board meeting when financial reports are presented — understanding how your billing work funds patient services programs will strengthen your connection to the mission",
      people: "Develop a plain-language financial FAQ for front desk staff and patients — revenue cycle professionals who improve patient financial communication are recognized for leadership potential",
      execution: "Build a denial management tracker sorted by payer and denial reason — systematic denial follow-up recovers 30-40% of lost revenue and is the fastest way to demonstrate your value to leadership",
      growth: "Pursue CPC or CCS-P certification — it can increase your salary by $5-8K and is required for most revenue cycle manager positions at California FQHCs",
      transition: "In your first 30 days at a new FQHC, create a payer matrix documenting each major payer's current authorization requirements, fee schedules, and appeal deadlines. This single document prevents denials and becomes an essential team resource that demonstrates your value immediately",
    },
    esNextSteps: {
      mission: "Pide asistir a la reunión de la junta de tu FQHC cuando se presenten informes financieros — entender cómo tu trabajo de facturación financia programas de servicios al paciente fortalecerá tu conexión con la misión",
      people: "Desarrolla un FAQ financiero en lenguaje sencillo para el personal de recepción y pacientes — los profesionales de ciclo de ingresos que mejoran la comunicación financiera con pacientes son reconocidos por su potencial de liderazgo",
      execution: "Construye un rastreador de gestión de denegaciones organizado por pagador y razón de denegación — el seguimiento sistemático de denegaciones recupera 30-40% de ingresos perdidos y es la forma más rápida de demostrar tu valor al liderazgo",
      growth: "Obtén la certificación CPC o CCS-P — puede aumentar tu salario en $5-8K y es requerida para la mayoría de posiciones de gerente de ciclo de ingresos en FQHCs de California",
      transition: "En tus primeros 30 días en un nuevo FQHC, crea una matriz de pagadores documentando los requisitos de autorización actuales, tarifas y plazos de apelación de cada pagador principal. Este solo documento previene denegaciones y se convierte en un recurso esencial del equipo que demuestra tu valor inmediatamente",
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

  /* ================================================================ */
  /*  HR Manager — Human Resources Manager / HR Generalist             */
  /* ================================================================ */
  hr_manager: {
    strengthMessages: {
      mission: "Your understanding that every hire shapes patient outcomes sets you apart from HR professionals who see recruitment as purely transactional. FQHCs with mission-driven HR leaders build teams that stay — and staff retention directly translates to better patient continuity and health outcomes.",
      people: "Your ability to navigate the complex dynamics between management, union representatives, and frontline staff is exactly what FQHCs need during this era of workforce disruption. HR managers who can build trust across all levels are the ones who prevent costly grievances and keep clinics running smoothly.",
      execution: "Your systematic approach to compliance — from SB 525 wage implementation to HRSA workforce reporting — demonstrates the operational rigor that FQHCs desperately need. Organizations with strong HR execution see 25% fewer compliance findings during site visits.",
      growth: "Your willingness to learn new workforce programs like CalAIM ECM staffing requirements and CHW certification pathways positions you as a strategic HR partner, not just a transactional one. FQHCs are increasingly looking for HR leaders who understand program-driven hiring.",
      transition: "Your ability to quickly assess an FQHC's workforce culture, understand union dynamics, and map key internal relationships shows exceptional readiness for new environments. HR managers who invest in organizational diagnosis before implementing changes earn trust faster and drive better outcomes.",
    },
    esStrengthMessages: {
      mission: "Tu comprensión de que cada contratación impacta los resultados de los pacientes te distingue de los profesionales de Recursos Humanos que ven el reclutamiento como puramente transaccional. Los FQHCs con líderes de RH motivados por la misión construyen equipos que permanecen — y la retención de personal se traduce directamente en mejor continuidad del paciente y mejores resultados de salud.",
      people: "Tu capacidad para navegar las dinámicas complejas entre la gerencia, representantes sindicales y personal de primera línea es exactamente lo que los FQHCs necesitan durante esta era de disrupción laboral. Los gerentes de RH que pueden generar confianza en todos los niveles son los que previenen quejas costosas y mantienen las clínicas funcionando sin problemas.",
      execution: "Tu enfoque sistemático del cumplimiento — desde la implementación de salarios SB 525 hasta los informes de fuerza laboral de HRSA — demuestra el rigor operativo que los FQHCs necesitan desesperadamente. Las organizaciones con ejecución fuerte de RH ven 25% menos hallazgos de cumplimiento durante visitas de inspección.",
      growth: "Tu disposición para aprender nuevos programas de fuerza laboral como los requisitos de personal ECM de CalAIM y las vías de certificación CHW te posiciona como un socio estratégico de RH, no solo transaccional. Los FQHCs buscan cada vez más líderes de RH que entiendan la contratación impulsada por programas.",
      transition: "Tu capacidad para evaluar rápidamente la cultura laboral de un FQHC, entender las dinámicas sindicales, y mapear relaciones internas clave muestra una preparación excepcional para nuevos entornos. Los gerentes de RH que invierten en diagnóstico organizacional antes de implementar cambios ganan confianza más rápido y generan mejores resultados.",
    },
    growthMessages: {
      mission: "Deepening your understanding of how each FQHC role impacts patient outcomes will make your hiring decisions more strategic. Shadow a Care Coordinator or CHW for a day — seeing how frontline staff serve patients helps you write better job postings and screen for the right qualities.",
      people: "Investing in formal labor relations training will pay dividends at any unionized FQHC. Consider the Cornell ILR Healthcare Labor Management certificate — it teaches collaborative bargaining approaches that are specifically designed for healthcare settings where strikes would harm patients.",
      execution: "Building automated compliance tracking systems for wage regulations, credentialing deadlines, and HRSA reporting will free up time you currently spend on manual monitoring. Many CA FQHCs use BambooHR or ADP with compliance modules — getting certified on these platforms makes you more valuable.",
      growth: "Staying current on CalAIM workforce requirements and CA labor law changes (like SB 525 implementation phases) positions you as an indispensable resource. Subscribe to CPCA's workforce updates and attend NACHC's annual HR Forum.",
      transition: "When joining a new FQHC, spend your first two weeks doing a 'listening tour' — meet every department head, every union steward, and visit every site. Ask about their biggest people challenges before proposing any HR changes. This builds trust and gives you the context to make smart decisions.",
    },
    esGrowthMessages: {
      mission: "Profundizar tu comprensión de cómo cada rol en un FQHC impacta los resultados de los pacientes hará tus decisiones de contratación más estratégicas. Acompaña a un Coordinador de Cuidado o CHW por un día — ver cómo el personal de primera línea sirve a los pacientes te ayuda a escribir mejores publicaciones de trabajo y seleccionar las cualidades correctas.",
      people: "Invertir en capacitación formal en relaciones laborales dará dividendos en cualquier FQHC sindicalizado. Considera el certificado de Gestión Laboral en Salud de Cornell ILR — enseña enfoques de negociación colaborativa diseñados específicamente para entornos de salud donde las huelgas perjudicarían a los pacientes.",
      execution: "Construir sistemas automatizados de seguimiento de cumplimiento para regulaciones salariales, fechas límite de credenciales, e informes de HRSA liberará tiempo que actualmente gastas en monitoreo manual. Muchos FQHCs de CA usan BambooHR o ADP con módulos de cumplimiento — obtener certificaciones en estas plataformas te hace más valioso.",
      growth: "Mantenerte actualizado en requisitos de fuerza laboral CalAIM y cambios de ley laboral de CA (como las fases de implementación de SB 525) te posiciona como un recurso indispensable. Suscríbete a las actualizaciones de fuerza laboral de CPCA y asiste al Foro Anual de RH de NACHC.",
      transition: "Cuando te unas a un nuevo FQHC, pasa tus primeras dos semanas haciendo un 'tour de escucha' — reúnete con cada jefe de departamento, cada delegado sindical, y visita cada sitio. Pregunta sobre sus mayores desafíos de personal antes de proponer cualquier cambio de RH. Esto construye confianza y te da el contexto para tomar decisiones inteligentes.",
    },
    nextSteps: {
      mission: "Connect with NACHC's workforce development resources to understand the national landscape of FQHC hiring challenges — this context will help you advocate for mission-aligned hiring practices at your organization",
      people: "If your FQHC is unionized, build a regular check-in cadence with union stewards — monthly informal meetings prevent small issues from becoming formal grievances and build the trust that makes contract negotiations smoother",
      execution: "Audit your FQHC's compliance with SB 525 minimum wage requirements now — map every employee's current wage against the tier schedule and identify compression risks before they become retention problems",
      growth: "Learn the CalAIM ECM and Community Supports workforce requirements — FQHCs expanding these programs need HR leaders who can build hiring pipelines for CHWs, Care Coordinators, and housing navigators",
      transition: "Before your first day at a new FQHC, research its HRSA grant scope, any recent OSHA or CMS findings, union status, and Glassdoor reviews. Arrive with a clear picture of the workforce landscape you're walking into",
    },
    esNextSteps: {
      mission: "Conéctate con los recursos de desarrollo de fuerza laboral de NACHC para entender el panorama nacional de desafíos de contratación en FQHCs — este contexto te ayudará a abogar por prácticas de contratación alineadas con la misión en tu organización",
      people: "Si tu FQHC está sindicalizado, establece una cadencia regular de reuniones con delegados sindicales — reuniones informales mensuales previenen que problemas pequeños se conviertan en quejas formales y construyen la confianza que hace las negociaciones de contrato más fluidas",
      execution: "Audita el cumplimiento de tu FQHC con los requisitos de salario mínimo SB 525 ahora — mapea el salario actual de cada empleado contra el cronograma de niveles e identifica riesgos de compresión antes de que se conviertan en problemas de retención",
      growth: "Aprende los requisitos de fuerza laboral de ECM y Apoyos Comunitarios de CalAIM — los FQHCs que expanden estos programas necesitan líderes de RH que puedan construir pipelines de contratación para CHWs, Coordinadores de Cuidado, y navegadores de vivienda",
      transition: "Antes de tu primer día en un nuevo FQHC, investiga el alcance de su subvención HRSA, cualquier hallazgo reciente de OSHA o CMS, estado sindical, y reseñas de Glassdoor. Llega con una imagen clara del panorama laboral al que estás entrando",
    },
    employerWants: {
      topQualifications: [
        "3+ years HR experience in healthcare or community health settings",
        "Experience with union labor relations (SEIU, NUHW, or similar)",
        "Knowledge of California employment law (SB 525, CFRA, FEHA)",
        "Experience managing multi-site HR operations",
        "Familiarity with HRSA workforce reporting requirements",
      ],
      esTopQualifications: [
        "3+ años de experiencia en RH en entornos de salud o salud comunitaria",
        "Experiencia con relaciones laborales sindicales (SEIU, NUHW, o similar)",
        "Conocimiento de la ley laboral de California (SB 525, CFRA, FEHA)",
        "Experiencia gestionando operaciones de RH multi-sitio",
        "Familiaridad con requisitos de informes de fuerza laboral de HRSA",
      ],
      topSkills: [
        "Healthcare recruitment and retention strategies",
        "Union contract negotiation and grievance resolution",
        "HRIS administration (BambooHR, ADP, or Paycom)",
        "California labor law compliance",
        "Workforce planning and compensation analysis",
      ],
      esTopSkills: [
        "Estrategias de reclutamiento y retención en salud",
        "Negociación de contratos sindicales y resolución de quejas",
        "Administración de HRIS (BambooHR, ADP, o Paycom)",
        "Cumplimiento de ley laboral de California",
        "Planificación de fuerza laboral y análisis de compensación",
      ],
      certifications: [
        "PHR or SPHR (HRCI)",
        "SHRM-CP or SHRM-SCP",
        "Healthcare HR certification (CHHR)",
      ],
      esCertifications: [
        "PHR o SPHR (HRCI)",
        "SHRM-CP o SHRM-SCP",
        "Certificación de RH en Salud (CHHR)",
      ],
    },
  },

  /* ================================================================ */
  /*  Accountant — FQHC Accountant / Finance Analyst                   */
  /* ================================================================ */
  accountant: {
    strengthMessages: {
      mission: "Your ability to connect every financial transaction to patient impact is what separates an FQHC accountant from a generic one. When you understand that accurate billing protects the sliding fee scale that lets uninsured patients access care, your work becomes more than numbers — it becomes mission-critical infrastructure.",
      people: "Your skill at translating complex FQHC financial concepts — PPS rates, 340B savings, grant cost allocations — into language that non-finance staff can understand makes you an invaluable bridge between departments. Program directors who understand their budget constraints make better decisions, and that's a direct result of your communication.",
      execution: "Your methodical approach to grant accounting, audit preparation, and financial compliance is exactly what FQHCs need when HRSA site visits can determine millions in future funding. Accountants who maintain audit-ready books year-round save their organizations from last-minute scrambles that lead to findings.",
      growth: "Your drive to learn FQHC-specific financial programs — 340B accounting, PPS rate optimization, CalAIM reimbursement structures — transforms you from a general accountant into a community health finance specialist. This specialized expertise commands a significant salary premium in the FQHC market.",
      transition: "Your ability to quickly audit a new organization's financial systems, identify gaps, and prioritize improvements shows strong diagnostic skills. Accountants who approach new FQHC roles with a systematic assessment mindset contribute faster than those who just wait for assignments.",
    },
    esStrengthMessages: {
      mission: "Tu capacidad para conectar cada transacción financiera con el impacto en los pacientes es lo que separa a un contador de FQHC de uno genérico. Cuando entiendes que la facturación precisa protege la escala de tarifas deslizantes que permite a pacientes sin seguro acceder a la atención, tu trabajo se convierte en más que números — se convierte en infraestructura crítica para la misión.",
      people: "Tu habilidad para traducir conceptos financieros complejos de FQHC — tarifas PPS, ahorros 340B, asignaciones de costos de subvenciones — a un lenguaje que el personal no financiero pueda entender te convierte en un puente invaluable entre departamentos. Los directores de programa que entienden sus restricciones presupuestarias toman mejores decisiones, y eso es resultado directo de tu comunicación.",
      execution: "Tu enfoque metódico de la contabilidad de subvenciones, preparación de auditorías, y cumplimiento financiero es exactamente lo que los FQHCs necesitan cuando las visitas de HRSA pueden determinar millones en financiamiento futuro. Los contadores que mantienen libros listos para auditoría durante todo el año ahorran a sus organizaciones los apuros de último momento que llevan a hallazgos.",
      growth: "Tu impulso por aprender programas financieros específicos de FQHC — contabilidad 340B, optimización de tarifas PPS, estructuras de reembolso CalAIM — te transforma de un contador general en un especialista en finanzas de salud comunitaria. Esta experiencia especializada tiene una prima salarial significativa en el mercado de FQHC.",
      transition: "Tu capacidad para auditar rápidamente los sistemas financieros de una nueva organización, identificar brechas y priorizar mejoras muestra fuertes habilidades de diagnóstico. Los contadores que abordan nuevos roles en FQHC con una mentalidad de evaluación sistemática contribuyen más rápido que los que solo esperan asignaciones.",
    },
    growthMessages: {
      mission: "Spend time understanding how your FQHC's financial health directly affects patient access. When you can articulate that recovering $50K in denied claims means 200 more patient visits, your work takes on new meaning — and your advocacy for accurate billing becomes a mission argument, not just an accounting one.",
      people: "Schedule quarterly 'financial literacy' sessions with program directors. A 30-minute walkthrough of their department budget and how grant cost allocations work prevents the misunderstandings that cause late reporting and audit findings.",
      execution: "Build a rolling audit-readiness checklist that you update monthly — time-and-effort certifications, grant expenditure reconciliations, bank reconciliations, and accounts receivable aging. Being audit-ready year-round reduces the stress and the risk of findings.",
      growth: "Take the Apexus 340B University courses (free) and join NACHC's financial management learning community. Understanding 340B program accounting is one of the highest-value specializations for FQHC accountants.",
      transition: "When starting at a new FQHC, audit the chart of accounts and grant cost allocation methodology in your first two weeks. These two things tell you more about an organization's financial health than any briefing.",
    },
    esGrowthMessages: {
      mission: "Dedica tiempo a entender cómo la salud financiera de tu FQHC afecta directamente el acceso de los pacientes. Cuando puedes articular que recuperar $50K en reclamos denegados significa 200 visitas más de pacientes, tu trabajo toma un nuevo significado — y tu defensa de la facturación precisa se convierte en un argumento de misión, no solo contable.",
      people: "Programa sesiones trimestrales de 'alfabetización financiera' con los directores de programa. Un recorrido de 30 minutos de su presupuesto departamental y cómo funcionan las asignaciones de costos de subvenciones previene los malentendidos que causan reportes tardíos y hallazgos de auditoría.",
      execution: "Construye una lista de verificación de preparación para auditorías que actualices mensualmente — certificaciones de tiempo y esfuerzo, conciliaciones de gastos de subvenciones, conciliaciones bancarias, y antigüedad de cuentas por cobrar. Estar listo para auditoría todo el año reduce el estrés y el riesgo de hallazgos.",
      growth: "Toma los cursos de la Universidad 340B de Apexus (gratuitos) y únete a la comunidad de aprendizaje de gestión financiera de NACHC. Entender la contabilidad del programa 340B es una de las especializaciones de mayor valor para contadores de FQHC.",
      transition: "Cuando empieces en un nuevo FQHC, audita el catálogo de cuentas y la metodología de asignación de costos de subvenciones en tus primeras dos semanas. Estas dos cosas te dicen más sobre la salud financiera de una organización que cualquier briefing.",
    },
    nextSteps: {
      mission: "Visit your FQHC's clinic sites and observe patient intake — understanding the sliding fee scale enrollment process firsthand helps you see the financial workflow from the patient's perspective",
      people: "Build a one-page 'FQHC Finance 101' document for non-finance staff that explains PPS, 340B, and grant cost allocations in plain language — this becomes your most-used communication tool",
      execution: "If your FQHC uses OCHIN Epic, get trained on the financial reporting modules — accountants who can pull their own data from the EHR are dramatically more efficient than those who depend on IT for reports",
      growth: "Pursue CPA licensure if you don't have it yet — combined with FQHC experience, a CPA commands $15-20K more in salary and positions you for Finance Manager or Controller roles",
      transition: "Before your first day, review your new FQHC's most recent UDS report and HRSA grant application — these public documents tell you the organization's financial story and priorities",
    },
    esNextSteps: {
      mission: "Visita las clínicas de tu FQHC y observa el ingreso de pacientes — entender el proceso de inscripción en la escala de tarifas deslizantes de primera mano te ayuda a ver el flujo financiero desde la perspectiva del paciente",
      people: "Construye un documento de una página 'Finanzas FQHC 101' para personal no financiero que explique PPS, 340B, y asignaciones de costos de subvenciones en lenguaje simple — esto se convierte en tu herramienta de comunicación más utilizada",
      execution: "Si tu FQHC usa OCHIN Epic, obtén capacitación en los módulos de reportes financieros — los contadores que pueden obtener sus propios datos del EHR son dramáticamente más eficientes que los que dependen de TI para reportes",
      growth: "Obtén la licencia CPA si aún no la tienes — combinada con experiencia en FQHC, un CPA tiene $15-20K más en salario y te posiciona para roles de Gerente de Finanzas o Contralor",
      transition: "Antes de tu primer día, revisa el reporte UDS más reciente de tu nuevo FQHC y la solicitud de subvención HRSA — estos documentos públicos te cuentan la historia financiera y las prioridades de la organización",
    },
    employerWants: {
      topQualifications: [
        "2+ years accounting experience (healthcare or nonprofit preferred)",
        "Experience with grant accounting and cost allocation (HRSA, state grants)",
        "Knowledge of FQHC financial structures (PPS, 340B, sliding fee scale)",
        "Experience with financial audit preparation and response",
        "Familiarity with Medi-Cal and Medicare billing reconciliation",
      ],
      esTopQualifications: [
        "2+ años de experiencia contable (salud o sin fines de lucro preferido)",
        "Experiencia con contabilidad de subvenciones y asignación de costos (HRSA, subvenciones estatales)",
        "Conocimiento de estructuras financieras de FQHC (PPS, 340B, escala de tarifas deslizantes)",
        "Experiencia con preparación y respuesta de auditorías financieras",
        "Familiaridad con conciliación de facturación Medi-Cal y Medicare",
      ],
      topSkills: [
        "Grant cost allocation and reporting",
        "Accounts payable and receivable management",
        "Financial statement preparation",
        "Audit preparation and documentation",
        "Accounting software (QuickBooks, Sage, MIP Fund Accounting)",
      ],
      esTopSkills: [
        "Asignación de costos de subvenciones e informes",
        "Gestión de cuentas por pagar y cobrar",
        "Preparación de estados financieros",
        "Preparación y documentación de auditorías",
        "Software contable (QuickBooks, Sage, MIP Fund Accounting)",
      ],
      certifications: [
        "CPA (Certified Public Accountant) — preferred",
        "CMA (Certified Management Accountant)",
        "CGFM (Certified Government Financial Manager)",
      ],
      esCertifications: [
        "CPA (Contador Público Certificado) — preferido",
        "CMA (Contador de Gestión Certificado)",
        "CGFM (Gerente Financiero Gubernamental Certificado)",
      ],
    },
  },

  /* ================================================================ */
  /*  Payroll Specialist — FQHC Payroll Specialist                     */
  /* ================================================================ */
  payroll_specialist: {
    strengthMessages: {
      mission: "Your understanding that accurate, timely payroll is fundamental to the safety-net mission sets you apart. When frontline healthcare workers — many of them hourly, many living paycheck to paycheck — can count on being paid correctly and on time, they can focus entirely on patient care. Your precision protects the mission.",
      people: "Your ability to work effectively with union representatives, site timekeepers, and employees across multiple locations shows the relational skills that multi-site FQHC payroll demands. Payroll specialists who handle pay discrepancies with empathy and accountability build organizational trust.",
      execution: "Your systematic approach to processing payroll across multiple sites with different pay rules, shift differentials, and union requirements demonstrates the precision that FQHCs need. Organizations with reliable payroll execution see measurably higher employee satisfaction and lower turnover.",
      growth: "Your willingness to master new payroll challenges — system migrations, regulatory changes, multi-site integration — shows the adaptability that growing FQHCs need. Payroll specialists who can lead system implementations are highly valued and earn significantly more.",
      transition: "Your ability to quickly learn new payroll systems, understand site-specific pay rules, and build relationships with timekeepers across locations shows strong onboarding skills. Payroll specialists who can run a clean first payroll at a new FQHC earn immediate credibility.",
    },
    esStrengthMessages: {
      mission: "Tu comprensión de que la nómina precisa y oportuna es fundamental para la misión de red de seguridad te distingue. Cuando los trabajadores de salud de primera línea — muchos de ellos por hora, muchos viviendo de cheque en cheque — pueden contar con que se les pague correctamente y a tiempo, pueden enfocarse completamente en la atención al paciente. Tu precisión protege la misión.",
      people: "Tu capacidad para trabajar efectivamente con representantes sindicales, encargados de registro de tiempo de los sitios, y empleados en múltiples ubicaciones muestra las habilidades relacionales que demanda la nómina de FQHC multi-sitio. Los especialistas en nómina que manejan discrepancias salariales con empatía y responsabilidad construyen confianza organizacional.",
      execution: "Tu enfoque sistemático para procesar nómina en múltiples sitios con diferentes reglas de pago, diferenciales de turno, y requisitos sindicales demuestra la precisión que los FQHCs necesitan. Las organizaciones con ejecución confiable de nómina ven satisfacción del empleado mediblemente más alta y menor rotación.",
      growth: "Tu disposición para dominar nuevos desafíos de nómina — migraciones de sistema, cambios regulatorios, integración multi-sitio — muestra la adaptabilidad que los FQHCs en crecimiento necesitan. Los especialistas en nómina que pueden liderar implementaciones de sistemas son altamente valorados y ganan significativamente más.",
      transition: "Tu capacidad para aprender rápidamente nuevos sistemas de nómina, entender reglas de pago específicas del sitio, y construir relaciones con los encargados de registro de tiempo en todas las ubicaciones muestra fuertes habilidades de incorporación. Los especialistas en nómina que pueden ejecutar una primera nómina limpia en un nuevo FQHC ganan credibilidad inmediata.",
    },
    growthMessages: {
      mission: "Understanding the broader mission impact of your work can transform how you approach payroll challenges. Visit a clinic site and meet the MAs, CHWs, and nurses whose paychecks you process — when payroll becomes personal, your attention to detail increases naturally.",
      people: "Developing proactive communication with site timekeepers will prevent the errors that cause employee complaints. Consider scheduling monthly 5-minute check-ins with each site's timekeeper to catch common mistakes before they hit payroll.",
      execution: "Automating repetitive payroll tasks — like shift differential calculations and overtime verification — will reduce errors and free up time for the complex work that requires your judgment. Most ADP and Paychex platforms have automation features that payroll specialists underutilize.",
      growth: "Getting certified in your payroll system (ADP Workforce Now certification, Paychex Flex certification) and in CPP (Certified Payroll Professional) will position you for Senior Payroll or Payroll Manager roles at larger FQHCs.",
      transition: "When starting payroll at a new FQHC, audit the last 3 months of payroll registers for errors, reconcile all tax deposits, and verify every employee's pay rate against their offer letter or CBA scale. This baseline audit catches inherited problems before they become your problems.",
    },
    esGrowthMessages: {
      mission: "Entender el impacto más amplio de tu trabajo en la misión puede transformar cómo abordas los desafíos de nómina. Visita un sitio clínico y conoce a los MAs, CHWs, y enfermeros cuyos cheques procesas — cuando la nómina se vuelve personal, tu atención al detalle aumenta naturalmente.",
      people: "Desarrollar comunicación proactiva con los encargados de registro de tiempo de los sitios prevendrá los errores que causan quejas de empleados. Considera programar reuniones mensuales de 5 minutos con cada encargado de sitio para detectar errores comunes antes de que lleguen a la nómina.",
      execution: "Automatizar tareas repetitivas de nómina — como cálculos de diferencial de turno y verificación de horas extras — reducirá errores y liberará tiempo para el trabajo complejo que requiere tu juicio. La mayoría de las plataformas ADP y Paychex tienen funciones de automatización que los especialistas en nómina subutilizan.",
      growth: "Certificarte en tu sistema de nómina (certificación ADP Workforce Now, certificación Paychex Flex) y en CPP (Profesional de Nómina Certificado) te posicionará para roles de Nómina Senior o Gerente de Nómina en FQHCs más grandes.",
      transition: "Cuando empieces nómina en un nuevo FQHC, audita los registros de nómina de los últimos 3 meses buscando errores, concilia todos los depósitos fiscales, y verifica la tarifa de pago de cada empleado contra su carta oferta o escala del convenio colectivo. Esta auditoría de referencia detecta problemas heredados antes de que se conviertan en tus problemas.",
    },
    nextSteps: {
      mission: "Learn the basics of FQHC funding — PPS, 340B, HRSA grants — so you understand why accurate labor cost reporting matters for the organization's financial survival",
      people: "If your FQHC is unionized, read the CBA's compensation section thoroughly — understanding wage scales, step increases, shift differentials, and premium pay rules prevents grievances and builds trust with union representatives",
      execution: "Build a payroll processing checklist with verification steps for each site — consistent processes across all locations reduce errors and make payroll auditable",
      growth: "Pursue the CPP (Certified Payroll Professional) certification from the APA — it's the gold standard for payroll professionals and opens doors to management roles with $10-15K salary increases",
      transition: "Before your first payroll run at a new FQHC, get a complete employee roster with pay rates, tax withholdings, benefit deductions, garnishments, and PTO balances. Verify every data point against source documents — inherited data errors are the #1 source of payroll problems",
    },
    esNextSteps: {
      mission: "Aprende los fundamentos del financiamiento de FQHC — PPS, 340B, subvenciones HRSA — para que entiendas por qué los informes precisos de costos laborales importan para la supervivencia financiera de la organización",
      people: "Si tu FQHC está sindicalizado, lee la sección de compensación del convenio colectivo a fondo — entender las escalas salariales, aumentos por paso, diferenciales de turno, y reglas de pago premium previene quejas y construye confianza con representantes sindicales",
      execution: "Construye una lista de verificación de procesamiento de nómina con pasos de verificación para cada sitio — procesos consistentes en todas las ubicaciones reducen errores y hacen la nómina auditable",
      growth: "Obtén la certificación CPP (Profesional de Nómina Certificado) de la APA — es el estándar de oro para profesionales de nómina y abre puertas a roles de gestión con aumentos salariales de $10-15K",
      transition: "Antes de tu primera corrida de nómina en un nuevo FQHC, obtén una lista completa de empleados con tarifas de pago, retenciones fiscales, deducciones de beneficios, embargos, y saldos de PTO. Verifica cada dato contra documentos fuente — los errores de datos heredados son la fuente #1 de problemas de nómina",
    },
    employerWants: {
      topQualifications: [
        "2+ years payroll processing experience (multi-site preferred)",
        "Experience with ADP Workforce Now, Paychex, or similar payroll systems",
        "Knowledge of California labor law (overtime, meal/rest breaks, SB 525)",
        "Experience with unionized payroll (shift differentials, CBA wage scales)",
        "Familiarity with payroll tax compliance (federal, state, local)",
      ],
      esTopQualifications: [
        "2+ años de experiencia procesando nómina (multi-sitio preferido)",
        "Experiencia con ADP Workforce Now, Paychex, o sistemas de nómina similares",
        "Conocimiento de ley laboral de California (horas extras, descansos de comida/descanso, SB 525)",
        "Experiencia con nómina sindicalizada (diferenciales de turno, escalas salariales de convenio)",
        "Familiaridad con cumplimiento fiscal de nómina (federal, estatal, local)",
      ],
      topSkills: [
        "Multi-site payroll processing",
        "Payroll system administration (ADP, Paychex)",
        "California wage and hour compliance",
        "Garnishment and benefit deduction management",
        "Payroll reporting and reconciliation",
      ],
      esTopSkills: [
        "Procesamiento de nómina multi-sitio",
        "Administración de sistemas de nómina (ADP, Paychex)",
        "Cumplimiento de salarios y horas de California",
        "Gestión de embargos y deducciones de beneficios",
        "Informes y conciliación de nómina",
      ],
      certifications: [
        "CPP (Certified Payroll Professional)",
        "FPC (Fundamental Payroll Certification)",
        "ADP Workforce Now Certification",
      ],
      esCertifications: [
        "CPP (Profesional de Nómina Certificado)",
        "FPC (Certificación Fundamental de Nómina)",
        "Certificación ADP Workforce Now",
      ],
    },
  },

  /* ================================================================ */
  /*  Finance Manager — FQHC Finance Manager / Controller              */
  /* ================================================================ */
  finance_manager: {
    strengthMessages: {
      mission: "Your ability to make financial decisions through the lens of patient impact — not just P&L optimization — is exactly what FQHC leadership needs. Finance managers who can articulate why a financially challenging program protects community access are the ones who earn board trust and shape organizational strategy.",
      people: "Your skill at translating complex financial data into clear, actionable narratives for non-financial audiences — board members, program directors, community stakeholders — makes you an indispensable leadership partner. The best FQHC finance managers are as much communicators as they are analysts.",
      execution: "Your command of FQHC financial operations — cash flow management, payer contract optimization, grant compliance, and multi-source revenue management — demonstrates the operational sophistication that complex healthcare organizations require. FQHCs with strong financial execution have 35% more operating days in reserve.",
      growth: "Your drive to master new revenue models — CalAIM Community Supports, value-based care contracts, creative financing strategies — positions your FQHC to capture emerging revenue streams that competitors will miss. Finance managers who can model new programs are the ones who get promoted to CFO.",
      transition: "Your ability to quickly diagnose an FQHC's financial position — cash runway, revenue concentration risk, grant compliance status, payer mix health — shows the strategic assessment skills that CFOs look for. Finance managers who deliver a clear financial picture within 30 days earn immediate executive trust.",
    },
    esStrengthMessages: {
      mission: "Tu capacidad para tomar decisiones financieras a través del lente de impacto en pacientes — no solo optimización de pérdidas y ganancias — es exactamente lo que el liderazgo de FQHC necesita. Los gerentes de finanzas que pueden articular por qué un programa financieramente desafiante protege el acceso comunitario son los que ganan la confianza de la junta y dan forma a la estrategia organizacional.",
      people: "Tu habilidad para traducir datos financieros complejos en narrativas claras y accionables para audiencias no financieras — miembros de la junta, directores de programa, partes interesadas de la comunidad — te convierte en un socio de liderazgo indispensable. Los mejores gerentes de finanzas de FQHC son tanto comunicadores como analistas.",
      execution: "Tu dominio de las operaciones financieras de FQHC — gestión de flujo de efectivo, optimización de contratos con pagadores, cumplimiento de subvenciones, y gestión de ingresos de múltiples fuentes — demuestra la sofisticación operativa que las organizaciones de salud complejas requieren. Los FQHCs con ejecución financiera fuerte tienen 35% más días operativos en reserva.",
      growth: "Tu impulso por dominar nuevos modelos de ingresos — Apoyos Comunitarios CalAIM, contratos de atención basada en valor, estrategias creativas de financiamiento — posiciona a tu FQHC para capturar flujos de ingresos emergentes que los competidores perderán. Los gerentes de finanzas que pueden modelar nuevos programas son los que ascienden a CFO.",
      transition: "Tu capacidad para diagnosticar rápidamente la posición financiera de un FQHC — margen de efectivo, riesgo de concentración de ingresos, estado de cumplimiento de subvenciones, salud de la mezcla de pagadores — muestra las habilidades de evaluación estratégica que los CFOs buscan. Los gerentes de finanzas que entregan un panorama financiero claro dentro de 30 días ganan confianza ejecutiva inmediata.",
    },
    growthMessages: {
      mission: "Spend time in the clinics. When you can connect a revenue decision to a patient outcome you've personally witnessed, your budget presentations to the board become exponentially more powerful. The most effective FQHC finance leaders are those who never lose sight of what the numbers represent.",
      people: "Practice presenting financial results without jargon. The board members, community leaders, and program directors who need your financial guidance often don't share your vocabulary. Developing a 'financial translator' skill is the single highest-impact leadership capability for FQHC finance managers.",
      execution: "Build rolling 13-week cash flow forecasts that you update weekly. In an era of Medi-Cal payment delays and federal funding uncertainty, cash visibility isn't optional — it's survival. FQHCs with weekly cash forecasting navigate crises 60% more effectively.",
      growth: "Attend NACHC's Financial Management Conference and join the NACHC Finance Officers Network. Connecting with CFOs at other CA FQHCs gives you access to financial models, payer negotiation strategies, and CalAIM revenue data that you can't get anywhere else.",
      transition: "When joining a new FQHC, request access to the last 3 years of audited financials, the current budget, bank statements, and the HRSA grant application. Build a financial diagnostic dashboard in your first 30 days that shows revenue trends, expense ratios, cash runway, and payer mix concentration.",
    },
    esGrowthMessages: {
      mission: "Pasa tiempo en las clínicas. Cuando puedes conectar una decisión de ingresos con un resultado de paciente que has presenciado personalmente, tus presentaciones de presupuesto a la junta se vuelven exponencialmente más poderosas. Los líderes financieros de FQHC más efectivos son aquellos que nunca pierden de vista lo que representan los números.",
      people: "Practica presentar resultados financieros sin jerga. Los miembros de la junta, líderes comunitarios, y directores de programa que necesitan tu guía financiera a menudo no comparten tu vocabulario. Desarrollar la habilidad de 'traductor financiero' es la capacidad de liderazgo de mayor impacto para gerentes de finanzas de FQHC.",
      execution: "Construye pronósticos de flujo de efectivo continuos de 13 semanas que actualices semanalmente. En una era de retrasos en pagos de Medi-Cal e incertidumbre de financiamiento federal, la visibilidad de efectivo no es opcional — es supervivencia. Los FQHCs con pronóstico semanal de efectivo navegan crisis 60% más efectivamente.",
      growth: "Asiste a la Conferencia de Gestión Financiera de NACHC y únete a la Red de Oficiales de Finanzas de NACHC. Conectarte con CFOs de otros FQHCs de CA te da acceso a modelos financieros, estrategias de negociación con pagadores, y datos de ingresos CalAIM que no puedes obtener en ningún otro lugar.",
      transition: "Cuando te unas a un nuevo FQHC, solicita acceso a los últimos 3 años de estados financieros auditados, el presupuesto actual, estados de cuenta bancarios, y la solicitud de subvención HRSA. Construye un tablero de diagnóstico financiero en tus primeros 30 días que muestre tendencias de ingresos, ratios de gastos, margen de efectivo, y concentración de mezcla de pagadores.",
    },
    nextSteps: {
      mission: "Read your FQHC's HRSA grant scope of project and community needs assessment — understanding the communities you serve financially makes your budget recommendations more mission-aligned",
      people: "Develop a quarterly 'financial health scorecard' for the board that uses traffic-light indicators (green/yellow/red) instead of spreadsheets — this single tool will transform your board communication",
      execution: "Negotiate with your top 3 Medi-Cal managed care plans for faster payment terms or interim payments — many plans will agree to 30-day terms if you demonstrate consistent clean claims submission",
      growth: "Build financial models for at least one CalAIM Community Supports program — even if your FQHC isn't launching one yet, having the model ready positions you as the strategic finance leader when the CEO is ready to expand",
      transition: "Before your first day at a new FQHC, review its most recent audit report (single audit if they receive >$750K in federal funds), 990 tax return, and HRSA grant award notice. These documents reveal the financial DNA of the organization",
    },
    esNextSteps: {
      mission: "Lee el alcance del proyecto de la subvención HRSA de tu FQHC y la evaluación de necesidades de la comunidad — entender las comunidades que sirves financieramente hace tus recomendaciones de presupuesto más alineadas con la misión",
      people: "Desarrolla un 'tablero de salud financiera' trimestral para la junta que use indicadores de semáforo (verde/amarillo/rojo) en lugar de hojas de cálculo — esta única herramienta transformará tu comunicación con la junta",
      execution: "Negocia con tus 3 principales planes de atención administrada de Medi-Cal términos de pago más rápidos o pagos intermedios — muchos planes aceptarán términos de 30 días si demuestras envío consistente de reclamos limpios",
      growth: "Construye modelos financieros para al menos un programa de Apoyos Comunitarios CalAIM — incluso si tu FQHC no está lanzando uno todavía, tener el modelo listo te posiciona como el líder financiero estratégico cuando el CEO esté listo para expandir",
      transition: "Antes de tu primer día en un nuevo FQHC, revisa su reporte de auditoría más reciente (auditoría única si reciben >$750K en fondos federales), declaración de impuestos 990, y aviso de adjudicación de subvención HRSA. Estos documentos revelan el ADN financiero de la organización",
    },
    employerWants: {
      topQualifications: [
        "5+ years financial management experience (healthcare or nonprofit required)",
        "Experience with FQHC financial operations (PPS, 340B, HRSA grants)",
        "Track record of managing budgets >$5M with multiple revenue sources",
        "Experience with board-level financial reporting and presentations",
        "Knowledge of Medi-Cal and Medicare reimbursement structures",
      ],
      esTopQualifications: [
        "5+ años de experiencia en gestión financiera (salud o sin fines de lucro requerido)",
        "Experiencia con operaciones financieras de FQHC (PPS, 340B, subvenciones HRSA)",
        "Historial de gestión de presupuestos >$5M con múltiples fuentes de ingresos",
        "Experiencia con informes y presentaciones financieras a nivel de junta",
        "Conocimiento de estructuras de reembolso Medi-Cal y Medicare",
      ],
      topSkills: [
        "Financial modeling and forecasting",
        "Cash flow management and treasury",
        "Grant financial compliance (HRSA, state)",
        "Board financial reporting and governance",
        "Payer contract analysis and negotiation",
      ],
      esTopSkills: [
        "Modelado y pronóstico financiero",
        "Gestión de flujo de efectivo y tesorería",
        "Cumplimiento financiero de subvenciones (HRSA, estatal)",
        "Informes financieros y gobernanza de la junta",
        "Análisis y negociación de contratos con pagadores",
      ],
      certifications: [
        "CPA (Certified Public Accountant)",
        "CHFP (Certified Healthcare Financial Professional)",
        "MBA or MHA (preferred)",
      ],
      esCertifications: [
        "CPA (Contador Público Certificado)",
        "CHFP (Profesional Financiero de Salud Certificado)",
        "MBA o MHA (preferido)",
      ],
    },
  },

  /* ================================================================ */
  /*  DENTAL ASSISTANT                                                  */
  /* ================================================================ */
  dental_assistant: {
    strengthMessages: {
      mission: "Your drive to bring quality dental care to under-resourced communities puts you at the heart of FQHC oral health equity work. FQHCs that integrate dental into primary care see better chronic disease outcomes — and dental assistants who share that mission are essential to making it work.",
      people: "Your ability to ease patient anxiety and build rapport transforms the dental experience for patients who have never had regular dental care. FQHC patients often have high dental fear — your warmth and communication skills are as valuable as any clinical technique.",
      execution: "Your efficiency in chair-side assistance, infection control, and supply management directly determines how many patients a FQHC dental team can serve in a day. High-volume FQHC dental clinics run on this kind of operational excellence.",
      growth: "Your interest in expanding skills — whether radiology, expanded duties, or dental coding — positions you for lead DA roles and higher pay at multi-site FQHCs that reward versatility.",
      transition: "Your ability to quickly learn a new dental team's protocols, EHR workflow, and patient population needs shows real clinical adaptability — a top priority for FQHCs that are scaling their dental programs.",
    },
    esStrengthMessages: {
      mission: "Tu impulso por brindar atención dental de calidad a comunidades desatendidas te coloca en el corazón del trabajo de equidad en salud oral de los FQHCs. Los FQHCs que integran odontología en atención primaria ven mejores resultados en enfermedades crónicas — y los asistentes dentales que comparten esa misión son esenciales.",
      people: "Tu capacidad para calmar la ansiedad del paciente y construir rapport transforma la experiencia dental para pacientes que nunca han tenido atención dental regular. Los pacientes de FQHC a menudo tienen alto miedo dental — tu calidez y habilidades de comunicación son tan valiosas como cualquier técnica clínica.",
      execution: "Tu eficiencia en asistencia chairside, control de infecciones y gestión de suministros determina directamente cuántos pacientes puede atender un equipo dental de FQHC en un día.",
      growth: "Tu interés en expandir habilidades — radiología, deberes ampliados o codificación dental — te posiciona para roles de DA líder y mayor salario.",
      transition: "Tu capacidad para aprender rápidamente los protocolos, flujo de trabajo EHR y necesidades de la población de pacientes de un nuevo equipo dental demuestra verdadera adaptabilidad clínica.",
    },
    growthMessages: {
      mission: "Connect your daily chairside work to the bigger picture — FQHC dental programs prevent ER visits, catch early signs of diabetes and hypertension, and reduce pain that keeps patients from working. Share that impact story in your next interview.",
      people: "Practice trauma-informed dental care approaches — many FQHC patients have avoided dental care for years due to cost, fear, or immigration status. Learning specific anxiety-reduction techniques will make you indispensable.",
      execution: "Pursue your California Radiation Safety Certificate if you haven't — it unlocks radiograph duties that dramatically expand your scope and earn $3-5K more annually at most California FQHCs.",
      growth: "California RDA (Registered Dental Assistant) licensure is the key credential upgrade — it enables expanded duties including coronal polishing, sealant placement, and more. Many FQHCs help cover the exam costs.",
      transition: "When starting at a new FQHC dental clinic, spend your first week learning their infection control protocols, dental software workflows, and how they handle interpreter needs for non-English-speaking patients.",
    },
    esGrowthMessages: {
      mission: "Conecta tu trabajo diario chairside con la imagen más grande — los programas dentales de FQHC previenen visitas a urgencias, detectan señales tempranas de diabetes e hipertensión, y reducen el dolor que impide que los pacientes trabajen.",
      people: "Practica enfoques de atención dental informados por trauma — muchos pacientes de FQHC han evitado la atención dental durante años debido al costo, el miedo o el estatus migratorio.",
      execution: "Obtén tu Certificado de Seguridad de Radiación de California si aún no lo tienes — desbloquea las obligaciones de radiografía que amplían dramáticamente tu alcance y ganan $3-5K más anualmente.",
      growth: "La licencia RDA (Asistente Dental Registrado) de California es la mejora de credenciales clave — habilita deberes ampliados incluyendo pulido coronal, colocación de selladores y más.",
      transition: "Al comenzar en una nueva clínica dental de FQHC, pasa tu primera semana aprendiendo sus protocolos de control de infecciones, flujos de trabajo de software dental y cómo manejan las necesidades de intérpretes.",
    },
    nextSteps: {
      mission: "Highlight dental integration in your resume objective — mention how dental care connects to chronic disease management (diabetes A1C, hypertension) to show FQHC hiring managers you understand the whole-health mission",
      people: "Pursue a trauma-informed dental care training — the DHCS offers free modules and it's increasingly listed in FQHC dental job postings as a preferred qualification",
      execution: "Get your California Radiation Safety Certificate — it's a 4-hour online course through DANB and immediately adds radiograph duties and $2-4K in annual pay at most FQHCs",
      growth: "Study for the California RDA exam — check if your current employer offers study stipends; most multi-site FQHCs do. RDA status unlocks coronal polishing, sealants, and significantly higher compensation",
      transition: "Research the dental EHR used at your target FQHC before applying — Dentrix, Eaglesoft, and Curve Dental are most common. If you haven't used their system, note in your cover letter that you learn dental software quickly",
    },
    esNextSteps: {
      mission: "Destaca la integración dental en el objetivo de tu currículum — menciona cómo la atención dental se conecta con el manejo de enfermedades crónicas para mostrar a los gerentes de contratación de FQHC que comprendes la misión de salud integral",
      people: "Obtén una capacitación en atención dental informada por trauma — el DHCS ofrece módulos gratuitos y se enumera cada vez más en las publicaciones de trabajos dentales de FQHC",
      execution: "Obtén tu Certificado de Seguridad de Radiación de California — es un curso en línea de 4 horas a través de DANB y agrega inmediatamente obligaciones de radiografía y $2-4K en pago anual",
      growth: "Estudia para el examen RDA de California — verifica si tu empleador actual ofrece estipendios de estudio; la mayoría de los FQHCs de múltiples sitios lo hacen",
      transition: "Investiga el EHR dental utilizado en tu FQHC objetivo antes de aplicar — Dentrix, Eaglesoft y Curve Dental son los más comunes",
    },
    employerWants: {
      topQualifications: [
        "California Dental Assistant certificate or RDA license",
        "California Radiation Safety Certificate (required at most FQHCs)",
        "1+ years chair-side assisting in a high-volume dental setting",
        "Experience with dental EHR (Dentrix, Eaglesoft, or Curve Dental)",
        "Bilingual Spanish/English (strongly preferred at most CA FQHCs)",
      ],
      esTopQualifications: [
        "Certificado de Asistente Dental de California o licencia RDA",
        "Certificado de Seguridad de Radiación de California (requerido en la mayoría de FQHCs)",
        "1+ años de asistencia chairside en entorno dental de alto volumen",
        "Experiencia con EHR dental (Dentrix, Eaglesoft o Curve Dental)",
        "Bilingüe español/inglés (fuertemente preferido en la mayoría de FQHCs de CA)",
      ],
      topSkills: [
        "Chair-side dental assistance and instrument passing",
        "Infection control and sterilization protocols",
        "Dental radiograph exposure and processing",
        "Dental supply management and instrument inventory",
        "Patient communication and anxiety management",
      ],
      esTopSkills: [
        "Asistencia dental chairside y pase de instrumentos",
        "Protocolos de control de infecciones y esterilización",
        "Exposición y procesamiento de radiografías dentales",
        "Gestión de suministros dentales e inventario de instrumentos",
        "Comunicación con pacientes y manejo de ansiedad",
      ],
      certifications: [
        "California RDA (Registered Dental Assistant) license",
        "California Radiation Safety Certificate (required)",
        "CPR/BLS certification",
        "DANB Certified Dental Assistant (CDA) — preferred",
      ],
      esCertifications: [
        "Licencia RDA (Asistente Dental Registrado) de California",
        "Certificado de Seguridad de Radiación de California (requerido)",
        "Certificación CPR/BLS",
        "DANB Asistente Dental Certificado (CDA) — preferido",
      ],
    },
  },

  /* ================================================================ */
  /*  DENTAL HYGIENIST                                                  */
  /* ================================================================ */
  dental_hygienist: {
    strengthMessages: {
      mission: "Dental hygienists at FQHCs are often the first healthcare professional to spot signs of uncontrolled diabetes, hypertension, and oral cancer in patients who have no other regular health contact. Your prevention focus saves lives.",
      people: "Your ability to build long-term trust with patients who return for recall appointments makes you a key part of the FQHC health home model. Patients who trust their hygienist are far more likely to follow through on referrals and preventive care.",
      execution: "Your proficiency in full-mouth periodontal assessment, scaling, and patient education — delivered at high volume with documentation in a dental EHR — is exactly the operational backbone that FQHC dental programs depend on.",
      growth: "Your drive to expand into special populations — pediatric sealants, prenatal oral health, tobacco cessation counseling — positions you for lead hygienist and program coordination roles at multi-site FQHCs.",
      transition: "Your ability to adapt your clinical protocols to a new patient population — many of whom have never had regular dental care — demonstrates the flexibility FQHC dental programs need as they scale.",
    },
    esStrengthMessages: {
      mission: "Los higienistas dentales en FQHCs a menudo son el primer profesional de salud en detectar signos de diabetes no controlada, hipertensión y cáncer oral en pacientes que no tienen otro contacto de salud regular.",
      people: "Tu capacidad para construir confianza a largo plazo con pacientes que regresan para citas de seguimiento te convierte en una parte clave del modelo de hogar de salud de FQHC.",
      execution: "Tu competencia en evaluación periodontal de boca completa, raspado y educación del paciente — entregada en alto volumen con documentación en un EHR dental — es exactamente la columna vertebral operativa de la que dependen los programas dentales de FQHC.",
      growth: "Tu impulso para expandirse hacia poblaciones especiales — selladores pediátricos, salud oral prenatal, consejería para dejar de fumar — te posiciona para roles de higienista principal y coordinación de programas.",
      transition: "Tu capacidad para adaptar tus protocolos clínicos a una nueva población de pacientes — muchos de los cuales nunca han tenido atención dental regular — demuestra la flexibilidad que los programas dentales de FQHC necesitan.",
    },
    growthMessages: {
      mission: "Pursue training in oral health integration — the connection between periodontal disease and diabetes, heart disease, and preterm birth is the scientific foundation for FQHC dental programs. Being able to articulate this in your interviews will set you apart.",
      people: "Develop your motivational interviewing skills for oral hygiene counseling — research shows MI-based hygiene instruction drives significantly better patient behavior change than traditional instruction models.",
      execution: "Get trained in FQHC dental billing — particularly Denti-Cal procedure codes and documentation requirements. Hygienists who understand billing help their clinics maximize reimbursement and are highly valued.",
      growth: "Pursue tobacco cessation counseling certification — it's reimbursable under Denti-Cal and is a high-impact preventive service that sets FQHC hygienists apart from private practice peers.",
      transition: "Before starting at a new FQHC, review their Denti-Cal provider manual and understand which hygiene services they bill — frequency limitations, prior authorization requirements, and patient eligibility checks vary significantly.",
    },
    esGrowthMessages: {
      mission: "Busca capacitación en integración de salud oral — la conexión entre la enfermedad periodontal y la diabetes, enfermedades cardíacas y parto prematuro es el fundamento científico para los programas dentales de FQHC.",
      people: "Desarrolla tus habilidades de entrevista motivacional para la consejería de higiene oral — la investigación muestra que la instrucción de higiene basada en IM impulsa un cambio de comportamiento del paciente significativamente mejor.",
      execution: "Capacítate en facturación dental de FQHC — particularmente códigos de procedimiento Denti-Cal y requisitos de documentación.",
      growth: "Obtén la certificación de consejería para dejar de fumar — es reembolsable bajo Denti-Cal y es un servicio preventivo de alto impacto.",
      transition: "Antes de comenzar en un nuevo FQHC, revisa su manual de proveedor Denti-Cal y comprende qué servicios de higiene facturan.",
    },
    nextSteps: {
      mission: "Add oral health integration language to your resume objective — specifically mention the connection between periodontal disease and systemic conditions like diabetes and cardiovascular disease to align with FQHC whole-health goals",
      people: "Complete a free online motivational interviewing for oral health training — CDT and several dental hygiene associations offer them. It's increasingly listed in FQHC hygienist job postings",
      execution: "Get familiar with Denti-Cal procedure codes for hygiene services (D1110, D1120, D4341, D4342) — understanding reimbursement helps you document more accurately and is valued in FQHC interviews",
      growth: "Pursue tobacco cessation counselor certification through the California Dental Association — it's a weekend course and adds a billable service and $3-5K in value to your role",
      transition: "In interviews, ask specifically about the hygiene recall program, new patient flow, and what percentage of patients are Denti-Cal — it shows clinical business awareness that FQHC dental directors value",
    },
    esNextSteps: {
      mission: "Agrega lenguaje de integración de salud oral al objetivo de tu currículum — menciona específicamente la conexión entre la enfermedad periodontal y condiciones sistémicas como diabetes y enfermedades cardiovasculares",
      people: "Completa una capacitación gratuita en línea de entrevista motivacional para salud oral — CDT y varias asociaciones de higiene dental las ofrecen",
      execution: "Familiarízate con los códigos de procedimiento Denti-Cal para servicios de higiene (D1110, D1120, D4341, D4342) — entender el reembolso te ayuda a documentar con mayor precisión",
      growth: "Obtén la certificación de consejero de cesación tabáquica a través de la Asociación Dental de California — es un curso de fin de semana que agrega un servicio facturable",
      transition: "En las entrevistas, pregunta específicamente sobre el programa de seguimiento de higiene, flujo de nuevos pacientes y qué porcentaje de pacientes son Denti-Cal",
    },
    employerWants: {
      topQualifications: [
        "Active California Registered Dental Hygienist (RDH) license",
        "Local anesthesia permit (required at most FQHCs)",
        "2+ years clinical hygiene experience in a high-volume setting",
        "Denti-Cal billing and documentation experience",
        "Bilingual Spanish/English (strongly preferred at CA FQHCs)",
      ],
      esTopQualifications: [
        "Licencia activa de Higienista Dental Registrado (RDH) de California",
        "Permiso de anestesia local (requerido en la mayoría de FQHCs)",
        "2+ años de experiencia clínica en higiene en un entorno de alto volumen",
        "Experiencia en facturación y documentación Denti-Cal",
        "Bilingüe español/inglés (fuertemente preferido en FQHCs de CA)",
      ],
      topSkills: [
        "Full-mouth periodontal assessment and scaling/root planing",
        "Denti-Cal documentation and procedure coding",
        "Patient oral hygiene education and behavior change counseling",
        "Pediatric hygiene and sealant placement",
        "Prenatal oral health counseling",
      ],
      esTopSkills: [
        "Evaluación periodontal de boca completa y raspado/alisado radicular",
        "Documentación Denti-Cal y codificación de procedimientos",
        "Educación de higiene oral del paciente y consejería de cambio de comportamiento",
        "Higiene pediátrica y colocación de selladores",
        "Consejería de salud oral prenatal",
      ],
      certifications: [
        "California RDH license (required)",
        "Local Anesthesia permit (required)",
        "Nitrous Oxide permit (strongly preferred)",
        "CPR/BLS certification",
        "Tobacco Cessation Counselor (preferred)",
      ],
      esCertifications: [
        "Licencia RDH de California (requerida)",
        "Permiso de Anestesia Local (requerido)",
        "Permiso de Óxido Nitroso (fuertemente preferido)",
        "Certificación CPR/BLS",
        "Consejero de Cesación Tabáquica (preferido)",
      ],
    },
  },

  /* ================================================================ */
  /*  DENTIST                                                            */
  /* ================================================================ */
  dentist: {
    strengthMessages: {
      mission: "FQHC dentists close the most critical gap in community health — dental is the #1 unmet need in under-resourced populations. Your commitment to providing full-scope dentistry to patients who have deferred care for years means you're preventing ER visits, catching early signs of diabetes and oral cancer, and restoring function that lets people work, eat, and live without pain.",
      people: "Your ability to lead a dental team — supervising hygienists, mentoring dental assistants, and coordinating with medical providers — determines how many patients your program can serve. FQHC dental directors value dentists who build strong teams, not just treat individual patients.",
      execution: "Your clinical efficiency in a high-volume FQHC setting — accurate Denti-Cal documentation, appropriate treatment planning within coverage constraints, and minimal claim denials — directly determines whether the dental program is financially sustainable.",
      growth: "Your interest in program development — expanding services, implementing Virtual Dental Home, pursuing Teaching Health Center status, or adopting AI documentation tools — positions you for Dental Director roles at growing FQHC networks.",
      transition: "Your ability to adapt from fee-for-service dentistry to FQHC PPS-based care — adjusting treatment planning for Denti-Cal constraints, learning a new dental EHR, and connecting with a mission-driven team — shows the clinical leadership that FQHCs need.",
    },
    esStrengthMessages: {
      mission: "Los dentistas de FQHC cierran la brecha mas critica en salud comunitaria — lo dental es la necesidad #1 no satisfecha en poblaciones desatendidas. Tu compromiso de proporcionar odontologia de alcance completo a pacientes que han postergado atencion por anos significa que estas previniendo visitas a urgencias, detectando signos tempranos de diabetes y cancer oral, y restaurando funcion que permite a las personas trabajar, comer y vivir sin dolor.",
      people: "Tu capacidad para liderar un equipo dental — supervisando higienistas, mentoreando asistentes dentales, y coordinando con proveedores medicos — determina cuantos pacientes puede atender tu programa.",
      execution: "Tu eficiencia clinica en un entorno FQHC de alto volumen — documentacion precisa de Denti-Cal, planificacion de tratamiento apropiada dentro de las restricciones de cobertura, y minimas denegaciones de reclamos — determina directamente si el programa dental es financieramente sostenible.",
      growth: "Tu interes en el desarrollo de programas — expandir servicios, implementar Virtual Dental Home, buscar estatus de Centro de Salud de Ensenanza, o adoptar herramientas de documentacion IA — te posiciona para roles de Director Dental.",
      transition: "Tu capacidad para adaptarte de la odontologia de pago por servicio al cuidado basado en PPS de FQHC — ajustando la planificacion de tratamiento para las restricciones de Denti-Cal, aprendiendo un nuevo EHR dental, y conectando con un equipo impulsado por la mision — demuestra el liderazgo clinico que los FQHCs necesitan.",
    },
    growthMessages: {
      mission: "Connect your clinical work to population health outcomes — track how many ER dental visits your program prevents, how many patients with diabetes you're screening through oral-systemic integration, and share these numbers with leadership. This is how dental programs justify expansion.",
      people: "Invest in developing your dental team's skills — support DA-to-RDA certification, mentor hygienists on Denti-Cal billing, and build a culture where the team takes ownership of patient outcomes, not just individual procedures.",
      execution: "Master Denti-Cal prior authorization workflows and same-day medical-dental billing rules — many FQHCs leave revenue on the table by not billing for both encounters when a dental patient also sees a medical provider. Understanding PPS billing nuances makes you invaluable.",
      growth: "Pursue dental leadership development — AAPHD fellowship, healthcare management courses, or NACHC conferences. The transition from clinical dentist to dental program leader requires business, regulatory, and team management skills beyond clinical expertise.",
      transition: "Before starting at a new FQHC, study their dental EHR system, review their Denti-Cal provider manual for covered services and frequency limitations, and research the patient population. The biggest adjustment from private practice is the shift from production-focused to access-focused care.",
    },
    esGrowthMessages: {
      mission: "Conecta tu trabajo clinico con resultados de salud poblacional — rastrea cuantas visitas de emergencia dental previene tu programa, cuantos pacientes con diabetes estas detectando a traves de integracion oral-sistemica, y comparte estos numeros con el liderazgo.",
      people: "Invierte en desarrollar las habilidades de tu equipo dental — apoya la certificacion DA-a-RDA, mentorea a higienistas en facturacion Denti-Cal, y construye una cultura donde el equipo se apropie de los resultados de los pacientes.",
      execution: "Domina los flujos de autorizacion previa Denti-Cal y las reglas de facturacion medica-dental del mismo dia — muchos FQHCs dejan ingresos sobre la mesa al no facturar por ambos encuentros.",
      growth: "Busca desarrollo de liderazgo dental — fellowship AAPHD, cursos de gestion de salud o conferencias NACHC. La transicion de dentista clinico a lider de programa dental requiere habilidades de negocio, regulacion y gestion de equipo.",
      transition: "Antes de comenzar en un nuevo FQHC, estudia su sistema EHR dental, revisa su manual de proveedor Denti-Cal y investiga la poblacion de pacientes. El ajuste mas grande desde la practica privada es el cambio de atencion enfocada en produccion a enfocada en acceso.",
    },
    nextSteps: {
      mission: "Add oral health integration to your resume — specifically mention how you've connected dental findings to systemic conditions (diabetes screening via periodontal assessment, cardiovascular risk, oral cancer detection) to show FQHC hiring managers you practice whole-person dentistry",
      people: "Highlight team leadership in your application — FQHCs want dentists who build and develop dental teams, not solo practitioners. Mention supervision of hygienists, DA mentoring, and cross-departmental coordination with medical and behavioral health",
      execution: "Demonstrate Denti-Cal billing expertise — mention specific knowledge of PPS encounter billing, same-day medical-dental rules, prior authorization workflows, and claim denial reduction. This operational knowledge is as important as clinical skills at FQHCs",
      growth: "If NHSC-eligible, apply immediately — up to $80K in loan repayment over 2 years at most California FQHC sites. This is the single largest financial benefit of FQHC dentistry and many dentists cite it as their primary reason for entering community health",
      transition: "In interviews, ask about the dental program's strategic direction: expansion plans, technology adoption (AI documentation, digital impressions), Virtual Dental Home interest, and how dental integrates with medical. These questions signal leadership potential",
    },
    esNextSteps: {
      mission: "Agrega integracion de salud oral a tu curriculum — menciona especificamente como has conectado hallazgos dentales con condiciones sistemicas para mostrar a los gerentes de contratacion de FQHC que practicas odontologia de persona completa",
      people: "Destaca liderazgo de equipo en tu solicitud — los FQHCs quieren dentistas que construyan y desarrollen equipos dentales, no practicantes solos",
      execution: "Demuestra experiencia en facturacion Denti-Cal — menciona conocimiento especifico de facturacion de encuentros PPS, reglas medico-dentales del mismo dia, flujos de autorizacion previa y reduccion de denegaciones de reclamos",
      growth: "Si eres elegible para NHSC, solicita inmediatamente — hasta $80K en pago de prestamos en 2 anos en la mayoria de sitios FQHC de California",
      transition: "En las entrevistas, pregunta sobre la direccion estrategica del programa dental: planes de expansion, adopcion de tecnologia, interes en Virtual Dental Home, y como dental se integra con medicina",
    },
    employerWants: {
      topQualifications: [
        "DDS or DMD from CODA-accredited dental school",
        "Active California dental license in good standing",
        "DEA registration (required)",
        "2+ years clinical experience (FQHC or high-volume community setting preferred)",
        "Bilingual Spanish/English (strongly preferred at most CA FQHCs)",
      ],
      esTopQualifications: [
        "DDS o DMD de escuela dental acreditada por CODA",
        "Licencia dental activa de California en buen estado",
        "Registro DEA (requerido)",
        "2+ anos de experiencia clinica (FQHC o entorno comunitario de alto volumen preferido)",
        "Bilingue espanol/ingles (fuertemente preferido en la mayoria de FQHCs de CA)",
      ],
      topSkills: [
        "Full-scope general dentistry (restorative, extractions, emergency)",
        "Denti-Cal billing, documentation, and prior authorization",
        "FQHC PPS encounter-based reimbursement",
        "Dental team supervision (hygienists, DAs, EDDAs)",
        "Oral-systemic health integration and medical-dental coordination",
      ],
      esTopSkills: [
        "Odontologia general de alcance completo (restaurativa, extracciones, emergencia)",
        "Facturacion Denti-Cal, documentacion y autorizacion previa",
        "Reembolso basado en encuentros PPS de FQHC",
        "Supervision de equipo dental (higienistas, DAs, EDDAs)",
        "Integracion de salud oral-sistemica y coordinacion medica-dental",
      ],
      certifications: [
        "DDS/DMD from CODA-accredited program (required)",
        "Active California dental license (required)",
        "DEA registration (required)",
        "NHSC loan repayment eligible (strongly preferred — up to $80K/2yr)",
        "CPR/BLS/ACLS certification",
      ],
      esCertifications: [
        "DDS/DMD de programa acreditado por CODA (requerido)",
        "Licencia dental activa de California (requerida)",
        "Registro DEA (requerido)",
        "Elegible para pago de prestamos NHSC (fuertemente preferido — hasta $80K/2 anos)",
        "Certificacion CPR/BLS/ACLS",
      ],
    },
  },

  /* ================================================================ */
  /*  PHARMACIST                                                        */
  /* ================================================================ */
  pharmacist: {
    strengthMessages: {
      mission: "FQHC pharmacists are essential to medication access equity — dispensing to patients who would otherwise go without. Your commitment to this mission means patients with diabetes, hypertension, and HIV get their medications filled consistently, which is the difference between controlled and uncontrolled disease.",
      people: "Your ability to counsel patients on complex regimens in plain language — especially in their preferred language — drives medication adherence in populations with low health literacy. FQHCs specifically value pharmacists who can teach, not just dispense.",
      execution: "Your precision in dispensing, DUR (Drug Utilization Review), and clinical verification keeps FQHC patients safe and the 340B program running efficiently — two things that directly affect the clinic's financial sustainability.",
      growth: "Your interest in clinical pharmacy services — MTM, collaborative drug therapy management, anticoagulation — positions you for pharmacist-in-charge and clinical pharmacy director roles at growing FQHC networks.",
      transition: "Your ability to quickly learn a new FQHC's formulary, 340B contract pharmacy relationships, and EHR-integrated prescription workflow shows the operational adaptability that FQHC pharmacy directors prize.",
    },
    esStrengthMessages: {
      mission: "Los farmacéuticos de FQHC son esenciales para la equidad de acceso a medicamentos — dispensando a pacientes que de otro modo se quedarían sin ellos.",
      people: "Tu capacidad para asesorar a los pacientes sobre regímenes complejos en lenguaje sencillo — especialmente en su idioma preferido — impulsa la adherencia a la medicación en poblaciones con baja alfabetización en salud.",
      execution: "Tu precisión en dispensación, DUR y verificación clínica mantiene seguros a los pacientes de FQHC y el programa 340B funcionando eficientemente.",
      growth: "Tu interés en los servicios de farmacia clínica — MTM, manejo colaborativo de terapia farmacológica, anticoagulación — te posiciona para roles de farmacéutico a cargo y director de farmacia clínica.",
      transition: "Tu capacidad para aprender rápidamente el formulario de un nuevo FQHC, las relaciones con farmacias contratistas 340B y el flujo de trabajo de recetas integrado con EHR.",
    },
    growthMessages: {
      mission: "Study the 340B drug pricing program deeply — it's the financial engine that allows FQHCs to dispense affordably. Understanding 340B policy, contract pharmacy relationships, and audit compliance makes you invaluable in pharmacy leadership discussions.",
      people: "Invest in health literacy communication training — the AHRQ's 'Health Literacy Universal Precautions Toolkit' is free and directly applicable to FQHC patient counseling. Pharmacists who can communicate effectively across literacy levels are rare and valued.",
      execution: "Master your FQHC's EHR-pharmacy integration — whether eClinicalWorks, OCHIN Epic, or NextGen. Clinical pharmacy recommendations that flow directly into provider notes create real care coordination value.",
      growth: "Pursue Board Certification in a clinical specialty (BCACP for ambulatory care, BCPS for pharmacotherapy) — it qualifies you for collaborative practice agreements that expand your clinical role and reimbursement potential.",
      transition: "When joining a new FQHC pharmacy, map out the 340B program structure in your first week — contract pharmacies, child site designations, and split billing rules. Errors here create significant compliance risk.",
    },
    esGrowthMessages: {
      mission: "Estudia el programa de precios de medicamentos 340B en profundidad — es el motor financiero que permite a los FQHCs dispensar de manera asequible.",
      people: "Invierte en capacitación de comunicación de alfabetización en salud — el 'Kit de herramientas de precauciones universales de alfabetización en salud' de AHRQ es gratuito y directamente aplicable al asesoramiento de pacientes de FQHC.",
      execution: "Domina la integración EHR-farmacia de tu FQHC — ya sea eClinicalWorks, OCHIN Epic o NextGen.",
      growth: "Obtén la Certificación de Junta en una especialidad clínica (BCACP para atención ambulatoria, BCPS para farmacoterapia).",
      transition: "Al unirte a una nueva farmacia de FQHC, mapea la estructura del programa 340B en tu primera semana.",
    },
    nextSteps: {
      mission: "In your resume objective, mention 340B program experience and medication access equity — these are the two phrases that immediately signal FQHC pharmacy fluency to hiring managers",
      people: "Complete a Medication Therapy Management (MTM) training — it's reimbursable under Part D and increasingly offered by FQHC pharmacies. It positions you as a clinical pharmacist, not just a dispensing pharmacist",
      execution: "Get trained in your target FQHC's EHR — many FQHC pharmacies use eClinicalWorks or OCHIN Epic with integrated e-prescribing. Demonstrating EHR proficiency in interviews gives you an immediate advantage",
      growth: "Apply for BCACP (Board Certified Ambulatory Care Pharmacist) — it's the credential that opens doors to collaborative drug therapy agreements with FQHC physicians and significantly expands your clinical scope",
      transition: "Research the 340B program status of your target FQHC before your interview — their HRSA grant number, child site count, and contract pharmacy relationships. Asking informed 340B questions signals seriousness",
    },
    esNextSteps: {
      mission: "En el objetivo de tu currículum, menciona la experiencia en el programa 340B y la equidad de acceso a medicamentos — estas son las dos frases que señalan inmediatamente la fluidez en farmacia de FQHC",
      people: "Completa una capacitación en Gestión de Terapia Medicamentosa (MTM) — es reembolsable bajo la Parte D y se ofrece cada vez más por las farmacias de FQHC",
      execution: "Capacítate en el EHR de tu FQHC objetivo — muchas farmacias de FQHC usan eClinicalWorks u OCHIN Epic con prescripción electrónica integrada",
      growth: "Solicita el BCACP (Farmacéutico Certificado de Atención Ambulatoria) — es la credencial que abre puertas a acuerdos colaborativos de terapia farmacológica",
      transition: "Investiga el estado del programa 340B de tu FQHC objetivo antes de tu entrevista — número de subvención HRSA, conteo de sitios secundarios y relaciones con farmacias contratistas",
    },
    employerWants: {
      topQualifications: [
        "Active California Pharmacist (PharmD) license — no restrictions",
        "340B program experience or knowledge",
        "High-volume dispensing and clinical verification experience",
        "EHR-integrated pharmacy experience (eClinicalWorks, OCHIN Epic, NextGen)",
        "Bilingual Spanish/English (strongly preferred at CA FQHCs)",
      ],
      esTopQualifications: [
        "Licencia activa de Farmacéutico (PharmD) de California — sin restricciones",
        "Experiencia o conocimiento del programa 340B",
        "Experiencia en dispensación de alto volumen y verificación clínica",
        "Experiencia en farmacia integrada con EHR (eClinicalWorks, OCHIN Epic, NextGen)",
        "Bilingüe español/inglés (fuertemente preferido en FQHCs de CA)",
      ],
      topSkills: [
        "340B drug pricing program administration",
        "Medication Therapy Management (MTM) counseling",
        "Drug Utilization Review (DUR) and safety screening",
        "FQHC patient counseling across language and literacy levels",
        "Collaborative drug therapy management agreements",
      ],
      esTopSkills: [
        "Administración del programa de precios de medicamentos 340B",
        "Consejería de Gestión de Terapia Medicamentosa (MTM)",
        "Revisión de Utilización de Medicamentos (DUR) y detección de seguridad",
        "Consejería de pacientes de FQHC en diferentes niveles de idioma y alfabetización",
        "Acuerdos de manejo colaborativo de terapia farmacológica",
      ],
      certifications: [
        "California PharmD license (required)",
        "BCACP — Board Certified Ambulatory Care Pharmacist (preferred)",
        "Immunization certification",
        "340B University or NACHC 340B training (preferred)",
      ],
      esCertifications: [
        "Licencia PharmD de California (requerida)",
        "BCACP — Farmacéutico Certificado de Atención Ambulatoria (preferido)",
        "Certificación de inmunización",
        "340B University o capacitación NACHC 340B (preferido)",
      ],
    },
  },

  /* ================================================================ */
  /*  PHARMACY TECHNICIAN                                               */
  /* ================================================================ */
  pharmacy_technician: {
    strengthMessages: {
      mission: "At FQHCs, pharmacy technicians are the front line of medication access — filling prescriptions for patients who have nowhere else to turn. Your commitment to accurate, fast dispensing keeps vulnerable patients on their medications.",
      people: "Your ability to communicate clearly with patients picking up medications — explaining copays, prior auth delays, and generic alternatives in plain language — builds trust and reduces the frustration patients feel when navigating complex pharmacy processes.",
      execution: "Your speed and accuracy in prescription processing, insurance verification, and inventory management under high-volume FQHC conditions is the operational core of the pharmacy. Technicians who can handle the volume without errors are always in demand.",
      growth: "Your interest in expanding beyond basic dispensing — into 340B inventory tracking, specialty medication support, or lead technician responsibilities — positions you for supervisor roles and higher pay at multi-site FQHCs.",
      transition: "Your ability to quickly learn a new pharmacy's software, formulary, and workflow systems shows the operational adaptability FQHC pharmacy managers prize when scaling their programs.",
    },
    esStrengthMessages: {
      mission: "En los FQHCs, los técnicos de farmacia son la primera línea de acceso a medicamentos — surtiendo recetas para pacientes que no tienen otro lugar a donde ir.",
      people: "Tu capacidad para comunicarte claramente con los pacientes que recogen medicamentos — explicando copagos, demoras de autorización previa y alternativas genéricas en lenguaje sencillo — genera confianza.",
      execution: "Tu velocidad y precisión en el procesamiento de recetas, verificación de seguros y gestión de inventario bajo las condiciones de alto volumen de FQHC es el núcleo operativo de la farmacia.",
      growth: "Tu interés en expandirte más allá de la dispensación básica — en el seguimiento de inventario 340B, soporte de medicamentos especiales o responsabilidades de técnico líder — te posiciona para roles de supervisor.",
      transition: "Tu capacidad para aprender rápidamente el software, formulario y sistemas de flujo de trabajo de una nueva farmacia.",
    },
    growthMessages: {
      mission: "Learn about the 340B drug pricing program and how it enables your FQHC pharmacy to provide discounted medications — understanding the mission behind the discount pricing gives you context for why accuracy in 340B dispensing tracking matters so much.",
      people: "Practice clear communication for common patient frustrations — prior auth denials, formulary changes, copay assistance programs. Having prepared, empathetic responses for these situations makes you a patient advocate, not just a dispensing tech.",
      execution: "Pursue your California Pharmacy Technician registration and work toward your PTCB Certified Pharmacy Technician (CPhT) — it's the gold standard credential and earns $3-5K more at most CA FQHCs.",
      growth: "Learn 340B inventory management — split billing, contract pharmacy tracking, and audit trail documentation. This is specialized knowledge that commands premium pay and moves you toward lead technician and compliance roles.",
      transition: "When starting at a new FQHC pharmacy, spend your first week mastering the pharmacy software (QS/1, PioneerRx, or the EHR-integrated system) and the 340B dispensing workflow before anything else.",
    },
    esGrowthMessages: {
      mission: "Aprende sobre el programa de precios de medicamentos 340B y cómo permite a tu farmacia FQHC proporcionar medicamentos con descuento.",
      people: "Practica la comunicación clara para las frustraciones comunes de los pacientes — negaciones de autorización previa, cambios en el formulario, programas de asistencia con copago.",
      execution: "Obtén tu registro de Técnico de Farmacia de California y trabaja hacia tu Técnico de Farmacia Certificado PTCB (CPhT) — es la credencial estándar de oro.",
      growth: "Aprende la gestión de inventario 340B — facturación dividida, seguimiento de farmacias contratistas y documentación de rastro de auditoría.",
      transition: "Al comenzar en una nueva farmacia de FQHC, pasa tu primera semana dominando el software de farmacia y el flujo de trabajo de dispensación 340B.",
    },
    nextSteps: {
      mission: "Highlight 340B dispensing experience prominently in your resume — it's the single most FQHC-specific pharmacy skill and immediately signals that you understand the safety-net pharmacy context",
      people: "Complete customer service training specific to pharmacy settings — the NACDS Foundation offers free resources. FQHC patients often have complex needs and limited English; demonstrating patient communication skills in your interview matters",
      execution: "Get your PTCB CPhT certification if you haven't — it's now required or strongly preferred at most California FQHC pharmacies and commands a significant pay premium",
      growth: "Pursue training in specialty medication programs — HIV/AIDS medication management, hepatitis C treatment support — which are common at FQHC pharmacies and command premium pay",
      transition: "Before applying to a specific FQHC pharmacy, find out what software system they use — QS/1, PioneerRx, eClinicalWorks pharmacy module. Mention familiarity with that specific system in your cover letter",
    },
    esNextSteps: {
      mission: "Destaca la experiencia en dispensación 340B de manera prominente en tu currículum — es la habilidad de farmacia más específica de FQHC y señala inmediatamente que comprendes el contexto de farmacia de red de seguridad",
      people: "Completa capacitación en servicio al cliente específica para entornos de farmacia — la Fundación NACDS ofrece recursos gratuitos",
      execution: "Obtén tu certificación PTCB CPhT si aún no la tienes — ahora es requerida o fuertemente preferida en la mayoría de las farmacias de FQHC de California",
      growth: "Busca capacitación en programas de medicamentos especiales — manejo de medicamentos para VIH/SIDA, soporte de tratamiento de hepatitis C",
      transition: "Antes de aplicar a una farmacia de FQHC específica, averigua qué sistema de software usan — QS/1, PioneerRx, módulo de farmacia eClinicalWorks",
    },
    employerWants: {
      topQualifications: [
        "Current California Pharmacy Technician registration",
        "PTCB CPhT certification (required or strongly preferred)",
        "340B dispensing program experience",
        "High-volume pharmacy experience",
        "Bilingual Spanish/English (strongly preferred at CA FQHCs)",
      ],
      esTopQualifications: [
        "Registro actual de Técnico de Farmacia de California",
        "Certificación PTCB CPhT (requerida o fuertemente preferida)",
        "Experiencia en el programa de dispensación 340B",
        "Experiencia en farmacia de alto volumen",
        "Bilingüe español/inglés (fuertemente preferido en FQHCs de CA)",
      ],
      topSkills: [
        "Prescription processing and accuracy verification",
        "340B inventory tracking and split billing",
        "Insurance verification and prior authorization processing",
        "Pharmacy software proficiency (QS/1, PioneerRx)",
        "Patient communication for medication pickup and refills",
      ],
      esTopSkills: [
        "Procesamiento de recetas y verificación de precisión",
        "Seguimiento de inventario 340B y facturación dividida",
        "Verificación de seguros y procesamiento de autorización previa",
        "Competencia en software de farmacia (QS/1, PioneerRx)",
        "Comunicación con pacientes para recogida de medicamentos y recargas",
      ],
      certifications: [
        "California Pharmacy Technician registration (required)",
        "PTCB CPhT (required at most FQHCs)",
        "340B training (NACHC or 340B Health preferred)",
        "CPR/BLS certification",
      ],
      esCertifications: [
        "Registro de Técnico de Farmacia de California (requerido)",
        "PTCB CPhT (requerido en la mayoría de FQHCs)",
        "Capacitación 340B (NACHC o 340B Health preferido)",
        "Certificación CPR/BLS",
      ],
    },
  },

  /* ================================================================ */
  /*  HEALTH ENROLLMENT NAVIGATOR                                       */
  /* ================================================================ */
  health_enrollment_navigator: {
    strengthMessages: {
      mission: "Health enrollment navigators at FQHCs do some of the most direct health equity work in the healthcare system — getting uninsured patients enrolled in Medi-Cal, Covered California, or FQHC sliding scale programs so they can access care at all. Your work directly determines whether vulnerable patients get treatment.",
      people: "Your ability to build trust with patients who are fearful, undocumented, or deeply skeptical of government programs is the most critical skill in this role. The patients who need enrollment help most are often the hardest to engage — and your rapport-building approach defines your impact.",
      execution: "Your efficiency in eligibility screening, application completion, and follow-up tracking — across multiple coverage programs simultaneously — is the operational engine of FQHC enrollment programs. Navigators who close cases quickly and accurately drive real access outcomes.",
      growth: "Your interest in CalAIM Community Supports, ILOS, and complex eligibility scenarios positions you for senior navigator and enrollment program coordinator roles — where you design the systems, not just work them.",
      transition: "Your ability to quickly learn a new FQHC's specific coverage mix, sliding fee scale, and enrollment software shows exactly the operational adaptability that enrollment program managers need when expanding.",
    },
    esStrengthMessages: {
      mission: "Los navegadores de inscripción de salud en los FQHCs hacen algunos de los trabajos más directos de equidad en salud en el sistema de salud — logrando que los pacientes sin seguro se inscriban en Medi-Cal, Covered California o programas de escala móvil de FQHC.",
      people: "Tu capacidad para generar confianza con pacientes que tienen miedo, son indocumentados o son profundamente escépticos de los programas gubernamentales es la habilidad más crítica en este rol.",
      execution: "Tu eficiencia en la detección de elegibilidad, completación de solicitudes y seguimiento — a través de múltiples programas de cobertura simultáneamente — es el motor operativo de los programas de inscripción de FQHC.",
      growth: "Tu interés en CalAIM Community Supports, ILOS y escenarios de elegibilidad complejos te posiciona para roles de navegador senior y coordinador de programa de inscripción.",
      transition: "Tu capacidad para aprender rápidamente la mezcla de cobertura específica, escala de tarifas deslizantes y software de inscripción de un nuevo FQHC.",
    },
    growthMessages: {
      mission: "Deepen your knowledge of undocumented patient access programs — Medi-Cal for All (AB 4), PACE/ILOS, ARPA income disregards, and county-funded programs. Navigators who can confidently help undocumented patients access coverage are rare and highly valued at California FQHCs.",
      people: "Practice motivational interviewing for enrollment — many patients resist enrollment due to immigration fear, past negative experiences, or distrust. Learning to address these barriers compassionately and knowledgeably is the highest-leverage skill upgrade for this role.",
      execution: "Master Covered California's Special Enrollment Period triggers and Medi-Cal's income verification requirements — these are where navigator errors most commonly occur and where mastery most impresses supervisors.",
      growth: "Learn CalAIM Community Supports eligibility determination — specifically housing navigation, medically tailored meals, and sobering centers. These are new FQHC enrollment territories where navigators with this expertise are urgently needed.",
      transition: "Before your first day at a new FQHC, learn their Medi-Cal managed care plan landscape — which MCOs are contracted, what their enrollment tools are, and how they handle presumptive eligibility. Arrive with this knowledge and you'll stand out immediately.",
    },
    esGrowthMessages: {
      mission: "Profundiza tu conocimiento de los programas de acceso para pacientes indocumentados — Medi-Cal para Todos (AB 4), PACE/ILOS, exenciones de ingresos ARPA y programas financiados por el condado.",
      people: "Practica la entrevista motivacional para la inscripción — muchos pacientes resisten la inscripción debido al miedo a la inmigración, experiencias negativas pasadas o desconfianza.",
      execution: "Domina los disparadores del Período de Inscripción Especial de Covered California y los requisitos de verificación de ingresos de Medi-Cal.",
      growth: "Aprende la determinación de elegibilidad de CalAIM Community Supports — específicamente navegación de vivienda, comidas médicamente adaptadas y centros de sobriedad.",
      transition: "Antes de tu primer día en un nuevo FQHC, aprende el panorama de planes de atención administrada de Medi-Cal — qué MCOs están contratados, cuáles son sus herramientas de inscripción y cómo manejan la elegibilidad presuntiva.",
    },
    nextSteps: {
      mission: "Get Certified Application Counselor (CAC) or Certified Enrollment Counselor (CEC) certification through Covered California — it's often required for FQHC enrollment navigator roles and is free to obtain through CPCA or county-sponsored trainings",
      people: "Complete DHCS Medi-Cal eligibility training through your county or a CPCA webinar — navigators who know Medi-Cal rules deeply (MAGI vs. non-MAGI, Medi-Cal for All, presumptive eligibility) earn more and advance faster",
      execution: "Learn the Medi-Cal renewal process inside out — since the end of continuous enrollment in 2023, renewals and re-enrollments are the highest-volume task for FQHC navigators and the place where most errors and coverage gaps occur",
      growth: "Pursue the National Navigator Certification through Enroll America or a state-sponsored program — it demonstrates professional-level enrollment expertise and is highly valued by FQHC enrollment program directors",
      transition: "When applying to an FQHC, research their patient population's coverage mix — percentage Medi-Cal, uninsured, and undocumented. Tailoring your cover letter to their specific enrollment challenges shows strategic understanding",
    },
    esNextSteps: {
      mission: "Obtén la certificación de Consejero de Solicitud Certificado (CAC) o Consejero de Inscripción Certificado (CEC) a través de Covered California — a menudo es requerida para roles de navegador de inscripción de FQHC",
      people: "Completa la capacitación de elegibilidad de Medi-Cal del DHCS a través de tu condado o un seminario web de CPCA",
      execution: "Aprende el proceso de renovación de Medi-Cal de adentro hacia afuera — desde el fin de la inscripción continua en 2023, las renovaciones son la tarea de mayor volumen para los navegadores de FQHC",
      growth: "Obtén la Certificación Nacional de Navegador a través de Enroll America o un programa patrocinado por el estado",
      transition: "Al solicitar a un FQHC, investiga la mezcla de cobertura de su población de pacientes — porcentaje de Medi-Cal, sin seguro e indocumentados",
    },
    employerWants: {
      topQualifications: [
        "Certified Application Counselor (CAC) or Covered California Certified Enrollment Counselor (CEC)",
        "Medi-Cal eligibility determination and renewal experience",
        "Knowledge of undocumented patient coverage options (ILOS, PACE, Medi-Cal for All)",
        "CalAIM Community Supports eligibility experience (preferred)",
        "Bilingual Spanish/English (required at most CA FQHCs)",
      ],
      esTopQualifications: [
        "Consejero de Solicitud Certificado (CAC) o Consejero de Inscripción Certificado de Covered California (CEC)",
        "Experiencia en determinación de elegibilidad de Medi-Cal y renovación",
        "Conocimiento de las opciones de cobertura para pacientes indocumentados (ILOS, PACE, Medi-Cal para Todos)",
        "Experiencia en elegibilidad de CalAIM Community Supports (preferido)",
        "Bilingüe español/inglés (requerido en la mayoría de FQHCs de CA)",
      ],
      topSkills: [
        "Medi-Cal and Covered California eligibility screening",
        "Application completion and submission (BenefitsCal, SAWS)",
        "Presumptive eligibility determination",
        "Patient follow-up and enrollment case tracking",
        "CalAIM Community Supports and ILOS enrollment",
      ],
      esTopSkills: [
        "Detección de elegibilidad de Medi-Cal y Covered California",
        "Completación y envío de solicitudes (BenefitsCal, SAWS)",
        "Determinación de elegibilidad presuntiva",
        "Seguimiento de pacientes y rastreo de casos de inscripción",
        "Inscripción en CalAIM Community Supports e ILOS",
      ],
      certifications: [
        "Covered California Certified Enrollment Counselor (CEC) — required",
        "Certified Application Counselor (CAC) through CMS — required",
        "Medi-Cal Eligibility Worker certification (preferred)",
        "CPCA Navigator Training completion",
      ],
      esCertifications: [
        "Consejero de Inscripción Certificado de Covered California (CEC) — requerido",
        "Consejero de Solicitud Certificado (CAC) a través de CMS — requerido",
        "Certificación de Trabajador de Elegibilidad de Medi-Cal (preferido)",
        "Finalización de Capacitación de Navegador CPCA",
      ],
    },
  },

  /* ================================================================ */
  /*  LVN — Licensed Vocational Nurse                                   */
  /* ================================================================ */
  lvn: {
    strengthMessages: {
      mission: "LVNs at FQHCs are essential to the daily care of thousands of Medi-Cal patients who have no other primary care option. Your willingness to work in this mission-driven environment — often with more complex patients and fewer resources than private practice — reflects exactly the values FQHCs look for.",
      people: "Your ability to provide compassionate, efficient nursing care while building real relationships with patients across multiple visits is the human core of the FQHC model. Patients who feel seen and cared for by their nursing team are more compliant, more engaged, and more likely to stay connected to care.",
      execution: "Your efficiency in rooming, vitals, injections, EHR documentation, and care coordination under the fast-paced workflow of a high-volume FQHC is what keeps the clinic running. LVNs who can handle volume without sacrificing quality are always in demand.",
      growth: "Your drive to expand your LVN scope — IV certification, phlebotomy, care coordination, chronic disease support — positions you for senior LVN and LVN team lead roles, and puts you on the path to RN bridge programs.",
      transition: "Your ability to quickly orient to a new FQHC's clinical workflows, documentation requirements, and team-based care model shows the adaptability that clinic managers prize during onboarding.",
    },
    esStrengthMessages: {
      mission: "Las LVN en los FQHCs son esenciales para la atención diaria de miles de pacientes de Medi-Cal que no tienen otra opción de atención primaria.",
      people: "Tu capacidad para proporcionar atención de enfermería compasiva y eficiente mientras construyes relaciones reales con los pacientes es el núcleo humano del modelo FQHC.",
      execution: "Tu eficiencia en el ingreso de pacientes, signos vitales, inyecciones, documentación EHR y coordinación de atención bajo el flujo de trabajo de alto volumen de un FQHC es lo que mantiene funcionando la clínica.",
      growth: "Tu impulso para expandir tu alcance de LVN — certificación IV, flebotomía, coordinación de atención, soporte de enfermedades crónicas — te posiciona para roles senior.",
      transition: "Tu capacidad para orientarte rápidamente a los flujos de trabajo clínicos, requisitos de documentación y modelo de atención basado en equipo de un nuevo FQHC.",
    },
    growthMessages: {
      mission: "Connect your daily clinical work to the FQHC mission by understanding the population health context — your patients' chronic disease rates, the social factors affecting their health, and how your nursing interventions contribute to HEDIS and UDS quality measures.",
      people: "Develop trauma-informed care skills — a significant portion of FQHC patients have experienced adverse childhood events, housing instability, or immigration trauma. LVNs who can provide care with that awareness build much stronger patient relationships.",
      execution: "Master your FQHC's EHR (eClinicalWorks, OCHIN Epic, NextGen) for clinical documentation, care gap identification, and standing order management. LVNs with strong EHR skills can work more independently and are promoted faster.",
      growth: "Pursue IV therapy certification if you don't have it — it expands your scope significantly and earns $2-4K more annually at most California FQHCs. Also consider an LVN-to-RN bridge program — many FQHCs offer tuition assistance.",
      transition: "When starting at a new FQHC, spend the first two weeks learning every standing order in their clinical protocols — these are the backbone of nursing autonomy in a high-volume FQHC and mastering them makes you valuable quickly.",
    },
    esGrowthMessages: {
      mission: "Conecta tu trabajo clínico diario con la misión de FQHC comprendiendo el contexto de salud poblacional — las tasas de enfermedades crónicas de tus pacientes, los factores sociales que afectan su salud y cómo tus intervenciones de enfermería contribuyen a las medidas de calidad HEDIS y UDS.",
      people: "Desarrolla habilidades de atención informada por trauma — una parte significativa de los pacientes de FQHC han experimentado eventos adversos en la infancia, inestabilidad habitacional o trauma relacionado con la inmigración.",
      execution: "Domina el EHR de tu FQHC (eClinicalWorks, OCHIN Epic, NextGen) para documentación clínica, identificación de brechas de atención y gestión de órdenes permanentes.",
      growth: "Obtén la certificación de terapia IV si no la tienes — amplía significativamente tu alcance y gana $2-4K más anualmente en la mayoría de los FQHCs de California.",
      transition: "Al comenzar en un nuevo FQHC, pasa las primeras dos semanas aprendiendo cada orden permanente en sus protocolos clínicos.",
    },
    nextSteps: {
      mission: "In your resume, highlight experience with Medi-Cal populations and FQHC or safety-net settings — even if it was a clinic, county health, or urgent care in an under-resourced area, emphasize the population you served",
      people: "Complete a trauma-informed care training — the UCSF Trauma-Informed Primary Care Institute offers free online modules that are directly applicable to FQHC nursing and increasingly cited in FQHC job postings",
      execution: "Get proficient in one of the major FQHC EHR systems — eClinicalWorks and OCHIN Epic are the most common. If you don't have experience, many community colleges offer basic EHR courses",
      growth: "Enroll in an LVN-to-RN bridge program at a CA community college — many FQHCs offer tuition reimbursement for bridge programs and will prioritize promoting RN-eligible LVNs into senior nursing roles",
      transition: "When interviewing at a FQHC, ask about orientation length and preceptorship — high-quality FQHCs provide structured 4-6 week LVN orientations. How they answer tells you a lot about how they invest in nursing staff",
    },
    esNextSteps: {
      mission: "En tu currículum, destaca la experiencia con poblaciones de Medi-Cal y entornos de FQHC o red de seguridad",
      people: "Completa una capacitación de atención informada por trauma — el Instituto de Atención Primaria Informada por Trauma de UCSF ofrece módulos en línea gratuitos",
      execution: "Obtén competencia en uno de los principales sistemas EHR de FQHC — eClinicalWorks y OCHIN Epic son los más comunes",
      growth: "Inscríbete en un programa puente de LVN a RN en un colegio comunitario de CA — muchos FQHCs ofrecen reembolso de matrícula para programas puente",
      transition: "Al entrevistar en un FQHC, pregunta sobre la duración de la orientación y la tutoría — los FQHCs de alta calidad proporcionan orientaciones estructuradas de LVN de 4 a 6 semanas",
    },
    employerWants: {
      topQualifications: [
        "Active California LVN license — no restrictions",
        "1+ years LVN experience in a clinic or community health setting",
        "High-volume rooming, vitals, and clinical support experience",
        "FQHC EHR proficiency (eClinicalWorks, NextGen, or OCHIN Epic)",
        "Bilingual Spanish/English (strongly preferred at CA FQHCs)",
      ],
      esTopQualifications: [
        "Licencia LVN activa de California — sin restricciones",
        "1+ años de experiencia de LVN en un entorno de clínica o salud comunitaria",
        "Experiencia en ingreso de alto volumen, signos vitales y soporte clínico",
        "Competencia en EHR de FQHC (eClinicalWorks, NextGen o OCHIN Epic)",
        "Bilingüe español/inglés (fuertemente preferido en FQHCs de CA)",
      ],
      topSkills: [
        "Patient rooming, vital signs, and clinical intake",
        "Medication administration and injection techniques",
        "Standing order management and clinical protocol adherence",
        "EHR documentation and care gap management",
        "Phlebotomy and specimen collection",
      ],
      esTopSkills: [
        "Ingreso de pacientes, signos vitales e ingesta clínica",
        "Administración de medicamentos y técnicas de inyección",
        "Gestión de órdenes permanentes y adherencia al protocolo clínico",
        "Documentación EHR y gestión de brechas de atención",
        "Flebotomía y recolección de muestras",
      ],
      certifications: [
        "California LVN license (required)",
        "IV therapy certification (strongly preferred)",
        "CPR/BLS certification (required)",
        "Phlebotomy certification (preferred)",
      ],
      esCertifications: [
        "Licencia LVN de California (requerida)",
        "Certificación de terapia IV (fuertemente preferida)",
        "Certificación CPR/BLS (requerida)",
        "Certificación de flebotomía (preferida)",
      ],
    },
  },

  /* ================================================================ */
  /*  PSYCHIATRIC NP / PMHNP                                            */
  /* ================================================================ */
  psychiatric_np: {
    strengthMessages: {
      mission: "Psychiatric NPs at FQHCs fill one of California's most critical workforce gaps — delivering psychiatric medication management to Medi-Cal patients who would wait months for an appointment anywhere else. Your presence means patients with serious mental illness get stabilized and stay connected to care.",
      people: "Your ability to build therapeutic alliance with patients experiencing psychosis, severe depression, or trauma-related disorders — in a brief, high-volume FQHC setting — is a clinical skill that takes years to develop and is in enormous demand.",
      execution: "Your capacity to manage a high-volume psychiatric caseload with medication management, crisis assessment, and collaborative documentation — working within FQHC PPS billing structure — is exactly the specialized execution that integrated BH programs depend on.",
      growth: "Your interest in collaborative care models, tele-psychiatry, and FQHC-based psychiatric program development puts you on track for psychiatric medical director and BH program leadership roles.",
      transition: "Your ability to quickly assess a new FQHC's BH program maturity, collaborative care structure, and psychiatric caseload complexity shows the clinical leadership perspective that FQHC BH directors look for when hiring PMHNPs.",
    },
    esStrengthMessages: {
      mission: "Los NPs psiquiátricos en los FQHCs llenan una de las brechas de fuerza laboral más críticas de California — brindando manejo de medicamentos psiquiátricos a pacientes de Medi-Cal que esperarían meses por una cita en cualquier otro lugar.",
      people: "Tu capacidad para construir alianza terapéutica con pacientes que experimentan psicosis, depresión severa o trastornos relacionados con el trauma — en un entorno de FQHC de alto volumen y breve — es una habilidad clínica que toma años desarrollar.",
      execution: "Tu capacidad para manejar una carga de casos psiquiátricos de alto volumen con manejo de medicamentos, evaluación de crisis y documentación colaborativa — trabajando dentro de la estructura de facturación PPS de FQHC.",
      growth: "Tu interés en modelos de atención colaborativa, tele-psiquiatría y desarrollo de programas psiquiátricos basados en FQHC te pone en camino hacia roles de director médico psiquiátrico.",
      transition: "Tu capacidad para evaluar rápidamente la madurez del programa de BH, la estructura de atención colaborativa y la complejidad de la carga de casos psiquiátricos de un nuevo FQHC.",
    },
    growthMessages: {
      mission: "Familiarize yourself with the Collaborative Care Model (CoCM) — the evidence-based integrated BH model increasingly used at California FQHCs. PMHNPs who understand CoCM's stepped-care approach, caseload consultation structure, and registry-based tracking can lead program development, not just practice within it.",
      people: "Develop cultural formulation skills for the specific immigrant, refugee, and minority communities your FQHC serves. Psychiatric presentations differ significantly by culture — and PMHNPs who can integrate cultural context into diagnosis and treatment planning deliver measurably better outcomes.",
      execution: "Master FQHC PPS billing for psychiatric services — specifically the distinction between same-day billing for BH and primary care visits, E/M coding for medication management, and the APM alternative payment model. This knowledge maximizes your revenue impact.",
      growth: "Pursue tele-psychiatry experience if you don't have it — FQHC psychiatric caseloads increasingly include hub-and-spoke tele-psych models spanning rural sites. PMHNPs comfortable with tele-psych delivery can serve 3-5x the geographic footprint.",
      transition: "Before starting at a new FQHC, review their behavioral health program structure — specifically whether they use collaborative care, co-located BH, or integrated BH — and understand how the PMHNP role fits within each model. Ask in your interview.",
    },
    esGrowthMessages: {
      mission: "Familiarízate con el Modelo de Atención Colaborativa (CoCM) — el modelo de BH integrado basado en evidencia utilizado cada vez más en los FQHCs de California.",
      people: "Desarrolla habilidades de formulación cultural para las comunidades específicas de inmigrantes, refugiados y minorías que sirve tu FQHC.",
      execution: "Domina la facturación PPS de FQHC para servicios psiquiátricos — específicamente la distinción entre la facturación del mismo día para visitas de BH y atención primaria.",
      growth: "Obtén experiencia en tele-psiquiatría si no la tienes — las cargas de casos psiquiátricos de FQHC incluyen cada vez más modelos de tele-psiquiatría de hub y spoke.",
      transition: "Antes de comenzar en un nuevo FQHC, revisa su estructura de programa de salud conductual — específicamente si usan atención colaborativa, BH co-ubicado o BH integrado.",
    },
    nextSteps: {
      mission: "Highlight FQHC-specific psychiatric experience in your resume — specifically PPS billing, collaborative care consultation, and population-based psychiatric management. These three phrases signal FQHC psychiatric fluency to hiring directors",
      people: "Complete cultural psychiatry training through UCSF or Stanford's psychiatry department — both offer CME courses on culturally formulated psychiatric assessment for immigrant and minority populations, which is directly applicable to FQHC practice",
      execution: "Get familiar with FQHC same-day billing rules for BH — the DHCS FQHC APM Program Guide and Noridian FQHC billing guide are the primary references. Understanding this prevents billing errors and shows financial literacy in leadership interviews",
      growth: "Explore tele-psychiatry platforms used in FQHC settings — Teladoc Health, Array Behavioral Care, and Iris Telehealth partner with many California FQHCs. Tele-psych experience significantly expands your employment options and geographic reach",
      transition: "In your FQHC interview, ask about caseload size, warm handoff protocols, and whether they use a Collaborative Care Model registry. How they answer tells you about program maturity and your likely scope of practice",
    },
    esNextSteps: {
      mission: "Destaca la experiencia psiquiátrica específica de FQHC en tu currículum — específicamente facturación PPS, consulta de atención colaborativa y gestión psiquiátrica basada en población",
      people: "Completa capacitación en psiquiatría cultural a través de UCSF o el departamento de psiquiatría de Stanford",
      execution: "Familiarízate con las reglas de facturación del mismo día de FQHC para BH — la Guía del Programa APM FQHC de DHCS y la guía de facturación de FQHC de Noridian son las referencias principales",
      growth: "Explora plataformas de tele-psiquiatría utilizadas en entornos de FQHC — Teladoc Health, Array Behavioral Care e Iris Telehealth se asocian con muchos FQHCs de California",
      transition: "En tu entrevista de FQHC, pregunta sobre el tamaño de la carga de casos, protocolos de transferencia cálida y si usan un registro de Modelo de Atención Colaborativa",
    },
    employerWants: {
      topQualifications: [
        "Active California NP license with Psychiatric-Mental Health specialty (PMHNP)",
        "DEA registration and California Furnishing Number",
        "FQHC, community mental health, or integrated BH experience",
        "Collaborative Care Model (CoCM) experience (preferred)",
        "Tele-psychiatry experience (increasingly required at multi-site FQHCs)",
      ],
      esTopQualifications: [
        "Licencia activa de NP de California con especialidad en Salud Mental Psiquiátrica (PMHNP)",
        "Registro DEA y Número de Suministro de California",
        "Experiencia en FQHC, salud mental comunitaria o BH integrada",
        "Experiencia en Modelo de Atención Colaborativa (CoCM) (preferido)",
        "Experiencia en tele-psiquiatría (cada vez más requerida en FQHCs de múltiples sitios)",
      ],
      topSkills: [
        "Psychiatric medication management (adult and adolescent populations)",
        "Crisis assessment and safety planning",
        "Collaborative Care Model (CoCM) consultation",
        "FQHC PPS billing for behavioral health encounters",
        "Trauma-informed psychiatric practice",
      ],
      esTopSkills: [
        "Manejo de medicamentos psiquiátricos (poblaciones adultas y adolescentes)",
        "Evaluación de crisis y planificación de seguridad",
        "Consulta del Modelo de Atención Colaborativa (CoCM)",
        "Facturación PPS de FQHC para encuentros de salud conductual",
        "Práctica psiquiátrica informada por trauma",
      ],
      certifications: [
        "California NP license — PMHNP specialty (required)",
        "DEA registration (required)",
        "PMHNP Board Certification (required)",
        "FQHC/community mental health prescribing experience",
      ],
      esCertifications: [
        "Licencia NP de California — especialidad PMHNP (requerida)",
        "Registro DEA (requerido)",
        "Certificación de Junta PMHNP (requerida)",
        "Experiencia en prescripción en FQHC/salud mental comunitaria",
      ],
    },
  },

  /* ================================================================ */
  /*  PROGRAM MANAGER                                                   */
  /* ================================================================ */
  program_manager: {
    strengthMessages: {
      mission: "FQHC program managers are the operational architects of community health — designing, implementing, and sustaining the programs that deliver care to California's most vulnerable populations. Your ability to connect program strategy to health equity outcomes is what separates effective FQHC leaders from administrators.",
      people: "Your ability to build and sustain cross-functional teams — aligning clinical staff, community health workers, billing, and data teams around shared program goals — is the leadership competency that most directly determines whether FQHC programs succeed or stagnate.",
      execution: "Your capacity to manage program budgets, deliverables, reporting timelines, and funder relationships simultaneously — often for multiple programs at once — is exactly the operational discipline that FQHC program directors depend on.",
      growth: "Your drive to expand from program execution into program design and systems-level thinking positions you for director of programs and VP of clinical operations roles in larger FQHC networks.",
      transition: "Your ability to quickly assess a new program's maturity, identify gaps in staffing or systems, and build a credible first-90-day plan shows the Rumelt-style 'diagnosis first' approach that FQHC executives hire for.",
    },
    esStrengthMessages: {
      mission: "Los gerentes de programa de FQHC son los arquitectos operativos de la salud comunitaria — diseñando, implementando y sosteniendo los programas que brindan atención a las poblaciones más vulnerables de California.",
      people: "Tu capacidad para construir y sostener equipos interfuncionales — alineando personal clínico, trabajadores de salud comunitaria, facturación y equipos de datos en torno a objetivos de programa compartidos.",
      execution: "Tu capacidad para gestionar presupuestos de programa, entregables, plazos de informes y relaciones con financiadores simultáneamente — a menudo para múltiples programas a la vez.",
      growth: "Tu impulso para expandirte desde la ejecución del programa hacia el diseño del programa y el pensamiento a nivel de sistemas te posiciona para roles de director de programas.",
      transition: "Tu capacidad para evaluar rápidamente la madurez de un nuevo programa, identificar brechas en dotación de personal o sistemas y construir un plan creíble para los primeros 90 días.",
    },
    growthMessages: {
      mission: "Develop your CalAIM program fluency — ECM, Community Supports, and ILOS are the fastest-growing FQHC program areas, and program managers who can operate within CalAIM infrastructure are in urgent demand across California.",
      people: "Learn Liberating Structures facilitation — techniques like 1-2-4-All, TRIZ, and Wise Crowds help program managers build genuine team intelligence and distributed problem-solving. FQHC programs that rely only on top-down management struggle to innovate.",
      execution: "Build your HRSA compliance knowledge — specifically the Health Center Program requirements (Section 330, Uniform Data System), scope of project amendments, and HRSA site visit preparation. Program managers who understand HRSA compliance protect the whole organization.",
      growth: "Pursue a healthcare management certification — ACHE Fellow (FACHE), Certified Medical Manager (CMM), or a graduate certificate in health administration. These credentials signal career seriousness and open doors to director-level interviews.",
      transition: "When taking over a new FQHC program, spend your first 30 days in 'listening mode' — conduct 1:1s with every team member, map the existing workflow before changing it, and build a written diagnosis before proposing solutions.",
    },
    esGrowthMessages: {
      mission: "Desarrolla tu fluidez en el programa CalAIM — ECM, Community Supports e ILOS son las áreas de programa de FQHC de más rápido crecimiento.",
      people: "Aprende la facilitación de Liberating Structures — técnicas como 1-2-4-All, TRIZ y Wise Crowds ayudan a los gerentes de programa a construir inteligencia genuina de equipo.",
      execution: "Desarrolla tu conocimiento de cumplimiento de HRSA — específicamente los requisitos del Programa de Centros de Salud (Sección 330, Sistema de Datos Uniformes), enmiendas al alcance del proyecto y preparación para visitas del sitio de HRSA.",
      growth: "Obtén una certificación de gestión de salud — ACHE Fellow (FACHE), Gerente Médico Certificado (CMM) o un certificado de posgrado en administración de salud.",
      transition: "Al tomar el control de un nuevo programa de FQHC, pasa tus primeros 30 días en 'modo de escucha' — realiza entrevistas individuales con cada miembro del equipo, mapea el flujo de trabajo existente antes de cambiarlo.",
    },
    nextSteps: {
      mission: "In your resume, quantify program impact — patients served, cost per outcome, quality measure improvement percentages. FQHC program managers who can show data-backed results get hired faster and command higher salaries",
      people: "Complete a change management certification — PROSCI ADKAR or Kotter's 8-Step Process. FQHC programs constantly face regulatory change, and program managers with formal change management skills are increasingly prioritized in hiring",
      execution: "Get trained in HRSA's Uniform Data System (UDS) reporting — it's the primary accountability tool for all FQHC programs and understanding it signals to hiring managers that you can operate within federal grant compliance structures",
      growth: "Pursue ACHE membership and the FACHE exam path — it's the most recognized credential in healthcare management and signals executive-track seriousness. Many CA FQHCs offer ACHE membership reimbursement as a benefit",
      transition: "Before interviewing for a program manager role at a specific FQHC, review their most recent HRSA UDS data (publicly available at data.hrsa.gov) — understanding their patient volume, quality measures, and program profile shows strategic preparation",
    },
    esNextSteps: {
      mission: "En tu currículum, cuantifica el impacto del programa — pacientes atendidos, costo por resultado, porcentajes de mejora en medidas de calidad",
      people: "Completa una certificación de gestión del cambio — PROSCI ADKAR o el Proceso de 8 Pasos de Kotter",
      execution: "Capacítate en los informes del Sistema de Datos Uniformes (UDS) de HRSA — es la herramienta de responsabilidad principal para todos los programas de FQHC",
      growth: "Obtén la membresía de ACHE y el camino hacia el examen FACHE — es la credencial más reconocida en gestión de atención médica",
      transition: "Antes de entrevistar para un rol de gerente de programa en un FQHC específico, revisa sus datos UDS de HRSA más recientes (disponibles públicamente en data.hrsa.gov)",
    },
    employerWants: {
      topQualifications: [
        "3+ years program management in a healthcare or community health setting",
        "CalAIM program experience (ECM, Community Supports, ILOS) — preferred",
        "HRSA grant compliance and UDS reporting experience (preferred)",
        "Budget management and funder reporting experience",
        "Bilingual Spanish/English (preferred at most CA FQHCs)",
      ],
      esTopQualifications: [
        "3+ años de gestión de programas en un entorno de atención médica o salud comunitaria",
        "Experiencia en programa CalAIM (ECM, Community Supports, ILOS) — preferido",
        "Experiencia en cumplimiento de subvenciones HRSA e informes UDS (preferido)",
        "Experiencia en gestión de presupuesto e informes a financiadores",
        "Bilingüe español/inglés (preferido en la mayoría de FQHCs de CA)",
      ],
      topSkills: [
        "CalAIM program design and operations (ECM, Community Supports)",
        "HRSA compliance and Uniform Data System (UDS) reporting",
        "Cross-functional team leadership and performance management",
        "Program budget development and funder reporting",
        "Quality improvement and data-driven program optimization",
      ],
      esTopSkills: [
        "Diseño y operaciones del programa CalAIM (ECM, Community Supports)",
        "Cumplimiento HRSA e informes del Sistema de Datos Uniformes (UDS)",
        "Liderazgo de equipo interfuncional y gestión del desempeño",
        "Desarrollo del presupuesto del programa e informes a financiadores",
        "Mejora de calidad y optimización del programa basada en datos",
      ],
      certifications: [
        "PMP (Project Management Professional) — preferred",
        "ACHE Member or FACHE — preferred",
        "Change management certification (PROSCI/ADKAR) — preferred",
        "CalAIM program-specific training (DHCS, CPCA)",
      ],
      esCertifications: [
        "PMP (Profesional en Gestión de Proyectos) — preferido",
        "Miembro de ACHE o FACHE — preferido",
        "Certificación de gestión del cambio (PROSCI/ADKAR) — preferido",
        "Capacitación específica del programa CalAIM (DHCS, CPCA)",
      ],
    },
  },

  /* ================================================================ */
  /*  COMPLIANCE OFFICER                                              */
  /* ================================================================ */
  compliance_officer: {
    strengthMessages: {
      mission: "Compliance officers at California FQHCs are the first line of defense protecting millions in federal HRSA funding, Medicaid revenue, and patient safety — often standing between an organization and million-dollar penalties or program termination. Your vigilance and strategic thinking directly enable the FQHC mission to serve vulnerable populations.",
      people: "Your ability to translate complex regulatory requirements into clear, actionable guidance for clinicians, billing staff, and leadership — and to do this without triggering defensiveness — is the communication skill that moves compliance from a 'compliance burden' to a 'compliance partner' mindset across the entire organization.",
      execution: "Your mastery of the 19 HRSA Scope of Project requirements, HIPAA audit response protocols, 340B drug program reconciliation, billing audit management, and documentation compliance across multiple EHR systems is the specialized operational discipline that protects the entire FQHC financial model.",
      growth: "Your strategic foresight about emerging compliance risks — AI scribe documentation accuracy, UIS PPS elimination impact on billing processes, CalAIM workflow compliance, new regulatory guidance — positions you for Chief Compliance Officer and Board governance roles.",
      transition: "Your ability to quickly diagnose an FQHC's compliance baseline — identifying systemic gaps in policy documentation, EHR workflows, or billing practices — and build a credible remediation timeline shows the Rumelt-style strategic assessment that FQHC executives hire for.",
    },
    esStrengthMessages: {
      mission: "Los oficiales de cumplimiento en los FQHCs de California son la primera línea de defensa que protege millones en financiamiento HRSA, ingresos de Medicaid y seguridad del paciente — a menudo manteniendo a una organización alejada de sanciones de millones de dólares o terminación del programa.",
      people: "Tu capacidad para traducir requisitos regulatorios complejos en orientación clara y accionable para personal clínico, personal de facturación y liderazgo — y hacerlo sin desencadenar defensas — es la habilidad de comunicación que transforma el cumplimiento.",
      execution: "Tu dominio de los 19 requisitos de Alcance del Proyecto de HRSA, protocolos de respuesta a auditorías HIPAA, reconciliación del programa de medicamentos 340B, gestión de auditorías de facturación y cumplimiento de documentación en múltiples sistemas EHR.",
      growth: "Tu previsión estratégica sobre riesgos de cumplimiento emergentes — precisión de documentación de scribes de IA, impacto de la eliminación de UIS PPS en procesos de facturación, cumplimiento del flujo de trabajo de CalAIM, nueva orientación regulatoria.",
      transition: "Tu capacidad para diagnosticar rápidamente la línea base de cumplimiento de un FQHC — identificando brechas sistémicas en documentación de políticas, flujos de trabajo de EHR o prácticas de facturación.",
    },
    growthMessages: {
      mission: "Deepen your understanding of HRSA Scope of Project (SOP) compliance — the 19 HRSA Program Requirements sections are the regulatory backbone of FQHC operations, and compliance officers who can map organizational processes back to each SOP requirement can speak directly to board governance concerns.",
      people: "Develop a training-first mentality across the organization. Create monthly compliance briefings for clinical staff, quarterly billing workshops, and annual board compliance updates. Compliance officers who build a compliance culture — rather than just audit it — are protected during financial crises.",
      execution: "Build your 340B drug program expertise — it's increasingly scrutinized by federal auditors and even a 2-3% overage in reimbursement can trigger millions in recapture liabilities. Specialized 340B compliance knowledge makes you invaluable during HRSA site visits.",
      growth: "Follow emerging AI compliance challenges — specifically AI scribes and automated documentation tools. As vendors like Abridge, Nabla, and Sunoh.ai expand in FQHC settings, compliance officers who understand AI model limitations and documentation liability will lead the sector.",
      transition: "When starting at a new FQHC, your first 60 days should involve: (1) reviewing past HRSA site visit findings, (2) interviewing billing leadership about audit history, (3) evaluating current EHR documentation templates for compliance gaps, (4) building a written compliance roadmap.",
    },
    esGrowthMessages: {
      mission: "Profundiza tu comprensión del cumplimiento del Alcance del Proyecto (SOP) de HRSA — los 19 requisitos del Programa HRSA son la columna vertebral regulatoria de las operaciones de FQHC.",
      people: "Desarrolla una mentalidad centrada en la capacitación en toda la organización. Crea sesiones informativas mensuales de cumplimiento para personal clínico, talleres trimestrales de facturación.",
      execution: "Desarrolla tu experiencia en el programa de medicamentos 340B — está siendo cada vez más escrutinizado por auditores federales.",
      growth: "Sigue los desafíos de cumplimiento de IA emergentes — específicamente scribes de IA y herramientas de documentación automatizada.",
      transition: "Al comenzar en un nuevo FQHC, tus primeros 60 días deben involucrar: (1) revisar hallazgos pasados de visitas del sitio de HRSA, (2) entrevistar al liderazgo de facturación sobre historial de auditoría.",
    },
    nextSteps: {
      mission: "In your resume, highlight experience with HRSA compliance, 340B programs, and HIPAA audit management. Use specific language from the HRSA Program Requirements (e.g., 'HRSA Scope of Project compliance,' 'site visit preparation,' 'Section 330 compliance') — this signals fluency to hiring directors",
      people: "Obtain or update your CHC (Certified Health Center) credential — it's increasingly required for compliance officer roles at larger FQHCs and demonstrates mastery of HRSA program operations. The National Association of Community Health Centers (NACHC) administers the exam",
      execution: "Complete specialized 340B compliance training through ASHP (American Society of Health-System Pharmacists) or the Pharmaceutical Research and Manufacturers of America (PhRMA). 340B expertise is in high demand and commands premium salaries at multi-clinic FQHCs",
      growth: "Monitor regulatory updates from HRSA, CMS, and DHCS — subscribe to NACHC Policy & Issues updates and the CPCA policy briefings. Compliance officers who can anticipate regulatory change before it hits are strategic assets, not just reactive auditors",
      transition: "Before interviewing, research the FQHC's recent HRSA Quality of Care reports and past audit findings (available in the HRSA grant history). Understanding their compliance history tells you what regulatory challenges you'll inherit and how serious the culture is about compliance",
    },
    esNextSteps: {
      mission: "En tu currículum, destaca la experiencia con cumplimiento de HRSA, programas 340B y gestión de auditoría HIPAA.",
      people: "Obtén o actualiza tu credencial CHC (Certified Health Center) — es cada vez más requerida para roles de oficial de cumplimiento en FQHCs más grandes.",
      execution: "Completa la capacitación especializada en cumplimiento 340B a través de ASHP (Asociación Americana de Farmacéuticos de Sistemas de Salud) o la Asociación de Fabricantes de Investigación Farmacéutica (PhRMA).",
      growth: "Monitorea las actualizaciones regulatorias de HRSA, CMS y DHCS — suscríbete a las actualizaciones de Política y Problemas de NACHC.",
      transition: "Antes de entrevistar, investiga los informes recientes de Calidad de Atención de HRSA del FQHC y hallazgos de auditorías pasadas.",
    },
    employerWants: {
      topQualifications: [
        "5+ years healthcare compliance experience, with 3+ years in FQHC or federally qualified health setting",
        "Certified Health Center (CHC) credential or equivalent HRSA program knowledge",
        "HIPAA compliance and breach response experience — hands-on",
        "340B drug program audit and reconciliation experience",
        "Experience with HRSA Scope of Project (SOP) compliance and UDS reporting",
        "Bilingual Spanish/English preferred",
      ],
      esTopQualifications: [
        "5+ años de experiencia en cumplimiento de atención médica, con 3+ años en entorno de FQHC o centro de salud federalmente calificado",
        "Credencial de Centro de Salud Certificado (CHC) o conocimiento equivalente del programa HRSA",
        "Experiencia en cumplimiento de HIPAA y respuesta a brechas — práctica",
        "Experiencia en auditoría y reconciliación del programa de medicamentos 340B",
        "Experiencia con cumplimiento del Alcance del Proyecto (SOP) de HRSA e informes UDS",
        "Bilingüe español/inglés preferido",
      ],
      topSkills: [
        "HRSA Scope of Project (SOP) compliance across all 19 program requirements",
        "HIPAA audit response and breach notification protocols",
        "340B drug program reconciliation and rebate tracking",
        "Billing audit management and coder compliance oversight",
        "FQHC EHR documentation compliance (eClinicalWorks, OCHIN Epic, Athena, NextGen)",
        "Policy development and staff compliance training",
        "Regulatory intelligence and change management",
      ],
      esTopSkills: [
        "Cumplimiento del Alcance del Proyecto (SOP) de HRSA en los 19 requisitos del programa",
        "Respuesta de auditoría HIPAA y protocolos de notificación de brechas",
        "Reconciliación del programa de medicamentos 340B y seguimiento de reembolsos",
        "Gestión de auditoría de facturación y supervisión de cumplimiento de codificadores",
        "Cumplimiento de documentación EHR de FQHC (eClinicalWorks, OCHIN Epic, Athena, NextGen)",
        "Desarrollo de políticas y capacitación de cumplimiento del personal",
        "Inteligencia regulatoria y gestión del cambio",
      ],
      certifications: [
        "Certified Health Center (CHC) — strongly preferred",
        "Certified Healthcare Compliance Professional (CHCP) — preferred",
        "HIPAA Privacy and Security training certification (required)",
        "Healthcare Fraud and Abuse Act compliance training — required",
      ],
      esCertifications: [
        "Centro de Salud Certificado (CHC) — fuertemente preferido",
        "Profesional Certificado de Cumplimiento de Atención Médica (CHCP) — preferido",
        "Certificación de capacitación en privacidad y seguridad HIPAA (requerida)",
        "Capacitación en cumplimiento de la Ley de Fraude y Abuso de Atención Médica — requerida",
      ],
    },
  },

  /* ================================================================ */
  /*  COMPLIANCE ANALYST                                              */
  /* ================================================================ */
  compliance_analyst: {
    strengthMessages: {
      mission: "Compliance analysts at FQHCs protect thousands of patients daily by ensuring clinical and billing processes follow regulatory standards — and they protect the FQHC itself by catching documentation and coding gaps before federal auditors do. Your meticulous attention to detail directly enables the FQHC mission.",
      people: "Your ability to work with clinical staff and coders on documentation and coding improvements — without making them feel audited — is the coaching skill that moves compliance from 'catching mistakes' to 'building systems that prevent them in the first place.'",
      execution: "Your mastery of chart audits, billing validation, credentialing file reviews, 340B reconciliation tracking, and EHR documentation compliance demonstrates the operational precision that high-performing FQHC billing operations depend on.",
      growth: "Your interest in building proactive compliance systems — designing EHR template improvements, creating staff training, implementing data validation processes — positions you for Senior Compliance Analyst and Compliance Program Coordinator roles.",
      transition: "Your ability to quickly learn an FQHC's billing workflows, EHR systems, and coding patterns — and identify high-risk compliance areas within 30 days — shows the analytical foundation that makes you ready for bigger compliance program responsibilities.",
    },
    esStrengthMessages: {
      mission: "Los analistas de cumplimiento en los FQHCs protegen a miles de pacientes diariamente asegurando que los procesos clínicos y de facturación cumplan con los estándares regulatorios.",
      people: "Tu capacidad para trabajar con personal clínico y codificadores en mejoras de documentación y codificación — sin hacerlos sentir auditados — es la habilidad de coaching que transforma el cumplimiento.",
      execution: "Tu dominio de auditorías de gráficos, validación de facturación, revisiones de archivos de acreditación, seguimiento de reconciliación 340B y cumplimiento de documentación de EHR.",
      growth: "Tu interés en construir sistemas de cumplimiento proactivos — diseñar mejoras de plantillas de EHR, crear capacitación del personal, implementar procesos de validación de datos.",
      transition: "Tu capacidad para aprender rápidamente los flujos de trabajo de facturación de un FQHC, sistemas de EHR y patrones de codificación — e identificar áreas de cumplimiento de alto riesgo dentro de 30 días.",
    },
    growthMessages: {
      mission: "Understand FQHC billing fundamentals — PPS payment methodology, same-day billing rules for multiple visit types, E&M documentation requirements, and how 340B pricing impacts revenue. Compliance analysts who understand billing strategy, not just compliance rules, become invaluable to finance leadership.",
      people: "Build your coaching and training skills — create audit findings reports that educate rather than blame, facilitate monthly billing compliance workshops, and mentor new coders on documentation standards. FQHC compliance culture is built by analysts who teach, not just inspect.",
      execution: "Master FQHC EHR systems — specifically the compliance workflows in eClinicalWorks, OCHIN Epic, Athena, and NextGen. Learn how to run audit reports, flag documentation gaps, and validate billing codes at the system level rather than doing manual chart reviews.",
      growth: "Pursue your Certified Health Center (CHC) credential — it signals commitment to FQHC operations and opens doors to Compliance Officer roles. Many larger FQHCs offer CHC exam reimbursement as a professional development benefit.",
      transition: "In your first 30 days at a new FQHC, build a simple compliance dashboard: (1) chart audit findings by department, (2) coding error patterns, (3) documentation compliance rates by provider, (4) 340B reconciliation status. Data-driven compliance insights make you visible to leadership.",
    },
    esGrowthMessages: {
      mission: "Comprende los fundamentos de la facturación de FQHC — metodología de pago PPS, reglas de facturación del mismo día para múltiples tipos de visitas, requisitos de documentación E&M.",
      people: "Desarrolla tus habilidades de coaching y capacitación — crea informes de hallazgos de auditoría que eduquen en lugar de culpar.",
      execution: "Domina los sistemas EHR de FQHC — específicamente los flujos de trabajo de cumplimiento en eClinicalWorks, OCHIN Epic, Athena y NextGen.",
      growth: "Obtén tu credencial de Centro de Salud Certificado (CHC) — señala compromiso con las operaciones de FQHC y abre puertas a roles de Oficial de Cumplimiento.",
      transition: "En tus primeros 30 días en un nuevo FQHC, construye un panel de control de cumplimiento simple.",
    },
    nextSteps: {
      mission: "In your resume, highlight specific compliance work — chart audit volume, coding error patterns identified, documentation improvements implemented. Use metrics (e.g., 'reduced chart deficiency rate from 8% to 2%' or 'identified $45K in billing recovery through 340B reconciliation') — these demonstrate real compliance impact",
      people: "Complete a basic healthcare billing course (coding fundamentals, PPS methodology, E&M documentation). Community colleges offer affordable online options, and understanding billing helps you identify compliance issues faster",
      execution: "Get proficient in Excel and data analysis — compliance analysis increasingly relies on running audit queries, tracking findings trends, and presenting data dashboards. If you're not comfortable with Excel pivot tables and VLOOKUP, upskill now",
      growth: "Enroll in the CHC exam preparation pathway — NACHC offers study materials, practice exams, and the credential itself is increasingly required for advancement to Compliance Officer roles",
      transition: "Before interviewing, ask the FQHC about their compliance program maturity — Do they conduct regular chart audits? What's their current documentation deficiency rate? How many FTE does the compliance team have? These answers tell you whether you'll be building compliance from scratch or optimizing existing systems",
    },
    esNextSteps: {
      mission: "En tu currículum, destaca el trabajo de cumplimiento específico — volumen de auditoría de gráficos, patrones de errores de codificación identificados.",
      people: "Completa un curso básico de facturación de atención médica (fundamentos de codificación, metodología PPS, documentación E&M).",
      execution: "Sé competente en Excel y análisis de datos — el análisis de cumplimiento cada vez más depende de ejecutar consultas de auditoría, seguimiento de tendencias de hallazgos.",
      growth: "Inscríbete en la ruta de preparación del examen CHC — NACHC ofrece materiales de estudio y la credencial es cada vez más requerida para avance a roles de Oficial de Cumplimiento.",
      transition: "Antes de entrevistar, pregunta al FQHC sobre la madurez de su programa de cumplimiento.",
    },
    employerWants: {
      topQualifications: [
        "1-3 years healthcare compliance, medical coding, or FQHC billing experience",
        "Strong Excel and data analysis skills",
        "Detail-oriented with ability to spot patterns in complex data",
        "Knowledge of healthcare billing basics (CPT/ICD codes, PPS methodology) — preferred",
        "HIPAA compliance knowledge — required",
        "Bilingual Spanish/English preferred",
      ],
      esTopQualifications: [
        "1-3 años de experiencia en cumplimiento de atención médica, codificación médica o facturación de FQHC",
        "Fuertes habilidades de Excel y análisis de datos",
        "Orientado a los detalles con capacidad de detectar patrones en datos complejos",
        "Conocimiento de conceptos básicos de facturación de atención médica (códigos CPT/ICD, metodología PPS) — preferido",
        "Conocimiento de cumplimiento de HIPAA — requerido",
        "Bilingüe español/inglés preferido",
      ],
      topSkills: [
        "Chart audits and documentation compliance reviews",
        "CPT and ICD coding validation",
        "Billing reconciliation and error identification",
        "340B program reconciliation and tracking",
        "EHR system navigation and audit report generation",
        "Data analysis, pivot tables, and reporting",
        "Credentialing file reviews and maintenance",
      ],
      esTopSkills: [
        "Auditorías de gráficos y revisiones de cumplimiento de documentación",
        "Validación de codificación CPT e ICD",
        "Reconciliación de facturación e identificación de errores",
        "Reconciliación y seguimiento del programa 340B",
        "Navegación del sistema EHR y generación de informes de auditoría",
        "Análisis de datos, tablas dinámicas e informes",
        "Revisiones y mantenimiento de archivos de acreditación",
      ],
      certifications: [
        "Certified Medical Coder (CPC) or AAPC credential — preferred",
        "HIPAA compliance training certification — required",
        "Certified Health Center (CHC) — preferred (can pursue after hiring)",
        "Phlebotomy or coding fundamentals certification — helpful",
      ],
      esCertifications: [
        "Codificador Médico Certificado (CPC) o credencial AAPC — preferido",
        "Certificación de capacitación en cumplimiento de HIPAA — requerida",
        "Centro de Salud Certificado (CHC) — preferido (se puede obtener después de la contratación)",
        "Certificación de flebotomía o fundamentos de codificación — útil",
      ],
    },
  },
};
