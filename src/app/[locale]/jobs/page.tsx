"use client";

import { useEffect, useState, useMemo } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import {
  Search,
  Briefcase,
  Building2,
  DollarSign,
  ArrowRight,
  Loader2,
  MapPin,
  Monitor,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { fqhcJobListings } from "@/lib/fqhc-job-listings";
import { californiaFQHCs } from "@/lib/california-fqhcs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface JobOpening {
  id: string;
  title: string;
  role_type: string | null;
  salary_min: number | null;
  salary_max: number | null;
  urgency: string | null;
  status: string;
  created_at: string;
  employers: {
    organization_name: string;
  } | null;
}

interface JobListing {
  id: string;
  title: string;
  orgName: string;
  orgType: string;
  roleType: string;
  city: string;
  salaryMin: number;
  salaryMax: number;
  ehrSystem: string;
  tags: string[];
  bilingual: boolean;
  type: string;
  languageRequired?: string | null;
  languagePreferred?: string[] | null;
  fqhcSlug: string;
  careersUrl?: string | null;
}

/* ------------------------------------------------------------------ */
/*  Build job listings from FQHC data                                  */
/* ------------------------------------------------------------------ */

const fqhcNameMap = new Map(californiaFQHCs.map((f) => [f.slug, f.name]));
const fqhcCareersMap = new Map(californiaFQHCs.map((f) => [f.slug, f.careersUrl]));

const jobListings: JobListing[] = fqhcJobListings.map((job) => ({
  id: job.id,
  title: job.title,
  orgName: fqhcNameMap.get(job.fqhcSlug) || "",
  orgType: job.department,
  roleType: job.roleType,
  city: job.location,
  salaryMin: job.salaryMin,
  salaryMax: job.salaryMax,
  ehrSystem: job.ehrSystem,
  tags: job.programs,
  bilingual: job.bilingual,
  type: job.type,
  languageRequired: job.languageRequired,
  languagePreferred: job.languagePreferred,
  fqhcSlug: job.fqhcSlug,
  careersUrl: fqhcCareersMap.get(job.fqhcSlug) || null,
}));

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const ROLE_TYPE_GROUPS = [
  {
    label: "Care Coordination",
    esLabel: "Coordinación de Atención",
    options: [
      "Community Health Worker",
      "Care Coordinator",
      "Case Manager",
      "Patient Navigator",
      "Health Educator",
      "Referral Coordinator",
    ],
  },
  {
    label: "Clinical",
    esLabel: "Clínico",
    options: [
      "Registered Nurse",
      "Licensed Vocational Nurse",
      "Nurse Practitioner",
      "Physician",
      "Physician Assistant",
      "Medical Assistant",
      "Phlebotomist",
    ],
  },
  {
    label: "Behavioral Health",
    esLabel: "Salud Conductual",
    options: [
      "Behavioral Health Specialist",
      "Licensed Clinical Social Worker",
      "Licensed Marriage & Family Therapist",
      "Psychologist",
    ],
  },
  {
    label: "Dental",
    esLabel: "Dental",
    options: ["Dentist", "Dental Hygienist", "Dental Assistant"],
  },
  {
    label: "Pharmacy",
    esLabel: "Farmacia",
    options: ["Pharmacist", "Pharmacy Technician"],
  },
  {
    label: "Administrative",
    esLabel: "Administrativo",
    options: [
      "Patient Services Representative",
      "Call Center Specialist",
      "Health Enrollment Navigator",
      "Revenue Cycle Specialist",
      "Billing Specialist",
      "Medical Coder",
      "EHR Analyst",
    ],
  },
  {
    label: "Leadership",
    esLabel: "Liderazgo",
    options: ["Program Manager", "Medical Director", "Director"],
  },
];

function urgencyColor(urgency: string | null) {
  if (!urgency) return "bg-stone-100 text-stone-600";
  const u = urgency.toLowerCase();
  if (u.includes("immediately")) return "bg-red-100 text-red-700";
  if (u.includes("30")) return "bg-amber-100 text-amber-700";
  return "bg-green-100 text-green-700";
}

function formatSalary(min: number | null, max: number | null) {
  if (!min && !max) return null;
  const fmt = (n: number) =>
    "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  return `Up to ${fmt(max!)}`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function JobsPage() {
  const locale = useLocale();
  const t = useTranslations("jobs");
  const tNav = useTranslations("nav");

  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* filters */
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [languageFilter, setLanguageFilter] = useState("All Languages");

  /* fetch jobs on mount */
  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from("job_openings")
        .select("*, employers(organization_name)")
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (fetchError) {
        console.error("Error fetching jobs:", fetchError);
        setError("Unable to load positions right now. Please try again later.");
      } else {
        setJobs((data as JobOpening[]) || []);
      }
      setLoading(false);
    }

    fetchJobs();
  }, []);

  /* filtered live jobs */
  const filtered = useMemo(() => {
    let list = jobs;

    if (roleFilter !== "All Roles") {
      list = list.filter((j) => j.role_type === roleFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.employers?.organization_name.toLowerCase().includes(q)
      );
    }

    return list;
  }, [jobs, search, roleFilter]);

  /* filtered job listings */
  const filteredListings = useMemo(() => {
    let list = jobListings;

    if (roleFilter !== "All Roles") {
      list = list.filter((j) =>
        j.roleType === roleFilter ||
        j.title.toLowerCase().includes(roleFilter.toLowerCase())
      );
    }

    if (languageFilter !== "All Languages") {
      if (languageFilter === "Bilingual (Any)") {
        list = list.filter((j) => j.bilingual);
      } else {
        list = list.filter(
          (j) =>
            j.languageRequired === languageFilter ||
            (j.languagePreferred && j.languagePreferred.includes(languageFilter))
        );
      }
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.city.toLowerCase().includes(q) ||
          j.orgType.toLowerCase().includes(q) ||
          (j.orgName && j.orgName.toLowerCase().includes(q)) ||
          j.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return list;
  }, [search, roleFilter, languageFilter]);

  /* ================================================================ */
  /*  Render                                                           */
  /* ================================================================ */
  return (
    <div className="bg-stone-50">
      {/* ---------- Header ---------- */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 py-14 text-center text-white sm:py-20">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-teal-100/80 sm:text-lg">
          {t("subtitle")}
        </p>
        {!loading && !error && (
          <Badge className="mt-4 border-teal-400/30 bg-teal-500/20 text-teal-100">
            {t("positionsAvailable", { count: jobs.length + fqhcJobListings.length })}
          </Badge>
        )}
      </section>

      {/* ---------- Filters ---------- */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
            <Input
              placeholder={t("searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 pl-10"
            />
          </div>

          {/* Role type filter */}
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="h-11 w-full sm:w-56">
              <SelectValue placeholder={t("allRoles")} />
            </SelectTrigger>
            <SelectContent className="max-h-80">
              <SelectItem value="All Roles">{t("allRoles")}</SelectItem>
              {ROLE_TYPE_GROUPS.map((group) => (
                <SelectGroup key={group.label}>
                  <SelectLabel className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    {group.label}
                  </SelectLabel>
                  {group.options.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>

          {/* Language filter */}
          <Select value={languageFilter} onValueChange={setLanguageFilter}>
            <SelectTrigger className="h-11 w-full sm:w-48">
              <SelectValue placeholder={locale === "es" ? "Todos los idiomas" : "All Languages"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Languages">
                {locale === "es" ? "Todos los idiomas" : "All Languages"}
              </SelectItem>
              <SelectItem value="Bilingual (Any)">
                {locale === "es" ? "Bilingüe (cualquier)" : "Bilingual (Any)"}
              </SelectItem>
              {["Spanish", "Tagalog", "Cantonese", "Mandarin", "Vietnamese", "Korean"].map((lang) => (
                <SelectItem key={lang} value={lang}>{lang}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ---------- Job cards ---------- */}
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="size-8 animate-spin text-teal-700" />
          </div>
        )}

        {/* Error — still show aggregated jobs */}
        {error && (
          <div className="mx-auto mb-6 max-w-md rounded-lg border border-amber-200 bg-amber-50 px-6 py-4 text-center text-sm text-amber-700">
            {t("liveUnavailable")}
          </div>
        )}

        {/* Live jobs from Supabase */}
        {!loading && filtered.length > 0 && (
          <>
            <p className="mb-4 text-sm font-medium text-stone-700">
              {t("livePositions")} ({filtered.length})
            </p>
            <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((job) => (
                <div
                  key={job.id}
                  className="group flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div>
                    {/* Urgency badge */}
                    {job.urgency && (
                      <Badge
                        className={`mb-3 ${urgencyColor(job.urgency)}`}
                      >
                        {job.urgency}
                      </Badge>
                    )}

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-stone-900">
                      {job.title}
                    </h3>

                    {/* Organization */}
                    {job.employers?.organization_name && (
                      <div className="mt-1.5 flex items-center gap-1.5 text-sm text-stone-500">
                        <Building2 className="size-3.5" />
                        {job.employers.organization_name}
                      </div>
                    )}

                    {/* Role type */}
                    {job.role_type && (
                      <div className="mt-1 flex items-center gap-1.5 text-sm text-stone-500">
                        <Briefcase className="size-3.5" />
                        {job.role_type}
                      </div>
                    )}

                    {/* Salary */}
                    {formatSalary(job.salary_min, job.salary_max) && (
                      <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-teal-800">
                        <DollarSign className="size-3.5" />
                        {formatSalary(job.salary_min, job.salary_max)}
                      </div>
                    )}
                  </div>

                  {/* Apply button */}
                  <Button
                    className="mt-5 w-full bg-teal-700 text-white hover:bg-teal-800"
                    asChild
                  >
                    <Link href="/resume-builder">
                      {tNav("buildResume")} <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Network jobs from FQHC data */}
        {!loading && filteredListings.length > 0 && (
          <>
            <p className="mb-4 text-sm font-medium text-stone-700">
              {filtered.length > 0 ? t("moreRoles") : t("rolesInNetwork")} ({filteredListings.length})
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredListings.slice(0, 30).map((job) => (
                <div
                  key={job.id}
                  className="group flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div>
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-stone-900">
                      {job.title}
                    </h3>

                    {/* Org name */}
                    {job.orgName && (
                      <div className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-stone-700">
                        <Building2 className="size-3.5" />
                        {job.orgName}
                      </div>
                    )}

                    {/* Department */}
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-stone-500">
                      <Briefcase className="size-3.5" />
                      {job.orgType}
                    </div>

                    {/* City */}
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-stone-500">
                      <MapPin className="size-3.5" />
                      {job.city}, CA
                    </div>

                    {/* Salary */}
                    <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-teal-800">
                      <DollarSign className="size-3.5" />
                      {formatSalary(job.salaryMin, job.salaryMax)}
                    </div>

                    {/* Tags row */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <Badge className="bg-stone-100 text-stone-600 text-xs">
                        <Monitor className="mr-1 size-3" />
                        {job.ehrSystem}
                      </Badge>
                      {job.bilingual && (
                        <Badge className="bg-amber-50 text-amber-700 text-xs">
                          {job.languageRequired
                            ? `${t("bilingual")}: ${job.languageRequired}`
                            : t("bilingual")}
                        </Badge>
                      )}
                      {job.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-teal-50 text-teal-800 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* CTA button */}
                  <Button
                    className="mt-5 w-full bg-teal-700 text-white hover:bg-teal-800"
                    asChild
                  >
                    {job.careersUrl ? (
                      <a href={job.careersUrl} target="_blank" rel="noopener noreferrer">
                        {t("joinWaitlistToApply")} <ArrowRight className="size-4" />
                      </a>
                    ) : (
                      <Link href={`/directory/${job.fqhcSlug}`}>
                        {t("joinWaitlistToApply")} <ArrowRight className="size-4" />
                      </Link>
                    )}
                  </Button>
                </div>
              ))}
            </div>
            {filteredListings.length > 30 && (
              <div className="mt-8 text-center">
                <p className="text-sm text-stone-500 mb-4">
                  {t("showingOf", { count: filteredListings.length })}{" "}
                  <Link href="/directory" className="text-teal-700 font-semibold hover:underline">
                    {t("joinWaitlist")}
                  </Link>{" "}
                  {t("showingOfEnd")}
                </p>
              </div>
            )}
          </>
        )}

        {/* Empty state — only if both are empty */}
        {!loading && filtered.length === 0 && filteredListings.length === 0 && (
          <div className="mx-auto max-w-md py-20 text-center">
            <Briefcase className="mx-auto mb-4 size-12 text-stone-300" />
            <h2 className="text-lg font-semibold text-stone-700">
              {t("noJobs")}
            </h2>
            <p className="mt-2 text-sm text-stone-500">
              {t("noJobsHint")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
