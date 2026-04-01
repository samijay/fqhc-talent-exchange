import { SkeletonTable } from "@/components/ui/skeleton-card";

export default function JobsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header skeleton */}
      <div className="animate-pulse mb-8">
        <div className="h-8 bg-stone-200 rounded w-1/4 mb-3" />
        <div className="h-4 bg-stone-200 rounded w-1/2" />
      </div>

      {/* Filter bar skeleton */}
      <div className="animate-pulse mb-6 flex gap-3">
        <div className="h-10 bg-stone-200 rounded-lg w-48" />
        <div className="h-10 bg-stone-200 rounded-lg w-36" />
        <div className="h-10 bg-stone-200 rounded-lg w-36" />
      </div>

      {/* Table skeleton */}
      <SkeletonTable />
    </div>
  );
}
