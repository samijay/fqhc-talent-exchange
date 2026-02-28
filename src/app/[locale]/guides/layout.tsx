import { pageMetadata } from "@/lib/seo-config";

export const metadata = pageMetadata.guides;

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
