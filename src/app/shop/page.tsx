"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function ShopPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-ocean-950">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-black/[0.06] bg-ocean-950/80 px-4 py-3 backdrop-blur-md">
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-text-secondary transition-colors hover:bg-black/[0.06] hover:text-text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("profile.backToMap")}
        </Link>
        <h2 className="font-[family-name:var(--font-display)] text-sm font-semibold text-text-primary">
          {t("shop.title")}
        </h2>
      </header>

      <main className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center sm:px-6">
        <span className="text-5xl">🛍️</span>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-bold text-text-primary">
          {t("shop.title")}
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          {t("shop.comingSoon")}
        </p>
      </main>
    </div>
  );
}
