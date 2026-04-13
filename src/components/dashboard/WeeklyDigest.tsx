// WeeklyDigest — Executive summary of the week's key FQHC developments
// Shows key metrics, top intel items, week-over-week deltas, PDF download, newsletter CTA
"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Newspaper,
  Briefcase,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  Loader2,
  ArrowRight,
  Calendar,
  Mail,
} from "lucide-react";
import { t } from "@/lib/i18n-helpers";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface WeeklyDigestIntelItem {
  id: string;
  headline: { en: string; es: string };
  impactLevel: string;
  date: string;
  sourceUrl: string;
  sourceOrg: string;
}

export interface WeeklyDigestProps {
  /** All intel items (component filters to this week) */
  intelItems: WeeklyDigestIntelItem[];
  /** Current total open jobs */
  totalJobs: number;
  /** Total workers affected by layoffs */
  totalLayoffWorkers: number;
  /** Total layoff events */
  totalLayoffEvents: number;
  /** Previous week's job count (for delta) */
  prevWeekJobs?: number;
  /** Previous week's intel count (for delta) */
  prevWeekIntel?: number;
  /** Previous week's layoff workers (for delta) */
  prevWeekLayoffWorkers?: number;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */


function getWeekRange(): { start: Date; end: Date; label: string } {
  const now = new Date();
  const dayOfWeek = now.getDay();
  // Start of week (Monday)
  const start = new Date(now);
  start.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
  start.setHours(0, 0, 0, 0);
  // End of week (Sunday)
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return {
    start,
    end,
    label: `${fmt(start)} - ${fmt(end)}, ${now.getFullYear()}`,
  };
}

const IMPACT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  critical: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  high: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  medium: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  low: { bg: "bg-stone-50", text: "text-stone-600", border: "border-stone-200" },
};

/* ------------------------------------------------------------------ */
/*  Delta badge                                                        */
/* ------------------------------------------------------------------ */

function DeltaBadge({
  current,
  previous,
  suffix,
  locale,
  invertColor = false,
}: {
  current: number;
  previous?: number;
  suffix?: { en: string; es: string };
  locale: string;
  /** If true, "up" is bad (e.g. layoffs) */
  invertColor?: boolean;
}) {
  if (previous === undefined) return null;
  const delta = current - previous;
  if (delta === 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-stone-500">
        <Minus className="size-3" />
        {t({ en: "No change", es: "Sin cambio" }, locale)}
      </span>
    );
  }
  const isUp = delta > 0;
  const isGood = invertColor ? !isUp : isUp;
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold ${
        isGood ? "text-teal-600" : "text-red-600"
      }`}
    >
      {isUp ? (
        <TrendingUp className="size-3" />
      ) : (
        <TrendingDown className="size-3" />
      )}
      {isUp ? "+" : ""}
      {delta.toLocaleString()}
      {suffix ? ` ${t(suffix, locale)}` : ""}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  PDF builder                                                        */
/* ------------------------------------------------------------------ */

function buildDigestHTML(
  items: WeeklyDigestIntelItem[],
  totalJobs: number,
  totalLayoffWorkers: number,
  weekLabel: string,
): string {
  const topItems = items.slice(0, 5);
  const itemsHTML = topItems
    .map((item, idx) => {
      const impact = item.impactLevel.toUpperCase();
      const impactColor =
        item.impactLevel === "critical"
          ? "#991B1B"
          : item.impactLevel === "high"
          ? "#92400E"
          : "#1E40AF";
      return `
      <div style="margin-bottom: 12px; padding: 10px 12px; border-left: 3px solid ${impactColor}; background: #FAFAF9; border-radius: 0 6px 6px 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span style="font-size: 10px; font-weight: 700; color: ${impactColor};">${impact}</span>
          <span style="font-size: 10px; color: #78716C;">${item.date}</span>
        </div>
        <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; color: #1C1917; line-height: 1.4;">
          ${idx + 1}. ${item.headline.en}
        </p>
        <p style="margin: 0; font-size: 10px; color: #0F766E;">Source: ${item.sourceOrg}</p>
      </div>`;
    })
    .join("");

  return `
    <div id="weekly-digest-pdf" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1C1917; padding: 32px 28px; max-width: 700px;">
      <div style="border-bottom: 2px solid #0F766E; padding-bottom: 16px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #0F766E;">This Week in FQHC</h1>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #78716C;">${weekLabel}</p>
          </div>
          <div style="text-align: right;">
            <p style="margin: 0; font-size: 10px; font-weight: 600; color: #0F766E;">fqhctalent.com</p>
          </div>
        </div>
      </div>
      <div style="display: flex; gap: 12px; margin-bottom: 20px;">
        <div style="flex: 1; background: #F0FDFA; border: 1px solid #99F6E4; border-radius: 8px; padding: 10px; text-align: center;">
          <p style="margin: 0; font-size: 20px; font-weight: 700; color: #0F766E;">${items.length}</p>
          <p style="margin: 2px 0 0 0; font-size: 9px; color: #44403C; text-transform: uppercase;">New Intel</p>
        </div>
        <div style="flex: 1; background: #F0FDFA; border: 1px solid #99F6E4; border-radius: 8px; padding: 10px; text-align: center;">
          <p style="margin: 0; font-size: 20px; font-weight: 700; color: #0F766E;">${totalJobs.toLocaleString()}</p>
          <p style="margin: 2px 0 0 0; font-size: 9px; color: #44403C; text-transform: uppercase;">Open Jobs</p>
        </div>
        <div style="flex: 1; background: #FEF2F2; border: 1px solid #FECACA; border-radius: 8px; padding: 10px; text-align: center;">
          <p style="margin: 0; font-size: 20px; font-weight: 700; color: #991B1B;">${totalLayoffWorkers.toLocaleString()}</p>
          <p style="margin: 2px 0 0 0; font-size: 9px; color: #44403C; text-transform: uppercase;">Workers Affected</p>
        </div>
      </div>
      <h2 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 700; color: #1C1917; border-bottom: 1px solid #E7E5E4; padding-bottom: 6px;">
        Top Intelligence Items
      </h2>
      ${itemsHTML}
      <div style="margin-top: 24px; padding-top: 12px; border-top: 1px solid #D6D3D1; text-align: center;">
        <p style="margin: 0; font-size: 9px; color: #A8A29E;">
          Generated by FQHC Talent Exchange | fqhctalent.com | hello@fqhctalent.com
        </p>
      </div>
    </div>
  `;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function WeeklyDigest({
  intelItems,
  totalJobs,
  totalLayoffWorkers,
  totalLayoffEvents,
  prevWeekJobs,
  prevWeekIntel,
  prevWeekLayoffWorkers,
}: WeeklyDigestProps) {
  const locale = useLocale();
  const isEs = locale === "es";
  const [isGenerating, setIsGenerating] = useState(false);

  const week = getWeekRange();

  // Filter intel to this week (within last 7 days for freshness)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const thisWeekIntel = intelItems.filter(
    (i) => new Date(i.date) >= sevenDaysAgo,
  );

  // Sort by impact: critical > high > medium > low, then by date
  const impactOrder: Record<string, number> = {
    critical: 0,
    high: 1,
    medium: 2,
    low: 3,
  };
  const sortedIntel = [...thisWeekIntel].sort((a, b) => {
    const impactDiff =
      (impactOrder[a.impactLevel] ?? 3) - (impactOrder[b.impactLevel] ?? 3);
    if (impactDiff !== 0) return impactDiff;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const topIntel = sortedIntel.slice(0, 3);

  // Use broader set if this week is thin — fall back to most recent critical/high
  const displayIntel =
    topIntel.length >= 2
      ? topIntel
      : [...intelItems]
          .filter(
            (i) =>
              i.impactLevel === "critical" || i.impactLevel === "high",
          )
          .sort(
            (a, b) =>
              new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .slice(0, 3);

  async function handleDownload() {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const container = document.createElement("div");
      container.innerHTML = buildDigestHTML(
        sortedIntel.length > 0 ? sortedIntel : displayIntel,
        totalJobs,
        totalLayoffWorkers,
        week.label,
      );
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.top = "0";
      document.body.appendChild(container);
      const el = container.firstElementChild as HTMLElement;
      const dateSlug = new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");
      await html2pdf()
        .from(el)
        .set({
          margin: [0.4, 0.5, 0.4, 0.5],
          filename: `FQHC_Weekly_Digest_${dateSlug}.pdf`,
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "in", format: "letter" },
        })
        .save();
      document.body.removeChild(container);
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <section className="bg-white border-y border-stone-200 px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="size-5 text-teal-600" />
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                {isEs ? "Esta Semana en FQHC" : "This Week in FQHC"}
              </h2>
            </div>
            <p className="text-sm text-stone-500">{week.label}</p>
          </div>
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
            title={
              isEs
                ? "Descargar resumen semanal en PDF"
                : "Download Weekly Brief as PDF"
            }
          >
            {isGenerating ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Download className="size-4" />
            )}
            {isGenerating
              ? isEs
                ? "Generando..."
                : "Generating..."
              : isEs
              ? "Descargar Resumen Semanal"
              : "Download Weekly Brief"}
          </button>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* New Intel */}
          <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Newspaper className="size-5 text-teal-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                {isEs ? "Nuevas Noticias" : "New Intel"}
              </span>
            </div>
            <p className="text-3xl font-extrabold text-stone-900">
              {thisWeekIntel.length > 0 ? thisWeekIntel.length : intelItems.length}
            </p>
            <p className="text-xs text-stone-500 mt-1">
              {thisWeekIntel.length > 0
                ? isEs
                  ? "esta semana"
                  : "this week"
                : isEs
                ? "items totales"
                : "total items"}
            </p>
            <div className="mt-2">
              <DeltaBadge
                current={thisWeekIntel.length > 0 ? thisWeekIntel.length : intelItems.length}
                previous={prevWeekIntel}
                suffix={{ en: "from last week", es: "de la semana pasada" }}
                locale={locale}
              />
            </div>
          </div>

          {/* Open Jobs */}
          <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="size-5 text-stone-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                {isEs ? "Empleos Abiertos" : "Open Jobs"}
              </span>
            </div>
            <p className="text-3xl font-extrabold text-stone-900">
              {totalJobs.toLocaleString()}
            </p>
            <p className="text-xs text-stone-500 mt-1">
              {isEs ? "en todo California" : "across California"}
            </p>
            <div className="mt-2">
              <DeltaBadge
                current={totalJobs}
                previous={prevWeekJobs}
                suffix={{ en: "jobs", es: "empleos" }}
                locale={locale}
              />
            </div>
          </div>

          {/* Layoffs */}
          <div className="rounded-xl border border-red-200 bg-red-50/50 p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="size-5 text-red-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                {isEs ? "Trabajadores Afectados" : "Workers Affected"}
              </span>
            </div>
            <p className="text-3xl font-extrabold text-stone-900">
              {totalLayoffWorkers.toLocaleString()}
            </p>
            <p className="text-xs text-stone-500 mt-1">
              {isEs
                ? `en ${totalLayoffEvents} eventos`
                : `across ${totalLayoffEvents} events`}
            </p>
            <div className="mt-2">
              <DeltaBadge
                current={totalLayoffWorkers}
                previous={prevWeekLayoffWorkers}
                locale={locale}
                invertColor
              />
            </div>
          </div>
        </div>

        {/* Top intel items */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-4">
            {isEs
              ? "Inteligencia de Mayor Impacto"
              : "Highest-Impact Intelligence"}
          </h3>
          <div className="space-y-3">
            {displayIntel.map((item, idx) => {
              const colors =
                IMPACT_COLORS[item.impactLevel] ?? IMPACT_COLORS.low;
              return (
                <a
                  key={item.id}
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block rounded-xl border p-4 transition-colors hover:shadow-sm ${colors.border} ${colors.bg}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 size-6 rounded-full bg-white border border-stone-200 flex items-center justify-center text-xs font-bold text-stone-600">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider ${colors.text}`}
                        >
                          {item.impactLevel}
                        </span>
                        <span className="text-[10px] text-stone-400">
                          {item.date}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-stone-900 leading-snug">
                        {t(item.headline, locale)}
                      </p>
                      <p className="text-xs text-teal-600 mt-1">
                        {item.sourceOrg}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
          <div className="mt-4 text-right">
            <Link
              href="/layoffs"
              className="inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-900 transition-colors"
            >
              {isEs ? "Ver todo" : "View all intelligence"}{" "}
              <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="rounded-xl border-2 border-teal-200 bg-gradient-to-r from-teal-50 to-white p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div className="flex items-start gap-3 mb-4 sm:mb-0">
            <div className="flex-shrink-0 size-10 rounded-full bg-teal-100 flex items-center justify-center">
              <Mail className="size-5 text-teal-700" />
            </div>
            <div>
              <p className="text-sm font-bold text-stone-900">
                {isEs
                  ? "Recibe el FQHC Intel Brief cada martes"
                  : "Get the FQHC Intel Brief every Tuesday"}
              </p>
              <p className="text-xs text-stone-500 mt-0.5">
                {isEs
                  ? "La inteligencia que los ejecutivos de FQHC necesitan, de fuentes primarias."
                  : "The intelligence FQHC executives need, from primary sources."}
              </p>
            </div>
          </div>
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 whitespace-nowrap"
          >
            {isEs ? "Suscribirse" : "Subscribe"}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
