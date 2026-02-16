"use client";

import { useLocale } from "next-intl";
import { SALARY_BENCHMARKS } from "@/lib/job-posting-templates";

/* ------------------------------------------------------------------ */
/*  Bilingual helper                                                   */
/* ------------------------------------------------------------------ */
function t(obj: { en: string; es: string }, locale: string): string {
  return locale === "es" ? obj.es : obj.en;
}

/* ------------------------------------------------------------------ */
/*  TL;DR Card — Summary at top of article                            */
/* ------------------------------------------------------------------ */
export function TLDRCard({
  items,
  esItems,
}: {
  items: string[];
  esItems: string[];
}) {
  const locale = useLocale();
  const content = locale === "es" ? esItems : items;

  return (
    <div className="my-8 rounded-xl border-l-4 border-teal-600 bg-teal-50 p-5">
      <p className="mb-3 text-sm font-bold uppercase tracking-wide text-teal-700">
        {locale === "es" ? "Puntos Clave" : "Key Takeaways"}
      </p>
      <ul className="space-y-2">
        {content.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-stone-700">
            <span className="mt-0.5 text-teal-600">✓</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Salary Range Bar Chart — Horizontal bars from real data            */
/* ------------------------------------------------------------------ */
export function SalaryRangeChart({
  roleIds,
  title,
  esTitle,
}: {
  roleIds: string[];
  title?: string;
  esTitle?: string;
}) {
  const locale = useLocale();
  const roles = SALARY_BENCHMARKS.filter((b) => roleIds.includes(b.roleId));

  // Find max value for scaling
  const maxSalary = Math.max(...roles.map((r) => r.p75));

  return (
    <div className="my-8 rounded-xl border border-stone-200 bg-white p-5">
      {(title || esTitle) && (
        <h4 className="mb-4 text-sm font-bold text-stone-800">
          {t({ en: title ?? "", es: esTitle ?? "" }, locale)}
        </h4>
      )}
      <div className="space-y-3">
        {roles.map((role) => (
          <div key={role.roleId}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-medium text-stone-700">
                {locale === "es" ? role.esLabel : role.label}
              </span>
              <span className="text-stone-500">
                ${(role.p25 / 1000).toFixed(0)}K – ${(role.p75 / 1000).toFixed(0)}K
              </span>
            </div>
            <div className="relative h-5 w-full overflow-hidden rounded-full bg-stone-100">
              {/* P25 to P75 bar */}
              <div
                className="absolute h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-600"
                style={{
                  left: `${(role.p25 / maxSalary) * 100}%`,
                  width: `${((role.p75 - role.p25) / maxSalary) * 100}%`,
                }}
              />
              {/* P50 marker */}
              <div
                className="absolute top-0 h-full w-0.5 bg-teal-900"
                style={{ left: `${(role.p50 / maxSalary) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-4 text-[10px] text-stone-400">
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-4 rounded bg-gradient-to-r from-teal-400 to-teal-600" />
          {t({ en: "P25 – P75 Range", es: "Rango P25 – P75" }, locale)}
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-0.5 bg-teal-900" />
          {t({ en: "Median (P50)", es: "Mediana (P50)" }, locale)}
        </span>
      </div>
      <p className="mt-2 text-[10px] text-stone-400">
        {t({
          en: "Source: FQHC Talent Exchange analysis of 156+ CA FQHC job listings, 2025–2026",
          es: "Fuente: Análisis de FQHC Talent Exchange de 156+ ofertas FQHC en CA, 2025–2026",
        }, locale)}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Total Comp Calculator Visual                                       */
/* ------------------------------------------------------------------ */
export function TotalCompVisual({
  roleLabel,
  esRoleLabel,
  baseSalary,
  nhscAnnualized,
  benefitsValue,
  retirementMatch,
  bilingualDiff,
  ceStipend,
}: {
  roleLabel: string;
  esRoleLabel: string;
  baseSalary: number;
  nhscAnnualized?: number;
  benefitsValue: number;
  retirementMatch: number;
  bilingualDiff?: number;
  ceStipend?: number;
}) {
  const locale = useLocale();
  const items = [
    { label: { en: "Base Salary", es: "Salario Base" }, value: baseSalary },
    ...(nhscAnnualized ? [{ label: { en: "NHSC Loan Repayment (annualized)", es: "NHSC Pago de Préstamos (anualizado)" }, value: nhscAnnualized }] : []),
    { label: { en: "Health/Dental/Vision", es: "Salud/Dental/Visión" }, value: benefitsValue },
    { label: { en: "403(b) Match", es: "Contribución 403(b)" }, value: retirementMatch },
    ...(bilingualDiff ? [{ label: { en: "Bilingual Differential", es: "Diferencial Bilingüe" }, value: bilingualDiff }] : []),
    ...(ceStipend ? [{ label: { en: "CE/Training Stipend", es: "Estipendio CE/Capacitación" }, value: ceStipend }] : []),
  ];
  const total = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="my-8 rounded-xl border-2 border-teal-200 bg-teal-50 p-5">
      <h4 className="mb-4 text-sm font-bold text-teal-800">
        {t({
          en: `Total Compensation: ${roleLabel}`,
          es: `Compensación Total: ${esRoleLabel}`,
        }, locale)}
      </h4>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <span className="text-teal-700">{t(item.label, locale)}</span>
            <span className="font-semibold text-teal-800">
              {i === 0 ? "" : "+ "}${item.value.toLocaleString()}
            </span>
          </div>
        ))}
        <div className="mt-2 border-t-2 border-teal-300 pt-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-teal-900">
              {t({ en: "Effective Total Compensation", es: "Compensación Total Efectiva" }, locale)}
            </span>
            <span className="text-lg font-extrabold text-teal-900">${total.toLocaleString()}</span>
          </div>
        </div>
      </div>
      {nhscAnnualized && (
        <p className="mt-2 text-[10px] text-teal-600">
          {t({
            en: "* NHSC loan repayment is tax-free. Not all staff qualify — eligible roles include clinical and behavioral health positions in designated HPSAs.",
            es: "* El pago de préstamos NHSC es libre de impuestos. No todo el personal califica — roles elegibles incluyen posiciones clínicas y de salud conductual en HPSAs designados.",
          }, locale)}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Comparison Table (FQHC vs Hospital vs Private)                     */
/* ------------------------------------------------------------------ */
export function ComparisonTable({
  rows,
}: {
  rows: Array<{
    dimension: { en: string; es: string };
    fqhc: { en: string; es: string };
    hospital: { en: string; es: string };
    private: { en: string; es: string };
  }>;
}) {
  const locale = useLocale();

  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-stone-200">
      <table className="w-full min-w-[550px] text-sm">
        <thead>
          <tr className="border-b-2 border-stone-200 bg-stone-50">
            <th className="px-4 py-3 text-left font-semibold text-stone-700" />
            <th className="px-4 py-3 text-left font-bold text-teal-700">FQHC</th>
            <th className="px-4 py-3 text-left font-semibold text-stone-500">
              {t({ en: "Hospital", es: "Hospital" }, locale)}
            </th>
            <th className="px-4 py-3 text-left font-semibold text-stone-500">
              {t({ en: "Private", es: "Privado" }, locale)}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-stone-100">
              <td className="px-4 py-3 font-medium text-stone-800">{t(row.dimension, locale)}</td>
              <td className="px-4 py-3 font-medium text-teal-700">{t(row.fqhc, locale)}</td>
              <td className="px-4 py-3 text-stone-500">{t(row.hospital, locale)}</td>
              <td className="px-4 py-3 text-stone-500">{t(row.private, locale)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Career Ladder Flowchart                                            */
/* ------------------------------------------------------------------ */
export function CareerLadderViz({
  steps,
}: {
  steps: Array<{
    role: { en: string; es: string };
    salary: string;
    timeline: { en: string; es: string };
  }>;
}) {
  const locale = useLocale();

  return (
    <div className="my-8 rounded-xl border border-stone-200 bg-stone-50 p-5">
      <h4 className="mb-4 text-sm font-bold text-stone-800">
        {t({ en: "Career Progression", es: "Progresión de Carrera" }, locale)}
      </h4>
      <div className="flex flex-col gap-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            {/* Step number */}
            <div className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
              i === steps.length - 1 ? "bg-teal-700" : "bg-stone-400"
            }`}>
              {i + 1}
            </div>

            {/* Content */}
            <div className="flex flex-1 items-center justify-between rounded-lg bg-white p-3 shadow-sm">
              <div>
                <p className="font-semibold text-stone-900">{t(step.role, locale)}</p>
                <p className="text-xs text-stone-500">{t(step.timeline, locale)}</p>
              </div>
              <span className={`text-sm font-bold ${i === steps.length - 1 ? "text-teal-700" : "text-stone-600"}`}>
                {step.salary}
              </span>
            </div>

            {/* Arrow */}
            {i < steps.length - 1 && (
              <div className="absolute left-[14px] mt-8 h-4 w-0.5 bg-stone-300" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Funding Cliff Countdown                                            */
/* ------------------------------------------------------------------ */
export function FundingCliffCard({
  cliffs,
}: {
  cliffs: Array<{
    title: { en: string; es: string };
    date: string;
    impact: { en: string; es: string };
    urgency: "critical" | "high" | "moderate";
  }>;
}) {
  const locale = useLocale();
  const urgencyColors = {
    critical: "border-red-300 bg-red-50 text-red-800",
    high: "border-amber-300 bg-amber-50 text-amber-800",
    moderate: "border-stone-300 bg-stone-50 text-stone-800",
  };

  const today = new Date();

  return (
    <div className="my-8 space-y-3">
      <h4 className="text-sm font-bold text-stone-800">
        {t({ en: "Funding Cliff Countdown", es: "Cuenta Regresiva de Recortes" }, locale)}
      </h4>
      {cliffs.map((cliff, i) => {
        const target = new Date(cliff.date);
        const daysLeft = Math.max(0, Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

        return (
          <div key={i} className={`rounded-xl border-2 p-4 ${urgencyColors[cliff.urgency]}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-bold">{t(cliff.title, locale)}</p>
                <p className="mt-1 text-sm opacity-80">{t(cliff.impact, locale)}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-2xl font-extrabold">{daysLeft}</p>
                <p className="text-xs font-medium">
                  {t({ en: "days left", es: "días" }, locale)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stat Callout Card                                                  */
/* ------------------------------------------------------------------ */
export function StatCallout({
  stat,
  label,
  esLabel,
  detail,
  esDetail,
}: {
  stat: string;
  label: string;
  esLabel: string;
  detail?: string;
  esDetail?: string;
}) {
  const locale = useLocale();

  return (
    <div className="my-6 flex items-center gap-4 rounded-xl border border-teal-200 bg-teal-50 p-4">
      <span className="text-3xl font-extrabold text-teal-700">{stat}</span>
      <div>
        <p className="font-semibold text-stone-900">{t({ en: label, es: esLabel }, locale)}</p>
        {detail && (
          <p className="mt-0.5 text-xs text-stone-500">
            {t({ en: detail, es: esDetail ?? detail }, locale)}
          </p>
        )}
      </div>
    </div>
  );
}
