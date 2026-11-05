import { Clock, MapPin } from "lucide-react";
import type { InPersonEvent } from "@/data/experiences";
import { Action } from "../shared/Action";

const MONTH_FMT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});

const WEEKDAY_FMT = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  timeZone: "UTC",
});

export function EventRow({ event }: { event: InPersonEvent }) {
  if (!event.date) return null;

  const date = new Date(`${event.date}T00:00:00Z`);

  if (Number.isNaN(date.getTime())) return null;

  return (
    <li className="grid grid-cols-[64px_minmax(0,1fr)] items-start gap-x-5 gap-y-6 border-b border-plp-maroon/15 py-8 md:grid-cols-[88px_minmax(0,1fr)_auto] md:items-center md:gap-x-10 md:py-10">
      <div className="flex w-16 flex-col items-center border border-plp-maroon/25 px-2 py-3 md:w-[88px] md:py-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-plp-maroon/60">
          {MONTH_FMT.format(date)}
        </span>

        <span className="mt-1 font-seventies text-[36px] leading-none text-plp-maroon md:text-[46px]">
          {date.getUTCDate()}
        </span>

        <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-plp-maroon/50">
          {WEEKDAY_FMT.format(date)}
        </span>
      </div>

      <div className="min-w-0">
        <h3 className="font-bodoni text-[23px] font-semibold leading-tight text-plp-maroon md:text-[28px]">
          {event.title}
        </h3>

        <p className="mt-3 max-w-[58ch] font-prata text-[13px] leading-6 text-plp-maroon/70 md:text-[14px]">
          {event.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.1em] text-plp-maroon/55">
          {event.time && (
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} strokeWidth={1.5} />
              {event.time}
            </span>
          )}

          {event.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={13} strokeWidth={1.5} />
              {event.location}
            </span>
          )}
        </div>
      </div>

      <div className="col-span-2 flex items-center justify-between gap-4 pl-0 md:col-span-1 md:flex-col md:items-end md:gap-5">
        {event.price && (
          <span className="font-bodoni text-[22px] text-plp-maroon">
            {event.price}
          </span>
        )}

        <Action href={event.href} label="RSVP" />
      </div>
    </li>
  );
}
