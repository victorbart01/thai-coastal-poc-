"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { useMapStore } from "@/store/useMapStore";
import { useTranslation } from "@/lib/i18n";

export function StepPreview() {
  const draftSpot = useMapStore((s) => s.draftSpot);
  const { t } = useTranslation();
  const [photoIndex, setPhotoIndex] = useState(0);

  const previewUrls = draftSpot.photos.map((f) => URL.createObjectURL(f));

  return (
    <div className="space-y-3">
      <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold text-text-primary">
        {t("spotForm.stepPreview")}
      </h3>

      {/* Preview card — mirrors SpotPopup */}
      <div className="glass-card overflow-hidden rounded-2xl">
        {/* Photo carousel */}
        {previewUrls.length > 0 && (
          <div className="group relative overflow-hidden rounded-t-xl">
            <Image
              src={previewUrls[photoIndex]}
              alt={`Preview ${photoIndex + 1}`}
              width={300}
              height={160}
              className="h-36 w-full object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 backdrop-blur-sm">
              <Camera className="h-3 w-3 text-white/80" />
              <span className="font-[family-name:var(--font-display)] text-[10px] text-white/80">
                {photoIndex + 1}/{previewUrls.length}
              </span>
            </div>
            {previewUrls.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setPhotoIndex(
                      (i) =>
                        (i - 1 + previewUrls.length) % previewUrls.length
                    )
                  }
                  className="absolute left-1.5 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                >
                  <ChevronLeft className="h-3.5 w-3.5 text-white" />
                </button>
                <button
                  onClick={() =>
                    setPhotoIndex(
                      (i) => (i + 1) % previewUrls.length
                    )
                  }
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-white" />
                </button>
              </>
            )}
          </div>
        )}

        <div className="p-3">
          <h4 className="font-[family-name:var(--font-display)] text-sm font-semibold text-text-primary">
            {draftSpot.title || t("spotForm.untitled")}
          </h4>

          {/* Rating */}
          <div className="mt-1.5 flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < draftSpot.rating
                    ? "fill-accent-pink text-accent-pink"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Tags */}
          {draftSpot.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {draftSpot.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-accent-pink/10 px-2 py-0.5 text-[10px] text-accent-pink"
                >
                  {t(`tag.${tag}`)}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          {draftSpot.description && (
            <p className="mt-2 text-[11px] leading-relaxed text-text-secondary">
              {draftSpot.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
