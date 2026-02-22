import type { SeaGlassZone } from "./types";

/**
 * Weights for each sub-score in the total score calculation.
 * historical + morphology = 50%, river = 20%, ocean + population = 30%
 */
const WEIGHTS = {
  historical: 0.25,
  morphology: 0.25,
  river: 0.2,
  ocean: 0.15,
  population: 0.15,
} as const;

/** Compute the weighted total score from sub-scores */
export function computeScore(subscores: SeaGlassZone["subscores"]): number {
  return parseFloat(
    Object.entries(WEIGHTS)
      .reduce(
        (sum, [key, weight]) =>
          sum + subscores[key as keyof typeof WEIGHTS] * weight,
        0
      )
      .toFixed(4)
  );
}

/** Classify a score into a human-readable tier */
export function getClassification(
  score: number
): SeaGlassZone["classification"] {
  if (score >= 0.75) return "very_high";
  if (score >= 0.55) return "high";
  if (score >= 0.35) return "medium";
  if (score >= 0.15) return "low";
  return "very_low";
}
