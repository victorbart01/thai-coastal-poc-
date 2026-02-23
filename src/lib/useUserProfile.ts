"use client";

import { useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Spot, SpotPhoto, SpotTag, UserStats, SpotAuthor } from "@/lib/types";

interface UserProfile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [spots, setSpots] = useState<Spot[]>([]);
  const [savedSpots, setSavedSpots] = useState<Spot[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId: string) => {
    setLoading(true);
    const supabase = createClient();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

    // Parallel fetch: profile, spots+photos, likes received, user_badges
    const [profileRes, spotsRes] = await Promise.all([
      supabase.from("user_profiles").select("*").eq("id", userId).single(),
      supabase
        .from("spots")
        .select("*, spot_photos ( id, storage_path, position )")
        .eq("user_id", userId)
        .eq("status", "published")
        .order("created_at", { ascending: false }),
    ]);

    const profileData = profileRes.data;
    if (!profileData) {
      setLoading(false);
      return;
    }

    setProfile({
      id: profileData.id,
      display_name: profileData.display_name,
      avatar_url: profileData.avatar_url,
      bio: profileData.bio ?? null,
      created_at: profileData.created_at,
    });

    const spotRows = spotsRes.data ?? [];
    const spotIds = spotRows.map((r) => r.id);

    // Fetch like counts for all user spots
    let likeCountMap = new Map<string, number>();
    if (spotIds.length > 0) {
      const { data: likesData } = await supabase
        .from("likes")
        .select("spot_id")
        .in("spot_id", spotIds);
      for (const l of likesData ?? []) {
        likeCountMap.set(l.spot_id, (likeCountMap.get(l.spot_id) ?? 0) + 1);
      }
    }

    const author: SpotAuthor = {
      id: profileData.id,
      display_name: profileData.display_name,
      avatar_url: profileData.avatar_url,
    };

    let totalPhotos = 0;
    const mappedSpots: Spot[] = spotRows.map((row) => {
      const photos = (
        (row.spot_photos as Array<{ id: string; storage_path: string; position: number }>) ?? []
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

      totalPhotos += photos.length;

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
        like_count: likeCountMap.get(row.id) ?? 0,
        comment_count: 0,
      };
    });

    setSpots(mappedSpots);

    // Fetch saved spots (RLS: only returns rows for the authenticated user)
    const { data: savesData } = await supabase
      .from("saves")
      .select("spot_id")
      .eq("user_id", userId);

    const savedSpotIds = (savesData ?? []).map((s) => s.spot_id);
    if (savedSpotIds.length > 0) {
      const { data: savedRows } = await supabase
        .from("spots")
        .select("*, spot_photos ( id, storage_path, position ), user_profiles!spots_user_id_fkey ( id, display_name, avatar_url )")
        .in("id", savedSpotIds)
        .eq("status", "published");

      const mapped: Spot[] = (savedRows ?? []).map((row) => {
        const authorData = row.user_profiles as unknown as { id: string; display_name: string | null; avatar_url: string | null } | null;
        const photos = (
          (row.spot_photos as Array<{ id: string; storage_path: string; position: number }>) ?? []
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
          author: {
            id: authorData?.id ?? row.user_id,
            display_name: authorData?.display_name ?? null,
            avatar_url: authorData?.avatar_url ?? null,
          },
          like_count: 0,
          comment_count: 0,
        };
      });
      setSavedSpots(mapped);
    } else {
      setSavedSpots([]);
    }

    // Compute stats
    const totalLikes = mappedSpots.reduce((sum, s) => sum + (s.like_count ?? 0), 0);
    const maxLikes = mappedSpots.reduce(
      (max, s) => Math.max(max, s.like_count ?? 0),
      0
    );
    const memberDays = Math.floor(
      (Date.now() - new Date(profileData.created_at).getTime()) / (1000 * 60 * 60 * 24)
    );

    setStats({
      spots_count: mappedSpots.length,
      photos_count: totalPhotos,
      total_likes_received: totalLikes,
      max_likes_on_spot: maxLikes,
      member_days: memberDays,
    });

    setLoading(false);
  }, []);

  return { profile, spots, savedSpots, stats, loading, fetchProfile };
}
