"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OnboardingPage() {
  const supabase = createClient();
  const router = useRouter();

  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error(error);
        router.push("/login");
        return;
      }

      if (!session?.user) {
        router.push("/login");
        return;
      }

      setUserId(session.user.id);
      const { data: profile } = await supabase
        .from("profile")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

      if (profile) {
        router.push("/profile");
      } else {
        setLoading(false);
      }
    };

    getUser();
  }, [supabase, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    // Upsert: insert baru atau update jika user_id sudah ada
    const { error } = await supabase.from("profile").upsert([
      {
        full_name: "anonymous",
        description,
        user_id: userId, // otomatis relasi ke tabel user
      },
    ]);

    if (error) {
      console.error("Error creating profile:", error);
    } else {
      router.push("/profile");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Welcome 👋 Create your profile
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="desc">Short Description</Label>
            <Input
              id="desc"
              placeholder="Tell us about yourself..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Save & Continue
          </Button>
        </form>
      </div>
    </div>
  );
}
