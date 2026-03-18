// schedule-excel-export.ts
// Generates a polished, color-coded Excel workbook from a Weekly Schedule
// Uses SheetJS (xlsx) — dynamically imported to keep bundle small
// Follows the same pattern as okr-excel-export.ts

import type {
  WeeklySchedule,
  ScheduleMetrics,
  DayOfWeek,
} from "./schedule-planner-engine";
import {
  ROLE_CONFIG,
  DAYS_OF_WEEK,
  DAY_LABELS,
  calculateScheduleMetrics,
} from "./schedule-planner-engine";

function formatHour(h: number): string {
  if (h === 0) return "12:00 AM";
  if (h < 12) return `${h}:00 AM`;
  if (h === 12) return "12:00 PM";
  return `${h - 12}:00 PM`;
}

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

/* ------------------------------------------------------------------ */
/*  Sheet 1: Schedule Overview (visual grid)                           */
/* ------------------------------------------------------------------ */

function buildScheduleSheet(
  XLSX: typeof import("xlsx"),
  schedule: WeeklySchedule,
  metrics: ScheduleMetrics,
  locale: string,
) {
  const isEs = locale === "es";
  const activeDays = DAYS_OF_WEEK.filter((d) => schedule.operatingHours[d].active);
  const rows: (string | number)[][] = [];

  // Row 0: Title
  rows.push([
    isEs
      ? `📅 HORARIO SEMANAL — ${schedule.name}`
      : `📅 WEEKLY SCHEDULE — ${schedule.name}`,
  ]);

  // Row 1: Date
  rows.push([
    `${isEs ? "Generado" : "Generated"}: ${new Date().toLocaleDateString(isEs ? "es-US" : "en-US", { year: "numeric", month: "long", day: "numeric" })} · fqhctalent.com`,
  ]);

  // Row 2: Summary
  rows.push([
    `${metrics.totalStaff} ${isEs ? "personal" : "staff"} · ${metrics.totalProviders} ${isEs ? "proveedores" : "providers"} · ${metrics.totalWeeklyEncounters} ${isEs ? "encuentros/sem" : "encounters/wk"} · $${schedule.ppsRate} PPS`,
  ]);

  // Row 3: empty separator
  rows.push([]);

  // Row 4: Header row — Staff + Day columns
  const headerRow: string[] = [
    isEs ? "Personal" : "Staff",
    isEs ? "Rol" : "Role",
    ...activeDays.map((d) => {
      const dayLabel = isEs ? DAY_LABELS[d].es : DAY_LABELS[d].en;
      const hours = schedule.operatingHours[d];
      return `${dayLabel}\n${formatHour(hours.open)}-${formatHour(hours.close)}`;
    }),
    isEs ? "Horas/Sem" : "Hours/Wk",
  ];
  rows.push(headerRow);

  // Group staff by role group
  const groups = ["provider", "dental", "behavioral", "support", "admin"];
  const groupLabels: Record<string, { en: string; es: string }> = {
    provider: { en: "PROVIDERS", es: "PROVEEDORES" },
    dental: { en: "DENTAL TEAM", es: "EQUIPO DENTAL" },
    behavioral: { en: "BEHAVIORAL HEALTH", es: "SALUD MENTAL" },
    support: { en: "SUPPORT STAFF", es: "PERSONAL DE APOYO" },
    admin: { en: "ADMINISTRATION", es: "ADMINISTRACIÓN" },
  };

  const assignmentsByStaff = new Map<string, Map<DayOfWeek, { start: number; end: number; ot: boolean }>>();
  for (const a of schedule.assignments) {
    if (!assignmentsByStaff.has(a.staffId)) assignmentsByStaff.set(a.staffId, new Map());
    assignmentsByStaff.get(a.staffId)!.set(a.day, { start: a.startHour, end: a.endHour, ot: a.isOvertime });
  }

  for (const group of groups) {
    const members = schedule.staff.filter((s) => ROLE_CONFIG[s.role].group === group);
    if (members.length === 0) continue;

    // Group header row
    const groupRow: string[] = new Array(headerRow.length).fill("");
    groupRow[0] = isEs ? groupLabels[group].es : groupLabels[group].en;
    rows.push(groupRow);

    // Staff rows
    for (const member of members) {
      const config = ROLE_CONFIG[member.role];
      const staffRow: (string | number)[] = [
        member.name,
        isEs ? config.label.es : config.label.en,
      ];

      let totalHours = 0;
      for (const day of activeDays) {
        const shift = assignmentsByStaff.get(member.id)?.get(day);
        if (shift) {
          const hours = shift.end - shift.start;
          totalHours += hours;
          staffRow.push(`${formatHour(shift.start)}-${formatHour(shift.end)}${shift.ot ? " (OT)" : ""}`);
        } else {
          staffRow.push("—");
        }
      }

      staffRow.push(totalHours);
      rows.push(staffRow);
    }
  }

  // Daily totals row
  rows.push([]);
  const totalsRow: (string | number)[] = [
    isEs ? "TOTALES DIARIOS" : "DAILY TOTALS",
    "",
  ];
  for (const day of activeDays) {
    const dm = metrics.dailyMetrics.find((d) => d.day === day);
    totalsRow.push(
      dm
        ? `${dm.staffOnDuty} ${isEs ? "personal" : "staff"}\n${dm.estimatedEncounters} ${isEs ? "enc" : "enc"}\n${formatCurrency(dm.estimatedRevenue)}`
        : "—",
    );
  }
  totalsRow.push("");
  rows.push(totalsRow);

  const ws = XLSX.utils.aoa_to_sheet(rows);

  // Column widths
  ws["!cols"] = [
    { wch: 24 },  // Staff name
    { wch: 22 },  // Role
    ...activeDays.map(() => ({ wch: 18 })),
    { wch: 10 },  // Hours/Wk
  ];

  // Merge title rows
  const colCount = 2 + activeDays.length + 1;
  ws["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: colCount - 1 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: colCount - 1 } },
    { s: { r: 2, c: 0 }, e: { r: 2, c: colCount - 1 } },
  ];

  return ws;
}

/* ------------------------------------------------------------------ */
/*  Sheet 2: Staff Roster (roles, FTE, costs)                          */
/* ------------------------------------------------------------------ */

function buildRosterSheet(
  XLSX: typeof import("xlsx"),
  schedule: WeeklySchedule,
  locale: string,
) {
  const isEs = locale === "es";
  const rows: (string | number)[][] = [];

  rows.push([isEs ? "📋 LISTA DE PERSONAL" : "📋 STAFF ROSTER"]);
  rows.push([]);

  // Header
  rows.push([
    "#",
    isEs ? "Nombre" : "Name",
    isEs ? "Rol" : "Role",
    isEs ? "Abreviatura" : "Short Code",
    isEs ? "Grupo" : "Group",
    "FTE",
    isEs ? "Tarifa/Hora" : "Hourly Rate",
    isEs ? "Salario Anual Est." : "Est. Annual Salary",
    isEs ? "Es Proveedor" : "Is Provider",
    isEs ? "Encuentros/Hora" : "Encounters/Hr",
  ]);

  schedule.staff.forEach((member, i) => {
    const config = ROLE_CONFIG[member.role];
    rows.push([
      i + 1,
      member.name,
      isEs ? config.label.es : config.label.en,
      config.shortLabel,
      config.group,
      member.fte,
      `$${member.hourlyRate}`,
      formatCurrency(config.annualSalary),
      config.isProvider ? (isEs ? "Sí" : "Yes") : "No",
      config.encountersPerHour || "—",
    ]);
  });

  // Summary row
  rows.push([]);
  const totalFTE = schedule.staff.reduce((sum, s) => sum + s.fte, 0);
  const providerCount = schedule.staff.filter((s) => ROLE_CONFIG[s.role].isProvider && ROLE_CONFIG[s.role].group === "provider").length;
  const maCount = schedule.staff.filter((s) => s.role === "ma").length;
  rows.push([
    "",
    isEs ? "TOTALES" : "TOTALS",
    `${schedule.staff.length} ${isEs ? "miembros" : "members"}`,
    "",
    "",
    totalFTE,
    "",
    "",
    `${providerCount} ${isEs ? "proveedores" : "providers"}`,
    `MA:Prov ${maCount > 0 && providerCount > 0 ? (maCount / providerCount).toFixed(1) : "0"}:1`,
  ]);

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws["!cols"] = [
    { wch: 4 }, { wch: 24 }, { wch: 28 }, { wch: 8 }, { wch: 14 },
    { wch: 6 }, { wch: 12 }, { wch: 18 }, { wch: 14 }, { wch: 14 },
  ];
  ws["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 9 } },
  ];

  return ws;
}

/* ------------------------------------------------------------------ */
/*  Sheet 3: Metrics Summary (revenue, cost, ratios)                   */
/* ------------------------------------------------------------------ */

function buildMetricsSheet(
  XLSX: typeof import("xlsx"),
  schedule: WeeklySchedule,
  metrics: ScheduleMetrics,
  locale: string,
) {
  const isEs = locale === "es";
  const rows: (string | number)[][] = [];

  rows.push([isEs ? "📊 RESUMEN DE MÉTRICAS" : "📊 METRICS SUMMARY"]);
  rows.push([`${schedule.name} · PPS Rate: $${schedule.ppsRate} · ${isEs ? "Tasa de no-show" : "No-show rate"}: ${(schedule.noShowRate * 100).toFixed(0)}%`]);
  rows.push([]);

  // Revenue section
  rows.push([isEs ? "💰 INGRESOS" : "💰 REVENUE"]);
  rows.push([isEs ? "Ingresos Semanales" : "Weekly Revenue", formatCurrency(metrics.totalWeeklyRevenue)]);
  rows.push([isEs ? "Ingresos Anualizados (50 sem)" : "Annualized Revenue (50 wks)", formatCurrency(metrics.annualizedRevenue)]);
  rows.push([isEs ? "Costo Laboral Semanal" : "Weekly Labor Cost", formatCurrency(metrics.totalWeeklyLaborCost)]);
  rows.push([isEs ? "Costo Laboral Anualizado" : "Annualized Labor Cost", formatCurrency(metrics.annualizedLaborCost)]);
  rows.push([isEs ? "Margen Anualizado" : "Annualized Margin", formatCurrency(metrics.annualizedMargin)]);
  rows.push([]);

  // Staffing section
  rows.push([isEs ? "👥 DOTACIÓN DE PERSONAL" : "👥 STAFFING"]);
  rows.push([isEs ? "Personal Total" : "Total Staff", metrics.totalStaff]);
  rows.push([isEs ? "Total FTE" : "Total FTE", metrics.totalFTE]);
  rows.push([isEs ? "Proveedores" : "Providers", metrics.totalProviders]);
  rows.push([isEs ? "Ratio MA:Proveedor" : "MA:Provider Ratio", `${metrics.overallMAProviderRatio.toFixed(1)}:1`]);
  rows.push([isEs ? "Meta Ratio" : "Target Ratio", "1.5:1"]);
  rows.push([]);

  // Encounters section
  rows.push([isEs ? "🏥 ENCUENTROS" : "🏥 ENCOUNTERS"]);
  rows.push([isEs ? "Encuentros Semanales" : "Weekly Encounters", metrics.totalWeeklyEncounters]);
  rows.push([isEs ? "Promedio por Día" : "Average Per Day", metrics.averageEncountersPerDay]);
  rows.push([isEs ? "Encuentros Anualizados" : "Annualized Encounters", metrics.totalWeeklyEncounters * 50]);
  rows.push([isEs ? "Ingreso por Encuentro" : "Revenue Per Encounter", `$${schedule.ppsRate}`]);
  rows.push([]);

  // Daily breakdown
  rows.push([isEs ? "📅 DESGLOSE DIARIO" : "📅 DAILY BREAKDOWN"]);
  rows.push([
    isEs ? "Día" : "Day",
    isEs ? "Personal" : "Staff",
    isEs ? "Proveedores" : "Providers",
    "MAs",
    "MA:Prov",
    isEs ? "Encuentros" : "Encounters",
    isEs ? "Ingresos" : "Revenue",
    isEs ? "Costo Laboral" : "Labor Cost",
    isEs ? "Margen Diario" : "Daily Margin",
  ]);

  for (const dm of metrics.dailyMetrics) {
    if (!schedule.operatingHours[dm.day].active) continue;
    rows.push([
      isEs ? DAY_LABELS[dm.day].es : DAY_LABELS[dm.day].en,
      dm.staffOnDuty,
      dm.providersOnDuty,
      dm.masOnDuty,
      dm.maProviderRatio > 0 ? `${dm.maProviderRatio.toFixed(1)}:1` : "—",
      dm.estimatedEncounters,
      formatCurrency(dm.estimatedRevenue),
      formatCurrency(dm.laborCost),
      formatCurrency(dm.estimatedRevenue - dm.laborCost),
    ]);
  }

  rows.push([]);

  // Warnings section
  if (metrics.allWarnings.length > 0) {
    rows.push([isEs ? "⚠️ ALERTAS" : "⚠️ WARNINGS"]);
    rows.push([
      isEs ? "Severidad" : "Severity",
      isEs ? "Día" : "Day",
      isEs ? "Mensaje" : "Message",
    ]);
    for (const w of metrics.allWarnings) {
      rows.push([
        w.severity === "critical" ? "🔴 CRITICAL" : w.severity === "warning" ? "🟡 WARNING" : "🔵 INFO",
        isEs ? DAY_LABELS[w.day].es : DAY_LABELS[w.day].en,
        isEs ? w.message.es : w.message.en,
      ]);
    }
  }

  rows.push([]);
  rows.push([
    isEs
      ? "Descargado de fqhctalent.com — Planificador de Horarios FQHC 2026"
      : "Downloaded from fqhctalent.com — FQHC Schedule Planner 2026",
  ]);

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws["!cols"] = [
    { wch: 32 }, { wch: 10 }, { wch: 12 }, { wch: 8 }, { wch: 10 },
    { wch: 12 }, { wch: 14 }, { wch: 14 }, { wch: 14 },
  ];
  ws["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 8 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 8 } },
  ];

  return ws;
}

/* ------------------------------------------------------------------ */
/*  Sheet 4: Coverage Analysis (by day/slot)                           */
/* ------------------------------------------------------------------ */

function buildCoverageSheet(
  XLSX: typeof import("xlsx"),
  schedule: WeeklySchedule,
  metrics: ScheduleMetrics,
  locale: string,
) {
  const isEs = locale === "es";
  const activeDays = DAYS_OF_WEEK.filter((d) => schedule.operatingHours[d].active);
  const rows: (string | number)[][] = [];

  rows.push([isEs ? "🔍 ANÁLISIS DE COBERTURA" : "🔍 COVERAGE ANALYSIS"]);
  rows.push([]);

  // Coverage matrix header
  rows.push([
    isEs ? "Métrica" : "Metric",
    ...activeDays.map((d) => isEs ? DAY_LABELS[d].es : DAY_LABELS[d].en),
    isEs ? "Promedio" : "Average",
  ]);

  // Staff on duty row
  const staffRow: (string | number)[] = [isEs ? "Personal en turno" : "Staff on duty"];
  const activeDMs = metrics.dailyMetrics.filter((d) => schedule.operatingHours[d.day].active);
  for (const day of activeDays) {
    const dm = metrics.dailyMetrics.find((d) => d.day === day);
    staffRow.push(dm?.staffOnDuty || 0);
  }
  staffRow.push(activeDMs.length > 0 ? Math.round(activeDMs.reduce((s, d) => s + d.staffOnDuty, 0) / activeDMs.length) : 0);
  rows.push(staffRow);

  // Providers row
  const provRow: (string | number)[] = [isEs ? "Proveedores" : "Providers"];
  for (const day of activeDays) {
    const dm = metrics.dailyMetrics.find((d) => d.day === day);
    provRow.push(dm?.providersOnDuty || 0);
  }
  provRow.push(activeDMs.length > 0 ? Math.round(activeDMs.reduce((s, d) => s + d.providersOnDuty, 0) / activeDMs.length * 10) / 10 : 0);
  rows.push(provRow);

  // MAs row
  const maRow: (string | number)[] = ["MAs"];
  for (const day of activeDays) {
    const dm = metrics.dailyMetrics.find((d) => d.day === day);
    maRow.push(dm?.masOnDuty || 0);
  }
  maRow.push(activeDMs.length > 0 ? Math.round(activeDMs.reduce((s, d) => s + d.masOnDuty, 0) / activeDMs.length * 10) / 10 : 0);
  rows.push(maRow);

  // MA:Provider ratio row
  const ratioRow: (string | number)[] = ["MA:Provider"];
  for (const day of activeDays) {
    const dm = metrics.dailyMetrics.find((d) => d.day === day);
    ratioRow.push(dm && dm.maProviderRatio > 0 ? `${dm.maProviderRatio.toFixed(1)}:1` : "—");
  }
  ratioRow.push(`${metrics.overallMAProviderRatio.toFixed(1)}:1`);
  rows.push(ratioRow);

  // Encounters row
  const encRow: (string | number)[] = [isEs ? "Encuentros est." : "Est. encounters"];
  for (const day of activeDays) {
    const dm = metrics.dailyMetrics.find((d) => d.day === day);
    encRow.push(dm?.estimatedEncounters || 0);
  }
  encRow.push(metrics.averageEncountersPerDay);
  rows.push(encRow);

  // Revenue row
  const revRow: (string | number)[] = [isEs ? "Ingresos est." : "Est. revenue"];
  for (const day of activeDays) {
    const dm = metrics.dailyMetrics.find((d) => d.day === day);
    revRow.push(dm ? formatCurrency(dm.estimatedRevenue) : "$0");
  }
  revRow.push(formatCurrency(metrics.totalWeeklyRevenue / activeDays.length));
  rows.push(revRow);

  // Labor cost row
  const costRow: (string | number)[] = [isEs ? "Costo laboral" : "Labor cost"];
  for (const day of activeDays) {
    const dm = metrics.dailyMetrics.find((d) => d.day === day);
    costRow.push(dm ? formatCurrency(dm.laborCost) : "$0");
  }
  costRow.push(formatCurrency(metrics.totalWeeklyLaborCost / activeDays.length));
  rows.push(costRow);

  rows.push([]);

  // Warning counts by day
  rows.push([isEs ? "⚠️ Alertas por día" : "⚠️ Warnings by day"]);
  const warnRow: (string | number)[] = [isEs ? "Alertas" : "Warnings"];
  for (const day of activeDays) {
    const count = metrics.allWarnings.filter((w) => w.day === day).length;
    warnRow.push(count > 0 ? `${count} ⚠️` : "✅");
  }
  warnRow.push(`${metrics.allWarnings.length} total`);
  rows.push(warnRow);

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws["!cols"] = [
    { wch: 20 },
    ...activeDays.map(() => ({ wch: 16 })),
    { wch: 14 },
  ];
  ws["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: activeDays.length + 1 } },
  ];

  return ws;
}

/* ------------------------------------------------------------------ */
/*  Main export function                                               */
/* ------------------------------------------------------------------ */

/**
 * Downloads a weekly schedule as a .xlsx workbook with 4 sheets:
 * 1. Schedule Overview (visual grid)
 * 2. Staff Roster (roles, FTE, costs)
 * 3. Metrics Summary (revenue, cost, ratios)
 * 4. Coverage Analysis (by day)
 *
 * Call from client: `await downloadScheduleAsExcel(schedule, locale)`
 */
export async function downloadScheduleAsExcel(
  schedule: WeeklySchedule,
  locale: string,
  filename?: string,
): Promise<void> {
  const XLSX = await import("xlsx");
  const { saveAs } = await import("file-saver");

  const isEs = locale === "es";
  const metrics = calculateScheduleMetrics(schedule);
  const wb = XLSX.utils.book_new();

  // Sheet 1: Schedule Overview
  const scheduleSheet = buildScheduleSheet(XLSX, schedule, metrics, locale);
  XLSX.utils.book_append_sheet(wb, scheduleSheet, isEs ? "📅 Horario" : "📅 Schedule");

  // Sheet 2: Staff Roster
  const rosterSheet = buildRosterSheet(XLSX, schedule, locale);
  XLSX.utils.book_append_sheet(wb, rosterSheet, isEs ? "📋 Personal" : "📋 Staff Roster");

  // Sheet 3: Metrics
  const metricsSheet = buildMetricsSheet(XLSX, schedule, metrics, locale);
  XLSX.utils.book_append_sheet(wb, metricsSheet, isEs ? "📊 Métricas" : "📊 Metrics");

  // Sheet 4: Coverage
  const coverageSheet = buildCoverageSheet(XLSX, schedule, metrics, locale);
  XLSX.utils.book_append_sheet(wb, coverageSheet, isEs ? "🔍 Cobertura" : "🔍 Coverage");

  const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const safeName = schedule.name.replace(/[^a-zA-Z0-9 -]/g, "").replace(/\s+/g, "-").toLowerCase();
  const name = filename ?? `fqhc-schedule-${safeName}.xlsx`;
  saveAs(blob, name);
}

/**
 * Downloads a schedule comparison as Excel with both schedules + comparison delta sheet.
 */
export async function downloadScheduleComparisonAsExcel(
  schedule1: WeeklySchedule,
  schedule2: WeeklySchedule,
  locale: string,
): Promise<void> {
  const XLSX = await import("xlsx");
  const { saveAs } = await import("file-saver");

  const isEs = locale === "es";
  const m1 = calculateScheduleMetrics(schedule1);
  const m2 = calculateScheduleMetrics(schedule2);
  const wb = XLSX.utils.book_new();

  // Sheet 1: Schedule A
  const s1Sheet = buildScheduleSheet(XLSX, schedule1, m1, locale);
  XLSX.utils.book_append_sheet(wb, s1Sheet, safeSheetName(`A: ${schedule1.name}`));

  // Sheet 2: Schedule B
  const s2Sheet = buildScheduleSheet(XLSX, schedule2, m2, locale);
  XLSX.utils.book_append_sheet(wb, s2Sheet, safeSheetName(`B: ${schedule2.name}`));

  // Sheet 3: Comparison
  const compareRows: (string | number)[][] = [];
  compareRows.push([isEs ? "📊 COMPARACIÓN DE HORARIOS" : "📊 SCHEDULE COMPARISON"]);
  compareRows.push([]);
  compareRows.push([
    isEs ? "Métrica" : "Metric",
    `A: ${schedule1.name}`,
    `B: ${schedule2.name}`,
    isEs ? "Diferencia" : "Difference",
    isEs ? "Cambio %" : "% Change",
  ]);

  const metrics: { label: { en: string; es: string }; a: number; b: number }[] = [
    { label: { en: "Total Staff", es: "Personal Total" }, a: m1.totalStaff, b: m2.totalStaff },
    { label: { en: "Total FTE", es: "Total FTE" }, a: m1.totalFTE, b: m2.totalFTE },
    { label: { en: "Providers", es: "Proveedores" }, a: m1.totalProviders, b: m2.totalProviders },
    { label: { en: "Weekly Encounters", es: "Encuentros Semanales" }, a: m1.totalWeeklyEncounters, b: m2.totalWeeklyEncounters },
    { label: { en: "Avg Encounters/Day", es: "Prom. Encuentros/Día" }, a: m1.averageEncountersPerDay, b: m2.averageEncountersPerDay },
    { label: { en: "Weekly Revenue", es: "Ingresos Semanales" }, a: m1.totalWeeklyRevenue, b: m2.totalWeeklyRevenue },
    { label: { en: "Annual Revenue", es: "Ingresos Anuales" }, a: m1.annualizedRevenue, b: m2.annualizedRevenue },
    { label: { en: "Weekly Labor Cost", es: "Costo Laboral Semanal" }, a: m1.totalWeeklyLaborCost, b: m2.totalWeeklyLaborCost },
    { label: { en: "Annual Labor Cost", es: "Costo Laboral Anual" }, a: m1.annualizedLaborCost, b: m2.annualizedLaborCost },
    { label: { en: "Annual Margin", es: "Margen Anual" }, a: m1.annualizedMargin, b: m2.annualizedMargin },
    { label: { en: "MA:Provider Ratio", es: "Ratio MA:Proveedor" }, a: m1.overallMAProviderRatio, b: m2.overallMAProviderRatio },
    { label: { en: "Warnings", es: "Alertas" }, a: m1.allWarnings.length, b: m2.allWarnings.length },
  ];

  for (const m of metrics) {
    const delta = m.b - m.a;
    const pct = m.a > 0 ? ((delta / m.a) * 100) : 0;
    const isDollar = m.label.en.includes("Revenue") || m.label.en.includes("Cost") || m.label.en.includes("Margin");
    compareRows.push([
      isEs ? m.label.es : m.label.en,
      isDollar ? formatCurrency(m.a) : m.a,
      isDollar ? formatCurrency(m.b) : m.b,
      isDollar ? formatCurrency(delta) : delta,
      `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`,
    ]);
  }

  compareRows.push([]);
  compareRows.push([
    isEs
      ? "Descargado de fqhctalent.com — Planificador de Horarios FQHC 2026"
      : "Downloaded from fqhctalent.com — FQHC Schedule Planner 2026",
  ]);

  const compareWs = XLSX.utils.aoa_to_sheet(compareRows);
  compareWs["!cols"] = [
    { wch: 28 }, { wch: 20 }, { wch: 20 }, { wch: 16 }, { wch: 12 },
  ];
  compareWs["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 4 } },
  ];
  XLSX.utils.book_append_sheet(wb, compareWs, isEs ? "📊 Comparación" : "📊 Comparison");

  const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, "fqhc-schedule-comparison.xlsx");
}

/* ------------------------------------------------------------------ */
/*  Helper                                                             */
/* ------------------------------------------------------------------ */

function safeSheetName(text: string): string {
  const cleaned = text.replace(/[\/\\?*[\]]/g, "").trim();
  return cleaned.length > 31 ? cleaned.slice(0, 31) : cleaned;
}
