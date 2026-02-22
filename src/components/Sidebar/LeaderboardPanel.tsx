"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy } from "lucide-react";
import type { Spot, LeaderboardEntry, SpotAuthor } from "@/lib/types";
import { useTranslation } from "@/lib/i18n";

interface LeaderboardPanelProps {
  spots: Spot[];
}

export function LeaderboardPanel({ spots }: LeaderboardPanelProps) {
  const { t } = useTranslation();

  const leaderboard = useMemo((): LeaderboardEntry[] => {
    // Group by user
    const userMap = new Map<string, { user: SpotAuthor; spots_count: number; likes_received: number }>();

    for (const spot of spots) {
      const existing = userMap.get(spot.user_id);
      if (existing) {
        existing.spots_count += 1;
        existing.likes_received += spot.like_count ?? 0;
      } else {
        userMap.set(spot.user_id, {
          user: spot.author,
          spots_count: 1,
          likes_received: spot.like_count ?? 0,
        });
      }
    }

    // Score = spots * 10 + likes
    return Array.from(userMap.values())
      .map((entry) => ({
        ...entry,
        score: entry.spots_count * 10 + entry.likes_received,
        rank: 0,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((entry, i) => ({ ...entry, rank: i + 1 }));
  }, [spots]);

  const maxScore = leaderboard[0]?.score ?? 1;

  return (
    <div className="rounded-lg border border-white/[0.06] bg-ocean-700 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
      <h3 className="flex items-center gap-1.5 font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-wider text-text-secondary">
        <Trophy className="h-3.5 w-3.5 text-yellow-400" />
        {t("leaderboard.title")}
      </h3>

      {leaderboard.length === 0 ? (
        <p className="mt-3 text-xs text-text-tertiary">{t("leaderboard.empty")}</p>
      ) : (
        <div className="mt-3 space-y-1.5">
          {leaderboard.map((entry) => (
            <Link
              key={entry.user.id}
              href={`/profile/${entry.user.id}`}
              className="group flex items-center gap-2.5 rounded-lg border border-transparent bg-ocean-900/50 p-2 transition-all duration-200 hover:border-white/[0.08] hover:bg-ocean-600/50"
            >
              {/* Rank */}
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-[family-name:var(--font-display)] text-[10px] font-bold ${
                  entry.rank === 1
                    ? "bg-yellow-400/20 text-yellow-400"
                    : entry.rank === 2
                    ? "bg-gray-300/20 text-gray-300"
                    : entry.rank === 3
                    ? "bg-amber-600/20 text-amber-600"
                    : "bg-ocean-600 text-text-tertiary"
                }`}
              >
                {entry.rank}
              </span>

              {/* Avatar */}
              {entry.user.avatar_url ? (
                <Image
                  src={entry.user.avatar_url}
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6 shrink-0 rounded-full"
                  unoptimized
                />
              ) : (
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pink-400/20 text-[10px] text-pink-400">
                  {(entry.user.display_name ?? "?")[0]}
                </div>
              )}

              {/* Info */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-medium text-text-primary">
                  {entry.user.display_name ?? "Anonymous"}
                </p>
                <div className="mt-0.5 flex items-center gap-2 text-[9px] text-text-tertiary">
                  <span>
                    {entry.spots_count} {t("leaderboard.spots")}
                  </span>
                  <span>·</span>
                  <span>
                    {entry.likes_received} {t("leaderboard.likes")}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-ocean-600">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-glass-deep to-glass-bright transition-all duration-500"
                    style={{ width: `${(entry.score / maxScore) * 100}%` }}
                  />
                </div>
              </div>

              {/* Score */}
              <span className="shrink-0 font-[family-name:var(--font-display)] text-[11px] font-bold text-glass-bright">
                {entry.score}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
