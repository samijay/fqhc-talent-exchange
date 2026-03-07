// okr-excel-export.ts
// Generates a tracking-ready Excel workbook from OKR templates
// Uses SheetJS (xlsx) — dynamically imported to keep bundle small
// Each template gets its own sheet with Owner / Current Value / Status columns
// "use client" — runs in browser only (file-saver triggers download)

import type { OKRTemplate } from "./fqhc-okr-templates";
import { OKR_DOMAINS, DIFFICULTY_LABELS } from "./fqhc-okr-templates";

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  Column definitions for the KR tracking table                       */
/* ------------------------------------------------------------------ */

const KR_COL_WIDTHS = [
  { wch: 4 },   // A  — #
  { wch: 55 },  // B  — Key Result (widest)
  { wch: 22 },  // C  — Metric
  { wch: 18 },  // D  — Target
  { wch: 18 },  // E  — Owner (user fills)
  { wch: 16 },  // F  — Current Value (user fills)
  { wch: 13 },  // G  — % Progress (user fills)
  { wch: 14 },  // H  — Status (user fills)
  { wch: 35 },  // I  — Notes (user fills)
  { wch: 12 },  // J  — Due Date (user fills)
];

const KR_HEADERS = ["#", "KEY RESULT", "METRIC", "TARGET", "OWNER", "CURRENT VALUE", "% PROGRESS", "STATUS", "NOTES", "DUE DATE"];

/* ------------------------------------------------------------------ */
/*  Build one worksheet per OKR template                               */
/* ------------------------------------------------------------------ */

function buildTemplateSheet(
  XLSX: typeof import("xlsx"),
  okr: OKRTemplate,
  index: number,
  locale: string,
) {
  const isEs = locale === "es";
  const domainMeta = OKR_DOMAINS.find((d) => d.id === okr.domain);
  const diffMeta = DIFFICULTY_LABELS[okr.difficulty];

  const rows: (string | number)[][] = [];

  // ── Row 1: Template number + objective (merged cell via !merges)
  rows.push([`${index}. ${t(okr.objective, locale)}`]);

  // ── Row 2: Domain / Difficulty / Timeframe metadata
  rows.push([
    `${isEs ? "Dominio" : "Domain"}: ${domainMeta ? t(domainMeta, locale) : okr.domain}`,
    "",
    `${isEs ? "Dificultad" : "Difficulty"}: ${t(diffMeta, locale)}`,
    "",
    `${isEs ? "Período" : "Timeframe"}: ${okr.timeframe === "quarterly" ? (isEs ? "Trimestral" : "Quarterly") : (isEs ? "Anual" : "Annual")}`,
  ]);

  // ── Row 3: Context label
  rows.push([isEs ? "CONTEXTO:" : "CONTEXT:"]);

  // ── Row 4: Context text (merged)
  rows.push([t(okr.context, locale)]);

  // ── Row 5: Empty separator
  rows.push([]);

  // ── Row 6: KR column headers
  rows.push(KR_HEADERS);

  // ── Rows 7+: One row per Key Result
  okr.keyResults.forEach((kr, i) => {
    rows.push([
      i + 1,
      t(kr.kr, locale),
      kr.metric,
      kr.target,
      "",                  // Owner — user fills
      "",                  // Current Value — user fills
      "",                  // % Progress — user fills
      isEs ? "No Iniciado" : "Not Started",   // Default status
      "",                  // Notes — user fills
      "",                  // Due Date — user fills
    ]);
  });

  // ── Empty row
  rows.push([]);

  // ── Departments row
  const allDepts = [...new Set(okr.keyResults.flatMap((kr) => kr.departmentsInvolved))];
  rows.push([`${isEs ? "Departamentos involucrados" : "Departments involved"}: ${allDepts.join(" | ")}`]);

  // ── Tags row
  if (okr.tags.length > 0) {
    rows.push([`${isEs ? "Etiquetas" : "Tags"}: ${okr.tags.join(", ")}`]);
  }

  // ── Source row
  rows.push([`${isEs ? "Fuente" : "Source"}: fqhctalent.com/strategy/okrs`]);

  // Create worksheet
  const ws = XLSX.utils.aoa_to_sheet(rows);

  // Column widths
  ws["!cols"] = KR_COL_WIDTHS;

  // Merge cells: title row (row 0) spans all 10 columns
  const headerRowIdx = 5; // 0-indexed: rows 0-4 are title/meta, row 5 is headers
  ws["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 9 } },          // Title
    { s: { r: 2, c: 0 }, e: { r: 2, c: 9 } },          // "CONTEXT:" label
    { s: { r: 3, c: 0 }, e: { r: 3, c: 9 } },          // Context text
    { s: { r: rows.length - 3, c: 0 }, e: { r: rows.length - 3, c: 9 } }, // Departments
    { s: { r: rows.length - 2, c: 0 }, e: { r: rows.length - 2, c: 9 } }, // Tags
    { s: { r: rows.length - 1, c: 0 }, e: { r: rows.length - 1, c: 9 } }, // Source
  ];

  // Mark unused header cells as empty string so they render correctly
  void headerRowIdx;

  return ws;
}

/* ------------------------------------------------------------------ */
/*  Build the Index / Quick Start sheet                                */
/* ------------------------------------------------------------------ */

function buildIndexSheet(
  XLSX: typeof import("xlsx"),
  templates: OKRTemplate[],
  locale: string,
) {
  const isEs = locale === "es";

  const rows: (string | number)[][] = [
    // Title
    [isEs ? "Manual de Seguimiento OKR — FQHC Talent Exchange" : "OKR Tracking Workbook — FQHC Talent Exchange"],
    ["fqhctalent.com · California FQHC Strategic Monitor · 2026"],
    [],
    [isEs ? "CÓMO USAR ESTE ARCHIVO" : "HOW TO USE THIS WORKBOOK"],
    [isEs ? "1. Navega a cualquier plantilla usando las pestañas en la parte inferior" : "1. Navigate to any OKR template using the sheet tabs at the bottom"],
    [isEs ? "2. Llena la columna PROPIETARIO con el departamento/persona responsable de cada KR" : "2. Fill in the OWNER column with the responsible department/person for each KR"],
    [isEs ? "3. Actualiza VALOR ACTUAL regularmente (semanal o mensual)" : "3. Update CURRENT VALUE regularly (weekly or monthly)"],
    [isEs ? "4. Cambia el ESTADO a: No Iniciado / En Progreso / En Camino / En Riesgo / Completo" : "4. Set STATUS to: Not Started / In Progress / On Track / At Risk / Complete"],
    [isEs ? "5. Empieza con la hoja '★ Empresa Completa' para tus OKRs de toda la organización" : "5. Start with the '★ Company-Wide' sheet for your org-level OKRs"],
    [],
    [isEs ? "ÍNDICE DE PLANTILLAS" : "TEMPLATE INDEX"],
    // Table headers
    ["#", isEs ? "ID" : "ID", isEs ? "Objetivo" : "Objective", isEs ? "Dominio" : "Domain", isEs ? "Dificultad" : "Difficulty", isEs ? "Período" : "Timeframe"],
    // One row per template
    ...templates.map((okr, i) => {
      const domainMeta = OKR_DOMAINS.find((d) => d.id === okr.domain);
      return [
        i + 1,
        okr.id,
        t(okr.objective, locale),
        domainMeta ? t(domainMeta, locale) : okr.domain,
        t(DIFFICULTY_LABELS[okr.difficulty], locale),
        okr.timeframe === "quarterly" ? (isEs ? "Trimestral" : "Quarterly") : (isEs ? "Anual" : "Annual"),
      ];
    }),
    [],
    [isEs ? "Descargado de fqhctalent.com — Datos de FQHC de California 2026" : "Downloaded from fqhctalent.com — California FQHC Data 2026"],
  ];

  const ws = XLSX.utils.aoa_to_sheet(rows);

  ws["!cols"] = [
    { wch: 4 },   // #
    { wch: 30 },  // ID
    { wch: 65 },  // Objective
    { wch: 25 },  // Domain
    { wch: 16 },  // Difficulty
    { wch: 12 },  // Timeframe
  ];

  ws["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }, // Title
    { s: { r: 1, c: 0 }, e: { r: 1, c: 5 } }, // Subtitle
    { s: { r: 3, c: 0 }, e: { r: 3, c: 5 } }, // How to use header
  ];

  return ws;
}

/* ------------------------------------------------------------------ */
/*  Truncate sheet name to Excel's 31-char limit                       */
/* ------------------------------------------------------------------ */

function safeSheetName(text: string, prefix = ""): string {
  const cleaned = text.replace(/[\/\\?*[\]]/g, "").trim();
  const full = prefix ? `${prefix} ${cleaned}` : cleaned;
  return full.length > 31 ? full.slice(0, 31) : full;
}

/* ------------------------------------------------------------------ */
/*  Main export function — called from OKR page                        */
/* ------------------------------------------------------------------ */

/**
 * Downloads all passed OKR templates as a .xlsx tracking workbook.
 * Each template gets its own sheet. Featured templates appear first.
 * Call from a client component: `await downloadOKRsAsExcel(templates, locale)`
 */
export async function downloadOKRsAsExcel(
  templates: OKRTemplate[],
  locale: string,
  filename?: string,
): Promise<void> {
  // Dynamic imports to keep bundle size small (xlsx is ~600KB)
  const XLSX = await import("xlsx");
  const { saveAs } = await import("file-saver");

  const isEs = locale === "es";

  // Sort: featured first, then rest in original order
  const sorted = [
    ...templates.filter((t) => t.featured),
    ...templates.filter((t) => !t.featured),
  ];

  const wb = XLSX.utils.book_new();

  // ── Sheet 1: Index / Quick Start
  const indexSheet = buildIndexSheet(XLSX, sorted, locale);
  XLSX.utils.book_append_sheet(wb, indexSheet, isEs ? "📋 Inicio" : "📋 Quick Start");

  // ── One sheet per template
  sorted.forEach((okr, i) => {
    const ws = buildTemplateSheet(XLSX, okr, i + 1, locale);

    // Sheet name: truncated objective with a star for featured
    const prefix = okr.featured ? "★" : `${i + 1}.`;
    const objective = t(okr.objective, locale);
    // Use first ~25 chars of objective for the sheet name
    const shortObj = objective.length > 22 ? objective.slice(0, 22) + "…" : objective;
    const sheetName = safeSheetName(shortObj, prefix);

    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  });

  // Generate buffer and trigger download
  const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const name = filename ?? (isEs ? "plantillas-okr-fqhc-tracker.xlsx" : "fqhc-okr-tracker.xlsx");
  saveAs(blob, name);
}

/**
 * Downloads a single OKR template as a standalone .xlsx file.
 */
export async function downloadSingleOKRAsExcel(
  okr: OKRTemplate,
  locale: string,
): Promise<void> {
  const XLSX = await import("xlsx");
  const { saveAs } = await import("file-saver");

  const wb = XLSX.utils.book_new();
  const ws = buildTemplateSheet(XLSX, okr, 1, locale);

  const isEs = locale === "es";
  const objective = t(okr.objective, locale);
  const shortObj = objective.length > 28 ? objective.slice(0, 28) + "…" : objective;
  XLSX.utils.book_append_sheet(wb, ws, safeSheetName(shortObj));

  const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const safeName = okr.id.replace(/[^a-z0-9-]/gi, "-");
  saveAs(blob, `okr-${safeName}.xlsx`);
}
