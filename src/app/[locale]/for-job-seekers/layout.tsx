import { pageMetadata } from "@/lib/seo-config";

export const metadata = pageMetadata.forJobSeekers;

export default function ForJobSeekersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
