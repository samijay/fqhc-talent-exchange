"use client";

import { useLocale } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { Info } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  ReadingLevelBadge — Difficulty level indicator with optional tooltip */
/* ------------------------------------------------------------------ */

export type ReadingLevel = "foundational" | "intermediate" | "advanced" | "beginner";
export type BadgeSize = "sm" | "md";

interface ReadingLevelBadgeProps {
  level: ReadingLevel;
  showTooltip?: boolean;
  size?: BadgeSize;
}

const LEVEL_CONFIG: Record<
  ReadingLevel,
  {
    normalizedLevel: "foundational" | "intermediate" | "advanced";
    labelEn: string;
    labelEs: string;
    bgClass: string;
    textClass: string;
    borderClass: string;
    tooltipEn: string;
    tooltipEs: string;
    iconColor: string;
  }
> = {
  foundational: {
    normalizedLevel: "foundational",
    labelEn: "Foundational",
    labelEs: "Fundacional",
    bgClass: "bg-emerald-50",
    textClass: "text-emerald-700",
    borderClass: "border-emerald-200",
    tooltipEn: "For all education levels. Plain language, no prerequisites.",
    tooltipEs: "Para todos los niveles educativos. Lenguaje simple, sin requisitos previos.",
    iconColor: "text-emerald-600",
  },
  beginner: {
    normalizedLevel: "foundational",
    labelEn: "Foundational",
    labelEs: "Fundacional",
    bgClass: "bg-emerald-50",
    textClass: "text-emerald-700",
    borderClass: "border-emerald-200",
    tooltipEn: "For all education levels. Plain language, no prerequisites.",
    tooltipEs: "Para todos los niveles educativos. Lenguaje simple, sin requisitos previos.",
    iconColor: "text-emerald-600",
  },
  intermediate: {
    normalizedLevel: "intermediate",
    labelEn: "Intermediate",
    labelEs: "Intermedio",
    bgClass: "bg-blue-50",
    textClass: "text-blue-700",
    borderClass: "border-blue-200",
    tooltipEn: "For experienced staff. Assumes FQHC basics.",
    tooltipEs: "Para personal experimentado. Asume conocimientos básicos de FQHC.",
    iconColor: "text-blue-600",
  },
  advanced: {
    normalizedLevel: "advanced",
    labelEn: "Advanced",
    labelEs: "Avanzado",
    bgClass: "bg-amber-50",
    textClass: "text-amber-700",
    borderClass: "border-amber-200",
    tooltipEn: "For directors & executives. Assumes domain expertise.",
    tooltipEs: "Para directores y ejecutivos. Asume experiencia en el dominio.",
    iconColor: "text-amber-600",
  },
};

export function ReadingLevelBadge({
  level,
  showTooltip = false,
  size = "md",
}: ReadingLevelBadgeProps) {
  const locale = useLocale();
  const isEs = locale === "es";

  const config = LEVEL_CONFIG[level];
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Calculate tooltip position
  useEffect(() => {
    if (!showTooltip || !isTooltipOpen || !triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipWidth = 220;
    const tooltipHeight = 60;

    let left = triggerRect.left + triggerRect.width / 2 - tooltipWidth / 2;
    let top = triggerRect.top - tooltipHeight - 8;

    if (left < 8) left = 8;
    if (left + tooltipWidth > window.innerWidth - 8) {
      left = window.innerWidth - tooltipWidth - 8;
    }
    if (top < 8) {
      top = triggerRect.bottom + 8;
    }

    setTooltipPosition({ top: Math.max(0, top), left });
  }, [isTooltipOpen, showTooltip]);

  // Handle escape key
  useEffect(() => {
    if (!showTooltip || !isTooltipOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsTooltipOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTooltipOpen, showTooltip]);

  // Handle click outside
  useEffect(() => {
    if (!showTooltip || !isTooltipOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        tooltipRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setIsTooltipOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [isTooltipOpen, showTooltip]);

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };

  const tooltipText = isEs ? config.tooltipEs : config.tooltipEn;
  const labelText = isEs ? config.labelEs : config.labelEn;

  return (
    <>
      {/* Badge Trigger */}
      <div
        ref={triggerRef}
        className={`inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors ${sizeClasses[size]} ${config.bgClass} ${config.textClass} ${config.borderClass} ${showTooltip ? "cursor-help" : ""}`}
        onMouseEnter={() => {
          if (showTooltip && !window.matchMedia("(hover: none)").matches) {
            setIsTooltipOpen(true);
          }
        }}
        onMouseLeave={() => {
          if (showTooltip && !window.matchMedia("(hover: none)").matches) {
            setTimeout(() => setIsTooltipOpen(false), 200);
          }
        }}
        onClick={() => {
          if (showTooltip) {
            setIsTooltipOpen(!isTooltipOpen);
          }
        }}
      >
        <span>{labelText}</span>
        {showTooltip && (
          <Info className={`size-3.5 ${config.iconColor}`} strokeWidth={2.5} />
        )}
      </div>

      {/* Tooltip */}
      {showTooltip && isTooltipOpen && tooltipPosition && (
        <div
          ref={tooltipRef}
          className="fixed bg-white shadow-lg rounded-lg z-50 p-2.5 border border-stone-200"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            width: "220px",
          }}
          onMouseEnter={() => {
            setIsTooltipOpen(true);
          }}
          onMouseLeave={() => {
            if (!window.matchMedia("(hover: none)").matches) {
              setTimeout(() => setIsTooltipOpen(false), 200);
            }
          }}
        >
          <p className="text-xs leading-relaxed text-stone-700">{tooltipText}</p>
        </div>
      )}
    </>
  );
}
