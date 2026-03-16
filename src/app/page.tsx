import type { Metadata } from "next";
import AboutClient from "./about/AboutClient";

export const metadata: Metadata = {
  title: "Seaglassmap — Discover the World's Best Sea Glass Beaches",
  description:
    "Seaglassmap connects sea glass collectors worldwide. Discover beaches, share your finds, and join a growing community of enthusiasts.",
  openGraph: {
    title: "Seaglassmap — Discover the World's Best Sea Glass Beaches",
    description:
      "Join a global community of sea glass collectors. Explore the best beaches, share your finds, and connect with enthusiasts worldwide.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seaglassmap — Discover the World's Best Sea Glass Beaches",
    description:
      "Join a global community of sea glass collectors. Explore the best beaches, share your finds, and connect with enthusiasts worldwide.",
  },
};

export default function HomePage() {
  return <AboutClient />;
}
