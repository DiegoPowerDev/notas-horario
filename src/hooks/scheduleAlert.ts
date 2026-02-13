import { useEffect } from "react";
import { useScheduleStore } from "../store/scheduleStore";
import { sendNativeNotification } from "@/utils/notifications";

let activeTimers: NodeJS.Timeout[] = [];

export const clearAllTimers = () => {
  if (activeTimers.length === 0) return;
  activeTimers.forEach((timer) => clearTimeout(timer));
  activeTimers = [];
  console.log("Eliminando alertas");
};

export const useScheduleAlerts = () => {
  const schedule = useScheduleStore((state) => state.schedule);
  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];

  useEffect(() => {
    clearAllTimers();

    const now = new Date();
    const currentHour = now.getHours();
    const dayName = days[now.getDay()];
    const todayHours = schedule[dayName as keyof typeof schedule] || [];

    if (todayHours.length === 0) return;

    const sortedHours = [...todayHours].sort((a, b) => a - b);

    const blockEndings = sortedHours.filter((hour) => {
      const isNextHourMarked = sortedHours.includes(hour + 1);
      return !isNextHourMarked && hour >= currentHour;
    });

    const nombres = [
      "HERMOSA ❤❤❤",
      "MI SEXY CULONA ",
      "MI RICA TETONA",
      "RICURA SEXY",
      "MAMACITA TETONA",
      "SOÑÉ CONTIGO HOY HACIENDO YA SABES, BUENO NO TE DISTRAIGO",
      "SEXY COLITA",
      "NO OLVIDES, HOY TOCA TIKI TIKI",
      "MI VICIO SEXUAL",
      "QUE DICES SI TE PENETRO HOY?, BUENO NO TE DISTRAIGO",
    ];
    const nombreRandom = () => {
      const random = Math.floor(Math.random() * nombres.length);
      return nombres[random];
    };

    blockEndings.forEach((hour) => {
      const alertTime = new Date();
      alertTime.setHours(hour, 55, 0, 0);

      const diff = alertTime.getTime() - now.getTime();

      if (diff > 0) {
        console.log(`(${Math.round(diff / 1000 / 60)} min restantes)`);

        const timer = setTimeout(() => {
          sendNativeNotification(
            "¡TERMINO DE HORA!",
            `Tu turno termina a las ${hour + 1}:00.`,
          );
          alert(
            `HOLA ${nombreRandom()}, TU TURNO TERMINA A LAS ${
              hour + 1
            } HORAS, ATENTA ♥♥♥♥ !!!`,
          );
        }, diff);

        activeTimers.push(timer);
      }
    });

    return () => clearAllTimers();
  }, [schedule]);
};
