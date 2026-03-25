interface SectionContainerProps {
  /** Padding tier: sm = py-8 sm:py-12, md = py-12 sm:py-16, lg = py-16 sm:py-24 */
  size?: "sm" | "md" | "lg";
  /** Max content width */
  maxWidth?: "narrow" | "default" | "wide";
  /** Background color class */
  bg?: string;
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export function SectionContainer({
  size = "md",
  maxWidth = "default",
  bg = "bg-white",
  id,
  className = "",
  children,
}: SectionContainerProps) {
  const padding: Record<string, string> = {
    sm: "py-8 sm:py-12",
    md: "py-12 sm:py-16",
    lg: "py-16 sm:py-24",
  };

  const width: Record<string, string> = {
    narrow: "max-w-3xl",
    default: "max-w-6xl",
    wide: "max-w-7xl",
  };

  return (
    <section id={id} className={`scroll-mt-16 px-4 sm:px-6 lg:px-8 ${bg} ${padding[size]} ${className}`}>
      <div className={`mx-auto ${width[maxWidth]}`}>{children}</div>
    </section>
  );
}
