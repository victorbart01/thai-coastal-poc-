"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { useMapStore } from "@/store/useMapStore";
import { AuthButton } from "@/components/AuthButton";
import type { Locale } from "@/lib/i18n";

const NAV_LINKS = [
  { labelKey: "nav.map", href: "/map", icon: "🗺️" },
  { labelKey: "nav.about", href: "/about", icon: "🐚" },
  { labelKey: "nav.blog", href: "/blog", icon: "✏️", soon: true },
];

export function SiteNavbar() {
  const { t, locale } = useTranslation();
  const setLocale = useMapStore((s) => s.setLocale);

  return (
    <nav className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between bg-navy-900 px-6">
      <Link href="/" className="flex items-center gap-1.5 transition-opacity hover:opacity-80">
        <Image src="/logo_pin_sgm.png" alt="Seaglassmap" width={40} height={40} className="h-8 w-8" />
        <span className="font-logo text-lg tracking-tight text-white">
          <span className="font-bold">Seaglass</span>
          <span className="font-normal">map</span>
        </span>
        <span className="rounded-full bg-white/15 px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-white/70">
          beta
        </span>
      </Link>

      <div className="hidden items-center gap-6 md:flex">
        {NAV_LINKS.map((link) =>
          link.soon ? (
            <span
              key={link.href}
              className="flex cursor-default items-center gap-1.5 font-display text-sm font-medium text-white/30"
            >
              <span className="text-xs">{link.icon}</span>
              {t(link.labelKey)}
              <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-white/40">
                soon
              </span>
            </span>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-1.5 font-display text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              <span className="text-xs">{link.icon}</span>
              {t(link.labelKey)}
            </Link>
          )
        )}
      </div>

      <div className="flex items-center gap-3">
        <AuthButton />
        <div className="flex items-center gap-0.5 rounded-full border border-white/20 bg-white/10 p-0.5">
          {(["en", "th"] as Locale[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLocale(lang)}
              className={`rounded-full px-2.5 py-1 font-display text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                locale === lang
                  ? "bg-white/25 text-white shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
