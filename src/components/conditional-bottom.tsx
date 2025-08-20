"use client"
import BottomNav from "@/app/(routes)/components/molecules/bottom-nav";
import { usePathname } from "next/navigation";

export default function ConditionalBottomNav() {
  const pathname = usePathname();
  const noNavbarPaths = ["/profile" ];

  if (noNavbarPaths.includes(pathname)) {
    return null;
  }

  return <BottomNav />;
}