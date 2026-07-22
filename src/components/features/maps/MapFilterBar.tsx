import { Search, Loader2, Navigation, Clock } from "lucide-react";

const PRICE_LEVELS: { level: number; label: string }[] = [
  { level: 1, label: "Unpaid Internship — $0-20" },
  { level: 2, label: "Entry-Level — $10-35" },
  { level: 3, label: "Promoted — $15-45" },
  { level: 4, label: "Corner Office — $18-70" },
];

interface MapFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  isOpenNow: boolean;
  onToggleOpenNow: () => void;
  activePrice: string | null;
  onPriceSelect: (value: string) => void;
  hasLocation: boolean;
  isLocating: boolean;
  onLocateToggle: () => void;
}

export function MapFilterBar({
  searchTerm,
  onSearchChange,
  isOpenNow,
  onToggleOpenNow,
  activePrice,
  onPriceSelect,
  hasLocation,
  isLocating,
  onLocateToggle,
}: MapFilterBarProps) {
  return (
    <>
      <div className="w-full max-w-md mx-auto pointer-events-auto bg-white/95 backdrop-blur-md rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200/50 p-2 flex items-center gap-3 transition-shadow focus-within:shadow-[0_4px_25px_rgba(0,0,0,0.12)]">
        <div className="bg-gray-100 p-2 rounded-full">
          <Search size={18} className="text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search locations..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-transparent border-none outline-none font-prata flex-1 tracking-wide text-base text-gray-900 placeholder-gray-400 font-medium"
        />
      </div>

      <div className="w-full max-w-md mx-auto pointer-events-auto flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={onLocateToggle}
          disabled={isLocating}
          className={`flex font-prata items-center gap-1.5 px-4 py-2 md:py-1.5 rounded-full text-xs font-bold border whitespace-nowrap shrink-0 transition-all shadow-sm active:scale-95 ${
            hasLocation
              ? "bg-blue-100 text-blue-800 border-blue-200"
              : "bg-white/95 backdrop-blur-md text-gray-600 border-gray-200/50 hover:bg-gray-50"
          }`}
        >
          {isLocating ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <Navigation size={12} className={hasLocation ? "text-blue-600" : ""} />
          )}
          Nearest
        </button>

        <button
          onClick={onToggleOpenNow}
          className={`flex font-prata items-center gap-1.5 px-4 py-2 md:py-1.5 rounded-full text-xs font-bold border whitespace-nowrap shrink-0 transition-all shadow-sm active:scale-95 ${
            isOpenNow
              ? "bg-emerald-100 text-emerald-800 border-emerald-200"
              : "bg-white/95 backdrop-blur-md text-gray-600 border-gray-200/50 hover:bg-gray-50"
          }`}
        >
          <Clock size={12} className={isOpenNow ? "text-emerald-600" : ""} />
          Open Now
        </button>

        <div className="flex shrink-0 items-center gap-0.5 rounded-full border border-gray-200/50 bg-white/95 p-0.5 shadow-sm backdrop-blur-md">
          {PRICE_LEVELS.map(({ level, label }) => {
            const value = String(level);
            const active = activePrice === value;
            return (
              <button
                key={level}
                type="button"
                title={label}
                aria-label={label}
                aria-pressed={active}
                onClick={() => onPriceSelect(value)}
                className={`rounded-full px-2.5 py-1.5 font-prata text-xs font-bold transition-all active:scale-95 md:py-1 ${
                  active
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {"$".repeat(level)}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
