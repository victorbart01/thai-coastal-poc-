"use client";

import { useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { BADGE_DEFINITIONS, checkBadgeCriteria } from "@/lib/badges";
import type { Badge, UserStats } from "@/lib/types";

export function useUserBadges(userId: string | undefined) {
  const [badges] = useState<Badge[]>(BADGE_DEFINITIONS);
  const [earnedBadgeIds, setEarnedBadgeIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEarnedBadges = useCallback(async () => {
    if (!userId) { setLoading(false); return; }
    const supabase = createClient();
    const { data } = await supabase
      .from("user_badges")
      .select("badge_id")
      .eq("user_id", userId);
    setEarnedBadgeIds((data ?? []).map((r) => r.badge_id));
    setLoading(false);
  }, [userId]);

  const checkAndAwardBadges = useCallback(
    async (stats: UserStats) => {
      if (!userId) return;
      const qualified = checkBadgeCriteria(stats);
      const newBadges = qualified.filter((id) => !earnedBadgeIds.includes(id));
      if (newBadges.length === 0) return;

      const supabase = createClient();
      const rows = newBadges.map((badge_id) => ({ user_id: userId, badge_id }));
      const { error } = await supabase.from("user_badges").insert(rows);
      if (!error) {
        setEarnedBadgeIds((prev) => [...prev, ...newBadges]);
      }
    },
    [userId, earnedBadgeIds]
  );

  return { badges, earnedBadgeIds, loading, fetchEarnedBadges, checkAndAwardBadges };
}
