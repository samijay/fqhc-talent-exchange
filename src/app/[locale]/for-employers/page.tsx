"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Users,
  Handshake,
  Rocket,
  Building2,
  Briefcase,
  ClipboardCheck,
  Plus,
  Trash2,
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

const EHR_SYSTEMS = [
  "OCHIN Epic",
  "eClinicalWorks",
  "NextGen",
  "athenahealth",
  "Cerner",
  "Other",
] as const;

const ROLE_TYPES = [
  "Care Manager",
  "RN",
  "CHW",
  "LCSW",
  "Medical Assistant",
  "Behavioral Health Specialist",
  "Patient Navigator",
  "Physician",
  "Nurse Practitioner",
  "Dentist",
  "Pharmacist",
  "Medical Director",
  "CEO / Executive",
  "Other",
] as const;

const URGENCY_OPTIONS = [
  "Immediately",
  "Within 30 days",
  "Within 60 days",
  "Planning ahead",
] as const;

const STEP_LABELS = [
  { label: "Organization", icon: Building2 },
  { label: "Open Roles", icon: Briefcase },
  { label: "Review", icon: ClipboardCheck },
];

/* ------------------------------------------------------------------ */
/*  Schema                                                             */
/* ------------------------------------------------------------------ */

const positionSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  roleType: z.string().min(1, "Select a role type"),
  salaryMin: z.string().optional(),
  salaryMax: z.string().optional(),
  urgency: z.string().min(1, "Select urgency"),
});

const formSchema = z.object({
  organizationName: z.string().min(1, "Organization name is required"),
  website: z.string().optional(),
  contactName: z.string().min(1, "Contact name is required"),
  contactEmail: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email"),
  contactPhone: z.string().optional(),
  ehrSystem: z.string().optional(),
  positions: z.array(positionSchema).min(1, "Add at least one open position"),
});

type FormData = z.infer<typeof formSchema>;

const STEP_FIELDS: (keyof FormData)[][] = [
  ["organizationName", "contactName", "contactEmail"],
  ["positions"],
  [],
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ForEmployers() {
  const locale = useLocale();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organizationName: "",
      website: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      ehrSystem: "",
      positions: [
        { title: "", roleType: "", salaryMin: "", salaryMax: "", urgency: "" },
      ],
    },
    mode: "onTouched",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "positions",
  });

  const next = async () => {
    const valid = await trigger(STEP_FIELDS[step]);
    if (valid) setStep((s) => Math.min(s + 1, 2));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/employers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setSubmitError(
          result.error || "Something went wrong. Please try again."
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
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
              We're on It!
            </h1>
            <p className="mx-auto mt-3 max-w-md text-stone-500">
              Thanks, {data.contactName.split(" ")[0]}! Your{" "}
              {data.positions.length} open{" "}
              {data.positions.length === 1 ? "role has" : "roles have"} been
              received.
            </p>

            <div className="mt-10 grid gap-6 text-left sm:grid-cols-3">
              {[
                {
                  icon: Clock,
                  title: "Same-Day Acknowledgment",
                  body: "A member of our team will confirm receipt and ask any clarifying questions.",
                },
                {
                  icon: Users,
                  title: "Candidate Sourcing Begins",
                  body: "We tap our pre-vetted FQHC talent pool and begin matching within 48 hours.",
                },
                {
                  icon: Handshake,
                  title: "First Intros in 5 Days",
                  body: "Expect your first qualified candidate introductions within five business days.",
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
          Fill critical roles faster
        </Badge>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          Hire for Your FQHC
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-teal-100/80 sm:text-lg">
          Tell us what you need and we'll deliver pre-vetted,
          mission-aligned candidates within days.
        </p>
      </section>

      {/* ---------- Fast-Track Talent Pool Banner ---------- */}
      <div className="mx-auto max-w-2xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 rounded-xl border-2 border-amber-300 bg-gradient-to-r from-amber-50 to-teal-50 p-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
            <Zap className="size-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-stone-900 text-sm sm:text-base">
              {locale === "es"
                ? "⚡ Grupo de talento Fast-Track disponible"
                : "⚡ Fast-Track talent pool available"}
            </p>
            <p className="text-xs sm:text-sm text-stone-600">
              {locale === "es"
                ? "Profesionales experimentados de FQHC recientemente desplazados, listos para trabajar de inmediato. Pregunte al enviar."
                : "Experienced FQHC professionals recently displaced and ready to work immediately. Ask when you submit."}
            </p>
          </div>
        </div>
      </div>

      {/* ---------- Progress bar ---------- */}
      <div className="mx-auto max-w-2xl px-4 pt-6 sm:px-6 lg:px-8">
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
        <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-stone-200">
          <div
            className="h-full rounded-full bg-teal-700 transition-all duration-300"
            style={{ width: `${((step + 1) / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* ---------- Form card ---------- */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-2xl px-4 pb-20 pt-8 sm:px-6 lg:px-8"
      >
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          {/* ====== STEP 1 — Organization ====== */}
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-stone-900">
                  Your Organization
                </h2>
                <p className="mt-1 text-sm text-stone-500">
                  Tell us about your health center.
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="organizationName">Organization Name</Label>
                <Input
                  id="organizationName"
                  placeholder="Community Health Center of..."
                  {...register("organizationName")}
                  aria-invalid={!!errors.organizationName}
                />
                {errors.organizationName && (
                  <p className="text-xs text-red-600">
                    {errors.organizationName.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="website">
                  Website{" "}
                  <span className="text-stone-400 font-normal">(optional)</span>
                </Label>
                <Input
                  id="website"
                  placeholder="https://yourfqhc.org"
                  {...register("website")}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="contactName">Contact Name</Label>
                  <Input
                    id="contactName"
                    placeholder="Jane Smith"
                    {...register("contactName")}
                    aria-invalid={!!errors.contactName}
                  />
                  {errors.contactName && (
                    <p className="text-xs text-red-600">
                      {errors.contactName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="jane@yourfqhc.org"
                    {...register("contactEmail")}
                    aria-invalid={!!errors.contactEmail}
                  />
                  {errors.contactEmail && (
                    <p className="text-xs text-red-600">
                      {errors.contactEmail.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="contactPhone">
                    Phone{" "}
                    <span className="text-stone-400 font-normal">
                      (optional)
                    </span>
                  </Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    {...register("contactPhone")}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label>
                    EHR System{" "}
                    <span className="text-stone-400 font-normal">
                      (optional)
                    </span>
                  </Label>
                  <Select
                    value={watch("ehrSystem")}
                    onValueChange={(v) =>
                      setValue("ehrSystem", v, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select EHR" />
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
              </div>
            </div>
          )}

          {/* ====== STEP 2 — Open Roles ====== */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-stone-900">
                  Open Positions
                </h2>
                <p className="mt-1 text-sm text-stone-500">
                  Add the roles you're looking to fill.
                </p>
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="rounded-xl border border-stone-200 bg-stone-50 p-5 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-stone-700">
                      Position {index + 1}
                    </span>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-stone-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label>Job Title</Label>
                      <Input
                        placeholder="e.g. Care Manager"
                        {...register(`positions.${index}.title`)}
                        aria-invalid={!!errors.positions?.[index]?.title}
                      />
                      {errors.positions?.[index]?.title && (
                        <p className="text-xs text-red-600">
                          {errors.positions[index].title.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label>Role Type</Label>
                      <Select
                        value={watch(`positions.${index}.roleType`)}
                        onValueChange={(v) =>
                          setValue(`positions.${index}.roleType`, v, {
                            shouldValidate: true,
                          })
                        }
                      >
                        <SelectTrigger
                          className="w-full"
                          aria-invalid={!!errors.positions?.[index]?.roleType}
                        >
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {ROLE_TYPES.map((r) => (
                            <SelectItem key={r} value={r}>
                              {r}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.positions?.[index]?.roleType && (
                        <p className="text-xs text-red-600">
                          {errors.positions[index].roleType.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1.5">
                      <Label>
                        Salary Min{" "}
                        <span className="text-stone-400 font-normal">
                          (opt)
                        </span>
                      </Label>
                      <Input
                        type="number"
                        placeholder="60000"
                        {...register(`positions.${index}.salaryMin`)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>
                        Salary Max{" "}
                        <span className="text-stone-400 font-normal">
                          (opt)
                        </span>
                      </Label>
                      <Input
                        type="number"
                        placeholder="85000"
                        {...register(`positions.${index}.salaryMax`)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Urgency</Label>
                      <Select
                        value={watch(`positions.${index}.urgency`)}
                        onValueChange={(v) =>
                          setValue(`positions.${index}.urgency`, v, {
                            shouldValidate: true,
                          })
                        }
                      >
                        <SelectTrigger
                          className="w-full"
                          aria-invalid={!!errors.positions?.[index]?.urgency}
                        >
                          <SelectValue placeholder="Timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          {URGENCY_OPTIONS.map((u) => (
                            <SelectItem key={u} value={u}>
                              {u}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.positions?.[index]?.urgency && (
                        <p className="text-xs text-red-600">
                          {errors.positions[index].urgency.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {errors.positions?.root && (
                <p className="text-xs text-red-600">
                  {errors.positions.root.message}
                </p>
              )}

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  append({
                    title: "",
                    roleType: "",
                    salaryMin: undefined,
                    salaryMax: undefined,
                    urgency: "",
                  })
                }
                className="w-full border-dashed border-stone-300 text-stone-500 hover:border-teal-400 hover:text-teal-700"
              >
                <Plus className="size-4" /> Add Another Position
              </Button>
            </div>
          )}

          {/* ====== STEP 3 — Review ====== */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-stone-900">
                  Review & Submit
                </h2>
                <p className="mt-1 text-sm text-stone-500">
                  Confirm everything looks right.
                </p>
              </div>

              {(() => {
                const data = getValues();
                return (
                  <div className="divide-y divide-stone-100 rounded-xl border border-stone-200 bg-stone-50">
                    <ReviewSection title="Organization">
                      <ReviewRow
                        label="Name"
                        value={data.organizationName}
                      />
                      {data.website && (
                        <ReviewRow label="Website" value={data.website} />
                      )}
                      <ReviewRow label="Contact" value={data.contactName} />
                      <ReviewRow label="Email" value={data.contactEmail} />
                      {data.contactPhone && (
                        <ReviewRow label="Phone" value={data.contactPhone} />
                      )}
                      {data.ehrSystem && (
                        <ReviewRow label="EHR" value={data.ehrSystem} />
                      )}
                    </ReviewSection>

                    <ReviewSection title={`Open Positions (${data.positions.length})`}>
                      {data.positions.map((pos, i) => (
                        <div
                          key={i}
                          className="rounded-lg border border-stone-200 bg-white p-3 mt-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-stone-800">
                              {pos.title}
                            </span>
                            <Badge
                              variant="secondary"
                              className="bg-teal-100 text-teal-900"
                            >
                              {pos.urgency}
                            </Badge>
                          </div>
                          <div className="mt-1 flex gap-3 text-xs text-stone-500">
                            <span>{pos.roleType}</span>
                            {(pos.salaryMin || pos.salaryMax) && (
                              <span>
                                $
                                {pos.salaryMin ? Number(pos.salaryMin).toLocaleString() : "—"}
                                {" – "}$
                                {pos.salaryMax ? Number(pos.salaryMax).toLocaleString() : "—"}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
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

            {step < 2 ? (
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
                  <>Submit Openings <Rocket className="size-4" /></>
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
