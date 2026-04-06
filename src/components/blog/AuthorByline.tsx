export function AuthorByline() {
  return (
    <div className="flex items-center gap-3 mt-4 mb-8">
      <div className="size-10 rounded-full bg-teal-700 flex items-center justify-center text-white font-bold text-sm">
        FT
      </div>
      <div>
        <p className="text-sm font-medium text-stone-900">FQHC Talent Editorial Team</p>
        <p className="text-xs text-stone-500">FQHC Talent Exchange</p>
      </div>
    </div>
  );
}
