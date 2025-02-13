import { Check, Home, UserRound, History, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: UserRound,
  },
  {
    title: "Watchlist",
    url: "/watchlist",
    icon: Check,
  },
  {
    title: "History",
    url: "/history",
    icon: History,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-black text-white">
        <SidebarTrigger variant={"ghost"} className="m-3 absolute" size={"icon"} />
        <div className="h-[10%] border border-white w-full flex justify-center items-center">
          <h1 className="text-xl">FLIXON</h1>
        </div>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton asChild className="h-10 hover:bg-white/10 hover:text-white text-lg">
                    <a href={item.url}>
                      <span className="text-lg">
                        <item.icon />
                      </span>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

