import type { PublicProperty } from "@/lib/types";

const PORTO_ALEGRE_CENTER = { lat: -30.0346, lng: -51.2177 };

export function getPropertyCoords(property: PublicProperty) {
  return { lat: property.lat, lng: property.lng };
}

export function getMapCenter(properties: PublicProperty[]) {
  if (properties.length === 0) return PORTO_ALEGRE_CENTER;
  const lat = properties.reduce((sum, p) => sum + p.lat, 0) / properties.length;
  const lng = properties.reduce((sum, p) => sum + p.lng, 0) / properties.length;
  return { lat, lng };
}

export function formatMapPrice(property: PublicProperty) {
  const num = property.price.replace(/\./g, "").split(",")[0];
  const millions = Math.round(Number(num) / 1_000_000);
  if (Number.isNaN(millions)) return `${property.currency} ${property.price}`;
  return `${property.currency} ${millions}M`;
}
