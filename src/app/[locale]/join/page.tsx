"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { CheckCircle2, Loader2, Users, Zap, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
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
  "Less than 1",
  "1-2",
  "3-5",
  "6-10",
  "10+",
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
  "Other",
] as const;

const NOTES_MAX = 300;

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface SuccessPayload {
  position: number;
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function JoinPage() {
  const t = useTranslations("join");
  const locale = useLocale();

  /* --- live count ------------------------------------------------- */
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/candidate-waitlist")
      .then((res) => res.json())
      .then((data: { count: number }) => setWaitlistCount(data.count))
      .catch(() => setWaitlistCount(null));
  }, []);

  /* --- form state ------------------------------------------------- */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [ehrSystems, setEhrSystems] = useState<string[]>([]);
  const [programs, setPrograms] = useState<string[]>([]);
  const [bilingual, setBilingual] = useState("");
  const [notes, setNotes] = useState("");

  /* --- ui state --------------------------------------------------- */
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<SuccessPayload | null>(null);
  const [serverError, setServerError] = useState("");

  /* --- helpers ---------------------------------------------------- */
  function toggleCheckbox(
    value: string,
    list: string[],
    setter: (v: string[]) => void,
  ) {
    setter(
      list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value],
    );
  }

  function validate(): boolean {
    const next: FormErrors = {};
    if (!firstName.trim()) next.firstName = t("firstNameRequired");
    if (!lastName.trim()) next.lastName = t("lastNameRequired");
    if (!email.trim()) {
      next.email = t("emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = t("emailInvalid");
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    setSubmitting(true);

    try {
      const res = await fetch("/api/candidate-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim() || undefined,
          region: region || undefined,
          currentRole: currentRole.trim() || undefined,
          yearsExperience: yearsExperience || undefined,
          ehrSystems,
          programs,
          bilingual: bilingual || undefined,
          notes: notes.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (res.status === 409) {
        setServerError(data.error ?? t("errorDuplicate"));
        return;
      }

      if (!res.ok) {
        setServerError(data.error ?? t("errorGeneric"));
        return;
      }

      setSuccess({ position: data.position as number });
    } catch {
      setServerError(t("errorNetwork"));
    } finally {
      setSubmitting(false);
    }
  }

  /* ---------------------------------------------------------------- */
  /*  Success State                                                    */
  /* ---------------------------------------------------------------- */

  if (success) {
    return (
      <div className="bg-stone-50">
        {/* Hero (abbreviated) */}
        <section className="bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 py-14 text-center text-white sm:py-20">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {t("heroTitle")}
          </h1>
        </section>

        <div className="mx-auto max-w-lg px-4 py-20 text-center">
          <CheckCircle2 className="mx-auto size-16 text-teal-700" />
          <h2 className="mt-6 text-2xl font-bold text-stone-900 sm:text-3xl">
            {t("successTitle")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-stone-600">
            {t("successPosition", { position: success.position })}
          </p>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Form State                                                       */
  /* ---------------------------------------------------------------- */

  return (
    <div className="bg-stone-50">
      {/* ---------- Hero ---------- */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 py-14 text-center text-white sm:py-20">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          {t("heroTitle")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-teal-100/80 sm:text-lg">
          {t("heroSubtitle")}
        </p>

        {/* Live count */}
        {waitlistCount !== null && waitlistCount > 0 && (
          <div className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur">
            <Users className="size-4 text-amber-400" />
            <span>
              {t("liveCount", { count: waitlistCount })}
            </span>
          </div>
        )}
      </section>

      {/* ---------- Fast-Track Banner ---------- */}
      <div className="mx-auto max-w-2xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link
          href="/fast-track"
          className="group flex items-center gap-4 rounded-xl border-2 border-amber-300 bg-gradient-to-r from-amber-50 to-teal-50 p-4 transition-all hover:shadow-md hover:border-amber-400 sm:p-5"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
            <Zap className="size-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-stone-900">
              {locale === "es"
                ? "\u00bfFuiste despedido/a recientemente de un FQHC?"
                : "Recently laid off from an FQHC?"}
            </p>
            <p className="text-sm text-stone-600">
              {locale === "es"
                ? "Obt\u00e9n matching prioritario en 48 horas \u2014 sin per\u00edodo de aviso necesario."
                : "Get priority matching in 48 hours \u2014 no notice period needed."}
            </p>
          </div>
          <ArrowRight className="size-5 shrink-0 text-stone-400 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* ---------- Form Card ---------- */}
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow sm:p-10"
        >
          {/* --- Server error banner --- */}
          {serverError && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {serverError}
            </div>
          )}

          {/* --- Name row --- */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="firstName">
                {t("firstName")} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder={t("firstNamePlaceholder")}
                className="mt-1.5"
                aria-invalid={!!errors.firstName}
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div>
              <Label htmlFor="lastName">
                {t("lastName")} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder={t("lastNamePlaceholder")}
                className="mt-1.5"
                aria-invalid={!!errors.lastName}
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* --- Email + Phone row --- */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="email">
                {t("email")} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                className="mt-1.5"
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phone">{t("phone")}</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t("phonePlaceholder")}
                className="mt-1.5"
              />
            </div>
          </div>

          {/* --- City/Region --- */}
          <div className="mt-5">
            <Label htmlFor="region">{t("cityRegion")}</Label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="mt-1.5 w-full">
                <SelectValue placeholder={t("selectRegion")} />
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

          {/* --- Most recent role --- */}
          <div className="mt-5">
            <Label htmlFor="currentRole">{t("recentRole")}</Label>
            <Input
              id="currentRole"
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              placeholder={t("recentRolePlaceholder")}
              className="mt-1.5"
            />
          </div>

          {/* --- Years of FQHC experience --- */}
          <div className="mt-5">
            <Label htmlFor="yearsExperience">{t("yearsExperience")}</Label>
            <Select value={yearsExperience} onValueChange={setYearsExperience}>
              <SelectTrigger className="mt-1.5 w-full">
                <SelectValue placeholder={t("selectExperience")} />
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

          {/* --- EHR systems (checkboxes) --- */}
          <fieldset className="mt-6">
            <legend className="text-sm font-medium text-stone-900">
              {t("ehrSystems")}
            </legend>
            <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3">
              {EHR_SYSTEMS.map((system) => (
                <label
                  key={system}
                  className="flex cursor-pointer items-center gap-2 text-sm text-stone-700"
                >
                  <input
                    type="checkbox"
                    checked={ehrSystems.includes(system)}
                    onChange={() =>
                      toggleCheckbox(system, ehrSystems, setEhrSystems)
                    }
                    className="size-4 rounded border-stone-300 text-teal-700 focus:ring-teal-500"
                  />
                  {system}
                </label>
              ))}
            </div>
          </fieldset>

          {/* --- Programs (checkboxes) --- */}
          <fieldset className="mt-6">
            <legend className="text-sm font-medium text-stone-900">
              {t("programsWorkedIn")}
            </legend>
            <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3">
              {PROGRAMS.map((program) => (
                <label
                  key={program}
                  className="flex cursor-pointer items-center gap-2 text-sm text-stone-700"
                >
                  <input
                    type="checkbox"
                    checked={programs.includes(program)}
                    onChange={() =>
                      toggleCheckbox(program, programs, setPrograms)
                    }
                    className="size-4 rounded border-stone-300 text-teal-700 focus:ring-teal-500"
                  />
                  {program}
                </label>
              ))}
            </div>
          </fieldset>

          {/* --- Bilingual (radio) --- */}
          <fieldset className="mt-6">
            <legend className="text-sm font-medium text-stone-900">
              {t("bilingualQuestion")}
            </legend>
            <div className="mt-2 flex flex-col gap-2.5 sm:flex-row sm:gap-6">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-stone-700">
                <input
                  type="radio"
                  name="bilingual"
                  value="Spanish/English"
                  checked={bilingual === "Spanish/English"}
                  onChange={(e) => setBilingual(e.target.value)}
                  className="size-4 border-stone-300 text-teal-700 focus:ring-teal-500"
                />
                {t("bilingualYesSpanish")}
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-stone-700">
                <input
                  type="radio"
                  name="bilingual"
                  value="Other"
                  checked={bilingual === "Other"}
                  onChange={(e) => setBilingual(e.target.value)}
                  className="size-4 border-stone-300 text-teal-700 focus:ring-teal-500"
                />
                {t("bilingualYesOther")}
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-stone-700">
                <input
                  type="radio"
                  name="bilingual"
                  value="No"
                  checked={bilingual === "No"}
                  onChange={(e) => setBilingual(e.target.value)}
                  className="size-4 border-stone-300 text-teal-700 focus:ring-teal-500"
                />
                {t("bilingualNo")}
              </label>
            </div>
          </fieldset>

          {/* --- Notes (textarea) --- */}
          <div className="mt-6">
            <Label htmlFor="notes">
              {t("lookingFor")}{" "}
              <span className="font-normal text-stone-400">({t("optional")})</span>
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => {
                if (e.target.value.length <= NOTES_MAX) {
                  setNotes(e.target.value);
                }
              }}
              placeholder={t("lookingForPlaceholder")}
              rows={3}
              className="mt-1.5"
              maxLength={NOTES_MAX}
            />
            <p className="mt-1 text-right text-xs text-stone-400">
              {notes.length}/{NOTES_MAX}
            </p>
          </div>

          {/* --- Submit --- */}
          <Button
            type="submit"
            disabled={submitting}
            className="mt-8 h-11 w-full bg-teal-700 text-base font-semibold text-white hover:bg-teal-800"
          >
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {t("submitting")}
              </>
            ) : (
              t("secureMySpot")
            )}
          </Button>
        </form>

        {/* Cross-link to employer signup */}
        <div className="mt-8 text-center text-sm text-stone-500">
          {t("lookingToHire")}{" "}
          <Link href="/hire" className="font-medium text-teal-700 underline hover:text-teal-800">
            {t("goToEmployerSignup")} →
          </Link>
        </div>
      </div>
    </div>
  );
}
