"use client";

import { useTranslation } from "@/lib/i18n";
import { SiteNavbar } from "@/components/SiteNavbar";
import { SiteFooter } from "@/components/SiteFooter";

export default function ShopPage() {
  const { t } = useTranslation();

  return (
    <div className="h-screen overflow-y-auto bg-ocean-950">
      <SiteNavbar />

      <main className="mx-auto flex max-w-2xl flex-col items-center px-6 pt-20 pb-20 text-center">
        <span className="text-5xl">🛍️</span>
        <h1 className="mt-4 font-display text-2xl font-bold text-text-primary">
          {t("shop.title")}
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          {t("shop.comingSoon")}
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
