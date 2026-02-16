"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import {
  CheckCircle2,
  Loader2,
  Zap,
  Clock,
  Shield,
  Briefcase,
  MapPin,
  ArrowRight,
  FileText,
} from "lucide-react";
import FastTrackResume from "@/components/resume-builder/FastTrackResume";
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

const ROLES = [
  "Community Health Worker (CHW)",
  "Care Coordinator",
  "Case Manager",
  "Patient Navigator",
  "Medical Assistant",
  "Behavioral Health Specialist",
  "Registered Nurse (RN)",
  "Licensed Vocational Nurse (LVN)",
  "Social Worker (LCSW/ASW)",
  "Health Educator",
  "Enrollment / Health Navigator",
  "Patient Services Representative",
  "Revenue Cycle / Billing",
  "Dental (Hygienist/Assistant)",
  "Pharmacy (Pharmacist/Technician)",
  "Physician / NP / PA",
  "Leadership / Management",
  "Other",
] as const;

const YEARS_OPTIONS = [
  "Less than 1 year",
  "1-3 years",
  "3-5 years",
  "5-10 years",
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
  "Other",
] as const;

const AVAILABILITY = [
  "Immediately",
  "Within 1 week",
  "Within 2 weeks",
] as const;

const NOTES_MAX = 300;

/* ------------------------------------------------------------------ */
/*  i18n content                                                       */
/* ------------------------------------------------------------------ */

const content = {
  en: {
    heroTitle: "Were You Recently Laid Off from an FQHC?",
    heroSubtitle:
      "You have experience that FQHCs across California need RIGHT NOW. We'll connect you with hiring health centers within 48 hours.",
    badge1: "100% free",
    badge2: "48-hour intro",
    badge3: "Priority matching",
    whyTitle: "Why Fast-Track?",
    why1Title: "You're Immediately Available",
    why1Desc:
      "No 2-week notice needed. Employers who need staff NOW want you first.",
    why2Title: "You're Already Trained",
    why2Desc:
      "Your ECM, CCM, and EHR experience transfers directly. No ramp-up period.",
    why3Title: "We Advocate For You",
    why3Desc:
      "A real person reviews your profile and makes direct introductions to hiring managers.",
    formTitle: "Start Your Fast-Track Profile",
    formSubtitle:
      "Fill out the form below and we'll match you with FQHCs that need your skills. Takes under 3 minutes.",
    sectionPersonal: "About You",
    sectionSituation: "Your Situation",
    sectionExperience: "Your FQHC Experience",
    sectionLocation: "Location Preferences",
    sectionNotes: "Anything Else?",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone",
    previousEmployer: "Previous FQHC / employer",
    previousEmployerPlaceholder: "e.g. AltaMed, JWCH, Northeast Valley",
    previousRole: "Your most recent role",
    selectRole: "Select your role",
    layoffDate: "Approximate layoff date",
    availableStart: "When can you start?",
    selectAvailability: "Select availability",
    yearsExperience: "Years of FQHC experience",
    selectExperience: "Select experience",
    ehrSystems: "EHR systems you've used",
    programs: "Programs you've worked in",
    bilingual: "Languages spoken",
    bilingualYesSpanish: "Spanish/English",
    bilingualYesOther: "Other language(s)",
    bilingualNo: "English only",
    selectLanguages: "Select other languages",
    currentRegion: "Where are you now?",
    selectRegion: "Select region",
    openToRegions: "Regions you'd work in",
    willingToRelocate: "Willing to relocate within California",
    notesLabel: "Additional notes",
    notesPlaceholder:
      "Anything else we should know? Preferred schedule, salary needs, special skills...",
    optional: "optional",
    submit: "Get Fast-Tracked",
    submitting: "Submitting...",
    successTitle: "You're in the Fast-Track Pool!",
    successName: "Welcome, {name}!",
    successDesc:
      "Your profile is in our priority queue. Here's what happens next:",
    step1Label: "Right Now",
    step1Desc: "Your profile is in our fast-track queue for priority review.",
    step2Label: "Within 24 Hours",
    step2Desc:
      "A placement advocate reviews your qualifications and identifies matching FQHCs.",
    step3Label: "Within 48 Hours",
    step3Desc:
      "You'll receive your first introduction to a hiring FQHC that needs your skills.",
    whileYouWait: "While You Wait",
    buildResume: "Build Your Free Resume",
    browseJobs: "Browse Open Positions",
    takeAssessment: "Take Career Assessment",
    errorDuplicate:
      "This email is already in the fast-track pool. We'll be in touch soon!",
    errorGeneric: "Something went wrong. Please try again.",
    errorNetwork: "Network error. Please check your connection and try again.",
    firstNameRequired: "First name is required.",
    lastNameRequired: "Last name is required.",
    emailRequired: "Email is required.",
    emailInvalid: "Please enter a valid email address.",
    lookingForJob: "Not recently laid off?",
    joinRegular: "Join our regular talent network",
    quickResume: "Build Quick Resume",
    quickResumeDesc: "Use the info you just entered to generate a professional resume in 2 minutes.",
  },
  es: {
    heroTitle: "\u00bfFuiste despedido/a recientemente de un FQHC?",
    heroSubtitle:
      "Tienes experiencia que los FQHCs en California necesitan AHORA MISMO. Te conectaremos con centros de salud contratando en 48 horas.",
    badge1: "100% gratis",
    badge2: "Intro en 48 horas",
    badge3: "Prioridad de matching",
    whyTitle: "\u00bfPor qu\u00e9 Fast-Track?",
    why1Title: "Est\u00e1s Disponible Inmediatamente",
    why1Desc:
      "Sin periodo de aviso de 2 semanas. Los empleadores que necesitan personal AHORA te quieren primero.",
    why2Title: "Ya Est\u00e1s Capacitado/a",
    why2Desc:
      "Tu experiencia en ECM, CCM y sistemas EHR se transfiere directamente. Sin periodo de adaptaci\u00f3n.",
    why3Title: "Abogamos Por Ti",
    why3Desc:
      "Una persona real revisa tu perfil y hace presentaciones directas a gerentes de contrataci\u00f3n.",
    formTitle: "Inicia Tu Perfil Fast-Track",
    formSubtitle:
      "Llena el formulario y te conectaremos con FQHCs que necesitan tus habilidades. Toma menos de 3 minutos.",
    sectionPersonal: "Sobre Ti",
    sectionSituation: "Tu Situaci\u00f3n",
    sectionExperience: "Tu Experiencia en FQHC",
    sectionLocation: "Preferencias de Ubicaci\u00f3n",
    sectionNotes: "\u00bfAlgo M\u00e1s?",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Correo electr\u00f3nico",
    phone: "Tel\u00e9fono",
    previousEmployer: "FQHC / empleador anterior",
    previousEmployerPlaceholder: "ej. AltaMed, JWCH, Northeast Valley",
    previousRole: "Tu rol m\u00e1s reciente",
    selectRole: "Selecciona tu rol",
    layoffDate: "Fecha aproximada de despido",
    availableStart: "\u00bfCu\u00e1ndo puedes comenzar?",
    selectAvailability: "Selecciona disponibilidad",
    yearsExperience: "A\u00f1os de experiencia en FQHC",
    selectExperience: "Selecciona experiencia",
    ehrSystems: "Sistemas EHR que has usado",
    programs: "Programas en los que has trabajado",
    bilingual: "Idiomas que hablas",
    bilingualYesSpanish: "Español/Inglés",
    bilingualYesOther: "Otro(s) idioma(s)",
    bilingualNo: "Solo inglés",
    selectLanguages: "Selecciona otros idiomas",
    currentRegion: "\u00bfD\u00f3nde est\u00e1s ahora?",
    selectRegion: "Selecciona regi\u00f3n",
    openToRegions: "Regiones donde trabajar\u00edas",
    willingToRelocate: "Dispuesto/a a reubicarse dentro de California",
    notesLabel: "Notas adicionales",
    notesPlaceholder:
      "\u00bfAlgo m\u00e1s que debamos saber? Horario preferido, necesidades salariales, habilidades especiales...",
    optional: "opcional",
    submit: "Obtener Fast-Track",
    submitting: "Enviando...",
    successTitle: "\u00a1Est\u00e1s en el Pool Fast-Track!",
    successName: "\u00a1Bienvenido/a, {name}!",
    successDesc:
      "Tu perfil est\u00e1 en nuestra cola de prioridad. Esto es lo que sigue:",
    step1Label: "Ahora Mismo",
    step1Desc:
      "Tu perfil est\u00e1 en nuestra cola fast-track para revisi\u00f3n prioritaria.",
    step2Label: "Dentro de 24 Horas",
    step2Desc:
      "Un abogado de colocaci\u00f3n revisa tus calificaciones e identifica FQHCs compatibles.",
    step3Label: "Dentro de 48 Horas",
    step3Desc:
      "Recibir\u00e1s tu primera presentaci\u00f3n a un FQHC que necesita tus habilidades.",
    whileYouWait: "Mientras Esperas",
    buildResume: "Crea Tu CV Gratis",
    browseJobs: "Explora Posiciones Abiertas",
    takeAssessment: "Toma la Evaluaci\u00f3n de Carrera",
    errorDuplicate:
      "Este correo ya est\u00e1 en el pool fast-track. \u00a1Nos comunicaremos pronto!",
    errorGeneric: "Algo sali\u00f3 mal. Por favor int\u00e9ntalo de nuevo.",
    errorNetwork:
      "Error de red. Por favor revisa tu conexi\u00f3n e int\u00e9ntalo de nuevo.",
    firstNameRequired: "El nombre es obligatorio.",
    lastNameRequired: "El apellido es obligatorio.",
    emailRequired: "El correo electr\u00f3nico es obligatorio.",
    emailInvalid:
      "Por favor ingresa un correo electr\u00f3nico v\u00e1lido.",
    lookingForJob: "¿No fuiste despedido/a recientemente?",
    joinRegular: "Únete a nuestra red de talento regular",
    quickResume: "Crear CV Rápido",
    quickResumeDesc: "Usa la información que acabas de ingresar para generar un CV profesional en 2 minutos.",
  },
};

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function FastTrackPage() {
  const locale = useLocale();
  const t = locale === "es" ? content.es : content.en;

  /* --- form state ------------------------------------------------- */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [previousEmployer, setPreviousEmployer] = useState("");
  const [previousRole, setPreviousRole] = useState("");
  const [layoffDate, setLayoffDate] = useState("");
  const [availableStart, setAvailableStart] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [ehrSystems, setEhrSystems] = useState<string[]>([]);
  const [programs, setPrograms] = useState<string[]>([]);
  const [bilingual, setBilingual] = useState("");
  const [additionalLanguages, setAdditionalLanguages] = useState<string[]>([]);
  const [currentRegion, setCurrentRegion] = useState("");
  const [openToRegions, setOpenToRegions] = useState<string[]>([]);
  const [willingToRelocate, setWillingToRelocate] = useState(false);
  const [notes, setNotes] = useState("");

  /* --- ui state --------------------------------------------------- */
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showResume, setShowResume] = useState(false);

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
    if (!firstName.trim()) next.firstName = t.firstNameRequired;
    if (!lastName.trim()) next.lastName = t.lastNameRequired;
    if (!email.trim()) {
      next.email = t.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = t.emailInvalid;
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
      const res = await fetch("/api/displaced-candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim() || undefined,
          previousEmployer: previousEmployer.trim() || undefined,
          previousRole: previousRole || undefined,
          layoffDate: layoffDate || undefined,
          availableStart: availableStart || "immediately",
          yearsExperience: yearsExperience || undefined,
          ehrSystems,
          programs,
          bilingual: bilingual || undefined,
          additionalLanguages: additionalLanguages.length > 0 ? additionalLanguages : undefined,
          currentRegion: currentRegion || undefined,
          openToRegions,
          willingToRelocate,
          notes: notes.trim() || undefined,
          locale,
        }),
      });

      const data = await res.json();

      if (res.status === 409) {
        setServerError(data.error ?? t.errorDuplicate);
        return;
      }

      if (!res.ok) {
        setServerError(data.error ?? t.errorGeneric);
        return;
      }

      setSuccess(true);
    } catch {
      setServerError(t.errorNetwork);
    } finally {
      setSubmitting(false);
    }
  }

  /* ================================================================ */
  /*  Success State                                                    */
  /* ================================================================ */

  if (success) {
    // Show FastTrackResume if user clicked "Build Quick Resume"
    if (showResume) {
      return (
        <div className="bg-stone-50 min-h-screen">
          <FastTrackResume
            prefillData={{
              firstName,
              lastName,
              email,
              phone,
              previousRole: previousRole,
              previousEmployer: previousEmployer,
              ehrSystems,
              programs,
              bilingual,
              currentRegion,
              yearsExperience,
              additionalLanguages,
            }}
            onBack={() => setShowResume(false)}
          />
        </div>
      );
    }

    return (
      <div className="bg-stone-50">
        <section className="bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 py-14 text-center text-white sm:py-20">
          <div className="mx-auto max-w-2xl px-4">
            <CheckCircle2 className="mx-auto size-16 text-amber-400" />
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {t.successTitle}
            </h1>
            <p className="mt-4 text-lg text-teal-100/90">
              {t.successName.replace("{name}", firstName)}
            </p>
            <p className="mt-2 text-teal-100/70">
              {t.successDesc}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-2xl px-4 py-14">
          {/* Quick Resume Card */}
          <div className="mb-8 rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-white p-6 shadow-md">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                <FileText className="size-6 text-amber-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-stone-900">{t.quickResume}</h3>
                <p className="mt-1 text-sm text-stone-600">{t.quickResumeDesc}</p>
                <button
                  onClick={() => setShowResume(true)}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-stone-900 shadow hover:bg-amber-400 transition-colors"
                >
                  {t.quickResume} <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            {[
              { label: t.step1Label, desc: t.step1Desc, icon: Zap },
              { label: t.step2Label, desc: t.step2Desc, icon: Shield },
              { label: t.step3Label, desc: t.step3Desc, icon: Briefcase },
            ].map((step, idx) => (
              <div
                key={idx}
                className="flex gap-4 rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-100">
                  <step.icon className="size-5 text-teal-700" />
                </div>
                <div>
                  <p className="font-bold text-stone-900">{step.label}</p>
                  <p className="mt-1 text-sm text-stone-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* While you wait */}
          <div className="mt-10 rounded-xl border border-teal-200 bg-teal-50 p-6">
            <h3 className="mb-4 font-bold text-stone-900">
              {t.whileYouWait}
            </h3>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/resume-builder"
                className="flex items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800 transition-colors"
              >
                {t.buildResume} <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/jobs"
                className="flex items-center justify-center gap-2 rounded-lg border border-teal-700 px-5 py-3 text-sm font-semibold text-teal-700 hover:bg-teal-100 transition-colors"
              >
                {t.browseJobs}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  Form State                                                       */
  /* ================================================================ */

  return (
    <div className="bg-stone-50">
      {/* ---------- Hero ---------- */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 py-14 text-center text-white sm:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-1.5 text-sm font-semibold text-amber-300">
            <Zap className="size-4" />
            FAST-TRACK
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {t.heroTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-teal-100/80 sm:text-lg">
            {t.heroSubtitle}
          </p>

          {/* Trust badges */}
          <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-3">
            {[t.badge1, t.badge2, t.badge3].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur"
              >
                <CheckCircle2 className="size-4 text-amber-400" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Why Fast-Track ---------- */}
      <section className="py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-stone-900">
            {t.whyTitle}
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { title: t.why1Title, desc: t.why1Desc, icon: Clock },
              { title: t.why2Title, desc: t.why2Desc, icon: Shield },
              { title: t.why3Title, desc: t.why3Desc, icon: Briefcase },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-stone-200 bg-white p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-teal-100">
                  <card.icon className="size-6 text-teal-700" />
                </div>
                <h3 className="font-bold text-stone-900">{card.title}</h3>
                <p className="mt-2 text-sm text-stone-600">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Form ---------- */}
      <section className="pb-16 px-4 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-stone-900">
              {t.formTitle}
            </h2>
            <p className="mt-2 text-stone-600">{t.formSubtitle}</p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl border border-stone-200 bg-white p-6 shadow sm:p-10"
          >
            {/* Server error */}
            {serverError && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {serverError}
              </div>
            )}

            {/* === Section: About You === */}
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-stone-900">
              <span className="flex size-7 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">
                1
              </span>
              {t.sectionPersonal}
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">
                  {t.firstName} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Maria"
                  className="mt-1.5"
                  aria-invalid={!!errors.firstName}
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">
                  {t.lastName} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Garcia"
                  className="mt-1.5"
                  aria-invalid={!!errors.lastName}
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="email">
                  {t.email} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="maria@example.com"
                  className="mt-1.5"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">{t.phone}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="mt-1.5"
                />
              </div>
            </div>

            {/* === Section: Your Situation === */}
            <h3 className="mb-4 mt-8 flex items-center gap-2 text-lg font-bold text-stone-900">
              <span className="flex size-7 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                2
              </span>
              {t.sectionSituation}
            </h3>

            <div>
              <Label htmlFor="previousEmployer">{t.previousEmployer}</Label>
              <Input
                id="previousEmployer"
                value={previousEmployer}
                onChange={(e) => setPreviousEmployer(e.target.value)}
                placeholder={t.previousEmployerPlaceholder}
                className="mt-1.5"
              />
            </div>

            <div className="mt-4">
              <Label htmlFor="previousRole">{t.previousRole}</Label>
              <Select value={previousRole} onValueChange={setPreviousRole}>
                <SelectTrigger className="mt-1.5 w-full">
                  <SelectValue placeholder={t.selectRole} />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="layoffDate">{t.layoffDate}</Label>
                <Input
                  id="layoffDate"
                  type="date"
                  value={layoffDate}
                  onChange={(e) => setLayoffDate(e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="availableStart">{t.availableStart}</Label>
                <Select
                  value={availableStart}
                  onValueChange={setAvailableStart}
                >
                  <SelectTrigger className="mt-1.5 w-full">
                    <SelectValue placeholder={t.selectAvailability} />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABILITY.map((a) => (
                      <SelectItem key={a} value={a}>
                        {a}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* === Section: FQHC Experience === */}
            <h3 className="mb-4 mt-8 flex items-center gap-2 text-lg font-bold text-stone-900">
              <span className="flex size-7 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">
                3
              </span>
              {t.sectionExperience}
            </h3>

            <div>
              <Label htmlFor="yearsExperience">{t.yearsExperience}</Label>
              <Select
                value={yearsExperience}
                onValueChange={setYearsExperience}
              >
                <SelectTrigger className="mt-1.5 w-full">
                  <SelectValue placeholder={t.selectExperience} />
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

            {/* EHR systems */}
            <fieldset className="mt-5">
              <legend className="text-sm font-medium text-stone-900">
                {t.ehrSystems}
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

            {/* Programs */}
            <fieldset className="mt-5">
              <legend className="text-sm font-medium text-stone-900">
                {t.programs}
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

            {/* Languages */}
            <fieldset className="mt-5">
              <legend className="text-sm font-medium text-stone-900">
                {t.bilingual}
              </legend>
              <div className="mt-2 flex flex-col gap-2.5 sm:flex-row sm:gap-6">
                {[
                  { value: "Spanish/English", label: t.bilingualYesSpanish },
                  { value: "Other", label: t.bilingualYesOther },
                  { value: "No", label: t.bilingualNo },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="flex cursor-pointer items-center gap-2 text-sm text-stone-700"
                  >
                    <input
                      type="radio"
                      name="bilingual"
                      value={opt.value}
                      checked={bilingual === opt.value}
                      onChange={(e) => {
                        setBilingual(e.target.value);
                        if (e.target.value !== "Other") setAdditionalLanguages([]);
                      }}
                      className="size-4 border-stone-300 text-teal-700 focus:ring-teal-500"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>

              {/* Show language checkboxes when "Other" is selected */}
              {bilingual === "Other" && (
                <div className="mt-3 rounded-lg border border-stone-200 bg-stone-50 p-3">
                  <p className="mb-2 text-xs font-medium text-stone-500">{t.selectLanguages}</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-3">
                    {["Spanish", "Tagalog", "Cantonese", "Mandarin", "Vietnamese", "Korean",
                      "Armenian", "Farsi", "Arabic", "Hmong", "Russian", "Khmer",
                      "Japanese", "Hindi", "Punjabi"].map((lang) => (
                      <label
                        key={lang}
                        className="flex cursor-pointer items-center gap-2 text-sm text-stone-700"
                      >
                        <input
                          type="checkbox"
                          checked={additionalLanguages.includes(lang)}
                          onChange={() =>
                            setAdditionalLanguages((prev) =>
                              prev.includes(lang)
                                ? prev.filter((l) => l !== lang)
                                : [...prev, lang],
                            )
                          }
                          className="size-3.5 rounded border-stone-300 text-teal-700 focus:ring-teal-500"
                        />
                        {lang}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </fieldset>

            {/* === Section: Location === */}
            <h3 className="mb-4 mt-8 flex items-center gap-2 text-lg font-bold text-stone-900">
              <span className="flex size-7 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                4
              </span>
              <MapPin className="size-5" />
              {t.sectionLocation}
            </h3>

            <div>
              <Label htmlFor="currentRegion">{t.currentRegion}</Label>
              <Select value={currentRegion} onValueChange={setCurrentRegion}>
                <SelectTrigger className="mt-1.5 w-full">
                  <SelectValue placeholder={t.selectRegion} />
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

            {/* Open to regions */}
            <fieldset className="mt-5">
              <legend className="text-sm font-medium text-stone-900">
                {t.openToRegions}
              </legend>
              <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3">
                {REGIONS.map((region) => (
                  <label
                    key={region}
                    className="flex cursor-pointer items-center gap-2 text-sm text-stone-700"
                  >
                    <input
                      type="checkbox"
                      checked={openToRegions.includes(region)}
                      onChange={() =>
                        toggleCheckbox(region, openToRegions, setOpenToRegions)
                      }
                      className="size-4 rounded border-stone-300 text-teal-700 focus:ring-teal-500"
                    />
                    {region}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Willing to relocate */}
            <div className="mt-4">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-stone-700">
                <input
                  type="checkbox"
                  checked={willingToRelocate}
                  onChange={(e) => setWillingToRelocate(e.target.checked)}
                  className="size-4 rounded border-stone-300 text-teal-700 focus:ring-teal-500"
                />
                {t.willingToRelocate}
              </label>
            </div>

            {/* === Section: Notes === */}
            <h3 className="mb-4 mt-8 flex items-center gap-2 text-lg font-bold text-stone-900">
              <span className="flex size-7 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">
                5
              </span>
              {t.sectionNotes}
            </h3>

            <div>
              <Label htmlFor="notes">
                {t.notesLabel}{" "}
                <span className="font-normal text-stone-400">
                  ({t.optional})
                </span>
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => {
                  if (e.target.value.length <= NOTES_MAX) {
                    setNotes(e.target.value);
                  }
                }}
                placeholder={t.notesPlaceholder}
                rows={3}
                className="mt-1.5"
                maxLength={NOTES_MAX}
              />
              <p className="mt-1 text-right text-xs text-stone-400">
                {notes.length}/{NOTES_MAX}
              </p>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={submitting}
              className="mt-8 h-12 w-full bg-gradient-to-r from-teal-700 to-amber-600 text-base font-semibold text-white hover:shadow-lg"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {t.submitting}
                </>
              ) : (
                <>
                  <Zap className="size-4" />
                  {t.submit}
                </>
              )}
            </Button>
          </form>

          {/* Cross-link */}
          <div className="mt-8 text-center text-sm text-stone-500">
            {t.lookingForJob}{" "}
            <Link
              href="/join"
              className="font-medium text-teal-700 underline hover:text-teal-800"
            >
              {t.joinRegular} →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
