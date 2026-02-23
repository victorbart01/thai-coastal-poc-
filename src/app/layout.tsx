import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, Nunito } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-logo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sea Glass Map — The world's sea glass community",
  description:
    "Discover, share and explore sea glass spots around the world. A community-driven interactive map for sea glass collectors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable} ${nunito.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
