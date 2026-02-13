import { CSSProperties } from "react";
import styles from "@/components/styles.module.css";
import { cn } from "@/lib/utils";
import { useBlockStore } from "@/store/blockStore";
import { useSettingsStore } from "@/store/settingsStore";

interface Props {
  id: number;
}

export default function Cuadro(props: Props) {
  const { id } = props;
  const loading = useBlockStore((s) => s.loading);
  const background = useSettingsStore((s) => s.block);
  const text = useSettingsStore((s) => s.textBlock);

  const block = useBlockStore((s) => s.blocks);
  const editblock = useBlockStore((s) => s.editNote);

  const data = block.find((e) => e.id === id);

  return (
    <textarea
      disabled={loading}
      name="form"
      style={
        {
          "--theme": "#fafafa",
          background: background,
          color: text,
        } as CSSProperties
      }
      className={cn(
        styles.scrollContainer,
        "resize-none border  outline-0 p-1 text-xs md:text-sm lg:text-md",
      )}
      spellCheck="false"
      value={data?.text}
      onChange={(e) => editblock(id, e.target.value)}
    />
  );
}
