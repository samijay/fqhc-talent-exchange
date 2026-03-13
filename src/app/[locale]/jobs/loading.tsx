export default function JobsLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 gap-4">
      <div className="h-10 w-10 rounded-full border-4 border-teal-200 border-t-teal-600 animate-spin" />
      <p className="text-sm text-stone-500 dark:text-stone-400 animate-pulse">
        Loading job listings...
      </p>
    </div>
  );
}
