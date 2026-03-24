"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Target,
  BarChart3,
  CheckCircle2,
  Lock,
  Play,
  ArrowRight,
} from "lucide-react";
import { useSprintContext } from "./SprintProvider";
import { TeamAlignmentSession } from "./TeamAlignmentSession";
import { ObjectiveDraftingSession } from "./ObjectiveDraftingSession";
import { KeyResultsWorkshop } from "./KeyResultsWorkshop";
import { ReadinessReview } from "./ReadinessReview";
import { SPRINT_SESSION_TEMPLATES } from "@/lib/okr-team-sprint-engine";

export function TeamWorkspace() {
  const locale = useLocale();
  const isEs = locale === "es";
  const t = (obj: { en: string; es: string }) =>
    locale === "es" ? obj.es : obj.en;

  const { sessions, objectives, startSession } = useSprintContext();
  const [activeSessionIndex, setActiveSessionIndex] = useState<number | null>(
    null
  );

  const activeSession =
    activeSessionIndex !== null ? sessions[activeSessionIndex] : null;

  const handleStartSession = (index: number) => {
    startSession(index + 1); // sessions are 1-indexed
    setActiveSessionIndex(index);
  };

  const handleSessionComplete = () => {
    setActiveSessionIndex(null);
  };

  // Render active session
  if (activeSession) {
    switch (activeSession.sessionType) {
      case "alignment":
        return <TeamAlignmentSession onComplete={handleSessionComplete} />;
      case "drafting":
        return <ObjectiveDraftingSession onComplete={handleSessionComplete} />;
      case "workshop":
        return <KeyResultsWorkshop onComplete={handleSessionComplete} />;
      case "readiness":
        return <ReadinessReview onComplete={handleSessionComplete} />;
    }
  }

  // Session list view
  const sessionIcons = [Users, Target, BarChart3, CheckCircle2];

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100">
          {isEs ? "Sprint de OKR en Equipo" : "Team OKR Sprint"}
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-500">
          {isEs
            ? `${objectives.length} objetivos redactados por el equipo`
            : `${objectives.length} objectives drafted by team`}
        </p>
      </div>

      {/* Session cards */}
      <div className="space-y-3">
        {sessions.map((session, index) => {
          const template = SPRINT_SESSION_TEMPLATES[index];
          const isCompleted = !!session.completedAt;
          const isStarted = !!session.startedAt;
          const prevCompleted =
            index === 0 || !!sessions[index - 1]?.completedAt;
          const isLocked = !prevCompleted;
          const Icon = sessionIcons[index] || Target;

          return (
            <Card
              key={session.sessionNumber}
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
                  {/* Session icon */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isCompleted
                        ? "bg-green-100 dark:bg-green-900"
                        : isLocked
                          ? "bg-stone-100 dark:bg-stone-800"
                          : "bg-teal-100 dark:bg-teal-900"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : isLocked ? (
                      <Lock className="h-5 w-5 text-stone-500 dark:text-stone-500" />
                    ) : (
                      <Icon className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant="outline"
                        className="text-xs shrink-0"
                      >
                        {isEs ? "Sesión" : "Session"}{" "}
                        {session.sessionNumber}
                      </Badge>
                      <span className="text-xs text-stone-500 dark:text-stone-500">
                        ~{template?.estimatedMinutes || 25}min
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200">
                      {template ? t(template.title) : `Session ${session.sessionNumber}`}
                    </h3>
                    <p className="text-sm text-stone-500 dark:text-stone-500 mt-1 line-clamp-2">
                      {template ? t(template.description) : ""}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="shrink-0">
                    <Button
                      size="sm"
                      variant={isCompleted ? "outline" : "default"}
                      disabled={isLocked}
                      onClick={() => handleStartSession(index)}
                      className={
                        !isCompleted && !isLocked
                          ? "bg-teal-600 hover:bg-teal-700 text-white"
                          : ""
                      }
                    >
                      {isCompleted ? (
                        <>
                          {isEs ? "Revisar" : "Review"}
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-1" />
                          {isStarted
                            ? isEs
                              ? "Continuar"
                              : "Continue"
                            : isEs
                              ? "Comenzar"
                              : "Start"}
                        </>
                      )}
                    </Button>
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
