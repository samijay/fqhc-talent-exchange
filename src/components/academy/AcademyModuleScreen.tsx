// AcademyModuleScreen.tsx — Generic module renderer for any Academy course
// Renders concept content, then exercises in sequence
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
// Reuse existing exercise components from the OKR course
import { ConceptCard } from "@/components/okr-course/exercises/ConceptCard";
import { ClassifierExercise } from "@/components/okr-course/exercises/ClassifierExercise";
import { DragSortRanking } from "@/components/okr-course/exercises/DragSortRanking";
import { ScoringSimulator } from "@/components/okr-course/exercises/ScoringSimulator";
import { MiniQuiz } from "@/components/okr-course/exercises/MiniQuiz";
import type { AcademyModule, AcademyExercise, BilingualText } from "@/lib/academy-types";
import type { AcademyCourseProgress } from "@/lib/academy-progress";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface AcademyModuleScreenProps {
  module: AcademyModule;
  progress: AcademyCourseProgress;
  onExerciseComplete: (
    exerciseId: string,
    score: number,
    xpReward: number,
  ) => void;
  onModuleComplete: () => void;
  onBack: () => void;
}

type ScreenPhase = "intro" | "concept" | "exercise" | "complete";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function AcademyModuleScreen({
  module,
  progress,
  onExerciseComplete,
  onModuleComplete,
  onBack,
}: AcademyModuleScreenProps) {
  const locale = useLocale();
  const t = (obj: BilingualText) => (locale === "es" ? obj.es : obj.en);
  const isEs = locale === "es";

  const [phase, setPhase] = useState<ScreenPhase>("intro");
  const [conceptIndex, setConceptIndex] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [earnedXP, setEarnedXP] = useState(0);

  const totalConcepts = module.conceptContent.length;
  const totalExercises = module.exercises.length;
  const totalSteps = 1 + totalConcepts + totalExercises + 1;
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
    (exercise: AcademyExercise, score: number) => {
      setEarnedXP((prev) => prev + exercise.xpReward);
      onExerciseComplete(exercise.id, score, exercise.xpReward);

      // Auto-advance after brief delay
      setTimeout(() => {
        if (exerciseIndex < totalExercises - 1) {
          setExerciseIndex((prev) => prev + 1);
        } else {
          setPhase("complete");
        }
      }, 1500);
    },
    [exerciseIndex, totalExercises, onExerciseComplete],
  );

  // ---- Exercise renderer ----
  const renderExercise = (exercise: AcademyExercise) => {
    // The exercise components from OKR course accept OkrExercise types
    // which are structurally identical to AcademyExercise types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const exerciseAny = exercise as any;

    switch (exercise.type) {
      case "concept-card":
        return (
          <ConceptCard
            exercise={exerciseAny}
            onComplete={(score: number) => handleExerciseComplete(exercise, score)}
          />
        );
      case "classifier":
        return (
          <ClassifierExercise
            exercise={exerciseAny}
            onComplete={(score: number) => handleExerciseComplete(exercise, score)}
          />
        );
      case "drag-sort":
        return (
          <DragSortRanking
            exercise={exerciseAny}
            onComplete={(score: number) => handleExerciseComplete(exercise, score)}
          />
        );
      case "scoring-sim":
        return (
          <ScoringSimulator
            exercise={exerciseAny}
            onComplete={(score: number) => handleExerciseComplete(exercise, score)}
          />
        );
      case "mini-quiz":
        return (
          <MiniQuiz
            exercise={exerciseAny}
            onComplete={(score: number) => handleExerciseComplete(exercise, score)}
          />
        );
      case "scenario":
      case "checklist":
        // New exercise types — render as mini-quiz fallback for now
        // Full implementations to be added when courses use them
        return (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center dark:border-amber-800 dark:bg-amber-950/30">
            <p className="text-amber-700 dark:text-amber-300 font-medium">
              {isEs ? "Ejercicio próximamente" : "Exercise coming soon"}
            </p>
            <Button
              className="mt-4"
              variant="outline"
              onClick={() => handleExerciseComplete(exercise, 100)}
            >
              {isEs ? "Continuar" : "Continue"}
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  // ---- Intro screen ----
  if (phase === "intro") {
    return (
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          {isEs ? "Volver" : "Back"}
        </Button>

        <Card>
          <CardContent className="p-6 sm:p-8">
            <Badge className="mb-4 bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
              <BookOpen className="h-3 w-3 mr-1" />
              {isEs ? "Módulo" : "Module"} {module.order}
            </Badge>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
              {t(module.title)}
            </h2>
            <p className="text-stone-600 dark:text-stone-300 mb-6">
              {t(module.description)}
            </p>

            {/* Learning objectives */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">
                {isEs ? "Aprenderás a:" : "You'll learn to:"}
              </h3>
              <ul className="space-y-2">
                {module.learningObjectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-stone-600 dark:text-stone-400">
                    <CheckCircle2 className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" />
                    {t(obj)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-stone-400 mb-6">
              <span className="flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5" />
                {module.estimatedMinutes} min
              </span>
              <span className="flex items-center gap-1">
                <Zap className="h-3.5 w-3.5" />
                {module.totalXP} XP
              </span>
            </div>

            <Button
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              onClick={() => {
                if (totalConcepts > 0) {
                  setPhase("concept");
                } else if (totalExercises > 0) {
                  setPhase("exercise");
                } else {
                  setPhase("complete");
                }
              }}
            >
              {isEs ? "Comenzar Módulo" : "Start Module"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ---- Concept content ----
  if (phase === "concept") {
    const concept = module.conceptContent[conceptIndex];
    return (
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="mb-4">
          <div className="h-1.5 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-500 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-stone-400">
            <span>{t(module.title)}</span>
            <span>
              {currentStep}/{totalSteps}
            </span>
          </div>
        </div>

        <Card>
          <CardContent className="p-6 sm:p-8">
            <Badge variant="secondary" className="mb-4">
              <BookOpen className="h-3 w-3 mr-1" />
              {isEs ? "Concepto" : "Concept"} {conceptIndex + 1}/{totalConcepts}
            </Badge>

            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
              {t(concept.heading)}
            </h3>
            <div className="prose prose-stone dark:prose-invert prose-sm max-w-none mb-6">
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed whitespace-pre-line">
                {t(concept.body)}
              </p>
            </div>

            {/* Desktop navigation */}
            <div className="hidden sm:flex justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (conceptIndex > 0) {
                    setConceptIndex((prev) => prev - 1);
                  } else {
                    setPhase("intro");
                  }
                }}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                {isEs ? "Anterior" : "Back"}
              </Button>
              <Button
                className="bg-teal-600 hover:bg-teal-700 text-white"
                onClick={() => {
                  if (conceptIndex < totalConcepts - 1) {
                    setConceptIndex((prev) => prev + 1);
                  } else if (totalExercises > 0) {
                    setPhase("exercise");
                  } else {
                    setPhase("complete");
                  }
                }}
              >
                {isEs ? "Siguiente" : "Next"}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Mobile sticky bottom navigation */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-700 p-3 flex justify-between gap-3 z-50">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1"
            onClick={() => {
              if (conceptIndex > 0) {
                setConceptIndex((prev) => prev - 1);
              } else {
                setPhase("intro");
              }
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {isEs ? "Anterior" : "Back"}
          </Button>
          <Button
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
            onClick={() => {
              if (conceptIndex < totalConcepts - 1) {
                setConceptIndex((prev) => prev + 1);
              } else if (totalExercises > 0) {
                setPhase("exercise");
              } else {
                setPhase("complete");
              }
            }}
          >
            {isEs ? "Siguiente" : "Next"}
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        {/* Spacer for mobile sticky nav */}
        <div className="sm:hidden h-16" />
      </div>
    );
  }

  // ---- Exercise phase ----
  if (phase === "exercise") {
    const exercise = module.exercises[exerciseIndex];
    return (
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="mb-4">
          <div className="h-1.5 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-500 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-stone-400">
            <span>
              {isEs ? "Ejercicio" : "Exercise"} {exerciseIndex + 1}/
              {totalExercises}
            </span>
            <span className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-amber-500" />
              +{earnedXP} XP
            </span>
          </div>
        </div>

        {renderExercise(exercise)}
      </div>
    );
  }

  // ---- Complete screen ----
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white dark:border-green-900 dark:from-green-950/30 dark:to-stone-900">
        <CardContent className="p-6 sm:p-8 text-center">
          <PartyPopper className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
            {isEs ? "¡Módulo Completado!" : "Module Complete!"}
          </h2>
          <p className="text-stone-600 dark:text-stone-300 mb-4">
            {t(module.title)}
          </p>

          <div className="flex items-center justify-center gap-4 mb-6 text-sm">
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
              <Zap className="h-4 w-4" />
              +{earnedXP} XP {isEs ? "ganados" : "earned"}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              onClick={onModuleComplete}
            >
              {isEs ? "Continuar al Siguiente" : "Continue to Next"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button variant="ghost" onClick={onBack}>
              {isEs ? "Volver a la Lista" : "Back to Module List"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
