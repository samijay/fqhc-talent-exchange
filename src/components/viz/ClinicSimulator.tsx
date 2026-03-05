// ClinicSimulator — interactive staffing, scheduling & revenue model for CA FQHCs
"use client";

import { useState, useMemo, useCallback } from "react";
import { useLocale } from "next-intl";
import {
  ChevronDown,
  ChevronUp,
  Users,
  Clock,
  DollarSign,
  Activity,
  TrendingUp,
  Info,
  Building2,
  Stethoscope,
} from "lucide-react";
import {
  calculateSimulation,
  SIZE_PRESETS,
  STAFF_COSTS,
  formatCurrency,
  type SimulatorInputs,
  type StaffingInput,
  type ScheduleInput,
  type RevenueInput,
  type DiseaseInput,
} from "@/lib/clinic-operations-model";

/* ------------------------------------------------------------------ */
/*  Bilingual helper                                                   */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

/* ------------------------------------------------------------------ */
/*  Slider component (reused throughout)                               */
/* ------------------------------------------------------------------ */

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
  gradient = "from-stone-200 to-teal-300",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
  gradient?: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label className="text-sm font-medium text-stone-700">{label}</label>
        <span className="text-sm font-bold text-teal-700">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`h-2 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r ${gradient} [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-stone-800 [&::-webkit-slider-thumb]:shadow-md`}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Collapsible section wrapper                                        */
/* ------------------------------------------------------------------ */

function Section({
  title,
  icon: Icon,
  summary,
  defaultOpen = false,
  children,
}: {
  title: string;
  icon: React.ElementType;
  summary: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-stone-200 bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-4"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
            <Icon className="size-4" />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-bold text-stone-900">{title}</h4>
            {!open && (
              <p className="text-xs text-stone-500">{summary}</p>
            )}
          </div>
        </div>
        {open ? (
          <ChevronUp className="size-4 text-stone-400" />
        ) : (
          <ChevronDown className="size-4 text-stone-400" />
        )}
      </button>
      {open && <div className="space-y-4 border-t border-stone-100 px-4 pb-4 pt-3">{children}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function ClinicSimulator() {
  const locale = useLocale();
  const isEs = locale === "es";

  // Size preset
  const [sizePreset, setSizePreset] = useState<"mid-size" | "small" | "large" | "custom">(
    "mid-size"
  );

  // Initialize from mid-size preset (real FQHC data)
  const defaultPreset = SIZE_PRESETS[0];
  const [staffing, setStaffing] = useState<StaffingInput>(defaultPreset.staffing);
  const [schedule, setSchedule] = useState<ScheduleInput>(defaultPreset.schedule);
  const [revenue, setRevenue] = useState<RevenueInput>(defaultPreset.revenue);
  const [disease, setDisease] = useState<DiseaseInput>(defaultPreset.disease);

  // Apply preset
  const applyPreset = useCallback(
    (size: "mid-size" | "small" | "large") => {
      const preset = SIZE_PRESETS.find((p) => p.id === size) ?? SIZE_PRESETS[0];
      setStaffing(preset.staffing);
      setSchedule(preset.schedule);
      setRevenue(preset.revenue);
      setDisease(preset.disease);
      setSizePreset(size);
    },
    []
  );

  // Helpers to update nested state
  const updateStaffing = useCallback(
    (key: keyof StaffingInput, val: number) => {
      setStaffing((prev) => ({ ...prev, [key]: val }));
      setSizePreset("custom");
    },
    []
  );
  const updateSchedule = useCallback(
    (key: keyof ScheduleInput, val: number) => {
      setSchedule((prev) => ({ ...prev, [key]: val }));
      setSizePreset("custom");
    },
    []
  );
  const updateRevenue = useCallback(
    (key: keyof RevenueInput, val: number) => {
      setRevenue((prev) => ({ ...prev, [key]: val }));
      setSizePreset("custom");
    },
    []
  );
  const updateDisease = useCallback(
    (key: keyof DiseaseInput, val: number) => {
      setDisease((prev) => ({ ...prev, [key]: val }));
      setSizePreset("custom");
    },
    []
  );

  // Calculate results
  const inputs: SimulatorInputs = useMemo(
    () => ({ staffing, schedule, revenue, disease, sizePreset: sizePreset === "custom" ? "mid-size" : sizePreset }),
    [staffing, schedule, revenue, disease, sizePreset]
  );
  const results = useMemo(() => calculateSimulation(inputs), [inputs]);

  // Staffing summary
  const staffSummary = `${staffing.physicians} MD, ${staffing.nps} NP, ${staffing.pas} PA, ${staffing.rns} RN, ${staffing.mas} MA, ${staffing.bhProviders} BH`;

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-stone-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 px-6 py-5 text-white">
        <div className="mb-1 flex items-center gap-2">
          <Stethoscope className="size-5 text-teal-400" />
          <h3 className="text-lg font-bold">
            {isEs
              ? "Simulador de Operaciones Clínicas"
              : "Clinic Operations Simulator"}
          </h3>
        </div>
        <p className="text-sm text-stone-400">
          {isEs
            ? "Modele dotación de personal, horarios e ingresos para su FQHC en California"
            : "Model staffing, scheduling, and revenue for your California FQHC"}
        </p>
      </div>

      <div className="p-4 sm:p-6">
        {/* Size Preset Toggle */}
        <div className="mb-6">
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-500">
            {isEs ? "Tamaño del FQHC" : "FQHC Size"}
          </label>
          <div className="flex flex-wrap gap-2">
            {(["mid-size", "small", "large", "custom"] as const).map((size) => (
              <button
                key={size}
                onClick={() =>
                  size === "custom"
                    ? setSizePreset("custom")
                    : applyPreset(size)
                }
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  sizePreset === size
                    ? "bg-teal-700 text-white"
                    : "bg-white text-stone-600 hover:bg-stone-100"
                }`}
              >
                {size === "mid-size"
                  ? isEs
                    ? "Mediano (~240)"
                    : "Mid-Size (~240)"
                  : size === "small"
                    ? isEs
                      ? "Pequeño (~250)"
                      : "Small (~250)"
                    : size === "large"
                      ? isEs
                        ? "Grande (~1,000)"
                        : "Large (~1,000)"
                      : isEs
                        ? "Personalizado"
                        : "Custom"}
              </button>
            ))}
          </div>
        </div>

        {/* Slider Sections */}
        <div className="space-y-3">
          {/* Staffing */}
          <Section
            title={isEs ? "Dotación de Personal" : "Staffing"}
            icon={Users}
            summary={staffSummary}
            defaultOpen
          >
            {(
              [
                ["physicians", 0, 40, 1, `${staffing.physicians} ${isEs ? "Médicos" : "MDs"}`],
                ["nps", 0, 30, 1, `${staffing.nps} NPs`],
                ["pas", 0, 20, 1, `${staffing.pas} PAs`],
                ["rns", 0, 80, 1, `${staffing.rns} RNs`],
                ["mas", 0, 120, 5, `${staffing.mas} MAs`],
                ["chws", 0, 50, 1, `${staffing.chws} CHWs`],
                ["bhProviders", 0, 25, 1, `${staffing.bhProviders} ${isEs ? "Proveedores BH" : "BH Providers"}`],
              ] as [keyof StaffingInput, number, number, number, string][]
            ).map(([key, min, max, step, display]) => (
              <Slider
                key={key}
                label={t(STAFF_COSTS[key].label, locale)}
                value={staffing[key]}
                min={min}
                max={max}
                step={step}
                display={display}
                onChange={(v) => updateStaffing(key, v)}
              />
            ))}
          </Section>

          {/* Schedule */}
          <Section
            title={isEs ? "Horario" : "Schedule"}
            icon={Clock}
            summary={`${schedule.hoursPerDay}h/day, ${schedule.daysPerWeek} days, ${schedule.encountersPerProviderPerDay} enc/provider, ${schedule.noShowRate}% no-show`}
          >
            <Slider
              label={isEs ? "Horas por día" : "Hours per Day"}
              value={schedule.hoursPerDay}
              min={6}
              max={14}
              step={1}
              display={`${schedule.hoursPerDay}h`}
              onChange={(v) => updateSchedule("hoursPerDay", v)}
            />
            <Slider
              label={isEs ? "Días por semana" : "Days per Week"}
              value={schedule.daysPerWeek}
              min={4}
              max={7}
              step={1}
              display={`${schedule.daysPerWeek}`}
              onChange={(v) => updateSchedule("daysPerWeek", v)}
            />
            <Slider
              label={isEs ? "Encuentros por proveedor/día" : "Encounters per Provider/Day"}
              value={schedule.encountersPerProviderPerDay}
              min={8}
              max={28}
              step={1}
              display={`${schedule.encountersPerProviderPerDay}`}
              onChange={(v) =>
                updateSchedule("encountersPerProviderPerDay", v)
              }
            />
            <Slider
              label={isEs ? "Tasa de inasistencia" : "No-Show Rate"}
              value={schedule.noShowRate}
              min={0}
              max={30}
              step={1}
              display={`${schedule.noShowRate}%`}
              gradient="from-teal-200 to-red-200"
              onChange={(v) => updateSchedule("noShowRate", v)}
            />
          </Section>

          {/* Revenue & Visit Mix */}
          <Section
            title={isEs ? "Ingresos y Mezcla de Visitas" : "Revenue & Visit Mix"}
            icon={DollarSign}
            summary={`$${revenue.ppsRate} PPS, ${revenue.coVisitRate}% co-visit, ${revenue.bhSameDayRate}% BH, ${revenue.ecmEnrollmentRate}% ECM`}
          >
            <Slider
              label={isEs ? "Tarifa PPS por encuentro" : "PPS Rate per Encounter"}
              value={revenue.ppsRate}
              min={150}
              max={400}
              step={5}
              display={`$${revenue.ppsRate}`}
              onChange={(v) => updateRevenue("ppsRate", v)}
            />
            <Slider
              label={isEs ? "Tasa de co-visita RN (Modelo B)" : "RN Co-Visit Rate (Model B)"}
              value={revenue.coVisitRate}
              min={0}
              max={40}
              step={1}
              display={`${revenue.coVisitRate}%`}
              onChange={(v) => updateRevenue("coVisitRate", v)}
            />
            <Slider
              label={isEs ? "Tasa de BH mismo día" : "BH Same-Day Rate"}
              value={revenue.bhSameDayRate}
              min={0}
              max={30}
              step={1}
              display={`${revenue.bhSameDayRate}%`}
              onChange={(v) => updateRevenue("bhSameDayRate", v)}
            />
            <Slider
              label={isEs ? "Inscripción ECM" : "ECM Enrollment"}
              value={revenue.ecmEnrollmentRate}
              min={0}
              max={20}
              step={1}
              display={`${revenue.ecmEnrollmentRate}%`}
              onChange={(v) => updateRevenue("ecmEnrollmentRate", v)}
            />
          </Section>

          {/* Disease Management */}
          <Section
            title={
              isEs ? "Manejo de Enfermedades" : "Disease Management"
            }
            icon={Activity}
            summary={`${disease.diabeticPercent}% diabetes, ${disease.htnPercent}% HTN, ${disease.depressionPercent}% depression`}
          >
            <Slider
              label={isEs ? "Panel diabético" : "Diabetic Panel"}
              value={disease.diabeticPercent}
              min={0}
              max={40}
              step={1}
              display={`${disease.diabeticPercent}%`}
              onChange={(v) => updateDisease("diabeticPercent", v)}
            />
            <Slider
              label={isEs ? "Panel hipertensión" : "Hypertension Panel"}
              value={disease.htnPercent}
              min={0}
              max={50}
              step={1}
              display={`${disease.htnPercent}%`}
              onChange={(v) => updateDisease("htnPercent", v)}
            />
            <Slider
              label={isEs ? "Depresión (positivo)" : "Depression (Positive)"}
              value={disease.depressionPercent}
              min={0}
              max={30}
              step={1}
              display={`${disease.depressionPercent}%`}
              onChange={(v) => updateDisease("depressionPercent", v)}
            />
            <Slider
              label={isEs ? "EPOC" : "COPD"}
              value={disease.copdPercent}
              min={0}
              max={15}
              step={1}
              display={`${disease.copdPercent}%`}
              onChange={(v) => updateDisease("copdPercent", v)}
            />
          </Section>
        </div>

        {/* ============================================================ */}
        {/*  OUTPUT DASHBOARD                                             */}
        {/* ============================================================ */}
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-bold text-stone-900">
            {isEs ? "Resultados del Modelo" : "Model Results"}
          </h3>

          {/* Revenue Summary */}
          <div className="rounded-xl border border-teal-200 bg-teal-50 p-5">
            <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                {
                  label: isEs ? "Ingresos Anuales" : "Annual Revenue",
                  value: formatCurrency(results.totalAnnualRevenue),
                  color: "text-teal-700",
                },
                {
                  label: isEs ? "Costo Anual" : "Annual Cost",
                  value: formatCurrency(results.totalAnnualCost),
                  color: "text-stone-700",
                },
                {
                  label: isEs ? "Margen Neto" : "Net Margin",
                  value: formatCurrency(results.netMargin),
                  color:
                    results.netMargin >= 0 ? "text-teal-700" : "text-red-700",
                },
                {
                  label: isEs ? "% Margen" : "Margin %",
                  value: `${results.netMarginPercent.toFixed(1)}%`,
                  color:
                    results.netMarginPercent >= 0
                      ? "text-teal-700"
                      : "text-red-700",
                },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs text-stone-500">{item.label}</p>
                  <p className={`text-xl font-bold ${item.color}`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Revenue Breakdown Bar */}
            <div className="mb-3">
              <p className="mb-1 text-xs font-medium text-stone-600">
                {isEs ? "Desglose de Ingresos" : "Revenue Breakdown"}
              </p>
              <div className="flex h-6 overflow-hidden rounded-full">
                {[
                  {
                    label: "PPS",
                    value: results.basePPSRevenue,
                    color: "bg-teal-600",
                  },
                  {
                    label: isEs ? "Co-Visita" : "Co-Visit",
                    value: results.coVisitRevenue,
                    color: "bg-teal-400",
                  },
                  {
                    label: "BH",
                    value: results.bhRevenue,
                    color: "bg-amber-500",
                  },
                  { label: "ECM", value: results.ecmRevenue, color: "bg-purple-500" },
                  { label: "CCM", value: results.ccmRevenue, color: "bg-blue-500" },
                ]
                  .filter((s) => s.value > 0)
                  .map((source) => (
                    <div
                      key={source.label}
                      className={`${source.color} transition-all duration-300`}
                      style={{
                        width: `${(source.value / results.totalAnnualRevenue) * 100}%`,
                      }}
                      title={`${source.label}: ${formatCurrency(source.value)}`}
                    />
                  ))}
              </div>
              <div className="mt-1 flex flex-wrap gap-3 text-[10px] text-stone-500">
                {[
                  { label: "PPS", color: "bg-teal-600", value: results.basePPSRevenue },
                  { label: isEs ? "Co-Visita" : "Co-Visit", color: "bg-teal-400", value: results.coVisitRevenue },
                  { label: "BH", color: "bg-amber-500", value: results.bhRevenue },
                  { label: "ECM", color: "bg-purple-500", value: results.ecmRevenue },
                  { label: "CCM", color: "bg-blue-500", value: results.ccmRevenue },
                ]
                  .filter((s) => s.value > 0)
                  .map((s) => (
                    <span key={s.label} className="flex items-center gap-1">
                      <span
                        className={`inline-block size-2 rounded-full ${s.color}`}
                      />
                      {s.label}: {formatCurrency(s.value)}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          {/* Volume & Efficiency */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-stone-200 bg-white p-4">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-stone-700">
                <TrendingUp className="size-4 text-teal-600" />
                {isEs ? "Volumen de Encuentros" : "Encounter Volume"}
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-500">
                    {isEs ? "Proveedores facturables" : "Billable Providers"}
                  </span>
                  <span className="font-bold text-stone-900">
                    {results.billableProvidersCount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">
                    {isEs ? "Encuentros/día" : "Encounters/Day"}
                  </span>
                  <span className="font-bold text-stone-900">
                    {Math.round(results.totalEncountersPerDay)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">
                    {isEs ? "Encuentros/mes" : "Encounters/Month"}
                  </span>
                  <span className="font-bold text-stone-900">
                    {Math.round(results.totalEncountersPerMonth).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">
                    {isEs ? "Encuentros/año" : "Encounters/Year"}
                  </span>
                  <span className="font-bold text-stone-900">
                    {Math.round(results.totalEncountersPerYear).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between border-t border-stone-100 pt-2">
                  <span className="text-stone-500">
                    {isEs ? "+ Co-Visitas/año" : "+ Co-Visits/Year"}
                  </span>
                  <span className="font-bold text-teal-700">
                    +{Math.round(results.coVisitEncountersPerYear).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">
                    {isEs ? "+ BH mismo día/año" : "+ BH Same-Day/Year"}
                  </span>
                  <span className="font-bold text-amber-600">
                    +{Math.round(results.bhEncountersPerYear).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-stone-700">
                <DollarSign className="size-4 text-teal-600" />
                {isEs ? "Eficiencia" : "Efficiency"}
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-500">
                    {isEs ? "Costo por encuentro" : "Cost per Encounter"}
                  </span>
                  <span className="font-bold text-stone-900">
                    ${Math.round(results.costPerEncounter)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">
                    {isEs ? "Ingreso por encuentro" : "Revenue per Encounter"}
                  </span>
                  <span className="font-bold text-teal-700">
                    ${Math.round(results.revenuePerEncounter)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">
                    {isEs ? "Ingreso por proveedor" : "Revenue per Provider"}
                  </span>
                  <span className="font-bold text-stone-900">
                    {formatCurrency(results.revenuePerProvider)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-stone-100 pt-2">
                  <span className="text-stone-500">
                    {isEs ? "Nómina anual" : "Annual Payroll"}
                  </span>
                  <span className="font-bold text-stone-900">
                    {formatCurrency(results.annualPayroll)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">
                    {isEs ? "Gastos generales" : "Overhead"}
                  </span>
                  <span className="font-bold text-stone-900">
                    {formatCurrency(results.annualOverhead)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Provider-of-the-Day Analysis */}
          <div className="rounded-xl border-2 border-amber-200 bg-amber-50/50 p-5">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-amber-800">
              <Building2 className="size-4" />
              {isEs
                ? "Análisis: Proveedor del Día"
                : "Analysis: Provider-of-the-Day Model"}
            </h4>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Scenario A */}
              <div className="rounded-lg bg-white p-4">
                <p className="mb-1 text-xs font-bold text-stone-500">
                  {isEs ? "ESCENARIO A" : "SCENARIO A"}
                </p>
                <p className="text-sm font-medium text-stone-700">
                  {t(results.potd.scenarioA.label, locale)}
                </p>
                <div className="mt-3 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone-500">
                      {isEs ? "Encuentros/día" : "Encounters/Day"}
                    </span>
                    <span className="font-bold">
                      {results.potd.scenarioA.encountersPerDay}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">
                      {isEs ? "Ingresos/día" : "Revenue/Day"}
                    </span>
                    <span className="font-bold">
                      ${results.potd.scenarioA.revenuePerDay.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">
                      {isEs ? "Ingresos/año" : "Revenue/Year"}
                    </span>
                    <span className="font-bold">
                      {formatCurrency(results.potd.scenarioA.revenuePerYear)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Scenario B */}
              <div className="rounded-lg bg-white p-4 ring-2 ring-amber-300">
                <p className="mb-1 text-xs font-bold text-amber-600">
                  {isEs ? "ESCENARIO B" : "SCENARIO B"}
                </p>
                <p className="text-sm font-medium text-stone-700">
                  {t(results.potd.scenarioB.label, locale)}
                </p>
                <div className="mt-3 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone-500">
                      {isEs ? "RNs apoyados" : "RNs Supported"}
                    </span>
                    <span className="font-bold">
                      {results.potd.scenarioB.rnsSupported}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">
                      {isEs ? "Encuentros/día" : "Encounters/Day"}
                    </span>
                    <span className="font-bold text-amber-700">
                      {results.potd.scenarioB.encountersPerDay}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">
                      {isEs ? "Ingresos/día" : "Revenue/Day"}
                    </span>
                    <span className="font-bold text-amber-700">
                      ${results.potd.scenarioB.revenuePerDay.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">
                      {isEs ? "Ingresos/año" : "Revenue/Year"}
                    </span>
                    <span className="font-bold text-amber-700">
                      {formatCurrency(results.potd.scenarioB.revenuePerYear)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* POTD Key Metrics */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-white p-3 text-center">
                <p className="text-xs text-stone-500">
                  {isEs ? "Costo/día del proveedor" : "Provider Cost/Day"}
                </p>
                <p className="text-lg font-bold text-stone-900">
                  ${Math.round(results.potd.providerDailyCost).toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg bg-white p-3 text-center">
                <p className="text-xs text-stone-500">
                  {isEs ? "Punto de equilibrio" : "Breakeven"}
                </p>
                <p className="text-lg font-bold text-amber-700">
                  {results.potd.breakevenEncounters}{" "}
                  {isEs ? "enc/día" : "enc/day"}
                </p>
              </div>
              <div className="rounded-lg bg-white p-3 text-center">
                <p className="text-xs text-stone-500">
                  {isEs ? "Diferencia neta/año" : "Net Difference/Year"}
                </p>
                <p
                  className={`text-lg font-bold ${results.potd.netDifference >= 0 ? "text-teal-700" : "text-red-700"}`}
                >
                  {results.potd.netDifference >= 0 ? "+" : ""}
                  {formatCurrency(results.potd.netDifference)}
                </p>
              </div>
            </div>

            {/* Recommendation */}
            <div className="mt-3 rounded-lg bg-amber-100 p-3">
              <p className="text-xs leading-relaxed text-amber-900">
                {t(results.potd.recommendation, locale)}
              </p>
            </div>
          </div>

          {/* Payroll Breakdown */}
          <details className="rounded-xl border border-stone-200 bg-white">
            <summary className="cursor-pointer p-4 text-sm font-bold text-stone-700">
              {isEs ? "Desglose de Nómina" : "Payroll Breakdown"}
            </summary>
            <div className="border-t border-stone-100 px-4 pb-4">
              <table className="mt-2 w-full text-sm">
                <thead>
                  <tr className="text-xs text-stone-500">
                    <th className="pb-2 text-left">{isEs ? "Rol" : "Role"}</th>
                    <th className="pb-2 text-right">{isEs ? "Cantidad" : "Count"}</th>
                    <th className="pb-2 text-right">{isEs ? "Costo Total" : "Total Cost"}</th>
                  </tr>
                </thead>
                <tbody>
                  {results.payrollBreakdown
                    .filter((r) => r.count > 0)
                    .map((row) => (
                      <tr key={row.role} className="border-t border-stone-50">
                        <td className="py-1.5 text-stone-700">{row.role}</td>
                        <td className="py-1.5 text-right text-stone-700">
                          {row.count}
                        </td>
                        <td className="py-1.5 text-right font-medium text-stone-900">
                          {formatCurrency(row.totalCost)}
                        </td>
                      </tr>
                    ))}
                  <tr className="border-t-2 border-stone-200 font-bold">
                    <td className="py-2 text-stone-900">
                      {isEs ? "Total" : "Total"}
                    </td>
                    <td className="py-2 text-right text-stone-900">
                      {results.payrollBreakdown.reduce(
                        (sum, r) => sum + r.count,
                        0
                      )}
                    </td>
                    <td className="py-2 text-right text-stone-900">
                      {formatCurrency(results.annualPayroll)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </details>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 flex items-start gap-2 text-[11px] text-stone-400">
          <Info className="mt-0.5 size-3.5 shrink-0" />
          <p>
            {isEs
              ? "Modelo simplificado para planificación estratégica. Los resultados reales varían según mezcla de pagadores, tasas PPS específicas, contratos de atención administrada y condiciones locales. Fuentes: CMS FQHC PPS, CA DHCS, NACHC, HRSA BPHC."
              : "Simplified model for strategic planning. Actual results vary by payer mix, site-specific PPS rates, managed care contracts, and local conditions. Sources: CMS FQHC PPS, CA DHCS, NACHC, HRSA BPHC."}
          </p>
        </div>
      </div>
    </div>
  );
}
