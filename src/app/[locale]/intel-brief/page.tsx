"use client";

import { useState, useRef } from "react";
import { useLocale } from "next-intl";
import { formatDate } from "@/lib/i18n-helpers";
import { Link } from "@/i18n/navigation";
import {
  Download,
  FileText,
  AlertTriangle,
  TrendingUp,
  Shield,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  INTEL_ITEMS,
  INTEL_LAST_UPDATED,
  INTEL_CATEGORIES,
} from "@/lib/fqhc-news-intel";
import type { IntelItem, ImpactLevel } from "@/lib/fqhc-news-intel";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const IMPACT_COLOR: Record<ImpactLevel, string> = {
  critical: "#dc2626",
  high: "#d97706",
  medium: "#2563eb",
  low: "#78716c",
};

function getTopItems(limit = 10): IntelItem[] {
  const priority: Record<ImpactLevel, number> = { critical: 4, high: 3, medium: 2, low: 1 };
  return [...INTEL_ITEMS]
    .filter((i) => i.type === "news")
    .sort((a, b) => {
      const pDiff = priority[b.impactLevel] - priority[a.impactLevel];
      if (pDiff !== 0) return pDiff;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, limit);
}

function getCategoryCounts() {
  const counts: Record<string, number> = {};
  INTEL_ITEMS.forEach((i) => {
    counts[i.category] = (counts[i.category] || 0) + 1;
  });
  return counts;
}

// formatDate imported from @/lib/i18n-helpers

/* ------------------------------------------------------------------ */
/*  PDF Generation                                                     */
/* ------------------------------------------------------------------ */

async function downloadPDF(element: HTMLElement) {
  const html2pdf = (await import("html2pdf.js")).default;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const opt: any = {
    margin: [10, 10, 10, 10],
    filename: `FQHC-Intel-Brief-${INTEL_LAST_UPDATED}.pdf`,
    image: { type: "jpeg", quality: 0.95 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "letter", orientation: "portrait" },
    pagebreak: { mode: ["avoid-all", "css", "legacy"] },
  };
  html2pdf().set(opt).from(element).save();
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function IntelBriefPage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const briefRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [email, setEmail] = useState("");
  const [captured, setCaptured] = useState(false);

  const topItems = getTopItems(10);
  const categoryCounts = getCategoryCounts();
  const criticalCount = INTEL_ITEMS.filter((i) => i.impactLevel === "critical").length;
  const highCount = INTEL_ITEMS.filter((i) => i.impactLevel === "high").length;

  const handleDownload = async () => {
    if (!briefRef.current) return;
    // Simple email capture (fire-and-forget)
    if (email && !captured) {
      try {
        await fetch("/api/track-event", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event: "intel_brief_download", properties: { email } }),
        });
      } catch {
        // Silent fail
      }
      setCaptured(true);
    }
    setDownloading(true);
    await downloadPDF(briefRef.current);
    setDownloading(false);
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-amber-400 text-sm font-medium mb-4">
            <FileText className="size-4" />
            {isEs ? "Informe Semanal de Inteligencia" : "Weekly Intelligence Brief"}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {isEs ? "FQHC Intel Brief" : "FQHC Intel Brief"}
          </h1>
          <p className="mt-3 text-lg text-stone-300">
            {isEs
              ? `${INTEL_ITEMS.length} hallazgos de inteligencia curados para líderes de FQHCs. Actualizado ${INTEL_LAST_UPDATED}.`
              : `${INTEL_ITEMS.length} curated intelligence findings for FQHC leaders. Updated ${INTEL_LAST_UPDATED}.`}
          </p>

          {/* Stats */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="rounded-lg bg-red-900/30 border border-red-700/40 px-4 py-2">
              <span className="text-2xl font-bold text-red-400">{criticalCount}</span>
              <span className="ml-2 text-sm text-red-300">{isEs ? "Críticos" : "Critical"}</span>
            </div>
            <div className="rounded-lg bg-amber-900/30 border border-amber-700/40 px-4 py-2">
              <span className="text-2xl font-bold text-amber-400">{highCount}</span>
              <span className="ml-2 text-sm text-amber-300">{isEs ? "Alto Impacto" : "High Impact"}</span>
            </div>
            <div className="rounded-lg bg-stone-700/50 border border-stone-600 px-4 py-2">
              <span className="text-2xl font-bold text-stone-200">{INTEL_ITEMS.length}</span>
              <span className="ml-2 text-sm text-stone-400">{isEs ? "Total" : "Total Items"}</span>
            </div>
          </div>

          {/* Download CTA */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end">
            {!captured && (
              <div className="flex-1 max-w-sm">
                <label className="text-xs text-stone-400 mb-1 block">{isEs ? "Tu email (opcional)" : "Your email (optional)"}</label>
                <Input
                  type="email"
                  placeholder="you@fqhc.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 bg-stone-700 border-stone-600 text-white placeholder:text-stone-500"
                />
              </div>
            )}
            <Button
              onClick={handleDownload}
              disabled={downloading}
              className="h-11 bg-amber-500 text-stone-900 hover:bg-amber-400 font-bold px-8"
            >
              <Download className="mr-2 size-4" />
              {downloading
                ? (isEs ? "Generando..." : "Generating...")
                : (isEs ? "Descargar PDF" : "Download Intel Brief (PDF)")}
            </Button>
          </div>
        </div>
      </section>

      {/* Category breakdown */}
      <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {INTEL_CATEGORIES.map((cat) => (
            <Badge key={cat.id} variant="secondary" className="text-xs">
              {isEs ? cat.es : cat.en} ({categoryCounts[cat.id] || 0})
            </Badge>
          ))}
        </div>
      </section>

      {/* Printable brief content */}
      <div ref={briefRef} className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        {/* Brief header (shows in PDF) */}
        <div className="rounded-xl border border-stone-200 bg-white p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-stone-900">FQHC Intel Brief</h2>
              <p className="text-sm text-stone-500 mt-1">
                {isEs ? "Inteligencia Estratégica para Centros de Salud Comunitarios de California" : "Strategic Intelligence for California Community Health Centers"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-teal-700">fqhctalent.com</p>
              <p className="text-xs text-stone-500 flex items-center gap-1 justify-end">
                <Calendar className="size-3" /> {INTEL_LAST_UPDATED}
              </p>
            </div>
          </div>

          {/* Executive summary */}
          <div className="rounded-lg bg-stone-50 border border-stone-200 p-4 mb-6">
            <h3 className="text-sm font-bold text-stone-800 flex items-center gap-2">
              <AlertTriangle className="size-4 text-amber-600" />
              {isEs ? "Resumen Ejecutivo" : "Executive Summary"}
            </h3>
            <p className="mt-2 text-sm text-stone-700 leading-relaxed">
              {isEs
                ? `Este informe cubre ${INTEL_ITEMS.length} hallazgos de inteligencia para FQHCs de California, incluyendo ${criticalCount} alertas críticas y ${highCount} de alto impacto. Las principales amenazas incluyen los recortes de H.R. 1 a Medicaid, la eliminación de PPS para pacientes indocumentados, y la crisis de fuerza laboral con 3,477+ trabajadores afectados por recortes.`
                : `This brief covers ${INTEL_ITEMS.length} intelligence findings for California FQHCs, including ${criticalCount} critical alerts and ${highCount} high-impact items. Top threats include H.R. 1 Medicaid cuts, PPS elimination for undocumented patients, and the workforce crisis with 3,477+ workers affected by layoffs.`}
            </p>
          </div>

          {/* Top items */}
          <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
            <TrendingUp className="size-5 text-teal-700" />
            {isEs ? "Top 10 Hallazgos" : "Top 10 Findings"}
          </h3>
          <div className="space-y-4">
            {topItems.map((item, idx) => (
              <div
                key={item.id}
                className="rounded-lg border border-stone-200 p-4"
                style={{ borderLeftWidth: 4, borderLeftColor: IMPACT_COLOR[item.impactLevel] }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-stone-400">#{idx + 1}</span>
                  <Badge
                    className="text-[10px] px-1.5 py-0"
                    style={{
                      backgroundColor: `${IMPACT_COLOR[item.impactLevel]}15`,
                      color: IMPACT_COLOR[item.impactLevel],
                    }}
                  >
                    {item.impactLevel.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-stone-500">{formatDate(item.date, locale)}</span>
                  <span className="text-xs text-stone-400">• {item.sourceOrg}</span>
                </div>
                <h4 className="text-sm font-bold text-stone-800">
                  {isEs ? item.headline.es : item.headline.en}
                </h4>
                <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                  {isEs ? item.summary.es : item.summary.en}
                </p>
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-[10px] text-teal-700 hover:underline"
                >
                  {isEs ? "Fuente →" : "Source →"}
                </a>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 border-t border-stone-200 pt-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-500">
                {isEs ? "Generado por" : "Generated by"}{" "}
                <span className="font-bold text-teal-700">FQHC Talent Exchange</span>
              </p>
              <p className="text-[10px] text-stone-400">hello@fqhctalent.com • fqhctalent.com</p>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="size-4 text-teal-700" />
              <span className="text-[10px] text-stone-400">
                {isEs ? "Todas las fuentes verificadas" : "All sources verified"} • {INTEL_LAST_UPDATED}
              </span>
            </div>
          </div>
        </div>

        {/* CTA section (not in PDF ideally, but harmless) */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl border border-teal-200 bg-teal-50 p-4 hover:bg-teal-100 transition-colors"
          >
            <TrendingUp className="size-6 text-teal-700 shrink-0" />
            <div>
              <p className="text-sm font-bold text-teal-900">{isEs ? "Panel de Inteligencia" : "Intelligence Dashboard"}</p>
              <p className="text-xs text-teal-700">{isEs ? "Todas las alertas en tiempo real" : "All alerts in real-time"}</p>
            </div>
            <ArrowRight className="size-4 text-teal-600 ml-auto" />
          </Link>
          <Link
            href="/newsletter"
            className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white p-4 hover:bg-stone-50 transition-colors"
          >
            <FileText className="size-6 text-stone-500 shrink-0" />
            <div>
              <p className="text-sm font-bold text-stone-900">{isEs ? "Suscríbete al Intel Brief" : "Subscribe to Intel Brief"}</p>
              <p className="text-xs text-stone-500">{isEs ? "Recibe esto cada martes" : "Get this every Tuesday"}</p>
            </div>
            <ArrowRight className="size-4 text-stone-400 ml-auto" />
          </Link>
        </div>
      </div>
    </div>
  );
}
