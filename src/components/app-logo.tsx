"use client";
import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();
  return (
    <div
      className="h-14 w-24  grid place-content-center cursor-pointer"
      onClick={() => router.push("/")}
    >
      <img src="/logo/applogo.png" className="w-full" />
    </div>
  );
}
