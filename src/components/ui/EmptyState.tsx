import type { ReactNode } from "react";

interface EmptyStateProps {
  message: string;
  description?: string;
  align?: "left" | "center";
  icon?: ReactNode;
  eyebrow?: string;
  bordered?: boolean;
}

export function EmptyState({
  message,
  description,
  align = "left",
  icon,
  eyebrow,
  bordered = true,
}: EmptyStateProps) {
  const isCenter = align === "center";

  return (
    <div
      className={[
        "w-full px-6 py-14 md:px-10 md:py-20",
        bordered
          ? "rounded-sm border border-dashed border-plp-maroon/20 bg-plp-maroon/[0.025]"
          : "",
        isCenter ? "mx-auto flex flex-col items-center text-center" : "",
      ].join(" ")}
    >
      {icon && (
        <div
          className={`mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-plp-maroon/20 text-plp-maroon/50 ${
            isCenter ? "" : "-ml-1"
          }`}
        >
          {icon}
        </div>
      )}

      {eyebrow && (
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-plp-maroon/50">
          {eyebrow}
        </p>
      )}

      <h2 className="max-w-[520px] font-bodoni text-3xl font-semibold leading-[1.1] tracking-tight text-plp-maroon md:text-4xl">
        {message}
      </h2>

      <div
        className={`mt-5 h-px w-10 bg-plp-maroon/30 ${isCenter ? "mx-auto" : ""}`}
        aria-hidden
      />

      {description && (
        <p
          className={`mt-5 max-w-[440px] font-prata text-[15px] leading-7 text-plp-maroon/70 ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}

    </div>
  );
}