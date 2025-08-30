"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,   
  MessageCircle,
  Package,     
  User,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Explore", href: "/explore", icon: Compass },
  { label: "Messages", href: "/message", icon: MessageCircle },
  { label: "Tracking", href: "/tracking", icon: Package },
  { label: "Profile", href: "/profile", icon: User },
];
  
export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md lg:hidden z-20">
      <ul className="flex justify-around max-w-lg mx-auto py-2">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className="flex flex-col items-center justify-center gap-1"
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  size={24}
                  className={`${
                    isActive ? "text-pink-500" : "text-gray-500"
                  } stroke-2`}
                />
                <span
                  className={`text-xs font-medium ${
                    isActive ? "text-pink-500" : "text-gray-500"
                  }`}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
