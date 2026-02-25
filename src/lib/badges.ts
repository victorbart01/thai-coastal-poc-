import type { Badge, BadgeRarity, UserStats } from "@/lib/types";

export const BADGE_DEFINITIONS: Badge[] = [
  // ── COMMON (8) — "Welcome aboard" ──────────────────────────
  { id: "first_drop",   icon: "📍", rarity: "common",    criteria_type: "spots_count",          criteria_value: 1   },
  { id: "first_snap",   icon: "📷", rarity: "common",    criteria_type: "photos_count",         criteria_value: 1   },
  { id: "warm_welcome", icon: "👋", rarity: "common",    criteria_type: "total_likes_received", criteria_value: 1   },
  { id: "good_eye",     icon: "👁️", rarity: "common",    criteria_type: "likes_given",          criteria_value: 5   },
  { id: "collector",    icon: "🔖", rarity: "common",    criteria_type: "saves_count",          criteria_value: 3   },
  { id: "first_words",  icon: "💬", rarity: "common",    criteria_type: "comments_count",       criteria_value: 1   },
  { id: "new_member",   icon: "🌱", rarity: "common",    criteria_type: "member_days",          criteria_value: 7   },
  { id: "tagger",       icon: "🏷️", rarity: "common",    criteria_type: "unique_tags_used",     criteria_value: 3   },

  // ── RARE (6) — "Getting serious" ──────────────────────────
  { id: "explorer",         icon: "🧭", rarity: "rare", criteria_type: "spots_count",          criteria_value: 5   },
  { id: "photographer",     icon: "📸", rarity: "rare", criteria_type: "photos_count",         criteria_value: 20  },
  { id: "crowd_pleaser",    icon: "❤️", rarity: "rare", criteria_type: "total_likes_received", criteria_value: 25  },
  { id: "curator",          icon: "🗂️", rarity: "rare", criteria_type: "saves_count",          criteria_value: 15  },
  { id: "social_butterfly", icon: "🦋", rarity: "rare", criteria_type: "comments_count",       criteria_value: 10  },
  { id: "supporter",        icon: "🤝", rarity: "rare", criteria_type: "likes_given",          criteria_value: 25  },

  // ── EPIC (5) — "Dedicated collector" ──────────────────────
  { id: "local_expert", icon: "🏆", rarity: "epic", criteria_type: "spots_count",          criteria_value: 10  },
  { id: "paparazzi",    icon: "🎞️", rarity: "epic", criteria_type: "photos_count",         criteria_value: 50  },
  { id: "influencer",   icon: "⭐", rarity: "epic", criteria_type: "total_likes_received", criteria_value: 100 },
  { id: "storyteller",  icon: "📖", rarity: "epic", criteria_type: "comments_count",       criteria_value: 50  },
  { id: "seasoned",     icon: "🍂", rarity: "epic", criteria_type: "member_days",          criteria_value: 90  },

  // ── LEGENDARY (5) — "The elite" ───────────────────────────
  { id: "rare_find",     icon: "💎", rarity: "legendary", criteria_type: "max_likes_on_spot",   criteria_value: 50  },
  { id: "sea_glass_og",  icon: "🌊", rarity: "legendary", criteria_type: "member_days",         criteria_value: 30  },
  { id: "cartographer",  icon: "🗺️", rarity: "legendary", criteria_type: "spots_count",         criteria_value: 30  },
  { id: "hall_of_fame",  icon: "👑", rarity: "legendary", criteria_type: "total_likes_received", criteria_value: 500 },
  { id: "veteran",       icon: "🔱", rarity: "legendary", criteria_type: "member_days",         criteria_value: 365 },
];

/** Returns badge IDs the user qualifies for based on their stats */
export function checkBadgeCriteria(stats: UserStats): string[] {
  return BADGE_DEFINITIONS
    .filter((badge) => {
      const value = stats[badge.criteria_type as keyof UserStats];
      return typeof value === "number" && value >= badge.criteria_value;
    })
    .map((b) => b.id);
}

// ─── Trophy Paths (progression cards) ──────────────────────

export interface TrophyPath {
  criteriaType: keyof UserStats;
  tiers: Badge[];
}

/** 9 progression paths, one per criteria_type, tiers sorted by criteria_value asc */
export const TROPHY_PATHS: TrophyPath[] = (() => {
  const map: Record<string, Badge[]> = {};
  for (const b of BADGE_DEFINITIONS) {
    (map[b.criteria_type] ??= []).push(b);
  }
  return Object.entries(map).map(([criteriaType, tiers]) => {
    tiers.sort((a, b) => a.criteria_value - b.criteria_value);
    return { criteriaType: criteriaType as keyof UserStats, tiers };
  });
})();

export interface TrophyProgress {
  path: TrophyPath;
  currentTier: Badge | null;
  nextTier: Badge | null;
  displayRarity: BadgeRarity;
  currentValue: number;
  progressPercent: number;
  started: boolean;
  completed: boolean;
}

export function getTrophyProgress(
  path: TrophyPath,
  currentValue: number,
  earnedBadgeIds: string[],
): TrophyProgress {
  const { tiers } = path;

  // Find highest earned tier (scan from top to bottom)
  let currentTierIdx = -1;
  for (let i = tiers.length - 1; i >= 0; i--) {
    if (earnedBadgeIds.includes(tiers[i].id)) {
      currentTierIdx = i;
      break;
    }
  }

  const currentTier = currentTierIdx >= 0 ? tiers[currentTierIdx] : null;
  const nextTier = currentTierIdx < tiers.length - 1 ? tiers[currentTierIdx + 1] : null;
  const started = currentTier !== null;
  const completed = currentTierIdx === tiers.length - 1;

  // Display rarity = current tier rarity, or first tier rarity if not started
  const displayRarity = currentTier?.rarity ?? tiers[0].rarity;

  // Progress calculation
  let progressPercent: number;
  if (completed) {
    progressPercent = 1;
  } else if (!started) {
    // Progress toward first tier
    progressPercent = Math.min(1, Math.max(0, currentValue / tiers[0].criteria_value));
  } else {
    // Progress from current tier toward next tier
    const from = currentTier!.criteria_value;
    const to = nextTier!.criteria_value;
    progressPercent = Math.min(1, Math.max(0, (currentValue - from) / (to - from)));
  }

  return {
    path,
    currentTier,
    nextTier,
    displayRarity,
    currentValue,
    progressPercent,
    started,
    completed,
  };
}
