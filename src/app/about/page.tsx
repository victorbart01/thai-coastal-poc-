"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function AboutPage() {
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
          {t("about.title")}
        </h2>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-text-primary">
          {t("about.title")}
        </h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-text-body">
          <p>
            Sea Glass Map is a community-driven platform where sea glass collectors from around the world share their favorite beaches and hunting spots.
          </p>
          <p>
            Our mission is to connect collectors, preserve knowledge about the best sea glass locations, and celebrate the art of beachcombing.
          </p>
          <p>
            Drop pins on the map, upload photos of your finds, and discover new spots shared by fellow enthusiasts. The more the community contributes, the richer the map becomes for everyone.
          </p>

          <h2 className="mt-8 font-[family-name:var(--font-display)] text-lg font-semibold text-text-primary">
            How scores work
          </h2>
          <p>
            In addition to community spots, the map includes probability zones based on oceanographic, geomorphological, hydrological, and historical data. These algorithmic estimates highlight coastal areas where sea glass is more likely to accumulate naturally.
          </p>
          <p>
            Toggle probability zones on via the map controls to explore these data-driven insights alongside real community finds.
          </p>
        </div>
      </main>
    </div>
  );
}
