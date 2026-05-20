import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TextProps {
  children: ReactNode;
  className?: string;
}

export const Display = ({ children, className = "" }: TextProps) => (
  <p
    className={twMerge(
      "font-seventies text-plp-maroon leading-[0.85] tracking-tighter",
      className,
    )}
  >
    {children}
  </p>
);

export const Subtitle = ({ children, className = "" }: TextProps) => (
  <p
    className={twMerge(
      "font-bodoni lg:text-4xl md:text-2xl leading-tight",
      className,
    )}
  >
    {children}
  </p>
);

export const Label = ({ children, className = "" }: TextProps) => (
  <span
    className={twMerge(
      "text-sm font-prata font-bold uppercase tracking-widest",
      className,
    )}
  >
    {children}
  </span>
);
