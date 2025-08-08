"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const jobTypeOptions = [
  { value: "all", label: "All job types" },
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "internship", label: "Internship" },
  { value: "freelance", label: "Freelance" },
  { value: "Contract", label: "Contract" },
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "temporary", label: "Temporary" },
  { value: "volunteer", label: "Volunteer" },
];

interface JobTypeSelectProps {
  value: string;
  onChange: (val: string) => void;
}

const JobTypeSelect = ({ value, onChange }: JobTypeSelectProps) => (
  <Select value={value || "all"} onValueChange={(val) => onChange(val === "all" ? "" : val)}>
    <SelectTrigger className="px-4 w-full py-1 bg-white shadow-none text-sm rounded-lg border border-gray-100 text-neutral-900">
      <SelectValue placeholder="Select job type" />
    </SelectTrigger>
    <SelectContent>
      {jobTypeOptions.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default JobTypeSelect;
