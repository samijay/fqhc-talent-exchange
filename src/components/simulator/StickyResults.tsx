// StickyResults — wrapper that makes the results panel sticky on desktop
// with delta comparison badges showing changes from baseline
"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  Delta Badge — shows +$240K / -12% next to metrics                  */
/* ------------------------------------------------------------------ */

export interface DeltaValue {
  label: string;
  current: number;
  baseline: number;
  format: "currency" | "percent" | "number";
}

function formatDelta(value: number, format: DeltaValue["format"]): string {
  const abs = Math.abs(value);
  if (format === "currency") {
    if (abs >= 1_000_000) return `$${(abs / 1_000_000).toFixed(1)}M`;
    if (abs >= 1_000) return `$${(abs / 1_000).toFixed(0)}K`;
    return `$${abs.toFixed(0)}`;
  }
  if (format === "percent") return `${abs.toFixed(1)}%`;
  if (abs >= 1_000) return abs.toLocaleString();
  return abs.toFixed(0);
}

export function DeltaBadge({
  current,
  baseline,
  format,
  invertColor = false,
}: {
  current: number;
  baseline: number;
  format: DeltaValue["format"];
  /** Set true when a decrease is good (e.g., costs) */
  invertColor?: boolean;
}) {
  const delta = current - baseline;
  if (Math.abs(delta) < 0.01) return null;

  const isPositive = delta > 0;
  const isGood = invertColor ? !isPositive : isPositive;
  const prefix = isPositive ? "+" : "-";

  return (
    <span
      className={`ml-2 inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold ${
        isGood
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {isGood ? (
        <TrendingUp className="size-2.5" />
      ) : (
        <TrendingDown className="size-2.5" />
      )}
      {prefix}
      {formatDelta(delta, format)}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Sticky Results Wrapper                                             */
/* ------------------------------------------------------------------ */

interface StickyResultsProps {
  children: React.ReactNode;
  /** Optional label shown at top when comparing to baseline */
  baselineLabel?: string;
  locale: string;
}

export function StickyResults({
  children,
  baselineLabel,
  locale,
}: StickyResultsProps) {
  return (
    <div className="lg:sticky lg:top-4 space-y-4">
      {baselineLabel && (
        <div className="flex items-center gap-2 rounded-lg bg-stone-100 px-3 py-2 text-xs text-stone-500">
          <Minus className="size-3" />
          <span>
            {t(
              {
                en: "Comparing to",
                es: "Comparando con",
              },
              locale,
            )}{" "}
            <strong className="text-stone-700">{baselineLabel}</strong>
          </span>
        </div>
      )}
      {children}
    </div>
  );
}
