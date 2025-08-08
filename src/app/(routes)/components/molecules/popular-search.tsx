import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

const popularSearchData = [
  { title: "Software Engineer" },
  { title: "UI/UX Designer" },
  { title: "Digital Marketing" },
  { title: "Graphic Designer" },
  { title: "Data Analyst" },
];

const PopularSearch = () => {
  return (
    <div className="w-full popular-scroll overflow-x-auto flex items-center space-x-2 ">
      <Label className="flex-shrink-0 text-neutral-700 text-xs lg:text-white">Popular:</Label>
      <div className="flex gap-3 items-center">
        {popularSearchData.map((item, index) => (
          <div
            key={index}
            className="lg:px-4 px-2 lg:py-2 py-1  bg-white/20 text-white flex items-center space-x-2 text-sm md:text-base border lg:border-white border-gray-200 lg:rounded-md rounded-full flex-shrink-0"
          >
            <span className="lg:text-base text-xs lg:text-white text-neutral-800">
              {item.title}
            </span>
            <ArrowRight className="text-white hidden md:block" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularSearch;
