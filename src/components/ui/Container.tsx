import type { ElementType, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  fullBleed?: boolean;
  bg?: string;
  as?: ElementType;
}

export const Container = ({
  children,
  className,
  contentClassName,
  fullBleed = false,
  bg = "bg-transparent",
  as: Component = "section",
}: ContainerProps) => {
  return (
    <Component className={twMerge("w-full", bg, className)}>
      <div
        className={twMerge(
          "mx-auto w-full max-w-7xl",
          !fullBleed && "px-5 sm:px-6 md:px-10 lg:px-16",
          contentClassName,
        )}
      >
        {children}
      </div>
    </Component>
  );
};
