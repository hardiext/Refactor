"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FolderGit2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type Project = {
  id: string;
  name: string;
  description: string;
  period: string;
  tech?: string[];
  logoUrl?: string;
  link?: string;
};

const projects: Project[] = [
  {
    id: "1",
    name: "Job Portal Website",
    description: "Platform lowongan kerja dengan fitur real-time chat, Supabase Auth, dan Prisma.",
    period: "2024",
    tech: ["Next.js", "Supabase", "Prisma", "Pusher"],
    logoUrl: "",
    link: "https://example.com",
  },
];

export default function ProjectSection() {
  return (
    <Card className="shadow-none border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <FolderGit2 className="w-5 h-5" /> Projects
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {projects.map((proj) => (
          <div key={proj.id} className="flex gap-4 border-b last:border-0 pb-4 last:pb-0">
            <Avatar className="h-12 w-12 rounded-lg">
              {proj.logoUrl ? (
                <AvatarImage src={proj.logoUrl} alt={proj.name} />
              ) : (
                <AvatarFallback className="rounded-lg bg-primary/10 text-primary font-semibold">
                  {proj.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <h3 className="text-base font-medium">{proj.name}</h3>
                <span className="text-sm text-muted-foreground">{proj.period}</span>
              </div>
              <p className="text-sm leading-relaxed">{proj.description}</p>
              {proj.tech && (
                <div className="flex flex-wrap gap-2">
                  {proj.tech.map((t, idx) => (
                    <Badge key={idx} variant="secondary" className="rounded-full">{t}</Badge>
                  ))}
                </div>
              )}
              {proj.link && (
                <a href={proj.link} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">
                  Lihat Project
                </a>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
