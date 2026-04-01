import { SkeletonCard } from "@/components/ui/skeleton-card";

export default function DirectoryLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header skeleton */}
      <div className="animate-pulse mb-8">
        <div className="h-8 bg-stone-200 rounded w-1/3 mb-3" />
        <div className="h-4 bg-stone-200 rounded w-2/3" />
      </div>

      {/* Search bar skeleton */}
      <div className="animate-pulse mb-6">
        <div className="h-10 bg-stone-200 rounded-lg w-full max-w-md" />
      </div>

      {/* Card grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
