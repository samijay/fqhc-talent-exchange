"use client";

import { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Target,
  Handshake,
  Zap,
  Sprout,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Trophy,
  TrendingUp,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ASSESSMENT_QUESTIONS,
  DOMAIN_DEFINITIONS,
  calculateAssessmentResults,
  getDomainName,
  getLevelLabel,
  type AssessmentResults,
  type DomainId,
} from "@/lib/career-assessment-engine";

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

interface CareerInsightsProps {
  onComplete: (results: AssessmentResults) => void;
  onSkip: () => void;
}

/* ------------------------------------------------------------------ */
/*  Domain Icon Helper                                                  */
/* ------------------------------------------------------------------ */

const DOMAIN_ICONS: Record<DomainId, typeof Target> = {
  mission: Target,
  people: Handshake,
  execution: Zap,
  growth: Sprout,
};

const DOMAIN_COLORS: Record<DomainId, { bg: string; text: string; bar: string; border: string }> = {
  mission: {
    bg: "bg-teal-50",
    text: "text-teal-700",
    bar: "bg-teal-500",
    border: "border-teal-200",
  },
  people: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    bar: "bg-blue-500",
    border: "border-blue-200",
  },
  execution: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    bar: "bg-amber-500",
    border: "border-amber-200",
  },
  growth: {
    bg: "bg-green-50",
    text: "text-green-700",
    bar: "bg-green-500",
    border: "border-green-200",
  },
};

const LEVEL_COLORS: Record<string, string> = {
  strength: "text-teal-700 bg-teal-50 border-teal-200",
  developing: "text-amber-700 bg-amber-50 border-amber-200",
  growth_area: "text-red-600 bg-red-50 border-red-200",
};

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function CareerInsights({ onComplete, onSkip }: CareerInsightsProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [started, setStarted] = useState(false);

  const question = ASSESSMENT_QUESTIONS[currentQuestion];
  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  /* --- Handlers ---------------------------------------------------- */

  function handleSelectOption(optionId: string) {
    setSelectedOption(optionId);
  }

  function handleNext() {
    if (!selectedOption || !question) return;

    const updatedAnswers = { ...answers, [question.id]: selectedOption };
    setAnswers(updatedAnswers);
    setSelectedOption(null);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate results
      const assessmentResults = calculateAssessmentResults(updatedAnswers);
      setResults(assessmentResults);
      onComplete(assessmentResults);
    }
  }

  function handleBack() {
    if (currentQuestion > 0) {
      const prevQuestion = ASSESSMENT_QUESTIONS[currentQuestion - 1];
      setSelectedOption(answers[prevQuestion.id] || null);
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  /* --- Intro Screen ------------------------------------------------ */

  if (!started) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow sm:p-10">
          <div className="text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-100 to-amber-100">
              <BarChart3 className="size-8 text-teal-700" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900">
              Career Insights Assessment
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-500">
              Take this 3-minute behavioral assessment to discover your
              strengths and fastest path to career growth in community health.
            </p>
          </div>

          {/* Domain cards */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            {DOMAIN_DEFINITIONS.map((domain) => {
              const Icon = DOMAIN_ICONS[domain.id];
              const colors = DOMAIN_COLORS[domain.id];
              return (
                <div
                  key={domain.id}
                  className={`rounded-xl border ${colors.border} ${colors.bg} p-4`}
                >
                  <Icon className={`mb-2 size-5 ${colors.text}`} />
                  <p className={`text-sm font-semibold ${colors.text}`}>
                    {domain.name}
                  </p>
                  <p className="mt-1 text-xs text-stone-500 line-clamp-2">
                    {domain.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-lg bg-stone-50 p-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="mt-0.5 size-5 shrink-0 text-amber-500" />
              <div className="text-sm text-stone-600">
                <p className="font-medium text-stone-700">How it works</p>
                <ul className="mt-1.5 space-y-1 text-xs">
                  <li>12 scenario-based questions across 4 domains</li>
                  <li>No right or wrong answers — just pick what fits you best</li>
                  <li>Get a personalized report with strengths and growth areas</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              onClick={() => setStarted(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-teal-700 to-amber-600 px-8 py-3 font-semibold text-white hover:shadow-lg"
            >
              Start Assessment <ArrowRight className="size-4" />
            </Button>
            <button
              onClick={onSkip}
              className="text-sm font-medium text-stone-500 hover:text-stone-700"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* --- Results Screen ---------------------------------------------- */

  if (results) {
    const domainIds: DomainId[] = ["mission", "people", "execution", "growth"];

    return (
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow sm:p-10">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-100 to-amber-100">
              <Trophy className="size-8 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900">
              Your Career Insights
            </h2>
            <p className="mt-2 text-sm text-stone-500">
              Based on your responses across 4 key domains
            </p>
          </div>

          {/* Overall Score */}
          <div className="mt-8 text-center">
            <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-teal-50 to-amber-50 border-4 border-white shadow-lg">
              <span className="text-3xl font-extrabold text-teal-700">
                {results.overallScore}
              </span>
            </div>
            <p className="mt-2 text-sm font-medium text-stone-500">
              Overall Score
            </p>
          </div>

          {/* Domain Scores */}
          <div className="mt-8 space-y-4">
            {domainIds.map((domainId) => {
              const score = results.domainScores[domainId];
              const colors = DOMAIN_COLORS[domainId];
              const Icon = DOMAIN_ICONS[domainId];
              const isStrength = domainId === results.topStrength;
              const isGrowthArea = domainId === results.topGrowthArea;

              return (
                <div
                  key={domainId}
                  className={`rounded-xl border p-4 ${
                    isStrength
                      ? "border-teal-300 bg-teal-50/50"
                      : isGrowthArea
                        ? "border-amber-300 bg-amber-50/50"
                        : "border-stone-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex size-9 items-center justify-center rounded-lg ${colors.bg}`}
                      >
                        <Icon className={`size-5 ${colors.text}`} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-stone-900">
                          {getDomainName(domainId)}
                        </p>
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-block rounded-full border px-2 py-0.5 text-xs font-medium ${LEVEL_COLORS[score.level]}`}
                          >
                            {getLevelLabel(score.level)}
                          </span>
                          {isStrength && (
                            <span className="text-xs text-teal-600 font-medium">
                              Top Strength
                            </span>
                          )}
                          {isGrowthArea && (
                            <span className="text-xs text-amber-600 font-medium">
                              Biggest Opportunity
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-stone-700">
                      {score.score}/{score.max}
                    </span>
                  </div>
                  {/* Score bar */}
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-stone-200">
                    <div
                      className={`h-full rounded-full ${colors.bar} transition-all duration-700`}
                      style={{ width: `${score.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Strengths */}
          <div className="mt-8">
            <div className="mb-3 flex items-center gap-2">
              <Trophy className="size-5 text-teal-600" />
              <h3 className="text-lg font-bold text-stone-900">
                Your Strengths
              </h3>
            </div>
            <div className="space-y-2">
              {results.insights.strengths.map((strength, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-teal-100 bg-teal-50/50 p-3"
                >
                  <CheckCircle className="mt-0.5 size-4 shrink-0 text-teal-600" />
                  <p className="text-sm text-stone-700">{strength}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Growth Areas */}
          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2">
              <TrendingUp className="size-5 text-amber-600" />
              <h3 className="text-lg font-bold text-stone-900">
                Growth Opportunities
              </h3>
            </div>
            <div className="space-y-2">
              {results.insights.growthAreas.map((area, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-amber-100 bg-amber-50/50 p-3"
                >
                  <ArrowRight className="mt-0.5 size-4 shrink-0 text-amber-600" />
                  <p className="text-sm text-stone-700">{area}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2">
              <Lightbulb className="size-5 text-blue-600" />
              <h3 className="text-lg font-bold text-stone-900">
                Recommended Next Steps
              </h3>
            </div>
            <div className="space-y-2">
              {results.insights.nextSteps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50/50 p-3"
                >
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                    {i + 1}
                  </span>
                  <p className="text-sm text-stone-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Done button */}
          <div className="mt-8 text-center">
            <Button
              onClick={onSkip}
              className="bg-gradient-to-r from-teal-700 to-amber-600 px-8 py-3 font-semibold text-white hover:shadow-lg"
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* --- Question Screen --------------------------------------------- */

  const currentDomain = DOMAIN_DEFINITIONS.find(
    (d) => d.id === question.domain,
  );
  const DomainIcon = DOMAIN_ICONS[question.domain];
  const domainColors = DOMAIN_COLORS[question.domain];

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-stone-700">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
          <span className="text-sm text-stone-500">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-stone-200">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-amber-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow sm:p-8">
        {/* Domain badge */}
        <div
          className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${domainColors.bg} ${domainColors.border}`}
        >
          <DomainIcon className={`size-4 ${domainColors.text}`} />
          <span className={`text-xs font-semibold ${domainColors.text}`}>
            {currentDomain?.name}
          </span>
        </div>

        {/* Scenario */}
        <div className="mb-4 rounded-lg bg-stone-50 p-4">
          <p className="text-sm font-medium leading-relaxed text-stone-700">
            {question.scenario}
          </p>
        </div>

        {/* Question */}
        <h3 className="mb-4 text-lg font-bold text-stone-900">
          {question.question}
        </h3>

        {/* Answer options */}
        <div className="space-y-3">
          {question.options.map((option) => {
            const isSelected = selectedOption === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                className={`w-full rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                  isSelected
                    ? "border-teal-500 bg-teal-50 shadow-md"
                    : "border-stone-200 bg-white hover:border-stone-300 hover:shadow-sm"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                      isSelected
                        ? "border-teal-500 bg-teal-500"
                        : "border-stone-300"
                    }`}
                  >
                    {isSelected && (
                      <CheckCircle className="size-3.5 text-white" />
                    )}
                  </div>
                  <span
                    className={`text-sm leading-relaxed ${
                      isSelected ? "text-teal-900 font-medium" : "text-stone-700"
                    }`}
                  >
                    {option.text}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          {currentQuestion > 0 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-900"
            >
              <ChevronLeft className="size-4" /> Back
            </button>
          ) : (
            <button
              onClick={onSkip}
              className="text-sm font-medium text-stone-500 hover:text-stone-700"
            >
              Skip assessment
            </button>
          )}
          <Button
            onClick={handleNext}
            disabled={!selectedOption}
            className="flex items-center gap-2 bg-gradient-to-r from-teal-700 to-amber-600 px-6 py-2.5 font-semibold text-white hover:shadow-lg disabled:opacity-50"
          >
            {currentQuestion === totalQuestions - 1 ? "See Results" : "Next"}
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
