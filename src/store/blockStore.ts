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
interface BlockStore {
  blocks: {
    id: number;
    text: string;
  }[];
  editNote: (id: number, text: string) => void;
  loading: boolean;
  loadUserData: () => Unsubscribe;
  saveToFirestore: () => Promise<void>;
}
const createInitialBlocks = () =>
  Array.from({ length: 8 }, (_, i) => ({ id: i + 1, text: "" }));
export const useBlockStore = create<BlockStore>((set, get) => ({
  blocks: [
    {
      id: 1,
      text: "",
    },
    {
      id: 2,
      text: "",
    },
    {
      id: 3,
      text: "",
    },
    {
      id: 4,
      text: "",
    },
    {
      id: 5,
      text: "",
    },
    {
      id: 6,
      text: "",
    },
    {
      id: 7,
      text: "",
    },
    {
      id: 8,
      text: "",
    },
  ],
  loading: false,
  editNote: (id, text) => {
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === id ? { ...block, text } : block,
      ),
    }));
    get().saveToFirestore();
  },
  loadUserData: () => {
    const userDoc = doc(db, "database", "blocks");
    set({ loading: true });
    const unsubscribe = onSnapshot(
      userDoc,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          set({
            blocks: data.blocks,
            loading: false,
          });
        } else {
          set({ blocks: createInitialBlocks(), loading: false });
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
      blocks: state.blocks,
    };
    try {
      await updateDoc(doc(db, "database", "blocks"), data);
    } catch (err: any) {
      console.log("❌ Error guardando:", err);
      if (err.code === "not-found") {
        try {
          await setDoc(doc(db, "database", "blocks"), data);
          console.log("📝 Documento creado después de error not-found");
        } catch (setErr) {
          console.log("❌ Error al crear documento:", setErr);
        }
      }
    }
  },
}));
