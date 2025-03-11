"use client";
import { AppSidebar } from "./app-sidebar";
import Logo from "./app-logo";
import ProfileDropdown from "./profile/app-profile-dropdown";

export function Navbar() {
  return (
    <div className="h-14 bg-gradient-to-b from-black to-black/0 w-full px-10 flex items-center justify-between absolute z-20 ">
      <AppSidebar isAdminDashboard={false} />
      <Logo />
      <ProfileDropdown />
    </div>
  );
}
