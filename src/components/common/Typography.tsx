import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TextProps {
  children: ReactNode;
  className?: string;
}

export const Display = ({ children, className = "" }: TextProps) => (
  <h1
    className={twMerge(
      "font-seventies text-6xl md:text-9xl capitalize tracking-tight leading-none",
      className,
    )}
  >
    {children}
  </h1>
);

export const Manifesto = ({ children, className = "" }: TextProps) => (
  <p
    className={twMerge(
      "font-Bodoni lg:text-4xl md:text-2xl leading-tight",
      className,
    )}
  >
    {children}
  </p>
);

export const Label = ({ children, className = "" }: TextProps) => (
  <span
    className={twMerge(
      "text-sm font-text-serif font-bold uppercase tracking-widest",
      className,
    )}
  >
    {children}
  </span>
);
