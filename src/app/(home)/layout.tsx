"use client";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { open } = useSidebar()

  return (
    <div className="h-full w-full flex flex-col bg-black text-white">
      {!open && (
        <SidebarTrigger
          variant={"ghost"}
          className="m-3 absolute"
          size={"icon"}
        />
      )}
      <main>
        {children}
      </main>
    </div>
  )
}
