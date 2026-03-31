"use client";

import dynamic from "next/dynamic";

const FQHCMap = dynamic(() => import("./FQHCMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[350px] sm:h-[500px] w-full bg-stone-100 rounded-xl motion-safe:animate-pulse flex items-center justify-center text-stone-500">
      Loading map...
    </div>
  ),
});

/** Minimal FQHC shape accepted by both CaliforniaFQHC and DirectoryFQHC */
interface MapFQHC {
  name: string;
  slug: string;
  city: string;
  county: string;
  region: string;
  lat: number;
  lng: number;
  patientCount: string;
  staffCount: string;
  glassdoorRating: number | null;
  glassdoorReviewCount: number | null;
  ecmProvider: boolean;
  website: string;
  resilienceGrade?: string;
  jobCount?: number;
}

export default function DynamicMap({ fqhcs, locale }: { fqhcs: MapFQHC[]; locale?: string }) {
  return <FQHCMap fqhcs={fqhcs} locale={locale} />;
}
