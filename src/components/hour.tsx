import React, { useEffect } from "react";
import { useScheduleStore } from "../store/scheduleStore";
import { useSettingsStore } from "@/store/settingsStore";
import { sendNativeNotification } from "@/utils/notifications";

interface HourProps {
  start: string;
  end: string;
  dia: string;
  hourValue: number;
}
const days = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
];

export default function Hour({ start, end, dia, hourValue }: HourProps) {
  const toggleHour = useScheduleStore((state) => state.toggleHour);
  const schedule = useScheduleStore((state) => state.schedule);
  const text = useSettingsStore((state) => state.text);
  const secondary = useSettingsStore((state) => state.secondary);
  const theme = useSettingsStore((state) => state.theme);

  const isActive =
    schedule[dia as keyof typeof schedule]?.includes(hourValue) || false;

  return (
    <button
      onClick={() => {
        toggleHour(dia, hourValue);
      }}
      style={{ background: isActive ? theme : secondary, color: text }}
      className={`
       cursor-pointer w-full text-xs p-2 border rounded-lg 
        transition-all duration-200 font-medium
        ${isActive ? " " : "hover:opacity-70  "}
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
