/* ------------------------------------------------------------------ */
/*  Career Insights Assessment Engine                                  */
/*  Adapted from the TPB Universal Assessment Framework for FQHC roles */
/* ------------------------------------------------------------------ */

/* --- Types --------------------------------------------------------- */

export type DomainId = "mission" | "people" | "execution" | "growth";

export interface AnswerOption {
  id: string;
  text: string;
  score: number; // 1-4 (unskilled → skilled)
  behaviorTag: string;
}

export interface AssessmentQuestion {
  id: string;
  domain: DomainId;
  scenario: string;
  question: string;
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
    scenario:
      "A patient you've been working with for months tells you they're giving up on their treatment plan because 'nothing ever changes.'",
    question: "What would you most likely do?",
    options: [
      {
        id: "m1_a",
        text: "Draw on your own connection to the mission to re-engage them with empathy and persistence",
        score: 4,
        behaviorTag: "purpose-driven",
      },
      {
        id: "m1_b",
        text: "Refer them to behavioral health and continue following up",
        score: 3,
        behaviorTag: "resourceful",
      },
      {
        id: "m1_c",
        text: "Document their decision and move to other patients on your caseload",
        score: 2,
        behaviorTag: "task-focused",
      },
      {
        id: "m1_d",
        text: "Accept their decision \u2014 you can\u2019t force someone to engage",
        score: 1,
        behaviorTag: "avoidant",
      },
    ],
  },
  {
    id: "mission_2",
    domain: "mission",
    scenario:
      "You've been denied a promotion twice despite strong performance reviews. Your supervisor says 'there just isn\u2019t budget right now.'",
    question: "What\u2019s your next move?",
    options: [
      {
        id: "m2_a",
        text: "Ask for specific milestones that would guarantee promotion, pursue additional certifications, and keep performing at a high level",
        score: 4,
        behaviorTag: "grit",
      },
      {
        id: "m2_b",
        text: "Look for growth opportunities at other FQHCs while staying committed to your current role",
        score: 3,
        behaviorTag: "strategic",
      },
      {
        id: "m2_c",
        text: "Reduce your extra effort to match your current compensation",
        score: 2,
        behaviorTag: "disengaging",
      },
      {
        id: "m2_d",
        text: "Start looking for a completely different career path",
        score: 1,
        behaviorTag: "flight-risk",
      },
    ],
  },
  {
    id: "mission_3",
    domain: "mission",
    scenario:
      "Your FQHC is implementing a new care model that you believe will hurt patient outcomes. Your supervisor is enthusiastic about it.",
    question: "What do you do?",
    options: [
      {
        id: "m3_a",
        text: "Respectfully present your concerns with data/evidence, and if overruled, commit fully to the new model while tracking outcomes",
        score: 4,
        behaviorTag: "principled-commitment",
      },
      {
        id: "m3_b",
        text: "Voice your concerns once, then follow the new model",
        score: 3,
        behaviorTag: "compliant",
      },
      {
        id: "m3_c",
        text: "Go along with it \u2014 management makes these decisions",
        score: 2,
        behaviorTag: "passive",
      },
      {
        id: "m3_d",
        text: "Comply publicly but continue doing things the old way when no one is watching",
        score: 1,
        behaviorTag: "undermining",
      },
    ],
  },

  /* ---- Domain 2: People & Communication ---- */
  {
    id: "people_1",
    domain: "people",
    scenario:
      "A patient is visibly upset about a long wait time. When you finally see them, they say 'nobody here cares about people like me.'",
    question: "How do you respond?",
    options: [
      {
        id: "p1_a",
        text: "Acknowledge their frustration, validate their feeling, ask what 'people like me' means to them, and address the systemic issue",
        score: 4,
        behaviorTag: "culturally-attuned",
      },
      {
        id: "p1_b",
        text: "Apologize sincerely for the wait and focus on providing excellent care",
        score: 3,
        behaviorTag: "empathetic",
      },
      {
        id: "p1_c",
        text: "Explain that the clinic is understaffed and you\u2019re doing your best",
        score: 2,
        behaviorTag: "defensive",
      },
      {
        id: "p1_d",
        text: "Remind them that everyone waits equally and move on to clinical needs",
        score: 1,
        behaviorTag: "dismissive",
      },
    ],
  },
  {
    id: "people_2",
    domain: "people",
    scenario:
      "A colleague consistently doesn\u2019t complete their documentation on time, which affects your ability to follow up with shared patients.",
    question: "What do you do?",
    options: [
      {
        id: "p2_a",
        text: "Have a direct, private conversation about the impact, ask if they need support, and offer to problem-solve together",
        score: 4,
        behaviorTag: "collaborative-confronter",
      },
      {
        id: "p2_b",
        text: "Bring it up with your supervisor and let them handle it",
        score: 3,
        behaviorTag: "escalator",
      },
      {
        id: "p2_c",
        text: "Work around the issue by checking in with patients directly",
        score: 2,
        behaviorTag: "conflict-avoidant",
      },
      {
        id: "p2_d",
        text: "Document the pattern in case it becomes a bigger issue",
        score: 1,
        behaviorTag: "passive-aggressive",
      },
    ],
  },
  {
    id: "people_3",
    domain: "people",
    scenario:
      "During a team meeting, a newer colleague points out that your approach to patient outreach might not be working for a specific population.",
    question: "How do you react?",
    options: [
      {
        id: "p3_a",
        text: "Thank them, ask questions to understand their perspective, and explore whether combining approaches would work better",
        score: 4,
        behaviorTag: "growth-oriented",
      },
      {
        id: "p3_b",
        text: "Listen openly and consider their point, but explain why you do it your way",
        score: 3,
        behaviorTag: "receptive",
      },
      {
        id: "p3_c",
        text: "Acknowledge their input but feel defensive internally",
        score: 2,
        behaviorTag: "surface-receptive",
      },
      {
        id: "p3_d",
        text: "Dismiss it \u2014 they don\u2019t have enough experience to judge your methods",
        score: 1,
        behaviorTag: "closed-minded",
      },
    ],
  },

  /* ---- Domain 3: Execution & Adaptability ---- */
  {
    id: "execution_1",
    domain: "execution",
    scenario:
      "You arrive at work to find: 3 urgent patient callbacks, a new ECM enrollment deadline today, a mandatory training in 2 hours, and your EHR is running slow.",
    question: "What do you do first?",
    options: [
      {
        id: "e1_a",
        text: "Quickly triage \u2014 identify which callback is most time-sensitive, delegate or reschedule what you can, and communicate proactively about what won\u2019t get done today",
        score: 4,
        behaviorTag: "strategic-triage",
      },
      {
        id: "e1_b",
        text: "Start with the ECM deadline since it\u2019s time-bound, then work through callbacks",
        score: 3,
        behaviorTag: "deadline-driven",
      },
      {
        id: "e1_c",
        text: "Begin with the callbacks since patients come first, and deal with the rest as you can",
        score: 2,
        behaviorTag: "single-track",
      },
      {
        id: "e1_d",
        text: "Feel overwhelmed and ask your supervisor for guidance on prioritization",
        score: 1,
        behaviorTag: "dependent",
      },
    ],
  },
  {
    id: "execution_2",
    domain: "execution",
    scenario:
      "Your FQHC just switched EHR systems. You were expert-level on the old system. After two weeks on the new system, you\u2019re still slow and making errors.",
    question: "What\u2019s your approach?",
    options: [
      {
        id: "e2_a",
        text: "Actively seek training resources, practice outside of work hours, ask power users for tips, and accept that temporary discomfort is part of growth",
        score: 4,
        behaviorTag: "adaptable-learner",
      },
      {
        id: "e2_b",
        text: "Focus on learning the essentials first and gradually expand your skills",
        score: 3,
        behaviorTag: "methodical",
      },
      {
        id: "e2_c",
        text: "Do your best but voice frustration about the switch to management",
        score: 2,
        behaviorTag: "resistant",
      },
      {
        id: "e2_d",
        text: "Stick to the minimum required functions and avoid the features you don\u2019t understand",
        score: 1,
        behaviorTag: "avoidant",
      },
    ],
  },
  {
    id: "execution_3",
    domain: "execution",
    scenario:
      "You notice that many of your ECM patients are missing follow-up appointments. You have an idea for a text reminder system but it\u2019s not part of your role to implement it.",
    question: "What do you do?",
    options: [
      {
        id: "e3_a",
        text: "Draft a quick proposal, present it to your supervisor, and offer to pilot it with your caseload",
        score: 4,
        behaviorTag: "bias-to-action",
      },
      {
        id: "e3_b",
        text: "Mention the idea in a team meeting and see if there\u2019s interest",
        score: 3,
        behaviorTag: "contributive",
      },
      {
        id: "e3_c",
        text: "Add it to a suggestion box or email and wait for a response",
        score: 2,
        behaviorTag: "passive-contributor",
      },
      {
        id: "e3_d",
        text: "Focus on your own caseload \u2014 system-level changes aren\u2019t your responsibility",
        score: 1,
        behaviorTag: "narrow-scope",
      },
    ],
  },

  /* ---- Domain 4: Growth Mindset ---- */
  {
    id: "growth_1",
    domain: "growth",
    scenario:
      "A training opportunity comes up for a program (ECM/CCM) you\u2019ve never worked with. It would require extra hours for 3 weeks but isn\u2019t required for your current role.",
    question: "What do you do?",
    options: [
      {
        id: "g1_a",
        text: "Sign up immediately \u2014 expanding your skillset makes you more valuable and opens career doors",
        score: 4,
        behaviorTag: "learning-oriented",
      },
      {
        id: "g1_b",
        text: "Check if it aligns with your career goals before committing",
        score: 3,
        behaviorTag: "strategic-learner",
      },
      {
        id: "g1_c",
        text: "Ask if you can do it during work hours \u2014 you don\u2019t want to give up personal time",
        score: 2,
        behaviorTag: "conditional",
      },
      {
        id: "g1_d",
        text: "Skip it \u2014 you\u2019re already good at your current role",
        score: 1,
        behaviorTag: "complacent",
      },
    ],
  },
  {
    id: "growth_2",
    domain: "growth",
    scenario:
      "You\u2019ve had a difficult week: a patient crisis, a system outage that lost your documentation, and negative feedback from a supervisor. It\u2019s Friday afternoon.",
    question: "How do you feel going into the weekend?",
    options: [
      {
        id: "g2_a",
        text: "Tired but motivated \u2014 you reflect on what you learned, plan how to recover next week, and find ways to recharge",
        score: 4,
        behaviorTag: "resilient",
      },
      {
        id: "g2_b",
        text: "Stressed but able to disconnect \u2014 you\u2019ll deal with it Monday",
        score: 3,
        behaviorTag: "compartmentalizer",
      },
      {
        id: "g2_c",
        text: "Frustrated and questioning whether this job is worth it",
        score: 2,
        behaviorTag: "wavering",
      },
      {
        id: "g2_d",
        text: "Burned out \u2014 you dread going back on Monday",
        score: 1,
        behaviorTag: "depleted",
      },
    ],
  },
  {
    id: "growth_3",
    domain: "growth",
    scenario:
      "You\u2019ve been in your current FQHC role for 2 years and are comfortable. A new position opens up that would be a step up but requires skills you don\u2019t fully have yet.",
    question: "What\u2019s your reaction?",
    options: [
      {
        id: "g3_a",
        text: "Excited \u2014 apply immediately, highlight transferable skills, and commit to closing gaps quickly if hired",
        score: 4,
        behaviorTag: "ambitious",
      },
      {
        id: "g3_b",
        text: "Interested but cautious \u2014 research the role thoroughly and apply if the gap seems bridgeable",
        score: 3,
        behaviorTag: "calculated",
      },
      {
        id: "g3_c",
        text: "Tempted but nervous \u2014 wait for a position that better matches your current skills",
        score: 2,
        behaviorTag: "risk-averse",
      },
      {
        id: "g3_d",
        text: "Stay where you are \u2014 you\u2019ve built good relationships and know the job well",
        score: 1,
        behaviorTag: "comfort-seeking",
      },
    ],
  },
];

/* --- Scoring Functions --------------------------------------------- */

function getLevel(score: number): DomainScore["level"] {
  if (score >= 10) return "strength";
  if (score >= 7) return "developing";
  return "growth_area";
}

/**
 * Calculates domain scores from the user's answers.
 * @param answers — Record of questionId → selected optionId
 */
export function calculateAssessmentResults(
  answers: Record<string, string>,
): AssessmentResults {
  const domainTotals: Record<DomainId, number> = {
    mission: 0,
    people: 0,
    execution: 0,
    growth: 0,
  };

  // Sum scores per domain
  for (const question of ASSESSMENT_QUESTIONS) {
    const selectedOptionId = answers[question.id];
    if (!selectedOptionId) continue;
    const option = question.options.find((o) => o.id === selectedOptionId);
    if (option) {
      domainTotals[question.domain] += option.score;
    }
  }

  // Build domain scores
  const MAX_PER_DOMAIN = 12; // 3 questions × 4 max score
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

  // Generate insights
  const insights = generateInsights(domainScores, topStrength, topGrowthArea);

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
    "Volunteer for patient success story projects to reconnect with your \u2018why\u2019",
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
    "Build proficiency in your EHR system \u2014 power users are promoted faster",
  ],
  growth: [
    "Sign up for the next available ECM/CCM training to expand your skillset",
    "Create a 12-month career development plan with specific milestones",
    "Find a career mentor who has advanced through FQHC roles",
  ],
};

function generateInsights(
  domainScores: Record<DomainId, DomainScore>,
  topStrength: DomainId,
  topGrowthArea: DomainId,
): AssessmentResults["insights"] {
  // Gather strength messages for domains scoring as "strength"
  const strengths: string[] = [];
  const domainIds: DomainId[] = ["mission", "people", "execution", "growth"];

  for (const domain of domainIds) {
    if (domainScores[domain].level === "strength") {
      strengths.push(STRENGTH_MESSAGES[domain][0]);
    }
  }

  // If no domain reached "strength" level, still highlight the top one
  if (strengths.length === 0) {
    strengths.push(STRENGTH_MESSAGES[topStrength][1]);
  }

  // Cap at 3 strength messages
  const finalStrengths = strengths.slice(0, 3);

  // Growth area messages for the lowest-scoring domain
  const growthAreas = GROWTH_MESSAGES[topGrowthArea].slice(0, 2);

  // Next steps: 1 from growth area + 2 general
  const nextSteps = [
    NEXT_STEPS[topGrowthArea][0],
    NEXT_STEPS[topGrowthArea][1],
    "Use the FQHC Resume Builder to highlight your strengths on your resume",
  ];

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
