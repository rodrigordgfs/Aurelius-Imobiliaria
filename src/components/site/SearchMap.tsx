import { lazy, Suspense, useEffect, useState } from "react";
import type { PublicProperty } from "@/lib/types";

const SearchMapView = lazy(() =>
  import("@/components/site/SearchMapView").then((m) => ({ default: m.SearchMapView })),
);

type SearchMapProps = {
  properties: PublicProperty[];
  className?: string;
};

function MapPlaceholder({ className = "" }: { className?: string }) {
  return <div className={`skeleton bg-surface ${className}`} aria-hidden />;
}

export function SearchMap({ properties, className = "" }: SearchMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <MapPlaceholder className={className} />;
  }

  return (
    <Suspense fallback={<MapPlaceholder className={className} />}>
      <SearchMapView properties={properties} className={className} />
    </Suspense>
  );
}
