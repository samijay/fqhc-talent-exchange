"use client";

import { useState, useMemo } from "react";
import { Link } from "@/i18n/navigation";
import {
  Search,
  MapPin,
  Building2,
  Monitor,
  Users,
  ExternalLink,
  ArrowRight,
  Map,
  LayoutGrid,
  List,
  Star,
  ArrowUpDown,
  Heart,
  Shield,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  DollarSign,
  BadgeCheck,
  Briefcase,
  Globe,
  Phone,
  MapPin as MapPinIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import {
  californiaFQHCs,
  regions,
  allPrograms,
  allEhrSystems,
  fqhcSalaryRanges,
  typicalFqhcBenefits,
} from "@/lib/california-fqhcs";
import type { CaliforniaFQHC } from "@/lib/california-fqhcs";
import DynamicMap from "@/components/directory/DynamicMap";

type SortKey = "name" | "patientCount" | "siteCount" | "glassdoorRating" | "staffCount";
type SortDir = "asc" | "desc";
type ViewMode = "cards" | "table" | "map";

interface SampleJob {
  id: string;
  title: string;
  salaryMin: number;
  salaryMax: number;
}

function parseCount(str: string): number {
  return parseInt(str.replace(/[^0-9]/g, ""), 10) || 0;
}

function generateSampleJobs(fqhc: CaliforniaFQHC): SampleJob[] {
  // Base jobs that most FQHCs offer
  const baseJobs = [
    { title: "Community Health Worker", salaryMin: 44000, salaryMax: 60000 },
    { title: "Care Coordinator", salaryMin: 46000, salaryMax: 66000 },
    { title: "Medical Assistant", salaryMin: 40000, salaryMax: 60000 },
  ];

  // Add ECM-specific jobs if applicable
  let jobs = [...baseJobs];
  if (fqhc.ecmProvider && fqhc.programs.includes("ECM")) {
    jobs.push({
      title: "Care Coordinator - ECM Program",
      salaryMin: 50000,
      salaryMax: 70000,
    });
  }

  // Add CCM-specific jobs if applicable
  if (fqhc.programs.includes("CCM")) {
    jobs.push({
      title: "Case Manager - CCM",
      salaryMin: 47000,
      salaryMax: 82000,
    });
  }

  // Add BH-specific jobs if applicable
  if (fqhc.programs.includes("BH Integration")) {
    jobs.push({
      title: "Behavioral Health Specialist",
      salaryMin: 50000,
      salaryMax: 75000,
    });
  }

  // Take top 3 most relevant jobs, randomizing slightly based on FQHC ID
  const hash = fqhc.slug.charCodeAt(0);
  const shuffled = jobs.sort(() => (hash % 2 === 0 ? -1 : 1));
  const selected = shuffled.slice(0, 3);

  // Assign unique IDs
  return selected.map((job, idx) => ({
    ...job,
    id: `${fqhc.slug}-${idx}`,
  }));
}

function StarRating({ rating }: { rating: number | null }) {
  if (rating === null) return <span className="text-xs text-stone-400">No rating</span>;
  const full = Math.floor(rating);
  const half = rating - full >= 0.3;
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={i} className="size-3.5 fill-emerald-400 text-emerald-400" />
      ))}
      {half && <Star className="size-3.5 fill-emerald-400/50 text-emerald-400" />}
      <span className="ml-1 text-sm font-medium text-stone-700">{rating.toFixed(1)}</span>
    </span>
  );
}

export default function DirectoryPage() {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("All Regions");
  const [ehrFilter, setEhrFilter] = useState("All EHR Systems");
  const [programFilter, setProgramFilter] = useState("All Programs");
  const [ecmOnly, setEcmOnly] = useState(false);
  const [view, setView] = useState<ViewMode>("cards");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [showSalary, setShowSalary] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);
  const [selectedFqhc, setSelectedFqhc] = useState<CaliforniaFQHC | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...californiaFQHCs];

    if (regionFilter !== "All Regions") {
      list = list.filter((f) => f.region === regionFilter);
    }
    if (ehrFilter !== "All EHR Systems") {
      list = list.filter((f) => f.ehrSystem === ehrFilter);
    }
    if (programFilter !== "All Programs") {
      list = list.filter((f) => f.programs.includes(programFilter));
    }
    if (ecmOnly) {
      list = list.filter((f) => f.ecmProvider);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.city.toLowerCase().includes(q) ||
          f.county.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q)
      );
    }

    // Sort
    list.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "name":
          cmp = a.name.localeCompare(b.name);
          break;
        case "patientCount":
          cmp = parseCount(a.patientCount) - parseCount(b.patientCount);
          break;
        case "siteCount":
          cmp = a.siteCount - b.siteCount;
          break;
        case "staffCount":
          cmp = parseCount(a.staffCount) - parseCount(b.staffCount);
          break;
        case "glassdoorRating":
          cmp = (a.glassdoorRating ?? 0) - (b.glassdoorRating ?? 0);
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return list;
  }, [search, regionFilter, ehrFilter, programFilter, ecmOnly, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  }

  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    californiaFQHCs.forEach((f) => {
      counts[f.region] = (counts[f.region] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-600 via-violet-700 to-violet-800 py-14 text-center text-white sm:py-20">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          California FQHC Directory
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-violet-100/80 sm:text-lg">
          Explore {californiaFQHCs.length} Federally Qualified Health Centers
          across California — with staff data, Glassdoor ratings, ECM status, and
          an interactive map.
        </p>

        {/* Quick stats */}
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-6 text-sm sm:text-base">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold sm:text-3xl">{californiaFQHCs.length}</span>
            <span className="text-violet-200">Organizations</span>
          </div>
          <div className="h-8 w-px bg-violet-500/50" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold sm:text-3xl">{regions.length}</span>
            <span className="text-violet-200">Regions</span>
          </div>
          <div className="h-8 w-px bg-violet-500/50" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold sm:text-3xl">
              {californiaFQHCs.reduce((sum, f) => sum + f.siteCount, 0).toLocaleString()}+
            </span>
            <span className="text-violet-200">Health Center Sites</span>
          </div>
          <div className="h-8 w-px bg-violet-500/50" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold sm:text-3xl">
              {californiaFQHCs.filter((f) => f.ecmProvider).length}
            </span>
            <span className="text-violet-200">ECM Providers</span>
          </div>
        </div>
      </section>

      {/* Salary & Benefits Quick Reference (collapsible) */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Salary Card */}
          <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
            <button
              onClick={() => setShowSalary(!showSalary)}
              className="flex w-full items-center justify-between p-4 text-left"
            >
              <div className="flex items-center gap-2">
                <DollarSign className="size-5 text-violet-600" />
                <span className="font-semibold text-stone-900">FQHC Salary Ranges (California)</span>
              </div>
              {showSalary ? <ChevronUp className="size-4 text-stone-400" /> : <ChevronDown className="size-4 text-stone-400" />}
            </button>
            {showSalary && (
              <div className="border-t border-stone-100 p-4">
                <div className="space-y-2">
                  {Object.entries(fqhcSalaryRanges).map(([role, data]) => (
                    <div key={role} className="flex items-center justify-between text-sm">
                      <span className="text-stone-600">{role}</span>
                      <span className="font-medium text-stone-900">
                        ${(data.min / 1000).toFixed(0)}k – ${(data.max / 1000).toFixed(0)}k
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-stone-400">
                  Based on Glassdoor, Indeed, and ZipRecruiter data for California FQHCs (2026)
                </p>
              </div>
            )}
          </div>

          {/* Benefits Card */}
          <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
            <button
              onClick={() => setShowBenefits(!showBenefits)}
              className="flex w-full items-center justify-between p-4 text-left"
            >
              <div className="flex items-center gap-2">
                <Heart className="size-5 text-violet-600" />
                <span className="font-semibold text-stone-900">Typical FQHC Benefits</span>
              </div>
              {showBenefits ? <ChevronUp className="size-4 text-stone-400" /> : <ChevronDown className="size-4 text-stone-400" />}
            </button>
            {showBenefits && (
              <div className="border-t border-stone-100 p-4">
                <div className="space-y-1.5">
                  {typicalFqhcBenefits.map((b) => (
                    <div key={b} className="flex items-start gap-2 text-sm text-stone-600">
                      <BadgeCheck className="mt-0.5 size-3.5 shrink-0 text-violet-500" />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filters + View Toggle */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
            <Input
              placeholder="Search by name, city, or county..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 pl-10"
            />
          </div>

          {/* Region filter */}
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="h-11 w-full sm:w-44">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Regions">All Regions</SelectItem>
              {regions.map((r) => (
                <SelectItem key={r} value={r}>
                  {r} ({regionCounts[r] || 0})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* EHR filter */}
          <Select value={ehrFilter} onValueChange={setEhrFilter}>
            <SelectTrigger className="h-11 w-full sm:w-44">
              <SelectValue placeholder="EHR System" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All EHR Systems">All EHR Systems</SelectItem>
              {allEhrSystems.map((e) => (
                <SelectItem key={e} value={e}>
                  {e}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Program filter */}
          <Select value={programFilter} onValueChange={setProgramFilter}>
            <SelectTrigger className="h-11 w-full sm:w-48">
              <SelectValue placeholder="Program" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Programs">All Programs</SelectItem>
              {allPrograms.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Second row: ECM toggle, sort, view toggle */}
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {/* ECM toggle */}
          <button
            onClick={() => setEcmOnly(!ecmOnly)}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
              ecmOnly
                ? "border-violet-600 bg-violet-50 text-violet-700"
                : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
            }`}
          >
            <Shield className="size-3.5" />
            ECM Providers Only
          </button>

          {/* Sort */}
          <Select value={`${sortKey}-${sortDir}`} onValueChange={(v) => {
            const [key, dir] = v.split("-") as [SortKey, SortDir];
            setSortKey(key);
            setSortDir(dir);
          }}>
            <SelectTrigger className="h-9 w-48 text-sm">
              <ArrowUpDown className="mr-1 size-3.5" />
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="patientCount-desc">Most Patients</SelectItem>
              <SelectItem value="siteCount-desc">Most Sites</SelectItem>
              <SelectItem value="staffCount-desc">Largest Staff</SelectItem>
              <SelectItem value="glassdoorRating-desc">Highest Rated</SelectItem>
            </SelectContent>
          </Select>

          <div className="ml-auto flex items-center gap-1 rounded-lg border border-stone-200 bg-white p-0.5">
            <button
              onClick={() => setView("cards")}
              className={`rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                view === "cards" ? "bg-violet-600 text-white" : "text-stone-500 hover:text-stone-700"
              }`}
              title="Card view"
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              onClick={() => setView("table")}
              className={`rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                view === "table" ? "bg-violet-600 text-white" : "text-stone-500 hover:text-stone-700"
              }`}
              title="Table view"
            >
              <List className="size-4" />
            </button>
            <button
              onClick={() => setView("map")}
              className={`rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                view === "map" ? "bg-violet-600 text-white" : "text-stone-500 hover:text-stone-700"
              }`}
              title="Map view"
            >
              <Map className="size-4" />
            </button>
          </div>
        </div>

        <p className="mt-4 text-sm text-stone-500">
          Showing {filtered.length} of {californiaFQHCs.length} organizations
        </p>
      </div>

      {/* Content Area */}
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        {/* Map View */}
        {view === "map" && (
          <div className="mb-8 overflow-hidden rounded-xl border border-stone-200 shadow-sm">
            <DynamicMap fqhcs={filtered} />
          </div>
        )}

        {/* Card View */}
        {view === "cards" && (
          <>
            {filtered.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((fqhc) => (
                  <FQHCCard
                    key={fqhc.slug}
                    fqhc={fqhc}
                    onViewDetails={() => {
                      setSelectedFqhc(fqhc);
                      setDetailsOpen(true);
                    }}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Table View */}
        {view === "table" && (
          <>
            {filtered.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-stone-100 bg-stone-50/50">
                      <th
                        className="cursor-pointer px-4 py-3 font-semibold text-stone-700 hover:text-violet-700"
                        onClick={() => toggleSort("name")}
                      >
                        <span className="flex items-center gap-1">
                          Organization
                          {sortKey === "name" && (sortDir === "asc" ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />)}
                        </span>
                      </th>
                      <th className="px-4 py-3 font-semibold text-stone-700">Location</th>
                      <th
                        className="cursor-pointer px-4 py-3 font-semibold text-stone-700 hover:text-violet-700"
                        onClick={() => toggleSort("siteCount")}
                      >
                        <span className="flex items-center gap-1">
                          Sites
                          {sortKey === "siteCount" && (sortDir === "asc" ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />)}
                        </span>
                      </th>
                      <th
                        className="cursor-pointer px-4 py-3 font-semibold text-stone-700 hover:text-violet-700"
                        onClick={() => toggleSort("patientCount")}
                      >
                        <span className="flex items-center gap-1">
                          Patients
                          {sortKey === "patientCount" && (sortDir === "asc" ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />)}
                        </span>
                      </th>
                      <th
                        className="cursor-pointer px-4 py-3 font-semibold text-stone-700 hover:text-violet-700"
                        onClick={() => toggleSort("staffCount")}
                      >
                        <span className="flex items-center gap-1">
                          Staff
                          {sortKey === "staffCount" && (sortDir === "asc" ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />)}
                        </span>
                      </th>
                      <th className="px-4 py-3 font-semibold text-stone-700">EHR</th>
                      <th
                        className="cursor-pointer px-4 py-3 font-semibold text-stone-700 hover:text-violet-700"
                        onClick={() => toggleSort("glassdoorRating")}
                      >
                        <span className="flex items-center gap-1">
                          Rating
                          {sortKey === "glassdoorRating" && (sortDir === "asc" ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />)}
                        </span>
                      </th>
                      <th className="px-4 py-3 font-semibold text-stone-700">ECM</th>
                      <th className="px-4 py-3 font-semibold text-stone-700">Programs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((fqhc, i) => (
                      <tr
                        key={fqhc.slug}
                        className={`border-b border-stone-50 transition-colors hover:bg-stone-50/80 ${
                          i % 2 === 0 ? "" : "bg-stone-50/30"
                        }`}
                      >
                        <td className="px-4 py-3">
                          <a
                            href={fqhc.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-violet-700 hover:text-violet-800 hover:underline"
                          >
                            {fqhc.name}
                          </a>
                        </td>
                        <td className="px-4 py-3 text-stone-600">
                          {fqhc.city}, {fqhc.county}
                        </td>
                        <td className="px-4 py-3 text-stone-700 font-medium">{fqhc.siteCount}</td>
                        <td className="px-4 py-3 text-stone-700">{fqhc.patientCount}</td>
                        <td className="px-4 py-3 text-stone-700">{fqhc.staffCount}</td>
                        <td className="px-4 py-3">
                          <Badge className="bg-stone-100 text-stone-600 text-xs whitespace-nowrap">
                            {fqhc.ehrSystem}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <StarRating rating={fqhc.glassdoorRating} />
                          {fqhc.glassdoorReviewCount && (
                            <span className="ml-1 text-xs text-stone-400">
                              ({fqhc.glassdoorReviewCount})
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {fqhc.ecmProvider ? (
                            <Badge className="bg-violet-50 text-violet-700 text-xs">ECM</Badge>
                          ) : (
                            <span className="text-xs text-stone-400">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {fqhc.programs.slice(0, 2).map((p) => (
                              <Badge key={p} className="bg-stone-50 text-stone-500 text-xs">
                                {p}
                              </Badge>
                            ))}
                            {fqhc.programs.length > 2 && (
                              <span className="text-xs text-stone-400">
                                +{fqhc.programs.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* Details Sheet */}
        {selectedFqhc && (
          <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
            <SheetContent className="w-full overflow-y-auto">
              <SheetHeader>
                <div className="flex-1">
                  <SheetTitle className="text-2xl">{selectedFqhc.name}</SheetTitle>
                  <p className="mt-1 text-sm text-stone-500">{selectedFqhc.region}</p>
                </div>
                <SheetClose />
              </SheetHeader>

              <div className="space-y-6 px-6 py-4">
                {/* Organization Details */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-stone-900">Organization Details</h3>
                  <div className="space-y-2">
                    {selectedFqhc.website && (
                      <div className="flex items-start gap-3">
                        <Globe className="mt-0.5 size-4 text-violet-600 shrink-0" />
                        <a
                          href={selectedFqhc.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-violet-600 hover:text-violet-700 break-all"
                        >
                          {selectedFqhc.website}
                        </a>
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <MapPinIcon className="mt-0.5 size-4 text-violet-600 shrink-0" />
                      <div className="text-sm text-stone-600">
                        {selectedFqhc.city}, {selectedFqhc.county} County
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Stats */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-stone-900">Key Statistics</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-violet-50 p-3">
                      <p className="text-xs font-medium text-stone-500">Patient Count</p>
                      <p className="mt-1 text-sm font-semibold text-stone-900">
                        {selectedFqhc.patientCount}
                      </p>
                    </div>
                    <div className="rounded-lg bg-emerald-50 p-3">
                      <p className="text-xs font-medium text-stone-500">Staff Count</p>
                      <p className="mt-1 text-sm font-semibold text-stone-900">
                        {selectedFqhc.staffCount}
                      </p>
                    </div>
                    <div className="rounded-lg bg-violet-50 p-3">
                      <p className="text-xs font-medium text-stone-500">Health Center Sites</p>
                      <p className="mt-1 text-sm font-semibold text-stone-900">
                        {selectedFqhc.siteCount}
                      </p>
                    </div>
                    <div className="rounded-lg bg-emerald-50 p-3">
                      <p className="text-xs font-medium text-stone-500">Glassdoor Rating</p>
                      <p className="mt-1 text-sm font-semibold text-stone-900">
                        <StarRating rating={selectedFqhc.glassdoorRating} />
                      </p>
                    </div>
                  </div>
                </div>

                {/* About */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-stone-900">About</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {selectedFqhc.description}
                  </p>
                </div>

                {/* EHR & Certifications */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-stone-900">Technology & Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-stone-100 text-stone-700">
                      <Monitor className="mr-1 size-3" />
                      {selectedFqhc.ehrSystem}
                    </Badge>
                    {selectedFqhc.ecmProvider && (
                      <Badge className="bg-violet-50 text-violet-700">
                        <Shield className="mr-0.5 size-3" />
                        ECM Provider
                      </Badge>
                    )}
                    {selectedFqhc.nhscApproved && (
                      <Badge className="bg-emerald-50 text-emerald-700">
                        <GraduationCap className="mr-0.5 size-3" />
                        NHSC Approved
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Programs */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-stone-900">Programs Offered</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFqhc.programs.map((prog) => (
                      <Badge key={prog} className="bg-violet-50 text-violet-700">
                        {prog}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Job Listings */}
                <div className="space-y-3 border-t border-stone-100 pt-6">
                  <h3 className="font-semibold text-stone-900">Current Openings</h3>
                  <p className="text-xs text-stone-500">
                    Sample positions available at {selectedFqhc.name}
                  </p>
                  <div className="space-y-3">
                    {generateSampleJobs(selectedFqhc).map((job) => (
                      <div
                        key={job.id}
                        className="rounded-lg border border-stone-200 bg-stone-50 p-4"
                      >
                        <div className="flex items-start gap-3">
                          <Briefcase className="mt-0.5 size-4 text-violet-600 shrink-0" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-stone-900">{job.title}</h4>
                            <p className="mt-1 text-sm text-stone-600">
                              ${(job.salaryMin / 1000).toFixed(0)}k – $
                              {(job.salaryMax / 1000).toFixed(0)}k/year
                            </p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <Button
                            size="sm"
                            className="w-full bg-emerald-500 text-stone-900 hover:bg-emerald-400"
                            asChild
                          >
                            <Link href="/join">Express Interest</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits Summary */}
                <div className="space-y-3 border-t border-stone-100 pt-6">
                  <h3 className="font-semibold text-stone-900">Typical FQHC Benefits</h3>
                  <div className="space-y-2">
                    {typicalFqhcBenefits.slice(0, 5).map((b) => (
                      <div key={b} className="flex items-start gap-2 text-sm text-stone-600">
                        <BadgeCheck className="mt-0.5 size-3.5 shrink-0 text-emerald-500" />
                        {b}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to Action */}
                <div className="space-y-2 border-t border-stone-100 pt-6">
                  <Button
                    className="w-full bg-violet-600 text-white hover:bg-violet-700"
                    asChild
                  >
                    <a href={selectedFqhc.website} target="_blank" rel="noopener noreferrer">
                      Visit Organization Website
                      <ExternalLink className="ml-2 size-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-gradient-to-br from-violet-600 via-violet-700 to-violet-800 p-8 sm:p-12 text-center text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to Join the Network?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-violet-100/80 sm:text-lg">
            Whether you&apos;re a health professional looking for your next role or an
            FQHC with positions to fill, we&apos;re here to connect you.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-emerald-500 text-stone-900 shadow-lg hover:bg-emerald-400"
              asChild
            >
              <Link href="/join">
                Apply for Early Access <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              asChild
            >
              <Link href="/hire">Request Priority Access</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FQHCCard({
  fqhc,
  onViewDetails,
}: {
  fqhc: CaliforniaFQHC;
  onViewDetails?: () => void;
}) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-violet-300 cursor-pointer group"
      onClick={onViewDetails}
    >
      <div>
        {/* Header with ECM badge */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-stone-900 leading-tight group-hover:text-violet-700 transition-colors">
            {fqhc.name}
          </h3>
          {fqhc.ecmProvider && (
            <Badge className="shrink-0 bg-violet-50 text-violet-700 text-xs">
              <Shield className="mr-0.5 size-3" /> ECM
            </Badge>
          )}
        </div>

        {/* Location and Region */}
        <div className="mt-2 flex items-center gap-1.5 text-sm text-stone-500">
          <MapPin className="size-3.5" />
          {fqhc.city}, {fqhc.county}
        </div>

        {/* Region Badge */}
        <div className="mt-2">
          <Badge className="bg-stone-100 text-stone-600 text-xs">
            {fqhc.region}
          </Badge>
        </div>

        {/* Key Stats Grid */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-violet-50 px-2 py-1.5">
            <p className="text-xs font-medium text-stone-500">Patients</p>
            <p className="text-sm font-semibold text-stone-900">{fqhc.patientCount}</p>
          </div>
          <div className="rounded-lg bg-emerald-50 px-2 py-1.5">
            <p className="text-xs font-medium text-stone-500">Staff</p>
            <p className="text-sm font-semibold text-stone-900">{fqhc.staffCount}</p>
          </div>
        </div>

        {/* Glassdoor Rating */}
        <div className="mt-3">
          <StarRating rating={fqhc.glassdoorRating} />
          {fqhc.glassdoorReviewCount && (
            <span className="ml-1 text-xs text-stone-400">
              ({fqhc.glassdoorReviewCount})
            </span>
          )}
        </div>

        {/* Programs Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {fqhc.programs.slice(0, 2).map((prog) => (
            <Badge
              key={prog}
              className="bg-violet-50 text-violet-700 text-xs"
            >
              {prog}
            </Badge>
          ))}
          {fqhc.programs.length > 2 && (
            <Badge className="bg-stone-50 text-stone-500 text-xs">
              +{fqhc.programs.length - 2}
            </Badge>
          )}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails?.();
          }}
          className="flex-1 text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors text-left"
        >
          View Details <ArrowRight className="ml-1 inline size-3" />
        </button>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto max-w-md py-20 text-center">
      <Building2 className="mx-auto mb-4 size-12 text-stone-300" />
      <h2 className="text-lg font-semibold text-stone-700">
        No organizations match your filters
      </h2>
      <p className="mt-2 text-sm text-stone-500">
        Try adjusting your search or filter criteria.
      </p>
    </div>
  );
}
