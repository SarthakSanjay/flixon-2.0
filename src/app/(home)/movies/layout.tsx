"use client";

import { Navbar } from "@/components/app-navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-screen text-white bg-black ">
      <Navbar />
      {children}
    </div>
  );
}
