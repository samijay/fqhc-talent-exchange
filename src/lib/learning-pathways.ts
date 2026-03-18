// learning-pathways.ts — Personalized learning pathway engine
// Select role + experience → get a curated journey through site content
// All text bilingual (EN/ES), deep links to existing pages
// Last updated: 2026-03-06

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ExperienceLevel = "entry" | "early" | "mid" | "senior";

export interface PathwayStep {
  id: string;
  title: { en: string; es: string };
  description: { en: string; es: string };
  type: "assessment" | "guide" | "certification" | "case-study" | "tool" | "masterclass" | "resource";
  href: string;
  estimatedMinutes: number;
}

export interface PathwayPhase {
  id: string;
  title: { en: string; es: string };
  description: { en: string; es: string };
  steps: PathwayStep[];
}

export interface LearningPathway {
  roleId: string;
  roleLabel: { en: string; es: string };
  level: ExperienceLevel;
  levelLabel: { en: string; es: string };
  phases: PathwayPhase[];
  totalSteps: number;
  totalMinutes: number;
}

/* ------------------------------------------------------------------ */
/*  Role definitions (matches career-insights page)                    */
/* ------------------------------------------------------------------ */

export const PATHWAY_ROLES = [
  { id: "chw", en: "Community Health Worker", es: "Promotor(a) de Salud" },
  { id: "care_coordinator", en: "Care Coordinator", es: "Coordinador(a) de Cuidado" },
  { id: "medical_assistant", en: "Medical Assistant", es: "Asistente Médico" },
  { id: "case_manager", en: "Case Manager", es: "Gerente de Casos" },
  { id: "behavioral_health", en: "BH Specialist", es: "Especialista en Salud Conductual" },
  { id: "registered_nurse", en: "Registered Nurse", es: "Enfermero(a) Registrado(a)" },
  { id: "patient_services", en: "Patient Services", es: "Servicios al Paciente" },
  { id: "revenue_cycle", en: "Revenue Cycle", es: "Ciclo de Ingresos" },
  { id: "hr_manager", en: "HR Manager", es: "Gerente de RRHH" },
  { id: "accountant", en: "Accountant", es: "Contador(a)" },
  { id: "payroll_specialist", en: "Payroll Specialist", es: "Especialista en Nómina" },
  { id: "finance_manager", en: "Finance Manager", es: "Gerente de Finanzas" },
  { id: "compliance_analyst", en: "Compliance Analyst", es: "Analista de Cumplimiento" },
  { id: "compliance_officer", en: "Compliance Officer", es: "Oficial de Cumplimiento" },
] as const;

export const EXPERIENCE_LEVELS: {
  id: ExperienceLevel;
  en: string;
  es: string;
  years: string;
}[] = [
  { id: "entry", en: "Entry Level", es: "Nivel Inicial", years: "0-1 yr" },
  { id: "early", en: "Early Career", es: "Carrera Temprana", years: "1-3 yrs" },
  { id: "mid", en: "Mid Career", es: "Media Carrera", years: "3-7 yrs" },
  { id: "senior", en: "Senior / Leadership", es: "Senior / Liderazgo", years: "7+ yrs" },
];

/* ------------------------------------------------------------------ */
/*  Role → track mapping                                               */
/* ------------------------------------------------------------------ */

type TrackId = "community-health" | "clinical-operations" | "behavioral-health" | "revenue-admin" | "back-office" | "nursing" | "compliance-operations";

const ROLE_TO_TRACK: Record<string, TrackId> = {
  chw: "community-health",
  care_coordinator: "community-health",
  case_manager: "community-health",
  medical_assistant: "clinical-operations",
  registered_nurse: "nursing",
  behavioral_health: "behavioral-health",
  patient_services: "revenue-admin",
  revenue_cycle: "revenue-admin",
  hr_manager: "back-office",
  accountant: "back-office",
  payroll_specialist: "back-office",
  finance_manager: "back-office",
  compliance_analyst: "compliance-operations",
  compliance_officer: "compliance-operations",
};

/* ------------------------------------------------------------------ */
/*  Content steps library — reusable across pathways                   */
/* ------------------------------------------------------------------ */

const SHARED_STEPS = {
  // Assessments
  careerAssessment: {
    id: "career-assessment",
    title: { en: "Career Assessment", es: "Evaluación de Carrera" },
    description: { en: "5-domain behavioral assessment with role-specific scenarios. Get your strengths, growth areas, and employer insights.", es: "Evaluación conductual de 5 dominios con escenarios por rol. Obtén tus fortalezas, áreas de crecimiento y perspectivas de empleadores." },
    type: "assessment" as const,
    href: "/career-insights",
    estimatedMinutes: 20,
  },
  careerRoadmap: {
    id: "career-roadmap",
    title: { en: "Career Roadmap", es: "Hoja de Ruta Profesional" },
    description: { en: "Explore your career track with 4 levels, CA salary data, and required certifications at each stage.", es: "Explora tu trayectoria profesional con 4 niveles, datos salariales de CA y certificaciones requeridas en cada etapa." },
    type: "tool" as const,
    href: "/career-roadmap",
    estimatedMinutes: 15,
  },
  resumeBuilder: {
    id: "resume-builder",
    title: { en: "Resume Builder", es: "Constructor de Currículum" },
    description: { en: "Build an FQHC-optimized resume using role-specific templates. Highlights FQHC programs, EHR experience, and bilingual skills.", es: "Construye un currículum optimizado para FQHC usando plantillas por rol. Destaca programas FQHC, experiencia EHR y habilidades bilingües." },
    type: "tool" as const,
    href: "/resume-builder",
    estimatedMinutes: 30,
  },
  browseJobs: {
    id: "browse-jobs",
    title: { en: "Browse FQHC Jobs", es: "Explorar Empleos FQHC" },
    description: { en: "Search 177+ job listings across California's FQHCs. Filter by role, region, salary, and program.", es: "Busca 177+ ofertas de trabajo en FQHCs de California. Filtra por rol, región, salario y programa." },
    type: "tool" as const,
    href: "/jobs",
    estimatedMinutes: 15,
  },
  fqhcDirectory: {
    id: "fqhc-directory",
    title: { en: "FQHC Directory", es: "Directorio de FQHCs" },
    description: { en: "Explore 220 California FQHCs with Glassdoor ratings, programs, resilience scores, and salary data.", es: "Explora 220 FQHCs de California con calificaciones Glassdoor, programas, puntajes de resiliencia y datos salariales." },
    type: "tool" as const,
    href: "/directory",
    estimatedMinutes: 15,
  },
  compareFqhcs: {
    id: "compare-fqhcs",
    title: { en: "Compare FQHCs", es: "Comparar FQHCs" },
    description: { en: "Side-by-side comparison of 2-3 FQHCs: programs, resilience, Glassdoor, salary, certifications.", es: "Comparación lado a lado de 2-3 FQHCs: programas, resiliencia, Glassdoor, salario, certificaciones." },
    type: "tool" as const,
    href: "/compare",
    estimatedMinutes: 10,
  },
  salaryIntel: {
    id: "salary-intel",
    title: { en: "Salary Intelligence", es: "Inteligencia Salarial" },
    description: { en: "30 roles × 9 CA regions with P25/P50/P75 salary benchmarks and regional multipliers.", es: "30 roles × 9 regiones de CA con benchmarks salariales P25/P50/P75 y multiplicadores regionales." },
    type: "tool" as const,
    href: "/salary-data",
    estimatedMinutes: 10,
  },

  // Guides
  fqhcRevenue101: {
    id: "fqhc-revenue-101",
    title: { en: "FQHC Revenue 101", es: "Ingresos de FQHC 101" },
    description: { en: "Understand PPS, 340B, grants, and how FQHCs actually make money. Essential for every role.", es: "Entiende PPS, 340B, subvenciones y cómo los FQHCs realmente generan ingresos. Esencial para todo rol." },
    type: "guide" as const,
    href: "/guides",
    estimatedMinutes: 20,
  },
  sameDayBilling: {
    id: "same-day-billing",
    title: { en: "Same-Day Billing: Medi-Cal Rules", es: "Facturación Mismo Día: Reglas de Medi-Cal" },
    description: { en: "What's actually billable under Medi-Cal vs Medicare. Critical knowledge for revenue-impacting roles.", es: "Qué es realmente facturable bajo Medi-Cal vs Medicare. Conocimiento crítico para roles que impactan ingresos." },
    type: "guide" as const,
    href: "/guides",
    estimatedMinutes: 25,
  },
  ecmWorkflows: {
    id: "ecm-workflows",
    title: { en: "ECM Workflows", es: "Flujos de Trabajo ECM" },
    description: { en: "Enhanced Care Management step-by-step: enrollment, care plans, billing, and documentation.", es: "Manejo de Atención Mejorada paso a paso: inscripción, planes de atención, facturación y documentación." },
    type: "guide" as const,
    href: "/guides",
    estimatedMinutes: 25,
  },
  calaimOverview: {
    id: "calaim-overview",
    title: { en: "CalAIM Overview", es: "Resumen de CalAIM" },
    description: { en: "California's Medi-Cal transformation: ECM, Community Supports, population health management.", es: "Transformación de Medi-Cal en California: ECM, Apoyos Comunitarios, manejo de salud poblacional." },
    type: "guide" as const,
    href: "/guides",
    estimatedMinutes: 20,
  },

  // Strategy
  executiveGuides: {
    id: "executive-guides",
    title: { en: "Executive Case Studies", es: "Casos de Estudio Ejecutivos" },
    description: { en: "26 real FQHC case studies with Rumelt strategic framework. Learn how successful FQHCs solved problems.", es: "26 casos de estudio reales de FQHC con marco estratégico de Rumelt. Aprende cómo FQHCs exitosos resolvieron problemas." },
    type: "case-study" as const,
    href: "/strategy/guides",
    estimatedMinutes: 30,
  },
  okrTemplates: {
    id: "okr-templates",
    title: { en: "OKR Templates", es: "Plantillas OKR" },
    description: { en: "12 ready-to-use OKR templates for FQHC change management across 5 domains.", es: "12 plantillas OKR listas para usar en gestión del cambio de FQHC en 5 dominios." },
    type: "tool" as const,
    href: "/strategy/okrs",
    estimatedMinutes: 20,
  },
  masterclassFinancial: {
    id: "masterclass-financial",
    title: { en: "Masterclass: Financial Survival", es: "Masterclass: Supervivencia Financiera" },
    description: { en: "Deep-dive modules on FQHC financial resilience, 340B optimization, and creative financing strategies.", es: "Módulos profundos sobre resiliencia financiera FQHC, optimización 340B y estrategias de financiamiento creativo." },
    type: "masterclass" as const,
    href: "/strategy/masterclass",
    estimatedMinutes: 45,
  },
  masterclassLeadership: {
    id: "masterclass-leadership",
    title: { en: "Masterclass: Leadership", es: "Masterclass: Liderazgo" },
    description: { en: "FQHC retention, workforce resilience, and leading through crisis — for managers and directors.", es: "Retención FQHC, resiliencia de la fuerza laboral y liderazgo durante crisis — para gerentes y directores." },
    type: "masterclass" as const,
    href: "/strategy/masterclass",
    estimatedMinutes: 45,
  },
  clinicSimulator: {
    id: "clinic-simulator",
    title: { en: "Clinic Operations Simulator", es: "Simulador de Operaciones Clínicas" },
    description: { en: "Model staffing, revenue, and optimization pathways for your FQHC. Medi-Cal billing aligned.", es: "Modele dotación de personal, ingresos y vías de optimización para su FQHC. Alineado con Medi-Cal." },
    type: "tool" as const,
    href: "/strategy/clinic-simulator",
    estimatedMinutes: 20,
  },
  teamReadiness: {
    id: "team-readiness",
    title: { en: "Team Readiness Assessment", es: "Evaluación de Preparación del Equipo" },
    description: { en: "Manager leadership assessment: 5 domains, STARS framework, Liberating Structures.", es: "Evaluación de liderazgo para gerentes: 5 dominios, marco STARS, Estructuras Liberadoras." },
    type: "assessment" as const,
    href: "/team-readiness",
    estimatedMinutes: 25,
  },
  scopeOfPractice: {
    id: "scope-of-practice",
    title: { en: "Scope of Practice by Role", es: "Alcance de Práctica por Rol" },
    description: { en: "CA delegation matrix: who can do what, supervision chains, and revenue impact by role.", es: "Matriz de delegación CA: quién puede hacer qué, cadenas de supervisión e impacto en ingresos por rol." },
    type: "guide" as const,
    href: "/strategy/scope-of-practice",
    estimatedMinutes: 20,
  },

  // Resources
  certifications: {
    id: "certifications",
    title: { en: "CA Certifications Catalog", es: "Catálogo de Certificaciones CA" },
    description: { en: "20 California-specific certifications with cost, duration, salary impact, and where to get them.", es: "20 certificaciones específicas de California con costo, duración, impacto salarial y dónde obtenerlas." },
    type: "certification" as const,
    href: "/certifications",
    estimatedMinutes: 15,
  },
  careerResources: {
    id: "career-resources",
    title: { en: "Career Resources", es: "Recursos de Carrera" },
    description: { en: "18 free/low-cost programs: loan repayment, free training, professional development.", es: "18 programas gratuitos/bajo costo: pago de préstamos, capacitación gratuita, desarrollo profesional." },
    type: "resource" as const,
    href: "/resources",
    estimatedMinutes: 15,
  },
  fundingImpact: {
    id: "funding-impact",
    title: { en: "Funding Impact Tracker", es: "Rastreador de Impacto de Financiamiento" },
    description: { en: "H.R. 1 policy timeline, revenue strategies, and enrollment strategies for the 2026 crisis.", es: "Línea de tiempo H.R. 1, estrategias de ingresos y estrategias de inscripción para la crisis de 2026." },
    type: "guide" as const,
    href: "/funding-impact",
    estimatedMinutes: 20,
  },
  resilienceScorecard: {
    id: "resilience-scorecard",
    title: { en: "Resilience Scorecard", es: "Tarjeta de Resiliencia" },
    description: { en: "220 FQHCs scored across 5 dimensions. Find the most resilient employers.", es: "220 FQHCs puntuados en 5 dimensiones. Encuentra los empleadores más resilientes." },
    type: "tool" as const,
    href: "/strategy/resilience",
    estimatedMinutes: 10,
  },

  // Compliance
  hipaaBasics: {
    id: "hipaa-basics",
    title: { en: "HIPAA Privacy & Security Essentials", es: "Esenciales de Privacidad y Seguridad HIPAA" },
    description: { en: "Every FQHC employee handles PHI. Understand breach response, patient rights, and your obligations under 45 CFR 164.", es: "Todo empleado de FQHC maneja PHI. Comprende la respuesta a violaciones, derechos del paciente y tus obligaciones bajo 45 CFR 164." },
    type: "guide" as const,
    href: "/compliance/hipaa",
    estimatedMinutes: 20,
  },
  osvComplianceGuide: {
    id: "osv-compliance-guide",
    title: { en: "HRSA OSV Compliance Guide", es: "Guía de Cumplimiento de OSV de HRSA" },
    description: { en: "19-requirement preparation for your next operational site visit. CFR citations, evidence checklists, and common failures.", es: "Preparación de 19 requisitos para tu próxima visita operativa. Citas CFR, listas de evidencia y fallas comunes." },
    type: "guide" as const,
    href: "/compliance/hrsa-audits",
    estimatedMinutes: 30,
  },
  billingComplianceGuide: {
    id: "billing-compliance-guide",
    title: { en: "Billing Compliance & False Claims Prevention", es: "Cumplimiento de Facturación y Prevención de Reclamaciones Falsas" },
    description: { en: "PPS billing rules, same-day encounter documentation, ECM/CCM coding standards, and OIG audit triggers.", es: "Reglas de facturación PPS, documentación de encuentros del mismo día, estándares de codificación ECM/CCM y disparadores de auditoría OIG." },
    type: "guide" as const,
    href: "/compliance/billing",
    estimatedMinutes: 25,
  },
  complianceMasterclass: {
    id: "compliance-masterclass",
    title: { en: "Masterclass: Risk & Compliance", es: "Masterclass: Riesgo y Cumplimiento" },
    description: { en: "4 deep-dive modules: HIPAA at scale, OSV survival, billing compliance, and 340B audit prevention.", es: "4 módulos profundos: HIPAA a escala, supervivencia OSV, cumplimiento de facturación y prevención de auditoría 340B." },
    type: "masterclass" as const,
    href: "/strategy/masterclass",
    estimatedMinutes: 60,
  },
  complianceCalendar: {
    id: "compliance-calendar",
    title: { en: "Compliance Calendar", es: "Calendario de Cumplimiento" },
    description: { en: "18 real FQHC compliance deadlines across HRSA, HIPAA, and billing domains. Never miss a filing deadline.", es: "18 plazos reales de cumplimiento FQHC. Nunca pierdas un plazo de presentación." },
    type: "tool" as const,
    href: "/compliance/calendar",
    estimatedMinutes: 10,
  },
};

/* ------------------------------------------------------------------ */
/*  Phase builders by experience level                                 */
/* ------------------------------------------------------------------ */

function buildFoundationPhase(roleId: string, level: ExperienceLevel): PathwayPhase {
  const steps: PathwayStep[] = [SHARED_STEPS.careerAssessment, SHARED_STEPS.careerRoadmap];

  // Entry and early always get FQHC Revenue 101
  if (level === "entry" || level === "early") {
    steps.push(SHARED_STEPS.fqhcRevenue101);
  }

  // HIPAA basics for all — every FQHC employee handles PHI
  if (level === "entry" || level === "early") {
    steps.push(SHARED_STEPS.hipaaBasics);
  }

  // CalAIM for community health / BH roles
  const track = ROLE_TO_TRACK[roleId];
  if (track === "community-health" || track === "behavioral-health") {
    steps.push(SHARED_STEPS.calaimOverview);
  }

  return {
    id: "foundation",
    title: { en: "Phase 1: Foundation", es: "Fase 1: Fundación" },
    description: {
      en: "Understand your strengths, see your career path, and learn how FQHCs work.",
      es: "Entiende tus fortalezas, mira tu trayectoria profesional y aprende cómo funcionan los FQHCs.",
    },
    steps,
  };
}

function buildCredentialsPhase(roleId: string, level: ExperienceLevel): PathwayPhase {
  const steps: PathwayStep[] = [SHARED_STEPS.certifications];

  // Entry/early get career resources for free training programs
  if (level === "entry" || level === "early") {
    steps.push(SHARED_STEPS.careerResources);
  }

  // Clinical/BH roles always get scope of practice
  const track = ROLE_TO_TRACK[roleId];
  if (track === "nursing" || track === "clinical-operations" || track === "behavioral-health" || track === "community-health") {
    steps.push(SHARED_STEPS.scopeOfPractice);
  }

  // OSV awareness for mid+ roles; billing compliance for revenue/finance roles
  if (level === "mid" || level === "senior") {
    steps.push(SHARED_STEPS.osvComplianceGuide);
  }
  if (track === "revenue-admin" || track === "back-office") {
    steps.push(SHARED_STEPS.billingComplianceGuide);
  }

  return {
    id: "credentials",
    title: { en: "Phase 2: Credentials & Compliance", es: "Fase 2: Credenciales y Cumplimiento" },
    description: {
      en: "Get certified, understand your scope, and find free training programs.",
      es: "Certifícate, entiende tu alcance y encuentra programas de capacitación gratuitos.",
    },
    steps,
  };
}

function buildExpertisePhase(roleId: string): PathwayPhase {
  const steps: PathwayStep[] = [];
  const track = ROLE_TO_TRACK[roleId];

  // Role-specific guides
  if (track === "community-health" || track === "behavioral-health") {
    steps.push(SHARED_STEPS.ecmWorkflows);
  }
  if (track === "revenue-admin" || track === "back-office") {
    steps.push(SHARED_STEPS.sameDayBilling);
    steps.push(SHARED_STEPS.fqhcRevenue101);
  }
  if (track === "nursing" || track === "clinical-operations") {
    steps.push(SHARED_STEPS.sameDayBilling);
  }

  // Case studies for all mid+ roles
  steps.push(SHARED_STEPS.executiveGuides);

  // Resume builder
  steps.push(SHARED_STEPS.resumeBuilder);

  return {
    id: "expertise",
    title: { en: "Phase 3: Expertise", es: "Fase 3: Experiencia" },
    description: {
      en: "Deepen your FQHC knowledge with role-specific guides, case studies, and build your resume.",
      es: "Profundiza tu conocimiento FQHC con guías por rol, casos de estudio y construye tu currículum.",
    },
    steps,
  };
}

function buildAdvancePhase(roleId: string, level: ExperienceLevel): PathwayPhase {
  const steps: PathwayStep[] = [];
  const track = ROLE_TO_TRACK[roleId];

  // Masterclasses for mid+
  if (track === "revenue-admin" || track === "back-office") {
    steps.push(SHARED_STEPS.masterclassFinancial);
  } else {
    steps.push(SHARED_STEPS.masterclassLeadership);
  }

  // OKRs for mid+
  steps.push(SHARED_STEPS.okrTemplates);

  // Team readiness for senior
  if (level === "senior") {
    steps.push(SHARED_STEPS.teamReadiness);
  }

  // Clinic simulator for revenue/ops/leadership
  if (track === "revenue-admin" || track === "back-office" || track === "clinical-operations" || track === "nursing") {
    steps.push(SHARED_STEPS.clinicSimulator);
  }

  // Compliance masterclass + calendar for mid+ and revenue/finance roles
  if (level === "mid" || level === "senior") {
    steps.push(SHARED_STEPS.complianceMasterclass);
    steps.push(SHARED_STEPS.complianceCalendar);
  }

  // Funding impact for all
  steps.push(SHARED_STEPS.fundingImpact);

  return {
    id: "advance",
    title: { en: "Phase 4: Advance & Lead", es: "Fase 4: Avanzar y Liderar" },
    description: {
      en: "Masterclasses, strategic tools, and leadership frameworks for your next career stage.",
      es: "Masterclasses, herramientas estratégicas y marcos de liderazgo para tu próxima etapa profesional.",
    },
    steps,
  };
}

function buildJobSearchPhase(): PathwayPhase {
  return {
    id: "job-search",
    title: { en: "Phase 5: Find Your FQHC", es: "Fase 5: Encuentra Tu FQHC" },
    description: {
      en: "Research employers, compare options, and find the right FQHC fit.",
      es: "Investiga empleadores, compara opciones y encuentra el FQHC adecuado.",
    },
    steps: [
      SHARED_STEPS.salaryIntel,
      SHARED_STEPS.resilienceScorecard,
      SHARED_STEPS.fqhcDirectory,
      SHARED_STEPS.compareFqhcs,
      SHARED_STEPS.browseJobs,
    ],
  };
}

/* ------------------------------------------------------------------ */
/*  Main generator                                                     */
/* ------------------------------------------------------------------ */

export function generateLearningPathway(
  roleId: string,
  level: ExperienceLevel
): LearningPathway {
  const role = PATHWAY_ROLES.find((r) => r.id === roleId) ?? PATHWAY_ROLES[0];
  const levelMeta = EXPERIENCE_LEVELS.find((l) => l.id === level) ?? EXPERIENCE_LEVELS[0];

  const phases: PathwayPhase[] = [];

  // Phase 1: Foundation (all levels)
  phases.push(buildFoundationPhase(roleId, level));

  // Phase 2: Credentials (all levels)
  phases.push(buildCredentialsPhase(roleId, level));

  // Phase 3: Expertise (early, mid, senior)
  if (level !== "entry") {
    phases.push(buildExpertisePhase(roleId));
  }

  // Phase 4: Advance (mid, senior)
  if (level === "mid" || level === "senior") {
    phases.push(buildAdvancePhase(roleId, level));
  }

  // Phase 5: Job Search (all levels)
  phases.push(buildJobSearchPhase());

  // Calculate totals
  const totalSteps = phases.reduce((sum, p) => sum + p.steps.length, 0);
  const totalMinutes = phases.reduce(
    (sum, p) => sum + p.steps.reduce((s, step) => s + step.estimatedMinutes, 0),
    0
  );

  return {
    roleId,
    roleLabel: { en: role.en, es: role.es },
    level,
    levelLabel: { en: levelMeta.en, es: levelMeta.es },
    phases,
    totalSteps,
    totalMinutes,
  };
}

export const LEARNING_PATHWAYS_LAST_UPDATED = "2026-03-06";
