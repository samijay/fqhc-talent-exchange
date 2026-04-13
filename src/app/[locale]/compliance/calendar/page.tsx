"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Download, ExternalLink, ShieldCheck, Lock, DollarSign } from "lucide-react";
import { PageHero } from "@/components/ui/design-system";
import { COMPLIANCE_CALENDAR, DOMAIN_META, type ComplianceDomain } from "@/lib/fqhc-compliance";
import { downloadComplianceCalendarAsExcel } from "@/lib/compliance-excel-export";
import { t } from "@/lib/i18n-helpers";

const MONTH_EN = ["Year-Round", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTH_ES = ["Todo el Año", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const DOMAIN_COLORS: Record<ComplianceDomain, { bg: string; text: string; border: string }> = {
  "hrsa-audits": { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200" },
  "hipaa-privacy": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  "billing-fraud": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
};
const DOMAIN_ICONS: Record<ComplianceDomain, typeof ShieldCheck> = { "hrsa-audits": ShieldCheck, "hipaa-privacy": Lock, "billing-fraud": DollarSign };

export default function ComplianceCalendarPage() {
  const locale = useLocale();
  const months = locale === "es" ? MONTH_ES : MONTH_EN;
  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const [domainFilter, setDomainFilter] = useState<ComplianceDomain | null>(null);

  const filtered = COMPLIANCE_CALENDAR.filter((e) => {
    if (domainFilter && e.domain !== domainFilter) return false;
    if (selectedMonth === 0) return true; // show all
    return e.month === selectedMonth || e.month === 0; // include year-round
  }).sort((a, b) => a.month - b.month || (a.day ?? 0) - (b.day ?? 0));

  return (
    <div className="min-h-screen bg-white">
      <PageHero
        variant="dark"
        title={{ en: "2026 Compliance Calendar", es: "Calendario de Cumplimiento 2026" }}
        subtitle={{ en: "Every HRSA, HIPAA, and billing deadline in one place.", es: "Todas las fechas límite de HRSA, HIPAA y facturación en un solo lugar." }}
      >
        <button onClick={() => downloadComplianceCalendarAsExcel(locale)} className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold px-5 py-2.5 rounded-lg transition-colors">
          <Download className="w-5 h-5" />
          {locale === "es" ? "Descargar Calendario (Excel)" : "Download Calendar (Excel)"}
        </button>
      </PageHero>

      {/* Filters */}
      <section className="max-w-5xl mx-auto px-4 py-6">
        {/* Month tabs */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <button onClick={() => setSelectedMonth(0)} className={`px-3 py-1.5 rounded text-xs font-medium border ${selectedMonth === 0 ? "bg-stone-800 text-white border-stone-800" : "bg-white text-stone-600 border-stone-300 hover:border-stone-400"}`}>
            {locale === "es" ? "Todos" : "All"}
          </button>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <button key={m} onClick={() => setSelectedMonth(m)} className={`px-3 py-1.5 rounded text-xs font-medium border ${selectedMonth === m ? "bg-stone-800 text-white border-stone-800" : "bg-white text-stone-600 border-stone-300 hover:border-stone-400"} ${m === currentMonth && selectedMonth !== m ? "ring-2 ring-teal-300" : ""}`}>
              {months[m].substring(0, 3)}
            </button>
          ))}
        </div>

        {/* Domain filter */}
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setDomainFilter(null)} className={`px-3 py-1 rounded-full text-xs font-medium border ${domainFilter === null ? "bg-stone-700 text-white" : "bg-white text-stone-600 border-stone-300"}`}>
            {locale === "es" ? "Todos los Dominios" : "All Domains"}
          </button>
          {DOMAIN_META.map((d) => {
            const colors = DOMAIN_COLORS[d.id];
            return (
              <button key={d.id} onClick={() => setDomainFilter(domainFilter === d.id ? null : d.id)} className={`px-3 py-1 rounded-full text-xs font-medium border ${domainFilter === d.id ? `${colors.bg} ${colors.text} ${colors.border}` : "bg-white text-stone-600 border-stone-300"}`}>
                {t({ en: d.en, es: d.es }, locale)}
              </button>
            );
          })}
        </div>
      </section>

      {/* Calendar entries */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-stone-500">{locale === "es" ? "Sin fechas límite para estos filtros" : "No deadlines match these filters"}</div>
        ) : (
          <div className="space-y-3">
            {filtered.map((entry) => {
              const colors = DOMAIN_COLORS[entry.domain];
              const Icon = DOMAIN_ICONS[entry.domain];
              return (
                <div key={entry.id} className={`border ${colors.border} rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-3`}>
                  <div className="flex items-center gap-3 md:min-w-[200px]">
                    <Icon className={`w-5 h-5 ${colors.text} flex-shrink-0`} />
                    <div>
                      <div className={`font-bold text-sm ${colors.text}`}>{entry.deadline}</div>
                      {entry.month === 0 && <div className="text-xs text-stone-500">{locale === "es" ? "Continuo" : "Ongoing"}</div>}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-stone-900 text-sm">{t(entry.requirement, locale)}</div>
                    <div className="text-xs text-stone-600 mt-1">{t(entry.description, locale)}</div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-stone-500">
                    <span className="bg-stone-100 px-2 py-1 rounded">{entry.responsibleDepartment}</span>
                    <span className={`${colors.bg} ${colors.text} px-2 py-1 rounded font-medium`}>{entry.preparationWeeks} {locale === "es" ? "sem" : "wks"}</span>
                    <a href={entry.primarySourceUrl} target="_blank" rel="noopener noreferrer" className="hover:text-teal-600" aria-label={`${locale === "es" ? "Ver fuente para" : "View source for"} ${t(entry.requirement, locale)}`}><ExternalLink className="w-3.5 h-3.5" aria-hidden="true" /></a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
