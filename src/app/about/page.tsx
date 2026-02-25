import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Sea Glass Map — The Global Sea Glass Hunting Community",
  description:
    "Sea Glass Map is a community-driven platform where sea glass collectors and beachcombers share hunting spots, discover the best sea glass beaches, and connect worldwide.",
  openGraph: {
    title: "About Sea Glass Map — The Global Sea Glass Hunting Community",
    description:
      "Join the global sea glass community. Share hunting spots, explore the best beaches for sea glass, and connect with collectors worldwide.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About Sea Glass Map — The Global Sea Glass Hunting Community",
    description:
      "Join the global sea glass community. Share hunting spots, explore the best beaches for sea glass, and connect with collectors worldwide.",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
