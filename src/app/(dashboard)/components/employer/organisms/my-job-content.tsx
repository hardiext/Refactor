import MyJob from "@/app/(dashboard)/myjob/page";
import CardJobList from "@/app/(routes)/components/organisms/job-list";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import JobListingCard from "../molecules/job-listing-card";
import { useEffect, useState } from "react";
import useGetMyJob from "@/hook/useGetMyJob";
import { useRouter } from "next/navigation";

const MyJobContent = ({ userId }: { userId: string }) => {
  const { loading, myJobs } = useGetMyJob({ userId });
  const router = useRouter()
    useEffect(() => {
      if (!loading && !myJobs && !userId ) {
        router.replace("/authentication/signin");
      }
    }, [loading, myJobs, router, userId]);

  return (
    <article className="grid lg:grid-cols-3 gap-4 ">
      <div className="lg:col-span-2">
        <JobListingCard userId={userId} />
      </div>
      <div className="lg:min-h-screen lg:col-span-1 bg-gray-600"></div>
    </article>
  );
};

export default MyJobContent;
