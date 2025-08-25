"use client";
import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export const useAuthRedirect = () => {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const checkInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/authentication/signin");
        return;
      }

      const { data: profile } = await supabase
        .from("profile")
        .select("id")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (!profile) router.push("/onboarding");
      // jangan push ke "/" karena kita sedang di home
    };

    checkInitialSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          const { data: profile } = await supabase
            .from("profile")
            .select("id")
            .eq("user_id", session.user.id)
            .maybeSingle();

          if (!profile) router.push("/onboarding");
        }

        if (event === "SIGNED_OUT") {
          router.push("/authentication/signin");
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase, router]);
};
