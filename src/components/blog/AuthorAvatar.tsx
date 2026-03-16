"use client";

import { useState } from "react";
import Image from "next/image";

interface AuthorAvatarProps {
  name: string;
  avatar: string;
  size?: number;
}

const AVATAR_COLORS = [
  "bg-cyan-600",
  "bg-emerald-600",
  "bg-violet-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-indigo-600",
];

function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export function AuthorAvatar({ name, avatar, size = 28 }: AuthorAvatarProps) {
  const [imgError, setImgError] = useState(false);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (imgError || !avatar) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-full ${getColorFromName(name)}`}
        style={{ width: size, height: size }}
      >
        <span
          className="font-[family-name:var(--font-display)] font-semibold text-white"
          style={{ fontSize: size * 0.4 }}
        >
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full bg-navy-800"
      style={{ width: size, height: size }}
    >
      <Image
        src={avatar}
        alt={name}
        fill
        className="object-cover"
        sizes={`${size}px`}
        onError={() => setImgError(true)}
      />
    </div>
  );
}
