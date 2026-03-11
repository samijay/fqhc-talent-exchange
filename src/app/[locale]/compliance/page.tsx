"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ShieldCheck,
  Lock,
  DollarSign,
  Download,
  FileSpreadsheet,
  Calendar,
  BookOpen,
  AlertTriangle,
  ArrowRight,
  Scale,
  ChevronRight,
} from "lucide-react";
import {
  DOMAIN_META,
  COMPLIANCE_CALENDAR,
  COMPLIANCE_LEGISLATION,
  COMPLIANCE_CASE_STUDIES,
  getComplianceStats,
  type ComplianceDomain,
} from "@/lib/fqhc-compliance";
import {
  downloadOSVChecklistAsExcel,
  downloadComplianceCalendarAsExcel,
  downloadRiskMatrixAsExcel,
} from "@/lib/compliance-excel-export";

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

const DOMAIN_ICONS: Record<ComplianceDomain, typeof ShieldCheck> = {
  "hrsa-audits": ShieldCheck,
  "hipaa-privacy": Lock,
  "billing-fraud": DollarSign,
};

const DOMAIN_COLORS: Record<ComplianceDomain, { bg: string; text: string; border: string; light: string }> = {
  "hrsa-audits": { bg: "bg-teal-700", text: "text-teal-700", border: "border-teal-200", light: "bg-teal-50" },
  "hipaa-privacy": { bg: "bg-purple-700", text: "text-purple-700", border: "border-purple-200", light: "bg-purple-50" },
  "billing-fraud": { bg: "bg-amber-600", text: "text-amber-700", border: "border-amber-200", light: "bg-amber-50" },
};

const DOMAIN_LINKS: Record<ComplianceDomain, string> = {
  "hrsa-audits": "/compliance/hrsa-audits",
  "hipaa-privacy": "/compliance/hipaa",
  "billing-fraud": "/compliance/billing",
};

export default function ComplianceLandingPage() {
  const locale = useLocale();
  const stats = getComplianceStats();

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const upcomingDeadlines = COMPLIANCE_CALENDAR
    .filter((e) => e.month >= currentMonth && e.month <= currentMonth + 2 && e.month !== 0)
    .sort((a, b) => a.month - b.month || (a.day ?? 0) - (b.day ?? 0))
    .slice(0, 4);

  const recentLegislation = COMPLIANCE_LEGISLATION
    .filter((l) => l.status === "enacted" || l.status === "effective")
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm font-medium mb-6">
            <AlertTriangle className="w-4 h-4" />
            {locale === "es" ? "Recursos Esenciales de Cumplimiento" : "Essential Compliance Resources"}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {locale === "es"
              ? "Riesgo y Cumplimiento para FQHCs de California"
              : "Risk & Compliance for California FQHCs"}
          </h1>
          <p className="text-lg text-stone-300 max-w-3xl mx-auto mb-8">
            {locale === "es"
              ? "19 requisitos de HRSA. Protección de datos HIPAA. Cumplimiento de facturación. Listas de verificación descargables, calendarios y matrices de riesgo."
              : "19 HRSA program requirements. HIPAA data protection. Billing compliance. Downloadable checklists, calendars, and risk matrices."}
          </p>

          {/* Key stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: stats.osvRequirements, label: locale === "es" ? "Requisitos OSV" : "OSV Requirements" },
              { value: `${stats.totalEstimatedOSVHours}h`, label: locale === "es" ? "Horas Estimadas de Prep" : "Est. Prep Hours" },
              { value: stats.criticalRisks + stats.highRisks, label: locale === "es" ? "Riesgos Alto/Crítico" : "High/Critical Risks" },
              { value: stats.calendarEntries, label: locale === "es" ? "Fechas Límite Anuales" : "Annual Deadlines" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-amber-400">{stat.value}</div>
                <div className="text-sm text-stone-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Domain Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-8">
        <div className="grid md:grid-cols-3 gap-6">
          {DOMAIN_META.map((domain) => {
            const Icon = DOMAIN_ICONS[domain.id];
            const colors = DOMAIN_COLORS[domain.id];
            return (
              <Link
                key={domain.id}
                href={DOMAIN_LINKS[domain.id]}
                className={`bg-white rounded-xl border ${colors.border} shadow-sm hover:shadow-md transition-shadow p-6 group`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 ${colors.light} ${colors.text} rounded-lg mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-teal-700 transition-colors">
                  {t({ en: domain.en, es: domain.es }, locale)}
                </h2>
                <p className="text-stone-600 text-sm mb-4">
                  {t(domain.description, locale)}
                </p>
                <span className={`inline-flex items-center gap-1 text-sm font-medium ${colors.text}`}>
                  {locale === "es" ? "Explorar" : "Explore"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Downloads Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-stone-900 mb-2">
          {locale === "es" ? "Herramientas Descargables" : "Downloadable Tools"}
        </h2>
        <p className="text-stone-600 mb-6">
          {locale === "es"
            ? "Hojas de cálculo de Excel listas para usar — comience de inmediato."
            : "Ready-to-use Excel spreadsheets — start your compliance work immediately."}
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              title: locale === "es" ? "Lista de Verificación OSV de HRSA" : "HRSA OSV Prep Checklist",
              desc: locale === "es" ? "19 requisitos con rastreo de estado y evidencia" : "19 requirements with status tracking & evidence columns",
              icon: FileSpreadsheet,
              color: "teal",
              onClick: () => downloadOSVChecklistAsExcel(locale),
            },
            {
              title: locale === "es" ? "Calendario de Cumplimiento 2026" : "2026 Compliance Calendar",
              desc: locale === "es" ? "Todas las fechas límite HRSA, HIPAA y facturación por mes" : "All HRSA, HIPAA, and billing deadlines by month",
              icon: Calendar,
              color: "purple",
              onClick: () => downloadComplianceCalendarAsExcel(locale),
            },
            {
              title: locale === "es" ? "Matriz de Evaluación de Riesgos" : "Risk Assessment Matrix",
              desc: locale === "es" ? "Mapa de calor 5×5 + registro de riesgos con controles" : "5×5 heat map + risk register with controls & mitigation",
              icon: AlertTriangle,
              color: "amber",
              onClick: () => downloadRiskMatrixAsExcel(locale),
            },
          ].map((tool) => (
            <button
              key={tool.title}
              onClick={tool.onClick}
              className="bg-white border border-stone-200 rounded-xl p-5 text-left hover:shadow-md hover:border-teal-300 transition-all group"
            >
              <tool.icon className={`w-8 h-8 mb-3 ${
                tool.color === "teal" ? "text-teal-600" :
                tool.color === "purple" ? "text-purple-600" :
                "text-amber-600"
              }`} />
              <h3 className="font-bold text-stone-900 mb-1">{tool.title}</h3>
              <p className="text-sm text-stone-600 mb-3">{tool.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-teal-700">
                <Download className="w-4 h-4" />
                {locale === "es" ? "Descargar Excel" : "Download Excel"}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Upcoming Deadlines */}
      {upcomingDeadlines.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-stone-900">
              {locale === "es" ? "Próximas Fechas Límite" : "Upcoming Deadlines"}
            </h2>
            <Link href="/compliance/calendar" className="text-sm text-teal-700 hover:underline inline-flex items-center gap-1">
              {locale === "es" ? "Ver calendario completo" : "View full calendar"}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingDeadlines.map((entry) => {
              const colors = DOMAIN_COLORS[entry.domain];
              return (
                <div key={entry.id} className={`border ${colors.border} ${colors.light} rounded-lg p-4 flex items-center gap-4`}>
                  <div className={`text-sm font-bold ${colors.text} min-w-[100px]`}>
                    {entry.deadline}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-stone-900 text-sm">{t(entry.requirement, locale)}</div>
                    <div className="text-xs text-stone-600">{entry.responsibleDepartment}</div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded ${colors.light} ${colors.text} font-medium`}>
                    {entry.preparationWeeks} {locale === "es" ? "sem prep" : "wks prep"}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Legislation & Case Studies */}
      <section className="bg-stone-50 py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Legislation */}
          <div>
            <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5 text-red-600" />
              {locale === "es" ? "Legislación Activa" : "Active Legislation"}
            </h2>
            <div className="space-y-3">
              {recentLegislation.map((leg) => (
                <a
                  key={leg.id}
                  href={leg.primarySourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white border border-stone-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono bg-stone-100 px-2 py-0.5 rounded">{leg.billNumber}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${leg.status === "enacted" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                      {leg.status}
                    </span>
                  </div>
                  <div className="font-semibold text-stone-900 text-sm">{t(leg.title, locale)}</div>
                  <div className="text-xs text-stone-600 mt-1">{leg.deadline}</div>
                </a>
              ))}
            </div>
          </div>

          {/* Case Studies */}
          <div>
            <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-teal-700" />
              {locale === "es" ? "Estudios de Caso" : "Compliance Case Studies"}
            </h2>
            <div className="space-y-3">
              {COMPLIANCE_CASE_STUDIES.slice(0, 3).map((cs) => {
                const colors = DOMAIN_COLORS[cs.domain];
                return (
                  <div key={cs.id} className="bg-white border border-stone-200 rounded-lg p-4">
                    <div className={`text-xs px-2 py-0.5 rounded inline-block mb-2 ${colors.light} ${colors.text} font-medium`}>
                      {cs.fqhcType}
                    </div>
                    <div className="font-semibold text-stone-900 text-sm mb-1">{t(cs.title, locale)}</div>
                    <div className="text-xs text-stone-600">{t(cs.lesson, locale)}</div>
                    {cs.penaltyAmount && (
                      <div className="text-xs text-red-600 font-medium mt-1">{cs.penaltyAmount}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { href: "/compliance/calendar", label: locale === "es" ? "Calendario de Cumplimiento" : "Compliance Calendar", icon: Calendar, desc: locale === "es" ? "Todas las fechas límite por mes" : "All deadlines by month" },
            { href: "/compliance/knowledge-base", label: locale === "es" ? "Base de Conocimiento" : "Knowledge Base", icon: BookOpen, desc: locale === "es" ? "Regulaciones con citas CFR" : "Regulations with CFR citations" },
            { href: "/strategy/masterclass", label: locale === "es" ? "Masterclass de Cumplimiento" : "Compliance Masterclass", icon: ShieldCheck, desc: locale === "es" ? "Módulos de aprendizaje profundo" : "Deep-dive learning modules" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-lg p-4 hover:bg-teal-50 hover:border-teal-200 transition-colors group"
            >
              <link.icon className="w-5 h-5 text-stone-400 group-hover:text-teal-600" />
              <div>
                <div className="font-semibold text-stone-900 text-sm">{link.label}</div>
                <div className="text-xs text-stone-500">{link.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
