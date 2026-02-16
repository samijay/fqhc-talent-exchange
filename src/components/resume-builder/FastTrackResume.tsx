"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { ArrowLeft, ArrowRight, Download, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROLE_TEMPLATES } from "./resume-templates";
import ResumePreview from "./ResumePreview";
import type { ResumeData } from "./ResumePreview";

/* ------------------------------------------------------------------ */
/*  Role mapping: fast-track role → resume template ID                 */
/* ------------------------------------------------------------------ */

const ROLE_MAP: Record<string, string> = {
  "Community Health Worker (CHW)": "chw",
  "Care Coordinator": "care_coordinator",
  "Case Manager": "case_manager",
  "Medical Assistant": "medical_assistant",
  "Behavioral Health Specialist": "behavioral_health",
  "Registered Nurse (RN)": "registered_nurse",
  "Patient Services Representative": "patient_services",
  "Revenue Cycle / Billing": "revenue_cycle",
};

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

export interface FastTrackResumeProps {
  prefillData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    previousRole: string;
    previousEmployer: string;
    ehrSystems: string[];
    programs: string[];
    bilingual: string;
    currentRegion: string;
    yearsExperience: string;
    additionalLanguages?: string[];
  };
  onBack: () => void;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function FastTrackResume({ prefillData, onBack }: FastTrackResumeProps) {
  const locale = useLocale();
  const isEs = locale === "es";

  /* --- Translations ----------------------------------------------- */
  const t = isEs
    ? {
        title: "Crea Tu CV Rápido",
        subtitle: "Usamos tu información de Fast-Track para crear un CV profesional en minutos.",
        step1Title: "Confirmar Información",
        step2Title: "Tu Experiencia",
        step3Title: "Historial Laboral",
        step4Title: "Vista Previa y Descarga",
        firstName: "Nombre",
        lastName: "Apellido",
        email: "Correo",
        phone: "Teléfono",
        city: "Ciudad",
        role: "Rol",
        selectBullets: "Selecciona las responsabilidades que describen tu trabajo:",
        accomplishment: "¿Cuál es tu mayor logro profesional?",
        accomplishmentPlaceholder: "ej. Reduje las citas perdidas en 30% mediante seguimiento proactivo",
        employer: "Empleador más reciente",
        jobTitle: "Título del puesto",
        startDate: "Fecha de inicio",
        endDate: "Fecha de fin",
        current: "Puesto actual",
        addAnother: "Agregar otro puesto",
        downloadPdf: "Descargar PDF",
        editFull: "Editar en Creador Completo",
        back: "Atrás",
        next: "Siguiente",
        preview: "Vista previa",
        of: "de",
        recommended: "Recomendado para tu rol",
      }
    : {
        title: "Build Your Quick Resume",
        subtitle: "We'll use your Fast-Track info to create a professional resume in minutes.",
        step1Title: "Confirm Your Info",
        step2Title: "Your Experience",
        step3Title: "Work History",
        step4Title: "Preview & Download",
        firstName: "First name",
        lastName: "Last name",
        email: "Email",
        phone: "Phone",
        city: "City",
        role: "Role",
        selectBullets: "Select the responsibilities that describe your work:",
        accomplishment: "What's your biggest professional accomplishment?",
        accomplishmentPlaceholder: "e.g. Reduced missed appointments by 30% through proactive follow-up",
        employer: "Most recent employer",
        jobTitle: "Job title",
        startDate: "Start date",
        endDate: "End date",
        current: "Current position",
        addAnother: "Add another position",
        downloadPdf: "Download PDF",
        editFull: "Edit in Full Resume Builder",
        back: "Back",
        next: "Next",
        preview: "Preview",
        of: "of",
        recommended: "Recommended for your role",
      };

  /* --- State ------------------------------------------------------ */
  const [step, setStep] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);

  // Step 1: Personal info
  const [firstName, setFirstName] = useState(prefillData.firstName);
  const [lastName, setLastName] = useState(prefillData.lastName);
  const [email, setEmail] = useState(prefillData.email);
  const [phone, setPhone] = useState(prefillData.phone);
  const [city, setCity] = useState("");

  // Role mapping
  const roleId = ROLE_MAP[prefillData.previousRole] || "";
  const roleTemplate = ROLE_TEMPLATES.find((r) => r.roleId === roleId);

  // Step 2: Experience bullets + accomplishment
  const [selectedBullets, setSelectedBullets] = useState<string[]>([]);
  const [accomplishment, setAccomplishment] = useState("");

  // Step 3: Work history
  const [employer, setEmployer] = useState(prefillData.previousEmployer);
  const [jobTitle, setJobTitle] = useState(prefillData.previousRole);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCurrent, setIsCurrent] = useState(true);

  // Languages
  const languages = useMemo(() => {
    const langs: string[] = ["English"];
    if (prefillData.bilingual === "Spanish/English") langs.push("Spanish");
    if (prefillData.additionalLanguages) langs.push(...prefillData.additionalLanguages);
    return [...new Set(langs)];
  }, [prefillData.bilingual, prefillData.additionalLanguages]);

  /* --- Build resume data ------------------------------------------ */
  const resumeData: ResumeData = useMemo(
    () => ({
      firstName,
      lastName,
      email,
      phone,
      city,
      region: prefillData.currentRegion,
      roleType: roleId,
      yearsExperience: prefillData.yearsExperience,
      objective: roleTemplate
        ? (isEs ? roleTemplate.esObjectiveTemplate : roleTemplate.objectiveTemplate)
        : "",
      ehrSystems: prefillData.ehrSystems,
      programs: prefillData.programs,
      certifications: [],
      languages,
      selectedBullets,
      workHistory: [
        {
          employer,
          title: jobTitle,
          startDate,
          endDate: isCurrent ? "" : endDate,
          current: isCurrent,
        },
      ],
      education: [],
    }),
    [firstName, lastName, email, phone, city, prefillData, roleId, roleTemplate, isEs, languages, selectedBullets, employer, jobTitle, startDate, endDate, isCurrent],
  );

  /* --- PDF download ----------------------------------------------- */
  async function handleDownload() {
    setIsDownloading(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const el = document.getElementById("fast-track-resume-preview");
      if (!el) return;
      await html2pdf()
        .from(el)
        .set({
          margin: [0.4, 0.5, 0.4, 0.5],
          filename: `${firstName}_${lastName}_Resume.pdf`,
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "in", format: "letter" },
        })
        .save();
    } catch (err) {
      console.error("PDF download error:", err);
    } finally {
      setIsDownloading(false);
    }
  }

  /* --- Bullet toggle ---------------------------------------------- */
  function toggleBullet(bulletId: string) {
    setSelectedBullets((prev) =>
      prev.includes(bulletId) ? prev.filter((b) => b !== bulletId) : [...prev, bulletId],
    );
  }

  /* --- Navigation ------------------------------------------------- */
  const totalSteps = 4;

  /* --- Input classes ---------------------------------------------- */
  const inputClass =
    "mt-1 block w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 focus:border-teal-500 focus:ring-teal-500";

  /* ================================================================ */
  /*  Render                                                           */
  /* ================================================================ */

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-100 to-amber-100">
          <FileText className="size-7 text-teal-700" />
        </div>
        <h2 className="text-2xl font-bold text-stone-900">{t.title}</h2>
        <p className="mt-2 text-sm text-stone-500">{t.subtitle}</p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-stone-500">
          <span>
            {isEs ? "Paso" : "Step"} {step} {t.of} {totalSteps}
          </span>
          <span>{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-stone-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-600 to-teal-400 transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Step 1: Confirm Info                                         */}
      {/* ============================================================ */}
      {step === 1 && (
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-stone-900">{t.step1Title}</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-stone-700">{t.firstName}</label>
              <input className={inputClass} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-stone-700">{t.lastName}</label>
              <input className={inputClass} value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-stone-700">{t.email}</label>
              <input className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-stone-700">{t.phone}</label>
              <input className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-stone-700">{t.city}</label>
              <input className={inputClass} value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Los Angeles" />
            </div>
            <div>
              <label className="text-sm font-medium text-stone-700">{t.role}</label>
              <input value={prefillData.previousRole} disabled className={`${inputClass} bg-stone-50 text-stone-500`} />
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/*  Step 2: Experience Bullets                                   */}
      {/* ============================================================ */}
      {step === 2 && (
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-stone-900">{t.step2Title}</h3>

          {roleTemplate ? (
            <>
              <p className="mt-2 text-sm text-stone-500">{t.selectBullets}</p>
              <div className="mt-4 space-y-2">
                {roleTemplate.bullets.map((bullet) => (
                  <label
                    key={bullet.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                      selectedBullets.includes(bullet.id)
                        ? "border-teal-300 bg-teal-50"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedBullets.includes(bullet.id)}
                      onChange={() => toggleBullet(bullet.id)}
                      className="mt-0.5 size-4 rounded border-stone-300 text-teal-700 focus:ring-teal-500"
                    />
                    <span className="text-sm text-stone-700">
                      {isEs ? bullet.esText : bullet.text}
                    </span>
                  </label>
                ))}
              </div>
            </>
          ) : (
            <p className="mt-4 text-sm text-stone-500 italic">
              {isEs
                ? "No hay plantilla disponible para este rol. Puedes usar el Creador Completo."
                : "No template available for this role. You can use the Full Resume Builder."}
            </p>
          )}

          {/* Accomplishment */}
          <div className="mt-6">
            <label className="text-sm font-medium text-stone-700">{t.accomplishment}</label>
            <textarea
              className={`${inputClass} min-h-[80px] resize-y`}
              value={accomplishment}
              onChange={(e) => setAccomplishment(e.target.value)}
              placeholder={t.accomplishmentPlaceholder}
            />
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/*  Step 3: Work History                                         */}
      {/* ============================================================ */}
      {step === 3 && (
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-stone-900">{t.step3Title}</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-stone-700">{t.employer}</label>
              <input className={inputClass} value={employer} onChange={(e) => setEmployer(e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-stone-700">{t.jobTitle}</label>
              <input className={inputClass} value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-stone-700">{t.startDate}</label>
              <input type="month" className={inputClass} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-stone-700">{t.endDate}</label>
              <input
                type="month"
                className={`${inputClass} ${isCurrent ? "opacity-50" : ""}`}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={isCurrent}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 text-sm text-stone-700">
                <input
                  type="checkbox"
                  checked={isCurrent}
                  onChange={(e) => setIsCurrent(e.target.checked)}
                  className="size-4 rounded border-stone-300 text-teal-700 focus:ring-teal-500"
                />
                {t.current}
              </label>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/*  Step 4: Preview & Download                                   */}
      {/* ============================================================ */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-stone-900">{t.step4Title}</h3>
            <p className="mt-1 text-sm text-stone-500">
              {isEs
                ? "Revisa tu CV y descárgalo como PDF."
                : "Review your resume and download it as a PDF."}
            </p>
          </div>

          {/* Resume preview */}
          <div
            id="fast-track-resume-preview"
            className="mx-auto max-w-[650px] rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
          >
            <ResumePreview data={resumeData} />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-teal-700 text-white hover:bg-teal-800"
              size="lg"
            >
              <Download className="mr-2 size-4" />
              {isDownloading
                ? (isEs ? "Descargando..." : "Downloading...")
                : t.downloadPdf}
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
            >
              <a href={`/${locale}/resume-builder`}>
                <Sparkles className="mr-2 size-4" />
                {t.editFull}
              </a>
            </Button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/*  Navigation                                                   */}
      {/* ============================================================ */}
      {step < 4 && (
        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => {
              if (step === 1) onBack();
              else setStep(step - 1);
            }}
          >
            <ArrowLeft className="mr-2 size-4" />
            {t.back}
          </Button>
          <Button
            onClick={() => setStep(step + 1)}
            className="bg-teal-700 text-white hover:bg-teal-800"
          >
            {step === 3 ? t.preview : t.next}
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      )}

      {step === 4 && (
        <div className="mt-6 flex justify-start">
          <Button variant="outline" onClick={() => setStep(3)}>
            <ArrowLeft className="mr-2 size-4" />
            {t.back}
          </Button>
        </div>
      )}
    </div>
  );
}
