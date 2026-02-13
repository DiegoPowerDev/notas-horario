"use client";
import Block from "@/components/block";
import Schedule from "@/components/schedule";
import { cn } from "@/lib/utils";
import { IconClock, IconFile, IconSettings } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { CSSProperties } from "react";
import styles from "@/components/styles.module.css";
import Settings from "@/components/settings";
import { useSettingsStore } from "@/store/settingsStore";
import { requestNotificationPermission } from "@/utils/notifications";
export default function Home() {
  const [pagina, setPagina] = useState("block");
  const text = useSettingsStore((state) => state.text);
  const theme = useSettingsStore((state) => state.theme);
  const background = useSettingsStore((state) => state.background);
  useEffect(() => {
    requestNotificationPermission();
  }, []);
  return (
    <main
      style={{ "--theme": "#fafafa", color: text } as CSSProperties}
      className={cn(
        styles.scrollContainer,
        "flex overflow-x-hidden bg-gray-900 flex-col  h-screen items-center  ",
      )}
    >
      <div
        className={cn(
          pagina === "block" ? "flex-1 flex flex-col w-full pt-2" : "hidden",
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
        className="flex  items-center sticky bottom-0 justify-start w-full z-10"
      >
        <button
          onClick={() => {
            setPagina("settings");
          }}
          style={{ background: theme }}
          className="p-2   rounded"
        >
          <IconSettings size={20} />
        </button>
        <button
          onClick={() => {
            setPagina("schedule");
          }}
          style={{ background: theme }}
          className="p-2   rounded"
        >
          <IconClock size={20} />
        </button>
        <button
          onClick={() => {
            setPagina("block");
          }}
          style={{ background: theme }}
          className="p-2   rounded"
        >
          <IconFile size={20} />
        </button>
      </div>
    </main>
  );
}
