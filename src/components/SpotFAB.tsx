"use client";

import { Plus } from "lucide-react";
import { useMapStore } from "@/store/useMapStore";
import { useTranslation } from "@/lib/i18n";

interface SpotFABProps {
  isLoggedIn: boolean;
}

export function SpotFAB({ isLoggedIn }: SpotFABProps) {
  const showSpotForm = useMapStore((s) => s.showSpotForm);
  const openSpotForm = useMapStore((s) => s.openSpotForm);
  const { t } = useTranslation();

  if (!isLoggedIn || showSpotForm) return null;

  return (
    <button
      onClick={openSpotForm}
      data-onboarding="fab"
      className="animate-pulse-fab group fixed bottom-6 right-6 z-30 hidden h-14 w-14 items-center justify-center rounded-full bg-black shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all duration-200 hover:scale-110 hover:shadow-[0_6px_24px_rgba(0,0,0,0.3)] md:flex"
      title={t("fab.addSpot")}
    >
      <Plus className="h-6 w-6 text-white transition-transform duration-200 group-hover:rotate-90" />
    </button>
  );
}
