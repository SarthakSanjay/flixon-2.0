"use client";
import { userState } from "@/atoms/atom";
import Content from "@/components/app-content";
import { usePathname } from "next/navigation";
import { useRecoilState } from "recoil";

export default function page() {
  const pathname = usePathname();
  // const [user, setUser] = useRecoilState(userState);
  // console.log("user from state ", user);
  return <Content pathname={pathname} />;
}
