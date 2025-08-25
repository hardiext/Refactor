"use client";

import useJobs, { FilterOptions } from "@/hook/usejob";
import { useEffect, useState } from "react";
import Container from "./components/atoms/container";

import dynamic from "next/dynamic";
import Footer from "./components/organisms/footes";
import { useRouter } from "next/navigation";
import { useProfileCheck } from "@/hook/useProfileChect";
import { StairStepLoader } from "react-loaderkit";

const HeroSection = dynamic(() => import("./components/organisms/hero"), {
  ssr: false,
});
const CardJobList = dynamic(() => import("./components/organisms/job-list"), {
  ssr: false,
});

const InformationData = dynamic(
  () => import("./components/organisms/inforamtion-data"),
  { ssr: false }
);

const PopularJobCategories = dynamic(
  () => import("./components/organisms/popular-categories")
);

const KerjaBlog = dynamic(() => import("./components/organisms/blog"));

export default function Home() {
  const [filters, setFilters] = useState<FilterOptions>({
    searchText: "",
    location: "",
    jobType: "",
    salaryRange: "",
  });

  const handleSearchChange = (newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };
  const { jobs } = useJobs(filters);
  const router = useRouter();
  const { loading, profileExists, user } = useProfileCheck();
useEffect(() => {
  if (!loading && user && !profileExists) {
    const timer = setTimeout(() => {
      router.push("/onboarding");
    }, 200); 

    return () => clearTimeout(timer);
  }
}, [loading, profileExists, user, router]);
  if (loading)
    return (
      <div>
        <div className="flex justify-center items-center h-96">
          <StairStepLoader size={64} color="#4A90E2" />
        </div>
      </div>
    );
  
  return (
    <Container>
      <main className="w-full overflow-hidden">
        <div>
          <HeroSection onSearchChange={handleSearchChange} />
        </div>
        <div className="lg:py-8 py-4 lg:px-8 px-4">
          <h1 className="text-2xl font-semibold mb-6 ">
            <span className="bg-gradient-to-br from-pink-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
              Explore 1000+ Job Opportunities Worldwide
            </span>
          </h1>
          <CardJobList jobs={jobs} />
        </div>
        <div>
          <PopularJobCategories />
        </div>
        <div>
          <KerjaBlog />
        </div>
        <div>
          <InformationData />
        </div>
      </main>
      <Footer />
    </Container>
  );
}
