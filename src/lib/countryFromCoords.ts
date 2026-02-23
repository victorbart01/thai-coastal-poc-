/**
 * Lightweight lat/lng → country mapper using bounding boxes.
 * Covers SE Asian countries relevant to this coastal POC.
 * Ordered by specificity (smaller countries first) to avoid overlap.
 */

interface Country {
  name: string;
  flag: string;
  bounds: { latMin: number; latMax: number; lngMin: number; lngMax: number };
}

const COUNTRIES: Country[] = [
  // Smallest / most specific first
  {
    name: "Singapore",
    flag: "🇸🇬",
    bounds: { latMin: 1.15, latMax: 1.47, lngMin: 103.6, lngMax: 104.1 },
  },
  {
    name: "Brunei",
    flag: "🇧🇳",
    bounds: { latMin: 4.0, latMax: 5.05, lngMin: 114.0, lngMax: 115.4 },
  },
  {
    name: "Cambodia",
    flag: "🇰🇭",
    bounds: { latMin: 10.4, latMax: 14.7, lngMin: 102.3, lngMax: 107.6 },
  },
  {
    name: "Laos",
    flag: "🇱🇦",
    bounds: { latMin: 13.9, latMax: 22.5, lngMin: 100.1, lngMax: 107.7 },
  },
  {
    name: "Philippines",
    flag: "🇵🇭",
    bounds: { latMin: 4.6, latMax: 21.1, lngMin: 116.9, lngMax: 126.6 },
  },
  {
    name: "Vietnam",
    flag: "🇻🇳",
    bounds: { latMin: 8.4, latMax: 23.4, lngMin: 102.1, lngMax: 109.5 },
  },
  {
    name: "Myanmar",
    flag: "🇲🇲",
    bounds: { latMin: 9.8, latMax: 28.5, lngMin: 92.2, lngMax: 101.2 },
  },
  {
    name: "Malaysia",
    flag: "🇲🇾",
    bounds: { latMin: 0.85, latMax: 7.4, lngMin: 99.6, lngMax: 119.3 },
  },
  {
    name: "Thailand",
    flag: "🇹🇭",
    bounds: { latMin: 5.6, latMax: 20.5, lngMin: 97.3, lngMax: 105.6 },
  },
  {
    name: "Indonesia",
    flag: "🇮🇩",
    bounds: { latMin: -11.0, latMax: 6.0, lngMin: 95.0, lngMax: 141.0 },
  },
];

const OTHER = { name: "Other", flag: "🌏" } as const;

export function countryFromCoords(
  lat: number,
  lng: number
): { name: string; flag: string } {
  for (const c of COUNTRIES) {
    const { latMin, latMax, lngMin, lngMax } = c.bounds;
    if (lat >= latMin && lat <= latMax && lng >= lngMin && lng <= lngMax) {
      return { name: c.name, flag: c.flag };
    }
  }
  return OTHER;
}
