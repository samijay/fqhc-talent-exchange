// FQHC Legislative Alert Tracker — Monitor bills affecting FQHC funding & workforce
"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Filter,
  Bell,
  Clock,
} from "lucide-react";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import {
  LEGISLATIVE_BILLS,
  STATUS_LABELS,
  IMPACT_STYLES,
  CHAMBER_LABELS,
  TRACK_LABELS,
  getBillStats,
  getUpcomingDeadlines,
  getCriticalBills,
  LEGISLATIVE_LAST_UPDATED,
  type LegislativeImpact,
  type LegislativeChamber,
  type LegislativeTrack,
  type LegislativeBill,
} from "@/lib/legislative-tracker";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

function daysUntil(dateStr: string): number {
  const now = new Date();
  const target = new Date(dateStr + "T00:00:00");
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr: string, locale: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(locale === "es" ? "es-US" : "en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

/* ------------------------------------------------------------------ */
/*  Bill Card                                                          */
/* ------------------------------------------------------------------ */

function BillCard({ bill, locale }: { bill: LegislativeBill; locale: string }) {
  const [expanded, setExpanded] = useState(false);
  const isEs = locale === "es";
  const impactStyle = IMPACT_STYLES[bill.impact];
  const statusMeta = STATUS_LABELS[bill.status];
  const chamberMeta = CHAMBER_LABELS[bill.chamber];

  const days = bill.nextActionDate ? daysUntil(bill.nextActionDate) : null;
  const urgent = days !== null && days <= 90;

  return (
    <div className={`bg-stone-900 border rounded-xl overflow-hidden transition-all ${
      bill.impact === "critical" ? "border-red-800" : "border-stone-800"
    }`}>
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold border ${impactStyle.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${impactStyle.dot}`} />
              {impactStyle.label}
            </span>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${statusMeta.color}`}>
              {t(statusMeta, isEs ? "es" : "en")}
            </span>
            <span className="text-stone-500 text-xs">
              {chamberMeta.flag} {t(chamberMeta, isEs ? "es" : "en")}
            </span>
          </div>
          <span className="text-stone-500 text-xs whitespace-nowrap font-mono">{bill.billNumber}</span>
        </div>

        <h3 className="text-white font-semibold text-base mb-1">{t(bill.title, locale)}</h3>
        <p className="text-stone-400 text-sm leading-relaxed line-clamp-2">{t(bill.summary, locale)}</p>

        {/* Next action deadline */}
        {bill.nextActionDate && bill.nextActionLabel && (
          <div className={`mt-3 flex items-center gap-2 text-xs rounded-lg px-3 py-2 ${
            urgent ? "bg-red-950/50 border border-red-800/50 text-red-300" : "bg-stone-800 text-stone-400"
          }`}>
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span className="font-medium">{t(bill.nextActionLabel, locale)}</span>
            <span className="ml-auto whitespace-nowrap">
              {days !== null && days > 0
                ? `${days} ${isEs ? "días" : "days"}`
                : isEs ? "Hoy" : "Today"} — {formatDate(bill.nextActionDate, locale)}
            </span>
          </div>
        )}

        {/* FQHC Impact */}
        <div className="mt-3 bg-stone-800/60 rounded-lg px-3 py-2">
          <p className="text-xs text-stone-300 font-medium mb-0.5">
            {isEs ? "Impacto en FQHCs:" : "FQHC Impact:"}
          </p>
          <p className="text-xs text-stone-400 leading-relaxed">{t(bill.fqhcImpact, locale)}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {bill.tracks.map((track) => (
            <span key={track} className="text-xs bg-stone-800 text-stone-400 px-2 py-0.5 rounded">
              {t(TRACK_LABELS[track], locale)}
            </span>
          ))}
          {bill.affectedPrograms.slice(0, 3).map((prog) => (
            <span key={prog} className="text-xs bg-teal-950/50 text-teal-400 px-2 py-0.5 rounded">
              {prog}
            </span>
          ))}
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-stone-800 px-5 py-4 space-y-3">
          <p className="text-sm text-stone-300 leading-relaxed">{t(bill.summary, locale)}</p>
          <div className="flex items-center gap-2">
            <a
              href={bill.primarySource}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {isEs ? "Fuente primaria" : "Primary source"}: {bill.sourceLabel}
            </a>
            <span className="text-stone-600 text-xs ml-auto">
              {isEs ? "Actualizado" : "Updated"}: {formatDate(bill.lastUpdated, locale)}
            </span>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-stone-800 px-5 py-3 flex items-center justify-between">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-stone-400 hover:text-white flex items-center gap-1 transition-colors"
        >
          {expanded
            ? (isEs ? "Mostrar menos" : "Show less")
            : (isEs ? "Ver detalles" : "View details")}
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        <a
          href={bill.primarySource}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-teal-500 hover:text-teal-400 flex items-center gap-1 transition-colors"
        >
          {isEs ? "Fuente" : "Source"} <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function LegislativeTrackerPage() {
  const locale = useLocale();
  const isEs = locale === "es";

  const [filterImpact, setFilterImpact] = useState<LegislativeImpact | "all">("all");
  const [filterChamber, setFilterChamber] = useState<LegislativeChamber | "all">("all");
  const [filterTrack] = useState<LegislativeTrack | "all">("all");

  const stats = getBillStats();
  const deadlines = getUpcomingDeadlines().slice(0, 3);
  const criticalBills = getCriticalBills();

  const filtered = LEGISLATIVE_BILLS.filter((b) => {
    if (filterImpact !== "all" && b.impact !== filterImpact) return false;
    if (filterChamber !== "all" && b.chamber !== filterChamber) return false;
    if (filterTrack !== "all" && !b.tracks.includes(filterTrack)) return false;
    return true;
  }).sort((a, b) => {
    const order = { critical: 0, high: 1, moderate: 2, watch: 3 };
    return order[a.impact] - order[b.impact];
  });

  return (
    <main className="min-h-screen bg-stone-950 text-white">
      {/* ============================================================ */}
      {/*  Hero                                                        */}
      {/* ============================================================ */}
      <section className="relative bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 border-b border-stone-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-stone-500 text-sm mb-4">
            <Link href="/" className="hover:text-stone-300 transition-colors">
              {isEs ? "Inicio" : "Home"}
            </Link>
            <span>/</span>
            <span>{isEs ? "Legislación" : "Legislation"}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-900/30 border border-red-700/40 rounded-full px-3 py-1 mb-4">
                <Bell className="w-3.5 h-3.5 text-red-400" />
                <span className="text-red-300 text-xs font-medium">
                  {isEs ? "Monitoreo en Tiempo Real" : "Live Legislative Monitor"}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-3">
                {isEs ? "Rastreador Legislativo FQHC" : "FQHC Legislative Tracker"}
              </h1>
              <p className="text-stone-400 text-lg max-w-2xl">
                {isEs
                  ? "Monitoreo de leyes federales y estatales que afectan el financiamiento, la fuerza laboral y el acceso de pacientes de los FQHCs de California."
                  : "Monitor federal and California legislation affecting FQHC funding, workforce, and patient access. Updated with every legislative development."}
              </p>
            </div>
            <div className="text-stone-500 text-sm shrink-0">
              {isEs ? "Actualizado" : "Updated"}: {formatDate(LEGISLATIVE_LAST_UPDATED, locale)}
            </div>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-8">
            {[
              { label: isEs ? "Proyectos Activos" : "Active Bills", value: stats.total, color: "text-white" },
              { label: isEs ? "Críticos" : "Critical", value: stats.critical, color: "text-red-400" },
              { label: isEs ? "Alto Impacto" : "High Impact", value: stats.high, color: "text-orange-400" },
              { label: isEs ? "Con Plazos" : "With Deadlines", value: stats.withDeadline, color: "text-amber-400" },
              { label: isEs ? "Federal" : "Federal", value: stats.federal, color: "text-blue-400" },
              { label: isEs ? "California" : "California", value: stats.california, color: "text-teal-400" },
            ].map((s) => (
              <div key={s.label} className="bg-stone-900 border border-stone-800 rounded-xl p-3 text-center">
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-stone-500 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ========================================================= */}
        {/*  Main Feed                                                */}
        {/* ========================================================= */}
        <div className="lg:col-span-2 space-y-6">

          {/* Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="w-4 h-4 text-stone-500" />
            {/* Impact filter */}
            {(["all", "critical", "high", "moderate", "watch"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setFilterImpact(v)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filterImpact === v
                    ? "bg-teal-700 text-white"
                    : "bg-stone-800 text-stone-400 hover:text-white"
                }`}
              >
                {v === "all" ? (isEs ? "Todos" : "All") : IMPACT_STYLES[v].label}
              </button>
            ))}
            <div className="w-px h-4 bg-stone-700 mx-1" />
            {/* Chamber filter */}
            {(["all", "federal", "california", "regulation"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setFilterChamber(v)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filterChamber === v
                    ? "bg-stone-600 text-white"
                    : "bg-stone-800 text-stone-400 hover:text-white"
                }`}
              >
                {v === "all" ? (isEs ? "Todos" : "All Levels") : `${CHAMBER_LABELS[v].flag} ${t(CHAMBER_LABELS[v], locale)}`}
              </button>
            ))}
          </div>

          <p className="text-stone-500 text-xs">
            {filtered.length} {isEs ? "proyectos de ley" : "bills"} · {isEs ? "ordenados por impacto" : "sorted by impact"}
          </p>

          {/* Bill cards */}
          {filtered.map((bill) => (
            <BillCard key={bill.id} bill={bill} locale={locale} />
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-stone-500">
              {isEs ? "No hay proyectos con esos filtros." : "No bills match those filters."}
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/*  Sidebar                                                  */}
        {/* ========================================================= */}
        <div className="space-y-6">
          {/* Upcoming deadlines */}
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-5">
            <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              {isEs ? "Próximos Plazos" : "Upcoming Deadlines"}
            </h3>
            <div className="space-y-3">
              {deadlines.map((bill) => {
                const days = daysUntil(bill.nextActionDate!);
                return (
                  <div key={bill.id} className="border-l-2 border-amber-600 pl-3">
                    <div className={`text-xs font-bold mb-0.5 ${days <= 30 ? "text-red-400" : "text-amber-400"}`}>
                      {days > 0 ? `${days}d` : isEs ? "Hoy" : "Today"} — {formatDate(bill.nextActionDate!, locale)}
                    </div>
                    <div className="text-white text-xs font-medium">{bill.billNumber}</div>
                    <div className="text-stone-400 text-xs">
                      {bill.nextActionLabel ? t(bill.nextActionLabel, locale) : ""}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Critical risk summary */}
          <div className="bg-red-950/30 border border-red-800/50 rounded-xl p-5">
            <h3 className="text-red-300 font-semibold text-sm mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              {isEs ? "Riesgo Crítico" : "Critical Risk"} ({criticalBills.length})
            </h3>
            <ul className="space-y-2">
              {criticalBills.map((bill) => (
                <li key={bill.id} className="text-xs text-stone-300 flex items-start gap-2">
                  <span className="text-red-500 mt-0.5 shrink-0">▸</span>
                  <span><strong>{bill.billNumber}</strong> — {t(bill.title, locale)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related resources */}
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-5">
            <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-teal-400" />
              {isEs ? "Recursos Relacionados" : "Related Resources"}
            </h3>
            <div className="space-y-2">
              {[
                { href: "/funding-impact", label: isEs ? "Rastreador H.R. 1" : "H.R. 1 Impact Tracker" },
                { href: "/strategy/resilience", label: isEs ? "Scorecard de Resiliencia" : "Resilience Scorecard" },
                { href: "/strategy/masterclass", label: isEs ? "Masterclass Financiero" : "Financial Survival Masterclass" },
                { href: "/strategy/okrs", label: isEs ? "Plantillas OKR de Crisis" : "Crisis OKR Templates" },
                { href: "/blog", label: isEs ? "Análisis de Políticas" : "Policy Analysis Blog" },
              ].map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="flex items-center gap-2 text-xs text-stone-400 hover:text-teal-400 transition-colors"
                >
                  <ArrowRight className="w-3 h-3" />
                  {r.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter CTA */}
          <NewsletterSignup
            variant="card"
            defaultAudience="intel-brief"
            heading={{ en: "Get Legislative Alerts", es: "Recibe Alertas Legislativas" }}
            subheading={{
              en: "Weekly briefing on bills that affect your FQHC — with primary sources.",
              es: "Resumen semanal de leyes que afectan su FQHC — con fuentes primarias.",
            }}
          />
        </div>
      </div>
    </main>
  );
}
