"use client";

import { useState, useCallback } from "react";
import { useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Vote,
  Target,
  ArrowRight,
} from "lucide-react";
import { FQHC_STRATEGIC_PRIORITIES } from "@/lib/okr-team-sprint-engine";
import { OKR_DOMAINS } from "@/lib/fqhc-okr-templates";
import { useSprintContext } from "./SprintProvider";

interface TeamAlignmentSessionProps {
  onComplete: () => void;
}

export function TeamAlignmentSession({
  onComplete,
}: TeamAlignmentSessionProps) {
  const locale = useLocale();
  const isEs = locale === "es";
  const t = (obj: { en: string; es: string }) =>
    locale === "es" ? obj.es : obj.en;

  const { submitVotes, votes, currentUserId, completeSession } =
    useSprintContext();

  const [selectedPriorities, setSelectedPriorities] = useState<Set<string>>(
    () => new Set(votes[currentUserId] || [])
  );
  const [submitted, setSubmitted] = useState(
    () => !!votes[currentUserId]
  );

  const MAX_VOTES = 5;

  const togglePriority = useCallback(
    (id: string) => {
      if (submitted) return;
      setSelectedPriorities((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else if (next.size < MAX_VOTES) {
          next.add(id);
        }
        return next;
      });
    },
    [submitted]
  );

  const handleSubmitVotes = useCallback(() => {
    submitVotes(Array.from(selectedPriorities));
    setSubmitted(true);
  }, [selectedPriorities, submitVotes]);

  const handleComplete = useCallback(() => {
    completeSession(1);
    onComplete();
  }, [completeSession, onComplete]);

  // Group priorities by domain
  const prioritiesByDomain = OKR_DOMAINS.map((domain) => ({
    domain,
    priorities: FQHC_STRATEGIC_PRIORITIES.filter(
      (p) => p.domain === domain.id
    ),
  }));

  // Count votes across all members
  const voteCounts: Record<string, number> = {};
  if (submitted) {
    for (const memberVotes of Object.values(votes)) {
      for (const priorityId of memberVotes) {
        voteCounts[priorityId] = (voteCounts[priorityId] || 0) + 1;
      }
    }
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <Vote className="h-8 w-8 text-teal-500 mx-auto" />
        <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100">
          {isEs
            ? "Alineación del Equipo: Prioridades Estratégicas"
            : "Team Alignment: Strategic Priorities"}
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {isEs
            ? `Selecciona hasta ${MAX_VOTES} prioridades que tu FQHC debería enfocarse este trimestre`
            : `Select up to ${MAX_VOTES} priorities your FQHC should focus on this quarter`}
        </p>
      </div>

      {!submitted && (
        <Badge
          variant="outline"
          className="mx-auto text-stone-500 dark:text-stone-400"
        >
          {selectedPriorities.size} / {MAX_VOTES}{" "}
          {isEs ? "seleccionadas" : "selected"}
        </Badge>
      )}

      {/* Priorities by domain */}
      {prioritiesByDomain.map(({ domain, priorities }) => (
        <div key={domain.id}>
          <h3 className="text-sm font-semibold text-stone-600 dark:text-stone-400 mb-2 flex items-center gap-2">
            <Target className="h-4 w-4 text-teal-500" />
            {isEs ? domain.es : domain.en}
          </h3>
          <div className="space-y-2">
            {priorities.map((priority) => {
              const isSelected = selectedPriorities.has(priority.id);
              const voteCount = voteCounts[priority.id] || 0;

              return (
                <Card
                  key={priority.id}
                  className={`cursor-pointer transition-all ${
                    isSelected
                      ? "border-teal-400 bg-teal-50 dark:border-teal-600 dark:bg-teal-950"
                      : "border-stone-200 dark:border-stone-700 hover:border-teal-300 dark:hover:border-teal-700"
                  }`}
                  onClick={() => togglePriority(priority.id)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); togglePriority(priority.id); } }}
                  role="checkbox"
                  aria-checked={isSelected}
                  aria-label={t(priority.title)}
                  tabIndex={submitted ? -1 : 0}
                >
                  <CardContent className="p-3 flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-md border-2 shrink-0 mt-0.5 flex items-center justify-center ${
                        isSelected
                          ? "border-teal-500 bg-teal-500"
                          : "border-stone-300 dark:border-stone-600"
                      }`}
                    >
                      {isSelected && (
                        <CheckCircle2 className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
                        {t(priority.title)}
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                        {t(priority.description)}
                      </p>
                    </div>
                    {submitted && voteCount > 0 && (
                      <Badge
                        variant="outline"
                        className="shrink-0 text-teal-600 border-teal-300 dark:text-teal-400 dark:border-teal-700"
                      >
                        {voteCount} {voteCount === 1 ? "vote" : "votes"}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      {/* Submit / Complete */}
      {!submitted ? (
        <Button
          onClick={handleSubmitVotes}
          disabled={selectedPriorities.size === 0}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          {isEs ? "Enviar Mis Votos" : "Submit My Votes"}
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      ) : (
        <div className="space-y-3">
          <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
            <CardContent className="p-4 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              <p className="text-sm text-green-800 dark:text-green-200">
                {isEs
                  ? "¡Tus votos fueron enviados! Revisa los resultados del equipo arriba."
                  : "Your votes are submitted! Review team results above."}
              </p>
            </CardContent>
          </Card>
          <Button
            onClick={handleComplete}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white"
          >
            {isEs ? "Continuar a Sesión 2" : "Continue to Session 2"}
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
