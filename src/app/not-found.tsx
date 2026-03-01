// Custom 404 Not Found page
import Link from "next/link";
import { Heart, ArrowRight, Search, Map, FileText, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      {/* Mini header */}
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="size-7 fill-teal-700 text-teal-700" />
            <span className="text-xl font-bold tracking-tight text-stone-900">
              FQHC <span className="text-teal-700">Talent</span>
            </span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="text-center">
          <div className="mb-6 text-8xl font-extrabold text-stone-200 sm:text-9xl">
            404
          </div>
          <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            Page Not Found
          </h1>
          <p className="mx-auto mt-3 max-w-md text-stone-500">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Here are some helpful links to get you back on track.
          </p>

          <div className="mx-auto mt-8 grid max-w-lg gap-3 sm:grid-cols-2">
            <Link
              href="/"
              className="group flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 transition-all hover:border-teal-200 hover:shadow-md"
            >
              <BarChart3 className="size-5 shrink-0 text-teal-600" />
              <div className="text-left">
                <span className="text-sm font-medium text-stone-900 group-hover:text-teal-700">
                  Strategic Monitor
                </span>
                <span className="block text-xs text-stone-400">Homepage</span>
              </div>
            </Link>
            <Link
              href="/directory"
              className="group flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 transition-all hover:border-teal-200 hover:shadow-md"
            >
              <Map className="size-5 shrink-0 text-teal-600" />
              <div className="text-left">
                <span className="text-sm font-medium text-stone-900 group-hover:text-teal-700">
                  FQHC Directory
                </span>
                <span className="block text-xs text-stone-400">220 FQHCs</span>
              </div>
            </Link>
            <Link
              href="/jobs"
              className="group flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 transition-all hover:border-teal-200 hover:shadow-md"
            >
              <Search className="size-5 shrink-0 text-teal-600" />
              <div className="text-left">
                <span className="text-sm font-medium text-stone-900 group-hover:text-teal-700">
                  Browse Jobs
                </span>
                <span className="block text-xs text-stone-400">177+ listings</span>
              </div>
            </Link>
            <Link
              href="/insights"
              className="group flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 transition-all hover:border-teal-200 hover:shadow-md"
            >
              <FileText className="size-5 shrink-0 text-teal-600" />
              <div className="text-left">
                <span className="text-sm font-medium text-stone-900 group-hover:text-teal-700">
                  Intelligence
                </span>
                <span className="block text-xs text-stone-400">Dashboard</span>
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
      </main>
    </div>
  );
}
