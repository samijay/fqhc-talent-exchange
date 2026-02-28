import { pageMetadata } from "@/lib/seo-config";

export const metadata = pageMetadata.insights;

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
