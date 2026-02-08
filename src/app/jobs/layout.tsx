import { pageMetadata } from "@/lib/seo-config";

export const metadata = pageMetadata.jobs;

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
