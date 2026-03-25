interface Stat {
  value: string;
  label: string;
}

interface StatBarProps {
  stats: Stat[];
  sources?: string[];
  className?: string;
}

export function StatBar({ stats, sources, className = "" }: StatBarProps) {
  return (
    <section className={`border-y border-stone-200 bg-stone-100 px-4 py-8 ${className}`}>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-8 sm:gap-12">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-lg font-extrabold text-stone-900 sm:text-xl">{stat.value}</p>
            <p className="text-xs font-medium uppercase tracking-wider text-stone-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {sources && sources.length > 0 && (
        <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {sources.map((source) => (
            <span key={source} className="text-xs font-medium text-stone-500">
              {source}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
