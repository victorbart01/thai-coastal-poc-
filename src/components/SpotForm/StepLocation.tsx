"use client";

import { MapPin } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function StepLocation() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-400/10">
        <MapPin className="h-5 w-5 text-pink-400" />
      </div>
      <div>
        <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold text-text-primary">
          {t("spotForm.stepLocation")}
        </h3>
        <p className="text-xs text-text-secondary">
          {t("spotForm.tapTheMap")}
        </p>
      </div>
    </div>
  );
}
