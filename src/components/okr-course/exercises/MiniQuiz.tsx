"use client";

import { useState, useCallback } from "react";
import { useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, ArrowRight, Brain } from "lucide-react";
import type { MiniQuizExercise as MiniQuizData } from "@/lib/okr-course-modules";

interface MiniQuizProps {
  exercise: MiniQuizData;
  onComplete: (score: number) => void;
}

export function MiniQuiz({ exercise, onComplete }: MiniQuizProps) {
  const locale = useLocale();
  const t = (obj: { en: string; es: string }) =>
    locale === "es" ? obj.es : obj.en;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null
  );
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const questions = exercise.questions;
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const selectedOption =
    selectedOptionIndex !== null
      ? currentQuestion.options[selectedOptionIndex]
      : null;

  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (selectedOptionIndex !== null) return; // already answered
      setSelectedOptionIndex(optionIndex);
      if (currentQuestion.options[optionIndex].isCorrect) {
        setCorrectCount((prev) => prev + 1);
      }
    },
    [selectedOptionIndex, currentQuestion]
  );

  const handleNext = useCallback(() => {
    if (isLastQuestion) {
      setCompleted(true);
      const finalCorrect =
        correctCount +
        (selectedOption?.isCorrect ? 0 : 0); // already counted
      const score = Math.round((finalCorrect / totalQuestions) * 100);
      onComplete(score);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
    }
  }, [isLastQuestion, correctCount, selectedOption, totalQuestions, onComplete]);

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-4">
        <Brain className="h-12 w-12 text-teal-500" />
        <p className="text-lg font-medium text-stone-700 dark:text-stone-300">
          {locale === "es"
            ? `${correctCount} de ${totalQuestions} correctas`
            : `${correctCount} of ${totalQuestions} correct`}
        </p>
        <Badge className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
          +{exercise.xpReward} XP
        </Badge>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-500">
        <Brain className="h-4 w-4" />
        <span>
          {locale === "es" ? "Pregunta" : "Question"} {currentIndex + 1} /{" "}
          {totalQuestions}
        </span>
      </div>

      {/* Question */}
      <p className="text-base font-medium text-stone-800 dark:text-stone-200">
        {t(currentQuestion.question)}
      </p>

      {/* Options */}
      <div className="flex flex-col gap-2">
        {currentQuestion.options.map((option, i) => {
          const isSelected = selectedOptionIndex === i;
          const showResult = selectedOptionIndex !== null;
          const isCorrectOption = option.isCorrect;

          let borderClass = "border-stone-200 dark:border-stone-700";
          let bgClass = "bg-white dark:bg-stone-900";

          if (showResult) {
            if (isCorrectOption) {
              borderClass =
                "border-green-300 dark:border-green-800";
              bgClass = "bg-green-50 dark:bg-green-950";
            } else if (isSelected && !isCorrectOption) {
              borderClass = "border-red-300 dark:border-red-800";
              bgClass = "bg-red-50 dark:bg-red-950";
            } else {
              bgClass = "bg-stone-50 dark:bg-stone-900 opacity-60";
            }
          }

          return (
            <Card
              key={i}
              className={`cursor-pointer transition-all ${borderClass} ${bgClass} ${
                !showResult ? "hover:shadow-sm hover:border-teal-300 dark:hover:border-teal-700" : ""
              }`}
              onClick={() => handleSelect(i)}
              role="button"
              tabIndex={showResult ? -1 : 0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleSelect(i);
              }}
            >
              <CardContent className="p-3 flex items-start gap-3">
                {/* Status icon or letter */}
                {showResult ? (
                  isCorrectOption ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  ) : isSelected ? (
                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                  ) : (
                    <div className="w-5 h-5 shrink-0" />
                  )
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-stone-300 dark:border-stone-600 shrink-0 mt-0.5 flex items-center justify-center text-xs text-stone-500">
                    {String.fromCharCode(65 + i)}
                  </div>
                )}

                <div className="flex-1">
                  <p className="text-sm text-stone-700 dark:text-stone-300">
                    {t(option.text)}
                  </p>
                  {/* Show explanation after selection */}
                  {showResult && (isSelected || isCorrectOption) && (
                    <p className="text-xs text-stone-500 dark:text-stone-500 mt-2 leading-relaxed">
                      {t(option.explanation)}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Next button (after answer) */}
      {selectedOptionIndex !== null && (
        <Button
          onClick={handleNext}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          {isLastQuestion
            ? locale === "es"
              ? "Ver Resultados"
              : "See Results"
            : locale === "es"
              ? "Siguiente"
              : "Next"}
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      )}
    </div>
  );
}
