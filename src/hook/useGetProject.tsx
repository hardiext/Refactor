import { Experience } from "@/types/experience";
import { Project } from "@/types/project";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
const useGetProject = ({ userId }: { userId?: string }) => {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
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

      const { data: proData, error: proError } = await supabase
        .from("project")
        .select("*")
        .eq("profile_id", profileData.id)
       

      if (proError) throw proError;

      setProjects(
        (proData || []).map((e: any) => ({
          ...e,
          file_url: e.file_url,
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

  return { profile, projects, loading, error, refetch: fetchProfile };
};
export default useGetProject;
