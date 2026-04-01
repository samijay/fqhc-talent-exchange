import { pageMetadata } from "@/lib/seo-config";

export const metadata = pageMetadata.salaryCalculator;

export default function SalaryCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
