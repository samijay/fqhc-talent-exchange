// academy-catalog.ts
// Central catalog of all FQHC Academy courses and learning tools
// Used by the Academy landing page and cross-tool navigation
// Last updated: 2026-03-10

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type CourseStatus = "live" | "coming-soon" | "in-development";
export type TimeTrack = "quick" | "standard" | "deep-dive";
export type AudienceType = "leaders" | "job-seekers" | "clinical" | "all";

export interface AcademyCourse {
  id: string;
  title: { en: string; es: string };
  subtitle: { en: string; es: string };
  description: { en: string; es: string };
  href: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind color name
  status: CourseStatus;
  timeTrack: TimeTrack;
  estimatedMinutes: number;
  moduleCount: number;
  audience: AudienceType;
  tags: string[];
  xpTotal?: number;
}

export interface LearningTool {
  id: string;
  title: { en: string; es: string };
  description: { en: string; es: string };
  href: string;
  icon: string;
  color: string;
  audience: AudienceType;
}

/* ------------------------------------------------------------------ */
/*  Time Track Metadata                                                */
/* ------------------------------------------------------------------ */

export const TIME_TRACKS: Record<
  TimeTrack,
  {
    label: { en: string; es: string };
    description: { en: string; es: string };
    icon: string;
    minuteRange: string;
  }
> = {
  quick: {
    label: { en: "Quick Bites", es: "Bocados Rápidos" },
    description: {
      en: "5-minute lessons you can finish between patients",
      es: "Lecciones de 5 minutos que puedes terminar entre pacientes",
    },
    icon: "Zap",
    minuteRange: "5-10 min",
  },
  standard: {
    label: { en: "Focused Modules", es: "Módulos Enfocados" },
    description: {
      en: "30-minute deep dives with hands-on exercises",
      es: "Inmersiones de 30 minutos con ejercicios prácticos",
    },
    icon: "BookOpen",
    minuteRange: "20-45 min",
  },
  "deep-dive": {
    label: { en: "Deep Dives", es: "Inmersiones Profundas" },
    description: {
      en: "Comprehensive courses with simulations and capstones",
      es: "Cursos completos con simulaciones y proyectos finales",
    },
    icon: "GraduationCap",
    minuteRange: "1-3 hours",
  },
};

/* ------------------------------------------------------------------ */
/*  Courses                                                            */
/* ------------------------------------------------------------------ */

export const ACADEMY_COURSES: AcademyCourse[] = [
  // ---- LIVE ----
  {
    id: "okr-course",
    title: { en: "Master OKRs for Your FQHC", es: "Domina los OKRs para Tu FQHC" },
    subtitle: {
      en: "The #1 goal-setting framework adapted for community health",
      es: "El marco de objetivos #1 adaptado para salud comunitaria",
    },
    description: {
      en: "6 interactive modules with drag-and-drop exercises, scoring simulators, and a capstone project. Build real OKRs for your clinic using templates from top-performing FQHCs.",
      es: "6 módulos interactivos con ejercicios de arrastrar y soltar, simuladores de puntuación y un proyecto final. Crea OKRs reales para tu clínica usando plantillas de FQHCs exitosos.",
    },
    href: "/strategy/okr-course",
    icon: "Target",
    color: "teal",
    status: "live",
    timeTrack: "deep-dive",
    estimatedMinutes: 90,
    moduleCount: 6,
    audience: "leaders",
    tags: ["OKRs", "Strategy", "Goal Setting"],
    xpTotal: 600,
  },
  {
    id: "clinic-simulator",
    title: { en: "Clinic Operations Simulator", es: "Simulador de Operaciones Clínicas" },
    subtitle: {
      en: "Model revenue, staffing, and costs for any FQHC configuration",
      es: "Modela ingresos, personal y costos para cualquier configuración de FQHC",
    },
    description: {
      en: "Interactive financial simulator with real PPS rates, 340B savings, and payer mix modeling. Test scenarios before making expensive decisions.",
      es: "Simulador financiero interactivo con tarifas PPS reales, ahorros 340B y modelado de mezcla de pagadores. Prueba escenarios antes de tomar decisiones costosas.",
    },
    href: "/strategy/clinic-simulator",
    icon: "Calculator",
    color: "blue",
    status: "live",
    timeTrack: "standard",
    estimatedMinutes: 30,
    moduleCount: 1,
    audience: "leaders",
    tags: ["Finance", "Operations", "Simulation"],
  },
  {
    id: "masterclass",
    title: { en: "Executive Masterclass", es: "Masterclass Ejecutiva" },
    subtitle: {
      en: "Deep-dive modules on the 2026 FQHC crisis convergence",
      es: "Módulos profundos sobre la convergencia de crisis FQHC 2026",
    },
    description: {
      en: "Expert-level briefings on PPS elimination, CalAIM expiration, 340B reform, and workforce retention strategies.",
      es: "Informes de nivel experto sobre eliminación de PPS, expiración de CalAIM, reforma 340B y estrategias de retención laboral.",
    },
    href: "/strategy/masterclass",
    icon: "GraduationCap",
    color: "violet",
    status: "live",
    timeTrack: "deep-dive",
    estimatedMinutes: 120,
    moduleCount: 8,
    audience: "leaders",
    tags: ["Executive", "Crisis Management", "Policy"],
  },

  // ---- NOW LIVE ----
  {
    id: "clinic-manager",
    title: { en: "Clinic Manager Master Class", es: "Master Class para Gerentes de Clínica" },
    subtitle: {
      en: "Everything you need to run a high-performing FQHC site",
      es: "Todo lo que necesitas para dirigir un sitio FQHC de alto rendimiento",
    },
    description: {
      en: "8 modules covering revenue, team-based care, scheduling optimization, BH integration, ECM operations, workforce retention, and financial modeling — with live simulator exercises.",
      es: "8 módulos que cubren ingresos, atención en equipo, optimización de horarios, integración BH, operaciones ECM, retención laboral y modelado financiero — con ejercicios de simulador en vivo.",
    },
    href: "/academy/clinic-manager",
    icon: "Stethoscope",
    color: "rose",
    status: "live",
    timeTrack: "deep-dive",
    estimatedMinutes: 90,
    moduleCount: 8,
    audience: "leaders",
    tags: ["Operations", "Management", "Revenue"],
  },
  {
    id: "compliance-essentials",
    title: { en: "Compliance Essentials", es: "Fundamentos de Cumplimiento" },
    subtitle: {
      en: "HIPAA, HRSA, OSHA & billing compliance in one place",
      es: "HIPAA, HRSA, OSHA y cumplimiento de facturación en un solo lugar",
    },
    description: {
      en: "Interactive compliance training with scenario-based exercises, policy templates, and audit-ready checklists. Keep your clinic inspection-ready year-round.",
      es: "Capacitación interactiva de cumplimiento con ejercicios basados en escenarios, plantillas de políticas y listas de verificación listas para auditoría.",
    },
    href: "/strategy/compliance",
    icon: "ShieldCheck",
    color: "amber",
    status: "live",
    timeTrack: "standard",
    estimatedMinutes: 90,
    moduleCount: 3,
    audience: "all",
    tags: ["Compliance", "HIPAA", "HRSA", "OSHA"],
  },
  {
    id: "schedule-planner",
    title: { en: "Schedule Planner", es: "Planificador de Horarios" },
    subtitle: {
      en: "Tetris-style staff scheduling with MA ratio optimization",
      es: "Programación estilo Tetris con optimización de proporción MA",
    },
    description: {
      en: "Visual weekly grid for staff scheduling. Optimize MA:provider ratios, compare shift patterns (4×10, 5×8), track coverage gaps, and export to Excel/PDF.",
      es: "Cuadrícula visual semanal para programación de personal. Optimiza proporciones MA:proveedor, compara patrones de turnos, rastrea brechas de cobertura y exporta a Excel/PDF.",
    },
    href: "/strategy/schedule-planner",
    icon: "CalendarDays",
    color: "indigo",
    status: "live",
    timeTrack: "standard",
    estimatedMinutes: 30,
    moduleCount: 1,
    audience: "leaders",
    tags: ["Scheduling", "Staffing", "Operations"],
  },
  {
    id: "hipaa-essentials",
    title: { en: "HIPAA Essentials", es: "Fundamentos HIPAA" },
    subtitle: {
      en: "Protect patient privacy — the rules every FQHC worker must know",
      es: "Protege la privacidad del paciente — las reglas que todo trabajador de FQHC debe saber",
    },
    description: {
      en: "4 modules covering Privacy Rule, Security Rule, breach response, and daily HIPAA habits with real FQHC scenarios.",
      es: "4 módulos que cubren Regla de Privacidad, Regla de Seguridad, respuesta a violaciones y hábitos HIPAA diarios con escenarios reales de FQHC.",
    },
    href: "/academy/hipaa-essentials",
    icon: "ShieldCheck",
    color: "teal",
    status: "live",
    timeTrack: "standard",
    estimatedMinutes: 30,
    moduleCount: 4,
    audience: "all",
    tags: ["Compliance", "HIPAA", "Privacy", "Security"],
    xpTotal: 160,
  },
  {
    id: "osv-prep",
    title: { en: "HRSA OSV Prep", es: "Preparación OSV HRSA" },
    subtitle: {
      en: "Pass your Operational Site Visit with confidence",
      es: "Pasa tu Visita Operacional del Sitio con confianza",
    },
    description: {
      en: "3 modules covering all 19 HRSA program requirements, the most common deficiencies, and a 90-day prep playbook.",
      es: "3 módulos que cubren los 19 requisitos del programa HRSA, las deficiencias más comunes y un manual de preparación de 90 días.",
    },
    href: "/academy/osv-prep",
    icon: "ClipboardCheck",
    color: "blue",
    status: "live",
    timeTrack: "standard",
    estimatedMinutes: 37,
    moduleCount: 3,
    audience: "leaders",
    tags: ["Compliance", "HRSA", "OSV", "Governance"],
    xpTotal: 160,
  },
  {
    id: "billing-compliance",
    title: { en: "Billing Compliance 101", es: "Cumplimiento de Facturación 101" },
    subtitle: {
      en: "PPS billing rules, documentation, and fraud prevention",
      es: "Reglas de facturación PPS, documentación y prevención de fraude",
    },
    description: {
      en: "3 modules on PPS billing, documentation requirements, the False Claims Act, and audit readiness for FQHCs.",
      es: "3 módulos sobre facturación PPS, requisitos de documentación, la Ley de Reclamaciones Falsas y preparación para auditorías de FQHCs.",
    },
    href: "/academy/billing-compliance",
    icon: "Receipt",
    color: "green",
    status: "live",
    timeTrack: "standard",
    estimatedMinutes: 30,
    moduleCount: 3,
    audience: "leaders",
    tags: ["Compliance", "Billing", "PPS", "False Claims Act"],
    xpTotal: 140,
  },
];

/* ------------------------------------------------------------------ */
/*  Learning Tools (non-course interactive features)                   */
/* ------------------------------------------------------------------ */

export const LEARNING_TOOLS: LearningTool[] = [
  {
    id: "okr-team-sprint",
    title: { en: "Team OKR Sprint", es: "Sprint de OKRs en Equipo" },
    description: {
      en: "4-session async sprint where your executive team builds real OKRs together with AI readiness assessment",
      es: "Sprint asíncrono de 4 sesiones donde tu equipo ejecutivo crea OKRs reales juntos con evaluación de preparación IA",
    },
    href: "/strategy/okr-team-sprint",
    icon: "Target",
    color: "teal",
    audience: "leaders",
  },
  {
    id: "career-assessment",
    title: { en: "Career Assessment", es: "Evaluación de Carrera" },
    description: {
      en: "Discover your ideal FQHC role with our 5-domain skill assessment across 13 career tracks",
      es: "Descubre tu rol FQHC ideal con nuestra evaluación de habilidades en 5 dominios y 13 carreras",
    },
    href: "/career-insights",
    icon: "Compass",
    color: "teal",
    audience: "job-seekers",
  },
  {
    id: "interview-prep",
    title: { en: "Interview Prep", es: "Preparación para Entrevistas" },
    description: {
      en: "Practice with 200+ FQHC-specific interview questions organized by role and category",
      es: "Practica con 200+ preguntas de entrevista específicas para FQHC organizadas por rol y categoría",
    },
    href: "/interview-prep",
    icon: "MessageSquare",
    color: "blue",
    audience: "job-seekers",
  },
  {
    id: "resume-builder",
    title: { en: "Resume Builder", es: "Constructor de CV" },
    description: {
      en: "Build an FQHC-optimized resume with 8 role-specific templates and ATS-friendly formatting",
      es: "Crea un CV optimizado para FQHC con 8 plantillas específicas por rol y formato amigable con ATS",
    },
    href: "/resume-builder",
    icon: "FileText",
    color: "green",
    audience: "job-seekers",
  },
  {
    id: "learning-pathway",
    title: { en: "Learning Pathway", es: "Ruta de Aprendizaje" },
    description: {
      en: "Personalized 25-step learning journey based on your role and experience level",
      es: "Viaje de aprendizaje personalizado de 25 pasos basado en tu rol y nivel de experiencia",
    },
    href: "/pathway",
    icon: "Route",
    color: "violet",
    audience: "all",
  },
  {
    id: "career-roadmap",
    title: { en: "Career Roadmap", es: "Ruta Profesional" },
    description: {
      en: "Visualize FQHC career progression paths with salary ranges and certification requirements",
      es: "Visualiza las rutas de progresión profesional FQHC con rangos salariales y requisitos de certificación",
    },
    href: "/career-roadmap",
    icon: "Map",
    color: "amber",
    audience: "job-seekers",
  },
  {
    id: "certifications",
    title: { en: "Certifications Guide", es: "Guía de Certificaciones" },
    description: {
      en: "Browse 50+ healthcare certifications with costs, timelines, and ROI data",
      es: "Explora 50+ certificaciones de salud con costos, plazos y datos de ROI",
    },
    href: "/certifications",
    icon: "Award",
    color: "rose",
    audience: "job-seekers",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

export const getLiveCourses = () =>
  ACADEMY_COURSES.filter((c) => c.status === "live");

export const getComingSoonCourses = () =>
  ACADEMY_COURSES.filter((c) => c.status === "coming-soon");

export const getCoursesByTimeTrack = (track: TimeTrack) =>
  ACADEMY_COURSES.filter((c) => c.timeTrack === track);

export const getCoursesByAudience = (audience: AudienceType) =>
  ACADEMY_COURSES.filter(
    (c) => c.audience === audience || c.audience === "all",
  );

export const getToolsByAudience = (audience: AudienceType) =>
  LEARNING_TOOLS.filter(
    (t) => t.audience === audience || t.audience === "all",
  );
