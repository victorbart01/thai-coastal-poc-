"use client";

import { useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { SpotSocialCounts } from "@/lib/types";

export function useSpotSocial() {
  const [social, setSocial] = useState<SpotSocialCounts | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchSocial = useCallback(async (spotId: string, userId?: string) => {
    setLoading(true);
    const supabase = createClient();

    const [likesRes, commentsRes, isLikedRes, isSavedRes] = await Promise.all([
      // Like count
      supabase
        .from("likes")
        .select("id", { count: "exact", head: true })
        .eq("spot_id", spotId),
      // Comment count
      supabase
        .from("comments")
        .select("id", { count: "exact", head: true })
        .eq("spot_id", spotId),
      // Is liked by current user
      userId
        ? supabase
            .from("likes")
            .select("id")
            .eq("spot_id", spotId)
            .eq("user_id", userId)
            .maybeSingle()
        : Promise.resolve({ data: null }),
      // Is saved by current user
      userId
        ? supabase
            .from("saves")
            .select("id")
            .eq("spot_id", spotId)
            .eq("user_id", userId)
            .maybeSingle()
        : Promise.resolve({ data: null }),
    ]);

    setSocial({
      like_count: likesRes.count ?? 0,
      comment_count: commentsRes.count ?? 0,
      is_liked: !!isLikedRes.data,
      is_saved: !!isSavedRes.data,
    });

    setLoading(false);
  }, []);

  return { social, loading, fetchSocial };
}
