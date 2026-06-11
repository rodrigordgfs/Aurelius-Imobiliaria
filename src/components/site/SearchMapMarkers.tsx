import { Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { PublicProperty } from "@/lib/types";
import { formatMapPrice, getPropertyCoords } from "@/lib/map-coords";
import { createPropertyPinIcon } from "@/lib/map-marker-icon";

type SearchMapMarkersProps = {
  properties: PublicProperty[];
  hoveredId: string | null;
  onHover: (id: string | null) => void;
};

function FitBounds({ properties }: { properties: PublicProperty[] }) {
  const map = useMap();

  useEffect(() => {
    if (properties.length === 0) return;

    if (properties.length === 1) {
      const { lat, lng } = getPropertyCoords(properties[0]);
      map.setView([lat, lng], 11);
      return;
    }

    const bounds = L.latLngBounds(
      properties.map((p) => {
        const { lat, lng } = getPropertyCoords(p);
        return [lat, lng] as [number, number];
      }),
    );

    map.fitBounds(bounds, { padding: [80, 48] });
  }, [map, properties]);

  return null;
}

function PropertyMarker({
  property,
  active,
  onHover,
}: {
  property: PublicProperty;
  active: boolean;
  onHover: (id: string | null) => void;
}) {
  const navigate = useNavigate();
  const { lat, lng } = getPropertyCoords(property);
  const price = formatMapPrice(property);
  const icon = useMemo(() => createPropertyPinIcon(price, active), [price, active]);

  return (
    <Marker
      position={[lat, lng]}
      icon={icon}
      zIndexOffset={active ? 1000 : 0}
      eventHandlers={{
        click: () => navigate({ to: "/property/$id", params: { id: property.id } }),
        mouseover: () => onHover(property.id),
        mouseout: () => onHover(null),
      }}
    />
  );
}

export function SearchMapMarkers({ properties, hoveredId, onHover }: SearchMapMarkersProps) {
  return (
    <>
      <FitBounds properties={properties} />
      {properties.map((property) => (
        <PropertyMarker
          key={property.id}
          property={property}
          active={hoveredId === property.id}
          onHover={onHover}
        />
      ))}
    </>
  );
}
