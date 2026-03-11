// downloads-catalog.ts
// Central catalog of all downloadable exports across the site.
// Used by the Downloads Hub page to display available downloads by category.

export type DownloadFormat = "xlsx" | "pdf" | "docx" | "csv" | "ics" | "txt";
export type DownloadCategory = "okr" | "schedule" | "compliance" | "career" | "clinic-sim" | "intelligence";

export interface DownloadItem {
  id: string;
  title: string;
  esTitle: string;
  description: string;
  esDescription: string;
  format: DownloadFormat;
  category: DownloadCategory;
  sourcePage: string; // route where the download lives (e.g., "/strategy/okrs")
  icon: string; // Lucide icon name
}

export interface DownloadCategoryInfo {
  id: DownloadCategory;
  title: string;
  esTitle: string;
  icon: string;
}

export const DOWNLOAD_CATEGORIES: DownloadCategoryInfo[] = [
  {
    id: "okr",
    title: "OKR Templates & Tracking",
    esTitle: "Plantillas y Seguimiento OKR",
    icon: "Target",
  },
  {
    id: "schedule",
    title: "Schedule Planning",
    esTitle: "Planificacion de Horarios",
    icon: "Calendar",
  },
  {
    id: "career",
    title: "Career Tools",
    esTitle: "Herramientas de Carrera",
    icon: "Briefcase",
  },
  {
    id: "compliance",
    title: "Compliance & Training",
    esTitle: "Cumplimiento y Capacitacion",
    icon: "ShieldCheck",
  },
  {
    id: "clinic-sim",
    title: "Clinic Simulator",
    esTitle: "Simulador de Clinica",
    icon: "Building2",
  },
  {
    id: "intelligence",
    title: "Intelligence & Data",
    esTitle: "Inteligencia y Datos",
    icon: "BarChart3",
  },
];

export const DOWNLOAD_ITEMS: DownloadItem[] = [
  /* ------------------------------------------------------------------ */
  /*  OKR Category                                                       */
  /* ------------------------------------------------------------------ */
  {
    id: "okr-toolkit-xlsx",
    title: "OKR Toolkit Workbook (All Templates)",
    esTitle: "Manual OKR Completo (Todas las Plantillas)",
    description:
      "Multi-sheet Excel workbook with all 25 OKR templates, scoring formulas, weighted tracking columns, Quick Start index, and Grading Guide. Each template has Owner, Score, Weight, Status, Notes, and Due Date columns.",
    esDescription:
      "Libro Excel con las 25 plantillas OKR, formulas de calificacion, columnas de seguimiento ponderado, indice de Inicio Rapido y Guia de Calificacion. Cada plantilla tiene columnas de Propietario, Puntaje, Peso, Estado, Notas y Fecha Limite.",
    format: "xlsx",
    category: "okr",
    sourcePage: "/strategy/okrs",
    icon: "FileSpreadsheet",
  },
  {
    id: "okr-single-template-xlsx",
    title: "Single OKR Template (Excel)",
    esTitle: "Plantilla OKR Individual (Excel)",
    description:
      "Standalone Excel file for one OKR objective with key results tracking table, weighted scoring formulas, and a Grading Guide reference sheet.",
    esDescription:
      "Archivo Excel individual para un objetivo OKR con tabla de seguimiento de resultados clave, formulas de puntaje ponderado y hoja de referencia de Guia de Calificacion.",
    format: "xlsx",
    category: "okr",
    sourcePage: "/strategy/okrs",
    icon: "FileSpreadsheet",
  },
  {
    id: "okr-toolkit-docx",
    title: "OKR Toolkit Implementation Guide (Word)",
    esTitle: "Guia de Implementacion OKR (Word)",
    description:
      "Professional Word document with cover page, scoring guide, implementation roadmap, and all OKR templates formatted for printing or sharing with leadership teams and boards.",
    esDescription:
      "Documento Word profesional con portada, guia de calificacion, hoja de ruta de implementacion y todas las plantillas OKR formateadas para imprimir o compartir con equipos de liderazgo y juntas directivas.",
    format: "docx",
    category: "okr",
    sourcePage: "/strategy/okrs",
    icon: "FileText",
  },
  {
    id: "okr-single-template-docx",
    title: "Single OKR Template (Word)",
    esTitle: "Plantilla OKR Individual (Word)",
    description:
      "Standalone Word document for one OKR objective with key results tracking table, scoring guide, and context — ready for team review.",
    esDescription:
      "Documento Word individual para un objetivo OKR con tabla de seguimiento de resultados clave, guia de calificacion y contexto — listo para revision del equipo.",
    format: "docx",
    category: "okr",
    sourcePage: "/strategy/okrs",
    icon: "FileText",
  },

  /* ------------------------------------------------------------------ */
  /*  Schedule Category                                                  */
  /* ------------------------------------------------------------------ */
  {
    id: "schedule-planner-xlsx",
    title: "Weekly Schedule Workbook",
    esTitle: "Libro de Horario Semanal",
    description:
      "4-sheet Excel workbook: Schedule Overview (visual grid by day), Staff Roster (roles, FTE, hourly rates), Metrics Summary (revenue, labor cost, encounters, margins), and Coverage Analysis (daily breakdown with warnings).",
    esDescription:
      "Libro Excel de 4 hojas: Vista General del Horario (cuadricula visual por dia), Lista de Personal (roles, FTE, tarifas por hora), Resumen de Metricas (ingresos, costo laboral, encuentros, margenes) y Analisis de Cobertura (desglose diario con alertas).",
    format: "xlsx",
    category: "schedule",
    sourcePage: "/strategy/schedule-planner",
    icon: "Calendar",
  },
  {
    id: "schedule-comparison-xlsx",
    title: "Schedule Comparison Workbook",
    esTitle: "Libro de Comparacion de Horarios",
    description:
      "Side-by-side Excel comparison of two saved schedules with a delta sheet showing differences in staff count, FTE, encounters, revenue, labor cost, margin, and MA:Provider ratios.",
    esDescription:
      "Comparacion Excel lado a lado de dos horarios guardados con hoja de diferencias mostrando cambios en personal, FTE, encuentros, ingresos, costo laboral, margen y ratios MA:Proveedor.",
    format: "xlsx",
    category: "schedule",
    sourcePage: "/strategy/schedule-planner",
    icon: "GitCompareArrows",
  },

  /* ------------------------------------------------------------------ */
  /*  Career Category                                                    */
  /* ------------------------------------------------------------------ */
  {
    id: "resume-pdf",
    title: "Resume (PDF)",
    esTitle: "Curriculum Vitae (PDF)",
    description:
      "Professional FQHC-tailored resume generated from the Resume Builder. Includes role-specific bullet points, skills, certifications, EHR systems, language proficiencies, and work history. Formatted for ATS compatibility.",
    esDescription:
      "Curriculum vitae profesional para FQHCs generado desde el Creador de CV. Incluye puntos especificos del rol, habilidades, certificaciones, sistemas EHR, competencias linguisticas e historial laboral. Formateado para compatibilidad con ATS.",
    format: "pdf",
    category: "career",
    sourcePage: "/resume-builder",
    icon: "FileDown",
  },
  {
    id: "resume-docx",
    title: "Resume (Word)",
    esTitle: "Curriculum Vitae (Word)",
    description:
      "Editable Word document resume with professional formatting, placeholder text for incomplete sections, and FQHC-specific content. Edit further in Microsoft Word or Google Docs.",
    esDescription:
      "Documento Word editable del curriculum con formato profesional, texto de relleno para secciones incompletas y contenido especifico de FQHC. Edita en Microsoft Word o Google Docs.",
    format: "docx",
    category: "career",
    sourcePage: "/resume-builder",
    icon: "FileText",
  },
  {
    id: "fast-track-resume-pdf",
    title: "Fast-Track Resume (PDF)",
    esTitle: "CV Rapido (PDF)",
    description:
      "Streamlined 4-step resume for displaced workers. Pre-filled from Fast-Track intake data with role-specific bullets and professional formatting.",
    esDescription:
      "CV simplificado de 4 pasos para trabajadores desplazados. Pre-llenado con datos de admision Fast-Track con puntos especificos del rol y formato profesional.",
    format: "pdf",
    category: "career",
    sourcePage: "/fast-track",
    icon: "Zap",
  },
  {
    id: "first-90-days-plan-pdf",
    title: "First 90 Days Plan (PDF)",
    esTitle: "Plan de los Primeros 90 Dias (PDF)",
    description:
      "Personalized 30/60/90-day transition roadmap based on career assessment results. Includes Five Conversations framework, FOGLAMP onboarding checklist, coaching notes, and phase-by-phase action items.",
    esDescription:
      "Hoja de ruta de transicion personalizada de 30/60/90 dias basada en resultados de evaluacion. Incluye marco de Cinco Conversaciones, lista FOGLAMP, notas de coaching y acciones por fase.",
    format: "pdf",
    category: "career",
    sourcePage: "/career-insights",
    icon: "CalendarDays",
  },
  {
    id: "manager-90-day-plan-print",
    title: "Manager 90-Day Leadership Plan (Print)",
    esTitle: "Plan de Liderazgo de 90 Dias para Gerentes (Imprimir)",
    description:
      "Printable leadership transition plan personalized for your role and team situation. Includes Five Conversations with your team, Team FOGLAMP checklist, phase-by-phase actions, and key resources for FQHC leaders.",
    esDescription:
      "Plan de transicion de liderazgo imprimible personalizado para tu rol y situacion de equipo. Incluye Cinco Conversaciones con tu equipo, lista FOGLAMP del equipo, acciones por fase y recursos clave para lideres de FQHC.",
    format: "pdf",
    category: "career",
    sourcePage: "/team-readiness",
    icon: "Printer",
  },
  {
    id: "job-posting-docx",
    title: "Job Posting (Word)",
    esTitle: "Publicacion de Empleo (Word)",
    description:
      "Professional Word document job posting with role-specific content, salary benchmarks, benefits, screening questions, and FQHC-specific requirements. Ready to post on job boards.",
    esDescription:
      "Documento Word profesional de publicacion de empleo con contenido especifico del rol, referencias salariales, beneficios, preguntas de seleccion y requisitos de FQHC. Listo para publicar en bolsas de trabajo.",
    format: "docx",
    category: "career",
    sourcePage: "/job-posting-builder",
    icon: "FileText",
  },
  {
    id: "job-posting-txt",
    title: "Job Posting (Plain Text)",
    esTitle: "Publicacion de Empleo (Texto Plano)",
    description:
      "Plain text version of the job posting for easy copy-paste into any ATS, email, or job board that does not support formatted documents.",
    esDescription:
      "Version en texto plano de la publicacion de empleo para copiar y pegar facilmente en cualquier ATS, correo electronico o bolsa de trabajo que no soporte documentos formateados.",
    format: "txt",
    category: "career",
    sourcePage: "/job-posting-builder",
    icon: "FileType",
  },
];
