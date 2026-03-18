/* ------------------------------------------------------------------ */
/*  Word Document (.docx) Generator                                    */
/*  Uses the `docx` library to create professional documents           */
/*  for both Resume Builder and Job Posting Builder                    */
/*                                                                     */
/*  PERFORMANCE: docx (~920KB) and file-saver are dynamically imported */
/*  so they only load when the user actually downloads a document.     */
/* ------------------------------------------------------------------ */

type DocxModule = typeof import("docx");

// Cached modules — loaded once per session on first download
let _docx: DocxModule | null = null;
let _saveAs: ((blob: Blob, filename: string) => void) | null = null;

async function loadDeps() {
  if (!_docx) _docx = await import("docx");
  if (!_saveAs) _saveAs = (await import("file-saver")).saveAs;
  return { docx: _docx, saveAs: _saveAs };
}

/* ------------------------------------------------------------------ */
/*  Shared helpers — take docx module to avoid top-level import        */
/* ------------------------------------------------------------------ */

function sectionHeading(d: DocxModule, text: string, color = "333333") {
  return new d.Paragraph({
    children: [
      new d.TextRun({
        text: text.toUpperCase(),
        bold: true,
        size: 20,
        font: "Georgia",
        color,
      }),
    ],
    spacing: { before: 280, after: 80 },
    border: {
      bottom: { style: d.BorderStyle.SINGLE, size: 1, color },
    },
  });
}

function placeholder(d: DocxModule, text: string) {
  return new d.TextRun({
    text,
    italics: true,
    size: 20,
    font: "Georgia",
    color: "999999",
  });
}

function bodyText(d: DocxModule, text: string, color = "444444") {
  return new d.TextRun({ text, size: 20, font: "Georgia", color });
}

function labelText(d: DocxModule, text: string) {
  return new d.TextRun({ text, bold: true, size: 20, font: "Georgia", color: "444444" });
}

function formatDateStr(dateStr: string, isEs: boolean): string {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  const monthsEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthsEs = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const months = isEs ? monthsEs : monthsEn;
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

/* ------------------------------------------------------------------ */
/*  Resume DOCX Generator                                              */
/* ------------------------------------------------------------------ */

export interface ResumeDocxData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  region: string;
  objective: string;
  programs: string[];
  ehrSystems: string[];
  certifications: string[];
  languages: string[];
  languageProficiencies?: Array<{ language: string; proficiency: string }>;
  selectedBulletTexts: string[];
  workHistory: Array<{
    employer: string;
    title: string;
    startDate: string;
    endDate: string;
    current: boolean;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    year: string;
  }>;
  isEs: boolean;
}

export async function generateResumeDocx(data: ResumeDocxData): Promise<void> {
  const { docx: d, saveAs } = await loadDeps();

  const t = data.isEs
    ? {
        summary: "Resumen Profesional",
        skills: "Habilidades y Calificaciones",
        experience: "Experiencia Profesional",
        education: "Educación",
        programs: "Programas",
        ehr: "Sistemas EHR",
        certs: "Certificaciones",
        langs: "Idiomas",
        present: "Presente",
        placeholderName: "[Tu Nombre]",
        placeholderEmail: "[tu.email@ejemplo.com]",
        placeholderPhone: "[(555) 123-4567]",
        placeholderLocation: "[Ciudad, Región]",
        placeholderSummary: "[Escribe un resumen de 2-3 oraciones describiendo tu experiencia, habilidades clave y lo que aportas a los centros de salud comunitarios. Ejemplo: Promotor/a de salud bilingüe con 3+ años de experiencia en alcance comunitario y gestión de casos en centros FQHC...]",
        placeholderPrograms: "[ECM, CalAIM, SDOH, etc.]",
        placeholderEhr: "[OCHIN Epic, eClinicalWorks, NextGen, etc.]",
        placeholderCerts: "[Certificación CHW, BLS, CPC, etc.]",
        placeholderLangs: "[Inglés (Nativo), Español (Profesional), etc.]",
        placeholderJob: "[Título del Puesto]",
        placeholderEmployer: "[Nombre del Empleador]",
        placeholderDates: "[Mes Año] – [Mes Año]",
        placeholderBullet1: "[Describe un logro clave con números: 'Manejé un panel de 200+ pacientes de Medi-Cal...']",
        placeholderBullet2: "[Describe otra responsabilidad: 'Coordiné con equipo interdisciplinario para completar evaluaciones SDOH...']",
        placeholderBullet3: "[Agrega otra contribución: 'Facilitó grupos de educación en salud en inglés y español...']",
        placeholderDegree: "[Título/Certificado]",
        placeholderInstitution: "[Institución]",
        placeholderYear: "[Año]",
      }
    : {
        summary: "Professional Summary",
        skills: "Skills & Qualifications",
        experience: "Professional Experience",
        education: "Education",
        programs: "Programs",
        ehr: "EHR Systems",
        certs: "Certifications",
        langs: "Languages",
        present: "Present",
        placeholderName: "[Your Name]",
        placeholderEmail: "[your.email@example.com]",
        placeholderPhone: "[(555) 123-4567]",
        placeholderLocation: "[City, Region]",
        placeholderSummary: "[Write a 2-3 sentence summary describing your experience, key skills, and what you bring to community health centers. Example: Bilingual community health worker with 3+ years of experience in community outreach and case management at FQHCs...]",
        placeholderPrograms: "[ECM, CalAIM, SDOH screening, etc.]",
        placeholderEhr: "[OCHIN Epic, eClinicalWorks, NextGen, etc.]",
        placeholderCerts: "[CHW Certification, BLS, CPC, etc.]",
        placeholderLangs: "[English (Native), Spanish (Professional), etc.]",
        placeholderJob: "[Job Title]",
        placeholderEmployer: "[Employer Name]",
        placeholderDates: "[Month Year] – [Month Year]",
        placeholderBullet1: "[Describe a key achievement with numbers: 'Managed a panel of 200+ Medi-Cal patients...']",
        placeholderBullet2: "[Describe another responsibility: 'Coordinated with interdisciplinary team to complete SDOH assessments...']",
        placeholderBullet3: "[Add another contribution: 'Facilitated health education groups in English and Spanish...']",
        placeholderDegree: "[Degree/Certificate]",
        placeholderInstitution: "[Institution]",
        placeholderYear: "[Year]",
      };

  const hasName = data.firstName || data.lastName;
  const locationParts = [data.city, data.region].filter(Boolean).join(", ");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sections: any[] = [];

  /* --- Header: Name --- */
  sections.push(
    new d.Paragraph({
      children: [
        hasName
          ? new d.TextRun({ text: `${data.firstName} ${data.lastName}`.trim(), bold: true, size: 32, font: "Georgia", color: "1a1a1a" })
          : placeholder(d, t.placeholderName),
      ],
      alignment: d.AlignmentType.CENTER,
      spacing: { after: 40 },
    }),
  );

  /* --- Header: Contact --- */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contactChildren: any[] = [];
  if (data.email) {
    contactChildren.push(bodyText(d, data.email, "555555"));
  } else {
    contactChildren.push(placeholder(d, t.placeholderEmail));
  }
  contactChildren.push(bodyText(d, "  •  ", "AAAAAA"));
  if (data.phone) {
    contactChildren.push(bodyText(d, data.phone, "555555"));
  } else {
    contactChildren.push(placeholder(d, t.placeholderPhone));
  }
  contactChildren.push(bodyText(d, "  •  ", "AAAAAA"));
  if (locationParts) {
    contactChildren.push(bodyText(d, locationParts, "555555"));
  } else {
    contactChildren.push(placeholder(d, t.placeholderLocation));
  }

  sections.push(
    new d.Paragraph({
      children: contactChildren,
      alignment: d.AlignmentType.CENTER,
      spacing: { after: 120 },
      border: {
        bottom: { style: d.BorderStyle.SINGLE, size: 2, color: "333333" },
      },
    }),
  );

  /* --- Professional Summary --- */
  sections.push(sectionHeading(d, t.summary));
  sections.push(
    new d.Paragraph({
      children: [
        data.objective
          ? bodyText(d, data.objective)
          : placeholder(d, t.placeholderSummary),
      ],
      spacing: { after: 80 },
    }),
  );

  /* --- Skills & Qualifications (always show — with placeholders for empty) --- */
  sections.push(sectionHeading(d, t.skills));

  // Programs
  sections.push(
    new d.Paragraph({
      children: [
        labelText(d, `${t.programs}: `),
        data.programs.length > 0
          ? bodyText(d, data.programs.join(", "))
          : placeholder(d, t.placeholderPrograms),
      ],
      spacing: { after: 40 },
    }),
  );

  // EHR Systems
  sections.push(
    new d.Paragraph({
      children: [
        labelText(d, `${t.ehr}: `),
        data.ehrSystems.length > 0
          ? bodyText(d, data.ehrSystems.join(", "))
          : placeholder(d, t.placeholderEhr),
      ],
      spacing: { after: 40 },
    }),
  );

  // Certifications
  sections.push(
    new d.Paragraph({
      children: [
        labelText(d, `${t.certs}: `),
        data.certifications.length > 0
          ? bodyText(d, data.certifications.join(", "))
          : placeholder(d, t.placeholderCerts),
      ],
      spacing: { after: 40 },
    }),
  );

  // Languages
  const langText = data.languageProficiencies && data.languageProficiencies.length > 0
    ? data.languageProficiencies.map((lp) => {
        const profLabels: Record<string, string> = data.isEs
          ? { native: "Nativo", professional: "Profesional", conversational: "Conversacional", basic: "Básico" }
          : { native: "Native", professional: "Professional", conversational: "Conversational", basic: "Basic" };
        return `${lp.language} (${profLabels[lp.proficiency] ?? lp.proficiency})`;
      }).join(", ")
    : data.languages.length > 0
      ? data.languages.join(", ")
      : "";

  sections.push(
    new d.Paragraph({
      children: [
        labelText(d, `${t.langs}: `),
        langText ? bodyText(d, langText) : placeholder(d, t.placeholderLangs),
      ],
      spacing: { after: 40 },
    }),
  );

  /* --- Professional Experience --- */
  sections.push(sectionHeading(d, t.experience));

  if (data.workHistory.length > 0) {
    for (let i = 0; i < data.workHistory.length; i++) {
      const job = data.workHistory[i];
      const dateRange = job.startDate
        ? `${formatDateStr(job.startDate, data.isEs)}${(job.endDate || job.current) ? " – " : ""}${job.current ? t.present : formatDateStr(job.endDate, data.isEs)}`
        : "";

      sections.push(
        new d.Paragraph({
          tabStops: [{ type: d.TabStopType.RIGHT, position: d.TabStopPosition.MAX }],
          children: [
            job.title
              ? new d.TextRun({ text: job.title, bold: true, size: 20, font: "Georgia", color: "1a1a1a" })
              : placeholder(d, t.placeholderJob),
            ...(job.employer
              ? [bodyText(d, ` | ${job.employer}`, "555555")]
              : [bodyText(d, " | ", "AAAAAA"), placeholder(d, t.placeholderEmployer)]),
            new d.TextRun({ text: "\t" }),
            dateRange
              ? new d.TextRun({ text: dateRange, size: 18, font: "Georgia", color: "777777" })
              : placeholder(d, t.placeholderDates),
          ],
          spacing: { before: 120, after: 40 },
        }),
      );

      // Bullet points under first job
      if (i === 0 && data.selectedBulletTexts.length > 0) {
        for (const bullet of data.selectedBulletTexts) {
          sections.push(
            new d.Paragraph({
              children: [bodyText(d, bullet)],
              bullet: { level: 0 },
              spacing: { after: 40 },
            }),
          );
        }
      } else if (i === 0 && data.selectedBulletTexts.length === 0) {
        // Placeholder bullets
        for (const ph of [t.placeholderBullet1, t.placeholderBullet2, t.placeholderBullet3]) {
          sections.push(
            new d.Paragraph({
              children: [placeholder(d, ph)],
              bullet: { level: 0 },
              spacing: { after: 40 },
            }),
          );
        }
      }
    }
  } else {
    // No work history — show template structure
    sections.push(
      new d.Paragraph({
        tabStops: [{ type: d.TabStopType.RIGHT, position: d.TabStopPosition.MAX }],
        children: [
          placeholder(d, t.placeholderJob),
          bodyText(d, " | ", "AAAAAA"),
          placeholder(d, t.placeholderEmployer),
          new d.TextRun({ text: "\t" }),
          placeholder(d, t.placeholderDates),
        ],
        spacing: { before: 120, after: 40 },
      }),
    );
    for (const ph of [t.placeholderBullet1, t.placeholderBullet2, t.placeholderBullet3]) {
      sections.push(
        new d.Paragraph({
          children: [placeholder(d, ph)],
          bullet: { level: 0 },
          spacing: { after: 40 },
        }),
      );
    }

    // Second position template
    sections.push(new d.Paragraph({ spacing: { after: 80 } }));
    sections.push(
      new d.Paragraph({
        tabStops: [{ type: d.TabStopType.RIGHT, position: d.TabStopPosition.MAX }],
        children: [
          placeholder(d, t.placeholderJob),
          bodyText(d, " | ", "AAAAAA"),
          placeholder(d, t.placeholderEmployer),
          new d.TextRun({ text: "\t" }),
          placeholder(d, t.placeholderDates),
        ],
        spacing: { before: 40, after: 40 },
      }),
    );
    for (const ph of [t.placeholderBullet1, t.placeholderBullet2]) {
      sections.push(
        new d.Paragraph({
          children: [placeholder(d, ph)],
          bullet: { level: 0 },
          spacing: { after: 40 },
        }),
      );
    }
  }

  /* --- Education --- */
  sections.push(sectionHeading(d, t.education));

  const hasEducation = data.education.length > 0 && data.education.some((e) => e.institution || e.degree);
  if (hasEducation) {
    for (const edu of data.education) {
      if (!edu.institution && !edu.degree) continue;
      sections.push(
        new d.Paragraph({
          tabStops: [{ type: d.TabStopType.RIGHT, position: d.TabStopPosition.MAX }],
          children: [
            edu.degree
              ? new d.TextRun({ text: edu.degree, bold: true, size: 20, font: "Georgia", color: "1a1a1a" })
              : placeholder(d, t.placeholderDegree),
            ...(edu.institution
              ? [bodyText(d, ` | ${edu.institution}`, "555555")]
              : [bodyText(d, " | ", "AAAAAA"), placeholder(d, t.placeholderInstitution)]),
            ...(edu.year
              ? [new d.TextRun({ text: "\t" }), new d.TextRun({ text: edu.year, size: 18, font: "Georgia", color: "777777" })]
              : [new d.TextRun({ text: "\t" }), placeholder(d, t.placeholderYear)]),
          ],
          spacing: { after: 40 },
        }),
      );
    }
  } else {
    // Template education entries
    sections.push(
      new d.Paragraph({
        tabStops: [{ type: d.TabStopType.RIGHT, position: d.TabStopPosition.MAX }],
        children: [
          placeholder(d, t.placeholderDegree),
          bodyText(d, " | ", "AAAAAA"),
          placeholder(d, t.placeholderInstitution),
          new d.TextRun({ text: "\t" }),
          placeholder(d, t.placeholderYear),
        ],
        spacing: { after: 40 },
      }),
    );
  }

  // Build document
  const doc = new d.Document({
    sections: [{
      properties: {
        page: {
          margin: { top: 720, bottom: 720, left: 720, right: 720 },
        },
      },
      children: sections,
    }],
  });

  const blob = await d.Packer.toBlob(doc);
  const name = hasName ? `${data.firstName}_${data.lastName}` : "FQHC_Resume";
  const langSuffix = data.isEs ? "_ES" : "_EN";
  saveAs(blob, `${name}_Resume${langSuffix}.docx`);
}

/* ------------------------------------------------------------------ */
/*  Job Posting DOCX Generator                                         */
/* ------------------------------------------------------------------ */

export async function generateJobPostingDocx(
  content: string,
  roleId: string,
  orgName: string,
): Promise<void> {
  const { docx: d, saveAs } = await loadDeps();

  const lines = content.split("\n");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const paragraphs: any[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      paragraphs.push(new d.Paragraph({ spacing: { after: 80 } }));
      continue;
    }

    // Detect section headers (all caps, starts with #, or short line ending with :)
    const isHeader = /^[A-ZÀ-Ú\s&/,()]+$/.test(trimmed) || /^#{1,3}\s/.test(trimmed) || (trimmed.endsWith(":") && trimmed.length < 60);
    const cleanHeader = trimmed.replace(/^#{1,3}\s/, "").replace(/:$/, "");

    // Detect bullet points
    const isBullet = /^[•\-–]\s/.test(trimmed) || /^✅\s/.test(trimmed);
    const bulletText = trimmed.replace(/^[•\-–✅]\s*/, "");

    if (isHeader) {
      paragraphs.push(
        new d.Paragraph({
          children: [
            new d.TextRun({
              text: cleanHeader.toUpperCase(),
              bold: true,
              size: 22,
              font: "Calibri",
              color: "0F766E",
            }),
          ],
          spacing: { before: 200, after: 80 },
          border: {
            bottom: { style: d.BorderStyle.SINGLE, size: 1, color: "0F766E" },
          },
        }),
      );
    } else if (isBullet) {
      paragraphs.push(
        new d.Paragraph({
          children: [
            new d.TextRun({ text: bulletText, size: 20, font: "Calibri", color: "333333" }),
          ],
          bullet: { level: 0 },
          spacing: { after: 40 },
        }),
      );
    } else {
      paragraphs.push(
        new d.Paragraph({
          children: [
            new d.TextRun({ text: trimmed, size: 20, font: "Calibri", color: "333333" }),
          ],
          spacing: { after: 60 },
        }),
      );
    }
  }

  const doc = new d.Document({
    sections: [{
      properties: {
        page: {
          margin: { top: 720, bottom: 720, left: 900, right: 900 },
        },
      },
      children: paragraphs,
    }],
  });

  const blob = await d.Packer.toBlob(doc);
  const safeOrgName = orgName ? orgName.replace(/\s+/g, "-").toLowerCase() : "fqhc";
  saveAs(blob, `job-posting-${roleId}-${safeOrgName}.docx`);
}
