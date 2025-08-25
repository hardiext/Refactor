"use client";
import { createClient } from "@/utils/supabase/client";
import BreadcrumbProfile from "../components/atoms/breadcrumb-link";
import Container from "../components/atoms/container";
import ProfileInformation from "../components/organisms/profile-information";
import { useEffect, useState } from "react";
import { ProfileProvider } from "@/components/profile-povider";
import NoSession from "../components/organisms/no-session-display";
import { useRouter } from "next/navigation";
import { useProfileCheck } from "@/hook/useProfileChect";
import { StairStepLoader } from "react-loaderkit";
import RequireLogin from "../components/organisms/require-login";

export default function ProfilePage() {
  const supabase = createClient();
  const router = useRouter();

  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [hasMounted, setHasMounted] = useState(false);
  const { loading, profileExists } = useProfileCheck();

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
    if (!loading && !profileExists) {
      router.push("/onboarding");
    }
  }, [loading, profileExists, router]);

  if (loading)
    return (
      <div>
        <div className="flex justify-center items-center h-96">
          <StairStepLoader size={64} color="#4A90E2" />
        </div>
      </div>
    );
 

  if (!hasMounted) return null;

  if (!userId) {
    return (
      <Container>
       <RequireLogin/>
      </Container>
    );
  }

  return (
    <Container>
      <main className=" mx-auto lg:px-8 overflow-hidden bg-gray-50 pb-12">
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
