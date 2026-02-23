"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  Bookmark,
  Share2,
  MapPin,
  Send,
  Reply,
  Trash2,
} from "lucide-react";
import { useMapStore } from "@/store/useMapStore";
import { useTranslation } from "@/lib/i18n";
import { timeAgo } from "@/lib/timeAgo";
import { useSpotSocial } from "@/lib/useSpotSocial";
import { useLikes } from "@/lib/useLikes";
import { useSaves } from "@/lib/useSaves";
import { useComments } from "@/lib/useComments";
import { useUser } from "@/lib/useUser";
import { ShareMenu } from "@/components/ShareMenu";
import type { Spot, Comment } from "@/lib/types";

/** Desktop/tablet right-side panel — hidden on < md */
export function SpotDetailPanel() {
  const selectedSpot = useMapStore((s) => s.selectedSpot);
  const selectSpot = useMapStore((s) => s.selectSpot);

  if (!selectedSpot) return null;

  return (
    <div className="animate-panel-enter-right absolute right-0 top-12 bottom-0 z-10 hidden w-[360px] flex-col md:flex">
      <div className="glass-surface flex h-full flex-col">
        <SpotDetailContent key={selectedSpot.id} spot={selectedSpot} onClose={() => selectSpot(null)} />
      </div>
    </div>
  );
}

/** Shared inner content — reused by MobileSpotDetail */
export function SpotDetailContent({
  spot,
  onClose,
}: {
  spot: Spot;
  onClose: () => void;
}) {
  const { t, locale } = useTranslation();
  const { user } = useUser();
  const commentsRef = useRef<HTMLDivElement>(null);

  // Social hooks
  const { social, fetchSocial } = useSpotSocial();
  const {
    likeCount,
    isLiked,
    toggling: likingToggling,
    setInitial: setLikeInitial,
    toggleLike,
  } = useLikes();
  const {
    isSaved,
    toggling: savingToggling,
    setInitial: setSaveInitial,
    toggleSave,
  } = useSaves();
  const {
    comments,
    loading: commentsLoading,
    submitting,
    fetchComments,
    addComment,
    deleteComment,
  } = useComments();

  // Photo carousel
  const [photoIndex, setPhotoIndex] = useState(0);
  const [showShare, setShowShare] = useState(false);

  // Comment input
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState<{ id: string; name: string } | null>(null);

  // Fetch social + comments on mount (keyed by spot.id)
  useEffect(() => {
    fetchSocial(spot.id, user?.id);
    fetchComments(spot.id);
  }, [spot.id, user?.id, fetchSocial, fetchComments]);

  // Sync social data to local state
  useEffect(() => {
    if (social) {
      setLikeInitial(social.like_count, social.is_liked);
      setSaveInitial(social.is_saved);
    }
  }, [social, setLikeInitial, setSaveInitial]);

  const handleSubmit = async () => {
    if (!text.trim() || !user) return;
    await addComment(spot.id, user.id, text.trim(), replyTo?.id);
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
      className={isReply ? "ml-8 border-l border-black/[0.06] pl-3" : ""}
    >
      <div className="flex items-start gap-2.5 py-2.5">
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
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-medium text-text-primary">
              {comment.author.display_name ?? t("spot.anonymous")}
            </span>
            <span className="text-[10px] text-text-tertiary">
              {timeAgo(comment.created_at, locale)}
            </span>
          </div>
          <p className="mt-0.5 text-[11px] leading-relaxed text-text-secondary">
            {comment.content}
          </p>
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
                onClick={() => deleteComment(comment.id, spot.id)}
                className="flex items-center gap-1 text-[10px] text-text-tertiary transition-colors hover:text-red-400"
              >
                <Trash2 className="h-3 w-3" />
                {t("social.delete")}
              </button>
            )}
          </div>
        </div>
      </div>
      {comment.replies?.map((reply) => renderComment(reply, true))}
    </div>
  );

  return (
    <>
      {/* Scrollable body — mirrors left sidebar: p-3 gap-3 with glass-card vignettes */}
      <div className="sidebar-scroll flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-3">
        {/* Post card */}
        <div className="glass-card overflow-hidden rounded-2xl">
          {/* Header: avatar + name + time + close */}
          <div className="flex items-center gap-2.5 px-4 py-3">
            {spot.author.avatar_url ? (
              <Image
                src={spot.author.avatar_url}
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
                unoptimized
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-pink/20 text-xs font-medium text-accent-pink">
                {(spot.author.display_name ?? "?")[0]}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <Link
                href={`/profile/${spot.user_id}`}
                className="block truncate text-xs font-semibold text-text-primary transition-colors hover:text-accent-pink"
              >
                {spot.author.display_name ?? t("spot.anonymous")}
              </Link>
              <p className="text-[10px] text-text-tertiary">
                {timeAgo(spot.created_at, locale)}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-text-tertiary transition-colors hover:bg-black/[0.06] hover:text-text-primary"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Photo — edge-to-edge */}
          {spot.photos.length > 0 && (
            <div className="group relative">
              <Image
                src={spot.photos[photoIndex].url}
                alt={`${spot.title} — photo ${photoIndex + 1}`}
                width={448}
                height={336}
                className="aspect-[4/3] w-full object-cover"
                unoptimized
              />

              {/* Photo counter */}
              {spot.photos.length > 1 && (
                <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 backdrop-blur-sm">
                  <span className="font-[family-name:var(--font-display)] text-[10px] text-white/90">
                    {photoIndex + 1}/{spot.photos.length}
                  </span>
                </div>
              )}

              {/* Arrows */}
              {spot.photos.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setPhotoIndex((i) => (i - 1 + spot.photos.length) % spot.photos.length)
                    }
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                  >
                    <ChevronLeft className="h-4 w-4 text-white" />
                  </button>
                  <button
                    onClick={() =>
                      setPhotoIndex((i) => (i + 1) % spot.photos.length)
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                  >
                    <ChevronRight className="h-4 w-4 text-white" />
                  </button>
                </>
              )}
            </div>
          )}

          {/* Content below photo */}
          <div className="px-4 pt-3 pb-4">
            {/* Rating — directly below photo */}
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < spot.rating
                      ? "fill-accent-pink text-accent-pink"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-1.5 font-[family-name:var(--font-display)] text-xs text-text-secondary">
                {spot.rating}/5
              </span>
            </div>

            {/* Title row + Bookmark & Share aligned right */}
            <div className="mt-2.5 flex items-start gap-2">
              <h2 className="min-w-0 flex-1 font-[family-name:var(--font-display)] text-base font-semibold leading-snug text-text-primary">
                {spot.title}
              </h2>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  onClick={() => user && toggleSave(spot.id, user.id)}
                  disabled={!user || savingToggling}
                  title={user ? (isSaved ? t("social.unsave") : t("social.save")) : t("social.signInToSave")}
                  className="rounded-md p-1 transition-colors hover:bg-black/[0.06] disabled:opacity-50"
                >
                  <Bookmark
                    className={`h-5 w-5 transition-colors ${
                      isSaved ? "fill-text-primary text-text-primary" : "text-text-secondary hover:text-text-primary"
                    }`}
                  />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowShare(!showShare)}
                    title={t("social.share")}
                    className="rounded-md p-1 text-text-tertiary transition-colors hover:bg-black/[0.06] hover:text-text-secondary"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                  {showShare && (
                    <ShareMenu spotId={spot.id} onClose={() => setShowShare(false)} />
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            {spot.description && (
              <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                {spot.description}
              </p>
            )}

            {/* Tags */}
            {spot.tags.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-1">
                {spot.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-accent-pink/10 px-2 py-0.5 text-[10px] text-accent-pink"
                  >
                    {t(`tag.${tag}`)}
                  </span>
                ))}
              </div>
            )}

            {/* Liked by X members */}
            <div className="mt-3 flex items-center gap-1.5 border-t border-black/[0.06] pt-3">
              <button
                onClick={() => user && toggleLike(spot.id, user.id)}
                disabled={!user || likingToggling}
                title={user ? (isLiked ? t("social.unlike") : t("social.like")) : t("social.signInToLike")}
                className="transition-transform active:scale-125 disabled:opacity-50"
              >
                <Heart
                  className={`h-[18px] w-[18px] transition-colors ${
                    isLiked ? "fill-accent-pink text-accent-pink" : "text-text-tertiary hover:text-text-secondary"
                  }`}
                />
              </button>
              <span className="text-xs text-text-secondary">
                {likeCount > 0 ? (
                  <>
                    <span className="font-semibold text-text-primary">{t("social.likedBy")} {likeCount}</span>
                    {" "}{likeCount === 1 ? t("social.member") : t("social.members")}
                  </>
                ) : (
                  t("social.like")
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Coordinates card */}
        <div className="glass-card rounded-2xl px-4 py-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-text-tertiary" />
            <span className="font-mono text-[11px] text-text-secondary">
              {spot.latitude.toFixed(4)}, {spot.longitude.toFixed(4)}
            </span>
          </div>
        </div>

        {/* Comments card */}
        <div ref={commentsRef} className="glass-card rounded-2xl p-4">
          <h3 className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-wider text-text-secondary">
            {t("social.comments")}
          </h3>

          <div className="mt-3">
            {commentsLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-glass-deep border-t-transparent" />
              </div>
            ) : comments.length === 0 ? (
              <p className="py-6 text-center text-xs text-text-tertiary">
                {t("social.noComments")}
              </p>
            ) : (
              <div className="divide-y divide-black/[0.04]">
                {comments.map((c) => renderComment(c))}
              </div>
            )}
          </div>

          {/* Comment input */}
          <div className="mt-3 border-t border-black/[0.06] pt-3">
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
      </div>
    </>
  );
}
