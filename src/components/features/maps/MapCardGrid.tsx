import { MapPin, ArrowRight, Loader2, Check } from "lucide-react";
import { MapItem } from "@/types";

interface Props {
  map: MapItem;
  onAction: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function MapCardGrid({ map, onAction, isLoading }: Props) {
  const owned = map.is_purchased;

  return (
    <article className="group relative flex flex-col border border-plp-maroon/15 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-plp-maroon/40 hover:shadow-[0_12px_32px_-16px_rgba(80,0,20,0.35)]">
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <span className="inline-flex min-w-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-plp-maroon/55">
            <MapPin size={12} strokeWidth={1.5} className="shrink-0" />
            <span className="truncate">{map.region || "Global"}</span>
          </span>

          {owned && (
            <span className="inline-flex shrink-0 items-center gap-1 border border-plp-maroon/25 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-plp-maroon">
              <Check size={10} strokeWidth={2} /> Owned
            </span>
          )}
        </div>

        <h3 className="font-bodoni text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] text-plp-maroon">
          {map.name}
        </h3>

        <p className="mb-6 mt-3 line-clamp-4 flex-1 font-prata text-[13px] leading-6 text-plp-maroon/65">
          {map.description || "No description available for this map."}
        </p>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-plp-maroon/10 pt-4">
          {!owned ? (
            <div className="flex shrink-0 flex-col">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-plp-maroon/40">
                Price
              </span>
              <span className="mt-1 font-bodoni text-2xl font-semibold leading-none text-plp-maroon">
                ${(map.price / 100).toFixed(2)}
              </span>
            </div>
          ) : (
            <span />
          )}

          <button
            type="button"
            onClick={onAction}
            disabled={isLoading}
            className={`group/btn flex min-w-32 cursor-pointer items-center justify-center gap-2 px-5 py-2.5 font-prata text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
              owned
                ? "border border-plp-maroon text-plp-maroon hover:bg-plp-maroon hover:text-white"
                : "bg-plp-maroon text-white hover:bg-plp-maroon/85"
            }`}
          >
            {isLoading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <>
                {owned ? "View Map" : "Buy Map"}
                <ArrowRight
                  size={13}
                  strokeWidth={1.75}
                  className="transition-transform group-hover/btn:translate-x-0.5"
                />
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
