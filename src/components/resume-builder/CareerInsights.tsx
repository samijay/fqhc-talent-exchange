"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { BookingCTA } from "@/components/booking/BookingCTA";
import { BOOKING_THRESHOLDS } from "@/lib/booking-config";
import {
  ChevronRight,
  ChevronLeft,
  Target,
  Handshake,
  Zap,
  Sprout,
  Compass,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Trophy,
  TrendingUp,
  Lightbulb,
  Briefcase,
  DollarSign,
  Award,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DOMAIN_DEFINITIONS,
  calculateAssessmentResults,
  getQuestionsForRole,
  getDomainName,
  getDomainDescription,
  getLevelLabel,
  ROLE_INSIGHTS,
  type AssessmentResults,
  type AssessmentQuestion,
  type DomainId,
} from "@/lib/career-assessment-engine";
import { SALARY_BENCHMARKS } from "@/lib/job-posting-templates";
import { FIVE_CONVERSATIONS, FOGLAMP } from "@/lib/first-90-days";

/* ------------------------------------------------------------------ */
/*  i18n — EN / ES UI strings                                         */
/* ------------------------------------------------------------------ */

const UI_STRINGS = {
  en: {
    title: "Career Insights Assessment",
    subtitle:
      "Take this 4-minute behavioral assessment to discover your strengths and fastest path to career growth in community health.",
    howItWorks: "How it works",
    bullet1: "15 scenario-based questions across 5 domains",
    bullet2: "No right or wrong answers — just pick what fits you best",
    bullet3: "Get a personalized report with strengths and growth areas",
    startAssessment: "Start Assessment",
    skipForNow: "Skip for now",
    resultsTitle: "Your Career Insights",
    resultsSubtitle: "Based on your responses across 5 key domains",
    overallScore: "Overall Score",
    topStrength: "Top Strength",
    biggestOpportunity: "Biggest Opportunity",
    yourStrengths: "Your Strengths",
    growthOpportunities: "Growth Opportunities",
    recommendedNextSteps: "Recommended Next Steps",
    done: "Done",
    questionOf: (current: number, total: number) =>
      `Question ${current} of ${total}`,
    next: "Next",
    seeResults: "See Results",
    back: "Back",
    skipAssessment: "Skip assessment",
  },
  es: {
    title: "Evaluación de Perspectivas Profesionales",
    subtitle:
      "Realiza esta evaluación de comportamiento de 4 minutos para descubrir tus fortalezas y el camino más rápido hacia el crecimiento profesional en salud comunitaria.",
    howItWorks: "Cómo funciona",
    bullet1: "15 preguntas basadas en escenarios en 5 dominios",
    bullet2: "No hay respuestas correctas o incorrectas — solo elige lo que mejor te represente",
    bullet3: "Obtén un informe personalizado con fortalezas y áreas de crecimiento",
    startAssessment: "Iniciar Evaluación",
    skipForNow: "Omitir por ahora",
    resultsTitle: "Tus Perspectivas Profesionales",
    resultsSubtitle: "Basado en tus respuestas en 5 dominios clave",
    overallScore: "Puntuación General",
    topStrength: "Mayor Fortaleza",
    biggestOpportunity: "Mayor Oportunidad",
    yourStrengths: "Tus Fortalezas",
    growthOpportunities: "Oportunidades de Crecimiento",
    recommendedNextSteps: "Próximos Pasos Recomendados",
    done: "Listo",
    questionOf: (current: number, total: number) =>
      `Pregunta ${current} de ${total}`,
    next: "Siguiente",
    seeResults: "Ver Resultados",
    back: "Atrás",
    skipAssessment: "Omitir evaluación",
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

interface CareerInsightsProps {
  onComplete: (results: AssessmentResults) => void;
  onSkip: () => void;
  roleId?: string;
}

/* ------------------------------------------------------------------ */
/*  Domain Icon Helper                                                  */
/* ------------------------------------------------------------------ */

const DOMAIN_ICONS: Record<DomainId, typeof Target> = {
  mission: Target,
  people: Handshake,
  execution: Zap,
  growth: Sprout,
  transition: Compass,
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
  transition: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    bar: "bg-purple-500",
    border: "border-purple-200",
  },
};

const LEVEL_COLORS: Record<string, string> = {
  strength: "text-teal-700 bg-teal-50 border-teal-200",
  developing: "text-amber-700 bg-amber-50 border-amber-200",
  growth_area: "text-red-600 bg-red-50 border-red-200",
};

/* ------------------------------------------------------------------ */
/*  Seeded shuffle — consistent per question, prevents gaming          */
/* ------------------------------------------------------------------ */

function seededShuffle<T>(arr: T[], seed: string): T[] {
  const shuffled = [...arr];
  // Simple hash from seed string
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  // Fisher-Yates with seeded pseudo-random
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

export default function CareerInsights({ onComplete, onSkip, roleId }: CareerInsightsProps) {
  const locale = useLocale();
  const t = UI_STRINGS[locale === "es" ? "es" : "en"];
  const isEs = locale === "es";

  // Get role-tailored questions (falls back to universal if no roleId)
  const questions: AssessmentQuestion[] = useMemo(
    () => getQuestionsForRole(roleId),
    [roleId],
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [started, setStarted] = useState(false);
  const [showTransitionDeepDive, setShowTransitionDeepDive] = useState(false);

  const question = questions[currentQuestion];
  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  // Role-specific insight data (for results page)
  const roleInsight = roleId ? ROLE_INSIGHTS[roleId] : undefined;

  // Salary benchmark for this role (map resume roleIds to benchmark roleIds)
  const ROLE_TO_BENCHMARK: Record<string, string> = {
    chw: "chw",
    care_coordinator: "care_coordinator",
    medical_assistant: "medical_assistant",
    case_manager: "case_manager",
    behavioral_health: "behavioral_health",
    registered_nurse: "nurse_rn",
    patient_services: "patient_services",
    revenue_cycle: "revenue_cycle",
  };
  const benchmarkRoleId = roleId ? ROLE_TO_BENCHMARK[roleId] : undefined;
  const salaryBenchmark = benchmarkRoleId
    ? SALARY_BENCHMARKS.find((b) => b.roleId === benchmarkRoleId)
    : undefined;

  // Shuffle answer options so the "best" answer isn't always first
  const shuffledOptions = useMemo(
    () => seededShuffle(question.options, question.id),
    [question],
  );

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
      // Calculate results (role-aware)
      const assessmentResults = calculateAssessmentResults(updatedAnswers, locale, roleId);
      setResults(assessmentResults);
      onComplete(assessmentResults);
    }
  }

  function handleBack() {
    if (currentQuestion > 0) {
      const prevQuestion = questions[currentQuestion - 1];
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
              {t.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-500">
              {t.subtitle}
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
                    {getDomainName(domain.id, locale)}
                  </p>
                  <p className="mt-1 text-xs text-stone-500 line-clamp-2">
                    {getDomainDescription(domain.id, locale)}
                  </p>
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

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              onClick={() => setStarted(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-teal-700 to-amber-600 px-8 py-3 font-semibold text-white hover:shadow-lg"
            >
              {t.startAssessment} <ArrowRight className="size-4" />
            </Button>
            <button
              onClick={onSkip}
              className="text-sm font-medium text-stone-500 hover:text-stone-700"
            >
              {t.skipForNow}
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
              {t.resultsTitle}
            </h2>
            <p className="mt-2 text-sm text-stone-500">
              {t.resultsSubtitle}
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
              {t.overallScore}
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
                          {getDomainName(domainId, locale)}
                        </p>
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-block rounded-full border px-2 py-0.5 text-xs font-medium ${LEVEL_COLORS[score.level]}`}
                          >
                            {getLevelLabel(score.level, locale)}
                          </span>
                          {isStrength && (
                            <span className="text-xs text-teal-600 font-medium">
                              {t.topStrength}
                            </span>
                          )}
                          {isGrowthArea && (
                            <span className="text-xs text-amber-600 font-medium">
                              {t.biggestOpportunity}
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
                {t.yourStrengths}
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
                {t.growthOpportunities}
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

          {/* Failure Factor Coaching — growth-oriented coaching nudges */}
          {results.failureFactors && results.failureFactors.length > 0 && (
            <div className="mt-6">
              <div className="mb-3 flex items-center gap-2">
                <Sprout className="size-5 text-green-600" />
                <h3 className="text-lg font-bold text-stone-900">
                  {isEs ? "Oportunidades de Desarrollo" : "Development Opportunities"}
                </h3>
              </div>
              <div className="space-y-3">
                {results.failureFactors.map((ff, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-green-100 bg-gradient-to-br from-green-50/50 to-teal-50/30 p-4"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-lg">{ff.icon}</span>
                      <span className="text-sm font-semibold text-green-800">
                        {isEs ? ff.esFactor : ff.factor}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-stone-600">
                      {isEs ? ff.esCoaching : ff.coaching}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2">
              <Lightbulb className="size-5 text-blue-600" />
              <h3 className="text-lg font-bold text-stone-900">
                {t.recommendedNextSteps}
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

          {/* What Employers Want — only shown for role-specific assessments */}
          {roleInsight && (
            <div className="mt-8 rounded-xl border-2 border-stone-200 bg-gradient-to-br from-stone-50 to-teal-50/30 p-5">
              <div className="mb-4 flex items-center gap-2">
                <Briefcase className="size-5 text-teal-700" />
                <h3 className="text-lg font-bold text-stone-900">
                  {isEs ? "Lo que buscan los empleadores de FQHCs" : "What FQHC Hiring Managers Look For"}
                </h3>
              </div>

              {/* Top Qualifications */}
              <div className="mb-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
                  {isEs ? "Calificaciones principales" : "Top Qualifications"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(isEs ? roleInsight.employerWants.esTopQualifications : roleInsight.employerWants.topQualifications).map((qual, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-800"
                    >
                      <CheckCircle className="size-3" />
                      {qual}
                    </span>
                  ))}
                </div>
              </div>

              {/* Top Skills */}
              <div className="mb-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
                  {isEs ? "Habilidades clave" : "Key Skills"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(isEs ? roleInsight.employerWants.esTopSkills : roleInsight.employerWants.topSkills).map((skill, i) => (
                    <span
                      key={i}
                      className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              {roleInsight.employerWants.certifications.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
                    {isEs ? "Certificaciones valoradas" : "Valued Certifications"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(isEs ? roleInsight.employerWants.esCertifications : roleInsight.employerWants.certifications).map((cert, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800"
                      >
                        <Award className="size-3" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Salary Benchmark — only shown when we have data */}
          {salaryBenchmark && (
            <div className="mt-4 rounded-xl border border-stone-200 bg-white p-5">
              <div className="mb-3 flex items-center gap-2">
                <DollarSign className="size-5 text-green-600" />
                <h3 className="text-base font-bold text-stone-900">
                  {isEs ? "Rango salarial en California" : "California Salary Range"}
                </h3>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="text-center">
                  <p className="text-xs text-stone-500">{isEs ? "25° percentil" : "25th percentile"}</p>
                  <p className="text-lg font-bold text-stone-700">
                    ${Math.round(salaryBenchmark.p25 / 1000)}K
                  </p>
                </div>
                <div className="flex-1 px-4">
                  <div className="relative h-3 rounded-full bg-stone-200">
                    <div className="absolute inset-y-0 left-0 right-0 rounded-full bg-gradient-to-r from-teal-300 via-teal-500 to-amber-500" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-stone-500">{isEs ? "75° percentil" : "75th percentile"}</p>
                  <p className="text-lg font-bold text-stone-700">
                    ${Math.round(salaryBenchmark.p75 / 1000)}K
                  </p>
                </div>
              </div>
              <p className="mt-2 text-center text-xs text-stone-500">
                {isEs ? `Salario mediano: $${(salaryBenchmark.p50 / 1000).toFixed(0)}K/año` : `Median salary: $${(salaryBenchmark.p50 / 1000).toFixed(0)}K/year`}
              </p>
            </div>
          )}

          {/* Booking CTA — show for high scorers */}
          {results.overallScore >= BOOKING_THRESHOLDS.careerInsights && (
            <BookingCTA variant="candidate" className="mt-8" />
          )}

          {/* Transition Readiness Deep Dive — show when transition domain score exists */}
          {results.domainScores.transition && (() => {
            const transitionDomain = results.domainScores.transition;
            const transitionPct = Math.round(transitionDomain.percentage);

            // Prioritize Five Conversations based on lowest-scoring domains
            const sortedDomains = Object.entries(results.domainScores)
              .sort(([, a], [, b]) => a.score - b.score)
              .map(([id]) => id as DomainId);

            // Map domains to relevant conversations
            const domainToConversation: Record<string, number> = {
              mission: 0,    // The Situation
              execution: 1,  // Expectations
              growth: 2,     // Resources
              people: 3,     // Style
              transition: 4, // Personal Development
            };

            const prioritizedConversations = sortedDomains
              .slice(0, 3)
              .map((d) => FIVE_CONVERSATIONS[domainToConversation[d] ?? 0])
              .filter(Boolean);

            if (!showTransitionDeepDive) {
              return (
                <div className="mt-8 rounded-2xl border-2 border-dashed border-purple-300 bg-gradient-to-br from-purple-50 to-teal-50/30 p-6 text-center">
                  <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-teal-100">
                    <Compass className="size-6 text-purple-700" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900">
                    {isEs ? "Tu Preparación para la Transición" : "Your Transition Readiness"}
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-stone-500">
                    {isEs
                      ? "Tu evaluación revela cómo manejas nuevas situaciones, buscas alineación con supervisores, y te auto-organizas. Haz clic para ver tu plan personalizado."
                      : "Your assessment reveals how you handle new situations, seek alignment with supervisors, and self-organize. Click to see your personalized action plan."
                    }
                  </p>
                  <Button
                    onClick={() => setShowTransitionDeepDive(true)}
                    className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-purple-700 to-purple-600 px-6 py-2.5 font-semibold text-white hover:shadow-lg"
                  >
                    <Compass className="size-4" />
                    {isEs ? "Ver Mi Plan de Transición" : "View Transition Plan"}
                  </Button>
                </div>
              );
            }

            return (
              <div className="mt-8 space-y-6">
                {/* Transition Score Card */}
                <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-white p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-purple-100">
                      <Compass className="size-5 text-purple-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-stone-900">
                        {isEs ? "Preparación para la Transición" : "Transition Readiness"}
                      </h3>
                      <p className="text-sm text-stone-500">
                        {transitionPct >= 75
                          ? (isEs ? "Fuerte — estás listo/a para acelerar en un nuevo rol" : "Strong — you're ready to hit the ground running")
                          : transitionPct >= 50
                          ? (isEs ? "En desarrollo — puedes fortalecerte con práctica intencional" : "Developing — you can strengthen this with intentional practice")
                          : (isEs ? "Área de crecimiento — estos pasos te ayudarán a prepararte" : "Growth area — these steps will help you prepare")}
                      </p>
                    </div>
                  </div>

                  <div className="mb-2 h-3 w-full rounded-full bg-stone-200">
                    <div
                      className="h-full rounded-full bg-purple-500 transition-all duration-500"
                      style={{ width: `${transitionPct}%` }}
                    />
                  </div>
                  <p className="text-right text-xs font-medium text-purple-700">{transitionPct}%</p>
                </div>

                {/* Five Conversations — Prioritized */}
                <div className="rounded-2xl border border-stone-200 bg-white p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Calendar className="size-5 text-teal-700" />
                    <h3 className="text-base font-bold text-stone-900">
                      {isEs ? "Tus Conversaciones Prioritarias" : "Your Priority Conversations"}
                    </h3>
                  </div>
                  <p className="mb-4 text-sm text-stone-500">
                    {isEs
                      ? "Basado en tus resultados, estas son las conversaciones más importantes que debes tener con tu supervisor en tus primeras semanas:"
                      : "Based on your results, these are the most important conversations to have with your supervisor in your first weeks:"}
                  </p>
                  <div className="space-y-3">
                    {prioritizedConversations.map((conv, i) => (
                      <div key={conv.name} className="rounded-lg border border-stone-100 bg-stone-50 p-4">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="flex size-6 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">
                            {i + 1}
                          </span>
                          <h4 className="text-sm font-bold text-stone-800">
                            {isEs ? conv.esName : conv.name}
                          </h4>
                        </div>
                        <p className="mb-2 pl-8 text-xs text-stone-500">
                          {isEs ? conv.esDescription : conv.description}
                        </p>
                        <p className="pl-8 text-xs font-medium italic text-teal-700">
                          &ldquo;{isEs ? conv.esSampleQuestion : conv.sampleQuestion}&rdquo;
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FOGLAMP Self-Assessment Checklist */}
                <div className="rounded-2xl border border-stone-200 bg-white p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <CheckCircle className="size-5 text-amber-600" />
                    <h3 className="text-base font-bold text-stone-900">
                      {isEs ? "Lista de Preparación FOGLAMP" : "FOGLAMP Readiness Checklist"}
                    </h3>
                  </div>
                  <p className="mb-4 text-sm text-stone-500">
                    {isEs
                      ? "Usa esta lista antes de tu primer día para asegurarte de que estás preparado/a:"
                      : "Use this checklist before your first day to make sure you're prepared:"}
                  </p>
                  <div className="space-y-2">
                    {FOGLAMP.map((item) => (
                      <div key={item.letter} className="flex items-start gap-3 rounded-lg p-2 hover:bg-stone-50">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-amber-100 text-xs font-bold text-amber-700">
                          {item.letter}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-stone-800">
                            {isEs ? item.esLabel : item.label}
                          </p>
                          <p className="text-xs text-stone-500">
                            {isEs ? item.esAction : item.action}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Done button */}
          <div className="mt-8 text-center">
            <Button
              onClick={onSkip}
              className="bg-gradient-to-r from-teal-700 to-amber-600 px-8 py-3 font-semibold text-white hover:shadow-lg"
            >
              {t.done}
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
            {t.questionOf(currentQuestion + 1, totalQuestions)}
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
            {locale === "es" ? getDomainName(question.domain, "es") : currentDomain?.name}
          </span>
        </div>

        {/* Scenario */}
        <div className="mb-4 rounded-lg bg-stone-50 p-4">
          <p className="text-sm font-medium leading-relaxed text-stone-700">
            {locale === "es" ? question.esScenario : question.scenario}
          </p>
        </div>

        {/* Question */}
        <h3 className="mb-4 text-lg font-bold text-stone-900">
          {locale === "es" ? question.esQuestion : question.question}
        </h3>

        {/* Answer options (shuffled to prevent gaming) */}
        <div className="space-y-3">
          {shuffledOptions.map((option) => {
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
                    {locale === "es" ? option.esText : option.text}
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
              <ChevronLeft className="size-4" /> {t.back}
            </button>
          ) : (
            <button
              onClick={onSkip}
              className="text-sm font-medium text-stone-500 hover:text-stone-700"
            >
              {t.skipAssessment}
            </button>
          )}
          <Button
            onClick={handleNext}
            disabled={!selectedOption}
            className="flex items-center gap-2 bg-gradient-to-r from-teal-700 to-amber-600 px-6 py-2.5 font-semibold text-white hover:shadow-lg disabled:opacity-50"
          >
            {currentQuestion === totalQuestions - 1 ? t.seeResults : t.next}
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
