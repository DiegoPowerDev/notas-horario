import Hour from "@/components/hour";
import { cn } from "@/lib/utils";
import { useScheduleStore } from "@/store/scheduleStore";
import { IconTrash } from "@tabler/icons-react";
import { useEffect } from "react";

const hours = [
  { start: "6am", end: "7am", value: 6 },
  { start: "7am", end: "8am", value: 7 },
  { start: "8am", end: "9am", value: 8 },
  { start: "9am", end: "10am", value: 9 },
  { start: "10am", end: "11am", value: 10 },
  { start: "11am", end: "12pm", value: 11 },
  { start: "12pm", end: "1pm", value: 12 },
  { start: "1pm", end: "2pm", value: 13 },
  { start: "2pm", end: "3pm", value: 14 },
  { start: "3pm", end: "4pm", value: 15 },
  { start: "4pm", end: "5pm", value: 16 },
  { start: "5pm", end: "6pm", value: 17 },
  { start: "6pm", end: "7pm", value: 18 },
  { start: "7pm", end: "8pm", value: 19 },
  { start: "8pm", end: "9pm", value: 20 },
  { start: "9pm", end: "10pm", value: 21 },
  { start: "10pm", end: "11pm", value: 22 },
  { start: "11pm", end: "12am", value: 23 },
];

function Schedule() {
  const totalHours = useScheduleStore((state) => state.totalHours);
  const clearAll = useScheduleStore((state) => state.clearAll);
  const loadUserData = useScheduleStore((state) => state.loadUserData);
  const loading = useScheduleStore((state) => state.loading);
  const schedule = useScheduleStore((state) => state.schedule);
  const days = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
  ];
  const handleClearAll = () => {
    if (
      window.confirm("¿Estás seguro de que quieres borrar todo el horario?")
    ) {
      clearAll();
    }
  };

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  return (
    <>
      {loading ? (
        <div className="h-[90vh] flex items-center justify-center">
          <div className="flex-1 w-full flex items-center justify-center">
            <div className="w-40 h-40 border-8 border-gray-800/20 border-t-gray-800 rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        <div className={cn("  text-white flex flex-col gap-2 w-full ")}>
          <div className="w-full xl:sticky flex flex-col top-0 bg-gray-900  gap-2">
            <div className="  top-0 flex  flex-row items-center justify-center gap-4 bg-gray-800 p-2 rounded-xl shadow-lg">
              <div className="flex items-center justify-center gap-3">
                <div className="font-bold lg:text-lg text-gray-200">
                  Horas totales de la semana:
                </div>
                <div className="font-bold px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg text-white shadow-lg">
                  {totalHours} {totalHours === 1 ? "hora" : "horas"}
                </div>
              </div>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 flex gap-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors shadow-lg"
              >
                <span className="hidden md:block">Limpiar Todo</span>{" "}
                <IconTrash />
              </button>
            </div>
            <div className=" grid  grid-cols-7 gap-2">
              {days.map((day, i) => (
                <div key={i} className="flex flex-col h-full">
                  <div className="bg-gray-800 rounded-t-lg p-2 border-b-2 border-emerald-500">
                    <div className="font-bold text-center text-lg truncate">
                      {day}
                    </div>
                    <div className="text-center text-sm text-gray-400">
                      {schedule[day as keyof typeof schedule].length}
                      {schedule[day as keyof typeof schedule].length === 1
                        ? " hora"
                        : " horas"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className=" grid grid-cols-7 gap-1">
            {days.map((day) => (
              <div key={day} className="flex flex-col h-full">
                {/* Horas del día */}
                <div className="bg-gray-800/50 rounded-b-xl p-1 flex flex-col gap-1  ">
                  {hours.map((hour, i) => (
                    <Hour
                      key={i}
                      start={hour.start}
                      end={hour.end}
                      dia={day}
                      hourValue={hour.value}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Schedule;
