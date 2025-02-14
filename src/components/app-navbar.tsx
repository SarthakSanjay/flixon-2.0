"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import ProfileDropdown from "./app-profile-dropdown";

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { path: '/movies', label: 'Movies' },
    { path: '/shows', label: 'TV Series' },
    { path: '/documentry', label: 'Documentry' }
  ]

  return (
    <div className="h-max w-full grid place-content-center relative">
      <NavigationMenu className="h-fit w-full p-2 border-0 border-white flex justify-center items-center">
        <NavigationMenuList>
          {navItems.map((item) => (
            <NavigationMenuItem
              key={item.path}
              className={cn(
                "h-10 px-5 rounded-lg grid place-content-center transition-colors",
                "hover:bg-teal-500/50 active:bg-teal-500",
                pathname === item.path && "bg-teal-500"
              )}
              onClick={() => router.push(item.path)}
            >
              {item.label}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <ProfileDropdown />
    </div>

  )
}
