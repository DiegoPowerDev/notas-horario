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

  // Asegura que el valor tenga el '#' solo para los estilos en línea y el input color
  const ensureHash = (color: string) => {
    return color.startsWith("#") ? color : `#${color}`;
  };

  const formatColor = (value: string) => {
    return value.replace("#", "");
  };

  return (
    <div
      style={{ background: ensureHash(background), color: ensureHash(text) }}
      className="flex flex-col md:flex-row md:gap-8 items-center h-full justify-center md:items-start"
    >
      <div className="flex flex-col gap-2 p-4">
        {/* Fondo */}
        <div
          style={{ background: ensureHash(secondary) }}
          className="p-4 flex flex-col gap-2 rounded w-fit"
        >
          <div className="font-bold">Fondo</div>
          <div className="flex gap-2 items-center">
            #
            <input
              value={formatColor(background)}
              onChange={(e) => setBackground(formatColor(e.target.value))}
              type="text"
              style={{
                background: ensureHash(block),
                color: ensureHash(textBlock),
              }}
              className="h-8 border w-32 rounded p-2"
            />
            <label
              className="relative h-8 w-8 border cursor-pointer"
              style={{ background: ensureHash(background) }}
            >
              <input
                type="color"
                value={ensureHash(background)}
                onChange={(e) => setBackground(formatColor(e.target.value))}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Color Secundario */}
        <div
          style={{ background: ensureHash(secondary) }}
          className="p-4 flex flex-col gap-2 rounded w-fit"
        >
          <div className="font-bold">Color Secundario</div>
          <div className="flex gap-2 items-center">
            #
            <input
              value={formatColor(secondary)}
              onChange={(e) => setSecondary(formatColor(e.target.value))}
              type="text"
              style={{
                background: ensureHash(block),
                color: ensureHash(textBlock),
              }}
              className="h-8 border w-32 rounded p-2"
            />
            <label
              className="relative h-8 w-8 border cursor-pointer"
              style={{ background: ensureHash(secondary) }}
            >
              <input
                type="color"
                value={ensureHash(secondary)}
                onChange={(e) => setSecondary(formatColor(e.target.value))}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Tema */}
        <div
          style={{ background: ensureHash(secondary) }}
          className="p-4 flex flex-col gap-2 rounded w-fit"
        >
          <div className="font-bold">Tema</div>
          <div className="flex gap-2 items-center">
            #
            <input
              value={formatColor(theme)}
              onChange={(e) => setTheme(formatColor(e.target.value))}
              type="text"
              style={{
                background: ensureHash(block),
                color: ensureHash(textBlock),
              }}
              className="h-8 border w-32 rounded p-2"
            />
            <label
              className="relative h-8 w-8 border cursor-pointer"
              style={{ background: ensureHash(theme) }}
            >
              <input
                type="color"
                value={ensureHash(theme)}
                onChange={(e) => setTheme(formatColor(e.target.value))}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Texto */}
        <div
          style={{ background: ensureHash(secondary) }}
          className="p-4 flex flex-col gap-2 rounded w-fit"
        >
          <div className="font-bold">Texto</div>
          <div className="flex gap-2 items-center">
            #
            <input
              value={formatColor(text)}
              onChange={(e) => setText(formatColor(e.target.value))}
              type="text"
              style={{
                background: ensureHash(block),
                color: ensureHash(textBlock),
              }}
              className="h-8 border w-32 rounded p-2"
            />
            <label
              className="relative h-8 w-8 border cursor-pointer"
              style={{ background: ensureHash(text) }}
            >
              <input
                type="color"
                value={ensureHash(text)}
                onChange={(e) => setText(formatColor(e.target.value))}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="text-white flex flex-col gap-2 p-4">
        {/* Fondo de los Blocks */}
        <div
          style={{ background: ensureHash(secondary) }}
          className="p-4 flex flex-col gap-2 rounded w-fit"
        >
          <div className="font-bold">Fondo de los Blocks</div>
          <div className="flex gap-2 items-center">
            #
            <input
              value={formatColor(block)}
              onChange={(e) => setBlock(formatColor(e.target.value))}
              type="text"
              style={{
                background: ensureHash(block),
                color: ensureHash(textBlock),
              }}
              className="h-8 border w-32 rounded p-2"
            />
            <label
              className="relative h-8 w-8 border cursor-pointer"
              style={{ background: ensureHash(block) }}
            >
              <input
                type="color"
                value={ensureHash(block)}
                onChange={(e) => setBlock(formatColor(e.target.value))}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Texto de los Blocks */}
        <div
          style={{ background: ensureHash(secondary) }}
          className="p-4 flex flex-col gap-2 rounded w-fit"
        >
          <div className="font-bold">Texto de los Blocks</div>
          <div className="flex gap-2 items-center">
            #
            <input
              value={formatColor(textBlock)}
              onChange={(e) => setTextBlock(formatColor(e.target.value))}
              type="text"
              style={{
                background: ensureHash(block),
                color: ensureHash(textBlock),
              }}
              className="h-8 border w-32 rounded p-2"
            />
            <label
              className="relative h-8 w-8 border cursor-pointer"
              style={{ background: ensureHash(textBlock) }}
            >
              <input
                type="color"
                value={ensureHash(textBlock)}
                onChange={(e) => setTextBlock(formatColor(e.target.value))}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
