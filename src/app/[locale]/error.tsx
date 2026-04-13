"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="text-2xl font-bold text-stone-900">
        Something went wrong
      </h2>
      <p className="mt-2 max-w-md text-sm text-stone-600">
        We hit an unexpected error loading this page. This is usually temporary
        — try refreshing.
      </p>
      <div className="mt-6 flex gap-3">
        <button
          onClick={reset}
          className="rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-lg border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50"
        >
          Go home
        </Link>
      </div>
      {error.digest && (
        <p className="mt-4 text-xs text-stone-400">Error ID: {error.digest}</p>
      )}
    </div>
  );
}
