import { pageMetadata } from "@/lib/seo-config";

export const metadata = pageMetadata.directory;

export default function DirectoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
