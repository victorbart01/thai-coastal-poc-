"use client";

import { useState, useEffect, useRef } from "react";
import { Link2, MessageCircle, Check } from "lucide-react";
import { useShare } from "@/lib/useShare";
import { useTranslation } from "@/lib/i18n";

interface ShareMenuProps {
  spotId: string;
  onClose: () => void;
}

export function ShareMenu({ spotId, onClose }: ShareMenuProps) {
  const { copyLink, shareToLine } = useShare();
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

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

  const handleLine = () => {
    shareToLine(spotId);
    onClose();
  };

  return (
    <div
      ref={ref}
      className="glass-card absolute bottom-full right-0 z-50 mb-2 w-44 rounded-2xl py-1 shadow-xl"
    >
      <button
        onClick={handleCopy}
        className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-xs text-text-secondary transition-colors hover:bg-black/[0.06] hover:text-text-primary"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-emerald-400" />
        ) : (
          <Link2 className="h-3.5 w-3.5" />
        )}
        {copied ? t("social.copied") : t("social.copyLink")}
      </button>
      <button
        onClick={handleLine}
        className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-xs text-text-secondary transition-colors hover:bg-black/[0.06] hover:text-text-primary"
      >
        <MessageCircle className="h-3.5 w-3.5" />
        {t("social.shareToLine")}
      </button>
    </div>
  );
}
