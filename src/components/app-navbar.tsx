"use client";
import ProfileDropdown from "./app-profile-dropdown";
import { AppSidebar } from "./app-sidebar";
import Logo from "./app-logo";

export function Navbar() {
  return (
    <div className="h-14 bg-gradient-to-b from-black to-black/0 w-full px-10 flex items-center justify-between absolute z-20 ">
      <AppSidebar isAdminDashboard={false} />
      <Logo />
      <ProfileDropdown />
    </div>
  );
}
