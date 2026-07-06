import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Yen-Chia, Feng",
  description: "Blender Portfolio Website",
  // icons: {
  //   icon: "/favicon.ico",
  // },
  keywords: ["Blender", "Geometry Nodes", "Portfolio", "3D", "Animation"],
  authors: [{ name: "Yen-Chia Feng" }],
  openGraph: {
    title: "Yen-Chia, Feng's Blender Portfolio Website",
    description: "A showcase of my Blender works, including 3D modeling, animation, and geometry nodes projects.",
    url: "https://Yen-Chia-Feng-Blender-Portfolio-Website.vercel.app/",
    siteName: "Yen-Chia, Feng",
    images: [
      {
        url: "/images/banner.png",
        width: 1200,
        height: 630,
        alt: "Blender Portfolio Website",
      },
    ],
    locale: "zh_TW",
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
      lang="zh"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="w-full min-h-screen flex flex-col text-neutral-900 bg-white">
        <Navbar />
        
        {/* 用 main 加上 flex-1 撐開空間，把 Footer 頂到最下面 */}
        <main className="flex-1 w-full font-sans">
          {children}
        </main>
        
        {/* Footer 區塊 */}
        <div className="w-full shrink-0">
          <Footer />
        </div>
      </body>
    </html>
  );
}
