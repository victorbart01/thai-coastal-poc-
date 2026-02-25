"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useNotifications } from "@/lib/useNotifications";
import { useTranslation } from "@/lib/i18n";

export function useRealtimeNotifications(userId: string | undefined) {
  const { showSocialToast } = useNotifications();
  const { t } = useTranslation();

  useEffect(() => {
    if (!userId) return;

    const supabase = createClient();

    const channel = supabase
      .channel("social-notifications")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "likes" },
        async (payload) => {
          const like = payload.new as {
            id: string;
            spot_id: string;
            user_id: string;
          };

          // Ignore self-likes
          if (like.user_id === userId) return;

          // Check if this like is on one of our spots
          const { data: spot } = await supabase
            .from("spots")
            .select("title, user_id")
            .eq("id", like.spot_id)
            .single();

          if (!spot || spot.user_id !== userId) return;

          // Fetch actor name
          const { data: actor } = await supabase
            .from("user_profiles")
            .select("display_name")
            .eq("id", like.user_id)
            .single();

          const actorName = actor?.display_name || t("spot.anonymous");
          showSocialToast(actorName, spot.title, "like", t);
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments" },
        async (payload) => {
          const comment = payload.new as {
            id: string;
            spot_id: string;
            user_id: string;
          };

          // Ignore self-comments
          if (comment.user_id === userId) return;

          // Check if this comment is on one of our spots
          const { data: spot } = await supabase
            .from("spots")
            .select("title, user_id")
            .eq("id", comment.spot_id)
            .single();

          if (!spot || spot.user_id !== userId) return;

          // Fetch actor name
          const { data: actor } = await supabase
            .from("user_profiles")
            .select("display_name")
            .eq("id", comment.user_id)
            .single();

          const actorName = actor?.display_name || t("spot.anonymous");
          showSocialToast(actorName, spot.title, "comment", t);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [userId, showSocialToast, t]);
}
