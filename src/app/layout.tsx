"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import JotaiProvider from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-pink-400 text-white border-0 border-green-500 h-screen w-full  overflow-hidden`}
      >
        <JotaiProvider>
          <div className="h-full w-full  flex border-0 border-black">
            <div className="h-full w-full  border-0 border-yellow-500 bg-yellow-600 ">
              {children}
            </div>
          </div>
          <Toaster />
        </JotaiProvider>
      </body>
    </html>
  );
}
