export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6 animate-pulse">
      <div className="h-4 bg-stone-200 rounded w-3/4 mb-3" />
      <div className="h-3 bg-stone-200 rounded w-1/2 mb-2" />
      <div className="h-3 bg-stone-200 rounded w-full mb-2" />
      <div className="flex gap-2 mt-4">
        <div className="h-6 bg-stone-200 rounded-full w-16" />
        <div className="h-6 bg-stone-200 rounded-full w-20" />
      </div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex gap-4 py-3 border-b border-stone-100">
          <div className="h-4 bg-stone-200 rounded w-1/4" />
          <div className="h-4 bg-stone-200 rounded w-1/6" />
          <div className="h-4 bg-stone-200 rounded w-1/6" />
          <div className="h-4 bg-stone-200 rounded w-1/4" />
        </div>
      ))}
    </div>
  );
}
