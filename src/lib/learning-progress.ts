// learning-progress.ts — Unified progress aggregation across all learning content
// Reads localStorage to provide a single view of the user's learning journey
// Used by the Academy hub ContinueCard and progress summary
// Last updated: 2026-03-18

import { getAllCourseProgress } from "./academy-progress";
import { ACADEMY_COURSES } from "./academy-catalog";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ActiveCourse {
  courseId: string;
  courseTitle: { en: string; es: string };
  courseHref: string;
  modulesCompleted: number;
  totalModules: number;
  percentComplete: number;
  totalXP: number;
  lastActiveAt: string;
}

export interface ActivePathway {
  roleId: string;
  roleLabel: string;
  level: string;
  completedSteps: number;
  totalSteps: number; // estimated — we don't know exact steps without regenerating
  lastActiveAt: string;
}

export interface LearningProgressSummary {
  /** Most recently active item (course or pathway) for "Continue" CTA */
  mostRecent: {
    type: "course" | "pathway";
    title: { en: string; es: string };
    href: string;
    progress: number; // 0-100
    detail: { en: string; es: string }; // e.g. "3/6 modules" or "7/15 steps"
    lastActiveAt: string;
  } | null;

  /** All courses with any progress */
  activeCourses: ActiveCourse[];

  /** Active pathway if one exists */
  activePathway: ActivePathway | null;

  /** Aggregate stats */
  totalXP: number;
  totalModulesCompleted: number;
  totalCoursesStarted: number;

  /** Whether user has any learning activity at all */
  hasActivity: boolean;
}

/* ------------------------------------------------------------------ */
/*  Core function                                                      */
/* ------------------------------------------------------------------ */

export function getLearningProgressSummary(): LearningProgressSummary {
  if (typeof window === "undefined") {
    return {
      mostRecent: null,
      activeCourses: [],
      activePathway: null,
      totalXP: 0,
      totalModulesCompleted: 0,
      totalCoursesStarted: 0,
      hasActivity: false,
    };
  }

  // 1. Get all course progress
  const allProgress = getAllCourseProgress();
  const activeCourses: ActiveCourse[] = allProgress
    .filter((p) => p.modulesCompleted.length > 0 || p.totalXP > 0)
    .map((p) => {
      const courseMeta = ACADEMY_COURSES.find((c) => c.id === p.courseId);
      return {
        courseId: p.courseId,
        courseTitle: courseMeta?.title ?? { en: p.courseId, es: p.courseId },
        courseHref: courseMeta?.href ?? `/academy/${p.courseId}`,
        modulesCompleted: p.modulesCompleted.length,
        totalModules: courseMeta?.moduleCount ?? 0,
        percentComplete:
          courseMeta && courseMeta.moduleCount > 0
            ? Math.round(
                (p.modulesCompleted.length / courseMeta.moduleCount) * 100
              )
            : 0,
        totalXP: p.totalXP,
        lastActiveAt: p.lastActiveAt,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.lastActiveAt).getTime() -
        new Date(a.lastActiveAt).getTime()
    );

  // 2. Get pathway progress
  let activePathway: ActivePathway | null = null;
  try {
    const role = localStorage.getItem("fqhc-selected-role");
    const level = localStorage.getItem("fqhc-selected-level");
    if (role && level) {
      const pathwayKey = `fqhc-pathway-${role}-${level}`;
      const stored = localStorage.getItem(pathwayKey);
      if (stored) {
        const completedSteps: string[] = JSON.parse(stored);
        if (completedSteps.length > 0) {
          activePathway = {
            roleId: role,
            roleLabel: role.replace(/_/g, " "),
            level,
            completedSteps: completedSteps.length,
            totalSteps: 20, // estimated average
            lastActiveAt: new Date().toISOString(), // pathway doesn't track this
          };
        }
      }
    }
  } catch {
    // ignore
  }

  // 3. Aggregate stats
  const totalXP = allProgress.reduce((sum, p) => sum + p.totalXP, 0);
  const totalModulesCompleted = allProgress.reduce(
    (sum, p) => sum + p.modulesCompleted.length,
    0
  );
  const totalCoursesStarted = activeCourses.length;

  // 4. Find most recent activity
  type RecentItem = {
    type: "course" | "pathway";
    title: { en: string; es: string };
    href: string;
    progress: number;
    detail: { en: string; es: string };
    lastActiveAt: string;
  };

  let mostRecent: RecentItem | null = null;

  if (activeCourses.length > 0) {
    const latest = activeCourses[0];
    mostRecent = {
      type: "course",
      title: latest.courseTitle,
      href: latest.courseHref,
      progress: latest.percentComplete,
      detail: {
        en: `${latest.modulesCompleted}/${latest.totalModules} modules · ${latest.totalXP} XP`,
        es: `${latest.modulesCompleted}/${latest.totalModules} módulos · ${latest.totalXP} XP`,
      },
      lastActiveAt: latest.lastActiveAt,
    };
  }

  if (activePathway) {
    const pathwayDate = activePathway.lastActiveAt;
    const isPathwayMoreRecent =
      !mostRecent ||
      new Date(pathwayDate).getTime() >
        new Date(mostRecent.lastActiveAt).getTime();

    if (isPathwayMoreRecent) {
      mostRecent = {
        type: "pathway",
        title: {
          en: `${activePathway.roleLabel} Pathway`,
          es: `Ruta de ${activePathway.roleLabel}`,
        },
        href: "/pathway",
        progress: Math.min(
          Math.round(
            (activePathway.completedSteps / activePathway.totalSteps) * 100
          ),
          100
        ),
        detail: {
          en: `${activePathway.completedSteps} steps completed`,
          es: `${activePathway.completedSteps} pasos completados`,
        },
        lastActiveAt: pathwayDate,
      };
    }
  }

  return {
    mostRecent,
    activeCourses,
    activePathway,
    totalXP,
    totalModulesCompleted,
    totalCoursesStarted,
    hasActivity:
      activeCourses.length > 0 || (activePathway?.completedSteps ?? 0) > 0,
  };
}
