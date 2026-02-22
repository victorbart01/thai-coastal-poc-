"use client";

import { useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Comment, SpotAuthor } from "@/lib/types";

export function useComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = useCallback(async (spotId: string) => {
    setLoading(true);
    const supabase = createClient();

    // 1. Fetch all comments for this spot
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("spot_id", spotId)
      .order("created_at", { ascending: true });

    if (error || !data) {
      console.error("Failed to fetch comments:", error);
      setLoading(false);
      return;
    }

    // 2. Fetch profiles separately (same pattern as useSpots)
    const userIds = Array.from(new Set(data.map((c) => c.user_id)));
    const profileMap = new Map<string, SpotAuthor>();

    if (userIds.length > 0) {
      const { data: profiles } = await supabase
        .from("user_profiles")
        .select("id, display_name, avatar_url")
        .in("id", userIds);

      for (const p of profiles ?? []) {
        profileMap.set(p.id, p);
      }
    }

    // 3. Build comment tree
    const allComments: Comment[] = data.map((row) => ({
      id: row.id,
      spot_id: row.spot_id,
      user_id: row.user_id,
      parent_id: row.parent_id,
      content: row.content,
      created_at: row.created_at,
      updated_at: row.updated_at,
      author: profileMap.get(row.user_id) ?? {
        id: row.user_id,
        display_name: null,
        avatar_url: null,
      },
      replies: [],
    }));

    // Separate top-level and replies
    const topLevel: Comment[] = [];
    const replyMap = new Map<string, Comment[]>();

    for (const c of allComments) {
      if (c.parent_id) {
        const replies = replyMap.get(c.parent_id) ?? [];
        replies.push(c);
        replyMap.set(c.parent_id, replies);
      } else {
        topLevel.push(c);
      }
    }

    // Attach replies to parents
    for (const c of topLevel) {
      c.replies = replyMap.get(c.id) ?? [];
    }

    setComments(topLevel);
    setLoading(false);
  }, []);

  const addComment = useCallback(
    async (spotId: string, userId: string, content: string, parentId?: string) => {
      setSubmitting(true);
      const supabase = createClient();

      const { error } = await supabase.from("comments").insert({
        spot_id: spotId,
        user_id: userId,
        parent_id: parentId ?? null,
        content,
      });

      if (error) {
        console.error("Failed to add comment:", error);
        setSubmitting(false);
        return;
      }

      await fetchComments(spotId);
      setSubmitting(false);
    },
    [fetchComments]
  );

  const deleteComment = useCallback(
    async (commentId: string, spotId: string) => {
      const supabase = createClient();

      const { error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId);

      if (error) {
        console.error("Failed to delete comment:", error);
        return;
      }

      await fetchComments(spotId);
    },
    [fetchComments]
  );

  return { comments, loading, submitting, fetchComments, addComment, deleteComment };
}
