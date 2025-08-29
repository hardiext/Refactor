"use client";

import useJobs2 from "@/hook/useSimilar";
import Container from "../../components/atoms/container";
import dynamic from "next/dynamic";
import { useJobDetail } from "@/hook/useJobDetail";
import { useParams } from "next/navigation";
// toh komponen spinner, sesuaikan
import { StairStepLoader } from "react-loaderkit";
import { useEffect, useState } from "react";
const SimilarJob = dynamic(
  () => import("@/app/(routes)/components/organisms/similar-job"),
);

const JobDetail = dynamic(
  () => import("@/app/(routes)/components/organisms/job-detail")
);

const JobPageDetail = () => {
  const params = useParams();
  const jobId = typeof params?.id === "string" ? params.id : undefined;
  const { job, loading: jobLoading } = useJobDetail(jobId);
  const { jobs, loading: jobsLoading, observerRef, error } = useJobs2();

  const isLoading = jobLoading || jobsLoading;

   const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isLoading) {
      timeout = setTimeout(() => {
        setShowLoader(false);
      }, 500);
    } else {
      setShowLoader(true);
    }

    return () => clearTimeout(timeout);
  }, [isLoading]);

  if (showLoader || !job) {
    return (
      <Container>
        <div className="flex justify-center items-center min-h-[60vh]">
          <StairStepLoader size={40} color="#ec4899" speed={1} />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <main className="lg:flex items-start grid grid-cols-1">
        <div className="w-full lg:max-w-md max-w-none lg:order-1 order-2 ">
          <SimilarJob jobs={jobs} />
          <div ref={observerRef} />
          {error && <p className="text-center text-red-600">{error}</p>}
        </div>
        <div className="w-full order-1 ">
          <JobDetail job={job} />
        </div>
      </main>
    </Container>
  );
};

export default JobPageDetail;
