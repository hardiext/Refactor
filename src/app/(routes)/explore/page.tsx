"use client";
import React, { Suspense } from "react";
import Container from "../components/atoms/container";
import ExploreNav from "../components/organisms/explore-nav";
import { useSearchParams } from "next/navigation";
import useJobs, { FilterOptions } from "@/hook/usejob";
import dynamic from "next/dynamic";
import { StairStepLoader } from "react-loaderkit";

const FilterAside = dynamic(
  () => import("../components/organisms/filter-aside"),
  { ssr: false }
);
const CardJobList = dynamic(() => import("../components/organisms/job-list"), {
  ssr: false,
});
const ExplorePage = () => {
  const searchParams = useSearchParams();
  const [filters, setFilters] = React.useState<FilterOptions>({
    searchText: "",
    location: "",
    jobType: "",
    salaryRange: "",
  });

  React.useEffect(() => {
    const searchText = searchParams.get("searchText") || "";
    const location = searchParams.get("location") || "";
    const jobType = searchParams.get("jobType") || "";
    const salaryRange = searchParams.get("salaryRange") || "";

    setFilters({
      searchText,
      location,
      jobType,
      salaryRange,
    });
  }, [searchParams]);

  const { jobs, loading, error } = useJobs(filters);

  return (
    <Container>
      <Suspense fallback={<div>Loading filter...</div>}>
        <ExploreNav onSearchChange={setFilters} />
      </Suspense>
      <main className="min-h-screen overflow-hidden">
        <div className="w-full  flex items-center ">
          <div className="max-w-3xs w-full lg:block hidden">
            <FilterAside />
          </div>
          <div className="w-full min-h-screen bg-gray-50">
            <CardJobList jobs={jobs} />
          </div>
        </div>
      </main>
    </Container>
  );
};
export default ExplorePage;
