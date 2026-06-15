"use client";
import Block from "@/components/block";
import Schedule from "@/components/schedule";
import { cn } from "@/lib/utils";
import { IconFile, IconSettings } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { CSSProperties } from "react";
import styles from "@/components/styles.module.css";
import Settings from "@/components/settings";
import { useSettingsStore } from "@/store/settingsStore";
import { requestNotificationPermission } from "@/utils/notifications";

export default function Page() {
  const [pagina, setPagina] = useState("block");
  const [showMenu, setShowMenu] = useState(true);

  const text = useSettingsStore((state) => state.text);
  const theme = useSettingsStore((state) => state.theme);
  const background = useSettingsStore((state) => state.background);

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "F4") {
        event.preventDefault();
        setShowMenu((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main
      style={{ "--theme": "#fafafa", color: text } as CSSProperties}
      className={cn(
        styles.scrollContainer,
        "flex overflow-x-hidden flex-col h-screen items-center relative",
      )}
    >
      <div
        className={cn(
          pagina === "block" ? "h-full flex flex-col w-full" : "hidden",
        )}
      >
        <Block />
      </div>
      <div
        className={cn(
          pagina === "schedule" ? "flex-1 flex flex-col w-full pt-2" : "hidden",
        )}
      >
        <Schedule />
      </div>
      <div
        className={cn(
          pagina === "settings" ? "flex-1 flex flex-col w-full pt-2" : "hidden",
        )}
      >
        <Settings />
      </div>

      <div
        style={{ background: background }}
        className={cn(
          " items-center sticky bottom-0 justify-start w-full z-10 p-2 gap-2 h-12 border-t border-white/5 transition-all duration-300 transform",
          showMenu
            ? "translate-y-0 flex"
            : "translate-y-full hidden pointer-events-none",
        )}
      >
        <button
          onClick={() => {
            setPagina("settings");
          }}
          style={{ background: theme }}
          className="p-2 rounded hover:brightness-110 transition-all"
        >
          <IconSettings size={20} />
        </button>

        <button
          onClick={() => {
            setPagina("block");
          }}
          style={{ background: theme }}
          className="p-2 rounded hover:brightness-110 transition-all"
        >
          <IconFile size={20} />
        </button>
      </div>
    </main>
  );
}
