"use client";

import { Source, Layer } from "react-map-gl";
import type { CircleLayer } from "react-map-gl";
import type { FeatureCollection, Point } from "geojson";

interface ZoneLayerProps {
  geojson: FeatureCollection<Point>;
  hoveredZoneId: string | null;
}

/**
 * Zone circles layer — radius and color driven by score.
 * Hover effect: +4px radius, opacity 0.9.
 */
export function ZoneLayer({ geojson, hoveredZoneId }: ZoneLayerProps) {
  const circleLayer: CircleLayer = {
    id: "zones-circle",
    source: "zones-source",
    type: "circle",
    paint: {
      // Radius: 6 + score * 16, +4 on hover
      "circle-radius": [
        "case",
        ["==", ["get", "id"], hoveredZoneId ?? ""],
        ["+", ["+", 6, ["*", ["get", "score"], 16]], 4],
        ["+", 6, ["*", ["get", "score"], 16]],
      ],
      // Uniform neutral color
      "circle-color": "#94a3b8",
      // Opacity: 0.7 on hover, 0.5 otherwise
      "circle-opacity": [
        "case",
        ["==", ["get", "id"], hoveredZoneId ?? ""],
        0.7,
        0.5,
      ],
      // Stroke: 2px, neutral
      "circle-stroke-width": 2,
      "circle-stroke-color": "#94a3b8",
    },
  };

  return (
    <Source id="zones-source" type="geojson" data={geojson}>
      <Layer {...circleLayer} />
    </Source>
  );
}
