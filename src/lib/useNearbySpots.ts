"use client";

import { useMemo } from "react";
import type { Spot } from "@/lib/types";
import { filterByProximity } from "@/lib/geo";
import { useMapStore } from "@/store/useMapStore";

const SEARCH_RADIUS_KM = 50;

/** If a search location is active, return only spots within 50 km. Otherwise all spots. */
export function useNearbySpots(spots: Spot[]): Spot[] {
  const searchLocation = useMapStore((s) => s.searchLocation);

  return useMemo(() => {
    if (!searchLocation) return spots;
    return filterByProximity(spots, searchLocation, SEARCH_RADIUS_KM);
  }, [spots, searchLocation]);
}
