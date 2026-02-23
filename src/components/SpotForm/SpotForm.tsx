"use client";

import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useMapStore } from "@/store/useMapStore";
import { useTranslation } from "@/lib/i18n";
import { useCreateSpot } from "@/lib/useCreateSpot";

import { StepLocation } from "./StepLocation";
import { StepPhotos } from "./StepPhotos";
import { StepDetails } from "./StepDetails";
import { StepPreview } from "./StepPreview";

interface SpotFormProps {
  userId: string;
  onPublished: () => void;
}

const STEP_LABELS = [
  "spotForm.stepLocationLabel",
  "spotForm.stepPhotosLabel",
  "spotForm.stepDetailsLabel",
  "spotForm.stepPreviewLabel",
] as const;

export function SpotForm({ userId, onPublished }: SpotFormProps) {
  const showSpotForm = useMapStore((s) => s.showSpotForm);
  const spotFormStep = useMapStore((s) => s.spotFormStep);
  const draftSpot = useMapStore((s) => s.draftSpot);
  const closeSpotForm = useMapStore((s) => s.closeSpotForm);
  const setSpotFormStep = useMapStore((s) => s.setSpotFormStep);
  const { t } = useTranslation();
  const { creating, error, createSpot } = useCreateSpot();

  if (!showSpotForm) return null;

  const canGoNext = (() => {
    switch (spotFormStep) {
      case 1:
        return draftSpot.latitude !== null && draftSpot.longitude !== null;
      case 2:
        return draftSpot.photos.length > 0;
      case 3:
        return draftSpot.title.trim().length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  })();

  const handleNext = () => {
    if (spotFormStep < 4) {
      setSpotFormStep(spotFormStep + 1);
    }
  };

  const handleBack = () => {
    if (spotFormStep > 1) {
      setSpotFormStep(spotFormStep - 1);
    }
  };

  const handlePublish = async () => {
    const spotId = await createSpot(draftSpot, userId);
    if (spotId) {
      closeSpotForm();
      onPublished();
    }
  };

  // Step 1: show a small floating banner so the map stays interactive
  if (spotFormStep === 1) {
    return (
      <div className="fixed bottom-24 left-1/2 z-30 -translate-x-1/2 animate-slide-in md:bottom-8">
        <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-black/70 px-5 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
          <StepLocation />
          <button
            onClick={closeSpotForm}
            className="shrink-0 rounded-full p-1 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="animate-fade-in fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
        onClick={closeSpotForm}
      />

      {/* Modal panel */}
      <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-md animate-slide-in md:bottom-auto md:left-1/2 md:top-1/2 md:max-h-[85vh] md:-translate-x-1/2 md:-translate-y-1/2">
        <div className="rounded-t-2xl bg-white/95 shadow-2xl backdrop-blur-xl md:rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3">
            <h2 className="font-[family-name:var(--font-display)] text-sm font-semibold text-text-primary">
              {t("spotForm.title")}
            </h2>
            <button
              onClick={closeSpotForm}
              className="rounded-full p-1 text-text-tertiary transition-colors hover:bg-black/[0.06] hover:text-text-primary"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-center gap-0 px-4 pt-4 pb-1">
            {STEP_LABELS.map((label, i) => {
              const stepNum = i + 1;
              const isCompleted = stepNum < spotFormStep;
              const isCurrent = stepNum === spotFormStep;
              return (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                        isCompleted
                          ? "bg-gradient-to-br from-glass-deep to-accent-pink text-white shadow-sm"
                          : isCurrent
                            ? "ring-2 ring-accent-pink/40 bg-accent-pink/10 text-accent-pink"
                            : "bg-black/[0.05] text-text-tertiary"
                      }`}
                    >
                      {stepNum}
                    </div>
                    <span
                      className={`text-[9px] leading-tight ${
                        isCurrent
                          ? "font-medium text-accent-pink"
                          : isCompleted
                            ? "font-medium text-text-secondary"
                            : "text-text-tertiary"
                      }`}
                    >
                      {t(label)}
                    </span>
                  </div>
                  {i < STEP_LABELS.length - 1 && (
                    <div
                      className={`mx-2.5 mb-4 h-px w-8 transition-colors ${
                        stepNum < spotFormStep ? "bg-accent-pink/40" : "bg-black/[0.08]"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Step content */}
          <div className="max-h-[50vh] overflow-y-auto px-4 py-4 md:max-h-[55vh]">
            {spotFormStep === 2 && <StepPhotos />}
            {spotFormStep === 3 && <StepDetails />}
            {spotFormStep === 4 && <StepPreview />}
          </div>

          {/* Error message */}
          {error && (
            <div className="px-4 pb-2">
              <p className="text-xs text-danger">{error}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between border-t border-black/[0.06] px-4 py-3">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs text-text-secondary transition-colors hover:bg-black/[0.06]"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              {t("spotForm.back")}
            </button>

            {spotFormStep < 4 ? (
              <button
                onClick={handleNext}
                disabled={!canGoNext}
                className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-glass-deep to-accent-pink px-4 py-1.5 text-xs font-medium text-white transition-all disabled:opacity-30"
              >
                {t("spotForm.next")}
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                onClick={handlePublish}
                disabled={creating}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-glass-deep to-accent-pink px-5 py-1.5 text-xs font-medium text-white transition-all disabled:opacity-60"
              >
                {creating && (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                )}
                {creating ? t("spotForm.publishing") : t("spotForm.publish")}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
