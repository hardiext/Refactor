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

const ProfileInformation = () => {
  return (
    <div className="min-h-screen flex flex-col lg:gap-4 gap-2">
      <FigureProfile />
      <DescriptionOverview/>
      <SkillOverview/>
    </div>
  );
};
export default ProfileInformation;
