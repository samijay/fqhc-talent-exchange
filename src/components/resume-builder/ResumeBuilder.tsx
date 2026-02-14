"use client";

import { useState } from "react";
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
  "Less than 1 year",
  "1-2 years",
  "3-5 years",
  "6-10 years",
  "10+ years",
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
  { id: "chw", label: "Community Health Worker", icon: Heart },
  { id: "care_coordinator", label: "Care Coordinator", icon: Users },
  { id: "medical_assistant", label: "Medical Assistant", icon: Stethoscope },
  { id: "case_manager", label: "Case Manager", icon: Briefcase },
  { id: "behavioral_health", label: "Behavioral Health Specialist", icon: Brain },
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
      if (!formData.firstName.trim()) next.firstName = "First name is required";
      if (!formData.lastName.trim()) next.lastName = "Last name is required";
      if (!formData.email.trim()) {
        next.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        next.email = "Please enter a valid email";
      }
    }
    if (step === 2) {
      if (!formData.roleType) next.roleType = "Please select a role type";
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
      objective: template?.objectiveTemplate || prev.objective,
      selectedBullets: [], // reset bullets when role changes
    }));
  }

  async function handleDownloadPDF() {
    const element = document.getElementById("resume-preview");
    if (!element) return;

    setIsDownloading(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf()
        .set({
          margin: [0.4, 0.4, 0.4, 0.4],
          filename: `${formData.firstName}_${formData.lastName}_Resume.pdf`,
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

  /* --- Progress Bar ----------------------------------------------- */

  const progress = step === TOTAL_STEPS ? 100 : ((step - 1) / (TOTAL_STEPS - 1)) * 100;

  const progressBar = (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-stone-700">
          Step {step} of {TOTAL_STEPS}
        </span>
        <span className="text-sm text-stone-500">
          {Math.round(progress)}% complete
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
          <ChevronLeft className="size-5" /> Back
        </button>
      ) : (
        <div />
      )}
      <Button
        onClick={handleNext}
        className="flex items-center gap-2 bg-gradient-to-r from-teal-700 to-amber-600 px-6 py-3 font-semibold text-white hover:shadow-lg"
      >
        {step === TOTAL_STEPS - 1 ? "Preview Resume" : "Next"}{" "}
        <ChevronRight className="size-5" />
      </Button>
    </div>
  );

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
            FQHC Resume Builder
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-teal-100/80 sm:text-lg">
            Build a professional resume tailored for community health center
            roles. Free, with pre-written bullet points optimized for FQHC
            hiring.
          </p>
        </section>

        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
          {progressBar}

          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow sm:p-10">
            <h2 className="mb-6 text-xl font-bold text-stone-900">
              Personal Information
            </h2>

            {/* Name row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, firstName: e.target.value }))
                  }
                  placeholder="Maria"
                  className="mt-1.5"
                  aria-invalid={!!errors.firstName}
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, lastName: e.target.value }))
                  }
                  placeholder="Garcia"
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
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="maria@example.com"
                  className="mt-1.5"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, phone: e.target.value }))
                  }
                  placeholder="(555) 123-4567"
                  className="mt-1.5"
                />
              </div>
            </div>

            {/* City + Region */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="city">City</Label>
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
                <Label htmlFor="region">Region</Label>
                <Select
                  value={formData.region}
                  onValueChange={(v) =>
                    setFormData((p) => ({ ...p, region: v }))
                  }
                >
                  <SelectTrigger className="mt-1.5 w-full">
                    <SelectValue placeholder="Select your region" />
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
              Role & Experience
            </h2>

            {/* Role selection */}
            <div className="mb-6">
              <Label className="mb-3 block">
                What type of role are you applying for?{" "}
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
                        {role.label}
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
              <Label htmlFor="years">Years of Healthcare Experience</Label>
              <Select
                value={formData.yearsExperience}
                onValueChange={(v) =>
                  setFormData((p) => ({ ...p, yearsExperience: v }))
                }
              >
                <SelectTrigger className="mt-1.5 w-full">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  {YEARS_OPTIONS.map((y) => (
                    <SelectItem key={y} value={y}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Professional objective */}
            <div>
              <Label htmlFor="objective">Professional Summary</Label>
              <p className="mt-1 text-xs text-stone-500">
                Pre-filled based on your role. Feel free to customize it.
              </p>
              <Textarea
                id="objective"
                value={formData.objective}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, objective: e.target.value }))
                }
                rows={4}
                className="mt-1.5"
                placeholder="Write a brief professional summary..."
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
              Skills & Qualifications
            </h2>

            {/* EHR Systems */}
            <fieldset className="mb-6">
              <legend className="text-sm font-medium text-stone-900">
                EHR Systems
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
                Programs
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
                Certifications
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
                Languages
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
                  Describe Your Experience
                </h2>
                <p className="mb-4 text-sm text-stone-500">
                  Select the bullet points that describe your experience. These
                  will appear on your resume.
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
                            {bullet.text}
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
                  Work History
                </h3>
                <button
                  onClick={addWorkEntry}
                  className="flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800"
                >
                  <Plus className="size-4" /> Add Position
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
                        Position {i + 1}
                      </span>
                      {formData.workHistory.length > 1 && (
                        <button
                          onClick={() => removeWorkEntry(i)}
                          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="size-3" /> Remove
                        </button>
                      )}
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <Label className="text-xs">Employer / Organization</Label>
                        <Input
                          value={entry.employer}
                          onChange={(e) =>
                            updateWorkHistory(i, { employer: e.target.value })
                          }
                          placeholder="Community Health Center of..."
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Job Title</Label>
                        <Input
                          value={entry.title}
                          onChange={(e) =>
                            updateWorkHistory(i, { title: e.target.value })
                          }
                          placeholder="Care Coordinator"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Start Date</Label>
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
                        <Label className="text-xs">End Date</Label>
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
                          I currently work here
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
                <h3 className="text-lg font-bold text-stone-900">Education</h3>
                <button
                  onClick={addEducation}
                  className="flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800"
                >
                  <Plus className="size-4" /> Add Education
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
                        Education {i + 1}
                      </span>
                      {formData.education.length > 1 && (
                        <button
                          onClick={() => removeEducation(i)}
                          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="size-3" /> Remove
                        </button>
                      )}
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <div>
                        <Label className="text-xs">School / Institution</Label>
                        <Input
                          value={entry.institution}
                          onChange={(e) =>
                            updateEducation(i, {
                              institution: e.target.value,
                            })
                          }
                          placeholder="City College of..."
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Degree / Certificate</Label>
                        <Input
                          value={entry.degree}
                          onChange={(e) =>
                            updateEducation(i, { degree: e.target.value })
                          }
                          placeholder="Associate's in Health Science"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Year</Label>
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
  /*  Step 5: Preview & Download                                       */
  /* ================================================================ */

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        {/* Actions */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-stone-900">
            Your Resume Preview
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-stone-900"
            >
              <Pencil className="size-4" /> Edit
            </button>
            <Button
              onClick={handleSaveProfile}
              disabled={isSaving}
              variant="outline"
              className="flex items-center gap-1.5 border-teal-700 text-teal-700 hover:bg-teal-50"
            >
              <Save className="size-4" />
              {isSaving ? "Saving..." : "Save Profile"}
            </Button>
            <Button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex items-center gap-1.5 bg-gradient-to-r from-teal-700 to-amber-600 text-white hover:shadow-lg"
            >
              <Download className="size-4" />
              {isDownloading ? "Generating..." : "Download PDF"}
            </Button>
          </div>
        </div>

        {saveSuccess && (
          <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            Profile saved! You can return anytime to update your resume.
          </div>
        )}

        {/* Resume Preview */}
        <div className="overflow-hidden rounded-xl border border-stone-200 shadow-lg">
          <ResumePreview data={formData} />
        </div>

        {/* Bottom actions */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => setStep(4)}
            className="flex items-center gap-2 px-6 py-2 font-medium text-stone-700 hover:text-stone-900"
          >
            <ChevronLeft className="size-5" /> Back to Editing
          </button>
          <Button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-2 bg-gradient-to-r from-teal-700 to-amber-600 px-6 py-3 font-semibold text-white hover:shadow-lg"
          >
            <Download className="size-5" />
            {isDownloading ? "Generating PDF..." : "Download PDF"}
          </Button>
        </div>
      </div>
    </div>
  );
}
