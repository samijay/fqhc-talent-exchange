"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  CheckCircle2,
  Loader2,
  Users,
  ArrowRight,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const POSITIONS_COUNT_OPTIONS = ["1-5", "6-10", "11-20", "20+"] as const;

const ROLES_NEEDED = [
  "Community Health Worker",
  "Care Coordinator",
  "Behavioral Health Specialist",
  "Patient Navigator",
  "Nurse/NP/PA",
  "EHR/IT Specialist",
  "Leadership/Management",
  "Other",
] as const;

const PROGRAMS_ACTIVE = [
  "ECM",
  "CCM",
  "Community Supports",
  "TCM",
  "BH-ASO",
] as const;

const EHR_SYSTEMS = [
  "OCHIN Epic",
  "NextGen",
  "eClinicalWorks",
  "Cerner",
  "athenahealth",
  "Other",
] as const;

const TIMELINE_OPTIONS = [
  "ASAP",
  "1-3 months",
  "3-6 months",
  "Planning ahead",
] as const;

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FormErrors {
  orgName?: string;
  contactName?: string;
  email?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function HirePage() {
  const t = useTranslations("hire");

  /* ---------- Waitlist count ---------- */
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/employer-waitlist")
      .then((res) => res.json())
      .then((data: { count: number }) => setWaitlistCount(data.count))
      .catch(() => {
        /* silently ignore */
      });
  }, []);

  /* ---------- Form state ---------- */
  const [orgName, setOrgName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactTitle, setContactTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [positionsCount, setPositionsCount] = useState("");
  const [rolesNeeded, setRolesNeeded] = useState<string[]>([]);
  const [programsActive, setProgramsActive] = useState<string[]>([]);
  const [ehrSystem, setEhrSystem] = useState("");
  const [timeline, setTimeline] = useState("");
  const [notes, setNotes] = useState("");

  /* ---------- UI state ---------- */
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  /* ---------- Helpers ---------- */

  function toggleCheckbox(
    value: string,
    list: string[],
    setter: (v: string[]) => void,
  ) {
    setter(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    );
  }

  function validate(): boolean {
    const next: FormErrors = {};
    if (!orgName.trim()) next.orgName = t("orgNameRequired");
    if (!contactName.trim()) next.contactName = t("contactNameRequired");
    if (!email.trim()) {
      next.email = t("emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = t("emailInvalid");
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  /* ---------- Submit ---------- */

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/employer-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orgName: orgName.trim(),
          contactName: contactName.trim(),
          contactTitle: contactTitle.trim() || undefined,
          email: email.trim(),
          phone: phone.trim() || undefined,
          positionsCount: positionsCount || undefined,
          rolesNeeded,
          programsActive,
          ehrSystem: ehrSystem || undefined,
          timeline: timeline || undefined,
          notes: notes.trim() || undefined,
        }),
      });

      if (res.status === 409) {
        setSubmitError(t("errorDuplicate"));
        return;
      }

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setSubmitError(data.error || t("errorGeneric"));
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError(t("errorNetwork"));
    } finally {
      setSubmitting(false);
    }
  }

  /* ================================================================ */
  /*  SUCCESS STATE                                                    */
  /* ================================================================ */

  if (submitted) {
    return (
      <div className="bg-stone-50">
        <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center shadow sm:p-12">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-violet-100">
              <CheckCircle2 className="size-8 text-violet-600" />
            </div>

            <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">
              {t("successTitle")}
            </h1>

            <p className="mx-auto mt-4 max-w-md text-stone-600">
              {t("successMessage")}
            </p>

            <Button
              className="mt-10 bg-violet-600 text-white hover:bg-violet-700"
              asChild
            >
              <Link href="/">{t("backToHome")}</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  FORM                                                             */
  /* ================================================================ */

  return (
    <div className="bg-stone-50">
      {/* ---------- Hero ---------- */}
      <section className="bg-gradient-to-br from-violet-600 via-violet-700 to-violet-800 py-14 text-center text-white sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
            <Building2 className="size-7 text-emerald-400" />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {t("heroTitle")}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base text-violet-100/80 sm:text-lg">
            {t("heroSubtitle")}
          </p>

          {/* Live waitlist count */}
          {waitlistCount !== null && waitlistCount > 0 && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/20 px-4 py-2 text-sm font-medium text-violet-100">
              <Users className="size-4" />
              {t("liveCount", { count: waitlistCount })}
            </div>
          )}
        </div>
      </section>

      {/* ---------- Form ---------- */}
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit}>
          <div className="rounded-2xl bg-white p-6 shadow sm:p-8">
            <div className="space-y-8">
              {/* ====== Row: Org name + Your name ====== */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="orgName">
                    {t("orgNameLabel")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="orgName"
                    placeholder={t("orgNamePlaceholder")}
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    aria-invalid={!!errors.orgName}
                  />
                  {errors.orgName && (
                    <p className="text-xs text-red-600">{errors.orgName}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="contactName">
                    {t("yourNameLabel")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="contactName"
                    placeholder={t("yourNamePlaceholder")}
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    aria-invalid={!!errors.contactName}
                  />
                  {errors.contactName && (
                    <p className="text-xs text-red-600">
                      {errors.contactName}
                    </p>
                  )}
                </div>
              </div>

              {/* ====== Row: Title/Role + Email ====== */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="contactTitle">
                    {t("titleRoleLabel")}{" "}
                    <span className="font-normal text-stone-400">
                      ({t("optional")})
                    </span>
                  </Label>
                  <Input
                    id="contactTitle"
                    placeholder={t("titleRolePlaceholder")}
                    value={contactTitle}
                    onChange={(e) => setContactTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email">
                    {t("emailLabel")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* ====== Phone (full width) ====== */}
              <div className="space-y-1.5">
                <Label htmlFor="phone">
                  {t("phoneLabel")}{" "}
                  <span className="font-normal text-stone-400">({t("optional")})</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t("phonePlaceholder")}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {/* ====== Positions count ====== */}
              <div className="space-y-1.5">
                <Label>{t("positionsCount")}</Label>
                <Select
                  value={positionsCount}
                  onValueChange={setPositionsCount}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("selectRange")} />
                  </SelectTrigger>
                  <SelectContent>
                    {POSITIONS_COUNT_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* ====== Roles needed (checkboxes) ====== */}
              <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-stone-900">
                  {t("rolesNeeded")}
                </legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {ROLES_NEEDED.map((role) => (
                    <label
                      key={role}
                      className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm text-stone-700 transition-colors hover:border-violet-300 hover:bg-violet-50 has-[:checked]:border-violet-500 has-[:checked]:bg-violet-50 has-[:checked]:text-violet-800"
                    >
                      <input
                        type="checkbox"
                        checked={rolesNeeded.includes(role)}
                        onChange={() =>
                          toggleCheckbox(role, rolesNeeded, setRolesNeeded)
                        }
                        className="size-4 rounded border-stone-300 text-violet-600 accent-violet-600"
                      />
                      {role}
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* ====== Programs active (checkboxes) ====== */}
              <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-stone-900">
                  {t("programsActive")}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {PROGRAMS_ACTIVE.map((program) => (
                    <label
                      key={program}
                      className="flex cursor-pointer items-center gap-2 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm text-stone-700 transition-colors hover:border-violet-300 hover:bg-violet-50 has-[:checked]:border-violet-500 has-[:checked]:bg-violet-50 has-[:checked]:text-violet-800"
                    >
                      <input
                        type="checkbox"
                        checked={programsActive.includes(program)}
                        onChange={() =>
                          toggleCheckbox(
                            program,
                            programsActive,
                            setProgramsActive,
                          )
                        }
                        className="size-4 rounded border-stone-300 text-violet-600 accent-violet-600"
                      />
                      {program}
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* ====== EHR system ====== */}
              <div className="space-y-1.5">
                <Label>{t("ehrSystem")}</Label>
                <Select value={ehrSystem} onValueChange={setEhrSystem}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("selectEhr")} />
                  </SelectTrigger>
                  <SelectContent>
                    {EHR_SYSTEMS.map((sys) => (
                      <SelectItem key={sys} value={sys}>
                        {sys}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* ====== Timeline to hire (radio) ====== */}
              <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-stone-900">
                  {t("timelineToHire")}
                </legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {TIMELINE_OPTIONS.map((option) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm text-stone-700 transition-colors hover:border-violet-300 hover:bg-violet-50 has-[:checked]:border-violet-500 has-[:checked]:bg-violet-50 has-[:checked]:text-violet-800"
                    >
                      <input
                        type="radio"
                        name="timeline"
                        value={option}
                        checked={timeline === option}
                        onChange={() => setTimeline(option)}
                        className="size-4 border-stone-300 text-violet-600 accent-violet-600"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* ====== Notes (optional textarea) ====== */}
              <div className="space-y-1.5">
                <Label htmlFor="notes">
                  {t("anythingElse")}{" "}
                  <span className="font-normal text-stone-400">({t("optional")})</span>
                </Label>
                <Textarea
                  id="notes"
                  placeholder={t("anythingElsePlaceholder")}
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>

            {/* ---------- Error message ---------- */}
            {submitError && (
              <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {submitError}
              </div>
            )}

            {/* ---------- Submit ---------- */}
            <div className="mt-8">
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-60"
                size="lg"
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    {t("submitting")}
                  </>
                ) : (
                  <>
                    {t("requestAccess")}
                    <ArrowRight className="size-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
