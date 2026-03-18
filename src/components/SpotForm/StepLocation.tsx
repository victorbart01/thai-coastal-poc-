"use client";

import { MapPin } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function StepLocation() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-pink/20">
        <MapPin className="h-4 w-4 text-accent-pink" />
      </div>
      <div className="min-w-0">
        <h3 className="whitespace-nowrap font-display text-sm font-semibold text-white">
          {t("spotForm.stepLocation")}
        </h3>
        <p className="whitespace-nowrap text-xs text-white/60">
          {t("spotForm.tapTheMap")}
        </p>
      </div>
    </div>
  );
}
