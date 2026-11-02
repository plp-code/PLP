import { MapItem } from "@/types/models";
import { MapPin, Clock } from "lucide-react";
import { WaitlistInlineForm, type WaitlistControls } from "./WaitlistInlineForm";

interface ComingSoonProps {
  map: MapItem;
  waitlist: WaitlistControls;
}

const statusLabel = (map: MapItem) =>
  map.status === "next" ? "Up Next" : "Coming Soon";

export function ComingSoonCard({ map, waitlist }: ComingSoonProps) {
  return (
    <article className="group relative flex flex-col border border-dashed border-plp-maroon/30 bg-plp-maroon/[0.02] transition-all duration-300 hover:-translate-y-0.5 hover:border-plp-maroon/50">
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <span className="inline-flex min-w-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-plp-maroon/55">
            <MapPin size={12} strokeWidth={1.5} className="shrink-0" />
            <span className="truncate">{map.region || "Global"}</span>
          </span>
          <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.16em] text-plp-maroon/60">
            [{statusLabel(map)}]
          </span>
        </div>

        <h3 className="font-bodoni text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] text-plp-maroon">
          {map.name}
        </h3>

        <p className="mb-6 mt-3 line-clamp-4 flex-1 font-prata text-[13px] leading-6 text-plp-maroon/60">
          {map.description}
        </p>

        <div className="mt-auto border-t border-plp-maroon/10 pt-4">
          <WaitlistInlineForm map={map} controls={waitlist} fullWidth />
        </div>
      </div>
    </article>
  );
}

export function ComingSoonRow({ map, waitlist }: ComingSoonProps) {
  return (
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
            <Clock size={10} /> {map.status === "next" ? "Next" : "Coming Soon"}
          </span>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-gray-600 line-clamp-3">
          {map.description}
        </p>
      </div>

      <div className="mt-0.5 w-64 shrink-0">
        <WaitlistInlineForm map={map} controls={waitlist} fullWidth />
      </div>
    </div>
  );
}
