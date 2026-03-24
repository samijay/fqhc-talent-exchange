"use client";

import { useState, useCallback } from "react";
import { useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  BarChart3,
  Plus,
  ArrowRight,
  Trash2,
  Target,
  AlertCircle,
} from "lucide-react";
import { OKR_DOMAINS } from "@/lib/fqhc-okr-templates";
import { useSprintContext } from "./SprintProvider";

interface KeyResultsWorkshopProps {
  onComplete: () => void;
}

export function KeyResultsWorkshop({
  onComplete,
}: KeyResultsWorkshopProps) {
  const locale = useLocale();
  const isEs = locale === "es";

  const {
    objectives,
    currentUserId,
    addKeyResult,
    deleteKeyResult,
    completeSession,
  } = useSprintContext();

  const [newKRText, setNewKRText] = useState<Record<string, string>>({});

  const myObjectives = objectives.filter(
    (o) => o.ownerId === currentUserId
  );

  const handleAddKR = useCallback(
    (objectiveId: string) => {
      const text = newKRText[objectiveId];
      if (!text?.trim()) return;
      addKeyResult(objectiveId, text.trim());
      setNewKRText((prev) => ({ ...prev, [objectiveId]: "" }));
    },
    [newKRText, addKeyResult]
  );

  const handleComplete = useCallback(() => {
    completeSession(3);
    onComplete();
  }, [completeSession, onComplete]);

  const getMeasurabilityColor = (score: number) => {
    if (score >= 70) return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900";
    if (score >= 40) return "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900";
    return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900";
  };

  const getMeasurabilityLabel = (score: number) => {
    if (score >= 70) return isEs ? "Medible" : "Measurable";
    if (score >= 40) return isEs ? "Parcial" : "Partial";
    return isEs ? "Necesita Métricas" : "Needs Metrics";
  };

  // SMART checklist for each KR
  const getSmartChecklist = (text: string) => ({
    specific: text.length > 20,
    measurable: /\d/.test(text),
    hasBaseline: /from\s+[\d$%]/i.test(text),
    hasTarget: /to\s+[\d$%]/i.test(text),
    timeBound: /by\s+(Q[1-4]|q[1-4]|20\d\d|end)/i.test(text),
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <BarChart3 className="h-8 w-8 text-teal-500 mx-auto" />
        <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100">
          {isEs
            ? "Taller de Resultados Clave"
            : "Key Results Workshop"}
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-500">
          {isEs
            ? "Agrega 2-3 Resultados Clave medibles a cada objetivo. Usa el formato: [Métrica] de [base] a [meta] para [fecha]"
            : "Add 2-3 measurable Key Results to each objective. Use the format: [Metric] from [baseline] to [target] by [date]"}
        </p>
      </div>

      {myObjectives.map((obj) => {
        const domainMeta = OKR_DOMAINS.find((d) => d.id === obj.domain);

        return (
          <Card
            key={obj.id}
            className="border-stone-200 dark:border-stone-700"
          >
            <CardContent className="p-5">
              {/* Objective header */}
              <div className="flex items-start gap-3 mb-4">
                <Target className="h-5 w-5 text-teal-500 mt-0.5 shrink-0" />
                <div>
                  {domainMeta && (
                    <Badge variant="outline" className="text-xs mb-1">
                      {isEs ? domainMeta.es : domainMeta.en}
                    </Badge>
                  )}
                  <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
                    {obj.objectiveText}
                  </p>
                </div>
              </div>

              {/* Existing Key Results */}
              <div className="space-y-3 mb-4">
                {obj.keyResults.map((kr, i) => {
                  const smart = getSmartChecklist(kr.text);

                  return (
                    <div
                      key={kr.id}
                      className="pl-4 border-l-2 border-teal-200 dark:border-teal-700"
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-bold text-stone-500 mt-1 shrink-0">
                          KR{i + 1}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm text-stone-700 dark:text-stone-300">
                            {kr.text}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <Badge
                              className={`text-xs ${getMeasurabilityColor(kr.measurabilityScore)}`}
                            >
                              {kr.measurabilityScore}% —{" "}
                              {getMeasurabilityLabel(kr.measurabilityScore)}
                            </Badge>
                          </div>
                          {/* SMART mini-checklist */}
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {[
                              {
                                key: "measurable",
                                label: isEs ? "Número" : "Number",
                                ok: smart.measurable,
                              },
                              {
                                key: "hasBaseline",
                                label: isEs ? "Base" : "Baseline",
                                ok: smart.hasBaseline,
                              },
                              {
                                key: "hasTarget",
                                label: isEs ? "Meta" : "Target",
                                ok: smart.hasTarget,
                              },
                              {
                                key: "timeBound",
                                label: isEs ? "Plazo" : "Deadline",
                                ok: smart.timeBound,
                              },
                            ].map((check) => (
                              <span
                                key={check.key}
                                className={`text-xs px-1.5 py-0.5 rounded ${
                                  check.ok
                                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                    : "bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-500"
                                }`}
                              >
                                {check.ok ? "✓" : "○"} {check.label}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            deleteKeyResult(obj.id, kr.id)
                          }
                          className="text-stone-500 hover:text-red-500 shrink-0"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add new KR */}
              {obj.keyResults.length < 5 && (
                <div className="flex gap-2">
                  <Textarea
                    value={newKRText[obj.id] || ""}
                    onChange={(e) =>
                      setNewKRText((prev) => ({
                        ...prev,
                        [obj.id]: e.target.value,
                      }))
                    }
                    placeholder={
                      isEs
                        ? "Ej: Reducir tasa de inasistencia del 22% al 12% para Q3"
                        : "E.g.: Reduce no-show rate from 22% to 12% by Q3"
                    }
                    className="min-h-[60px] flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleAddKR(obj.id);
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddKR(obj.id)}
                    disabled={!newKRText[obj.id]?.trim()}
                    className="shrink-0 self-end"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Warning if too few KRs */}
              {obj.keyResults.length < 2 && (
                <div className="flex items-center gap-2 mt-3 text-xs text-amber-600 dark:text-amber-400">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {isEs
                    ? "Agrega al menos 2 Resultados Clave"
                    : "Add at least 2 Key Results"}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}

      {/* Complete session */}
      <Button
        onClick={handleComplete}
        disabled={myObjectives.some((o) => o.keyResults.length < 2)}
        className="bg-teal-600 hover:bg-teal-700 text-white"
      >
        {isEs
          ? "Continuar a Revisión de Preparación"
          : "Continue to Readiness Review"}
        <ArrowRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}
