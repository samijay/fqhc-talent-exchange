import type { Metadata } from "next";
import { OKR_COURSE_MODULES } from "@/lib/okr-course-modules";
import { SITE_URL } from "@/lib/seo-config";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

type Props = {
  params: Promise<{ moduleId: string }>;
};

// Pre-render all known module pages at build time
export function generateStaticParams() {
  return OKR_COURSE_MODULES.map((m) => ({
    moduleId: m.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { moduleId } = await params;
  const courseModule = OKR_COURSE_MODULES.find((m) => m.id === moduleId);

  if (!courseModule) {
    return {
      title: "Module Not Found | FQHC Talent",
    };
  }

  const title = courseModule.title.en;
  const description = `${courseModule.subtitle.en}. Free interactive module with ${courseModule.exercises.length} exercises. Part of the FQHC OKR Course.`;

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

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const courseModule = OKR_COURSE_MODULES.find((m) => m.id === moduleId);
  const title = courseModule?.title.en ?? "Module";

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "FQHC Talent", url: "https://www.fqhctalent.com" },
          { name: "Strategy", url: "https://www.fqhctalent.com/strategy/okrs" },
          { name: "OKR Course", url: "https://www.fqhctalent.com/strategy/okr-course" },
          { name: title, url: `https://www.fqhctalent.com/strategy/okr-course/${moduleId}` },
        ]}
      />
      {children}
    </>
  );
}
