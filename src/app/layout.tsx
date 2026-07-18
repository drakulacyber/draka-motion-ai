import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Draka Motion AI — World-Class AI Creative Studio",
  description: "Create stunning images, videos, and audio with the most advanced AI creative platform. Powered by Kling, Runway, Flux, Stability AI, and more.",
  keywords: ["AI", "creative studio", "text to image", "text to video", "AI art", "generative AI"],
  authors: [{ name: "Draka Motion AI" }],
  openGraph: {
    title: "Draka Motion AI — World-Class AI Creative Studio",
    description: "Create stunning images, videos, and audio with the most advanced AI creative platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full dark`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#0a0a0f" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-full bg-[#0a0a0f] text-white antialiased font-[family-name:var(--font-inter)]">
        <div className="bg-mesh" />
        {children}
      </body>
    </html>
  );
}
