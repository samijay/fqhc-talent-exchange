"use client";

import { useState, useCallback } from "react";
import { useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Target,
  TrendingUp,
} from "lucide-react";
import type { ScoringSimExercise as ScoringSimData } from "@/lib/okr-course-modules";

interface ScoringSimulatorProps {
  exercise: ScoringSimData;
  onComplete: (score: number) => void;
}

export function ScoringSimulator({
  exercise,
  onComplete,
}: ScoringSimulatorProps) {
  const locale = useLocale();
  const t = (obj: { en: string; es: string }) =>
    locale === "es" ? obj.es : obj.en;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userScore, setUserScore] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<
    { userScore: number; correctScore: number; diff: number }[]
  >([]);
  const [completed, setCompleted] = useState(false);

  const scenarios = exercise.scenarios;
  const currentScenario = scenarios[currentIndex];
  const totalScenarios = scenarios.length;
  const isLastScenario = currentIndex === totalScenarios - 1;

  const handleSubmit = useCallback(() => {
    const parsed = parseFloat(userScore);
    if (isNaN(parsed) || parsed < 0 || parsed > 1) return;
    setSubmitted(true);
    setResults((prev) => [
      ...prev,
      {
        userScore: parsed,
        correctScore: currentScenario.correctScore,
        diff: Math.abs(parsed - currentScenario.correctScore),
      },
    ]);
  }, [userScore, currentScenario]);

  const handleNext = useCallback(() => {
    if (isLastScenario) {
      setCompleted(true);
      // Score based on accuracy (how close user scores were to correct)
      const avgDiff =
        results.reduce((sum, r) => sum + r.diff, 0) / results.length;
      // 0 diff = 100 score, 0.5 diff = 0 score
      const finalScore = Math.round(Math.max(0, (1 - avgDiff * 2) * 100));
      onComplete(finalScore);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setUserScore("");
      setSubmitted(false);
    }
  }, [isLastScenario, results, onComplete]);

  const getGradeColor = (score: number): string => {
    if (score >= 0.7) return "text-green-600 dark:text-green-400";
    if (score >= 0.4) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  const getGradeLabel = (score: number): string => {
    if (score >= 0.7)
      return locale === "es" ? "Verde — Entregado" : "Green — Delivered";
    if (score >= 0.4)
      return locale === "es" ? "Ámbar — Progreso" : "Amber — Progress";
    return locale === "es" ? "Rojo — No entregado" : "Red — Not delivered";
  };

  if (completed) {
    const avgDiff =
      results.reduce((sum, r) => sum + r.diff, 0) / results.length;
    const accuracy = Math.round((1 - avgDiff) * 100);

    return (
      <div className="flex flex-col items-center justify-center py-8 gap-4">
        <Target className="h-12 w-12 text-teal-500" />
        <p className="text-lg font-medium text-stone-700 dark:text-stone-300">
          {locale === "es"
            ? `Precisión de puntuación: ${accuracy}%`
            : `Scoring accuracy: ${accuracy}%`}
        </p>
        <div className="flex flex-col gap-1 text-sm text-stone-500 dark:text-stone-500">
          {results.map((r, i) => (
            <p key={i}>
              {locale === "es" ? "Escenario" : "Scenario"} {i + 1}:{" "}
              {locale === "es" ? "Tu" : "Your"} {r.userScore.toFixed(2)} vs{" "}
              {locale === "es" ? "Correcto" : "Correct"}{" "}
              {r.correctScore.toFixed(2)}
            </p>
          ))}
        </div>
        <Badge className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
          +{exercise.xpReward} XP
        </Badge>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg mx-auto">
      {/* Instruction */}
      <p className="text-sm font-medium text-stone-600 dark:text-stone-500">
        {t(exercise.instruction)}
      </p>

      {/* Progress */}
      <div className="text-sm text-stone-500 dark:text-stone-500">
        {locale === "es" ? "Escenario" : "Scenario"} {currentIndex + 1} /{" "}
        {totalScenarios}
      </div>

      {/* Scenario card */}
      <Card className="border-stone-200 dark:border-stone-700">
        <CardContent className="p-5 space-y-4">
          <div>
            <p className="text-sm font-medium text-stone-500 dark:text-stone-500 mb-1">
              {locale === "es" ? "Resultado Clave:" : "Key Result:"}
            </p>
            <p className="text-base text-stone-800 dark:text-stone-200 font-medium">
              {t(currentScenario.keyResult)}
            </p>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 p-3 rounded-lg bg-stone-50 dark:bg-stone-800">
              <p className="text-xs text-stone-500 dark:text-stone-500 mb-1">
                {locale === "es" ? "Meta" : "Target"}
              </p>
              <p className="text-lg font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1">
                <Target className="h-4 w-4 text-teal-500" />
                {currentScenario.target}
              </p>
            </div>
            <div className="flex-1 p-3 rounded-lg bg-stone-50 dark:bg-stone-800">
              <p className="text-xs text-stone-500 dark:text-stone-500 mb-1">
                {locale === "es" ? "Resultado Real" : "Actual Result"}
              </p>
              <p className="text-lg font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                {currentScenario.actual}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Score input */}
      {!submitted ? (
        <div className="space-y-3">
          <label htmlFor="okr-score-input" className="text-sm font-medium text-stone-700 dark:text-stone-300">
            {locale === "es"
              ? "Tu puntaje OKR (0.0 - 1.0):"
              : "Your OKR score (0.0 - 1.0):"}
          </label>
          <div className="flex gap-2">
            <input
              id="okr-score-input"
              type="number"
              min="0"
              max="1"
              step="0.05"
              value={userScore}
              onChange={(e) => setUserScore(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              className="flex-1 h-12 px-4 text-lg font-mono rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              placeholder="0.00"
              aria-describedby="score-range-hint"
            />
            <Button
              onClick={handleSubmit}
              disabled={
                !userScore ||
                isNaN(parseFloat(userScore)) ||
                parseFloat(userScore) < 0 ||
                parseFloat(userScore) > 1
              }
              className="h-12 bg-teal-600 hover:bg-teal-700 text-white"
            >
              {locale === "es" ? "Puntuar" : "Score"}
            </Button>
          </div>

          {/* Quick reference */}
          <div id="score-range-hint" className="flex gap-2 text-xs text-stone-500 dark:text-stone-500">
            <span className="text-green-600">0.7-1.0 Green</span>
            <span aria-hidden="true">•</span>
            <span className="text-amber-600">0.4-0.6 Amber</span>
            <span aria-hidden="true">•</span>
            <span className="text-red-600">0.0-0.3 Red</span>
          </div>
        </div>
      ) : (
        <>
          {/* Result comparison */}
          <Card role="alert" aria-live="polite" className="border-2 border-teal-200 bg-teal-50/50 dark:border-teal-800 dark:bg-teal-950/50">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-500 dark:text-stone-500">
                    {locale === "es" ? "Tu puntaje" : "Your score"}
                  </p>
                  <p
                    className={`text-2xl font-bold ${getGradeColor(parseFloat(userScore))}`}
                  >
                    {parseFloat(userScore).toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-stone-500 dark:text-stone-500">
                    {locale === "es" ? "Puntaje correcto" : "Correct score"}
                  </p>
                  <p
                    className={`text-2xl font-bold ${getGradeColor(currentScenario.correctScore)}`}
                  >
                    {currentScenario.correctScore.toFixed(2)}
                  </p>
                </div>
              </div>

              <p
                className={`text-sm font-medium ${getGradeColor(currentScenario.correctScore)}`}
              >
                {getGradeLabel(currentScenario.correctScore)}
              </p>

              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                {t(currentScenario.explanation)}
              </p>
            </CardContent>
          </Card>

          <Button
            onClick={handleNext}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            {isLastScenario
              ? locale === "es"
                ? "Ver Resultados"
                : "See Results"
              : locale === "es"
                ? "Siguiente Escenario"
                : "Next Scenario"}
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </>
      )}
    </div>
  );
}
