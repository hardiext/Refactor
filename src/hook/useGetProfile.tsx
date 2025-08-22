import { Experience } from "@/types/experience";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
const useGetProfile = ({ userId }: { userId?: string }) => {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
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

      setProfile(profileData);

      const { data: expData, error: expError } = await supabase
        .from("work_experience")
        .select("*")
        .eq("profile_id", profileData.id)
        .order("start_date", { ascending: false });

      if (expError) throw expError;

      setExperiences(
        (expData || []).map((e: any) => ({
          ...e,
          logoUrl: e.logo_url,
        }))
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchProfile();
  }, [userId]);

  // 🔑 return state & function supaya bisa dipakai di komponen
  return { profile, experiences, loading, error, refetch: fetchProfile };
};
export default useGetProfile;
