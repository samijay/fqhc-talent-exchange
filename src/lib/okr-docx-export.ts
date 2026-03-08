// okr-docx-export.ts
// Generates a professional Word document from OKR templates
// Uses docx library — dynamically imported to keep bundle small
// "use client" — runs in browser only (file-saver triggers download)

import type { OKRTemplate } from "./fqhc-okr-templates";
import { OKR_DOMAINS, DIFFICULTY_LABELS } from "./fqhc-okr-templates";

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  Build a single OKR template as a DOCX section                      */
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
  } = docx;

  const isEs = locale === "es";
  const domainMeta = OKR_DOMAINS.find((d) => d.id === okr.domain);
  const diffMeta = DIFFICULTY_LABELS[okr.difficulty];
  const elements: (InstanceType<typeof Paragraph> | InstanceType<typeof Table>)[] = [];

  // ── Title: Objective
  elements.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 400, after: 120 },
      children: [
        new TextRun({
          text: `${okr.featured ? "★ " : ""}${index}. ${t(okr.objective, locale)}`,
          bold: true,
          size: 28,
          color: "0F766E",
        }),
      ],
    }),
  );

  // ── Metadata line
  elements.push(
    new Paragraph({
      spacing: { after: 80 },
      children: [
        new TextRun({
          text: `${isEs ? "Dominio" : "Domain"}: ${domainMeta ? t(domainMeta, locale) : okr.domain}`,
          size: 20,
          color: "57534E",
        }),
        new TextRun({ text: "  |  ", size: 20, color: "A8A29E" }),
        new TextRun({
          text: `${isEs ? "Dificultad" : "Difficulty"}: ${t(diffMeta, locale)}`,
          size: 20,
          color: "57534E",
        }),
        new TextRun({ text: "  |  ", size: 20, color: "A8A29E" }),
        new TextRun({
          text: `${isEs ? "Período" : "Timeframe"}: ${okr.timeframe === "quarterly" ? (isEs ? "Trimestral" : "Quarterly") : (isEs ? "Anual" : "Annual")}`,
          size: 20,
          color: "57534E",
        }),
      ],
    }),
  );

  // ── Context
  elements.push(
    new Paragraph({
      spacing: { before: 120, after: 200 },
      children: [
        new TextRun({ text: isEs ? "Contexto: " : "Context: ", bold: true, size: 20, color: "44403C" }),
        new TextRun({ text: t(okr.context, locale), size: 20, color: "57534E", italics: true }),
      ],
    }),
  );

  // ── KR Tracking Table
  const headerCells = [
    "#", isEs ? "RESULTADO CLAVE" : "KEY RESULT", isEs ? "MÉTRICA" : "METRIC",
    isEs ? "META" : "TARGET", isEs ? "PROPIETARIO" : "OWNER",
    isEs ? "VALOR ACTUAL" : "CURRENT VALUE", isEs ? "ESTADO" : "STATUS",
    isEs ? "NOTAS" : "NOTES",
  ];
  const colWidths = [400, 4200, 1400, 1200, 1100, 1000, 900, 1800];

  const noBorder = { style: BorderStyle.SINGLE, size: 1, color: "D6D3D1" };
  const cellBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

  const headerRow = new TableRow({
    tableHeader: true,
    children: headerCells.map(
      (text, ci) =>
        new TableCell({
          width: { size: colWidths[ci], type: WidthType.DXA },
          shading: { fill: "0F766E" },
          borders: cellBorders,
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text, bold: true, size: 18, color: "FFFFFF", font: "Calibri" })],
            }),
          ],
        }),
    ),
  });

  const dataRows = okr.keyResults.map((kr, i) => {
    const cellTexts = [String(i + 1), t(kr.kr, locale), kr.metric, kr.target, "", "", isEs ? "No Iniciado" : "Not Started", ""];
    const cells = cellTexts.map(
      (text, ci) =>
        new TableCell({
          width: { size: colWidths[ci], type: WidthType.DXA },
          shading: { fill: i % 2 === 0 ? "F5F5F4" : "FFFFFF" },
          borders: cellBorders,
          children: [
            new Paragraph({
              children: [new TextRun({ text, size: 18, font: "Calibri", color: "1C1917" })],
            }),
          ],
        }),
    );
    return new TableRow({ children: cells });
  });

  elements.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [headerRow, ...dataRows],
    }),
  );

  // ── Departments
  const allDepts = [...new Set(okr.keyResults.flatMap((kr) => kr.departmentsInvolved))];
  elements.push(
    new Paragraph({
      spacing: { before: 200, after: 80 },
      children: [
        new TextRun({
          text: `${isEs ? "Departamentos involucrados" : "Departments involved"}: `,
          bold: true,
          size: 20,
          color: "44403C",
        }),
        new TextRun({ text: allDepts.join(" | "), size: 20, color: "57534E" }),
      ],
    }),
  );

  // ── Tags
  if (okr.tags.length > 0) {
    elements.push(
      new Paragraph({
        spacing: { after: 300 },
        children: [
          new TextRun({ text: `${isEs ? "Etiquetas" : "Tags"}: `, size: 18, color: "A8A29E" }),
          new TextRun({ text: okr.tags.join(", "), size: 18, color: "A8A29E" }),
        ],
      }),
    );
  }

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

  const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, PageBreak } = docx;
  const isEs = locale === "es";

  const sorted = [
    ...templates.filter((t) => t.featured),
    ...templates.filter((t) => !t.featured),
  ];

  const allSections: (InstanceType<typeof Paragraph>)[] = [];

  // ── Title page content
  allSections.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { before: 2000, after: 200 },
      children: [
        new TextRun({
          text: isEs ? "Manual de Seguimiento OKR" : "OKR Tracking Workbook",
          bold: true,
          size: 44,
          color: "0F766E",
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: "FQHC Talent Exchange — California FQHC Strategic Monitor",
          size: 24,
          color: "57534E",
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [
        new TextRun({ text: "fqhctalent.com · 2026", size: 20, color: "A8A29E" }),
      ],
    }),
    new Paragraph({
      spacing: { before: 400, after: 120 },
      children: [
        new TextRun({
          text: isEs ? "CÓMO USAR ESTE DOCUMENTO" : "HOW TO USE THIS DOCUMENT",
          bold: true,
          size: 24,
          color: "0F766E",
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 80 },
      children: [
        new TextRun({
          text: isEs
            ? "1. Llena la columna PROPIETARIO con la persona/departamento responsable\n2. Actualiza VALOR ACTUAL semanalmente\n3. Cambia el ESTADO a: No Iniciado / En Progreso / En Camino / En Riesgo / Completo\n4. La plantilla ★ Empresa Completa es el punto de partida recomendado"
            : "1. Fill in the OWNER column with the responsible person/department\n2. Update CURRENT VALUE weekly or monthly\n3. Set STATUS to: Not Started / In Progress / On Track / At Risk / Complete\n4. The ★ Company-Wide template is the recommended starting point",
          size: 20,
          color: "57534E",
        }),
      ],
    }),
    new Paragraph({
      children: [new PageBreak()],
    }),
  );

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
        document: {
          run: { font: "Calibri", size: 22, color: "1C1917" },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1000, right: 1000, bottom: 1000, left: 1000 },
          },
        },
        children: allSections,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const name = filename ?? (isEs ? "plantillas-okr-fqhc-tracker.docx" : "fqhc-okr-tracker.docx");
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

  const { Document, Packer } = docx;

  const sectionElements = await buildTemplateSection(docx, okr, 1, locale);

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: "Calibri", size: 22, color: "1C1917" },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1000, right: 1000, bottom: 1000, left: 1000 },
          },
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
