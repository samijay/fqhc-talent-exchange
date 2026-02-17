"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import {
  Target,
  Handshake,
  Zap,
  Sprout,
  Compass,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  BarChart3,
  Lightbulb,
  Users,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DomainId, AssessmentQuestion } from "@/lib/career-assessment-engine";
import {
  LEADERSHIP_ROLES,
  MANAGER_DOMAIN_DEFINITIONS,
  getManagerQuestionsForRole,
  calculateManagerResults,
  type LeadershipRoleId,
  type ManagerAssessmentResults,
} from "@/lib/manager-assessment-engine";
import { TeamReadinessResults } from "./TeamReadinessResults";

/* ------------------------------------------------------------------ */
/*  i18n                                                                */
/* ------------------------------------------------------------------ */

const UI = {
  en: {
    title: "Team Readiness Assessment",
    subtitle:
      "Assess your leadership strengths across 5 behavioral domains. Built for FQHC managers, supervisors, and directors.",
    howItWorks: "How it works",
    bullet1: "Select your leadership role for tailored questions",
    bullet2: "15 scenario-based questions across 5 domains",
    bullet3: "Get a personalized report with management actions and team-building tools",
    startAssessment: "Start Assessment",
    selectRole: "Select Your Leadership Role",
    selectRoleSubtitle: "Choose the role that best describes your current position",
    continue: "Continue",
    questionOf: (current: number, total: number) => `Question ${current} of ${total}`,
    next: "Next",
    seeResults: "See Results",
    back: "Back",
  },
  es: {
    title: "Evaluación de Preparación del Equipo",
    subtitle:
      "Evalúa tus fortalezas de liderazgo en 5 dominios de comportamiento. Diseñado para gerentes, supervisores y directores de FQHC.",
    howItWorks: "Cómo funciona",
    bullet1: "Selecciona tu rol de liderazgo para preguntas personalizadas",
    bullet2: "15 preguntas basadas en escenarios en 5 dominios",
    bullet3: "Obtén un informe personalizado con acciones de gestión y herramientas de equipo",
    startAssessment: "Iniciar Evaluación",
    selectRole: "Selecciona tu Rol de Liderazgo",
    selectRoleSubtitle: "Elige el rol que mejor describe tu posición actual",
    continue: "Continuar",
    questionOf: (current: number, total: number) => `Pregunta ${current} de ${total}`,
    next: "Siguiente",
    seeResults: "Ver Resultados",
    back: "Atrás",
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Visual Helpers                                                      */
/* ------------------------------------------------------------------ */

const DOMAIN_ICONS: Record<DomainId, typeof Target> = {
  mission: Target,
  people: Handshake,
  execution: Zap,
  growth: Sprout,
  transition: Compass,
};

const DOMAIN_COLORS: Record<DomainId, { bg: string; text: string; border: string }> = {
  mission: { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200" },
  people: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  execution: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  growth: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  transition: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
};

const ROLE_ICONS: Record<LeadershipRoleId, typeof Users> = {
  program_manager: BarChart3,
  clinical_supervisor: Shield,
  operations_director: Target,
  executive_director: Users,
};

/* ------------------------------------------------------------------ */
/*  Seeded shuffle                                                      */
/* ------------------------------------------------------------------ */

function seededShuffle<T>(arr: T[], seed: string): T[] {
  const shuffled = [...arr];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  for (let i = shuffled.length - 1; i > 0; i--) {
    hash = (hash * 1103515245 + 12345) & 0x7fffffff;
    const j = hash % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

type Screen = "intro" | "role_select" | "questions" | "results";

export function TeamReadinessAssessment() {
  const locale = useLocale();
  const isEs = locale === "es";
  const t = UI[isEs ? "es" : "en"];

  const [screen, setScreen] = useState<Screen>("intro");
  const [selectedRole, setSelectedRole] = useState<LeadershipRoleId | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [results, setResults] = useState<ManagerAssessmentResults | null>(null);

  // Get questions for selected role
  const questions: AssessmentQuestion[] = useMemo(
    () => (selectedRole ? getManagerQuestionsForRole(selectedRole) : []),
    [selectedRole],
  );

  const question = questions[currentQuestion];
  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;

  // Shuffle options per question
  const shuffledOptions = useMemo(
    () => (question ? seededShuffle(question.options, question.id) : []),
    [question],
  );

  /* --- Handlers ---------------------------------------------------- */

  function handleSelectOption(optionId: string) {
    setSelectedOption(optionId);
  }

  function handleNext() {
    if (!selectedOption || !question || !selectedRole) return;

    const updatedAnswers = { ...answers, [question.id]: selectedOption };
    setAnswers(updatedAnswers);
    setSelectedOption(null);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const assessmentResults = calculateManagerResults(
        updatedAnswers,
        questions,
        selectedRole,
        locale,
      );
      setResults(assessmentResults);
      setScreen("results");
    }
  }

  function handleBack() {
    if (currentQuestion > 0) {
      const prevQuestion = questions[currentQuestion - 1];
      setSelectedOption(answers[prevQuestion.id] || null);
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  function handleStartOver() {
    setScreen("intro");
    setSelectedRole(null);
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedOption(null);
    setResults(null);
  }

  /* --- Intro Screen ------------------------------------------------ */

  if (screen === "intro") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow sm:p-10">
          <div className="text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100">
              <Users className="size-8 text-indigo-700" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900">{t.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-500">{t.subtitle}</p>
          </div>

          {/* Domain cards */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            {MANAGER_DOMAIN_DEFINITIONS.map((domain) => {
              const Icon = DOMAIN_ICONS[domain.id];
              const colors = DOMAIN_COLORS[domain.id];
              return (
                <div
                  key={domain.id}
                  className={`rounded-xl border ${colors.border} ${colors.bg} p-4`}
                >
                  <Icon className={`mb-2 size-5 ${colors.text}`} />
                  <p className={`text-sm font-semibold ${colors.text}`}>{domain.name}</p>
                  <p className="mt-1 text-xs text-stone-500 line-clamp-2">{domain.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-lg bg-stone-50 p-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="mt-0.5 size-5 shrink-0 text-amber-500" />
              <div className="text-sm text-stone-600">
                <p className="font-medium text-stone-700">{t.howItWorks}</p>
                <ul className="mt-1.5 space-y-1 text-xs">
                  <li>{t.bullet1}</li>
                  <li>{t.bullet2}</li>
                  <li>{t.bullet3}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => setScreen("role_select")}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-700 to-purple-600 px-8 py-3 font-semibold text-white hover:shadow-lg"
            >
              {t.startAssessment} <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* --- Role Select Screen ------------------------------------------ */

  if (screen === "role_select") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow sm:p-10">
          <div className="text-center">
            <h2 className="text-xl font-bold text-stone-900">{t.selectRole}</h2>
            <p className="mt-2 text-sm text-stone-500">{t.selectRoleSubtitle}</p>
          </div>

          <div className="mt-8 space-y-3">
            {LEADERSHIP_ROLES.map((role) => {
              const Icon = ROLE_ICONS[role.id];
              const isSelected = selectedRole === role.id;

              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`w-full rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-50 shadow-md"
                      : "border-stone-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                        isSelected ? "bg-indigo-100" : "bg-stone-100"
                      }`}
                    >
                      <Icon className={`size-5 ${isSelected ? "text-indigo-700" : "text-stone-500"}`} />
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${isSelected ? "text-indigo-900" : "text-stone-900"}`}>
                        {isEs ? role.esLabel : role.label}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-stone-500">
                        {isEs ? role.esDescription : role.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => setScreen("questions")}
              disabled={!selectedRole}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-700 to-purple-600 px-8 py-3 font-semibold text-white hover:shadow-lg disabled:opacity-50"
            >
              {t.continue} <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* --- Results Screen ---------------------------------------------- */

  if (screen === "results" && results) {
    return <TeamReadinessResults results={results} onStartOver={handleStartOver} />;
  }

  /* --- Questions Screen -------------------------------------------- */

  if (!question) return null;

  const domainColors = DOMAIN_COLORS[question.domain];
  const DomainIcon = DOMAIN_ICONS[question.domain];
  const domainDef = MANAGER_DOMAIN_DEFINITIONS.find((d) => d.id === question.domain);
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow sm:p-10">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>{t.questionOf(currentQuestion + 1, totalQuestions)}</span>
            <span className={`inline-flex items-center gap-1 rounded-full ${domainColors.bg} ${domainColors.text} px-2 py-0.5 text-xs font-medium`}>
              <DomainIcon className="size-3" />
              {domainDef?.name ?? question.domain}
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Scenario */}
        <div className={`rounded-xl border ${domainColors.border} ${domainColors.bg} p-4`}>
          <p className="text-sm leading-relaxed text-stone-700">
            {isEs ? question.esScenario : question.scenario}
          </p>
        </div>

        {/* Question */}
        <h3 className="mt-4 text-base font-bold text-stone-900">
          {isEs ? question.esQuestion : question.question}
        </h3>

        {/* Options */}
        <div className="mt-4 space-y-2">
          {shuffledOptions.map((option) => {
            const isSelected = selectedOption === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                className={`w-full rounded-xl border-2 p-4 text-left text-sm leading-relaxed transition-all duration-200 ${
                  isSelected
                    ? "border-indigo-500 bg-indigo-50 text-stone-900 shadow-sm"
                    : "border-stone-200 text-stone-600 hover:border-indigo-300 hover:bg-indigo-50/30"
                }`}
              >
                {isEs ? option.esText : option.text}
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentQuestion === 0}
            className="flex items-center gap-1 text-sm font-medium text-stone-400 hover:text-stone-600 disabled:invisible"
          >
            <ChevronLeft className="size-4" />
            {t.back}
          </button>
          <Button
            onClick={handleNext}
            disabled={!selectedOption}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-700 to-purple-600 px-6 py-2.5 font-semibold text-white hover:shadow-lg disabled:opacity-50"
          >
            {isLastQuestion ? t.seeResults : t.next}
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
