// Revenue Impact Simulator — standalone page with hero + wizard + cross-nav
"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import { RevenueImpactSimulator } from "@/components/viz/RevenueImpactSimulator";
import {
  SlidersHorizontal,
  DollarSign,
  TrendingUp,
  Building2,
  BookOpen,
  Pill,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const t = (obj: { en: string; es: string }, locale: string) =>
  locale === "es" ? obj.es : obj.en;

export default function RevenueSimulatorPage() {
  const locale = useLocale();
  const isEs = locale === "es";

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-teal-900 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-2 text-teal-400">
            <SlidersHorizontal className="size-5" />
            <span className="text-sm font-bold uppercase tracking-widest">
              {isEs ? "Estrategia" : "Strategy"}
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-5xl">
            {isEs
              ? "Simulador de Impacto en Ingresos"
              : "Revenue Impact Simulator"}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-300">
            {isEs
              ? "¿Qué pasaría si los fondos federales caen un 20%? ¿Y si optimiza 340B? Explore escenarios de ingresos para su FQHC en California — con datos reales y resultados inmediatos."
              : "What if federal funding drops 20%? What if you optimize 340B? Explore revenue scenarios for your California FQHC — with real data and instant results."}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              {
                value: "3",
                label: isEs ? "Tamaños de FQHC" : "FQHC Sizes",
                icon: Building2,
              },
              {
                value: "4",
                label: isEs ? "Palancas de ingresos" : "Revenue Levers",
                icon: SlidersHorizontal,
              },
              {
                value: "340B",
                label: isEs ? "Impacto de farmacia" : "Pharmacy Impact",
                icon: Pill,
              },
              {
                value: isEs ? "Tiempo real" : "Real-time",
                label: isEs ? "Resultados instantáneos" : "Instant Results",
                icon: TrendingUp,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-white/10 p-4 backdrop-blur"
              >
                <stat.icon className="mb-2 size-5 text-teal-400" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-stone-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simulator */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <RevenueImpactSimulator />
        </div>
      </section>

      {/* Context: How to read these numbers */}
      <section className="bg-white px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-stone-900">
            {isEs
              ? "Cómo leer estos números"
              : "How to Read These Numbers"}
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-stone-200 p-5">
              <DollarSign className="size-6 text-teal-600 mb-2" />
              <h3 className="font-bold text-stone-900">
                {isEs ? "Fondos Federales" : "Federal Funding"}
              </h3>
              <p className="mt-2 text-sm text-stone-600">
                {isEs
                  ? "H.R. 1 propone recortes de hasta $880B en Medicaid durante 10 años. Para un FQHC mediano con 35% de ingresos federales, un recorte del 20% = $700K menos por año."
                  : "H.R. 1 proposes up to $880B in Medicaid cuts over 10 years. For a mid-size FQHC with 35% federal revenue, a 20% cut = $700K less per year."}
              </p>
            </div>
            <div className="rounded-xl border border-stone-200 p-5">
              <Pill className="size-6 text-teal-600 mb-2" />
              <h3 className="font-bold text-stone-900">
                {isEs ? "Farmacia 340B" : "340B Pharmacy"}
              </h3>
              <p className="mt-2 text-sm text-stone-600">
                {isEs
                  ? "340B permite a FQHCs comprar medicamentos a precios con descuento. Un programa básico (contrato con farmacia) genera ~$800K/año. Optimizado (farmacia propia) puede alcanzar $2.1M+ — como Highland Health Center."
                  : "340B lets FQHCs purchase drugs at deeply discounted prices. A basic program (contract pharmacy) generates ~$800K/year. Optimized (entity-owned) can reach $2.1M+ — like Highland Health Center."}
              </p>
            </div>
            <div className="rounded-xl border border-stone-200 p-5">
              <TrendingUp className="size-6 text-teal-600 mb-2" />
              <h3 className="font-bold text-stone-900">
                {isEs ? "Alcance Máximo" : "Top-of-Scope Staffing"}
              </h3>
              <p className="mt-2 text-sm text-stone-600">
                {isEs
                  ? "Cuando NPs, PAs y RNs trabajan al máximo de su licencia, los proveedores ven 25% más pacientes. Cada visita adicional genera un encuentro PPS facturado al pagador."
                  : "When NPs, PAs, and RNs work at the top of their license, providers see 25% more patients. Each additional visit generates a PPS encounter billed to the payer."}
              </p>
            </div>
            <div className="rounded-xl border border-stone-200 p-5">
              <Building2 className="size-6 text-teal-600 mb-2" />
              <h3 className="font-bold text-stone-900">
                {isEs ? "Retención de Personal" : "Turnover Reduction"}
              </h3>
              <p className="mt-2 text-sm text-stone-600">
                {isEs
                  ? "La rotación promedio en FQHCs es 22%. Cada reemplazo cuesta $12-18K en reclutamiento, capacitación y productividad perdida. Reducir la rotación un 25% ahorra $70K+ para un FQHC mediano."
                  : "Average FQHC turnover is 22%. Each replacement costs $12-18K in recruiting, training, and lost productivity. Cutting turnover by 25% saves $70K+ for a mid-size FQHC."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-nav */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold text-stone-900">
            {isEs ? "Recursos Relacionados" : "Related Resources"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                href: "/strategy/clinic-simulator",
                title: { en: "Clinic Operations Simulator", es: "Simulador de Operaciones Clínicas" },
                desc: { en: "Model staffing, scheduling & revenue", es: "Modele personal, horarios e ingresos" },
              },
              {
                href: "/strategy/schedule-planner",
                title: { en: "Schedule Planner", es: "Planificador de Horarios" },
                desc: { en: "Build weekly schedules with live metrics", es: "Cree horarios semanales con métricas en vivo" },
              },
              {
                href: "/strategy/scope-of-practice",
                title: { en: "Top-of-Scope Guide", es: "Guía de Alcance Máximo" },
                desc: { en: "CA scope-of-practice by role", es: "Alcance de práctica por rol en CA" },
              },
              {
                href: "/strategy/economics",
                title: { en: "Healthcare Economics", es: "Economía de la Salud" },
                desc: { en: "PPS, 340B, FMAP & more — 3 levels", es: "PPS, 340B, FMAP y más — 3 niveles" },
              },
              {
                href: "/strategy/guides",
                title: { en: "Executive Guides", es: "Guías Ejecutivas" },
                desc: { en: "Real case studies with Rumelt framework", es: "Casos reales con marco Rumelt" },
              },
              {
                href: "/strategy/okrs",
                title: { en: "OKR Templates", es: "Plantillas OKR" },
                desc: { en: "Revenue recovery & crisis management", es: "Recuperación de ingresos y gestión de crisis" },
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-start gap-3 rounded-xl border border-stone-200 bg-white p-4 transition-colors hover:border-teal-300 hover:bg-teal-50"
              >
                <BookOpen className="mt-0.5 size-5 shrink-0 text-teal-600" />
                <div>
                  <p className="text-sm font-bold text-stone-900 group-hover:text-teal-700">
                    {t(link.title, locale)}
                  </p>
                  <p className="mt-0.5 text-xs text-stone-500">
                    {t(link.desc, locale)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <NewsletterSignup variant="card" defaultAudience="intel-brief" />
          </div>
        </div>
      </section>
    </main>
  );
}
