"use client";

import { useState } from "react";
import {
  Target,
  Handshake,
  Zap,
  Sprout,
  Compass,
  CheckCircle,
  Users,
  BookOpen,
  ArrowRight,
  Download,
  MessageSquare,
  Star,
  TrendingUp,
  Calendar,
  ExternalLink,
} from "lucide-react";
import type { Manager90DaysPlan } from "@/lib/manager-90-days";
import type { DomainId } from "@/lib/career-assessment-engine";

/* ------------------------------------------------------------------ */
/*  i18n                                                                */
/* ------------------------------------------------------------------ */

const UI = {
  en: {
    planTitle: "Your 90-Day Leadership Plan",
    planSubtitle: "Personalized for your role and team situation",
    situationBadge: "Team Situation",
    coachingNote: "Your Leadership Context",
    phasesTitle: "Action Plan by Phase",
    milestoneLabel: "30-Day Milestone",
    fiveConversationsTitle: "Five Conversations to Have with Your Team",
    fiveConversationsSubtitle: "Have these structured conversations in your first 30 days — before forming conclusions",
    tryAsking: "Try asking",
    foglampTitle: "Team FOGLAMP Checklist",
    foglampSubtitle: "A structured self-assessment for your leadership transition",
    resourcesTitle: "Key Resources for Your Role",
    resourcesSubtitle: "Internal tools and intelligence built for FQHC leaders",
    downloadPlan: "Download Plan (Print)",
    domainLabels: {
      people: "People",
      strategy: "Strategy",
      execution: "Execution",
      culture: "Culture",
      growth: "Growth",
      general: "General",
      mission: "Mission",
      transition: "Transition",
    } as Record<string, string>,
    visitResource: "Open resource",
  },
  es: {
    planTitle: "Tu Plan de Liderazgo de 90 Días",
    planSubtitle: "Personalizado para tu rol y situación de equipo",
    situationBadge: "Situación del Equipo",
    coachingNote: "Tu Contexto de Liderazgo",
    phasesTitle: "Plan de Acción por Fase",
    milestoneLabel: "Hito de 30 Días",
    fiveConversationsTitle: "Cinco Conversaciones para Tener con tu Equipo",
    fiveConversationsSubtitle: "Ten estas conversaciones estructuradas en tus primeros 30 días — antes de formar conclusiones",
    tryAsking: "Intenta preguntar",
    foglampTitle: "Lista de Verificación FOGLAMP del Equipo",
    foglampSubtitle: "Una autoevaluación estructurada para tu transición de liderazgo",
    resourcesTitle: "Recursos Clave para tu Rol",
    resourcesSubtitle: "Herramientas e inteligencia internas construidas para líderes de FQHC",
    downloadPlan: "Descargar Plan (Imprimir)",
    domainLabels: {
      people: "Personas",
      strategy: "Estrategia",
      execution: "Ejecución",
      culture: "Cultura",
      growth: "Crecimiento",
      general: "General",
      mission: "Misión",
      transition: "Transición",
    } as Record<string, string>,
    visitResource: "Abrir recurso",
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Visual Helpers                                                      */
/* ------------------------------------------------------------------ */

const DOMAIN_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  people: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  strategy: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
  execution: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  culture: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  growth: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  general: { bg: "bg-stone-50", text: "text-stone-600", border: "border-stone-200" },
  mission: { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200" },
  transition: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
};

const DOMAIN_ICONS: Record<DomainId, typeof Target> = {
  mission: Target,
  people: Handshake,
  execution: Zap,
  growth: Sprout,
  transition: Compass,
};

const STARS_COLORS: Record<string, { badge: string; border: string }> = {
  startup: { badge: "bg-emerald-100 text-emerald-700", border: "border-emerald-200" },
  turnaround: { badge: "bg-red-100 text-red-700", border: "border-red-200" },
  accelerated: { badge: "bg-blue-100 text-blue-700", border: "border-blue-200" },
  realignment: { badge: "bg-amber-100 text-amber-700", border: "border-amber-200" },
  sustaining: { badge: "bg-teal-100 text-teal-700", border: "border-teal-200" },
};

const PHASE_STYLES = [
  {
    header: "bg-teal-800 text-white",
    border: "border-teal-200",
    milestone: "bg-teal-50 border-teal-300 text-teal-800",
    milestoneIcon: "text-teal-600",
    icon: Calendar,
  },
  {
    header: "bg-blue-700 text-white",
    border: "border-blue-200",
    milestone: "bg-blue-50 border-blue-300 text-blue-800",
    milestoneIcon: "text-blue-600",
    icon: TrendingUp,
  },
  {
    header: "bg-purple-700 text-white",
    border: "border-purple-200",
    milestone: "bg-purple-50 border-purple-300 text-purple-800",
    milestoneIcon: "text-purple-600",
    icon: Star,
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

interface Manager90DaysPlanProps {
  plan: Manager90DaysPlan;
  locale: string;
}

export function Manager90DaysPlanComponent({ plan, locale }: Manager90DaysPlanProps) {
  const isEs = locale === "es";
  const t = UI[isEs ? "es" : "en"];
  const tr = (obj: { en: string; es: string }) => (isEs ? obj.es : obj.en);

  const [foglampChecked, setFoglampChecked] = useState<Record<string, boolean>>({});

  const starsColors = STARS_COLORS[plan.starsType] ?? STARS_COLORS.sustaining;

  const phases = [
    plan.phases.days1to30,
    plan.phases.days31to60,
    plan.phases.days61to90,
  ];

  const handleFoglampToggle = (letter: string) => {
    setFoglampChecked((prev) => ({ ...prev, [letter]: !prev[letter] }));
  };

  const foglampComplete = plan.teamFoglamp.filter((item) => foglampChecked[item.letter]).length;

  return (
    <div className="mt-6 space-y-6">

      {/* ============================================================ */}
      {/*  Header Card                                                   */}
      {/* ============================================================ */}
      <div className="rounded-2xl bg-gradient-to-br from-teal-800 to-teal-900 p-6 shadow-lg sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">{t.planTitle}</h2>
            <p className="mt-1 text-sm text-teal-200">{t.planSubtitle}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white">
                {isEs ? plan.esRoleName : plan.roleName}
              </span>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${starsColors.badge}`}>
                {isEs ? plan.esStarsLabel : plan.starsLabel}
              </span>
            </div>
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          >
            <Download className="size-4" />
            {t.downloadPlan}
          </button>
        </div>

        {/* Coaching Note */}
        <div className={`mt-5 rounded-xl border border-white/20 bg-white/10 p-4`}>
          <p className="text-xs font-bold uppercase tracking-wider text-teal-300">{t.coachingNote}</p>
          <p className="mt-2 text-sm leading-relaxed text-white">
            {isEs ? plan.esCoachingNote : plan.coachingNote}
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  3-Phase Action Plan                                           */}
      {/* ============================================================ */}
      <div>
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-stone-400">{t.phasesTitle}</h3>
        <div className="space-y-5 sm:space-y-6">
          {phases.map((phase, phaseIndex) => {
            const style = PHASE_STYLES[phaseIndex];
            const PhaseIcon = style.icon;
            return (
              <div key={phaseIndex} className={`overflow-hidden rounded-2xl border shadow ${style.border}`}>
                {/* Phase Header */}
                <div className={`px-6 py-4 ${style.header}`}>
                  <div className="flex items-center gap-3">
                    <PhaseIcon className="size-5 opacity-80" />
                    <div>
                      <h4 className="font-bold">{isEs ? phase.esTitle : phase.title}</h4>
                      <p className="text-sm opacity-80">{isEs ? phase.esSubtitle : phase.subtitle}</p>
                    </div>
                  </div>
                </div>

                {/* Phase Actions */}
                <div className="bg-white p-5">
                  <ul className="space-y-3">
                    {phase.priorities.map((item, itemIndex) => {
                      const domainColors = DOMAIN_COLORS[item.domain] ?? DOMAIN_COLORS.general;
                      const domainLabel = t.domainLabels[item.domain] ?? item.domain;
                      return (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-stone-100 text-xs font-bold text-stone-500">
                            {itemIndex + 1}
                          </span>
                          <div className="flex-1">
                            <p className="text-sm leading-relaxed text-stone-700">
                              {isEs ? item.esText : item.text}
                            </p>
                            <span className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-[11px] font-semibold ${domainColors.bg} ${domainColors.text} ${domainColors.border}`}>
                              {domainLabel}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Milestone */}
                  <div className={`mt-5 rounded-xl border p-4 ${style.milestone}`}>
                    <div className="flex items-start gap-2">
                      <CheckCircle className={`mt-0.5 size-4 shrink-0 ${style.milestoneIcon}`} />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider opacity-70">
                          {t.milestoneLabel}
                        </p>
                        <p className="mt-1 text-sm font-medium leading-relaxed">
                          {isEs ? phase.milestone.esText : phase.milestone.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Five Conversations                                            */}
      {/* ============================================================ */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow sm:p-8">
        <h3 className="flex items-center gap-2 text-base font-bold text-stone-900">
          <MessageSquare className="size-5 text-indigo-600" />
          {t.fiveConversationsTitle}
        </h3>
        <p className="mt-1 text-xs text-stone-500">{t.fiveConversationsSubtitle}</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {plan.managerConversations.map((conv, i) => (
            <div key={i} className="rounded-xl border border-stone-200 p-4">
              <div className="flex items-center gap-2">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                  {i + 1}
                </span>
                <p className="text-sm font-bold text-stone-900">
                  {isEs ? conv.esName : conv.name}
                </p>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-stone-500">
                {isEs ? conv.esDescription : conv.description}
              </p>
              <div className="mt-3 rounded-lg bg-indigo-50 p-3">
                <p className="text-xs font-semibold text-indigo-700">{t.tryAsking}:</p>
                <blockquote className="mt-1 text-xs italic leading-relaxed text-indigo-600">
                  &ldquo;{isEs ? conv.esSampleQuestion : conv.sampleQuestion}&rdquo;
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/*  TEAM FOGLAMP Checklist                                        */}
      {/* ============================================================ */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="flex items-center gap-2 text-base font-bold text-stone-900">
              <CheckCircle className="size-5 text-green-600" />
              {t.foglampTitle}
            </h3>
            <p className="mt-1 text-xs text-stone-500">{t.foglampSubtitle}</p>
          </div>
          <div className="shrink-0 text-right">
            <span className="text-lg font-bold text-teal-700">{foglampComplete}/{plan.teamFoglamp.length}</span>
            <p className="text-xs text-stone-400">{isEs ? "completo" : "complete"}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-stone-100">
          <div
            className="h-full rounded-full bg-teal-500 transition-all duration-500"
            style={{ width: `${(foglampComplete / plan.teamFoglamp.length) * 100}%` }}
          />
        </div>

        <div className="mt-5 space-y-2">
          {plan.teamFoglamp.map((item) => {
            const checked = !!foglampChecked[item.letter];
            return (
              <button
                key={item.letter}
                onClick={() => handleFoglampToggle(item.letter)}
                className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition ${
                  checked
                    ? "border-teal-200 bg-teal-50"
                    : "border-stone-100 bg-white hover:border-stone-200 hover:bg-stone-50"
                }`}
              >
                <span className={`flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                  checked
                    ? "bg-teal-600 text-white"
                    : "bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700"
                }`}>
                  {item.letter}
                </span>
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${checked ? "text-teal-700" : "text-stone-800"}`}>
                    {isEs ? item.esLabel : item.label}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-stone-500">
                    {isEs ? item.esAction : item.action}
                  </p>
                </div>
                <div className={`mt-0.5 size-5 shrink-0 rounded-full border-2 transition ${
                  checked ? "border-teal-500 bg-teal-500" : "border-stone-300"
                }`}>
                  {checked && (
                    <svg className="size-full p-0.5 text-white" fill="currentColor" viewBox="0 0 12 12">
                      <path d="M10 3L5 8.5 2 5.5l-1 1 4 4 6-7z" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Key Resources                                                  */}
      {/* ============================================================ */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow sm:p-8">
        <h3 className="flex items-center gap-2 text-base font-bold text-stone-900">
          <BookOpen className="size-5 text-teal-600" />
          {t.resourcesTitle}
        </h3>
        <p className="mt-1 text-xs text-stone-500">{t.resourcesSubtitle}</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {plan.keyResources.map((resource, i) => (
            <a
              key={i}
              href={resource.url}
              className="group flex flex-col rounded-xl border border-stone-200 bg-teal-50 p-4 transition hover:border-teal-300 hover:bg-teal-50/80 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-bold text-teal-800 group-hover:text-teal-700">
                  {isEs ? resource.esTitle : resource.title}
                </p>
                <ExternalLink className="mt-0.5 size-3.5 shrink-0 text-teal-500 opacity-0 transition group-hover:opacity-100" />
              </div>
              <p className="mt-1.5 flex-1 text-xs leading-relaxed text-stone-600">
                {isEs ? resource.esDescription : resource.description}
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-teal-600">
                <ArrowRight className="size-3" />
                {t.visitResource}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
