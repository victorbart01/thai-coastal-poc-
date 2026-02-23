"use client";

import { useRef, useEffect, useState } from "react";
import { Search, MapPin, X, Loader2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { useGeocoding } from "@/lib/useGeocoding";
import { useMapStore } from "@/store/useMapStore";

export function SearchBar() {
  const { t } = useTranslation();
  const { query, setQuery, suggestions, loading, retrieve } = useGeocoding();
  const searchLocation = useMapStore((s) => s.searchLocation);
  const setSearchLocation = useMapStore((s) => s.setSearchLocation);
  const clearSearch = useMapStore((s) => s.clearSearch);

  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = async (mapboxId: string) => {
    const result = await retrieve(mapboxId);
    if (result) {
      setSearchLocation(result);
      setQuery(result.name);
      setOpen(false);
    }
  };

  const handleClear = () => {
    clearSearch();
    setQuery("");
    setSuggestionsVisible(false);
    inputRef.current?.focus();
  };

  // Helper to avoid stale open state
  function setSuggestionsVisible(visible: boolean) {
    setOpen(visible);
  }

  const showDropdown = open && query.length >= 2;

  return (
    <div ref={containerRef} className="relative">
      {/* Input pill */}
      <div className="glass-card flex w-full items-center gap-2.5 rounded-full px-4 py-2.5">
        {loading ? (
          <Loader2 className="h-4 w-4 shrink-0 animate-spin text-text-tertiary" />
        ) : (
          <Search className="h-4 w-4 shrink-0 text-text-tertiary" />
        )}
        <input
          ref={inputRef}
          type="text"
          value={searchLocation ? searchLocation.name : query}
          onChange={(e) => {
            // If user had a selected location, clear it so they can type freely
            if (searchLocation) {
              clearSearch();
            }
            setQuery(e.target.value);
            setSuggestionsVisible(true);
          }}
          onFocus={() => {
            if (query.length >= 2 && !searchLocation) {
              setSuggestionsVisible(true);
            }
          }}
          placeholder={t("search.placeholder")}
          className="min-w-0 flex-1 bg-transparent text-xs text-text-primary outline-none placeholder:text-text-tertiary"
        />
        {(searchLocation || query.length > 0) && (
          <button
            onClick={handleClear}
            aria-label={t("search.clearSearch")}
            className="shrink-0 rounded-full p-0.5 transition-colors hover:bg-black/[0.06]"
          >
            <X className="h-3.5 w-3.5 text-text-tertiary" />
          </button>
        )}
      </div>

      {/* Autocomplete dropdown */}
      {showDropdown && (
        <div className="glass-card absolute inset-x-0 top-full z-50 mt-1.5 overflow-hidden rounded-xl py-1 shadow-lg">
          {suggestions.length === 0 && !loading && (
            <div className="px-4 py-3 text-xs text-text-tertiary">
              {t("search.noResults")}
            </div>
          )}
          {suggestions.map((s) => (
            <button
              key={s.mapbox_id}
              onClick={() => handleSelect(s.mapbox_id)}
              className="flex w-full items-start gap-2.5 px-4 py-2.5 text-left transition-colors hover:bg-black/[0.04]"
            >
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-text-tertiary" />
              <div className="min-w-0 flex-1">
                <div className="truncate text-xs font-medium text-text-primary">
                  {s.name}
                </div>
                {s.place_formatted && (
                  <div className="truncate text-[11px] text-text-tertiary">
                    {s.place_formatted}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* "Showing spots near …" indicator */}
      {searchLocation && (
        <div className="mt-1.5 flex items-center gap-1 px-1 text-[11px] text-text-tertiary">
          <MapPin className="h-3 w-3" />
          <span>
            {t("search.showingNear")} <strong>{searchLocation.name}</strong>
          </span>
        </div>
      )}
    </div>
  );
}
