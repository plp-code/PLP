import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TextProps {
  children: ReactNode;
  className?: string;
}

export const Display = ({ children, className = "" }: TextProps) => (
  <p
    className={twMerge(
      "font-seventies leading-[0.9] tracking-[-0.035em] text-plp-maroon",
      className,
    )}
  >
    {children}
  </p>
);

export const Subtitle = ({ children, className = "" }: TextProps) => (
  <p
    className={twMerge(
      "font-bodoni leading-tight tracking-[-0.01em] text-plp-maroon",
      className,
    )}
  >
    {children}
  </p>
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