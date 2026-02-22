"use client";

import { useTranslation } from "@/lib/i18n";

export function TaglineSection() {
  const { t } = useTranslation();

  return (
    <div className="px-1 py-2">
      <p className="font-[family-name:var(--font-display)] text-lg font-semibold leading-tight text-text-primary">
        {t("tagline.main")}
      </p>
    </div>
  );
}
