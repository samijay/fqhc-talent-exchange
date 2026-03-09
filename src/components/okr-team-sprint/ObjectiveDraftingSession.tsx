"use client";

import { useState, useCallback } from "react";
import { useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Pencil,
  Plus,
  ArrowRight,
  MessageSquare,
  Trash2,
  Target,
  CheckCircle2,
} from "lucide-react";
import { OKR_DOMAINS, type OKRDomain } from "@/lib/fqhc-okr-templates";
import { useSprintContext } from "./SprintProvider";

interface ObjectiveDraftingSessionProps {
  onComplete: () => void;
}

export function ObjectiveDraftingSession({
  onComplete,
}: ObjectiveDraftingSessionProps) {
  const locale = useLocale();
  const isEs = locale === "es";
  const t = (obj: { en: string; es: string }) =>
    locale === "es" ? obj.es : obj.en;

  const {
    objectives,
    currentUserId,
    addObjective,
    updateObjective,
    deleteObjective,
    addFeedback,
    completeSession,
  } = useSprintContext();

  const [showNewForm, setShowNewForm] = useState(false);
  const [newDomain, setNewDomain] = useState<OKRDomain | "">("");
  const [newText, setNewText] = useState("");
  const [feedbackText, setFeedbackText] = useState<Record<string, string>>({});

  const myObjectives = objectives.filter(
    (o) => o.ownerId === currentUserId
  );
  const othersObjectives = objectives.filter(
    (o) => o.ownerId !== currentUserId
  );

  const handleAdd = useCallback(() => {
    if (!newDomain || newText.trim().length < 10) return;
    addObjective(newDomain as OKRDomain, newText.trim());
    setNewDomain("");
    setNewText("");
    setShowNewForm(false);
  }, [newDomain, newText, addObjective]);

  const handleFeedback = useCallback(
    (objectiveId: string) => {
      const text = feedbackText[objectiveId];
      if (!text?.trim()) return;
      addFeedback(objectiveId, text.trim());
      setFeedbackText((prev) => ({ ...prev, [objectiveId]: "" }));
    },
    [feedbackText, addFeedback]
  );

  const handleComplete = useCallback(() => {
    completeSession(2);
    onComplete();
  }, [completeSession, onComplete]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <Pencil className="h-8 w-8 text-teal-500 mx-auto" />
        <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100">
          {isEs ? "Redacción de Objetivos" : "Objective Drafting"}
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {isEs
            ? "Redacta objetivos para tu área de responsabilidad. Tu equipo puede ver y comentar."
            : "Draft objectives for your area of responsibility. Your team can view and comment."}
        </p>
      </div>

      {/* My Objectives */}
      <div>
        <h3 className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">
          {isEs ? "Mis Objetivos" : "My Objectives"}{" "}
          <Badge variant="outline" className="ml-1">
            {myObjectives.length}
          </Badge>
        </h3>

        {myObjectives.map((obj) => {
          const domainMeta = OKR_DOMAINS.find((d) => d.id === obj.domain);
          return (
            <Card
              key={obj.id}
              className="mb-3 border-stone-200 dark:border-stone-700"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-teal-500 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    {domainMeta && (
                      <Badge
                        variant="outline"
                        className="mb-2 text-xs"
                      >
                        {isEs ? domainMeta.es : domainMeta.en}
                      </Badge>
                    )}
                    <p className="text-sm text-stone-800 dark:text-stone-200">
                      {obj.objectiveText}
                    </p>
                    {obj.feedback.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {obj.feedback.map((fb, i) => (
                          <div
                            key={i}
                            className="text-xs text-stone-500 dark:text-stone-400 pl-3 border-l-2 border-teal-200 dark:border-teal-700"
                          >
                            <span className="font-medium">
                              {fb.authorName}:
                            </span>{" "}
                            {fb.comment}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteObjective(obj.id)}
                    className="text-stone-400 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* New objective form */}
        {showNewForm ? (
          <Card className="border-teal-200 dark:border-teal-700">
            <CardContent className="p-4 space-y-3">
              <div>
                <label className="text-xs font-medium text-stone-600 dark:text-stone-400 mb-1 block">
                  {isEs ? "Dominio" : "Domain"}
                </label>
                <select
                  value={newDomain}
                  onChange={(e) =>
                    setNewDomain(e.target.value as OKRDomain)
                  }
                  className="w-full h-9 px-3 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-sm text-stone-800 dark:text-stone-200"
                >
                  <option value="">
                    {isEs ? "Seleccionar dominio..." : "Select domain..."}
                  </option>
                  {OKR_DOMAINS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {isEs ? d.es : d.en}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-stone-600 dark:text-stone-400 mb-1 block">
                  {isEs ? "Objetivo" : "Objective"}
                </label>
                <Textarea
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder={
                    isEs
                      ? "Un objetivo aspiracional y memorable para tu área..."
                      : "An aspirational, memorable objective for your area..."
                  }
                  className="min-h-[80px]"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleAdd}
                  disabled={!newDomain || newText.trim().length < 10}
                  size="sm"
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  {isEs ? "Agregar" : "Add"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNewForm(false)}
                >
                  {isEs ? "Cancelar" : "Cancel"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Button
            variant="outline"
            onClick={() => setShowNewForm(true)}
            className="w-full border-dashed"
          >
            <Plus className="h-4 w-4 mr-1" />
            {isEs ? "Agregar Objetivo" : "Add Objective"}
          </Button>
        )}
      </div>

      {/* Team Objectives (others) */}
      {othersObjectives.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">
            {isEs ? "Objetivos del Equipo" : "Team Objectives"}{" "}
            <Badge variant="outline" className="ml-1">
              {othersObjectives.length}
            </Badge>
          </h3>

          {othersObjectives.map((obj) => {
            const domainMeta = OKR_DOMAINS.find(
              (d) => d.id === obj.domain
            );
            return (
              <Card
                key={obj.id}
                className="mb-3 border-stone-200 dark:border-stone-700"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
                          {obj.ownerName}
                        </span>
                        {domainMeta && (
                          <Badge
                            variant="outline"
                            className="text-xs"
                          >
                            {isEs ? domainMeta.es : domainMeta.en}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-stone-800 dark:text-stone-200">
                        {obj.objectiveText}
                      </p>

                      {/* Existing feedback */}
                      {obj.feedback.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {obj.feedback.map((fb, i) => (
                            <div
                              key={i}
                              className="text-xs text-stone-500 dark:text-stone-400 pl-3 border-l-2 border-blue-200 dark:border-blue-700"
                            >
                              <span className="font-medium">
                                {fb.authorName}:
                              </span>{" "}
                              {fb.comment}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add feedback */}
                      <div className="flex gap-2 mt-2">
                        <input
                          type="text"
                          value={feedbackText[obj.id] || ""}
                          onChange={(e) =>
                            setFeedbackText((prev) => ({
                              ...prev,
                              [obj.id]: e.target.value,
                            }))
                          }
                          placeholder={
                            isEs ? "Agregar comentario..." : "Add comment..."
                          }
                          className="flex-1 h-8 px-3 text-xs rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300"
                          onKeyDown={(e) => {
                            if (e.key === "Enter")
                              handleFeedback(obj.id);
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFeedback(obj.id)}
                          disabled={!feedbackText[obj.id]?.trim()}
                          className="h-8 px-2"
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Complete session */}
      <Button
        onClick={handleComplete}
        disabled={myObjectives.length === 0}
        className="bg-teal-600 hover:bg-teal-700 text-white"
      >
        {isEs
          ? "Continuar a Taller de Resultados Clave"
          : "Continue to Key Results Workshop"}
        <ArrowRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}
