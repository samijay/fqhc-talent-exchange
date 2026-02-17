/* ------------------------------------------------------------------ */
/*  First 90 Days Plan Generator                                       */
/*  Based on Watkins' "The First 90 Days" framework adapted for FQHC   */
/*  Generates personalized 30/60/90 day plans from assessment results   */
/* ------------------------------------------------------------------ */

import type { DomainId, AssessmentResults } from "./career-assessment-engine";

/* --- Types --------------------------------------------------------- */

export type STARSType =
  | "startup"       // New program or position being created
  | "turnaround"    // Struggling team/program that needs fixing
  | "accelerated"   // Growing fast, scaling up
  | "realignment"   // Change needed but not obvious to everyone
  | "sustaining"    // Maintaining success, keeping momentum

export interface PlanItem {
  text: string;
  esText: string;
  domain: DomainId | "general";
}

export interface PhaseMilestone {
  text: string;
  esText: string;
}

export interface PlanPhase {
  title: string;
  esTitle: string;
  subtitle: string;
  esSubtitle: string;
  priorities: PlanItem[];
  milestone: PhaseMilestone;
}

export interface ConversationPrompt {
  name: string;
  esName: string;
  description: string;
  esDescription: string;
  sampleQuestion: string;
  esSampleQuestion: string;
}

export interface FOGLAMPItem {
  letter: string;
  label: string;
  esLabel: string;
  action: string;
  esAction: string;
}

export interface First90DaysPlan {
  roleId: string;
  roleName: string;
  esRoleName: string;
  starsType: STARSType;
  starsLabel: string;
  esStarsLabel: string;
  phases: {
    days1to30: PlanPhase;
    days31to60: PlanPhase;
    days61to90: PlanPhase;
  };
  fiveConversations: ConversationPrompt[];
  foglamp: FOGLAMPItem[];
  coachingNote: string;
  esCoachingNote: string;
}

/* --- STARS Labels -------------------------------------------------- */

const STARS_LABELS: Record<STARSType, { en: string; es: string; description: string; esDescription: string }> = {
  startup: {
    en: "New Program Launch",
    es: "Lanzamiento de Nuevo Programa",
    description: "You're building something from scratch. Focus on learning fast, defining processes, and building your initial team relationships.",
    esDescription: "Estas construyendo algo desde cero. Enfocate en aprender rapido, definir procesos y construir tus relaciones iniciales de equipo.",
  },
  turnaround: {
    en: "Turnaround Situation",
    es: "Situacion de Cambio",
    description: "The team or program needs fixing. Focus on quick wins, building trust, and identifying what to keep vs. what to change.",
    esDescription: "El equipo o programa necesita mejoras. Enfocate en logros rapidos, construir confianza e identificar que mantener vs. que cambiar.",
  },
  accelerated: {
    en: "Growth & Scaling",
    es: "Crecimiento y Escalamiento",
    description: "Things are moving fast. Focus on building systems that scale, hiring the right people, and maintaining quality during growth.",
    esDescription: "Las cosas se mueven rapido. Enfocate en construir sistemas escalables, contratar a las personas correctas y mantener calidad durante el crecimiento.",
  },
  realignment: {
    en: "Realignment Needed",
    es: "Realineamiento Necesario",
    description: "Change is needed, but not everyone sees it yet. Focus on building a case for change while maintaining relationships.",
    esDescription: "El cambio es necesario, pero no todos lo ven aun. Enfocate en construir un caso para el cambio mientras mantienes las relaciones.",
  },
  sustaining: {
    en: "Sustaining Success",
    es: "Manteniendo el Exito",
    description: "Things are working well. Focus on learning what makes this team successful and finding ways to add value without disrupting what works.",
    esDescription: "Las cosas van bien. Enfocate en aprender que hace exitoso a este equipo y encontrar formas de agregar valor sin interrumpir lo que funciona.",
  },
};

/* --- Five Conversations -------------------------------------------- */

const FIVE_CONVERSATIONS: ConversationPrompt[] = [
  {
    name: "The Situation",
    esName: "La Situacion",
    description: "Understand the real challenges facing your team and FQHC. Ask about funding, staffing, patient volume, and recent changes.",
    esDescription: "Entiende los verdaderos desafios que enfrenta tu equipo y FQHC. Pregunta sobre financiamiento, personal, volumen de pacientes y cambios recientes.",
    sampleQuestion: "What are the three biggest challenges facing this team right now, and what's been tried before to address them?",
    esSampleQuestion: "Cuales son los tres mayores desafios que enfrenta este equipo ahora mismo, y que se ha intentado antes para abordarlos?",
  },
  {
    name: "Expectations",
    esName: "Expectativas",
    description: "Align on what success looks like at 30, 60, and 90 days. Get specific — not just 'do a good job' but measurable outcomes.",
    esDescription: "Alinea en como se ve el exito a los 30, 60 y 90 dias. Se especifico — no solo 'hacer un buen trabajo' sino resultados medibles.",
    sampleQuestion: "What would you most like to see me accomplish in my first 90 days? What would make you say 'this hire was a great decision'?",
    esSampleQuestion: "Que es lo que mas te gustaria verme lograr en mis primeros 90 dias? Que te haria decir 'esta contratacion fue una gran decision'?",
  },
  {
    name: "Resources",
    esName: "Recursos",
    description: "Identify what resources are available — training budgets, EHR support, mentorship, team members who can help you get up to speed.",
    esDescription: "Identifica que recursos estan disponibles — presupuestos de capacitacion, soporte de EHR, mentoria, miembros del equipo que pueden ayudarte a ponerte al dia.",
    sampleQuestion: "What training and support resources are available to me? Who are the go-to people when I have questions about systems, patients, or processes?",
    esSampleQuestion: "Que recursos de capacitacion y apoyo estan disponibles para mi? Quienes son las personas clave cuando tengo preguntas sobre sistemas, pacientes o procesos?",
  },
  {
    name: "Style",
    esName: "Estilo",
    description: "Learn how your manager and team prefer to communicate and work together. This prevents misunderstandings and builds trust faster.",
    esDescription: "Aprende como tu gerente y equipo prefieren comunicarse y trabajar juntos. Esto previene malentendidos y construye confianza mas rapido.",
    sampleQuestion: "How do you prefer to receive updates — brief emails, weekly check-ins, or real-time updates? What's your communication style when something goes wrong?",
    esSampleQuestion: "Como prefieres recibir actualizaciones — correos breves, reuniones semanales o actualizaciones en tiempo real? Cual es tu estilo de comunicacion cuando algo sale mal?",
  },
  {
    name: "Personal Development",
    esName: "Desarrollo Personal",
    description: "Discuss where you want to grow and what career paths exist. Show your manager you're invested in the long term.",
    esDescription: "Discute donde quieres crecer y que caminos profesionales existen. Muestra a tu gerente que estas invertido/a a largo plazo.",
    sampleQuestion: "What opportunities exist for professional growth in this role? Are there training programs, certifications, or career pathways you'd recommend I pursue?",
    esSampleQuestion: "Que oportunidades existen para crecimiento profesional en este puesto? Hay programas de capacitacion, certificaciones o caminos profesionales que recomendarias que busque?",
  },
];

/* --- FOGLAMP Checklist ---------------------------------------------- */

const FOGLAMP: FOGLAMPItem[] = [
  { letter: "F", label: "Figure Out", esLabel: "Descubrir", action: "What do I need to learn about this FQHC, team, and patient population?", esAction: "Que necesito aprender sobre este FQHC, equipo y poblacion de pacientes?" },
  { letter: "O", label: "Objectives", esLabel: "Objetivos", action: "What are my key goals for the first 30/60/90 days?", esAction: "Cuales son mis metas clave para los primeros 30/60/90 dias?" },
  { letter: "G", label: "Gaps", esLabel: "Brechas", action: "Where are my skill or knowledge gaps? What training do I need?", esAction: "Donde estan mis brechas de habilidad o conocimiento? Que capacitacion necesito?" },
  { letter: "L", label: "Leadership", esLabel: "Liderazgo", action: "How will I lead or contribute to my team's success?", esAction: "Como liderare o contribuire al exito de mi equipo?" },
  { letter: "A", label: "Allies", esLabel: "Aliados", action: "Who are my key allies, mentors, and collaborators?", esAction: "Quienes son mis aliados clave, mentores y colaboradores?" },
  { letter: "M", label: "Milestones", esLabel: "Hitos", action: "What measurable milestones will I hit at 30, 60, and 90 days?", esAction: "Que hitos medibles alcanzare a los 30, 60 y 90 dias?" },
  { letter: "P", label: "Plan", esLabel: "Plan", action: "What's my week-by-week action plan for the first month?", esAction: "Cual es mi plan de accion semana a semana para el primer mes?" },
];

/* --- Role-Specific Plan Content ------------------------------------ */

interface RolePlanContent {
  roleName: string;
  esRoleName: string;
  days1to30: PlanItem[];
  days31to60: PlanItem[];
  days61to90: PlanItem[];
  milestone30: PhaseMilestone;
  milestone60: PhaseMilestone;
  milestone90: PhaseMilestone;
}

const ROLE_PLANS: Record<string, RolePlanContent> = {
  chw: {
    roleName: "Community Health Worker",
    esRoleName: "Promotor(a) de Salud Comunitaria",
    days1to30: [
      { text: "Shadow experienced CHWs on home visits and outreach events for at least 2 weeks", esText: "Acompana a CHWs experimentados en visitas domiciliarias y eventos de alcance por al menos 2 semanas", domain: "growth" },
      { text: "Learn your FQHC's EHR system — master patient lookup, visit notes, and care gap reports", esText: "Aprende el sistema EHR de tu FQHC — domina la busqueda de pacientes, notas de visita e informes de brechas de atencion", domain: "execution" },
      { text: "Meet every member of your care team: providers, nurses, care coordinators, behavioral health", esText: "Conoce a cada miembro de tu equipo de atencion: proveedores, enfermeros, coordinadores de atencion, salud conductual", domain: "people" },
      { text: "Learn the community resources available for your patients: food banks, housing, transportation, legal aid", esText: "Aprende los recursos comunitarios disponibles para tus pacientes: bancos de alimentos, vivienda, transporte, asistencia legal", domain: "execution" },
      { text: "Schedule your Five Conversations with your supervisor to align on expectations", esText: "Programa tus Cinco Conversaciones con tu supervisor para alinear expectativas", domain: "general" },
    ],
    days31to60: [
      { text: "Begin carrying your own caseload (start with 50-75% of full panel)", esText: "Comienza a llevar tu propia carga de casos (empieza con 50-75% del panel completo)", domain: "execution" },
      { text: "Conduct independent home visits and outreach — document everything in the EHR", esText: "Realiza visitas domiciliarias y alcance independientes — documenta todo en el EHR", domain: "execution" },
      { text: "Build relationships with 3-5 community partners for warm referrals", esText: "Construye relaciones con 3-5 socios comunitarios para referencias calidas", domain: "people" },
      { text: "Attend your first care team meeting and contribute at least one patient update", esText: "Asiste a tu primera reunion de equipo de atencion y contribuye al menos una actualizacion de paciente", domain: "mission" },
      { text: "Start tracking your patient engagement metrics (contacts, completions, no-shows)", esText: "Comienza a rastrear tus metricas de participacion del paciente (contactos, completaciones, ausencias)", domain: "execution" },
    ],
    days61to90: [
      { text: "Carry your full caseload independently with consistent documentation", esText: "Lleva tu carga de casos completa independientemente con documentacion consistente", domain: "execution" },
      { text: "Identify one process improvement and present it to your supervisor", esText: "Identifica una mejora de proceso y presentala a tu supervisor", domain: "growth" },
      { text: "Mentor or orient a newer team member on community resources or outreach techniques", esText: "Mentora u orienta a un miembro mas nuevo del equipo sobre recursos comunitarios o tecnicas de alcance", domain: "people" },
      { text: "Participate in a quality improvement initiative or patient advisory session", esText: "Participa en una iniciativa de mejora de calidad o sesion de consejo de pacientes", domain: "mission" },
      { text: "Create a 6-month professional development plan with your supervisor", esText: "Crea un plan de desarrollo profesional de 6 meses con tu supervisor", domain: "growth" },
    ],
    milestone30: { text: "You can navigate the EHR, describe the care team structure, and have attended at least 5 patient visits", esText: "Puedes navegar el EHR, describir la estructura del equipo de atencion y has asistido al menos a 5 visitas de pacientes" },
    milestone60: { text: "You are carrying 50-75% of your caseload independently and have built key community partnerships", esText: "Estas llevando 50-75% de tu carga de casos independientemente y has construido alianzas comunitarias clave" },
    milestone90: { text: "Full caseload, independent documentation, and you've proposed at least one improvement to your team", esText: "Carga de casos completa, documentacion independiente, y has propuesto al menos una mejora a tu equipo" },
  },

  care_coordinator: {
    roleName: "Care Coordinator",
    esRoleName: "Coordinador(a) de Atencion",
    days1to30: [
      { text: "Learn your FQHC's ECM/CCM enrollment workflows, care plan templates, and Medi-Cal documentation requirements", esText: "Aprende los flujos de trabajo de inscripcion ECM/CCM de tu FQHC, plantillas de planes de atencion y requisitos de documentacion de Medi-Cal", domain: "execution" },
      { text: "Shadow an experienced care coordinator through 10+ patient interactions across different acuity levels", esText: "Acompana a un coordinador de atencion experimentado a traves de 10+ interacciones con pacientes de diferentes niveles de agudeza", domain: "growth" },
      { text: "Map the referral network: who are the key contacts at behavioral health, housing, legal, and specialty care?", esText: "Mapea la red de referencias: quienes son los contactos clave en salud conductual, vivienda, legal y atencion especializada?", domain: "people" },
      { text: "Master care plan documentation in your EHR — learn the templates, required fields, and compliance timelines", esText: "Domina la documentacion de planes de atencion en tu EHR — aprende las plantillas, campos requeridos y plazos de cumplimiento", domain: "execution" },
      { text: "Schedule your Five Conversations to understand expectations and success metrics", esText: "Programa tus Cinco Conversaciones para entender expectativas y metricas de exito", domain: "general" },
    ],
    days31to60: [
      { text: "Begin managing your own ECM/CCM panel (start at 50-60% capacity)", esText: "Comienza a gestionar tu propio panel ECM/CCM (empieza al 50-60% de capacidad)", domain: "execution" },
      { text: "Lead your first warm handoff between a provider and a community resource", esText: "Lidera tu primera transferencia calida entre un proveedor y un recurso comunitario", domain: "people" },
      { text: "Attend and contribute to a care team huddle — bring patient updates and identify care gaps", esText: "Asiste y contribuye a una reunion de equipo de atencion — trae actualizaciones de pacientes e identifica brechas de atencion", domain: "mission" },
      { text: "Build a personal tracker for authorization requests, referral follow-ups, and care plan reviews", esText: "Construye un rastreador personal para solicitudes de autorizacion, seguimiento de referencias y revisiones de planes de atencion", domain: "execution" },
      { text: "Practice running a 5-minute daily care gap review to catch overdue follow-ups", esText: "Practica ejecutar una revision diaria de 5 minutos de brechas de atencion para detectar seguimientos vencidos", domain: "execution" },
    ],
    days61to90: [
      { text: "Carry your full ECM/CCM caseload with compliant documentation and timely follow-ups", esText: "Lleva tu carga completa de casos ECM/CCM con documentacion conforme y seguimientos oportunos", domain: "execution" },
      { text: "Present a complex case review to your care team demonstrating cross-functional coordination", esText: "Presenta una revision de caso complejo a tu equipo de atencion demostrando coordinacion multifuncional", domain: "people" },
      { text: "Identify and propose a workflow improvement for care plan efficiency or patient follow-through", esText: "Identifica y propone una mejora de flujo de trabajo para la eficiencia del plan de atencion o seguimiento del paciente", domain: "growth" },
      { text: "Begin training a newer team member on basic care coordination workflows", esText: "Comienza a entrenar a un miembro mas nuevo del equipo en flujos de trabajo basicos de coordinacion de atencion", domain: "people" },
      { text: "Set up your 6-month development plan — discuss CCM certification and career pathways", esText: "Configura tu plan de desarrollo de 6 meses — discute la certificacion CCM y caminos profesionales", domain: "growth" },
    ],
    milestone30: { text: "You understand ECM/CCM workflows, can navigate the EHR for care plans, and know your referral network", esText: "Entiendes los flujos de trabajo ECM/CCM, puedes navegar el EHR para planes de atencion y conoces tu red de referencias" },
    milestone60: { text: "You're managing 50-60% of your caseload independently with clean documentation", esText: "Estas gestionando 50-60% de tu carga de casos independientemente con documentacion limpia" },
    milestone90: { text: "Full caseload, leading care team conversations, and you've proposed a workflow improvement", esText: "Carga completa de casos, liderando conversaciones del equipo de atencion y has propuesto una mejora de flujo de trabajo" },
  },

  medical_assistant: {
    roleName: "Medical Assistant",
    esRoleName: "Asistente Medico/a",
    days1to30: [
      { text: "Master the FQHC's patient rooming workflow: vitals, chief complaint, medication reconciliation", esText: "Domina el flujo de trabajo de preparacion de pacientes del FQHC: signos vitales, queja principal, reconciliacion de medicamentos", domain: "execution" },
      { text: "Learn the EHR system for check-in, vitals entry, immunization records, and lab ordering", esText: "Aprende el sistema EHR para registro, ingreso de signos vitales, registros de inmunizacion y ordenes de laboratorio", domain: "execution" },
      { text: "Shadow each provider you'll work with to learn their specific preferences and workflow style", esText: "Acompana a cada proveedor con el que trabajaras para aprender sus preferencias especificas y estilo de flujo de trabajo", domain: "people" },
      { text: "Review vaccine storage, cold chain management, and point-of-care testing protocols", esText: "Revisa el almacenamiento de vacunas, gestion de cadena de frio y protocolos de pruebas de punto de atencion", domain: "execution" },
      { text: "Schedule your Five Conversations to align on quality expectations and workflow preferences", esText: "Programa tus Cinco Conversaciones para alinear expectativas de calidad y preferencias de flujo de trabajo", domain: "general" },
    ],
    days31to60: [
      { text: "Begin rooming patients independently — aim for 15-20 patients per day with accurate vitals", esText: "Comienza a preparar pacientes independientemente — apunta a 15-20 pacientes por dia con signos vitales precisos", domain: "execution" },
      { text: "Learn pre-visit planning: review tomorrow's schedule for care gaps, overdue labs, and screening needs", esText: "Aprende planificacion previa a la visita: revisa el horario de manana para brechas de atencion, laboratorios vencidos y necesidades de deteccion", domain: "execution" },
      { text: "Build rapport with front desk staff to improve patient flow communication", esText: "Construye relacion con el personal de recepcion para mejorar la comunicacion del flujo de pacientes", domain: "people" },
      { text: "Complete any outstanding certifications (phlebotomy, EKG, injections) if not already certified", esText: "Completa cualquier certificacion pendiente (flebotomia, EKG, inyecciones) si aun no estas certificado/a", domain: "growth" },
      { text: "Begin tracking your patient throughput and documentation accuracy metrics", esText: "Comienza a rastrear tus metricas de rendimiento de pacientes y precision de documentacion", domain: "execution" },
    ],
    days61to90: [
      { text: "Handle full daily patient volume (20-25 patients) with consistent quality and documentation", esText: "Maneja el volumen diario completo de pacientes (20-25 pacientes) con calidad y documentacion consistente", domain: "execution" },
      { text: "Propose one workflow improvement to your clinic manager (scheduling, supply ordering, patient flow)", esText: "Propone una mejora de flujo de trabajo a tu gerente de clinica (programacion, pedido de suministros, flujo de pacientes)", domain: "growth" },
      { text: "Help orient a newer MA or float staff on your clinic's specific workflows", esText: "Ayuda a orientar a un MA mas nuevo o personal flotante en los flujos de trabajo especificos de tu clinica", domain: "people" },
      { text: "Participate in a quality improvement initiative or patient satisfaction review", esText: "Participa en una iniciativa de mejora de calidad o revision de satisfaccion del paciente", domain: "mission" },
      { text: "Create your 6-month development plan — discuss lead MA pathways and additional certifications", esText: "Crea tu plan de desarrollo de 6 meses — discute caminos a MA lider y certificaciones adicionales", domain: "growth" },
    ],
    milestone30: { text: "You can room patients with accurate vitals, navigate the EHR, and know your providers' preferences", esText: "Puedes preparar pacientes con signos vitales precisos, navegar el EHR y conoces las preferencias de tus proveedores" },
    milestone60: { text: "You're independently handling 15-20 patients daily with pre-visit planning", esText: "Estas manejando independientemente 15-20 pacientes diarios con planificacion previa a la visita" },
    milestone90: { text: "Full patient volume, pre-visit planning is routine, and you've proposed an improvement", esText: "Volumen completo de pacientes, la planificacion previa a la visita es rutinaria y has propuesto una mejora" },
  },

  case_manager: {
    roleName: "Case Manager",
    esRoleName: "Gerente de Casos",
    days1to30: [
      { text: "Learn your FQHC's case management protocols: intake, assessment, care planning, and documentation requirements", esText: "Aprende los protocolos de gestion de casos de tu FQHC: ingreso, evaluacion, planificacion de atencion y requisitos de documentacion", domain: "execution" },
      { text: "Shadow experienced case managers on high-acuity cases — observe crisis intervention and de-escalation techniques", esText: "Acompana a gestores de casos experimentados en casos de alta agudeza — observa tecnicas de intervencion en crisis y desescalacion", domain: "growth" },
      { text: "Map the community resource network for your patient population: housing, behavioral health, substance use, legal", esText: "Mapea la red de recursos comunitarios para tu poblacion de pacientes: vivienda, salud conductual, uso de sustancias, legal", domain: "people" },
      { text: "Review Medi-Cal TCM and ECM billing requirements — understand what needs to be documented for reimbursement", esText: "Revisa los requisitos de facturacion TCM y ECM de Medi-Cal — entiende que necesita documentarse para reembolso", domain: "execution" },
      { text: "Schedule your Five Conversations to understand case complexity expectations and caseload ramp-up timeline", esText: "Programa tus Cinco Conversaciones para entender expectativas de complejidad de casos y cronograma de aumento de carga", domain: "general" },
    ],
    days31to60: [
      { text: "Begin managing your own caseload (start at 50% capacity with supervision on complex cases)", esText: "Comienza a gestionar tu propia carga de casos (empieza al 50% de capacidad con supervision en casos complejos)", domain: "execution" },
      { text: "Conduct your first independent patient assessments and care plan development", esText: "Realiza tus primeras evaluaciones independientes de pacientes y desarrollo de planes de atencion", domain: "execution" },
      { text: "Build relationships with key referral partners — schedule in-person meetings with 3-5 agencies", esText: "Construye relaciones con socios de referencia clave — programa reuniones presenciales con 3-5 agencias", domain: "people" },
      { text: "Practice trauma-informed care techniques with your patient population", esText: "Practica tecnicas de atencion informada por trauma con tu poblacion de pacientes", domain: "people" },
      { text: "Develop templates for common case management scenarios to streamline documentation", esText: "Desarrolla plantillas para escenarios comunes de gestion de casos para agilizar la documentacion", domain: "execution" },
    ],
    days61to90: [
      { text: "Carry your full caseload with independent documentation and compliant care plans", esText: "Lleva tu carga completa de casos con documentacion independiente y planes de atencion conformes", domain: "execution" },
      { text: "Present a complex case review demonstrating your clinical judgment and coordination skills", esText: "Presenta una revision de caso complejo demostrando tu juicio clinico y habilidades de coordinacion", domain: "people" },
      { text: "Identify a pattern in your caseload and propose a systemic improvement", esText: "Identifica un patron en tu carga de casos y propone una mejora sistemica", domain: "growth" },
      { text: "Begin pursuing CCM certification or specialized training for your patient population", esText: "Comienza a buscar la certificacion CCM o capacitacion especializada para tu poblacion de pacientes", domain: "growth" },
      { text: "Contribute to team knowledge by sharing a resource guide or case study with colleagues", esText: "Contribuye al conocimiento del equipo compartiendo una guia de recursos o estudio de caso con colegas", domain: "mission" },
    ],
    milestone30: { text: "You understand case management protocols, know your referral network, and have observed 10+ cases", esText: "Entiendes los protocolos de gestion de casos, conoces tu red de referencias y has observado 10+ casos" },
    milestone60: { text: "You're managing 50% of your caseload independently with supervised complex cases", esText: "Estas gestionando 50% de tu carga de casos independientemente con casos complejos supervisados" },
    milestone90: { text: "Full caseload, compliant documentation, and you've presented a complex case review", esText: "Carga completa de casos, documentacion conforme y has presentado una revision de caso complejo" },
  },

  behavioral_health: {
    roleName: "Behavioral Health Specialist",
    esRoleName: "Especialista en Salud Conductual",
    days1to30: [
      { text: "Learn the integrated BH model at your FQHC: warm handoff protocols, brief intervention workflows, and provider collaboration", esText: "Aprende el modelo de BH integrado en tu FQHC: protocolos de transferencia calida, flujos de trabajo de intervencion breve y colaboracion con proveedores", domain: "execution" },
      { text: "Shadow BH clinicians through warm handoffs, crisis interventions, and scheduled therapy sessions", esText: "Acompana a clinicos de BH en transferencias calidas, intervenciones en crisis y sesiones de terapia programadas", domain: "growth" },
      { text: "Meet each primary care provider to understand how they prefer BH consults and warm handoffs", esText: "Conoce a cada proveedor de atencion primaria para entender como prefieren las consultas de BH y transferencias calidas", domain: "people" },
      { text: "Master your EHR's BH-specific templates: PHQ-9, GAD-7, safety plans, and progress notes", esText: "Domina las plantillas especificas de BH de tu EHR: PHQ-9, GAD-7, planes de seguridad y notas de progreso", domain: "execution" },
      { text: "Establish your clinical supervision schedule and peer consultation group", esText: "Establece tu horario de supervision clinica y grupo de consulta entre pares", domain: "general" },
    ],
    days31to60: [
      { text: "Begin seeing patients independently — mix of warm handoffs and scheduled appointments", esText: "Comienza a ver pacientes independientemente — mezcla de transferencias calidas y citas programadas", domain: "execution" },
      { text: "Develop your crisis intervention skills — review safety plan protocols and practice de-escalation", esText: "Desarrolla tus habilidades de intervencion en crisis — revisa protocolos de planes de seguridad y practica desescalacion", domain: "execution" },
      { text: "Build relationships with community BH resources for warm referrals (psychiatry, substance use, crisis)", esText: "Construye relaciones con recursos comunitarios de BH para referencias calidas (psiquiatria, uso de sustancias, crisis)", domain: "people" },
      { text: "Start tracking your clinical outcomes: appointment adherence, PHQ-9 changes, patient satisfaction", esText: "Comienza a rastrear tus resultados clinicos: adherencia a citas, cambios en PHQ-9, satisfaccion del paciente", domain: "execution" },
      { text: "Document efficiently during sessions to reduce after-hours charting and prevent burnout", esText: "Documenta eficientemente durante las sesiones para reducir la documentacion fuera de horas y prevenir el agotamiento", domain: "growth" },
    ],
    days61to90: [
      { text: "Carry your full clinical caseload with balanced mix of crisis and ongoing therapy", esText: "Lleva tu carga clinica completa con mezcla equilibrada de crisis y terapia continua", domain: "execution" },
      { text: "Lead a behavioral health training or case consultation for your primary care team", esText: "Lidera una capacitacion en salud conductual o consulta de caso para tu equipo de atencion primaria", domain: "people" },
      { text: "Propose an improvement to the BH integration model at your FQHC", esText: "Propone una mejora al modelo de integracion de BH en tu FQHC", domain: "growth" },
      { text: "Develop a self-care and burnout prevention plan — this is a marathon, not a sprint", esText: "Desarrolla un plan de autocuidado y prevencion de agotamiento — esto es un maraton, no un sprint", domain: "mission" },
      { text: "Plan your licensure hours and supervision trajectory toward LCSW/LMFT/LPCC", esText: "Planifica tus horas de licenciatura y trayectoria de supervision hacia LCSW/LMFT/LPCC", domain: "growth" },
    ],
    milestone30: { text: "You understand the integrated BH model, can handle warm handoffs, and know your provider team", esText: "Entiendes el modelo de BH integrado, puedes manejar transferencias calidas y conoces a tu equipo de proveedores" },
    milestone60: { text: "You're seeing patients independently with supervised complex cases and crisis protocols", esText: "Estas viendo pacientes independientemente con casos complejos supervisados y protocolos de crisis" },
    milestone90: { text: "Full caseload, efficient documentation, and you've led a team training or case consultation", esText: "Carga completa, documentacion eficiente y has liderado una capacitacion de equipo o consulta de caso" },
  },

  registered_nurse: {
    roleName: "Registered Nurse",
    esRoleName: "Enfermero/a Registrado/a",
    days1to30: [
      { text: "Learn your FQHC's clinical protocols: triage, chronic disease management, immunizations, and standing orders", esText: "Aprende los protocolos clinicos de tu FQHC: triaje, manejo de enfermedades cronicas, inmunizaciones y ordenes permanentes", domain: "execution" },
      { text: "Master the EHR for nursing workflows: orders, medication reconciliation, patient messaging, and care gap reports", esText: "Domina el EHR para flujos de trabajo de enfermeria: ordenes, reconciliacion de medicamentos, mensajeria al paciente e informes de brechas de atencion", domain: "execution" },
      { text: "Meet the full care team: providers, MAs, care coordinators, BH clinicians, and admin leadership", esText: "Conoce al equipo completo de atencion: proveedores, MAs, coordinadores de atencion, clinicos de BH y liderazgo administrativo", domain: "people" },
      { text: "Review your patient panel for chronic disease management needs (diabetes, hypertension, asthma)", esText: "Revisa tu panel de pacientes para necesidades de manejo de enfermedades cronicas (diabetes, hipertension, asma)", domain: "execution" },
      { text: "Schedule your Five Conversations to align on triage expectations and clinical scope", esText: "Programa tus Cinco Conversaciones para alinear expectativas de triaje y alcance clinico", domain: "general" },
    ],
    days31to60: [
      { text: "Begin independent triage and clinical assessment — handle walk-in acuity and phone triage", esText: "Comienza triaje y evaluacion clinica independiente — maneja la agudeza sin cita y triaje telefonico", domain: "execution" },
      { text: "Run population health reports to identify overdue screenings and care gaps in your patient panel", esText: "Ejecuta informes de salud poblacional para identificar detecciones vencidas y brechas de atencion en tu panel de pacientes", domain: "execution" },
      { text: "Lead or co-lead a chronic disease management group visit (diabetes education, asthma action plans)", esText: "Lidera o co-lidera una visita grupal de manejo de enfermedades cronicas (educacion sobre diabetes, planes de accion para asma)", domain: "people" },
      { text: "Build your delegation skills — effectively direct MAs and coordinate care team activities", esText: "Construye tus habilidades de delegacion — dirige efectivamente a MAs y coordina actividades del equipo de atencion", domain: "people" },
      { text: "Explore NHSC loan repayment eligibility if applicable to your situation", esText: "Explora la elegibilidad de reembolso de prestamos NHSC si es aplicable a tu situacion", domain: "growth" },
    ],
    days61to90: [
      { text: "Handle full clinical nursing responsibilities: triage, chronic care, immunization clinics, patient education", esText: "Maneja todas las responsabilidades de enfermeria clinica: triaje, atencion cronica, clinicas de inmunizacion, educacion al paciente", domain: "execution" },
      { text: "Identify a quality improvement opportunity in your clinical area and propose a pilot", esText: "Identifica una oportunidad de mejora de calidad en tu area clinica y propone un piloto", domain: "growth" },
      { text: "Begin mentoring MAs or newer nurses on clinical protocols and EHR workflows", esText: "Comienza a mentorear MAs o enfermeros mas nuevos en protocolos clinicos y flujos de trabajo del EHR", domain: "people" },
      { text: "Present patient outcome data at a care team meeting or quality improvement session", esText: "Presenta datos de resultados de pacientes en una reunion de equipo de atencion o sesion de mejora de calidad", domain: "mission" },
      { text: "Discuss your career trajectory — charge nurse, clinical lead, or NP pathway", esText: "Discute tu trayectoria profesional — enfermero a cargo, lider clinico o camino a NP", domain: "growth" },
    ],
    milestone30: { text: "You understand clinical protocols, can navigate the EHR for nursing workflows, and know the care team", esText: "Entiendes los protocolos clinicos, puedes navegar el EHR para flujos de trabajo de enfermeria y conoces al equipo de atencion" },
    milestone60: { text: "You're handling independent triage, running population health reports, and coordinating care teams", esText: "Estas manejando triaje independiente, ejecutando informes de salud poblacional y coordinando equipos de atencion" },
    milestone90: { text: "Full clinical scope, quality improvement proposal submitted, and mentoring newer staff", esText: "Alcance clinico completo, propuesta de mejora de calidad presentada y mentoreando personal mas nuevo" },
  },

  patient_services: {
    roleName: "Patient Services Representative",
    esRoleName: "Representante de Servicios al Paciente",
    days1to30: [
      { text: "Master check-in workflows: patient registration, insurance verification, sliding fee applications", esText: "Domina los flujos de trabajo de registro: registro de pacientes, verificacion de seguros, aplicaciones de tarifa deslizante", domain: "execution" },
      { text: "Learn the EHR scheduling system — appointment types, provider templates, and overbooking policies", esText: "Aprende el sistema de programacion del EHR — tipos de citas, plantillas de proveedores y politicas de sobreprogramacion", domain: "execution" },
      { text: "Practice de-escalation techniques for frustrated patients — the front desk sees the most emotional moments", esText: "Practica tecnicas de desescalacion para pacientes frustrados — la recepcion ve los momentos mas emocionales", domain: "people" },
      { text: "Understand Medi-Cal eligibility basics, copay exemptions, and common coverage questions patients ask", esText: "Entiende los basicos de elegibilidad de Medi-Cal, exenciones de copago y preguntas comunes de cobertura que hacen los pacientes", domain: "execution" },
      { text: "Schedule your Five Conversations to understand volume expectations and escalation protocols", esText: "Programa tus Cinco Conversaciones para entender expectativas de volumen y protocolos de escalacion", domain: "general" },
    ],
    days31to60: [
      { text: "Handle full check-in volume independently (30-40+ patients per day)", esText: "Maneja el volumen completo de registro independientemente (30-40+ pacientes por dia)", domain: "execution" },
      { text: "Learn to verify Medi-Cal eligibility in real-time and troubleshoot common coverage issues", esText: "Aprende a verificar la elegibilidad de Medi-Cal en tiempo real y resolver problemas comunes de cobertura", domain: "execution" },
      { text: "Build warm relationships with clinical staff to improve patient handoff communication", esText: "Construye relaciones calidas con el personal clinico para mejorar la comunicacion de transferencia de pacientes", domain: "people" },
      { text: "Start tracking your own metrics: check-in accuracy, wait times, and patient satisfaction scores", esText: "Comienza a rastrear tus propias metricas: precision de registro, tiempos de espera y puntuaciones de satisfaccion del paciente", domain: "execution" },
      { text: "Learn the sliding fee scale and financial counseling basics for uninsured patients", esText: "Aprende la escala de tarifas deslizantes y basicos de asesoria financiera para pacientes sin seguro", domain: "growth" },
    ],
    days61to90: [
      { text: "Handle all front desk responsibilities independently including complex scheduling and eligibility issues", esText: "Maneja todas las responsabilidades de recepcion independientemente incluyendo programacion compleja y problemas de elegibilidad", domain: "execution" },
      { text: "Identify one improvement to patient check-in flow and propose it to your manager", esText: "Identifica una mejora al flujo de registro de pacientes y proponla a tu gerente", domain: "growth" },
      { text: "Help train a new team member or float staff on front desk procedures", esText: "Ayuda a entrenar a un nuevo miembro del equipo o personal flotante en procedimientos de recepcion", domain: "people" },
      { text: "Attend a patient advisory meeting to understand the patient experience from their perspective", esText: "Asiste a una reunion de asesoria de pacientes para entender la experiencia del paciente desde su perspectiva", domain: "mission" },
      { text: "Create a 6-month plan to grow into patient access coordinator or eligibility specialist role", esText: "Crea un plan de 6 meses para crecer al rol de coordinador de acceso al paciente o especialista en elegibilidad", domain: "growth" },
    ],
    milestone30: { text: "You can check in patients, navigate the scheduling system, and handle basic eligibility questions", esText: "Puedes registrar pacientes, navegar el sistema de programacion y manejar preguntas basicas de elegibilidad" },
    milestone60: { text: "You're handling full daily volume independently with minimal supervision", esText: "Estas manejando el volumen diario completo independientemente con supervision minima" },
    milestone90: { text: "Independent on all front desk tasks, and you've proposed a process improvement", esText: "Independiente en todas las tareas de recepcion, y has propuesto una mejora de proceso" },
  },

  revenue_cycle: {
    roleName: "Revenue Cycle Specialist",
    esRoleName: "Especialista en Ciclo de Ingresos",
    days1to30: [
      { text: "Learn your FQHC's billing workflows: charge capture, claims submission, and Medi-Cal PPS reimbursement", esText: "Aprende los flujos de trabajo de facturacion de tu FQHC: captura de cargos, envio de reclamos y reembolso PPS de Medi-Cal", domain: "execution" },
      { text: "Understand FQHC-specific billing: PPS rates, wrap payments, 340B program, and sliding fee administration", esText: "Entiende la facturacion especifica de FQHC: tarifas PPS, pagos complementarios, programa 340B y administracion de tarifa deslizante", domain: "execution" },
      { text: "Shadow the billing team through common claim types: Medi-Cal FFS, managed care, Medicare, and self-pay", esText: "Acompana al equipo de facturacion en tipos comunes de reclamos: Medi-Cal FFS, atencion administrada, Medicare y auto-pago", domain: "growth" },
      { text: "Learn the EHR billing module — claim entry, denial tracking, and reporting dashboards", esText: "Aprende el modulo de facturacion del EHR — entrada de reclamos, rastreo de denegaciones y paneles de informes", domain: "execution" },
      { text: "Schedule your Five Conversations to understand clean claim rate targets and denial resolution expectations", esText: "Programa tus Cinco Conversaciones para entender objetivos de tasa de reclamos limpios y expectativas de resolucion de denegaciones", domain: "general" },
    ],
    days31to60: [
      { text: "Begin processing claims independently — aim for clean claim rate above 90%", esText: "Comienza a procesar reclamos independientemente — apunta a una tasa de reclamos limpios por encima del 90%", domain: "execution" },
      { text: "Build a denial management tracker: categorize by payer, reason, and appeal status", esText: "Construye un rastreador de gestion de denegaciones: categoriza por pagador, razon y estado de apelacion", domain: "execution" },
      { text: "Learn to communicate billing information to patients and front desk staff in plain language", esText: "Aprende a comunicar informacion de facturacion a pacientes y personal de recepcion en lenguaje sencillo", domain: "people" },
      { text: "Review and appeal denied claims systematically — track your recovery rate", esText: "Revisa y apela reclamos denegados sistematicamente — rastrea tu tasa de recuperacion", domain: "execution" },
      { text: "Begin learning CalAIM billing changes and new revenue opportunities", esText: "Comienza a aprender los cambios de facturacion CalAIM y nuevas oportunidades de ingresos", domain: "growth" },
    ],
    days61to90: [
      { text: "Handle full billing responsibilities with clean claim rate above 95%", esText: "Maneja todas las responsabilidades de facturacion con tasa de reclamos limpios por encima del 95%", domain: "execution" },
      { text: "Identify a pattern in denied claims and propose a systemic fix (coding, documentation, process)", esText: "Identifica un patron en reclamos denegados y propone una solucion sistemica (codificacion, documentacion, proceso)", domain: "growth" },
      { text: "Create a plain-language financial FAQ for patients and front desk staff", esText: "Crea un FAQ financiero en lenguaje sencillo para pacientes y personal de recepcion", domain: "people" },
      { text: "Present revenue cycle metrics at a leadership meeting or financial review", esText: "Presenta metricas de ciclo de ingresos en una reunion de liderazgo o revision financiera", domain: "mission" },
      { text: "Begin pursuing CPC or CCS-P certification for career advancement", esText: "Comienza a buscar la certificacion CPC o CCS-P para avance profesional", domain: "growth" },
    ],
    milestone30: { text: "You understand FQHC billing, PPS rates, and can navigate the EHR billing module", esText: "Entiendes la facturacion de FQHC, tarifas PPS y puedes navegar el modulo de facturacion del EHR" },
    milestone60: { text: "You're processing claims independently with 90%+ clean claim rate and systematic denial tracking", esText: "Estas procesando reclamos independientemente con tasa de reclamos limpios de 90%+ y rastreo sistematico de denegaciones" },
    milestone90: { text: "95%+ clean claim rate, denial pattern analysis complete, and revenue metrics presented to leadership", esText: "Tasa de reclamos limpios de 95%+, analisis de patron de denegaciones completo y metricas de ingresos presentadas al liderazgo" },
  },
};

/* --- Domain-Weighted Priority Items -------------------------------- */

function getDomainPriorityNote(
  domainId: DomainId,
  level: "strength" | "developing" | "growth_area",
): { en: string; es: string } | null {
  if (level !== "growth_area") return null;

  const notes: Record<DomainId, { en: string; es: string }> = {
    mission: {
      en: "Your Mission & Motivation score suggests spending extra time connecting with patient stories and your FQHC's community impact during onboarding.",
      es: "Tu puntuacion en Mision y Motivacion sugiere dedicar tiempo extra a conectar con historias de pacientes y el impacto comunitario de tu FQHC durante la incorporacion.",
    },
    people: {
      en: "Your People & Communication score suggests prioritizing relationship-building and requesting a mentor or buddy during your first 30 days.",
      es: "Tu puntuacion en Personas y Comunicacion sugiere priorizar la construccion de relaciones y solicitar un mentor o companero durante tus primeros 30 dias.",
    },
    execution: {
      en: "Your Execution & Adaptability score suggests asking for additional EHR training and creating personal checklists for your daily workflows.",
      es: "Tu puntuacion en Ejecucion y Adaptabilidad sugiere pedir capacitacion adicional en EHR y crear listas de verificacion personales para tus flujos de trabajo diarios.",
    },
    growth: {
      en: "Your Growth Mindset score suggests setting specific learning goals and scheduling regular development conversations with your supervisor.",
      es: "Tu puntuacion en Mentalidad de Crecimiento sugiere establecer metas de aprendizaje especificas y programar conversaciones regulares de desarrollo con tu supervisor.",
    },
    transition: {
      en: "Your Transition Readiness score suggests spending time before your first day researching the FQHC, preparing questions for your supervisor, and creating your own onboarding checklist.",
      es: "Tu puntuacion en Preparacion para la Transicion sugiere dedicar tiempo antes de tu primer dia investigando el FQHC, preparando preguntas para tu supervisor y creando tu propia lista de verificacion de incorporacion.",
    },
  };

  return notes[domainId];
}

/* --- Plan Generator ------------------------------------------------ */

/**
 * Generates a personalized First 90 Days plan based on:
 * - Role (determines specific tasks and milestones)
 * - STARS type (determines coaching tone and priorities)
 * - Assessment results (adds domain-specific coaching notes)
 */
export function generateFirst90DaysPlan(
  roleId: string,
  starsType: STARSType,
  assessmentResults?: AssessmentResults,
): First90DaysPlan | null {
  const rolePlan = ROLE_PLANS[roleId];
  if (!rolePlan) return null;

  const starsInfo = STARS_LABELS[starsType];

  // Build coaching note from assessment growth areas
  let coachingNote = starsInfo.description;
  let esCoachingNote = starsInfo.esDescription;

  if (assessmentResults) {
    const growthDomain = assessmentResults.topGrowthArea;
    const note = getDomainPriorityNote(
      growthDomain,
      assessmentResults.domainScores[growthDomain].level,
    );
    if (note) {
      coachingNote += ` ${note.en}`;
      esCoachingNote += ` ${note.es}`;
    }
  }

  return {
    roleId,
    roleName: rolePlan.roleName,
    esRoleName: rolePlan.esRoleName,
    starsType,
    starsLabel: starsInfo.en,
    esStarsLabel: starsInfo.es,
    phases: {
      days1to30: {
        title: "Days 1-30: Learn & Listen",
        esTitle: "Dias 1-30: Aprender y Escuchar",
        subtitle: "Build your foundation — learn systems, meet people, understand the culture",
        esSubtitle: "Construye tu base — aprende sistemas, conoce personas, entiende la cultura",
        priorities: rolePlan.days1to30,
        milestone: rolePlan.milestone30,
      },
      days31to60: {
        title: "Days 31-60: Build & Connect",
        esTitle: "Dias 31-60: Construir y Conectar",
        subtitle: "Start contributing independently — take on your caseload, build relationships",
        esSubtitle: "Comienza a contribuir independientemente — asume tu carga de trabajo, construye relaciones",
        priorities: rolePlan.days31to60,
        milestone: rolePlan.milestone60,
      },
      days61to90: {
        title: "Days 61-90: Deliver & Grow",
        esTitle: "Dias 61-90: Entregar y Crecer",
        subtitle: "Full productivity — deliver results, propose improvements, plan your growth",
        esSubtitle: "Productividad completa — entrega resultados, propone mejoras, planifica tu crecimiento",
        priorities: rolePlan.days61to90,
        milestone: rolePlan.milestone90,
      },
    },
    fiveConversations: FIVE_CONVERSATIONS,
    foglamp: FOGLAMP,
    coachingNote,
    esCoachingNote,
  };
}

/* --- STARS Triage Questions for Fast-Track ------------------------- */

export interface STARSTriageQuestion {
  id: string;
  question: string;
  esQuestion: string;
  options: Array<{
    id: string;
    text: string;
    esText: string;
    starsType: STARSType;
  }>;
}

export const STARS_TRIAGE_QUESTIONS: STARSTriageQuestion[] = [
  {
    id: "transition_type",
    question: "What best describes your situation?",
    esQuestion: "Que describe mejor tu situacion?",
    options: [
      { id: "same_role", text: "Looking for the same type of role at a new FQHC", esText: "Buscando el mismo tipo de puesto en un nuevo FQHC", starsType: "sustaining" },
      { id: "career_change", text: "Looking to change roles or career direction", esText: "Buscando cambiar de rol o direccion profesional", starsType: "realignment" },
      { id: "growth", text: "Looking for a role with more responsibility or leadership", esText: "Buscando un puesto con mas responsabilidad o liderazgo", starsType: "accelerated" },
      { id: "fresh_start", text: "Need a fresh start — previous situation wasn't working", esText: "Necesito un nuevo comienzo — la situacion anterior no funcionaba", starsType: "turnaround" },
    ],
  },
  {
    id: "urgency",
    question: "How quickly do you need to start your next role?",
    esQuestion: "Que tan rapido necesitas comenzar tu proximo puesto?",
    options: [
      { id: "asap", text: "As soon as possible — within 2 weeks", esText: "Lo antes posible — dentro de 2 semanas", starsType: "turnaround" },
      { id: "month", text: "Within the next month", esText: "Dentro del proximo mes", starsType: "sustaining" },
      { id: "flexible", text: "I have some flexibility — I want to find the right fit", esText: "Tengo algo de flexibilidad — quiero encontrar el ajuste correcto", starsType: "sustaining" },
      { id: "exploring", text: "I'm exploring options and taking my time", esText: "Estoy explorando opciones y tomandome mi tiempo", starsType: "realignment" },
    ],
  },
];

/**
 * Determines STARS type from triage question answers.
 * Uses most common STARS type across answers, defaults to "sustaining".
 */
export function determineSTARSType(answers: Record<string, string>): STARSType {
  const starsVotes: Record<STARSType, number> = {
    startup: 0,
    turnaround: 0,
    accelerated: 0,
    realignment: 0,
    sustaining: 0,
  };

  for (const question of STARS_TRIAGE_QUESTIONS) {
    const selectedId = answers[question.id];
    if (!selectedId) continue;
    const option = question.options.find((o) => o.id === selectedId);
    if (option) {
      starsVotes[option.starsType]++;
    }
  }

  // Return the type with the most votes
  let maxType: STARSType = "sustaining";
  let maxVotes = 0;
  for (const [type, votes] of Object.entries(starsVotes)) {
    if (votes > maxVotes) {
      maxVotes = votes;
      maxType = type as STARSType;
    }
  }

  return maxType;
}

/* --- Manager Five Conversations ------------------------------------ */
/* Rewritten for managers asking THEIR reports these questions         */

export const MANAGER_FIVE_CONVERSATIONS: ConversationPrompt[] = [
  {
    name: "The Situation",
    esName: "La Situacion",
    description: "Understand the real state of your team. Ask each direct report about their view of what's working and what's broken — before you form your own conclusions.",
    esDescription: "Entiende el estado real de tu equipo. Pregunta a cada subordinado directo su vision de que funciona y que esta roto — antes de formar tus propias conclusiones.",
    sampleQuestion: "What are the three biggest challenges this team faces right now? What's been tried before, and what happened?",
    esSampleQuestion: "Cuales son los tres mayores desafios que enfrenta este equipo ahora mismo? Que se ha intentado antes y que paso?",
  },
  {
    name: "Expectations",
    esName: "Expectativas",
    description: "Align on what you expect from each team member — and what they expect from you. Be specific about metrics, timelines, and communication preferences.",
    esDescription: "Alinea en lo que esperas de cada miembro del equipo — y lo que ellos esperan de ti. Se especifico sobre metricas, plazos y preferencias de comunicacion.",
    sampleQuestion: "Here's what I need from you in the next 90 days. What do you need from me to make that happen? What would get in the way?",
    esSampleQuestion: "Esto es lo que necesito de ti en los proximos 90 dias. Que necesitas de mi para que eso suceda? Que podria interponerse?",
  },
  {
    name: "Resources",
    esName: "Recursos",
    description: "Audit what your team actually has to work with — staffing, tools, training, budget. Identify gaps before they become crises.",
    esDescription: "Audita lo que tu equipo realmente tiene para trabajar — personal, herramientas, capacitacion, presupuesto. Identifica brechas antes de que se conviertan en crisis.",
    sampleQuestion: "What resources do you wish you had that would make your work easier or more effective? Where do you feel under-supported?",
    esSampleQuestion: "Que recursos desearias tener que harian tu trabajo mas facil o efectivo? Donde sientes que tienes poco apoyo?",
  },
  {
    name: "Style",
    esName: "Estilo",
    description: "Learn how each team member works best — communication preferences, feedback style, work patterns. Share your own style transparently.",
    esDescription: "Aprende como trabaja mejor cada miembro del equipo — preferencias de comunicacion, estilo de retroalimentacion, patrones de trabajo. Comparte tu propio estilo transparentemente.",
    sampleQuestion: "How do you prefer to receive feedback — privately, in the moment, or during scheduled check-ins? What's the best way for me to communicate urgent changes?",
    esSampleQuestion: "Como prefieres recibir retroalimentacion — en privado, en el momento, o durante reuniones programadas? Cual es la mejor manera para que yo comunique cambios urgentes?",
  },
  {
    name: "Development",
    esName: "Desarrollo",
    description: "Understand each team member's career aspirations. Show them you're invested in their growth — not just their output.",
    esDescription: "Entiende las aspiraciones profesionales de cada miembro del equipo. Muestrales que estas invertido en su crecimiento — no solo en su rendimiento.",
    sampleQuestion: "Where do you want to be in your career 2 years from now? What skills are you most eager to develop? How can I support that growth?",
    esSampleQuestion: "Donde quieres estar en tu carrera en 2 anos? Que habilidades tienes mas ganas de desarrollar? Como puedo apoyar ese crecimiento?",
  },
];

/* --- Team FOGLAMP (Manager Version) -------------------------------- */
/* Manager-perspective checklist for assessing team readiness          */

export const TEAM_FOGLAMP: FOGLAMPItem[] = [
  { letter: "F", label: "Figure Out", esLabel: "Descubrir", action: "What do I need to learn about this team's history, strengths, and pain points before making changes?", esAction: "Que necesito aprender sobre la historia, fortalezas y puntos de dolor de este equipo antes de hacer cambios?" },
  { letter: "O", label: "Objectives", esLabel: "Objetivos", action: "What are my team's key goals for the next 30/60/90 days? Are they aligned with what my supervisor expects?", esAction: "Cuales son las metas clave de mi equipo para los proximos 30/60/90 dias? Estan alineadas con lo que mi supervisor espera?" },
  { letter: "G", label: "Gaps", esLabel: "Brechas", action: "Where are the skill gaps, role vacancies, and process weaknesses on my team?", esAction: "Donde estan las brechas de habilidades, vacantes de roles y debilidades de proceso en mi equipo?" },
  { letter: "L", label: "Leadership", esLabel: "Liderazgo", action: "What leadership style does this team need from me right now? (Directive, coaching, supportive, delegating?)", esAction: "Que estilo de liderazgo necesita este equipo de mi ahora mismo? (Directivo, coaching, apoyo, delegacion?)" },
  { letter: "A", label: "Allies", esLabel: "Aliados", action: "Who are my key allies on this team and across the organization? Who are the informal leaders I need to win over?", esAction: "Quienes son mis aliados clave en este equipo y en toda la organizacion? Quienes son los lideres informales que necesito ganar?" },
  { letter: "M", label: "Milestones", esLabel: "Hitos", action: "What measurable wins can my team achieve at 30, 60, and 90 days that build momentum and credibility?", esAction: "Que logros medibles puede alcanzar mi equipo a los 30, 60 y 90 dias que construyan impulso y credibilidad?" },
  { letter: "P", label: "Plan", esLabel: "Plan", action: "What's my week-by-week plan for the first month as this team's leader?", esAction: "Cual es mi plan semana a semana para el primer mes como lider de este equipo?" },
];

/* --- Exports ------------------------------------------------------- */

export { STARS_LABELS, FIVE_CONVERSATIONS, FOGLAMP };
