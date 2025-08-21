"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { EducationFormDialog } from "./education-form";
import { Education } from "@/types/education";

export default function EducationSection({ userId }: { userId?: string }) {
  const [education, setEducation] = useState<Education[]>([]);
  const [profileId, setProfileId] = useState<string>("");
  const supabase = createClient();

  const fetchData = async () => {
    try {
      const { data: profile, error: profileError } = await supabase
        .from("profile")
        .select("*")
        .eq("user_id", userId)
        .single();
      if (profileError) throw profileError;
      if (!profile) return;

      setProfileId(profile.id);
      const { data: edu, error: eduError } = await supabase
        .from("education")
        .select("*")
        .eq("profile_id", profile.id)
        .order("start_date", { ascending: false });
      if (eduError) throw eduError;

      setEducation(
        (edu || []).map((e: any) => ({
          ...e,
          logoUrl: e.institution_url,
        }))
      );
    } catch (error) {
      console.error("Fetch education error:", error);
      setEducation([]);
    }
  };

  useEffect(() => {
    if (userId) fetchData();
  }, [userId]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <Card className="shadow-none border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <GraduationCap className="w-5 h-5" /> Education
          {profileId && (
            <EducationFormDialog profileId={profileId} onSaved={fetchData} />
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {education.length === 0 && (
          <div className="text-center text-sm text-muted-foreground">
            No education records found.
          </div>
        )}

        {education.map((edu) => (
          <div
            key={edu.id}
            className="flex items-start gap-4 border-b last:border-0 pb-4 last:pb-0"
          >
            <Avatar className="h-12 w-12 rounded-lg bg-white flex items-center justify-center">
              {edu.institution_url ? (
                <AvatarImage
                  src={edu.institution_url}
                  alt={edu.institution}
                  className="object-contain p-1"
                />
              ) : (
                <AvatarFallback className="rounded-lg bg-primary/10 text-primary font-semibold">
                  {edu.institution
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>

            <div className="flex-1 space-y-1">
              <div className="flex justify-between">
                <div className="flex flex-col md:flex-row md:gap-2 gap-0 md:items-center">
                  <h4 className="text-base font-medium">
                    {edu.title || "No Role"}
                  </h4>
                  <span className="hidden md:block">•</span>
                  <h3 className="font-normal text-sm">
                    {edu.institution || "No Institution"}
                  </h3>
                </div>

                <EducationFormDialog
                  education={edu}
                  profileId={profileId}
                  onSaved={fetchData}
                />
              </div>

              {edu.field && (
                <p className="text-sm text-muted-foreground">{edu.field}</p>
              )}

              {edu.start_date && (
                <p className="text-sm text-muted-foreground">
                  {formatDate(edu.start_date)} –{" "}
                  {edu.end_date ? formatDate(edu.end_date) : "Present"}
                </p>
              )}

              {edu.description && (
                <p className="text-sm leading-relaxed mt-2">{edu.description}</p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
