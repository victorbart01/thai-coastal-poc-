"use client";

import { useCallback } from "react";
import { Marker, type MarkerDragEvent } from "react-map-gl";
import { useMapStore } from "@/store/useMapStore";

export function DraggableSpotMarker() {
  const repositioningSpot = useMapStore((s) => s.repositioningSpot);
  const updateRepositioningCoords = useMapStore(
    (s) => s.updateRepositioningCoords
  );

  const handleDragEnd = useCallback(
    (e: MarkerDragEvent) => {
      updateRepositioningCoords(e.lngLat.lat, e.lngLat.lng);
    },
    [updateRepositioningCoords]
  );

  if (!repositioningSpot) return null;

  return (
    <Marker
      longitude={repositioningSpot.lng}
      latitude={repositioningSpot.lat}
      anchor="center"
      draggable
      onDragEnd={handleDragEnd}
    >
      <div className="relative flex items-center justify-center">
        {/* Pulsing ring — cyan to distinguish from pink draft marker */}
        <span className="absolute h-10 w-10 animate-ping rounded-full bg-cyan-400/30" />
        {/* Core dot */}
        <span className="relative h-5 w-5 rounded-full border-2 border-white bg-cyan-500 shadow-lg" />
      </div>
    </Marker>
  );
}
