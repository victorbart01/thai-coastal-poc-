"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useTranslation } from "@/lib/i18n";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
const DEBOUNCE_MS = 300;

export interface Suggestion {
  mapbox_id: string;
  name: string;
  place_formatted: string;
}

interface RetrieveResult {
  name: string;
  latitude: number;
  longitude: number;
}

export function useGeocoding() {
  const { locale } = useTranslation();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const sessionTokenRef = useRef(crypto.randomUUID());
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const abortRef = useRef<AbortController>();

  // Debounced suggest
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (abortRef.current) abortRef.current.abort();

    if (query.length < 2) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    timerRef.current = setTimeout(async () => {
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const params = new URLSearchParams({
          q: query,
          access_token: MAPBOX_TOKEN,
          session_token: sessionTokenRef.current,
          language: locale,
          types: "place,locality,district",
          limit: "5",
        });

        const res = await fetch(
          `https://api.mapbox.com/search/searchbox/v1/suggest?${params}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Suggest failed");

        const data = await res.json();
        const items: Suggestion[] = (data.suggestions ?? []).map(
          (s: { mapbox_id: string; name: string; place_formatted?: string }) => ({
            mapbox_id: s.mapbox_id,
            name: s.name,
            place_formatted: s.place_formatted ?? "",
          })
        );
        setSuggestions(items);
      } catch {
        // Aborted or network error — ignore
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, locale]);

  const retrieve = useCallback(
    async (mapboxId: string): Promise<RetrieveResult | null> => {
      try {
        const params = new URLSearchParams({
          access_token: MAPBOX_TOKEN,
          session_token: sessionTokenRef.current,
        });

        const res = await fetch(
          `https://api.mapbox.com/search/searchbox/v1/retrieve/${mapboxId}?${params}`
        );

        if (!res.ok) throw new Error("Retrieve failed");

        const data = await res.json();
        const feature = data.features?.[0];
        if (!feature) return null;

        const [lng, lat] = feature.geometry.coordinates;
        const name =
          feature.properties?.name ?? feature.properties?.full_address ?? "";

        // Reset session token after a retrieve (per Mapbox billing best practice)
        sessionTokenRef.current = crypto.randomUUID();

        return { name, latitude: lat, longitude: lng };
      } catch {
        return null;
      }
    },
    []
  );

  return { query, setQuery, suggestions, loading, retrieve };
}
