"use client";

import { useState, useCallback } from "react";
import { useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle2 } from "lucide-react";
import type { ConceptCardExercise as ConceptCardData } from "@/lib/okr-course-modules";

interface ConceptCardProps {
  exercise: ConceptCardData;
  onComplete: (score: number) => void;
}

export function ConceptCard({ exercise, onComplete }: ConceptCardProps) {
  const locale = useLocale();
  const t = (obj: { en: string; es: string }) =>
    locale === "es" ? obj.es : obj.en;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewedCards, setViewedCards] = useState<Set<number>>(new Set());
  const [completed, setCompleted] = useState(false);

  const cards = exercise.cards;
  const currentCard = cards[currentIndex];
  const totalCards = cards.length;

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
    setViewedCards((prev) => new Set(prev).add(currentIndex));
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    if (currentIndex < totalCards - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, totalCards]);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const handleComplete = useCallback(() => {
    setCompleted(true);
    // Score based on how many cards were flipped (viewed both sides)
    const score = Math.round((viewedCards.size / totalCards) * 100);
    onComplete(score);
  }, [viewedCards, totalCards, onComplete]);

  const allViewed = viewedCards.size === totalCards;

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-4">
        <CheckCircle2 className="h-12 w-12 text-teal-500" />
        <p className="text-lg font-medium text-stone-700 dark:text-stone-300">
          {locale === "es"
            ? `¡${viewedCards.size} de ${totalCards} tarjetas revisadas!`
            : `${viewedCards.size} of ${totalCards} cards reviewed!`}
        </p>
        <Badge className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
          +{exercise.xpReward} XP
        </Badge>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-lg mx-auto">
      {/* Progress indicator */}
      <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
        <span>
          {currentIndex + 1} / {totalCards}
        </span>
        <div className="flex gap-1">
          {cards.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === currentIndex
                  ? "bg-teal-500"
                  : viewedCards.has(i)
                    ? "bg-teal-300 dark:bg-teal-700"
                    : "bg-stone-200 dark:bg-stone-700"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card */}
      <div
        className="w-full cursor-pointer perspective-1000"
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleFlip();
        }}
        aria-label={
          isFlipped
            ? (locale === "es" ? "Voltear para ver frente" : "Flip to see front")
            : (locale === "es" ? "Toca para voltear" : "Tap to flip")
        }
      >
        <Card
          className={`min-h-[240px] transition-all duration-500 ${
            isFlipped
              ? "bg-teal-50 dark:bg-teal-950 border-teal-200 dark:border-teal-800"
              : "bg-white dark:bg-stone-900 hover:shadow-md"
          }`}
        >
          <CardContent className="flex flex-col items-center justify-center p-6 min-h-[240px] text-center">
            {!isFlipped ? (
              <>
                <h3 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-3">
                  {t(currentCard.front)}
                </h3>
                <p className="text-sm text-stone-400 dark:text-stone-500">
                  {locale === "es" ? "Toca para ver la respuesta" : "Tap to flip"}
                </p>
              </>
            ) : (
              <>
                <p className="text-base text-stone-700 dark:text-stone-300 mb-4 leading-relaxed">
                  {t(currentCard.back)}
                </p>
                {currentCard.fqhcExample && (
                  <div className="w-full mt-2 p-3 rounded-lg bg-teal-100/50 dark:bg-teal-900/50 border border-teal-200 dark:border-teal-800">
                    <p className="text-xs font-medium text-teal-700 dark:text-teal-300 mb-1">
                      {locale === "es" ? "Ejemplo FQHC:" : "FQHC Example:"}
                    </p>
                    <p className="text-sm italic text-teal-800 dark:text-teal-200">
                      {t(currentCard.fqhcExample)}
                    </p>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3 w-full">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label={locale === "es" ? "Anterior" : "Previous"}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {isFlipped && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFlip}
            className="text-stone-500"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            {locale === "es" ? "Voltear" : "Flip"}
          </Button>
        )}

        <div className="flex-1" />

        {currentIndex < totalCards - 1 ? (
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            aria-label={locale === "es" ? "Siguiente" : "Next"}
          >
            {locale === "es" ? "Siguiente" : "Next"}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={handleComplete}
            disabled={!allViewed}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            <CheckCircle2 className="h-4 w-4 mr-1" />
            {locale === "es" ? "Completar" : "Complete"}
          </Button>
        )}
      </div>

      {!allViewed && currentIndex === totalCards - 1 && (
        <p className="text-xs text-stone-400 dark:text-stone-500 text-center">
          {locale === "es"
            ? "Voltea todas las tarjetas para completar"
            : "Flip all cards to complete"}
        </p>
      )}
    </div>
  );
}
