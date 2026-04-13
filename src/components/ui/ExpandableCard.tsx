"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandableCardProps {
  /** Always-visible header content */
  header: ReactNode;
  /** Content shown when expanded */
  children: ReactNode;
  /** Optional: control expanded state externally */
  defaultExpanded?: boolean;
  /** Optional: highlight ring color class */
  highlight?: boolean;
  /** Optional: top badge (shown above header, full width) */
  topBadge?: ReactNode;
  /** Optional: additional className for the card wrapper */
  className?: string;
  /** ID for accessibility */
  id?: string;
}

export function ExpandableCard({
  header,
  children,
  defaultExpanded = false,
  highlight = false,
  topBadge,
  className = "",
  id,
}: ExpandableCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const contentId = id ? `${id}-content` : undefined;

  return (
    <div
      className={`rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-stone-900 dark:border-stone-700 ${
        highlight
          ? "border-teal-300 ring-1 ring-teal-200 dark:border-teal-700 dark:ring-teal-800"
          : "border-stone-200"
      } ${className}`}
    >
      {topBadge && (
        <div className="rounded-t-xl bg-teal-50 px-4 py-2 dark:bg-teal-950">
          {topBadge}
        </div>
      )}
      <button
        className="w-full px-5 py-4 text-left"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        aria-controls={contentId}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">{header}</div>
          <div className="mt-1 shrink-0 text-stone-500 dark:text-stone-400">
            {expanded ? (
              <ChevronUp className="size-5" />
            ) : (
              <ChevronDown className="size-5" />
            )}
          </div>
        </div>
      </button>
      {expanded && (
        <div
          id={contentId}
          className="space-y-4 border-t border-stone-100 px-5 pb-5 pt-4 dark:border-stone-800"
        >
          {children}
        </div>
      )}
    </div>
  );
}
