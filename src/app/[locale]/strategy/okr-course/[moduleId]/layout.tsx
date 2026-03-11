import type { Metadata } from "next";
import { OKR_COURSE_MODULES } from "@/lib/okr-course-modules";
import { SITE_URL } from "@/lib/seo-config";

type Props = {
  params: Promise<{ moduleId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { moduleId } = await params;
  const module = OKR_COURSE_MODULES.find((m) => m.id === moduleId);

  if (!module) {
    return {
      title: "Module Not Found | FQHC Talent",
    };
  }

  const title = module.title.en;
  const description = `${module.subtitle.en}. Free interactive module with ${module.exercises.length} exercises. Part of the FQHC OKR Course.`;

  return {
    title: `${title} | FQHC OKR Course`,
    description,
    openGraph: {
      title: `${title} — FQHC Academy`,
      description,
      url: `${SITE_URL}/strategy/okr-course/${moduleId}`,
    },
    alternates: {
      canonical: `${SITE_URL}/strategy/okr-course/${moduleId}`,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
