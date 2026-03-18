"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Youtube, Facebook, Twitter, Globe } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useTranslation();

  return (
    <footer className="bg-navy-950 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:grid-cols-2 md:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-1.5">
            <Image src="/logo_pin_sgm.png" alt="Seaglassmap" width={32} height={32} className="h-7 w-7" />
            <span className="font-logo text-lg tracking-tight text-white">
              <span className="font-bold">Seaglass</span>
              <span className="font-normal">map</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
            {t("about.footer.desc")}
          </p>
        </div>

        {/* Explore */}
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            {t("footer.explore")}
          </h4>
          <ul className="mt-4 space-y-2.5">
            {[
              { label: t("nav.about"), href: "/" },
              { label: t("nav.map"), href: "/map" },
              { label: t("nav.blog"), href: "/blog" },
              { label: t("nav.shop"), href: "/shop" },
              { label: t("nav.forum"), href: "/forum" },
              { label: t("about.footer.contact"), href: "#" },
            ].map((link) => (
              <li key={link.href + link.label}>
                <Link href={link.href} className="text-sm text-white/50 transition-colors hover:text-white/80">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Community */}
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            {t("footer.community")}
          </h4>
          <ul className="mt-4 space-y-2.5">
            {[
              { label: t("nav.dashboard"), href: "/map" },
              { label: t("footer.topCollectors"), href: "#" },
              { label: t("footer.submitSpot"), href: "/map" },
              { label: t("footer.guidelines"), href: "#" },
            ].map((link) => (
              <li key={link.href + link.label}>
                <Link href={link.href} className="text-sm text-white/50 transition-colors hover:text-white/80">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            {t("footer.followUs")}
          </h4>
          <div className="mt-4 flex gap-3">
            {[Instagram, Twitter, Facebook, Globe, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl items-center justify-between border-t border-white/10 px-6 pt-6">
        <p className="text-xs text-white/30">
          {t("about.footer.copyright")}
        </p>
        <p className="text-xs text-white/30">
          {t("footer.madeWith")}
        </p>
      </div>
    </footer>
  );
}
