"use client";

import { Toaster } from "sonner";

export function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{ unstyled: true }}
      visibleToasts={3}
    />
  );
}
