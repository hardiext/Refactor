"use client";

import { Suspense, useEffect, useState } from "react";
import Container from "./components/atoms/container";
import Footer from "./components/organisms/footes";
import { useRouter } from "next/navigation";
import { useProfileCheck } from "@/hook/useProfileChect";
import useGetRole from "@/hook/useRole";
import JobSeekerContent from "./components/jobseeker/organisms/jobseeker-content";
import Loading from "./components/atoms/loading";
import { AppSidebar } from "../(dashboard)/components/employer/organisms/sidebar";
import MainContent from "../(dashboard)/components/employer/organisms/main-content";
import { Dashboard } from "../(dashboard)/components/employer/organisms/dashboard";

const Home = () => {
  const { role } = useGetRole();
  const router = useRouter();
  const { loading, profileExists, user } = useProfileCheck();
  const [menu, setMenu] = useState("/");
    const [userId, setUserId] = useState<string | undefined>(undefined);
 
  useEffect(() => {
    if (!loading && user && !profileExists && role) {
      router.replace("/onboarding");
    }
  }, [loading, profileExists, user, role, router]);


  if (loading) {
    return <Loading />;
  }
  return (
    <Container>
      {role === "employer" ? (
        <div className=" min-h-screen ">
          <Dashboard userId={userId}/>
        </div>
      ) : (
        <div>
          <JobSeekerContent />
        </div>
      )}
    </Container>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Home />
    </Suspense>
  );
}
