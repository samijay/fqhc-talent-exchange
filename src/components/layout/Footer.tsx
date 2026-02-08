import Link from "next/link";
import { Heart } from "lucide-react";

const footerLinks = {
  "For Job Seekers": [
    { href: "/jobs", label: "Browse Jobs" },
    { href: "/job-seekers", label: "How It Works" },
    { href: "/resources", label: "Career Resources" },
    { href: "/faq", label: "FAQ" },
  ],
  "For Employers": [
    { href: "/post-job", label: "Post a Job" },
    { href: "/employers", label: "Why FQHC Talent" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact Sales" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/blog", label: "Blog" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo & description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="size-6 fill-teal-600 text-teal-600" />
              <span className="text-lg font-bold tracking-tight text-stone-900">
                FQHC <span className="text-teal-600">Talent</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-stone-500">
              The only talent exchange built exclusively for Federally Qualified
              Health Centers. Connecting mission-driven professionals with
              community health organizations.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold text-stone-900">{heading}</h3>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-stone-500 transition-colors hover:text-teal-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-stone-200 pt-6">
          <p className="text-center text-sm text-stone-400">
            &copy; {new Date().getFullYear()} FQHC Talent Exchange. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
