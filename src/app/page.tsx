"use client";
import Block from "@/components/block";
import Schedule from "@/components/schedule";
import { cn } from "@/lib/utils";
import { IconClock, IconFile, IconSettings } from "@tabler/icons-react";
import { useState } from "react";
import { CSSProperties } from "react";
import styles from "@/components/styles.module.css";
export default function Home() {
  const [pagina, setPagina] = useState("block");

  return (
    <main
      style={{ "--theme": "#fafafa" } as CSSProperties}
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
          pagina === "horario" ? "flex-1 flex flex-col w-full pt-2" : "hidden",
        )}
      >
        <Schedule />
      </div>
      <div className="flex bg-gray-900 items-center gap-2  sticky bottom-0 justify-end w-full z-10">
        <div
          onClick={() => {
            setPagina("block");
          }}
        >
          <IconFile size={20} />
        </div>
        <div
          onClick={() => {
            setPagina("horario");
          }}
        >
          <IconClock size={20} />
        </div>
        <div
          onClick={() => {
            setPagina("configuracion  ");
          }}
        >
          <IconSettings size={20} />
        </div>
      </div>
    </main>
  );
}
