// Schedule Planner — Tetris-style weekly staff scheduling grid
// Phase 3C-D: Full planner with save/load/compare/export
"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Zap,
  ArrowRight,
  Plus,
  Save,
  Copy,
  Trash2,
  Users,
  BarChart3,
  Building2,
  Settings2,
  FolderOpen,
  GitCompareArrows,
  FileSpreadsheet,
  Edit3,
  Check,
  X,
} from "lucide-react";
import {
  SimulatorWizard,
  type WizardConfig,
} from "@/components/simulator/SimulatorWizard";
import { ScheduleGrid } from "@/components/schedule-planner/ScheduleGrid";
import { ScheduleMetricsPanel } from "@/components/schedule-planner/ScheduleMetricsPanel";
import { ScheduleCompare } from "@/components/schedule-planner/ScheduleCompare";
import {
  type WeeklySchedule,
  type DayOfWeek,
  type StaffRole,
  SIZE_PRESETS,
  ROLE_CONFIG,
  DAY_LABELS,
  DAYS_OF_WEEK,
  createScheduleFromPreset,
  createEmptySchedule,
  calculateScheduleMetrics,
  addStaffMember,
  removeStaffMember,
  addShiftAssignment,
  removeShiftAssignment,
  updateOperatingHours,
  loadSavedSchedules,
  saveSchedule,
  deleteSchedule,
  cloneSchedule,
  generateId,
} from "@/lib/schedule-planner-engine";
import { downloadScheduleAsExcel } from "@/lib/schedule-excel-export";

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function SchedulePlannerPage() {
  const locale = useLocale();
  const isEs = locale === "es";

  // Core state
  const [schedule, setSchedule] = useState<WeeklySchedule | null>(null);
  const [showSetup, setShowSetup] = useState(true);

  // Add staff modal
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [newStaffName, setNewStaffName] = useState("");
  const [newStaffRole, setNewStaffRole] = useState<StaffRole>("ma");

  // Saved schedules management
  const [savedSchedules, setSavedSchedules] = useState<WeeklySchedule[]>([]);
  const [showSavedList, setShowSavedList] = useState(false);

  // Schedule name editing
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState("");

  // Compare mode
  const [compareScheduleId, setCompareScheduleId] = useState<string | null>(null);
  const [showCompareSelect, setShowCompareSelect] = useState(false);

  // Wizard vs preset setup mode
  const [setupMode, setSetupMode] = useState<"wizard" | "presets">("wizard");

  // Load saved schedules on mount
  useEffect(() => {
    const saved = loadSavedSchedules();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSavedSchedules(saved.schedules);
    if (saved.activeScheduleId) {
      const active = saved.schedules.find((s) => s.id === saved.activeScheduleId);
      if (active) {
        setSchedule(active);
        setShowSetup(false);
      }
    }
  }, []);

  // Auto-save on changes
  useEffect(() => {
    if (schedule) {
      saveSchedule(schedule);
      // Refresh saved list
      const saved = loadSavedSchedules();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSavedSchedules(saved.schedules);
    }
  }, [schedule]);

  const metrics = useMemo(
    () => (schedule ? calculateScheduleMetrics(schedule) : null),
    [schedule],
  );

  // Find compare schedule
  const compareSchedule = useMemo(
    () => compareScheduleId ? savedSchedules.find((s) => s.id === compareScheduleId) || null : null,
    [compareScheduleId, savedSchedules],
  );

  // ---- Handlers ----
  const handleWizardComplete = useCallback((config: WizardConfig) => {
    // Map wizard size to schedule preset
    const sizeKey =
      config.size === "small" ? "small" : config.size === "large" ? "large" : "mid-size";
    const preset = SIZE_PRESETS.find((p) => p.id === sizeKey);
    if (!preset) return;
    const newSchedule = createScheduleFromPreset(preset);
    // Rename with org name if provided
    if (config.orgName) {
      newSchedule.name = config.orgName;
    }
    // Add BH staff if BH selected
    if (config.services.behavioralHealth) {
      const bhConfig = ROLE_CONFIG["bh"];
      const existing = newSchedule.staff.filter((s) => s.role === "bh");
      if (existing.length === 0) {
        const newMember = {
          id: generateId(),
          name: isEs ? "BH Proveedor" : "BH Provider",
          role: "bh" as const,
          fte: 1.0,
          hourlyRate: bhConfig.hourlyRate,
        };
        newSchedule.staff.push(newMember);
      }
    }
    // Extend hours for "maximize-revenue" priority
    if (config.priority === "maximize-revenue") {
      const days: DayOfWeek[] = ["mon", "tue", "wed", "thu", "fri"];
      for (const day of days) {
        newSchedule.operatingHours[day] = {
          ...newSchedule.operatingHours[day],
          close: 18,
        };
      }
      // Activate Saturday
      newSchedule.operatingHours.sat = {
        ...newSchedule.operatingHours.sat,
        active: true,
      };
    }
    setSchedule(newSchedule);
    setShowSetup(false);
  }, [isEs]);

  const handleWizardSkip = useCallback(() => {
    setSetupMode("presets");
  }, []);

  const handleStartFromPreset = useCallback((presetId: string) => {
    const preset = SIZE_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    const newSchedule = createScheduleFromPreset(preset);
    setSchedule(newSchedule);
    setShowSetup(false);
  }, []);

  const handleAddShift = useCallback(
    (staffId: string, day: DayOfWeek) => {
      if (!schedule) return;
      const hours = schedule.operatingHours[day];
      setSchedule(
        addShiftAssignment(schedule, {
          staffId,
          day,
          startHour: hours.open,
          endHour: hours.close,
          isOvertime: false,
          isOnCall: false,
        }),
      );
    },
    [schedule],
  );

  const handleRemoveShift = useCallback(
    (assignmentId: string) => {
      if (!schedule) return;
      setSchedule(removeShiftAssignment(schedule, assignmentId));
    },
    [schedule],
  );

  const handleAddStaff = useCallback(() => {
    if (!schedule || !newStaffName.trim()) return;
    const config = ROLE_CONFIG[newStaffRole];
    const updated = addStaffMember(schedule, {
      name: newStaffName.trim(),
      role: newStaffRole,
      fte: 1.0,
      hourlyRate: config.hourlyRate,
    });
    setSchedule(updated);
    setNewStaffName("");
    setShowAddStaff(false);
  }, [schedule, newStaffName, newStaffRole]);

  const handleRemoveStaff = useCallback(
    (staffId: string) => {
      if (!schedule) return;
      setSchedule(removeStaffMember(schedule, staffId));
    },
    [schedule],
  );

  const handleToggleDay = useCallback(
    (day: DayOfWeek) => {
      if (!schedule) return;
      const current = schedule.operatingHours[day];
      setSchedule(
        updateOperatingHours(schedule, day, { active: !current.active }),
      );
    },
    [schedule],
  );

  const handleNewSchedule = useCallback(() => {
    setSchedule(null);
    setShowSetup(true);
    setCompareScheduleId(null);
  }, []);

  const handleLoadSchedule = useCallback((s: WeeklySchedule) => {
    setSchedule(s);
    setShowSetup(false);
    setShowSavedList(false);
    setCompareScheduleId(null);
  }, []);

  const handleCloneSchedule = useCallback(() => {
    if (!schedule) return;
    const cloneName = isEs
      ? `${schedule.name} (copia)`
      : `${schedule.name} (copy)`;
    const cloned = cloneSchedule(schedule, cloneName);
    // Fix: remap staffIds in cloned assignments to match new staff IDs
    const staffIdMap = new Map<string, string>();
    schedule.staff.forEach((original, i) => {
      staffIdMap.set(original.id, cloned.staff[i].id);
    });
    cloned.assignments = cloned.assignments.map((a) => ({
      ...a,
      staffId: staffIdMap.get(a.staffId) || a.staffId,
    }));
    saveSchedule(cloned);
    setSchedule(cloned);
    const saved = loadSavedSchedules();
    setSavedSchedules(saved.schedules);
  }, [schedule, isEs]);

  const handleDeleteSchedule = useCallback((id: string) => {
    deleteSchedule(id);
    const saved = loadSavedSchedules();
    setSavedSchedules(saved.schedules);
    if (schedule?.id === id) {
      if (saved.schedules.length > 0) {
        setSchedule(saved.schedules[0]);
      } else {
        setSchedule(null);
        setShowSetup(true);
      }
    }
  }, [schedule]);

  const handleSaveName = useCallback(() => {
    if (!schedule || !editName.trim()) return;
    setSchedule({ ...schedule, name: editName.trim(), updatedAt: new Date().toISOString() });
    setIsEditingName(false);
  }, [schedule, editName]);

  const handleExportExcel = useCallback(() => {
    if (!schedule) return;
    downloadScheduleAsExcel(schedule, locale);
  }, [schedule, locale]);

  // ---- SETUP SCREEN ----
  if (showSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white dark:from-stone-950 dark:to-stone-900">
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 mb-8">
            <Link href="/strategy/guides" className="hover:text-teal-600 transition-colors">
              {isEs ? "Estrategia" : "Strategy"}
            </Link>
            <span>/</span>
            <span className="text-stone-700 dark:text-stone-300">
              {isEs ? "Planificador de Horarios" : "Schedule Planner"}
            </span>
          </div>

          {/* Hero */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
              <Calendar className="h-3 w-3 mr-1" />
              {isEs ? "Herramienta Interactiva" : "Interactive Tool"}
            </Badge>

            <h1 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100 mb-4">
              {isEs
                ? "Planificador de Horarios FQHC"
                : "FQHC Schedule Planner"}
            </h1>
            <p className="text-lg text-stone-500 dark:text-stone-400 max-w-2xl mx-auto mb-4">
              {isEs
                ? "Construye el horario semanal óptimo de tu clínica. Visualiza la cobertura de personal, ratios MA:proveedor, impacto en ingresos y alertas de dotación — todo en tiempo real."
                : "Build your clinic's optimal weekly schedule. Visualize staff coverage, MA:provider ratios, revenue impact, and staffing warnings — all in real time."}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-stone-400 mb-8">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" /> {isEs ? "Todas las posiciones" : "All roles"}
              </span>
              <span className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4" /> {isEs ? "Métricas en vivo" : "Live metrics"}
              </span>
              <span className="flex items-center gap-1">
                <Save className="h-4 w-4" /> {isEs ? "Guardar y comparar" : "Save & compare"}
              </span>
            </div>
          </div>

          {/* Wizard Setup */}
          {setupMode === "wizard" && savedSchedules.length === 0 && (
            <div className="mb-12">
              <SimulatorWizard
                onComplete={handleWizardComplete}
                onSkip={handleWizardSkip}
                locale={locale}
              />
            </div>
          )}

          {/* Saved Schedules (if any) */}
          {savedSchedules.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100 text-center mb-6">
                {isEs ? "Tus Horarios Guardados" : "Your Saved Schedules"}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-6">
                {savedSchedules.map((s) => {
                  const m = calculateScheduleMetrics(s);
                  return (
                    <Card
                      key={s.id}
                      className="border-stone-200 dark:border-stone-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all cursor-pointer group"
                      onClick={() => handleLoadSchedule(s)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-stone-800 dark:text-stone-200 text-sm truncate">
                            {s.name}
                          </h3>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSchedule(s.id);
                            }}
                            className="text-stone-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                            title={isEs ? "Eliminar" : "Delete"}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-stone-500">
                          <span>{m.totalStaff} {isEs ? "personal" : "staff"}</span>
                          <span>{m.totalWeeklyEncounters} enc/wk</span>
                        </div>
                        <p className="text-[10px] text-stone-400 mt-1">
                          {isEs ? "Modificado" : "Modified"}: {new Date(s.updatedAt).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-200 dark:border-stone-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-stone-900 px-3 text-stone-400">
                    {isEs ? "o crea uno nuevo" : "or create new"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Start Presets — show when wizard is skipped or there are saved schedules */}
          {(setupMode === "presets" || savedSchedules.length > 0) && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100 text-center mb-6">
              {isEs ? "Inicio Rápido — Elige un Tamaño" : "Quick Start — Choose a Size"}
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {SIZE_PRESETS.map((preset) => {
                const staffCount = preset.staff.length;
                const providers = preset.staff.filter(
                  (s) => ROLE_CONFIG[s.role].isProvider && ROLE_CONFIG[s.role].group === "provider",
                ).length;
                const mas = preset.staff.filter((s) => s.role === "ma").length;

                return (
                  <Card
                    key={preset.id}
                    className="border-stone-200 dark:border-stone-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => handleStartFromPreset(preset.id)}
                  >
                    <CardContent className="p-5 text-center">
                      <Building2 className="h-8 w-8 text-indigo-500 mx-auto mb-3" />
                      <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-1">
                        {isEs ? preset.label.es : preset.label.en}
                      </h3>
                      <div className="flex items-center justify-center gap-3 text-xs text-stone-500 mb-3">
                        <span>{staffCount} {isEs ? "personal" : "staff"}</span>
                        <span>{providers} {isEs ? "proveedores" : "providers"}</span>
                        <span>{mas} MAs</span>
                      </div>
                      <p className="text-xs text-stone-400 mb-3">
                        ${preset.ppsRate} PPS · {(preset.noShowRate * 100).toFixed(0)}% {isEs ? "citas perdidas" : "no-show"}
                      </p>
                      <Button
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                        size="sm"
                      >
                        {isEs ? "Seleccionar" : "Select"}
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
          )}

          {/* Or start empty */}
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => {
                setSchedule(createEmptySchedule(isEs ? "Mi Horario" : "My Schedule"));
                setShowSetup(false);
              }}
            >
              <Plus className="h-4 w-4 mr-1" />
              {isEs ? "Comenzar desde Cero" : "Start from Scratch"}
            </Button>
          </div>

          {/* Cross-links */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <Link href="/strategy/clinic-simulator">
              <Card className="border-stone-200 dark:border-stone-700 hover:border-teal-300 transition-all">
                <CardContent className="p-4 flex items-center gap-3">
                  <BarChart3 className="h-8 w-8 text-teal-500 shrink-0" />
                  <div>
                    <p className="font-medium text-stone-800 dark:text-stone-200 text-sm">
                      {isEs ? "Simulador de Clínica" : "Clinic Simulator"}
                    </p>
                    <p className="text-xs text-stone-500">
                      {isEs
                        ? "Modela ingresos y costos para tu configuración de personal"
                        : "Model revenue and costs for your staffing configuration"}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-stone-400 shrink-0" />
                </CardContent>
              </Card>
            </Link>
            <Link href="/academy/clinic-manager">
              <Card className="border-stone-200 dark:border-stone-700 hover:border-indigo-300 transition-all">
                <CardContent className="p-4 flex items-center gap-3">
                  <Zap className="h-8 w-8 text-indigo-500 shrink-0" />
                  <div>
                    <p className="font-medium text-stone-800 dark:text-stone-200 text-sm">
                      {isEs ? "Clase Magistral de Gerente" : "Manager Master Class"}
                    </p>
                    <p className="text-xs text-stone-500">
                      {isEs
                        ? "Aprende las mejores prácticas de programación"
                        : "Learn scheduling best practices"}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-stone-400 shrink-0" />
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ---- MAIN PLANNER VIEW ----
  if (!schedule || !metrics) return null;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-700 px-4 py-3">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Calendar className="h-5 w-5 text-indigo-600 shrink-0" />
            <div className="min-w-0">
              {isEditingName ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveName();
                      if (e.key === "Escape") setIsEditingName(false);
                    }}
                    className="text-sm font-bold text-stone-800 dark:text-stone-200 bg-transparent border-b border-indigo-400 outline-none w-40"
                    autoFocus
                  />
                  <button onClick={handleSaveName} className="text-green-600 hover:text-green-700">
                    <Check className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => setIsEditingName(false)} className="text-stone-400 hover:text-stone-600">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <h1 className="text-sm font-bold text-stone-800 dark:text-stone-200 truncate">
                    {schedule.name}
                  </h1>
                  <button
                    onClick={() => { setEditName(schedule.name); setIsEditingName(true); }}
                    className="text-stone-300 hover:text-stone-500 transition-colors"
                  >
                    <Edit3 className="h-3 w-3" />
                  </button>
                </div>
              )}
              <p className="text-[10px] text-stone-400">
                {metrics.totalStaff} {isEs ? "personal" : "staff"} · {metrics.totalWeeklyEncounters} {isEs ? "encuentros/sem" : "encounters/wk"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Add Staff */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddStaff(true)}
            >
              <Plus className="h-3.5 w-3.5 sm:mr-1" />
              <span className="hidden sm:inline">{isEs ? "Personal" : "Staff"}</span>
            </Button>

            {/* Clone */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleCloneSchedule}
              title={isEs ? "Duplicar horario" : "Clone schedule"}
            >
              <Copy className="h-3.5 w-3.5 sm:mr-1" />
              <span className="hidden md:inline">{isEs ? "Duplicar" : "Clone"}</span>
            </Button>

            {/* Compare */}
            {savedSchedules.length >= 2 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCompareSelect(!showCompareSelect)}
                className={compareScheduleId ? "border-indigo-300 text-indigo-600" : ""}
              >
                <GitCompareArrows className="h-3.5 w-3.5 sm:mr-1" />
                <span className="hidden md:inline">{isEs ? "Comparar" : "Compare"}</span>
              </Button>
            )}

            {/* Export Excel */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportExcel}
              title={isEs ? "Exportar a Excel" : "Export to Excel"}
            >
              <FileSpreadsheet className="h-3.5 w-3.5 sm:mr-1" />
              <span className="hidden md:inline">Excel</span>
            </Button>

            {/* Saved schedules */}
            {savedSchedules.length > 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSavedList(!showSavedList)}
              >
                <FolderOpen className="h-3.5 w-3.5 sm:mr-1" />
                <span className="hidden md:inline">{savedSchedules.length}</span>
              </Button>
            )}

            {/* New Schedule */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleNewSchedule}
            >
              <Settings2 className="h-3.5 w-3.5 sm:mr-1" />
              <span className="hidden sm:inline">{isEs ? "Nuevo" : "New"}</span>
            </Button>
          </div>
        </div>

        {/* Compare schedule picker dropdown */}
        {showCompareSelect && (
          <div className="max-w-[1400px] mx-auto mt-2 pb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-stone-500">
                {isEs ? "Comparar con:" : "Compare with:"}
              </span>
              {savedSchedules
                .filter((s) => s.id !== schedule.id)
                .map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setCompareScheduleId(s.id === compareScheduleId ? null : s.id);
                      setShowCompareSelect(false);
                    }}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                      s.id === compareScheduleId
                        ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                        : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400 hover:bg-stone-200"
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              {compareScheduleId && (
                <button
                  onClick={() => { setCompareScheduleId(null); setShowCompareSelect(false); }}
                  className="text-xs text-stone-400 hover:text-red-500"
                >
                  {isEs ? "Cancelar" : "Clear"}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Saved schedules dropdown */}
        {showSavedList && (
          <div className="max-w-[1400px] mx-auto mt-2 pb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-stone-500">
                {isEs ? "Horarios guardados:" : "Saved schedules:"}
              </span>
              {savedSchedules.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleLoadSchedule(s)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                    s.id === schedule.id
                      ? "bg-indigo-600 text-white"
                      : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400 hover:bg-stone-200"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Grid */}
          <div className="flex-1 min-w-0">
            {/* Operating hours toggles */}
            <div className="mb-4 flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                {isEs ? "Días activos:" : "Active days:"}
              </span>
              {DAYS_OF_WEEK.map((day) => {
                const active = schedule.operatingHours[day].active;
                return (
                  <button
                    key={day}
                    onClick={() => handleToggleDay(day)}
                    className={`rounded-md px-2 py-1 text-xs font-medium transition-all ${
                      active
                        ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                        : "bg-stone-100 text-stone-400 dark:bg-stone-800 dark:text-stone-600"
                    }`}
                  >
                    {DAY_LABELS[day].short}
                  </button>
                );
              })}
            </div>

            {/* The Grid */}
            <Card>
              <CardContent className="p-2 sm:p-4">
                {schedule.staff.length === 0 ? (
                  <div className="py-12 text-center text-stone-400">
                    <Users className="h-10 w-10 mx-auto mb-3 text-stone-300" />
                    <p className="text-sm font-medium mb-2">
                      {isEs ? "Sin personal agregado" : "No staff added yet"}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowAddStaff(true)}
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      {isEs ? "Agregar Personal" : "Add Staff"}
                    </Button>
                  </div>
                ) : (
                  <ScheduleGrid
                    schedule={schedule}
                    onAddShift={handleAddShift}
                    onRemoveShift={handleRemoveShift}
                  />
                )}
              </CardContent>
            </Card>

            {/* Staff Management (compact list) */}
            {schedule.staff.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                    {isEs ? "Lista de Personal" : "Staff Roster"} ({schedule.staff.length})
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAddStaff(true)}
                    className="text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {isEs ? "Agregar" : "Add"}
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {schedule.staff.map((member) => {
                    const config = ROLE_CONFIG[member.role];
                    return (
                      <div
                        key={member.id}
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ${config.color} ${config.textColor}`}
                      >
                        <span className="font-bold">{config.shortLabel}</span>
                        <span className="font-medium">{member.name}</span>
                        <button
                          onClick={() => handleRemoveStaff(member.id)}
                          className="hover:text-red-600 transition-colors ml-0.5"
                          title={isEs ? "Remover" : "Remove"}
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Comparison panel */}
            {compareSchedule && (
              <div className="mt-6">
                <ScheduleCompare
                  schedule1={schedule}
                  schedule2={compareSchedule}
                  onClose={() => setCompareScheduleId(null)}
                />
              </div>
            )}
          </div>

          {/* Metrics Sidebar */}
          <div className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-20">
              <ScheduleMetricsPanel
                metrics={metrics}
                ppsRate={schedule.ppsRate}
              />

              {/* Export buttons in sidebar */}
              <div className="mt-4 space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  onClick={handleExportExcel}
                >
                  <FileSpreadsheet className="h-3.5 w-3.5 mr-1.5" />
                  {isEs ? "Exportar a Excel" : "Export to Excel"}
                </Button>
              </div>

              {/* Saved count */}
              <div className="mt-3 text-center text-[10px] text-stone-400">
                {savedSchedules.length}/5 {isEs ? "horarios guardados" : "schedules saved"}
                {savedSchedules.length >= 5 && (
                  <span className="text-amber-500 ml-1">
                    ({isEs ? "máximo" : "max"})
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Staff Modal */}
      {showAddStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-4">
                {isEs ? "Agregar Personal" : "Add Staff Member"}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                    {isEs ? "Nombre" : "Name"}
                  </label>
                  <input
                    type="text"
                    value={newStaffName}
                    onChange={(e) => setNewStaffName(e.target.value)}
                    placeholder={isEs ? "Ej: Dr. García" : "e.g., Dr. Garcia"}
                    className="w-full rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 px-3 py-2 text-sm text-stone-800 dark:text-stone-200 focus:ring-2 focus:ring-indigo-500"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddStaff();
                    }}
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                    {isEs ? "Rol" : "Role"}
                  </label>
                  <select
                    value={newStaffRole}
                    onChange={(e) => setNewStaffRole(e.target.value as StaffRole)}
                    className="w-full rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 px-3 py-2 text-sm text-stone-800 dark:text-stone-200 focus:ring-2 focus:ring-indigo-500"
                  >
                    {(Object.entries(ROLE_CONFIG) as [StaffRole, typeof ROLE_CONFIG[StaffRole]][]).map(
                      ([id, config]) => (
                        <option key={id} value={id}>
                          {isEs ? config.label.es : config.label.en} (${config.hourlyRate}/hr)
                        </option>
                      ),
                    )}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowAddStaff(false);
                    setNewStaffName("");
                  }}
                >
                  {isEs ? "Cancelar" : "Cancel"}
                </Button>
                <Button
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                  disabled={!newStaffName.trim()}
                  onClick={handleAddStaff}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {isEs ? "Agregar" : "Add"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
