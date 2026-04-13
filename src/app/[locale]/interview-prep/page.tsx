"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ChevronDown,
  ChevronUp,
  BookOpen,
  DollarSign,
  Target,
  AlertCircle,
  MessageSquare,
  Star,
  ArrowRight,
  Lightbulb,
  User,
  CheckCircle,
  Play,
} from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/ui/design-system";
import {
  INTERVIEW_QUESTIONS,
  CATEGORY_LABELS,
  DIFFICULTY_LABELS,
  getQuestionsByRole,
  getRoleGuide,
  type InterviewCategory,
  type InterviewQuestion,
  type RoleInterviewGuide,
} from "@/lib/interview-prep";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import { PracticeMode } from "@/components/interview-prep/PracticeMode";
import { TableOfContents } from "@/components/layout/TableOfContents";

/* ------------------------------------------------------------------ */
/*  Role and Category Configs                                          */
/* ------------------------------------------------------------------ */

const ROLES = [
  { id: "all", en: "All Roles", es: "Todos los Roles" },
  // ── Provider Roles ──
  { id: "physician", en: "Physician (MD/DO)", es: "Médico (MD/DO)" },
  { id: "nurse_practitioner", en: "Nurse Practitioner (NP/FNP)", es: "Enfermero(a) Practicante (NP)" },
  { id: "psychiatric_np", en: "Psychiatric NP (PMHNP)", es: "NP Psiquiátrico (PMHNP)" },
  { id: "physician_assistant", en: "Physician Assistant (PA-C)", es: "Asistente del Médico (PA-C)" },
  { id: "dentist", en: "Dentist (DMD/DDS)", es: "Dentista (DMD/DDS)" },
  // ── Dental ──
  { id: "dental_hygienist", en: "Dental Hygienist (RDH)", es: "Higienista Dental (RDH)" },
  { id: "dental_assistant", en: "Dental Assistant (RDA/EDDA)", es: "Asistente Dental (RDA/EDDA)" },
  // ── Pharmacy ──
  { id: "pharmacist", en: "Pharmacist (PharmD)", es: "Farmacéutico(a) (PharmD)" },
  { id: "pharmacy_technician", en: "Pharmacy Technician (CPhT)", es: "Técnico de Farmacia (CPhT)" },
  // ── Clinical & Nursing ──
  { id: "registered_nurse", en: "Registered Nurse (RN)", es: "Enfermero(a) RN" },
  { id: "lvn", en: "Licensed Vocational Nurse (LVN)", es: "Enfermero(a) Vocacional (LVN)" },
  // ── Community & Care ──
  { id: "chw", en: "CHW / Promotor(a)", es: "CHW / Promotor(a)" },
  { id: "care_coordinator", en: "Care Coordinator", es: "Coordinador(a) de Atención" },
  { id: "health_enrollment_navigator", en: "Health Enrollment Navigator", es: "Navegador(a) de Inscripción" },
  // ── Admin & Operations ──
  { id: "program_manager", en: "Program Manager", es: "Gerente de Programa" },
];

const CATEGORIES: { id: InterviewCategory | "all"; en: string; es: string }[] = [
  { id: "all", en: "All Questions", es: "Todas las Preguntas" },
  { id: "mission", en: "Mission Fit", es: "Misión" },
  { id: "behavioral", en: "Behavioral", es: "Conductual" },
  { id: "clinical", en: "Clinical", es: "Clínico" },
  { id: "team", en: "Teamwork", es: "Equipo" },
  { id: "situational", en: "Situational", es: "Situacional" },
  { id: "culture", en: "Culture Fit", es: "Cultura" },
];

/* ------------------------------------------------------------------ */
/*  QuestionCard Component                                             */
/* ------------------------------------------------------------------ */

function QuestionCard({
  q,
  isEs,
  isTopQuestion,
  isReviewed,
  onToggleReviewed,
}: {
  q: InterviewQuestion;
  isEs: boolean;
  isTopQuestion: boolean;
  isReviewed: boolean;
  onToggleReviewed: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const cat = CATEGORY_LABELS[q.category];
  const diff = DIFFICULTY_LABELS[q.difficulty];

  return (
    <div
      className={`rounded-xl border bg-white dark:bg-stone-900 shadow-sm transition-shadow hover:shadow-md ${
        isTopQuestion ? "border-teal-300 ring-1 ring-teal-200" : "border-stone-200 dark:border-stone-700"
      }`}
    >
      {isTopQuestion && (
        <div className="flex items-center gap-1.5 rounded-t-xl bg-teal-50 dark:bg-teal-950 px-4 py-2 text-xs font-semibold text-teal-700 dark:text-teal-400">
          <Star className="size-3.5 fill-teal-500 text-teal-500" />
          {isEs ? "Pregunta Clave para Este Rol" : "Top Question for This Role"}
        </div>
      )}

      <button
        className="w-full px-5 py-4 text-left"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cat.color}`}
              >
                {isEs ? cat.es : cat.en}
              </span>
              <span className={`text-xs font-medium ${diff.color}`}>
                {isEs ? diff.es : diff.en}
              </span>
            </div>
            <p className="text-base font-semibold leading-snug text-stone-900 dark:text-stone-100">
              {isEs ? q.esQuestion : q.question}
            </p>
          </div>
          <div className="mt-1 flex-shrink-0 text-stone-500 dark:text-stone-400">
            {expanded ? (
              <ChevronUp className="size-5" />
            ) : (
              <ChevronDown className="size-5" />
            )}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="space-y-5 border-t border-stone-100 dark:border-stone-800 px-5 pb-5 pt-4">
          {/* Why They Ask This */}
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Lightbulb className="size-4 text-amber-600" />
              <span className="text-sm font-semibold text-amber-800">
                {isEs ? "Por Qué Lo Preguntan" : "Why They Ask This"}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-amber-900">
              {isEs ? q.esWhyAsked : q.whyAsked}
            </p>
          </div>

          {/* STAR Framework */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Target className="size-4 text-teal-600" />
              <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                {isEs ? "Estructura STAR" : "STAR Framework"}
              </span>
            </div>
            <div className="grid gap-2">
              {[
                {
                  label: isEs ? "Situación" : "Situation",
                  text: isEs ? q.starTip.esSituation : q.starTip.situation,
                },
                {
                  label: isEs ? "Tarea" : "Task",
                  text: isEs ? q.starTip.esTask : q.starTip.task,
                },
                {
                  label: isEs ? "Acción" : "Action",
                  text: isEs ? q.starTip.esAction : q.starTip.action,
                },
                {
                  label: isEs ? "Resultado" : "Result",
                  text: isEs ? q.starTip.esResult : q.starTip.result,
                },
              ].map(({ label, text }) => (
                <div key={label} className="flex gap-3 rounded-lg bg-stone-50 dark:bg-stone-950 p-3">
                  <span className="w-20 flex-shrink-0 pt-0.5 text-xs font-bold uppercase tracking-wide text-teal-700 dark:text-teal-400">
                    {label}
                  </span>
                  <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Strong Answer Example */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <BookOpen className="size-4 text-teal-600" />
              <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                {isEs ? "Ejemplo de Respuesta Fuerte" : "Strong Answer Example"}
              </span>
            </div>
            <blockquote className="rounded-r-lg border-l-4 border-teal-400 bg-teal-50 dark:bg-teal-950 py-3 pl-4 pr-3">
              <p className="text-sm italic leading-relaxed text-teal-900">
                &ldquo;{isEs ? q.esStrongAnswerExample : q.strongAnswerExample}&rdquo;
              </p>
            </blockquote>
          </div>

          {/* Red Flags */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <AlertCircle className="size-4 text-red-500" />
              <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                {isEs ? "Banderas Rojas (Qué Evitar)" : "Red Flags (What to Avoid)"}
              </span>
            </div>
            <ul className="space-y-1.5">
              {(isEs ? q.esRedFlags : q.redFlags).map((flag, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-stone-700 dark:text-stone-300">
                  <span className="mt-1.5 size-1.5 flex-shrink-0 rounded-full bg-red-400" />
                  {flag}
                </li>
              ))}
            </ul>
          </div>

          {/* Follow-up Questions */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <MessageSquare className="size-4 text-stone-500 dark:text-stone-400" />
              <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                {isEs
                  ? "Posibles Preguntas de Seguimiento"
                  : "Likely Follow-up Questions"}
              </span>
            </div>
            <ul className="space-y-1.5">
              {(isEs ? q.esFollowUpQuestions : q.followUpQuestions).map((fq, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-stone-600 dark:text-stone-400">
                  <span className="mt-0.5 text-stone-500 dark:text-stone-400">→</span>
                  {fq}
                </li>
              ))}
            </ul>
          </div>

          {/* Mark as reviewed */}
          <div className="flex justify-end pt-2 border-t border-stone-100 dark:border-stone-800">
            <button
              onClick={(e) => { e.stopPropagation(); onToggleReviewed(); }}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                isReviewed
                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                  : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200"
              }`}
            >
              <CheckCircle className={`size-3.5 ${isReviewed ? "fill-emerald-500 text-emerald-500" : ""}`} />
              {isReviewed
                ? (isEs ? "Revisado" : "Reviewed")
                : (isEs ? "Marcar como revisado" : "Mark as reviewed")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  RoleGuideCard Component                                            */
/* ------------------------------------------------------------------ */

function RoleGuideCard({
  guide,
  isEs,
}: {
  guide: RoleInterviewGuide;
  isEs: boolean;
}) {
  return (
    <div className="rounded-xl border border-teal-200 bg-teal-50 dark:bg-teal-950 p-5 space-y-4">
      <div className="flex items-center gap-2">
        <User className="size-5 text-teal-700 dark:text-teal-400" />
        <h2 className="font-bold text-teal-900">
          {isEs ? guide.esRoleName : guide.roleName}
        </h2>
        <span className="ml-auto rounded-full bg-teal-100 dark:bg-teal-900 px-2 py-0.5 text-xs font-medium text-teal-700 dark:text-teal-400">
          {isEs ? "Guía de Rol" : "Role Guide"}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Interview Format */}
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-teal-600">
            {isEs ? "Formato de Entrevista" : "Interview Format"}
          </p>
          <p className="text-sm leading-relaxed text-teal-800">
            {isEs ? guide.interviewFormat.es : guide.interviewFormat.en}
          </p>
        </div>

        {/* Key Themes */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-teal-600">
            {isEs ? "Temas Clave que Evaluarán" : "Key Themes They'll Probe"}
          </p>
          <ul className="space-y-1">
            {guide.keyThemes.map((theme, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-teal-800">
                <CheckCircle className="size-3.5 mt-0.5 flex-shrink-0 text-teal-500" />
                {isEs ? theme.es : theme.en}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {/* FQHC Insider Tip */}
        <div className="rounded-lg bg-white/70 p-3">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-teal-600">
            {isEs ? "Tip FQHC Exclusivo" : "FQHC Insider Tip"}
          </p>
          <p className="text-sm leading-relaxed text-teal-900">
            {isEs ? guide.fqhcSpecificTip.es : guide.fqhcSpecificTip.en}
          </p>
        </div>

        {/* Salary Negotiation */}
        <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950 p-3">
          <div className="mb-1 flex items-center gap-1.5">
            <DollarSign className="size-3.5 text-amber-600" />
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
              {isEs ? "Negociación Salarial" : "Salary Negotiation"}
            </p>
          </div>
          <p className="text-sm leading-relaxed text-amber-900">
            {isEs ? guide.salaryNegotiationTip.es : guide.salaryNegotiationTip.en}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function InterviewPrepPage() {
  const locale = useLocale();
  const isEs = locale === "es";

  const [mode, setMode] = useState<"reference" | "practice">("reference");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<
    InterviewCategory | "all"
  >("all");

  // ── Progress tracking ──────────────────────────────────────────────
  const PROGRESS_KEY = "fqhc-interview-prep-reviewed";
  const [reviewedIds, setReviewedIds] = useState<Set<string>>(new Set());

  // Restore reviewed questions from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_KEY);
      if (saved) setReviewedIds(new Set(JSON.parse(saved)));
    } catch { /* noop */ }
  }, []);

  // Persist reviewed questions
  const toggleReviewed = useCallback((id: string) => {
    setReviewedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      try { localStorage.setItem(PROGRESS_KEY, JSON.stringify([...next])); } catch { /* noop */ }
      return next;
    });
  }, []);

  // Filter questions by role
  const roleQuestions =
    selectedRole === "all"
      ? INTERVIEW_QUESTIONS
      : getQuestionsByRole(selectedRole);

  // Filter by category
  const filteredQuestions =
    selectedCategory === "all"
      ? roleQuestions
      : roleQuestions.filter((q) => q.category === selectedCategory);

  // Top question IDs for the selected role
  const topQuestionIds =
    selectedRole !== "all"
      ? (getRoleGuide(selectedRole)?.topQuestions ?? [])
      : [];

  // Role guide
  const roleGuide = selectedRole !== "all" ? getRoleGuide(selectedRole) : null;

  // Sort: top questions first, then by difficulty (entry → mid → senior)
  const diffOrder = { entry: 0, mid: 1, senior: 2 };
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    const aTop = topQuestionIds.includes(a.id) ? 0 : 1;
    const bTop = topQuestionIds.includes(b.id) ? 0 : 1;
    if (aTop !== bTop) return aTop - bTop;
    return diffOrder[a.difficulty] - diffOrder[b.difficulty];
  });

  const tocItems = [
    { id: "role-selector", label: isEs ? "Selecciona Tu Rol" : "Select Your Role" },
    { id: "category-filter", label: isEs ? "Filtrar por Categoría" : "Filter by Category" },
    { id: "questions", label: isEs ? "Preguntas" : "Questions" },
    { id: "related-tools", label: isEs ? "Completa Tu Preparación" : "Complete Your Prep" },
  ];

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <Breadcrumb items={[
        { label: isEs ? "Inicio" : "Home", href: "/" },
        { label: isEs ? "Herramientas" : "Tools", href: "/interview-prep" },
        { label: isEs ? "Preparaci\u00f3n para Entrevistas" : "Interview Prep" },
      ]} />
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700 text-white">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center rounded-full bg-teal-700 px-3 py-1 text-xs font-semibold text-teal-200">
              {isEs ? "Gratis · Específico para FQHC · CA" : "Free · FQHC-Specific · CA"}
            </span>
            <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {isEs
                ? "Preparación para Entrevistas FQHC"
                : "FQHC Interview Prep Tool"}
            </h1>
            <p className="mb-6 text-lg leading-relaxed text-teal-200">
              {isEs
                ? "10 preguntas reales con la estructura STAR, ejemplos de respuestas fuertes y banderas rojas — diseñado específicamente para roles de FQHCs en California."
                : "10 real questions with STAR framework, strong answer examples, and red flags — built specifically for California FQHC roles."}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-teal-300 mb-6">
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-teal-400" />
                {isEs ? "10 preguntas FQHC" : "10 FQHC-specific questions"}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-teal-400" />
                {isEs
                  ? "Guías de rol (CHW, RN, Coordinador)"
                  : "Role guides (CHW, RN, Coordinator)"}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-teal-400" />
                {isEs ? "Tips de negociación salarial" : "Salary negotiation tips"}
              </span>
            </div>

            {/* Mode Toggle */}
            <div className="inline-flex rounded-lg bg-teal-800/50 p-1">
              <button
                onClick={() => setMode("reference")}
                className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                  mode === "reference"
                    ? "bg-white dark:bg-stone-900 text-teal-800 shadow-sm"
                    : "text-teal-200 hover:text-white"
                }`}
              >
                <BookOpen className="size-4" />
                {isEs ? "Guía de Referencia" : "Reference Guide"}
              </button>
              <button
                onClick={() => setMode("practice")}
                className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                  mode === "practice"
                    ? "bg-white dark:bg-stone-900 text-teal-800 shadow-sm"
                    : "text-teal-200 hover:text-white"
                }`}
              >
                <Play className="size-4" />
                {isEs ? "Modo Práctica" : "Practice Mode"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TOC */}
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="absolute right-4 top-10 sm:right-6 lg:right-8">
          <TableOfContents items={tocItems} title={isEs ? "En esta página" : "On this page"} />
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Practice Mode */}
        {mode === "practice" && (
          <PracticeMode onExit={() => setMode("reference")} />
        )}

        {/* Reference Mode */}
        {mode === "reference" && <>
        {/* Step 1: Role Selector */}
        <div id="role-selector" className="mb-8 scroll-mt-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
            {isEs ? "1. Selecciona Tu Rol" : "1. Select Your Role"}
          </p>
          <div className="flex flex-wrap gap-2">
            {ROLES.map((role) => (
              <button
                key={role.id}
                onClick={() => {
                  setSelectedRole(role.id);
                  setSelectedCategory("all");
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selectedRole === role.id
                    ? "bg-teal-700 text-white shadow-sm"
                    : "border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-teal-300 hover:text-teal-700 dark:text-teal-400"
                }`}
              >
                {isEs ? role.es : role.en}
              </button>
            ))}
          </div>
        </div>

        {/* Role Guide Card (when a specific role is selected) */}
        {roleGuide && (
          <div className="mb-8">
            <RoleGuideCard guide={roleGuide} isEs={isEs} />
          </div>
        )}

        {/* Step 2: Category Filter */}
        <div id="category-filter" className="mb-6 scroll-mt-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
            {isEs ? "2. Filtra por Categoría" : "2. Filter by Category"}
          </p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const count =
                cat.id === "all"
                  ? roleQuestions.length
                  : roleQuestions.filter((q) => q.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() =>
                    setSelectedCategory(cat.id as InterviewCategory | "all")
                  }
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-stone-800 text-white"
                      : "border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:border-stone-400"
                  }`}
                >
                  {isEs ? cat.es : cat.en}
                  <span className="ml-1.5 opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Questions */}
        <div id="questions" className="mb-10 scroll-mt-20">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
              {isEs
                ? `3. Practica las Preguntas (${sortedQuestions.length})`
                : `3. Practice the Questions (${sortedQuestions.length})`}
            </p>
            {reviewedIds.size > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                <CheckCircle className="size-3.5 fill-emerald-500 text-emerald-500" />
                {reviewedIds.size} {isEs ? "revisadas" : "reviewed"}
              </span>
            )}
          </div>

          {sortedQuestions.length === 0 ? (
            <div className="rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-8 text-center text-stone-500 dark:text-stone-400">
              {isEs
                ? "No hay preguntas para esta combinación. Intenta cambiar el filtro."
                : "No questions match this filter. Try changing the category."}
            </div>
          ) : (
            <div className="space-y-3">
              {sortedQuestions.map((q) => (
                <QuestionCard
                  key={q.id}
                  q={q}
                  isEs={isEs}
                  isTopQuestion={topQuestionIds.includes(q.id)}
                  isReviewed={reviewedIds.has(q.id)}
                  onToggleReviewed={() => toggleReviewed(q.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Related Tools */}
        <div id="related-tools" className="mb-10 border-t border-stone-200 dark:border-stone-700 pt-10 scroll-mt-20">
          <h2 className="mb-4 text-lg font-bold text-stone-900 dark:text-stone-100">
            {isEs ? "Completa Tu Preparación" : "Complete Your Interview Prep"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/salary-data"
              className="group flex flex-col gap-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-5 transition-all hover:border-teal-300 hover:shadow-sm"
            >
              <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400">
                <DollarSign className="size-5" />
                <span className="text-sm font-semibold">
                  {isEs ? "Datos Salariales" : "Salary Data"}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                {isEs
                  ? "P25/P50/P75 por rol y región. Entra sabiendo tu número."
                  : "P25/P50/P75 by role and region. Walk in knowing your number."}
              </p>
              <span className="mt-1 flex items-center gap-1 text-xs font-medium text-teal-600 transition-all group-hover:gap-2">
                {isEs ? "Ver datos" : "View benchmarks"}{" "}
                <ArrowRight className="size-3.5" />
              </span>
            </Link>

            <Link
              href="/career-insights"
              className="group flex flex-col gap-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-5 transition-all hover:border-teal-300 hover:shadow-sm"
            >
              <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400">
                <Target className="size-5" />
                <span className="text-sm font-semibold">
                  {isEs ? "Evaluación de Carrera" : "Career Assessment"}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                {isEs
                  ? "Descubre tus fortalezas antes de la entrevista. Plan de 90 días incluido."
                  : "Know your strengths before the interview. 90-day plan included."}
              </p>
              <span className="mt-1 flex items-center gap-1 text-xs font-medium text-teal-600 transition-all group-hover:gap-2">
                {isEs ? "Tomar evaluación" : "Take assessment"}{" "}
                <ArrowRight className="size-3.5" />
              </span>
            </Link>

            <Link
              href="/resume-builder"
              className="group flex flex-col gap-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-5 transition-all hover:border-teal-300 hover:shadow-sm"
            >
              <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400">
                <BookOpen className="size-5" />
                <span className="text-sm font-semibold">
                  {isEs ? "Creador de CV" : "Resume Builder"}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                {isEs
                  ? "Plantillas específicas para FQHC. Descarga en PDF gratis."
                  : "FQHC-specific templates. Free PDF download."}
              </p>
              <span className="mt-1 flex items-center gap-1 text-xs font-medium text-teal-600 transition-all group-hover:gap-2">
                {isEs ? "Crear CV" : "Build resume"} <ArrowRight className="size-3.5" />
              </span>
            </Link>
          </div>
        </div>

        {/* Newsletter CTA */}
        <NewsletterSignup variant="banner" defaultAudience="the-pulse" />
        </>}
      </div>
    </main>
  );
}
