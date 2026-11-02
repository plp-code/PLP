import type { ElementType, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TextProps {
  children: ReactNode;
  className?: string;
}

interface HeadingProps extends TextProps {
  as?: ElementType;
  id?: string;
}

export const Display = ({
  children,
  className = "",
  as: Component = "p",
  id,
}: HeadingProps) => (
  <Component
    id={id}
    className={twMerge(
      "font-seventies leading-[0.9] tracking-[-0.035em] text-plp-maroon",
      className,
    )}
  >
    {children}
  </Component>
);

export const Subtitle = ({
  children,
  className = "",
  as: Component = "p",
  id,
}: HeadingProps) => (
  <Component
    id={id}
    className={twMerge(
      "font-bodoni leading-tight tracking-[-0.01em] text-plp-maroon",
      className,
    )}
  >
    {children}
  </Component>
);

export const Label = ({ children, className = "" }: TextProps) => (
  <span
    className={twMerge(
      "font-prata text-sm font-semibold uppercase tracking-[0.12em]",
      className,
    )}
  >
    {children}
  </span>
);