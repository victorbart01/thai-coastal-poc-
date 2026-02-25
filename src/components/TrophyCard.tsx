"use client";

import { useState, useRef, useEffect } from "react";
import type { TrophyProgress } from "@/lib/badges";
import type { BadgeRarity } from "@/lib/types";
import { useTranslation } from "@/lib/i18n";

const RARITY_STYLES: Record<BadgeRarity, { border: string; glow: string; dot: string; label: string }> = {
  common: {
    border: "border-gray-400/30",
    glow: "shadow-[0_0_12px_rgba(156,163,175,0.25)]",
    dot: "bg-gray-400",
    label: "text-gray-400",
  },
  rare: {
    border: "border-blue-400/40",
    glow: "shadow-[0_0_12px_rgba(96,165,250,0.3)]",
    dot: "bg-blue-400",
    label: "text-blue-400",
  },
  epic: {
    border: "border-purple-400/40",
    glow: "shadow-[0_0_12px_rgba(192,132,252,0.3)]",
    dot: "bg-purple-400",
    label: "text-purple-400",
  },
  legendary: {
    border: "border-yellow-400/40",
    glow: "shadow-[0_0_12px_rgba(250,204,21,0.3)]",
    dot: "bg-yellow-400",
    label: "text-yellow-400",
  },
};

export function TrophyCard({ trophy }: { trophy: TrophyProgress }) {
  const { t } = useTranslation();
  const { path, currentTier, nextTier, displayRarity, currentValue, progressPercent, started, completed } = trophy;
  const styles = RARITY_STYLES[displayRarity];

  const [showTooltip, setShowTooltip] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    if (!showTooltip) return;
    function handleClickOutside(e: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setShowTooltip(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showTooltip]);

  // Emoji: current tier icon, or first tier icon if not started
  const emoji = currentTier?.icon ?? path.tiers[0].icon;

  // Target value for display
  const targetValue = completed
    ? currentTier!.criteria_value
    : nextTier
      ? nextTier.criteria_value
      : path.tiers[0].criteria_value;

  // The badge to describe in the hint line (next to unlock, or current if completed)
  const hintTier = completed ? currentTier! : nextTier ?? path.tiers[0];
  const hintLabel = completed
    ? t("trophy.completed")
    : `${t("trophy.next")} ${hintTier.criteria_value}`;

  return (
    <div
      ref={cardRef}
      className={`glass-card relative rounded-2xl border p-3 flex flex-col items-center gap-1.5 transition-all cursor-pointer hover:scale-[1.03] hover:shadow-md ${styles.border} ${
        !started ? "opacity-60 grayscale" : ""
      } ${completed ? styles.glow : ""}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip((prev) => !prev)}
    >
      {/* Emoji */}
      <span className="text-2xl leading-none">{emoji}</span>

      {/* Path name */}
      <span className="text-[10px] font-medium text-text-secondary truncate max-w-full">
        {t(`trophy.${path.criteriaType}`)}
      </span>

      {/* Hint: next objective or completed */}
      <span className="text-[9px] text-text-tertiary truncate max-w-full">
        {hintLabel}
      </span>

      {/* Progress bar + value */}
      <div className="w-full">
        <div className="h-1.5 w-full rounded-full bg-black/[0.06] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-glass-deep to-accent-pink"
            style={{ width: `${Math.round(progressPercent * 100)}%` }}
          />
        </div>
        <p className="mt-0.5 text-center text-[9px] text-text-tertiary">
          {completed ? t("trophy.completed") : `${currentValue} / ${targetValue}`}
        </p>
      </div>

      {/* Tier dots */}
      <div className="flex items-center gap-1">
        {path.tiers.map((tier) => {
          const earned = currentTier
            ? tier.criteria_value <= currentTier.criteria_value
            : false;
          return (
            <span
              key={tier.id}
              className={`h-1.5 w-1.5 rounded-full ${
                earned ? styles.dot : "bg-black/[0.08]"
              }`}
            />
          );
        })}
      </div>

      {/* Rarity label */}
      <span className={`text-[8px] font-bold uppercase tracking-wider ${styles.label}`}>
        {t(`rarity.${displayRarity}`)}
      </span>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-48 animate-fade-in">
          <div className="glass-card rounded-xl border border-white/20 p-3 shadow-lg text-left">
            {/* Badge name */}
            <p className="text-[11px] font-semibold text-text-primary">
              {t(`badge.${hintTier.id}`)}
            </p>
            {/* Badge description */}
            <p className="mt-0.5 text-[10px] text-text-secondary">
              {t(`badge.${hintTier.id}.desc`)}
            </p>

            {/* Tier list */}
            <div className="mt-2 flex flex-col gap-1">
              {path.tiers.map((tier) => {
                const earned = currentTier
                  ? tier.criteria_value <= currentTier.criteria_value
                  : false;
                return (
                  <div key={tier.id} className="flex items-center gap-1.5 text-[10px]">
                    <span className="leading-none">{tier.icon}</span>
                    <span className={earned ? "text-text-primary" : "text-text-tertiary"}>
                      {t(`badge.${tier.id}`)}
                    </span>
                    <span className="ml-auto">
                      {earned ? "✓" : "🔒"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Caret */}
          <div className="mx-auto w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white/20" />
        </div>
      )}
    </div>
  );
}
