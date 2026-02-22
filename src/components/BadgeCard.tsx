"use client";

import { Lock } from "lucide-react";
import type { Badge, BadgeRarity } from "@/lib/types";
import { useTranslation } from "@/lib/i18n";

const RARITY_COLORS: Record<BadgeRarity, string> = {
  common:    "border-black/10 bg-black/[0.06] backdrop-blur-sm",
  rare:      "border-blue-400/30 bg-black/[0.06] backdrop-blur-sm",
  epic:      "border-purple-400/30 bg-black/[0.06] backdrop-blur-sm",
  legendary: "border-yellow-400/30 bg-black/[0.06] backdrop-blur-sm",
};

const RARITY_TEXT: Record<BadgeRarity, string> = {
  common:    "text-text-tertiary",
  rare:      "text-blue-400",
  epic:      "text-purple-400",
  legendary: "text-yellow-400",
};

interface BadgeCardProps {
  badge: Badge;
  earned: boolean;
}

export function BadgeCard({ badge, earned }: BadgeCardProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`relative flex flex-col items-center gap-1.5 rounded-2xl border p-3 transition-all duration-200 ${
        earned
          ? RARITY_COLORS[badge.rarity]
          : "border-black/[0.04] bg-black/[0.03] opacity-50 grayscale"
      }`}
    >
      {/* Lock overlay for unearned */}
      {!earned && (
        <div className="absolute right-1.5 top-1.5">
          <Lock className="h-3 w-3 text-text-tertiary" />
        </div>
      )}

      {/* Icon */}
      <span className="text-2xl">{badge.icon}</span>

      {/* Name */}
      <p className="text-center font-[family-name:var(--font-display)] text-[11px] font-semibold text-text-primary">
        {t(`badge.${badge.id}`)}
      </p>

      {/* Rarity */}
      <span className={`text-[9px] font-medium uppercase tracking-wider ${RARITY_TEXT[badge.rarity]}`}>
        {t(`rarity.${badge.rarity}`)}
      </span>

      {/* Description */}
      <p className="text-center text-[9px] leading-snug text-text-tertiary">
        {t(`badge.${badge.id}.desc`)}
      </p>
    </div>
  );
}
