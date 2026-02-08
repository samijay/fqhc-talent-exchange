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
} from "@/lib/california-fqhcs";

export default function DirectoryPage() {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("All Regions");
  const [ehrFilter, setEhrFilter] = useState("All EHR Systems");
  const [programFilter, setProgramFilter] = useState("All Programs");

  const filtered = useMemo(() => {
    let list = californiaFQHCs;

    if (regionFilter !== "All Regions") {
      list = list.filter((f) => f.region === regionFilter);
    }

    if (ehrFilter !== "All EHR Systems") {
      list = list.filter((f) => f.ehrSystem === ehrFilter);
    }

    if (programFilter !== "All Programs") {
      list = list.filter((f) => f.programs.includes(programFilter));
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

    return list;
  }, [search, regionFilter, ehrFilter, programFilter]);

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 py-14 text-center text-white sm:py-20">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          California FQHC Directory
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-teal-100/80 sm:text-lg">
          Browse {californiaFQHCs.length}+ Federally Qualified Health Centers
          across California. Search by region, EHR system, and programs.
        </p>
      </section>

      {/* Filters */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
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
                  {r}
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

        <p className="mt-4 text-sm text-stone-500">
          Showing {filtered.length} of {californiaFQHCs.length} organizations
        </p>
      </div>

      {/* Directory Cards */}
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="mx-auto max-w-md py-20 text-center">
            <Building2 className="mx-auto mb-4 size-12 text-stone-300" />
            <h2 className="text-lg font-semibold text-stone-700">
              No organizations match your filters
            </h2>
            <p className="mt-2 text-sm text-stone-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((fqhc) => (
              <div
                key={fqhc.slug}
                className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  <h3 className="text-lg font-semibold text-stone-900">
                    {fqhc.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-1.5 text-sm text-stone-500">
                    <MapPin className="size-3.5" />
                    {fqhc.city}, {fqhc.county}
                  </div>

                  <div className="mt-1 flex items-center gap-1.5 text-sm text-stone-500">
                    <Building2 className="size-3.5" />
                    {fqhc.siteCount} {fqhc.siteCount === 1 ? "site" : "sites"}
                  </div>

                  <div className="mt-1 flex items-center gap-1.5 text-sm text-stone-500">
                    <Users className="size-3.5" />
                    {fqhc.patientCount} patients
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
                    {fqhc.programs.slice(0, 3).map((prog) => (
                      <Badge
                        key={prog}
                        className="bg-teal-50 text-teal-700 text-xs"
                      >
                        {prog}
                      </Badge>
                    ))}
                    {fqhc.programs.length > 3 && (
                      <Badge className="bg-stone-50 text-stone-500 text-xs">
                        +{fqhc.programs.length - 3} more
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
            ))}
          </div>
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
