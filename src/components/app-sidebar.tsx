import {
  Check,
  Home,
  UserRound,
  History,
  Settings,
  LayoutDashboard,
  PanelLeft,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"; // Menu items.
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
const items = [
  {
    title: "Home",
    url: "/",
    icon: <Home />,
  },
  {
    title: "Profile",
    url: "/profile/details",
    icon: <UserRound />,
  },
  {
    title: "Favorites",
    url: "/favorites",
    icon: <Star />,
  },
  {
    title: "Watchlist",
    url: "/watchlist",
    icon: <Check />,
  },
  {
    title: "History",
    url: "/history",
    icon: <History />,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: <Settings />,
  },
];

const adminItem = [
  {
    title: "Home",
    url: "/admin/home",
    icon: <Home />,
  },
  {
    title: "Profile",
    url: "/admin/profile",
    icon: <UserRound />,
  },
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: <Settings />,
  },
];

export function AppSidebar({
  isAdminDashboard,
}: {
  isAdminDashboard: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="h-10 w-10 bg-black/50 text-white border-0 hover:bg-red-600/70 transition-all duration-300 hover:text-white relative z-50"
        >
          <PanelLeft />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="p-0 w-[20%] bg-transparent border-none"
      >
        <div className="h-full w-full bg-gradient-to-r from-black via-black to-black/0 flex flex-col justify-center items-center">
          <SheetHeader>
            <SheetTitle className="sr-only">Sidebar navigation</SheetTitle>
          </SheetHeader>
          {items.map((item, index) => {
            return (
              <div
                key={index}
                className={cn(
                  "h-12 w-28 flex gap-4 cursor-pointer",
                  pathname === item.url && "text-[#EB5B00]",
                )}
                onClick={() => {
                  router.push(item.url);
                }}
              >
                <div>{item.icon}</div>
                <div>{item.title}</div>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
