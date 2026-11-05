
import { Clock } from "lucide-react";
import type { OneOnOneService } from "@/data/experiences";
import { Action } from "../shared/Action";

interface ServiceCardProps {
  service: OneOnOneService;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="group flex h-full flex-col border border-plp-maroon/20 bg-transparent p-6 transition-all duration-200 hover:border-plp-maroon/50 hover:bg-white/25 md:p-8">
      <h3 className="font-bodoni text-[27px] font-semibold leading-[1.1] tracking-[-0.01em] text-plp-maroon md:text-[31px]">
        {service.title}
      </h3>

      <p className="mt-5 flex-1 font-prata text-[13px] leading-7 text-plp-maroon/70 md:text-[14px]">
        {service.description}
      </p>

      <div className="mt-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-plp-maroon/50">
        <Clock size={14} strokeWidth={1.5} />
        {service.duration}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-plp-maroon/15 pt-6">
        <span className="font-bodoni text-[25px] text-plp-maroon">
          {service.price}
        </span>

        <Action href={service.href} label="Book" />
      </div>
    </article>
  );
}
