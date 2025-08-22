import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import FigureProfile from "../molecules/figure-profile";
import { Home } from "lucide-react";
import SkillOverview from "../molecules/skill";
import DescriptionOverview from "../molecules/description";
import ExperienceCards from "../molecules/Experience";
import EducationSection from "../molecules/Education";
import ProjectSection from "../molecules/project";
import CertificateSection from "../molecules/certificate";

const ProfileInformation = ({ userId }: { userId?: string }) => {
  return (
    <div className="min-h-screen flex flex-col lg:gap-4 gap-2">
      <FigureProfile />
      <DescriptionOverview userId={userId ?? ""} />
      <EducationSection userId={userId} />
      <ProjectSection userId={userId}/>
      {userId && <ExperienceCards userId={userId} />}
      <SkillOverview />
      <CertificateSection />
    </div>
  );
};
export default ProfileInformation;
