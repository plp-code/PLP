
import { ArrowUpRight, CalendarClock } from "lucide-react";
import Link from "next/link";
import type { InPersonEvent } from "@/data/experiences";

export function PlannedEventCard({
  event,
}: {
  event: InPersonEvent;
}) {
  return (
    <article className="group flex h-full flex-col border border-plp-maroon/15 bg-plp-maroon/[0.025] p-6 transition-colors duration-200 hover:border-plp-maroon/35 md:p-7">
      <div className="mb-7 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-plp-maroon/50">
        <CalendarClock size={14} strokeWidth={1.5} />
        <span>Date to be announced</span>
      </div>

      <h3 className="font-bodoni text-[23px] font-semibold leading-tight text-plp-maroon md:text-[26px]">
        {event.title}
      </h3>

      <p className="mt-4 flex-1 font-prata text-[13px] leading-6 text-plp-maroon/65">
        {event.description}
      </p>

      <div className="mt-8 border-t border-plp-maroon/10 pt-5">
        {event.href ? (
          <Link
            href={event.href}
            className="inline-flex items-center gap-2 font-prata text-[11px] font-semibold uppercase tracking-[0.1em] text-plp-maroon hover:underline"
          >
            Learn more
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        ) : (
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-plp-maroon/45">
            More details to come
          </span>
        )}
      </div>
    </article>
  );
}
