// components/ConditionalNavbar.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/app/(routes)/components/organisms/navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const noNavbarPaths = ["/authentication/signin", "/authentication/signup", "/auth/email_confirm", ];

  if (noNavbarPaths.includes(pathname)) {
    return null;
  }

  return <Navbar />;
}
