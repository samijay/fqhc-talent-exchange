"use client";

import { useState, useCallback } from "react";
import { useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Loader2,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Target,
  Users,
} from "lucide-react";
import { OKR_DOMAINS, type OKRDomain } from "@/lib/fqhc-okr-templates";
import {
  generateFallbackReadiness,
  type TeamReadinessResponse,
  type TeamReadinessRequest,
} from "@/lib/okr-ai-critique";
import {
  calculateAlignmentScore,
  validateOKRQuality,
} from "@/lib/okr-team-sprint-engine";
import { useSprintContext } from "./SprintProvider";

interface ReadinessReviewProps {
  onComplete: () => void;
}

export function ReadinessReview({ onComplete }: ReadinessReviewProps) {
  const locale = useLocale();
  const isEs = locale === "es";

  const { objectives, completeSession } = useSprintContext();
  const [assessment, setAssessment] =
    useState<TeamReadinessResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const alignmentScore = calculateAlignmentScore(objectives);

  const handleRunAssessment = useCallback(async () => {
    setLoading(true);

    const request: TeamReadinessRequest = {
      sprintId: "current",
      objectives: objectives.map((o) => ({
        id: o.id,
        owner: o.ownerName,
        domain: o.domain,
        text: o.objectiveText,
        keyResults: o.keyResults.map((kr) => ({
          text: kr.text,
          metric: kr.metric,
          target: kr.target,
        })),
      })),
    };

    try {
      const response = await fetch("/api/okr-team-readiness", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        const data = await response.json();
        setAssessment(data);
      } else {
        setAssessment(generateFallbackReadiness(request));
      }
    } catch {
      setAssessment(generateFallbackReadiness(request));
    } finally {
      setLoading(false);
    }
  }, [objectives]);

  const handleComplete = useCallback(() => {
    completeSession(4);
    onComplete();
  }, [completeSession, onComplete]);

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600 dark:text-green-400";
    if (score >= 40) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBg = (score: number) => {
    if (score >= 70) return "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800";
    if (score >= 40) return "bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800";
    return "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800";
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <Award className="h-8 w-8 text-teal-500 mx-auto" />
        <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100">
          {isEs ? "Revisión de Preparación" : "Readiness Review"}
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {isEs
            ? "Revisa el conjunto completo de OKRs de tu equipo y obtén una evaluación de IA"
            : "Review your team's full OKR set and get an AI assessment"}
        </p>
      </div>

      {/* Full OKR display */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-2">
          <Users className="h-4 w-4 text-teal-500" />
          {isEs ? "OKRs del Equipo" : "Team OKRs"}{" "}
          <Badge variant="outline">{objectives.length}</Badge>
        </h3>

        {objectives.map((obj) => {
          const domainMeta = OKR_DOMAINS.find((d) => d.id === obj.domain);
          const validation = validateOKRQuality(obj);

          return (
            <Card
              key={obj.id}
              className={`border ${
                validation.isReady
                  ? "border-green-200 dark:border-green-800"
                  : "border-amber-200 dark:border-amber-800"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-teal-500 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs text-stone-500 dark:text-stone-400">
                        {obj.ownerName}
                      </span>
                      {domainMeta && (
                        <Badge variant="outline" className="text-xs">
                          {isEs ? domainMeta.es : domainMeta.en}
                        </Badge>
                      )}
                      {validation.isReady ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      )}
                    </div>
                    <p className="text-sm font-medium text-stone-800 dark:text-stone-200 mb-2">
                      {obj.objectiveText}
                    </p>
                    {obj.keyResults.map((kr, i) => (
                      <p
                        key={kr.id}
                        className="text-xs text-stone-600 dark:text-stone-400 ml-4 mb-1"
                      >
                        KR{i + 1}: {kr.text}
                      </p>
                    ))}
                    {!validation.isReady && (
                      <div className="mt-2 space-y-1">
                        {validation.issues.map((issue, i) => (
                          <p
                            key={i}
                            className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1"
                          >
                            <AlertTriangle className="h-3 w-3 shrink-0" />
                            {issue}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pre-assessment score */}
      <Card className="border-stone-200 dark:border-stone-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-stone-600 dark:text-stone-400">
              {isEs ? "Puntaje de Alineación del Equipo" : "Team Alignment Score"}
            </span>
            <span
              className={`text-xl font-bold ${getScoreColor(alignmentScore)}`}
            >
              {alignmentScore}/100
            </span>
          </div>
        </CardContent>
      </Card>

      {/* AI Assessment button / results */}
      {!assessment ? (
        <Button
          onClick={handleRunAssessment}
          disabled={loading || objectives.length === 0}
          className="bg-teal-600 hover:bg-teal-700 text-white h-12"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {isEs ? "Evaluando..." : "Assessing..."}
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              {isEs
                ? "Ejecutar Evaluación de IA"
                : "Run AI Assessment"}
            </>
          )}
        </Button>
      ) : (
        <div className="space-y-4">
          {/* Scores grid */}
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                label: isEs ? "Alineación" : "Alignment",
                score: assessment.alignmentScore,
              },
              {
                label: isEs ? "Cobertura" : "Coverage",
                score: assessment.coverageScore,
              },
              {
                label: isEs ? "Calidad" : "Quality",
                score: assessment.qualityScore,
              },
            ].map((item) => (
              <Card
                key={item.label}
                className={`border ${getScoreBg(item.score)}`}
              >
                <CardContent className="p-3 text-center">
                  <p
                    className={`text-2xl font-bold ${getScoreColor(item.score)}`}
                  >
                    {item.score}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {item.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Domain coverage */}
          <Card className="border-stone-200 dark:border-stone-700">
            <CardContent className="p-4">
              <p className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                {isEs ? "Cobertura de Dominios" : "Domain Coverage"}
              </p>
              <div className="flex flex-wrap gap-2">
                {OKR_DOMAINS.map((domain) => {
                  const covered =
                    assessment.domainCoverage[domain.id as OKRDomain];
                  return (
                    <Badge
                      key={domain.id}
                      variant="outline"
                      className={
                        covered
                          ? "border-green-300 text-green-700 dark:border-green-700 dark:text-green-300"
                          : "border-red-300 text-red-700 dark:border-red-700 dark:text-red-300"
                      }
                    >
                      {covered ? (
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                      ) : (
                        <XCircle className="h-3 w-3 mr-1" />
                      )}
                      {isEs ? domain.es : domain.en}
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Gaps */}
          {assessment.gaps.length > 0 && (
            <Card className="border-amber-200 dark:border-amber-800">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-amber-700 dark:text-amber-300 mb-2">
                  {isEs ? "Brechas Identificadas" : "Gaps Identified"}
                </p>
                {assessment.gaps.map((gap, i) => (
                  <p
                    key={i}
                    className="text-sm text-stone-600 dark:text-stone-400 flex items-start gap-2 mb-1"
                  >
                    <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                    {gap}
                  </p>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          {assessment.recommendations.length > 0 && (
            <Card className="border-teal-200 dark:border-teal-800">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-teal-700 dark:text-teal-300 mb-2">
                  {isEs ? "Recomendaciones" : "Recommendations"}
                </p>
                {assessment.recommendations.map((rec, i) => (
                  <p
                    key={i}
                    className="text-sm text-stone-600 dark:text-stone-400 flex items-start gap-2 mb-1"
                  >
                    <Sparkles className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" />
                    {rec}
                  </p>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Complete */}
          <Button
            onClick={handleComplete}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            {isEs
              ? "Finalizar Sprint"
              : "Finalize Sprint"}
          </Button>
        </div>
      )}
    </div>
  );
}
