import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import JobSearchFilter from "../molecules/myjob-search-filter";
import { BlurFade } from "@/components/magicui/blur-fade";

const HeaderMyJob = () => {
  const getGretting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else if (hour >= 17 && hour < 21) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  };
  return (
    <article>
      <div className="lg:flex-row flex-col space-y-2 flex lg:items-center justify-between">
        <div>
          <span className="text-xs font-medium text-gray-500">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </span>
          <div>
            <h1 className="text-2xl font-semibold mt-1">
              {getGretting()}! John,
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button className="py-1.5 h-auto px-2 text-xs text-neutral-800 bg-white shadow-none border hover:bg-linear-to-t from-pink-500 to-red-500 hover:text-white hover:shadow-sm cursor-pointer">
            <span className="">
              <Download size={16} />
            </span>{" "}
            Add Job
          </Button>
          <Button className="py-1 h-auto px-2 text-xs text-neutral-800 bg-white shadow-none border hover:bg-linear-to-t from-pink-500 to-red-500 hover:text-white hover:shadow-sm cursor-pointer">
            <span className="text-sm font-semibold">+</span> Add Job
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <BlurFade inView>
          <JobSearchFilter />
        </BlurFade>
      </div>
    </article>
  );
};
export default HeaderMyJob;
