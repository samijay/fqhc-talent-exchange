import { type Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Trophy, GraduationCap, Award, Target, ArrowRight } from "lucide-react";
import { getContentById, CONTENT_TYPE_LABELS } from "@/lib/user-preferences";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const VALID_TYPES = new Set(["masterclass", "course", "assessment", "pathway", "certification"]);

/** Sanitize user-provided text: strip tags, limit length */
function sanitizeText(input: string | undefined, maxLength = 100): string {
  if (!input) return "";
  return input.replace(/<[^>]*>/g, "").replace(/[<>"'&]/g, "").trim().slice(0, maxLength);
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

interface PageProps {
  searchParams: Promise<{ type?: string; id?: string; name?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const type = VALID_TYPES.has(params.type ?? "") ? params.type : undefined;
  const id = sanitizeText(params.id, 200);
  const name = sanitizeText(params.name);

  const content = type && id ? getContentById(type, id) : null;
  const contentTitle = content?.title.en ?? id ?? "Achievement";
  const typeLabel = type && CONTENT_TYPE_LABELS[type]?.en
    ? CONTENT_TYPE_LABELS[type].en
    : "Content";

  const title = name
    ? `${name} completed "${contentTitle}" | FQHC Talent Exchange`
    : `${typeLabel}: ${contentTitle} | FQHC Talent Exchange`;

  const description = name
    ? `${name} completed the ${typeLabel.toLowerCase()} "${contentTitle}" on FQHC Talent Exchange — California's FQHC intelligence platform.`
    : `Explore "${contentTitle}" on FQHC Talent Exchange — California's FQHC intelligence platform.`;

  const ogImageUrl = `https://www.fqhctalent.com/api/og/achievement?type=${encodeURIComponent(type ?? "")}&id=${encodeURIComponent(id ?? "")}&name=${encodeURIComponent(name ?? "")}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://www.fqhctalent.com/share/achievement?type=${type}&id=${id}`,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Icon map                                                           */
/* ------------------------------------------------------------------ */

const TYPE_ICONS: Record<string, typeof Trophy> = {
  masterclass: GraduationCap,
  course: Award,
  assessment: Target,
  pathway: Trophy,
  certification: Award,
};

const TYPE_COLORS: Record<string, string> = {
  masterclass: "from-teal-600 to-teal-800",
  course: "from-amber-500 to-amber-700",
  assessment: "from-purple-600 to-purple-800",
  pathway: "from-emerald-600 to-emerald-800",
  certification: "from-blue-600 to-blue-800",
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function AchievementPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const type = VALID_TYPES.has(params.type ?? "") ? params.type : undefined;
  const id = sanitizeText(params.id, 200);
  const name = sanitizeText(params.name);

  const content = type && id ? getContentById(type, id) : null;
  const contentTitle = content?.title.en ?? id ?? "Achievement";
  const typeLabel = type && CONTENT_TYPE_LABELS[type]?.en
    ? CONTENT_TYPE_LABELS[type].en
    : "Achievement";

  const Icon = (type && TYPE_ICONS[type]) || Trophy;
  const gradient = (type && TYPE_COLORS[type]) || "from-teal-600 to-teal-800";

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        {/* Achievement Card */}
        <div className={`overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-8 text-white shadow-xl sm:p-12`}>
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 rounded-full bg-white/20 p-4 backdrop-blur-sm">
              <Icon className="size-10" />
            </div>

            {name && (
              <p className="mb-2 text-lg font-medium text-white/80">
                {name}
              </p>
            )}

            <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-white/60">
              {typeLabel} Completed
            </p>

            <h1 className="text-2xl font-extrabold sm:text-3xl">
              {contentTitle}
            </h1>

            <div className="mt-6 h-px w-16 bg-white/30" />

            <p className="mt-6 text-sm text-white/70">
              FQHC Talent Exchange
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="mb-4 text-stone-600">
            Explore California&apos;s FQHC intelligence platform
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            {content?.href && (
              <Link
                href={content.href as "/jobs"}
                className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-800"
              >
                View {typeLabel}
                <ArrowRight className="size-4" />
              </Link>
            )}
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
            >
              Explore Platform
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
