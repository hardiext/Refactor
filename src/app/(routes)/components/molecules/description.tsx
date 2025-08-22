"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import useProfile from "@/hook/useProfile";
import { DescriptionFormDialog } from "./dialog-description";

export default function DescriptionOverview({ userId }: { userId: string }) {
  const { profile, loading, error, refetch } = useProfile({ userId });

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <Card className="w-full lg:rounded-xl mask-clip-content shadow-none border-0 gap-0 ">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <User className="w-5 h-5" /> Description
        </CardTitle>
        {profile && (
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
