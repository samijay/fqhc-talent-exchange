export default function Loading() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-8">
          {/* Hero skeleton */}
          <div className="space-y-4">
            <div className="h-4 w-24 rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-10 w-3/4 rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-4 w-1/2 rounded bg-stone-200 dark:bg-stone-800" />
          </div>
          {/* Content skeleton */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 rounded-xl bg-stone-200 dark:bg-stone-800" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
