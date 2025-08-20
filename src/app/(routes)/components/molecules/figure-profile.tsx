import images from "@/app/assets/list-image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Fish, MoreVertical } from "lucide-react";
import Image from "next/image";
const modelSkills = [
  "Runway Modeling",
  "Print Modeling",
  "Commercial Modeling",
  "Editorial Modeling",
  "Posing Techniques",
  "Acting Skills",
  "Brand Endorsements",
  "Facial Expressions"
];
const FigureProfile = () => {
  return (
    <Card className="w-full lg:rounded-xl mask-clip-content shadow-none border-0 p-0 gap-0 pb-4">
      <CardHeader className="p-0">
        <div className="block ">
          <Image
            src={images.tumbnail}
            loading="lazy"
            alt="tumbnile"
            className="w-full lg:h-36 h-24 lg:rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="relative p-0">
        <div className="flex justify-between bg-white py-4 px-4">
          <div className="">
            <Image
              src={images.exampePoto}
              alt="example-foto-profile "
              className="size-24 rounded-full   absolute border-3 -top-14 border-white"
            />
          </div>
          <MoreVertical size={20} className="text-neutral-600" />
        </div>
        <div className="px-4 py-1">
          <div className="">
            <h1 className="text-md font-bold">Go Youn-jung</h1>
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <Image
              className=""
              width={24}
              height={24}
              src="https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg"
              alt="country-image"
            />
            <div>
              <span className="text-sm text-neutral-600">
                Soul, South Korea
              </span>
            </div>
          </div>
          <div className="mt-2">
            <ul className="flex items-center  list-disc gap-6">
              <li className=" marker:text-white  text-xs font-medium">
                @gyounjung
              </li>
              <li className="text-xs font-medium marker:text-[10px] marker:text-gray-500">Artist and Model</li>
              <li className="text-xs font-medium marker:text-[10px] text-gray-500">Open to Work</li>
            </ul>
          </div>
          <div className="flex items-center mt-4 space-x-2">
            <Button className="text-xs px-2 h-8 rounded-sm bg-white shadow-none border border-gray-100 text-neutral-600">Message</Button>
            <Button className="text-xs px-2 h-8 rounded-sm shadow-none bg-pink-500 text-white">Share Profile</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default FigureProfile;
