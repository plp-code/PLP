import type { OneOnOneService } from "@/data/experiences";
import { EmptyState } from "@/components/ui/EmptyState";
import { ServiceCard } from "./ServiceCard";
import { CalendarIcon } from "lucide-react";

export function OneOnOneList({ services }: { services: OneOnOneService[] }) {
  return (
    <section aria-labelledby="one-on-one">
      {services.length === 0 ? (
        <EmptyState
          align="center"
          icon={<CalendarIcon className="h-5 w-5" />}
          message="Nothing on the calendar just yet."
          description="Good things are in the works. Check back soon!"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </section>
  );
}
