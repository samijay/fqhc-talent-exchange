// schedule-planner-engine.ts
// Data model and calculation engine for the FQHC Schedule Planner
// Connects to clinic-operations-model.ts for revenue calculations
// Last updated: 2026-03-10

/* ================================================================== */
/*  Role Types & Color Coding                                          */
/* ================================================================== */

export type StaffRole =
  | "physician"
  | "np"
  | "pa"
  | "rn"
  | "ma"
  | "chw"
  | "bh"
  | "dentist"
  | "dental_hygienist"
  | "dental_assistant"
  | "front_desk"
  | "care_coordinator";

export const ROLE_CONFIG: Record<
  StaffRole,
  {
    label: { en: string; es: string };
    shortLabel: string;
    color: string;          // Tailwind bg color class
    textColor: string;      // Tailwind text color class
    borderColor: string;    // Tailwind border color class
    hourlyRate: number;     // Average CA hourly rate
    annualSalary: number;   // Average CA annual salary
    isProvider: boolean;    // Can bill PPS encounters independently
    isMedicalSupport: boolean; // MA-type support staff
    encountersPerHour: number; // If provider, expected encounters/hour
    group: "provider" | "dental" | "support" | "behavioral" | "admin";
  }
> = {
  physician: {
    label: { en: "Physician (MD/DO)", es: "Médico (MD/DO)" },
    shortLabel: "MD",
    color: "bg-blue-100 dark:bg-blue-900/30",
    textColor: "text-blue-700 dark:text-blue-300",
    borderColor: "border-blue-300 dark:border-blue-700",
    hourlyRate: 115,
    annualSalary: 240000,
    isProvider: true,
    isMedicalSupport: false,
    encountersPerHour: 2.25,
    group: "provider",
  },
  np: {
    label: { en: "Nurse Practitioner", es: "Enfermero(a) Practicante" },
    shortLabel: "NP",
    color: "bg-indigo-100 dark:bg-indigo-900/30",
    textColor: "text-indigo-700 dark:text-indigo-300",
    borderColor: "border-indigo-300 dark:border-indigo-700",
    hourlyRate: 75,
    annualSalary: 155000,
    isProvider: true,
    isMedicalSupport: false,
    encountersPerHour: 2.0,
    group: "provider",
  },
  pa: {
    label: { en: "Physician Assistant", es: "Asistente del Médico" },
    shortLabel: "PA",
    color: "bg-violet-100 dark:bg-violet-900/30",
    textColor: "text-violet-700 dark:text-violet-300",
    borderColor: "border-violet-300 dark:border-violet-700",
    hourlyRate: 68,
    annualSalary: 140000,
    isProvider: true,
    isMedicalSupport: false,
    encountersPerHour: 2.0,
    group: "provider",
  },
  rn: {
    label: { en: "Registered Nurse", es: "Enfermero(a) RN" },
    shortLabel: "RN",
    color: "bg-green-100 dark:bg-green-900/30",
    textColor: "text-green-700 dark:text-green-300",
    borderColor: "border-green-300 dark:border-green-700",
    hourlyRate: 45,
    annualSalary: 93000,
    isProvider: false,
    isMedicalSupport: true,
    encountersPerHour: 0,
    group: "support",
  },
  ma: {
    label: { en: "Medical Assistant", es: "Asistente Médico" },
    shortLabel: "MA",
    color: "bg-teal-100 dark:bg-teal-900/30",
    textColor: "text-teal-700 dark:text-teal-300",
    borderColor: "border-teal-300 dark:border-teal-700",
    hourlyRate: 22,
    annualSalary: 45000,
    isProvider: false,
    isMedicalSupport: true,
    encountersPerHour: 0,
    group: "support",
  },
  chw: {
    label: { en: "Community Health Worker", es: "Trabajador de Salud Comunitaria" },
    shortLabel: "CHW",
    color: "bg-amber-100 dark:bg-amber-900/30",
    textColor: "text-amber-700 dark:text-amber-300",
    borderColor: "border-amber-300 dark:border-amber-700",
    hourlyRate: 24,
    annualSalary: 50000,
    isProvider: false,
    isMedicalSupport: false,
    encountersPerHour: 0,
    group: "support",
  },
  bh: {
    label: { en: "BH Provider (LCSW/Psych)", es: "Proveedor BH (LCSW/Psicólogo)" },
    shortLabel: "BH",
    color: "bg-purple-100 dark:bg-purple-900/30",
    textColor: "text-purple-700 dark:text-purple-300",
    borderColor: "border-purple-300 dark:border-purple-700",
    hourlyRate: 55,
    annualSalary: 114000,
    isProvider: true,
    isMedicalSupport: false,
    encountersPerHour: 1.5,
    group: "behavioral",
  },
  dentist: {
    label: { en: "Dentist (DMD/DDS)", es: "Dentista (DMD/DDS)" },
    shortLabel: "DDS",
    color: "bg-rose-100 dark:bg-rose-900/30",
    textColor: "text-rose-700 dark:text-rose-300",
    borderColor: "border-rose-300 dark:border-rose-700",
    hourlyRate: 80,
    annualSalary: 165000,
    isProvider: true,
    isMedicalSupport: false,
    encountersPerHour: 1.5,
    group: "dental",
  },
  dental_hygienist: {
    label: { en: "Dental Hygienist (RDH)", es: "Higienista Dental (RDH)" },
    shortLabel: "RDH",
    color: "bg-pink-100 dark:bg-pink-900/30",
    textColor: "text-pink-700 dark:text-pink-300",
    borderColor: "border-pink-300 dark:border-pink-700",
    hourlyRate: 52,
    annualSalary: 108000,
    isProvider: false,
    isMedicalSupport: false,
    encountersPerHour: 0,
    group: "dental",
  },
  dental_assistant: {
    label: { en: "Dental Assistant (RDA)", es: "Asistente Dental (RDA)" },
    shortLabel: "DA",
    color: "bg-pink-50 dark:bg-pink-950/30",
    textColor: "text-pink-600 dark:text-pink-400",
    borderColor: "border-pink-200 dark:border-pink-800",
    hourlyRate: 28,
    annualSalary: 58000,
    isProvider: false,
    isMedicalSupport: false,
    encountersPerHour: 0,
    group: "dental",
  },
  front_desk: {
    label: { en: "Front Desk / Registration", es: "Recepción / Registro" },
    shortLabel: "FD",
    color: "bg-stone-100 dark:bg-stone-800",
    textColor: "text-stone-700 dark:text-stone-300",
    borderColor: "border-stone-300 dark:border-stone-700",
    hourlyRate: 20,
    annualSalary: 42000,
    isProvider: false,
    isMedicalSupport: false,
    encountersPerHour: 0,
    group: "admin",
  },
  care_coordinator: {
    label: { en: "Care Coordinator", es: "Coordinador de Atención" },
    shortLabel: "CC",
    color: "bg-cyan-100 dark:bg-cyan-900/30",
    textColor: "text-cyan-700 dark:text-cyan-300",
    borderColor: "border-cyan-300 dark:border-cyan-700",
    hourlyRate: 28,
    annualSalary: 58000,
    isProvider: false,
    isMedicalSupport: false,
    encountersPerHour: 0,
    group: "support",
  },
};

/* ================================================================== */
/*  Staff & Shift Types                                                */
/* ================================================================== */

export interface StaffMember {
  id: string;
  name: string;
  role: StaffRole;
  fte: number; // 0.5, 0.75, 1.0
  hourlyRate: number;
  certifications?: string[];
  languages?: string[];
}

export type DayOfWeek = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export const DAYS_OF_WEEK: DayOfWeek[] = [
  "mon", "tue", "wed", "thu", "fri", "sat", "sun",
];

export const DAY_LABELS: Record<DayOfWeek, { en: string; es: string; short: string }> = {
  mon: { en: "Monday", es: "Lunes", short: "Mon" },
  tue: { en: "Tuesday", es: "Martes", short: "Tue" },
  wed: { en: "Wednesday", es: "Miércoles", short: "Wed" },
  thu: { en: "Thursday", es: "Jueves", short: "Thu" },
  fri: { en: "Friday", es: "Viernes", short: "Fri" },
  sat: { en: "Saturday", es: "Sábado", short: "Sat" },
  sun: { en: "Sunday", es: "Domingo", short: "Sun" },
};

export interface ShiftAssignment {
  id: string;
  staffId: string;
  day: DayOfWeek;
  startHour: number; // 0-23 (e.g., 8 = 8am)
  endHour: number;   // 0-23 (e.g., 17 = 5pm)
  isOvertime: boolean;
  isOnCall: boolean;
  notes?: string;
}

export interface OperatingHours {
  mon: { open: number; close: number; active: boolean };
  tue: { open: number; close: number; active: boolean };
  wed: { open: number; close: number; active: boolean };
  thu: { open: number; close: number; active: boolean };
  fri: { open: number; close: number; active: boolean };
  sat: { open: number; close: number; active: boolean };
  sun: { open: number; close: number; active: boolean };
}

export interface WeeklySchedule {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  staff: StaffMember[];
  assignments: ShiftAssignment[];
  operatingHours: OperatingHours;
  ppsRate: number;
  noShowRate: number; // 0-1
}

/* ================================================================== */
/*  Schedule Metrics                                                   */
/* ================================================================== */

export interface DailyMetrics {
  day: DayOfWeek;
  staffOnDuty: number;
  providersOnDuty: number;
  masOnDuty: number;
  maProviderRatio: number;
  estimatedEncounters: number;
  estimatedRevenue: number;
  laborCost: number;
  warnings: ScheduleWarning[];
}

export interface ScheduleMetrics {
  // Coverage
  dailyMetrics: DailyMetrics[];
  totalWeeklyHours: number;
  totalWeeklyEncounters: number;
  totalWeeklyRevenue: number;
  totalWeeklyLaborCost: number;

  // Ratios
  overallMAProviderRatio: number;
  averageEncountersPerDay: number;

  // Financials (annualized)
  annualizedRevenue: number;
  annualizedLaborCost: number;
  annualizedMargin: number;

  // Counts
  totalStaff: number;
  totalProviders: number;
  totalFTE: number;

  // Warnings
  allWarnings: ScheduleWarning[];
}

export type WarningType =
  | "understaffed"
  | "no-ma"
  | "low-ma-ratio"
  | "overtime"
  | "coverage-gap"
  | "no-provider"
  | "single-provider";

export interface ScheduleWarning {
  type: WarningType;
  severity: "info" | "warning" | "critical";
  day: DayOfWeek;
  message: { en: string; es: string };
}

/* ================================================================== */
/*  Default Operating Hours                                            */
/* ================================================================== */

export const DEFAULT_OPERATING_HOURS: OperatingHours = {
  mon: { open: 8, close: 17, active: true },
  tue: { open: 8, close: 17, active: true },
  wed: { open: 8, close: 17, active: true },
  thu: { open: 8, close: 17, active: true },
  fri: { open: 8, close: 17, active: true },
  sat: { open: 8, close: 13, active: false },
  sun: { open: 8, close: 13, active: false },
};

/* ================================================================== */
/*  Size Presets — Pre-configured staff for quick start                */
/* ================================================================== */

export interface SizePreset {
  id: string;
  label: { en: string; es: string };
  staff: Omit<StaffMember, "id">[];
  operatingHours: OperatingHours;
  ppsRate: number;
  noShowRate: number;
}

let nextId = 1;
function genId(): string {
  return `staff-${nextId++}`;
}

function makeStaff(
  name: string,
  role: StaffRole,
  fte: number = 1.0,
): Omit<StaffMember, "id"> {
  return {
    name,
    role,
    fte,
    hourlyRate: ROLE_CONFIG[role].hourlyRate,
  };
}

export const SIZE_PRESETS: SizePreset[] = [
  {
    id: "small",
    label: { en: "Small FQHC (3 providers)", es: "FQHC Pequeño (3 proveedores)" },
    staff: [
      makeStaff("Dr. Garcia", "physician"),
      makeStaff("NP Rodriguez", "np"),
      makeStaff("PA Chen", "pa"),
      makeStaff("RN Williams", "rn"),
      makeStaff("MA Torres", "ma"),
      makeStaff("MA Johnson", "ma"),
      makeStaff("MA Lopez", "ma"),
      makeStaff("MA Kim", "ma"),
      makeStaff("CHW Hernandez", "chw"),
      makeStaff("BH Martinez (LCSW)", "bh"),
      makeStaff("Front Desk — A. Davis", "front_desk"),
      makeStaff("Front Desk — S. Patel", "front_desk"),
    ],
    operatingHours: { ...DEFAULT_OPERATING_HOURS },
    ppsRate: 225,
    noShowRate: 0.18,
  },
  {
    id: "mid-size",
    label: { en: "Mid-Size FQHC (6 providers)", es: "FQHC Mediano (6 proveedores)" },
    staff: [
      makeStaff("Dr. Garcia", "physician"),
      makeStaff("Dr. Singh", "physician"),
      makeStaff("NP Rodriguez", "np"),
      makeStaff("NP Kim", "np"),
      makeStaff("PA Chen", "pa"),
      makeStaff("PA Williams", "pa"),
      makeStaff("RN Johnson", "rn"),
      makeStaff("RN Thompson", "rn"),
      makeStaff("MA Torres", "ma"),
      makeStaff("MA Lopez", "ma"),
      makeStaff("MA Ramirez", "ma"),
      makeStaff("MA Davis", "ma"),
      makeStaff("MA Nguyen", "ma"),
      makeStaff("MA Patel", "ma"),
      makeStaff("MA Cruz", "ma"),
      makeStaff("MA Ortiz", "ma"),
      makeStaff("MA Lee", "ma"),
      makeStaff("CHW Hernandez", "chw"),
      makeStaff("CHW Morales", "chw"),
      makeStaff("BH Martinez (LCSW)", "bh"),
      makeStaff("BH Taylor (Psych)", "bh"),
      makeStaff("Dr. Yamamoto (DDS)", "dentist"),
      makeStaff("RDH Santos", "dental_hygienist"),
      makeStaff("DA Flores", "dental_assistant"),
      makeStaff("CC Brown", "care_coordinator"),
      makeStaff("CC Wilson", "care_coordinator"),
      makeStaff("Front Desk — A. Davis", "front_desk"),
      makeStaff("Front Desk — S. Patel", "front_desk"),
      makeStaff("Front Desk — M. Garcia", "front_desk"),
    ],
    operatingHours: {
      ...DEFAULT_OPERATING_HOURS,
      mon: { open: 8, close: 19, active: true },
      tue: { open: 8, close: 19, active: true },
      wed: { open: 8, close: 19, active: true },
      thu: { open: 8, close: 19, active: true },
      fri: { open: 8, close: 19, active: true },
      sat: { open: 8, close: 13, active: true },
    },
    ppsRate: 245,
    noShowRate: 0.15,
  },
  {
    id: "large",
    label: { en: "Large FQHC (10+ providers)", es: "FQHC Grande (10+ proveedores)" },
    staff: [
      makeStaff("Dr. Garcia", "physician"),
      makeStaff("Dr. Singh", "physician"),
      makeStaff("Dr. Yamamoto", "physician"),
      makeStaff("NP Rodriguez", "np"),
      makeStaff("NP Kim", "np"),
      makeStaff("NP Thompson", "np"),
      makeStaff("PA Chen", "pa"),
      makeStaff("PA Williams", "pa"),
      makeStaff("PA Patel", "pa"),
      makeStaff("PA Lee", "pa"),
      makeStaff("RN Johnson", "rn"),
      makeStaff("RN Brown", "rn"),
      makeStaff("RN Taylor", "rn"),
      // 15 MAs for 10 providers (1.5:1)
      ...Array.from({ length: 15 }, (_, i) =>
        makeStaff(`MA Staff-${i + 1}`, "ma"),
      ),
      makeStaff("CHW Hernandez", "chw"),
      makeStaff("CHW Morales", "chw"),
      makeStaff("CHW Sanchez", "chw"),
      makeStaff("BH Martinez (LCSW)", "bh"),
      makeStaff("BH Taylor (Psych)", "bh"),
      makeStaff("BH Nguyen (LCSW)", "bh"),
      makeStaff("Dr. Flores (DDS)", "dentist"),
      makeStaff("Dr. Park (DDS)", "dentist"),
      makeStaff("RDH Santos", "dental_hygienist"),
      makeStaff("RDH Miller", "dental_hygienist"),
      makeStaff("DA Rivera", "dental_assistant"),
      makeStaff("DA Chen", "dental_assistant"),
      makeStaff("CC Brown", "care_coordinator"),
      makeStaff("CC Wilson", "care_coordinator"),
      makeStaff("CC Davis", "care_coordinator"),
      ...Array.from({ length: 4 }, (_, i) =>
        makeStaff(`Front Desk ${i + 1}`, "front_desk"),
      ),
    ],
    operatingHours: {
      mon: { open: 7, close: 19, active: true },
      tue: { open: 7, close: 19, active: true },
      wed: { open: 7, close: 19, active: true },
      thu: { open: 7, close: 19, active: true },
      fri: { open: 7, close: 19, active: true },
      sat: { open: 8, close: 13, active: true },
      sun: { open: 8, close: 13, active: false },
    },
    ppsRate: 265,
    noShowRate: 0.12,
  },
];

/* ================================================================== */
/*  Calculation Functions                                              */
/* ================================================================== */

/** Generate a unique ID for new items */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Create a new empty schedule */
export function createEmptySchedule(name?: string): WeeklySchedule {
  return {
    id: generateId(),
    name: name || "New Schedule",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    staff: [],
    assignments: [],
    operatingHours: { ...DEFAULT_OPERATING_HOURS },
    ppsRate: 225,
    noShowRate: 0.18,
  };
}

/** Create schedule from a size preset */
export function createScheduleFromPreset(preset: SizePreset): WeeklySchedule {
  const schedule = createEmptySchedule(preset.label.en);
  schedule.operatingHours = { ...preset.operatingHours };
  schedule.ppsRate = preset.ppsRate;
  schedule.noShowRate = preset.noShowRate;

  // Add staff with generated IDs
  schedule.staff = preset.staff.map((s) => ({
    ...s,
    id: generateId(),
  }));

  // Auto-assign all staff to all active days with standard hours
  schedule.assignments = [];
  for (const staffMember of schedule.staff) {
    for (const day of DAYS_OF_WEEK) {
      const hours = schedule.operatingHours[day];
      if (!hours.active) continue;

      schedule.assignments.push({
        id: generateId(),
        staffId: staffMember.id,
        day,
        startHour: hours.open,
        endHour: hours.close,
        isOvertime: false,
        isOnCall: false,
      });
    }
  }

  return schedule;
}

/** Calculate the MA:Provider ratio for a given day */
export function calculateMAProviderRatio(
  schedule: WeeklySchedule,
  day: DayOfWeek,
): number {
  const dayAssignments = schedule.assignments.filter((a) => a.day === day);
  const staffIds = new Set(dayAssignments.map((a) => a.staffId));

  let providers = 0;
  let mas = 0;

  for (const member of schedule.staff) {
    if (!staffIds.has(member.id)) continue;
    const config = ROLE_CONFIG[member.role];
    if (config.isProvider && config.group === "provider") {
      providers += member.fte;
    }
    if (member.role === "ma") {
      mas += member.fte;
    }
  }

  if (providers === 0) return 0;
  return Math.round((mas / providers) * 100) / 100;
}

/** Calculate daily metrics for a specific day */
export function calculateDailyMetrics(
  schedule: WeeklySchedule,
  day: DayOfWeek,
): DailyMetrics {
  const hours = schedule.operatingHours[day];
  if (!hours.active) {
    return {
      day,
      staffOnDuty: 0,
      providersOnDuty: 0,
      masOnDuty: 0,
      maProviderRatio: 0,
      estimatedEncounters: 0,
      estimatedRevenue: 0,
      laborCost: 0,
      warnings: [],
    };
  }

  const dayAssignments = schedule.assignments.filter((a) => a.day === day);
  const staffIds = new Set(dayAssignments.map((a) => a.staffId));

  let totalStaff = 0;
  let providers = 0;
  let mas = 0;
  let estimatedEncounters = 0;
  let laborCost = 0;

  for (const member of schedule.staff) {
    if (!staffIds.has(member.id)) continue;
    totalStaff++;

    const assignment = dayAssignments.find((a) => a.staffId === member.id)!;
    const hoursWorked = assignment.endHour - assignment.startHour;
    const config = ROLE_CONFIG[member.role];

    // Calculate labor cost
    const rate = assignment.isOvertime
      ? member.hourlyRate * 1.5
      : member.hourlyRate;
    laborCost += rate * hoursWorked * member.fte;

    // Count providers and MAs
    if (config.isProvider && config.group === "provider") {
      providers += member.fte;
      estimatedEncounters += config.encountersPerHour * hoursWorked * member.fte;
    }
    if (member.role === "ma") {
      mas += member.fte;
    }
  }

  // Adjust for no-show rate
  const adjustedEncounters = Math.round(
    estimatedEncounters * (1 - schedule.noShowRate),
  );

  const maRatio = providers > 0 ? Math.round((mas / providers) * 100) / 100 : 0;
  const revenue = adjustedEncounters * schedule.ppsRate;

  // Generate warnings
  const warnings: ScheduleWarning[] = [];

  if (providers === 0) {
    warnings.push({
      type: "no-provider",
      severity: "critical",
      day,
      message: {
        en: `No providers scheduled on ${DAY_LABELS[day].en}`,
        es: `Sin proveedores programados el ${DAY_LABELS[day].es}`,
      },
    });
  }

  if (providers === 1) {
    warnings.push({
      type: "single-provider",
      severity: "warning",
      day,
      message: {
        en: `Only 1 provider on ${DAY_LABELS[day].en} — no backup if called out`,
        es: `Solo 1 proveedor el ${DAY_LABELS[day].es} — sin respaldo si se ausenta`,
      },
    });
  }

  if (providers > 0 && mas === 0) {
    warnings.push({
      type: "no-ma",
      severity: "critical",
      day,
      message: {
        en: `No MAs scheduled on ${DAY_LABELS[day].en} — providers unsupported`,
        es: `Sin MAs programados el ${DAY_LABELS[day].es} — proveedores sin apoyo`,
      },
    });
  }

  if (providers > 0 && maRatio < 1.0 && maRatio > 0) {
    warnings.push({
      type: "low-ma-ratio",
      severity: "warning",
      day,
      message: {
        en: `MA:Provider ratio is ${maRatio}:1 on ${DAY_LABELS[day].en} (target: 1.5:1)`,
        es: `El ratio MA:Proveedor es ${maRatio}:1 el ${DAY_LABELS[day].es} (meta: 1.5:1)`,
      },
    });
  }

  const otAssignments = dayAssignments.filter((a) => a.isOvertime);
  if (otAssignments.length > 0) {
    warnings.push({
      type: "overtime",
      severity: "info",
      day,
      message: {
        en: `${otAssignments.length} staff on overtime on ${DAY_LABELS[day].en}`,
        es: `${otAssignments.length} personal en horas extra el ${DAY_LABELS[day].es}`,
      },
    });
  }

  return {
    day,
    staffOnDuty: totalStaff,
    providersOnDuty: providers,
    masOnDuty: mas,
    maProviderRatio: maRatio,
    estimatedEncounters: adjustedEncounters,
    estimatedRevenue: revenue,
    laborCost: Math.round(laborCost),
    warnings,
  };
}

/** Calculate full schedule metrics */
export function calculateScheduleMetrics(
  schedule: WeeklySchedule,
): ScheduleMetrics {
  const dailyMetrics = DAYS_OF_WEEK.map((day) =>
    calculateDailyMetrics(schedule, day),
  );

  const activeDays = dailyMetrics.filter((d) =>
    schedule.operatingHours[d.day].active,
  );

  const totalWeeklyEncounters = dailyMetrics.reduce(
    (sum, d) => sum + d.estimatedEncounters,
    0,
  );
  const totalWeeklyRevenue = dailyMetrics.reduce(
    (sum, d) => sum + d.estimatedRevenue,
    0,
  );
  const totalWeeklyLaborCost = dailyMetrics.reduce(
    (sum, d) => sum + d.laborCost,
    0,
  );
  const totalWeeklyHours = activeDays.reduce((sum, d) => {
    const hours = schedule.operatingHours[d.day];
    return sum + (hours.close - hours.open);
  }, 0);

  // Overall MA:Provider ratio (across all active days)
  const totalProviders = activeDays.reduce(
    (sum, d) => sum + d.providersOnDuty,
    0,
  );
  const totalMAs = activeDays.reduce((sum, d) => sum + d.masOnDuty, 0);
  const overallRatio =
    totalProviders > 0
      ? Math.round((totalMAs / totalProviders) * activeDays.length * 100) /
        (activeDays.length * 100)
      : 0;

  // Annualize (50 working weeks)
  const annualizedRevenue = totalWeeklyRevenue * 50;
  const annualizedLaborCost = totalWeeklyLaborCost * 50;

  const allWarnings = dailyMetrics.flatMap((d) => d.warnings);

  const uniqueStaffIds = new Set<string>();
  schedule.assignments.forEach((a) => uniqueStaffIds.add(a.staffId));

  const totalFTE = schedule.staff
    .filter((s) => uniqueStaffIds.has(s.id))
    .reduce((sum, s) => sum + s.fte, 0);

  return {
    dailyMetrics,
    totalWeeklyHours,
    totalWeeklyEncounters,
    totalWeeklyRevenue,
    totalWeeklyLaborCost,
    overallMAProviderRatio: overallRatio,
    averageEncountersPerDay:
      activeDays.length > 0
        ? Math.round(totalWeeklyEncounters / activeDays.length)
        : 0,
    annualizedRevenue,
    annualizedLaborCost,
    annualizedMargin: annualizedRevenue - annualizedLaborCost,
    totalStaff: uniqueStaffIds.size,
    totalProviders: schedule.staff.filter(
      (s) => ROLE_CONFIG[s.role].isProvider && ROLE_CONFIG[s.role].group === "provider",
    ).length,
    totalFTE,
    allWarnings,
  };
}

/* ================================================================== */
/*  Schedule Mutations (immutable — return new state)                  */
/* ================================================================== */

export function addStaffMember(
  schedule: WeeklySchedule,
  staff: Omit<StaffMember, "id">,
): WeeklySchedule {
  const newMember: StaffMember = { ...staff, id: generateId() };
  return {
    ...schedule,
    staff: [...schedule.staff, newMember],
    updatedAt: new Date().toISOString(),
  };
}

export function removeStaffMember(
  schedule: WeeklySchedule,
  staffId: string,
): WeeklySchedule {
  return {
    ...schedule,
    staff: schedule.staff.filter((s) => s.id !== staffId),
    assignments: schedule.assignments.filter((a) => a.staffId !== staffId),
    updatedAt: new Date().toISOString(),
  };
}

export function updateStaffMember(
  schedule: WeeklySchedule,
  staffId: string,
  updates: Partial<Omit<StaffMember, "id">>,
): WeeklySchedule {
  return {
    ...schedule,
    staff: schedule.staff.map((s) =>
      s.id === staffId ? { ...s, ...updates } : s,
    ),
    updatedAt: new Date().toISOString(),
  };
}

export function addShiftAssignment(
  schedule: WeeklySchedule,
  assignment: Omit<ShiftAssignment, "id">,
): WeeklySchedule {
  return {
    ...schedule,
    assignments: [
      ...schedule.assignments,
      { ...assignment, id: generateId() },
    ],
    updatedAt: new Date().toISOString(),
  };
}

export function removeShiftAssignment(
  schedule: WeeklySchedule,
  assignmentId: string,
): WeeklySchedule {
  return {
    ...schedule,
    assignments: schedule.assignments.filter((a) => a.id !== assignmentId),
    updatedAt: new Date().toISOString(),
  };
}

export function updateShiftAssignment(
  schedule: WeeklySchedule,
  assignmentId: string,
  updates: Partial<Omit<ShiftAssignment, "id">>,
): WeeklySchedule {
  return {
    ...schedule,
    assignments: schedule.assignments.map((a) =>
      a.id === assignmentId ? { ...a, ...updates } : a,
    ),
    updatedAt: new Date().toISOString(),
  };
}

export function updateOperatingHours(
  schedule: WeeklySchedule,
  day: DayOfWeek,
  updates: Partial<OperatingHours[DayOfWeek]>,
): WeeklySchedule {
  return {
    ...schedule,
    operatingHours: {
      ...schedule.operatingHours,
      [day]: { ...schedule.operatingHours[day], ...updates },
    },
    updatedAt: new Date().toISOString(),
  };
}

/* ================================================================== */
/*  localStorage Persistence                                           */
/* ================================================================== */

const STORAGE_KEY = "fqhc-schedule-planner";

export interface SavedSchedules {
  schedules: WeeklySchedule[];
  activeScheduleId: string | null;
}

export function loadSavedSchedules(): SavedSchedules {
  if (typeof window === "undefined") {
    return { schedules: [], activeScheduleId: null };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { schedules: [], activeScheduleId: null };
    return JSON.parse(raw) as SavedSchedules;
  } catch {
    return { schedules: [], activeScheduleId: null };
  }
}

export function saveSchedules(data: SavedSchedules): void {
  if (typeof window === "undefined") return;
  try {
    // Limit to 5 saved schedules
    const limited = {
      ...data,
      schedules: data.schedules.slice(0, 5),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
  } catch {
    // Storage full — fail silently
  }
}

export function saveSchedule(schedule: WeeklySchedule): void {
  const data = loadSavedSchedules();
  const idx = data.schedules.findIndex((s) => s.id === schedule.id);
  if (idx >= 0) {
    data.schedules[idx] = schedule;
  } else {
    data.schedules.push(schedule);
  }
  data.activeScheduleId = schedule.id;
  saveSchedules(data);
}

export function deleteSchedule(scheduleId: string): void {
  const data = loadSavedSchedules();
  data.schedules = data.schedules.filter((s) => s.id !== scheduleId);
  if (data.activeScheduleId === scheduleId) {
    data.activeScheduleId = data.schedules[0]?.id || null;
  }
  saveSchedules(data);
}

export function cloneSchedule(schedule: WeeklySchedule, newName: string): WeeklySchedule {
  return {
    ...schedule,
    id: generateId(),
    name: newName,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    staff: schedule.staff.map((s) => ({ ...s, id: generateId() })),
    assignments: schedule.assignments.map((a) => {
      const oldStaffId = a.staffId;
      const oldStaff = schedule.staff.find((s) => s.id === oldStaffId);
      // Find corresponding new staff member by matching index
      const oldIdx = schedule.staff.indexOf(oldStaff!);
      return { ...a, id: generateId() };
    }),
  };
}

/* ================================================================== */
/*  Schedule Comparison                                                */
/* ================================================================== */

export interface ScheduleComparison {
  schedule1: { name: string; metrics: ScheduleMetrics };
  schedule2: { name: string; metrics: ScheduleMetrics };
  deltas: {
    weeklyEncounters: number;
    weeklyRevenue: number;
    weeklyLaborCost: number;
    annualizedRevenue: number;
    annualizedMargin: number;
    maProviderRatio: number;
  };
}

export function compareSchedules(
  s1: WeeklySchedule,
  s2: WeeklySchedule,
): ScheduleComparison {
  const m1 = calculateScheduleMetrics(s1);
  const m2 = calculateScheduleMetrics(s2);

  return {
    schedule1: { name: s1.name, metrics: m1 },
    schedule2: { name: s2.name, metrics: m2 },
    deltas: {
      weeklyEncounters: m2.totalWeeklyEncounters - m1.totalWeeklyEncounters,
      weeklyRevenue: m2.totalWeeklyRevenue - m1.totalWeeklyRevenue,
      weeklyLaborCost: m2.totalWeeklyLaborCost - m1.totalWeeklyLaborCost,
      annualizedRevenue: m2.annualizedRevenue - m1.annualizedRevenue,
      annualizedMargin: m2.annualizedMargin - m1.annualizedMargin,
      maProviderRatio:
        m2.overallMAProviderRatio - m1.overallMAProviderRatio,
    },
  };
}
