import { Card, CardContent } from "@/components/ui/card";
import {
  DribbbleIcon,
  GoogleIcon,
  MicrosoftIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight,
  BookText,
  Factory,
  Lightbulb,
  Megaphone,
} from "lucide-react";
import { useMemo } from "react";

const categories = [
  {
    title: "Business& Consulting",
    description:
      "Keep track of tenant information and Our app allows all necessary.",
    icon: <Lightbulb className="w-6 h-6 text-pink-500" />,
  },
  {
    title: "Production Operation",
    description:
      "Keep track of tenant information and Our app allows all necessary.",
    icon: <Factory className="w-6 h-6 text-pink-500" />,
  },
  {
    title: "Education & Training",
    description:
      "Keep track of tenant information and Our app allows all necessary.",
    icon: <BookText className="w-6 h-6 text-pink-500" />,
  },
  {
    title: "Marketing & Sales",
    description:
      "Keep track of tenant information and Our app allows all necessary.",
    icon: <Megaphone className="w-6 h-6 text-pink-500" />,
  },
];

function PopularJobCategories() {
 
  return (
    <div className="w-full  bg-pink-50 lg:px-8 px-4  py-8">
      <div className="">
        <h1 className="text-2xl font-semibold mb-6">Popular Job <span className="bg-gradient-to-br from-pink-600 via-pink-600 to-red-600 bg-clip-text text-transparent">Categories</span></h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="border-5 bg-transparent rounded-2xl shadow-none border-white relative min-h-[480px] overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-base sm:text-lg font-semibold">
                    Design & Development
                  </h1>
                  <p className="text-[11px] text-gray-500 mt-2 leading-relaxed break-words">
                    Keep track of tenant information and lease agreements without
                    hassle. Our app allows you to store and manage all necessary
                    details.
                  </p>
                </div>
                <div className="p-2 bg-[#efeafd] flex items-center justify-center rounded-full">
                  <ArrowUpRight className="w-4 h-4 text-black" />
                </div>
              </div>

              <div className="mt-4">
                <span className="text-[11px] text-pink-600 font-medium">
                  • 49 Job Available
                </span>
              </div>

              {/* Background circle */}
              <div className="absolute w-[250px] h-[250px] rounded-full bg-[#efeafd] bottom-0 left-0 opacity-50 z-0" />

              {/* Floating Icons */}
              <div className="absolute bottom-20 left-6 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center z-10">
                <HugeiconsIcon icon={GoogleIcon} className="text-pink-500" />
              </div>

              <div className="absolute bottom-[120px] left-[100px] w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center z-10">
                <HugeiconsIcon icon={DribbbleIcon} className="text-pink-500" />
              </div>

              <div className="absolute top-[120px] right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center z-10">
                <HugeiconsIcon icon={MicrosoftIcon} className="text-pink-500" />
              </div>

              {/* Label */}
              <div className="absolute bottom-[80px] right-3 bg-[#e9e0fb] text-[10px] font-medium text-black px-4 py-1 rounded-full shadow z-10">
                PHP Developer
              </div>
            </CardContent>
          </Card>

          {/* Right Cards - Categories */}
          <div className="grid grid-cols-2 gap-4 sm:col-span-2">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="bg-transparent rounded-xl border-5 border-white shadow-none p-4 hover:shadow-md transition duration-200"
              >
                <CardContent className="p-0">
                  <div className="w-10 h-10 mb-3 flex items-center justify-center">
                    {category.icon}
                  </div>

                  <h2 className="text-sm font-semibold text-black">
                    {category.title}
                  </h2>

                  <p className="text-[11px] text-gray-500 mt-1 leading-normal break-words">
                    {category.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-pink-600">
                      • 49 Job Available
                    </span>

                    <div className="w-6 h-6 rounded-full bg-[#f4f1fd] flex items-center justify-center">
                      <ArrowUpRight className="w-[12px] h-[12px] text-black" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularJobCategories; 