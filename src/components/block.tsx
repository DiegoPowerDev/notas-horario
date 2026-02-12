import Cuadro from "@/components/form";
import { useBlockStore } from "@/store/blockStore";
import { useEffect } from "react";

function Block() {
  const loadUserData = useBlockStore((s) => s.loadUserData);

  useEffect(() => {
    const unsub = loadUserData();
    return () => unsub();
  }, [loadUserData]);

  return (
    <form className="grid grid-cols-4 grid-rows-2  w-full  flex-1">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
        <Cuadro key={e} id={e} />
      ))}
    </form>
  );
}

export default Block;
