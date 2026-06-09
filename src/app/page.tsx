"use client";
import Block from "@/components/block";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { CSSProperties } from "react";
import styles from "@/components/styles.module.css";
import { useSettingsStore } from "@/store/settingsStore";
import { requestNotificationPermission } from "@/utils/notifications";
export default function Home() {
  const text = useSettingsStore((state) => state.text);
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
          "flex-1 flex flex-col w-full pt-2"
        )}
      >
        <Block />
      </div>
      
    </main>
  );
}
