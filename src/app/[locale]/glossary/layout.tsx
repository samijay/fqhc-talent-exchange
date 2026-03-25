import { pageMetadata } from "@/lib/seo-config";

export const metadata = pageMetadata.glossary;

export default function GlossaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
