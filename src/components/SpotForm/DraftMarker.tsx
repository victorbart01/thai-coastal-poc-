"use client";

import { Marker } from "react-map-gl";
import { useMapStore } from "@/store/useMapStore";

export function DraftMarker() {
  const draftSpot = useMapStore((s) => s.draftSpot);

  if (draftSpot.latitude === null || draftSpot.longitude === null) return null;

  return (
    <Marker
      longitude={draftSpot.longitude}
      latitude={draftSpot.latitude}
      anchor="center"
    >
      <div className="relative flex items-center justify-center">
        {/* Pulsing ring */}
        <span className="absolute h-8 w-8 animate-ping rounded-full bg-pink-400/30" />
        {/* Core dot */}
        <span className="relative h-4 w-4 rounded-full border-2 border-white bg-pink-400 shadow-lg" />
      </div>
    </Marker>
  );
}
