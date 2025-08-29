
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const supabase = createClient();

const useGetRole = () => {
    const [role, setRole] = useState<"jobseeker" | "employer" | null>(null);
  useEffect(() => {
    const fetchRole = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { data: profile } = await supabase
        .from("profile")
        .select("active_role")
        .eq("user_id", user.user.id)
        .maybeSingle();

      if (profile) setRole(profile.active_role);
    };
    fetchRole();
  }, []);
  return { role };
};

export default useGetRole;
