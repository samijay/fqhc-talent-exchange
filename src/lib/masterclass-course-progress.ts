// masterclass-course-progress.ts
// localStorage-based progress tracking for the Masterclass course
// Guests can use without signup — progress keyed by userId or 'guest'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ExerciseScore {
  exerciseId: string;
  score: number; // 0-100
  completedAt: string; // ISO timestamp
}

export interface CourseProgress {
  userId: string; // auth user id or "guest"
  modulesCompleted: string[]; // module ids
  exerciseScores: Record<string, ExerciseScore>;
  totalXP: number;
  currentModuleId: string | null;
  startedAt: string;
  lastActiveAt: string;
}

/* ------------------------------------------------------------------ */
/*  Storage key                                                        */
/* ------------------------------------------------------------------ */

const STORAGE_PREFIX = "masterclass-progress";

function getStorageKey(userId?: string): string {
  return `${STORAGE_PREFIX}-${userId || "guest"}`;
}

/* ------------------------------------------------------------------ */
/*  CRUD functions                                                     */
/* ------------------------------------------------------------------ */

export function loadProgress(userId?: string): CourseProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(getStorageKey(userId));
    if (!raw) return null;
    return JSON.parse(raw) as CourseProgress;
  } catch {
    return null;
  }
}

export function saveProgress(progress: CourseProgress): void {
  if (typeof window === "undefined") return;
  try {
    progress.lastActiveAt = new Date().toISOString();
    localStorage.setItem(
      getStorageKey(progress.userId),
      JSON.stringify(progress)
    );
  } catch {
    // Storage full or unavailable — fail silently
  }
}

export function createFreshProgress(userId?: string): CourseProgress {
  return {
    userId: userId || "guest",
    modulesCompleted: [],
    exerciseScores: {},
    totalXP: 0,
    currentModuleId: null,
    startedAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
  };
}

export function resetProgress(userId?: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(getStorageKey(userId));
  } catch {
    // fail silently
  }
}

/* ------------------------------------------------------------------ */
/*  Progress helpers                                                   */
/* ------------------------------------------------------------------ */

export function completeModule(
  progress: CourseProgress,
  moduleId: string
): CourseProgress {
  if (progress.modulesCompleted.includes(moduleId)) return progress;
  return {
    ...progress,
    modulesCompleted: [...progress.modulesCompleted, moduleId],
    lastActiveAt: new Date().toISOString(),
  };
}

export function recordExerciseScore(
  progress: CourseProgress,
  exerciseId: string,
  score: number,
  xpEarned: number
): CourseProgress {
  const isNew = !progress.exerciseScores[exerciseId];
  return {
    ...progress,
    exerciseScores: {
      ...progress.exerciseScores,
      [exerciseId]: {
        exerciseId,
        score,
        completedAt: new Date().toISOString(),
      },
    },
    totalXP: isNew ? progress.totalXP + xpEarned : progress.totalXP,
    lastActiveAt: new Date().toISOString(),
  };
}

/** Calculate overall course completion percentage (0-100) */
export function getCompletionPercentage(
  progress: CourseProgress,
  totalModules: number
): number {
  if (totalModules === 0) return 0;
  return Math.round(
    (progress.modulesCompleted.length / totalModules) * 100
  );
}
