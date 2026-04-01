export function AuthorByline() {
  return (
    <div className="flex items-center gap-3 mt-4 mb-8">
      <div className="size-10 rounded-full bg-teal-700 flex items-center justify-center text-white font-bold text-sm">
        JW
      </div>
      <div>
        <p className="text-sm font-medium text-stone-900">Jonathan Weingard</p>
        <p className="text-xs text-stone-500">Founder, FQHC Talent Exchange</p>
      </div>
    </div>
  );
}
