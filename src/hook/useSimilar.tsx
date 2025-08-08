import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@/utils/supabase/client";

type JobListItem = {
  id: number;
  job_title: string;
  company_name: string;
  company_image: string;
  city: string;
  country: string;
  work_mode: string;
  work_type: string;
  experience_min: number;
  experience_max: number;
};

const LIMIT = 10;
const CACHE_VERSION = "v1";

const useJobs2 = () => {
  const supabase = createClient();

  const [jobs, setJobs] = useState<JobListItem[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const loadingPages = useRef<Set<number>>(new Set());

  const getCacheKey = (page: number) => `jobs-${CACHE_VERSION}-${page}`;

  const fetchJobs = useCallback(
    async (page: number) => {
      if (loadingPages.current.has(page)) return;

      loadingPages.current.add(page);
      setLoading(true);
      setError(null);

      const cacheKey = getCacheKey(page);
      const cached = sessionStorage.getItem(cacheKey);

      if (cached) {
        const parsed = JSON.parse(cached) as JobListItem[];
        setJobs((prev) => (page === 0 ? parsed : [...prev, ...parsed]));
        setLoading(false);
        loadingPages.current.delete(page);
        return;
      }

      const from = page * LIMIT;
      const to = from + LIMIT - 1;

      const { data, error } = await supabase
        .from("jobs")
        .select(
          "id,job_title, company_name,company_image,city,country, work_mode,work_type , experience_min, experience_max"
        )
        .order("id", { ascending: false })
        .range(from, to);

      if (error) {
        setError(error.message);
        console.error(error);
        setLoading(false);
        loadingPages.current.delete(page);
        return;
      }

      if (!data || data.length < LIMIT) {
        setHasMore(false);
      }

      sessionStorage.setItem(cacheKey, JSON.stringify(data));
      setJobs((prev) => (page === 0 ? data : [...prev, ...data]));
      setLoading(false);
      loadingPages.current.delete(page);
    },
    [supabase]
  );

  // **Tidak lagi clear sessionStorage otomatis**
  useEffect(() => {
    setJobs([]);
    setPage(0);
    setHasMore(true);
  }, []);

  useEffect(() => {
    fetchJobs(page);
  }, [page, fetchJobs]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasMore, loading]);

  return { jobs, loading, error, observerRef };
};

export default useJobs2;
