"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Download,
  Save,
  Pencil,
  Plus,
  Trash2,
  Heart,
  Users,
  Stethoscope,
  Brain,
  Briefcase,
  FileText,
  Upload,
  Loader2,
  AlertCircle,
  BarChart3,
  ArrowRight,
  Activity,
  Phone,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ResumePreview from "./ResumePreview";
import type { ResumeData, WorkHistoryEntry, EducationEntry } from "./ResumePreview";
import CareerInsights from "./CareerInsights";
import type { AssessmentResults } from "@/lib/career-assessment-engine";
import {
  ROLE_TEMPLATES,
  COMMON_CERTIFICATIONS,
  LANGUAGE_OPTIONS,
} from "./resume-templates";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const REGIONS = [
  "Los Angeles",
  "San Diego",
  "Bay Area",
  "Sacramento",
  "Central Valley",
  "Inland Empire",
  "Other California",
] as const;

const YEARS_OPTIONS = [
  { en: "Less than 1 year", es: "Menos de 1 año" },
  { en: "1-2 years", es: "1-2 años" },
  { en: "3-5 years", es: "3-5 años" },
  { en: "6-10 years", es: "6-10 años" },
  { en: "10+ years", es: "10+ años" },
] as const;

const EHR_SYSTEMS = [
  "OCHIN Epic",
  "NextGen",
  "eClinicalWorks",
  "Cerner",
  "athenahealth",
  "Other",
] as const;

const PROGRAMS = [
  "ECM",
  "CCM",
  "Community Supports",
  "TCM",
  "BH-ASO",
  "BH Integration",
] as const;

const ROLE_OPTIONS = [
  { id: "chw", label: "Community Health Worker", esLabel: "Promotor/a de Salud", icon: Heart },
  { id: "care_coordinator", label: "Care Coordinator", esLabel: "Coordinador/a de Atención", icon: Users },
  { id: "medical_assistant", label: "Medical Assistant", esLabel: "Asistente Médico/a", icon: Stethoscope },
  { id: "case_manager", label: "Case Manager", esLabel: "Administrador/a de Casos", icon: Briefcase },
  { id: "behavioral_health", label: "Behavioral Health Specialist", esLabel: "Especialista en Salud Conductual", icon: Brain },
  { id: "registered_nurse", label: "Registered Nurse (RN)", esLabel: "Enfermera/o Registrada/o (RN)", icon: Activity },
  { id: "patient_services", label: "Patient Services Representative", esLabel: "Representante de Servicios al Paciente", icon: Phone },
  { id: "revenue_cycle", label: "Revenue Cycle / Billing", esLabel: "Ciclo de Ingresos / Facturación", icon: DollarSign },
] as const;

const TOTAL_STEPS = 5;

const EMPTY_WORK_ENTRY: WorkHistoryEntry = {
  employer: "",
  title: "",
  startDate: "",
  endDate: "",
  current: false,
};

const EMPTY_EDUCATION: EducationEntry = {
  institution: "",
  degree: "",
  year: "",
};

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  roleType?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ResumeBuilder() {
  const locale = useLocale();

  // Upload vs build-from-scratch mode
  const [mode, setMode] = useState<"choose" | "upload" | "build">("choose");
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const [originalResumeText, setOriginalResumeText] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ResumeData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    region: "",
    roleType: "",
    yearsExperience: "",
    objective: "",
    ehrSystems: [],
    programs: [],
    certifications: [],
    languages: [],
    selectedBullets: [],
    workHistory: [{ ...EMPTY_WORK_ENTRY }],
    education: [{ ...EMPTY_EDUCATION }],
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Career Insights Assessment
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResults | null>(null);

  // Resume output language
  const [resumeLanguage, setResumeLanguage] = useState<"auto" | "en" | "es">("auto");

  /* --- Helpers ---------------------------------------------------- */

  function toggleCheckbox(
    value: string,
    list: string[],
    field: keyof ResumeData,
  ) {
    const updated = list.includes(value)
      ? list.filter((v) => v !== value)
      : [...list, value];
    setFormData((prev) => ({ ...prev, [field]: updated }));
  }

  function updateWorkHistory(index: number, updates: Partial<WorkHistoryEntry>) {
    setFormData((prev) => ({
      ...prev,
      workHistory: prev.workHistory.map((entry, i) =>
        i === index ? { ...entry, ...updates } : entry,
      ),
    }));
  }

  function addWorkEntry() {
    setFormData((prev) => ({
      ...prev,
      workHistory: [...prev.workHistory, { ...EMPTY_WORK_ENTRY }],
    }));
  }

  function removeWorkEntry(index: number) {
    setFormData((prev) => ({
      ...prev,
      workHistory: prev.workHistory.filter((_, i) => i !== index),
    }));
  }

  function updateEducation(index: number, updates: Partial<EducationEntry>) {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((entry, i) =>
        i === index ? { ...entry, ...updates } : entry,
      ),
    }));
  }

  function addEducation() {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { ...EMPTY_EDUCATION }],
    }));
  }

  function removeEducation(index: number) {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  }

  function validateStep(): boolean {
    const next: FormErrors = {};
    if (step === 1) {
      if (!formData.firstName.trim()) next.firstName = locale === "es" ? "El nombre es obligatorio" : "First name is required";
      if (!formData.lastName.trim()) next.lastName = locale === "es" ? "El apellido es obligatorio" : "Last name is required";
      if (!formData.email.trim()) {
        next.email = locale === "es" ? "El correo electrónico es obligatorio" : "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        next.email = locale === "es" ? "Ingresa un correo electrónico válido" : "Please enter a valid email";
      }
    }
    if (step === 2) {
      if (!formData.roleType) next.roleType = locale === "es" ? "Selecciona un tipo de puesto" : "Please select a role type";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleNext() {
    if (!validateStep()) return;
    if (step < TOTAL_STEPS) setStep(step + 1);
  }

  function handleBack() {
    if (step > 1) setStep(step - 1);
  }

  function handleSelectRole(roleId: string) {
    const template = ROLE_TEMPLATES.find((r) => r.roleId === roleId);
    setFormData((prev) => ({
      ...prev,
      roleType: roleId,
      objective: template
        ? (locale === "es" ? template.esObjectiveTemplate : template.objectiveTemplate)
        : prev.objective,
      selectedBullets: [], // reset bullets when role changes
    }));
  }

  function getResumeLanguageOverride(): "en" | "es" | undefined {
    if (resumeLanguage === "auto") return undefined; // use locale default
    return resumeLanguage;
  }

  async function handleDownloadPDF() {
    const element = document.getElementById("resume-preview");
    if (!element) return;

    setIsDownloading(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const langSuffix = resumeLanguage === "es" ? "_ES" : resumeLanguage === "en" ? "_EN" : "";
      await html2pdf()
        .set({
          margin: [0.4, 0.4, 0.4, 0.4],
          filename: `${formData.firstName}_${formData.lastName}_Resume${langSuffix}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .from(element)
        .save();
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setIsDownloading(false);
    }
  }

  async function handleSaveProfile() {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch("/api/resume-profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim() || undefined,
          city: formData.city.trim() || undefined,
          region: formData.region || undefined,
          roleType: formData.roleType,
          yearsExperience: formData.yearsExperience || undefined,
          objective: formData.objective || undefined,
          ehrSystems: formData.ehrSystems,
          programs: formData.programs,
          certifications: formData.certifications,
          languages: formData.languages,
          selectedBullets: formData.selectedBullets,
          workHistory: formData.workHistory.filter((w) => w.employer || w.title),
          education: formData.education.filter((e) => e.institution || e.degree),
          originalResumeUrl: uploadedFileUrl || undefined,
          originalResumeText: originalResumeText || undefined,
          assessmentResults: assessmentResults || undefined,
        }),
      });

      if (res.ok) {
        setSaveSuccess(true);
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setIsSaving(false);
    }
  }

  /* --- Resume Upload ----------------------------------------------- */

  async function handleFileUpload(file: File) {
    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    const extension = file.name.split(".").pop()?.toLowerCase();
    const isAllowedExt = ["pdf", "docx", "txt"].includes(extension || "");

    if (!allowedTypes.includes(file.type) && !isAllowedExt) {
      setUploadError(
        locale === "es"
          ? "Tipo de archivo no soportado. Sube un archivo PDF, DOCX o TXT."
          : "Unsupported file type. Please upload a PDF, DOCX, or TXT file."
      );
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError(
        locale === "es"
          ? "El archivo es demasiado grande. Tamaño máximo: 5MB."
          : "File is too large. Maximum size is 5MB."
      );
      return;
    }

    setIsUploading(true);
    setUploadError("");

    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);

      const res = await fetch("/api/parse-resume", {
        method: "POST",
        body: formDataUpload,
      });

      const data = await res.json();

      if (!res.ok) {
        setUploadError(data.error || (locale === "es" ? "No se pudo procesar este archivo." : "Could not process this file."));
        return;
      }

      // Store upload metadata
      setUploadedFileUrl(data.fileUrl || "");
      setOriginalResumeText(data.rawText || "");

      // Pre-fill form with parsed data
      const parsed = data.parsed;
      setFormData((prev) => ({
        ...prev,
        firstName: parsed.firstName || prev.firstName,
        lastName: parsed.lastName || prev.lastName,
        email: parsed.email || prev.email,
        phone: parsed.phone || prev.phone,
        city: parsed.city || prev.city,
        region: parsed.region || prev.region,
        objective: parsed.objective || prev.objective,
        ehrSystems: parsed.ehrSystems?.length > 0 ? parsed.ehrSystems : prev.ehrSystems,
        programs: parsed.programs?.length > 0 ? parsed.programs : prev.programs,
        certifications: parsed.certifications?.length > 0 ? parsed.certifications : prev.certifications,
        languages: parsed.languages?.length > 0 ? parsed.languages : prev.languages,
        workHistory: parsed.workHistory?.length > 0 ? parsed.workHistory : prev.workHistory,
        education: parsed.education?.length > 0 ? parsed.education : prev.education,
      }));

      // Move to the build flow
      setMode("build");
      setStep(1);
    } catch {
      setUploadError(
        locale === "es"
          ? "Algo salió mal al procesar tu currículum. Intenta de nuevo o crea desde cero."
          : "Something went wrong processing your resume. Please try again or build from scratch."
      );
    } finally {
      setIsUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  }

  /* --- Progress Bar ----------------------------------------------- */

  const progress = step === TOTAL_STEPS ? 100 : ((step - 1) / (TOTAL_STEPS - 1)) * 100;

  const progressBar = (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-stone-700">
          {locale === "es" ? `Paso ${step} de ${TOTAL_STEPS}` : `Step ${step} of ${TOTAL_STEPS}`}
        </span>
        <span className="text-sm text-stone-500">
          {Math.round(progress)}% {locale === "es" ? "completo" : "complete"}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-stone-200">
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-amber-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );

  /* --- Navigation Buttons ----------------------------------------- */

  const navButtons = (
    <div className="mt-8 flex items-center justify-between">
      {step > 1 ? (
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-6 py-2 font-medium text-stone-700 hover:text-stone-900"
        >
          <ChevronLeft className="size-5" /> {locale === "es" ? "Atrás" : "Back"}
        </button>
      ) : (
        <div />
      )}
      <Button
        onClick={handleNext}
        className="flex items-center gap-2 bg-gradient-to-r from-teal-700 to-amber-600 px-6 py-3 font-semibold text-white hover:shadow-lg"
      >
        {step === TOTAL_STEPS - 1
          ? (locale === "es" ? "Vista Previa" : "Preview Resume")
          : (locale === "es" ? "Siguiente" : "Next")}{" "}
        <ChevronRight className="size-5" />
      </Button>
    </div>
  );

  /* ================================================================ */
  /*  Step 0: Choose Mode (Upload vs Build)                            */
  /* ================================================================ */

  if (mode === "choose") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 py-14 text-center text-white sm:py-20">
          <div className="mx-auto flex items-center justify-center gap-2 mb-4">
            <FileText className="size-8" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {locale === "es" ? "Creador de Currículum FQHC" : "FQHC Resume Builder"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-teal-100/80 sm:text-lg">
            {locale === "es"
              ? "Crea un currículum profesional adaptado para puestos en centros de salud comunitarios. Gratis, con puntos clave optimizados para contratación FQHC."
              : "Build a professional resume tailored for community health center roles. Free, with pre-written bullet points optimized for FQHC hiring."}
          </p>
        </section>

        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow sm:p-10">
            <h2 className="mb-2 text-xl font-bold text-stone-900 text-center">
              {locale === "es" ? "¿Cómo te gustaría comenzar?" : "How would you like to get started?"}
            </h2>
            <p className="mb-8 text-sm text-stone-500 text-center">
              {locale === "es"
                ? "Sube un currículum existente para completar tu información automáticamente, o comienza desde cero con nuestro constructor guiado."
                : "Upload an existing resume to pre-fill your information, or start fresh with our guided builder."}
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Upload Option */}
              <button
                onClick={() => setMode("upload")}
                className="group rounded-xl border-2 border-stone-200 p-6 text-left transition-all duration-200 hover:border-teal-500 hover:shadow-lg"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700 group-hover:bg-teal-100">
                  <Upload className="size-6" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">
                  {locale === "es" ? "Subir Tu Currículum" : "Upload Your Resume"}
                </h3>
                <p className="mt-1 text-sm text-stone-500">
                  {locale === "es"
                    ? "Sube un archivo PDF, DOCX o de texto y completaremos tu información automáticamente."
                    : "Upload a PDF, DOCX, or text file and we\u0027ll pre-fill your information automatically."}
                </p>
              </button>

              {/* Build From Scratch Option */}
              <button
                onClick={() => {
                  setMode("build");
                  setStep(1);
                }}
                className="group rounded-xl border-2 border-stone-200 p-6 text-left transition-all duration-200 hover:border-amber-500 hover:shadow-lg"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-100">
                  <Pencil className="size-6" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">
                  {locale === "es" ? "Crear Desde Cero" : "Build From Scratch"}
                </h3>
                <p className="mt-1 text-sm text-stone-500">
                  {locale === "es"
                    ? "Comienza desde cero con nuestro constructor guiado y plantillas optimizadas para FQHC."
                    : "Start fresh with our guided builder and FQHC-optimized templates."}
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  Upload Mode: File Upload Screen                                  */
  /* ================================================================ */

  if (mode === "upload") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
        <section className="bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 py-14 text-center text-white sm:py-20">
          <div className="mx-auto flex items-center justify-center gap-2 mb-4">
            <Upload className="size-8" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {locale === "es" ? "Subir Tu Currículum" : "Upload Your Resume"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-teal-100/80 sm:text-lg">
            {locale === "es"
              ? "Extraeremos tu información y crearemos un currículum mejorado y optimizado para FQHC usando nuestra plantilla profesional."
              : "We\u0027ll extract your information and create an enhanced, FQHC-optimized resume using our professional template."}
          </p>
        </section>

        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow sm:p-10">
            {/* Drag & Drop Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all duration-200 ${
                isDragOver
                  ? "border-teal-500 bg-teal-50"
                  : "border-stone-300 bg-stone-50 hover:border-teal-400 hover:bg-stone-100"
              }`}
            >
              <input
                type="file"
                accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                onChange={handleFileInput}
                className="absolute inset-0 cursor-pointer opacity-0"
                disabled={isUploading}
              />

              {isUploading ? (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="size-10 animate-spin text-teal-700" />
                  <p className="text-sm font-medium text-stone-700">
                    {locale === "es" ? "Procesando tu currículum..." : "Processing your resume..."}
                  </p>
                  <p className="text-xs text-stone-500">
                    {locale === "es" ? "Extrayendo texto y analizando tu información" : "Extracting text and parsing your information"}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="flex size-14 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                    <Upload className="size-7" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-stone-700">
                      {locale === "es" ? (
                        <>Arrastra y suelta tu currículum aquí, o{" "}
                        <span className="text-teal-700 underline">haz clic para buscar</span></>
                      ) : (
                        <>Drag and drop your resume here, or{" "}
                        <span className="text-teal-700 underline">click to browse</span></>
                      )}
                    </p>
                    <p className="mt-1 text-xs text-stone-500">
                      {locale === "es"
                        ? "Soporta archivos PDF, DOCX y TXT (máx. 5MB)"
                        : "Supports PDF, DOCX, and TXT files (max 5MB)"}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Upload Error */}
            {uploadError && (
              <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <p>{uploadError}</p>
              </div>
            )}

            {/* Back to choice */}
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setMode("choose");
                  setUploadError("");
                }}
                className="text-sm font-medium text-stone-600 hover:text-stone-900"
              >
                &larr; {locale === "es" ? "Volver a opciones" : "Back to options"}
              </button>
              <span className="mx-3 text-stone-300">|</span>
              <button
                onClick={() => {
                  setMode("build");
                  setStep(1);
                }}
                className="text-sm font-medium text-teal-700 hover:text-teal-800"
              >
                {locale === "es" ? "Crear desde cero" : "Build from scratch instead"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  Step 1: Personal Information                                     */
  /* ================================================================ */

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 py-14 text-center text-white sm:py-20">
          <div className="mx-auto flex items-center justify-center gap-2 mb-4">
            <FileText className="size-8" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {locale === "es" ? "Creador de Currículum FQHC" : "FQHC Resume Builder"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-teal-100/80 sm:text-lg">
            {locale === "es"
              ? "Crea un currículum profesional adaptado para puestos en centros de salud comunitarios. Gratis, con puntos clave optimizados para contratación FQHC."
              : "Build a professional resume tailored for community health center roles. Free, with pre-written bullet points optimized for FQHC hiring."}
          </p>
        </section>

        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
          {uploadedFileUrl && (
            <div className="mb-4 rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-700">
              <CheckCircle className="mr-1.5 inline-block size-4" />
              {locale === "es"
                ? "¡Currículum subido! Revisa y edita tu información completada a continuación."
                : "Resume uploaded! Review and edit your pre-filled information below."}
            </div>
          )}
          {progressBar}

          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow sm:p-10">
            <h2 className="mb-6 text-xl font-bold text-stone-900">
              {locale === "es" ? "Información Personal" : "Personal Information"}
            </h2>

            {/* Name row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">
                  {locale === "es" ? "Nombre" : "First Name"} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, firstName: e.target.value }))
                  }
                  placeholder={locale === "es" ? "María" : "Maria"}
                  className="mt-1.5"
                  aria-invalid={!!errors.firstName}
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">
                  {locale === "es" ? "Apellido" : "Last Name"} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, lastName: e.target.value }))
                  }
                  placeholder={locale === "es" ? "García" : "Garcia"}
                  className="mt-1.5"
                  aria-invalid={!!errors.lastName}
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email + Phone */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="email">
                  {locale === "es" ? "Correo Electrónico" : "Email"} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder={locale === "es" ? "maria@ejemplo.com" : "maria@example.com"}
                  className="mt-1.5"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">{locale === "es" ? "Teléfono" : "Phone"}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, phone: e.target.value }))
                  }
                  placeholder={locale === "es" ? "(555) 123-4567" : "(555) 123-4567"}
                  className="mt-1.5"
                />
              </div>
            </div>

            {/* City + Region */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="city">{locale === "es" ? "Ciudad" : "City"}</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, city: e.target.value }))
                  }
                  placeholder="Los Angeles"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="region">{locale === "es" ? "Región" : "Region"}</Label>
                <Select
                  value={formData.region}
                  onValueChange={(v) =>
                    setFormData((p) => ({ ...p, region: v }))
                  }
                >
                  <SelectTrigger className="mt-1.5 w-full">
                    <SelectValue placeholder={locale === "es" ? "Selecciona tu región" : "Select your region"} />
                  </SelectTrigger>
                  <SelectContent>
                    {REGIONS.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {navButtons}
          </div>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  Step 2: Role & Experience                                        */
  /* ================================================================ */

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
          {progressBar}

          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow sm:p-10">
            <h2 className="mb-6 text-xl font-bold text-stone-900">
              {locale === "es" ? "Puesto y Experiencia" : "Role & Experience"}
            </h2>

            {/* Role selection */}
            <div className="mb-6">
              <Label className="mb-3 block">
                {locale === "es" ? "¿Para qué tipo de puesto te estás postulando?" : "What type of role are you applying for?"}{" "}
                <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {ROLE_OPTIONS.map((role) => {
                  const Icon = role.icon;
                  const isSelected = formData.roleType === role.id;
                  return (
                    <button
                      key={role.id}
                      onClick={() => handleSelectRole(role.id)}
                      className={`rounded-xl border-2 p-4 transition-all duration-200 ${
                        isSelected
                          ? "border-teal-500 bg-teal-50 shadow-lg"
                          : "border-stone-200 bg-white hover:border-stone-300 hover:shadow-md"
                      }`}
                    >
                      <Icon
                        className={`mx-auto mb-2 size-7 ${
                          isSelected ? "text-teal-700" : "text-stone-400"
                        }`}
                      />
                      <p
                        className={`text-center text-xs font-medium ${
                          isSelected ? "text-teal-950" : "text-stone-700"
                        }`}
                      >
                        {locale === "es" ? role.esLabel : role.label}
                      </p>
                    </button>
                  );
                })}
              </div>
              {errors.roleType && (
                <p className="mt-2 text-xs text-red-500">{errors.roleType}</p>
              )}
            </div>

            {/* Years of experience */}
            <div className="mb-6">
              <Label htmlFor="years">{locale === "es" ? "Años de Experiencia en Salud" : "Years of Healthcare Experience"}</Label>
              <Select
                value={formData.yearsExperience}
                onValueChange={(v) =>
                  setFormData((p) => ({ ...p, yearsExperience: v }))
                }
              >
                <SelectTrigger className="mt-1.5 w-full">
                  <SelectValue placeholder={locale === "es" ? "Selecciona nivel de experiencia" : "Select experience level"} />
                </SelectTrigger>
                <SelectContent>
                  {YEARS_OPTIONS.map((y) => (
                    <SelectItem key={y.en} value={y.en}>
                      {locale === "es" ? y.es : y.en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Professional objective */}
            <div>
              <Label htmlFor="objective">{locale === "es" ? "Resumen Profesional" : "Professional Summary"}</Label>
              <p className="mt-1 text-xs text-stone-500">
                {locale === "es"
                  ? "Pre-completado según tu puesto. Siéntete libre de personalizarlo."
                  : "Pre-filled based on your role. Feel free to customize it."}
              </p>
              <Textarea
                id="objective"
                value={formData.objective}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, objective: e.target.value }))
                }
                rows={4}
                className="mt-1.5"
                placeholder={locale === "es" ? "Escribe un breve resumen profesional..." : "Write a brief professional summary..."}
              />
            </div>

            {navButtons}
          </div>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  Step 3: Skills & Qualifications                                  */
  /* ================================================================ */

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
          {progressBar}

          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow sm:p-10">
            <h2 className="mb-6 text-xl font-bold text-stone-900">
              {locale === "es" ? "Habilidades y Calificaciones" : "Skills & Qualifications"}
            </h2>

            {/* EHR Systems */}
            <fieldset className="mb-6">
              <legend className="text-sm font-medium text-stone-900">
                {locale === "es" ? "Sistemas EHR" : "EHR Systems"}
              </legend>
              <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3">
                {EHR_SYSTEMS.map((system) => (
                  <label
                    key={system}
                    className="flex cursor-pointer items-center gap-2 text-sm text-stone-700"
                  >
                    <input
                      type="checkbox"
                      checked={formData.ehrSystems.includes(system)}
                      onChange={() =>
                        toggleCheckbox(system, formData.ehrSystems, "ehrSystems")
                      }
                      className="size-4 rounded border-stone-300 text-teal-700 focus:ring-teal-500"
                    />
                    {system}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Programs */}
            <fieldset className="mb-6">
              <legend className="text-sm font-medium text-stone-900">
                {locale === "es" ? "Programas" : "Programs"}
              </legend>
              <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3">
                {PROGRAMS.map((program) => (
                  <label
                    key={program}
                    className="flex cursor-pointer items-center gap-2 text-sm text-stone-700"
                  >
                    <input
                      type="checkbox"
                      checked={formData.programs.includes(program)}
                      onChange={() =>
                        toggleCheckbox(program, formData.programs, "programs")
                      }
                      className="size-4 rounded border-stone-300 text-teal-700 focus:ring-teal-500"
                    />
                    {program}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Certifications */}
            <fieldset className="mb-6">
              <legend className="text-sm font-medium text-stone-900">
                {locale === "es" ? "Certificaciones" : "Certifications"}
              </legend>
              <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3">
                {COMMON_CERTIFICATIONS.map((cert) => (
                  <label
                    key={cert}
                    className="flex cursor-pointer items-center gap-2 text-sm text-stone-700"
                  >
                    <input
                      type="checkbox"
                      checked={formData.certifications.includes(cert)}
                      onChange={() =>
                        toggleCheckbox(
                          cert,
                          formData.certifications,
                          "certifications",
                        )
                      }
                      className="size-4 rounded border-stone-300 text-teal-700 focus:ring-teal-500"
                    />
                    {cert}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Languages */}
            <fieldset>
              <legend className="text-sm font-medium text-stone-900">
                {locale === "es" ? "Idiomas" : "Languages"}
              </legend>
              <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3">
                {LANGUAGE_OPTIONS.map((lang) => (
                  <label
                    key={lang}
                    className="flex cursor-pointer items-center gap-2 text-sm text-stone-700"
                  >
                    <input
                      type="checkbox"
                      checked={formData.languages.includes(lang)}
                      onChange={() =>
                        toggleCheckbox(lang, formData.languages, "languages")
                      }
                      className="size-4 rounded border-stone-300 text-teal-700 focus:ring-teal-500"
                    />
                    {lang}
                  </label>
                ))}
              </div>
            </fieldset>

            {navButtons}
          </div>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  Step 4: Experience Details                                       */
  /* ================================================================ */

  if (step === 4) {
    const roleTemplate = ROLE_TEMPLATES.find(
      (r) => r.roleId === formData.roleType,
    );

    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
          {progressBar}

          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow sm:p-10">
            {/* Guided Bullets */}
            {roleTemplate && (
              <div className="mb-8">
                <h2 className="mb-2 text-xl font-bold text-stone-900">
                  {locale === "es" ? "Describe Tu Experiencia" : "Describe Your Experience"}
                </h2>
                <p className="mb-4 text-sm text-stone-500">
                  {locale === "es"
                    ? "Selecciona los puntos que describen tu experiencia. Estos aparecerán en tu currículum."
                    : "Select the bullet points that describe your experience. These will appear on your resume."}
                </p>

                <div className="space-y-2.5">
                  {roleTemplate.bullets.map((bullet) => {
                    const isSelected = formData.selectedBullets.includes(
                      bullet.id,
                    );
                    return (
                      <button
                        key={bullet.id}
                        onClick={() =>
                          toggleCheckbox(
                            bullet.id,
                            formData.selectedBullets,
                            "selectedBullets",
                          )
                        }
                        className={`w-full rounded-lg border-2 p-3 text-left transition-all duration-200 ${
                          isSelected
                            ? "border-amber-500 bg-amber-50"
                            : "border-stone-200 bg-white hover:border-stone-300"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border-2 ${
                              isSelected
                                ? "border-amber-500 bg-amber-500"
                                : "border-stone-300"
                            }`}
                          >
                            {isSelected && (
                              <CheckCircle className="size-4 text-white" />
                            )}
                          </div>
                          <span
                            className={`text-sm ${
                              isSelected ? "text-amber-900" : "text-stone-700"
                            }`}
                          >
                            {locale === "es" ? bullet.esText : bullet.text}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Work History */}
            <div className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-stone-900">
                  {locale === "es" ? "Historial Laboral" : "Work History"}
                </h3>
                <button
                  onClick={addWorkEntry}
                  className="flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800"
                >
                  <Plus className="size-4" /> {locale === "es" ? "Agregar Puesto" : "Add Position"}
                </button>
              </div>

              <div className="space-y-6">
                {formData.workHistory.map((entry, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-stone-200 bg-stone-50 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-semibold text-stone-600">
                        {locale === "es" ? `Puesto ${i + 1}` : `Position ${i + 1}`}
                      </span>
                      {formData.workHistory.length > 1 && (
                        <button
                          onClick={() => removeWorkEntry(i)}
                          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="size-3" /> {locale === "es" ? "Eliminar" : "Remove"}
                        </button>
                      )}
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <Label className="text-xs">{locale === "es" ? "Empleador / Organización" : "Employer / Organization"}</Label>
                        <Input
                          value={entry.employer}
                          onChange={(e) =>
                            updateWorkHistory(i, { employer: e.target.value })
                          }
                          placeholder={locale === "es" ? "Centro de Salud Comunitario de..." : "Community Health Center of..."}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">{locale === "es" ? "Título del Puesto" : "Job Title"}</Label>
                        <Input
                          value={entry.title}
                          onChange={(e) =>
                            updateWorkHistory(i, { title: e.target.value })
                          }
                          placeholder={locale === "es" ? "Coordinador/a de Atención" : "Care Coordinator"}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">{locale === "es" ? "Fecha de Inicio" : "Start Date"}</Label>
                        <Input
                          type="month"
                          value={entry.startDate}
                          onChange={(e) =>
                            updateWorkHistory(i, { startDate: e.target.value })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">{locale === "es" ? "Fecha de Fin" : "End Date"}</Label>
                        <Input
                          type="month"
                          value={entry.endDate}
                          onChange={(e) =>
                            updateWorkHistory(i, { endDate: e.target.value })
                          }
                          className="mt-1"
                          disabled={entry.current}
                        />
                        <label className="mt-1.5 flex items-center gap-2 text-xs text-stone-600">
                          <input
                            type="checkbox"
                            checked={entry.current}
                            onChange={(e) =>
                              updateWorkHistory(i, {
                                current: e.target.checked,
                                endDate: e.target.checked ? "" : entry.endDate,
                              })
                            }
                            className="size-3.5 rounded border-stone-300 text-teal-700"
                          />
                          {locale === "es" ? "Trabajo aquí actualmente" : "I currently work here"}
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-stone-900">{locale === "es" ? "Educación" : "Education"}</h3>
                <button
                  onClick={addEducation}
                  className="flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800"
                >
                  <Plus className="size-4" /> {locale === "es" ? "Agregar Educación" : "Add Education"}
                </button>
              </div>

              <div className="space-y-4">
                {formData.education.map((entry, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-stone-200 bg-stone-50 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-semibold text-stone-600">
                        {locale === "es" ? `Educación ${i + 1}` : `Education ${i + 1}`}
                      </span>
                      {formData.education.length > 1 && (
                        <button
                          onClick={() => removeEducation(i)}
                          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="size-3" /> {locale === "es" ? "Eliminar" : "Remove"}
                        </button>
                      )}
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <div>
                        <Label className="text-xs">{locale === "es" ? "Escuela / Institución" : "School / Institution"}</Label>
                        <Input
                          value={entry.institution}
                          onChange={(e) =>
                            updateEducation(i, {
                              institution: e.target.value,
                            })
                          }
                          placeholder={locale === "es" ? "Colegio Comunitario de..." : "City College of..."}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">{locale === "es" ? "Título / Certificado" : "Degree / Certificate"}</Label>
                        <Input
                          value={entry.degree}
                          onChange={(e) =>
                            updateEducation(i, { degree: e.target.value })
                          }
                          placeholder={locale === "es" ? "Asociado en Ciencias de la Salud" : "Associate's in Health Science"}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">{locale === "es" ? "Año" : "Year"}</Label>
                        <Input
                          value={entry.year}
                          onChange={(e) =>
                            updateEducation(i, { year: e.target.value })
                          }
                          placeholder="2022"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {navButtons}
          </div>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  Career Insights Assessment (after Step 5)                        */
  /* ================================================================ */

  if (showAssessment) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
        <CareerInsights
          onComplete={(results) => {
            setAssessmentResults(results);
            // Auto-save assessment results with profile
            handleSaveProfile();
          }}
          onSkip={() => setShowAssessment(false)}
        />
      </div>
    );
  }

  /* ================================================================ */
  /*  Step 5: Preview & Download                                       */
  /* ================================================================ */

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        {/* Actions */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-stone-900">
            {locale === "es" ? "Vista Previa de Tu Currículum" : "Your Resume Preview"}
          </h2>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex items-center justify-center gap-1.5 text-sm font-medium text-stone-600 hover:text-stone-900"
            >
              <Pencil className="size-4" /> {locale === "es" ? "Editar" : "Edit"}
            </button>
            <Button
              onClick={handleSaveProfile}
              disabled={isSaving}
              variant="outline"
              className="flex w-full items-center justify-center gap-1.5 border-teal-700 text-teal-700 hover:bg-teal-50 sm:w-auto"
            >
              <Save className="size-4" />
              {isSaving
                ? (locale === "es" ? "Guardando..." : "Saving...")
                : (locale === "es" ? "Guardar Perfil" : "Save Profile")}
            </Button>
            <Button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex w-full items-center justify-center gap-1.5 bg-gradient-to-r from-teal-700 to-amber-600 text-white hover:shadow-lg sm:w-auto"
            >
              <Download className="size-4" />
              {isDownloading
                ? (locale === "es" ? "Generando..." : "Generating...")
                : (locale === "es" ? "Descargar PDF" : "Download PDF")}
            </Button>
          </div>
        </div>

        {/* Resume Language Selector */}
        <div className="mb-6 rounded-xl border border-stone-200 bg-white p-4">
          <p className="mb-3 text-sm font-semibold text-stone-700">
            {locale === "es" ? "Idioma del Currículum:" : "Resume Language:"}
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "auto" as const, label: locale === "es" ? "Automático (Español)" : "Automatic (English)", shortLabel: locale === "es" ? "Auto (ES)" : "Auto (EN)" },
              { value: "en" as const, label: "English" },
              { value: "es" as const, label: "Español" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setResumeLanguage(option.value)}
                className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${
                  resumeLanguage === option.value
                    ? "border-teal-500 bg-teal-50 text-teal-800"
                    : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          {resumeLanguage !== "auto" && (
            <p className="mt-2 text-xs text-stone-500">
              {locale === "es"
                ? `Tu currículum se generará en ${resumeLanguage === "en" ? "inglés" : "español"}. Los encabezados de sección y los puntos de la plantilla se traducirán automáticamente.`
                : `Your resume will be generated in ${resumeLanguage === "en" ? "English" : "Spanish"}. Section headers and template bullet points will be translated automatically.`}
            </p>
          )}
        </div>

        {saveSuccess && (
          <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            {locale === "es"
              ? "¡Perfil guardado! Puedes regresar en cualquier momento para actualizar tu currículum."
              : "Profile saved! You can return anytime to update your resume."}
          </div>
        )}

        {/* Resume Preview */}
        <div className="overflow-hidden rounded-xl border border-stone-200 shadow-lg">
          <ResumePreview data={formData} languageOverride={getResumeLanguageOverride()} />
        </div>

        {/* Bottom actions */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => setStep(4)}
            className="flex items-center gap-2 px-6 py-2 font-medium text-stone-700 hover:text-stone-900"
          >
            <ChevronLeft className="size-5" />{" "}
            {locale === "es" ? "Volver a Editar" : "Back to Editing"}
          </button>
          <Button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-2 bg-gradient-to-r from-teal-700 to-amber-600 px-6 py-3 font-semibold text-white hover:shadow-lg"
          >
            <Download className="size-5" />
            {isDownloading
              ? (locale === "es" ? "Generando PDF..." : "Generating PDF...")
              : (locale === "es" ? "Descargar PDF" : "Download PDF")}
          </Button>
        </div>

        {/* Career Insights Assessment CTA */}
        {!assessmentResults && (
          <div className="mt-10 rounded-2xl border-2 border-dashed border-teal-200 bg-gradient-to-br from-teal-50/50 to-amber-50/50 p-6 sm:p-8">
            <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:gap-6">
              <div className="mb-4 flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-100 to-amber-100 sm:mb-0">
                <BarChart3 className="size-7 text-teal-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-stone-900">
                  {locale === "es"
                    ? "Obtén Tus Perspectivas Profesionales"
                    : "Get Your Career Insights"}
                </h3>
                <p className="mt-1 text-sm text-stone-500">
                  {locale === "es"
                    ? "Realiza una evaluación de comportamiento de 3 minutos para descubrir tus fortalezas y el camino más rápido hacia el crecimiento profesional en salud comunitaria."
                    : "Take a 3-minute behavioral assessment to discover your strengths and fastest path to career growth in community health."}
                </p>
              </div>
              <Button
                onClick={() => setShowAssessment(true)}
                className="mt-4 flex items-center gap-2 bg-gradient-to-r from-teal-700 to-amber-600 px-6 py-3 font-semibold text-white hover:shadow-lg sm:mt-0"
              >
                {locale === "es" ? "Iniciar Evaluación" : "Start Assessment"}{" "}
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Assessment completed badge */}
        {assessmentResults && (
          <div className="mt-10 rounded-2xl border border-teal-200 bg-teal-50 p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="size-6 text-teal-600" />
              <div>
                <p className="font-semibold text-teal-800">
                  {locale === "es"
                    ? "¡Perspectivas Profesionales Completas!"
                    : "Career Insights Complete!"}
                </p>
                <p className="text-sm text-teal-600">
                  {locale === "es"
                    ? `Tu puntuación general: ${assessmentResults.overallScore}/100. `
                    : `Your overall score: ${assessmentResults.overallScore}/100. `}
                  <button
                    onClick={() => setShowAssessment(true)}
                    className="font-medium underline hover:text-teal-800"
                  >
                    {locale === "es"
                      ? "Ver resultados completos"
                      : "View full results"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
