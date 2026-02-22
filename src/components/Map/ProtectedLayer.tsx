"use client";

import { useMemo } from "react";
import { Source, Layer } from "react-map-gl";
import type { FillLayer, LineLayer } from "react-map-gl";
import { circle as turfCircle } from "@turf/turf";
import type { ProtectedArea } from "@/lib/types";
import type { FeatureCollection, Polygon } from "geojson";

interface ProtectedLayerProps {
  protectedAreas: ProtectedArea[];
}

/**
 * Protected areas layer — semi-transparent red circles with dashed borders.
 * Uses @turf/turf to generate polygon circles from center + radiusKm.
 */
export function ProtectedLayer({ protectedAreas }: ProtectedLayerProps) {
  const geojson: FeatureCollection<Polygon> = useMemo(() => {
    return {
      type: "FeatureCollection",
      features: protectedAreas.map((area) => {
        const poly = turfCircle(area.coordinates, area.radiusKm, {
          units: "kilometers",
          steps: 64,
        });
        poly.properties = {
          id: area.id,
          name: area.name,
          status: area.status,
          legalBasis: area.legalBasis,
          notes: area.notes,
          radiusKm: area.radiusKm,
        };
        return poly;
      }),
    };
  }, [protectedAreas]);

  const fillLayer: FillLayer = {
    id: "protected-fill",
    source: "protected-source",
    type: "fill",
    paint: {
      "fill-color": "#ef4444",
      "fill-opacity": 0.08,
    },
  };

  const lineLayer: LineLayer = {
    id: "protected-line",
    source: "protected-source",
    type: "line",
    paint: {
      "line-color": "#ef4444",
      "line-opacity": 0.5,
      "line-width": 1.5,
      "line-dasharray": [4, 4],
    },
  };

  return (
    <Source id="protected-source" type="geojson" data={geojson}>
      <Layer {...fillLayer} />
      <Layer {...lineLayer} />
    </Source>
  );
}
