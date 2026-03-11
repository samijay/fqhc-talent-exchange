import { pageMetadata } from "@/lib/seo-config";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { SocialShare } from "@/components/blog/SocialShare";

export const metadata = pageMetadata.blog;

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ReadingProgressBar />
      {children}
      <SocialShare />
    </>
  );
}
