"use client";

import { useState, useCallback, useEffect } from "react";
import { useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  BookOpen,
  Zap,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { ModuleScreen } from "./ModuleScreen";
import type { OkrCourseModule } from "@/lib/okr-course-modules";
import {
  loadProgress,
  saveProgress,
  createFreshProgress,
  completeModule,
  recordExerciseScore,
  getCompletionPercentage,
  type CourseProgress,
} from "@/lib/okr-course-progress";
import { COURSE_TOTAL_XP } from "@/lib/okr-course-modules";

interface OkrCoursePlayerProps {
  modules: OkrCourseModule[];
  userId?: string;
  initialModuleId?: string;
  onNavigateToCapstone?: () => void;
}

export function OkrCoursePlayer({
  modules,
  userId,
  initialModuleId,
  onNavigateToCapstone,
}: OkrCoursePlayerProps) {
  const locale = useLocale();
  const t = (obj: { en: string; es: string }) =>
    locale === "es" ? obj.es : obj.en;

  const [progress, setProgress] = useState<CourseProgress>(() => {
    return loadProgress(userId) || createFreshProgress(userId);
  });
  const [activeModuleId, setActiveModuleId] = useState<string | null>(
    initialModuleId || null
  );

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const activeModule = activeModuleId
    ? modules.find((m) => m.id === activeModuleId)
    : null;

  const completionPercent = getCompletionPercentage(
    progress,
    modules.length
  );

  const handleExerciseComplete = useCallback(
    (exerciseId: string, score: number, xpReward: number) => {
      setProgress((prev) => recordExerciseScore(prev, exerciseId, score, xpReward));
    },
    []
  );

  const handleModuleComplete = useCallback(
    (moduleId: string) => {
      setProgress((prev) => completeModule(prev, moduleId));
      setActiveModuleId(null); // return to module list
    },
    []
  );

  const handleStartModule = useCallback((moduleId: string) => {
    setActiveModuleId(moduleId);
  }, []);

  const handleBackToList = useCallback(() => {
    setActiveModuleId(null);
  }, []);

  // If a module is active, show the module screen
  if (activeModule) {
    return (
      <ModuleScreen
        module={activeModule}
        progress={progress}
        onExerciseComplete={handleExerciseComplete}
        onModuleComplete={() => handleModuleComplete(activeModule.id)}
        onBack={handleBackToList}
      />
    );
  }

  // Module list view
  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      {/* Progress header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
              {progress.totalXP} / {COURSE_TOTAL_XP} XP
            </span>
          </div>
          <span className="text-sm text-stone-500 dark:text-stone-400">
            {completionPercent}%{" "}
            {locale === "es" ? "completado" : "complete"}
          </span>
        </div>
        <div className="h-2 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
          <div className="h-full bg-teal-500 rounded-full transition-all" style={{ width: `${completionPercent}%` }} />
        </div>
      </div>

      {/* Module cards */}
      <div className="flex flex-col gap-3">
        {modules.map((module, index) => {
          const isCompleted = progress.modulesCompleted.includes(module.id);
          const isLocked =
            index > 0 &&
            !progress.modulesCompleted.includes(modules[index - 1].id) &&
            module.id !== "capstone";
          const isCapstone = module.id === "capstone";

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
                        : isCapstone
                          ? "bg-teal-100 dark:bg-teal-900"
                          : "bg-stone-100 dark:bg-stone-800"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <span
                        className={`text-sm font-bold ${
                          isCapstone
                            ? "text-teal-600 dark:text-teal-400"
                            : "text-stone-600 dark:text-stone-400"
                        }`}
                      >
                        {module.order}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200 truncate">
                        {t(module.title)}
                      </h3>
                      {isCapstone && (
                        <Badge
                          variant="outline"
                          className="border-teal-300 text-teal-700 dark:border-teal-700 dark:text-teal-300 shrink-0"
                        >
                          Capstone
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-stone-500 dark:text-stone-400 line-clamp-2">
                      {t(module.subtitle)}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-stone-400 dark:text-stone-500">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {module.estimatedMinutes}{" "}
                        {locale === "es" ? "min" : "min"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        {module.totalXP} XP
                      </span>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="shrink-0">
                    {isCapstone ? (
                      <Button
                        size="sm"
                        variant={isCompleted ? "outline" : "default"}
                        disabled={isLocked}
                        onClick={() => {
                          if (onNavigateToCapstone) {
                            onNavigateToCapstone();
                          } else {
                            handleStartModule(module.id);
                          }
                        }}
                        className={
                          !isCompleted && !isLocked
                            ? "bg-teal-600 hover:bg-teal-700 text-white"
                            : ""
                        }
                      >
                        {isCompleted
                          ? locale === "es"
                            ? "Revisar"
                            : "Review"
                          : locale === "es"
                            ? "Comenzar"
                            : "Start"}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    ) : (
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
                          ? locale === "es"
                            ? "Repasar"
                            : "Review"
                          : locale === "es"
                            ? "Comenzar"
                            : "Start"}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    )}
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
