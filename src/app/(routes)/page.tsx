"use client";

import { Suspense, useEffect, useState } from "react";
import Container from "./components/atoms/container";
import Footer from "./components/organisms/footes";
import { useRouter } from "next/navigation";
import { useProfileCheck } from "@/hook/useProfileChect";
import useGetRole from "@/hook/useRole";
import JobSeekerContent from "./components/jobseeker/organisms/jobseeker-content";
import Loading from "./components/atoms/loading";
import { AppSidebar } from "./components/employer/organisms/sidebar";
import MainContent from "./components/employer/organisms/main-content";

const Home = () => {
  const { role } = useGetRole();
  const router = useRouter();
  const { loading, profileExists, user } = useProfileCheck();
  const [menu, setMenu] = useState("home");
 
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
        <div className="flex items-start ">
          <AppSidebar setMenu={setMenu} activeMenu={menu}/>
          <MainContent menu={menu} />
        </div>
      ) : (
        <div>
          <JobSeekerContent />
        </div>
      )}
      <Footer />
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
