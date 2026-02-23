"use client";

import { useState, useCallback } from "react";
import { useMapStore } from "@/store/useMapStore";

export function useUserLocation() {
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setUserLocation = useMapStore((s) => s.setUserLocation);
  const clearUserLocation = useMapStore((s) => s.clearUserLocation);
  const userLocation = useMapStore((s) => s.userLocation);

  const locate = useCallback(() => {
    // Toggle: if already active, clear it
    if (userLocation) {
      clearUserLocation();
      return;
    }

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLocating(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocating(false);
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("Location permission denied");
            break;
          case err.POSITION_UNAVAILABLE:
            setError("Position unavailable");
            break;
          case err.TIMEOUT:
            setError("Location request timed out");
            break;
          default:
            setError("Unable to get location");
        }
        setLocating(false);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  }, [userLocation, setUserLocation, clearUserLocation]);

  return { locate, locating, error };
}
