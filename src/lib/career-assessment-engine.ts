/* ------------------------------------------------------------------ */
/*  Career Insights Assessment Engine                                  */
/*  Adapted from the TPB Universal Assessment Framework for FQHC roles */
/* ------------------------------------------------------------------ */

/* --- Types --------------------------------------------------------- */

export type DomainId = "mission" | "people" | "execution" | "growth";

export interface AnswerOption {
  id: string;
  text: string;
  esText: string;
  score: number; // 1-4 (unskilled → skilled)
  behaviorTag: string;
}

export interface AssessmentQuestion {
  id: string;
  domain: DomainId;
  scenario: string;
  esScenario: string;
  question: string;
  esQuestion: string;
  options: AnswerOption[];
}

export interface DomainDefinition {
  id: DomainId;
  name: string;
  description: string;
  icon: string; // emoji for visual display
  color: string; // tailwind color identifier
}

export interface DomainScore {
  score: number;
  max: number;
  percentage: number;
  level: "strength" | "developing" | "growth_area";
}

export interface AssessmentResults {
  domainScores: Record<DomainId, DomainScore>;
  overallScore: number; // 0-100
  topStrength: DomainId;
  topGrowthArea: DomainId;
  insights: {
    strengths: string[];
    growthAreas: string[];
    nextSteps: string[];
  };
}

/* --- Domain Definitions -------------------------------------------- */

export const DOMAIN_DEFINITIONS: DomainDefinition[] = [
  {
    id: "mission",
    name: "Mission & Motivation",
    description:
      "Purpose, grit, and commitment to serving underserved communities. Predicts retention and long-term success at FQHCs.",
    icon: "\u{1F3AF}", // target
    color: "teal",
  },
  {
    id: "people",
    name: "People & Communication",
    description:
      "Emotional intelligence, empathy, cultural competency, and team collaboration. Predicts patient satisfaction and team effectiveness.",
    icon: "\u{1F91D}", // handshake
    color: "blue",
  },
  {
    id: "execution",
    name: "Execution & Adaptability",
    description:
      "Problem-solving, managing complexity, bias to action, and learning on the fly. Predicts performance in fast-paced FQHC environments.",
    icon: "\u26A1", // lightning
    color: "amber",
  },
  {
    id: "growth",
    name: "Growth Mindset",
    description:
      "Curiosity, feedback receptivity, career ambition, and resilience. Predicts professional development trajectory and long-term career growth.",
    icon: "\u{1F331}", // seedling
    color: "green",
  },
];

/* --- Assessment Questions (12 total, 3 per domain) ----------------- */

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  /* ---- Domain 1: Mission & Motivation ---- */
  {
    id: "mission_1",
    domain: "mission",
    scenario: "A patient you've been working with for months tells you they're giving up on their treatment plan because 'nothing ever changes.'",
    esScenario: "Un paciente con el que has trabajado durante meses te dice que va a abandonar su plan de tratamiento porque 'nada cambia nunca.'",
    question: "What would you most likely do?",
    esQuestion: "¿Qué harías con mayor probabilidad?",
    options: [
      { id: "m1_a", text: "Draw on your own connection to the mission to re-engage them with empathy and persistence", esText: "Recurrir a tu propia conexión con la misión para volver a involucrarlos con empatía y persistencia", score: 4, behaviorTag: "purpose-driven" },
      { id: "m1_b", text: "Refer them to behavioral health and continue following up", esText: "Referirlos a salud conductual y continuar dando seguimiento", score: 3, behaviorTag: "resourceful" },
      { id: "m1_c", text: "Document their decision and move to other patients on your caseload", esText: "Documentar su decisión y pasar a otros pacientes de tu carga", score: 2, behaviorTag: "task-focused" },
      { id: "m1_d", text: "Accept their decision — you can't force someone to engage", esText: "Aceptar su decisión — no puedes forzar a alguien a participar", score: 1, behaviorTag: "avoidant" },
    ],
  },
  {
    id: "mission_2",
    domain: "mission",
    scenario: "You've been denied a promotion twice despite strong performance reviews. Your supervisor says 'there just isn't budget right now.'",
    esScenario: "Te han negado un ascenso dos veces a pesar de evaluaciones de desempeño excelentes. Tu supervisor dice 'simplemente no hay presupuesto ahora.'",
    question: "What's your next move?",
    esQuestion: "¿Cuál es tu siguiente paso?",
    options: [
      { id: "m2_a", text: "Ask for specific milestones that would guarantee promotion, pursue additional certifications, and keep performing at a high level", esText: "Pedir hitos específicos que garanticen el ascenso, buscar certificaciones adicionales y seguir rindiendo a alto nivel", score: 4, behaviorTag: "grit" },
      { id: "m2_b", text: "Look for growth opportunities at other FQHCs while staying committed to your current role", esText: "Buscar oportunidades de crecimiento en otros FQHCs mientras te mantienes comprometido/a con tu puesto actual", score: 3, behaviorTag: "strategic" },
      { id: "m2_c", text: "Reduce your extra effort to match your current compensation", esText: "Reducir tu esfuerzo extra para que coincida con tu compensación actual", score: 2, behaviorTag: "disengaging" },
      { id: "m2_d", text: "Start looking for a completely different career path", esText: "Empezar a buscar un camino profesional completamente diferente", score: 1, behaviorTag: "flight-risk" },
    ],
  },
  {
    id: "mission_3",
    domain: "mission",
    scenario: "Your FQHC is implementing a new care model that you believe will hurt patient outcomes. Your supervisor is enthusiastic about it.",
    esScenario: "Tu FQHC está implementando un nuevo modelo de atención que crees que perjudicará los resultados de los pacientes. Tu supervisor está entusiasmado.",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      { id: "m3_a", text: "Respectfully present your concerns with data/evidence, and if overruled, commit fully to the new model while tracking outcomes", esText: "Presentar respetuosamente tus preocupaciones con datos/evidencia y, si te rechazan, comprometerte completamente con el nuevo modelo mientras rastreas los resultados", score: 4, behaviorTag: "principled-commitment" },
      { id: "m3_b", text: "Voice your concerns once, then follow the new model", esText: "Expresar tus preocupaciones una vez, luego seguir el nuevo modelo", score: 3, behaviorTag: "compliant" },
      { id: "m3_c", text: "Go along with it — management makes these decisions", esText: "Seguir la corriente — la gerencia toma estas decisiones", score: 2, behaviorTag: "passive" },
      { id: "m3_d", text: "Comply publicly but continue doing things the old way when no one is watching", esText: "Cumplir públicamente pero continuar haciendo las cosas a la manera antigua cuando nadie mira", score: 1, behaviorTag: "undermining" },
    ],
  },

  /* ---- Domain 2: People & Communication ---- */
  {
    id: "people_1",
    domain: "people",
    scenario: "A patient is visibly upset about a long wait time. When you finally see them, they say 'nobody here cares about people like me.'",
    esScenario: "Un paciente está visiblemente molesto por un largo tiempo de espera. Cuando finalmente lo atiendes, dice 'a nadie aquí le importa gente como yo.'",
    question: "How do you respond?",
    esQuestion: "¿Cómo respondes?",
    options: [
      { id: "p1_a", text: "Acknowledge their frustration, validate their feeling, ask what 'people like me' means to them, and address the systemic issue", esText: "Reconocer su frustración, validar su sentimiento, preguntar qué significa 'gente como yo' para ellos y abordar el problema sistémico", score: 4, behaviorTag: "culturally-attuned" },
      { id: "p1_b", text: "Apologize sincerely for the wait and focus on providing excellent care", esText: "Disculparse sinceramente por la espera y enfocarse en brindar una atención excelente", score: 3, behaviorTag: "empathetic" },
      { id: "p1_c", text: "Explain that the clinic is understaffed and you're doing your best", esText: "Explicar que la clínica tiene poco personal y que estás haciendo lo mejor posible", score: 2, behaviorTag: "defensive" },
      { id: "p1_d", text: "Remind them that everyone waits equally and move on to clinical needs", esText: "Recordarles que todos esperan por igual y pasar a las necesidades clínicas", score: 1, behaviorTag: "dismissive" },
    ],
  },
  {
    id: "people_2",
    domain: "people",
    scenario: "A colleague consistently doesn't complete their documentation on time, which affects your ability to follow up with shared patients.",
    esScenario: "Un colega constantemente no completa su documentación a tiempo, lo que afecta tu capacidad para dar seguimiento a pacientes compartidos.",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      { id: "p2_a", text: "Have a direct, private conversation about the impact, ask if they need support, and offer to problem-solve together", esText: "Tener una conversación directa y privada sobre el impacto, preguntar si necesitan apoyo y ofrecer resolver el problema juntos", score: 4, behaviorTag: "collaborative-confronter" },
      { id: "p2_b", text: "Bring it up with your supervisor and let them handle it", esText: "Mencionarlo con tu supervisor y dejar que él lo maneje", score: 3, behaviorTag: "escalator" },
      { id: "p2_c", text: "Work around the issue by checking in with patients directly", esText: "Trabajar alrededor del problema verificando directamente con los pacientes", score: 2, behaviorTag: "conflict-avoidant" },
      { id: "p2_d", text: "Document the pattern in case it becomes a bigger issue", esText: "Documentar el patrón en caso de que se convierta en un problema mayor", score: 1, behaviorTag: "passive-aggressive" },
    ],
  },
  {
    id: "people_3",
    domain: "people",
    scenario: "During a team meeting, a newer colleague points out that your approach to patient outreach might not be working for a specific population.",
    esScenario: "Durante una reunión de equipo, un colega más nuevo señala que tu enfoque de alcance a pacientes podría no estar funcionando para una población específica.",
    question: "How do you react?",
    esQuestion: "¿Cómo reaccionas?",
    options: [
      { id: "p3_a", text: "Thank them, ask questions to understand their perspective, and explore whether combining approaches would work better", esText: "Agradecerles, hacer preguntas para entender su perspectiva y explorar si combinar enfoques funcionaría mejor", score: 4, behaviorTag: "growth-oriented" },
      { id: "p3_b", text: "Listen openly and consider their point, but explain why you do it your way", esText: "Escuchar abiertamente y considerar su punto, pero explicar por qué lo haces a tu manera", score: 3, behaviorTag: "receptive" },
      { id: "p3_c", text: "Acknowledge their input but feel defensive internally", esText: "Reconocer su aporte pero sentirte a la defensiva internamente", score: 2, behaviorTag: "surface-receptive" },
      { id: "p3_d", text: "Dismiss it — they don't have enough experience to judge your methods", esText: "Descartarlo — no tienen suficiente experiencia para juzgar tus métodos", score: 1, behaviorTag: "closed-minded" },
    ],
  },

  /* ---- Domain 3: Execution & Adaptability ---- */
  {
    id: "execution_1",
    domain: "execution",
    scenario: "You arrive at work to find: 3 urgent patient callbacks, a new ECM enrollment deadline today, a mandatory training in 2 hours, and your EHR is running slow.",
    esScenario: "Llegas al trabajo y encuentras: 3 llamadas urgentes de pacientes, una fecha límite de inscripción ECM hoy, un entrenamiento obligatorio en 2 horas y tu EHR funciona lento.",
    question: "What do you do first?",
    esQuestion: "¿Qué haces primero?",
    options: [
      { id: "e1_a", text: "Quickly triage — identify which callback is most time-sensitive, delegate or reschedule what you can, and communicate proactively about what won't get done today", esText: "Hacer triaje rápido — identificar qué llamada es más urgente, delegar o reprogramar lo que puedas y comunicar proactivamente lo que no se completará hoy", score: 4, behaviorTag: "strategic-triage" },
      { id: "e1_b", text: "Start with the ECM deadline since it's time-bound, then work through callbacks", esText: "Empezar con la fecha límite de ECM ya que tiene plazo fijo, luego trabajar en las llamadas", score: 3, behaviorTag: "deadline-driven" },
      { id: "e1_c", text: "Begin with the callbacks since patients come first, and deal with the rest as you can", esText: "Comenzar con las llamadas ya que los pacientes son primero, y manejar el resto como puedas", score: 2, behaviorTag: "single-track" },
      { id: "e1_d", text: "Feel overwhelmed and ask your supervisor for guidance on prioritization", esText: "Sentirte abrumado/a y pedir orientación a tu supervisor sobre priorización", score: 1, behaviorTag: "dependent" },
    ],
  },
  {
    id: "execution_2",
    domain: "execution",
    scenario: "Your FQHC just switched EHR systems. You were expert-level on the old system. After two weeks on the new system, you're still slow and making errors.",
    esScenario: "Tu FQHC acaba de cambiar de sistema EHR. Eras experto/a en el sistema anterior. Después de dos semanas con el nuevo, sigues lento/a y cometiendo errores.",
    question: "What's your approach?",
    esQuestion: "¿Cuál es tu enfoque?",
    options: [
      { id: "e2_a", text: "Actively seek training resources, practice outside of work hours, ask power users for tips, and accept that temporary discomfort is part of growth", esText: "Buscar activamente recursos de entrenamiento, practicar fuera de horas de trabajo, pedir consejos a usuarios expertos y aceptar que la incomodidad temporal es parte del crecimiento", score: 4, behaviorTag: "adaptable-learner" },
      { id: "e2_b", text: "Focus on learning the essentials first and gradually expand your skills", esText: "Enfocarte en aprender lo esencial primero y expandir gradualmente tus habilidades", score: 3, behaviorTag: "methodical" },
      { id: "e2_c", text: "Do your best but voice frustration about the switch to management", esText: "Hacer lo mejor posible pero expresar frustración sobre el cambio a la gerencia", score: 2, behaviorTag: "resistant" },
      { id: "e2_d", text: "Stick to the minimum required functions and avoid the features you don't understand", esText: "Limitarte a las funciones mínimas requeridas y evitar las funciones que no entiendes", score: 1, behaviorTag: "avoidant" },
    ],
  },
  {
    id: "execution_3",
    domain: "execution",
    scenario: "You notice that many of your ECM patients are missing follow-up appointments. You have an idea for a text reminder system but it's not part of your role to implement it.",
    esScenario: "Notas que muchos de tus pacientes ECM están faltando a citas de seguimiento. Tienes una idea para un sistema de recordatorios por texto pero no es parte de tu rol implementarlo.",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      { id: "e3_a", text: "Draft a quick proposal, present it to your supervisor, and offer to pilot it with your caseload", esText: "Redactar una propuesta rápida, presentarla a tu supervisor y ofrecerte a pilotearla con tu carga de pacientes", score: 4, behaviorTag: "bias-to-action" },
      { id: "e3_b", text: "Mention the idea in a team meeting and see if there's interest", esText: "Mencionar la idea en una reunión de equipo y ver si hay interés", score: 3, behaviorTag: "contributive" },
      { id: "e3_c", text: "Add it to a suggestion box or email and wait for a response", esText: "Agregarlo a un buzón de sugerencias o correo electrónico y esperar una respuesta", score: 2, behaviorTag: "passive-contributor" },
      { id: "e3_d", text: "Focus on your own caseload — system-level changes aren't your responsibility", esText: "Enfocarte en tu propia carga — los cambios a nivel de sistema no son tu responsabilidad", score: 1, behaviorTag: "narrow-scope" },
    ],
  },

  /* ---- Domain 4: Growth Mindset ---- */
  {
    id: "growth_1",
    domain: "growth",
    scenario: "A training opportunity comes up for a program (ECM/CCM) you've never worked with. It would require extra hours for 3 weeks but isn't required for your current role.",
    esScenario: "Surge una oportunidad de entrenamiento para un programa (ECM/CCM) con el que nunca has trabajado. Requeriría horas extra durante 3 semanas pero no es requerido para tu puesto actual.",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      { id: "g1_a", text: "Sign up immediately — expanding your skillset makes you more valuable and opens career doors", esText: "Inscribirte inmediatamente — expandir tus habilidades te hace más valioso/a y abre puertas profesionales", score: 4, behaviorTag: "learning-oriented" },
      { id: "g1_b", text: "Check if it aligns with your career goals before committing", esText: "Verificar si se alinea con tus metas profesionales antes de comprometerte", score: 3, behaviorTag: "strategic-learner" },
      { id: "g1_c", text: "Ask if you can do it during work hours — you don't want to give up personal time", esText: "Preguntar si puedes hacerlo durante horas de trabajo — no quieres sacrificar tu tiempo personal", score: 2, behaviorTag: "conditional" },
      { id: "g1_d", text: "Skip it — you're already good at your current role", esText: "Omitirlo — ya eres bueno/a en tu puesto actual", score: 1, behaviorTag: "complacent" },
    ],
  },
  {
    id: "growth_2",
    domain: "growth",
    scenario: "You've had a difficult week: a patient crisis, a system outage that lost your documentation, and negative feedback from a supervisor. It's Friday afternoon.",
    esScenario: "Has tenido una semana difícil: una crisis de paciente, una caída del sistema que perdió tu documentación y retroalimentación negativa de un supervisor. Es viernes por la tarde.",
    question: "How do you feel going into the weekend?",
    esQuestion: "¿Cómo te sientes al entrar al fin de semana?",
    options: [
      { id: "g2_a", text: "Tired but motivated — you reflect on what you learned, plan how to recover next week, and find ways to recharge", esText: "Cansado/a pero motivado/a — reflexionas sobre lo que aprendiste, planificas cómo recuperarte la próxima semana y buscas formas de recargar energías", score: 4, behaviorTag: "resilient" },
      { id: "g2_b", text: "Stressed but able to disconnect — you'll deal with it Monday", esText: "Estresado/a pero capaz de desconectar — lo manejarás el lunes", score: 3, behaviorTag: "compartmentalizer" },
      { id: "g2_c", text: "Frustrated and questioning whether this job is worth it", esText: "Frustrado/a y cuestionando si este trabajo vale la pena", score: 2, behaviorTag: "wavering" },
      { id: "g2_d", text: "Burned out — you dread going back on Monday", esText: "Agotado/a — temes regresar el lunes", score: 1, behaviorTag: "depleted" },
    ],
  },
  {
    id: "growth_3",
    domain: "growth",
    scenario: "You've been in your current FQHC role for 2 years and are comfortable. A new position opens up that would be a step up but requires skills you don't fully have yet.",
    esScenario: "Has estado en tu puesto actual de FQHC por 2 años y estás cómodo/a. Se abre una nueva posición que sería un paso adelante pero requiere habilidades que aún no tienes completamente.",
    question: "What's your reaction?",
    esQuestion: "¿Cuál es tu reacción?",
    options: [
      { id: "g3_a", text: "Excited — apply immediately, highlight transferable skills, and commit to closing gaps quickly if hired", esText: "Emocionado/a — postularte inmediatamente, destacar habilidades transferibles y comprometerte a cerrar brechas rápidamente si te contratan", score: 4, behaviorTag: "ambitious" },
      { id: "g3_b", text: "Interested but cautious — research the role thoroughly and apply if the gap seems bridgeable", esText: "Interesado/a pero cauteloso/a — investigar el puesto a fondo y postularte si la brecha parece superable", score: 3, behaviorTag: "calculated" },
      { id: "g3_c", text: "Tempted but nervous — wait for a position that better matches your current skills", esText: "Tentado/a pero nervioso/a — esperar una posición que coincida mejor con tus habilidades actuales", score: 2, behaviorTag: "risk-averse" },
      { id: "g3_d", text: "Stay where you are — you've built good relationships and know the job well", esText: "Quedarte donde estás — has construido buenas relaciones y conoces bien el trabajo", score: 1, behaviorTag: "comfort-seeking" },
    ],
  },
];

/* --- Role-Specific Questions (imported from dedicated data file) ---- */

import { ROLE_SPECIFIC_QUESTIONS as _ROLE_SPECIFIC_QUESTIONS_DATA } from "./role-specific-questions";

/**
 * Role-specific behavioral scenario questions.
 * 4 per role (one per domain) × 8 roles = 32 questions.
 * These are mixed with universal questions to create a tailored assessment.
 */
export const ROLE_SPECIFIC_QUESTIONS: (AssessmentQuestion & { roleId: string })[] = _ROLE_SPECIFIC_QUESTIONS_DATA;

/**
 * Returns 12 assessment questions tailored for the given role:
 *   8 universal (first 2 per domain from ASSESSMENT_QUESTIONS)
 * + 4 role-specific (1 per domain from ROLE_SPECIFIC_QUESTIONS)
 *
 * Falls back to the original 12 universal questions if the role has no
 * role-specific questions defined yet.
 */
export function getQuestionsForRole(roleId?: string): AssessmentQuestion[] {
  if (!roleId) return ASSESSMENT_QUESTIONS;

  const roleQuestions = ROLE_SPECIFIC_QUESTIONS.filter(
    (q) => q.roleId === roleId,
  );

  // If we don't have role-specific questions for this role, use all universal
  if (roleQuestions.length === 0) return ASSESSMENT_QUESTIONS;

  // Take first 2 universal questions per domain
  const domainIds: DomainId[] = ["mission", "people", "execution", "growth"];
  const universalPicks: AssessmentQuestion[] = [];

  for (const domain of domainIds) {
    const domainQuestions = ASSESSMENT_QUESTIONS.filter(
      (q) => q.domain === domain,
    );
    universalPicks.push(...domainQuestions.slice(0, 2));
  }

  // Add 1 role-specific question per domain
  const roleSpecificPicks: AssessmentQuestion[] = [];
  for (const domain of domainIds) {
    const rq = roleQuestions.find((q) => q.domain === domain);
    if (rq) roleSpecificPicks.push(rq);
  }

  return [...universalPicks, ...roleSpecificPicks];
}

/* --- Scoring Functions --------------------------------------------- */

function getLevel(score: number): DomainScore["level"] {
  if (score >= 10) return "strength";
  if (score >= 7) return "developing";
  return "growth_area";
}

/**
 * Calculates domain scores from the user's answers.
 * @param answers — Record of questionId → selected optionId
 * @param locale — "en" | "es" (defaults to "en")
 * @param roleId — Optional role ID for role-tailored questions and insights
 */
export function calculateAssessmentResults(
  answers: Record<string, string>,
  locale?: string,
  roleId?: string,
): AssessmentResults {
  // Use role-specific question set if roleId provided
  const questions = getQuestionsForRole(roleId);

  const domainTotals: Record<DomainId, number> = {
    mission: 0,
    people: 0,
    execution: 0,
    growth: 0,
  };

  // Sum scores per domain
  for (const question of questions) {
    const selectedOptionId = answers[question.id];
    if (!selectedOptionId) continue;
    const option = question.options.find((o) => o.id === selectedOptionId);
    if (option) {
      domainTotals[question.domain] += option.score;
    }
  }

  // Build domain scores (3 questions per domain × 4 max = 12)
  const MAX_PER_DOMAIN = 12;
  const domainScores: Record<DomainId, DomainScore> = {} as Record<
    DomainId,
    DomainScore
  >;

  const domainIds: DomainId[] = ["mission", "people", "execution", "growth"];

  for (const domain of domainIds) {
    const score = domainTotals[domain];
    domainScores[domain] = {
      score,
      max: MAX_PER_DOMAIN,
      percentage: Math.round((score / MAX_PER_DOMAIN) * 100),
      level: getLevel(score),
    };
  }

  // Overall score (0-100)
  const totalScore = domainIds.reduce((sum, d) => sum + domainTotals[d], 0);
  const totalMax = MAX_PER_DOMAIN * 4; // 48
  const overallScore = Math.round((totalScore / totalMax) * 100);

  // Find top strength and top growth area
  let topStrength: DomainId = "mission";
  let topGrowthArea: DomainId = "mission";
  let highestScore = -1;
  let lowestScore = 999;

  for (const domain of domainIds) {
    if (domainTotals[domain] > highestScore) {
      highestScore = domainTotals[domain];
      topStrength = domain;
    }
    if (domainTotals[domain] < lowestScore) {
      lowestScore = domainTotals[domain];
      topGrowthArea = domain;
    }
  }

  // Generate insights (role-aware if roleId provided)
  const insights = generateInsights(domainScores, topStrength, topGrowthArea, locale, roleId);

  return {
    domainScores,
    overallScore,
    topStrength,
    topGrowthArea,
    insights,
  };
}

/* --- Insight Generation -------------------------------------------- */

const STRENGTH_MESSAGES: Record<DomainId, string[]> = {
  mission: [
    "Your strong sense of purpose and mission alignment is exactly what FQHCs look for. Candidates with this trait have significantly higher retention rates.",
    "You show remarkable grit and conviction \u2014 qualities that help community health workers push through the hardest days and stay committed to patients who need them most.",
  ],
  people: [
    "Your emotional intelligence and cultural competency set you apart. FQHCs serve diverse communities, and your ability to connect with patients across backgrounds is a key differentiator.",
    "You handle interpersonal dynamics with maturity and empathy \u2014 skills that build trust with patients and create stronger, more collaborative teams.",
  ],
  execution: [
    "You thrive in complexity. Your ability to triage, adapt, and take initiative is exactly what FQHCs need in fast-paced, resource-constrained environments.",
    "Your bias toward action and problem-solving mindset means you don\u2019t just identify issues \u2014 you drive solutions. This is a high-value trait in community health.",
  ],
  growth: [
    "Your learning orientation and resilience position you for rapid career advancement. You see challenges as opportunities, which accelerates professional growth.",
    "Your career ambition combined with genuine curiosity means you\u2019ll continuously develop new skills and take on increasing responsibility.",
  ],
};

const GROWTH_MESSAGES: Record<DomainId, string[]> = {
  mission: [
    "Strengthening your connection to the FQHC mission can help you push through tough days. Consider spending time with patients whose lives have been transformed by community health services.",
    "Building grit and persistence takes practice. Set small, challenging goals and track your follow-through \u2014 this builds the resilience muscle that FQHC work demands.",
  ],
  people: [
    "Developing your ability to have direct, empathetic conversations \u2014 especially when giving or receiving feedback \u2014 will accelerate your effectiveness with both patients and colleagues.",
    "Cultural humility is a journey. Seek out training on health equity and social determinants of health to deepen your understanding of the communities FQHCs serve.",
  ],
  execution: [
    "Building your tolerance for ambiguity and complexity will be your fastest path to career advancement. FQHCs are dynamic environments \u2014 practice making decisions with incomplete information.",
    "Consider developing a personal system for prioritization. When everything feels urgent, having a framework helps you stay focused and productive.",
  ],
  growth: [
    "Pushing yourself to take on new challenges \u2014 even when you don\u2019t feel 100% ready \u2014 is how the strongest community health leaders are built.",
    "Building resilience requires intentional self-care and reflection. Develop routines that help you recover from difficult days so you can show up at your best.",
  ],
};

const NEXT_STEPS: Record<DomainId, string[]> = {
  mission: [
    "Volunteer for patient success story projects to reconnect with your 'why'",
    "Identify a mentor at an FQHC who embodies mission-driven leadership",
    "Set 90-day goals that connect your daily work to patient outcomes",
  ],
  people: [
    "Take a course on motivational interviewing or health literacy",
    "Practice having one difficult conversation per week using the SBI framework (Situation, Behavior, Impact)",
    "Seek feedback from colleagues on your communication style and openness",
  ],
  execution: [
    "Learn a prioritization framework like the Eisenhower Matrix and apply it daily",
    "Volunteer for a cross-functional project to build adaptability muscles",
    "Build proficiency in your EHR system — power users are promoted faster",
  ],
  growth: [
    "Sign up for the next available ECM/CCM training to expand your skillset",
    "Create a 12-month career development plan with specific milestones",
    "Find a career mentor who has advanced through FQHC roles",
  ],
};

/* --- Spanish Insight Messages ---------------------------------------- */

const STRENGTH_MESSAGES_ES: Record<DomainId, string[]> = {
  mission: [
    "Tu fuerte sentido de propósito y alineación con la misión es exactamente lo que buscan los FQHCs. Los candidatos con esta característica tienen tasas de retención significativamente más altas.",
    "Muestras una perseverancia y convicción notables — cualidades que ayudan a los promotores de salud comunitaria a superar los días más difíciles y mantenerse comprometidos con los pacientes que más los necesitan.",
  ],
  people: [
    "Tu inteligencia emocional y competencia cultural te distinguen. Los FQHCs sirven a comunidades diversas y tu capacidad de conectar con pacientes de diferentes orígenes es un diferenciador clave.",
    "Manejas las dinámicas interpersonales con madurez y empatía — habilidades que construyen confianza con los pacientes y crean equipos más fuertes y colaborativos.",
  ],
  execution: [
    "Prosperas en la complejidad. Tu capacidad de hacer triaje, adaptarte y tomar la iniciativa es exactamente lo que necesitan los FQHCs en entornos de ritmo rápido con recursos limitados.",
    "Tu tendencia a la acción y mentalidad de resolución de problemas significa que no solo identificas problemas — impulsas soluciones. Esta es una característica de alto valor en salud comunitaria.",
  ],
  growth: [
    "Tu orientación al aprendizaje y resiliencia te posicionan para un avance profesional rápido. Ves los desafíos como oportunidades, lo que acelera el crecimiento profesional.",
    "Tu ambición profesional combinada con genuina curiosidad significa que continuamente desarrollarás nuevas habilidades y asumirás responsabilidades crecientes.",
  ],
};

const GROWTH_MESSAGES_ES: Record<DomainId, string[]> = {
  mission: [
    "Fortalecer tu conexión con la misión del FQHC puede ayudarte a superar los días difíciles. Considera pasar tiempo con pacientes cuyas vidas han sido transformadas por los servicios de salud comunitaria.",
    "Construir perseverancia y persistencia requiere práctica. Establece metas pequeñas y desafiantes y rastrea tu cumplimiento — esto construye el músculo de resiliencia que exige el trabajo en FQHC.",
  ],
  people: [
    "Desarrollar tu capacidad de tener conversaciones directas y empáticas — especialmente al dar o recibir retroalimentación — acelerará tu efectividad tanto con pacientes como con colegas.",
    "La humildad cultural es un camino. Busca entrenamiento en equidad en salud y determinantes sociales de la salud para profundizar tu comprensión de las comunidades que sirven los FQHCs.",
  ],
  execution: [
    "Desarrollar tu tolerancia a la ambigüedad y complejidad será tu camino más rápido al avance profesional. Los FQHCs son entornos dinámicos — practica tomar decisiones con información incompleta.",
    "Considera desarrollar un sistema personal para priorización. Cuando todo parece urgente, tener un marco te ayuda a mantenerte enfocado/a y productivo/a.",
  ],
  growth: [
    "Impulsarte a asumir nuevos desafíos — incluso cuando no te sientes 100% listo/a — es como se construyen los líderes más fuertes de salud comunitaria.",
    "Construir resiliencia requiere autocuidado y reflexión intencionales. Desarrolla rutinas que te ayuden a recuperarte de días difíciles para que puedas dar lo mejor de ti.",
  ],
};

const NEXT_STEPS_ES: Record<DomainId, string[]> = {
  mission: [
    "Ser voluntario/a en proyectos de historias de éxito de pacientes para reconectar con tu 'por qué'",
    "Identificar un mentor en un FQHC que personifique liderazgo impulsado por la misión",
    "Establecer metas de 90 días que conecten tu trabajo diario con resultados de pacientes",
  ],
  people: [
    "Tomar un curso de entrevista motivacional o alfabetización en salud",
    "Practicar tener una conversación difícil por semana usando el marco SBI (Situación, Comportamiento, Impacto)",
    "Buscar retroalimentación de colegas sobre tu estilo de comunicación y apertura",
  ],
  execution: [
    "Aprender un marco de priorización como la Matriz de Eisenhower y aplicarlo diariamente",
    "Ser voluntario/a en un proyecto multifuncional para desarrollar músculos de adaptabilidad",
    "Desarrollar dominio en tu sistema EHR — los usuarios expertos son promovidos más rápido",
  ],
  growth: [
    "Inscribirte en el próximo entrenamiento disponible de ECM/CCM para expandir tus habilidades",
    "Crear un plan de desarrollo profesional de 12 meses con hitos específicos",
    "Encontrar un mentor profesional que haya avanzado a través de puestos en FQHC",
  ],
};

/* --- Role-Specific Insights (imported from dedicated data file) ----- */

import { ROLE_INSIGHTS as _ROLE_INSIGHTS_DATA } from "./role-insights";

export interface RoleInsightData {
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
}

export const ROLE_INSIGHTS: Record<string, RoleInsightData> = _ROLE_INSIGHTS_DATA;

function generateInsights(
  domainScores: Record<DomainId, DomainScore>,
  topStrength: DomainId,
  topGrowthArea: DomainId,
  locale?: string,
  roleId?: string,
): AssessmentResults["insights"] {
  const isEs = locale === "es";

  // Check if we have role-specific insights
  const roleInsight = roleId ? ROLE_INSIGHTS[roleId] : undefined;

  // --- Strength messages ---
  const strengths: string[] = [];
  const domainIds: DomainId[] = ["mission", "people", "execution", "growth"];

  if (roleInsight) {
    // Use role-specific strength message for the top strength domain
    const msgs = isEs ? roleInsight.esStrengthMessages : roleInsight.strengthMessages;
    strengths.push(msgs[topStrength]);

    // Add a second strength if another domain also scored well
    for (const domain of domainIds) {
      if (domain !== topStrength && domainScores[domain].level === "strength") {
        strengths.push(msgs[domain]);
        break; // only add one more
      }
    }
  } else {
    // Fall back to generic messages
    const strengthMsgs = isEs ? STRENGTH_MESSAGES_ES : STRENGTH_MESSAGES;
    for (const domain of domainIds) {
      if (domainScores[domain].level === "strength") {
        strengths.push(strengthMsgs[domain][0]);
      }
    }
    if (strengths.length === 0) {
      strengths.push(strengthMsgs[topStrength][1]);
    }
  }

  const finalStrengths = strengths.slice(0, 3);

  // --- Growth area messages ---
  let growthAreas: string[];
  if (roleInsight) {
    const msgs = isEs ? roleInsight.esGrowthMessages : roleInsight.growthMessages;
    growthAreas = [msgs[topGrowthArea]];
  } else {
    const growthMsgs = isEs ? GROWTH_MESSAGES_ES : GROWTH_MESSAGES;
    growthAreas = growthMsgs[topGrowthArea].slice(0, 2);
  }

  // --- Next steps ---
  let nextSteps: string[];
  if (roleInsight) {
    const msgs = isEs ? roleInsight.esNextSteps : roleInsight.nextSteps;
    nextSteps = [
      msgs[topGrowthArea],
      msgs[topStrength],
      isEs
        ? "Usa el Creador de Currículum FQHC para destacar tus fortalezas en tu currículum"
        : "Use the FQHC Resume Builder to highlight your strengths on your resume",
    ];
  } else {
    const nextStepsMsgs = isEs ? NEXT_STEPS_ES : NEXT_STEPS;
    nextSteps = [
      nextStepsMsgs[topGrowthArea][0],
      nextStepsMsgs[topGrowthArea][1],
      isEs
        ? "Usa el Creador de Currículum FQHC para destacar tus fortalezas en tu currículum"
        : "Use the FQHC Resume Builder to highlight your strengths on your resume",
    ];
  }

  return {
    strengths: finalStrengths,
    growthAreas,
    nextSteps,
  };
}

/* --- i18n helpers ------------------------------------------------- */

const DOMAIN_NAMES_ES: Record<DomainId, string> = {
  mission: "Misión y Motivación",
  people: "Personas y Comunicación",
  execution: "Ejecución y Adaptabilidad",
  growth: "Mentalidad de Crecimiento",
};

const DOMAIN_DESCRIPTIONS_ES: Record<DomainId, string> = {
  mission:
    "Propósito, perseverancia y compromiso con comunidades desatendidas. Predice la retención y el éxito a largo plazo en FQHCs.",
  people:
    "Inteligencia emocional, empatía, competencia cultural y colaboración en equipo. Predice satisfacción del paciente y efectividad del equipo.",
  execution:
    "Resolución de problemas, manejo de complejidad, iniciativa y aprendizaje rápido. Predice desempeño en entornos dinámicos de FQHC.",
  growth:
    "Curiosidad, receptividad a retroalimentación, ambición profesional y resiliencia. Predice la trayectoria de desarrollo profesional.",
};

/**
 * Returns the description for a domain.
 * @param locale — "en" | "es" (defaults to "en")
 */
export function getDomainDescription(domainId: DomainId, locale?: string): string {
  if (locale === "es") {
    return DOMAIN_DESCRIPTIONS_ES[domainId] || "";
  }
  const domain = DOMAIN_DEFINITIONS.find((d) => d.id === domainId);
  return domain?.description || "";
}

const LEVEL_LABELS_ES: Record<DomainScore["level"], string> = {
  strength: "Fortaleza",
  developing: "En Desarrollo",
  growth_area: "Área de Crecimiento",
};

/**
 * Returns the display name for a domain.
 * @param locale — "en" | "es" (defaults to "en")
 */
export function getDomainName(domainId: DomainId, locale?: string): string {
  if (locale === "es") {
    return DOMAIN_NAMES_ES[domainId] || domainId;
  }
  const domain = DOMAIN_DEFINITIONS.find((d) => d.id === domainId);
  return domain?.name || domainId;
}

/**
 * Returns the level label for display.
 * @param locale — "en" | "es" (defaults to "en")
 */
export function getLevelLabel(level: DomainScore["level"], locale?: string): string {
  if (locale === "es") {
    return LEVEL_LABELS_ES[level] || level;
  }
  switch (level) {
    case "strength":
      return "Strength";
    case "developing":
      return "Developing";
    case "growth_area":
      return "Growth Area";
  }
}
