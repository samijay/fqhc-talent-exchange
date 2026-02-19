"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import {
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  ClipboardList,
  Lightbulb,
  Target,
  Users,
  Zap,
  Sprout,
  Download,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { First90DaysPlan as First90DaysPlanType, PlanItem } from "@/lib/first-90-days";

/* ------------------------------------------------------------------ */
/*  i18n strings                                                       */
/* ------------------------------------------------------------------ */

const UI = {
  en: {
    title: "Your First 90 Days Plan",
    subtitle: "A personalized transition roadmap based on your assessment results and role",
    starsLabel: "Your Transition Context",
    phaseLabel: (n: number) => `Phase ${n}`,
    milestone: "Milestone",
    fiveConversationsTitle: "The 5 Conversations to Have With Your Manager",
    fiveConversationsSubtitle: "Schedule these within your first 30 days to set yourself up for success",
    sampleQuestion: "Try asking",
    foglampTitle: "FOGLAMP Onboarding Checklist",
    foglampSubtitle: "Use this framework to organize your first month",
    coachingTitle: "Personalized Coaching Note",
    downloadPlan: "Download Plan",
    domainLabel: (domain: string) => {
      const map: Record<string, string> = {
        mission: "Mission",
        people: "People",
        execution: "Execution",
        growth: "Growth",
        general: "General",
      };
      return map[domain] || domain;
    },
  },
  es: {
    title: "Tu Plan de los Primeros 90 Dias",
    subtitle: "Una hoja de ruta de transicion personalizada basada en tus resultados de evaluacion y rol",
    starsLabel: "Tu Contexto de Transicion",
    phaseLabel: (n: number) => `Fase ${n}`,
    milestone: "Hito",
    fiveConversationsTitle: "Las 5 Conversaciones Que Tener Con Tu Gerente",
    fiveConversationsSubtitle: "Programalas dentro de tus primeros 30 dias para prepararte para el exito",
    sampleQuestion: "Intenta preguntar",
    foglampTitle: "Lista de Verificacion FOGLAMP",
    foglampSubtitle: "Usa este marco para organizar tu primer mes",
    coachingTitle: "Nota de Coaching Personalizada",
    downloadPlan: "Descargar Plan",
    domainLabel: (domain: string) => {
      const map: Record<string, string> = {
        mission: "Mision",
        people: "Personas",
        execution: "Ejecucion",
        growth: "Crecimiento",
        general: "General",
      };
      return map[domain] || domain;
    },
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Domain icons & colors                                              */
/* ------------------------------------------------------------------ */

const DOMAIN_ICON_MAP: Record<string, typeof Target> = {
  mission: Target,
  people: Users,
  execution: Zap,
  growth: Sprout,
  general: BookOpen,
};

const DOMAIN_COLOR_MAP: Record<string, { bg: string; text: string; border: string }> = {
  mission: { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200" },
  people: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  execution: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  growth: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  general: { bg: "bg-stone-50", text: "text-stone-700", border: "border-stone-200" },
};

/* ------------------------------------------------------------------ */
/*  Phase colors                                                       */
/* ------------------------------------------------------------------ */

const PHASE_STYLES = [
  { gradient: "from-teal-500 to-teal-600", bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-700", accent: "bg-teal-600" },
  { gradient: "from-blue-500 to-blue-600", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", accent: "bg-blue-600" },
  { gradient: "from-amber-500 to-amber-600", bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", accent: "bg-amber-600" },
];

/* ------------------------------------------------------------------ */
/*  Priority Item                                                      */
/* ------------------------------------------------------------------ */

function PriorityItem({ item, locale }: { item: PlanItem; locale: string }) {
  const isEs = locale === "es";
  const t = UI[isEs ? "es" : "en"];
  const Icon = DOMAIN_ICON_MAP[item.domain] || BookOpen;
  const colors = DOMAIN_COLOR_MAP[item.domain] || DOMAIN_COLOR_MAP.general;

  return (
    <div className="flex items-start gap-3 rounded-lg border border-stone-100 bg-white p-3 transition-colors hover:bg-stone-50">
      <div className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md ${colors.bg}`}>
        <Icon className={`size-3.5 ${colors.text}`} />
      </div>
      <div className="flex-1">
        <p className="text-sm leading-relaxed text-stone-700">
          {isEs ? item.esText : item.text}
        </p>
        <span className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-[10px] font-medium ${colors.bg} ${colors.text} ${colors.border}`}>
          {t.domainLabel(item.domain)}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface First90DaysPlanProps {
  plan: First90DaysPlanType;
  className?: string;
}

export default function First90DaysPlan({ plan, className = "" }: First90DaysPlanProps) {
  const locale = useLocale();
  const isEs = locale === "es";
  const t = UI[isEs ? "es" : "en"];

  const [expandedConversations, setExpandedConversations] = useState<Record<number, boolean>>({});
  const [foglampChecked, setFoglampChecked] = useState<Record<number, boolean>>({});

  const phases = [plan.phases.days1to30, plan.phases.days31to60, plan.phases.days61to90];

  /* --- Print / Download handler ----------------------------------- */

  async function handleDownload() {
    // Dynamic import to avoid SSR issues
    const html2pdf = (await import("html2pdf.js")).default;
    const element = document.getElementById("first-90-days-plan");
    if (!element) return;

    const opt = {
      margin: [0.4, 0.4, 0.4, 0.4] as [number, number, number, number],
      filename: `first-90-days-${plan.roleId}.pdf`,
      image: { type: "jpeg" as const, quality: 0.95 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" as const },
    };

    html2pdf().set(opt).from(element).save();
  }

  return (
    <div className={`mx-auto max-w-3xl ${className}`}>
      <div id="first-90-days-plan">
        {/* ---- Header ---- */}
        <div className="rounded-2xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-amber-50/30 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-teal-700 shadow-md">
              <Calendar className="size-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-stone-900 sm:text-2xl">
                {t.title}
              </h2>
              <p className="mt-1 text-sm text-stone-500">
                {t.subtitle}
              </p>
            </div>
          </div>

          {/* Role + STARS context */}
          <div className="mt-5 flex flex-wrap gap-3">
            <div className="rounded-lg border border-teal-200 bg-white px-4 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-stone-400">
                {isEs ? "Rol" : "Role"}
              </p>
              <p className="text-sm font-bold text-teal-700">
                {isEs ? plan.esRoleName : plan.roleName}
              </p>
            </div>
            <div className="rounded-lg border border-amber-200 bg-white px-4 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-stone-400">
                {t.starsLabel}
              </p>
              <p className="text-sm font-bold text-amber-700">
                {isEs ? plan.esStarsLabel : plan.starsLabel}
              </p>
            </div>
          </div>

          {/* Coaching note */}
          <div className="mt-4 rounded-lg border border-teal-100 bg-white p-4">
            <div className="flex items-start gap-2">
              <Lightbulb className="mt-0.5 size-4 shrink-0 text-amber-500" />
              <div>
                <p className="text-xs font-semibold text-stone-600">
                  {t.coachingTitle}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-stone-600">
                  {isEs ? plan.esCoachingNote : plan.coachingNote}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Timeline Visual ---- */}
        <div className="relative mt-4 flex items-center justify-between px-4 py-3">
          <div className="absolute left-8 right-8 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-teal-400 via-blue-400 to-amber-400" />
          {[
            { label: isEs ? "Dia 1" : "Day 1", color: "bg-teal-600" },
            { label: isEs ? "Dia 30" : "Day 30", color: "bg-teal-600" },
            { label: isEs ? "Dia 60" : "Day 60", color: "bg-blue-600" },
            { label: isEs ? "Dia 90" : "Day 90", color: "bg-amber-600" },
          ].map((marker) => (
            <div key={marker.label} className="relative z-10 flex flex-col items-center">
              <div className={`size-4 rounded-full border-2 border-white ${marker.color} shadow-sm`} />
              <span className="mt-1 text-[10px] font-semibold text-stone-500">{marker.label}</span>
            </div>
          ))}
        </div>

        {/* ---- 3 Phases ---- */}
        <div className="mt-2 space-y-4">
          {phases.map((phase, i) => {
            const style = PHASE_STYLES[i];
            return (
              <div key={i} className={`rounded-2xl border ${style.border} overflow-hidden`}>
                {/* Phase header */}
                <div className={`${style.bg} px-5 py-4`}>
                  <div className="flex items-center gap-3">
                    <div className={`flex size-8 items-center justify-center rounded-full ${style.accent} text-sm font-bold text-white shadow-sm`}>
                      {i + 1}
                    </div>
                    <div>
                      <h3 className={`text-base font-bold ${style.text}`}>
                        {isEs ? phase.esTitle : phase.title}
                      </h3>
                      <p className="text-xs text-stone-500">
                        {isEs ? phase.esSubtitle : phase.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Priorities */}
                <div className="space-y-2 p-4">
                  {phase.priorities.map((item, j) => (
                    <PriorityItem key={j} item={item} locale={locale} />
                  ))}
                </div>

                {/* Milestone */}
                <div className={`mx-4 mb-4 rounded-lg border-2 ${style.border} ${style.bg} p-3`}>
                  <div className="flex items-start gap-2">
                    <CheckCircle className={`mt-0.5 size-4 shrink-0 ${style.text}`} />
                    <div>
                      <p className={`text-xs font-semibold uppercase tracking-wide ${style.text}`}>
                        {t.milestone}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-stone-700">
                        {isEs ? phase.milestone.esText : phase.milestone.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ---- Five Conversations ---- */}
        <div className="mt-6 rounded-2xl border border-stone-200 bg-white overflow-hidden">
          <div className="border-b border-stone-100 bg-gradient-to-r from-stone-50 to-teal-50/30 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-teal-100">
                <MessageSquare className="size-4 text-teal-700" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  {t.fiveConversationsTitle}
                </h3>
                <p className="text-xs text-stone-500">
                  {t.fiveConversationsSubtitle}
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-stone-100">
            {plan.fiveConversations.map((convo, i) => {
              const isExpanded = expandedConversations[i];
              return (
                <button
                  key={i}
                  onClick={() => setExpandedConversations((prev) => ({ ...prev, [i]: !prev[i] }))}
                  className="w-full px-5 py-3 text-left transition-colors hover:bg-stone-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex size-6 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">
                        {i + 1}
                      </span>
                      <span className="text-sm font-semibold text-stone-800">
                        {isEs ? convo.esName : convo.name}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="size-4 text-stone-400" />
                    ) : (
                      <ChevronDown className="size-4 text-stone-400" />
                    )}
                  </div>
                  {isExpanded && (
                    <div className="mt-2 ml-9 space-y-2">
                      <p className="text-sm text-stone-600">
                        {isEs ? convo.esDescription : convo.description}
                      </p>
                      <div className="rounded-lg bg-teal-50 p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-teal-600">
                          {t.sampleQuestion}
                        </p>
                        <p className="mt-1 text-sm italic text-teal-800">
                          &ldquo;{isEs ? convo.esSampleQuestion : convo.sampleQuestion}&rdquo;
                        </p>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ---- FOGLAMP Checklist ---- */}
        <div className="mt-6 rounded-2xl border border-stone-200 bg-white overflow-hidden">
          <div className="border-b border-stone-100 bg-gradient-to-r from-stone-50 to-amber-50/30 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-amber-100">
                <ClipboardList className="size-4 text-amber-700" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  {t.foglampTitle}
                </h3>
                <p className="text-xs text-stone-500">
                  {t.foglampSubtitle}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-1 p-4">
            {plan.foglamp.map((item, i) => {
              const checked = foglampChecked[i] || false;
              return (
                <button
                  key={i}
                  onClick={() => setFoglampChecked((prev) => ({ ...prev, [i]: !prev[i] }))}
                  className={`flex w-full items-start gap-3 rounded-lg p-3 text-left transition-all ${
                    checked ? "bg-green-50" : "hover:bg-stone-50"
                  }`}
                >
                  <div className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                    checked
                      ? "border-green-500 bg-green-500"
                      : "border-stone-300"
                  }`}>
                    {checked && <CheckCircle className="size-3.5 text-white" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="flex size-5 items-center justify-center rounded bg-amber-100 text-xs font-bold text-amber-700">
                        {item.letter}
                      </span>
                      <span className={`text-sm font-semibold ${checked ? "text-green-700 line-through" : "text-stone-800"}`}>
                        {isEs ? item.esLabel : item.label}
                      </span>
                    </div>
                    <p className={`mt-1 ml-7 text-sm ${checked ? "text-green-600" : "text-stone-500"}`}>
                      {isEs ? item.esAction : item.action}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---- Download Button ---- */}
      <div className="mt-6 text-center">
        <Button
          onClick={handleDownload}
          variant="outline"
          className="inline-flex items-center gap-2 border-teal-200 px-6 py-2.5 text-sm font-semibold text-teal-700 hover:bg-teal-50"
        >
          <Download className="size-4" />
          {t.downloadPlan}
        </Button>
      </div>
    </div>
  );
}
