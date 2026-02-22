"use client";

import { Marker } from "react-map-gl";
import type { RiverMouth } from "@/lib/types";

interface RiverLayerProps {
  riverMouths: RiverMouth[];
  onRiverClick: (river: RiverMouth) => void;
}

/**
 * River mouth markers — pulsing blue circles with dashed borders.
 * Uses HTML Markers for CSS animation support.
 */
export function RiverLayer({ riverMouths, onRiverClick }: RiverLayerProps) {
  return (
    <>
      {riverMouths.map((river) => (
        <Marker
          key={river.id}
          longitude={river.coordinates[0]}
          latitude={river.coordinates[1]}
          anchor="center"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            onRiverClick(river);
          }}
        >
          <div className="relative cursor-pointer" title={river.name}>
            {/* Pulse ring */}
            <div className="animate-pulse-river absolute inset-[-4px] rounded-full border-2 border-dashed border-river opacity-40" />
            {/* Core circle */}
            <div className="h-3.5 w-3.5 rounded-full border-2 border-dashed border-river bg-river/20" />
          </div>
        </Marker>
      ))}
    </>
  );
}
