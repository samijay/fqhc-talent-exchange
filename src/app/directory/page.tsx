"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
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

function parseCount(str: string): number {
  return parseInt(str.replace(/[^0-9]/g, ""), 10) || 0;
}

function StarRating({ rating }: { rating: number | null }) {
  if (rating === null) return <span className="text-xs text-stone-400">No rating</span>;
  const full = Math.floor(rating);
  const half = rating - full >= 0.3;
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
      ))}
      {half && <Star className="size-3.5 fill-amber-400/50 text-amber-400" />}
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
      <section className="bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 py-14 text-center text-white sm:py-20">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          California FQHC Directory
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-teal-100/80 sm:text-lg">
          Explore {californiaFQHCs.length} Federally Qualified Health Centers
          across California — with staff data, Glassdoor ratings, ECM status, and
          an interactive map.
        </p>

        {/* Quick stats */}
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-6 text-sm sm:text-base">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold sm:text-3xl">{californiaFQHCs.length}</span>
            <span className="text-teal-200">Organizations</span>
          </div>
          <div className="h-8 w-px bg-teal-500/50" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold sm:text-3xl">{regions.length}</span>
            <span className="text-teal-200">Regions</span>
          </div>
          <div className="h-8 w-px bg-teal-500/50" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold sm:text-3xl">
              {californiaFQHCs.reduce((sum, f) => sum + f.siteCount, 0).toLocaleString()}+
            </span>
            <span className="text-teal-200">Health Center Sites</span>
          </div>
          <div className="h-8 w-px bg-teal-500/50" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold sm:text-3xl">
              {californiaFQHCs.filter((f) => f.ecmProvider).length}
            </span>
            <span className="text-teal-200">ECM Providers</span>
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
                <DollarSign className="size-5 text-teal-600" />
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
                <Heart className="size-5 text-teal-600" />
                <span className="font-semibold text-stone-900">Typical FQHC Benefits</span>
              </div>
              {showBenefits ? <ChevronUp className="size-4 text-stone-400" /> : <ChevronDown className="size-4 text-stone-400" />}
            </button>
            {showBenefits && (
              <div className="border-t border-stone-100 p-4">
                <div className="space-y-1.5">
                  {typicalFqhcBenefits.map((b) => (
                    <div key={b} className="flex items-start gap-2 text-sm text-stone-600">
                      <BadgeCheck className="mt-0.5 size-3.5 shrink-0 text-teal-500" />
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
                ? "border-teal-600 bg-teal-50 text-teal-700"
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
                view === "cards" ? "bg-teal-600 text-white" : "text-stone-500 hover:text-stone-700"
              }`}
              title="Card view"
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              onClick={() => setView("table")}
              className={`rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                view === "table" ? "bg-teal-600 text-white" : "text-stone-500 hover:text-stone-700"
              }`}
              title="Table view"
            >
              <List className="size-4" />
            </button>
            <button
              onClick={() => setView("map")}
              className={`rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                view === "map" ? "bg-teal-600 text-white" : "text-stone-500 hover:text-stone-700"
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
                  <FQHCCard key={fqhc.slug} fqhc={fqhc} />
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
                        className="cursor-pointer px-4 py-3 font-semibold text-stone-700 hover:text-teal-700"
                        onClick={() => toggleSort("name")}
                      >
                        <span className="flex items-center gap-1">
                          Organization
                          {sortKey === "name" && (sortDir === "asc" ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />)}
                        </span>
                      </th>
                      <th className="px-4 py-3 font-semibold text-stone-700">Location</th>
                      <th
                        className="cursor-pointer px-4 py-3 font-semibold text-stone-700 hover:text-teal-700"
                        onClick={() => toggleSort("siteCount")}
                      >
                        <span className="flex items-center gap-1">
                          Sites
                          {sortKey === "siteCount" && (sortDir === "asc" ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />)}
                        </span>
                      </th>
                      <th
                        className="cursor-pointer px-4 py-3 font-semibold text-stone-700 hover:text-teal-700"
                        onClick={() => toggleSort("patientCount")}
                      >
                        <span className="flex items-center gap-1">
                          Patients
                          {sortKey === "patientCount" && (sortDir === "asc" ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />)}
                        </span>
                      </th>
                      <th
                        className="cursor-pointer px-4 py-3 font-semibold text-stone-700 hover:text-teal-700"
                        onClick={() => toggleSort("staffCount")}
                      >
                        <span className="flex items-center gap-1">
                          Staff
                          {sortKey === "staffCount" && (sortDir === "asc" ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />)}
                        </span>
                      </th>
                      <th className="px-4 py-3 font-semibold text-stone-700">EHR</th>
                      <th
                        className="cursor-pointer px-4 py-3 font-semibold text-stone-700 hover:text-teal-700"
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
                            className="font-medium text-teal-700 hover:text-teal-800 hover:underline"
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
                            <Badge className="bg-teal-50 text-teal-700 text-xs">ECM</Badge>
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

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 p-8 sm:p-12 text-center text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to Join the Network?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-teal-100/80 sm:text-lg">
            Whether you&apos;re a health professional looking for your next role or an
            FQHC with positions to fill, we&apos;re here to connect you.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-amber-500 text-stone-900 shadow-lg hover:bg-amber-400"
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

function FQHCCard({ fqhc }: { fqhc: CaliforniaFQHC }) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-stone-900 leading-tight">
            {fqhc.name}
          </h3>
          {fqhc.ecmProvider && (
            <Badge className="shrink-0 bg-teal-50 text-teal-700 text-xs">
              <Shield className="mr-0.5 size-3" /> ECM
            </Badge>
          )}
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-sm text-stone-500">
          <MapPin className="size-3.5" />
          {fqhc.city}, {fqhc.county} &middot; {fqhc.region}
        </div>

        <div className="mt-2 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-stone-50 px-2 py-1.5">
            <p className="text-xs text-stone-400">Sites</p>
            <p className="text-sm font-semibold text-stone-700">{fqhc.siteCount}</p>
          </div>
          <div className="rounded-lg bg-stone-50 px-2 py-1.5">
            <p className="text-xs text-stone-400">Patients</p>
            <p className="text-sm font-semibold text-stone-700">{fqhc.patientCount}</p>
          </div>
          <div className="rounded-lg bg-stone-50 px-2 py-1.5">
            <p className="text-xs text-stone-400">Staff</p>
            <p className="text-sm font-semibold text-stone-700">{fqhc.staffCount}</p>
          </div>
        </div>

        {/* Glassdoor */}
        <div className="mt-3">
          <StarRating rating={fqhc.glassdoorRating} />
          {fqhc.glassdoorReviewCount && (
            <span className="ml-1 text-xs text-stone-400">
              ({fqhc.glassdoorReviewCount} reviews)
            </span>
          )}
        </div>

        <p className="mt-3 text-sm text-stone-600 leading-relaxed line-clamp-2">
          {fqhc.description}
        </p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Badge className="bg-stone-100 text-stone-600 text-xs">
            <Monitor className="mr-1 size-3" />
            {fqhc.ehrSystem}
          </Badge>
          {fqhc.nhscApproved && (
            <Badge className="bg-amber-50 text-amber-700 text-xs">
              <GraduationCap className="mr-0.5 size-3" /> NHSC
            </Badge>
          )}
          {fqhc.programs.slice(0, 2).map((prog) => (
            <Badge
              key={prog}
              className="bg-teal-50 text-teal-700 text-xs"
            >
              {prog}
            </Badge>
          ))}
          {fqhc.programs.length > 2 && (
            <Badge className="bg-stone-50 text-stone-500 text-xs">
              +{fqhc.programs.length - 2} more
            </Badge>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <a
          href={fqhc.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
        >
          Visit Website <ExternalLink className="size-3" />
        </a>
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
