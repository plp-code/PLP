import type { ElementType, ReactNode } from "react";
import { Container } from "./Container";
import { twMerge } from "tailwind-merge";

interface BannerProps {
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  as?: ElementType;
  id?: string;
}

export default function Banner({
  children,
  className,
  contentClassName,
  eyebrow,
  title,
  description,
  as: Component = "section",
  id,
}: BannerProps) {
  const hasHeadingContent = Boolean(eyebrow || title || description);

  return (
    <Container
      fullBleed
      as={Component}
      contentClassName={twMerge(
        "relative px-6 md:px-12 lg:px-16 py-12 md:py-16",
        hasHeadingContent && "whitespace-normal",
        contentClassName,
      )}
      className={twMerge(
        "bg-plp-maroon text-plp-lime overflow-hidden border-b-2 border-plp-maroon",
        className,
      )}
      bg="bg-transparent"
      {...(id ? { id } : {})}
    >
      {hasHeadingContent ? (
        <div>
          {eyebrow ? (
            <p className="mb-3 text-[10px] md:text-xs font-black uppercase tracking-[0.35em] text-plp-parchment/60">
              {eyebrow}
            </p>
          ) : null}

          {title ? (
            <p className="font-bodoni text-[9vw] md:text-[5vw] lg:text-[3.5vw] leading-[0.9] tracking-tighter text-plp-parchment">
              {title}
            </p>
          ) : null}

          {description ? (
            <p className="italic mt-4 max-w-2xl text-base md:text-large leading-relaxed text-plp-parchment/80">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}

      {children}
    </Container>
  );
}
