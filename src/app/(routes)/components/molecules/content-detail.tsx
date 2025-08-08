import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { JobDetailType } from "@/types/job";

interface ContentDetailProps {
  job: JobDetailType;
}

const ContentDetail: React.FC<ContentDetailProps> = ({ job }) => {
  const detail = job.job_details?.[0];
  const [showFullDesc, setShowFullDesc] = useState(false);

  const excerptLength = 150;
  const description = detail?.description || "";
  const shouldTruncate = description.length > excerptLength;

  const displayedDesc = showFullDesc
    ? description
    : description.slice(0, excerptLength) + (shouldTruncate ? "..." : "");

  return (
    <div className="w-full flex flex-col gap-y-4">
      <div>
        <Label className="text-md">About the Job</Label>
        <p className="text-sm mt-1 text-gray-500 whitespace-pre-line">
          {displayedDesc}
        </p>
        {shouldTruncate && (
          <button
            onClick={() => setShowFullDesc(!showFullDesc)}
            className="text-blue-600 hover:underline mt-1"
          >
            {showFullDesc ? "Show Less" : "Read More"}
          </button>
        )}
      </div>

      {Array.isArray(detail?.responsibilities) && detail.responsibilities.length > 0 && (
        <div>
          <Label className="text-md">Responsibilities</Label>
          <ul className="list-disc list-inside text-sm marker:text-xs text-gray-500 mt-2 space-y-1">
            {detail.responsibilities.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {Array.isArray(detail?.requirements) && detail.requirements.length > 0 && (
        <div>
          <Label className="text-md">Requirements</Label>
          <ul className="list-disc list-inside text-sm marker:text-xs text-gray-500 mt-2 space-y-1">
            {detail.requirements.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {Array.isArray(detail?.skills) && detail.skills.length > 0 && (
        <div>
          <Label className="text-md">Skills</Label>
          <div className="flex items-center gap-4 flex-wrap mt-2">
            {detail.skills.map((item, i) => (
              <Badge key={i} className="bg-pink-100 text-pink-500 rounded-sm">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {Array.isArray(detail?.benefit) && detail.benefit.length > 0 && (
        <div>
          <Label className="text-md">Benefit</Label>
          <ul className="list-disc list-inside text-sm marker:text-xs text-gray-500 mt-2 space-y-1">
            {detail.benefit.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContentDetail;
