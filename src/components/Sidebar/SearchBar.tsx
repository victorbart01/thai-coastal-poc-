"use client";

import { Search } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function SearchBar() {
  const { t } = useTranslation();

  const handleClick = () => {
    // Future: open search modal
  };

  return (
    <button
      onClick={handleClick}
      className="glass-card flex w-full items-center gap-2.5 rounded-full px-4 py-2.5 text-left transition-all duration-200 hover:bg-black/[0.06]"
    >
      <Search className="h-4 w-4 shrink-0 text-text-tertiary" />
      <span className="text-xs text-text-tertiary">
        {t("search.placeholder")}
      </span>
    </button>
  );
}
