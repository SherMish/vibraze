import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vibraze - Boost Your Video Audio",
  description:
    "Upload videos and enhance their audio with professional sound boosting technology. Process videos directly in your browser with privacy-first approach.",
  keywords: "video, audio, boost, enhancement, ffmpeg, browser, privacy",
  authors: [{ name: "Vibraze Team" }],
  metadataBase: new URL("https://vibraze.app"),
  openGraph: {
    title: "Vibraze - Boost Your Video Audio",
    description: "Professional video audio enhancement in your browser",
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
