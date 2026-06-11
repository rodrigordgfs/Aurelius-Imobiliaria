import L from "leaflet";

export function createPropertyPinIcon(price: string, active: boolean) {
  const width = Math.max(56, price.length * 7 + 24);

  return L.divIcon({
    className: "",
    html: `
      <div class="search-map-pin ${active ? "search-map-pin--active" : ""}" style="width:${width}px">
        <span class="search-map-pin__label">${price}</span>
        <span class="search-map-pin__tail" aria-hidden="true"></span>
      </div>
    `,
    iconSize: [width, 40],
    iconAnchor: [width / 2, 40],
  });
}
