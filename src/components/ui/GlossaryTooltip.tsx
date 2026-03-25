"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { ChevronRight } from "lucide-react";
import { getTermDefinition } from "@/lib/fqhc-glossary";

/* ------------------------------------------------------------------ */
/*  GlossaryTooltip — Inline glossary term with hover/tap tooltip     */
/* ------------------------------------------------------------------ */

export function GlossaryTooltip({
  term,
  locale: localeOverride,
  showFullName = false,
}: {
  term: string;
  locale?: string;
  showFullName?: boolean;
}) {
  const defaultLocale = useLocale();
  const locale = localeOverride || defaultLocale;
  const isEs = locale === "es";

  const glossaryTerm = getTermDefinition(term);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // If term not found, render gracefully without tooltip
  if (!glossaryTerm) {
    return <span>{term}</span>;
  }

  const fullName = isEs ? glossaryTerm.fullName.es : glossaryTerm.fullName.en;
  const definition = isEs ? glossaryTerm.definition.es : glossaryTerm.definition.en;
  const learnMoreUrl = glossaryTerm.learnMoreUrl;

  // Calculate tooltip position
  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipWidth = 280; // max-w-xs ~ 320px, with padding
    const tooltipHeight = 120; // approximate

    // Position above the trigger, centered
    let left = triggerRect.left + triggerRect.width / 2 - tooltipWidth / 2;
    let top = triggerRect.top - tooltipHeight - 8; // 8px gap

    // Adjust for viewport boundaries
    if (left < 8) left = 8;
    if (left + tooltipWidth > window.innerWidth - 8) {
      left = window.innerWidth - tooltipWidth - 8;
    }
    if (top < 8) {
      // Tooltip would go above viewport, position below instead
      top = triggerRect.bottom + 8;
    }

    setPosition({ top: Math.max(0, top), left });
  }, [isOpen]);

  // Close tooltip on escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close tooltip on click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        tooltipRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Auto-close tooltip on mobile after 5 seconds
  useEffect(() => {
    if (!isOpen) {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      return;
    }

    // Only auto-close on touch devices
    if (window.matchMedia("(hover: none)").matches) {
      closeTimeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 5000);
    }

    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [isOpen]);

  // Display text
  const displayText = showFullName ? `${term} (${fullName})` : term;

  return (
    <>
      {/* Trigger */}
      <span
        ref={triggerRef}
        className="border-b border-dotted border-stone-400 cursor-help inline-block"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => {
          if (!window.matchMedia("(hover: none)").matches) {
            setIsOpen(true);
          }
        }}
        onMouseLeave={() => {
          if (!window.matchMedia("(hover: none)").matches) {
            closeTimeoutRef.current = setTimeout(() => setIsOpen(false), 200);
          }
        }}
        onTouchStart={() => setIsOpen(true)}
      >
        {displayText}
      </span>

      {/* Tooltip Portal */}
      {isOpen && position && (
        <div
          ref={tooltipRef}
          className="fixed bg-white shadow-lg rounded-lg z-50 p-3 max-w-xs border border-stone-200"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
          onMouseEnter={() => {
            if (closeTimeoutRef.current) {
              clearTimeout(closeTimeoutRef.current);
            }
          }}
          onMouseLeave={() => {
            if (!window.matchMedia("(hover: none)").matches) {
              closeTimeoutRef.current = setTimeout(() => setIsOpen(false), 200);
            }
          }}
        >
          {/* Small arrow caret pointing down (or up if positioned below) */}
          <div
            className="absolute w-2 h-2 bg-white border-r border-b border-stone-200 transform rotate-45"
            style={{
              top: "-4px",
              left: "50%",
              marginLeft: "-4px",
              boxShadow: "-1px -1px 1px rgba(0,0,0,0.05)",
            }}
          />

          {/* Content */}
          <div className="text-stone-800">
            {/* Full name in bold */}
            <p className="font-semibold text-sm mb-1.5">{fullName}</p>

            {/* Definition */}
            <p className="text-xs leading-relaxed text-stone-700 mb-2">
              {definition}
            </p>

            {/* Learn more link if available */}
            {learnMoreUrl && (
              <a
                href={learnMoreUrl}
                className="inline-flex items-center gap-1 text-xs text-teal-700 hover:text-teal-800 font-medium transition-colors"
              >
                {isEs ? "Aprender más" : "Learn more"}
                <ChevronRight className="size-3" />
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
