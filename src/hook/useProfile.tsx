import { Profile } from "@/types/profile";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const useProfile = ({ userId }: { userId?: string }) => {
  const supabase = createClient();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);

    try {
      const { data: profileData, error: profileError } = await supabase
        .from("profile")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData as Profile);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchProfile();
  }, [userId]);

  return { profile, loading, error, refetch: fetchProfile };
};

export default useProfile;