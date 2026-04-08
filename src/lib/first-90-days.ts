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

  hr_manager: {
    roleName: "HR Manager",
    esRoleName: "Gerente de Recursos Humanos",
    days1to30: [
      { text: "Review the org chart, staffing ratios, and vacancy report — identify critical open positions across all sites", esText: "Revisa el organigrama, proporciones de personal e informe de vacantes — identifica posiciones criticas abiertas en todos los sitios", domain: "execution" },
      { text: "Read all active union contracts (SEIU, NUHW) — understand grievance procedures, step increases, and seniority rules", esText: "Lee todos los contratos sindicales activos (SEIU, NUHW) — entiende procedimientos de quejas, aumentos escalonados y reglas de antiguedad", domain: "execution" },
      { text: "Meet department heads at each site to understand their staffing needs and retention challenges", esText: "Reune con los jefes de departamento de cada sitio para entender sus necesidades de personal y desafios de retencion", domain: "people" },
      { text: "Audit SB 525 compliance: verify all staff meet current minimum wage tiers and document the next increase timeline", esText: "Audita el cumplimiento de SB 525: verifica que todo el personal cumpla con los niveles actuales de salario minimo y documenta el cronograma del proximo aumento", domain: "execution" },
      { text: "Schedule your Five Conversations with the CEO/COO to align on workforce priorities and budget constraints", esText: "Programa tus Cinco Conversaciones con el CEO/COO para alinear prioridades de fuerza laboral y restricciones presupuestarias", domain: "general" },
    ],
    days31to60: [
      { text: "Build a recruiting pipeline for hard-to-fill roles — partner with local colleges, CHW training programs, and community organizations", esText: "Construye un canal de reclutamiento para roles dificiles de llenar — asociate con universidades locales, programas de capacitacion de CHW y organizaciones comunitarias", domain: "execution" },
      { text: "Conduct a compensation benchmarking analysis using FQHC salary data — identify roles at risk of attrition", esText: "Realiza un analisis comparativo de compensacion usando datos salariales de FQHC — identifica roles en riesgo de desgaste", domain: "execution" },
      { text: "Establish regular check-ins with union stewards to build a collaborative (not adversarial) working relationship", esText: "Establece reuniones regulares con delegados sindicales para construir una relacion de trabajo colaborativa (no adversarial)", domain: "people" },
      { text: "Review and update the employee handbook for compliance with current CA labor law and FQHC-specific policies", esText: "Revisa y actualiza el manual del empleado para cumplimiento con la ley laboral actual de CA y politicas especificas de FQHC", domain: "execution" },
      { text: "Attend a CalAIM workforce development webinar to understand upcoming credentialing requirements", esText: "Asiste a un seminario web de desarrollo de fuerza laboral CalAIM para entender los proximos requisitos de acreditacion", domain: "growth" },
    ],
    days61to90: [
      { text: "Launch a structured retention program — stay interviews, career pathway discussions, and exit interview improvements", esText: "Lanza un programa de retencion estructurado — entrevistas de permanencia, discusiones de trayectoria profesional y mejoras en entrevistas de salida", domain: "mission" },
      { text: "Present a workforce analytics report to leadership: turnover rates, cost-per-hire, time-to-fill, and diversity metrics", esText: "Presenta un informe de analitica de fuerza laboral al liderazgo: tasas de rotacion, costo por contratacion, tiempo de llenado y metricas de diversidad", domain: "execution" },
      { text: "Propose an NHSC loan repayment partnership or tuition assistance program to attract clinical staff", esText: "Propone una asociacion de reembolso de prestamos NHSC o programa de asistencia de matricula para atraer personal clinico", domain: "growth" },
      { text: "Create a 6-month HR strategic plan aligned with the FQHC's operational and growth priorities", esText: "Crea un plan estrategico de RH de 6 meses alineado con las prioridades operativas y de crecimiento del FQHC", domain: "growth" },
      { text: "Train supervisors on progressive discipline, documentation, and performance improvement plans", esText: "Capacita a los supervisores en disciplina progresiva, documentacion y planes de mejora del desempeno", domain: "people" },
    ],
    milestone30: { text: "You understand the org structure, union contracts, SB 525 status, and have met all department leaders", esText: "Entiendes la estructura organizacional, contratos sindicales, estado de SB 525 y has conocido a todos los lideres de departamento" },
    milestone60: { text: "Recruiting pipeline active, compensation analysis complete, and employee handbook updated", esText: "Canal de reclutamiento activo, analisis de compensacion completo y manual del empleado actualizado" },
    milestone90: { text: "Retention program launched, workforce analytics presented to leadership, and 6-month HR plan created", esText: "Programa de retencion lanzado, analitica de fuerza laboral presentada al liderazgo y plan de RH de 6 meses creado" },
  },

  accountant: {
    roleName: "Accountant",
    esRoleName: "Contador(a)",
    days1to30: [
      { text: "Learn the FQHC's chart of accounts, fund structure, and accounting software (QuickBooks, Sage, MIP, etc.)", esText: "Aprende el catalogo de cuentas del FQHC, estructura de fondos y software contable (QuickBooks, Sage, MIP, etc.)", domain: "execution" },
      { text: "Review PPS cost reporting methodology — understand how visit rates, costs, and wrap payments are calculated", esText: "Revisa la metodologia de reporte de costos PPS — entiende como se calculan tarifas de visitas, costos y pagos complementarios", domain: "execution" },
      { text: "Meet the Finance Manager, billing team, and grants manager to understand the revenue cycle end-to-end", esText: "Reune con el Gerente de Finanzas, equipo de facturacion y gerente de subvenciones para entender el ciclo de ingresos de principio a fin", domain: "people" },
      { text: "Review all active grants (HRSA Section 330, state, private) — understand reporting deadlines and allowable costs", esText: "Revisa todas las subvenciones activas (HRSA Seccion 330, estatales, privadas) — entiende plazos de informes y costos permitidos", domain: "execution" },
      { text: "Schedule your Five Conversations with the Finance Manager to align on priorities and month-end close expectations", esText: "Programa tus Cinco Conversaciones con el Gerente de Finanzas para alinear prioridades y expectativas de cierre de mes", domain: "general" },
    ],
    days31to60: [
      { text: "Begin processing AP/AR independently — ensure proper coding to grant-funded vs. operating accounts", esText: "Comienza a procesar cuentas por pagar/cobrar independientemente — asegura la codificacion correcta entre cuentas financiadas por subvenciones vs. operativas", domain: "execution" },
      { text: "Prepare your first grant expenditure report using the correct OMB Uniform Guidance cost allocation methods", esText: "Prepara tu primer informe de gastos de subvencion usando los metodos correctos de asignacion de costos de la Guia Uniforme OMB", domain: "execution" },
      { text: "Learn 340B Drug Pricing Program accounting — track pharmacy purchases, rebates, and compliance requirements", esText: "Aprende la contabilidad del Programa 340B — rastrea compras de farmacia, reembolsos y requisitos de cumplimiento", domain: "growth" },
      { text: "Collaborate with the billing team on monthly revenue reconciliation between claims data and general ledger", esText: "Colabora con el equipo de facturacion en la reconciliacion mensual de ingresos entre datos de reclamos y libro mayor", domain: "people" },
      { text: "Document all month-end close procedures you learn — create a personal procedures manual", esText: "Documenta todos los procedimientos de cierre de mes que aprendas — crea un manual de procedimientos personal", domain: "execution" },
    ],
    days61to90: [
      { text: "Handle full month-end close responsibilities with accurate, timely financial statements", esText: "Maneja las responsabilidades completas de cierre de mes con estados financieros precisos y oportunos", domain: "execution" },
      { text: "Prepare supporting schedules for the annual financial audit — organize PPS cost report workpapers", esText: "Prepara cedulas de soporte para la auditoria financiera anual — organiza papeles de trabajo del reporte de costos PPS", domain: "execution" },
      { text: "Identify a process improvement in the accounting workflow and present it to the Finance Manager", esText: "Identifica una mejora de proceso en el flujo de trabajo contable y presentala al Gerente de Finanzas", domain: "growth" },
      { text: "Create a grant compliance calendar tracking all federal and state reporting deadlines", esText: "Crea un calendario de cumplimiento de subvenciones rastreando todos los plazos de informes federales y estatales", domain: "mission" },
      { text: "Begin studying for CPA or CGFM certification to advance in FQHC finance", esText: "Comienza a estudiar para la certificacion CPA o CGFM para avanzar en finanzas de FQHC", domain: "growth" },
    ],
    milestone30: { text: "You understand the chart of accounts, PPS cost reporting basics, and have mapped all active grants", esText: "Entiendes el catalogo de cuentas, basicos de reporte de costos PPS y has mapeado todas las subvenciones activas" },
    milestone60: { text: "Processing AP/AR independently, 340B accounting started, and month-end close procedures documented", esText: "Procesando cuentas por pagar/cobrar independientemente, contabilidad 340B iniciada y procedimientos de cierre de mes documentados" },
    milestone90: { text: "Full month-end close responsibility, audit prep underway, and grant compliance calendar created", esText: "Responsabilidad completa de cierre de mes, preparacion de auditoria en curso y calendario de cumplimiento de subvenciones creado" },
  },

  payroll_specialist: {
    roleName: "Payroll Specialist",
    esRoleName: "Especialista en Nomina",
    days1to30: [
      { text: "Audit the current payroll setup: systems (ADP, Paychex, Paycom), pay schedules, and multi-site configurations", esText: "Audita la configuracion actual de nomina: sistemas (ADP, Paychex, Paycom), calendarios de pago y configuraciones multi-sitio", domain: "execution" },
      { text: "Review all union contracts for pay scales, step increases, shift differentials, and overtime provisions", esText: "Revisa todos los contratos sindicales para escalas de pago, aumentos escalonados, diferenciales de turno y provisiones de tiempo extra", domain: "execution" },
      { text: "Meet site managers and department heads to understand unique payroll situations (per diem staff, grant-funded positions, locum providers)", esText: "Reune con gerentes de sitio y jefes de departamento para entender situaciones unicas de nomina (personal per diem, posiciones financiadas por subvenciones, proveedores locum)", domain: "people" },
      { text: "Verify SB 525 compliance across all sites — document current wage tiers and upcoming increase dates by FQHC classification", esText: "Verifica el cumplimiento de SB 525 en todos los sitios — documenta los niveles salariales actuales y fechas de proximo aumento por clasificacion FQHC", domain: "execution" },
      { text: "Schedule your Five Conversations with the Finance Manager/CFO to understand payroll accuracy and compliance expectations", esText: "Programa tus Cinco Conversaciones con el Gerente de Finanzas/CFO para entender expectativas de precision y cumplimiento de nomina", domain: "general" },
    ],
    days31to60: [
      { text: "Process payroll independently for at least one pay cycle across all sites — aim for 100% accuracy", esText: "Procesa nomina independientemente para al menos un ciclo de pago en todos los sitios — apunta a 100% de precision", domain: "execution" },
      { text: "Build a payroll exceptions tracker: garnishments, tax levies, benefit deductions, and retroactive adjustments", esText: "Construye un rastreador de excepciones de nomina: embargos, gravamenes fiscales, deducciones de beneficios y ajustes retroactivos", domain: "execution" },
      { text: "Establish a clear communication process with HR for new hires, terminations, status changes, and leave tracking", esText: "Establece un proceso de comunicacion claro con RH para nuevas contrataciones, terminaciones, cambios de estado y rastreo de permisos", domain: "people" },
      { text: "Learn CA-specific payroll requirements: meal/rest break premiums, reporting time pay, final pay deadlines", esText: "Aprende los requisitos especificos de nomina de CA: premios de descanso/comida, pago de tiempo de reporte, plazos de pago final", domain: "growth" },
      { text: "Cross-reference payroll tax filings and W-2 preparation procedures for multi-site compliance", esText: "Cruza las declaraciones de impuestos de nomina y procedimientos de preparacion de W-2 para cumplimiento multi-sitio", domain: "execution" },
    ],
    days61to90: [
      { text: "Handle full multi-site payroll independently with consistent 100% accuracy and on-time processing", esText: "Maneja la nomina completa multi-sitio independientemente con 100% de precision consistente y procesamiento a tiempo", domain: "execution" },
      { text: "Implement proactive SB 525 wage increase tracking — create an automated calendar for upcoming tier changes", esText: "Implementa rastreo proactivo de aumentos salariales SB 525 — crea un calendario automatizado para proximos cambios de nivel", domain: "growth" },
      { text: "Create a payroll procedures manual documenting all multi-site processes, exceptions, and CA compliance requirements", esText: "Crea un manual de procedimientos de nomina documentando todos los procesos multi-sitio, excepciones y requisitos de cumplimiento de CA", domain: "execution" },
      { text: "Present payroll cost analysis to leadership — labor costs by department, overtime trends, benefit utilization", esText: "Presenta analisis de costos de nomina al liderazgo — costos laborales por departamento, tendencias de tiempo extra, utilizacion de beneficios", domain: "mission" },
      { text: "Identify one payroll process automation opportunity and propose implementation", esText: "Identifica una oportunidad de automatizacion de proceso de nomina y propone implementacion", domain: "growth" },
    ],
    milestone30: { text: "You understand the payroll system, union pay scales, SB 525 status, and multi-site configurations", esText: "Entiendes el sistema de nomina, escalas de pago sindicales, estado de SB 525 y configuraciones multi-sitio" },
    milestone60: { text: "Processing payroll independently with 100% accuracy and CA compliance procedures documented", esText: "Procesando nomina independientemente con 100% de precision y procedimientos de cumplimiento de CA documentados" },
    milestone90: { text: "Full multi-site payroll ownership, procedures manual created, and payroll cost analysis presented", esText: "Propiedad completa de nomina multi-sitio, manual de procedimientos creado y analisis de costos de nomina presentado" },
  },

  finance_manager: {
    roleName: "Finance Manager",
    esRoleName: "Gerente de Finanzas",
    days1to30: [
      { text: "Conduct a comprehensive financial assessment: cash position, AR aging, payer mix, grant pipeline, and debt obligations", esText: "Realiza una evaluacion financiera integral: posicion de caja, envejecimiento de cuentas por cobrar, mezcla de pagadores, cartera de subvenciones y obligaciones de deuda", domain: "execution" },
      { text: "Review the current budget vs. actuals — identify variances and understand the drivers behind each", esText: "Revisa el presupuesto actual vs. reales — identifica variaciones y entiende los impulsores detras de cada una", domain: "execution" },
      { text: "Meet the CEO, COO, Board Treasurer, and each department head to understand financial priorities and pain points", esText: "Reune con el CEO, COO, Tesorero de la Junta y cada jefe de departamento para entender prioridades financieras y puntos de dolor", domain: "people" },
      { text: "Understand the FQHC's revenue sources: PPS rates, Medi-Cal managed care contracts, Medicare, 340B, grants, and sliding fee", esText: "Entiende las fuentes de ingresos del FQHC: tarifas PPS, contratos de atencion administrada de Medi-Cal, Medicare, 340B, subvenciones y tarifa deslizante", domain: "execution" },
      { text: "Schedule your Five Conversations with the CEO to align on board reporting expectations and strategic financial goals", esText: "Programa tus Cinco Conversaciones con el CEO para alinear expectativas de informes a la junta y metas financieras estrategicas", domain: "general" },
    ],
    days31to60: [
      { text: "Build a 12-month cash flow projection incorporating Medi-Cal reimbursement delays (60-90+ days) and grant draw schedules", esText: "Construye una proyeccion de flujo de caja de 12 meses incorporando retrasos de reembolso de Medi-Cal (60-90+ dias) y calendarios de disposicion de subvenciones", domain: "execution" },
      { text: "Reforecast the current-year budget based on actual revenue trends and emerging risks (funding cuts, payer changes)", esText: "Reajusta el presupuesto del ano actual basado en tendencias reales de ingresos y riesgos emergentes (recortes de financiamiento, cambios de pagadores)", domain: "execution" },
      { text: "Develop a financial dashboard for the board: key metrics, trend lines, and risk indicators in plain language", esText: "Desarrolla un tablero financiero para la junta: metricas clave, lineas de tendencia e indicadores de riesgo en lenguaje sencillo", domain: "people" },
      { text: "Model CalAIM revenue opportunities: ECM, Community Supports, and Population Health Management incentives", esText: "Modela oportunidades de ingresos CalAIM: ECM, Apoyos Comunitarios e incentivos de Gestion de Salud Poblacional", domain: "growth" },
      { text: "Assess HRSA Operational Site Visit financial compliance readiness — identify gaps before the next review", esText: "Evalua la preparacion de cumplimiento financiero para la Visita Operativa de Sitio HRSA — identifica brechas antes de la proxima revision", domain: "execution" },
    ],
    days61to90: [
      { text: "Present your first board financial report: clear narrative, key metrics, risk assessment, and strategic recommendations", esText: "Presenta tu primer informe financiero a la junta: narrativa clara, metricas clave, evaluacion de riesgos y recomendaciones estrategicas", domain: "execution" },
      { text: "Develop a revenue diversification strategy — reduce dependence on any single payer source below 60%", esText: "Desarrolla una estrategia de diversificacion de ingresos — reduce la dependencia de cualquier fuente de pagador unico por debajo del 60%", domain: "growth" },
      { text: "Create a 3-year financial strategic plan aligned with the FQHC's growth objectives and capital needs", esText: "Crea un plan financiero estrategico de 3 anos alineado con los objetivos de crecimiento y necesidades de capital del FQHC", domain: "mission" },
      { text: "Train department heads on budget management: reading reports, managing variances, and submitting forecasts", esText: "Capacita a los jefes de departamento en gestion presupuestaria: lectura de informes, gestion de variaciones y envio de pronosticos", domain: "people" },
      { text: "Implement monthly financial close procedures with 10-day turnaround for leadership reporting", esText: "Implementa procedimientos de cierre financiero mensual con tiempo de entrega de 10 dias para informes al liderazgo", domain: "execution" },
    ],
    milestone30: { text: "You have a complete financial picture: cash position, payer mix, grant portfolio, and budget variance analysis", esText: "Tienes una imagen financiera completa: posicion de caja, mezcla de pagadores, cartera de subvenciones y analisis de variacion presupuestaria" },
    milestone60: { text: "Cash flow projection built, budget reforecasted, board dashboard designed, and CalAIM revenue modeled", esText: "Proyeccion de flujo de caja construida, presupuesto reajustado, tablero de junta disenado y ingresos CalAIM modelados" },
    milestone90: { text: "First board report delivered, revenue diversification strategy proposed, and 3-year financial plan created", esText: "Primer informe a la junta entregado, estrategia de diversificacion de ingresos propuesta y plan financiero de 3 anos creado" },
  },

  dental_assistant: {
    roleName: "Dental Assistant",
    esRoleName: "Asistente Dental",
    days1to30: [
      { text: "Complete infection control orientation: sterilization protocols, instrument processing, PPE standards, and OSHA requirements specific to your FQHC dental clinic", esText: "Completa orientacion de control de infecciones: protocolos de esterilizacion, procesamiento de instrumentos, estandares de EPP y requisitos de OSHA especificos de tu clinica dental FQHC", domain: "execution" },
      { text: "Learn the dental EHR system (Dentrix, Eaglesoft, or Curve Dental) — charting, scheduling, treatment plan entry, and Denti-Cal documentation requirements", esText: "Aprende el sistema EHR dental (Dentrix, Eaglesoft o Curve Dental) — charting, programacion, entrada de planes de tratamiento y requisitos de documentacion Denti-Cal", domain: "execution" },
      { text: "Shadow each provider to learn their chair-side preferences: instrument passing sequences, material preferences, and communication style with patients", esText: "Observa a cada proveedor para aprender sus preferencias chairside: secuencias de pase de instrumentos, preferencias de materiales y estilo de comunicacion con pacientes", domain: "people" },
      { text: "Understand the patient population: many FQHC dental patients have deferred care for years due to cost, fear, or immigration status — learn trauma-informed approaches", esText: "Comprende la poblacion de pacientes: muchos pacientes dentales de FQHC han postergado atencion por anos debido al costo, miedo o estatus migratorio — aprende enfoques informados por trauma", domain: "mission" },
      { text: "Schedule your Five Conversations with the Lead DA or Dental Director to understand team expectations and clinic flow", esText: "Programa tus Cinco Conversaciones con el DA lider o Director Dental para entender las expectativas del equipo y el flujo de la clinica", domain: "general" },
    ],
    days31to60: [
      { text: "Assist chair-side independently for routine procedures: prophylaxis, restorations, and extractions — aim for smooth operatory turnover between patients", esText: "Asiste chairside independientemente para procedimientos rutinarios: profilaxis, restauraciones y extracciones — apunta a un cambio fluido de consultorio entre pacientes", domain: "execution" },
      { text: "Take and process dental radiographs independently (requires CA Radiation Safety Certificate) — learn exposure settings for different patient types", esText: "Toma y procesa radiografias dentales independientemente (requiere Certificado de Seguridad de Radiacion de CA) — aprende configuraciones de exposicion para diferentes tipos de pacientes", domain: "execution" },
      { text: "Build rapport with returning patients — learn their names, remember their concerns, and practice anxiety-reduction techniques for fearful patients", esText: "Construye rapport con pacientes recurrentes — aprende sus nombres, recuerda sus preocupaciones y practica tecnicas de reduccion de ansiedad para pacientes temerosos", domain: "people" },
      { text: "Learn Denti-Cal documentation requirements: what must be charted for each procedure, prior authorization triggers, and common denial reasons", esText: "Aprende requisitos de documentacion Denti-Cal: que debe documentarse para cada procedimiento, desencadenantes de autorizacion previa y razones comunes de denegacion", domain: "growth" },
      { text: "Manage dental supply inventory for your operatory — track usage, flag low stock, and understand ordering procedures", esText: "Gestiona inventario de suministros dentales para tu consultorio — rastrea uso, marca stock bajo y entiende procedimientos de pedido", domain: "execution" },
    ],
    days61to90: [
      { text: "Handle full daily operatory setup, chair-side assistance, breakdown, and sterilization cycle independently with zero lapses in infection control", esText: "Maneja configuracion completa diaria del consultorio, asistencia chairside, desmontaje y ciclo de esterilizacion independientemente con cero fallas en control de infecciones", domain: "execution" },
      { text: "Support 14-18 patients per provider per day with efficient operatory turnover — you are a key bottleneck or accelerator for clinic throughput", esText: "Apoya 14-18 pacientes por proveedor por dia con cambio eficiente de consultorio — eres un cuello de botella o acelerador clave para el rendimiento de la clinica", domain: "execution" },
      { text: "Begin pursuing RDA licensure if not already certified — discuss exam prep support and study stipends with your supervisor", esText: "Comienza a buscar la licencia RDA si aun no estas certificado — discute apoyo para preparacion del examen y estipendios de estudio con tu supervisor", domain: "growth" },
      { text: "Connect your daily work to the bigger picture: FQHC dental programs prevent ER visits, catch early signs of diabetes and hypertension, and reduce pain that keeps patients from working", esText: "Conecta tu trabajo diario con la imagen mas grande: los programas dentales de FQHC previenen visitas a urgencias, detectan signos tempranos de diabetes e hipertension, y reducen el dolor que impide que los pacientes trabajen", domain: "mission" },
      { text: "Identify one workflow improvement opportunity — operatory setup efficiency, supply management, or patient flow — and propose it to the Dental Director", esText: "Identifica una oportunidad de mejora en el flujo de trabajo — eficiencia de configuracion de consultorio, gestion de suministros o flujo de pacientes — y proponla al Director Dental", domain: "growth" },
    ],
    milestone30: { text: "You know infection control protocols, the dental EHR, each provider's preferences, and understand the patient population", esText: "Conoces los protocolos de control de infecciones, el EHR dental, las preferencias de cada proveedor y comprendes la poblacion de pacientes" },
    milestone60: { text: "Assisting chair-side independently, taking radiographs, managing supply inventory, and learning Denti-Cal documentation", esText: "Asistiendo chairside independientemente, tomando radiografias, gestionando inventario de suministros y aprendiendo documentacion Denti-Cal" },
    milestone90: { text: "Full operatory ownership with efficient patient throughput, RDA licensure path started, and one workflow improvement proposed", esText: "Propiedad completa del consultorio con rendimiento eficiente de pacientes, camino a licencia RDA iniciado y una mejora de flujo de trabajo propuesta" },
  },

  dental_hygienist: {
    roleName: "Dental Hygienist",
    esRoleName: "Higienista Dental",
    days1to30: [
      { text: "Learn the clinic's periodontal assessment protocols: probing standards, documentation requirements, and when to refer for SRP vs. prophylaxis", esText: "Aprende los protocolos de evaluacion periodontal de la clinica: estandares de sondaje, requisitos de documentacion y cuando referir para SRP vs. profilaxis", domain: "execution" },
      { text: "Master Denti-Cal billing codes for hygiene services (D1110, D1120, D4341, D4342, D1351) — understand frequency limitations and prior authorization requirements", esText: "Domina los codigos de facturacion Denti-Cal para servicios de higiene (D1110, D1120, D4341, D4342, D1351) — comprende limitaciones de frecuencia y requisitos de autorizacion previa", domain: "execution" },
      { text: "Meet the medical care team — FQHCs integrate dental with primary care, so understand referral pathways for patients showing oral signs of diabetes, hypertension, or oral cancer", esText: "Conoce al equipo de atencion medica — los FQHCs integran dental con atencion primaria, asi que comprende las vias de referencia para pacientes con signos orales de diabetes, hipertension o cancer oral", domain: "people" },
      { text: "Understand the patient population: many have never had regular dental care. Learn trauma-informed approaches and how to adapt hygiene appointments for high-anxiety patients", esText: "Comprende la poblacion de pacientes: muchos nunca han tenido atencion dental regular. Aprende enfoques informados por trauma y como adaptar citas de higiene para pacientes con alta ansiedad", domain: "mission" },
      { text: "Schedule your Five Conversations with the Dental Director to align on clinical expectations, recall program structure, and patient volume targets", esText: "Programa tus Cinco Conversaciones con el Director Dental para alinear expectativas clinicas, estructura del programa de seguimiento y metas de volumen de pacientes", domain: "general" },
    ],
    days31to60: [
      { text: "Manage your own patient schedule independently — full periodontal assessments, scaling/root planing, prophylaxis, sealants, and fluoride applications at target volume", esText: "Gestiona tu propio horario de pacientes independientemente — evaluaciones periodontales completas, raspado/alisado radicular, profilaxis, selladores y aplicaciones de fluor al volumen objetivo", domain: "execution" },
      { text: "Implement motivational interviewing techniques for oral hygiene education — MI-based instruction drives significantly better behavior change than traditional models", esText: "Implementa tecnicas de entrevista motivacional para educacion de higiene oral — la instruccion basada en MI genera un cambio de comportamiento significativamente mejor que los modelos tradicionales", domain: "people" },
      { text: "Build the pediatric hygiene component: sealant placement, fluoride varnish for under-6, early childhood caries screening, and age-appropriate oral hygiene instruction", esText: "Construye el componente de higiene pediatrica: colocacion de selladores, barniz de fluor para menores de 6, deteccion de caries de primera infancia e instruccion de higiene oral apropiada para la edad", domain: "growth" },
      { text: "Document accurately for Denti-Cal reimbursement — review your charts for completeness, correct coding, and clinical justification for SRP procedures", esText: "Documenta con precision para reembolso Denti-Cal — revisa tus graficos para completitud, codificacion correcta y justificacion clinica para procedimientos SRP", domain: "execution" },
      { text: "Coordinate with dental assistants on patient flow — your recall patients, new patient assessments, and same-day urgent appointments need smooth handoffs", esText: "Coordina con asistentes dentales en el flujo de pacientes — tus pacientes de seguimiento, evaluaciones de nuevos pacientes y citas urgentes del mismo dia necesitan transferencias fluidas", domain: "people" },
    ],
    days61to90: [
      { text: "Hit full productivity targets: complete periodontal assessments, SRP, and recall appointments at expected volume with accurate Denti-Cal documentation", esText: "Alcanza metas completas de productividad: evaluaciones periodontales completas, SRP y citas de seguimiento al volumen esperado con documentacion Denti-Cal precisa", domain: "execution" },
      { text: "Launch or strengthen the recall program — track patient recall compliance rates and implement follow-up strategies for patients overdue for hygiene appointments", esText: "Lanza o fortalece el programa de seguimiento — rastrea tasas de cumplimiento de seguimiento de pacientes e implementa estrategias de seguimiento para pacientes atrasados en citas de higiene", domain: "growth" },
      { text: "Pursue tobacco cessation counseling certification — it's reimbursable under Denti-Cal and is a high-impact preventive service that sets FQHC hygienists apart", esText: "Obtén certificacion de consejeria de cesacion tabaquica — es reembolsable bajo Denti-Cal y es un servicio preventivo de alto impacto que distingue a higienistas de FQHC", domain: "growth" },
      { text: "Contribute to oral-systemic integration by flagging patients with periodontal disease for diabetes/cardiovascular risk screening referrals to the medical team", esText: "Contribuye a la integracion oral-sistemica identificando pacientes con enfermedad periodontal para referencias de deteccion de riesgo de diabetes/cardiovascular al equipo medico", domain: "mission" },
      { text: "Present a brief clinical case or quality improvement idea to the dental team — demonstrate leadership and clinical depth", esText: "Presenta un caso clinico breve o idea de mejora de calidad al equipo dental — demuestra liderazgo y profundidad clinica", domain: "growth" },
    ],
    milestone30: { text: "You know the periodontal protocols, Denti-Cal billing codes, referral pathways to medical, and patient population needs", esText: "Conoces los protocolos periodontales, codigos de facturacion Denti-Cal, vias de referencia a medicina y necesidades de la poblacion de pacientes" },
    milestone60: { text: "Managing your own schedule at target volume, MI techniques in practice, pediatric hygiene component active, and Denti-Cal documentation accurate", esText: "Gestionando tu propio horario al volumen objetivo, tecnicas MI en practica, componente de higiene pediatrica activo y documentacion Denti-Cal precisa" },
    milestone90: { text: "Full productivity, recall program strengthened, tobacco cessation certification started, and oral-systemic integration referrals active", esText: "Productividad completa, programa de seguimiento fortalecido, certificacion de cesacion tabaquica iniciada y referencias de integracion oral-sistemica activas" },
  },

  dentist: {
    roleName: "Dentist",
    esRoleName: "Dentista",
    days1to30: [
      { text: "Complete provider credentialing with Denti-Cal, Medi-Cal managed care plans, and any commercial payers — delays in credentialing directly delay revenue", esText: "Completa el credenciamiento de proveedor con Denti-Cal, planes de atencion administrada de Medi-Cal y cualquier pagador comercial — retrasos en credenciamiento retrasan directamente los ingresos", domain: "execution" },
      { text: "Learn the FQHC PPS dental billing model: encounter-based reimbursement, same-day medical-dental billing rules, and what qualifies as a billable dental visit", esText: "Aprende el modelo de facturacion dental PPS del FQHC: reembolso basado en encuentros, reglas de facturacion medica-dental del mismo dia y que califica como visita dental facturable", domain: "execution" },
      { text: "Meet the dental team (hygienists, DAs, front desk) and medical leadership — understand referral pathways between dental and primary care, behavioral health, and pediatrics", esText: "Conoce al equipo dental (higienistas, DAs, recepcion) y liderazgo medico — comprende vias de referencia entre dental y atencion primaria, salud conductual y pediatria", domain: "people" },
      { text: "Review clinical protocols: scope of services, referral criteria for oral surgery/ortho/peds specialties, emergency dental procedures, and infection control standards", esText: "Revisa protocolos clinicos: alcance de servicios, criterios de referencia para especialidades de cirugia oral/ortodoncia/pediatrica, procedimientos dentales de emergencia y estandares de control de infecciones", domain: "execution" },
      { text: "Schedule your Five Conversations with the Dental Director (or CEO if you are the dental lead) to align on clinical volume targets, quality metrics, and program development priorities", esText: "Programa tus Cinco Conversaciones con el Director Dental (o CEO si eres el lider dental) para alinear metas de volumen clinico, metricas de calidad y prioridades de desarrollo del programa", domain: "general" },
    ],
    days31to60: [
      { text: "Build your patient panel to target volume — full-scope general dentistry including restorations, extractions, and emergency treatment for patients who have deferred care for years", esText: "Construye tu panel de pacientes al volumen objetivo — odontologia general de alcance completo incluyendo restauraciones, extracciones y tratamiento de emergencia para pacientes que han postergado atencion por anos", domain: "execution" },
      { text: "Supervise expanded-duty dental assistants (EDDAs) and coordinate with hygienists — learn CA delegation rules for DA duties (coronal polishing, sealants) and understand RDH supervision requirements (hygienists administer local anesthesia under their own license)", esText: "Supervisa asistentes dentales de deberes ampliados (EDDAs) y coordina con higienistas — aprende las reglas de delegacion de CA para deberes de DA (pulido coronal, selladores) y comprende los requisitos de supervision de RDH (las higienistas administran anestesia local bajo su propia licencia)", domain: "people" },
      { text: "Master Denti-Cal prior authorization workflows — understand which procedures require pre-auth, documentation standards, and common denial reasons", esText: "Domina flujos de autorizacion previa Denti-Cal — comprende que procedimientos requieren pre-autorizacion, estandares de documentacion y razones comunes de denegacion", domain: "execution" },
      { text: "Begin integrating oral-systemic health screening: flag patients with periodontal disease for diabetes and cardiovascular risk, screen for oral cancer, and document findings for medical team", esText: "Comienza a integrar deteccion de salud oral-sistemica: identifica pacientes con enfermedad periodontal para riesgo de diabetes y cardiovascular, deteccion de cancer oral y documenta hallazgos para el equipo medico", domain: "mission" },
      { text: "Develop treatment planning protocols that account for Denti-Cal coverage limitations — patients need realistic phased treatment plans they can afford", esText: "Desarrolla protocolos de planificacion de tratamiento que consideren limitaciones de cobertura Denti-Cal — los pacientes necesitan planes de tratamiento por fases realistas que puedan pagar", domain: "growth" },
    ],
    days61to90: [
      { text: "Achieve full clinical productivity: target encounters per day with complete documentation, appropriate coding, and minimal Denti-Cal claim denials", esText: "Alcanza productividad clinica completa: encuentros objetivo por dia con documentacion completa, codificacion apropiada y minimas denegaciones de reclamos Denti-Cal", domain: "execution" },
      { text: "Establish referral relationships with oral surgery, orthodontics, and pediatric dentistry specialists for cases beyond your scope", esText: "Establece relaciones de referencia con especialistas en cirugia oral, ortodoncia y odontologia pediatrica para casos mas alla de tu alcance", domain: "people" },
      { text: "Lead a clinical case review or peer review session with the dental team — demonstrate clinical leadership and quality improvement focus", esText: "Lidera una revision de caso clinico o sesion de revision de pares con el equipo dental — demuestra liderazgo clinico y enfoque en mejora de calidad", domain: "growth" },
      { text: "If NHSC-eligible, complete the loan repayment application — up to $80K over 2 years at most FQHC sites in California", esText: "Si eres elegible para NHSC, completa la solicitud de pago de prestamos — hasta $80K en 2 anos en la mayoria de sitios FQHC en California", domain: "growth" },
      { text: "Propose one program development idea — expanded hours, pediatric dental day, school-based dental program, or Virtual Dental Home telehealth pilot", esText: "Propone una idea de desarrollo de programa — horarios extendidos, dia dental pediatrico, programa dental escolar o piloto de telesalud Virtual Dental Home", domain: "mission" },
    ],
    milestone30: { text: "Credentialing complete, PPS billing model understood, clinical protocols reviewed, and dental-medical referral pathways established", esText: "Credenciamiento completo, modelo de facturacion PPS comprendido, protocolos clinicos revisados y vias de referencia dental-medica establecidas" },
    milestone60: { text: "Patient panel building to target, Denti-Cal prior auth mastered, delegation/supervision active, and oral-systemic integration started", esText: "Panel de pacientes construyendose al objetivo, autorizacion previa Denti-Cal dominada, delegacion/supervision activa e integracion oral-sistemica iniciada" },
    milestone90: { text: "Full clinical productivity, specialist referral network established, peer review led, and one program development idea proposed", esText: "Productividad clinica completa, red de referencia de especialistas establecida, revision de pares liderada y una idea de desarrollo de programa propuesta" },
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
