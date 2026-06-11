const STORAGE_KEY = "aurelius:favorites";

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function isFavorite(id: string): boolean {
  return getFavorites().includes(id);
}

export function toggleFavorite(id: string): boolean {
  const current = getFavorites();
  const next = current.includes(id)
    ? current.filter((x) => x !== id)
    : [...current, id];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("aurelius:favorites-changed"));
  return next.includes(id);
}
