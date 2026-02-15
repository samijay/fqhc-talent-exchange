import { pageMetadata } from "@/lib/seo-config";

export const metadata = pageMetadata.terms;

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
