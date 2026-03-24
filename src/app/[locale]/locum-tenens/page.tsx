"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import { trackLocumProviderSignup, trackLocumFQHCRequest } from "@/lib/analytics";
import {
  Heart,
  Calendar,
  CircleDollarSign,
  GraduationCap,
  Users,
  ArrowRightLeft,
  PiggyBank,
  HeartHandshake,
  Monitor,
  RefreshCw,
  FileCheck,
  MapPin,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  TrendingUp,
  Calculator,
  CheckCircle2,
  Building2,
  UserPlus,
  Search,
  Handshake,
} from "lucide-react";
import {
  PROVIDER_TYPES,
  COVERAGE_SCENARIOS,
  PROVIDER_BENEFITS,
  FQHC_BENEFITS,
  LOCUM_FAQ,
  MARKET_STATS,
  calculateCoverageCost,
  CA_REGIONS,
  EHR_SYSTEMS,
  LOCUM_LAST_UPDATED,
} from "@/lib/locum-tenens-data";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

const fmt = (n: number) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(1)}M`
    : `$${Math.round(n).toLocaleString()}`;

const BENEFIT_ICONS: Record<string, React.ElementType> = {
  Heart,
  Calendar,
  CircleDollarSign,
  GraduationCap,
  Users,
  ArrowRightLeft,
  PiggyBank,
  HeartHandshake,
  Monitor,
  RefreshCw,
  FileCheck,
  MapPin,
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function LocumTenensPage() {
  const locale = useLocale();
  const isEs = locale === "es";

  // Calculator state
  const [calcProvider, setCalcProvider] = useState("np");
  const [calcDays, setCalcDays] = useState(10);
  const [calcHours, setCalcHours] = useState(8);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Provider form state
  const [providerForm, setProviderForm] = useState({
    name: "",
    email: "",
    role: "np",
    licenseNumber: "",
    availableDays: "1-2",
    region: "la",
    ehrExperience: [] as string[],
  });
  const [providerSubmitting, setProviderSubmitting] = useState(false);
  const [providerSubmitted, setProviderSubmitted] = useState(false);

  // FQHC form state
  const [fqhcForm, setFqhcForm] = useState({
    orgName: "",
    contactName: "",
    contactEmail: "",
    providerType: "np",
    startDate: "",
    endDate: "",
    hoursPerDay: "8",
    ehrSystem: "",
    requirements: "",
  });
  const [fqhcSubmitting, setFqhcSubmitting] = useState(false);
  const [fqhcSubmitted, setFqhcSubmitted] = useState(false);

  // Calculator results
  const calcResults = useMemo(
    () => calculateCoverageCost(calcProvider, calcDays, calcHours),
    [calcProvider, calcDays, calcHours]
  );

  const handleProviderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProviderSubmitting(true);
    try {
      const res = await fetch("/api/locum-providers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(providerForm),
      });
      if (res.ok) {
        setProviderSubmitted(true);
        trackLocumProviderSignup();
      }
    } catch {
      // silent
    } finally {
      setProviderSubmitting(false);
    }
  };

  const handleFqhcSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFqhcSubmitting(true);
    try {
      const res = await fetch("/api/locum-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fqhcForm),
      });
      if (res.ok) {
        setFqhcSubmitted(true);
        trackLocumFQHCRequest();
      }
    } catch {
      // silent
    } finally {
      setFqhcSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-stone-50">
      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-stone-900 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-700/50 px-4 py-1.5 text-sm font-medium text-teal-100">
            <Stethoscope className="size-4" />
            {isEs ? "Próximamente — Únase a la Red" : "Coming Soon — Join the Network"}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {isEs
              ? "Cobertura de Proveedores a Tarifa FQHC"
              : "FQHC-Rate Provider Coverage"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-teal-100">
            {isEs
              ? "Proveedores temporales comprometidos con la misión a tarifas que los FQHCs pueden pagar. Sin markup de agencia. Licenciados en California."
              : "Mission-driven temporary providers at rates FQHCs can afford. No agency markup. California-licensed."}
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">40-60%</div>
              <div className="text-xs text-teal-200">
                {isEs ? "Ahorro vs agencia" : "Savings vs agency"}
              </div>
            </div>
            <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">$0</div>
              <div className="text-xs text-teal-200">
                {isEs ? "Costo de la plataforma" : "Platform cost"}
              </div>
            </div>
            <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">CA</div>
              <div className="text-xs text-teal-200">
                {isEs ? "Proveedores licenciados" : "Licensed providers"}
              </div>
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-xl text-xs text-teal-300/70">
            {isEs
              ? "Plataforma de coincidencia gratuita. No somos una agencia de empleo. Los proveedores contratan directamente con los FQHCs."
              : "Free matching platform. We are not an employment agency. Providers contract directly with FQHCs."}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* ============================================================ */}
        {/*  THE PROBLEM                                                  */}
        {/* ============================================================ */}
        <section className="mb-16">
          <div className="mb-6 flex items-center gap-2">
            <AlertTriangle className="size-5 text-amber-600" />
            <h2 className="text-2xl font-bold text-stone-900">
              {isEs ? "El Problema" : "The Problem"}
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Agency model */}
            <div className="rounded-xl border-2 border-red-200 bg-red-50 p-6">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                <CircleDollarSign className="size-3" />
                {isEs ? "Modelo de Agencia" : "Agency Model"}
              </div>
              <div className="mb-2 text-3xl font-bold text-red-700">$200-350<span className="text-lg">/hr</span></div>
              <p className="text-sm text-red-600">
                {isEs
                  ? "Lo que las agencias cobran a los FQHCs por un médico. Markup del 30-60% sobre la tarifa del proveedor. Contratos mínimos. Costos de viaje. Tarifas administrativas."
                  : "What agencies charge FQHCs for a physician. 30-60% markup over provider rate. Minimum contracts. Travel costs. Administrative fees."}
              </p>
              <div className="mt-3 border-t border-red-200 pt-3">
                <p className="text-xs text-red-500">
                  {isEs
                    ? "2 semanas de cobertura NP = $12,000-$21,000"
                    : "2-week NP coverage = $12,000-$21,000"}
                </p>
              </div>
            </div>

            {/* Direct model */}
            <div className="rounded-xl border-2 border-teal-200 bg-teal-50 p-6">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">
                <Heart className="size-3" />
                {isEs ? "Tarifa FQHC Directa" : "Direct FQHC Rate"}
              </div>
              <div className="mb-2 text-3xl font-bold text-teal-700">$130-200<span className="text-lg">/hr</span></div>
              <p className="text-sm text-teal-600">
                {isEs
                  ? "Lo que paga conectándose directamente con proveedores comprometidos con la misión. Sin markup. Sin intermediario. Misma calidad de atención."
                  : "What you pay connecting directly with mission-driven providers. No markup. No middleman. Same quality of care."}
              </p>
              <div className="mt-3 border-t border-teal-200 pt-3">
                <p className="text-xs text-teal-500">
                  {isEs
                    ? "2 semanas de cobertura NP = $6,000-$8,000"
                    : "2-week NP coverage = $6,000-$8,000"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  COST CALCULATOR                                              */}
        {/* ============================================================ */}
        <section className="mb-16">
          <div className="mb-6 flex items-center gap-2">
            <Calculator className="size-5 text-teal-600" />
            <h2 className="text-2xl font-bold text-stone-900">
              {isEs ? "Calculadora de Costos" : "Cost Calculator"}
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
            <div className="bg-gradient-to-r from-stone-900 to-stone-800 px-6 py-4 text-white">
              <h3 className="font-semibold">
                {isEs
                  ? "Compare: Agencia vs Tarifa FQHC"
                  : "Compare: Agency vs FQHC Rate"}
              </h3>
            </div>

            <div className="p-6">
              {/* Inputs */}
              <div className="mb-6 grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                    {isEs ? "Tipo de Proveedor" : "Provider Type"}
                  </label>
                  <select
                    value={calcProvider}
                    onChange={(e) => setCalcProvider(e.target.value)}
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
                  >
                    {PROVIDER_TYPES.map((p) => (
                      <option key={p.id} value={p.id}>
                        {t(p.label, locale)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                    {isEs ? "Días de Cobertura" : "Coverage Days"}
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={90}
                    value={calcDays}
                    onChange={(e) => setCalcDays(Number(e.target.value))}
                    className="mt-1 w-full accent-teal-600"
                  />
                  <div className="text-right text-sm font-medium text-stone-700">
                    {calcDays} {isEs ? "días" : "days"}
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                    {isEs ? "Horas por Día" : "Hours per Day"}
                  </label>
                  <input
                    type="range"
                    min={4}
                    max={10}
                    value={calcHours}
                    onChange={(e) => setCalcHours(Number(e.target.value))}
                    className="mt-1 w-full accent-teal-600"
                  />
                  <div className="text-right text-sm font-medium text-stone-700">
                    {calcHours} {isEs ? "hrs" : "hrs"}
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="grid gap-4 sm:grid-cols-3">
                {/* Agency cost */}
                <div className="rounded-xl bg-red-50 p-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-red-500">
                    {isEs ? "Costo Agencia" : "Agency Cost"}
                  </p>
                  <p className="text-2xl font-bold text-red-700">
                    {fmt(calcResults.agencyCost.low)}-{fmt(calcResults.agencyCost.high)}
                  </p>
                  <div className="mt-2 h-2 rounded-full bg-red-200">
                    <div
                      className="h-full rounded-full bg-red-500 transition-all"
                      style={{
                        width: `${Math.min(100, (calcResults.agencyCost.high / (calcResults.agencyCost.high + 1000)) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* FQHC rate */}
                <div className="rounded-xl bg-teal-50 p-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-teal-500">
                    {isEs ? "Tarifa FQHC" : "FQHC Rate"}
                  </p>
                  <p className="text-2xl font-bold text-teal-700">
                    {fmt(calcResults.directCost.low)}-{fmt(calcResults.directCost.high)}
                  </p>
                  <div className="mt-2 h-2 rounded-full bg-teal-200">
                    <div
                      className="h-full rounded-full bg-teal-500 transition-all"
                      style={{
                        width: `${Math.min(100, (calcResults.directCost.high / (calcResults.agencyCost.high + 1000)) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Savings */}
                <div className="rounded-xl bg-green-50 p-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-green-600">
                    {isEs ? "Ahorro" : "Savings"}
                  </p>
                  <p className="text-2xl font-bold text-green-700">
                    {fmt(calcResults.savings.low)}-{fmt(calcResults.savings.high)}
                  </p>
                  <p className="mt-1 text-xs text-green-600">
                    {calcResults.savingsPercent.low}-{calcResults.savingsPercent.high}%{" "}
                    {isEs ? "menos" : "less"}
                  </p>
                </div>
              </div>

              {/* Revenue context */}
              <div className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                <TrendingUp className="mr-1 inline size-4" />
                {isEs
                  ? `Esta cobertura generaría ~${fmt(calcResults.revenueGenerated)} en ingresos PPS (a $${MARKET_STATS.ppsRateAvg}/encuentro).`
                  : `This coverage would generate ~${fmt(calcResults.revenueGenerated)} in PPS revenue (at $${MARKET_STATS.ppsRateAvg}/encounter).`}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  COVERAGE SCENARIOS                                           */}
        {/* ============================================================ */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-stone-900">
            {isEs ? "Escenarios de Cobertura" : "Coverage Scenarios"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {COVERAGE_SCENARIOS.map((scenario) => {
              const provider = PROVIDER_TYPES.find(
                (p) => p.id === scenario.providerTypeId
              );
              return (
                <div
                  key={scenario.id}
                  className="rounded-xl border border-stone-200 bg-white p-5"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-semibold text-stone-900">
                      {t(scenario.name, locale)}
                    </h3>
                    <span className="rounded-full bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-700">
                      {provider ? t(provider.label, locale) : ""}
                    </span>
                  </div>
                  <p className="mb-3 text-sm text-stone-600">
                    {t(scenario.description, locale)}
                  </p>
                  <div className="flex items-end justify-between border-t border-stone-100 pt-3">
                    <div>
                      <p className="text-xs text-stone-500">
                        {isEs ? "Agencia" : "Agency"}
                      </p>
                      <p className="text-sm font-medium text-red-600 line-through">
                        {fmt(scenario.agencyCost)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-stone-500">
                        {isEs ? "Tarifa FQHC" : "FQHC Rate"}
                      </p>
                      <p className="text-sm font-bold text-teal-700">
                        {fmt(scenario.directCost)}
                      </p>
                    </div>
                    <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
                      {isEs ? "Ahorra" : "Save"} {fmt(scenario.savings)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  HOW IT WORKS                                                 */}
        {/* ============================================================ */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-stone-900">
            {isEs ? "Cómo Funciona" : "How It Works"}
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                step: 1,
                icon: UserPlus,
                title: { en: "Post Your Need", es: "Publique Su Necesidad" },
                desc: {
                  en: "FQHCs submit a coverage request with dates, provider type, EHR system, and any special requirements.",
                  es: "Los FQHCs envían una solicitud de cobertura con fechas, tipo de proveedor, sistema EHR y requisitos especiales.",
                },
              },
              {
                step: 2,
                icon: Search,
                title: { en: "We Match", es: "Hacemos la Coincidencia" },
                desc: {
                  en: "We match you with CA-licensed, FQHC-experienced providers based on role, region, EHR, and availability.",
                  es: "Los conectamos con proveedores licenciados en CA con experiencia FQHC basándose en rol, región, EHR y disponibilidad.",
                },
              },
              {
                step: 3,
                icon: Handshake,
                title: { en: "Provider Starts", es: "El Proveedor Comienza" },
                desc: {
                  en: "You contract directly with the provider at FQHC rates. They credential at your site and start seeing patients.",
                  es: "Usted contrata directamente con el proveedor a tarifas FQHC. Se credencializan en su sitio y comienzan a ver pacientes.",
                },
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="relative rounded-xl border border-stone-200 bg-white p-6 text-center"
                >
                  <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-teal-100">
                    <Icon className="size-6 text-teal-700" />
                  </div>
                  <div className="absolute -top-3 left-4 rounded-full bg-teal-700 px-2.5 py-0.5 text-xs font-bold text-white">
                    {item.step}
                  </div>
                  <h3 className="mb-2 font-semibold text-stone-900">
                    {t(item.title, locale)}
                  </h3>
                  <p className="text-sm text-stone-600">{t(item.desc, locale)}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  FOR PROVIDERS                                                */}
        {/* ============================================================ */}
        <section className="mb-16" id="providers">
          <div className="mb-6 flex items-center gap-2">
            <Stethoscope className="size-5 text-teal-600" />
            <h2 className="text-2xl font-bold text-stone-900">
              {isEs ? "Para Proveedores" : "For Providers"}
            </h2>
          </div>

          {/* Benefits */}
          <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PROVIDER_BENEFITS.map((b) => {
              const Icon = BENEFIT_ICONS[b.iconName] ?? Heart;
              return (
                <div
                  key={b.id}
                  className="flex gap-3 rounded-xl border border-stone-200 bg-white p-4"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-teal-100">
                    <Icon className="size-4 text-teal-700" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-stone-900">
                      {t(b.title, locale)}
                    </h3>
                    <p className="mt-0.5 text-xs text-stone-500">
                      {t(b.description, locale)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Provider Form */}
          {providerSubmitted ? (
            <div className="rounded-xl border border-teal-200 bg-teal-50 p-6 text-center">
              <CheckCircle2 className="mx-auto mb-2 size-8 text-teal-600" />
              <h3 className="font-semibold text-teal-800">
                {isEs ? "¡Gracias por unirse!" : "Thank you for joining!"}
              </h3>
              <p className="mt-1 text-sm text-teal-600">
                {isEs
                  ? "Le notificaremos cuando haya oportunidades de cobertura que coincidan con su perfil."
                  : "We'll notify you when coverage opportunities match your profile."}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleProviderSubmit}
              className="rounded-xl border border-stone-200 bg-white p-6"
            >
              <h3 className="mb-4 font-semibold text-stone-900">
                {isEs ? "Únase a la Red de Proveedores" : "Join the Provider Network"}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-stone-600">
                    {isEs ? "Nombre completo" : "Full name"} *
                  </label>
                  <input
                    type="text"
                    required
                    value={providerForm.name}
                    onChange={(e) =>
                      setProviderForm({ ...providerForm, name: e.target.value })
                    }
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-stone-600">
                    {isEs ? "Correo electrónico" : "Email"} *
                  </label>
                  <input
                    type="email"
                    required
                    value={providerForm.email}
                    onChange={(e) =>
                      setProviderForm({ ...providerForm, email: e.target.value })
                    }
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-stone-600">
                    {isEs ? "Rol" : "Role"} *
                  </label>
                  <select
                    required
                    value={providerForm.role}
                    onChange={(e) =>
                      setProviderForm({ ...providerForm, role: e.target.value })
                    }
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
                  >
                    {PROVIDER_TYPES.map((p) => (
                      <option key={p.id} value={p.id}>
                        {t(p.label, locale)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-stone-600">
                    {isEs ? "Número de licencia CA" : "CA License #"}
                  </label>
                  <input
                    type="text"
                    value={providerForm.licenseNumber}
                    onChange={(e) =>
                      setProviderForm({
                        ...providerForm,
                        licenseNumber: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
                    placeholder={isEs ? "Opcional" : "Optional"}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-stone-600">
                    {isEs ? "Disponibilidad" : "Availability"}
                  </label>
                  <select
                    value={providerForm.availableDays}
                    onChange={(e) =>
                      setProviderForm({
                        ...providerForm,
                        availableDays: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
                  >
                    <option value="1-2">1-2 {isEs ? "días/semana" : "days/week"}</option>
                    <option value="3-4">3-4 {isEs ? "días/semana" : "days/week"}</option>
                    <option value="5">
                      {isEs ? "Tiempo completo temporal" : "Full-time temporary"}
                    </option>
                    <option value="flexible">{isEs ? "Flexible" : "Flexible"}</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-stone-600">
                    {isEs ? "Región preferida" : "Preferred region"}
                  </label>
                  <select
                    value={providerForm.region}
                    onChange={(e) =>
                      setProviderForm({ ...providerForm, region: e.target.value })
                    }
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
                  >
                    {CA_REGIONS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {t(r.label, locale)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="mt-4 text-xs text-stone-500 leading-relaxed">
                {isEs
                  ? "Al enviar este formulario, aceptas que tu información de contacto y experiencia profesional será almacenada para conectarte con oportunidades de locum tenens. No compartimos tus datos con terceros sin tu consentimiento."
                  : "By submitting, you agree that your contact information and professional experience will be stored to connect you with locum tenens opportunities. We do not share your data with third parties without your consent."}
              </p>
              <button
                type="submit"
                disabled={providerSubmitting}
                className="mt-3 w-full rounded-lg bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-800 disabled:opacity-50 sm:w-auto"
              >
                {providerSubmitting
                  ? isEs
                    ? "Enviando..."
                    : "Submitting..."
                  : isEs
                    ? "Unirme a la Red"
                    : "Join the Network"}
              </button>
            </form>
          )}
        </section>

        {/* ============================================================ */}
        {/*  FOR FQHCs                                                    */}
        {/* ============================================================ */}
        <section className="mb-16" id="fqhcs">
          <div className="mb-6 flex items-center gap-2">
            <Building2 className="size-5 text-stone-700" />
            <h2 className="text-2xl font-bold text-stone-900">
              {isEs ? "Para FQHCs" : "For FQHCs"}
            </h2>
          </div>

          {/* Benefits */}
          <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {FQHC_BENEFITS.map((b) => {
              const Icon = BENEFIT_ICONS[b.iconName] ?? Heart;
              return (
                <div
                  key={b.id}
                  className="flex gap-3 rounded-xl border border-stone-200 bg-white p-4"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-stone-100">
                    <Icon className="size-4 text-stone-700" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-stone-900">
                      {t(b.title, locale)}
                    </h3>
                    <p className="mt-0.5 text-xs text-stone-500">
                      {t(b.description, locale)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FQHC Form */}
          {fqhcSubmitted ? (
            <div className="rounded-xl border border-teal-200 bg-teal-50 p-6 text-center">
              <CheckCircle2 className="mx-auto mb-2 size-8 text-teal-600" />
              <h3 className="font-semibold text-teal-800">
                {isEs ? "¡Solicitud recibida!" : "Request received!"}
              </h3>
              <p className="mt-1 text-sm text-teal-600">
                {isEs
                  ? "Revisaremos su solicitud y le responderemos dentro de 48 horas."
                  : "We'll review your request and get back to you within 48 hours."}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleFqhcSubmit}
              className="rounded-xl border border-stone-200 bg-gradient-to-br from-stone-900 to-stone-800 p-6 text-white"
            >
              <h3 className="mb-4 font-semibold">
                {isEs ? "Solicitar Cobertura" : "Request Coverage"}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-stone-300">
                    {isEs ? "Nombre de la organización" : "Organization name"} *
                  </label>
                  <input
                    type="text"
                    required
                    value={fqhcForm.orgName}
                    onChange={(e) =>
                      setFqhcForm({ ...fqhcForm, orgName: e.target.value })
                    }
                    className="w-full rounded-lg border border-stone-600 bg-stone-800 px-3 py-2 text-sm text-white placeholder-stone-400"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-stone-300">
                    {isEs ? "Nombre de contacto" : "Contact name"} *
                  </label>
                  <input
                    type="text"
                    required
                    value={fqhcForm.contactName}
                    onChange={(e) =>
                      setFqhcForm({ ...fqhcForm, contactName: e.target.value })
                    }
                    className="w-full rounded-lg border border-stone-600 bg-stone-800 px-3 py-2 text-sm text-white placeholder-stone-400"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-stone-300">
                    {isEs ? "Correo electrónico" : "Email"} *
                  </label>
                  <input
                    type="email"
                    required
                    value={fqhcForm.contactEmail}
                    onChange={(e) =>
                      setFqhcForm({ ...fqhcForm, contactEmail: e.target.value })
                    }
                    className="w-full rounded-lg border border-stone-600 bg-stone-800 px-3 py-2 text-sm text-white placeholder-stone-400"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-stone-300">
                    {isEs ? "Tipo de proveedor necesario" : "Provider type needed"} *
                  </label>
                  <select
                    required
                    value={fqhcForm.providerType}
                    onChange={(e) =>
                      setFqhcForm({ ...fqhcForm, providerType: e.target.value })
                    }
                    className="w-full rounded-lg border border-stone-600 bg-stone-800 px-3 py-2 text-sm text-white"
                  >
                    {PROVIDER_TYPES.map((p) => (
                      <option key={p.id} value={p.id}>
                        {t(p.label, locale)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-stone-300">
                    {isEs ? "Fecha de inicio" : "Start date"}
                  </label>
                  <input
                    type="date"
                    value={fqhcForm.startDate}
                    onChange={(e) =>
                      setFqhcForm({ ...fqhcForm, startDate: e.target.value })
                    }
                    className="w-full rounded-lg border border-stone-600 bg-stone-800 px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-stone-300">
                    {isEs ? "Fecha de fin" : "End date"}
                  </label>
                  <input
                    type="date"
                    value={fqhcForm.endDate}
                    onChange={(e) =>
                      setFqhcForm({ ...fqhcForm, endDate: e.target.value })
                    }
                    className="w-full rounded-lg border border-stone-600 bg-stone-800 px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-stone-300">
                    {isEs ? "Sistema EHR" : "EHR System"}
                  </label>
                  <select
                    value={fqhcForm.ehrSystem}
                    onChange={(e) =>
                      setFqhcForm({ ...fqhcForm, ehrSystem: e.target.value })
                    }
                    className="w-full rounded-lg border border-stone-600 bg-stone-800 px-3 py-2 text-sm text-white"
                  >
                    <option value="">{isEs ? "Seleccionar" : "Select"}</option>
                    {EHR_SYSTEMS.map((ehr) => (
                      <option key={ehr} value={ehr}>
                        {ehr}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-stone-300">
                    {isEs ? "Horas por día" : "Hours per day"}
                  </label>
                  <select
                    value={fqhcForm.hoursPerDay}
                    onChange={(e) =>
                      setFqhcForm({ ...fqhcForm, hoursPerDay: e.target.value })
                    }
                    className="w-full rounded-lg border border-stone-600 bg-stone-800 px-3 py-2 text-sm text-white"
                  >
                    {[4, 6, 8, 10].map((h) => (
                      <option key={h} value={String(h)}>
                        {h} {isEs ? "horas" : "hours"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-1 block text-xs font-medium text-stone-300">
                  {isEs ? "Requisitos especiales" : "Special requirements"}
                </label>
                <textarea
                  value={fqhcForm.requirements}
                  onChange={(e) =>
                    setFqhcForm({ ...fqhcForm, requirements: e.target.value })
                  }
                  rows={3}
                  className="w-full rounded-lg border border-stone-600 bg-stone-800 px-3 py-2 text-sm text-white placeholder-stone-400"
                  placeholder={
                    isEs
                      ? "Ej: Bilingüe español/inglés, experiencia pediátrica..."
                      : "E.g., Bilingual Spanish/English, pediatric experience..."
                  }
                />
              </div>
              <p className="mt-4 text-xs text-stone-300/70 leading-relaxed">
                {isEs
                  ? "Al enviar esta solicitud, aceptas que tu información organizacional será almacenada para conectarte con proveedores de cobertura. No compartimos tus datos con terceros sin tu consentimiento."
                  : "By submitting, you agree that your organization information will be stored to connect you with coverage providers. We do not share your data with third parties without your consent."}
              </p>
              <button
                type="submit"
                disabled={fqhcSubmitting}
                className="mt-3 w-full rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-900 transition-colors hover:bg-amber-400 disabled:opacity-50 sm:w-auto"
              >
                {fqhcSubmitting
                  ? isEs
                    ? "Enviando..."
                    : "Submitting..."
                  : isEs
                    ? "Solicitar Cobertura"
                    : "Request Coverage"}
              </button>
            </form>
          )}
        </section>

        {/* ============================================================ */}
        {/*  FAQ                                                          */}
        {/* ============================================================ */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-stone-900">
            {isEs ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
          </h2>
          <div className="space-y-2">
            {LOCUM_FAQ.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-stone-200 bg-white"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="pr-4 text-sm font-semibold text-stone-900">
                    {t(faq.question, locale)}
                  </span>
                  {openFaq === i ? (
                    <ChevronUp className="size-4 shrink-0 text-stone-500" />
                  ) : (
                    <ChevronDown className="size-4 shrink-0 text-stone-500" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="border-t border-stone-100 px-5 py-4">
                    <p className="text-sm text-stone-600">
                      {t(faq.answer, locale)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  CROSS-NAV + NEWSLETTER                                       */}
        {/* ============================================================ */}
        <section className="mb-12 grid gap-4 sm:grid-cols-3">
          <Link
            href="/jobs"
            className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-6 py-4 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50"
          >
            <Search className="size-4" />
            {isEs ? "Ver Empleos" : "Browse Jobs"}
          </Link>
          <Link
            href="/salary-data"
            className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-6 py-4 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50"
          >
            <TrendingUp className="size-4" />
            {isEs ? "Datos Salariales" : "Salary Data"}
          </Link>
          <Link
            href="/strategy/clinic-simulator"
            className="flex items-center justify-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-6 py-4 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-100"
          >
            <Calculator className="size-4" />
            {isEs ? "Simulador Clínico" : "Clinic Simulator"}
          </Link>
        </section>

        <NewsletterSignup variant="card" defaultAudience="intel-brief" />

        {/* Source citations */}
        <div className="mt-8 border-t border-stone-200 pt-6 text-center">
          <p className="text-xs text-stone-500">
            {isEs ? "Fuentes" : "Sources"}:{" "}
            {MARKET_STATS.sources.map((s, i) => (
              <span key={s.label}>
                {i > 0 && " · "}
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-stone-600"
                >
                  {s.label}
                </a>
              </span>
            ))}
          </p>
          <p className="mt-1 text-xs text-stone-500">
            {isEs ? "Última actualización" : "Last updated"}: {LOCUM_LAST_UPDATED}
          </p>
        </div>
      </div>
    </main>
  );
}
