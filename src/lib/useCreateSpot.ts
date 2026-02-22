"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { DraftSpot } from "@/lib/types";

export function useCreateSpot() {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createSpot(draft: DraftSpot, userId: string) {
    setCreating(true);
    setError(null);

    try {
      const supabase = createClient();

      // 1. Insert the spot row
      const { data: spot, error: spotError } = await supabase
        .from("spots")
        .insert({
          user_id: userId,
          title: draft.title,
          description: draft.description,
          latitude: draft.latitude,
          longitude: draft.longitude,
          rating: draft.rating,
          tags: draft.tags,
          status: "published",
        })
        .select("id")
        .single();

      if (spotError || !spot) {
        throw new Error(spotError?.message ?? "Failed to create spot");
      }

      // 2. Upload photos to Storage + insert spot_photos rows
      const uploadedPhotos: { storage_path: string; position: number }[] = [];

      for (let i = 0; i < draft.photos.length; i++) {
        const file = draft.photos[i];
        const ext = file.name.split(".").pop() ?? "jpg";
        const path = `${userId}/${spot.id}/${i}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("spot-photos")
          .upload(path, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error(`Failed to upload photo ${i}:`, uploadError);
          continue; // continue with remaining photos
        }

        uploadedPhotos.push({ storage_path: path, position: i });
      }

      // 3. Insert spot_photos rows
      if (uploadedPhotos.length > 0) {
        const { error: photosError } = await supabase
          .from("spot_photos")
          .insert(
            uploadedPhotos.map((p) => ({
              spot_id: spot.id,
              storage_path: p.storage_path,
              position: p.position,
            }))
          );

        if (photosError) {
          console.error("Failed to insert photo rows:", photosError);
        }
      }

      return spot.id as string;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create spot";
      setError(message);
      return null;
    } finally {
      setCreating(false);
    }
  }

  return { creating, error, createSpot };
}
