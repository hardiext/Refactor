"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FolderGit2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import useGetProject from "@/hook/useGetProject";
import { useEffect } from "react";
import { ExperienceFormDialog } from "./experience-form-dialog";
import { ProjectFormDialog } from "./project-form-dialog";
import useGetProfile from "@/hook/useGetProfile";

export default function ProjectSection({ userId }: { userId?: string }) {
  const { projects, refetch, profile } = useGetProfile({
    userId,
  });

  useEffect(() => {
    if (userId) refetch();
  }, [userId]);
  return (
    <Card className="shadow-none border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-md font-semibold">
          <FolderGit2 className="w-4 h-4" /> Projects
          {profile?.id && (
            <ProjectFormDialog profileId={profile?.id} onSaved={refetch} />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {projects.length === 0 && (
          <p className="text-sm text-muted-foreground">No projects yet.</p>
        )}
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="flex gap-4 border-b last:border-0 pb-4 last:pb-0"
          >
            <Avatar className="h-12 w-12 rounded-lg">
              {proj.file_url ? (
                <AvatarImage src={proj.file_url} alt={proj.project_title} />
              ) : (
                <AvatarFallback className="rounded-lg bg-primary/10 text-primary font-semibold">
                  {proj.project_title
                    ? proj.project_title
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()
                    : "PR"}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between">
                <div className="">
                  <h3 className="text-base font-medium">
                    {proj.project_title}
                  </h3>
                </div>
                <ProjectFormDialog
                  project={proj}
                  profileId={profile?.id}
                  onSaved={refetch}
                ></ProjectFormDialog>
              </div>
              <p className="text-sm leading-relaxed">{proj.description}</p>

              {proj.link && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Lihat Project
                </a>
              )}
              {proj.skills && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {proj.skills.map((t, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="rounded-full"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              )}
              <div>
                <span className="text-sm text-muted-foreground">
                  {proj.priode}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
