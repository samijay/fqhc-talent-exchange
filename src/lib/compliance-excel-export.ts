// compliance-excel-export.ts
// Generates 3 downloadable Excel workbooks for FQHC compliance management
// Uses SheetJS (xlsx) — dynamically imported to keep bundle small
// "use client" — runs in browser only (file-saver triggers download)

import type {
  OSVChecklistItem,
  ComplianceCalendarEntry,
  ComplianceRiskItem,
  OSVRequirementArea,
  ComplianceDomain,
} from "./fqhc-compliance";

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  Color palette                                                      */
/* ------------------------------------------------------------------ */

const C = {
  navy: "1B3A5C",
  teal: "0F766E",
  lightTeal: "D4EFEF",
  purple: "7C3AED",
  lightPurple: "EDE9FE",
  amber: "D97706",
  lightAmber: "FFF3D6",
  green: "27AE60",
  lightGreen: "D5F5E3",
  red: "C0392B",
  lightRed: "FADBD8",
  yellow: "F59E0B",
  lightYellow: "FEF9C3",
  white: "FFFFFF",
  lightGray: "F2F4F4",
  inputBlue: "EBF5FB",
  black: "000000",
};

const DOMAIN_COLORS: Record<ComplianceDomain, string> = {
  "hrsa-audits": C.teal,
  "hipaa-privacy": C.purple,
  "billing-fraud": C.amber,
};

/* ------------------------------------------------------------------ */
/*  Style helpers                                                      */
/* ------------------------------------------------------------------ */

function thinBorder() {
  const b = { style: "thin" as const, color: { rgb: "BDC3C7" } };
  return { top: b, bottom: b, left: b, right: b };
}

function headerStyle(bg = C.navy) {
  return {
    font: { name: "Arial", bold: true, color: { rgb: C.white }, sz: 11 },
    fill: { fgColor: { rgb: bg } },
    alignment: { horizontal: "center" as const, vertical: "center" as const, wrapText: true },
    border: thinBorder(),
  };
}

function bodyStyle(opts?: { bold?: boolean; color?: string; fill?: string; center?: boolean }) {
  return {
    font: { name: "Arial", sz: 10, bold: opts?.bold, color: opts?.color ? { rgb: opts.color } : undefined },
    fill: opts?.fill ? { fgColor: { rgb: opts.fill } } : undefined,
    alignment: { horizontal: opts?.center ? ("center" as const) : ("left" as const), vertical: "center" as const, wrapText: true },
    border: thinBorder(),
  };
}

function inputStyle() {
  return {
    font: { name: "Arial", sz: 10, color: { rgb: "0000FF" } },
    fill: { fgColor: { rgb: C.inputBlue } },
    alignment: { horizontal: "center" as const, vertical: "center" as const },
    border: thinBorder(),
  };
}

/* ------------------------------------------------------------------ */
/*  1. OSV Checklist Excel                                             */
/* ------------------------------------------------------------------ */

export async function downloadOSVChecklistAsExcel(locale: string) {
  const XLSX = await import("xlsx");
  const { saveAs } = await import("file-saver");
  const { OSV_CHECKLIST, OSV_AREA_META } = await import("./fqhc-compliance");

  const wb = XLSX.utils.book_new();

  // Quick Start sheet
  const qsData = [
    [locale === "es" ? "LISTA DE VERIFICACIÓN OSV DE HRSA" : "HRSA OSV PREPARATION CHECKLIST"],
    [locale === "es" ? "19 Requisitos del Programa — Guía de Preparación" : "19 Program Requirements — Preparation Guide"],
    [""],
    [locale === "es" ? "CÓMO USAR ESTA HERRAMIENTA:" : "HOW TO USE THIS TOOL:"],
    [locale === "es"
      ? "1. Cada pestaña cubre un área de requisitos (Gobernanza, Clínico, Financiero, Operaciones)"
      : "1. Each tab covers a requirement area (Governance, Clinical, Financial, Operations)"],
    [locale === "es"
      ? "2. Actualice la columna 'Estado' a medida que recopile evidencia"
      : "2. Update the 'Status' column as you gather evidence"],
    [locale === "es"
      ? "3. Documente la evidencia recopilada en la columna 'Evidencia Recopilada'"
      : "3. Document gathered evidence in the 'Evidence Collected' column"],
    [""],
    [locale === "es" ? "LEYENDA DE ESTADO:" : "STATUS LEGEND:"],
    [locale === "es" ? "No Iniciado" : "Not Started", locale === "es" ? "— Aún no se ha comenzado a trabajar" : "— Work has not yet begun"],
    [locale === "es" ? "En Progreso" : "In Progress", locale === "es" ? "— Evidencia parcialmente recopilada" : "— Evidence partially gathered"],
    [locale === "es" ? "Completo" : "Complete", locale === "es" ? "— Evidencia documentada y lista para revisión" : "— Evidence documented and ready for review"],
    [""],
    [locale === "es" ? "RESUMEN POR ÁREA:" : "SUMMARY BY AREA:"],
  ];

  for (const area of OSV_AREA_META) {
    const items = OSV_CHECKLIST.filter((i) => i.area === area.id);
    const hours = items.reduce((sum, i) => sum + i.estimatedHours, 0);
    qsData.push([
      t({ en: area.en, es: area.es }, locale),
      `${items.length} ${locale === "es" ? "requisitos" : "requirements"}`,
      `~${hours} ${locale === "es" ? "horas estimadas" : "estimated hours"}`,
    ]);
  }

  const totalHours = OSV_CHECKLIST.reduce((sum, i) => sum + i.estimatedHours, 0);
  qsData.push([""], [`${locale === "es" ? "TOTAL" : "TOTAL"}: ${OSV_CHECKLIST.length} ${locale === "es" ? "requisitos" : "requirements"}, ~${totalHours} ${locale === "es" ? "horas" : "hours"}`]);
  qsData.push([""], [locale === "es" ? "Fuente: Manual de Cumplimiento de HRSA BPHC" : "Source: HRSA BPHC Compliance Manual"], ["https://bphc.hrsa.gov/compliance/compliance-manual"]);

  const qsSheet = XLSX.utils.aoa_to_sheet(qsData);
  qsSheet["!cols"] = [{ wch: 40 }, { wch: 25 }, { wch: 30 }];
  // Style title
  if (qsSheet["A1"]) qsSheet["A1"].s = { font: { name: "Arial", bold: true, sz: 16, color: { rgb: C.teal } } };
  if (qsSheet["A2"]) qsSheet["A2"].s = { font: { name: "Arial", sz: 12, color: { rgb: C.navy } } };
  XLSX.utils.book_append_sheet(wb, qsSheet, locale === "es" ? "Inicio Rápido" : "Quick Start");

  // Area sheets
  const areas: { id: OSVRequirementArea; en: string; es: string }[] = [
    { id: "governance", en: "Governance", es: "Gobernanza" },
    { id: "clinical", en: "Clinical", es: "Clínico" },
    { id: "financial", en: "Financial", es: "Financiero" },
    { id: "operational", en: "Operations", es: "Operaciones" },
  ];

  const HEADERS_EN = ["#", "REQUIREMENT", "CFR CITATION", "EVIDENCE NEEDED", "RESPONSIBLE", "STATUS", "EVIDENCE COLLECTED", "COMPLETION DATE", "NOTES"];
  const HEADERS_ES = ["#", "REQUISITO", "CITACIÓN CFR", "EVIDENCIA NECESARIA", "RESPONSABLE", "ESTADO", "EVIDENCIA RECOPILADA", "FECHA DE COMPLETACIÓN", "NOTAS"];
  const headers = locale === "es" ? HEADERS_ES : HEADERS_EN;

  for (const area of areas) {
    const items = OSV_CHECKLIST.filter((i) => i.area === area.id);
    const rows: (string | number)[][] = [headers];

    items.forEach((item, idx) => {
      rows.push([
        idx + 1,
        t(item.requirement, locale) + "\n\n" + t(item.description, locale),
        item.cfr,
        item.evidence.map((e) => "• " + t(e, locale)).join("\n"),
        item.responsibleRole,
        locale === "es" ? "No Iniciado" : "Not Started",
        "",
        "",
        locale === "es" ? "Fallas comunes:\n" : "Common failures:\n" + item.commonFailures.map((f) => "• " + t(f, locale)).join("\n"),
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws["!cols"] = [
      { wch: 4 }, { wch: 45 }, { wch: 28 }, { wch: 45 },
      { wch: 20 }, { wch: 14 }, { wch: 35 }, { wch: 16 }, { wch: 35 },
    ];
    ws["!rows"] = [{ hpt: 30 }, ...items.map(() => ({ hpt: 80 }))];

    // Style headers
    for (let c = 0; c < headers.length; c++) {
      const cell = XLSX.utils.encode_cell({ r: 0, c });
      if (ws[cell]) ws[cell].s = headerStyle(C.teal);
    }

    // Style body rows
    for (let r = 1; r <= items.length; r++) {
      for (let c = 0; c < headers.length; c++) {
        const cell = XLSX.utils.encode_cell({ r, c });
        if (!ws[cell]) continue;
        if (c === 5) ws[cell].s = inputStyle(); // Status
        else if (c === 6 || c === 7 || c === 8) ws[cell].s = inputStyle(); // User input
        else ws[cell].s = bodyStyle({ fill: r % 2 === 0 ? C.lightGray : C.white });
      }
    }

    XLSX.utils.book_append_sheet(wb, ws, t({ en: area.en, es: area.es }, locale));
  }

  const buf = XLSX.write(wb, { bookType: "xlsx", type: "array", cellStyles: true });
  const blob = new Blob([buf], { type: "application/octet-stream" });
  saveAs(blob, locale === "es" ? "HRSA_OSV_Lista_Verificacion.xlsx" : "HRSA_OSV_Checklist.xlsx");
}

/* ------------------------------------------------------------------ */
/*  2. Compliance Calendar Excel                                       */
/* ------------------------------------------------------------------ */

export async function downloadComplianceCalendarAsExcel(locale: string) {
  const XLSX = await import("xlsx");
  const { saveAs } = await import("file-saver");
  const { COMPLIANCE_CALENDAR, DOMAIN_META } = await import("./fqhc-compliance");

  const wb = XLSX.utils.book_new();

  const MONTH_NAMES_EN = ["Year-Round", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const MONTH_NAMES_ES = ["Todo el Año", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const monthNames = locale === "es" ? MONTH_NAMES_ES : MONTH_NAMES_EN;

  // Year View sheet
  const yvHeaders = locale === "es"
    ? ["MES", "FECHA LÍMITE", "REQUISITO", "DOMINIO", "DEPARTAMENTO RESPONSABLE", "SEMANAS PARA PREPARAR"]
    : ["MONTH", "DEADLINE", "REQUIREMENT", "DOMAIN", "RESPONSIBLE DEPT", "WEEKS TO PREPARE"];
  const yvRows: (string | number)[][] = [yvHeaders];

  // Sort: month 1-12, then month 0 (year-round) at end
  const sorted = [...COMPLIANCE_CALENDAR].sort((a, b) => {
    const am = a.month === 0 ? 13 : a.month;
    const bm = b.month === 0 ? 13 : b.month;
    return am - bm || (a.day ?? 0) - (b.day ?? 0);
  });

  for (const entry of sorted) {
    const domainMeta = DOMAIN_META.find((d) => d.id === entry.domain);
    yvRows.push([
      monthNames[entry.month],
      entry.deadline,
      t(entry.requirement, locale),
      domainMeta ? t({ en: domainMeta.en, es: domainMeta.es }, locale) : entry.domain,
      entry.responsibleDepartment,
      entry.preparationWeeks,
    ]);
  }

  const yvSheet = XLSX.utils.aoa_to_sheet(yvRows);
  yvSheet["!cols"] = [{ wch: 14 }, { wch: 22 }, { wch: 45 }, { wch: 28 }, { wch: 24 }, { wch: 12 }];

  // Style headers
  for (let c = 0; c < yvHeaders.length; c++) {
    const cell = XLSX.utils.encode_cell({ r: 0, c });
    if (yvSheet[cell]) yvSheet[cell].s = headerStyle();
  }

  // Style body with domain color coding
  for (let r = 1; r < yvRows.length; r++) {
    const entry = sorted[r - 1];
    const domainColor = DOMAIN_COLORS[entry.domain] || C.navy;
    for (let c = 0; c < yvHeaders.length; c++) {
      const cell = XLSX.utils.encode_cell({ r, c });
      if (!yvSheet[cell]) continue;
      if (c === 3) {
        // Domain column: colored text
        yvSheet[cell].s = bodyStyle({ bold: true, color: domainColor });
      } else {
        yvSheet[cell].s = bodyStyle({ fill: r % 2 === 0 ? C.lightGray : C.white });
      }
    }
  }

  XLSX.utils.book_append_sheet(wb, yvSheet, locale === "es" ? "Vista Anual" : "Year View");

  // Monthly sheets (1-12)
  const mHeaders = locale === "es"
    ? ["FECHA LÍMITE", "REQUISITO", "DESCRIPCIÓN", "DOMINIO", "DEPARTAMENTO", "SEMANAS PREP", "ESTADO", "NOTAS"]
    : ["DEADLINE", "REQUIREMENT", "DESCRIPTION", "DOMAIN", "DEPARTMENT", "WEEKS PREP", "STATUS", "NOTES"];

  for (let m = 1; m <= 12; m++) {
    const entries = COMPLIANCE_CALENDAR.filter((e) => e.month === m);
    // Also include year-round items
    const yearRound = COMPLIANCE_CALENDAR.filter((e) => e.month === 0);
    const all = [...entries, ...yearRound];

    const rows: (string | number)[][] = [mHeaders];
    for (const entry of all) {
      const domainMeta = DOMAIN_META.find((d) => d.id === entry.domain);
      rows.push([
        entry.deadline,
        t(entry.requirement, locale),
        t(entry.description, locale),
        domainMeta ? t({ en: domainMeta.en, es: domainMeta.es }, locale) : entry.domain,
        entry.responsibleDepartment,
        entry.preparationWeeks,
        "",
        "",
      ]);
    }

    if (all.length === 0) {
      rows.push([locale === "es" ? "Sin fechas límite este mes" : "No deadlines this month", "", "", "", "", 0, "", ""]);
    }

    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws["!cols"] = [{ wch: 22 }, { wch: 38 }, { wch: 50 }, { wch: 28 }, { wch: 22 }, { wch: 10 }, { wch: 14 }, { wch: 30 }];

    for (let c = 0; c < mHeaders.length; c++) {
      const cell = XLSX.utils.encode_cell({ r: 0, c });
      if (ws[cell]) ws[cell].s = headerStyle();
    }
    for (let r = 1; r < rows.length; r++) {
      for (let c = 0; c < mHeaders.length; c++) {
        const cell = XLSX.utils.encode_cell({ r, c });
        if (!ws[cell]) continue;
        if (c === 6 || c === 7) ws[cell].s = inputStyle();
        else ws[cell].s = bodyStyle({ fill: r % 2 === 0 ? C.lightGray : C.white });
      }
    }

    XLSX.utils.book_append_sheet(wb, ws, monthNames[m].substring(0, 10));
  }

  const buf = XLSX.write(wb, { bookType: "xlsx", type: "array", cellStyles: true });
  const blob = new Blob([buf], { type: "application/octet-stream" });
  saveAs(blob, locale === "es" ? "FQHC_Calendario_Cumplimiento_2026.xlsx" : "FQHC_Compliance_Calendar_2026.xlsx");
}

/* ------------------------------------------------------------------ */
/*  3. Risk Assessment Matrix Excel                                    */
/* ------------------------------------------------------------------ */

export async function downloadRiskMatrixAsExcel(locale: string) {
  const XLSX = await import("xlsx");
  const { saveAs } = await import("file-saver");
  const { COMPLIANCE_RISKS, DOMAIN_META, getRiskScore, getRiskLevel } = await import("./fqhc-compliance");

  const wb = XLSX.utils.book_new();

  // Heat Map sheet (5x5 matrix)
  const hmTitle = locale === "es" ? "MATRIZ DE RIESGO — MAPA DE CALOR" : "RISK MATRIX — HEAT MAP";
  const likelihoodLabel = locale === "es" ? "PROBABILIDAD ↓" : "LIKELIHOOD ↓";
  const impactLabel = locale === "es" ? "IMPACTO →" : "IMPACT →";

  const hmRows: (string | number)[][] = [
    [hmTitle],
    [""],
    ["", impactLabel, "1 - " + (locale === "es" ? "Mínimo" : "Minimal"), "2 - " + (locale === "es" ? "Menor" : "Minor"), "3 - " + (locale === "es" ? "Moderado" : "Moderate"), "4 - " + (locale === "es" ? "Mayor" : "Major"), "5 - " + (locale === "es" ? "Catastrófico" : "Catastrophic")],
    [likelihoodLabel, "5 - " + (locale === "es" ? "Muy Probable" : "Very Likely"), 5, 10, 15, 20, 25],
    ["", "4 - " + (locale === "es" ? "Probable" : "Likely"), 4, 8, 12, 16, 20],
    ["", "3 - " + (locale === "es" ? "Posible" : "Possible"), 3, 6, 9, 12, 15],
    ["", "2 - " + (locale === "es" ? "Improbable" : "Unlikely"), 2, 4, 6, 8, 10],
    ["", "1 - " + (locale === "es" ? "Raro" : "Rare"), 1, 2, 3, 4, 5],
    [""],
    [locale === "es" ? "LEYENDA:" : "LEGEND:"],
    ["1-5", locale === "es" ? "Bajo" : "Low"],
    ["6-11", locale === "es" ? "Medio" : "Medium"],
    ["12-19", locale === "es" ? "Alto" : "High"],
    ["20-25", locale === "es" ? "Crítico" : "Critical"],
  ];

  const hmSheet = XLSX.utils.aoa_to_sheet(hmRows);
  hmSheet["!cols"] = [{ wch: 16 }, { wch: 20 }, { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 16 }];

  if (hmSheet["A1"]) hmSheet["A1"].s = { font: { name: "Arial", bold: true, sz: 16, color: { rgb: C.navy } } };
  // Color code the heat map cells
  for (let r = 3; r <= 7; r++) {
    for (let c = 2; c <= 6; c++) {
      const cell = XLSX.utils.encode_cell({ r, c });
      if (!hmSheet[cell]) continue;
      const score = hmSheet[cell].v as number;
      let bg = C.lightGreen;
      if (score >= 20) bg = C.lightRed;
      else if (score >= 12) bg = C.lightAmber;
      else if (score >= 6) bg = C.lightYellow;
      hmSheet[cell].s = bodyStyle({ bold: true, center: true, fill: bg });
    }
  }
  // Legend colors
  const legendColors = [C.lightGreen, C.lightYellow, C.lightAmber, C.lightRed];
  for (let i = 0; i < 4; i++) {
    const cell = XLSX.utils.encode_cell({ r: 10 + i, c: 0 });
    if (hmSheet[cell]) hmSheet[cell].s = bodyStyle({ bold: true, fill: legendColors[i], center: true });
  }

  XLSX.utils.book_append_sheet(wb, hmSheet, locale === "es" ? "Mapa de Calor" : "Heat Map");

  // Risk Register sheet
  const rrHeaders = locale === "es"
    ? ["#", "DOMINIO", "CATEGORÍA DE RIESGO", "DESCRIPCIÓN", "PROBABILIDAD (1-5)", "IMPACTO (1-5)", "PUNTAJE", "NIVEL", "CONTROLES", "PASOS DE MITIGACIÓN", "RESPONSABLE", "FECHA OBJETIVO"]
    : ["#", "DOMAIN", "RISK CATEGORY", "DESCRIPTION", "LIKELIHOOD (1-5)", "IMPACT (1-5)", "SCORE", "LEVEL", "CONTROLS", "MITIGATION STEPS", "OWNER", "TARGET DATE"];

  const rrRows: (string | number)[][] = [rrHeaders];

  // Sort by risk score descending
  const sortedRisks = [...COMPLIANCE_RISKS].sort(
    (a, b) => getRiskScore(b.likelihood, b.impact) - getRiskScore(a.likelihood, a.impact)
  );

  sortedRisks.forEach((risk, idx) => {
    const score = getRiskScore(risk.likelihood, risk.impact);
    const level = getRiskLevel(score);
    const domainMeta = DOMAIN_META.find((d) => d.id === risk.domain);
    const levelLabel = locale === "es"
      ? { critical: "Crítico", high: "Alto", medium: "Medio", low: "Bajo" }[level]
      : { critical: "Critical", high: "High", medium: "Medium", low: "Low" }[level];

    rrRows.push([
      idx + 1,
      domainMeta ? t({ en: domainMeta.en, es: domainMeta.es }, locale) : risk.domain,
      risk.riskCategory,
      t(risk.description, locale),
      risk.likelihood,
      risk.impact,
      score,
      levelLabel || level,
      risk.controls.map((c) => "• " + t(c, locale)).join("\n"),
      risk.mitigationSteps.map((s) => "• " + t(s, locale)).join("\n"),
      risk.responsibleRole,
      "",
    ]);
  });

  const rrSheet = XLSX.utils.aoa_to_sheet(rrRows);
  rrSheet["!cols"] = [
    { wch: 4 }, { wch: 22 }, { wch: 26 }, { wch: 48 },
    { wch: 12 }, { wch: 12 }, { wch: 8 }, { wch: 10 },
    { wch: 40 }, { wch: 40 }, { wch: 18 }, { wch: 14 },
  ];
  rrSheet["!rows"] = [{ hpt: 30 }, ...sortedRisks.map(() => ({ hpt: 60 }))];

  // Style headers
  for (let c = 0; c < rrHeaders.length; c++) {
    const cell = XLSX.utils.encode_cell({ r: 0, c });
    if (rrSheet[cell]) rrSheet[cell].s = headerStyle();
  }

  // Style body with risk-level coloring
  for (let r = 1; r < rrRows.length; r++) {
    const risk = sortedRisks[r - 1];
    const score = getRiskScore(risk.likelihood, risk.impact);
    const level = getRiskLevel(score);
    const levelFills: Record<string, string> = { critical: C.lightRed, high: C.lightAmber, medium: C.lightYellow, low: C.lightGreen };
    const levelFill = levelFills[level] || C.white;

    for (let c = 0; c < rrHeaders.length; c++) {
      const cell = XLSX.utils.encode_cell({ r, c });
      if (!rrSheet[cell]) continue;
      if (c === 6 || c === 7) {
        // Score + Level columns: colored by risk level
        rrSheet[cell].s = bodyStyle({ bold: true, center: true, fill: levelFill });
      } else if (c === 11) {
        rrSheet[cell].s = inputStyle(); // Target date: user input
      } else {
        rrSheet[cell].s = bodyStyle({ fill: r % 2 === 0 ? C.lightGray : C.white });
      }
    }
  }

  XLSX.utils.book_append_sheet(wb, rrSheet, locale === "es" ? "Registro de Riesgos" : "Risk Register");

  const buf = XLSX.write(wb, { bookType: "xlsx", type: "array", cellStyles: true });
  const blob = new Blob([buf], { type: "application/octet-stream" });
  saveAs(blob, locale === "es" ? "FQHC_Matriz_Riesgos.xlsx" : "FQHC_Risk_Assessment_Matrix.xlsx");
}
