"use client";

import { useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

export function useLikes() {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [toggling, setToggling] = useState(false);

  const setInitial = useCallback((count: number, liked: boolean) => {
    setLikeCount(count);
    setIsLiked(liked);
  }, []);

  const toggleLike = useCallback(
    async (spotId: string, userId: string) => {
      if (toggling) return;
      setToggling(true);

      // Optimistic update
      const prevCount = likeCount;
      const prevLiked = isLiked;
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

      const supabase = createClient();

      try {
        if (prevLiked) {
          const { error } = await supabase
            .from("likes")
            .delete()
            .eq("spot_id", spotId)
            .eq("user_id", userId);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from("likes")
            .insert({ spot_id: spotId, user_id: userId });
          if (error) throw error;
        }
      } catch {
        // Revert on error
        setLikeCount(prevCount);
        setIsLiked(prevLiked);
      } finally {
        setToggling(false);
      }
    },
    [likeCount, isLiked, toggling]
  );

  return { likeCount, isLiked, toggling, setInitial, toggleLike };
}
