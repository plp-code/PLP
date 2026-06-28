import { MapPin, Lock, Unlock, ArrowRight, Loader2 } from "lucide-react";
import { MapItem } from "@/types";

interface Props {
  maps: MapItem[];
  onAction: (map: MapItem) => void;
  loadingId: number | null;
  isAuthenticated: boolean;
}

export function MapListView({
  maps,
  onAction,
  loadingId,
  isAuthenticated,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      {maps.map((map) => {
        const owned = map.is_purchased;

        return (
          <div
            key={map.id}
            className="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-plp-maroon/10 mt-0.5">
              <MapPin className="h-5 w-5 text-plp-maroon" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-gray-900">
                  {map.name}
                </h3>
                <span className="text-xs text-gray-400 font-medium">
                  {map.region || "Global"}
                </span>
                {owned ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700 border border-emerald-100">
                    <Unlock size={10} /> Owned
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-400 border border-gray-100">
                    <Lock size={10} /> Locked
                  </span>
                )}
              </div>

              {map.description && (
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600 line-clamp-3">
                  {map.description}
                </p>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-4 mt-0.5">
              {!owned && (
                <span className="hidden sm:block text-lg font-black text-gray-900">
                  ${(map.price / 100).toFixed(2)}
                </span>
              )}

              <button
                onClick={() => onAction(map)}
                disabled={loadingId === map.id}
                className={`group/btn flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-200 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-70 ${
                  owned
                    ? "bg-plp-maroon text-white hover:bg-red-800"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {loadingId === map.id ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    {owned
                      ? "View Map"
                      : isAuthenticated
                        ? "Buy Now"
                        : "Log In"}
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover/btn:translate-x-0.5"
                    />
                  </>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}