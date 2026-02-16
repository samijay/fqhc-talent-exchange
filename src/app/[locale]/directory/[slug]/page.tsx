import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  ExternalLink,
  Globe,
  MapPin,
  Star,
  Users,
  Briefcase,
  Heart,
  CheckCircle2,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { californiaFQHCs, fqhcSalaryRanges, typicalFqhcBenefits } from "@/lib/california-fqhcs";
import { fqhcJobListings } from "@/lib/fqhc-job-listings";

/* ------------------------------------------------------------------ */
/*  Static Params                                                      */
/* ------------------------------------------------------------------ */

export async function generateStaticParams() {
  return californiaFQHCs.map((fqhc) => ({ slug: fqhc.slug }));
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fqhc = californiaFQHCs.find((f) => f.slug === slug);
  if (!fqhc) return { title: "Not Found" };

  return {
    title: `${fqhc.name} Jobs & Salaries | FQHC Talent Exchange`,
    description: `View open positions, salary ranges, programs, and employee ratings at ${fqhc.name} in ${fqhc.city}, California. ${fqhc.description}`,
  };
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatSalary(n: number): string {
  return `$${(n / 1000).toFixed(0)}k`;
}

function formatCount(s: string): string {
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default async function FQHCProfilePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const fqhc = californiaFQHCs.find((f) => f.slug === slug);
  if (!fqhc) notFound();

  const t = await getTranslations("directory");
  const jobs = fqhcJobListings.filter((j) => j.fqhcSlug === slug);

  return (
    <div className="bg-stone-50">
      {/* ==================== HERO ==================== */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 py-12 text-white sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/directory"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-teal-200 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            {t("backToDirectory")}
          </Link>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {fqhc.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-teal-100">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-4" />
                  {fqhc.city}, {fqhc.county} County
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="size-4" />
                  {fqhc.region}
                </span>
              </div>

              {/* Badges */}
              <div className="mt-4 flex flex-wrap gap-2">
                {fqhc.ecmProvider && (
                  <Badge className="border-amber-400/30 bg-amber-500/20 text-amber-100">
                    ECM Provider
                  </Badge>
                )}
                {fqhc.nhscApproved && (
                  <Badge className="border-teal-300/30 bg-teal-400/20 text-teal-100">
                    <Shield className="mr-1 size-3" />
                    {t("nhscApproved")}
                  </Badge>
                )}
                {fqhc.fundingImpactLevel === "high" && (
                  <Badge className="border-rose-400/30 bg-rose-500/20 text-rose-100">
                    <Heart className="mr-1 size-3" />
                    {locale === "es" ? "Alto Riesgo de Financiamiento" : "High Funding Risk"}
                  </Badge>
                )}
                {fqhc.unionInfo?.unionized && (
                  <Badge className="border-blue-300/30 bg-blue-400/20 text-blue-100">
                    {locale === "es" ? "Sindicalizado" : "Union"}
                  </Badge>
                )}
              </div>
            </div>

            {/* Glassdoor rating */}
            {fqhc.glassdoorRating && (
              <div className="rounded-xl bg-white/10 px-5 py-3 text-center backdrop-blur">
                <div className="flex items-center gap-1.5">
                  <Star className="size-5 fill-amber-400 text-amber-400" />
                  <span className="text-2xl font-bold">{fqhc.glassdoorRating.toFixed(1)}</span>
                </div>
                <p className="mt-0.5 text-xs text-teal-200">
                  {t("glassdoorRating")}
                  {fqhc.glassdoorReviewCount && (
                    <> ({fqhc.glassdoorReviewCount} {t("reviews")})</>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ==================== STATS BAR ==================== */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-stone-200 sm:grid-cols-4">
          <div className="flex flex-col items-center py-6">
            <span className="text-2xl font-bold text-stone-900">{fqhc.siteCount}</span>
            <span className="text-sm text-stone-500">{t("sites")}</span>
          </div>
          <div className="flex flex-col items-center py-6">
            <span className="text-2xl font-bold text-stone-900">{formatCount(fqhc.patientCount)}</span>
            <span className="text-sm text-stone-500">{t("patients")}</span>
          </div>
          <div className="flex flex-col items-center py-6">
            <span className="text-2xl font-bold text-stone-900">{formatCount(fqhc.staffCount)}</span>
            <span className="text-sm text-stone-500">{t("staff")}</span>
          </div>
          <div className="flex flex-col items-center py-6">
            <span className="text-2xl font-bold text-stone-900">{jobs.length}</span>
            <span className="text-sm text-stone-500">{t("openPositions")}</span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* ==================== LEFT COLUMN (2/3) ==================== */}
          <div className="space-y-8 lg:col-span-2">
            {/* Mission Statement */}
            {fqhc.missionStatement && (
              <div className="rounded-xl border border-teal-200 bg-gradient-to-br from-teal-50 to-white p-6">
                <h2 className="text-lg font-bold text-stone-900">
                  {locale === "es" ? "Misión" : "Mission"}
                </h2>
                <div className="mt-3 border-l-4 border-teal-600 pl-4">
                  <p className="text-base text-stone-700 italic leading-relaxed">
                    &ldquo;{fqhc.missionStatement}&rdquo;
                  </p>
                </div>
              </div>
            )}

            {/* About */}
            <div className="rounded-xl border border-stone-200 bg-white p-6">
              <h2 className="text-lg font-bold text-stone-900">{t("aboutOrg")} {fqhc.name}</h2>
              <p className="mt-3 leading-relaxed text-stone-600">{fqhc.description}</p>
            </div>

            {/* Programs */}
            {fqhc.programs.length > 0 && (
              <div className="rounded-xl border border-stone-200 bg-white p-6">
                <h2 className="text-lg font-bold text-stone-900">{t("programs")}</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {fqhc.programs.map((program) => (
                    <Badge
                      key={program}
                      variant="secondary"
                      className="bg-teal-50 text-teal-800"
                    >
                      {program}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Open Positions */}
            <div className="rounded-xl border border-stone-200 bg-white p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold text-stone-900">
                <Briefcase className="size-5" />
                {t("openPositions")} ({jobs.length})
              </h2>

              {jobs.length === 0 ? (
                <p className="mt-4 text-stone-500">{t("noOpenPositions")}</p>
              ) : (
                <div className="mt-4 space-y-4">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="rounded-lg border border-stone-200 p-4 transition-colors hover:border-teal-200 hover:bg-teal-50/30"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="font-semibold text-stone-900">{job.title}</h3>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-stone-500">
                            <span>{job.department}</span>
                            <span>·</span>
                            <span>{job.type}</span>
                            <span>·</span>
                            <span>{job.location}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-semibold text-teal-700">
                            {formatSalary(job.salaryMin)} – {formatSalary(job.salaryMax)}
                          </span>
                        </div>
                      </div>

                      <p className="mt-2 text-sm text-stone-600">{job.description}</p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {job.bilingual && (
                          <Badge variant="secondary" className="bg-amber-50 text-amber-700 text-xs">
                            Bilingual
                          </Badge>
                        )}
                        {job.programs.map((p) => (
                          <Badge key={p} variant="secondary" className="text-xs">
                            {p}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Salary Ranges */}
            <div className="rounded-xl border border-stone-200 bg-white p-6">
              <h2 className="text-lg font-bold text-stone-900">
                {t("salaryRangesAt", { name: fqhc.name })}
              </h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-stone-200 text-left text-stone-500">
                      <th className="pb-2 font-medium">{t("role")}</th>
                      <th className="pb-2 text-right font-medium">{t("range")}</th>
                      <th className="pb-2 text-right font-medium">{t("average")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {Object.entries(fqhcSalaryRanges).map(([role, data]) => (
                      <tr key={role}>
                        <td className="py-2.5 font-medium text-stone-800">{role}</td>
                        <td className="py-2.5 text-right text-stone-600">
                          {formatSalary(data.min)} – {formatSalary(data.max)}
                        </td>
                        <td className="py-2.5 text-right font-semibold text-teal-700">
                          {formatSalary(data.avg)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-stone-400">{t("salarySource")}</p>
            </div>
          </div>

          {/* ==================== RIGHT COLUMN (1/3) ==================== */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="rounded-xl border border-stone-200 bg-white p-6">
              <h3 className="font-semibold text-stone-900">Details</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-stone-500">{t("ehrSystemLabel")}</dt>
                  <dd className="font-medium text-stone-800">{fqhc.ehrSystem}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone-500">{t("ecmProviderLabel")}</dt>
                  <dd className="font-medium text-stone-800">{fqhc.ecmProvider ? "Yes" : "No"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone-500">{t("nhscApproved")}</dt>
                  <dd className="font-medium text-stone-800">{fqhc.nhscApproved ? "Yes" : "No"}</dd>
                </div>
                {fqhc.unionInfo && (
                  <div className="flex justify-between">
                    <dt className="text-stone-500">{locale === "es" ? "Sindicalizado" : "Union"}</dt>
                    <dd className="font-medium text-stone-800">{fqhc.unionInfo.unionized ? (locale === "es" ? "Sí" : "Yes") : "No"}</dd>
                  </div>
                )}
              </dl>

              {/* Union Details */}
              {fqhc.unionInfo?.unionized && (
                <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50/50 p-3">
                  <p className="text-xs font-semibold text-blue-800">
                    {locale === "es" ? "Sindicato(s)" : "Union(s)"}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {fqhc.unionInfo.unions.map((u) => (
                      <Badge key={u} className="bg-blue-100 text-blue-700 text-xs">{u}</Badge>
                    ))}
                  </div>
                  {fqhc.unionInfo.representedRoles.length > 0 && (
                    <p className="mt-2 text-xs text-blue-600">
                      {locale === "es" ? "Representa:" : "Represents:"} {fqhc.unionInfo.representedRoles.join(", ")}
                    </p>
                  )}
                  {fqhc.unionInfo.notes && (
                    <p className="mt-1.5 text-xs text-stone-500 italic">{fqhc.unionInfo.notes}</p>
                  )}
                </div>
              )}

              {/* Links */}
              <div className="mt-6 space-y-2">
                {fqhc.website && (
                  <a
                    href={fqhc.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-stone-200 px-4 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:border-teal-200 hover:bg-teal-50"
                  >
                    <Globe className="size-4" />
                    {t("viewWebsite")}
                    <ExternalLink className="ml-auto size-3.5 text-stone-400" />
                  </a>
                )}
                {fqhc.careersUrl && (
                  <a
                    href={fqhc.careersUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-stone-200 px-4 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:border-teal-200 hover:bg-teal-50"
                  >
                    <Briefcase className="size-4" />
                    {t("viewCareers")}
                    <ExternalLink className="ml-auto size-3.5 text-stone-400" />
                  </a>
                )}
              </div>
            </div>

            {/* Benefits */}
            <div className="rounded-xl border border-stone-200 bg-white p-6">
              <h3 className="font-semibold text-stone-900">
                {t("benefitsAt", { name: fqhc.name })}
              </h3>
              <ul className="mt-4 space-y-2">
                {typicalFqhcBenefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2 text-sm text-stone-600"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-600" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Funding Vulnerability */}
            {fqhc.coverageVulnerabilityPercent !== null && (
              <div className={`rounded-xl border p-6 ${
                fqhc.fundingImpactLevel === "high"
                  ? "border-rose-200 bg-rose-50"
                  : fqhc.fundingImpactLevel === "moderate"
                    ? "border-amber-200 bg-amber-50"
                    : "border-stone-200 bg-stone-50"
              }`}>
                <h3 className="font-semibold text-stone-900">
                  {locale === "es" ? "Vulnerabilidad de Financiamiento" : "Funding Vulnerability"}
                </h3>
                <div className="mt-3 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-600">
                      {locale === "es" ? "Pacientes en Riesgo de Cobertura" : "Patients at Coverage Risk"}
                    </span>
                    <span className={`text-lg font-bold ${
                      fqhc.fundingImpactLevel === "high"
                        ? "text-rose-700"
                        : fqhc.fundingImpactLevel === "moderate"
                          ? "text-amber-700"
                          : "text-stone-600"
                    }`}>
                      ~{fqhc.coverageVulnerabilityPercent}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/80 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        fqhc.fundingImpactLevel === "high"
                          ? "bg-rose-500"
                          : fqhc.fundingImpactLevel === "moderate"
                            ? "bg-amber-500"
                            : "bg-stone-400"
                      }`}
                      style={{ width: `${fqhc.coverageVulnerabilityPercent}%` }}
                    />
                  </div>
                  <Badge className={`text-xs ${
                    fqhc.fundingImpactLevel === "high"
                      ? "bg-rose-100 text-rose-700"
                      : fqhc.fundingImpactLevel === "moderate"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-stone-100 text-stone-600"
                  }`}>
                    {fqhc.fundingImpactLevel === "high"
                      ? (locale === "es" ? "Alto Riesgo" : "High Risk")
                      : fqhc.fundingImpactLevel === "moderate"
                        ? (locale === "es" ? "Riesgo Moderado" : "Moderate Risk")
                        : (locale === "es" ? "Riesgo Bajo" : "Low Risk")}
                  </Badge>
                  <p className="text-xs text-stone-500">
                    {locale === "es"
                      ? "Porcentaje estimado de pacientes en riesgo de perder cobertura de Medi-Cal debido a cambios en políticas."
                      : "Estimated percentage of patients at risk of losing Medi-Cal coverage due to policy changes."}
                  </p>
                  <Link
                    href="/funding-impact"
                    className="inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800"
                  >
                    {locale === "es" ? "Ver Panel de Impacto Financiero" : "View Funding Impact Dashboard"} <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            )}

            {/* CTA: Build Resume */}
            <div className="rounded-xl border border-teal-200 bg-teal-50 p-6 text-center">
              <Heart className="mx-auto size-8 text-teal-700" />
              <h3 className="mt-3 font-bold text-stone-900">
                {t("buildResumeFor", { name: fqhc.name })}
              </h3>
              <p className="mt-2 text-sm text-stone-600">
                {t("buildResumeCta")}
              </p>
              <Button
                className="mt-4 w-full bg-teal-700 text-white hover:bg-teal-800"
                asChild
              >
                <Link href="/resume-builder">
                  Build Resume <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
