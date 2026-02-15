"use client";

import dynamic from "next/dynamic";
import type { CaliforniaFQHC } from "@/lib/california-fqhcs";

const FQHCMap = dynamic(() => import("./FQHCMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[350px] sm:h-[500px] w-full bg-stone-100 rounded-xl animate-pulse flex items-center justify-center text-stone-400">
      Loading map...
    </div>
  ),
});

export default function DynamicMap({ fqhcs, locale }: { fqhcs: CaliforniaFQHC[]; locale?: string }) {
  return <FQHCMap fqhcs={fqhcs} locale={locale} />;
}
