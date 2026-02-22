"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useMapStore } from "@/store/useMapStore";
import type { Spot, SpotPhoto, SpotTag } from "@/lib/types";

export function useSpots() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);
  const showSpots = useMapStore((s) => s.showSpots);

  const fetchSpots = useCallback(async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("spots")
      .select(
        `
        *,
        spot_photos ( id, storage_path, position ),
        user_profiles!spots_user_id_fkey ( id, display_name, avatar_url )
      `
      )
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch spots:", error);
      setLoading(false);
      return;
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

    const mapped: Spot[] = (data ?? []).map((row: Record<string, unknown>) => {
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

      const profile = row.user_profiles as {
        id: string;
        display_name: string | null;
        avatar_url: string | null;
      } | null;

      return {
        id: row.id as string,
        user_id: row.user_id as string,
        title: row.title as string,
        description: (row.description as string) ?? "",
        latitude: row.latitude as number,
        longitude: row.longitude as number,
        rating: row.rating as number,
        tags: ((row.tags as string[]) ?? []) as SpotTag[],
        status: row.status as string,
        created_at: row.created_at as string,
        updated_at: row.updated_at as string,
        photos,
        author: profile ?? {
          id: row.user_id as string,
          display_name: null,
          avatar_url: null,
        },
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
