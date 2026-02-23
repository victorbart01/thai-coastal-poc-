"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";
import { useShare } from "@/lib/useShare";
import { useTranslation } from "@/lib/i18n";

interface ShareMenuProps {
  spotId: string;
  onClose: () => void;
}

export function ShareMenu({ spotId, onClose }: ShareMenuProps) {
  const { copyLink, shareToLine, shareToFacebook } = useShare();
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyLink(spotId);
    if (ok) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        onClose();
      }, 1200);
    }
  };

  const handleFacebook = () => {
    shareToFacebook(spotId);
    onClose();
  };

  const handleLine = () => {
    shareToLine(spotId);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="glass-card rounded-2xl px-8 py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center gap-10">
          {/* Copy Link */}
          <button onClick={handleCopy} className="flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/[0.06]">
              {copied ? (
                <Check className="h-8 w-8 text-emerald-400" />
              ) : (
                <Link2 className="h-8 w-8 text-text-primary" />
              )}
            </div>
            <span className="mt-2 text-xs text-text-secondary">
              {copied ? t("social.copied") : t("social.copyLink")}
            </span>
          </button>

          {/* Facebook */}
          <button onClick={handleFacebook} className="flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/[0.06]">
              <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none">
                <circle cx="12" cy="12" r="12" fill="#1877F2" />
                <path
                  d="M16.671 15.469l.547-3.585h-3.44V9.59c0-.98.48-1.937 2.022-1.937h1.564V4.6s-1.42-.243-2.777-.243c-2.834 0-4.687 1.718-4.687 4.83v2.732H6.88v3.585h3.02V24h3.718v-8.531h2.893z"
                  fill="#fff"
                />
              </svg>
            </div>
            <span className="mt-2 text-xs text-text-secondary">
              {t("social.shareToFacebook")}
            </span>
          </button>

          {/* LINE */}
          <button onClick={handleLine} className="flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/[0.06]">
              <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none">
                <rect width="24" height="24" rx="12" fill="#06C755" />
                <path
                  d="M19.365 11.064c0-3.225-3.232-5.85-7.205-5.85-3.972 0-7.204 2.625-7.204 5.85 0 2.892 2.564 5.312 6.027 5.772.235.05.555.155.636.356.073.183.048.469.023.653l-.102.618c-.031.183-.145.716.627.39.773-.326 4.168-2.454 5.688-4.202 1.049-1.15 1.51-2.318 1.51-3.587z"
                  fill="#fff"
                />
                <path
                  d="M10.173 9.54H9.56a.19.19 0 00-.19.19v3.027a.19.19 0 00.19.19h.613a.19.19 0 00.19-.19V9.73a.19.19 0 00-.19-.19zm4.394 0h-.613a.19.19 0 00-.19.19v1.799l-1.737-1.914a.186.186 0 00-.147-.075h-.613a.19.19 0 00-.19.19v3.027a.19.19 0 00.19.19h.613a.19.19 0 00.19-.19v-1.8l1.74 1.918a.19.19 0 00.147.072h.613a.19.19 0 00.19-.19V9.73a.19.19 0 00-.19-.19zm-5.756 2.437H7.676V9.73a.19.19 0 00-.19-.19h-.613a.19.19 0 00-.19.19v3.027a.19.19 0 00.19.19h1.938a.19.19 0 00.19-.19v-.59a.19.19 0 00-.19-.19zm8.51-1.847v-.59a.19.19 0 00-.19-.19h-1.938a.19.19 0 00-.19.19v3.027a.19.19 0 00.19.19h1.938a.19.19 0 00.19-.19v-.59a.19.19 0 00-.19-.19h-1.135v-.423h1.135a.19.19 0 00.19-.19v-.59a.19.19 0 00-.19-.19h-1.135v-.424h1.135a.19.19 0 00.19-.19v-.65z"
                  fill="#06C755"
                />
              </svg>
            </div>
            <span className="mt-2 text-xs text-text-secondary">
              {t("social.shareToLine")}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
