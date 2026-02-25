"use client";

import { useState, useRef } from "react";
import { Link2, Check, Camera, Loader2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";
import type { UserStats } from "@/lib/types";

interface ProfileHeaderProps {
  displayName: string;
  avatarUrl: string | null;
  bio: string | null;
  createdAt: string;
  stats: UserStats | null;
  isOwnProfile?: boolean;
  userId?: string;
  onAvatarUpdated?: (newUrl: string) => void;
}

export function ProfileHeader({ displayName, avatarUrl, bio, createdAt, stats, isOwnProfile, userId, onAvatarUpdated }: ProfileHeaderProps) {
  const { t, locale } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [localAvatar, setLocalAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayAvatar = localAvatar ?? avatarUrl;

  const memberSince = new Date(createdAt).toLocaleDateString(
    locale === "th" ? "th-TH" : "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    setUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${userId}/avatar.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, file, { cacheControl: "3600", upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(path);

      const cacheBustedUrl = `${publicUrl}?t=${Date.now()}`;

      const { error: updateError } = await supabase
        .from("user_profiles")
        .update({ avatar_url: cacheBustedUrl })
        .eq("id", userId);

      if (updateError) throw updateError;

      setLocalAvatar(cacheBustedUrl);
      onAvatarUpdated?.(cacheBustedUrl);
    } catch (err) {
      console.error("Avatar upload failed:", err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      {/* Avatar + name + bio */}
      <div className="flex items-start gap-4">
        <div className="group relative shrink-0">
          {displayAvatar ? (
            <img
              src={displayAvatar}
              alt={displayName}
              referrerPolicy="no-referrer"
              className="h-16 w-16 rounded-full border-2 border-black/10 object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-black/10 bg-pink-400/20 text-xl font-bold text-pink-400">
              {displayName[0]?.toUpperCase()}
            </div>
          )}
          {isOwnProfile && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleAvatarUpload}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100"
                aria-label={t("profile.changeAvatar")}
              >
                {uploading ? (
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                ) : (
                  <Camera className="h-5 w-5 text-white" />
                )}
              </button>
            </>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="truncate font-[family-name:var(--font-display)] text-lg font-bold text-text-primary">
            {displayName}
          </h1>
          {bio && (
            <p className="mt-0.5 text-xs text-text-secondary">{bio}</p>
          )}
          <p className="mt-1 text-[11px] text-text-tertiary">
            {t("profile.memberSince")} {memberSince}
          </p>
        </div>

        {/* Share button */}
        <button
          onClick={handleShare}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-black/[0.08] bg-black/[0.04] px-3 py-1.5 text-[11px] text-text-secondary transition-colors hover:bg-black/[0.08] hover:text-text-primary"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-400" />
              {t("profile.linkCopied")}
            </>
          ) : (
            <>
              <Link2 className="h-3.5 w-3.5" />
              {t("profile.shareProfile")}
            </>
          )}
        </button>
      </div>

      {/* Stats row */}
      {stats && (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: t("profile.spots"), value: stats.spots_count },
            { label: t("profile.likesReceived"), value: stats.total_likes_received },
            { label: t("profile.photos"), value: stats.photos_count },
            { label: t("profile.daysActive"), value: stats.member_days },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="glass-card rounded-2xl px-3 py-2.5 text-center"
            >
              <p className="font-[family-name:var(--font-display)] text-lg font-bold text-text-primary">
                {value}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-text-tertiary">
                {label}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
