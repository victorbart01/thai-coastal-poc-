import type { Spot } from "@/lib/types";

const EARTH_RADIUS_KM = 6371;

/** Haversine distance between two lat/lng points, in km. */
export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Return only spots within `radiusKm` of the given center. */
export function filterByProximity(
  spots: Spot[],
  center: { latitude: number; longitude: number },
  radiusKm: number
): Spot[] {
  return spots.filter(
    (s) =>
      haversineDistance(
        center.latitude,
        center.longitude,
        s.latitude,
        s.longitude
      ) <= radiusKm
  );
}
