import { create } from "zustand";
import { app } from "@/firebase/firebase";
import {
  doc,
  getFirestore,
  setDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

const db = getFirestore(app);
interface SettingsStore {
  background: string;
  secondary: string;
  theme: string;
  text: string;
  block: string;
  textBlock: string;
  loading: boolean;
  loadUserData: () => () => void;
  saveToFirestore: () => Promise<void>;
  setBackground: (color: string) => void;
  setSecondary: (color: string) => void;
  setTheme: (color: string) => void;
  setText: (color: string) => void;
  setBlock: (color: string) => void;
  setTextBlock: (color: string) => void;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  background: "#0F1726",
  secondary: "#1E2939",
  theme: "#009966",
  text: "#fafafa",
  block: "#000000",
  textBlock: "#fafafa",
  setBackground: (color: string) => {
    set({ background: `#${color}` });
    get().saveToFirestore();
  },
  setSecondary: (color: string) => {
    set({ secondary: `#${color}` });
    get().saveToFirestore();
  },
  setTheme: (color: string) => {
    set({ theme: `#${color}` });
    get().saveToFirestore();
  },
  setText: (color: string) => {
    set({ text: `#${color}` });
    get().saveToFirestore();
  },
  setBlock: (color: string) => {
    set({ block: `#${color}` });
    get().saveToFirestore();
  },
  setTextBlock: (color: string) => {
    set({ textBlock: `#${color}` });
    get().saveToFirestore();
  },
  loading: false,
  loadUserData: () => {
    const userDoc = doc(db, "database", "settings");
    set({ loading: true });
    const unsubscribe = onSnapshot(
      userDoc,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          set({
            background: data.background,
            secondary: data.secondary,
            theme: data.theme,
            text: data.text,
            block: data.block,
            textBlock: data.textBlock,
            loading: false,
          });
        } else {
          set({
            background: "",
            secondary: "",
            theme: "",
            text: "",
            block: "",
            textBlock: "",
            loading: false,
          });
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
      console.log("Guardado pausado: cargando desde Firestore");
      return;
    }

    const data = {
      background: state.background,
      secondary: state.secondary,
      theme: state.theme,
      text: state.text,
      block: state.block,
      textBlock: state.textBlock,
    };
    try {
      await updateDoc(doc(db, "database", "settings"), data);
    } catch (err: any) {
      console.log("❌ Error guardando:", err);
      if (err.code === "not-found") {
        try {
          await setDoc(doc(db, "database", "settings"), data);
          console.log("📝 Documento creado después de error not-found");
        } catch (setErr) {
          console.log("❌ Error al crear documento:", setErr);
        }
      }
    }
  },
}));
