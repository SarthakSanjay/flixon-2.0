"use client";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full w-full flex flex-col bg-black text-white">
      <main>{children}</main>
    </div>
  );
}
