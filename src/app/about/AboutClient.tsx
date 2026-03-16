"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Camera, Users, Instagram, Youtube, Facebook } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { useMapStore } from "@/store/useMapStore";
import { AuthButton } from "@/components/AuthButton";
import type { Locale } from "@/lib/i18n";

const NAV_LINKS = [
  { labelKey: "nav.about", href: "/about" },
  { labelKey: "nav.blog", href: "/blog" },
  { labelKey: "nav.shop", href: "/shop" },
  { labelKey: "nav.forum", href: "/forum" },
  { labelKey: "nav.dashboard", href: "/" },
];

export default function AboutClient() {
  const { t, locale } = useTranslation();
  const setLocale = useMapStore((s) => s.setLocale);

  return (
    <div className="h-screen overflow-y-auto bg-white">
      {/* ── Navbar ─────────────────────────────────────── */}
      <nav className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between bg-navy-900 px-6">
        <Link href="/" className="flex items-center gap-1.5 transition-opacity hover:opacity-80">
          <Image src="/logo_pin_sgm.png" alt="Seaglassmap" width={40} height={40} className="h-8 w-8" />
          <span className="font-[family-name:var(--font-logo)] text-lg tracking-tight text-white">
            <span className="font-bold">Seaglass</span>
            <span className="font-normal">map</span>
          </span>
          <span className="rounded-full bg-white/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/70">
            beta
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-display)] text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <AuthButton />
          <div className="flex items-center gap-0.5 rounded-full border border-white/20 bg-white/10 p-0.5">
            {(["en", "th"] as Locale[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLocale(lang)}
                className={`rounded-full px-2.5 py-1 font-[family-name:var(--font-display)] text-[10px] font-semibold uppercase tracking-wider transition-all duration-200 ${
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

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative flex min-h-[520px] items-center justify-center pt-14 md:min-h-[600px]">
        <Image
          src="/images/blog/thai-coastline.jpg"
          alt="Ocean coastline"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-900/70" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 py-20 text-center">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            {t("about.hero.heading")}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            {t("about.hero.sub")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="rounded-full bg-glass-deep px-7 py-3 font-[family-name:var(--font-display)] text-sm font-semibold text-white transition-colors hover:bg-glass-muted"
            >
              {t("about.hero.cta.map")}
            </Link>
            <Link
              href="/signup"
              className="rounded-full border-2 border-white px-7 py-3 font-[family-name:var(--font-display)] text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {t("about.hero.cta.join")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Our Mission ────────────────────────────────── */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.2em] text-glass-deep">
            {t("about.mission.label")}
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-center font-[family-name:var(--font-display)] text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">
            {t("about.mission.heading")}
          </h2>

          <div className="mt-14 grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-5 text-base leading-relaxed text-text-body">
              <p>{t("about.mission.p1")}</p>
              <p>{t("about.mission.p2")}</p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/blog/sea-glass-on-sand.jpg"
                alt="Colorful sea glass on a beach"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────── */}
      <section className="bg-ocean-950 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.2em] text-glass-deep">
            {t("about.how.label")}
          </p>
          <h2 className="mx-auto mt-3 max-w-xl text-center font-[family-name:var(--font-display)] text-2xl font-bold text-text-primary sm:text-3xl">
            {t("about.how.heading")}
          </h2>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {[
              { icon: MapPin, step: "step1" as const },
              { icon: Camera, step: "step2" as const },
              { icon: Users, step: "step3" as const },
            ].map(({ icon: Icon, step }) => (
              <div
                key={step}
                className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-glass-deep/10">
                  <Icon className="h-6 w-6 text-glass-deep" />
                </div>
                <span className="mt-5 text-[11px] font-semibold uppercase tracking-wider text-glass-deep">
                  {t(`about.how.${step}.label`)}
                </span>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-bold text-text-primary">
                  {t(`about.how.${step}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {t(`about.how.${step}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community Stats ────────────────────────────── */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-center font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.2em] text-glass-deep">
            {t("about.stats.label")}
          </p>

          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "500+", labelKey: "about.stats.beaches" },
              { value: "2,000+", labelKey: "about.stats.collectors" },
              { value: "15+", labelKey: "about.stats.countries" },
              { value: "10,000+", labelKey: "about.stats.finds" },
            ].map((stat) => (
              <div key={stat.labelKey} className="text-center">
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-text-primary sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-text-secondary">{t(stat.labelKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────── */}
      <section className="bg-navy-900 py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            {t("about.cta.heading")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            {t("about.cta.sub")}
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-block rounded-full bg-glass-deep px-8 py-3.5 font-[family-name:var(--font-display)] text-sm font-semibold text-white transition-colors hover:bg-glass-muted"
          >
            {t("about.cta.button")}
          </Link>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="bg-navy-950 py-14">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1.5">
              <Image src="/logo_pin_sgm.png" alt="Seaglassmap" width={32} height={32} className="h-7 w-7" />
              <span className="font-[family-name:var(--font-logo)] text-lg tracking-tight text-white">
                <span className="font-bold">Seaglass</span>
                <span className="font-normal">map</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              {t("about.footer.desc")}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-sm font-semibold text-white">
              {t("about.footer.links")}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: t("nav.about"), href: "/about" },
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

          {/* Social */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-sm font-semibold text-white">
              {t("about.footer.social")}
            </h4>
            <div className="mt-4 flex gap-4">
              {[Instagram, Youtube, Facebook].map((Icon, i) => (
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

        <div className="mx-auto mt-12 max-w-6xl border-t border-white/10 px-6 pt-6">
          <p className="text-center text-xs text-white/30">
            {t("about.footer.copyright")}
          </p>
        </div>
      </footer>
    </div>
  );
}
