import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { JobDetailType } from "@/types/job";

const CACHE_TTL = 1000 * 60 * 5; // 5 menit
const CACHE_KEY_PREFIX = "jobs";

const useDebounce = <T,>(value: T, delay = 300): T => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
};

export interface FilterOptions {
  searchText: string;
  location: string;
  jobType: string;
  salaryRange: string;
}

const useJobs = (filters: FilterOptions) => {
  const supabase = useMemo(() => createClient(), []);
  const [jobs, setJobs] = useState<JobDetailType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const limit = 10;
  const loadingPages = useRef<Set<number>>(new Set());

  const debouncedFilters = useDebounce(filters, 300);

  const normalizedFilters = useMemo(
    () => ({
      searchText: debouncedFilters.searchText.trim().toLowerCase(),
      location: debouncedFilters.location.trim().toLowerCase(),
      jobType: debouncedFilters.jobType,
      salaryRange: debouncedFilters.salaryRange,
    }),
    [debouncedFilters]
  );

  const getCacheKey = useCallback(
    (page: number) => `${CACHE_KEY_PREFIX}-${page}-${JSON.stringify(normalizedFilters)}`,
    [normalizedFilters]
  );

  // Load cached page 0 from localStorage on client side instantly
  useEffect(() => {
    if (typeof window === "undefined") return; // only run on client
    const cacheKey = getCacheKey(0);
    const raw = localStorage.getItem(cacheKey);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          setJobs(parsed.data);
          setHasMore(parsed.data.length === limit);
          setPage(0);
        } else {
          localStorage.removeItem(cacheKey);
        }
      } catch {
        localStorage.removeItem(cacheKey);
      }
    } else {
      setJobs([]);
      setPage(0);
      setHasMore(true);
    }
  }, [getCacheKey]);

  const fetchJobs = useCallback(
    async (page: number) => {
      if (loadingPages.current.has(page)) return;
      loadingPages.current.add(page);
      setLoading(true);
      setError(null);

      const cacheKey = getCacheKey(page);

      // Try localStorage cache first
      if (typeof window !== "undefined") {
        const raw = localStorage.getItem(cacheKey);
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            if (Date.now() - parsed.timestamp < CACHE_TTL) {
              setJobs((prev) =>
                page === 0 ? parsed.data : [...prev, ...parsed.data]
              );
              setLoading(false);
              loadingPages.current.delete(page);
              return;
            } else {
              localStorage.removeItem(cacheKey);
            }
          } catch {
            localStorage.removeItem(cacheKey);
          }
        }
      }

      let query = supabase.from("jobs").select("*, job_details(*)");

      const { searchText, location, jobType, salaryRange } = normalizedFilters;
      if (searchText) query = query.ilike("job_title", `%${searchText}%`);
      if (location)
        query = query.or(
          `city.ilike.%${location}%,country.ilike.%${location}%`
        );
      if (jobType) {
        query = query.eq("work_type", jobType);
      }
      if (salaryRange) {
        const [min, max] = salaryRange.split("-").map(Number);
        if (!isNaN(min)) query = query.gte("salary_min", min);
        if (!isNaN(max)) query = query.lte("salary_max", max);
      }

      const from = page * limit;
      const to = from + limit - 1;

      const { data, error } = await query
        .order("id", { ascending: false })
        .range(from, to);

      if (error) {
        setError(error.message);
        setLoading(false);
        loadingPages.current.delete(page);
        return;
      }

      if (!data) {
        setHasMore(false);
        setLoading(false);
        loadingPages.current.delete(page);
        return;
      }

      if (data.length < limit) setHasMore(false);

      if (typeof window !== "undefined") {
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data, timestamp: Date.now() })
        );
      }

      setJobs((prev) => (page === 0 ? data : [...prev, ...data]));
      setLoading(false);
      loadingPages.current.delete(page);

      // Prefetch next page
      if (data.length === limit) {
        fetchJobs(page + 1).catch(() => {
          /* ignore errors on prefetch */
        });
      }
    },
    [normalizedFilters, supabase, getCacheKey]
  );

  // Reset when filters change
  useEffect(() => {
    setJobs([]);
    setPage(0);
    setHasMore(true);
  }, [normalizedFilters]);

  // Fetch current page
  useEffect(() => {
    fetchJobs(page);
  }, [page, fetchJobs]);

  // Infinite scroll intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setTimeout(() => setPage((prev) => prev + 1), 200);
        }
      },
      { rootMargin: "150px" }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasMore, loading]);

  return { jobs, loading, error, observerRef };
};

export default useJobs;
