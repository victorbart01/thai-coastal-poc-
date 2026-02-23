"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useMapStore } from "@/store/useMapStore";
import { useTranslation } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";

interface OnboardingCoachMarksProps {
  userId: string;
}

interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const PADDING = 8;

const STEP_CONFIG: {
  selector: string;
  mobileSelector?: string;
  messageKey: string;
  position: "bottom" | "left" | "right" | "top";
  mobilePosition?: "bottom" | "left" | "right" | "top";
  virtual?: boolean;
}[] = [
  {
    selector: '[data-onboarding="map"]',
    messageKey: "onboarding.step1",
    position: "bottom",
    virtual: true,
  },
  {
    selector: '[data-onboarding="sidebar"]',
    mobileSelector: '[data-onboarding="mobile-drawer"]',
    messageKey: "onboarding.step2",
    position: "right",
    mobilePosition: "top",
  },
  {
    selector: '[data-onboarding="fab"]',
    messageKey: "onboarding.step3",
    position: "left",
    mobilePosition: "top",
  },
];

function getTargetRect(step: number, isMobile: boolean): TargetRect | null {
  const config = STEP_CONFIG[step - 1];
  if (!config) return null;

  // Step 1: virtual rect centered on visible map area
  if (config.virtual) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const size = Math.min(vw, vh) * 0.3;
    return {
      top: vh * 0.35 - size / 2,
      left: vw * 0.4 - size / 2,
      width: size,
      height: size,
    };
  }

  const selector =
    isMobile && config.mobileSelector
      ? config.mobileSelector
      : config.selector;
  const el = document.querySelector(selector);
  if (!el) return null;

  const rect = el.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };
}

function getTooltipPosition(step: number, isMobile: boolean) {
  const config = STEP_CONFIG[step - 1];
  if (!config) return "bottom";
  return isMobile && config.mobilePosition
    ? config.mobilePosition
    : config.position;
}

export function OnboardingCoachMarks({ userId }: OnboardingCoachMarksProps) {
  const { t } = useTranslation();
  const step = useMapStore((s) => s.onboardingStep);
  const startOnboarding = useMapStore((s) => s.startOnboarding);
  const nextOnboardingStep = useMapStore((s) => s.nextOnboardingStep);
  const completeOnboarding = useMapStore((s) => s.completeOnboarding);

  const [targetRect, setTargetRect] = useState<TargetRect | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const checkedRef = useRef(false);

  const lsKey = `sgm:onboarding_done:${userId}`;

  // Check onboarding status on mount
  useEffect(() => {
    if (checkedRef.current) return;
    checkedRef.current = true;

    // 1. Check localStorage first
    if (localStorage.getItem(lsKey) === "true") return;

    // 2. Check Supabase
    const supabase = createClient();
    supabase
      .from("user_profiles")
      .select("onboarding_completed_at")
      .eq("id", userId)
      .single()
      .then(({ data }) => {
        if (data?.onboarding_completed_at) {
          localStorage.setItem(lsKey, "true");
          return;
        }
        // 3. Start onboarding after delay
        setTimeout(startOnboarding, 800);
      });
  }, [userId, lsKey, startOnboarding]);

  // Recalculate target rect on step change or resize
  const updateRect = useCallback(() => {
    if (step === 0) return;
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    setTargetRect(getTargetRect(step, mobile));
  }, [step]);

  useEffect(() => {
    updateRect();
    window.addEventListener("resize", updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, [updateRect]);

  const handleComplete = useCallback(() => {
    completeOnboarding();
    localStorage.setItem(lsKey, "true");
    // Fire-and-forget DB update
    const supabase = createClient();
    supabase
      .from("user_profiles")
      .update({ onboarding_completed_at: new Date().toISOString() })
      .eq("id", userId)
      .then(() => {});
  }, [completeOnboarding, lsKey, userId]);

  const handleNext = useCallback(() => {
    if (step >= 3) {
      handleComplete();
    } else {
      nextOnboardingStep();
    }
  }, [step, nextOnboardingStep, handleComplete]);

  if (step === 0 || !targetRect) return null;

  const position = getTooltipPosition(step, isMobile);
  const config = STEP_CONFIG[step - 1];

  // Tooltip positioning
  const tooltipStyle: React.CSSProperties = {};
  const TOOLTIP_GAP = 12;

  if (position === "bottom") {
    tooltipStyle.top = targetRect.top + targetRect.height + TOOLTIP_GAP;
    tooltipStyle.left = targetRect.left + targetRect.width / 2;
    tooltipStyle.transform = "translateX(-50%)";
  } else if (position === "left") {
    tooltipStyle.top = targetRect.top + targetRect.height / 2;
    tooltipStyle.right =
      window.innerWidth - targetRect.left + TOOLTIP_GAP;
    tooltipStyle.transform = "translateY(-50%)";
  } else if (position === "right") {
    tooltipStyle.top = targetRect.top + targetRect.height / 2;
    tooltipStyle.left = targetRect.left + targetRect.width + TOOLTIP_GAP;
    tooltipStyle.transform = "translateY(-50%)";
  } else if (position === "top") {
    tooltipStyle.bottom =
      window.innerHeight - targetRect.top + TOOLTIP_GAP;
    tooltipStyle.left = targetRect.left + targetRect.width / 2;
    tooltipStyle.transform = "translateX(-50%)";
  }

  // Cutout rect with padding
  const cx = targetRect.left - PADDING;
  const cy = targetRect.top - PADDING;
  const cw = targetRect.width + PADDING * 2;
  const ch = targetRect.height + PADDING * 2;
  const cr = 12; // border-radius for cutout

  return (
    <div className="fixed inset-0 z-[60]" aria-modal="true" role="dialog">
      {/* SVG backdrop with mask cutout */}
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <mask id="onboarding-mask">
            <rect width="100%" height="100%" fill="white" />
            <rect
              x={cx}
              y={cy}
              width={cw}
              height={ch}
              rx={cr}
              ry={cr}
              fill="black"
            />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(0,0,0,0.5)"
          mask="url(#onboarding-mask)"
        />
      </svg>

      {/* Tooltip */}
      <div
        className="absolute z-[61] w-72 rounded-xl border border-white/20 bg-white p-4 shadow-xl"
        style={tooltipStyle}
      >
        <p className="mb-3 text-sm leading-relaxed text-gray-700">
          {t(config.messageKey)}
        </p>

        <div className="flex items-center justify-between">
          {/* Step dots */}
          <div className="flex gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  s === step ? "bg-cyan-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleComplete}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              {t("onboarding.skip")}
            </button>
            <button
              onClick={handleNext}
              className="rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-cyan-600"
            >
              {step === 3 ? t("onboarding.done") : t("onboarding.next")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
