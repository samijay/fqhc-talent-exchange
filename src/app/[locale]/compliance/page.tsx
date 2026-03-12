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
  Shield,
  Briefcase,
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

// Additional compliance domains
const ADDITIONAL_DOMAINS = [
  {
    id: "workers-comp",
    en: "Workers' Compensation",
    es: "Compensación de Trabajadores",
    description: {
      en: "Manage workplace injuries, claims, and risk mitigation",
      es: "Gestione lesiones laborales, reclamaciones y mitigación de riesgos",
    },
    href: "/compliance/workers-comp",
    icon: Briefcase,
    colors: { bg: "bg-orange-700", text: "text-orange-700", border: "border-orange-200", light: "bg-orange-50" },
  },
  {
    id: "education-barriers",
    en: "Education Barriers",
    es: "Barreras Educativas",
    description: {
      en: "Credential requirements, licensing, and scope of practice",
      es: "Requisitos de credenciales, licencias y alcance de práctica",
    },
    href: "/compliance/education-barriers",
    icon: Shield,
    colors: { bg: "bg-indigo-700", text: "text-indigo-700", border: "border-indigo-200", light: "bg-indigo-50" },
  },
];

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

  const allDomains = [
    ...DOMAIN_META.map((domain) => ({
      ...domain,
      href: Object.entries(DOMAIN_LINKS).find(([key]) => key === domain.id)?.[1] || "/compliance",
      icon: DOMAIN_ICONS[domain.id],
      colors: DOMAIN_COLORS[domain.id],
    })),
    ...ADDITIONAL_DOMAINS,
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm font-medium mb-6">
            <AlertTriangle className="w-4 h-4" />
            {locale === "es" ? "Centro de Comando de Cumplimiento" : "Compliance Command Center"}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {locale === "es"
              ? "Centro de Comando de Cumplimiento de FQHCs"
              : "FQHC Compliance Command Center"}
          </h1>
          <p className="text-lg text-stone-300 max-w-3xl mx-auto mb-8">
            {locale === "es"
              ? "Cada fecha límite, cada regulación, cada herramienta — en un solo lugar"
              : "Every deadline, every regulation, every tool — in one place"}
          </p>

          {/* Key stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: stats.criticalRisks + stats.highRisks, label: locale === "es" ? "Riesgos Rastreados" : "Risks Tracked" },
              { value: stats.calendarEntries, label: locale === "es" ? "Fechas Límite" : "Deadlines" },
              { value: COMPLIANCE_CASE_STUDIES.length, label: locale === "es" ? "Estudios de Caso" : "Case Studies" },
              { value: "6", label: locale === "es" ? "Dominios de Compliance" : "Compliance Domains" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-amber-400">{stat.value}</div>
                <div className="text-sm text-stone-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Domain Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allDomains.map((domain) => {
            const Icon = domain.icon;
            const colors = domain.colors;
            return (
              <Link
                key={domain.id}
                href={domain.href}
                className={`bg-white rounded-xl border ${colors.border} shadow-sm hover:shadow-md transition-shadow p-6 group`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 ${colors.light} ${colors.text} rounded-lg mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-teal-700 transition-colors">
                  {domain.en && domain.es ? t({ en: domain.en, es: domain.es }, locale) : domain.en}
                </h2>
                <p className="text-stone-600 text-sm mb-4">
                  {domain.description ? t(domain.description, locale) : ""}
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
              {locale === "es" ? "Próximas 30 Fechas Límite" : "Next 30-Day Deadlines"}
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

      {/* Featured Case Studies */}
      <section className="bg-stone-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-teal-700" />
            {locale === "es" ? "Estudios de Caso Destacados" : "Featured Case Studies"}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {COMPLIANCE_CASE_STUDIES.slice(0, 4).map((cs) => {
              const colors = DOMAIN_COLORS[cs.domain];
              return (
                <div key={cs.id} className="bg-white border border-stone-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className={`text-xs px-2 py-0.5 rounded inline-block mb-3 ${colors.light} ${colors.text} font-medium`}>
                    {cs.fqhcType}
                  </div>
                  <h3 className="font-bold text-stone-900 text-base mb-2">{t(cs.title, locale)}</h3>
                  <p className="text-sm text-stone-600 mb-3">{t(cs.lesson, locale)}</p>
                  {cs.penaltyAmount && (
                    <div className="text-sm text-red-600 font-semibold">{cs.penaltyAmount}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance Career Track */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-8">
          <div className="flex items-start gap-4 md:gap-8">
            <div className="hidden md:flex items-center justify-center w-16 h-16 bg-teal-700 rounded-lg flex-shrink-0">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-stone-900 mb-2">
                {locale === "es" ? "Carrera en Cumplimiento" : "Compliance Career Track"}
              </h2>
              <p className="text-stone-600 mb-4">
                {locale === "es"
                  ? "Explore oportunidades de carrera en compliance y operaciones. Desde análisis inicial hasta oficial de cumplimiento."
                  : "Explore career opportunities in compliance and operations. From entry-level analyst to Chief Compliance Officer."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/career-roadmap"
                  className="inline-flex items-center gap-2 bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-800 transition-colors"
                >
                  {locale === "es" ? "Ver Carrera Profesional" : "View Career Pathway"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/career-insights"
                  className="inline-flex items-center gap-2 bg-white text-teal-700 px-4 py-2 rounded-lg font-semibold border border-teal-200 hover:bg-teal-50 transition-colors"
                >
                  {locale === "es" ? "Evaluación de Carrera" : "Career Assessment"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-stone-900 mb-6">
          {locale === "es" ? "Recursos Adicionales" : "Additional Resources"}
        </h2>
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
