import type { SeaGlassZone } from "./types";

/** Map a score (0–1) to a color hex string */
export function getScoreColor(score: number): string {
  if (score >= 0.75) return "#06b6d4"; // very high — teal
  if (score >= 0.55) return "#22d3ee"; // high — cyan
  if (score >= 0.35) return "#facc15"; // medium — yellow
  if (score >= 0.15) return "#fb923c"; // low — orange
  return "#64748b"; // very low — slate
}

/** Map a score to a human-readable label */
export function getScoreLabel(score: number): string {
  if (score >= 0.75) return "Très élevé";
  if (score >= 0.55) return "Élevé";
  if (score >= 0.35) return "Modéré";
  if (score >= 0.15) return "Faible";
  return "Très faible";
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

/** Category display labels */
export const CATEGORY_LABELS: Record<SeaGlassZone["category"], string> = {
  river_delta: "Delta fluvial",
  industrial: "Zone industrielle",
  urban_coast: "Côte urbaine",
  island: "Île",
  river_mouth: "Embouchure",
  natural: "Zone naturelle",
};

/** Category badge colors */
export const CATEGORY_COLORS: Record<SeaGlassZone["category"], string> = {
  river_delta: "#38bdf8",
  industrial: "#f87171",
  urban_coast: "#a78bfa",
  island: "#34d399",
  river_mouth: "#60a5fa",
  natural: "#4ade80",
};
