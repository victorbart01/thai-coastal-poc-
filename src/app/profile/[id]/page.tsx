"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, Heart } from "lucide-react";
import { useUserProfile } from "@/lib/useUserProfile";
import { useUserBadges } from "@/lib/useUserBadges";
import { ProfileHeader } from "@/components/ProfileHeader";
import { BadgeCard } from "@/components/BadgeCard";
import { useTranslation } from "@/lib/i18n";

export default function ProfilePage() {
  const params = useParams<{ id: string }>();
  const userId = params.id;
  const { t } = useTranslation();
  const { profile, spots, stats, loading, fetchProfile } = useUserProfile();
  const { badges, earnedBadgeIds, fetchEarnedBadges, checkAndAwardBadges } = useUserBadges(userId);

  useEffect(() => {
    if (userId) {
      fetchProfile(userId);
      fetchEarnedBadges();
    }
  }, [userId, fetchProfile, fetchEarnedBadges]);

  // Check & award badges once stats are available
  useEffect(() => {
    if (stats) {
      checkAndAwardBadges(stats);
    }
  }, [stats, checkAndAwardBadges]);

  if (loading || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ocean-950">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-glass-deep to-glass-bright shadow-[0_4px_16px_rgba(6,182,212,0.2)]">
          <span className="animate-spin-slow text-xl">🌊</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ocean-950">
      {/* Top bar */}
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-black/[0.06] bg-ocean-950/80 px-4 py-3 backdrop-blur-md">
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-text-secondary transition-colors hover:bg-black/[0.06] hover:text-text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("profile.backToMap")}
        </Link>
        <h2 className="font-[family-name:var(--font-display)] text-sm font-semibold text-text-primary">
          {t("profile.title")}
        </h2>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        {/* Profile header */}
        <ProfileHeader
          displayName={profile.display_name ?? "Anonymous"}
          avatarUrl={profile.avatar_url}
          bio={profile.bio}
          createdAt={profile.created_at}
          stats={stats}
        />

        {/* Badges section */}
        <section className="mt-8">
          <h2 className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-wider text-text-secondary">
            {t("badge.title")}
          </h2>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {badges.map((badge) => (
              <BadgeCard
                key={badge.id}
                badge={badge}
                earned={earnedBadgeIds.includes(badge.id)}
              />
            ))}
          </div>
        </section>

        {/* My Collection */}
        <section className="mt-8">
          <h2 className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-wider text-text-secondary">
            {t("profile.collection")}
          </h2>

          {spots.length === 0 ? (
            <p className="mt-3 text-xs text-text-tertiary">{t("profile.noSpots")}</p>
          ) : (
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {spots.map((spot) => {
                const thumbnail = spot.photos[0]?.url;
                return (
                  <Link
                    key={spot.id}
                    href={`/?spot=${spot.id}`}
                    className="glass-card group overflow-hidden rounded-2xl transition-all duration-200 hover:bg-black/[0.10] hover:shadow-lg"
                  >
                    {/* Thumbnail */}
                    {thumbnail && (
                      <div className="relative h-32 w-full overflow-hidden">
                        <Image
                          src={thumbnail}
                          alt={spot.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      </div>
                    )}

                    <div className="p-3">
                      <p className="truncate text-xs font-medium text-text-primary">
                        {spot.title}
                      </p>
                      <div className="mt-1.5 flex items-center justify-between">
                        {/* Rating */}
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < spot.rating
                                  ? "fill-accent-pink text-accent-pink"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        {/* Likes */}
                        <div className="flex items-center gap-1 text-[10px] text-text-tertiary">
                          <Heart className="h-3 w-3" />
                          <span>{spot.like_count ?? 0}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
