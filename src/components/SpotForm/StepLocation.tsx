"use client";

import { MapPin } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function StepLocation() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-4 py-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-400/10">
        <MapPin className="h-8 w-8 text-pink-400" />
      </div>
      <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-text-primary">
        {t("spotForm.stepLocation")}
      </h3>
      <p className="max-w-[240px] text-sm text-text-secondary">
        {t("spotForm.tapTheMap")}
      </p>
    </div>
  );
}
