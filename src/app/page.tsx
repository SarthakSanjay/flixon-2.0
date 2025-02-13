"use client";
import { usePathname } from "next/navigation";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

export default function Home() {
  const { open } = useSidebar()

  return (
    <div className="h-svh w-svw bg-black text-white">
      {!open && <SidebarTrigger variant={"ghost"} className="m-3 absolute" size={"icon"} />}


    </div>
  );
}
