"use client";

import { useEffect, useState } from "react";
import { countryFromCoords, flagFromCountryName } from "./countryFromCoords";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface ReverseGeocodeResult {
  placeName: string | null;
  country: string | null;
  countryFlag: string | null;
  loading: boolean;
}

// Module-level cache keyed by rounded coords
const cache = new Map<string, { placeName: string | null; country: string | null; countryFlag: string | null }>();

function cacheKey(lat: number, lng: number) {
  return `${lat.toFixed(4)},${lng.toFixed(4)}`;
}

export function useReverseGeocode(lat: number, lng: number): ReverseGeocodeResult {
  const [result, setResult] = useState<ReverseGeocodeResult>(() => {
    const cached = cache.get(cacheKey(lat, lng));
    if (cached) return { ...cached, loading: false };
    return { placeName: null, country: null, countryFlag: null, loading: true };
  });

  useEffect(() => {
    const key = cacheKey(lat, lng);
    const cached = cache.get(key);
    if (cached) {
      setResult({ ...cached, loading: false });
      return;
    }

    let cancelled = false;

    async function fetchGeocode() {
      try {
        const url = `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${lng}&latitude=${lat}&types=poi,address,neighborhood,locality,place&language=en&access_token=${MAPBOX_TOKEN}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Mapbox ${res.status}`);
        const data = await res.json();

        let placeName: string | null = null;
        let country: string | null = null;
        let countryFlag: string | null = null;

        const feature = data.features?.[0];
        if (feature) {
          placeName = feature.properties?.name ?? feature.properties?.full_address ?? null;
          const ctx = feature.properties?.context;
          if (ctx?.country?.name) {
            country = ctx.country.name;
          }
        }

        // Derive flag from Mapbox country name; fall back to bounding-box
        if (country) {
          countryFlag = flagFromCountryName(country);
        } else {
          const bb = countryFromCoords(lat, lng);
          countryFlag = bb.flag;
          country = bb.name !== "Other" ? bb.name : null;
        }

        const entry = { placeName, country, countryFlag };
        cache.set(key, entry);
        if (!cancelled) setResult({ ...entry, loading: false });
      } catch {
        // On error, fall back to bounding-box country only
        const bb = countryFromCoords(lat, lng);
        const entry = {
          placeName: null,
          country: bb.name !== "Other" ? bb.name : null,
          countryFlag: bb.flag,
        };
        cache.set(key, entry);
        if (!cancelled) setResult({ ...entry, loading: false });
      }
    }

    fetchGeocode();
    return () => { cancelled = true; };
  }, [lat, lng]);

  return result;
}
