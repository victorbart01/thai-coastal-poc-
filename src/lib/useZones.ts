"use client";

import { useState, useEffect, useMemo } from "react";
import { useMapStore } from "@/store/useMapStore";
import type { SeaGlassZone, ProtectedArea, RiverMouth } from "./types";
import type { Locale } from "./i18n";

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

/** Raw zone properties as stored in the GeoJSON (flat subscores, bilingual fields) */
interface RawZoneProperties {
  id: string;
  name_en: string;
  name_th: string;
  score: number;
  historical: number;
  morphology: number;
  river: number;
  ocean: number;
  population: number;
  category: SeaGlassZone["category"];
  classification: SeaGlassZone["classification"];
  photos?: string[];
  placeQuery?: string;
  notes_en: string;
  notes_th: string;
  region: SeaGlassZone["region"];
}

/** Raw protected area properties (bilingual notes) */
interface RawProtectedProperties {
  id: string;
  name: string;
  radiusKm: number;
  status: "prohibited" | "restricted";
  legalBasis: string;
  notes_en: string;
  notes_th: string;
}

/** Raw river mouth properties (bilingual name/majorCity) */
interface RawRiverProperties {
  id: string;
  name_en: string;
  name_th: string;
  populationUpstream: string;
  majorCity_en: string;
  majorCity_th: string;
}

/** Parse a zone GeoJSON feature into a SeaGlassZone using the given locale */
function parseZone(
  feature: GeoJSONFeature<RawZoneProperties>,
  locale: Locale
): SeaGlassZone {
  const p = feature.properties;
  return {
    id: p.id,
    name: locale === "th" ? p.name_th : p.name_en,
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
    photos: p.photos,
    placeQuery: p.placeQuery,
    notes: locale === "th" ? p.notes_th : p.notes_en,
    region: p.region,
  };
}

/** Parse a protected area GeoJSON feature using the given locale */
function parseProtectedArea(
  feature: GeoJSONFeature<RawProtectedProperties>,
  locale: Locale
): ProtectedArea {
  const p = feature.properties;
  return {
    id: p.id,
    name: p.name,
    coordinates: feature.geometry.coordinates,
    radiusKm: p.radiusKm,
    status: p.status,
    legalBasis: p.legalBasis,
    notes: locale === "th" ? p.notes_th : p.notes_en,
  };
}

/** Parse a river mouth GeoJSON feature using the given locale */
function parseRiverMouth(
  feature: GeoJSONFeature<RawRiverProperties>,
  locale: Locale
): RiverMouth {
  const p = feature.properties;
  return {
    id: p.id,
    name: locale === "th" ? p.name_th : p.name_en,
    coordinates: feature.geometry.coordinates,
    populationUpstream: p.populationUpstream,
    majorCity: locale === "th" ? p.majorCity_th : p.majorCity_en,
  };
}

/** Hook that loads GeoJSON data and applies current filters from the store */
export function useZones() {
  const [rawZones, setRawZones] = useState<
    GeoJSONFeature<RawZoneProperties>[]
  >([]);
  const [rawProtected, setRawProtected] = useState<
    GeoJSONFeature<RawProtectedProperties>[]
  >([]);
  const [rawRivers, setRawRivers] = useState<
    GeoJSONFeature<RawRiverProperties>[]
  >([]);
  const [loading, setLoading] = useState(true);

  const filters = useMapStore((s) => s.filters);
  const locale = useMapStore((s) => s.locale);

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
        const protectedJson: GeoJSONCollection<RawProtectedProperties> =
          await protectedRes.json();
        const riversJson: GeoJSONCollection<RawRiverProperties> =
          await riversRes.json();

        setRawZones(zonesJson.features);
        setRawProtected(protectedJson.features);
        setRawRivers(riversJson.features);
      } catch (err) {
        console.error("Failed to load GeoJSON data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Parse zones with locale
  const allZones = useMemo(
    () => rawZones.map((f) => parseZone(f, locale)),
    [rawZones, locale]
  );

  // Parse protected areas with locale
  const protectedAreas = useMemo(
    () => rawProtected.map((f) => parseProtectedArea(f, locale)),
    [rawProtected, locale]
  );

  // Parse river mouths with locale
  const riverMouths = useMemo(
    () => rawRivers.map((f) => parseRiverMouth(f, locale)),
    [rawRivers, locale]
  );

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
