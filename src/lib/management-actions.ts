/* ------------------------------------------------------------------ */
/*  Management Actions + Liberating Structures                         */
/*  Recommended actions per domain + meeting facilitation techniques    */
/*  for FQHC managers based on assessment results                      */
/* ------------------------------------------------------------------ */

import type { DomainId } from "./career-assessment-engine";

/* --- Types --------------------------------------------------------- */

export interface ManagementAction {
  id: string;
  domain: DomainId;
  title: string;
  esTitle: string;
  description: string;
  esDescription: string;
  timeframe: "this_week" | "this_month" | "this_quarter";
  difficulty: "easy" | "moderate" | "advanced";
}

export interface LiberatingStructure {
  id: string;
  name: string;
  esName: string;
  description: string;
  esDescription: string;
  bestFor: DomainId[];
  timeMinutes: number;
  groupSize: string;
  esGroupSize: string;
  howTo: string[];
  esHowTo: string[];
}

/* --- Management Actions by Domain ---------------------------------- */

export const MANAGEMENT_ACTIONS: ManagementAction[] = [
  // Mission domain actions
  {
    id: "mission_patient_stories",
    domain: "mission",
    title: "Start Meetings with Patient Impact",
    esTitle: "Comenzar Reuniones con Impacto en Pacientes",
    description: "Open each team meeting with a 2-minute patient story or outcome win. Rotate who shares. This costs nothing but keeps mission visible in daily work.",
    esDescription: "Abre cada reunion de equipo con una historia de paciente o logro de 2 minutos. Rota quien comparte. Esto no cuesta nada pero mantiene la mision visible en el trabajo diario.",
    timeframe: "this_week",
    difficulty: "easy",
  },
  {
    id: "mission_purpose_mapping",
    domain: "mission",
    title: "Team Purpose Mapping Session",
    esTitle: "Sesion de Mapeo de Proposito del Equipo",
    description: "Facilitate a 45-minute session where each team member maps how their daily tasks connect to patient outcomes. Use visual boards to show the chain from their work → team goals → patient impact.",
    esDescription: "Facilita una sesion de 45 minutos donde cada miembro del equipo mapea como sus tareas diarias se conectan con los resultados de los pacientes. Usa tableros visuales para mostrar la cadena de su trabajo → metas del equipo → impacto en pacientes.",
    timeframe: "this_month",
    difficulty: "moderate",
  },
  {
    id: "mission_burnout_check",
    domain: "mission",
    title: "Monthly Burnout & Morale Check-In",
    esTitle: "Revision Mensual de Agotamiento y Moral",
    description: "Use a simple anonymous 3-question pulse survey each month: (1) energy level 1-5, (2) feeling supported yes/no, (3) one thing that would help. Act on patterns within one week.",
    esDescription: "Usa una simple encuesta pulso anonima de 3 preguntas cada mes: (1) nivel de energia 1-5, (2) sintiendose apoyado si/no, (3) una cosa que ayudaria. Actua sobre los patrones dentro de una semana.",
    timeframe: "this_month",
    difficulty: "easy",
  },

  // People domain actions
  {
    id: "people_structured_1on1",
    domain: "people",
    title: "Implement Structured 1:1 Meetings",
    esTitle: "Implementar Reuniones 1:1 Estructuradas",
    description: "Schedule 30-minute monthly 1:1s with each direct report using a consistent 4-part agenda: (1) What's going well, (2) What's challenging, (3) What do you need from me, (4) Career development. Keep notes and follow through.",
    esDescription: "Programa reuniones mensuales 1:1 de 30 minutos con cada subordinado directo usando una agenda consistente de 4 partes: (1) Que va bien, (2) Que es desafiante, (3) Que necesitas de mi, (4) Desarrollo profesional. Mantén notas y cumple.",
    timeframe: "this_week",
    difficulty: "easy",
  },
  {
    id: "people_conflict_protocol",
    domain: "people",
    title: "Create a Team Conflict Resolution Protocol",
    esTitle: "Crear un Protocolo de Resolucion de Conflictos del Equipo",
    description: "Write a simple 3-step conflict protocol: (1) Direct conversation within 48 hours, (2) Mediated conversation with manager if unresolved, (3) Formal HR process if needed. Share with team and model using it.",
    esDescription: "Escribe un protocolo de conflicto simple de 3 pasos: (1) Conversacion directa dentro de 48 horas, (2) Conversacion mediada con el gerente si no se resuelve, (3) Proceso formal de RR.HH. si es necesario. Comparte con el equipo y modela su uso.",
    timeframe: "this_month",
    difficulty: "moderate",
  },
  {
    id: "people_team_agreements",
    domain: "people",
    title: "Co-Create Team Working Agreements",
    esTitle: "Co-Crear Acuerdos de Trabajo del Equipo",
    description: "Facilitate a session where your team defines 5-7 working agreements (e.g., 'We respond to messages within 4 hours,' 'We don't schedule meetings during lunch'). Post them visibly and revisit quarterly.",
    esDescription: "Facilita una sesion donde tu equipo defina 5-7 acuerdos de trabajo (ej., 'Respondemos mensajes dentro de 4 horas,' 'No programamos reuniones durante el almuerzo'). Publicalos visiblemente y revisalos trimestralmente.",
    timeframe: "this_month",
    difficulty: "moderate",
  },

  // Execution domain actions
  {
    id: "execution_visual_dashboard",
    domain: "execution",
    title: "Build a Team Visual Dashboard",
    esTitle: "Construir un Panel Visual del Equipo",
    description: "Create a simple visual tracker (whiteboard, shared doc, or TV screen) showing 3-5 key metrics your team owns. Update weekly. Visible scoreboards drive accountability better than email reminders.",
    esDescription: "Crea un rastreador visual simple (pizarra, documento compartido o pantalla de TV) mostrando 3-5 metricas clave que tu equipo posee. Actualiza semanalmente. Los marcadores visibles impulsan la responsabilidad mejor que los recordatorios por correo.",
    timeframe: "this_week",
    difficulty: "easy",
  },
  {
    id: "execution_daily_huddle",
    domain: "execution",
    title: "Start a 10-Minute Daily Huddle",
    esTitle: "Iniciar una Reunion Diaria de 10 Minutos",
    description: "Implement a standing 10-minute huddle: each person shares (1) their top priority for the day, (2) any blockers. No problem-solving during the huddle — capture issues for follow-up. This prevents drift and catches issues early.",
    esDescription: "Implementa una reunion rapida de 10 minutos: cada persona comparte (1) su prioridad principal del dia, (2) cualquier bloqueo. Sin resolucion de problemas durante la reunion — captura temas para seguimiento. Esto previene la desviacion y detecta problemas temprano.",
    timeframe: "this_week",
    difficulty: "easy",
  },
  {
    id: "execution_process_audit",
    domain: "execution",
    title: "Audit Your Top 3 Workflows",
    esTitle: "Auditar Tus 3 Principales Flujos de Trabajo",
    description: "Pick the 3 workflows where your team spends the most time or makes the most errors. Map each one step-by-step, identify bottlenecks, and create a simple SOP with the team. Start with the most painful one.",
    esDescription: "Elige los 3 flujos de trabajo donde tu equipo pasa mas tiempo o comete mas errores. Mapea cada uno paso a paso, identifica cuellos de botella y crea un SOP simple con el equipo. Comienza con el mas doloroso.",
    timeframe: "this_month",
    difficulty: "moderate",
  },

  // Growth domain actions
  {
    id: "growth_development_plans",
    domain: "growth",
    title: "Create Individual Development Plans",
    esTitle: "Crear Planes de Desarrollo Individual",
    description: "Work with each team member to create a simple development plan: (1) Where they are now, (2) Where they want to be in 12 months, (3) 3 specific learning actions this quarter. Review progress monthly during 1:1s.",
    esDescription: "Trabaja con cada miembro del equipo para crear un plan de desarrollo simple: (1) Donde estan ahora, (2) Donde quieren estar en 12 meses, (3) 3 acciones de aprendizaje especificas este trimestre. Revisa progreso mensualmente durante 1:1s.",
    timeframe: "this_month",
    difficulty: "moderate",
  },
  {
    id: "growth_skill_sharing",
    domain: "growth",
    title: "Launch 'Teach One Thing' Sessions",
    esTitle: "Lanzar Sesiones 'Ensena Una Cosa'",
    description: "Each month, one team member teaches the team something they know well (15 minutes). Rotates through the whole team. Builds teaching skills, cross-training, and team cohesion simultaneously.",
    esDescription: "Cada mes, un miembro del equipo ensena al equipo algo que conoce bien (15 minutos). Rota por todo el equipo. Construye habilidades de ensenanza, capacitacion cruzada y cohesion de equipo simultaneamente.",
    timeframe: "this_month",
    difficulty: "easy",
  },
  {
    id: "growth_stretch_assignments",
    domain: "growth",
    title: "Assign Stretch Projects",
    esTitle: "Asignar Proyectos de Estiramiento",
    description: "Identify one stretch assignment for each team member that's slightly beyond their current level. Provide coaching support but let them lead. Debrief the experience regardless of outcome — the learning is the goal.",
    esDescription: "Identifica una asignacion de estiramiento para cada miembro del equipo que sea ligeramente mas alla de su nivel actual. Proporciona apoyo de coaching pero dejalos liderar. Haz un debrief de la experiencia sin importar el resultado — el aprendizaje es la meta.",
    timeframe: "this_quarter",
    difficulty: "moderate",
  },

  // Transition domain actions
  {
    id: "transition_team_onboarding",
    domain: "transition",
    title: "Build a Team Onboarding Playbook",
    esTitle: "Construir un Manual de Incorporacion del Equipo",
    description: "Create a structured 30/60/90 day onboarding guide for new team members. Include: week-by-week tasks, key people to meet, systems to learn, and success milestones. Have your team contribute — they know what new hires struggle with.",
    esDescription: "Crea una guia de incorporacion estructurada de 30/60/90 dias para nuevos miembros del equipo. Incluye: tareas semana a semana, personas clave que conocer, sistemas que aprender y hitos de exito. Haz que tu equipo contribuya — ellos saben con que luchan las nuevas contrataciones.",
    timeframe: "this_month",
    difficulty: "moderate",
  },
  {
    id: "transition_stars_diagnosis",
    domain: "transition",
    title: "Complete a STARS Diagnostic",
    esTitle: "Completar un Diagnostico STARS",
    description: "Use the STARS framework to assess your team's current situation: Is this a Startup, Turnaround, Accelerated growth, Realignment, or Sustaining success? Share your assessment with your supervisor to align expectations.",
    esDescription: "Usa el marco STARS para evaluar la situacion actual de tu equipo: Es una Startup, Cambio, Crecimiento acelerado, Realineamiento o Mantenimiento del exito? Comparte tu evaluacion con tu supervisor para alinear expectativas.",
    timeframe: "this_week",
    difficulty: "easy",
  },
  {
    id: "transition_knowledge_capture",
    domain: "transition",
    title: "Conduct Knowledge Transfer Sessions",
    esTitle: "Realizar Sesiones de Transferencia de Conocimiento",
    description: "For any team member who might leave or transition, schedule structured knowledge transfer sessions now — not when their two-week notice hits. Document critical processes, key contacts, and institutional knowledge.",
    esDescription: "Para cualquier miembro del equipo que pueda irse o transicionar, programa sesiones estructuradas de transferencia de conocimiento ahora — no cuando llegue su aviso de dos semanas. Documenta procesos criticos, contactos clave y conocimiento institucional.",
    timeframe: "this_quarter",
    difficulty: "advanced",
  },
];

/* --- Liberating Structures ----------------------------------------- */

export const LIBERATING_STRUCTURES: LiberatingStructure[] = [
  {
    id: "1-2-4-all",
    name: "1-2-4-All",
    esName: "1-2-4-Todos",
    description: "Engage everyone simultaneously in generating questions, ideas, and suggestions. Start alone, then pairs, then groups of four, then whole group. Prevents the loudest voice from dominating.",
    esDescription: "Involucra a todos simultaneamente en generar preguntas, ideas y sugerencias. Empieza solo, luego en parejas, luego en grupos de cuatro, luego todo el grupo. Previene que la voz mas fuerte domine.",
    bestFor: ["mission", "people", "growth"],
    timeMinutes: 15,
    groupSize: "4-50+",
    esGroupSize: "4-50+",
    howTo: [
      "Pose a question to the group (e.g., 'What can we do to better serve our patients this quarter?')",
      "1 minute: Everyone reflects silently and writes their ideas",
      "2 minutes: Share ideas in pairs",
      "4 minutes: Share and build on ideas in groups of four",
      "5 minutes: Each group of four shares their best idea with the whole group",
    ],
    esHowTo: [
      "Plantea una pregunta al grupo (ej., 'Que podemos hacer para servir mejor a nuestros pacientes este trimestre?')",
      "1 minuto: Todos reflexionan en silencio y escriben sus ideas",
      "2 minutos: Comparten ideas en parejas",
      "4 minutos: Comparten y construyen sobre ideas en grupos de cuatro",
      "5 minutos: Cada grupo de cuatro comparte su mejor idea con todo el grupo",
    ],
  },
  {
    id: "fifteen-percent-solutions",
    name: "15% Solutions",
    esName: "Soluciones del 15%",
    description: "Discover and focus on what each person can do without needing permission or resources. Surfaces the small actions that collectively create big change — perfect for FQHCs where budgets are tight.",
    esDescription: "Descubre y enfocate en lo que cada persona puede hacer sin necesitar permiso o recursos. Saca a la superficie las pequenas acciones que colectivamente crean gran cambio — perfecto para FQHCs donde los presupuestos son ajustados.",
    bestFor: ["mission", "execution", "growth"],
    timeMinutes: 20,
    groupSize: "3-30",
    esGroupSize: "3-30",
    howTo: [
      "Ask: 'What is your 15%? What can you do without needing approval or additional resources to improve [X]?'",
      "3 minutes: Everyone writes their 15% solution",
      "Round-robin: Each person shares their solution (1 minute each)",
      "Group helps strengthen each idea with constructive suggestions",
      "Each person commits to one action by a specific date",
    ],
    esHowTo: [
      "Pregunta: 'Cual es tu 15%? Que puedes hacer sin necesitar aprobacion o recursos adicionales para mejorar [X]?'",
      "3 minutos: Todos escriben su solucion del 15%",
      "Ronda: Cada persona comparte su solucion (1 minuto cada uno)",
      "El grupo ayuda a fortalecer cada idea con sugerencias constructivas",
      "Cada persona se compromete a una accion para una fecha especifica",
    ],
  },
  {
    id: "troika-consulting",
    name: "Troika Consulting",
    esName: "Consulta Troika",
    description: "Get practical and imaginative help from colleagues on a challenge you're facing. Groups of three take turns being 'client' while the other two consult. Rapidly surfaces fresh perspectives.",
    esDescription: "Obtén ayuda practica e imaginativa de colegas sobre un desafio que enfrentas. Grupos de tres toman turnos siendo 'cliente' mientras los otros dos consultan. Rapidamente saca perspectivas frescas.",
    bestFor: ["people", "execution", "transition"],
    timeMinutes: 25,
    groupSize: "3-30 (in groups of 3)",
    esGroupSize: "3-30 (en grupos de 3)",
    howTo: [
      "Form groups of 3. Person A describes their challenge (2 minutes)",
      "Persons B and C ask clarifying questions (2 minutes)",
      "Person A turns around (literally faces away). B and C discuss the challenge and offer advice as if A can't hear (4 minutes)",
      "Person A turns back and shares what resonated (1 minute)",
      "Rotate: Person B becomes the client. Repeat for all three.",
    ],
    esHowTo: [
      "Formen grupos de 3. Persona A describe su desafio (2 minutos)",
      "Personas B y C hacen preguntas aclaratorias (2 minutos)",
      "Persona A se voltea (literalmente mira hacia otro lado). B y C discuten el desafio y ofrecen consejos como si A no pudiera escuchar (4 minutos)",
      "Persona A se voltea y comparte lo que resono (1 minuto)",
      "Rotar: Persona B se convierte en el cliente. Repetir para los tres.",
    ],
  },
  {
    id: "what-so-what-now-what",
    name: "What? So What? Now What?",
    esName: "Que? Y Que? Ahora Que?",
    description: "Three-stage reflective process that moves a team from observation to meaning to action. Perfect for after an incident, a program change, or a quarterly review.",
    esDescription: "Proceso reflexivo de tres etapas que mueve al equipo de la observacion al significado a la accion. Perfecto despues de un incidente, un cambio de programa o una revision trimestral.",
    bestFor: ["execution", "transition", "growth"],
    timeMinutes: 30,
    groupSize: "4-20",
    esGroupSize: "4-20",
    howTo: [
      "WHAT: 'What happened? What did you notice? What facts do we know?' (8 minutes, collect observations)",
      "SO WHAT: 'Why does this matter? What patterns do you see? What's at stake?' (8 minutes, analyze meaning)",
      "NOW WHAT: 'What should we do next? Who will do what by when?' (10 minutes, commit to action)",
      "Summarize the actions and post them where the team can see them",
    ],
    esHowTo: [
      "QUE: 'Que paso? Que notaste? Que hechos conocemos?' (8 minutos, recopilar observaciones)",
      "Y QUE: 'Por que importa esto? Que patrones ves? Que esta en juego?' (8 minutos, analizar significado)",
      "AHORA QUE: 'Que deberiamos hacer despues? Quien hara que para cuando?' (10 minutos, comprometerse a la accion)",
      "Resume las acciones y publicalas donde el equipo pueda verlas",
    ],
  },
  {
    id: "appreciative-interviews",
    name: "Appreciative Interviews",
    esName: "Entrevistas Apreciativas",
    description: "Discover what gives life to your team when it is most effective. Pairs interview each other about peak experiences and then share themes with the group. Builds on strengths rather than fixing deficits.",
    esDescription: "Descubre que da vida a tu equipo cuando es mas efectivo. Las parejas se entrevistan mutuamente sobre experiencias cumbre y luego comparten temas con el grupo. Construye sobre fortalezas en lugar de arreglar deficits.",
    bestFor: ["mission", "people"],
    timeMinutes: 30,
    groupSize: "4-40",
    esGroupSize: "4-40",
    howTo: [
      "Pair up. Ask your partner: 'Tell me about a time when you were at your best in this work. What was happening? Who was involved? What made it possible?'",
      "Listen for 5 minutes without interrupting. Take notes.",
      "Switch roles and repeat.",
      "Each pair identifies the common themes from their stories",
      "Whole group shares themes — what conditions enable our team to thrive?",
    ],
    esHowTo: [
      "Emparejarse. Pregunta a tu companero: 'Cuentame sobre una vez que estuviste en tu mejor momento en este trabajo. Que estaba pasando? Quien estaba involucrado? Que lo hizo posible?'",
      "Escucha por 5 minutos sin interrumpir. Toma notas.",
      "Cambia de roles y repite.",
      "Cada pareja identifica los temas comunes de sus historias",
      "El grupo completo comparte temas — que condiciones permiten que nuestro equipo prospere?",
    ],
  },
  {
    id: "triz",
    name: "TRIZ (Stop Doing)",
    esName: "TRIZ (Dejar de Hacer)",
    description: "Identify and stop counterproductive activities. Ask: 'What are we doing that's making things worse?' Paradoxically easier to identify what to STOP than what to START. Frees up energy for what matters.",
    esDescription: "Identifica y detén actividades contraproducentes. Pregunta: 'Que estamos haciendo que empeora las cosas?' Paradojicamente es mas facil identificar que DEJAR DE HACER que que COMENZAR. Libera energia para lo que importa.",
    bestFor: ["execution", "growth", "transition"],
    timeMinutes: 25,
    groupSize: "4-30",
    esGroupSize: "4-30",
    howTo: [
      "Step 1: 'Make a list — how could we guarantee the WORST possible outcome in [our program/team]?' (5 min, brainstorm the worst)",
      "Step 2: 'Now look at this list — are we currently doing any of these things, even a little?' (5 min, honest assessment)",
      "Step 3: 'What can we stop doing or change immediately?' (5 min, identify actions)",
      "Step 4: Commit to stopping 1-3 items this week. Post the list visibly.",
    ],
    esHowTo: [
      "Paso 1: 'Hagan una lista — como podriamos garantizar el PEOR resultado posible en [nuestro programa/equipo]?' (5 min, lluvia de ideas de lo peor)",
      "Paso 2: 'Ahora miren esta lista — estamos haciendo actualmente alguna de estas cosas, aunque sea un poco?' (5 min, evaluacion honesta)",
      "Paso 3: 'Que podemos dejar de hacer o cambiar inmediatamente?' (5 min, identificar acciones)",
      "Paso 4: Comprometerse a detener 1-3 items esta semana. Publicar la lista visiblemente.",
    ],
  },
  {
    id: "min-specs",
    name: "Min Specs",
    esName: "Especificaciones Minimas",
    description: "Specify only the absolute 'must dos' and 'must not dos' for achieving a purpose. Everything else is up to the team. Empowers staff to use their judgment within clear boundaries.",
    esDescription: "Especifica solo los 'debes hacer' y 'no debes hacer' absolutos para lograr un proposito. Todo lo demas depende del equipo. Empodera al personal para usar su juicio dentro de limites claros.",
    bestFor: ["execution", "transition"],
    timeMinutes: 20,
    groupSize: "4-20",
    esGroupSize: "4-20",
    howTo: [
      "State the challenge or goal clearly",
      "Ask: 'What are the absolute MUST DOs — the rules that if broken, would make it impossible to achieve our goal?' (brainstorm, then vote)",
      "Ask: 'What are the MUST NOT DOs — the lines we cannot cross?' (brainstorm, then vote)",
      "Everything NOT on these lists is open to individual judgment and creativity",
      "Post the Min Specs where team can reference them",
    ],
    esHowTo: [
      "Declara el desafio o meta claramente",
      "Pregunta: 'Cuales son los DEBES HACER absolutos — las reglas que si se rompen, harian imposible lograr nuestra meta?' (lluvia de ideas, luego votar)",
      "Pregunta: 'Cuales son los NO DEBES HACER — las lineas que no podemos cruzar?' (lluvia de ideas, luego votar)",
      "Todo lo que NO esta en estas listas esta abierto al juicio individual y la creatividad",
      "Publica las Especificaciones Minimas donde el equipo pueda consultarlas",
    ],
  },
  {
    id: "impromptu-networking",
    name: "Impromptu Networking",
    esName: "Networking Improvisado",
    description: "Rapidly share challenges and build connections in just 10 minutes. Three rounds of 3-minute conversations with different partners. Surfaces what's really on people's minds.",
    esDescription: "Comparte rapidamente desafios y construye conexiones en solo 10 minutos. Tres rondas de conversaciones de 3 minutos con diferentes companeros. Saca a la superficie lo que realmente esta en la mente de las personas.",
    bestFor: ["people", "mission"],
    timeMinutes: 10,
    groupSize: "6-50+",
    esGroupSize: "6-50+",
    howTo: [
      "Pose a question (e.g., 'What challenge are you facing right now that you'd like help with?')",
      "Round 1: Find a partner, share for 3 minutes (90 seconds each)",
      "Round 2: Find a NEW partner, share for 3 minutes",
      "Round 3: Find a NEW partner, share for 3 minutes",
      "Debrief: 'What surprised you? What themes did you hear?'",
    ],
    esHowTo: [
      "Plantea una pregunta (ej., 'Que desafio estas enfrentando ahora mismo en el que te gustaria recibir ayuda?')",
      "Ronda 1: Encuentra un companero, comparte por 3 minutos (90 segundos cada uno)",
      "Ronda 2: Encuentra un NUEVO companero, comparte por 3 minutos",
      "Ronda 3: Encuentra un NUEVO companero, comparte por 3 minutos",
      "Debrief: 'Que te sorprendio? Que temas escuchaste?'",
    ],
  },
];

/* --- Helper Functions ---------------------------------------------- */

/**
 * Get prioritized management actions based on domain scores.
 * Returns actions for the two lowest-scoring domains first, then others.
 */
export function getPrioritizedActions(
  domainScores: Record<DomainId, { percentage: number }>,
  maxActions: number = 6,
): ManagementAction[] {
  // Sort domains by score (lowest first)
  const sortedDomains = (Object.entries(domainScores) as [DomainId, { percentage: number }][])
    .sort(([, a], [, b]) => a.percentage - b.percentage)
    .map(([domain]) => domain);

  // Get actions for lowest domains first
  const prioritized: ManagementAction[] = [];
  const seen = new Set<string>();

  for (const domain of sortedDomains) {
    const domainActions = MANAGEMENT_ACTIONS.filter((a) => a.domain === domain);
    for (const action of domainActions) {
      if (!seen.has(action.id) && prioritized.length < maxActions) {
        seen.add(action.id);
        prioritized.push(action);
      }
    }
  }

  return prioritized;
}

/**
 * Get Liberating Structures matched to growth areas.
 * Returns structures whose bestFor includes the lowest-scoring domains.
 */
export function getMatchedStructures(
  domainScores: Record<DomainId, { percentage: number }>,
  maxStructures: number = 4,
): LiberatingStructure[] {
  // Identify the two lowest-scoring domains
  const sortedDomains = (Object.entries(domainScores) as [DomainId, { percentage: number }][])
    .sort(([, a], [, b]) => a.percentage - b.percentage)
    .map(([domain]) => domain);

  const growthDomains = new Set(sortedDomains.slice(0, 2));

  // Score each structure by how many growth domains it matches
  const scored = LIBERATING_STRUCTURES.map((ls) => ({
    structure: ls,
    score: ls.bestFor.filter((d) => growthDomains.has(d)).length,
  }));

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, maxStructures)
    .map((s) => s.structure);
}
