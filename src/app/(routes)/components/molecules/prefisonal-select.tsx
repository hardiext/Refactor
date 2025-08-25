"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function ProfessionalTitleSelect({
  title,
  setTitle,
}: {
  title: string;
  setTitle: (val: string) => void;
}) {
  const titles = [
    "Front-End Developer",
    "Back-End Developer",
    "Full-Stack Developer",
    "Mobile Developer",
    "DevOps Engineer",
    "Data Scientist",
    "UI/UX Designer",
    "Project Manager",
    "QA Engineer",
    "Product Manager",
  ];

  return (
    <div className="flex flex-col gap-2">
      <Label className="font-medium text-gray-700 mb-2">
        Professional Title
      </Label>
      <Select value={title} onValueChange={(val) => setTitle(val)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select your title" />
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-auto">
          {titles.map((t) => (
            <SelectItem key={t} value={t}>
              {t}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
