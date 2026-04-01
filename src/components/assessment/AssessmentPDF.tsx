"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import {
  type AssessmentResults,
  type DomainId,
  getDomainName,
  getLevelLabel,
} from "@/lib/career-assessment-engine";
import { trackEvent } from "@/lib/track";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface AssessmentPDFProps {
  results: AssessmentResults;
  role?: string;
  locale?: string;
}

/* ------------------------------------------------------------------ */
/*  Domain bar colors for inline HTML                                  */
/* ------------------------------------------------------------------ */

const DOMAIN_BAR_COLORS: Record<DomainId, string> = {
  mission: "#14B8A6",
  people: "#3B82F6",
  execution: "#F59E0B",
  growth: "#22C55E",
  transition: "#A855F7",
};

/* ------------------------------------------------------------------ */
/*  Build the hidden HTML for PDF rendering                            */
/* ------------------------------------------------------------------ */

function buildAssessmentHTML(
  results: AssessmentResults,
  role: string | undefined,
  locale: string,
): string {
  const isEs = locale === "es";
  const today = new Date().toLocaleDateString(isEs ? "es-US" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const domainIds: DomainId[] = ["mission", "people", "execution", "growth", "transition"];

  const domainBarsHTML = domainIds
    .filter((id) => results.domainScores[id])
    .map((id) => {
      const score = results.domainScores[id];
      const color = DOMAIN_BAR_COLORS[id];
      const name = getDomainName(id, locale);
      const level = getLevelLabel(score.level, locale);
      return `
      <div style="margin-bottom: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span style="font-size: 13px; font-weight: 600; color: #1C1917;">${name}</span>
          <span style="font-size: 12px; color: #57534E;">${score.score}/${score.max} &middot; ${level}</span>
        </div>
        <div style="height: 10px; background: #E7E5E4; border-radius: 5px; overflow: hidden;">
          <div style="height: 100%; width: ${score.percentage}%; background: ${color}; border-radius: 5px;"></div>
        </div>
      </div>`;
    })
    .join("");

  const strengthsHTML = results.insights.strengths
    .map(
      (s) => `
      <div style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 8px;">
        <span style="color: #0F766E; font-size: 14px; line-height: 1.4;">&#10003;</span>
        <span style="font-size: 12px; color: #44403C; line-height: 1.5;">${s}</span>
      </div>`,
    )
    .join("");

  const growthHTML = results.insights.growthAreas
    .map(
      (a) => `
      <div style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 8px;">
        <span style="color: #D97706; font-size: 14px; line-height: 1.4;">&#9654;</span>
        <span style="font-size: 12px; color: #44403C; line-height: 1.5;">${a}</span>
      </div>`,
    )
    .join("");

  const nextStepsHTML = results.insights.nextSteps
    .map(
      (step, i) => `
      <div style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 8px;">
        <span style="display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; background: #DBEAFE; color: #1E40AF; font-size: 11px; font-weight: 700; flex-shrink: 0;">${i + 1}</span>
        <span style="font-size: 12px; color: #44403C; line-height: 1.5;">${step}</span>
      </div>`,
    )
    .join("");

  const roleLabel = role
    ? role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : isEs
      ? "General"
      : "General";

  return `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1C1917; padding: 32px 28px; max-width: 700px;">
      <!-- Header -->
      <div style="border-bottom: 2px solid #0F766E; padding-bottom: 16px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #0F766E; letter-spacing: -0.3px;">
              ${isEs ? "Resultados de Evaluaci\u00f3n Profesional FQHC" : "FQHC Career Assessment Results"}
            </h1>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #78716C;">
              ${today}
            </p>
          </div>
          <div style="text-align: right;">
            <p style="margin: 0; font-size: 11px; font-weight: 600; color: #0F766E;">fqhctalent.com</p>
            <p style="margin: 2px 0 0 0; font-size: 10px; color: #A8A29E;">${isEs ? "Inteligencia FQHC de California" : "California FQHC Intelligence"}</p>
          </div>
        </div>
      </div>

      <!-- Overall Score + Role -->
      <div style="display: flex; gap: 16px; margin-bottom: 24px;">
        <div style="flex: 1; background: #F0FDFA; border: 1px solid #99F6E4; border-radius: 8px; padding: 16px; text-align: center;">
          <p style="margin: 0; font-size: 36px; font-weight: 700; color: #0F766E;">${results.overallScore}</p>
          <p style="margin: 4px 0 0 0; font-size: 11px; color: #44403C; text-transform: uppercase; letter-spacing: 0.5px;">${isEs ? "Puntuaci\u00f3n General" : "Overall Score"}</p>
        </div>
        <div style="flex: 1; background: #FFFBEB; border: 1px solid #FDE68A; border-radius: 8px; padding: 16px; text-align: center;">
          <p style="margin: 0; font-size: 14px; font-weight: 600; color: #92400E;">${roleLabel}</p>
          <p style="margin: 4px 0 0 0; font-size: 11px; color: #44403C; text-transform: uppercase; letter-spacing: 0.5px;">${isEs ? "Rol Evaluado" : "Role Assessed"}</p>
        </div>
        <div style="flex: 1; background: #F0FDFA; border: 1px solid #99F6E4; border-radius: 8px; padding: 16px; text-align: center;">
          <p style="margin: 0; font-size: 14px; font-weight: 600; color: #0F766E;">${getDomainName(results.topStrength, locale)}</p>
          <p style="margin: 4px 0 0 0; font-size: 11px; color: #44403C; text-transform: uppercase; letter-spacing: 0.5px;">${isEs ? "Mayor Fortaleza" : "Top Strength"}</p>
        </div>
      </div>

      <!-- Domain Scores -->
      <h2 style="margin: 0 0 14px 0; font-size: 15px; font-weight: 700; color: #1C1917; border-bottom: 1px solid #E7E5E4; padding-bottom: 8px;">
        ${isEs ? "Puntuaciones por Dominio" : "Domain Scores"}
      </h2>
      ${domainBarsHTML}

      <!-- Strengths -->
      <h2 style="margin: 24px 0 12px 0; font-size: 15px; font-weight: 700; color: #0F766E; border-bottom: 1px solid #E7E5E4; padding-bottom: 8px;">
        ${isEs ? "Tus Fortalezas" : "Your Strengths"}
      </h2>
      ${strengthsHTML}

      <!-- Growth Areas -->
      <h2 style="margin: 20px 0 12px 0; font-size: 15px; font-weight: 700; color: #92400E; border-bottom: 1px solid #E7E5E4; padding-bottom: 8px;">
        ${isEs ? "Oportunidades de Crecimiento" : "Growth Opportunities"}
      </h2>
      ${growthHTML}

      <!-- Next Steps -->
      <h2 style="margin: 20px 0 12px 0; font-size: 15px; font-weight: 700; color: #1E40AF; border-bottom: 1px solid #E7E5E4; padding-bottom: 8px;">
        ${isEs ? "Pr\u00f3ximos Pasos Recomendados" : "Recommended Next Steps"}
      </h2>
      ${nextStepsHTML}

      <!-- Footer -->
      <div style="margin-top: 28px; padding-top: 14px; border-top: 1px solid #D6D3D1; text-align: center;">
        <p style="margin: 0; font-size: 10px; color: #A8A29E;">
          ${isEs ? "Generado por FQHC Talent Exchange" : "Generated by FQHC Talent Exchange"} &nbsp;|&nbsp; fqhctalent.com &nbsp;|&nbsp; hello@fqhctalent.com
        </p>
        <p style="margin: 6px 0 0 0; font-size: 9px; color: #D6D3D1;">
          ${isEs ? "Explora herramientas gratuitas de carrera, datos salariales y gu\u00edas en fqhctalent.com" : "Explore free career tools, salary data, and guides at fqhctalent.com"}
        </p>
      </div>
    </div>
  `;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function AssessmentPDF({ results, role, locale = "en" }: AssessmentPDFProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const isEs = locale === "es";

  async function handleDownload() {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      const html2pdf = (await import("html2pdf.js")).default;

      const container = document.createElement("div");
      container.innerHTML = buildAssessmentHTML(results, role, locale);
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
          filename: `FQHC_Career_Assessment_${dateSlug}.pdf`,
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "in", format: "letter" },
        })
        .save();

      document.body.removeChild(container);

      trackEvent({
        event_type: "assessment_download",
        tool_name: "career_assessment_pdf",
        metadata: { role: role ?? "general" },
      });
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className="inline-flex items-center gap-2 rounded-lg border border-teal-200 bg-white px-4 py-2 text-sm font-semibold text-teal-700 shadow-sm transition-colors hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isGenerating ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Download className="size-4" />
      )}
      {isGenerating
        ? (isEs ? "Generando..." : "Generating...")
        : (isEs ? "Descargar Resultados PDF" : "Download Results PDF")}
    </button>
  );
}
