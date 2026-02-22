"use client";

import { useRef } from "react";
import Image from "next/image";
import { Camera, X, Plus } from "lucide-react";
import { useMapStore } from "@/store/useMapStore";
import { useTranslation } from "@/lib/i18n";

export function StepPhotos() {
  const draftSpot = useMapStore((s) => s.draftSpot);
  const updateDraftSpot = useMapStore((s) => s.updateDraftSpot);
  const fileRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    updateDraftSpot({ photos: [...draftSpot.photos, ...files].slice(0, 5) });
    // Reset input so same file can be re-added
    if (fileRef.current) fileRef.current.value = "";
  };

  const removePhoto = (index: number) => {
    updateDraftSpot({
      photos: draftSpot.photos.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Camera className="h-4 w-4 text-accent-pink" />
        <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold text-text-primary">
          {t("spotForm.stepPhotos")}
        </h3>
      </div>
      <p className="text-xs text-text-secondary">
        {t("spotForm.photosHint")}
      </p>

      {/* Photo grid */}
      <div className="grid grid-cols-3 gap-2">
        {draftSpot.photos.map((file, i) => (
          <div key={i} className="group relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={URL.createObjectURL(file)}
              alt={`Photo ${i + 1}`}
              fill
              className="object-cover"
              unoptimized
            />
            <button
              onClick={() => removePhoto(i)}
              className="absolute right-1 top-1 rounded-full bg-black/60 p-0.5 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <X className="h-3 w-3 text-white" />
            </button>
          </div>
        ))}

        {/* Add photo button */}
        {draftSpot.photos.length < 5 && (
          <button
            onClick={() => fileRef.current?.click()}
            className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-black/[0.12] text-text-tertiary transition-colors hover:border-accent-pink hover:text-accent-pink"
          >
            <Plus className="h-5 w-5" />
          </button>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={handleFiles}
        className="hidden"
      />

      {draftSpot.photos.length === 0 && (
        <p className="text-[11px] text-danger">{t("spotForm.photoRequired")}</p>
      )}
    </div>
  );
}
