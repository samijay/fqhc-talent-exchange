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

const URGENCY_OPTIONS_EN = [
  "Immediately",
  "Within 30 days",
  "Within 60 days",
  "Planning ahead",
] as const;

const URGENCY_OPTIONS_ES = [
  "Inmediatamente",
  "Dentro de 30 días",
  "Dentro de 60 días",
  "Planificando a futuro",
] as const;

/* ------------------------------------------------------------------ */
/*  i18n content                                                       */
/* ------------------------------------------------------------------ */

const content = {
  en: {
    stepLabels: ["Organization", "Open Roles", "Review"],
    badge: "Fill critical roles faster",
    heroTitle: "Hire for Your FQHC",
    heroSubtitle: "Tell us what you need and we'll deliver pre-vetted, mission-aligned candidates within days.",
    fastTrackTitle: "⚡ Fast-Track talent pool available",
    fastTrackDesc: "Experienced FQHC professionals recently displaced and ready to work immediately. Ask when you submit.",
    // Step 1
    step1Title: "Your Organization",
    step1Desc: "Tell us about your health center.",
    orgName: "Organization Name",
    orgNamePlaceholder: "Community Health Center of...",
    website: "Website",
    optional: "(optional)",
    websitePlaceholder: "https://yourfqhc.org",
    contactName: "Contact Name",
    contactNamePlaceholder: "Jane Smith",
    contactEmail: "Contact Email",
    contactEmailPlaceholder: "jane@yourfqhc.org",
    phone: "Phone",
    phonePlaceholder: "(555) 123-4567",
    ehrSystem: "EHR System",
    selectEhr: "Select EHR",
    // Step 2
    step2Title: "Open Positions",
    step2Desc: "Add the roles you're looking to fill.",
    position: "Position",
    jobTitle: "Job Title",
    jobTitlePlaceholder: "e.g. Care Manager",
    roleType: "Role Type",
    selectType: "Select type",
    salaryMin: "Salary Min",
    salaryMax: "Salary Max",
    opt: "(opt)",
    urgency: "Urgency",
    timeline: "Timeline",
    addAnother: "Add Another Position",
    // Step 3
    step3Title: "Review & Submit",
    step3Desc: "Confirm everything looks right.",
    reviewOrg: "Organization",
    reviewName: "Name",
    reviewWebsite: "Website",
    reviewContact: "Contact",
    reviewEmail: "Email",
    reviewPhone: "Phone",
    reviewEhr: "EHR",
    openPositions: "Open Positions",
    // Nav
    back: "Back",
    continue: "Continue",
    submitting: "Submitting...",
    submitOpenings: "Submit Openings",
    backToHome: "Back to Home",
    // Errors
    networkError: "Network error. Please check your connection and try again.",
    genericError: "Something went wrong. Please try again.",
    // Validation
    orgNameRequired: "Organization name is required",
    contactNameRequired: "Contact name is required",
    emailRequired: "Email is required",
    emailInvalid: "Enter a valid email",
    jobTitleRequired: "Job title is required",
    selectRoleType: "Select a role type",
    selectUrgency: "Select urgency",
    addPosition: "Add at least one open position",
    // Success
    successTitle: "We're on It!",
    successMessage: (name: string, count: number) =>
      `Thanks, ${name}! Your ${count} open ${count === 1 ? "role has" : "roles have"} been received.`,
    acknowledgmentTitle: "Same-Day Acknowledgment",
    acknowledgmentBody: "A member of our team will confirm receipt and ask any clarifying questions.",
    sourcingTitle: "Candidate Sourcing Begins",
    sourcingBody: "We tap our pre-vetted FQHC talent pool and begin matching within 48 hours.",
    introsTitle: "First Intros in 5 Days",
    introsBody: "Expect your first qualified candidate introductions within five business days.",
  },
  es: {
    stepLabels: ["Organización", "Roles Abiertos", "Revisar"],
    badge: "Cubra roles críticos más rápido",
    heroTitle: "Contrate para su FQHC",
    heroSubtitle: "Díganos lo que necesita y le entregaremos candidatos pre-evaluados y alineados con su misión en días.",
    fastTrackTitle: "⚡ Grupo de talento Fast-Track disponible",
    fastTrackDesc: "Profesionales experimentados de FQHC recientemente desplazados, listos para trabajar de inmediato. Pregunte al enviar.",
    // Step 1
    step1Title: "Su Organización",
    step1Desc: "Cuéntenos sobre su centro de salud.",
    orgName: "Nombre de la Organización",
    orgNamePlaceholder: "Centro de Salud Comunitario de...",
    website: "Sitio Web",
    optional: "(opcional)",
    websitePlaceholder: "https://sufqhc.org",
    contactName: "Nombre de Contacto",
    contactNamePlaceholder: "María García",
    contactEmail: "Correo de Contacto",
    contactEmailPlaceholder: "maria@sufqhc.org",
    phone: "Teléfono",
    phonePlaceholder: "(555) 123-4567",
    ehrSystem: "Sistema EHR",
    selectEhr: "Seleccionar EHR",
    // Step 2
    step2Title: "Posiciones Abiertas",
    step2Desc: "Agregue los roles que busca cubrir.",
    position: "Posición",
    jobTitle: "Título del Puesto",
    jobTitlePlaceholder: "ej. Gestor de Casos",
    roleType: "Tipo de Rol",
    selectType: "Seleccionar tipo",
    salaryMin: "Salario Mín.",
    salaryMax: "Salario Máx.",
    opt: "(opc.)",
    urgency: "Urgencia",
    timeline: "Plazo",
    addAnother: "Agregar Otra Posición",
    // Step 3
    step3Title: "Revisar y Enviar",
    step3Desc: "Confirme que todo se vea bien.",
    reviewOrg: "Organización",
    reviewName: "Nombre",
    reviewWebsite: "Sitio Web",
    reviewContact: "Contacto",
    reviewEmail: "Correo",
    reviewPhone: "Teléfono",
    reviewEhr: "EHR",
    openPositions: "Posiciones Abiertas",
    // Nav
    back: "Atrás",
    continue: "Continuar",
    submitting: "Enviando...",
    submitOpenings: "Enviar Vacantes",
    backToHome: "Volver al Inicio",
    // Errors
    networkError: "Error de red. Por favor verifique su conexión e intente de nuevo.",
    genericError: "Algo salió mal. Por favor intente de nuevo.",
    // Validation
    orgNameRequired: "El nombre de la organización es obligatorio",
    contactNameRequired: "El nombre de contacto es obligatorio",
    emailRequired: "El correo electrónico es obligatorio",
    emailInvalid: "Ingrese un correo electrónico válido",
    jobTitleRequired: "El título del puesto es obligatorio",
    selectRoleType: "Seleccione un tipo de rol",
    selectUrgency: "Seleccione la urgencia",
    addPosition: "Agregue al menos una posición abierta",
    // Success
    successTitle: "¡Estamos en ello!",
    successMessage: (name: string, count: number) =>
      `¡Gracias, ${name}! ${count === 1 ? "Su rol abierto ha sido" : `Sus ${count} roles abiertos han sido`} recibido${count === 1 ? "" : "s"}.`,
    acknowledgmentTitle: "Confirmación el mismo día",
    acknowledgmentBody: "Un miembro de nuestro equipo confirmará la recepción y hará preguntas aclaratorias.",
    sourcingTitle: "Comienza la búsqueda de candidatos",
    sourcingBody: "Utilizamos nuestro grupo de talento FQHC pre-evaluado y comenzamos a buscar coincidencias en 48 horas.",
    introsTitle: "Primeras presentaciones en 5 días",
    introsBody: "Espere sus primeras presentaciones de candidatos calificados dentro de cinco días hábiles.",
  },
};

/* ------------------------------------------------------------------ */
/*  Schema                                                             */
/* ------------------------------------------------------------------ */

function createSchema(t: typeof content.en) {
  const positionSchema = z.object({
    title: z.string().min(1, t.jobTitleRequired),
    roleType: z.string().min(1, t.selectRoleType),
    salaryMin: z.string().optional(),
    salaryMax: z.string().optional(),
    urgency: z.string().min(1, t.selectUrgency),
  });

  return z.object({
    organizationName: z.string().min(1, t.orgNameRequired),
    website: z.string().optional(),
    contactName: z.string().min(1, t.contactNameRequired),
    contactEmail: z
      .string()
      .min(1, t.emailRequired)
      .email(t.emailInvalid),
    contactPhone: z.string().optional(),
    ehrSystem: z.string().optional(),
    positions: z.array(positionSchema).min(1, t.addPosition),
  });
}

type FormData = z.infer<ReturnType<typeof createSchema>>;

const STEP_FIELDS: (keyof FormData)[][] = [
  ["organizationName", "contactName", "contactEmail"],
  ["positions"],
  [],
];

const STEP_ICONS = [Building2, Briefcase, ClipboardCheck];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ForEmployers() {
  const locale = useLocale();
  const isEs = locale === "es";
  const t = isEs ? content.es : content.en;
  const urgencyOptions = isEs ? URGENCY_OPTIONS_ES : URGENCY_OPTIONS_EN;
  const formSchema = createSchema(t);

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
        setSubmitError(result.error || t.genericError);
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError(t.networkError);
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
              {t.successTitle}
            </h1>
            <p className="mx-auto mt-3 max-w-md text-stone-500">
              {t.successMessage(
                data.contactName.split(" ")[0],
                data.positions.length
              )}
            </p>

            <div className="mt-10 grid gap-6 text-left sm:grid-cols-3">
              {[
                {
                  icon: Clock,
                  title: t.acknowledgmentTitle,
                  body: t.acknowledgmentBody,
                },
                {
                  icon: Users,
                  title: t.sourcingTitle,
                  body: t.sourcingBody,
                },
                {
                  icon: Handshake,
                  title: t.introsTitle,
                  body: t.introsBody,
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
              <Link href="/">{t.backToHome}</Link>
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
          {t.badge}
        </Badge>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          {t.heroTitle}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-teal-100/80 sm:text-lg">
          {t.heroSubtitle}
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
              {t.fastTrackTitle}
            </p>
            <p className="text-xs sm:text-sm text-stone-600">
              {t.fastTrackDesc}
            </p>
          </div>
        </div>
      </div>

      {/* ---------- Progress bar ---------- */}
      <div className="mx-auto max-w-2xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mb-2 flex items-center justify-between">
          {t.stepLabels.map((label, i) => {
            const Icon = STEP_ICONS[i];
            const isActive = i === step;
            const isDone = i < step;
            return (
              <div
                key={label}
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
                  {label}
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
                  {t.step1Title}
                </h2>
                <p className="mt-1 text-sm text-stone-500">
                  {t.step1Desc}
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="organizationName">{t.orgName}</Label>
                <Input
                  id="organizationName"
                  placeholder={t.orgNamePlaceholder}
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
                  {t.website}{" "}
                  <span className="text-stone-400 font-normal">{t.optional}</span>
                </Label>
                <Input
                  id="website"
                  placeholder={t.websitePlaceholder}
                  {...register("website")}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="contactName">{t.contactName}</Label>
                  <Input
                    id="contactName"
                    placeholder={t.contactNamePlaceholder}
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
                  <Label htmlFor="contactEmail">{t.contactEmail}</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder={t.contactEmailPlaceholder}
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
                    {t.phone}{" "}
                    <span className="text-stone-400 font-normal">
                      {t.optional}
                    </span>
                  </Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    placeholder={t.phonePlaceholder}
                    {...register("contactPhone")}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label>
                    {t.ehrSystem}{" "}
                    <span className="text-stone-400 font-normal">
                      {t.optional}
                    </span>
                  </Label>
                  <Select
                    value={watch("ehrSystem")}
                    onValueChange={(v) =>
                      setValue("ehrSystem", v, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t.selectEhr} />
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
                  {t.step2Title}
                </h2>
                <p className="mt-1 text-sm text-stone-500">
                  {t.step2Desc}
                </p>
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="rounded-xl border border-stone-200 bg-stone-50 p-5 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-stone-700">
                      {t.position} {index + 1}
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
                      <Label>{t.jobTitle}</Label>
                      <Input
                        placeholder={t.jobTitlePlaceholder}
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
                      <Label>{t.roleType}</Label>
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
                          <SelectValue placeholder={t.selectType} />
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
                        {t.salaryMin}{" "}
                        <span className="text-stone-400 font-normal">
                          {t.opt}
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
                        {t.salaryMax}{" "}
                        <span className="text-stone-400 font-normal">
                          {t.opt}
                        </span>
                      </Label>
                      <Input
                        type="number"
                        placeholder="85000"
                        {...register(`positions.${index}.salaryMax`)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>{t.urgency}</Label>
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
                          <SelectValue placeholder={t.timeline} />
                        </SelectTrigger>
                        <SelectContent>
                          {urgencyOptions.map((u) => (
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
                <Plus className="size-4" /> {t.addAnother}
              </Button>
            </div>
          )}

          {/* ====== STEP 3 — Review ====== */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-stone-900">
                  {t.step3Title}
                </h2>
                <p className="mt-1 text-sm text-stone-500">
                  {t.step3Desc}
                </p>
              </div>

              {(() => {
                const data = getValues();
                return (
                  <div className="divide-y divide-stone-100 rounded-xl border border-stone-200 bg-stone-50">
                    <ReviewSection title={t.reviewOrg}>
                      <ReviewRow
                        label={t.reviewName}
                        value={data.organizationName}
                      />
                      {data.website && (
                        <ReviewRow label={t.reviewWebsite} value={data.website} />
                      )}
                      <ReviewRow label={t.reviewContact} value={data.contactName} />
                      <ReviewRow label={t.reviewEmail} value={data.contactEmail} />
                      {data.contactPhone && (
                        <ReviewRow label={t.reviewPhone} value={data.contactPhone} />
                      )}
                      {data.ehrSystem && (
                        <ReviewRow label={t.reviewEhr} value={data.ehrSystem} />
                      )}
                    </ReviewSection>

                    <ReviewSection title={`${t.openPositions} (${data.positions.length})`}>
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
                <ArrowLeft className="size-4" /> {t.back}
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
                {t.continue} <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={submitting}
                className="bg-amber-500 text-stone-900 shadow-lg hover:bg-amber-400"
              >
                {submitting ? (
                  <>{t.submitting}</>
                ) : (
                  <>{t.submitOpenings} <Rocket className="size-4" /></>
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
