import { JobDetailType } from "@/types/job";
import { Briefcase, Layers2, MapPinIcon, Timer } from "lucide-react";
import React from "react";

interface InformationProps {
  job: JobDetailType;
}

const Information: React.FC<InformationProps> = ({ job }) => {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 gap-y-4">
      <div className="flex items-center space-x-3 pr-2">
        <Briefcase size={16} className="text-neutral-600"/>
        <div>
          <h1 className="text-sm text-neutral-600 font-semibold">{job.work_type}</h1>
          <p className="text-xs text-gray-400">Job Type</p>
        </div>
      </div>
      <div className="flex items-center space-x-3 pr-2 ">
        <Layers2 size={16} className="text-neutral-600"/>
        <div>
          <h1 className="text-sm text-neutral-600 font-semibold">{job.experience_min} - {job.experience_max} years</h1>
          <p className="text-xs text-gray-400">Experience</p>
        </div>
      </div>
      <div className="flex items-center  space-x-3 pr-2">
        <Timer size={16} className="text-neutral-600"/>
        <div>
          <h1 className="text-sm text-neutral-600 font-semibold">{job.work_mode}</h1>
          <p className="text-xs text-gray-400">Location</p>
        </div>
      </div>
      <div className="flex items-center  space-x-3 pr-2 ">
        <MapPinIcon size={16} className="text-neutral-600"/>
        <div>
          <h1 className="text-sm text-neutral-600 font-semibold">{job.city},{job.country}</h1>
          <p className="text-xs text-gray-400">Location</p>
        </div>
      </div>
    </div>
  );
};
export default Information;
