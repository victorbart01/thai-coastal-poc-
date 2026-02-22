"use client";

import { useState } from "react";
import Image from "next/image";
import { Popup } from "react-map-gl";
import { ChevronLeft, ChevronRight, Camera, Star } from "lucide-react";
import type { Spot } from "@/lib/types";
import { useTranslation } from "@/lib/i18n";

interface SpotPopupProps {
  spot: Spot;
  onClose: () => void;
}

function timeAgo(dateStr: string, locale: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return locale === "th" ? "เมื่อสักครู่" : "just now";
  if (minutes < 60)
    return locale === "th" ? `${minutes} นาทีที่แล้ว` : `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24)
    return locale === "th" ? `${hours} ชั่วโมงที่แล้ว` : `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30)
    return locale === "th" ? `${days} วันที่แล้ว` : `${days}d ago`;
  const months = Math.floor(days / 30);
  return locale === "th" ? `${months} เดือนที่แล้ว` : `${months}mo ago`;
}

export function SpotPopup({ spot, onClose }: SpotPopupProps) {
  const { t, locale } = useTranslation();
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <Popup
      longitude={spot.longitude}
      latitude={spot.latitude}
      onClose={onClose}
      closeOnClick={false}
      maxWidth="300px"
      offset={16}
    >
      <div className="min-w-[260px] rounded-xl border-l-[3px] border-l-pink-400">
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
            <div className="absolute inset-0 bg-gradient-to-t from-ocean-700/80 via-transparent to-transparent" />
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
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-pink-400/20 text-[10px] text-pink-400">
                {(spot.author.display_name ?? "?")[0]}
              </div>
            )}
            <span className="text-[11px] text-text-secondary">
              {spot.author.display_name ?? t("spot.anonymous")}
            </span>
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
                    ? "fill-pink-400 text-pink-400"
                    : "text-ocean-500"
                }`}
              />
            ))}
            <span className="ml-1.5 font-[family-name:var(--font-display)] text-[11px] text-text-secondary">
              {spot.rating}/5
            </span>
          </div>

          {/* Tags */}
          {spot.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {spot.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-pink-400/10 px-2 py-0.5 text-[10px] text-pink-400"
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
        </div>
      </div>
    </Popup>
  );
}
