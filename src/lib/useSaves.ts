"use client";

import { useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

export function useSaves() {
  const [isSaved, setIsSaved] = useState(false);
  const [toggling, setToggling] = useState(false);

  const setInitial = useCallback((saved: boolean) => {
    setIsSaved(saved);
  }, []);

  const toggleSave = useCallback(
    async (spotId: string, userId: string) => {
      if (toggling) return;
      setToggling(true);

      // Optimistic update
      const prevSaved = isSaved;
      setIsSaved(!isSaved);

      const supabase = createClient();

      try {
        if (prevSaved) {
          const { error } = await supabase
            .from("saves")
            .delete()
            .eq("spot_id", spotId)
            .eq("user_id", userId);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from("saves")
            .insert({ spot_id: spotId, user_id: userId });
          if (error) throw error;
        }
      } catch {
        // Revert on error
        setIsSaved(prevSaved);
      } finally {
        setToggling(false);
      }
    },
    [isSaved, toggling]
  );

  return { isSaved, toggling, setInitial, toggleSave };
}
