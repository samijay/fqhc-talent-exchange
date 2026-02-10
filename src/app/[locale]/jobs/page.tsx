"use client";

import { useEffect, useState, useMemo } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  Search,
  Briefcase,
  Building2,
  DollarSign,
  ArrowRight,
  Loader2,
  MapPin,
  Monitor,
  Info,
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
  SelectItem,
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

interface SampleJob {
  id: string;
  title: string;
  orgName: string;
  orgType: string;
  city: string;
  salaryMin: number;
  salaryMax: number;
  ehrSystem: string;
  tags: string[];
  bilingual: boolean;
  type: string;
}

/* ------------------------------------------------------------------ */
/*  Build job listings from FQHC data                                  */
/* ------------------------------------------------------------------ */

const fqhcNameMap = new Map(californiaFQHCs.map((f) => [f.slug, f.name]));

const sampleJobs: SampleJob[] = fqhcJobListings.map((job) => ({
  id: job.id,
  title: job.title,
  orgName: fqhcNameMap.get(job.fqhcSlug) || "",
  orgType: job.department,
  city: job.location,
  salaryMin: job.salaryMin,
  salaryMax: job.salaryMax,
  ehrSystem: job.ehrSystem,
  tags: job.programs,
  bilingual: job.bilingual,
  type: job.type,
}));

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const ROLE_TYPE_OPTIONS = [
  "All Roles",
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
];

function urgencyColor(urgency: string | null) {
  if (!urgency) return "bg-stone-100 text-stone-600";
  const u = urgency.toLowerCase();
  if (u.includes("immediately")) return "bg-red-100 text-red-700";
  if (u.includes("30")) return "bg-emerald-100 text-emerald-700";
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
  const t = useTranslations("jobs");
  const tNav = useTranslations("nav");

  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* filters */
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");

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

  /* filtered sample jobs */
  const filteredSample = useMemo(() => {
    let list = sampleJobs;

    if (roleFilter !== "All Roles") {
      list = list.filter((j) =>
        j.title.toLowerCase().includes(roleFilter.toLowerCase()) ||
        j.orgType.toLowerCase().includes(roleFilter.toLowerCase())
      );
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
  }, [search, roleFilter]);

  /* ================================================================ */
  /*  Render                                                           */
  /* ================================================================ */
  return (
    <div className="bg-stone-50">
      {/* ---------- Header ---------- */}
      <section className="bg-gradient-to-br from-violet-600 via-violet-700 to-violet-800 py-14 text-center text-white sm:py-20">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-violet-100/80 sm:text-lg">
          {t("subtitle")}
        </p>
        {!loading && !error && (
          <Badge className="mt-4 border-violet-400/30 bg-violet-500/20 text-violet-100">
            {jobs.length + fqhcJobListings.length} positions available
          </Badge>
        )}
      </section>

      {/* ---------- Info Banner ---------- */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex items-start gap-3 rounded-xl border border-violet-200 bg-violet-50 p-4">
          <Info className="mt-0.5 size-5 shrink-0 text-violet-600" />
          <p className="text-sm text-violet-800">
            Showing representative roles currently available through our network.{" "}
            <Link href="/join" className="font-semibold underline underline-offset-2 hover:text-violet-900">
              Join the waitlist
            </Link>{" "}
            to see all open positions and get personally matched.
          </p>
        </div>
      </div>

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
            <SelectTrigger className="h-11 w-full sm:w-48">
              <SelectValue placeholder="Role type" />
            </SelectTrigger>
            <SelectContent>
              {ROLE_TYPE_OPTIONS.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
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
            <Loader2 className="size-8 animate-spin text-violet-600" />
          </div>
        )}

        {/* Error — still show sample jobs */}
        {error && (
          <div className="mx-auto mb-6 max-w-md rounded-lg border border-emerald-200 bg-emerald-50 px-6 py-4 text-center text-sm text-emerald-700">
            Live positions are temporarily unavailable. Showing representative roles below.
          </div>
        )}

        {/* Live jobs from Supabase */}
        {!loading && filtered.length > 0 && (
          <>
            <p className="mb-4 text-sm font-medium text-stone-700">
              Live Positions ({filtered.length})
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
                      <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-violet-700">
                        <DollarSign className="size-3.5" />
                        {formatSalary(job.salary_min, job.salary_max)}
                      </div>
                    )}
                  </div>

                  {/* Apply button */}
                  <Button
                    className="mt-5 w-full bg-violet-600 text-white hover:bg-violet-700"
                    asChild
                  >
                    <Link href="/join">
                      {tNav("earlyAccess")} <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Network jobs from FQHC data */}
        {!loading && filteredSample.length > 0 && (
          <>
            <p className="mb-4 text-sm font-medium text-stone-700">
              {filtered.length > 0 ? "More Roles in Our Network" : "Roles in Our Network"} ({filteredSample.length})
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSample.slice(0, 30).map((job) => (
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
                    <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-violet-700">
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
                        <Badge className="bg-emerald-50 text-emerald-700 text-xs">
                          Bilingual
                        </Badge>
                      )}
                      {job.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-violet-50 text-violet-700 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* CTA button */}
                  <Button
                    className="mt-5 w-full bg-violet-600 text-white hover:bg-violet-700"
                    asChild
                  >
                    <Link href="/join">
                      Join Waitlist to Apply <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
            {filteredSample.length > 30 && (
              <div className="mt-8 text-center">
                <p className="text-sm text-stone-500 mb-4">
                  Showing 30 of {filteredSample.length} positions.{" "}
                  <Link href="/join" className="text-violet-600 font-semibold hover:underline">
                    Join the waitlist
                  </Link>{" "}
                  to see all roles and get personally matched.
                </p>
              </div>
            )}
          </>
        )}

        {/* Empty state — only if both are empty */}
        {!loading && filtered.length === 0 && filteredSample.length === 0 && (
          <div className="mx-auto max-w-md py-20 text-center">
            <Briefcase className="mx-auto mb-4 size-12 text-stone-300" />
            <h2 className="text-lg font-semibold text-stone-700">
              {t("noJobs")}
            </h2>
            <p className="mt-2 text-sm text-stone-500">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
