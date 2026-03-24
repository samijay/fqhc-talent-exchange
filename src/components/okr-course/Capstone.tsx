"use client";

import { useState, useCallback } from "react";
import { useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Sparkles,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Target,
  Zap,
} from "lucide-react";
import { CAPSTONE_DOMAINS } from "@/lib/okr-course-modules";
import {
  generateFallbackCritique,
  type OKRCritiqueRequest,
  type OKRCritiqueResponse,
} from "@/lib/okr-ai-critique";
import type { OKRDomain } from "@/lib/fqhc-okr-templates";

interface CapstoneProps {
  userId?: string;
  onComplete?: (domain: OKRDomain, objective: string, keyResults: string[]) => void;
}

export function Capstone({ onComplete }: CapstoneProps) {
  const locale = useLocale();
  const t = (obj: { en: string; es: string }) =>
    locale === "es" ? obj.es : obj.en;

  const [domain, setDomain] = useState<OKRDomain | null>(null);
  const [objective, setObjective] = useState("");
  const [keyResults, setKeyResults] = useState(["", "", ""]);
  const [loading, setLoading] = useState(false);
  const [critique, setCritique] = useState<OKRCritiqueResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const updateKR = useCallback((index: number, value: string) => {
    setKeyResults((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }, []);

  const isFormValid =
    domain !== null &&
    objective.trim().length >= 10 &&
    keyResults.filter((kr) => kr.trim().length > 0).length >= 2;

  const handleSubmit = useCallback(async () => {
    if (!isFormValid || domain === null) return;
    setLoading(true);
    setError(null);
    setCritique(null);

    const request: OKRCritiqueRequest = {
      objective: objective.trim(),
      keyResults: keyResults.filter((kr) => kr.trim().length > 0),
      domain: domain,
      locale: locale as "en" | "es",
    };

    try {
      // Try the API first
      const response = await fetch("/api/okr-critique", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        const data = await response.json();
        setCritique(data);
      } else {
        // Fallback to rule-based critique
        const fallback = generateFallbackCritique(request);
        setCritique(fallback);
      }

      setSubmitted(true);
      if (onComplete) {
        onComplete(
          domain,
          objective.trim(),
          keyResults.filter((kr) => kr.trim().length > 0)
        );
      }
    } catch {
      // Fallback to rule-based critique on network error
      const fallback = generateFallbackCritique(request);
      setCritique(fallback);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }, [isFormValid, domain, objective, keyResults, locale, onComplete]);

  const handleRevise = useCallback(() => {
    setCritique(null);
    setSubmitted(false);
  }, []);

  const getScoreColor = (score: number): string => {
    if (score >= 70) return "text-green-600 dark:text-green-400";
    if (score >= 40) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBg = (score: number): string => {
    if (score >= 70) return "bg-green-100 dark:bg-green-900";
    if (score >= 40) return "bg-amber-100 dark:bg-amber-900";
    return "bg-red-100 dark:bg-red-900";
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-teal-500" />
          <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100">
            {locale === "es"
              ? "Escribe Tu Primer OKR"
              : "Write Your First OKR"}
          </h2>
        </div>
        <p className="text-sm text-stone-500 dark:text-stone-500 max-w-md mx-auto">
          {locale === "es"
            ? "Elige un dominio FQHC, escribe un Objetivo y 2-3 Resultados Clave. Nuestro coach de IA te dará retroalimentación."
            : "Pick an FQHC domain, write an Objective and 2-3 Key Results. Our AI coach will give you feedback."}
        </p>
      </div>

      {/* Domain selector */}
      <div>
        <label className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 block">
          {locale === "es" ? "Dominio FQHC" : "FQHC Domain"}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {CAPSTONE_DOMAINS.map((d) => (
            <button
              key={d.id}
              onClick={() => setDomain(d.id)}
              className={`p-3 rounded-lg border text-left transition-all ${
                domain === d.id
                  ? "border-teal-400 bg-teal-50 dark:border-teal-600 dark:bg-teal-950"
                  : "border-stone-200 dark:border-stone-700 hover:border-teal-300 dark:hover:border-teal-700"
              }`}
            >
              <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
                {t(d.label)}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-500 mt-1">
                {t(d.hint)}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Objective input */}
      <div>
        <label className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 block">
          {locale === "es" ? "Tu Objetivo" : "Your Objective"}
        </label>
        <Textarea
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          placeholder={
            locale === "es"
              ? "Ej: Transformar la experiencia de acceso del paciente eliminando barreras de programación"
              : "E.g.: Transform the patient access experience by eliminating scheduling barriers"
          }
          className="min-h-[80px] resize-none"
          disabled={submitted}
        />
        <p className="text-xs text-stone-500 dark:text-stone-500 mt-1">
          {locale === "es"
            ? "Aspiracional, cualitativo, sin números — ¿qué quieres lograr?"
            : "Aspirational, qualitative, no numbers — what do you want to achieve?"}
        </p>
      </div>

      {/* Key Results inputs */}
      <div>
        <label className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 block">
          {locale === "es"
            ? "Tus Resultados Clave (2-3)"
            : "Your Key Results (2-3)"}
        </label>
        <div className="space-y-3">
          {keyResults.map((kr, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="w-7 h-7 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-xs font-bold text-stone-500 shrink-0 mt-2">
                {i + 1}
              </span>
              <Textarea
                value={kr}
                onChange={(e) => updateKR(i, e.target.value)}
                placeholder={
                  locale === "es"
                    ? `RC ${i + 1}: [Métrica] de [línea base] a [meta] para [fecha]`
                    : `KR ${i + 1}: [Metric] from [baseline] to [target] by [date]`
                }
                className="min-h-[60px] resize-none"
                disabled={submitted}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Submit / Revise buttons */}
      {!submitted ? (
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid || loading}
          className="bg-teal-600 hover:bg-teal-700 text-white h-12"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 motion-safe:animate-spin" />
              {locale === "es" ? "Analizando..." : "Analyzing..."}
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              {locale === "es"
                ? "Obtener Retroalimentación de IA"
                : "Get AI Feedback"}
            </>
          )}
        </Button>
      ) : (
        <Button
          onClick={handleRevise}
          variant="outline"
          className="h-12"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          {locale === "es"
            ? "Revisar y Reenviar"
            : "Revise & Resubmit"}
        </Button>
      )}

      {/* Error */}
      {error && (
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Critique results */}
      {critique && (
        <div className="space-y-4">
          {/* Overall score */}
          <Card className="border-teal-200 bg-teal-50/50 dark:border-teal-800 dark:bg-teal-950/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200">
                  {locale === "es"
                    ? "Retroalimentación del Coach"
                    : "Coach Feedback"}
                </h3>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-teal-600" />
                  <span
                    className={`text-2xl font-bold ${getScoreColor(critique.overallScore)}`}
                  >
                    {critique.overallScore}
                  </span>
                  <span className="text-sm text-stone-500">/100</span>
                </div>
              </div>

              {/* Score breakdown */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {Object.entries(critique.scores).map(([key, score]) => (
                  <div
                    key={key}
                    className={`p-3 rounded-lg ${getScoreBg(score.score)}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-stone-600 dark:text-stone-500">
                        {score.category}
                      </span>
                      <span
                        className={`text-sm font-bold ${getScoreColor(score.score)}`}
                      >
                        {score.score}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-500">
                      {score.feedback}
                    </p>
                  </div>
                ))}
              </div>

              {/* Suggestions */}
              <div>
                <p className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  {locale === "es" ? "Sugerencias:" : "Suggestions:"}
                </p>
                <div className="space-y-2">
                  {critique.suggestions.map((suggestion, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-sm text-stone-600 dark:text-stone-500"
                    >
                      <Zap className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                      <span>{suggestion}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rewrite suggestion */}
              {critique.rewriteSuggestion && (
                <div className="mt-4 p-3 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700">
                  <p className="text-xs font-medium text-teal-600 dark:text-teal-400 mb-2">
                    {locale === "es"
                      ? "Versión sugerida:"
                      : "Suggested rewrite:"}
                  </p>
                  <p className="text-sm font-medium text-stone-800 dark:text-stone-200 mb-2">
                    {critique.rewriteSuggestion.objective}
                  </p>
                  {critique.rewriteSuggestion.keyResults.map((kr, i) => (
                    <p
                      key={i}
                      className="text-sm text-stone-600 dark:text-stone-500 ml-4"
                    >
                      KR{i + 1}: {kr}
                    </p>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Completion badge */}
          <div className="flex flex-col items-center gap-3 py-4">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
            <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
              {locale === "es"
                ? "¡Capstone completado! Puedes revisar y reenviar cuantas veces quieras."
                : "Capstone complete! You can revise and resubmit as many times as you like."}
            </p>
            <Badge className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
              +100 XP
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
}
