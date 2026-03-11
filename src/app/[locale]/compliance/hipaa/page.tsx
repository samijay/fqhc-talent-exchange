"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Lock, Download, AlertTriangle, ExternalLink, ChevronDown, ChevronUp, Shield, FileKey, Users, Eye, Laptop } from "lucide-react";
import { REGULATORY_ITEMS, COMPLIANCE_RISKS, COMPLIANCE_CASE_STUDIES, getRegulationsByDomain, getRisksByDomain, getCaseStudiesByDomain, getRiskScore, getRiskLevel } from "@/lib/fqhc-compliance";
import { downloadRiskMatrixAsExcel } from "@/lib/compliance-excel-export";

const t = (obj: { en: string; es: string }, locale: string) => locale === "es" ? obj.es : obj.en;

const TOPICS = [
  { id: "baa", icon: FileKey, en: "Business Associate Agreements", es: "Acuerdos de Asociado Comercial", content: { en: "Every vendor that creates, receives, maintains, or transmits PHI must sign a BAA before receiving any patient data. This includes EHR vendors (Epic, eClinicalWorks, athenahealth), clearinghouses, cloud storage (AWS, Azure), billing services, and telehealth platforms. Missing BAA = automatic HIPAA violation if that vendor has a breach. Maintain a master BAA tracker with renewal dates. Review annually.", es: "Cada proveedor que cree, reciba, mantenga o transmita PHI debe firmar un BAA antes de recibir datos. Esto incluye proveedores de EHR, almacenamiento en la nube, servicios de facturación y plataformas de telesalud." } },
  { id: "patient-rights", icon: Eye, en: "Patient Rights (Access, Amendment, Confidentiality)", es: "Derechos del Paciente", content: { en: "Patients have the right to: (1) Access their medical records within 30 days of request (CA: $0.25/page, $25 max). (2) Request amendments to their records. (3) Receive an accounting of disclosures. (4) Request restrictions on use/disclosure. (5) Receive communications by alternative means. You must provide Notice of Privacy Practices at first visit and post in waiting areas.", es: "Los pacientes tienen derecho a acceder a sus registros médicos dentro de 30 días, solicitar enmiendas, recibir contabilidad de divulgaciones y solicitar restricciones de uso." } },
  { id: "breach", icon: AlertTriangle, en: "Breach Notification Protocol", es: "Protocolo de Notificación de Violaciones", content: { en: "When a breach is discovered: (1) Assess scope within 48 hours. (2) Document in incident log. (3) Notify affected individuals within 60 days (mail + phone for urgent). (4) If 500+ affected in a state: notify prominent media outlets. (5) Report to HHS OCR via breach portal. (6) If fewer than 500: log and report annually by March 1. Cost: $50-200 per patient notification (postage, credit monitoring, legal). A 1,000-patient breach can cost $100K+ in notifications alone.", es: "Cuando se descubre una violación: Evaluar alcance en 48 horas, documentar, notificar a individuos afectados dentro de 60 días, reportar al HHS OCR." } },
  { id: "training", icon: Users, en: "Workforce Training Requirements", es: "Requisitos de Capacitación del Personal", content: { en: "ALL workforce members (employees, volunteers, contractors, students) must complete HIPAA privacy and security training: (1) Within 30 days of hire. (2) Annually thereafter. (3) When policies materially change. Training must cover: minimum necessary standard, PHI handling, email/fax security, device encryption, incident reporting, and sanctions for violations. Document completion with sign-off sheets. Keep records for 6 years.", es: "TODOS los miembros del personal deben completar la capacitación de HIPAA dentro de 30 días de contratación y anualmente. Documentar finalización con hojas de firma." } },
  { id: "risk-assessment", icon: Laptop, en: "Annual Security Risk Assessment", es: "Evaluación Anual de Riesgos de Seguridad", content: { en: "REQUIRED by 45 CFR § 164.308(a)(1). Most common HIPAA violation for FQHCs: failure to conduct a risk assessment. Must cover: (1) All systems containing ePHI (EHR, email, file shares, mobile devices). (2) Physical security (server rooms, workstations, paper records). (3) Workforce practices (passwords, access levels, termination procedures). (4) Encryption status of all devices. Use the free HHS SRA Tool or hire an external auditor ($3-5K). Document findings, create mitigation plan, track remediation.", es: "REQUERIDO por 45 CFR § 164.308(a)(1). Violación de HIPAA más común: no realizar evaluación de riesgos. Cubrir todos los sistemas con ePHI." } },
];

export default function HIPAACompliancePage() {
  const locale = useLocale();
  const [expandedTopic, setExpandedTopic] = useState<string | null>("baa");
  const hipaaRegs = getRegulationsByDomain("hipaa-privacy");
  const hipaaRisks = getRisksByDomain("hipaa-privacy");
  const hipaaCases = getCaseStudiesByDomain("hipaa-privacy");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/compliance" className="text-purple-300 text-sm hover:underline mb-4 inline-block">&larr; {locale === "es" ? "Cumplimiento" : "Compliance"}</Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {locale === "es" ? "Cumplimiento HIPAA para FQHCs" : "HIPAA Compliance for FQHCs"}
          </h1>
          <p className="text-purple-200 text-lg max-w-3xl mb-6">
            {locale === "es"
              ? "Proteja los datos del paciente. Evite multas de $100K+. Conozca las reglas."
              : "Protect patient data. Avoid $100K+ fines. Know the rules."}
          </p>
          <button onClick={() => downloadRiskMatrixAsExcel(locale)} className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold px-5 py-2.5 rounded-lg transition-colors">
            <Download className="w-5 h-5" />
            {locale === "es" ? "Descargar Matriz de Riesgos HIPAA (Excel)" : "Download HIPAA Risk Matrix (Excel)"}
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
              <div key={topic.id} className="border border-purple-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedTopic(expanded ? null : topic.id)}
                  aria-expanded={expanded}
                  aria-controls={`topic-content-${topic.id}`}
                  className="w-full text-left p-4 flex items-center gap-3 bg-purple-50 hover:bg-purple-100 transition-colors"
                >
                  <Icon className="w-5 h-5 text-purple-600 flex-shrink-0" aria-hidden="true" />
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

      {/* HIPAA Risks */}
      <section className="bg-purple-50 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">{locale === "es" ? "Riesgos HIPAA Clave" : "Key HIPAA Risks"}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {hipaaRisks.map((risk) => {
              const score = getRiskScore(risk.likelihood, risk.impact);
              const level = getRiskLevel(score);
              const levelColors = { critical: "bg-red-100 text-red-700 border-red-200", high: "bg-amber-100 text-amber-700 border-amber-200", medium: "bg-yellow-100 text-yellow-700 border-yellow-200", low: "bg-green-100 text-green-700 border-green-200" };
              return (
                <div key={risk.id} className="bg-white border border-stone-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded border font-medium ${levelColors[level]}`}>{level.toUpperCase()} ({score})</span>
                    <span className="text-xs text-stone-500">L:{risk.likelihood} × I:{risk.impact}</span>
                  </div>
                  <h3 className="font-bold text-stone-900 text-sm mb-1">{risk.riskCategory}</h3>
                  <p className="text-xs text-stone-600 mb-2">{t(risk.description, locale)}</p>
                  <div className="text-xs text-stone-500">{risk.controls.map((c) => t(c, locale)).join("; ")}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      {hipaaCases.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">{locale === "es" ? "Estudios de Caso HIPAA" : "HIPAA Case Studies"}</h2>
          <div className="space-y-4">
            {hipaaCases.map((cs) => (
              <div key={cs.id} className="border border-stone-200 rounded-xl p-5">
                <div className="text-xs text-stone-500 mb-1">{cs.fqhcType} &bull; {cs.location} &bull; {cs.date}</div>
                <h3 className="font-bold text-stone-900 mb-2">{t(cs.title, locale)}</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div><span className="font-semibold text-red-700">{locale === "es" ? "Desafío: " : "Challenge: "}</span>{t(cs.challenge, locale)}</div>
                  <div><span className="font-semibold text-teal-700">{locale === "es" ? "Resolución: " : "Resolution: "}</span>{t(cs.resolution, locale)}</div>
                </div>
                {cs.penaltyAmount && <div className="text-sm text-red-600 font-medium mt-2">{locale === "es" ? "Costo: " : "Cost: "}{cs.penaltyAmount}</div>}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mt-3 text-sm"><span className="font-semibold text-purple-800">{locale === "es" ? "Lección: " : "Lesson: "}</span>{t(cs.lesson, locale)}</div>
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
            {hipaaRegs.map((reg) => (
              <a key={reg.id} href={reg.primarySourceUrl} target="_blank" rel="noopener noreferrer" className="bg-white border border-stone-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="text-xs font-mono text-purple-600 mb-1">{reg.citations.join(", ")}</div>
                <h3 className="font-bold text-stone-900 text-sm mb-1">{t(reg.title, locale)}</h3>
                <p className="text-xs text-stone-600">{t(reg.summary, locale)}</p>
                <span className="text-xs text-purple-600 mt-2 inline-flex items-center gap-1"><ExternalLink className="w-3 h-3" />{reg.primarySourceOrg}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
