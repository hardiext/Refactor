import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import {
  Facebook01Icon,
  GoogleIcon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const OtherSignIn = () => {
  const supabase = createClient()
  const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  if (error) {
    console.error("Login gagal:", error.message);
  }
}
  return (
    <div className="mt-2 flex flex-col gap-y-4">
      
      <div className="mt-2s flex items-center gap-4">
        <div className="h-[1px] w-full bg-gray-100" />
        <div className="w-full max-w-max flex items-center justify-center">
          <label className="text-xs"> Or continue with</label>
        </div>
        <div className="h-[1px] w-full bg-gray-100" />
      </div>
      <div className="flex items-center gap-2 mt-4">
        {/* Google Button: paling lebar */}
        <Button onClick={signInWithGoogle} className="flex-1 h-12 bg-white hover:bg-white shadow-none border flex items-center justify-center gap-2 cursor-pointer">
          <HugeiconsIcon icon={GoogleIcon} className="text-pink-600 w-5 h-5" />
          <span className="text-xs font-semibold text-neutral-800">Google</span>
        </Button>

        <div className="flex items-center gap-2">
          <Button className="px-4  h-12 bg-white shadow-none border">
            <HugeiconsIcon
              icon={NewTwitterIcon}
              className="text-pink-600 w-5 h-5"
            />
          </Button>
          <Button className="px-4 h-12 bg-white shadow-none border">
            <HugeiconsIcon
              icon={Facebook01Icon}
              className="text-pink-600 w-5 h-5"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OtherSignIn;
