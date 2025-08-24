"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import useProfile from "@/hook/useProfile";
import { DescriptionFormDialog } from "./dialog-description";
import useGetProfile from "@/hook/useGetProfile";
import { useProfileContext } from "@/components/profile-povider";

export default function DescriptionOverview({ isOwner }: { userId: string, isOwner: boolean }) {
  const { profile, refetch } = useProfileContext();
  return (
    <Card className="w-full lg:rounded-xl mask-clip-content shadow-none border-0 gap-0 ">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="flex items-center gap-2 text-md font-semibold">
          <User className="w-4 h-4" /> Description
        </CardTitle>
        {isOwner && profile && (
          <DescriptionFormDialog
            profileId={profile.id}
            currentDescription={profile.description}
            onSaved={refetch}
          />
        )}
      </CardHeader>
      <CardContent className="py-2">
        <div className="text-sm text-neutral-700 leading-relaxed">
          {profile?.description || "No description available."}
        </div>
      </CardContent>
    </Card>
  );
}
