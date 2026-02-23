"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Popup } from "react-map-gl";
import {
  ChevronLeft,
  ChevronRight,
  Camera,
  Star,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
} from "lucide-react";
import type { Spot } from "@/lib/types";
import { useTranslation } from "@/lib/i18n";
import { timeAgo } from "@/lib/timeAgo";
import { useLikes } from "@/lib/useLikes";
import { useSaves } from "@/lib/useSaves";
import { useSpotSocial } from "@/lib/useSpotSocial";
import { useUser } from "@/lib/useUser";
import { useMapStore } from "@/store/useMapStore";
import { ShareMenu } from "@/components/ShareMenu";

interface SpotPopupProps {
  spot: Spot;
  onClose: () => void;
}

export function SpotPopup({ spot, onClose }: SpotPopupProps) {
  const { t, locale } = useTranslation();
  const { user } = useUser();
  const openComments = useMapStore((s) => s.openComments);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [showShare, setShowShare] = useState(false);

  const { social, fetchSocial } = useSpotSocial();
  const { likeCount, isLiked, toggling: likingToggling, setInitial: setLikeInitial, toggleLike } = useLikes();
  const { isSaved, toggling: savingToggling, setInitial: setSaveInitial, toggleSave } = useSaves();

  // Fetch social counts when popup opens
  useEffect(() => {
    fetchSocial(spot.id, user?.id);
  }, [spot.id, user?.id, fetchSocial]);

  // Sync local state when social data arrives
  useEffect(() => {
    if (social) {
      setLikeInitial(social.like_count, social.is_liked);
      setSaveInitial(social.is_saved);
    }
  }, [social, setLikeInitial, setSaveInitial]);

  return (
    <Popup
      longitude={spot.longitude}
      latitude={spot.latitude}
      onClose={onClose}
      closeOnClick={false}
      maxWidth="300px"
      offset={16}
    >
      <div className="min-w-[260px] overflow-hidden rounded-2xl">
        {/* Photo carousel */}
        {spot.photos.length > 0 && (
          <div className="group relative overflow-hidden rounded-t-xl">
            <Image
              src={spot.photos[photoIndex].url}
              alt={`${spot.title} — photo ${photoIndex + 1}`}
              width={300}
              height={160}
              className="h-40 w-full object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            {/* Photo count */}
            <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 backdrop-blur-sm">
              <Camera className="h-3 w-3 text-white/80" />
              <span className="font-[family-name:var(--font-display)] text-[10px] text-white/80">
                {photoIndex + 1}/{spot.photos.length}
              </span>
            </div>
            {/* Nav arrows */}
            {spot.photos.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPhotoIndex(
                      (i) => (i - 1 + spot.photos.length) % spot.photos.length
                    );
                  }}
                  className="absolute left-1.5 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                >
                  <ChevronLeft className="h-3.5 w-3.5 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPhotoIndex(
                      (i) => (i + 1) % spot.photos.length
                    );
                  }}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-white" />
                </button>
              </>
            )}
          </div>
        )}

        <div className="p-4">
          {/* Title */}
          <h3 className="pr-4 font-[family-name:var(--font-display)] text-sm font-semibold leading-snug text-text-primary">
            {spot.title}
          </h3>

          {/* Author + date */}
          <div className="mt-2 flex items-center gap-2">
            {spot.author.avatar_url ? (
              <Image
                src={spot.author.avatar_url}
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 rounded-full"
                unoptimized
              />
            ) : (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-pink/20 text-[10px] text-accent-pink">
                {(spot.author.display_name ?? "?")[0]}
              </div>
            )}
            <Link
              href={`/profile/${spot.user_id}`}
              className="text-[11px] text-text-secondary transition-colors hover:text-accent-pink hover:underline"
            >
              {spot.author.display_name ?? t("spot.anonymous")}
            </Link>
            <span className="text-[10px] text-text-tertiary">
              {timeAgo(spot.created_at, locale)}
            </span>
          </div>

          {/* Rating (shells) */}
          <div className="mt-2 flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < spot.rating
                    ? "fill-accent-pink text-accent-pink"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-1.5 font-[family-name:var(--font-display)] text-[11px] text-text-secondary">
              {spot.rating}/5
            </span>
          </div>

          {/* Coordinates */}
          <p className="mt-1.5 font-mono text-[10px] text-text-tertiary">
            {spot.latitude.toFixed(4)}, {spot.longitude.toFixed(4)}
          </p>

          {/* Tags */}
          {spot.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
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

          {/* Description */}
          {spot.description && (
            <p className="mt-2.5 text-[11px] leading-relaxed text-text-secondary">
              {spot.description}
            </p>
          )}

          {/* Social action bar */}
          <div className="mt-3 flex items-center gap-1 border-t border-black/[0.06] pt-3">
            {/* Like */}
            <button
              onClick={() => user && toggleLike(spot.id, user.id)}
              disabled={!user || likingToggling}
              title={user ? (isLiked ? t("social.unlike") : t("social.like")) : t("social.signInToLike")}
              className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] transition-colors hover:bg-black/[0.06] disabled:opacity-50"
            >
              <Heart
                className={`h-3.5 w-3.5 transition-colors ${
                  isLiked
                    ? "fill-accent-pink text-accent-pink"
                    : "text-text-tertiary"
                }`}
              />
              {likeCount > 0 && (
                <span className={isLiked ? "text-accent-pink" : "text-text-tertiary"}>
                  {likeCount}
                </span>
              )}
            </button>

            {/* Comments */}
            <button
              onClick={() => openComments(spot.id)}
              title={t("social.comment")}
              className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-text-tertiary transition-colors hover:bg-black/[0.06] hover:text-text-secondary"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              {(social?.comment_count ?? spot.comment_count ?? 0) > 0 && (
                <span>{social?.comment_count ?? spot.comment_count ?? 0}</span>
              )}
            </button>

            {/* Save */}
            <button
              onClick={() => user && toggleSave(spot.id, user.id)}
              disabled={!user || savingToggling}
              title={user ? (isSaved ? t("social.unsave") : t("social.save")) : t("social.signInToSave")}
              className="rounded-md px-2 py-1 transition-colors hover:bg-black/[0.06] disabled:opacity-50"
            >
              <Bookmark
                className={`h-3.5 w-3.5 transition-colors ${
                  isSaved
                    ? "fill-accent-pink text-accent-pink"
                    : "text-text-tertiary"
                }`}
              />
            </button>

            {/* Share */}
            <div className="relative ml-auto">
              <button
                onClick={() => setShowShare(!showShare)}
                title={t("social.share")}
                className="rounded-md px-2 py-1 text-text-tertiary transition-colors hover:bg-black/[0.06] hover:text-text-secondary"
              >
                <Share2 className="h-3.5 w-3.5" />
              </button>
              {showShare && (
                <ShareMenu
                  spotId={spot.id}
                  onClose={() => setShowShare(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
}
