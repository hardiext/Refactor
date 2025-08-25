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
import { createClient } from "@/utils/supabase/client";

const profileMenu = [
  { type: "label", label: "My Account" },
  {
    type: "group",
    items: [
      { label: "Profile", shortcut: "⇧⌘P", href: "/profile" },
      { label: "My Applications", href: "/applications" },
      { label: "Saved Jobs", href: "/saved" },
      { label: "Settings", shortcut: "⌘S", href: "/settings" },
    ],
  },
  { type: "separator" },
  {
    type: "group",
    items: [{ label: "Help Center", href: "/help" }],
  },
  { type: "separator" },
  { type: "item", label: "Log out", shortcut: "⇧⌘Q" },
];

interface DropdownProp {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
}

const DropdownMenuProfile: React.FC<DropdownProp> = ({
  session,
  setSession,
}) => {
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    // bisa push ke halaman login juga kalau perlu
  };

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
            // cek kalau itemnya Log out
            if (menu.label === "Log out") {
              return (
                <DropdownMenuItem key={i} onClick={handleLogout}>
                  {menu.label}
                  {menu.shortcut && (
                    <DropdownMenuShortcut>{menu.shortcut}</DropdownMenuShortcut>
                  )}
                </DropdownMenuItem>
              );
            }
            return (
              <DropdownMenuItem key={i}>
                {"href" in menu ? (
                  <Link href={menu.href || "#"}>{menu.label}</Link>
                ) : (
                  <span>{menu.label}</span>
                )}
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
                      <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
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
