import { pageMetadata } from "@/lib/seo-config";

export const metadata = pageMetadata.resources;

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
