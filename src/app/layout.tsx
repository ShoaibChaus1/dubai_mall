import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import GrainOverlay from "@/components/ui/GrainOverlay";
import AmbientPlayer from "@/components/ui/AmbientPlayer";
import SectionCounter from "@/components/ui/SectionCounter";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dubai Mall | The Global Stage",
  description: "The world's most visited destination. 100M+ annual visitors. 1,300 stores. One address in Downtown Dubai.",
  keywords: "Dubai Mall, luxury retail, Fashion Avenue, brand activation, Emaar Properties, Downtown Dubai",
  openGraph: {
    title: "Dubai Mall | The Global Stage",
    description: "Where the world shops. Secure your presence in the planet's most visited retail destination.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${dmSans.variable} font-sans antialiased overflow-x-hidden`}
        style={{ backgroundColor: '#080808', color: '#F0EDE8' }}
        suppressHydrationWarning
      >
        {/* Global grain overlay — fixed, always on top of content, below UI */}
        <GrainOverlay />
        {/* Ambient audio player pill — top right */}
        <AmbientPlayer />
        {/* Section counter — top left */}
        <SectionCounter />
        
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
