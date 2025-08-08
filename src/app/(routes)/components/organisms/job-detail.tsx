import { JobDetailType } from "@/types/job";

import React from "react";
import HeaderDetail from "../molecules/header-detail";
import Information from "../molecules/information";
import ContentDetail from "../molecules/content-detail";

interface JobInformationProps {
  job: JobDetailType;
}

const JobInformation: React.FC<JobInformationProps> = ({ job }) => {
  return (
    <div className="min-h-screen bg-white border-b">
      <div>
        <div className="py-4 shadow-xs lg:px-8 px-4">
          <HeaderDetail job={job} />
        </div>
        <div className="py-4 lg:px-8 px-4 border-b border-gray-100">
          <Information job={job} />
        </div>
      </div>
      <article className="lg:px-8 px-4 py-6">
            <ContentDetail job={job}/>
      </article>
    </div>
  );
};
export default JobInformation;
