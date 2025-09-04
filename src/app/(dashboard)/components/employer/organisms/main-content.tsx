import { useEffect, useState } from "react";
import { Dashboard } from "./dashboard";
import { createClient } from "@/utils/supabase/client";
import { Session } from "@supabase/auth-helpers-nextjs";
import useGetProfile from "@/hook/useGetProfile";

export default function MainContent({ menu }: { menu: any }) {
  const supabase = createClient();
  const [hasMounted, setHasMounted] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  

  useEffect(() => {
    setHasMounted(true);
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUserId(data.session?.user?.id);
    };
    getSession();
  }, []);

  useEffect(() => {
    setHasMounted(true);
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setSession(data.session);
      }
    };
    getSession();
  }, []);

  if (!hasMounted) return null;
  return (
    <div className="flex-1   min-h-screen w-full rounded-tl-xl   ">
      {menu === "home" && <Dashboard userId={userId} />}
    </div>
  );
}
