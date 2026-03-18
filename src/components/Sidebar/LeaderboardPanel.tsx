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

    return Array.from(userMap.values())
      .map((entry) => ({
        ...entry,
        score: entry.spots_count * 10 + entry.likes_received,
        rank: 0,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((entry, i) => ({ ...entry, rank: i + 1 }));
  }, [spots]);

  return (
    <div className="glass-card rounded-2xl p-4">
      <h3 className="flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-wider text-text-secondary">
        <Trophy className="h-3.5 w-3.5 text-rarity-legendary" />
        {t("contributors.title")}
      </h3>

      {leaderboard.length === 0 ? (
        <p className="mt-3 text-xs text-text-tertiary">{t("leaderboard.empty")}</p>
      ) : (
        <div className="mt-3 space-y-1">
          {leaderboard.map((entry) => (
            <Link
              key={entry.user.id}
              href={`/profile/${entry.user.id}`}
              className="group flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-all duration-200 hover:bg-black/[0.04]"
            >
              {/* Rank */}
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-display text-xs font-bold ${
                  entry.rank === 1
                    ? "bg-rarity-legendary/20 text-rarity-legendary"
                    : entry.rank === 2
                    ? "bg-rarity-common/20 text-rarity-common"
                    : entry.rank === 3
                    ? "bg-warning/20 text-warning"
                    : "bg-black/[0.06] text-text-tertiary"
                }`}
              >
                {entry.rank}
              </span>

              {/* Avatar */}
              {entry.user.avatar_url ? (
                <Image
                  src={entry.user.avatar_url}
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 shrink-0 rounded-full"
                  unoptimized
                />
              ) : (
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-pink/20 text-xs text-accent-pink">
                  {(entry.user.display_name ?? "?")[0]}
                </div>
              )}

              {/* Name + spots count */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-text-primary">
                  {entry.user.display_name ?? "Anonymous"}
                </p>
              </div>

              <span className="shrink-0 text-xs text-text-tertiary">
                {entry.spots_count} {t("leaderboard.spots")}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
