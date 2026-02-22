"use client";

import { useMemo } from "react";
import { Source, Layer } from "react-map-gl";
import type { CircleLayer, SymbolLayer } from "react-map-gl";
import type { Spot } from "@/lib/types";
import type { FeatureCollection, Point } from "geojson";

interface SpotLayerProps {
  spots: Spot[];
}

function spotsToGeoJSON(spots: Spot[]): FeatureCollection<Point> {
  return {
    type: "FeatureCollection",
    features: spots.map((spot) => ({
      type: "Feature" as const,
      geometry: {
        type: "Point" as const,
        coordinates: [spot.longitude, spot.latitude],
      },
      properties: {
        id: spot.id,
        title: spot.title,
        rating: spot.rating,
      },
    })),
  };
}

const SPOT_COLOR = "#f472b6"; // pink-400

const clusterLayer: CircleLayer = {
  id: "spots-clusters",
  source: "spots-source",
  type: "circle",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": SPOT_COLOR,
    "circle-opacity": 0.7,
    "circle-radius": ["step", ["get", "point_count"], 18, 10, 24, 50, 32],
    "circle-stroke-width": 2,
    "circle-stroke-color": "#ffffff",
    "circle-stroke-opacity": 0.4,
  },
};

const clusterCountLayer: SymbolLayer = {
  id: "spots-cluster-count",
  source: "spots-source",
  type: "symbol",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-size": 12,
    "text-font": ["DIN Pro Medium", "Arial Unicode MS Bold"],
  },
  paint: {
    "text-color": "#ffffff",
  },
};

const unclusteredLayer: CircleLayer = {
  id: "spots-unclustered",
  source: "spots-source",
  type: "circle",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": SPOT_COLOR,
    "circle-radius": 7,
    "circle-opacity": 0.85,
    "circle-stroke-width": 2,
    "circle-stroke-color": "#ffffff",
    "circle-stroke-opacity": 0.6,
  },
};

export function SpotLayer({ spots }: SpotLayerProps) {
  const geojson = useMemo(() => spotsToGeoJSON(spots), [spots]);

  return (
    <Source
      id="spots-source"
      type="geojson"
      data={geojson}
      cluster={true}
      clusterMaxZoom={14}
      clusterRadius={50}
    >
      <Layer {...clusterLayer} />
      <Layer {...clusterCountLayer} />
      <Layer {...unclusteredLayer} />
    </Source>
  );
}
