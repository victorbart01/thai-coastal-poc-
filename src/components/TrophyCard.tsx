"use client";

import type { TrophyProgress } from "@/lib/badges";
import type { BadgeRarity } from "@/lib/types";
import { useTranslation } from "@/lib/i18n";

const RARITY_STYLES: Record<BadgeRarity, { border: string; glow: string; barFill: string; label: string }> = {
  common: {
    border: "border-gray-400/30",
    glow: "shadow-[0_0_12px_rgba(156,163,175,0.25)]",
    barFill: "bg-gray-400",
    label: "text-gray-400",
  },
  rare: {
    border: "border-blue-400/40",
    glow: "shadow-[0_0_12px_rgba(96,165,250,0.3)]",
    barFill: "bg-blue-400",
    label: "text-blue-400",
  },
  epic: {
    border: "border-purple-400/40",
    glow: "shadow-[0_0_12px_rgba(192,132,252,0.3)]",
    barFill: "bg-purple-400",
    label: "text-purple-400",
  },
  legendary: {
    border: "border-yellow-400/40",
    glow: "shadow-[0_0_12px_rgba(250,204,21,0.3)]",
    barFill: "bg-yellow-400",
    label: "text-yellow-400",
  },
};

export function TrophyCard({ trophy }: { trophy: TrophyProgress }) {
  const { t } = useTranslation();
  const { path, currentTier, nextTier, displayRarity, currentValue, progressPercent, started, completed } = trophy;
  const styles = RARITY_STYLES[displayRarity];

  // Emoji: current tier icon, or first tier icon if not started
  const emoji = currentTier?.icon ?? path.tiers[0].icon;

  // Target value for display
  const targetValue = completed
    ? currentTier!.criteria_value
    : nextTier
      ? nextTier.criteria_value
      : path.tiers[0].criteria_value;

  return (
    <div
      className={`glass-card rounded-2xl border p-3 flex flex-col items-center gap-1.5 transition-all ${styles.border} ${
        !started ? "opacity-60 grayscale" : ""
      } ${completed ? styles.glow : ""}`}
    >
      {/* Emoji */}
      <span className="text-2xl leading-none">{emoji}</span>

      {/* Path name */}
      <span className="text-[10px] font-medium text-text-secondary truncate max-w-full">
        {t(`trophy.${path.criteriaType}`)}
      </span>

      {/* Progress bar + value */}
      <div className="w-full">
        <div className="h-1.5 w-full rounded-full bg-black/[0.06] overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${styles.barFill}`}
            style={{ width: `${Math.round(progressPercent * 100)}%` }}
          />
        </div>
        <p className="mt-0.5 text-center text-[9px] text-text-tertiary">
          {completed ? t("trophy.completed") : `${currentValue} / ${targetValue}`}
        </p>
      </div>

      {/* Tier dots */}
      <div className="flex items-center gap-1">
        {path.tiers.map((tier, i) => {
          const earned = currentTier
            ? tier.criteria_value <= currentTier.criteria_value
            : false;
          return (
            <span
              key={tier.id}
              className={`h-1.5 w-1.5 rounded-full ${
                earned ? styles.barFill : "bg-black/[0.08]"
              }`}
            />
          );
        })}
      </div>

      {/* Rarity label */}
      <span className={`text-[8px] font-bold uppercase tracking-wider ${styles.label}`}>
        {t(`rarity.${displayRarity}`)}
      </span>
    </div>
  );
}
