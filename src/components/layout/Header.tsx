"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/jobs", label: "Jobs" },
  { href: "/job-seekers", label: "For Job Seekers" },
  { href: "/employers", label: "For Employers" },
  { href: "/pricing", label: "Pricing" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Heart className="size-7 fill-teal-600 text-teal-600" />
          <span className="text-xl font-bold tracking-tight text-stone-900">
            FQHC <span className="text-teal-600">Talent</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="outline"
            className="border-teal-600 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
            asChild
          >
            <Link href="/join">Join as Candidate</Link>
          </Button>
          <Button
            className="bg-teal-600 text-white hover:bg-teal-700"
            asChild
          >
            <Link href="/post-job">Post a Job</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-stone-600 hover:bg-stone-100 hover:text-stone-900 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-stone-200 bg-white md:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-3">
              <Button
                variant="outline"
                className="w-full border-teal-600 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
                asChild
              >
                <Link href="/join">Join as Candidate</Link>
              </Button>
              <Button
                className="w-full bg-teal-600 text-white hover:bg-teal-700"
                asChild
              >
                <Link href="/post-job">Post a Job</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
