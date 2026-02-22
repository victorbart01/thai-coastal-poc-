"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useMapStore } from "@/store/useMapStore";
import type { Spot, SpotPhoto, SpotAuthor, SpotTag } from "@/lib/types";

export function useSpots() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);
  const showSpots = useMapStore((s) => s.showSpots);

  const fetchSpots = useCallback(async () => {
    const supabase = createClient();

    // 1. Fetch spots + photos (direct FK works)
    const { data, error } = await supabase
      .from("spots")
      .select(
        `
        *,
        spot_photos ( id, storage_path, position )
      `
      )
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch spots:", error);
      setLoading(false);
      return;
    }

    if (!data || data.length === 0) {
      setSpots([]);
      setLoading(false);
      return;
    }

    // 2. Fetch profiles for all unique user_ids
    const userIds = Array.from(new Set(data.map((r) => r.user_id)));
    const { data: profiles } = await supabase
      .from("user_profiles")
      .select("id, display_name, avatar_url")
      .in("id", userIds);

    const profileMap = new Map<string, SpotAuthor>();
    for (const p of profiles ?? []) {
      profileMap.set(p.id, p);
    }

    // 3. Merge
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

    const mapped: Spot[] = data.map((row) => {
      const photos = (
        (row.spot_photos as Array<{
          id: string;
          storage_path: string;
          position: number;
        }>) ?? []
      )
        .sort((a, b) => a.position - b.position)
        .map(
          (p): SpotPhoto => ({
            id: p.id,
            storage_path: p.storage_path,
            position: p.position,
            url: `${supabaseUrl}/storage/v1/object/public/spot-photos/${p.storage_path}`,
          })
        );

      const author = profileMap.get(row.user_id) ?? {
        id: row.user_id,
        display_name: null,
        avatar_url: null,
      };

      return {
        id: row.id,
        user_id: row.user_id,
        title: row.title,
        description: row.description ?? "",
        latitude: row.latitude,
        longitude: row.longitude,
        rating: row.rating,
        tags: (row.tags ?? []) as SpotTag[],
        status: row.status,
        created_at: row.created_at,
        updated_at: row.updated_at,
        photos,
        author,
      };
    });

    setSpots(mapped);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSpots();
  }, [fetchSpots]);

  const filteredSpots = showSpots ? spots : [];

  return { spots: filteredSpots, allSpots: spots, loading, refetch: fetchSpots };
}
