// CoursePlayer.tsx — Generic course player for any FQHC Academy course
// Adapted from OkrCoursePlayer with course-agnostic interface
"use client";

import { useState, useCallback, useEffect } from "react";
import { useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  BookOpen,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { AcademyModuleScreen } from "./AcademyModuleScreen";
import type { AcademyModule, BilingualText } from "@/lib/academy-types";
import {
  loadCourseProgress,
  saveCourseProgress,
  createFreshCourseProgress,
  completeModuleProgress,
  recordExerciseScoreProgress,
  getCompletionPercentage,
  type AcademyCourseProgress,
} from "@/lib/academy-progress";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface CoursePlayerProps {
  courseId: string;
  modules: AcademyModule[];
  totalXP: number;
  userId?: string;
  initialModuleId?: string;
  /** If true, modules unlock sequentially */
  sequential?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function CoursePlayer({
  courseId,
  modules,
  totalXP,
  userId,
  initialModuleId,
  sequential = true,
}: CoursePlayerProps) {
  const locale = useLocale();
  const t = (obj: BilingualText) => (locale === "es" ? obj.es : obj.en);
  const isEs = locale === "es";

  const [progress, setProgress] = useState<AcademyCourseProgress>(() => {
    return (
      loadCourseProgress(courseId, userId) ||
      createFreshCourseProgress(courseId, userId)
    );
  });
  const [activeModuleId, setActiveModuleId] = useState<string | null>(
    initialModuleId || null,
  );

  // Save progress to localStorage on every change
  useEffect(() => {
    saveCourseProgress(progress);
  }, [progress]);

  const activeModule = activeModuleId
    ? modules.find((m) => m.id === activeModuleId)
    : null;

  const completionPercent = getCompletionPercentage(progress, modules.length);

  const handleExerciseComplete = useCallback(
    (exerciseId: string, score: number, xpReward: number) => {
      setProgress((prev) =>
        recordExerciseScoreProgress(prev, exerciseId, score, xpReward),
      );
    },
    [],
  );

  const handleModuleComplete = useCallback(
    (moduleId: string) => {
      setProgress((prev) => completeModuleProgress(prev, moduleId));
      setActiveModuleId(null);
    },
    [],
  );

  const handleStartModule = useCallback((moduleId: string) => {
    setActiveModuleId(moduleId);
  }, []);

  const handleBackToList = useCallback(() => {
    setActiveModuleId(null);
  }, []);

  // ---- Active module view ----
  if (activeModule) {
    return (
      <AcademyModuleScreen
        module={activeModule}
        progress={progress}
        onExerciseComplete={handleExerciseComplete}
        onModuleComplete={() => handleModuleComplete(activeModule.id)}
        onBack={handleBackToList}
      />
    );
  }

  // ---- Module list view ----
  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      {/* Progress header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
              {progress.totalXP} / {totalXP} XP
            </span>
          </div>
          <span className="text-sm text-stone-500 dark:text-stone-500">
            {completionPercent}% {isEs ? "completado" : "complete"}
          </span>
        </div>
        <div className="h-2 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal-500 rounded-full transition-all"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </div>

      {/* Module cards */}
      <div className="flex flex-col gap-3">
        {modules.map((module, index) => {
          const isCompleted = progress.modulesCompleted.includes(module.id);
          const isLocked =
            sequential &&
            index > 0 &&
            !progress.modulesCompleted.includes(modules[index - 1].id);

          return (
            <Card
              key={module.id}
              className={`transition-all ${
                isCompleted
                  ? "border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/30"
                  : isLocked
                    ? "opacity-60 border-stone-200 dark:border-stone-800"
                    : "border-stone-200 dark:border-stone-700 hover:shadow-md hover:border-teal-300 dark:hover:border-teal-700"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Module number / status */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isCompleted
                        ? "bg-green-100 dark:bg-green-900"
                        : "bg-stone-100 dark:bg-stone-800"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <span className="text-sm font-bold text-stone-600 dark:text-stone-500">
                        {module.order}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200 truncate">
                      {t(module.title)}
                    </h3>
                    <p className="text-sm text-stone-500 dark:text-stone-500 line-clamp-2">
                      {t(module.subtitle)}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-stone-500 dark:text-stone-500">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {module.estimatedMinutes} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        {module.totalXP} XP
                      </span>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="shrink-0">
                    <Button
                      size="sm"
                      variant={isCompleted ? "outline" : "default"}
                      disabled={isLocked}
                      onClick={() => handleStartModule(module.id)}
                      className={
                        !isCompleted && !isLocked
                          ? "bg-teal-600 hover:bg-teal-700 text-white"
                          : ""
                      }
                    >
                      {isCompleted
                        ? isEs
                          ? "Repasar"
                          : "Review"
                        : isEs
                          ? "Comenzar"
                          : "Start"}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
