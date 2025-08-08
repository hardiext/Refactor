import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { JobDetailType } from "@/types/job";
import { MoreHorizontalCircle01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { memo, useMemo } from "react";

interface JobCardProps {
  job: JobDetailType;
}

const CardJob: React.FC<JobCardProps> = ({ job }) => {
  const details = useMemo(() => job.job_details?.[0], [job.job_details]);
  
  const postedDate = useMemo(
    () => formatDistanceToNow(new Date(job.posted_at), { addSuffix: true }),
    [job.posted_at]
  );

  return (
    <Link 
      href={`/job/${job.id}`} 
      className="block"
      prefetch={false}
    >
      <Card className="px-4 shadow-none border-gray-100 lg:rounded-md rounded-none cursor-pointer hover:bg-gray-50 transition-colors">
        <CardHeader className="p-0 flex items-start justify-between">
          <div className="flex space-x-3 items-center">
            <Image
              src={job.company_image}
              alt={job.job_title}
              width={45}
              height={45}
              className="p-2 rounded-sm bg-gray-100"
              priority={false} 
              loading="lazy"
            />
            <div>
              <h1 className="text-sm font-semibold line-clamp-1">{job.job_title}</h1>
              <p className="text-xs uppercase line-clamp-1">{job.company_name}</p>
            </div>
          </div>
          <button className="cursor-pointer" aria-label="More options">
            <HugeiconsIcon
              icon={MoreHorizontalCircle01FreeIcons}
              className="w-4 h-4"
            />
          </button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs font-medium line-clamp-1">{job.work_type}</span>
            <span className="text-xs font-medium line-clamp-1">
              {job.experience_min} - {job.experience_max} Years
            </span>
            <span className="text-xs font-medium line-clamp-1">{job.work_mode}</span>
          </div>
          {details?.description && (
            <div className="mt-3">
              <p className="text-xs line-clamp-3 text-gray-500">
                {details.description}
              </p>
            </div>
          )}
          {Array.isArray(details?.skills) && details.skills.length > 0 && (
            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
                {details.skills.slice(0, 3).map((item, i) => ( // Limit to 5 skills
                  <Badge 
                    key={`${item}-${i}`} 
                    className="bg-pink-100 text-pink-500 text-xs"
                  >
                    {item}
                  </Badge>
                ))}
                {details.skills.length > 5 && (
                  <Badge className="bg-gray-100 text-gray-500 text-xs">
                    +{details.skills.length - 5}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between p-0 mt-3 pb-2">
          <span className="text-[11px] text-gray-600">
            Posted {postedDate}
          </span>
          <span className="text-md font-semibold text-neutral-800">
            ${job.salary_amount.toLocaleString()}{" "}
            <span className="text-[10px] text-gray-400">/year</span>
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default memo(CardJob); 