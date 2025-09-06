"use client";

import Loading from "@/app/(routes)/components/atoms/loading";
import useGetMyJob from "@/hook/useGetMyJob";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

const MyJobCard = ({ userId }: { userId: string }) => {
  const { myJobs, loading, error } = useGetMyJob({ userId });

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {myJobs.length === 0 ? (
        <p className="text-gray-500">No jobs found</p>
      ) : (
        myJobs.map((job) => {
          const postedDate = job.posted_at
            ? formatDistanceToNow(new Date(job.posted_at), { addSuffix: true })
            : "Unknown date";

          return (
            <Card
              key={job.id}
              className="
                p-6 rounded-lg border shadow-none border-gray-100 
                hover:bg-white transition-colors duration-200
                relative overflow-hidden gap-2
              "
            >
              {/* Accent line */}
              <div className="absolute top-0 left-0 w-1 h-full bg-pink-200"></div>

              <CardHeader className="flex items-center gap-3 px-0">
                {job.company_image && (
                  <img
                    src={job.company_image}
                    alt={job.company_name}
                    className="h-10 w-10 rounded-md object-cover"
                  />
                )}
                <div>
                  <CardTitle className="text-sm font-semibold text-gray-800">
                    {job.job_title}
                  </CardTitle>
                  <p className="text-xs text-gray-500">{job.company_name}</p>
                </div>
              </CardHeader>

              <CardContent className="mt-2 text-[10px] text-gray-600 px-0">
                <div className="flex flex-wrap items-center gap-2 text-gray-500">
                  <span className="flex items-center gap-1">
                    📍 {job.city}, {job.country}
                  </span>

                  <span className="text-gray-300">|</span>

                  <span className="flex items-center gap-1">
                    💼 {job.work_type}
                  </span>

                  <span className="text-gray-300">|</span>

                  <span className="flex items-center gap-1">👀 160 views</span>

                  <span className="text-gray-300">|</span>
                  <span className="flex items-center gap-1">
                    👥 {job.total_application} applicants
                  </span>
                  <span className="text-gray-300">|</span>
                </div>
              </CardContent>
              <CardFooter className="P-0 py-4 text-xs flex items-center justify-end">
                 <span className="flex items-center gap-1 text-[10px] text-gray-500">{postedDate}</span>
              </CardFooter>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default MyJobCard;
