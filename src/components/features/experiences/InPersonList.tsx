import type { InPersonEvent } from "@/data/experiences";
import { EmptyState } from "@/components/ui/EmptyState";
import { EventRow } from "./EventRow";
import { PlannedEventCard } from "./PlannedEventsCard";
import { CalendarIcon } from "lucide-react";

export function InPersonList({ events }: { events: InPersonEvent[] }) {
  const today = new Date().toISOString().slice(0, 10);

  const upcoming = events
    .filter(
      (event) =>
        event.status === "confirmed" && event.date && event.date >= today,
    )
    .sort((a, b) => a.date!.localeCompare(b.date!));

  const planned = events.filter(
    (event) => event.status === "planning" || !event.date,
  );

  return (
    <section aria-label="In-person experiences">
      {upcoming.length > 0 ? (
        <div>
          <div className="flex items-center justify-between gap-4 border-b border-plp-maroon/20 pb-4">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-plp-maroon/60">
              On the Calendar
            </h3>

            <span className="font-mono text-[10px] tabular-nums text-plp-maroon/40">
              {String(upcoming.length).padStart(2, "0")} Events
            </span>
          </div>

          <ul>
            {upcoming.map((event) => (
              <EventRow key={event.id} event={event} />
            ))}
          </ul>
        </div>
      ) : (
        <EmptyState
          align="center"
          icon={<CalendarIcon className="h-5 w-5" />}
          message="Nothing on the calendar just yet."
          description="Good things are in the works. Check back soon!"
        />
      )}

      {planned.length > 0 && (
        <div className="mt-16 md:mt-24">
          <div className="mb-8 md:mb-10">
            <h3 className="font-bodoni text-[30px] font-semibold text-plp-maroon md:text-[36px]">
              Coming Soon
            </h3>

            <p className="mt-2 font-prata text-[13px] leading-6 text-plp-maroon/60">
              A little preview of what we're planning ahead.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {planned.map((event) => (
              <PlannedEventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )} 
    </section>
  );
}
