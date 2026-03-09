// okr-team-sprint-engine.ts
// Team OKR Sprint structure, validation, and session templates
// Used by the team sprint components and Supabase integration
// Last updated: 2026-03-09

import type { OKRDomain } from "./fqhc-okr-templates";

/* ------------------------------------------------------------------ */
/*  Core Types                                                         */
/* ------------------------------------------------------------------ */

export type SprintStatus = "planning" | "active" | "reviewing" | "completed";
export type SessionType = "alignment" | "drafting" | "workshop" | "readiness";
export type MemberRole = "admin" | "member";
export type DraftStatus = "draft" | "submitted" | "reviewed" | "finalized";

export interface SprintMember {
  userId: string;
  email: string;
  name: string;
  role: MemberRole;
  joinedAt: string;
  lastActiveAt: string;
}

export interface TeamSprint {
  id: string;
  name: string;
  description: string;
  adminId: string;
  status: SprintStatus;
  inviteCode: string;
  startDate: string;
  endDate: string;
  members: SprintMember[];
  currentSessionIndex: number; // 0-3
  createdAt: string;
}

export interface SprintSession {
  id: string;
  sprintId: string;
  sessionNumber: number; // 1-4
  sessionType: SessionType;
  title: { en: string; es: string };
  description: { en: string; es: string };
  estimatedMinutes: number;
  startedAt: string | null;
  completedAt: string | null;
  data: Record<string, unknown>; // session-specific state
}

export interface DraftObjective {
  id: string;
  sprintId: string;
  ownerId: string;
  ownerName: string;
  domain: OKRDomain;
  objectiveText: string;
  objectiveTextEs?: string;
  status: DraftStatus;
  feedback: ObjectiveFeedback[];
  keyResults: DraftKeyResult[];
  createdAt: string;
  updatedAt: string;
}

export interface DraftKeyResult {
  id: string;
  objectiveId: string;
  text: string;
  textEs?: string;
  metric?: string;
  baseline?: string;
  target?: string;
  measurabilityScore: number; // 0-100
  ambitionScore: number; // 0-100
  comments: KRComment[];
  createdAt: string;
}

export interface ObjectiveFeedback {
  authorId: string;
  authorName: string;
  comment: string;
  createdAt: string;
}

export interface KRComment {
  authorId: string;
  authorName: string;
  comment: string;
  createdAt: string;
}

/* ------------------------------------------------------------------ */
/*  Session Templates                                                  */
/* ------------------------------------------------------------------ */

export const SPRINT_SESSION_TEMPLATES: Omit<
  SprintSession,
  "id" | "sprintId" | "startedAt" | "completedAt" | "data"
>[] = [
  {
    sessionNumber: 1,
    sessionType: "alignment",
    title: {
      en: "Team Alignment",
      es: "Alineación del Equipo",
    },
    description: {
      en: "Review your organization's mission and vote on the top strategic priorities for this quarter. Everyone votes — the team's collective priorities drive the OKRs.",
      es: "Revisa la misión de tu organización y vota por las principales prioridades estratégicas para este trimestre. Todos votan — las prioridades colectivas del equipo impulsan los OKRs.",
    },
    estimatedMinutes: 20,
  },
  {
    sessionNumber: 2,
    sessionType: "drafting",
    title: {
      en: "Objective Drafting",
      es: "Redacción de Objetivos",
    },
    description: {
      en: "Each team member drafts objectives for their area of responsibility. Use the strategic priorities from Session 1 as your guide. Others can view and comment on drafts.",
      es: "Cada miembro del equipo redacta objetivos para su área de responsabilidad. Usa las prioridades estratégicas de la Sesión 1 como guía. Otros pueden ver y comentar los borradores.",
    },
    estimatedMinutes: 30,
  },
  {
    sessionNumber: 3,
    sessionType: "workshop",
    title: {
      en: "Key Results Workshop",
      es: "Taller de Resultados Clave",
    },
    description: {
      en: "Add measurable Key Results to each objective. Use the built-in SMART checklist and measurability scorer to validate quality. Review and improve each other's KRs.",
      es: "Agrega Resultados Clave medibles a cada objetivo. Usa la lista de verificación SMART y el evaluador de medibilidad integrados para validar calidad. Revisa y mejora los RCs de los demás.",
    },
    estimatedMinutes: 35,
  },
  {
    sessionNumber: 4,
    sessionType: "readiness",
    title: {
      en: "Readiness Review",
      es: "Revisión de Preparación",
    },
    description: {
      en: "Review the full team OKR set. Our AI coach assesses alignment, coverage, and quality — then provides specific recommendations. Export your finalized OKRs as DOCX or Excel.",
      es: "Revisa el conjunto completo de OKRs del equipo. Nuestro coach de IA evalúa alineación, cobertura y calidad — luego proporciona recomendaciones específicas. Exporta tus OKRs finalizados como DOCX o Excel.",
    },
    estimatedMinutes: 25,
  },
];

/* ------------------------------------------------------------------ */
/*  FQHC Strategic Priorities (for Session 1 voting)                   */
/* ------------------------------------------------------------------ */

export interface StrategicPriority {
  id: string;
  domain: OKRDomain;
  title: { en: string; es: string };
  description: { en: string; es: string };
}

export const FQHC_STRATEGIC_PRIORITIES: StrategicPriority[] = [
  {
    id: "sp-revenue-diversify",
    domain: "revenue-resilience",
    title: {
      en: "Diversify Revenue Beyond Federal Grants",
      es: "Diversificar Ingresos Más Allá de Subvenciones Federales",
    },
    description: {
      en: "Reduce dependency on any single funding source to below 35% of total revenue",
      es: "Reducir dependencia de cualquier fuente única de financiamiento a menos del 35% del ingreso total",
    },
  },
  {
    id: "sp-340b-optimize",
    domain: "revenue-resilience",
    title: {
      en: "Optimize 340B Program Revenue",
      es: "Optimizar Ingresos del Programa 340B",
    },
    description: {
      en: "Maximize 340B savings through contract pharmacy partnerships and compliance",
      es: "Maximizar ahorros 340B a través de asociaciones de farmacia de contrato y cumplimiento",
    },
  },
  {
    id: "sp-provider-retention",
    domain: "workforce-retention",
    title: {
      en: "Stop the Provider Exodus",
      es: "Detener el Éxodo de Proveedores",
    },
    description: {
      en: "Reduce provider turnover rate and address root causes of burnout",
      es: "Reducir tasa de rotación de proveedores y abordar causas raíz del agotamiento",
    },
  },
  {
    id: "sp-bilingual-workforce",
    domain: "workforce-retention",
    title: {
      en: "Build a Bilingual Workforce Pipeline",
      es: "Construir un Pipeline de Fuerza Laboral Bilingüe",
    },
    description: {
      en: "Recruit and retain bilingual clinical and support staff to match patient demographics",
      es: "Reclutar y retener personal clínico y de apoyo bilingüe para coincidir con demografía de pacientes",
    },
  },
  {
    id: "sp-same-day-access",
    domain: "patient-access",
    title: {
      en: "Guarantee Same-Day Access",
      es: "Garantizar Acceso el Mismo Día",
    },
    description: {
      en: "Ensure every patient can be seen within 24 hours of requesting an appointment",
      es: "Asegurar que cada paciente pueda ser atendido dentro de 24 horas de solicitar una cita",
    },
  },
  {
    id: "sp-telehealth-expand",
    domain: "patient-access",
    title: {
      en: "Expand Telehealth to Hard-to-Reach Communities",
      es: "Expandir Telesalud a Comunidades Difíciles de Alcanzar",
    },
    description: {
      en: "Use virtual care to reach patients who face transportation or work schedule barriers",
      es: "Usar cuidado virtual para alcanzar pacientes que enfrentan barreras de transporte o horario laboral",
    },
  },
  {
    id: "sp-data-driven-ops",
    domain: "operational-efficiency",
    title: {
      en: "Make Every Decision Data-Driven",
      es: "Hacer Cada Decisión Basada en Datos",
    },
    description: {
      en: "Build dashboards and workflows so leaders see real-time operational data daily",
      es: "Construir tableros y flujos para que líderes vean datos operativos en tiempo real diariamente",
    },
  },
  {
    id: "sp-reduce-ar",
    domain: "operational-efficiency",
    title: {
      en: "Slash Accounts Receivable Cycle Time",
      es: "Reducir Tiempo del Ciclo de Cuentas por Cobrar",
    },
    description: {
      en: "Reduce days in AR to improve cash flow and financial stability",
      es: "Reducir días en cuentas por cobrar para mejorar flujo de caja y estabilidad financiera",
    },
  },
  {
    id: "sp-integrated-care",
    domain: "cross-department",
    title: {
      en: "Integrate Behavioral Health into Primary Care",
      es: "Integrar Salud Conductual en Atención Primaria",
    },
    description: {
      en: "Break the silo between medical and behavioral health with warm handoffs and shared workflows",
      es: "Romper el silo entre salud médica y conductual con transferencias cálidas y flujos compartidos",
    },
  },
  {
    id: "sp-community-partnerships",
    domain: "cross-department",
    title: {
      en: "Build Community Safety Net Partnerships",
      es: "Construir Alianzas de Red de Seguridad Comunitaria",
    },
    description: {
      en: "Partner with housing, food, and social service organizations for whole-person care",
      es: "Asociarse con organizaciones de vivienda, alimentación y servicios sociales para cuidado integral",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Validation Functions                                               */
/* ------------------------------------------------------------------ */

/** Check if a Key Result is measurable (has baseline + target numbers) */
export function scoreMeasurability(krText: string): number {
  let score = 0;
  if (/\d/.test(krText)) score += 30; // has any number
  if (/from\s+[\d$%]/i.test(krText)) score += 25; // has baseline
  if (/to\s+[\d$%]/i.test(krText)) score += 25; // has target
  if (/by\s+(Q[1-4]|q[1-4]|20\d\d|end\s+of)/i.test(krText)) score += 20; // has deadline
  return Math.min(100, score);
}

/** Score ambition level of an objective */
export function scoreAmbition(objectiveText: string): number {
  const lower = objectiveText.toLowerCase();
  let score = 50; // base

  // Strong verbs boost
  const strongVerbs = [
    "transform",
    "eliminate",
    "revolutionize",
    "build",
    "create",
    "become",
    "establish",
    "guarantee",
  ];
  if (strongVerbs.some((v) => lower.includes(v))) score += 25;

  // Weak verbs reduce
  const weakVerbs = ["improve", "work on", "try to", "maintain"];
  if (weakVerbs.some((v) => lower.startsWith(v))) score -= 20;

  // Numbers in objectives penalize (they belong in KRs)
  if (/\d/.test(objectiveText)) score -= 15;

  return Math.max(0, Math.min(100, score));
}

/** Validate overall OKR quality */
export function validateOKRQuality(objective: DraftObjective): {
  isReady: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  if (objective.objectiveText.length < 10) {
    issues.push("Objective is too short — be more descriptive.");
  }
  if (/\d/.test(objective.objectiveText)) {
    issues.push(
      "Objective contains numbers — move metrics to Key Results."
    );
  }
  if (objective.keyResults.length < 2) {
    issues.push("Add at least 2 Key Results to measure progress.");
  }
  if (objective.keyResults.length > 5) {
    issues.push("Too many Key Results — focus on 2-4 per objective.");
  }

  for (const kr of objective.keyResults) {
    if (kr.measurabilityScore < 50) {
      issues.push(
        `Key Result "${kr.text.slice(0, 40)}..." needs more specific metrics.`
      );
    }
  }

  return {
    isReady: issues.length === 0,
    issues,
  };
}

/** Calculate team alignment score across all objectives */
export function calculateAlignmentScore(
  objectives: DraftObjective[]
): number {
  if (objectives.length === 0) return 0;

  // Check domain coverage
  const domains = new Set(objectives.map((o) => o.domain));
  const coverageBonus = Math.min(30, domains.size * 7);

  // Check if team has 3-5 objectives (ideal range)
  const countScore =
    objectives.length >= 3 && objectives.length <= 5
      ? 30
      : objectives.length >= 2 && objectives.length <= 7
        ? 20
        : 10;

  // Check KR quality average
  const allKRs = objectives.flatMap((o) => o.keyResults);
  const avgMeasurability =
    allKRs.length > 0
      ? allKRs.reduce((sum, kr) => sum + kr.measurabilityScore, 0) /
        allKRs.length
      : 0;
  const qualityScore = Math.round(avgMeasurability * 0.4); // max 40

  return Math.min(100, coverageBonus + countScore + qualityScore);
}

/* ------------------------------------------------------------------ */
/*  Invite Code Generation                                             */
/* ------------------------------------------------------------------ */

/** Generate a random 6-character invite code */
export function generateInviteCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no ambiguous chars
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
