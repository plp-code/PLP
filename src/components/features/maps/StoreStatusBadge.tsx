interface StoreStatusBadgeProps {
  isOpen: boolean;
  isClosingSoon: boolean;
  compact?: boolean;
}

export function StoreStatusBadge({
  isOpen,
  isClosingSoon,
  compact = false,
}: StoreStatusBadgeProps) {
  const label = !isOpen
    ? "Closed"
    : isClosingSoon
      ? "Closing Soon"
      : "Open";

  return (
    <div
      className={`
        inline-flex shrink-0 items-center whitespace-nowrap rounded-full border font-bodoni font-semibold uppercase tracking-[0.1em]
        ${
          compact
            ? "gap-1.5 px-2.5 py-1 text-[10px]"
            : "gap-1.5 px-3 py-1.5 text-[11px]"
        }
        ${
          !isOpen
            ? "border-gray-200 bg-gray-50 text-gray-500"
            : isClosingSoon
              ? "border-amber-200 bg-amber-50 text-amber-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-700"
        }
      `}
    >
      <span
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
          !isOpen
            ? "bg-gray-400"
            : isClosingSoon
              ? "bg-amber-500 shadow-[0_0_4px_rgba(245,158,11,0.45)]"
              : "bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.45)]"
        }`}
      />

      {label}
    </div>
  );
}