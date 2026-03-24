import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Executive Masterclass Course",
  description: "Interactive executive training modules for FQHC leaders — hands-on exercises, real-world scenarios, and progress tracking.",
};

export default function MasterclassCourseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
