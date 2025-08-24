"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Education } from "@/types/education";
import { Experience } from "@/types/experience";
import { Project } from "@/types/project";
import { Skill } from "@/types/skill";

const useGetProfile = ({ userId }: { userId?: string }) => {
  const supabase = createClient();
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const [loading, setLoading] = useState(true); // start true
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);

    try {
      // Ambil profile
      const { data: profileData, error: profileError } = await supabase
        .from("profile")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();
        console.log("profileData:", profileData, "profileError:", profileError);

        console.log("userId passed to hook:", userId);


      if (profileError) throw profileError;

      // if (!profileData) {
      //   // redirect ke onboarding kalau belum ada profile
      //   router.push("/onboarding");
      //   return;
      // }

      setProfile(profileData);

      // --- Experiences
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

      // --- Educations
      const { data: eduData, error: eduError } = await supabase
        .from("education")
        .select("*")
        .eq("profile_id", profileData.id)
        .order("start_date", { ascending: false });

      if (eduError) throw eduError;
      setEducations(
        (eduData || []).map((e: any) => ({
          ...e,
          institution_url: e.institution_url,
        }))
      );

      // --- Projects
      const { data: proData, error: proError } = await supabase
        .from("project")
        .select("*")
        .eq("profile_id", profileData.id);

      if (proError) throw proError;
      setProjects(
        (proData || []).map((e: any) => ({
          ...e,
          file_url: e.file_url,
        }))
      );

      // --- Skills
      const { data: skillData, error: skillError } = await supabase
        .from("skill")
        .select("*")
        .eq("profile_id", profileData.id);

      if (skillError) throw skillError;
      setSkills(skillData || []);
    } catch (err) {
      console.error("useGetProfile error:", err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [userId, supabase, router]);

  useEffect(() => {
    if (userId) fetchProfile();
  }, [userId, fetchProfile]);

  return {
    profile,
    experiences,
    educations,
    projects,
    skills,
    loading,
    error,
    refetch: fetchProfile,
  };
};

export default useGetProfile;
