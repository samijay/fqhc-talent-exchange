import Link from "next/link";
import { ArrowRight, Search, Map, FileText, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LocaleNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-20">
      <div className="text-center">
        <div className="mb-6 text-8xl font-extrabold text-stone-200 sm:text-9xl">
          404
        </div>
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 sm:text-3xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-3 max-w-md text-stone-500 dark:text-stone-500">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Here are some helpful links to get you back on track.
        </p>

        <div className="mx-auto mt-8 grid max-w-lg gap-3 sm:grid-cols-2">
          <Link
            href="/"
            className="group flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 transition-all hover:border-teal-200 hover:shadow-md dark:border-stone-700 dark:bg-stone-800 dark:hover:border-teal-700"
          >
            <BarChart3 className="size-5 shrink-0 text-teal-600" />
            <div className="text-left">
              <span className="text-sm font-medium text-stone-900 group-hover:text-teal-700 dark:text-stone-100">
                Strategic Monitor
              </span>
              <span className="block text-xs text-stone-500">Homepage</span>
            </div>
          </Link>
          <Link
            href="/directory"
            className="group flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 transition-all hover:border-teal-200 hover:shadow-md dark:border-stone-700 dark:bg-stone-800 dark:hover:border-teal-700"
          >
            <Map className="size-5 shrink-0 text-teal-600" />
            <div className="text-left">
              <span className="text-sm font-medium text-stone-900 group-hover:text-teal-700 dark:text-stone-100">
                FQHC Directory
              </span>
              <span className="block text-xs text-stone-500">220 FQHCs</span>
            </div>
          </Link>
          <Link
            href="/jobs"
            className="group flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 transition-all hover:border-teal-200 hover:shadow-md dark:border-stone-700 dark:bg-stone-800 dark:hover:border-teal-700"
          >
            <Search className="size-5 shrink-0 text-teal-600" />
            <div className="text-left">
              <span className="text-sm font-medium text-stone-900 group-hover:text-teal-700 dark:text-stone-100">
                Browse Jobs
              </span>
              <span className="block text-xs text-stone-500">1,700+ listings</span>
            </div>
          </Link>
          <Link
            href="/salary-data"
            className="group flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 transition-all hover:border-teal-200 hover:shadow-md dark:border-stone-700 dark:bg-stone-800 dark:hover:border-teal-700"
          >
            <FileText className="size-5 shrink-0 text-teal-600" />
            <div className="text-left">
              <span className="text-sm font-medium text-stone-900 group-hover:text-teal-700 dark:text-stone-100">
                Salary Data
              </span>
              <span className="block text-xs text-stone-500">30 roles × 9 regions</span>
            </div>
          </Link>
        </div>

        <div className="mt-8">
          <Button variant="outline" asChild>
            <Link href="/">
              Go to Homepage <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
