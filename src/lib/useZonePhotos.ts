"use client";

import { useState, useEffect, useRef } from "react";
import type { SeaGlassZone } from "./types";

/** Global cache shared across hook instances to avoid refetching */
const globalCache = new Map<string, string[]>();

/**
 * Fetches photos for a zone on demand.
 * - If the zone already has local photos (e.g. Koh Sichang), returns them immediately.
 * - Otherwise, calls /api/photos to get Google Places photos.
 * - Caches results globally to avoid redundant API calls.
 */
export function useZonePhotos(zone: SeaGlassZone) {
  const [photos, setPhotos] = useState<string[]>(zone.photos ?? []);
  const [loading, setLoading] = useState(false);
  const fetchedRef = useRef<string | null>(null);

  useEffect(() => {
    // If zone has local photos, use them directly
    if (zone.photos && zone.photos.length > 0) {
      setPhotos(zone.photos);
      setLoading(false);
      return;
    }

    // If no placeQuery, no photos to fetch
    if (!zone.placeQuery) {
      setPhotos([]);
      setLoading(false);
      return;
    }

    // If already fetched for this zone, skip
    if (fetchedRef.current === zone.id) return;

    // Check global cache
    if (globalCache.has(zone.id)) {
      setPhotos(globalCache.get(zone.id)!);
      setLoading(false);
      fetchedRef.current = zone.id;
      return;
    }

    // Fetch from API
    fetchedRef.current = zone.id;
    setLoading(true);

    fetch(`/api/photos?zoneId=${zone.id}`)
      .then((res) => res.json())
      .then((data: { photos: string[] }) => {
        const urls = data.photos ?? [];
        globalCache.set(zone.id, urls);
        setPhotos(urls);
      })
      .catch((err) => {
        console.error("Failed to fetch zone photos:", err);
        setPhotos([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [zone.id, zone.photos, zone.placeQuery]);

  return { photos, loading };
}
