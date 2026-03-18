// okr-docx-export.ts
// Generates a professional, thought-leadership-quality Word document from OKR templates
// Enhanced with scoring guide, implementation roadmap, bibliography, and best practices
// Uses docx library — dynamically imported to keep bundle small
// "use client" — runs in browser only (file-saver triggers download)

import type { OKRTemplate } from "./fqhc-okr-templates";
import { OKR_DOMAINS, DIFFICULTY_LABELS } from "./fqhc-okr-templates";

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  Color palette                                                      */
/* ------------------------------------------------------------------ */

const C = {
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
  text: "333333",
  muted: "57534E",
  faint: "A8A29E",
  border: "D6D3D1",
};

/* ------------------------------------------------------------------ */
/*  Build a single OKR template as DOCX elements                       */
/* ------------------------------------------------------------------ */

async function buildTemplateSection(
  docx: typeof import("docx"),
  okr: OKRTemplate,
  index: number,
  locale: string,
) {
  const {
    Paragraph,
    TextRun,
    Table,
    TableRow,
    TableCell,
    WidthType,
    AlignmentType,
    BorderStyle,
    HeadingLevel,
    ShadingType,
  } = docx;

  const isEs = locale === "es";
  const domainMeta = OKR_DOMAINS.find((d) => d.id === okr.domain);
  const diffMeta = DIFFICULTY_LABELS[okr.difficulty];
  const elements: (InstanceType<typeof Paragraph> | InstanceType<typeof Table>)[] = [];

  const cellBorder = { style: BorderStyle.SINGLE, size: 1, color: C.border };
  const cellBorders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };
  const cellPad = { top: 60, bottom: 60, left: 100, right: 100 };

  // ── Title: Objective
  elements.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 400, after: 120 },
      children: [
        new TextRun({
          text: `${okr.featured ? "★ " : ""}${index}. ${t(okr.objective, locale)}`,
          bold: true, size: 28, color: C.navy, font: "Arial",
        }),
      ],
    }),
  );

  // ── Metadata line
  elements.push(
    new Paragraph({
      spacing: { after: 80 },
      children: [
        new TextRun({ text: `${isEs ? "Dominio" : "Domain"}: ${domainMeta ? t(domainMeta, locale) : okr.domain}`, size: 20, color: C.muted, font: "Arial" }),
        new TextRun({ text: "  |  ", size: 20, color: C.faint }),
        new TextRun({ text: `${isEs ? "Dificultad" : "Difficulty"}: ${t(diffMeta, locale)}`, size: 20, color: C.muted, font: "Arial" }),
        new TextRun({ text: "  |  ", size: 20, color: C.faint }),
        new TextRun({ text: `${isEs ? "Período" : "Timeframe"}: ${okr.timeframe === "quarterly" ? (isEs ? "Trimestral" : "Quarterly") : (isEs ? "Anual" : "Annual")}`, size: 20, color: C.muted, font: "Arial" }),
      ],
    }),
  );

  // ── Context with teal left border
  elements.push(
    new Paragraph({
      spacing: { before: 120, after: 200 },
      border: { left: { style: BorderStyle.SINGLE, size: 6, color: C.teal, space: 8 } },
      indent: { left: 200 },
      children: [
        new TextRun({ text: isEs ? "Contexto: " : "Context: ", bold: true, size: 20, color: C.navy, font: "Arial" }),
        new TextRun({ text: t(okr.context, locale), size: 20, color: C.muted, italics: true, font: "Arial" }),
      ],
    }),
  );

  // ── KR Tracking Table with Score + Weight + Weighted columns
  const headerLabels = isEs
    ? ["#", "RESULTADO CLAVE", "MÉTRICA", "META", "PROPIETARIO", "PUNTAJE", "PESO", "ESTADO", "NOTAS"]
    : ["#", "KEY RESULT", "METRIC", "TARGET", "OWNER", "SCORE (0-1)", "WEIGHT", "STATUS", "NOTES"];
  const colWidths = [350, 3400, 1200, 1000, 900, 700, 600, 900, 1600];
  const tableWidth = colWidths.reduce((a, b) => a + b, 0);

  const headerRow = new TableRow({
    tableHeader: true,
    children: headerLabels.map(
      (text, ci) =>
        new TableCell({
          width: { size: colWidths[ci], type: WidthType.DXA },
          shading: { fill: C.navy, type: ShadingType.CLEAR },
          borders: cellBorders,
          margins: cellPad,
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text, bold: true, size: 17, color: C.white, font: "Arial" })],
            }),
          ],
        }),
    ),
  });

  const dataRows = okr.keyResults.map((kr, i) => {
    const cellTexts = [
      String(i + 1),
      t(kr.kr, locale),
      kr.metric,
      kr.target,
      "",
      "",
      "1",
      isEs ? "No Iniciado" : "Not Started",
      "",
    ];
    return new TableRow({
      children: cellTexts.map(
        (text, ci) =>
          new TableCell({
            width: { size: colWidths[ci], type: WidthType.DXA },
            shading: { fill: i % 2 === 0 ? "F5F5F4" : C.white, type: ShadingType.CLEAR },
            borders: cellBorders,
            margins: cellPad,
            children: [
              new Paragraph({
                children: [new TextRun({
                  text,
                  size: 17,
                  font: "Arial",
                  color: ci >= 4 && ci <= 6 ? "0000FF" : "1C1917",
                })],
              }),
            ],
          }),
      ),
    });
  });

  // Objective Score row
  const scoreRow = new TableRow({
    children: [
      new TableCell({
        width: { size: colWidths[0], type: WidthType.DXA },
        shading: { fill: C.lightTeal, type: ShadingType.CLEAR },
        borders: cellBorders, margins: cellPad,
        children: [new Paragraph({ children: [] })],
      }),
      new TableCell({
        width: { size: colWidths[1] + colWidths[2] + colWidths[3] + colWidths[4], type: WidthType.DXA },
        columnSpan: 4,
        shading: { fill: C.lightTeal, type: ShadingType.CLEAR },
        borders: cellBorders, margins: cellPad,
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({
            text: isEs ? "PUNTAJE DEL OBJETIVO →" : "OBJECTIVE SCORE →",
            bold: true, size: 18, color: C.navy, font: "Arial",
          })],
        })],
      }),
      new TableCell({
        width: { size: colWidths[5], type: WidthType.DXA },
        shading: { fill: C.lightTeal, type: ShadingType.CLEAR },
        borders: cellBorders, margins: cellPad,
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "___", bold: true, size: 20, color: C.navy, font: "Arial" })],
        })],
      }),
      new TableCell({
        width: { size: colWidths[6] + colWidths[7] + colWidths[8], type: WidthType.DXA },
        columnSpan: 3,
        shading: { fill: C.lightTeal, type: ShadingType.CLEAR },
        borders: cellBorders, margins: cellPad,
        children: [new Paragraph({
          children: [new TextRun({
            text: isEs ? "Promedio ponderado de KRs" : "Weighted avg of KR scores",
            size: 16, color: C.faint, font: "Arial", italics: true,
          })],
        })],
      }),
    ],
  });

  elements.push(
    new Table({
      width: { size: tableWidth, type: WidthType.DXA },
      columnWidths: colWidths,
      rows: [headerRow, ...dataRows, scoreRow],
    }),
  );

  // ── Departments & Tags
  const allDepts = [...new Set(okr.keyResults.flatMap((kr) => kr.departmentsInvolved))];
  elements.push(
    new Paragraph({
      spacing: { before: 200, after: 40 },
      children: [
        new TextRun({ text: `${isEs ? "Departamentos involucrados" : "Departments involved"}: `, bold: true, size: 20, color: C.navy, font: "Arial" }),
        new TextRun({ text: allDepts.join(" | "), size: 20, color: C.muted, font: "Arial" }),
      ],
    }),
  );

  if (okr.tags.length > 0) {
    elements.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({ text: `${isEs ? "Etiquetas" : "Tags"}: `, size: 18, color: C.faint, font: "Arial" }),
          new TextRun({ text: okr.tags.join(", "), size: 18, color: C.faint, font: "Arial" }),
        ],
      }),
    );
  }

  // ── Scoring reminder
  elements.push(
    new Paragraph({
      spacing: { before: 80, after: 300 },
      border: { left: { style: BorderStyle.SINGLE, size: 4, color: C.green, space: 6 } },
      indent: { left: 200 },
      children: [
        new TextRun({ text: isEs ? "Calificación: " : "Scoring: ", bold: true, size: 18, color: C.green, font: "Arial" }),
        new TextRun({ text: isEs
          ? "🟢 0.7–1.0 En camino  🟡 0.4–0.69 Atención  🔴 0.0–0.39 Riesgo  |  Meta ideal: 0.6–0.7"
          : "🟢 0.7–1.0 On Track  🟡 0.4–0.69 Attention  🔴 0.0–0.39 At Risk  |  Sweet spot: 0.6–0.7",
          size: 17, color: C.muted, font: "Arial" }),
      ],
    }),
  );

  return elements;
}

/* ------------------------------------------------------------------ */
/*  Build introductory guide pages                                     */
/* ------------------------------------------------------------------ */

function buildGuideFrontMatter(
  docx: typeof import("docx"),
  locale: string,
  templateCount: number,
) {
  const { Paragraph, TextRun, HeadingLevel, BorderStyle, Table, TableRow, TableCell, WidthType, ShadingType } = docx;
  const isEs = locale === "es";
  const elements: (InstanceType<typeof Paragraph> | InstanceType<typeof Table>)[] = [];

  const cellBorder = { style: BorderStyle.SINGLE, size: 1, color: C.border };
  const cellBorders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };
  const cellPad = { top: 60, bottom: 60, left: 100, right: 100 };

  // How to use
  elements.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 200 },
      children: [new TextRun({ text: isEs ? "Cómo Usar Este Documento" : "How to Use This Document", bold: true, size: 32, color: C.navy, font: "Arial" })],
    }),
  );

  const steps = isEs ? [
    "Cada plantilla OKR incluye el objetivo, resultados clave con métricas y metas, y una tabla de seguimiento.",
    "Llena la columna PROPIETARIO con la persona/departamento responsable de cada resultado clave.",
    "Califica cada KR de 0.0 (sin progreso) a 1.0 (logrado completamente). La meta ideal es 0.6–0.7.",
    "Actualiza el ESTADO regularmente: No Iniciado → En Progreso → En Camino → En Riesgo → Completo.",
    "Revisa mensualmente, califica trimestralmente. No esperes al final del trimestre para descubrir problemas.",
    "Comparte con tu equipo de liderazgo y Junta Directiva — HRSA espera participación del Board en metas estratégicas.",
  ] : [
    "Each OKR template includes the objective, key results with metrics and targets, and a tracking table.",
    "Fill in the OWNER column with the person/department responsible for each key result.",
    "Score each KR from 0.0 (no progress) to 1.0 (fully achieved). The sweet spot is 0.6–0.7.",
    "Update STATUS regularly: Not Started → In Progress → On Track → At Risk → Complete.",
    "Review monthly, score quarterly. Don't wait until quarter-end to discover problems.",
    "Share with your leadership team and Board — HRSA expects Board engagement in strategic goal-setting.",
  ];

  steps.forEach((step, i) => {
    elements.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({ text: `${i + 1}. `, bold: true, size: 22, color: C.teal, font: "Arial" }),
          new TextRun({ text: step, size: 22, color: C.text, font: "Arial" }),
        ],
      }),
    );
  });

  // Scoring table
  elements.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 160 },
      children: [new TextRun({ text: isEs ? "Guía de Calificación" : "Scoring Guide", bold: true, size: 26, color: C.teal, font: "Arial" })],
    }),
  );

  const scoreData = [
    { range: "0.7–1.0", rating: isEs ? "En Camino" : "On Track", fill: C.lightGreen, fontColor: C.green,
      desc: isEs ? "Ejecución fuerte. Resultados de pacientes mejorando." : "Strong execution. Patient outcomes improving. Celebrate." },
    { range: "0.4–0.69", rating: isEs ? "Atención" : "Needs Attention", fill: C.lightAmber, fontColor: C.amber,
      desc: isEs ? "Progreso parcial. Identificar barreras y corregir rumbo." : "Partial progress. Identify barriers and course-correct now." },
    { range: "0.0–0.39", rating: isEs ? "En Riesgo" : "At Risk", fill: C.lightRed, fontColor: C.red,
      desc: isEs ? "Brecha significativa. Escalar a liderazgo inmediatamente." : "Significant gap. Escalate to leadership immediately." },
  ];

  const scoreCols = [1500, 1800, 5700];
  elements.push(
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: scoreCols,
      rows: [
        new TableRow({
          children: [
            ...[isEs ? "Puntaje" : "Score", isEs ? "Estado" : "Status", isEs ? "Significado" : "Meaning"].map((h, ci) =>
              new TableCell({
                width: { size: scoreCols[ci], type: WidthType.DXA },
                shading: { fill: C.navy, type: ShadingType.CLEAR },
                borders: cellBorders, margins: cellPad,
                children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 20, color: C.white, font: "Arial" })] })],
              })
            ),
          ],
        }),
        ...scoreData.map((s) =>
          new TableRow({
            children: [
              new TableCell({
                width: { size: scoreCols[0], type: WidthType.DXA },
                shading: { fill: s.fill, type: ShadingType.CLEAR },
                borders: cellBorders, margins: cellPad,
                children: [new Paragraph({ children: [new TextRun({ text: s.range, bold: true, size: 20, color: s.fontColor, font: "Arial" })] })],
              }),
              new TableCell({
                width: { size: scoreCols[1], type: WidthType.DXA },
                shading: { fill: s.fill, type: ShadingType.CLEAR },
                borders: cellBorders, margins: cellPad,
                children: [new Paragraph({ children: [new TextRun({ text: s.rating, bold: true, size: 20, color: s.fontColor, font: "Arial" })] })],
              }),
              new TableCell({
                width: { size: scoreCols[2], type: WidthType.DXA },
                borders: cellBorders, margins: cellPad,
                children: [new Paragraph({ children: [new TextRun({ text: s.desc, size: 20, color: C.text, font: "Arial" })] })],
              }),
            ],
          })
        ),
      ],
    }),
  );

  // Key principles
  elements.push(
    new Paragraph({
      spacing: { before: 300, after: 160 },
      border: { left: { style: BorderStyle.SINGLE, size: 6, color: C.teal, space: 8 } },
      indent: { left: 200 },
      children: [new TextRun({
        text: isEs
          ? "\"Si el equipo consistentemente alcanza 1.0, los OKRs no son suficientemente ambiciosos. Quieres que tus equipos se estiren más allá de su capacidad actual.\" — Adaptado de Wodtke, Radical Focus"
          : "\"If the team is consistently hitting 1.0, the OKRs aren't ambitious enough. You want your teams reaching for something just beyond their current capacity.\" — Adapted from Wodtke, Radical Focus",
        size: 22, color: C.teal, italics: true, font: "Arial",
      })],
    }),
  );

  // Source attribution
  elements.push(
    new Paragraph({
      spacing: { before: 200, after: 100 },
      children: [new TextRun({
        text: isEs
          ? `Este documento contiene ${templateCount} plantillas OKR. Basado en: Doerr (Measure What Matters), Wodtke (Radical Focus), HRSA CHQR Framework, NACHC, IHI Triple Aim, Bodenheimer Quadruple Aim.`
          : `This document contains ${templateCount} OKR templates. Based on: Doerr (Measure What Matters), Wodtke (Radical Focus), HRSA CHQR Framework, NACHC, IHI Triple Aim, Bodenheimer Quadruple Aim.`,
        size: 18, color: C.faint, font: "Arial", italics: true,
      })],
    }),
  );

  return elements;
}

/* ------------------------------------------------------------------ */
/*  Download all templates as a single DOCX                            */
/* ------------------------------------------------------------------ */

export async function downloadOKRsAsDocx(
  templates: OKRTemplate[],
  locale: string,
  filename?: string,
): Promise<void> {
  const docx = await import("docx");
  const { saveAs } = await import("file-saver");

  const { Document, Packer, Paragraph, TextRun, AlignmentType, PageBreak, Header, Footer, PageNumber, BorderStyle, TabStopType, TabStopPosition } = docx;
  const isEs = locale === "es";

  const sorted = [
    ...templates.filter((t) => t.featured),
    ...templates.filter((t) => !t.featured),
  ];

  const allSections: (InstanceType<typeof Paragraph>)[] = [];

  // ── Cover page
  allSections.push(
    new Paragraph({ spacing: { before: 2000, after: 100 }, children: [] }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [new TextRun({ text: isEs ? "HERRAMIENTA OKR" : "OKR TOOLKIT", bold: true, size: 52, color: C.navy, font: "Arial" })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [new TextRun({ text: isEs ? "GUÍA DE IMPLEMENTACIÓN" : "IMPLEMENTATION GUIDE", bold: true, size: 44, color: C.teal, font: "Arial" })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.teal, space: 8 } },
      spacing: { after: 300 },
      children: [],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [new TextRun({
        text: isEs
          ? "Objetivos y Resultados Clave para Centros de Salud Comunitarios"
          : "Objectives & Key Results for Community Health Centers",
        size: 24, color: C.faint, font: "Arial",
      })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [new TextRun({
        text: isEs
          ? "Basado en liderazgo de pensamiento, mejores prácticas de HRSA, e implementación comprobada en FQHCs"
          : "Grounded in thought leadership, HRSA best practices, and proven FQHC implementation",
        size: 22, color: C.faint, font: "Arial",
      })],
    }),
    new Paragraph({ spacing: { before: 600 }, children: [] }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "FQHC Talent Exchange", bold: true, size: 22, color: C.navy, font: "Arial" })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [new TextRun({ text: "fqhctalent.com · 2026", size: 20, color: C.faint, font: "Arial" })],
    }),
    new Paragraph({ children: [new PageBreak()] }),
  );

  // ── Guide front matter
  const guideSections = buildGuideFrontMatter(docx, locale, sorted.length);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  allSections.push(...(guideSections as any[]));
  allSections.push(new Paragraph({ children: [new PageBreak()] }));

  // ── Each template
  for (let i = 0; i < sorted.length; i++) {
    const sectionElements = await buildTemplateSection(docx, sorted[i], i + 1, locale);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    allSections.push(...(sectionElements as any[]));

    if (i < sorted.length - 1) {
      allSections.push(new Paragraph({ children: [new PageBreak()] }));
    }
  }

  const doc = new Document({
    styles: {
      default: {
        document: { run: { font: "Arial", size: 22, color: "1C1917" } },
      },
      paragraphStyles: [
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 32, bold: true, font: "Arial", color: C.navy },
          paragraph: { spacing: { before: 240, after: 240 }, outlineLevel: 0 } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 26, bold: true, font: "Arial", color: C.teal },
          paragraph: { spacing: { before: 180, after: 180 }, outlineLevel: 1 } },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 12240, height: 15840 },
            margin: { top: 1200, right: 1000, bottom: 1000, left: 1000 },
          },
        },
        headers: {
          default: new Header({
            children: [new Paragraph({
              children: [
                new TextRun({ text: isEs ? "Herramienta OKR — FQHC Talent Exchange" : "OKR Toolkit — FQHC Talent Exchange", font: "Arial", size: 16, color: C.faint }),
                new TextRun("\t"),
                new TextRun({ text: "fqhctalent.com", font: "Arial", size: 16, color: C.teal, bold: true }),
              ],
              tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
              border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: C.teal, space: 4 } },
            })],
          }),
        },
        footers: {
          default: new Footer({
            children: [new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: isEs ? "Página " : "Page ", font: "Arial", size: 16, color: C.faint }),
                new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: C.faint }),
              ],
            })],
          }),
        },
        children: allSections,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const name = filename ?? (isEs ? "fqhc-okr-toolkit-completo.docx" : "fqhc-okr-toolkit.docx");
  saveAs(blob, name);
}

/* ------------------------------------------------------------------ */
/*  Download a single template as DOCX                                 */
/* ------------------------------------------------------------------ */

export async function downloadSingleOKRAsDocx(
  okr: OKRTemplate,
  locale: string,
): Promise<void> {
  const docx = await import("docx");
  const { saveAs } = await import("file-saver");

  const { Document, Packer, Header, Footer, Paragraph, TextRun, PageNumber, AlignmentType, BorderStyle, TabStopType, TabStopPosition } = docx;
  const isEs = locale === "es";

  const sectionElements = await buildTemplateSection(docx, okr, 1, locale);

  const doc = new Document({
    styles: {
      default: {
        document: { run: { font: "Arial", size: 22, color: "1C1917" } },
      },
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 12240, height: 15840 },
            margin: { top: 1200, right: 1000, bottom: 1000, left: 1000 },
          },
        },
        headers: {
          default: new Header({
            children: [new Paragraph({
              children: [
                new TextRun({ text: isEs ? "Herramienta OKR — FQHC Talent" : "OKR Toolkit — FQHC Talent", font: "Arial", size: 16, color: C.faint }),
                new TextRun("\t"),
                new TextRun({ text: "fqhctalent.com", font: "Arial", size: 16, color: C.teal, bold: true }),
              ],
              tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
              border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: C.teal, space: 4 } },
            })],
          }),
        },
        footers: {
          default: new Footer({
            children: [new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: isEs ? "Página " : "Page ", font: "Arial", size: 16, color: C.faint }),
                new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: C.faint }),
              ],
            })],
          }),
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        children: sectionElements as any[],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const safeName = okr.id.replace(/[^a-z0-9-]/gi, "-");
  saveAs(blob, `okr-${safeName}.docx`);
}
