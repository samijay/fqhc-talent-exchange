"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
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
  orgType: string;
  city: string;
  salaryMin: number;
  salaryMax: number;
  ehrSystem: string;
  tags: string[];
}

/* ------------------------------------------------------------------ */
/*  Sample Jobs                                                        */
/* ------------------------------------------------------------------ */

const sampleJobs: SampleJob[] = [
  {
    id: "s1",
    title: "Community Health Worker — ECM Program",
    orgType: "Large multi-site FQHC",
    city: "Los Angeles",
    salaryMin: 44000,
    salaryMax: 56000,
    ehrSystem: "OCHIN Epic",
    tags: ["ECM"],
  },
  {
    id: "s2",
    title: "Care Coordinator — Enhanced Care Management",
    orgType: "Regional FQHC network",
    city: "San Diego",
    salaryMin: 52000,
    salaryMax: 68000,
    ehrSystem: "NextGen",
    tags: ["ECM", "Community Supports"],
  },
  {
    id: "s3",
    title: "Behavioral Health Specialist — FQHC",
    orgType: "Urban community health center",
    city: "Oakland",
    salaryMin: 65000,
    salaryMax: 85000,
    ehrSystem: "OCHIN Epic",
    tags: ["ECM", "BH Integration"],
  },
  {
    id: "s4",
    title: "Patient Navigator — Bilingual Spanish",
    orgType: "Agricultural community FQHC",
    city: "Fresno",
    salaryMin: 38000,
    salaryMax: 48000,
    ehrSystem: "NextGen",
    tags: ["Community Supports"],
  },
  {
    id: "s5",
    title: "EHR Analyst — OCHIN Epic",
    orgType: "Multi-site FQHC",
    city: "Sacramento",
    salaryMin: 60000,
    salaryMax: 78000,
    ehrSystem: "OCHIN Epic",
    tags: [],
  },
  {
    id: "s6",
    title: "Community Health Worker — Community Supports",
    orgType: "Inland Empire FQHC",
    city: "Riverside",
    salaryMin: 40000,
    salaryMax: 52000,
    ehrSystem: "NextGen",
    tags: ["Community Supports"],
  },
  {
    id: "s7",
    title: "Licensed Clinical Social Worker",
    orgType: "Bay Area community health center",
    city: "San Jose",
    salaryMin: 72000,
    salaryMax: 95000,
    ehrSystem: "OCHIN Epic",
    tags: ["ECM", "BH-ASO"],
  },
  {
    id: "s8",
    title: "Care Manager — CCM Program",
    orgType: "Central Valley FQHC",
    city: "Bakersfield",
    salaryMin: 50000,
    salaryMax: 64000,
    ehrSystem: "NextGen",
    tags: ["CCM"],
  },
  {
    id: "s9",
    title: "Program Manager — ECM",
    orgType: "Large multi-site FQHC",
    city: "Los Angeles",
    salaryMin: 80000,
    salaryMax: 105000,
    ehrSystem: "Epic",
    tags: ["ECM", "Leadership"],
  },
  {
    id: "s10",
    title: "Medical Assistant — Bilingual",
    orgType: "Border community FQHC",
    city: "San Diego",
    salaryMin: 36000,
    salaryMax: 45000,
    ehrSystem: "NextGen",
    tags: [],
  },
];

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
    if (search.trim()) {
      const q = search.toLowerCase();
      return sampleJobs.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.city.toLowerCase().includes(q) ||
          j.orgType.toLowerCase().includes(q) ||
          j.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return sampleJobs;
  }, [search]);

  /* ================================================================ */
  /*  Render                                                           */
  /* ================================================================ */
  return (
    <div className="bg-stone-50">
      {/* ---------- Header ---------- */}
      <section className="bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 py-14 text-center text-white sm:py-20">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          Open Positions
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-teal-100/80 sm:text-lg">
          Browse current openings at Federally Qualified Health Centers across
          California.
        </p>
        {!loading && !error && (
          <Badge className="mt-4 border-teal-400/30 bg-teal-500/20 text-teal-100">
            {jobs.length + sampleJobs.length} positions available
          </Badge>
        )}
      </section>

      {/* ---------- Info Banner ---------- */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex items-start gap-3 rounded-xl border border-teal-200 bg-teal-50 p-4">
          <Info className="mt-0.5 size-5 shrink-0 text-teal-600" />
          <p className="text-sm text-teal-800">
            Showing representative roles currently available through our network.{" "}
            <Link href="/join" className="font-semibold underline underline-offset-2 hover:text-teal-900">
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
              placeholder="Search by title, city, or program..."
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
            <Loader2 className="size-8 animate-spin text-teal-600" />
          </div>
        )}

        {/* Error — still show sample jobs */}
        {error && (
          <div className="mx-auto mb-6 max-w-md rounded-lg border border-amber-200 bg-amber-50 px-6 py-4 text-center text-sm text-amber-700">
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
                      <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-teal-700">
                        <DollarSign className="size-3.5" />
                        {formatSalary(job.salary_min, job.salary_max)}
                      </div>
                    )}
                  </div>

                  {/* Apply button */}
                  <Button
                    className="mt-5 w-full bg-teal-600 text-white hover:bg-teal-700"
                    asChild
                  >
                    <Link href="/join">
                      Apply for Early Access <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Sample jobs */}
        {!loading && filteredSample.length > 0 && (
          <>
            <p className="mb-4 text-sm font-medium text-stone-700">
              {filtered.length > 0 ? "More Roles in Our Network" : "Roles in Our Network"} ({filteredSample.length})
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSample.map((job) => (
                <div
                  key={job.id}
                  className="group flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div>
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-stone-900">
                      {job.title}
                    </h3>

                    {/* Org type */}
                    <div className="mt-1.5 flex items-center gap-1.5 text-sm text-stone-500">
                      <Building2 className="size-3.5" />
                      {job.orgType}
                    </div>

                    {/* City */}
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-stone-500">
                      <MapPin className="size-3.5" />
                      {job.city}, CA
                    </div>

                    {/* Salary */}
                    <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-teal-700">
                      <DollarSign className="size-3.5" />
                      {formatSalary(job.salaryMin, job.salaryMax)}
                    </div>

                    {/* EHR + Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <Badge className="bg-stone-100 text-stone-600 text-xs">
                        <Monitor className="mr-1 size-3" />
                        {job.ehrSystem}
                      </Badge>
                      {job.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-teal-50 text-teal-700 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* CTA button */}
                  <Button
                    className="mt-5 w-full bg-teal-600 text-white hover:bg-teal-700"
                    asChild
                  >
                    <Link href="/join">
                      Join Waitlist to Apply <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Empty state — only if both are empty */}
        {!loading && filtered.length === 0 && filteredSample.length === 0 && (
          <div className="mx-auto max-w-md py-20 text-center">
            <Briefcase className="mx-auto mb-4 size-12 text-stone-300" />
            <h2 className="text-lg font-semibold text-stone-700">
              No matches for your search
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
