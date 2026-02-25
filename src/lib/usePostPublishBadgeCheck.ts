"use client";

import { useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { checkBadgeCriteria } from "@/lib/badges";
import { useNotifications } from "@/lib/useNotifications";
import type { UserStats } from "@/lib/types";

export function usePostPublishBadgeCheck(userId: string) {
  const processingRef = useRef(false);
  const { showBadgeToast } = useNotifications();

  const checkBadges = useCallback(
    async (t: (key: string) => string) => {
      if (processingRef.current) return;
      processingRef.current = true;

      try {
        const supabase = createClient();

        // Fetch fresh stats in parallel
        const [
          profileRes,
          spotsRes,
          commentsRes,
          likesGivenRes,
          savesRes,
          earnedRes,
        ] = await Promise.all([
          supabase
            .from("user_profiles")
            .select("created_at")
            .eq("id", userId)
            .single(),
          supabase
            .from("spots")
            .select("id, tags, spot_photos(id)")
            .eq("user_id", userId)
            .eq("status", "published"),
          supabase
            .from("comments")
            .select("id", { count: "exact", head: true })
            .eq("user_id", userId),
          supabase
            .from("likes")
            .select("id", { count: "exact", head: true })
            .eq("user_id", userId),
          supabase
            .from("saves")
            .select("id", { count: "exact", head: true })
            .eq("user_id", userId),
          supabase
            .from("user_badges")
            .select("badge_id")
            .eq("user_id", userId),
        ]);

        const spots = spotsRes.data ?? [];
        const spotIds = spots.map((s) => s.id);

        // Fetch like counts for user's spots
        let totalLikesReceived = 0;
        let maxLikesOnSpot = 0;
        if (spotIds.length > 0) {
          const { data: likesData } = await supabase
            .from("likes")
            .select("spot_id")
            .in("spot_id", spotIds);
          const countMap = new Map<string, number>();
          for (const l of likesData ?? []) {
            countMap.set(l.spot_id, (countMap.get(l.spot_id) ?? 0) + 1);
          }
          countMap.forEach((c) => {
            totalLikesReceived += c;
            if (c > maxLikesOnSpot) maxLikesOnSpot = c;
          });
        }

        // Compute photo count
        let photosCount = 0;
        for (const s of spots) {
          photosCount += (s.spot_photos as unknown[])?.length ?? 0;
        }

        // Unique tags
        const allTags = new Set(spots.flatMap((s) => (s.tags as string[]) ?? []));

        const memberDays = profileRes.data
          ? Math.floor(
              (Date.now() - new Date(profileRes.data.created_at).getTime()) /
                (1000 * 60 * 60 * 24)
            )
          : 0;

        const stats: UserStats = {
          spots_count: spots.length,
          photos_count: photosCount,
          total_likes_received: totalLikesReceived,
          max_likes_on_spot: maxLikesOnSpot,
          member_days: memberDays,
          comments_count: commentsRes.count ?? 0,
          saves_count: savesRes.count ?? 0,
          likes_given: likesGivenRes.count ?? 0,
          unique_tags_used: allTags.size,
        };

        // Determine new badges
        const qualified = checkBadgeCriteria(stats);
        const alreadyEarned = new Set(
          (earnedRes.data ?? []).map((r) => r.badge_id)
        );
        const newBadges = qualified.filter((id) => !alreadyEarned.has(id));

        if (newBadges.length === 0) return;

        // Insert new badges in DB
        const rows = newBadges.map((badge_id) => ({
          user_id: userId,
          badge_id,
        }));
        await supabase.from("user_badges").insert(rows);

        // Show toasts with stagger
        for (let i = 0; i < newBadges.length; i++) {
          setTimeout(() => {
            showBadgeToast(newBadges[i], t);
          }, i * 800);
        }
      } finally {
        processingRef.current = false;
      }
    },
    [userId, showBadgeToast]
  );

  return { checkBadges };
}
