"use client";

import { useCallback } from "react";

export function useShare() {
  const getSpotUrl = useCallback((spotId: string) => {
    return `${window.location.origin}?spot=${spotId}`;
  }, []);

  const copyLink = useCallback(
    async (spotId: string): Promise<boolean> => {
      try {
        await navigator.clipboard.writeText(getSpotUrl(spotId));
        return true;
      } catch {
        return false;
      }
    },
    [getSpotUrl]
  );

  const shareToFacebook = useCallback(
    (spotId: string) => {
      const url = encodeURIComponent(getSpotUrl(spotId));
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank",
        "noopener,noreferrer"
      );
    },
    [getSpotUrl]
  );

  const shareToLine = useCallback(
    (spotId: string) => {
      const url = encodeURIComponent(getSpotUrl(spotId));
      window.open(
        `https://social-plugins.line.me/lineit/share?url=${url}`,
        "_blank",
        "noopener,noreferrer"
      );
    },
    [getSpotUrl]
  );

  return { getSpotUrl, copyLink, shareToFacebook, shareToLine };
}
