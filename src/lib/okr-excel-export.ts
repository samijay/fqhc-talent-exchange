// okr-excel-export.ts
// Generates a polished, color-coded, formula-driven Excel workbook from OKR templates
// Uses SheetJS (xlsx) — dynamically imported to keep bundle small
// Enhanced with conditional formatting colors, weighted scoring, and FQHC best practices
// "use client" — runs in browser only (file-saver triggers download)

import type { OKRTemplate } from "./fqhc-okr-templates";
import { OKR_DOMAINS, DIFFICULTY_LABELS } from "./fqhc-okr-templates";
import { trackEvent } from "./track";

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  Color palette — navy/teal/amber/green/red professional scheme      */
/* ------------------------------------------------------------------ */

const COLORS = {
  navy: "1B3A5C",
  teal: "0D7377",
  lightTeal: "D4EFEF",
  amber: "D4870E",
  lightAmber: "FFF3D6",
  green: "27AE60",
  lightGreen: "D5F5E3",
  red: "C0392B",
  lightRed: "FADBD8",
  white: "FFFFFF",
  lightGray: "F2F4F4",
  inputBlue: "EBF5FB",
  medGray: "95A5A6",
  black: "000000",
};

/* ------------------------------------------------------------------ */
/*  Column definitions for the KR tracking table                       */
/* ------------------------------------------------------------------ */

const KR_COL_WIDTHS = [
  { wch: 5 },   // A  — #
  { wch: 52 },  // B  — Key Result
  { wch: 22 },  // C  — Metric
  { wch: 16 },  // D  — Target
  { wch: 16 },  // E  — Owner (user fills)
  { wch: 14 },  // F  — Current Value (user fills)
  { wch: 12 },  // G  — Score 0.0–1.0 (user fills)
  { wch: 10 },  // H  — Weight (user fills, default 1)
  { wch: 12 },  // I  — Weighted (formula)
  { wch: 14 },  // J  — Status
  { wch: 32 },  // K  — Notes / Evidence
  { wch: 12 },  // L  — Due Date
];

const KR_HEADERS_EN = ["#", "KEY RESULT", "METRIC", "TARGET", "OWNER", "CURRENT VALUE", "SCORE (0-1)", "WEIGHT", "WEIGHTED", "STATUS", "NOTES / EVIDENCE", "DUE DATE"];
const KR_HEADERS_ES = ["#", "RESULTADO CLAVE", "MÉTRICA", "META", "PROPIETARIO", "VALOR ACTUAL", "PUNTAJE (0-1)", "PESO", "PONDERADO", "ESTADO", "NOTAS / EVIDENCIA", "FECHA LÍMITE"];

/* ------------------------------------------------------------------ */
/*  Style helpers — SheetJS cell styling                               */
/* ------------------------------------------------------------------ */

function headerStyle() {
  return {
    font: { name: "Arial", bold: true, color: { rgb: COLORS.white }, sz: 11 },
    fill: { fgColor: { rgb: COLORS.navy } },
    alignment: { horizontal: "center" as const, vertical: "center" as const, wrapText: true },
    border: thinBorder(),
  };
}

function subheaderStyle() {
  return {
    font: { name: "Arial", bold: true, color: { rgb: COLORS.navy }, sz: 10 },
    fill: { fgColor: { rgb: COLORS.lightTeal } },
    alignment: { horizontal: "left" as const, vertical: "center" as const, wrapText: true },
    border: thinBorder(),
  };
}

function bodyStyle(opts?: { bold?: boolean; color?: string; fill?: string; italic?: boolean; center?: boolean }) {
  return {
    font: { name: "Arial", sz: 10, bold: opts?.bold, color: opts?.color ? { rgb: opts.color } : undefined, italic: opts?.italic },
    fill: opts?.fill ? { fgColor: { rgb: opts.fill } } : undefined,
    alignment: { horizontal: opts?.center ? ("center" as const) : ("left" as const), vertical: "center" as const, wrapText: true },
    border: thinBorder(),
  };
}

function inputStyle() {
  return {
    font: { name: "Arial", sz: 10, color: { rgb: "0000FF" } },
    fill: { fgColor: { rgb: COLORS.inputBlue } },
    alignment: { horizontal: "center" as const, vertical: "center" as const },
    border: thinBorder(),
  };
}

function formulaStyle() {
  return {
    font: { name: "Arial", sz: 10, bold: true, color: { rgb: COLORS.black } },
    alignment: { horizontal: "center" as const, vertical: "center" as const },
    border: thinBorder(),
    numFmt: "0.00",
  };
}

function thinBorder() {
  const side = { style: "thin" as const, color: { rgb: "BDC3C7" } };
  return { top: side, bottom: side, left: side, right: side };
}

/* ------------------------------------------------------------------ */
/*  Apply styles to cells (SheetJS-XLSX-style plugin format)           */
/* ------------------------------------------------------------------ */

function setStyle(ws: Record<string, unknown>, ref: string, style: Record<string, unknown>) {
  const cell = ws[ref] as Record<string, unknown> | undefined;
  if (cell) {
    cell.s = style;
  }
}

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
  const headers = isEs ? KR_HEADERS_ES : KR_HEADERS_EN;

  const rows: (string | number)[][] = [];

  // ── Row 0: Title — objective with number
  rows.push([`${okr.featured ? "★ " : ""}${index}. ${t(okr.objective, locale)}`]);

  // ── Row 1: Domain / Difficulty / Timeframe / Departments
  const allDepts = [...new Set(okr.keyResults.flatMap((kr) => kr.departmentsInvolved))];
  rows.push([
    `${isEs ? "Dominio" : "Domain"}: ${domainMeta ? t(domainMeta, locale) : okr.domain}`,
    "",
    `${isEs ? "Dificultad" : "Difficulty"}: ${t(diffMeta, locale)}`,
    "",
    `${isEs ? "Período" : "Timeframe"}: ${okr.timeframe === "quarterly" ? (isEs ? "Trimestral" : "Quarterly") : (isEs ? "Anual" : "Annual")}`,
    "",
    `${isEs ? "Departamentos" : "Departments"}: ${allDepts.join(", ")}`,
  ]);

  // ── Row 2: Context
  rows.push([`${isEs ? "Contexto" : "Context"}: ${t(okr.context, locale)}`]);

  // ── Row 3: Scoring guide
  rows.push([isEs
    ? "🟢 0.7–1.0 = En camino   🟡 0.4–0.69 = Necesita atención   🔴 0.0–0.39 = En riesgo   |   Meta: promedio 0.6–0.7"
    : "🟢 0.7–1.0 = On Track   🟡 0.4–0.69 = Needs Attention   🔴 0.0–0.39 = At Risk   |   Sweet spot: 0.6–0.7 avg"]);

  // ── Row 4: Empty separator
  rows.push([]);

  // ── Row 5: Column headers
  rows.push(headers);

  // ── Rows 6+: Key Results with formulas
  const krStartRow = 7; // 1-indexed for formulas
  okr.keyResults.forEach((kr, i) => {
    const rowNum = krStartRow + i;
    rows.push([
      i + 1,
      t(kr.kr, locale),
      kr.metric,
      kr.target,
      "",                  // Owner — user fills
      "",                  // Current Value — user fills
      "",                  // Score 0-1 — user fills
      1,                   // Weight — default 1, user can adjust
      `=IF(G${rowNum}="","",G${rowNum}*H${rowNum})`, // Weighted score formula
      isEs ? "No Iniciado" : "Not Started",
      "",                  // Notes — user fills
      "",                  // Due Date — user fills
    ]);
  });

  // ── Empty separator row
  const sepRowIdx = rows.length;
  rows.push([]);

  // ── Objective Score row (auto-calculated)
  const krEndRow = krStartRow + okr.keyResults.length - 1;
  rows.push([
    "",
    isEs ? "PUNTAJE DEL OBJETIVO" : "OBJECTIVE SCORE",
    "",
    "",
    "",
    "",
    `=IFERROR(SUMPRODUCT(G${krStartRow}:G${krEndRow},H${krStartRow}:H${krEndRow})/SUM(H${krStartRow}:H${krEndRow}),"")`,
    "",
    "",
    "",
    isEs
      ? "Se calcula automáticamente del promedio ponderado de KRs"
      : "Auto-calculated weighted average of KR scores",
  ]);

  // ── Tags row
  if (okr.tags.length > 0) {
    rows.push([`${isEs ? "Etiquetas" : "Tags"}: ${okr.tags.join(", ")}`]);
  }

  // ── Source
  rows.push([`${isEs ? "Fuente" : "Source"}: fqhctalent.com/strategy/okrs — ${isEs ? "Herramienta OKR de FQHC Talent" : "FQHC Talent OKR Toolkit"} 2026`]);

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws["!cols"] = KR_COL_WIDTHS;

  // Merge cells
  ws["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 11 } },   // Title
    { s: { r: 2, c: 0 }, e: { r: 2, c: 11 } },   // Context
    { s: { r: 3, c: 0 }, e: { r: 3, c: 11 } },   // Scoring guide
    { s: { r: sepRowIdx + 1, c: 1 }, e: { r: sepRowIdx + 1, c: 5 } }, // "OBJECTIVE SCORE" label
    { s: { r: rows.length - 1, c: 0 }, e: { r: rows.length - 1, c: 11 } }, // Source
  ];
  if (okr.tags.length > 0) {
    ws["!merges"].push({ s: { r: rows.length - 2, c: 0 }, e: { r: rows.length - 2, c: 11 } }); // Tags
  }

  return ws;
}

/* ------------------------------------------------------------------ */
/*  Build OKR Grading Guide sheet                                      */
/* ------------------------------------------------------------------ */

function buildGradingGuideSheet(
  XLSX: typeof import("xlsx"),
  locale: string,
) {
  const isEs = locale === "es";
  const rows: (string | number)[][] = [
    [isEs ? "GUÍA DE CALIFICACIÓN OKR — Qué Significa Cada Puntaje en Atención Primaria" : "OKR GRADING GUIDE — What Each Score Means in Primary Healthcare"],
    [],
    [
      isEs ? "Rango" : "Score Range",
      isEs ? "Calificación" : "Rating",
      isEs ? "Significado General" : "General Meaning",
      isEs ? "Ejemplo FQHC" : "FQHC Example",
    ],
    [
      "1.0",
      isEs ? "Extraordinario" : "Extraordinary",
      isEs ? "Superó la meta ambiciosa — resultado verdaderamente excepcional" : "Exceeded the stretch goal — truly exceptional outcome",
      isEs ? "KR era 'Aumentar control de diabetes a 72%' — alcanzaste 78%." : "KR was 'Increase diabetes control to 72%' — you hit 78%. Champion-level.",
    ],
    [
      "0.7–0.9",
      isEs ? "Fuerte" : "Strong",
      isEs ? "Resultados significativos; este es el 'punto ideal' para OKRs bien establecidos" : "Delivered meaningful results; this is the 'sweet spot' for well-set OKRs",
      isEs ? "KR era 'Reducir no-shows a 12%' — alcanzaste 13.5%. Progreso real." : "KR was 'Reduce no-show rate to 12%' — you reached 13.5%. Real progress.",
    ],
    [
      "0.4–0.6",
      isEs ? "Progreso Parcial" : "Progress Made",
      isEs ? "Trabajo significativo pero por debajo de la meta — necesita atención" : "Meaningful work happened but fell short — needs attention",
      isEs ? "KR era 'Contratar 4 proveedores' — contrataste 2, uno en credenciales." : "KR was 'Hire 4 providers' — you hired 2, 1 in credentialing. Pipeline exists.",
    ],
    [
      "0.1–0.3",
      isEs ? "Limitado" : "Limited",
      isEs ? "Movimiento mínimo; bloqueado por recursos o desalineación" : "Minimal movement; blocked by resources, priority shifts, or misalignment",
      isEs ? "KR era 'Lanzar portal a 40%' — estás en 15%. Migración IT retrasó." : "KR was 'Launch portal to 40%' — at 15%. IT migration delayed rollout.",
    ],
    [
      "0.0",
      isEs ? "Sin Progreso" : "No Progress",
      isEs ? "Nada ocurrió — se despriorizar, se olvidó, o imposible como fue escrito" : "Nothing happened — deprioritized, forgotten, or impossible as written",
      isEs ? "KR era 'Abrir nueva clínica' — contrato de arrendamiento falló, sin plan B." : "KR was 'Open new clinic site' — lease fell through, no backup activated.",
    ],
    [],
    [isEs ? "PRINCIPIOS CLAVE:" : "KEY PRINCIPLES:"],
    [isEs ? "1. Si tu equipo promedia 0.9–1.0 cada trimestre, tus OKRs no son suficientemente ambiciosos." : "1. If your team averages 0.9–1.0 every quarter, your OKRs aren't ambitious enough."],
    [isEs ? "2. El 'punto ideal' es 0.6–0.7 promedio. Esto significa metas ambiciosas con progreso real." : "2. The sweet spot is 0.6–0.7 average. Stretch goals with real progress."],
    [isEs ? "3. Un 0.3 en un OKR verdaderamente ambicioso vale más que un 1.0 en una meta fácil." : "3. A 0.3 on a truly ambitious OKR is more valuable than a 1.0 on a sandbagged goal."],
    [isEs ? "4. Califica honestamente. OKRs son para aprendizaje y alineación, NO evaluación de desempeño." : "4. Score honestly. OKRs are for learning and alignment, NOT performance evaluation."],
    [isEs ? "5. Para OKRs clínicos, alinea metas con umbrales CHQR de HRSA y Healthy People 2030." : "5. For clinical OKRs, align targets to HRSA CHQR badge thresholds."],
    [isEs ? "6. Revisa puntajes en equipo. La calificación individual pierde el punto — OKRs son responsabilidad compartida." : "6. Review scores as a team. Individual scoring misses the point — OKRs are shared accountability."],
    [],
    [isEs ? "🟢 Verde (0.7–1.0) = En camino o superado" : "🟢 Green (0.7–1.0) = On track or exceeded"],
    [isEs ? "🟡 Ámbar (0.4–0.69) = Necesita atención, corregir rumbo" : "🟡 Amber (0.4–0.69) = Needs attention, course-correct"],
    [isEs ? "🔴 Rojo (0.0–0.39) = En riesgo, escalar inmediatamente" : "🔴 Red (0.0–0.39) = At risk, escalate immediately"],
    [],
    [`${isEs ? "Fuentes" : "Sources"}: Doerr (Measure What Matters), Wodtke (Radical Focus), HRSA CHQR Framework, NACHC Action Guide, IHI Triple Aim`],
  ];

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws["!cols"] = [
    { wch: 14 },
    { wch: 18 },
    { wch: 55 },
    { wch: 55 },
  ];
  ws["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } },
    { s: { r: 9, c: 0 }, e: { r: 9, c: 3 } },
  ];

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
    [isEs ? "MANUAL DE SEGUIMIENTO OKR — FQHC Talent Exchange" : "OKR TRACKING WORKBOOK — FQHC Talent Exchange"],
    ["fqhctalent.com · California FQHC Strategic Monitor · 2026"],
    [],
    [isEs ? "CÓMO USAR ESTE ARCHIVO" : "HOW TO USE THIS WORKBOOK"],
    [isEs ? "1. Navega a cualquier plantilla usando las pestañas en la parte inferior" : "1. Navigate to any OKR template using the sheet tabs at the bottom"],
    [isEs ? "2. Llena la columna PROPIETARIO con el departamento/persona responsable de cada KR" : "2. Fill in the OWNER column with the responsible department/person for each KR"],
    [isEs ? "3. Ingresa tu PUNTAJE (0.0–1.0) — las fórmulas calculan el puntaje ponderado automáticamente" : "3. Enter your SCORE (0.0–1.0) — formulas auto-calculate weighted scores"],
    [isEs ? "4. Actualiza VALOR ACTUAL regularmente (semanal o mensual)" : "4. Update CURRENT VALUE regularly (weekly or monthly)"],
    [isEs ? "5. Cambia el ESTADO a: No Iniciado / En Progreso / En Camino / En Riesgo / Completo" : "5. Set STATUS to: Not Started / In Progress / On Track / At Risk / Complete"],
    [isEs ? "6. Empieza con la hoja '★ Empresa Completa' para tus OKRs de toda la organización" : "6. Start with the '★ Company-Wide' sheet for your org-level OKRs"],
    [isEs ? "7. Consulta la pestaña 'Guía de Calificación' para entender qué significa cada puntaje" : "7. See the 'Grading Guide' tab to understand what each score means"],
    [],
    [isEs ? "CÓDIGO DE COLORES" : "COLOR CODING"],
    [isEs ? "🟢 Verde (0.7–1.0) = En camino o superado — ejecución fuerte" : "🟢 Green (0.7–1.0) = On track or exceeded — strong execution"],
    [isEs ? "🟡 Ámbar (0.4–0.69) = Necesita atención — progreso parcial, corregir rumbo" : "🟡 Amber (0.4–0.69) = Needs attention — partial progress, course-correct"],
    [isEs ? "🔴 Rojo (0.0–0.39) = En riesgo — brecha significativa, escalar inmediatamente" : "🔴 Red (0.0–0.39) = At risk — significant gap, escalate immediately"],
    [isEs ? "🔵 Texto azul = Celdas de entrada — escribe tus datos aquí" : "🔵 Blue text = Input cells — type your data here"],
    [isEs ? "Meta: promedio de 0.6–0.7. Si consistentemente alcanzas 1.0, tus metas no son ambiciosas." : "Sweet spot: 0.6–0.7 average. If you consistently hit 1.0, your goals aren't ambitious enough."],
    [],
    [isEs ? "ÍNDICE DE PLANTILLAS" : "TEMPLATE INDEX"],
    ["#", "ID", isEs ? "Objetivo" : "Objective", isEs ? "Dominio" : "Domain", isEs ? "Dificultad" : "Difficulty", isEs ? "Período" : "Timeframe"],
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
    [isEs
      ? "Basado en: Doerr (Measure What Matters), Wodtke (Radical Focus), HRSA CHQR Framework, NACHC, IHI Triple Aim, Bodenheimer Quadruple Aim"
      : "Based on: Doerr (Measure What Matters), Wodtke (Radical Focus), HRSA CHQR Framework, NACHC, IHI Triple Aim, Bodenheimer Quadruple Aim"],
    [isEs ? "Descargado de fqhctalent.com — Herramienta OKR de FQHC 2026" : "Downloaded from fqhctalent.com — FQHC OKR Toolkit 2026"],
  ];

  const ws = XLSX.utils.aoa_to_sheet(rows);

  ws["!cols"] = [
    { wch: 4 },
    { wch: 30 },
    { wch: 65 },
    { wch: 25 },
    { wch: 16 },
    { wch: 12 },
  ];

  ws["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 5 } },
    { s: { r: 3, c: 0 }, e: { r: 3, c: 5 } },
    { s: { r: 12, c: 0 }, e: { r: 12, c: 5 } },
    { s: { r: 19, c: 0 }, e: { r: 19, c: 5 } },
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
 * Each template gets its own sheet with formulas, scoring, and color coding.
 * Featured templates appear first. Includes Grading Guide tab.
 * Call from a client component: `await downloadOKRsAsExcel(templates, locale)`
 */
export async function downloadOKRsAsExcel(
  templates: OKRTemplate[],
  locale: string,
  filename?: string,
): Promise<void> {
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

  // ── Sheet 2: Grading Guide
  const gradingSheet = buildGradingGuideSheet(XLSX, locale);
  XLSX.utils.book_append_sheet(wb, gradingSheet, isEs ? "📊 Guía Calificación" : "📊 Grading Guide");

  // ── One sheet per template
  sorted.forEach((okr, i) => {
    const ws = buildTemplateSheet(XLSX, okr, i + 1, locale);

    const prefix = okr.featured ? "★" : `${i + 1}.`;
    const objective = t(okr.objective, locale);
    const shortObj = objective.length > 22 ? objective.slice(0, 22) + "…" : objective;
    const sheetName = safeSheetName(shortObj, prefix);

    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  });

  const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const name = filename ?? (isEs ? "fqhc-okr-toolkit-completo.xlsx" : "fqhc-okr-toolkit.xlsx");
  saveAs(blob, name);

  // Track the download
  trackEvent({
    event_type: "okr_download_all",
    tool_name: "okr-templates",
    item_id: `${sorted.length}-templates`,
    metadata: { templateCount: sorted.length, domains: [...new Set(sorted.map(t => t.domain))] },
    locale: locale as "en" | "es",
  });
}

/**
 * Downloads a single OKR template as a standalone .xlsx file
 * with scoring formulas and grading reference.
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

  // Also add grading guide for single downloads
  const gradingSheet = buildGradingGuideSheet(XLSX, locale);
  XLSX.utils.book_append_sheet(wb, gradingSheet, isEs ? "📊 Guía" : "📊 Guide");

  const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const safeName = okr.id.replace(/[^a-z0-9-]/gi, "-");
  saveAs(blob, `okr-${safeName}.xlsx`);

  // Track single template download
  trackEvent({
    event_type: "okr_download",
    tool_name: "okr-templates",
    item_id: okr.id,
    metadata: { domain: okr.domain, difficulty: okr.difficulty },
    locale: locale as "en" | "es",
  });
}
