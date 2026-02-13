import { useSettingsStore } from "@/store/settingsStore";

export default function Settings() {
  const background = useSettingsStore((state) => state.background);
  const setBackground = useSettingsStore((state) => state.setBackground);
  const secondary = useSettingsStore((state) => state.secondary);
  const setSecondary = useSettingsStore((state) => state.setSecondary);
  const theme = useSettingsStore((state) => state.theme);
  const setTheme = useSettingsStore((state) => state.setTheme);
  const text = useSettingsStore((state) => state.text);
  const setText = useSettingsStore((state) => state.setText);
  const block = useSettingsStore((state) => state.block);
  const setBlock = useSettingsStore((state) => state.setBlock);
  const textBlock = useSettingsStore((state) => state.textBlock);
  const setTextBlock = useSettingsStore((state) => state.setTextBlock);

  const formatColor = (value: string) => {
    const formatedValue = value.replace("#", "");
    return formatedValue;
  };

  return (
    <div
      style={{ background: background, color: text }}
      className="flex flex-col  md:flex-row md:gap-8 items-center h-full justify-center md:items-start"
    >
      <div className=" flex flex-col gap-2 p-4">
        <div
          style={{ background: secondary }}
          className=" p-4 flex flex-col gap-2 rounded w-fit"
        >
          <div className="font-bold">Fondo</div>
          <div className="flex gap-2 items-center">
            #
            <input
              value={formatColor(background)}
              onChange={(e) => setBackground(formatColor(e.target.value))}
              type="text"
              style={{ background: block, color: textBlock }}
              className="h-8 border w-32 rounded p-2"
            />
            <span
              style={{ background: background }}
              className="h-8 w-8 border"
            ></span>
          </div>
        </div>
        <div
          style={{ background: secondary }}
          className=" p-4 flex flex-col gap-2 rounded w-fit"
        >
          <div className="font-bold">Color Secundario</div>
          <div className="flex gap-2 items-center">
            #
            <input
              value={formatColor(secondary)}
              onChange={(e) => setSecondary(formatColor(e.target.value))}
              type="text"
              style={{ background: block, color: textBlock }}
              className="h-8 border w-32 rounded p-2"
            />
            <span
              style={{ background: secondary }}
              className="h-8 w-8 border"
            ></span>
          </div>
        </div>
        <div
          style={{ background: secondary }}
          className=" p-4 flex flex-col gap-2 rounded w-fit"
        >
          <div className="font-bold">Tema</div>
          <div className="flex gap-2 items-center">
            #
            <input
              value={formatColor(theme)}
              onChange={(e) => setTheme(formatColor(e.target.value))}
              type="text"
              style={{ background: block, color: textBlock }}
              className="h-8 border w-32 rounded p-2"
            />
            <span
              style={{ background: theme }}
              className="h-8 w-8 border"
            ></span>
          </div>
        </div>
        <div
          style={{ background: secondary }}
          className=" p-4 flex flex-col gap-2 rounded w-fit"
        >
          <div className="font-bold">Texto</div>
          <div className="flex gap-2 items-center">
            #
            <input
              value={formatColor(text)}
              onChange={(e) => setText(formatColor(e.target.value))}
              type="text"
              style={{ background: block, color: textBlock }}
              className="h-8 border w-32 rounded p-2"
            />
            <span
              style={{ background: text }}
              className="h-8 w-8 border"
            ></span>
          </div>
        </div>
      </div>
      <div className="text-white flex flex-col gap-2  p-4">
        <div
          style={{ background: secondary }}
          className=" p-4 flex flex-col gap-2 rounded w-fit"
        >
          <div className="font-bold">Fondo de los Blocks</div>
          <div className="flex gap-2 items-center">
            #
            <input
              value={formatColor(block)}
              onChange={(e) => setBlock(formatColor(e.target.value))}
              type="text"
              style={{ background: block, color: textBlock }}
              className="h-8 border w-32 rounded p-2"
            />
            <span
              style={{ background: block }}
              className="h-8 w-8 border"
            ></span>
          </div>
        </div>
        <div
          style={{ background: secondary }}
          className=" p-4 flex flex-col gap-2 rounded w-fit"
        >
          <div className="font-bold">Texto de los Blocks</div>
          <div className="flex gap-2 items-center">
            #
            <input
              value={formatColor(textBlock)}
              onChange={(e) => setTextBlock(formatColor(e.target.value))}
              type="text"
              style={{ background: block, color: textBlock }}
              className="h-8 border w-32 rounded p-2"
            />
            <span
              style={{ background: textBlock }}
              className="h-8 w-8 border"
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
}
