"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type Education = {
  id: string;
  school: string;
  degree: string;
  field?: string;
  period: string;
  description?: string;
  logoUrl?: string;
};

const education: Education[] = [
  {
    id: "1",
    school: "Universitas Indonesia",
    degree: "Bachelor",
    field: "Computer Science",
    period: "2019 – 2023",
    description: "Fokus pada pengembangan aplikasi full-stack dan AI.",
    logoUrl: "",
  },
];

export default function EducationSection() {
  return (
    <Card className="shadow-none border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <GraduationCap className="w-5 h-5" /> Education
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {education.map((edu) => (
          <div key={edu.id} className="flex gap-4 border-b last:border-0 pb-4 last:pb-0">
            <Avatar className="h-12 w-12 rounded-lg">
              {edu.logoUrl ? (
                <AvatarImage src={edu.logoUrl} alt={edu.school} />
              ) : (
                <AvatarFallback className="rounded-lg bg-primary/10 text-primary font-semibold">
                  {edu.school.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <h3 className="text-base font-medium">{edu.degree} • {edu.school}</h3>
                <span className="text-sm text-muted-foreground">{edu.period}</span>
              </div>
              {edu.field && <p className="text-sm text-muted-foreground">{edu.field}</p>}
              {edu.description && <p className="text-sm leading-relaxed">{edu.description}</p>}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
