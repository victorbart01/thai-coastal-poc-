"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Camera, Users } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { useMapStore } from "@/store/useMapStore";
import { SiteNavbar } from "@/components/SiteNavbar";
import { SiteFooter } from "@/components/SiteFooter";
import { SignupModal } from "@/components/SignupModal";

export default function AboutClient() {
  const { t } = useTranslation();
  const openSignupModal = useMapStore((s) => s.openSignupModal);

  return (
    <div className="h-screen overflow-y-auto bg-white">
      <SiteNavbar />

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative flex min-h-[520px] items-center justify-center pt-14 md:min-h-[600px]">
        <Image
          src="/hero-section.png"
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
              href="/map"
              className="rounded-full bg-glass-deep px-7 py-3 font-[family-name:var(--font-display)] text-sm font-semibold text-white transition-colors hover:bg-glass-muted"
            >
              {t("about.hero.cta.map")}
            </Link>
            <button
              onClick={openSignupModal}
              className="rounded-full border-2 border-white px-7 py-3 font-[family-name:var(--font-display)] text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {t("about.hero.cta.join")}
            </button>
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
                src="/images/blog/sea-glass-on-sand.png"
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
          <button
            onClick={openSignupModal}
            className="mt-8 inline-block rounded-full bg-glass-deep px-8 py-3.5 font-[family-name:var(--font-display)] text-sm font-semibold text-white transition-colors hover:bg-glass-muted"
          >
            {t("about.cta.button")}
          </button>
        </div>
      </section>

      <SiteFooter />
      <SignupModal />
    </div>
  );
}
