// academy-types.ts
// Generic type system for FQHC Academy courses
// Decoupled from OKR-specific types so any course can use the engine
// Last updated: 2026-03-10

/* ------------------------------------------------------------------ */
/*  Exercise Types (generic versions)                                  */
/* ------------------------------------------------------------------ */

export interface BilingualText {
  en: string;
  es: string;
}

export interface AcademyConceptCardExercise {
  type: "concept-card";
  id: string;
  cards: {
    front: BilingualText;
    back: BilingualText;
    fqhcExample?: BilingualText;
  }[];
  xpReward: number;
}

export interface AcademyClassifierExercise {
  type: "classifier";
  id: string;
  instruction: BilingualText;
  items: {
    text: BilingualText;
    isGood: boolean;
    explanation: BilingualText;
  }[];
  xpReward: number;
}

export interface AcademyDragSortExercise {
  type: "drag-sort";
  id: string;
  instruction: BilingualText;
  items: {
    text: BilingualText;
    correctPosition: number;
  }[];
  xpReward: number;
}

export interface AcademyScoringSimExercise {
  type: "scoring-sim";
  id: string;
  instruction: BilingualText;
  scenarios: {
    keyResult: BilingualText;
    target: string;
    actual: string;
    correctScore: number;
    explanation: BilingualText;
  }[];
  xpReward: number;
}

export interface AcademyMiniQuizExercise {
  type: "mini-quiz";
  id: string;
  questions: {
    question: BilingualText;
    options: {
      text: BilingualText;
      isCorrect: boolean;
      explanation: BilingualText;
    }[];
  }[];
  xpReward: number;
}

/** NEW: Scenario-based exercise for compliance and operations training */
export interface AcademyScenarioExercise {
  type: "scenario";
  id: string;
  setup: BilingualText;
  choices: {
    text: BilingualText;
    isCorrect: boolean;
    consequence: BilingualText;
    explanation: BilingualText;
  }[];
  xpReward: number;
}

/** NEW: Checklist exercise for compliance and audit readiness */
export interface AcademyChecklistExercise {
  type: "checklist";
  id: string;
  instruction: BilingualText;
  items: {
    text: BilingualText;
    isRequired: boolean;
    explanation: BilingualText;
  }[];
  passingScore: number; // minimum % of required items to check
  xpReward: number;
}

export type AcademyExercise =
  | AcademyConceptCardExercise
  | AcademyClassifierExercise
  | AcademyDragSortExercise
  | AcademyScoringSimExercise
  | AcademyMiniQuizExercise
  | AcademyScenarioExercise
  | AcademyChecklistExercise;

/* ------------------------------------------------------------------ */
/*  Module Type                                                        */
/* ------------------------------------------------------------------ */

export interface AcademyModule {
  id: string;
  order: number;
  title: BilingualText;
  subtitle: BilingualText;
  description: BilingualText;
  estimatedMinutes: number;
  icon: string; // Lucide icon name
  color: string; // Tailwind color name
  learningObjectives: BilingualText[];
  conceptContent: {
    heading: BilingualText;
    body: BilingualText;
  }[];
  exercises: AcademyExercise[];
  totalXP: number;
}

/* ------------------------------------------------------------------ */
/*  Course Type                                                        */
/* ------------------------------------------------------------------ */

export interface AcademyCourseDefinition {
  id: string;
  title: BilingualText;
  subtitle: BilingualText;
  description: BilingualText;
  icon: string;
  color: string;
  modules: AcademyModule[];
  totalXP: number;
  estimatedMinutes: number;
  /** localStorage key prefix for progress */
  storageKey: string;
  /** Whether this course has a capstone project */
  hasCapstone?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

export const t = (obj: BilingualText, locale: string): string =>
  locale === "es" ? obj.es : obj.en;

export const calculateCourseTotalXP = (modules: AcademyModule[]): number =>
  modules.reduce((sum, m) => sum + m.totalXP, 0);

export const calculateCourseMinutes = (modules: AcademyModule[]): number =>
  modules.reduce((sum, m) => sum + m.estimatedMinutes, 0);
