"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export const useProfileCheck = () => {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [profileExists, setProfileExists] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user || null);

      if (user) {
        const { data: profile } = await supabase
          .from("profile")
          .select("id")
          .eq("user_id", user.id)
          .maybeSingle();

        setProfileExists(!!profile);
      }

      setLoading(false);
    };

    checkProfile();
  }, [supabase]);

  return { loading, profileExists, user };
};
