import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/client";
import { LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";

const DropdownAccount = ({ setMenu }: { setMenu: any }) => {
  const router = useRouter();

  const supabase = createClient();

  async function handleSwitchAccount() {
    await supabase.auth.signOut();
    router.replace("/login");
  }
  return (
    <div className="p-4 border-t border-gray-400">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center space-x-2 cursor-pointer">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium dark:text-pink-600">John Doe</p>
              <p className="text-xs text-gray-600">john@example.com</p>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setMenu("Profile")}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setMenu("Settings")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-600 focus:text-red-800"
            onClick={handleSwitchAccount}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Switch Account</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default DropdownAccount;
