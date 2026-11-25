interface StoreStatusBadgeProps {
  isOpen: boolean;
  isClosingSoon?: boolean;
  compact?: boolean;
}

export function StoreStatusBadge({
  isOpen,
  isClosingSoon = false,
  compact = false,
}: StoreStatusBadgeProps) {
  const status = !isOpen
    ? {
        label: "Closed",
        style: "bg-plp-secondary-light text-plp-clay",
        dot: "bg-plp-secondary-dark",
      }
    : isClosingSoon
      ? {
          label: "Closing soon",
          style: "bg-amber-50 text-amber-800",
          dot: "bg-amber-500",
        }
      : {
          label: "Open now",
          style: "bg-plp-lime/30 text-plp-olive",
          dot: "bg-plp-olive",
        };

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md font-text font-medium ${status.style} ${
        compact ? "px-2 py-1 text-[10px]" : "px-2.5 py-1.5 text-[11px]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${status.dot}`}
      />

      {status.label}
    </span>
  );
}
