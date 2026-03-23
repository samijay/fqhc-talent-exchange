/* ------------------------------------------------------------------ */
/*  Role-Specific Behavioral Assessment Questions — Index              */
/*  180 questions: 15 per role × 12 FQHC roles (3 per domain × 5)    */
/*                                                                     */
/*  Data is split across 3 files to keep each under 500KB:            */
/*    role-specific-questions-a.ts  (clinical/frontline roles)        */
/*    role-specific-questions-b.ts  (finance roles — part 1)          */
/*    role-specific-questions-c.ts  (finance roles — part 2 + compliance) */
/* ------------------------------------------------------------------ */

import type { AssessmentQuestion } from "./career-assessment-engine";
import { ROLE_SPECIFIC_QUESTIONS_A } from "./role-specific-questions-a";
import { ROLE_SPECIFIC_QUESTIONS_B } from "./role-specific-questions-b";
import { ROLE_SPECIFIC_QUESTIONS_C } from "./role-specific-questions-c";

export type RoleId =
  | "chw"
  | "care_coordinator"
  | "medical_assistant"
  | "case_manager"
  | "behavioral_health"
  | "registered_nurse"
  | "patient_services"
  | "revenue_cycle"
  | "hr_manager"
  | "accountant"
  | "payroll_specialist"
  | "finance_manager"
  | "compliance_officer"
  | "compliance_analyst";

export const ROLE_SPECIFIC_QUESTIONS: (AssessmentQuestion & { roleId: RoleId })[] = [
  ...ROLE_SPECIFIC_QUESTIONS_A,
  ...ROLE_SPECIFIC_QUESTIONS_B,
  ...ROLE_SPECIFIC_QUESTIONS_C,
] as (AssessmentQuestion & { roleId: RoleId })[];
