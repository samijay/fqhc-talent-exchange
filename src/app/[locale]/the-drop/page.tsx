"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
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
import { toast } from "sonner";
import {
  ClipboardCheck,
  Users,
  Handshake,
  Loader2,
  ArrowRight,
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  CheckCircle2,
  Shield,
  Zap,
  Clock,
  Star,
  Target,
  BarChart3,
  Heart,
  Award,
  UserCheck,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Bilingual helper                                                    */
/* ------------------------------------------------------------------ */

function t(
  obj: { en: string; es: string },
  locale: string,
): string {
  return locale === "es" ? obj.es : obj.en;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                           */
/* ------------------------------------------------------------------ */

const ROLES = [
  "Community Health Worker",
  "Care Coordinator",
  "Medical Assistant",
  "Case Manager",
  "Behavioral Health Specialist",
  "Registered Nurse",
  "Licensed Therapist",
  "Patient Services Rep",
  "Program Manager",
  "Nurse Practitioner",
  "Dental Hygienist",
  "Pharmacist",
  "Revenue Cycle Specialist",
  "Administrative",
] as const;

const REGIONS = [
  "Los Angeles",
  "San Diego",
  "SF Bay Area",
  "Sacramento",
  "Central Valley",
  "Inland Empire",
  "Central Coast",
  "North State",
] as const;

const EHR_SYSTEMS = [
  "OCHIN Epic",
  "eClinicalWorks",
  "NextGen",
  "athenahealth",
  "Greenway",
  "Practice Fusion",
  "Other",
] as const;

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

interface CandidateFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface EmployerFormErrors {
  orgName?: string;
  contactName?: string;
  email?: string;
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                      */
/* ------------------------------------------------------------------ */

export default function TheDropPage() {
  const locale = useLocale();

  /* --- Candidate form state --- */
  const [cFirstName, setCFirstName] = useState("");
  const [cLastName, setCLastName] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [cRole, setCRole] = useState("");
  const [cRegion, setCRegion] = useState("");
  const [cHasAssessment, setCHasAssessment] = useState(false);
  const [cErrors, setCErrors] = useState<CandidateFormErrors>({});
  const [cSubmitting, setCSubmitting] = useState(false);
  const [cSuccess, setCSuccess] = useState(false);

  /* --- Employer form state --- */
  const [eOrgName, setEOrgName] = useState("");
  const [eContactName, setEContactName] = useState("");
  const [eEmail, setEEmail] = useState("");
  const [eRolesNeeded, setERolesNeeded] = useState("");
  const [eEhrSystem, setEEhrSystem] = useState("");
  const [eNotes, setENotes] = useState("");
  const [eErrors, setEErrors] = useState<EmployerFormErrors>({});
  const [eSubmitting, setESubmitting] = useState(false);
  const [eSuccess, setESuccess] = useState(false);

  /* --- Validators --- */

  function validateCandidate(): boolean {
    const next: CandidateFormErrors = {};
    if (!cFirstName.trim())
      next.firstName = t(
        { en: "First name is required.", es: "El nombre es obligatorio." },
        locale,
      );
    if (!cLastName.trim())
      next.lastName = t(
        { en: "Last name is required.", es: "El apellido es obligatorio." },
        locale,
      );
    if (!cEmail.trim()) {
      next.email = t(
        {
          en: "Email is required.",
          es: "El correo electrónico es obligatorio.",
        },
        locale,
      );
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cEmail)) {
      next.email = t(
        {
          en: "Please enter a valid email.",
          es: "Ingresa un correo electrónico válido.",
        },
        locale,
      );
    }
    setCErrors(next);
    return Object.keys(next).length === 0;
  }

  function validateEmployer(): boolean {
    const next: EmployerFormErrors = {};
    if (!eOrgName.trim())
      next.orgName = t(
        {
          en: "Organization name is required.",
          es: "El nombre de la organización es obligatorio.",
        },
        locale,
      );
    if (!eContactName.trim())
      next.contactName = t(
        {
          en: "Contact name is required.",
          es: "El nombre de contacto es obligatorio.",
        },
        locale,
      );
    if (!eEmail.trim()) {
      next.email = t(
        {
          en: "Email is required.",
          es: "El correo electrónico es obligatorio.",
        },
        locale,
      );
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eEmail)) {
      next.email = t(
        {
          en: "Please enter a valid email.",
          es: "Ingresa un correo electrónico válido.",
        },
        locale,
      );
    }
    setEErrors(next);
    return Object.keys(next).length === 0;
  }

  /* --- Submit handlers --- */

  async function handleCandidateSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateCandidate()) return;

    setCSubmitting(true);
    try {
      const res = await fetch("/api/drop-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "candidate",
          firstName: cFirstName.trim(),
          lastName: cLastName.trim(),
          email: cEmail.trim().toLowerCase(),
          rolePreference: cRole || undefined,
          region: cRegion || undefined,
          hasAssessment: cHasAssessment,
          locale,
        }),
      });

      if (res.status === 409) {
        toast.error(
          t(
            {
              en: "This email is already registered.",
              es: "Este correo ya est\u00e1 registrado.",
            },
            locale,
          ),
        );
        return;
      }

      if (!res.ok) {
        toast.error(
          t(
            {
              en: "Something went wrong. Please try again.",
              es: "Algo salió mal. Inténtalo de nuevo.",
            },
            locale,
          ),
        );
        return;
      }

      setCSuccess(true);
      toast.success(
        t(
          {
            en: "You're registered! We'll be in touch soon.",
            es: "\u00a1Est\u00e1s registrado/a! Nos comunicaremos pronto.",
          },
          locale,
        ),
      );
    } catch {
      toast.error(
        t(
          {
            en: "Network error. Please check your connection.",
            es: "Error de red. Revisa tu conexión.",
          },
          locale,
        ),
      );
    } finally {
      setCSubmitting(false);
    }
  }

  async function handleEmployerSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateEmployer()) return;

    setESubmitting(true);
    try {
      const res = await fetch("/api/drop-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "employer",
          orgName: eOrgName.trim(),
          contactName: eContactName.trim(),
          email: eEmail.trim().toLowerCase(),
          rolesNeeded: eRolesNeeded.trim() || undefined,
          ehrSystem: eEhrSystem || undefined,
          notes: eNotes.trim() || undefined,
          locale,
        }),
      });

      if (res.status === 409) {
        toast.error(
          t(
            {
              en: "This email is already registered.",
              es: "Este correo ya est\u00e1 registrado.",
            },
            locale,
          ),
        );
        return;
      }

      if (!res.ok) {
        toast.error(
          t(
            {
              en: "Something went wrong. Please try again.",
              es: "Algo salió mal. Inténtalo de nuevo.",
            },
            locale,
          ),
        );
        return;
      }

      setESuccess(true);
      toast.success(
        t(
          {
            en: "You're registered! We'll reach out with your first Drop.",
            es: "\u00a1Est\u00e1s registrado/a! Te contactaremos con tu primer Drop.",
          },
          locale,
        ),
      );
    } catch {
      toast.error(
        t(
          {
            en: "Network error. Please check your connection.",
            es: "Error de red. Revisa tu conexión.",
          },
          locale,
        ),
      );
    } finally {
      setESubmitting(false);
    }
  }

  /* ================================================================ */
  /*  Render                                                           */
  /* ================================================================ */

  return (
    <div className="min-h-screen bg-stone-50">
      {/* ============================================================ */}
      {/*  Section 1: Hero                                              */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-br from-teal-900 via-purple-900 to-teal-800 px-4 py-20 text-center text-white sm:px-6 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/20 px-4 py-1.5 text-sm font-semibold text-amber-300">
            <Zap className="size-4" />
            {t({ en: "Coming Soon", es: "Próximamente" }, locale)}
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            The Drop
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-purple-100/80 sm:text-xl">
            {t(
              {
                en: "Curated batches of pre-assessed FQHC talent, delivered to your inbox.",
                es: "Lotes curados de talento FQHC pre-evaluado, entregados a tu bandeja de entrada.",
              },
              locale,
            )}
          </p>

          <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-3">
            {[
              t({ en: "Pre-Assessed Talent", es: "Talento Pre-Evaluado" }, locale),
              t({ en: "Curated Batches", es: "Lotes Curados" }, locale),
              t({ en: "48-Hour Response", es: "Respuesta en 48 Horas" }, locale),
            ].map((badge) => (
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

      {/* ============================================================ */}
      {/*  Section 2: How It Works                                      */}
      {/* ============================================================ */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-3 text-center text-2xl font-bold text-stone-900 sm:text-3xl">
            {t({ en: "How It Works", es: "Cómo Funciona" }, locale)}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-stone-600">
            {t(
              {
                en: "Three steps from application to introduction. No ghosting, no black holes.",
                es: "Tres pasos desde la solicitud hasta la presentación. Sin ghosting, sin agujeros negros.",
              },
              locale,
            )}
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: 1,
                icon: ClipboardCheck,
                title: t({ en: "Assess", es: "Evaluar" }, locale),
                desc: t(
                  {
                    en: "Candidates take our 5-domain behavioral assessment. Score 60% or higher to qualify for The Drop.",
                    es: "Los candidatos toman nuestra evaluación conductual de 5 dominios. Puntuación de 60% o más para calificar.",
                  },
                  locale,
                ),
                color: "teal",
              },
              {
                step: 2,
                icon: Users,
                title: t({ en: "Match", es: "Emparejar" }, locale),
                desc: t(
                  {
                    en: "We curate batches of 5-10 candidates matched by role, region, EHR system, and program experience.",
                    es: "Curamos lotes de 5-10 candidatos emparejados por rol, región, sistema EHR y experiencia en programas.",
                  },
                  locale,
                ),
                color: "purple",
              },
              {
                step: 3,
                icon: Handshake,
                title: t({ en: "Connect", es: "Conectar" }, locale),
                desc: t(
                  {
                    en: "Facilitated introductions with a 48-hour employer response window. Real people, real conversations.",
                    es: "Presentaciones facilitadas con ventana de respuesta de 48 horas. Personas reales, conversaciones reales.",
                  },
                  locale,
                ),
                color: "amber",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="absolute -top-4 left-1/2 flex size-8 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-purple-600 text-sm font-bold text-white shadow">
                  {item.step}
                </div>
                <div
                  className={`mx-auto mb-4 mt-2 flex size-14 items-center justify-center rounded-2xl ${
                    item.color === "teal"
                      ? "bg-teal-100"
                      : item.color === "purple"
                        ? "bg-purple-100"
                        : "bg-amber-100"
                  }`}
                >
                  <item.icon
                    className={`size-7 ${
                      item.color === "teal"
                        ? "text-teal-700"
                        : item.color === "purple"
                          ? "text-purple-700"
                          : "text-amber-700"
                    }`}
                  />
                </div>
                <h3 className="text-lg font-bold text-stone-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 3: Why It's Different                                */}
      {/* ============================================================ */}
      <section className="bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-3 text-center text-2xl font-bold text-stone-900 sm:text-3xl">
            {t(
              { en: "Why It's Different", es: "Por Qué Es Diferente" },
              locale,
            )}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-stone-600">
            {t(
              {
                en: "The Drop combines the best of job boards, staffing agencies, and FQHC expertise into one program.",
                es: "The Drop combina lo mejor de bolsas de trabajo, agencias de personal y experiencia FQHC en un solo programa.",
              },
              locale,
            )}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b-2 border-stone-200">
                  <th className="px-4 py-3 font-semibold text-stone-500"></th>
                  <th className="px-4 py-3 font-semibold text-stone-500">
                    {t({ en: "Job Board", es: "Bolsa de Trabajo" }, locale)}
                  </th>
                  <th className="px-4 py-3 font-semibold text-stone-500">
                    {t(
                      { en: "Staffing Agency", es: "Agencia de Personal" },
                      locale,
                    )}
                  </th>
                  <th className="rounded-t-xl bg-gradient-to-br from-teal-50 to-purple-50 px-4 py-3 font-bold text-teal-800">
                    The Drop
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    label: t({ en: "Cost", es: "Costo" }, locale),
                    board: t(
                      { en: "$300-500/mo", es: "$300-500/mes" },
                      locale,
                    ),
                    agency: t(
                      { en: "20-30% of salary", es: "20-30% del salario" },
                      locale,
                    ),
                    drop: t(
                      {
                        en: "Flat per-batch fee",
                        es: "Tarifa fija por lote",
                      },
                      locale,
                    ),
                  },
                  {
                    label: t(
                      { en: "Quality Filter", es: "Filtro de Calidad" },
                      locale,
                    ),
                    board: t({ en: "None", es: "Ninguno" }, locale),
                    agency: t(
                      { en: "Resume screen", es: "Revisión de CV" },
                      locale,
                    ),
                    drop: t(
                      {
                        en: "5-domain behavioral assessment",
                        es: "Evaluación conductual de 5 dominios",
                      },
                      locale,
                    ),
                  },
                  {
                    label: t(
                      { en: "Time to Hire", es: "Tiempo de Contratación" },
                      locale,
                    ),
                    board: t(
                      { en: "45-60 days", es: "45-60 días" },
                      locale,
                    ),
                    agency: t(
                      { en: "30-45 days", es: "30-45 días" },
                      locale,
                    ),
                    drop: t(
                      { en: "< 14 days", es: "< 14 días" },
                      locale,
                    ),
                  },
                  {
                    label: t(
                      { en: "FQHC Expertise", es: "Experiencia FQHC" },
                      locale,
                    ),
                    board: t(
                      { en: "Generic", es: "Genérico" },
                      locale,
                    ),
                    agency: t({ en: "Rare", es: "Raro" }, locale),
                    drop: t(
                      { en: "Built for FQHCs", es: "Hecho para FQHCs" },
                      locale,
                    ),
                  },
                  {
                    label: t(
                      {
                        en: "Cultural Fit Data",
                        es: "Datos de Ajuste Cultural",
                      },
                      locale,
                    ),
                    board: t({ en: "No", es: "No" }, locale),
                    agency: t({ en: "No", es: "No" }, locale),
                    drop: t(
                      {
                        en: "Behavioral scores + patterns",
                        es: "Puntuaciones + patrones conductuales",
                      },
                      locale,
                    ),
                  },
                  {
                    label: t({ en: "Risk", es: "Riesgo" }, locale),
                    board: t(
                      {
                        en: "High (unvetted)",
                        es: "Alto (sin verificar)",
                      },
                      locale,
                    ),
                    agency: t(
                      { en: "Medium", es: "Medio" },
                      locale,
                    ),
                    drop: t(
                      {
                        en: "Low (pre-assessed)",
                        es: "Bajo (pre-evaluado)",
                      },
                      locale,
                    ),
                  },
                ].map((row, idx) => (
                  <tr
                    key={idx}
                    className={
                      idx % 2 === 0 ? "bg-stone-50/50" : "bg-white"
                    }
                  >
                    <td className="px-4 py-3 font-medium text-stone-900">
                      {row.label}
                    </td>
                    <td className="px-4 py-3 text-stone-500">{row.board}</td>
                    <td className="px-4 py-3 text-stone-500">{row.agency}</td>
                    <td className="bg-gradient-to-br from-teal-50/80 to-purple-50/80 px-4 py-3 font-semibold text-teal-800">
                      {row.drop}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 4: For Candidates                                    */}
      {/* ============================================================ */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Benefits */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-1.5 text-sm font-semibold text-teal-800">
                <Heart className="size-4" />
                {t(
                  { en: "For Candidates", es: "Para Candidatos" },
                  locale,
                )}
              </div>

              <h2 className="mb-2 text-2xl font-bold text-stone-900 sm:text-3xl">
                {t(
                  {
                    en: "Get Matched, Not Lost in the Pile",
                    es: "Sé Emparejado, No Perdido en la Pila",
                  },
                  locale,
                )}
              </h2>
              <p className="mb-6 text-stone-600">
                {t(
                  {
                    en: "The Drop puts qualified FQHC professionals directly in front of hiring managers. No more applying into the void.",
                    es: "The Drop pone a profesionales FQHC calificados directamente frente a gerentes de contratación. No más solicitudes al vacío.",
                  },
                  locale,
                )}
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: Award,
                    title: t(
                      {
                        en: "Free assessment",
                        es: "Evaluación gratuita",
                      },
                      locale,
                    ),
                    desc: t(
                      {
                        en: "Take our 5-domain behavioral assessment at no cost to discover your strengths.",
                        es: "Toma nuestra evaluación conductual de 5 dominios sin costo para descubrir tus fortalezas.",
                      },
                      locale,
                    ),
                  },
                  {
                    icon: Star,
                    title: t(
                      {
                        en: "Priority access",
                        es: "Acceso prioritario",
                      },
                      locale,
                    ),
                    desc: t(
                      {
                        en: "Qualifying candidates get placed in curated batches ahead of general applicants.",
                        es: "Los candidatos que califican se colocan en lotes curados antes que los solicitantes generales.",
                      },
                      locale,
                    ),
                  },
                  {
                    icon: Target,
                    title: t(
                      {
                        en: "Curated matches",
                        es: "Emparejamientos curados",
                      },
                      locale,
                    ),
                    desc: t(
                      {
                        en: "Matched by role, region, EHR, and program experience — not random job blasts.",
                        es: "Emparejados por rol, región, EHR y experiencia en programas — no envíos masivos aleatorios.",
                      },
                      locale,
                    ),
                  },
                  {
                    icon: UserCheck,
                    title: t(
                      {
                        en: "Career coaching",
                        es: "Orientación profesional",
                      },
                      locale,
                    ),
                    desc: t(
                      {
                        en: "Personalized insights including a 90-day plan and certification recommendations.",
                        es: "Ideas personalizadas incluyendo un plan de 90 días y recomendaciones de certificaciones.",
                      },
                      locale,
                    ),
                  },
                ].map((benefit) => (
                  <div key={benefit.title} className="flex gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal-100">
                      <benefit.icon className="size-5 text-teal-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-stone-900">
                        {benefit.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-stone-600">
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility + CTA */}
            <div className="flex flex-col justify-center">
              <div className="rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50 to-white p-8 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-stone-900">
                  {t(
                    { en: "Eligibility", es: "Elegibilidad" },
                    locale,
                  )}
                </h3>
                <div className="mb-6 rounded-xl bg-white p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-100">
                      <Shield className="size-4 text-teal-700" />
                    </div>
                    <div>
                      <p className="font-medium text-stone-900">
                        {t(
                          {
                            en: "Score 60% or higher",
                            es: "Puntuación de 60% o más",
                          },
                          locale,
                        )}
                      </p>
                      <p className="mt-1 text-sm text-stone-600">
                        {t(
                          {
                            en: "Complete our 5-domain behavioral assessment and score at least 60% to qualify for The Drop.",
                            es: "Completa nuestra evaluación conductual de 5 dominios y obtén al menos 60% para calificar.",
                          },
                          locale,
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-teal-700 to-teal-600 text-white hover:from-teal-800 hover:to-teal-700"
                  size="lg"
                  asChild
                >
                  <Link href="/career-insights">
                    {t(
                      {
                        en: "Take the Assessment",
                        es: "Tomar la Evaluación",
                      },
                      locale,
                    )}
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>

                <p className="mt-3 text-center text-xs text-stone-500">
                  {t(
                    {
                      en: "Free. Takes about 4 minutes. Available in English and Spanish.",
                      es: "Gratis. Toma unos 4 minutos. Disponible en inglés y español.",
                    },
                    locale,
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 5: For Employers                                     */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950 px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* What you receive */}
            <div className="flex flex-col justify-center">
              <div className="rounded-2xl border border-stone-700 bg-stone-800/50 p-8">
                <h3 className="mb-4 text-lg font-bold text-white">
                  {t(
                    {
                      en: "What You Receive in Each Drop",
                      es: "Lo Que Recibes en Cada Drop",
                    },
                    locale,
                  )}
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: BarChart3,
                      label: t(
                        {
                          en: "Domain scores across 5 behavioral areas",
                          es: "Puntuaciones en 5 áreas conductuales",
                        },
                        locale,
                      ),
                    },
                    {
                      icon: Target,
                      label: t(
                        {
                          en: "Behavioral patterns and strengths",
                          es: "Patrones conductuales y fortalezas",
                        },
                        locale,
                      ),
                    },
                    {
                      icon: Award,
                      label: t(
                        {
                          en: "Role fit score and cultural alignment",
                          es: "Puntuación de ajuste al rol y alineación cultural",
                        },
                        locale,
                      ),
                    },
                    {
                      icon: Briefcase,
                      label: t(
                        {
                          en: "EHR experience and program knowledge",
                          es: "Experiencia EHR y conocimiento de programas",
                        },
                        locale,
                      ),
                    },
                    {
                      icon: MapPin,
                      label: t(
                        {
                          en: "Region and availability details",
                          es: "Detalles de región y disponibilidad",
                        },
                        locale,
                      ),
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3"
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20">
                        <item.icon className="size-4 text-amber-400" />
                      </div>
                      <span className="text-sm text-stone-300">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Copy */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-1.5 text-sm font-semibold text-amber-300">
                <Building2 className="size-4" />
                {t(
                  { en: "For Employers", es: "Para Empleadores" },
                  locale,
                )}
              </div>

              <h2 className="mb-2 text-2xl font-bold sm:text-3xl">
                {t(
                  {
                    en: "Stop Guessing. Start Hiring.",
                    es: "Deja de Adivinar. Empieza a Contratar.",
                  },
                  locale,
                )}
              </h2>
              <p className="mb-6 text-stone-400">
                {t(
                  {
                    en: "Every candidate in The Drop has been pre-assessed and matched to your needs. You get behavioral data, not just resumes.",
                    es: "Cada candidato en The Drop ha sido pre-evaluado y emparejado a tus necesidades. Obtienes datos conductuales, no solo currículos.",
                  },
                  locale,
                )}
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: Shield,
                    title: t(
                      {
                        en: "Pre-assessed talent",
                        es: "Talento pre-evaluado",
                      },
                      locale,
                    ),
                    desc: t(
                      {
                        en: "Every candidate scored 60%+ on our behavioral assessment before reaching you.",
                        es: "Cada candidato obtuvo 60%+ en nuestra evaluación conductual antes de llegar a ti.",
                      },
                      locale,
                    ),
                  },
                  {
                    icon: Clock,
                    title: t(
                      {
                        en: "Reduced time-to-hire",
                        es: "Tiempo de contratación reducido",
                      },
                      locale,
                    ),
                    desc: t(
                      {
                        en: "Skip resume screening. Go straight to interviews with qualified, culturally aligned candidates.",
                        es: "Salta la revisión de CV. Ve directo a entrevistas con candidatos calificados y culturalmente alineados.",
                      },
                      locale,
                    ),
                  },
                  {
                    icon: Users,
                    title: t(
                      {
                        en: "Curated batches",
                        es: "Lotes curados",
                      },
                      locale,
                    ),
                    desc: t(
                      {
                        en: "Receive 5-10 matched candidates per Drop, tailored to your roles, region, and EHR system.",
                        es: "Recibe 5-10 candidatos emparejados por Drop, adaptados a tus roles, región y sistema EHR.",
                      },
                      locale,
                    ),
                  },
                ].map((benefit) => (
                  <div key={benefit.title} className="flex gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20">
                      <benefit.icon className="size-5 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        {benefit.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-stone-400">
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                className="mt-8 bg-amber-500 text-stone-900 hover:bg-amber-400"
                size="lg"
                onClick={() =>
                  document
                    .getElementById("employer-waitlist")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {t(
                  { en: "Request Employer Access", es: "Solicitar Acceso de Empleador" },
                  locale,
                )}
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 6: Market Snapshot                                    */}
      {/* ============================================================ */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-3 text-center text-2xl font-bold text-stone-900 sm:text-3xl">
            {t(
              {
                en: "California FQHC Market Snapshot",
                es: "Panorama del Mercado FQHC de California",
              },
              locale,
            )}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-stone-600">
            {t(
              {
                en: "Live data from the FQHC Talent Exchange platform.",
                es: "Datos en vivo de la plataforma FQHC Talent Exchange.",
              },
              locale,
            )}
          </p>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {[
              {
                value: "177+",
                label: t({ en: "Open Jobs", es: "Empleos Abiertos" }, locale),
                icon: Briefcase,
                color: "teal",
              },
              {
                value: "90",
                label: t({ en: "FQHCs in Network", es: "FQHCs en la Red" }, locale),
                icon: Building2,
                color: "purple",
              },
              {
                value: "$55K",
                label: t(
                  { en: "Avg Salary", es: "Salario Promedio" },
                  locale,
                ),
                icon: DollarSign,
                color: "amber",
              },
              {
                value: t(
                  { en: "Los Angeles", es: "Los Ángeles" },
                  locale,
                ),
                label: t(
                  { en: "Top Hiring Region", es: "Región con Más Contratación" },
                  locale,
                ),
                icon: MapPin,
                color: "teal",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-stone-200 bg-white p-6 text-center shadow-sm"
              >
                <div
                  className={`mx-auto mb-3 flex size-12 items-center justify-center rounded-xl ${
                    stat.color === "teal"
                      ? "bg-teal-100"
                      : stat.color === "purple"
                        ? "bg-purple-100"
                        : "bg-amber-100"
                  }`}
                >
                  <stat.icon
                    className={`size-6 ${
                      stat.color === "teal"
                        ? "text-teal-700"
                        : stat.color === "purple"
                          ? "text-purple-700"
                          : "text-amber-700"
                    }`}
                  />
                </div>
                <div className="text-2xl font-extrabold text-stone-900 sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-stone-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 7: Candidate Registration Form                       */}
      {/* ============================================================ */}
      <section className="bg-stone-100 px-4 py-16 sm:px-6" id="candidate-waitlist">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-1.5 text-sm font-semibold text-teal-800">
              <Heart className="size-4" />
              {t(
                { en: "For Candidates", es: "Para Candidatos" },
                locale,
              )}
            </div>
            <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
              {t(
                {
                  en: "Get Notified When The Drop Launches",
                  es: "Recibe Notificaci\u00f3n Cuando The Drop Se Lance",
                },
                locale,
              )}
            </h2>
            <p className="mt-2 text-stone-600">
              {t(
                {
                  en: "Register to be notified when The Drop launches. Early profiles get first access when we launch.",
                  es: "Reg\u00edstrate para ser notificado cuando The Drop se lance. Los perfiles tempranos obtienen primer acceso cuando lancemos.",
                },
                locale,
              )}
            </p>
          </div>

          {cSuccess ? (
            <div className="rounded-2xl border border-teal-200 bg-white p-8 text-center shadow-sm">
              <CheckCircle2 className="mx-auto size-14 text-teal-600" />
              <h3 className="mt-4 text-xl font-bold text-stone-900">
                {t(
                  {
                    en: "You're registered!",
                    es: "\u00a1Est\u00e1s registrado/a!",
                  },
                  locale,
                )}
              </h3>
              <p className="mt-2 text-stone-600">
                {t(
                  {
                    en: "We'll notify you as soon as The Drop launches. In the meantime, take the assessment to qualify.",
                    es: "Te notificaremos tan pronto se lance The Drop. Mientras tanto, toma la evaluaci\u00f3n para calificar.",
                  },
                  locale,
                )}
              </p>
              <Button
                className="mt-6 bg-teal-700 text-white hover:bg-teal-800"
                asChild
              >
                <Link href="/career-insights">
                  {t(
                    {
                      en: "Take the Assessment",
                      es: "Tomar la Evaluación",
                    },
                    locale,
                  )}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleCandidateSubmit}
              noValidate
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="c-firstName">
                    {t({ en: "First Name", es: "Nombre" }, locale)}{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="c-firstName"
                    value={cFirstName}
                    onChange={(e) => setCFirstName(e.target.value)}
                    placeholder="Maria"
                    className="mt-1.5"
                    aria-invalid={!!cErrors.firstName}
                  />
                  {cErrors.firstName && (
                    <p className="mt-1 text-xs text-red-500">
                      {cErrors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="c-lastName">
                    {t({ en: "Last Name", es: "Apellido" }, locale)}{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="c-lastName"
                    value={cLastName}
                    onChange={(e) => setCLastName(e.target.value)}
                    placeholder="Garcia"
                    className="mt-1.5"
                    aria-invalid={!!cErrors.lastName}
                  />
                  {cErrors.lastName && (
                    <p className="mt-1 text-xs text-red-500">
                      {cErrors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="c-email">
                  {t({ en: "Email", es: "Correo Electrónico" }, locale)}{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="c-email"
                  type="email"
                  value={cEmail}
                  onChange={(e) => setCEmail(e.target.value)}
                  placeholder="maria@example.com"
                  className="mt-1.5"
                  aria-invalid={!!cErrors.email}
                />
                {cErrors.email && (
                  <p className="mt-1 text-xs text-red-500">{cErrors.email}</p>
                )}
              </div>

              <div className="mt-4">
                <Label htmlFor="c-role">
                  {t(
                    {
                      en: "Preferred Role",
                      es: "Rol Preferido",
                    },
                    locale,
                  )}
                </Label>
                <Select value={cRole} onValueChange={setCRole}>
                  <SelectTrigger className="mt-1.5 w-full">
                    <SelectValue
                      placeholder={t(
                        { en: "Select a role", es: "Selecciona un rol" },
                        locale,
                      )}
                    />
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

              <div className="mt-4">
                <Label htmlFor="c-region">
                  {t({ en: "Region", es: "Región" }, locale)}
                </Label>
                <Select value={cRegion} onValueChange={setCRegion}>
                  <SelectTrigger className="mt-1.5 w-full">
                    <SelectValue
                      placeholder={t(
                        {
                          en: "Select a region",
                          es: "Selecciona una región",
                        },
                        locale,
                      )}
                    />
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

              <div className="mt-5">
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-stone-700">
                  <input
                    type="checkbox"
                    checked={cHasAssessment}
                    onChange={(e) => setCHasAssessment(e.target.checked)}
                    className="size-4 rounded border-stone-300 text-teal-700 focus:ring-teal-500"
                  />
                  {t(
                    {
                      en: "I've already taken the career assessment",
                      es: "Ya tomé la evaluación de carrera",
                    },
                    locale,
                  )}
                </label>
              </div>

              <Button
                type="submit"
                disabled={cSubmitting}
                className="mt-6 h-12 w-full bg-gradient-to-r from-teal-700 to-teal-600 text-base font-semibold text-white hover:from-teal-800 hover:to-teal-700"
              >
                {cSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    {t(
                      { en: "Submitting...", es: "Enviando..." },
                      locale,
                    )}
                  </>
                ) : (
                  <>
                    <Heart className="size-4" />
                    {t(
                      {
                        en: "Create Candidate Profile",
                        es: "Crear Perfil de Candidato",
                      },
                      locale,
                    )}
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Section 8: Employer Registration Form                        */}
      {/* ============================================================ */}
      <section
        className="bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950 px-4 py-16 sm:px-6"
        id="employer-waitlist"
      >
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-1.5 text-sm font-semibold text-amber-300">
              <Building2 className="size-4" />
              {t(
                { en: "For Employers", es: "Para Empleadores" },
                locale,
              )}
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              {t(
                {
                  en: "Get Early Access to The Drop",
                  es: "Obtén Acceso Anticipado a The Drop",
                },
                locale,
              )}
            </h2>
            <p className="mt-2 text-stone-400">
              {t(
                {
                  en: "Be among the first FQHCs to receive curated, pre-assessed candidate batches.",
                  es: "Sé de los primeros FQHCs en recibir lotes curados de candidatos pre-evaluados.",
                },
                locale,
              )}
            </p>
          </div>

          {eSuccess ? (
            <div className="rounded-2xl border border-stone-700 bg-stone-800/80 p-8 text-center">
              <CheckCircle2 className="mx-auto size-14 text-amber-400" />
              <h3 className="mt-4 text-xl font-bold text-white">
                {t(
                  {
                    en: "You're registered!",
                    es: "\u00a1Est\u00e1s registrado/a!",
                  },
                  locale,
                )}
              </h3>
              <p className="mt-2 text-stone-400">
                {t(
                  {
                    en: "We'll reach out with your first Drop as soon as we launch. Expect curated, pre-assessed candidates matched to your needs.",
                    es: "Te contactaremos con tu primer Drop tan pronto lancemos. Espera candidatos curados y pre-evaluados emparejados a tus necesidades.",
                  },
                  locale,
                )}
              </p>
              <Button
                className="mt-6 bg-amber-500 text-stone-900 hover:bg-amber-400"
                asChild
              >
                <Link href="/demo">
                  {t(
                    {
                      en: "Explore the Platform",
                      es: "Explorar la Plataforma",
                    },
                    locale,
                  )}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleEmployerSubmit}
              noValidate
              className="rounded-2xl border border-stone-700 bg-stone-800/60 p-6 shadow-sm sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label
                    htmlFor="e-orgName"
                    className="text-stone-300"
                  >
                    {t(
                      {
                        en: "Organization Name",
                        es: "Nombre de la Organización",
                      },
                      locale,
                    )}{" "}
                    <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="e-orgName"
                    value={eOrgName}
                    onChange={(e) => setEOrgName(e.target.value)}
                    placeholder={t(
                      {
                        en: "e.g. AltaMed Health Services",
                        es: "ej. AltaMed Health Services",
                      },
                      locale,
                    )}
                    className="mt-1.5 border-stone-600 bg-stone-700/50 text-white placeholder:text-stone-500"
                    aria-invalid={!!eErrors.orgName}
                  />
                  {eErrors.orgName && (
                    <p className="mt-1 text-xs text-red-400">
                      {eErrors.orgName}
                    </p>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="e-contactName"
                    className="text-stone-300"
                  >
                    {t(
                      { en: "Contact Name", es: "Nombre de Contacto" },
                      locale,
                    )}{" "}
                    <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="e-contactName"
                    value={eContactName}
                    onChange={(e) => setEContactName(e.target.value)}
                    placeholder="Jane Smith"
                    className="mt-1.5 border-stone-600 bg-stone-700/50 text-white placeholder:text-stone-500"
                    aria-invalid={!!eErrors.contactName}
                  />
                  {eErrors.contactName && (
                    <p className="mt-1 text-xs text-red-400">
                      {eErrors.contactName}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="e-email" className="text-stone-300">
                  {t({ en: "Email", es: "Correo Electrónico" }, locale)}{" "}
                  <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="e-email"
                  type="email"
                  value={eEmail}
                  onChange={(e) => setEEmail(e.target.value)}
                  placeholder="hr@yourfqhc.org"
                  className="mt-1.5 border-stone-600 bg-stone-700/50 text-white placeholder:text-stone-500"
                  aria-invalid={!!eErrors.email}
                />
                {eErrors.email && (
                  <p className="mt-1 text-xs text-red-400">{eErrors.email}</p>
                )}
              </div>

              <div className="mt-4">
                <Label htmlFor="e-roles" className="text-stone-300">
                  {t(
                    {
                      en: "Roles Needed",
                      es: "Roles Necesarios",
                    },
                    locale,
                  )}
                </Label>
                <Input
                  id="e-roles"
                  value={eRolesNeeded}
                  onChange={(e) => setERolesNeeded(e.target.value)}
                  placeholder={t(
                    {
                      en: "e.g. 2 CHWs, 1 Care Coordinator, 1 RN",
                      es: "ej. 2 CHWs, 1 Coordinador de Cuidado, 1 RN",
                    },
                    locale,
                  )}
                  className="mt-1.5 border-stone-600 bg-stone-700/50 text-white placeholder:text-stone-500"
                />
              </div>

              <div className="mt-4">
                <Label htmlFor="e-ehr" className="text-stone-300">
                  {t(
                    { en: "EHR System", es: "Sistema EHR" },
                    locale,
                  )}
                </Label>
                <Select value={eEhrSystem} onValueChange={setEEhrSystem}>
                  <SelectTrigger className="mt-1.5 w-full border-stone-600 bg-stone-700/50 text-white">
                    <SelectValue
                      placeholder={t(
                        {
                          en: "Select your EHR",
                          es: "Selecciona tu EHR",
                        },
                        locale,
                      )}
                    />
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

              <div className="mt-4">
                <Label htmlFor="e-notes" className="text-stone-300">
                  {t(
                    { en: "Additional Notes", es: "Notas Adicionales" },
                    locale,
                  )}{" "}
                  <span className="font-normal text-stone-500">
                    ({t({ en: "optional", es: "opcional" }, locale)})
                  </span>
                </Label>
                <Textarea
                  id="e-notes"
                  value={eNotes}
                  onChange={(e) => setENotes(e.target.value)}
                  placeholder={t(
                    {
                      en: "Tell us about your hiring needs, timeline, or any specifics...",
                      es: "Cuéntanos sobre tus necesidades de contratación, plazos, o detalles específicos...",
                    },
                    locale,
                  )}
                  rows={3}
                  className="mt-1.5 border-stone-600 bg-stone-700/50 text-white placeholder:text-stone-500"
                  maxLength={500}
                />
              </div>

              <Button
                type="submit"
                disabled={eSubmitting}
                className="mt-6 h-12 w-full bg-amber-500 text-base font-semibold text-stone-900 hover:bg-amber-400"
              >
                {eSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    {t(
                      { en: "Submitting...", es: "Enviando..." },
                      locale,
                    )}
                  </>
                ) : (
                  <>
                    <Building2 className="size-4" />
                    {t(
                      {
                        en: "Request Employer Access",
                        es: "Solicitar Acceso de Empleador",
                      },
                      locale,
                    )}
                  </>
                )}
              </Button>
            </form>
          )}

          {/* Cross-links */}
          <div className="mt-8 text-center text-sm text-stone-500">
            {t(
              {
                en: "Looking for a job?",
                es: "¿Buscas trabajo?",
              },
              locale,
            )}{" "}
            <Link
              href="/join"
              className="font-medium text-amber-400 underline hover:text-amber-300"
            >
              {t(
                {
                  en: "Join our talent network",
                  es: "Únete a nuestra red de talento",
                },
                locale,
              )}{" "}
              →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
