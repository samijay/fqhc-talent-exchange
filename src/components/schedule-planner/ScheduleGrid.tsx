// ScheduleGrid.tsx — Visual weekly grid (rows=staff grouped by role, cols=days)
"use client";

import { useMemo } from "react";
import { useLocale } from "next-intl";
import { Clock, Plus, X } from "lucide-react";
import {
  type WeeklySchedule,
  type StaffMember,
  type DayOfWeek,
  type ShiftAssignment,
  DAYS_OF_WEEK,
  DAY_LABELS,
  ROLE_CONFIG,
} from "@/lib/schedule-planner-engine";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface ScheduleGridProps {
  schedule: WeeklySchedule;
  onAddShift?: (staffId: string, day: DayOfWeek) => void;
  onRemoveShift?: (assignmentId: string) => void;
  onEditShift?: (assignmentId: string) => void;
  compact?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatHour(h: number): string {
  if (h === 0) return "12a";
  if (h < 12) return `${h}a`;
  if (h === 12) return "12p";
  return `${h - 12}p`;
}

function groupStaffByRole(staff: StaffMember[]): { group: string; members: StaffMember[] }[] {
  const groupOrder = ["provider", "dental", "behavioral", "support", "admin"];

  const groups: Record<string, StaffMember[]> = {};

  for (const member of staff) {
    const group = ROLE_CONFIG[member.role].group;
    if (!groups[group]) groups[group] = [];
    groups[group].push(member);
  }

  return groupOrder
    .filter((g) => groups[g]?.length > 0)
    .map((g) => ({
      group: g,
      members: groups[g],
    }));
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ScheduleGrid({
  schedule,
  onAddShift,
  onRemoveShift,
  onEditShift,
  compact = false,
}: ScheduleGridProps) {
  const locale = useLocale();
  const isEs = locale === "es";

  const activeDays = useMemo(
    () => DAYS_OF_WEEK.filter((d) => schedule.operatingHours[d].active),
    [schedule.operatingHours],
  );

  const groupedStaff = useMemo(
    () => groupStaffByRole(schedule.staff),
    [schedule.staff],
  );

  // Map: staffId -> day -> ShiftAssignment
  const assignmentMap = useMemo(() => {
    const map = new Map<string, Map<DayOfWeek, ShiftAssignment>>();
    for (const a of schedule.assignments) {
      if (!map.has(a.staffId)) map.set(a.staffId, new Map());
      map.get(a.staffId)!.set(a.day, a);
    }
    return map;
  }, [schedule.assignments]);

  const groupLabels: Record<string, { en: string; es: string }> = {
    provider: { en: "Providers", es: "Proveedores" },
    dental: { en: "Dental Team", es: "Equipo Dental" },
    behavioral: { en: "Behavioral Health", es: "Salud Mental" },
    support: { en: "Support Staff", es: "Personal de Apoyo" },
    admin: { en: "Administration", es: "Administración" },
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse min-w-[700px]">
        {/* Header row: Day names + operating hours */}
        <thead>
          <tr>
            <th className="sticky left-0 z-10 bg-white dark:bg-stone-900 border-b border-r border-stone-200 dark:border-stone-700 p-2 text-left text-xs font-semibold text-stone-500 dark:text-stone-500 w-48">
              {isEs ? "Personal" : "Staff"}
            </th>
            {activeDays.map((day) => {
              const hours = schedule.operatingHours[day];
              return (
                <th
                  key={day}
                  className="border-b border-stone-200 dark:border-stone-700 p-2 text-center min-w-[100px]"
                >
                  <div className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                    {isEs ? DAY_LABELS[day].es : DAY_LABELS[day].short}
                  </div>
                  <div className="text-xs text-stone-500 flex items-center justify-center gap-1">
                    <Clock className="h-2.5 w-2.5" />
                    {formatHour(hours.open)}-{formatHour(hours.close)}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {groupedStaff.map(({ group, members }) => (
            <>
              {/* Group header row */}
              <tr key={`group-${group}`}>
                <td
                  colSpan={activeDays.length + 1}
                  className="bg-stone-50 dark:bg-stone-800/50 border-b border-stone-200 dark:border-stone-700 px-2 py-1"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-500">
                    {isEs
                      ? groupLabels[group]?.es || group
                      : groupLabels[group]?.en || group}
                  </span>
                </td>
              </tr>

              {/* Staff rows */}
              {members.map((member) => {
                const config = ROLE_CONFIG[member.role];
                const memberAssignments = assignmentMap.get(member.id);

                return (
                  <tr
                    key={member.id}
                    className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors"
                  >
                    {/* Staff name + role */}
                    <td className="sticky left-0 z-10 bg-white dark:bg-stone-900 border-b border-r border-stone-200 dark:border-stone-700 p-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center justify-center w-7 h-5 rounded text-xs font-bold ${config.color} ${config.textColor}`}
                        >
                          {config.shortLabel}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-stone-800 dark:text-stone-200 truncate">
                            {member.name}
                          </p>
                          {member.fte < 1 && (
                            <p className="text-xs text-stone-500">
                              {member.fte} FTE
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Day cells */}
                    {activeDays.map((day) => {
                      const assignment = memberAssignments?.get(day);

                      if (assignment) {
                        // Filled shift
                        const shiftHours = assignment.endHour - assignment.startHour;
                        return (
                          <td
                            key={day}
                            className="border-b border-stone-200 dark:border-stone-700 p-1"
                          >
                            <button
                              className={`w-full rounded-md px-2 py-1.5 text-left transition-all hover:ring-2 hover:ring-teal-400 ${config.color} ${config.textColor} ${
                                assignment.isOvertime
                                  ? "ring-1 ring-amber-400"
                                  : ""
                              }`}
                              onClick={() => onEditShift?.(assignment.id)}
                              title={`${formatHour(assignment.startHour)}-${formatHour(assignment.endHour)} (${shiftHours}h)`}
                            >
                              <div className="text-xs font-medium leading-tight">
                                {compact
                                  ? `${shiftHours}h`
                                  : `${formatHour(assignment.startHour)}-${formatHour(assignment.endHour)}`}
                              </div>
                              {assignment.isOvertime && (
                                <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                                  OT
                                </div>
                              )}
                              {assignment.isOnCall && (
                                <div className="text-xs opacity-60">
                                  📞
                                </div>
                              )}
                            </button>
                            {onRemoveShift && (
                              <button
                                className="absolute -top-1 -right-1 rounded-full bg-red-500 p-0.5 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onRemoveShift(assignment.id);
                                }}
                              >
                                <X className="h-2.5 w-2.5" />
                              </button>
                            )}
                          </td>
                        );
                      }

                      // Empty cell — add shift button
                      return (
                        <td
                          key={day}
                          className="border-b border-stone-200 dark:border-stone-700 p-1"
                        >
                          {onAddShift && (
                            <button
                              className="w-full h-8 rounded-md border border-dashed border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-300 dark:text-stone-600 hover:border-teal-300 hover:text-teal-500 transition-colors"
                              onClick={() => onAddShift(member.id, day)}
                              title={
                                isEs ? "Agregar turno" : "Add shift"
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
