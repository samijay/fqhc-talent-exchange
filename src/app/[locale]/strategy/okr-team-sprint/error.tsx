"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function TeamSprintError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center gap-4">
      <AlertTriangle className="h-12 w-12 text-amber-500" aria-hidden="true" />
      <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100">
        Something went wrong
      </h2>
      <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md">
        The team sprint encountered an unexpected error. Your sprint data is
        saved and won&apos;t be lost.
      </p>
      {process.env.NODE_ENV === "development" && (
        <pre className="text-xs text-red-500 bg-red-50 dark:bg-red-950 p-3 rounded-lg max-w-lg overflow-auto">
          {error.message}
        </pre>
      )}
      <Button
        onClick={reset}
        className="bg-teal-600 hover:bg-teal-700 text-white"
      >
        Try Again
      </Button>
    </div>
  );
}
