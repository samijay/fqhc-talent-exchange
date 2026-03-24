// Deep-linkable OKR Course Module page
// Allows sharing links like /strategy/okr-course/writing-objectives
"use client";

import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Lock,
  Target,
  Share2,
  CheckCircle2,
} from "lucide-react";
import { OKR_COURSE_MODULES } from "@/lib/okr-course-modules";
import {
  loadProgress,
  recordExerciseScore,
  completeModule,
  type CourseProgress,
} from "@/lib/okr-course-progress";
import { ModuleScreen } from "@/components/okr-course/ModuleScreen";
import { useAuth } from "@/components/auth/AuthProvider";

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

export default function ModulePage() {
  const params = useParams();
  const locale = useLocale();
  const isEs = locale === "es";
  const { user } = useAuth();
  const moduleId = params.moduleId as string;

  const moduleIndex = OKR_COURSE_MODULES.findIndex((m) => m.id === moduleId);
  const courseModule = OKR_COURSE_MODULES[moduleIndex];

  const [progress, setProgress] = useState<CourseProgress | null>(() =>
    loadProgress(user?.id)
  );
  const [completed, setCompleted] = useState(false);

  // Check if this module is unlocked (first module always is, others need prior completion)
  const isUnlocked = useMemo(() => {
    if (moduleIndex === 0) return true;
    if (!progress) return false;
    const prevModule = OKR_COURSE_MODULES[moduleIndex - 1];
    return progress.modulesCompleted.includes(prevModule.id);
  }, [moduleIndex, progress]);

  const handleExerciseComplete = useCallback(
    (exerciseId: string, score: number, xpReward: number) => {
      setProgress((prev) => {
        if (!prev) return prev;
        return recordExerciseScore(prev, exerciseId, score, xpReward);
      });
    },
    []
  );

  const handleModuleComplete = useCallback(() => {
    setProgress((prev) => {
      if (!prev) return prev;
      return completeModule(prev, moduleId);
    });
    setCompleted(true);
  }, [moduleId]);

  // Module not found
  if (!courseModule) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center gap-4">
        <Target className="h-12 w-12 text-stone-300 dark:text-stone-600" aria-hidden="true" />
        <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100">
          {isEs ? "Módulo no encontrado" : "Module not found"}
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-500">
          {isEs
            ? "Este módulo no existe. Revisa el curso completo."
            : "This module doesn't exist. Check out the full course."}
        </p>
        <Link href="/strategy/okr-course">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            <ArrowLeft className="h-4 w-4 mr-1" />
            {isEs ? "Ir al Curso" : "Go to Course"}
          </Button>
        </Link>
      </div>
    );
  }

  // Module locked
  if (!isUnlocked) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center gap-4">
        <Lock className="h-12 w-12 text-stone-300 dark:text-stone-600" aria-hidden="true" />
        <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100">
          {isEs ? "Módulo Bloqueado" : "Module Locked"}
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-500 max-w-md">
          {isEs
            ? `Completa "${t(OKR_COURSE_MODULES[moduleIndex - 1].title, locale)}" primero para desbloquear este módulo.`
            : `Complete "${t(OKR_COURSE_MODULES[moduleIndex - 1].title, locale)}" first to unlock this module.`}
        </p>
        <Link href="/strategy/okr-course">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            <ArrowLeft className="h-4 w-4 mr-1" />
            {isEs ? "Ir al Curso" : "Go to Course"}
          </Button>
        </Link>
      </div>
    );
  }

  // Completed state — show results + next module link
  if (completed) {
    const nextModule = OKR_COURSE_MODULES[moduleIndex + 1];
    const isLastModule = moduleIndex === OKR_COURSE_MODULES.length - 1;

    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center gap-4">
          <CheckCircle2 className="h-16 w-16 text-teal-500" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100">
            {isEs ? "¡Módulo Completado!" : "Module Complete!"}
          </h2>
          <p className="text-stone-600 dark:text-stone-500">
            {t(courseModule.title, locale)}
          </p>

          {/* Share button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const url = window.location.href;
              if (navigator.share) {
                navigator.share({
                  title: t(courseModule.title, locale),
                  text: isEs
                    ? `Acabo de completar "${t(courseModule.title, locale)}" en FQHC Talent Academy`
                    : `I just completed "${t(courseModule.title, locale)}" on FQHC Talent Academy`,
                  url,
                });
              } else {
                navigator.clipboard.writeText(url);
              }
            }}
            aria-label={isEs ? "Compartir logro" : "Share achievement"}
          >
            <Share2 className="h-4 w-4 mr-1" aria-hidden="true" />
            {isEs ? "Compartir" : "Share"}
          </Button>

          <div className="flex gap-3 mt-4">
            <Link href="/strategy/okr-course">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-1" />
                {isEs ? "Menú del Curso" : "Course Menu"}
              </Button>
            </Link>
            {isLastModule ? (
              <Link href="/strategy/okr-course/capstone">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  {isEs ? "Ir al Capstone" : "Go to Capstone"}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            ) : nextModule ? (
              <Link href={`/strategy/okr-course/${nextModule.id}`}>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  {isEs ? "Siguiente Módulo" : "Next Module"}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  // Module info header + module player
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-500 mb-6" aria-label="Breadcrumb">
        <Link
          href="/strategy/okr-course"
          className="hover:text-teal-600 transition-colors"
        >
          {isEs ? "Curso OKR" : "OKR Course"}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-stone-800 dark:text-stone-200 font-medium">
          {t(courseModule.title, locale)}
        </span>
      </nav>

      {/* Module header */}
      <Card className="mb-6 border-teal-200 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-950/30">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900 flex items-center justify-center shrink-0">
              <BookOpen className="h-5 w-5 text-teal-600 dark:text-teal-400" aria-hidden="true" />
            </div>
            <div>
              <Badge variant="outline" className="mb-1 text-xs">
                {isEs ? "Módulo" : "Module"} {moduleIndex + 1} / {OKR_COURSE_MODULES.length}
              </Badge>
              <h1 className="text-lg font-bold text-stone-800 dark:text-stone-100">
                {t(courseModule.title, locale)}
              </h1>
              <p className="text-sm text-stone-500 dark:text-stone-500 mt-1">
                {t(courseModule.subtitle, locale)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Module player */}
      <ModuleScreen
        module={courseModule}
        progress={progress || { userId: "guest", totalXP: 0, modulesCompleted: [], exerciseScores: {}, currentModuleId: null, capstoneSubmitted: null, startedAt: new Date().toISOString(), lastActiveAt: new Date().toISOString() }}
        onExerciseComplete={handleExerciseComplete}
        onModuleComplete={handleModuleComplete}
        onBack={() => window.history.back()}
      />
    </div>
  );
}
