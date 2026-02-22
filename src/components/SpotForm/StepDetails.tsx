"use client";

import { Star } from "lucide-react";
import { useMapStore } from "@/store/useMapStore";
import { useTranslation } from "@/lib/i18n";
import { SPOT_TAGS, type SpotTag } from "@/lib/types";

export function StepDetails() {
  const draftSpot = useMapStore((s) => s.draftSpot);
  const updateDraftSpot = useMapStore((s) => s.updateDraftSpot);
  const { t } = useTranslation();

  const toggleTag = (tag: SpotTag) => {
    const has = draftSpot.tags.includes(tag);
    updateDraftSpot({
      tags: has
        ? draftSpot.tags.filter((t) => t !== tag)
        : [...draftSpot.tags, tag],
    });
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <label className="text-xs font-medium text-text-secondary">
          {t("spotForm.titleLabel")}
        </label>
        <input
          type="text"
          value={draftSpot.title}
          onChange={(e) => updateDraftSpot({ title: e.target.value })}
          maxLength={80}
          placeholder={t("spotForm.titlePlaceholder")}
          className="mt-1 w-full rounded-lg border border-ocean-500 bg-ocean-800 px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400/30"
        />
      </div>

      {/* Rating */}
      <div>
        <label className="text-xs font-medium text-text-secondary">
          {t("spotForm.ratingLabel")}
        </label>
        <div className="mt-1.5 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              onClick={() => updateDraftSpot({ rating: i + 1 })}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`h-6 w-6 ${
                  i < draftSpot.rating
                    ? "fill-pink-400 text-pink-400"
                    : "text-ocean-500"
                }`}
              />
            </button>
          ))}
          <span className="ml-2 font-[family-name:var(--font-display)] text-sm text-text-secondary">
            {draftSpot.rating}/5
          </span>
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="text-xs font-medium text-text-secondary">
          {t("spotForm.tagsLabel")}
        </label>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {SPOT_TAGS.map((tag) => {
            const active = draftSpot.tags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  active
                    ? "bg-pink-400/20 text-pink-400"
                    : "bg-ocean-600 text-text-tertiary hover:text-text-secondary"
                }`}
              >
                {t(`tag.${tag}`)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="text-xs font-medium text-text-secondary">
          {t("spotForm.descriptionLabel")}
        </label>
        <textarea
          value={draftSpot.description}
          onChange={(e) => updateDraftSpot({ description: e.target.value })}
          maxLength={500}
          rows={3}
          placeholder={t("spotForm.descriptionPlaceholder")}
          className="mt-1 w-full resize-none rounded-lg border border-ocean-500 bg-ocean-800 px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400/30"
        />
      </div>
    </div>
  );
}
