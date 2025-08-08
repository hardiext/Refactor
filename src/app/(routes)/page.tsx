"use client";

import useJobs, { FilterOptions } from "@/hook/usejob";
import { useState } from "react";
import Container from "./components/atoms/container";

import dynamic from "next/dynamic";
import Footer from "./components/organisms/footes";

const HeroSection = dynamic(() => import("./components/organisms/hero"), {
  ssr: false,
});
const CardJobList = dynamic(() => import("./components/organisms/job-list"), {
  ssr: false,
});

const InformationData = dynamic(()=> import("./components/organisms/inforamtion-data"),{ssr: false})

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
          <InformationData/>
        </div>
      </main>
      <Footer/>
    </Container>
  );
}
