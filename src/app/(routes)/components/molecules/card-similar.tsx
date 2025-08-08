import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
} from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Location01Icon,
  MoreHorizontalCircle01FreeIcons,
} from "@hugeicons/core-free-icons";

type JobListItem = {
  id: number;
  job_title: string;
  company_name: string;
  company_image: string;
  city: string;
  country: string;
  work_mode: string;
  work_type: string;
  experience_min: number;
  experience_max: number;
};

interface JobCardProps {
  job: JobListItem;
}

const SimilarCardJob: React.FC<JobCardProps> = React.memo(({ job }) => {
  return (
    <Link href={`/job/${job.id}`} className="block">
      <Card className="px-4 shadow-none border-gray-100 border-0 border-b rounded-none cursor-pointer">
        <CardHeader className="p-0 flex items-start justify-between">
          <div className="flex space-x-3 items-center">
            <Image
              src={job.company_image}
              alt={job.job_title}
              width={70}
              height={70}
              className="p-2 rounded-sm bg-gray-100"
              loading="lazy"
              priority={false} // lazy load gambar
            />
            <div>
              <h1 className="text-sm font-semibold">{job.job_title}</h1>
              <div className="flex items-center space-x-1">
                <HugeiconsIcon
                  icon={Location01Icon}
                  size={12}
                  className="text-neutral-700"
                />
                <span className="text-xs text-gray-500 u">
                  {job.company_name}, {job.city}, {job.country}
                </span>
              </div>
              <div className="mt-1 flex items-center space-x-2">
                <ul className="flex items-center list-disc gap-8">
                  <li className="text-xs text-gray-600 list-none">{job.work_type}</li>
                  <li className="text-xs text-gray-600">
                    {job.experience_min} - {job.experience_max}
                  </li>
                  <li className="text-xs text-gray-600">{job.work_mode}</li>
                </ul>
              </div>
            </div>
          </div>
          <button className="cursor-pointer">
            <HugeiconsIcon
              icon={MoreHorizontalCircle01FreeIcons}
              className="w-4 h-4"
            />
          </button>
        </CardHeader>
      </Card>
    </Link>
  );
});

export default SimilarCardJob;
