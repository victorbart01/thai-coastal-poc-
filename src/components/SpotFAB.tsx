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
      className="group fixed bottom-6 right-6 z-30 hidden h-14 w-14 items-center justify-center rounded-full border border-white/[0.15] bg-black/70 shadow-[0_8px_32px_rgba(0,0,0,0.4)] ring-1 ring-black/5 backdrop-blur-xl transition-all duration-200 hover:scale-110 hover:bg-black/80 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] md:flex"
      title={t("fab.addSpot")}
    >
      <Plus className="h-6 w-6 text-white/90 transition-transform duration-200 group-hover:rotate-90 group-hover:text-white" />
    </button>
  );
}
