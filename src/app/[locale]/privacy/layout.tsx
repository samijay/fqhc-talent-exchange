import { pageMetadata } from "@/lib/seo-config";

export const metadata = pageMetadata.privacy;

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
