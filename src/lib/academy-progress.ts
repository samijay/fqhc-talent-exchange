// academy-progress.ts
// Generic localStorage-based progress tracking for any Academy course
// Guests can use without signup — progress keyed by courseId + userId
// Last updated: 2026-03-10

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ExerciseScore {
  exerciseId: string;
  score: number; // 0-100
  completedAt: string; // ISO timestamp
}

export interface AcademyCourseProgress {
  courseId: string;
  userId: string; // auth user id or "guest"
  modulesCompleted: string[]; // module ids
  exerciseScores: Record<string, ExerciseScore>;
  totalXP: number;
  currentModuleId: string | null;
  startedAt: string;
  lastActiveAt: string;
}

/* ------------------------------------------------------------------ */
/*  Storage                                                            */
/* ------------------------------------------------------------------ */

function getStorageKey(courseId: string, userId?: string): string {
  return `academy-${courseId}-progress-${userId || "guest"}`;
}

export function loadCourseProgress(
  courseId: string,
  userId?: string,
): AcademyCourseProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(getStorageKey(courseId, userId));
    if (!raw) return null;
    return JSON.parse(raw) as AcademyCourseProgress;
  } catch {
    return null;
  }
}

export function saveCourseProgress(progress: AcademyCourseProgress): void {
  if (typeof window === "undefined") return;
  try {
    progress.lastActiveAt = new Date().toISOString();
    localStorage.setItem(
      getStorageKey(progress.courseId, progress.userId),
      JSON.stringify(progress),
    );
  } catch {
    // Storage full or unavailable — fail silently
  }
}

export function createFreshCourseProgress(
  courseId: string,
  userId?: string,
): AcademyCourseProgress {
  return {
    courseId,
    userId: userId || "guest",
    modulesCompleted: [],
    exerciseScores: {},
    totalXP: 0,
    currentModuleId: null,
    startedAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
  };
}

/* ------------------------------------------------------------------ */
/*  Progress Mutations (return new state, don't mutate)                */
/* ------------------------------------------------------------------ */

export function completeModuleProgress(
  progress: AcademyCourseProgress,
  moduleId: string,
): AcademyCourseProgress {
  if (progress.modulesCompleted.includes(moduleId)) return progress;
  return {
    ...progress,
    modulesCompleted: [...progress.modulesCompleted, moduleId],
    currentModuleId: null,
  };
}

export function recordExerciseScoreProgress(
  progress: AcademyCourseProgress,
  exerciseId: string,
  score: number,
  xpReward: number,
): AcademyCourseProgress {
  const alreadyScored = progress.exerciseScores[exerciseId];
  const xpDelta = alreadyScored ? 0 : xpReward; // only award XP once

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
    totalXP: progress.totalXP + xpDelta,
  };
}

export function setCurrentModule(
  progress: AcademyCourseProgress,
  moduleId: string | null,
): AcademyCourseProgress {
  return { ...progress, currentModuleId: moduleId };
}

/* ------------------------------------------------------------------ */
/*  Progress Queries                                                   */
/* ------------------------------------------------------------------ */

export function getCompletionPercentage(
  progress: AcademyCourseProgress,
  totalModules: number,
): number {
  if (totalModules === 0) return 0;
  return Math.round(
    (progress.modulesCompleted.length / totalModules) * 100,
  );
}

export function isModuleCompleted(
  progress: AcademyCourseProgress,
  moduleId: string,
): boolean {
  return progress.modulesCompleted.includes(moduleId);
}

export function getModuleXP(
  progress: AcademyCourseProgress,
  moduleExerciseIds: string[],
): number {
  return moduleExerciseIds.reduce((sum, id) => {
    const score = progress.exerciseScores[id];
    return sum + (score ? score.score : 0);
  }, 0);
}

/* ------------------------------------------------------------------ */
/*  Aggregate Progress (across all courses)                            */
/* ------------------------------------------------------------------ */

export function getAllCourseProgress(
  userId?: string,
): AcademyCourseProgress[] {
  if (typeof window === "undefined") return [];
  const results: AcademyCourseProgress[] = [];
  const prefix = `academy-`;
  const suffix = `-progress-${userId || "guest"}`;

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix) && key.endsWith(suffix)) {
        const raw = localStorage.getItem(key);
        if (raw) {
          results.push(JSON.parse(raw) as AcademyCourseProgress);
        }
      }
    }
  } catch {
    // fail silently
  }

  return results;
}

export function getAggregateXP(userId?: string): number {
  return getAllCourseProgress(userId).reduce((sum, p) => sum + p.totalXP, 0);
}

export function getAggregateModulesCompleted(userId?: string): number {
  return getAllCourseProgress(userId).reduce(
    (sum, p) => sum + p.modulesCompleted.length,
    0,
  );
}
