import images from "@/app/assets/list-image";
import { useProfileContext } from "@/components/profile-povider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Fish, MoreVertical } from "lucide-react";
import Image from "next/image";
import { EditProfileDialog } from "./edit-profile-dialog";

export default function FigureProfile({
  userId,
  isOwner,
}: {
  userId: string;
  isOwner: boolean;
}) {
  const { profile, refetch } = useProfileContext();
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
            <div className="w-24 h-24 absolute -top-14">
              <Image
                src={profile?.photo_profile || images.exampePoto}
                alt="example-foto-profile"
                fill
                className="rounded-full object-cover border-3  border-white"
              />
            </div>
          </div>
          <div>
            {isOwner && profile && (
              <EditProfileDialog
                profileId={profile.id}
                full_name={profile?.full_name}
                username={profile?.username}
                country={profile.country}
                city={profile.city}
                professional_title={profile.professional_title}
                bio={profile.bio}
                photo_profile={profile.photo_profile}
                onSaved={refetch}
              />
            )}
          </div>
        </div>
        <div className="px-4 py-1">
          <div className="">
            <h1 className="text-md font-bold">{profile.full_name}</h1>
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
                {profile?.country}, {profile?.city}
              </span>
            </div>
          </div>
          <div className="mt-2">
            <ul className="flex items-center  list-disc gap-6">
              <li className=" marker:text-white  text-xs font-medium">
                @{profile.username}
              </li>
              <li className="text-xs font-medium marker:text-[10px] marker:text-gray-500">
                {profile?.professional_title}
              </li>
              <li className="text-xs font-medium marker:text-[10px] ">
                {profile?.bio}
              </li>
            </ul>
          </div>
          <div className="flex items-center mt-4 space-x-2">
            <Button className="text-xs px-2 h-8 rounded-sm bg-white shadow-none border border-gray-100 text-neutral-600">
              Message
            </Button>
            <Button className="text-xs px-2 h-8 rounded-sm shadow-none bg-pink-500 text-white">
              Share Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
