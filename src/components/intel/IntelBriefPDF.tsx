"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface IntelBriefItem {
  id: string;
  headline: { en: string; es: string };
  summary: { en: string; es: string };
  impactLevel: string;
  date: string;
  sourceUrl: string;
  sourceOrg: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const IMPACT_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  critical: { bg: "#FEE2E2", text: "#991B1B", label: "CRITICAL" },
  high: { bg: "#FEF3C7", text: "#92400E", label: "HIGH" },
  medium: { bg: "#DBEAFE", text: "#1E40AF", label: "MEDIUM" },
  low: { bg: "#F5F5F4", text: "#57534E", label: "LOW" },
};

function formatBriefDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function todayFormatted(): string {
  return new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/* ------------------------------------------------------------------ */
/*  Build the hidden HTML for pdf rendering                            */
/* ------------------------------------------------------------------ */

function buildBriefHTML(items: IntelBriefItem[]): string {
  const today = todayFormatted();

  // Sort by date descending, take top 10
  const sorted = [...items]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  const criticalCount = items.filter((i) => i.impactLevel === "critical").length;
  const highCount = items.filter((i) => i.impactLevel === "high").length;

  const itemsHTML = sorted
    .map((item, idx) => {
      const impact = IMPACT_COLORS[item.impactLevel] ?? IMPACT_COLORS.low;
      return `
      <div style="margin-bottom: 16px; padding: 12px 14px; border-left: 3px solid ${impact.text}; background: #FAFAF9; border-radius: 0 6px 6px 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <span style="font-size: 11px; font-weight: 700; color: ${impact.text}; background: ${impact.bg}; padding: 2px 8px; border-radius: 4px;">${impact.label}</span>
          <span style="font-size: 11px; color: #78716C;">${formatBriefDate(item.date)}</span>
        </div>
        <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 600; color: #1C1917; line-height: 1.4;">
          ${idx + 1}. ${item.headline.en}
        </p>
        <p style="margin: 0 0 6px 0; font-size: 11.5px; color: #44403C; line-height: 1.5;">
          ${item.summary.en}
        </p>
        <p style="margin: 0; font-size: 10px; color: #0F766E;">
          Source: ${item.sourceOrg}
        </p>
      </div>`;
    })
    .join("");

  return `
    <div id="intel-brief-pdf-content" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1C1917; padding: 32px 28px; max-width: 700px;">
      <!-- Header -->
      <div style="border-bottom: 2px solid #0F766E; padding-bottom: 16px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #0F766E; letter-spacing: -0.3px;">
              FQHC Intel Brief
            </h1>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #78716C;">
              ${today}
            </p>
          </div>
          <div style="text-align: right;">
            <p style="margin: 0; font-size: 11px; font-weight: 600; color: #0F766E;">fqhctalent.com</p>
            <p style="margin: 2px 0 0 0; font-size: 10px; color: #A8A29E;">California FQHC Intelligence</p>
          </div>
        </div>
      </div>

      <!-- Summary Stats -->
      <div style="display: flex; gap: 16px; margin-bottom: 24px;">
        <div style="flex: 1; background: #F0FDFA; border: 1px solid #99F6E4; border-radius: 8px; padding: 12px; text-align: center;">
          <p style="margin: 0; font-size: 24px; font-weight: 700; color: #0F766E;">${items.length}</p>
          <p style="margin: 2px 0 0 0; font-size: 10px; color: #44403C; text-transform: uppercase; letter-spacing: 0.5px;">Total Items</p>
        </div>
        <div style="flex: 1; background: #FEF2F2; border: 1px solid #FECACA; border-radius: 8px; padding: 12px; text-align: center;">
          <p style="margin: 0; font-size: 24px; font-weight: 700; color: #991B1B;">${criticalCount}</p>
          <p style="margin: 2px 0 0 0; font-size: 10px; color: #44403C; text-transform: uppercase; letter-spacing: 0.5px;">Critical</p>
        </div>
        <div style="flex: 1; background: #FFFBEB; border: 1px solid #FDE68A; border-radius: 8px; padding: 12px; text-align: center;">
          <p style="margin: 0; font-size: 24px; font-weight: 700; color: #92400E;">${highCount}</p>
          <p style="margin: 2px 0 0 0; font-size: 10px; color: #44403C; text-transform: uppercase; letter-spacing: 0.5px;">High Impact</p>
        </div>
      </div>

      <!-- Section Header -->
      <h2 style="margin: 0 0 14px 0; font-size: 15px; font-weight: 700; color: #1C1917; border-bottom: 1px solid #E7E5E4; padding-bottom: 8px;">
        Top ${sorted.length} Intelligence Items
      </h2>

      <!-- Items -->
      ${itemsHTML}

      <!-- Footer -->
      <div style="margin-top: 28px; padding-top: 14px; border-top: 1px solid #D6D3D1; text-align: center;">
        <p style="margin: 0; font-size: 10px; color: #A8A29E;">
          Generated by FQHC Talent Exchange &nbsp;|&nbsp; fqhctalent.com &nbsp;|&nbsp; hello@fqhctalent.com
        </p>
        <p style="margin: 6px 0 0 0; font-size: 9px; color: #D6D3D1;">
          Data sourced from HRSA, BLS, CA EDD, DHCS, NACHC, CHCF, and primary reporting.
        </p>
      </div>
    </div>
  `;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function IntelBriefPDF({
  items,
  compact = false,
}: {
  items: IntelBriefItem[];
  compact?: boolean;
}) {
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleDownload() {
    if (isGenerating || items.length === 0) return;
    setIsGenerating(true);

    try {
      const html2pdf = (await import("html2pdf.js")).default;

      // Create a temporary container with the brief HTML
      const container = document.createElement("div");
      container.innerHTML = buildBriefHTML(items);
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
          filename: `FQHC_Intel_Brief_${dateSlug}.pdf`,
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "in", format: "letter" },
        })
        .save();

      // Clean up
      document.body.removeChild(container);
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating || items.length === 0}
      className={
        compact
          ? "inline-flex items-center gap-1.5 rounded-md bg-teal-700 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
          : "inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
      }
      title="Download a PDF summary of the latest FQHC intelligence"
    >
      {isGenerating ? (
        <Loader2 className={compact ? "size-3 animate-spin" : "size-4 animate-spin"} />
      ) : (
        <Download className={compact ? "size-3" : "size-4"} />
      )}
      {compact
        ? isGenerating ? "..." : "PDF"
        : isGenerating ? "Generating..." : "Download Intel Brief"}
    </button>
  );
}
