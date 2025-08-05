import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Vibraze - Free Video Audio Booster | Boost Audio for Instagram & TikTok",
  description:
    "FREE & EASY video audio enhancer! Boost your video sound in seconds for better Instagram, TikTok & YouTube performance. No signup required - process videos instantly in your browser with professional audio enhancement.",
  keywords:
    "free video audio booster, instagram audio boost, tiktok sound enhancement, youtube video audio, social media audio, video sound booster, free audio enhancer, viral video audio, engagement boost, algorithm optimization",
  authors: [{ name: "Vibraze Team" }],
  metadataBase: new URL("https://vibraze.app"),
  openGraph: {
    title: "Vibraze - FREE Video Audio Booster for Social Media",
    description:
      "Boost your video audio for FREE! Perfect for Instagram, TikTok & YouTube. Increase engagement and algorithm performance with louder, clearer audio.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0ea5e9",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎵</text></svg>"
        />
      </head>
      <body
        className={`${inter.className} bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
