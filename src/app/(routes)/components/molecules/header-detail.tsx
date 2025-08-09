import { Button } from "@/components/ui/button";
import { JobDetailType } from "@/types/job";
import { Location01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";
import ApplyForm from "../organisms/apply-form";

interface HeaderDetailProps {
  job: JobDetailType;
}

const HeaderDetail: React.FC<HeaderDetailProps> = ({ job }) => {
  return (
    <div className="flex items-start justify-between w-full">
      <div>
        <h1 className="text-2xl text-neutral-800 font-semibold">
          {job.job_title}
        </h1>
        <div className="mt-2">
          <div className="flex items-center space-x-1">
            <div>
              <HugeiconsIcon
                icon={Location01Icon}
                size={16}
                className="text-neutral-700"
              />
            </div>
            <div>
              <span className="text-sm text-gray-500 u">
                {job.company_name}, {job.city}, {job.country}
              </span>
            </div>
          </div>
        </div>
        <div>
          <ul className="flex items-center list-disc gap-8 mt-4">
            <li className="text-sm marker:text-xs  text-gray-600 list-none">
              {job.work_type}
            </li>
            <li className="text-sm marker:text-xs  text-gray-600 ">
              {job.experience_min} - {job.experience_max}
            </li>
            <li className="text-sm marker:text-xs  text-gray-600">
              {job.work_mode}
            </li>
          </ul>
        </div>
        <div className="space-x-2 bloc lg:hidden mt-4">
          <ApplyForm
            jobId={job.id}
            job_title={job.job_title}
            company_name={job.company_name}
            city={job.city}
            country={job.country}
            work_type={job.work_type}
          />
          <Button className="text-pink-500  bg-white border border-pink-500 px-4 tex-xs rounded-xs hover:bg-white">
            Save
          </Button>
        </div>
      </div>
      <div className="space-x-2 lg:block hidden">
          <ApplyForm
            jobId={job.id}
            job_title={job.job_title}
            company_name={job.company_name}
            city={job.city}
            country={job.country}
            work_type={job.work_type}
          />
        <Button className="text-pink-500  bg-white border border-pink-500 px-4 tex-xs rounded-xs hover:bg-white">
          Save
        </Button>
      </div>
    </div>
  );
};
export default HeaderDetail;
