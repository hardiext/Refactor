import { useState } from "react";
import CardJob from "../molecules/card-job";
import { JobDetailType, JobFromDb } from "@/types/job";

interface jobListProps {
  jobs: JobDetailType[];
}

const CardJobList: React.FC<jobListProps> = ({ jobs }) => {
  return (
    <div className="lg:p-4">
      <h1 className="text-md font-semibold px-4 py-1 border-white rounded-md max-w-max lg:mb-4 mb-2 bg-white lg:block hidden">
        Job Explore Result <span className="text-pink-500">{jobs.length}</span>
      </h1>
      <div className="grid lg:grid-cols-3  grid-cols-1 lg:gap-3">
        {jobs.map((job) => (
          <CardJob key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};
export default CardJobList;
