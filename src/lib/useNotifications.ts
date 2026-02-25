"use client";

import { toast } from "sonner";
import { NotificationToast } from "@/components/NotificationToast";
import { BADGE_DEFINITIONS } from "@/lib/badges";
import type { BadgeRarity } from "@/lib/types";
import { createElement } from "react";

const CONFETTI_COLORS = ["#06b6d4", "#f472b6", "#22d3ee", "#facc15"];

async function fireConfetti() {
  const confetti = (await import("canvas-confetti")).default;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReduced) return;

  // Center burst
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: CONFETTI_COLORS,
    disableForReducedMotion: true,
  });

  // Left burst (delayed)
  setTimeout(() => {
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors: CONFETTI_COLORS,
      disableForReducedMotion: true,
    });
  }, 200);

  // Right burst (delayed)
  setTimeout(() => {
    confetti({
      particleCount: 40,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors: CONFETTI_COLORS,
      disableForReducedMotion: true,
    });
  }, 200);
}

export function useNotifications() {
  function showPublishToast(spotTitle: string, t: (key: string) => string) {
    toast.custom(() =>
      createElement(NotificationToast, {
        variant: "publish",
        title: t("toast.spotPublished"),
        description: spotTitle,
        icon: "📍",
      })
    );
    fireConfetti();
  }

  function showBadgeToast(
    badgeId: string,
    t: (key: string) => string
  ) {
    const badge = BADGE_DEFINITIONS.find((b) => b.id === badgeId);
    if (!badge) return;

    toast.custom(() =>
      createElement(NotificationToast, {
        variant: "badge",
        title: t("toast.badgeUnlocked"),
        description: t(`badge.${badgeId}`),
        icon: badge.icon,
        rarity: badge.rarity as BadgeRarity,
      })
    );
  }

  function showSocialToast(
    actorName: string,
    spotTitle: string,
    type: "like" | "comment",
    t: (key: string) => string
  ) {
    const message =
      type === "like" ? t("toast.newLike") : t("toast.newComment");
    toast.custom(() =>
      createElement(NotificationToast, {
        variant: "social",
        title: `${actorName} ${message}`,
        description: spotTitle,
        icon: type === "like" ? "❤️" : "💬",
      })
    );
  }

  return { showPublishToast, showBadgeToast, showSocialToast };
}
