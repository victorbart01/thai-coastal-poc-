"use client";

import { useUser } from "@/lib/useUser";

const ADMIN_IDS = (process.env.NEXT_PUBLIC_ADMIN_IDS ?? "")
  .split(",")
  .map((id) => id.trim())
  .filter(Boolean);

export function useAdmin(): boolean {
  const { user } = useUser();
  if (!user) return false;
  return ADMIN_IDS.includes(user.id);
}
