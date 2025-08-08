import { useEffect, useState, useDeferredValue } from "react";
import { createClient } from "@/utils/supabase/client";
import { JobDetailType } from "@/types/job";

const TTL = 1000 * 60 * 5; // Cache valid 5 menit
const globalPending: Record<string, Promise<JobDetailType>> = {};

// Fungsi untuk memilih field yang diperlukan dari data Supabase
function pickFields(data: any): JobDetailType {
  return {
    id: data.id,
    job_title: data.job_title,
    company_name: data.company_name,
    company_image: data.company_image,
    city: data.city,
    country: data.country ?? "",
    salary_amount: data.salary_amount,
    work_type: data.work_type,
    work_mode: data.work_mode,
    experience_min: data.experience_min,
    experience_max: data.experience_max,
    posted_at: data.posted_at,
    job_details: (data.job_details ?? []).map((detail: any) => ({
      id: detail.id,
      description: detail.description,
      responsibilities: detail.responsibilities ?? [],
      requirements: detail.requirements ?? [],
      skills: detail.skills ?? [],
      benefit: detail.benefit ?? [],
    })),
  };
}

export function useJobDetail(rawJobId?: string | string[]) {
  const [job, setJob] = useState<JobDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Menggunakan useDeferredValue untuk smoothing update UI ketika job berubah
  const deferredJob = useDeferredValue(job);

  // Pastikan jobId adalah string tunggal
  const jobId = Array.isArray(rawJobId) ? rawJobId[0] : rawJobId;

  useEffect(() => {
    if (!jobId) {
      console.warn("⚠️ Job ID tidak tersedia.");
      setLoading(false);
      return;
    }

    const cacheKey = `job-${jobId}`;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchJob = async (isSilent = false) => {
      if (!isSilent) setLoading(true);
      setError(null);

      // Cek cache dulu
      const cachedRaw = sessionStorage.getItem(cacheKey);
      if (cachedRaw) {
        try {
          const cached = JSON.parse(cachedRaw);
          if (
            cached.timestamp &&
            Date.now() - cached.timestamp < TTL &&
            cached.data
          ) {
            if (process.env.NODE_ENV === "development") {
              console.log(`✔️ Menggunakan cache: ${cacheKey}`);
            }
            setJob(cached.data);
            if (!isSilent) setLoading(false);

            // Background revalidation setelah 200ms tanpa men-set loading state
            if (!isSilent) {
              setTimeout(() => {
                fetchJob(true);
              }, 200);
            }
            return;
          } else {
            if (process.env.NODE_ENV === "development") {
              console.log(`⚠️ Cache expired: ${cacheKey}`);
            }
            sessionStorage.removeItem(cacheKey);
          }
        } catch (e) {
          console.warn("🧨 Gagal parsing cache:", e);
          sessionStorage.removeItem(cacheKey);
        }
      }

      // Deduplicate request supaya gak fetch berulang
      if (!globalPending[jobId]) {
        globalPending[jobId] = (async () => {
          try {
            const supabase = createClient();
            const { data, error } = await supabase
              .from("jobs")
              .select(
                `
                  id,
                  job_title,
                  company_name,
                  company_image,
                  city,
                  country,
                  salary_amount,
                  work_type,
                  work_mode,
                  experience_min,
                  experience_max,
                  posted_at,
                  job_details (
                    id,
                    description,
                    responsibilities,
                    requirements,
                    skills,
                    benefit
                  )
                `
              )
              .eq("id", jobId)
              .single();

            if (error) throw error;

            if (!data) throw new Error("Job tidak ditemukan");

            return pickFields(data);
          } catch (err) {
            throw err;
          }
        })();
      }

      try {
        const freshData = await globalPending[jobId];

        // Save ke cache
        sessionStorage.setItem(
          cacheKey,
          JSON.stringify({
            timestamp: Date.now(),
            data: freshData,
          })
        );

        setJob(freshData);
        if (!isSilent) setLoading(false);
      } catch (err: any) {
        if (!signal.aborted) {
          setError(err);
          setLoading(false);
        }
      } finally {
        if (!isSilent) delete globalPending[jobId];
      }
    };

    fetchJob();

    return () => {
      controller.abort();
    };
  }, [jobId]);

  return { job: deferredJob, loading, error };
}
