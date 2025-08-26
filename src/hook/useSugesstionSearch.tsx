"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export interface Suggestion {
  type: "job" | "profile";
  id: string | number; // ini bakal simpan user_id untuk profile
  label: string;
}

const useSearchSuggestions = (searchText: string) => {
  const supabase = createClient();
  const [results, setResults] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchText) {
      setResults([]);
      return;
    }

    const fetch = async () => {
      setLoading(true);

      // Jobs
      const { data: jobs } = await supabase
        .from("jobs")
        .select("id, job_title")
        .ilike("job_title", `%${searchText}%`)
        .limit(5);

      // Profiles (ambil user_id, bukan id)
      const { data: profiles } = await supabase
        .from("profile")
        .select("user_id, full_name")
        .ilike("full_name", `%${searchText}%`)
        .limit(5);

      const formatted: Suggestion[] = [
        ...(jobs || []).map((j) => ({
          type: "job" as const,
          id: j.id,
          label: j.job_title,
        })),
        ...(profiles || []).map((p) => ({
          type: "profile" as const,
          id: p.user_id, // ✅ gunakan user_id
          label: p.full_name,
        })),
      ];

      setResults(formatted);
      setLoading(false);
    };

    fetch();
  }, [searchText]);

  return { results, loading };
};

export default useSearchSuggestions;
