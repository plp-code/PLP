import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { getTodayHours, getWeekHours } from "@/lib/utils";

type TimeData = ReturnType<typeof getTodayHours>;
type WeekHours = ReturnType<typeof getWeekHours>;

interface StoreHoursProps {
  timeData: TimeData;
  week: WeekHours;
}

export function StoreHours({ timeData, week }: StoreHoursProps) {
  const [open, setOpen] = useState(false);
  const today = week.find((day) => day.isToday);

  const todayHours = today?.string ?? timeData.string;

  const statusText = !timeData.isOpen
    ? todayHours
    : timeData.isClosingSoon
      ? `Closes soon · ${todayHours}`
      : todayHours;

  const statusColor = !timeData.isOpen
    ? "text-gray-600"
    : timeData.isClosingSoon
      ? "text-amber-600"
      : "text-emerald-700";

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="
          flex w-full items-center justify-between gap-4
          px-4 py-3.5 text-left
          transition-colors hover:bg-gray-50
          focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-300
        "
      >
        <div className="min-w-0">
          <span className="mb-1 block font-bodoni text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">
            Hours
          </span>

          <span
            className={`block truncate font-prata text-[15px] leading-snug ${statusColor}`}
          >
            {statusText}
          </span>
        </div>

        <ChevronDown
          size={17}
          strokeWidth={1.8}
          className={`shrink-0 text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="border-t border-gray-100 px-4 py-2">
          {week.map((day) => (
            <div
              key={day.label}
              className={`
                flex items-center justify-between gap-6
                py-2 font-prata text-[14px] leading-relaxed
                ${day.isToday ? "font-semibold text-gray-900" : "text-gray-500"}
              `}
            >
              <span className="shrink-0">{day.label}</span>

              <span
                className={`text-right ${day.isClosed ? "text-gray-400" : ""}`}
              >
                {day.string}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
