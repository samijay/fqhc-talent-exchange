import { pageMetadata } from "@/lib/seo-config";

export const metadata = pageMetadata.forEmployers;

export default function ForEmployersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
