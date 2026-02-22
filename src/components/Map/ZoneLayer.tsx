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
      // Color by score thresholds
      "circle-color": [
        "case",
        [">=", ["get", "score"], 0.75],
        "#06b6d4",
        [">=", ["get", "score"], 0.55],
        "#22d3ee",
        [">=", ["get", "score"], 0.35],
        "#facc15",
        [">=", ["get", "score"], 0.15],
        "#fb923c",
        "#64748b",
      ],
      // Opacity: 0.9 on hover, 0.7 otherwise
      "circle-opacity": [
        "case",
        ["==", ["get", "id"], hoveredZoneId ?? ""],
        0.9,
        0.7,
      ],
      // Stroke: 2px, same color as fill
      "circle-stroke-width": 2,
      "circle-stroke-color": [
        "case",
        [">=", ["get", "score"], 0.75],
        "#06b6d4",
        [">=", ["get", "score"], 0.55],
        "#22d3ee",
        [">=", ["get", "score"], 0.35],
        "#facc15",
        [">=", ["get", "score"], 0.15],
        "#fb923c",
        "#64748b",
      ],
    },
  };

  return (
    <Source id="zones-source" type="geojson" data={geojson}>
      <Layer {...circleLayer} />
    </Source>
  );
}
