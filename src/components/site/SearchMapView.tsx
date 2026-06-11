import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import type { PublicProperty } from "@/lib/types";
import { getMapCenter } from "@/lib/map-coords";
import { DARK_MAP_TILES } from "@/lib/map-tiles";
import { SearchMapMarkers } from "@/components/site/SearchMapMarkers";
import "leaflet/dist/leaflet.css";

const DEFAULT_ZOOM = 13;

type SearchMapViewProps = {
  properties: PublicProperty[];
  className?: string;
};

function MapZoomControls() {
  const map = useMap();

  return (
    <div className="leaflet-top leaflet-right !mt-14 !mr-3">
      <div className="flex items-center gap-1 rounded-md border border-line bg-surface/90 shadow-lg backdrop-blur-md">
        <button
          type="button"
          onClick={() => map.zoomOut()}
          className="grid size-8 place-items-center text-ink-muted transition hover:text-ink"
          aria-label="Reduzir zoom"
        >
          <Minus className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={() => map.zoomIn()}
          className="grid size-8 place-items-center text-ink-muted transition hover:text-ink"
          aria-label="Aumentar zoom"
        >
          <Plus className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

export function SearchMapView({ properties, className = "" }: SearchMapViewProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const hovered = properties.find((p) => p.id === hoveredId);
  const center = getMapCenter(properties);
  const mapCenter: [number, number] = [center.lat, center.lng];

  return (
    <div className={`search-map relative overflow-hidden bg-onyx ${className}`}>
      <div className="absolute inset-x-0 top-0 z-[500] flex items-center justify-between border-b border-line/60 bg-onyx/80 px-4 py-3 backdrop-blur-md">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-gold">
            Porto Alegre
          </div>
          <div className="text-xs text-ink-muted">
            {properties.length} imóve{properties.length !== 1 ? "is" : "l"} no mapa
          </div>
        </div>
      </div>

      <MapContainer
        center={mapCenter}
        zoom={DEFAULT_ZOOM}
        className="absolute inset-0 z-0 h-full w-full"
        zoomControl={false}
        attributionControl
      >
        <TileLayer url={DARK_MAP_TILES.url} attribution={DARK_MAP_TILES.attribution} />
        <MapZoomControls />
        <SearchMapMarkers
          properties={properties}
          hoveredId={hoveredId}
          onHover={setHoveredId}
        />
      </MapContainer>

      {hovered && (
        <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-[500]">
          <div className="glass flex items-center gap-3 rounded-xl border border-line p-3 shadow-2xl">
            <img src={hovered.imageUrl} alt="" className="size-14 rounded-md object-cover" />
            <div className="min-w-0 flex-1">
              <div className="truncate font-serif text-sm text-ink">{hovered.title}</div>
              <div className="text-xs text-ink-muted">
                {hovered.location}, {hovered.region}
              </div>
              <div className="number mt-0.5 text-xs text-gold">
                {hovered.currency} {hovered.price}
              </div>
            </div>
            <span className="shrink-0 rounded-full border border-gold/40 bg-gold-soft px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-gold">
              {hovered.status}
            </span>
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute bottom-4 right-4 z-[500] hidden rounded-md border border-line bg-onyx/90 px-3 py-2 backdrop-blur-sm sm:block">
        <div className="flex items-center gap-2 text-[10px] text-ink-dim">
          <span className="size-2 rounded-full bg-gold" />
          <span>Preço solicitado</span>
        </div>
      </div>
    </div>
  );
}
