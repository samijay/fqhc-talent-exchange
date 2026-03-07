/* ------------------------------------------------------------------ */
/*  Manager 90-Day Plan Generator                                       */
/*  Generates personalized 30/60/90 day leadership plans for the       */
/*  4 FQHC manager roles from Team Readiness Assessment results        */
/* ------------------------------------------------------------------ */

import type { PlanPhase, PlanItem, PhaseMilestone, ConversationPrompt, FOGLAMPItem, STARSType } from "./first-90-days";
import { MANAGER_FIVE_CONVERSATIONS, TEAM_FOGLAMP, STARS_LABELS } from "./first-90-days";
import type { LeadershipRoleId, ManagerAssessmentResults } from "./manager-assessment-engine";

/* --- Types --------------------------------------------------------- */

export interface Manager90DaysPlan {
  roleId: LeadershipRoleId;
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
  managerConversations: ConversationPrompt[];
  teamFoglamp: FOGLAMPItem[];
  coachingNote: string;
  esCoachingNote: string;
  keyResources: Array<{
    title: string;
    esTitle: string;
    url: string;
    description: string;
    esDescription: string;
  }>;
}

/* --- Role Plan Content Interface ----------------------------------- */

interface ManagerRolePlanContent {
  roleName: string;
  esRoleName: string;
  days1to30: PlanItem[];
  days31to60: PlanItem[];
  days61to90: PlanItem[];
  milestone30: PhaseMilestone;
  milestone60: PhaseMilestone;
  milestone90: PhaseMilestone;
  keyResources: Manager90DaysPlan["keyResources"];
}

/* --- STARS Coaching Notes ------------------------------------------ */

const STARS_COACHING_NOTES: Record<STARSType, { en: string; es: string }> = {
  startup: {
    en: "You're building something from scratch — structure, clarity, and early wins are your best tools. Document everything, define roles before day 30, and celebrate small milestones loudly. Your team needs to believe this will work.",
    es: "Estas construyendo algo desde cero — la estructura, claridad y logros tempranos son tus mejores herramientas. Documenta todo, define roles antes del dia 30, y celebra pequenos hitos en voz alta. Tu equipo necesita creer que esto funcionara.",
  },
  turnaround: {
    en: "Your team or program needs fixing — but diagnose before you prescribe. Spend your first 30 days listening more than acting. Identify the 1-2 root causes behind the problems (not just the symptoms), then move decisively on those. Quick wins matter here: find one thing you can fix fast to signal that change is real.",
    es: "Tu equipo o programa necesita mejoras — pero diagnostica antes de prescribir. Pasa tus primeros 30 dias escuchando mas que actuando. Identifica las 1-2 causas raiz detras de los problemas (no solo los sintomas), luego actua decisivamente. Los logros rapidos importan: encuentra algo que puedas arreglar rapido para senalar que el cambio es real.",
  },
  accelerated: {
    en: "Things are moving fast — your job is to build systems that scale without losing quality or burning out your team. Hire for culture fit and adaptability, not just skill. Delegate early and often. Document processes before they become chaos.",
    es: "Las cosas se mueven rapido — tu trabajo es construir sistemas que escalen sin perder calidad ni quemar a tu equipo. Contrata por ajuste cultural y adaptabilidad, no solo habilidad. Delega temprano y frecuentemente. Documenta procesos antes de que se conviertan en caos.",
  },
  realignment: {
    en: "Change is needed, but not everyone sees it yet. Your first job is building a coalition, not issuing directives. Use data to make the case for change, identify informal leaders who can help shift culture, and give people a way to participate in the solution. Patience in months 1-2 pays dividends in month 3.",
    es: "El cambio es necesario, pero no todos lo ven aun. Tu primer trabajo es construir una coalicion, no emitir directivas. Usa datos para argumentar a favor del cambio, identifica lideres informales que puedan ayudar a cambiar la cultura, y da a las personas una manera de participar en la solucion. La paciencia en los meses 1-2 rinde dividendos en el mes 3.",
  },
  sustaining: {
    en: "Things are working well — your biggest risk is disrupting what makes this team successful. Learn before you change. Identify the informal norms and relationships that hold the team together. Find ways to add value without undermining the existing culture. Look for evolution, not revolution.",
    es: "Las cosas van bien — tu mayor riesgo es interrumpir lo que hace exitoso a este equipo. Aprende antes de cambiar. Identifica las normas e relaciones informales que mantienen unido al equipo. Encuentra formas de agregar valor sin socavar la cultura existente. Busca evolucion, no revolucion.",
  },
};

/* --- Domain-Specific Growth Coaching Notes ------------------------- */

const DOMAIN_COACHING_ADDITIONS: Record<string, { en: string; es: string }> = {
  mission: {
    en: " Your growth edge is connecting your team to the mission during stress and change. Prioritize patient impact stories in your huddles, and make the mission visible in how you recognize good work.",
    es: " Tu area de crecimiento es conectar a tu equipo con la mision durante el estres y el cambio. Prioriza historias de impacto en pacientes en tus reuniones breves, y haz la mision visible en como reconoces el buen trabajo.",
  },
  people: {
    en: " Your growth edge is building psychological safety and navigating conflict constructively. Schedule 1:1s in your first week — listen before you lead. Use structured facilitation to ensure every voice is heard.",
    es: " Tu area de crecimiento es construir seguridad psicologica y navegar conflictos constructivamente. Programa 1:1s en tu primera semana — escucha antes de liderar. Usa facilitacion estructurada para asegurar que todas las voces sean escuchadas.",
  },
  execution: {
    en: " Your growth edge is creating clear priorities and managing performance proactively. Build a simple dashboard in your first 30 days and use it to drive accountability — what gets measured, gets managed.",
    es: " Tu area de crecimiento es crear prioridades claras y gestionar el rendimiento proactivamente. Construye un panel de control simple en tus primeros 30 dias y usalo para impulsar la responsabilidad — lo que se mide, se gestiona.",
  },
  growth: {
    en: " Your growth edge is investing in your team's development even when you're busy. Treat learning conversations as non-negotiable — one development-focused 1:1 per team member per month is the minimum.",
    es: " Tu area de crecimiento es invertir en el desarrollo de tu equipo incluso cuando estas ocupado. Trata las conversaciones de aprendizaje como no negociables — una 1:1 enfocada en desarrollo por miembro del equipo por mes es el minimo.",
  },
  transition: {
    en: " Your growth edge is diagnosing your team's situation before prescribing solutions. Use STARS to categorize each program and team member's situation, then match your leadership style to what each one actually needs.",
    es: " Tu area de crecimiento es diagnosticar la situacion de tu equipo antes de prescribir soluciones. Usa STARS para categorizar la situacion de cada programa y miembro del equipo, luego adapta tu estilo de liderazgo a lo que cada uno realmente necesita.",
  },
};

/* --- Role Plan Data ------------------------------------------------ */

const ROLE_PLANS: Record<LeadershipRoleId, ManagerRolePlanContent> = {

  /* ================================================================= */
  /*  PROGRAM MANAGER                                                    */
  /* ================================================================= */
  program_manager: {
    roleName: "Program Manager",
    esRoleName: "Gerente de Programa",

    days1to30: [
      {
        text: "Audit all program documentation: ECM authorizations, care plan templates, T2048 billing logs, quality reports — identify what exists and what's missing",
        esText: "Audita toda la documentacion del programa: autorizaciones de ECM, plantillas de planes de atencion, registros de facturacion T2048, informes de calidad — identifica que existe y que falta",
        domain: "execution",
      },
      {
        text: "Hold individual 1:1 meetings with every team member in week 1 — ask what's working, what's frustrating, and what they wish leadership understood about their workload",
        esText: "Realiza reuniones 1:1 individuales con cada miembro del equipo en la semana 1 — pregunta que funciona, que es frustrante y que desean que el liderazgo entendiera sobre su carga de trabajo",
        domain: "people",
      },
      {
        text: "Map all external stakeholders: DHCS contacts, Managed Care Organization (MCO) liaisons, partner community organizations, HRSA program officers — document names, roles, and relationship history",
        esText: "Mapea todos los actores externos: contactos de DHCS, enlaces de Organizaciones de Atencion Administrada (MCO), organizaciones comunitarias asociadas, oficiales de programa HRSA — documenta nombres, roles e historial de relaciones",
        domain: "mission",
      },
      {
        text: "Learn the ECM/CalAIM billing process end-to-end: how authorizations are requested, T2048 billing codes used, how claims are submitted to MCOs, and what causes denials",
        esText: "Aprende el proceso de facturacion ECM/CalAIM de principio a fin: como se solicitan autorizaciones, codigos de facturacion T2048 utilizados, como se envian reclamaciones a MCOs y que causa denegaciones",
        domain: "execution",
      },
      {
        text: "Review the last 3 quality reports and identify the top 3 documentation compliance gaps by staff member and by care plan type",
        esText: "Revisa los ultimos 3 informes de calidad e identifica las 3 principales brechas de cumplimiento de documentacion por miembro del personal y por tipo de plan de atencion",
        domain: "execution",
      },
      {
        text: "Attend care team rounds at least twice to observe patient handoffs, care plan updates, and how your team communicates with providers",
        esText: "Asiste a rondas del equipo de atencion al menos dos veces para observar transferencias de pacientes, actualizaciones de planes de atencion y como tu equipo se comunica con los proveedores",
        domain: "people",
      },
      {
        text: "Schedule your Five Conversations with both your supervisor and key stakeholders — align on what 90-day success looks like and what authority you have to make changes",
        esText: "Programa tus Cinco Conversaciones con tu supervisor y los principales actores — alinea en como se ve el exito a 90 dias y que autoridad tienes para hacer cambios",
        domain: "general",
      },
    ],

    days31to60: [
      {
        text: "Launch a weekly team huddle (15 minutes max): one patient success story, one compliance update, and one operational blocker — make it consistent and useful or staff will disengage",
        esText: "Lanza una reunion breve semanal del equipo (maximo 15 minutos): una historia de exito del paciente, una actualizacion de cumplimiento y un obstaculo operativo — hazlo consistente y util o el personal se desconectara",
        domain: "people",
      },
      {
        text: "Begin correcting the top 3 documentation compliance gaps identified in month 1 — coach individually, not in group settings, to avoid shame",
        esText: "Comienza a corregir las 3 principales brechas de cumplimiento de documentacion identificadas en el mes 1 — entrenar individualmente, no en entornos grupales, para evitar la verguenza",
        domain: "execution",
      },
      {
        text: "Build a program dashboard tracking at minimum: active enrollment count, monthly new enrollments, monthly disenrollments, and documentation compliance rate by staff member",
        esText: "Construye un panel de control del programa que rastree como minimo: numero de inscripciones activas, nuevas inscripciones mensuales, desinscripciones mensuales y tasa de cumplimiento de documentacion por miembro del personal",
        domain: "mission",
      },
      {
        text: "Establish primary MCO contacts at each Managed Care Organization your program bills through — schedule introductory calls and document their authorization approval timelines and documentation expectations",
        esText: "Establece contactos primarios de MCO en cada Organizacion de Atencion Administrada a traves de la cual factura tu programa — programa llamadas de presentacion y documenta sus plazos de aprobacion de autorizacion y expectativas de documentacion",
        domain: "mission",
      },
      {
        text: "Launch monthly complex case reviews with your team — use these to model good clinical documentation, identify coaching opportunities, and build team clinical confidence",
        esText: "Lanza revisiones mensuales de casos complejos con tu equipo — usalas para modelar buena documentacion clinica, identificar oportunidades de entrenamiento y construir confianza clinica del equipo",
        domain: "execution",
      },
      {
        text: "Deliver your first round of individual performance conversations — be specific about what each person is doing well and what needs to change, with timelines",
        esText: "Entrega tu primera ronda de conversaciones de rendimiento individual — se especifico sobre lo que cada persona esta haciendo bien y lo que necesita cambiar, con plazos",
        domain: "people",
      },
    ],

    days61to90: [
      {
        text: "Present program performance to organizational leadership: enrollment trajectory, documentation compliance improvement, MCO relationship status, and any revenue risks or opportunities",
        esText: "Presenta el rendimiento del programa al liderazgo organizacional: trayectoria de inscripcion, mejora en cumplimiento de documentacion, estado de relaciones con MCO y cualquier riesgo u oportunidad de ingresos",
        domain: "mission",
      },
      {
        text: "Propose 1-2 process improvements backed by data from your program dashboard — prioritize changes that reduce documentation burden while improving compliance",
        esText: "Propone 1-2 mejoras de proceso respaldadas por datos de tu panel de control del programa — prioriza cambios que reduzcan la carga de documentacion mientras mejoran el cumplimiento",
        domain: "execution",
      },
      {
        text: "Complete individual development plans for each team member — include specific training goals, certification pathways (CHW, CCM), and career conversations about their next step",
        esText: "Completa planes de desarrollo individuales para cada miembro del equipo — incluye metas de capacitacion especificas, rutas de certificacion (CHW, CCM) y conversaciones profesionales sobre su proximo paso",
        domain: "growth",
      },
      {
        text: "Build a 6-month program roadmap covering enrollment targets, staffing needs, quality improvement initiatives, and any grant renewal or MCO contract milestones",
        esText: "Construye una hoja de ruta del programa de 6 meses que cubra objetivos de inscripcion, necesidades de personal, iniciativas de mejora de calidad y cualquier hito de renovacion de subvencion o contrato con MCO",
        domain: "mission",
      },
      {
        text: "Assess your team's top 2 training needs and bring a concrete training plan with budget estimate to leadership for Q3/Q4 approval",
        esText: "Evalua las 2 principales necesidades de capacitacion de tu equipo y presenta a liderazgo un plan de capacitacion concreto con estimacion de presupuesto para aprobacion en Q3/Q4",
        domain: "growth",
      },
    ],

    milestone30: {
      text: "You know every team member by name and primary caseload type, understand the active enrollment count and billing workflow, and have identified the top 3 documentation compliance gaps",
      esText: "Conoces a cada miembro del equipo por nombre y tipo de carga de casos principal, entiendes el recuento de inscripciones activas y el flujo de trabajo de facturacion, y has identificado las 3 principales brechas de cumplimiento de documentacion",
    },
    milestone60: {
      text: "Program dashboard is live and reviewed weekly, documentation compliance is trending upward, MCO contacts are established, and weekly huddle is running consistently",
      esText: "El panel de control del programa esta activo y se revisa semanalmente, el cumplimiento de documentacion tiene tendencia ascendente, los contactos de MCO estan establecidos y la reunion breve semanal se ejecuta consistentemente",
    },
    milestone90: {
      text: "Performance report delivered to leadership, at least one data-backed process improvement proposed, individual development plans complete for all staff, and 6-month program roadmap built",
      esText: "Informe de rendimiento entregado al liderazgo, al menos una mejora de proceso respaldada por datos propuesta, planes de desarrollo individuales completos para todo el personal y hoja de ruta del programa de 6 meses construida",
    },

    keyResources: [
      {
        title: "FQHC Workplace Guides",
        esTitle: "Guias de Trabajo de FQHC",
        url: "/guides",
        description: "Step-by-step guides on ECM workflows, CalAIM implementation, and care coordination — operational must-reads for program managers",
        esDescription: "Guias paso a paso sobre flujos de trabajo de ECM, implementacion de CalAIM y coordinacion de atencion — lecturas operativas obligatorias para gerentes de programa",
      },
      {
        title: "OKR Templates for FQHC Managers",
        esTitle: "Plantillas OKR para Gerentes de FQHC",
        url: "/strategy/okrs",
        description: "12 crisis-tested OKR templates including workforce stability and program performance domains — set measurable goals for your first 90 days",
        esDescription: "12 plantillas OKR probadas en crisis que incluyen dominios de estabilidad de la fuerza laboral y rendimiento del programa — establece metas medibles para tus primeros 90 dias",
      },
      {
        title: "Executive Masterclass",
        esTitle: "Clase Magistral para Ejecutivos",
        url: "/strategy/masterclass",
        description: "Deep-dive modules on CalAIM implementation, ECM revenue recovery, and financial resilience — built specifically for FQHC program leaders",
        esDescription: "Modulos detallados sobre implementacion de CalAIM, recuperacion de ingresos de ECM y resiliencia financiera — construidos especificamente para lideres de programas de FQHC",
      },
      {
        title: "Scope of Practice Guide",
        esTitle: "Guia de Alcance de Practica",
        url: "/strategy/scope-of-practice",
        description: "CA scope-of-practice by role with delegation matrix — know what each team member (CHW, RN, LCSW) can do and how to deploy them top-of-license",
        esDescription: "Alcance de practica de CA por rol con matriz de delegacion — conoce lo que cada miembro del equipo (CHW, RN, LCSW) puede hacer y como desplegarlos al tope de su licencia",
      },
    ],
  },

  /* ================================================================= */
  /*  CLINICAL SUPERVISOR                                                */
  /* ================================================================= */
  clinical_supervisor: {
    roleName: "Clinical Supervisor",
    esRoleName: "Supervisor(a) Clínico/a",

    days1to30: [
      {
        text: "Shadow each direct report for at least half a day — observe clinical workflows, documentation habits, patient interactions, and where they struggle or shine",
        esText: "Acompana a cada subordinado directo al menos medio dia — observa flujos de trabajo clinicos, habitos de documentacion, interacciones con pacientes y donde tienen dificultades o destacan",
        domain: "people",
      },
      {
        text: "Review all active HR files for your direct reports: performance improvement plans, prior complaints, commendations, and documented clinical competencies",
        esText: "Revisa todos los archivos de RR.HH. activos de tus subordinados directos: planes de mejora del rendimiento, quejas previas, reconocimientos y competencias clinicas documentadas",
        domain: "execution",
      },
      {
        text: "Audit clinical protocols against HRSA and NACHC standards: SOAP note requirements, behavioral health documentation, care plan structure, and preventive care screening checklists",
        esText: "Audita los protocolos clinicos contra los estandares de HRSA y NACHC: requisitos de notas SOAP, documentacion de salud conductual, estructura del plan de atencion y listas de verificacion de deteccion de cuidados preventivos",
        domain: "execution",
      },
      {
        text: "Map scope-of-practice boundaries for each role on your team (RN, LVN, MA, LCSW, CHW) — identify top-of-license opportunities where staff are doing work below their certification level",
        esText: "Mapea los limites del alcance de practica para cada rol en tu equipo (RN, LVN, MA, LCSW, CHW) — identifica oportunidades al tope de la licencia donde el personal realiza trabajo por debajo de su nivel de certificacion",
        domain: "mission",
      },
      {
        text: "Meet with the QI coordinator to understand the current quality metrics baseline: UDS measures, HEDIS scores, preventive care gap rates, and any active corrective action plans",
        esText: "Reune con el coordinador de QI para entender la linea base de metricas de calidad actual: medidas UDS, puntajes HEDIS, tasas de brechas en atencion preventiva y cualquier plan de accion correctiva activo",
        domain: "mission",
      },
      {
        text: "Understand documentation expectations for each clinical role: SOAP note structure, behavioral health progress notes, MA pre-visit planning documentation, and how your EHR templates are configured",
        esText: "Entiende las expectativas de documentacion para cada rol clinico: estructura de notas SOAP, notas de progreso de salud conductual, documentacion de planificacion previa a la visita de MA y como estan configuradas las plantillas de tu EHR",
        domain: "execution",
      },
      {
        text: "Schedule your Five Conversations with your medical director to align on clinical standards, authority to update protocols, and how you'll handle clinical disagreements between staff",
        esText: "Programa tus Cinco Conversaciones con tu director medico para alinear en estandares clinicos, autoridad para actualizar protocolos y como manejaras los desacuerdos clinicos entre el personal",
        domain: "general",
      },
    ],

    days31to60: [
      {
        text: "Launch a weekly clinical huddle (15 minutes): one patient safety issue or near-miss, one quality metric update, one skills tip — keep it clinically grounded and brief",
        esText: "Lanza una reunion breve clinica semanal (15 minutos): un problema de seguridad del paciente o casi accidente, una actualizacion de metrica de calidad, un consejo de habilidades — mantenerlo clinicamente fundamentado y breve",
        domain: "people",
      },
      {
        text: "Implement a random chart audit process: review 10% of charts monthly per staff member, use a structured audit rubric, and provide written feedback within 5 business days",
        esText: "Implementa un proceso de auditoria de historiales aleatorio: revisa el 10% de historiales mensualmente por miembro del personal, usa una rubrica de auditoria estructurada y proporciona retroalimentacion escrita dentro de 5 dias habiles",
        domain: "execution",
      },
      {
        text: "Deliver your first round of performance feedback conversations for all direct reports — use the Situation-Behavior-Impact model and document what was discussed",
        esText: "Entrega tu primera ronda de conversaciones de retroalimentacion de rendimiento para todos los subordinados directos — usa el modelo Situacion-Comportamiento-Impacto y documenta lo que se discutio",
        domain: "people",
      },
      {
        text: "Begin coaching staff individually on documentation quality: sit with each person, review a chart together, and model how to write a complete, compliant note",
        esText: "Comienza a entrenar al personal individualmente en calidad de documentacion: siéntate con cada persona, revisa un historial juntos y modela como escribir una nota completa y conforme",
        domain: "growth",
      },
      {
        text: "Coordinate with the medical director to review and update at least one clinical protocol that you identified as outdated or non-compliant in your month 1 audit",
        esText: "Coordina con el director medico para revisar y actualizar al menos un protocolo clinico que identificaste como desactualizado o no conforme en tu auditoria del mes 1",
        domain: "execution",
      },
      {
        text: "Identify your team's most significant training gap and propose a solution — whether peer coaching, an external training, or a structured skills lab during a team meeting",
        esText: "Identifica la brecha de capacitacion mas significativa de tu equipo y propone una solucion — ya sea entrenamiento entre pares, capacitacion externa o un laboratorio de habilidades estructurado durante una reunion del equipo",
        domain: "growth",
      },
    ],

    days61to90: [
      {
        text: "Complete formal 90-day performance reviews for all direct reports — tie documented observations from chart audits and 1:1 coaching conversations into each review",
        esText: "Completa evaluaciones formales de rendimiento de 90 dias para todos los subordinados directos — vincular las observaciones documentadas de las auditorias de historiales y conversaciones de entrenamiento 1:1 en cada evaluacion",
        domain: "execution",
      },
      {
        text: "Propose at least one top-of-license workflow change to the medical director: RN delegation of a task currently done by a provider, expanded MA scope for pre-visit planning, or CHW integration into care team rounds",
        esText: "Propone al menos un cambio de flujo de trabajo al tope de la licencia al director medico: delegacion de RN de una tarea actualmente realizada por un proveedor, alcance expandido de MA para planificacion previa a la visita, o integracion de CHW en rondas del equipo de atencion",
        domain: "mission",
      },
      {
        text: "Build the clinical training calendar for next quarter — include mandatory competency updates, documentation refreshers, and at least one soft skills session (trauma-informed care, motivational interviewing, or cultural humility)",
        esText: "Construye el calendario de capacitacion clinica para el proximo trimestre — incluye actualizaciones de competencias obligatorias, repasadores de documentacion y al menos una sesion de habilidades blandas (atencion informada en trauma, entrevista motivacional o humildad cultural)",
        domain: "growth",
      },
      {
        text: "Present quality metric trends to leadership: chart audit results, documentation compliance improvement, any UDS or HEDIS movement, and your recommended QI priorities for Q3/Q4",
        esText: "Presenta tendencias de metricas de calidad al liderazgo: resultados de auditorias de historiales, mejora en cumplimiento de documentacion, cualquier movimiento en UDS o HEDIS y tus prioridades de QI recomendadas para Q3/Q4",
        domain: "mission",
      },
      {
        text: "Identify 1-2 staff members with potential for advancement and begin a formal coaching relationship — connect them to certification pathways and leadership development opportunities",
        esText: "Identifica a 1-2 miembros del personal con potencial de avance y comienza una relacion de entrenamiento formal — conectalos con rutas de certificacion y oportunidades de desarrollo de liderazgo",
        domain: "growth",
      },
    ],

    milestone30: {
      text: "Clinical strengths and gaps are mapped for every direct report, you have attended rounds with each staff member, and you understand the current documentation compliance baseline",
      esText: "Las fortalezas y brechas clinicas estan mapeadas para cada subordinado directo, has asistido a rondas con cada miembro del personal y entiendes la linea base de cumplimiento de documentacion actual",
    },
    milestone60: {
      text: "Chart audit process established with structured rubric and timely feedback, weekly clinical huddle running, and first round of performance feedback conversations complete",
      esText: "Proceso de auditoria de historiales establecido con rubrica estructurada y retroalimentacion oportuna, reunion breve clinica semanal en funcionamiento y primera ronda de conversaciones de retroalimentacion de rendimiento completa",
    },
    milestone90: {
      text: "90-day performance reviews complete for all staff, at least one top-of-license proposal submitted, and Q3/Q4 clinical training calendar delivered to leadership",
      esText: "Evaluaciones de rendimiento de 90 dias completas para todo el personal, al menos una propuesta al tope de la licencia presentada y calendario de capacitacion clinica Q3/Q4 entregado al liderazgo",
    },

    keyResources: [
      {
        title: "Scope of Practice Guide",
        esTitle: "Guia de Alcance de Practica",
        url: "/strategy/scope-of-practice",
        description: "CA scope-of-practice by role with delegation matrix for MD/NP/PA/RN/LVN/MA/CHW/LCSW — know exactly what each team member can do under CA law",
        esDescription: "Alcance de practica de CA por rol con matriz de delegacion para MD/NP/PA/RN/LVN/MA/CHW/LCSW — conoce exactamente lo que cada miembro del equipo puede hacer bajo la ley de CA",
      },
      {
        title: "FQHC Workplace Guides",
        esTitle: "Guias de Trabajo de FQHC",
        url: "/guides",
        description: "Operational how-to guides on RN co-visits, behavioral health integration, and ECM clinical workflows — essential references for clinical supervisors",
        esDescription: "Guias practicas operativas sobre co-visitas de RN, integracion de salud conductual y flujos de trabajo clinicos de ECM — referencias esenciales para supervisores clinicos",
      },
      {
        title: "Cultural Humility Framework",
        esTitle: "Marco de Humildad Cultural",
        url: "/strategy/cultural-humility",
        description: "CLAS standards, multicultural workforce strategies, and 5 workforce diversity scenarios for FQHC clinical supervisors managing diverse teams",
        esDescription: "Estandares CLAS, estrategias de fuerza laboral multicultural y 5 escenarios de diversidad de la fuerza laboral para supervisores clinicos de FQHC que gestionan equipos diversos",
      },
      {
        title: "Executive Masterclass",
        esTitle: "Clase Magistral para Ejecutivos",
        url: "/strategy/masterclass",
        description: "Modules on clinical team retention, documentation compliance, and FQHC quality improvement strategies — for clinical leaders building high-performing teams",
        esDescription: "Modulos sobre retencion del equipo clinico, cumplimiento de documentacion y estrategias de mejora de calidad de FQHC — para lideres clinicos que construyen equipos de alto rendimiento",
      },
    ],
  },

  /* ================================================================= */
  /*  OPERATIONS DIRECTOR                                                */
  /* ================================================================= */
  operations_director: {
    roleName: "Operations Director",
    esRoleName: "Director(a) de Operaciones",

    days1to30: [
      {
        text: "Walk every square foot of each facility you oversee — observe patient flow, front desk bottlenecks, rooming efficiency, waiting room culture, and physical plant condition",
        esText: "Camina cada metro cuadrado de cada instalacion que supervisas — observa el flujo de pacientes, cuellos de botella en recepcion, eficiencia de preparacion de pacientes, cultura de sala de espera y condicion de la planta fisica",
        domain: "execution",
      },
      {
        text: "Hold introductory 1:1 meetings with every department head in your first two weeks — understand their top operational frustration, their team's headcount, and their relationship with the last operations director",
        esText: "Realiza reuniones 1:1 de presentacion con cada jefe de departamento en tus primeras dos semanas — entiende su mayor frustracion operativa, el numero de personas en su equipo y su relacion con el ultimo director de operaciones",
        domain: "people",
      },
      {
        text: "Review the last 12 months of financial reports: P&L statements, budget vs. actuals by department, payer mix trends, and any budget variances over 10%",
        esText: "Revisa los ultimos 12 meses de informes financieros: estados de P&G, presupuesto vs. reales por departamento, tendencias de mezcla de pagadores y cualquier varianza presupuestaria superior al 10%",
        domain: "mission",
      },
      {
        text: "Audit the top 3 operational bottlenecks using data: front desk wait times, patient rooming times, referral turnaround days, and same-day appointment fill rate",
        esText: "Audita los 3 principales cuellos de botella operativos usando datos: tiempos de espera en recepcion, tiempos de preparacion de pacientes, dias de respuesta de referencias y tasa de llenado de citas del mismo dia",
        domain: "execution",
      },
      {
        text: "Review all vendor contracts expiring within 12 months: cleaning services, medical equipment maintenance, EHR licensing, phone/IT — flag any contracts at risk of lapse or needing renegotiation",
        esText: "Revisa todos los contratos con proveedores que vencen en 12 meses: servicios de limpieza, mantenimiento de equipos medicos, licencias de EHR, telefono/TI — marca cualquier contrato en riesgo de caducidad o que necesite renegociacion",
        domain: "execution",
      },
      {
        text: "Understand the PPS reimbursement model and how it flows through your operations: which visit types generate a PPS encounter, how the cost report is built, and where no-shows and cancellations cost the FQHC money",
        esText: "Entiende el modelo de reembolso PPS y como fluye a traves de tus operaciones: que tipos de visita generan un encuentro PPS, como se construye el informe de costos y donde las ausencias y cancelaciones cuestan dinero al FQHC",
        domain: "mission",
      },
      {
        text: "Schedule your Five Conversations with the CFO and CMO — align on your budget authority, what metrics you own, and what operational decisions require executive sign-off",
        esText: "Programa tus Cinco Conversaciones con el CFO y CMO — alinea en tu autoridad presupuestaria, que metricas son de tu responsabilidad y que decisiones operativas requieren aprobacion ejecutiva",
        domain: "general",
      },
    ],

    days31to60: [
      {
        text: "Identify your top 3 cost-reduction or revenue-improvement opportunities — each must have a data-backed estimate of annual impact and a realistic implementation timeline",
        esText: "Identifica tus 3 principales oportunidades de reduccion de costos o mejora de ingresos — cada una debe tener un estimado de impacto anual respaldado por datos y un cronograma de implementacion realista",
        domain: "mission",
      },
      {
        text: "Build an operational KPI dashboard tracking: patient throughput (visits/day/site), wait times (door-to-room, room-to-provider), no-show rate, same-day fill rate, and referral completion rate",
        esText: "Construye un panel de control de KPI operativo que rastree: rendimiento de pacientes (visitas/dia/sitio), tiempos de espera (puerta-a-sala, sala-a-proveedor), tasa de ausencias, tasa de llenado del mismo dia y tasa de finalizacion de referencias",
        domain: "execution",
      },
      {
        text: "Schedule a dedicated meeting with the CFO to understand your budget authority, the variance approval process, and how to request supplemental funds mid-year",
        esText: "Programa una reunion dedicada con el CFO para entender tu autoridad presupuestaria, el proceso de aprobacion de varianzas y como solicitar fondos suplementarios a mitad de ano",
        domain: "mission",
      },
      {
        text: "Launch a weekly department head sync: 30 minutes, standing agenda — operational blockers, KPI review, one cross-department coordination issue, decisions needed from you this week",
        esText: "Lanza una sincronizacion semanal de jefes de departamento: 30 minutos, agenda permanente — obstaculos operativos, revision de KPI, un problema de coordinacion entre departamentos, decisiones que necesitas de ti esta semana",
        domain: "people",
      },
      {
        text: "Conduct a no-show rate analysis by provider, department, and patient population — identify the top 2-3 root causes and propose one intervention to test with data",
        esText: "Realiza un analisis de tasa de ausencias por proveedor, departamento y poblacion de pacientes — identifica las 2-3 causas raiz principales y propone una intervencion para probar con datos",
        domain: "execution",
      },
      {
        text: "Review and assess the staff scheduling model for each site — identify gaps in coverage, overtime patterns, and any chronic understaffing that's driving burnout or quality risk",
        esText: "Revisa y evalua el modelo de programacion de personal para cada sitio — identifica brechas en cobertura, patrones de horas extras y cualquier falta cronica de personal que este impulsando el agotamiento o riesgo de calidad",
        domain: "people",
      },
    ],

    days61to90: [
      {
        text: "Present operational findings to the executive team with ROI-positive proposals: each recommendation must include the problem statement, current cost/risk, proposed solution, estimated ROI, and implementation timeline",
        esText: "Presenta hallazgos operativos al equipo ejecutivo con propuestas de ROI positivo: cada recomendacion debe incluir la declaracion del problema, costo/riesgo actual, solucion propuesta, ROI estimado y cronograma de implementacion",
        domain: "mission",
      },
      {
        text: "Implement at least one workflow improvement with a measurable outcome — run a 30-day pilot, collect data, and present results to leadership showing before/after metrics",
        esText: "Implementa al menos una mejora de flujo de trabajo con un resultado medible — ejecuta un piloto de 30 dias, recopila datos y presenta resultados al liderazgo mostrando metricas antes/despues",
        domain: "execution",
      },
      {
        text: "Build the Q3/Q4 operational plan with budget request — tie each budget ask to a KPI improvement, regulatory requirement, or risk mitigation item",
        esText: "Construye el plan operativo Q3/Q4 con solicitud de presupuesto — vincula cada solicitud de presupuesto a una mejora de KPI, requisito regulatorio o elemento de mitigacion de riesgos",
        domain: "mission",
      },
      {
        text: "Conduct 90-day performance conversations with each department head — use KPI data, not just impressions, to ground the conversation in observable outcomes",
        esText: "Realiza conversaciones de rendimiento de 90 dias con cada jefe de departamento — usa datos de KPI, no solo impresiones, para fundamentar la conversacion en resultados observables",
        domain: "people",
      },
      {
        text: "Assess the FQHC's resilience across your operational domains — use the Resilience Scorecard to benchmark against peer organizations and identify your highest-leverage improvement priorities",
        esText: "Evalua la resiliencia del FQHC en tus dominios operativos — usa el Cuadro de Puntuacion de Resiliencia para comparar con organizaciones pares e identificar tus prioridades de mejora de mayor impacto",
        domain: "transition",
      },
    ],

    milestone30: {
      text: "Full operational map complete including facility walkthrough, department head relationships initiated, financial baseline understood, and top 3 workflow bottlenecks identified with data",
      esText: "Mapa operativo completo incluyendo recorrido por instalaciones, relaciones con jefes de departamento iniciadas, base financiera entendida y 3 principales cuellos de botella de flujo de trabajo identificados con datos",
    },
    milestone60: {
      text: "Operational KPI dashboard live and reviewed weekly, top 3 cost/revenue opportunities identified with data, and weekly department head sync running consistently",
      esText: "Panel de control de KPI operativo activo y revisado semanalmente, 3 principales oportunidades de costo/ingresos identificadas con datos y sincronizacion semanal de jefes de departamento en funcionamiento consistentemente",
    },
    milestone90: {
      text: "ROI-positive proposals presented to executive team, at least one workflow improvement implemented with measured outcomes, and Q3/Q4 operational plan with budget request delivered",
      esText: "Propuestas de ROI positivo presentadas al equipo ejecutivo, al menos una mejora de flujo de trabajo implementada con resultados medidos y plan operativo Q3/Q4 con solicitud de presupuesto entregado",
    },

    keyResources: [
      {
        title: "FQHC Resilience Scorecard",
        esTitle: "Cuadro de Puntuacion de Resiliencia de FQHC",
        url: "/strategy/resilience",
        description: "220 FQHCs scored across 5 operational dimensions — benchmark your organization against regional peers and identify your highest-risk vulnerabilities",
        esDescription: "220 FQHCs puntuados en 5 dimensiones operativas — compara tu organizacion con pares regionales e identifica tus vulnerabilidades de mayor riesgo",
      },
      {
        title: "Workplace Guides — Revenue Cycle",
        esTitle: "Guias de Trabajo — Ciclo de Ingresos",
        url: "/guides",
        description: "Step-by-step operational guides on FQHC revenue cycle management, PPS reimbursement, and billing workflow optimization",
        esDescription: "Guias operativas paso a paso sobre gestion del ciclo de ingresos de FQHC, reembolso PPS y optimizacion del flujo de trabajo de facturacion",
      },
      {
        title: "OKR Templates — Operations & Finance",
        esTitle: "Plantillas OKR — Operaciones y Finanzas",
        url: "/strategy/okrs",
        description: "OKR templates for patient access, operational efficiency, and cross-department coordination — set measurable targets with accountability built in",
        esDescription: "Plantillas OKR para acceso de pacientes, eficiencia operativa y coordinacion entre departamentos — establece objetivos medibles con responsabilidad incorporada",
      },
      {
        title: "Executive Masterclass",
        esTitle: "Clase Magistral para Ejecutivos",
        url: "/strategy/masterclass",
        description: "Modules on FQHC financial management, revenue recovery strategies, and operational resilience during the 2026 funding crisis",
        esDescription: "Modulos sobre gestion financiera de FQHC, estrategias de recuperacion de ingresos y resiliencia operativa durante la crisis de financiamiento 2026",
      },
    ],
  },

  /* ================================================================= */
  /*  EXECUTIVE DIRECTOR                                                 */
  /* ================================================================= */
  executive_director: {
    roleName: "Executive Director / C-Suite",
    esRoleName: "Director(a) Ejecutivo/a",

    days1to30: [
      {
        text: "Conduct 1:1 listening sessions with every board member individually — ask about the FQHC's history, what they're proud of, what concerns them about the future, and what they expect from you",
        esText: "Realiza sesiones de escucha 1:1 con cada miembro de la junta directiva individualmente — pregunta sobre la historia del FQHC, de que estan orgullosos, que les preocupa sobre el futuro y que esperan de ti",
        domain: "people",
      },
      {
        text: "Meet individually with every member of the leadership team — ask the same question: 'What three things would you change if you were me, starting Monday?'",
        esText: "Reune individualmente con cada miembro del equipo de liderazgo — haz la misma pregunta: '¿Cuales son las tres cosas que cambiarias si fueras yo, empezando el lunes?'",
        domain: "people",
      },
      {
        text: "Read the last 3 years of HRSA Operational Site Visit (OSV) results and any corrective action plans — these tell you what regulators see that insiders often miss",
        esText: "Lee los ultimos 3 anos de resultados de Visitas Operativas del Sitio (OSV) de HRSA y cualquier plan de accion correctiva — estos te dicen lo que los reguladores ven que los insiders a menudo pasan por alto",
        domain: "execution",
      },
      {
        text: "Review the complete financial position: cash reserve in days, revenue by payer (Medi-Cal, Medicare, Sliding Fee, grants), pending grant renewals, capital commitments, and any long-term debt",
        esText: "Revisa la posicion financiera completa: reserva de efectivo en dias, ingresos por pagador (Medi-Cal, Medicare, Escala de Tarifas, subvenciones), renovaciones de subvenciones pendientes, compromisos de capital y cualquier deuda a largo plazo",
        domain: "mission",
      },
      {
        text: "Map the 5 most critical funder relationships: HRSA program officer, county health officer, your top MCO contacts, and major foundation funders — understand the history, last communication, and any open issues",
        esText: "Mapea las 5 relaciones con financiadores mas criticas: oficial de programa HRSA, funcionario de salud del condado, tus principales contactos de MCO y grandes financiadores de fundaciones — entiende la historia, ultima comunicacion y cualquier asunto pendiente",
        domain: "mission",
      },
      {
        text: "Understand the FQHC's H.R. 1 and CalAIM exposure: how much of your revenue depends on Medi-Cal, what programs would be affected by a 15% or 30% funding cut, and whether any CalAIM waivers are pending",
        esText: "Entiende la exposicion del FQHC a H.R. 1 y CalAIM: cuanto de tus ingresos depende de Medi-Cal, que programas se verian afectados por un recorte de financiamiento del 15% o 30%, y si hay exenciones de CalAIM pendientes",
        domain: "mission",
      },
      {
        text: "Read the last 3 Community Health Needs Assessments (CHNAs) — understand how community needs have shifted and where your programs have gaps relative to the population you serve",
        esText: "Lee las ultimas 3 Evaluaciones de Necesidades de Salud Comunitaria (CHNA) — entiende como han cambiado las necesidades de la comunidad y donde tus programas tienen brechas en relacion con la poblacion a la que sirves",
        domain: "mission",
      },
    ],

    days31to60: [
      {
        text: "Hold an all-staff town hall — present your initial observations, share what you've heard, and ask the whole organization one question: 'What should I know that I haven't asked yet?'",
        esText: "Realiza una asamblea de todo el personal — presenta tus observaciones iniciales, comparte lo que has escuchado y haz a toda la organizacion una pregunta: '¿Que deberia saber que aun no he preguntado?'",
        domain: "people",
      },
      {
        text: "Present your 30-day initial observations to the board — not solutions yet, just what you've learned. A leader who listens first builds more board trust than one who acts before understanding.",
        esText: "Presenta tus observaciones iniciales de 30 dias a la junta — aun no soluciones, solo lo que has aprendido. Un lider que escucha primero construye mas confianza con la junta que uno que actua antes de entender.",
        domain: "transition",
      },
      {
        text: "Meet individually with your top 5 funders and MCO partners — reintroduce yourself, reinforce commitment to the partnership, and ask what they're watching in the policy environment that could affect your FQHC",
        esText: "Reune individualmente con tus 5 principales financiadores y socios de MCO — vuelve a presentarte, refuerza el compromiso con la asociacion y pregunta que estan observando en el entorno de politica que podria afectar a tu FQHC",
        domain: "mission",
      },
      {
        text: "Review the strategic plan — assess whether it still reflects current realities, funding threats, and community needs. Identify which goals are still alive, which are at risk, and which should be retired",
        esText: "Revisa el plan estrategico — evalua si aun refleja las realidades actuales, amenazas de financiamiento y necesidades de la comunidad. Identifica que metas aun estan vigentes, cuales estan en riesgo y cuales deben retirarse",
        domain: "mission",
      },
      {
        text: "Build a financial scenario model with your CFO: model three scenarios — status quo, 15% Medi-Cal cut, and 30% Medi-Cal cut — showing impact on staffing, programs, and cash position",
        esText: "Construye un modelo de escenarios financieros con tu CFO: modela tres escenarios — statu quo, recorte del 15% de Medi-Cal y recorte del 30% de Medi-Cal — mostrando el impacto en personal, programas y posicion de efectivo",
        domain: "mission",
      },
      {
        text: "Establish your executive team meeting rhythm: frequency, agenda structure, how decisions are made, how conflict is surfaced, and what accountability looks like between meetings",
        esText: "Establece el ritmo de reuniones de tu equipo ejecutivo: frecuencia, estructura de agenda, como se toman decisiones, como se plantean los conflictos y como se ve la responsabilidad entre reuniones",
        domain: "execution",
      },
    ],

    days61to90: [
      {
        text: "Present your 90-day transition assessment to the full board: what you found, what's working, what concerns you, and your proposed strategic priorities for the next 12 months",
        esText: "Presenta tu evaluacion de transicion de 90 dias a la junta completa: lo que encontraste, lo que funciona, lo que te preocupa y tus prioridades estrategicas propuestas para los proximos 12 meses",
        domain: "mission",
      },
      {
        text: "Propose 2-3 updated strategic priorities for board approval — each must tie to a specific community health need, a funding opportunity or threat, and a measurable 12-month outcome",
        esText: "Propone 2-3 prioridades estrategicas actualizadas para aprobacion de la junta — cada una debe vincularse a una necesidad especifica de salud comunitaria, una oportunidad o amenaza de financiamiento y un resultado medible a 12 meses",
        domain: "mission",
      },
      {
        text: "Announce 2-3 operational changes that demonstrate your priorities are real — these should be visible, early signals of the culture and direction you're establishing",
        esText: "Anuncia 2-3 cambios operativos que demuestren que tus prioridades son reales — estas deben ser senales tempranas y visibles de la cultura y direccion que estas estableciendo",
        domain: "execution",
      },
      {
        text: "Launch the community advisory board meeting cycle — the CAB should reflect your community's diversity and be a real input mechanism, not a rubber stamp",
        esText: "Lanza el ciclo de reuniones de la junta asesora comunitaria — la CAB debe reflejar la diversidad de tu comunidad y ser un mecanismo real de aportacion, no un sello de goma",
        domain: "transition",
      },
      {
        text: "Establish your personal external presence: which coalitions, policy forums, and CPCA/NACHC committees align with your strategic priorities — show up and be known beyond your FQHC's walls",
        esText: "Establece tu presencia externa personal: que coaliciones, foros de politica y comites de CPCA/NACHC se alinean con tus prioridades estrategicas — preséntate y hacerte conocer mas alla de las paredes de tu FQHC",
        domain: "transition",
      },
      {
        text: "Assess your leadership team's composition and succession bench — identify any critical capability gaps, people at flight risk, and where you need to build depth for organizational resilience",
        esText: "Evalua la composicion de tu equipo de liderazgo y el banco de sucesion — identifica cualquier brecha de capacidad critica, personas en riesgo de abandono y donde necesitas construir profundidad para la resiliencia organizacional",
        domain: "people",
      },
    ],

    milestone30: {
      text: "All board member and leadership team 1:1s complete, HRSA OSV history reviewed, full financial position understood, and top 5 funder relationships mapped with contact history",
      esText: "Todas las reuniones 1:1 con miembros de la junta y del equipo de liderazgo completas, historial de OSV de HRSA revisado, posicion financiera completa entendida y las 5 principales relaciones con financiadores mapeadas con historial de contacto",
    },
    milestone60: {
      text: "All-staff town hall complete, 30-day observations presented to board, top 5 funders met individually, financial scenario model built with CFO, and executive team meeting rhythm established",
      esText: "Asamblea de todo el personal completa, observaciones de 30 dias presentadas a la junta, 5 principales financiadores reunidos individualmente, modelo de escenarios financieros construido con CFO y ritmo de reuniones del equipo ejecutivo establecido",
    },
    milestone90: {
      text: "90-day transition assessment presented to full board, updated strategic priorities adopted, 2-3 visible operational changes announced, and community advisory board meeting cycle launched",
      esText: "Evaluacion de transicion de 90 dias presentada a la junta completa, prioridades estrategicas actualizadas adoptadas, 2-3 cambios operativos visibles anunciados y ciclo de reuniones de la junta asesora comunitaria lanzado",
    },

    keyResources: [
      {
        title: "Executive Case Studies",
        esTitle: "Casos de Estudio Ejecutivos",
        url: "/strategy/guides",
        description: "6 real FQHC case studies using the Rumelt framework — how real FQHCs diagnosed problems, built guiding policies, and executed strategic change",
        esDescription: "6 casos de estudio reales de FQHC usando el marco Rumelt — como FQHCs reales diagnosticaron problemas, construyeron politicas guia y ejecutaron cambio estrategico",
      },
      {
        title: "Funding Impact Tracker",
        esTitle: "Rastreador de Impacto de Financiamiento",
        url: "/funding-impact",
        description: "H.R. 1 policy timeline, Medi-Cal exposure calculator, and revenue strategies for the 2026 funding crisis — essential for every FQHC executive",
        esDescription: "Cronologia de politica H.R. 1, calculadora de exposicion a Medi-Cal y estrategias de ingresos para la crisis de financiamiento 2026 — esencial para cada ejecutivo de FQHC",
      },
      {
        title: "Executive Masterclass",
        esTitle: "Clase Magistral para Ejecutivos",
        url: "/strategy/masterclass",
        description: "15 deep-dive modules on financial survival, fundraising, undocumented care strategy, and FQHC economics — the MBA you didn't have time to get",
        esDescription: "15 modulos detallados sobre supervivencia financiera, recaudacion de fondos, estrategia de atencion a indocumentados y economia de FQHC — el MBA que no tuviste tiempo de obtener",
      },
      {
        title: "OKR Templates — Executive Level",
        esTitle: "Plantillas OKR — Nivel Ejecutivo",
        url: "/strategy/okrs",
        description: "12 crisis-tested OKR templates across 5 strategic domains — build your 90-day accountability framework with measurable targets tied to board priorities",
        esDescription: "12 plantillas OKR probadas en crisis en 5 dominios estrategicos — construye tu marco de responsabilidad de 90 dias con objetivos medibles vinculados a las prioridades de la junta",
      },
    ],
  },
};

/* --- Generator Function -------------------------------------------- */

/**
 * Generates a personalized Manager 90-Day Plan based on:
 * - roleId: determines role-specific tasks and milestones
 * - results: applies STARS type from assessment and adds domain coaching note
 */
export function generateManager90DaysPlan(
  roleId: LeadershipRoleId,
  results: ManagerAssessmentResults,
): Manager90DaysPlan {
  const rolePlan = ROLE_PLANS[roleId];
  const starsInfo = STARS_LABELS[results.starsType];

  // Build coaching note: STARS situation coaching + domain-specific growth note
  let coachingNote = STARS_COACHING_NOTES[results.starsType].en;
  let esCoachingNote = STARS_COACHING_NOTES[results.starsType].es;

  const domainAddition = DOMAIN_COACHING_ADDITIONS[results.topGrowthArea];
  if (domainAddition) {
    coachingNote += domainAddition.en;
    esCoachingNote += domainAddition.es;
  }

  return {
    roleId,
    roleName: rolePlan.roleName,
    esRoleName: rolePlan.esRoleName,
    starsType: results.starsType,
    starsLabel: starsInfo.en,
    esStarsLabel: starsInfo.es,
    phases: {
      days1to30: {
        title: "Days 1–30: Diagnose & Listen",
        esTitle: "Días 1–30: Diagnosticar y Escuchar",
        subtitle: "Build your foundation — understand your team, learn the systems, identify the real problems",
        esSubtitle: "Construye tu base — entiende a tu equipo, aprende los sistemas, identifica los problemas reales",
        priorities: rolePlan.days1to30,
        milestone: rolePlan.milestone30,
      },
      days31to60: {
        title: "Days 31–60: Build & Execute",
        esTitle: "Días 31–60: Construir y Ejecutar",
        subtitle: "Establish systems and rhythms — launch your team structures, begin coaching, make visible progress",
        esSubtitle: "Establece sistemas y ritmos — lanza tus estructuras de equipo, comienza el entrenamiento, haz progreso visible",
        priorities: rolePlan.days31to60,
        milestone: rolePlan.milestone60,
      },
      days61to90: {
        title: "Days 61–90: Deliver & Align",
        esTitle: "Días 61–90: Entregar y Alinear",
        subtitle: "Show results — deliver on your commitments, propose improvements, and set up the next 6 months",
        esSubtitle: "Muestra resultados — cumple tus compromisos, propone mejoras y prepara los proximos 6 meses",
        priorities: rolePlan.days61to90,
        milestone: rolePlan.milestone90,
      },
    },
    managerConversations: MANAGER_FIVE_CONVERSATIONS,
    teamFoglamp: TEAM_FOGLAMP,
    coachingNote,
    esCoachingNote,
    keyResources: rolePlan.keyResources,
  };
}
