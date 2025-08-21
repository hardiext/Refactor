"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Edit } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

import { Experience } from "@/types/experience";
import { createClient } from "@/utils/supabase/client";
import { ExperienceFormDialog } from "./experience-form-dialog";

export default function ExperienceSection({ userId }: { userId: string }) {
  const [experiences, setExperiences] = useState<Experience[]>([]);
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

      // Ambil pengalaman kerja
      const { data: exp, error: expError } = await supabase
        .from("work_experience")
        .select("*")
        .eq("profile_id", profile.id)
        .order("start_date", { ascending: false });

      if (expError) throw expError;

      // Mapping logo_url → logoUrl
      setExperiences(
        (exp || []).map((e: any) => ({
          ...e,
          logoUrl: e.logo_url,
        }))
      );
    } catch (error) {
      console.error("Fetch experiences error:", error);
      setExperiences([]);
    }
  };

  useEffect(() => {
    if (userId) fetchData();
  }, [userId]);

  const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "long", year: "numeric" }).format(date);
};

  return (
    <Card className={`mt-0 shadow-none border-0 border-gray-50 ${!experiences.length ? "border-0" : ""}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Briefcase className="w-5 h-5" /> Experience
          {profileId && (
            <ExperienceFormDialog profileId={profileId} onSaved={fetchData} />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {experiences.length === 0 && (
          <p className="text-sm text-muted-foreground">No experiences yet.</p>
        )}
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="flex gap-4 border-b last:border-0 pb-4 last:pb-0"
          >
            <Avatar className="h-12 w-12 rounded-lg">
              {exp.logoUrl ? (
                <AvatarImage src={exp.logoUrl} alt={exp.company} />
              ) : (
                <AvatarFallback className="rounded-lg bg-primary/10 text-primary font-semibold">
                  {exp.company
                    ? exp.company
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()
                    : "NA"}
                </AvatarFallback>
              )}
            </Avatar>

            <div className="flex-1 space-y-0 ">
              <div className="flex  justify-between">
                <div className="md:flex-row flex flex-col md:gap-2    gap-0 md:items-center">
                  <h4 className="text-base font-medium">
                    {exp.role || "No Role"}
                  </h4>
                   <span className="md:block hidden">•</span>
                  <h3 className="font-normal text-sm">{exp.company || "No Company"}</h3>
                </div>
                <ExperienceFormDialog
                  experience={exp}
                  profileId={profileId}
                  onSaved={fetchData}
                ></ExperienceFormDialog>

                {/* <span className="text-sm text-muted-foreground">
                    {exp.period || "-"}
                  </span> */}
              </div>
              {exp.location && (
                <p className="text-sm text-muted-foreground m">{exp.location}</p>
              )}
              {exp.start_date && exp.end_date && (
                <p className="text-sm text-muted-foreground">
                  {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : "Present"}
                </p>
              )}
              {exp.description && (
                <p className="text-xs leading-relaxed mt-2">{exp.description}</p>
              )}
              {/* {exp.skills && exp.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="rounded-full"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              )} */}
              
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
