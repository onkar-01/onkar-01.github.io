import type { Metadata, Viewport } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Onkar Vatsa — Frontend Engineer",
  description:
    "OnkarOS — the interactive portfolio of Onkar Vatsa, a frontend engineer crafting fast, delightful web experiences with React, Next.js and TypeScript.",
  authors: [{ name: "Onkar Vatsa" }],
  icons: { icon: "/img/logo/60_32default.png" },
  openGraph: {
    type: "website",
    title: "Onkar Vatsa — Frontend Engineer",
    description:
      "Boot into OnkarOS — an operating system built as a portfolio. Draggable windows, a working terminal, built with Next.js.",
    url: "https://onkar-01.github.io/",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#04070d",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Onkar Vatsa",
  url: "https://onkar-01.github.io/",
  jobTitle: "Frontend Engineer",
  worksFor: { "@type": "Organization", name: "Infyni" },
  sameAs: [
    "https://github.com/onkar-01",
    "https://www.linkedin.com/in/onkar-vatsa-2478b5212/",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
