import { useCallback, useEffect, useState } from "react";
import { getFavorites, toggleFavorite as toggle } from "@/lib/favorites";

export function useFavorites() {
  const [ids, setIds] = useState<string[]>(() => getFavorites());

  useEffect(() => {
    const sync = () => setIds(getFavorites());
    window.addEventListener("aurelius:favorites-changed", sync);
    return () => window.removeEventListener("aurelius:favorites-changed", sync);
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    const saved = toggle(id);
    setIds(getFavorites());
    return saved;
  }, []);

  const isSaved = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, toggleFavorite, isSaved };
}
