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
  const today = week.find((d) => d.isToday);

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-baseline gap-3 min-w-0">
          <span className="font-bodoni text-[12px] font-semibold uppercase tracking-[0.15em] text-gray-400 shrink-0">
            Hours
          </span>
          <span
            className={`text-[15px] font-prata truncate ${
              !timeData.isOpen
                ? "text-gray-700"
                : timeData.isClosingSoon
                  ? "text-amber-600"
                  : "text-emerald-700"
            }`}
          >
            {!timeData.isOpen
              ? today
                ? today.string
                : timeData.string
              : timeData.isClosingSoon
                ? `Closes soon · ${today ? today.string : timeData.string}`
                : today
                  ? today.string
                  : timeData.string}
          </span>
        </div>
        <ChevronDown
          size={18}
          className={`text-gray-400 shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="border-t border-gray-100 px-4 py-2">
          {week.map((d) => (
            <div
              key={d.label}
              className={`flex items-center font-prata justify-between py-2 text-[14px] tracking-wide ${
                d.isToday ? "text-gray-900 font-semibold" : "text-gray-500"
              }`}
            >
              <span>{d.label}</span>
              <span className={d.isClosed ? "text-gray-400" : ""}>
                {d.string}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
