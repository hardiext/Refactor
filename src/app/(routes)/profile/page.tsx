"use client";
import { createClient } from "@/utils/supabase/client";
import BreadcrumbProfile from "../components/atoms/breadcrumb-link";
import Container from "../components/atoms/container";
import ProfileInformation from "../components/organisms/profile-information";
import { useEffect, useState } from "react";
import { Session } from "@supabase/auth-helpers-nextjs";

export default function ProfilePage() {
  const supabase = createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  // const userId = user?.id || "";
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
  if (!hasMounted) return null;
  return (
    <Container>
      <main className=" mx-auto lg:px-8   overflow-hidden bg-gray-50 ">
        <div className="py-4 px-4 lg:bg-transparent bg-white">
          <BreadcrumbProfile />
        </div>
        <article className="grid lg:grid-cols-5 grid-cols-1">
          <div className="lg:col-span-3">
            <ProfileInformation userId={userId} />
          </div>
          <div className="lg:col-span-2"></div>
        </article>
      </main>
    </Container>
  );
}
