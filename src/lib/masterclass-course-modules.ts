// masterclass-course-modules.ts
// Combined masterclass course modules — all 30 interactive modules
// Converts the static FQHC masterclass content into interactive course modules with exercises
// Last updated: 2026-03-23

export type { MasterclassCourseModule, MasterclassExercise } from "./masterclass-course-modules-part1";
import { MASTERCLASS_MODULES_PART1 } from "./masterclass-course-modules-part1";
import { MASTERCLASS_MODULES_PART2 } from "./masterclass-course-modules-part2";

export const MASTERCLASS_COURSE_MODULES = [
  ...MASTERCLASS_MODULES_PART1,
  ...MASTERCLASS_MODULES_PART2,
];

export const MASTERCLASS_TOTAL_XP = MASTERCLASS_COURSE_MODULES.reduce(
  (sum, m) => sum + m.totalXP,
  0
);

export const MASTERCLASS_TOTAL_MINUTES = MASTERCLASS_COURSE_MODULES.reduce(
  (sum, m) => sum + m.estimatedMinutes,
  0
);
