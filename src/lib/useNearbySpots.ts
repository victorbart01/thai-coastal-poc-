"use client";

import { useMemo } from "react";
import type { Spot } from "@/lib/types";
import { filterByProximity } from "@/lib/geo";
import { useMapStore } from "@/store/useMapStore";

const SEARCH_RADIUS_KM = 50;
const USER_LOCATION_RADIUS_KM = 2000;

/**
 * Priority: searchLocation (50km) > userLocation (2000km) > all spots.
 */
export function useNearbySpots(spots: Spot[]): Spot[] {
  const searchLocation = useMapStore((s) => s.searchLocation);
  const userLocation = useMapStore((s) => s.userLocation);

  return useMemo(() => {
    if (searchLocation) {
      return filterByProximity(spots, searchLocation, SEARCH_RADIUS_KM);
    }
    if (userLocation) {
      return filterByProximity(spots, userLocation, USER_LOCATION_RADIUS_KM);
    }
    return spots;
  }, [spots, searchLocation, userLocation]);
}
