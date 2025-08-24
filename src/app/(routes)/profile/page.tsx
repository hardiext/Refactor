"use client";
import { createClient } from "@/utils/supabase/client";
import BreadcrumbProfile from "../components/atoms/breadcrumb-link";
import Container from "../components/atoms/container";
import ProfileInformation from "../components/organisms/profile-information";
import { useEffect, useState } from "react";
import { ProfileProvider } from "@/components/profile-povider";
import NoSession from "../components/organisms/no-session-display";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const supabase = createClient();
  const router = useRouter();

  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUserId(data.session?.user?.id);
    };
    getSession();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const checkProfile = async () => {
      const { data: profile } = await supabase
        .from("profile")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (!profile) {
        router.push("/onboarding"); // redirect ke onboarding kalau belum ada profile
      }
    };

    checkProfile();
  }, [userId, router]);

  if (!hasMounted) return null;

  if (!userId) {
    return (
      <Container>
        <main className=" mx-auto lg:px-8 overflow-hidden bg-gray-50">
          <div className="py-4 px-4 lg:bg-transparent bg-white">
            <BreadcrumbProfile />
          </div>
          <article className="grid lg:grid-cols-5 grid-cols-1">
            <div className="lg:col-span-3">
              <div className="min-h-screen flex flex-col lg:gap-4 gap-2">
                <NoSession />
              </div>
            </div>
            <div className="lg:col-span-2"></div>
          </article>
        </main>
      </Container>
    );
  }

  return (
    <Container>
      <main className=" mx-auto lg:px-8 overflow-hidden bg-gray-50">
        <div className="py-4 px-4 lg:bg-transparent bg-white">
          <BreadcrumbProfile />
        </div>
        <article className="grid lg:grid-cols-5 grid-cols-1">
          <div className="lg:col-span-3">
            <ProfileProvider userId={userId}>
              <ProfileInformation isOwner={true} />
            </ProfileProvider>
          </div>
          <div className="lg:col-span-2"></div>
        </article>
      </main>
    </Container>
  );
}
