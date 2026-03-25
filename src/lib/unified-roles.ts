/* ------------------------------------------------------------------ */
/*  Unified Role Taxonomy                                             */
/*  Single canonical role list used across all learning pages          */
/*  Maps to: career-pathways, interview-prep, certifications,          */
/*  role-insights, career-assessment, and learning-pathway             */
/* ------------------------------------------------------------------ */

export type RoleId =
  | "chw"
  | "care-coordinator"
  | "case-manager"
  | "health-navigator"
  | "patient-services"
  | "medical-assistant"
  | "lead-ma"
  | "lvn"
  | "registered-nurse"
  | "charge-nurse"
  | "nurse-manager"
  | "bh-technician"
  | "behavioral-health-specialist"
  | "psychiatric-np"
  | "licensed-therapist"
  | "np"
  | "pa"
  | "physician"
  | "dentist"
  | "dental-hygienist"
  | "dental-assistant"
  | "pharmacist"
  | "pharmacy-technician"
  | "revenue-cycle"
  | "revenue-manager"
  | "compliance-analyst"
  | "compliance-officer"
  | "accountant"
  | "payroll-specialist"
  | "finance-manager"
  | "hr-manager"
  | "program-manager"
  | "clinical-ops-supervisor"
  | "director-clinical-ops"
  | "bh-director"
  | "director-community"
  | "director-finance"
  | "cno"
  | "ceo";

export type Department =
  | "clinical"
  | "behavioral-health"
  | "dental"
  | "pharmacy"
  | "admin"
  | "finance"
  | "leadership";

export type EducationLevel = "foundational" | "intermediate" | "advanced";

export interface UnifiedRole {
  id: RoleId;
  label: {
    en: string;
    es: string;
  };
  department: Department;
  educationLevel: EducationLevel;
  /** Maps to career-pathways.ts track/role */
  careerTrack?: string;
  careerTrackRole?: string;
  /** Maps to interview-prep questions/guides */
  interviewPrepRole?: string;
  /** Maps to certification-data.ts applicableRoles */
  certificationRoles?: string[];
  /** Maps to role-insights.ts keys */
  roleInsightsKey?: string;
  /** Maps to career-assessment-engine.ts */
  assessmentRole?: string;
}

/**
 * UNIFIED_ROLES — Single source of truth for all roles across the platform
 *
 * Education Level Definitions:
 * - foundational: HS diploma/GED or some college, entry-level positions
 * - intermediate: Associate's/Bachelor's or clinical licenses, mid-career
 * - advanced: Master's/Doctorate or C-suite, executive/specialist roles
 */
export const UNIFIED_ROLES: UnifiedRole[] = [
  /* ============================================================ */
  /*  CLINICAL ROLES — Direct patient care                        */
  /* ============================================================ */

  {
    id: "chw",
    label: { en: "Community Health Worker", es: "Promotor(a) de Salud" },
    department: "clinical",
    educationLevel: "foundational",
    careerTrack: "community-health",
    careerTrackRole: "chw",
    interviewPrepRole: "chw",
    roleInsightsKey: "chw",
    assessmentRole: "chw",
  },

  {
    id: "health-navigator",
    label: { en: "Health Enrollment Navigator", es: "Navegador(a) de Salud" },
    department: "clinical",
    educationLevel: "foundational",
    roleInsightsKey: "health_enrollment_navigator",
  },

  {
    id: "patient-services",
    label: { en: "Patient Services Representative", es: "Representante de Servicios al Paciente" },
    department: "clinical",
    educationLevel: "foundational",
    roleInsightsKey: "patient_services",
  },

  {
    id: "medical-assistant",
    label: { en: "Medical Assistant", es: "Asistente Médico(a)" },
    department: "clinical",
    educationLevel: "foundational",
    careerTrack: "clinical-operations",
    careerTrackRole: "medical_assistant",
    interviewPrepRole: "medical_assistant",
    roleInsightsKey: "medical_assistant",
  },

  {
    id: "lead-ma",
    label: { en: "Lead Medical Assistant", es: "Asistente Médico(a) Líder" },
    department: "clinical",
    educationLevel: "intermediate",
    careerTrack: "clinical-operations",
    careerTrackRole: "lead-ma",
  },

  {
    id: "care-coordinator",
    label: { en: "Care Coordinator", es: "Coordinador(a) de Cuidado" },
    department: "clinical",
    educationLevel: "intermediate",
    careerTrack: "community-health",
    careerTrackRole: "care_coordinator",
    interviewPrepRole: "care_coordinator",
    roleInsightsKey: "care_coordinator",
  },

  {
    id: "case-manager",
    label: { en: "Case Manager", es: "Gestor(a) de Casos" },
    department: "clinical",
    educationLevel: "intermediate",
    roleInsightsKey: "case_manager",
  },

  {
    id: "lvn",
    label: { en: "Licensed Vocational Nurse", es: "Enfermera(o) Vocacional Licenciado(a)" },
    department: "clinical",
    educationLevel: "intermediate",
    careerTrack: "nursing",
    careerTrackRole: "lvn",
    interviewPrepRole: "lvn",
    roleInsightsKey: "lvn",
  },

  {
    id: "registered-nurse",
    label: { en: "Registered Nurse", es: "Enfermera(o) Registrada(o)" },
    department: "clinical",
    educationLevel: "intermediate",
    careerTrack: "nursing",
    careerTrackRole: "registered_nurse",
    interviewPrepRole: "registered_nurse",
    roleInsightsKey: "registered_nurse",
  },

  {
    id: "charge-nurse",
    label: { en: "Charge Nurse", es: "Enfermera(o) Jefe" },
    department: "clinical",
    educationLevel: "intermediate",
    careerTrack: "nursing",
    careerTrackRole: "charge-nurse",
  },

  {
    id: "nurse-manager",
    label: { en: "Nurse Manager", es: "Gerente de Enfermería" },
    department: "clinical",
    educationLevel: "advanced",
    careerTrack: "nursing",
    careerTrackRole: "nurse-manager",
  },

  {
    id: "np",
    label: { en: "Nurse Practitioner", es: "Enfermera(o) Practicante" },
    department: "clinical",
    educationLevel: "advanced",
    interviewPrepRole: "nurse_practitioner",
  },

  {
    id: "pa",
    label: { en: "Physician Assistant", es: "Asistente Médico(a)" },
    department: "clinical",
    educationLevel: "advanced",
    interviewPrepRole: "physician_assistant",
  },

  {
    id: "physician",
    label: { en: "Physician / MD", es: "Médico(a) / Médico(a) en Medicina" },
    department: "clinical",
    educationLevel: "advanced",
    interviewPrepRole: "physician",
  },

  /* ============================================================ */
  /*  BEHAVIORAL HEALTH ROLES                                     */
  /* ============================================================ */

  {
    id: "bh-technician",
    label: { en: "BH Technician", es: "Técnico(a) de Salud Mental" },
    department: "behavioral-health",
    educationLevel: "foundational",
    careerTrack: "behavioral-health",
    careerTrackRole: "bh-technician",
    roleInsightsKey: "bh_technician",
  },

  {
    id: "behavioral-health-specialist",
    label: { en: "Behavioral Health Specialist", es: "Especialista en Salud Mental" },
    department: "behavioral-health",
    educationLevel: "intermediate",
    careerTrack: "behavioral-health",
    careerTrackRole: "behavioral_health",
    roleInsightsKey: "behavioral_health",
  },

  {
    id: "licensed-therapist",
    label: { en: "Licensed Therapist (LCSW/AMFT/ASW)", es: "Terapeuta(a) Licenciado(a)" },
    department: "behavioral-health",
    educationLevel: "advanced",
    careerTrack: "behavioral-health",
    careerTrackRole: "licensed-therapist",
    roleInsightsKey: "licensed_therapist",
  },

  {
    id: "psychiatric-np",
    label: { en: "Psychiatric Nurse Practitioner", es: "Enfermera(o) Practicante Psiquiátrica(o)" },
    department: "behavioral-health",
    educationLevel: "advanced",
    careerTrack: "behavioral-health",
    roleInsightsKey: "psychiatric_np",
  },

  {
    id: "bh-director",
    label: { en: "Behavioral Health Director", es: "Director(a) de Salud Mental" },
    department: "behavioral-health",
    educationLevel: "advanced",
    careerTrack: "behavioral-health",
    careerTrackRole: "bh-director",
  },

  /* ============================================================ */
  /*  DENTAL ROLES                                                */
  /* ============================================================ */

  {
    id: "dental-assistant",
    label: { en: "Dental Assistant", es: "Asistente Dental" },
    department: "dental",
    educationLevel: "foundational",
    roleInsightsKey: "dental_assistant",
  },

  {
    id: "dental-hygienist",
    label: { en: "Dental Hygienist", es: "Higienista Dental" },
    department: "dental",
    educationLevel: "intermediate",
    roleInsightsKey: "dental_hygienist",
  },

  {
    id: "dentist",
    label: { en: "Dentist", es: "Dentista" },
    department: "dental",
    educationLevel: "advanced",
    interviewPrepRole: "dentist",
  },

  /* ============================================================ */
  /*  PHARMACY ROLES                                              */
  /* ============================================================ */

  {
    id: "pharmacy-technician",
    label: { en: "Pharmacy Technician", es: "Técnico(a) de Farmacia" },
    department: "pharmacy",
    educationLevel: "foundational",
    roleInsightsKey: "pharmacy_technician",
  },

  {
    id: "pharmacist",
    label: { en: "Pharmacist", es: "Farmacéutico(a)" },
    department: "pharmacy",
    educationLevel: "advanced",
    roleInsightsKey: "pharmacist",
  },

  /* ============================================================ */
  /*  REVENUE & BILLING ROLES                                    */
  /* ============================================================ */

  {
    id: "revenue-cycle",
    label: { en: "Revenue Cycle Specialist", es: "Especialista en Ciclo de Ingresos" },
    department: "admin",
    educationLevel: "intermediate",
    careerTrack: "revenue-operations",
    careerTrackRole: "revenue_cycle",
    roleInsightsKey: "revenue_cycle",
  },

  {
    id: "revenue-manager",
    label: { en: "Revenue Manager", es: "Gerente de Ingresos" },
    department: "admin",
    educationLevel: "intermediate",
    careerTrack: "revenue-operations",
    careerTrackRole: "revenue-manager",
  },

  /* ============================================================ */
  /*  COMPLIANCE & QUALITY ROLES                                 */
  /* ============================================================ */

  {
    id: "compliance-analyst",
    label: { en: "Compliance Analyst", es: "Analista de Cumplimiento" },
    department: "admin",
    educationLevel: "intermediate",
    careerTrack: "compliance-quality",
    careerTrackRole: "compliance_analyst",
    roleInsightsKey: "compliance_analyst",
  },

  {
    id: "compliance-officer",
    label: { en: "Compliance Officer", es: "Oficial de Cumplimiento" },
    department: "admin",
    educationLevel: "intermediate",
    careerTrack: "compliance-quality",
    careerTrackRole: "compliance_officer",
    roleInsightsKey: "compliance_officer",
  },

  /* ============================================================ */
  /*  FINANCE & ACCOUNTING ROLES                                 */
  /* ============================================================ */

  {
    id: "accountant",
    label: { en: "Accountant", es: "Contador(a)" },
    department: "finance",
    educationLevel: "intermediate",
    careerTrack: "revenue-operations",
    careerTrackRole: "accountant",
    roleInsightsKey: "accountant",
  },

  {
    id: "payroll-specialist",
    label: { en: "Payroll Specialist", es: "Especialista en Nómina" },
    department: "finance",
    educationLevel: "intermediate",
    careerTrack: "revenue-operations",
    careerTrackRole: "payroll_specialist",
    roleInsightsKey: "payroll_specialist",
  },

  {
    id: "finance-manager",
    label: { en: "Finance Manager", es: "Gerente de Finanzas" },
    department: "finance",
    educationLevel: "intermediate",
    careerTrack: "revenue-operations",
    careerTrackRole: "finance_manager",
    roleInsightsKey: "finance_manager",
  },

  /* ============================================================ */
  /*  HUMAN RESOURCES & OPERATIONS ROLES                         */
  /* ============================================================ */

  {
    id: "hr-manager",
    label: { en: "HR Manager", es: "Gerente de Recursos Humanos" },
    department: "admin",
    educationLevel: "intermediate",
    careerTrack: "operations",
    careerTrackRole: "hr_manager",
    roleInsightsKey: "hr_manager",
  },

  {
    id: "program-manager",
    label: { en: "Program Manager", es: "Gerente de Programa" },
    department: "admin",
    educationLevel: "intermediate",
    careerTrack: "community-health",
    careerTrackRole: "program-manager",
    roleInsightsKey: "program_manager",
  },

  {
    id: "clinical-ops-supervisor",
    label: { en: "Clinical Operations Supervisor", es: "Supervisor(a) de Operaciones Clínicas" },
    department: "admin",
    educationLevel: "intermediate",
    careerTrack: "clinical-operations",
    careerTrackRole: "clinical-ops-supervisor",
  },

  {
    id: "director-clinical-ops",
    label: { en: "Director of Clinical Operations", es: "Director(a) de Operaciones Clínicas" },
    department: "admin",
    educationLevel: "advanced",
    careerTrack: "clinical-operations",
    careerTrackRole: "director-clinical-ops",
  },

  {
    id: "director-community",
    label: { en: "Director of Community Programs", es: "Director(a) de Programas Comunitarios" },
    department: "leadership",
    educationLevel: "advanced",
    careerTrack: "community-health",
    careerTrackRole: "director-community",
  },

  {
    id: "director-finance",
    label: { en: "Director of Finance / CFO", es: "Director(a) de Finanzas / CFO" },
    department: "finance",
    educationLevel: "advanced",
    careerTrack: "revenue-operations",
    careerTrackRole: "director-finance",
  },

  {
    id: "cno",
    label: { en: "Chief Nursing Officer", es: "Oficial de Enfermería Jefe" },
    department: "clinical",
    educationLevel: "advanced",
    careerTrack: "nursing",
    careerTrackRole: "cno",
  },

  {
    id: "ceo",
    label: { en: "Executive Director / CEO", es: "Director(a) Ejecutivo(a) / CEO" },
    department: "leadership",
    educationLevel: "advanced",
  },
];

/**
 * Helper function to get a role by ID
 */
export function getRoleById(id: RoleId): UnifiedRole | undefined {
  return UNIFIED_ROLES.find((role) => role.id === id);
}

/**
 * Helper function to get all roles by department
 */
export function getRolesByDepartment(dept: Department): UnifiedRole[] {
  return UNIFIED_ROLES.filter((role) => role.department === dept);
}

/**
 * Helper function to get all roles by education level
 */
export function getRolesByEducationLevel(level: EducationLevel): UnifiedRole[] {
  return UNIFIED_ROLES.filter((role) => role.educationLevel === level);
}

/**
 * Helper function to map legacy role IDs to unified IDs
 * For backwards compatibility with existing data files
 */
export function mapLegacyRoleId(legacyId: string): RoleId | undefined {
  const mappings: Record<string, RoleId> = {
    chw: "chw",
    care_coordinator: "care-coordinator",
    care_co_ordinator: "care-coordinator",
    case_manager: "case-manager",
    "case-manager": "case-manager",
    health_enrollment_navigator: "health-navigator",
    patient_services: "patient-services",
    patient_services_rep: "patient-services",
    medical_assistant: "medical-assistant",
    ma: "medical-assistant",
    lead_ma: "lead-ma",
    lvn: "lvn",
    licensed_vocational_nurse: "lvn",
    registered_nurse: "registered-nurse",
    rn: "registered-nurse",
    charge_nurse: "charge-nurse",
    nurse_manager: "nurse-manager",
    nurse_practitioner: "np",
    np: "np",
    physician_assistant: "pa",
    pa: "pa",
    physician: "physician",
    md: "physician",
    dentist: "dentist",
    dental_hygienist: "dental-hygienist",
    dental_assistant: "dental-assistant",
    pharmacist: "pharmacist",
    pharmacy_technician: "pharmacy-technician",
    behavioral_health: "behavioral-health-specialist",
    bh_specialist: "behavioral-health-specialist",
    bh_technician: "bh-technician",
    psychiatric_np: "psychiatric-np",
    licensed_therapist: "licensed-therapist",
    lcsw: "licensed-therapist",
    revenue_cycle: "revenue-cycle",
    revenue_cycle_specialist: "revenue-cycle",
    revenue_manager: "revenue-manager",
    compliance_analyst: "compliance-analyst",
    compliance_officer: "compliance-officer",
    accountant: "accountant",
    payroll_specialist: "payroll-specialist",
    finance_manager: "finance-manager",
    hr_manager: "hr-manager",
    program_manager: "program-manager",
    clinical_ops_supervisor: "clinical-ops-supervisor",
    director_clinical_ops: "director-clinical-ops",
    director_community: "director-community",
    director_finance: "director-finance",
    cno: "cno",
    chief_nursing_officer: "cno",
    ceo: "ceo",
    executive_director: "ceo",
    bh_director: "bh-director",
    behavioral_health_director: "bh-director",
  };

  return mappings[legacyId.toLowerCase()];
}

/**
 * Get all unique departments represented in unified roles
 */
export function getAllDepartments(): Department[] {
  const departments = new Set<Department>();
  UNIFIED_ROLES.forEach((role) => departments.add(role.department));
  return Array.from(departments).sort();
}

/**
 * Get role label in specified language
 */
export function getRoleLabel(
  roleId: RoleId,
  locale: "en" | "es" = "en"
): string | undefined {
  const role = getRoleById(roleId);
  if (!role) return undefined;
  return role.label[locale];
}
