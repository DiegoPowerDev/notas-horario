import React from "react";
import { useScheduleStore } from "../store/scheduleStore";

interface HourProps {
  start: string;
  end: string;
  dia: string;
  hourValue: number;
}

export default function Hour({ start, end, dia, hourValue }: HourProps) {
  const toggleHour = useScheduleStore((state) => state.toggleHour);
  const schedule = useScheduleStore((state) => state.schedule);

  const isActive =
    schedule[dia as keyof typeof schedule]?.includes(hourValue) || false;

  return (
    <button
      onClick={() => toggleHour(dia, hourValue)}
      className={`
       cursor-pointer w-full text-xs p-2 border rounded-lg 
        transition-all duration-200 font-medium
        ${
          isActive
            ? "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-700"
            : "bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:border-gray-600"
        }
      `}
      aria-pressed={isActive}
      aria-label={`${dia} ${start} a ${end}`}
    >
      <span className="block select-none">
        {start} - {end}
      </span>
    </button>
  );
}
