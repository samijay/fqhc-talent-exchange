// Central registry for all FQHC role IDs used across the platform
// This is the SINGLE SOURCE OF TRUTH for role definitions
// All other files (certifications, pathways, learning, etc.) should reference these IDs

export interface RoleDefinition {
  id: string;
  label: string;
  esLabel: string;
  category: RoleCategory;
  track?: string; // career pathway track ID
}

export type RoleCategory =
  | "community-health"
  | "clinical"
  | "behavioral-health"
  | "nursing"
  | "operations"
  | "finance"
  | "compliance"
  | "leadership"
  | "dental"
  | "pharmacy";

export const ROLE_REGISTRY: RoleDefinition[] = [
  // Community Health
  { id: "chw", label: "Community Health Worker", esLabel: "Promotor(a) de Salud", category: "community-health", track: "community-health" },
  { id: "care_coordinator", label: "Care Coordinator", esLabel: "Coordinador(a) de Cuidado", category: "community-health", track: "community-health" },
  { id: "case_manager", label: "Case Manager", esLabel: "Gerente de Casos", category: "community-health", track: "community-health" },
  { id: "program-manager", label: "Program Manager", esLabel: "Gerente de Programa", category: "community-health", track: "community-health" },
  { id: "director-community", label: "Director of Community Health", esLabel: "Director(a) de Salud Comunitaria", category: "community-health", track: "community-health" },

  // Clinical Operations
  { id: "medical_assistant", label: "Medical Assistant", esLabel: "Asistente Médico", category: "clinical", track: "clinical-ops" },
  { id: "lead-ma", label: "Lead Medical Assistant", esLabel: "Asistente Médico Líder", category: "clinical", track: "clinical-ops" },
  { id: "clinical-ops-supervisor", label: "Clinical Ops Supervisor", esLabel: "Supervisor(a) de Ops Clínicas", category: "clinical", track: "clinical-ops" },
  { id: "director-clinical-ops", label: "Director of Clinical Operations", esLabel: "Director(a) de Operaciones Clínicas", category: "clinical", track: "clinical-ops" },
  { id: "patient_services", label: "Patient Services Rep", esLabel: "Representante de Servicios al Paciente", category: "operations" },

  // Behavioral Health
  { id: "behavioral_health", label: "BH Specialist", esLabel: "Especialista en Salud Conductual", category: "behavioral-health", track: "behavioral-health" },
  { id: "bh-technician", label: "BH Technician", esLabel: "Técnico(a) de Salud Conductual", category: "behavioral-health", track: "behavioral-health" },
  { id: "licensed-therapist", label: "Licensed Therapist (LCSW/LMFT)", esLabel: "Terapeuta Licenciado(a)", category: "behavioral-health", track: "behavioral-health" },
  { id: "bh-director", label: "BH Director", esLabel: "Director(a) de Salud Conductual", category: "behavioral-health", track: "behavioral-health" },

  // Nursing
  { id: "registered_nurse", label: "Registered Nurse", esLabel: "Enfermero(a) Registrado(a)", category: "nursing", track: "nursing" },
  { id: "charge-nurse", label: "Charge Nurse", esLabel: "Enfermero(a) a Cargo", category: "nursing", track: "nursing" },
  { id: "nurse-manager", label: "Nurse Manager", esLabel: "Gerente de Enfermería", category: "nursing", track: "nursing" },
  { id: "cno", label: "Chief Nursing Officer", esLabel: "Director(a) de Enfermería", category: "nursing", track: "nursing" },

  // Finance & Revenue
  { id: "revenue_cycle", label: "Revenue Cycle Specialist", esLabel: "Especialista en Ciclo de Ingresos", category: "finance", track: "revenue-admin" },
  { id: "revenue-manager", label: "Revenue Cycle Manager", esLabel: "Gerente de Ciclo de Ingresos", category: "finance", track: "revenue-admin" },
  { id: "accountant", label: "Accountant", esLabel: "Contador(a)", category: "finance", track: "revenue-admin" },
  { id: "payroll_specialist", label: "Payroll Specialist", esLabel: "Especialista en Nómina", category: "finance", track: "revenue-admin" },
  { id: "finance_manager", label: "Finance Manager", esLabel: "Gerente de Finanzas", category: "finance", track: "revenue-admin" },
  { id: "director-finance", label: "Finance Director / CFO", esLabel: "Director(a) de Finanzas / CFO", category: "finance", track: "revenue-admin" },

  // Compliance
  { id: "compliance_analyst", label: "Compliance Analyst", esLabel: "Analista de Cumplimiento", category: "compliance" },
  { id: "senior_compliance_analyst", label: "Senior Compliance Analyst", esLabel: "Analista Senior de Cumplimiento", category: "compliance" },
  { id: "compliance_manager", label: "Compliance Manager", esLabel: "Gerente de Cumplimiento", category: "compliance" },
  { id: "compliance_officer", label: "Compliance Officer", esLabel: "Oficial de Cumplimiento", category: "compliance" },
  { id: "chief_compliance", label: "Chief Compliance Officer", esLabel: "Director(a) de Cumplimiento", category: "compliance" },
  { id: "privacy_officer", label: "Privacy Officer", esLabel: "Oficial de Privacidad", category: "compliance" },
  { id: "quality_officer", label: "Quality Officer", esLabel: "Oficial de Calidad", category: "compliance" },

  // Leadership
  { id: "supervisor", label: "Supervisor", esLabel: "Supervisor(a)", category: "leadership" },
  { id: "hr_manager", label: "HR Manager", esLabel: "Gerente de Recursos Humanos", category: "leadership" },
  { id: "safety_officer", label: "Safety Officer", esLabel: "Oficial de Seguridad", category: "operations" },
  { id: "facility_manager", label: "Facility Manager", esLabel: "Gerente de Instalaciones", category: "operations" },
];

// Helper functions
export function getRoleById(id: string): RoleDefinition | undefined {
  return ROLE_REGISTRY.find((r) => r.id === id);
}

export function getRoleLabel(id: string, locale: string = "en"): string {
  const role = getRoleById(id);
  if (!role) return id;
  return locale === "es" ? role.esLabel : role.label;
}

export function getRolesForCategory(category: RoleCategory): RoleDefinition[] {
  return ROLE_REGISTRY.filter((r) => r.category === category);
}

export function getRolesForTrack(trackId: string): RoleDefinition[] {
  return ROLE_REGISTRY.filter((r) => r.track === trackId);
}

export function getAllRoleIds(): string[] {
  return ROLE_REGISTRY.map((r) => r.id);
}
