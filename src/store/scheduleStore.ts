import { create } from "zustand";
import { app } from "@/firebase/firebase";
import {
  doc,
  getFirestore,
  setDoc,
  updateDoc,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";

const db = getFirestore(app);

interface Schedule {
  Lunes: number[];
  Martes: number[];
  Miercoles: number[];
  Jueves: number[];
  Viernes: number[];
  Sabado: number[];
  Domingo: number[];
}

interface ScheduleState {
  schedule: Schedule;
  loading: boolean;
  totalHours: number;
  loadUserData: () => Unsubscribe;
  saveToFirestore: () => Promise<void>;
  toggleHour: (dia: string, hora: number) => void;
  clearAll: () => void;
  time: number[];
  setTime: (hora: number) => void;
}

const initialCalendario = {
  Lunes: [],
  Martes: [],
  Miercoles: [],
  Jueves: [],
  Viernes: [],
  Sabado: [],
  Domingo: [],
};

export const useScheduleStore = create<ScheduleState>()((set, get) => ({
  schedule: {
    Lunes: [],
    Martes: [],
    Miercoles: [],
    Jueves: [],
    Viernes: [],
    Sabado: [],
    Domingo: [],
  },
  loading: false,
  totalHours: 0,
  time: [],

  setTime: (hora) =>
    set((state) => ({
      time: [...state.time, hora],
    })),
  toggleHour: (dia: string, hora: number) => {
    set((state) => {
      const horasActuales =
        state.schedule[dia as keyof typeof state.schedule] || [];
      const horaExiste = horasActuales.includes(hora);

      return {
        schedule: {
          ...state.schedule,
          [dia]: horaExiste
            ? horasActuales.filter((h) => h !== hora)
            : [...horasActuales, hora].sort((a, b) => a - b),
        },
      };
    });

    const totalHours = Object.values(get().schedule).reduce(
      (total, horas) => total + horas.length,
      0,
    );
    set({ totalHours });
    get().saveToFirestore();
  },
  loadUserData: () => {
    const userDoc = doc(db, "database", "schedule");
    set({ loading: true });

    console.log("⏳ Cargando datos desde Firestore...");
    const unsubscribe = onSnapshot(
      userDoc,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          set({
            schedule: data.schedule,
            totalHours: data.totalHours || 0,
            loading: false,
          });
        } else {
          set({ schedule: initialCalendario, loading: false });
        }
      },
      (error) => {
        console.error("❌ Error en onSnapshot:", error);
        set({ loading: false });
      },
    );

    return unsubscribe;
  },
  saveToFirestore: async () => {
    const state = get();

    if (state.loading) {
      console.log("⏸️ Guardado pausado: cargando desde Firestore");
      return;
    }

    const data = {
      schedule: state.schedule,
    };
    try {
      await updateDoc(doc(db, "database", "schedule"), {
        schedule: state.schedule,
        totalHours: state.totalHours,
      });
    } catch (err: any) {
      console.log("❌ Error guardando:", err);
      if (err.code === "not-found") {
        try {
          await setDoc(doc(db, "database", "schedule"), data);
          console.log("📝 Documento creado después de error not-found");
        } catch (setErr) {
          console.log("❌ Error al crear documento:", setErr);
        }
      }
    }
  },

  clearAll: () => {
    set({ schedule: initialCalendario, totalHours: 0 });
    get().saveToFirestore();
  },
}));
