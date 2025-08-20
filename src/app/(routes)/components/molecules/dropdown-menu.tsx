import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Session } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import React from "react";

const profileMenu = [
  { type: "label", label: "My Account" },
  {
    type: "group",
    items: [
      { label: "Profile", shortcut: "⇧⌘P", href: "/profile" }, // halaman edit profile & CV
      { label: "My Applications", href: "/applications" }, // daftar lamaran
      { label: "Saved Jobs", href: "/saved" }, // lowongan yang disimpan
      { label: "Settings", shortcut: "⌘S", href: "/settings" }, // notifikasi, password, preferensi
    ],
  },
  { type: "separator" },
  {
    type: "group",
    items: [{ label: "Help Center", href: "/help" }], // bantuan / FAQ
  },
  { type: "separator" },
  { type: "item", label: "Log out", shortcut: "⇧⌘Q", href: "/logout" },
];
interface DropdownProp {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>; // tipe data setSession
}

const DropdownMenuProfile: React.FC<DropdownProp> = ({
  session,
  setSession,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        
        <Avatar>
          <AvatarImage
            src={
              session?.user?.user_metadata?.avatar_url ||
              "https://github.com/shadcn.png"
            }
          />
          <AvatarFallback>
            {session?.user.email?.[0]?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        {profileMenu.map((menu, i) => {
          if (menu.type === "label") {
            return <DropdownMenuLabel key={i}>{menu.label}</DropdownMenuLabel>;
          }
          if (menu.type === "separator") {
            return <DropdownMenuSeparator key={i} />;
          }
          if (menu.type === "item") {
            return (
              <DropdownMenuItem key={i}>
                <Link href={menu.href || "#"}>{menu.label}</Link>
                {menu.shortcut && (
                  <DropdownMenuShortcut>{menu.shortcut}</DropdownMenuShortcut>
                )}
              </DropdownMenuItem>
            );
          }
          if (menu.type === "group") {
            return (
              <DropdownMenuGroup key={i}>
                {menu.items?.map((item, j) => (
                  <DropdownMenuItem key={j}>
                    <Link href={item.href || "#"}>{item.label}</Link>
                    {item.shortcut && (
                      <DropdownMenuShortcut>
                        {item.shortcut}
                      </DropdownMenuShortcut>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            );
          }
          return null;
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default DropdownMenuProfile;
