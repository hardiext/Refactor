"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect } from "react";
import { ExperienceFormDialog } from "./experience-form-dialog";
import useGetProfile from "@/hook/useGetProfile";

export default function ExperienceSection({ userId }: { userId: string }) {
  const { profile, experiences, loading, error, refetch } = useGetProfile({
    userId,
  });

  useEffect(() => {
    if (userId) refetch();
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
    <Card
      className={`mt-0 shadow-none border-0 border-gray-50 ${
        !experiences.length ? "border-0" : ""
      }`}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-md font-semibold">
          <Briefcase className="w-4 h-4" /> Experience
          {profile?.id && (
            <ExperienceFormDialog profileId={profile?.id} onSaved={refetch} />
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
            <Avatar className="h-12 w-12 rounded-lg bg-white flex items-center justify-center">
              {exp.logoUrl ? (
                <AvatarImage
                  src={exp.logoUrl}
                  alt={exp.company}
                  className="object-contain p-1"
                />
              ) : (
                <AvatarFallback className="rounded-lg bg-primary/10 text-primary font-semibold">
                  {exp.company
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
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
                  <h3 className="font-normal text-sm">
                    {exp.company || "No Company"}
                  </h3>
                </div>
                <ExperienceFormDialog
                  experience={exp}
                  profileId={profile?.id}
                  onSaved={refetch}
                ></ExperienceFormDialog>
              </div>
              {exp.location && (
                <p className="text-sm text-muted-foreground m">
                  {exp.location}
                </p>
              )}
              {exp.start_date && exp.end_date && (
                <p className="text-sm text-muted-foreground">
                  {formatDate(exp.start_date)} -{" "}
                  {exp.end_date ? formatDate(exp.end_date) : "Present"}
                </p>
              )}
              {exp.description && (
                <p className="text-xs leading-relaxed mt-2">
                  {exp.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
