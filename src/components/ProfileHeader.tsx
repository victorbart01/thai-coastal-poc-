"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import type { UserStats } from "@/lib/types";

interface ProfileHeaderProps {
  displayName: string;
  avatarUrl: string | null;
  bio: string | null;
  createdAt: string;
  stats: UserStats | null;
}

export function ProfileHeader({ displayName, avatarUrl, bio, createdAt, stats }: ProfileHeaderProps) {
  const { t, locale } = useTranslation();
  const [copied, setCopied] = useState(false);

  const memberSince = new Date(createdAt).toLocaleDateString(
    locale === "th" ? "th-TH" : "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      {/* Avatar + name + bio */}
      <div className="flex items-start gap-4">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            referrerPolicy="no-referrer"
            className="h-16 w-16 shrink-0 rounded-full border-2 border-white/10"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-white/10 bg-pink-400/20 text-xl font-bold text-pink-400">
            {displayName[0]?.toUpperCase()}
          </div>
        )}

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
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-white/[0.08] bg-ocean-800 px-3 py-1.5 text-[11px] text-text-secondary transition-colors hover:bg-ocean-700 hover:text-text-primary"
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
              className="rounded-lg border border-white/[0.06] bg-ocean-700 px-3 py-2.5 text-center"
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
