
import FigureProfile from "../molecules/figure-profile";
import SkillOverview from "../molecules/skill";
import DescriptionOverview from "../molecules/description";
import ExperienceCards from "../molecules/Experience";
import EducationSection from "../molecules/Education";
import ProjectSection from "../molecules/project";
import CertificateSection from "../molecules/certificate";
import { ProfileProvider, useProfileContext } from "@/components/profile-povider";
import React, { use } from "react";
import { Container } from "lucide-react";
import { StairStepLoader } from "react-loaderkit";

const ProfileInformation = ({
  userId,
  isOwner,
}: {
  userId?: string;
  isOwner: boolean;
}) => {
  const {loading: profileLoading, error, profile} = useProfileContext();
 
  if (profileLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <StairStepLoader
          size={64}
          color="#4A90E2"
        />
      </div>
    );
  }


  if (!profile) {
    return (
      <div className="text-center text-gray-500">
        Profile not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:gap-4 gap-2">
        <FigureProfile isOwner={isOwner} userId={userId ?? ""} />
        <DescriptionOverview isOwner={isOwner} userId={userId ?? ""} />
        <EducationSection userId={userId} isOwner={isOwner} />
        <ProjectSection userId={userId} isOwner={isOwner} />
        {userId && <ExperienceCards userId={userId} isOwner={isOwner} />}
        <SkillOverview userId={userId} isOwner={isOwner} />
        <CertificateSection />

    </div>
  );
};
export default ProfileInformation;
