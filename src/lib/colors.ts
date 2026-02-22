import type { SeaGlassZone } from "./types";

/** Map a score (0–1) to a color hex string */
export function getScoreColor(score: number): string {
  if (score >= 0.75) return "#06b6d4"; // very high — teal
  if (score >= 0.55) return "#22d3ee"; // high — cyan
  if (score >= 0.35) return "#facc15"; // medium — yellow
  if (score >= 0.15) return "#fb923c"; // low — orange
  return "#64748b"; // very low — slate
}

/** Map a score to the i18n key for its label */
export function getScoreLabelKey(score: number): string {
  if (score >= 0.75) return "score.veryHigh";
  if (score >= 0.55) return "score.high";
  if (score >= 0.35) return "score.moderate";
  if (score >= 0.15) return "score.low";
  return "score.veryLow";
}

/** Map a score to a classification key */
export function getClassification(
  score: number
): SeaGlassZone["classification"] {
  if (score >= 0.75) return "very_high";
  if (score >= 0.55) return "high";
  if (score >= 0.35) return "medium";
  if (score >= 0.15) return "low";
  return "very_low";
}

/** Get the i18n key for a category */
export function getCategoryLabelKey(
  category: SeaGlassZone["category"]
): string {
  return `category.${category}`;
}

/** Category badge colors */
export const CATEGORY_COLORS: Record<SeaGlassZone["category"], string> = {
  river_delta: "#38bdf8",
  industrial: "#f87171",
  urban_coast: "#a78bfa",
  island: "#34d399",
  river_mouth: "#60a5fa",
  natural: "#4ade80",
};
