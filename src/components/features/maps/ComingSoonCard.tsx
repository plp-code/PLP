import { MapItem } from "@/types/models";
import { Loader2 } from "lucide-react";
import {
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  BellRing,
} from "lucide-react";

interface WaitlistButtonProps {
  slug: string;
  joined: boolean;
  disabled: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onJoin: (slug: string) => void;
}

function WaitlistButton({
  slug,
  joined,
  disabled,
  loading,
  fullWidth,
  onJoin,
}: WaitlistButtonProps) {
  return (
    <button
      onClick={() => onJoin(slug)}
      disabled={disabled || joined || loading}
      className={`group/wl font-prata flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-plp-maroon px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:bg-red-800 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {loading ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          Joining...
        </>
      ) : joined ? (
        <>
          <CheckCircle2 size={16} />
          On the Waitlist
        </>
      ) : (
        <>
          Join Waitlist
          <ArrowRight
            size={14}
            className="transition-transform group-hover/wl:translate-x-0.5"
          />
        </>
      )}
    </button>
  );
}
  
interface ComingSoonProps {
  map: MapItem;
  disabled: boolean;
  isLoading?: boolean;
  onJoin: (slug: string) => void;
}

export function ComingSoonCard({ map, disabled, isLoading, onJoin }: ComingSoonProps) {  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-dashed border-plp-maroon/25 bg-plp-maroon/[0.02] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-plp-maroon/40 hover:shadow-lg">
      <div className="h-1.5 w-full bg-gradient-to-r from-plp-maroon/40 to-plp-babyblue/40" />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="inline-flex min-w-0 items-center gap-1.5 text-xs font-medium text-gray-500">
            <MapPin size={14} className="shrink-0 text-gray-400" />
            <span className="truncate">{map.region || "Global"}</span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-plp-maroon/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-plp-maroon">
            <Clock size={12} /> Coming Soon
          </span>
        </div>

        <h3 className="mb-2 text-lg font-bold leading-tight text-gray-900 sm:text-xl">
          {map.name}
        </h3>

        <div className="mb-6 flex-1">
          <p className="inline-flex items-start gap-1.5 text-sm leading-relaxed text-gray-600">
            <BellRing
              size={14}
              className="mt-0.5 shrink-0 text-plp-maroon/60"
            />
            {map.description || "Join the waitlist to be notified when it launches."}
          </p>
        </div>

        <div className="mt-auto border-t border-gray-100 pt-4 sm:pt-5">
      <WaitlistButton 
            slug={map.slug}
            disabled={disabled} 
            loading={isLoading}
            onJoin={onJoin} 
            joined={map.is_waitlisted} 
            fullWidth 
          />
        </div>
      </div>
    </div>
  );
}

export function ComingSoonRow({ map, disabled, isLoading, onJoin }: ComingSoonProps) {  return (
    <div className="group flex items-start gap-4 rounded-2xl border border-dashed border-plp-maroon/25 bg-plp-maroon/[0.02] p-4 shadow-sm transition-all duration-200 hover:border-plp-maroon/40 hover:shadow-md">
      <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-plp-maroon/10">
        <MapPin className="h-5 w-5 text-plp-maroon" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-bold text-gray-900">{map.name}</h3>
          <span className="text-xs font-medium text-gray-400">
            {map.region || "Global"}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-plp-maroon/15 bg-plp-maroon/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-plp-maroon">
            <Clock size={10} /> Coming Soon
          </span>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-gray-600 line-clamp-3">
          {map.description || "Join the waitlist to be notified when this map launches."}
        </p>
      </div>

      <div className="mt-0.5 flex shrink-0 items-center">
        <WaitlistButton 
            slug={map.slug}
            disabled={disabled} 
            loading={isLoading}
            onJoin={onJoin} 
            joined={map.is_waitlisted} 
        />
      </div>
    </div>
  );
}