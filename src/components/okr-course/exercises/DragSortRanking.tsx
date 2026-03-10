"use client";

import { useState, useCallback } from "react";
import { useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  Award,
} from "lucide-react";
import type { DragSortExercise as DragSortData } from "@/lib/okr-course-modules";

interface DragSortRankingProps {
  exercise: DragSortData;
  onComplete: (score: number) => void;
}

export function DragSortRanking({
  exercise,
  onComplete,
}: DragSortRankingProps) {
  const locale = useLocale();
  const t = (obj: { en: string; es: string }) =>
    locale === "es" ? obj.es : obj.en;

  // Start with shuffled order
  const [order, setOrder] = useState<number[]>(() => {
    const indices = exercise.items.map((_, i) => i);
    // Simple Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  });
  const [submitted, setSubmitted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const moveUp = useCallback(
    (position: number) => {
      if (position === 0 || submitted) return;
      setOrder((prev) => {
        const next = [...prev];
        [next[position], next[position - 1]] = [
          next[position - 1],
          next[position],
        ];
        return next;
      });
    },
    [submitted]
  );

  const moveDown = useCallback(
    (position: number) => {
      if (position === order.length - 1 || submitted) return;
      setOrder((prev) => {
        const next = [...prev];
        [next[position], next[position + 1]] = [
          next[position + 1],
          next[position],
        ];
        return next;
      });
    },
    [order.length, submitted]
  );

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
  }, []);

  const handleComplete = useCallback(() => {
    setCompleted(true);
    // Score: how many items are in the correct position
    let correctPositions = 0;
    for (let i = 0; i < order.length; i++) {
      const itemIndex = order[i];
      if (exercise.items[itemIndex].correctPosition === i + 1) {
        correctPositions++;
      }
    }
    const score = Math.round((correctPositions / order.length) * 100);
    onComplete(score);
  }, [order, exercise.items, onComplete]);

  // Check correctness for each position
  const getPositionStatus = (position: number): "correct" | "incorrect" | null => {
    if (!submitted) return null;
    const itemIndex = order[position];
    return exercise.items[itemIndex].correctPosition === position + 1
      ? "correct"
      : "incorrect";
  };

  if (completed) {
    let correctCount = 0;
    for (let i = 0; i < order.length; i++) {
      const itemIndex = order[i];
      if (exercise.items[itemIndex].correctPosition === i + 1) {
        correctCount++;
      }
    }

    return (
      <div className="flex flex-col items-center justify-center py-8 gap-4">
        <Award className="h-12 w-12 text-teal-500" />
        <p className="text-lg font-medium text-stone-700 dark:text-stone-300">
          {locale === "es"
            ? `${correctCount} de ${order.length} en posición correcta`
            : `${correctCount} of ${order.length} in correct position`}
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
      <p className="text-xs text-stone-400 dark:text-stone-500">
        {locale === "es"
          ? "Usa las flechas para reordenar los elementos"
          : "Use the arrows to reorder items"}
      </p>

      {/* Sortable list */}
      <div className="flex flex-col gap-2">
        {order.map((itemIndex, position) => {
          const item = exercise.items[itemIndex];
          const status = getPositionStatus(position);

          return (
            <Card
              key={itemIndex}
              className={`transition-all ${
                status === "correct"
                  ? "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950"
                  : status === "incorrect"
                    ? "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950"
                    : "border-stone-200 dark:border-stone-700"
              }`}
            >
              <CardContent className="p-3 flex items-center gap-3">
                {/* Position number */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                    status === "correct"
                      ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200"
                      : status === "incorrect"
                        ? "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200"
                        : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400"
                  }`}
                >
                  {position + 1}
                </div>

                {/* Item text */}
                <p className="flex-1 text-sm text-stone-700 dark:text-stone-300 leading-snug">
                  {t(item.text)}
                </p>

                {/* Move buttons — touch-friendly sizing for mobile */}
                {!submitted && (
                  <div className="flex flex-col gap-1 shrink-0">
                    <button
                      onClick={() => moveUp(position)}
                      disabled={position === 0}
                      className="p-2 sm:p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-30 transition-colors active:bg-stone-200 dark:active:bg-stone-700"
                      aria-label="Move up"
                    >
                      <ArrowUp className="h-5 w-5 sm:h-4 sm:w-4 text-stone-500" />
                    </button>
                    <button
                      onClick={() => moveDown(position)}
                      disabled={position === order.length - 1}
                      className="p-2 sm:p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-30 transition-colors active:bg-stone-200 dark:active:bg-stone-700"
                      aria-label="Move down"
                    >
                      <ArrowDown className="h-5 w-5 sm:h-4 sm:w-4 text-stone-500" />
                    </button>
                  </div>
                )}

                {/* Status icon */}
                {status === "correct" && (
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0" />
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action button */}
      {!submitted ? (
        <Button
          onClick={handleSubmit}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          {locale === "es" ? "Verificar Orden" : "Check Order"}
        </Button>
      ) : (
        <Button
          onClick={handleComplete}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          <CheckCircle2 className="h-4 w-4 mr-1" />
          {locale === "es" ? "Continuar" : "Continue"}
        </Button>
      )}
    </div>
  );
}
