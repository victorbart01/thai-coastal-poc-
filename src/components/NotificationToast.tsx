"use client";

import type { BadgeRarity } from "@/lib/types";

type ToastVariant = "badge" | "social" | "publish";

interface NotificationToastProps {
  variant: ToastVariant;
  title: string;
  description?: string;
  icon?: string;
  rarity?: BadgeRarity;
}

const rarityGradients: Record<BadgeRarity, string> = {
  common: "from-zinc-400/20 to-zinc-500/10 border-zinc-400/30",
  rare: "from-blue-400/20 to-blue-500/10 border-blue-400/30",
  epic: "from-violet-400/20 to-violet-500/10 border-violet-400/30",
  legendary: "from-yellow-400/20 to-amber-500/10 border-yellow-400/30",
};

const rarityGlow: Record<BadgeRarity, string> = {
  common: "shadow-zinc-400/20",
  rare: "shadow-blue-400/20",
  epic: "shadow-violet-400/20",
  legendary: "shadow-yellow-400/30",
};

export function NotificationToast({
  variant,
  title,
  description,
  icon,
  rarity = "common",
}: NotificationToastProps) {
  const baseClasses =
    "flex items-center gap-3 rounded-2xl border px-4 py-3 backdrop-blur-xl shadow-lg min-w-[280px] max-w-[360px]";

  const variantClasses = (() => {
    switch (variant) {
      case "badge":
        return `bg-gradient-to-r ${rarityGradients[rarity]} ${rarityGlow[rarity]}`;
      case "social":
        return "bg-gradient-to-r from-pink-500/15 to-pink-400/5 border-pink-400/30 shadow-pink-400/20";
      case "publish":
        return "bg-gradient-to-r from-cyan-500/15 to-pink-400/10 border-cyan-400/30 shadow-cyan-400/20";
    }
  })();

  return (
    <div className={`${baseClasses} ${variantClasses}`}>
      {icon && <span className="text-2xl shrink-0">{icon}</span>}
      <div className="flex flex-col gap-0.5 min-w-0">
        <p className="text-sm font-semibold text-white font-[family-name:var(--font-display)] truncate">
          {title}
        </p>
        {description && (
          <p className="text-xs text-white/70 truncate">{description}</p>
        )}
      </div>
    </div>
  );
}
