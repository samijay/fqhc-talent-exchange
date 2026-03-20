"use client";

import { Trophy, GraduationCap, Award, Target } from "lucide-react";
import { ShareButton } from "./ShareButton";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ShareableAchievementProps {
  /** Achievement type determines icon + color */
  type: "masterclass" | "course" | "assessment" | "pathway" | "certification";
  /** Title of what was completed */
  title: string;
  /** Optional subtitle (e.g. "Financial Survival" category) */
  subtitle?: string;
  /** User's display name for the share URL */
  userName?: string;
  /** Content ID for the share URL */
  contentId: string;
  /** Locale for bilingual */
  locale: string;
}

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const TYPE_CONFIG = {
  masterclass: {
    icon: GraduationCap,
    color: "bg-teal-50 border-teal-200 text-teal-800",
    iconColor: "text-teal-600",
    label: { en: "Masterclass Completed", es: "Masterclass Completado" },
  },
  course: {
    icon: Award,
    color: "bg-amber-50 border-amber-200 text-amber-800",
    iconColor: "text-amber-600",
    label: { en: "Course Completed", es: "Curso Completado" },
  },
  assessment: {
    icon: Target,
    color: "bg-purple-50 border-purple-200 text-purple-800",
    iconColor: "text-purple-600",
    label: { en: "Assessment Completed", es: "Evaluacion Completada" },
  },
  pathway: {
    icon: Trophy,
    color: "bg-emerald-50 border-emerald-200 text-emerald-800",
    iconColor: "text-emerald-600",
    label: { en: "Learning Pathway Completed", es: "Ruta de Aprendizaje Completada" },
  },
  certification: {
    icon: Award,
    color: "bg-blue-50 border-blue-200 text-blue-800",
    iconColor: "text-blue-600",
    label: { en: "Certification Prep Completed", es: "Preparacion para Certificacion Completada" },
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ShareableAchievement({
  type,
  title,
  subtitle,
  userName,
  contentId,
  locale,
}: ShareableAchievementProps) {
  const config = TYPE_CONFIG[type];
  const Icon = config.icon;
  const isEs = locale === "es";

  const shareUrl = `https://www.fqhctalent.com/share/achievement?type=${type}&id=${encodeURIComponent(contentId)}${userName ? `&name=${encodeURIComponent(userName)}` : ""}`;

  const shareTitle = userName
    ? `${userName} completed "${title}" on FQHC Talent Exchange`
    : `Completed "${title}" on FQHC Talent Exchange`;

  return (
    <div className={`rounded-xl border-2 p-6 ${config.color}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className={`rounded-full bg-white p-3 ${config.iconColor} shadow-sm`}>
            <Icon className="size-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider opacity-70">
              {isEs ? config.label.es : config.label.en}
            </p>
            <h3 className="mt-1 text-lg font-bold">{title}</h3>
            {subtitle && (
              <p className="mt-0.5 text-sm opacity-70">{subtitle}</p>
            )}
            <p className="mt-2 text-xs opacity-50">FQHC Talent Exchange</p>
          </div>
        </div>
        <ShareButton
          url={shareUrl}
          title={shareTitle}
          description={`${isEs ? config.label.es : config.label.en} — FQHC Talent Exchange`}
          size="md"
        />
      </div>
    </div>
  );
}
