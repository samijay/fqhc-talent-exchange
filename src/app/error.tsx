// Global error boundary — catches runtime errors and shows a friendly fallback
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Heart, ArrowRight, RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error for debugging (shows in browser console)
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      {/* Mini header */}
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="size-7 fill-teal-700 text-teal-700" aria-hidden="true" />
            <span className="text-xl font-bold tracking-tight text-stone-900">
              FQHC <span className="text-teal-700">Talent</span>
            </span>
          </Link>
        </div>
      </header>

      {/* Error content */}
      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-amber-100">
            <AlertTriangle className="size-8 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            Something went wrong
          </h1>
          <p className="mx-auto mt-3 text-stone-500">
            An unexpected error occurred. You can try again or return to the
            homepage.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              onClick={reset}
              variant="brand"
            >
              <RefreshCw className="mr-2 size-4" />
              Try Again
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">
                Go to Homepage <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>

          {error.digest && (
            <p className="mt-6 text-xs text-stone-500">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
