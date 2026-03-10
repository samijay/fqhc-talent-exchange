"use client";

import { useState, useCallback } from "react";
import { useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Zap,
  PartyPopper,
} from "lucide-react";
import { ConceptCard } from "./exercises/ConceptCard";
import { ClassifierExercise } from "./exercises/ClassifierExercise";
import { DragSortRanking } from "./exercises/DragSortRanking";
import { ScoringSimulator } from "./exercises/ScoringSimulator";
import { MiniQuiz } from "./exercises/MiniQuiz";
import type { OkrCourseModule, OkrExercise } from "@/lib/okr-course-modules";
import type { CourseProgress } from "@/lib/okr-course-progress";

interface ModuleScreenProps {
  module: OkrCourseModule;
  progress: CourseProgress;
  onExerciseComplete: (
    exerciseId: string,
    score: number,
    xpReward: number
  ) => void;
  onModuleComplete: () => void;
  onBack: () => void;
}

type ScreenPhase = "intro" | "concept" | "exercise" | "complete";

export function ModuleScreen({
  module,
  onExerciseComplete,
  onModuleComplete,
  onBack,
}: ModuleScreenProps) {
  const locale = useLocale();
  const t = (obj: { en: string; es: string }) =>
    locale === "es" ? obj.es : obj.en;

  const [phase, setPhase] = useState<ScreenPhase>("intro");
  const [conceptIndex, setConceptIndex] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [earnedXP, setEarnedXP] = useState(0);

  const totalConcepts = module.conceptContent.length;
  const totalExercises = module.exercises.length;
  const totalSteps = 1 + totalConcepts + totalExercises + 1; // intro + concepts + exercises + complete
  const currentStep =
    phase === "intro"
      ? 1
      : phase === "concept"
        ? 2 + conceptIndex
        : phase === "exercise"
          ? 2 + totalConcepts + exerciseIndex
          : totalSteps;
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  const handleExerciseComplete = useCallback(
    (exercise: OkrExercise, score: number) => {
      setEarnedXP((prev) => prev + exercise.xpReward);
      onExerciseComplete(exercise.id, score, exercise.xpReward);

      // Auto-advance after a brief delay
      setTimeout(() => {
        if (exerciseIndex < totalExercises - 1) {
          setExerciseIndex((prev) => prev + 1);
        } else {
          setPhase("complete");
        }
      }, 1500);
    },
    [exerciseIndex, totalExercises, onExerciseComplete]
  );

  const handleNextConcept = useCallback(() => {
    if (conceptIndex < totalConcepts - 1) {
      setConceptIndex((prev) => prev + 1);
    } else if (totalExercises > 0) {
      setPhase("exercise");
    } else {
      setPhase("complete");
    }
  }, [conceptIndex, totalConcepts, totalExercises]);

  // Render exercise component based on type
  const renderExercise = (exercise: OkrExercise) => {
    const key = `${exercise.id}-${exerciseIndex}`;
    switch (exercise.type) {
      case "concept-card":
        return (
          <ConceptCard
            key={key}
            exercise={exercise}
            onComplete={(score) => handleExerciseComplete(exercise, score)}
          />
        );
      case "classifier":
        return (
          <ClassifierExercise
            key={key}
            exercise={exercise}
            onComplete={(score) => handleExerciseComplete(exercise, score)}
          />
        );
      case "drag-sort":
        return (
          <DragSortRanking
            key={key}
            exercise={exercise}
            onComplete={(score) => handleExerciseComplete(exercise, score)}
          />
        );
      case "scoring-sim":
        return (
          <ScoringSimulator
            key={key}
            exercise={exercise}
            onComplete={(score) => handleExerciseComplete(exercise, score)}
          />
        );
      case "mini-quiz":
        return (
          <MiniQuiz
            key={key}
            exercise={exercise}
            onComplete={(score) => handleExerciseComplete(exercise, score)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-stone-500 hover:text-stone-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          {locale === "es" ? "Volver" : "Back"}
        </Button>
        <div className="flex-1" />
        <Badge
          variant="outline"
          className="text-stone-500 dark:text-stone-400"
        >
          <BookOpen className="h-3 w-3 mr-1" />
          {module.estimatedMinutes}{" "}
          {locale === "es" ? "min" : "min"}
        </Badge>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
        <div className="h-full bg-teal-500 rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
      </div>

      {/* Content area */}
      {phase === "intro" && (
        <div className="flex flex-col items-center text-center gap-6 py-8">
          <div
            className={`w-16 h-16 rounded-2xl bg-${module.color}-100 dark:bg-${module.color}-900 flex items-center justify-center`}
          >
            <span className="text-3xl font-bold text-stone-600 dark:text-stone-300">
              {module.order}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-2">
              {t(module.title)}
            </h1>
            <p className="text-stone-500 dark:text-stone-400 max-w-md">
              {t(module.description)}
            </p>
          </div>

          {/* Learning objectives */}
          <Card className="w-full max-w-md text-left border-stone-200 dark:border-stone-700">
            <CardContent className="p-4">
              <p className="text-sm font-medium text-stone-600 dark:text-stone-400 mb-3">
                {locale === "es"
                  ? "Lo que aprenderás:"
                  : "What you'll learn:"}
              </p>
              <div className="space-y-2">
                {module.learningObjectives.map((obj, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-sm text-stone-700 dark:text-stone-300"
                  >
                    <CheckCircle2 className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" />
                    <span>{t(obj)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={() =>
              totalConcepts > 0
                ? setPhase("concept")
                : totalExercises > 0
                  ? setPhase("exercise")
                  : setPhase("complete")
            }
            className="bg-teal-600 hover:bg-teal-700 text-white px-8"
          >
            {locale === "es" ? "Comenzar Módulo" : "Start Module"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}

      {phase === "concept" && (
        <div className="py-4">
          <Card className="border-stone-200 dark:border-stone-700">
            <CardContent className="p-6">
              <p className="text-xs font-medium text-teal-600 dark:text-teal-400 mb-2">
                {locale === "es" ? "Concepto" : "Concept"}{" "}
                {conceptIndex + 1} / {totalConcepts}
              </p>
              <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-4">
                {t(module.conceptContent[conceptIndex].heading)}
              </h2>
              <p className="text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line">
                {t(module.conceptContent[conceptIndex].body)}
              </p>
            </CardContent>
          </Card>
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleNextConcept}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              {conceptIndex < totalConcepts - 1
                ? locale === "es"
                  ? "Siguiente Concepto"
                  : "Next Concept"
                : totalExercises > 0
                  ? locale === "es"
                    ? "Comenzar Ejercicios"
                    : "Start Exercises"
                  : locale === "es"
                    ? "Completar"
                    : "Complete"}
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {phase === "exercise" && module.exercises[exerciseIndex] && (
        <div className="py-4">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium text-stone-600 dark:text-stone-400">
              {locale === "es" ? "Ejercicio" : "Exercise"}{" "}
              {exerciseIndex + 1} / {totalExercises}
            </span>
          </div>
          {renderExercise(module.exercises[exerciseIndex])}
        </div>
      )}

      {phase === "complete" && (
        <div className="flex flex-col items-center text-center gap-6 py-8">
          <PartyPopper className="h-16 w-16 text-teal-500" />
          <div>
            <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-2">
              {locale === "es"
                ? "¡Módulo Completado!"
                : "Module Complete!"}
            </h2>
            <p className="text-stone-500 dark:text-stone-400">
              {t(module.title)}
            </p>
          </div>

          {earnedXP > 0 && (
            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 text-lg px-4 py-1">
              <Zap className="h-4 w-4 mr-1" />+{earnedXP} XP
            </Badge>
          )}

          <Button
            onClick={onModuleComplete}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8"
          >
            {locale === "es"
              ? "Volver a Módulos"
              : "Back to Modules"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
