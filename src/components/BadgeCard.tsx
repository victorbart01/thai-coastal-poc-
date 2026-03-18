"use client";

import { Lock } from "lucide-react";
import type { Badge, BadgeRarity } from "@/lib/types";
import { useTranslation } from "@/lib/i18n";

const RARITY_COLORS: Record<BadgeRarity, string> = {
  common:    "border-black/10 bg-black/[0.06] backdrop-blur-sm",
  rare:      "border-rarity-rare/30 bg-black/[0.06] backdrop-blur-sm",
  epic:      "border-rarity-epic/30 bg-black/[0.06] backdrop-blur-sm",
  legendary: "border-rarity-legendary/30 bg-black/[0.06] backdrop-blur-sm",
};

const RARITY_TEXT: Record<BadgeRarity, string> = {
  common:    "text-text-tertiary",
  rare:      "text-rarity-rare",
  epic:      "text-rarity-epic",
  legendary: "text-rarity-legendary",
};

interface BadgeCardProps {
  badge: Badge;
  earned: boolean;
  compact?: boolean;
}

export function BadgeCard({ badge, earned, compact }: BadgeCardProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`relative flex flex-col items-center gap-1 rounded-2xl border p-2 transition-all duration-200 ${
        earned
          ? RARITY_COLORS[badge.rarity]
          : "border-black/[0.04] bg-black/[0.03] opacity-50 grayscale"
      }`}
    >
      {/* Lock overlay for unearned */}
      {!earned && (
        <div className="absolute right-1 top-1">
          <Lock className="h-2.5 w-2.5 text-text-tertiary" />
        </div>
      )}

      {/* Icon */}
      <span className={compact ? "text-xl" : "text-2xl"}>{badge.icon}</span>

      {/* Name */}
      <p className="text-center font-display text-xs font-semibold leading-tight text-text-primary">
        {t(`badge.${badge.id}`)}
      </p>

      {/* Rarity */}
      <span className={`text-xs font-medium uppercase tracking-wider ${RARITY_TEXT[badge.rarity]}`}>
        {t(`rarity.${badge.rarity}`)}
      </span>

      {/* Description — hidden in compact mode */}
      {!compact && (
        <p className="text-center text-xs leading-snug text-text-tertiary">
          {t(`badge.${badge.id}.desc`)}
        </p>
      )}
    </div>
  );
}
