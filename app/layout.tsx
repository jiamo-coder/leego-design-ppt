import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leego Design PPT — Presentation System",
  description:
    "A presentation skill for responsive web decks, editable PPTX, and pixel-stable PDF delivery.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
