// okr-course-modules.ts
// Interactive OKR learning course content for FQHC professionals
// 6 modules with hands-on exercises using FQHC-specific examples
// Last updated: 2026-03-09

import type { OKRDomain } from "./fqhc-okr-templates";

/* ------------------------------------------------------------------ */
/*  Exercise Types                                                     */
/* ------------------------------------------------------------------ */

export interface ConceptCardExercise {
  type: "concept-card";
  id: string;
  cards: {
    front: { en: string; es: string };
    back: { en: string; es: string };
    fqhcExample?: { en: string; es: string };
  }[];
  xpReward: number;
}

export interface ClassifierExercise {
  type: "classifier";
  id: string;
  instruction: { en: string; es: string };
  items: {
    text: { en: string; es: string };
    isGood: boolean;
    explanation: { en: string; es: string };
  }[];
  xpReward: number;
}

export interface DragSortExercise {
  type: "drag-sort";
  id: string;
  instruction: { en: string; es: string };
  items: {
    text: { en: string; es: string };
    correctPosition: number;
  }[];
  xpReward: number;
}

export interface ScoringSimExercise {
  type: "scoring-sim";
  id: string;
  instruction: { en: string; es: string };
  scenarios: {
    keyResult: { en: string; es: string };
    target: string;
    actual: string;
    correctScore: number; // 0.0 - 1.0
    explanation: { en: string; es: string };
  }[];
  xpReward: number;
}

export interface MiniQuizExercise {
  type: "mini-quiz";
  id: string;
  questions: {
    question: { en: string; es: string };
    options: {
      text: { en: string; es: string };
      isCorrect: boolean;
      explanation: { en: string; es: string };
    }[];
  }[];
  xpReward: number;
}

export type OkrExercise =
  | ConceptCardExercise
  | ClassifierExercise
  | DragSortExercise
  | ScoringSimExercise
  | MiniQuizExercise;

/* ------------------------------------------------------------------ */
/*  Module Type                                                        */
/* ------------------------------------------------------------------ */

export interface OkrCourseModule {
  id: string;
  order: number;
  title: { en: string; es: string };
  subtitle: { en: string; es: string };
  description: { en: string; es: string };
  estimatedMinutes: number;
  icon: string; // Lucide icon name
  color: string; // tailwind color
  learningObjectives: { en: string; es: string }[];
  conceptContent: {
    heading: { en: string; es: string };
    body: { en: string; es: string };
  }[];
  exercises: OkrExercise[];
  totalXP: number;
}

/* ------------------------------------------------------------------ */
/*  Module 1: What Are OKRs?                                           */
/* ------------------------------------------------------------------ */

const module1WhatAreOkrs: OkrCourseModule = {
  id: "what-are-okrs",
  order: 1,
  title: {
    en: "What Are OKRs?",
    es: "¿Qué son los OKRs?",
  },
  subtitle: {
    en: "The framework that transformed Intel, Google, and now community health",
    es: "El marco que transformó Intel, Google y ahora la salud comunitaria",
  },
  description: {
    en: "Learn the origin story of OKRs, why they matter for FQHCs facing funding uncertainty, and how they differ from traditional goal-setting.",
    es: "Aprende el origen de los OKRs, por qué importan para FQHCs enfrentando incertidumbre de financiamiento, y cómo difieren de la planificación tradicional.",
  },
  estimatedMinutes: 7,
  icon: "Target",
  color: "teal",
  learningObjectives: [
    {
      en: "Define OKRs and explain their two components",
      es: "Definir OKRs y explicar sus dos componentes",
    },
    {
      en: "Explain why OKRs are especially valuable during FQHC funding uncertainty",
      es: "Explicar por qué los OKRs son especialmente valiosos durante la incertidumbre de financiamiento de FQHCs",
    },
    {
      en: "Distinguish OKRs from KPIs, strategic plans, and to-do lists",
      es: "Distinguir OKRs de KPIs, planes estratégicos y listas de tareas",
    },
  ],
  conceptContent: [
    {
      heading: {
        en: "Where OKRs Come From",
        es: "De dónde vienen los OKRs",
      },
      body: {
        en: "Andy Grove created OKRs at Intel in the 1970s. John Doerr later brought them to Google. The idea is simple: set ambitious Objectives (what you want to achieve) and measure them with Key Results (how you know you got there). Grove called it 'the most important thing' — knowing what matters most right now.",
        es: "Andy Grove creó los OKRs en Intel en los años 70. John Doerr luego los llevó a Google. La idea es simple: establecer Objetivos ambiciosos (lo que quieres lograr) y medirlos con Resultados Clave (cómo sabes que llegaste). Grove lo llamó 'lo más importante' — saber qué importa más ahora mismo.",
      },
    },
    {
      heading: {
        en: "Why FQHCs Need OKRs Now",
        es: "Por qué los FQHCs necesitan OKRs ahora",
      },
      body: {
        en: "With potential federal funding cuts, 340B uncertainty, and growing patient demand, FQHC leaders can't afford scattered priorities. OKRs force alignment: every team, from billing to clinical, pulls toward the same 3-5 objectives. When resources shrink, focus multiplies impact.",
        es: "Con posibles recortes de financiamiento federal, incertidumbre del 340B y creciente demanda de pacientes, los líderes de FQHCs no pueden permitirse prioridades dispersas. Los OKRs fuerzan alineación: cada equipo, desde facturación hasta clínica, trabaja hacia los mismos 3-5 objetivos. Cuando los recursos disminuyen, el enfoque multiplica el impacto.",
      },
    },
    {
      heading: {
        en: "OKRs vs. Everything Else",
        es: "OKRs vs. todo lo demás",
      },
      body: {
        en: "KPIs measure ongoing health (patient visits per month). Strategic plans describe 3-5 year vision. To-do lists track tasks. OKRs sit in the middle: quarterly commitments that stretch your team beyond 'business as usual' toward measurable transformation. They answer: 'What's the most important thing we can accomplish in the next 90 days?'",
        es: "Los KPIs miden la salud continua (visitas de pacientes por mes). Los planes estratégicos describen la visión de 3-5 años. Las listas de tareas rastrean actividades. Los OKRs están en el medio: compromisos trimestrales que llevan a tu equipo más allá del 'negocio como siempre' hacia una transformación medible. Responden: '¿Qué es lo más importante que podemos lograr en los próximos 90 días?'",
      },
    },
  ],
  exercises: [
    {
      type: "concept-card",
      id: "okr-basics-cards",
      cards: [
        {
          front: {
            en: "Objective",
            es: "Objetivo",
          },
          back: {
            en: "A qualitative, inspirational goal that describes WHERE you want to go. Should be memorable, motivating, and time-bound.",
            es: "Una meta cualitativa e inspiradora que describe A DÓNDE quieres llegar. Debe ser memorable, motivadora y con plazo definido.",
          },
          fqhcExample: {
            en: "\"Become the most trusted healthcare home for uninsured families in our county\"",
            es: "\"Convertirnos en el hogar de salud más confiable para familias sin seguro en nuestro condado\"",
          },
        },
        {
          front: {
            en: "Key Result",
            es: "Resultado Clave",
          },
          back: {
            en: "A quantitative metric that measures progress toward the Objective. Must be specific, measurable, and have a clear target number.",
            es: "Una métrica cuantitativa que mide el progreso hacia el Objetivo. Debe ser específica, medible y tener un número objetivo claro.",
          },
          fqhcExample: {
            en: "\"Increase new patient enrollment from uninsured population from 120 to 200 per quarter\"",
            es: "\"Aumentar inscripción de nuevos pacientes de población sin seguro de 120 a 200 por trimestre\"",
          },
        },
        {
          front: {
            en: "The 0.6-0.7 Sweet Spot",
            es: "El punto ideal 0.6-0.7",
          },
          back: {
            en: "OKRs use a 0.0-1.0 scoring scale. A 'perfect' score is 0.6-0.7, NOT 1.0. Why? If you always hit 1.0, your goals aren't ambitious enough. If you always score below 0.4, they're unrealistic.",
            es: "Los OKRs usan una escala de 0.0 a 1.0. Un puntaje 'perfecto' es 0.6-0.7, NO 1.0. ¿Por qué? Si siempre llegas a 1.0, tus metas no son suficientemente ambiciosas. Si siempre estás bajo 0.4, son irrealistas.",
          },
        },
        {
          front: {
            en: "CFR: The Other Half",
            es: "CFR: La otra mitad",
          },
          back: {
            en: "OKRs work best with CFRs — Conversations, Feedback, and Recognition. Weekly check-ins, not just quarterly reviews. Doerr calls this the 'continuous performance management' that makes OKRs actually stick.",
            es: "Los OKRs funcionan mejor con CFRs — Conversaciones, Retroalimentación y Reconocimiento. Revisiones semanales, no solo trimestrales. Doerr llama a esto la 'gestión continua del desempeño' que hace que los OKRs realmente funcionen.",
          },
        },
      ],
      xpReward: 40,
    },
    {
      type: "mini-quiz",
      id: "okr-basics-quiz",
      questions: [
        {
          question: {
            en: "What score range indicates a well-calibrated OKR?",
            es: "¿Qué rango de puntaje indica un OKR bien calibrado?",
          },
          options: [
            {
              text: { en: "1.0 (100%)", es: "1.0 (100%)" },
              isCorrect: false,
              explanation: {
                en: "Consistently hitting 1.0 means your OKRs aren't ambitious enough. You're sandbagging!",
                es: "Alcanzar consistentemente 1.0 significa que tus OKRs no son suficientemente ambiciosos. ¡Estás jugando a lo seguro!",
              },
            },
            {
              text: { en: "0.6-0.7 (60-70%)", es: "0.6-0.7 (60-70%)" },
              isCorrect: true,
              explanation: {
                en: "Correct! The sweet spot is 0.6-0.7 — it means the objective was genuinely stretching but achievable with strong effort.",
                es: "¡Correcto! El punto ideal es 0.6-0.7 — significa que el objetivo realmente exigía esfuerzo pero era alcanzable con trabajo fuerte.",
              },
            },
            {
              text: { en: "0.3-0.4 (30-40%)", es: "0.3-0.4 (30-40%)" },
              isCorrect: false,
              explanation: {
                en: "Scores this low consistently suggest the OKR was unrealistic or resources weren't allocated properly.",
                es: "Puntajes así de bajos consistentemente sugieren que el OKR era irrealista o los recursos no se asignaron correctamente.",
              },
            },
          ],
        },
        {
          question: {
            en: "Which of these is an Objective (not a Key Result)?",
            es: "¿Cuál de estos es un Objetivo (no un Resultado Clave)?",
          },
          options: [
            {
              text: {
                en: "Reduce no-show rate from 22% to 12%",
                es: "Reducir tasa de inasistencia del 22% al 12%",
              },
              isCorrect: false,
              explanation: {
                en: "This has a specific number and metric — it's a Key Result. Objectives are qualitative and inspirational.",
                es: "Esto tiene un número específico y métrica — es un Resultado Clave. Los Objetivos son cualitativos e inspiradores.",
              },
            },
            {
              text: {
                en: "Transform patient scheduling into a frictionless experience",
                es: "Transformar la programación de pacientes en una experiencia sin fricciones",
              },
              isCorrect: true,
              explanation: {
                en: "Yes! This is aspirational and qualitative — it describes a future state. Key Results would then measure specific improvements.",
                es: "¡Sí! Esto es aspiracional y cualitativo — describe un estado futuro. Los Resultados Clave medirían mejoras específicas.",
              },
            },
            {
              text: {
                en: "Increase UDS patient count to 15,000",
                es: "Aumentar conteo de pacientes UDS a 15,000",
              },
              isCorrect: false,
              explanation: {
                en: "This is a measurable target with a specific number — it's a Key Result.",
                es: "Este es un objetivo medible con un número específico — es un Resultado Clave.",
              },
            },
          ],
        },
      ],
      xpReward: 30,
    },
  ],
  totalXP: 70,
};

/* ------------------------------------------------------------------ */
/*  Module 2: Anatomy of Great OKRs                                    */
/* ------------------------------------------------------------------ */

const module2Anatomy: OkrCourseModule = {
  id: "anatomy-of-great-okrs",
  order: 2,
  title: {
    en: "Anatomy of Great OKRs",
    es: "Anatomía de grandes OKRs",
  },
  subtitle: {
    en: "What separates good OKRs from useless ones",
    es: "Qué separa los buenos OKRs de los inútiles",
  },
  description: {
    en: "Study real FQHC OKR examples, learn the characteristics that make OKRs effective, and practice spotting common mistakes.",
    es: "Estudia ejemplos reales de OKRs de FQHCs, aprende las características que hacen efectivos a los OKRs y practica identificando errores comunes.",
  },
  estimatedMinutes: 8,
  icon: "Search",
  color: "blue",
  learningObjectives: [
    {
      en: "Identify the 5 qualities of a strong Objective",
      es: "Identificar las 5 cualidades de un buen Objetivo",
    },
    {
      en: "Recognize measurable vs. vague Key Results",
      es: "Reconocer Resultados Clave medibles vs. vagos",
    },
    {
      en: "Spot the 7 most common OKR mistakes in healthcare",
      es: "Detectar los 7 errores más comunes de OKRs en salud",
    },
  ],
  conceptContent: [
    {
      heading: {
        en: "Five Qualities of a Strong Objective",
        es: "Cinco cualidades de un buen Objetivo",
      },
      body: {
        en: "Great objectives are: (1) Qualitative — no numbers, just direction. (2) Aspirational — they stretch beyond 'business as usual.' (3) Time-bound — typically one quarter. (4) Actionable — your team can influence the outcome. (5) Memorable — you can say it without reading it. An FQHC objective like 'Become the employer of choice for bilingual providers in our region' hits all five.",
        es: "Los buenos objetivos son: (1) Cualitativos — sin números, solo dirección. (2) Aspiracionales — van más allá del 'negocio como siempre.' (3) Con plazo — típicamente un trimestre. (4) Accionables — tu equipo puede influir en el resultado. (5) Memorables — puedes decirlo sin leerlo. Un objetivo FQHC como 'Convertirnos en el empleador preferido para proveedores bilingües en nuestra región' cumple los cinco.",
      },
    },
    {
      heading: {
        en: "Key Results: The SMART Test",
        es: "Resultados Clave: La prueba SMART",
      },
      body: {
        en: "Every Key Result must pass the SMART test: Specific (what exactly?), Measurable (what number?), Achievable (stretch but possible), Relevant (connected to the Objective), Time-bound (by when?). Bad: 'Improve patient experience.' Good: 'Increase patient satisfaction score from 3.2 to 4.1 on Press Ganey by Q3.' The number is the difference.",
        es: "Cada Resultado Clave debe pasar la prueba SMART: Específico (¿qué exactamente?), Medible (¿qué número?), Alcanzable (exigente pero posible), Relevante (conectado al Objetivo), Con plazo (¿para cuándo?). Malo: 'Mejorar experiencia del paciente.' Bueno: 'Aumentar puntaje de satisfacción del paciente de 3.2 a 4.1 en Press Ganey para Q3.' El número es la diferencia.",
      },
    },
    {
      heading: {
        en: "The 7 Deadly Sins of FQHC OKRs",
        es: "Los 7 pecados capitales de los OKRs en FQHCs",
      },
      body: {
        en: "Watch for: (1) Too many — more than 3-5 objectives per quarter. (2) Too safe — if you hit 100%, it wasn't ambitious. (3) Activity-based — 'launch a program' isn't an outcome. (4) No owner — every OKR needs one accountable person. (5) Set and forget — no weekly check-ins. (6) Siloed — departments create OKRs in isolation. (7) Punitive scoring — using OKR scores in performance reviews kills honesty.",
        es: "Cuidado con: (1) Demasiados — más de 3-5 objetivos por trimestre. (2) Demasiado seguros — si llegas al 100%, no era ambicioso. (3) Basados en actividad — 'lanzar un programa' no es un resultado. (4) Sin dueño — cada OKR necesita una persona responsable. (5) Establecer y olvidar — sin revisiones semanales. (6) En silos — departamentos crean OKRs aisladamente. (7) Puntajes punitivos — usar puntajes de OKR en evaluaciones de desempeño mata la honestidad.",
      },
    },
  ],
  exercises: [
    {
      type: "classifier",
      id: "good-bad-okrs",
      instruction: {
        en: "Judge each OKR: is it well-written or does it need work?",
        es: "Juzga cada OKR: ¿está bien escrito o necesita trabajo?",
      },
      items: [
        {
          text: {
            en: "Objective: Revolutionize how our FQHC retains top clinical talent\nKR: Reduce provider turnover from 28% to 15% by Q4",
            es: "Objetivo: Revolucionar cómo nuestro FQHC retiene talento clínico top\nRC: Reducir rotación de proveedores del 28% al 15% para Q4",
          },
          isGood: true,
          explanation: {
            en: "Strong! The objective is aspirational and memorable. The KR has a specific baseline (28%), target (15%), and deadline (Q4).",
            es: "¡Fuerte! El objetivo es aspiracional y memorable. El RC tiene línea base específica (28%), meta (15%) y fecha límite (Q4).",
          },
        },
        {
          text: {
            en: "Objective: Improve patient access\nKR: Open more appointment slots",
            es: "Objetivo: Mejorar acceso del paciente\nRC: Abrir más espacios de citas",
          },
          isGood: false,
          explanation: {
            en: "Too vague! 'Improve patient access' isn't memorable or stretching. 'Open more' has no number. Better: 'Increase same-day appointment availability from 10% to 30% of total slots.'",
            es: "¡Demasiado vago! 'Mejorar acceso' no es memorable ni exigente. 'Abrir más' no tiene número. Mejor: 'Aumentar disponibilidad de citas el mismo día del 10% al 30% del total.'",
          },
        },
        {
          text: {
            en: "Objective: Build a financial safety net that survives any single funding cut\nKR: Diversify revenue so no single source exceeds 35% of total\nKR: Grow 340B contract pharmacy revenue from $800K to $1.2M\nKR: Reduce accounts receivable days from 62 to 45",
            es: "Objetivo: Construir una red de seguridad financiera que sobreviva cualquier recorte\nRC: Diversificar ingresos para que ninguna fuente exceda 35% del total\nRC: Crecer ingresos de farmacia contrato 340B de $800K a $1.2M\nRC: Reducir días de cuentas por cobrar de 62 a 45",
          },
          isGood: true,
          explanation: {
            en: "Excellent! The objective is vivid and strategic. All three KRs are measurable with baselines and targets. Each KR attacks a different angle of financial resilience.",
            es: "¡Excelente! El objetivo es vívido y estratégico. Los tres RCs son medibles con líneas base y metas. Cada RC ataca un ángulo diferente de resiliencia financiera.",
          },
        },
        {
          text: {
            en: "Objective: Increase UDS patient count to 15,000\nKR: Hire 3 new providers\nKR: Launch marketing campaign",
            es: "Objetivo: Aumentar conteo de pacientes UDS a 15,000\nRC: Contratar 3 nuevos proveedores\nRC: Lanzar campaña de marketing",
          },
          isGood: false,
          explanation: {
            en: "The 'objective' is actually a KR (it has a number). The KRs are activities (hiring, launching), not outcomes. What impact will those hires and campaigns create?",
            es: "El 'objetivo' es en realidad un RC (tiene número). Los RCs son actividades (contratar, lanzar), no resultados. ¿Qué impacto crearán esas contrataciones y campañas?",
          },
        },
        {
          text: {
            en: "Objective: Become the region's model for integrated behavioral health\nKR: Screen 90% of adult patients for depression (PHQ-9) by Q3\nKR: Reduce behavioral health referral wait from 21 days to 7 days\nKR: Achieve 70% follow-up completion rate for positive screens",
            es: "Objetivo: Convertirnos en el modelo regional para salud conductual integrada\nRC: Tamizar 90% de pacientes adultos para depresión (PHQ-9) para Q3\nRC: Reducir espera de referencia de salud conductual de 21 días a 7 días\nRC: Lograr 70% de tasa de seguimiento completado para tamizajes positivos",
          },
          isGood: true,
          explanation: {
            en: "Outstanding! The objective is inspiring and strategic. The KRs form a logical chain: screen → reduce wait → complete follow-up. All are measurable with healthcare-specific metrics.",
            es: "¡Sobresaliente! El objetivo es inspirador y estratégico. Los RCs forman una cadena lógica: tamizar → reducir espera → completar seguimiento. Todos son medibles con métricas específicas de salud.",
          },
        },
      ],
      xpReward: 50,
    },
    {
      type: "drag-sort",
      id: "okr-quality-ranking",
      instruction: {
        en: "Rank these Key Results from strongest (most measurable and impactful) to weakest",
        es: "Ordena estos Resultados Clave del más fuerte (más medible e impactante) al más débil",
      },
      items: [
        {
          text: {
            en: "Reduce patient no-show rate from 22% to 12% through automated bilingual reminders",
            es: "Reducir tasa de inasistencia de pacientes del 22% al 12% mediante recordatorios bilingües automatizados",
          },
          correctPosition: 1,
        },
        {
          text: {
            en: "Increase sliding fee scale enrollment by 40% among newly eligible patients",
            es: "Aumentar inscripción en escala de tarifas deslizantes en 40% entre pacientes recién elegibles",
          },
          correctPosition: 2,
        },
        {
          text: {
            en: "Improve staff satisfaction scores",
            es: "Mejorar puntajes de satisfacción del personal",
          },
          correctPosition: 3,
        },
        {
          text: {
            en: "Do more community outreach",
            es: "Hacer más alcance comunitario",
          },
          correctPosition: 4,
        },
      ],
      xpReward: 30,
    },
  ],
  totalXP: 80,
};

/* ------------------------------------------------------------------ */
/*  Module 3: Writing Objectives                                       */
/* ------------------------------------------------------------------ */

const module3WritingObjectives: OkrCourseModule = {
  id: "writing-objectives",
  order: 3,
  title: {
    en: "Writing Powerful Objectives",
    es: "Escribiendo Objetivos Poderosos",
  },
  subtitle: {
    en: "From vague intentions to rallying cries",
    es: "De intenciones vagas a gritos de batalla",
  },
  description: {
    en: "Practice the craft of writing objectives that inspire action. Learn the formula, practice with FQHC scenarios, and transform weak objectives into strong ones.",
    es: "Practica el arte de escribir objetivos que inspiren acción. Aprende la fórmula, practica con escenarios FQHC y transforma objetivos débiles en fuertes.",
  },
  estimatedMinutes: 8,
  icon: "Pencil",
  color: "purple",
  learningObjectives: [
    {
      en: "Use the Verb + Impact + Domain formula for objectives",
      es: "Usar la fórmula Verbo + Impacto + Dominio para objetivos",
    },
    {
      en: "Transform activity-based goals into outcome-based objectives",
      es: "Transformar metas basadas en actividad en objetivos basados en resultados",
    },
    {
      en: "Write objectives specific to FQHC strategic domains",
      es: "Escribir objetivos específicos para dominios estratégicos de FQHCs",
    },
  ],
  conceptContent: [
    {
      heading: {
        en: "The Objective Formula",
        es: "La fórmula del Objetivo",
      },
      body: {
        en: "Strong objectives follow a pattern: [Action Verb] + [Meaningful Impact] + [Strategic Domain]. Examples: 'Eliminate' (verb) + 'financial barriers to care' (impact) + 'for our uninsured population' (domain). Or: 'Transform' + 'provider onboarding' + 'into a retention advantage.' The verb sets the ambition level — 'improve' is weak, 'transform' or 'eliminate' signals real change.",
        es: "Los objetivos fuertes siguen un patrón: [Verbo de acción] + [Impacto significativo] + [Dominio estratégico]. Ejemplos: 'Eliminar' (verbo) + 'barreras financieras al cuidado' (impacto) + 'para nuestra población sin seguro' (dominio). O: 'Transformar' + 'la incorporación de proveedores' + 'en una ventaja de retención.' El verbo establece el nivel de ambición — 'mejorar' es débil, 'transformar' o 'eliminar' señala cambio real.",
      },
    },
    {
      heading: {
        en: "Activities vs. Outcomes",
        es: "Actividades vs. Resultados",
      },
      body: {
        en: "The most common mistake: writing what you'll DO instead of what you'll ACHIEVE. Activity: 'Implement a new EHR system.' Outcome: 'Make every clinical decision data-informed within 30 seconds.' Activity: 'Hire a grant writer.' Outcome: 'Build a funding pipeline that replaces any lost federal revenue within 6 months.' Always ask: 'If we did this activity perfectly, what would change for our patients or community?'",
        es: "El error más común: escribir lo que HARÁS en vez de lo que LOGRARÁS. Actividad: 'Implementar un nuevo sistema EHR.' Resultado: 'Hacer que cada decisión clínica esté informada por datos en 30 segundos.' Actividad: 'Contratar un escritor de subvenciones.' Resultado: 'Construir un pipeline de financiamiento que reemplace cualquier ingreso federal perdido en 6 meses.' Siempre pregunta: 'Si hiciéramos esta actividad perfectamente, ¿qué cambiaría para nuestros pacientes o comunidad?'",
      },
    },
  ],
  exercises: [
    {
      type: "classifier",
      id: "activity-vs-outcome",
      instruction: {
        en: "Is this an outcome-based objective or an activity disguised as one?",
        es: "¿Es esto un objetivo basado en resultado o una actividad disfrazada?",
      },
      items: [
        {
          text: {
            en: "Launch a patient portal by June",
            es: "Lanzar un portal de pacientes para junio",
          },
          isGood: false,
          explanation: {
            en: "This is an activity (launching). Better: 'Empower patients to manage their own care journey digitally' — then measure portal adoption, appointment self-scheduling, etc.",
            es: "Esto es una actividad (lanzar). Mejor: 'Empoderar a pacientes para gestionar su propio viaje de cuidado digitalmente' — luego medir adopción del portal, auto-programación de citas, etc.",
          },
        },
        {
          text: {
            en: "Become the fastest path to primary care in our county",
            es: "Convertirnos en la vía más rápida a atención primaria en nuestro condado",
          },
          isGood: true,
          explanation: {
            en: "This is outcome-focused — it describes a competitive position. KRs would measure time-to-appointment, new patient wait times, etc.",
            es: "Esto está enfocado en resultados — describe una posición competitiva. Los RCs medirían tiempo hasta cita, tiempos de espera de nuevos pacientes, etc.",
          },
        },
        {
          text: {
            en: "Conduct 50 community health screenings",
            es: "Realizar 50 tamizajes de salud comunitaria",
          },
          isGood: false,
          explanation: {
            en: "This is an activity with a number — it's actually a task or Key Result, not an Objective. The objective would be: 'Reach every unscreened household in our service area.'",
            es: "Esto es una actividad con número — en realidad es una tarea o Resultado Clave, no un Objetivo. El objetivo sería: 'Alcanzar cada hogar sin tamizar en nuestra área de servicio.'",
          },
        },
        {
          text: {
            en: "Build a workforce culture where every provider wants to stay",
            es: "Construir una cultura laboral donde cada proveedor quiera quedarse",
          },
          isGood: true,
          explanation: {
            en: "Aspirational, memorable, outcome-focused. KRs would measure retention rate, engagement scores, time-to-fill for open positions, etc.",
            es: "Aspiracional, memorable, enfocado en resultados. Los RCs medirían tasa de retención, puntajes de compromiso, tiempo para llenar posiciones abiertas, etc.",
          },
        },
      ],
      xpReward: 40,
    },
    {
      type: "mini-quiz",
      id: "objective-strength-quiz",
      questions: [
        {
          question: {
            en: "Which verb creates the strongest objective?",
            es: "¿Cuál verbo crea el objetivo más fuerte?",
          },
          options: [
            {
              text: { en: "Improve patient access", es: "Mejorar acceso del paciente" },
              isCorrect: false,
              explanation: {
                en: "'Improve' is generic and doesn't signal the scale of change you're pursuing.",
                es: "'Mejorar' es genérico y no señala la escala de cambio que buscas.",
              },
            },
            {
              text: {
                en: "Eliminate wait time as a barrier to care",
                es: "Eliminar el tiempo de espera como barrera al cuidado",
              },
              isCorrect: true,
              explanation: {
                en: "'Eliminate' is bold, specific, and creates a clear success picture. You'll know when wait time is no longer a barrier.",
                es: "'Eliminar' es audaz, específico y crea una imagen clara de éxito. Sabrás cuando el tiempo de espera ya no sea una barrera.",
              },
            },
            {
              text: {
                en: "Work on reducing patient wait times",
                es: "Trabajar en reducir tiempos de espera",
              },
              isCorrect: false,
              explanation: {
                en: "'Work on' is the weakest possible framing — it describes effort, not outcome.",
                es: "'Trabajar en' es el enmarcado más débil posible — describe esfuerzo, no resultado.",
              },
            },
          ],
        },
      ],
      xpReward: 20,
    },
  ],
  totalXP: 60,
};

/* ------------------------------------------------------------------ */
/*  Module 4: Crafting Key Results                                     */
/* ------------------------------------------------------------------ */

const module4KeyResults: OkrCourseModule = {
  id: "crafting-key-results",
  order: 4,
  title: {
    en: "Crafting Measurable Key Results",
    es: "Elaborando Resultados Clave Medibles",
  },
  subtitle: {
    en: "If you can't measure it, it's not a Key Result",
    es: "Si no puedes medirlo, no es un Resultado Clave",
  },
  description: {
    en: "Master the art of writing Key Results that are specific, measurable, and connected to real FQHC data sources like UDS reports and CHQR dashboards.",
    es: "Domina el arte de escribir Resultados Clave que sean específicos, medibles y conectados a fuentes de datos reales de FQHC como reportes UDS y tableros CHQR.",
  },
  estimatedMinutes: 9,
  icon: "BarChart3",
  color: "amber",
  learningObjectives: [
    {
      en: "Write Key Results with baseline → target format",
      es: "Escribir Resultados Clave con formato línea base → meta",
    },
    {
      en: "Connect Key Results to existing FQHC data sources",
      es: "Conectar Resultados Clave a fuentes de datos existentes de FQHC",
    },
    {
      en: "Balance leading and lagging indicators in a KR set",
      es: "Equilibrar indicadores adelantados y rezagados en un conjunto de RCs",
    },
  ],
  conceptContent: [
    {
      heading: {
        en: "The Baseline → Target Formula",
        es: "La fórmula Línea base → Meta",
      },
      body: {
        en: "Every KR needs two numbers: where you are now (baseline) and where you want to be (target). Format: '[Metric] from [baseline] to [target] by [date].' Example: 'Reduce average third-next-available appointment from 14 days to 5 days by Q3.' Without a baseline, you can't measure progress. Without a target, you can't stretch.",
        es: "Cada RC necesita dos números: dónde estás ahora (línea base) y dónde quieres estar (meta). Formato: '[Métrica] de [línea base] a [meta] para [fecha].' Ejemplo: 'Reducir promedio de tercera-próxima-cita-disponible de 14 días a 5 días para Q3.' Sin línea base, no puedes medir progreso. Sin meta, no puedes exigirte.",
      },
    },
    {
      heading: {
        en: "FQHC Data Sources You Already Have",
        es: "Fuentes de datos de FQHC que ya tienes",
      },
      body: {
        en: "You don't need new systems. Your KRs can pull from: UDS reports (patient counts, payer mix, service utilization), CHQR dashboard (clinical quality measures), EHR reports (visit volume, no-shows, referral completion), financial reports (AR days, collection rates, cost per visit), HR data (turnover rate, time-to-fill, training hours). The best KRs use data you're already collecting.",
        es: "No necesitas nuevos sistemas. Tus RCs pueden usar: reportes UDS (conteos de pacientes, mix de pagadores, utilización de servicios), tablero CHQR (medidas de calidad clínica), reportes EHR (volumen de visitas, inasistencias, completación de referencias), reportes financieros (días AR, tasas de cobranza, costo por visita), datos de RH (tasa de rotación, tiempo para llenar, horas de capacitación). Los mejores RCs usan datos que ya estás recolectando.",
      },
    },
    {
      heading: {
        en: "Leading vs. Lagging Indicators",
        es: "Indicadores adelantados vs. rezagados",
      },
      body: {
        en: "A lagging indicator measures the end result: 'patient satisfaction score.' A leading indicator measures an activity that drives the result: 'percentage of patients receiving a follow-up call within 24 hours.' The best KR sets have both — lagging indicators tell you if you succeeded, leading indicators tell you if you're on track during the quarter.",
        es: "Un indicador rezagado mide el resultado final: 'puntaje de satisfacción del paciente.' Un indicador adelantado mide una actividad que impulsa el resultado: 'porcentaje de pacientes recibiendo llamada de seguimiento dentro de 24 horas.' Los mejores conjuntos de RCs tienen ambos — los indicadores rezagados te dicen si tuviste éxito, los adelantados te dicen si vas por buen camino durante el trimestre.",
      },
    },
  ],
  exercises: [
    {
      type: "scoring-sim",
      id: "kr-scoring-practice",
      instruction: {
        en: "For each Key Result, calculate the OKR score (0.0-1.0) based on the target and actual results",
        es: "Para cada Resultado Clave, calcula el puntaje OKR (0.0-1.0) basado en la meta y los resultados reales",
      },
      scenarios: [
        {
          keyResult: {
            en: "Reduce patient no-show rate from 25% to 10%",
            es: "Reducir tasa de inasistencia de pacientes del 25% al 10%",
          },
          target: "10%",
          actual: "15%",
          correctScore: 0.67,
          explanation: {
            en: "The gap to close was 15 percentage points (25→10). You closed 10 points (25→15). That's 10/15 = 0.67 — right in the sweet spot!",
            es: "La brecha a cerrar era 15 puntos porcentuales (25→10). Cerraste 10 puntos (25→15). Eso es 10/15 = 0.67 — ¡justo en el punto ideal!",
          },
        },
        {
          keyResult: {
            en: "Increase UDS unduplicated patient count from 8,000 to 12,000",
            es: "Aumentar conteo de pacientes no duplicados UDS de 8,000 a 12,000",
          },
          target: "12,000",
          actual: "11,200",
          correctScore: 0.8,
          explanation: {
            en: "The gap was 4,000 (8K→12K). You achieved 3,200 (8K→11.2K). Score: 3,200/4,000 = 0.8. This is good but may suggest the target wasn't ambitious enough.",
            es: "La brecha era 4,000 (8K→12K). Lograste 3,200 (8K→11.2K). Puntaje: 3,200/4,000 = 0.8. Esto es bueno pero puede sugerir que la meta no era suficientemente ambiciosa.",
          },
        },
        {
          keyResult: {
            en: "Reduce average days in accounts receivable from 60 to 35",
            es: "Reducir promedio de días en cuentas por cobrar de 60 a 35",
          },
          target: "35 days",
          actual: "52 days",
          correctScore: 0.32,
          explanation: {
            en: "The gap was 25 days (60→35). You only closed 8 days (60→52). Score: 8/25 = 0.32. This is in the red zone — time to re-examine the approach or re-calibrate the target.",
            es: "La brecha era 25 días (60→35). Solo cerraste 8 días (60→52). Puntaje: 8/25 = 0.32. Esto está en zona roja — hora de reexaminar el enfoque o recalibrar la meta.",
          },
        },
      ],
      xpReward: 50,
    },
    {
      type: "drag-sort",
      id: "leading-lagging-sort",
      instruction: {
        en: "Sort these indicators: put LEADING indicators first, then LAGGING indicators",
        es: "Ordena estos indicadores: pon los indicadores ADELANTADOS primero, luego los REZAGADOS",
      },
      items: [
        {
          text: {
            en: "% of patients receiving pre-visit reminder calls",
            es: "% de pacientes recibiendo llamadas de recordatorio pre-visita",
          },
          correctPosition: 1,
        },
        {
          text: {
            en: "Number of provider training hours completed this quarter",
            es: "Número de horas de capacitación de proveedores completadas este trimestre",
          },
          correctPosition: 2,
        },
        {
          text: {
            en: "Patient satisfaction score (annual survey)",
            es: "Puntaje de satisfacción del paciente (encuesta anual)",
          },
          correctPosition: 3,
        },
        {
          text: {
            en: "Annual provider turnover rate",
            es: "Tasa anual de rotación de proveedores",
          },
          correctPosition: 4,
        },
      ],
      xpReward: 30,
    },
  ],
  totalXP: 80,
};

/* ------------------------------------------------------------------ */
/*  Module 5: Scoring & Grading                                        */
/* ------------------------------------------------------------------ */

const module5Scoring: OkrCourseModule = {
  id: "scoring-and-grading",
  order: 5,
  title: {
    en: "Scoring & Grading OKRs",
    es: "Puntuación y Calificación de OKRs",
  },
  subtitle: {
    en: "How to score honestly and learn from every quarter",
    es: "Cómo puntuar honestamente y aprender de cada trimestre",
  },
  description: {
    en: "Learn Doerr's grading system, practice scoring real FQHC scenarios, and understand how to use scores for learning — not punishment.",
    es: "Aprende el sistema de calificación de Doerr, practica puntuando escenarios reales de FQHC y comprende cómo usar los puntajes para aprender — no para castigar.",
  },
  estimatedMinutes: 7,
  icon: "Award",
  color: "green",
  learningObjectives: [
    {
      en: "Apply the 0.0-1.0 scoring scale accurately",
      es: "Aplicar la escala de puntuación 0.0-1.0 con precisión",
    },
    {
      en: "Interpret scores using the green/amber/red framework",
      es: "Interpretar puntajes usando el marco verde/ámbar/rojo",
    },
    {
      en: "Conduct a quarterly retrospective using OKR scores",
      es: "Realizar una retrospectiva trimestral usando puntajes de OKR",
    },
  ],
  conceptContent: [
    {
      heading: {
        en: "Doerr's Grading Scale",
        es: "Escala de calificación de Doerr",
      },
      body: {
        en: "Green (0.7-1.0): Delivered. The KR was met or exceeded. If all your KRs are green, your objectives might not be ambitious enough. Amber (0.4-0.6): Progress made but fell short. This is where the learning is — what blocked you? Red (0.0-0.3): Failed to deliver. Either the KR was wrong, resources were insufficient, or priorities shifted. No shame — the point is honest reflection.",
        es: "Verde (0.7-1.0): Entregado. El RC se cumplió o superó. Si todos tus RCs son verdes, tus objetivos podrían no ser suficientemente ambiciosos. Ámbar (0.4-0.6): Se hizo progreso pero no se alcanzó. Aquí es donde está el aprendizaje — ¿qué te bloqueó? Rojo (0.0-0.3): No se entregó. El RC estaba mal, los recursos eran insuficientes, o las prioridades cambiaron. Sin vergüenza — el punto es reflexión honesta.",
      },
    },
    {
      heading: {
        en: "The Quarterly Retro",
        es: "La retrospectiva trimestral",
      },
      body: {
        en: "At quarter end, score every KR honestly. Then ask three questions for each objective: (1) What did we learn? (2) What will we carry forward? (3) What will we change? The retro isn't a performance review — it's a learning session. Doerr insists: never tie OKR scores to bonuses or promotions. That kills the honesty that makes OKRs valuable.",
        es: "Al final del trimestre, puntúa cada RC honestamente. Luego haz tres preguntas para cada objetivo: (1) ¿Qué aprendimos? (2) ¿Qué llevaremos adelante? (3) ¿Qué cambiaremos? La retrospectiva no es una evaluación de desempeño — es una sesión de aprendizaje. Doerr insiste: nunca vincules puntajes de OKR a bonos o promociones. Eso mata la honestidad que hace valiosos a los OKRs.",
      },
    },
  ],
  exercises: [
    {
      type: "scoring-sim",
      id: "quarterly-scoring-sim",
      instruction: {
        en: "Score each Key Result and assign a color grade (green/amber/red)",
        es: "Puntúa cada Resultado Clave y asigna un color de calificación (verde/ámbar/rojo)",
      },
      scenarios: [
        {
          keyResult: {
            en: "Increase telehealth visits from 5% to 25% of total visits",
            es: "Aumentar visitas de telesalud del 5% al 25% del total de visitas",
          },
          target: "25%",
          actual: "22%",
          correctScore: 0.85,
          explanation: {
            en: "Gap was 20 points (5→25). Achieved 17 (5→22). Score: 17/20 = 0.85 — Green! Strong delivery, but next quarter consider an even more ambitious target.",
            es: "La brecha era 20 puntos (5→25). Logrado 17 (5→22). Puntaje: 17/20 = 0.85 — ¡Verde! Entrega fuerte, pero el próximo trimestre considera una meta aún más ambiciosa.",
          },
        },
        {
          keyResult: {
            en: "Reduce provider burnout score from 4.2 to 2.5 (Maslach scale)",
            es: "Reducir puntaje de agotamiento de proveedores de 4.2 a 2.5 (escala Maslach)",
          },
          target: "2.5",
          actual: "3.4",
          correctScore: 0.47,
          explanation: {
            en: "Gap was 1.7 points (4.2→2.5). Closed 0.8 (4.2→3.4). Score: 0.8/1.7 = 0.47 — Amber. Progress made but burnout remains high. What systemic changes are needed?",
            es: "La brecha era 1.7 puntos (4.2→2.5). Cerrado 0.8 (4.2→3.4). Puntaje: 0.8/1.7 = 0.47 — Ámbar. Se hizo progreso pero el agotamiento sigue alto. ¿Qué cambios sistémicos se necesitan?",
          },
        },
        {
          keyResult: {
            en: "Achieve CHQR badge in cervical cancer screening (target: 63%)",
            es: "Lograr insignia CHQR en tamizaje de cáncer cervical (meta: 63%)",
          },
          target: "63%",
          actual: "61%",
          correctScore: 0.92,
          explanation: {
            en: "Nearly there! Assuming baseline was around 40%, the gap was ~23 points. Closed ~21 of them. Score: ~0.92 — Green! A couple more quality improvement cycles should close the gap.",
            es: "¡Casi! Asumiendo línea base alrededor de 40%, la brecha era ~23 puntos. Cerrados ~21. Puntaje: ~0.92 — ¡Verde! Un par más de ciclos de mejora de calidad deberían cerrar la brecha.",
          },
        },
      ],
      xpReward: 50,
    },
    {
      type: "mini-quiz",
      id: "scoring-philosophy-quiz",
      questions: [
        {
          question: {
            en: "Your team scored 1.0 on all three Key Results. What does this mean?",
            es: "Tu equipo obtuvo 1.0 en los tres Resultados Clave. ¿Qué significa esto?",
          },
          options: [
            {
              text: {
                en: "Celebrate! The team crushed it",
                es: "¡Celebrar! El equipo lo aplastó",
              },
              isCorrect: false,
              explanation: {
                en: "Not quite! If you consistently hit 1.0, your OKRs probably aren't ambitious enough. You might be 'sandbagging' — setting safe targets.",
                es: "¡No del todo! Si consistentemente llegas a 1.0, tus OKRs probablemente no son suficientemente ambiciosos. Podrías estar 'jugando seguro' — estableciendo metas conservadoras.",
              },
            },
            {
              text: {
                en: "The targets weren't ambitious enough — stretch more next quarter",
                es: "Las metas no eran suficientemente ambiciosas — exige más el próximo trimestre",
              },
              isCorrect: true,
              explanation: {
                en: "Exactly! Andy Grove's insight: if you always achieve 100%, you're not pushing hard enough. Next quarter, aim for moonshots where 0.7 would be excellent.",
                es: "¡Exacto! La visión de Andy Grove: si siempre logras 100%, no estás presionando suficiente. El próximo trimestre, apunta a metas lunares donde 0.7 sería excelente.",
              },
            },
            {
              text: {
                en: "Score doesn't matter — just keep doing the same thing",
                es: "El puntaje no importa — solo sigue haciendo lo mismo",
              },
              isCorrect: false,
              explanation: {
                en: "Scores absolutely matter — they're your feedback loop for calibrating ambition and effort.",
                es: "Los puntajes absolutamente importan — son tu ciclo de retroalimentación para calibrar ambición y esfuerzo.",
              },
            },
          ],
        },
        {
          question: {
            en: "Should OKR scores be used in performance reviews?",
            es: "¿Deberían usarse los puntajes de OKR en evaluaciones de desempeño?",
          },
          options: [
            {
              text: {
                en: "Yes — it creates accountability",
                es: "Sí — crea rendición de cuentas",
              },
              isCorrect: false,
              explanation: {
                en: "Doerr strongly warns against this. When scores affect bonuses or promotions, people set easy goals to look good — destroying the entire purpose of OKRs.",
                es: "Doerr advierte fuertemente contra esto. Cuando los puntajes afectan bonos o promociones, las personas establecen metas fáciles para verse bien — destruyendo todo el propósito de los OKRs.",
              },
            },
            {
              text: {
                en: "No — it kills honest goal-setting",
                es: "No — mata el establecimiento honesto de metas",
              },
              isCorrect: true,
              explanation: {
                en: "Correct! Doerr and Wodtke both emphasize: OKRs are a learning tool, not a judgment tool. Keep them separate from compensation to maintain psychological safety.",
                es: "¡Correcto! Doerr y Wodtke ambos enfatizan: los OKRs son una herramienta de aprendizaje, no de juicio. Mantenlos separados de la compensación para preservar la seguridad psicológica.",
              },
            },
          ],
        },
      ],
      xpReward: 30,
    },
  ],
  totalXP: 80,
};

/* ------------------------------------------------------------------ */
/*  Module 6: Your First OKR (Capstone)                                */
/* ------------------------------------------------------------------ */

const module6Capstone: OkrCourseModule = {
  id: "capstone",
  order: 6,
  title: {
    en: "Write Your First OKR",
    es: "Escribe Tu Primer OKR",
  },
  subtitle: {
    en: "Put it all together — and get AI-powered feedback",
    es: "Ponlo todo junto — y obtén retroalimentación impulsada por IA",
  },
  description: {
    en: "Draft a real OKR for your FQHC role. Our AI coach will evaluate it for measurability, ambition, and FQHC relevance, then suggest improvements.",
    es: "Redacta un OKR real para tu rol en FQHC. Nuestro coach de IA lo evaluará por medibilidad, ambición y relevancia FQHC, luego sugerirá mejoras.",
  },
  estimatedMinutes: 10,
  icon: "Sparkles",
  color: "teal",
  learningObjectives: [
    {
      en: "Write a complete OKR set (1 objective + 3 key results) for your role",
      es: "Escribir un conjunto completo de OKR (1 objetivo + 3 resultados clave) para tu rol",
    },
    {
      en: "Self-evaluate your OKR against the quality criteria from modules 1-5",
      es: "Auto-evaluar tu OKR contra los criterios de calidad de los módulos 1-5",
    },
    {
      en: "Refine your OKR based on AI feedback",
      es: "Refinar tu OKR basado en retroalimentación de IA",
    },
  ],
  conceptContent: [
    {
      heading: {
        en: "Capstone Instructions",
        es: "Instrucciones del Capstone",
      },
      body: {
        en: "Choose an FQHC domain (revenue, workforce, patient access, operations, or cross-department). Write one Objective and 2-3 Key Results using everything you've learned. Then submit for AI review. The AI coach will score your OKR on measurability, ambition, and FQHC relevance — and suggest specific improvements. You can revise and resubmit as many times as you like.",
        es: "Elige un dominio FQHC (ingresos, fuerza laboral, acceso de pacientes, operaciones o inter-departamental). Escribe un Objetivo y 2-3 Resultados Clave usando todo lo que has aprendido. Luego envía para revisión de IA. El coach de IA puntuará tu OKR en medibilidad, ambición y relevancia FQHC — y sugerirá mejoras específicas. Puedes revisar y reenviar cuantas veces quieras.",
      },
    },
  ],
  exercises: [], // Capstone is handled by a dedicated component, not standard exercises
  totalXP: 100,
};

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export const OKR_COURSE_MODULES: OkrCourseModule[] = [
  module1WhatAreOkrs,
  module2Anatomy,
  module3WritingObjectives,
  module4KeyResults,
  module5Scoring,
  module6Capstone,
];

export const COURSE_TOTAL_XP = OKR_COURSE_MODULES.reduce(
  (sum, m) => sum + m.totalXP,
  0
);

/** Domain options for the capstone exercise */
export const CAPSTONE_DOMAINS: {
  id: OKRDomain;
  label: { en: string; es: string };
  hint: { en: string; es: string };
}[] = [
  {
    id: "revenue-resilience",
    label: { en: "Revenue Resilience", es: "Resiliencia de Ingresos" },
    hint: {
      en: "340B optimization, payer mix diversification, grant strategy, billing efficiency",
      es: "Optimización 340B, diversificación de pagadores, estrategia de subvenciones, eficiencia de facturación",
    },
  },
  {
    id: "workforce-retention",
    label: { en: "Workforce Retention", es: "Retención de Fuerza Laboral" },
    hint: {
      en: "Provider turnover, burnout prevention, career development, competitive compensation",
      es: "Rotación de proveedores, prevención de agotamiento, desarrollo de carrera, compensación competitiva",
    },
  },
  {
    id: "patient-access",
    label: { en: "Patient Access", es: "Acceso del Paciente" },
    hint: {
      en: "Wait times, telehealth, sliding fee scale, same-day appointments, outreach",
      es: "Tiempos de espera, telesalud, escala de tarifas, citas el mismo día, alcance",
    },
  },
  {
    id: "operational-efficiency",
    label: { en: "Operational Efficiency", es: "Eficiencia Operativa" },
    hint: {
      en: "EHR optimization, workflow redesign, cost per visit, referral completion",
      es: "Optimización de EHR, rediseño de flujos, costo por visita, completación de referencias",
    },
  },
  {
    id: "cross-department",
    label: {
      en: "Cross-Department Alignment",
      es: "Alineación Inter-departamental",
    },
    hint: {
      en: "Breaking silos, shared dashboards, integrated care teams, communication",
      es: "Romper silos, tableros compartidos, equipos de cuidado integrado, comunicación",
    },
  },
];
