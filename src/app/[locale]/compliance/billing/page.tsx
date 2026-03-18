"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { DollarSign, Download, ExternalLink, ChevronDown, ChevronUp, FileText, Scale, Pill, ClipboardList, Handshake } from "lucide-react";
import { getRegulationsByDomain, getRisksByDomain, getCaseStudiesByDomain, getRiskScore, getRiskLevel } from "@/lib/fqhc-compliance";
import { downloadComplianceCalendarAsExcel } from "@/lib/compliance-excel-export";

const t = (obj: { en: string; es: string }, locale: string) => locale === "es" ? obj.es : obj.en;

const TOPICS = [
  { id: "pps", icon: DollarSign, en: "PPS Billing Rules: Same-Day Medical + BH", es: "Reglas de Facturación PPS: Médico + Salud Mental el Mismo Día", content: { en: "Key PPS same-day rules:\n\n• Medicare: 2 encounters allowed on the same day if the patient sees two different providers for two different services (e.g., medical + behavioral health). Each encounter must have a qualifying face-to-face visit with a billable provider.\n\n• Medi-Cal: Generally 1 PPS encounter per day. Medical + BH typically counts as 1 visit. Exception: some managed care plans allow 2.\n\n• FQHC APM (Alternative Payment Model): Capitation changes the equation entirely — per-member-per-month, not per-visit.\n\n• Critical: FQHCs CANNOT bill 'incident-to' like private practices. Every encounter must be directly billed under the rendering provider's credentials.\n\n• Documentation: Face-to-face requirement means the billing provider must personally see the patient. Co-signing a note does NOT equal a face-to-face encounter.", es: "Reglas clave de facturación PPS para el mismo día: Medicare permite 2 encuentros con diferentes proveedores. Medi-Cal generalmente permite 1 encuentro por día. Los FQHC NO pueden facturar 'incident-to'." } },
  { id: "documentation", icon: FileText, en: "Documentation Standards for Billing", es: "Estándares de Documentación para Facturación", content: { en: "What makes a claim auditable vs. denied:\n\n• Every visit note must include: History of Present Illness (HPI), Review of Systems, Physical Exam findings, Assessment/Diagnosis, and Treatment Plan.\n\n• E/M level must match documentation complexity. Level 3 (99213) requires expanded problem-focused; Level 4 (99214) requires detailed; Level 5 (99215) requires comprehensive.\n\n• EHR templates help but must be customized per patient. Copy-forward notes are an audit red flag.\n\n• Behavioral health: Treatment plans must include measurable goals, interventions, and expected timelines. Missing elements = denied claims.\n\n• Time-based billing: If billing by time, document the total time AND what was discussed.", es: "Lo que hace que un reclamo sea auditable vs. denegado: Cada nota debe incluir HPI, revisión de sistemas, examen físico, evaluación/diagnóstico y plan de tratamiento." } },
  { id: "coding", icon: ClipboardList, en: "Coding Accuracy (ICD-10, CPT, Modifiers)", es: "Precisión de Codificación (ICD-10, CPT, Modificadores)", content: { en: "FQHC-specific coding:\n\n• ICD-10: Be as specific as possible. E11.65 (Type 2 DM with hyperglycemia) is better than E11.9 (Type 2 DM unspecified). Specificity drives risk adjustment and quality measures.\n\n• CPT: FQHCs use standard E/M codes (99211-99215) but are reimbursed at PPS rate regardless. Still must document to support the code level.\n\n• FQHC Modifiers: Use modifier -25 for significant/separately identifiable E/M on same day as procedure.\n\n• Common errors: (1) Under-coding (documenting level 4 but coding level 3 — lost revenue). (2) Over-coding (coding level 5 without supporting documentation — FCA risk). (3) Missing modifiers on same-day services.\n\n• Annual coding audit recommended: 10% sample by certified coder.", es: "Codificación específica de FQHC: ICD-10 lo más específico posible. CPT usa códigos estándar E/M. Modificadores FQHC: usar -25 para E/M separable." } },
  { id: "false-claims", icon: Scale, en: "False Claims Act & Whistleblower Protection", es: "Ley de Reclamos Falsos y Protección de Denunciantes", content: { en: "The Federal False Claims Act (31 USC § 3729-3733):\n\n• Applies to any claim submitted to Medicare, Medicaid, or other federal programs that the submitter knows (or should know) is false.\n\n• Penalties: $13,946 to $27,894 PER FALSE CLAIM plus treble damages (3× the overpayment).\n\n• Common FQHC false claims: (1) Billing incident-to (prohibited for FQHCs). (2) Billing without face-to-face encounter. (3) Upcoding E/M levels. (4) 340B duplicate discounts.\n\n• Whistleblower (Qui Tam): Any employee, contractor, or person can file a qui tam lawsuit on behalf of the government. Whistleblowers receive 15-30% of recovered funds. Protected from retaliation under 31 USC § 3730(h).\n\n• Self-disclosure to OIG dramatically reduces penalties (see case study).", es: "La Ley Federal de Reclamos Falsos impone sanciones de $13,946 a $27,894 por reclamo falso más daños triples. Protección de denunciantes: empleados reciben 15-30% de fondos recuperados." } },
  { id: "340b", icon: Pill, en: "340B Drug Pricing Program Compliance", es: "Cumplimiento del Programa de Precios de Medicamentos 340B", content: { en: "340B overview for FQHCs:\n\n• FQHCs purchase outpatient drugs at 25-50% discount from manufacturers. Critical revenue source (can generate $200K-$2M+ annually depending on size).\n\n• Key compliance rules:\n  (1) Eligible patients only: Must be a patient of the FQHC (established relationship, seen by provider).\n  (2) No duplicate discounts: Cannot receive BOTH 340B price AND Medicaid rebate on same prescription. Must maintain 'split billing' or Medicaid exclusion file.\n  (3) Contract pharmacies: Must follow HRSA guidance on patient eligibility verification.\n  (4) HRSA can audit at any time. Manufacturer audits also increasing.\n\n• Penalty for violations: Repayment of duplicate discounts, potential removal from 340B program, and FCA liability.\n\n• Best practice: Monthly reconciliation of 340B claims vs. Medicaid claims. Quarterly self-audit.", es: "Los FQHC compran medicamentos ambulatorios con 25-50% de descuento. Reglas clave: solo pacientes elegibles, sin descuentos duplicados, reconciliación mensual requerida." } },
  { id: "managed-care", icon: Handshake, en: "Managed Care Contract Compliance", es: "Cumplimiento de Contratos de Atención Administrada", content: { en: "ECM and managed care billing:\n\n• Enhanced Care Management (ECM): Documentation must include all DHCS-required assessment elements. Care plan must be signed by patient and provider. Missing elements = denied claims.\n\n• Pre-authorization: Always verify before procedures. Failure to pre-auth = claim denial (and the FQHC absorbs the cost).\n\n• Timely filing: Most Medi-Cal managed care plans require claim submission within 90 days. Some private plans: 45 days. Miss the deadline = write off.\n\n• Denial management: Track denial rates by payer and reason code. Appeal within the plan's required timeframe (usually 30-60 days). A 5% denial rate on $20M revenue = $1M at risk.\n\n• Contract review: Ensure PPS rates are properly included in managed care contracts. Some plans attempt to pay fee-for-service instead of PPS.", es: "Facturación de ECM y atención administrada: la documentación debe incluir todos los elementos de evaluación requeridos por DHCS. Verificar pre-autorización antes de procedimientos." } },
];

export default function BillingCompliancePage() {
  const locale = useLocale();
  const [expandedTopic, setExpandedTopic] = useState<string | null>("pps");
  const billingRegs = getRegulationsByDomain("billing-fraud");
  const billingRisks = getRisksByDomain("billing-fraud");
  const billingCases = getCaseStudiesByDomain("billing-fraud");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 text-white py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/compliance" className="text-amber-300 text-sm hover:underline mb-4 inline-block">&larr; {locale === "es" ? "Cumplimiento" : "Compliance"}</Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {locale === "es" ? "Cumplimiento de Facturación y Fraude" : "Billing & Fraud Compliance"}
          </h1>
          <p className="text-amber-200 text-lg max-w-3xl mb-6">
            {locale === "es" ? "Reclamos falsos cuestan $27K+ cada uno. Un error puede escalar a demandas de reembolso." : "False claims cost $27K+ each. One billing error can cascade into payback demands."}
          </p>
          <button onClick={() => downloadComplianceCalendarAsExcel(locale)} className="inline-flex items-center gap-2 bg-white hover:bg-stone-100 text-amber-900 font-bold px-5 py-2.5 rounded-lg transition-colors">
            <Download className="w-5 h-5" />
            {locale === "es" ? "Descargar Calendario de Facturación (Excel)" : "Download Billing Calendar (Excel)"}
          </button>
        </div>
      </section>

      {/* Topic sections */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="space-y-3">
          {TOPICS.map((topic) => {
            const expanded = expandedTopic === topic.id;
            const Icon = topic.icon;
            return (
              <div key={topic.id} className="border border-amber-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedTopic(expanded ? null : topic.id)}
                  aria-expanded={expanded}
                  aria-controls={`topic-content-${topic.id}`}
                  className="w-full text-left p-4 flex items-center gap-3 bg-amber-50 hover:bg-amber-100 transition-colors"
                >
                  <Icon className="w-5 h-5 text-amber-600 flex-shrink-0" aria-hidden="true" />
                  <h3 className="font-bold text-stone-900 flex-1">{t({ en: topic.en, es: topic.es }, locale)}</h3>
                  {expanded ? <ChevronUp className="w-5 h-5 text-stone-400" aria-hidden="true" /> : <ChevronDown className="w-5 h-5 text-stone-400" aria-hidden="true" />}
                </button>
                {expanded && (
                  <div id={`topic-content-${topic.id}`} className="p-4 bg-white" role="region" aria-label={t({ en: topic.en, es: topic.es }, locale)}>
                    <p className="text-sm text-stone-700 whitespace-pre-line">{t(topic.content, locale)}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Billing Risks */}
      <section className="bg-amber-50 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">{locale === "es" ? "Riesgos de Facturación Clave" : "Key Billing Risks"}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {billingRisks.map((risk) => {
              const score = getRiskScore(risk.likelihood, risk.impact);
              const level = getRiskLevel(score);
              const levelColors: Record<string, string> = { critical: "bg-red-100 text-red-700 border-red-200", high: "bg-amber-100 text-amber-700 border-amber-200", medium: "bg-yellow-100 text-yellow-700 border-yellow-200", low: "bg-green-100 text-green-700 border-green-200" };
              return (
                <div key={risk.id} className="bg-white border border-stone-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded border font-medium ${levelColors[level]}`}>{level.toUpperCase()} ({score})</span>
                  </div>
                  <h3 className="font-bold text-stone-900 text-sm mb-1">{risk.riskCategory}</h3>
                  <p className="text-xs text-stone-600 mb-2">{t(risk.description, locale)}</p>
                  <div className="text-xs text-stone-500">{risk.mitigationSteps.map((s) => t(s, locale)).join("; ")}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      {billingCases.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">{locale === "es" ? "Estudios de Caso de Facturación" : "Billing Case Studies"}</h2>
          <div className="space-y-4">
            {billingCases.map((cs) => (
              <div key={cs.id} className="border border-stone-200 rounded-xl p-5">
                <div className="text-xs text-stone-500 mb-1">{cs.fqhcType} &bull; {cs.location} &bull; {cs.date}</div>
                <h3 className="font-bold text-stone-900 mb-2">{t(cs.title, locale)}</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div><span className="font-semibold text-red-700">{locale === "es" ? "Desafío: " : "Challenge: "}</span>{t(cs.challenge, locale)}</div>
                  <div><span className="font-semibold text-teal-700">{locale === "es" ? "Resolución: " : "Resolution: "}</span>{t(cs.resolution, locale)}</div>
                </div>
                {cs.penaltyAmount && <div className="text-sm text-red-600 font-medium mt-2">{locale === "es" ? "Costo: " : "Cost: "}{cs.penaltyAmount}</div>}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3 text-sm"><span className="font-semibold text-amber-800">{locale === "es" ? "Lección: " : "Lesson: "}</span>{t(cs.lesson, locale)}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Regulations */}
      <section className="bg-stone-50 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-stone-900 mb-4">{locale === "es" ? "Regulaciones Clave" : "Key Regulations"}</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {billingRegs.map((reg) => (
              <a key={reg.id} href={reg.primarySourceUrl} target="_blank" rel="noopener noreferrer" className="bg-white border border-stone-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="text-xs font-mono text-amber-600 mb-1">{reg.citations.join(", ")}</div>
                <h3 className="font-bold text-stone-900 text-sm mb-1">{t(reg.title, locale)}</h3>
                <p className="text-xs text-stone-600">{t(reg.summary, locale)}</p>
                <span className="text-xs text-amber-600 mt-2 inline-flex items-center gap-1"><ExternalLink className="w-3 h-3" />{reg.primarySourceOrg}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
