"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import ProfileDropdown from "./app-profile-dropdown";
import { AppSidebar } from "./app-sidebar";
import { House, MonitorPlay, Popcorn } from "lucide-react";

export function Menubar() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { path: "/", label: "All", icon: <House /> },
    { path: "/movies", label: "Movies", icon: <Popcorn /> },
    { path: "/shows", label: "TV Series", icon: <MonitorPlay /> },
    // { path: "/documentry", label: "Documentry" },
  ];

  return (
    <div className="h-20  w-full px-10 flex items-center justify-center absolute z-50 bottom-0  hover:-translate-y-10 transition-all duration-300 cursor-pointer">
      <NavigationMenu className="h-fit w-full bg-[#EB5B00]/90 rounded-lg p-2 border-0 border-white flex justify-center items-center">
        <NavigationMenuList>
          {navItems.map((item, index) => (
            <NavigationMenuItem
              key={item.path}
              className={cn(
                `h-10 w-28  rounded-lg relative group-${index}`,
                "hover:bg-[#EB5B00]/50 active:bg-black font-bold",
                pathname === item.path && "bg-black text-[#EB5B00]",
              )}
              onClick={() => router.push(item.path)}
            >
              <style>{`
            .group-${index}:hover .icon-${index} {
              transform: translate(35px, -52px);
              height: 40px;
              width: 40px;
              border-radius: 9999px;
              background-color: #EB5B00;
              color:white;
            }
      
           .group-${index}:hover .label-${index}{
            opacity: 1;
            }

          `}</style>
              <div
                className={`icon-${index} h-full w-full absolute  z-10 grid place-content-center transition-all duration-300`}
              >
                {item.icon}
              </div>
              <div
                className={`label-${index} absolute opacity-0 h-full w-full hover:text-white  z-0 grid place-content-center rounded-lg transition-all duration-300`}
              >
                {item.label}
              </div>
            </NavigationMenuItem>
          ))}{" "}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
