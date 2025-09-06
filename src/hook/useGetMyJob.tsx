import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";

type JobDetails = {
  id?: string;
  job_id?: string;
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  skills?: string[];
  benefit?: string[];
  created_at?: string;
};

type JobProps = {
  id: string;
  company_name: string;
  company_image: string;
  job_title: string;
  tags: string[];
  work_type: string;
  work_mode: string;
  experience_min: number | null;
  experience_max: number | null;
  salary_amount: number | null;
  city: string;
  country: string;
  total_application: number;
  posted_at: string;
  job_details?: JobDetails[];
};

const useGetMyJob = ({ userId }: { userId?: string }) => {
  const supabase = createClient();
  const [myJobs, setMyJobs] = useState<JobProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMyJob = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);

    try {
      const { data, error: jobsError } = await supabase
        .from("jobs")
        .select("*, job_details(*)") // join relasi
        .eq("user_id", userId);

      if (jobsError) throw jobsError;

      setMyJobs(data || []);
    } catch (err) {
      console.error("error fetching job data", err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [userId, supabase]);

  useEffect(() => {
    if (userId) fetchMyJob();
  }, [userId, fetchMyJob]);

  return {
    myJobs,
    loading,
    error,
  };
};

export default useGetMyJob;
