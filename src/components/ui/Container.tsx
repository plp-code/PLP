import type { ReactNode, ElementType } from "react";
import { twMerge } from "tailwind-merge";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  fullBleed?: boolean;
  bg?: string;
  contentClassName?: string;
  as?: ElementType;
}

export const Container = ({
  children,
  className = "",
  fullBleed = false,
  bg = "bg-transparent",
  contentClassName = "",
  as: Component = "section",
}: ContainerProps) => {
  return (
    <Component
      className={twMerge(
        "w-full",
        bg,
        className
      )}
    >
      <div
        className={twMerge(
          "mx-auto max-w-7xl",
          contentClassName,
          !fullBleed && "px-6 md:px-12 lg:px-16"
        )}
      >
        {children}
      </div>
    </Component>
  );
};
