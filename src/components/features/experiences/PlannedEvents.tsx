"use client";

import { useState } from "react";
import type { InPersonEvent } from "@/data/experiences";
import { Pagination } from "@/components/ui/Pagination";
import { PlannedEventCard } from "./PlannedEventsCard";

const PAGE_SIZE = 4;

export function PlannedEvents({ events }: { events: InPersonEvent[] }) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(events.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const visible = events.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);


  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((event) => (
          <PlannedEventCard key={event.id} event={event} />
        ))}
      </div>

      <Pagination
        page={current}
        totalPages={totalPages}
        total={events.length}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />
    </>
  );
}
