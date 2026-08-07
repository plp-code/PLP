interface StoreStatusBadgeProps {
  isOpen: boolean;
  isClosingSoon: boolean;
}

export function StoreStatusBadge({
  isOpen,
  isClosingSoon,
}: StoreStatusBadgeProps) {
  return (
    <div
      className={`flex items-center font-bodoni gap-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm ${
        !isOpen
          ? "text-gray-600 bg-white/85"
          : isClosingSoon
            ? "text-amber-700 bg-white/90"
            : "text-emerald-700 bg-white/90"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          !isOpen
            ? "bg-gray-400"
            : isClosingSoon
              ? "bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.6)]"
              : "bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.6)]"
        }`}
      />
      {!isOpen ? "Closed" : isClosingSoon ? "Closing Soon" : "Open"}
    </div>
  );
}
