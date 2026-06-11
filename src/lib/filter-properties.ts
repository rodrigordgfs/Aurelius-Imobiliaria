import type { PublicProperty } from "@/lib/types";
import type { SearchFilters } from "@/components/modals/SearchFiltersSheet";

export function parsePriceMillion(price: string): number {
  const n = parseFloat(price.replace(/\./g, "").replace(/,/g, ""));
  return n / 1_000_000;
}

export function filterProperties(
  list: PublicProperty[],
  filters: SearchFilters,
  query?: string,
): PublicProperty[] {
  const minBeds = parseInt(filters.beds, 10) || 0;
  const priceMin = parseFloat(filters.priceMin) || 0;
  const priceMax = parseFloat(filters.priceMax) || Infinity;
  const q = (query ?? filters.location).trim().toLowerCase();

  return list.filter((p) => {
    if (q) {
      const hay = `${p.title} ${p.location} ${p.region}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (p.beds < minBeds) return false;
    const priceM = parsePriceMillion(p.price);
    if (priceM < priceMin || priceM > priceMax) return false;
    if (filters.features.length > 0) {
      const feats = p.features.join(" ").toLowerCase();
      const match = filters.features.some((f) => feats.includes(f.toLowerCase()));
      if (!match) return false;
    }
    return true;
  });
}

export function sortProperties(list: PublicProperty[], sort: string): PublicProperty[] {
  const copy = [...list];
  switch (sort) {
    case "newest":
      return copy.sort((a, b) => b.year - a.year);
    case "price-desc":
      return copy.sort((a, b) => parsePriceMillion(b.price) - parsePriceMillion(a.price));
    case "price-asc":
      return copy.sort((a, b) => parsePriceMillion(a.price) - parsePriceMillion(b.price));
    default:
      return copy;
  }
}
