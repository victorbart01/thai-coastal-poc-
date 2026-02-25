"use client";

import { useEffect, useState } from "react";
import { Toaster } from "sonner";

export function ToasterProvider() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return (
    <Toaster
      position={isMobile ? "top-center" : "bottom-center"}
      toastOptions={{ unstyled: true }}
      visibleToasts={3}
    />
  );
}
