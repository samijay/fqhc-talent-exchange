// PracticeMode.tsx — Interactive interview practice workflow
// Select role → get 5-7 randomized questions → type answer → reveal model → self-score → summary
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowLeft,
  Play,
  Timer,
  Eye,
  Star,
  BarChart3,
  BookOpen,
  Target,
  AlertCircle,
  CheckCircle2,
  RotateCcw,
  Zap,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  getQuestionsByRole,
  getTopQuestionsForRole,
  INTERVIEW_QUESTIONS,
  type InterviewQuestion,
  type InterviewCategory,
  CATEGORY_LABELS,
  DIFFICULTY_LABELS,
} from "@/lib/interview-prep";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PracticeAnswer {
  questionId: string;
  userAnswer: string;
  selfScore: number; // 1-5
  timeSpent: number; // seconds
  category: InterviewCategory;
}

type PracticePhase =
  | "setup"
  | "question"
  | "reveal"
  | "score"
  | "summary";

/* ------------------------------------------------------------------ */
/*  Helper: shuffle and pick N                                        */
/* ------------------------------------------------------------------ */

function shuffleAndPick<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface PracticeModeProps {
  onExit: () => void;
}

export function PracticeMode({ onExit }: PracticeModeProps) {
  const locale = useLocale();
  const isEs = locale === "es";

  // Setup state
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [questionCount, setQuestionCount] = useState(5);
  const [timedMode, setTimedMode] = useState(false);
  const [timeLimit] = useState(120); // seconds

  // Practice state
  const [phase, setPhase] = useState<PracticePhase>("setup");
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<PracticeAnswer[]>([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [, setShowModelAnswer] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentQuestion = questions[currentIndex];

  // Timer logic
  useEffect(() => {
    if (phase === "question") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTimeElapsed(0);
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, currentIndex]);

  // Auto-focus textarea
  useEffect(() => {
    if (phase === "question" && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [phase, currentIndex]);

  const startPractice = useCallback(() => {
    // Get questions for role, prioritizing top questions
    const roleQuestions = selectedRole
      ? getQuestionsByRole(selectedRole)
      : INTERVIEW_QUESTIONS;

    const topQuestions = selectedRole
      ? getTopQuestionsForRole(selectedRole)
      : [];

    // Include top questions first, then fill remaining randomly
    const topIds = new Set(topQuestions.map((q) => q.id));
    const remainingPool = roleQuestions.filter((q) => !topIds.has(q.id));
    const remaining = shuffleAndPick(
      remainingPool,
      Math.max(0, questionCount - topQuestions.length),
    );

    const selected = [
      ...shuffleAndPick(topQuestions, Math.min(topQuestions.length, questionCount)),
      ...remaining,
    ].slice(0, questionCount);

    setQuestions(selected);
    setCurrentIndex(0);
    setAnswers([]);
    setUserAnswer("");
    setPhase("question");
  }, [selectedRole, questionCount]);

  const handleReveal = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setShowModelAnswer(true);
    setPhase("reveal");
  }, []);

  const handleScore = useCallback(
    (score: number) => {
      const answer: PracticeAnswer = {
        questionId: currentQuestion.id,
        userAnswer,
        selfScore: score,
        timeSpent: timeElapsed,
        category: currentQuestion.category,
      };
      setAnswers((prev) => [...prev, answer]);

      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setUserAnswer("");
        setShowModelAnswer(false);
        setPhase("question");
      } else {
        setPhase("summary");
      }
    },
    [currentQuestion, userAnswer, timeElapsed, currentIndex, questions.length],
  );

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const isTimeUp = timedMode && timeElapsed >= timeLimit;

  // ---- SETUP SCREEN ----
  if (phase === "setup") {
    const PRACTICE_ROLES = [
      { id: "chw", en: "CHW / Promotor(a)", es: "CHW / Promotor(a)" },
      { id: "registered_nurse", en: "Registered Nurse (RN)", es: "Enfermero(a) RN" },
      { id: "care_coordinator", en: "Care Coordinator", es: "Coordinador(a) de Atención" },
      { id: "physician", en: "Physician (MD/DO)", es: "Médico (MD/DO)" },
      { id: "nurse_practitioner", en: "NP (FNP/PMHNP)", es: "NP (FNP/PMHNP)" },
      { id: "physician_assistant", en: "PA-C", es: "PA-C" },
      { id: "dentist", en: "Dentist", es: "Dentista" },
      { id: "dental_hygienist", en: "Dental Hygienist", es: "Higienista Dental" },
      { id: "dental_assistant", en: "Dental Assistant", es: "Asistente Dental" },
      { id: "pharmacist", en: "Pharmacist", es: "Farmacéutico(a)" },
      { id: "lvn", en: "LVN", es: "LVN" },
      { id: "program_manager", en: "Program Manager", es: "Gerente de Programa" },
      { id: "health_enrollment_navigator", en: "Enrollment Navigator", es: "Navegador(a) de Inscripción" },
    ];

    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-teal-200 dark:border-teal-800">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                <Play className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                  {isEs ? "Modo Práctica" : "Practice Mode"}
                </h2>
                <p className="text-sm text-stone-500 dark:text-stone-500">
                  {isEs
                    ? "Simula una entrevista real con tiempo y autoevaluación"
                    : "Simulate a real interview with timing and self-assessment"}
                </p>
              </div>
            </div>

            {/* Role Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">
                {isEs ? "1. Elige tu rol" : "1. Choose your role"}
              </label>
              <div className="flex flex-wrap gap-2">
                {PRACTICE_ROLES.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                      selectedRole === role.id
                        ? "bg-teal-700 text-white shadow-sm"
                        : "border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:border-teal-300"
                    }`}
                  >
                    {isEs ? role.es : role.en}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">
                {isEs ? "2. Número de preguntas" : "2. Number of questions"}
              </label>
              <div className="flex gap-2">
                {[3, 5, 7].map((n) => (
                  <button
                    key={n}
                    onClick={() => setQuestionCount(n)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      questionCount === n
                        ? "bg-teal-700 text-white"
                        : "border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:border-teal-300"
                    }`}
                  >
                    {n} {isEs ? "preguntas" : "questions"}
                  </button>
                ))}
              </div>
            </div>

            {/* Timer Toggle */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">
                {isEs ? "3. Modo cronometrado" : "3. Timed mode"}
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setTimedMode(false)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all flex items-center gap-2 ${
                    !timedMode
                      ? "bg-teal-700 text-white"
                      : "border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                  }`}
                >
                  {isEs ? "Sin límite" : "No limit"}
                </button>
                <button
                  onClick={() => setTimedMode(true)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all flex items-center gap-2 ${
                    timedMode
                      ? "bg-teal-700 text-white"
                      : "border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                  }`}
                >
                  <Timer className="h-4 w-4" />
                  {isEs ? "2 min por pregunta" : "2 min per question"}
                </button>
              </div>
            </div>

            {/* Start */}
            <div className="flex gap-3">
              <Button variant="ghost" onClick={onExit}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                {isEs ? "Volver" : "Back"}
              </Button>
              <Button
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white h-12 text-base"
                disabled={!selectedRole}
                onClick={startPractice}
              >
                {isEs ? "Comenzar Práctica" : "Start Practice"}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ---- QUESTION / REVEAL SCREEN ----
  if (phase === "question" || phase === "reveal") {
    const cat = CATEGORY_LABELS[currentQuestion.category];
    const diff = DIFFICULTY_LABELS[currentQuestion.difficulty];

    return (
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="mb-4">
          <div className="h-1.5 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-500 rounded-full transition-all"
              style={{
                width: `${((currentIndex + (phase === "reveal" ? 0.5 : 0)) / questions.length) * 100}%`,
              }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-stone-500">
            <span>
              {isEs ? "Pregunta" : "Question"} {currentIndex + 1}/{questions.length}
            </span>
            <span className="flex items-center gap-1">
              <Timer className="h-3 w-3" />
              {formatTime(timeElapsed)}
              {timedMode && (
                <span className={isTimeUp ? "text-red-500 font-medium" : ""}>
                  / {formatTime(timeLimit)}
                </span>
              )}
            </span>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            {/* Question header */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cat.color}`}>
                {isEs ? cat.es : cat.en}
              </span>
              <span className={`text-xs font-medium ${diff.color}`}>
                {isEs ? diff.es : diff.en}
              </span>
            </div>

            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4 leading-snug">
              {isEs ? currentQuestion.esQuestion : currentQuestion.question}
            </h3>

            {/* Timer warning */}
            {timedMode && isTimeUp && phase === "question" && (
              <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-3 text-sm text-red-700 dark:text-red-300 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {isEs ? "¡Se acabó el tiempo! Revela la respuesta modelo." : "Time's up! Reveal the model answer."}
              </div>
            )}

            {/* Answer textarea */}
            <div className="mb-4">
              <label className="block text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-500 mb-2">
                {isEs ? "Tu respuesta" : "Your answer"}
              </label>
              <textarea
                ref={textareaRef}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={phase === "reveal"}
                placeholder={
                  isEs
                    ? "Escribe tu respuesta usando la estructura STAR (Situación, Tarea, Acción, Resultado)..."
                    : "Write your answer using the STAR framework (Situation, Task, Action, Result)..."
                }
                className="w-full h-40 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 p-4 text-sm text-stone-800 dark:text-stone-200 placeholder:text-stone-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none disabled:opacity-60"
              />
              {userAnswer.length > 0 && (
                <p className="text-xs text-stone-500 mt-1 text-right">
                  {userAnswer.split(/\s+/).filter(Boolean).length} {isEs ? "palabras" : "words"}
                </p>
              )}
            </div>

            {/* Reveal button or Model Answer */}
            {phase === "question" && (
              <Button
                onClick={handleReveal}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              >
                <Eye className="h-4 w-4 mr-2" />
                {isEs ? "Revelar Respuesta Modelo" : "Reveal Model Answer"}
              </Button>
            )}

            {phase === "reveal" && (
              <div className="space-y-4">
                {/* STAR Framework */}
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4 text-teal-600" />
                    <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                      {isEs ? "Estructura STAR" : "STAR Framework"}
                    </span>
                  </div>
                  <div className="grid gap-2">
                    {[
                      {
                        label: isEs ? "Situación" : "Situation",
                        text: isEs ? currentQuestion.starTip.esSituation : currentQuestion.starTip.situation,
                      },
                      {
                        label: isEs ? "Tarea" : "Task",
                        text: isEs ? currentQuestion.starTip.esTask : currentQuestion.starTip.task,
                      },
                      {
                        label: isEs ? "Acción" : "Action",
                        text: isEs ? currentQuestion.starTip.esAction : currentQuestion.starTip.action,
                      },
                      {
                        label: isEs ? "Resultado" : "Result",
                        text: isEs ? currentQuestion.starTip.esResult : currentQuestion.starTip.result,
                      },
                    ].map(({ label, text }) => (
                      <div key={label} className="flex gap-3 rounded-lg bg-stone-50 dark:bg-stone-800/50 p-3">
                        <span className="w-20 shrink-0 pt-0.5 text-xs font-bold uppercase tracking-wide text-teal-700 dark:text-teal-400">
                          {label}
                        </span>
                        <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strong answer */}
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-teal-600" />
                    <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                      {isEs ? "Ejemplo de Respuesta Fuerte" : "Strong Answer Example"}
                    </span>
                  </div>
                  <blockquote className="rounded-r-lg border-l-4 border-teal-400 bg-teal-50 dark:bg-teal-950/30 py-3 pl-4 pr-3">
                    <p className="text-sm italic leading-relaxed text-teal-900 dark:text-teal-200">
                      &ldquo;{isEs ? currentQuestion.esStrongAnswerExample : currentQuestion.strongAnswerExample}&rdquo;
                    </p>
                  </blockquote>
                </div>

                {/* Red flags */}
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                      {isEs ? "Qué Evitar" : "What to Avoid"}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {(isEs ? currentQuestion.esRedFlags : currentQuestion.redFlags).map((flag, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-stone-600 dark:text-stone-500">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-red-400" />
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Self-score */}
                <div className="border-t border-stone-200 dark:border-stone-700 pt-4">
                  <p className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">
                    {isEs
                      ? "¿Cómo calificas tu respuesta?"
                      : "How would you rate your answer?"}
                  </p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((score) => {
                      const labels = isEs
                        ? ["Necesito ayuda", "Débil", "Aceptable", "Buena", "Excelente"]
                        : ["Need help", "Weak", "OK", "Good", "Excellent"];
                      const colors = [
                        "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300",
                        "bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-300",
                        "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300",
                        "bg-teal-100 text-teal-700 hover:bg-teal-200 dark:bg-teal-900/30 dark:text-teal-300",
                        "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300",
                      ];

                      return (
                        <button
                          key={score}
                          onClick={() => handleScore(score)}
                          className={`flex-1 rounded-lg py-2 px-1 text-center transition-all ${colors[score - 1]}`}
                        >
                          <div className="text-lg font-bold">{score}</div>
                          <div className="text-xs font-medium leading-tight">
                            {labels[score - 1]}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // ---- SUMMARY SCREEN ----
  if (phase === "summary") {
    const avgScore = answers.reduce((sum, a) => sum + a.selfScore, 0) / answers.length;
    const totalTime = answers.reduce((sum, a) => sum + a.timeSpent, 0);
    const avgTime = totalTime / answers.length;

    // Category breakdown
    const categoryScores: Record<string, { total: number; count: number }> = {};
    answers.forEach((a) => {
      if (!categoryScores[a.category]) {
        categoryScores[a.category] = { total: 0, count: 0 };
      }
      categoryScores[a.category].total += a.selfScore;
      categoryScores[a.category].count += 1;
    });

    const strengths: { category: InterviewCategory; avg: number }[] = [];
    const weakAreas: { category: InterviewCategory; avg: number }[] = [];

    Object.entries(categoryScores).forEach(([cat, data]) => {
      const avg = data.total / data.count;
      if (avg >= 4) strengths.push({ category: cat as InterviewCategory, avg });
      else if (avg <= 2.5) weakAreas.push({ category: cat as InterviewCategory, avg });
    });

    // Score distribution
    const distribution = [0, 0, 0, 0, 0];
    answers.forEach((a) => {
      distribution[a.selfScore - 1]++;
    });

    return (
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Results header */}
        <Card className="border-teal-200 dark:border-teal-800 bg-gradient-to-br from-teal-50 to-white dark:from-teal-950/30 dark:to-stone-900">
          <CardContent className="p-6 text-center">
            <BarChart3 className="h-10 w-10 text-teal-600 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">
              {isEs ? "Resultados de Práctica" : "Practice Results"}
            </h2>
            <p className="text-stone-500 dark:text-stone-500 mb-4">
              {isEs
                ? `${answers.length} preguntas completadas en ${formatTime(totalTime)}`
                : `${answers.length} questions completed in ${formatTime(totalTime)}`}
            </p>

            {/* Key metrics */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="rounded-lg bg-white dark:bg-stone-800 p-3 shadow-sm">
                <div className="text-2xl font-bold text-teal-700 dark:text-teal-400">
                  {avgScore.toFixed(1)}
                </div>
                <div className="text-xs text-stone-500">{isEs ? "Promedio" : "Average"} /5</div>
              </div>
              <div className="rounded-lg bg-white dark:bg-stone-800 p-3 shadow-sm">
                <div className="text-2xl font-bold text-stone-700 dark:text-stone-300">
                  {formatTime(Math.round(avgTime))}
                </div>
                <div className="text-xs text-stone-500">{isEs ? "Tiempo promedio" : "Avg time"}</div>
              </div>
              <div className="rounded-lg bg-white dark:bg-stone-800 p-3 shadow-sm">
                <div className="text-2xl font-bold text-stone-700 dark:text-stone-300">
                  {answers.filter((a) => a.selfScore >= 4).length}/{answers.length}
                </div>
                <div className="text-xs text-stone-500">{isEs ? "Buenas+" : "Good+"}</div>
              </div>
            </div>

            {/* Score distribution bar */}
            <div className="flex gap-1 h-6 rounded-full overflow-hidden">
              {distribution.map((count, i) => {
                const colors = [
                  "bg-red-400",
                  "bg-orange-400",
                  "bg-amber-400",
                  "bg-teal-400",
                  "bg-green-400",
                ];
                const width = (count / answers.length) * 100;
                if (width === 0) return null;
                return (
                  <div
                    key={i}
                    className={`${colors[i]} flex items-center justify-center text-xs font-bold text-white`}
                    style={{ width: `${width}%` }}
                  >
                    {count > 0 ? count : ""}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-stone-500 mt-1">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </CardContent>
        </Card>

        {/* Strengths & Weak Areas */}
        <div className="grid gap-4 sm:grid-cols-2">
          {strengths.length > 0 && (
            <Card className="border-green-200 dark:border-green-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-800 dark:text-green-300">
                    {isEs ? "Fortalezas" : "Strengths"}
                  </span>
                </div>
                <ul className="space-y-2">
                  {strengths.map(({ category, avg }) => {
                    const cat = CATEGORY_LABELS[category];
                    return (
                      <li key={category} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                        <span className="text-sm text-stone-700 dark:text-stone-300">
                          {isEs ? cat.es : cat.en}
                        </span>
                        <span className="ml-auto text-xs font-medium text-green-600">
                          {avg.toFixed(1)}/5
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          )}

          {weakAreas.length > 0 && (
            <Card className="border-amber-200 dark:border-amber-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingDown className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                    {isEs ? "Áreas de Mejora" : "Areas to Improve"}
                  </span>
                </div>
                <ul className="space-y-2">
                  {weakAreas.map(({ category, avg }) => {
                    const cat = CATEGORY_LABELS[category];
                    return (
                      <li key={category} className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                        <span className="text-sm text-stone-700 dark:text-stone-300">
                          {isEs ? cat.es : cat.en}
                        </span>
                        <span className="ml-auto text-xs font-medium text-amber-600">
                          {avg.toFixed(1)}/5
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Per-question breakdown */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">
              {isEs ? "Detalle por Pregunta" : "Question Breakdown"}
            </h3>
            <div className="space-y-2">
              {answers.map((answer, i) => {
                const q = questions.find((q) => q.id === answer.questionId)!;
                const cat = CATEGORY_LABELS[answer.category];
                const scoreColor =
                  answer.selfScore >= 4
                    ? "text-green-600"
                    : answer.selfScore >= 3
                      ? "text-amber-600"
                      : "text-red-600";

                return (
                  <div
                    key={answer.questionId}
                    className="flex items-center gap-3 rounded-lg bg-stone-50 dark:bg-stone-800/50 p-3"
                  >
                    <span className="text-xs font-bold text-stone-500 w-5 shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-stone-700 dark:text-stone-300 truncate">
                        {isEs ? q.esQuestion : q.question}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-xs font-medium rounded-full px-1.5 py-0.5 ${cat.color}`}>
                          {isEs ? cat.es : cat.en}
                        </span>
                        <span className="text-xs text-stone-500">
                          {formatTime(answer.timeSpent)}
                        </span>
                      </div>
                    </div>
                    <div className={`text-lg font-bold ${scoreColor} shrink-0`}>
                      {answer.selfScore}/5
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recommended next steps */}
        <Card className="border-teal-200 dark:border-teal-800">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4 text-teal-600" />
              {isEs ? "Próximos Pasos" : "Next Steps"}
            </h3>
            <div className="space-y-2">
              {weakAreas.length > 0 && (
                <Link
                  href="/strategy/okr-course"
                  className="flex items-center gap-3 rounded-lg bg-teal-50 dark:bg-teal-950/30 p-3 transition-all hover:bg-teal-100 dark:hover:bg-teal-950/50"
                >
                  <BookOpen className="h-5 w-5 text-teal-600 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-teal-800 dark:text-teal-200">
                      {isEs ? "Cursos de la Academia" : "Academy Courses"}
                    </p>
                    <p className="text-xs text-teal-600 dark:text-teal-400">
                      {isEs
                        ? "Fortalece tus áreas débiles con ejercicios interactivos"
                        : "Strengthen weak areas with interactive exercises"}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-teal-500" />
                </Link>
              )}
              <Link
                href="/salary-data"
                className="flex items-center gap-3 rounded-lg bg-stone-50 dark:bg-stone-800/50 p-3 transition-all hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                <Star className="h-5 w-5 text-amber-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
                    {isEs ? "Datos Salariales" : "Salary Data"}
                  </p>
                  <p className="text-xs text-stone-500">
                    {isEs
                      ? "Prepara tu negociación con datos reales"
                      : "Prepare your negotiation with real data"}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-stone-500" />
              </Link>
              <Link
                href="/resume-builder"
                className="flex items-center gap-3 rounded-lg bg-stone-50 dark:bg-stone-800/50 p-3 transition-all hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                <Target className="h-5 w-5 text-indigo-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
                    {isEs ? "Creador de CV" : "Resume Builder"}
                  </p>
                  <p className="text-xs text-stone-500">
                    {isEs
                      ? "Tu CV debe reflejar lo que practicaste aquí"
                      : "Your resume should reflect what you practiced here"}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-stone-500" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onExit}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            {isEs ? "Guía de Referencia" : "Reference Guide"}
          </Button>
          <Button
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
            onClick={() => {
              setPhase("setup");
              setAnswers([]);
              setCurrentIndex(0);
              setUserAnswer("");
              setShowModelAnswer(false);
            }}
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            {isEs ? "Practicar de Nuevo" : "Practice Again"}
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
