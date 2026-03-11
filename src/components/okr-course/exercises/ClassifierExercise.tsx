"use client";

import { useState, useCallback } from "react";
import { useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, ThumbsUp, ThumbsDown, ArrowRight } from "lucide-react";
import type { ClassifierExercise as ClassifierData } from "@/lib/okr-course-modules";

interface ClassifierExerciseProps {
  exercise: ClassifierData;
  onComplete: (score: number) => void;
}

export function ClassifierExercise({
  exercise,
  onComplete,
}: ClassifierExerciseProps) {
  const locale = useLocale();
  const t = (obj: { en: string; es: string }) =>
    locale === "es" ? obj.es : obj.en;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const items = exercise.items;
  const currentItem = items[currentIndex];
  const totalItems = items.length;
  const isLastItem = currentIndex === totalItems - 1;

  const handleJudge = useCallback(
    (judgedGood: boolean) => {
      setSelectedAnswer(judgedGood);
      if (judgedGood === currentItem.isGood) {
        setCorrectCount((prev) => prev + 1);
      }
    },
    [currentItem]
  );

  const handleNext = useCallback(() => {
    if (isLastItem) {
      setCompleted(true);
      const finalCorrect =
        correctCount +
        (selectedAnswer === currentItem.isGood ? 0 : 0); // already counted
      const score = Math.round((finalCorrect / totalItems) * 100);
      onComplete(score);
    } else {
      setSelectedAnswer(null);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [
    isLastItem,
    correctCount,
    selectedAnswer,
    currentItem,
    totalItems,
    onComplete,
  ]);

  const isCorrect = selectedAnswer === currentItem?.isGood;

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-4">
        <CheckCircle2 className="h-12 w-12 text-teal-500" />
        <p className="text-lg font-medium text-stone-700 dark:text-stone-300">
          {locale === "es"
            ? `${correctCount} de ${totalItems} correctas`
            : `${correctCount} of ${totalItems} correct`}
        </p>
        <Badge className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
          +{exercise.xpReward} XP
        </Badge>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg mx-auto">
      {/* Instruction */}
      <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
        {t(exercise.instruction)}
      </p>

      {/* Progress */}
      <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400" role="status" aria-live="polite">
        <span aria-label={locale === "es" ? `Elemento ${currentIndex + 1} de ${totalItems}` : `Item ${currentIndex + 1} of ${totalItems}`}>
          {currentIndex + 1} / {totalItems}
        </span>
        <div className="flex-1 h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal-500 rounded-full transition-all"
            style={{
              width: `${((currentIndex + (selectedAnswer !== null ? 1 : 0)) / totalItems) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* OKR Display Card */}
      <Card className="border-stone-200 dark:border-stone-700">
        <CardContent className="p-5">
          <pre className="whitespace-pre-wrap text-sm text-stone-800 dark:text-stone-200 font-sans leading-relaxed">
            {t(currentItem.text)}
          </pre>
        </CardContent>
      </Card>

      {/* Judgment Buttons */}
      {selectedAnswer === null ? (
        <div className="flex gap-3" role="group" aria-label={locale === "es" ? "Juzgar este OKR" : "Judge this OKR"}>
          <Button
            variant="outline"
            className="flex-1 h-12 border-green-300 hover:bg-green-50 hover:border-green-400 dark:border-green-800 dark:hover:bg-green-950"
            onClick={() => handleJudge(true)}
            aria-label={locale === "es" ? "Marcar como buen OKR" : "Mark as good OKR"}
          >
            <ThumbsUp className="h-5 w-5 mr-2 text-green-600" aria-hidden="true" />
            <span className="text-green-700 dark:text-green-400 font-medium">
              {locale === "es" ? "Buen OKR" : "Good OKR"}
            </span>
          </Button>
          <Button
            variant="outline"
            className="flex-1 h-12 border-red-300 hover:bg-red-50 hover:border-red-400 dark:border-red-800 dark:hover:bg-red-950"
            onClick={() => handleJudge(false)}
            aria-label={locale === "es" ? "Marcar como necesita trabajo" : "Mark as needs work"}
          >
            <ThumbsDown className="h-5 w-5 mr-2 text-red-600" aria-hidden="true" />
            <span className="text-red-700 dark:text-red-400 font-medium">
              {locale === "es" ? "Necesita Trabajo" : "Needs Work"}
            </span>
          </Button>
        </div>
      ) : (
        <>
          {/* Feedback */}
          <Card
            role="alert"
            aria-live="assertive"
            className={`border-2 ${
              isCorrect
                ? "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950"
                : "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                )}
                <div>
                  <p
                    className={`text-sm font-medium mb-1 ${
                      isCorrect
                        ? "text-green-800 dark:text-green-300"
                        : "text-red-800 dark:text-red-300"
                    }`}
                  >
                    {isCorrect
                      ? locale === "es"
                        ? "¡Correcto!"
                        : "Correct!"
                      : locale === "es"
                        ? "No del todo"
                        : "Not quite"}
                  </p>
                  <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                    {t(currentItem.explanation)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next button */}
          <Button
            onClick={handleNext}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            {isLastItem
              ? locale === "es"
                ? "Ver Resultados"
                : "See Results"
              : locale === "es"
                ? "Siguiente"
                : "Next"}
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </>
      )}
    </div>
  );
}
