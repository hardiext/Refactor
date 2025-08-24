"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Puzzle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SkillFormDialog } from "./dialog-form-skill";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import useGetProfile from "@/hook/useGetProfile";
import { useProfileContext } from "@/components/profile-povider";

type Props = {
  userId?: string;
  isOwner?: boolean;
};

export default function SkillOverview({ userId, isOwner }: Props) {
  const { profile, refetch, skills } = useProfileContext();
  useEffect(() => {
    if (userId) refetch();
  }, [userId]);
  return (
    <Card className="w-full lg:rounded-xl shadow-none border-0 gap-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-md font-semibold">
          <Puzzle className="w-4 h-4" /> Skills
          {isOwner && profile?.id && (
            <SkillFormDialog profileId={profile?.id} onSaved={refetch} />
          )}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {skills.length === 0 && (
          <p className="text-sm text-muted-foreground">No skills yet.</p>
        )}
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill) => (
            <Badge
              key={skill.id}
              className="text-xs py-1.5 rounded-sm bg-white border border-gray-100 text-neutral-800"
            >
              {skill.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
