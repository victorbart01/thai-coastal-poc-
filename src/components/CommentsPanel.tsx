"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Send, Reply, Trash2 } from "lucide-react";
import { useMapStore } from "@/store/useMapStore";
import { useComments } from "@/lib/useComments";
import { useUser } from "@/lib/useUser";
import { useTranslation } from "@/lib/i18n";
import { timeAgo } from "@/lib/timeAgo";
import type { Comment } from "@/lib/types";

export function CommentsPanel() {
  const { t, locale } = useTranslation();
  const { user } = useUser();
  const showCommentsPanel = useMapStore((s) => s.showCommentsPanel);
  const commentingSpotId = useMapStore((s) => s.commentingSpotId);
  const closeComments = useMapStore((s) => s.closeComments);

  const { comments, loading, submitting, fetchComments, addComment, deleteComment } =
    useComments();

  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    if (commentingSpotId) {
      fetchComments(commentingSpotId);
    }
  }, [commentingSpotId, fetchComments]);

  if (!showCommentsPanel || !commentingSpotId) return null;

  const handleSubmit = async () => {
    if (!text.trim() || !user) return;
    await addComment(commentingSpotId, user.id, text.trim(), replyTo?.id);
    setText("");
    setReplyTo(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <div
      key={comment.id}
      className={`${isReply ? "ml-8 border-l border-black/[0.06] pl-3" : ""}`}
    >
      <div className="flex items-start gap-2.5 py-2.5">
        {/* Avatar */}
        {comment.author.avatar_url ? (
          <Image
            src={comment.author.avatar_url}
            alt=""
            width={24}
            height={24}
            className="h-6 w-6 shrink-0 rounded-full"
            unoptimized
          />
        ) : (
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pink-400/20 text-[10px] text-pink-400">
            {(comment.author.display_name ?? "?")[0]}
          </div>
        )}

        <div className="min-w-0 flex-1">
          {/* Name + time */}
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-medium text-text-primary">
              {comment.author.display_name ?? t("spot.anonymous")}
            </span>
            <span className="text-[10px] text-text-tertiary">
              {timeAgo(comment.created_at, locale)}
            </span>
          </div>

          {/* Content */}
          <p className="mt-0.5 text-[11px] leading-relaxed text-text-secondary">
            {comment.content}
          </p>

          {/* Actions */}
          <div className="mt-1 flex items-center gap-3">
            {!isReply && user && (
              <button
                onClick={() =>
                  setReplyTo({
                    id: comment.id,
                    name: comment.author.display_name ?? t("spot.anonymous"),
                  })
                }
                className="flex items-center gap-1 text-[10px] text-text-tertiary transition-colors hover:text-pink-400"
              >
                <Reply className="h-3 w-3" />
                {t("social.reply")}
              </button>
            )}
            {user && comment.user_id === user.id && (
              <button
                onClick={() => deleteComment(comment.id, commentingSpotId)}
                className="flex items-center gap-1 text-[10px] text-text-tertiary transition-colors hover:text-red-400"
              >
                <Trash2 className="h-3 w-3" />
                {t("social.delete")}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Replies */}
      {comment.replies?.map((reply) => renderComment(reply, true))}
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="animate-fade-in fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
        onClick={closeComments}
      />

      {/* Panel */}
      <div className="animate-panel-enter-right glass-surface fixed inset-y-0 right-0 z-40 flex w-full max-w-sm flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3">
          <h2 className="font-[family-name:var(--font-display)] text-sm font-semibold text-text-primary">
            {t("social.comments")}
          </h2>
          <button
            onClick={closeComments}
            className="rounded-lg p-1.5 text-text-tertiary transition-colors hover:bg-black/[0.06] hover:text-text-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Comments list */}
        <div className="sidebar-scroll flex-1 overflow-y-auto px-4 py-2">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-glass-deep border-t-transparent" />
            </div>
          ) : comments.length === 0 ? (
            <p className="py-12 text-center text-xs text-text-tertiary">
              {t("social.noComments")}
            </p>
          ) : (
            <div className="divide-y divide-black/[0.04]">
              {comments.map((c) => renderComment(c))}
            </div>
          )}
        </div>

        {/* Input bar */}
        <div className="border-t border-black/[0.06] p-3">
          {user ? (
            <>
              {replyTo && (
                <div className="mb-2 flex items-center gap-2 rounded-md bg-black/[0.04] px-2.5 py-1.5">
                  <Reply className="h-3 w-3 text-pink-400" />
                  <span className="flex-1 truncate text-[10px] text-text-secondary">
                    {t("social.reply")} @{replyTo.name}
                  </span>
                  <button
                    onClick={() => setReplyTo(null)}
                    className="text-text-tertiary hover:text-text-primary"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t("social.addComment")}
                  maxLength={500}
                  className="flex-1 rounded-lg border border-black/[0.08] bg-black/[0.04] px-3 py-2 text-xs text-text-primary placeholder:text-text-tertiary focus:border-accent-pink focus:outline-none"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!text.trim() || submitting}
                  className="rounded-lg bg-gradient-to-r from-glass-deep to-accent-pink p-2 text-white transition-colors disabled:opacity-40"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-xs text-text-tertiary">
              {t("social.signInToComment")}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
