"use client";

import { useState, useEffect, useMemo } from "react";
import { useMapStore } from "@/store/useMapStore";
import type { SeaGlassZone, ProtectedArea, RiverMouth } from "./types";

interface GeoJSONFeature<T> {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: T;
}

interface GeoJSONCollection<T> {
  type: "FeatureCollection";
  features: GeoJSONFeature<T>[];
}

/** Raw zone properties as stored in the GeoJSON (flat subscores) */
interface RawZoneProperties {
  id: string;
  name: string;
  score: number;
  historical: number;
  morphology: number;
  river: number;
  ocean: number;
  population: number;
  category: SeaGlassZone["category"];
  classification: SeaGlassZone["classification"];
  notes: string;
  region: SeaGlassZone["region"];
}

/** Parse a zone GeoJSON feature into a SeaGlassZone */
function parseZone(feature: GeoJSONFeature<RawZoneProperties>): SeaGlassZone {
  const p = feature.properties;
  return {
    id: p.id,
    name: p.name,
    coordinates: feature.geometry.coordinates,
    score: p.score,
    subscores: {
      historical: p.historical,
      morphology: p.morphology,
      river: p.river,
      ocean: p.ocean,
      population: p.population,
    },
    category: p.category,
    classification: p.classification,
    notes: p.notes,
    region: p.region,
  };
}

/** Parse a protected area GeoJSON feature */
function parseProtectedArea(
  feature: GeoJSONFeature<ProtectedArea>
): ProtectedArea {
  const p = feature.properties;
  return {
    ...p,
    coordinates: feature.geometry.coordinates,
  };
}

/** Parse a river mouth GeoJSON feature */
function parseRiverMouth(feature: GeoJSONFeature<RiverMouth>): RiverMouth {
  const p = feature.properties;
  return {
    ...p,
    coordinates: feature.geometry.coordinates,
  };
}

/** Hook that loads GeoJSON data and applies current filters from the store */
export function useZones() {
  const [allZones, setAllZones] = useState<SeaGlassZone[]>([]);
  const [protectedAreas, setProtectedAreas] = useState<ProtectedArea[]>([]);
  const [riverMouths, setRiverMouths] = useState<RiverMouth[]>([]);
  const [loading, setLoading] = useState(true);

  const filters = useMapStore((s) => s.filters);

  // Load GeoJSON files on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [zonesRes, protectedRes, riversRes] = await Promise.all([
          fetch("/data/zones.geojson"),
          fetch("/data/protected-areas.geojson"),
          fetch("/data/rivers.geojson"),
        ]);

        const zonesJson: GeoJSONCollection<RawZoneProperties> =
          await zonesRes.json();
        const protectedJson: GeoJSONCollection<ProtectedArea> =
          await protectedRes.json();
        const riversJson: GeoJSONCollection<RiverMouth> =
          await riversRes.json();

        setAllZones(zonesJson.features.map(parseZone));
        setProtectedAreas(protectedJson.features.map(parseProtectedArea));
        setRiverMouths(riversJson.features.map(parseRiverMouth));
      } catch (err) {
        console.error("Failed to load GeoJSON data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Apply filters to zones
  const filteredZones = useMemo(() => {
    return allZones.filter((zone) => {
      // Min score filter
      if (zone.score < filters.minScore) return false;

      // Classification filters
      const cls = zone.classification;
      if (
        (cls === "very_high" || cls === "high") &&
        !filters.showHigh
      )
        return false;
      if (cls === "medium" && !filters.showMedium) return false;
      if (
        (cls === "low" || cls === "very_low") &&
        !filters.showLow
      )
        return false;

      return true;
    });
  }, [allZones, filters]);

  // Filter protected areas and rivers based on toggle
  const filteredProtected = useMemo(
    () => (filters.showProtected ? protectedAreas : []),
    [protectedAreas, filters.showProtected]
  );

  const filteredRivers = useMemo(
    () => (filters.showRivers ? riverMouths : []),
    [riverMouths, filters.showRivers]
  );

  return {
    allZones,
    filteredZones,
    protectedAreas: filteredProtected,
    riverMouths: filteredRivers,
    loading,
  };
}
