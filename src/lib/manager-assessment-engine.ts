/* ------------------------------------------------------------------ */
/*  Manager Team Readiness Assessment Engine                           */
/*  Based on Watkins' First 90 Days + Talent Exchange Methodology      */
/*  Adapted for FQHC managers assessing their teams                    */
/* ------------------------------------------------------------------ */

import type {
  DomainId,
  AnswerOption,
  AssessmentQuestion,
  DomainDefinition,
  DomainScore,
  FailureFactorInsight,
} from "./career-assessment-engine";
import type { STARSType } from "./first-90-days";

/* --- Types --------------------------------------------------------- */

export type LeadershipRoleId =
  | "program_manager"
  | "clinical_supervisor"
  | "operations_director"
  | "executive_director";

export interface ManagerAssessmentResults {
  domainScores: Record<DomainId, DomainScore>;
  overallScore: number;
  topStrength: DomainId;
  topGrowthArea: DomainId;
  insights: {
    strengths: string[];
    growthAreas: string[];
    nextSteps: string[];
  };
  failureFactors?: FailureFactorInsight[];
  starsType: STARSType;
  roleId: LeadershipRoleId;
}

export interface LeadershipRoleDefinition {
  id: LeadershipRoleId;
  label: string;
  esLabel: string;
  description: string;
  esDescription: string;
  icon: string;
}

/* --- Leadership Role Definitions ----------------------------------- */

export const LEADERSHIP_ROLES: LeadershipRoleDefinition[] = [
  {
    id: "program_manager",
    label: "Program Manager",
    esLabel: "Gerente de Programa",
    description: "Manages ECM, CalAIM, or other FQHC programs. Responsible for program outcomes, staff coordination, and compliance.",
    esDescription: "Gestiona programas de ECM, CalAIM u otros del FQHC. Responsable de resultados del programa, coordinacion del personal y cumplimiento.",
    icon: "📋",
  },
  {
    id: "clinical_supervisor",
    label: "Clinical Supervisor",
    esLabel: "Supervisor(a) Clinico/a",
    description: "Supervises clinical staff — nurses, MAs, BH clinicians. Ensures quality of care, clinical protocols, and staff development.",
    esDescription: "Supervisa personal clinico — enfermeros, asistentes medicos, clinicos de BH. Asegura calidad de atencion, protocolos clinicos y desarrollo del personal.",
    icon: "🩺",
  },
  {
    id: "operations_director",
    label: "Operations Director",
    esLabel: "Director(a) de Operaciones",
    description: "Oversees department or site operations. Manages budgets, workflows, facility operations, and cross-functional teams.",
    esDescription: "Supervisa operaciones de departamento o sitio. Gestiona presupuestos, flujos de trabajo, operaciones de instalacion y equipos multifuncionales.",
    icon: "🏢",
  },
  {
    id: "executive_director",
    label: "Executive Director / C-Suite",
    esLabel: "Director(a) Ejecutivo/a",
    description: "Organizational leadership — CEO, COO, CMO, or VP. Sets strategic direction, manages the leadership team, and represents the FQHC externally.",
    esDescription: "Liderazgo organizacional — CEO, COO, CMO o VP. Establece la direccion estrategica, gestiona el equipo de liderazgo y representa al FQHC externamente.",
    icon: "🛡️",
  },
];

/* --- Manager Domain Definitions ------------------------------------ */

export const MANAGER_DOMAIN_DEFINITIONS: DomainDefinition[] = [
  {
    id: "mission",
    name: "Mission & Motivation",
    description: "Can you keep your team connected to the FQHC mission during funding cuts, burnout, and organizational change?",
    icon: "🎯",
    color: "teal",
  },
  {
    id: "people",
    name: "People & Communication",
    description: "Can you build trust across cultures, resolve conflict, and create psychological safety for your team?",
    icon: "🤝",
    color: "blue",
  },
  {
    id: "execution",
    name: "Execution & Adaptability",
    description: "Can you set clear priorities, manage performance, and keep your team productive through system changes?",
    icon: "⚡",
    color: "amber",
  },
  {
    id: "growth",
    name: "Growth Mindset",
    description: "Can you develop your staff, build a learning culture, and plan for succession?",
    icon: "🌱",
    color: "green",
  },
  {
    id: "transition",
    name: "Transition Readiness",
    description: "Can you diagnose your team's situation, onboard new members effectively, and create structure during transitions?",
    icon: "🧭",
    color: "purple",
  },
];

/* --- Universal Manager Questions (15: 3 per domain) --------------- */

const MANAGER_UNIVERSAL_QUESTIONS: AssessmentQuestion[] = [
  // === MISSION (3) ===
  {
    id: "mu_mission_1",
    domain: "mission",
    scenario: "Your FQHC just announced significant Medi-Cal funding cuts. Several team members are worried about layoffs and losing motivation.",
    esScenario: "Tu FQHC acaba de anunciar recortes significativos en fondos de Medi-Cal. Varios miembros del equipo estan preocupados por despidos y perdiendo motivacion.",
    question: "How do you address your team's concerns and maintain morale?",
    esQuestion: "Como abordas las preocupaciones de tu equipo y mantienes la moral?",
    options: [
      { id: "mu_m1_a", text: "Hold a team meeting to be transparent about what you know, acknowledge the uncertainty, and refocus on the patients who still need your team", esText: "Celebra una reunion de equipo para ser transparente sobre lo que sabes, reconocer la incertidumbre y reenfocarse en los pacientes que aun necesitan a tu equipo", score: 4, behaviorTag: "transparent-leader" },
      { id: "mu_m1_b", text: "Meet with each team member individually to understand their specific concerns, then work with leadership to get answers", esText: "Reune con cada miembro del equipo individualmente para entender sus preocupaciones especificas, luego trabaja con el liderazgo para obtener respuestas", score: 3, behaviorTag: "empathetic-manager" },
      { id: "mu_m1_c", text: "Tell the team to stay focused on their work and not worry about things they can't control", esText: "Dile al equipo que se enfoque en su trabajo y no se preocupe por cosas que no pueden controlar", score: 2, behaviorTag: "dismissive-leadership" },
      { id: "mu_m1_d", text: "Wait for more information from leadership before addressing the team — you don't want to cause more anxiety", esText: "Espera mas informacion del liderazgo antes de abordar al equipo — no quieres causar mas ansiedad", score: 1, behaviorTag: "avoidant-leader" },
    ],
  },
  {
    id: "mu_mission_2",
    domain: "mission",
    scenario: "You notice that two team members seem checked out — doing the minimum, not engaging in team meetings, and leaving exactly at quitting time every day.",
    esScenario: "Notas que dos miembros del equipo parecen desconectados — haciendo lo minimo, sin participar en reuniones de equipo, e irse exactamente a la hora de salida todos los dias.",
    question: "What do you do?",
    esQuestion: "Que haces?",
    options: [
      { id: "mu_m2_a", text: "Schedule 1:1 conversations to understand what's behind the change — ask about workload, personal challenges, and what would reengage them", esText: "Programa conversaciones 1:1 para entender que esta detras del cambio — pregunta sobre carga de trabajo, desafios personales y que los reengancharia", score: 4, behaviorTag: "curious-leader" },
      { id: "mu_m2_b", text: "Reconnect the team to patient impact stories — share a win or patient thank-you at the next meeting to remind everyone why they do this work", esText: "Reconecta al equipo con historias de impacto en pacientes — comparte un logro o agradecimiento de paciente en la proxima reunion para recordar a todos por que hacen este trabajo", score: 3, behaviorTag: "mission-reconnector" },
      { id: "mu_m2_c", text: "Document the performance issues and start the formal improvement process", esText: "Documenta los problemas de rendimiento e inicia el proceso formal de mejora", score: 2, behaviorTag: "process-first" },
      { id: "mu_m2_d", text: "Give them space — everyone has off periods, and they'll come back around on their own", esText: "Dales espacio — todos tienen periodos malos, y volveran por su cuenta", score: 1, behaviorTag: "passive-manager" },
    ],
  },
  {
    id: "mu_mission_3",
    domain: "mission",
    scenario: "A new team member questions why the FQHC does things differently from their previous employer (a large hospital system). They say: 'This seems really inefficient.'",
    esScenario: "Un nuevo miembro del equipo cuestiona por que el FQHC hace las cosas de manera diferente a su empleador anterior (un gran sistema hospitalario). Dice: 'Esto parece muy ineficiente.'",
    question: "How do you respond?",
    esQuestion: "Como respondes?",
    options: [
      { id: "mu_m3_a", text: "Acknowledge their perspective, explain the mission-driven reasons behind FQHC practices, and invite them to propose improvements that align with the mission", esText: "Reconoce su perspectiva, explica las razones impulsadas por la mision detras de las practicas del FQHC e invitalos a proponer mejoras alineadas con la mision", score: 4, behaviorTag: "bridge-builder" },
      { id: "mu_m3_b", text: "Ask them to observe for 30 days before suggesting changes, so they understand the full context of why things work the way they do", esText: "Pideles que observen durante 30 dias antes de sugerir cambios, para que entiendan el contexto completo de por que las cosas funcionan como funcionan", score: 3, behaviorTag: "patient-educator" },
      { id: "mu_m3_c", text: "Tell them that FQHCs are different and they need to adapt to how things work here", esText: "Diles que los FQHCs son diferentes y necesitan adaptarse a como funcionan las cosas aqui", score: 2, behaviorTag: "rigid-manager" },
      { id: "mu_m3_d", text: "Agree that things could be better and commiserate about FQHC limitations", esText: "Acepta que las cosas podrian ser mejores y lamenta las limitaciones del FQHC", score: 1, behaviorTag: "undermining-mission" },
    ],
  },

  // === PEOPLE (3) ===
  {
    id: "mu_people_1",
    domain: "people",
    scenario: "Two team members have an ongoing interpersonal conflict that's affecting the whole team's dynamic. Other staff members are starting to take sides.",
    esScenario: "Dos miembros del equipo tienen un conflicto interpersonal continuo que esta afectando la dinamica de todo el equipo. Otros empleados estan empezando a tomar partido.",
    question: "How do you handle this?",
    esQuestion: "Como manejas esto?",
    options: [
      { id: "mu_p1_a", text: "Meet with each person privately to understand their perspective, then facilitate a structured conversation between them focused on shared goals and concrete behavior changes", esText: "Reune con cada persona en privado para entender su perspectiva, luego facilita una conversacion estructurada entre ellos enfocada en metas compartidas y cambios concretos de comportamiento", score: 4, behaviorTag: "conflict-facilitator" },
      { id: "mu_p1_b", text: "Address it directly in the next team meeting — set clear expectations about professional behavior and collaboration", esText: "Abordalo directamente en la proxima reunion de equipo — establece expectativas claras sobre comportamiento profesional y colaboracion", score: 3, behaviorTag: "direct-communicator" },
      { id: "mu_p1_c", text: "Separate them by adjusting schedules or assignments so they don't have to work together directly", esText: "Separalos ajustando horarios o asignaciones para que no tengan que trabajar juntos directamente", score: 2, behaviorTag: "conflict-avoider" },
      { id: "mu_p1_d", text: "Hope it resolves itself — intervening might make it worse, and adults should be able to work it out", esText: "Esperar que se resuelva solo — intervenir podria empeorarlo, y los adultos deberian poder resolverlo", score: 1, behaviorTag: "passive-manager" },
    ],
  },
  {
    id: "mu_people_2",
    domain: "people",
    scenario: "Your team includes staff from diverse cultural backgrounds. You notice that some team members dominate meetings while quieter staff — often bilingual frontline workers — rarely share ideas.",
    esScenario: "Tu equipo incluye personal de diversos origenes culturales. Notas que algunos miembros del equipo dominan las reuniones mientras que el personal mas callado — a menudo trabajadores bilingues de primera linea — raramente comparten ideas.",
    question: "What do you do to build a more inclusive team culture?",
    esQuestion: "Que haces para construir una cultura de equipo mas inclusiva?",
    options: [
      { id: "mu_p2_a", text: "Use structured facilitation techniques: go-arounds, written input before discussion, small group breakouts, and directly invite quieter members to share their expertise", esText: "Usa tecnicas de facilitacion estructuradas: rondas, contribucion escrita antes de la discusion, grupos pequenos e invita directamente a los miembros mas callados a compartir su experiencia", score: 4, behaviorTag: "inclusive-facilitator" },
      { id: "mu_p2_b", text: "Check in privately with the quieter team members to understand any barriers, and create alternative channels for sharing ideas (anonymous suggestion box, 1:1s)", esText: "Habla en privado con los miembros mas callados del equipo para entender las barreras y crea canales alternativos para compartir ideas (buzon anonimo de sugerencias, 1:1s)", score: 3, behaviorTag: "empathetic-manager" },
      { id: "mu_p2_c", text: "Ask the dominant speakers to give others a chance to talk at the next meeting", esText: "Pide a los hablantes dominantes que den oportunidad a otros de hablar en la proxima reunion", score: 2, behaviorTag: "surface-fix" },
      { id: "mu_p2_d", text: "Not everyone needs to speak in meetings — some people contribute best through their work, not their words", esText: "No todos necesitan hablar en reuniones — algunas personas contribuyen mejor a traves de su trabajo, no de sus palabras", score: 1, behaviorTag: "dismissive-leadership" },
    ],
  },
  {
    id: "mu_people_3",
    domain: "people",
    scenario: "You need to have a difficult conversation with a team member about their consistent documentation errors, which are putting the FQHC at compliance risk.",
    esScenario: "Necesitas tener una conversacion dificil con un miembro del equipo sobre sus errores consistentes de documentacion, que estan poniendo al FQHC en riesgo de cumplimiento.",
    question: "How do you approach the conversation?",
    esQuestion: "Como abordas la conversacion?",
    options: [
      { id: "mu_p3_a", text: "Use the Situation-Behavior-Impact model: describe specific examples, explain the compliance risk, ask what support they need, and agree on measurable improvement goals", esText: "Usa el modelo Situacion-Comportamiento-Impacto: describe ejemplos especificos, explica el riesgo de cumplimiento, pregunta que apoyo necesitan y acuerda metas medibles de mejora", score: 4, behaviorTag: "coaching-leader" },
      { id: "mu_p3_b", text: "Be direct but kind — tell them the errors need to stop, explain why it matters for the FQHC, and offer additional training", esText: "Se directo pero amable — diles que los errores deben detenerse, explica por que importa para el FQHC y ofrece capacitacion adicional", score: 3, behaviorTag: "direct-communicator" },
      { id: "mu_p3_c", text: "Send an email outlining the documentation requirements and copy HR to create a paper trail", esText: "Envia un correo describiendo los requisitos de documentacion y copia a RH para crear un registro", score: 2, behaviorTag: "process-first" },
      { id: "mu_p3_d", text: "Fix the errors yourself or assign someone else to review their work — it's faster than having an uncomfortable conversation", esText: "Corrige los errores tu mismo o asigna a alguien mas para revisar su trabajo — es mas rapido que tener una conversacion incomoda", score: 1, behaviorTag: "conflict-avoider" },
    ],
  },

  // === EXECUTION (3) ===
  {
    id: "mu_exec_1",
    domain: "execution",
    scenario: "Your FQHC just migrated to a new EHR system. Your team is struggling — productivity is down 40%, they're frustrated, and patients are waiting longer.",
    esScenario: "Tu FQHC acaba de migrar a un nuevo sistema EHR. Tu equipo esta teniendo dificultades — la productividad bajo un 40%, estan frustrados y los pacientes estan esperando mas.",
    question: "How do you manage this transition?",
    esQuestion: "Como manejas esta transicion?",
    options: [
      { id: "mu_e1_a", text: "Temporarily reduce patient volume expectations, create peer learning pairs (pair tech-savvy staff with struggling ones), hold daily 15-min EHR huddles, and celebrate small wins", esText: "Temporalmente reduce las expectativas de volumen de pacientes, crea parejas de aprendizaje entre pares (empareja personal tecnologico con los que tienen dificultades), celebra reuniones diarias de 15 min sobre EHR y celebra pequenos logros", score: 4, behaviorTag: "adaptive-leader" },
      { id: "mu_e1_b", text: "Request additional EHR training sessions from IT, create quick-reference guides, and adjust performance metrics for the next 60 days", esText: "Solicita sesiones adicionales de capacitacion del EHR a TI, crea guias de referencia rapida y ajusta las metricas de rendimiento para los proximos 60 dias", score: 3, behaviorTag: "systematic-manager" },
      { id: "mu_e1_c", text: "Push through it — tell the team that everyone struggles with new systems and it will get better with time", esText: "Sigue adelante — dile al equipo que todos luchan con nuevos sistemas y mejorara con el tiempo", score: 2, behaviorTag: "dismissive-leadership" },
      { id: "mu_e1_d", text: "Escalate to leadership that the migration was poorly planned and demand more support before resuming normal operations", esText: "Escala al liderazgo que la migracion fue mal planificada y exige mas apoyo antes de retomar operaciones normales", score: 1, behaviorTag: "blame-focused" },
    ],
  },
  {
    id: "mu_exec_2",
    domain: "execution",
    scenario: "Your team has more work than they can handle. Three positions are vacant, remaining staff are taking on extra patients, and quality metrics are slipping.",
    esScenario: "Tu equipo tiene mas trabajo del que puede manejar. Tres posiciones estan vacantes, el personal restante esta atendiendo pacientes adicionales y las metricas de calidad estan bajando.",
    question: "How do you prioritize and keep the team functional?",
    esQuestion: "Como priorizas y mantienes al equipo funcional?",
    options: [
      { id: "mu_e2_a", text: "Triage with the team: identify which tasks are critical vs. nice-to-have, redistribute workload based on strengths, set temporary quality floors (not ceilings), and advocate to leadership for backfill", esText: "Clasifica con el equipo: identifica que tareas son criticas vs. deseables, redistribuye la carga de trabajo basada en fortalezas, establece pisos temporales de calidad (no techos) y aboga ante el liderazgo por reemplazo", score: 4, behaviorTag: "strategic-prioritizer" },
      { id: "mu_e2_b", text: "Focus on retaining the remaining team — protect their time, reduce non-essential meetings, and push hard for faster hiring", esText: "Enfocate en retener al equipo restante — protege su tiempo, reduce reuniones no esenciales y presiona fuerte por contratacion mas rapida", score: 3, behaviorTag: "team-protector" },
      { id: "mu_e2_c", text: "Ask each team member to take on a little more until the positions are filled — everyone needs to stretch right now", esText: "Pide a cada miembro del equipo que asuma un poco mas hasta que se llenen las posiciones — todos necesitan estirarse ahora mismo", score: 2, behaviorTag: "burden-spreader" },
      { id: "mu_e2_d", text: "Accept that quality will slip during the staffing shortage — there's nothing you can do about it until new people are hired", esText: "Acepta que la calidad bajara durante la escasez de personal — no hay nada que puedas hacer hasta que se contrate nuevo personal", score: 1, behaviorTag: "passive-manager" },
    ],
  },
  {
    id: "mu_exec_3",
    domain: "execution",
    scenario: "A team member consistently misses deadlines for submitting required reports, which affects the whole team's performance metrics and compliance.",
    esScenario: "Un miembro del equipo consistentemente no cumple con los plazos para enviar informes requeridos, lo que afecta las metricas de rendimiento de todo el equipo y el cumplimiento.",
    question: "How do you handle this performance issue?",
    esQuestion: "Como manejas este problema de rendimiento?",
    options: [
      { id: "mu_e3_a", text: "Have a 1:1 to understand the root cause (workload? skills gap? personal issues?), then create a specific improvement plan with weekly check-ins and clear consequences", esText: "Ten una reunion 1:1 para entender la causa raiz (carga de trabajo? brecha de habilidades? problemas personales?), luego crea un plan especifico de mejora con revisiones semanales y consecuencias claras", score: 4, behaviorTag: "coaching-leader" },
      { id: "mu_e3_b", text: "Set up automated reminders and create a shared tracking system so deadlines are visible to the whole team", esText: "Configura recordatorios automatizados y crea un sistema de seguimiento compartido para que los plazos sean visibles para todo el equipo", score: 3, behaviorTag: "systematic-manager" },
      { id: "mu_e3_c", text: "Redistribute the reporting work to more reliable team members", esText: "Redistribuye el trabajo de informes a miembros del equipo mas confiables", score: 2, behaviorTag: "avoidant-leader" },
      { id: "mu_e3_d", text: "Submit the reports yourself rather than let them be late — you can't afford the compliance risk", esText: "Envia los informes tu mismo en vez de dejarlos llegar tarde — no puedes permitirte el riesgo de cumplimiento", score: 1, behaviorTag: "micromanager" },
    ],
  },

  // === GROWTH (3) ===
  {
    id: "mu_growth_1",
    domain: "growth",
    scenario: "A high-performing team member asks about career advancement opportunities. There's no formal career ladder at your FQHC for their role.",
    esScenario: "Un miembro de alto rendimiento del equipo pregunta sobre oportunidades de avance profesional. No existe una escalera profesional formal en tu FQHC para su rol.",
    question: "How do you support their professional growth?",
    esQuestion: "Como apoyas su crecimiento profesional?",
    options: [
      { id: "mu_g1_a", text: "Create a custom development plan: identify stretch assignments, cross-training opportunities, mentorship connections, and certifications that build toward their goals — even if the formal title doesn't exist yet", esText: "Crea un plan de desarrollo personalizado: identifica asignaciones de crecimiento, oportunidades de capacitacion cruzada, conexiones de mentoria y certificaciones que construyan hacia sus metas — incluso si el titulo formal aun no existe", score: 4, behaviorTag: "developer-of-people" },
      { id: "mu_g1_b", text: "Advocate to leadership for creating a lead or senior role, and give the team member more responsibility in the meantime", esText: "Aboga ante el liderazgo por crear un puesto de lider o senior, y dale al miembro del equipo mas responsabilidad mientras tanto", score: 3, behaviorTag: "advocate-leader" },
      { id: "mu_g1_c", text: "Be honest that advancement opportunities are limited and suggest they look for leadership roles at other FQHCs", esText: "Se honesto que las oportunidades de avance son limitadas y sugiere que busquen roles de liderazgo en otros FQHCs", score: 2, behaviorTag: "honest-but-passive" },
      { id: "mu_g1_d", text: "Tell them to be patient — opportunities come with time and tenure", esText: "Diles que sean pacientes — las oportunidades vienen con tiempo y antiguedad", score: 1, behaviorTag: "dismissive-leadership" },
    ],
  },
  {
    id: "mu_growth_2",
    domain: "growth",
    scenario: "You want to build a learning culture on your team, but your FQHC has very little training budget and staff are already stretched thin with patient care.",
    esScenario: "Quieres construir una cultura de aprendizaje en tu equipo, pero tu FQHC tiene muy poco presupuesto de capacitacion y el personal ya esta estirado con la atencion al paciente.",
    question: "How do you create learning opportunities with limited resources?",
    esQuestion: "Como creas oportunidades de aprendizaje con recursos limitados?",
    options: [
      { id: "mu_g2_a", text: "Create a peer learning program: 30-min monthly knowledge shares, cross-training rotations, case study discussions, and a shared resource library — leveraging your team's existing expertise", esText: "Crea un programa de aprendizaje entre pares: intercambios de conocimiento mensuales de 30 min, rotaciones de capacitacion cruzada, discusiones de estudios de caso y una biblioteca de recursos compartida — aprovechando la experiencia existente de tu equipo", score: 4, behaviorTag: "resourceful-leader" },
      { id: "mu_g2_b", text: "Find free external resources (webinars, online certifications, community health conferences) and build development goals into 1:1 meetings", esText: "Encuentra recursos externos gratuitos (webinars, certificaciones en linea, conferencias de salud comunitaria) e integra metas de desarrollo en las reuniones 1:1", score: 3, behaviorTag: "practical-developer" },
      { id: "mu_g2_c", text: "Request more training budget from leadership and wait until resources are available", esText: "Solicita mas presupuesto de capacitacion al liderazgo y espera hasta que los recursos esten disponibles", score: 2, behaviorTag: "dependent-manager" },
      { id: "mu_g2_d", text: "Focus on patient care first — learning and development can wait until staffing stabilizes", esText: "Enfocate en la atencion al paciente primero — el aprendizaje y desarrollo pueden esperar hasta que la dotacion se estabilice", score: 1, behaviorTag: "development-denier" },
    ],
  },
  {
    id: "mu_growth_3",
    domain: "growth",
    scenario: "One of your direct reports resists feedback. When you bring up areas for improvement, they become defensive, make excuses, or shut down.",
    esScenario: "Uno de tus subordinados directos resiste la retroalimentacion. Cuando traes areas de mejora, se ponen a la defensiva, dan excusas o se cierran.",
    question: "How do you approach giving feedback to this person?",
    esQuestion: "Como abordas dar retroalimentacion a esta persona?",
    options: [
      { id: "mu_g3_a", text: "Shift your approach: start with specific positive observations, ask them to self-assess first, focus on behaviors not character, and give feedback in smaller more frequent doses rather than big sit-downs", esText: "Cambia tu enfoque: comienza con observaciones positivas especificas, pideles que se autoevaluen primero, enfocate en comportamientos no en caracter, y da retroalimentacion en dosis mas pequenas y frecuentes en vez de grandes reuniones", score: 4, behaviorTag: "adaptive-coach" },
      { id: "mu_g3_b", text: "Have a meta-conversation about feedback itself — explain that receiving feedback is a professional skill, and ask what format would make it easier for them to hear", esText: "Ten una meta-conversacion sobre la retroalimentacion misma — explica que recibir retroalimentacion es una habilidad profesional, y pregunta que formato les haria mas facil escucharla", score: 3, behaviorTag: "transparent-leader" },
      { id: "mu_g3_c", text: "Put the feedback in writing instead of verbal conversations, so there's a clear record and less room for defensiveness", esText: "Pon la retroalimentacion por escrito en vez de conversaciones verbales, para que haya un registro claro y menos espacio para la defensividad", score: 2, behaviorTag: "process-first" },
      { id: "mu_g3_d", text: "Avoid giving feedback to avoid the conflict — just document issues and escalate to HR when it becomes a formal performance problem", esText: "Evita dar retroalimentacion para evitar el conflicto — solo documenta los problemas y escala a RH cuando se convierta en un problema formal de rendimiento", score: 1, behaviorTag: "conflict-avoider" },
    ],
  },

  // === TRANSITION (3) ===
  {
    id: "mu_transition_1",
    domain: "transition",
    scenario: "You're inheriting a team where 3 of 8 positions just turned over. The remaining 5 are demoralized and skeptical of yet another new manager.",
    esScenario: "Estas heredando un equipo donde 3 de 8 posiciones acaban de rotar. Los 5 restantes estan desmoralizados y escepticos de otro nuevo gerente mas.",
    question: "How do you diagnose the situation and begin building trust?",
    esQuestion: "Como diagnosticas la situacion y comienzas a construir confianza?",
    options: [
      { id: "mu_t1_a", text: "Spend your first 2 weeks in listening mode: 1:1 conversations with each remaining team member, shadow their work, learn the history of turnover, and explicitly commit to not making changes until you understand", esText: "Pasa tus primeras 2 semanas en modo de escucha: conversaciones 1:1 con cada miembro restante del equipo, acompana su trabajo, aprende la historia de la rotacion y comprometete explicitamente a no hacer cambios hasta que entiendas", score: 4, behaviorTag: "situation-diagnoser" },
      { id: "mu_t1_b", text: "Acknowledge the team's frustration openly, share your leadership style and values, and prioritize filling the vacant positions as fast as possible", esText: "Reconoce la frustracion del equipo abiertamente, comparte tu estilo de liderazgo y valores, y prioriza llenar las posiciones vacantes lo mas rapido posible", score: 3, behaviorTag: "transparent-leader" },
      { id: "mu_t1_c", text: "Review the team's performance data and identify quick wins to demonstrate that things are improving under your leadership", esText: "Revisa los datos de rendimiento del equipo e identifica logros rapidos para demostrar que las cosas estan mejorando bajo tu liderazgo", score: 2, behaviorTag: "data-first" },
      { id: "mu_t1_d", text: "Focus on hiring — the team needs more people more than anything. Once you're fully staffed, you can work on team dynamics", esText: "Enfocate en contratar — el equipo necesita mas personas mas que nada. Una vez que estes completamente dotado, puedes trabajar en la dinamica del equipo", score: 1, behaviorTag: "task-over-people" },
    ],
  },
  {
    id: "mu_transition_2",
    domain: "transition",
    scenario: "You're onboarding three new hires simultaneously into your team. Your FQHC doesn't have a formal onboarding program — it's been 'sink or swim' historically.",
    esScenario: "Estas incorporando tres nuevas contrataciones simultaneamente a tu equipo. Tu FQHC no tiene un programa formal de incorporacion — historicamente ha sido 'nadar o hundirse'.",
    question: "How do you set these new team members up for success?",
    esQuestion: "Como preparas a estos nuevos miembros del equipo para el exito?",
    options: [
      { id: "mu_t2_a", text: "Create a structured 30/60/90 day plan for each role, assign experienced team members as buddies, schedule weekly check-ins, and document the key systems/processes they need to learn", esText: "Crea un plan estructurado de 30/60/90 dias para cada rol, asigna miembros experimentados del equipo como companeros, programa revisiones semanales y documenta los sistemas/procesos clave que necesitan aprender", score: 4, behaviorTag: "structured-onboarder" },
      { id: "mu_t2_b", text: "Pair each new hire with a senior team member for their first month and check in weekly to see how they're adapting", esText: "Empareja cada nueva contratacion con un miembro senior del equipo para su primer mes y haz seguimiento semanal para ver como se estan adaptando", score: 3, behaviorTag: "mentor-connector" },
      { id: "mu_t2_c", text: "Give them the employee handbook, show them where everything is, and let them shadow other staff for a week before starting on their own", esText: "Dales el manual del empleado, muestrales donde esta todo y dejalos acompanar a otro personal durante una semana antes de empezar por su cuenta", score: 2, behaviorTag: "minimal-onboarder" },
      { id: "mu_t2_d", text: "Let them figure things out as they go — learning by doing is the fastest way to get up to speed in an FQHC", esText: "Dejalos que descubran las cosas sobre la marcha — aprender haciendo es la forma mas rapida de ponerse al dia en un FQHC", score: 1, behaviorTag: "sink-or-swim" },
    ],
  },
  {
    id: "mu_transition_3",
    domain: "transition",
    scenario: "Your FQHC is transitioning to a new CalAIM program model that changes how your team delivers services. Staff are confused about their new responsibilities.",
    esScenario: "Tu FQHC esta haciendo la transicion a un nuevo modelo de programa CalAIM que cambia como tu equipo entrega servicios. El personal esta confundido sobre sus nuevas responsabilidades.",
    question: "How do you lead your team through this organizational change?",
    esQuestion: "Como lideras a tu equipo a traves de este cambio organizacional?",
    options: [
      { id: "mu_t3_a", text: "Break the transition into phases, create a clear responsibility matrix (who does what now vs. before), hold a team workshop to co-create the new workflows, and build in regular feedback loops", esText: "Divide la transicion en fases, crea una matriz clara de responsabilidades (quien hace que ahora vs. antes), celebra un taller de equipo para co-crear los nuevos flujos de trabajo e integra ciclos regulares de retroalimentacion", score: 4, behaviorTag: "change-architect" },
      { id: "mu_t3_b", text: "Create a detailed FAQ document answering common questions, hold an all-hands meeting to present the changes, and be available for questions", esText: "Crea un documento detallado de preguntas frecuentes respondiendo preguntas comunes, celebra una reunion general para presentar los cambios y estate disponible para preguntas", score: 3, behaviorTag: "systematic-manager" },
      { id: "mu_t3_c", text: "Forward the CalAIM guidance documents from leadership and tell the team to review them, then schedule a meeting to discuss questions", esText: "Reenviale al equipo los documentos de guia CalAIM del liderazgo y dile que los revisen, luego programa una reunion para discutir preguntas", score: 2, behaviorTag: "pass-through-manager" },
      { id: "mu_t3_d", text: "Wait for more clarity from leadership before communicating anything to the team — you don't want to share incomplete information", esText: "Espera mas claridad del liderazgo antes de comunicar algo al equipo — no quieres compartir informacion incompleta", score: 1, behaviorTag: "avoidant-leader" },
    ],
  },
];

/* --- Role-Specific Manager Questions (20: 5 per role × 1/domain) --- */

const MANAGER_ROLE_SPECIFIC_QUESTIONS: (AssessmentQuestion & { roleId: LeadershipRoleId })[] = [
  // === PROGRAM MANAGER (5: 1 per domain) ===
  {
    id: "mr_pm_mission",
    roleId: "program_manager",
    domain: "mission",
    scenario: "Your ECM program's enrollment numbers are declining because patients are disengaging. Leadership is pressuring you for better numbers.",
    esScenario: "Los numeros de inscripcion de tu programa ECM estan disminuyendo porque los pacientes se estan desvinculando. El liderazgo te esta presionando por mejores numeros.",
    question: "How do you balance the pressure for numbers with meaningful patient engagement?",
    esQuestion: "Como equilibras la presion por numeros con un compromiso significativo con los pacientes?",
    options: [
      { id: "mr_pm_m_a", text: "Analyze why patients are disengaging (barriers, quality of interactions, staff burnout?), address root causes, and reframe success metrics around patient outcomes, not just enrollment counts", esText: "Analiza por que los pacientes se estan desvinculando (barreras, calidad de interacciones, agotamiento del personal?), aborda las causas raiz y reformula las metricas de exito en torno a resultados del paciente, no solo conteos de inscripcion", score: 4, behaviorTag: "mission-protector" },
      { id: "mr_pm_m_b", text: "Coach your team on re-engagement strategies while being transparent with leadership about the realistic timeline for improvement", esText: "Entrena a tu equipo en estrategias de re-vinculacion mientras eres transparente con el liderazgo sobre el cronograma realista de mejora", score: 3, behaviorTag: "balanced-leader" },
      { id: "mr_pm_m_c", text: "Set daily enrollment targets for your team and track them closely", esText: "Establece metas diarias de inscripcion para tu equipo y rastralas de cerca", score: 2, behaviorTag: "numbers-focused" },
      { id: "mr_pm_m_d", text: "Push the team harder to make more outreach calls and home visits to hit the numbers", esText: "Presiona al equipo mas fuerte para hacer mas llamadas de alcance y visitas domiciliarias para cumplir los numeros", score: 1, behaviorTag: "pressure-manager" },
    ],
  },
  {
    id: "mr_pm_people",
    roleId: "program_manager",
    domain: "people",
    scenario: "Your CHW team includes some members who've been doing this work for 10+ years and new hires fresh out of training. The veterans feel the new hires aren't 'street smart' enough.",
    esScenario: "Tu equipo de CHW incluye miembros que han estado haciendo este trabajo por 10+ anos y nuevas contrataciones recien salidas de la capacitacion. Los veteranos sienten que las nuevas contrataciones no son lo suficientemente 'callejeros'.",
    question: "How do you bridge this experience gap?",
    esQuestion: "Como conectas esta brecha de experiencia?",
    options: [
      { id: "mr_pm_p_a", text: "Pair veterans with new hires as mentors, create structured field shadowing, and celebrate what each generation brings — veterans' community knowledge and new hires' fresh training in CalAIM and evidence-based practices", esText: "Empareja veteranos con nuevas contrataciones como mentores, crea acompanamiento de campo estructurado y celebra lo que cada generacion aporta — el conocimiento comunitario de los veteranos y la capacitacion fresca de las nuevas contrataciones en CalAIM y practicas basadas en evidencia", score: 4, behaviorTag: "bridge-builder" },
      { id: "mr_pm_p_b", text: "Acknowledge the veterans' expertise publicly and ask them to lead orientation sessions for new hires", esText: "Reconoce la experiencia de los veteranos publicamente y pideles que lideren sesiones de orientacion para nuevas contrataciones", score: 3, behaviorTag: "respectful-manager" },
      { id: "mr_pm_p_c", text: "Remind the veterans that everyone was new once and they need to be welcoming", esText: "Recuerda a los veteranos que todos fueron nuevos una vez y necesitan ser acogedores", score: 2, behaviorTag: "surface-fix" },
      { id: "mr_pm_p_d", text: "Let it work itself out — new hires will earn respect over time through their work", esText: "Dejalo resolverse solo — las nuevas contrataciones ganaran respeto con el tiempo a traves de su trabajo", score: 1, behaviorTag: "passive-manager" },
    ],
  },
  {
    id: "mr_pm_exec",
    roleId: "program_manager",
    domain: "execution",
    scenario: "Your program has to submit a complex quarterly report to the managed care plan in 5 days. Your data analyst just quit, and the report requires pulling data from three different systems.",
    esScenario: "Tu programa tiene que enviar un informe trimestral complejo al plan de atencion administrada en 5 dias. Tu analista de datos acaba de renunciar y el informe requiere extraer datos de tres sistemas diferentes.",
    question: "How do you get this report done?",
    esQuestion: "Como logras completar este informe?",
    options: [
      { id: "mr_pm_e_a", text: "Break the report into components, assign each to the team member best suited to pull that data, create a shared document, set daily check-ins, and identify which sections are critical vs. supplemental", esText: "Divide el informe en componentes, asigna cada uno al miembro del equipo mejor preparado para extraer esos datos, crea un documento compartido, establece revisiones diarias e identifica que secciones son criticas vs. suplementarias", score: 4, behaviorTag: "crisis-organizer" },
      { id: "mr_pm_e_b", text: "Contact the managed care plan to request a brief extension while rallying the team to pull the data", esText: "Contacta al plan de atencion administrada para solicitar una breve extension mientras reunes al equipo para extraer los datos", score: 3, behaviorTag: "pragmatic-manager" },
      { id: "mr_pm_e_c", text: "Stay late and do most of the report yourself — you know the data best", esText: "Quedate hasta tarde y haz la mayor parte del informe tu mismo — tu conoces mejor los datos", score: 2, behaviorTag: "micromanager" },
      { id: "mr_pm_e_d", text: "Escalate to your director that the report can't be done without a data analyst", esText: "Escala a tu director que el informe no se puede hacer sin un analista de datos", score: 1, behaviorTag: "escalation-dependent" },
    ],
  },
  {
    id: "mr_pm_growth",
    roleId: "program_manager",
    domain: "growth",
    scenario: "CalAIM requirements keep changing and your team is struggling to stay current. You've had 3 different compliance updates in the past 2 months.",
    esScenario: "Los requisitos de CalAIM siguen cambiando y tu equipo esta luchando por mantenerse al dia. Has tenido 3 actualizaciones de cumplimiento diferentes en los ultimos 2 meses.",
    question: "How do you keep your team current and compliant?",
    esQuestion: "Como mantienes a tu equipo actualizado y en cumplimiento?",
    options: [
      { id: "mr_pm_g_a", text: "Designate a 'CalAIM champion' on the team who tracks changes, create a living FAQ document, hold monthly update sessions, and build compliance checks into daily workflows rather than treating them as separate tasks", esText: "Designa un 'campeon de CalAIM' en el equipo que rastree cambios, crea un documento de preguntas frecuentes vivo, celebra sesiones de actualizacion mensuales e integra verificaciones de cumplimiento en los flujos de trabajo diarios en vez de tratarlas como tareas separadas", score: 4, behaviorTag: "systems-thinker" },
      { id: "mr_pm_g_b", text: "Summarize each update into a 1-page brief for the team and test their understanding through case scenarios", esText: "Resume cada actualizacion en un resumen de 1 pagina para el equipo y prueba su comprension a traves de escenarios de casos", score: 3, behaviorTag: "practical-developer" },
      { id: "mr_pm_g_c", text: "Forward the compliance updates to the team and tell them to review them", esText: "Reenviale al equipo las actualizaciones de cumplimiento y dile que las revisen", score: 2, behaviorTag: "pass-through-manager" },
      { id: "mr_pm_g_d", text: "Wait for the dust to settle — no point in training on requirements that might change again next month", esText: "Espera a que se asiente el polvo — no tiene sentido capacitar en requisitos que podrian cambiar de nuevo el proximo mes", score: 1, behaviorTag: "development-denier" },
    ],
  },
  {
    id: "mr_pm_transition",
    roleId: "program_manager",
    domain: "transition",
    scenario: "You just took over a CalAIM program from a manager who left with no documentation. The team has been running on autopilot for 3 weeks.",
    esScenario: "Acabas de hacerte cargo de un programa CalAIM de un gerente que se fue sin documentacion. El equipo ha estado funcionando en piloto automatico durante 3 semanas.",
    question: "How do you assess the program's current state and get organized?",
    esQuestion: "Como evaluas el estado actual del programa y te organizas?",
    options: [
      { id: "mr_pm_t_a", text: "Interview each team member to map current workflows, review the last 3 months of data/reports, identify gaps and risks, then create a 30-day stabilization plan before making any changes", esText: "Entrevista a cada miembro del equipo para mapear los flujos de trabajo actuales, revisa los ultimos 3 meses de datos/informes, identifica brechas y riesgos, luego crea un plan de estabilizacion de 30 dias antes de hacer cualquier cambio", score: 4, behaviorTag: "situation-diagnoser" },
      { id: "mr_pm_t_b", text: "Focus on the most urgent deliverables first (upcoming reports, compliance deadlines) while learning the program in parallel", esText: "Enfocate en los entregables mas urgentes primero (proximos informes, plazos de cumplimiento) mientras aprendes el programa en paralelo", score: 3, behaviorTag: "pragmatic-manager" },
      { id: "mr_pm_t_c", text: "Ask leadership for the program's goals and KPIs, then work backward to understand what the team should be doing", esText: "Pide al liderazgo las metas y KPIs del programa, luego trabaja hacia atras para entender que deberia estar haciendo el equipo", score: 2, behaviorTag: "top-down-manager" },
      { id: "mr_pm_t_d", text: "Let the team keep running as they have been — they know the work better than you do at this point", esText: "Deja que el equipo siga funcionando como lo ha estado haciendo — ellos conocen el trabajo mejor que tu en este punto", score: 1, behaviorTag: "passive-manager" },
    ],
  },

  // === CLINICAL SUPERVISOR (5: 1 per domain) ===
  {
    id: "mr_cs_mission",
    roleId: "clinical_supervisor",
    domain: "mission",
    scenario: "Your clinical staff are burning out — high patient volumes, complex cases, and emotional exhaustion are taking a toll. Two nurses are talking about leaving.",
    esScenario: "Tu personal clinico se esta agotando — altos volumenes de pacientes, casos complejos y agotamiento emocional estan cobrando su precio. Dos enfermeros estan hablando de irse.",
    question: "How do you address burnout while maintaining patient care?",
    esQuestion: "Como abordas el agotamiento mientras mantienes la atencion al paciente?",
    options: [
      { id: "mr_cs_m_a", text: "Implement immediate relief (reduce non-essential tasks, adjust schedules), create space for processing (weekly check-ins, peer support), and reconnect the team to patient impact — share patient stories and outcomes data that show their work matters", esText: "Implementa alivio inmediato (reduce tareas no esenciales, ajusta horarios), crea espacio para procesar (revisiones semanales, apoyo entre pares) y reconecta al equipo con el impacto en pacientes — comparte historias de pacientes y datos de resultados que muestren que su trabajo importa", score: 4, behaviorTag: "burnout-preventer" },
      { id: "mr_cs_m_b", text: "Meet with the two nurses individually to understand their specific concerns and work on retention plans (schedule flexibility, development opportunities)", esText: "Reune con los dos enfermeros individualmente para entender sus preocupaciones especificas y trabaja en planes de retencion (flexibilidad de horario, oportunidades de desarrollo)", score: 3, behaviorTag: "retention-focused" },
      { id: "mr_cs_m_c", text: "Organize a team outing or appreciation event to boost morale", esText: "Organiza una salida de equipo o evento de apreciacion para mejorar la moral", score: 2, behaviorTag: "surface-fix" },
      { id: "mr_cs_m_d", text: "Everyone in healthcare is burned out right now — it's not unique to your team and there's not much you can do about it", esText: "Todos en salud estan agotados ahora mismo — no es unico de tu equipo y no hay mucho que puedas hacer al respecto", score: 1, behaviorTag: "dismissive-leadership" },
    ],
  },
  {
    id: "mr_cs_people",
    roleId: "clinical_supervisor",
    domain: "people",
    scenario: "A provider complains that your MA isn't rooming patients fast enough. The MA says the provider's expectations are unreasonable and they feel disrespected.",
    esScenario: "Un proveedor se queja de que tu asistente medico no esta preparando pacientes lo suficientemente rapido. El asistente medico dice que las expectativas del proveedor son irrazonables y se siente irrespetado.",
    question: "How do you mediate between the provider and the MA?",
    esQuestion: "Como medias entre el proveedor y el asistente medico?",
    options: [
      { id: "mr_cs_p_a", text: "Observe both the MA's rooming workflow and the provider's expectations independently, then facilitate a joint conversation focused on shared goals (patient flow) and specific, measurable workflow agreements", esText: "Observa tanto el flujo de trabajo de preparacion del asistente medico como las expectativas del proveedor independientemente, luego facilita una conversacion conjunta enfocada en metas compartidas (flujo de pacientes) y acuerdos especificos y medibles de flujo de trabajo", score: 4, behaviorTag: "evidence-based-mediator" },
      { id: "mr_cs_p_b", text: "Meet with each person separately, validate both perspectives, and work out a compromise on timing expectations", esText: "Reune con cada persona por separado, valida ambas perspectivas y busca un compromiso sobre expectativas de tiempo", score: 3, behaviorTag: "empathetic-manager" },
      { id: "mr_cs_p_c", text: "Tell the MA to pick up the pace — providers set the clinical pace and support staff need to match it", esText: "Dile al asistente medico que se apure — los proveedores establecen el ritmo clinico y el personal de apoyo necesita igualarlo", score: 2, behaviorTag: "one-sided-manager" },
      { id: "mr_cs_p_d", text: "Move the MA to a different provider to avoid ongoing friction", esText: "Mueve al asistente medico a un proveedor diferente para evitar friccion continua", score: 1, behaviorTag: "conflict-avoider" },
    ],
  },
  {
    id: "mr_cs_exec",
    roleId: "clinical_supervisor",
    domain: "execution",
    scenario: "Your clinic's immunization rates for pediatric patients have dropped below the state benchmark. Leadership wants a plan to improve them within 60 days.",
    esScenario: "Las tasas de inmunizacion de tu clinica para pacientes pediatricos han caido por debajo del punto de referencia estatal. El liderazgo quiere un plan para mejorarlas en 60 dias.",
    question: "How do you develop and implement the improvement plan?",
    esQuestion: "Como desarrollas e implementas el plan de mejora?",
    options: [
      { id: "mr_cs_e_a", text: "Pull the data to understand where the gap is (which vaccines, which providers, which patient populations), involve the care team in designing solutions, implement pre-visit planning to catch gaps, and track weekly progress", esText: "Extrae los datos para entender donde esta la brecha (que vacunas, que proveedores, que poblaciones de pacientes), involucra al equipo de atencion en disenar soluciones, implementa planificacion previa a la visita para detectar brechas y rastrea el progreso semanalmente", score: 4, behaviorTag: "data-driven-improver" },
      { id: "mr_cs_e_b", text: "Set up an immunization standing order protocol and assign MAs to flag overdue vaccinations during check-in", esText: "Establece un protocolo de orden permanente de inmunizacion y asigna asistentes medicos para senalar vacunaciones vencidas durante el registro", score: 3, behaviorTag: "systematic-manager" },
      { id: "mr_cs_e_c", text: "Send reminders to providers about checking immunization status at every visit", esText: "Envia recordatorios a los proveedores sobre verificar el estado de inmunizacion en cada visita", score: 2, behaviorTag: "surface-fix" },
      { id: "mr_cs_e_d", text: "The rates dropped because of pandemic-related appointment cancellations — they'll recover on their own as patients return", esText: "Las tasas bajaron por cancelaciones de citas relacionadas con la pandemia — se recuperaran por su cuenta cuando los pacientes regresen", score: 1, behaviorTag: "passive-manager" },
    ],
  },
  {
    id: "mr_cs_growth",
    roleId: "clinical_supervisor",
    domain: "growth",
    scenario: "A talented LVN on your team wants to pursue their RN degree but is worried about balancing school, work, and their family responsibilities.",
    esScenario: "Un LVN talentoso de tu equipo quiere obtener su titulo de RN pero esta preocupado por equilibrar la escuela, el trabajo y sus responsabilidades familiares.",
    question: "How do you support their advancement?",
    esQuestion: "Como apoyas su avance?",
    options: [
      { id: "mr_cs_g_a", text: "Work together to create a flexible schedule that accommodates their classes, connect them with tuition assistance programs (NHSC, employer benefits), identify clinical experiences on the job that count toward their degree requirements, and check in monthly on their progress", esText: "Trabajen juntos para crear un horario flexible que acomode sus clases, conectalos con programas de asistencia de matricula (NHSC, beneficios del empleador), identifica experiencias clinicas en el trabajo que cuenten para los requisitos de su titulo y haz seguimiento mensual de su progreso", score: 4, behaviorTag: "developer-of-people" },
      { id: "mr_cs_g_b", text: "Approve schedule flexibility and share information about education benefits available at the FQHC", esText: "Aprueba flexibilidad de horario y comparte informacion sobre beneficios educativos disponibles en el FQHC", score: 3, behaviorTag: "supportive-manager" },
      { id: "mr_cs_g_c", text: "Encourage them to pursue it but explain that you can't make schedule accommodations because it would be unfair to other staff", esText: "Animalos a seguir adelante pero explica que no puedes hacer acomodaciones de horario porque seria injusto para el otro personal", score: 2, behaviorTag: "fairness-over-development" },
      { id: "mr_cs_g_d", text: "Suggest they wait until their kids are older — juggling school and work with a family is really hard", esText: "Sugiereles que esperen hasta que sus hijos sean mayores — equilibrar escuela y trabajo con familia es realmente dificil", score: 1, behaviorTag: "development-denier" },
    ],
  },
  {
    id: "mr_cs_transition",
    roleId: "clinical_supervisor",
    domain: "transition",
    scenario: "Your FQHC is opening a new clinic site and you need to split your existing team between two locations while hiring additional staff for the new site.",
    esScenario: "Tu FQHC esta abriendo un nuevo sitio de clinica y necesitas dividir tu equipo existente entre dos ubicaciones mientras contratas personal adicional para el nuevo sitio.",
    question: "How do you manage this transition?",
    esQuestion: "Como manejas esta transicion?",
    options: [
      { id: "mr_cs_t_a", text: "Involve the team in the decision: ask who wants to go to the new site, match staff strengths to each site's patient population, create a transition plan with overlap periods, and establish consistent protocols across both sites", esText: "Involucra al equipo en la decision: pregunta quien quiere ir al nuevo sitio, empareja las fortalezas del personal con la poblacion de pacientes de cada sitio, crea un plan de transicion con periodos de superposicion y establece protocolos consistentes en ambos sitios", score: 4, behaviorTag: "collaborative-planner" },
      { id: "mr_cs_t_b", text: "Assess which staff are most adaptable and assign them to the new site, keeping your most experienced team at the established location", esText: "Evalua que personal es mas adaptable y asignalos al nuevo sitio, manteniendo a tu equipo mas experimentado en la ubicacion establecida", score: 3, behaviorTag: "strategic-assigner" },
      { id: "mr_cs_t_c", text: "Send your best performers to the new site to ensure it starts strong", esText: "Envia a tus mejores empleados al nuevo sitio para asegurar que comience fuerte", score: 2, behaviorTag: "outcome-focused" },
      { id: "mr_cs_t_d", text: "Assign staff based on where they live — proximity to the clinic is the most practical factor", esText: "Asigna personal basandote en donde viven — la proximidad a la clinica es el factor mas practico", score: 1, behaviorTag: "convenience-focused" },
    ],
  },

  // === OPERATIONS DIRECTOR (5: 1 per domain) ===
  {
    id: "mr_od_mission",
    roleId: "operations_director",
    domain: "mission",
    scenario: "Budget cuts require you to reduce your department's spending by 15%. You need to make tough decisions about which programs and positions to cut.",
    esScenario: "Los recortes de presupuesto requieren que reduzcas el gasto de tu departamento en un 15%. Necesitas tomar decisiones dificiles sobre que programas y posiciones recortar.",
    question: "How do you approach these cuts while protecting the mission?",
    esQuestion: "Como abordas estos recortes mientras proteges la mision?",
    options: [
      { id: "mr_od_m_a", text: "Analyze which programs have the highest patient impact per dollar, protect frontline patient care positions, find efficiency gains before cutting positions, and be transparent with staff about the process and rationale", esText: "Analiza que programas tienen el mayor impacto por dolar en pacientes, protege posiciones de atencion directa al paciente, encuentra ganancias de eficiencia antes de cortar posiciones y se transparente con el personal sobre el proceso y la justificacion", score: 4, behaviorTag: "mission-protector" },
      { id: "mr_od_m_b", text: "Consult with department leads to identify the least critical functions and make cuts collaboratively", esText: "Consulta con los lideres de departamento para identificar las funciones menos criticas y haz recortes de manera colaborativa", score: 3, behaviorTag: "collaborative-planner" },
      { id: "mr_od_m_c", text: "Apply across-the-board cuts evenly to every department to be fair", esText: "Aplica recortes uniformes a todos los departamentos para ser justo", score: 2, behaviorTag: "fairness-over-strategy" },
      { id: "mr_od_m_d", text: "Cut the newest programs first since they have the least established impact", esText: "Corta los programas mas nuevos primero ya que tienen el impacto menos establecido", score: 1, behaviorTag: "recency-biased" },
    ],
  },
  {
    id: "mr_od_people",
    roleId: "operations_director",
    domain: "people",
    scenario: "Your department has high turnover. Exit interviews consistently cite 'lack of appreciation' and 'poor management' as reasons for leaving — but you're not sure which managers are the problem.",
    esScenario: "Tu departamento tiene alta rotacion. Las entrevistas de salida consistentemente citan 'falta de apreciacion' y 'mala gestion' como razones para irse — pero no estas seguro de que gerentes son el problema.",
    question: "How do you address the systemic management quality issue?",
    esQuestion: "Como abordas el problema sistemico de calidad de gestion?",
    options: [
      { id: "mr_od_p_a", text: "Implement regular pulse surveys (anonymous, by team), review turnover data by manager, invest in manager training, and create a feedback loop where staff can flag concerns early", esText: "Implementa encuestas de pulso regulares (anonimas, por equipo), revisa datos de rotacion por gerente, invierte en capacitacion de gerentes y crea un ciclo de retroalimentacion donde el personal pueda senalar preocupaciones temprano", score: 4, behaviorTag: "systems-thinker" },
      { id: "mr_od_p_b", text: "Meet with each manager 1:1 to share the exit interview themes, set expectations for team engagement, and monitor improvement", esText: "Reune con cada gerente 1:1 para compartir los temas de las entrevistas de salida, establece expectativas de compromiso del equipo y monitorea la mejora", score: 3, behaviorTag: "direct-communicator" },
      { id: "mr_od_p_c", text: "Increase pay and benefits to improve retention — compensation is usually the real issue behind 'management' complaints", esText: "Aumenta el salario y los beneficios para mejorar la retencion — la compensacion es generalmente el verdadero problema detras de las quejas sobre 'gestion'", score: 2, behaviorTag: "money-fix" },
      { id: "mr_od_p_d", text: "High turnover is normal in FQHCs — focus on hiring faster rather than trying to fix the management culture", esText: "La alta rotacion es normal en los FQHCs — enfocate en contratar mas rapido en vez de intentar arreglar la cultura de gestion", score: 1, behaviorTag: "normalization-bias" },
    ],
  },
  {
    id: "mr_od_exec",
    roleId: "operations_director",
    domain: "execution",
    scenario: "Three of your six clinic sites consistently underperform on quality metrics while the other three exceed benchmarks. The underperforming sites blame their patient population complexity.",
    esScenario: "Tres de tus seis sitios de clinica consistentemente tienen bajo rendimiento en metricas de calidad mientras los otros tres superan los puntos de referencia. Los sitios de bajo rendimiento culpan a la complejidad de su poblacion de pacientes.",
    question: "How do you close the performance gap between sites?",
    esQuestion: "Como cierras la brecha de rendimiento entre sitios?",
    options: [
      { id: "mr_od_e_a", text: "Compare workflows and practices between high and low performing sites (not just outcomes), identify what the top sites do differently, facilitate cross-site learning visits, and adjust for patient complexity in metrics to make comparisons fair", esText: "Compara flujos de trabajo y practicas entre sitios de alto y bajo rendimiento (no solo resultados), identifica que hacen diferente los mejores sitios, facilita visitas de aprendizaje entre sitios y ajusta por complejidad del paciente en las metricas para hacer comparaciones justas", score: 4, behaviorTag: "data-driven-improver" },
      { id: "mr_od_e_b", text: "Set performance improvement plans for underperforming site managers with specific targets and monthly reviews", esText: "Establece planes de mejora de rendimiento para los gerentes de sitios de bajo rendimiento con metas especificas y revisiones mensuales", score: 3, behaviorTag: "accountability-focused" },
      { id: "mr_od_e_c", text: "Move some of the top-performing staff to the underperforming sites to share their practices", esText: "Mueve a parte del personal de alto rendimiento a los sitios de bajo rendimiento para compartir sus practicas", score: 2, behaviorTag: "resource-shuffler" },
      { id: "mr_od_e_d", text: "Accept that some sites will always underperform due to patient complexity differences", esText: "Acepta que algunos sitios siempre tendran bajo rendimiento debido a diferencias en la complejidad de los pacientes", score: 1, behaviorTag: "excuse-accepter" },
    ],
  },
  {
    id: "mr_od_growth",
    roleId: "operations_director",
    domain: "growth",
    scenario: "You realize that none of your department's middle managers are ready to step into your role if you leave. There's no succession pipeline.",
    esScenario: "Te das cuenta de que ninguno de los gerentes intermedios de tu departamento esta listo para asumir tu rol si te vas. No hay un canal de sucesion.",
    question: "How do you build a leadership pipeline?",
    esQuestion: "Como construyes un canal de liderazgo?",
    options: [
      { id: "mr_od_g_a", text: "Identify 2-3 high-potential managers, create individual development plans with stretch assignments (budget management, board presentations, strategic planning), provide executive coaching, and gradually delegate more decision-making authority", esText: "Identifica 2-3 gerentes de alto potencial, crea planes de desarrollo individuales con asignaciones de crecimiento (gestion de presupuesto, presentaciones ante la junta, planificacion estrategica), proporciona coaching ejecutivo y gradualmente delega mas autoridad de toma de decisiones", score: 4, behaviorTag: "succession-planner" },
      { id: "mr_od_g_b", text: "Start inviting your managers to leadership meetings and giving them visibility with senior leadership", esText: "Comienza a invitar a tus gerentes a reuniones de liderazgo y dales visibilidad con el liderazgo senior", score: 3, behaviorTag: "exposure-builder" },
      { id: "mr_od_g_c", text: "Recommend that HR create a formal leadership development program", esText: "Recomienda que RH cree un programa formal de desarrollo de liderazgo", score: 2, behaviorTag: "delegation-to-hr" },
      { id: "mr_od_g_d", text: "You don't plan to leave anytime soon, so succession planning isn't urgent right now", esText: "No planeas irte pronto, asi que la planificacion de sucesion no es urgente ahora mismo", score: 1, behaviorTag: "short-term-thinker" },
    ],
  },
  {
    id: "mr_od_transition",
    roleId: "operations_director",
    domain: "transition",
    scenario: "Your FQHC just merged with another community health center. You need to integrate two different operational systems, cultures, and staff teams.",
    esScenario: "Tu FQHC acaba de fusionarse con otro centro de salud comunitario. Necesitas integrar dos sistemas operativos, culturas y equipos de personal diferentes.",
    question: "How do you approach this major organizational transition?",
    esQuestion: "Como abordas esta transicion organizacional importante?",
    options: [
      { id: "mr_od_t_a", text: "Create a transition task force with representatives from both organizations, map all operational systems side-by-side, establish a phased integration timeline, communicate frequently and transparently, and protect patient care continuity above everything else", esText: "Crea un grupo de trabajo de transicion con representantes de ambas organizaciones, mapea todos los sistemas operativos lado a lado, establece un cronograma de integracion por fases, comunica frecuente y transparentemente y protege la continuidad de la atencion al paciente por encima de todo", score: 4, behaviorTag: "change-architect" },
      { id: "mr_od_t_b", text: "Identify the best practices from each organization and adopt the superior system for each function", esText: "Identifica las mejores practicas de cada organizacion y adopta el sistema superior para cada funcion", score: 3, behaviorTag: "best-practice-selector" },
      { id: "mr_od_t_c", text: "Move quickly to get everyone on the same systems — the longer two systems run, the more confusion there is", esText: "Muevete rapidamente para poner a todos en los mismos sistemas — cuanto mas tiempo funcionen dos sistemas, mas confusion hay", score: 2, behaviorTag: "speed-over-care" },
      { id: "mr_od_t_d", text: "Keep both systems running in parallel indefinitely until it becomes clear which one is better", esText: "Mantén ambos sistemas funcionando en paralelo indefinidamente hasta que quede claro cual es mejor", score: 1, behaviorTag: "indecisive-leader" },
    ],
  },

  // === EXECUTIVE DIRECTOR (5: 1 per domain) ===
  {
    id: "mr_ed_mission",
    roleId: "executive_director",
    domain: "mission",
    scenario: "A potential major funder wants your FQHC to shift focus to a patient population that doesn't align with your community's greatest needs. The funding would significantly help your budget.",
    esScenario: "Un posible financiador importante quiere que tu FQHC cambie el enfoque a una poblacion de pacientes que no se alinea con las mayores necesidades de tu comunidad. El financiamiento ayudaria significativamente a tu presupuesto.",
    question: "How do you balance financial sustainability with mission integrity?",
    esQuestion: "Como equilibras la sostenibilidad financiera con la integridad de la mision?",
    options: [
      { id: "mr_ed_m_a", text: "Explore whether the funding can be structured to serve both the funder's population and your community — propose a model that extends services without diverting from your core mission. If not, be willing to walk away.", esText: "Explora si el financiamiento puede estructurarse para servir tanto a la poblacion del financiador como a tu comunidad — propone un modelo que extienda los servicios sin desviarse de tu mision central. Si no, estate dispuesto a rechazarlo.", score: 4, behaviorTag: "mission-protector" },
      { id: "mr_ed_m_b", text: "Accept the funding but negotiate terms that ensure your existing community services aren't reduced", esText: "Acepta el financiamiento pero negocia terminos que aseguren que los servicios comunitarios existentes no se reduzcan", score: 3, behaviorTag: "pragmatic-negotiator" },
      { id: "mr_ed_m_c", text: "Take the funding — financial sustainability is what allows you to serve any community at all", esText: "Acepta el financiamiento — la sostenibilidad financiera es lo que te permite servir a cualquier comunidad", score: 2, behaviorTag: "financially-driven" },
      { id: "mr_ed_m_d", text: "Decline the funding immediately — mission alignment is non-negotiable", esText: "Rechaza el financiamiento inmediatamente — la alineacion con la mision no es negociable", score: 1, behaviorTag: "rigid-idealist" },
    ],
  },
  {
    id: "mr_ed_people",
    roleId: "executive_director",
    domain: "people",
    scenario: "Your leadership team is siloed — each department head runs their own area but there's minimal collaboration, shared problem-solving, or collective ownership of organizational goals.",
    esScenario: "Tu equipo de liderazgo esta aislado — cada jefe de departamento maneja su propia area pero hay minima colaboracion, resolucion de problemas compartida o propiedad colectiva de las metas organizacionales.",
    question: "How do you build a more cohesive leadership team?",
    esQuestion: "Como construyes un equipo de liderazgo mas cohesivo?",
    options: [
      { id: "mr_ed_p_a", text: "Restructure leadership meetings around shared organizational goals (not department updates), create cross-functional projects that require collaboration, model vulnerability by sharing your own challenges, and establish shared accountability metrics", esText: "Reestructura las reuniones de liderazgo alrededor de metas organizacionales compartidas (no actualizaciones departamentales), crea proyectos multifuncionales que requieran colaboracion, modela la vulnerabilidad compartiendo tus propios desafios y establece metricas de rendicion de cuentas compartidas", score: 4, behaviorTag: "team-builder" },
      { id: "mr_ed_p_b", text: "Hold a leadership retreat to align on vision and build personal connections, then follow up with regular cross-department check-ins", esText: "Celebra un retiro de liderazgo para alinearse en la vision y construir conexiones personales, luego haz seguimiento con revisiones regulares entre departamentos", score: 3, behaviorTag: "relationship-builder" },
      { id: "mr_ed_p_c", text: "Set clear expectations that collaboration is required and evaluate it in performance reviews", esText: "Establece expectativas claras de que la colaboracion es requerida y evaluala en las revisiones de rendimiento", score: 2, behaviorTag: "mandate-manager" },
      { id: "mr_ed_p_d", text: "Some silos are healthy — department heads need autonomy to run their areas effectively", esText: "Algunos silos son saludables — los jefes de departamento necesitan autonomia para manejar sus areas efectivamente", score: 1, behaviorTag: "status-quo-accepter" },
    ],
  },
  {
    id: "mr_ed_exec",
    roleId: "executive_director",
    domain: "execution",
    scenario: "Your FQHC's revenue cycle is struggling — denial rates are up 20%, days in A/R are increasing, and you're at risk of cash flow problems within 6 months.",
    esScenario: "El ciclo de ingresos de tu FQHC esta en dificultades — las tasas de denegacion subieron un 20%, los dias en cuentas por cobrar estan aumentando y estas en riesgo de problemas de flujo de caja en 6 meses.",
    question: "How do you approach this financial operational crisis?",
    esQuestion: "Como abordas esta crisis operativa financiera?",
    options: [
      { id: "mr_ed_e_a", text: "Commission an immediate root cause analysis (payer mix changes? coding errors? documentation gaps?), set up a daily denial review process, bring in revenue cycle expertise if needed, and create a 90-day financial recovery plan with the CFO", esText: "Encarga un analisis inmediato de causa raiz (cambios en mix de pagadores? errores de codificacion? brechas de documentacion?), establece un proceso diario de revision de denegaciones, trae experiencia en ciclo de ingresos si es necesario y crea un plan de recuperacion financiera de 90 dias con el CFO", score: 4, behaviorTag: "crisis-organizer" },
      { id: "mr_ed_e_b", text: "Meet with the revenue cycle team to understand the issues, set clear improvement targets, and review progress weekly", esText: "Reune con el equipo de ciclo de ingresos para entender los problemas, establece metas claras de mejora y revisa el progreso semanalmente", score: 3, behaviorTag: "accountability-focused" },
      { id: "mr_ed_e_c", text: "Hire a consultant to fix the revenue cycle — this is too specialized for your team to handle internally", esText: "Contrata a un consultor para arreglar el ciclo de ingresos — esto es demasiado especializado para que tu equipo lo maneje internamente", score: 2, behaviorTag: "outsource-dependent" },
      { id: "mr_ed_e_d", text: "Apply for emergency bridge funding or a line of credit to cover the cash flow gap while things improve", esText: "Solicita financiamiento puente de emergencia o una linea de credito para cubrir la brecha de flujo de caja mientras las cosas mejoran", score: 1, behaviorTag: "symptom-treater" },
    ],
  },
  {
    id: "mr_ed_growth",
    roleId: "executive_director",
    domain: "growth",
    scenario: "Your board asks you to present a 5-year strategic plan. You've been so focused on day-to-day operations that you haven't had time for long-term thinking.",
    esScenario: "Tu junta te pide que presentes un plan estrategico de 5 anos. Has estado tan enfocado en las operaciones del dia a dia que no has tenido tiempo para pensar a largo plazo.",
    question: "How do you shift from reactive operations to strategic planning?",
    esQuestion: "Como cambias de operaciones reactivas a planificacion estrategica?",
    options: [
      { id: "mr_ed_g_a", text: "Block dedicated strategy time on your calendar, involve your leadership team in the planning process, analyze market trends and community health data, engage community members for input, and present a plan that balances aspirational goals with operational reality", esText: "Bloquea tiempo dedicado a estrategia en tu calendario, involucra a tu equipo de liderazgo en el proceso de planificacion, analiza tendencias del mercado y datos de salud comunitaria, involucra a miembros de la comunidad para su aporte y presenta un plan que equilibre metas aspiracionales con la realidad operativa", score: 4, behaviorTag: "strategic-thinker" },
      { id: "mr_ed_g_b", text: "Hire a strategic planning consultant to facilitate the process and help structure the plan", esText: "Contrata a un consultor de planificacion estrategica para facilitar el proceso y ayudar a estructurar el plan", score: 3, behaviorTag: "resourceful-leader" },
      { id: "mr_ed_g_c", text: "Draft the plan yourself based on your operational experience and present it to the board for feedback", esText: "Redacta el plan tu mismo basandote en tu experiencia operativa y presentalo a la junta para retroalimentacion", score: 2, behaviorTag: "solo-planner" },
      { id: "mr_ed_g_d", text: "Tell the board that 5-year planning isn't realistic in the current environment — too much is changing too fast", esText: "Dile a la junta que la planificacion a 5 anos no es realista en el entorno actual — demasiado esta cambiando demasiado rapido", score: 1, behaviorTag: "planning-resistor" },
    ],
  },
  {
    id: "mr_ed_transition",
    roleId: "executive_director",
    domain: "transition",
    scenario: "You've been in your role for 6 months and realize the organization's biggest challenge isn't what you were told during the hiring process. The real issue is a toxic middle management layer that leadership has been ignoring.",
    esScenario: "Has estado en tu rol por 6 meses y te das cuenta de que el mayor desafio de la organizacion no es lo que te dijeron durante el proceso de contratacion. El verdadero problema es una capa de gerencia media toxica que el liderazgo ha estado ignorando.",
    question: "How do you address a systemic problem that wasn't part of your original mandate?",
    esQuestion: "Como abordas un problema sistemico que no era parte de tu mandato original?",
    options: [
      { id: "mr_ed_t_a", text: "Gather concrete evidence (turnover data, employee surveys, exit interviews), present the case to the board with both the problem and a proposed solution, set clear behavioral expectations for managers, and be willing to make tough personnel decisions with support and fairness", esText: "Reune evidencia concreta (datos de rotacion, encuestas de empleados, entrevistas de salida), presenta el caso a la junta con tanto el problema como una solucion propuesta, establece expectativas conductuales claras para los gerentes y estate dispuesto a tomar decisiones dificiles de personal con apoyo y justicia", score: 4, behaviorTag: "courageous-leader" },
      { id: "mr_ed_t_b", text: "Start coaching the problematic managers individually — give them a chance to improve before taking action", esText: "Comienza a entrenar a los gerentes problematicos individualmente — dales una oportunidad de mejorar antes de tomar accion", score: 3, behaviorTag: "patient-educator" },
      { id: "mr_ed_t_c", text: "Focus on your original mandate first and deal with the management culture issue later once you've established credibility", esText: "Enfocate en tu mandato original primero y aborda el tema de la cultura de gestion despues de haber establecido credibilidad", score: 2, behaviorTag: "deferral-strategy" },
      { id: "mr_ed_t_d", text: "It's not your place to address culture issues in your first year — you need to earn trust before making changes", esText: "No es tu lugar abordar problemas de cultura en tu primer ano — necesitas ganarte la confianza antes de hacer cambios", score: 1, behaviorTag: "avoidant-leader" },
    ],
  },
];

/* --- Question Selection -------------------------------------------- */

export function getManagerQuestionsForRole(roleId: LeadershipRoleId): AssessmentQuestion[] {
  const domainIds: DomainId[] = ["mission", "people", "execution", "growth", "transition"];
  const selected: AssessmentQuestion[] = [];

  for (const domain of domainIds) {
    // 2 universal per domain
    const universalForDomain = MANAGER_UNIVERSAL_QUESTIONS.filter((q) => q.domain === domain);
    selected.push(...universalForDomain.slice(0, 2));

    // 1 role-specific per domain
    const roleSpecific = MANAGER_ROLE_SPECIFIC_QUESTIONS.find(
      (q) => q.roleId === roleId && q.domain === domain,
    );
    if (roleSpecific) {
      selected.push(roleSpecific);
    } else {
      // Fallback: use 3rd universal question for this domain
      if (universalForDomain.length > 2) {
        selected.push(universalForDomain[2]);
      }
    }
  }

  return selected; // 15 questions (3 per domain × 5 domains)
}

/* --- Scoring ------------------------------------------------------- */

export function calculateManagerResults(
  answers: Record<string, string>,
  questions: AssessmentQuestion[],
  roleId: LeadershipRoleId,
  locale?: string,
): ManagerAssessmentResults {
  const domainIds: DomainId[] = ["mission", "people", "execution", "growth", "transition"];
  const domainTotals: Record<DomainId, { score: number; max: number }> = {
    mission: { score: 0, max: 0 },
    people: { score: 0, max: 0 },
    execution: { score: 0, max: 0 },
    growth: { score: 0, max: 0 },
    transition: { score: 0, max: 0 },
  };

  // Collect behavior tags for STARS inference
  const transitionTags: string[] = [];

  for (const question of questions) {
    const selectedOptionId = answers[question.id];
    if (!selectedOptionId) continue;

    const option = question.options.find((o) => o.id === selectedOptionId);
    if (!option) continue;

    domainTotals[question.domain].score += option.score;
    domainTotals[question.domain].max += 4; // max score per question

    if (question.domain === "transition") {
      transitionTags.push(option.behaviorTag);
    }
  }

  // Calculate domain scores
  const domainScores: Record<DomainId, DomainScore> = {} as Record<DomainId, DomainScore>;
  let totalScore = 0;
  let totalMax = 0;

  for (const domain of domainIds) {
    const { score, max } = domainTotals[domain];
    const percentage = max > 0 ? Math.round((score / max) * 100) : 0;
    const level: DomainScore["level"] =
      percentage >= 75 ? "strength" : percentage >= 50 ? "developing" : "growth_area";

    domainScores[domain] = { score, max, percentage, level };
    totalScore += score;
    totalMax += max;
  }

  const overallScore = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;

  // Find top strength and growth area
  let topStrength: DomainId = "mission";
  let topGrowthArea: DomainId = "mission";
  let highestPct = -1;
  let lowestPct = 101;

  for (const domain of domainIds) {
    if (domainScores[domain].percentage > highestPct) {
      highestPct = domainScores[domain].percentage;
      topStrength = domain;
    }
    if (domainScores[domain].percentage < lowestPct) {
      lowestPct = domainScores[domain].percentage;
      topGrowthArea = domain;
    }
  }

  // Infer STARS type from transition domain tags
  const starsType = inferSTARSType(transitionTags);

  // Generate insights (use manager-specific insights from role-insights file)
  const insights = generateManagerInsights(domainScores, topStrength, topGrowthArea, roleId, locale);

  // Detect failure factors
  const allTags: string[] = [];
  for (const question of questions) {
    const selectedOptionId = answers[question.id];
    if (!selectedOptionId) continue;
    const option = question.options.find((o) => o.id === selectedOptionId);
    if (option) allTags.push(option.behaviorTag);
  }
  const failureFactors = detectManagerFailureFactors(allTags, locale);

  return {
    domainScores,
    overallScore,
    topStrength,
    topGrowthArea,
    insights,
    failureFactors: failureFactors.length > 0 ? failureFactors : undefined,
    starsType,
    roleId,
  };
}

/* --- STARS Inference ----------------------------------------------- */

function inferSTARSType(transitionTags: string[]): STARSType {
  // Map behavior tags to STARS types
  const tagToStars: Record<string, STARSType> = {
    "situation-diagnoser": "turnaround",
    "structured-onboarder": "startup",
    "change-architect": "realignment",
    "collaborative-planner": "accelerated",
    "transparent-leader": "sustaining",
    "mentor-connector": "sustaining",
    "minimal-onboarder": "sustaining",
    "sink-or-swim": "sustaining",
    "task-over-people": "turnaround",
    "data-first": "realignment",
    "pragmatic-manager": "sustaining",
    "top-down-manager": "accelerated",
    "passive-manager": "sustaining",
    "pass-through-manager": "sustaining",
    "courageous-leader": "turnaround",
    "patient-educator": "sustaining",
    "deferral-strategy": "sustaining",
    "avoidant-leader": "sustaining",
    "best-practice-selector": "realignment",
    "speed-over-care": "accelerated",
    "indecisive-leader": "sustaining",
    "strategic-assigner": "accelerated",
    "outcome-focused": "accelerated",
    "convenience-focused": "sustaining",
  };

  const votes: Record<STARSType, number> = {
    startup: 0,
    turnaround: 0,
    accelerated: 0,
    realignment: 0,
    sustaining: 0,
  };

  for (const tag of transitionTags) {
    const stars = tagToStars[tag];
    if (stars) votes[stars]++;
  }

  // Return the type with most votes, default to "sustaining"
  let maxType: STARSType = "sustaining";
  let maxVotes = 0;
  for (const [type, count] of Object.entries(votes)) {
    if (count > maxVotes) {
      maxVotes = count;
      maxType = type as STARSType;
    }
  }

  return maxType;
}

/* --- Manager Failure Factor Detection ------------------------------ */

const MANAGER_FAILURE_PATTERNS: {
  tags: string[];
  threshold: number;
  factor: string;
  esFactor: string;
  coaching: string;
  esCoaching: string;
  icon: string;
}[] = [
  {
    tags: ["passive-manager", "avoidant-leader", "conflict-avoider", "status-quo-accepter"],
    threshold: 2,
    factor: "Leadership Avoidance",
    esFactor: "Evitacion de Liderazgo",
    coaching: "Strong managers step into discomfort. When you see a problem — a conflict, a performance issue, a systemic challenge — addressing it directly (with empathy) almost always leads to better outcomes than waiting. Practice the SBI model: describe the Situation, the Behavior you observed, and its Impact.",
    esCoaching: "Los gerentes fuertes enfrentan la incomodidad. Cuando ves un problema — un conflicto, un problema de rendimiento, un desafio sistemico — abordarlo directamente (con empatia) casi siempre lleva a mejores resultados que esperar. Practica el modelo SBI: describe la Situacion, el Comportamiento que observaste y su Impacto.",
    icon: "🪞",
  },
  {
    tags: ["dismissive-leadership", "one-sided-manager", "normalization-bias", "development-denier"],
    threshold: 2,
    factor: "Team Investment Gap",
    esFactor: "Brecha de Inversion en el Equipo",
    coaching: "The best FQHC leaders invest deeply in their people. When team members bring concerns or ask for development, they're showing trust in you. Dismissing those signals — even unintentionally — erodes that trust. Try asking 'What would help?' before offering solutions.",
    esCoaching: "Los mejores lideres de FQHC invierten profundamente en su gente. Cuando los miembros del equipo traen preocupaciones o piden desarrollo, estan mostrando confianza en ti. Desestimar esas senales — incluso sin intencion — erosiona esa confianza. Intenta preguntar 'Que ayudaria?' antes de ofrecer soluciones.",
    icon: "💡",
  },
  {
    tags: ["micromanager", "escalation-dependent", "blame-focused", "pressure-manager"],
    threshold: 2,
    factor: "Control Tendency",
    esFactor: "Tendencia al Control",
    coaching: "Trust your team's capabilities. When you do the work yourself, escalate every problem, or apply pressure without support, your team stops growing. Effective managers set clear expectations, provide resources, and then get out of the way. Reserve hands-on involvement for genuinely critical situations.",
    esCoaching: "Confia en las capacidades de tu equipo. Cuando haces el trabajo tu mismo, escalas cada problema o aplicas presion sin apoyo, tu equipo deja de crecer. Los gerentes efectivos establecen expectativas claras, proporcionan recursos y luego se retiran. Reserva la participacion directa para situaciones genuinamente criticas.",
    icon: "🎛️",
  },
  {
    tags: ["process-first", "surface-fix", "money-fix", "resource-shuffler"],
    threshold: 2,
    factor: "Surface-Level Problem Solving",
    esFactor: "Resolucion Superficial de Problemas",
    coaching: "Dig deeper into root causes. Process changes, quick fixes, and resource adjustments can help, but they often treat symptoms rather than causes. Before implementing a solution, ask 'Why is this happening?' at least three times to get to the underlying issue.",
    esCoaching: "Profundiza en las causas raiz. Los cambios de proceso, soluciones rapidas y ajustes de recursos pueden ayudar, pero a menudo tratan sintomas en vez de causas. Antes de implementar una solucion, pregunta 'Por que esta pasando esto?' al menos tres veces para llegar al problema subyacente.",
    icon: "🔍",
  },
];

function detectManagerFailureFactors(tags: string[], locale?: string): FailureFactorInsight[] {
  const results: FailureFactorInsight[] = [];

  for (const pattern of MANAGER_FAILURE_PATTERNS) {
    const matchCount = tags.filter((t) => pattern.tags.includes(t)).length;
    if (matchCount >= pattern.threshold) {
      results.push({
        factor: locale === "es" ? pattern.esFactor : pattern.factor,
        esFactor: pattern.esFactor,
        coaching: locale === "es" ? pattern.esCoaching : pattern.coaching,
        esCoaching: pattern.esCoaching,
        icon: pattern.icon,
      });
    }
  }

  return results;
}

/* --- Manager Insights Generation ----------------------------------- */

const MANAGER_STRENGTH_MESSAGES: Record<DomainId, string[]> = {
  mission: [
    "You show strong ability to keep your team connected to the FQHC mission, even during difficult periods.",
    "Your leadership style prioritizes meaningful patient impact over superficial metrics.",
  ],
  people: [
    "You demonstrate skill in building inclusive teams and addressing conflict constructively.",
    "Your approach to communication shows emotional intelligence and cultural awareness.",
  ],
  execution: [
    "You show strong operational leadership — prioritizing effectively and managing through change.",
    "Your problem-solving approach is systematic and data-informed.",
  ],
  growth: [
    "You invest meaningfully in your team's professional development.",
    "Your approach to feedback and learning culture builds team capability over time.",
  ],
  transition: [
    "You show strong ability to diagnose team situations and create structure during transitions.",
    "Your onboarding and change management instincts will serve your team well.",
  ],
};

const MANAGER_STRENGTH_MESSAGES_ES: Record<DomainId, string[]> = {
  mission: [
    "Muestras una fuerte capacidad para mantener a tu equipo conectado con la mision del FQHC, incluso durante periodos dificiles.",
    "Tu estilo de liderazgo prioriza el impacto significativo en los pacientes sobre metricas superficiales.",
  ],
  people: [
    "Demuestras habilidad para construir equipos inclusivos y abordar conflictos de manera constructiva.",
    "Tu enfoque de comunicacion muestra inteligencia emocional y conciencia cultural.",
  ],
  execution: [
    "Muestras un fuerte liderazgo operativo — priorizando efectivamente y gestionando a traves del cambio.",
    "Tu enfoque de resolucion de problemas es sistematico e informado por datos.",
  ],
  growth: [
    "Inviertes significativamente en el desarrollo profesional de tu equipo.",
    "Tu enfoque de retroalimentacion y cultura de aprendizaje construye la capacidad del equipo con el tiempo.",
  ],
  transition: [
    "Muestras una fuerte capacidad para diagnosticar situaciones del equipo y crear estructura durante transiciones.",
    "Tus instintos de incorporacion y gestion del cambio serviran bien a tu equipo.",
  ],
};

const MANAGER_GROWTH_MESSAGES: Record<DomainId, string[]> = {
  mission: [
    "Consider spending more time connecting daily work to patient outcomes — your team needs to see how their effort matters.",
    "Building a stronger mission narrative during challenging times will help retain your best people.",
  ],
  people: [
    "Investing in your facilitation skills will unlock better ideas from your team.",
    "Building psychological safety — where people feel safe raising concerns — is foundational for high-performing FQHC teams.",
  ],
  execution: [
    "Shifting from reactive to proactive management will reduce fire-fighting and improve team confidence.",
    "Building systems and processes that outlast any individual will make your team more resilient.",
  ],
  growth: [
    "Creating structured development opportunities — even with limited budget — is one of the highest-ROI investments a manager can make.",
    "Building a feedback-rich culture starts with how you receive feedback yourself.",
  ],
  transition: [
    "Building structured onboarding processes will dramatically reduce new hire time-to-productivity.",
    "Spending more time diagnosing situations before acting will lead to better decisions during transitions.",
  ],
};

const MANAGER_GROWTH_MESSAGES_ES: Record<DomainId, string[]> = {
  mission: [
    "Considera dedicar mas tiempo a conectar el trabajo diario con los resultados de los pacientes — tu equipo necesita ver como su esfuerzo importa.",
    "Construir una narrativa de mision mas fuerte durante tiempos desafiantes ayudara a retener a tu mejor gente.",
  ],
  people: [
    "Invertir en tus habilidades de facilitacion desbloqueara mejores ideas de tu equipo.",
    "Construir seguridad psicologica — donde las personas se sientan seguras planteando preocupaciones — es fundamental para equipos de FQHC de alto rendimiento.",
  ],
  execution: [
    "Cambiar de gestion reactiva a proactiva reducira la extincion de incendios y mejorara la confianza del equipo.",
    "Construir sistemas y procesos que perduren mas alla de cualquier individuo hara a tu equipo mas resiliente.",
  ],
  growth: [
    "Crear oportunidades de desarrollo estructuradas — incluso con presupuesto limitado — es una de las inversiones de mayor retorno que un gerente puede hacer.",
    "Construir una cultura rica en retroalimentacion comienza con como tu mismo recibes retroalimentacion.",
  ],
  transition: [
    "Construir procesos de incorporacion estructurados reducira dramaticamente el tiempo de productividad de nuevas contrataciones.",
    "Dedicar mas tiempo a diagnosticar situaciones antes de actuar llevara a mejores decisiones durante transiciones.",
  ],
};

const MANAGER_NEXT_STEPS: Record<DomainId, string[]> = {
  mission: ["Share a patient impact story at your next team meeting", "Schedule individual conversations with each team member about what motivates them"],
  people: ["Try a Liberating Structures facilitation technique at your next meeting", "Ask each team member: 'What's one thing I could do differently as your manager?'"],
  execution: ["Create a shared priority board visible to the whole team", "Block 30 minutes weekly for proactive planning instead of reactive management"],
  growth: ["Identify one development goal for each team member and discuss it in your next 1:1", "Start a monthly 30-minute knowledge-sharing session led by different team members"],
  transition: ["Create a 30/60/90 day onboarding template for your team's most common roles", "Map your team's current workflows so new hires have documentation to reference"],
};

const MANAGER_NEXT_STEPS_ES: Record<DomainId, string[]> = {
  mission: ["Comparte una historia de impacto en pacientes en tu proxima reunion de equipo", "Programa conversaciones individuales con cada miembro del equipo sobre que los motiva"],
  people: ["Intenta una tecnica de facilitacion de Estructuras Liberadoras en tu proxima reunion", "Pregunta a cada miembro del equipo: 'Que es una cosa que podria hacer diferente como tu gerente?'"],
  execution: ["Crea un tablero de prioridades compartido visible para todo el equipo", "Bloquea 30 minutos semanales para planificacion proactiva en vez de gestion reactiva"],
  growth: ["Identifica una meta de desarrollo para cada miembro del equipo y discutela en tu proximo 1:1", "Inicia una sesion mensual de 30 minutos de intercambio de conocimiento liderada por diferentes miembros del equipo"],
  transition: ["Crea una plantilla de incorporacion de 30/60/90 dias para los roles mas comunes de tu equipo", "Mapea los flujos de trabajo actuales de tu equipo para que las nuevas contrataciones tengan documentacion de referencia"],
};

function generateManagerInsights(
  domainScores: Record<DomainId, DomainScore>,
  topStrength: DomainId,
  topGrowthArea: DomainId,
  _roleId: LeadershipRoleId,
  locale?: string,
): { strengths: string[]; growthAreas: string[]; nextSteps: string[] } {
  const isEs = locale === "es";
  const strengthMsgs = isEs ? MANAGER_STRENGTH_MESSAGES_ES : MANAGER_STRENGTH_MESSAGES;
  const growthMsgs = isEs ? MANAGER_GROWTH_MESSAGES_ES : MANAGER_GROWTH_MESSAGES;
  const nextStepsMsgs = isEs ? MANAGER_NEXT_STEPS_ES : MANAGER_NEXT_STEPS;

  const strengths: string[] = [];
  const growthAreas: string[] = [];
  const nextSteps: string[] = [];

  // Add messages for top strength
  const strengthMessages = strengthMsgs[topStrength];
  if (strengthMessages.length > 0) strengths.push(strengthMessages[0]);

  // Add messages for any other strengths
  const domainIds: DomainId[] = ["mission", "people", "execution", "growth", "transition"];
  for (const domain of domainIds) {
    if (domain !== topStrength && domainScores[domain].level === "strength") {
      const msgs = strengthMsgs[domain];
      if (msgs.length > 1) strengths.push(msgs[1]);
    }
  }

  // Add messages for growth area
  const growthMessages = growthMsgs[topGrowthArea];
  if (growthMessages.length > 0) growthAreas.push(growthMessages[0]);

  // Add messages for any other growth areas
  for (const domain of domainIds) {
    if (domain !== topGrowthArea && domainScores[domain].level === "growth_area") {
      const msgs = growthMsgs[domain];
      if (msgs.length > 1) growthAreas.push(msgs[1]);
    }
  }

  // Add next steps for growth areas
  const nextStepMessages = nextStepsMsgs[topGrowthArea];
  nextSteps.push(...nextStepMessages);

  // Add one next step from second-lowest domain
  const sortedDomains = [...domainIds].sort(
    (a, b) => domainScores[a].percentage - domainScores[b].percentage,
  );
  if (sortedDomains.length > 1 && sortedDomains[1] !== topGrowthArea) {
    const secondLowest = sortedDomains[1];
    const msgs = nextStepsMsgs[secondLowest];
    if (msgs.length > 0) nextSteps.push(msgs[0]);
  }

  return { strengths, growthAreas, nextSteps };
}

/* --- Exports ------------------------------------------------------- */

export {
  MANAGER_UNIVERSAL_QUESTIONS,
  MANAGER_ROLE_SPECIFIC_QUESTIONS,
};
