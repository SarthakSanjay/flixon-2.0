"use client";

import Content from "@/components/app-content";
import { usePathname } from "next/navigation";

export default function page() {
  const pathname = usePathname();
  return <Content pathname={pathname} />;
}
