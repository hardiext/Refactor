import React from "react";
import SimilarCardJob from "../molecules/card-similar";

export type JobListItem = {
  id: number;
  job_title: string;
  company_name: string;
  city: string;
  company_image: string;
  country: string;
  work_mode: string;
  work_type: string;
  experience_min: number;
  experience_max: number;
};

interface SimilarJobProp {
  jobs: JobListItem[];
}

const SimilarJob: React.FC<SimilarJobProp> = React.memo(({ jobs }) => {
  if (!jobs || jobs.length === 0) return <p>No related jobs found.</p>;

  return (
    <div className="min-h-screen border-r border-gray-50 s w-full ">
      <div className="w-full py-4 border-b border-r-gray-100 flex items-center justify-between px-4">
        <h1 className="text-sm font-semibold">Related Jobs</h1>
        <span>
          Available: <span className="text-pink-500">{jobs.length}</span>
        </span>
      </div>
      <ul className="px-0">
        {jobs.map((job) => (
          <SimilarCardJob job={job} key={`${job.id}-${job.job_title}`} />
        ))}
      </ul>
    </div>
  );
});

export default SimilarJob;
