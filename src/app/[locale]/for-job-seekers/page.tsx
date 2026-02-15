"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Phone,
  Rocket,
  User,
  Briefcase,
  MapPin,
  ClipboardCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const ROLES = [
  "Care Manager",
  "RN",
  "CHW",
  "LCSW",
  "Medical Assistant",
  "Behavioral Health Specialist",
  "Patient Navigator",
  "Other",
] as const;

const EXPERIENCE_LEVELS = [
  "Less than 1",
  "1-3",
  "3-5",
  "5-10",
  "10+",
] as const;

const SKILLS = [
  "Enhanced Care Management (ECM)",
  "Chronic Care Management (CCM)",
  "OCHIN Epic",
  "eClinicalWorks",
  "NextGen",
  "PPS Billing",
  "Care Coordination",
  "Motivational Interviewing",
  "Spanish Language",
] as const;

const LOCATIONS = [
  "Los Angeles",
  "San Francisco",
  "San Diego",
  "Sacramento",
  "Oakland",
  "Fresno",
  "San Jose",
  "Riverside",
] as const;

const AVAILABILITY_OPTIONS = [
  "Immediately",
  "Within 2 weeks",
  "Within 1 month",
  "Flexible",
] as const;

const STEP_LABELS = [
  { label: "Basic Info", icon: User },
  { label: "Experience", icon: Briefcase },
  { label: "Preferences", icon: MapPin },
  { label: "Review", icon: ClipboardCheck },
];

/* ------------------------------------------------------------------ */
/*  Schema                                                             */
/* ------------------------------------------------------------------ */

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^[\d\s()+-]{7,20}$/,
      "Enter a valid phone number"
    ),
  currentRole: z.string().min(1, "Select your current role"),
  yearsExperience: z.string().min(1, "Select your experience level"),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  preferredLocations: z
    .array(z.string())
    .min(1, "Select at least one location"),
  availability: z.string().min(1, "Select your availability"),
});

type FormData = z.infer<typeof formSchema>;

/* Fields validated at each step */
const STEP_FIELDS: (keyof FormData)[][] = [
  ["firstName", "lastName", "email", "phone"],
  ["currentRole", "yearsExperience", "skills"],
  ["preferredLocations", "availability"],
  [], // review step — no new validation
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ForJobSeekers() {
  const locale = useLocale();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      currentRole: "",
      yearsExperience: "",
      skills: [],
      preferredLocations: [],
      availability: "",
    },
    mode: "onTouched",
  });

  const skills = watch("skills");
  const preferredLocations = watch("preferredLocations");

  /* ---- navigation helpers ---- */
  const next = async () => {
    const valid = await trigger(STEP_FIELDS[step]);
    if (valid) setStep((s) => Math.min(s + 1, 3));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setSubmitError(result.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ---- toggle helpers ---- */
  const toggleSkill = (skill: string) => {
    const current = getValues("skills");
    setValue(
      "skills",
      current.includes(skill)
        ? current.filter((s) => s !== skill)
        : [...current, skill],
      { shouldValidate: true }
    );
  };

  const toggleLocation = (loc: string) => {
    const current = getValues("preferredLocations");
    setValue(
      "preferredLocations",
      current.includes(loc)
        ? current.filter((l) => l !== loc)
        : [...current, loc],
      { shouldValidate: true }
    );
  };

  /* ================================================================ */
  /*  SUCCESS SCREEN                                                   */
  /* ================================================================ */
  if (submitted) {
    const data = getValues();
    return (
      <div className="bg-stone-50">
        <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-teal-100">
              <CheckCircle2 className="size-8 text-teal-700" />
            </div>

            <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">
              You're In, {data.firstName}!
            </h1>
            <p className="mx-auto mt-3 max-w-md text-stone-500">
              Your profile has been submitted. Here's what happens next:
            </p>

            <div className="mt-10 grid gap-6 text-left sm:grid-cols-3">
              {[
                {
                  icon: Clock,
                  title: "24-Hour Review",
                  body: "A real person reviews your profile within one business day.",
                },
                {
                  icon: Phone,
                  title: "Personal Outreach",
                  body: "Your dedicated advocate will call or email to learn more about you.",
                },
                {
                  icon: Rocket,
                  title: "5-Day Intro Guarantee",
                  body: "We aim to introduce you to a matching FQHC within five business days.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-stone-200 bg-stone-50 p-5"
                >
                  <item.icon className="mb-3 size-6 text-teal-700" />
                  <h3 className="text-sm font-semibold text-stone-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-stone-500">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <Button
              className="mt-10 bg-teal-700 text-white hover:bg-teal-800"
              asChild
            >
              <Link href="/">Back to Home</Link>
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
      {/* ---------- Mini Hero ---------- */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 py-14 text-center text-white sm:py-20">
        <Badge className="mb-4 border-teal-400/30 bg-teal-500/20 text-teal-100 hover:bg-teal-500/30">
          Free for candidates — always
        </Badge>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          Let's Find Your Next Role
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-teal-100/80 sm:text-lg">
          Complete your profile in under 3 minutes and get matched with
          mission-driven FQHCs.
        </p>
      </section>

      {/* ---------- Fast-Track Banner ---------- */}
      <div className="mx-auto max-w-2xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link
          href="/fast-track"
          className="group flex items-center gap-4 rounded-xl border-2 border-amber-300 bg-gradient-to-r from-amber-50 to-teal-50 p-4 transition-all hover:shadow-md hover:border-amber-400"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
            <Zap className="size-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-stone-900 text-sm sm:text-base">
              {locale === "es"
                ? "¿Despedido/a recientemente de un FQHC?"
                : "Recently laid off from an FQHC?"}
            </p>
            <p className="text-xs sm:text-sm text-stone-600">
              {locale === "es"
                ? "Obtén matching prioritario en 48 horas con nuestro programa Fast-Track →"
                : "Get priority matching in 48 hours with our Fast-Track program →"}
            </p>
          </div>
          <ArrowRight className="size-5 shrink-0 text-stone-400 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* ---------- Progress bar ---------- */}
      <div className="mx-auto max-w-2xl px-4 pt-6 sm:px-6 lg:px-8">
        {/* Step indicators */}
        <div className="mb-2 flex items-center justify-between">
          {STEP_LABELS.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === step;
            const isDone = i < step;
            return (
              <div
                key={s.label}
                className="flex flex-1 flex-col items-center gap-1"
              >
                <div
                  className={`flex size-9 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                    isDone
                      ? "bg-teal-700 text-white"
                      : isActive
                        ? "bg-teal-700 text-white ring-4 ring-teal-200"
                        : "bg-stone-200 text-stone-500"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="size-5" />
                  ) : (
                    <Icon className="size-4" />
                  )}
                </div>
                <span
                  className={`hidden text-xs font-medium sm:block ${
                    isActive ? "text-teal-800" : "text-stone-400"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bar */}
        <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-stone-200">
          <div
            className="h-full rounded-full bg-teal-700 transition-all duration-300"
            style={{ width: `${((step + 1) / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* ---------- Form card ---------- */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-2xl px-4 pb-20 pt-8 sm:px-6 lg:px-8"
      >
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          {/* ====== STEP 1 — Basic Info ====== */}
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-stone-900">
                  Basic Information
                </h2>
                <p className="mt-1 text-sm text-stone-500">
                  Tell us a little about yourself.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* First name */}
                <div className="space-y-1.5">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Jane"
                    {...register("firstName")}
                    aria-invalid={!!errors.firstName}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-600">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                {/* Last name */}
                <div className="space-y-1.5">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    {...register("lastName")}
                    aria-invalid={!!errors.lastName}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-600">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jane@example.com"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  {...register("phone")}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && (
                  <p className="text-xs text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ====== STEP 2 — Experience ====== */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-stone-900">
                  Your Experience
                </h2>
                <p className="mt-1 text-sm text-stone-500">
                  Help us understand your background.
                </p>
              </div>

              {/* Current role */}
              <div className="space-y-1.5">
                <Label>Current Role</Label>
                <Select
                  value={watch("currentRole")}
                  onValueChange={(v) =>
                    setValue("currentRole", v, { shouldValidate: true })
                  }
                >
                  <SelectTrigger
                    className="w-full"
                    aria-invalid={!!errors.currentRole}
                  >
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.currentRole && (
                  <p className="text-xs text-red-600">
                    {errors.currentRole.message}
                  </p>
                )}
              </div>

              {/* Years of experience */}
              <div className="space-y-1.5">
                <Label>Years of FQHC Experience</Label>
                <Select
                  value={watch("yearsExperience")}
                  onValueChange={(v) =>
                    setValue("yearsExperience", v, { shouldValidate: true })
                  }
                >
                  <SelectTrigger
                    className="w-full"
                    aria-invalid={!!errors.yearsExperience}
                  >
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPERIENCE_LEVELS.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level} {level === "10+" ? "years" : level === "Less than 1" ? "year" : "years"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.yearsExperience && (
                  <p className="text-xs text-red-600">
                    {errors.yearsExperience.message}
                  </p>
                )}
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <Label>Skills & Competencies</Label>
                <p className="text-xs text-stone-400">Select all that apply.</p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {SKILLS.map((skill) => {
                    const checked = skills.includes(skill);
                    return (
                      <label
                        key={skill}
                        className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                          checked
                            ? "border-teal-500 bg-teal-50 text-teal-900"
                            : "border-stone-200 bg-white text-stone-700 hover:border-stone-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="size-4 rounded border-stone-300 text-teal-700 focus:ring-teal-500"
                          checked={checked}
                          onChange={() => toggleSkill(skill)}
                        />
                        {skill}
                      </label>
                    );
                  })}
                </div>
                {errors.skills && (
                  <p className="text-xs text-red-600">
                    {errors.skills.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ====== STEP 3 — Preferences ====== */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-stone-900">
                  Your Preferences
                </h2>
                <p className="mt-1 text-sm text-stone-500">
                  Where and when would you like to work?
                </p>
              </div>

              {/* Locations */}
              <div className="space-y-2">
                <Label>Preferred Locations</Label>
                <p className="text-xs text-stone-400">
                  Click all cities you'd consider.
                </p>
                <div className="flex flex-wrap gap-2">
                  {LOCATIONS.map((loc) => {
                    const selected = preferredLocations.includes(loc);
                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => toggleLocation(loc)}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                          selected
                            ? "border-teal-500 bg-teal-700 text-white"
                            : "border-stone-300 bg-white text-stone-600 hover:border-teal-400 hover:bg-teal-50 hover:text-teal-800"
                        }`}
                      >
                        {loc}
                      </button>
                    );
                  })}
                </div>
                {errors.preferredLocations && (
                  <p className="text-xs text-red-600">
                    {errors.preferredLocations.message}
                  </p>
                )}
              </div>

              {/* Availability */}
              <div className="space-y-1.5">
                <Label>Availability</Label>
                <Select
                  value={watch("availability")}
                  onValueChange={(v) =>
                    setValue("availability", v, { shouldValidate: true })
                  }
                >
                  <SelectTrigger
                    className="w-full"
                    aria-invalid={!!errors.availability}
                  >
                    <SelectValue placeholder="When can you start?" />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABILITY_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.availability && (
                  <p className="text-xs text-red-600">
                    {errors.availability.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ====== STEP 4 — Review ====== */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-stone-900">
                  Review Your Info
                </h2>
                <p className="mt-1 text-sm text-stone-500">
                  Make sure everything looks good before submitting.
                </p>
              </div>

              {(() => {
                const data = getValues();
                return (
                  <div className="divide-y divide-stone-100 rounded-xl border border-stone-200 bg-stone-50">
                    {/* Basic Info */}
                    <ReviewSection title="Basic Information">
                      <ReviewRow label="Name" value={`${data.firstName} ${data.lastName}`} />
                      <ReviewRow label="Email" value={data.email} />
                      <ReviewRow label="Phone" value={data.phone} />
                    </ReviewSection>

                    {/* Experience */}
                    <ReviewSection title="Experience">
                      <ReviewRow label="Current Role" value={data.currentRole} />
                      <ReviewRow
                        label="FQHC Experience"
                        value={`${data.yearsExperience} year${data.yearsExperience === "Less than 1" ? "" : "s"}`}
                      />
                      <div className="py-1">
                        <span className="text-xs font-medium text-stone-400">
                          Skills
                        </span>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          {data.skills.map((s) => (
                            <Badge
                              key={s}
                              variant="secondary"
                              className="bg-teal-100 text-teal-900"
                            >
                              {s}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </ReviewSection>

                    {/* Preferences */}
                    <ReviewSection title="Preferences">
                      <div className="py-1">
                        <span className="text-xs font-medium text-stone-400">
                          Locations
                        </span>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          {data.preferredLocations.map((l) => (
                            <Badge
                              key={l}
                              variant="outline"
                              className="border-stone-300"
                            >
                              {l}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <ReviewRow label="Availability" value={data.availability} />
                    </ReviewSection>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ---------- Error message ---------- */}
          {submitError && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          )}

          {/* ---------- Navigation buttons ---------- */}
          <div className="mt-8 flex items-center justify-between">
            {step > 0 ? (
              <Button
                type="button"
                variant="ghost"
                onClick={back}
                disabled={submitting}
                className="text-stone-600 hover:text-stone-900"
              >
                <ArrowLeft className="size-4" /> Back
              </Button>
            ) : (
              <span />
            )}

            {step < 3 ? (
              <Button
                type="button"
                onClick={next}
                className="bg-teal-700 text-white hover:bg-teal-800"
              >
                Continue <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={submitting}
                className="bg-amber-500 text-stone-900 shadow-lg hover:bg-amber-400"
              >
                {submitting ? (
                  <>Submitting...</>
                ) : (
                  <>Submit Profile <Rocket className="size-4" /></>
                )}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Small helper components                                            */
/* ------------------------------------------------------------------ */

function ReviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2 px-5 py-4">
      <h3 className="text-sm font-semibold text-stone-700">{title}</h3>
      {children}
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between py-1">
      <span className="text-xs font-medium text-stone-400">{label}</span>
      <span className="text-sm text-stone-800">{value}</span>
    </div>
  );
}
