"use client";

import { Check } from "lucide-react";
import { type ContentRead } from "@/hooks/useContentReads";

/**
 * Tiny visual indicator for content read status.
 * - "read" → teal checkmark
 * - "reading" → teal progress ring
 * - "want_to_read" → amber bookmark dot
 * - null/undefined → nothing (unread or not authenticated)
 */
export function ReadStatusBadge({
  read,
  size = "sm",
}: {
  read: ContentRead | undefined;
  size?: "sm" | "md";
}) {
  if (!read) return null;

  const dim = size === "sm" ? "size-4" : "size-5";

  if (read.status === "read") {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full bg-teal-100 text-teal-700 ${dim}`}
        title="Read"
      >
        <Check className={size === "sm" ? "size-2.5" : "size-3"} strokeWidth={3} />
      </span>
    );
  }

  if (read.status === "reading") {
    const pct = read.progress;
    // SVG progress ring
    const r = size === "sm" ? 6 : 8;
    const circumference = 2 * Math.PI * r;
    const offset = circumference - (pct / 100) * circumference;
    const svgSize = size === "sm" ? 16 : 20;

    return (
      <span className={`inline-flex items-center justify-center ${dim}`} title={`Reading — ${pct}%`}>
        <svg width={svgSize} height={svgSize} className="-rotate-90">
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={r}
            fill="none"
            stroke="#d1d5db"
            strokeWidth={2}
          />
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={r}
            fill="none"
            stroke="#0f766e"
            strokeWidth={2}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
      </span>
    );
  }

  if (read.status === "want_to_read") {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full bg-amber-100 ${dim}`}
        title="Want to read"
      >
        <span className="size-1.5 rounded-full bg-amber-500" />
      </span>
    );
  }

  return null;
}
