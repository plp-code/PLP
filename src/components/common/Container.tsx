import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Whether to include the signature PLP bottom border */
  borderBottom?: boolean;
  /** Whether to remove horizontal padding for full-bleed sections */
  fullBleed?: boolean;
  /** Background color override */
  bg?: string;
}

export const Container = ({
  children,
  className = "",
  borderBottom = true,
  fullBleed = false,
  bg = "bg-plp-cream",
}: ContainerProps) => {
  return (
    <section
      className={`
        w-full 
        ${bg} 
        ${borderBottom ? "border-b-2 border-plp-maroon" : ""} 
        ${className}
      `}
    >
      <div
        className={`mx-auto max-w-450 ${fullBleed ? "" : "px-6 md:px-12 lg:px-16"}`}
      >
        {children}
      </div>
    </section>
  );
};
