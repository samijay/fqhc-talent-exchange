export default function StrategyLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 gap-4">
      <div className="h-10 w-10 rounded-full border-4 border-teal-200 border-t-teal-600 motion-safe:animate-spin" />
      <p className="text-sm text-stone-500 dark:text-stone-500 motion-safe:animate-pulse">
        Loading strategy tools...
      </p>
    </div>
  );
}
