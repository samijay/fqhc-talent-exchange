// DelegationMatrix — Interactive "Can my staff do this?" scope-of-practice grid
"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Shield, X, Filter, Info } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type AuthorizationLevel =
  | "independent"
  | "supervised"
  | "delegated"
  | "prohibited";

export interface MatrixRole {
  id: string;
  abbreviation: string;
  title: { en: string; es: string };
}

export interface MatrixTask {
  id: string;
  task: { en: string; es: string };
  department: string;
  authorizations: {
    roleId: string;
    level: AuthorizationLevel;
    citation: string;
    note?: { en: string; es: string };
  }[];
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const LEVEL_META: Record<
  AuthorizationLevel,
  { symbol: string; label: { en: string; es: string }; color: string; bg: string }
> = {
  independent: {
    symbol: "✓",
    label: { en: "Independent", es: "Independiente" },
    color: "text-green-700",
    bg: "bg-green-50 hover:bg-green-100",
  },
  supervised: {
    symbol: "S",
    label: { en: "With Supervision", es: "Con Supervisión" },
    color: "text-blue-700",
    bg: "bg-blue-50 hover:bg-blue-100",
  },
  delegated: {
    symbol: "D",
    label: { en: "By Delegation", es: "Por Delegación" },
    color: "text-amber-700",
    bg: "bg-amber-50 hover:bg-amber-100",
  },
  prohibited: {
    symbol: "✕",
    label: { en: "Out of Scope", es: "Fuera de Alcance" },
    color: "text-red-600",
    bg: "bg-red-50/50 hover:bg-red-100/50",
  },
};

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  DelegationMatrix Component                                         */
/* ------------------------------------------------------------------ */

export function DelegationMatrix({
  roles,
  tasks,
  departments,
  title,
}: {
  roles: MatrixRole[];
  tasks: MatrixTask[];
  departments: { id: string; label: { en: string; es: string } }[];
  title?: { en: string; es: string };
}) {
  const locale = useLocale();
  const isEs = locale === "es";
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [selectedCell, setSelectedCell] = useState<{
    taskId: string;
    roleId: string;
  } | null>(null);

  // Filter tasks by department
  const filteredTasks = useMemo(() => {
    if (selectedDept === "all") return tasks;
    return tasks.filter((t) => t.department === selectedDept);
  }, [tasks, selectedDept]);

  // Get selected cell info
  const cellInfo = useMemo(() => {
    if (!selectedCell) return null;
    const task = tasks.find((t) => t.id === selectedCell.taskId);
    const role = roles.find((r) => r.id === selectedCell.roleId);
    const auth = task?.authorizations.find((a) => a.roleId === selectedCell.roleId);
    return { task, role, auth };
  }, [selectedCell, tasks, roles]);

  return (
    <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 px-6 py-5 text-white">
        <div className="flex items-center gap-2 mb-1">
          <Shield className="size-5 text-teal-400" />
          <h3 className="text-lg font-bold">
            {title
              ? t(title, locale)
              : isEs
                ? "Matriz de Delegación — Alcance de Práctica"
                : "Delegation Matrix — Scope of Practice"}
          </h3>
        </div>
        <p className="text-sm text-stone-400">
          {isEs
            ? "Haga clic en cualquier celda para ver la cita regulatoria y el contexto de FQHC"
            : "Click any cell to see the regulatory citation and FQHC context"}
        </p>
      </div>

      {/* Department filter */}
      <div className="px-6 py-3 border-b border-stone-100 bg-stone-50">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="size-3.5 text-stone-400" />
          <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
            {isEs ? "Departamento" : "Department"}:
          </span>
          <button
            onClick={() => setSelectedDept("all")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              selectedDept === "all"
                ? "bg-stone-900 text-white"
                : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-100"
            }`}
          >
            {isEs ? "Todos" : "All"}
          </button>
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDept(dept.id)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                selectedDept === dept.id
                  ? "bg-stone-900 text-white"
                  : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-100"
              }`}
            >
              {t(dept.label, locale)}
            </button>
          ))}
        </div>
      </div>

      {/* Matrix grid */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          {/* Role headers */}
          <thead>
            <tr className="border-b border-stone-200">
              <th className="sticky left-0 z-10 bg-white px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider w-48 min-w-48">
                {isEs ? "Tarea" : "Task"}
              </th>
              {roles.map((role) => (
                <th
                  key={role.id}
                  className="px-2 py-3 text-center text-xs font-bold text-stone-700 w-20 min-w-20"
                  title={t(role.title, locale)}
                >
                  <span className="block">{role.abbreviation}</span>
                  <span className="block text-[10px] font-normal text-stone-400 leading-tight mt-0.5">
                    {t(role.title, locale).split(" ")[0]}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          {/* Task rows */}
          <tbody>
            {filteredTasks.map((task, idx) => (
              <tr
                key={task.id}
                className={idx % 2 === 0 ? "bg-white" : "bg-stone-50/50"}
              >
                {/* Task name */}
                <td className="sticky left-0 z-10 px-4 py-2.5 text-sm text-stone-700 font-medium border-r border-stone-100"
                    style={{ backgroundColor: idx % 2 === 0 ? "white" : "rgb(250 250 249 / 0.5)" }}
                >
                  {t(task.task, locale)}
                </td>

                {/* Authorization cells */}
                {roles.map((role) => {
                  const auth = task.authorizations.find(
                    (a) => a.roleId === role.id
                  );
                  const level = auth?.level ?? "prohibited";
                  const meta = LEVEL_META[level];
                  const isSelected =
                    selectedCell?.taskId === task.id &&
                    selectedCell?.roleId === role.id;

                  return (
                    <td key={role.id} className="px-1 py-1.5 text-center">
                      <button
                        onClick={() =>
                          setSelectedCell(
                            isSelected
                              ? null
                              : { taskId: task.id, roleId: role.id }
                          )
                        }
                        className={`
                          inline-flex items-center justify-center w-10 h-10 rounded-lg text-sm font-bold transition-all
                          ${meta.bg} ${meta.color}
                          ${isSelected ? "ring-2 ring-stone-900 ring-offset-1 shadow-md scale-110" : ""}
                        `}
                        title={t(meta.label, locale)}
                      >
                        {meta.symbol}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="px-6 py-3 border-t border-stone-200 bg-stone-50">
        <div className="flex flex-wrap items-center gap-4">
          {(Object.entries(LEVEL_META) as [AuthorizationLevel, typeof LEVEL_META[AuthorizationLevel]][]).map(
            ([key, meta]) => (
              <div key={key} className="flex items-center gap-1.5">
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold ${meta.bg} ${meta.color}`}
                >
                  {meta.symbol}
                </span>
                <span className="text-xs text-stone-500">{t(meta.label, locale)}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Detail panel */}
      {cellInfo && cellInfo.task && cellInfo.role && cellInfo.auth && (
        <div className="border-t border-stone-200 bg-stone-50 px-6 py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-sm font-bold ${LEVEL_META[cellInfo.auth.level].bg} ${LEVEL_META[cellInfo.auth.level].color}`}
                >
                  {LEVEL_META[cellInfo.auth.level].symbol}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    {cellInfo.role.abbreviation}: {t(cellInfo.task.task, locale)}
                  </h4>
                  <p className="text-xs text-stone-500">
                    {t(LEVEL_META[cellInfo.auth.level].label, locale)}
                  </p>
                </div>
              </div>

              {/* Regulatory citation */}
              <div className="rounded-lg bg-white border border-stone-200 px-3 py-2 mb-2">
                <p className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-0.5">
                  {isEs ? "Cita Regulatoria" : "Regulatory Citation"}
                </p>
                <p className="text-sm text-stone-700 font-mono">
                  {cellInfo.auth.citation}
                </p>
              </div>

              {/* FQHC context note */}
              {cellInfo.auth.note && (
                <div className="flex items-start gap-1.5">
                  <Info className="size-3.5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {t(cellInfo.auth.note, locale)}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedCell(null)}
              className="rounded-md p-1 text-stone-400 hover:text-stone-600 hover:bg-stone-200/50 transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
